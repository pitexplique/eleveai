/* Série Nombres décimaux 6e, épisode 12 : LE PIÈGE DES SOLDES (au magasin de jeux vidéo).
   Un jeu à 40 €, moins 25 % : Ti Margo retire 25 €. La vendeuse sourit : 25 %, c'est le quart, 10 €.
   Outils : films/decimaux.js (voixDe, poserTableau, ecrire, pop, suiteDe, gestes, poserMiniature). */
FILMS['calcul-defi']=function(outils){
  /* « 25 % » arrive en trois instants (« vingt-cinq », « pour », « cent ») : on en garde deux,
     comme « 40 euros », pour que l'écrit « 25 % » prenne ses mots (copie locale, le fichier reste tel quel). */
  const CLS=(window.CUES||{})[VIDEO];
  if(CLS) for(const k of Object.keys(CLS)){ const l=CLS[k], out=[]; let n=0;
    l.forEach((x,i)=>{ n=i&&x[1]===l[i-1][1]?n+1:0; if(!(x[1].includes('%')&&n>=2)) out.push(x); }); CLS[k]=out; }

  const {$,panneau}=outils;
  const DUR={'00-accroche':12.09,'01-vendeuse':8.96,'02-question':12.25,'02b-reponse':9.11,'03-snif':5.92,'04-commentaire':8.71,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ven,q,r,sn,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  /* ---- Le magasin de jeux vidéo ---- */
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(90,50),new THREE.MeshBasicMaterial({color:0xe7e0ff})); mur.position.set(0,25,-1.75); scene3d.add(mur);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xcfd8e3})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-14;i<=14;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0xb4c0cf})); l.rotation.x=-Math.PI/2; l.position.set(i*1.1,0,-10); scene3d.add(l); }
  for(let z=-1.6;z<6;z+=1.1){ const l=new THREE.Mesh(new THREE.PlaneGeometry(60,.04),new THREE.MeshBasicMaterial({color:0xb4c0cf})); l.rotation.x=-Math.PI/2; l.position.set(0,.001,z); scene3d.add(l); }
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(90,.26),new THREE.MeshBasicMaterial({color:0x5f3dc4})); plinthe.position.set(0,.13,-1.73); scene3d.add(plinthe);
  /* Deux étagères de boîtes de jeux, à gauche */
  const COULS=[0x1971c2,0xe03131,0x2f9e44,0x9c36b5,0xf76707,0x0c8599];
  const etageres=new THREE.Group(); etageres.position.set(-2.35,0,-1.55); scene3d.add(etageres);
  for(const [y,dec] of [[1.25,0],[2.15,2]]){
    piece(etageres,new RoundedBoxGeometry(1.9,.08,.36,2,.02),toon(0x8a5a2b),[0,y,0],CONTOUR_SOMBRE);
    for(let k=0;k<5;k++) piece(etageres,new RoundedBoxGeometry(.28,.48,.2,2,.03),toon(COULS[(k+dec)%6]),[-.72+k*.36,y+.28,0],CONTOUR_FIN); }
  /* Le comptoir (avec son panneau « SOLDES ») et la vendeuse derrière */
  const compt=new THREE.Group(); compt.position.set(1.4,0,-.75); scene3d.add(compt);
  piece(compt,new RoundedBoxGeometry(.9,1.12,.62,3,.04),toon(0x5f3dc4),[0,.56,0],CONTOUR_SOMBRE);
  piece(compt,new RoundedBoxGeometry(1.0,.08,.72,3,.03),toon(0xf1f3f5),[0,1.15,0],CONTOUR_SOMBRE);
  const cvS=document.createElement('canvas'); cvS.width=512; cvS.height=200; const cs=cvS.getContext('2d');
  cs.fillStyle='#e03131'; cs.fillRect(0,0,512,200); cs.fillStyle='#fff'; cs.font='900 128px "Segoe UI"'; cs.textAlign='center'; cs.textBaseline='middle'; cs.fillText('SOLDES',256,106);
  const txS=new THREE.CanvasTexture(cvS); txS.colorSpace=THREE.SRGBColorSpace;
  const panS=new THREE.Mesh(new THREE.PlaneGeometry(.8,.31),new THREE.MeshBasicMaterial({map:txS})); panS.position.set(0,.6,.315); compt.add(panS);
  /* Une manette posée sur le comptoir */
  const man=new THREE.Group(); man.position.set(.12,1.23,.05); compt.add(man);
  piece(man,new RoundedBoxGeometry(.42,.09,.2,3,.04),toon(0x343a40),[0,0,0],CONTOUR_FIN);
  for(const s of [-1,1]) piece(man,new THREE.SphereGeometry(.1,12,10),toon(0x343a40),[s*.17,-.01,.07],CONTOUR_FIN);
  const vend=new THREE.Group(); vend.position.set(1.4,0,-1.25); scene3d.add(vend);
  const peau=toon(0x8d5524), noir=toon(0x111827), viol=toon(0x7048e8);
  piece(vend,new THREE.CylinderGeometry(.33,.42,1.5,18),viol,[0,1.15,0],CONTOUR_SOMBRE);
  piece(vend,new THREE.CylinderGeometry(.11,.12,.2,12),peau,[0,1.95,0],null);
  const teteV=new THREE.Group(); teteV.position.set(0,2.3,0); vend.add(teteV);
  piece(teteV,new THREE.SphereGeometry(.36,22,18),peau,[0,0,0],CONTOUR_SOMBRE);
  piece(teteV,new THREE.SphereGeometry(.385,22,18,0,Math.PI*2,0,Math.PI*.52),noir,[0,.03,-.03],null);
  piece(teteV,new THREE.SphereGeometry(.2,14,12),noir,[0,-.05,-.34],null);
  for(const s of [-1,1]){ piece(teteV,new THREE.SphereGeometry(.075,12,10),C.blanc,[s*.13,.04,.31],null); piece(teteV,new THREE.SphereGeometry(.042,10,8),noir,[s*.13,.04,.37],null); }
  const bouche=piece(teteV,new THREE.TorusGeometry(.11,.025,8,18,Math.PI),toon(0x9b2226),[0,-.13,.33],null); bouche.rotation.z=Math.PI;
  /* Son casque de joueuse */
  const casque=piece(teteV,new THREE.TorusGeometry(.4,.035,8,24,Math.PI),toon(0x212529),[0,.02,0],null);
  for(const s of [-1,1]) piece(teteV,new THREE.CylinderGeometry(.11,.11,.09,14),toon(0x22b8cf),[s*.39,-.02,0],CONTOUR_FIN).rotation.z=Math.PI/2;
  for(const s of [-1,1]) piece(vend,new THREE.CylinderGeometry(.08,.07,.9,10),viol,[s*.42,1.4,.08],CONTOUR_FIN).rotation.z=s*.22;

  const tab=poserTableau({L:4.4,H:3,x:0,y:4.6,pieds:false});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* ---- Les instants ---- */
  const tUn=mot('00-accroche','Un'), t40=mot('00-accroche','40'), tMoins=mot('00-accroche','moins'), tRet=mot('00-accroche','retire'),
        t25=mot('00-accroche','25',3), t15=mot('00-accroche','15'), tParie=mot('00-accroche','paries');
  const tSour=mot('01-vendeuse','sourit'), tPas=mot('01-vendeuse','pas'), tQ25=mot('01-vendeuse','25',5), tQuart=mot('01-vendeuse','quart');
  const tPrep=mot('03-snif','préparé'), tM15=mot('03-snif','manque'), tSnif=mot('03-snif','Snif');
  const t45=mot('04-commentaire','45'), t10=mot('04-commentaire','10'), tNouv=mot('04-commentaire','nouveau'), tRep=mot('04-commentaire','Réponds');

  const z=(T,t0)=>Math.max(1,pop(T,t0));
  /* Écrit à la craie, réduit s'il déborderait de l'ardoise (même au plus fort du « pop ») */
  function ecr(c,s,x,y,t,coul,align){ c.font=`800 ${t}px "Segoe UI"`; const w=c.measureText(s).width, m=Math.min(x,tab.W-x)*2-50;
    if(w>m) t*=m/w; ecrire(c,s,x,y,t,coul,align); }
  function barrer(c,x0,x1,y,coul=CRAIE.faux){ c.strokeStyle=coul; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x0,y); c.lineTo(x1,y); c.stroke(); }
  /* Le disque en 4 parts : le quart colorié */
  function disque(c,x,y,R,u){ c.lineWidth=8; c.strokeStyle=CRAIE.blanc;
    if(u>0){ c.fillStyle=CRAIE.d; c.beginPath(); c.moveTo(x,y); c.arc(x,y,R,-Math.PI/2,-Math.PI/2+Math.PI/2*Math.min(1,u)); c.closePath(); c.fill(); }
    c.beginPath(); c.arc(x,y,R,0,7); c.stroke(); c.beginPath(); c.moveTo(x-R,y); c.lineTo(x+R,y); c.moveTo(x,y-R); c.lineTo(x,y+R); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : rien de calculé, la réponse reste à l'élève */
      if(T>=t45) ecr(c,'45 €',W/2,150,130*z(T,t45),CRAIE.blanc);
      if(T>=t10) ecr(c,'− 10 %',W/2,330,110*z(T,t10),CRAIE.d);
      if(T>=tNouv) ecr(c,'Nouveau prix = ?',W/2,520,86*z(T,tNouv),CRAIE.ok);
      tab.maj(); return; }
    if(T>=sn){ /* ce qu'il lui manque */
      ecr(c,'Prix : 30 €',W/2,120,96,CRAIE.ok);
      if(T>=tPrep) ecr(c,'J’ai : 15 €',W/2,320,96*z(T,tPrep),CRAIE.blanc);
      if(T>=tM15) ecr(c,'Il manque 15 €',W/2,520,96*z(T,tM15),CRAIE.faux);
      tab.maj(); return; }
    /* l'accroche, puis la vendeuse : le calcul de Ti Margo, barré, et le quart */
    const dx=T>=tQ25?-140:0;
    if(T>=t40) ecr(c,'40 €',W/2+dx,100,120*z(T,t40),CRAIE.blanc);
    if(T>=tMoins) ecr(c,'− 25 %',W/2+dx,230,110*z(T,tMoins),CRAIE.d);
    const faux=T>=tPas?CRAIE.faux:CRAIE.blanc;
    if(T>=tRet) ecr(c,'40 € − 25 €',W/2-150,370,80*z(T,t25),faux,'center');
    if(T>=t15) ecr(c,'= 15 € ?',W/2+290,370,80*z(T,t15),faux,'center');
    if(T>=tPas){ const u=Math.min(1,(T-tPas)/.35); barrer(c,W/2-400,W/2-400+850*u,370); }
    if(T>=tQ25&&T<q){ disque(c,W-230,165,100,(T-tQuart)/.4);
      if(T>=tQuart) ecr(c,'25 % = le quart !',W/2,505,84*z(T,tQuart),CRAIE.ok); }
    tab.maj();
  }

  /* ---- Les écrits : exactement ce que dit la voix ---- */
  const a0=dit('00-accroche'), a1=dit('01-vendeuse'), a3=dit('03-snif'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),a0('Les soldes !')];
  const p1=[a0('Un jeu à 40 €,'),a0('moins 25 %.')];
  const p2=[a0('Je retire 25 € :'),a0('il coûte 15 € !')], p3=[a0('Tu paries ?')];
  const v1=[a1('La vendeuse sourit.')], v2=[a1('25 %, ce n’est pas 25 € !')], v3=[a1('25 %, c’est le quart !')];
  const s1=[a3('J’avais préparé 15 €…')]; a3.saute(1); const s2=[a3('Il m’en manque 15.')], s3=[a3('Snif !')];
  const groupes=[
    groupe(acc+.1,tUn-.08,352,62,...salut),
    ...suiteDe(ven,60,62,p1,p2,p3),
    ...suiteDe(q,60,60,v1,v2,v3),
    ...suiteDe(com,60,62,s1,s2,s3),
    ...suiteDe(f,60,56,[a4('À toi : un jeu à 45 €,'),a4('moins 10 %.'),a4('Quel est le nouveau prix ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle est la réduction ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le quart de 40 :'), r2a=rd('40'); rd.saute(2); const r2b=rd('4'); rd.saute(2); const r2c=rd('10.'), r3=rd('Le jeu coûte 30 €.');
  /* « ÷ » : la voix dit « divisé par », le signe paraît à « divisé » */
  const r2=[r2a[0],r2c[1],'40 ÷ 4 = 10.',[r2a[3][0],mot('02b-reponse','divisé'),r2b[0],r2c[0],r2c[0]]];

  poserMiniature(outils,acc+1,'Moins 25 %<br>= moins 25 € ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="92" font-family="Segoe UI" font-weight="800" font-size="76" fill="#f8f9fa" text-anchor="middle">40 €</text><text x="165" y="172" font-family="Segoe UI" font-weight="800" font-size="70" fill="#ffd43b" text-anchor="middle">− 25 %</text></svg>`);
  return { clips,FIN,titre:'Le piège des soldes',ceinture:1,finTitre:tUn-.08,groupes,finClip:'05-abonne',
    cuts:[tUn-.08,ven,q,r,sn,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:sn,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['25 €',tq('A'),tq('25')],['10 €',tq('B'),tq('10')],['4 €',tq('C'),tq('4')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<sn, dansF=T>=f, gros=T<tUn-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      const vu=!gros&&!dansQ&&!dansF&&!window.MINI; vend.visible=vu; compt.visible=vu;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* La vendeuse sourit, et tourne la tête vers Ti Margo quand elle parle */
      const sourire=T>=tSour&&T<q?1.5:1; bouche.scale.set(sourire,sourire,1);
      teteV.rotation.y=T>=ven&&T<q?-.35*lisse((T-ven)/.4):-.12; teteV.rotation.z=T>=tSour&&T<q?Math.sin(T*2.2)*.06:0;

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<ven){ if(T<t15) g.montre(); else g.fier(); }
      else if(T<q){ if(T>=tPas&&T<tQuart){ g.oups(); scene.ry=-.12+.3*lisse((T-tPas)/.35); } else if(T>=tQuart) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<sn){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ g.oups(); if(T>=tSnif) P.tetZ=.22; }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
