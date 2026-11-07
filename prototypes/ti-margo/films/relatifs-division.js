/* ============================================================
   ÉPISODE 04 : LE TRÉSOR. (−20) ÷ (−5) = 4, puis (−12) ÷ 3 = −4.
   Une île vue en coupe : le puits que Ti Margo creuse, gradué de 0 à −20 sur la paroi.
   Le coffre contient une dette ; les copains partagent, puis s'enfuient.
   ============================================================ */
FILMS.division=function({el,$,mots,jetons,panneau,carte,legende,fin,lisse}){
  /* ---- Les clips : tout le reste en découle ---- */
  const acc=.4,sit=14.1,q=19.85,r=34.25,cre=40.45,cof=54.65,cop=64.35,c=76.25,f=87.95,FIN=94.8;
  const clips=[['00-accroche',acc],['01-situation',sit],['01q-question',q],['01r-reponse',r],['02-creuse',cre],['03-coffre',cof],['04-copains',cop],['05-question',c],['06-abonne',f]];

  /* ---- Les légendes : chaque mot écrit à l'instant exact où il est dit ---- */
  const N=' ';
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([t,l])=>[base+l[0],base+l[l.length-1],t,l.map(x=>base+x)])});
  const groupes=[
    G(acc,.1,acc+3.7,410,[['Salut'+N+'!',[.1]],['Moi, c’est Ti Margo.',[1.46,2.0,2.23,2.41]]]),
    G(acc,3.75,acc+7.58,60,[['Un trésor est enterré ici,',[3.8,3.97,4.5,4.59,5.12]],['à −20 mètres'+N+'!',[5.77,5.85,6.29]]]),
    G(acc,7.6,acc+9.3,60,[['J’ai ma pelle.',[7.65,7.88,8.05]]]),
    G(acc,9.33,sit-.05,60,[['Tu paries que tu ne devines pas ce qu’il y a dans le coffre'+N+'?',[9.36,9.53,9.91,10.09,10.27,10.42,10.84,11.01,11.21,11.46,11.59,11.70,11.85,12.0]]]),
    G(sit,.1,sit+3.2,60,[['Chaque jour,',[.1,.41]],['je creuse de 5 mètres vers le bas'+N+':',[1.05,1.26,1.6,1.75,2.05,2.41,2.64,2.79]]]),
    G(sit,3.22,q-.05,60,[['−5 par jour.',[3.24,3.88,4.1]]]),
    G(cre,.1,cre+2.45,60,[['Jour 1'+N+':',[.1,.41]],['−5.',[.76]]]),
    G(cre,2.47,cre+4.82,60,[['Jour 2'+N+':',[2.49,2.82]],['−10.',[3.26]]]),
    G(cre,4.84,cre+7.37,60,[['Jour 3'+N+':',[4.85,5.18]],['−15.',[5.73]]]),
    G(cre,7.39,cre+9.8,60,[['Jour 4'+N+':',[7.4,7.73]],['−20.',[8.38]]]),
    G(cre,9.82,cof-.05,60,[['−20 divisé par −5,',[9.84,10.37,10.9,11.12]],['ça fait 4.',[12.09,12.31,12.55]]]),
    G(cof,.1,cof+1.7,60,[['Le coffre'+N+'!',[.1,.33]]]),
    G(cof,1.72,cof+3.28,60,[['Je l’ouvre…',[1.73,1.95]]]),
    G(cof,3.3,cof+4.88,60,[['Un papier'+N+'?',[3.31,3.48]]]),
    G(cof,4.9,cof+7.76,60,[['Il est écrit'+N+':',[4.91,5.09,5.18]],['tu dois 12 euros.',[5.87,6.08,6.29,6.56]]]),
    G(cof,7.78,cop-.05,60,[['−12'+N+'!',[7.79]]]),
    G(cop,.1,cop+3.0,60,[['Heureusement, mes 2 copains sont là.',[.1,.91,1.09,1.26,1.69,1.91]]]),
    G(cop,3.02,cop+7.45,60,[['On est 3'+N+':',[3.04,3.18,3.34]],['−12 divisé par 3,',[3.89,4.44,4.97,5.23]],['−4.',[5.78]]]),
    G(cop,7.46,cop+9.72,60,[['Chacun doit 4 euros.',[7.48,7.98,8.21,8.52]]]),
    G(cop,9.74,c-.05,60,[['Eh, revenez'+N+'!',[9.76,10.11]]]),
    G(c,.1,f-.05,60,[['À toi'+N+':',[.1,.21]],['un autre trésor, à −36 mètres.',[.7,.85,1.16,1.99,2.08,2.88]],['Je creuse 4 mètres par jour.',[4.23,4.46,4.78,5.13,5.49,5.74]],['Combien de jours'+N+'?',[7.11,7.67,7.82]],['Réponds en commentaire'+N+'!',[9.18,9.63,9.75]]],56)
  ];

  /* ---- La formule du panneau ---- */
  const NEG=s=>`<span class="neg">${s}</span>`, POS=s=>`<span class="pos">${s}</span>`, OK=s=>`<span class="ok">${s}</span>`;
  const FORMULES=[
    [sit,[[sit+3.24,NEG('−')],[sit+3.56,NEG('5')+' '],[sit+3.88,'par '],[sit+4.1,'jour']]],
    [cre,[]],
    [cre+.76,[[cre+.76,NEG('−')],[cre+1.09,NEG('5')]]],
    [cre+3.26,[[cre+3.26,NEG('−')],[cre+3.59,NEG('10')]]],
    [cre+5.73,[[cre+5.73,NEG('−')],[cre+6.04,NEG('15')]]],
    [cre+8.38,[[cre+8.38,NEG('−')],[cre+8.69,NEG('20')]]],
    [cre+9.82,[[cre+9.84,NEG('(−')],[cre+10.18,NEG('20)')+' '],[cre+10.9,'÷ '],[cre+11.12,NEG('(−')],[cre+11.39,NEG('5)')+' '],[cre+12.09,'= '],[cre+12.55,OK('4')]]],
    [cof,[]],
    [cof+7.78,[[cof+7.79,NEG('−')],[cof+8.12,NEG('12')]]],
    [cop+3.02,[[cop+3.89,NEG('(−')],[cop+4.2,NEG('12)')+' '],[cop+4.97,'÷ '],[cop+5.23,POS('3')+' '],[cop+5.6,'= '],[cop+5.78,OK('−')],[cop+6.09,OK('4')]]],
    /* Les données seulement : l'opération, c'est à l'élève de la trouver */
    [c,[[c+4.78,'4 m par jour, '],[c+7.11,'? jours']]]
  ];

  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #ligneP{display:flex;align-items:center;justify-content:center;gap:20px;}
    #ecranJ{flex:none;width:210px;background:#10202b;border-radius:26px;border:6px solid #39424e;color:#74c0fc;text-align:center;padding:2px 0 8px;}
    #ecranJ small{display:block;font-size:30px;letter-spacing:3px;color:#cfd8dc;line-height:1.25;}
    #valJ{display:block;font-size:92px;line-height:1;font-variant-numeric:tabular-nums;min-height:92px;}
    #formule{flex:1;margin-top:0!important;font-size:74px!important;min-height:0!important;}`;
  document.head.append(css);
  panneau.innerHTML=`<div id="ligneP"><div id="ecranJ"><small id="nomJ">JOUR</small><span id="valJ"></span></div><div id="formule"></div></div>`;

  /* ---- Le décor : 5 m de creusés valent U ; la paroi va de 0 à −20 ---- */
  const U=2.4, F=-4*U, XP=1.5, ZF=1.2, ZB=-1.2;
  const bm=c=>new THREE.MeshBasicMaterial({color:c});
  const boite=(w,h,d,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const cyl=(rh,rb,h,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(rh,rb,h,24),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const boule=(R,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(R,20,14),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const plaque=(txt,{w=1.2,h=.85,fond='#fffdf5',coul='#17452a',bord='#17452a',fs=.66,sansBord=false}={},x=0,y=0,z=0,p=scene3d)=>{
    const K=256, cv=document.createElement('canvas'); cv.width=Math.round(w*K); cv.height=Math.round(h*K); const g=cv.getContext('2d');
    if(!sansBord){ g.beginPath(); g.roundRect(8,8,cv.width-16,cv.height-16,cv.height*.16); g.fillStyle=fond; g.fill(); g.lineWidth=16; g.strokeStyle=bord; g.stroke(); }
    g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.font=`800 ${cv.height*fs}px "Segoe UI"`; g.fillText(txt,cv.width/2,cv.height*.54);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tx,transparent:true})); m.position.set(x,y,z); p.add(m); return m; };
  const signe=n=>n<0?'−'+Math.abs(n):String(n), teinte=n=>n<0?'#d9480f':(n>0?'#1971c2':'#17452a');

  /* Les couches du sol : [haut, bas, couleur de face, couleur de la paroi du fond] */
  const COUCHES=[[0,-.9,0xf6d58a,0xcfa862],[-.9,-3.2,0xdfae62,0xa97f42],[-3.2,-6,0xb17f47,0x7f5730],[-6,-8.6,0x85593a,0x5c3c27],[-8.6,-26,0x5e3e2c,0x3e281c]];
  for(const [h,b,k,kf] of COUCHES){ const e=h-b, y=(h+b)/2;
    for(const s of [-1,1]) boite(60,e,ZF-ZB,k,s*(XP+30),y,(ZF+ZB)/2);
    boite(200,e,1,kf,0,y,ZB-.5);
    /* Les bords du puits, un ton plus sombre */
    for(const s of [-1,1]) boite(.04,e-.03*(h===0?1:0),ZF-ZB,kf,s*XP,y-.015*(h===0?1:0),(ZF+ZB)/2);
  }
  /* Ce qui reste à creuser : une tranche par couche, dont le haut suit la profondeur */
  const BOUCHON=COUCHES.map(([h,b,k])=>({h,b,m:boite(2*XP,1,ZF-ZB,k,0,0,(ZF+ZB)/2)}));
  const poserBouchon=prof=>{ for(const o of BOUCHON){ const t=Math.min(o.h,-prof); o.m.visible=t>o.b; if(o.m.visible){ o.m.scale.y=t-o.b; o.m.position.y=(t+o.b)/2; } } };
  /* L'échelle de corde, contre la paroi du fond : le bouchon la cache tant qu'on n'a pas creusé */
  for(const x of [.86,1.26]) boite(.04,-F,.04,0xe9d8a6,x,F/2,ZB+.06);
  for(let y=-.3;y>F;y-=.42) boite(.44,.05,.05,0xc99a5b,1.06,y,ZB+.08);

  /* La plage, la mer, le ciel */
  boite(400,.2,12,0xf9dfa0,0,-.1,ZB-6);
  const BORD=boite(400,.03,1.4,0xe3bb72,0,.005,ZB-11.4);
  const MER=boite(4000,2.6,2000,0x1aa7d8,0,-.85,ZB-12.2-1000);
  const ecume=boite(400,.05,.4,0xffffff,0,.48,ZB-12.05);
  /* De petites vagues au large */
  const VAGUES=[]; for(let i=0;i<14;i++){ const v=boite(1.6+(i%3)*.5,.05,.08,0xffffff,0,.49,ZB-14-i*1.4); VAGUES.push({v,x0:-11+i*3.7,vit:.28+(i%4)*.06}); }
  const NUAGES=[[-12,9.5],[5,11],[-4,7.2],[13,7.8]].map(([x,y])=>{ const g=new THREE.Group(); g.position.set(x,y,-10); scene3d.add(g); for(const [a,b,R] of [[0,0,1],[1,.1,.75],[-1,.05,.7]]) boule(R,0xffffff,a,b,0,g); return {g,x0:x}; });
  /* Le soleil, avec ses rayons, et la lune */
  const SOLEIL=new THREE.Group(); scene3d.add(SOLEIL); boule(1,0xffd43b,0,0,0,SOLEIL);
  for(let i=0;i<10;i++){ const a=i/10*Math.PI*2, t=boite(.16,.5,.05,0xffc107,Math.cos(a)*1.35,Math.sin(a)*1.35,0,SOLEIL); t.rotation.z=a-Math.PI/2; }
  const LUNE=new THREE.Group(); scene3d.add(LUNE); boule(.9,0xf1f3f5,0,0,0,LUNE); for(const [x,y,R] of [[-.28,.18,.2],[.3,-.2,.15],[.1,.42,.1]]) boule(R,0xced4da,x,y,.8,LUNE);
  const ETOILES=new THREE.Group(); ETOILES.position.z=-15; scene3d.add(ETOILES);
  for(const [x,y] of [[-9,2.6],[-6,1.5],[-3,2.9],[0,1.6],[3,2.7],[6,1.4],[9,2.4],[-11,1.5],[11,1.6],[-1,2.4],[5,3],[-7,3.1]]) boule(.1,0xfff9db,x,y,0,ETOILES);
  /* La mouette */
  const MOUETTE=new THREE.Group(); scene3d.add(MOUETTE); boule(.12,0xffffff,0,0,0,MOUETTE);
  const ailesM=[-1,1].map(s=>{ const a=boite(.5,.04,.16,0xf1f3f5,s*.28,0,0,MOUETTE); return a; });

  /* Le palmier : un tronc courbe, des palmes, des noix de coco */
  const PALMES=[];
  const palmier=(x,z,k)=>{ const g=new THREE.Group(); g.position.set(x,0,z); g.scale.setScalar(k); scene3d.add(g);
    let px=0,py=0; for(let i=0;i<9;i++){ const a=.32-.05*i, s=cyl(.15-.008*i,.17-.008*i,.42,i%2?0xa8743f:0x8b5a2b,px,py+.2,0,g); s.rotation.z=a; px-=Math.sin(a)*.38; py+=Math.cos(a)*.38; }
    const tete=new THREE.Group(); tete.position.set(px,py,0); g.add(tete);
    for(let i=0;i<8;i++){ const pivot=new THREE.Group(); pivot.rotation.y=i/8*Math.PI*2; tete.add(pivot); const b=new THREE.Group(); pivot.add(b); b.rotation.z=-.42-(i%2)*.14;
      const fe=new THREE.Mesh(new THREE.SphereGeometry(1,14,10),bm(i%2?0x37b24d:0x2f9e44)); fe.scale.set(.82,.055,.24); fe.position.x=.8; b.add(fe); PALMES.push({b,base:b.rotation.z,i}); }
    for(const [a,b2] of [[.14,-.12],[-.12,-.14],[.02,-.2]]) boule(.13,0x6b4226,a,b2,.1,tete);
    return g; };
  palmier(-3.5,-.45,1.25); palmier(4.1,-.75,.82);
  /* Le sable de la plage : coquillages, étoile de mer */
  for(const [x,z,k] of [[-2.2,.6,0xffa8a8],[2.6,.7,0xffd8a8],[3.3,.2,0xffffff],[-4.2,.7,0xffc9c9]]){ const m=boule(.09,k,x,.04,z); m.scale.y=.5; }
  for(let i=0;i<5;i++){ const b=boite(.3,.03,.09,0xff6b6b,2.1+Math.cos(i/5*Math.PI*2)*.14,.03,.25+Math.sin(i/5*Math.PI*2)*.14); b.rotation.y=-i/5*Math.PI*2; }
  /* Ce qui dort dans le sol : cailloux, arête de poisson, bouteille, coquille fossile */
  for(const [x,y,R,k] of [[3.9,-1.7,.28,0xc69a5a],[-4.3,-2.3,.34,0xc69a5a],[4.5,-4.4,.42,0x8f6538],[-3.5,-4.9,.3,0x8f6538],[3.2,-7.2,.38,0x6a4730],[-4.5,-7.3,.46,0x6a4730],[-4.3,-9.0,.36,0x46301f],[4.1,-9.2,.44,0x46301f]]){ const m=boule(R,k,x,y,ZF+.02); m.scale.z=.2; }
  { const g=new THREE.Group(); g.position.set(-3.9,-3.65,ZF+.03); g.rotation.z=.2; scene3d.add(g); boite(1.1,.05,.02,0xfff3bf,0,0,0,g); for(let i=0;i<5;i++) boite(.04,.34-i*.04,.02,0xfff3bf,-.32+i*.18,0,0,g); const t=boule(.17,0xfff3bf,-.62,0,0,g); t.scale.z=.2; boule(.04,0x46301f,-.65,.05,.03,g); const q2=new THREE.Mesh(new THREE.ConeGeometry(.16,.28,3),bm(0xfff3bf)); q2.rotation.z=Math.PI/2; q2.position.x=.62; q2.scale.z=.1; g.add(q2); }
  { const g=new THREE.Group(); g.position.set(4.25,-6.15,ZF+.03); g.rotation.z=-.5; scene3d.add(g); const a=cyl(.14,.14,.46,0x74c0fc,0,0,0,g); a.scale.z=.15; const b=cyl(.05,.12,.2,0x74c0fc,0,.32,0,g); b.scale.z=.15; boite(.09,.08,.02,0xb5794a,0,.45,0,g); }
  { const g=new THREE.Group(); g.position.set(-4.1,-5.95,ZF+.03); scene3d.add(g); for(let i=0;i<12;i++){ const a=i*.62, R=.05+i*.024, m=boule(.055+i*.006,0xe9d8a6,Math.cos(a)*R,Math.sin(a)*R,0,g); m.scale.z=.2; } }

  /* Le tas de sable que la pelle fabrique */
  const TAS=boule(1,0xdfae62,-2.3,0,.2); TAS.scale.set(.05,.05,.05);
  const TERRE=Array.from({length:7},()=>boule(.1,0xc99a5b,0,0,.3));

  /* La croix rouge sur le sable (le trésor, puis l'autre trésor) */
  const croix=(x,z)=>{ const g=new THREE.Group(); g.position.set(x,.025,z); scene3d.add(g); for(const a of [.78,-.78]){ const b=boite(1.3,.03,.2,0xe03131,0,0,0,g); b.rotation.y=a; } return g; };
  const X1=croix(0,.2), X2=croix(3.15,.2);
  /* Les pointillés de la croix jusqu'au coffre */
  const POINTS=[]; for(let i=0;i<14;i++) POINTS.push(boite(.1,.34,.02,0xfff3bf,0,-.42-i*.59,ZF+.02));
  const POINTS2=[]; for(let i=0;i<3;i++) POINTS2.push(boite(.1,.28,.02,0xfff3bf,3.15,-.32-i*.52,ZF+.02));
  const P36=plaque('−36',{w:1.35,h:.85,coul:'#d9480f',bord:'#d9480f'},3.15,-2.3,ZF+.08);

  /* La paroi graduée : un trait, une plaque tous les 5 m */
  const TRAIT=new THREE.Group(); scene3d.add(TRAIT); boite(.1,-F+.3,.04,0x17452a,-1.68,F/2,ZF+.04,TRAIT);
  const GRAD={}; for(let i=0;i<=4;i++){ const v=-5*i; boite(.3,.09,.04,0x17452a,-1.82,-i*U,ZF+.04,TRAIT); GRAD[i]=plaque(signe(v),{coul:teinte(v),bord:teinte(v),w:1.22},-2.62,-i*U,ZF+.08); }
  /* Le repère vert, à hauteur du fond du puits */
  const REP=new THREE.Mesh(new THREE.ConeGeometry(.2,.42,18),bm(0x2f9a3a)); REP.rotation.z=Math.PI/2; REP.position.set(-1.42,0,ZF+.05); scene3d.add(REP);

  /* Les flèches −5, à droite : une par jour, elles s'empilent */
  const XF=1.95;
  const FLECHES=[0,1,2,3].map(i=>{ const g=new THREE.Group(); scene3d.add(g);
    const barre=boite(.2,1,.04,0xe8590c,XF,0,ZF+.05,g), pte=new THREE.Mesh(new THREE.ConeGeometry(.28,.42,16),bm(0xe8590c)); pte.position.z=ZF+.05; pte.rotation.z=Math.PI; g.add(pte);
    const pl=plaque('−5',{w:1.05,h:.8,fond:'#fff4e6',coul:'#d9480f',bord:'#d9480f',fs:.68},XF+.98,-(i+.5)*U,ZF+.08,g);
    return {g,barre,pte,pl,i}; });

  /* ---- La pelle ---- */
  const faitPelle=(parent,s=1)=>{ const g=new THREE.Group(); parent.add(g); const bois=toon(0xb5794a), fer=toon(0xaab4bf);
    piece(g,new THREE.CylinderGeometry(.05,.05,2.1,10),bois,[0,-.25,0],CONTOUR_SOMBRE);
    piece(g,new THREE.BoxGeometry(.36,.08,.08),bois,[0,.8,0],CONTOUR_SOMBRE);
    piece(g,new THREE.BoxGeometry(.46,.52,.05),fer,[0,-1.54,0],CONTOUR_SOMBRE);
    g.scale.setScalar(s); return g; };
  const pelleM=faitPelle(mainG.g); pelleM.position.set(0,.02,.11);
  const pelleS=faitPelle(scene3d,.55);

  /* ---- Le coffre ---- */
  const COFFRE=new THREE.Group(); scene3d.add(COFFRE);
  const tBois=toon(0x9c5b28), tOr=toon(0xf5c518), tNoir=toon(0x241407);
  piece(COFFRE,new THREE.BoxGeometry(1.2,.56,.74),tBois,[0,.28,0],CONTOUR_SOMBRE);
  piece(COFFRE,new THREE.BoxGeometry(1.08,.04,.62),tNoir,[0,.565,0],null);
  for(const x of [-.42,.42]) piece(COFFRE,new THREE.BoxGeometry(.12,.58,.78),tOr,[x,.28,0],null);
  const COUV=new THREE.Group(); COUV.position.set(0,.56,-.37); COFFRE.add(COUV);
  piece(COUV,new THREE.BoxGeometry(1.24,.2,.78),tBois,[0,.1,.37],CONTOUR_SOMBRE);
  piece(COUV,new THREE.BoxGeometry(1.08,.13,.56),tBois,[0,.26,.37],CONTOUR_SOMBRE);
  for(const x of [-.42,.42]){ piece(COUV,new THREE.BoxGeometry(.12,.22,.82),tOr,[x,.1,.37],null); piece(COUV,new THREE.BoxGeometry(.12,.15,.6),tOr,[x,.26,.37],null); }
  piece(COFFRE,new THREE.BoxGeometry(.2,.24,.06),tOr,[0,.48,.39],null);
  /* La lumière dorée qui promet tout, avant le papier */
  const LUEUR=new THREE.Mesh(new THREE.CylinderGeometry(1.4,.4,3.4,24,1,true),new THREE.MeshBasicMaterial({color:0xffe066,transparent:true,opacity:.5,side:THREE.DoubleSide,depthWrite:false})); LUEUR.position.y=2.28; COFFRE.add(LUEUR);
  const ETINC=Array.from({length:8},()=>boule(.05,0xfff3bf,0,0,0,COFFRE));

  /* ---- Le papier ---- */
  const PAPIER=new THREE.Group(); scene3d.add(PAPIER);
  plaque('',{w:.95,h:.72,fond:'#fff8dc',bord:'#b08d57'},0,0,0,PAPIER);
  const pTu=plaque('Tu dois',{w:.82,h:.28,sansBord:true,coul:'#17452a',fs:.66},0,.14,.005,PAPIER);
  const pDouze=plaque('12 €',{w:.82,h:.32,sansBord:true,coul:'#d9480f',fs:.9},0,-.16,.005,PAPIER);
  /* « Tu », puis « dois » : on découvre le mot par un cache */
  const pCache=new THREE.Mesh(new THREE.PlaneGeometry(.3,.26),bm(0xfff8dc)); pCache.position.set(.16,.14,.008); PAPIER.add(pCache);
  /* La dette partagée : −12 €, puis trois morceaux, puis −4 € au-dessus de chaque tête */
  const D12=plaque('−12 €',{w:1.9,h:.74,fond:'#fff8dc',coul:'#d9480f',bord:'#d9480f',fs:.62},0,F+2.85,1.3);
  const MORC=[0,1,2].map(()=>plaque('',{w:.76,h:.56,fond:'#fff8dc',bord:'#d9480f'},0,0,1.3));
  const TAGS=[0,1,2].map(()=>plaque('−4 €',{w:1.0,h:.54,fond:'#fff4e6',coul:'#d9480f',bord:'#d9480f',fs:.54},0,0,1.3));
  const LIENS=[0,1,2].map(()=>boite(.035,1,.02,0xd9480f,0,0,1.28));
  const UN23=['1','2','3'].map(t=>plaque(t,{w:.5,h:.5,fond:'#e7f5ff',coul:'#1971c2',bord:'#1971c2',fs:.76},0,0,1.3));
  /* Les Z du sommeil */
  const ZZ=[0,1,2].map(i=>plaque('z',{w:.5,h:.5,sansBord:true,coul:'#ffffff',fs:.9-i*.1},0,0,1.02));

  /* ---- Les copains : un crabe et un perroquet ---- */
  const COUTOUR=CONTOUR_SOMBRE;
  const CRABE=new THREE.Group(); scene3d.add(CRABE);
  const rouge=toon(0xf0532d), rougeF=toon(0xc9391b), blancT=toon(0xffffff), noirT=toon(0x0a0f14);
  const crabeCorps=new THREE.Group(); CRABE.add(crabeCorps);
  piece(crabeCorps,ell(.44,.28,.32),rouge,[0,.46,0],COUTOUR);
  const JAMBES=[]; for(const s of [-1,1]) for(let i=0;i<3;i++){ const pv=new THREE.Group(); pv.position.set(s*.32,.36,.14-i*.14); CRABE.add(pv); const g=new THREE.CapsuleGeometry(.038,.3,4,8); g.translate(0,-.17,0); piece(pv,g,rougeF,null,COUTOUR); pv.rotation.z=s*.9; JAMBES.push({pv,s,i}); }
  for(const s of [-1,1]){ const t=new THREE.Mesh(new THREE.CylinderGeometry(.03,.03,.22,8),rougeF); t.position.set(s*.13,.8,.14); crabeCorps.add(t); piece(crabeCorps,ell(.1,.1,.1,16),blancT,[s*.13,.94,.16],COUTOUR); piece(crabeCorps,ell(.05,.05,.04,12),noirT,[s*.13,.94,.25],null); }
  const PINCES=[-1,1].map(s=>{ const pv=new THREE.Group(); pv.position.set(s*.44,.54,.12); crabeCorps.add(pv); const bras=new THREE.CapsuleGeometry(.05,.16,4,8); bras.rotateZ(s*-.9); bras.translate(s*.1,.08,0); piece(pv,bras,rougeF,null,COUTOUR); piece(pv,ell(.17,.14,.09,16),rouge,[s*.24,.22,0],COUTOUR); const fente=new THREE.Mesh(new THREE.BoxGeometry(.2,.03,.1),rougeF); fente.position.set(s*.28,.25,.05); pv.add(fente); return pv; });
  { const b=new THREE.Mesh(new THREE.TorusGeometry(.1,.016,8,14,Math.PI),noirT); b.rotation.z=Math.PI; b.position.set(0,.47,.31); crabeCorps.add(b); }

  const PERRO=new THREE.Group(); scene3d.add(PERRO);
  const bleuP=toon(0x1c7ed6), jauneP=toon(0xffd43b), rougeP=toon(0xe03131), orangeP=toon(0xf5a50a);
  piece(PERRO,ell(.25,.38,.22),bleuP,[0,.56,0],COUTOUR);
  piece(PERRO,ell(.17,.26,.1,16),jauneP,[0,.52,.16],null);
  piece(PERRO,ell(.21,.21,.2),rougeP,[0,1.05,.02],COUTOUR);
  { const g=new THREE.ConeGeometry(.09,.24,12); g.rotateX(Math.PI/2); g.translate(0,0,.12); piece(PERRO,g,orangeP,[0,1.0,.19],COUTOUR); }
  for(const s of [-1,1]){ piece(PERRO,ell(.075,.075,.05,14),blancT,[s*.1,1.11,.17],COUTOUR); piece(PERRO,ell(.036,.036,.03,10),noirT,[s*.1,1.11,.21],null); }
  { const g=new THREE.CapsuleGeometry(.07,.46,4,10); g.translate(0,-.26,0); const q2=piece(PERRO,g,rougeP,[0,.34,-.14],COUTOUR); q2.rotation.x=.5; }
  const AILES=[-1,1].map(s=>{ const pv=new THREE.Group(); pv.position.set(s*.22,.76,0); PERRO.add(pv); const g=ell(.1,.32,.17,16); g.translate(0,-.28,0); piece(pv,g,jauneP,null,COUTOUR); return {pv,s}; });
  for(const s of [-1,1]) boite(.05,.14,.05,0xf5a50a,s*.09,.08,0,PERRO);

  /* Le radeau des fuyards, au large */
  const RADEAU=new THREE.Group(); scene3d.add(RADEAU);
  for(let i=0;i<5;i++){ const t=cyl(.12,.12,2.6,i%2?0xb5794a:0x8b5a2b,-.48+i*.24,0,0,RADEAU); t.rotation.x=Math.PI/2; }
  const voile=new THREE.Mesh(new THREE.ConeGeometry(.9,1.8,3),bm(0xffffff)); voile.position.set(.1,1.5,-.6); voile.scale.z=.05; RADEAU.add(voile); boite(.07,2.2,.07,0x8b5a2b,.1,1.1,-.6,RADEAU);

  /* ---- Le temps : les jours, le creusage ---- */
  const JOURS=[.1,2.49,4.85,7.4,9.84].map(x=>cre+x);
  const DIG=[[cre+.1,cre+1.09,0,1],[cre+2.49,cre+3.59,1,2],[cre+4.85,cre+6.04,2,3],[cre+7.4,cre+8.69,3,4]];
  const creu=T=>{ let n=0; for(const [a,b,de,ar] of DIG){ if(T>=b) n=ar; else if(T>=a) n=de+(ar-de)*(T-a)/(b-a); } return n; };
  const enCreusant=T=>DIG.some(([a,b])=>T>=a&&T<b);
  /* Les nuits, entre deux jours (3 nuits pour 4 jours) */
  const uJour=T=>{ for(let i=0;i<4;i++) if(T>=JOURS[i]&&T<JOURS[i+1]) return [i,(T-JOURS[i])/(JOURS[i+1]-JOURS[i])]; return null; };
  const nuit=T=>{ const j=uJour(T); if(!j||j[0]===3) return 0; const u=j[1]; return lisse((u-.5)/.07)*lisse((.97-u)/.07); };
  const soir=T=>T>=c?lisse((T-c)/2):0;
  const coul=(a,b,k)=>new THREE.Color(a).lerp(new THREE.Color(b),k);
  const hex=c=>'#'+c.getHexString();
  const JOUR_H=0x3fb1ef, JOUR_B=0xc4efff, NUIT_H=0x0e1640, NUIT_B=0x2c3b7c, SOIR_H=0xff8a4c, SOIR_B=0xffe2a1;
  const ciel=T=>{ const n=nuit(T), s=soir(T);
    const h=coul(coul(JOUR_H,SOIR_H,s),NUIT_H,n), b=coul(coul(JOUR_B,SOIR_B,s),NUIT_B,n);
    document.body.style.background=`linear-gradient(${hex(h)} 0%,${hex(b)} 46%,${hex(b)} 100%)`;
    MER.material.color.copy(coul(coul(0x1aa7d8,0x3f7fb5,s),0x163e74,n)); };

  /* Les sons : un coup de pelle au bout de chaque jour, le rebours, la mauvaise nouvelle */
  const TICS=[]; [1.09,3.59,6.04,8.69].forEach((t,i)=>TICS.push({t:cre+t,f:520+i*90}));
  for(let i=0;i<3;i++) TICS.push({t:q+11.2+i,f:760});
  for(const [t,fq] of [[8.62,392],[8.8,330],[8.98,262]]) TICS.push({t:cof+t,f:fq});

  poserMiniature(arguments[0],cof-.4,'Dans le coffre,<br>il y a quoi ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  const film={ clips,FIN,tics:TICS,titre:'Le trésor à −20 m',ceinture:2,finTitre:acc+3.7,
    cuts:[acc+3.75,acc+7.6,acc+9.33,sit,q,cre,cre+9.82,cof,cof+1.72,cof+4.9,cof+7.78,cop,cop+3.02,c,f],groupes,finClip:'06-abonne',
    question:{ qc:'01q-question',rc:'01r-reponse',finR:cre,cpt:q+11.2,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+3.23,'En combien de jours j’atteins le trésor'+N+'?',[1.63,1.79,2.29,2.44,2.69,3.09,3.23].map(x=>q+x)]],
      pause:[[q+9.54,q+10.49,'Mets pause, et choisis'+N+'!',[9.54,9.75,10.38,10.49].map(x=>q+x)]],
      choix:[['<span class="neg">−4</span>',4.8,5.15],['<span class="pos">4</span>',6.86,7.31],['<span class="pos">15</span>',7.65,8.18]],
      tete:[[r+.1,'Réponse '],[r+.62,'B'+N+':']],
      reponse:[[r+1.05,r+1.4,'4 jours'+N+'!',[1.05,1.4].map(x=>r+x)]],
      suite:[[r+2.77,r+4.28,'Un nombre de jours, c’est positif.',[2.77,2.91,3.28,3.43,4.06,4.28].map(x=>r+x)]] },

    jouer(P,T,cam){
      const vise=(x,yW,Y,d,e=.05)=>{ cam.x=x; cam.y=yW+(Y-960)/(2637/d); cam.d=d; cam.e=e; };
      scene.taille=.55; scene.z=.2;
      pelleM.rotation.set(0,0,0); pelleM.visible=false;

      /* ---- Le monde ---- */
      ciel(T);
      const n=creu(T), prof=n*U;
      /* Le puits reste ouvert à la fin */
      poserBouchon(prof);
      for(let i=0;i<=4;i++){ const z=1+.3*lisse(1-Math.abs(n-i)*1.6); GRAD[i].scale.set(z,z,1); }
      REP.position.y=-prof; REP.visible=(T>=sit+3.24&&T<q)||(T>=cre&&T<cof);
      const planCoupe=(T>=acc+3.75&&T<acc+7.6)||(T>=sit+3.05&&T<q)||(T>=cre&&T<cof)||(T>=cop+10.85&&T<c);
      TRAIT.visible=planCoupe;
      GRAD[0].visible=planCoupe; GRAD[4].visible=planCoupe&&T>=acc+5.85;
      GRAD[1].visible=planCoupe&&T>=sit+3.56; GRAD[2].visible=planCoupe&&T>=sit+3.76; GRAD[3].visible=planCoupe&&T>=sit+3.96;
      X1.visible=T<cre+.1; X2.visible=T>=c;
      POINTS.forEach((m,i)=>{ m.visible=T>=acc+3.97+i*.13&&(T<acc+7.6||(T>=sit&&T<q)); });
      POINTS2.forEach((m,i)=>{ m.visible=T>=c+1.16+i*.16&&T<f; });
      P36.visible=T>=c+2.08&&T<f; { const z=1+.25*Math.exp(-Math.max(0,T-c-2.08)*5); P36.scale.set(z,z,1); }

      /* Le soleil, la lune, les étoiles */
      const j=uJour(T); let sx=-5.5, sy=8.2, lx=0, ly=-20;
      if(j){ const [i,u]=j;
        const us=i<3?Math.min(1,u/.55):u*.5; sx=-14+28*us; sy=-1+3.1*Math.sin(us*Math.PI);
        if(i<3&&u>=.5){ const ul=(u-.5)/.5; lx=-14+28*ul; ly=-1+3.1*Math.sin(ul*Math.PI); } }
      else if(T>=JOURS[4]&&T<c){ sx=0; sy=2.1; }
      if(T>=c){ const v=lisse((T-c)/4); sx=2-3*v; sy=9-4.5*v; }
      SOLEIL.position.set(sx,sy,-17); SOLEIL.rotation.z=T*.25; LUNE.position.set(lx,ly,-17);
      const nn=nuit(T); ETOILES.visible=nn>.25; ETOILES.scale.setScalar(.9+.1*nn);
      /* La mer, les nuages, la mouette, les palmes */
      ecume.position.z=ZB-12.05+Math.sin(T*1.1)*.18; BORD.material.color.set(nn>.5?0x8a7a55:0xe3bb72);
      for(const o of VAGUES){ const L=44; o.v.position.x=((o.x0+22+T*o.vit)%L+L)%L-22; o.v.scale.x=1+.2*Math.sin(T*1.7+o.x0); }
      NUAGES.forEach((o,i)=>{ const L=56; o.g.position.x=((o.x0+28+T*.42*(1+i*.2))%L+L)%L-28; });
      { const L=34, t=(T*1.25)%L; MOUETTE.position.set(-17+t,5.2+Math.sin(T*.8)*.7,-4); MOUETTE.rotation.y=.25; const a=Math.sin(T*9)*.45; ailesM[0].rotation.z=-a; ailesM[1].rotation.z=a; }
      for(const o of PALMES) o.b.rotation.z=o.base+Math.sin(T*1.5+o.i)*.05;

      /* Le tas et les pelletées */
      { const k=.05+.92*Math.min(1,n/4)+(T<DIG[0][0]?0:.06); TAS.scale.set(k*1.05,k*.62,k*.9); TAS.position.y=0; }
      { const voir=enCreusant(T)||(T>=c+4.46&&T<c+6.5);
        const x0=T>=c?3.15:scene.x, y0=T>=c?.3:-prof+.35, xA=T>=c?4.4:-2.3, yA=.5;
        TERRE.forEach((m,i)=>{ m.visible=voir; if(!voir) return; const ph=((T*1.05+i/TERRE.length)%1), hA=1.6;
          if(T>=c){ m.position.set(x0+(xA-x0)*ph,y0+1.5*Math.sin(ph*Math.PI),.3); return; }
          const yMax=hA; if(ph<.68){ const u=ph/.68; m.position.set(.1+.1*Math.sin(u*9+i),y0+(yMax-y0)*(1-(1-u)*(1-u)),.25); }
          else { const u=(ph-.68)/.32; m.position.set(.1+(xA-.1)*u,yMax+(yA-yMax)*u*u+.3*Math.sin(u*Math.PI),.25); } }); }

      /* Les flèches −5 */
      for(const o of FLECHES){ const dbt=[cre+.76,cre+3.26,cre+5.73,cre+8.38][o.i];
        const demo=o.i===0&&T>=sit+3.24&&T<q;
        const voir=demo||(T>=dbt&&T<cof); o.g.visible=voir; if(!voir) continue;
        const prog=demo?lisse((T-sit-3.24)/.6):Math.min(1,Math.max(0,n-o.i));
        /* Pendant « ça fait 4 », on compte les flèches une à une */
        const yH=-o.i*U-.06, yB=yH-Math.max(.02,prog*(U-.5));
        o.barre.position.y=(yH+yB)/2; o.barre.scale.y=yH-yB; o.pte.position.set(XF,yB-.14,ZF+.05); o.pte.visible=prog>.02;
        o.pl.visible=T>=dbt+.33||demo&&T>=sit+3.56;
        const tc=cre+12.09+o.i*.15; const zz=(T>=tc&&T<tc+.5)?1+.3*Math.sin((T-tc)/.5*Math.PI):1; o.pl.scale.set(zz,zz,1); }

      /* Le coffre : devant la coupe tant qu'il est enterré, dans le puits ensuite */
      const COFX=.72, arrive=lisse((T-DIG[3][1])/.25);
      COFFRE.position.set(COFX,F,1.62+(.08-1.62)*arrive);
      const ouv=T<cof+1.95?0:lisse((T-cof-1.95)/.7);
      COUV.rotation.x=-ouv*1.95;
      const lueur=T>=cof+2.0&&T<cof+3.45?lisse((T-cof-2.0)/.5)*lisse((cof+3.45-T)/.15):0;
      LUEUR.visible=lueur>.01; LUEUR.material.opacity=.55*lueur;
      ETINC.forEach((m,i)=>{ m.visible=lueur>.05; if(!m.visible) return; const ph=(T*.9+i/8)%1, a=i*2.4; m.position.set(Math.cos(a)*(.15+.4*ph),.6+ph*1.9,.1+Math.sin(a)*.2); m.scale.setScalar(1-ph*.6); });

      /* La pelle posée */
      pelleS.visible=true; pelleS.rotation.set(0,0,0);
      if(T<acc+7.6){ pelleS.position.set(-1.05,.98,.45); pelleS.rotation.z=-.1; }
      else if(T>=cof&&T<c&&!(T>=cof+4.9&&T<cof+7.78)){ pelleS.position.set(-1.28,F+1.0,-.75); pelleS.rotation.z=-.12; }
      else pelleS.visible=false;

      /* ---- Le papier ---- */
      const dansPapier=T>=cof+3.31&&T<cop+3.02;
      PAPIER.visible=dansPapier&&!(T<cof+3.4);
      pTu.visible=T>=cof+5.87; pCache.visible=T<cof+6.08; pDouze.visible=T>=cof+6.29;
      PAPIER.rotation.set(0,0,0); PAPIER.scale.setScalar(1);

      /* ---- Les copains ---- */
      const XM=-.72, XC=.1, ZC=.72;
      const t2=T-cop;
      const voirC=(T>=cop+.75&&T<cop+11.8)||T>=c;
      CRABE.visible=PERRO.visible=voirC; RADEAU.visible=T>=c;
      CRABE.rotation.set(0,0,0); CRABE.scale.setScalar(1); PERRO.rotation.set(0,0,0); PERRO.scale.setScalar(1);
      crabeCorps.scale.set(1,1,1);
      let hautC=0, pasC=.0, vol=0;
      if(T>=c){ /* Ils sont déjà loin, sur leur radeau */
        const u=(T-c)/(FIN-c); RADEAU.position.set(-9+13*u,.62+Math.sin(T*1.8)*.05,-22); RADEAU.rotation.z=Math.sin(T*1.3)*.04;
        CRABE.position.set(RADEAU.position.x-.45,RADEAU.position.y+.08,-22); CRABE.scale.setScalar(1.3); CRABE.rotation.z=RADEAU.rotation.z;
        PERRO.position.set(RADEAU.position.x+.75,RADEAU.position.y+.1,-22); PERRO.scale.setScalar(1.3); pasC=.5; vol=.25; }
      else if(voirC){
        /* Le crabe tombe du ciel, rebondit, attend, puis grimpe la paroi */
        if(t2<1.35){ const u=(t2-.75)/.6; CRABE.position.set(XC,F+12*(1-u*u),ZC); CRABE.rotation.z=(1-u)*3; }
        else if(t2<9.0){ CRABE.position.set(XC,F,ZC); const e=Math.exp(-(t2-1.35)*6); crabeCorps.scale.set(1+.35*e,1-.35*e,1+.35*e); hautC=0;
          if(t2>=3.18&&t2<3.6) CRABE.position.y=F+Math.sin((t2-3.18)/.42*Math.PI)*.42; pasC=.12; }
        else if(t2<9.4){ const u=(t2-9)/.4; CRABE.position.set(XC+(1.2-XC)*u,F,ZC); pasC=1; }
        else { const u=(t2-9.4)/2.0; CRABE.position.set(1.2,F+u*(-F+3),ZC); CRABE.rotation.z=Math.PI/2; pasC=1; }
        /* Le perroquet descend en spirale, se pose sur le coffre, puis file vers le ciel */
        if(t2<1.75){ const u=Math.min(1,Math.max(0,(t2-1.0)/.75)), l=lisse(u); PERRO.position.set(COFX+(1-l)*(-1.4*Math.cos(u*7)),F+.62+(1-l)*10,.15); vol=1; }
        else if(t2<9.15){ PERRO.position.set(COFX,F+.62,.15); if(t2>=3.34&&t2<3.76) PERRO.position.y+=Math.sin((t2-3.34)/.42*Math.PI)*.42; vol=(t2<2.05||(t2>=3.34&&t2<3.76))?.6:0; }
        else { const u=(t2-9.15)/1.9; PERRO.position.set(COFX+(-.7-COFX)*lisse(u*2)+Math.sin(u*9)*.25,F+.62+u*u*(-F+5),.15); vol=1; PERRO.rotation.y=.4; }
      }
      /* Le crabe : pattes qui courent, pinces qui claquent */
      for(const o of JAMBES){ o.pv.rotation.z=o.s*(.9+Math.sin(T*(pasC>.6?34:6)+o.i*2+(o.s>0?1.5:0))*(.08+.34*pasC)); }
      PINCES.forEach((pv,i)=>{ pv.rotation.z=(i?1:-1)*(.08+Math.sin(T*(pasC>.6?20:3.5)+i)*(pasC>.6?.5:.12)); });
      for(const o of AILES){ const a=vol>.1?Math.sin(T*26)*.95*vol+.9*vol:.0; o.pv.rotation.z=o.s*(.12+a); }

      /* 1, 2, 3 au-dessus des têtes, puis la dette partagée */
      const POS=[[XM,F+2.55],[XC,F+1.62],[COFX,F+2.38]], RANG=[[-1.0,F+2.62],[.05,F+2.62],[1.1,F+2.62]];
      UN23.forEach((m,i)=>{ const dt=[3.04,3.18,3.34][i]; m.visible=t2>=dt&&t2<3.89&&T<c; m.position.set(POS[i][0],POS[i][1],1.3); const z=1+.4*Math.exp(-Math.max(0,t2-dt)*7); m.scale.set(z,z,1); });
      D12.visible=t2>=3.89&&t2<5.23&&T<c; { const z=1+.2*Math.exp(-Math.max(0,t2-3.89)*6); D12.scale.set(z,z,1); }
      const FUITE=[[XM-.46,F+2.5],[XM+.6,F+2.5],[XM+.07,F+3.1]];
      const LANCE=[F+2.0,F+1.08,F+1.92];
      LIENS.forEach((m,i)=>{ const voir=t2>=5.78&&t2<9.1&&T<c; m.visible=voir; if(!voir) return; const xB=[XM,XC,COFX][i], xH=RANG[i][0], yH=RANG[i][1]-.26, yB=LANCE[i]; m.position.set((xB+xH)/2,(yH+yB)/2,1.28); m.scale.y=Math.hypot(yH-yB,xH-xB); m.rotation.z=Math.atan2(xB-xH,yH-yB); });
      MORC.forEach((m,i)=>{ const voir=t2>=5.23&&t2<5.78&&T<c; m.visible=voir; if(!voir) return; const u=lisse((t2-5.23)/.5); m.position.set(((i-1)*.5)+(RANG[i][0]-(i-1)*.5)*u,F+2.85+(RANG[i][1]-F-2.85)*u,1.3); m.rotation.z=(i-1)*.5*(1-u)+Math.sin(u*9)*.12*(1-u); });
      TAGS.forEach((m,i)=>{ const voir=t2>=5.78&&T<c; m.visible=voir; if(!voir) return;
        /* Les copains partent : leur dette retombe sur Ti Margo */
        const u=lisse((t2-9.1-[0,.1,.35][i])/.55);
        m.position.set(RANG[i][0]+(FUITE[i][0]-RANG[i][0])*u,RANG[i][1]+(FUITE[i][1]-RANG[i][1])*u+Math.sin(u*Math.PI)*.35,1.3);
        const tp=[7.48,7.98,8.21][i], pulse=(t2>=tp&&t2<tp+.45)?1+.16*Math.sin((t2-tp)/.45*Math.PI):1;
        const nait=1+.3*Math.exp(-Math.max(0,t2-5.78)*6); m.scale.set(pulse*nait,pulse*nait,1); });

      /* ---- Les gestes ---- */
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const montreBas=()=>{ P.gesteD='index'; P.md.set(.86,1.15+Math.sin(T*4)*.05,.55); P.cd.set(.82,1.55,.2); P.tetX=.12; P.regX=.2; P.tetY=.1; };
      const montreHaut=()=>{ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.08; P.regY=.3; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const tient=()=>{ pelleM.visible=true; P.mg.set(-.92,1.95+Math.sin(T*2.1)*.02,.38); P.cg.set(-.86,1.5,.12); };
      const marche=(sensPied,rot)=>{ scene.ry=rot; const j=P.jaw; marcher(T*.766*sensPied,P); P.jaw=j; };
      /* Un coup de pelle : le buste plonge, la pelle s'enfonce devant lui, puis jette */
      const creuse=()=>{ pelleM.visible=true; const a=Math.sin(T*2.2*2*Math.PI), b=(a+1)/2;
        scene.ry=.78; P.gesteD='poing'; P.hanche=1.14-.1*(1-b); P.tx=.2+.2*(1-b); P.tetX=-.16-.14*(1-b);
        P.mg.set(-.26,1.58+.42*b,.78); P.cg.set(-.72,1.42,.24); P.md.set(.1,.98+.42*b,.86); P.cd.set(.62,1.12,.34);
        pelleM.rotation.x=-.62-.28*b; P.qSway=a*.3; };
      const dort=()=>{ tient(); scene.ry=-.1; P.paupiere=1.55; P.tetX=.22; P.tetZ=.18+Math.sin(T*2)*.02; P.jaw=.08; P.gesteD='ouverte'; P.md.set(.7,1.5,.4); P.cd.set(.74,1.3,.1); P.qEnroule=1; };
      const fond=(x=XM)=>{ scene.x=x; scene.y=F; scene.ySol=F; };
      const ausol=(x=0,y=0)=>{ scene.x=x; scene.y=y; scene.ySol=y; };
      ZZ.forEach(m=>{ m.visible=false; });

      /* ---- Les plans ---- */
      if(T<acc+3.75){ /* Le salut, sur la croix */
        ausol(0); vise(.1,0,1720,6.6);
        if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; } else ouvre();
      }
      else if(T<acc+7.6){ /* La coupe apparaît : le coffre, tout au fond */
        ausol(0); const u=lisse((T-acc-3.75)/1.4); vise(0,0,1100+(480-1100)*u,12+(27-12)*u,.08+.12*u);
        scene.ry=.12; montreBas(); const v=T-acc-5.77; if(v>=0&&v<.5){ P.sautY=Math.sin(v/.5*Math.PI)*.34; P.paupiere=-1.25; }
      }
      else if(T<acc+9.33){ /* La pelle, brandie */
        ausol(0); tient(); const u=T-acc-7.6; vise(.05,0,1700,6.9-.25*lisse(u/1.6));
        scene.ry=.08; const lev=lisse((u-.22)/.32); P.mg.set(-.82,1.95+1.1*lev,.42); P.cg.set(-.88,1.5+.7*lev,.12); pelleM.rotation.z=.45*lev; P.paupiere=-1.25; ouvre();
        const v=u-.45; if(v>=0&&v<.5){ P.sautY=Math.sin(v/.5*Math.PI)*.3; }
      }
      else if(T<sit){ /* Le pari : la caméra s'approche */
        ausol(0); tient(); const u=(T-acc-9.33)/(sit-acc-9.33); vise(.05,0,1680,10.5-3.3*lisse(u));
        scene.ry=-.14+Math.sin(T*2)*.05; pouce(); P.tetZ=-.14+Math.sin(T*3.1)*.05;
      }
      else if(T<q){ /* Chaque jour, 5 m : l'essai de la pelle, la flèche, la paroi */
        ausol(0); const u=lisse((T-sit-3.05)/.8); vise(0,0,1020+(480-1020)*u,16+(27-16)*u,.08+.12*u);
        if(T>=sit+1.26&&T<sit+2.95) creuse(); else { tient(); T<sit+3.24?ouvre():montreBas(); }
      }
      else if(T<r){ /* La question : il se gratte la tête, appuyé sur la pelle */
        tient(); const u=(T-q)/(r-q);
        /* Il attend en faisant les cent pas sur la plage, s'arrête à chaque choix */
        const tq=T-q, arret=tq<4.5||(tq>=6.6&&tq<9)||tq>=11.2;
        if(tq>=4.5&&tq<6.6){ const v=lisse((tq-4.5)/2.1); ausol(0+1.1*v); marche(1,1.25); }
        else if(tq>=9&&tq<11.2){ const v=lisse((tq-9)/2.2); ausol(1.1-1.1*v); marche(1,-1.25); }
        else { ausol(tq<6.6?0:(tq<9?1.1:0)); scene.ry=-.12+Math.sin(T*.7)*.08; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; }
        for(const a of [4.8,7.31,8.18]){ const w=tq-a; if(w>=0&&w<.4&&arret) P.sautY=Math.sin(w/.4*Math.PI)*.18; }
        vise(scene.x+.3+Math.sin(T*.6)*.1,0,1660,10.6-1.6*lisse(u));
        /* Le rebours : il pianote sur le manche, de plus en plus vite */
        if(tq>=11.2){ const w=tq-11.2; P.md.set(.1,1.95+Math.abs(Math.sin(w*(5+w*2)))*.14,.75); P.cd.set(.6,1.6,.3); P.tetZ=Math.sin(w*5)*.08; P.tetX=-.05; P.regY=0; P.regX=0; P.mg.set(-.45,2.05,.75); P.cg.set(-.84,1.6,.3); }
      }
      else if(T<cre){ /* La réponse */
        ausol(0); tient(); const u=(T-r)/(cre-r); vise(.25,0,1660,8.8+.9*lisse(u));
        if(T<r+1.05) ouvre(); else if(T<r+2.7){ pouce(); const v=T-r-1.05; if(v<.5) P.sautY=Math.sin(v/.5*Math.PI)*.25; } else ouvre();
      }
      else if(T<cre+9.82){ /* Les quatre jours : le plan large, le puits se creuse, le ciel tourne */
        ausol(-.28,-prof); const u=Math.max(0,(T-cre)/9.82); vise(0,0,480,27-.3*u,.2);
        const nuitTombee=nuit(T)>.35;
        if(enCreusant(T)) creuse();
        else if(nuitTombee){ dort(); ZZ.forEach((m,i)=>{ const ph=(T*.7+i/3)%1; m.visible=true; m.position.set(scene.x+.5+ph*.45,-prof+1.9+ph*.8,1.02); const zz=.6+ph*.9; m.scale.set(zz,zz,1); m.material.opacity=1-ph; }); }
        else if(T>=DIG[3][1]){ tient(); scene.ry=.25; pouce(); const v=T-DIG[3][1]; if(v<.5) P.sautY=Math.sin(v/.5*Math.PI)*.3; }
        else { tient(); scene.ry=-.05; ouvre(); }
      }
      else if(T<cof){ /* −20 ÷ (−5) : la caméra descend vers lui, les flèches se comptent */
        fond(-.28); tient(); const u=lisse((T-cre-9.82)/1.2), v=lisse((T-cre-12.55)/1); vise(.2-.1*v,-4.8,960+10*u,23.4-.5*v,.14);
        if(T<cre+12.55){ montreHaut(); P.regY=.42; } else { pouce(); const w=T-cre-12.55; if(w<.5){ P.sautY=Math.sin(w/.5*Math.PI)*.34; P.paupiere=-1.25; } }
      }
      else if(T<cof+1.72){ /* Le coffre ! */
        fond(-.5); const u=T-cof; vise(.1,F,1540,8.6-1.2*lisse(u/1.6),.06);
        scene.ry=.42; P.paupiere=-1.25; montreHaut(); P.md.set(1,2.45,.5); if(u<.5) P.sautY=Math.sin(u/.5*Math.PI)*.34; else if(u>.7&&u<1.2) P.sautY=Math.sin((u-.7)/.5*Math.PI)*.22;
      }
      else if(T<cof+3.3){ /* Il l'ouvre : la lumière dorée */
        fond(-.5); const u=T-cof-1.72; vise(.28,F,1520,6.9-.9*lisse(u/1.5),.06);
        scene.ry=.85; P.gesteD='ouverte'; P.md.set(.2,1.55+.9*ouv,1.0); P.cd.set(.7,1.5,.5); P.mg.set(-.4,2.3,.8); P.cg.set(-.8,1.7,.3); P.tetX=.06-.2*ouv; P.jaw=Math.max(P.jaw,.25+.4*ouv); P.paupiere=-1.25; P.qSway=Math.sin(T*6)*.3;
      }
      else if(T<cof+4.9){ /* Un papier ? Il sort tout doucement du coffre */
        fond(-.5); const u=lisse((T-cof-3.4)/.8); vise(.3,F,1520,6-.3*u,.06);
        PAPIER.position.set(COFX-.1*u,F+.72+.72*u+Math.sin(T*3)*.015,.5); PAPIER.rotation.z=Math.sin(T*2.6)*.08; PAPIER.scale.setScalar(.72);
        scene.ry=.7; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.2; P.tetX=-.05; P.regY=.32; P.regX=-.1;
      }
      else if(T<cof+7.78){ /* Il lit : le papier plein cadre, ses yeux au-dessus */
        fond(-.5); const u=T-cof-4.9; vise(-.5+Math.sin(u*.8)*.01,F+1.32,960,3.75-.22*lisse(u/2.8),.03);
        PAPIER.position.set(-.5,F+1.08,.72); PAPIER.rotation.z=-.015+Math.sin(u*3)*.006;
        scene.ry=0; P.gesteD='ouverte'; P.md.set(.98,1.62,1.02); P.cd.set(1,1.35,.42); P.mg.set(-.98,1.62,1.02); P.cg.set(-1,1.35,.42); P.tetX=.1; P.regX=.18; P.tetY=0;
        P.paupiere=u>1.4?-1.32:-1.02;
      }
      else if(T<cop){ /* −12 ! Il s'effondre, le papier tombe */
        fond(-.5); const u=T-cof-7.78; vise(.05,F,1530,8.3,.06);
        const ch=lisse(u/.8); PAPIER.position.set(-.1+Math.sin(u*5)*.14*(1-ch),F+1.1+(.04-1.1)*ch,.72); PAPIER.rotation.set(-1.45*ch,0,Math.sin(u*5)*.3*(1-ch));
        scene.ry=-.08; P.paupiere=-1.28; P.jaw=Math.max(P.jaw,.62); P.hanche-=.1*lisse(u/.4); P.tetX=.04; P.tetZ=Math.sin(T*9)*.04;
        P.gesteD='ouverte'; P.md.set(.95,1.25,.45); P.cd.set(.88,1.65,.1); P.mg.set(-.95,1.25,.45); P.cg.set(-.88,1.65,.1); P.qEnroule=1.15; P.ecrase=.1*Math.exp(-u*4);
      }
      else if(T<cop+3.02){ /* Heureusement : les copains tombent du ciel */
        fond(XM); const u=T-cop; vise(.04,F,1500,9.4-.3*lisse(u/3),.06);
        if(u<.7){ scene.ry=-.08; P.tetX=-.1; ouvre(); }
        else { scene.ry=.18; P.tetX=-.3+.3*lisse((u-1.3)/.4); montreHaut(); P.regX=-.3*(1-lisse((u-1.3)/.4)); P.regY=.2; if(u>1.7){ ouvre(); P.tetX=0; } }
        PAPIER.position.set(-.1,F+.04,.72); PAPIER.rotation.set(-1.45,0,0);
      }
      else if(T<cop+9){ /* On est 3 : on partage */
        fond(XM); const u=T-cop-3.02; vise(.04,F,1500,9.1+.6*lisse(u/.8),.06);
        scene.ry=.1; ouvre(); PAPIER.visible=false;
        const w=t2-3.04; if(w>=0&&w<.42) P.sautY=Math.sin(w/.42*Math.PI)*.34;
        if(t2>=7.48){ P.md.set(1,2.5,.45); P.cd.set(.85,1.8,.1); P.gesteD='ouverte'; P.tetY=.25+Math.sin(T*1.2)*.08; P.regY=.3; }
      }
      else if(T<c){ /* Ils filent ! Le plan s'ouvre sur tout le puits */
        fond(XM); const u=lisse((T-cop-9)/2.1); vise(.0,F,1500+(1485-1500)*u,9.7+(24.5-9.7)*u,.06+.14*u);
        PAPIER.visible=false; scene.ry=.3; P.paupiere=-1.3; P.jaw=Math.max(P.jaw,.45);
        P.gesteD='ouverte'; P.md.set(1,3.1+Math.sin(T*11)*.14,.3); P.cd.set(.98,2.3,.1); P.tourneD=Math.sin(T*11)*.4; P.mg.set(-.92,1.8,.3); P.tetX=-.22; P.regX=-.3; P.regY=.28;
        const w=t2-9.76; if(w>=0) P.sautY=Math.abs(Math.sin(w*5.5))*.3;
      }
      else if(T<f){ /* À toi : la nouvelle croix, sur la plage, le soir */
        vise(2.25+Math.sin(T*.3)*.08,0,1000,14-1.3*lisse((T-c)/8),.05);
        if(T<c+1.1){ const v=(T-c)/1.1; ausol(1.9+(3.15-1.9)*v); pelleM.visible=true; marche(1,1.25); }
        else if(T>=c+4.46&&T<c+6.05){ ausol(3.15); creuse(); P.hanche+=.02; }
        else { ausol(3.15); tient(); if(T<c+4.46) { scene.ry=-.12; montreBas(); } else if(T<c+9.18) { scene.ry=-.12+Math.sin(T*1.1)*.05; ouvre(); } else { scene.ry=-.12; pouce(); } }
      }
      else { /* La fin, sur la plage, sous l'écran de fin */
        ausol(3.15); vise(3.4,0,1770,8.2+Math.sin((T-f)*.5)*.2); scene.ry=-.14+Math.sin(T*1.4)*.05; T-f<2.35?ouvre():pouce();
      }

      if(window.MINI){ fond(-.5); scene.ry=.12; P.jaw=.62; pelleM.visible=true; pouce(); P.mg.set(-.92,1.95,.38); P.cg.set(-.86,1.5,.12); REP.visible=false; COFFRE.position.set(.92,F,.5); COFFRE.rotation.y=-.25; COUV.rotation.x=-1.25; LUEUR.visible=true; LUEUR.material.opacity=.45; ETINC.forEach((m,i)=>{ m.visible=true; const ph=(i/8), a=i*2.4; m.position.set(Math.cos(a)*(.15+.4*ph),.6+ph*1.9,.1+Math.sin(a)*.2); });
        for(const o of FLECHES) o.g.visible=false; cam.x=.25; cam.d=7.2; cam.y=F+(1660-960)/(2637/7.2); cam.e=.04; panneau.style.display='none'; return; }

      /* ---- Le panneau du bas ---- */
      const voirP=(T>=sit+3.22&&T<q)||(T>=cre+.76&&T<cof)||(T>=cof+7.78&&T<c)||(T>=c+2.08&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        const jours=T>=cre&&T<cof, nb=T>=cop+3.02&&T<c;
        $('ecranJ').style.display=jours||nb?'':'none';
        $('formule').style.flex=jours||nb?'1':'none';
        if(jours){ $('nomJ').textContent='JOUR'; const d=[.41,2.82,5.18,7.73].filter(x=>T>=cre+x).length; $('valJ').textContent=d?String(d):'';
          const zp=T>=cre+12.55&&T<cre+13.2; $('valJ').style.color=zp?'#8ce99a':'#74c0fc'; }
        if(nb){ $('nomJ').textContent='ON EST'; $('valJ').textContent=t2>=3.34?'3':''; $('valJ').style.color='#74c0fc'; }
        let lst=[]; for(const [deb,l] of FORMULES) if(T>=deb) lst=l;
        jetons($('formule'),lst,T);
      }
    } };
  return film;
};
