/* Série IDRISS LE PÊCHEUR (27/11/2026) : les PAYSAGES. Relit films/cp-entier-paysage.js (cadre, caméra, miniature ;
   il relit cp-entier.js), cp-entier2-dessins.js, cp-entier3-dessins.js puis films/idriss-dessins.js.
   Films : films/idriss-paysage-<épisode>.js. */
(function(){ for(const f of ['films/cp-entier-paysage.js','films/cp-entier2-dessins.js','films/cp-entier3-dessins.js','films/idriss-dessins.js','films/idriss-dessins-cp.js','films/idriss-dessins-ce1.js','films/idriss-dessins-ce2.js']){ const x=new XMLHttpRequest(); x.open('GET',f,false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); } })();
