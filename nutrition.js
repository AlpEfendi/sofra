// Rounded meal estimates for the portions in this plan. [kcal, protein g, carbs g, fat g]
// Unspecified recipes and cooking oil can change these values substantially.
const nutritionRows = {
 a: {
  breakfast: [],
  lunch: [[690,44,66,26],[620,42,57,23],[620,48,65,18],[650,48,68,20],[690,38,72,27],[600,43,52,22],[620,42,72,19],[680,38,76,24],[650,40,66,22],[640,43,68,22],[650,39,67,24],[610,42,57,22],[620,38,69,20],[680,38,76,24]],
  dinner: [[710,65,65,21],[701,61,58,25],[597,52,59,17],[606,55,56,18],[673,54,58,25],[571,38,44,27],[655,47,74,19],[710,65,65,21],[584,57,35,24],[597,52,59,17],[584,42,59,20],[673,54,58,25],[505,35,35,25],[606,55,56,18]]
 },
 b: {
  breakfast: [[350,20,30,16],[370,21,34,17],[330,20,27,15],[360,22,31,17],[340,20,29,16],[340,20,29,16],[360,20,34,16],[340,20,29,16],[340,20,29,16],[340,20,29,16],[340,20,29,16],[340,20,29,16],[340,20,29,16],[340,20,29,16]],
  lunch: [[420,36,35,12],[430,30,44,13],[430,36,38,12],[450,34,45,14],[480,34,54,15],[410,34,34,12],[430,32,43,13],[430,34,40,13],[440,32,42,14],[450,34,46,14],[430,32,41,14],[420,34,36,13],[420,32,39,13],[430,34,40,13]],
  dinner: [[520,48,48,16],[535,47,45,20],[450,39,40,14],[465,40,42,14],[505,39,44,19],[465,30,37,22],[520,35,57,16],[520,48,48,16],[470,43,32,19],[450,39,40,14],[470,32,47,17],[505,39,44,19],[430,27,31,21],[465,40,42,14]]
 }
};
function nutritionFor(day,person,id,date){
 if(date==='2026-09-22'&&id==='dinner'||date==='2026-09-23'&&id==='lunch')
  return person==='a'?[470,20,34,29]:[470,20,34,29];
 const row=nutritionRows[person]?.[id]?.[day];
 return row||null;
}
function nutritionLabel(row){
 if(!row)return '<p class="nutrition muted">Porsiyon bilgisi eksik · besin hesabı yapılamadı</p>';
 const [kcal,protein,carbs,fat]=row;
 return `<div class="nutrition" aria-label="Yaklaşık besin değerleri"><b>≈${kcal} kcal</b><span>Protein ${protein} g</span><span>Karbonhidrat ${carbs} g</span><span>Yağ ${fat} g</span></div>`;
}

