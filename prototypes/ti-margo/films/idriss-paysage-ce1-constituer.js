/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 15 : « Payer pile » (micro ce1_monnaie_constituer), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-constituer-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 4).
   Sardines à 3 € 20 c : d'abord les euros (2 € + 1 €), puis les centimes (20 c) ; autre façon : 3 × 1 € + 2 × 10 c.
   Questions : un crabe à 2 € 50 c → C (2 € + 50 c) ; payer 4 € avec 3 € 50 c déjà posés → B (50 c).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-constituer']=function(outils){
  const DUR={'00-accroche':10.02,'01-euros':6.86,'02-centimes':6.82,'03-autre':7.93,'04-question':18.74,'04b-reponse':11.215,
    '05-question':17.99,'05b-reponse':9.475,'06-appris':9.44,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-euros':1,'02-centimes':1,'03-autre':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,eu,ce,au,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:46px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w), tSur=m0('Sur'), tSard=m0('sardines'), tTrois0=m0('trois'), tVingt0=m0('vingt'), tPile0=m0('pile'), tRendre0=m0('rendre');
  const me=(w,n=1)=>mot('01-euros',w,n), tDeuxE=me('deux'), tUnE=me('un'), tTroisE=me('Trois');
  const mc=w=>mot('02-centimes',w), tVingtC=mc('vingt'), tTroisC=mc('Trois'), tPileC=mc('pile');
  const mau=w=>mot('03-autre',w), tTroisA=mau('trois'), tDeuxA=mau('deux'), tPlusieurs=mau('plusieurs');
  const mq1=(w,n=1)=>mot('04-question',w,n), tCrabe=mq1('crabe'), tDeuxQ=mq1('deux'), tQue=mq1('Que'), tAq=mq1('A'), tBq=mq1('B'), tCq=mq1('C');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDeux1=mr1('Deux'), tCinq1=mr1('cinquante'), tA1=mr1('A'), tB1=mr1('B');
  const mq2=(w,n=1)=>mot('05-question',w,n), tQuatreQ=mq2('quatre'), tTroisQ=mq2('trois'), tQuelle=mq2('Quelle');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tC50=mr2('Cinquante'), tPlus2=mr2('plus'), tC50b=mr2('cinquante',2), tUn2=mr2('un'), tTrois2=mr2('Trois'), tQuatre2=mr2('quatre'), tPile2=mr2('pile');
  const ma=w=>mot('06-appris',w), tEurosA=ma('euros'), tCentA=ma('centimes');
  const finTitre=tSur-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : 1. les euros (billets, grosses pièces) ; 2. les centimes (petites pièces) */
      quaiBoisE(c,T,40);
      if(T>=tEurosA){ ecrire(c,'1. les euros',270,140,64,CRAIE.r0); euroE(c,5,190,300,44,{grand:1}); euroE(c,2,390,300,60); }
      if(T>=tCentA){ ecrire(c,'2. les centimes',790,140,64,'#ffc078'); centimeE(c,20,700,300,90); centimeE(c,10,880,300,84); }
      tab.maj(); return; }

    if(T>=q2){ /* payer 4 € : déjà 2 € + 1 € + 50 c ; quelle pièce ajouter ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tQuatreQ) sommeE(c,'à payer : 4 €',240,110,56,{z:zoom(T,tQuatreQ,.4),coul:CRAIE.jaune});
      if(T>=tTroisQ){ euroE(c,2,80,280,52); euroE(c,1,190,280,50); centimeE(c,50,300,280,86); }
      const ajout=T>=r2&&T>=tC50b;
      if(ajout) centimeE(c,50,410,280,86,{z:zoom(T,tC50b,.5),lueur:.6});
      else if(T>=tQuelle){ c.strokeStyle=CRAIE.jaune; c.lineWidth=5; c.setLineDash([10,8]); c.beginPath(); c.arc(410,280,48,0,7); c.stroke(); c.setLineDash([]); ecrire(c,'?',410,282,60,CRAIE.jaune); }
      if(T>=tTroisQ&&T<r2) ecrire(c,'3 € et 50 c',240,410,56,CRAIE.blanc);
      if(T>=r2){ formuleE(c,T,240,420,['50 c','+','50 c','=','1 €'],[tC50,tPlus2,tC50b,tUn2,tUn2],52,[CRAIE.jaune,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok]);
        if(T>=tTrois2) formuleE(c,T,240,540,['3 €','+','1 €','=','4 €'],[tTrois2,tTrois2,tTrois2,tQuatre2,tQuatre2],60);
        if(T>=tPile2) ecrire(c,'pile !',240,650,64*zoom(T,tPile2,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T>=q1){ /* un crabe à 2 € 50 c : que donner ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tCrabe) crabeE(c,100,150,.85,{z:zoom(T,tCrabe,.4),T});
      if(T>=tDeuxQ) prixE(c,'2 € 50 c',330,130,52,{z:zoom(T,tDeuxQ,.5)});
      const SET=[[1,1,'20c'],[2,'5c'],[2,'50c']], RY=[300,440,580], LET=['A','B','C'], TS=[tAq,tBq,tCq];
      const SOM=['2 € et 20 c','2 € et 5 c','2 € et 50 c'], TSOM=[tA1,tB1,tC1];
      RY.forEach((y,k)=>{ if(T<TS[k]) return; const bon=k===2;
        if(T>=r1&&bon){ c.fillStyle='rgba(140,233,154,.22)'; c.beginPath(); c.roundRect(10,y-62,460,124,22); c.fill(); }
        ecrire(c,LET[k],45,y,58,T>=r1&&bon?CRAIE.ok:CRAIE.jaune);
        if(T<r1||T<TSOM[k]) SET[k].forEach((v,j)=>pieceCE1(c,v,140+j*115,y,typeof v==='number'?48:66,{z:zoom(T,TS[k]+j*.1,.4)}));
        else ecrire(c,SOM[k],265,y,50*zoom(T,TSOM[k],.4),bon?CRAIE.ok:CRAIE.faux); });
      tab.maj(); return; }

    if(T<eu){ /* l'ardoise des prix d'Idriss ; mon porte-monnaie */
      quaiBoisE(c,T,140); etalE(c,560,1016,600);
      idrissE(c,860,705,1.3,{montre:T>=tSard&&T<tPile0?1:0,T});
      if(T>=tSur) ardoisePrixE(c,330,300,[['sardines',CRAIE.blanc],[T>=tTrois0?(T>=tVingt0?'3 € 20 c':'3 €'):' ',CRAIE.jaune]],60,{z:zoom(T,tSur,.4)});
      if(T>=tPile0){ porteMonnaieE(c,250,640,190,1); euroE(c,2,420,610,44); euroE(c,1,520,620,40); centimeE(c,20,600,630,66); centimeE(c,10,680,640,60); }
      if(T>=tRendre0) ecrire(c,'pile !',330,140,74*zoom(T,tPile0,.4),CRAIE.ok);
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    ardoisePrixE(c,880,90,[['3 € 20 c',CRAIE.jaune]],46);
    if(T<au){ /* d'abord les euros : 2 € + 1 € ; puis les centimes : 20 c */
      ecrire(c,'euros',290,180,56,CRAIE.r0); ecrire(c,'centimes',700,180,56,'#ffc078');
      if(T>=tDeuxE) euroE(c,2,210,320,66,{z:zoom(T,tDeuxE,.5)});
      if(T>=tUnE) euroE(c,1,370,320,60,{z:zoom(T,tUnE,.5)});
      formuleE(c,T,290,470,['2 €','+','1 €','=','3 €'],[tDeuxE,tUnE-.2,tUnE,tTroisE,tTroisE],66);
      if(T>=tVingtC) centimeE(c,20,700,320,100,{z:zoom(T,tVingtC,.5)});
      if(T>=tVingtC) ecrire(c,'20 c',700,470,66,'#ffc078');
      if(T>=tTroisC) sommeE(c,'3 € et 20 c',528,620,80,{z:zoom(T,tTroisC,.4),coul:CRAIE.ok});
      if(T>=tPileC) for(const [x,y] of [[120,620],[940,620]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
      tab.maj(); return; }
    /* une autre façon : 3 pièces de 1 € et 2 pièces de 10 c */
    ecrire(c,'autre façon',300,150,60,CRAIE.jaune);
    if(T>=tTroisA) for(let k=0;k<3;k++) euroE(c,1,130+k*130,330,56,{z:zoom(T,tTroisA+k*.12,.5)});
    if(T>=tDeuxA) for(let k=0;k<2;k++) centimeE(c,10,640+k*150,330,88,{z:zoom(T,tDeuxA+k*.12,.5)});
    if(T>=tTroisA) ecrire(c,'3 €',260,460,64,CRAIE.r0); if(T>=tDeuxA) ecrire(c,'20 c',715,460,64,'#ffc078');
    if(T>=tPlusieurs) sommeE(c,'plusieurs façons de payer',528,620,62,{z:zoom(T,tPlusieurs,.4),coul:CRAIE.ok});
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Que'); const phrase1=[qa('Que donner ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Quelle'); const phrase2=[qb('Quelle pièce ajouter ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['1 € + 1 € + 20 c',tqa('A'),tqa('centimes',2)],['2 € + 5 c',tqa('B'),tqa('centimes',3)],['2 € + 50 c',tqa('C'),tqa('centimes',4)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('2 € + 50 c',[tDeux1,tDeux1,tCinq1,tCinq1,tCinq1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['1 €',tqb('A'),tqb('euro')],['50 c',tqb('B'),tqb('centimes',2)],['5 c',tqb('C'),tqb('centimes',3)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('50 c + 50 c = 1 €',[tC50,tC50,tPlus2,tC50b,tC50b,tUn2,tUn2,tUn2]),phraseE('3 € + 1 € = 4 €',[tTrois2,tTrois2,tTrois2,tTrois2,tTrois2,tQuatre2,tQuatre2,tQuatre2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,au-.6,'Payer<br>pile !');
  return { clips,FIN,titre:'Payer pile',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,eu,ce,au,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tPileC&&T<au)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
