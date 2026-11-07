/* ============================================================
   TI MARGO : le personnage, ses gestes, sa pose, le rendu.
   UN SEUL exemplaire pour tous les shorts : une correction faite ici
   (un geste, une main) vaut pour tous les prochains films.
   Script classique : ses const et let sont visibles par short.js et
   par les fichiers de films/.
   ============================================================ */
/* ---------- Rendu ---------- */
const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, preserveDrawingBuffer:true });
renderer.setPixelRatio(Math.min(devicePixelRatio,2));
document.body.prepend(renderer.domElement);
const scene3d = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(32,1,.1,100);
const controls = new OrbitControls(camera,renderer.domElement);
controls.target.set(0,1.72,0); controls.enablePan=false; controls.enableDamping=true;
controls.minDistance=4; controls.maxDistance=14; controls.maxPolarAngle=Math.PI*.56;
camera.position.set(1.1,2.3,8.4);

scene3d.add(new THREE.AmbientLight(0xffffff,1.25));
const soleil = new THREE.DirectionalLight(0xfffbe8,2.1); soleil.position.set(-2.5,5,5); scene3d.add(soleil);
const contre = new THREE.DirectionalLight(0xbfe6ff,.5); contre.position.set(3,2,-4); scene3d.add(contre);

/* ---------- Matières dessin animé : aplats + contour ---------- */
const degrade = new THREE.DataTexture(new Uint8Array([120,120,120,255, 195,195,195,255, 255,255,255,255]),3,1,THREE.RGBAFormat);
degrade.minFilter=degrade.magFilter=THREE.NearestFilter; degrade.needsUpdate=true;
const toon = (c,extra={}) => new THREE.MeshToonMaterial({ color:c, gradientMap:degrade, ...extra });
const C = {
  vert:toon(0x86bc1c), vertFonce:toon(0x2f9a3a), jaune:toon(0xf6dc62), jauneVert:toon(0xd3d73a),
  blanc:toon(0xffffff), noir:toon(0x0a0f14), bleuIris:toon(0x1c5f9e), bouche:toon(0x4a1512), langue:toon(0xe56a68),
  sac:toon(0x0f4f97), sacFonce:toon(0x0a3a70), orange:toon(0xf5a50a), bois:toon(0xf3cf9a), mine:toon(0x2a2a30),
  metal:toon(0x5f8fae), gomme:toon(0xee6f6c)
};
function contour(epaisseur,couleur=0x14602a){
  const m = new THREE.MeshBasicMaterial({ color:couleur, side:THREE.BackSide });
  m.onBeforeCompile = s => { s.vertexShader = s.vertexShader.replace('#include <begin_vertex>',
    `#include <begin_vertex>\n transformed += normalize(normal)*${epaisseur.toFixed(4)};`); };
  m.customProgramCacheKey = () => 'contour'+epaisseur;
  return m;
}
const CONTOUR = contour(.016), CONTOUR_FIN = contour(.008), CONTOUR_SOMBRE = contour(.012,0x0d2b45);

function piece(parent,geo,mat,pos,trait=CONTOUR){
  const m = new THREE.Mesh(geo,mat); if(pos) m.position.set(...pos); parent.add(m);
  if(trait){ const o=new THREE.Mesh(geo,trait); m.add(o); o.frustumCulled=m.frustumCulled=false; }
  return m;
}
const ell = (rx,ry,rz,s=32) => new THREE.SphereGeometry(1,s,Math.round(s*.75)).scale(rx,ry,rz);

/* Tube souple : bras, jambes, cou, queue. Recalculé à chaque image. */
class Tube {
  constructor(parent,rayon,mat,{seg=28,rad=14,trait=CONTOUR}={}){
    this.seg=seg; this.rad=rad; this.rayon=rayon; this.taches=[];
    const n=(seg+1)*(rad+1), geo=new THREE.BufferGeometry();
    geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(n*3),3));
    geo.setAttribute('normal',new THREE.BufferAttribute(new Float32Array(n*3),3));
    const idx=[]; for(let i=0;i<seg;i++)for(let j=0;j<rad;j++){ const a=i*(rad+1)+j,b=a+rad+1; idx.push(a,a+1,b, b,a+1,b+1); }
    geo.setIndex(idx); this.geo=geo;
    piece(parent,geo,mat,null,trait);
    this.frames=[]; for(let i=0;i<=seg;i++) this.frames.push({p:new THREE.Vector3(),n:new THREE.Vector3(),b:new THREE.Vector3()});
    this.parent=parent;
  }
  tache(t,angle,r,mat=C.vertFonce){
    const m=new THREE.Mesh(new THREE.SphereGeometry(1,12,8).scale(r,r,r*.18),mat); this.parent.add(m); m.frustumCulled=false;
    this.taches.push({m,t,angle}); return m;
  }
  maj(points){
    const pts=new THREE.CatmullRomCurve3(points,false,'centripetal').getSpacedPoints(this.seg);
    const T=new THREE.Vector3(),N=new THREE.Vector3(),B=new THREE.Vector3(),pos=this.geo.attributes.position,nor=this.geo.attributes.normal;
    const v=new THREE.Vector3();
    for(let i=0;i<=this.seg;i++){
      T.subVectors(pts[Math.min(i+1,this.seg)],pts[Math.max(i-1,0)]).normalize();
      if(i===0){ N.set(0,0,1); if(Math.abs(T.z)>.9) N.set(1,0,0); }
      N.addScaledVector(T,-N.dot(T)).normalize(); B.crossVectors(T,N);
      const f=this.frames[i]; f.p.copy(pts[i]); f.n.copy(N); f.b.copy(B);
      const r=this.rayon(i/this.seg);
      for(let j=0;j<=this.rad;j++){
        const a=j/this.rad*Math.PI*2,c=Math.cos(a),s=Math.sin(a),k=i*(this.rad+1)+j;
        v.copy(N).multiplyScalar(c).addScaledVector(B,s);
        nor.setXYZ(k,v.x,v.y,v.z); pos.setXYZ(k,pts[i].x+v.x*r,pts[i].y+v.y*r,pts[i].z+v.z*r);
      }
    }
    pos.needsUpdate=nor.needsUpdate=true;
    const Z=new THREE.Vector3(0,0,1);
    for(const q of this.taches){
      const i=Math.round(q.t*this.seg),f=this.frames[i],r=this.rayon(q.t);
      v.copy(f.n).multiplyScalar(Math.cos(q.angle)).addScaledVector(f.b,Math.sin(q.angle));
      q.m.position.copy(f.p).addScaledVector(v,r*.97); q.m.quaternion.setFromUnitVectors(Z,v);
    }
  }
}

/* Petit générateur reproductible : Ti Margo a toujours les mêmes taches */
let graine=7; const hasard=()=> (graine=(graine*16807)%2147483647)/2147483647;
function tacheSurEllipsoide(parent,c,r,dir,taille,mat=C.vertFonce){
  const d=new THREE.Vector3(...dir).normalize();
  const p=new THREE.Vector3(d.x*r[0],d.y*r[1],d.z*r[2]);
  const n=new THREE.Vector3(d.x/r[0],d.y/r[1],d.z/r[2]).normalize();
  const m=new THREE.Mesh(new THREE.SphereGeometry(1,12,8).scale(taille,taille,taille*.2),mat);
  m.position.set(c[0]+p.x,c[1]+p.y,c[2]+p.z); m.quaternion.setFromUnitVectors(new THREE.Vector3(0,0,1),n); parent.add(m);
}

/* ---------- Le personnage ---------- */
const racine = new THREE.Group(); scene3d.add(racine);

/* Tronc + ventre jaune */
const tronc = new THREE.Group(); racine.add(tronc);
const CT=[0,.54,0], RT=[.36,.68,.27];
piece(tronc,ell(...RT),C.vert,CT);
piece(tronc,ell(.255,.6,.23),C.jaune,[0,.5,.09],CONTOUR_FIN);
for(const [y,l] of [[.16,.13],[.38,.17],[.6,.17],[.82,.14]]){
  const pli=new THREE.Mesh(new THREE.TorusGeometry(l,.0055,6,20,Math.PI*.8),C.jauneVert.clone());
  pli.material.color.set(0xb9a93a); pli.position.set(0,y,.09+.205); pli.rotation.set(Math.PI*.5+.15,0,Math.PI*.1); tronc.add(pli);
}
for(let i=0;i<34;i++){
  const a=hasard()*Math.PI*2, h=-.85+hasard()*1.65, cz=Math.sin(a), cx=Math.cos(a);
  if(cz>.1 && Math.abs(cx)<.86) continue;
  tacheSurEllipsoide(tronc,CT,RT,[cx,h,cz],.025+hasard()*.05);
}

/* Sac à dos */
const sac=new THREE.Group(); sac.position.set(.03,.62,-.36); tronc.add(sac);
piece(sac,new RoundedBoxGeometry(.86,1.02,.4,6,.15),C.sac,null,CONTOUR_SOMBRE);
piece(sac,new RoundedBoxGeometry(.56,.42,.12,4,.05),C.sacFonce,[0,-.2,-.22],CONTOUR_SOMBRE);
piece(sac,new RoundedBoxGeometry(.46,.03,.03,2,.012),C.orange,[0,-.02,-.285],null);
for(const s of [-1,1]){
  const b=new Tube(tronc,()=>.05,C.sac,{seg:14,rad:8,trait:CONTOUR_SOMBRE});
  b.maj([[s*.2,1.08,-.2],[s*.25,1.14,.0],[s*.31,.9,.2],[s*.34,.5,.2],[s*.34,.2,.0]].map(p=>new THREE.Vector3(...p)));
}

/* Tête */
const tete = new THREE.Group(); racine.add(tete);
const RC=[.6,.42,.54], CC=[0,.08,-.04];
piece(tete,ell(...RC),C.vert,CC);
const RM=[.48,.215,.44], CM=[0,-.02,.34];
piece(tete,ell(...RM),C.vert,CM);
tacheSurEllipsoide(tete,CC,RC,[.93,.1,-.25],.1); tacheSurEllipsoide(tete,CC,RC,[-.93,.1,-.25],.1);
for(let i=0;i<22;i++){
  const a=hasard()*Math.PI*2, h=hasard()*.85-.15, y=hasard()>.72;
  const d=[Math.cos(a),h,Math.sin(a)]; if(d[2]>.35 && Math.abs(d[0])<.72 && h<.5) continue;
  tacheSurEllipsoide(tete,CC,RC,d,.022+hasard()*.04,y?C.jauneVert:C.vertFonce);
}
for(const [d,r,m] of [[[0,.86,.5],.05,C.vertFonce],[[-.14,.92,.36],.03,C.jauneVert],[[.15,.9,.38],.035,C.vertFonce],[[.05,.74,.66],.028,C.jauneVert],[[-.08,.72,.68],.022,C.vertFonce],[[.8,-.05,.6],.05,C.vertFonce],[[-.8,-.05,.6],.05,C.vertFonce],[[.86,.25,.42],.032,C.jauneVert],[[-.86,.25,.42],.032,C.vertFonce]])
  tacheSurEllipsoide(tete,CC,RC,d,r,m);
piece(tete,new THREE.SphereGeometry(.024,10,8),C.noir,[-.13,.075,.74],null);
piece(tete,new THREE.SphereGeometry(.024,10,8),C.noir,[.13,.075,.74],null);

/* Bouche : l'intérieur, puis la mâchoire qui s'ouvre */
piece(tete,ell(.4,.14,.34),C.bouche,[0,-.17,.34],null);
const machoire = new THREE.Group(); machoire.position.set(0,-.13,.0); tete.add(machoire);
piece(machoire,ell(.41,.125,.39),C.jaune,[0,-.075,.35]);
piece(machoire,ell(.375,.07,.35),C.bouche,[0,-.02,.36],null);
const langue=piece(machoire,ell(.22,.05,.22),C.langue,[0,.018,.38],null);

/* Coins de la bouche : le sourire */
for(const s of [-1,1]){
  const coin=new Tube(tete,t=>.02*(1-t*.6),C.noir,{seg:8,rad:6,trait:null});
  coin.maj([[s*.455,-.13,.3],[s*.54,-.05,.17],[s*.575,.03,.06]].map(p=>new THREE.Vector3(...p)));
}

/* Yeux */
const yeux=[];
for(const s of [-1,1]){
  piece(tete,ell(.285,.31,.27),C.vert,[s*.3,.32,.15]);
  const o=new THREE.Group(); o.position.set(s*.3,.31,.32); o.rotation.y=s*.22; tete.add(o);
  piece(o,new THREE.SphereGeometry(.225,28,20),C.blanc,null,CONTOUR_SOMBRE);
  const globe=new THREE.Group(); o.add(globe);
  const iris=new THREE.Mesh(new THREE.SphereGeometry(.128,22,16).scale(1,1,.34),C.bleuIris); iris.position.z=.19; globe.add(iris);
  const pup=new THREE.Mesh(new THREE.SphereGeometry(.09,20,14).scale(1,1,.34),C.noir); pup.position.z=.215; globe.add(pup);
  const eclat=new THREE.Mesh(new THREE.SphereGeometry(.036,12,8),new THREE.MeshBasicMaterial({color:0xffffff})); eclat.position.set(-.045,.055,.235); globe.add(eclat);
  const paup=new THREE.Mesh(new THREE.SphereGeometry(.238,24,14,0,Math.PI*2,0,Math.PI/2),toon(0x86bc1c,{side:THREE.DoubleSide})); o.add(paup);
  yeux.push({globe,paup});
}

/* Cou */
const cou=new Tube(racine,t=>.17-.03*t,C.vert,{seg:10,rad:14});
const gorge=new Tube(racine,t=>.105-.015*t,C.jaune,{seg:10,rad:12,trait:null});

/* Queue en spirale */
const queue=new Tube(racine,t=>(t>.995?.002:.2*Math.pow(1-t,.62)+.035),C.vert,{seg:80,rad:14});
for(let i=0;i<64;i++) queue.tache(.04+.92*i/64,hasard()*Math.PI*2,.018+hasard()*.05*(1-i/90));

/* Mains */
function main(cote){
  const g=new THREE.Group(); racine.add(g);
  piece(g,ell(.14,.15,.1),C.vert);
  const doigts=[];
  for(let i=0;i<4;i++){
    const p=new THREE.Group(); p.position.set(-.1+.067*i,.11,.015); g.add(p);
    const geo=new THREE.CapsuleGeometry(.047,.17-.012*Math.abs(i-1.5),5,12); geo.translate(0,.11,0);
    piece(p,geo,C.vert); doigts.push(p);
  }
  const pouce=new THREE.Group(); g.add(pouce);
  const gp=new THREE.CapsuleGeometry(.068,.12,5,12); gp.translate(0,.1,0); piece(pouce,gp,C.vert);
  return { g, doigts, pouce, cote };
}
const mainG=main(-1), mainD=main(1);
const GESTES={
  ouverte:{d:[.05,.03,.03,.05],pz:1.0,px:.0,ppos:[.13,-.01,.03]},
  poing:{d:[1.9,1.9,1.9,1.9],pz:.9,px:.9,ppos:[.08,.0,.07]},
  pouce:{d:[1.95,1.95,1.95,1.95],pz:.32,px:0,ppos:[-.135,.03,.03]},
  index:{d:[1.9,1.9,1.9,.0],pz:.9,px:.9,ppos:[.08,.0,.07]}
};
function poserMain(M,nom,k){
  const G=GESTES[nom];
  M.doigts.forEach((p,i)=>{ p.rotation.x+=(G.d[i]-p.rotation.x)*k; p.rotation.z+=((nom==='ouverte'?(1.5-i)*.24:0)-p.rotation.z)*k; });
  M.pouce.rotation.z+=(-G.pz*-1-M.pouce.rotation.z)*k; M.pouce.rotation.x+=(G.px-M.pouce.rotation.x)*k;
  M.pouce.position.lerp(new THREE.Vector3(...G.ppos),k);
}

/* Crayon */
const crayon=new THREE.Group(); crayon.position.set(0,.02,.11); crayon.rotation.set(0,0,.09); mainG.g.add(crayon);
piece(crayon,new THREE.CylinderGeometry(.064,.064,.98,6),C.orange,[0,.02,0],CONTOUR_FIN);
piece(crayon,new THREE.ConeGeometry(.064,.2,6),C.bois,[0,.61,0],CONTOUR_FIN);
piece(crayon,new THREE.ConeGeometry(.024,.075,6),C.mine,[0,.68,0],null);
piece(crayon,new THREE.CylinderGeometry(.068,.068,.1,12),C.metal,[0,-.52,0],CONTOUR_FIN);
piece(crayon,new THREE.CapsuleGeometry(.064,.05,4,12),C.gomme,[0,-.62,0],CONTOUR_FIN);

/* Bras et jambes */
const brasG=new Tube(racine,t=>.098-.022*t,C.vert), brasD=new Tube(racine,t=>.098-.022*t,C.vert);
const jambeG=new Tube(racine,t=>.17-.085*t,C.vert), jambeD=new Tube(racine,t=>.17-.085*t,C.vert);
for(const m of [brasG,brasD,jambeG,jambeD]) for(let i=0;i<15;i++) m.tache(.12+hasard()*.76,hasard()*Math.PI*2,.016+hasard()*.03);

/* Pieds */
function pied(cote){
  const g=new THREE.Group(); racine.add(g);
  piece(g,ell(.21,.095,.29),C.vert,[0,.09,.11]);
  [-1.5,-.5,.5,1.5].forEach(i=>{
    const a=i*.4; const d=new THREE.Group(); d.position.set(Math.sin(a)*.15,.05,.28); d.rotation.y=a; g.add(d);
    const geo=new THREE.CapsuleGeometry(.045,.17,4,10); geo.rotateX(Math.PI/2); geo.translate(0,0,.09); piece(d,geo,C.vert);
    piece(d,ell(.085,.058,.085,14),C.vert,[0,.006,.24]);
  });
  return g;
}
const piedG=pied(-1), piedD=pied(1);

/* Ombre douce au sol */
const cv=document.createElement('canvas'); cv.width=cv.height=128; const cx=cv.getContext('2d');
const gr=cx.createRadialGradient(64,64,4,64,64,64); gr.addColorStop(0,'rgba(23,69,42,.42)'); gr.addColorStop(1,'rgba(23,69,42,0)');
cx.fillStyle=gr; cx.fillRect(0,0,128,128);
const ombre=new THREE.Mesh(new THREE.PlaneGeometry(3,2.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,depthWrite:false}));
ombre.rotation.x=-Math.PI/2; ombre.position.y=.002; scene3d.add(ombre);

/* ---------- La pose : ce qu'une action peut changer ---------- */
const V=(x,y,z)=>new THREE.Vector3(x,y,z);
function poseDeBase(t){
  const s=Math.sin(t*2.1);
  return {
    x:scene.x, ry:scene.ry, sautY:0, ecrase:0, hanche:1.26+.012*s,
    tx:.03+.006*s, ty:.08, tz:0,
    tetX:0, tetY:Math.sin(t*.5)*.05+.08, tetZ:-.05+Math.sin(t*.37)*.025, jaw:.34,
    mg:V(-.82,2.14+.02*s,.34), cg:V(-.72,1.62,.12), md:V(.9,2.2+.02*s,.32), cd:V(.72,1.63,.08),
    pg:V(-.33,0,.1), pd:V(.31,0,.04), rpg:0, rpd:0, kneeZ:.12,
    qSway:Math.sin(t*1.3)*.16, qEnroule:1, regX:0, regY:0,
    gesteD:'pouce', tourneD:0, paupiere:-1.02
  };
}
const ACTIONS={
  salut:{ d:2.6, f(t,P){ const e=Math.min(1,t*4)*Math.min(1,(2.6-t)*4);
    P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(t*11)*.42*e; P.tetZ=-.1; P.tz=.03*e; P.jaw=.5+Math.sin(t*7)*.15; } },
  parle:{ d:3.2, f(t,P){ P.jaw=.28+.3*Math.abs(Math.sin(t*9)*Math.sin(t*3.7+1)); P.gesteD='ouverte'; P.md.set(.86,2.0+Math.sin(t*3)*.08,.5); P.cd.set(.72,1.58,.2);
    P.tetX=Math.sin(t*4)*.04; P.tetY=.1+Math.sin(t*1.7)*.09; } },
  reflechit:{ d:3, f(t,P){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='index'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.jaw=.1; P.tz=-.03; P.qSway=Math.sin(t*3)*.3; } },
  eureka:{ d:2.4, f(t,P){ const b=Math.max(0,Math.sin(Math.min(t*5,Math.PI))); P.md.set(1.08,2.92,.25); P.cd.set(.92,2.02,.04); P.gesteD='index'; P.tetX=-.16; P.jaw=.72; P.sautY=b*.2; P.ecrase=-b*.05; P.paupiere=-1.2; P.qEnroule=.72; } },
  bravo:{ d:2.4, f(t,P){ const b=Math.sin(t*5); P.md.set(.95,2.32+b*.04,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.jaw=.6; P.paupiere=-1.1; P.ty=.08+b*.04; } },
  saut:{ d:1.5, f(t,P){
    const accroupi=t<.32?Math.sin(t/.32*Math.PI/2):(t<.42?1-(t-.32)/.1:0), l=t>1.05?Math.max(0,Math.sin((t-1.05)/.45*Math.PI)):0;
    const air=(t>.38&&t<1.08)?Math.sin((t-.38)/.7*Math.PI):0;
    P.hanche-=accroupi*.24+l*.22; P.tx=.03+accroupi*.2+l*.16; P.sautY=air*1.15; P.ecrase=air>0?-.05*air:(accroupi+l)*.07;
    P.mg.y+=air*.7-accroupi*.2; P.md.y+=air*.78-accroupi*.2; P.mg.x-=air*.18; P.md.x+=air*.18; P.gesteD=air>.2?'ouverte':'pouce'; P.jaw=.3+air*.5;
    P.pg.y=air>.2?air*.12:0; P.pd.y=air>.2?air*.12:0; P.qEnroule=1-air*.45; P.tetX=accroupi*.14-air*.12; } },
  danse:{ d:5.5, f(t,P){ const a=t*6.1,s=Math.sin(a),c=Math.cos(a),h=Math.abs(s);
    P.hanche-=.05-h*.06; P.tz=s*.1; P.ty=.08+c*.12; P.tetZ=-s*.14; P.tetY=c*.12; P.jaw=.5;
    P.md.set(.86+s*.1,2.55+s*.42,.3); P.cd.set(.82,1.84,.1); P.mg.set(-.86+s*.1,2.55-s*.42,.3); P.cg.set(-.82,1.84,.1); P.gesteD='ouverte';
    P.pg.y=s>0?s*.15:0; P.pd.y=s<0?-s*.15:0; P.pg.x=-.34+s*.05; P.pd.x=.34+s*.05; P.qSway=c*.5; P.qEnroule=.85; } },
  marche:{ d:3, f(t,P){ marcher(t,P); } }
};
function marcher(t,P){
  const a=t*8.2,s=Math.sin(a),c=Math.cos(a);
  P.pg.z=.1+s*.34; P.pd.z=.04-s*.34; P.pg.y=Math.max(0,c)*.2; P.pd.y=Math.max(0,-c)*.2; P.rpg=-c*.28; P.rpd=c*.28;
  P.hanche+=Math.abs(c)*.05-.03; P.tz=s*.045; P.ty=s*.08; P.tx=.08; P.tetZ=-s*.03; P.jaw=.42;
  P.md.set(.84,1.76+Math.max(0,s)*.2,.1+s*.34); P.cd.set(.72,1.6,.0); P.mg.set(-.84,1.82+Math.max(0,-s)*.2,.2-s*.3); P.cg.set(-.72,1.58,.02);
  P.gesteD='poing'; P.qSway=s*.34; P.qEnroule=.92;
}

/* ---------- La petite scène ---------- */
const scene={ x:0, ry:-.12, bulle:null, enCours:false, t:0, etapes:[], i:0 };
let action=null;
function jouer(nom){ action={nom,t:0,def:ACTIONS[nom]}; }
function arreterScene(){ scene.enCours=false; dire(null); scene.x=0; scene.ry=-.12; }
const SCRIPT=[
  [0,   ()=>{ scene.x=-5.2; cur.x=-5.2; scene.ry=1.25; action={nom:'entree',t:0,def:{d:2.7,f(t,P){ marcher(t,P); scene.x=-5.2+5.2*Math.min(1,t/2.6); }}}; }],
  [2.75,()=>{ scene.x=0; scene.ry=-.12; dire(null); }],
  [3.2, ()=>{ jouer('salut'); dire('Salut ! Moi, c’est Ti Margo.'); }],
  [5.9, ()=>{ jouer('reflechit'); dire('Hmm… 12 × 12 ?'); }],
  [8.7, ()=>{ jouer('eureka'); dire('144 !'); }],
  [11,  ()=>{ jouer('parle'); dire('12 × 10, puis 12 × 2.'); }],
  [14.1,()=>{ jouer('bravo'); dire('Et voilà !'); }],
  [16.2,()=>{ jouer('saut'); dire(null); }],
  [17.8,()=>{ jouer('danse'); dire('À toi, maintenant !'); }],
  [23.4,()=>{ arreterScene(); }]
];
function lancerScene(){ scene.enCours=true; scene.t=0; scene.i=0; action=null; }
const bulle=document.getElementById('bulle');
function dire(txt){ scene.bulle=txt; if(txt) bulle.textContent=txt; bulle.style.opacity=txt?1:0; }

document.getElementById('barre').addEventListener('click',e=>{
  const a=e.target.dataset?.a; if(!a) return;
  if(a==='scene') return lancerScene();
  arreterScene(); jouer(a);
});

/* Le regard suit la souris */
const souris={x:0,y:0};
addEventListener('pointermove',e=>{ souris.x=e.clientX/innerWidth*2-1; souris.y=e.clientY/innerHeight*2-1; });

/* ---------- Mise à jour image par image ---------- */
const cur=poseDeBase(0);
let cligne=2.3,dernier=performance.now(),temps=0;
const Tp=(x,y,z)=>new THREE.Vector3(x,y,z).applyMatrix4(tronc.matrix);
function bougerVers(cible,k){
  for(const c in cible){
    const v=cible[c];
    if(v instanceof THREE.Vector3) cur[c].lerp(v,k);
    else if(typeof v==='number') cur[c]+=(v-cur[c])*k;
    else cur[c]=v;
  }
}
function pas(dt){
  temps+=dt;
  if(scene.enCours){ scene.t+=dt; while(scene.i<SCRIPT.length && SCRIPT[scene.i][0]<=scene.t){ SCRIPT[scene.i][1](); scene.i++; } }
  const P=poseDeBase(temps);
  if(action){ action.t+=dt; action.def.f(action.t,P); if(action.t>=action.def.d) action=null; }
  P.x=scene.x; P.ry=scene.ry;
  const k=scene.couper?1:1-Math.exp(-dt*16); bougerVers(P,k);
  const S=cur;

  const tl=scene.taille||1, posX=scene.video?scene.x:S.x, rotY=scene.video?scene.ry:S.ry;
  racine.position.set(posX,S.sautY+(scene.y||0),scene.z||0); racine.rotation.y=rotY;
  racine.scale.set(tl*(1+S.ecrase*.6),tl*(1-S.ecrase),tl*(1+S.ecrase*.6));
  ombre.position.z=scene.z||0; ombre.position.x=posX; ombre.position.y=(scene.video?(scene.ySol||0):0)+.004; ombre.visible=!scene.cacherOmbre;
  const om=1-S.sautY*.28; ombre.scale.set(om*tl,om*tl,1); ombre.material.opacity=Math.max(.3,om);
  crayon.visible=!scene.sansCrayon;

  tronc.position.set(0,S.hanche,0); tronc.rotation.set(S.tx,S.ty,S.tz);
  const sf=scene.souffle||0; tronc.scale.set(1+.08*sf,1+.1*sf,1+.14*sf); tronc.updateMatrix();

  const baseCou=Tp(0,1.08,.0), haut=Tp(0,1.42,.07);
  tete.position.copy(Tp(0,1.68,.1));
  tete.rotation.set(S.tx*.7+S.tetX,S.ty*.6+S.tetY,S.tz*.7+S.tetZ);
  cou.maj([baseCou,baseCou.clone().lerp(haut,.55),haut,tete.position.clone().add(V(0,-.2,.0))]);
  gorge.maj([Tp(0,.98,.17),Tp(0,1.2,.17),Tp(0,1.42,.17),tete.position.clone().add(V(0,-.25,.12))]);

  machoire.rotation.x=S.jaw*1.05;

  /* Clignement : rapide et irrégulier */
  cligne-=dt; if(cligne<-.14) cligne=1.8+Math.random()*3.4;
  const lid=cligne<0?1.55:S.paupiere;
  const rx=S.regX+souris.y*.16, ry=S.regY+souris.x*.3;
  for(const o of yeux){ o.paup.rotation.x+=(lid-o.paup.rotation.x)*(cligne<0?.7:.2); o.globe.rotation.set(rx,ry,0); }

  /* Bras */
  for(const [b,m,e,mn,cote] of [[brasG,S.mg,S.cg,mainG,-1],[brasD,S.md,S.cd,mainD,1]]){
    const epaule=Tp(cote*.31,.98,.02);
    b.maj([epaule,epaule.clone().lerp(e,.55),e,e.clone().lerp(m,.55),m]);
    mn.g.position.copy(m);
  }
  mainG.g.rotation.set(.0,.1,.18);
  mainD.g.rotation.set(0,-.2,-.1+S.tourneD);
  poserMain(mainG,'poing',scene.couper?1:.2); poserMain(mainD,S.gesteD,scene.couper?1:.25);
  for(const p of mainG.pouce.children) p.scale.setScalar(1);

  /* Jambes */
  for(const [j,pos,pi,ro,cote] of [[jambeG,S.pg,piedG,S.rpg,-1],[jambeD,S.pd,piedD,S.rpd,1]]){
    const cheville=V(pos.x,pos.y+.13,pos.z-.03), h=Tp(cote*.18,.06,.0);
    const genou=h.clone().lerp(cheville,.5); genou.z+=S.kneeZ+Math.max(0,(1.26-S.hanche))*.9; genou.x+=cote*.05;
    j.maj([h,h.clone().lerp(genou,.6),genou,genou.clone().lerp(cheville,.6),cheville]);
    pi.position.set(pos.x,pos.y,pos.z-.03); pi.rotation.set(ro,cote*.32,0);
  }

  /* Queue */
  const b=Tp(.06,.13,-.17), pts=[b];
  const sw=S.qSway, e=S.qEnroule;
  pts.push(V(.36+sw*.1,.9,-.42+sw*.12),V(.84+sw*.2,.62,-.52+sw*.2),V(1.32+sw*.28,.72+sw*.05,-.54+sw*.25));
  const cxq=1.34+sw*.32, cyq=1.2+sw*.08, tours=1.65*e;
  for(let i=0;i<=18;i++){
    const u=i/18, a=-Math.PI/2+.25+u*tours*Math.PI*2, r=(.48-.385*u)*(1+(1-e)*1.1);
    pts.push(V(cxq+Math.cos(a)*r,cyq+Math.sin(a)*r,-.54+sw*.25+u*.06));
  }
  queue.maj(pts);

  /* Bulle au-dessus de la tête */
  if(scene.bulle){
    const p=tete.getWorldPosition(new THREE.Vector3()).add(V(.45,.72,0)).project(camera);
    const px=(p.x+1)/2*innerWidth, py=(1-p.y)/2*innerHeight;
    bulle.style.transform=`translate(${Math.max(8,Math.min(innerWidth-bulle.offsetWidth-8,px-30))}px,${Math.max(8,py-bulle.offsetHeight)}px)`;
  }
}

function dimension(){
  renderer.setSize(innerWidth,innerHeight);
  camera.aspect=innerWidth/innerHeight;
  const portrait=camera.aspect<.8;
  camera.fov=portrait?42:32;
  camera.updateProjectionMatrix();
  /* Sur téléphone : plus de recul pour la queue, et il monte au-dessus des boutons */
  controls.target.set(portrait?.35:0,portrait?1.15:1.72,0);
  camera.position.set(portrait?1.3:1.1,portrait?1.7:2.3,portrait?10.8:8.4);
  controls.maxDistance=portrait?16:14;
}
addEventListener('resize',dimension); dimension();

function boucle(now){
  const dt=Math.min(.05,(now-dernier)/1000); dernier=now;
  pas(dt); controls.update(); renderer.render(scene3d,camera);
  requestAnimationFrame(boucle);
}
