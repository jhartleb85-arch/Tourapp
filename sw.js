const V="tour-v52";const SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!="GET")return;
 const own=u.origin==location.origin,font=/fonts\.(googleapis|gstatic)\.com/.test(u.host);if(!own&&!font)return;
 e.respondWith(caches.open(V).then(c=>c.match(e.request,{ignoreSearch:own}).then(hit=>{const net=fetch(e.request).then(r=>{if(r.ok||r.type=="opaque")c.put(e.request,r.clone());return r}).catch(()=>hit);return own?(net.then(r=>r||hit).catch(()=>hit)):(hit||net)})))});
