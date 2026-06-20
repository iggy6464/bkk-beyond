# BKK BEYOND 🌃

방콕 방문 10회 이상의 **베테랑 여행자**를 위한 비밀 로컬 플레이스 큐레이션 랜딩페이지.

## 구조

| 파일 | 역할 |
|---|---|
| `index.html` | 메인 페이지 (외부 자산 분리형 — 서버 배포·운영용) |
| `style.css` / `app.js` | 스타일 / 인터랙션·다국어(ko·en·th)·퀴즈·큐레이션 |
| `bkk_content.json` | 콘텐츠 데이터 (`current` + `archives`) |
| `hero_bg.png` 등 | 이미지 자산 |
| `index_standalone.html` | 모든 자산 인라인 임베드 단일 파일 (공유·미리보기 전용, 빌드 산출물) |
| `build_standalone.py` | standalone 빌더 (`index.html` → `index_standalone.html`) |

## 로컬 미리보기

```bash
# 분리형 (권장 — 실제 배포와 동일)
python3 -m http.server 8000   # → http://localhost:8000

# 단일 파일 (서버 불필요, 더블클릭)
python3 build_standalone.py && open index_standalone.html
```

## 배포 (정적 호스팅)

세 가지 옵션 모두 빌드 설정 없이 그대로 배포됩니다.

### 옵션 A — Vercel (추천)
```bash
npm i -g vercel && vercel       # 프로젝트 루트에서 실행, 안내 따라가기
```

### 옵션 B — Netlify
```bash
npm i -g netlify-cli && netlify deploy --prod --dir=.
```

### 옵션 C — GitHub Pages
1. GitHub에 repo 푸시
2. Settings → Pages → Source: `main` 브랜치 / 루트(`/`)
3. 발급된 URL 확인

## ⚠️ 배포 후 필수 작업

도메인이 확정되면 아래 파일의 `REPLACE-WITH-YOUR-DOMAIN.com` 을 실제 도메인으로 일괄 치환하세요.
SNS 공유 썸네일(og:image)은 **절대 URL**이어야 동작합니다.

```bash
grep -rl "REPLACE-WITH-YOUR-DOMAIN.com" . --include="*.html" --include="*.xml" --include="*.txt"
# → index.html, sitemap.xml, robots.txt
```

치환 대상: `index.html`(canonical·og:url·og:image·twitter:image·JSON-LD), `sitemap.xml`, `robots.txt`
