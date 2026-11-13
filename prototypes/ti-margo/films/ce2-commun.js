/* Outils communs des shorts CE2 (séries ce2-*) : COPIE de films/cm1-commun.js du 13/11 (même socle : voix mot à mot,
   ardoise, miniature « Dessin animé », gestes, salle de classe, carreaux et tour orange). page.html charge
   <préfixe>-commun.js : le CE2 a donc le sien. À fusionner dans short.js quand plus aucune session n'y écrit. */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ---- */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{ const n=norme(w);
        /* un signe écrit (+, −, ×) prend le mot dit seul (« plus », « moins », « fois ») */
        if(!n){ const sg={'+':'plus','−':'moins','×':'fois'}[w]; if(sg&&l[i]&&norme(l[i][1])===sg){ av=A[clip]+l[i][0]; i++; } tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  /* L'instant du n-ième mot « m » d'un clip (un instant « 7 plus » compte pour « 7 » et pour « plus ») */
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  /* L'instant de la k-ième marque du clip (0 = la première) */
  const marque=(clip,k)=>A[clip]+CL[clip][k][0];
  return {dit,mot,marque};
}
/* Un nombre long (« deux cent soixante-seize ») a une marque par mot dit, toutes au même texte (« 276 »,
   « 276 », « 276 ») : voixDe n'en saute qu'une. Appelé en tête d'un film (épisodes 03 à 05), ceci fusionne
   ces suites en UNE marque (la première). Seulement pour un nombre seul : « 20 boîtes », dit deux fois de
   suite, reste géré par voixDe. Les épisodes 01 et 02 ne l'appellent pas. */
function fusionnerNombres(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const l=CL[k], res=[];
    for(const [t,w] of l){ const s=w.trim(); const der=res[res.length-1];
      if(der&&/^\d+$/.test(s)&&der[1]===s) continue; res.push([t,/^\d+$/.test(s)?s:w]); }
    CL[k]=res; } }
/* Enchaîne les clips : durée lue sur le WAV ; attente supplémentaire après certains clips */
function enchainer(depart,liste,DUR,apres={},ecart=.2){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});
/* Une suite de légendes : chacune paraît à son premier mot et reste jusqu'à la suivante */
function suiteDe(fin,top,fs,...listes){ return listes.map((ph,k)=>groupe(ph[0][0]-.08,k+1<listes.length?listes[k+1][0][0]-.08:fin,top,fs,...ph)); }

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention « Dessin animé » ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='560px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:28px;top:740px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
  m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';
/* Le dessin de la miniature : une petite ardoise avec un calcul (lignes de texte) */
function ardoiseMini(lignes,w=330,h=250){ const pas=(h-40)/lignes.length;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect x="6" y="6" width="${w-12}" height="${h-12}" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    lignes.map(([s,coul],k)=>`<text x="${w/2}" y="${30+pas*(k+.78)}" font-family="Segoe UI" font-weight="800" font-size="${Math.min(84,pas*.92,(w-40)/(s.length*.56))}" fill="${coul||'#f8f9fa'}" text-anchor="middle">${s}</text>`).join('')+'</svg>'; }

/* ---- Le tableau noir : une ardoise face caméra, écrite à la craie à chaque image ---- */
function poserTableau({L=4.4,H=3,x=0,y=4.5,z=-1.5,res=240,fond='#1f3b2c',bois=0x8a5a2b,pieds=true}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.26,H+.26,.14,4,.05),toon(bois),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  if(pieds) for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(bois),[s*(L/2-.5),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,fond,effacer(){ c.fillStyle=fond; c.fillRect(0,0,cv.width,cv.height); },maj(){ tx.needsUpdate=true; }};
}
/* Les craies : blanc, une couleur par rang (0 unités, 1 dizaines, 2 centaines, 3 milliers), la retenue */
const CRAIE={blanc:'#f8f9fa',r0:'#74c0fc',r1:'#ffc078',r2:'#faa2c1',r3:'#b197fc',ret:'#ff922b',ok:'#8ce99a',faux:'#ff8787',jaune:'#ffd43b',gris:'#adb5bd'};
const NOM_RANG=['u','d','c','m'];
function ecrire(c,s,x,y,taille=84,coul=CRAIE.blanc,align='center'){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
/* Grandit puis retombe à sa taille : pour insister sur ce que la voix dit */
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };
/* 0 avant t, puis un pop atténué (k) qui retombe à 1 */
const zoom=(T,t,k=.5)=>T<t?0:Math.max(1,pop(T,t)*k+(1-k));
function coche(c,x,y,s=1){ c.strokeStyle=CRAIE.ok; c.lineWidth=18*s; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x+40*s,y+50*s); c.lineTo(x+130*s,y-60*s); c.stroke(); }
function cercle(c,x,y,r,coul=CRAIE.faux,u=1){ c.strokeStyle=coul; c.lineWidth=10; c.beginPath(); c.arc(x,y,r*(.6+.4*Math.min(1,u)),0,7); c.stroke(); }

/* ---- La salle de classe : parquet, mur, fenêtre, bureau, plante ---- */
function poserClasse(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd9a066})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-12;i<=12;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0xc08550})); l.rotation.x=-Math.PI/2; l.position.set(i*1.1,0,-10); scene3d.add(l); }
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(80,30),new THREE.MeshBasicMaterial({color:0xfff1c9})); mur.position.set(0,15,-4.2); scene3d.add(mur);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(80,.35),new THREE.MeshBasicMaterial({color:0x9c6b3c})); plinthe.position.set(0,.17,-4.18); scene3d.add(plinthe);
  const fen=new THREE.Group(); fen.position.set(-5.3,4.6,-4.15); scene3d.add(fen);
  piece(fen,new RoundedBoxGeometry(2.4,2.8,.1,3,.04),toon(0xffffff),[0,0,0],CONTOUR_FIN);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.5),new THREE.MeshBasicMaterial({color:0x8fd3f4})); ciel.position.z=.06; fen.add(ciel);
  piece(fen,new THREE.BoxGeometry(.08,2.5,.04),toon(0xffffff),[0,0,.08],null); piece(fen,new THREE.BoxGeometry(2.1,.08,.04),toon(0xffffff),[0,0,.08],null);
  const bureau=new THREE.Group(); bureau.position.set(-2.6,0,-1.6); scene3d.add(bureau);
  piece(bureau,new RoundedBoxGeometry(1.9,.12,.9,3,.03),toon(0xb07a45),[0,1.02,0],CONTOUR_SOMBRE);
  for(const sx of [-1,1]) piece(bureau,new RoundedBoxGeometry(.12,1,.8,2,.02),toon(0x8a5a2b),[sx*.85,.5,0],CONTOUR_SOMBRE);
  piece(bureau,new RoundedBoxGeometry(.5,.08,.36,2,.02),toon(0xe03131),[-.3,1.12,0],CONTOUR_FIN);
  piece(bureau,new RoundedBoxGeometry(.46,.08,.34,2,.02),toon(0x1971c2),[-.28,1.2,0],CONTOUR_FIN);
  const pot=new THREE.Group(); pot.position.set(3.1,0,-2.2); scene3d.add(pot);
  piece(pot,new THREE.CylinderGeometry(.32,.24,.55,14),toon(0xd9480f),[0,.27,0],CONTOUR_FIN);
  for(let i=0;i<5;i++) piece(pot,new THREE.SphereGeometry(.3,12,10),toon(0x37b24d),[Math.cos(i*1.3)*.22,.8+i*.12,Math.sin(i*1.3)*.12],CONTOUR_FIN);
  return {bureau,pot,fen};
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
/* Le plan commun : gros plan au début, ardoise pendant l'histoire, plan large pour la question et la fin */
function cadrer(cam,{gros,large}){ scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
  if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
  if(large){ scene.x=-.1; cam.d=11.4; cam.y=3.55; } }
function cssCartes(){ const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css); }

/* ---- L'aire et le périmètre, à la craie ---- */
const CARREAU='#74c0fc', CARREAU_B='#1864ab', TOUR='#ff922b';
/* Un carreau (coin haut-gauche x, y ; côté s), qui grossit depuis son centre quand z va de 0 à 1 */
function carreauCraie(c,x,y,s,z=1,coul=CARREAU,bord=CARREAU_B){ if(z<=0) return; const k=Math.min(1.25,z), d=s*(1-k)/2;
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=Math.max(3,s*.06); c.beginPath(); c.roundRect(x+d+3,y+d+3,s*k-6,s*k-6,8); c.fill(); c.stroke(); }
/* Le sol vide : un rectangle de ncol × nrang cases de côté s (coin haut-gauche x, y), quadrillage pâle en pointillé */
function solVide(c,x,y,ncol,nrang,s,quad=true,fond='#6b4a2b'){ c.fillStyle=fond; c.fillRect(x,y,ncol*s,nrang*s);
  if(quad){ c.strokeStyle='rgba(255,255,255,.28)'; c.lineWidth=3; c.setLineDash([10,10]); c.beginPath();
    for(let i=1;i<ncol;i++){ c.moveTo(x+i*s,y); c.lineTo(x+i*s,y+nrang*s); } for(let j=1;j<nrang;j++){ c.moveTo(x,y+j*s); c.lineTo(x+ncol*s,y+j*s); }
    c.stroke(); c.setLineDash([]); }
  c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x,y,ncol*s,nrang*s); }
/* Le tour d'un rectangle (la ficelle, la plinthe) tracé de u = 0 à 1, à partir du coin haut-gauche, dans le sens des aiguilles */
function tourCraie(c,x,y,w,h,u=1,coul=TOUR,lw=14){ if(u<=0) return; u=Math.min(1,u); let reste=2*(w+h)*u;
  const pts=[[x,y],[x+w,y],[x+w,y+h],[x,y+h],[x,y]]; c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(x,y);
  for(let k=1;k<5&&reste>0;k++){ const [ax,ay]=pts[k-1],[bx,by]=pts[k], l=Math.hypot(bx-ax,by-ay), v=Math.min(1,reste/l);
    c.lineTo(ax+(bx-ax)*v,ay+(by-ay)*v); reste-=l; }
  c.stroke(); }
