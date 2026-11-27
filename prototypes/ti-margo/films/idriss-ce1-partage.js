/* ============================================================
   Série Idriss le pêcheur — SHORT 04 : « Les quatre chats » (micro ce1_division_partage), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2/3-dessins.js + idriss-dessins.js (socle CP gardé : ce1-commun.js en est une copie).
   Voix : manim/voix/idriss-ce1-partage-short.json.
   Idriss rapporte 8 sardines, 4 chats attendent : combien chacun, pour que chacun en ait autant ?
   Bonne réponse C (2). Ceinture blanche. Commentaire : 20 billes pour 4 enfants ?
   ⭐ Comme le short 01 : Ti Margo petit à gauche, la carte à droite sous l'ardoise.
   ============================================================ */
FILMS['ce1-partage']=function(outils){
  const DUR={'00-accroche':7.25,'01-question':13.66,'01b-reponse':8.54,'02-commentaire':9.615,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tIdriss=m0('Idriss'), tHuit=m0('huit'), tSard=m0('sardines'), tQuatre=m0('Quatre'), tChats=m0('chats'), tQueue=m0('queue');
  const mq=w=>mot('01-question',w), tChaque=mq('chaque'), tAutant=mq('autant'), tComb=mq('combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tD=[mr('Deux'),mr('deux',2),mr('deux',3),mr('deux',4)], tHuitR=mr('huit'), tChaqueR=mr('Chaque'), tRonron=mr('Ronron');
  const mc=w=>mot('02-commentaire',w), tVingt=mc('vingt'), tQuatreC=mc('quatre'), tEnf=mc('enfants'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tIdriss-.08;

  /* les 8 sardines en haut ; les 4 chats assis sur le quai ; dans la réponse, 2 sardines filent devant chaque chat, tour après tour */
  const SARD=k=>[125+k*115,190+(k%2)*28], CHX=[150,395,640,885], CHY=600;
  const DEVANT=(j,m)=>[CHX[j]+90+(m?40:-40),CHY+80];
  const chatDe=k=>k%4, rangDe=k=>Math.floor(k/4); /* sardine k → chat k%4, au tour k/4 */
  const quand=k=>tD[chatDe(k)]-.25+rangDe(k)*.18;
  const SILVER='#a5d8ff';

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 20 billes pour 4 enfants */
      quaiBoisE(c,T,40);
      if(T>=tVingt) for(let k=0;k<20;k++) billeE(c,170+(k%10)*80,190+Math.floor(k/10)*78,30,COUL_BILLE[k%5],zoom(T,tVingt+k*.03,.4));
      if(T>=tEnf) for(let j=0;j<4;j++) enfantE(c,170+j*240,690,1.25,{k:j,T});
      if(T>=tVingt) etiquette(c,'20',70,230,T,tVingt,CRAIE.jaune,56);
      if(T>=tQuatreC) etiquette(c,'4',990,470,T,tQuatreC,'#74c0fc',56);
      if(T>=tCombC) ecrire(c,'?',990,250,150*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    if(T>=tChats) for(let j=0;j<4;j++){ const lu=T>=r&&T>=tChaqueR&&T<tRonron+1?.5+.5*Math.sin(T*4+j):0;
      chatE(c,CHX[j]-40,CHY+40,1.05,{dir:1,z:zoom(T,tChats+j*.1,.4),lueur:lu,T}); }
    for(let k=0;k<8;k++){ if(T<tHuit) break; let p=SARD(k), L=130;
      if(T>=r){ const u=entreE(T,quand(k),quand(k)+.4); p=sautE(SARD(k),DEVANT(chatDe(k),rangDe(k)),u,90); L=130-30*u; }
      poissonE(c,p[0],p[1],L,SILVER,{dir:k%2?-1:1,T,k,z:zoom(T,tHuit+k*.06,.4),ray:'#495057'}); }
    if(T<r){
      if(T>=tSard) etiquette(c,'8',60,110,T,tSard,CRAIE.jaune,60);
      if(T>=tQuatre) etiquette(c,'4',1000,420,T,tQuatre,'#74c0fc',60);
      if(T>=tComb) ecrire(c,'?',530,350,150*zoom(T,tComb,.5),CRAIE.jaune); }
    else {
      for(let j=0;j<4;j++) if(T>=tD[j]+.25) etiquette(c,'2',CHX[j]+90,CHY+150,T,tD[j]+.25,CRAIE.ok,44);
      formuleE(c,T,528,150,['2','+','2','+','2','+','2','=','8'],[tD[0],tD[1],tD[1],tD[2],tD[2],tD[3],tD[3],tHuitR,tHuitR],86,
        [CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
      if(T>=tRonron) for(let j=0;j<4;j++) coeurE(c,CHX[j]+60,CHY-160-14*Math.sin((T-tRonron)*3+j),22*zoom(T,tRonron+j*.12,.5)); }
    tab.maj();
  }
  function coeurE(c,x,y,r){ if(r<=0) return; c.fillStyle='#ff6b6b'; c.beginPath(); c.moveTo(x,y+r);
    c.bezierCurveTo(x-r*1.6,y-r*.2,x-r*.6,y-r*1.4,x,y-r*.5); c.bezierCurveTo(x+r*.6,y-r*1.4,x+r*1.6,y-r*.2,x,y+r); c.fill(); }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Pour que chaque chat en ait autant, combien de sardines chacun ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('2 + 2 + 2 + 2 = 8',[tD[0],tD[1],tD[1],tD[2],tD[2],tD[3],tD[3],tHuitR,tHuitR]);

  poserMiniature(outils,q-.3,'Autant pour<br>chaque chat ?',ardoiseMini([['8 sardines'],['4 chats','#74c0fc']]));
  return { clips,FIN,titre:'Les quatre chats',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['4',tq('A'),tq('quatre')],['6',tq('B'),tq('six')],['2',tq('C'),tq('deux')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1,phraseE('2 chacun !',[tChaqueR,tChaqueR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tQueue?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tRonron?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
