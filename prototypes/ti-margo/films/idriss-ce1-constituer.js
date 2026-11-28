/* ============================================================
   Série Idriss le pêcheur — SHORT 15 : « La glace pour la barque » (micro ce1_monnaie_constituer), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-constituer-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 4).
   Un sac de glace à 1 € 20 c : quelles pièces donner ? Bonne réponse A (1 € + 10 c + 10 c).
   Commentaire : payer 2 € 50 c avec trois pièces ? Ceinture blanche.
   ============================================================ */
FILMS['ce1-constituer']=function(outils){
  const DUR={'00-accroche':9.02,'01-question':14.885,'01b-reponse':10.56,'02-commentaire':8.71,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:36px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tIdriss=m0('Idriss'), tSac=m0('sac'), tGarder=m0('garder'), tFrais=m0('frais'), tUn=m0('un',2), tVingt=m0('vingt');
  const mq=(w,n=1)=>mot('01-question',w,n), tA_=mq('A'), tB_=mq('B'), tC_=mq('C');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tDix=mr('Dix'), tPlus=mr('plus'), tDix2=mr('dix',2), tVingtR=mr('vingt'), tUnR=mr('Un'), tPile=mr('pile'), tBR=mr('B'), tDeuxR=mr('deux');
  const mc=w=>mot('02-commentaire',w), tDeuxC=mc('deux'), tTroisC=mc('trois'), tRep=mc('réponds');
  const finTitre=tIdriss-.08;

  function quai(c,T){ merE(c,T,230); c.fillStyle='#a47148'; c.fillRect(0,520,1056,200); c.strokeStyle='#6b4423'; c.lineWidth=4; c.beginPath(); c.moveTo(0,520); c.lineTo(1056,520); c.stroke(); }
  /* les trois choix dessinés : A 1 € + 10 c + 10 c ; B 1 € + 2 c ; C 1 € + 1 € */
  const ROWS=[[1,'10c','10c'],[1,'2c'],[1,1]], RY=[250,410,570], LET=['A','B','C'];
  function choixDessines(c,T){
    RY.forEach((y,k)=>{ const t0=[tA_,tB_,tC_][k]; if(T<t0) return;
      const bon=k===0&&T>=r, faux=k>0&&T>=r;
      if(bon&&T>=tA){ c.fillStyle='rgba(140,233,154,.22)'; c.beginPath(); c.roundRect(40,y-70,500,140,24); c.fill(); }
      ecrire(c,LET[k],100,y,70,bon?CRAIE.ok:CRAIE.jaune);
      ROWS[k].forEach((v,j)=>pieceCE1(c,v,230+j*135,y,v===1?58:72,{z:zoom(T,t0+j*.12,.4),terne:faux&&T>=tUnR?.6:0})); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 2 € 50 c avec trois pièces */
      quai(c,T);
      if(T>=tDeuxC) prixE(c,'2 € 50 c',528,200,96,{z:zoom(T,tDeuxC,.5)});
      if(T>=tTroisC){ for(let k=0;k<3;k++) ecrire(c,'?',290+k*240,420,120*zoom(T,tTroisC+k*.12,.4),CRAIE.jaune);
        ecrire(c,'3 pièces',528,620,70*zoom(T,tTroisC,.4),CRAIE.blanc); }
      tab.maj(); return; }

    if(T>=q){ /* la question et la réponse : le prix en haut, les trois choix dessinés */
      quai(c,T);
      prixE(c,'1 € 20 c',830,110,64);
      choixDessines(c,T);
      if(T>=r){
        formuleE(c,T,800,250,['10 c','+','10 c','=','20 c'],[tDix,tPlus,tDix2,tVingtR,tVingtR],46);
        if(T>=tBR) ecrire(c,'2 c, pas 20 c !',800,410,46*zoom(T,tBR,.4),CRAIE.faux);
        if(T>=tUnR) sommeE(c,'1 € et 20 c, pile !',800,570,44,{z:zoom(T,tUnR,.4),coul:CRAIE.ok}); }
      tab.maj(); return; }

    /* Idriss achète un sac de glace pour garder ses poissons au frais */
    quai(c,T);
    idrissE(c,880,720,1.25,{montre:T>=tSac&&T<tUn?1:0,T});
    if(T>=tGarder) for(let k=0;k<3;k++) poissonE(c,140+k*150,620,150,['#74c0fc','#ffa94d','#63e6be'][k],{T,k,z:zoom(T,tGarder+k*.1,.4)});
    if(T>=tSac) sacGlaceE(c,400,520,230,{z:zoom(T,tSac,.4),T});
    if(T>=tFrais) ecrire(c,'brrr !',400,140,64*zoom(T,tFrais,.4),'#a5d8ff');
    if(T>=tUn) prixE(c,T>=tVingt?'1 € 20 c':'1 €',640,250,76,{z:zoom(T,tUn,.5)});
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Quelles pièces donner ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,q+5,'1 € 20 c :<br>quelles pièces ?',ardoiseMini([['1 € 20 c'],['= ? + ?','#ffd43b']]));
  return { clips,FIN,titre:'La glace pour la barque',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 € + 10 c + 10 c',tq('A'),tq('centimes',2)],['1 € + 2 c',tq('B'),tq('centimes',3)],['1 € + 1 €',tq('C'),tq('euro',4)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('10 c + 10 c = 20 c',[tDix,tDix,tPlus,tDix2,tDix2,tVingtR,tVingtR,tVingtR]),phraseE('1 € et 20 c',[tUnR,tUnR,tUnR,tVingtR,tVingtR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tUn?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tPile?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
