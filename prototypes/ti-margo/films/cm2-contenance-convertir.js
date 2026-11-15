/* ============================================================
   Série Contenance CM2, ÉPISODE 02 : 1,5 L, COMBIEN DE cL ? (ceinture blanche, règle des shorts CM2).
   Outils : films/cm2-commun.js + cm2-contenance.js (bouteilleCraie, JUS, VERRE).
   Une limonade géante : 1,5 L d'eau, mais le verre doseur est en cL. « 1,5 litre… 15 centilitres. Hop ! » Beurk : dix fois trop sucrée.
   Réponse B : 1,5 L = 1 L et demi ; 1 L = 100 cL, ½ L = 50 cL : 150 cL. Ti Margo ajoute l'eau qui manque.
   Commentaire : 0,75 L, c'est combien de mL ? (jamais tranché à l'écran)
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le pichet à gauche, À L'ÉCHELLE (CV_K px d'eau par cL : 15 cL, 100 cL, 150 cL),
   le verre doseur à côté, le texte à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const CV_K=3, CV_X=250, CV_Y=640, CV_W=230, CV_H=500, CV_XD=495, CV_YD=360, CV_WD=124, CV_HD=220, CV_XR=785;
const CV_FORT='#fab005', CV_PALE='#fff3bf';
const cvNiv=cl=>CV_Y-6-cl*CV_K;                                   /* le haut de l'eau du pichet pour cl centilitres */

/* Les nombres répétés par la voix (« 1,5 » × 3, « 150 » × 2, « 1500 » × 3, « 0,75 » × 3) : une seule marque, la première */
function cvUneMarque(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const [t,w] of CL[k]){ const d=res[res.length-1];
      if(d&&/^\d+(,\d+)?\s*$/.test(w)&&d[1].trim()===w.trim()) continue; res.push([t,w]); }
    CL[k]=res; } }

/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function cvProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); return W; }
/* Mélange de deux couleurs #rrggbb (u = 0 → a, 1 → b) */
function cvMele(a,b,u){ u=Math.max(0,Math.min(1,u)); const p=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));
  const A=p(a), B=p(b); return '#'+A.map((v,i)=>Math.round(v+(B[i]-v)*u).toString(16).padStart(2,'0')).join(''); }
/* Une ligne pointillée horizontale */
function cvPointille(c,x1,x2,y,coul,lw=5){ c.strokeStyle=coul; c.lineWidth=lw; c.setLineDash([16,12]); c.beginPath(); c.moveTo(x1,y); c.lineTo(x2,y); c.stroke(); c.setLineDash([]); }

/* Le grand pichet de limonade : (CV_X, CV_Y) = le milieu du fond ; cl = l'eau (en cL, à l'échelle), coul = sa couleur, z = l'apparition */
function cvPichet(c,cl,coul,z=1){ if(z<=0) return; const k=Math.min(1.12,z), w=CV_W*k, h=CV_H*k, x=CV_X, y=CV_Y, g=x-w/2;
  if(cl>0){ c.fillStyle=coul; c.globalAlpha=.92; c.fillRect(g+6,y-6-cl*CV_K*k,w-12,cl*CV_K*k); c.globalAlpha=1; }
  c.strokeStyle=VERRE; c.lineWidth=6; c.lineJoin='round'; c.lineCap='round'; c.beginPath();
  c.moveTo(g-4,y-h-6); c.lineTo(g,y-h+10); c.lineTo(g,y-18); c.quadraticCurveTo(g,y,g+18,y); c.lineTo(g+w-18,y); c.quadraticCurveTo(g+w,y,g+w,y-18);
  c.lineTo(g+w,y-h+18); c.lineTo(g+w+26*k,y-h-10); c.stroke();                       /* le bec, à droite */
  c.lineWidth=8; c.beginPath(); c.moveTo(g,y-h+70*k); c.bezierCurveTo(g-80*k,y-h+70*k,g-80*k,y-h+260*k,g,y-h+260*k); c.stroke();   /* l'anse, à gauche */
  /* la rondelle de citron sur le bord */
  const xc=g+44*k, yc=y-h-4; c.fillStyle='#ffe066'; c.strokeStyle='#f59f00'; c.lineWidth=5; c.beginPath(); c.arc(xc,yc,30*k,0,7); c.fill(); c.stroke();
  c.strokeStyle='#f59f00'; c.lineWidth=3; for(let i=0;i<6;i++){ const a=i*Math.PI/3; c.beginPath(); c.moveTo(xc,yc); c.lineTo(xc+24*k*Math.cos(a),yc+24*k*Math.sin(a)); c.stroke(); } }

/* Le verre doseur (gradué de 5 en 5 cL jusqu'à 20 cL) : cl = l'eau dedans, rouge = la graduation 15 surlignée, z = l'apparition */
function cvDoseur(c,cl,z=1,rouge=0,ang=0){ if(z<=0) return; const k=Math.min(1.12,z), w=CV_WD*k, h=CV_HD*k, x=CV_XD, y=CV_YD, g=x-w/2, pas=(h-14)/20;
  c.save(); if(ang){ const sx=g-18*k, sy=y-h-12*k; c.translate(sx,sy); c.rotate(-ang); c.translate(-sx,-sy); }
  if(cl>0){ c.fillStyle=EAU; c.globalAlpha=.9; c.fillRect(g+6,y-6-cl*pas,w-12,cl*pas); c.globalAlpha=1; }
  c.strokeStyle=VERRE; c.lineWidth=6; c.lineJoin='round'; c.lineCap='round'; c.beginPath();
  c.moveTo(g-18*k,y-h-12*k); c.lineTo(g,y-h+8); c.lineTo(g,y-10); c.quadraticCurveTo(g,y,g+10,y); c.lineTo(g+w-10,y); c.quadraticCurveTo(g+w,y,g+w,y-10); c.lineTo(g+w,y-h); c.stroke();
  c.lineWidth=7; c.beginPath(); c.moveTo(g+w,y-h+26*k); c.bezierCurveTo(g+w+50*k,y-h+26*k,g+w+50*k,y-h+120*k,g+w,y-h+120*k); c.stroke();   /* l'anse */
  for(let v=5;v<=20;v+=5){ const yy=y-6-v*pas; c.strokeStyle=(v===15&&rouge>0)?CRAIE.faux:CRAIE.gris; c.lineWidth=(v===15&&rouge>0)?7:4;
    c.beginPath(); c.moveTo(g+6,yy); c.lineTo(g+(v%10?30:44)*k,yy); c.stroke(); } c.restore(); }

/* Une croix de craie (le calcul faux, barré) */
function cvBarre(c,x1,x2,y,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.faux; c.lineWidth=9; c.lineCap='round';
  c.beginPath(); c.moveTo(x1,y+18); c.lineTo(x1+(x2-x1)*u,y+18-36*u); c.stroke(); }

FILMS['convertir']=function(outils){
  cvUneMarque();
  const DUR={'00-accroche':14.06,'01-gout':5.18,'02-question':15.78,'02b-reponse':13.9,'03-ouf':4.58,'04-commentaire':7.63,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,gou,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tLimo=mot('00-accroche','limonade'), t15a=mot('00-accroche','1,5'), tLa=mot('00-accroche','litre'), tEau=mot('00-accroche',"d'eau"),
        tVerre=mot('00-accroche','verre'), tCl=mot('00-accroche','centilitres'), t15b=mot('00-accroche','1,5',2), tLb=mot('00-accroche','litre',2),
        t15=mot('00-accroche','15',3), tCl2=mot('00-accroche','centilitres',2), tHop=mot('00-accroche','Hop'), tVerse=mot('00-accroche','versé');
  const gGoute=mot('01-gout','goûte'), gBeurk=mot('01-gout','Beurk'), gDix=mot('01-gout','Dix'), gFois=mot('01-gout','fois'),
        gTrop=mot('01-gout','trop'), gSucre=mot('01-gout','sucrée');
  const rB=mot('02b-reponse','B'), rL4=mot('02b-reponse','litre',4), r100=mot('02b-reponse','100'), rCl=mot('02b-reponse','centilitres'),
        rDemi=mot('02b-reponse','demi-litre'), r50=mot('02b-reponse','50'), rTout=mot('02b-reponse','tout'), r150=mot('02b-reponse','150'),
        rCl2=mot('02b-reponse','centilitres',2);
  const oManque=mot('03-ouf','manque'), oParf=mot('03-ouf','parfaite');
  const c075=mot('04-commentaire','0,75'), cL=mot('04-commentaire','litre'), cCombien=mot('04-commentaire','combien'),
        cMl=mot('04-commentaire','millilitres'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t15a-.08, finR=rL4-.08;

  /* l'eau du pichet : 15 cL versés à « Hop », puis (ouf) l'eau qui manque jusqu'à 150 cL ; la couleur pâlit en se diluant */
  function eauPichet(T){ if(T<tHop) return [0,CV_FORT];
    if(T<ouf) return [15*lisse((T-tHop)/Math.max(.4,tVerse+.6-tHop)),CV_FORT];
    const u=lisse((T-ouf-.1)/Math.max(.5,oManque+.5-ouf-.1)); return [15+135*u,cvMele(CV_FORT,CV_PALE,u)]; }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une bouteille de 0,75 L ; combien de mL ? */
      if(T>=c075){ bouteilleCraie(c,250,600,160,330,T>=cL?.85*lisse((T-cL)/.6):0,JUS,zoom(T,c075,.4));
        cvProg(c,[[c075,'0,75'],[cL,'0,75 L']],T,CV_XR,170,84,CRAIE.jaune); }
      if(T>=cCombien) cvProg(c,[[cCombien,'= ?'],[cMl,'= ? mL']],T,CV_XR,330,110*zoom(T,cCombien,.6),CRAIE.ok);
      tab.maj(); return; }
    const [cl,coul]=eauPichet(T);
    if(T>=tLimo){ const sec=T>=gBeurk&&T<q?6*Math.sin(Math.min(1,(T-gBeurk)/.8)*Math.PI*4)*(1-Math.min(1,(T-gBeurk)/.8)):0;
      c.save(); c.translate(sec,0); cvPichet(c,cl,coul,zoom(T,tLimo,.4)); c.restore(); }
    /* le repère 1,5 L du pichet, dès que la voix le dit */
    if(T>=tLa){ cvPointille(c,CV_X-CV_W/2+8,CV_X+CV_W/2-8,cvNiv(150),CRAIE.gris,4); if(T<r100) ecrire(c,'1,5 L',CV_X,cvNiv(150)+34,40,CRAIE.gris); }
    if(T<gou){ /* « 1,5 litre… 15 centilitres. Hop, c'est versé ! » */
      if(T>=tVerre){ let d=0; if(T>=t15) d=15*lisse((T-t15)/Math.max(.4,tCl2+.3-t15)); if(T>=tHop) d=15*(1-lisse((T-tHop)/Math.max(.4,tVerse+.6-tHop)));
        const pv=T>=tHop?Math.min(1,(T-tHop)/.35)*(T<tVerse+.6?1:Math.max(0,1-(T-tVerse-.6)/.4)):0;   /* le doseur penche pour verser */
        cvDoseur(c,d,zoom(T,tVerre,.4),T>=t15?1:0,.22*pv);
        if(T>=tCl) ecrire(c,'cL',CV_XD,CV_YD-CV_HD-38,46*zoom(T,tCl,.4),CRAIE.gris);
        /* le filet d'eau qui tombe du doseur dans le pichet */
        if(T>=tHop&&T<tVerse+.6){ c.strokeStyle=EAU; c.lineWidth=10; c.lineCap='round'; c.beginPath();
          c.moveTo(CV_XD-CV_WD/2-18,CV_YD-CV_HD-12); c.quadraticCurveTo(CV_X+85,CV_YD-CV_HD+30,CV_X+55,cvNiv(cl)); c.stroke(); } }
      if(T>=t15a) cvProg(c,[[t15a,'1,5'],[tLa,'1,5 L'],[tEau,"1,5 L d'eau"]],T,CV_XR+30,150,64,CRAIE.jaune);
      if(T>=t15b) cvProg(c,[[t15b,'1,5'],[tLb,'1,5 L'],[t15,'1,5 L = 15'],[tCl2,'1,5 L = 15 cL']],T,CV_XR+30,300,64,CRAIE.faux);
      tab.maj(); return; }
    if(T<q){ /* beurk : dix fois trop sucrée ; le calcul est barré */
      ecrire(c,'1,5 L = 15 cL',CV_XR+30,300,60,CRAIE.faux);
      if(T>=gBeurk){ c.font='800 60px "Segoe UI"'; const W=c.measureText('1,5 L = 15 cL').width; cvBarre(c,CV_XR+30-W/2-10,CV_XR+30+W/2+10,300,(T-gBeurk)/.4);
        ecrire(c,'Beurk !',CV_XR+30,140,84*zoom(T,gBeurk,.3),CRAIE.faux); }
      if(T>=gDix) cvProg(c,[[gDix,'10'],[gFois,'10 fois']],T,CV_XR+30,450,80,CRAIE.jaune);
      if(T>=gTrop) cvProg(c,[[gTrop,'trop'],[gSucre,'trop sucrée !']],T,CV_XR+30,545,64,CRAIE.jaune);
      tab.maj(); return; }
    /* la réponse : 1 L = 100 cL (en bleu), ½ L = 50 cL (en jaune), en tout 150 cL ; dans le pichet, à l'échelle */
    const pale=T>=ouf?1-Math.min(1,(T-ouf)/.6):1, gx=CV_X-CV_W/2+6, lx=CV_W-12;
    if(T>=r100&&pale>0){ c.fillStyle=EAU; c.globalAlpha=.32*pale; c.fillRect(gx,cvNiv(100),lx,cvNiv(0)-cvNiv(100)); c.globalAlpha=pale;
      cvPointille(c,gx+2,gx+lx-2,cvNiv(100),EAU,4); ecrire(c,'100 cL',CV_X,cvNiv(50)-10,50*zoom(T,r100,.4),'#a5d8ff'); c.globalAlpha=1; }
    if(T>=r50&&pale>0){ c.fillStyle=CRAIE.jaune; c.globalAlpha=.3*pale; c.fillRect(gx,cvNiv(150),lx,cvNiv(100)-cvNiv(150)); c.globalAlpha=pale;
      ecrire(c,'50 cL',CV_X,cvNiv(125)+8,50*zoom(T,r50,.4),CRAIE.jaune); c.globalAlpha=1; }
    if(T>=rL4) cvProg(c,[[rL4,'1 L'],[r100,'1 L = 100'],[rCl,'1 L = 100 cL']],T,CV_XR,150,66,'#a5d8ff');
    if(T>=rDemi) cvProg(c,[[rDemi,'½ L'],[r50,'½ L = 50 cL']],T,CV_XR,270,66,CRAIE.jaune);
    if(T>=rTout){ c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.beginPath(); c.moveTo(CV_XR-210,345); c.lineTo(CV_XR+210,345); c.stroke(); }
    if(T>=r150) cvProg(c,[[r150,'1,5 L = 150'],[rCl2,'1,5 L = 150 cL']],T,CV_XR,425,66*zoom(T,r150,.4),CRAIE.ok);
    if(T>=oParf) coche(c,CV_X+180,cvNiv(150)-30,.5);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-gout'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Je prépare une limonade géante :')),
    ...suiteDe(gou,60,62,[a0("1,5 litre d'eau.")],[a0('Mon verre doseur'),a0('est en centilitres.')],
      [a0('1,5 litre…'),a0('15 centilitres.')],[a0("Hop, c'est versé !")]),
    ...suiteDe(q,60,62,[a1('Je goûte…')],[a1('Beurk !'),a1('Dix fois trop sucrée !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de centilitres'),qd('fallait-il verser ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte ; l'explication passe sur l'ardoise */
  rd.saute(2); const r1=rd('1,5 litre,'), r2=rd("c'est 1 litre et demi.");
  groupes.push(...suiteDe(ouf,60,62,[rd('1 litre : 100 centilitres.')],[rd('Un demi-litre : 50.')],[rd('En tout, 150 centilitres.')]),
    ...suiteDe(com,60,62,[a3("J'ajoute l'eau qui manque…")],[a3('Mmm, parfaite !')]),
    ...suiteDe(f,60,60,[a4('À toi : 0,75 litre,'),a4("c'est combien"),a4('de millilitres ?')],[a4('Réponds en commentaire !')]));
  const tq=(m,n=1)=>mot('02-question',m,n)-q;

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="46" y="194" width="88" height="18" fill="#fab005"/><path d="M38 44 V200 Q38 214 52 214 H128 Q142 214 142 200 V52 L154 40" fill="none" stroke="#dee2e6" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`+
    `<path d="M38 70 C8 70 8 130 38 130" fill="none" stroke="#dee2e6" stroke-width="6"/><line x1="44" y1="64" x2="136" y2="64" stroke="#adb5bd" stroke-width="4" stroke-dasharray="10 8"/>`+
    `<circle cx="58" cy="42" r="14" fill="#ffe066" stroke="#f59f00" stroke-width="4"/>`+
    `<rect x="172" y="150" width="40" height="44" fill="#4dabf7"/><path d="M160 112 L168 122 V200 H216 V118" fill="none" stroke="#dee2e6" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>`+
    `<text x="275" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1,5 L :<br>combien de cL ?'+PARI,mini);
  return { clips,FIN,titre:'1,5 L : combien de cL ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,gou,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:rB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['15 cL',tq('A'),tq('centilitres',2)],['150 cL',tq('B'),tq('centilitres',3)],['1500 cL',tq('C'),tq('centilitres',4)]],
      tete:[[r+.1,'Réponse '],[rB,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<gou){ T<tHop?g.montre():g.fier(); }
      else if(T<q){ T<gBeurk?g.reflechit():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<rB?g.ouvre():g.oups(); }
      else if(T<ouf) g.montre();
      else if(T<com){ T<oParf?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
