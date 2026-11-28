/* ============================================================
   Série Idriss, monnaie CP — PAYSAGE 11 : « Les défis d'Idriss » (micro cp_monnaie_defi), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-defi-paysage.json.
   Défi 1 : 2 € + 2 € + 1 € = 5 € < 6 € : il manque 1 €. Défi 2 : 23 € avec le moins possible : 20 + 2 + 1 (le plus gros d'abord).
   Questions : la dame (10 € + 2 €) et ses poissons à 11 € → A (oui) ; 35 € avec le moins de billets → A (un billet de 10).
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['cp-defi']=function(outils){
  const DUR={'00-accroche':13.84,'01-compte':9.9,'02-moins':12.325,'03-astuce':9.225,'04-question':19.91,'04b-reponse':10.145,
    '05-question':19.935,'05b-reponse':15.975,'06-appris':9.345,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-compte':1.2,'02-moins':1,'03-astuce':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,co,mo,as,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:44px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tAujourd=m0("Aujourd'hui"), tDefis=m0('défis'), tPremier=m0('Premier'), tDeux0=m0('deux'), tUn0=m0('un'), tPoisson=m0('poisson'), tSix0=m0('six'), tAssez0=m0('assez');
  const mc=(w,n=1)=>mot('01-compte',w,n), tDeuxC=mc('deux'), tQuatreC=mc('quatre'), tCinqC=mc('cinq'), tCinqC2=mc('cinq',2), tMoinsC=mc('moins'), tManque=mc('manque');
  const mm=(w,n=1)=>mot('02-moins',w,n), tDeuxieme=mm('Deuxième'), t23=mm('vingt-trois'), tMoinsM=mm('moins'), tGrosM=mm('gros'), tVingtM=mm('vingt'), tDeuxM=mm('deux'), tUnM=mm('un',2);
  const ma=(w,n=1)=>mot('03-astuce',w,n), tVingtA=ma('Vingt'), tPlusA=ma('plus'), tDeuxA=ma('deux'), tPlusA2=ma('plus',2), tUnA=ma('un'), t23A=ma('vingt-trois'), tTroisA=ma('trois'), tGrosA=ma('gros');
  const mq1=(w,n=1)=>mot('04-question',w,n), tDame=mq1('dame'), tDixQ=mq1('dix'), tDeuxQ=mq1('deux'), tPoissonsQ=mq1('poissons'), tOnzeQ=mq1('onze'), tAssezQ=mq1('assez');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tDix1=mr1('Dix'), tPlus1=mr1('plus'), tDeux1=mr1('deux'), tDouze1=mr1('douze'), tPlus1b=mr1('plus',2), tOnze1=mr1('onze'), tRestera=mr1('restera'), tEuro1=mr1('euro');
  const mq2=(w,n=1)=>mot('05-question',w,n), t35Q=mq2('trente-cinq'), tVingtQ=mq2('vingt'), tDixQ2=mq2('dix'), tCinqQ2=mq2('cinq'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tVingt2=mr2('vingt'), tDix2=mr2('dix'), tTrente=mr2('trente'), tCinq2=mr2('cinq'), t35=mr2('trente-cinq'), tSeul2=mr2('seul'), tMarche=mr2('marche'), tPlus2=mr2('plus');
  const mA=w=>mot('06-appris',w), tAssezA=mA('Assez'), tCompteA=mA('compte'), tCompare=mA('compare'), tMoinsA=mA('moins'), tGrosA2=mA('gros');
  const finTitre=tAujourd-.08;

  /* défi 1 : mes deux pièces de 2 € et une de 1 € ; le poisson à 6 € */
  const PC=[[2,150,590],[2,320,590],[1,480,590]];
  function defi1(c,T,{lus=null}={}){
    PC.forEach(([v,x,y],k)=>{ const t=k<2?tDeux0+k*.15:tUn0; if(T<t) return; euroE(c,v,x,y,v===2?68:66,{z:zoom(T,t,.4),lueur:lus&&T>=lus[k]&&T<lus[k]+1?.6:0}); });
    if(T>=tPoisson) poissonE(c,330,330,320,'#ffa94d',{T,z:zoom(T,tPoisson,.4),ray:'#e8590c'});
    if(T>=tSix0) prixE(c,'6 €',620,250,80,{z:zoom(T,tSix0,.5)}); }
  /* défi 2 : 23 € ; un billet de 20, une pièce de 2, une pièce de 1 glissent dans la zone */
  const Z2=[[20,250,520,()=>tVingtM],[2,510,520,()=>tDeuxM],[1,670,520,()=>tUnM]];
  function defi2(c,T){ ecrire(c,'Défi 2',528,70,60,CRAIE.gris);
    if(T>=t23) ecrire(c,'23 €',528,200,130*zoom(T,t23,.5),CRAIE.jaune);
    c.save(); c.setLineDash([14,10]); c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=4; c.beginPath(); c.roundRect(90,420,700,200,20); c.stroke(); c.restore();
    Z2.forEach(([v,x,y,tf])=>{ const t=tf(); if(T<t-.3) return; const p=sautE([980,640],[x,y],entreE(T,t-.3,t+.4),140); euroE(c,v,p[0],p[1],v>2?52:64,{grand:1}); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* assez ? je compte, je compare ; le moins ? le plus gros d'abord */
      if(T>=tAssezA) ecrire(c,"Assez d'argent ?",528,170,66*zoom(T,tAssezA,.4),CRAIE.jaune);
      if(T>=tCompteA) ecrire(c,'je compte,',528,255,58*zoom(T,tCompteA,.4),CRAIE.blanc);
      if(T>=tCompare) ecrire(c,'je compare au prix',528,335,58*zoom(T,tCompare,.4),CRAIE.blanc);
      if(T>=tMoinsA) ecrire(c,'Le moins de billets ?',528,470,66*zoom(T,tMoinsA,.4),CRAIE.jaune);
      if(T>=tGrosA2) ecrire(c,"les plus gros d'abord",528,560,58*zoom(T,tGrosA2,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=q2){ /* payer 35 € avec le moins de billets possible */
      quaiBoisE(c,T,40);
      if(T>=t35Q) prixE(c,'35 €',230,110,64,{z:zoom(T,t35Q,.5)});
      if(T<r2){
        [[20,tVingtQ,250],[10,tDixQ2,390],[5,tCinqQ2,520]].forEach(([v,t,y])=>{ if(T>=t) euroE(c,v,220,y-10,42,{z:zoom(T,t,.4),grand:1}); });
        if(T>=tCombien2) ecrire(c,'?',430,390,100*zoom(T,tCombien2,.5),CRAIE.jaune); }
      else {
        const Z=[[20,90,tVingt2,'20'],[10,245,tDix2,'30'],[5,400,tCinq2,'35']];
        Z.forEach(([v,x,t,lab],k)=>{ if(T<t-.3) return; const p=sautE([230,700],[x,330],entreE(T,t-.3,t+.4),100);
          euroE(c,v,p[0],p[1],30,{grand:1,lueur:k===1&&T>=tSeul2&&T<tMarche?.6:0});
          const tl=[tVingt2,tTrente,t35][k]; if(T>=tl) ecrire(c,lab,x,240,58*zoom(T,tl,.4),CRAIE.jaune); });
        if(T>=t35) formuleE(c,T,240,460,['20','+','10','+','5','=','35'],Array(7).fill(t35),52,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tSeul2) ecrire(c,'1 seul billet de 10 €',240,560,40*zoom(T,tSeul2,.4),CRAIE.ok);
        if(T>=tPlus2) ecrire(c,'B : plus de billets',240,650,38*zoom(T,tPlus2,.4),CRAIE.gris); }
      tab.maj(); return; }

    if(T>=q1){ /* la dame : un billet de 10 € et une pièce de 2 € ; deux poissons à 11 € */
      quaiBoisE(c,T,40);
      if(T>=tDame) dameE(c,90,715,.95,{T});
      if(T>=tDixQ) euroE(c,10,250,120,40,{z:zoom(T,tDixQ,.4),grand:1,lueur:T>=r1&&T>=tDix1&&T<tDouze1+.5?.6:0});
      if(T>=tDeuxQ) euroE(c,2,410,120,52,{z:zoom(T,tDeuxQ,.4),lueur:T>=r1&&T>=tDeux1&&T<tDouze1+.5?.6:0});
      if(T>=tPoissonsQ){ poissonE(c,300,340,230,'#4dabf7',{T,ray:'#1864ab'}); poissonE(c,300,450,230,'#4dabf7',{T,k:1,ray:'#1864ab'}); }
      if(T>=tOnzeQ) prixE(c,'11 €',300,565,56,{z:zoom(T,tOnzeQ,.5)});
      if(T<r1){ if(T>=tAssezQ) ecrire(c,'?',448,330,90*zoom(T,tAssezQ,.5),CRAIE.jaune); }
      else {
        if(T>=tDix1&&T<tRestera) formuleE(c,T,300,232,['10','+','2','=','12 €'],[tDix1,tPlus1,tDeux1,tDouze1,tDouze1],50,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tRestera) ecrire(c,'il reste 1 €',300,232,50*zoom(T,tRestera,.4),CRAIE.ok);
        if(T>=tPlus1b) ecrire(c,'12 € > 11 €',300,655,50*zoom(T,tPlus1b,.4),CRAIE.blanc); }
      tab.maj(); return; }

    if(T>=as){ /* 20 + 2 + 1 = 23 : seulement trois ; le plus gros d'abord */
      defi2(c,T>=as?1e9:T);
      formuleE(c,T,528,690,['20','+','2','+','1','=','23'],[tVingtA,tPlusA,tDeuxA,tPlusA2,tUnA,t23A,t23A],60,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tTroisA){ ecrire(c,'3',900,520,110*zoom(T,tTroisA,.4),CRAIE.jaune); cercle(c,900,520,75,CRAIE.jaune,entreE(T,tTroisA,tTroisA+.5)); }
      if(T>=tGrosA) ecrire(c,"le plus gros d'abord",528,320,54*zoom(T,tGrosA,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=mo){ /* défi 2 */
      if(T<tDeuxieme+.2) ecrire(c,'Défi 2',528,300,120*zoom(T,tDeuxieme,.5),CRAIE.jaune); else defi2(c,T);
      if(T>=tGrosM&&T<tVingtM) ecrire(c,"le plus gros d'abord",528,320,54,CRAIE.ok);
      tab.maj(); return; }

    if(T>=co){ /* défi 1 : 2, 4, 5 → 5 € < 6 € ; il manque 1 € */
      ecrire(c,'Défi 1',528,70,60,CRAIE.gris);
      defi1(c,T,{lus:[tDeuxC,tQuatreC,tCinqC]});
      [[tDeuxC,'2'],[tQuatreC,'4'],[tCinqC,'5']].forEach(([t,s],k)=>{ if(T>=t) ecrire(c,s,PC[k][1],472,58*zoom(T,t,.4),CRAIE.jaune); });
      if(T>=tCinqC2) ecrire(c,'5 €',800,420,90*zoom(T,tCinqC2,.4),CRAIE.jaune);
      if(T>=tMoinsC) ecrire(c,'5 € < 6 €',800,540,70*zoom(T,tMoinsC,.4),CRAIE.blanc);
      if(T>=tManque) ecrire(c,'il manque 1 €',800,650,64*zoom(T,tManque,.4),CRAIE.faux);
      tab.maj(); return; }

    /* Idriss lance les défis : défi 1 */
    quaiBoisE(c,T,140);
    idrissE(c,880,715,1.3,{T,montre:T>=tDefis?1:0});
    if(T>=tPremier) ecrire(c,'Défi 1',528,70,80*zoom(T,tPremier,.5),CRAIE.jaune);
    defi1(c,T);
    if(T>=tAssez0) ecrire(c,'assez ?',620,400,70*zoom(T,tAssez0,.5),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('A-t-elle'); const phrase1=[qa("A-t-elle assez d'argent ?")]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de billets de dix ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:[phraseE('10 € + 2 €. Prix : 11 €.',[tDixQ,tDixQ,tDeuxQ,tDeuxQ,tDeuxQ,tOnzeQ,tOnzeQ,tOnzeQ,tOnzeQ]),...phrase1],pause:pause1,
      choix:[['oui',tqa('A'),tqa('oui')],["non, il manque de l'argent",tqa('B'),tqa("l'argent")],['on ne peut pas savoir',tqa('C'),tqa('savoir')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('12 € > 11 €',[tDouze1,tDouze1,tPlus1b,tOnze1,tOnze1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:[phraseE('Payer 35 € avec le moins de billets.',[mq2('payer'),t35Q,t35Q,mq2('avec'),mq2('le'),mq2('moins'),mq2('de'),mq2('billets')]),...phrase2],pause:pause2,
      choix:[['un',tqb('A'),tqb('un')],['trois',tqb('B'),tqb('trois')],['cinq',tqb('C'),tqb('cinq',2)]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],reponse:[phraseE('20 + 10 + 5 = 35',[tVingt2,tDix2,tDix2,tCinq2,tCinq2,t35,t35])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-compte')-.5,'Défis<br>de monnaie');
  return { clips,FIN,titre:"Les défis d'Idriss",ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,co,mo,as,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tTroisA&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
