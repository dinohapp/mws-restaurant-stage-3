"use strict";self.addEventListener("install",function(e){var t=["/","index.html","restaurant.html","css/styles.css","js/dbhelper.js","js/main.js","js/restaurant_info.js","img/1.webp","img/2.webp","img/3.webp","img/4.webp","img/5.webp","img/6.webp","img/7.webp","img/8.webp","img/9.webp","img/10.webp","img/undefined.webp","img/icon-192.webp","img/icon-512.webp","https://fonts.gstatic.com/s/roboto/v18/KFOmCnqEu92Fr1Mu4mxK.woff2","https://fonts.gstatic.com/s/roboto/v18/KFOlCnqEu92Fr1MmEU9fBBc4.woff2"];e.waitUntil(caches.open("v1").then(function(e){return e.addAll(t)}))}),self.addEventListener("fetch",function(n){n.respondWith(caches.match(n.request).then(function(e){return e||fetch(n.request).then(function(t){return t&&200===t.status&&"basic"===t.type?caches.open("v1").then(function(e){return e.put(n.request,t.clone()),t}):t})}))});