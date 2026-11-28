/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 13 : « La caisse du soir » (micro ce1_monnaie_valeur_ensemble), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-valeur-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 2).
   Le soir, sous la lampe : 5 € + 2 € = 7 € ; 50 c + 20 c = 70 c ; en tout 7 € et 70 c (les euros avec les euros…).
   Questions : 10 € + 1 € + 50 c → B (11 € et 50 c) ; 3 × 20 c + 2 × 10 c → B (80 c).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-valeur']=function(outils){
  const DUR={'00-accroche':10.775,'01-euros':4.77,'02-centimes':5.39,'03-ensemble':8.13,'04-question':19.87,'04b-reponse':9.83,
    '05-question':16.87,'05b-reponse':11.585,'06-appris':7.52,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-euros':1,'02-centimes':1,'03-ensemble':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,eu,ce,en,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:52px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tLe=m0('Le'), tCaisse=m0('caisse'), tBillet=m0('billet'), tEuros0=m0('euros'), tCent0=m0('centimes'), tComb0=m0('Combien');
  const me=w=>mot('01-euros',w), tEuros1=me('euros'), tCinq1=me('cinq'), tPlus1=me('plus'), tDeux1=me('deux'), tSept1=me('sept');
  const mc=w=>mot('02-centimes',w), tCent2=mc('centimes'), tC50=mc('cinquante'), tPlus2=mc('plus'), tC20=mc('vingt'), tC70=mc('soixante-dix');
  const men=(w,n=1)=>mot('03-ensemble',w,n), tSept3=men('sept'), tSoix3=men('soixante-dix'), tLes3=men('Les'), tCent3=men('centimes',2);
  const mq1=(w,n=1)=>mot('04-question',w,n), tSeau=mq1('seau'), tDixQ=mq1('dix'), tUnQ=mq1('un',2), tCinqQ=mq1('cinquante'), tCombQ=mq1('Combien');
  const mr1=w=>mot('04b-reponse',w), tB1=mr1('B'), tDix1=mr1('Dix'), tPlusR=mr1('plus'), tUn1=mr1('un'), tOnze1=mr1('onze'), tCinq1R=mr1('cinquante'), tMel1=mr1('mélangé');
  const mq2=(w,n=1)=>mot('05-question',w,n), tTroisQ=mq2('Trois'), tDeuxQ=mq2('deux'), tCombQ2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), t20=mr2('Vingt'), t40=mr2('quarante'), t60=mr2('soixante'), t70=mr2('soixante-dix'), t80=mr2('quatre-vingts'), t80b=mr2('quatre-vingts',2), tNombre=mr2('nombre');
  const ma=w=>mot('06-appris',w), tEurosA=ma('euros'), tCentA=ma('centimes'), tMelA=ma('mélange');
  const finTitre=tLe-.08;

  /* le soir : un voile bleu nuit, la lampe allumée */
  function soir(c,T,cone=1){ c.fillStyle='rgba(16,24,64,.42)'; c.fillRect(0,0,1056,720); etoilesE(c,T,10,1056,60); lampeE(c,528,0,1,{T,cone}); }
  /* la caisse : les deux colonnes, « euros » à gauche, « centimes » à droite */
  const XE=270, XC=790;
  function colonnes(c,T,lueE=0,lueC=0){
    c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=4; c.setLineDash([14,12]); c.beginPath(); c.moveTo(528,150); c.lineTo(528,560); c.stroke(); c.setLineDash([]);
    ecrire(c,'euros',XE,140,58,CRAIE.r0); ecrire(c,'centimes',XC,140,58,'#ffc078');
    euroE(c,5,XE-60,290,48,{grand:1,lueur:lueE}); euroE(c,2,XE+150,300,54,{lueur:lueE});
    centimeE(c,50,XC-90,300,96,{lueur:lueC}); centimeE(c,20,XC+90,300,96,{lueur:lueC}); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : les euros d'abord, puis les centimes ; je ne mélange pas */
      quaiBoisE(c,T,40); colonnes(c,T,T>=tEurosA&&T<tCentA?.6:0,T>=tCentA&&T<tMelA?.6:0);
      sommeE(c,'7 €',XE,450,80,{coul:CRAIE.r0}); sommeE(c,'70 c',XC,450,80,{coul:'#ffc078'});
      if(T>=tMelA) sommeE(c,'7 € et 70 c',528,610,80,{z:zoom(T,tMelA,.4),coul:CRAIE.ok});
      tab.maj(); return; }

    if(T>=q2){ /* trois pièces de 20 c et deux pièces de 10 c (x < 480) */
      quaiBoisE(c,T,40);
      const PX=[[80,210],[230,210],[380,210],[150,430],[310,430]], V=[20,20,20,10,10];
      V.forEach((v,k)=>{ const t0=k<3?tTroisQ+k*.12:tDeuxQ+(k-3)*.12; if(T<t0) return;
        const tc=[t20,t40,t60,t70,t80][k], [x,y]=PX[k];
        centimeE(c,v,x,y,k<3?80:76,{z:zoom(T,t0,.4),lueur:T>=r2&&T>=tc&&T<t80b?.6:0});
        if(T>=r2&&T>=tc) ecrire(c,String([20,40,60,70,80][k]),x,y+88,50*zoom(T,tc,.4),k===4?CRAIE.ok:CRAIE.jaune); });
      if(T<r2){ if(T>=tCombQ2) ecrire(c,'?',240,600,120*zoom(T,tCombQ2,.5),CRAIE.jaune); }
      else { if(T>=t80b) sommeE(c,'80 c',240,590,66,{z:zoom(T,t80b,.4),coul:CRAIE.ok});
        if(T>=tNombre) ecrire(c,'5 pièces ≠ 5 c',240,680,46*zoom(T,tNombre,.4),CRAIE.faux); }
      tab.maj(); return; }

    if(T>=q1){ /* dans le seau : 10 €, 1 € et 50 c (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r1){ if(T>=tSeau) seauCoulE(c,240,690,270,'#1c7ed6','#0b3d6b');
        if(T>=tDixQ) euroE(c,10,190,300,56,{z:zoom(T,tDixQ,.5),grand:1,a:-.1});
        if(T>=tUnQ) euroE(c,1,350,460,58,{z:zoom(T,tUnQ,.5)});
        if(T>=tCinqQ) centimeE(c,50,130,470,96,{z:zoom(T,tCinqQ,.5)});
        if(T>=tCombQ) ecrire(c,'?',410,170,110*zoom(T,tCombQ,.5),CRAIE.jaune); }
      else { /* d'abord les euros, puis les centimes */
        euroE(c,10,140,160,44,{grand:1,lueur:T>=tDix1&&T<tOnze1?.5:0}); euroE(c,1,360,160,56,{lueur:T>=tUn1&&T<tOnze1?.5:0});
        formuleE(c,T,240,290,['10 €','+','1 €','=','11 €'],[tDix1,tPlusR,tUn1,tOnze1,tOnze1],50);
        centimeE(c,50,130,410,86,{lueur:T>=tCinq1R&&T<tMel1?.6:0}); if(T>=tCinq1R) ecrire(c,'50 c',320,410,62,'#ffc078');
        if(T>=tCinq1R) sommeE(c,'11 € et 50 c',240,550,60,{z:zoom(T,tCinq1R,.4),coul:CRAIE.ok});
        if(T>=tMel1) ecrire(c,'A : 61 € ✗',240,660,50*zoom(T,tMel1,.4),CRAIE.faux); }
      tab.maj(); return; }

    if(T<eu){ /* le soir, Idriss compte sa caisse sous la lampe */
      quaiBoisE(c,T,140); soir(c,T); etalE(c,40,1016,600,{toile:false});
      if(T>=tCaisse) caisseE(c,420,600,360,110);
      if(T>=tBillet) euroE(c,5,330,470,48,{z:zoom(T,tBillet,.5),grand:1});
      if(T>=tEuros0) euroE(c,2,500,470,54,{z:zoom(T,tEuros0,.5)});
      if(T>=tCent0){ centimeE(c,50,190,470,90,{z:zoom(T,tCent0,.5)}); centimeE(c,20,640,470,86,{z:zoom(T,tCent0+.15,.5)}); }
      idrissE(c,880,705,1.3,{montre:T>=tCaisse&&T<tComb0?1:0,T});
      if(T>=tComb0) ecrire(c,'?',190,230,140*zoom(T,tComb0,.5),CRAIE.jaune);
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    colonnes(c,T,T>=eu&&T<ce?.5:0,T>=ce&&T<en?.5:0);
    formuleE(c,T,XE,450,['5','+','2','=','7'],[tCinq1,tPlus1,tDeux1,tSept1,tSept1],80);
    if(T>=ce) formuleE(c,T,XC,450,['50','+','20','=','70'],[tC50,tPlus2,tC20,tC70,tC70],80);
    if(T>=tSept1+.6&&T<en) ecrire(c,'7 €',XE,560,72,CRAIE.ok);
    if(T>=tC70+.6&&T<en) ecrire(c,'70 c',XC,560,72,CRAIE.ok);
    if(T>=en) sommeE(c,'7 € et 70 c',528,610,90,{z:zoom(T,tSept3,.4),coul:CRAIE.ok});
    if(T>=tLes3) for(const [x,y] of [[60,80],[1000,80]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien en tout ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien en tout ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['61 €',tqa('A'),tqa('euros',2)],['11 € et 50 c',tqa('B'),tqa('centimes',2)],['12 €',tqa('C'),tqa('euros',4)]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],reponse:[phraseE('10 + 1 = 11',[tDix1,tPlusR,tUn1,tOnze1,tOnze1]),phraseE('11 € et 50 c',[tOnze1,tOnze1,tCinq1R,tCinq1R,tCinq1R])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['5 c',tqb('A'),tqb('centimes',3)],['80 c',tqb('B'),tqb('centimes',4)],['5 €',tqb('C'),tqb('euros')]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('20, 40, 60, 70, 80',[t20,t40,t60,t70,t80]),phraseE('80 c',[t80b,t80b])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('03-ensemble')-.5,'Combien<br>dans la caisse ?');
  return { clips,FIN,titre:'La caisse du soir',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,eu,ce,en,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tLes3&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
