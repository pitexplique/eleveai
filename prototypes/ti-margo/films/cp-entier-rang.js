/* ============================================================
   Série Nombres entiers CP — SHORT 02 : « La course des escargots » (micro cp_entier_rang), 25/11/2026.
   Outils : cp-commun.js + cp-entier.js. Voix : manim/voix/cp-entier-rang-short.json.
   Trois escargots (rouge, jaune, bleu) font la course sous la pluie. Le jaune arrive premier.
   Question : qui est premier ? B (le jaune). Ceinture blanche. Commentaire : qui est troisième ? (le bleu)
   ⭐ La carte descend en bas : la course reste visible pendant la question.
   ============================================================ */
FILMS['rang']=function(outils){
  const DUR={'00-accroche':8.69,'01-question':11.43,'01b-reponse':6.8,'02-commentaire':6.15,'03-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte{top:auto!important;bottom:40px;}'; document.head.append(css);

  const tCest=mot('00-accroche',"C'est"), tCourse=mot('00-accroche','course'), tGout=mot('00-accroche','gouttes'), tAllez=mot('00-accroche','allez');
  const tPrem=mot('01b-reponse','premier'), tBravo=mot('01b-reponse','Bravo'), tJ2=mot('01b-reponse','jaune',2);
  const tTrois=mot('02-commentaire','troisième'), tRep=mot('02-commentaire','réponds');
  const finTitre=tCest-.08;

  /* Les trois couloirs : rouge, jaune, bleu ; où chacun arrive (le jaune au drapeau) */
  const ESC=[{coul:'#e03131',y:250,but:730},{coul:'#fcc419',y:425,but:850},{coul:'#1c7ed6',y:600,but:575}];
  const ARR=880;
  const posX=(e,T)=>{ const u=douxE(entreE(T,tCourse,q-.4)); return 150+(e.but-150)*u+Math.sin(T*2.2+e.y)*3*(1-u); };

  function dessiner(T){ const c=tab.c; tab.effacer();
    /* la piste : trois couloirs, la ligne d'arrivée, le drapeau */
    c.strokeStyle='rgba(248,249,250,.35)'; c.lineWidth=4; c.setLineDash([18,16]);
    for(const y of [160,338,512,690]){ c.beginPath(); c.moveTo(40,y); c.lineTo(1010,y); c.stroke(); }
    c.setLineDash([]); c.strokeStyle=CRAIE.blanc; c.lineWidth=8; c.beginPath(); c.moveTo(ARR+100,160); c.lineTo(ARR+100,690); c.stroke();
    drapeauE(c,ARR+100,160,130);
    pluieE(c,T,1056,720,26,entreE(T,tGout-.3,tGout+.6));
    ESC.forEach((e,k)=>{ const x=posX(e,T); escargotCraie(c,x,e.y+60,1.3,e.coul,T+k);
      /* le premier : une médaille « 1er » */
      if(k===1&&T>=r&&T>=tPrem) rangE(c,1,x-185,e.y-20,T,tPrem,CRAIE.jaune,60); });
    if(T>=tBravo&&T<com) for(const [x,y] of [[760,330],[1000,340],[790,520],[990,510]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
    if(T>=com&&T>=tTrois){ const z=zoom(T,tTrois,.5); ordinalE(c,3,330,80,90*z,CRAIE.jaune); ecrire(c,'?',420,82,90*z,CRAIE.jaune); }
    tab.maj();
  }

  const qd=dit('01-question'), rd=dit('01b-reponse');
  qd('Question !'); const phraseQ=[qd('Qui est premier ?')];
  const tq=m=>mot('01-question',m)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const tB=mot('01b-reponse','B');
  const rond=c=>`<span style="color:${c};font-size:1.1em">●</span> `;
  const r1=phraseE('Le jaune : 1er !',[mot('01b-reponse','Le'),mot('01b-reponse','jaune'),mot('01b-reponse','jaune'),tPrem,tPrem]);

  poserMiniature(outils,q-.2,'Qui est<br>premier ?'+PARI,ardoiseMini([['1er ?','#ffd43b']]));
  return { clips,FIN,titre:'La course des escargots',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[rond('#e03131')+'le rouge',tq('A'),tq('rouge')],[rond('#f59f00')+'le jaune',tq('B'),tq('jaune')],[rond('#1c7ed6')+'le bleu',tq('C'),tq('bleu')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tAllez?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tBravo?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
