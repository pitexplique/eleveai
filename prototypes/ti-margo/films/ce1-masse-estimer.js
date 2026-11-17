/* ============================================================
   Série Masse CE1 — ÉPISODE 03 : LA GOMME DE « 1 KILOGRAMME ». Outils : films/ce1-commun.js + ce1-masse.js.
   Le copain de Ti Margo dit que sa gomme pèse 1 kg. Ti Margo lui pose une brique de lait (1 kg) dans l'autre main :
   sa main descend d'un coup ! La gomme, c'est bien plus léger. Question : une gomme pèse environ… 20 g (B).
   Le copain range la brique et garde sa gomme. Commentaire : combien pèse ton cartable, en kilogrammes ?
   ============================================================ */
FILMS['estimer']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':10.02,'01-oups':5.02,'02-question':12.74,'02b-reponse':5.76,'03-fin':3.71,'04-commentaire':6.58,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-oups':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tCop=mot('00-accroche','copain'), tGomme=mot('00-accroche','gomme'), tKilo=mot('00-accroche','kilogramme'),
        tDonne=mot('00-accroche','donne'), tBrique=mot('00-accroche','brique'), tKilo2=mot('00-accroche','kilogramme',3);
  const tDesc=mot('01-oups','descend'), tGomme2=mot('01-oups','gomme'), tLeger=mot('01-oups','léger');
  const tRange=mot('03-fin','range'), tGarde=mot('03-fin','garde');
  const tComb=mot('04-commentaire','combien'), tCart=mot('04-commentaire','cartable'), tKg=mot('04-commentaire','kilogrammes'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tCop-.08, HAUT=105;
  const MG={x:290,y:520}, MD={x:770,y:520}, BAS=130, S=1.5; /* les deux mains du copain (échelle S) ; la droite descend de BAS px */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : ton cartable, combien de kilogrammes ? */
      if(T>=tCart) cartableCraie(c,320,600,2.0,zoom(T,tCart,.4));
      if(T>=tKg) ecrire(c,'? kg',760,440,130*zoom(T,tKg,.4),CRAIE.jaune);
      if(T>=tComb) ecrire(c,'ton cartable :',528,HAUT,62*zoom(T,tComb,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* la main droite : à niveau, puis elle descend d'un coup avec la brique ; à la fin, elle sort avec la brique */
    const dy=BAS*doux(entreM(T,tDesc,tDesc+.35)), sort=T>=ouf?doux(entreM(T,tRange,tRange+.6))*520:0;
    if(T>=tGomme){ mainCraie(c,MG.x,MG.y,S,zoom(T,tGomme,.4),-1); gommeCraie(c,MG.x+10,MG.y-24*S,S,zoom(T,tGomme,.4)); }
    if(T>=tDonne&&sort<500){ const x=MD.x+sort, y=MD.y+dy;
      mainCraie(c,x,y,S,zoom(T,tDonne,.4),1); if(T>=tBrique) briqueCraie(c,x,y-24*S,1.3,zoom(T,tBrique,.4)); }
    if(T<sur){
      if(T>=tKilo) ecrire(c,'1 kg ?',MG.x,300,76*zoom(T,tKilo,.4),CRAIE.faux);
      if(T>=tKilo2) ecrire(c,'1 kg',MD.x,HAUT,84*zoom(T,tKilo2,.4),CRAIE.ok);
    } else if(T<q){
      if(T>=tDesc) ecrire(c,'boum !',MD.x,HAUT+30,72*zoom(T,tDesc,.4),CRAIE.ret);
      if(T>=tGomme2&&T<tLeger) ecrire(c,'1 kg ?',MG.x,300,76,CRAIE.faux);
      if(T>=tLeger) ecrire(c,'bien plus léger !',MG.x+50,300,62*zoom(T,tLeger,.4),CRAIE.ok);
    } else if(T>=ouf){
      ecrire(c,'environ 20 g',MG.x+40,300,70,CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0('Mon copain dit :'),a0('ma gomme pèse 1 kilogramme !')],[a0('Je lui donne'),a0('une brique de lait.')],
      [a0("Ça, c'est 1 kilogramme.")]),
    ...suiteDe(q,60,62,[a1("Sa main descend d'un coup !")],[a1("La gomme, c'est"),a1('bien plus léger.')]),
    ...suiteDe(com,60,62,[a3('Mon copain range la brique…'),a3('et garde sa gomme !')]),
    ...suiteDe(f,60,58,[a4('À toi : combien pèse'),a4('ton cartable,')],[a4('en kilogrammes ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Une gomme pèse environ…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Une gomme pèse environ'), r2=rd('20 grammes :'), r3=rd('comme 20 trombones.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<g transform="rotate(-4 165 95)"><rect x="85" y="62" width="160" height="66" rx="12" fill="#ffc9c9" stroke="#c92a2a" stroke-width="4"/>`+
    `<rect x="85" y="62" width="88" height="66" rx="12" fill="#4dabf7" stroke="#1864ab" stroke-width="4"/></g>`+
    `<text x="165" y="205" font-family="Segoe UI" font-weight="800" font-size="62" fill="#ff8787" text-anchor="middle">1 kg ?</text></svg>`;
  poserMiniature(outils,acc+1,'Une gomme<br>de 1 kg ?'+PARI,mini);
  return { clips,FIN,titre:'Combien pèse une gomme ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['20 kilogrammes',tq('A'),tq('kilogrammes')],['20 grammes',tq('B'),tq('grammes')],['1 kilogramme',tq('C'),tq('kilogramme')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tDonne) g.montre();
      else if(T<sur) g.fier();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tGarde?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
