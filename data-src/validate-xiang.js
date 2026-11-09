// node validate-xiang.js xdata/xiang_NN.json ...  : 대상·소상 파일 검증
const fs=require('fs'); const table=require('./table.json');
let bad=0; const err=(f,m)=>{bad++;console.log('✗',f,m)};
const han=s=>[...s].filter(c=>/[㐀-鿿]/.test(c)).length;
const syl=s=>[...s].filter(c=>/[가-힣]/.test(c)).length;
function item(f,tag,o){
  if(!o||typeof o.text!=='string'||typeof o.reading!=='string'||typeof o.modern!=='string') return err(f,tag+' 필드');
  if(/[\n]/.test(o.text+o.reading+o.modern)) err(f,tag+' 줄바꿈');
  if(!han(o.text)) err(f,tag+' 한자 없음');
  if(/[가-힣a-zA-Z]/.test(o.text)) err(f,tag+' 원문에 한글/영문');
  if(han(o.text)!==syl(o.reading)) err(f,`${tag} 한자 ${han(o.text)}자 ≠ 독음 ${syl(o.reading)}자`);
  if(syl(o.modern)<8) err(f,tag+' 번역 짧음');
}
for(const f of process.argv.slice(2)){
  let d; try{d=JSON.parse(fs.readFileSync(f,'utf8'))}catch(e){err(f,'JSON');continue}
  const row=table.find(r=>r.n===d.n); if(!row){err(f,'n');continue}
  item(f,'대상',d.daxiang);
  if(!Array.isArray(d.xiang)||d.xiang.length!==6) err(f,'소상 6개 아님'); else d.xiang.forEach((x,i)=>item(f,'소상'+(i+1),x));
  if(row.n<=2) item(f,'용 소상',d.yongXiang); else if(d.yongXiang!==null) err(f,'yongXiang 는 null');
}
console.log(bad?bad+'건 오류':'OK '+(process.argv.length-2));
process.exit(bad?1:0);
