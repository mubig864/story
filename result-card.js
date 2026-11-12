'use strict';
/* result-card.js — 결과 카드(#resultCard) 마크업의 단일 출처
   index.html 과 original.html 의 결과 카드는 완전히 같은 구조라서, 한 곳에만 두고 두 페이지가 공유합니다.
   각 페이지에는 <div id="resultCardMount"></div> 자리만 두며, core.js 가 요소를 찾기 전에(= core.js 보다 먼저) 로드해야 합니다.
   카드 안의 문구는 data-i18n 속성을 가지고 있어 i18n.js 의 applyI18n 이 언어별로 채웁니다. */
(function () {
  const RESULT_CARD_HTML = `
<section class="card hidden" id="resultCard" style="margin-top:14px;">
      <div class="result-title">
        <p class="saved-banner hidden" id="savedBanner"></p>
        <p class="repeat-note hidden" id="repeatNote" data-i18n="result.repeatNote"></p>
        <span class="badge" id="resultBadge"></span>
        <h2 id="hexagramName"></h2>
        <p class="trigram-note" id="trigramNote"></p>
        <p class="keyword" id="hexagramKeyword"></p>
        <p class="sub" id="resultIntro"></p>
      </div>

      <p class="term-note" data-i18n-html="result.termNote">
        <b>본괘</b>는 지금의 모습, <b>지괘</b>는 변화 후의 모습입니다.
        <b>변효</b>(바뀌는 효)는 붉게 표시된 자리이며, 아래에서부터 1효·2효…로 셉니다.
      </p>
      <div class="hex-compare" id="hexCompare"></div>
      <p class="classic-shift-note hidden" id="classicShiftNote"></p>

      <p class="lang-note hidden" id="langNote" data-i18n="result.langNote"></p>
      <div class="result-stack">
        <div class="section-block">
          <h3 data-i18n="result.core">핵심 해석</h3>
          <p id="coreReading"></p>
        </div>
        <div class="section-block shift-summary hidden" id="shiftSummary"></div>
        <div class="section-block">
          <h3 data-i18n="result.example">이런 경우라면</h3>
          <p id="exampleQuestion" class="question-echo"></p>
          <p id="exampleText"></p>
        </div>
        <div class="section-block">
          <h3 data-i18n="result.situation">지금 상황에서의 의미</h3>
          <p id="situationMeaning"></p>
        </div>
        <div class="section-block">
          <h3 data-i18n="result.change">변화의 방향</h3>
          <div id="changeText" class="change-text"></div>
        </div>
        <div class="section-block">
          <h3 data-i18n="result.todo">지금 해볼 일</h3>
          <ul id="actionList"></ul>
          <details class="more">
            <summary data-i18n="result.moreTips">생활 속 적용 팁 더 보기</summary>
            <ul id="practicalList"></ul>
          </details>
        </div>
        <div class="section-block classic-block" id="classicBlock">
          <h3 data-i18n="classic.heading">주역 원문으로 읽기</h3>
          <div id="classicBody"></div>
        </div>
      </div>
      <div class="result-actions">
        <button type="button" class="secondary" id="saveBtn" data-i18n="result.save">보관함에 저장</button>
      </div>
      <p class="disclaimer" data-i18n="result.disclaimer">이 풀이는 미래를 맞히는 예언이 아니라, 지금의 상황과 마음가짐을 정리해 보는 참고 자료입니다. 중요한 결정은 사실과 조언을 함께 확인하세요.</p>
    </section>
`;
  const mount = document.getElementById('resultCardMount');
  if (mount) mount.outerHTML = RESULT_CARD_HTML.trim();
  else console.warn('resultCardMount 자리를 찾지 못했습니다.');
})();
