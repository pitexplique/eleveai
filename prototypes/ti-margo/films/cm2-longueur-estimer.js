/* ============================================================
   Série Longueurs CM2 — ÉPISODE 03 : COMBIEN MESURE MON LIT ? Outils : films/cm2-commun.js + cm2-longueur.js.
   Mon cousin demande la longueur de mon lit : « 2 kilomètres ! » Il éclate de rire : 2 km, c'est une demi-heure de marche.
   Environ 2 m (C) : 2 grands pas, un peu plus que moi allongé.
   Commentaire : un crayon neuf mesure 18… millimètres, centimètres ou mètres ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le lit à gauche (2 m = 440 px), le texte à droite (Ti Margo ne cache que le tout bas,
   à gauche du milieu) */

/* Les marques des cues, MOT PAR MOT : un nombre suivi de son unité (« 2 kilomètres ») a une marque par mot dit, toutes au même
   texte. On n'en garde qu'une par mot ÉCRIT : le nombre à la fin de son dernier mot, l'unité à la sienne. Renvoie de quoi
   remettre les marques d'origine (la bouche de Ti Margo, dans le socle, bouge sur tous les mots dits). */
function lgMotParMot(){ const CL=(window.CUES||{})[VIDEO]||{}, ORIG={};
  for(const k in CL){ ORIG[k]=CL[k]; const l=CL[k], res=[];
    for(let i=0;i<l.length;){ let j=i; while(j+1<l.length&&l[j+1][1]===l[i][1]) j++;
      const W=l[i][1].trim().split(/\s+/);
      if(W.length===1) res.push([l[j][0],W[0]]);
      else { res.push([l[Math.max(i,j-1)][0],W[0]]); res.push([l[j][0],W.slice(1).join(' ')]); }
      i=j+1; }
    CL[k]=res; }
  return ()=>{ for(const k in ORIG) CL[k]=ORIG[k]; }; }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé à gauche (ou centré sur sa forme finale) */
function lgProg(c,etapes,T,x,y,taille,coul,align='left'){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  if(align==='center'){ c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
  else ecrire(c,s,x,y,taille,coul,'left'); }
/* Ti Margo à la craie, couché de profil, la tête à GAUCHE (sur l'oreiller) : (x, y) = le bout du museau, posé sur la ligne y ;
   len = du museau au bout de la queue (recopié de cm1-longueur-estimer.js, retourné) */
function lgMargouillat(c,x,y,len,z=1,coul='#69db7c'){ if(z<=0) return; const L=len, k=Math.min(1.12,z);
  c.save(); c.translate(x+L/2,y-L*.06); c.scale(-k,k); c.translate(-(x+L/2),-(y-L*.06));
  c.fillStyle=coul; c.strokeStyle='#f8f9fa'; c.lineWidth=Math.max(2,L*.008); c.lineJoin='round'; c.lineCap='round';
  for(const [px,s] of [[.5,-1],[.72,1]]){ c.beginPath(); c.moveTo(x+L*px,y-L*.04); c.lineTo(x+L*(px+s*.04),y-L*.004); c.lineTo(x+L*(px+s*.075),y-L*.004); c.stroke(); }
  c.beginPath(); c.moveTo(x,y-L*.05); c.quadraticCurveTo(x+L*.24,y-L*.115,x+L*.47,y-L*.115); c.lineTo(x+L*.47,y-L*.035);
  c.quadraticCurveTo(x+L*.24,y-L*.04,x,y-L*.05); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x+L*.6,y-L*.07,L*.17,L*.055,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x+L*.87,y-L*.08,L*.115,L*.05,-.08,0,7); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x+L*.9,y-L*.095,L*.016,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(x+L*.905,y-L*.095,L*.008,0,7); c.fill();
  c.restore(); }

FILMS['estimer']=function(outils){
  const remettre=lgMotParMot();
  const DUR={'00-accroche':9.62,'01-rire':5.55,'02-question':12.83,'02b-reponse':7.42,'03-ouf':4.48,'04-commentaire':8.25,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,rir,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tRef=mot('00-accroche','réfléchis'), t2=mot('00-accroche','2'), tKm=mot('00-accroche','kilomètres'),
        tTres=mot('00-accroche','très');
  const tEclate=mot('01-rire','éclate'), t2r=mot('01-rire','2'), tKmr=mot('01-rire','kilomètres'), tDemi=mot('01-rire','demi-heure'),
        tMarche=mot('01-rire','marche');
  const tC=mot('02b-reponse','C');
  const tAller=mot('03-ouf','aller'), tBout=mot('03-ouf','bout'), tFatigue=mot('03-ouf','fatigué');
  const tCrayon=mot('04-commentaire','crayon'), t18=mot('04-commentaire','18'), tMm=mot('04-commentaire','millimètres'),
        tCm=mot('04-commentaire','centimètres'), tM=mot('04-commentaire','mètres'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, XR=800;

  /* Le lit, à l'échelle : 2,2 px par cm, de LX0 à LX1 (2 m = 440 px) ; LY = le dessus du matelas */
  const PX=2.2, LX0=70, LX1=LX0+200*PX, LY=440;
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  function lit(c){ c.lineJoin='round'; c.strokeStyle='#f8f9fa'; c.lineWidth=4;
    c.fillStyle='#c08550'; c.fillRect(LX0-22,LY-150,24,240); c.strokeRect(LX0-22,LY-150,24,240);
    c.fillRect(LX1-2,LY-70,24,160); c.strokeRect(LX1-2,LY-70,24,160);
    c.fillRect(LX0,LY+40,LX1-LX0,26); c.strokeRect(LX0,LY+40,LX1-LX0,26);
    c.fillStyle='#a5d8ff'; c.beginPath(); c.roundRect(LX0,LY,LX1-LX0,40,10); c.fill(); c.stroke();
    c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(LX0+8,LY-30,84,34,14); c.fill(); }
  /* une horloge (x, y = son centre) ; u = 0 → 1 : la grande aiguille fait une demi-heure (un demi-tour) */
  function horloge(c,x,y,R,u,z=1){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,y); c.scale(k,k);
    c.fillStyle='#f8f9fa'; c.strokeStyle='#ffd43b'; c.lineWidth=8; c.beginPath(); c.arc(0,0,R,0,7); c.fill(); c.stroke();
    if(u>0){ c.fillStyle='rgba(255,146,43,.55)'; c.beginPath(); c.moveTo(0,0); c.arc(0,0,R-8,-Math.PI/2,-Math.PI/2+Math.PI*Math.min(1,u)); c.closePath(); c.fill(); }
    c.strokeStyle='#343a40'; c.lineWidth=4; for(let i=0;i<12;i++){ const a=i*Math.PI/6; c.beginPath(); c.moveTo(Math.cos(a)*(R-16),Math.sin(a)*(R-16)); c.lineTo(Math.cos(a)*(R-6),Math.sin(a)*(R-6)); c.stroke(); }
    const a=-Math.PI/2+Math.PI*Math.min(1,u); c.lineCap='round'; c.lineWidth=7; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.cos(a)*(R-22),Math.sin(a)*(R-22)); c.stroke();
    c.lineWidth=9; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.cos(-Math.PI/2+.5)*(R*.45),Math.sin(-Math.PI/2+.5)*(R*.45)); c.stroke();
    c.fillStyle='#343a40'; c.beginPath(); c.arc(0,0,8,0,7); c.fill(); c.restore(); }
  /* un grand pas : un bond en pointillé de x1 à x2 (au sol y), tracé de u = 0 à 1, et une empreinte à l'arrivée */
  function pas(c,x1,x2,y,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.ok; c.lineWidth=5; c.setLineDash([12,10]); c.beginPath();
    for(let i=0;i<=30;i++){ const v=u*i/30, x=x1+(x2-x1)*v, yy=y-70*Math.sin(Math.PI*v); i?c.lineTo(x,yy):c.moveTo(x,yy); } c.stroke(); c.setLineDash([]);
    if(u>=1){ c.fillStyle=CRAIE.ok; c.beginPath(); c.ellipse(x2,y,13,22,0,0,7); c.fill(); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un crayon neuf mesure 18… */
      if(T>=tCrayon) crayonCraie(c,70,330,420,zoom(T,tCrayon,.4),'#fab005',40);
      if(T>=t18){ flecheLongueur(c,70,490,250,CRAIE.jaune,deroule(T,t18,.5)); ecrire(c,'18…',280,190,80*zoom(T,t18,.4),CRAIE.jaune); }
      if(T>=tMm) ecrire(c,'18 mm ?',XR,190,74*zoom(T,tMm,.4),CRAIE.blanc);
      if(T>=tCm) ecrire(c,'18 cm ?',XR,320,74*zoom(T,tCm,.4),CRAIE.blanc);
      if(T>=tM) ecrire(c,'18 m ?',XR,450,74*zoom(T,tM,.4),CRAIE.blanc);
      tab.maj(); return; }
    lit(c);
    if(T<rir){ /* « je réfléchis… 2 kilomètres ! » */
      flecheLongueur(c,LX0,LX1,LY-200,CRAIE.jaune,1); ecrire(c,'?',(LX0+LX1)/2,LY-260,90,CRAIE.jaune);
      if(T>=tRef) ecrire(c,'je réfléchis…',XR,170,54*zoom(T,tRef,.4),CRAIE.gris);
      lgProg(c,[[t2,'2'],[tKm,'2 km !']],T,XR,310,110,CRAIE.faux,'center');
      if(T>=tTres) ecrire(c,'très confortable',XR,450,44*zoom(T,tTres,.25),CRAIE.gris);
    } else if(T<q){ /* « 2 kilomètres, c'est une demi-heure de marche ! » */
      flecheLongueur(c,LX0,LX1,LY-200,CRAIE.jaune,1); ecrire(c,'?',(LX0+LX1)/2,LY-260,90,CRAIE.jaune);
      lgProg(c,[[t2r,'2'],[tKmr,'2 km']],T,XR,150,96,CRAIE.faux,'center');
      if(T>=tDemi){ horloge(c,XR,340,95,deroule(T,tDemi,1.2),zoom(T,tDemi,.4)); ecrire(c,'une demi-heure',XR,490,48*zoom(T,tDemi,.25),CRAIE.blanc); }
      if(T>=tMarche) ecrire(c,'de marche !',XR,560,50*zoom(T,tMarche,.4),CRAIE.gris);
    } else { /* la réponse : environ 2 m, 2 grands pas, un peu plus que moi allongé */
      lgMargouillat(c,LX0+14,LY+2,400);
      flecheLongueur(c,LX0,LX1,LY-200,CRAIE.ok,1); ecrire(c,'2 m',(LX0+LX1)/2,LY-250,74*zoom(T,ouf,.5),CRAIE.ok);
      ecrire(c,'environ 2 m',XR,180,64,CRAIE.ok); coche(c,XR+60,270,.4);
      ecrire(c,'2 grands pas',XR,360,58,CRAIE.jaune);
      pas(c,LX0,(LX0+LX1)/2,610,deroule(T,ouf+.1,.45)); pas(c,(LX0+LX1)/2,LX1,610,deroule(T,ouf+.6,.45));
      /* « une demi-heure pour aller au bout du lit » : la petite horloge, puis le bout du lit qui s'allume */
      if(T>=tAller) horloge(c,XR,520,70,deroule(T,tAller,1.2),zoom(T,tAller,.4));
      if(T>=tBout){ c.strokeStyle=CRAIE.faux; c.lineWidth=8; cercle(c,LX1+10,LY+10,70,CRAIE.faux,deroule(T,tBout,.4)); }
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-rire'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Mon cousin me demande'),a0('la longueur de mon lit.')),
    ...suiteDe(rir,60,60,[a0('Je réfléchis…')],[a0('2 kilomètres !')],[a0("C'est un lit"),a0('très confortable.')]),
    ...suiteDe(q,60,62,[a1('Mon cousin'),a1('éclate de rire :')],[a1('2 kilomètres,')],[a1("c'est une demi-heure"),a1('de marche !')]),
    ...suiteDe(com,60,62,[a3('Une demi-heure'),a3('pour aller'),a3('au bout du lit…')],[a3("j'aurais été fatigué !")]),
    ...suiteDe(f,60,60,[a4('À toi : un crayon neuf'),a4('mesure 18…')],[a4('millimètres,'),a4('centimètres,'),a4('ou mètres ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien mesure mon lit ?')];
  const mq=(m,n=1)=>mot('02-question',m,n), tq=(m,n=1)=>mq(m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Environ 2 mètres :'), r2=rd('2 grands pas.'), r3=rd('Un peu plus que moi,'), r4=rd('allongé !');
  /* Les choix s'écrivent au fil de la voix : « 2 », puis « 2 centimètres » */
  const ETAPES=[[[mq('2'),'2'],[mq('centimètres'),'2 centimètres']],[[mq('2',2),'2'],[mq('kilomètres'),'2 kilomètres']],
    [[mq('2',3),'2'],[mq('mètres'),'2 mètres']]];
  const choix=[['2 centimètres',tq('A'),tq('2')],['2 kilomètres',tq('B'),tq('2',2)],['2 mètres',tq('C'),tq('2',3)]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [t,e] of et) if(T>=t) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="100" width="12" height="110" fill="#c08550" stroke="#f8f9fa" stroke-width="3"/><rect x="200" y="140" width="12" height="70" fill="#c08550" stroke="#f8f9fa" stroke-width="3"/>`+
    `<rect x="42" y="150" width="158" height="22" rx="6" fill="#a5d8ff" stroke="#f8f9fa" stroke-width="3"/><rect x="42" y="172" width="158" height="12" fill="#c08550" stroke="#f8f9fa" stroke-width="3"/>`+
    `<rect x="48" y="134" width="40" height="18" rx="8" fill="#f8f9fa"/>`+
    `<text x="121" y="80" font-family="Segoe UI" font-weight="800" font-size="46" fill="#ff8787" text-anchor="middle">2 km ?</text>`+
    `<text x="272" y="200" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Mon lit : 2 km<br>ou 2 m ?'+PARI,mini);
  remettre();
  return { clips,FIN,titre:'Mon lit mesure… ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,rir,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<rir){ T<t2?g.reflechit():g.fier(); }
      else if(T<q){ T<tEclate?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tFatigue?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
