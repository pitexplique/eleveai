/* Dessins propres aux films Ti Margo « margo-pb-ce1 » (28/11). Relu après margo-dessins.js.
   ⛔ Une seule session écrit ici : celle du CE1 (ou la fille qui la relaie).
   Tous les dessins : (x, y) = centre, ou (x, yBas) = milieu du bas ; z = zoom d'apparition (0 → rien) ; lueur 0 → 1. */

const COUL_CE1=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#cc5de8','#ff922b','#f783ac','#20c997'];
function lueurE(c,x,y,rx,ry,l){ if(l<=0) return; c.fillStyle=`rgba(255,212,59,${.35*l})`; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,7); c.fill(); }
function zk(c,x,y,z,a=0){ const k=Math.min(1.15,z); c.save(); c.translate(x,y); if(a) c.rotate(a); c.scale(k,k); }

/* ---- 08 groupement ---- */
/* Une chaussette (≈ 70 × 110 à s = 1), le pied vers la droite (dir = -1 : vers la gauche) ; rayure blanche en haut */
function chaussetteE(c,x,y,s,coul,{z=1,a=0,dir=1,lueur=0}={}){ if(z<=0) return; zk(c,x,y,z*s,a); c.scale(dir,1);
  lueurE(c,0,0,60,70,lueur);
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3; c.beginPath();
  c.moveTo(-22,-55); c.lineTo(14,-55); c.lineTo(14,18); c.quadraticCurveTo(46,20,48,38); c.quadraticCurveTo(48,56,24,56);
  c.lineTo(-6,56); c.quadraticCurveTo(-24,56,-22,30); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(-22,-50,36,10); c.fillRect(-22,-34,36,7);
  c.fillStyle='rgba(0,0,0,.15)'; c.beginPath(); c.arc(36,40,10,0,7); c.fill(); c.restore(); }
/* Le panier à linge en osier, renversé (couché) : (x, yBas) ; w = largeur */
function panierLingeE(c,x,yBas,w,{z=1}={}){ if(z<=0) return; zk(c,x,yBas,z); const h=w*.62;
  c.fillStyle='#d4a373'; c.strokeStyle='#8a5a2b'; c.lineWidth=5; c.beginPath(); c.roundRect(-w/2,-h,w,h,18); c.fill(); c.stroke();
  c.strokeStyle='rgba(138,90,43,.55)'; c.lineWidth=3; for(let i=1;i<6;i++){ const yy=-h+i*h/6; c.beginPath(); c.moveTo(-w/2+6,yy); c.lineTo(w/2-6,yy); c.stroke(); }
  for(let i=1;i<8;i++){ const xx=-w/2+i*w/8; c.beginPath(); c.moveTo(xx,-h+4); c.lineTo(xx,-4); c.stroke(); }
  c.fillStyle='#8a5a2b'; c.beginPath(); c.roundRect(-w*.16,-h-14,w*.32,18,8); c.fill(); c.restore(); }
/* Une petite voiture vue de côté (≈ w × 0.55w) : 4 roues (2 visibles + 2 dessinées derrière, plus petites) ; n têtes aux fenêtres */
function voitureE(c,x,yBas,w,coul,{z=1,lueur=0,tetes=0,roues=true,peaux=null}={}){ if(z<=0) return; zk(c,x,yBas,z); const h=w*.32;
  lueurE(c,0,-h,w*.62,h*1.3,lueur);
  if(roues){ c.fillStyle='#495057'; for(const xx of [-w*.26,w*.3]){ c.beginPath(); c.arc(xx,-h*.18,w*.09,0,7); c.fill(); } }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=4;
  c.beginPath(); c.roundRect(-w/2,-h*1.1,w,h*.85,14); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-w*.32,-h*1.08); c.lineTo(-w*.2,-h*1.85); c.lineTo(w*.2,-h*1.85); c.lineTo(w*.34,-h*1.08); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#d0ebff'; c.beginPath(); c.moveTo(-w*.27,-h*1.12); c.lineTo(-w*.18,-h*1.75); c.lineTo(-w*.02,-h*1.75); c.lineTo(-w*.02,-h*1.12); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(w*.02,-h*1.12); c.lineTo(w*.02,-h*1.75); c.lineTo(w*.18,-h*1.75); c.lineTo(w*.28,-h*1.12); c.closePath(); c.fill();
  const P=peaux||['#8d5524','#f1c27d','#c68642','#e0ac69','#5c3a1e'];
  for(let i=0;i<tetes;i++){ const xx=-w*.2+i*(w*.4/Math.max(1,tetes-1||1)); c.fillStyle=P[i%5]; c.beginPath(); c.arc(tetes===1?0:xx,-h*1.3,w*.055,0,7); c.fill(); }
  c.fillStyle='#ffe066'; c.beginPath(); c.arc(w*.46,-h*.75,w*.035,0,7); c.fill();
  if(roues){ for(const xx of [-w*.3,w*.3]){ c.fillStyle='#212529'; c.beginPath(); c.arc(xx,-h*.18,w*.115,0,7); c.fill();
    c.fillStyle='#adb5bd'; c.beginPath(); c.arc(xx,-h*.18,w*.05,0,7); c.fill(); } }
  c.restore(); }
/* Une roue seule (le défi des 20 roues) */
function roueE(c,x,y,r,{z=1,lueur=0}={}){ if(z<=0) return; zk(c,x,y,z); lueurE(c,0,0,r*1.4,r*1.4,lueur);
  c.fillStyle='#212529'; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.fillStyle='#adb5bd'; c.beginPath(); c.arc(0,0,r*.45,0,7); c.fill();
  c.fillStyle='#495057'; c.beginPath(); c.arc(0,0,r*.15,0,7); c.fill(); c.restore(); }
/* Un croissant doré (L = longueur) */
function croissantE(c,x,y,L,{z=1,lueur=0,a=0}={}){ if(z<=0) return; zk(c,x,y,z,a); lueurE(c,0,0,L*.62,L*.45,lueur);
  const seg=[[-.42,.1,.13],[-.24,-.04,.17],[0,-.09,.2],[.24,-.04,.17],[.42,.1,.13]];
  for(const [u,v,r] of seg){ c.fillStyle='#e8a33d'; c.strokeStyle='#9c5a12'; c.lineWidth=3; c.beginPath(); c.ellipse(u*L,v*L,r*L,r*L*.9,0,0,7); c.fill(); c.stroke(); }
  c.fillStyle='rgba(255,236,170,.55)'; c.beginPath(); c.ellipse(0,-.15*L,.11*L,.05*L,0,0,7); c.fill(); c.restore(); }
/* Une boîte en carton, ouverte (couvercle relevé) ou fermée : (x, yBas), w × h ; num = numéro écrit sur la boîte fermée */
function boiteE(c,x,yBas,w,h,{z=1,ferme=0,num='',coul='#e9c46a',bord='#a67c2e',lueur=0}={}){ if(z<=0) return; zk(c,x,yBas,z);
  lueurE(c,0,-h/2,w*.75,h*.95,lueur);
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=5; c.beginPath(); c.roundRect(-w/2,-h,w,h,8); c.fill(); c.stroke();
  if(ferme>0){ c.globalAlpha=Math.min(1,ferme); c.fillStyle=coul; c.beginPath(); c.roundRect(-w/2-6,-h-16,w+12,22,6); c.fill(); c.stroke();
    if(num) ecrire(c,num,0,-h*.45,h*.55,'#5c3d0e'); c.globalAlpha=1; }
  else { c.fillStyle='rgba(0,0,0,.12)'; c.fillRect(-w/2+6,-h+6,w-12,10); }
  c.restore(); }
/* Un œuf (r = demi-largeur) */
function oeufE(c,x,y,r,{z=1,lueur=0,coul='#fff4e6'}={}){ if(z<=0) return; zk(c,x,y,z); lueurE(c,0,0,r*1.5,r*1.7,lueur);
  c.fillStyle=coul; c.strokeStyle='#c9a27a'; c.lineWidth=3; c.beginPath(); c.ellipse(0,0,r,r*1.28,0,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.ellipse(-r*.35,-r*.45,r*.22,r*.32,-.4,0,7); c.fill(); c.restore(); }
/* Une boîte à œufs vue de dessus : cols × rangs alvéoles ; (x, y) = centre ; renvoie les centres des alvéoles */
function boiteOeufsE(c,x,y,cols,rangs,pas,{z=1,lueur=0}={}){ const W=cols*pas+16, H=rangs*pas+16, res=[];
  for(let j=0;j<rangs;j++) for(let i=0;i<cols;i++) res.push([x-W/2+8+pas*(i+.5), y-H/2+8+pas*(j+.5)]);
  if(z<=0) return res; zk(c,x,y,z); lueurE(c,0,0,W*.7,H*.8,lueur);
  c.fillStyle='#ced4da'; c.strokeStyle='#868e96'; c.lineWidth=4; c.beginPath(); c.roundRect(-W/2,-H/2,W,H,12); c.fill(); c.stroke();
  c.fillStyle='#adb5bd'; for(let j=0;j<rangs;j++) for(let i=0;i<cols;i++){ c.beginPath(); c.arc(-W/2+8+pas*(i+.5),-H/2+8+pas*(j+.5),pas*.36,0,7); c.fill(); }
  c.restore(); return res; }
/* Un petit élève (≈ 120 px de haut à s = 1), tee-shirt ou chasuble de la couleur coul ; k = la peau */
function eleveE(c,x,yBas,s,coul,{z=1,k=0,lueur=0,saute=0}={}){ if(z<=0) return; zk(c,x,yBas-saute,z*s);
  lueurE(c,0,-60,45,70,lueur);
  const PEAU=['#8d5524','#f1c27d','#c68642','#e0ac69','#5c3a1e'][k%5], CHEV=['#212529','#7a4a2a','#343a40','#a0522d','#212529'][k%5];
  c.fillStyle='#1c7ed6'; c.fillRect(-15,-38,12,38); c.fillRect(3,-38,12,38);
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=3; c.beginPath(); c.moveTo(-24,-36); c.lineTo(-20,-84); c.lineTo(20,-84); c.lineTo(24,-36); c.closePath(); c.fill(); c.stroke();
  c.fillStyle=PEAU; c.beginPath(); c.arc(0,-102,19,0,7); c.fill();
  c.fillStyle=CHEV; c.beginPath(); c.arc(0,-108,19,Math.PI*1.05,Math.PI*1.95); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(-7,-101,2.6,0,7); c.arc(7,-101,2.6,0,7); c.fill();
  c.strokeStyle='#212529'; c.lineWidth=2.5; c.beginPath(); c.arc(0,-96,6,.2,Math.PI-.2); c.stroke(); c.restore(); }

/* ---- 09 reste ---- */
/* Un cookie aux pépites (r = rayon) ; fume = petites vapeurs */
function cookieE(c,x,y,r,{z=1,lueur=0,T=0,fume=0}={}){ if(z<=0) return; zk(c,x,y,z); lueurE(c,0,0,r*1.4,r*1.4,lueur);
  c.fillStyle='#d9a066'; c.strokeStyle='#9c6630'; c.lineWidth=3; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#5c3a1e'; for(const [u,v] of [[-.4,-.3],[.3,-.4],[.1,.1],[-.3,.35],[.45,.25],[-.05,-.6]]){ c.beginPath(); c.arc(u*r,v*r,r*.11,0,7); c.fill(); }
  if(fume>0){ c.strokeStyle=`rgba(255,255,255,${.5*fume})`; c.lineWidth=3; for(const dx of [-.35,.25]){ c.beginPath();
    const o=(T*30)%20; c.moveTo(dx*r,-r-4-o); c.bezierCurveTo(dx*r-10,-r-20-o,dx*r+10,-r-34-o,dx*r,-r-50-o); c.stroke(); } }
  c.restore(); }
/* Une plaque de cuisson (rectangle gris) : (x, y) = centre */
function plaqueE(c,x,y,w,h){ c.fillStyle='#868e96'; c.strokeStyle='#495057'; c.lineWidth=6; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,14); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,255,255,.2)'; c.lineWidth=3; c.beginPath(); c.roundRect(x-w/2+12,y-h/2+12,w-24,h-24,8); c.stroke(); }
/* Une carte à jouer (dos rouge ou bleu), w = largeur */
function carteJeuE(c,x,y,w,{z=1,a=0,coul='#e03131',lueur=0}={}){ if(z<=0) return; zk(c,x,y,z,a); const h=w*1.4; lueurE(c,0,0,w*.9,h*.75,lueur);
  c.fillStyle='#fff'; c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,8); c.fill(); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.roundRect(-w/2+6,-h/2+6,w-12,h-12,5); c.fill();
  c.strokeStyle='rgba(255,255,255,.6)'; c.lineWidth=2; c.beginPath(); c.moveTo(0,-h*.32); c.lineTo(w*.28,0); c.lineTo(0,h*.32); c.lineTo(-w*.28,0); c.closePath(); c.stroke(); c.restore(); }
/* Une fleur des champs seule (marguerite) sur sa tige : (x, yBas), h = hauteur ; coul = le cœur */
function fleurChampE(c,x,yBas,h,{z=1,coul='#fcc419',petale='#fff',lueur=0,a=0}={}){ if(z<=0) return; zk(c,x,yBas,z,a);
  c.strokeStyle='#2f9e44'; c.lineWidth=5; c.beginPath(); c.moveTo(0,0); c.quadraticCurveTo(-8,-h*.5,0,-h); c.stroke();
  c.fillStyle='#51cf66'; c.beginPath(); c.ellipse(-12,-h*.4,12,5,-.6,0,7); c.fill();
  lueurE(c,0,-h,38,38,lueur);
  c.fillStyle=petale; for(let i=0;i<8;i++){ const an=i*Math.PI/4; c.beginPath(); c.ellipse(Math.cos(an)*14,-h+Math.sin(an)*14,11,6,an,0,7); c.fill(); }
  c.fillStyle=coul; c.beginPath(); c.arc(0,-h,9,0,7); c.fill(); c.restore(); }
/* Un bouquet de n fleurs des champs noué d'un ruban : (x, yBas) */
function bouquetChampE(c,x,yBas,n,{z=1,ruban=1,lueur=0,coulRuban='#e64980',k=0}={}){ if(z<=0) return; zk(c,x,yBas,z);
  const H=[150,170,160,140,175,150,165], AN=[-.32,-.14,.02,.16,.3,-.24,.24];
  for(let i=0;i<n;i++) fleurChampE(c,0,0,H[i%7],{a:AN[i%7],coul:COUL_CE1[(i+k)%5],lueur});
  if(ruban>0){ c.globalAlpha=Math.min(1,ruban); c.fillStyle=coulRuban; c.fillRect(-14,-46,28,16);
    for(const sx of [-1,1]){ c.beginPath(); c.moveTo(0,-38); c.quadraticCurveTo(sx*36,-66,sx*30,-30); c.closePath(); c.fill(); } c.globalAlpha=1; }
  c.restore(); }

/* ---- 10 défi ---- */
/* Un sandwich (triangle de pain de mie, salade et tomate), w = largeur */
function sandwichE(c,x,y,w,{z=1,lueur=0,a=0}={}){ if(z<=0) return; zk(c,x,y,z,a); lueurE(c,0,0,w*.8,w*.6,lueur);
  const h=w*.62; c.lineJoin='round';
  c.fillStyle='#f4d58d'; c.strokeStyle='#b5852b'; c.lineWidth=4; c.beginPath(); c.moveTo(-w/2,h/2); c.lineTo(w/2,h/2); c.lineTo(0,-h/2); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#69db7c'; c.fillRect(-w*.42,h*.26,w*.84,h*.1); c.fillStyle='#ff6b6b'; c.fillRect(-w*.36,h*.34,w*.72,h*.07);
  c.fillStyle='#fff3d6'; c.beginPath(); c.moveTo(-w*.3,h*.24); c.lineTo(w*.3,h*.24); c.lineTo(0,-h*.24); c.closePath(); c.fill(); c.restore(); }
/* Un paquet (sachet kraft) : le contour d'un groupe, (x, y) = centre, w × h */
function paquetE(c,x,y,w,h,{z=1,lueur=0,u=1}={}){ if(z<=0||u<=0) return; zk(c,x,y,z); lueurE(c,0,0,w*.65,h*.7,lueur); c.globalAlpha=Math.min(1,u);
  c.fillStyle='rgba(212,163,115,.45)'; c.strokeStyle='#d4a373'; c.lineWidth=5; c.setLineDash([12,8]); c.beginPath(); c.roundRect(-w/2,-h/2,w,h,18); c.fill(); c.stroke(); c.setLineDash([]);
  c.globalAlpha=1; c.restore(); }
/* Une chaise d'école (de côté), s = 1 → ≈ 90 px de haut */
function chaiseE(c,x,yBas,s,{z=1,coul='#4dabf7',lueur=0}={}){ if(z<=0) return; zk(c,x,yBas,z*s); lueurE(c,0,-45,45,55,lueur);
  c.strokeStyle='#495057'; c.lineWidth=5; c.lineCap='round'; c.beginPath(); c.moveTo(-20,0); c.lineTo(-20,-44); c.moveTo(20,0); c.lineTo(20,-44); c.stroke();
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3; c.beginPath(); c.roundRect(-26,-50,52,10,4); c.fill(); c.stroke();
  c.strokeStyle='#495057'; c.lineWidth=5; c.beginPath(); c.moveTo(-20,-50); c.lineTo(-20,-92); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.roundRect(-26,-92,16,30,4); c.fill(); c.stroke(); c.restore(); }
/* Une gourde (h = hauteur) */
function gourdeE(c,x,yBas,h,coul,{z=1,lueur=0}={}){ if(z<=0) return; zk(c,x,yBas,z); const w=h*.4; lueurE(c,0,-h/2,w*1.2,h*.7,lueur);
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3; c.beginPath(); c.roundRect(-w/2,-h*.85,w,h*.85,w*.3); c.fill(); c.stroke();
  c.fillStyle='#343a40'; c.beginPath(); c.roundRect(-w*.3,-h,w*.6,h*.17,4); c.fill();
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(-w*.3,-h*.7,w*.14,h*.5); c.restore(); }
/* Un pack (film plastique) autour de n objets : contour arrondi transparent */
function packE(c,x,y,w,h,{z=1,lueur=0}={}){ if(z<=0) return; zk(c,x,y,z); lueurE(c,0,0,w*.65,h*.7,lueur);
  c.fillStyle='rgba(208,235,255,.18)'; c.strokeStyle='rgba(208,235,255,.85)'; c.lineWidth=4; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,16); c.fill(); c.stroke(); c.restore(); }
/* Un filet à ballons (sac en mailles) : (x, y) = centre, w × h */
function filetBallonsE(c,x,y,w,h,{z=1,lueur=0,coul='#fff'}={}){ if(z<=0) return; zk(c,x,y,z); lueurE(c,0,0,w*.65,h*.7,lueur);
  c.strokeStyle=coul; c.lineWidth=3; c.globalAlpha=.85; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,w*.25); c.stroke();
  c.save(); c.beginPath(); c.roundRect(-w/2,-h/2,w,h,w*.25); c.clip(); c.lineWidth=1.8;
  for(let d=-h;d<w+h;d+=26){ c.beginPath(); c.moveTo(-w/2+d,-h/2); c.lineTo(-w/2+d-h,h/2); c.stroke(); c.beginPath(); c.moveTo(-w/2+d-h,-h/2); c.lineTo(-w/2+d,h/2); c.stroke(); }
  c.restore(); c.globalAlpha=1; c.fillStyle='#e8590c'; c.beginPath(); c.roundRect(-w*.3,-h/2-10,w*.6,14,6); c.fill(); c.restore(); }
/* Une nappe à carreaux dans l'herbe : (x, y) = centre */
function nappeE(c,x,y,w,h){ c.save(); c.translate(x,y); c.fillStyle='#fff'; c.fillRect(-w/2,-h/2,w,h);
  c.fillStyle='rgba(224,49,49,.55)'; const p=48; for(let i=0;i*p<w;i+=2) c.fillRect(-w/2+i*p,-h/2,p,h); for(let j=0;j*p<h;j+=2) c.fillRect(-w/2,-h/2+j*p,w,p);
  c.restore(); }
/* Un terrain de foot vu de face : herbe rayée et lignes blanches jusqu'en y */
function terrainE(c,yHaut=300,W=1056,H=720){ for(let i=0;i<8;i++){ c.fillStyle=i%2?'#40a050':'#37944a'; c.fillRect(0,yHaut+(H-yHaut)*i/8,W,(H-yHaut)/8+1); }
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=5; c.beginPath(); c.moveTo(0,yHaut+20); c.lineTo(W,yHaut+20); c.stroke(); }
/* Un fanion de tournoi */
function fanionE(c,x,yBas,h,coul,T=0){ c.strokeStyle='#dee2e6'; c.lineWidth=5; c.beginPath(); c.moveTo(x,yBas); c.lineTo(x,yBas-h); c.stroke();
  const o=Math.sin(T*3+x)*6; c.fillStyle=coul; c.beginPath(); c.moveTo(x,yBas-h); c.lineTo(x+64,yBas-h+20+o); c.lineTo(x,yBas-h+42); c.closePath(); c.fill(); }
