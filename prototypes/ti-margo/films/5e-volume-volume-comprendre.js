/* ============================================================
   Série Volume 5e — ÉPISODE 02 : LA VALISE DE TI MARGO (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Ti Margo range des boîtes cubiques dans sa valise : une rangée de 3, deux rangées, une deuxième couche par-dessus.
   Réponse B : une couche 3 × 2 = 6 boîtes ; deux couches : 12 boîtes. (7 = 3 + 2 + 2 ; 6 = une seule couche.)
   Commentaire : 4 boîtes sur 3, en 2 couches.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la valise à DROITE (Ti Margo cache le bas du milieu-gauche), les calculs à gauche en haut */
const VL_U=105, VL_X=600, VL_Y=545, VL_XG=290;
const VL_DX=PV_DX*VL_U, VL_DY=PV_DY*VL_U;                       /* une case de profondeur, en px (vers le haut-droite) */
const VL_BOITE={face:'#ffa94d',dessus:'#ffd8a8',cote:'#f76707',bord:'#7c2d12',lw:4};
const VL_CUIR='#c92a2a', VL_CUIR_B='#ff8787';
/* Le coin avant-bas-gauche de la case (i en largeur, j en profondeur, k en hauteur) */
const vlPt=(i,j,k,x=VL_X,y=VL_Y,u=VL_U)=>[x+i*u+j*PV_DX*u, y-k*u+j*PV_DY*u];
/* Une boîte cubique à la case (i, j, k), zoomée de z */
function vlBoite(c,i,j,k,z,coul=VL_BOITE,x=VL_X,y=VL_Y,u=VL_U){ if(z<=0) return; const [X,Y]=vlPt(i,j,k,x,y,u); pvPave(c,X,Y,1,1,1,u,{...coul,z}); }
/* La valise ouverte (3 × 2 × 2 cases) : le couvercle relevé derrière, le fond et les parois en transparence */
function vlValise(c,z){ if(z<=0) return; const a=Math.min(1,z); c.save(); c.globalAlpha=a;
  const p=(i,j,k)=>vlPt(i,j,k), poly=(pts,f,b,lw=6)=>{ c.beginPath(); pts.forEach(([x,y],n)=>n?c.lineTo(x,y):c.moveTo(x,y)); c.closePath();
    if(f){ c.fillStyle=f; c.fill(); } if(b){ c.strokeStyle=b; c.lineWidth=lw; c.lineJoin='round'; c.stroke(); } };
  const [bl,br]=[p(0,2,2),p(3,2,2)], H=175, D=18;
  poly([bl,br,[br[0]+D,br[1]-H],[bl[0]+D,bl[1]-H]],VL_CUIR,'#7c1d1d',6);                      /* le couvercle */
  c.strokeStyle='#7c1d1d'; c.lineWidth=12; c.lineCap='round'; const mx=(bl[0]+br[0])/2+D;     /* la poignée */
  c.beginPath(); c.moveTo(mx-55,bl[1]-H); c.lineTo(mx-55,bl[1]-H-26); c.lineTo(mx+55,bl[1]-H-26); c.lineTo(mx+55,bl[1]-H); c.stroke();
  poly([p(0,0,0),p(3,0,0),p(3,2,0),p(0,2,0)],'rgba(201,42,42,.45)');                            /* le fond */
  poly([p(0,2,0),p(3,2,0),p(3,2,2),p(0,2,2)],'rgba(201,42,42,.30)');                            /* la paroi du fond */
  poly([p(0,0,0),p(0,2,0),p(0,2,2),p(0,0,2)],'rgba(201,42,42,.30)');                            /* la paroi gauche */
  c.restore(); }
/* Les arêtes de la valise, posées PAR-DESSUS les boîtes */
function vlAretes(c,z){ if(z<=0) return; c.save(); c.globalAlpha=Math.min(1,z); c.strokeStyle=VL_CUIR_B; c.lineWidth=7; c.lineJoin='round';
  const p=(i,j,k)=>vlPt(i,j,k), l=(...pts)=>{ c.beginPath(); pts.forEach(([x,y],n)=>n?c.lineTo(x,y):c.moveTo(x,y)); c.stroke(); };
  l(p(0,0,2),p(0,0,0),p(3,0,0),p(3,0,2),p(0,0,2)); l(p(3,0,0),p(3,2,0),p(3,2,2),p(3,0,2)); l(p(0,0,2),p(0,2,2),p(3,2,2)); c.restore(); }
/* Le contour d'une couche (k = 0 ou 1), pour la montrer */
function vlCouche(c,k,coul){ const p=(i,j,kk)=>vlPt(i,j,kk); c.save(); c.strokeStyle=coul; c.lineWidth=9; c.lineJoin='round';
  c.beginPath(); [p(0,0,k),p(3,0,k),p(3,2,k),p(3,2,k+1),p(0,2,k+1),p(0,0,k+1)].forEach(([x,y],n)=>n?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); c.stroke();
  c.beginPath(); [p(0,0,k+1),p(3,0,k+1),p(3,2,k+1)].forEach(([x,y],n)=>n?c.lineTo(x,y):c.moveTo(x,y)); c.moveTo(...p(3,0,k+1)); c.lineTo(...p(3,0,k)); c.stroke(); c.restore(); }
/* Le maillot de bain (un short rayé), centre (x, y), zoomé de z */
function vlMaillot(c,x,y,z,s=1){ if(z<=0) return; const k=Math.min(1.2,z)*s; c.save(); c.translate(x,y); c.scale(k,k); c.rotate(-.12);
  c.beginPath(); c.moveTo(-70,-45); c.lineTo(70,-45); c.lineTo(78,45); c.lineTo(14,45); c.lineTo(0,5); c.lineTo(-14,45); c.lineTo(-78,45); c.closePath();
  c.fillStyle='#4dabf7'; c.fill(); c.save(); c.clip(); c.fillStyle='#e7f5ff'; for(let s=-80;s<90;s+=36) c.fillRect(s,-50,14,100); c.restore();
  c.strokeStyle='#1864ab'; c.lineWidth=6; c.lineJoin='round'; c.stroke(); c.fillStyle='#1864ab'; c.fillRect(-70,-45,140,14); c.restore(); }

FILMS['volume-comprendre']=function(outils){
  const DUR={'00-accroche':5.39,'01-rangement':5.22,'02-question':10.02,'02b-reponse':7.76,'03-ouf':3.56,'04-commentaire':8.14,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'01-rangement':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tBoites=mot('00-accroche','boîtes'), tValise=mot('00-accroche','valise');
  const t3=mot('01-rangement','3'), tDeux=mot('01-rangement','deux'), tRangees=mot('01-rangement','rangées'),
        tCouche=mot('01-rangement','couche'), tPar=mot('01-rangement','par-dessus');
  const tB=mot('02b-reponse','B'), tUne=mot('02b-reponse','Une'), tFois=mot('02b-reponse','fois',2),
        t6=mot('02b-reponse','6'), tDeuxC=mot('02b-reponse','Deux'), t12=mot('02b-reponse','12');
  const tPlace=mot('03-ouf','place'), tMaillot=mot('03-ouf','maillot');
  const t4c=mot('04-commentaire','4'), t3c=mot('04-commentaire','3'), t2c=mot('04-commentaire','2'),
        tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Je',2)-.08, finR=tDeuxC-.08;
  /* l'ordre de pose des 12 boîtes : rangée de devant (3), rangée de derrière (3), puis la couche du dessus (6) */
  const POSE=[[0,0,0,t3],[1,0,0,t3+.15],[2,0,0,t3+.3],[0,1,0,tRangees],[1,1,0,tRangees+.12],[2,1,0,tRangees+.24]];
  for(let j=0;j<2;j++) for(let i=0;i<3;i++) POSE.push([i,j,1,tPar+.1*(i+3*j)]);
  /* ordre du peintre : du fond vers l'avant, du bas vers le haut, de gauche à droite */
  const PEINTRE=[...POSE].sort((a,b)=>(b[1]-a[1])||(a[2]-b[2])||(a[0]-b[0]));

  function valise(c,T){
    const zV=T>=tValise?(T<tValise+.5?zoom(T,tValise,.3):1):0;
    vlValise(c,zV);
    for(const [i,j,k,t] of PEINTRE) if(T>=t) vlBoite(c,i,j,k,T<t+.4?zoom(T,t,.3):1);
    vlAretes(c,zV);
    if(T>=t3&&T<q){ const [x0]=vlPt(0,0,0), [x1]=vlPt(3,0,0); ecrire(c,'3',(x0+x1)/2,VL_Y+48,58*zoom(T,t3,.4),CRAIE.jaune); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 4 boîtes sur 3, en 2 couches (78 px la boîte) */
      const u=78, x=610, y=560, z=T>=t4c?(T<t4c+.5?zoom(T,t4c,.3):1):0;
      pvPave(c,x,y,4,3,2,u,{...VL_BOITE,lw:5,grille:true,z});
      if(T>=t4c) ecrire(c,'4',x+2*u,y+46,56*zoom(T,t4c,.4),CRAIE.jaune);
      if(T>=t3c) ecrire(c,'3',x+4*u+1.5*PV_DX*u+30,y+1.5*PV_DY*u+38,56*zoom(T,t3c,.4),CRAIE.jaune);
      if(T>=t2c) pgEtiquette(c,'2 couches',x+2*u+1.5*PV_DX*u,y-2*u+3*PV_DY*u-52,50*zoom(T,t2c,.4),CRAIE.blanc);
      if(T>=tCombien) ecrire(c,'? boîtes',VL_XG,200,84*zoom(T,tCombien,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* avant la valise : une boîte cubique toute seule, en haut à gauche */
    if(T>=tBoites&&T<tValise+.4) vlBoite(c,0,0,0,T<tBoites+.4?zoom(T,tBoites,.3):1,VL_BOITE,250,260,110);
    valise(c,T);
    if(T<q){ tab.maj(); return; }

    /* après la carte : 3 × 2 = 6 (une couche), puis 2 couches : 12 */
    if(T<ouf){ if(T>=finR+.1&&T<tDeuxC+.9) vlCouche(c,0,CRAIE.jaune);
      if(T>=tDeuxC+.9) vlCouche(c,1,CRAIE.ok); }
    pgLigne(c,T,[['3 × 2',finR+.1],['= 6',finR+.3]],VL_XG,120,64,CRAIE.blanc);
    pgLigne(c,T,[['2 couches :',tDeuxC],['12',t12]],VL_XG,240,64,CRAIE.ok);
    if(T>=ouf){ const zm=T>=tMaillot?(T<tMaillot+.5?zoom(T,tMaillot,.3):1):0;
      vlMaillot(c,860,180,zm,1.35);
      if(T>=tMaillot+.35){ c.strokeStyle=CRAIE.faux; c.lineWidth=16; c.lineCap='round'; const u=Math.min(1,(T-tMaillot-.35)/.3);
        c.beginPath(); c.moveTo(745,105); c.lineTo(745+230*u,105+150*u); c.moveTo(975,105); c.lineTo(975-230*u,105+150*u); c.stroke(); }
      if(T>=tPlace) ecrire(c,'plus de place !',VL_XG,360,56*zoom(T,tPlace,.3),PENCHE5); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-rangement'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je pars en vacances.'));
  const s0=suiteDe(dis,60,62,[a0('Je range mes boîtes'),a0('cubiques dans ma valise.')]);
  const s1=suiteDe(q,60,62,[a1('Une rangée de 3 boîtes,'),a1('deux rangées,')],[a1('et une deuxième couche'),a1('par-dessus.')]);
  qd('Question !');
  const phraseQ=[qd('Combien de boîtes'),qd('dans la valise ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Une couche : 3 × 2, 6 boîtes.');
  r1[3][4]=tFois; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('Deux couches :'),rd('12 boîtes.')]),
    ...suiteDe(com,60,62,[a3('12 boîtes…'),a3('et plus de place')],[a3('pour mon maillot !')]),
    ...suiteDe(f,60,60,[a4('À toi : 4 boîtes sur 3,'),a4('en 2 couches.')],[a4('Combien de boîtes ?')],[a4('Réponds en commentaire !')])
  ];

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M70 120 L190 120 L196 50 L76 50 Z" fill="${VL_CUIR}" stroke="#7c1d1d" stroke-width="5" stroke-linejoin="round"/>`+
    `<rect x="45" y="140" width="40" height="40" fill="${VL_BOITE.face}" stroke="${VL_BOITE.bord}" stroke-width="4"/>`+
    `<rect x="85" y="140" width="40" height="40" fill="${VL_BOITE.face}" stroke="${VL_BOITE.bord}" stroke-width="4"/>`+
    `<rect x="125" y="140" width="40" height="40" fill="${VL_BOITE.face}" stroke="${VL_BOITE.bord}" stroke-width="4"/>`+
    `<rect x="45" y="180" width="120" height="40" fill="${VL_BOITE.face}" stroke="${VL_BOITE.bord}" stroke-width="4"/>`+
    `<path d="M45 140 L70 120 L190 120 L165 140 Z" fill="${VL_BOITE.dessus}" stroke="${VL_BOITE.bord}" stroke-width="4" stroke-linejoin="round"/>`+
    `<path d="M45 140 L45 220 L165 220 L190 200 L190 120 L165 140 Z M165 140 L165 220" fill="none" stroke="${VL_CUIR_B}" stroke-width="6" stroke-linejoin="round"/>`+
    `<text x="262" y="175" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien de boîtes<br>dans ma valise ?'+PARI,mini);
  return { clips,FIN,titre:'La valise de Ti Margo',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7',tq('A'),tq('7')],['12',tq('B'),tq('12')],['6',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis) g.montre();
      else if(T<q){ T<tPar?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t12?g.montre():g.fier(); }
      else if(T<com){ T<tMaillot?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
