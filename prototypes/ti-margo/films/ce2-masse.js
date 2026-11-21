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
