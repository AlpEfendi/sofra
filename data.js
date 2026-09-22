// Only meal templates belong here. Personal health information stays out of the repository.
const item=(name,a,b,unit='g')=>({name,a,b,unit});
const dinners=[
 ['Izgara tavuk','chicken',[item('Tavuk',200,140),item('Bulgur',180,120),item('Limonlu salata','Bol','Bol','')]],
 ['Dana et sote','meat',[item('Dana eti',200,150),item('Bulgur',150,100),item('Biberli salata','Bol','Bol','')]],
 ['Fırında balık','fish',[item('Balık eti',220,150),item('Patates',200,130),item('Salata','Bol','Bol','')]],
 ['Yeşil mercimek & tavuk','beans',[item('Mercimek yemeği',220,180),item('Tavuk / hindi',150,100),item('Limonlu salata','Bol','Bol','')]],
 ['Ev köftesi','meat',[item('Köfte',200,140),item('Bulgur',150,100),item('Çoban salata','Bol','Bol','')]],
 ['Kıymalı kabak dolması','vegetable',[item('Orta boy dolma','3–4','2–3','adet'),item('Yoğurt',200,150),item('Salata','Bol','Bol','')]],
 ['Etli nohut','beans',[item('Etli nohut yemeği',250,200),item('Bulgur',120,80),item('Salata','Bol','Bol','')]],
 ['Fırın tavuk','chicken',[item('Tavuk',200,140),item('Bulgur',180,120),item('Salata','Bol','Bol','')]],
 ['Dana et sote & sebze','meat',[item('Dana eti',200,150),item('Sebze','Belirtilmemiş','Belirtilmemiş','')]],
 ['Fırında balık & patates','fish',[item('Balık eti',220,150),item('Patates',200,130)]],
 ['Kuru fasulye & et','beans',[item('Kuru fasulye','Belirtilmemiş','Belirtilmemiş',''),item('Et','Belirtilmemiş','Belirtilmemiş',''),item('Salata','Bol','Bol','')]],
 ['Izgara köfte','meat',[item('Köfte',200,140),item('Bulgur',150,100)]],
 ['Kıymalı sebze yemeği','vegetable',[item('Kıymalı sebze yemeği','Belirtilmemiş','Belirtilmemiş','')]],
 ['Mercimek & tavuk','beans',[item('Mercimek yemeği',220,180),item('Tavuk',150,100),item('Salata','Bol','Bol','')]]
];
const lunchesA=[
 ['Menemen & peynir','eggs',['3 yumurta','60 g az tuzlu peynir','2 dilim tam buğday ekmeği','Domates ve salatalık']],
 ['Yumurta & lor','eggs',['3 yumurta','70 g lor veya az tuzlu peynir','2 dilim ekmek','Bol sebze']],
 ['Balıklı salata','fish',['150 g ton balığı veya pişmiş balık','2 dilim ekmek','1 kâse yoğurt','Bol yeşillik']],
 ['Tavuklu dürüm','chicken',['Tam buğday lavaşta tavuk','Ayran ve salata','Miktarlar önceki planda belirtilmemiş']],
 ['Yumurtalı kahvaltı','eggs',['3 yumurta','Peynir (miktar belirtilmemiş)','2 dilim ekmek','1 meyve']],
 ['Tavuklu / etli salata','chicken',['Tavuk veya et','Tam buğday ekmeği ve yoğurt','Miktarlar önceki planda belirtilmemiş']],
 ['Tavuklu sandviç','chicken',['Tavuklu sandviç','Yoğurt ve salata','Miktarlar önceki planda belirtilmemiş']]
];
const lunchesB=[
 ['Tavuklu salata','chicken',['100–120 g ızgara tavuk','Bol yeşillik','1 dilim ekmek']],
 ['Mercimek çorbası & et','beans',['1 kâse mercimek çorbası','100 g tavuk veya et','Limonlu salata']],
 ['Tavuklu salata','chicken',['120 g tavuk','1 dilim ekmek','Salata']],
 ['Küçük tavuklu dürüm','chicken',['100–120 g tavuk','Küçük lavaş (miktar belirtilmemiş)','Salata']],
 ['Tavuk & bulgur','chicken',['120 g tavuk','Küçük porsiyon bulgur (gram belirtilmemiş)','Salata']],
 ['Tavuklu salata','chicken',['100–120 g tavuk','1 dilim ekmek','Salata']],
 ['Küçük tavuklu sandviç','chicken',['Tavuklu küçük sandviç','Salata','Miktarlar önceki planda belirtilmemiş']]
];
const secondA=[['Yumurtalı kahvaltı & peynir','eggs'],['Ton balıklı sandviç & yoğurt','fish'],['Tavuklu dürüm','chicken'],['Yumurta, peynir & ekmek','eggs'],['Etli salata & ekmek','meat'],['Tavuklu sandviç & yoğurt','chicken'],['Yumurtalı kahvaltı & peynir','eggs']];
const secondB=[['Tavuklu salata','chicken'],['Etli salata','meat'],['Tavuklu dürüm','chicken'],['Mercimek çorbası & tavuk','beans'],['Tavuklu salata','chicken'],['Tavuklu sandviç','chicken'],['Tavuklu salata','chicken']];
function mealsFor(day,person,date){
 const meals=[];
 if(person==='b') meals.push({id:'breakfast',time:'09:00',title:day===0?'Menemen':day===3?'Sebzeli omlet':'Yumurtalı kahvaltı',art:'eggs',lines:day<7?['2 yumurta','1 dilim tam buğday ekmeği','Söğüş sebze',...([1,6].includes(day)?['1 küçük meyve']:[])]:['Yumurtalı kahvaltı','İkinci hafta miktarları önceki planda belirtilmemiş']});
 const entry=day<7?(person==='a'?lunchesA:lunchesB)[day]:(person==='a'?secondA:secondB)[day-7];
 meals.push({id:'lunch',time:person==='a'?'12:00':'12:30',title:entry[0],art:entry[1],lines:entry[2]||[day===10&&person==='a'?'3 yumurta + peynir + ekmek':'Menü taslağındaki öğün','Miktarlar önceki planda belirtilmemiş']});
 const d=dinners[day];
 meals.push({id:'dinner',time:'20:00',title:d[0],art:d[1],lines:d[2].map(x=>`${x[person]}${x.unit?' '+x.unit:''} · ${x.name}`),items:d[2]});
 return meals.map(m=>{
  if((date==='2026-09-22'&&m.id==='dinner')||(date==='2026-09-23'&&m.id==='lunch')) return {...m,title:'Yoğurtlu kabak & ceviz',art:'vegetable',lines:['1 tabak · bildirdiğiniz porsiyon','Yoğurt, kabak, dereotu ve nane','Biraz zeytinyağında kırmızı toz biberle sotelenmiş ceviz'],items:[item('Yoğurtlu kabak ve ceviz',1,1,'tabak')]};
  return m;
 });
}
