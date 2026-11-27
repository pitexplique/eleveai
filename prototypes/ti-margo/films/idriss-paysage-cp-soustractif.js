/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 02 : « Le chat du port » (micro cp_probleme_soustractif), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2/3-dessins.js + idriss-dessins.js.
   Voix : manim/voix/idriss-cp-soustractif-paysage.json.
   Neuf poissons sur l'étal d'Idriss, le chat du port en vole deux : il en reste 7, 9 − 2 = 7.
   Questions : 8 coquillages, une vague en emporte 3 → A (5) ; 10 hameçons, 4 tombent dans l'eau → A (6).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['cp-soustractif']=function(outils){
  const DUR={'00-accroche':11.22,'01-vol':7.995,'02-reste':8.105,'03-mots':7.03,'04-question':16.17,'04b-reponse':8.27,
    '05-question':17.18,'05b-reponse':8.55,'06-appris':7.67,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-vol':.8,'02-reste':1.2,'03-mots':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,vo,re,mo,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tSur=m0('Sur'), tEtal=m0('étal'), tNeuf=m0('neuf'), tAlign=m0('alignés'), tMais=m0('Mais'), tCaisse=m0('caisse'), tRegarde=m0('regarde'), tMiaou=m0('Miaou');
  const mv=w=>mot('01-vol',w), tHop=mv('Hop'), tFile=mv('file'), tDeuxV=mv('deux'), tGratte=mv('gratte'), tCombV=mv('combien');
  const mre=(w,n=1)=>mot('02-reste',w,n);
  const tCompte=mre('compte'), CPT=['un','deux','trois','quatre','cinq','six','sept'].map(w=>mre(w)), tNeufR=mre('Neuf'), tMoinsR=mre('moins'), tDeuxR=mre('deux',2), tSeptR=mre('sept',2);
  const mm=w=>mot('03-mots',w), tEnleve=mm('enlève'), tReste=mm('reste'), tRetire=mm('retire'), tSoustr=mm('soustraction');
  const mq1=w=>mot('04-question',w), tHuitQ=mq1('Huit'), tVague=mq1('vague'), tEmp=mq1('emporte'), tTroisQ=mq1('trois'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tHuit1=mr1('Huit'), tEnl1=mr1('enlève'), tTrois1=mr1('trois'), tS7=mr1('sept'), tS6=mr1('six'), tC5=mr1('cinq'), tIl1=mr1('Il'), tC5b=mr1('cinq',2);
  const mq2=w=>mot('05-question',w), tDixQ=mq2('dix'), tTomber=mq2('tomber'), tQuatreQ=mq2('quatre'), tEau=mq2("l'eau"), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tDix2=mr2('Dix'), tMoins2=mr2('moins'), tQuatre2=mr2('quatre'), tSix2=mr2('six'), tLes=mr2('Les'), tPoissons2=mr2('poissons');
  const ma=w=>mot('06-appris',w), tEnlA=ma('enlève'), tResteA=ma('reste'), tRetA=ma('retire');
  const finTitre=tSur-.08;

  /* l'étal : un plateau de glace sur la table, 9 poissons en 3 rangs de 3 ; la caisse à droite, Idriss entre les deux */
  const EX0=40, EX1=620, EY=540, FL=150;
  const POS=k=>[130+(k%3)*200,330+Math.floor(k/3)*80];
  const VOLES=[7,8]; /* les deux que prend le chat : le dernier rang, à droite */
  const CAX=945, CAY=650, CAW=210, CAH=170;
  function etal(c,T,n,{lueur=null,cache=[]}={}){
    etalE(c,EX0,EX1,EY);
    c.fillStyle='#d0ebff'; c.strokeStyle='#74c0fc'; c.lineWidth=4; c.beginPath(); c.roundRect(EX0+16,270,EX1-EX0-32,EY-270,14); c.fill(); c.stroke();
    c.fillStyle='rgba(255,255,255,.6)'; for(let k=0;k<14;k++){ c.beginPath(); c.arc(EX0+40+(k*97)%(EX1-EX0-80),290+(k*53)%230,6,0,7); c.fill(); }
    for(let k=0;k<n;k++){ if(cache.includes(k)) continue; const [x,y]=POS(k);
      poissonE(c,x,y,FL,COUL_POISSON[k],{dir:k%2?-1:1,T,k,z:zoom(T,tNeuf+k*.06,.4),lueur:lueur?lueur(k):0}); } }
  function formule(c,T,x0,y,txt,ts,taille=96,cols=[CRAIE.jaune,CRAIE.blanc,'#ff8787',CRAIE.blanc,CRAIE.ok]){ const d=taille*.98;
    txt.forEach((s,k)=>{ if(T>=ts[k]) ecrire(c,s,x0+(k-2)*d+(k===4&&s.length>1?taille*.2:0),y,taille*(k===4?1.08*zoom(T,ts[k],.4):1),cols[k]); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : l'étal, 2 poissons qui s'en vont, 9 − 2 = 7 */
      quaiBoisE(c,T,140); etal(c,T,9,{cache:VOLES});
      const u=entreE(T,tEnlA,tEnlA+1.2);
      VOLES.forEach((k,j)=>{ const [x,y]=POS(k); poissonE(c,x+(860-x)*douxE(u),y-40*Math.sin(Math.PI*u),FL,COUL_POISSON[k],{dir:1,T,k,z:1-.5*u}); });
      if(T>=tEnlA) lienE(c,[POS(8)[0]+80,POS(8)[1]-60],[900,260],entreE(T,tEnlA,tEnlA+.6),CRAIE.jaune);
      if(T>=tRetA) formule(c,T,840,200,['9','−','2','=','7'],[tRetA,tRetA,tRetA,tRetA,tRetA],80);
      tab.maj(); return; }

    if(T>=q2){ /* 10 hameçons sur deux fils, la mer en bas ; 4 tombent dans l'eau (tout à gauche : x < 480) */
      c.fillStyle='#a47148'; c.fillRect(0,0,1056,540); c.strokeStyle='#7a4f2a'; c.lineWidth=3; for(let y=50;y<540;y+=60){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); }
      merE(c,T,540); c.fillStyle='#1c7ed6'; c.fillRect(0,620,1056,100);
      const H=k=>[75+(k%5)*88,k<5?130:330], TOMBE=[6,7,8,9], tT=[tDix2,tDix2+.4,tMoins2+.2,tQuatre2+.3];
      c.strokeStyle='#f8f9fa'; c.lineWidth=3; for(const y of [130,330]){ c.beginPath(); c.moveTo(30,y-12); c.lineTo(460,y-12); c.stroke(); }
      for(let k=0;k<10;k++){ if(T<tDixQ) break; let [x,y]=H(k), a=0, z=zoom(T,tDixQ+k*.05,.4);
        const j=TOMBE.indexOf(k), lu=(j>=0&&T>=tQuatreQ&&T<r2)?.5+.5*Math.sin(T*5):(T>=r2&&T>=tSix2&&j<0?.5+.5*Math.sin(T*5):0);
        if(j>=0&&T>=r2){ const u=entreE(T,tT[j],tT[j]+.5); if(u>=1){ ploufE(c,x,575,entreE(T,tT[j]+.5,tT[j]+1.6)); continue; } y+=(575-y)*u*u; a=u*2.5; }
        hameconE(c,x,y,150,{z,a,lueur:lu}); }
      if(T<r2){ if(T>=tDixQ) etiquette(c,'10',250,60,T,tDixQ,CRAIE.jaune,56);
        if(T>=tQuatreQ) etiquette(c,'4',455,505,T,tQuatreQ,'#ff8787',56);
        if(T>=tComb2) ecrire(c,'?',250,505,110*zoom(T,tComb2,.5),CRAIE.jaune); }
      else formule(c,T,250,52,['10','−','4','=','6'],[tDix2,tMoins2,tQuatre2,tSix2,tSix2],74,[CRAIE.jaune,CRAIE.blanc,'#ff8787',CRAIE.blanc,CRAIE.ok]);
      if(T>=r2&&T>=tPoissons2) for(const [x,y]of [[40,250],[470,230]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      tab.maj(); return; }

    if(T>=q1){ /* 8 coquillages sur le quai ; la vague en emporte 3 (à gauche de la carte) */
      quaiBoisE(c,T,60);
      const S=k=>[72+(k%4)*112,k<4?340:520], PRIS=[1,2,3], tP=[tC5,tS6,tS7]; /* le 3 part à « sept », le 2 à « six », le 1 à « cinq » */
      const hv=T<r1?entreE(T,tVague-.2,tVague+.6):1-entreE(T,tC5+.5,tC5+1.3);
      vagueE(c,320,330,420,hv,T);
      for(let k=0;k<8;k++){ if(T<tHuitQ) break; let [x,y]=S(k), z=zoom(T,tHuitQ+k*.06,.4);
        const j=PRIS.indexOf(k);
        if(j>=0&&T>=r1){ const u=entreE(T,tP[j]-.3,tP[j]+.4); if(u>=1) continue; const p=sautE([x,y],[x+40,120],u,30); x=p[0]; y=p[1]; z*=1-.6*u; }
        coquillageE(c,x,y,60,['#ffc9c9','#ffe8cc','#e5dbff','#d3f9d8'][k%4],z,j>=0&&T>=tEmp&&T<r1?.5+.5*Math.sin(T*5):0); }
      if(T<r1){ if(T>=tHuitQ) etiquette(c,'8',60,180,T,tHuitQ,CRAIE.jaune,60);
        if(T>=tTroisQ) etiquette(c,'3',455,150,T,tTroisQ,'#74c0fc',56);
        if(T>=tComb1) ecrire(c,'?',250,640,120*zoom(T,tComb1,.5),CRAIE.jaune); }
      else {
        if(T<tIl1){ const n=T>=tC5?5:T>=tS6?6:T>=tS7?7:8, t0=[tC5,tS6,tS7,tHuit1][[5,6,7,8].indexOf(n)]; if(T>=tHuit1) ecrire(c,String(n),250,640,120*zoom(T,t0,.35),n===5?CRAIE.ok:CRAIE.jaune); }
        else formule(c,T,240,640,['8','−','3','=','5'],[tIl1,tIl1,tIl1,tC5b,tC5b],86,[CRAIE.jaune,CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.ok]); }
      tab.maj(); return; }

    /* l'étal, du début jusqu'aux mots */
    quaiBoisE(c,T,140);
    const parti=T>=tFile+.2; /* les deux poissons sont partis avec le chat */
    idrissE(c,712,705,1.3,{salut:T>=vo&&T>=tGratte&&T<re?.45:0,montre:T>=tEtal&&T<tMais?1:0,T});
    etal(c,T,T>=tNeuf?9:0,{cache:parti||(T>=tHop+.5&&T<re)?VOLES:[],
      lueur:k=>T>=re&&T<mo&&!VOLES.includes(k)&&T>=CPT[Math.min(k,6)]?.7:0});
    /* le chat : les yeux derrière la caisse, puis il bondit sur l'étal (« Hop »), prend 2 poissons et file à droite */
    if(T<vo){ if(T>=tCaisse) yeuxOmbreE(c,CAX,CAY-CAH-30,entreE(T,tRegarde-.3,tRegarde+.3),T);
      if(T>=tMiaou){ const u=douxE(entreE(T,tMiaou-.1,tMiaou+.4)); c.save(); c.beginPath(); c.rect(0,0,1056,CAY-CAH+4); c.clip(); chatE(c,CAX-30,CAY-CAH+110-110*u,1.3,{dir:1}); c.restore(); } }
    caisseE(c,CAX,CAY,CAW,CAH);
    if(T>=vo&&T<re){
      const sur=[POS(7)[0]+60,POS(7)[1]+60], u1=douxE(entreE(T,tHop,tHop+.6)), u2=douxE(entreE(T,tFile,tFile+1.4));
      let p=sautE([CAX-30,CAY-CAH+40],sur,u1,160); if(u2>0) p=sautE(sur,[1300,EY+120],u2,80);
      if(p[0]<1200){ const g=chatE(c,p[0],p[1],1.3,{dir:1,court:u2>0&&u2<1?1:0,T});
        if(T>=tHop+.5) for(const j of [0,1]) poissonE(c,g[0]+20,g[1]+16+j*22,110,COUL_POISSON[VOLES[j]],{dir:1,T,k:j}); }
      if(T>=tGratte) bulleE(c,560,170,190,130,670,250,'?',96);
    }
    /* les nombres */
    if(T<re){ if(T>=tNeuf) etiquette(c,'9',330,215,T,tNeuf,CRAIE.jaune,64);
      if(T>=vo&&T>=tDeuxV) etiquette(c,'2',940,330,T,tDeuxV,'#ff8787',56); }
    else if(T<mo){
      for(let k=0;k<7;k++) if(T>=CPT[k]&&T<tNeufR){ const [x,y]=POS(k); etiquette(c,String(k+1),x+(k%2?12:-12),y+4,T,CPT[k],k===6?CRAIE.ok:CRAIE.jaune,48); }
      if(T>=tNeufR) formule(c,T,330,200,['9','−','2','=','7'],[tNeufR,tMoinsR,tDeuxR,tSeptR,tSeptR],90); }
    else {
      formule(c,T,330,200,['9','−','2','=','7'],[mo,mo,mo,mo,mo],90);
      const u=entreE(T,tEnleve,tEnleve+1.2);
      lienE(c,[POS(8)[0]+80,POS(8)[1]-60],[980,300],entreE(T,tEnleve-.2,tEnleve+.4),CRAIE.jaune);
      VOLES.forEach(k=>{ const [x,y]=POS(k); poissonE(c,x+(960-x)*douxE(u),y-30*Math.sin(Math.PI*u),FL*.8,COUL_POISSON[k],{dir:1,T,k,z:1-.4*u}); });
      if(T>=tReste){ c.fillStyle='rgba(31,59,44,.88)'; c.beginPath(); c.roundRect(150,EY+50,300,80,16); c.fill(); ecrire(c,'il en reste',300,EY+92,54*zoom(T,tReste,.4),CRAIE.jaune); }
      if(T>=tSoustr) for(const [x,y] of [[60,120],[600,110]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien en reste-t-il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien lui en reste-t-il ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=w=>mot('05-question',w)-q2;
  const tqa3=mot('04-question','trois',2)-q1, tqb4=mot('05-question','quatre',2)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['5',tqa('A'),tqa('cinq')],['11',tqa('B'),tqa('onze')],['3',tqa('C'),tqa3]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('8 − 3 = 5',[tHuit1,tEnl1,tTrois1,tC5b,tC5b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['6',tqb('A'),tqb('six')],['14',tqb('B'),tqb('quatorze')],['4',tqb('C'),tqb4]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('10 − 4 = 6',[tDix2,tMoins2,tQuatre2,tSix2,tSix2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-vol')-.5,'Combien en<br>reste-t-il ?');
  return { clips,FIN,titre:'Combien en reste-t-il ?',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,vo,re,mo,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<vo) T>=tMiaou?g.fier():g.montre();
      else if(T<q1) (T>=tSeptR&&T<mo)||(T>=tSoustr&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
