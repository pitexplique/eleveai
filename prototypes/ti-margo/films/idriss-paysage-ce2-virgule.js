/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 19 : « L'ardoise des prix » (micro ce2_monnaie_ecriture_virgule), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-virgule-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE2 1).
   3 € et 45 c = 3,45 € (euros devant la virgule en bleu, centimes derrière en orange) ; 345 c = 3,45 € ; 7 € et 6 c = 7,06 € (deux chiffres).
   Questions : 520 c → A (5,20 €) ; 2 € et 5 c écrit 2,5 € → B (2,05 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce2-virgule']=function(outils){
  const DUR={'00-accroche':10.4,'01-ecrire':9.31,'02-centimes':8.77,'03-zero':8.705,'04-question':15.88,'04b-reponse':9.25,'05-question':20.515,'05b-reponse':12.24,'06-appris':9.79,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-ecrire':1.2,'02-centimes':1.2,'03-zero':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ec,ce,ze,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tCe=m0('Ce'), tIdriss=m0('Idriss'), tArdoise=m0("l'ardoise"), tHesite=m0('hésite'), tTrois=m0('trois'), tQC=m0('quarante-cinq');
  const me=(w,n=1)=>mot('01-ecrire',w,n), tEurE=me('euros'), tVirgE=me('virgule'), tTroisE=me('trois'), tCentE=me('centimes'), tQCE=me('quarante-cinq'), tTroisE2=me('Trois',2), tVirgE2=me('virgule',2), tEurE2=me('euros',2);
  const mc=(w,n=1)=>mot('02-centimes',w,n), tTroisC=mc('Trois'), tPareil=mc('pareil'), tCentC=mc('Cent'), tEuroC=mc('euro'), tAlors=mc('alors'), tTroisC2=mc('trois',2), tEurosC=mc('euros');
  const mz=(w,n=1)=>mot('03-zero',w,n), tAtt=mz('Attention'), tDeuxZ=mz('deux'), tSeptZ=mz('Sept'), tSixZ=mz('six'), tSeptZ2=mz('sept',2), tZeroZ=mz('zéro'), tSixZ2=mz('six',2);
  const mq1=(w,n=1)=>mot('04-question',w,n), tCinqQ=mq1('cinq'), tCentimesQ=mq1('centimes'), tEurosQ=mq1('euros');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tCinq1=mr1('Cinq'), tCinq1b=mr1('cinq',2), tReste1=mr1('reste'), tVingt1=mr1('vingt'), tCinq1c=mr1('Cinq',3), tEuros1=mr1('euros',2);
  const mq2=(w,n=1)=>mot('05-question',w,n), tVoulait=mq2('voulait'), tDeuxQ=mq2('deux'), tCinqQ2=mq2('cinq'), tEcrit=mq2('écrit'), tDeuxQ2=mq2('deux',2), tCinqQ2b=mq2('cinq',2), tCorriger=mq2('corriger');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tCinq2=mr2('Cinq'), tZero2=mr2('zéro'), tCinq2b=mr2('cinq',2), tDeux2=mr2('Deux'), tEuros2=mr2('euros'), tA2=mr2('A'), tCinquante2=mr2('cinquante');
  const ma=(w,n=1)=>mot('06-appris',w,n), tEurA=ma('euros'), tDerA=ma('Derrière'), tCentA=ma('centimes'), tDeuxA=ma('deux'), tCentA2=ma('cent'), tEuroA=ma('euro');
  const finTitre=tCe-.08;

  /* la grande ardoise des prix (cadre de bois) : (x0, y0, w, h) */
  function grandeArdoise(c,x0,y0,w,h,lueur=0){
    if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.roundRect(x0-24,y0-24,w+48,h+48,26); c.fill(); }
    c.fillStyle='#212529'; c.strokeStyle='#8a5a2b'; c.lineWidth=14; c.beginPath(); c.roundRect(x0,y0,w,h,16); c.fill(); c.stroke(); }
  /* 3 , 45 € écrits morceau par morceau (positions fixes, taille 150) */
  function troisQC(c,T,x,y,ts,taille=150){ const [t3,tv,t45,te]=ts, d=taille/150;
    if(T>=t3) ecrire(c,'3',x-120*d,y,taille*zoom(T,t3,.5),EUR_CE2);
    if(T>=tv) ecrire(c,',',x-58*d,y+8*d,taille*1.1*zoom(T,tv,.5),CRAIE.blanc);
    if(T>=t45) ecrire(c,'45',x+45*d,y,taille*zoom(T,t45,.5),CEN_CE2);
    if(T>=te) ecrire(c,'€',x+190*d,y,taille*zoom(T,te,.5),CRAIE.blanc); }
  const idriss=(c,T,montre,x=140,s=1.15)=>{ idrissE(c,x,705,s,{montre,T}); if(montre){ const [hx,hy]=mainIdrissCe2E(x,705,s); craieCe2E(c,hx+12,hy-8,50); } };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris */
      quaiBoisE(c,T,40);
      if(T>=tEurA){ ecrire(c,'euros',420,250,90*zoom(T,tEurA,.4),EUR_CE2); ecrire(c,',',582,262,130*zoom(T,ap+.3,.4),CRAIE.blanc); }
      if(T>=tCentA) ecrire(c,'centimes',800,250,90*zoom(T,tCentA,.4),CEN_CE2);
      if(T>=tDeuxA){ ardoiseVCe2E(c,'7,06 €',640,430,110,{z:zoom(T,tDeuxA,.5)}); }
      if(T>=tCentA2) prixVCe2E(c,'100 c = 1 €',640,630,96,{z:zoom(T,tCentA2,.5),fond:1});
      tab.maj(); return; }

    if(T>=q2){ /* 2 € et 5 c, écrit « 2,5 € » ; corriger (x < 480) */
      quaiBoisE(c,T,40);
      const efface=T>=r2&&T>=tDeux2;
      idriss(c,T,0,95,.92);
      grandeArdoise(c,170,60,300,200,efface?.5:0);
      ecrire(c,'sardines',320,110,46,CRAIE.blanc);
      if(!efface){ if(T>=tEcrit) prixVCe2E(c,'2,5 €',320,195,84,{z:zoom(T,tEcrit,.5)}); }
      else prixVCe2E(c,'2,05 €',320,195,84,{z:zoom(T,tDeux2,.5)});
      if(T>=tVoulait&&!(T>=r2)) bulleE(c,300,350,270,96,160,400,'2 € et 5 c',52,zoom(T,tVoulait,.5));
      for(let k=0;k<3;k++) poissonE(c,240+k*85,650,110,'#a5d8ff',{T,k,ray:'#495057'});
      if(T<r2){ if(T>=tCorriger) ecrire(c,'?',510,350,120*zoom(T,tCorriger,.5),CRAIE.jaune); }
      else {
        if(T>=tCinq2) prixVCe2E(c,'5 c',250,350,70,{z:zoom(T,tCinq2,.5),fond:1});
        if(T>=tZero2){ ecrire(c,'→',350,350,64,CRAIE.blanc); prixVCe2E(c,',0',435,350,80,{z:zoom(T,tZero2,.5),une:CEN_CE2}); }
        if(T>=tCinq2b) ecrire(c,'5',488,350,80*zoom(T,tCinq2b,.5),CEN_CE2);
        if(T>=tZero2) cercle(c,444,352,40,CRAIE.jaune,entreE(T,tZero2,tZero2+.4));
        if(T>=tA2) prixVCe2E(c,'A : 2,50 €',370,470,56,{z:zoom(T,tA2,.5),fond:1});
        if(T>=tCinquante2) prixVCe2E(c,'= 2 € et 50 c',370,545,52,{z:zoom(T,tCinquante2,.5),fond:1}); }
      tab.maj(); return; }

    if(T>=q1){ /* 520 c en euros (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tCinqQ) prixVCe2E(c,'520 c',240,140,110,{z:zoom(T,tCinqQ,.5),fond:1});
      if(T>=tEurosQ) prixVCe2E(c,'= ? €',240,270,96,{z:zoom(T,tEurosQ,.5),une:CRAIE.jaune});
      if(T<r1){ const pc=['50c','20c','50c','10c','20c','50c','5c'];
        if(T>=tCentimesQ) pc.forEach((n,k)=>centimeCe2(c,n,90+(k%4)*125,460+Math.floor(k/4)*125,T,tCentimesQ+k*.08)); }
      else {
        calculVCe2E(c,T,240,400,['500 c','=','5 €'],[tCinq1,tCinq1b,tCinq1b],62,{vert:false});
        if(T>=tReste1) prixVCe2E(c,'+ 20 c',240,500,62,{z:zoom(T,tVingt1,.5)});
        if(T>=tCinq1c) ardoiseVCe2E(c,'5,20 €',240,630,84,{z:zoom(T,tCinq1c,.5),lueur:.5}); }
      tab.maj(); return; }

    if(T>=ze){ /* toujours deux chiffres après la virgule : 7,06 € */
      quaiBoisE(c,T,40); idriss(c,T,0);
      if(T>=tDeuxZ){ ecrire(c,',',520,190,170*zoom(T,tDeuxZ,.4),CRAIE.blanc);
        for(const [k,x] of [[0,610],[1,715]]){ const u=zoom(T,tDeuxZ+k*.25,.4); if(u<=0) continue; c.strokeStyle=CEN_CE2; c.lineWidth=6; c.setLineDash([12,10]);
          c.strokeRect(x-44*u,150-60*u,88*u,120*u); c.setLineDash([]); }
        ecrire(c,'2 chiffres',935,150,62*zoom(T,tDeuxZ+.4,.4),CEN_CE2); }
      if(T>=tSeptZ) prixVCe2E(c,'7 € et 6 c',760,390,90,{z:zoom(T,tSeptZ,.5),fond:1});
      if(T>=tSeptZ2){ const xs=prixVCe2E(c,'= 7,06 €',760,570,130,{z:zoom(T,tSeptZ2,.5)});
        if(T>=tZeroZ&&xs[4]) cercle(c,xs[4],572,62,CRAIE.jaune,entreE(T,tZeroZ,tZeroZ+.4)); }
      tab.maj(); return; }

    if(T>=ce){ /* 345 c = 3,45 € ; 100 c = 1 € ; 300 c = 3 € */
      quaiBoisE(c,T,40); idriss(c,T,0);
      if(T>=tTroisC) prixVCe2E(c,'345 c',480,140,100,{z:zoom(T,tTroisC,.5),fond:1});
      if(T>=tPareil) prixVCe2E(c,'= 3,45 €',920,140,100,{z:zoom(T,tPareil,.5)});
      if(T>=tCentC) prixVCe2E(c,'100 c = 1 €',700,350,96,{z:zoom(T,tCentC,.5),fond:1});
      if(T>=tTroisC2) prixVCe2E(c,'300 c = 3 €',700,540,96,{z:zoom(T,tTroisC2,.5),fond:1,lueur:T>=tEurosC?.4:0});
      tab.maj(); return; }

    /* le matin : Idriss, la craie à la main, devant sa grande ardoise des prix */
    quaiBoisE(c,T,140);
    const ecrit=T>=ec;
    idriss(c,T,T>=tIdriss?1:0);
    grandeArdoise(c,430,120,600,330,ecrit&&T>=tEurE2?.5:0);
    if(T>=tHesite&&!ecrit) ecrire(c,'?',730,285,150*zoom(T,tHesite,.5),CRAIE.jaune);
    if(T>=tTrois&&!ecrit) bulleE(c,610,560,330,110,280,330,'3 € et 45 c',60,zoom(T,tTrois,.5));
    if(ecrit){
      if(T>=tEurE) ecrire(c,'euros',610,175,50*zoom(T,tEurE,.4),EUR_CE2);
      if(T>=tCentE) ecrire(c,'centimes',820,175,50*zoom(T,tCentE,.4),CEN_CE2);
      troisQC(c,T,730,320,[tTroisE,tVirgE,tQCE,tEurE2]);
      if(T>=tVirgE) cercle(c,672,330,52,CRAIE.jaune,entreE(T,tVirgE,tVirgE+.4)*(T<tTroisE2?1:0)); }
    tab.maj();
  }
  function centimeCe2(c,n,x,y,T,t0){ if(T<t0) return; argentCe2E(c,n,x,y,60,{z:zoom(T,t0,.4)}); }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Comment'); const phrase2b=qb('Comment corriger ?'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:[phraseE('Comment écrire 520 c en euros ?',[mq1('Comment'),mq1('écrire'),tCinqQ,tCentimesQ,mq1('en'),tEurosQ,tEurosQ])],pause:pause1,
      choix:[['5,20 €',tqa('A'),tqa('euros',2)],['52 €',tqa('B'),tqa('euros',3)],['0,52 €',tqa('C'),tqa('euro',1)]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('500 c = 5 €',[tCinq1,mr1('cents'),tCinq1b,tCinq1b,mr1('euros')]),phraseE('5,20 €',[tCinq1c,tEuros1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('Il voulait 2 € et 5 c.',[mq2('Idriss'),tVoulait,tDeuxQ,mq2('et'),tCinqQ2]),phraseE('Il a écrit 2,5 €.',[mq2('Il'),mq2('a'),tEcrit,tDeuxQ2]),phrase2b],pause:pause2,
      choix:[['2,50 €',tqb('A',2),tqb('euros',2)],['2,05 €',tqb('B'),tqb('euros',3)],['25 €',tqb('C'),tqb('euros',4)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],reponse:[phraseE('5 c → 05',[tCinq2,mr2('centimes'),tZero2,tCinq2b]),phraseE('2,05 €',[tDeux2,tEuros2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-ecrire')-.5,'Le prix<br>à virgule');
  return { clips,FIN,titre:"L'ardoise des prix",ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,ec,ce,ze,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tTroisE2&&T<ce)||(T>=tSeptZ2&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
