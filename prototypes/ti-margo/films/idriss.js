/* ============================================================
   Série IDRISS LE PÊCHEUR (27/11/2026) : les SHORTS, CP → CE2, un par micro.
   Relit films/cp-entier.js, cp-entier2-dessins.js, cp-entier3-dessins.js (dessins des CP) puis films/idriss-dessins.js.
   Sorties : manim/sorties/idriss/<num>-<épisode> ; voix manim/voix/idriss-<ép>-short.json ; scripts manim/SCRIPTS-idriss-pecheur.md.
   Pas de « TU PARIES ? » (test CP du 27/11) : l'accroche passe par le dessin et la voix.
   ============================================================ */
(function(){ for(const f of ['films/cp-entier.js','films/cp-entier2-dessins.js','films/cp-entier3-dessins.js','films/idriss-dessins.js']){ const x=new XMLHttpRequest(); x.open('GET',f,false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); } })();
/* La fin : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 », rien d'autre */
function finShortE(){ const css=document.createElement('style'); css.textContent='#f3,#f6{display:none!important;} #fin #f5{font-size:64px;}';
  document.head.append(css); document.getElementById('f4').innerHTML='<span>ou sur YouTube</span>'; }
