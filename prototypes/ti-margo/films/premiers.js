/* Série Nombres premiers 4e : les 4 shorts (épisodes 08 à 11, voix 4e-premier-<ép>-short).
   Les mêmes outils que films/divisibilite.js (recopiés à l'identique : voixDe, enchainer, suiteDe,
   poserMiniature, PARI, poserTableau, CRAIE, ecrire, pop, tz, tournesol, rect, fleche, poserJardin, gestes).
   Chaque film vit dans films/premiers-<épisode>.js. */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ----
   « ÷ » à l'écran se lit « divisé par » : il consomme ces deux mots. */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{
        if(w==='÷'){ while(i<l.length&&['divise','par'].includes(norme(l[i][1]))){ av=A[clip]+l[i][0]; i++; } tm.push(av); return; }
        const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  /* L'instant du n-ième mot « m » d'un clip */
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}
function enchainer(depart,liste,DUR,apres={},ecart=.2){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});
function suiteDe(fin,top,fs,...listes){ return listes.map((ph,k)=>groupe(ph[0][0]-.08,k+1<listes.length?listes[k+1][0][0]-.08:fin,top,fs,...ph)); }

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='560px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:44px;top:732px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Film d’animation 3D';
  m.style.cssText='left:176px;right:176px;bottom:36px;text-align:center;font-size:66px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';

/* ---- Le panneau du jardinier : une ardoise sur pieds, écrite à la craie à chaque image ---- */
function poserTableau({L=4.4,H=3,x=0,y=4.5,z=-1.5,res=240,fond='#24452c',bois=0x8a5a2b,pieds=true}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.26,H+.26,.14,4,.05),toon(bois),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  if(pieds) for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(bois),[s*(L/2-.5),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,fond,effacer(){ c.fillStyle=fond; c.fillRect(0,0,cv.width,cv.height); },maj(){ tx.needsUpdate=true; }};
}
const CRAIE={blanc:'#f8f9fa',petit:'#ffd43b',grand:'#74c0fc',ok:'#8ce99a',faux:'#ff8787',rose:'#faa2c1'};
function ecrire(c,s,x,y,taille=84,coul=CRAIE.blanc,align='center'){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };
const tz=(T,t0)=>T>=t0?Math.max(1,pop(T,t0)):0;
/* Un tournesol vu d'en haut, à la craie */
function tournesol(c,x,y,r,z=1){ if(z<=0) return; r*=z; c.fillStyle='#ffd43b'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.fillStyle='#7c4a1d'; c.beginPath(); c.arc(x,y,r*.34,0,7); c.fill(); }
/* lignes rangées de col tournesols, centrées en (x,y) */
function rect(c,lignes,col,x,y,pas,r,z){ for(let i=0;i<lignes;i++) for(let j=0;j<col;j++) tournesol(c,x+(j-(col-1)/2)*pas,y+(i-(lignes-1)/2)*pas,r,z); }
/* Une flèche à la craie */
function fleche(c,x1,y1,x2,y2,coul,ep=9){ c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=ep; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x2,y2); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1), h=26; c.beginPath(); c.moveTo(x2,y2); c.lineTo(x2-h*Math.cos(a-.45),y2-h*Math.sin(a-.45)); c.lineTo(x2-h*Math.cos(a+.45),y2-h*Math.sin(a+.45)); c.closePath(); c.fill(); }

/* ---- Le jardin : pelouse, ciel, haie, clôture, tournesols au fond ---- */
function poserJardin(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x8fcf6a})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const allee=new THREE.Mesh(new THREE.PlaneGeometry(3.2,40),new THREE.MeshBasicMaterial({color:0xe9d8a6})); allee.rotation.x=-Math.PI/2; allee.position.set(0,-.01,8); scene3d.add(allee);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(200,60),new THREE.MeshBasicMaterial({color:0xbfe6ff})); ciel.position.set(0,20,-12); scene3d.add(ciel);
  const haie=new THREE.Mesh(new THREE.PlaneGeometry(200,2.2),new THREE.MeshBasicMaterial({color:0x3f8f3a})); haie.position.set(0,1.1,-11.9); scene3d.add(haie);
  const cloture=new THREE.Group(); cloture.position.set(0,0,-5); scene3d.add(cloture);
  for(let i=-16;i<=16;i++) piece(cloture,new RoundedBoxGeometry(.16,1.2,.08,2,.03),toon(0xffffff),[i*.6,.6,0],CONTOUR_FIN);
  for(const h of [.4,.95]) piece(cloture,new THREE.BoxGeometry(19.4,.1,.06),toon(0xffffff),[0,h,.06],null);
  for(let i=-9;i<=9;i++){ if(Math.abs(i)<2) continue; const f=new THREE.Group(), h=1.6+((i*i*5)%4)*.25; f.position.set(i*1.05,0,-4.3); scene3d.add(f);
    piece(f,new THREE.CylinderGeometry(.04,.05,h,8),toon(0x2f9e44),[0,h/2,0],null);
    piece(f,new THREE.CylinderGeometry(.34,.34,.06,16),toon(0xfcc419),[0,h,.04],CONTOUR_FIN).rotation.x=Math.PI/2;
    piece(f,new THREE.CylinderGeometry(.15,.15,.08,14),toon(0x7c4a1d),[0,h,.08],null).rotation.x=Math.PI/2; }
}

/* Les gestes de Ti Margo */
function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  salut(t,d=1.4){ const e=lisse(t*4)*lisse((d-t)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; },
  oups(){ P.gesteD='ouverte'; P.md.set(.98,2.42,.5); P.mg.set(-.98,2.42,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); P.tetZ=.16+Math.sin(T*2)*.03; P.tetX=-.06; P.paupiere=-1.25; },
  fier(){ P.gesteD='pouce'; P.md.set(.9,2.5+Math.sin(T*4)*.05,.45); P.cd.set(.74,1.8,.14); P.tetZ=-.1; P.tetY=Math.sin(T*2)*.1; }
}; }
