/* ============================================================
   FILM MODÈLE : le plus petit short complet, à recopier pour une
   nouvelle série (films/<série>.js et films/<série>.json).
   Il reprend des voix existantes : il ne sert qu'à vérifier le socle.
   ============================================================ */
FILMS.exemple=function({$,panneau}){
  poserStudio({xMin:-8,xMax:8});

  /* Les clips de voix (fichiers .wav) et leur départ, en secondes */
  const clips=[['00-accroche',.4],['02q-question',4],['02r-reponse',9],['06-abonne',13]];

  /* Les écrits : chaque phrase apparaît mot à mot entre ses deux instants */
  const groupes=[
    {de:.5,a:3.9,top:410,phrases:[[.5,1.2,'Salut !'],[1.5,3,'Moi, c’est Ti Margo.']]}
  ];

  panneau.innerHTML='<div id="formule"></div>';

  return {
    clips, FIN:19,
    titre:'Le film modèle',
    ceinture:1,        /* 0 blanche, 1 jaune, 2 orange, 3 verte, 4 bleue, 5 marron, 6 noire */
    finTitre:3.9,      /* le titre et la ceinture disparaissent à cet instant */
    groupes,
    cuts:[4,13],       /* changements de plan francs */
    finClip:'06-abonne', /* le clip qui ouvre l'écran de fin */
    question:{         /* la question-pause, obligatoire */
      qc:'02q-question', rc:'02r-reponse',
      phrase:[[4.2,5,'Combien font 2 × 3 ?']],
      choix:[['5',.4,.6],['6',.8,1],['8',1.2,1.4]], /* [texte, cercle visible à, texte visible à], après le début du clip */
      bonne:1, tBon:.4, cpt:6,  /* cpt : début du compte à rebours de 3 s */
      pause:[[5.2,5.8,'Mets sur pause !']],
      tete:[[9,'Réponse']], reponse:[[9.1,9.8,'2 × 3 = 6']], suite:[], finR:12.9
    },
    /* Appelé à chaque image. P : la pose de Ti Margo. T : l'instant. c : la caméra. A : départ de chaque clip. */
    jouer(P,T,c,A){
      c.y=2.5;  /* la caméra monte : Ti Margo descend sous les cartes, sa tête reste visible */
      if(T>=A['02r-reponse']&&T<A['06-abonne']){ P.gesteD='pouce'; P.md.set(.95,2.3,.45); P.cd.set(.74,1.7,.14); }
      panneau.style.display=T<A['02q-question']?'block':'none';
      $('formule').textContent=T>=1.5?'2 × 3':'';
    }
  };
};
