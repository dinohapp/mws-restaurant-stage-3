!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class r{constructor(e="keyval-store",t="keyval"){this.storeName=t,this._dbp=new Promise((n,r)=>{const o=indexedDB.open(e,1);o.onerror=(()=>r(o.error)),o.onsuccess=(()=>n(o.result)),o.onupgradeneeded=(()=>{o.result.createObjectStore(t)})})}_withIDBStore(e,t){return this._dbp.then(n=>new Promise((r,o)=>{const i=n.transaction(this.storeName,e);i.oncomplete=(()=>r()),i.onabort=i.onerror=(()=>o(i.error)),t(i.objectStore(this.storeName))}))}}let o;function i(){return o||(o=new r),o}function s(e,t,n=i()){return n._withIDBStore("readwrite",n=>{n.put(t,e)})}self.addEventListener("install",function(e){let t=["/","index.html","restaurant.html","css/styles.css","js/dbhelper.js","js/main.js","js/restaurant_info.js","img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg","img/5.jpg","img/6.jpg","img/7.jpg","img/8.jpg","img/9.jpg","img/10.jpg","img/undefined.jpg","img/icon-192.png","img/icon-512.png"];e.waitUntil(caches.open("v1").then(e=>e.addAll(t)))}),self.addEventListener("fetch",e=>{"1337"===new URL(e.request.url).port?e.respondWith(u(e.request)):e.waitUntil(c(e))});const u=e=>(function(e,t=i()){let n;return t._withIDBStore("readonly",t=>{n=t.get(e)}).then(()=>n.result)})("restaurants").then(t=>t||fetch(e).then(e=>e.json()).then(e=>(s("restaurants",e),e.forEach(e=>{s(e.id,e)}),e))).then(e=>new Response(JSON.stringify(e))),c=e=>{e.respondWith(caches.match(e.request).then(function(t){return t||fetch(e.request).then(t=>t&&200===t.status&&"basic"===t.type?caches.open("v1").then(n=>(n.put(e.request,t.clone()),t)):t)}))}}]);