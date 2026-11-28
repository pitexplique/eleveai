/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 18 : « Les défis du soir » (micro ce1_monnaie_defi), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-defi-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 7).
   Défi 1 : 2,50 € ou 250 centimes ? Les deux (2 € = 200 c ; 200 c + 50 c = 250 c). Défi 2 : 5 €, glaces à 2 € → 2 glaces, il reste 1 €.
   Astuce : j'ajoute le prix sans dépasser. Questions : 38 € avec le moins de billets et pièces → B (5) ;
   sardines à 3 € avec 20 € → C (6).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-defi']=function(outils){
  const DUR={'00-accroche':15.135,'01-centimes':9.135,'02-plus':13.62,'03-astuce':6.62,'04-question':17.205,'04b-reponse':14.22,
    '05-question':15.695,'05b-reponse':10.88,'06-appris':10.42,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-centimes':1,'02-plus':1,'03-astuce':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ce,pl,as,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:54px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tCe=m0('Ce'), tDefis=m0('défis'), tPremier=m0('Premier'), tAmie=m0('amie'), tDeux0=m0('deux'), tVirg0=m0('virgule'),
    tCinqu0=m0('cinquante'), tAutre=m0('L\'autre'), tDeux0b=m0('deux',2), tCent0=m0('cent'), tCent0c=m0('centimes'), tQui=m0('Qui');
  const mc=(w,n=1)=>mot('01-centimes',w,n), tDeuxC=mc('Deux'), tDeuxC2=mc('deux',2), tPlusC=mc('Plus'), tCinquC=mc('cinquante'), tDeuxC3=mc('deux',3), tLes=mc('Les');
  const mp=(w,n=1)=>mot('02-plus',w,n), tDeuxieme=mp('Deuxième'), tCinqP=mp('cinq'), tGlace=mp('glace'), tDeuxP=mp('deux'), tCombienP=mp('Combien'),
    tDeuxP2=mp('Deux',2), tQuatreP=mp('quatre'), tSixP=mp('six'), tTrop=mp('trop'), tDeuxP3=mp('Deux',3), tResteP=mp('reste'), tUnP=mp('un');
  const ms=(w,n=1)=>mot('03-astuce',w,n), tPour=ms('Pour'), tJajoute=ms('j\'ajoute'), tEncore=ms('encore'), tEncore2=ms('encore',2), tSans=ms('sans');
  const mq1=(w,n=1)=>mot('04-question',w,n), tDonner=mq1('donner'), tTrenteHuitQ=mq1('trente-huit'), tBillets=mq1('billets'), tPieces=mq1('pièces'), tPossible=mq1('possible');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tVingt1=mr1('Vingt'), tTrente1=mr1('trente'), tT35=mr1('trente-cinq'), tT37=mr1('trente-sept'), tT38=mr1('trente-huit'),
    tVingt1b=mr1('vingt',2), tDix1=mr1('dix'), tCinq1=mr1('cinq'), tDeux1=mr1('deux'), tUn1d=mr1('un',4), tCinq1b=mr1('Cinq',2);
  const mq2=(w,n=1)=>mot('05-question',w,n), tSardine=mq2('sardine'), tTroisQ=mq2('trois'), tVingtQ=mq2('vingt'), tCombienQ=mq2('combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tTrois2=mr2('Trois'), tSix2=mr2('six'), tNeuf2=mr2('neuf'), tDouze2=mr2('douze'), tQuinze2=mr2('quinze'),
    tDixHuit2=mr2('dix-huit'), tSix2b=mr2('six',2), tUne2=mr2('Une'), tVingt2=mr2('vingt'), tTrop2=mr2('trop');
  const ma=w=>mot('06-appris',w), tCentA=ma('centimes'), tJajouteA=ma('J\'ajoute'), tCommence=ma('commence');
  const finTitre=tCe-.08;

  /* le soir sur le quai : ciel sombre, lampe allumée */
  function soir(c,T,yMer=140){ quaiBoisE(c,T,yMer); c.fillStyle='rgba(16,24,64,.42)'; c.fillRect(0,0,1056,720); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : 2,50 € = 250 c ; sans dépasser ; le plus gros d'abord */
      quaiBoisE(c,T,40);
      if(T>=tCentA) sommeE(c,'2,50 € = 250 c',528,190,66,{z:zoom(T,tCentA,.4),coul:'#ffc078'});
      if(T>=tJajouteA) sommeE(c,'j\'ajoute le prix, sans dépasser',528,350,56,{z:zoom(T,tJajouteA,.4),coul:CRAIE.ok});
      if(T>=tCommence){ sommeE(c,'le plus gros d\'abord',600,520,60,{z:zoom(T,tCommence,.4),coul:'#74c0fc'}); euroE(c,50,170,520,30,{grand:1,z:zoom(T,tCommence,.5)}); }
      tab.maj(); return; }

    if(T>=q2){ /* une sardine à 3 € ; avec 20 €, combien au plus ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r2){
        if(T>=tSardine) poissonE(c,140,180,200,'#74c0fc',{T,z:zoom(T,tSardine,.4)});
        if(T>=tTroisQ) prixE(c,'3 € l\'une',360,180,48,{z:zoom(T,tTroisQ,.5)});
        if(T>=tVingtQ){ euroE(c,20,240,370,40,{grand:1,z:zoom(T,tVingtQ,.5)}); ecrire(c,'Idriss a 20 €',240,480,52,CRAIE.blanc); }
        if(T>=tCombienQ) sommeE(c,'combien, au plus ?',240,610,50,{z:zoom(T,tCombienQ,.4)});
        tab.maj(); return; }
      /* 3, 6, 9, 12, 15, 18 : six sardines ; 21 : trop ! */
      const TS=[tTrois2,tSix2,tNeuf2,tDouze2,tQuinze2,tDixHuit2], N=['3','6','9','12','15','18'];
      for(let k=0;k<6;k++){ if(T<TS[k]) continue; const x=90+(k%3)*150, y=120+Math.floor(k/3)*170;
        poissonE(c,x,y,140,'#74c0fc',{T,k,z:zoom(T,TS[k],.4)}); ecrire(c,N[k],x,y+72,60*zoom(T,TS[k],.4),CRAIE.jaune); }
      if(T>=tSix2b) sommeE(c,'6 sardines',240,470,56,{z:zoom(T,tSix2b,.4),coul:CRAIE.ok});
      if(T>=tUne2){ c.globalAlpha=.45; poissonE(c,110,600,110,'#adb5bd',{T}); c.globalAlpha=1;
        if(T>=tVingt2) ecrire(c,T>=tTrop2?'21 € : trop !':'21 €',300,600,52*zoom(T,tVingt2,.4),CRAIE.faux); }
      tab.maj(); return; }

    if(T>=q1){ /* donner 38 € avec le moins de billets et de pièces (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r1){
        if(T>=tTrenteHuitQ) sommeE(c,'à donner : 38 €',240,100,54,{z:zoom(T,tTrenteHuitQ,.4)});
        if(T>=tBillets){ euroE(c,20,120,250,36,{grand:1,z:zoom(T,tBillets,.5)}); euroE(c,10,345,250,36,{grand:1,z:zoom(T,tBillets+.12,.5)});
          euroE(c,5,120,400,36,{grand:1,z:zoom(T,tBillets+.24,.5)}); }
        if(T>=tPieces){ euroE(c,2,290,400,46,{z:zoom(T,tPieces,.5)}); euroE(c,1,410,400,44,{z:zoom(T,tPieces+.12,.5)}); }
        if(T>=tPossible) ecrire(c,'le moins possible ?',240,560,50*zoom(T,tPossible,.4),CRAIE.jaune);
        tab.maj(); return; }
      /* ils se posent un à un : 20, 30, 35, 37, 38 */
      const IT=[[20,90,150],[10,250,150],[5,400,150],[2,150,320],[1,330,320]], TT=[tVingt1,tTrente1,tT35,tT37,tT38], N=['20','30','35','37','38'];
      IT.forEach(([v,x,y],k)=>{ if(T<TT[k]) return; const z=zoom(T,TT[k],.5);
        if(v>2) euroE(c,v,x,y,32,{grand:1,z}); else euroE(c,v,x,y,v===2?48:46,{z});
        ecrire(c,N[k],x,y+(v>2?86:88),58*z,k===4?CRAIE.ok:CRAIE.jaune); });
      if(T>=tVingt1b) formuleE(c,T,240,520,['20','+','10','+','5','+','2','+','1','=','38'],[tVingt1b,tDix1,tDix1,tCinq1,tCinq1,tDeux1,tDeux1,tUn1d,tUn1d,tCinq1b,tCinq1b],38);
      if(T>=tCinq1b) sommeE(c,'5 en tout !',240,640,54,{z:zoom(T,tCinq1b,.4),coul:CRAIE.ok});
      tab.maj(); return; }

    if(T<ce){ /* le soir : Idriss lance le défi 1 ; deux amies, 2,50 € ou 250 centimes ? */
      soir(c,T); lampeE(c,700,0,1,{T});
      idrissE(c,900,705,1.25,{montre:T>=tDefis&&T<tAmie?1:0,T});
      if(T>=tPremier) sommeE(c,'Défi 1',900,110,58,{z:zoom(T,tPremier,.4)});
      if(T>=tAmie){ dameE(c,150,712,1.25,{T,robe:'#e64980'}); if(T>=tDeux0) prixVirguleE(c,'2',T>=tCinqu0?'50':'',150,220,96,{z:zoom(T,tDeux0,.5),suf:T>=tCinqu0?' €':'',lueurV:T>=tVirg0?.7+.3*Math.sin(T*6):0}); }
      if(T>=tAutre){ dameE(c,580,712,1.25,{T,robe:'#4dabf7'}); if(T>=tDeux0b) sommeE(c,T>=tCent0c?'250 centimes':(T>=tCent0?'250':'2'),580,220,56,{z:zoom(T,tDeux0b,.4),coul:'#ffc078'}); }
      if(T>=tQui) sommeE(c,'qui a raison ?',330,80,60,{z:zoom(T,tQui,.4)});
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    if(T<pl){ /* 2 € = 200 c ; 200 c + 50 c = 250 c ; les deux ont raison */
      formuleE(c,T,528,150,['2 €','=','200 c'],[tDeuxC,tDeuxC2,tDeuxC2],84,[CRAIE.r0,CRAIE.blanc,'#ffc078']);
      if(T>=tPlusC) formuleE(c,T,528,320,['200 c','+','50 c','=','250 c'],[tPlusC,tPlusC,tCinquC,tDeuxC3,tDeuxC3],76,['#ffc078',CRAIE.blanc,'#ffc078',CRAIE.blanc,CRAIE.ok]);
      if(T>=tLes){ sommeE(c,'2,50 € = 250 c',528,490,70,{z:zoom(T,tLes,.4),coul:CRAIE.ok}); ecrire(c,'les deux ont raison !',528,630,62*zoom(T,tLes,.4),CRAIE.jaune); }
      tab.maj(); return; }
    if(T<as){ /* défi 2 : 5 €, une glace à 2 € : 2, 4… 6, trop ! */
      sommeE(c,'Défi 2',528,80,54,{z:zoom(T,tDeuxieme,.4)});
      if(T>=tCinqP){ euroE(c,5,170,240,44,{grand:1,z:zoom(T,tCinqP,.5)}); ecrire(c,'j\'ai 5 €',170,340,52,CRAIE.blanc); }
      if(T>=tGlace){ cornetE(c,420,360,1.4,{z:zoom(T,tGlace,.4)}); if(T>=tDeuxP) prixE(c,'2 €',540,160,60,{z:zoom(T,tDeuxP,.5)}); }
      if(T>=tCombienP&&T<tDeuxP2) ecrire(c,'combien, au plus ?',780,260,52*zoom(T,tCombienP,.4),CRAIE.jaune);
      const TG=[tDeuxP2,tQuatreP,tSixP], N=['2','4','6'];
      for(let k=0;k<3;k++){ if(T<TG[k]) continue; const x=650+k*150, trop=k===2;
        if(trop) c.globalAlpha=.5; cornetE(c,x,420,1.15,{z:zoom(T,TG[k],.4),coul:['#ffa8a8','#ffe066','#b2f2bb'][k]}); c.globalAlpha=1;
        ecrire(c,N[k],x,485,64*zoom(T,TG[k],.4),trop?CRAIE.faux:CRAIE.jaune);
        if(trop&&T>=tTrop){ c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.beginPath(); c.moveTo(x-60,220); c.lineTo(x+60,410); c.moveTo(x+60,220); c.lineTo(x-60,410); c.stroke();
          ecrire(c,'trop !',x,180,56,CRAIE.faux); } }
      if(T>=tDeuxP3) sommeE(c,T>=tResteP?'2 glaces, il reste 1 €':'2 glaces',528,600,58,{z:zoom(T,tDeuxP3,.4),coul:CRAIE.ok});
      tab.maj(); return; }
    /* l'astuce : j'ajoute le prix, encore et encore, sans dépasser */
    if(T>=tPour) ecrire(c,'le plus possible ?',528,110,60*zoom(T,tPour,.4),CRAIE.jaune);
    if(T>=tJajoute) sommeE(c,'j\'ajoute le prix…',528,260,66,{z:zoom(T,tJajoute,.4)});
    for(const [k,t0] of [[0,tEncore],[1,tEncore2]]) if(T>=t0) ecrire(c,'+ 2',360+k*160,390,60*zoom(T,t0,.4),CRAIE.ok);
    if(T>=tEncore2) ecrire(c,'…',680,390,60,CRAIE.ok);
    if(T>=tSans) sommeE(c,'… sans dépasser',528,540,66,{z:zoom(T,tSans,.4),coul:CRAIE.ok});
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien lui en faut-il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('combien'); const phrase2=[qb('combien de sardines peut-on acheter, au plus ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['3',tqa('A'),tqa('trois')],['5',tqa('B'),tqa('cinq')],['8',tqa('C'),tqa('huit')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],
      reponse:[phraseE('20 + 10 + 5 + 2 + 1 = 38',[tVingt1b,tDix1,tDix1,tCinq1,tCinq1,tDeux1,tDeux1,tUn1d,tUn1d,tCinq1b,tCinq1b]),phraseE('5 en tout',[tCinq1b,tCinq1b,tCinq1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['7',tqb('A'),tqb('sept')],['3',tqb('B'),tqb('trois',2)],['6',tqb('C'),tqb('six')]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],
      reponse:[phraseE('3, 6, 9, 12, 15, 18',[tTrois2,tSix2,tNeuf2,tDouze2,tQuinze2,tDixHuit2]),phraseE('6 sardines',[tSix2b,tSix2b])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,ce-.6,'Les défis<br>du soir');
  return { clips,FIN,titre:'Les défis du soir',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,ce,pl,as,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tLes&&T<pl)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
