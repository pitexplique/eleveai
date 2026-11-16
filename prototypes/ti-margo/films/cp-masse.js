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

/* ---- Épisode 03 (estimer) : la branche, les chats, et les trois animaux du commentaire ---- */
/* La branche : le tronc à gauche (x0), la branche jusqu'à x1, à la hauteur y ; elle plie de « pli » px au bout.
   brancheY donne la hauteur du DESSUS de la branche en x (pour y asseoir un chat). */
const BR={x0:100,x1:740,y:430,ep:26};
const brancheY=(x,pli)=>{ const u=Math.max(0,Math.min(1,(x-BR.x0)/(BR.x1-BR.x0))); return BR.y+pli*u*u-BR.ep/2; };
function brancheCraie(c,pli,crac=0){ const N=24;
  c.fillStyle='#6f4518'; c.fillRect(28,150,86,600);
  c.strokeStyle='#8a5a2b'; c.lineWidth=BR.ep; c.lineCap='round'; c.beginPath();
  for(let k=0;k<=N;k++){ const x=BR.x0+(BR.x1-BR.x0)*k/N, y=brancheY(x,pli)+BR.ep/2; k?c.lineTo(x,y):c.moveTo(x,y); } c.stroke();
  c.fillStyle='#51cf66'; const yb=brancheY(BR.x1,pli);
  for(const [dx,dy,r] of [[18,-8,24],[40,12,20],[6,24,18]]){ c.beginPath(); c.ellipse(BR.x1+dx,yb+dy,r,r*.6,.5,0,7); c.fill(); }
  if(crac>0){ /* la fêlure près du tronc, en zigzag jaune */
    const u=Math.min(1,crac); c.strokeStyle=CRAIE.jaune; c.lineWidth=7; c.lineJoin='round'; c.beginPath();
    const x=158, y=brancheY(x,pli)+BR.ep/2; c.lineWidth=9; c.moveTo(x-6,y-44*u); c.lineTo(x+16,y-18*u); c.lineTo(x-10,y+4*u); c.lineTo(x+16,y+26*u); c.lineTo(x-2,y+46*u); c.stroke();
    c.lineWidth=6; c.beginPath(); c.moveTo(x+30,y-30*u); c.lineTo(x+52,y-48*u); c.moveTo(x+32,y+30*u); c.lineTo(x+54,y+46*u); c.stroke(); } }

/* Un chat assis : (x, yBas) = le milieu, en bas ; s = l'échelle (1 = 142 px de haut). raye = des rayures sombres. */
function chatCraie(c,x,yBas,s=1,z=1,coul='#adb5bd',raye=false){ if(z<=0) return; s*=Math.min(1.15,z);
  const by=yBas-48*s, hy=yBas-108*s, bord='#343a40';
  c.strokeStyle=coul; c.lineWidth=12*s; c.lineCap='round'; c.beginPath(); c.moveTo(x+46*s,yBas-14*s);
  c.quadraticCurveTo(x+96*s,yBas-20*s,x+84*s,yBas-78*s); c.stroke();
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=3.5;
  c.beginPath(); c.ellipse(x,by,50*s,50*s,0,0,7); c.fill(); c.stroke();
  for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*20*s,yBas-6*s,15*s,9*s,0,0,7); c.fill(); c.stroke(); }
  for(const u of [-1,1]){ c.beginPath(); c.moveTo(x+u*12*s,hy-26*s); c.lineTo(x+u*30*s,hy-54*s); c.lineTo(x+u*34*s,hy-12*s); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(x,hy,34*s,0,7); c.fill(); c.stroke();
  if(raye){ c.strokeStyle='rgba(60,20,0,.55)'; c.lineWidth=6*s; for(const u of [-.5,0,.5]){ c.beginPath(); c.moveTo(x+u*40*s,by-36*s); c.lineTo(x+u*30*s,by-12*s); c.stroke(); }
    c.beginPath(); c.moveTo(x-10*s,hy-32*s); c.lineTo(x-6*s,hy-18*s); c.moveTo(x+10*s,hy-32*s); c.lineTo(x+6*s,hy-18*s); c.stroke(); }
  c.fillStyle='#94d82d'; for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*13*s,hy-4*s,7*s,8*s,0,0,7); c.fill(); }
  c.fillStyle='#212529'; for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*13*s,hy-4*s,2.5*s,6*s,0,0,7); c.fill(); }
  c.fillStyle='#f783ac'; c.beginPath(); c.moveTo(x-6*s,hy+8*s); c.lineTo(x+6*s,hy+8*s); c.lineTo(x,hy+15*s); c.fill();
  c.strokeStyle='#f8f9fa'; c.lineWidth=2; for(const u of [-1,1]) for(const v of [-1,1]){ c.beginPath(); c.moveTo(x+u*12*s,hy+12*s); c.lineTo(x+u*40*s,hy+(12+v*7)*s); c.stroke(); } }
/* Les trois chats du film : le chaton (petit, roux clair), le chat (gris), le gros matou (roux rayé) */
const CHATS={ chaton:{s:.7,coul:'#ffc078',raye:false}, chat:{s:1.15,coul:'#adb5bd',raye:false}, matou:{s:1.6,coul:'#e8590c',raye:true} };
const unChat=(c,nom,x,yBas,z=1)=>{ const k=CHATS[nom]; chatCraie(c,x,yBas,k.s,z,k.coul,k.raye); };

/* Un éléphant gris, de profil, trompe à droite : (x, yBas) = le milieu, au sol ; s = l'échelle (1 ≈ 300 × 230 px) */
function elephantCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const G='#adb5bd', B='#495057';
  c.fillStyle=G; c.strokeStyle=B; c.lineWidth=4;
  for(const u of [-.75,-.35,.25,.6]){ c.beginPath(); c.roundRect(x+u*110*s-17*s,yBas-80*s,34*s,80*s,8*s); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(x-10*s,yBas-120*s,120*s,72*s,0,0,7); c.fill(); c.stroke();
  c.strokeStyle=G; c.lineWidth=26*s; c.lineCap='round'; c.beginPath(); c.moveTo(x+140*s,yBas-130*s);
  c.quadraticCurveTo(x+175*s,yBas-60*s,x+150*s,yBas-22*s); c.stroke();
  c.fillStyle=G; c.strokeStyle=B; c.lineWidth=4; c.beginPath(); c.arc(x+112*s,yBas-160*s,52*s,0,7); c.fill(); c.stroke();
  c.fillStyle='#ced4da'; c.beginPath(); c.ellipse(x+82*s,yBas-152*s,34*s,48*s,-.2,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(x+128*s,yBas-176*s,6*s,0,7); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.moveTo(x+130*s,yBas-124*s); c.quadraticCurveTo(x+162*s,yBas-112*s,x+168*s,yBas-132*s); c.lineTo(x+140*s,yBas-134*s); c.fill();
  c.strokeStyle=B; c.lineWidth=5; c.beginPath(); c.moveTo(x-128*s,yBas-130*s); c.lineTo(x-150*s,yBas-96*s); c.stroke(); }
/* Une fourmi noire, toute petite : (x, yBas) = le milieu, au sol ; s = l'échelle (1 ≈ 90 px de long) */
function fourmiCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const y=yBas-18*s;
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.lineCap='round';
  for(const u of [-14,0,14]){ c.beginPath(); c.moveTo(x+u*s,y); c.lineTo(x+(u-10)*s,yBas); c.moveTo(x+u*s,y); c.lineTo(x+(u+10)*s,yBas); c.stroke(); }
  c.beginPath(); c.moveTo(x+36*s,y-8*s); c.lineTo(x+50*s,y-30*s); c.moveTo(x+40*s,y-6*s); c.lineTo(x+60*s,y-22*s); c.stroke();
  c.fillStyle='#212529'; c.strokeStyle='#f8f9fa'; c.lineWidth=2.5;
  for(const [dx,r] of [[-30,15],[0,9],[32,11]]){ c.beginPath(); c.arc(x+dx*s,y-2*s,r*s,0,7); c.fill(); c.stroke(); } }
/* Un lapin blanc assis, de profil : (x, yBas) = le milieu, au sol ; s = l'échelle (1 ≈ 170 px de haut) */
function lapinCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const W='#f8f9fa', B='#868e96';
  c.fillStyle=W; c.strokeStyle=B; c.lineWidth=3.5;
  c.beginPath(); c.arc(x-48*s,yBas-36*s,14*s,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x-8*s,yBas-42*s,44*s,42*s,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x+10*s,yBas-8*s,26*s,9*s,0,0,7); c.fill(); c.stroke();
  for(const [dx,rot] of [[16,-.12],[34,.18]]){ c.fillStyle=W; c.beginPath(); c.ellipse(x+dx*s,yBas-140*s,11*s,38*s,rot,0,7); c.fill(); c.stroke();
    c.fillStyle='#fcc2d7'; c.beginPath(); c.ellipse(x+dx*s,yBas-140*s,5*s,28*s,rot,0,7); c.fill(); }
  c.fillStyle=W; c.beginPath(); c.arc(x+26*s,yBas-92*s,28*s,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(x+36*s,yBas-98*s,4.5*s,0,7); c.fill();
  c.fillStyle='#f783ac'; c.beginPath(); c.arc(x+53*s,yBas-86*s,4.5*s,0,7); c.fill(); }

/* ---- Épisode 04 (défi) : les trois cadeaux de la même taille, le caillou, la souris du commentaire ---- */
/* Un cadeau carré : (x, yBas) = le milieu, en bas ; s = l'échelle (1 = 90 px de côté). ouvre (0 → 1) soulève le couvercle. */
function cadeauCraie(c,x,yBas,s=1,z=1,coul='#ffd43b',ouvre=0){ if(z<=0) return; s*=Math.min(1.15,z); const C=90*s, R='#e03131';
  c.fillStyle=coul; c.strokeStyle='#343a40'; c.lineWidth=4; c.beginPath(); c.rect(x-C/2,yBas-C,C,C); c.fill(); c.stroke();
  c.fillStyle=R; c.fillRect(x-C*.08,yBas-C,C*.16,C);
  c.save(); c.translate(x-C*.56+C*1.18*ouvre,yBas-C-C*.1*ouvre); c.rotate(Math.PI/2*ouvre); /* ouvert : debout contre le côté droit */
  c.fillStyle=coul; c.beginPath(); c.rect(0,-C*.2,C*1.12,C*.2); c.fill(); c.stroke(); c.fillStyle=R; c.fillRect(C*.48,-C*.2,C*.16,C*.2);
  c.beginPath(); c.ellipse(C*.4,-C*.3,C*.16,C*.1,-.4,0,7); c.ellipse(C*.72,-C*.3,C*.16,C*.1,.4,0,7); c.fill(); c.restore(); }
/* Un gros caillou gris : (x, y) = le centre */
function caillouCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.15,z);
  c.fillStyle='#868e96'; c.strokeStyle='#343a40'; c.lineWidth=4; c.beginPath();
  c.moveTo(x-r,y+r*.2); c.quadraticCurveTo(x-r*.9,y-r*.8,x-r*.1,y-r*.75); c.quadraticCurveTo(x+r*.9,y-r*.9,x+r,y); c.quadraticCurveTo(x+r*.8,y+r*.7,x,y+r*.6); c.quadraticCurveTo(x-r*.8,y+r*.7,x-r,y+r*.2);
  c.fill(); c.stroke(); c.fillStyle='#adb5bd'; c.beginPath(); c.ellipse(x-r*.3,y-r*.35,r*.22,r*.12,-.3,0,7); c.fill(); }
/* Une souris grise, de profil : (x, yBas) = le milieu, au sol ; s = l'échelle (1 ≈ 110 px de long) */
function sourisCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z);
  c.strokeStyle='#f783ac'; c.lineWidth=4; c.lineCap='round'; c.beginPath(); c.moveTo(x-40*s,yBas-14*s); c.quadraticCurveTo(x-80*s,yBas-4*s,x-70*s,yBas-36*s); c.stroke();
  c.fillStyle='#adb5bd'; c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.ellipse(x,yBas-22*s,44*s,22*s,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x+40*s,yBas-26*s,18*s,14*s,.3,0,7); c.fill(); c.stroke();
  c.fillStyle='#fcc2d7'; c.beginPath(); c.arc(x+30*s,yBas-46*s,12*s,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(x+46*s,yBas-30*s,3.5*s,0,7); c.fill();
  c.fillStyle='#f783ac'; c.beginPath(); c.arc(x+58*s,yBas-24*s,4*s,0,7); c.fill(); }
