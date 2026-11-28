/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 22 : « La monnaie au centime près » (micro ce2_monnaie_rendre), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-rendre-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE2 4).
   Un poisson à 7,60 € payé avec 10 € : 7,60 → 8 (+ 40 c), 8 → 10 (+ 2 €) : 2,40 € ; vérif 10 − 7,60 = 2,40.
   Questions : 4,20 € payé 5 € → C (0,80 €) ; 12,35 € payé 20 € → C (7,65 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce2-rendre']=function(outils){
  const DUR={'00-accroche':11.18,'01-euro':7.01,'02-billet':8.405,'03-verif':7.28,'04-question':18.69,'04b-reponse':8.705,'05-question':22.335,'05b-reponse':12.265,'06-appris':7.295,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-euro':.8,'02-billet':1.2,'03-verif':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,eu,bi,ve,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tUn=m0('Un'), tMonsieur=m0('monsieur'), tPoisson=m0('poisson'), tSept=m0('sept'), tBillet=m0('billet'), tDix=m0('dix'), tComb=m0('Combien');
  const me=(w,n=1)=>mot('01-euro',w,n), tSuivant=me('suivant'), tDeE=me('de'), tSeptE=me('sept'), tHuitE=me('huit'), tQuarE=me('quarante');
  const mb=(w,n=1)=>mot('02-billet',w,n), tHuitB=mb('huit'), tDixB=mb('dix'), tDeuxB=mb('deux'), tRendB=mb('rend'), tDeuxB2=mb('deux',2), tQuarB=mb('quarante'), tDeuxB3=mb('Deux',3);
  const mv=(w,n=1)=>mot('03-verif',w,n), tDixV=mv('dix'), tMoinsV=mv('moins'), tSeptV=mv('sept'), tDeuxV=mv('deux'), tBonV=mv('bon');
  const mq1=(w,n=1)=>mot('04-question',w,n), tDoradeQ=mq1('dorade'), tQuatreQ=mq1('quatre'), tCinqQ=mq1('cinq'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDe1=mr1('De'), tCinq1=mr1('cinq'), tQV1=mr1('quatre-vingts'), tZero1=mr1('Zéro');
  const mq2=(w,n=1)=>mot('05-question',w,n), tDameQ=mq2('dame'), tDouzeQ=mq2('douze'), tVingtQ=mq2('vingt'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tDe2=mr2('De'), tTreize2=mr2('treize'), tSC2=mr2('soixante-cinq'), tDe2b=mr2('De',2), tVingt2=mr2('vingt'), tSept2=mr2('sept'), tSept2b=mr2('Sept',2);
  const ma=(w,n=1)=>mot('06-appris',w,n), tPrixA=ma('prix'), tSuivA=ma('suivant'), tBilA=ma('billet');
  const finTitre=tUn-.08;

  /* la droite des prix de l'histoire : 7,60 € → 8 € → 10 € */
  const DX=[220,460,900], DY=330;
  const monsieur=(c,T,x,s,tend=0)=>idrissE(c,x,705,s,{cire:'#37b24d',cireB:'#2b8a3e',peau:'#e0ac69',montre:tend,T});

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : petit bond jusqu'à l'euro, grand bond jusqu'au billet */
      quaiBoisE(c,T,40);
      if(T>=tPrixA){ droitePrixCe2E(c,[[DX[0],'le prix'],[DX[1],'l\'euro'],[DX[2],'le billet']],380,{taille:50,z:zoom(T,tPrixA,.4)}); }
      if(T>=tPrixA) bondCe2E(c,T,DX[0],DX[1],380,tSuivA-.4,tSuivA,'petit bond',70,CEN_CE2,46);
      if(T>=tBilA-.4) bondCe2E(c,T,DX[1],DX[2],380,tBilA-.4,tBilA,'grand bond',120,EUR_CE2,46);
      tab.maj(); return; }

    if(T>=q2){ /* 12,35 € payé avec 20 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tDameQ&&T<r2) dameE(c,110,705,.95,{T});
      if(T>=tDouzeQ) ardoiseVCe2E(c,'12,35 €',300,110,56,{z:zoom(T,tDouzeQ,.5)});
      if(T>=tVingtQ) euroE(c,20,330,250,32,{z:zoom(T,tVingtQ,.5),grand:1});
      if(T<r2){ if(T>=tComb2) ecrire(c,'?',330,420,120*zoom(T,tComb2,.5),CRAIE.jaune); }
      else {
        droitePrixCe2E(c,[[90,'12,35 €'],[230,'13 €'],[440,'20 €']],520,{taille:34,z:zoom(T,tDe2,.4)});
        bondCe2E(c,T,90,230,520,tDe2,tSC2,'+ 65 c',50,CEN_CE2,38);
        bondCe2E(c,T,230,440,520,tDe2b,tSept2,'+ 7 €',90,EUR_CE2,38);
        if(T>=tSept2b) ardoiseVCe2E(c,'7,65 €',330,660,56,{z:zoom(T,tSept2b,.5),lueur:.5}); }
      tab.maj(); return; }

    if(T>=q1){ /* une dorade à 4,20 € payée avec 5 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tDoradeQ) poissonE(c,150,300,230,'#ff8787',{T,ray:'#c92a2a',z:zoom(T,tDoradeQ,.4)});
      if(T>=tQuatreQ) ardoiseVCe2E(c,'4,20 €',150,140,60,{z:zoom(T,tQuatreQ,.5)});
      if(T>=tCinqQ) euroE(c,5,370,190,30,{z:zoom(T,tCinqQ,.5),grand:1});
      if(T<r1){ if(T>=tComb1) ecrire(c,'?',370,350,120*zoom(T,tComb1,.5),CRAIE.jaune); }
      else {
        droitePrixCe2E(c,[[90,'4,20 €'],[390,'5 €']],520,{taille:44,z:zoom(T,tDe1,.4)});
        bondCe2E(c,T,90,390,520,tDe1,tQV1,'+ 80 c',70,CEN_CE2,46);
        if(T>=tZero1) ardoiseVCe2E(c,'0,80 €',240,665,62,{z:zoom(T,tZero1,.5),lueur:.5}); }
      tab.maj(); return; }

    if(T>=ve){ /* je vérifie : 10 − 7,60 = 2,40 */
      quaiBoisE(c,T,40);
      droitePrixCe2E(c,[[DX[0],'7,60 €'],[DX[1],'8 €'],[DX[2],'10 €']],DY+150,{taille:44});
      bondCe2E(c,T,DX[0],DX[1],DY+150,-1,-1,'+ 40 c',60,CEN_CE2,44); bondCe2E(c,T,DX[1],DX[2],DY+150,-1,-1,'+ 2 €',100,EUR_CE2,44);
      calculVCe2E(c,T,528,110,['10 €','−','7,60 €','=','2,40 €'],[tDixV,tMoinsV,tSeptV,tDeuxV,tDeuxV],84);
      if(T>=tBonV) coche(c,940,100,.6);
      tab.maj(); return; }

    if(T>=eu){ /* de 7,60 € à 8 € (+ 40 c), puis de 8 € à 10 € (+ 2 €) */
      quaiBoisE(c,T,40);
      droitePrixCe2E(c,[[DX[0],'7,60 €'],[DX[1],'8 €'],[DX[2],'10 €']],DY,{taille:48,z:zoom(T,eu,.4)});
      bondCe2E(c,T,DX[0],DX[1],DY,tSeptE,tQuarE,'+ 40 c',70,CEN_CE2,50);
      if(T>=tQuarE){ centimeE(c,20,DX[0]+70,520,50,{z:zoom(T,tQuarE,.4)}); centimeE(c,20,DX[0]+170,520,50,{z:zoom(T,tQuarE+.15,.4)}); }
      if(T>=bi){ bondCe2E(c,T,DX[1],DX[2],DY,tHuitB,tDeuxB,'+ 2 €',120,EUR_CE2,50);
        if(T>=tDeuxB) euroE(c,2,680,520,52,{z:zoom(T,tDeuxB,.4)});
        if(T>=tRendB) prixVCe2E(c,'2 € et 40 c',528,640,60,{z:zoom(T,tRendB,.5),fond:1});
        if(T>=tDeuxB3) prixVCe2E(c,'= 2,40 €',880,640,64,{z:zoom(T,tDeuxB3,.5),une:CRAIE.ok}); }
      tab.maj(); return; }

    /* le marché : un monsieur achète un poisson à 7,60 €, il paie avec 10 € */
    quaiBoisE(c,T,140); etalE(c,180,640,560,{toile:false});
    idrissE(c,110,705,1.1,{T});
    if(T>=tPoisson) poissonE(c,400,500,260,'#74c0fc',{T,z:zoom(T,tPoisson,.4)});
    if(T>=tSept) ardoiseVCe2E(c,'7,60 €',400,280,78,{z:zoom(T,tSept,.5)});
    if(T>=tMonsieur) monsieur(c,T,860,1.1,0);
    if(T>=tBillet){ const p=sautE([860,330],[680,330],entreE(T,tDix,tDix+.6),50); euroE(c,10,p[0],p[1],34,{z:zoom(T,tBillet,.5),grand:1}); }
    if(T>=tComb) ecrire(c,'?',560,130,120*zoom(T,tComb,.5),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=qa('Combien rend-on ?'); qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=qb('Combien lui rend-on ?'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('4,20 €, payé avec 5 €.',[tQuatreQ,mq1('euros'),mq1('payée'),mq1('avec'),tCinqQ,mq1('euros',2)]),phrase1],pause:pause1,
      choix:[['1,20 €',tqa('A',2),tqa('euro')],['9,20 €',tqa('B'),tqa('euros',3)],['0,80 €',tqa('C'),tqa('euro',2)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('4,20 € → 5 € : + 80 c',[tDe1,tDe1,tDe1,tCinq1,tCinq1,tCinq1,tQV1,tQV1,tQV1]),phraseE('0,80 €',[tZero1,mr1('euro')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:[phraseE('12,35 €, payé avec 20 €.',[tDouzeQ,mq2('euros'),mq2('paie'),mq2('avec'),tVingtQ,mq2('euros',2)]),phrase2],pause:pause2,
      choix:[['8,35 €',tqb('A'),tqb('euros',3)],['7,75 €',tqb('B'),tqb('euros',4)],['7,65 €',tqb('C'),tqb('euros',5)]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],reponse:[phraseE('+ 65 c + 7 € = 7,65 €',[tSC2,tSC2,mr2('centimes'),tSept2,tSept2,mr2('euros'),tSept2b,tSept2b,tSept2b]),],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-billet')-.3,'Rendre<br>au centime');
  return { clips,FIN,titre:'La monnaie au centime près',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,eu,bi,ve,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tDeuxB3&&T<ve)||(T>=tBonV&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
