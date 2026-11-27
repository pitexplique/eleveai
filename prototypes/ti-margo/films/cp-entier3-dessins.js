/* ============================================================
   Nombres entiers CP, paires 7 à 12 (27/11/2026) : les dessins nouveaux. Relu par cp-entier2.js et cp-entier2-paysage.js
   après cp-entier2-dessins.js. Coordonnées de l'ardoise du short (1056 × 720) ; la paysage les agrandit ×1,25.
   27/11, test avec un enfant de CP : le « TU PARIES ? » écrit n'est pas vu → l'accroche passe par un dessin qui intrigue.
   ============================================================ */

/* ---- Paire 7 (lire et écrire) : le bus, la brume, la bulle, la rue de mamie, les casiers ---- */
/* Un bus vu de côté, avant à gauche : (x, yBas) = le bas de la carrosserie au milieu, w = la longueur.
   Renvoie {px, py, pw, ph} : le panneau du numéro (au-dessus du pare-brise), que l'appelant remplit. */
function busE(c,x,yBas,w,coul='#fcc419',z=1){ if(z<=0) return null; w*=Math.min(1.1,z); const h=w*.42, x0=x-w/2, y0=yBas-h;
  c.fillStyle=coul; c.strokeStyle='#5c3d0a'; c.lineWidth=5; c.beginPath(); c.roundRect(x0,y0,w,h,[34,22,14,14]); c.fill(); c.stroke();
  c.fillStyle='#1c7ed6'; c.fillRect(x0+4,yBas-h*.3,w-8,h*.1);
  /* le pare-brise et les vitres */
  c.fillStyle='#a5d8ff'; c.strokeStyle='#5c3d0a'; c.lineWidth=3;
  c.beginPath(); c.roundRect(x0+10,y0+h*.3,w*.13,h*.36,[16,6,6,6]); c.fill(); c.stroke();
  for(let i=0;i<4;i++){ c.beginPath(); c.roundRect(x0+w*.2+i*w*.19,y0+h*.3,w*.15,h*.3,8); c.fill(); c.stroke(); }
  /* les roues */
  for(const k of [.2,.8]){ c.fillStyle='#343a40'; c.beginPath(); c.arc(x0+w*k,yBas,h*.16,0,7); c.fill(); c.fillStyle='#adb5bd'; c.beginPath(); c.arc(x0+w*k,yBas,h*.07,0,7); c.fill(); }
  /* le phare */
  c.fillStyle='#fff3bf'; c.beginPath(); c.arc(x0+12,yBas-h*.16,9,0,7); c.fill();
  const pw=w*.3, ph=h*.2; c.fillStyle='#212529'; c.strokeStyle='#5c3d0a'; c.lineWidth=4; c.beginPath(); c.roundRect(x0+14,y0+h*.05,pw,ph,8); c.fill(); c.stroke();
  return {px:x0+14+pw/2,py:y0+h*.05+ph/2,pw,ph}; }
/* La brume du matin : des voiles blancs qui glissent ; u (0 → 1) leur épaisseur */
function brumeE(c,T,u=1,x0=0,x1=1056,y0=200,y1=640){ if(u<=0) return;
  for(let k=0;k<9;k++){ const x=x0+((k*211+T*22)%(x1-x0+300))-150, y=y0+(k*97)%(y1-y0), r=120+(k*37)%80;
    const g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,`rgba(241,243,245,${.55*u})`); g.addColorStop(1,'rgba(241,243,245,0)');
    c.fillStyle=g; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); } }
/* L'arrêt de bus : un poteau et son panneau rond */
function arretBusE(c,x,yBas,h=330){ c.fillStyle='#adb5bd'; c.fillRect(x-6,yBas-h,12,h);
  c.fillStyle='#1c7ed6'; c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.arc(x,yBas-h,46,0,7); c.fill(); c.stroke(); ecrire(c,'BUS',x,yBas-h+2,30,'#f8f9fa'); }
/* La route */
function routeE(c,y,W=1056){ c.fillStyle='#495057'; c.fillRect(0,y,W,720-y); c.fillStyle='#f8f9fa'; for(let x=20;x<W;x+=110) c.fillRect(x,y+(720-y)/2-4,60,8); }
/* Un ticket de bus : (x, y) = le centre */
function ticketE(c,x,y,w=220,h=120,z=1){ if(z<=0) return; w*=Math.min(1.1,z); h*=Math.min(1.1,z);
  c.fillStyle='#fff3bf'; c.strokeStyle='#e8590c'; c.lineWidth=4; c.setLineDash([10,7]); c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,12); c.fill(); c.stroke(); c.setLineDash([]); }
/* Une bulle de parole : (x, y) = le centre ; la pointe va vers (qx, qy). Écrit txt dedans (sombre). */
function bulleE(c,x,y,w,h,qx,qy,txt='',taille=46,z=1){ if(z<=0) return; const k=Math.min(1.1,z); w*=k; h*=k;
  c.fillStyle='#f8f9fa'; c.strokeStyle='#343a40'; c.lineWidth=4;
  c.beginPath(); c.moveTo(x-w*.12,y+h/2-4); c.lineTo(qx,qy); c.lineTo(x+w*.12,y+h/2-4); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,h/2); c.fill(); c.stroke();
  c.fillRect(x-w*.12+3,y+h/2-8,w*.24-6,8);
  if(txt) ecrire(c,txt,x,y+2,taille*k,'#343a40'); }
/* Des ondes sonores qui partent de (x, y) */
function ondesE(c,x,y,T,coul='#ffd43b'){ c.strokeStyle=coul; c.lineWidth=4; for(let k=0;k<3;k++){ const r=18+((T*40+k*16)%48);
  c.globalAlpha=1-r/66; c.beginPath(); c.arc(x,y,r,-.7,.7); c.stroke(); } c.globalAlpha=1; }

/* Une maison de la rue de mamie : (x, yBas) = le milieu du bas, w = la largeur. num = le numéro sur la porte ('' = caché).
   ouvre (0 → 1) ouvre la porte ; allume (0 → 1) allume la fenêtre ; eclaire (0 → 1) le rond de la lanterne. */
function maisonE(c,x,yBas,w,coul,{num='',ouvre=0,allume=0,eclaire=0,numCoul='#212529',terne=0}={}){ const h=w*1.05, x0=x-w/2, y0=yBas-h;
  c.fillStyle=coul; c.strokeStyle='#212529'; c.lineWidth=4; c.fillRect(x0,y0,w,h); c.strokeRect(x0,y0,w,h);
  c.fillStyle='#862e9c'; c.beginPath(); c.moveTo(x0-16,y0); c.lineTo(x,y0-w*.42); c.lineTo(x0+w+16,y0); c.closePath(); c.fill(); c.stroke();
  /* la fenêtre du haut */
  c.fillStyle=allume>0?`rgba(255,212,59,${.35+.65*allume})`:'#343a40'; c.fillRect(x-w*.22,y0+h*.05,w*.44,h*.2); c.strokeRect(x-w*.22,y0+h*.05,w*.44,h*.2);
  if(allume<=0){ c.beginPath(); c.moveTo(x,y0+h*.05); c.lineTo(x,y0+h*.25); c.stroke(); }
  /* la porte */
  const pw=w*.42, ph=h*.44, px=x-pw/2, py=yBas-ph;
  c.fillStyle='#ffe066'; c.fillRect(px,py,pw,ph);
  c.fillStyle='#8a5a2b'; c.save(); c.beginPath(); const lg=pw*(1-.8*ouvre); c.rect(px,py,lg,ph); c.fill(); c.stroke(); c.restore();
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(px+lg-12,py+ph*.55,6,0,7); c.fill();
  /* la plaque du numéro, au-dessus de la porte */
  c.fillStyle='#f8f9fa'; c.strokeStyle='#212529'; c.lineWidth=4; c.beginPath(); c.roundRect(x-w*.4,py-h*.27,w*.8,h*.23,12); c.fill(); c.stroke();
  if(num) ecrire(c,num,x,py-h*.155+2,h*.2,numCoul);
  if(terne>0){ c.fillStyle=`rgba(31,59,44,${.55*terne})`; c.fillRect(x0-18,y0-w*.44,w+36,h+w*.44); }
  if(eclaire>0){ const g=c.createRadialGradient(x,yBas-h*.45,0,x,yBas-h*.45,w*.75); g.addColorStop(0,`rgba(255,236,153,${.4*eclaire})`); g.addColorStop(1,'rgba(255,236,153,0)');
    c.fillStyle=g; c.beginPath(); c.arc(x,yBas-h*.45,w*.75,0,7); c.fill(); } }
/* Mamie à sa fenêtre : (x, y) = le centre du visage ; salut (0 → 1) lève la main */
function mamieE(c,x,y,s=1,salut=0,T=0){ c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle='#dee2e6'; c.beginPath(); c.arc(0,-30,20,0,7); c.fill(); c.beginPath(); c.arc(0,0,34,Math.PI*1.05,Math.PI*1.95); c.fill();
  c.fillStyle='#f3c9a0'; c.beginPath(); c.arc(0,4,28,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(-10,0,3.5,0,7); c.arc(10,0,3.5,0,7); c.fill();
  c.strokeStyle='#212529'; c.lineWidth=2; c.beginPath(); c.arc(-10,0,8,0,7); c.stroke(); c.beginPath(); c.arc(10,0,8,0,7); c.stroke();
  c.strokeStyle='#c92a2a'; c.lineWidth=3; c.beginPath(); c.arc(0,10,10,.3,Math.PI-.3); c.stroke();
  if(salut>0){ const a=-.4+.3*Math.sin(T*9); c.save(); c.translate(36,10); c.rotate(a); c.fillStyle='#f3c9a0'; c.beginPath(); c.ellipse(0,-30*salut,10,15,0,0,7); c.fill(); c.restore(); }
  c.restore(); }
/* Le faisceau de la lanterne de Ti Margo : part de (x, y) vers (cx, cy) */
function faisceauE(c,x,y,cx,cy,u=1){ if(u<=0) return; const a=Math.atan2(cy-y,cx-x), L=Math.hypot(cx-x,cy-y);
  const g=c.createLinearGradient(x,y,cx,cy); g.addColorStop(0,`rgba(255,236,153,${.5*u})`); g.addColorStop(1,`rgba(255,236,153,${.12*u})`);
  c.fillStyle=g; c.beginPath(); c.moveTo(x,y); c.lineTo(x+Math.cos(a-.22)*L,y+Math.sin(a-.22)*L); c.lineTo(x+Math.cos(a+.22)*L,y+Math.sin(a+.22)*L); c.closePath(); c.fill();
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(x,y,14,0,7); c.fill(); }
/* La lune */
function luneE(c,x,y,r){ c.fillStyle='#fff3bf'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.fillStyle='#1f3b2c'; c.beginPath(); c.arc(x+r*.45,y-r*.2,r*.85,0,7); c.fill(); }

/* Un casier de piscine : (x, yBas), w × h ; ouvre (0 → 1) ; num = son numéro */
function casierE(c,x,yBas,w,h,num='',ouvre=0,coul='#4dabf7'){ const x0=x-w/2, y0=yBas-h;
  c.fillStyle='#1864ab'; c.fillRect(x0,y0,w,h);
  if(ouvre>0){ c.fillStyle='#fff'; c.beginPath(); c.roundRect(x0+w*.15,y0+h*.35,w*.7,h*.22,8); c.fill(); c.fillStyle='#ff6b6b'; c.fillRect(x0+w*.15,y0+h*.42,w*.7,h*.06);
    c.fillStyle='#212529'; c.beginPath(); c.arc(x-w*.14,y0+h*.75,w*.1,0,7); c.arc(x+w*.14,y0+h*.75,w*.1,0,7); c.fill(); }
  const lg=w*(1-.85*ouvre); c.fillStyle=coul; c.strokeStyle='#0b3d6e'; c.lineWidth=4; c.fillRect(x0,y0,lg,h); c.strokeRect(x0,y0,lg,h);
  for(let k=0;k<3;k++){ c.fillStyle='#1864ab'; c.fillRect(x0+lg*.2,y0+12+k*12,lg*.6,5); }
  if(num&&ouvre<.5) ecrire(c,num,x0+lg/2,y0+h*.55,Math.min(54,w*.45),'#f8f9fa'); }
/* Le bracelet de la clé du casier : (x, y) = le centre de la plaque ; s = l'échelle ; renvoie la taille du texte */
function braceletE(c,x,y,s=1){ c.strokeStyle='#ff6b6b'; c.lineWidth=16*s; c.beginPath(); c.ellipse(x,y+95*s,110*s,70*s,0,Math.PI*1.15,Math.PI*1.85,true); c.stroke();
  c.fillStyle='#f8f9fa'; c.strokeStyle='#c92a2a'; c.lineWidth=8*s; c.beginPath(); c.roundRect(x-120*s,y-75*s,240*s,150*s,30*s); c.fill(); c.stroke();
  c.fillStyle='#adb5bd'; c.beginPath(); c.arc(x+150*s,y,16*s,0,7); c.fill(); c.fillRect(x+150*s,y-6*s,70*s,12*s); c.fillRect(x+200*s,y,8*s,22*s); c.fillRect(x+180*s,y,8*s,16*s); }
/* Les vagues de la piscine */
function piscineE(c,T,y,W=1056){ c.fillStyle='#74c0fc'; c.fillRect(0,y,W,720-y); c.strokeStyle='#d0ebff'; c.lineWidth=4;
  for(let r=0;r<3;r++){ c.beginPath(); for(let x=0;x<=W;x+=16) c.lineTo(x,y+20+r*34+6*Math.sin(x/40+T*2+r)); c.stroke(); } }
