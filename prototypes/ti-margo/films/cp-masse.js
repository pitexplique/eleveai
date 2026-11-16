/* ============================================================
   Série Masse CP : les shorts en dessin animé. Outils : films/cp-commun.js.
   Chaque film vit dans son fichier, films/cp-masse-<épisode>.js ; ici, les objets à la craie.
   La balance, le sac et deuxAuPlusM sont COPIÉS de films/ce2-masse.js (17/11), pour ne pas toucher au CE2.
   ⛔ Au CP : lourd, léger, on soupèse, la balance ; pas d'unité.
   ============================================================ */
const LAITON='#fab005', TOILE='#c9a26b', VERRE_M='#dee2e6';
const entreM=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));
const doux=u=>u*u*(3-2*u);

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

/* Un sac à la craie : (x, yBas) = le milieu du fond */
function sacCraie(c,x,yBas,w,h,z=1,coul=TOILE){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k;
  c.fillStyle=coul; c.strokeStyle='#5c3d00'; c.lineWidth=5; c.lineJoin='round'; c.beginPath();
  c.moveTo(x-w*.42,yBas); c.quadraticCurveTo(x-w*.6,yBas-h*.5,x-w*.22,yBas-h); c.lineTo(x+w*.22,yBas-h);
  c.quadraticCurveTo(x+w*.6,yBas-h*.5,x+w*.42,yBas); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x-w*.22,yBas-h); c.lineTo(x-w*.3,yBas-h-h*.18); c.lineTo(x,yBas-h-h*.08); c.lineTo(x+w*.3,yBas-h-h*.18); c.lineTo(x+w*.22,yBas-h); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='#e03131'; c.lineWidth=7; c.beginPath(); c.moveTo(x-w*.24,yBas-h+4); c.lineTo(x+w*.24,yBas-h+4); c.stroke(); }

/* Un gros ballon de plage : (x, y) = le centre, r = le rayon */
function ballonCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.15,z);
  const coul=['#ff6b6b','#f8f9fa','#ffd43b','#f8f9fa','#4dabf7','#f8f9fa'];
  coul.forEach((k,i)=>{ c.fillStyle=k; c.beginPath(); c.moveTo(x,y); c.arc(x,y,r,-Math.PI/2+i*Math.PI/3,-Math.PI/2+(i+1)*Math.PI/3); c.closePath(); c.fill(); });
  c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.stroke();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x,y,r*.16,0,7); c.fill(); }

/* Une petite bille en fer, grise et brillante */
function billeCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.15,z);
  c.fillStyle='#868e96'; c.strokeStyle='#343a40'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x-r*.35,y-r*.35,r*.28,0,7); c.fill(); }

/* Une plume : (x, y) = le centre, s = la longueur */
function plumeCraie(c,x,y,s,z=1){ if(z<=0) return; s*=Math.min(1.15,z);
  c.save(); c.translate(x,y); c.rotate(-.7); c.fillStyle='#f8f9fa'; c.strokeStyle='#ced4da'; c.lineWidth=3;
  c.beginPath(); c.ellipse(0,-s*.08,s*.16,s*.42,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.moveTo(0,s*.5); c.lineTo(0,-s*.45); c.stroke(); c.restore(); }

/* Une pomme rouge : (x, y) = le centre */
function pommeCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.15,z);
  c.fillStyle='#e03131'; c.beginPath(); c.arc(x-r*.35,y,r*.75,0,7); c.arc(x+r*.35,y,r*.75,0,7); c.fill();
  c.strokeStyle='#8a5a2b'; c.lineWidth=6; c.beginPath(); c.moveTo(x,y-r*.6); c.lineTo(x+r*.1,y-r*1.05); c.stroke();
  c.fillStyle='#51cf66'; c.beginPath(); c.ellipse(x+r*.38,y-r*.95,r*.3,r*.14,-.5,0,7); c.fill(); }

/* Une pastèque : (x, y) = le centre, w × h */
function pastequeCraie(c,x,y,w,h,z=1){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k;
  c.fillStyle='#2f9e44'; c.beginPath(); c.ellipse(x,y,w/2,h/2,0,0,7); c.fill();
  c.strokeStyle='#1b5e20'; c.lineWidth=7; for(const u of [-.6,-.2,.2,.6]){ c.beginPath(); c.ellipse(x+u*w*.32,y,w*.07,h*.46,0,0,7); c.stroke(); } }

/* Un doudou ours, brun et tout doux : (x, yBas) = le milieu, en bas ; s = l'échelle (1 = 150 px de haut) */
function doudouCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const B='#c08552', F='#f1d3b3';
  const cy=yBas-48*s, ty=yBas-112*s;
  c.fillStyle=B; c.strokeStyle='#6f4518'; c.lineWidth=4;
  for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*34*s,yBas-14*s,20*s,14*s,0,0,7); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(x,cy,44*s,46*s,0,0,7); c.fill(); c.stroke();
  c.fillStyle=F; c.beginPath(); c.ellipse(x,cy+6*s,26*s,28*s,0,0,7); c.fill();
  c.fillStyle=B; for(const u of [-1,1]){ c.beginPath(); c.arc(x+u*28*s,ty-30*s,14*s,0,7); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(x,ty,38*s,0,7); c.fill(); c.stroke();
  c.fillStyle=F; c.beginPath(); c.ellipse(x,ty+12*s,17*s,13*s,0,0,7); c.fill();
  c.fillStyle='#212529'; for(const u of [-1,1]){ c.beginPath(); c.arc(x+u*14*s,ty-6*s,4.5*s,0,7); c.fill(); }
  c.beginPath(); c.ellipse(x,ty+7*s,6*s,4.5*s,0,0,7); c.fill();
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(x,ty+38*s); c.lineTo(x-20*s,ty+28*s); c.lineTo(x-20*s,ty+50*s); c.closePath();
  c.moveTo(x,ty+38*s); c.lineTo(x+20*s,ty+28*s); c.lineTo(x+20*s,ty+50*s); c.closePath(); c.fill(); }

/* Une petite voiture en fer, grise et brillante : (x, yBas) = le milieu, au sol ; s = l'échelle (1 = 150 px de long) */
function voitureFerCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z);
  c.fillStyle='#868e96'; c.strokeStyle='#343a40'; c.lineWidth=4; c.lineJoin='round';
  c.beginPath(); c.roundRect(x-75*s,yBas-48*s,150*s,30*s,8*s); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x-42*s,yBas-48*s); c.lineTo(x-26*s,yBas-76*s); c.lineTo(x+28*s,yBas-76*s); c.lineTo(x+46*s,yBas-48*s); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#a5d8ff'; c.beginPath(); c.moveTo(x-32*s,yBas-50*s); c.lineTo(x-21*s,yBas-70*s); c.lineTo(x-2*s,yBas-70*s); c.lineTo(x-2*s,yBas-50*s); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x+4*s,yBas-50*s); c.lineTo(x+4*s,yBas-70*s); c.lineTo(x+24*s,yBas-70*s); c.lineTo(x+36*s,yBas-50*s); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; c.fillRect(x-60*s,yBas-40*s,26*s,5*s);
  c.fillStyle='#212529'; for(const u of [-1,1]){ c.beginPath(); c.arc(x+u*45*s,yBas-17*s,17*s,0,7); c.fill(); }
  c.fillStyle='#ced4da'; for(const u of [-1,1]){ c.beginPath(); c.arc(x+u*45*s,yBas-17*s,7*s,0,7); c.fill(); } }

/* Le goûter : un petit biscuit rond, doré : (x, y) = le centre */
function biscuitCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.15,z);
  c.fillStyle='#e9b872'; c.strokeStyle='#8a5a2b'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#6f4518'; for(const [u,v] of [[-.4,-.3],[.35,-.35],[0,.1],[-.35,.45],[.4,.38]]){ c.beginPath(); c.arc(x+u*r,y+v*r,r*.1,0,7); c.fill(); } }

/* WinRT donne parfois 3 ou 4 jetons identiques : on en garde 2 au plus (voixDe sait sauter une paire) */
function deuxAuPlusM(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const x of CL[k]){ const n=res.length;
    if(n>=2&&res[n-1][1]===x[1]&&res[n-2][1]===x[1]) continue; res.push(x); } CL[k]=res; } }
