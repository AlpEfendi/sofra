function validWeightDate(value){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const d=new Date(value+'T12:00:00');return Number.isFinite(d.getTime())&&localDate(d)===value;
}
function cleanWeights(value){
 const out={a:{},b:{}};
 for(const p of ['a','b'])for(const [date,kg] of Object.entries(value?.[p]||{})){
  if(validWeightDate(date)&&typeof kg==='number'&&Number.isFinite(kg)&&kg>=20&&kg<=400)out[p][date]=Math.round(kg*100)/100;
 }
 return out;
}
function weightSummary(records){
 const entries=Object.entries(records).sort(([a],[b])=>a.localeCompare(b));
 return {entries,first:entries[0],last:entries.at(-1),change:entries.length?Math.round((entries.at(-1)[1]-entries[0][1])*100)/100:null};
}
const kgText=n=>n.toLocaleString('tr-TR',{maximumFractionDigits:2});
function weightsPage(){
 const {entries,first,last,change}=weightSummary(state.weights[state.person]);
 const dateText=d=>new Date(d+'T12:00:00').toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});
 return `<p class="eyebrow">${esc(state.names[state.person])} · Kişisel takip</p><h1>Kilo günlüğüm.</h1><p class="muted">İlk ölçümünüzle bugüne kadar olan değişimi görün.</p>${first?`<div class="weight-stats"><div><small>Başlangıç</small><b>${kgText(first[1])} <span>kg</span></b><small>${dateText(first[0])}</small></div><div><small>Son ölçüm</small><b>${kgText(last[1])} <span>kg</span></b><small>${dateText(last[0])}</small></div><div><small>Başlangıca göre</small><b>${change>0?'+':''}${kgText(change)} <span>kg</span></b><small>${entries.length===1?'İlk kaydınız':change<0?'Azalma':change>0?'Artış':'Değişim yok'}</small></div></div>`:'<p class="notice">Henüz ölçüm yok. Önce başlangıç kilonuzu kendi tarihiyle, ardından bugünkü kilonuzu ekleyin.</p>'}<form id="weight-form" class="food-log"><label>Ölçüm tarihi<input id="weight-date" name="date" type="date" required max="${localDate(new Date())}" value="${localDate(new Date())}"></label><label>Kilo (kg)<input id="weight-kg" name="kg" type="text" inputmode="decimal" required maxlength="6" placeholder="Örn. 80,5" autocomplete="off"></label><button class="primary" type="submit">Ölçümü kaydet</button><p class="note">Aynı tarihteki ölçümü kaydederseniz o günün kaydı güncellenir. En eski tarihli ölçüm başlangıç kabul edilir.</p></form><h2 class="spacer">Ölçüm geçmişi</h2>${entries.length?`<table><thead><tr><th>Tarih</th><th>Kilo</th><th>İşlem</th></tr></thead><tbody>${entries.slice().reverse().map(([d,k])=>`<tr><td>${dateText(d)}</td><td>${kgText(k)} kg</td><td><button class="weight-edit" data-weight-edit="${d}">Düzenle</button></td></tr>`).join('')}</tbody></table>`:'<p class="note">Ölçümler burada tarihe göre sıralanacak.</p>'}<p class="note spacer">Kayıtlar seçili kişiye aittir, 14 günlük plan bittikten sonra da tutulur. Yalnızca bu cihazda saklanır; Ayarlar’dan yedekleyebilirsiniz.</p>`;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-weight-edit]');if(!b)return;
 $('#weight-date').value=b.dataset.weightEdit;$('#weight-kg').value=String(state.weights[state.person][b.dataset.weightEdit]).replace('.',',');$('#weight-kg').focus();$('#weight-form').scrollIntoView({block:'center'});
});
document.addEventListener('submit',e=>{
 if(e.target.id!=='weight-form')return;e.preventDefault();
 const f=new FormData(e.target),date=String(f.get('date')),raw=String(f.get('kg')).trim();
 const kg=Number(raw.replace(',','.'));
 if(!validWeightDate(date)||date>localDate(new Date())||!/^\d{2,3}([.,]\d{1,2})?$/.test(raw)||!Number.isFinite(kg)||kg<20||kg>400){toast('Geçerli bir tarih ve 20–400 kg arasında kilo girin.');return;}
 state.weights[state.person][date]=Math.round(kg*100)/100;
 if(save()){render();toast('Kilo ölçümü kaydedildi.');}
});
