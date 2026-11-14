/* ============================================================
   Série Contenance CM1 : les shorts en dessin animé (ceinture blanche). Outils : films/cm1-commun.js.
   Chaque film vit dans son fichier, films/cm1-contenance-<épisode>.js ; ici, les récipients à la craie.
   Code couleur des paysages (contenance_cm1_commun.py) : jus orange, eau bleue, miel ambre.
   ============================================================ */
const JUS='#ff922b', EAU='#4dabf7', MIEL='#fcc419', VERRE='#dee2e6';

/* Une bouteille à la craie : (x, yBas) = le milieu du fond, w × h = le corps (sans le goulot),
   niv = le niveau du liquide (0 → 1), z = l'apparition (grossit depuis le fond) */
function bouteilleCraie(c,x,yBas,w,h,niv=.85,coul=JUS,z=1,bouchon='#2f9e44'){ if(z<=0) return; const k=Math.min(1.15,z);
  w*=k; h*=k; const g=x-w/2, r=Math.min(18*k,w/4), hl=(h-8)*niv;
  c.fillStyle=coul; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.strokeStyle=VERRE; c.lineWidth=6; c.lineJoin='round'; c.beginPath();
  c.moveTo(g+r,yBas); c.lineTo(g+w-r,yBas); c.quadraticCurveTo(g+w,yBas,g+w,yBas-r); c.lineTo(g+w,yBas-h);
  c.lineTo(x+w*.18,yBas-h-h*.16); c.lineTo(x+w*.18,yBas-h-h*.28); c.lineTo(x-w*.18,yBas-h-h*.28);
  c.lineTo(x-w*.18,yBas-h-h*.16); c.lineTo(g,yBas-h); c.lineTo(g,yBas-r); c.quadraticCurveTo(g,yBas,g+r,yBas); c.stroke();
  c.fillStyle=bouchon; c.fillRect(x-w*.21,yBas-h-h*.35,w*.42,h*.08); }

/* Un récipient droit à la craie (bidon, bassine, seau, pot…) : forme = 'bidon' | 'bassine' | 'seau' | 'pot' | 'verre' */
function recipientCraie(c,forme,x,yBas,w,h,niv=.8,coul=EAU,z=1){ if(z<=0) return; const k=Math.min(1.15,z);
  w*=k; h*=k; const g=x-w/2; c.lineWidth=6; c.strokeStyle=VERRE; c.lineJoin='round';
  if(forme==='bassine'||forme==='seau'||forme==='verre'){ const b=forme==='seau'?w*.4:(forme==='verre'?w*.34:w*.36), a=w/2, y=yBas-h*niv, aa=b+(a-b)*niv;
    c.fillStyle=coul; c.globalAlpha=.9; c.beginPath(); c.moveTo(x-aa+5,y); c.lineTo(x+aa-5,y); c.lineTo(x+b-5,yBas-5); c.lineTo(x-b+5,yBas-5); c.fill(); c.globalAlpha=1;
    c.beginPath(); c.moveTo(x-a,yBas-h); c.lineTo(x-b,yBas); c.lineTo(x+b,yBas); c.lineTo(x+a,yBas-h); c.stroke();
    if(forme==='seau'){ c.beginPath(); c.arc(x,yBas-h,a*.95,Math.PI,0); c.stroke(); }
    return; }
  const hl=(h-8)*niv; c.fillStyle=coul; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.beginPath(); c.roundRect(g,yBas-h,w,h,forme==='pot'?8:12); c.stroke();
  if(forme==='bidon'){ c.beginPath(); c.arc(x+w*.15,yBas-h,w*.2,Math.PI,0); c.stroke(); c.fillStyle='#e03131'; c.fillRect(g+w*.12,yBas-h-14*k,w*.16,14*k); }
  if(forme==='pot'){ c.fillStyle='#b5651d'; c.fillRect(g-4,yBas-h-h*.16,w+8,h*.16); } }

/* Une petite cuillère à la craie : (x, y) = le milieu du creux, s = l'échelle, coul = ce qu'elle contient */
const GRENADINE='#e03131';
function cuillereCraie(c,x,y,s=1,coul=GRENADINE,z=1){ if(z<=0) return; s*=Math.min(1.15,z);
  c.strokeStyle=VERRE; c.lineCap='round'; c.lineWidth=9*s; c.beginPath(); c.moveTo(x+30*s,y-6*s); c.lineTo(x+125*s,y-40*s); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.ellipse(x,y,36*s,22*s,0,0,7); c.fill(); c.lineWidth=5*s; c.stroke(); }

/* Une piscine gonflable à la craie (vue en perspective) : (x, y) = le centre du bord, w × h = l'ellipse, niv = l'eau (0 → 1) */
function piscineCraie(c,x,y,w,h,z=1,niv=1){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k;
  c.fillStyle='#d6336c'; c.beginPath(); c.ellipse(x,y+h*.35,w/2,h/2,0,0,7); c.fill(); c.fillRect(x-w/2,y,w,h*.35);
  c.fillStyle='#f783ac'; c.beginPath(); c.ellipse(x,y,w/2,h/2,0,0,7); c.fill();
  c.fillStyle='#1f3b2c'; c.beginPath(); c.ellipse(x,y,w*.4,h*.33,0,0,7); c.fill();
  if(niv>0){ const e=Math.min(1,niv); c.fillStyle=EAU; c.beginPath(); c.ellipse(x,y,w*.4*e,h*.33*e,0,0,7); c.fill(); }
  c.strokeStyle=VERRE; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,w/2,h/2,0,0,7); c.stroke(); }
