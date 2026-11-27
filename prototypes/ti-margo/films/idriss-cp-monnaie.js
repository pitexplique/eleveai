/* ============================================================
   Série Idriss le pêcheur — SHORT 03 : « Pas une pièce de trop » (micro cp_monnaie_constituer), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2/3-dessins.js + idriss-dessins.js. Voix : manim/voix/idriss-cp-monnaie-short.json.
   Un petit poisson à 3 € ; Ti Margo a une pièce de 2 € et deux pièces de 1 € : que donner, sans une pièce de trop ?
   Bonne réponse B (2 € + 1 €). Ceinture blanche. Commentaire : payer 6 € avec des pièces de 2 € ?
   ⭐ Comme le short 01 : Ti Margo petit à gauche, la carte à droite sous l'ardoise.
   ============================================================ */
FILMS['cp-monnaie']=function(outils){
  const DUR={'00-accroche':8.03,'01-question':13.805,'01b-reponse':8.695,'02-commentaire':8.075,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tCe=m0('Ce'), tPoisson=m0('poisson'), tTrois=m0('trois'), tJai=m0("J'ai"), tDeux=m0('deux'), tDeux2=m0('deux',2), tUn=m0('un');
  const mq=w=>mot('01-question',w), tQuelles=mq('Quelles'), tTrop=mq('trop');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tDeuxR=mr('Deux'), tPlus=mr('plus'), tUnR=mr('un'), tTroisR=mr('trois'), tPile=mr('pile'), tAvec=mr('Avec'), tQuatre=mr('quatre'), tTropR=mr('trop');
  const mc=w=>mot('02-commentaire',w), tSixC=mc('six'), tDeuxC=mc('deux'), tRep=mc('réponds');
  const finTitre=tCe-.08;

  /* le comptoir du marché ; le poisson et son prix à gauche, les pièces de Ti Margo à droite */
  const P0=[[640,330,2],[815,330,1],[975,330,1]], DONNE=[[200,605],[395,605]];
  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,480,1056,240); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,480); c.lineTo(1056,480); c.stroke();
    c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(0,486,1056,10); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* payer 6 € avec des pièces de 2 € */
      comptoir(c);
      if(T>=tSixC) prixE(c,'6 €',300,250,140,{z:zoom(T,tSixC,.5)});
      if(T>=tDeuxC) for(let k=0;k<5;k++) euroE(c,2,128+k*200,600,80,{z:zoom(T,tDeuxC+k*.1,.4)});
      if(T>=tDeuxC+.6) ecrire(c,'?',780,250,170*zoom(T,tDeuxC+.6,.5),CRAIE.jaune);
      tab.maj(); return; }

    comptoir(c);
    if(T>=tPoisson) poissonE(c,270,380,380,'#ffa94d',{T,z:zoom(T,tPoisson,.4)});
    if(T>=tTrois) prixE(c,'3 €',270,160,120,{z:zoom(T,tTrois,.5),lueur:T>=r&&T>=tPile&&T<tAvec?.6:0});
    if(T>=tJai) porteMonnaieE(c,860,700,260,1);
    /* les trois pièces ; dans la réponse, la pièce de 2 € puis une de 1 € glissent sous le poisson */
    const tP=[tDeux,tDeux2,tDeux2+.2], tG=[tDeuxR,tUnR];
    P0.forEach(([x,y,v],k)=>{ if(T<tP[k]) return; let p=[x,y];
      if(k<2&&T>=r){ const u=entreE(T,tG[k]-.2,tG[k]+.5); p=sautE([x,y],DONNE[k],u,120); }
      const trop=k===2&&T>=r&&T>=tAvec;
      euroE(c,v,p[0],p[1],74,{z:zoom(T,tP[k],.4),lueur:(k<2&&T>=r&&T>=tPile&&T<tAvec)||trop?.6+.4*Math.sin(T*5):0});
      if(trop&&T>=tQuatre){ cercle(c,x,y,110,CRAIE.faux,entreE(T,tQuatre,tQuatre+.4)); } });
    if(T<r){ if(T>=tQuelles) ecrire(c,'?',810,150,150*zoom(T,tQuelles,.5),CRAIE.jaune); }
    else {
      formuleE(c,T,730,110,['2','+','1','=','3 €'],[tDeuxR,tPlus,tUnR,tTroisR,tTroisR],96,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tPile&&T<tAvec) for(const [x,y] of [[460,140],[110,520]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      if(T>=tQuatre) formuleE(c,T,655,430,['2','+','1','+','1','=','4 €'],[tQuatre,tQuatre,tQuatre,tQuatre,tQuatre,tQuatre,tQuatre],54,
        [CRAIE.gris,CRAIE.gris,CRAIE.gris,CRAIE.gris,CRAIE.faux,CRAIE.gris,CRAIE.faux]); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Quelles pièces je donne à Idriss, sans une pièce de trop ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('2 € + 1 € = 3 €',[tDeuxR,tDeuxR,tPlus,tUnR,tUnR,tTroisR,tTroisR,tTroisR]);

  poserMiniature(outils,q-.3,'Pas une pièce<br>de trop !',ardoiseMini([['3 €','#ffd43b'],['2 € 1 € 1 €']]));
  return { clips,FIN,titre:'Pas une pièce de trop',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 € + 1 €',tq('A'),tq('un',2)],['2 € + 1 €',tq('B'),tq('un',3)],['2 € + 1 € + 1 €',tq('C'),tq('un',5)]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tJai?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T>=tPile&&T<tAvec?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
