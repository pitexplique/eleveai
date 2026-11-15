/* ============================================================
   Série Périmètre 6e — ÉPISODE 01 : LA GUIRLANDE TROP COURTE. Outils : films/6e-commun.js + 6e-perimetre.js.
   La fenêtre de Ti Margo est un carré de 1,2 m de côté ; il veut une guirlande lumineuse tout autour.
   Il achète 2,4 m (1,2 × 2)… Un carré a 4 côtés égaux : P = 4 × c = 4 × 1,2 = 4,8 m (A).
   Avec 2,4 m, la guirlande ne s'allume que sur deux côtés : l'autre moitié reste dans le noir.
   Commentaire : une fenêtre rectangulaire de 1,5 m sur 1 m, quelle longueur de guirlande pour le tour ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; la fenêtre à gauche (à l'échelle : 1 m = GL_M px), le texte à droite (Ti Margo cache le bas du milieu).
   Sommets : 0 en haut à gauche, 1 en haut à droite, 2 en bas à droite, 3 en bas à gauche ; côté i = du sommet i au sommet i+1. */
const GL_M=250;                                     /* 1 m = 250 px : 1,2 m = 300 px, 1,5 m = 375 px */
const GL_X=200, GL_Y=170, GL_C=1.2*GL_M;            /* la fenêtre carrée */
const GL_FEN=[[GL_X,GL_Y],[GL_X+GL_C,GL_Y],[GL_X+GL_C,GL_Y+GL_C],[GL_X,GL_Y+GL_C]];
const GL_DX=170, GL_DY=200, GL_DW=1.5*GL_M, GL_DH=GL_M;   /* la fenêtre du défi, 1,5 m sur 1 m */
const GL_DEFI=[[GL_DX,GL_DY],[GL_DX+GL_DW,GL_DY],[GL_DX+GL_DW,GL_DY+GL_DH],[GL_DX,GL_DY+GL_DH]];
const GL_XR=885;                                    /* le milieu de la colonne de texte, à droite */
const GL_BOIS='#8a5a2b', GL_VITRE='#a5d8ff', GL_VITRE2='#74c0fc', GL_NUIT='rgba(6,10,28,.84)';

/* La fenêtre (coin haut-gauche x, y ; w × h) : le cadre en bois, la vitre bleu ciel, le croisillon ; elle grossit quand z va de 0 à 1 */
function glFenetre(c,x,y,w,h,z=1){ if(z<=0) return; const k=Math.min(1.12,z), cx=x+w/2, cy=y+h/2;
  c.save(); c.translate(cx,cy); c.scale(k,k); c.translate(-cx,-cy);
  const g=c.createLinearGradient(x,y,x+w,y+h); g.addColorStop(0,GL_VITRE); g.addColorStop(1,GL_VITRE2);
  c.fillStyle=g; c.fillRect(x,y,w,h);
  c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=8; c.lineCap='round'; c.beginPath();
  c.moveTo(x+w*.16,y+h*.3); c.lineTo(x+w*.3,y+h*.16); c.moveTo(x+w*.62,y+h*.8); c.lineTo(x+w*.8,y+h*.62); c.stroke();
  c.strokeStyle=GL_BOIS; c.lineWidth=12; c.beginPath(); c.moveTo(cx,y); c.lineTo(cx,y+h); c.moveTo(x,cy); c.lineTo(x+w,cy); c.stroke();
  c.lineWidth=22; c.lineJoin='miter'; c.strokeRect(x,y,w,h);
  c.restore(); }

/* La guirlande sur le tour : u de 0 à 1 (depuis le sommet 0, dans le sens des aiguilles d'une montre) ;
   modes[i] pour le côté i : 'voulu' (pointillé orange), 'plein' (orange, ampoules jaunes), 'allume' (+ halos qui scintillent), 'eteint' (gris) */
function glGuirlande(c,pts,u,modes,T=0){ if(u<=0) return; u=Math.min(1,u); const n=pts.length;
  const L=pts.map((a,i)=>{ const b=pts[(i+1)%n]; return Math.hypot(b[0]-a[0],b[1]-a[1]); }), tot=L.reduce((s,l)=>s+l,0);
  let reste=tot*u;
  for(let i=0;i<n&&reste>0;i++){ const a=pts[i], b=pts[(i+1)%n], l=L[i], v=Math.min(1,reste/l); reste-=l;
    const ex=a[0]+(b[0]-a[0])*v, ey=a[1]+(b[1]-a[1])*v, m=modes[i]||'plein';
    /* les ampoules : une tous les ~40 px, au milieu de chaque tronçon */
    const nb=Math.round(l/40), amp=[]; for(let k=0;k<nb;k++){ const s=(k+.5)/nb; if(s<=v) amp.push([a[0]+(b[0]-a[0])*s,a[1]+(b[1]-a[1])*s,k+i*nb]); }
    if(m==='allume') amp.forEach(([x,y,k])=>{ const r=34+6*Math.sin(T*7+k*1.7), h=c.createRadialGradient(x,y,2,x,y,r);
      h.addColorStop(0,'rgba(255,236,153,.85)'); h.addColorStop(1,'rgba(255,200,60,0)'); c.fillStyle=h; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); });
    c.lineCap='round'; c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(ex,ey);
    if(m==='voulu'){ c.strokeStyle=TOUR; c.lineWidth=9; c.setLineDash([20,16]); c.stroke(); c.setLineDash([]); continue; }
    c.strokeStyle=m==='eteint'?'#868e96':TOUR; c.lineWidth=m==='eteint'?7:10; c.stroke();
    amp.forEach(([x,y,k])=>{ c.beginPath(); c.arc(x,y,m==='eteint'?8:10,0,7);
      c.fillStyle=m==='eteint'?'#495057':(m==='allume'?(Math.sin(T*9+k*2.3)>-.6?'#fff9db':'#ffe066'):'#ffe066'); c.fill();
      if(m==='eteint'){ c.strokeStyle='#ced4da'; c.lineWidth=3; c.stroke(); } }); } }

/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; centré sur sa forme finale */
function glProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }

FILMS['rectangle']=function(outils){
  const DUR={'00-accroche':7.61,'01-acheter':8.75,'02-question':16.58,'02b-reponse':13.61,'03-ouf':6.71,'04-commentaire':10.65,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,ach,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  { const css=document.createElement('style'); css.textContent='#cq{font-size:56px!important;line-height:1.12;}#pause{font-size:52px!important;line-height:1.12;}'; document.head.append(css); }

  /* « 1 virgule 2 mètre » a quatre marques (« 1 », « virgule », « 2 », « mètre ») : on les prend par leur rang (marque) */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-acheter',k), mq=k=>marque('02-question',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  /* Une légende dont chaque mot prend l'instant d'une marque (pour « 1,2 » : le « 2 ») */
  const glP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const tJe=m0(12), tTout=m0(17), tAutour=m0(18);
  const tAchete=m1(2), tGuir=m1(8), tNon=m1(16);
  const tA=mr(1), finR=mr(13)-.08, rAvec=mr(22), r24=mr(25), rMoitie=mr(32);
  const oAllume=m3(2), oDeux=m3(4), oAutre=m3(7), oNoir=m3(12);
  const cFen=m4(4), cQuelle=m4(13), cGuir=m4(16), cTour=m4(19), tRep=m4(20);
  const finTitre=tJe-.08;

  /* Les quatre « 1,2 m » de la fenêtre carrée (déjà dits) : côtés horizontaux écart 58, verticaux écart 92 */
  function cotes(c,coul=CRAIE.jaune,quels=[0,1,2,3]){ quels.forEach(i=>coteCraie(c,GL_FEN,i,'1,2 m',1,coul,48,i%2?92:58)); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une fenêtre rectangulaire de 1,5 m sur 1 m, à la même échelle */
      if(T>=cFen) glFenetre(c,GL_DX,GL_DY,GL_DW,GL_DH,zoom(T,cFen,.3));
      if(T>=m4(6)) glProg(c,[[m4(6),'1'],[m4(7),'1,'],[m4(8),'1,5'],[m4(9),'1,5 m']],T,GL_DX+GL_DW/2,GL_DY-58,48,CRAIE.jaune);
      if(T>=m4(11)) glProg(c,[[m4(11),'1'],[m4(12),'1 m']],T,GL_DX-84,GL_DY+GL_DH/2,48,CRAIE.jaune);
      glGuirlande(c,GL_DEFI,(T-cGuir)/(cTour+.4-cGuir),['voulu','voulu','voulu','voulu']);
      if(T>=cQuelle) ecrire(c,'?',GL_XR,GL_DY+GL_DH/2,200*zoom(T,cQuelle,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=finTitre) glFenetre(c,GL_X,GL_Y,GL_C,GL_C);
    if(T<ach){ /* l'accroche : la fenêtre, ses 4 côtés de 1,2 m, la guirlande voulue tout autour */
      if(T>=finTitre) cotes(c);
      glGuirlande(c,GL_FEN,(T-tTout)/(tAutour+.7-tTout),['voulu','voulu','voulu','voulu']);
      tab.maj(); return; }
    if(T<finR){ /* au magasin : 2,4 m de guirlande ; 1,2 × 2… */
      cotes(c); glGuirlande(c,GL_FEN,1,['voulu','voulu','voulu','voulu']);
      if(T>=tAchete) ecrire(c,"J'achète :",GL_XR,150,52*zoom(T,tAchete,.3),CRAIE.gris);
      if(T>=m1(3)) glProg(c,[[m1(3),'2'],[m1(4),'2,'],[m1(5),'2,4'],[m1(6),'2,4 m']],T,GL_XR,240,86,CRAIE.jaune);
      if(T>=tGuir) ecrire(c,'de guirlande',GL_XR,318,46*zoom(T,tGuir,.3),CRAIE.blanc);
      if(T>=m1(9)) glProg(c,[[m1(9),'1'],[m1(10),'1,'],[m1(11),'1,2'],[m1(12),'1,2 ×'],[m1(13),'1,2 × 2']],T,GL_XR,430,64,CRAIE.blanc);
      if(T>=tNon) ecrire(c,'?',GL_XR,560,130*zoom(T,tNon,.5),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : le tour se trace pendant « 4 fois 1,2 » ; puis 2,4 m n'en couvrent que la moitié */
      const moitie=T>=r24;
      cotes(c,CRAIE.jaune);
      glGuirlande(c,GL_FEN,1,moitie?['plein','plein','eteint','eteint']:['voulu','voulu','voulu','voulu']);
      if(!moitie) glGuirlande(c,GL_FEN,(T-mr(13))/(mr(20)-mr(13)),['plein','plein','plein','plein']);
      ecrire(c,'P = 4 × c',GL_XR,110,58,CRAIE.blanc);
      glProg(c,[[mr(13),'4'],[mr(14),'4 ×'],[mr(15),'4 × 1'],[mr(16),'4 × 1,'],[mr(17),'4 × 1,2']],T,GL_XR,200,62,TOUR);
      if(T>=mr(18)) glProg(c,[[mr(18),'= 4'],[mr(19),'= 4,'],[mr(20),'= 4,8'],[mr(21),'= 4,8 m']],T,GL_XR,290,72,CRAIE.ok);
      if(T>=mr(21)+.3) coche(c,GL_XR-55,372,.36);
      if(T>=mr(23)) glProg(c,[[mr(23),'avec 2'],[mr(24),'avec 2,'],[mr(25),'avec 2,4'],[mr(26),'avec 2,4 m']],T,GL_XR,470,58,CRAIE.faux);
      if(T>=rMoitie) ecrire(c,'la moitié !',GL_XR-12,550,50*zoom(T,rMoitie,.2),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : la nuit tombe ; la guirlande s'allume en haut et à droite, la gauche et le bas restent dans le noir */
    const nuit=Math.min(1,Math.max(0,(T-oAllume)/.6));
    if(nuit>0){ c.save(); c.globalAlpha=nuit; c.fillStyle=GL_NUIT; c.fillRect(0,0,c.canvas.width,c.canvas.height); c.restore(); }
    if(nuit<1) cotes(c,CRAIE.jaune);
    else cotes(c,CRAIE.jaune,[0,1]);
    glGuirlande(c,GL_FEN,1,nuit>0?['allume','allume','eteint','eteint']:['plein','plein','eteint','eteint'],T);
    if(T>=oDeux) ecrire(c,'2 côtés',GL_XR,250,72*zoom(T,oDeux,.4),'#ffe066');
    if(T>=m3(6)) ecrire(c,'seulement',GL_XR,330,56*zoom(T,m3(6),.4),'#ffe066');
    if(T>=oNoir){ const z=zoom(T,oNoir,.4); ecrire(c,'dans',GL_XR,450,56*z,CRAIE.gris); ecrire(c,'le noir !',GL_XR,525,56*z,CRAIE.gris); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Ma fenêtre est un carré'),glP(m0,'de 1,2 mètre de côté.',[5,8,9,10,11])),
    ...suiteDe(ach,60,62,[a0.jusque('Je')('Je veux une guirlande'),a0('lumineuse tout autour !')]),
    ...suiteDe(q,60,62,[glP(m1,'Au magasin, j’achète',[0,1,2]),glP(m1,'2,4 mètres de guirlande.',[5,6,7,8])],
      [glP(m1,'1,2 × 2…',[11,12,13]),glP(m1,'ça devrait suffire, non ?',[14,15,16,17])]),
    ...suiteDe(ouf,60,62,[glP(mr,'4 × 1,2 = 4,8 mètres.',[13,14,17,20,20,21])],
      [glP(mr,'Avec 2,4 mètres,',[22,25,26]),glP(mr,'je n’en fais que la moitié !',[27,28,29,30,31,32])]),
    ...suiteDe(com,60,62,[a3('Ma guirlande s’allume…'),a3('sur deux côtés seulement.')],[a3('L’autre moitié'),a3('reste dans le noir !')]),
    ...suiteDe(f,60,60,[a4('À toi : une fenêtre'),a4('rectangulaire'),glP(m4,'de 1,5 mètre sur 1 mètre.',[5,8,9,10,11,12])],
      [a4.jusque('Quelle')('Quelle longueur de guirlande'),a4('pour le tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle longueur de guirlande'),qd('faut-il pour tout le tour ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte ; le calcul passe ensuite sur l'ardoise (le tour qui se trace) */
  const rep1=glP(mr,'4 côtés égaux :',[5,6,7,7]), rep2=glP(mr,'P = 4 × c',[8,9,10,11,12]);
  /* Les choix s'écrivent au fil de la voix : « 4 », « 4, », « 4,8 », « 4,8 m » */
  const tq=k=>mq(k)-q;
  const ETAPES=[[[11,'4'],[12,'4,'],[13,'4,8'],[14,'4,8 m']],[[16,'2'],[17,'2,'],[18,'2,4'],[19,'2,4 m']],
    [[21,'1'],[22,'1,'],[23,'1,44'],[24,'1,44 m']]];
  const choix=[['4,8 m',tq(10),tq(11)],['2,4 m',tq(15),tq(16)],['1,44 m',tq(20),tq(21)]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [k,e] of et) if(T>=mq(k)) s=e; choix[i][0]=s; }); }

  const amp=(x1,y1,x2,y2,n)=>Array.from({length:n},(_,k)=>{ const s=(k+.5)/n; return `<circle cx="${x1+(x2-x1)*s}" cy="${y1+(y2-y1)*s}" r="6" fill="#ffe066"/>`; }).join('');
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="60" y="66" width="140" height="140" fill="#a5d8ff"/>`+
    `<path d="M130 66 V206 M60 136 H200" stroke="#8a5a2b" stroke-width="6"/>`+
    `<rect x="60" y="66" width="140" height="140" fill="none" stroke="#ff922b" stroke-width="7"/>`+
    amp(60,66,200,66,4)+amp(200,66,200,206,4)+amp(200,206,60,206,4)+amp(60,206,60,66,4)+
    `<text x="130" y="50" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ffd43b" text-anchor="middle">1,2 m</text>`+
    `<text x="270" y="172" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Carré de 1,2 m :<br>quelle guirlande ?'+PARI,mini);
  return { clips,FIN,titre:'La guirlande trop courte',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ach,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[rep1,rep2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ach){ T<tTout?g.montre():g.fier(); }
      else if(T<q){ T<m1(14)?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<rAvec?g.montre():g.oups(); }
      else if(T<com){ T<oAutre?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
