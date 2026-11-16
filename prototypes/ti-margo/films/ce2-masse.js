/* ============================================================
   Série Masse CE2 : les shorts en dessin animé. Outils : films/ce2-commun.js.
   Chaque film vit dans son fichier, films/ce2-masse-<épisode>.js ; ici, les objets à la craie.
   ⛔ Unités du CE2 : kg, g (et la tonne en lecture seulement).
   ============================================================ */
const FROMAGE='#ffd43b', CROUTE='#f08c00', LAITON='#fab005', TOILE='#c9a26b', VERRE_M='#dee2e6';
const entreM=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));
const doux=u=>u*u*(3-2*u);

/* Un morceau de fromage à la craie : (x, yBas) = le milieu du dessous, w × h, z = l'apparition */
function fromageCraie(c,x,yBas,w,h,z=1){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k; const g=x-w/2;
  c.fillStyle=FROMAGE; c.strokeStyle=CROUTE; c.lineWidth=6; c.lineJoin='round'; c.beginPath();
  c.moveTo(g,yBas); c.lineTo(g+w,yBas); c.lineTo(g+w,yBas-h); c.lineTo(g,yBas-h*.38); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#e8b923'; for(const [u,v,r] of [[.25,.2,.09],[.6,.32,.12],[.8,.62,.08],[.45,.55,.06]]){
    c.beginPath(); c.arc(g+w*u,yBas-h*v,Math.min(w,h)*r,0,7); c.fill(); } }

/* Une balance à deux plateaux à la craie : (x, y) = le pivot, L = la demi-largeur du fléau,
   a = l'inclinaison (a > 0 : le plateau de DROITE descend). Renvoie le dessus des deux plateaux. */
function balanceCraie(c,x,y,L,a=0,z=1){ if(z<=0) return null; const k=Math.min(1.15,z); L*=k;
  const H=390*k, susp=135*k, pw=118*k, dy=L*Math.sin(a), dx=L*Math.cos(a);
  c.fillStyle='#8a5a2b'; c.fillRect(x-100*k,y+H,200*k,24*k);
  c.strokeStyle=VERRE_M; c.lineWidth=12*k; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+H); c.stroke();
  c.strokeStyle=LAITON; c.lineWidth=11*k; c.beginPath(); c.moveTo(x-dx,y-dy); c.lineTo(x+dx,y+dy); c.stroke();
  c.fillStyle=LAITON; c.beginPath(); c.arc(x,y,15*k,0,7); c.fill();
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(x-10*k,y+24*k); c.lineTo(x+10*k,y+24*k); c.lineTo(x,y+48*k); c.fill();
  const haut={};
  for(const [s,nom] of [[-1,'g'],[1,'d']]){ const ex=x+s*dx, ey=y+s*dy, py=ey+susp;
    c.strokeStyle=VERRE_M; c.lineWidth=3; c.beginPath(); c.moveTo(ex,ey); c.lineTo(ex-pw*.8,py); c.moveTo(ex,ey); c.lineTo(ex+pw*.8,py); c.stroke();
    c.strokeStyle=LAITON; c.lineWidth=8*k; c.beginPath(); c.ellipse(ex,py,pw,30*k,0,0,Math.PI); c.stroke();
    c.beginPath(); c.moveTo(ex-pw,py); c.lineTo(ex+pw,py); c.stroke();
    haut[nom]={x:ex,y:py}; }
  return haut; }

/* Un sac à la craie (farine, pommes de terre) : (x, yBas) = le milieu du fond */
function sacCraie(c,x,yBas,w,h,z=1,coul=TOILE){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k;
  c.fillStyle=coul; c.strokeStyle='#5c3d00'; c.lineWidth=5; c.lineJoin='round'; c.beginPath();
  c.moveTo(x-w*.42,yBas); c.quadraticCurveTo(x-w*.6,yBas-h*.5,x-w*.22,yBas-h); c.lineTo(x+w*.22,yBas-h);
  c.quadraticCurveTo(x+w*.6,yBas-h*.5,x+w*.42,yBas); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x-w*.22,yBas-h); c.lineTo(x-w*.3,yBas-h-h*.18); c.lineTo(x,yBas-h-h*.08); c.lineTo(x+w*.3,yBas-h-h*.18); c.lineTo(x+w*.22,yBas-h); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='#e03131'; c.lineWidth=7; c.beginPath(); c.moveTo(x-w*.24,yBas-h+4); c.lineTo(x+w*.24,yBas-h+4); c.stroke(); }

/* WinRT donne parfois 3 ou 4 jetons identiques (« 900 grammes ») : on en garde 2 au plus (voixDe sait sauter une paire) */
function deuxAuPlusM(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const x of CL[k]){ const n=res.length;
    if(n>=2&&res[n-1][1]===x[1]&&res[n-2][1]===x[1]) continue; res.push(x); } CL[k]=res; } }
