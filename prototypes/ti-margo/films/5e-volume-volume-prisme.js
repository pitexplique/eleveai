/* ============================================================
   Série Volume 5e — ÉPISODE 04 : LA TENTE GONFLABLE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Une tente : vue de face, un triangle de base 2 m et de hauteur 1 m ; 3 m de long. La pompe envoie 1 m³ par coup.
   Réponse A : 2 × 1 ÷ 2 = 1 m² ; × 3 = 3 m³ : trois coups de pompe. (6 : l'oubli du ÷ 2 ; 1 : l'aire seule.)
   « Pouf, pouf, pouf » : chaque coup remplit 1 m de la longueur (le triangle de 1 m² qui se répète sur 1 m = 1 m³).
   Commentaire : un triangle de base 2 m et de hauteur 2 m, sur 4 m de long.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la tente EN HAUT à DROITE et la pompe à DROITE jusqu'en bas (Ti Margo cache le bas du
   milieu-gauche), les calculs à gauche en haut. Cavalière des paysages : la profondeur fuit vers le haut-droite (PV_DX, PV_DY). */
const TN_U=140, TN_X=560, TN_Y=330, TN_XG=290;
const TN_DESSUS='#fdba74', TN_COTE='#c2410c', LONG5='#e599f7';
const TN_N=[Math.sin(.61),Math.cos(.61)];   /* perpendiculaire à l'arête fuyante, vers le bas-droite */
/* Le point (x en largeur, y en profondeur, z en hauteur) d'une tente dont le coin avant-bas-gauche est (X0, Y0) */
const tnPt=(X0,Y0,u,x,y,z)=>[X0+(x+y*PV_DX)*u,Y0-z*u+y*PV_DY*u];
/* La tente : le fantôme (tente vide, en pointillé), la partie gonflée sur `plein` mètres depuis l'avant, la face avant
   (le triangle) en orange si face=true (zoomée de zf). Renvoie la fonction q(x, y, z). */
function tnTente(c,X0,Y0,b,h,L,u,{plein=0,fantome=true,face=false,zf=1}={}){
  const q=(x,y,z)=>tnPt(X0,Y0,u,x,y,z);
  const tri=y=>[q(0,y,0),q(b,y,0),q(b/2,y,h)];
  const panD=(y0,y1)=>[q(b/2,y0,h),q(b,y0,0),q(b,y1,0),q(b/2,y1,h)];
  const panG=(y0,y1)=>[q(0,y0,0),q(b/2,y0,h),q(b/2,y1,h),q(0,y1,0)];
  if(fantome){ c.save(); c.globalAlpha=.14; [panG(0,L),panD(0,L),tri(0)].forEach(p=>pgPoly(c,p,'#f8f9fa',null)); c.restore();
    c.save(); c.setLineDash([14,10]); [panG(0,L),panD(0,L),tri(0)].forEach(p=>pgPoly(c,p,null,'rgba(248,249,250,.7)',4)); c.restore(); }
  if(plein>0){ const p=Math.min(L,plein); pgPoly(c,panG(0,p),TN_DESSUS,TRIANGLE_B,5); pgPoly(c,panD(0,p),TN_COTE,TRIANGLE_B,5); }
  if(face&&zf>0) pgPoly(c,tri(0),TRIANGLE,TRIANGLE_B,6,zf);
  return q; }
/* Les mesures : la base (bleue, en bas), la hauteur du triangle (verte, pointillée DANS le triangle, mesurée À GAUCHE),
   la longueur (fuchsia, l'arête fuyante du bas) ; chacune a son instant (Infinity = jamais) */
function tnMesures(c,T,q,b,h,L,{tB=Infinity,tH=Infinity,tL=Infinity,sB='',sH='',sL='',hauteurIci=true}){
  const [ax,ay]=q(0,0,0), [bx,by]=q(b,0,0), [hx,hy]=q(b/2,0,0), [sx,sy]=q(b/2,0,h), [lx,ly]=q(b,L,0);
  pgTrait(c,ax,ay,bx,by,(T-tB)/.4,BASE5,10);
  if(T>=tB) ecrire(c,sB,(ax+bx)/2,ay+46,54*zoom(T,tB,.4),BASE5);
  if(hauteurIci&&T>=tH){ pgTrait(c,sx,sy,hx,hy,(T-tH)/.5,HAUT5,8,[18,12]);
    if(T>=tH+.4){ c.strokeStyle=HAUT5; c.lineWidth=5; c.strokeRect(hx-26,hy-26,26,26); }
    const xc=ax-34; c.strokeStyle=HAUT5; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(xc,sy); c.lineTo(xc,ay);
    c.moveTo(xc-12,sy); c.lineTo(xc+12,sy); c.moveTo(xc-12,ay); c.lineTo(xc+12,ay); c.stroke();
    c.setLineDash([8,8]); c.strokeStyle='rgba(173,181,189,.8)'; c.lineWidth=3; c.beginPath(); c.moveTo(xc,sy); c.lineTo(sx-14,sy); c.stroke(); c.setLineDash([]);
    ecrire(c,sH,xc-64,(sy+ay)/2,52*zoom(T,tH,.4),HAUT5); }
  pgTrait(c,bx,by,lx,ly,(T-tL)/.5,LONG5,10);
  if(T>=tL) ecrire(c,sL,(bx+lx)/2+TN_N[0]*78,(by+ly)/2+TN_N[1]*78,54*zoom(T,tL,.4),LONG5); }
/* La pompe : (x, y) = le milieu du pied ; k = la poignée enfoncée (0 → 1) ; le tuyau va jusqu'au point (ex, ey) */
function tnPompe(c,x,y,z,k,ex,ey){ if(z<=0) return; c.save(); c.globalAlpha=Math.min(1,z);
  c.strokeStyle='#868e96'; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(x-30,y-40);
  c.bezierCurveTo(x-110,y-60,ex+10,ey+150,ex,ey); c.stroke();
  c.fillStyle='#868e96'; c.fillRect(x-75,y-14,150,16);
  const hy=y-210+k*45; c.strokeStyle='#ced4da'; c.lineWidth=8; c.beginPath(); c.moveTo(x,y-150); c.lineTo(x,hy); c.stroke();
  c.lineWidth=14; c.beginPath(); c.moveTo(x-58,hy); c.lineTo(x+58,hy); c.stroke();
  c.fillStyle='#4dabf7'; c.strokeStyle='#1864ab'; c.lineWidth=5; c.beginPath(); c.roundRect(x-32,y-152,64,140,12); c.fill(); c.stroke();
  c.restore(); }

FILMS['volume-prisme']=function(outils){
  const DUR={'00-accroche':9.81,'01-pompe':6.07,'02-question':13.47,'02b-reponse':12.09,'03-ouf':3.89,'04-commentaire':10.33,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'01-pompe':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tFace=mot('00-accroche','face'), tTri=mot('00-accroche','triangle'), t2=mot('00-accroche','2'),
        t1=mot('00-accroche','1'), t3=mot('00-accroche','3');
  const tPompe=mot('01-pompe','pompe'), tCube=mot('01-pompe','cube'), tCombien=mot('01-pompe','Combien');
  const tA=mot('02b-reponse','A'), tFois1=mot('02b-reponse','fois',2), tFois3=mot('02b-reponse','fois',3),
        t3l=mot('02b-reponse','3'), tCubes=mot('02b-reponse','cubes'), tTrois=mot('02b-reponse','Trois');
  const tP=[mot('03-ouf','pouf',1),mot('03-ouf','pouf',2),mot('03-ouf','pouf',3)], tGonflee=mot('03-ouf','gonflée');
  const tTri4=mot('04-commentaire','triangle'), t2b=mot('04-commentaire','2'), tHaut4=mot('04-commentaire','hauteur'),
        t2h=mot('04-commentaire','2',3), t4=mot('04-commentaire','4'), tQuel=mot('04-commentaire','Quel'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Vue')-.08, finR=tFois3-.08;
  const PX=940, PY=640;                        /* le pied de la pompe */
  const lisse01=u=>{ u=Math.max(0,Math.min(1,u)); return u*u*(3-2*u); };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un triangle de base 2 m, de hauteur 2 m, sur 4 m de long (115 px par mètre) */
      const u=115, X0=600, Y0=440;
      if(T>=tTri4){ const qq=tnTente(c,X0,Y0,2,2,4,u,{plein:4,fantome:false,face:true,zf:T<tTri4+.5?zoom(T,tTri4,.3):1});
        tnMesures(c,T,qq,2,2,4,{tB:t2b,tH:t2h,tL:t4,sB:'2 m',sH:'2 m',sL:'4 m'}); }
      if(T>=tQuel) ecrire(c,'? m³',TN_XG,200,96*zoom(T,tQuel,.5),CRAIE.jaune);
      tab.maj(); return; }

    const apres=T>=finR;
    /* « Pouf, pouf, pouf » : chaque coup gonfle 1 m de la longueur ; la poignée s'enfonce à chaque coup */
    const plein=tP.reduce((s,t)=>s+lisse01((T-t)/.35),0);
    const appui=Math.max(0,...tP.map(t=>{ const v=(T-t)/.45; return v<0||v>1?0:Math.sin(v*Math.PI); }));
    /* la pompe d'abord : son tuyau passe SOUS la tente (il ne coupe ni la base ni la longueur) */
    if(T>=tPompe){ const [ex,ey]=tnPt(TN_X,TN_Y,TN_U,2,.55,0); tnPompe(c,PX,PY,(T-tPompe)/.4,appui,ex,ey-8); }
    const qq=tnTente(c,TN_X,TN_Y,2,1,3,TN_U,{plein,face:T>=tTri,zf:T<tTri+.5?zoom(T,tTri,.3):1});
    if(T>=tFace&&T<tTri+.3){ /* « vue de face » : le contour du triangle avant, en jaune */
      c.save(); c.globalAlpha=Math.min(1,(T-tFace)/.25); pgPoly(c,[qq(0,0,0),qq(2,0,0),qq(1,0,1)],null,CRAIE.jaune,9); c.restore(); }
    tnMesures(c,T,qq,2,1,3,{tB:t2,tH:t1,tL:t3,sB:'2 m',sH:'1 m',sL:'3 m',hauteurIci:!apres});
    if(apres){ const [x0,y0]=qq(0,0,0),[x1]=qq(2,0,0),[,y2]=qq(1,0,1);
      pgEtiquette(c,'1 m²',(x0+x1)/2,(2*y0+y2)/3,48,CRAIE.blanc); }
    if(T>=tCube&&T<ouf){ pvPave(c,690,650,1,1,1,78,{z:zoom(T,tCube,.4)});
      pgEtiquette(c,'1 m³',729,520,48*zoom(T,tCube,.4),CRAIE.blanc); }
    if(T>=tCombien&&!apres) ecrire(c,'? coups',TN_XG-20,130,84*zoom(T,tCombien,.5),CRAIE.jaune);
    if(T<q){ tab.maj(); return; }

    /* après la carte : 2 × 1 ÷ 2 = 1 m² ; × 3 = 3 m³ ; 3 coups */
    pgLigne(c,T,[['2 × 1 ÷ 2',finR+.1],['= 1 m²',finR+.3]],TN_XG,120,56,CRAIE.blanc);
    pgLigne(c,T,[['× 3',tFois3],['= 3 m³',tCubes]],TN_XG,235,64,CRAIE.ok);
    if(T>=tTrois) ecrire(c,'3 coups !',TN_XG,350,64*zoom(T,tTrois,.3),CRAIE.jaune);
    if(T>=tGonflee) coche(c,TN_XG-60,455,.8);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-pompe'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je gonfle ma tente.'));
  const s0=suiteDe(dis,60,62,[a0('Vue de face,'),a0("c'est un triangle :")],[a0('2 mètres de base,'),a0('1 mètre de haut.')],
    [a0('Elle fait'),a0('3 mètres de long.')]);
  const s1=suiteDe(q,60,62,[a1('Ma super pompe envoie'),a1('1 mètre cube à chaque coup.')],[a1('Combien de coups'),a1('faut-il ?')]);
  qd('Question !');
  const phraseQ=[qd('Quel est le volume'),qd('de la tente ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le triangle : 2 × 1,'), r2=rd('÷ 2, 1 mètre carré.');
  r1[3][4]=tFois1; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('× 3 mètres de long :'),rd('3 mètres cubes.')],[rd('Trois coups de pompe !')]),
    ...suiteDe(com,60,62,[a3('Pouf, pouf, pouf…'),a3('la tente est gonflée !')]),
    ...suiteDe(f,60,60,[a4('À toi : un triangle'),a4('de base 2 mètres')],[a4('et de hauteur 2 mètres,')],
      [a4('sur 4 mètres de long.')],[a4('Quel est le volume ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « m » (« mètres » : la 2e marque de chaque paire), puis « ³ » */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="tnw${k}">${w}</span>`; };
  const choixA=`3 ${sp('m',qm('mètres',2))}${sp('³',qm('cubes',1))}`, choixB=`6 ${sp('m',qm('mètres',4))}${sp('³',qm('cubes',2))}`,
        choixC=`1 ${sp('m',qm('mètre',2))}${sp('³',qm('cube',1))}`;
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.tnv${k}) .tnw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M40 205 L120 105 L190 50 L110 150 Z" fill="${TN_DESSUS}" stroke="${TRIANGLE_B}" stroke-width="6" stroke-linejoin="round"/>`+
    `<path d="M120 105 L200 205 L270 150 L190 50 Z" fill="${TN_COTE}" stroke="${TRIANGLE_B}" stroke-width="6" stroke-linejoin="round"/>`+
    `<path d="M40 205 L200 205 L120 105 Z" fill="${TRIANGLE}" stroke="${TRIANGLE_B}" stroke-width="6" stroke-linejoin="round"/>`+
    `<text x="292" y="120" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien de coups<br>de pompe ?'+PARI,mini);
  return { clips,FIN,titre:'La tente gonflable',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('3')],[choixB,tq('B'),tq('6')],[choixC,tq('C'),tq('1')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('tnv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis){ T<tTri?g.montre():g.ouvre(); }
      else if(T<q){ T<tCombien?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.montre(); }
      else if(T<ouf){ T<tCubes?g.montre():g.fier(); }
      else if(T<com){ T<tGonflee?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
