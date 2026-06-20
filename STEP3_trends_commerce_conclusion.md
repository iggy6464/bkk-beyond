# STEP 3 소결론 — 트렌드 분석(#2) + 커머스 파이프라인(#4)

> BKK BEYOND / app.js v3→v4 · style v2→v3 · bkk_content.json 확장
> 작업일: 2026-06-04 · 범위: 신규 섹션 2종 (내부적으로 #2→#4 분리 진행)

---

## 1. 작업 개요 (What & Why)

### 1.1 두 개요의 구현 정의
| # | 개요 원문 | 구현 형태 |
|---|-----------|-----------|
| **#2** | TikTok/Reels 메타데이터 분석 → 핫플·Gen Z 패턴 | **트렌드 분석 섹션** (랭킹 + 게이지) |
| **#4** | 소비재·샵 연결 비즈니스 파이프라인 | **커머스 카드 섹션** (정보+외부링크) |

### 1.2 핵심 설계 판단 — 데이터 출처 (원칙 #4)
> **실시간 소셜 메타데이터 자동 수집은 불가** (TikTok/IG가 위치·해시태그 API 미제공, 스크래핑은 ToS·법적 리스크). 따라서 **에디터가 주기 분석 → JSON 입력 → 페이지가 시각화**하는 STEP2 일관 모델 채택. 개요 #3(주 2회 콘텐츠 운영)과도 정합.

---

## 2. 데이터 모델 확장

기존 `current` 하위에 2블록 추가, **기존 `translations`(curation 33키) 무손상**:
```
current: { version, theme, translations,   ← 불변
           trends: {...},   ← #2 신규
           shops: [...] }   ← #4 신규
```

### 2.1 스키마 + invariant (사전 검증 완료)
| 블록 | 내용 | invariant |
|------|------|-----------|
| `trends.hotspots[]` | rank·name·mentions·wow·tag | rank 1..N 연속 |
| `trends.patterns[]` | label_ko/en·value·unit | ko/en 필수 |
| `trends.source_note` | ko/en/th | 3언어 |
| `shops[]` | name·category(3언어)·price·map_url·shop_url·coupon | URL은 https 또는 빈문자 (보안) |

---

## 3. 구현 (분리 진행 — 원칙 #8)

### 3.1 #2 트렌드 (먼저)
- **HTML**: `#trends-section` (curation 다음) — 랭킹 카드 + 패턴 카드
- **app.js**: `renderTrends(lang)` — hotspots 랭킹(WoW 색상), patterns 게이지 바, source_note
- **CSS**: 네온 게이지(magenta→cyan), WoW 라임/마젠타

### 3.2 #4 커머스 (다음)
- **HTML**: `#shops-section` (itinerary 다음) — 카드 그리드 + 면책 문구
- **app.js**: `renderShops(lang)` — 카드별 가격·쿠폰·지도/샵 링크
- **CSS**: 호버 글로우, 쿠폰 라임 점선 박스

### 3.3 보안 처리 (원칙 준수)
- `safeUrl()`: **https 또는 빈문자열만 허용** (`javascript:` 등 차단)
- `esc()`: HTML 이스케이프 (XSS 방어)
- 모든 외부링크 `rel="noopener noreferrer"`
- **결제 기능 없음** — 외부 샵 채널 연결만 (금융 거래 미수행)

### 3.4 i18n
- 3언어(ko/en/th) 정적 라벨 키 추가 (subtitle/title/desc/rankTitle/patternTitle/disclaimer)
- 언어 전환 시 `renderTrends`/`renderShops` 재호출 → 동적 콘텐츠도 즉시 전환

---

## 4. 검증 (Evidence — file:// 환경)

| 항목 | 기대 | 실측 |
|------|:---:|:---:|
| 핫플 랭킹 항목 | 5 | **5 ✅** |
| 패턴 게이지 | 4 | **4 ✅** |
| source_note 표출 | O | **O ✅** |
| 샵 카드 | 4 | **4 ✅** |
| 외부 링크 | — | 5개 |
| **비-https 링크(보안)** | 0 | **0 ✅** |
| JS 런타임 에러 | 0 | **0 ✅** |
| 인라인 ≡ JSON | OK | **OK ✅** |
| curation 33키 보존 | 33 | **33 ✅** |

> 시각 캡처(`step3_render_trends.png`, `step3_render_shops.png`)로 Y2K 네온 일관성 확인.

---

## 5. Before / After

| 항목 | BEFORE (STEP2) | AFTER (STEP3) |
|------|----------------|---------------|
| 섹션 수 | 6 | **8** (+트렌드 +커머스) |
| 개요 #2 (트렌드) | 미구현 | ✅ 랭킹+패턴 시각화 |
| 개요 #4 (커머스) | 미구현 | ✅ 샵 카드+외부링크 |
| JSON current 블록 | 3 | 5 (+trends +shops) |
| app.js 렌더 함수 | 4 | 6 (+renderTrends +renderShops) |

---

## 6. 산출물 & Rollback
| 파일 | 위치 | 변경 |
|------|------|------|
| `app.js` | outputs | v4 (+2 렌더 함수, +3언어 키) |
| `style.css` | outputs | v3 (+트렌드/샵 네온) |
| `bkk_content.json` | outputs | +trends +shops |
| `index.html` | outputs | +2섹션, 인라인 재동기화 |
| `step3_render_*.png` | outputs | 증빙 |

**Rollback (원칙 #6):** `app.v3.js`/`style.v2.css`/`bkk_content.v2.json`/`index.v2.html` 보존 — 각 O(1). #2·#4가 한 데이터 블록씩 분리돼 있어 부분 롤백도 가능.

### 신규 invariant 등록 (원칙 #3)
- `trends.hotspots` rank는 1..N 연속 유지
- `shops[].map_url/shop_url`은 https 또는 빈문자열 (운영 입력 시 재검증)

---

## 7. 다음 단계 (예정)
- **Google Drive 연결**: 단계별 산출물 + 주간 아카이브(`archives[]`) 저장. STEP1~3 소결론·증빙 일괄 업로드 예정.
- 운영: 매주 `bkk_content.json`(trends/shops/curation) 갱신 → `build_inline.py` → 배포.
