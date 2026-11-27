/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 06 : « La balance d'Idriss » (micro ce2_monnaie_probleme), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2/3-dessins.js + idriss-dessins.js (socle CP gardé).
   Voix : manim/voix/idriss-ce2-kilo-paysage.json.
   Thon à 9 € le kilo, une dame en prend 2 kilos : 9 + 9 = 18 €, 2 × 9 = 18 ; elle paie 20 €, Idriss rend 2 €. Deux étapes : le prix, la monnaie.
   Questions : dorade 6 € le kilo × 3 kilos → A (18 €) ; crevettes 12 € le kilo × 2, payé 50 € → C (26 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce2-kilo']=function(outils){
  const DUR={'00-accroche':9.485,'01-kilo':8.365,'02-rendre':8.185,'03-etapes':6.82,'04-question':18.31,'04b-reponse':7.495,
    '05-question':19.565,'05b-reponse':14.4,'06-appris':7.005,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-kilo':.8,'02-rendre':1.2,'03-etapes':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ki,re,et,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tAu=m0('Au'), tIdriss=m0('Idriss'), tArdoise=m0('ardoise'), tThon=m0('thon'), tNeuf=m0('neuf'), tDame=m0('dame'), tDeux=m0('deux'), tKilos=m0('kilos');
  const mk=(w,n=1)=>mot('01-kilo',w,n), tUnK=mk('Un'), tNeufK=mk('neuf'), tDeuxK=mk('Deux'), tDeuxK2=mk('deux',2), tFoisK=mk('fois'), tNeufK2=mk('neuf',2), tNeufK3=mk('Neuf',3), tPlusK=mk('plus'), tNeufK4=mk('neuf',4), tDixHuit=mk('dix-huit');
  const mre=(w,n=1)=>mot('02-rendre',w,n), tDonne=mre('donne'), tVingtR=mre('vingt'), tDe=mre('De'), tDHr=mre('dix-huit'), tVingtR2=mre('vingt',2), tManque=mre('manque'), tDeuxR=mre('deux'), tRendR=mre('rend');
  const me=w=>mot('03-etapes',w), tEtapes=me('étapes'), tPrixE=me('prix'), tMonnE=me('monnaie');
  const mq1=w=>mot('04-question',w), tDorade=mq1('dorade'), tSixQ=mq1('six'), tTroisQ=mq1('trois'), tKilosQ=mq1('kilos'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tSix1=mr1('Six'), tDouze1=mr1('douze'), tDH1=mr1('dix-huit'), tTrois1=mr1('Trois'), tFois1=mr1('fois'), tSix1b=mr1('six',2), tDH1b=mr1('dix-huit',2);
  const mq2=w=>mot('05-question',w), tCrevQ=mq2('crevettes'), tDouzeQ=mq2('douze'), tDeuxQ=mq2('deux'), tCinqQ=mq2('cinquante'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tPrix2=mr2('prix'), tD12=mr2('douze'), tPlus2=mr2('plus'), tD12b=mr2('douze',2), tV24=mr2('vingt-quatre'),
    tMonn2=mr2('monnaie'), tV24b=mr2('vingt-quatre',2), tC50=mr2('cinquante'), tV26=mr2('vingt-six'), tAttention=mr2('Attention'), tB2=mr2('B'), tPas2=mr2('pas');
  const ma=w=>mot('06-appris',w), tPrixA=ma('prix'), tAutantA=ma('autant'), tKilosA=ma('kilos'), tMonnA=ma('monnaie');
  const finTitre=tAu-.08;

  /* le marché : l'étal avec le thon, l'ardoise des prix au-dessus, la balance ; la dame à droite */
  const BX=420, BY=600;
  const thon=(z=1,T=0)=>(c,x,y)=>poissonE(c,x,y-34,260,'#868e96',{T,z,ray:'#495057'});
  function etiqueteE(c,txt,x,y,taille,T,t0,coul=CRAIE.jaune){ if(T<t0) return; const k=zoom(T,t0,.4);
    c.font=`800 ${taille*k}px "Segoe UI"`; const w=c.measureText(txt).width+taille*.8;
    c.fillStyle='rgba(31,59,44,.9)'; c.beginPath(); c.roundRect(x-w/2,y-taille*.75*k,w,taille*1.45*k,16); c.fill();
    c.strokeStyle=coul; c.lineWidth=3; c.stroke(); ecrire(c,txt,x,y,taille*k,coul); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : le prix (autant de fois que de kilos), puis la monnaie */
      quaiBoisE(c,T,40);
      etiqueteE(c,'1. le prix',300,170,60,T,ap+.2,CRAIE.jaune); etiqueteE(c,'2. la monnaie',760,170,60,T,tMonnA,'#74c0fc');
      if(T>=tAutantA) formuleE(c,T,300,330,['2','×','9 €','=','18 €'],[tAutantA,tAutantA,tAutantA,tKilosA,tKilosA],70,['#74c0fc',CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tMonnA) formuleE(c,T,760,330,['20','−','18','=','2 €'],[tMonnA,tMonnA,tMonnA,tMonnA,tMonnA],70,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,'#74c0fc']);
      if(T>=tKilosA) balanceE(c,300,660,.9,{ecran:'2 kg',plateau:thon(1,T)});
      if(T>=tMonnA){ euroE(c,20,700,560,36); euroE(c,2,880,560,44,{lueur:.5}); }
      tab.maj(); return; }

    if(T>=q2){ /* crevettes 12 € le kilo, 2 kilos, payé 50 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tDouzeQ) ardoisePrixE(c,240,95,[['Crevettes : 12 € le kilo',CRAIE.jaune]],34,{z:zoom(T,tDouzeQ,.5)});
      if(T>=tDeuxQ) for(let k=0;k<2;k++) sachetKiloE(c,90+k*150,370,130,{z:zoom(T,tDeuxQ+k*.12,.4),
        contenu:(c,x,yH)=>{ crevetteE(c,x-18,yH-4,80,{T,k}); crevetteE(c,x+20,yH+6,74,{T,k:k+2,dir:-1}); }});
      if(T>=tCinqQ) euroE(c,50,390,300,26,{z:zoom(T,tCinqQ,.5)});
      if(T<r2){ if(T>=tComb2) ecrire(c,'?',240,520,110*zoom(T,tComb2,.5),CRAIE.jaune); }
      else {
        if(T>=tPrix2) etiqueteE(c,'1. le prix',240,452,34,T,tPrix2,CRAIE.jaune);
        formuleE(c,T,240,522,['12','+','12','=','24 €'],[tD12,tPlus2,tD12b,tV24,tV24],46,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
        if(T>=tMonn2) etiqueteE(c,'2. la monnaie',240,592,34,T,tMonn2,'#74c0fc');
        formuleE(c,T,240,662,['50','−','24','=','26 €'],[tC50,tC50,tV24b,tV26,tV26],46,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,'#74c0fc']);
        if(T>=tAttention&&T>=tB2) cercle(c,351,522,62,CRAIE.faux,entreE(T,tB2,tB2+.5)); }
      tab.maj(); return; }

    if(T>=q1){ /* dorade 6 € le kilo, 3 kilos (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tSixQ) ardoisePrixE(c,240,95,[['Dorade : 6 € le kilo',CRAIE.jaune]],36,{z:zoom(T,tSixQ,.5)});
      const tK=[tSix1,tDouze1,tDH1], cumul=['6 €','12 €','18 €'];
      if(T>=tKilosQ) for(let k=0;k<3;k++){ const lu=T>=r1&&T>=tK[k]&&T<tTrois1?.6:0;
        sachetKiloE(c,90+k*150,400,130,{z:zoom(T,tKilosQ+k*.12,.4),lueur:lu,contenu:(c,x,yH)=>poissonE(c,x,yH,120,'#ff8787',{T,k,ray:'#c92a2a'})});
        if(T>=r1&&T>=tK[k]) etiquette(c,cumul[k],90+k*150,500,T,tK[k],k===2?CRAIE.ok:CRAIE.jaune,36); }
      if(T<r1){ if(T>=tTroisQ) etiquette(c,'3',455,330,T,tTroisQ,'#74c0fc',46); if(T>=tComb1) ecrire(c,'?',240,600,110*zoom(T,tComb1,.5),CRAIE.jaune); }
      else formuleE(c,T,240,620,['3','×','6 €','=','18 €'],[tTrois1,tFois1,tSix1b,tDH1b,tDH1b],62,['#74c0fc',CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }

    if(T>=et){ /* deux étapes */
      quaiBoisE(c,T,40);
      if(T>=tEtapes) ecrire(c,'2 étapes',528,140,80*zoom(T,tEtapes,.4),CRAIE.blanc);
      etiqueteE(c,'1. le prix',300,320,64,T,tPrixE,CRAIE.jaune); etiqueteE(c,'2. la monnaie',760,320,64,T,tMonnE,'#74c0fc');
      if(T>=tPrixE) formuleE(c,T,300,470,['2','×','9 €','=','18 €'],[tPrixE,tPrixE,tPrixE,tPrixE,tPrixE],62,['#74c0fc',CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tMonnE) formuleE(c,T,760,470,['20','−','18','=','2 €'],[tMonnE,tMonnE,tMonnE,tMonnE,tMonnE],62,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,'#74c0fc']);
      if(T>=tPrixE) lienE(c,[470,330],[590,330],entreE(T,tMonnE-.4,tMonnE),CRAIE.blanc);
      tab.maj(); return; }

    /* le marché, la balance, la dame ; 2 kilos ; elle paie 20 €, Idriss rend 2 € */
    quaiBoisE(c,T,140); etalE(c,40,640,560,{toile:false});
    if(T>=tArdoise) ardoisePrixE(c,300,110,[['Thon : 9 € le kilo',CRAIE.jaune]],52,{z:zoom(T,tArdoise,.5),lueur:(T>=ki&&T>=tNeufK&&T<tDeuxK)?.6:0});
    if(T<ki) idrissE(c,140,705,1.15,{montre:T>=tIdriss&&T<tDame?1:0,T});
    if(T>=tDame) dameE(c,880,705,1.15,{tend:T>=re&&T>=tDonne&&T<tRendR?1:0,T});
    const kg=T<ki?(T>=tKilos?2:0):(T>=tDeuxK?2:T>=tUnK?1:0);
    const ecran=kg?kg+' kg':'';
    balanceE(c,BX,BY,1,{ecran,lueur:T>=ki&&T<re&&((T>=tUnK&&T<tUnK+.8)||(T>=tDeuxK&&T<tDeuxK+.8))?.6:0,
      plateau:(c,x,y)=>{ if(T>=tThon) thon(zoom(T,tThon,.4),T)(c,x,y); if(kg>=2) poissonE(c,x+10,y-80,230,'#adb5bd',{T,k:3,dir:-1,ray:'#495057'}); }});
    if(T<ki){ if(T>=tKilos) etiquette(c,'2 kg',700,320,T,tKilos,'#74c0fc',46); }
    else if(T<re){
      if(T>=tNeufK) etiquette(c,'9 €',620,470,T,tNeufK,CRAIE.jaune,44);
      if(T>=tDeuxK) etiquette(c,'9 €',620,370,T,tDeuxK+.4,CRAIE.jaune,44);
      formuleE(c,T,660,240,['2','×','9 €','=','18 €'],[tDeuxK2,tFoisK,tNeufK2,tDixHuit,tDixHuit],70,['#74c0fc',CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      formuleE(c,T,660,330,['9','+','9','=','18'],[tNeufK3,tPlusK,tNeufK4,tDixHuit,tDixHuit],58,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]); }
    else {
      etiquette(c,'18 €',620,420,T,re,CRAIE.ok,44);
      if(T>=tVingtR){ const p=sautE([800,440],[640,300],entreE(T,tVingtR,tVingtR+.5),60); euroE(c,20,p[0],p[1],34,{z:zoom(T,tVingtR,.5)}); }
      if(T>=tDe){ const X=droiteE(c,160,240,690,18,20,{hi:{18:CRAIE.ok,20:CRAIE.blanc},taille:48});
        arcSautE(c,[X(18),672],[X(20),672],entreE(T,tDe,tManque+.3),70,'#74c0fc');
        if(T>=tDeuxR) ecrire(c,'+ 2',X(19),610,52*zoom(T,tDeuxR,.4),'#74c0fc'); }
      if(T>=tRendR){ const p=sautE([420,300],[760,470],entreE(T,tRendR,tRendR+.6),80); euroE(c,2,p[0],p[1],44,{lueur:.6}); } }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien paie-t-il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien me rend-on ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:[phraseE('3 kilos à 6 € le kilo.',[tTroisQ,tKilosQ,tSixQ-.3,tSixQ,tSixQ,mq1('le'),mq1('kilo')]),...phrase1],pause:pause1,
      choix:[['18 €',tqa('A'),tqa('dix-huit')],['9 €',tqa('B'),tqa('neuf')],['63 €',tqa('C'),tqa('soixante-trois')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('3 × 6 € = 18 €',[tTrois1,tFois1,tSix1b,tSix1b,tDH1b,tDH1b,tDH1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:[phraseE('2 kilos à 12 €, payé 50 €.',[tDeuxQ,tDeuxQ+.2,tDouzeQ-.3,tDouzeQ,tDouzeQ,tCinqQ-.4,tCinqQ,tCinqQ]),...phrase2],pause:pause2,
      choix:[['38 €',tqb('A'),tqb('trente-huit')],['24 €',tqb('B'),tqb('vingt-quatre')],['26 €',tqb('C'),tqb('vingt-six')]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],
      reponse:[phraseE('12 + 12 = 24 €',[tD12,tPlus2,tD12b,tV24,tV24,tV24]),phraseE('50 − 24 = 26 €',[tC50,tC50,tV24b,tV26,tV26,tV26])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-kilo')-.5,'Le prix<br>au kilo');
  return { clips,FIN,titre:'Le prix au kilo',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,ki,re,et,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tDixHuit&&T<re)||(T>=tMonnE&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
