/* Série TI MARGO, PROBLÈMES CP et DIVISION CE1 (28/11/2026) : les SHORTS du CP.
   Voix validées : manim/SCRIPTS-ti-margo-problemes.md, manim/voix/margo-pb-cp-<ép>-short.json. Films : films/margo-pb-cp-<épisode>.js.
   Relit cp-entier.js, les dessins des CP (cp-entier2/3), les dessins d'Idriss (lecture seule : formuleE, enfantE, dameE…),
   puis le socle commun films/margo-dessins.js et les dessins de la classe films/margo-dessins-cp.js.
   ⛔ Ne plus modifier ce fichier ni le .json : chaque film vit dans son propre fichier. */
(function(){ for(const f of ["films/cp-entier.js", "films/cp-entier2-dessins.js", "films/cp-entier3-dessins.js", "films/idriss-dessins.js", "films/idriss-dessins-cp.js", "films/idriss-dessins-ce1.js", "films/idriss-dessins-ce2.js", "films/margo-dessins.js", "films/margo-dessins-cp.js"]){ const x=new XMLHttpRequest(); x.open('GET',f,false); x.send();
  if(x.status&&x.status!==200&&x.status!==0) continue; const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); } })();
