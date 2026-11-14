/* ============================================================
   Série Aire CM2 — ÉPISODE 02 : LE TAPIS-TIMBRE. Outils : films/cm2-commun.js + cm2-aire.js.
   Ti Margo commande un tapis pour sa cabane, tape 4 et clique trop vite : 4 cm² au lieu de 4 m².
   Le livreur apporte un tapis grand comme un timbre. Le sol de la cabane : 4 m² (B), 4 carrés de 1 m.
   Commentaire : un sol de 2 m sur 3, combien de mètres carrés de tapis ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; dessins à gauche, texte à droite (Ti Margo cache le bas du milieu) */
const U_XR=815; /* le milieu de la colonne de droite */
/* Le sol de la cabane : 2 m × 2 m, 1 m = U_S px, coin haut-gauche (U_X, U_Y) */
const U_X=90, U_Y=140, U_S=230;
/* Un tapis vu de près : orange, bordure claire, franges */
function uTapis(c,x,y,w,h){ c.fillStyle='#e8590c'; c.strokeStyle='#7c2d12'; c.lineWidth=Math.max(1,w*.04);
  c.fillRect(x,y,w,h); c.strokeRect(x,y,w,h);
  if(w>30){ c.strokeStyle='#ffd8a8'; c.lineWidth=w*.035; c.strokeRect(x+w*.14,y+h*.14,w*.72,h*.72);
    c.strokeStyle='#fff4e6'; c.lineWidth=3; c.beginPath();
    for(let k=0;k<=8;k++){ const yy=y+h*k/8; c.moveTo(x,yy); c.lineTo(x-w*.1,yy); c.moveTo(x+w,yy); c.lineTo(x+w*1.1,yy); }
    c.stroke(); } }
/* Une fourmi, vue de dessus (x, y = le centre ; s = la longueur) */
function uFourmi(c,x,y,s,z=1){ if(z<=0) return; s*=Math.min(1.25,z); c.save(); c.translate(x,y); c.rotate(-.5);
  c.strokeStyle='#1a1a1a'; c.lineWidth=s*.05; c.lineCap='round'; c.beginPath();
  for(const sg of [-1,1]) for(const k of [-1,0,1]){ c.moveTo(k*s*.1,0); c.lineTo(k*s*.25,sg*s*.38); }
  c.moveTo(s*.42,0); c.lineTo(s*.6,-s*.2); c.moveTo(s*.42,0); c.lineTo(s*.6,s*.2); c.stroke();
  c.fillStyle='#1a1a1a'; for(const [dx,rx,ry] of [[-s*.3,s*.2,s*.14],[0,s*.12,s*.09],[s*.33,s*.12,s*.11]]){ c.beginPath(); c.ellipse(dx,0,rx,ry,0,0,7); c.fill(); }
  c.fillStyle='#fff'; c.beginPath(); c.arc(s*.38,-s*.04,s*.03,0,7); c.arc(s*.38,s*.04,s*.03,0,7); c.fill(); c.restore(); }
/* La loupe : un cercle (centre x, y ; rayon r) qui montre le tapis-timbre en grand ; (px, py) = où il est vraiment */
function uLoupe(c,x,y,r,z,px,py,fourmi=0){ if(z<=0) return; r*=Math.min(1.2,z);
  c.strokeStyle='rgba(255,212,59,.75)'; c.lineWidth=3; c.setLineDash([10,9]); c.beginPath();
  c.moveTo(px,py); c.lineTo(x-r*.7,y-r*.7); c.moveTo(px,py); c.lineTo(x-r*.7,y+r*.7); c.stroke(); c.setLineDash([]);
  c.save(); c.beginPath(); c.arc(x,y,r,0,7); c.fillStyle='#d9a066'; c.fill(); c.clip();
  uTapis(c,x-r*.55,y-r*.45,r*1.1,r*.9); uFourmi(c,x+r*.02,y,r*.9,fourmi); c.restore();
  c.strokeStyle=CRAIE.blanc; c.lineWidth=10; c.beginPath(); c.arc(x,y,r,0,7); c.stroke();
  c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(x+r*.72,y-r*.72); c.lineTo(x+r*1.05,y-r*1.05); c.stroke(); }
/* La petite boîte du livreur (centre x ; bas y) ; ouv de 0 à 1 ouvre les rabats */
function uBoite(c,x,y,z,ouv=0){ if(z<=0) return; const k=Math.min(1.2,z), w=110*k, h=80*k;
  c.fillStyle='#c08550'; c.strokeStyle='#5c3a1e'; c.lineWidth=5; c.fillRect(x-w/2,y-h,w,h); c.strokeRect(x-w/2,y-h,w,h);
  c.strokeStyle='#e9c46a'; c.lineWidth=8; c.beginPath(); c.moveTo(x,y-h); c.lineTo(x,y); c.stroke();
  const a=ouv*2.2; c.fillStyle='#d4a373'; c.strokeStyle='#5c3a1e'; c.lineWidth=5;
  for(const sg of [-1,1]){ c.save(); c.translate(x+sg*w/2,y-h); c.rotate(-sg*a); c.beginPath(); c.rect(sg>0?-w/2:0,-8,w/2,8); c.fill(); c.stroke(); c.restore(); } }
/* La flèche de la souris (pointe en x, y) */
function uSouris(c,x,y){ c.fillStyle='#fff'; c.strokeStyle='#111'; c.lineWidth=4; c.beginPath();
  c.moveTo(x,y); c.lineTo(x,y+62); c.lineTo(x+15,y+48); c.lineTo(x+27,y+74); c.lineTo(x+38,y+69); c.lineTo(x+26,y+44); c.lineTo(x+45,y+44); c.closePath(); c.fill(); c.stroke(); }

FILMS['unites']=function(outils){
  const DUR={'00-accroche':10.09,'01-livreur':9.93,'02-question':15.38,'02b-reponse':12.05,'03-ouf':4.6,'04-commentaire':9.5,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,liv,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  /* une carte de réponse plus courte : elle finit au-dessus de la tête de Ti Margo */
  { const css=document.createElement('style'); css.textContent='#cq{font-size:54px!important;line-height:1.12;}#pause{font-size:46px!important;line-height:1.12;}'; document.head.append(css); }

  const tJe2=mot('00-accroche','Je',2), t4=mot('00-accroche','4'), tUnite=mot('00-accroche',"l'unité"),
        tOups=mot('00-accroche','Oups'), tClique=mot('00-accroche','clique');
  const tBoite=mot('01-livreur','boîte'), tDedans=mot('01-livreur','Dedans'), tTimbre=mot('01-livreur','timbre'),
        tCarres=mot('01-livreur','carrés');
  const tB=mot('02b-reponse','B');
  const tTT=mot('03-ouf','tapis-timbre'), tFourmi=mot('03-ouf','fourmi');
  const tSol=mot('04-commentaire','sol'), t2=mot('04-commentaire','2'), t3=mot('04-commentaire','3'),
        tM2=mot('04-commentaire','carrés'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe2-.08;
  /* Le tapis-timbre posé sur le sol (à peu près à l'échelle : 2 cm ≈ 4 px ici, dessiné un peu plus gros) */
  const PX=U_X+U_S*1.5, PY=U_Y+U_S*1.5, PT=9;

  function uEcran(c,T){ /* la page du magasin en ligne (agrandie 1,2 fois depuis le coin 70, 90) */
    c.save(); c.translate(70,90); c.scale(1.2,1.2); c.translate(-70,-90);
    c.fillStyle='#343a40'; c.beginPath(); c.roundRect(70,90,560,420,22); c.fill();
    c.fillStyle='#f8f9fa'; c.fillRect(92,112,516,350);
    c.fillStyle='#495057'; c.fillRect(290,510,120,26); c.fillRect(230,534,240,16);
    ecrire(c,'Tapis',350,160,58,'#0b2545');
    uTapis(c,290,200,120,74);
    /* la case du nombre : le curseur clignote, puis « 4 » */
    c.strokeStyle='#495057'; c.lineWidth=4; c.fillStyle='#fff'; c.fillRect(130,330,130,96); c.strokeRect(130,330,130,96);
    if(T>=t4) ecrire(c,'4',195,380,76*zoom(T,t4,.4),'#0b2545');
    else if(Math.floor(T*2.5)%2===0){ c.fillStyle='#0b2545'; c.fillRect(190,350,5,56); }
    /* la liste des unités */
    if(T>=tUnite){ const z=zoom(T,tUnite,.3), rouge=T>=tClique;
      c.fillStyle=rouge?'#ffe3e3':'#fff'; c.strokeStyle=rouge?'#e03131':'#495057'; c.lineWidth=rouge?7:4;
      c.fillRect(290,330,280,96); c.strokeRect(290,330,280,96);
      ecrire(c,'unité ▾',430,380,54*z,rouge?'#c92a2a':'#0b2545'); }
    /* la souris arrive et clique trop vite */
    const u=lisse((T-(tClique-.7))/.7), sx=700+(545-700)*u, sy=500+(405-500)*u;
    if(T>=tUnite) uSouris(c,sx,sy);
    if(T>=tClique&&T<tClique+.5){ c.strokeStyle=CRAIE.jaune; c.lineWidth=6; c.beginPath(); c.arc(545,405,20+90*(T-tClique),0,7); c.stroke(); }
    c.restore();
    /* à droite : « 4 » … et quelle unité ? */
    if(T>=t4) ecrire(c,'4',860,300,170*zoom(T,t4,.4),CRAIE.jaune);
    if(T>=tUnite) ecrire(c,'?',975,300,170*zoom(T,tUnite,.4),CRAIE.faux);
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : le sol de 2 m sur 3 */
      const S=170, X=150, Y=150;
      if(T>=tSol) solVide(c,X,Y,3,2,S,true);
      if(T>=t2) ecrire(c,'2 m',X-66,Y+S,56*zoom(T,t2,.4),CRAIE.jaune);
      if(T>=t3) ecrire(c,'3 m',X+1.5*S,Y-46,56*zoom(T,t3,.4),CRAIE.jaune);
      if(T>=tM2) ecrire(c,'? m²',U_XR+60,Y+S,110*zoom(T,tM2,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<liv){ uEcran(c,T); tab.maj(); return; }
    if(T<ouf){ /* le livreur : une toute petite boîte, un tapis grand comme un timbre */
      solVide(c,U_X,U_Y,2,2,U_S,false); ecrire(c,'ma cabane',U_X,U_Y-42,44,CRAIE.gris,'left');
      if(T>=tBoite&&T<tTimbre) uBoite(c,U_XR,330,zoom(T,tBoite,.4),T>=tDedans?lisse((T-tDedans)/.5):0);
      if(T>=tTimbre){ uTapis(c,PX-PT/2,PY-PT/2,PT,PT); cercle(c,PX,PY,30,CRAIE.jaune,(T-tTimbre)/.3);
        uLoupe(c,U_XR,270,125,zoom(T,tTimbre,.4),PX,PY); }
      if(T>=tCarres) ecrire(c,'4 cm²',U_XR,500,84*zoom(T,tCarres,.4),CRAIE.faux);
      tab.maj(); return; }
    /* après la réponse : le sol rempli par 4 carrés de 1 m ; le tapis-timbre… pour la fourmi */
    for(let j=0;j<2;j++) for(let i=0;i<2;i++) carreauCraie(c,U_X+i*U_S,U_Y+j*U_S,U_S,zoom(T,ouf+(2*j+i)*.12,.15));
    c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(U_X,U_Y,2*U_S,2*U_S); ecrire(c,'ma cabane',U_X,U_Y-42,44,CRAIE.gris,'left');
    ecrire(c,'4 m²',U_XR-40,120,90,CRAIE.ok); coche(c,U_XR+75,120,.42);
    if(T>=tTT){ uTapis(c,PX-PT/2,PY-PT/2,PT,PT); cercle(c,PX,PY,30,CRAIE.jaune,(T-tTT)/.3);
      uLoupe(c,U_XR,375,125,zoom(T,tTT,.4),PX,PY,T>=tFourmi?zoom(T,tFourmi,.5):0); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-livreur'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je commande un tapis'),a0('pour ma cabane'),a0('sur internet.')),
    ...suiteDe(liv,60,62,[a0('Je tape 4…'),a0('et je dois choisir l’unité.')],[a0('Oups, je clique'),a0('trop vite !')]),
    ...suiteDe(q,60,62,[a1('Le livreur arrive avec'),a1('une toute petite boîte.')],[a1('Dedans : un tapis grand'),a1('comme un timbre !')],
      [a1('J’avais choisi les'),a1('centimètres carrés.')]),
    ...suiteDe(com,60,62,[a3('Le tapis-timbre ?')],[a3('Il est parfait…'),a3('pour ma fourmi !')]),
    ...suiteDe(f,60,60,[a4('À toi : le sol de ma cabane'),a4('mesure 2 mètres sur 3.')],[a4('Combien de mètres carrés'),a4('de tapis ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle aire faut-il'),qd('pour le sol'),qd('de ma cabane ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 mètres carrés, c’est'), r2=rd('4 carrés de 1 mètre de côté :'), r3=rd('juste la taille du sol.'),
    r5=rd('4 kilomètres carrés, ce serait'), r6=rd('plus grand qu’un village !');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [0,1,2,3].map(k=>`<rect x="${34+(k%2)*84}" y="${36+Math.floor(k/2)*84}" width="80" height="80" rx="8" fill="#74c0fc" stroke="#1864ab" stroke-width="3"/>`).join('')+
    `<rect x="236" y="178" width="14" height="14" fill="#e8590c" stroke="#7c2d12" stroke-width="2"/><circle cx="243" cy="185" r="22" fill="none" stroke="#ffd43b" stroke-width="5"/>`+
    `<text x="262" y="138" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'4 cm²<br>ou 4 m² ?'+PARI,mini);
  return { clips,FIN,titre:'Le tapis-timbre',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,liv,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['4 cm²',tq('A'),tq('carrés',1)],['4 m²',tq('B'),tq('carrés',2)],['4 km²',tq('C'),tq('carrés',3)]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3],suite:[r5,r6] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<liv){ T<tOups?g.montre():g.oups(); }
      else if(T<q){ T<tBoite?g.montre():(T<tTimbre?g.reflechit():g.oups()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tFourmi?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
