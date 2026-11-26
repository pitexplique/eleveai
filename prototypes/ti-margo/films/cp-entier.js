/* ============================================================
   Série NOMBRES ENTIERS CP : dessins animés en short (cp-entier) ET en paysage (cp-entier-paysage, qui relit ce fichier).
   Outils : films/cp-commun.js. Ici : les objets à la craie, partagés par les deux formats.
   25/11/2026, Frédéric : « sois poétique », « les questions sont essentielles », « les maths doivent être un jeu ».
   ⛔ Pour des enfants qui ne lisent pas : à l'écran, surtout des dessins et des NOMBRES ; chaque nombre dit est écrit.
   Les dessins sont pensés pour l'ardoise du short (1056 × 720) ; la paysage les agrandit (voir ardoisePaysage).
   ============================================================ */
const entreE=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));
const douxE=u=>u*u*(3-2*u);

/* La paysage : un grand tableau, les dessins du short agrandis ×k et centrés */
function ardoisePaysage(tab,k=1.25){ const c=tab.c, f=tab.fond, W=tab.W, H=tab.H;
  tab.effacer=()=>{ c.setTransform(1,0,0,1,0,0); c.fillStyle=f; c.fillRect(0,0,W,H); c.setTransform(k,0,0,k,(W-1056*k)/2,(H-720*k)/2); }; }

/* Une fraise : (x, y) = le centre, r = la demi-largeur. lueur (0 → 1) l'entoure d'un halo doré. */
function fraiseCraie(c,x,y,r,z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.arc(x,y,r*1.55,0,7); c.fill(); }
  c.fillStyle='#e03131'; c.strokeStyle='#8f1d1d'; c.lineWidth=3.5; c.beginPath();
  c.moveTo(x,y+r*1.15); c.bezierCurveTo(x-r*1.25,y+r*.3,x-r*1.1,y-r*.85,x,y-r*.7); c.bezierCurveTo(x+r*1.1,y-r*.85,x+r*1.25,y+r*.3,x,y+r*1.15);
  c.fill(); c.stroke();
  c.fillStyle='#ffe066'; for(const [u,v] of [[-.45,-.25],[.1,-.35],[.5,-.1],[-.2,.15],[.3,.35],[-.5,.3],[0,.7]]){ c.beginPath(); c.ellipse(x+u*r,y+v*r,r*.07,r*.11,0,0,7); c.fill(); }
  c.fillStyle='#2f9e44'; for(const a of [-1.1,-.4,.4,1.1]){ c.beginPath(); c.ellipse(x+Math.sin(a)*r*.42,y-r*.78-Math.cos(a)*r*.12,r*.32,r*.12,a*.6,0,7); c.fill(); }
  c.strokeStyle='#2f9e44'; c.lineWidth=4; c.beginPath(); c.moveTo(x,y-r*.8); c.lineTo(x+r*.1,y-r*1.15); c.stroke(); }

/* Une assiette blanche vue de côté : (x, y) = le centre, w = la largeur */
function assietteCraie(c,x,y,w,z=1){ if(z<=0) return; w*=Math.min(1.15,z);
  c.fillStyle='#f1f3f5'; c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,w/2,w*.17,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#ced4da'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,w*.36,w*.11,0,0,7); c.stroke(); }

/* Un bol bleu : (x, yHaut) = le milieu du bord. Renvoie le bord (pour poser les fraises dedans). */
function bolCraie(c,x,yHaut,w,z=1){ if(z<=0) return; w*=Math.min(1.15,z);
  c.fillStyle='#4dabf7'; c.strokeStyle='#1864ab'; c.lineWidth=5; c.beginPath();
  c.moveTo(x-w/2,yHaut); c.quadraticCurveTo(x-w/2,yHaut+w*.55,x,yHaut+w*.55); c.quadraticCurveTo(x+w/2,yHaut+w*.55,x+w/2,yHaut); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#1c7ed6'; c.beginPath(); c.ellipse(x,yHaut,w/2,w*.09,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; for(const u of [-.25,0,.25]){ c.beginPath(); c.arc(x+u*w,yHaut+w*.28,w*.035,0,7); c.fill(); } }

/* Le soleil couchant : un demi-disque orangé posé sur l'horizon y, avec des rayons doux */
function soleilCouchant(c,x,y,r,u=1){ if(u<=0) return; const k=Math.min(1,u);
  c.save(); c.globalAlpha=k;
  c.strokeStyle='#ffc078'; c.lineWidth=6; c.lineCap='round';
  for(let i=0;i<7;i++){ const a=Math.PI+(i+.5)*Math.PI/7; c.beginPath(); c.moveTo(x+Math.cos(a)*r*1.25,y+Math.sin(a)*r*1.25); c.lineTo(x+Math.cos(a)*r*1.6,y+Math.sin(a)*r*1.6); c.stroke(); }
  c.fillStyle='#ff922b'; c.beginPath(); c.arc(x,y,r,Math.PI,0); c.closePath(); c.fill();
  c.strokeStyle='#ffd43b'; c.lineWidth=5; c.beginPath(); c.moveTo(x-r*1.9,y); c.lineTo(x+r*1.9,y); c.stroke(); c.restore(); }

/* Une pomme rouge : (x, y) = le centre */
function pommeE(c,x,y,r,z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,y,r*1.6,0,7); c.fill(); }
  c.fillStyle='#e03131'; c.beginPath(); c.arc(x-r*.35,y,r*.75,0,7); c.arc(x+r*.35,y,r*.75,0,7); c.fill();
  c.strokeStyle='#8a5a2b'; c.lineWidth=5; c.beginPath(); c.moveTo(x,y-r*.6); c.lineTo(x+r*.1,y-r*1.05); c.stroke();
  c.fillStyle='#51cf66'; c.beginPath(); c.ellipse(x+r*.38,y-r*.95,r*.3,r*.14,-.5,0,7); c.fill(); }

/* Un pommier : (x, yBas) = le pied du tronc ; renvoie le centre du feuillage */
function pommierCraie(c,x,yBas,s=1,z=1){ if(z<=0) return null; s*=Math.min(1.12,z);
  c.fillStyle='#8a5a2b'; c.fillRect(x-22*s,yBas-200*s,44*s,200*s);
  c.fillStyle='#2f9e44'; for(const [u,v,r] of [[0,-330,150],[-130,-270,105],[130,-270,105],[-70,-400,100],[75,-400,100]]){ c.beginPath(); c.arc(x+u*s,yBas+v*s,r*s,0,7); c.fill(); }
  c.fillStyle='#40c057'; for(const [u,v,r] of [[-40,-360,60],[60,-300,50]]){ c.beginPath(); c.arc(x+u*s,yBas+v*s,r*s,0,7); c.fill(); }
  return {x,y:yBas-310*s,s}; }

/* Un ballon gonflé avec sa ficelle : (x, y) = le centre du ballon */
function ballonAir(c,x,y,r,coul,z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.arc(x,y,r*1.6,0,7); c.fill(); }
  c.strokeStyle='#dee2e6'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y+r*1.2); c.quadraticCurveTo(x-r*.5,y+r*2,x+r*.1,y+r*2.8); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.ellipse(x,y,r,r*1.2,0,0,7); c.fill();
  c.beginPath(); c.moveTo(x-r*.18,y+r*1.32); c.lineTo(x+r*.18,y+r*1.32); c.lineTo(x,y+r*1.15); c.fill();
  c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.ellipse(x-r*.38,y-r*.42,r*.2,r*.32,-.4,0,7); c.fill(); }

/* Deux cerises reliées (une « paire »), brillantes comme des perles : (x, y) = le centre de la cerise de gauche */
function ceriseCraie(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.2,z);
  c.fillStyle='#c92a2a'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.arc(x-r*.35,y-r*.35,r*.25,0,7); c.fill();
  c.strokeStyle='#2f9e44'; c.lineWidth=4; c.beginPath(); c.moveTo(x,y-r); c.quadraticCurveTo(x+r*.4,y-r*2.4,x+r*1.2,y-r*2.6); c.stroke(); }

/* Une étincelle à 4 branches (la poésie : ce qui brille) */
function etincelle(c,x,y,r,coul='#ffd43b'){ c.fillStyle=coul; c.beginPath();
  for(let i=0;i<8;i++){ const a=i*Math.PI/4, R=i%2?r*.28:r; c.lineTo(x+Math.cos(a)*R,y+Math.sin(a)*R); } c.closePath(); c.fill(); }

/* Un nombre qui saute : écrit au-dessus d'un objet, avec un petit rond */
function etiquette(c,s,x,y,T,t0,coul=CRAIE.jaune,taille=50){ if(T<t0) return; const k=zoom(T,t0,.5);
  c.fillStyle='rgba(31,59,44,.85)'; c.beginPath(); c.arc(x,y,taille*.62*k,0,7); c.fill();
  c.strokeStyle=coul; c.lineWidth=4; c.stroke(); ecrire(c,s,x,y+2,taille*k,coul); }

/* Une trajectoire en cloche de a vers b, u de 0 à 1 */
const sautE=(a,b,u,h=120)=>{ const v=douxE(Math.max(0,Math.min(1,u))); return [a[0]+(b[0]-a[0])*v,a[1]+(b[1]-a[1])*v-h*Math.sin(Math.PI*v)]; };

/* Les nombres dits, en lettres, comme la voix les prononce */
const NOMBRES_E=['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf','dix'];

/* ---- Paire 2 (le rang) : ordinaux, escargots, pluie, drapeau, animaux de la file ---- */
/* « 1er », « 2e », « 3e » : le nombre en grand, la fin en petit, en haut à droite. (x, y) = le centre du nombre */
function ordinalE(c,n,x,y,taille=80,coul=CRAIE.jaune){ if(taille<=0) return; const fin=n===1?'er':'e';
  c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(String(n)).width; c.font=`800 ${taille*.5}px "Segoe UI"`; const w2=c.measureText(fin).width;
  const x0=x-(w+w2)/2; ecrire(c,String(n),x0+w/2,y,taille,coul); ecrire(c,fin,x0+w+w2/2,y-taille*.28,taille*.5,coul); }
/* Un ordinal dans un rond (comme etiquette), qui saute à t0 */
function rangE(c,n,x,y,T,t0,coul=CRAIE.jaune,taille=50){ if(T<t0) return; const k=zoom(T,t0,.5);
  c.fillStyle='rgba(31,59,44,.85)'; c.beginPath(); c.arc(x,y,taille*.8*k,0,7); c.fill(); c.strokeStyle=coul; c.lineWidth=4; c.stroke(); ordinalE(c,n,x,y+2,taille*k,coul); }
/* Un escargot : (x, y) = le dessous du corps, tête à droite ; coul = la coquille. s = l'échelle, t = l'instant (antennes qui bougent) */
function escargotCraie(c,x,y,s,coul,t=0){ c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle='#f3d9a4'; c.strokeStyle='#b08950'; c.lineWidth=4; c.beginPath();
  c.moveTo(-85,0); c.quadraticCurveTo(-80,-30,-30,-30); c.lineTo(50,-30); c.quadraticCurveTo(80,-34,82,-60); c.quadraticCurveTo(100,-62,100,-30); c.quadraticCurveTo(100,0,60,0); c.closePath(); c.fill(); c.stroke();
  for(const [dx,a] of [[84,-.35],[96,.15]]){ const ex=dx+Math.sin(a+Math.sin(t*3)*.12)*34, ey=-62-Math.cos(a)*34;
    c.beginPath(); c.moveTo(dx-4,-58); c.lineTo(ex,ey); c.stroke(); c.fillStyle='#343a40'; c.beginPath(); c.arc(ex,ey,6,0,7); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=5; c.beginPath(); c.arc(-15,-62,46,0,7); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=5; c.beginPath(); for(let a=0;a<4.6*Math.PI;a+=.2){ const r=4+a*2.6; c.lineTo(-15+Math.cos(a)*r,-62+Math.sin(a)*r); } c.stroke();
  c.fillStyle='#343a40'; c.beginPath(); c.arc(92,-24,3.5,0,7); c.fill();
  c.restore(); }
/* La pluie douce : des gouttes qui tombent, toujours les mêmes à l'instant T */
function pluieE(c,T,W=1056,H=720,n=26,u=1){ if(u<=0) return; c.strokeStyle=`rgba(165,216,255,${.7*Math.min(1,u)})`; c.lineWidth=4; c.lineCap='round';
  for(let k=0;k<n;k++){ const x=(k*137+40)%W, y=((T*260+k*97)%(H+60))-30; c.beginPath(); c.moveTo(x,y); c.lineTo(x-6,y+22); c.stroke(); } }
/* Le drapeau d'arrivée à damier : (x, yBas) = le pied du mât */
function drapeauE(c,x,yBas,h=420){ c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.beginPath(); c.moveTo(x,yBas); c.lineTo(x,yBas-h); c.stroke();
  const n=4, s=22; for(let i=0;i<n;i++) for(let j=0;j<3;j++){ c.fillStyle=(i+j)%2?'#212529':'#f8f9fa'; c.fillRect(x+i*s,yBas-h+j*s,s,s); } }
/* Les copains en craie (petits portraits en pied) : (x, y) = les pieds ; s = l'échelle */
function copainE(c,qui,x,y,s=1,lueur=0){ c.save(); c.translate(x,y); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(0,-70,80,95,0,0,7); c.fill(); }
  const P={lapin:['#f1f3f5','#ced4da'],chat:['#ffa94d','#d9480f'],souris:['#adb5bd','#495057'],canard:['#ffe066','#f59f00'],margo:['#69db7c','#2b8a3e'],ours:['#c08550','#8a5a2b'],cochon:['#ffc9c9','#e64980']}[qui];
  c.fillStyle=P[0]; c.strokeStyle=P[1]; c.lineWidth=4;
  c.beginPath(); c.ellipse(0,-45,38,45,0,0,7); c.fill(); c.stroke();                         /* le corps */
  if(qui==='lapin'){ for(const sx of [-1,1]){ c.beginPath(); c.ellipse(sx*16,-170,12,42,sx*.12,0,7); c.fill(); c.stroke(); c.fillStyle='#ffc9c9'; c.beginPath(); c.ellipse(sx*16,-168,5,28,sx*.12,0,7); c.fill(); c.fillStyle=P[0]; } }
  if(qui==='chat'){ for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*12,-150); c.lineTo(sx*34,-160); c.lineTo(sx*30,-128); c.closePath(); c.fill(); c.stroke(); }
    c.beginPath(); c.moveTo(34,-30); c.quadraticCurveTo(80,-40,62,-100); c.stroke(); }
  if(qui==='ours'){ for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*27,-140,15,0,7); c.fill(); c.stroke(); } }
  if(qui==='cochon'){ for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*14,-142); c.lineTo(sx*32,-152); c.lineTo(sx*30,-124); c.closePath(); c.fill(); c.stroke(); } }
  if(qui==='souris'){ for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*30,-142,22,0,7); c.fill(); c.stroke(); } c.beginPath(); c.moveTo(34,-12); c.quadraticCurveTo(80,0,70,-50); c.stroke(); }
  if(qui==='margo'){ c.beginPath(); c.moveTo(30,-20); c.quadraticCurveTo(90,-10,70,-60); c.quadraticCurveTo(55,-75,50,-55); c.stroke(); }
  c.beginPath(); c.arc(0,-112,34,0,7); c.fill(); c.stroke();                                   /* la tête */
  if(qui==='cochon'){ c.fillStyle='#faa2c1'; c.beginPath(); c.ellipse(0,-100,15,10,0,0,7); c.fill(); c.stroke(); c.fillStyle='#c2255c'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*5,-100,2.5,0,7); c.fill(); } }
  if(qui==='canard'){ c.fillStyle='#ff922b'; c.beginPath(); c.ellipse(34,-106,22,9,0,0,7); c.fill(); }
  if(qui==='margo'){ c.fillStyle='#f8f9fa'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*15,-136,14,0,7); c.fill(); c.stroke(); } c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*15+3,-136,6,0,7); c.fill(); } }
  else { c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*12+6,-118,5,0,7); c.fill(); } }
  if(qui==='chat'||qui==='souris'||qui==='lapin'||qui==='ours'){ c.fillStyle='#ff8787'; c.beginPath(); c.arc(8,-104,5,0,7); c.fill(); }
  c.restore(); }

/* Une phrase écrite à la main : chaque mot à l'instant donné (pour écrire « 5 » quand la voix dit « cinq ») */
const phraseE=(txt,ts)=>[ts[0],ts[ts.length-1],txt,ts];

/* Le soleil de midi : un disque jaune, ses rayons tournent doucement ; u (0 → 1) le fait paraître */
function soleilEtoileE(c,x,y,r,T,u=1){ if(u<=0) return; c.save(); c.globalAlpha=Math.min(1,u);
  c.strokeStyle='#ffd43b'; c.lineWidth=7; c.lineCap='round';
  for(let i=0;i<10;i++){ const a=i*Math.PI/5+T*.25; c.beginPath(); c.moveTo(x+Math.cos(a)*r*1.3,y+Math.sin(a)*r*1.3); c.lineTo(x+Math.cos(a)*r*1.7,y+Math.sin(a)*r*1.7); c.stroke(); }
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.restore(); }

/* ---- Paire 3 (construire une collection) : gâteau, bougies, chapeaux de fête, étoiles ---- */
/* Un gâteau rose sur son plat : (x, yBas) = le milieu du plat, w = la largeur. Renvoie le haut du gâteau (où piquer les bougies). */
function gateauCraie(c,x,yBas,w,z=1){ if(z<=0) return yBas-w*.4; w*=Math.min(1.12,z); const h=w*.38;
  c.fillStyle='#f1f3f5'; c.beginPath(); c.ellipse(x,yBas,w*.62,w*.07,0,0,7); c.fill();
  c.fillStyle='#faa2c1'; c.strokeStyle='#c2255c'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,18); c.fill(); c.stroke();
  c.fillStyle='#fff5f5'; c.beginPath(); c.moveTo(x-w/2,yBas-h+16);
  for(let i=0;i<=8;i++){ const u=x-w/2+i*w/8; c.quadraticCurveTo(u-w/16,yBas-h+(i%2?48:30),u,yBas-h+18); } c.lineTo(x+w/2,yBas-h); c.lineTo(x-w/2,yBas-h); c.closePath(); c.fill();
  c.fillStyle='#e03131'; for(const u of [-.3,0,.3]){ c.beginPath(); c.arc(x+u*w,yBas-h-4,12,0,7); c.fill(); }
  return yBas-h; }
/* Une bougie rayée, plantée en (x, yBas) ; sa flamme danse avec T ; lueur ajoute un halo */
function bougieCraie(c,x,yBas,T,z=1,lueur=0){ if(z<=0) return; const k=Math.min(1.2,z), h=95*k, w=24*k;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,yBas-h-26*k,46*k,0,7); c.fill(); }
  c.fillStyle='#74c0fc'; c.fillRect(x-w/2,yBas-h,w,h); c.strokeStyle='#f8f9fa'; c.lineWidth=5;
  for(let y=yBas-h+12;y<yBas;y+=24){ c.beginPath(); c.moveTo(x-w/2,y+8); c.lineTo(x+w/2,y-4); c.stroke(); }
  const f=1+.12*Math.sin(T*11+x);
  c.fillStyle='#ff922b'; c.beginPath(); c.ellipse(x,yBas-h-20*k,11*k*f,22*k*f,0,0,7); c.fill();
  c.fillStyle='#ffe066'; c.beginPath(); c.ellipse(x,yBas-h-16*k,5*k,11*k,0,0,7); c.fill(); }
/* Un chapeau pointu de fête : (x, yBas) = le milieu du bord */
function chapeauFete(c,x,yBas,s=1,coul='#be4bdb'){ c.save(); c.translate(x,yBas); c.scale(s,s);
  c.fillStyle=coul; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath(); c.moveTo(-34,0); c.lineTo(0,-92); c.lineTo(34,0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#ffe066'; for(const [u,v] of [[-10,-22],[10,-48],[-4,-66]]){ c.beginPath(); c.arc(u,v,6,0,7); c.fill(); }
  c.fillStyle='#ffd43b'; c.beginPath(); c.arc(0,-96,11,0,7); c.fill(); c.restore(); }
/* Un ciel d'étoiles qui scintillent (toujours les mêmes) */
function etoilesE(c,T,n=18,W=1056,yMax=260){ for(let k=0;k<n;k++){ const x=(k*173+60)%W, y=30+(k*89)%yMax, b=.5+.5*Math.sin(T*2.4+k*1.9);
  etincelle(c,x,y,9+8*b,`rgba(255,236,153,${.45+.55*b})`); } }
