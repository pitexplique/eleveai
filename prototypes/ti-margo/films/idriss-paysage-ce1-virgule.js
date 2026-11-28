/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 16 : « La petite virgule » (micro ce1_monnaie_virgule), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-virgule-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 5).
   4,50 € : devant la virgule les euros (bleu), derrière les centimes (orange) ; toujours deux chiffres : 3,05 € ;
   on dit « quatre euros cinquante ». Questions : 2 € et 30 c → B (2,30 €) ; 6,08 € → A (8 c).
   ⭐ La virgule est GROSSE et blanche. Pendant les questions, tout reste à x < 480 ; la carte est à droite.
   ============================================================ */
FILMS['ce1-virgule']=function(outils){
  const DUR={'00-accroche':8.035,'01-virgule':12.4,'02-deux':9.62,'03-dire':5.915,'04-question':15.38,'04b-reponse':10.24,
    '05-question':17.975,'05b-reponse':11.31,'06-appris':7.18,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-virgule':1.2,'02-deux':1.2,'03-dire':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,vi,de,di,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w), tSur=m0('Sur'), tPrix=m0('prix'), tVirg0=m0('virgule'), tMais=m0('Mais');
  const mv=(w,n=1)=>mot('01-virgule',w,n), tDevant=mv('Devant'), tEurosV=mv('euros'), tQuatreV=mv('quatre'), tDerr=mv('Derrière'), tCentV=mv('centimes'), tCinqV=mv('cinquante'), tQuatre2=mv('Quatre',2), tQuatre3=mv('quatre',3);
  const md=(w,n=1)=>mot('02-deux',w,n), tDeuxD=md('deux'), tTroisD=md('Trois'), tTrois2=md('trois',2), tZeroD=md('zéro');
  const mdi=w=>mot('03-dire',w), tSouvent=mdi('souvent'), tEcrit=mdi("l'écrit");
  const mq1=w=>mot('04-question',w), tDeuxQ=mq1('deux'), tTrenteQ=mq1('trente');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tDeux1=mr1('Deux'), tVirg1=mr1('Virgule'), tTrente1=mr1('Trente'), tDeux1b=mr1('Deux',2);
  const mq2=w=>mot('05-question',w), tArdQ=mq2("l'ardoise"), tSixQ=mq2('six'), tCombQ=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tDerr2=mr2('Derrière'), tZero2=mr2('zéro'), tHuit2=mr2('Huit',2), tSix2=mr2('Six'), tZeroC=mr2('zéro',2);
  const ma=w=>mot('06-appris',w), tEurosA=ma('euros'), tCentA=ma('centimes'), tDeuxA=ma('deux');
  const finTitre=tSur-.08;
  const BLEU='#74c0fc', ORANGE='#ffc078';

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : euros , centimes (toujours deux chiffres) */
      quaiBoisE(c,T,40);
      const P=prixVirguleE(c,'4','50',528,280,190);
      if(T>=tEurosA) ecrire(c,'euros',P.cE-40,460,72,BLEU);
      if(T>=tCentA) ecrire(c,'centimes',P.cC+30,460,72,ORANGE);
      if(T>=tDeuxA) ecrire(c,'toujours 2 chiffres',528,610,66*zoom(T,tDeuxA,.4),CRAIE.jaune);
      tab.maj(); return; }

    if(T>=q2){ /* l'ardoise : crevettes 6,08 € ; combien de centimes ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tArdQ) ardoisePrixE(c,240,220,[['crevettes',CRAIE.blanc],[' ',CRAIE.blanc]],66,{z:zoom(T,tArdQ,.4)});
      let P=null; if(T>=tSixQ) P=prixVirguleE(c,'6','08',240,262,86,{z:zoom(T,tSixQ,.4)});
      if(T<r2){ if(T>=tCombQ) ecrire(c,'… c ?',240,480,90*zoom(T,tCombQ,.5),CRAIE.jaune); }
      else if(P){ entoureE(c,P.cC,262,P.wC,76,entreE(T,tDerr2,tZero2+.4));
        if(T>=tHuit2) ecrire(c,'8 c',240,430,90*zoom(T,tHuit2,.4),CRAIE.ok);
        if(T>=tSix2) ecrire(c,'6,08 € = 6 € et 8 c',240,550,46*zoom(T,tSix2,.4),CRAIE.blanc);
        if(T>=tZeroC) sommeE(c,'le zéro compte !',240,650,50,{z:zoom(T,tZeroC,.4),coul:CRAIE.jaune}); }
      tab.maj(); return; }

    if(T>=q1){ /* 2 € et 30 c : comment l'écrire ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tDeuxQ) euroE(c,2,110,190,56,{z:zoom(T,tDeuxQ,.5)});
      if(T>=tTrenteQ){ centimeE(c,20,260,190,76,{z:zoom(T,tTrenteQ,.5)}); centimeE(c,10,380,190,70,{z:zoom(T,tTrenteQ+.1,.5)}); }
      if(T>=tDeuxQ) ecrire(c,T>=tTrenteQ?'2 € et 30 c':'2 €',240,330,64,CRAIE.blanc);
      if(T<r1){ if(T>=tTrenteQ+.6) ecrire(c,'= ?',240,450,90,CRAIE.jaune); }
      else { if(T>=tDeux1){ const P=prixVirguleE(c,T>=tDeux1?'2':'',T>=tTrente1?'30':'  ',240,470,120,{lueurV:T>=tVirg1&&T<tTrente1?.7:0});
          ecrire(c,'euros',P.cE-30,580,50,BLEU); if(T>=tTrente1) ecrire(c,'centimes',P.cC+40,580,50,ORANGE); }
        if(T>=tDeux1b) ecrire(c,'2,30 €',240,660,56*zoom(T,tDeux1b,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T<vi){ /* l'ardoise d'Idriss : dorade 4,50 € ; la virgule clignote */
      quaiBoisE(c,T,140); etalE(c,560,1016,600);
      idrissE(c,860,705,1.3,{montre:T>=tSur&&T<tVirg0?1:0,T});
      if(T>=tSur){ ardoisePrixE(c,320,350,[['dorade',CRAIE.blanc],[' ',CRAIE.blanc]],90,{z:zoom(T,tSur,.4)});
        if(T>=tPrix) prixVirguleE(c,'4','50',320,402,96,{z:zoom(T,tPrix,.4),tons:[CRAIE.blanc,CRAIE.blanc],lueurV:T>=tVirg0?.5+.5*Math.sin(T*7):0}); }
      if(T>=tMais) ecrire(c,'?',600,180,150*zoom(T,tMais,.5),CRAIE.jaune);
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    if(T<de){ /* 4 devant la virgule (euros), 50 derrière (centimes) */
      const P=prixVirguleE(c,'4','50',528,230,180,{tons:[T>=tDevant?BLEU:CRAIE.blanc,T>=tDerr?ORANGE:CRAIE.blanc],lueurV:T<tDevant+.8?.6:0});
      if(T>=tEurosV) ecrire(c,'euros',P.cE-30,395,72*zoom(T,tEurosV,.4),BLEU);
      if(T>=tCentV) ecrire(c,'centimes',P.cC+20,395,72*zoom(T,tCentV,.4),ORANGE);
      if(T>=tQuatre2) formuleE(c,T,528,580,['4,50 €','=','4 € et 50 c'],[tQuatre2,tQuatre3,tQuatre3],70,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }
    if(T<di){ /* toujours deux chiffres derrière la virgule : 3 € et 5 c = 3,05 € */
      if(T>=de+.2) sommeE(c,'derrière la virgule : 2 chiffres',528,110,54,{z:zoom(T,de+.2,.4),coul:CRAIE.jaune});
      if(T>=tTroisD) ecrire(c,'3 € et 5 c',528,250,80*zoom(T,tTroisD,.4),CRAIE.blanc);
      if(T>=tTrois2){ ecrire(c,'=',528,350,80,CRAIE.blanc); const P=prixVirguleE(c,'3','05',528,470,150,{z:zoom(T,tTrois2,.4)});
        if(T>=tZeroD) entoureE(c,P.cC,470,P.wC,120,entreE(T,tZeroD,tZeroD+.6)); }
      tab.maj(); return; }
    /* on dit souvent : « quatre euros cinquante » */
    prixVirguleE(c,'4','50',360,420,170);
    if(T>=tSouvent) bulleE(c,640,160,680,170,420,320,'« quatre euros cinquante »',54,zoom(T,tSouvent,.4));
    if(T>=tEcrit) ecrire(c,'on l’écrit avec la virgule',528,640,52*zoom(T,tEcrit,.4),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); const phrase1=[qa('Comment écrire deux euros et trente centimes ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de centimes après les euros ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['23 €',tqa('A'),tqa('euros',2)],['2,30 €',tqa('B'),tqa('euros',3)],['2,3 c',tqa('C'),tqa('centimes',2)]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],reponse:[phraseE('2,30 €',[tDeux1b,tDeux1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['8 c',tqb('A'),tqb('centimes',2)],['80 c',tqb('B'),tqb('centimes',3)],['6 c',tqb('C'),tqb('centimes',4)]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('6,08 € = 6 € et 8 c',[tSix2,tSix2,tSix2,tSix2,tSix2,tSix2,tHuit2+1,tHuit2+1])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,de-.6,'La petite<br>virgule');
  return { clips,FIN,titre:'La petite virgule',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,vi,de,di,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<vi) T>=tMais?g.reflechit():g.montre();
      else if(T<q1) g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
