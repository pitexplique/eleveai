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

/* ---- Épisode 01 (unités) : l'éléphant, la balance de cuisine à aiguille, la bascule du port ---- */
/* Un éléphant gris : (x, yBas) = le milieu, au sol ; s = l'échelle (1 ≈ 330 px de long) ; sens = 1 (trompe à droite) ou −1 */
function elephantM(c,x,yBas,s=1,z=1,sens=1){ if(z<=0) return; s*=Math.min(1.15,z); const G='#adb5bd', B='#495057';
  c.save(); c.translate(x,yBas); c.scale(sens,1);
  c.fillStyle=G; c.strokeStyle=B; c.lineWidth=4; c.lineJoin='round';
  for(const u of [-.75,-.35,.25,.6]){ c.beginPath(); c.roundRect(u*110*s-17*s,-80*s,34*s,80*s,8*s); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(-10*s,-120*s,120*s,72*s,0,0,7); c.fill(); c.stroke();
  c.strokeStyle=G; c.lineWidth=26*s; c.lineCap='round'; c.beginPath(); c.moveTo(140*s,-130*s);
  c.quadraticCurveTo(175*s,-60*s,150*s,-22*s); c.stroke();
  c.fillStyle=G; c.strokeStyle=B; c.lineWidth=4; c.beginPath(); c.arc(112*s,-160*s,52*s,0,7); c.fill(); c.stroke();
  c.fillStyle='#ced4da'; c.beginPath(); c.ellipse(82*s,-152*s,34*s,48*s,-.2,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(128*s,-176*s,6*s,0,7); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.moveTo(130*s,-124*s); c.quadraticCurveTo(162*s,-112*s,168*s,-132*s); c.lineTo(140*s,-134*s); c.fill();
  c.strokeStyle=B; c.lineWidth=5; c.beginPath(); c.moveTo(-128*s,-130*s); c.lineTo(-150*s,-96*s); c.stroke();
  c.restore(); }
/* Une balance de cuisine à aiguille : (x, yBas) = le milieu du dessous ; a = l'angle de l'aiguille (0 = en haut, 2π = un tour) ;
   casse ∈ [0, 1] : le plateau s'écrase, le cadran se fend, le ressort sort. Renvoie le dessus du plateau. */
function balanceCuisineCraie(c,x,yBas,s=1,a=0,z=1,casse=0){ if(z<=0) return yBas-200*s; const k=Math.min(1.15,z)*s;
  const w=230*k, h=170*k, cy=yBas-h*.52, R=62*k, ecr=casse*48*k;
  c.fillStyle='#f3d9fa'; c.strokeStyle='#862e9c'; c.lineWidth=6; c.lineJoin='round';
  c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,26*k); c.fill(); c.stroke();
  c.fillStyle='#ffffff'; c.strokeStyle='#495057'; c.lineWidth=5; c.beginPath(); c.arc(x,cy,R,0,7); c.fill(); c.stroke();
  c.strokeStyle='#495057'; c.lineWidth=3; for(let i=0;i<12;i++){ const t=i*Math.PI/6;
    c.beginPath(); c.moveTo(x+Math.sin(t)*R*.78,cy-Math.cos(t)*R*.78); c.lineTo(x+Math.sin(t)*R*.92,cy-Math.cos(t)*R*.92); c.stroke(); }
  c.strokeStyle='#e03131'; c.lineWidth=5*k; c.lineCap='round'; c.beginPath(); c.moveTo(x,cy); c.lineTo(x+Math.sin(a)*R*.74,cy-Math.cos(a)*R*.74); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.arc(x,cy,7*k,0,7); c.fill();
  if(casse>0){ /* la fêlure du cadran et le ressort qui saute */
    c.strokeStyle='#212529'; c.lineWidth=4; c.beginPath(); c.moveTo(x-R*.9,cy-R*.2); c.lineTo(x-R*.3,cy+R*.1); c.lineTo(x+R*.1,cy-R*.35);
    c.lineTo(x+R*.5,cy+R*.25); c.lineTo(x+R*.95,cy+R*.05); c.stroke();
    c.strokeStyle='#adb5bd'; c.lineWidth=5; c.beginPath(); const rx=x+w/2+6, ry=yBas-h+10;
    for(let i=0;i<=24;i++){ const u=i/24; c.lineTo(rx+u*70*k*casse,ry-u*60*k*casse+Math.sin(u*Math.PI*8)*12*k); } c.stroke(); }
  /* le plateau : une tige et un plat ; écrasé, il penche et descend */
  const py=yBas-h-34*k+ecr*.7, pen=casse*.22;
  c.strokeStyle='#868e96'; c.lineWidth=12*k; c.beginPath(); c.moveTo(x,yBas-h); c.lineTo(x,Math.min(py,yBas-h)); c.stroke();
  c.save(); c.translate(x,py); c.rotate(pen); c.fillStyle='#dee2e6'; c.strokeStyle='#495057'; c.lineWidth=5;
  c.beginPath(); c.ellipse(0,0,w*.62,16*k,0,0,7); c.fill(); c.stroke(); c.restore();
  return py-14*k; }
/* La bascule du port : une grande plaque d'acier au sol (rayée jaune et noir) et son afficheur ; (x, yBas) = le milieu */
function basculeCraie(c,x,yBas,w,texte='',z=1){ if(z<=0) return yBas; const k=Math.min(1.15,z), W=w*k, H=34*k;
  c.fillStyle='#868e96'; c.strokeStyle='#343a40'; c.lineWidth=5; c.beginPath(); c.rect(x-W/2,yBas-H,W,H); c.fill(); c.stroke();
  c.save(); c.beginPath(); c.rect(x-W/2,yBas-12*k,W,12*k); c.clip(); c.fillStyle='#ffd43b';
  for(let u=x-W/2;u<x+W/2;u+=44*k){ c.beginPath(); c.moveTo(u,yBas); c.lineTo(u+22*k,yBas); c.lineTo(u+34*k,yBas-12*k); c.lineTo(u+12*k,yBas-12*k); c.fill(); } c.restore();
  /* le poteau et l'afficheur, à droite */
  const px=x+W/2+70*k; c.fillStyle='#495057'; c.fillRect(px-8*k,yBas-210*k,16*k,210*k);
  c.fillStyle='#212529'; c.strokeStyle='#adb5bd'; c.lineWidth=5; c.beginPath(); c.roundRect(px-80*k,yBas-300*k,160*k,96*k,12*k); c.fill(); c.stroke();
  if(texte) ecrire(c,texte,px,yBas-252*k,62*k,'#8ce99a');
  return yBas-H; }

/* ---- Épisode 02 (relations) : la petite voiture (copie de voitureCraie de ce2-longueur.js, non chargé ici) ---- */
/* Une petite voiture : (x, yBas) = le milieu, au sol ; s = l'échelle (1 = 160 px de long) */
function voitureM(c,x,yBas,s=1,z=1,coul='#4dabf7'){ if(z<=0) return; s*=Math.min(1.15,z);
  c.fillStyle=coul; c.beginPath(); c.roundRect(x-80*s,yBas-60*s,160*s,40*s,10*s); c.fill(); c.beginPath(); c.roundRect(x-46*s,yBas-94*s,86*s,40*s,12*s); c.fill();
  c.fillStyle='#e7f5ff'; c.fillRect(x-36*s,yBas-86*s,30*s,26*s); c.fillRect(x+2*s,yBas-86*s,30*s,26*s);
  c.fillStyle='#212529'; for(const dx of [-48,48]){ c.beginPath(); c.arc(x+dx*s,yBas-18*s,18*s,0,7); c.fill(); } }
/* Un sac de riz blanc à la craie, son étiquette écrite dedans (réduite pour tenir) : (x, yBas) = le milieu du fond */
function sacRizCraie(c,x,yBas,s=1,z=1,et=''){ if(z<=0) return; const k=Math.min(1.15,z)*s;
  sacCraie(c,x,yBas,200*k,230*k,1,'#f8f9fa');
  c.fillStyle='#ffe8cc'; for(const [u,v] of [[-.18,.82],[.05,.88],[.2,.8],[-.05,.76],[.12,.7]]){ c.beginPath(); c.ellipse(x+u*200*k,yBas-v*230*k,7*k,4*k,.5,0,7); c.fill(); }
  if(et){ c.font=`800 ${Math.round(52*k)}px "Segoe UI"`; const fs=52*k*Math.min(1,170*k/c.measureText(et).width);
    ecrire(c,et,x,yBas-100*k,fs,'#212529'); } }
