'use strict';
/* divination.js — 본괘·변효·지괘 계산과 『역학계몽』「고변점」 해석 규칙 (해석 "로직" 전용)
   - DOM·언어·화면 문구를 전혀 쓰지 않습니다. 해설 "데이터"는 yijing-data.js(YIJING_DATA)에만 있고,
     화면 표시는 classic-view.js 가 맡습니다. (Node 에서도 불러와 테스트할 수 있습니다.)
   - 로드 순서: (yijing-data.js 는 필요할 때 classic-view.js 가 늦게 불러옴) → divination.js → classic-view.js

   ───────────────────────── 효 값과 괘 계산 ─────────────────────────
   효는 반드시 아래(초효, 1효)에서 위(상효, 6효) 순서로 만들며 values[0] 이 초효입니다.
     6 = 노음(老陰, 변하는 음)   7 = 소양(少陽, 변하지 않는 양)
     8 = 소음(少陰, 변하지 않는 음)  9 = 노양(老陽, 변하는 양)
   6과 9만 음양을 뒤집어 지괘(之卦)를 만들고, 7과 8은 그대로 둡니다.
   변효(變爻) = 6 또는 9 인 자리. 개수와 위치(1~6)를 자동으로 셉니다.

   ───────────────────────── 해석 규칙의 근거 ─────────────────────────
   주희(朱熹) 『역학계몽(易學啓蒙)』 「고변점(考變占)」의 일곱 가지 변효 점법을 기본 기준으로 삼습니다.
     원문(『易學啓蒙』考變占, 황종희 『易學象數論』·『朱子語類』 권66 등에 인용된 문구):
       六爻皆不變，則占本卦彖辭，而以內卦為貞，外卦為悔。
       一爻變，則以本卦變爻辭占。
       二爻變，則以本卦二變爻辭占，仍以上爻為主。
       三爻變，則占本卦及之卦之彖辭，而以本卦為貞，之卦為悔。前十卦主貞，後十卦主悔。
       四爻變，則以之卦二不變爻辭占，仍以下爻為主。
       五爻變，則以之卦不變爻辭占。
       六爻變，則乾坤占二用，餘卦占之卦彖辭。
   앱에서의 적용 범위(이 파일이 하는 일):
     · 변효 0개 → 본괘 괘사.
     · 변효 1개 → 본괘의 그 변효 효사.
     · 변효 2개 → 본괘의 두 변효 효사 모두 참고, 위쪽(번호가 큰) 효사가 중심.
     · 변효 3개 → 본괘와 지괘의 괘사 모두 참고. 본괘=貞, 지괘=悔.
                 20가지 조합 중 "앞 열 괘(前十卦)"는 貞(본괘) 중심, "뒤 열 괘(後十卦)"는 悔(지괘) 중심.
                 앞/뒤 열 구분은 『역학계몽』 삼효변 도표의 순서를 따라 "초효가 변효에 포함되면 前十, 아니면 後十"로 구현.
                 (초효를 포함하는 조합은 C(5,2)=10가지, 포함하지 않는 조합도 10가지이며, 後十는 前十의 여집합[변하는 효와
                  변하지 않는 효를 맞바꾼 조합]이라 『朱子語類』의 "後十卦是變盡了，又反來" 설명과도 맞습니다.)
     · 변효 4개 → 지괘에서 변하지 않은 두 효의 효사 참고, 아래쪽 효사가 중심.
     · 변효 5개 → 지괘에서 변하지 않은 한 효의 효사가 중심.
     · 변효 6개 → 지괘의 괘사가 중심. 단, 본괘가 건위천이면 용구(用九), 곤위지면 용육(用六)을 적용
                 (원문 "乾坤占二用"). 이때 지괘 괘사는 참고로만 곁들임.
   한계: 이는 주희 계열의 한 가지 전통입니다. 『춘추좌전』식 점례나 경방(京房)·소옹(邵雍) 계열, 현대 실전가마다 읽는 법이
   조금씩 다르므로, 앱은 규칙과 근거를 화면에 밝혀 두고 결과를 "참고 자료"로만 제시합니다.
*/
(function (root) {

  // ===== 효 값 → 음양·변효 =====
  const LINE_BY_VALUE = {
    6: { yang: false, changing: true },    // 노음 → 양으로 변함
    7: { yang: true,  changing: false },   // 소양
    8: { yang: false, changing: false },   // 소음
    9: { yang: true,  changing: true }     // 노양 → 음으로 변함
  };

  /** 아래→위 효 값 6개 → 본괘·지괘 이진 문자열(초효가 첫 글자, 1=양)과 변효 목록 */
  function computeHexagram(values) {
    if (!Array.isArray(values) || values.length !== 6) throw new Error('효 값은 6개여야 합니다.');
    const lines = values.map((v, i) => {
      const def = LINE_BY_VALUE[v];
      if (!def) throw new Error('효 값은 6·7·8·9 중 하나여야 합니다: ' + v);
      return { pos: i + 1, value: v, yang: def.yang, changing: def.changing };
    });
    const benBits = lines.map(l => (l.yang ? 1 : 0));
    // 6과 9 에 해당하는 효만 음양을 반전, 7·8 은 그대로
    const zhiBits = lines.map(l => (l.changing ? (l.yang ? 0 : 1) : (l.yang ? 1 : 0)));
    return {
      lines,
      binary: benBits.join(''),
      changedBinary: zhiBits.join(''),
      changing: lines.filter(l => l.changing).map(l => l.pos)    // 1~6, 오름차순
    };
  }

  /* ───────────────────────── 효의 자리 분석 (효위: 정·중·응·비) ─────────────────────────
     효사를 읽을 때 전통적으로 곁들여 보는 보조 도구로, 『주역』 단전·상전과 정이천 『주역전』·주희 『주역본의』의
     해설에서 두루 쓰이는 기본 개념만 계산합니다. 효사의 길흉을 정하는 규칙이 아니며, 학파마다 비중이 다릅니다.
       · 정(正): 홀수 자리(1·3·5)는 양의 자리, 짝수 자리(2·4·6)는 음의 자리. 자리와 같은 음양의 효가 있으면 정, 아니면 부정(不正).
       · 중(中): 내괘(1·2·3)의 가운데 2효, 외괘(4·5·6)의 가운데 5효. 중과 정을 함께 갖추면 중정(中正, 2효 음·5효 양).
       · 응(應): 1-4, 2-5, 3-6 효끼리 짝. 음양이 서로 다르면 응, 같으면 무응(無應, 敵應).
       · 비(比): 바로 이웃한 효(아래·위)와의 관계. 음양이 다르면 서로 어울리는 비로 봄.
     binary: 괘의 이진 문자열(초효가 첫 글자, 1=양). pos: 1~6. */
  function analyzeLine(binary, pos) {
    const yangAt = p => binary.charAt(p - 1) === '1';
    const yang = yangAt(pos);
    const proper = (pos % 2 === 1) === yang;
    const central = pos === 2 || pos === 5;
    const partner = pos <= 3 ? pos + 3 : pos - 3;
    const neighbors = [];
    if (pos > 1) neighbors.push({ side: 'below', pos: pos - 1, yang: yangAt(pos - 1), bi: yangAt(pos - 1) !== yang });
    if (pos < 6) neighbors.push({ side: 'above', pos: pos + 1, yang: yangAt(pos + 1), bi: yangAt(pos + 1) !== yang });
    return {
      pos, yang, slotYang: pos % 2 === 1, proper,
      central, centerOf: central ? (pos === 2 ? 'inner' : 'outer') : null,
      zhongzheng: central && proper,
      ying: { pos: partner, yang: yangAt(partner), matched: yangAt(partner) !== yang },
      neighbors
    };
  }

  /** 삼효변(변효 3개) 구분: 초효 포함 → 'front'(前十卦, 貞·본괘 중심), 아니면 'back'(後十卦, 悔·지괘 중심) */
  function threeChangeGroup(changing) {
    return changing.indexOf(1) !== -1 ? 'front' : 'back';
  }

  /** 데이터(YIJING_DATA)를 받아 해석기를 만든다. 데이터가 바뀌어도 로직은 그대로. */
  function createInterpreter(data) {
    const byBinary = {};
    Object.keys(data.guas).forEach(n => { byBinary[data.guas[n].binary] = data.guas[n]; });

    const guaPassage = (role, side, gua, tag) => ({ type: 'gua', role, side, guaN: gua.n, pos: null, tag: tag || null, label: gua.name, gua, data: gua.gua });
    const yaoPassage = (role, side, gua, pos) => ({ type: 'yao', role, side, guaN: gua.n, pos, tag: null, label: gua.yao[pos - 1].label, gua, data: gua.yao[pos - 1] });
    const yongPassage = (role, gua) => ({ type: 'yong', role, side: 'ben', guaN: gua.n, pos: 7, tag: null, label: gua.yong.label, gua, data: gua.yong });

    /** values(아래→위 6개의 6~9) → 해석 결과 */
    function interpret(values) {
      const h = computeHexagram(values);
      const ben = byBinary[h.binary], zhi = byBinary[h.changedBinary];
      if (!ben || !zhi) throw new Error('괘 데이터를 찾지 못했습니다: ' + h.binary + ' / ' + h.changedBinary);
      const ch = h.changing, n = ch.length;
      const unchanged = h.lines.filter(l => !l.changing).map(l => l.pos);
      let ruleId, passages = [], group = null;

      if (n === 0) {
        ruleId = 'none';
        passages = [guaPassage('primary', 'ben', ben)];
      } else if (n === 1) {
        ruleId = 'one';
        passages = [yaoPassage('primary', 'ben', ben, ch[0])];
      } else if (n === 2) {
        ruleId = 'two';
        passages = [yaoPassage('primary', 'ben', ben, ch[1]),      // 위쪽 변효가 중심
                    yaoPassage('reference', 'ben', ben, ch[0])];
      } else if (n === 3) {
        group = threeChangeGroup(ch);
        ruleId = group === 'front' ? 'three-front' : 'three-back';
        passages = group === 'front'
          ? [guaPassage('primary', 'ben', ben, '貞'), guaPassage('reference', 'zhi', zhi, '悔')]
          : [guaPassage('primary', 'zhi', zhi, '悔'), guaPassage('reference', 'ben', ben, '貞')];
      } else if (n === 4) {
        ruleId = 'four';
        passages = [yaoPassage('primary', 'zhi', zhi, unchanged[0]),   // 변하지 않은 두 효 중 아래쪽이 중심
                    yaoPassage('reference', 'zhi', zhi, unchanged[1])];
      } else if (n === 5) {
        ruleId = 'five';
        passages = [yaoPassage('primary', 'zhi', zhi, unchanged[0])];
      } else {   // n === 6
        if (ben.n === 1 && ben.yong) {            // 건위천 여섯 효 모두 변함 → 用九
          ruleId = 'six-qian';
          passages = [yongPassage('primary', ben), guaPassage('reference', 'zhi', zhi)];
        } else if (ben.n === 2 && ben.yong) {     // 곤위지 여섯 효 모두 변함 → 用六
          ruleId = 'six-kun';
          passages = [yongPassage('primary', ben), guaPassage('reference', 'zhi', zhi)];
        } else {
          ruleId = 'six';
          passages = [guaPassage('primary', 'zhi', zhi), guaPassage('reference', 'ben', ben)];
        }
      }
      return {
        values: values.slice(), lines: h.lines, binary: h.binary, changedBinary: h.changedBinary,
        ben, zhi, changing: ch, count: n, unchanged, ruleId, group, passages
      };
    }

    return { interpret, byBinary };
  }

  const api = { computeHexagram, threeChangeGroup, analyzeLine, createInterpreter, LINE_BY_VALUE };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.YijingDivination = api;
})(typeof window !== 'undefined' ? window : globalThis);
