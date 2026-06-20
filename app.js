document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. MULTILINGUAL DICTIONARY & STATE
     ========================================================================== */
  const translations = {
    ko: {
      "nav.quiz": "방콕지수 테스트",
      "nav.curation": "로컬 큐레이션",
      "nav.secrets": "미드나잇 바이브",
      "nav.itinerary": "커스텀 루트",
      
      "hero.subtitle": "Bangkok for the 10+ time travelers",
      "hero.title": "당신이 알던 방콕은 잊으세요.<span>11번째 방콕은 진짜 로컬이니까.</span>",
      "hero.desc": "카오산로드와 왓아룬을 벗어나, 현지 Gen Z들이 숨겨두고 모이는 예술 골목 송왓부터 한밤중의 미식 성지 반탓통까지. 오직 방콕 베테랑을 위해 큐레이션된 비밀 리스트를 만나보세요.",
      "hero.btnQuiz": "나의 방콕지수 진단하기",
      "hero.btnCuration": "로컬 큐레이션 탐색",

      "quiz.subtitle": "The Self-Diagnosis",
      "quiz.title": "당신의 방콕 지수는 몇 %인가요?",
      "quiz.desc": "10번을 다녀와도 몰랐던 숨겨진 사실들. 당신의 성향과 지식을 확인하고 등급을 받아보세요.",
      "quiz.resultBadge": "YOUR BKK LEVEL",
      "quiz.btnRestart": "다시 테스트하기",

      "curation.subtitle": "Handpicked Hotspots",
      "curation.title": "가장 뜨거운 로컬 골목 3가지 큐레이션",
      "curation.desc": "방콕 현지 크리에이터와 Gen Z 세대들이 주말마다 향하는 그들만의 숨겨진 거리를 소개합니다.",
      "curation.tabSongwat": "SONG WAT (송왓)",
      "curation.tabBanthatthong": "BAN THAT THONG (반탓통)",
      "curation.tabTalatnoi": "TALAT NOI (탈랏노이)",

      "secrets.badge": "Nocturnal Exclusives",
      "secrets.subtitle": "Chinatown & Thonglor After Dark",
      "secrets.title": "자정 이후에 열리는 스피크이지 & hi-fi 바이닐 바",
      "secrets.desc": "대중적인 클럽이나 루프탑 바를 벗어나 방콕의 힙스터, 예술가, 패션 피플들이 진지하게 음악과 특별한 향의 주류를 즐기기 위해 찾는 어두운 뒷골목 스피크이지 바입니다.",
      "secrets.spot1Title": "Freaking Out The Neighborhood",
      "secrets.spot1Desc": "통로 골목의 빈티지 레코드 바. LP 판이 돌며 흘러나오는 사이키델릭 록과 로파이 힙합, 로컬 크래프트 맥주와 하이볼 한 잔.",
      "secrets.spot2Title": "Teens of Thailand",
      "secrets.spot2Desc": "차이나타운 소이 나나 골목에 꼭꼭 숨은, 방콕 최초의 하이엔드 진(Gin) 바. 매일 현지 약초와 열대 과일로 레시피가 바뀌는 믹솔로지 진토닉의 세계.",
      "secrets.spot3Title": "Tax Bar",
      "secrets.spot3Desc": "태국의 무거운 술세금에 저항한다는 힙한 콘셉트의 바. 식초(Vinegar)와 각종 과실 발효액을 베이스로 해 어디서도 먹어보지 못한 신맛의 칵테일 제조.",

      "itinerary.subtitle": "Interactive Route Builder",
      "itinerary.title": "고수의 방콕 24시간 커스텀 여정",
      "itinerary.desc": "당신의 오늘의 여행 취향을 골라보세요. 방콕을 손바닥 들여다보듯 꿰고 있는 로컬 고수의 최적화된 하루 동선과 타임라인을 구성해 드립니다.",
      "itinerary.btnArtsy": "🎨 예술 & 카페",
      "itinerary.btnFoodie": "🍜 미식 노마드",
      "itinerary.btnNight": "🦉 올빼미 바이브",
      "itinerary.btnHeritage": "🛵 골목길 탐험",

      "trends.subtitle": "Social Signal Analysis",
      "trends.title": "지금 방콕에서 가장 뜨거운 신호",
      "trends.desc": "TikTok 촬영배경 위치태그와 Instagram Reels 해시태그를 주 2회 집계해, Gen Z가 실제로 모이는 골목과 콘텐츠 소비 패턴을 수치로 추적합니다.",
      "trends.rankTitle": "핫플레이스 랭킹",
      "trends.patternTitle": "Gen Z 소비·콘텐츠 패턴",

      "shops.subtitle": "From Feed to Cart",
      "shops.title": "그 골목의 소비재, 바로 연결",
      "shops.desc": "핫플레이스에서 본 그 커피, 그 디저트, 그 굿즈. 위치·가격·쿠폰을 한 카드에 모아 현지 샵으로 바로 연결합니다.",
      "shops.disclaimer": "* 가격·쿠폰은 변동될 수 있으며, 외부 링크는 각 샵의 공식 채널로 연결됩니다. 결제는 현지 샵에서 직접 진행됩니다.",

      "newsletter.badge": "Access the Secret Guide",
      "newsletter.title": "방콕 고수들의 비밀 지도 링크 받기",
      "newsletter.desc": "가이드북에는 절대 실리지 않는, 오직 현지 Gen Z 아티스트와 10회차 이상 베테랑들만 공유하는 **‘비밀 구글 맵 리스트 레이어’**와 매주 새로운 골목 정보가 실리는 뉴스레터를 지금 무료로 받아보세요.",
      "newsletter.placeholder": "이메일 주소를 입력해 주세요",
      "newsletter.btn": "비밀 지도 받기",
      "newsletter.success": "🎉 축하합니다! 방콕 비밀 구글맵 레이어 지도 링크가 성공적으로 전송되었습니다! 이메일함을 확인해 주세요.",
      "newsletter.error": "올바른 이메일 주소를 입력해 주세요.",

      "footer.about": "대중적인 관광지를 넘어 방콕의 숨겨진 영감과 힙한 로컬 문화를 탐사하는 베테랑들의 클럽입니다.",
      "footer.exploreTitle": "Explore",
      "footer.districtsTitle": "Districts",
      "footer.supportTitle": "Support",
      "footer.supportLink1": "비밀 지도 문의",
      "footer.supportLink2": "파트너 협업",
      "footer.supportLink3": "개인정보 처리방침"
    },
    en: {
      "nav.quiz": "BKK Index Quiz",
      "nav.curation": "Local Curation",
      "nav.secrets": "Midnight Vibes",
      "nav.itinerary": "Custom Routes",
      
      "hero.subtitle": "Bangkok for the 10+ time travelers",
      "hero.title": "Forget the Bangkok you knew.<span>The 11th Bangkok is authentic local.</span>",
      "hero.desc": "Escape Khao San and Wat Arun. Explore Song Wat—where local Gen Z artists gather in historic shophouses, and Ban That Thong—the midnight culinary playground. Curated exclusively for Bangkok veterans.",
      "hero.btnQuiz": "Diagnose My BKK Index",
      "hero.btnCuration": "Explore Curation",

      "quiz.subtitle": "The Self-Diagnosis",
      "quiz.title": "What is your BKK Index?",
      "quiz.desc": "Hidden facts you might not know even after 10 visits. Check your travel style and get your tier.",
      "quiz.resultBadge": "YOUR BKK LEVEL",
      "quiz.btnRestart": "Restart Quiz",

      "curation.subtitle": "Handpicked Hotspots",
      "curation.title": "3 Trendiest Local Alleys Curated",
      "curation.desc": "Introducing the secret streets where Bangkok creators and Gen Z head every weekend.",
      "curation.tabSongwat": "SONG WAT",
      "curation.tabBanthatthong": "BAN THAT THONG",
      "curation.tabTalatnoi": "TALAT NOI",

      "secrets.badge": "Nocturnal Exclusives",
      "secrets.subtitle": "Chinatown & Thonglor After Dark",
      "secrets.title": "Midnight Speakeasy & Hi-Fi Vinyl Bars",
      "secrets.desc": "Escape touristy clubs. Bangkok's trendsetters, artists, and music lovers gather in these dim alleyway speakeasies to appreciate deep tracks and artisanal drinks.",
      "secrets.spot1Title": "Freaking Out The Neighborhood",
      "secrets.spot1Desc": "A cozy vinyl record bar in Thonglor. Enjoy high-fidelity psychedelic rock, lofi hip hop, highballs, and draft beers.",
      "secrets.spot2Title": "Teens of Thailand",
      "secrets.spot2Desc": "Bangkok's legendary gin bar in Soi Nana. Serves signature mixology gin tonics with local herbs that change daily.",
      "secrets.spot3Title": "Tax Bar",
      "secrets.spot3Desc": "A rebellious bar mocking local alcohol tax. Known for creating sour cocktails using organic vinegar and fermented fruits.",

      "itinerary.subtitle": "Interactive Route Builder",
      "itinerary.title": "24h Custom Expert Itinerary",
      "itinerary.desc": "Choose your travel mood today. We dynamically construct a 24-hour timeline and optimized route curated by a local expert.",
      "itinerary.btnArtsy": "🎨 Artsy & Cafe",
      "itinerary.btnFoodie": "🍜 Gourmet Nomad",
      "itinerary.btnNight": "🦉 Night Owl",
      "itinerary.btnHeritage": "🛵 Alley Explorer",

      "trends.subtitle": "Social Signal Analysis",
      "trends.title": "The Hottest Signals in Bangkok Now",
      "trends.desc": "We aggregate TikTok location tags and Instagram Reels hashtags twice a week to track—by the numbers—which alleys Gen Z actually flock to and how they consume content.",
      "trends.rankTitle": "Hotspot Ranking",
      "trends.patternTitle": "Gen Z Consumption Patterns",

      "shops.subtitle": "From Feed to Cart",
      "shops.title": "That Alley's Goods, One Tap Away",
      "shops.desc": "That coffee, that dessert, that piece of art you saw on the feed. Location, price, and coupons in one card—linking straight to the local shop.",
      "shops.disclaimer": "* Prices and coupons may change. External links lead to each shop's official channel. Payment is handled directly at the local shop.",

      "newsletter.badge": "Access the Secret Guide",
      "newsletter.title": "Get the Secret BKK Google Map Link",
      "newsletter.desc": "Subscribe to receive our exclusive Google Maps Layer—never published in guidebooks—curated by Gen Z artists, along with weekly local hotspot newsletters.",
      "newsletter.placeholder": "Enter your email address",
      "newsletter.btn": "Get Secret Map",
      "newsletter.success": "🎉 Congratulations! The secret Google Maps link has been sent to your email. Check your inbox!",
      "newsletter.error": "Please enter a valid email address.",

      "footer.about": "A club for Bangkok veterans exploring hidden inspirations and hip local culture beyond commercial sights.",
      "footer.exploreTitle": "Explore",
      "footer.districtsTitle": "Districts",
      "footer.supportTitle": "Support",
      "footer.supportLink1": "Map Inquiries",
      "footer.supportLink2": "Partnership",
      "footer.supportLink3": "Privacy Policy"
    },
    th: {
      "nav.quiz": "แบบทดสอบดัชนีกรุงเทพฯ",
      "nav.curation": "จุดคัดสรรโลคอล",
      "nav.secrets": "บาร์ลับเที่ยงคืน",
      "nav.itinerary": "เส้นทางส่วนตัว",
      
      "hero.subtitle": "Bangkok for the 10+ time travelers",
      "hero.title": "ลืมกรุงเทพฯ ที่คุณเคยรู้จักไปได้เลย<span>เพราะกรุงเทพฯ ครั้งที่ 11 จะเป็นโลคอลตัวจริง</span>",
      "hero.desc": "หลีกหนีจากข้าวสารและวัดอรุณฯ มาสำรวจถนนทรงวาดที่เหล่านักสร้างสรรค์และ Gen Z มารวมตัวกันในตึกแถวโบราณ และบรรทัดทอง แหล่งกินดื่มยามค่ำคืน คัดสรรพิเศษเพื่อผู้เชี่ยวชาญกรุงเทพฯ ตัวจริง",
      "hero.btnQuiz": "ตรวจระดับความเป็นกรุงเทพฯ ของคุณ",
      "hero.btnCuration": "สำรวจจุดคัดสรร",

      "quiz.subtitle": "The Self-Diagnosis",
      "quiz.title": "ดัชนีความเป็นกรุงเทพฯ ของคุณอยู่ที่กี่ %?",
      "quiz.desc": "เรื่องลับๆ ที่คุณอาจไม่รู้แม้จะมาเกิน 10 ครั้ง เช็คสไตล์การเดินทางและรับระดับของคุณเลย",
      "quiz.resultBadge": "YOUR BKK LEVEL",
      "quiz.btnRestart": "เริ่มทดสอบใหม่",

      "curation.subtitle": "Handpicked Hotspots",
      "curation.title": "3 ตรอกโลคอลที่ฮิปที่สุดที่คัดสรรมาแล้ว",
      "curation.desc": "ขอแนะนำถนนลับที่เหล่านักสร้างสรรค์และวัยรุ่นกรุงเทพฯ ต่างมุ่งหน้าไปทุกวันหยุดสุดสัปดาห์",
      "curation.tabSongwat": "ทรงวาด",
      "curation.tabBanthatthong": "บรรทัดทอง",
      "curation.tabTalatnoi": "ตลาดน้อย",

      "secrets.badge": "Nocturnal Exclusives",
      "secrets.subtitle": "Chinatown & Thonglor After Dark",
      "secrets.title": "บาร์ลับเที่ยงคืน & ไฮไฟแผ่นเสียง",
      "secrets.desc": "หลีกหนีจากคลับท่องเที่ยวทั่วไป เหล่าคนทำงานสร้างสรรค์ ศิลปิน และคนรักดนตรีในกรุงเทพฯ มักมารวมตัวกันที่บาร์ลับในซอกตึก เพื่อดื่มด่ำกับเสียงเพลงระดับไฮไฟและเครื่องดื่มสูตรพิเศษ",
      "secrets.spot1Title": "Freaking Out The Neighborhood",
      "secrets.spot1Desc": "บาร์แผ่นเสียงสุดอบอุ่นในซอยทองหล่อ ฟังเพลงแนวไซเคเดลิกร็อก โลไฟฮิปฮอป พร้อมเบียร์คราฟต์และไฮ볼เย็นฉ่ำ",
      "secrets.spot2Title": "Teens of Thailand",
      "secrets.spot2Desc": "บาร์จินระดับตำนานแห่งแรกในซอยนานา เยาวราช เสิร์ฟจินโทนิคมิกโซโลจีสูตรสมุนไพรไทยและผลไม้ท้องถิ่นที่เปลี่ยนไปทุกวัน",
      "secrets.spot3Title": "Tax Bar",
      "secrets.spot3Desc": "บาร์สไตล์ขบถที่สะท้อนถึงการเก็บภาษีแอลกอฮอล์ที่สูงเด่น โดดเด่นด้วยค็อกเทลรสเปรี้ยวที่ใช้โฮมเมดน้ำส้มสายชูและผลไม้หมัก",

      "itinerary.subtitle": "Interactive Route Builder",
      "itinerary.title": "เส้นทางส่วนตัว 24 ชั่วโมงโดยผู้เชี่ยวชาญ",
      "itinerary.desc": "เลือกอารมณ์การเดินทางของคุณวันนี้ เราจะช่วยวางแผนการเดินทางใน 24 ชั่วโมงที่เหมาะสมที่สุด คัดสรรโดยคนท้องถิ่นระดับพระกาฬ",
      "itinerary.btnArtsy": "🎨 ศิลปะ & คาเฟ่",
      "itinerary.btnFoodie": "🍜 นักชิมเที่ยงคืน",
      "itinerary.btnNight": "🦉 ผีเสื้อราตรี",
      "itinerary.btnHeritage": "🛵 ตะลุยตรอกซอกซอย",

      "trends.subtitle": "Social Signal Analysis",
      "trends.title": "สัญญาณที่ร้อนแรงที่สุดในกรุงเทพฯ ตอนนี้",
      "trends.desc": "เรารวบรวม location tag จาก TikTok และแฮชแท็ก Reels สัปดาห์ละ 2 ครั้ง เพื่อติดตามเป็นตัวเลขว่า Gen Z ไปรวมตัวกันที่ซอยไหนและบริโภคคอนเทนต์อย่างไร",
      "trends.rankTitle": "อันดับสถานที่ฮอต",
      "trends.patternTitle": "พฤติกรรมการบริโภคของ Gen Z",

      "shops.subtitle": "From Feed to Cart",
      "shops.title": "สินค้าของซอยนั้น เชื่อมต่อทันที",
      "shops.desc": "กาแฟ ขนม และของแต่งที่คุณเห็นในฟีด รวมตำแหน่ง ราคา และคูปองไว้ในการ์ดเดียว เชื่อมตรงไปยังร้านท้องถิ่น",
      "shops.disclaimer": "* ราคาและคูปองอาจเปลี่ยนแปลงได้ ลิงก์ภายนอกจะนำไปยังช่องทางทางการของแต่ละร้าน การชำระเงินทำที่ร้านโดยตรง",

      "newsletter.badge": "Access the Secret Guide",
      "newsletter.title": "รับลิงก์แผนที่ลับกูเกิลแมพกรุงเทพฯ",
      "newsletter.desc": "สมัครรับแผนที่กูเกิลแมพเวอร์ชันพิเศษ—ที่ไม่มีในไกด์บุ๊กทั่วไป—รวบรวมโดยศิลปิน Gen Z พร้อมจดหมายข่าวอัปเดตสปอตใหม่รายสัปดาห์",
      "newsletter.placeholder": "กรุณากรอกอีเมลของคุณ",
      "newsletter.btn": "รับแผนที่ลับ",
      "newsletter.success": "🎉 ยินดีด้วย! ส่งลิงก์แผนที่ลับเรียบร้อยแล้ว กรุณาตรวจสอบกล่องข้อความในอีเมลของคุณ!",
      "newsletter.error": "กรุณากรอกอีเมลให้ถูกต้อง",

      "footer.about": "คลับสำหรับผู้เชี่ยวชาญกรุงเทพฯ เพื่อออกสำรวจแรงบันดาลใจลับๆ และวัฒนธรรมท้องถิ่นที่ลึกซึ้ง เหนือแหล่งท่องเที่ยวทั่วไป",
      "footer.exploreTitle": "สำรวจ",
      "footer.districtsTitle": "ย่านดัง",
      "footer.supportTitle": "ช่วยเหลือ",
      "footer.supportLink1": "สอบถามเรื่องแผนที่",
      "footer.supportLink2": "ร่วมงานกับเรา",
      "footer.supportLink3": "นโยบายความเป็นส่วนตัว"
    }
  };


  /* ==========================================================================
     2. QUIZ DATA STRUCTURE BY LANGUAGE
     ========================================================================== */
  const quizQuestions = {
    ko: [
      {
        question: "주말 오후, 당신이 가장 선호하는 방콕의 동네는?",
        options: [
          { text: "시암 스퀘어 원이나 아이콘 시암에서 쇼핑하기", score: 10 },
          { text: "아리(Ari)의 골목길 안쪽 감성 카페 투어하기", score: 20 },
          { text: "송왓(Song Wat)의 100년 된 한자 상가 갤러리 훑어보기", score: 30 }
        ]
      },
      {
        question: "해 질 녘, 방콕의 첫 노을과 야경을 즐기는 장소는?",
        options: [
          { text: "짜오프라야 강변의 유명 왓아룬 뷰 루프탑 바", score: 10 },
          { text: "탈랏노이(Talat Noi) 골목길 끝 허름한 리버사이드 브루어리 카페", score: 30 },
          { text: "Thonglor의 세련된 펜트하우스 칵테일 라운지", score: 20 }
        ]
      },
      {
        question: "한밤중 출출할 때, 당신이 향하는 야식 스팟은?",
        options: [
          { text: "카오산 로드의 길거리 팟타이와 스프링롤", score: 10 },
          { text: "반탓통(Ban That Thong)에 가서 현지 대학생들과 크리스피 누들 줄 서기", score: 30 },
          { text: "차이나타운(Yaowarat) 메인 스트리트의 구운 빵과 오징어 구이", score: 20 }
        ]
      },
      {
        question: "오늘 밤 음악과 칵테일 한 잔이 필요할 때, 당신의 선택은?",
        options: [
          { text: "오닉스(Onyx)나 루트66 등 RCA의 대형 클럽", score: 15 },
          { text: "통로(Thonglor)에 숨어있는 어두운 바이닐 재즈 바", score: 20 },
          { text: "차이나타운 소이 나나(Soi Nana)의 독특한 아시안 허브 약재 믹솔로지 바", score: 30 }
        ]
      }
    ],
    en: [
      {
        question: "Your favorite weekend afternoon spot in Bangkok?",
        options: [
          { text: "Shopping at Siam Square One or Icon Siam", score: 10 },
          { text: "Cafe hopping deep in the alleys of Ari", score: 20 },
          { text: "Browsing art galleries in century-old Chinese shophouses on Song Wat Road", score: 30 }
        ]
      },
      {
        question: "Where do you enjoy the twilight sunset and night views?",
        options: [
          { text: "Famous Wat Arun view rooftop bar along Chao Praya River", score: 10 },
          { text: "A rustic riverside brewery cafe at the end of Talat Noi alleys", score: 30 },
          { text: "A sophisticated penthouse cocktail lounge in Thonglor", score: 20 }
        ]
      },
      {
        question: "Where do you head when feeling hungry late at night?",
        options: [
          { text: "Street pad thai and spring rolls on Khao San Road", score: 10 },
          { text: "Queuing for crispy noodles with local students in Ban That Thong", score: 30 },
          { text: "Toasted buns and grilled squid on Yaowarat main street", score: 20 }
        ]
      },
      {
        question: "When you need music and a drink tonight, your choice is?",
        options: [
          { text: "Massive clubs in RCA like Onyx or Route66", score: 15 },
          { text: "A dim, cozy vinyl jazz bar hidden in Thonglor", score: 20 },
          { text: "A unique Asian herbal mixology bar in Chinatown's Soi Nana", score: 30 }
        ]
      }
    ],
    th: [
      {
        question: "บ่ายวันเสาร์อาทิตย์ที่ชอบที่สุดในกรุงเทพฯ คือที่ไหน?",
        options: [
          { text: "ช้อปปิ้งที่สยามสแควร์วัน หรือไอคอนสยาม", score: 10 },
          { text: "ทัวร์คาเฟ่ชิคๆ ลึกเข้าไปในซอยอารีย์", score: 20 },
          { text: "ชมอาร์ตแกลเลอรีในตึกแถวจีนอายุร้อยปีบนถนนทรงวาด", score: 30 }
        ]
      },
      {
        question: "จุดชมพระอาทิตย์ตกดินและวิวยามค่ำคืนที่คุณเลือกคือที่ไหน?",
        options: [
          { text: "รูฟท็อปบาร์วิววัดอรุณชื่อดังริมแม่น้ำเจ้าพระยา", score: 10 },
          { text: "คาเฟ่บริวเวอรีริมแม่น้ำสุดคลาสสิกที่ปลายตรอกตลาดน้อย", score: 30 },
          { text: "เพนท์เฮาส์ค็อกเทลเลานจ์สุดหรูในย่านทองหล่อ", score: 20 }
        ]
      },
      {
        question: "จุดกินมื้อดึกเมื่อคุณหิวตอนเที่ยงคืน?",
        options: [
          { text: "ผัดไทยและปอเปี๊ยะข้างทางบนถนนข้าวสาร", score: 10 },
          { text: "ต่อคิวก๋วยเตี๋ยวคั่วไก่กรอบกับนักศึกษาที่บรรทัดทอง", score: 30 },
          { text: "ขนมปังปิ้งและปลาหมึกย่างบนถนนสายหลักเยาวราช", score: 20 }
        ]
      },
      {
        question: "เมื่อคุณต้องการเสียงเพลงและเครื่องดื่มคืนนี้?",
        options: [
          { text: "คลับขนาดใหญ่ย่าน RCA เช่น Onyx หรือ Route66", score: 15 },
          { text: "บาร์แจ๊สแผ่นเสียงสลัวๆ ซ่อนตัวอยู่ในทองหล่อ", score: 20 },
          { text: "บาร์สมุนไพรเอเชียแบบมิกโซโลจีในซอยนานา เยาวราช", score: 30 }
        ]
      }
    ]
  };


  /* ==========================================================================
     3. ITINERARY SCHEDULE DATA BY LANGUAGE
     ========================================================================== */
  const itineraries = {
    ko: {
      artsy: {
        title: "예술과 감성 가득한 송왓-탈랏노이 한 바퀴",
        desc: "카메라 셔터와 커피 한 모금, 그리고 감각적인 아트 전시를 위한 완벽한 코스",
        steps: [
          { time: "13:00 PM", title: "Song Wat Coffee Roasters에서 에스프레소 타임", desc: "송왓 특유의 고즈넉한 대낮 골목 향기를 즐기며, 우유 크림이 얹어진 부드러운 코코넛 더티 에스프레소로 하루를 깨웁니다." },
          { time: "15:00 PM", title: "PLAY Art House 전시 관람", desc: "골목 바로 근처에 위치한 블루 컬러 대문의 한자 상가를 리모델링한 예술 극장식 갤러리에서 신진 아티스트들의 멋진 영감을 감상합니다." },
          { time: "17:00 PM", title: "탈랏노이 Citizen Tea House의 진한 타이 밀크티", desc: "오렌지 컬러의 예술적 인테리어 공간에서, 대담하고 정갈한 맛의 타이 블렌딩 아이스티와 함께 수공예 굿즈들을 슥 훑어봅니다." },
          { time: "19:30 PM", title: "Baan Rim Naam에서 강변 저녁 식사와 로컬 비어", desc: "한적한 짜오프라야 강 바로 옆의 목조건물에 걸터앉아 잔잔하게 연주되는 어쿠스틱 라이브 음악을 들으며 싱하 맥주와 태국 크리스피 포크 요리를 즐깁니다." }
        ]
      },
      foodie: {
        title: "침샘이 폭발하는 반탓통 릴레이 미식 투어",
        desc: "위장에 빈자리 하나 없이 빽빽하게 현지 최상급 야식을 채우는 고수용 먹부림 코스",
        steps: [
          { time: "17:00 PM", title: "Ann Guay Tiew Kua Gai의 볶음 국수로 시작", desc: "본격적인 야식 대기 줄이 길어지기 전, 기름 솥에서 고소하게 바삭함을 극대화한 태국식 치킨 누들(꾸아이띠아우 쿠아까이)로 위밍업을 시작합니다." },
          { time: "19:00 PM", title: "Nueng Nom Nua 판단 디저트 대기 예약", desc: "엄청난 웨이팅을 자랑하므로 먼저 대기 앱으로 예약번호를 뽑아둔 후, 근처 반탓통 거리를 산책하며 화려한 현지 불빛들을 구경합니다." },
          { time: "21:00 PM", title: "버터 향 폭탄 토스트와 판단 커스터드 잼 섭취", desc: "예약 차례가 오면 입장하여 갓 구운 고소한 브리오슈 식빵 한 조각을 녹진한 판단 디핑소스에 듬뿍 적셔 차가운 차놈(밀크티)과 흡입합니다." },
          { time: "23:00 PM", title: "Jeh O Chula의 궁극의 똠얌 라면으로 야식의 화룡점정", desc: "자정이 되면 주문할 수 있는 해물 잔뜩 얹어 보글보글 끓여낸 똠얌 마마 라면 한 그릇으로 얼큰하고 개운하게 반탓통 미식을 마무리합니다." }
        ]
      },
      night: {
        title: "차이나타운-통로 바이닐 & 스피크이지 투어",
        desc: "몽환적인 조명, 좋은 사운드, 그리고 감각적인 알코올이 지배하는 한밤의 자유",
        steps: [
          { time: "20:30 PM", title: "Teens of Thailand에서 수제 진토닉 스타트", desc: "소이 나나 골목의 상징적인 무거운 중국풍 대문을 열고 들어가 그날 바텐더가 엄선한 태국 약재와 진을 베이스로 완성한 독특한 향의 진토닉 한 잔을 맛봅니다." },
          { time: "22:00 PM", title: "Tax Bar에서 신맛의 독특한 창작 칵테일 탐닉", desc: "바로 이웃한 어두운 철조망 분위기의 Tax Bar로 이동해 유기농 과일 발효 식초 베이스의 개성 강한 식초 칵테일을 홀짝이며 밤의 농도를 더합니다." },
          { time: "23:45 PM", title: "Freaking Out The Neighborhood로 이동", desc: "택시를 타고 힙스터들의 본진 통로 골목으로 빠르게 이동해, 복고풍 턴테이블이 돌아가며 내뿜는 아날로그 음향과 시원한 드래프트 맥주로 밤을 달굽니다." }
        ]
      },
      heritage: {
        title: "진짜 골목 골목을 헤집는 모험가 코스",
        desc: "타임머신을 타고 수십 년 전 방콕으로 돌아간 듯, 로컬의 숨결을 그대로 만나는 루트",
        steps: [
          { time: "11:00 AM", title: "올드타운의 유서 깊은 차인 아침 식사", desc: "오래된 동네 다방 온록유안(On Lok Yun) 혹은 근처 야오와랏 뒷골목 노점에서 카야 잼 토스트와 수란, 연유를 듬뿍 넣은 태국 전통 코피(Kopi)로 이국적인 아침을 엽니다." },
          { time: "13:30 PM", title: "탈랏노이 골목길 벽화 & 철공소 미로 속 탐험", desc: "벽면에 그려진 아름다운 오페라 그림과 수십 년 된 녹슨 차 부품이 골동품처럼 쌓인 좁은 골목길을 셔터를 누르며 느릿하게 거닙니다." },
          { time: "15:30 PM", title: "Mother Roaster에서 80세 바리스타 할머니의 드립 커피", desc: "오래된 2층 목조건물 구석에 숨은 공간에서 바리스타 할머니의 연륜이 깃든 느리고 정교한 드립 커피를 마시며 진정한 '슬로우 방콕'을 만끽합니다." }
        ]
      }
    },
    en: {
      artsy: {
        title: "Artsy & Cafe hopping around Song Wat & Talat Noi",
        desc: "A perfect sequence for camera shutters, delicious sips, and gorgeous indie exhibits.",
        steps: [
          { time: "13:00 PM", title: "Espresso time at Song Wat Coffee Roasters", desc: "Wake up your day with a rich Coconut Dirty Espresso while absorbing the calm, historical afternoon atmosphere of Song Wat." },
          { time: "15:00 PM", title: "Appreciate emerging art at PLAY Art House", desc: "Walk into this beautiful blue-doored Chinese theater-turned-gallery displaying amazing installations from Thai visual artists." },
          { time: "17:00 PM", title: "Signature Thai milk tea at Citizen Tea House", desc: "Unwind inside this stylish orange salon, sip premium blended iced tea, and browse custom local textile accessories." },
          { time: "19:30 PM", title: "Riverside dinner and Singha beer at Baan Rim Naam", desc: "Sit right by the Chao Phraya River on a vintage wooden deck, listen to smooth acoustic tracks, and enjoy crispy pork dishes." }
        ]
      },
      foodie: {
        title: "Mouth-watering Ban That Thong midnight food marathon",
        desc: "A heavy-hitting gourmet course filling your stomach with the city's highest viral late-night dishes.",
        steps: [
          { time: "17:00 PM", title: "Kickstart with crispy pan-fried noodles at Ann Kua Gai", desc: "Beat the massive dinner queues and enjoy local pan-fried chicken noodles with crispy textures cooked over hot coal grills." },
          { time: "19:00 PM", title: "Reserve queue for Nueng Nom Nua warm dessert", desc: "Line up via mobile queue apps, then leisurely stroll around Ban That Thong to absorb the vibrant student neon light scene." },
          { time: "21:00 PM", title: "Melt under toasted brioche buns with homemade pandan jam", desc: "When your number gets called, dive into hot buttered bread slices dipped in warm, aromatic pandan custard accompanied by cold milk tea." },
          { time: "23:00 PM", title: "Giant Seafood Tom Yum Mama noodles at Jeh O Chula", desc: "Cap off the night with the ultimate spicy masterpiece: a steaming hot pot of creamy Tom Yum noodles loaded with crab, shrimp, and pork." }
        ]
      },
      night: {
        title: "Chinatown & Thonglor high-fidelity vinyl and gin tour",
        desc: "Dreamy neon glows, top-tier sound systems, and unique mixologies dominating the night.",
        steps: [
          { time: "20:30 PM", title: "Artisanal Gin Tonics at Teens of Thailand", desc: "Push open the heavy wooden door on Soi Nana street and enjoy craft gin tonics infused with local Thai botanical recipes that change daily." },
          { time: "22:00 PM", title: "Sour-fermented cocktail experiments at Tax Bar", desc: "Move right next door to Tax Bar, sip sour-base organic vinegar mixologies, and discuss local underground scene." },
          { time: "23:45 PM", title: "Appreciate analog tracks at Freaking Out The Neighborhood", desc: "Grab a cab to Thonglor and heat up the night inside this hipster hi-fi sanctuary listening to psychedelic rock and lofi hip-hop vinyls." }
        ]
      },
      heritage: {
        title: "Vintage labyrinth & historic alley explorer route",
        desc: "Step inside a local time-machine to witness traditional community lifestyles.",
        steps: [
          { time: "11:00 AM", title: "Historic Chinese-Thai breakfast in Old Town", desc: "Indulge in sweet kaya toasts, soft-boiled eggs, and traditional strong coffee (Kopi) inside vintage diner On Lok Yun." },
          { time: "13:30 PM", title: "Talat Noi vintage engine parts & wall murals labyrinth", desc: "Roam deep through narrow maze alleys surrounded by stacked rusty car pieces, cute street cats, and gorgeous opera wall paintings." },
          { time: "15:30 PM", title: "Drip coffee by an 80-year-old barista at Mother Roaster", desc: "Climb up to the hidden attic above a mechanical warehouse to enjoy custom slow drips carefully crafted by senior baristas." }
        ]
      }
    },
    th: {
      artsy: {
        title: "เสพศิลป์และจิบกาแฟรอบทรงวาด-ตลาดน้อย",
        desc: "เส้นทางที่สมบูรณ์แบบสำหรับผู้ที่รักการถ่ายภาพ กาแฟรสเยี่ยม และแกลเลอรีเก๋ๆ",
        steps: [
          { time: "13:00 PM", title: "จิบเอสเปรสโซ่ชั้นดีที่ Song Wat Coffee Roasters", desc: "เริ่มต้นวันใหม่ด้วยเมนู Coconut Dirty ที่หอมละมุน ซึมซับบรรยากาศตึกเก่าที่เงียบสงบในยามบ่ายของทรงวาด" },
          { time: "15:00 PM", title: "ชมงานศิลปะร่วมสมัยที่ PLAY Art House", desc: "เดินเข้าตึกจีนประตูสีน้ำเงินโบราณที่รีโนเวทเป็นโรงละครศิลปะ ชมการจัดแสดงภาพวาดของศิลปินไทยรุ่นใหม่" },
          { time: "17:00 PM", title: "จิบชาไทยสูตรพิเศษที่ Citizen Tea House ย่านตลาดน้อย", desc: "พักผ่อนในร้านชาโทนสีส้มแสนสวย จิบชาไทยเบลนด์รสเข้มข้น พร้อมเลือกชมสินค้าสิ่งทอดีไซน์แฮนด์เมด" },
          { time: "19:30 PM", title: "ดินเนอร์ริมแม่น้ำเจ้าพระยาพร้อมเบียร์เย็นๆ ที่บ้านริมน้ำ", desc: "นั่งชิลบนระเบียงไม้เก่าริมน้ำ ฟังเพลงอะคูสติกสดสบายๆ พร้อมทานอาหารใต้รสจัดจ้านและหมูกรอบแสนอร่อย" }
        ]
      },
      foodie: {
        title: "มหกรรมทัวร์กินแหลกบรรทัดทองยามค่ำคืน",
        desc: "เส้นทางของนักกินตัวจริงที่จะเติมเต็มกระเพาะของคุณด้วยสปอตสตรีทฟู้ดสุดฮิตยามดึก",
        steps: [
          { time: "17:00 PM", title: "เริ่มต้นด้วยก๋วยเตี๋ยวคั่วไก่กรอบร้อนๆ ที่ แอน ก๋วยเตี๋ยวคั่วไก่", desc: "หลีกเลี่ยงคิวมื้อเย็นที่ยาวเหยียดด้วยการมาทานคั่วไก่ไข่อบเตาถ่านหอมกรุ่นกรอบนอกนุ่มในก่อนใคร" },
          { time: "19:00 PM", title: "กดคิวรอขนมปังปิ้งร้าน หนึ่ง นม นัว", desc: "จองคิวผ่านแอปพลิเคชัน จากนั้นเดินเล่นรับลมเย็นๆ ชมป้ายไฟนีออนรอบถนนบรรทัดทองยามเย็น" },
          { time: "21:00 PM", title: "ละลายไปกับขนมปังเนยปิ้งจิ้มสังขยาใบเตยอุ่นๆ", desc: "เมื่อถึงคิว ลองชิมขนมปังปิ้งหอมเนยกรอบๆ จิ้มดิปสังขยาใบเตยสูตรโฮมเมด ทานคู่กับนมสดเย็นเจี๊ยบ" },
          { time: "23:00 PM", title: "ต้มยำมาม่าหม้อไฟเจ๊โอวปิดท้ายค่ำคืนอันสมบูรณ์", desc: "ลิ้มลองเมนูต้มยำมาม่ารอบดึกที่เต็มไปด้วยกุ้ง ปู หมูกรอบ ไข่ต้ม ครบรสเผ็ดเปรี้ยวสะใจคนกรุง" }
        ]
      },
      night: {
        title: "ทัวร์บาร์แผ่นเสียงและบาร์จินลับเยาวราช-ทองหล่อ",
        desc: "แสงนีออนสลัวๆ เครื่องเสียงระดับไฮไฟ และเครื่องดื่มมิกโซโลจีแสนพิเศษที่จะครองค่ำคืนนี้",
        steps: [
          { time: "20:30 PM", title: "เริ่มค่ำคืนด้วยจินโทนิคสูตรพิเศษที่ Teens of Thailand", desc: "ผลักประตูไม้โบราณบานใหญ่ในซอยนานา เยาวราช ดื่มด่ำกับจินโทนิคที่ใช้วัตถุดิบสมุนไพรไทยที่เปลี่ยนไปทุกวัน" },
          { time: "22:00 PM", title: "ลองเครื่องดื่มรสเปรี้ยวหมักธรรมชาติที่ Tax Bar", desc: "ย้ายไปร้านข้างๆ อย่าง Tax Bar จิบค็อกเทลรสชาติเปรี้ยวจากน้ำส้มสายชูหมักผลไม้ออร์แกนิกในบรรยากาศดิบเท่" },
          { time: "23:45 PM", title: "ฟังเพลงแผ่นเสียงไฮไฟที่ Freaking Out The Neighborhood", desc: "นั่งแท็กซี่ไปทองหล่อ ปิดท้ายคืนด้วยบาร์แผ่นเสียง สดับรับฟังเพลงแนวไซเคเดลิกร็อกและโลไฟฮิปฮอปคุณภาพเสียงเยี่ยม" }
        ]
      },
      heritage: {
        title: "นักสำรวจตรอกเก่าตลาดน้อยและเมืองเก่า",
        desc: "ก้าวเข้าสู่ไทม์แมชชีนเพื่อสัมผัสเสน่ห์วิถีชีวิตดั้งเดิมของชุมชนไทย-จีน",
        steps: [
          { time: "11:00 AM", title: "มื้อเช้าสไตล์จีนโบราณที่ออนล็อกหยุ่น", desc: "ทานขนมปังปิ้งสังขยา ไข่ลวก ไส้กรอก และกาแฟร้อนใส่นมข้นหวาน (โกปี๊) ในร้านอาหารเช้าสไตล์레트로สุดคลาสสิก" },
          { time: "13:30 PM", title: "ตะลุยตรอกเซียงกงตลาดน้อยและสตรีทอาร์ทสีสันสวยงาม", desc: "เดินลัดเลาะไปตามตรอกซอกซอยที่เต็มไปด้วยเศษเหล็กและเครื่องยนต์เก่าสลับกับภาพเขียนผนังที่สะท้อนประวัติศาสตร์ของย่าน" },
          { time: "15:30 PM", title: "กาแฟดริปฝีมือคุณป้าบาริสต้าวัย 80 ที่ Mother Roaster", desc: "ขึ้นบันไดชันไปชั้นสองของโกดังเก่า จิบกาแฟดริปสโลว์บาร์ฝีมือบาริสต้าสูงวัยที่ชงด้วยความพิถีพิถันสูงสุด" }
        ]
      }
    }
  };

  let curationData = null;
  let currentVersion = 'current';

  // ── Curation DB 로딩 (v3 / STEP2: file:// 하이브리드) ──────────────
  // 전략: fetch(http) 우선 → 실패 시(file:// CORS 등) 인라인 <script> JSON fallback.
  //   · http 서버 배포: fetch 성공 → JSON이 ground truth (매주 갱신 즉시 반영)
  //   · file:// 직접 열기: fetch 차단 → #bkk-data 인라인 JSON 사용 (안전망)
  // 인라인 JSON은 build_inline.py가 bkk_content.json에서 자동 주입/검증한다.
  function loadInlineCurationData() {
    var el = document.getElementById('bkk-data');
    if (!el) return null;
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      console.error("인라인 JSON 파싱 실패:", e);
      return null;
    }
  }

  function bootCurationData(data, sourceLabel) {
    curationData = data;
    if (data) {
      initializeTimeMachine();
    }
    translatePage(currentLang);
    console.info("[BKK] curation data source:", sourceLabel);
  }

  fetch('./bkk_content.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      bootCurationData(data, 'fetch(http)');
    })
    .catch(function (err) {
      // file:// 또는 네트워크 실패 → 인라인 fallback 시도
      var inline = loadInlineCurationData();
      if (inline) {
        bootCurationData(inline, 'inline(<script id=bkk-data>) — fetch 실패: ' + err.message);
      } else {
        console.error("fetch·인라인 모두 실패, static dict로 동작:", err);
        translatePage(currentLang);
      }
    });

  let currentLang = localStorage.getItem('bkk_beyond_lang') || 'ko';


  /* ==========================================================================
     3. TRANSLATION ENGINE LOGIC
     ========================================================================== */
  const emailInput = document.getElementById('user-email');

  function translatePage(lang) {
    document.documentElement.setAttribute('lang', lang);
    currentLang = lang;
    localStorage.setItem('bkk_beyond_lang', lang);

    // 1. Scan for data-t elements and translate
    const transElements = document.querySelectorAll('[data-t]');
    transElements.forEach(el => {
      const key = el.getAttribute('data-t');
      
      // Look up dynamic database first if key is related to curation
      if (curationData && key.startsWith('curation.')) {
        const roundData = (currentVersion === 'current') ? curationData.current : curationData.archives.find(a => a.version === currentVersion);
        if (roundData && roundData.translations[lang] && roundData.translations[lang][key]) {
          el.innerHTML = roundData.translations[lang][key];
          return;
        }
      }

      // Fallback to static dictionary
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    // 2. Update email placeholder
    if (emailInput && translations[lang]["newsletter.placeholder"]) {
      emailInput.placeholder = translations[lang]["newsletter.placeholder"];
    }

    // 3. Re-render dynamic elements based on new language state
    renderQuizQuestion();
    renderItineraryCard();
    renderTrends(lang);   // [STEP3 #2]
    renderShops(lang);    // [STEP3 #4]
  }

  /* ===== STEP3 RENDER FUNCTIONS ===== */
  // 외부 URL 안전 가드: https 또는 빈 문자열만 허용 (javascript: 등 차단)
  function safeUrl(u) {
    return (typeof u === 'string' && u.indexOf('https://') === 0) ? u : '';
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;');
  }

  // [#2] 트렌드 분석 렌더
  function renderTrends(lang) {
    if (!curationData || !curationData.current || !curationData.current.trends) return;
    var t = curationData.current.trends;

    var upd = document.getElementById('trends-updated');
    if (upd) upd.textContent = t.updated ? ('· ' + t.updated) : '';

    var rankList = document.getElementById('trends-rank-list');
    if (rankList) {
      rankList.innerHTML = (t.hotspots || []).map(function (h) {
        var wow = h.wow > 0 ? '+' + h.wow : '' + h.wow;
        var wowCls = h.wow > 0 ? 'wow-up' : (h.wow < 0 ? 'wow-down' : 'wow-flat');
        return '<li class="trends-rank-item">' +
          '<span class="trends-rank-no">' + esc(h.rank) + '</span>' +
          '<div class="trends-rank-body">' +
            '<span class="trends-rank-name">' + esc(h.name) + '</span>' +
            '<span class="trends-rank-tag">' + esc(h.tag) + '</span>' +
          '</div>' +
          '<div class="trends-rank-metric">' +
            '<span class="trends-rank-mentions">' + esc(h.mentions.toLocaleString()) + '</span>' +
            '<span class="trends-wow ' + wowCls + '">' + esc(wow) + '%</span>' +
          '</div>' +
        '</li>';
      }).join('');
    }

    var patList = document.getElementById('trends-pattern-list');
    if (patList) {
      patList.innerHTML = (t.patterns || []).map(function (p) {
        var label = (lang === 'en' && p.label_en) ? p.label_en : (p.label_ko || p.label_en || '');
        var pct = (p.unit === '%') ? Math.min(100, p.value) : Math.min(100, p.value * 2);
        return '<div class="trends-pattern">' +
          '<div class="trends-pattern-top">' +
            '<span class="trends-pattern-label">' + esc(label) + '</span>' +
            '<span class="trends-pattern-val">' + esc(p.value) + esc(p.unit) + '</span>' +
          '</div>' +
          '<div class="trends-gauge"><div class="trends-gauge-fill" style="width:' + pct + '%"></div></div>' +
        '</div>';
      }).join('');
    }

    var src = document.getElementById('trends-source');
    if (src && t.source_note) {
      src.textContent = t.source_note[lang] || t.source_note.ko || '';
    }
  }

  // [#4] 샵 커머스 카드 렌더
  function renderShops(lang) {
    if (!curationData || !curationData.current || !curationData.current.shops) return;
    var shops = curationData.current.shops;
    var grid = document.getElementById('shops-grid');
    if (!grid) return;

    var L = {
      ko: { from: '부터', free: '무료/무료입장', map: '지도', visit: '샵 바로가기' },
      en: { from: 'from', free: 'Free entry', map: 'Map', visit: 'Visit shop' },
      th: { from: 'เริ่มต้น', free: 'เข้าฟรี', map: 'แผนที่', visit: 'ไปที่ร้าน' }
    }[lang] || { from: 'from', free: 'Free', map: 'Map', visit: 'Visit' };

    grid.innerHTML = shops.map(function (s) {
      var name = (s.name && (s.name[lang] || s.name.ko)) || '';
      var cat = (s.category && (s.category[lang] || s.category.ko)) || '';
      var price = (s.price_from && s.price_from > 0)
        ? (L.from + ' ' + esc(s.price_from) + ' ' + esc(s.currency))
        : esc(L.free);
      var mapUrl = safeUrl(s.map_url);
      var shopUrl = safeUrl(s.shop_url);
      var coupon = (s.coupon && (s.coupon[lang] || s.coupon.ko)) || '';

      var links = '';
      if (mapUrl) links += '<a class="shop-link shop-link-map" href="' + esc(mapUrl) + '" target="_blank" rel="noopener noreferrer">📍 ' + esc(L.map) + '</a>';
      if (shopUrl) links += '<a class="shop-link shop-link-visit" href="' + esc(shopUrl) + '" target="_blank" rel="noopener noreferrer">↗ ' + esc(L.visit) + '</a>';

      var couponHtml = coupon ? '<div class="shop-coupon">🎟 ' + esc(coupon) + '</div>' : '';

      return '<div class="shop-card">' +
        '<div class="shop-card-head">' +
          '<span class="shop-district">' + esc(s.district) + '</span>' +
          '<span class="shop-price">' + price + '</span>' +
        '</div>' +
        '<h4 class="shop-name">' + esc(name) + '</h4>' +
        '<span class="shop-category">' + esc(cat) + '</span>' +
        couponHtml +
        '<div class="shop-links">' + links + '</div>' +
      '</div>';
    }).join('');
  }

  // Bind click events to Lang Switcher buttons
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      
      // Class updates
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Page fade transition
      document.body.style.opacity = 0;
      setTimeout(() => {
        translatePage(targetLang);
        document.body.style.opacity = 1;
      }, 250);
    });
  });

  // Apply default fade-in to body for language switch
  document.body.style.transition = 'opacity 0.25s ease';


  /* ==========================================================================
     4. BKK TIME MACHINE SWITCHER
     ========================================================================== */
  function initializeTimeMachine() {
    const timeBtns = document.querySelectorAll('.time-btn');
    timeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const ver = btn.getAttribute('data-ver');
        currentVersion = ver;

        timeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Apply scale transition to curation content
        const curationContent = document.querySelector('.curation-content');
        if (curationContent) {
          curationContent.style.transform = 'scale(0.99)';
          curationContent.style.opacity = '0.3';
          
          setTimeout(() => {
            translatePage(currentLang);
            curationContent.style.transform = 'scale(1)';
            curationContent.style.opacity = '1';
          }, 250);
        }
      });
    });
  }


  /* ==========================================================================
     5. HEADER SCROLL & MOBILE NAV
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navList = document.getElementById('nav-list');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change header background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu
  hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    // Simple hamburger animation
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navList.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navList.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navList.classList.contains('active') ? 'rotate(-45deg) translate(6px, -7px)' : 'none';
  });

  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });


  /* ==========================================================================
     6. BKK INDEX QUIZ SYSTEM (DYNAMIC)
     ========================================================================== */
  const quizProgressFill = document.getElementById('quiz-progress');
  const quizResult = document.getElementById('quiz-result');
  const resultScore = document.getElementById('result-score');
  const resultLevelTitle = document.getElementById('result-level-title');
  const resultLevelDesc = document.getElementById('result-level-desc');
  const btnRestartQuiz = document.getElementById('btn-restart-quiz');
  
  const qBox = document.getElementById('quiz-question-box');
  const qNum = document.getElementById('q-num');
  const qText = document.getElementById('q-text');
  const qOptions = document.getElementById('q-options');

  let currentStep = 0;
  let totalScore = 0;

  function updateProgressBar() {
    const totalQuestions = quizQuestions[currentLang].length;
    const progressPercent = ((currentStep) / totalQuestions) * 100;
    quizProgressFill.style.width = `${progressPercent}%`;
  }

  function renderQuizQuestion() {
    if (currentStep >= quizQuestions[currentLang].length) {
      return;
    }
    
    qBox.style.display = 'block';

    const questionData = quizQuestions[currentLang][currentStep];
    qNum.innerText = `Question ${String(currentStep + 1).padStart(2, '0')}`;
    qText.innerText = questionData.question;
    
    qOptions.innerHTML = '';
    questionData.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.innerText = opt.text;
      
      btn.addEventListener('click', () => {
        totalScore += opt.score;
        btn.classList.add('selected');
        
        setTimeout(() => {
          currentStep++;
          updateProgressBar();
          
          if (currentStep < quizQuestions[currentLang].length) {
            renderQuizQuestion();
          } else {
            showQuizResults();
          }
        }, 350);
      });
      
      qOptions.appendChild(btn);
    });
  }

  function showQuizResults() {
    qBox.style.display = 'none';
    quizProgressFill.style.width = '100%';
    
    let levelTitle = '';
    let levelDesc = '';

    if (currentLang === 'ko') {
      if (totalScore >= 110) {
        levelTitle = "👑 방콕 명예 타이인";
        levelDesc = `당신은 이미 웬만한 로컬보다 방콕을 훨씬 더 잘 압니다! 쇼핑몰이나 대중 관광지는 쳐다도 보지 않으시죠? 송왓의 LP 바와 차이나타운의 스피크이지 바 Tax, Talat Noi의 Citizen Tea House가 당신의 진짜 영혼의 안식처가 될 것입니다. 아래 큐레이션된 새로운 Gen Z 성지들을 당장 체크해 보세요! (총점: ${totalScore}/120)`;
      } else if (totalScore >= 75) {
        levelTitle = "✨ 로컬 트렌드세터";
        levelDesc = `축하합니다! 왓아룬 뷰 식당을 넘어 아리 골목길 카페나 힙한 에스프레소 바를 본능적으로 즐길 줄 아는 감각적인 여행자이십니다. 쭐랄롱꼰 인근의 활기찬 반탓통 밤 미식거리와, 고즈넉하지만 힙한 송왓 예술거리를 이번 11번째 여행의 메인 코스로 삼아 정복해 보세요. (총점: ${totalScore}/120)`;
      } else {
        levelTitle = "🌱 감각적인 예비 방콕러";
        levelDesc = `방콕의 전통적인 아름다움과 쇼핑 매력을 풍부하게 경험하셨군요! 이제 진짜 현지인들만 아는 깊고 매혹적인 '로컬 속살'을 탐구할 준비가 되셨습니다. 저희 BKK BEYOND 비밀 가이드를 따라가면, 당신의 다음 방콕은 전례 없이 신선하고 충격적일 것입니다! (총점: ${totalScore}/120)`;
      }
    } else if (currentLang === 'en') {
      if (totalScore >= 110) {
        levelTitle = "👑 BKK Devotee";
        levelDesc = `You know Bangkok much better than average locals! You don't even look at mainstream tourist traps, do you? Vinyl bars in Song Wat, speakeasy Tax in Chinatown, and Citizen Tea House in Talat Noi are your true soulmates. Check out the Gen Z hotspots below! (Score: ${totalScore}/120)`;
      } else if (totalScore >= 75) {
        levelTitle = "✨ Local Trendsetter";
        levelDesc = `Congratulations! You intuitively know how to enjoy cute Ari cafes or hip espresso bars instead of standard tourist sights. Make the bustling Ban That Thong midnight food street and Song Wat creative alleys the highlights of your 11th journey! (Score: ${totalScore}/120)`;
      } else {
        levelTitle = "🌱 BKK Explorer";
        levelDesc = `You have fully experienced Bangkok's traditional beauty and shopping charms! Now, you are ready to plunge into the deep, alluring "local soul". Follow BKK BEYOND's secret guide, and your next trip will be completely fresh! (Score: ${totalScore}/120)`;
      }
    } else if (currentLang === 'th') {
      if (totalScore >= 110) {
        levelTitle = "👑 ผู้เชี่ยวชาญกรุงเทพฯ ขั้นสุด";
        levelDesc = `คุณรู้จักกรุงเทพฯ ดีกว่าคนท้องถิ่นทั่วไปเสียอีก! คุณไม่มองแหล่งท่องเที่ยวทั่วไปเลยใช่ไหม? บาร์แผ่นเสียงในทรงวาด, บาร์ลับ Tax ในเยาวราช และ Citizen Tea House ในตลาดน้อยคือเนื้อคู่ที่แท้จริงของคุณ เช็คจุดฮิปๆ ด้านล่างได้เลย! (คะแนน: ${totalScore}/120)`;
      } else if (totalScore >= 75) {
        levelTitle = "✨ ผู้นำเทรนด์โลคอล";
        levelDesc = `ยินดีด้วย! คุณรู้วิธีดื่มด่ำกับคาเฟ่แถวอารีย์หรือเอสเพรสโซ่บาร์สุดฮิป แทนที่จะเป็นรูฟท็อปวิวเดิมๆ ลองไปบรรทัดทองย่านสตรีทฟู้ดเที่ยงคืน หรือเดินทรงวาดเพื่อเป็นไฮไลท์สำหรับทริปครั้งที่ 11 ของคุณกัน! (คะแนน: ${totalScore}/120)`;
      } else {
        levelTitle = "🌱 นักสำรวจกรุงเทพฯ";
        levelDesc = `คุณได้รับประสบการณ์ความงามแบบดั้งเดิมและการช้อปปิ้งของกรุงเทพฯ อย่างเต็มอิ่มแล้ว! ตอนนี้คุณพร้อมแล้วที่จะดิ่งลึกเข้าสู่ "จิตวิญญาณโลคอล" ติดตามไกด์ลับ BKK BEYOND แล้วทริปหน้าของคุณจะสดใหม่ไม่เหมือนเดิม! (คะแนน: ${totalScore}/120)`;
      }
    }

    resultScore.innerText = totalScore;
    resultLevelTitle.innerText = levelTitle;
    resultLevelDesc.innerText = levelDesc;
    
    quizResult.classList.add('active');
  }

  btnRestartQuiz.addEventListener('click', () => {
    currentStep = 0;
    totalScore = 0;
    updateProgressBar();
    
    quizResult.classList.remove('active');
    renderQuizQuestion();
  });


  /* ==========================================================================
     7. CURATION TABS SYSTEM
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      
      let targetPanel;
      if (tabId === 'talatnoi') {
        targetPanel = document.getElementById('tab-talat');
      } else {
        targetPanel = document.getElementById(`tab-${tabId}`);
      }
      
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });


  /* ==========================================================================
     8. ITINERARY BUILDER GENERATOR (DYNAMIC)
     ========================================================================== */
  const selectBtns = document.querySelectorAll('.select-btn');
  const itineraryBox = document.getElementById('itinerary-results-box');
  let currentItineraryStyle = 'artsy';

  function renderItineraryCard() {
    if (!itineraryBox) return;

    const data = itineraries[currentLang][currentItineraryStyle];
    if (!data) return;

    itineraryBox.innerHTML = `
      <div class="itinerary-card active">
        <div class="itinerary-card-header">
          <h3 class="itinerary-card-title">${data.title}</h3>
          <p class="itinerary-card-desc">${data.desc}</p>
        </div>
        <div class="itinerary-timeline">
          ${data.steps.map(step => `
            <div class="timeline-step">
              <div class="timeline-dot"></div>
              <span class="timeline-time">${step.time}</span>
              <h4 class="timeline-title">${step.title}</h4>
              <p class="timeline-desc">${step.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  selectBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      currentItineraryStyle = btn.getAttribute('data-style');
      
      itineraryBox.style.transform = 'scale(0.98)';
      itineraryBox.style.opacity = '0.5';
      setTimeout(() => {
        renderItineraryCard();
        itineraryBox.style.transform = 'scale(1)';
        itineraryBox.style.opacity = '1';
      }, 150);
    });
  });

  if (itineraryBox) {
    itineraryBox.style.transition = 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)';
  }


  /* ==========================================================================
     9. NEWSLETTER LEAD CAPTURE
     ========================================================================== */
  const newsletterForm = document.getElementById('newsletter-form');
  const formMsg = document.getElementById('form-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('user-email').value;

      if (email) {
        formMsg.innerText = translations[currentLang]["newsletter.success"];
        formMsg.className = "form-message success";
        document.getElementById('user-email').value = "";
      } else {
        formMsg.innerText = translations[currentLang]["newsletter.error"];
        formMsg.className = "form-message error";
      }
    });
  }


  /* ==========================================================================
     10. SCROLL REVEAL (INTERSECTION OBSERVER)
     ========================================================================== */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  reveals.forEach(el => {
    revealObserver.observe(el);
  });


  /* ==========================================================================
     11. INITIALIZATION RUN
     ========================================================================== */
  const defaultLangBtn = document.querySelector(`.lang-btn[data-lang="${currentLang}"]`);
  if (defaultLangBtn) {
    langBtns.forEach(b => b.classList.remove('active'));
    defaultLangBtn.classList.add('active');
  }

});
