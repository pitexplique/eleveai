/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 17 : « Les courses d'Idriss » (micro ce1_monnaie_probleme), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-probleme-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 6).
   Idriss a 20 € : un filet à 12 €, des hameçons à 5 € → 12 + 5 = 17 € dépensés ; de 17 à 20, il reste 3 €.
   Le total ? Ce qui reste ? Ce qui manque ? Questions : une bouée à 21 € avec 15 € → A (il manque 6 €) ;
   une dorade à 8,50 € et des crevettes à 2 € → B (10,50 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-probleme']=function(outils){
  const DUR={'00-accroche':11.085,'01-depense':6.48,'02-reste':8.575,'03-etapes':6.775,'04-question':17.875,'04b-reponse':9.13,
    '05-question':19.305,'05b-reponse':13.625,'06-appris':10.81,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-depense':1,'02-reste':1,'03-etapes':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,de,re,et,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:50px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w), tAuj=m0('Aujourd\'hui'), tCourses=m0('courses'), tVingt0=m0('vingt'), tFilet=m0('filet'), tDouze0=m0('douze'),
    tHame=m0('hameçons'), tCinq0=m0('cinq');
  const md=w=>mot('01-depense',w), tCombienD=md('combien'), tDouzeD=md('Douze'), tPlusD=md('plus'), tCinqD=md('cinq'), tDixSeptD=md('dix-sept'), tEurosD=md('euros');
  const mre=(w,n=1)=>mot('02-reste',w,n), tCombienR=mre('combien'), tDeR=mre('De'), tDixSeptR=mre('dix-sept'), tAR=mre('à'), tVingtR=mre('vingt'), tTroisR=mre('trois'),
    tVingtR2=mre('Vingt',2), tMoinsR=mre('moins'), tDixSeptR2=mre('dix-sept',2), tTroisR2=mre('trois',2), tEurosR=mre('euros');
  const mt=w=>mot('03-etapes',w), tLis=mt('lis'), tTotal=mt('total'), tReste=mt('reste'), tManque=mt('manque');
  const mq1=(w,n=1)=>mot('04-question',w,n), tIdrissQ=mq1('Idriss'), tQuinzeQ=mq1('quinze'), tBouee=mq1('bouée'), tVingtQ=mq1('vingt'), tCombienQ=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tQuinze1=mr1('quinze'), tVingt1=mr1('vingt'), tSix1=mr1('six'), tManque1=mr1('manque'), tSix1b=mr1('six',2), tAttendra=mr1('attendra');
  const mq2=(w,n=1)=>mot('05-question',w,n), tDame=mq2('dame'), tDorade=mq2('dorade'), tHuitQ=mq2('huit'), tCinquQ=mq2('cinquante'), tCrev=mq2('crevettes'), tDeuxQ=mq2('deux'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tHuit2=mr2('Huit'), tPlus2=mr2('plus'), tDeux2=mr2('deux'), tDix2=mr2('dix'), tCinqu2=mr2('cinquante'), tRestent=mr2('restent'),
    tDix2b=mr2('Dix',2), tA2=mr2('A'), tAjoute=mr2('ajouté'), tPas2=mr2('pas');
  const ma=w=>mot('06-appris',w), tTotalA=ma('total'), tResteA=ma('reste'), tManqueA=ma('manque'), tEtape=ma('étape');
  const finTitre=tAuj-.08;

  /* le filet et les hameçons, avec leurs prix */
  function filetPrix(c,x,y,s,T,t0,tp){ if(T<t0) return; const z=zoom(T,t0,.4); filetE(c,x-110*s*z,y-80*s,220*s*z,170*s*z); if(T>=tp) prixE(c,'12 €',x,y-150*s,56*s,{z:zoom(T,tp,.5)}); }
  function hamePrix(c,x,y,s,T,t0,tp){ if(T<t0) return; for(let k=0;k<3;k++) hameconE(c,x-60*s+k*60*s,y-60*s,110*s,{z:zoom(T,t0+k*.1,.4),a:(k-1)*.15});
    if(T>=tp) prixE(c,'5 €',x,y-150*s,56*s,{z:zoom(T,tp,.5)}); }
  /* trois étiquettes : le total ? ce qui reste ? ce qui manque ? */
  function etiquettes(c,T,x,ys,ts,taille){ const TX=['le total ?','ce qui reste ?','ce qui manque ?'], CO=[CRAIE.ok,'#74c0fc','#ffc078'];
    ys.forEach((y,k)=>{ if(T>=ts[k]) sommeE(c,TX[k],x,y,taille,{z:zoom(T,ts[k],.4),coul:CO[k]}); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : les trois étiquettes, étape par étape */
      quaiBoisE(c,T,40);
      etiquettes(c,T,528,[170,320,470],[tTotalA,tResteA,tManqueA],62);
      if(T>=tEtape) ecrire(c,'étape par étape',528,630,70*zoom(T,tEtape,.4),CRAIE.jaune);
      tab.maj(); return; }

    if(T>=q2){ /* la dame : une dorade à 8,50 €, des crevettes à 2 € (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r2){
        if(T>=tDame) dameE(c,405,715,1.05,{T,tend:T>=tCombien2?1:0});
        if(T>=tDorade) poissonE(c,170,170,210,'#ffa94d',{T,z:zoom(T,tDorade,.4)});
        if(T>=tHuitQ) prixE(c,T>=tCinquQ?'8,50 €':'8 €',385,170,54,{z:zoom(T,tHuitQ,.5)});
        if(T>=tCrev) for(let k=0;k<3;k++) crevetteE(c,110+k*75,330,90,{T,k,z:zoom(T,tCrev+k*.1,.4)});
        if(T>=tDeuxQ) prixE(c,'2 €',385,330,54,{z:zoom(T,tDeuxQ,.5)});
        if(T>=tCombien2) sommeE(c,'elle paie ?',175,600,60,{z:zoom(T,tCombien2,.4)});
        tab.maj(); return; }
      formuleE(c,T,240,130,['8 €','+','2 €','=','10 €'],[tHuit2,tPlus2,tDeux2,tDix2,tDix2],56,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tCinqu2) sommeE(c,T>=tRestent?'50 c restent':'50 c',240,270,50,{z:zoom(T,tCinqu2,.4),coul:'#ffc078'});
      if(T>=tDix2b){ prixVirguleE(c,'10','50',240,420,104,{z:zoom(T,tDix2b,.5)});
        for(const [x,y] of [[30,420],[455,420]]) etincelle(c,x,y,14+5*Math.sin(T*6+x)); }
      if(T>=tA2) ecrire(c,T>=tPas2?'A : 2 c, pas 2 € !':'A : 2 c',240,580,52*zoom(T,tA2,.4),CRAIE.faux);
      if(T>=tAjoute&&T<tPas2) ecrire(c,'8,50 € + 2 c',240,665,48,CRAIE.blanc);
      tab.maj(); return; }

    if(T>=q1){ /* une bouée à 21 €, Idriss a 15 € : combien lui manque-t-il ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r1){
        if(T>=tBouee) boueeE(c,130,180,85,{z:zoom(T,tBouee,.4)});
        if(T>=tVingtQ) prixE(c,'21 €',350,170,62,{z:zoom(T,tVingtQ,.5)});
        if(T>=tQuinzeQ){ euroE(c,10,130,360,34,{grand:1,z:zoom(T,tQuinzeQ,.5)}); euroE(c,5,340,360,34,{grand:1,z:zoom(T,tQuinzeQ+.12,.5)});
          ecrire(c,'Idriss a 15 €',240,460,56*zoom(T,tIdrissQ,.4),CRAIE.blanc); }
        if(T>=tCombienQ) sommeE(c,'il manque ?',240,600,60,{z:zoom(T,tCombienQ,.4)});
        tab.maj(); return; }
      /* de 15 à 21 : + 5 puis + 1 */
      const X=[70,250,410], N=['15','20','21'], TN=[tQuinze1,tVingt1,tVingt1+.3];
      for(let k=0;k<3;k++) if(T>=TN[k]) ecrire(c,N[k],X[k],210,70*zoom(T,TN[k],.4),k===0?CRAIE.blanc:CRAIE.jaune);
      if(T>=tVingt1) arcSaut(c,X[0],X[1],170,'+5',zoom(T,tVingt1,.5));
      if(T>=tVingt1+.3) arcSaut(c,X[1],X[2],170,'+1',zoom(T,tVingt1+.3,.5));
      if(T>=tSix1) formuleE(c,T,240,360,['15','+','6','=','21'],[tSix1,tSix1,tSix1,tSix1,tSix1],64,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
      if(T>=tManque1) sommeE(c,T>=tSix1b?'il manque 6 €':'il manque',200,490,50,{z:zoom(T,tManque1,.4),coul:CRAIE.ok});
      if(T>=tAttendra){ idrissE(c,430,718,.55,{T}); ecrire(c,'demain,',175,600,50,CRAIE.blanc); ecrire(c,'la pêche !',175,660,50,CRAIE.blanc); }
      tab.maj(); return; }

    if(T<de){ /* le magasin de pêche : un filet, des hameçons ; Idriss et son billet de 20 € */
      quaiBoisE(c,T,140); etalE(c,40,640,600);
      idrissE(c,860,705,1.3,{montre:T>=tFilet?1:0,T});
      if(T>=tVingt0) euroE(c,20,690,470,40,{grand:1,z:zoom(T,tVingt0,.5),a:-.12});
      filetPrix(c,190,450,1.2,T,tFilet,tDouze0);
      hamePrix(c,480,450,1.2,T,tHame,tCinq0);
      if(T>=tCourses&&T<tFilet) ecrire(c,'les courses',330,300,74*zoom(T,tCourses,.4),CRAIE.jaune);
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    if(T<re){ /* combien dépense-t-il ? 12 + 5 = 17 € */
      filetPrix(c,250,390,1.3,T,de,de); hamePrix(c,780,390,1.3,T,de,de);
      if(T>=tCombienD) ecrire(c,'en tout ?',528,130,62*zoom(T,tCombienD,.4),CRAIE.jaune);
      formuleE(c,T,528,520,['12','+','5','=','17'],[tDouzeD,tPlusD,tCinqD,tDixSeptD,tDixSeptD],96,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tEurosD) sommeE(c,'17 €',528,650,60,{z:zoom(T,tEurosD,.4),coul:CRAIE.ok});
      tab.maj(); return; }
    if(T<et){ /* combien lui reste-t-il ? de 17 à 20 : 3 ; 20 − 17 = 3 € */
      euroE(c,20,150,120,38,{grand:1}); ecrire(c,'il a 20 €',150,225,50,CRAIE.blanc);
      if(T>=tCombienR) ecrire(c,'il reste ?',528,110,62*zoom(T,tCombienR,.4),CRAIE.jaune);
      const X=[330,500,670,840], N=['17','18','19','20'];
      const tn=k=>k===0?tDixSeptR:tAR+(tVingtR-tAR)*k/3;
      for(let k=0;k<4;k++) if(T>=tn(k)) ecrire(c,N[k],X[k],330,76*zoom(T,tn(k),.4),k===3?CRAIE.jaune:CRAIE.blanc);
      for(let k=0;k<3;k++) if(T>=tn(k+1)) arcSaut(c,X[k],X[k+1],290,'+1',zoom(T,tn(k+1),.5));
      if(T>=tTroisR) sommeE(c,'3',585,200,54,{z:zoom(T,tTroisR,.4),coul:CRAIE.ok});
      formuleE(c,T,528,500,['20','−','17','=','3'],[tVingtR2,tMoinsR,tDixSeptR2,tTroisR2,tTroisR2],90,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tEurosR) sommeE(c,'il reste 3 €',528,640,56,{z:zoom(T,tEurosR,.4),coul:CRAIE.ok});
      tab.maj(); return; }
    /* je lis bien la question : le total ? ce qui reste ? ce qui manque ? */
    if(T>=tLis) ecrire(c,'je lis bien la question',528,120,62*zoom(T,tLis,.4),CRAIE.jaune);
    etiquettes(c,T,528,[280,430,580],[tTotal,tReste,tManque],70);
    tab.maj();
  }
  /* un saut en arc de x0 à x1 au-dessus de y, avec son étiquette (« +1 ») */
  function arcSaut(c,x0,x1,y,txt,z=1){ if(z<=0) return; const k=Math.min(1,z); c.strokeStyle=CRAIE.ok; c.lineWidth=5; c.lineCap='round';
    c.globalAlpha=k; c.beginPath(); c.moveTo(x0+14,y); c.quadraticCurveTo((x0+x1)/2,y-70,x1-14,y); c.stroke(); c.globalAlpha=1;
    ecrire(c,txt,(x0+x1)/2,y-62,36*k,CRAIE.ok); }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien lui manque-t-il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien paie-t-elle ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['6 €',tqa('A',3),tqa('euros',3)],['36 €',tqa('B'),tqa('euros',4)],['15 €',tqa('C'),tqa('euros',5)]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],
      reponse:[phraseE('15 + 6 = 21',[tQuinze1,tSix1,tSix1,tSix1,tVingt1]),phraseE('il manque 6 €',[tManque1,tManque1,tSix1b,tSix1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['8,52 €',tqb('A',3),tqb('cinquante-deux')],['10,50 €',tqb('B'),tqb('cinquante',2)],['6,50 €',tqb('C'),tqb('cinquante',3)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('8 € + 2 € = 10 €',[tHuit2,tHuit2,tPlus2,tDeux2,tDeux2,tDix2,tDix2,tDix2]),phraseE('10,50 €',[tDix2b,tDix2b])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-depense')-.3,'Les courses<br>d\'Idriss');
  return { clips,FIN,titre:'Les courses d\'Idriss',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,de,re,et,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tEurosR&&T<et)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
