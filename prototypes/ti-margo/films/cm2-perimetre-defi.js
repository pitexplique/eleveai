/* ============================================================
   Série Périmètre CM2 — ÉPISODE 05 : L'ENCLOS DES POULES (le défi). Outils : films/cm2-commun.js + cm2-perimetre.js.
   Ti Margo a 36 m de grillage pour un enclos carré à ses poules, et veut tout utiliser.
   Un carré a 4 côtés égaux : 36 ÷ 4 = 9 m (C). On vérifie : 9 × 4 = 36. Les poules sont dedans… lui, dehors.
   Commentaire : 50 m de grillage pour un enclos carré ; combien mesure chaque côté ?
   ============================================================ */
/* L'enclos sur l'ardoise (1056 × 720), à gauche (Ti Margo cache le bas du milieu), 320 px pour 9 m de côté.
   Étiquettes : côtés horizontaux écart 56, verticaux écart 80 (loin des petits traits du codage, et du texte de droite). Sommets : 0 en haut à gauche, 1 en haut à droite, 2 en bas à droite, 3 en bas à gauche. */
const ENC=[[150,150],[470,150],[470,470],[150,470]];
/* Le défi : un autre enclos carré, côté inconnu (dessin sans échelle connue) */
const ENC_DEFI=[[150,170],[470,170],[470,490],[150,490]];
const XR=820;
const HERBE='#8ce99a', HERBE_B='#2b8a3e';

/* Une poule à la craie : (x, y) = le bas du corps, s = la taille, u = un petit sautillement */
function poule(c,x,y,s=1,u=0,sens=1){ const k=s; y-=Math.abs(Math.sin(u))*8*k;
  c.save(); c.translate(x,y); c.scale(sens,1);
  c.strokeStyle='#f59f00'; c.lineWidth=4*k; c.lineCap='round'; c.beginPath();
  c.moveTo(-8*k,-6*k); c.lineTo(-10*k,8*k); c.moveTo(8*k,-6*k); c.lineTo(10*k,8*k); c.stroke();
  c.fillStyle='#f8f9fa'; c.strokeStyle='#868e96'; c.lineWidth=3*k;
  c.beginPath(); c.ellipse(0,-26*k,30*k,22*k,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-26*k,-34*k); c.lineTo(-44*k,-52*k); c.lineTo(-36*k,-24*k); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.arc(22*k,-50*k,14*k,0,7); c.fill(); c.stroke();
  c.fillStyle='#fa5252'; c.beginPath(); c.arc(18*k,-66*k,6*k,0,7); c.arc(26*k,-66*k,6*k,0,7); c.fill();
  c.beginPath(); c.ellipse(30*k,-40*k,4*k,6*k,0,0,7); c.fill();
  c.fillStyle='#fab005'; c.beginPath(); c.moveTo(34*k,-54*k); c.lineTo(46*k,-49*k); c.lineTo(34*k,-45*k); c.closePath(); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(25*k,-53*k,3*k,0,7); c.fill();
  c.strokeStyle='#adb5bd'; c.lineWidth=3*k; c.beginPath(); c.arc(-4*k,-26*k,12*k,.3,2.6); c.stroke();
  c.restore(); }
/* Le grillage : le tour orange, des piquets aux sommets déjà atteints (u de 0 à 1) */
function grillage(c,pts,u=1){ if(u<=0) return; tourPoly(c,pts,u,TOUR,14);
  const n=pts.length; pts.forEach(([x,y],i)=>{ if(u>=i/n-1e-6){ c.fillStyle='#8a5a2b'; c.fillRect(x-8,y-8,16,16); } }); }
/* Les 4 morceaux de grillage, coupés : chaque côté raccourci, avec un vide aux coins */
function morceaux(c,pts,z=1,coul=TOUR){ if(z<=0) return; const n=pts.length, g=26*Math.min(1,z);
  c.strokeStyle=coul; c.lineWidth=14; c.lineCap='round';
  for(let i=0;i<n;i++){ const a=pts[i], b=pts[(i+1)%n], l=Math.hypot(b[0]-a[0],b[1]-a[1]), ux=(b[0]-a[0])/l, uy=(b[1]-a[1])/l;
    c.beginPath(); c.moveTo(a[0]+ux*g,a[1]+uy*g); c.lineTo(b[0]-ux*g,b[1]-uy*g); c.stroke(); } }
/* Le codage « côtés égaux » : un petit trait blanc au milieu de chaque côté */
function codage(c,pts,z=1){ if(z<=0) return; const n=pts.length, h=22*Math.min(1.3,z);
  c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.lineCap='round';
  for(let i=0;i<n;i++){ const a=pts[i], b=pts[(i+1)%n], l=Math.hypot(b[0]-a[0],b[1]-a[1]), nx=-(b[1]-a[1])/l, ny=(b[0]-a[0])/l, mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
    c.beginPath(); c.moveTo(mx-nx*h,my-ny*h); c.lineTo(mx+nx*h,my+ny*h); c.stroke(); } }
/* Une ligne de mots centrée en x, chaque morceau paraît à son instant (le mot dit) */
function ligneMots(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
FILMS['defi']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':8.16,'01-couper':7.41,'02-question':13.89,'02b-reponse':13.43,'03-ouf':5.83,'04-commentaire':9.1,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,cou,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 36 mètres » a deux marques : « trente-six » puis « mètres » */
  const t36=mot('00-accroche','36'), tM36=mot('00-accroche','mètres',2), tGr=mot('00-accroche','grillage'),
        tJe=mot('00-accroche','Je'), tCarre=mot('00-accroche','carré'), tPoules=mot('00-accroche','poules'),
        tTout=mot('00-accroche','tout');
  const t4=mot('01-couper','4'), tCotes=mot('01-couper','côtés',2), tEgaux=mot('01-couper','égaux'),
        tCoupe=mot('01-couper','coupe'), tEn=mot('01-couper','en'), t4b=mot('01-couper','4',3), tMorc=mot('01-couper','morceaux'),
        tComb=mot('01-couper','combien'), tMetres=mot('01-couper','mètres');
  const tRavies=mot('03-ouf','ravies'), tMais=mot('03-ouf','Mais');
  const t50=mot('04-commentaire','50'), tM50=mot('04-commentaire','mètres',2), tGr2=mot('04-commentaire','grillage'),
        tCarre2=mot('04-commentaire','carré'), tComb2=mot('04-commentaire','Combien'), tCote2=mot('04-commentaire','côté'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 50 m de grillage, un enclos carré, le côté à trouver */
      ligneMots(c,T,[['50',t50],['m',tM50]],XR,150,84,CRAIE.jaune);
      if(T>=tGr2) ecrire(c,'de grillage',XR,232,52*zoom(T,tGr2,.3),CRAIE.blanc);
      if(T>=tCarre2){ polyCraie(c,ENC_DEFI,zoom(T,tCarre2,.3),HERBE,HERBE_B); grillage(c,ENC_DEFI,1); }
      if(T>=tCote2) [0,1,2,3].forEach(i=>coteCraie(c,ENC_DEFI,i,'?',zoom(T,tCote2+i*.08,.4),CRAIE.faux,60,i%2?52:44));
      if(T>=tComb2) ecrire(c,'?',XR,440,200*zoom(T,tComb2,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* le grillage et l'enclos, toujours à gauche */
    if(T>=tGr){ ecrire(c,'36 m',XR,150,84*zoom(T,tGr,.3),CRAIE.jaune); ecrire(c,'de grillage',XR,232,52*zoom(T,tGr,.3),CRAIE.blanc); }
    if(T>=tCarre) polyCraie(c,ENC,zoom(T,tCarre,.3),HERBE,HERBE_B);
    if(T<ouf){
      /* tout le grillage autour (accroche), puis coupé en 4 morceaux (01-couper) */
      if(T>=tTout&&T<tCoupe) grillage(c,ENC,(T-tTout)/1.2);
      if(T>=tCoupe&&T<tMorc) grillage(c,ENC,1);
      if(T>=tMorc) morceaux(c,ENC,zoom(T,tMorc,.4));
      if(T>=tEgaux) codage(c,ENC,zoom(T,tEgaux,.5));
      ligneMots(c,T,[['4',t4],['côtés',tCotes],['égaux',tEgaux]],XR,350,54,CRAIE.blanc);
      ligneMots(c,T,[['en',tEn],['4',t4b],['morceaux',tMorc]],XR,440,54,TOUR);
      /* « combien » : un ? sur chaque côté ; « mètres » : il devient « ? m » */
      if(T>=tComb) [0,1,2,3].forEach(i=>coteCraie(c,ENC,i,T>=tMetres?'? m':'?',T>=tMetres?zoom(T,tMetres,.3):zoom(T,tComb,.4),CRAIE.faux,i%2?50:56,i%2?80:56));
    } else { /* la réponse : 36 ÷ 4 = 9 m, tout le grillage autour, les poules dedans */
      grillage(c,ENC,1); codage(c,ENC,1);
      [0,1,2,3].forEach(i=>coteCraie(c,ENC,i,'9 m',zoom(T,ouf+i*.1,.4),CRAIE.ok,i%2?50:56,i%2?80:56));
      ecrire(c,'36 ÷ 4',XR,350,62,CRAIE.blanc); ecrire(c,'= 9 m',XR,435,72,CRAIE.ok);
      coche(c,XR-70,560,.55); }
    if(T>=tPoules){ const z=zoom(T,tPoules,.4), saute=T>=tRavies&&T<com?T*7:0;
      poule(c,230,330,1.15*z,saute,1); poule(c,370,440,1*z,saute+1.4,-1); poule(c,250,452,.85*z,saute+.7,1); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-couper'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0("J'ai 36 mètres"),a0('de grillage.')),
    ...suiteDe(cou,60,62,[a0('Je fais un enclos carré'),a0('pour mes poules,')],[a0('et je veux utiliser'),a0('tout le grillage !')]),
    ...suiteDe(q,60,62,[a1('Un carré a'),a1('4 côtés égaux.')],[a1('Je coupe le grillage'),a1('en 4 morceaux…')],
      [a1('mais de combien'),a1('de mètres ?')]),
    ...suiteDe(com,60,62,[a3('Les poules sont ravies'),a3('dans leur enclos…')],[a3('Mais moi,'),a3('je suis resté dehors !')]),
    ...suiteDe(f,60,60,[a4('À toi : 50 mètres'),a4('de grillage')],[a4('pour un enclos carré.')],
      [a4('Combien mesure'),a4('chaque côté ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien mesure chaque côté'),qd("de l'enclos ?")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 côtés égaux :');
  /* « 36 divisé par 4 » s'écrit 36 ÷ 4 : le signe prend l'instant de « divisé » */
  const x36=rd('36'); rd.saute(2); const x4=rd('4, 9 mètres.');
  const r2=[x36[0],x4[1],'36 ÷ 4, 9 mètres.',[x36[3][0],mot('02b-reponse','divisé'),...x4[3]]];
  /* « 9 fois 4 » : le × prend l'instant de « fois » (la 2e marque « 9 fois ») */
  const r3=rd('On vérifie : 9 × 4, 36.'); r3[3][4]=marque('02b-reponse',14);
  const r4=rd('Tout le grillage'), r5=rd('est utilisé !');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="36" y="48" width="150" height="150" fill="#8ce99a" stroke="#ff922b" stroke-width="10" stroke-linejoin="round"/>`+
    `<text x="111" y="140" font-family="Segoe UI" font-weight="800" font-size="46" fill="#1f3b2c" text-anchor="middle">36 m</text>`+
    `<text x="262" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'36 m de grillage :<br>chaque côté ?'+PARI,mini);
  return { clips,FIN,titre:"L'enclos des poules",ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cou,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['18 m',tq('A'),tq('18')],['32 m',tq('B'),tq('32')],['9 m',tq('C'),tq('9')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cou){ T<tTout?g.montre():g.fier(); }
      else if(T<q){ T<tComb?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tMais?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
