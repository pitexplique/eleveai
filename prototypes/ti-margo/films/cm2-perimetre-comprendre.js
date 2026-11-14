/* ============================================================
   Série Périmètre CM2 — ÉPISODE 01 : LONG OU CARRÉ ? Outils : films/cm2-commun.js + cm2-perimetre.js.
   Ti Margo a 20 allumettes pour la barrière de l'enclos de sa tortue. Un enclos long (8 en haut, 8 en bas,
   2 de chaque côté) ou un enclos carré (5 sur chaque côté) : lequel a le plus grand tour ?
   Réponse A : le même tour, 20 allumettes chacun (8 + 8 + 2 + 2 = 5 × 4 = 20). La tortue préfère le carré.
   Commentaire : 20 allumettes, 6 en haut et 6 en bas ; combien sur chaque petit côté ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : les enclos à gauche, à l'échelle (U px par allumette), le texte à droite
   (Ti Margo cache le bas du milieu de l'ardoise). Sommets : 0 haut gauche, 1 haut droite, 2 bas droite, 3 bas gauche. */
const U_ALL=40, XRP=780;
const ENC_LONG=[[100,100],[100+8*U_ALL,100],[100+8*U_ALL,100+2*U_ALL],[100,100+2*U_ALL]];
const ENC_CARRE=[[100,330],[100+5*U_ALL,330],[100+5*U_ALL,330+5*U_ALL],[100,330+5*U_ALL]];
const ENC_DEFI=[[100,200],[100+6*U_ALL,200],[100+6*U_ALL,200+4*U_ALL],[100,200+4*U_ALL]];
const HERBE_P='#69db7c', HERBE_PB='#2b8a3e';

/* Une allumette de a vers b : le bois, et la tête rouge au bout */
function allumette(c,ax,ay,bx,by){
  c.strokeStyle='#f1c27d'; c.lineWidth=11; c.lineCap='round'; c.beginPath(); c.moveTo(ax,ay); c.lineTo(bx,by); c.stroke();
  const l=Math.hypot(bx-ax,by-ay)||1, hx=bx-(bx-ax)/l*5, hy=by-(by-ay)/l*5;
  c.fillStyle='#e03131'; c.strokeStyle='#862e2e'; c.lineWidth=2.5; c.beginPath(); c.arc(hx,hy,9,0,7); c.fill(); c.stroke(); }
/* Les n allumettes du côté a → b, posées une à une à partir de t0, en d secondes */
function coteAllumettes(c,T,a,b,n,t0,d=.6){ if(T<t0) return;
  for(let k=0;k<n;k++){ if(T<t0+d*k/n) break; const u0=(k+.08)/n, u1=(k+.92)/n;
    allumette(c,a[0]+(b[0]-a[0])*u0,a[1]+(b[1]-a[1])*u0,a[0]+(b[0]-a[0])*u1,a[1]+(b[1]-a[1])*u1); } }
/* Le contour d'un enclos en pointillés (vide, encore sans barrière) */
function contourPointille(c,pts,coul='rgba(255,255,255,.55)',lw=5){ c.save(); c.setLineDash([16,14]); c.strokeStyle=coul; c.lineWidth=lw; c.lineJoin='round';
  c.beginPath(); pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.closePath(); c.stroke(); c.restore(); }
/* Le tas des 20 allumettes, debout côte à côte */
function tasAllumettes(c,x,y,n=20,pas=19,h=74){ for(let k=0;k<n;k++) allumette(c,x+k*pas,y+h,x+k*pas,y); }
/* La tortue, vue de dessus (centre x, y ; taille s) */
function tortue(c,x,y,s=1){ if(s<=0) return;
  c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle='#8ce99a'; c.strokeStyle='#2b8a3e'; c.lineWidth=4;
  for(const [px,py] of [[-34,-24],[34,-24],[-34,24],[34,24]]){ c.beginPath(); c.ellipse(px,py,13,10,0,0,7); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(52,0,17,14,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(58,-6,3.2,0,7); c.arc(58,6,3.2,0,7); c.fill();
  c.fillStyle='#a9743b'; c.strokeStyle='#5c3d1e'; c.lineWidth=5; c.beginPath(); c.ellipse(0,0,44,34,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#5c3d1e'; c.lineWidth=3; c.beginPath();
  for(let i=0;i<6;i++){ const a=i*Math.PI/3, b=a+Math.PI/3; i?c.lineTo(15*Math.cos(a)*1.3,15*Math.sin(a)):c.moveTo(19.5,0); }
  c.closePath(); c.stroke();
  for(let i=0;i<6;i++){ const a=i*Math.PI/3; c.beginPath(); c.moveTo(19.5*Math.cos(a),15*Math.sin(a)); c.lineTo(40*Math.cos(a),31*Math.sin(a)); c.stroke(); }
  c.restore(); }

FILMS['comprendre']=function(outils){
  const DUR={'00-accroche':10.94,'01-enclos':8.81,'02-question':13.32,'02b-reponse':13.21,'03-ouf':5.57,'04-commentaire':11.47,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,enc,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* Les instants des mots */
  const tUn=mot('00-accroche','Un'), tLong=mot('00-accroche','long'), tCarre=mot('00-accroche','carré'), tTour=mot('00-accroche','tour');
  const t8h=mot('01-enclos','8'), tHaut=mot('01-enclos','haut'), t8b=mot('01-enclos','8',2), tBas=mot('01-enclos','bas'),
        t2=mot('01-enclos','2'), tCote=mot('01-enclos','côté'), tCarreE=mot('01-enclos','carré'), t5=mot('01-enclos','5'),
        tChaque=mot('01-enclos','chaque',2), tCote2=mot('01-enclos','côté',2);
  const tMeme=mot('03-ouf','même'), tTortue=mot('03-ouf','tortue'), tPrefere=mot('03-ouf','préfère'), tPlace=mot('03-ouf','place');
  const tC20=mot('04-commentaire','20'), tC6h=mot('04-commentaire','6'), tCHaut=mot('04-commentaire','haut'), tC6b=mot('04-commentaire','6',2),
        tCBas=mot('04-commentaire','bas'), tComb=mot('04-commentaire','Combien'), tPetit=mot('04-commentaire','petit'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tUn-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 6 allumettes en haut, 6 en bas ; les petits côtés restent à trouver */
      if(T>=tC6h) polyCraie(c,ENC_DEFI,zoom(T,tC6h,.3),HERBE_P,HERBE_PB);
      if(T>=tC6h) contourPointille(c,ENC_DEFI);
      coteAllumettes(c,T,ENC_DEFI[0],ENC_DEFI[1],6,tC6h,tCHaut-tC6h+.2);
      coteAllumettes(c,T,ENC_DEFI[2],ENC_DEFI[3],6,tC6b,tCBas-tC6b+.2);
      if(T>=tC6h) coteCraie(c,ENC_DEFI,0,'6',zoom(T,tC6h,.4),CRAIE.jaune,56,46);
      if(T>=tC6b) coteCraie(c,ENC_DEFI,2,'6',zoom(T,tC6b,.4),CRAIE.jaune,56,46);
      if(T>=tPetit){ coteCraie(c,ENC_DEFI,1,'?',zoom(T,tPetit,.5),CRAIE.jaune,64,46); coteCraie(c,ENC_DEFI,3,'?',zoom(T,tPetit,.5),CRAIE.jaune,64,46); }
      if(T>=tC20) ecrire(c,'20 allumettes',XRP,200,60*zoom(T,tC20,.4),CRAIE.jaune);
      if(T>=tComb) ecrire(c,'?',XRP,420,200*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* les deux enclos : l'herbe, puis le contour */
    if(T>=tLong) polyCraie(c,ENC_LONG,zoom(T,tLong,.3),HERBE_P,HERBE_PB);
    if(T>=tCarre) polyCraie(c,ENC_CARRE,zoom(T,tCarre,.3),HERBE_P,HERBE_PB);
    if(T<ouf){
      const orange=T>=tTour&&T<enc, coulC=orange?TOUR:'rgba(255,255,255,.55)';
      if(T>=tLong) contourPointille(c,ENC_LONG,coulC,orange?8:5);
      if(T>=tCarre) contourPointille(c,ENC_CARRE,coulC,orange?8:5);
      if(T<enc) tasAllumettes(c,XRP-190,250);
      if(T>=tLong) ecrire(c,'enclos long',XRP,140,58*zoom(T,tLong,.4),CRAIE.blanc);
      if(T>=tCarre) ecrire(c,'enclos carré',XRP,430,58*zoom(T,tCarre,.4),CRAIE.blanc);
      /* 01 : les allumettes se posent quand la voix les compte */
      coteAllumettes(c,T,ENC_LONG[0],ENC_LONG[1],8,t8h,tHaut-t8h+.3);
      coteAllumettes(c,T,ENC_LONG[2],ENC_LONG[3],8,t8b,tBas-t8b+.3);
      coteAllumettes(c,T,ENC_LONG[3],ENC_LONG[0],2,t2,tCote-t2);
      coteAllumettes(c,T,ENC_LONG[1],ENC_LONG[2],2,t2,tCote-t2);
      if(T>=t8h) coteCraie(c,ENC_LONG,0,'8',zoom(T,t8h,.4),CRAIE.jaune,56,46);
      if(T>=t8b) coteCraie(c,ENC_LONG,2,'8',zoom(T,t8b,.4),CRAIE.jaune,56,46);
      if(T>=t2){ coteCraie(c,ENC_LONG,1,'2',zoom(T,t2,.4),CRAIE.jaune,56,46); coteCraie(c,ENC_LONG,3,'2',zoom(T,t2,.4),CRAIE.jaune,56,46); }
      coteAllumettes(c,T,ENC_CARRE[0],ENC_CARRE[1],5,t5,tChaque-t5);
      coteAllumettes(c,T,ENC_CARRE[1],ENC_CARRE[2],5,tChaque,.3);
      coteAllumettes(c,T,ENC_CARRE[2],ENC_CARRE[3],5,tChaque+.3,.3);
      coteAllumettes(c,T,ENC_CARRE[3],ENC_CARRE[0],5,tChaque+.6,.3);
      if(T>=t5) coteCraie(c,ENC_CARRE,0,'5',zoom(T,t5,.4),CRAIE.jaune,56,46);
      for(let i=1;i<4;i++) if(T>=tChaque+.3*(i-1)) coteCraie(c,ENC_CARRE,i,'5',zoom(T,tChaque+.3*(i-1),.4),CRAIE.jaune,56,46);
      tab.maj(); return; }
    /* 03 : le même tour (orange), 20 allumettes chacun ; la tortue préfère le carré */
    tourPoly(c,ENC_LONG,1,TOUR,22); tourPoly(c,ENC_CARRE,1,TOUR,22);
    coteAllumettes(c,T,ENC_LONG[0],ENC_LONG[1],8,0); coteAllumettes(c,T,ENC_LONG[1],ENC_LONG[2],2,0);
    coteAllumettes(c,T,ENC_LONG[2],ENC_LONG[3],8,0); coteAllumettes(c,T,ENC_LONG[3],ENC_LONG[0],2,0);
    for(let i=0;i<4;i++) coteAllumettes(c,T,ENC_CARRE[i],ENC_CARRE[(i+1)%4],5,0);
    ecrire(c,'20 allumettes',XRP,140,60,CRAIE.ok);
    ecrire(c,'20 allumettes',XRP,430,60,CRAIE.ok);
    if(T>=tMeme) ecrire(c,'=',XRP,285,120*zoom(T,tMeme,.5),CRAIE.ok);
    if(T>=tTortue) tortue(c,(ENC_CARRE[0][0]+ENC_CARRE[1][0])/2-12,(ENC_CARRE[0][1]+ENC_CARRE[2][1])/2,1.3*zoom(T,tTortue,.3)*(T>=tPlace?zoom(T,tPlace,.2):1));
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-enclos'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0("J'ai 20 allumettes."),a0('Avec, je fais la barrière'),a0("d'un enclos pour ma tortue.")),
    ...suiteDe(enc,60,62,[a0('Un enclos long,'),a0('ou un enclos carré :')],[a0('lequel a'),a0('le plus grand tour ?')]),
    ...suiteDe(q,60,62,[a1("L'enclos long :"),a1('8 allumettes en haut,')],[a1('8 en bas,'),a1('et 2 de chaque côté.')],
      [a1("L'enclos carré :"),a1('5 allumettes'),a1('sur chaque côté.')]),
    ...suiteDe(com,60,62,[a3('Le même tour…')],[a3('mais ma tortue'),a3('préfère le carré :')],[a3('il y a plus de place'),a3('dedans !')]),
    ...suiteDe(f,60,60,[a4('À toi : avec 20 allumettes,'),a4('je fais un enclos')],[a4('de 6 allumettes en haut'),a4('et 6 en bas.')],
      [a4("Combien d'allumettes"),a4('sur chaque petit côté ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Lequel a le plus'),qd('grand tour ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("L'enclos long :"), r2=rd('8 + 8 + 2 + 2 : 20 allumettes.'), r3=rd("L'enclos carré :"), r4=rd('5 × 4 : 20 allumettes.'),
    r5=rd('Le même tour !');
  /* « 8 plus » et « 5 fois » sont deux marques au même texte : le signe prend la 2e (le mot « plus », « fois ») */
  r2[3][1]=mot('02b-reponse','plus',2); r4[3][1]=mot('02b-reponse','fois',2);
  const tA=mot('02b-reponse','A');

  /* Les choix, mot à mot : chaque mot paraît quand la voix le dit (une règle CSS par mot, réglée dans jouer) */
  const motsChoix=[]; const lab=(...ms)=>ms.map(([w,t])=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="cw${k}">${w}</span>`; }).join(' ');
  const qm=(m,n=1)=>mot('02-question',m,n);
  const choixA=lab(['les',qm('les')],['deux,',qm('deux')],['pareil',qm('pareil')]),
        choixB=lab(['l’enclos',qm("l'enclos")],['long',qm('long')]),
        choixC=lab(['l’enclos',qm("l'enclos",2)],['carré',qm('carré')]);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.vw${k}) .cw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  /* La miniature : les deux enclos d'allumettes (orange = le tour), et le « ? » */
  const bordMini=(x,y,nc,nr,s)=>{ let o=`<rect x="${x}" y="${y}" width="${nc*s}" height="${nr*s}" fill="#69db7c" stroke="#ff922b" stroke-width="7"/>`;
    const pts=[[x,y],[x+nc*s,y],[x+nc*s,y+nr*s],[x,y+nr*s]], ns=[nc,nr,nc,nr];
    for(let i=0;i<4;i++){ const [ax,ay]=pts[i],[bx,by]=pts[(i+1)%4]; for(let k=1;k<=ns[i];k++){ const u=(k-.1)/ns[i];
      o+=`<circle cx="${ax+(bx-ax)*u}" cy="${ay+(by-ay)*u}" r="4.5" fill="#e03131"/>`; } }
    return o; };
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    bordMini(30,34,8,2,19)+bordMini(30,118,5,5,19)+
    `<text x="262" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quel enclos a<br>le plus grand tour ?'+PARI,mini);
  return { clips,FIN,titre:'Long ou carré ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,enc,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A',2),tq('les')],[choixB,tq('B'),tq("l'enclos")],[choixC,tq('C'),tq("l'enclos",2)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3,r4],suite:[r5] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('vw'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<enc){ T<tTour?g.montre():g.reflechit(); }
      else if(T<q){ T<tCarreE?g.montre():(T<tCote2?g.montre():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tPrefere?g.fier():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
