/* ============================================================
   Série NOMBRES ENTIERS CP, paires 4 à 6 (comparer, dizaines-unités, piste graduée), 26/11/2026 : les SHORTS.
   Série à part (cp-entier2) pour ne pas toucher les fichiers des épisodes 01-03 pendant leurs corrections :
   ce fichier relit films/cp-entier.js (dessins communs) puis films/cp-entier2-dessins.js (dessins des paires 4-6).
   Mêmes sorties que cp-entier : manim/sorties/cp/maths/entier/<num>-<épisode>, noms eleveai-maths-cp-entier-<ép>-short.
   Voix : manim/voix/cp-entier-<ép>-short.json ; scripts : manim/SCRIPTS-cp-nombres-dessins-animes-2.md.
   ============================================================ */
(function(){ for(const f of ['films/cp-entier.js','films/cp-entier2-dessins.js']){ const x=new XMLHttpRequest(); x.open('GET',f,false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); } })();

/* 26/11, Frédéric : la fin des shorts comme celle des paysages, « Entraîne-toi sur eleveai.fr ou YouTube @eleveai974 », rien d'autre */
function finShortE(){ const css=document.createElement('style'); css.textContent='#f3,#f6{display:none!important;} #fin #f5{font-size:64px;}';
  document.head.append(css); document.getElementById('f4').innerHTML='<span>ou sur YouTube</span>'; }
