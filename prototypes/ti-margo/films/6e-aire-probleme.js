/* ============================================================
   Série Aire 6e — ÉPISODE 03 : LES POTS DE PEINTURE. Outils : films/6e-commun.js + 6e-aire.js.
   Ti Margo repeint le mur de sa chambre : 4 m de long, 3 m de haut ; un pot couvre 5 m².
   4 × 3 = 12 m² ; 12 ÷ 5 = 2,4… alors 2 pots ? Non : 2 pots couvrent 10 m², il manque 2 m² → 3 pots (C).
   Avec 2 pots : un petit coin reste tout blanc. Commentaire : un mur de 5 m sur 3 m, des pots de 4 m².
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le mur à gauche (à l'échelle : 1 m = AP_S px, cases de 1 m²), le texte à droite
   (Ti Margo cache le bas du milieu de l'ardoise) */
const AP_X=160, AP_Y=150, AP_S=125, AP_XR=855; /* coin haut-gauche du mur, 1 m en px, milieu de la colonne de droite */
const AP_VERT='#40c057', AP_VERT_B='#2b8a3e', AP_MUR='#efe6d2';

/* Le mur nu : n m de long, h m de haut (1 m = s px) ; quadrillage pâle en pointillé si quad */
function apMur(c,x,y,n,h,s,quad=false){ c.fillStyle=AP_MUR; c.fillRect(x,y,n*s,h*s);
  if(quad){ c.strokeStyle='rgba(73,80,87,.35)'; c.lineWidth=3; c.setLineDash([10,10]); c.beginPath();
    for(let i=1;i<n;i++){ c.moveTo(x+i*s,y); c.lineTo(x+i*s,y+h*s); } for(let j=1;j<h;j++){ c.moveTo(x,y+j*s); c.lineTo(x+n*s,y+j*s); }
    c.stroke(); c.setLineDash([]); }
  c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,n*s,h*s); }
/* Les cases de 1 m² du mur 4 × 3, rangée par rangée (k = 0…11) ; les deux dernières = le coin en bas à droite */
const AP_CASES=[0,1,2].flatMap(j=>[0,1,2,3].map(i=>[AP_X+i*AP_S,AP_Y+j*AP_S]));
/* La peinture verte sur une case, de u = 0 à 1 (le rouleau descend) ; plein = sans marge (le mur peint) */
function apPeint(c,[x,y],s,u,plein=false){ if(u<=0) return; u=Math.min(1,u); const m=plein?0:3; c.fillStyle='rgba(64,192,87,.95)'; c.fillRect(x+m,y+m,s-2*m,(s-2*m)*u); }
/* Une flèche de cote (de x1,y1 à x2,y2), tracée de u = 0 à 1 */
function apCote(c,x1,y1,x2,y2,u,coul=CRAIE.jaune){ if(u<=0) return; u=Math.min(1,u); const xb=x1+(x2-x1)*u, yb=y1+(y2-y1)*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(xb,yb); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1); for(const [px,py,aa] of [[x1,y1,a+Math.PI],[xb,yb,a]]){ c.beginPath();
    c.moveTo(px,py); c.lineTo(px-18*Math.cos(aa-.45),py-18*Math.sin(aa-.45)); c.lineTo(px-18*Math.cos(aa+.45),py-18*Math.sin(aa+.45)); c.closePath(); c.fill(); } }
/* Un pot de peinture verte (centre cx ; bas by ; k = l'échelle), qui grossit quand z va de 0 à 1 */
function apPot(c,cx,by,k,z=1){ if(z<=0) return; k*=Math.min(1.2,z); const w=130*k, h=140*k, x=cx-w/2, y=by-h;
  c.strokeStyle='#495057'; c.lineWidth=5*k; c.beginPath(); c.arc(cx,y,w*.46,Math.PI,0); c.stroke(); /* l'anse */
  c.fillStyle='#ced4da'; c.strokeStyle='#495057'; c.lineWidth=5*k; c.beginPath(); c.roundRect(x,y,w,h,10*k); c.fill(); c.stroke();
  c.fillStyle=AP_VERT; c.fillRect(x+4*k,y+h*.3,w-8*k,h*.42); /* l'étiquette verte */
  c.fillStyle=AP_VERT; c.beginPath(); c.ellipse(cx,y+3*k,w/2,12*k,0,0,7); c.fill(); /* la peinture qui déborde */
  for(const [dx,l] of [[-.3,.22],[.05,.14],[.32,.2]]){ c.beginPath(); c.roundRect(cx+dx*w-6*k,y,12*k,h*l,6*k); c.fill(); }
  c.strokeStyle='#495057'; c.lineWidth=4*k; c.beginPath(); c.ellipse(cx,y+3*k,w/2,12*k,0,0,7); c.stroke(); }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; centré sur sa forme finale */
function apProg(c,etapes,T,x,y,taille,coul,contour=false){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width;
  if(contour){ c.textAlign='left'; c.textBaseline='middle'; c.lineWidth=14; c.lineJoin='round'; c.strokeStyle='#1f3b2c'; c.strokeText(s,x-W/2,y); }
  ecrire(c,s,x-W/2,y,taille,coul,'left'); }

FILMS['probleme']=function(outils){
  const DUR={'00-accroche':8.57,'01-calcul':9.65,'02-question':12.38,'02b-reponse':9.38,'03-ouf':6.04,'04-commentaire':10.76,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,marque}=voixDe(A);
  const [acc,cal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  /* la carte de réponse n'a ni phrase ni suite : pas de ligne vide sous « Réponse C ! » ni sous les choix */
  { const css=document.createElement('style'); css.textContent='#cq:empty,#pause:empty{display:none;}'; document.head.append(css); }

  /* « 4 mètres », « 2 pots »… ont deux marques (le nombre, puis le mot) : on les prend par leur rang (marque) */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-calcul',k), mq=k=>marque('02-question',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  /* Une légende dont chaque mot prend l'instant d'une marque (pour « 2,4 » : le « 4 ») */
  const apP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const t4=m0(7), t4m=m0(8), tLong=m0(10), t3=m0(11), t3m=m0(12), tHaut=m0(14), tPot=m0(16), tCouvre=m0(19), t5=m0(20), t5m=m0(21), tCar=m0(22);
  const tC=mr(1), r2=mr(2), r2p=mr(3), rCouvre=mr(4), r10=mr(5), rCar=mr(7), rManque=mr(9), r2m=mr(10), r2mm=mr(11), r2c=mr(12), r3=mr(15), r3p=mr(16);
  const o2=m3(1), oFini=m3(6), oSauf=m3(7), oCoin=m3(10), oBlanc=m3(12);
  const c5=m4(5), c5m=m4(6), cSur=m4(7), c3=m4(8), c3m=m4(9), cPots=m4(12), c4=m4(15), c4m=m4(16), c4c=m4(17), cCombien=m4(18), cPots2=m4(20), tRep=m4(22);
  const finTitre=t4-.08, finR=r2-.08;

  /* Le mur 4 × 3 avec ses deux cotes */
  function murCote(c,T,quad=false){ apMur(c,AP_X,AP_Y,4,3,AP_S,quad);
    apCote(c,AP_X,AP_Y-40,AP_X+4*AP_S,AP_Y-40,(T-t4)/(tLong+.3-t4));
    if(T>=t4) apProg(c,[[t4,'4'],[t4m,'4 m']],T,AP_X+2*AP_S,AP_Y-88,54,CRAIE.jaune);
    apCote(c,AP_X-36,AP_Y,AP_X-36,AP_Y+3*AP_S,(T-t3)/(tHaut+.3-t3));
    if(T>=t3) apProg(c,[[t3,'3'],[t3m,'3 m']],T,AP_X-104,AP_Y+1.5*AP_S,54,CRAIE.jaune); }
  /* Le pot et ce qu'il couvre, en haut de la colonne de droite */
  function lePot(c,T){ if(T>=tPot) apPot(c,AP_XR,245,.9,zoom(T,tPot,.4));
    if(T>=tCouvre) ecrire(c,'couvre',AP_XR,295,46,CRAIE.gris);
    if(T>=t5) apProg(c,[[t5,'5'],[t5m,'5 m'],[tCar,'5 m²']],T,AP_XR,360,68,AP_VERT); }
  /* les 12 cases de 1 m² se posent pendant « 4 fois 3 » */
  const pasK=(m1(3)-.12-m1(0))/12, tK=k=>m1(0)+k*pasK;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un mur de 5 m sur 3 m (1 m = 95 px), des pots qui couvrent 4 m² */
      const S=100, X=160, Y=170;
      if(T>=m4(3)) apMur(c,X,Y,5,3,S);
      apCote(c,X,Y-40,X+5*S,Y-40,(T-c5)/(cSur-c5));
      if(T>=c5) apProg(c,[[c5,'5'],[c5m,'5 m']],T,X+2.5*S,Y-88,54,CRAIE.jaune);
      apCote(c,X-36,Y,X-36,Y+3*S,(T-c3)/(c3m+.3-c3));
      if(T>=c3) apProg(c,[[c3,'3'],[c3m,'3 m']],T,X-104,Y+1.5*S,54,CRAIE.jaune);
      if(T>=cPots) apPot(c,AP_XR,265,.9,zoom(T,cPots,.4));
      if(T>=c4) apProg(c,[[c4,'4'],[c4m,'4 m'],[c4c,'4 m²']],T,AP_XR,340,68,AP_VERT);
      if(T>=cPots2) ecrire(c,'? pots',AP_XR,450,72*zoom(T,cPots2,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<cal){ /* le mur nu, ses deux mesures, puis le pot */
      if(T>=finTitre) murCote(c,T);
      lePot(c,T);
      tab.maj(); return; }
    if(T<ouf){ /* le calcul : 4 × 3 = 12 m² ; 12 ÷ 5 = 2,4 ; 2 pots ? — puis la réponse, en peinture */
      murCote(c,T);
      AP_CASES.forEach((b,k)=>carreauCraie(c,...b,AP_S,zoom(T,tK(k),.3)));
      if(T<finR){ /* le calcul */
        apProg(c,[[m1(0),'4'],[m1(1),'4 ×'],[m1(2),'4 × 3']],T,AP_X+2*AP_S,AP_Y+1.5*AP_S-55,76,CRAIE.jaune,true);
        if(T>=m1(3)) apProg(c,[[m1(3),'= 12'],[m1(4),'= 12 m'],[m1(5),'= 12 m²']],T,AP_X+2*AP_S,AP_Y+1.5*AP_S+40,76,CRAIE.jaune,true);
        lePot(c,T);
        if(T>=m1(6)) apProg(c,[[m1(6),'12'],[m1(7),'12 ÷'],[m1(9),'12 ÷ 5']],T,AP_XR,450,62,CRAIE.blanc);
        if(T>=m1(10)) apProg(c,[[m1(10),'= 2'],[m1(11),'= 2,'],[m1(12),'= 2,4']],T,AP_XR,520,62,CRAIE.blanc);
        if(T>=m1(15)) apProg(c,[[m1(15),'2'],[m1(16),'2 pots'],[m1(17),'2 pots ?']],T,AP_XR,610,66,CRAIE.jaune);
        tab.maj(); return; }
      /* la réponse : 2 pots peignent 10 cases, il en manque 2 ; le 3e pot finit le mur */
      for(let k=0;k<5;k++) apPeint(c,AP_CASES[k],AP_S,(T-r2-k*(rCouvre-r2)/5)/((rCouvre-r2)/5));
      for(let k=5;k<10;k++) apPeint(c,AP_CASES[k],AP_S,(T-rCouvre-(k-5)*(rCar-rCouvre)/5)/((rCar-rCouvre)/5));
      for(let k=10;k<12;k++) apPeint(c,AP_CASES[k],AP_S,(T-r3p-(k-10)*.25)/.25);
      if(T>=rManque&&T<r3) cercle(c,AP_X+3*AP_S,AP_Y+2.5*AP_S,AP_S*1.02,CRAIE.faux,(T-rManque)/.3);
      apPot(c,AP_XR-105,150,.6,zoom(T,r2,.4)); if(T>=r2p) apPot(c,AP_XR,150,.6,zoom(T,r2p,.4));
      if(T>=r3) apPot(c,AP_XR+105,150,.6,zoom(T,r3,.4));
      if(T>=r10) apProg(c,[[r10,'10'],[mr(6),'10 m'],[rCar,'10 m²']],T,AP_XR,230,62,AP_VERT);
      if(T>=rManque) apProg(c,[[rManque,'manque'],[r2m,'manque 2'],[r2mm,'manque 2 m'],[r2c,'manque 2 m²']],T,AP_XR,320,50,CRAIE.faux);
      if(T>=r3) apProg(c,[[r3,'3'],[r3p,'3 pots']],T,AP_XR,440,76,CRAIE.ok);
      if(T>=r3p+.5) coche(c,AP_XR-40,545,.45);
      tab.maj(); return; }
    /* l'histoire : avec 2 pots, le mur est peint… sauf le coin en bas à droite */
    apMur(c,AP_X,AP_Y,4,3,AP_S,true);
    const pasO=(oFini-o2)/10; for(let k=0;k<10;k++) apPeint(c,AP_CASES[k],AP_S,(T-o2-k*pasO)/pasO,true);
    c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(AP_X,AP_Y,4*AP_S,3*AP_S);
    if(T>=oCoin) cercle(c,AP_X+3*AP_S,AP_Y+2.5*AP_S,AP_S*1.02,CRAIE.faux,(T-oCoin)/.3);
    apPot(c,AP_XR-60,200,.7,zoom(T,o2,.4)); if(T>=m3(2)) apPot(c,AP_XR+60,200,.7,zoom(T,m3(2),.4));
    if(T>=o2) apProg(c,[[o2,'2'],[m3(2),'2 pots']],T,AP_XR,280,62,CRAIE.blanc);
    if(T>=oFini) ecrire(c,'fini…',AP_XR,370,56*zoom(T,oFini,.4),CRAIE.ok);
    if(T>=oCoin) apProg(c,[[oCoin,'coin'],[oBlanc,'coin blanc !']],T,AP_XR+15,460,50,CRAIE.faux);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), a2=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je repeins le mur'),a0('de ma chambre :')),
    ...suiteDe(cal,60,62,[a0('4 mètres de long,'),a0('3 mètres de haut.')],[a0('Un pot de peinture'),a0('couvre 5 mètres carrés.')]),
    ...suiteDe(q,60,62,[apP(m1,'4 × 3 :',[0,1,2,2]),apP(m1,'12 mètres carrés.',[3,4,5])],
      [apP(m1,'12 ÷ 5 = 2,4.',[6,7,9,10,12])],[a1.jusque('Alors')('Alors j’achète 2 pots…'),a1('non ?')]),
    ...suiteDe(ouf,60,62,[a2.saute(2)('2 pots couvrent 10 mètres carrés :')],[a2('il manque 2 mètres carrés.')],
      [a2('Il faut 3 pots,'),a2('quitte à en garder un peu.')]),
    ...suiteDe(com,60,62,[a3('Avec 2 pots,'),a3('mon mur est fini…')],[a3('sauf un petit coin'),a3('tout blanc,'),a3('juste derrière moi !')]),
    ...suiteDe(f,60,60,[a4('À toi : un mur de 5 mètres'),a4('sur 3 mètres,')],[a4('et des pots qui couvrent'),a4('4 mètres carrés.')],
      [a4('Combien de pots faut-il ?')],[a4('Réponds en commentaire !')])
  ];
  /* une bulle de légende ne paraît qu'avec son premier mot (jamais vide) */
  for(const g of groupes) g.de=Math.max(g.de,g.phrases[0][0]);
  qd('Question !');
  const phraseQ=[qd('Combien de pots'),qd('faut-il acheter ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* Les choix s'écrivent au fil de la voix : « 2 », puis « 2 pots » */
  const tq=k=>mq(k)-q;
  const ETAPES=[[[7,'2'],[8,'2 pots']],[[10,'7'],[11,'7 pots']],[[13,'3'],[14,'3 pots']]];
  const choix=[['2 pots',tq(6),tq(7)],['7 pots',tq(9),tq(10)],['3 pots',tq(12),tq(13)]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [k,e] of et) if(T>=mq(k)) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="62" width="176" height="132" fill="#efe6d2" stroke="#f8f9fa" stroke-width="4"/>`+
    [...Array(12).keys()].map(k=>{ const i=k%4, j=Math.floor(k/4); return `<rect x="${43+i*44}" y="${65+j*44}" width="38" height="38" rx="5" fill="${k<10?'#40c057':'#74c0fc'}" stroke="${k<10?'#2b8a3e':'#1864ab'}" stroke-width="2"/>`; }).join('')+
    `<text x="128" y="46" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ffd43b" text-anchor="middle">12 m²</text>`+
    `<rect x="242" y="92" width="62" height="66" rx="7" fill="#ced4da" stroke="#495057" stroke-width="4"/><rect x="246" y="112" width="54" height="26" fill="#40c057"/>`+
    `<text x="273" y="196" font-family="Segoe UI" font-weight="800" font-size="34" fill="#40c057" text-anchor="middle">5 m²</text>`+
    `<text x="273" y="80" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Mur de 12 m² :<br>combien de pots ?'+PARI,mini);
  return { clips,FIN,titre:'Les pots de peinture',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cal,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cal) g.montre();
      else if(T<q){ T<m1(13)?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<rManque?g.montre():(T<r3?g.oups():g.fier()); }
      else if(T<com){ T<oSauf?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
