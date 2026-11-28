/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 20 : « Le beau thon » (micro ce2_monnaie_constituer), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-constituer-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE2 2).
   13,75 € = 10 € + 2 € + 1 € (les euros) puis 50 c + 20 c + 5 c (les centimes) ; le plus gros d'abord.
   Questions : 2 € en pièces de 20 c → C (10) ; payer 8,40 € → A (5 € + 2 € + 1 € + 20 c + 20 c).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce2-constituer']=function(outils){
  const DUR={'00-accroche':8.015,'01-billets':6.885,'02-centimes':10.915,'03-gros':6.015,'04-question':12.855,'04b-reponse':8.935,'05-question':12.43,'05b-reponse':15.21,'06-appris':9.095,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-billets':.8,'02-centimes':1.2,'03-gros':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bi,ce,gr,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tUne=m0('Une'), tDame=m0('dame'), tThon=m0('thon'), tTreize=m0('treize'), tPayer=m0('payer'), tPile=m0('pile');
  const mb=(w,n=1)=>mot('01-billets',w,n), tEurB=mb('euros'), tDixB=mb('dix'), tDeuxB=mb('deux'), tUnB=mb('un',2), tTreizeB=mb('Treize');
  const mc=(w,n=1)=>mot('02-centimes',w,n), tCentC=mc('centimes'), tCinqC=mc('cinquante'), tPlusC=mc('plus'), tVingtC=mc('vingt'), tPlusC2=mc('plus',2), tCinqC2=mc('cinq'), tSQC=mc('soixante-quinze'), tTreizeC=mc('Treize'), tPileC=mc('pile');
  const mg=(w,n=1)=>mot('03-gros',w,n), tGros=mg('gros'), tGrosse=mg('grosse'), tDepasser=mg('dépasser');
  const mq1=(w,n=1)=>mot('04-question',w,n), tVingtQ=mq1('vingt'), tDeuxQ=mq1('deux'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDeux1=mr1('Deux'), tCents1=mr1('cents'), tVingt1=mr1('Vingt'), tQuarante1=mr1('quarante'), tCents1b=mr1('cents',2), tDix1=mr1('dix');
  const mq2=(w,n=1)=>mot('05-question',w,n), tHuitQ=mq2('huit'), tTasQ=mq2('tas'), tAQ=mq2('A'), tBQ=mq2('B'), tCQ=mq2('C');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tCinq2=mr2('Cinq'), tSept2=mr2('sept'), tHuit2=mr2('huit'), tVingt2=mr2('Vingt'), tQuar2=mr2('quarante'), tHuit2b=mr2('Huit',2), tB2=mr2('B'), tC2=mr2('C');
  const ma=(w,n=1)=>mot('06-appris',w,n), tEurA=ma('euros'), tBilA=ma('billets'), tCentA=ma('centimes'), tToujA=ma('Toujours');
  const finTitre=tUne-.08;

  const thon=(c,T,x,y,L=380,z=1)=>poissonE(c,x,y,L,'#868e96',{T,z,ray:'#495057'});
  const EUROS=[['10€',250,40],['2€',440,46],['1€',560,46]], CENTS=[['50c',700,50],['20c',810,50],['5c',910,50]];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris */
      quaiBoisE(c,T,40);
      plaqueCe2E(c,'1. les euros',270,150,58,T,tEurA,EUR_CE2); plaqueCe2E(c,'2. les centimes',790,150,58,T,tCentA,CEN_CE2);
      if(T>=tBilA) tasCe2E(c,['10€','2€','1€'],90,330,36,96,{zs:[0,1,2].map(k=>zoom(T,tBilA+k*.15,.4))});
      if(T>=tCentA) tasCe2E(c,['50c','20c','5c'],640,330,48,112,{zs:[0,1,2].map(k=>zoom(T,tCentA+k*.15,.4))});
      if(T>=tToujA){ plaqueCe2E(c,"le plus gros d'abord",528,560,64,T,tToujA,CRAIE.ok); }
      tab.maj(); return; }

    if(T>=q2){ /* payer 8,40 € : quel tas ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T>=tHuitQ) ardoiseVCe2E(c,'8,40 €',250,90,62,{z:zoom(T,tHuitQ,.5)});
      const TAS=[['A',['5€','2€','1€','20c','20c'],tAQ,'8,40 €',tHuit2b,CRAIE.ok],['B',['5€','2€','20c','20c'],tBQ,'7,40 €',tB2,CRAIE.faux],['C',['5€','2€','1€','20c','2c'],tCQ,'8,22 €',tC2,CRAIE.faux]];
      TAS.forEach(([L,noms,tL,somme,tS,coul],k)=>{ const y=235+k*165; if(T<tTasQ) return;
        const bon=T>=r2&&k===0, lu=bon&&T>=tA2?.5:0;
        if(lu){ c.fillStyle='rgba(255,212,59,.22)'; c.beginPath(); c.roundRect(14,y-62,456,124,24); c.fill(); }
        ecrire(c,L,40,y,56*Math.max(1,zoom(T,tL,.5)),T>=tL&&T<tL+.8?CRAIE.jaune:CRAIE.blanc);
        const X=tasCe2E(c,noms,82,y,24,60,{zs:noms.map((_,j)=>zoom(T,tTasQ+k*.2+j*.06,.4))});
        if(T>=r2&&k===0){ [tCinq2,tSept2,tHuit2,tVingt2,tQuar2].forEach((t,j)=>{ if(T>=t&&T<tHuit2b) etiquette(c,['5','7','8','20','40'][j],X[j],y-52,T,t,j<3?EUR_CE2:CEN_CE2,30); }); }
        if(T>=r2&&T>=tS) prixVCe2E(c,somme,300,y+66,40,{z:zoom(T,tS,.5),une:coul,fond:1}); });
      tab.maj(); return; }

    if(T>=q1){ /* 2 € en pièces de 20 c (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r1){ if(T>=tDeuxQ) prixVCe2E(c,'2 € = ?',240,110,96,{z:zoom(T,tDeuxQ,.5),fond:1});
        if(T>=tVingtQ) for(let k=0;k<5;k++) centimeE(c,20,110+k*62,380-(k%2)*30,52,{z:zoom(T,tVingtQ+k*.08,.4)});
        if(T>=tVingtQ) ecrire(c,'?',240,560,130*zoom(T,tComb1+2,.5),CRAIE.jaune); }
      else {
        prixVCe2E(c,'2 € = 200 c',240,110,84,{z:zoom(T,tDeux1,.5),fond:1});
        /* dix pièces de 20 c, une à une : 20, 40, … 200 */
        for(let k=0;k<10;k++){ const t=tVingt1+k*(tCents1b-tVingt1)/9; if(T<t) continue;
          const x=80+(k%5)*80, y=290+Math.floor(k/5)*120; centimeE(c,20,x,y,42,{z:zoom(T,t,.4)});
          if(k===0||k===1||k===9) ecrire(c,String((k+1)*20),x,y-58,34,CEN_CE2); }
        if(T>=tVingt1+(tCents1b-tVingt1)*2/9&&T<tCents1b) ecrire(c,'…',240,232,40,CEN_CE2);
        if(T>=tDix1) calculVCe2E(c,T,240,560,['10 × 20 c','=','200 c'],[tDix1,tDix1+.2,tDix1+.4],56); }
      tab.maj(); return; }

    if(T>=gr){ /* le plus gros d'abord */
      quaiBoisE(c,T,40);
      tasCe2E(c,['10€','2€','1€','50c','20c','5c'],60,360,42,118);
      if(T>=tGros){ const u=entreE(T,tGros,tGros+1); c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.moveTo(90,230); c.lineTo(90+880*u,230); c.stroke();
        if(u>=1){ c.fillStyle=CRAIE.jaune; c.beginPath(); c.moveTo(990,230); c.lineTo(955,208); c.lineTo(955,252); c.closePath(); c.fill(); }
        plaqueCe2E(c,"le plus gros d'abord",528,130,62,T,tGros,CRAIE.jaune); }
      if(T>=tDepasser) plaqueCe2E(c,'sans dépasser',528,560,62,T,tDepasser,CRAIE.ok);
      tab.maj(); return; }

    if(T>=bi){ /* les euros, puis les centimes */
      quaiBoisE(c,T,40);
      ardoiseVCe2E(c,'13,75 €',528,90,66,{lueur:T>=tTreizeC?.5:0});
      const tsE=[tDixB,tDeuxB,tUnB], tsC=[tCinqC,tVingtC,tCinqC2];
      if(T>=tEurB) ecrire(c,'les euros',400,190,48,EUR_CE2);
      EUROS.forEach(([n,x,t],k)=>{ if(T>=tsE[k]){ const p=sautE([x,-60],[x,300],entreE(T,tsE[k],tsE[k]+.5),40); argentCe2E(c,n,p[0],p[1],t,{grand:1}); } });
      formuleE(c,T,380,430,['10','+','2','+','1','=','13'],[tDixB,tDeuxB-.1,tDeuxB,tUnB-.1,tUnB,tTreizeB,tTreizeB],50,[EUR_CE2,CRAIE.blanc,EUR_CE2,CRAIE.blanc,EUR_CE2,CRAIE.blanc,CRAIE.ok]);
      if(T>=tTreizeB) prixVCe2E(c,'13 €',400,530,70,{z:zoom(T,tTreizeB,.5),fond:1});
      if(T>=tCentC) ecrire(c,'les centimes',810,190,48,CEN_CE2);
      CENTS.forEach(([n,x,t],k)=>{ if(T>=tsC[k]){ const p=sautE([x,-60],[x,300],entreE(T,tsC[k],tsC[k]+.5),40); argentCe2E(c,n,p[0],p[1],t); } });
      formuleE(c,T,820,430,['50','+','20','+','5','=','75'],[tCinqC,tPlusC,tVingtC,tPlusC2,tCinqC2,tSQC,tSQC],50,[CEN_CE2,CRAIE.blanc,CEN_CE2,CRAIE.blanc,CEN_CE2,CRAIE.blanc,CRAIE.ok]);
      if(T>=tSQC) prixVCe2E(c,'75 c',810,530,70,{z:zoom(T,tSQC,.5),fond:1});
      if(T>=tTreizeC){ prixVCe2E(c,'13,75 €',600,650,84,{z:zoom(T,tTreizeC,.5)}); if(T>=tPileC) coche(c,800,650,.55); }
      tab.maj(); return; }

    /* le marché : la dame devant un beau thon (13,75 €), elle ouvre son porte-monnaie */
    quaiBoisE(c,T,140); etalE(c,40,640,560,{toile:false});
    if(T>=tThon) thon(c,T,340,500,380,zoom(T,tThon,.4));
    if(T>=tTreize) ardoiseVCe2E(c,'13,75 €',340,270,84,{z:zoom(T,tTreize,.5)});
    if(T>=tDame) dameE(c,860,705,1.15,{tend:T>=tPayer?1:0,T});
    if(T>=tPayer) porteMonnaieE(c,730,560,150,entreE(T,tPayer,tPile+.5));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Compte'); const phrase2b=qb('Compte bien chaque tas.'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('Combien de pièces de 20 c pour faire 2 € ?',[tComb1,mq1('de'),mq1('pièces'),mq1('de',2),tVingtQ,mq1('centimes'),mq1('pour'),mq1('faire'),tDeuxQ,mq1('euros'),mq1('euros')])],pause:pause1,
      choix:[['20',tqa('A'),tqa('vingt',2)],['2',tqa('B'),tqa('deux',2)],['10',tqa('C'),tqa('dix')]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('2 € = 200 c',[tDeux1,mr1('euros'),tCents1,tCents1,mr1('centimes')]),phraseE('10 pièces',[tDix1,mr1('pièces')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:[phraseE('Pour payer 8,40 €, quel tas ?',[mq2('Pour'),mq2('payer'),tHuitQ,mq2('euros'),mq2('quel'),tTasQ,tTasQ]),phrase2b],pause:pause2,
      choix:[['le tas A',tqb('A'),tqb('A')+.5],['le tas B',tqb('B'),tqb('B')+.5],['le tas C',tqb('C'),tqb('C')+.5]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],reponse:[phraseE('8 € et 40 c = 8,40 €',[tHuit2,mr2('euros'),tVingt2,tQuar2,mr2('centimes'),tHuit2b,tHuit2b,mr2('euros',2)])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-centimes')-.3,'Payer<br>pile');
  return { clips,FIN,titre:'Le beau thon',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,bi,ce,gr,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tTreizeC&&T<gr)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
