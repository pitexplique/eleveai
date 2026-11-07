/* ============================================================
   ÉPISODE 07 : LES DALLES À −1. (−1) × (−1) × … 100 fois de suite = +1.
   Un temple dans la jungle au coucher du soleil, une allée de 100 dalles gravées « −1 ».
   La pancarte se retourne à chaque dalle. Ti Margo reste à x = 0 : c'est l'allée qui défile
   (MONDE), et scene3d tourne autour de lui pour les plans en perspective.
   ============================================================ */
FILMS.defi=function({el,$,mots,jetons,panneau,carte,legende,fin,lisse}){
  /* ---- Les clips : tout le reste en découle ---- */
  const acc=.4,sit=15.05,dal=21.8,q=30.55,r=46.75,cou=52.7,c=63.4,f=73.6,FIN=80.45;
  const clips=[['00-accroche',acc],['01-situation',sit],['02-dalles',dal],['02q-question',q],['02r-reponse',r],['03-course',cou],['05-question',c],['06-abonne',f]];

  /* ---- Les légendes : chaque mot écrit à l'instant exact où il est dit ---- */
  const N=' ';
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([t,l])=>[base+l[0],base+l[l.length-1],t,l.map(x=>base+x)])});
  const groupes=[
    G(acc,.1,acc+3.7,410,[['Salut'+N+'!',[.1]],['Moi, c’est Ti Margo.',[1.46,2.0,2.23,2.41]]]),
    G(acc,3.75,acc+8.33,60,[['Mon défi le plus fou'+N+':',[3.8,4.05,4.46,4.61,4.84]],['−1 fois −1 fois −1…',[5.36,5.88,6.2,6.66,6.97]]]),
    G(acc,8.35,acc+11.9,60,[['100 fois de suite,',[8.38,8.67,8.98,9.12]],['sans calculatrice.',[9.83,10.1]]]),
    G(acc,11.92,sit-.05,60,[['Tu paries que tu y arrives'+N+'?',[11.95,12.13,12.5,12.69,12.91,13.02]]]),
    G(sit,.1,sit+3.2,60,[['Regarde ma pancarte'+N+':',[.1,.65,.82]],['elle dit plus.',[1.7,1.87,2.01]]]),
    G(sit,3.22,dal-.05,60,[['À chaque dalle −1,',[3.23,3.33,3.63,3.85]],['elle se retourne.',[4.57,4.73,4.95]]]),
    G(dal,.1,dal+2.1,60,[['1 dalle'+N+':',[.1,.35]],['moins.',[.93]]]),
    G(dal,2.15,dal+4.15,60,[['2 dalles'+N+':',[2.15,2.37]],['plus.',[2.94]]]),
    G(dal,4.19,dal+6.25,60,[['3 dalles'+N+':',[4.19,4.5]],['moins.',[5.08]]]),
    G(dal,6.29,q-.05,60,[['4 dalles'+N+':',[6.3,6.66]],['plus.',[7.23]]]),
    G(cou,.1,cou+2.45,60,[['Je cours pour vérifier'+N+'!',[.1,.33,.68,.9]]]),
    G(cou,2.5,cou+6.45,60,[['98, 99, 100'+N+'!',[2.51,3.85,5.26]]]),
    G(cou,6.48,cou+7.9,60,[['+1.',[6.48]]]),
    G(cou,7.92,c-.05,60,[['Ma pancarte ne ment jamais.',[7.92,8.13,8.74,8.88,9.09]]]),
    G(c,.1,f-.05,60,[['À toi'+N+':',[.1,.21]],['j’ajoute une dalle.',[.7,1.2,1.37]],['−1, 101 fois de suite.',[2.66,3.35,3.77,4.08,4.2]],['Quel est le résultat'+N+'?',[5.59,5.92,6.01,6.15]],['Réponds en commentaire'+N+'!',[7.67,8.12,8.25]]],56)
  ];

  /* ---- La formule du panneau ---- */
  const NEG=s=>`<span class="neg">${s}</span>`, OK=s=>`<span class="ok">${s}</span>`, UN=NEG('(−1)'), X=' × ';
  const DEUX=`<span class="paire">${UN}${X}${UN}</span>`;
  const LONG=[UN,X,UN,X,'…',X,UN].join('');
  const FORMULES=[
    [acc,[]],
    [acc+5.36,[[acc+5.36,UN],[acc+5.88,X],[acc+6.2,UN],[acc+6.66,X],[acc+6.97,UN],[acc+7.23,'…']]],
    [sit,[]],
    [dal,[[dal+.1,UN],[dal+2.15,X],[dal+2.15,UN],[dal+4.19,X],[dal+4.19,UN],[dal+6.3,X],[dal+6.3,UN]]],
    [q+1.63,[[q+1.63,LONG]]],
    [r+4.28,[[r+4.28,DEUX],[r+4.28,X],[r+4.52,DEUX],[r+4.52,X+'…']]],
    [cou,[[cou+.35,LONG]]],
    [cou+6.48,[[cou+6.48,UN+X+'…'+X+UN+' = '],[cou+6.48,OK('+')],[cou+6.76,OK('1')]]],
    [c,[]],
    [c+2.66,[[c+2.66,UN],[c+3.35,X+'…'+X+UN],[c+6.15,' = ?']]]
  ];
  /* Ce que dit l'écran SIGNE : [instant, signe] */
  const SIGNES=[[sit+2.01,'+'],[dal+.93,'−'],[dal+2.94,'+'],[dal+5.08,'−'],[dal+7.23,'+'],[q+1.63,'?'],[r+1.05,'+'],[cou+.1,'+'],[c+3.35,''],[c+6.15,'?'],[f,'+']];

  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #rebours{display:block;}
    #formule{font-size:68px!important;margin-top:0!important;min-height:84px!important;line-height:84px!important;}
    .paire{display:inline-block;background:#d8ecff;border-radius:18px;padding:0 8px;font-size:52px;line-height:70px;}
    #ligneP{display:flex;align-items:stretch;justify-content:center;gap:24px;margin-top:6px;}
    .ecranD{flex:1;display:flex;align-items:center;justify-content:center;gap:20px;background:#10202b;border-radius:26px;border:6px solid #39424e;color:#74c0fc;padding:2px 10px;}
    .ecranD small{font-size:34px;letter-spacing:2px;color:#cfd8dc;}
    .ecranD span{font-size:92px;line-height:1.05;font-variant-numeric:tabular-nums;min-width:60px;text-align:center;}`;
  document.head.append(css);
  panneau.innerHTML=`<div id="formule"></div><div id="ligneP"><div class="ecranD" id="boiteD"><small>DALLES</small><span id="valD"></span></div><div class="ecranD" id="boiteS"><small>SIGNE</small><span id="valS"></span></div></div>`;

  /* ---- Outils ---- */
  const bm=c=>new THREE.MeshBasicMaterial({color:c});
  const MONDE=new THREE.Group(); scene3d.add(MONDE);
  const boite=(w,h,d,c,x,y,z,p=MONDE)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),typeof c==='number'?bm(c):c); m.position.set(x,y,z); p.add(m); return m; };
  const cyl=(rh,rb,h,c,x,y,z,p=MONDE)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(rh,rb,h,20),typeof c==='number'?bm(c):c); m.position.set(x,y,z); p.add(m); return m; };
  const boule=(R,c,x,y,z,p=MONDE)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(R,16,12),typeof c==='number'?bm(c):c); m.position.set(x,y,z); p.add(m); return m; };
  const toile=(w,h,dessin)=>{ const cv=document.createElement('canvas'); cv.width=w; cv.height=h; dessin(cv.getContext('2d')); const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8; return tx; };
  const hache=k=>{ const v=Math.sin(k*127.1+3.3)*43758.5453; return v-Math.floor(v); };

  /* ---- Le fond, à l'infini : le soleil couchant, les collines violettes ---- */
  const FOND=new THREE.Group(); scene3d.add(FOND);
  const SOLEIL=new THREE.Group(); FOND.add(SOLEIL);
  { const d=new THREE.Mesh(new THREE.CircleGeometry(70,48),bm(0xffd24a)); SOLEIL.add(d);
    const h=new THREE.Mesh(new THREE.CircleGeometry(105,48),new THREE.MeshBasicMaterial({color:0xffb347,transparent:true,opacity:.35,depthWrite:false})); h.position.z=-1; SOLEIL.add(h); }
  const COLL=new THREE.Group(); FOND.add(COLL);
  for(let i=-7;i<=7;i++){ const m=boule(150+hache(i)*90,i%2?0x6b3f78:0x83477a,i*170,-10,-800-(i%2?0:60),COLL); m.scale.y=.26+hache(i+9)*.16; }
  for(let i=-6;i<=6;i++){ const m=boule(120+hache(i+20)*70,i%2?0x2f4d3f:0x3a5a3c,i*190+60,-14,-560,COLL); m.scale.y=.14+hache(i+31)*.12; }

  /* ---- Le sol ---- */
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),bm(0x7a8a35)); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);

  /* ---- Les dalles ---- */
  const D=1.9, LD=1.82, HD=.7, ZF=1.2, ZB=-1, XD=k=>k*D, NB=101;
  /* Le dessus de la pierre, fissuré */
  const dessus=(fond,trait)=>toile(256,256,g=>{ g.fillStyle=fond; g.fillRect(0,0,256,256); g.strokeStyle=trait; g.lineWidth=5; g.strokeRect(6,6,244,244);
    g.lineWidth=3; g.beginPath(); g.moveTo(40,20); g.lineTo(90,70); g.lineTo(70,120); g.moveTo(200,160); g.lineTo(150,190); g.lineTo(165,240); g.stroke(); });
  const matDessus=new THREE.MeshBasicMaterial({map:dessus('#d9c6a0','#a89070')}), matOr=new THREE.MeshBasicMaterial({map:dessus('#ffd43b','#c99700')}), matDepart=new THREE.MeshBasicMaterial({map:dessus('#c9b48a','#8c7650')});
  const geoD=new THREE.BoxGeometry(LD,HD,ZF-ZB), geoF=new THREE.PlaneGeometry(LD,HD), geoH=new THREE.PlaneGeometry(LD,ZF-ZB), flanc=bm(0xa8926c), flancOr=bm(0xe0a800);
  const faceDalle=(k,or)=>toile(512,196,g=>{
    g.fillStyle=or?'#f5c518':'#c8b288'; g.fillRect(0,0,512,196);
    g.strokeStyle=or?'#a87f00':'#8c7650'; g.lineWidth=8; g.strokeRect(5,5,502,186);
    /* Le numéro, dans un médaillon */
    g.beginPath(); g.arc(112,98,84,0,Math.PI*2); g.fillStyle=or?'#fff3bf':'#efe3c2'; g.fill(); g.lineWidth=7; g.strokeStyle=or?'#a87f00':'#6b5736'; g.stroke();
    g.textAlign='center'; g.textBaseline='middle'; g.fillStyle='#17452a';
    g.font=`800 ${k>=100?76:(k>=10?96:112)}px "Segoe UI"`; g.fillText(String(k),112,104);
    /* « −1 », gravé : un liseré clair sous le chiffre */
    g.font='800 150px "Segoe UI"'; g.fillStyle=or?'#fff3bf':'#efe3c2'; g.fillText('−1',356,108); g.fillStyle='#c2410c'; g.fillText('−1',353,104);
  });
  const DALLES={};
  for(let k=1;k<=NB;k++){ const or=k===100, g=new THREE.Group(); g.position.set(XD(k),0,0); MONDE.add(g);
    const b=new THREE.Mesh(geoD,or?flancOr:flanc); b.position.set(0,HD/2,(ZF+ZB)/2); g.add(b);
    const h=new THREE.Mesh(geoH,or?matOr:matDessus); h.rotation.x=-Math.PI/2; h.position.set(0,HD+.003,(ZF+ZB)/2); g.add(h);
    const fa=new THREE.Mesh(geoF,new THREE.MeshBasicMaterial({map:faceDalle(k,or)})); fa.position.set(0,HD/2,ZF+.004); g.add(fa);
    DALLES[k]={g,fa}; }
  /* Le départ : une dalle sans « −1 » */
  { const g=new THREE.Group(); g.position.set(-.3,0,0); MONDE.add(g); const w=LD+.6;
    boite(w,HD,ZF-ZB,0x8c7650,0,HD/2,(ZF+ZB)/2,g); const h=boite(w,.004,ZF-ZB,matDepart,0,HD+.003,(ZF+ZB)/2,g); h.visible=true;
    for(let i=0;i<2;i++){ const hm=HD*(2-i)/3; boite(w,hm,.5,i?0x9c8658:0x8c7650,0,hm/2,ZF+.25+i*.5,g); boite(w,.004,.5,i?0xc9b48a:0xbba77c,0,hm+.003,ZF+.25+i*.5,g); } }
  /* Le chemin de terre, devant l'allée */
  boite(XD(104),.02,1.5,0xc9a06a,XD(50),.005,ZF+.9);
  /* Les accolades « par deux » : dalles 1-2 et 3-4 */
  const PAIRES=[[1,2],[3,4]].map(([a,b])=>{ const g=new THREE.Group(); g.position.set((XD(a)+XD(b))/2,0,ZF+.03); MONDE.add(g); const lg=D+LD+.08, ep=.09;
    for(const y of [ep/2-.02,HD+.01]) boite(lg,ep,.05,0x1c7ed6,0,y,0,g); for(const s2 of [-1,1]) boite(ep,HD+.06,.05,0x1c7ed6,s2*(lg/2-ep/2),HD/2,0,g); return g; });

  /* ---- Les colonnes en ruine, derrière l'allée ---- */
  const texPierre=toile(256,16,g=>{ const l=g.createLinearGradient(0,0,256,0); l.addColorStop(0,'#8a6a4a'); l.addColorStop(.45,'#f0cfa0'); l.addColorStop(.75,'#d8ae7c'); l.addColorStop(1,'#7c5c40'); g.fillStyle=l; g.fillRect(0,0,256,16); });
  const matCol=new THREE.MeshBasicMaterial({map:texPierre}), ZC=-3.1, HC=5.6;
  const LIANES=[];
  const liane=(x,y,z,l,ph,p=MONDE)=>{ const g=new THREE.Group(); g.position.set(x,y,z); p.add(g);
    const b=new THREE.Mesh(new THREE.CylinderGeometry(.03,.04,l,8),bm(0x2f7d32)); b.position.y=-l/2; g.add(b);
    for(let i=1;i<=Math.floor(l/.42);i++){ const fe=boule(.11,i%2?0x37b24d:0x51cf66,(i%2?.09:-.09),-i*.42,.02,g); fe.scale.set(1,.55,.35); }
    LIANES.push({g,ph}); return g; };
  for(let k=0;k<=92;k+=2){ const x=XD(k)-.2, casse=hache(k)<.16&&k>6, h=casse?1.8+hache(k+5)*1.6:HC;
    cyl(.42,.48,h,matCol,x,h/2,ZC); boite(1.25,.26,1.25,0xc4a077,x,.13,ZC);
    if(!casse){ boite(1.2,.3,1.2,0xd8b98a,x,h+.15,ZC); boite(D*2+.12,.46,.9,0xcfae80,x+D,h+.53,ZC); boite(D*2+.12,.1,1,0xa8835a,x+D,h+.26,ZC);
      liane(x+.6+hache(k+1)*.8,HC+.32,ZC+.5,1.2+hache(k+2)*2.2,k*1.7);
      liane(x+D+hache(k+3)*.9,HC+.32,ZC+.52,.9+hache(k+4)*2.6,k*.9);
      /* Une liane courbe entre deux colonnes */
      const cb=new THREE.QuadraticBezierCurve3(new THREE.Vector3(x,HC+.25,ZC+.48),new THREE.Vector3(x+D,HC-1.1-hache(k+6)*.7,ZC+.5),new THREE.Vector3(x+2*D,HC+.25,ZC+.48));
      MONDE.add(new THREE.Mesh(new THREE.TubeGeometry(cb,14,.035,6),bm(0x2b8a3e))); }
    else { boule(.4,0x8a9a4a,x,h+.02,ZC).scale.y=.5; for(let i=0;i<3;i++){ const m=boite(.5,.3,.5,0xc4a077,x+.9+i*.34,.15,ZC+.5-i*.3); m.rotation.y=i; } }
  }

  /* ---- La jungle, derrière : arbres sombres, plus clairs quand le soir les touche ---- */
  const VERTS=[0x5a7a2c,0x74862c,0x47682f,0x8a8430];
  for(let i=-5;i<=112;i++){ if(i%2&&hache(i+90)<.6) continue; const x=i*D+hache(i)*1.2; if(Math.abs(x-XD(100))<13) continue;
    const z=-9-hache(i+40)*6, h=1.6+hache(i+50)*1.6;
    cyl(.28,.42,h,0x5c3d26,x,h/2,z);
    for(let j=0;j<3;j++) boule(1.25+hache(i+j*7)*.7,VERTS[(i+j)&3],x+(j-1)*1.1,h+hache(i+j)*.7,z+(j%2)*.6);
  }
  /* Les touffes et fleurs au bord du chemin */
  for(let i=-8;i<=330;i++){ const x=i*.62+hache(i)*.3, z=ZF+1.8+hache(i+3)*3; const m=boule(.2+hache(i+7)*.2,i%3?0x3f8f35:0x6aa332,x,.1,z); m.scale.y=.7;
    if(i%5===0) boule(.09,[0xff6b6b,0xffd43b,0xf783ac][i%3&3]||0xff6b6b,x+.08,.32,z+.05); }
  for(let i=0;i<=110;i++){ const x=i*D+.95; const m=boule(.32,0x6f8f3a,x,.12,ZB-.25); m.scale.y=.6; }
  /* Les grandes feuilles au premier plan : elles filent pendant la course */
  for(let k=8;k<=90;k+=11){ const x=XD(k), g=new THREE.Group(); g.position.set(x,0,3.6); MONDE.add(g);
    for(let j=0;j<5;j++){ const m=boule(1,j%2?0x1f5a2c:0x2b6e34,(j-2)*.3,.3+(2-Math.abs(j-2))*.12,0,g); m.scale.set(.2,.5,.1); m.rotation.z=-(j-2)*.42; } }

  /* ---- Le temple, tout au bout, derrière la dalle d'or ---- */
  const TEMPLE=new THREE.Group(); TEMPLE.position.set(XD(100),0,-15); TEMPLE.scale.setScalar(.72); MONDE.add(TEMPLE);
  { const W=17, HT=8.2;
    for(let i=0;i<4;i++) boite(W+3-i*1,.42,6-i*.5,0xd9bd8d,0,.21+i*.42,0,TEMPLE);
    const y0=4*.42;
    boite(W-4,HT,.5,0x4a2f22,0,y0+HT/2,-1.3,TEMPLE);
    { const p=boite(3.4,5.6,.2,0x241407,0,y0+2.8,-1,TEMPLE); p.renderOrder=0; }
    const lueurP=boite(2.7,5,.1,0xffc94d,0,y0+2.5,-.86,TEMPLE); lueurP.material.transparent=true; lueurP.material.opacity=.75;
    for(let i=0;i<6;i++){ const x=(i-2.5)*2.95; cyl(.56,.64,HT,matCol,x,y0+HT/2,.7,TEMPLE); boite(1.5,.3,1.5,0xd8b98a,x,y0+HT+.15,.7,TEMPLE); boite(1.5,.3,1.5,0xc4a077,x,y0+.15,.7,TEMPLE); }
    boite(W,.9,3.4,0xe0c290,0,y0+HT+.75,.2,TEMPLE); boite(W+.5,.18,3.6,0xb08a5c,0,y0+HT+1.25,.2,TEMPLE);
    /* Le fronton */
    const fr=new THREE.Shape(); fr.moveTo(-W/2-.2,0); fr.lineTo(W/2+.2,0); fr.lineTo(0,3.5); fr.closePath();
    const mf=new THREE.Mesh(new THREE.ExtrudeGeometry(fr,{depth:3.2,bevelEnabled:false}),bm(0xd9b985)); mf.position.set(0,y0+HT+1.34,-1.4); TEMPLE.add(mf);
    const fr2=new THREE.Shape(); fr2.moveTo(-W/2+1.3,.3); fr2.lineTo(W/2-1.3,.3); fr2.lineTo(0,3); fr2.closePath();
    const mf2=new THREE.Mesh(new THREE.ShapeGeometry(fr2),bm(0xa8703f)); mf2.position.set(0,y0+HT+1.34,1.82); TEMPLE.add(mf2);
    /* L'étoile d'or, sur le toit : on la voit de très loin */
    for(let i=0;i<7;i++) liane(-W/2+1+i*2.6+hache(i+60),y0+HT+.3,2,1.3+hache(i+61)*2.4,i*1.3,TEMPLE);
  }
  const PHARE=boule(1.7,0xffe066,0,14.3,0,TEMPLE); PHARE.position.z=.3;
  const AURA=boule(3.6,new THREE.MeshBasicMaterial({color:0xfff3bf,transparent:true,opacity:.35,depthWrite:false}),0,14.3,.3,TEMPLE);
  /* Les torches de chaque côté de la dalle d'or */
  const FLAMMES=[-1,1].map(s=>{ const x=XD(100)+s*3.2; cyl(.07,.1,3,0x4a2f22,x,1.5,-1.7); cyl(.2,.12,.3,0x39424e,x,3.1,-1.7);
    const a=boule(.3,0xff922b,x,3.42,-1.7), b=boule(.17,0xffe066,x,3.4,-1.58); a.scale.y=1.5; b.scale.y=1.5; return {a,b,s}; });

  /* La lumière de la dalle d'or, qui s'allume à « 100 » */
  const LUEUR=new THREE.Mesh(new THREE.CylinderGeometry(2.3,.8,7,28,1,true,Math.PI/2,Math.PI),new THREE.MeshBasicMaterial({color:0xffe066,transparent:true,opacity:.4,side:THREE.DoubleSide,depthWrite:false}));
  LUEUR.position.set(XD(100),HD+3.5,.1); MONDE.add(LUEUR);
  const ETINC=Array.from({length:18},()=>boule(.055,0xfff3bf,0,0,0));
  /* La poussière de la dalle 101 */
  const POUSS=Array.from({length:12},()=>boule(.12,new THREE.MeshBasicMaterial({color:0xe6d7b5,transparent:true,opacity:.7,depthWrite:false}),0,0,0));
  /* Le totem du départ : un visage de pierre qui regarde Ti Margo */
  { const g=new THREE.Group(); g.position.set(-3.1,0,-1.5); MONDE.add(g); boite(1.5,3.4,1.2,0x8c7650,0,1.7,0,g); boite(1.7,.3,1.4,0x6b5736,0,3.5,0,g);
    for(const s of [-1,1]){ boite(.44,.3,.1,0xefe3c2,s*.38,2.5,.62,g); boite(.2,.24,.12,0x241407,s*.34,2.5,.64,g); }
    boite(.36,.95,.2,0x6b5736,0,1.8,.68,g); boite(1,.24,.1,0x241407,0,1,.62,g); liane(-.6,3.6,.75,1.8,2.2,g); liane(.55,3.6,.75,1.2,4.1,g); }

  /* Les lucioles, là où Ti Margo s'arrête */
  const LUC=[]; for(let i=0;i<46;i++){ const zone=i<20?0:XD(100)-6; LUC.push({m:boule(.045,0xfff59d,0,0,0),x:zone+hache(i)*14-1,y:1+hache(i+70)*3.5,z:-2.2+hache(i+80)*4.8,ph:i*1.9}); }
  /* Les oiseaux, très haut */
  const OISEAUX=[0,1,2,3].map(i=>{ const g=new THREE.Group(); scene3d.add(g); boule(.1,0x2b1a3a,0,0,0,g); const a=[-1,1].map(s=>boite(.42,.03,.13,0x2b1a3a,s*.22,0,0,g)); return {g,a,i}; });

  /* ---- La pancarte, dans la main gauche : « + » bleu d'un côté, « − » orange de l'autre ---- */
  const face=(txt,coul,fond)=>toile(512,440,g=>{ g.fillStyle=fond; g.fillRect(0,0,512,440); g.lineWidth=26; g.strokeStyle=coul; g.strokeRect(13,13,486,414);
    g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.font='800 420px "Segoe UI"'; g.fillText(txt,256,216); });
  const PANC=new THREE.Group(); mainG.g.add(PANC); PANC.position.set(0,.02,.11);
  const PIVOT=new THREE.Group(); PANC.add(PIVOT);
  const BW=1.8,BH=1.54,BY=2.05;
  piece(PIVOT,new THREE.CylinderGeometry(.065,.065,2.3,10),toon(0xb5794a),[0,.15,0],CONTOUR_SOMBRE);
  piece(PIVOT,new THREE.BoxGeometry(BW+.1,BH+.1,.09),toon(0x8b5a2b),[0,BY,0],CONTOUR_SOMBRE);
  const pPlus=new THREE.Mesh(new THREE.PlaneGeometry(BW,BH),new THREE.MeshBasicMaterial({map:face('+','#1971c2','#e7f5ff')})); pPlus.position.set(0,BY,.052); PIVOT.add(pPlus);
  const pMoins=new THREE.Mesh(new THREE.PlaneGeometry(BW,BH),new THREE.MeshBasicMaterial({map:face('−','#e8590c','#fff4e6')})); pMoins.position.set(0,BY,-.052); pMoins.rotation.y=Math.PI; PIVOT.add(pMoins);

  /* ---- La calculatrice, jetée dans la jungle ---- */
  const faitCalc=(parent,s)=>{ const g=new THREE.Group(); parent.add(g); g.scale.setScalar(s);
    boite(.72,1,.13,0x343a40,0,0,0,g); boite(.58,.24,.02,0xb2f2bb,0,.3,.07,g);
    for(let i=0;i<3;i++) for(let j=0;j<3;j++) boite(.12,.1,.02,j===2&&i===2?0xf76707:0xdee2e6,-.17+i*.17,.04-j*.18,.07,g);
    return g; };
  const CALC_M=faitCalc(mainD.g,1); CALC_M.position.set(0,.3,.12);
  const CALC_V=faitCalc(scene3d,.58);

  /* ---- Le temps : la dalle où il se trouve (nombre à virgule) ---- */
  const MARCHE=[[dal-.35,dal+.35,0,1],[dal+1.5,dal+2.37,1,2],[dal+3.54,dal+4.5,2,3],[dal+5.65,dal+6.66,3,4]];
  const COURSE=[[cou+.35,cou+2.51,4,98],[cou+2.51,cou+3.85,98,99],[cou+3.85,cou+5.26,99,100]];
  const dalle=T=>{ if(T>=c) return 100; if(T>=cou){ for(const [a,b,de,ar] of COURSE){ if(T<a) return de; if(T<b){ const u=(T-a)/(b-a); return ar-de>1?de+(ar-de)*(u*u*(3-2*u)):de+(ar-de)*u; } } return 100; }
    let n=0; for(const [a,b,de,ar] of MARCHE){ if(T>=b) n=ar; else if(T>=a) n=de+(ar-de)*(T-a)/(b-a); } return n; };
  const marcheActive=T=>MARCHE.some(([a,b])=>T>=a&&T<b);
  /* Le compteur : le chiffre change avec la voix */
  const compteur=T=>{ if(T<dal+.1) return 0; if(T<q+1.63) return [.1,2.15,4.19,6.3].filter(x=>T>=dal+x).length; if(T<cou+.1) return 100; if(T<cou+2.51) return Math.floor(dalle(T)+1e-6); if(T<cou+3.85) return 98; if(T<cou+5.26) return 99; if(T<c+3.35) return 100; if(T<f) return 101; return 100; };

  /* L'angle de la pancarte : un demi-tour vaut un changement de signe */
  const RET=[[dal+.35,dal+.93],[dal+2.37,dal+2.94],[dal+4.5,dal+5.08],[dal+6.66,dal+7.23]];
  const angle=T=>{ if(T<sit+4.95) return 0; if(T<dal){ return Math.PI*2*lisse((T-sit-4.95)/.95); }
    if(T<q+.1){ let a=0; for(const [d,e] of RET) a+=Math.PI*lisse((T-d)/(e-d)); return a; }
    if(T<r+1.05){ const u=(T-q-.1)/(r+1.05-q-.1); const v=(u-.9)/.1; return Math.PI*2*8*(u<.9?u/.95:.9/.95+(1-(1-v)*(1-v))*.05/.95); }
    if(T<cou+.35) return 0;
    if(T<cou+2.51) return Math.PI*4*(dalle(T)-4)/94; /* 2 tours pendant le sprint : à 94 demi-tours, l'image clignotait */
    if(T<c+5.6){ const dd=dalle(T); const n=Math.floor(dd+1e-6); return Math.PI*(n+lisse((dd-n)*1.15)); }
    if(T<f-.05){ const u=(T-c-5.6)/(f-.05-c-5.6); return Math.PI*2*2*lisse(u); }
    return 0; };

  /* Le ciel se couche pendant le film */
  const coul=(a,b,k)=>new THREE.Color(a).lerp(new THREE.Color(b),k), hex=c=>'#'+c.getHexString();
  const ciel=T=>{ const s=Math.min(1,T/FIN);
    const h=coul(0xd9538a,0x2c1c63,s), m=coul(0xff8a3c,0xb5397e,s), b=coul(0xffd479,0xff8f4a,s);
    document.body.style.background=`linear-gradient(${hex(h)} 0%,${hex(m)} 34%,${hex(b)} 60%,${hex(b)} 100%)`;
    sol.material.color.copy(coul(0x8a8f38,0x57603a,s)); };

  /* Les sons */
  const TICS=[]; RET.forEach(([,e],i)=>TICS.push({t:e,f:i%2?880:520}));
  for(let i=0;i<3;i++) TICS.push({t:q+13+i,f:760});
  /* La course : un tic tous les 6 numéros */
  for(let n=10;n<=94;n+=6){ let a=cou+.35,b=cou+2.51; for(let i=0;i<20;i++){ const m=(a+b)/2; if(dalle(m)<n) a=m; else b=m; } TICS.push({t:a,f:500+n*4}); }
  TICS.push({t:cou+2.51,f:800},{t:cou+3.85,f:920},{t:cou+5.26,f:1180},{t:cou+6.48,f:1180});
  for(const [t,fq] of [[1.37,180],[1.6,160],[1.85,150]]) TICS.push({t:c+t,f:fq});
  TICS.push({t:acc+11.22,f:300});

  poserMiniature(arguments[0],dal+1,'Moins 1,<br>100 fois de suite<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  const film={ clips,FIN,tics:TICS,titre:'Les dalles à −1',ceinture:2,finTitre:acc+3.7,
    cuts:[acc+3.75,acc+8.33,acc+9.75,acc+11.92,sit,sit+3.2,dal-.4,q,r,cou,cou+2.51,cou+5.26,f],groupes,finClip:'06-abonne',
    question:{ qc:'02q-question',rc:'02r-reponse',finR:cou,cpt:q+13,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+3.03,'100 dalles'+N+': que dit ma pancarte'+N+'?',[1.63,1.92,2.51,2.72,2.86,3.03].map(x=>q+x)]],
      pause:[[q+10.71,q+11.66,'Mets pause, et choisis'+N+'!',[10.71,10.92,11.55,11.66].map(x=>q+x)]],
      choix:[['<span class="neg">moins</span>',4.64,4.99],['<span class="pos">plus</span>',6.22,6.67],['on ne peut pas savoir',7.92,8.44]],
      tete:[[r+.1,'Réponse '],[r+.62,'B'+N+':']],
      reponse:[[r+1.05,r+1.05,'plus'+N+'!',[r+1.05]]],
      suite:[[r+2.3,r+4.52,'100, c’est pair'+N+': les moins vont par deux.',[2.3,2.82,3.04,3.65,3.82,4.08,4.28,4.52].map(x=>r+x)]] },

    jouer(P,T,cam){
      const vise=(x,yW,Y,d,e=.05)=>{ cam.x=x; cam.y=yW+(Y-960)/(2637/d); cam.d=d; cam.e=e; };
      scene.taille=.55; scene.x=0; scene.z=.1; scene.y=HD; scene.ySol=HD;

      /* ---- Le monde ---- */
      ciel(T);
      const dd=dalle(T); MONDE.position.x=-XD(dd);
      let yaw=0;
      /* Les dalles qui clignotent : on les voit dire « −1 » */
      for(const [k,t0] of [[1,acc+5.36],[2,acc+6.2],[3,acc+6.97],[1,sit+3.85]]){ const u=T-t0; if(u>=-.02&&u<.8){ const z=1+.22*Math.sin(Math.min(1,u/.5)*Math.PI); DALLES[k].fa.scale.set(z,z,1); DALLES[k].fa.position.z=ZF+.06; break; } else { DALLES[k].fa.scale.set(1,1,1); DALLES[k].fa.position.z=ZF+.004; } }
      for(let k=1;k<=4;k++){ const t0=[.1,2.15,4.19,6.3][k-1]+dal; if(T>=t0&&T<t0+.6){ const z=1+.16*Math.sin((T-t0)/.6*Math.PI); DALLES[k].fa.scale.set(z,z,1); DALLES[k].fa.position.z=ZF+.06; } }
      /* La dalle 101 sort de terre */
      const mont=T<c+1.37?0:lisse((T-c-1.37)/.8), tremble=(T>=c+1.37&&T<c+2.2)?Math.sin(T*71)*.018:0;
      DALLES[101].g.visible=mont>0; DALLES[101].g.position.y=(mont-1)*(HD+.03); DALLES[101].g.position.x=XD(101)+tremble;
      POUSS.forEach((m,i)=>{ const u=(T-c-1.37)/1.1, voir=u>=0&&u<1; m.visible=voir; if(!voir) return; const a=i/12*Math.PI*2; m.position.set(XD(101)+Math.cos(a)*(.75+u*(.6+hache(i)*.9)),.08+u*(.35+hache(i+9)*.8),.3+Math.sin(a)*(1+u*.8)); m.scale.setScalar((.5+hache(i+5)*1.1)*(1-u*.8)); m.material.opacity=.7*(1-u); });
      for(const g of PAIRES) g.visible=T>=r+4.28&&T<cou;
      /* La lumière d'or */
      const allume=T>=cou+5.26?lisse((T-cou-5.26)/.35):0;
      LUEUR.visible=allume>.01; LUEUR.material.opacity=.42*allume*(1+.14*Math.sin(T*6));
      ETINC.forEach((m,i)=>{ m.visible=allume>.05&&T<FIN; if(!m.visible) return; const ph=(T*.5+i/18)%1, a=i*2.4; m.position.set(XD(100)+Math.cos(a+T*.4)*(.5+.9*ph),HD+.1+ph*3.8,-.45+Math.sin(a+T*.4)*.3); m.scale.setScalar(1.3*(1-ph*.7)); });
      /* Le décor vivant */
      for(const o of LIANES) o.g.rotation.z=Math.sin(T*1.1+o.ph)*.05;
      for(const o of FLAMMES){ const b=1+.18*Math.sin(T*19+o.s)+.1*Math.sin(T*31); o.a.scale.set(1/b,1.5*b,1/b); o.b.scale.set(1/b,1.5*b,1/b); }
      for(const o of LUC){ o.m.position.set(o.x+Math.sin(T*.7+o.ph)*.35,o.y+Math.sin(T*1.1+o.ph)*.25,o.z); const b=.6+.4*Math.sin(T*2.6+o.ph); o.m.scale.setScalar(b); }
      AURA.scale.setScalar(1+.08*Math.sin(T*2.4));

      /* ---- Les gestes ---- */
      const tient=(b=0,z=.42)=>{ P.mg.set(-.95,2.25+b+Math.sin(T*2.1)*.02,z); P.cg.set(-.86,1.68,z*.4); };
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const montreD=()=>{ P.gesteD='index'; P.md.set(1.15,2.3+Math.sin(T*3)*.03,.42); P.cd.set(.9,1.78,.1); P.regY=.34; P.tetY=.14; };
      const montreBas=()=>{ P.gesteD='index'; P.md.set(1.05,1.5+Math.sin(T*4)*.04,.6); P.cd.set(.88,1.6,.2); P.tetX=.1; P.regX=.16; P.regY=.28; P.tetY=.12; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const regardePanc=()=>{ P.regX=-.3; P.regY=-.3; P.tetX=-.16; P.tetY=-.16; };
      const marche=(rate,rot)=>{ scene.ry=rot; const j=P.jaw; marcher(T*rate,P); P.jaw=j; };

      CALC_M.visible=false; CALC_V.visible=false;
      let plan='';

      /* ---- Les plans ---- */
      if(T<acc+3.75){ /* Le salut, sur la dalle de départ */
        yaw=.16; scene.ry=-.12-yaw; vise(-.1,HD,1720,7.3,.0);
        if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; } else ouvre();
        tient();
      }
      else if(T<acc+8.33){ /* L'allée qui file vers l'horizon ; il la montre */
        const u=(T-acc-3.75)/4.58; yaw=.82+.07*u; scene.ry=.3-yaw; vise(1.15,HD,1240,12.2-1.2*lisse(u),.05);
        montreD(); tient();
        const v=T-acc-4.84; if(v>=0&&v<.45){ P.sautY=Math.sin(v/.45*Math.PI)*.22; P.paupiere=-1.25; }
      }
      else if(T<acc+9.75){ /* La grue monte : tout au bout, le temple */
        const u=lisse((T-acc-8.33)/1.32); yaw=.89+.46*u; scene.ry=.3-yaw;
        vise(1.15+6.85*u,HD+7*u,1240-180*u,11+63*u,.05+.24*u);
        montreD(); tient(); P.sautY=Math.abs(Math.sin(T*7))*.08;
      }
      else if(T<acc+11.92){ /* « sans calculatrice » : elle part dans la jungle */
        yaw=.1; scene.ry=-.12-yaw; const dz=8.6-.5*lisse((T-acc-9.75)/2); vise(.25,HD,1500,dz,.0);
        tient(); const t=T-acc-10.1, lache=.42;
        if(t<lache){ CALC_M.visible=true; const b=t<0?0:lisse(t/.2)*(1-lisse((t-.2)/.22));
          P.gesteD='poing'; P.md.set(.86-.2*b,1.95+.9*b,.5-.65*b+(t>=.2?lisse((t-.2)/.22)*1:0)); P.cd.set(.82,1.7+.35*b,.15-.2*b); P.tetY=.25; P.regY=.34; P.regX=.05; }
        else { const u=(t-lache)/1.05; ouvre(); P.tetY=.42; P.regY=.42; P.tetX=-.1; P.regX=-.2;
          P.gesteD='ouverte'; P.md.set(.95,2.5+Math.sin(T*9)*.08,.45); P.cd.set(.88,1.8,.1);
          if(u<1){ CALC_V.visible=true; const yd=HD+1.15; CALC_V.position.set(.72+3.9*u,yd+2.5*Math.sin(u*Math.PI)-(yd-1.8)*u*u,.55-8.4*u); CALC_V.rotation.set(u*11,u*7,u*5); } }
      }
      else if(T<sit){ /* Le pari : la caméra s'approche */
        yaw=.1; const u=(T-acc-11.92)/(sit-acc-11.92); scene.ry=-.12-yaw+Math.sin(T*2)*.05; vise(.15,HD,1630,8.3-1.7*lisse(u),.0);
        pouce(); P.tetZ=-.14+Math.sin(T*3.1)*.05; tient();
      }
      else if(T<sit+3.2){ /* La pancarte en gros plan */
        yaw=.05; scene.ry=-.12-yaw; const u=(T-sit)/3.2; vise(-.28,HD+2.33,700,5.4-.5*lisse(u),.02);
        P.gesteD='index'; P.md.set(1.02,2.95+Math.sin(T*3)*.03,.4); P.cd.set(.9,2.05,.08); tient(T>=sit+2.01&&T<sit+2.5?Math.sin((T-sit-2.01)/.5*Math.PI)*.16:0); regardePanc();
      }
      else if(T<dal-.4){ /* L'allée : la première dalle, et le tour de pancarte */
        const u=(T-sit-3.2)/(dal-.4-sit-3.2); yaw=.2+.14*u; scene.ry=.42-yaw; vise(1.08,HD,1230,10.6-.4*lisse(u),.03);
        if(T<sit+4.9){ montreBas(); tient(); } else { ouvre(); tient(); regardePanc(); }
      }
      else if(T<q){ /* Les quatre dalles */
        const u=(T-dal+.4)/(q-dal+.4); yaw=.24+.3*u; const dz=8.9-.3*u; vise(.35,HD,1235,dz,.015);
        if(marcheActive(T)){ marche(2.05,1.25-yaw*.7); tient(.02,-.3); P.tetY=-.5; P.regY=-.2; }
        else { const dern=RET.find(([a,e])=>T>=a-.02&&T<e+.3); scene.ry=.12-yaw; ouvre(); tient(dern?.1:0); if(dern){ regardePanc(); const w=T-dern[1]; if(w>=0&&w<.28){ P.sautY=Math.sin(w/.28*Math.PI)*.2; } } }
      }
      else if(T<r){ /* La question : la pancarte tourne, sans rien dire */
        const u=(T-q)/(r-q); yaw=.18+.5*u; scene.ry=.05-yaw+Math.sin(T*1.1)*.08; vise(.05,HD,1340,15.6-.6*lisse(u),.05);
        tient(); P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=-.2; P.qSway=Math.sin(T*3)*.3;
        if(T>=q+13){ const w=T-q-13; P.sautY=Math.abs(Math.sin(w*Math.PI))*.14; }
      }
      else if(T<cou){ /* La réponse : les dalles vont par deux */
        const u=(T-r)/(cou-r); yaw=.36; scene.ry=-.08-yaw; vise(-2.42,HD,1345,20.7-.4*lisse(u),.05);
        tient(); const w=T-r-1.05;
        if(w>=0&&w<.45){ P.sautY=Math.sin(w/.45*Math.PI)*.32; P.paupiere=-1.25; }
        if(T<r+3.5) ouvre(); else { P.gesteD='index'; P.md.set(-.1,1.75,.85); P.cd.set(.42,1.45,.4); P.tetY=-.32; P.regY=-.4; P.regX=.14; P.tetX=.08; }
      }
      else if(T<cou+2.51){ /* Il cours : les dalles filent vers lui */
        const u=lisse((T-cou-.35)/1); yaw=.78; const dz=10.6+1.2*u; vise(.75,HD,1250,dz,.08);
        if(T<cou+.35){ scene.ry=1.05-yaw; ouvre(); tient(); P.hanche-=.12; P.tx=.2; }
        else { const v=(T-cou-.35)/2.16; marche(2.2+2.6*Math.sin(Math.min(1,v)*Math.PI),1.2-yaw*.6); tient(.08,-.3); P.tx=.26; P.tetX=-.16; P.jaw=Math.max(P.jaw,.5); P.qEnroule=.45; }
      }
      else if(T<cou+5.26){ /* 98, 99… on lit les numéros, la caméra revient */
        const u=(T-cou-2.51)/2.75; yaw=.42-.18*u; vise(.5,HD,1235,8.9-.2*u,.015);
        marche(1.05,1.25-yaw*.7); tient(.04,-.3); P.tetY=-.42; P.jaw=Math.max(P.jaw,.3);
      }
      else if(T<c){ /* La dalle d'or, le temple derrière */
        const t=T-cou-5.26, u=lisse((t-.3)/4.5); yaw=.18-.16*u; vise(.05,HD,1270,8.9+4.4*u,.05+.03*u);
        scene.ry=-.08-yaw; tient(t>=1.22&&t<1.9?Math.sin((t-1.22)/.68*Math.PI)*.22:0);
        if(t<.5){ P.ecrase=.24*Math.exp(-t*7); ouvre(); }
        else if(t<2.66){ const j=P.jaw; ACTIONS.danse.f(t-.5,P); P.jaw=j; tient(); P.mg.y+=Math.sin(t*6.1)*.1; }
        else { pouce(); P.tetZ=-.14+Math.sin(T*3)*.05; }
      }
      else if(T<f){ /* À toi : une dalle de plus sort de terre */
        const u=lisse((T-c)/9.8); yaw=.02+.24*u; vise(.92+.05*u,HD,1250,12.4-1.2*u,.07);
        tient(); const t=T-c;
        if(t<2.5){ scene.ry=.35-yaw; montreBas(); if(t>=1.37&&t<2.2){ P.sautY=Math.abs(Math.sin(T*23))*.06; P.jaw=Math.max(P.jaw,.45); } }
        else if(t<5.59){ scene.ry=.25-yaw; ouvre();
          /* Il tâte la dalle 101 du bout du pied, sans y monter */
          const w=(t-2.7)/1.6; if(w>=0&&w<1){ const e=Math.sin(w*Math.PI); P.pd.set(.31+.36*e,.16*e,.04+.3*e); P.tx=-.08*e; } }
        else if(t<7.67){ scene.ry=-.08-yaw; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.qSway=Math.sin(T*3)*.3; }
        else { scene.ry=-.1-yaw; pouce(); }
      }
      else { /* La fin, sur la dalle d'or, sous l'écran de fin */
        yaw=.14; scene.ry=-.14-yaw+Math.sin(T*1.4)*.05; vise(.05,HD,1770,8.3+Math.sin((T-f)*.5)*.2); tient(); T-f<2.35?ouvre():pouce();
      }

      /* La rotation de tout le monde autour de Ti Margo ; le fond à l'infini n'en dépend pas */
      let spin=angle(T);
      if(window.MINI){ yaw=.72; MONDE.position.x=-XD(2); scene.ry=.0-yaw; P.jaw=.62; pouce(); tient(.2); spin=Math.PI; for(const o of LUC) o.m.visible=false;
        cam.x=.02; cam.d=8; cam.e=.02; cam.y=HD+(1735-960)/(2637/8); panneau.style.display='none'; }
      scene3d.rotation.y=yaw;
      FOND.rotation.y=-yaw; COLL.position.x=-XD(dd)*.03;
      SOLEIL.position.set(80,235-T*1.15,-1100);
      OISEAUX.forEach(o=>{ const L=46, t=(T*1.5+o.i*2.1)%L; const x=-23+t+o.i*.8, y=9.5+o.i*.8+Math.sin(T*.8+o.i)*.4, z=-14-o.i*.6; const cs=Math.cos(-yaw), sn=Math.sin(-yaw);
        o.g.position.set(x*cs+z*sn,y,-x*sn+z*cs); o.g.rotation.y=-yaw; const a=Math.sin(T*9+o.i)*.5; o.a[0].rotation.z=-a; o.a[1].rotation.z=a; });

      /* ---- La pancarte reste face à nous : seul son demi-tour la fait changer ---- */
      const Y=a=>new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),a);
      const parent=Y(yaw).multiply(Y(scene.ry)).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(0,.1,.18)));
      PANC.quaternion.copy(parent.invert().multiply(Y(-.16+spin)));
      if(window.MINI) return;

      /* ---- Le panneau du bas ---- */
      const voirP=(T>=acc+5.36&&T<acc+11.92)||(T>=sit+2.01&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        let lst=[]; for(const [deb,l] of FORMULES) if(T>=deb) lst=l;
        jetons($('formule'),lst,T);
        const ecrans=T>=sit; $('ligneP').style.display=ecrans?'':'none';
        $('formule').style.display=(T>=sit&&T<dal)?'none':'';
        if(ecrans){
          const n=compteur(T), voirD=T>=sit+3.33;
          $('boiteD').style.visibility=voirD?'':'hidden'; $('valD').textContent=String(n);
          let s=''; for(const [t,v] of SIGNES) if(T>=t) s=v;
          /* Pendant la course, l'écran suit la pancarte */
          if(T>=cou+.35&&T<cou+2.51) s='…'; /* trop vite pour lire : pas de signe faux à côté du compteur */ else if(T>=cou+2.51&&T<cou+6) s=compteur(T)%2?'−':'+';
          const e=$('valS'); e.textContent=s; e.style.color=s==='−'?'#ff922b':(s==='+'?'#74c0fc':'#ffe066');
        }
      }
    } };
  return film;
};
