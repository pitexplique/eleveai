/* ============================================================
   ÉPISODE 06 : LE GECKO DANS LA NEIGE. −6 + 9 = 3, (−4) × 2 = −8, 3 + (−8) = −5.
   La montagne, du matin au soir ; le grand thermomètre planté dans la neige est le calcul :
   son mercure bouge exactement avec la voix. Le gag : à −5, Ti Margo finit en glaçon.
   ============================================================ */
FILMS.probleme=function({el,$,mots,jetons,panneau,carte,legende,fin,lisse}){
  /* ---- Les clips : tout le reste en découle ---- */
  const acc=.4,sit=16.8,q=24.9,r=39.1,bai=47.6,gla=61.7,c=68.7,f=82.3,FIN=89.2;
  const clips=[['00-accroche',acc],['01-situation',sit],['01q-question',q],['01r-reponse',r],['02-baisse',bai],['03-glacon',gla],['05-question',c],['06-abonne',f]];

  /* ---- Les légendes : chaque mot écrit à l'instant exact où il est dit ---- */
  const N=' ';
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([t,l])=>[base+l[0],base+l[l.length-1],t,l.map(x=>base+x)])});
  const groupes=[
    G(acc,.1,acc+3.7,410,[['Salut'+N+'!',[.1]],['Moi, c’est Ti Margo.',[1.46,2.0,2.23,2.41]]]),
    G(acc,3.75,acc+7.55,60,[['Je suis un gecko,',[3.8,4.02,4.31,4.51]],['et je n’ai jamais vu la neige.',[5.17,5.3,5.46,5.64,5.98,6.13,6.28]]]),
    G(acc,7.58,acc+10.2,60,[['Alors me voilà à la montagne.',[7.61,7.97,8.13,8.5,8.59,8.73]]]),
    G(acc,10.22,acc+12.95,60,[['Mais le froid,',[10.25,10.48,10.63]],['je déteste'+N+'!',[11.2,11.41]]]),
    G(acc,12.97,sit-.05,60,[['Tu paries que je tiens jusqu’au soir'+N+'?',[13.0,13.17,13.55,13.73,13.91,14.22,14.66]]]),
    G(sit,.1,sit+4.3,60,[['Au réveil, il fait −6 degrés.',[.1,.23,.99,1.14,1.62,1.87]],['Brrr'+N+'!',[3.23]]]),
    G(sit,4.32,q-.05,60,[['Dans la matinée,',[4.35,4.59,4.74]],['ça monte de 9 degrés.',[5.51,5.73,6.03,6.2,6.41]]]),
    G(r,2.68,r+4.98,60,[['−6 + 9.',[3.05,3.39,3.74]]],84),
    G(r,5.0,bai-.05,60,[['Je peux enfin faire',[5.03,5.25,5.45,5.86]],['un bonhomme de neige.',[6.2,6.31,6.72,6.86]]]),
    G(bai,.1,bai+3.38,60,[['Mais l’après-midi,',[.1,.32]],['le ciel se couvre.',[1.27,1.46,1.81,2.02]]]),
    G(bai,3.4,bai+7.45,60,[['Ça baisse de 4 degrés par heure,',[3.41,3.66,3.95,4.09,4.45,4.83,5.06]],['pendant 2 heures.',[5.57,5.98,6.16]]],56),
    G(bai,7.47,bai+10.5,60,[['(−4) × 2'+N+': −8.',[7.84,8.17,8.51,9.29]]],84),
    G(bai,10.52,gla-.05,60,[['3 + (−8)'+N+': −5.',[10.56,10.85,11.5,12.4]]],84),
    G(gla,.1,gla+2.08,60,[['−5 degrés'+N+'!',[.43,.75]]],84),
    G(gla,2.1,gla+4.25,60,[['Je ne sens plus ma queue.',[2.13,2.35,2.5,2.73,2.95,3.12]]]),
    G(gla,4.27,c-.05,60,[['Je suis un glaçon'+N+'!',[4.29,4.51,4.8,5.0]]],76),
    G(c,.1,f-.05,60,[['À toi'+N+':',[.1,.21]],['cette nuit, on part de −5 degrés.',[.7,1.01,1.5,1.62,1.88,2.28,2.59]],['Ça baisse encore de 2 degrés',[3.96,4.21,4.54,4.96,5.11,5.28]],['par heure, pendant 3 heures.',[5.66,5.89,6.39,6.82,7.07]],['Quelle température fera-t-il'+N+'?',[8.42,8.67,9.38]],['Réponds en commentaire'+N+'!',[11.05,11.5,11.62]]],50)
  ];

  /* ---- La formule du panneau ---- */
  const NEG=s=>`<span class="neg">${s}</span>`, POS=s=>`<span class="pos">${s}</span>`, OK=s=>`<span class="ok">${s}</span>`;
  const FORMULES=[
    [sit,[[sit+1.62,NEG('−6')+' '],[sit+5.73,POS('+')+' '],[sit+6.2,POS('9')+' '],[q+1.63,'= ?']]],
    [r,[[r,NEG('−6')+' '],[r,POS('+')+' '],[r,POS('9')+' '],[r,'= '],[r+1.05,OK('3')]]],
    [r+2.66,[[r+2.72,NEG('−')],[r+3.05,NEG('6')+' '],[r+3.39,POS('+')+' '],[r+3.74,POS('9')+' '],[r+4.6,'= '],[r+4.6,OK('3')]]],
    [bai+3.38,[[bai+4.09,NEG('−4')+' '],[bai+4.83,'par '],[bai+5.06,'heure, '],[bai+5.98,'2 '],[bai+6.16,'heures']]],
    [bai+7.45,[[bai+7.51,'('+NEG('−')],[bai+7.84,NEG('4')+') '],[bai+8.17,'× '],[bai+8.51,'2 '],[bai+8.96,'= '],[bai+8.96,NEG('−')],[bai+9.29,NEG('8')]]],
    [bai+10.5,[[bai+10.56,POS('3')+' '],[bai+10.85,'+ '],[bai+11.22,'('+NEG('−')],[bai+11.5,NEG('8')+') '],[bai+12.09,'= '],[bai+12.09,OK('−')],[bai+12.4,OK('5')]]],
    [c,[[c+2.28,NEG('−5')+' '],[c+4.21,'+ '],[c+4.21,'('+NEG('−')],[c+5.11,NEG('2')+') '],[c+6.39,'× '],[c+6.82,'3 '],[c+8.42,'= ?']]]
  ];

  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #ligneP{display:flex;align-items:center;gap:20px;}
    #ecranN{flex:none;width:256px;background:#10202b;border-radius:26px;border:6px solid #39424e;color:#ffe066;text-align:center;padding:2px 0 8px;}
    #ecranN small{display:block;font-size:25px;letter-spacing:2px;color:#cfd8dc;line-height:1.4;}
    #valN{display:block;font-size:76px;line-height:1.2;font-variant-numeric:tabular-nums;min-height:91px;white-space:nowrap;}
    #formule{flex:1;margin-top:0!important;min-height:0!important;}
    #cq .ligne{display:block;}`;
  document.head.append(css);
  panneau.innerHTML=`<div id="ligneP"><div id="ecranN"><small>TEMPÉRATURE</small><span id="valN"></span></div><div id="formule"></div></div>`;

  /* ---- La lumière du jour : le ciel (haut, milieu, horizon), la teinte du décor, le soleil sur Ti Margo ---- */
  const AUBE={h:[0x6d8fdc,0xf5b8ac,0xffe6c8],l:[1,.94,.93],s:2.0}, MATIN={h:[0x4aa8ec,0x9fd8f8,0xe9f7ff],l:[1,.98,.97],s:2.1},
    MIDI={h:[0x2f9df0,0x8fd2fa,0xe3f6ff],l:[1,1,1],s:2.2}, COUV={h:[0x74879c,0xa2b0bf,0xd2dae2],l:[.84,.87,.92],s:1.7},
    LOURD={h:[0x536174,0x7f8d9e,0xb4bfca],l:[.7,.75,.84],s:1.5}, NUIT={h:[0x0a1234,0x1b2a62,0x3d5694],l:[.4,.47,.72],s:1.15},
    AUBE2={h:[0x6fb4ee,0xffd3b0,0xfff0d0],l:[1,.97,.94],s:2.1};
  const CLES=[[0,AUBE],[sit+4.3,AUBE],[q,MATIN],[r+3.39,MATIN],[r+4.6,MIDI],[bai+.6,MIDI],[bai+3.2,COUV],[bai+10.85,COUV],[gla+.2,LOURD],[gla+5.7,LOURD],[c+.8,NUIT],[f-.001,NUIT],[f,AUBE2],[FIN+1,AUBE2]];
  const LUM=new THREE.Color(1,1,1), cA=new THREE.Color(), cB=new THREE.Color();
  const melange=(a,b,u)=>{ cA.setHex(a,THREE.LinearSRGBColorSpace); cB.setHex(b,THREE.LinearSRGBColorSpace); return '#'+cA.lerp(cB,u).getHexString(THREE.LinearSRGBColorSpace); };
  const ambiante=scene3d.children.find(o=>o.isAmbientLight);
  const MATS=new Map();
  /* Toutes les matières du décor passent par ici : la lumière du jour les teinte */
  const bm=k=>{ if(!MATS.has(k)) MATS.set(k,new THREE.MeshBasicMaterial({color:k})); return MATS.get(k); };
  const BASES=new Map();
  let cleCiel='';
  const lumiere=T=>{ let i=0; while(i<CLES.length-2&&T>=CLES[i+1][0]) i++; const [ta,A]=CLES[i], [tb,B]=CLES[i+1], u=Math.max(0,Math.min(1,(T-ta)/(tb-ta)));
    const s=[0,1,2].map(j=>melange(A.h[j],B.h[j],u)); const ch=`linear-gradient(${s[0]} 0%,${s[1]} 34%,${s[2]} 50%)`;
    if(ch!==cleCiel){ cleCiel=ch; document.body.style.background=ch; }
    LUM.setRGB(A.l[0]+(B.l[0]-A.l[0])*u,A.l[1]+(B.l[1]-A.l[1])*u,A.l[2]+(B.l[2]-A.l[2])*u);
    for(const [k,m] of MATS){ if(!BASES.has(k)) BASES.set(k,new THREE.Color(k)); m.color.copy(BASES.get(k)).multiply(LUM); }
    soleil.intensity=A.s+(B.s-A.s)*u; if(ambiante) ambiante.intensity=.72+.53*(LUM.g-.47)/.53; };

  /* ---- Les briques ---- */
  const boite=(w,h,d,k,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const cyl=(rh,rb,h,k,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(rh,rb,h,20),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const cone=(R,h,k,x,y,z,p=scene3d,seg=14)=>{ const m=new THREE.Mesh(new THREE.ConeGeometry(R,h,seg),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const boule=(R,k,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(R,20,14),bm(k)); m.position.set(x,y,z); p.add(m); return m; };
  const plaque=(txt,{w=1.1,h=.72,fond='#fffdf5',coul='#17452a',bord='#17452a',fs=.72,rond=false}={},x=0,y=0,z=0,p=scene3d)=>{
    const K=256, cv=document.createElement('canvas'); cv.width=Math.round(w*K); cv.height=Math.round(h*K); const g=cv.getContext('2d');
    const R=rond?cv.height/2:cv.height*.16;
    g.beginPath(); g.roundRect(8,8,cv.width-16,cv.height-16,R); g.fillStyle=fond; g.fill(); g.lineWidth=14; g.strokeStyle=bord; g.stroke();
    g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.font=`800 ${cv.height*fs}px "Segoe UI"`; g.fillText(txt,cv.width/2,cv.height*.54);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tx,transparent:true})); m.position.set(x,y,z); p.add(m); return m; };
  const signe=n=>(n<0?'−':(n>0?'+':''))+Math.abs(n), teinte=n=>n<0?'#d9480f':(n>0?'#1971c2':'#17452a');
  /* La flèche verticale : une barre et une pointe */
  const flecheV=(k,z)=>{ const g=new THREE.Group(); scene3d.add(g); const b=boite(.15,1,.03,k,0,0,z,g), p=new THREE.Mesh(new THREE.ConeGeometry(.25,.36,16),bm(k)); p.position.z=z; g.add(p);
    return {g,poser(x,y0,y1){ g.visible=true; const s=Math.sign(y1-y0)||1, L=Math.max(.02,Math.abs(y1-y0)-.16); b.position.set(x,y0+s*L/2,z); b.scale.y=L; p.position.set(x,y0+s*(L+.08),z); p.rotation.z=s>0?0:Math.PI; }}; };

  /* ---- La neige au sol, les congères, les traces de pas ---- */
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(9000,9000),bm(0xf4f9ff)); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const tache=(R,sx,k,x,z)=>{ const m=new THREE.Mesh(new THREE.CircleGeometry(R,32),bm(k)); m.rotation.x=-Math.PI/2; m.position.set(x,-.012,z); m.scale.x=sx; scene3d.add(m); };
  for(const [R,sx,x,z] of [[3,3,-5,-9],[2.2,3.4,7,-4],[2.6,2.4,-8,-3],[4,3,10,-16],[5,3.5,-14,-22],[5,4,16,-30],[1.6,2.6,1.6,2.4],[1.4,3,-2.8,2.6]]) tache(R,sx,0xddeaf8,x,z);
  /* Les congères, loin derrière */
  for(const [x,z,R,sy] of [[-9,-10,5,.28],[8,-13,6,.3],[-3,-19,8,.26],[15,-21,8,.32],[-18,-16,8,.3],[4,-27,11,.26],[-13,-30,12,.28],[22,-34,14,.3]]){ const m=boule(R,0xe9f2fc,x,0,z); m.scale.y=sy; }
  /* Les traces de Ti Margo, depuis le chalet */
  for(let i=0;i<12;i++){ const u=i/12, x=2.2-1.5*u+Math.sin(u*5)*.2+(i%2?.14:-.14), z=-4.6+4.7*u; const m=new THREE.Mesh(new THREE.CircleGeometry(.09,14),bm(0xc4d6ea)); m.rotation.x=-Math.PI/2; m.scale.y=1.5; m.position.set(x,-.006,z); scene3d.add(m); }

  /* ---- Les montagnes : des facettes, éclairées d'un côté, neige au sommet ---- */
  const matMont=new THREE.MeshBasicMaterial({vertexColors:true}); MATS.set('mont',matMont); BASES.set('mont',new THREE.Color(0xffffff));
  const montagne=(x,z,R,H,roche)=>{ const geo=new THREE.ConeGeometry(R,H,7,4).toNonIndexed(); const P_=geo.attributes.position, n=P_.count, cols=new Float32Array(n*3), L=new THREE.Vector3(-.6,.45,.66).normalize();
    const a=new THREE.Vector3(),b=new THREE.Vector3(),d=new THREE.Vector3(), rc=new THREE.Color(roche), nc=new THREE.Color(0xffffff), tmp=new THREE.Color();
    for(let i=0;i<n;i++){ const j=(i*7)%13; const px=P_.getX(i), py=P_.getY(i), pz=P_.getZ(i); const hauteur=(py+H/2)/H; const rd=Math.hypot(px,pz); if(hauteur>.02&&hauteur<.98){ const ang=Math.atan2(pz,px); const bruit=1+.09*Math.sin(ang*5+hauteur*19); P_.setX(i,px*bruit); P_.setZ(i,pz*bruit); } }
    for(let i=0;i<n;i+=3){ a.fromBufferAttribute(P_,i); b.fromBufferAttribute(P_,i+1); d.fromBufferAttribute(P_,i+2); const v1=b.clone().sub(a), v2=d.clone().sub(a), no=v1.cross(v2).normalize(); const om=.7+.42*Math.max(0,no.dot(L)); const hm=((a.y+b.y+d.y)/3+H/2)/H;
      const neige=hm>.56+.05*Math.sin(i*1.7); tmp.copy(neige?nc:rc).multiplyScalar(neige?Math.min(1,om+.12):om); for(let k=0;k<3;k++){ cols[(i+k)*3]=tmp.r; cols[(i+k)*3+1]=tmp.g; cols[(i+k)*3+2]=tmp.b; } }
    geo.setAttribute('color',new THREE.BufferAttribute(cols,3)); const m=new THREE.Mesh(geo,matMont); m.position.set(x,H/2-.5,z); scene3d.add(m); return m; };
  for(const [x,z,R,H,k] of [[-34,-85,30,34,0x6f7f96],[-6,-92,32,41,0x7d8ca3],[28,-88,30,30,0x6f7f96],[52,-95,34,37,0x7d8ca3],[-62,-95,34,38,0x7d8ca3],[-20,-60,18,15,0x8a97ac],[14,-62,20,13,0x8a97ac],[40,-60,18,17,0x8a97ac],[-46,-62,20,16,0x8a97ac]]) montagne(x,z,R,H,k);

  /* ---- Les sapins ---- */
  const sapin=(x,z,e=1)=>{ const g=new THREE.Group(); g.position.set(x,0,z); g.scale.setScalar(e); scene3d.add(g); cyl(.14,.18,.6,0x6b4423,0,.3,0,g);
    for(const [R,h,y,k] of [[1.05,1.25,.98,0x1f6f43],[.84,1.1,1.68,0x25804c],[.6,.95,2.34,0x2b9157]]){ cone(R,h,k,0,y,0,g,10); cone(R*.62,h*.5,0xffffff,0,y+h*.27,.02,g,10); }
    return g; };
  for(const [x,z,e] of [[-4.6,-3.8,1.2],[-3.5,-6.5,1.5],[-5.8,-6,1.7],[-.9,-5.6,1.15],[5.6,-3.2,1.3],[6.6,-5.4,1.7],[-7.5,-4,1.4],[8.2,-3.4,1.2],[-1.7,-8.8,1.6],[.6,-10,1.5],[5.2,-9,1.6],[-8.5,-8.5,1.8]]) sapin(x,z,e);
  /* La forêt au loin */
  for(let i=0;i<46;i++){ const x=-46+i*2.05+((i*i*5)%7)*.3, z=-24-((i*7)%11)*1.25, e=1.2+((i*3)%5)*.28; sapin(x,z,e); }

  /* ---- Le chalet ---- */
  const chalet=new THREE.Group(); chalet.position.set(3.0,0,-7); scene3d.add(chalet);
  boite(4.4,2.7,3.4,0xa8683a,0,1.35,0,chalet);
  for(let i=0;i<7;i++) boite(4.42,.035,.02,0x7c4a26,0,.3+i*.38,1.71,chalet);
  { const s=new THREE.Shape(); s.moveTo(-2.2,0); s.lineTo(2.2,0); s.lineTo(0,1.55); s.closePath(); const m=new THREE.Mesh(new THREE.ShapeGeometry(s),bm(0xb97a48)); m.position.set(0,2.7,1.7); chalet.add(m); }
  for(const s of [-1,1]){ const toit=boite(2.95,.16,3.9,0x6e4226,s*1.17,3.5,0,chalet); toit.rotation.z=-s*.6; const neige=boite(2.98,.2,3.96,0xffffff,s*1.2,3.68,0,chalet); neige.rotation.z=-s*.6; }
  for(let i=0;i<5;i++){ const gl=cone(.06,.3+((i*3)%3)*.12,0xcfeeff,-2+i*.95,2.4,1.92,chalet,8); gl.rotation.x=Math.PI; }
  boite(.95,1.75,.06,0x6e4226,-1.2,.875,1.72,chalet); boule(.06,0xffd43b,-.88,.85,1.76,chalet);
  const vitres=new THREE.MeshBasicMaterial({color:0xffe9a8});
  for(const [x,y] of [[.95,1.45],[0,3.3]]){ boite(1.05,1.05,.05,0xffffff,x,y,1.72,chalet); const v=new THREE.Mesh(new THREE.PlaneGeometry(.88,.88),vitres); v.position.set(x,y,1.76); chalet.add(v); boite(.05,.88,.02,0xffffff,x,y,1.77,chalet); boite(.88,.05,.02,0xffffff,x,y,1.77,chalet); }
  boite(.62,1.5,.62,0x8a4b32,1.25,4.2,-.4,chalet); boite(.72,.14,.72,0xffffff,1.25,4.98,-.4,chalet);
  const fumee=[0,1,2,3,4,5].map(i=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(.2,14,10),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,depthWrite:false})); m.position.z=-7.4; scene3d.add(m); return m; });
  /* La luge rouge et la barrière */
  { const g=new THREE.Group(); g.position.set(-.1,0,-2.3); g.rotation.y=.4; scene3d.add(g); boite(1.15,.08,.5,0xe03131,0,.3,0,g); for(const z of [-.2,.2]){ boite(1.45,.05,.05,0x39424e,0,.05,z,g); for(const x of [-.35,.35]) boite(.04,.26,.04,0x39424e,x,.17,z,g); } boite(.5,.04,.3,0xffffff,0,.36,0,g); }
  for(let x=-14;x<=14;x+=1.5){ if(x>.8&&x<5) continue; boite(.12,.95,.1,0x8b5a2b,x,.47,-3.6); boite(.14,.06,.13,0xffffff,x,.97,-3.6); }
  for(const [a,b] of [[-14,1],[5.2,14]]) for(const y of [.4,.72]) boite(b-a,.07,.05,0x9a6a3e,(a+b)/2,y,-3.56);

  /* ---- Le soleil, la lune, les étoiles, les nuages ---- */
  const astre=new THREE.Group(); astre.position.z=-105; scene3d.add(astre);
  { const m=new THREE.Mesh(new THREE.SphereGeometry(3.6,28,18),new THREE.MeshBasicMaterial({color:0xffdc4a})); astre.add(m); const h=new THREE.Mesh(new THREE.CircleGeometry(5.4,40),new THREE.MeshBasicMaterial({color:0xfff3b0,transparent:true,opacity:.45})); h.position.z=-3.7; astre.add(h);
    for(let i=0;i<10;i++){ const rayon=new THREE.Mesh(new THREE.BoxGeometry(.5,2.1,.1),new THREE.MeshBasicMaterial({color:0xffdc4a})); const a=i/10*Math.PI*2; rayon.position.set(Math.cos(a)*6.6,Math.sin(a)*6.6,-3.6); rayon.rotation.z=a-Math.PI/2; astre.add(rayon); } }
  const lune=new THREE.Group(); lune.position.set(8.6,11,-50); scene3d.add(lune);
  { lune.add(new THREE.Mesh(new THREE.SphereGeometry(1.9,28,18),new THREE.MeshBasicMaterial({color:0xfff6c8}))); const h=new THREE.Mesh(new THREE.CircleGeometry(3,36),new THREE.MeshBasicMaterial({color:0xfff6c8,transparent:true,opacity:.18})); h.position.z=-2; lune.add(h); for(const [x,y,R] of [[-.5,.5,.32],[.6,-.3,.42],[-.2,-.8,.22]]){ const t=new THREE.Mesh(new THREE.CircleGeometry(R,18),new THREE.MeshBasicMaterial({color:0xe8d98f})); t.position.set(x,y,1.75); lune.add(t); } }
  const matEt=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true});
  const etoiles=new THREE.Group(); etoiles.position.z=-110; scene3d.add(etoiles);
  for(let i=0;i<70;i++){ const m=new THREE.Mesh(new THREE.SphereGeometry(.13+((i*5)%4)*.05,6,5),matEt); m.position.set(-36+((i*37)%72),8+((i*23)%38),0); etoiles.add(m); }
  /* Les petits nuages du matin, puis la grande couche qui mange le ciel */
  const nuage=(x,y,z,e,k)=>{ const g=new THREE.Group(); g.position.set(x,y,z); g.scale.setScalar(e); scene3d.add(g); for(const [a,b,R] of [[0,0,1.05],[1.15,.1,.8],[-1.15,.05,.74],[.45,.58,.72],[-.5,.5,.6]]) boule(R,k,a,b,0,g); return g; };
  const petits=[[-16,18,-48,1.9],[8,23,-52,1.6],[21,15,-46,1.5]].map(([x,y,z,e],i)=>({g:nuage(x,y,z,e,0xffffff),x,v:.22+i*.06}));
  const COUCHE=[]; for(let i=0;i<20;i++){ const y=9+((i*7)%6)*4.3, x=-28+((i*11)%20)*2.95, s=i%2?1:-1; COUCHE.push({g:nuage(x+s*62,y,-46-((i*3)%5)*2,3.1+((i*5)%4)*.45,i%3?0xb3bdc9:0x9aa6b4),x,s,i}); }

  /* ---- Le lapin qui passe ---- */
  const lapin=new THREE.Group(); lapin.position.z=-1.5; scene3d.add(lapin);
  { const mB=toon(0xfff4e6), mR=toon(0xffb3c1); piece(lapin,ell(.24,.2,.17),mB,[0,.22,0],CONTOUR_SOMBRE); piece(lapin,ell(.15,.14,.13),mB,[.24,.36,0],CONTOUR_SOMBRE); for(const z of [-.06,.06]){ const o=piece(lapin,ell(.04,.15,.03),mR,[.21,.56,z],CONTOUR_SOMBRE); o.rotation.z=-.15; } piece(lapin,new THREE.SphereGeometry(.07,10,8),mB,[-.25,.27,0],CONTOUR_SOMBRE); piece(lapin,new THREE.SphereGeometry(.022,8,6),C.noir,[.3,.39,.11],null); }

  /* ---- Le grand thermomètre, planté dans la neige, de −15 à +10 ---- */
  const YT=v=>1.15+(v+15)*.24, XTUBE=-1.15, ZT=0;
  const thermo=new THREE.Group(); scene3d.add(thermo);
  boite(2.4,7.42,.12,0xfffdf5,-1.8,4.0,ZT,thermo); boite(2.54,.12,.2,0x17452a,-1.8,7.75,ZT,thermo); boite(2.54,.1,.2,0x17452a,-1.8,.3,ZT,thermo); for(const x of [-3.04,-.56]) boite(.1,7.5,.17,0x17452a,x,4.02,ZT,thermo);
  boite(2.75,.2,.46,0xffffff,-1.8,7.88,ZT,thermo);
  for(const x of [-2.6,-1.0]){ boite(.28,.5,.2,0x8b5a2b,x,.1,ZT,thermo); }
  { const m=boule(1.05,0xffffff,-1.8,-.1,.1,thermo); m.scale.set(1.75,.34,.65); }
  /* Les graduations : un trait par degré, une plaque tous les 5 */
  for(let v=-15;v<=10;v++){ const grand=v%5===0; boite(grand?.42:.22,grand?.05:.024,.02,grand?0x17452a:0x8795a4,XTUBE-.2-(grand?.2:.11),YT(v),ZT+.08,thermo); }
  for(let v=-15;v<=10;v+=5) plaque(signe(v),{w:1.12,h:.76,coul:teinte(v),bord:teinte(v),fs:.7},-2.32,YT(v),ZT+.09,thermo);
  /* Le tube, le mercure, le réservoir */
  cyl(.17,.17,6.45,0xdff1fb,XTUBE,4.1,ZT+.12,thermo); boule(.17,0xdff1fb,XTUBE,7.32,ZT+.12,thermo);
  const mercure=cyl(.105,.105,1,0xe03131,XTUBE,0,ZT+.3,thermo);
  boule(.43,0xdff1fb,XTUBE,.72,ZT+.1,thermo); boule(.34,0xe03131,XTUBE,.72,ZT+.28,thermo); boule(.08,0xffffff,XTUBE-.12,.84,ZT+.6,thermo);
  /* Les étiquettes de ce que dit la voix, à droite du tube */
  const XTAG=-.12, TAG={}; for(const v of [-6,3,-5]){ const co=teinte(v); TAG[v]=new THREE.Group(); scene3d.add(TAG[v]); plaque((v<0?'−':'')+Math.abs(v),{w:.86,h:.68,fond:'#fffdf5',coul:co,bord:co,fs:.72},XTAG,YT(v),ZT+.34,TAG[v]); const pte=new THREE.Mesh(new THREE.ConeGeometry(.17,.28,12),bm(0x2f9a3a)); pte.rotation.z=Math.PI/2; pte.position.set(XTAG-.56,YT(v),ZT+.34); TAG[v].add(pte); }
  /* Les pointillés, les flèches et leurs plaques */
  const XF=.62, XPF=1.42;
  const pointille=v=>{ const g=new THREE.Group(); scene3d.add(g); for(let i=0;i<6;i++) boite(.2,.03,.02,0x2f9a3a,XTUBE+.5+i*.34,YT(v),ZT+.33,g); return g; };
  const ptHaut=pointille(3), ptMil=pointille(-1), ptBas=pointille(-5);
  const flPlus=flecheV(0x1c7ed6,ZT+.36), fl1=flecheV(0xe8590c,ZT+.36), fl2=flecheV(0xe8590c,ZT+.36), flNuit=flecheV(0xe8590c,ZT+.36);
  const opl=(t,k)=>plaque(t,{w:.96,h:.7,fond:k<0?'#fff4e6':'#e7f5ff',coul:k<0?'#d9480f':'#1971c2',bord:k<0?'#d9480f':'#1971c2',fs:.68},0,0,ZT+.38);
  const plPlus=opl('+9',1), plM1=opl('−4',-1), plM2=opl('−4',-1), plM8=opl('−8',-1), plNuit=opl('−2',-1), plFois=plaque('× 3',{w:.98,h:.7,fond:'#fff4e6',coul:'#d9480f',bord:'#d9480f',fs:.62},0,0,ZT+.38);
  /* Le crochet du −8 */
  const croc=new THREE.Group(); scene3d.add(croc); { const k=0xd9480f, X=1.88; boite(.07,YT(3)-YT(-5),.03,k,X,(YT(3)+YT(-5))/2,ZT+.36,croc); for(const v of [3,-5]) boite(.2,.07,.03,k,X-.1,YT(v),ZT+.36,croc); }

  /* ---- Le bonhomme de neige : trois boules, un chapeau, une carotte ---- */
  const XB=2.72, ZB=-.6, mN=toon(0xdce8f4);
  const bonhomme=new THREE.Group(); bonhomme.position.set(XB,0,ZB); scene3d.add(bonhomme);
  const R1=.5,R2=.36,R3=.27, Y1=R1, Y2=Y1+(R1+R2)*.84, Y3=Y2+(R2+R3)*.84;
  const b1=piece(scene3d,ell(1,1,1),mN,[0,0,0],CONTOUR_SOMBRE), b2=piece(scene3d,ell(1,1,1),mN,[0,0,0],CONTOUR_SOMBRE), b3=piece(scene3d,ell(1,1,1),mN,[0,0,0],CONTOUR_SOMBRE);
  const visage=new THREE.Group(); visage.position.set(XB,Y3,ZB); scene3d.add(visage);
  for(const s of [-1,1]) piece(visage,new THREE.SphereGeometry(.042,10,8),C.noir,[s*.1,.07,R3*.92],null);
  { const m=new THREE.Mesh(new THREE.ConeGeometry(.055,.32,12),toon(0xf76707)); m.rotation.x=Math.PI/2; m.position.set(0,-.01,R3+.14); visage.add(m); for(let i=0;i<5;i++){ piece(visage,new THREE.SphereGeometry(.018,8,6),C.noir,[(i-2)*.05,-.1-.018*(2-Math.abs(i-2)),R3*.93],null); } }
  const boutons=new THREE.Group(); boutons.position.set(XB,0,ZB); scene3d.add(boutons); for(const dy of [-.14,.06,.24]) piece(boutons,new THREE.SphereGeometry(.035,10,8),C.noir,[0,Y2+dy-.05,R2*.93],null);
  const chapeau=new THREE.Group(); scene3d.add(chapeau); { const k=toon(0x1c2230); piece(chapeau,new THREE.CylinderGeometry(.24,.24,.04,20),k,[0,0,0],null); piece(chapeau,new THREE.CylinderGeometry(.15,.15,.3,20),k,[0,.16,0],null); piece(chapeau,new THREE.CylinderGeometry(.155,.155,.06,20),toon(0xe03131),[0,.05,0],null); }

  /* ---- Les flocons : la position ne dépend que de T ---- */
  const NF=120, FLOC=[]; const geoF=new THREE.SphereGeometry(1,8,6), matF=new THREE.MeshBasicMaterial({color:0xffffff});
  for(let i=0;i<NF;i++){ const m=new THREE.Mesh(geoF,matF); m.scale.setScalar(.032+((i*7)%5)*.009); scene3d.add(m); FLOC.push({m,x:-9+((i*53)%181)/10,z:-6+((i*29)%71)/10,v:.75+((i*11)%7)*.09,o:(i*97)%120/10,a:i*1.73}); }
  /* Le flocon de l'accroche, qui se pose sur son nez */
  const flocon1=new THREE.Mesh(geoF,matF); flocon1.scale.setScalar(.055); scene3d.add(flocon1);
  /* La buée qui sort de sa bouche */
  const BUEE=[0,1,2,3].map(()=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthWrite:false})); m.renderOrder=6; scene3d.add(m); return m; });
  const vT=new THREE.Vector3();

  /* ---- L'écharpe : elle fait partie du costume de montagne ---- */
  { const mE=toon(0xe03131), mE2=toon(0xffffff); const t=piece(tronc,new THREE.TorusGeometry(.2,.082,12,28),mE,[0,1.14,.0],CONTOUR_SOMBRE); t.rotation.x=Math.PI/2-.1;
    piece(tronc,new THREE.BoxGeometry(.17,.42,.06),mE,[.13,.86,.31],CONTOUR_SOMBRE); piece(tronc,new THREE.BoxGeometry(.17,.05,.065),mE2,[.13,.78,.31],null); piece(tronc,new THREE.BoxGeometry(.17,.05,.065),mE2,[.13,.92,.31],null); }

  /* ---- Le gel : le vert pâlit, la queue bleuit et se raidit ---- */
  const GELES=[[C.vert,0x86bc1c,0xb5e3e2],[C.vertFonce,0x2f9a3a,0x7fc4d6],[C.jaune,0xf6dc62,0xe4f4f2],[C.jauneVert,0xd3d73a,0xcdeee8]].map(([m,a,b])=>({m,a:new THREE.Color(a),b:new THREE.Color(b)}));
  for(const o of yeux) GELES.push({m:o.paup.material,a:GELES[0].a,b:GELES[0].b});
  const mQueue=C.vert.clone(), mesQ=racine.children.find(m=>m.geometry===queue.geo); if(mesQ) mesQ.material=mQueue;
  const mTaQ=C.vertFonce.clone(); for(const t of queue.taches) t.m.material=mTaQ;
  let raide=0; const FINQ=new THREE.Vector3(1.98,1.26,-.46), vQ=new THREE.Vector3();
  queue.maj=function(pts){ if(raide>0){ const b=pts[0], n=pts.length-1; pts.forEach((p,i)=>{ vQ.copy(b).lerp(FINQ,i/n); p.lerp(vQ,raide); }); } Tube.prototype.maj.call(this,pts); };
  const GLAC=[.55,.9,1.25,1.6].map((d,i)=>{ const m=new THREE.Mesh(new THREE.ConeGeometry(.045,.2+(i%2)*.09,8),new THREE.MeshBasicMaterial({color:0xd4f1ff})); m.rotation.x=Math.PI; m.position.set(d+.06,1.39-.13*d/1.92-.14,-.17-.29*d/1.92); racine.add(m); return m; });

  /* ---- Le bloc de glace : le bas sort de la neige, le haut tombe du ciel, clac ---- */
  const XG=.7+.33, ZG=.35, WG=2.16, HG=2.4, DG=1.6;
  const matG=new THREE.MeshBasicMaterial({color:0x9fdcfa,transparent:true,opacity:.36,depthWrite:false}), matAr=new THREE.MeshBasicMaterial({color:0xf2fbff,transparent:true,opacity:.85});
  const demi=(hb)=>{ const g=new THREE.Group(); scene3d.add(g); const m=new THREE.Mesh(new THREE.BoxGeometry(WG,hb,DG),matG); m.renderOrder=8; g.add(m);
    const ar=(w,h,d,x,y,z)=>{ const a=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),matAr); a.position.set(x,y,z); a.renderOrder=9; g.add(a); };
    for(const sx of [-1,1]) for(const sz of [-1,1]) ar(.035,hb,.035,sx*WG/2,0,sz*DG/2);
    for(const sy of [-1,1]) for(const sz of [-1,1]) ar(WG,.035,.035,0,sy*hb/2,sz*DG/2);
    for(const sy of [-1,1]) for(const sx of [-1,1]) ar(.035,.035,DG,sx*WG/2,sy*hb/2,0);
    return g; };
  const HB=HG*.5, blocBas=demi(HB), blocHaut=demi(HB), blocPlein=demi(HG); blocPlein.position.set(XG,HG/2,ZG);
  /* Les reflets et le givre, sur la face avant */
  const reflets=new THREE.Group(); scene3d.add(reflets);
  for(const [x,y,l,e] of [[.72,1.92,.8,.08],[.88,1.76,.46,.05],[-.86,.5,.6,.07],[-.96,.66,.34,.045]]){ const a=new THREE.Mesh(new THREE.PlaneGeometry(e,l),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.62,depthWrite:false})); a.position.set(XG+x,y,ZG+DG/2+.01); a.rotation.z=-.6; a.renderOrder=9; reflets.add(a); }
  /* Le chapeau de neige du bloc, posé après le clac */
  const debris=[[-.9,.5,.34],[.5,.8,.26],[1.3,.25,.38],[-1.35,-.3,.24],[1.75,.7,.22],[-.3,1.05,.2],[.2,-.45,.3],[-1.8,.55,.2],[2.1,.1,.24]].map(([x,z,e],i)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(e*1.3,e*.8,e),new THREE.MeshBasicMaterial({color:0xb6e6fc,transparent:true,opacity:.72,depthWrite:false})); m.position.set(.7+x,e*.3,.35+z); m.rotation.set(i*.7,i*1.3,i*.4); m.renderOrder=7; scene3d.add(m); return m; });

  /* ---- La température : elle ne bouge que quand le calcul parle ---- */
  const T1A=r+3.39, T1B=r+4.6, T2A=bai+10.85, T2B=bai+12.4;
  const temperature=T=>{ if(T<T1A) return -6; if(T<T1B) return -6+9*lisse((T-T1A)/(T1B-T1A)); if(T<T2A) return 3; if(T<T2B) return 3-8*lisse((T-T2A)/(T2B-T2A)); return -5; };
  /* Le son : un bip par degré franchi, le rebours, le « ting » de la queue, le clac du glaçon */
  const TICS=[];
  for(const [a,b] of [[T1A,T1B],[T2A,T2B]]){ let av=temperature(a); for(let i=1;i<=240;i++){ const t=a+(b-a)*i/240, v=temperature(t); if(Math.round(v)!==Math.round(av)) TICS.push({t,f:Math.round(620*Math.pow(2,v/12))}); av=v; } }
  for(let i=0;i<3;i++) TICS.push({t:q+11+i,f:760});
  TICS.push({t:gla+3.12,f:1500},{t:gla+3.62,f:1250},{t:gla+3.86,f:1250},{t:gla+5.0,f:170},{t:gla+5.0,f:1900});
  /* Le soleil monte : le levant, puis la matinée, puis midi, puis les nuages le cachent */
  const hauteur=T=>{ if(T<sit+4.3) return 0; if(T<q) return .36*lisse((T-sit-4.3)/(q-sit-4.3)); if(T<T1A) return .36; if(T<T1B) return .36+.64*lisse((T-T1A)/(T1B-T1A)); return 1; };

  poserMiniature(arguments[0],gla+6.4,'Je tiens jusqu’au soir'+N+'?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES'+N+'?</div>');

  const XTM=.7, ZTM=.35;
  const film={ clips,FIN,tics:TICS,titre:'Le gecko dans la neige',ceinture:2,finTitre:acc+3.7,
    cuts:[acc+3.75,acc+7.58,acc+10.22,sit,sit+4.32,q,r+2.66,r+5,bai,bai+3.38,bai+10.52,gla,gla+2.1,gla+4.27,f],groupes,finClip:'06-abonne',
    question:{ qc:'01q-question',rc:'01r-reponse',finR:r+2.66,cpt:q+11,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+3.16,'Quelle température fait-il à midi'+N+'?',[1.63,1.88,2.59,3.08,3.16].map(x=>q+x)]],
      pause:[[q+9.12,q+10.07,'Mets pause, et choisis'+N+'!',[9.12,9.33,9.96,10.07].map(x=>q+x)]],
      choix:[['<span class="neg">−15</span>',4.46,5.14],['<span class="pos">3</span>',6.5,6.95],['<span class="pos">15</span>',7.24,7.76]],
      tete:[[r+.1,'Réponse '],[r+.62,'B'+N+':']],
      reponse:[[r+1.05,r+1.36,'3 degrés'+N+'!',[1.05,1.36].map(x=>r+x)]],suite:[] },

    jouer(P,T,cam){
      const MINI=!!window.MINI;
      const vise=(x,yW,Y,d,e=.04)=>{ if(Y===1590) Y=1590-400/d; cam.x=x; cam.y=yW+(Y-960)/(2637/d); cam.d=d; cam.e=e; };
      scene.taille=.6; scene.x=XTM; scene.z=ZTM; scene.y=0; scene.ySol=0;
      lumiere(MINI?r+4.7:T);
      const t=temperature(T);

      /* ---- Les gestes ---- */
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const grelotte=(a=1)=>{ scene.x+=Math.sin(T*41)*.022*a; P.gesteD='poing'; P.md.set(.38,2.12+Math.sin(T*37)*.03*a,.72); P.cd.set(.74,1.72,.3); P.mg.set(-.38,2.14-Math.sin(T*37)*.03*a,.72); P.cg.set(-.74,1.72,.3);
        P.tetZ=Math.sin(T*33)*.05*a; P.tetX=.06; P.paupiere=-1.25; P.regY=.3; P.jaw=Math.max(P.jaw,.3)+Math.sin(T*47)*.05*a; P.qEnroule=1.1; };
      const marche=(sens,rot)=>{ scene.ry=rot; const j=P.jaw; marcher(T*.766*sens,P); P.jaw=j; };
      const versTube=(h=2.5)=>{ scene.ry=-.72; P.gesteD='index'; P.md.set(.5,h,1.12); P.cd.set(.52,1.9,.42); P.tetY=-.12; P.regY=-.25; P.tetX=-.05-.1*(h-2.3); };
      const bras2=(y)=>{ P.gesteD='ouverte'; P.md.set(.92,y,.25); P.cd.set(.95,y-.75,.1); P.mg.set(-.92,y,.25); P.cg.set(-.95,y-.75,.1); };
      const fige=()=>{ P.hanche=1.26; P.tx=.03; P.ty=.08; P.tz=0; bras2(3.05); P.tetX=-.04; P.tetY=0; P.tetZ=0; P.paupiere=-1.3; P.qSway=0; P.regX=0; };

      /* ---- Les plans et le jeu de Ti Margo ---- */
      let froid=0, buee=false; raide=0;
      if(T<acc+3.75){ /* Le salut, tout content, dans la lumière de l'aube */
        const u=lisse((T-acc)/3.3); vise(XTM+.42,0,1790,5.6-.25*u);
        if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; } else ouvre();
      }
      else if(T<acc+7.58){ /* Un seul flocon : il le suit des yeux, il se pose sur son nez */
        const tf=T-acc-3.75, u=lisse(tf/3.6); vise(XTM+.22,0,1790,5.25-.65*u);
        const touche=T>=acc+6.28;
        P.gesteD='ouverte'; P.md.set(.5,2.0,.72); P.cd.set(.72,1.6,.25); P.mg.set(-.5,2.0,.72); P.cg.set(-.72,1.6,.25);
        P.tetX=touche?.02:-.22+.22*lisse((T-acc-4.2)/2.1); P.regX=touche?.12:-.3+.42*lisse((T-acc-4.2)/2.1); P.regY=touche?0:.1;
        if(touche){ const k=T-acc-6.28; P.paupiere=-1.3; P.tetZ=Math.sin(k*9)*.05*Math.exp(-k*1.5); P.jaw=Math.max(P.jaw,.42); if(k<.6) P.sautY=Math.sin(k/.6*Math.PI)*.28; }
      }
      else if(T<acc+10.22){ /* Plan large : la montagne se dévoile, il tourne sur lui-même */
        const u=lisse((T-acc-7.58)/2.3); vise(XTM+.42-(XTM+.62)*u,0,1740-150*u,6.4+9.2*u);
        scene.ry=-.12+Math.PI*2*lisse((T-acc-8.0)/1.7); bras2(2.85+Math.sin(T*5)*.08);
      }
      else if(T<acc+12.97){ /* Le froid le rattrape */
        const u=lisse((T-acc-10.22)/2.7); vise(XTM+.3,0,1790,6.1-.8*u); grelotte(); buee=true;
        const k=T-acc-11.41; if(k>=0&&k<.55){ P.sautY=Math.sin(k/.55*Math.PI)*.2; P.paupiere=-1.4; }
      }
      else if(T<sit){ /* Le pari : il bluffe, pouce levé, les dents qui claquent */
        const u=lisse((T-acc-12.97)/2.4); vise(XTM+.3,0,1790,7.2-1.8*u); pouce(); buee=true;
        scene.x+=Math.sin(T*38)*.012; P.jaw=Math.max(P.jaw,.3)+Math.sin(T*47)*.04; P.tetZ=-.14+Math.sin(T*29)*.03; P.mg.set(-.5,2.1,.6); P.cg.set(-.72,1.7,.25);
      }
      else if(T<sit+4.32){ /* Au réveil, il s'étire, puis il lit le thermomètre */
        const u=lisse((T-sit)/4); vise(-.2,0,1590,16.3-.4*u);
        if(T<sit+.95){ bras2(3.1); P.tetX=-.2; P.paupiere=-.3; P.jaw=Math.max(P.jaw,.55); }
        else if(T<sit+3.23){ versTube(2.65); }
        else { grelotte(); const k=T-sit-3.23; if(k<.5) P.sautY=Math.sin(k/.5*Math.PI)*.42; buee=true; }
      }
      else if(T<q){ /* Le soleil monte : il tend les mains vers lui */
        const u=lisse((T-sit-4.32)/3.4); vise(-.15,YT(-6),800+(T-sit-4.32)*5,12.2-.7*u);
        scene.ry=.46; P.gesteD='ouverte'; P.md.set(.62,2.5,.82); P.cd.set(.7,1.8,.3); P.mg.set(-.62,2.5,.82); P.cg.set(-.7,1.8,.3); P.tetX=-.18; P.regX=-.25; P.tetY=.2; buee=true;
      }
      else if(T<r){ /* La question : il fait les cent pas, le lapin passe */
        const tq=T-q, u=lisse(tq/14); vise(XTM+.08,0,1590,10.4-.8*u); buee=true;
        const A=q+4.3, B=q+6.6, C2=q+9.0;
        if(T<A){ scene.ry=-.12; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; }
        else if(T<B){ scene.x=XTM+.75*(T-A)/(B-A); marche(1,1.25); }
        else if(T<C2){ scene.x=XTM+.75-.75*(T-B)/(C2-B); marche(1,-1.25); }
        else { scene.ry=-.12+Math.sin(T*.8)*.06; P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35-.7*lisse((T-C2-1)/3); P.qSway=Math.sin(T*3)*.3; }
      }
      else if(T<r+2.66){ /* La réponse : il saute de joie */
        const u=lisse((T-r)/2.6); vise(XTM+.08,0,1590,9.6+.3*u);
        const k=T-r-1.05; if(k>=0&&k<.75){ P.sautY=Math.sin(k/.75*Math.PI)*.34; bras2(3.05); P.jaw=Math.max(P.jaw,.55); } else ouvre();
      }
      else if(T<r+5){ /* Le calcul : le mercure monte de 9, le soleil aussi */
        const u=lisse((T-r-2.66)/2.2); vise(-.2,0,1590,16.3-.3*u);
        if(T<T1A) versTube(2.3); else if(T<T1B){ versTube(2.3+.8*(T-T1A)/(T1B-T1A)); P.tetX=-.25; P.regX=-.3; } else { const j=P.jaw; ACTIONS.danse.f(T-T1B,P); P.jaw=j; }
      }
      else if(T<bai+.55){ /* Le bonhomme de neige : il pousse, il lance, il coiffe */
        const u=lisse((T-r-5)/3); vise(1.75-.1*u,0,1590,9.2-.5*u);
        const d1=r+6.3;
        if(T<d1){ scene.x=.55+(1.62-.55)*(T-r-5)/1.3; marche(1,1.25); P.gesteD='ouverte'; P.md.set(.22,1.82,1.0); P.cd.set(.5,1.66,.5); P.mg.set(-.22,1.82,1.0); P.cg.set(-.5,1.66,.5); P.tx=.2; }
        else { scene.x=1.62; scene.ry=1.0;
          const lance=(a)=>{ const k=T-a; return k>=0&&k<.6?Math.sin(k/.6*Math.PI):0; };
          const e=Math.max(lance(r+6.3),lance(r+7.1),lance(r+8.15));
          P.gesteD='ouverte'; P.md.set(.46,2.0+.72*e,.82+.42*e); P.cd.set(.6,1.72+.28*e,.42); P.mg.set(-.46,2.0+.72*e,.82+.42*e); P.cg.set(-.6,1.72+.28*e,.42); P.sautY=e*.12; P.tetX=-.15*e; P.regX=-.2*e;
          if(T>=bai+.1){ scene.ry=.3; pouce(); P.mg.set(-.72,2.0,.3); P.cg.set(-.72,1.62,.12); }
        }
      }
      else if(T<bai+3.38){ /* Le ciel se couvre : il lève les yeux, le chapeau s'envole */
        const u=lisse((T-bai-.55)/2.8); vise(1.2,0,1520-20*u,10.4+3*u);
        scene.x=1.62; scene.ry=.3-.42*lisse((T-bai-1.2)/.5);
        if(T<bai+1.27){ pouce(); P.mg.set(-.72,2.0,.3); P.cg.set(-.72,1.62,.12); }
        else { P.tetX=-.3; P.regX=-.34; P.paupiere=-1.2; P.gesteD='ouverte'; P.md.set(.7,2.32,.55); P.cd.set(.72,1.7,.2); P.mg.set(-.7,2.2,.55); P.cg.set(-.72,1.7,.2); P.tetZ=.08; }
        buee=T>bai+2;
      }
      else if(T<bai+7.45){ /* Il revient au thermomètre : les deux heures, deux flèches de −4 */
        const u=lisse((T-bai-3.38)/4); vise(-.05,0,1590,16.3-.2*u);
        scene.x=XTM+(1.62-XTM)*(1-lisse((T-bai-3.38)/.9)); buee=true;
        if(T<bai+4.25) marche(1,-1.25); else { grelotte(.8); P.tetX=-.15; P.regX=-.22; P.regY=-.2; }
      }
      else if(T<bai+10.52){ /* (−4) × 2 = −8 : il n'en revient pas */
        const u=lisse((T-bai-7.45)/3); vise(-.03,0,1590,16.2-.2*u); grelotte(.9); buee=true; P.regX=-.24; P.regY=-.1; P.tetX=-.15;
        const k=T-bai-9.29; if(k>=0&&k<.6){ P.sautY=Math.sin(k/.6*Math.PI)*.45; bras2(3.1); P.jaw=Math.max(P.jaw,.6); }
      }
      else if(T<gla){ /* Le mercure dégringole : le plan suit, il commence à givrer */
        const u=lisse((T-bai-10.52)/2.4); vise(-.15,0,1590,15-3.2*u); grelotte(1.2); buee=true; P.tetX=-.05; froid=.45*lisse((T-T2A)/2);
      }
      else if(T<gla+2.1){ /* −5 : sur le thermomètre, il tremble de tout son corps */
        const u=lisse((T-gla)/2); vise(-.2,0,1590,11.8-1.6*u); grelotte(1.5); buee=true; froid=.45+.1*u; P.regX=-.28; P.regY=-.3; P.tetX=-.16; P.tetY=-.18;
        P.sautY=Math.abs(Math.sin(T*14))*.05;
      }
      else if(T<gla+4.27){ /* La queue : il se retourne, elle bleuit, elle se raidit, toc toc */
        const u=lisse((T-gla-2.1)/2); vise(XTM+.6,0,1590,6.5-.5*u); buee=true; froid=.55;
        raide=lisse((T-gla-2.55)/.57); scene.ry=-.12; P.gesteD='index'; P.mg.set(-.5,2.12,.65); P.cg.set(-.74,1.72,.3);
        const toc=T>=gla+3.45;
        P.tetY=lisse((T-gla-2.15)/.4)*.72; P.regY=.42; P.tetX=.18; P.regX=.2; P.paupiere=-1.3; P.qSway=0;
        scene.x+=Math.sin(T*41)*.012;
        if(toc){ const tc=(T-gla-3.45)%.24; P.md.set(1.25+.06*Math.sin(T*3),1.28+(tc<.1?.1:.26),-.05); P.cd.set(.98,1.42,-.04); P.gesteD='index'; } else { P.md.set(.9,1.9,.4); P.cd.set(.74,1.6,.14); }
      }
      else if(T<c){ /* Je suis un glaçon ! Le bloc se referme, clac ; puis la nuit tombe, seuls ses yeux bougent */
        raide=1; froid=.65;
        const k=T-gla-5, ch=k>=0?Math.exp(-k*6)*.09:0, rec=lisse((T-gla-5.7)/(c-gla-5.7));
        vise(XTM+.32-(XTM+.3)*rec*.1,Math.sin(T*47)*ch,1490+20*rec,7.3+1.9*rec);
        scene.ry=-.12;
        const a=lisse((T-gla-4.27)/.5); if(a<1){ P.tetY=.72*(1-a); bras2(2.2+.85*a); P.paupiere=-1.3; P.qSway=0; P.jaw=Math.max(P.jaw,.3); } else fige();
        if(k>=.5){ P.regY=Math.sin((k-.5)*2.6)*.45; P.regX=Math.sin((k-.5)*1.3)*.1; }
      }
      else if(T<f){ /* À toi : la nuit, toujours dans son bloc, les yeux qui roulent */
        raide=1; froid=.65; const u=lisse((T-c)/3); vise(.92-1.07*u,0,1510+54*u,9.2+6*u); fige(); P.regY=Math.sin((T-c)*1.4)*.42; P.regX=Math.sin((T-c)*.7)*.12;
      }
      else { /* La fin : le matin, le bloc a éclaté, il est libre */
        vise(XTM+.52,0,1760,8.4+Math.sin((T-f)*.5)*.2); scene.ry=-.14+Math.sin(T*1.4)*.05; T-f<2.35?ouvre():pouce();
      }
      if(MINI){ raide=1; froid=.2; scene.x=XTM; scene.ry=-.08; vise(XTM+.35,0,1695,6.1,.03); P.jaw=.62; pouce(); P.md.set(.95,2.62,.45); P.cd.set(.82,1.82,.14); P.mg.set(-.7,2.5,.5); P.cg.set(-.78,1.78,.2); P.tetZ=-.1; P.qSway=0; P.regX=0; P.regY=0; P.tetY=0; }

      /* ---- Le gel ---- */
      const dansBloc=T>=gla+4.29&&T<f;
      for(const g of GELES) g.m.color.copy(g.a).lerp(g.b,froid);
      mQueue.color.copy(GELES[0].a).lerp(GELES[0].b,froid).lerp(cB.setHex(0x8fd8f5),raide*.85);
      mTaQ.color.copy(GELES[1].a).lerp(cB.setHex(0x4fa8d4),Math.max(froid,raide));
      GLAC.forEach((g,i)=>{ const e=lisse((raide-.25-i*.12)/.4); g.scale.set(e,e,e); g.visible=e>0; });

      /* ---- Le bloc de glace ---- */
      const kF=MINI?1:(T<gla+4.29?0:lisse((T-gla-4.29)/.71)), voirB=(kF>0&&T<f)||MINI;
      blocBas.visible=blocHaut.visible=voirB&&kF<1; blocPlein.visible=voirB&&kF>=1; reflets.visible=voirB&&kF>=1;
      if(voirB){ const fer=kF*kF*(3-2*kF); blocBas.position.set(XG,HB/2-(1-fer)*(HB+.05),ZG); blocHaut.position.set(XG,HB+HB/2+(1-fer)*6,ZG); }
      debris.forEach(d=>{ d.visible=T>=f&&!MINI; });

      /* ---- Le mercure, les étiquettes, les flèches ---- */
      const yM=YT(t); mercure.position.y=(.8+yM)/2; mercure.scale.y=yM-.8;
      const pulse=(a,w=.55,z=.3)=>{ const k=T-a; return k>=0&&k<w?1+z*Math.sin(k/w*Math.PI):1; };
      TAG[-6].visible=T>=sit+1.62&&T<q; TAG[3].visible=T>=T1B&&T<T2A&&!(T>=r+5&&T<bai+3.38); TAG[-5].visible=T>=T2B&&T<f&&!(T>=gla+2.1&&T<c+2.28);
      /* Plaques et flèches du calcul */
      const montreP=(m,x,y,voir,e=1)=>{ m.visible=voir; if(voir){ m.position.x=x; m.position.y=y; m.scale.set(e,e,1); } };
      const avantRep=T>=sit+6.2&&T<T1A&&T<q;
      flPlus.g.visible=false;
      if(avantRep){ flPlus.poser(XF,YT(-6),YT(-6)+.8); }
      if(T>=T1A&&T<r+5){ flPlus.poser(XF,YT(-6),Math.max(YT(-6)+.1,yM)); }
      montreP(plPlus,XPF,avantRep?YT(-6)+.42:(YT(-6)+yM)/2,avantRep||(T>=T1A&&T<r+5),avantRep?pulse(sit+6.2):1);
      /* Les deux heures */
      const f1=T>=bai+4.09&&T<T2A, f2=T>=bai+5.98&&T<T2A;
      fl1.g.visible=false; fl2.g.visible=false;
      if(f1){ const e=lisse((T-bai-4.09)/.8); fl1.poser(XF,YT(3),YT(3)+(YT(-1)-YT(3))*e); }
      if(f2){ const e=lisse((T-bai-5.98)/.7); fl2.poser(XF,YT(-1),YT(-1)+(YT(-5)-YT(-1))*e); }
      montreP(plM1,XPF,(YT(3)+YT(-1))/2,f1,pulse(bai+7.84));
      montreP(plM2,XPF,(YT(-1)+YT(-5))/2,f2,pulse(bai+8.51));
      ptHaut.visible=(T>=bai+3.66&&T<gla)||(T>=T1B&&T<r+5); ptMil.visible=f1&&T>=bai+4.9; ptBas.visible=(f2&&T>=bai+6.68)||(T>=T2A&&T<gla+2.1);
      croc.visible=T>=bai+9.29&&T<T2A; montreP(plM8,2.4,(YT(3)+YT(-5))/2,T>=bai+9.29&&T<T2A,pulse(bai+9.29,.6,.35));
      /* La question de la nuit : le début seulement, sans montrer l'arrivée */
      const fN=T>=c+5.11&&T<f; flNuit.g.visible=false; if(fN) flNuit.poser(XF,YT(-5),YT(-5)-.62);
      montreP(plNuit,1.3,YT(-5)-.3,fN,pulse(c+5.11)); montreP(plFois,2.28,YT(-5)-.3,T>=c+7.07&&T<f,pulse(c+7.07));
      for(const v of [-6,3,-5]){ const z=v===-6?pulse(sit+1.62):(v===3?pulse(T1B):Math.max(pulse(T2B),pulse(gla+.43),T<f&&T>=c?pulse(c+2.28):1)); const g=TAG[v]; g.children.forEach(ch=>{ if(ch.isMesh&&ch.geometry.type==='PlaneGeometry') ch.scale.set(z,z,1); }); }

      /* ---- Le bonhomme de neige, boule après boule ---- */
      const d0=r+5, d1=r+6.3;
      const lanceBoule=(m,R,Yb,a,duree)=>{ if(T<a){ m.visible=false; return; } m.visible=true; const k=Math.min(1,(T-a)/duree), k2=lisse(k); const mx=1.62+.42, my=1.3; const x=mx+(XB-mx)*k2, y=my+(Yb-my)*k2+Math.sin(k*Math.PI)*.75; m.position.set(x,y,ZB); m.scale.setScalar(R*Math.min(1,(T-a)/.14)); };
      if(T<d0) b1.visible=false; else { b1.visible=true; if(T<d1){ const u=(T-d0)/(d1-d0), R=.17+(R1-.17)*Math.sqrt(u), tmx=.55+(1.62-.55)*u; b1.position.set(tmx+.6+R,R,ZB); b1.scale.setScalar(R); b1.rotation.z=-u*9; } else { b1.position.set(XB,Y1,ZB); b1.scale.setScalar(R1); } }
      lanceBoule(b2,R2,Y2,r+6.3,.62); lanceBoule(b3,R3,Y3,r+7.1,.62);
      const vuV=T>=r+7.8; visage.visible=vuV; boutons.visible=T>=r+7.0;
      { const z=lisse((T-r-7.8)/.2); visage.scale.setScalar(z||.001); }
      /* Le chapeau : lancé sur la tête, puis emporté par le vent */
      const tCh=r+8.15, tVent=bai+2.02; chapeau.visible=T>=tCh&&T<f;
      if(T<tCh+.6){ const k=Math.max(0,(T-tCh)/.6), x=2.4+(XB-2.4)*k, y=1.4+(Y3+R3*.86-1.4)*k+Math.sin(k*Math.PI)*.9; chapeau.position.set(x,y,ZB); chapeau.rotation.set(0,0,k*Math.PI*2); }
      else if(T<tVent){ chapeau.position.set(XB,Y3+R3*.86,ZB); chapeau.rotation.set(0,0,-.08); }
      else { const k=T-tVent; chapeau.position.set(XB-2.6*k*k-.6*k,Y3+R3*.86+1.5*k-.05*k*k,ZB+.4*k); chapeau.rotation.set(k*2,0,k*4); if(k>3.5) chapeau.visible=false; }

      /* ---- Le décor vivant ---- */
      const h=hauteur(T); astre.position.x=17-9*h; astre.position.y=9+15*h;
      for(const P2 of petits) P2.g.position.x=((P2.x+40+T*P2.v)%90+90)%90-45;
      astre.visible=T<bai+3.2||T>=f; if(T>=f){ astre.position.set(14,14,-105); }
      /* La couche : elle arrive à « se couvre », elle se retire à la tombée de la nuit, pour la lune */
      const kArr=i=>lisse((T-bai-.55-(i%6)*.14)/1.65), kPar=lisse((T-gla-5.7)/1.8);
      for(const C2 of COUCHE){ const a=kArr(C2.i), vis=T>=bai&&T<f; C2.g.visible=vis&&a>0&&!MINI; if(!C2.g.visible) continue; C2.g.position.x=C2.x+C2.s*62*(1-a)+C2.s*70*kPar+Math.sin(T*.14+C2.i)*.8; }
      const nuit=lisse((T-gla-5.9)/1.6)*(T<f?1:0); lune.visible=nuit>0; lune.position.y=7+3.6*nuit; etoiles.visible=nuit>0; matEt.opacity=nuit;
      vitres.color.setHex(nuit>0||T>=bai+8?0xffd96b:0xfff4d6);
      fumee.forEach((m,i)=>{ const u=(T*.26+i/6)%1; m.position.x=3.0+1.25+u*.9+Math.sin(T*.9+i)*.12+(T>=bai+1.5&&T<f?-u*2.4:0); m.position.y=5+u*2.6; m.scale.setScalar(.8+u*2.2); m.material.opacity=.72*(1-u); });
      /* Le lapin traverse pendant la question ; il revient à la fin */
      { let v=false; const pas_=(a,b,x0,x1)=>{ if(T>=a&&T<b){ v=true; const u=(T-a)/(b-a); lapin.position.x=x0+(x1-x0)*u; lapin.position.y=Math.abs(Math.sin(T*6.4))*.3; lapin.rotation.y=x1>x0?0:Math.PI; } }; pas_(q+1,q+13,-3.2,4.2); pas_(f+.2,FIN,4.6,-1); lapin.visible=v&&!MINI; }

      /* Les flocons, après « se couvre » ; le vent les pousse quand la nuit vient */
      { let amt=0; if(T>=bai+2.02&&T<f){ amt=T<bai+5?.45*lisse((T-bai-2.02)/2):(T<gla?.45+.55*lisse((T-bai-5)/8):(T<c?1:.55)); } if(MINI) amt=0;
        const nb=Math.floor(NF*amt); FLOC.forEach((F,i)=>{ const vis=i<nb; F.m.visible=vis; if(!vis) return; const hF=11, y=hF-(((T*F.v+F.o)%hF)+hF)%hF, x=F.x+Math.sin(T*.8+F.a)*.25; F.m.position.set(x,y,F.z); }); }
      { const a=acc+3.75, b=acc+6.28, vis=T>=a&&T<acc+7.3&&!MINI; flocon1.visible=vis; if(vis){ tete.getWorldPosition(vT); if(T<b){ const u=(T-a)/(b-a); flocon1.position.set(vT.x+.05+Math.sin(T*2.4)*.16*(1-u),vT.y-.02+(1-u)*2.4,vT.z+.47); } else { flocon1.position.set(vT.x+.0,vT.y-.0,vT.z+.47); const e=Math.max(.001,.055*(1-lisse((T-b-.5)/.5))); flocon1.scale.setScalar(e); } if(T<b) flocon1.scale.setScalar(.055); } }

      /* La buée */
      tete.getWorldPosition(vT);
      BUEE.forEach((m,i)=>{ const vu=buee&&!dansBloc&&!MINI; m.visible=vu; if(!vu) return; const u=(T*.85+i/4)%1; m.position.set(vT.x+.3+u*.72,vT.y-.2+u*.26,vT.z+.46+u*.12); m.scale.setScalar(.035+u*.11); m.material.opacity=.62*(1-u); });

      if(MINI){ panneau.style.display='none'; for(const v of [-6,3,-5]) TAG[v].visible=false; astre.visible=false; return; }

      /* ---- Le panneau du bas ---- */
      const voirP=T>=sit&&T<f;
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        const dansC=T>=c, v=Math.round(t), lu=(T<sit+1.62)||(dansC&&T<c+2.28);
        const e=$('valN'); e.textContent=lu?'':(v<0?'−':'')+Math.abs(v)+' °C';
        e.style.color=v<0?'#ff922b':(v>0?'#74c0fc':'#8ce99a');
        let lst=[]; for(const [deb,l] of FORMULES) if(T>=deb) lst=l;
        const fm=$('formule'); jetons(fm,lst,T);
        fm.style.fontSize=(T>=bai+3.38&&T<bai+7.45?50:(T>=c?54:72))+'px';
      }
    } };
  return film;
};
