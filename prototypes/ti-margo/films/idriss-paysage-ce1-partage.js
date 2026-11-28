/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 04 : « Les trois paniers » (micro ce1_division_partage), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2/3-dessins.js + idriss-dessins.js (socle CP gardé).
   Voix : manim/voix/idriss-ce1-partage-paysage.json.
   Le soir, 12 poissons pour 3 voisins : un dans chaque panier, tour après tour → 4 chacun ; 4 + 4 + 4 = 12, 3 × 4 = 12.
   Questions : 10 crabes dans 2 seaux → B (5) ; 15 coquillages pour 3 enfants → A (5).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-partage']=function(outils){
  const DUR={'00-accroche':10.66,'01-distribue':7.645,'02-resultat':7.495,'03-verif':8.775,'04-question':15.695,'04b-reponse':7.47,
    '05-question':15.09,'05b-reponse':7.635,'06-appris':7.53,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-distribue':.8,'02-resultat':1.2,'03-verif':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,di,re,ve,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tCe=m0('Ce'), tSoir=m0('soir'), tDouze=m0('douze'), tAutant=m0('autant'), tTrois=m0('trois'), tVoisins=m0('voisins'), tComb=m0('Combien'), tPanier=m0('panier');
  const md=(w,n=1)=>mot('01-distribue',w,n), tCartes=md('cartes'), tUn=md('un'), tEnc1=md('encore'), tEnc2=md('encore',2), tDernier=md('dernier');
  const mre=(w,n=1)=>mot('02-resultat',w,n), tQuatreR=mre('quatre'), tDouzeR=mre('Douze'), tTroisR=mre('trois'), tEgales=mre('égales'), tQuatreR2=mre('quatre',2);
  const mv=(w,n=1)=>mot('03-verif',w,n), tV4=[mv('quatre'),mv('quatre',2),mv('quatre',3)], tVp=[mv('plus'),mv('plus',2)], tV12=mv('douze'), tVTrois=mv('Trois'), tVFois=mv('fois'), tV4b=mv('quatre',4), tV12b=mv('douze',2), tJuste=mv('juste');
  const mq1=w=>mot('04-question',w), tDixQ=mq1('Dix'), tDeuxQ=mq1('deux'), tSeaux=mq1('seaux'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tC1=mr1('Cinq'), tC1b=mr1('cinq',2), tC1c=mr1('Cinq',3), tPlus1=mr1('plus'), tC1d=mr1('cinq',4), tDix1=mr1('dix');
  const mq2=w=>mot('05-question',w), tQuinzeQ=mq2('Quinze'), tTroisQ=mq2('trois'), tEnfQ=mq2('enfants'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tC2=[mr2('Cinq'),mr2('cinq',2),mr2('cinq',3)], tQuinze2=mr2('quinze'), tChaque2=mr2('Chaque');
  const ma=w=>mot('06-appris',w), tPartA=ma('partager'), tDistA=ma('distribue'), tVerA=ma('vérifie'), tAutantA=ma('autant');
  const finTitre=tCe-.08;

  /* le soir sur le port : 12 poissons en deux rangs ; trois paniers à rubans (rouge, vert, jaune) */
  const PX=[220,528,836], PY=690, PW=250, RUB=['#e03131','#2f9e44','#fcc419'];
  const POISSON=k=>[150+(k%6)*150,190+Math.floor(k/6)*85];
  /* le poisson k va dans le panier k%3, il y est le (k/3)-ième ; quatre tours : « un poisson… », « encore un », « encore un », « jusqu'au dernier » */
  const TOURS=[tUn,tEnc1+.3,tEnc2+.3,tDernier-.2];
  const quand=k=>TOURS[Math.floor(k/3)]+(k%3)*.16;
  const DANS=(j,m)=>[PX[j]+(m%2?42:-42),PY-PW*.55-14-Math.floor(m/2)*44];
  function soir(c,T){ soleilCouchant(c,880,140,70,1); merE(c,T,140); quaiBoisE(c,T,140); c.fillStyle='rgba(255,146,43,.12)'; c.fillRect(0,0,1056,720); }
  function paniers(c,T,lueur=0){ PX.forEach((x,j)=>{ panierE(c,x,PY,PW); rubanE(c,x,PY-PW*.55-PW*.42,RUB[j],1);
    if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.25*lueur})`; c.beginPath(); c.ellipse(x,PY-90,150,130,0,0,7); c.fill(); } }); }
  function poissonsRanges(c,T,n,{zT=-1}={}){ for(let k=0;k<n;k++){ const [x,y]=DANS(k%3,Math.floor(k/3)); poissonE(c,x,y,110,COUL_POISSON[k%10],{dir:k%2?-1:1,T,k}); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : les trois paniers de 4 */
      soir(c,T); paniers(c,T,T>=tVerA?.5+.5*Math.sin(T*4):0);
      for(let k=0;k<12;k++){ const [x,y]=DANS(k%3,Math.floor(k/3)); poissonE(c,x,y,110,COUL_POISSON[k%10],{dir:k%2?-1:1,T,k,lueur:T>=tDistA&&T<tVerA?.4:0}); }
      PX.forEach((x,j)=>etiquette(c,'4',x,PY-PW*.55-190,T,ap+.3,CRAIE.ok,50));
      formuleE(c,T,528,170,['4','+','4','+','4','=','12'],[tPartA,tPartA,tPartA,tPartA,tPartA,tPartA,tPartA],80,[CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
      tab.maj(); return; }

    if(T>=q2){ /* 15 coquillages pour 3 enfants (x < 480) */
      quaiBoisE(c,T,40);
      const EX=[90,240,390], AV=(j,m)=>[EX[j]-36+(m%3)*36,640-Math.floor(m/3)*34+ (m%3===1?-8:0)];
      for(let j=0;j<3;j++) if(T>=tEnfQ) enfantE(c,EX[j],560,1.05,{k:j+1,T,bras:T>=r2&&T>=tChaque2?1:0,lueur:T>=r2&&T>=tC2[j]&&T<tChaque2?.6:0});
      for(let k=0;k<15;k++){ if(T<tQuinzeQ) break; let p=[70+(k%5)*85,150+Math.floor(k/5)*80], rr=34;
        if(T>=r2){ const t0=r2+.7+k*.07, u=entreE(T,t0,t0+.35); p=sautE(p,AV(k%3,Math.floor(k/3)),u,60); rr=34-12*u; }
        coquillageE(c,p[0],p[1],rr,['#ffc9c9','#ffe8cc','#e5dbff','#d3f9d8','#fff3bf'][k%5],zoom(T,tQuinzeQ+k*.04,.4)); }
      if(T<r2){ if(T>=tQuinzeQ) etiquette(c,'15',450,70,T,tQuinzeQ,CRAIE.jaune,50);
        if(T>=tTroisQ) etiquette(c,'3',455,420,T,tTroisQ,'#74c0fc',50);
        if(T>=tComb2) ecrire(c,'?',240,650,110*zoom(T,tComb2,.5),CRAIE.jaune); }
      else { EX.forEach((x,j)=>{ if(T>=tC2[j]) etiquette(c,'5',x,330,T,tC2[j],CRAIE.ok,46); });
        formuleE(c,T,240,70,['5','+','5','+','5','=','15'],[tC2[0],tC2[1],tC2[1],tC2[2],tC2[2],tQuinze2,tQuinze2],68,[CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]); }
      tab.maj(); return; }

    if(T>=q1){ /* 10 crabes, 2 seaux (x < 480) */
      quaiBoisE(c,T,40);
      const SX=[130,350], SW=190, DS=(j,m)=>[SX[j]-50+(m%3)*50,690-SW*.72-24-Math.floor(m/3)*44];
      SX.forEach((x,j)=>seauCoulE(c,x,690,SW,j?'#1c7ed6':'#e03131',j?'#0b3d6b':'#a61e1e'));
      for(let k=0;k<10;k++){ if(T<tDixQ) break; let p=[70+(k%5)*85,170+Math.floor(k/5)*95], s=.62;
        if(T>=r1){ const t0=tC1-.3+k*.14, u=entreE(T,t0,t0+.35); p=sautE(p,DS(k%2,Math.floor(k/2)),u,70); s=.62-.14*u; }
        crabeE(c,p[0],p[1],s,{z:zoom(T,tDixQ+k*.05,.4),T,k,marche:T<r1?1:0}); }
      if(T<r1){ if(T>=tDixQ) etiquette(c,'10',450,70,T,tDixQ,CRAIE.jaune,50);
        if(T>=tSeaux) etiquette(c,'2',455,520,T,tSeaux,'#74c0fc',50);
        if(T>=tComb1) ecrire(c,'?',240,385,110*zoom(T,tComb1,.5),CRAIE.jaune); }
      else { if(T>=tC1+.9) etiquette(c,'5',SX[0],350,T,tC1+.9,CRAIE.ok,46); if(T>=tC1b) etiquette(c,'5',SX[1],350,T,tC1b,CRAIE.ok,46);
        formuleE(c,T,240,70,['5','+','5','=','10'],[tC1c,tPlus1,tC1d,tDix1,tDix1],76,[CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]); }
      tab.maj(); return; }

    /* le soir : 12 poissons, 3 paniers ; la distribution ; le résultat ; la vérification */
    soir(c,T);
    if(T>=tTrois||T>=di) paniers(c,T,T>=re&&T<ve&&T>=tQuatreR?.5+.5*Math.sin(T*4):0);
    let n=0;
    for(let k=0;k<12;k++){ if(T<tDouze) break; let p=POISSON(k), L=120;
      if(T>=di){ const u=entreE(T,quand(k),quand(k)+.4); if(u>0){ p=sautE(POISSON(k),DANS(k%3,Math.floor(k/3)),u,120); L=120-10*u; } if(u>=1) n++; }
      poissonE(c,p[0],p[1],L,COUL_POISSON[k%10],{dir:k%2?-1:1,T,k,z:zoom(T,tDouze+k*.05,.4)}); }
    if(T<di){ if(T>=tDouze) etiquette(c,'12',70,150,T,tDouze,CRAIE.jaune,56);
      if(T>=tTrois) etiquette(c,'3',990,500,T,tTrois,'#74c0fc',56);
      if(T>=tComb) ecrire(c,'?',528,420,140*zoom(T,tComb,.5),CRAIE.jaune); }
    else if(T<re){ if(n>0) ecrire(c,String(n),960,330,110*zoom(T,quand(n-1)+.4,.35),n===12?CRAIE.ok:CRAIE.jaune); }
    else if(T<ve){
      PX.forEach((x,j)=>{ if(T>=tQuatreR) etiquette(c,'4',x,PY-PW*.55-190,T,tQuatreR+j*.15,CRAIE.ok,50); });
      formuleE(c,T,528,180,['12','en 3','→','4'],[tDouzeR,tTroisR,tQuatreR2,tQuatreR2],88,[CRAIE.jaune,'#74c0fc',CRAIE.blanc,CRAIE.ok]); }
    else {
      PX.forEach((x,j)=>etiquette(c,'4',x,PY-PW*.55-190,T,ve,CRAIE.ok,50));
      formuleE(c,T,528,120,['4','+','4','+','4','=','12'],[tV4[0],tVp[0],tV4[1],tVp[1],tV4[2],tV12,tV12],80,[CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
      formuleE(c,T,528,230,['3','×','4','=','12'],[tVTrois,tVFois,tV4b,tV12b,tV12b],80,['#74c0fc',CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
      if(T>=tJuste) for(const [x,y] of [[160,110],[900,110]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Dix crabes, à partager dans deux seaux, autant dans chacun.'); const phrase1=[qa('Combien par seau ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Quinze coquillages pour trois enfants, autant chacun.'); const phrase2=[qb('Combien chacun ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:[phraseE('10 crabes, 2 seaux.',[tDixQ,mq1('crabes'),tDeuxQ,tSeaux]),...phrase1],pause:pause1,
      choix:[['8',tqa('A'),tqa('huit')],['5',tqa('B'),tqa('cinq')],['12',tqa('C'),tqa('douze')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],reponse:[phraseE('5 + 5 = 10',[tC1c,tPlus1,tC1d,tDix1,tDix1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:[phraseE('15 coquillages, 3 enfants.',[tQuinzeQ,mq2('coquillages'),tTroisQ,tEnfQ]),...phrase2],pause:pause2,
      choix:[['5',tqb('A'),tqb('cinq')],['3',tqb('B'),tqb('trois',2)],['12',tqb('C'),tqb('douze')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('5 + 5 + 5 = 15',[tC2[0],tC2[1],tC2[1],tC2[2],tC2[2],tQuinze2,tQuinze2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-resultat')-.5,'Partager en<br>parts égales');
  return { clips,FIN,titre:'Partager en parts égales',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,di,re,ve,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tEgales&&T<ve)||(T>=tJuste&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
