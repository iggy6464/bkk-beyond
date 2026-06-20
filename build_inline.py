#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_inline.py  —  BKK BEYOND file:// 하이브리드 빌드 도구 (STEP 2)

역할:
  1) bkk_content.json 을 읽어
  2) index.html 의 <script id="bkk-data" type="application/json"> ... </script>
     블록을 자동 생성/갱신(주입)하고
  3) 주입 후 [인라인 JSON ≡ bkk_content.json] invariant 를 재검증한다.

운영 원칙:
  - bkk_content.json 이 single source of truth.
  - 매주 콘텐츠 갱신 시 JSON만 수정 → `python build_inline.py` 1회 → 동기화 완료.
  - 멱등(idempotent): 여러 번 돌려도 블록이 중복 생성되지 않는다.

사용법:
  python build_inline.py                 # 기본 경로 사용
  python build_inline.py <json> <html>   # 경로 직접 지정
  python build_inline.py --check         # 주입 없이 동기화 여부만 검증(CI용)
"""
import json
import re
import sys
import os

JSON_DEFAULT = "bkk_content.json"
HTML_DEFAULT = "index.html"

# 인라인 블록 마커 — 멱등 주입/치환의 기준
BLOCK_RE = re.compile(
    r'[ \t]*<script id="bkk-data" type="application/json">.*?</script>\n?',
    re.DOTALL,
)
ANCHOR = '  <script src="./app.js"></script>'  # 이 줄 '앞'에 주입


def build_block(data: dict) -> str:
    """JSON dict → 인라인 <script> 블록 문자열.
    HTML 안전: '</' 시퀀스를 escape 해 조기 종료(</script>) 방지."""
    payload = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    payload = payload.replace("</", "<\\/")  # </script> 조기 종료 방어
    return (
        '  <script id="bkk-data" type="application/json">\n'
        f"  {payload}\n"
        "  </script>\n"
    )


def inject(json_path: str, html_path: str) -> None:
    with open(json_path, encoding="utf-8") as f:
        data = json.load(f)  # JSON 파싱 실패 시 즉시 예외 → source 문제 조기 발견
    with open(html_path, encoding="utf-8") as f:
        html = f.read()

    block = build_block(data)

    if BLOCK_RE.search(html):
        # 기존 블록 치환 (멱등)
        html = BLOCK_RE.sub(block, html, count=1)
        action = "갱신(replace)"
    else:
        # 신규 주입: app.js 로드 앵커 '앞'에
        if ANCHOR not in html:
            raise SystemExit(f"[ERROR] 앵커를 찾지 못함: {ANCHOR!r}")
        html = html.replace(ANCHOR, block + ANCHOR, 1)
        action = "신규 주입(insert)"

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"[OK] 인라인 블록 {action} 완료 → {html_path}")

    verify(json_path, html_path)


def extract_inline(html: str):
    m = BLOCK_RE.search(html)
    if not m:
        return None
    inner = m.group(0)
    # <script ...> 와 </script> 사이 텍스트만
    text = re.search(r">\s*(.*?)\s*</script>", inner, re.DOTALL).group(1)
    text = text.replace("<\\/", "</")  # escape 복원
    return json.loads(text)


def verify(json_path: str, html_path: str) -> bool:
    """invariant: 인라인 JSON ≡ bkk_content.json (의미 동일성)."""
    with open(json_path, encoding="utf-8") as f:
        src = json.load(f)
    with open(html_path, encoding="utf-8") as f:
        inline = extract_inline(f.read())

    if inline is None:
        print("[FAIL] 인라인 블록이 HTML에 없음")
        return False

    # dict 의미 동일성 비교 (직렬화 정규화)
    a = json.dumps(src, ensure_ascii=False, sort_keys=True)
    b = json.dumps(inline, ensure_ascii=False, sort_keys=True)
    ok = (a == b)
    print(f"[invariant] 인라인 ≡ bkk_content.json : {'OK ✅' if ok else 'MISMATCH ❌'}")

    if ok:
        # 부가 수치 리포트
        cur_keys = [k for k in src["current"]["translations"]["ko"] if k.startswith("curation.")]
        n_arch = len(src.get("archives", []))
        print(f"  · current version: {src['current']['version']}")
        print(f"  · curation 키: {len(cur_keys)} × 3언어 = {len(cur_keys)*3}")
        print(f"  · archives: {n_arch}개 {[a['version'] for a in src.get('archives', [])]}")
    else:
        print("  → JSON 수정 후 `python build_inline.py`를 다시 실행하세요.")
    return ok


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]
    json_path = args[0] if len(args) > 0 else JSON_DEFAULT
    html_path = args[1] if len(args) > 1 else HTML_DEFAULT

    if not os.path.exists(json_path) or not os.path.exists(html_path):
        raise SystemExit(f"[ERROR] 파일 없음: {json_path} / {html_path}")

    if "--check" in flags:
        ok = verify(json_path, html_path)
        sys.exit(0 if ok else 1)
    else:
        inject(json_path, html_path)


if __name__ == "__main__":
    main()
