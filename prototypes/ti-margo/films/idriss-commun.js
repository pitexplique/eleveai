/* Série Idriss le pêcheur : les outils communs des dessins animés CP (films/cp-commun.js), relus tels quels. */
(function(){ const x=new XMLHttpRequest(); x.open('GET','films/cp-commun.js',false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); })();
