/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 05 : « Idriss rend la monnaie » (micro ce1_monnaie_rendre), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2/3-dessins.js + idriss-dessins.js (socle CP gardé).
   Voix : manim/voix/idriss-ce1-rendre-paysage.json.
   Une dorade à 6 €, payée avec 10 € : Idriss part du prix et avance jusqu'à 10 (6 + 2 = 8, + 2 = 10), il rend 4 € ; 10 − 6 = 4.
   Questions : un crabe à 7 €, payé 10 € → C (3 €) ; des crevettes à 15 €, payées 20 € → A (5 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-rendre']=function(outils){
  const DUR={'00-accroche':8.85,'01-trop':6.54,'02-complete':9.555,'03-verif':5.435,'04-question':17.03,'04b-reponse':8.48,
    '05-question':17.32,'05b-reponse':7.65,'06-appris':5.075,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-trop':.8,'02-complete':1.2,'03-verif':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,tr,co,ve,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tJach=m0("J'achète"), tDorade=m0('dorade'), tSix=m0('six'), tMais=m0('Mais'), tBillet=m0('billet'), tDix=m0('dix');
  const mt=w=>mot('01-trop',w), tDixT=mt('Dix'), tPlusT=mt('plus'), tSixT=mt('six'), tRendre=mt('rendre'), tMonnaie=mt('monnaie');
  const mco=(w,n=1)=>mot('02-complete',w,n), tPrix=mco('prix'), tAvance=mco('avance'), tDixC=mco('dix'), tSixC=mco('Six'), tPlusC=mco('plus'), tHuitC=mco('huit'),
    tPlusC2=mco('plus',2), tDixC2=mco('dix',2), tRendC=mco('rend'), tQuatreC=mco('quatre');
  const mv=w=>mot('03-verif',w), tDixV=mv('dix'), tMoinsV=mv('moins'), tSixV=mv('six'), tQuatreV=mv('quatre'), tBonV=mv('bon');
  const mq1=w=>mot('04-question',w), tCrabe=mq1('crabe'), tSeptQ=mq1('sept'), tDixQ=mq1('dix'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tSept1=mr1('Sept'), tHuit1=mr1('huit'), tNeuf1=mr1('neuf'), tDix1=mr1('dix'), tTrois1=mr1('trois'), tDix1b=mr1('Dix',2), tMoins1=mr1('moins'), tSept1b=mr1('sept',2), tTrois1b=mr1('trois',2);
  const mq2=w=>mot('05-question',w), tCrev=mq2('crevettes'), tQuinzeQ=mq2('quinze'), tVingtQ=mq2('vingt'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tQuinze2=mr2('quinze'), tVingt2=mr2('vingt'), tManque2=mr2('manque'), tCinq2=mr2('cinq'), tBillet2=mr2('billet'), tCinq2b=mr2('cinq',2);
  const ma=w=>mot('06-appris',w), tRendreA=ma('rendre'), tPrixA=ma('prix'), tAvanceA=ma("j'avance"), tSommeA=ma('somme');
  const finTitre=tJach-.08;

  /* l'étal (accroche) : la dorade, son prix, Idriss ; Ti Margo tend son billet de 10 € */
  function etalAcc(c,T){ quaiBoisE(c,T,140); etalE(c,40,620,540);
    c.fillStyle='#d0ebff'; c.strokeStyle='#74c0fc'; c.lineWidth=4; c.beginPath(); c.roundRect(56,300,548,240,14); c.fill(); c.stroke();
    if(T>=tDorade) poissonE(c,330,440,330,'#ff8787',{T,z:zoom(T,tDorade,.4),ray:'#c92a2a'});
    if(T>=tSix) prixE(c,'6 €',330,235,78,{z:zoom(T,tSix,.5)});
    idrissE(c,712,705,1.3,{montre:T>=tDorade&&T<tMais?1:0,T});
    if(T>=tBillet) euroE(c,10,915,420,40,{z:zoom(T,tBillet,.5)}); }
  /* la scène du calcul : le prix à gauche, le billet à droite, la droite graduée de 6 à 10 au milieu */
  const DX0=180, DDX=170, DY=470;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : je pars du prix, j'avance jusqu'à la somme donnée */
      quaiBoisE(c,T,40);
      prixE(c,'6 €',DX0,200,78,{lueur:T>=tPrixA&&T<tAvanceA?.6:0}); euroE(c,10,DX0+4*DDX,200,40,{lueur:T>=tSommeA?.6:0});
      const X=droiteE(c,DX0,DDX,DY,6,10,{hi:{6:CRAIE.jaune,10:CRAIE.ok},taille:56});
      arcSautE(c,[X(6),DY-18],[X(8),DY-18],entreE(T,tAvanceA,tAvanceA+.5),110,CRAIE.ok); arcSautE(c,[X(8),DY-18],[X(10),DY-18],entreE(T,tAvanceA+.5,tAvanceA+1),110,CRAIE.ok);
      if(T>=tAvanceA){ euroE(c,2,X(7),DY-150,40); euroE(c,2,X(9),DY-150,40); }
      if(T>=tSommeA) formuleE(c,T,528,640,['6','+','4','=','10'],[tSommeA,tSommeA,tSommeA,tSommeA,tSommeA],80,[CRAIE.jaune,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.blanc]);
      tab.maj(); return; }

    if(T>=q2){ /* des crevettes à 15 €, payées avec 20 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tCrev) for(let k=0;k<3;k++) crevetteE(c,75+k*128,205,92,{dir:k%2?1:-1,T,k,z:zoom(T,tCrev+k*.08,.4)});
      if(T>=tQuinzeQ) prixE(c,'15 €',400,105,62,{z:zoom(T,tQuinzeQ,.5)});
      if(T>=tVingtQ) euroE(c,20,370,290,30,{z:zoom(T,tVingtQ,.5)});
      if(T<r2){ if(T>=tComb2) ecrire(c,'?',220,470,120*zoom(T,tComb2,.5),CRAIE.jaune); }
      else { const X=droiteE(c,60,72,470,15,20,{hi:{15:CRAIE.jaune,20:CRAIE.ok},z:zoom(T,tQuinze2,.5),pas:5,taille:48});
        if(T>=tQuinze2) arcSautE(c,[X(15),452],[X(20),452],entreE(T,tVingt2-.2,tManque2+.4),110,CRAIE.ok);
        if(T>=tCinq2) ecrire(c,'+ 5',X(17.5),295,62*zoom(T,tCinq2,.4),CRAIE.ok);
        if(T>=tBillet2) euroE(c,5,240,580,30,{z:zoom(T,tBillet2,.5),lueur:.6});
        if(T>=tCinq2) formuleE(c,T,240,665,['15','+','5','=','20'],[tCinq2,tCinq2,tCinq2,tCinq2,tCinq2],58,[CRAIE.jaune,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.blanc]); }
      tab.maj(); return; }

    if(T>=q1){ /* un crabe à 7 €, payé avec 10 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tCrabe) crabeE(c,140,200,1.2,{z:zoom(T,tCrabe,.4),T});
      if(T>=tSeptQ) prixE(c,'7 €',370,150,66,{z:zoom(T,tSeptQ,.5)});
      if(T>=tDixQ) euroE(c,10,370,290,30,{z:zoom(T,tDixQ,.5)});
      if(T<r1){ if(T>=tComb1) ecrire(c,'?',220,470,120*zoom(T,tComb1,.5),CRAIE.jaune); }
      else { const X=droiteE(c,70,120,460,7,10,{hi:{7:CRAIE.jaune,10:CRAIE.ok},z:zoom(T,tSept1,.5),taille:50});
        const sauts=[tHuit1,tNeuf1,tDix1];
        sauts.forEach((t,k)=>{ if(T>=t-.3){ arcSautE(c,[X(7+k),442],[X(8+k),442],entreE(T,t-.3,t+.1),70,CRAIE.ok); euroE(c,1,(X(7+k)+X(8+k))/2,340,30,{z:zoom(T,t,.4)}); } });
        if(T>=tTrois1) ecrire(c,'3 €',240,600,64*zoom(T,tTrois1,.4),CRAIE.ok);
        if(T>=tDix1b) formuleE(c,T,240,655,['10','−','7','=','3'],[tDix1b,tMoins1,tSept1b,tTrois1b,tTrois1b],62,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]); }
      tab.maj(); return; }

    if(T<tr){ etalAcc(c,T); tab.maj(); return; }

    /* 10 € et 6 € ; la monnaie ; Idriss avance de 6 à 10 ; 10 − 6 = 4 */
    quaiBoisE(c,T,40);
    prixE(c,'6 €',DX0,200,78,{lueur:T>=tSixT&&T<co?.5:0}); euroE(c,10,DX0+4*DDX,200,40,{lueur:T>=tDixT&&T<tSixT?.6:0});
    if(T<co){ if(T>=tPlusT) ecrire(c,'<',(DX0+DX0+4*DDX)/2,200,110*zoom(T,tPlusT,.4),CRAIE.jaune);
      if(T>=tMonnaie){ c.fillStyle='rgba(31,59,44,.88)'; c.beginPath(); c.roundRect(328,560,400,90,18); c.fill(); ecrire(c,'la monnaie',528,606,62*zoom(T,tMonnaie,.4),CRAIE.jaune); } }
    else {
      const X=droiteE(c,DX0,DDX,DY,6,10,{hi:{6:CRAIE.jaune,10:CRAIE.ok},z:zoom(T,co+.1,.5),taille:56});
      if(T>=tSixC) etiquette(c,'6',X(6),DY-90,T,tSixC,CRAIE.jaune,44);
      const s1=entreE(T,tPlusC,tHuitC), s2=entreE(T,tPlusC2,tDixC2);
      arcSautE(c,[X(6),DY-18],[X(8),DY-18],s1,110,CRAIE.ok); arcSautE(c,[X(8),DY-18],[X(10),DY-18],s2,110,CRAIE.ok);
      if(T>=tDeuxCoin(1)) euroE(c,2,X(7),DY-150,40,{z:zoom(T,tDeuxCoin(1),.4)}); if(T>=tDeuxCoin(2)) euroE(c,2,X(9),DY-150,40,{z:zoom(T,tDeuxCoin(2),.4)});
      if(T>=tHuitC) etiquette(c,'8',X(8),DY-90,T,tHuitC,CRAIE.jaune,44);
      if(T>=tQuatreC&&T<ve) ecrire(c,'4 €',528,640,80*zoom(T,tQuatreC,.4),CRAIE.ok);
      if(T>=ve){ formuleE(c,T,528,640,['10','−','6','=','4'],[tDixV,tMoinsV,tSixV,tQuatreV,tQuatreV],80,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
        if(T>=tBonV){ coche(c,830,640,1.2); for(const [x,y] of [[120,110],[960,110]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } } }
    tab.maj();
  }
  function tDeuxCoin(k){ return mot('02-complete','deux',k); }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Un crabe à sept euros.'); qa('Je paie avec dix euros.'); const phrase1=[qa('Combien Idriss me rend-il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Des crevettes à quinze euros.'); qb('Je donne un billet de vingt euros.'); const phrase2=[qb('Combien me rend-on ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['17 €',tqa('A'),tqa('dix-sept')],['7 €',tqa('B'),tqa('sept',2)],['3 €',tqa('C'),tqa('trois')]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('10 − 7 = 3',[tDix1b,tMoins1,tSept1b,tTrois1b,tTrois1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['5 €',tqb('A'),tqb('cinq')],['15 €',tqb('B'),tqb('quinze',2)],['35 €',tqb('C'),tqb('trente-cinq')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('15 + 5 = 20',[tQuinze2,tCinq2,tCinq2,tVingt2,tCinq2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-complete')-.5,'Rendre<br>la monnaie');
  return { clips,FIN,titre:'Rendre la monnaie',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,tr,co,ve,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tBonV&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
