# BKK BEYOND — 콘텐츠 자동화 파이프라인 (축2)

방콕 트렌드를 2주 주기로 수집 → 검증 → 반영하는 운영 체계.
**`bkk_content.json` 이 단일 진실(SSOT)** 이며, 모든 갱신은 *drop* 을 통해서만 들어간다.

```
[수집: 에이전트 + MCP]              [병합: 결정론적 파이썬]
datalab_search ─┐                  update_content.py
search_blog ────┼─→ drops/*.json → ├ 스키마 검증 (3개국어·길이·날짜·URL·rank 유일)
   (지표성 수치)                    ├ 아카이브 회전 (에디션 교체 시, max 20)
                                   ├ bkk_content.json 기록 (+ .bak)
                                   └ build_inline.py → build_standalone.py
```

수집(창의·번역)은 LLM이 필요하고, 병합(검증·기록)은 결정론적 스크립트다 — 이 분리가 핵심.

---

## 주기

| 항목 | 주기 | 비고 |
|---|---|---|
| **trends** (핫스팟·패턴) | **2주 (P1)** | 가장 자주 — 생동감 유지 |
| theme / version | 에디션 단위 | trends 와 함께 가는 경우 多 |
| translations (큐레이션 3구역) | 비정기 (P2) | 구역 교체 시에만 |
| shops | 비정기 | 프로모/신규 입점 시 |

---

## Step 1 — 수집 (에이전트 + MCP)

현재 한국시간 확인 후, 아래를 돌려 **실제로 회자되는 장소/토픽**을 추린다.

1. `NaverSearch.get_current_korean_time` — 기준일·집계구간 확정
2. `NaverSearch.datalab_search` — 후보 키워드들의 주간 검색관심도 추이
   - 예: 송왓 / 반탓통 / 탈랏노이 / 아리 / 짜런끄룽 등을 keywordGroups 로 비교
   - **상승·하락(wow 부호)·정점 대비 냉각**을 여기서 읽는다
3. `NaverSearch.search_blog` (`sort=date`) — 최근 블로그에서 부상 토픽·시즌 이벤트 포착
   - 예: 진행 중인 페스티벌, 신규 핫플, 현지인 맛집

> ⚠️ `mentions`·`wow` 는 정밀 트래킹이 아니라 **지표성 수치**다. `source_note` 에 반드시 집계 방법을 적는다(정직성).

## Step 2 — drop 작성

`drops/_TEMPLATE.trends.json` 복사 → `drops/YYYY-MM-DD.trends.json`.

- **trends-only drop** (`version` + `trends`): 라이브 갱신, 아카이브 회전 없음 (← 일반적 2주 갱신)
- **edition drop** (`theme` 또는 `translations` 포함): 구 에디션을 archives 로 회전
  - 실제 예시: [`drops/2026-06-20.edition.json`](drops/2026-06-20.edition.json) — theme+trends 갱신, 구역 유지
- `_` 접두 최상위 키(`_meta` 등)는 주석으로 간주되어 병합에서 제외됨

## Step 3 — 병합 적용

```bash
# 1) 검증·미리보기 (기록 안 함)
python3 update_content.py drops/2026-06-20.edition.json --dry-run

# 2) 실제 적용 (백업 → 기록 → build_inline → build_standalone)
python3 update_content.py drops/2026-06-20.edition.json
```

검증 실패 시 **아무것도 기록하지 않고** 구체적 오류 목록을 출력한다.
옵션: `--no-build`(JSON만), `--max-archives N`(기본 20).

## Step 4 — 검증

```bash
python3 build_inline.py --check     # 인라인 ≡ bkk_content.json 불변식
git diff --stat                     # 변경 범위 확인
# (선택) 로컬 서버 띄워 trends 섹션 육안 확인: python3 -m http.server 8000
```

---

## 스키마 (요약)

`current` 객체:
- `version` `str` — ISO 날짜 `YYYY-MM-DD`
- `theme` `{ko,en,th}` — 주간 헤드라인
- `translations` `{ko,en,th}` — 각 **정확히 33개** `curation.*` 키 (3구역 × 11)
- `trends`:
  - `updated` ISO 날짜, `source_note {ko,en,th}`
  - `hotspots` **정확히 5개** `{rank(1..5 유일), name, mentions:int, wow:int, tag}`
  - `patterns` **정확히 4개** `{label_ko, label_en, value:num, unit}`
- `shops` `[]` — `{id(유일), name{3}, district, category{3}, price_from:int, currency, map_url(https), shop_url(https|""), coupon{3}(빈값 허용)}`

`archives` `[]`: 에디션 교체 시 구 `{version, theme, translations}` 스냅샷이 앞에 쌓이고 최신 20개 유지.

---

## 스케줄링 — 현재: 온디맨드(On-demand)

수집 단계는 에이전트(LLM+MCP)가 필요하므로 완전 무인 cron 은 부적합하다.

**운영 방식: 격주(2주) 온디맨드.** 에이전트에게 "**트렌드 갱신해줘**" 라고 하면 이 문서의
Step 1~6 (수집 → drop 작성 → 검증 → 적용 → push)을 한 번에 수행한다. GitHub Pages 가
push 시 자동 재배포하므로 별도 배포 단계는 없다.

> ℹ️ 클라우드 routine(`trig_018T2zHQMxWjbWGehjBixZWs`)도 만들어 두었으나, 클라우드↔GitHub
> 연동이 **읽기 전용**이라 `git push` 가 403(Resource not accessible by integration)으로 막혀
> **비활성화** 상태다. 완전 무인이 필요해지면 claude.ai 의 GitHub 연결에 write 권한을 부여한 뒤
> routine 을 `enabled:true` 로 되살리면 된다(수집·작성·검증·빌드까지는 이미 정상 동작 확인됨).

병합(`update_content.py`)만 떼어 CI 에서 `--dry-run` 검증에 쓸 수 있다(drop PR 게이트).
