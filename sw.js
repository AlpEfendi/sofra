const CACHE='sofra-v4';
const FILES=['./','./index.html','./style.css?v=4','./data.js?v=4','./app.js?v=4','./manifest.webmanifest','./icon.svg','./icon-192.png','./icon-512.png',...['chicken','meat','fish','beans','vegetable','eggs'].map(x=>'./art/'+x+'.svg')];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('sofra-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}return r}).catch(()=>caches.match(e.request).then(r=>r||(e.request.mode==='navigate'?caches.match('./index.html'):Response.error()))))});
