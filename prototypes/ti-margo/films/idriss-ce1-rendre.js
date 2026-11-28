/* ============================================================
   Série Idriss le pêcheur — SHORT 05 : « Idriss dans la lune » (micro ce1_monnaie_rendre), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2/3-dessins.js + idriss-dessins.js (socle CP gardé).
   Voix : manim/voix/idriss-ce1-rendre-short.json.
   Un poisson à 8 €, payé avec 10 € ; Idriss, la tête dans les vagues, rend 3 € : s'est-il trompé ?
   Bonne réponse B (oui, 1 € de trop). Ceinture blanche. Commentaire : un poisson à 5 €, payé avec 20 € ?
   ⭐ Comme le short 01 : Ti Margo petit à gauche, la carte à droite sous l'ardoise.
   ============================================================ */
FILMS['ce1-rendre']=function(outils){
  const DUR={'00-accroche':9.21,'01-question':15.375,'01b-reponse':10.215,'02-commentaire':10.03,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:40px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tUn=m0('Un'), tPoisson=m0('poisson'), tHuit=m0('huit'), tPaie=m0('paie'), tDix=m0('dix'), tIdriss=m0('Idriss'), tVagues=m0('vagues'), tRend=m0('rend'), tTrois=m0('trois');
  const mq=w=>mot('01-question',w), tTrompe=mq('trompé');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tDe=mr('De'), tHuitR=mr('huit'), tDixR=mr('dix'), tManque=mr('manque'), tDeuxR=mr('deux'), tRends=mr('rends'), tUnR=mr('un'), tSourire=mr('sourire'), tIdR=mr('Idriss');
  const mc=w=>mot('02-commentaire',w), tCinqC=mc('cinq'), tVingtC=mc('vingt'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tUn-.08;

  /* le poisson et son prix à gauche ; Idriss derrière le comptoir à droite ; le billet de 10 € passe à Idriss ; il rend 2 € + 1 € */
  const BIL0=[560,560], BIL1=[860,560], R2=[180,610], R1=[340,610], RETOUR=[860,430];
  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,500,1056,220); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,500); c.lineTo(1056,500); c.stroke();
    c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(0,506,1056,10); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* un poisson à 5 €, payé avec 20 € */
      comptoir(c);
      poissonE(c,260,360,340,'#63e6be',{T,z:zoom(T,mc('poisson'),.4)});
      if(T>=tCinqC) prixE(c,'5 €',260,150,110,{z:zoom(T,tCinqC,.5)});
      if(T>=tVingtC) euroE(c,20,650,610,46,{z:zoom(T,tVingtC,.5)});
      if(T>=tCombC) ecrire(c,'?',800,280,170*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    const reve=T>=tVagues&&T<r;
    idrissE(c,880,700,1.3,{montre:T>=tRend&&T<q?1:0,salut:T>=r&&T>=tSourire?1:0,T});
    if(T>=tVagues) reveVaguesE(c,680,110,250,140,830,205,T,reve?zoom(T,tVagues,.5):0);
    comptoir(c);
    if(T>=tPoisson) poissonE(c,250,380,330,'#ffa94d',{T,z:zoom(T,tPoisson,.4)});
    if(T>=tHuit) prixE(c,'8 €',250,160,110,{z:zoom(T,tHuit,.5)});
    /* le billet de 10 € : posé à « dix », glisse vers Idriss à « Idriss » */
    if(T>=tDix){ const p=sautE(BIL0,BIL1,entreE(T,tIdriss-.2,tIdriss+.6),60); euroE(c,10,p[0],p[1],46,{z:zoom(T,tDix,.5)}); }
    /* la monnaie rendue : 2 € et 1 € ; dans la réponse, la pièce de 1 € repart vers Idriss à « rends » */
    if(T>=tRend){ const u=entreE(T,tRend-.1,tRend+.6);
      const p2=sautE(RETOUR,R2,u,100); euroE(c,2,p2[0],p2[1],70,{lueur:T>=r&&T>=tDeuxR&&T<tRends?.6:0});
      let p1=sautE(RETOUR,R1,entreE(T,tRend+.1,tRend+.8),100);
      if(T>=r) p1=sautE(R1,RETOUR,entreE(T,tRends-.2,tRends+.6),110);
      euroE(c,1,p1[0],p1[1],66,{lueur:T>=r&&T>=tB&&T<tRends?.5+.5*Math.sin(T*5):0}); }
    if(T<r){ if(T>=tTrois) etiquette(c,'3 €',260,700-48,T,tTrois,CRAIE.jaune,44);
      if(T>=tTrompe) ecrire(c,'?',560,330,160*zoom(T,tTrompe,.5),CRAIE.jaune); }
    else {
      /* de 8 à 10 : il manque 2 */
      const X=droiteE(c,470,130,370,8,10,{hi:{8:CRAIE.jaune,10:CRAIE.ok},z:zoom(T,tDe,.5),taille:52});
      if(T>=tHuitR) arcSautE(c,[X(8),352],[X(10),352],entreE(T,tHuitR,tDixR+.3),110,CRAIE.ok);
      if(T>=tDeuxR) ecrire(c,'+ 2',X(9),210,70*zoom(T,tDeuxR,.4),CRAIE.ok);
      formuleE(c,T,600,80,['8','+','2','=','10'],[tHuitR,tManque,tDeuxR,tDeuxR,tDeuxR],80,[CRAIE.jaune,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.blanc]);
      if(T>=tRends){ const z=zoom(T,tRends,.4); c.fillStyle='rgba(33,37,41,.88)'; c.beginPath(); c.roundRect(560-190*z,652-42*z,380*z,84*z,18*z); c.fill(); ecrire(c,'1 € de trop !',560,652,52*z,'#ff8787'); }
      if(T>=tSourire) for(const [x,y] of [[720,200],[1000,250]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Idriss s'est-il trompé ?")];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('8 + 2 = 10',[tHuitR,tManque,tDeuxR,tDeuxR,tDeuxR]);

  poserMiniature(outils,q-.3,'Idriss s’est-il<br>trompé ?',ardoiseMini([['8 €  ·  10 €'],['rendu : 3 € ?','#ffd43b']]));
  return { clips,FIN,titre:'Idriss dans la lune',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[["Non, c'est juste",tq('A'),tq('juste')],['Oui, 1 € de trop',tq('B'),tq('trop')],['Oui, pas assez',tq('C'),tq('assez')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1,phraseE('Je rends 1 €.',[mr('Je'),tRends,tUnR,mr('euro')])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tIdriss?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tSourire?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
