/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 23 : « Le grand défi du marché » (micro ce2_monnaie_defi), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-defi-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE2 5).
   Défi 1 : 5 €, des flotteurs à 1,50 € : 1,50 ; 3 ; 4,50 ; 6 trop ! → 3 flotteurs, reste 0,50 €. Défi 2 : 6,05 € = 605 c.
   Questions : 3,40 € ou 304 c → A (le premier) ; dorade 5,50 € + calamar = 9 € → B (3,50 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce2-defi']=function(outils){
  const DUR={'00-accroche':13.465,'01-ajoute':10.295,'02-reste':5.685,'03-ecritures':9.04,'04-question':19.78,'04b-reponse':11.19,'05-question':22.675,'05b-reponse':12.55,'06-appris':10.245,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-ajoute':.8,'02-reste':1.2,'03-ecritures':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,aj,rs,ec,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tCest=m0("C'est"), tDefi=m0('défi'), tIdriss=m0('Idriss'), tCinq=m0('cinq'), tFlot=m0('flotteur'), tUn=m0('un',2), tComb=m0('Combien');
  const mj=(w,n=1)=>mot('01-ajoute',w,n), tAjoute=mj("J'ajoute"), tUnJ=mj('un'), tTroisJ=mj('trois'), tQuatreJ=mj('quatre'), tEncore=mj('Encore'), tSixJ=mj('Six'), tTrop=mj('trop');
  const ms=(w,n=1)=>mot('02-reste',w,n), tTroisS=ms('trois'), tResteS=ms('reste'), tCinqS=ms('cinquante');
  const me=(w,n=1)=>mot('03-ecritures',w,n), tDeuxieme=me('Deuxième'), tSixE=me('Six'), tSixE2=me('six',2);
  const mq1=(w,n=1)=>mot('04-question',w,n), tPremQ=mq1('premier'), tTroisQ=mq1('trois'), tSecQ=mq1('second'), tTroisQ2=mq1('trois',2), tLequel=mq1('Lequel');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tTrois1=mr1('Trois'), tTrois1b=mr1('trois',2), tTrois1c=mr1('Trois',3), tPlus1=mr1('plus'), tGagne=mr1('gagne');
  const mq2=(w,n=1)=>mot('05-question',w,n), tDoradeQ=mq2('dorade'), tCalQ=mq2('calamar'), tNeufQ=mq2('neuf'), tCinqQ=mq2('cinq'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tDe2=mr2('De'), tSix2=mr2('six'), tCinquante2=mr2('cinquante',2), tDe2b=mr2('De',2), tNeuf2=mr2('neuf'), tTrois2=mr2('trois'), tTrois2b=mr2('trois',2);
  const ma=(w,n=1)=>mot('06-appris',w,n), tDepA=ma('dépasser'), tCentA=ma('centimes'), tEtapeA=ma('étape');
  const finTitre=tCest-.08;

  const FLX=[200,420,640,860], CUM=['1,50 €','3 €','4,50 €','6 €'];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris */
      quaiBoisE(c,T,40);
      plaqueCe2E(c,'sans dépasser',528,170,72,T,tDepA-.3,CRAIE.jaune);
      plaqueCe2E(c,'en centimes pour comparer',528,350,66,T,tCentA,CEN_CE2);
      plaqueCe2E(c,'étape par étape',528,530,72,T,tEtapeA,CRAIE.ok);
      tab.maj(); return; }

    if(T>=q2){ /* défi 3 : dorade + calamar = 9 € ; la dorade 5,50 € (x < 480) */
      quaiBoisE(c,T,40);
      plaqueCe2E(c,'Défi 3',245,60,44,T,q2,CRAIE.jaune);
      if(T>=tDoradeQ) poissonE(c,125,330,230,'#ff8787',{T,ray:'#c92a2a',z:zoom(T,tDoradeQ,.4)});
      if(T>=tCalQ) calamarE(c,360,330,220,{T,z:zoom(T,tCalQ,.4),lueur:T>=r2&&T>=tTrois2b?.5:0});
      if(T>=tNeufQ) prixVCe2E(c,'9 € en tout',255,445,64,{z:zoom(T,tNeufQ,.5),fond:1});
      if(T>=tCinqQ) ardoiseVCe2E(c,'5,50 €',125,180,56,{z:zoom(T,tCinqQ,.5)});
      if(!(T>=r2&&T>=tTrois2b)){ if(T>=tComb2) ardoiseVCe2E(c,'? €',365,180,56,{z:zoom(T,tComb2,.5),une:CRAIE.jaune}); }
      else ardoiseVCe2E(c,'3,50 €',365,180,56,{z:zoom(T,tTrois2b,.5),lueur:.5});
      if(T>=r2){ droitePrixCe2E(c,[[95,'5,50 €'],[235,'6 €'],[455,'9 €']],630,{taille:44,z:zoom(T,tDe2,.4)});
        bondCe2E(c,T,95,235,630,tDe2,tCinquante2,'+ 50 c',60,CEN_CE2,46);
        bondCe2E(c,T,235,455,630,tDe2b,tTrois2,'+ 3 €',80,EUR_CE2,46); }
      tab.maj(); return; }

    if(T>=q1){ /* deux porte-monnaie : 3,40 € ou 304 c (x < 480) */
      quaiBoisE(c,T,40);
      const gagne=T>=r1&&T>=tTrois1c;
      if(gagne){ c.fillStyle='rgba(255,212,59,.25)'; c.beginPath(); c.roundRect(15,70,230,400,26); c.fill(); }
      if(T>=tPremQ){ porteMonnaieE(c,125,380,210,.6); etiquette(c,'1',125,430,T,tPremQ,CRAIE.blanc,50); }
      if(T>=tTroisQ) ardoiseVCe2E(c,'3,40 €',125,150,54,{z:zoom(T,tTroisQ,.5)});
      if(T>=tSecQ){ porteMonnaieE(c,365,380,210,.6); etiquette(c,'2',365,430,T,tSecQ,CRAIE.blanc,50); }
      if(T>=tTroisQ2) ardoiseVCe2E(c,'304 c',365,150,54,{z:zoom(T,tTroisQ2,.5)});
      if(T>=r1){
        if(T>=tTrois1) calculVCe2E(c,T,255,540,['304 c','=','3,04 €'],[tTrois1,mr1('trois'),tTrois1b],58,{vert:false});
        if(T>=tTrois1c) calculVCe2E(c,T,255,640,['3,40 €','>','3,04 €'],[tTrois1c,tPlus1,tPlus1],58,{vert:false});
        if(T>=tGagne) coche(c,60,320,.6); }
      tab.maj(); return; }

    if(T>=ec){ /* défi 2 : 6,05 € = 605 c */
      quaiBoisE(c,T,40); idrissE(c,120,705,1.35,{T});
      plaqueCe2E(c,'Défi 2',528,90,64,T,tDeuxieme,CRAIE.jaune);
      if(T>=tSixE) ardoiseVCe2E(c,'6,05 €',450,360,90,{z:zoom(T,tSixE,.5)});
      if(T>=tSixE2){ ecrire(c,'=',672,360,100,CRAIE.blanc); ardoiseVCe2E(c,'605 c',880,360,90,{z:zoom(T,tSixE2,.5)}); }
      tab.maj(); return; }

    if(T>=rs){ /* 3 flotteurs ; 5 € − 4,50 € = 0,50 € */
      quaiBoisE(c,T,40);
      for(let k=0;k<3;k++) flotteurCe2E(c,[300,528,756][k],330,250,{T,k,lueur:T>=tTroisS?.4:0});
      if(T>=tTroisS) plaqueCe2E(c,'3 flotteurs',528,110,70,T,tTroisS,CRAIE.ok);
      if(T>=tResteS) calculVCe2E(c,T,528,560,['5 €','−','4,50 €','=','0,50 €'],[tResteS,tResteS,tResteS,tCinqS,tCinqS],84);
      tab.maj(); return; }

    if(T>=aj){ /* j'ajoute le prix sans dépasser */
      quaiBoisE(c,T,40);
      euroE(c,5,130,110,38,{grand:1}); ecrire(c,'5 € au plus',420,110,56,CRAIE.blanc);
      const ts=[tUnJ,tTroisJ,tQuatreJ,tSixJ];
      FLX.forEach((x,k)=>{ const t=k<3?ts[k]-.3:tEncore; if(T<t) return;
        const part=k===3&&T>=tTrop?entreE(T,tTrop,tTrop+1.2):0;
        flotteurCe2E(c,x+part*120,360-part*260,240,{T,k,z:zoom(T,t,.4),terne:k===3&&T>=tSixJ?.5:0});
        if(T>=ts[k]) plaqueCe2E(c,CUM[k],x,570,58,T,ts[k],k===3?CRAIE.faux:CRAIE.jaune); });
      if(T>=tTrop){ plaqueCe2E(c,'trop !',850,660,56,T,tTrop,CRAIE.faux); }
      tab.maj(); return; }

    /* défi 1 : Idriss a 5 € ; un flotteur coûte 1,50 € */
    quaiBoisE(c,T,140);
    idrissE(c,140,705,1.45,{salut:T>=tDefi&&T<tIdriss?1:0,T});
    if(T>=tDefi) plaqueCe2E(c,'Défi 1',528,70,64,T,tDefi,CRAIE.jaune);
    if(T>=tCinq) euroE(c,5,440,330,62,{z:zoom(T,tCinq,.5),grand:1});
    if(T>=tFlot) flotteurCe2E(c,720,440,300,{T,z:zoom(T,tFlot,.4)});
    if(T>=tUn) ardoiseVCe2E(c,'1,50 €',720,180,80,{z:zoom(T,tUn,.5)});
    if(T>=tComb) ecrire(c,'?',940,440,170*zoom(T,tComb,.5),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Lequel'); const phrase1=qa('Lequel a le plus ?'); qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=qb('Combien coûte le calamar ?'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:[phraseE('3,40 € ou 304 c ?',[tTroisQ,mq1('euros'),tSecQ,tTroisQ2,mq1('centimes'),mq1('centimes')]),phrase1],pause:pause1,
      choix:[['le premier',tqa('A',2),tqa('premier',2)],['le second',tqa('B'),tqa('second',2)],['les deux pareil',tqa('C'),tqa('pareil')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('304 c = 3,04 €',[tTrois1,mr1('centimes'),mr1('trois'),tTrois1b,mr1('euros')]),phraseE('3,40 € > 3,04 €',[tTrois1c,tTrois1c,tPlus1,tPlus1,tPlus1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('9 € en tout ; la dorade : 5,50 €.',[tNeufQ,mq2('euros'),mq2('en'),mq2('tout'),mq2('tout'),mq2('La'),mq2('dorade',2),tCinqQ,tCinqQ,mq2('euros',2)]),phrase2],pause:pause2,
      choix:[['4,50 €',tqb('A'),tqb('euros',3)],['3,50 €',tqb('B'),tqb('euros',4)],['14,50 €',tqb('C'),tqb('euros',5)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],reponse:[phraseE('+ 50 c + 3 € = 3,50 €',[tCinquante2,tCinquante2,mr2('centimes'),tTrois2,tTrois2,mr2('euros'),tTrois2b,tTrois2b,tTrois2b])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-ajoute')-.3,'Le grand<br>défi');
  return { clips,FIN,titre:'Le grand défi du marché',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,aj,rs,ec,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tTroisS&&T<ec)||(T>=tSixE2&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
