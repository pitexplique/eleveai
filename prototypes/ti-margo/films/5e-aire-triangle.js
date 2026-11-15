/* ============================================================
   Série Aire 5e — ÉPISODE 02 : LE PIGNON DE LA CABANE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-aire.js.
   Je peins le haut de ma cabane : un triangle de base 4 m et de hauteur 3 m. « 4 × 3, 12 ! » J'achète de la
   peinture pour 12 m². Réponse C : 4 × 3 = 12, c'est le rectangle entier ; le triangle en est la moitié, 6 m².
   Il me reste la moitié de la peinture : je peins aussi la cabane du voisin.
   Commentaire : un triangle de base 6 m et de hauteur 5 m.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la cabane à gauche (90 px par mètre), le texte à droite (Ti Margo cache le bas du milieu) */
const PG_A=[110,330], PG_B=[470,330], PG_C=[290,60], PG_H=[290,330], PG_XR=800;
const PG_BOIS='#b07a45', PG_BOIS_B='#6b4423', PG_PEINT='#fb923c';
function pgPoly(c,pts,fill,bord,lw=8,z=1){ if(z<=0) return; const k=Math.min(1.2,z);
  const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length, cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;
  c.beginPath(); pts.forEach(([x,y],i)=>{ const X=cx+(x-cx)*k, Y=cy+(y-cy)*k; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath();
  if(fill){ c.fillStyle=fill; c.fill(); } if(bord){ c.strokeStyle=bord; c.lineWidth=lw; c.lineJoin='round'; c.stroke(); } }
/* Le fantôme d'un morceau (pointillé blanc), tourné de a autour de (ox, oy) */
function pgFantome(c,pts,ox,oy,a){ const co=Math.cos(a), si=Math.sin(a);
  c.beginPath(); pts.forEach(([x,y],i)=>{ const X=ox+(x-ox)*co-(y-oy)*si, Y=oy+(x-ox)*si+(y-oy)*co; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath();
  c.fillStyle='rgba(255,255,255,.25)'; c.fill(); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.setLineDash([16,12]); c.stroke(); c.setLineDash([]); }
/* Un trait tracé de u = 0 à 1 (plein ou pointillé) */
function pgTrait(c,x1,y1,x2,y2,u,coul,lw=8,tirets=null){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round';
  if(tirets) c.setLineDash(tirets); c.beginPath(); c.moveTo(x1,y1); c.lineTo(x1+(x2-x1)*u,y1+(y2-y1)*u); c.stroke(); c.setLineDash([]); }
/* Une ligne de mots centrée en x, chaque morceau paraît à son instant */
function pgLigne(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* Une étiquette posée SUR un dessin : un cartouche couleur ardoise derrière, pour rester lisible sur le bois ou l'orange */
function pgEtiquette(c,s,x,y,fs,coul){ if(fs<=0) return; c.font=`800 ${fs}px "Segoe UI"`; const w=c.measureText(s).width+fs*.5, h=fs*1.15;
  c.fillStyle='rgba(31,59,44,.92)'; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,fs*.25); c.fill(); ecrire(c,s,x,y,fs,coul); }
/* La cabane : le corps en bois, la porte ; le pignon (triangle) peint en orange à partir de tPeint */
function pgCabane(c,T,z,peint){ const [ax,ay]=PG_A,[bx]=PG_B;
  pgPoly(c,[[ax+30,ay],[bx-30,ay],[bx-30,ay+280],[ax+30,ay+280]],PG_BOIS,PG_BOIS_B,8,z);
  pgPoly(c,[[255,ay+130],[325,ay+130],[325,ay+280],[255,ay+280]],'#6b4423',null,0,z);
  pgPoly(c,[PG_A,PG_B,PG_C],peint?PG_PEINT:'#d6b98c',peint?TRIANGLE_B:PG_BOIS_B,8,z); }
/* Un pot de peinture (coin haut-gauche x, y), rempli de niv (0 à 1), étiquette s */
function pgPot(c,x,y,niv,s,z=1){ if(z<=0) return; const w=150*Math.min(1.2,z), h=170*Math.min(1.2,z);
  c.fillStyle='#ced4da'; c.strokeStyle='#495057'; c.lineWidth=6; c.beginPath(); c.roundRect(x,y,w,h,14); c.fill(); c.stroke();
  c.fillStyle=PG_PEINT; c.beginPath(); c.roundRect(x+8,y+8+(h-16)*(1-niv),w-16,(h-16)*niv,10); c.fill();
  if(s) ecrire(c,s,x+w/2,y+h/2,46,'#212529'); }

FILMS['triangle']=function(outils){
  const DUR={'00-accroche':7.73,'01-achat':6.1,'02-question':13.44,'02b-reponse':9.69,'03-ouf':5.52,'04-commentaire':8.96,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 4 mètres » a deux marques : la 1re = « quatre », la 2e = « mètres » ; nombre + unité s'écrit à la 2e */
  const tCabane=mot('00-accroche','cabane'), tTri=mot('00-accroche','triangle'), tBase=mot('00-accroche','base'),
        t4m=mot('00-accroche','mètres',2), tHaut=mot('00-accroche','hauteur'), t3m=mot('00-accroche','mètres',4);
  const t4=mot('01-achat','4'), tFois=mot('01-achat','fois',2), t3=mot('01-achat','3'), t12=mot('01-achat','12'),
        tPeinture=mot('01-achat','peinture'), t12m2=mot('01-achat','carrés');
  const tC=mot('02b-reponse','C'), tFoisR=mot('02b-reponse','fois',2), tRect=mot('02b-reponse','rectangle'),
        tMoitie=mot('02b-reponse','moitié'), t6=mot('02b-reponse','6'), tCarres=mot('02b-reponse','carrés');
  const tMoitieO=mot('03-ouf','moitié'), tVoisin=mot('03-ouf','voisin');
  const tTri4=mot('04-commentaire','triangle'), t6m=mot('04-commentaire','mètres',2), t5m=mot('04-commentaire','mètres',4),
        tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tTri-.08, finR=mot('02b-reponse','Le',2)-.08;

  function cotes(c,T){ const [ax,ay]=PG_A,[bx]=PG_B,[cx,cy]=PG_C,[hx,hy]=PG_H;
    pgTrait(c,ax,ay,bx,ay,(T-tBase)/.5,BASE5,12);
    if(T>=t4m) ecrire(c,'4 m',bx+80,ay,60*zoom(T,t4m,.4),BASE5);
    pgTrait(c,cx,cy,hx,hy,(T-tHaut)/.6,HAUT5,8,[18,12]);
    if(T>=tHaut+.4){ c.strokeStyle=HAUT5; c.lineWidth=5; c.strokeRect(hx,hy-26,26,26); }
    if(T>=t3m) pgEtiquette(c,'3 m',hx+62,(cy+hy)/2,58*zoom(T,t3m,.4),HAUT5); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un triangle de base 6 m et de hauteur 5 m (60 px par mètre) */
      const a=[120,560], b=[480,560], s=[240,260], h=[240,560];
      if(T>=tTri4) pgPoly(c,[a,b,s],TRIANGLE,TRIANGLE_B,8,T<tTri4+.5?zoom(T,tTri4,.3):1);
      pgTrait(c,a[0],a[1],b[0],b[1],(T-tTri4-.3)/.5,BASE5,12);
      if(T>=t6m) ecrire(c,'6 m',300,616,60*zoom(T,t6m,.4),BASE5);
      pgTrait(c,s[0],s[1],h[0],h[1],(T-t6m)/.6,HAUT5,8,[18,12]);
      if(T>=t5m) pgEtiquette(c,'5 m',170,420,58*zoom(T,t5m,.4),HAUT5);
      if(T>=tQuelle) ecrire(c,'? m²',PG_XR,300,110*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    if(T<q){ /* l'histoire : la cabane, son pignon, le calcul trop rapide, le pot de 12 m² */
      if(T>=tCabane) pgCabane(c,T,T<tCabane+.5?zoom(T,tCabane,.3):1,T>=tTri);
      cotes(c,T);
      pgLigne(c,T,[['4',t4],['×',tFois],['3',t3],['= 12',t12]],PG_XR,150,72,CRAIE.blanc);
      if(T>=tPeinture) pgPot(c,PG_XR-75,260,1,T>=t12m2?'12 m²':'',T<tPeinture+.5?zoom(T,tPeinture,.3):1);
      tab.maj(); return; }

    /* la réponse : le rectangle entier (12), la moitié (6) ; puis la moitié du pot, et la cabane du voisin */
    pgCabane(c,T,1,true); cotes(c,T);
    const [ax,ay]=PG_A,[bx]=PG_B,[cx,cy]=PG_C,[hx]=PG_H;
    const gauche=[PG_A,[ax,cy],PG_C], droite=[PG_B,[bx,cy],PG_C];
    if(T>=tRect&&T<ouf){ pgPoly(c,gauche,'rgba(173,181,189,.55)',null,0); pgPoly(c,droite,'rgba(173,181,189,.55)',null,0);
      c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.setLineDash([18,12]); c.strokeRect(ax,cy,bx-ax,ay-cy); c.setLineDash([]); }
    if(T>=tMoitie&&T<ouf){ const u=Math.PI*Math.min(1,(T-tMoitie)/.9);
      pgFantome(c,gauche,(ax+hx)/2,(cy+ay)/2,u); pgFantome(c,droite,(hx+bx)/2,(cy+ay)/2,u); }
    if(T>=t6) pgEtiquette(c,'6 m²',cx,ay-44,56*zoom(T,t6,.5),TRIANGLE);
    if(T<ouf){
      pgLigne(c,T,[['4',r+.1],['×',tFoisR],['3 = 12',tFoisR+.3]],PG_XR,110,60,CRAIE.blanc);
      if(T>=tRect) ecrire(c,'le rectangle',PG_XR,190,52*zoom(T,tRect,.3),CRAIE.gris);
      pgLigne(c,T,[['moitié :',tMoitie],['6 m²',t6]],PG_XR,300,60,TRIANGLE);
    } else {
      /* 03 : il reste la moitié du pot ; la cabane du voisin, plus petite, à droite */
      pgPot(c,PG_XR-75,90,T>=tMoitieO?Math.max(.5,1-.5*(T-tMoitieO)/.6):1,'');
      if(T>=tVoisin){ const z=T<tVoisin+.5?zoom(T,tVoisin,.3):1, ox=PG_XR-110, oy=320;
        pgPoly(c,[[ox+15,oy+110],[ox+205,oy+110],[ox+205,oy+230],[ox+15,oy+230]],PG_BOIS,PG_BOIS_B,6,z);
        pgPoly(c,[[ox,oy+110],[ox+220,oy+110],[ox+110,oy]],PG_PEINT,TRIANGLE_B,6,z); } }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-achat'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je peins le haut'),a0('de ma cabane :'));
  const s0=suiteDe(dis,60,62,[a0('un triangle.')],[a0('Sa base mesure 4 mètres,'),a0('sa hauteur 3 mètres.')]);
  const l1=a1('4 × 3, 12 !'); l1[3][1]=tFois; /* le signe « × » paraît quand la voix dit « fois » */
  const s1=suiteDe(q,60,62,[l1],[a1("J'achète de la peinture"),a1('pour 12 mètres carrés.')]);
  qd('Question !');
  const phraseQ=[qd("Quelle est l'aire"),qd('du triangle ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 × 3, 12 :'), r2=rd("c'est le rectangle entier.");
  r1[3][1]=tFoisR;
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('Le triangle en est'),rd('la moitié :')],[rd('6 mètres carrés.')]),
    ...suiteDe(com,60,62,[a3('Il me reste la moitié'),a3('de la peinture…')],[a3('je peins aussi'),a3('la cabane de mon voisin !')]),
    ...suiteDe(f,60,60,[a4('À toi : un triangle'),a4('de base 6 mètres')],[a4('et de hauteur 5 mètres.')],
      [a4('Quelle est son aire ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « m » (« mètres »), puis « ² » (« carrés ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="pgw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('m',qm('mètres',2*k))}${sp('²',qm('carrés',k))}`;
  const choixA=choixDe('12',1), choixB=choixDe('7',2), choixC=choixDe('6',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.pgv${k}) .pgw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M40 210 L200 210 L120 50 Z" fill="${PG_PEINT}" stroke="${TRIANGLE_B}" stroke-width="7" stroke-linejoin="round"/>`+
    `<path d="M120 50 L120 210" stroke="${HAUT5}" stroke-width="6" stroke-dasharray="14 10"/>`+
    `<text x="268" y="170" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'12 m² de<br>peinture ?'+PARI,mini);
  return { clips,FIN,titre:'Le pignon de la cabane',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('12')],[choixB,tq('B'),tq('7')],[choixC,tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('pgv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis){ T<tHaut?g.montre():g.ouvre(); }
      else if(T<q){ T<tPeinture?g.fier():g.pouce(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.oups(); }
      else if(T<ouf){ T<t6?g.montre():g.fier(); }
      else if(T<com){ T<tVoisin?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
