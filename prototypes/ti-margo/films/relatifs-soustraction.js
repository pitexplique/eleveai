/* ============================================================
   ÉPISODE 02 : LA MONTGOLFIÈRE. 5 − (−3) = 8, puis 8 − 9 = −1.
   L'altitude est exactement la somme de ce qui pend à la nacelle :
   9 ballons (+1) et 4 sacs (−1) font 5 ; sans 3 sacs, 9 − 1 = 8 ; sans les 9 ballons, il reste 1 sac : −1.
   ============================================================ */
FILMS.soustraction=function({el,$,mots,jetons,panneau,carte,legende,fin,lisse}){
  /* ---- Les clips : tout le reste en découle ---- */
  const acc=.4,sit=10.7,q=22.7,r=37.1,sac=41.35,cal=50.2,bal=62.3,c=72.4,f=84.75,FIN=91.6;
  const clips=[['00-accroche',acc],['01-situation',sit],['01q-question',q],['01r-reponse',r],['02-sacs',sac],['03-calcul',cal],['04-ballons',bal],['05-question',c],['06-abonne',f]];

  /* ---- Les légendes : chaque mot écrit à l'instant exact où il est dit ---- */
  const N=' ';
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([t,l])=>[base+l[0],base+l[l.length-1],t,l.map(x=>base+x)])});
  const groupes=[
    G(acc,.1,acc+3.05,410,[['Salut'+N+'!',[.1]],['Moi, c’est Ti Margo,',[1.46,1.99,2.22,2.4]]]),
    G(acc,3.06,acc+5.55,60,[['et je pars en montgolfière.',[3.1,3.22,3.39,3.64,3.74]]]),
    G(acc,5.57,acc+8.45,60,[['Enlever, ça fait toujours baisser'+N+'?',[5.61,6.27,6.5,6.71,7.12]]]),
    G(acc,8.47,sit-.05,60,[['Tu paries'+N+'?',[8.51,8.68]]],84),
    G(sit,.1,sit+3.8,60,[['Mon altitude'+N+': 5.',[.1,.34,1.34]],['Regarde ma nacelle.',[1.7,2.19,2.35]]]),
    G(sit,3.84,sit+7.6,60,[['Les petits ballons valent +1'+N+':',[3.87,4.09,4.45,4.81,5.07]],['ils tirent vers le haut.',[5.77,5.94,6.2,6.4,6.58]]],56),
    G(sit,7.62,q-.05,60,[['Les sacs de sable valent −1'+N+':',[7.63,7.84,8.21,8.35,8.78,9.04]],['ils tirent vers le bas.',[9.76,9.92,10.18,10.38,10.52]]],56),
    G(sac,.1,sac+3.28,60,[['J’enlève un sac'+N+':',[.1,.56,.67]],['je monte à 6.',[1.37,1.58,1.87,1.96]]]),
    G(sac,3.3,sac+5.78,60,[['Deux sacs'+N+': 7.',[3.31,3.52,4.23]],['Trois sacs'+N+': 8.',[4.53,4.81,5.52]]]),
    G(sac,5.8,cal-.05,60,[['J’ai enlevé,',[5.8,6.0]],['et je suis monté'+N+'!',[6.62,6.74,6.91,7.16]]]),
    G(cal,.1,cal+3.6,60,[['Enlever 3 sacs,',[.1,.5,.75]],['c’est retirer −3.',[1.45,1.68,2.17]]]),
    G(cal,3.62,cal+8.15,60,[['5 − (−3) = 8.',[3.66,4.05,5.74,6.59,6.95]]]),
    G(cal,8.17,bal-.05,60,[['Retirer −3,',[8.2,8.77]],['c’est comme ajouter 3.',[9.57,9.81,10.06,10.51]]]),
    G(bal,.1,bal+4.4,60,[['Et si j’enlève 9 petits ballons,',[.1,.23,.5,.96,1.2,1.57]],['qui valent +1 chacun'+N+'?',[2.15,2.35,2.6,3.05]]],56),
    G(bal,4.42,bal+7.05,60,[['8 − 9'+N+': −1.',[4.46,4.78,5.03,5.64]]]),
    G(bal,7.07,c-.05,60,[['Aïe, je suis dans la mer'+N+'!',[7.11,7.61,7.83,8.13,8.28,8.42]]]),
    G(c,.1,f-.05,60,[['À toi'+N+':',[.1,.21]],['je suis à l’altitude 2.',[.7,.92,1.24,1.41,2.05]],['J’enlève 6 sacs de sable,',[3.2,3.67,3.91,4.27,4.42]],['puis 4 petits ballons.',[5.12,5.42,5.76,6.12]],['Quelle est mon altitude'+N+'?',[7.4,7.73,7.82,8.0]],['Réponds en commentaire'+N+'!',[9.7,10.15,10.27]]],52)
  ];

  /* ---- La formule du panneau ---- */
  const NEG=s=>`<span class="neg">${s}</span>`, POS=s=>`<span class="pos">${s}</span>`, OK=s=>`<span class="ok">${s}</span>`;
  const IB=`<svg width="56" height="74" viewBox="0 0 56 74" style="vertical-align:-10px"><path d="M28 50v22" stroke="#17452a" stroke-width="3"/><ellipse cx="28" cy="27" rx="24" ry="26" fill="#339af0" stroke="#17452a" stroke-width="4"/></svg>`;
  const IS=`<svg width="56" height="70" viewBox="0 0 56 70" style="vertical-align:-10px"><path d="M20 16h16l14 40c0 8-44 8-44 0z" fill="#d9a25f" stroke="#17452a" stroke-width="4" stroke-linejoin="round"/><rect x="17" y="8" width="22" height="9" rx="3" fill="#e8590c" stroke="#17452a" stroke-width="3"/></svg>`;
  const FORMULES=[
    [sit,[]],
    [sit+3.84,[[sit+4.45,IB+' '],[sit+5.07,'= '],[sit+5.07,POS('+')],[sit+5.42,POS('1')+'&emsp;'],[sit+7.84,IS+' '],[sit+8.78,'= '],[sit+9.04,NEG('−')],[sit+9.3,NEG('1')]]],
    [q,[[q+1.63,POS('5')+' '],[q+1.63,NEG('−')+' '],[q+2.12,NEG('3 ')],[q+2.38,NEG('sacs')+' '],[q+4.28,'= ?']]],
    [sac,[[sac,POS('5')+' '],[sac+.67,'→ '],[sac+1.96,POS('6')+' '],[sac+3.52,'→ '],[sac+4.23,POS('7')+' '],[sac+4.81,'→ '],[sac+5.52,OK('8')]]],
    [cal,[[cal+.5,'3 '],[cal+.75,'sacs '],[cal+1.45,'= '],[cal+2.17,NEG('−')],[cal+2.43,NEG('3')]]],
    [cal+3.62,[[cal+3.66,POS('5')+' '],[cal+4.05,'− '],[cal+4.52,'('],[cal+5.74,NEG('−')],[cal+6.06,NEG('3')],[cal+6.06,') '],[cal+6.59,'= '],[cal+6.95,OK('8')]]],
    [cal+8.17,[[cal+8.2,'− '],[cal+8.77,'('+NEG('−')],[cal+9.04,NEG('3')+') '],[cal+9.81,'= '],[cal+10.06,POS('+')+' '],[cal+10.51,POS('3')]]],
    [bal,[[bal+.96,'9 '],[bal+1.57,IB+' '],[bal+2.6,'× '],[bal+2.6,POS('(+')],[bal+2.95,POS('1)')]]],
    [bal+4.42,[[bal+4.46,POS('8')+' '],[bal+4.78,'− '],[bal+5.03,POS('9')+' '],[bal+5.64,'= '],[bal+5.64,OK('−')],[bal+5.95,OK('1')]]],
    [c,[[c+2.05,POS('2')+' '],[c+3.67,'− '],[c+3.67,'('+NEG('−')],[c+3.67,NEG('6')+') '],[c+5.42,'− '],[c+5.42,'('+POS('+')],[c+5.42,POS('4')+') '],[c+7.4,'= ?']]]
  ];

  const FONDU=document.createElement('div'); FONDU.style.cssText='position:fixed;inset:0;z-index:6;background:#d6efff;opacity:0;pointer-events:none;'; document.body.appendChild(FONDU);
  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #ligneP{display:flex;align-items:center;gap:20px;}
    #ecranN{flex:none;width:256px;background:#10202b;border-radius:26px;border:6px solid #39424e;color:#ffe066;text-align:center;padding:2px 0 8px;}
    #ecranN small{display:block;font-size:30px;letter-spacing:3px;color:#cfd8dc;line-height:1.25;}
    #valN{display:block;font-size:92px;line-height:1;font-variant-numeric:tabular-nums;min-height:92px;}
    #formule{flex:1;margin-top:0!important;min-height:0!important;}
    #cq .ligne{display:block;}`;
  document.head.append(css);
  panneau.innerHTML=`<div id="ligneP"><div id="ecranN"><small>ALTITUDE</small><span id="valN"></span></div><div id="formule"></div></div>`;
  document.body.style.background='linear-gradient(#59b7f2 0%,#a8e0fb 55%,#e4f8ff 100%)';

  /* ---- Les briques ---- */
  const H=1.25, XPL=-3.95, XMAT=-2.97, ZM=1.72, FOND=-2.6, YN=n=>n*H;
  const bm=k=>new THREE.MeshBasicMaterial({color:k});
  const boite=(w,h,d,k,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const cyl=(rh,rb,h,k,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(rh,rb,h,20),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const boule=(R,k,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(R,20,14),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const plaque=(txt,{w=1.4,h=1.0,fond='#fffdf5',coul='#17452a',bord='#17452a',fs=.72,rond=false}={},x=0,y=0,z=0,p=scene3d)=>{
    const K=256, cv=document.createElement('canvas'); cv.width=Math.round(w*K); cv.height=Math.round(h*K); const g=cv.getContext('2d');
    const R=rond?cv.height/2:cv.height*.16;
    g.beginPath(); g.roundRect(8,8,cv.width-16,cv.height-16,R); g.fillStyle=fond; g.fill(); g.lineWidth=14; g.strokeStyle=bord; g.stroke();
    g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.font=`800 ${cv.height*fs}px "Segoe UI"`; g.fillText(txt,cv.width/2,cv.height*.54);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tx,transparent:true})); m.position.set(x,y,z); p.add(m); return m; };
  /* Un fil tendu entre deux points : un cylindre de hauteur 1, orienté */
  const HAUT=new THREE.Vector3(0,1,0), vA=new THREE.Vector3(), vB=new THREE.Vector3();
  const fil=(k,R=.014,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(R,R,1,6),bm(k)); p.add(m); return m; };
  const tendre=(m,ax,ay,az,bx,by,bz)=>{ vA.set(ax,ay,az); vB.set(bx-ax,by-ay,bz-az); const L=vB.length()||.001; m.position.set(ax+vB.x/2,ay+vB.y/2,az+vB.z/2); m.scale.set(1,L,1); m.quaternion.setFromUnitVectors(HAUT,vB.normalize()); };
  /* La flèche : une barre et une pointe, sens +1 (haut) ou −1 (bas) */
  const flecheV=(k,z)=>{ const g=new THREE.Group(); scene3d.add(g); const b=boite(.14,1,.03,k,0,0,z,g), p=new THREE.Mesh(new THREE.ConeGeometry(.24,.36,16),bm(k)); p.position.z=z; g.add(p);
    return {g,poser(x,y0,y1){ g.visible=true; const s=Math.sign(y1-y0)||1, L=Math.max(.02,Math.abs(y1-y0)); b.position.set(x,(y0+y1)/2,z); b.scale.y=L; p.position.set(x,y1+s*.16,z); p.rotation.z=s>0?0:Math.PI; }}; };

  /* ---- La mer : une coupe translucide, sa surface vers le large, son fond de sable ---- */
  const NV=800, LX=200;
  const geoMer=new THREE.PlaneGeometry(LX,14,NV,1), matMer=new THREE.MeshBasicMaterial({color:0x1c8fd6,transparent:true,opacity:.42,depthWrite:false,side:THREE.DoubleSide});
  const mer=new THREE.Mesh(geoMer,matMer); mer.position.set(0,-7,1.5); mer.renderOrder=5; scene3d.add(mer);
  const geoEcume=new THREE.PlaneGeometry(LX,.09,NV,1), ecume=new THREE.Mesh(geoEcume,new THREE.MeshBasicMaterial({color:0xffffff,side:THREE.DoubleSide})); ecume.position.set(0,0,1.52); scene3d.add(ecume);
  const hVague=(x,T)=>.07*Math.sin(x*1.6+T*2.4)+.04*Math.sin(x*3.7-T*1.7);
  const pSurf=new THREE.Mesh(new THREE.PlaneGeometry(LX*3,200),bm(0x2f9fe3)); pSurf.rotation.x=-Math.PI/2; pSurf.position.set(0,-.03,-98.5); scene3d.add(pSurf);
  boite(LX*3,20,.1,0x0f5f9f,0,-10.03,-3);
  /* Le fond : sable, rochers, algues, étoile de mer */
  boite(LX*3,12,4.8,0xe9cf8f,0,FOND-6,-.8);
  for(const [x,R,z,k] of [[-1.9,.5,-2,0x7b8794],[-.7,.3,-2.3,0x9aa5b1],[2.9,.6,-2,0x7b8794],[4.2,.35,-1.5,0x9aa5b1],[-6,.7,-2,0x7b8794],[6.2,.55,-2,0x7b8794]]) { const m=boule(R,k,x,FOND+R*.3,z); m.scale.y=.7; }
  const algues=[[-1.3,-1.6],[-1,-1.8],[2.3,-1.5],[2.6,-1.9],[2.05,-1.2],[3.4,-1.2],[-5,-1.4],[.15,-2.2]].map(([x,z],i)=>{ const g=new THREE.Group(); g.position.set(x,FOND,z); scene3d.add(g); const l=[]; for(let j=0;j<4;j++){ const b=boite(.12,.36,.05,i%2?0x2f9e44:0x51cf66,0,.17+j*.33,0,g); l.push(b); } return {l,i}; });
  { const e=new THREE.Group(); e.position.set(2.05,FOND+.02,.85); scene3d.add(e); for(let i=0;i<5;i++){ const b=boite(.09,.28,.02,0xff8787,Math.sin(i*1.257)*.14,Math.cos(i*1.257)*.14,.1,e); b.rotation.z=-i*1.257; } e.rotation.x=-.2; }
  for(const [x,z] of [[-.9,.7],[1.75,1.05],[.95,.4]]) { const m=boule(.08,0xfff4e6,x,FOND+.03,z); m.scale.y=.5; }
  /* Les poissons et les bulles */
  const poisson=(k,z=.2)=>{ const g=new THREE.Group(); scene3d.add(g); const b=boule(.26,k,0,0,0,g); b.scale.set(1.25,.8,.55); const qu=new THREE.Mesh(new THREE.ConeGeometry(.2,.3,3),bm(k)); qu.rotation.z=-Math.PI/2; qu.position.x=-.38; g.add(qu); boule(.05,0xffffff,.17,.06,.13,g); boule(.028,0x111111,.19,.06,.17,g); return {g,qu}; };
  const FISH=[[0xffa94d,-1.1,.5,-.4],[0xffe066,-1.9,-.42,-.9],[0xff8787,-.6,.33,-1.5],[0xb197fc,-2.1,.6,.3],[0x63e6be,-1.5,-.3,-2]].map(([k,y,v,z],i)=>({...poisson(k),y,v,z,o:i*7.3}));
  const dent=poisson(0xfa5252); dent.g.scale.set(1.25,1.25,1.25);
  const bulles=[]; for(let i=0;i<14;i++) bulles.push(boule(.05+((i*3)%4)*.012,0xd0f0ff,(i*1.37)%7-2.4,0,-.9+((i*5)%9)*.2));

  /* Le large : l'île, le voilier, le soleil, les nuages, la mouette */
  { const g=new THREE.Group(); g.position.set(13,0,-46); scene3d.add(g); const a=cyl(.4,8,4.2,0x5cb531,0,2,0,g); a.scale.z=.3; boule(1.3,0x7ed957,-1,2.5,0,g).scale.set(2,1,.3); boite(16,.2,1.2,0xf3dfa2,0,.05,1,g); }
  const voilier=new THREE.Group(); voilier.position.z=-22; scene3d.add(voilier);
  { boite(1.7,.32,.5,0xe03131,0,.2,0,voilier); cyl(.03,.03,1.8,0x39424e,0,1.2,0,voilier); const s=new THREE.Shape(); s.moveTo(0,0); s.lineTo(1,0); s.lineTo(0,1.5); s.closePath(); const v=new THREE.Mesh(new THREE.ShapeGeometry(s),bm(0xffffff)); v.position.set(.06,.45,0); voilier.add(v); }
  boule(2.2,0xffe066,-14,21,-26);
  const nuages=[[-10,3.4,-11],[8,6.2,-14],[-14,9.5,-12],[11,11.3,-15],[-4,14.2,-13],[14,17,-15],[-9,19.5,-13],[5,1.5,-20]].map(([x,y,z],i)=>{ const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g); for(const [a,b,R] of [[0,0,1.05],[1.1,.1,.78],[-1.1,.05,.72],[.45,.55,.7]]) boule(R,0xffffff,a,b,0,g); return {g,x0:x,v:.28+i*.05}; });
  const mouette=new THREE.Group(); scene3d.add(mouette); { const b=boule(.15,0xffffff,0,0,0,mouette); b.scale.set(1.6,.8,.8); const be=new THREE.Mesh(new THREE.ConeGeometry(.05,.16,8),bm(0xfcc419)); be.rotation.z=-Math.PI/2; be.position.x=.28; mouette.add(be); boule(.03,0x111111,.17,.05,.11,mouette); }
  const aileA=boite(.14,.025,.46,0xf1f3f5,0,.03,.26,mouette), aileB=boite(.14,.025,.46,0xf1f3f5,0,.03,-.26,mouette);

  /* ---- L'échelle d'altitude, de −1 à 9, plantée dans le sable ; le zéro à la surface ---- */
  for(const x of [XMAT-.2,XMAT+.2]) boite(.09,9.9*H-FOND,.07,0xffffff,x,(9.9*H+FOND)/2,ZM);
  for(let v=-2;v<=38;v++){ if(v/4*H<FOND) continue; boite(.4,v%4===0?.1:.035,.05,v%4===0?0x17452a:0x8795a4,XMAT,v/4*H,ZM+.02); }
  const PL={};
  for(let v=-1;v<=9;v++){ const co=v<0?'#d9480f':(v>0?'#1971c2':'#17452a'); PL[v]=plaque((v<0?'−':'')+Math.abs(v),{w:1.34,h:1.0,coul:co,bord:co},XPL,YN(v),ZM+.04); boite(.5,.07,.03,0x17452a,XPL+.82,YN(v),ZM+.03); }
  boite(.03,.9,.03,0x39424e,XMAT,9.9*H+.45,ZM); const drapeau=boite(.72,.42,.02,0xe03131,XMAT+.38,9.9*H+.68,ZM);
  /* Le curseur vert qui lit l'altitude : du bord de l'échelle jusqu'au plancher */
  const barreC=boite(1,.06,.04,0x2f9a3a,0,0,ZM), pointeC=new THREE.Mesh(new THREE.ConeGeometry(.2,.4,18),bm(0x2f9a3a)); pointeC.rotation.z=Math.PI/2; pointeC.position.z=ZM+.01; scene3d.add(pointeC);

  /* ---- La montgolfière ---- */
  const nac=new THREE.Group(); scene3d.add(nac);
  const LN=2.4, HN=.85, PN=1.8;
  const cvO=document.createElement('canvas'); cvO.width=512; cvO.height=192; { const g=cvO.getContext('2d'); g.fillStyle='#b9823f'; g.fillRect(0,0,512,192); for(let y=0;y<192;y+=24) for(let x=-24;x<512;x+=48){ g.fillStyle=(Math.floor(y/24)%2)?'#d49c52':'#a97432'; g.fillRect(x+((Math.floor(y/24)%2)*24),y+2,40,20);} }
  const txO=new THREE.CanvasTexture(cvO); txO.colorSpace=THREE.SRGBColorSpace;
  const mO=new THREE.MeshBasicMaterial({map:txO});
  const mur=(w,h,d,x,y,z)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),mO); m.position.set(x,y,z); nac.add(m); return m; };
  mur(LN,.06,PN,0,-.03,0); mur(LN,HN,.06,0,HN/2,PN/2); mur(LN,HN,.06,0,HN/2,-PN/2); mur(.06,HN,PN,-LN/2,HN/2,0); mur(.06,HN,PN,LN/2,HN/2,0);
  for(const [w,d,x,z] of [[LN+.1,.1,0,PN/2],[LN+.1,.1,0,-PN/2],[.1,PN+.1,-LN/2,0],[.1,PN+.1,LN/2,0]]) boite(w,.1,d,0x7a4d2b,x,HN,z,nac);
  /* L'enveloppe : à rayons, sa bouche et le brûleur */
  const ZG=2.35, env=new THREE.Group(); env.position.y=ZG; nac.add(env);
  const cvE=document.createElement('canvas'); cvE.width=1024; cvE.height=64; { const g=cvE.getContext('2d'); const k=['#e03131','#ffd43b','#f76707','#ffd43b']; for(let i=0;i<16;i++){ g.fillStyle=k[i%4]; g.fillRect(i*64,0,64,64);} }
  const txE=new THREE.CanvasTexture(cvE); txE.colorSpace=THREE.SRGBColorSpace;
  const ballon=new THREE.Mesh(new THREE.SphereGeometry(1.9,32,20),new THREE.MeshBasicMaterial({map:txE})); ballon.position.y=1.85; ballon.scale.y=1.12; env.add(ballon);
  cyl(.95,.42,.95,0xc92a2a,0,.3,0,env);
  const bruleur=boite(.5,.12,.5,0x495057,0,-.12,0,env);
  const flamme=new THREE.Mesh(new THREE.ConeGeometry(.15,.5,12),bm(0xff922b)); flamme.position.y=.2; env.add(flamme);
  const cordes=[[-1.15,.8],[1.15,.8],[-1.15,-.8],[1.15,-.8]].map(([x,z])=>({m:fil(0x5c4a32,.018,nac),x,z}));

  /* Les 9 ballons : bleus comme les « + » */
  const POSB=[[1.72,1.42,.42],[2.15,2.0,.15],[1.68,2.42,.55],[2.2,2.82,.2],[2.42,1.5,-.2],[-1.72,1.5,.4],[-2.2,2.05,.15],[-1.7,2.5,.55],[-2.2,2.95,.2]];
  const BLEUS=[0x339af0,0x1c7ed6,0x4dabf7,0x228be6];
  const BALS=POSB.map(([x,y,z],i)=>{ const g=new THREE.Group(); scene3d.add(g); const b=boule(.35,BLEUS[i%4],0,0,0,g); b.scale.y=1.12; const noeud=new THREE.Mesh(new THREE.ConeGeometry(.06,.1,8),bm(0x1864ab)); noeud.position.y=-.41; g.add(noeud);
    const lab=plaque('+1',{w:.5,h:.36,fond:'#1864ab',coul:'#fff',bord:'#fff',fs:.72,rond:true},0,.02,.36,g); return {g,lab,brin:fil(0xf1f3f5,.012),x,y,z,i}; });

  /* Les sacs de sable : six en réserve pour la dernière question, quatre dans le film */
  const SACS=[0,1,2,3,4,5].map(i=>{ const g=new THREE.Group(); scene3d.add(g); const b=boule(.3,0xd9a25f,0,-.04,0,g); b.scale.set(.92,1.08,.68); cyl(.08,.13,.12,0xc4893f,0,.3,0,g); boite(.2,.06,.14,0xe8590c,0,.34,0,g);
    boite(.022,.26,.022,0x5c4a32,0,.48,0,g);
    const lab=plaque('−1',{w:.46,h:.34,fond:'#e8590c',coul:'#fff',bord:'#fff',fs:.72},0,-.05,.23,g); return {g,lab}; });

  /* ---- L'histoire de l'altitude ---- */
  const AL=[[acc+3.2,acc+5.4,.32,5],[sac+.75,sac+1.96,5,6],[sac+3.56,sac+4.23,6,7],[sac+4.85,sac+5.52,7,8]];
  const CH0=bal+4.78, CH1=bal+5.95;
  const altitude=T=>{ if(T>=c) return 2; if(T>=CH1) return -1; if(T>=CH0){ const u=(T-CH0)/(CH1-CH0); return 8-9*u*u; }
    let v=.32; for(const [a,b,de,ar] of AL){ if(T>=b) v=ar; else if(T>=a) v=de+(ar-de)*lisse((T-a)/(b-a)); } return v; };
  /* Trois sacs lâchés : [sac, instant, x sur la nacelle, x au fond] */
  const G_CH=27, LACHE=[{i:3,t:sac+.67,rest:1.45},{i:2,t:sac+3.52,rest:.6},{i:1,t:sac+4.81,rest:-.25}];
  const X4=[-.84,-.28,.28,.84], X6=[-1,-.6,-.2,.2,.6,1];
  for(const L of LACHE){ L.y0=altitude(L.t)*H+.36; L.tImp=L.t+Math.sqrt(2*L.y0/G_CH); L.x0=X4[L.i]; }
  /* Les ballons partent un par un : chacun qui part, un cran de moins */
  const departB=k=>CH0+(CH1-CH0)*Math.sqrt(k/9);
  /* Les gerbes d'eau */
  const SPL=LACHE.map(L=>({t:L.tImp,x:L.x0,e:1})).concat([{t:bal+5.9,x:.1,e:2.8}]);
  const GOUTTES=[]; SPL.forEach((s,is)=>{ const M=s.e>1?26:12; const d=[]; for(let j=0;j<M;j++){ d.push({m:boule(.075*Math.sqrt(s.e),j%3?0xffffff:0xa5e3ff,0,-50,1.55),vx:(j-(M-1)/2)/((M-1)/2)*2.1*Math.sqrt(s.e),vy:(2.2+((j*7)%5)*.75)*Math.sqrt(s.e)}); } GOUTTES.push({s,d}); });

  /* Les flèches, le crochet des sacs, l'amarre */
  const flB=[flecheV(0x1c7ed6,1),flecheV(0x1c7ed6,1)], flS=[flecheV(0xe8590c,1.3),flecheV(0xe8590c,1.3)], fl3=flecheV(0x1c7ed6,ZM);
  const pl3=plaque('+3',{w:1.12,h:.82,fond:'#e7f5ff',coul:'#1971c2',bord:'#1971c2'},-1.25,YN(6.5),ZM);
  const plM3=new THREE.Group(); scene3d.add(plM3); plaque('−3',{w:1.2,h:.86,fond:'#fff4e6',coul:'#d9480f',bord:'#d9480f'},.6,FOND+1.75,1.62,plM3);
  boite(2.5,.06,.04,0xd9480f,.6,FOND+1.12,1.62,plM3); for(const x of [-.65,1.85]) boite(.06,.2,.04,0xd9480f,x,FOND+1.03,1.62,plM3);
  const bouee=new THREE.Group(); bouee.position.set(1.66,0,1.15); scene3d.add(bouee); cyl(.2,.3,.34,0xe03131,0,.1,0,bouee); cyl(.21,.25,.1,0xffffff,0,.16,0,bouee); cyl(.02,.02,.32,0x39424e,0,.42,0,bouee); boule(.05,0xffe066,0,.6,0,bouee);
  const amarre=fil(0x5c4a32,.018);

  /* Le son : un bip par cran, un « plouf » grave à chaque sac, le rebours */
  const TICS=[{t:sac+1.96,f:660},{t:sac+4.23,f:740},{t:sac+5.52,f:830}];
  for(const L of LACHE) TICS.push({t:L.tImp,f:190});
  for(let k=0;k<=8;k++) TICS.push({t:CH0+(CH1-CH0)*Math.sqrt((k+1)/9)-.01,f:Math.round(900*Math.pow(.86,k))});
  TICS.push({t:bal+5.92,f:130});
  for(let i=0;i<3;i++) TICS.push({t:q+11.2+i,f:760});

  poserMiniature(arguments[0],sit+9.6,'J’enlève un sac…<br>je descends ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  const film={ clips,FIN,tics:TICS,titre:'La montgolfière',ceinture:2,finTitre:acc+3.05,
    cuts:[sit,sit+3.84,q,sac,sac+.98,cal,cal+3.62,bal,bal+4.42,bal+6.1,c,f],groupes,finClip:'06-abonne',
    question:{ qc:'01q-question',rc:'01r-reponse',finR:sac,cpt:q+11.2,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+2.87,'J’enlève 3 sacs de sable.',[1.63,2.12,2.38,2.73,2.87].map(x=>q+x)],[q+4.28,q+4.88,'Quelle est mon altitude'+N+'?',[4.28,4.61,4.7,4.88].map(x=>q+x)]],
      pause:[[q+8.73,q+9.65,'Mets pause, et choisis'+N+'!',[8.73,8.9,9.54,9.65].map(x=>q+x)]],
      choix:[['<span class="pos">2</span>',6.58,6.93],['<span class="pos">8</span>',7.14,7.58],['<span class="pos">5</span>',7.86,8.39]],
      tete:[[r+.1,'Réponse '],[r+.62,'B'+N+':']],
      reponse:[[r+1.05,r+1.05,'8'+N+'!',[r+1.05]]],suite:[[r+2.36,r+2.8,'Regarde.']] },

    jouer(P,T,cam){
      /* Un fondu entre le plouf et la question finale : plus de coupe sèche */
      { const u=T<c?lisse((T-c+.35)/.35):1-lisse((T-c)/.4); FONDU.style.opacity=(T>c-.35&&T<c+.4)?String(u):'0'; }
      const vise=(x,yW,Y,d,e=.04)=>{ cam.x=x; cam.y=yW+(Y-960)/(2637/d); cam.d=d; cam.e=e; };
      scene.taille=.55; scene.cacherOmbre=true; scene.z=0;

      /* ---- Où est la nacelle, où est Ti Margo ---- */
      const n=altitude(T), dansEau=T>=bal+5.9&&T<c;
      const kEau=dansEau?lisse((T-bal-5.9)/.14):0;
      const vent=Math.sin(T*.6)*.035;
      let yNac=n*H+Math.sin(T*1.15)*.03, xNac=vent, yTM=yNac, xTM=vent;
      if(T<acc+3.2){ yNac=.4+hVague(.3,T)*.8; yTM=yNac; }
      if(dansEau){ const t=T-bal-5.95, reb=t>0?.5*Math.exp(-t*3)*Math.cos(t*7):0; yNac=-.42+reb*.45+hVague(.4,T); xNac=.18*kEau; yTM=n*H+hVague(-1.8,T)*.6; xTM=-1.85*kEau; }
      else if(T>=bal+5.82&&T<bal+5.9) { yNac=Math.max(yNac,-.42); }
      nac.position.set(xNac,yNac,0);
      scene.x=xTM; scene.y=yTM; scene.ySol=yTM; scene.ry=-.12;

      /* ---- Les gestes ---- */
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const montre=()=>{ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.08; P.regY=.3; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const versSac=(x=.5)=>{ P.gesteD='index'; P.md.set(Math.max(-.9,Math.min(1.3,x/.55)),1.72,1.42); P.cd.set(.8,1.82,.5); P.tx=.17; P.tetX=.2; P.regY=.1; };
      const verEchelle=()=>{ scene.ry=-.72; P.gesteD='index'; P.md.set(.5,2.3,1.12); P.cd.set(.52,1.9,.42); P.tetY=-.12; P.regY=-.25; P.tetX=-.05; };
      const auBord=()=>{ P.gesteD='poing'; P.md.set(1.05,1.72,1.1); P.cd.set(.98,1.7,.35); P.mg.set(-1.05,1.72,1.1); P.cg.set(-.98,1.7,.35); };

      /* ---- Les plans ---- */
      if(T<acc+3.06){ /* Le salut : amarré à sa bouée, juste au-dessus de l'eau */
        vise(.12,.4,1300,9.2-.5*lisse((T-acc)/3));
        if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; } else ouvre();
      }
      else if(T<acc+5.57){ /* Il largue l'amarre : la montgolfière s'envole et se dévoile */
        const u=lisse((T-acc-3.06)/2.2); vise(-.1-.5*u,yNac,1050+500*u,8.7+15.3*u);
        if(T<acc+3.5){ P.gesteD='ouverte'; P.md.set(1.05,1.75,.95); P.cd.set(.9,1.7,.3); P.tetX=.15; P.regY=.3; }
        else { montre(); P.tetX=-.2; P.mg.set(-.92,2.7,.3); P.cg.set(-.9,1.95,.1); P.jaw=Math.max(P.jaw,.5); }
      }
      else if(T<acc+8.47){ /* Enlever, ça fait baisser ? Il soupèse un sac */
        const u=lisse((T-acc-5.57)/2.9); vise(.12,yNac,1520,13.2-2.8*u);
        versSac(.5); P.tetZ=.14+Math.sin(T*2.4)*.04; P.mg.set(-.5,2.52,.72); P.cg.set(-.8,1.8,.3); P.regX=-.2; P.qSway=Math.sin(T*3)*.3;
        if(T>=acc+7.12) { P.sautY=-.0; P.tetX=.3; }
      }
      else if(T<sit){ /* Le pari : la caméra s'approche */
        const u=lisse((T-acc-8.47)/1.8); vise(.15,yNac,1700,10.2-3.1*u); scene.ry=-.14+Math.sin(T*2)*.05; pouce(); P.jaw=Math.max(P.jaw,.3); P.tetZ=-.14+Math.sin(T*3.1)*.05;
      }
      else if(T<sit+1.7){ /* L'altitude se lit sur l'échelle */
        const u=lisse((T-sit)/1.7); vise(-1.75,yNac,1150+60*u,19.5-1.4*u); verEchelle();
      }
      else if(T<sit+3.84){ /* Regarde ma nacelle */
        const u=lisse((T-sit-1.7)/1.2); vise(-1.75+1.8*u,yNac,1210+230*u,18-8.3*u);
        versSac(.3); P.mg.set(-.7,2.2,.6);
      }
      else if(T<sit+7.62){ /* Les ballons */
        const u=lisse((T-sit-3.84)/3.2); vise(1.05,yNac+2.1,1010,8.7-.6*u);
        scene.ry=.34; P.gesteD='index'; P.md.set(1.08,2.72,.44); P.cd.set(.86,2,.12); P.tetY=.28; P.regY=.32; P.tetX=-.18;
        if(T>=sit+6.2){ const v=lisse((T-sit-6.2)*3)*.06; P.sautY=v*(1+Math.sin(T*11)); P.jaw=Math.max(P.jaw,.3); }
      }
      else if(T<q){ /* Les sacs */
        const u=lisse((T-sit-7.62)/3.5); vise(.05-.35*u,yNac,1130,7.9-.4*u);
        versSac(-.3); P.mg.set(-.92,1.74,1.2); P.cg.set(-.92,1.75,.4); P.ty=-.02;
        if(T>=sit+10.18){ P.tx=.26; P.tetX=.26; P.ecrase=.04; }
      }
      else if(T<r){ /* La question : il réfléchit, une mouette passe */
        const u=(T-q)/(r-q); vise(-.35+.75*u,yNac,1530,11-1.2*lisse(u));
        scene.ry=-.12+Math.sin(T*.7)*.06; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35-.7*lisse((T-q-3.6)/5); P.qSway=Math.sin(T*3)*.3;
      }
      else if(T<sac){ /* La réponse : il saute de joie */
        const u=lisse((T-r)/3.8); vise(.4-.2*u,yNac,1530,9.8+.5*u);
        if(T<r+2.36){ const t=T-r-1.05; if(t>=0&&t<.7){ P.sautY=Math.sin(t/.7*Math.PI)*.14; ACTIONS.eureka.f(t,P); } else ouvre(); }
        else versSac(.8);
      }
      else if(T<sac+.98){ /* De tout près : il dénoue le premier sac */
        vise(.34,yNac,1420,6.9); versSac(.84); P.tetZ=-.06;
      }
      else if(T<sac+5.8){ /* Plan large : le sac tombe, plouf, la montgolfière monte d'un cran */
        const u=lisse((n-5)/3); vise(-.85,0,1500,27+6.5*u);
        if(T>=sac+3.0&&T<sac+3.6) versSac(.28); else if(T>=sac+4.3&&T<sac+4.9) versSac(-.28); else { auBord(); P.tetX=.24; P.regX=.2; }
      }
      else if(T<cal){ /* J'ai enlevé, et je suis monté ! */
        const u=lisse((T-sac-5.8)/1.5); vise(-.85+1.05*u,yNac,1000+(1480-1000)*u,33.5-22*u);
        if(T>=sac+7.16){ const j=P.jaw; ACTIONS.eureka.f(T-sac-7.16,P); P.jaw=Math.max(j,.5); P.mg.set(-1.08,2.92,.25); P.cg.set(-.92,2.02,.04); }
        else { ouvre(); P.tetZ=.16; P.regX=-.25; P.tetX=-.05; }
      }
      else if(T<cal+3.62){ /* Sous l'eau : les trois sacs au fond, et les poissons qui regardent */
        const u=(T-cal)/3.62; vise(.6+.05*u,FOND,1400,8.9-.4*u,.02);
      }
      else if(T<cal+8.17){ /* La formule : il montre l'échelle, de 5 à 8 */
        const u=(T-cal-3.62)/4.55; vise(-1.9,YN(5),1410-15*u,16.8-.4*u);
        verEchelle(); P.md.y=2.3-.5*(1-lisse((T-cal-6.5)*2)); P.tetX=.05-.2*lisse((T-cal-6.5)*2);
      }
      else if(T<bal){ /* Comme ajouter 3 : la flèche bleue monte de 5 à 8 */
        const u=lisse((T-cal-8.17)/3); vise(-1.9,YN(5),1395,16.4-.3*u);
        if(T>=cal+10.51) pouce(); else verEchelle();
      }
      else if(T<bal+2.1){ /* Et si j'enlève les 9 ballons ? Il les compte, l'air de rien */
        const u=lisse((T-bal)/2.1); vise(.75,yNac,1380,8.8-.5*u);
        scene.ry=.3; P.gesteD='index'; P.md.set(1.05,2.65+Math.sin(T*6)*.12,.46); P.cd.set(.86,1.98,.12); P.tetY=.26; P.regY=.32; P.tetX=-.16; P.paupiere=-1.1;
      }
      else if(T<bal+4.42){ /* Les deux mains sur les nœuds */
        const u=lisse((T-bal-2.1)/2.3); vise(.05,yNac,1450-40*u,10.4-1.4*u);
        auBord(); P.mg.x=-1.12; P.md.x=1.12; P.gesteD='poing'; if(T>=bal+3.4){ P.paupiere=-1.15; P.tetZ=-.1; P.regY=0; P.tx=.06; } else { P.regY=.34; P.tetY=.26; }
      }
      else if(T<bal+6.1){ /* Plan large : les ballons s'en vont, un cran par ballon, jusqu'au plouf */
        const ch=T>=bal+5.9?Math.exp(-(T-bal-5.9)*5)*.2:0; vise(-.85,Math.sin(T*43)*ch,1440,33.5);
        scene.ry=-.08; P.gesteD='ouverte'; P.md.set(.92,3.3,.25); P.cd.set(.98,2.5,.1); P.mg.set(-.92,3.3,.25); P.cg.set(-.98,2.5,.1); P.paupiere=-1.25; P.jaw=Math.max(P.jaw,.6); P.qEnroule=.72; P.qSway=Math.sin(T*9)*.5;
      }
      else if(T<c){ /* Dans l'eau à −1 ; un poisson lui pince la queue */
        const u=lisse((T-bal-6.1)/3.5); vise(-1.92,0,920,16.8-.3*u);
        scene.ry=.1+Math.sin(T*1.2)*.06; P.gesteD='ouverte'; P.qSway=Math.sin(T*5)*.4;
        P.md.set(1.0,2.5+Math.sin(T*7)*.18,.42); P.cd.set(.92,2.15,.2); P.mg.set(-1.0,2.5-Math.sin(T*7)*.18,.42); P.cg.set(-.92,2.15,.2);
        P.tetZ=Math.sin(T*2.1)*.06; P.paupiere=-1.2;
        const ai=T-bal-7.11; if(ai>=0&&ai<.75){ P.sautY=Math.sin(Math.min(1,ai/.5)*Math.PI)*.42; P.jaw=Math.max(P.jaw,.72); P.paupiere=-1.35; P.qEnroule=.6; P.md.y=3.1; P.mg.y=3.1; }
        if(T>=bal+7.9){ P.tetX=.14; P.regX=.25; }
      }
      else if(T<f){ /* À toi : une nouvelle montgolfière, à l'altitude 2 */
        const u=lisse((T-c-.2)/9); vise(-1.35,0,1345,20.3-.5*u);
        scene.ry=-.12+Math.sin(T*.9)*.06;
        if(T<c+2.8) montre(); else if(T<c+4.9) versSac(0); else if(T<c+7.2){ scene.ry=.3; montre(); P.tetY=.26; P.tetX=-.15; } else if(T<c+9.6){ ouvre(); P.tetZ=.14; } else pouce();
      }
      else { /* La fin : sous l'écran de fin */
        vise(.25,yNac,1730,9.1+Math.sin((T-f)*.5)*.2); scene.ry=-.14+Math.sin(T*1.4)*.05; T-f<2.35?ouvre():pouce();
      }

      /* La miniature : serré, ballons rapprochés, les « −1 » bien lisibles */
      const MINI=!!window.MINI;
      if(MINI){ nac.position.set(0,5,0); yNac=5; xNac=0; scene.x=0; scene.y=5; scene.ySol=5; scene.ry=-.1; P.jaw=.62; pouce(); P.md.set(1.0,2.5,.45); cam.x=0; cam.d=6.9; cam.y=5+(1540-960)/(2637/6.9); cam.e=.03; panneau.style.display='none'; }

      /* ---- Les ballons ---- */
      const labB=MINI||T>=sit+5.07;
      const onde=(t0,i,l=.06)=>Math.exp(-Math.pow((T-t0-i*l)*7,2));
      const tire=(T>=sit+6.2&&T<sit+7.62)?.1*lisse((T-sit-6.2)*3)*(1+Math.sin(T*9)*.4):0;
      const MP=[[.97,1.75,.5],[1.0,2.3,.1],[.5,2.65,.4],[.95,2.95,0],[1.6,1.8,0],[-.98,1.75,.5],[-1.02,2.3,.1],[-.5,2.75,.4],[-1.05,2.95,0]];
      for(const B of BALS){ const i=B.i, seul=T>=c&&i===8; B.g.visible=!seul; B.brin.visible=!seul; if(seul) continue;
        const ox=Math.sin(T*1.3+i*1.7)*.05, oy=Math.sin(T*1.7+i*2.3)*.05;
        const t0=T<c?departB(i):1e9, parti=T>=t0;
        let bx,by,bz=B.z;
        if(MINI){ bx=MP[i][0]; by=5+MP[i][1]; bz=MP[i][2]; }
        else if(parti){ const t=T-t0, yd=altitude(t0)*H+B.y; by=yd+.9*t+1.6*t*t; bx=vent+B.x+Math.sin(t*2+i)*.32+(B.x>0?.22:-.22)*t; }
        else { bx=xNac+B.x+ox; by=yNac+B.y+oy+tire; }
        const z=1+(.28*(onde(sit+4.45,i)+onde(sit+5.07,i,.03)+onde(bal+.96,i)+onde(bal+2.6,i,.03)+onde(c+5.42,i,.04)))*(T<CH0||T>=c?1:0);
        B.g.position.set(bx,by,bz); B.g.scale.setScalar(z); B.lab.visible=labB;
        if(parti) tendre(B.brin,bx,by-.42*z,bz,bx+Math.sin(T*4+i)*.08,by-1.05,bz);
        else tendre(B.brin,bx,by-.42*z,bz,xNac+(B.x>0?1.2:-1.2),yNac+HN,(B.z>0?.75:0)); }

      /* ---- L'enveloppe : elle se dégonfle et s'étale sur l'eau ---- */
      const dg=T>=CH0&&T<c?lisse((T-CH0-.1)/.85):0, kDr=T>=bal+5.75&&T<c?lisse((T-bal-5.75)/.3):0;
      const defl=Math.max(dg*.85,kDr);
      env.position.set(1.05*kDr,ZG-(ZG-.55)*kDr-.2*dg*(1-kDr),-1.3*kDr);
      env.rotation.z=-.25*dg*(1-kDr);
      env.scale.set(1+.22*defl,1-.8*defl,1-.25*defl);
      flamme.visible=!defl&&!MINI; flamme.scale.set(1,1+.25*Math.sin(T*23)+.15*Math.sin(T*37),1);
      for(const C of cordes){ C.m.visible=kDr<.5; tendre(C.m,C.x,HN,C.z,env.position.x+C.x*.33*(1-defl*.2),env.position.y-.14,env.position.z+C.z*.33); }

      /* ---- Les sacs ---- */
      const labS=MINI||T>=sit+9.04, enC=T>=c;
      SACS.forEach((S,i)=>{ const reserve=i>=4; S.g.visible=!reserve||enC; if(!S.g.visible) return;
        const hx=enC?X6[i]:X4[i], ech=enC?.8:1; let x=xNac+hx+Math.sin(T*1.1+i)*.012, y=yNac+.36+(enC?.05:0), ro=Math.sin(T*1.6+i*1.4)*.025, z=1.04;
        const L=!enC&&LACHE.find(l=>l.i===i);
        if(L&&T>=L.t){ const t=T-L.t;
          if(T<L.tImp){ x=vent+L.x0; y=L.y0-.5*G_CH*t*t; ro=t*.9; }
          else { const s=T-L.tImp, yR=FOND+.3, chute=Math.min(1,s/1.15); y=Math.max(yR,-2.4*s); x=vent+L.x0+(L.rest-L.x0-vent)*lisse(s/1.15); z=1.04+.58*lisse(s/.9); ro=(1-lisse(s/1.15))*(L.tImp-L.t)*.9; } }
        const onS=1+.26*((L?0:0)+onde(sit+8.21,i,.08)+onde(sit+9.04,i,.04)+(enC?onde(c+3.67,i,.05):0)+(i<3&&!enC?0:0));
        const puls=(T>=cal+.45&&T<cal+1.3&&L)?1+.3*Math.exp(-Math.pow((T-cal-.75)*5,2)):1;
        const tir=(T>=sit+10.18&&T<q)?-.08*(1+Math.sin(T*9)*.4):0;
        S.g.position.set(x,y+tir,z); S.g.rotation.z=ro; S.g.scale.setScalar(ech*onS*puls); S.lab.visible=labS; });
      if(MINI){ X4.forEach((x,i)=>{ SACS[i].g.position.set(x,5.36,1.04); SACS[i].g.rotation.z=0; SACS[i].g.scale.setScalar(1); }); }

      /* ---- L'amarre et la bouée ---- */
      bouee.visible=T<acc+6; bouee.position.y=hVague(1.66,T)*.8;
      amarre.visible=T<acc+3.5;
      if(amarre.visible){ const u=lisse((T-acc-3.06)/.4); tendre(amarre,xNac+1.2,yNac+HN-(.35)*u,.85,1.66,bouee.position.y+.28,1.15); }

      /* ---- Le curseur et l'échelle ---- */
      const yC=(T<acc+3.2)?.4:yTM, xBord=dansEau?xTM-.2:xNac-LN/2;
      barreC.position.set((XMAT+.5+xBord)/2,yC,ZM); barreC.scale.x=Math.max(.02,xBord-XMAT-.5); pointeC.position.set(XMAT+.42,yC,ZM+.01);
      const echelleVue=(T>=acc+4.7&&T<acc+5.57)||(T>=sit&&T<sit+2.6)||(T>=sac+.98&&T<sac+6.4)||(T>=cal+3.62&&T<bal)||(T>=bal+4.42&&T<f);
      barreC.visible=pointeC.visible=!MINI&&echelleVue;
      for(let v=-1;v<=9;v++){ let z=1+.3*lisse(1-Math.abs(n-v)*1.8); if(T>=cal+3.62&&T<bal){ const p=v===5?Math.exp(-Math.pow((T-cal-3.76)*2.6,2)):(v===8?Math.exp(-Math.pow((T-cal-7.1)*2.6,2)):0); z+=.42*p; if(v===5&&T>=cal+8.17) z=1.3; } PL[v].scale.set(z,z,1); }
      drapeau.scale.y=1+.1*Math.sin(T*7); drapeau.rotation.y=Math.sin(T*4)*.28;
      if(T>=sit+6.2&&T<sit+7.62){ const e=lisse((T-sit-6.2)*2.4)*.55; for(const [i,x] of [[0,2.1],[1,-2.1]]) flB[i].poser(xNac+x,yNac+3.3+tire,yNac+3.3+tire+e); }
      else for(const a of flB) a.g.visible=false;
      if(T>=sit+10.18&&T<q){ const e=lisse((T-sit-10.18)*2.4)*.42; for(const [i,x] of [[0,-.6],[1,.6]]) flS[i].poser(xNac+x,yNac-.14,yNac-.14-e); }
      else for(const a of flS) a.g.visible=false;
      /* La flèche +3, de 5 à 8 */
      const v3=T>=cal+9.81&&T<bal; fl3.g.visible=v3; pl3.visible=T>=cal+10.51&&T<bal;
      if(v3){ const e=lisse((T-cal-9.81)/.7); fl3.poser(-2.32,YN(5),YN(5)+e*(3*H-.16)); }
      plM3.visible=T>=cal+2.17&&T<cal+3.62;

      /* ---- Les gerbes d'eau ---- */
      for(const {s,d} of GOUTTES){ const t=T-s.t, on=t>=0&&t<1.3; d.forEach((D,j)=>{ if(!on){ D.m.visible=false; return; } const y=D.vy*t-5.2*t*t; D.m.visible=y>-.1; D.m.position.set(s.x+D.vx*t,y,1.56); }); }

      /* ---- La mer vivante ---- */
      { const p=geoMer.attributes.position, e=geoEcume.attributes.position; for(let i=0;i<=NV;i++){ const x=p.getX(i), h=hVague(x,T); p.setY(i,7+h); e.setY(i,h+.045); e.setY(i+NV+1,h-.045); } p.needsUpdate=true; e.needsUpdate=true; }
      /* Sa couleur reste franche à la surface */
      for(const A of algues) A.l.forEach((b,j)=>{ b.position.x=Math.sin(T*1.5+A.i+j*.8)*.05*(j+1); b.rotation.z=Math.sin(T*1.5+A.i+j*.8)*.16; });
      for(const F of FISH){ const L=22, x=(((F.o+F.v*T)%L)+L)%L-11; F.g.position.set(x-1,F.y+Math.sin(T*1.3+F.o)*.08,F.z); F.g.rotation.y=F.v<0?Math.PI:0; F.qu.rotation.y=Math.sin(T*12)*.5; }
      { const vu=T>=bal+6.1&&T<c; dent.g.visible=vu; if(vu){ const a=bal+7.05, xV=T<a?2.6+(-1.1-2.6)*lisse((T-bal-6.15)/.95):(T<a+.12?-1.1:-1.1+6*(T-a-.12)*(T-a-.12)+2.2*(T-a-.12)); dent.g.position.set(xV,-.98+Math.sin(T*6)*.02,.42); dent.g.rotation.y=T<a+.12?Math.PI:0; dent.qu.rotation.y=Math.sin(T*16)*.6; } }
      bulles.forEach((b,i)=>{ const L=FOND*-1, v=.45+((i*3)%5)*.12; const u=((T*v+i*.73)%L+L)%L; b.position.y=FOND+u; b.position.x=((i*1.37)%7)-2.4+Math.sin(T*2+i)*.06; });
      nuages.forEach(N1=>{ N1.g.position.x=((N1.x0+18+T*N1.v)%44+44)%44-22; });
      voilier.position.x=-16+T*.09; voilier.position.y=hVague(2,T)*.4; voilier.rotation.z=Math.sin(T*1.1)*.04;
      /* La mouette : pendant la question elle passe derrière lui ; dans les plans larges, elle file au loin */
      { let v=false; const passe=(a,b,x0,x1,y,z)=>{ if(T>=a&&T<b){ v=true; const u=(T-a)/(b-a); mouette.position.set(x0+(x1-x0)*u,y+Math.sin(T*2.2)*.12,z); mouette.rotation.y=x1>x0?0:Math.PI; } };
        passe(q+3.4,q+9.4,4.2,-4.2,yNac+1.25,-1.6); passe(sac+1,sac+5.8,-8,6,5.2,-1.2); passe(acc+5.6,acc+8.4,-4,4.5,yNac+2.6,-1.4); passe(bal+6.1,bal+9.6,3.2,-3.8,2.4,-1.2);
        mouette.visible=v&&!MINI; const b=Math.sin(T*15)*.6; aileA.rotation.x=b; aileB.rotation.x=-b; }

      if(MINI) return;

      /* ---- Le panneau du bas ---- */
      const voirP=T>=sit&&T<f;
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        const ch=T>=CH0&&T<c, v=ch?Math.round(n):Math.floor(n+.001), lu=(T<sit+1.34)||(T>=c&&T<c+2.05);
        const e=$('valN'); e.textContent=lu?'':(v<0?'−':'')+Math.abs(v);
        e.style.color=v<0?'#ff922b':(v>0?'#74c0fc':'#8ce99a');
        let lst=[]; for(const [deb,l] of FORMULES) if(T>=deb) lst=l;
        const fm=$('formule'); jetons(fm,lst,T); fm.style.fontSize=(T>=c?54:(T>=sit+3.84&&T<q?66:(T>=q&&T<sac?66:74)))+'px';
      }
    } };
  return film;
};
