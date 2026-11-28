/* ============================================================
   Série Idriss, monnaie CP — SHORT 07 : « Les trois trésors de la mouette » (micro cp_monnaie_reconnaitre), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-reconnaitre-short.json.
   Une mouette lâche trois trésors sur l'étal : A une pièce de 2 €, B un billet de 10 €, C un coquillage rond et doré.
   Lequel n'est pas de l'argent ? Bonne réponse C. Ceinture blanche. Commentaire : 50 €, pièce ou billet ?
   ============================================================ */
FILMS['cp-reconnaitre']=function(outils){
  const DUR={'00-accroche':7.58,'01-question':8.08,'01b-reponse':12.885,'02-commentaire':7.765,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  { const css=document.createElement('style'); css.textContent='#titre{font-size:60px!important;}'; document.head.append(css); } /* le titre tient sur une ligne */

  const m0=w=>mot('00-accroche',w);
  const tUne=m0('Une'), tMouette=m0('mouette'), tTresors=m0('trésors'), tBrillent=m0('brillent');
  const mq=w=>mot('01-question',w), tLequel=mq('Lequel');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tCoq=mr('coquillage'), tRond=mr('rond'), tAucun=mr('aucun'), tA=mr('A'), tPiece=mr('pièce'), tDeux=mr('deux'), tB=mr('B'), tBillet=mr('billet'), tDix=mr('dix');
  const mc=w=>mot('02-commentaire',w), tCinquante=mc('cinquante'), tPieceC=mc('pièce'), tBilletC=mc('billet'), tRep=mc('réponds');
  const finTitre=tUne-.08;

  /* l'étal du marché (en bas) ; les trois trésors posés dessus */
  const X=[190,528,866], Y=595, PERCH=[528,290], vol=fin('01b-reponse')-1.6;
  function etal(c){ c.fillStyle='#c08550'; c.fillRect(0,480,1056,240); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,480); c.lineTo(1056,480); c.stroke();
    c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(0,486,1056,10); }
  function tresor(c,k,x,y,{z=1,lueur=0}={}){
    if(k===0) euroE(c,2,x,y,86,{z,lueur});
    else if(k===1) euroE(c,10,x,y,56,{z,lueur,grand:1});
    else coquilleRondeE(c,x,y,96,{z,lueur}); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 50 € : une pièce ou un billet ? */
      ecrire(c,'50 €',528,300,230*zoom(T,tCinquante,.5),CRAIE.jaune);
      if(T>=tPieceC) ecrire(c,'pièce',330,560,96*zoom(T,tPieceC,.4),CRAIE.blanc);
      if(T>=tPieceC+.35) ecrire(c,'ou',528,560,70,CRAIE.gris);
      if(T>=tBilletC) ecrire(c,'billet ?',760,560,96*zoom(T,tBilletC,.4),CRAIE.blanc);
      tab.maj(); return; }

    etal(c);
    /* la mouette arrive en planant, lâche ses trésors, se pose ; à la fin de la réponse, elle reprend son coquillage et s'envole */
    let mx=PERCH[0], my=PERCH[1], aile=0;
    if(T<tTresors+.6){ const u=entreE(T,tUne,tTresors+.6); const p=sautE([-80,90],PERCH,u,-60); mx=p[0]; my=p[1]; aile=1; }
    let coq=[X[2],Y];
    if(T>=vol){ const u=entreE(T,vol,vol+1.4); mx=PERCH[0]+(X[2]-PERCH[0])*Math.min(1,u*2)+(u>.5?(u-.5)*2*260:0); my=PERCH[1]+(Y-70-PERCH[1])*Math.min(1,u*2)-(u>.5?(u-.5)*2*420:0); aile=1;
      if(u>.5) coq=[mx+10,my+60]; }
    if(T>=tUne) mouetteE(c,mx,my,3.2,{aile,T,dir:1});
    /* les trésors tombent de la mouette sur l'étal */
    X.forEach((x,k)=>{ const t0=tTresors-.1+k*.25; if(T<t0) return;
      const u=entreE(T,t0,t0+.6); let p=[PERCH[0]+(x-PERCH[0])*u, PERCH[1]+40+(Y-PERCH[1]-40)*u*u];
      if(k===2) p=T>=vol?coq:p;
      const lu=T>=r?(k===2&&T>=tC&&T<tA?.6+.4*Math.sin(T*5):(k===0&&T>=tA&&T<tB)||(k===1&&T>=tB&&T<vol)?.5:0):0;
      tresor(c,k,p[0],p[1],{lueur:lu});
      if(T>=tBrillent&&T<q) etincelle(c,x+70,Y-80,12+6*Math.sin(T*6+k*2));
      if(T>=q) etiquette(c,'ABC'[k],x,Y-150,T,q+[mq('A'),mq('B'),mq('C')][k]-q,CRAIE.blanc,56); });

    if(T<r){ if(T>=tLequel) ecrire(c,'?',528,170,150*zoom(T,tLequel,.5),CRAIE.jaune); }
    else {
      if(T>=tCoq&&T<vol) ecrire(c,'coquillage',X[2]-20,690,48*zoom(T,tCoq,.4),CRAIE.jaune);
      if(T>=tAucun&&T<vol){ ecrire(c,'aucun nombre',X[2]-40,150,54*zoom(T,tAucun,.4),CRAIE.faux); }
      if(T>=tPiece) ecrire(c,'pièce',X[0],690,48*zoom(T,tPiece,.4),CRAIE.blanc);
      if(T>=tDeux) ecrire(c,'2 €',X[0],150,90*zoom(T,tDeux,.4),CRAIE.ok);
      if(T>=tBillet) ecrire(c,'billet',X[1],690,48*zoom(T,tBillet,.4),CRAIE.blanc);
      if(T>=tDix) ecrire(c,'10 €',X[1],150,90*zoom(T,tDix,.4),CRAIE.ok);
      if(T>=tRond&&T<tAucun) for(const [x,y] of [[X[2]-100,Y-60],[X[2]+100,Y+40]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Lequel n'est pas de l'argent ?")];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE("C'est un coquillage.",[mr("C'est"),mr('un'),tCoq]);

  poserMiniature(outils,q-.3,'Pièce<br>ou billet ?',ardoiseMini([['2 €  10 €','#ffd43b'],['et… ?']]));
  return { clips,FIN,titre:'Les trois trésors de la mouette',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['la pièce',tq('A'),tq('A')+.3],['le billet',tq('B'),tq('B')+.3],['le coquillage',tq('C'),tq('C')+.3]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q) T>=tBrillent?g.fier():g.montre();
      else if(T<r) g.reflechit();
      else if(T<com) g.montre();
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
