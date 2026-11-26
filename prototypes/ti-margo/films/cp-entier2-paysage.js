/* La PAYSAGE des paires 4 à 6 des nombres entiers CP (26/11/2026) : relit films/cp-entier-paysage.js (cadre, caméra,
   miniature ; il relit lui-même cp-entier.js) puis films/cp-entier2-dessins.js. Films : films/cp-entier2-paysage-<épisode>.js. */
(function(){ for(const f of ['films/cp-entier-paysage.js','films/cp-entier2-dessins.js']){ const x=new XMLHttpRequest(); x.open('GET',f,false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); } })();
