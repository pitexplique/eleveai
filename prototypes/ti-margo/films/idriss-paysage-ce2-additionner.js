/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 21 : « Le panier de la dame » (micro ce2_monnaie_additionner), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-additionner-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE2 3).
   6,40 € + 3,30 € : les euros avec les euros (6 + 3 = 9), les centimes avec les centimes (40 + 30 = 70) → 9,70 € ;
   60 c + 50 c = 110 c = 1 € et 10 c (un euro de plus). Questions : 2,50 € + 4,20 € → C (6,70 €) ; 1,80 € + 0,50 € → B (2,30 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce2-additionner']=function(outils){
  const DUR={'00-accroche':11.42,'01-separes':10.475,'02-total':3.41,'03-retenue':11.225,'04-question':20.4,'04b-reponse':11.185,'05-question':20.015,'05b-reponse':18.8,'06-appris':8.945,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-separes':.8,'02-total':1.2,'03-retenue':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,se,to,re,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tUne=m0('Une'), tDame=m0('dame'), tPanier=m0('panier'), tIdriss=m0('Idriss'), tDorade=m0('dorade'), tSix=m0('six'), tCrev=m0('crevettes'), tTrois=m0('trois'), tComb=m0('Combien');
  const ms=(w,n=1)=>mot('01-separes',w,n), tEurS=ms('euros'), tSixS=ms('six'), tPlusS=ms('plus'), tTroisS=ms('trois'), tNeufS=ms('neuf'), tCentS=ms('centimes'), tQuarS=ms('quarante'), tPlusS2=ms('plus',2), tTrenteS=ms('trente'), tSDS=ms('soixante-dix');
  const mt=(w,n=1)=>mot('02-total',w,n), tEnT=mt('En'), tToutT=mt('tout'), tNeufT=mt('neuf');
  const mre=(w,n=1)=>mot('03-retenue',w,n), tAtt=mre('Attention'), tDep=mre('dépassent'), tUnR=mre('un'), tSoixR=mre('Soixante'), tPlusR=mre('plus',2), tCinqR=mre('cinquante'), tCentR=mre('cent',2), tUnR2=mre('un',2), tDixR2=mre('dix',2);
  const mq1=(w,n=1)=>mot('04-question',w,n), tCalQ=mq1('calamar'), tDeuxQ=mq1('deux'), tPoisQ=mq1('poisson'), tQuatreQ=mq1('quatre'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDeux1=mr1('Deux'), tPlus1=mr1('plus'), tQuatre1=mr1('quatre'), tSix1=mr1('six'), tCinq1=mr1('Cinquante'), tPlus1b=mr1('plus',2), tVingt1=mr1('vingt'), tSD1=mr1('soixante-dix'), tSix1b=mr1('Six',2);
  const mq2=(w,n=1)=>mot('05-question',w,n), tSardQ=mq2('sardines'), tUnQ=mq2('un'), tCitQ=mq2('citron'), tZeroQ=mq2('zéro'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tCentimes2=mr2('centimes'), tQV2=mr2('quatre-vingts'), tPlus2=mr2('plus'), tCinq2=mr2('cinquante'), tCent2=mr2('cent'), tTrente2=mr2('trente'),
    tUn2=mr2('un'), tEuros2=mr2('euros'), tUn2b=mr2('un',2), tPlus2b=mr2('plus',2), tCet2=mr2('cet'), tDeux2=mr2('deux'), tDeux2b=mr2('Deux',2), tA2=mr2('A'), tInterdit=mr2('interdit');
  const ma=(w,n=1)=>mot('06-appris',w,n), tEurA=ma('euros'), tCentA=ma('centimes'), tCentA2=ma('cent');
  const finTitre=tUne-.08;

  const dorade=(c,T,x,y,L,z=1)=>poissonE(c,x,y,L,'#ff8787',{T,z,ray:'#c92a2a'});
  const crevettes=(c,T,x,y,L,z=1)=>{ if(z<=0) return; for(let k=0;k<3;k++) crevetteE(c,x-L*.7+k*L*.7,y+(k%2)*18,L,{T,k,z,dir:k%2?-1:1}); };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris */
      quaiBoisE(c,T,40);
      if(T>=tEurA) plaqueCe2E(c,'euros + euros',528,170,70,T,tEurA,EUR_CE2);
      if(T>=tCentA) plaqueCe2E(c,'centimes + centimes',528,340,70,T,tCentA,CEN_CE2);
      if(T>=tCentA2) prixVCe2E(c,'100 c = 1 € de plus',528,520,76,{z:zoom(T,tCentA2,.5),fond:1});
      tab.maj(); return; }

    if(T>=q2){ /* sardines 1,80 € + citron 0,50 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tSardQ) for(let k=0;k<3;k++) poissonE(c,125,275+k*42,180,'#a5d8ff',{T,k,ray:'#495057',z:zoom(T,tSardQ+k*.1,.4)});
      if(T>=tUnQ) ardoiseVCe2E(c,'1,80 €',118,120,54,{z:zoom(T,tUnQ,.5)});
      if(T>=tCitQ) citronCe2E(c,362,310,72,{z:zoom(T,tCitQ,.4)});
      if(T>=tZeroQ) ardoiseVCe2E(c,'0,50 €',365,120,54,{z:zoom(T,tZeroQ,.5)});
      if(T<r2){ if(T>=tComb2) ecrire(c,'?',245,520,130*zoom(T,tComb2,.5),CRAIE.jaune); }
      else {
        calculVCe2E(c,T,240,450,['80 c','+','50 c','=','130 c'],[tQV2,tPlus2,tCinq2,tCent2,tTrente2],48,{vert:false});
        if(T>=tUn2) prixVCe2E(c,'= 1 € et 30 c',270,515,52,{z:zoom(T,tUn2,.5),fond:1});
        if(T>=tUn2b) calculVCe2E(c,T,240,590,['1 €','+','1 €','=','2 €'],[tUn2b,tPlus2b,tCet2,tDeux2,tDeux2],56);
        if(T>=tDeux2b) ardoiseVCe2E(c,'2,30 €',240,675,62,{z:zoom(T,tDeux2b,.5),lueur:T<tA2?.5:0});
        if(T>=tA2){ c.fillStyle='rgba(31,59,44,.95)'; c.beginPath(); c.roundRect(30,190,420,200,22); c.fill(); c.strokeStyle=CRAIE.faux; c.lineWidth=4; c.stroke();
          const xs=prixVCe2E(c,'A : 1,130 €',240,238,58,{z:zoom(T,tA2,.5)});
          if(T>=tA2+.6&&xs.length>9) barreCe2E(c,[xs[6]-14,240],[xs[8]+14,240],entreE(T,tA2+.6,tA2+1));
          ecrire(c,'3 chiffres après',240,302,42,CRAIE.blanc); ecrire(c,'la virgule ? Non !',240,354,42,CRAIE.faux); } }
      tab.maj(); return; }

    if(T>=q1){ /* calamar 2,50 € + poisson 4,20 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tCalQ) calamarE(c,118,300,215,{T,z:zoom(T,tCalQ,.4)});
      if(T>=tDeuxQ) ardoiseVCe2E(c,'2,50 €',118,130,54,{z:zoom(T,tDeuxQ,.5)});
      if(T>=tPoisQ) poissonE(c,362,300,230,'#ffa94d',{T,k:2,z:zoom(T,tPoisQ,.4)});
      if(T>=tQuatreQ) ardoiseVCe2E(c,'4,20 €',365,130,54,{z:zoom(T,tQuatreQ,.5)});
      if(T<r1){ if(T>=tComb1) ecrire(c,'?',245,520,130*zoom(T,tComb1,.5),CRAIE.jaune); }
      else {
        formuleE(c,T,245,440,['2','+','4','=','6'],[tDeux1,tPlus1,tQuatre1,tSix1,tSix1],76,[EUR_CE2,CRAIE.blanc,EUR_CE2,CRAIE.blanc,CRAIE.ok]);
        formuleE(c,T,245,545,['50','+','20','=','70'],[tCinq1,tPlus1b,tVingt1,tSD1,tSD1],76,[CEN_CE2,CRAIE.blanc,CEN_CE2,CRAIE.blanc,CRAIE.ok]);
        if(T>=tSix1b) ardoiseVCe2E(c,'6,70 €',245,660,70,{z:zoom(T,tSix1b,.5),lueur:.5}); }
      tab.maj(); return; }

    if(T>=re){ /* 100 c et plus : un euro de plus */
      quaiBoisE(c,T,40);
      if(T>=tDep) prixVCe2E(c,'100 c = 1 €',528,80,66,{z:zoom(T,tDep,.5),fond:1});
      calculVCe2E(c,T,528,210,['60 c','+','50 c','=','110 c'],[tSoixR,tPlusR,tCinqR,tCentR,tCentR],76,{vert:false});
      /* les deux côtés : euros | centimes */
      c.strokeStyle='rgba(248,249,250,.5)'; c.lineWidth=4; c.setLineDash([14,10]); c.beginPath(); c.moveTo(528,320); c.lineTo(528,700); c.stroke(); c.setLineDash([]);
      ecrire(c,'euros',260,350,54,EUR_CE2); ecrire(c,'centimes',800,350,54,CEN_CE2);
      if(T>=tSoixR&&T<tUnR2){ centimeE(c,50,680,500,52); centimeE(c,10,780,500,52); if(T>=tCinqR) centimeE(c,50,910,500,52,{z:zoom(T,tCinqR,.4)});
        prixVCe2E(c,'60 c',730,590,48); if(T>=tCinqR) prixVCe2E(c,'50 c',910,590,48); }
      if(T>=tUnR2){ const p=sautE([800,520],[260,520],entreE(T,tUnR2,tUnR2+.8),120); euroE(c,1,p[0],p[1],58,{lueur:.6});
        if(T>=tUnR2+.8) prixVCe2E(c,'1 €',260,620,62,{z:zoom(T,tUnR2+.8,.4)}); }
      if(T>=tDixR2){ centimeE(c,10,800,520,60,{z:zoom(T,tDixR2,.4)}); prixVCe2E(c,'10 c',800,620,62,{z:zoom(T,tDixR2,.4)}); }
      tab.maj(); return; }

    if(T>=se){ /* les euros avec les euros, les centimes avec les centimes, puis 9,70 € */
      quaiBoisE(c,T,40);
      prixVCe2E(c,'6,40 €',528,110,96,{fond:1}); prixVCe2E(c,'3,30 €',528,230,96,{fond:1}); ecrire(c,'+',330,230,96,CRAIE.blanc);
      if(T>=tEurS) ecrire(c,'euros',260,340,54,EUR_CE2);
      formuleE(c,T,260,440,['6','+','3','=','9'],[tSixS,tPlusS,tTroisS,tNeufS,tNeufS],80,[EUR_CE2,CRAIE.blanc,EUR_CE2,CRAIE.blanc,CRAIE.ok]);
      if(T>=tCentS) ecrire(c,'centimes',790,340,54,CEN_CE2);
      formuleE(c,T,790,440,['40','+','30','=','70'],[tQuarS,tPlusS2,tTrenteS,tSDS,tSDS],80,[CEN_CE2,CRAIE.blanc,CEN_CE2,CRAIE.blanc,CRAIE.ok]);
      if(T>=to) calculVCe2E(c,T,528,600,['6,40 €','+','3,30 €','=','9,70 €'],[tEnT,tEnT,tEnT,tToutT,tNeufT],72);
      tab.maj(); return; }

    /* le marché : la dame remplit son panier chez Idriss */
    quaiBoisE(c,T,140); etalE(c,200,680,560,{toile:false});
    if(T>=tIdriss) idrissE(c,110,705,1.1,{montre:T>=tDorade&&T<tComb?1:0,T});
    if(T>=tDorade) dorade(c,T,350,500,230,zoom(T,tDorade,.4));
    if(T>=tSix) ardoiseVCe2E(c,'6,40 €',320,290,64,{z:zoom(T,tSix,.5)});
    if(T>=tCrev) crevettes(c,T,580,500,90,zoom(T,tCrev,.4));
    if(T>=tTrois) ardoiseVCe2E(c,'3,30 €',620,290,64,{z:zoom(T,tTrois,.5)});
    if(T>=tDame){ dameE(c,880,705,1.15,{tend:0,T}); }
    if(T>=tPanier) panierE(c,800,690,150);
    if(T>=tComb) ecrire(c,'?',470,130,120*zoom(T,tComb,.5),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=qa('Combien en tout ?'); qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=qb('Combien en tout ?'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('2,50 € + 4,20 €',[tDeuxQ,mq1('euros'),mq1('et'),tQuatreQ,mq1('euros',2)]),phrase1],pause:pause1,
      choix:[['6,07 €',tqa('A',3),tqa('euros',3)],['67 €',tqa('B'),tqa('euros',4)],['6,70 €',tqa('C'),tqa('euros',5)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('6,70 €',[tSix1b,mr1('euros',2)])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('1,80 € + 0,50 €',[tUnQ,mq2('euro'),mq2('et'),tZeroQ,mq2('euro',2)]),phrase2],pause:pause2,
      choix:[['1,130 €',tqb('A',3),tqb('euro',3)],['2,30 €',tqb('B'),tqb('euros')],['1,30 €',tqb('C'),tqb('euro',4)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],reponse:[phraseE('130 c = 1 € et 30 c',[tCent2,tUn2,tUn2,mr2('et'),tTrente2].map((t,k,a)=>k&&t<a[k-1]?a[k-1]:t)),phraseE('2,30 €',[tDeux2b,mr2('euros',2)])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-total')-.3,'Additionner<br>des prix');
  return { clips,FIN,titre:'Le panier de la dame',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,se,to,re,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tNeufT&&T<re)||(T>=tUnR2&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
