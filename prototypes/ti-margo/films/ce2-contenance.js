/* ============================================================
   Série Contenance CE2 : les shorts en dessin animé. Outils : films/ce2-commun.js.
   Chaque film vit dans son fichier, films/ce2-contenance-<épisode>.js ; ici, les objets à la craie.
   Les récipients sont COPIÉS de films/cm1-contenance.js (le CE2 ne charge pas les fichiers CM1).
   ⛔ Unités du CE2 : L, dL, cL seulement.
   ============================================================ */
const JUS='#ff922b', EAU='#4dabf7', LIMONADE='#ffec99', VERRE='#dee2e6';

/* Une bouteille à la craie : (x, yBas) = le milieu du fond, w × h = le corps (sans le goulot),
   niv = le niveau du liquide (0 → 1), z = l'apparition (grossit depuis le fond) */
function bouteilleCraie(c,x,yBas,w,h,niv=.85,coul=JUS,z=1,bouchon='#2f9e44'){ if(z<=0) return; const k=Math.min(1.15,z);
  w*=k; h*=k; const g=x-w/2, r=Math.min(18*k,w/4), hl=(h-8)*Math.max(0,Math.min(1,niv));
  c.fillStyle=coul; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.strokeStyle=VERRE; c.lineWidth=6; c.lineJoin='round'; c.beginPath();
  c.moveTo(g+r,yBas); c.lineTo(g+w-r,yBas); c.quadraticCurveTo(g+w,yBas,g+w,yBas-r); c.lineTo(g+w,yBas-h);
  c.lineTo(x+w*.18,yBas-h-h*.16); c.lineTo(x+w*.18,yBas-h-h*.28); c.lineTo(x-w*.18,yBas-h-h*.28);
  c.lineTo(x-w*.18,yBas-h-h*.16); c.lineTo(g,yBas-h); c.lineTo(g,yBas-r); c.quadraticCurveTo(g,yBas,g+r,yBas); c.stroke();
  c.fillStyle=bouchon; c.fillRect(x-w*.21,yBas-h-h*.35,w*.42,h*.08); }

/* Les graduations d'une bouteille : n parts égales (traits à gauche du corps) */
function graduer(c,x,yBas,w,h,n=10){ c.strokeStyle=VERRE; c.lineWidth=3;
  for(let i=1;i<n;i++){ const y=yBas-4-(h-8)*i/n; c.beginPath(); c.moveTo(x-w/2+4,y); c.lineTo(x-w/2+24,y); c.stroke(); } }

/* Un récipient droit à la craie : forme = 'bidon' | 'bassine' | 'seau' | 'pot' | 'verre' */
function recipientCraie(c,forme,x,yBas,w,h,niv=.8,coul=EAU,z=1){ if(z<=0) return; const k=Math.min(1.15,z);
  w*=k; h*=k; const g=x-w/2; c.lineWidth=6; c.strokeStyle=VERRE; c.lineJoin='round';
  if(forme==='bassine'||forme==='seau'||forme==='verre'){ const b=forme==='seau'?w*.4:(forme==='verre'?w*.34:w*.36), a=w/2, y=yBas-h*niv, aa=b+(a-b)*niv;
    if(niv>0){ c.fillStyle=coul; c.globalAlpha=.9; c.beginPath(); c.moveTo(x-aa+5,y); c.lineTo(x+aa-5,y); c.lineTo(x+b-5,yBas-5); c.lineTo(x-b+5,yBas-5); c.fill(); c.globalAlpha=1; }
    c.beginPath(); c.moveTo(x-a,yBas-h); c.lineTo(x-b,yBas); c.lineTo(x+b,yBas); c.lineTo(x+a,yBas-h); c.stroke();
    if(forme==='seau'){ c.beginPath(); c.arc(x,yBas-h,a*.95,Math.PI,0); c.stroke(); }
    return; }
  const hl=(h-8)*niv; c.fillStyle=coul; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.beginPath(); c.roundRect(g,yBas-h,w,h,forme==='pot'?8:12); c.stroke();
  if(forme==='bidon'){ c.beginPath(); c.arc(x+w*.15,yBas-h,w*.2,Math.PI,0); c.stroke(); c.fillStyle='#e03131'; c.fillRect(g+w*.12,yBas-h-14*k,w*.16,14*k); }
  if(forme==='pot'){ c.fillStyle='#b5651d'; c.fillRect(g-4,yBas-h-h*.16,w+8,h*.16); } }

/* Une petite cuillère à la craie : (x, y) = le milieu du creux, s = l'échelle */
function cuillereCraie(c,x,y,s=1,coul=EAU,z=1){ if(z<=0) return; s*=Math.min(1.15,z);
  c.strokeStyle=VERRE; c.lineCap='round'; c.lineWidth=9*s; c.beginPath(); c.moveTo(x+30*s,y-6*s); c.lineTo(x+125*s,y-40*s); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.ellipse(x,y,36*s,22*s,0,0,7); c.fill(); c.lineWidth=5*s; c.stroke(); }

/* Un saladier à la craie (bol large et bas, OUVERT VERS LE HAUT) : (x, y) = le milieu du bord, a = demi-largeur,
   h = profondeur, niv = le niveau (0 → 1) */
function saladierCraie(c,x,y,a,h,niv=.4,coul=JUS,z=1){ if(z<=0) return; const k=Math.min(1.15,z); a*=k; h*=k;
  if(niv>0){ const y0=y+h-h*niv, t0=Math.asin(Math.min(1,(y0-y)/h)); c.fillStyle=coul; c.globalAlpha=.9; c.beginPath();
    c.ellipse(x,y,a-5,h-5,0,t0,Math.PI-t0); c.closePath(); c.fill(); c.globalAlpha=1; }
  c.strokeStyle=VERRE; c.lineWidth=6; c.beginPath(); c.ellipse(x,y,a,h,0,0,Math.PI); c.stroke();
  c.globalAlpha=.5; c.lineWidth=3; c.beginPath(); c.moveTo(x-a,y); c.lineTo(x+a,y); c.stroke(); c.globalAlpha=1; }

/* Une règle à la craie, posée debout : (x, yBas) = le bas, h = la hauteur, n graduations */
function regleCraie(c,x,yBas,h,z=1,n=20){ if(z<=0) return; h*=Math.min(1.15,z); const w=46;
  c.fillStyle='#fab005'; c.fillRect(x-w/2,yBas-h,w,h); c.strokeStyle='#5c3d00'; c.lineWidth=3;
  for(let i=1;i<n;i++){ const y=yBas-h*i/n, l=i%5===0?22:12; c.beginPath(); c.moveTo(x-w/2,y); c.lineTo(x-w/2+l,y); c.stroke(); } }

/* Un arrosoir à la craie : (x, yBas) = le milieu du fond, s = l'échelle, niv = l'eau */
function arrosoirCraie(c,x,yBas,s=1,niv=.8,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const w=150*s, h=130*s, g=x-w/2;
  const hl=(h-10)*niv; c.fillStyle=EAU; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.strokeStyle='#40c057'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.roundRect(g,yBas-h,w,h,14); c.stroke();
  c.beginPath(); c.moveTo(g+w-6,yBas-h*.35); c.lineTo(g+w+85*s,yBas-h-25*s); c.stroke();
  c.fillStyle='#40c057'; c.beginPath(); c.ellipse(g+w+92*s,yBas-h-30*s,14*s,22*s,-.6,0,7); c.fill();
  c.beginPath(); c.arc(x,yBas-h,52*s,Math.PI,0); c.stroke(); }

/* Une plante en pot à la craie : (x, yBas) = le bas du pot ; cactus = true pour un cactus */
function planteCraie(c,x,yBas,s=1,z=1,cactus=false){ if(z<=0) return; s*=Math.min(1.15,z);
  c.fillStyle='#b5651d'; c.beginPath(); c.moveTo(x-34*s,yBas-60*s); c.lineTo(x+34*s,yBas-60*s); c.lineTo(x+25*s,yBas); c.lineTo(x-25*s,yBas); c.fill();
  if(cactus){ c.fillStyle='#2f9e44'; c.beginPath(); c.roundRect(x-16*s,yBas-160*s,32*s,104*s,16*s); c.fill();
    c.beginPath(); c.roundRect(x-44*s,yBas-130*s,22*s,50*s,11*s); c.fill(); c.fillRect(x-30*s,yBas-92*s,16*s,12*s); return; }
  c.strokeStyle='#51cf66'; c.lineWidth=7*s; c.beginPath(); c.moveTo(x,yBas-60*s); c.lineTo(x,yBas-150*s); c.stroke();
  c.fillStyle='#51cf66'; for(const [dx,dy,r] of [[-24,-95,.5],[24,-118,-.5]]){ c.beginPath(); c.ellipse(x+dx*s,yBas+dy*s,26*s,12*s,r,0,7); c.fill(); }
  c.fillStyle='#f783ac'; c.beginPath(); c.arc(x,yBas-158*s,18*s,0,7); c.fill(); }

const entreC=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));

/* WinRT donne parfois 3 jetons identiques pour « 200 moins » : on en garde 2 au plus (voixDe sait sauter une paire) */
function deuxAuPlus(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const x of CL[k]){ const n=res.length;
    if(n>=2&&res[n-1][1]===x[1]&&res[n-2][1]===x[1]) continue; res.push(x); } CL[k]=res; } }
