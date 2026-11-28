/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 14 : « Les deux tirelires » (micro ce1_monnaie_comparer_ensembles), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-comparer-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 3).
   Elle : 4 × 50 c = 200 c = 2 € ; lui : 2 € et 10 c ; 2 € et 10 c > 2 € : je calcule chaque tas, puis je compare.
   Questions : rouge (5 € + 20 c) ou bleu (5 × 1 € + 50 c) → C (le bleu) ; Idriss (2 × 1 €) ou la dame (1 € + 2 × 50 c) → B (pareil).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-comparer']=function(outils){
  const DUR={'00-accroche':9.725,'01-fille':10.31,'02-garcon':6.72,'03-compare':10.7,'04-question':22.45,'04b-reponse':13.87,
    '05-question':18.895,'05b-reponse':10.17,'06-appris':8.865,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-fille':1,'02-garcon':1,'03-compare':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,fi,ga,co,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w), tDeux0=m0('Deux'), tTirelire=m0('tirelire'), tPoisson=m0('poisson'), tQui=m0('Qui');
  const mf=(w,n=1)=>mot('01-fille',w,n), tQuatre=mf('quatre'), tF50=mf('cinquante',2), tF100=mf('cent'), tF150=mf('cent',2), tF200=mf('cents'), tFDeux=mf('deux',2), tFEuros=mf('euros');
  const mg=(w,n=1)=>mot('02-garcon',w,n), tGDeux=mg('deux'), tGDix=mg('dix'), tGDeux2=mg('deux',2);
  const mco=(w,n=1)=>mot('03-compare',w,n), tPlusQue=mco('plus'), tLui=mco('lui'), tDixC=mco('dix',2), tCalcule=mco('calcule');
  const mq1=(w,n=1)=>mot('04-question',w,n), tRouge=mq1('rouge'), tCinqQ=mq1('cinq'), tVingtQ=mq1('vingt'), tBleu=mq1('bleu'), tCinqQ2=mq1('cinq',2), tCinquanteQ=mq1('cinquante'), tLequel=mq1('Lequel');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tRougeR=mr1('rouge'), tVingtR=mr1('vingt'), tBleuR=mr1('bleu'), tCinquanteR=mr1('cinquante'), tPareils=mr1('pareils'), tCentR=mr1('centimes',3), tGagne=mr1('gagne');
  const mq2=(w,n=1)=>mot('05-question',w,n), tIdQ=mq2('Idriss'), tDameQ=mq2('dame'), tCinqQ3=mq2('cinquante'), tQuiQ=mq2('Qui');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tCinq2=mr2('cinquante'), tUn2=mr2('un'), tDame2=mr2('dame'), tDeux2=mr2('deux',2), tPareil2=mr2('pareil');
  const ma=w=>mot('06-appris',w), tCalcA=ma('calcule'), tEurosA=ma('euros'), tCentA=ma('centimes');
  const finTitre=tDeux0-.08;

  const XF=[70,190,310,430];
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : je calcule chaque tas ; d'abord les euros ; puis les centimes */
      quaiBoisE(c,T,40);
      if(T>=tCalcA){ sommeE(c,'2 €',280,180,70,{coul:CRAIE.r0}); sommeE(c,'2 € et 10 c',760,180,70,{coul:CRAIE.r0}); }
      if(T>=tEurosA) ecrire(c,'1. les euros',528,370,86*zoom(T,tEurosA,.4),CRAIE.r0);
      if(T>=tCentA) ecrire(c,'2. les centimes',528,520,86*zoom(T,tCentA,.4),'#ffc078');
      tab.maj(); return; }

    if(T>=q2){ /* Idriss : 2 × 1 € ; la dame : 1 € + 2 × 50 c (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tIdQ){ ecrire(c,'Idriss',240,90,50,CRAIE.jaune); euroE(c,1,170,190,56,{lueur:T>=r2&&T>=tDeux2&&T<tPareil2?.5:0}); euroE(c,1,310,190,56,{lueur:T>=r2&&T>=tDeux2&&T<tPareil2?.5:0}); }
      if(T>=tDameQ){ ecrire(c,'la dame',240,305,50,'#faa2c1'); euroE(c,1,110,400,54,{z:zoom(T,tDameQ,.4)});
        centimeE(c,50,245,400,80,{z:zoom(T,tCinqQ3,.4),lueur:T>=r2&&T>=tCinq2&&T<tUn2+.8?.6:0}); centimeE(c,50,385,400,80,{z:zoom(T,tCinqQ3+.12,.4),lueur:T>=r2&&T>=tCinq2&&T<tUn2+.8?.6:0}); }
      if(T<r2){ if(T>=tQuiQ) ecrire(c,'?',240,580,120*zoom(T,tQuiQ,.5),CRAIE.jaune); }
      else { formuleE(c,T,240,530,['50 c','+','50 c','=','1 €'],[tCinq2,tCinq2,tCinq2,tUn2,tUn2],48,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
        if(T>=tDeux2) formuleE(c,T,240,640,['2 €','=','2 €'],[tDeux2,tPareil2,tPareil2],80,[CRAIE.jaune,CRAIE.blanc,'#faa2c1']); }
      tab.maj(); return; }

    if(T>=q1){ /* le porte-monnaie rouge et le bleu (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r1){
        if(T>=tRouge) porteMonnaieCoulE(c,85,250,140,{coul:'#e03131',bord:'#862e1c'});
        if(T>=tCinqQ) euroE(c,5,260,190,38,{z:zoom(T,tCinqQ,.5),grand:1});
        if(T>=tVingtQ) centimeE(c,20,415,190,72,{z:zoom(T,tVingtQ,.5)});
        if(T>=tBleu) porteMonnaieCoulE(c,85,500,140,{coul:'#1c7ed6',bord:'#0b3d6b'});
        if(T>=tCinqQ2) for(let k=0;k<5;k++) euroE(c,1,180+k*62,380,32,{z:zoom(T,tCinqQ2+k*.08,.4)});
        if(T>=tCinquanteQ) centimeE(c,50,300,470,70,{z:zoom(T,tCinquanteQ,.5)});
        if(T>=tLequel) ecrire(c,'?',420,600,110*zoom(T,tLequel,.5),CRAIE.jaune); }
      else { /* rouge : 5 € et 20 c ; bleu : 5 € et 50 c ; les euros pareils → je compare les centimes */
        porteMonnaieCoulE(c,60,210,90,{coul:'#e03131',bord:'#862e1c'}); porteMonnaieCoulE(c,60,390,90,{coul:'#1c7ed6',bord:'#0b3d6b',lueur:T>=tGagne?.7:0});
        if(T>=tRougeR){ ecrire(c,'5 €',170,180,58,CRAIE.blanc); ecrire(c,'et 20 c',355,180,58*zoom(T,tVingtR,.4),'#ffc078'); }
        if(T>=tBleuR){ ecrire(c,'5 €',170,360,58,CRAIE.blanc); ecrire(c,'et 50 c',355,360,58*zoom(T,tCinquanteR,.4),'#ffc078'); }
        if(T>=tPareils){ const u=entreE(T,tPareils-.2,tPareils+.4); c.strokeStyle=CRAIE.faux; c.lineWidth=7;
          for(const y of [180,360]){ c.beginPath(); c.moveTo(125,y); c.lineTo(125+95*u,y); c.stroke(); } }
        if(T>=tCentR) formuleE(c,T,240,520,['50 c','>','20 c'],[tCentR,tCentR+.2,tCentR+.4],78,[CRAIE.ok,CRAIE.blanc,'#ffc078']);
        if(T>=tGagne) ecrire(c,'le bleu gagne !',240,640,58*zoom(T,tGagne,.4),'#74c0fc'); }
      tab.maj(); return; }

    if(T<fi){ /* deux enfants vident leur tirelire devant l'étal d'Idriss */
      quaiBoisE(c,T,140); etalE(c,560,1016,600);
      idrissE(c,860,705,1.3,{montre:T>=tPoisson&&T<tQui?1:0,T});
      if(T>=tPoisson) poissonE(c,700,520,170,'#ff8787',{T,z:zoom(T,tPoisson,.4),ray:'#c92a2a'});
      if(T>=tDeux0){ enfantE(c,120,705,1.1,{k:1,T}); enfantE(c,400,705,1.1,{k:0,T}); }
      if(T>=tTirelire){ tirelireE(c,210,600,.7,1,T,1); tirelireE(c,500,600,.7,1,T,1); }
      if(T>=tQui) ecrire(c,'?',330,170,150*zoom(T,tQui,.5),CRAIE.jaune);
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=4; c.setLineDash([14,12]); c.beginPath(); c.moveTo(560,120); c.lineTo(560,420); c.stroke(); c.setLineDash([]);
    ecrire(c,'elle',270,110,54,'#faa2c1'); if(T>=ga) ecrire(c,'lui',790,110,54,'#74c0fc');
    /* elle : 4 × 50 c = 200 c = 2 € */
    const tsF=[tF50,tF100,tF150,tF200];
    XF.forEach((x,k)=>{ if(T>=tQuatre+k*.1) centimeE(c,50,x+40,260,62,{z:zoom(T,tQuatre+k*.1,.4),lueur:T>=tsF[k]&&T<tFDeux?.6:0});
      if(T>=tsF[k]&&T<co) ecrire(c,String(50*(k+1)),x+40,360,46*zoom(T,tsF[k],.4),k===3?CRAIE.ok:CRAIE.jaune); });
    if(T>=tFDeux&&T<co) formuleE(c,T,270,460,['200 c','=','2 €'],[tFDeux,tFEuros,tFEuros],66);
    /* lui : 2 € et 10 c */
    if(T>=ga){ euroE(c,2,700,260,62,{z:zoom(T,tGDeux,.5),lueur:T>=co&&T>=tLui?.5:0}); if(T>=tGDix) centimeE(c,10,880,260,84,{z:zoom(T,tGDix,.5),lueur:T>=co&&T>=tDixC&&T<tCalcule?.7:0}); }
    if(T>=tGDeux2&&T<co) sommeE(c,'2 € et 10 c',790,460,62,{z:zoom(T,tGDeux2,.4),coul:CRAIE.ok});
    if(T>=co){ sommeE(c,'2 €',270,400,62,{coul:'#faa2c1'}); sommeE(c,'2 € et 10 c',790,400,62,{coul:'#74c0fc'});
      formuleE(c,T,528,560,['2 € et 10 c','>','2 €'],[co,tPlusQue,tPlusQue+.4],76,['#74c0fc',CRAIE.blanc,'#faa2c1']);
      if(T>=tDixC) ecrire(c,'+ 10 c',880,160,54*zoom(T,tDixC,.4),CRAIE.ok);
      if(T>=tCalcule) ecrire(c,'je calcule, puis je compare',528,670,46*zoom(T,tCalcule,.4),CRAIE.jaune); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Lequel'); const phrase1=[qa('Lequel a le plus ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Qui'); const phrase2=[qb('Qui a le plus ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['Le rouge',tqa('A'),tqa('rouge',2)],['Les deux pareil',tqa('B'),tqa('pareil')],['Le bleu',tqa('C'),tqa('bleu',2)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('5 € et 50 c > 5 € et 20 c',[tBleuR,tBleuR,tBleuR,tCinquanteR,tCinquanteR,tCentR,tCentR,tCentR,tCentR,tCentR,tCentR])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['Idriss',tqb('A'),tqb('Idriss',2)],['Les deux pareil',tqb('B'),tqb('pareil')],['La dame',tqb('C'),tqb('dame',2)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('50 c + 50 c = 1 €',[tCinq2,tCinq2,tCinq2,tCinq2,tCinq2,tUn2,tUn2,tUn2]),phraseE('2 € = 2 €',[tDeux2,tDeux2,tPareil2,tPareil2,tPareil2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,co+2,'Qui a<br>le plus ?');
  return { clips,FIN,titre:'Les deux tirelires',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,fi,ga,co,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tCalcule&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
