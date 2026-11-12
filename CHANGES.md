# 변경 내용 — 주역 원문(64괘·384효) 해설과 고변점 자동 해석

## 새로 추가된 파일
| 파일 | 역할 |
|---|---|
| `yijing-data.js` | 64괘 괘사 + 384효 효사 + 용구·용육 데이터 (자동 생성, 결과가 처음 필요할 때 한 번만 늦게 로드) |
| `divination.js` | 본괘·변효·지괘 계산과 『역학계몽』「고변점」 7규칙 (화면·언어와 무관한 순수 로직, 규칙의 근거는 파일 머리 주석) |
| `classic-view.js` | 결과 카드의 "주역 원문으로 읽기" 영역 렌더링 |
| `hexmeta.js` | 64괘 메타 표(번호·이름·한자·상/하괘·이진키)의 **단일 출처** (자동 생성: `data-src/table.json` → 빌드 스크립트) |
| `result-card.js` | 결과 카드(`#resultCard`) 마크업의 **단일 출처**. index.html·original.html 은 `<div id="resultCardMount">` 자리만 두고 이 파일이 채움 |
| `data-src/` | 데이터 원본(`gua_01~64.json`, `table.json`), 빌드 스크립트 `build-yijing-data.js`, 전수 검증 `test-divination.js`, 메타 일관성 `test-meta.js` |

## 기존 파일의 최소 수정
- `core.js`: setResultCardText() 끝에 renderClassicBlock(info) 호출 1줄 + 주석의 로드 순서
- `index.html`, `original.html`: 결과 카드에 `#classicBlock` 1개, 스크립트 2개 추가
- `i18n.js`: `classic.*` 문구(ko/en) 추가
- `style.css`: 파일 끝에 `.classic-*` 스타일 추가 (기존 변수만 사용)
- `sw.js`: 새 파일 캐시 목록 추가, 캐시 버전 `20261111-1`
- `hexagram-list.html` / `hexagram-list.js`: 각 괘 카드 끝에 "괘사·효사 원문 보기" 펼침 추가(스크립트 2개, 카드 마지막에 `<details>` 1개). 처음 펼칠 때만 `yijing-data.js`를 불러오며, 기존 검색·카드 내용은 그대로입니다. `classic-view.js`의 `renderGuaReference()`가 그립니다.
- 변효 4개 이상: 결과 카드 상단에 "지괘(건·곤 전체 변효는 용구·용육) 중심으로 읽는다"는 안내(`#classicShiftNote`, classic-view.js).
- 한 질문 한 번: 질문 입력칸 아래 안내(`q.onceNote`), 같은 질문으로 다시 점치면 결과 상단에 안내(`#repeatNote`, core.js `showResult`, 막지는 않음·보관함에서 불러온 결과에는 표시 안 함).
- 서시법 수동 가르기: 드래그하는 동안 좌우 개수를 숨기고 "왼쪽 무리/오른쪽 무리"만 표시(original.js `updateSplitPreview`), 안내문에 "개수를 세지 말고" 추가.
- 점괘 생성·보관함(store.js)·기존 해설은 변경 없음. 보관함 기록(values)에서 그대로 해석을 다시 계산합니다.

## 구조 정리 (중복 제거)
- 메타 표 통합: `hexagrams.js` 의 `name:` 64줄, `hexagram-list.js` 의 n/name/han/upper/lower/bits 중복을 없애고 `hexmeta.js`(HEX_META)에서 합칩니다. 괘 이름·한자를 고칠 곳은 `data-src/table.json` 한 군데이며 `node data-src/build-yijing-data.js` 가 `yijing-data.js` 와 `hexmeta.js` 를 함께 만듭니다. 로드 순서: hexmeta.js → hexagrams.js.
- 결과 카드 템플릿 통합: 두 페이지에 똑같이 복사돼 있던 53줄 마크업을 `result-card.js` 로 합쳤습니다(렌더 결과의 DOM·id 는 이전과 동일). core.js 보다 먼저 로드해야 합니다.
- 영어 데이터 지연 로딩: `hexagrams_en.js` 는 더 이상 HTML 에 직접 넣지 않고, 영어로 전환(또는 영어 설정으로 시작)할 때 `i18n.js` 의 `loadEnglishData()` 가 늦게 불러온 뒤 화면을 한 번 더 그립니다. 한국어 사용자는 내려받지 않으며, 오프라인 사용을 위해 sw.js 미리 저장 목록에는 남겨 두었습니다.

## 상전(대상·소상)과 효의 자리 분석, 점치는 태도 안내
- 대상(大象) 64개·소상(小象) 384개 + 용구·용육 소상 2개를 추가했습니다(`data-src/xiang_NN.json` → `yijing-data.js` 의 `gua.daxiang`, `yao[].xiang`, `yong.xiang`). 괘사 카드에 대상, 효사·용구·용육 카드에 소상이 원문·독음·풀이로 붙습니다(결과 화면과 64괘 목록 모두). 영어 화면에서는 원문만 보입니다. 단전(彖傳)·문언전·계사전 등 나머지 십익은 넣지 않았습니다.
- 효의 자리 살펴보기: 효사 카드 끝의 접이식 상자에 정(正)·중(中)·응(應)·비(比)를 계산해 보여 줍니다(`divination.js` 의 `analyzeLine`, 표시는 `classic-view.js` 의 `yjPositionBox`). 길흉을 정하지 않는 보조 도구라는 문구를 함께 표시합니다.
- 점치는 태도 안내: 질문 입력칸 아래에 "이미 정한 일의 허락을 구하거나 바르지 못한 일을 점치지 않는다"는 전통(『춘추좌전』 소공 12년 "易不可以占險")을 한 줄 더 안내합니다(`q.rightNote`).
- 데이터 검사: `node data-src/validate-xiang.js data-src/xiang_*.json` (한자 수와 독음 음절 수 일치 등).

## 원문 대조 (부분)
위키문헌 『周易』와 33개 괘를 대조해 상전 2건(22 賁 六五 小象, 47 困 初六 小象)을 고쳤습니다. 31개 괘는 페이지를 읽지 못해 미대조입니다. 방법·한계·판정은 `data-src/VERIFICATION.md` 참고. 캐시 버전 `20261111-1`.

## 공유하기: QR 코드 + 주소 복사
- 메뉴의 "공유하기"를 누르면 이제 바로 복사하지 않고 공유 창이 열립니다. QR 코드(스마트폰 카메라로 앱 열기), 그 아래 주소 칸과 "링크 복사" 버튼이 있으며, 복사 결과는 창 안에 문구로 알려 줍니다(복사 권한이 막힌 환경에서는 주소를 선택해 두고 직접 복사하도록 안내).
- QR 은 오프라인에서도 되도록 외부 라이브러리 없이 `qr.js`(약 150줄, 바이트 모드·오류정정 M·버전 1~6)가 직접 만들어 SVG 로 그립니다. 테마와 상관없이 흰 바탕·검은 모듈입니다. 검사: `python3 data-src/test-qr.py`(OpenCV 로 다시 읽어 원문과 비교).
- 공유 주소는 `menu.js` 의 `SHARE_URL`(현재 https://mubig864.github.io/story/) 한 곳입니다. 앱 주소가 바뀌면 이 값을 고치세요. 캐시 버전 `20261111-2`.

## 변효 안내 보강 (결과 화면)
- 용어 통일: 한국어 화면의 "바뀌는 효"를 모두 "변효"로 바꾸고, 첫 설명(`result.termNote`)에 "변효(바뀌는 효)는 뽑기에서 노음(6)·노양(9)이 나와 곧 반대로 바뀌는 효이며, 개수와 자리가 읽을 대목을 정하는 기준"이라는 풀이를 넣었습니다(영어는 changing line 설명 보강).
- "이번 변효 한눈에" 카드(`#shiftSummary`, `classic-view.js` 의 `renderShiftSummary`): 핵심 해석 바로 아래에 변효 개수·적용 규칙, 이번에 읽을 중심 대목의 원문·쉬운 풀이·한 줄 메시지를 보여 주고, "원문과 자세한 해설 보기"로 아래 원문 구역으로 이동합니다. 변효가 없으면 숨깁니다. 캐시 버전 `20261112-1`.

## 데이터 수정 방법
`data-src/gua_NN.json` 을 고친 뒤 앱 루트에서 `node data-src/build-yijing-data.js`, 이어서 `node data-src/test-divination.js` 와 `node data-src/test-meta.js`.

## 알려진 사항
- 목록 페이지(`hexagram-list.js`)는 30번을 "이위화", 33번을 "천산돈"으로, 결과 화면(`hexagrams.js`)은 "리위화", "천산둔"으로 표기합니다. 새 데이터는 결과 화면 표기를 따랐고 목록 페이지는 수정하지 않았습니다.
- 상전(대상·소상) 원문도 같은 방식으로(기억 기반) 작성했으며 아직 판본과 대조하지 않았습니다. 판본 차이가 있을 수 있는 글자(예: 彊/強, 无/無, 恆/恒, 闚/窺, 帥·畜의 독음)는 각 `xiang_NN.json` 의 `notes` 에 적어 두었습니다.
- 괘사·효사 원문은 『周易本義』 통행본을 기준으로 작성했으며, 판본에 따라 글자가 다른 곳(예: 革卦 已/己, 豐卦 沛·沫/旆·昧, 噬嗑 胏)은 출판 전 판본 대조를 권합니다.
