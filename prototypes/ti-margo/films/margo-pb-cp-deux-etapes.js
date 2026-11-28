/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 03 : « La mangeoire des oiseaux » (micro cp_probleme_deux_etapes), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-deux-etapes-short.json.
   6 oiseaux sur la mangeoire, 4 arrivent, un chat passe et 5 s'envolent. Bonne réponse C (5) : 6 + 4 = 10, puis 10 − 5 = 5.
   Commentaire : 7 billes, j'en gagne 3, j'en perds 2, combien ? Ceinture blanche.
   ============================================================ */

/* La mangeoire à deux étages : un poteau, deux plateaux (y = 290 et 480), un petit toit */
function mangeoire_deux(c){
  c.fillStyle='#8a5a2b'; c.fillRect(516,170,24,440);
  c.fillStyle='#c92a2a'; c.beginPath(); c.moveTo(320,175); c.lineTo(528,95); c.lineTo(736,175); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.moveTo(340,168); c.lineTo(528,100); c.lineTo(716,168); c.lineTo(716,178); c.lineTo(340,178); c.closePath(); c.globalAlpha=.55; c.fill(); c.globalAlpha=1;
  for(const y of [320,510]){ c.fillStyle='#a0522d'; c.beginPath(); c.roundRect(150,y,756,20,6); c.fill();
    c.fillStyle='#c08550'; c.fillRect(150,y-10,12,12); c.fillRect(894,y-10,12,12);
    c.fillStyle='#f4d58d'; for(let k=0;k<22;k++){ c.beginPath(); c.arc(176+k*33,y-3+(k%2)*2,4,0,7); c.fill(); } } }
/* Le jardin en hiver : ciel, neige au sol */
function jardinHiver_deux(c,T){ c.fillStyle='#d0ebff'; c.fillRect(0,0,1056,720); c.fillStyle='#f1f3f5'; c.fillRect(0,580,1056,140);
  c.fillStyle='#dee2e6'; c.beginPath(); c.ellipse(220,585,260,26,0,0,7); c.ellipse(840,590,280,22,0,0,7); c.fill();
  sapinE(c,60,600,.9); sapinE(c,1000,600,.85); neigeE(c,T,1056,720,22); }

FILMS['deux-etapes']=function(outils){
  const DUR={'00-accroche':9.745,'01-question':12.69,'01b-reponse':10.92,'02-commentaire':11.055,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.4,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#titre{font-size:60px;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tSur=m0('Sur'), tSix0=m0('six'), tQuatre0=m0('Quatre'), tArrivent=m0('arrivent'), tChat=m0('chat'), tCinq0=m0('cinq'), tEnvolent=m0("s'envolent");
  const mq=w=>mot('01-question',w), tQRestent=mq('restent');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tSix=mr('Six'), tPlus=mr('plus'), tQuatre=mr('quatre'), tDix=mr('dix'), tDix2=mr('dix',2), tMoins=mr('moins'), tCinq=mr('cinq'), tCinq2=mr('cinq',2), tOiseaux=mr('oiseaux'), tB=mr('B'), tEtape=mr('étape');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tSeptC=mc('sept'), tGagne=mc('gagne'), tTroisC=mc('trois'), tPerds=mc('perds'), tDeuxC=mc('deux'), tCombienC=mc('Combien'), tDis=mc('Dis-le');
  const finTitre=tSur-.08;

  /* les oiseaux : 5 en bas (ils restent), 1 en haut au début, 4 arrivent en haut ; les 5 du haut s'envolent */
  const R0=60, yB=510-R0*1.15-4, yH=320-R0*1.15-4;
  const XS=[218,373,528,683,838];
  const COUL_O=['#4dabf7','#ff8787','#69db7c','#fcc419','#da77f2','#ff922b','#20c997','#748ffc','#f783ac','#a9e34b'];
  const BAS=XS.map(x=>[x,yB]), HAUT=XS.map(x=>[x,yH]);
  function oiseaux(c,T){
    BAS.forEach(([x,y],k)=>{ const t=tSix0+k*.08; if(T<t) return;
      const pique=T>=r&&T>=tCinq2?Math.max(0,Math.sin(T*6+k*1.3))*10:0;
      oiseauE(c,x,y+pique,R0,{coul:COUL_O[k],T,k,dir:k%2?-1:1,z:T>=q?1:zoom(T,t,.4),lueur:T>=r&&T>=tCinq2&&T<tOiseaux+1?.7:0}); });
    if(T>=q) return; /* pendant la question, plus que la mangeoire */
    HAUT.forEach(([x,y],k)=>{ const arrive=k>=1, t=arrive?tQuatre0+(k-1)*.3:tSix0+5*.08; if(T<t-(arrive?1:0)) return;
      let px=x, py=y, ail=0, dir=k%2?1:-1;
      if(arrive){ const u=entreE(T,t-1,t+.3); if(u<1){ const p=sautE([1120,60+k*20],[x,y],u,-80); px=p[0]; py=p[1]; ail=1; dir=-1; } }
      const tv=tCinq0+k*.12; if(T>=tv){ const u=entreE(T,tv,tv+1.1); if(u>=1) return; px=x+(-300-x)*u*u; py=y-380*u; ail=1; dir=-1; }
      oiseauE(c,px,py,R0,{coul:COUL_O[5+k],T,k:k+5,aile:ail,dir,z:arrive?1:zoom(T,t,.4)}); });
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 7 billes, + 3, − 2, « ? » */
      for(let k=0;k<10;k++){ const x=87+k*98, y=340, gagne=k>=7, t=gagne?tTroisC+(k-7)*.15:tSeptC+k*.07; if(T<t) continue;
        const perdue=k>=8&&T>=tDeuxC, u=perdue?entreE(T,tDeuxC+(k-8)*.15,tDeuxC+(k-8)*.15+.8):0;
        c.globalAlpha=perdue?Math.max(.25,1-u):1;
        billeE(c,x,y+u*150,47,COUL_BILLE[k%5],zoom(T,t,.4)); c.globalAlpha=1;
        if(perdue&&u>=1) croixE(c,x,y+150,70,1); }
      if(T>=tSeptC) rondNombreE(c,'7',390,150,52,{z:zoom(T,tSeptC,.5)});
      if(T>=tTroisC) rondNombreE(c,'+3',755,150,52,{z:zoom(T,tTroisC,.5),coul:CRAIE.ok});
      if(T>=tDeuxC) rondNombreE(c,'−2',920,640,52,{z:zoom(T,tDeuxC,.5),coul:'#ff8787'});
      if(T>=tCombienC) ecrire(c,'?',300,590,180*zoom(T,tCombienC,.5),CRAIE.jaune);
      tab.maj(); return; }

    jardinHiver_deux(c,T); mangeoire_deux(c);
    oiseaux(c,T);
    /* le chat passe sur la neige, de gauche à droite */
    if(T>=tChat-.6&&T<q){ const u=entreE(T,tChat-.6,tChat+2.4); chatE(c,-160+1350*u,640,.95,{court:u<1?1:0,T}); }
    /* les nombres de l'histoire */
    if(T>=tSix0) rondNombreE(c,'6',300,655,52,{z:zoom(T,tSix0,.5)});
    if(T>=tQuatre0) rondNombreE(c,'+4',528,655,52,{z:zoom(T,tQuatre0,.5),coul:CRAIE.ok});
    if(T>=tCinq0) rondNombreE(c,'−5',756,655,52,{z:zoom(T,tCinq0,.5),coul:'#ff8787'});
    if(T>=q&&T<r&&T>=tQRestent) ecrire(c,'?',528,250,170*zoom(T,tQRestent,.5),'#e67700');
    if(T>=r){
      if(T>=tSix){ bandeauE(c,528,120,600,130,entreE(T,tSix-.2,tSix+.1));
        formuleE(c,T,528,120,['6','+','4','=','10'],[tSix,tPlus,tQuatre,tDix,tDix],92,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
        if(T>=tB){ c.strokeStyle=CRAIE.jaune; c.lineWidth=7; c.beginPath(); c.roundRect(222,49,612,142,70); c.stroke(); } }
      if(T>=tDix2){ bandeauE(c,528,262,600,130,entreE(T,tDix2-.2,tDix2+.1));
        formuleE(c,T,528,262,['10','−','5','=','5'],[tDix2,tMoins,tCinq,tCinq2,tCinq2],92,[CRAIE.jaune,CRAIE.blanc,'#ff8787',CRAIE.blanc,CRAIE.ok]); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Combien d'oiseaux restent sur la mangeoire ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('6 + 4 = 10',[tSix,tPlus,tQuatre,tDix,tDix]), rep2=phraseE('10 − 5 = 5',[tDix2,tMoins,tCinq,tCinq2,tCinq2]);

  poserMiniature(outils,q-.3,'Deux<br>étapes',ardoiseMini([['6 oiseaux','#ffd43b'],['+ 4'],['− 5']]));
  return { clips,FIN,titre:'La mangeoire des oiseaux',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['15',tq('A'),tq('quinze')],['10',tq('B'),tq('dix')],['5',tq('C'),tq('cinq')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1,rep2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<com){ T>=tCinq2?g.fier():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
