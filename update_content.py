#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
update_content.py — BKK BEYOND 콘텐츠 갱신 파이프라인 (축2 자동화 백본)

역할(결정론적·LLM 비의존):
  1) "drop"(부분 콘텐츠 JSON)을 받아 현재 current에 깊은 병합
  2) 스키마 검증 — 3개국어 완전성, 리스트 길이, 날짜/URL 형식
  3) 에디션 교체 시(theme/translations 포함) 구 current 큐레이션 스냅샷을
     archives 앞에 push 하고 max_archives 로 컷 (기본 20)
  4) bkk_content.json 기록(+ .bak 백업) → build_inline.py → build_standalone.py

drop 종류:
  · trends-only  : {"version","trends":{...}} 등 라이브 갱신 (아카이브 회전 없음)
  · edition       : {"version","theme","translations",...} (아카이브 회전)

사용법:
  python3 update_content.py drops/2026-W25.trends.json            # 적용
  python3 update_content.py drops/x.json --dry-run               # 검증·미리보기만
  python3 update_content.py drops/x.json --no-build              # JSON만, 빌드 스킵
  python3 update_content.py drops/x.json --max-archives 20
"""
import argparse
import copy
import datetime
import json
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
CONTENT = os.path.join(ROOT, "bkk_content.json")
LANGS = ("ko", "en", "th")


# ----------------------------------------------------------------------------- utils
def load_json(path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def is_iso_date(s):
    try:
        datetime.datetime.strptime(s, "%Y-%m-%d")
        return True
    except (ValueError, TypeError):
        return False


def deep_merge(base, patch):
    """dict는 재귀 병합, 그 외(리스트·스칼라)는 patch가 치환."""
    if isinstance(base, dict) and isinstance(patch, dict):
        out = copy.deepcopy(base)
        for k, v in patch.items():
            out[k] = deep_merge(out[k], v) if k in out else copy.deepcopy(v)
        return out
    return copy.deepcopy(patch)


class ValidationError(Exception):
    pass


# ----------------------------------------------------------------------------- validate
def _check_langs(d, where, errs, allow_empty=False):
    """ko/en/th 3개국어 문자열 검증. allow_empty=True면 빈 문자열 허용(선택 필드)."""
    if not isinstance(d, dict):
        errs.append(f"{where}: dict 아님")
        return
    for lg in LANGS:
        v = d.get(lg)
        if not isinstance(v, str):
            errs.append(f"{where}.{lg}: 문자열 아님")
        elif not allow_empty and not v.strip():
            errs.append(f"{where}.{lg}: 빈 문자열")


def validate_current(cur, canonical_keys):
    """병합 결과 current 전수 검증. 실패 시 ValidationError(목록)."""
    errs = []

    # version / theme
    if not is_iso_date(cur.get("version", "")):
        errs.append(f"version: ISO 날짜(YYYY-MM-DD) 아님 -> {cur.get('version')!r}")
    _check_langs(cur.get("theme"), "theme", errs)

    # translations: 3개국어 × 정확히 canonical 키집합
    tr = cur.get("translations", {})
    for lg in LANGS:
        if lg not in tr:
            errs.append(f"translations.{lg}: 누락")
            continue
        keys = set(tr[lg].keys())
        missing = canonical_keys - keys
        extra = keys - canonical_keys
        if missing:
            errs.append(f"translations.{lg}: 키 누락 {sorted(missing)[:5]}{'...' if len(missing) > 5 else ''}")
        if extra:
            errs.append(f"translations.{lg}: 미정의 키 {sorted(extra)[:5]}")
        for k, v in tr[lg].items():
            if not isinstance(v, str) or not v.strip():
                errs.append(f"translations.{lg}.{k}: 빈 값")

    # trends
    tn = cur.get("trends", {})
    if not is_iso_date(tn.get("updated", "")):
        errs.append(f"trends.updated: ISO 날짜 아님 -> {tn.get('updated')!r}")
    _check_langs(tn.get("source_note"), "trends.source_note", errs)
    hs = tn.get("hotspots", [])
    if not isinstance(hs, list) or len(hs) != 5:
        errs.append(f"trends.hotspots: 길이 5 필요 (현재 {len(hs) if isinstance(hs, list) else '비리스트'})")
    else:
        for i, h in enumerate(hs):
            for f, typ in (("rank", int), ("mentions", int), ("wow", int)):
                if not isinstance(h.get(f), typ) or isinstance(h.get(f), bool):
                    errs.append(f"trends.hotspots[{i}].{f}: 정수 필요")
            for f in ("name", "tag"):
                if not isinstance(h.get(f), str) or not h.get(f, "").strip():
                    errs.append(f"trends.hotspots[{i}].{f}: 문자열 필요")
        ranks = sorted(h.get("rank") for h in hs if isinstance(h.get("rank"), int))
        if ranks != [1, 2, 3, 4, 5]:
            errs.append(f"trends.hotspots: rank 는 1..5 유일해야 함 -> {ranks}")
    pt = tn.get("patterns", [])
    if not isinstance(pt, list) or len(pt) != 4:
        errs.append(f"trends.patterns: 길이 4 필요 (현재 {len(pt) if isinstance(pt, list) else '비리스트'})")
    else:
        for i, p in enumerate(pt):
            for f in ("label_ko", "label_en", "unit"):
                if not isinstance(p.get(f), str) or not p.get(f, "").strip():
                    errs.append(f"trends.patterns[{i}].{f}: 문자열 필요")
            if not isinstance(p.get("value"), (int, float)) or isinstance(p.get("value"), bool):
                errs.append(f"trends.patterns[{i}].value: 숫자 필요")

    # shops
    shops = cur.get("shops", [])
    if not isinstance(shops, list) or not shops:
        errs.append("shops: 비어있음")
    else:
        ids = set()
        for i, s in enumerate(shops):
            sid = s.get("id")
            if not isinstance(sid, str) or not sid:
                errs.append(f"shops[{i}].id: 누락")
            elif sid in ids:
                errs.append(f"shops[{i}].id: 중복 -> {sid}")
            else:
                ids.add(sid)
            _check_langs(s.get("name"), f"shops[{i}].name", errs)
            _check_langs(s.get("category"), f"shops[{i}].category", errs)
            # coupon/shop_url 은 선택(프로모·외부링크 없을 수 있음) → 빈 문자열 허용
            _check_langs(s.get("coupon"), f"shops[{i}].coupon", errs, allow_empty=True)
            if not isinstance(s.get("price_from"), int) or isinstance(s.get("price_from"), bool):
                errs.append(f"shops[{i}].price_from: 정수 필요")
            # map_url 필수(https), shop_url 선택(있으면 https)
            mu = s.get("map_url", "")
            if not isinstance(mu, str) or not mu.startswith("https://"):
                errs.append(f"shops[{i}].map_url: https URL 필요 -> {mu!r}")
            su = s.get("shop_url", "")
            if not isinstance(su, str) or (su and not su.startswith("https://")):
                errs.append(f"shops[{i}].shop_url: https URL 또는 빈 문자열 -> {su!r}")

    if errs:
        raise ValidationError(errs)


# ----------------------------------------------------------------------------- pipeline
def run_builds(no_build):
    if no_build:
        print("   · 빌드 스킵(--no-build)")
        return
    for script in ("build_inline.py", "build_standalone.py"):
        path = os.path.join(ROOT, script)
        if not os.path.exists(path):
            print(f"   · [skip] {script} 없음")
            continue
        r = subprocess.run([sys.executable, path], cwd=ROOT, capture_output=True, text=True)
        tag = "OK" if r.returncode == 0 else f"FAIL({r.returncode})"
        last = (r.stdout.strip().splitlines() or [""])[-1]
        print(f"   · {script}: {tag}  {last}")
        if r.returncode != 0:
            print(r.stderr.strip()[-500:])
            raise SystemExit(f"[ERROR] {script} 실패")


def main():
    ap = argparse.ArgumentParser(description="BKK BEYOND 콘텐츠 갱신 파이프라인")
    ap.add_argument("drop", help="drop JSON 경로 (부분 콘텐츠)")
    ap.add_argument("--dry-run", action="store_true", help="검증·미리보기만, 기록 안 함")
    ap.add_argument("--no-build", action="store_true", help="JSON만 기록, 빌드 스킵")
    ap.add_argument("--max-archives", type=int, default=20)
    args = ap.parse_args()

    data = load_json(CONTENT)
    cur = data["current"]
    drop = load_json(args.drop)
    # '_' 접두 최상위 키는 주석(_meta 등)으로 간주, 병합 제외
    drop = {k: v for k, v in drop.items() if not k.startswith("_")}

    # 큐레이션 계약(키집합)을 현재 데이터에서 도출 = 단일 진실
    canonical_keys = set(cur["translations"]["ko"].keys())

    # 병합
    new_cur = deep_merge(cur, drop)

    # 에디션 교체 여부: theme/translations 가 drop 에 있으면 회전
    is_edition = any(k in drop for k in ("theme", "translations"))

    # 검증
    try:
        validate_current(new_cur, canonical_keys)
    except ValidationError as e:
        print("❌ 검증 실패:")
        for msg in e.args[0]:
            print("   -", msg)
        raise SystemExit(1)

    # 미리보기 요약
    print("✅ 검증 통과")
    print(f"   · drop: {os.path.basename(args.drop)}  (에디션교체={is_edition})")
    print(f"   · version: {cur['version']} → {new_cur['version']}")
    print(f"   · trends.updated: {cur['trends']['updated']} → {new_cur['trends']['updated']}")
    top = ", ".join(f"{h['rank']}.{h['name']}" for h in new_cur["trends"]["hotspots"][:3])
    print(f"   · hotspots TOP3: {top}")
    if is_edition:
        print(f"   · 아카이브: {len(data['archives'])} → {min(len(data['archives']) + 1, args.max_archives)} (구 에디션 push)")

    if args.dry_run:
        print("DRY-RUN — 기록하지 않음")
        return

    # 아카이브 회전 (에디션 교체 시 구 current 큐레이션 스냅샷 보존)
    if is_edition:
        snapshot = {k: copy.deepcopy(cur[k]) for k in ("version", "theme", "translations")}
        data["archives"].insert(0, snapshot)
        data["archives"] = data["archives"][: args.max_archives]

    data["current"] = new_cur

    # 백업 + 기록
    bak = CONTENT + ".bak"
    with open(bak, "w", encoding="utf-8") as f:
        json.dump(load_json(CONTENT), f, ensure_ascii=False, indent=2)
    with open(CONTENT, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print(f"   · 기록: bkk_content.json (백업 {os.path.basename(bak)})")

    # 빌드 동기화
    run_builds(args.no_build)
    print("🎉 완료")


if __name__ == "__main__":
    main()
