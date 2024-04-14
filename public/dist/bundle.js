(()=>{"use strict";var e=function(e,n,t,r){return new(t||(t=Promise))((function(o,c){function a(e){try{l(r.next(e))}catch(e){c(e)}}function i(e){try{l(r.throw(e))}catch(e){c(e)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,i)}l((r=r.apply(e,n||[])).next())}))};function n(n){return e(this,void 0,void 0,(function*(){try{const e=yield fetch(n);if(!e.ok)throw new Error(`Failed to fetch ${n}: ${e.statusText}`);const t=(yield e.text()).split("\n"),r=new Map;for(const e of t){const n=e.split(",");if(2!==n.length){console.warn(`Ignoring malformed line: ${e}`);continue}const[t,o]=n;r.set(t,o.replace(/[\n\r]+/,""))}return r}catch(e){throw console.error(`An error occurred while loading replacements: ${e}`),e}}))}var t=function(e,n,t,r){return new(t||(t=Promise))((function(o,c){function a(e){try{l(r.next(e))}catch(e){c(e)}}function i(e){try{l(r.throw(e))}catch(e){c(e)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,i)}l((r=r.apply(e,n||[])).next())}))};const r=function(e,r,o){return t(this,void 0,void 0,(function*(){let t=new Map,c=new Map,a=1,i=parseInt(o);for(const e of r){(yield n(e)).forEach(((e,n)=>{let r=`★★${a++}_${"a".repeat(e.length)}★★`.replace(/1/g,"一").replace(/2/g,"二");c.set(n,r),t.set(r,e)}))}return Array.from(c).sort(((e,n)=>n[0].length-e[0].length)).forEach((([n,t])=>{if(t.length>=13){let r=!1;e=e.replace(new RegExp(n,"g"),(e=>!r&&100*Math.random()<=i?(r=!0,t.replace(/[\n\r]+/,"").replace(/\\n/g,"\n")):e))}else e=e.replace(new RegExp(n,"g"),(e=>100*Math.random()<=i?t.replace(/[\n\r]+/,"").replace(/\\n/g,"\n"):e))})),Array.from(t).forEach((([n,t])=>{e=e.replace(new RegExp(n,"g"),t.replace(/[\n\r]+/,"").replace(/\\n/g,"\n"))})),e=e.replace(/底底/g,"底")}))};var o=function(e,n,t,r){return new(t||(t=Promise))((function(o,c){function a(e){try{l(r.next(e))}catch(e){c(e)}}function i(e){try{l(r.throw(e))}catch(e){c(e)}}function l(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,i)}l((r=r.apply(e,n||[])).next())}))};document.addEventListener("DOMContentLoaded",(()=>{const e=document.getElementById("editor"),n=document.querySelectorAll('input[type="checkbox"][name="dictionary"]'),t=document.getElementById("translateButton"),c=document.getElementById("restoreButton"),a=document.getElementById("replace_probability"),i=document.getElementById("original_text_area");e&&t&&a&&i&&c&&(t.addEventListener("click",(()=>o(void 0,void 0,void 0,(function*(){i.value=e.value;const t=Array.from(n).filter((e=>e.checked)).map((e=>e.value));e.value=yield r(e.value,t,a.value)})))),c.addEventListener("click",(()=>{e.value=i.value})))}))})();