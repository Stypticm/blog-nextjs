if(!self.define){let e,s={};const a=(a,n)=>(a=new URL(a+".js",n).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(n,t)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let i={};const r=e=>a(e,c),m={module:{uri:c},exports:i,require:r};s[c]=Promise.all(n.map((e=>m[e]||r(e)))).then((e=>(t(...e),i)))}}define(["./workbox-c06b064f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/MqZFZ_PVI_JOYmBmHe0e2/_buildManifest.js",revision:"1cf1d29ca8db214b693a18628288ef54"},{url:"/_next/static/MqZFZ_PVI_JOYmBmHe0e2/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/222-59e49c83231edac8.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/250-65e9d44037f36a77.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/459-2f2f9c8097a56a3b.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/496-1c639dd8306025df.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/509-b16f3596660ed07a.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/604-46391f6c929fbe56.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/749-e8b754b5bcd817e1.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/8012d7e2-242aaa12d9890cea.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/847-b8391f1063218e2c.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/849-1db2ebb8b53d1914.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/9081a741-b043cb48c73319f7.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/98916abf-f8d6236c47c67e93.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/(auth)/auth/page-cba64ccf7ad3f41b.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/@authModal/(.)auth/page-7d88e5c505ae7ae8.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/@authModal/default-1eaa2635d1827423.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/_not-found-00a84d462cde4c54.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/admin/page-f7f51b9b58548022.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/blog/%5Bslug%5D/page-c2635863e563c665.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/blog/page-3d3a912277e2dd6e.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/createpost/page-8cf472733df8c068.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/layout-2fcfe347039c2c96.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/page-39856145dc49a01a.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/app/profile/page-3c730b1625b61030.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/fd9d1056-c426fd48dcbd8614.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/main-466a4c293be73cbb.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/main-app-dbd5b069cadb0da2.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/pages/_app-98cb51ec6f9f135f.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/pages/_error-e87e5963ec1b8011.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-c7ce81b482f9cf54.js",revision:"MqZFZ_PVI_JOYmBmHe0e2"},{url:"/_next/static/css/8aee48eb52f4c731.css",revision:"8aee48eb52f4c731"},{url:"/_next/static/css/bbf230b8e1674c26.css",revision:"bbf230b8e1674c26"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
