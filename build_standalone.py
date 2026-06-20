#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_standalone.py — BKK BEYOND 단일 파일 빌드 (더블클릭 전용)

목적:
  index.html이 참조하는 style.css / app.js / *.png 를 전부 인라인 임베드해
  외부 파일 의존이 0인 index_standalone.html 한 개를 생성.
  → 파일 하나만 더블클릭해도 흰 바탕 없이 완전 동작 (file:// CORS 무관).

원리:
  · <link href="./style.css">  → <style>...</style>
  · <script src="./app.js">     → <script>...</script>
  · <img src="./xxx.png">        → <img src="data:image/png;base64,...">
  · 인라인 JSON(#bkk-data)은 이미 존재 → app.js fetch 실패 시 그대로 fallback

분리형(index.html + 외부파일)은 그대로 유지 — 서버 배포·운영용.
standalone은 미리보기/공유 전용 추가 산출물.

사용법:
  python build_standalone.py
"""
import base64
import os
import re
import sys

SRC_HTML = "index.html"
OUT_HTML = "index_standalone.html"


def b64_img(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")


def main():
    if not os.path.exists(SRC_HTML):
        raise SystemExit(f"[ERROR] {SRC_HTML} 없음")

    with open(SRC_HTML, encoding="utf-8") as f:
        html = f.read()

    report = []

    # 1) style.css → <style>
    if os.path.exists("style.css"):
        with open("style.css", encoding="utf-8") as f:
            css = f.read()
        link_re = re.compile(r'<link[^>]+href="\./style\.css"[^>]*>')
        if link_re.search(html):
            html = link_re.sub("<style>\n" + css + "\n</style>", html, count=1)
            report.append("style.css → <style> 인라인")
    else:
        report.append("[skip] style.css 없음")

    # 2) *.png / *.jpg → data URI (img src)
    MIME = {"png": "image/png", "jpg": "image/jpeg", "jpeg": "image/jpeg"}
    imgs = sorted(set(re.findall(r'src="\./([\w-]+\.(?:png|jpe?g))"', html)))
    for img in imgs:
        if os.path.exists(img):
            ext = img.rsplit(".", 1)[-1].lower()
            data = f"data:{MIME[ext]};base64," + b64_img(img)
            html = html.replace(f'src="./{img}"', f'src="{data}"')
            report.append(f"{img} → data URI ({os.path.getsize(img)//1024} KB)")
        else:
            report.append(f"[skip] {img} 없음")

    # 3) app.js → <script> (가장 마지막에: JSON 인라인 블록 이후 실행 보장)
    if os.path.exists("app.js"):
        with open("app.js", encoding="utf-8") as f:
            js = f.read()
        # </script> 조기종료 방어
        js_safe = js.replace("</script>", "<\\/script>")
        script_re = re.compile(r'<script[^>]+src="\./app\.js"[^>]*>\s*</script>')
        if script_re.search(html):
            html = script_re.sub("<script>\n" + js_safe + "\n</script>", html, count=1)
            report.append("app.js → <script> 인라인")
    else:
        report.append("[skip] app.js 없음")

    with open(OUT_HTML, "w", encoding="utf-8") as f:
        f.write(html)

    # 검증: 외부 참조가 남았는지
    leftover = re.findall(r'(?:href|src)="\./[^"]+"', html)
    size_mb = os.path.getsize(OUT_HTML) / (1024 * 1024)

    print(f"[OK] {OUT_HTML} 생성 ({size_mb:.2f} MB)")
    for r in report:
        print("   ·", r)
    print(f"   · 남은 외부참조(./): {len(leftover)} (0이어야 완전 독립)")
    if leftover:
        for l in leftover[:5]:
            print("      ⚠", l)
        sys.exit(1)


if __name__ == "__main__":
    main()
