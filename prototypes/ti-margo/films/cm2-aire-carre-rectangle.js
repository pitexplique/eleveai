/* ============================================================
   Série Aire CM2 — ÉPISODE 04 : LE MUR À REPEINDRE. Outils : films/cm2-commun.js + cm2-aire.js.
   Ti Margo repeint le mur de sa chambre en vert margouillat : 3 m de long, 2,5 m de haut.
   Sur le pot : 1 pot couvre 5 m². D'abord l'aire du mur : 3 × 2,5 = 7,5 m² (B) ; le leurre 11 = le périmètre.
   Un pot ne suffit pas, il en faut 2… et avec le reste, il repeint sa queue.
   Commentaire : un mur de 4 m sur 2,5 m, quelle est son aire ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le mur à gauche (à l'échelle : 1 m = CR_S px), le texte à droite (Ti Margo cache le bas du milieu) */
const CR_X=200, CR_Y=140, CR_S=160, CR_XR=870; /* coin haut-gauche du mur, 1 m en px, milieu de la colonne de droite */
const CR_VERT='#40c057', CR_VERT_B='#2b8a3e', CR_MUR='#efe6d2';

/* Une case (coin x, y ; w × h) qui grossit depuis son centre quand z va de 0 à 1 */
function crCase(c,x,y,w,h,z=1,coul=CARREAU,bord=CARREAU_B){ if(z<=0) return; const k=Math.min(1.25,z), dx=w*(1-k)/2, dy=h*(1-k)/2;
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=Math.max(3,Math.min(w,h)*.06); c.beginPath(); c.roundRect(x+dx+3,y+dy+3,w*k-6,h*k-6,8); c.fill(); c.stroke(); }
/* Le mur nu : ncol m de long, haut m de haut (1 m = s px) */
function crMur(c,x,y,ncol,haut,s){ c.fillStyle=CR_MUR; c.fillRect(x,y,ncol*s,haut*s); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,ncol*s,haut*s); }
/* Les cases de 1 m² du mur 3 × 2,5 (rangée par rangée, la dernière rangée = des demi-cases), dans l'ordre k = 0…8 */
const CR_CASES=[...[0,1].flatMap(j=>[0,1,2].map(i=>[CR_X+i*CR_S,CR_Y+j*CR_S,CR_S,CR_S])),...[0,1,2].map(i=>[CR_X+i*CR_S,CR_Y+2*CR_S,CR_S,CR_S/2])];
/* La peinture verte sur une case, de u = 0 à 1 (le rouleau descend) */
function crPeint(c,[x,y,w,h],u){ if(u<=0) return; u=Math.min(1,u); c.fillStyle='rgba(64,192,87,.92)'; c.fillRect(x+2,y+2,w-4,(h-4)*u); }
/* Une flèche de cote (de a à b, horizontale ou verticale), tracée de u = 0 à 1 */
function crCote(c,x1,y1,x2,y2,u,coul=CRAIE.jaune){ if(u<=0) return; u=Math.min(1,u); const xb=x1+(x2-x1)*u, yb=y1+(y2-y1)*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(xb,yb); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1); for(const [px,py,aa] of [[x1,y1,a+Math.PI],[xb,yb,a]]){ c.beginPath();
    c.moveTo(px,py); c.lineTo(px-18*Math.cos(aa-.45),py-18*Math.sin(aa-.45)); c.lineTo(px-18*Math.cos(aa+.45),py-18*Math.sin(aa+.45)); c.closePath(); c.fill(); } }
/* Un pot de peinture verte (centre cx ; bas by ; k = l'échelle), qui grossit quand z va de 0 à 1 */
function crPot(c,cx,by,k,z=1){ if(z<=0) return; k*=Math.min(1.2,z); const w=130*k, h=140*k, x=cx-w/2, y=by-h;
  c.strokeStyle='#495057'; c.lineWidth=5*k; c.beginPath(); c.arc(cx,y,w*.46,Math.PI,0); c.stroke(); /* l'anse */
  c.fillStyle='#ced4da'; c.strokeStyle='#495057'; c.lineWidth=5*k; c.beginPath(); c.roundRect(x,y,w,h,10*k); c.fill(); c.stroke();
  c.fillStyle=CR_VERT; c.fillRect(x+4*k,y+h*.3,w-8*k,h*.42); /* l'étiquette verte */
  c.fillStyle=CR_VERT; c.beginPath(); c.ellipse(cx,y+3*k,w/2,12*k,0,0,7); c.fill(); /* la peinture qui déborde */
  for(const [dx,l] of [[-.3,.22],[.05,.14],[.32,.2]]){ c.beginPath(); c.roundRect(cx+dx*w-6*k,y,12*k,h*l,6*k); c.fill(); }
  c.strokeStyle='#495057'; c.lineWidth=4*k; c.beginPath(); c.ellipse(cx,y+3*k,w/2,12*k,0,0,7); c.stroke();
  c.fillStyle='#fff'; c.font=`800 ${30*k}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle'; c.fillText('VERT',cx,y+h*.51); }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; centré sur sa forme finale */
function crProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
/* La queue de Ti Margo, repeinte en vert : une spirale (départ x, y), tracée de u = 0 à 1 */
function crQueue(c,x,y,u){ if(u<=0) return; u=Math.min(1,u); const N=70;
  /* de la base (épaisse, à gauche) vers la pointe enroulée : des disques qui rétrécissent */
  for(let k=0;k<=N*u;k++){ const v=k/N, a=Math.PI+v*8.6, r=105*(1-v*.86), px=x+r*Math.cos(a)+30, py=y+r*Math.sin(a)*.8, e=30*(1-v*.7);
    c.fillStyle=CR_VERT_B; c.beginPath(); c.arc(px,py,e/2+3,0,7); c.fill(); }
  for(let k=0;k<=N*u;k++){ const v=k/N, a=Math.PI+v*8.6, r=105*(1-v*.86), px=x+r*Math.cos(a)+30, py=y+r*Math.sin(a)*.8, e=30*(1-v*.7);
    c.fillStyle=CR_VERT; c.beginPath(); c.arc(px,py,e/2,0,7); c.fill(); } }

FILMS['carre-rectangle']=function(outils){
  const DUR={'00-accroche':8.28,'01-pot':7.08,'02-question':14.76,'02b-reponse':14.03,'03-ouf':7.88,'04-commentaire':8.67,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,pot,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  /* une carte de réponse plus serrée : elle finit au-dessus de la tête de Ti Margo */
  { const css=document.createElement('style'); css.textContent='#cq{font-size:56px!important;line-height:1.12;}#pause{font-size:52px!important;line-height:1.12;}'; document.head.append(css); }

  /* « 3 mètres », « 2 virgule », « 5 mètres »… ont deux marques (le nombre, puis le mot) : on les prend par leur rang (marque) */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-pot',k), mq=k=>marque('02-question',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  /* Une légende dont chaque mot prend l'instant d'une marque (pour « 2,5 » : le « 5 ») */
  const crP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const tLe=m0(10), t3=m0(13), t3m=m0(14), tLong=m0(16), t2=m0(18), t25=m0(20), t25m=m0(21), tHaut=m0(23);
  const tPot=m1(2), t1pot=m1(6), tCouvre=m1(7), t5=m1(8), t5m=m1(9), tCar=m1(10), tAire=m1(12);
  const tB=mr(1);
  const oCouvre=m3(2), o5=m3(3), o5m=m3(4), oCar=m3(5), oPas=m3(6), o2=m3(11), oReste=m3(15), oQueue=m3(19);
  const tMur4=m4(3), t4=m4(5), t4m=m4(6), tSur=m4(7), t2b=m4(10), t2bm=m4(11), tAire4=m4(15), tRep=m4(16);
  const finTitre=tLe-.08;

  /* Le mur 3 × 2,5 avec ses cotes ; avec ou sans les cases de 1 m² */
  function murCote(c,T){ crMur(c,CR_X,CR_Y,3,2.5,CR_S);
    crCote(c,CR_X,CR_Y-40,CR_X+3*CR_S,CR_Y-40,(T-t3)/(tLong+.3-t3));
    if(T>=t3) crProg(c,[[t3,'3'],[t3m,'3 m']],T,CR_X+1.5*CR_S,CR_Y-88,54,CRAIE.jaune);
    crCote(c,CR_X-36,CR_Y,CR_X-36,CR_Y+2.5*CR_S,(T-t2)/(tHaut+.3-t2));
    if(T>=t2) crProg(c,[[t2,'2'],[m0(19),'2,'],[t25,'2,5'],[t25m,'2,5 m']],T,CR_X-118,CR_Y+1.25*CR_S,50,CRAIE.jaune); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un mur de 4 m sur 2,5 m (1 m = 110 px) */
      const S=130, X=205, Y=180;
      if(T>=tMur4) crMur(c,X,Y,4,2.5,S);
      crCote(c,X,Y-40,X+4*S,Y-40,(T-t4)/(tSur-t4));
      if(T>=t4) crProg(c,[[t4,'4'],[t4m,'4 m']],T,X+2*S,Y-88,54,CRAIE.jaune);
      crCote(c,X-36,Y,X-36,Y+2.5*S,(T-m4(8))/(t2bm+.3-m4(8)));
      if(T>=m4(8)) crProg(c,[[m4(8),'2'],[m4(9),'2,'],[t2b,'2,5'],[t2bm,'2,5 m']],T,X-118,Y+1.25*S,50,CRAIE.jaune);
      if(T>=tAire4) ecrire(c,'? m²',CR_XR+15,Y+1.25*S,96*zoom(T,tAire4,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<pot){ /* le mur nu et ses deux mesures */
      if(T>=tLe) murCote(c,T);
      tab.maj(); return; }
    if(T<ouf){ /* le pot : 1 pot couvre 5 m² ; puis l'aire du mur, en cases de 1 m² */
      murCote(c,T);
      if(T>=tAire){ CR_CASES.forEach((b,k)=>crCase(c,...b,zoom(T,tAire+k*.1,.15)));
        if(T>=tAire+.5){ const tl=200*zoom(T,tAire+.5,.6); c.font=`800 ${tl}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle';
          c.lineWidth=16; c.lineJoin='round'; c.strokeStyle='#1f3b2c'; c.strokeText('?',CR_X+1.5*CR_S,CR_Y+1.25*CR_S);
          ecrire(c,'?',CR_X+1.5*CR_S,CR_Y+1.25*CR_S,tl,CRAIE.jaune); } }
      if(T>=tPot) crPot(c,CR_XR,300,1.05,zoom(T,tPot,.4));
      if(T>=t1pot) ecrire(c,'1 pot',CR_XR,370,60*zoom(T,t1pot,.4),CRAIE.blanc);
      if(T>=tCouvre) ecrire(c,'couvre',CR_XR,440,52,CRAIE.gris);
      if(T>=t5) crProg(c,[[t5,'5'],[t5m,'5 m'],[tCar,'5 m²']],T,CR_XR,520,76,CR_VERT);
      tab.maj(); return; }
    /* après la réponse : 7,5 m² ; un pot peint 5 cases, pas assez ; le 2e pot finit le mur… et la queue */
    murCote(c,T); CR_CASES.forEach(b=>crCase(c,...b));
    ecrire(c,'7,5 m²',CR_XR-40,80,80,CRAIE.ok); coche(c,CR_XR+105,82,.4);
    const pas1=(oCar+.2-oCouvre)/5; for(let k=0;k<5;k++) crPeint(c,CR_CASES[k],(T-oCouvre-k*pas1)/pas1);
    for(let k=5;k<9;k++) crPeint(c,CR_CASES[k],(T-o2-(k-5)*.2)/.2);
    crPot(c,CR_XR-82,290,.72,zoom(T,ouf,.3));
    if(T>=o5) crProg(c,[[o5,'5'],[o5m,'5 m'],[oCar,'5 m²']],T,CR_XR-82,345,54,CR_VERT);
    if(T>=oPas&&T<o2) ecrire(c,'pas assez !',CR_XR,435,52*zoom(T,oPas,.4),CRAIE.faux);
    if(T>=o2){ crPot(c,CR_XR+82,290,.72,zoom(T,o2,.4)); } if(T>=o2) ecrire(c,'2',CR_XR,440,96*zoom(T,o2,.4),CRAIE.jaune);
    if(T>=m3(17)) crQueue(c,CR_XR+20,600,(T-m3(17))/(oQueue+.3-m3(17)));
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-pot'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je repeins le mur'),a0('de ma chambre'),a0('en vert margouillat !')),
    ...suiteDe(pot,60,62,[a0('Le mur mesure'),a0('3 mètres de long'),crP(m0,'et 2,5 mètres de haut.',[17,20,21,22,23])]),
    ...suiteDe(q,60,62,[a1('Sur le pot, c’est écrit :'),a1('1 pot couvre 5 mètres carrés.')],[a1('D’abord, l’aire du mur !')]),
    ...suiteDe(com,60,62,[a3('Un pot couvre'),a3('5 mètres carrés :'),a3('pas assez !')],[a3('Il m’en faut 2…'),a3('et avec le reste,'),a3('je repeins ma queue !')]),
    ...suiteDe(f,60,60,[a4('À toi : un mur de 4 mètres'),crP(m4,'sur 2,5 mètres.',[7,10,11])],[a4.jusque('Quelle')('Quelle est son aire ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle est l’aire'),qd('du mur ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* La réponse écrite au fil de la voix : « 3 fois 2 virgule 5 : 3 fois 2, 6, et 3 fois 5 dixièmes, 1 virgule 5… » */
  const r1=crP(mr,'3 × 2,5 :',[2,3,6,6]), r2=crP(mr,'3 × 2 = 6',[7,8,9,10,10]), r3=crP(mr,'et 3 × 5 dixièmes = 1,5',[11,12,13,14,15,18,18]),
        r4=crP(mr,'6 + 1,5 = 7,5 m²',[19,20,23,26,26,28]);
  /* Les choix s'écrivent au fil de la voix : « 7 », « 7, », « 7,5 », « 7,5 m », « 7,5 m² » */
  const tq=k=>mq(k)-q;
  const ETAPES=[[[7,'11'],[8,'11 m'],[9,'11 m²']],[[11,'7'],[12,'7,'],[13,'7,5'],[14,'7,5 m'],[15,'7,5 m²']],
    [[17,'5'],[18,'5,'],[19,'5,5'],[20,'5,5 m'],[21,'5,5 m²']]];
  const choix=[['11 m²',tq(6),tq(7)],['7,5 m²',tq(10),tq(11)],['5,5 m²',tq(16),tq(17)]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [k,e] of et) if(T>=mq(k)) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="86" y="56" width="168" height="140" fill="#efe6d2" stroke="#f8f9fa" stroke-width="4"/>`+
    [0,1,2,3,4,5,6,7,8].map(k=>{ const i=k%3, j=Math.floor(k/3); return `<rect x="${89+i*56}" y="${59+j*56}" width="50" height="${j<2?50:22}" rx="5" fill="#74c0fc" stroke="#1864ab" stroke-width="2"/>`; }).join('')+
    `<text x="170" y="44" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ffd43b" text-anchor="middle">3 m</text>`+
    `<text x="44" y="136" font-family="Segoe UI" font-weight="800" font-size="23" fill="#ffd43b" text-anchor="middle">2,5 m</text>`+
    `<text x="290" y="168" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'3 m sur 2,5 m :<br>quelle aire ?'+PARI,mini);
  return { clips,FIN,titre:'Le mur à repeindre',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,pot,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<pot) g.montre();
      else if(T<q){ T<tAire?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<oPas?g.montre():(T<o2?g.oups():(T<oQueue?g.ouvre():g.fier())); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
