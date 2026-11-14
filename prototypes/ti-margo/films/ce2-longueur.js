/* ============================================================
   Série Longueurs CE2 : les shorts en dessin animé. Outils : films/ce2-commun.js.
   Chaque film vit dans son fichier, films/ce2-longueur-<épisode>.js ; ici, les objets à la craie.
   ⛔ Unités du CE2 : km, m, dm, cm, mm ; pas de virgule, pas de tableau de conversion.
   L'ardoise fait 1056 × 720 (L 4,4 × 240).
   ============================================================ */
const BOIS='#fab005', QUEUE='#69db7c', BANANE='#ffe066', CORDE1='#ff922b', CORDE2='#74c0fc';

const entreL=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));

/* WinRT donne parfois 3 jetons identiques (« 150 centimètres ») : on en garde 2 au plus (voixDe sait sauter une paire) */
function deuxAuPlus(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const x of CL[k]){ const n=res.length;
    if(n>=2&&res[n-1][1]===x[1]&&res[n-2][1]===x[1]) continue; res.push(x); } CL[k]=res; } }

/* Une règle à plat, graduée en cm : (x, y) = le haut du 0, pas = largeur d'un cm, n = nombre de cm */
function regleH(c,x,y,pas,n,z=1,chiffres=true){ if(z<=0) return; const a=Math.min(1,z), w=pas*n;
  c.globalAlpha=a; c.fillStyle=BOIS; c.fillRect(x-18,y,w+36,76); c.strokeStyle='#5c3d00'; c.lineWidth=3;
  for(let i=0;i<=n;i++){ const xx=x+i*pas; c.beginPath(); c.moveTo(xx,y); c.lineTo(xx,y+30); c.stroke();
    if(i<n){ c.lineWidth=2; c.beginPath(); c.moveTo(xx+pas/2,y); c.lineTo(xx+pas/2,y+16); c.stroke(); c.lineWidth=3; }
    if(chiffres){ c.fillStyle='#3b2a00'; c.font=`800 ${Math.min(30,pas*.62)}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle'; c.fillText(String(i),xx,y+52); c.fillStyle=BOIS; } }
  c.globalAlpha=1; }

/* La queue de Ti Margo, couchée : de (x0, y) à (x1, y), qui se dessine de u = 0 à 1 */
function queueCraie(c,x0,x1,y,u=1){ if(u<=0) return; const xf=x0+(x1-x0)*Math.min(1,u), n=24;
  c.fillStyle=QUEUE; c.beginPath();
  for(let i=0;i<=n;i++){ const x=x0+(xf-x0)*i/n, e=34*(1-.8*(x-x0)/(x1-x0)), o=Math.sin((x-x0)/45)*4; c.lineTo(x,y-e+o); }
  for(let i=n;i>=0;i--){ const x=x0+(xf-x0)*i/n, e=34*(1-.8*(x-x0)/(x1-x0)), o=Math.sin((x-x0)/45)*4; c.lineTo(x,y+e+o); }
  c.fill(); c.fillStyle='#2b8a3e'; for(let x=x0+30;x<xf-20;x+=60){ c.beginPath(); c.arc(x,y+Math.sin((x-x0)/45)*4,5,0,7); c.fill(); } }

/* Une banane couchée de x0 à x1, posée sur la ligne y (son ventre touche y) */
function bananeCraie(c,x0,x1,y,z=1){ if(z<=0) return; const w=x1-x0, h=Math.max(36,w*.14), m=(x0+x1)/2;
  c.globalAlpha=Math.min(1,z); c.fillStyle=BANANE; c.strokeStyle='#e67700'; c.lineWidth=4; c.beginPath();
  c.moveTo(x0,y-h*.55); c.quadraticCurveTo(m,y+h*.35,x1,y-h*.55); c.quadraticCurveTo(m,y-h*.55,x0,y-h*.55); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#5c3d00'; c.fillRect(x0-6,y-h*.62,12,14); c.fillRect(x1-6,y-h*.62,12,14); c.globalAlpha=1; }

/* Un gecko vu de dessus, tête à droite : (x, y) = le milieu, w = la longueur du nez au bout de la queue */
function geckoCraie(c,x,y,w,coul='#b197fc',z=1){ if(z<=0) return; const s=w/300*Math.min(1.15,z), g=x-w/2;
  c.fillStyle=coul; c.strokeStyle=coul; c.lineCap='round';
  c.lineWidth=14*s; c.beginPath(); c.moveTo(g,y+10*s); c.quadraticCurveTo(g+60*s,y-12*s,g+120*s,y); c.stroke();
  c.beginPath(); c.ellipse(g+180*s,y,70*s,24*s,0,0,7); c.fill(); c.beginPath(); c.ellipse(g+262*s,y,38*s,22*s,0,0,7); c.fill();
  c.lineWidth=10*s; for(const [dx,sy] of [[150,1],[150,-1],[215,1],[215,-1]]){ c.beginPath(); c.moveTo(g+dx*s,y); c.lineTo(g+(dx+(sy>0?-20:-20))*s,y+sy*48*s); c.stroke(); }
  c.fillStyle='#212529'; c.beginPath(); c.arc(g+275*s,y-10*s,5*s,0,7); c.arc(g+275*s,y+10*s,5*s,0,7); c.fill(); }

/* Un cerf-volant : (x, y) = son centre, s = l'échelle ; la ficelle descend jusqu'à (fx, fy) */
function cerfVolant(c,x,y,s=1,z=1,fx=null,fy=null){ if(z<=0) return; s*=Math.min(1.15,z);
  if(fx!==null){ c.strokeStyle=CRAIE.blanc; c.lineWidth=3; c.beginPath(); c.moveTo(x,y+70*s); c.quadraticCurveTo((x+fx)/2+40,(y+fy)/2+30,fx,fy); c.stroke(); }
  c.fillStyle='#f03e3e'; c.beginPath(); c.moveTo(x,y-70*s); c.lineTo(x+50*s,y); c.lineTo(x,y+70*s); c.lineTo(x-50*s,y); c.closePath(); c.fill();
  c.fillStyle='#ffd43b'; c.beginPath(); c.moveTo(x,y-70*s); c.lineTo(x+50*s,y); c.lineTo(x,y); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x,y+70*s); c.lineTo(x-50*s,y); c.lineTo(x,y); c.closePath(); c.fill();
  c.strokeStyle='#4dabf7'; c.lineWidth=4; c.beginPath(); c.moveTo(x,y+70*s);
  for(let i=1;i<=4;i++) c.lineTo(x+(i%2?-18:18)*s,y+(70+i*22)*s); c.stroke(); }

/* Un mur de briques : coin haut-gauche (x, y), w × h */
function murCraie(c,x,y,w,h,z=1){ if(z<=0) return; c.globalAlpha=Math.min(1,z); c.fillStyle='#c0603a'; c.fillRect(x,y,w,h);
  c.strokeStyle='#f1c8a8'; c.lineWidth=3; const bh=h/6;
  for(let j=0;j<6;j++){ const yy=y+j*bh; c.beginPath(); c.moveTo(x,yy); c.lineTo(x+w,yy); c.stroke();
    for(let xx=x+(j%2?45:0);xx<x+w;xx+=90){ if(xx>x){ c.beginPath(); c.moveTo(xx,yy); c.lineTo(xx,yy+bh); c.stroke(); } } }
  c.strokeRect(x,y,w,h); c.globalAlpha=1; }

/* Une maison : (x, yBas) = le milieu du sol, s = l'échelle */
function maisonCraie(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const w=150*s, h=110*s;
  c.fillStyle='#ffe8cc'; c.fillRect(x-w/2,yBas-h,w,h); c.fillStyle='#e03131'; c.beginPath(); c.moveTo(x-w/2-14*s,yBas-h); c.lineTo(x,yBas-h-80*s); c.lineTo(x+w/2+14*s,yBas-h); c.fill();
  c.fillStyle='#8a5a2b'; c.fillRect(x-18*s,yBas-56*s,36*s,56*s); c.fillStyle='#74c0fc'; c.fillRect(x+30*s,yBas-86*s,32*s,30*s); c.fillRect(x-62*s,yBas-86*s,32*s,30*s); }

/* Une petite voiture : (x, yBas) = le milieu, au sol */
function voitureCraie(c,x,yBas,s=1,z=1,coul='#4dabf7'){ if(z<=0) return; s*=Math.min(1.15,z);
  c.fillStyle=coul; c.beginPath(); c.roundRect(x-80*s,yBas-60*s,160*s,40*s,10*s); c.fill(); c.beginPath(); c.roundRect(x-46*s,yBas-94*s,86*s,40*s,12*s); c.fill();
  c.fillStyle='#e7f5ff'; c.fillRect(x-36*s,yBas-86*s,30*s,26*s); c.fillRect(x+2*s,yBas-86*s,30*s,26*s);
  c.fillStyle='#212529'; for(const dx of [-48,48]){ c.beginPath(); c.arc(x+dx*s,yBas-18*s,18*s,0,7); c.fill(); } }

/* Un ruban de corde (une longueur), coin gauche (x, y), longueur w, couleur, qui se déroule de u = 0 à 1 */
function cordeCraie(c,x,y,w,coul,u=1,ep=22){ if(u<=0) return; c.fillStyle=coul; c.beginPath(); c.roundRect(x,y-ep/2,w*Math.min(1,u),ep,ep/2); c.fill();
  c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=2; for(let xx=x+14;xx<x+w*Math.min(1,u)-6;xx+=18){ c.beginPath(); c.moveTo(xx,y-ep/2+3); c.lineTo(xx+8,y+ep/2-3); c.stroke(); } }

/* Un skate vu de côté : (x, y) = le milieu de la planche, w = la longueur */
function skateCraie(c,x,y,w,z=1){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; const h=22*k;
  c.fillStyle='#845ef7'; c.beginPath(); c.moveTo(x-w/2,y-h); c.quadraticCurveTo(x-w/2-20*k,y-h-24*k,x-w/2+10*k,y-h-6*k);
  c.lineTo(x-w/2+10*k,y-h); c.lineTo(x+w/2-10*k,y-h); c.lineTo(x+w/2-10*k,y-h-6*k); c.quadraticCurveTo(x+w/2+20*k,y-h-24*k,x+w/2,y-h);
  c.lineTo(x+w/2,y); c.lineTo(x-w/2,y); c.closePath(); c.fill();
  c.fillStyle='#adb5bd'; c.fillRect(x-w*.32,y,16*k,14*k); c.fillRect(x+w*.32-16*k,y,16*k,14*k);
  c.fillStyle='#ffd43b'; for(const dx of [-.32,.32]){ c.beginPath(); c.arc(x+dx*w+(dx<0?8:-8)*k,y+28*k,16*k,0,7); c.fill(); } }

/* Une porte : coin bas-gauche (x, yBas), w × h */
function porteCraie(c,x,yBas,w,h,z=1){ if(z<=0) return; c.globalAlpha=Math.min(1,z); c.fillStyle='#a9714b'; c.fillRect(x,yBas-h,w,h);
  c.strokeStyle='#5c3d00'; c.lineWidth=4; c.strokeRect(x,yBas-h,w,h); c.strokeRect(x+18,yBas-h+18,w-36,h*.4); c.strokeRect(x+18,yBas-h*.5,w-36,h*.4);
  c.fillStyle='#ffd43b'; c.beginPath(); c.arc(x+w-22,yBas-h*.5,8,0,7); c.fill(); c.globalAlpha=1; }

/* Une gomme : (x, y) = le centre */
function gommeCraie(c,x,y,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z);
  c.fillStyle='#f783ac'; c.beginPath(); c.roundRect(x-80*s,y-30*s,90*s,60*s,10*s); c.fill();
  c.fillStyle='#4dabf7'; c.beginPath(); c.roundRect(x+10*s,y-30*s,70*s,60*s,10*s); c.fill(); }

/* Une flèche double horizontale (une longueur), avec son étiquette au-dessus */
function coteH(c,x0,x1,y,txt,coul=CRAIE.jaune,taille=52){ c.strokeStyle=coul; c.lineWidth=5; c.beginPath(); c.moveTo(x0,y); c.lineTo(x1,y);
  for(const [a,d] of [[x0,1],[x1,-1]]){ c.moveTo(a+d*18,y-12); c.lineTo(a,y); c.lineTo(a+d*18,y+12); } c.stroke();
  if(txt) ecrire(c,txt,(x0+x1)/2,y-40,taille,coul); }
