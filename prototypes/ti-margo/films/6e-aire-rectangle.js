/* ============================================================
   Série Aire 6e — ÉPISODE 01 : LE TAPIS DU VENDEUR. Outils : films/6e-commun.js + 6e-aire.js.
   Ti Margo veut un tapis carré de 3 m de côté ; le vendeur lui en propose un de 12 m².
   4 côtés × 3 = 12… c'est le tour (le périmètre), pas l'aire : A = c × c = 3 × 3 = 9 m² (B).
   Avec le tapis de 12 m², il remonte sur les murs. Commentaire : un tapis de 4 m sur 2,5 m, quelle aire ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le tapis à gauche (à l'échelle : 1 m = TP_S px), le texte à droite (Ti Margo cache le bas du milieu) */
const TP_X=175, TP_Y=150, TP_S=140, TP_XR=850; /* coin haut-gauche du tapis, 1 m en px, milieu de la colonne de droite */
const TP_ROSE='#c2255c', TP_ROSE_C='#f783ac', TP_SOL='#9c6b45', TP_MUR='#efe6d2', TP_MUR_G='#d9cba9';

/* Un tapis (coin x, y ; w × h) : rose framboise, une bordure claire, un losange au milieu, des franges à gauche et à droite */
function tpTapis(c,x,y,w,h,z=1){ if(z<=0) return; const k=Math.min(1.15,z), cx=x+w/2, cy=y+h/2;
  c.save(); c.translate(cx,cy); c.scale(k,k); c.translate(-cx,-cy);
  c.strokeStyle='#f1f3f5'; c.lineWidth=4; c.lineCap='round';
  for(let v=y+12;v<=y+h-12;v+=18){ c.beginPath(); c.moveTo(x,v); c.lineTo(x-16,v); c.moveTo(x+w,v); c.lineTo(x+w+16,v); c.stroke(); }
  c.fillStyle=TP_ROSE; c.fillRect(x,y,w,h);
  c.strokeStyle=TP_ROSE_C; c.lineWidth=6; c.strokeRect(x+16,y+16,w-32,h-32);
  const r=Math.min(w,h)*.26; c.beginPath(); c.moveTo(cx,cy-r); c.lineTo(cx+r,cy); c.lineTo(cx,cy+r); c.lineTo(cx-r,cy); c.closePath(); c.stroke();
  c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,w,h); c.restore(); }
/* Une flèche de cote (de x1,y1 à x2,y2), tracée de u = 0 à 1 */
function tpCote(c,x1,y1,x2,y2,u,coul=CRAIE.jaune){ if(u<=0) return; u=Math.min(1,u); const xb=x1+(x2-x1)*u, yb=y1+(y2-y1)*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(xb,yb); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1); for(const [px,py,aa] of [[x1,y1,a+Math.PI],[xb,yb,a]]){ c.beginPath();
    c.moveTo(px,py); c.lineTo(px-18*Math.cos(aa-.45),py-18*Math.sin(aa-.45)); c.lineTo(px-18*Math.cos(aa+.45),py-18*Math.sin(aa+.45)); c.closePath(); c.fill(); } }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; centré sur sa forme finale */
function tpProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }

/* La chambre en perspective (le coin du fond) : 1 m = 120 px ; le sol 3 m × 3 m, le mur du fond et le mur de gauche */
const CH_X=90, CH_Y=600, CH_S=112, CH_DX=54, CH_DY=-46, CH_H=2.4;
const chP=(i,j)=>[CH_X+i*CH_S+j*CH_DX, CH_Y+j*CH_DY];          /* un point du sol (i m vers la droite, j m vers le fond) */
const chM=(i,z)=>[CH_X+3*CH_DX+i*CH_S, CH_Y+3*CH_DY-z*CH_S];   /* un point du mur du fond (i m vers la droite, z m de haut) */
function chPoly(c,pts,fond,bord,lw=4){ c.beginPath(); c.moveTo(...pts[0]); for(const p of pts.slice(1)) c.lineTo(...p); c.closePath();
  if(fond){ c.fillStyle=fond; c.fill(); } if(bord){ c.strokeStyle=bord; c.lineWidth=lw; c.lineJoin='round'; c.stroke(); } }
function chambre(c){
  chPoly(c,[chP(0,0),chP(0,3),[chP(0,3)[0],chP(0,3)[1]-CH_H*CH_S],[CH_X,CH_Y-CH_H*CH_S]],TP_MUR_G,CRAIE.blanc);  /* mur de gauche */
  chPoly(c,[chM(0,0),chM(3,0),chM(3,CH_H),chM(0,CH_H)],TP_MUR,CRAIE.blanc);                                        /* mur du fond */
  chPoly(c,[chP(0,0),chP(3,0),chP(3,3),chP(0,3)],TP_SOL,CRAIE.blanc);                                             /* le sol */
  c.strokeStyle='rgba(255,255,255,.3)'; c.lineWidth=3; c.setLineDash([10,10]); c.beginPath();
  for(let k=1;k<3;k++){ c.moveTo(...chP(k,0)); c.lineTo(...chP(k,3)); c.moveTo(...chP(0,k)); c.lineTo(...chP(3,k)); } c.stroke(); c.setLineDash([]); }
/* Le tapis de 12 m² (3 m × 4 m) : les rangées j = 0…2 sur le sol (v = 0…1 chacune), la 4e remonte sur le mur (w = 0…1) */
function chTapis(c,v,w){
  for(let j=0;j<3;j++){ const u=Math.max(0,Math.min(1,v[j])); if(u<=0) continue;
    chPoly(c,[chP(0,j),chP(3,j),chP(3,j+u),chP(0,j+u)],TP_ROSE,TP_ROSE_C,4);
    c.strokeStyle=TP_ROSE_C; c.lineWidth=3; c.beginPath(); for(let i=1;i<3;i++){ c.moveTo(...chP(i,j)); c.lineTo(...chP(i,j+u)); } c.stroke(); }
  if(w>0){ w=Math.min(1,w); chPoly(c,[chM(0,0),chM(3,0),chM(3,w),chM(0,w)],TP_ROSE,TP_ROSE_C,4);
    c.strokeStyle=TP_ROSE_C; c.lineWidth=3; c.beginPath(); for(let i=1;i<3;i++){ c.moveTo(...chM(i,0)); c.lineTo(...chM(i,w)); } c.stroke();
    /* le pli du tapis au pied du mur */
    c.strokeStyle='#862e9c'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(...chM(0,0)); c.lineTo(...chM(3,0)); c.stroke(); } }

FILMS['rectangle']=function(outils){
  const DUR={'00-accroche':7.96,'01-calculer':8.99,'02-question':14.62,'02b-reponse':10.14,'03-ouf':4.56,'04-commentaire':9.53,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,cal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  { const css=document.createElement('style'); css.textContent='#cq{font-size:56px!important;line-height:1.12;}#pause{font-size:52px!important;line-height:1.12;}'; document.head.append(css); }

  /* « 3 mètres », « 12 mètres »… ont deux marques (le nombre, puis le mot) : on les prend par leur rang (marque) */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-calculer',k), mq=k=>marque('02-question',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  const tpP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const tLe=m0(13), tVendeur=m0(14), t12=m0(19), t12m=m0(20), t12c=m0(21);
  const t4=m1(4), tCotes=m1(5), tF4=m1(6), tFois=m1(7), tF3=m1(8), tF12=m1(9), tRaison=m1(13);
  const tB=mr(1), r3=mr(7), rFois=mr(8), r3b=mr(9), r9=mr(10), r9m=mr(11), r9c=mr(12), r12=mr(13), rTour=mr(16), rMetres=mr(18), rPeri=mr(20);
  const oTapis=m3(2), o12=m3(4), o12m=m3(5), o12c=m3(6), oRemonte=m3(8), oMurs=m3(11);
  const cTapis=m4(4), c4=m4(6), c4m=m4(7), cSur=m4(8), c2=m4(9), cVirg=m4(10), c5=m4(11), c5m=m4(12), cAire=m4(16), tRep=m4(17);
  const finTitre=tLe-.08, finR=r3-.08;
  const W=3*TP_S;

  /* Le tapis carré 3 × 3 et sa cote du haut (« 3 m », déjà dit) ; gauche = la cote de gauche aussi */
  function tapisCote(c,T,gauche=false){ tpTapis(c,TP_X,TP_Y,W,W);
    tpCote(c,TP_X,TP_Y-40,TP_X+W,TP_Y-40,1); ecrire(c,'3 m',TP_X+W/2,TP_Y-88,54,CRAIE.jaune);
    if(gauche){ tpCote(c,TP_X-44,TP_Y,TP_X-44,TP_Y+W,1); ecrire(c,'3 m',TP_X-104,TP_Y+W/2,46,CRAIE.jaune); } }
  /* Le vendeur et son tapis de 12 m² (colonne de droite) */
  function vendeur(c,T,barre=false){
    if(T>=tVendeur) ecrire(c,'Le vendeur :',TP_XR,170,52,CRAIE.gris);
    if(T>=t12) tpProg(c,[[t12,'12'],[t12m,'12 m'],[t12c,'12 m²']],T,TP_XR,255,86,TP_ROSE_C); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un tapis de 4 m sur 2,5 m (1 m = 130 px) */
      const S=130, X=205, Y=180;
      if(T>=cTapis) tpTapis(c,X,Y,4*S,2.5*S,zoom(T,cTapis,.3));
      tpCote(c,X,Y-40,X+4*S,Y-40,(T-c4)/(cSur-c4));
      if(T>=c4) tpProg(c,[[c4,'4'],[c4m,'4 m']],T,X+2*S,Y-88,54,CRAIE.jaune);
      tpCote(c,X-46,Y,X-46,Y+2.5*S,(T-c2)/(c5m+.3-c2));
      if(T>=c2) tpProg(c,[[c2,'2'],[cVirg,'2,'],[c5,'2,5'],[c5m,'2,5 m']],T,X-134,Y+1.25*S,50,CRAIE.jaune);
      if(T>=cAire) ecrire(c,'? m²',TP_XR+25,Y+1.25*S,96*zoom(T,cAire,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<cal){ /* le tapis voulu, et celui du vendeur */
      if(T>=finTitre) tapisCote(c,T);
      vendeur(c,T); tab.maj(); return; }
    if(T<finR){ /* « 4 côtés… 4 fois 3, 12 » : le tour se trace en orange, un « 3 m » par côté */
      tapisCote(c,T); vendeur(c,T);
      const d=tCotes+.6-t4; tourCraie(c,TP_X,TP_Y,W,W,(T-t4)/d);
      const lab=[[TP_X+W+72,TP_Y+W/2],[TP_X+W/2,TP_Y+W+46],[TP_X-80,TP_Y+W/2]];
      lab.forEach(([x,y],k)=>{ const tk=t4+d*(k+2)/4; if(T>=tk) ecrire(c,'3 m',x,y,46*zoom(T,tk,.4),TOUR); });
      if(T>=tF4) tpProg(c,[[tF4,'4'],[tFois,'4 ×'],[tF3,'4 × 3'],[tF12,'4 × 3 = 12']],T,TP_XR,450,62,TOUR);
      if(T>=tRaison) ecrire(c,'?',TP_XR,570,130*zoom(T,tRaison,.5),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : 9 carreaux de 1 m² ; 12, c'est le tour */
      tapisCote(c,T,true);
      const pas=(r9-.12-r3)/8; for(let k=0;k<9;k++){ const i=k%3, j=Math.floor(k/3); if(T>=r3+k*pas){ c.fillStyle=CARREAU_B; c.fillRect(TP_X+i*TP_S,TP_Y+j*TP_S,TP_S,TP_S); } carreauCraie(c,TP_X+i*TP_S,TP_Y+j*TP_S,TP_S,zoom(T,r3+k*pas,.3)); }
      tpProg(c,[[r3,'3'],[rFois,'3 ×'],[r3b,'3 × 3'],[r9,'3 × 3 = 9'],[r9m,'3 × 3 = 9 m'],[r9c,'3 × 3 = 9 m²']],T,TP_XR,180,56,CRAIE.ok);
      if(T>=r9c+.3) coche(c,TP_XR-60,265,.42);
      tourCraie(c,TP_X,TP_Y,W,W,(T-r12)/(rTour+.4-r12));
      if(T>=r12) tpProg(c,[[r12,'12'],[rMetres,'12 m']],T,TP_XR,380,80,TOUR);
      if(T>=rTour) ecrire(c,'le tour',TP_XR,460,54*zoom(T,rTour,.4),TOUR);
      if(T>=rPeri) ecrire(c,'le périmètre !',TP_XR,535,50*zoom(T,rPeri,.4),TOUR);
      tab.maj(); return; }
    /* ouf : le tapis de 12 m² se déroule dans la chambre de 9 m²… et remonte sur le mur */
    chambre(c);
    const pasT=(o12c+.2-oTapis)/3; chTapis(c,[0,1,2].map(j=>(T-oTapis-j*pasT)/pasT),(T-oRemonte)/(oMurs+.2-oRemonte));
    ecrire(c,'le sol : 9 m²',TP_XR,170,54,CRAIE.ok);
    if(T>=oTapis) ecrire(c,'le tapis :',TP_XR,265,52,CRAIE.gris);
    if(T>=o12) tpProg(c,[[o12,'12'],[o12m,'12 m'],[o12c,'12 m²']],T,TP_XR,345,86,TP_ROSE_C);
    if(T>=oMurs){ const z=zoom(T,oMurs,.3); ecrire(c,'sur les',TP_XR,450,54*z,CRAIE.faux); ecrire(c,'murs !',TP_XR,520,54*z,CRAIE.faux); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-calculer'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je veux un tapis carré'),a0('de 3 mètres de côté'),a0('pour ma chambre.')),
    ...suiteDe(cal,60,62,[a0('Le vendeur m’en propose'),a0('un de 12 mètres carrés.')]),
    ...suiteDe(q,60,62,[a1('3 mètres de côté…'),a1('4 côtés…')],[tpP(m1,'4 × 3, 12.',[6,7,8,9])],[a1.jusque('Le')('Le vendeur a raison, non ?')]),
    ...suiteDe(ouf,60,62,[tpP(mr,'3 × 3 = 9 mètres carrés.',[7,8,9,10,10,11,12])],
      [tpP(mr,'12, c’est le tour en mètres :',[13,14,15,16,17,18,18]),tpP(mr,'le périmètre !',[19,20,20])]),
    ...suiteDe(com,60,62,[a3('Avec le tapis'),a3('de 12 mètres carrés…')],[a3('il remonte sur les murs !')]),
    ...suiteDe(f,60,60,[a4('À toi : un tapis rectangulaire'),tpP(m4,'de 4 mètres sur 2,5 mètres.',[5,6,7,8,11,12])],[a4.jusque('Quelle')('Quelle est son aire ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle est l’aire d’un carré'),qd('de 3 mètres de côté ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte ; le calcul passe ensuite sur l'ardoise (les 9 carreaux) */
  const rep1=tpP(mr,'A = c × c',[2,3,4,5,6]);
  /* Les choix s'écrivent au fil de la voix : « 12 », « 12 m », « 12 m² » */
  const tq=k=>mq(k)-q;
  const ETAPES=[[[12,'12'],[13,'12 m'],[14,'12 m²']],[[16,'9'],[17,'9 m'],[18,'9 m²']],[[20,'6'],[21,'6 m'],[22,'6 m²']]];
  const choix=[['12 m²',tq(11),tq(12)],['9 m²',tq(15),tq(16)],['6 m²',tq(19),tq(20)]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [k,e] of et) if(T>=mq(k)) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [70,88,106,124,142,160,178,196].map(v=>`<line x1="74" y1="${v}" x2="64" y2="${v}" stroke="#f1f3f5" stroke-width="3"/><line x1="214" y1="${v}" x2="224" y2="${v}" stroke="#f1f3f5" stroke-width="3"/>`).join('')+
    `<rect x="74" y="64" width="140" height="140" fill="${TP_ROSE}" stroke="#f8f9fa" stroke-width="4"/>`+
    `<rect x="84" y="74" width="120" height="120" fill="none" stroke="${TP_ROSE_C}" stroke-width="4"/>`+
    `<path d="M144 98 L180 134 L144 170 L108 134 Z" fill="none" stroke="${TP_ROSE_C}" stroke-width="4"/>`+
    `<text x="144" y="50" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ffd43b" text-anchor="middle">3 m</text>`+
    `<text x="284" y="168" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Tapis de 3 m :<br>quelle aire ?'+PARI,mini);
  return { clips,FIN,titre:'Le tapis du vendeur',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cal,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cal) g.ouvre();
      else if(T<q){ T<tRaison?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<r12?g.montre():(T<rPeri?g.montre():g.fier()); }
      else if(T<com){ T<oRemonte?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
