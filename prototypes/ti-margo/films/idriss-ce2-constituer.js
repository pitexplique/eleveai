/* ============================================================
   Série Idriss le pêcheur — SHORT 20 : « Le filet neuf » (micro ce2_monnaie_constituer), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-constituer-short.json (manim/SCRIPTS-monnaie-idriss.md, CE2 2).
   Un filet à 23,50 € ; Idriss a 10 € + 10 € + 2 € + 50 c = 22,50 € : bonne réponse B (il manque 1 €). Commentaire : 5 € en pièces de 50 c.
   Ceinture blanche. Ti Margo petit à gauche dès la fin du titre.
   ============================================================ */
FILMS['ce2-constituer']=function(outils){
  const DUR={'00-accroche':11.91,'01-question':13.645,'01b-reponse':12.495,'02-commentaire':8.575,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:46px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tIdriss=m0('Idriss'), tFilet=m0('filet'), tVT=m0('vingt-trois'), tDeux=m0('deux'), tBillets=m0('billets'), tDix=m0('dix'), tPiece=m0('pièce'), tDeuxE=m0('deux',2), tPiece2=m0('pièce',2), tCinquante=m0('cinquante');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tDixR=mr('Dix'), tVingtR=mr('vingt'), tVD=mr('vingt-deux'), tCinqR=mr('cinquante'), tVD2=mr('vingt-deux',2), tManque=mr('manque'), tEuroR=mr('euro'), tCe=mr('Ce'), tDemain=mr('demain');
  const mc=w=>mot('02-commentaire',w), tCinqC=mc('cinquante'), tCinqEC=mc('cinq'), tRep=mc('réponds');
  const finTitre=tIdriss-.08;

  /* l'argent d'Idriss sur le comptoir : deux billets de 10 €, une pièce de 2 €, une pièce de 50 c ; le filet neuf à droite */
  const MON=[['10€',300,'10 €'],['10€',465,'20 €'],['2€',595,'22 €'],['50c',698,'22,50 €']], MY=640;
  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,560,1056,160); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,560); c.lineTo(1056,560); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 5 € en pièces de 50 c */
      quaiBoisE(c,T,150); comptoir(c);
      if(T>=tCinqC) for(let k=0;k<3;k++) centimeE(c,50,300+k*130,450,62,{z:zoom(T,tCinqC+k*.12,.4)});
      if(T>=tCinqC) ecrire(c,'…',700,450,90*zoom(T,tCinqC+.4,.4),CRAIE.blanc);
      if(T>=tCinqEC){ prixVCe2E(c,'5 € = ?',528,210,130,{z:zoom(T,tCinqEC,.5),fond:1}); }
      tab.maj(); return; }

    quaiBoisE(c,T,150); comptoir(c);
    const repond=T>=r;
    idrissE(c,150,712,1.25,{montre:(T>=tFilet&&T<tDeux)||(repond&&T<tCe)?1:0,T});
    /* le filet neuf et son prix ; il s'en va « pour demain » */
    const part=repond?entreE(T,tCe,tDemain):0;
    if(T>=tFilet){ filetCe2E(c,880+part*240,560,270,{z:zoom(T,tFilet,.4),lueur:T>=q&&T<r?.4:0}); }
    if(T>=tVT) ardoiseVCe2E(c,'23,50 €',860,170,72,{z:zoom(T,tVT,.5),lueur:repond&&T>=tVD2&&T<tManque?.5:0});
    /* l'argent paraît quand la voix le dit */
    const ts=[tBillets,tBillets+.25,tDeuxE,tCinquante];
    MON.forEach(([n,x],k)=>{ if(T<ts[k]) return; const lu=repond&&T>=[tDixR,tVingtR,tVD,tCinqR][k]&&T<tVD2?.6:0;
      argentCe2E(c,n,x,MY,n.endsWith('€')&&parseInt(n)>=5?30:44,{z:zoom(T,ts[k],.4),lueur:lu,grand:1}); });
    if(T>=tDeux&&T<r) etiquette(c,'2',300,520,T,tDeux,'#74c0fc',46);
    if(T<r){ if(T>=q) ecrire(c,'?',540,330,150*zoom(T,q+1,.5),CRAIE.jaune); }
    else {
      /* 10, 20, 22 euros, et 50 c : 22,50 € < 23,50 € ; il manque 1 € */
      MON.forEach(([n,x,txt],k)=>{ const t=[tDixR,tVingtR,tVD,tCinqR][k]; if(T>=t&&k<3) plaqueCe2E(c,txt,x,522,40,T,t,k===2?CRAIE.ok:CRAIE.jaune); });
      if(T>=tVD2) calculVCe2E(c,T,500,300,['22,50 €','<','23,50 €'],[tVD2,tVD2+.3,tVD2+.5],70,{vert:false});
      if(T>=tManque) prixVCe2E(c,'il manque 1 €',500,420,66,{z:zoom(T,tManque,.5),une:CRAIE.faux,fond:1}); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("A-t-il assez d'argent ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,q-.3,'Assez<br>d\'argent ?',ardoiseMini([['filet :'],['23,50 €','#ffd43b']]));
  return { clips,FIN,titre:'Le filet neuf',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['Oui, pile',tq('A'),tq('pile')],['Non, il manque 1 €',tq('B'),tq('euro')],['Oui, il reste 1 €',tq('C'),tq('euro',2)]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('22,50 € < 23,50 €',[tVD2,tVD2,tVD2+.3,tVD2+.5,tVD2+.5]),phraseE('Il manque 1 €.',[mr('Il'),tManque,mr('un'),tEuroR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tDeux?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tManque?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
