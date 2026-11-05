# 변경 내용 — 주역 원문(64괘·384효) 해설과 고변점 자동 해석

## 새로 추가된 파일
| 파일 | 역할 |
|---|---|
| `yijing-data.js` | 64괘 괘사 + 384효 효사 + 용구·용육 데이터 (자동 생성, 결과가 처음 필요할 때 한 번만 늦게 로드) |
| `divination.js` | 본괘·동효·지괘 계산과 『역학계몽』「고변점」 7규칙 (화면·언어와 무관한 순수 로직, 규칙의 근거는 파일 머리 주석) |
| `classic-view.js` | 결과 카드의 "주역 원문으로 읽기" 영역 렌더링 |
| `data-src/` | 데이터 원본(`gua_01~64.json`, `table.json`), 빌드 스크립트 `build-yijing-data.js`, 전수 검증 `test-divination.js` |

## 기존 파일의 최소 수정
- `core.js`: setResultCardText() 끝에 renderClassicBlock(info) 호출 1줄 + 주석의 로드 순서
- `index.html`, `original.html`: 결과 카드에 `#classicBlock` 1개, 스크립트 2개 추가
- `i18n.js`: `classic.*` 문구(ko/en) 추가
- `style.css`: 파일 끝에 `.classic-*` 스타일 추가 (기존 변수만 사용)
- `sw.js`: 새 파일 캐시 목록 추가, 캐시 버전 `20261105-2`
- `hexagram-list.html` / `hexagram-list.js`: 각 괘 카드 끝에 "괘사·효사 원문 보기" 펼침 추가(스크립트 2개, 카드 마지막에 `<details>` 1개). 처음 펼칠 때만 `yijing-data.js`를 불러오며, 기존 검색·카드 내용은 그대로입니다. `classic-view.js`의 `renderGuaReference()`가 그립니다.
- 점괘 생성·보관함(store.js)·기존 해설은 변경 없음. 보관함 기록(values)에서 그대로 해석을 다시 계산합니다.

## 데이터 수정 방법
`data-src/gua_NN.json` 을 고친 뒤 앱 루트에서 `node data-src/build-yijing-data.js`, 이어서 `node data-src/test-divination.js`.

## 알려진 사항
- 목록 페이지(`hexagram-list.js`)는 30번을 "이위화", 33번을 "천산돈"으로, 결과 화면(`hexagrams.js`)은 "리위화", "천산둔"으로 표기합니다. 새 데이터는 결과 화면 표기를 따랐고 목록 페이지는 수정하지 않았습니다.
- 괘사·효사 원문은 『周易本義』 통행본을 기준으로 작성했으며, 판본에 따라 글자가 다른 곳(예: 革卦 已/己, 豐卦 沛·沫/旆·昧, 噬嗑 胏)은 출판 전 판본 대조를 권합니다.
