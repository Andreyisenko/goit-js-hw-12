import{S as i,a as p}from"./assets/vendor-I6ojcvTw.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function d(s){return s.map(({id:a,webformatURL:o,largeImageURL:n,tags:e,likes:t,views:r,comments:l,downloads:c})=>`<li data-id="${a}" class="gallery-item">
              <a href=${n} class="gallery-link">
              <img src=${o} class="gallery-image" alt=${e}> 
              <div class="wrap"><h2 class="title-like">Likes <span class="span-text"> ${t} </span></h2>
               <h2 class="title-views">Views <span class="span-text"> ${r} </span></h2>
               <h2 class="title-comments">Comments <span class="span-text">${l}</span> </h2>
               <h2 class="title-downloads">Downloads <span class="span-text">${c} </span></h2></div>
  </a>
              </li>`).join("")}const u=new i(".gallery a",{captionDelay:250,captionsData:"alt"}),m=document.querySelector(".gallery"),f="https://pixabay.com/api/",h="47413156-c8c9abea8f6d88937b7892740";document.querySelector(".feedback-form");const g=document.querySelector(".load-more");let y;async function L(s=1){const a=new URLSearchParams({key:h,q:"cat",page:s,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:"true"}),{data:o}=await p(`${f}?${a}`);return console.log(22),o}L(y).then(s=>{console.log(s),m.insertAdjacentHTML("afterbegin",d(s.hits)),g.classList.replace("load-more-hidden","load-more"),u.refresh()}).catch(s=>alert(s.massage));console.log(11);
//# sourceMappingURL=index.js.map
