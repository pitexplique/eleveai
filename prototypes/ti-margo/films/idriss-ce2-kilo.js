/* ============================================================
   Série Idriss le pêcheur — SHORT 06 : « Le compte est pile » (micro ce2_monnaie_probleme), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2/3-dessins.js + idriss-dessins.js (socle CP gardé : ce2-commun.js en est une copie).
   Voix : manim/voix/idriss-ce2-kilo-short.json.
   Calamars à 5 € le kilo ; un pêcheur voisin en prend 4 kilos et tend 20 € : combien Idriss rend-il ?
   Bonne réponse B (rien du tout). Ceinture blanche. Commentaire : 3 kilos à 7 € le kilo ?
   ⭐ Comme le short 01 : Ti Margo petit à gauche, la carte à droite sous l'ardoise.
   ============================================================ */
FILMS['ce2-kilo']=function(outils){
  const DUR={'00-accroche':9.84,'01-question':12.665,'01b-reponse':9.91,'02-commentaire':9.955,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:48px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tLes=m0('Les'), tCalam=m0('calamars'), tCinq=m0('cinq'), tKilo=m0('kilo'), tPecheur=m0('pêcheur'), tQuatre=m0('quatre'), tKilos=m0('kilos'), tTend=m0('tend'), tVingt=m0('vingt');
  const mq=w=>mot('01-question',w), tRendreQ=mq('rendre');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tQuatreR=mr('Quatre'), tFois=mr('fois'), tCinqR=mr('cinq'), tVingtR=mr('vingt'), tDonne=mr('donné'), tVingtR2=mr('vingt',2), tPile=mr('pile'), tRien=mr('rien');
  const mc=w=>mot('02-commentaire',w), tTroisC=mc('trois'), tSeptC=mc('sept'), tKiloC=mc('kilo'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tLes-.08;

  /* l'ardoise des prix en haut ; 4 sachets d'un kilo sur le comptoir ; le pêcheur voisin (ciré rouge) à droite tend 20 € */
  const SAX=[150,330,510,690], SAY=640;
  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,520,1056,200); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,520); c.lineTo(1056,520); c.stroke(); }
  const calamars=(k,T)=>(c,x,yH)=>{ calamarE(c,x-10,yH-6,120,{T,k,dir:k%2?1:-1}); calamarE(c,x+14,yH+10,110,{T,k:k+3,dir:k%2?-1:1}); };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 3 kilos à 7 € le kilo */
      comptoir(c);
      if(T>=tSeptC) ardoisePrixE(c,528,110,[['7 € le kilo',CRAIE.jaune]],70,{z:zoom(T,tSeptC,.5)});
      if(T>=tTroisC) for(let k=0;k<3;k++) sachetKiloE(c,240+k*240,SAY+20,190,{z:zoom(T,tTroisC+k*.12,.4),contenu:(c,x,yH)=>poissonE(c,x,yH,150,COUL_POISSON[k],{T,k})});
      if(T>=tCombC) ecrire(c,'?',528,330,170*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    idrissE(c,900,700,1.3,{cire:'#e03131',cireB:'#a61e1e',peau:'#e0ac69',montre:T>=tTend?1:0,T});
    comptoir(c);
    if(T>=tCinq) ardoisePrixE(c,450,110,[['Calamars'],['5 € le kilo',CRAIE.jaune]],58,{z:zoom(T,tCinq,.5),lueur:T>=r&&T>=tCinqR&&T<tVingtR?.5:0});
    if(T>=tCalam&&T<tKilos) calamarE(c,450,350,240,{T,z:zoom(T,tCalam,.4)});
    if(T>=tKilos) SAX.forEach((x,k)=>{ const lu=T>=r&&T>=tQuatreR&&T<tVingtR?.6:0;
      sachetKiloE(c,x,SAY,150,{z:zoom(T,tKilos+k*.12,.4),lueur:lu,contenu:calamars(k,T)}); });
    if(T<r){ if(T>=tQuatre) etiquette(c,'4',SAX[0]-80,SAY-260,T,tQuatre,'#74c0fc',52); }
    if(T>=tVingt){ const p=T>=r&&T>=tDonne?sautE([830,400],[690,330],entreE(T,tDonne,tDonne+.5),40):[830,400];
      euroE(c,20,p[0],p[1],34,{z:zoom(T,tVingt,.5),lueur:T>=r&&T>=tDonne&&T<tRien?.6:0}); }
    if(T<r){ if(T>=tRendreQ) ecrire(c,'?',700,250,150*zoom(T,tRendreQ,.5),CRAIE.jaune); }
    else {
      /* 4 fois 5 € : un « 5 € » sur chaque sachet, puis 20 € ; 20 − 20 = 0 */
      SAX.forEach((x,k)=>{ const t=tFois+k*.25; if(T>=t) etiquette(c,'5 €',x,SAY-215,T,t,CRAIE.jaune,40); });
      formuleE(c,T,420,280,['4','×','5 €','=','20 €'],[tQuatreR,tFois,tCinqR,tVingtR,tVingtR],76,['#74c0fc',CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tPile){ formuleE(c,T,420,390,['20','−','20','=','0'],[tPile,tPile,tPile,tPile,tPile],66,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        for(const [x,y] of [[140,300],[700,300]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien Idriss doit-il rendre ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('4 × 5 € = 20 €',[tQuatreR,tFois,tCinqR,tCinqR,tVingtR,tVingtR,tVingtR]);

  poserMiniature(outils,q-.3,'Combien<br>rendre ?',ardoiseMini([['4 kg à 5 €'],['payé 20 €','#ffd43b']]));
  return { clips,FIN,titre:'Le compte est pile',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 €',tq('A'),tq('euro')],['Rien du tout',tq('B'),tq('tout')],['15 €',tq('C'),tq('quinze')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1,phraseE('Idriss ne rend rien !',[mr('Idriss'),mr('ne'),mr('rend'),tRien,tRien])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tPecheur?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tPile?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
