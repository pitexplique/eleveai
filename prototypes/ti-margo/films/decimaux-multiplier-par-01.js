/* ============================================================
   Série Nombres décimaux 6e, ÉPISODE 10 : LA MACHINE À RÉTRÉCIR.
   Ti Margo passe son dinosaure de 40 cm dans la machine « × 0,1 » : il croit qu'il sort géant (400 cm).
   Non : il sort tout petit, 4 cm. Puis 0,4 cm : il tient sur son doigt.
   Chargé après films/decimaux.js : utilise voixDe, poserTableau, ecrire, pop, poserClasse, suiteDe, gestes…
   ============================================================ */
FILMS['multiplier-par-01']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':13.88,'01-bzzz':7.75,'02-question':15.37,'02b-reponse':9.35,'03-encore':8.14,'04-commentaire':11.78,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-bzzz','02-question','02b-reponse','03-encore','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bz,q,r,enc,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  /* Deux bouts de phrase en une seule (« 0,4 » puis « centimètre », que la voix lie en un mot) */
  const joindre=(...ps)=>[ps[0][0],ps[ps.length-1][1],ps.map(p=>p[2]).join(' '),ps.flatMap(p=>p[3])];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tVoici=mot('00-accroche','Voici'), tMach=mot('00-accroche','machine'), tX01=mot('00-accroche','0'), tDino=mot('00-accroche','dinosaure'),
        t40=mot('00-accroche','40'), tGeant=mot('00-accroche','géant'), t400=mot('00-accroche','400'), tParie=mot('00-accroche','paries');
  const tBz=mot('01-bzzz','Bzzz'), tSort=mot('01-bzzz','sort'), tPetit=mot('01-bzzz','petit'), tFois=mot('01-bzzz','Fois'), tRetr=mot('01-bzzz','rétrécit');
  const tRem=mot('03-encore','remets'), t04=mot('03-encore','0'), tOh=mot('03-encore','Oh'), tDoigt=mot('03-encore','doigt');
  const tC25=mot('04-commentaire','25'), tCx=mot('04-commentaire','fois'), tCom=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');

  const z=(T,t)=>T>=t?1+.4*(Math.max(1,pop(T,t))-1):0;   // un pop plus doux : les mots longs ne débordent pas
  /* Un dinosaure à la craie, debout sur (x, y) ; s = 1 : 240 px de haut */
  function dino(c,x,y,s=1,coul=CRAIE.ok){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle=coul;
    c.beginPath(); c.ellipse(0,-110,95,62,0,0,7); c.fill();                                  // le corps
    c.beginPath(); c.moveTo(-70,-130); c.quadraticCurveTo(-190,-120,-215,-70); c.quadraticCurveTo(-150,-95,-80,-80); c.fill(); // la queue
    c.beginPath(); c.moveTo(55,-150); c.quadraticCurveTo(80,-210,95,-215); c.lineTo(125,-200); c.quadraticCurveTo(95,-160,85,-120); c.fill(); // le cou
    c.beginPath(); c.ellipse(118,-222,42,26,-.15,0,7); c.fill();                             // la tête
    for(const dx of [-50,-15,35,65]){ c.fillRect(dx-12,-70,26,70); }                         // les pattes
    c.fillStyle=CRAIE.d; for(let k=0;k<5;k++){ const px=-60+k*28, py=-168+Math.abs(k-2)*7; c.beginPath(); c.moveTo(px-12,py+8); c.lineTo(px,py-22); c.lineTo(px+12,py+8); c.fill(); } // les piques
    c.fillStyle='#1f3b2c'; c.beginPath(); c.arc(130,-230,7,0,7); c.fill();                   // l'œil
    c.restore(); }
  /* La machine : une caisse, une entrée à gauche, une sortie à droite, l'étiquette « × 0,1 » */
  function machine(c,x,y,w,h,label,tLab,T,secoue=0){ const dx=secoue?Math.sin(T*55)*8*secoue:0, dy=secoue?Math.cos(T*47)*5*secoue:0;
    c.save(); c.translate(x+dx,y+dy);
    c.fillStyle='#3b5b4a'; c.fillRect(-w/2,-h/2,w,h); c.strokeStyle=CRAIE.blanc; c.lineWidth=8; c.strokeRect(-w/2,-h/2,w,h);
    c.fillStyle='#1f3b2c'; c.fillRect(-w/2-6,h/2-150,30,120); c.fillRect(w/2-24,h/2-150,30,120);   // entrée et sortie
    c.strokeStyle=CRAIE.d; c.lineWidth=6; c.strokeRect(-w/2-6,h/2-150,30,120); c.strokeRect(w/2-24,h/2-150,30,120);
    for(let k=0;k<3;k++){ c.fillStyle=[CRAIE.faux,CRAIE.d,CRAIE.ok][k]; c.globalAlpha=secoue?(.4+.6*((Math.floor(T*8)+k)%2)):1; c.beginPath(); c.arc(-50+k*50,-h/2+34,14,0,7); c.fill(); }
    c.globalAlpha=1; if(label&&T>=tLab) ecrire(c,label,0,-28,76*(1+.3*(z(T,tLab)-1)),CRAIE.u);
    c.restore(); }
  /* Un doigt à la craie, pointé vers le haut ; renvoie le bout */
  function doigt(c,x,y){ c.fillStyle='#f3d2b3'; c.beginPath(); c.roundRect(x-48,y-250,96,330,48); c.fill();
    c.strokeStyle='#c99a75'; c.lineWidth=6; c.beginPath(); c.roundRect(x-34,y-236,68,70,22); c.stroke(); for(const k of [0,1]){ c.beginPath(); c.moveTo(x-30,y-90+k*22); c.lineTo(x+30,y-90+k*22); c.stroke(); }
    return [x,y-250]; }

  const MX=528, MY=380, MW=330, MH=330;     // la machine, au centre de l'ardoise
  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : le dinosaure géant de 25 m, × 0,01 */
      dino(c,230,560,.9,CRAIE.ok);
      if(T>=tC25) ecrire(c,'25 m',230,640,80*z(T,tC25),CRAIE.d);
      machine(c,790,330,380,300,'× 0,01',tCx,T);
      if(T>=tCom) ecrire(c,'= ? m',790,610,92*z(T,tCom),CRAIE.blanc);
      tab.maj(); return; }
    if(T>=enc){ /* encore une fois : 4 cm → 0,4 cm, sur le doigt */
      if(T<tOh){
        const u=Math.min(1,Math.max(0,(T-tRem)/.7));
        machine(c,MX,MY,MW,MH,'× 0,1',enc,T,T>=tRem+.7&&T<t04?1:0);
        if(u<1) dino(c,150+(MX-MW/2-150)*u,MY+MH/2-30,.1);
        ecrire(c,'4 cm',150,620,64,CRAIE.d);
        if(T>=t04){ c.fillStyle=CRAIE.ok; c.beginPath(); c.arc(MX+MW/2+70,MY+MH/2-34,6,0,7); c.fill(); c.strokeStyle=CRAIE.d; c.lineWidth=6; c.beginPath(); c.arc(MX+MW/2+70,MY+MH/2-34,34,0,7); c.stroke(); ecrire(c,'0,4 cm',MX+MW/2+130,620,64*z(T,t04),CRAIE.ok); }
      } else { /* le minuscule dinosaure tient sur le doigt */
        const [bx,by]=doigt(c,W/2,690); dino(c,bx+4,by+2,.05*Math.max(1,pop(T,tOh)));
        ecrire(c,'0,4 cm',W/2+250,280,84,CRAIE.ok);
        if(T>=tDoigt){ c.strokeStyle=CRAIE.d; c.lineWidth=7; c.beginPath(); c.arc(bx,by-8,38,0,7); c.stroke(); c.beginPath(); c.moveTo(bx+38,by-8); c.lineTo(W/2+150,290); c.stroke(); }
      }
      tab.maj(); return; }
    if(T>=bz){ /* Bzzz : le dinosaure entre, la machine tremble, il sort tout petit */
      const u=Math.min(1,(T-bz)/.6);
      machine(c,MX,MY,MW,MH,'× 0,1',bz,T,T<tSort?1:0);
      if(u<1) dino(c,180+(MX-MW/2-60-180)*u,MY+MH/2,.75*(1-.5*u));
      ecrire(c,'40 cm',150,640,64,CRAIE.d);
      if(T>=tPetit){ dino(c,MX+MW/2+95,MY+MH/2-30,.1*Math.max(1,pop(T,tPetit)),CRAIE.ok); ecrire(c,'4 cm',MX+MW/2+95,620,72*z(T,tPetit),CRAIE.ok);
        c.strokeStyle=CRAIE.d; c.lineWidth=6; c.beginPath(); c.arc(MX+MW/2+95,MY+MH/2-42,46,0,7); c.stroke(); }
      if(T>=tRetr){ c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.beginPath(); c.moveTo(MX-150,60); c.lineTo(MX+150,60); c.stroke(); ecrire(c,'rétrécit !',MX,110,64*z(T,tRetr),CRAIE.faux); }
      tab.maj(); return; }
    /* l'accroche : la machine, le dinosaure de 40 cm, le rêve d'un géant */
    if(T>=tGeant) dino(c,700,720,2.6*Math.min(1,.6+.4*(T-tGeant)/.5),'rgba(255,135,135,.33)');   // le géant rêvé, derrière
    if(T>=tMach) machine(c,MX,MY,MW,MH,'× 0,1',tX01,T);
    if(T>=tDino) dino(c,180,MY+MH/2,.75*Math.max(1,pop(T,tDino)));
    if(T>=t40) ecrire(c,'40 cm',150,640,72*z(T,t40),CRAIE.d);
    if(T>=t400) ecrire(c,'400 cm ?',860,90,80*z(T,t400),CRAIE.faux);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-bzzz'), a3=dit('03-encore'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tVoici-.08,352,62,...salut),
    ...suiteDe(bz,60,62,[a0('Voici ma machine :'),a0('fois 0,1.')],[a0('J’y mets mon dinosaure'),a0('de 40 centimètres.')],[a0('Il va sortir géant,'),a0('400 centimètres !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,62,[a1('Bzzz !')],[a1('Il sort…'),a1('tout petit !')],[a1('Fois 0,1 :'),a1('ça rétrécit.')]),
    ...suiteDe(com,60,60,[a3('Je le remets'),a3('dans la machine…')],[joindre(a3('0,4'),a3.saute(-1)('centimètre.'))],[a3('Oh non, il tient'),a3('sur mon doigt !')]),
    ...suiteDe(f,60,56,[a4('À toi : mon dinosaure géant'),a4('mesure 25 mètres.')],[a4('Je le passe'),a4('fois 0,01.')],[a4('Combien mesure-t-il ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien mesure-t-il'),qd('maintenant ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Fois 0,1 : c’est'), r2=rd('diviser par 10.'), r3=rd('Chaque chiffre descend'), r4=rd('d’un rang : 4 centimètres.');

  poserMiniature(outils,acc+1,'Fois 0,1 :<br>un dinosaure géant ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="96" font-family="Segoe UI" font-weight="800" font-size="62" fill="#f8f9fa" text-anchor="middle">40 cm</text><text x="165" y="170" font-family="Segoe UI" font-weight="800" font-size="62" fill="#74c0fc" text-anchor="middle">× 0,1</text></svg>`);
  return { clips,FIN,titre:'La machine à rétrécir',ceinture:1,finTitre:tVoici-.08,groupes,finClip:'05-abonne',
    cuts:[tVoici-.08,bz,q,r,enc,tOh,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:enc,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['400 cm',tq('A'),tq('400')],['4 cm',tq('B'),tq('4')],['0,4 cm',tq('C'),tq('0')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<enc, dansF=T>=f, gros=T<tVoici-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<bz){ if(T<tDino) g.montre(); else if(T<tGeant) g.ouvre(); else g.fier(); }
      else if(T<q){ if(T>=tSort&&T<tFois) { g.oups(); scene.ry=-.12+.3*lisse((T-tSort)/.35); } else if(T>=tFois) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<enc){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tOh) { g.oups(); scene.ry=-.12+.3*lisse((T-tOh)/.35); } else if(T>=t04-.2) g.montre(); else g.reflechit(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
