/* Série Masse CM1 (21/11) : COPIE de films/ce2-masse.js (mêmes dessins à la craie, balance, fruits…) + cartableCraie de ce1-masse.js.
   page.html ne charge qu'un fichier de série : le CM1 a donc le sien. Dessins neufs du CM1 à la fin. */
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

/* ---- Épisode 04 (choisir-unite) : la liste des courses, les bananes, le camion qui bouche la rue ---- */
const BANANE_M='#ffe066';
/* Une banane courbée : (x, y) = le milieu, w = la longueur ; ang = la rotation */
function bananeM(c,x,y,w,z=1,ang=0){ if(z<=0) return; w*=Math.min(1.15,z); const h=Math.max(30,w*.34);
  c.save(); c.translate(x,y); c.rotate(ang); c.fillStyle=BANANE_M; c.strokeStyle='#e67700'; c.lineWidth=4; c.beginPath();
  c.moveTo(-w/2,-h*.4); c.quadraticCurveTo(0,h*1.0,w/2,-h*.4); c.quadraticCurveTo(0,h*.05,-w/2,-h*.4); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#5c3d00'; c.fillRect(-w/2-5,-h*.62,10,12); c.fillRect(w/2-5,-h*.62,10,12); c.restore(); }
/* Un régime de bananes : n bananes en éventail, (x, yBas) = le bas */
function regimeM(c,x,yBas,s=1,z=1,n=4){ if(z<=0) return; s*=Math.min(1.15,z);
  /* une « main » de bananes : toutes partent de la tige (à gauche) et s'ouvrent en éventail vers la droite */
  const w=200*s, sx=x-w*.45, sy=yBas-70*s;
  for(let i=0;i<n;i++){ const a=-.75+i*(1.0/(Math.max(1,n-1))); 
    bananeM(c,sx+Math.cos(a)*w*.5,sy+Math.sin(a)*w*.5,w,1,a); }
  c.fillStyle='#5c3d00'; c.beginPath(); c.roundRect(sx-14*s,sy-26*s,24*s,48*s,6*s); c.fill(); }
/* La liste des courses : une feuille blanche penchée, des lignes écrites (la dernière peut être en rouge) */
function listeCraie(c,x,y,w,h,lignes,z=1){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k;
  c.save(); c.translate(x,y); c.rotate(-.04); c.fillStyle='#fffdf5'; c.strokeStyle='#adb5bd'; c.lineWidth=4;
  c.beginPath(); c.rect(-w/2,-h/2,w,h); c.fill(); c.stroke();
  c.strokeStyle='#a5d8ff'; c.lineWidth=2; for(let v=-h/2+70*k; v<h/2-10; v+=56*k){ c.beginPath(); c.moveTo(-w/2+14,v); c.lineTo(w/2-14,v); c.stroke(); }
  c.restore();
  lignes.forEach(([s,coul,fs],i)=>{ ecrire(c,s,x,y-h/2+52*k+i*56*k,(fs||46)*k,coul||'#343a40'); }); }
/* Un gros camion de livraison (caisse jaune, cabine rouge) : (x, yBas) = le milieu, au sol ; s = 1 ≈ 460 px de long */
function camionM(c,x,yBas,s=1,z=1,texte=''){ if(z<=0) return; s*=Math.min(1.15,z);
  const L=330*s, H=190*s, cab=130*s, g=x-(L+cab)/2;
  c.fillStyle='#ffd43b'; c.strokeStyle='#e67700'; c.lineWidth=5; c.beginPath(); c.roundRect(g,yBas-H-40*s,L,H,10*s); c.fill(); c.stroke();
  c.fillStyle='#f03e3e'; c.strokeStyle='#a61e4d'; c.beginPath(); c.roundRect(g+L+6*s,yBas-150*s-40*s,cab,150*s,[30*s,30*s,8*s,8*s]); c.fill(); c.stroke();
  c.fillStyle='#d0ebff'; c.beginPath(); c.roundRect(g+L+40*s,yBas-175*s,cab-55*s,60*s,8*s); c.fill();
  c.fillStyle='#212529'; for(const u of [g+70*s,g+L-50*s,g+L+cab-45*s]){ c.beginPath(); c.arc(u,yBas-30*s,30*s,0,7); c.fill();
    c.fillStyle='#adb5bd'; c.beginPath(); c.arc(u,yBas-30*s,11*s,0,7); c.fill(); c.fillStyle='#212529'; }
  if(texte) ecrire(c,texte,g+L/2,yBas-40*s-H/2+28*s,90*s,'#212529'); }
/* Un melon : une boule vert pâle rayée, (x, yBas) = le bas */
function melonM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const r=80*s, y=yBas-r;
  c.fillStyle='#c0eb75'; c.strokeStyle='#5c940d'; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,r*1.1,r,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#82c91e'; c.lineWidth=5; for(const u of [-.6,-.2,.2,.6]){ c.beginPath(); c.ellipse(x,y,r*1.1*Math.abs(u),r*.98,0,0,7); c.stroke(); }
  c.strokeStyle='#5c3d00'; c.lineWidth=6; c.beginPath(); c.moveTo(x,y-r); c.lineTo(x+8*s,y-r-18*s); c.stroke(); }
/* Un gâteau à la banane : un cake brun, des rondelles jaunes dessus, (x, yBas) = le bas */
function gateauM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const w=170*s, h=80*s;
  c.fillStyle='#c48a3c'; c.strokeStyle='#5c3d00'; c.lineWidth=4; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,14*s); c.fill(); c.stroke();
  c.fillStyle='#ffe066'; c.strokeStyle='#e67700'; c.lineWidth=2; for(const u of [-.32,0,.32]){ c.beginPath(); c.ellipse(x+u*w,yBas-h-2*s,18*s,9*s,0,0,7); c.fill(); c.stroke(); } }

/* ---- Épisode 05 (estimer) : le chat de « 400 kg », l'ours, le canapé, le chien ---- */
/* Un chat assis, de face (dos = true : de dos, il boude) ; (x, yBas) = le milieu, au sol ; s = 1 ≈ 170 px de haut */
function chatM(c,x,yBas,s=1,z=1,coul='#adb5bd',dos=false){ if(z<=0) return; s*=Math.min(1.15,z);
  const by=yBas-48*s, hy=yBas-108*s, bord='#343a40';
  c.lineJoin='round'; c.strokeStyle=coul; c.lineWidth=12*s; c.lineCap='round'; c.beginPath(); c.moveTo(x+(dos?-46:46)*s,yBas-14*s);
  c.quadraticCurveTo(x+(dos?-96:96)*s,yBas-20*s,x+(dos?-84:84)*s,yBas-78*s); c.stroke();
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=3.5;
  c.beginPath(); c.ellipse(x,by,50*s,50*s,0,0,7); c.fill(); c.stroke();
  if(!dos) for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*20*s,yBas-6*s,15*s,9*s,0,0,7); c.fill(); c.stroke(); }
  for(const u of [-1,1]){ c.beginPath(); c.moveTo(x+u*12*s,hy-26*s); c.lineTo(x+u*30*s,hy-54*s); c.lineTo(x+u*34*s,hy-12*s); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(x,hy,34*s,0,7); c.fill(); c.stroke();
  if(dos){ c.strokeStyle='rgba(60,20,0,.35)'; c.lineWidth=5*s; c.beginPath(); c.moveTo(x,hy+30*s); c.lineTo(x,by+20*s); c.stroke(); return; }
  c.fillStyle='#94d82d'; for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*13*s,hy-4*s,7*s,8*s,0,0,7); c.fill(); }
  c.fillStyle='#212529'; for(const u of [-1,1]){ c.beginPath(); c.ellipse(x+u*13*s,hy-4*s,2.5*s,6*s,0,0,7); c.fill(); }
  c.fillStyle='#f783ac'; c.beginPath(); c.moveTo(x-6*s,hy+8*s); c.lineTo(x+6*s,hy+8*s); c.lineTo(x,hy+15*s); c.fill();
  c.strokeStyle='#f8f9fa'; c.lineWidth=2; for(const u of [-1,1]) for(const v of [-1,1]){ c.beginPath(); c.moveTo(x+u*12*s,hy+12*s); c.lineTo(x+u*40*s,hy+(12+v*7)*s); c.stroke(); } }
/* Un ours brun à quatre pattes, de profil, tête à droite ; (x, yBas) = le milieu, au sol ; s = 1 ≈ 380 × 230 px */
function oursM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const B='#8b5a2b', D='#4a2c0f';
  c.save(); c.translate(x,yBas); c.lineJoin='round'; c.fillStyle=B; c.strokeStyle=D; c.lineWidth=4;
  for(const u of [-.62,-.3,.3,.6]){ c.beginPath(); c.roundRect(u*190*s-24*s,-95*s,48*s,95*s,14*s); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(-10*s,-130*s,170*s,82*s,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(-30*s,-200*s,70*s,22*s,0,0,7); c.fill();  /* la bosse du dos */
  for(const [ex,ey] of [[150,-222],[196,-214]]){ c.beginPath(); c.arc(ex*s,ey*s,20*s,0,7); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(170*s,-170*s,58*s,0,7); c.fill(); c.stroke();
  c.fillStyle='#c08552'; c.beginPath(); c.ellipse(220*s,-155*s,34*s,25*s,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.ellipse(248*s,-162*s,11*s,8*s,0,0,7); c.fill();
  c.beginPath(); c.arc(182*s,-188*s,7*s,0,7); c.fill();
  c.strokeStyle=D; c.lineWidth=3; for(const u of [-.62,-.3,.3,.6]) for(const v of [-10,0,10]){ c.beginPath(); c.moveTo(u*190*s+v*s,-4*s); c.lineTo(u*190*s+v*s,-14*s); c.stroke(); }
  c.restore(); }
/* Un canapé rouge ; (x, yBas) = le milieu, au sol ; s = 1 ≈ 420 px de large. Renvoie le dessus du coussin. */
function canapeM(c,x,yBas,s=1,z=1){ const k=Math.min(1.15,Math.max(z,0))*s, w=420*k, D='#7b1e3a';
  if(z<=0) return yBas-110*k; c.lineJoin='round'; c.fillStyle='#c2255c'; c.strokeStyle=D; c.lineWidth=4;
  c.beginPath(); c.roundRect(x-w/2+30*k,yBas-230*k,w-60*k,130*k,22*k); c.fill(); c.stroke();          /* le dossier */
  c.fillStyle='#e64980'; c.beginPath(); c.roundRect(x-w/2+30*k,yBas-120*k,w-60*k,70*k,14*k); c.fill(); c.stroke(); /* le coussin */
  c.fillStyle='#c2255c'; for(const u of [-1,1]){ c.beginPath(); c.roundRect(x+u*(w/2-30*k)-30*k,yBas-160*k,60*k,130*k,22*k); c.fill(); c.stroke(); }
  c.beginPath(); c.roundRect(x-w/2+20*k,yBas-55*k,w-40*k,40*k,10*k); c.fill(); c.stroke();
  c.fillStyle='#5c3d00'; for(const u of [-1,1]){ c.fillRect(x+u*(w/2-50*k)-8*k,yBas-16*k,16*k,16*k); }
  return yBas-120*k; }
/* Un chien assis, de profil, tête à droite ; (x, yBas) = le milieu, au sol ; s = 1 ≈ 230 px de haut */
function chienM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const B='#e8a660', D='#7c4a12';
  c.save(); c.translate(x,yBas); c.lineJoin='round'; c.lineCap='round';
  c.strokeStyle=B; c.lineWidth=16*s; c.beginPath(); c.moveTo(-70*s,-40*s); c.quadraticCurveTo(-120*s,-60*s,-110*s,-120*s); c.stroke();
  c.fillStyle=B; c.strokeStyle=D; c.lineWidth=4;
  c.beginPath(); c.ellipse(-20*s,-70*s,75*s,62*s,-.5,0,7); c.fill(); c.stroke();
  for(const u of [20,55]){ c.beginPath(); c.roundRect(u*s-14*s,-120*s,28*s,120*s,10*s); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(-50*s,-14*s,45*s,16*s,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.arc(60*s,-170*s,50*s,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(108*s,-152*s,34*s,24*s,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(140*s,-160*s,9*s,0,7); c.fill(); c.beginPath(); c.arc(72*s,-186*s,7*s,0,7); c.fill();
  c.fillStyle='#9c5a1a'; c.beginPath(); c.ellipse(28*s,-168*s,20*s,46*s,.35,0,7); c.fill(); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.roundRect(20*s,-128*s,70*s,12*s,5*s); c.fill();
  c.restore(); }
/* Une brique de lait de 1 kg ; (x, yBas) = le milieu du bas */
function briqueM(c,x,yBas,s=1,z=1){ if(z<=0) return; const k=Math.min(1.15,z)*s, w=110*k, h=170*k, t=42*k;
  c.lineJoin='round'; c.fillStyle='#f8f9fa'; c.strokeStyle='#868e96'; c.lineWidth=4;
  c.beginPath(); c.rect(x-w/2,yBas-h,w,h); c.fill(); c.stroke();
  c.fillStyle='#dee2e6'; c.beginPath(); c.moveTo(x-w/2,yBas-h); c.lineTo(x,yBas-h-t); c.lineTo(x+w/2,yBas-h); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#1c7ed6'; c.fillRect(x-w/2+2,yBas-h*.62,w-4,h*.3);
  c.fillStyle='#fff'; c.font=`800 ${Math.round(34*k)}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle'; c.fillText('LAIT',x,yBas-h*.47); }

/* ---- Épisode 06 (probleme) : la valise à roulettes, les chaussettes, le gros livre, la pancarte « 23 kg au plus » ---- */
/* Une valise à roulettes debout ; (x, yBas) = le milieu, au sol (sous les roues) ; s = 1 ≈ 210 × 300 px. Renvoie le haut. */
function valiseM(c,x,yBas,s=1,z=1,coul='#7048e8'){ const k=Math.min(1.15,Math.max(z,0))*s, w=210*k, h=250*k, r=16*k;
  if(z<=0) return yBas-300*k; const yb=yBas-2*r, D='#212529'; c.lineJoin='round'; c.lineCap='round';
  c.strokeStyle='#868e96'; c.lineWidth=9*k; for(const u of [-.25,.25]){ c.beginPath(); c.moveTo(x+u*w,yb-h); c.lineTo(x+u*w,yb-h-55*k); c.stroke(); }
  c.lineWidth=12*k; c.beginPath(); c.moveTo(x-.3*w,yb-h-55*k); c.lineTo(x+.3*w,yb-h-55*k); c.stroke();   /* la poignée tirée */
  c.fillStyle=coul; c.strokeStyle=D; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yb-h,w,h,22*k); c.fill(); c.stroke();
  c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=8*k; for(const u of [-.22,0,.22]){ c.beginPath(); c.moveTo(x+u*w,yb-h+16*k); c.lineTo(x+u*w,yb-16*k); c.stroke(); }
  c.fillStyle=D; for(const u of [-.32,.32]){ c.beginPath(); c.arc(x+u*w,yBas-r,r,0,7); c.fill(); }
  return yb-h-55*k; }
/* Une paire de chaussettes rayées ; (x, yBas) = le milieu, au sol ; s = 1 ≈ 170 px de large */
function chaussettesM(c,x,yBas,s=1,z=1){ if(z<=0) return; const k=Math.min(1.15,z)*s; c.lineJoin='round';
  for(const [dx,coul] of [[-38,'#f06595'],[38,'#4dabf7']]){ const X=x+dx*k;
    c.fillStyle=coul; c.strokeStyle='#343a40'; c.lineWidth=4; c.beginPath();
    c.moveTo(X-22*k,yBas-150*k); c.lineTo(X+22*k,yBas-150*k); c.lineTo(X+22*k,yBas-45*k); c.lineTo(X+62*k,yBas-40*k);
    c.quadraticCurveTo(X+80*k,yBas-20*k,X+60*k,yBas); c.lineTo(X-12*k,yBas); c.quadraticCurveTo(X-24*k,yBas-10*k,X-22*k,yBas-40*k); c.closePath(); c.fill(); c.stroke();
    c.fillStyle='#fff'; for(const yy of [130,100,70]) c.fillRect(X-20*k,yBas-yy*k,40*k,10*k); } }
/* Un gros livre fermé, posé à plat ; (x, yBas) = le milieu du bas ; s = 1 ≈ 240 × 90 px */
function livreM(c,x,yBas,s=1,z=1,texte=''){ if(z<=0) return; const k=Math.min(1.15,z)*s, w=240*k, h=90*k; c.lineJoin='round';
  c.fillStyle='#f8f9fa'; c.strokeStyle='#868e96'; c.lineWidth=3; c.beginPath(); c.rect(x-w/2+12*k,yBas-h+10*k,w-14*k,h-20*k); c.fill(); c.stroke();
  for(let u=1;u<5;u++){ c.beginPath(); c.moveTo(x+w/2-4*k,yBas-h+10*k+u*(h-20*k)/5); c.lineTo(x-w/2+20*k,yBas-h+10*k+u*(h-20*k)/5); c.stroke(); }
  c.fillStyle='#c92a2a'; c.strokeStyle='#5c0011'; c.lineWidth=4; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,14*k,4*k); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(x-w/2,yBas-14*k,w,14*k,4*k); c.fill(); c.stroke(); c.beginPath(); c.roundRect(x-w/2,yBas-h,26*k,h,6*k); c.fill(); c.stroke();
  if(texte) ecrire(c,texte,x+12*k,yBas-h/2,46*k,'#c92a2a'); }
/* La pancarte du comptoir « 23 kg / au plus » ; (x, y) = le centre ; s = 1 ≈ 300 × 180 px */
function pancarteM(c,x,y,s=1,z=1,haut='23 kg',bas='au plus'){ if(z<=0) return; const k=Math.min(1.15,z)*s, w=300*k, h=180*k;
  c.fillStyle='#f8f9fa'; c.strokeStyle='#e03131'; c.lineWidth=8*k; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,16*k); c.fill(); c.stroke();
  ecrire(c,haut,x,y-28*k,84*k,'#e03131'); ecrire(c,bas,x,y+50*k,52*k,'#343a40'); }

/* ---- Épisode 07 (défi) : l'ananas, les mangues de 400 g, la papaye, le verre de jus ---- */
/* Un ananas : corps ovale doré quadrillé, couronne de feuilles ; (x, yBas) = le bas ; s = 1 ≈ 260 px de haut */
function ananasM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const rx=62*s, ry=88*s, y=yBas-ry;
  c.fillStyle='#2f9e44'; c.strokeStyle='#1b5e20'; c.lineWidth=3;
  for(const [a,l] of [[-.55,70],[-.25,92],[0,105],[.25,92],[.55,70]]){ const bx=x, by=y-ry+6*s;
    c.beginPath(); c.moveTo(bx-12*s,by); c.quadraticCurveTo(bx+Math.sin(a)*l*.5*s-8*s,by-l*.6*s,bx+Math.sin(a)*l*s,by-Math.cos(a)*l*s);
    c.quadraticCurveTo(bx+Math.sin(a)*l*.5*s+8*s,by-l*.5*s,bx+12*s,by); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle='#fab005'; c.strokeStyle='#a0522d'; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill(); c.stroke();
  c.save(); c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.clip(); c.strokeStyle='#c2410c'; c.lineWidth=3;
  for(let u=-3;u<=3;u++){ c.beginPath(); c.moveTo(x+u*32*s-ry,y-ry); c.lineTo(x+u*32*s+ry,y+ry); c.stroke();
    c.beginPath(); c.moveTo(x+u*32*s+ry,y-ry); c.lineTo(x+u*32*s-ry,y+ry); c.stroke(); }
  c.restore(); }
/* Une mangue : un ovale penché, du rouge au jaune, une petite feuille ; (x, yBas) = le bas ; s = 1 ≈ 95 × 70 px */
function mangueM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const rx=48*s, ry=34*s, y=yBas-ry;
  const g=c.createLinearGradient(x-rx,y-ry,x+rx,y+ry); g.addColorStop(0,'#e8590c'); g.addColorStop(.55,'#fcc419'); g.addColorStop(1,'#94d82d');
  c.fillStyle=g; c.strokeStyle='#a0522d'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,rx,ry,-.25,0,7); c.fill(); c.stroke();
  c.fillStyle='#2f9e44'; c.beginPath(); c.ellipse(x-rx*.55,y-ry*.95,16*s,7*s,-.5,0,7); c.fill(); }
/* Une papaye couchée : longue, verte et orange ; (x, yBas) = le bas ; s = 1 ≈ 230 × 110 px */
function papayeM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const rx=115*s, ry=55*s, y=yBas-ry;
  const g=c.createLinearGradient(x-rx,y,x+rx,y); g.addColorStop(0,'#82c91e'); g.addColorStop(.6,'#fd7e14'); g.addColorStop(1,'#f76707');
  c.fillStyle=g; c.strokeStyle='#5c3d00'; c.lineWidth=4; c.beginPath(); c.moveTo(x-rx,y);
  c.bezierCurveTo(x-rx,y-ry*1.1,x+rx*.2,y-ry*1.2,x+rx,y-ry*.2); c.bezierCurveTo(x+rx*1.05,y+ry,x-rx*.2,y+ry*1.1,x-rx,y); c.fill(); c.stroke();
  c.fillStyle='#5c3d00'; c.fillRect(x-rx-14*s,y-6*s,16*s,12*s); }
/* Un verre de jus d'ananas avec une paille ; (x, yBas) = le bas ; s = 1 ≈ 190 px de haut */
function verreJusM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const w=110*s, h=170*s;
  c.strokeStyle='#e03131'; c.lineWidth=8*s; c.beginPath(); c.moveTo(x+18*s,yBas-h*.55); c.lineTo(x+48*s,yBas-h-38*s); c.stroke();
  c.fillStyle='#ffd43b'; c.beginPath(); c.moveTo(x-w/2+6*s,yBas-h*.78); c.lineTo(x+w/2-6*s,yBas-h*.78); c.lineTo(x+w*.38,yBas); c.lineTo(x-w*.38,yBas); c.closePath(); c.fill();
  c.strokeStyle='#dee2e6'; c.lineWidth=5; c.beginPath(); c.moveTo(x-w/2,yBas-h); c.lineTo(x-w*.38,yBas); c.lineTo(x+w*.38,yBas); c.lineTo(x+w/2,yBas-h); c.stroke();
  c.fillStyle='#fab005'; c.beginPath(); c.arc(x-w/2+6*s,yBas-h,20*s,0,7); c.fill(); }

/* ── CM1 (21/11) ─────────────────────────────────────────────────────────────────────────────── */
/* Un cartable (copie de ce1-masse.js) : (x, yBas) = le milieu du bas. */
function cartableCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; const k=Math.min(1.15,z)*s, w=230*k, h=180*k;
  c.lineJoin='round'; c.strokeStyle='#1e3a8a'; c.lineWidth=6; c.beginPath(); c.arc(x,yBas-h,42*k,Math.PI,0); c.stroke();
  c.fillStyle='#3b5bdb'; c.lineWidth=4; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,16*k); c.fill(); c.stroke();
  c.fillStyle='#364fc7'; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h*.5,16*k); c.fill(); c.stroke();
  c.fillStyle='#fab005'; for(const d of [-.28,.28]){ c.beginPath(); c.roundRect(x+d*w-11*k,yBas-h*.5-14*k,22*k,30*k,4*k); c.fill(); } }

/* ---- CM1 02 (mesurer) : la balance de cuisine à cadran en kg, la pastèque, les tranches ---- */
/* Balance de cuisine à aiguille, cadran ROND de 0 à 5 kg (un petit trait tous les 100 g, un moyen à 500 g) :
   (x, yBas) = le milieu du bas, R = le rayon du cadran, v = la masse lue (kg), hl = [v0, v1] arc surligné.
   Renvoie le dessus du plateau (pour y poser un fruit). */
function balanceAiguilleM(c,x,yBas,R,v,z=1,hl=null){ if(z<=0) return yBas-2.6*R; const k=Math.min(1.15,z); R*=k;
  const w=2.4*R, h=2.25*R, cy=yBas-h/2+4*k, ang=u=>-Math.PI/2+u/5*Math.PI*1.8;
  c.lineJoin='round'; c.fillStyle='#e9ecef'; c.strokeStyle='#495057'; c.lineWidth=6;
  c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,34*k); c.fill(); c.stroke();
  c.fillStyle='#ffffff'; c.lineWidth=5; c.beginPath(); c.arc(x,cy,R,0,7); c.fill(); c.stroke();
  if(hl){ c.strokeStyle=CRAIE.ret; c.lineWidth=16*k; c.beginPath(); c.arc(x,cy,R*.86,ang(hl[0]),ang(hl[1])); c.stroke(); }
  for(let i=0;i<=50;i++){ const u=i/10, a=ang(u), gr=i%10===0, mo=i%5===0, L=gr?.2:(mo?.14:.08);
    c.strokeStyle='#212529'; c.lineWidth=gr?5:(mo?4:2.5); c.beginPath();
    c.moveTo(x+Math.cos(a)*R*.95,cy+Math.sin(a)*R*.95); c.lineTo(x+Math.cos(a)*R*(.95-L),cy+Math.sin(a)*R*(.95-L)); c.stroke(); }
  c.fillStyle='#212529'; c.font=`800 ${Math.round(R*.26)}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle';
  for(let u=0;u<=5;u++){ const a=ang(u); c.fillText(String(u),x+Math.cos(a)*R*.6,cy+Math.sin(a)*R*.6); }
  c.fillStyle='#868e96'; c.font=`700 ${Math.round(R*.18)}px "Segoe UI"`; c.fillText('kg',x,cy+R*.3);
  const a=ang(v); c.strokeStyle='#e03131'; c.lineWidth=8*k; c.lineCap='round';
  c.beginPath(); c.moveTo(x,cy); c.lineTo(x+Math.cos(a)*R*.86,cy+Math.sin(a)*R*.86); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.arc(x,cy,11*k,0,7); c.fill();
  const py=yBas-h-26*k; c.strokeStyle='#868e96'; c.lineWidth=16*k; c.beginPath(); c.moveTo(x,yBas-h); c.lineTo(x,py); c.stroke();
  c.fillStyle='#dee2e6'; c.strokeStyle='#495057'; c.lineWidth=5; c.beginPath(); c.ellipse(x,py,w*.5,18*k,0,0,7); c.fill(); c.stroke();
  return py-12*k; }
/* Une pastèque entière, couchée : (x, yBas) = le bas, s = l'échelle (1 ≈ 260 px de long) */
function pastequeM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const rx=130*s, ry=92*s, y=yBas-ry;
  c.fillStyle='#2b8a3e'; c.strokeStyle='#1b4d24'; c.lineWidth=5; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#8ce99a'; c.lineWidth=7*s; for(const u of [-.66,-.33,0,.33,.66]){ c.beginPath();
    for(let i=0;i<=20;i++){ const t=-Math.PI/2+i/20*Math.PI, px=x+u*rx*Math.cos(t)+Math.sin(i*1.3)*4*s, py=y+ry*.94*Math.sin(t); i?c.lineTo(px,py):c.moveTo(px,py); } c.stroke(); }
  c.strokeStyle='#5c3d00'; c.lineWidth=7; c.beginPath(); c.moveTo(x-rx*.95,y); c.quadraticCurveTo(x-rx*1.12,y-22*s,x-rx*1.05,y-40*s); c.stroke(); }
/* Une tranche de pastèque (un demi-disque rouge, l'écorce verte, des pépins) : (x, yBas) = le milieu du bas */
function trancheM(c,x,yBas,s=1,z=1,ang=0){ if(z<=0) return; s*=Math.min(1.15,z); const r=90*s;
  c.save(); c.translate(x,yBas); c.rotate(ang);
  c.fillStyle='#2b8a3e'; c.beginPath(); c.arc(0,0,r,Math.PI,0); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(0,-2,r*.9,Math.PI,0); c.closePath(); c.fill();
  c.fillStyle='#fa5252'; c.beginPath(); c.arc(0,-4,r*.82,Math.PI,0); c.closePath(); c.fill();
  c.fillStyle='#212529'; for(const [u,v] of [[-.45,.35],[-.15,.55],[.2,.5],[.48,.3],[0,.25],[-.3,.15],[.3,.12]]){
    c.beginPath(); c.ellipse(u*r,-v*r,5*s,8*s,u,0,7); c.fill(); }
  c.restore(); }

/* ---- CM1 03 (convertir) : les pommes, la cagette, les sachets de 500 g, le bol de compote ---- */
/* Une pomme : (x, y) = le centre, r = le rayon ; queue et feuille */
function pommeM(c,x,y,r,z=1,coul='#e03131'){ if(z<=0) return; r*=Math.min(1.15,z);
  c.lineJoin='round'; c.fillStyle=coul; c.strokeStyle='#5c1a1a'; c.lineWidth=3;
  c.beginPath(); c.ellipse(x,y,r,r*.92,0,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(x-r*.4,y-r*.35,r*.2,r*.13,-.6,0,7); c.fill();
  c.strokeStyle='#5c3d00'; c.lineWidth=Math.max(3,r*.12); c.beginPath(); c.moveTo(x,y-r*.8); c.lineTo(x+r*.12,y-r*1.25); c.stroke();
  c.fillStyle='#2f9e44'; c.beginPath(); c.ellipse(x+r*.38,y-r*1.1,r*.3,r*.13,-.5,0,7); c.fill(); }
/* La cagette pleine de pommes en pyramide : (x, yBas) = le milieu du bas, s = l'échelle (1 ≈ 360 px de large).
   Renvoie le haut du tas. */
function tasPommesM(c,x,yBas,s=1,z=1){ if(z<=0) return yBas; s*=Math.min(1.15,z); const w=360*s, h=100*s, r=34*s;
  const cols=['#e03131','#f03e3e','#c92a2a','#e8590c','#e03131'];
  for(let i=0;i<3;i++){ const n=5-i, y=yBas-h-r*.55-i*r*1.5;
    for(let j=0;j<n;j++) pommeM(c,x+(j-(n-1)/2)*r*2.0,y,r,1,cols[(i+j)%5]); }
  c.fillStyle='#d4a373'; c.strokeStyle='#7f5539'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,8*s); c.fill(); c.stroke();
  c.lineWidth=3; for(const u of [.36,.68]){ c.beginPath(); c.moveTo(x-w/2,yBas-h*u); c.lineTo(x+w/2,yBas-h*u); c.stroke(); }
  return yBas-h-r*.55-2*r*1.5-r; }
/* Un sachet en papier kraft : (x, yBas) = le milieu du bas, s = l'échelle (1 ≈ 150 px de large) ;
   plein = des pommes dépassent en haut ; texte = l'étiquette (« 500 g ») */
function sachetM(c,x,yBas,s=1,z=1,plein=true,texte='500 g'){ if(z<=0) return; s*=Math.min(1.15,z); const w=150*s, h=160*s;
  if(plein){ const r=30*s; pommeM(c,x-r*1.15,yBas-h+r*.15,r,1,'#e03131'); pommeM(c,x+r*1.15,yBas-h+r*.1,r,1,'#c92a2a');
    pommeM(c,x,yBas-h-r*.35,r,1,'#f03e3e'); }
  c.lineJoin='round'; c.fillStyle='#d4a373'; c.strokeStyle='#7f5539'; c.lineWidth=4;
  c.beginPath(); c.moveTo(x-w*.5,yBas-h); c.lineTo(x+w*.5,yBas-h); c.lineTo(x+w*.44,yBas); c.lineTo(x-w*.44,yBas); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(x-w*.5,yBas-h+16*s); c.lineTo(x+w*.5,yBas-h+16*s); c.stroke();
  if(texte){ c.fillStyle='#ffffff'; c.beginPath(); c.roundRect(x-w*.36,yBas-h*.58,w*.72,h*.34,8*s); c.fill();
    c.fillStyle='#212529'; c.font=`800 ${Math.round(34*s)}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle';
    c.fillText(texte,x,yBas-h*.41); } }
/* Un bol de compote : (x, yBas) = le milieu du bas, s = l'échelle (1 ≈ 300 px de large), une cuillère */
function compoteM(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const w=300*s, h=130*s, yH=yBas-h;
  c.strokeStyle='#adb5bd'; c.lineWidth=12*s; c.lineCap='round'; c.beginPath(); c.moveTo(x+w*.12,yH-6*s); c.lineTo(x+w*.42,yH-120*s); c.stroke();
  c.fillStyle='#ffd8a8'; c.strokeStyle='#e8590c'; c.lineWidth=3; c.beginPath(); c.ellipse(x,yH,w*.46,22*s,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#4dabf7'; c.strokeStyle='#1864ab'; c.lineWidth=5; c.beginPath(); c.moveTo(x-w*.5,yH); c.quadraticCurveTo(x-w*.48,yBas,x,yBas);
  c.quadraticCurveTo(x+w*.48,yBas,x+w*.5,yH); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#ffffff'; for(const u of [-.25,0,.25]){ c.beginPath(); c.arc(x+u*w,yH+h*.45,9*s,0,7); c.fill(); } }
