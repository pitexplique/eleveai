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

/* ---- Paire 8 (décomposer : dizaines + unités) : les perles, la boîte à bijoux, le potager, la tirelire ---- */
const COUL_PERLE=['#ff6b6b','#fcc419','#51cf66','#4dabf7','#cc5de8','#ff922b','#f783ac','#20c997','#ffd43b','#748ffc'];
/* Une perle ronde et brillante : (x, y) = le centre */
function perleE(c,x,y,r,coul,z=1){ if(z<=0) return; r*=Math.min(1.2,z);
  c.fillStyle=coul; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=2; c.stroke();
  c.fillStyle='rgba(255,255,255,.75)'; c.beginPath(); c.arc(x-r*.35,y-r*.38,r*.28,0,7); c.fill(); }
/* Un fil de 10 perles, debout : (x, yBas) = le nœud du bas ; r = le rayon d'une perle ; n perles déjà enfilées (≤ 10) ;
   lueur ajoute un halo doré. Renvoie la hauteur du fil. */
function filDixE(c,x,yBas,r,n=10,z=1,lueur=0,coul=null){ if(z<=0) return 0; const h=r*20+24;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.roundRect(x-r*1.9,yBas-h-r,r*3.8,h+r*2,r*1.9); c.fill(); }
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.beginPath(); c.moveTo(x,yBas+6); c.lineTo(x,yBas-h); c.stroke();
  for(let i=0;i<Math.min(10,n);i++) perleE(c,x,yBas-12-r-i*2*r,r*.94,coul||COUL_PERLE[i],z);
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x,yBas+8,5,0,7); c.arc(x,yBas-h,5,0,7); c.fill(); return h; }
/* La boîte à bijoux : (x, yBas) = le milieu du bas ; w = la largeur ; ouvre (0 → 1) lève le couvercle ; lumiere (0 → 1) la lueur qui sort */
function boiteBijouxE(c,x,yBas,w,ouvre=0,lumiere=0,T=0){ const h=w*.42, x0=x-w/2, y0=yBas-h;
  if(lumiere>0){ const g=c.createRadialGradient(x,y0,0,x,y0,w*.9); g.addColorStop(0,`rgba(255,236,153,${.75*lumiere})`); g.addColorStop(1,'rgba(255,236,153,0)');
    c.fillStyle=g; c.beginPath(); c.arc(x,y0,w*.9,0,7); c.fill();
    c.strokeStyle=`rgba(255,236,153,${.6*lumiere})`; c.lineWidth=6; for(let k=0;k<7;k++){ const a=-Math.PI*(.12+.76*k/6)+.04*Math.sin(T*2+k);
      c.beginPath(); c.moveTo(x+Math.cos(a)*w*.32,y0+Math.sin(a)*w*.12); c.lineTo(x+Math.cos(a)*w*.75,y0+Math.sin(a)*w*.55); c.stroke(); } }
  /* le dedans (velours) */
  c.fillStyle='#5f3dc4'; c.fillRect(x0+10,y0-8,w-20,20);
  /* le corps de la boîte */
  c.fillStyle='#c2255c'; c.strokeStyle='#5c0f2e'; c.lineWidth=5; c.beginPath(); c.roundRect(x0,y0,w,h,14); c.fill(); c.stroke();
  c.strokeStyle='#fcc419'; c.lineWidth=6; c.beginPath(); c.moveTo(x0+12,y0+h*.3); c.lineTo(x0+w-12,y0+h*.3); c.stroke();
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(x,y0+h*.3,13,0,7); c.fill();
  /* le couvercle, qui tourne autour de la charnière arrière (à gauche) */
  c.save(); c.translate(x0,y0); c.rotate(-1.25*douxE(Math.min(1,ouvre)));
  c.fillStyle='#e64980'; c.strokeStyle='#5c0f2e'; c.lineWidth=5; c.beginPath(); c.roundRect(0,-h*.42,w,h*.42,[18,18,4,4]); c.fill(); c.stroke();
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(w/2,-h*.21,15,0,7); c.fill(); c.restore(); }
/* Une salade (laitue) vue de face : (x, yBas) = le sol ; r = le rayon */
function saladeE(c,x,yBas,r,z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z); const y=yBas-r*.8;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,y,r*1.5,0,7); c.fill(); }
  c.fillStyle='#2f9e44'; c.strokeStyle='#1b5e20'; c.lineWidth=2.5;
  for(const [dx,dy,k] of [[-.55,.15,.62],[.55,.15,.62],[0,-.25,.66],[-.3,.3,.6],[.3,.3,.6]]){ c.beginPath(); c.arc(x+dx*r,y+dy*r,r*k,0,7); c.fill(); c.stroke(); }
  c.fillStyle='#8ce99a'; c.beginPath(); c.arc(x,y+r*.1,r*.42,0,7); c.fill(); c.stroke();
  c.strokeStyle='#2f9e44'; c.lineWidth=2; c.beginPath(); c.moveTo(x,y+r*.5); c.lineTo(x,y-r*.25); c.stroke(); }
/* Une rangée de terre du potager : (x0, y) = le début, longueur L */
function rangTerreE(c,x0,y,L,e=26){ c.fillStyle='#6b4a2b'; c.beginPath(); c.roundRect(x0,y-e*.4,L,e,e/2); c.fill(); }
/* Un tissu qui cache (rouge à pois) : (x, y) = le centre ; w × h ; u (0 → 1) le fait s'envoler vers le haut à droite */
function tissuE(c,x,y,w,h,u=0,T=0){ if(u>=1) return; const dx=u*700, dy=-u*500, a=u*.8; c.save(); c.globalAlpha=1-u; c.translate(x+dx,y+dy); c.rotate(a);
  c.fillStyle='#e03131'; c.strokeStyle='#7d1515'; c.lineWidth=5; c.beginPath(); c.moveTo(-w/2,-h/2);
  for(let k=0;k<=8;k++) c.lineTo(-w/2+w*k/8,-h/2+6*Math.sin(k+T*3));
  for(let k=8;k>=0;k--) c.lineTo(-w/2+w*k/8,h/2+8*Math.sin(k*1.3+T*3)); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; for(let i=0;i<5;i++) for(let j=0;j<3;j++){ c.beginPath(); c.arc(-w/2+w*(i+.5)/5,-h/2+h*(j+.5)/3,8,0,7); c.fill(); }
  c.restore(); }
/* La tirelire cochon : (x, yBas) = les pattes ; s = l'échelle ; tremble (0 → 1) la secoue ; ouvre (0 → 1) ouvre la trappe du ventre */
function tirelireE(c,x,yBas,s=1,tremble=0,T=0,ouvre=0){ c.save(); c.translate(x+tremble*9*Math.sin(T*38),yBas); c.rotate(tremble*.06*Math.sin(T*31)); c.scale(s,s);
  c.fillStyle='#f783ac'; c.strokeStyle='#a61e4d'; c.lineWidth=5;
  for(const px of [-70,-30,30,70]){ c.beginPath(); c.roundRect(px-14,-40,28,40,8); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(0,-110,135,95,0,0,7); c.fill(); c.stroke();
  /* les oreilles, le groin, l'œil, la queue en tire-bouchon */
  c.beginPath(); c.moveTo(60,-185); c.lineTo(95,-235); c.lineTo(108,-170); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(20,-198); c.lineTo(40,-245); c.lineTo(68,-190); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#faa2c1'; c.beginPath(); c.ellipse(142,-110,22,32,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#a61e4d'; c.beginPath(); c.arc(140,-120,5,0,7); c.arc(140,-100,5,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(90,-140,8,0,7); c.fill();
  c.strokeStyle='#a61e4d'; c.lineWidth=5; c.beginPath(); c.moveTo(-134,-120); c.bezierCurveTo(-175,-140,-160,-170,-145,-150); c.bezierCurveTo(-130,-130,-170,-115,-180,-135); c.stroke();
  /* la fente sur le dos */
  c.fillStyle='#212529'; c.beginPath(); c.roundRect(-35,-203,70,10,5); c.fill();
  /* la trappe du ventre */
  c.fillStyle=ouvre>0?'#343a40':'#f06595'; c.strokeStyle='#a61e4d'; c.lineWidth=4; c.beginPath(); c.ellipse(-10,-60,36*(1-.15*ouvre),16,0,0,7); c.fill(); c.stroke();
  c.restore(); }
/* Un billet de 10 € : (x, y) = le centre ; w = la largeur ; a = l'angle */
function billetDixE(c,x,y,w=150,z=1,a=0,lueur=0){ if(z<=0) return; w*=Math.min(1.15,z); const h=w*.52; c.save(); c.translate(x,y); c.rotate(a);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.roundRect(-w*.62,-h*.7,w*1.24,h*1.4,16); c.fill(); }
  c.fillStyle='#ffa8a8'; c.strokeStyle='#c92a2a'; c.lineWidth=4; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,8); c.fill(); c.stroke();
  c.strokeStyle='rgba(201,42,42,.45)'; c.lineWidth=3; c.beginPath(); c.arc(w*.3,0,h*.28,0,7); c.stroke();
  ecrire(c,'10 €',-w*.1,2,h*.48,'#a61e1e'); c.restore(); }
/* Une pièce de 1 € : (x, y) = le centre ; r = le rayon */
function pieceUnE(c,x,y,r=30,z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,y,r*1.5,0,7); c.fill(); }
  c.fillStyle='#fcc419'; c.strokeStyle='#e67700'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#ced4da'; c.beginPath(); c.arc(x,y,r*.68,0,7); c.fill(); c.strokeStyle='#868e96'; c.lineWidth=2; c.stroke();
  ecrire(c,'1',x,y+2,r*.95,'#495057'); }
/* Une étagère de bois : (x0, y) = le dessus, longueur L */
function etagereE(c,x0,y,L){ c.fillStyle='#8a5a2b'; c.fillRect(x0,y,L,22); c.fillStyle='#6b3a10'; c.fillRect(x0+30,y+22,16,26); c.fillRect(x0+L-46,y+22,16,26); }

/* ---- Paire 9 (ordinaux) : les cubes de la tour, la pleine lune, le petit train de la fête, l'ourson, les guirlandes ---- */
const COUL_CUBE=['#ff6b6b','#fcc419','#51cf66','#4dabf7','#cc5de8','#ff922b','#20c997','#f783ac','#748ffc','#94d82d'];
/* Un cube de bois peint : (x, yBas) = le milieu du bas ; s = le côté ; lueur ajoute un halo ; a = un petit penché */
function cubeE(c,x,yBas,s,coul,z=1,lueur=0,a=0){ if(z<=0) return; s*=Math.min(1.15,z); c.save(); c.translate(x,yBas); c.rotate(a);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(-s*.75,-s*1.25,s*1.5,s*1.5,s*.3); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=Math.max(2,s*.05); c.beginPath(); c.roundRect(-s/2,-s,s,s,s*.12); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.35)'; c.beginPath(); c.roundRect(-s*.38,-s*.88,s*.3,s*.18,s*.06); c.fill(); c.restore(); }
/* La pleine lune qui sourit : (x, y) = le centre ; allume (0 → 1) la fait briller et sourire */
function pleineLuneE(c,x,y,r,allume=0,T=0){ const g=c.createRadialGradient(x,y,r*.6,x,y,r*(1.6+.5*allume)); g.addColorStop(0,`rgba(255,243,191,${.35+.4*allume})`); g.addColorStop(1,'rgba(255,243,191,0)');
  c.fillStyle=g; c.beginPath(); c.arc(x,y,r*(1.6+.5*allume),0,7); c.fill();
  c.fillStyle=allume>0?'#fff3bf':'#e9ecef'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.fillStyle='rgba(173,181,189,.5)'; for(const [dx,dy,k] of [[-.35,-.3,.16],[.3,.25,.12],[.1,-.45,.09]]){ c.beginPath(); c.arc(x+dx*r,y+dy*r,r*k,0,7); c.fill(); }
  if(allume>0){ c.fillStyle='#495057'; c.beginPath(); c.arc(x-r*.3,y-r*.1,r*.07,0,7); c.arc(x+r*.3,y-r*.1,r*.07,0,7); c.fill();
    c.strokeStyle='#495057'; c.lineWidth=r*.06; c.beginPath(); c.arc(x,y+r*.08,r*.32*allume,.25,Math.PI-.25); c.stroke(); } }
/* Une guirlande de fête : un fil en vagues de x0 à x1 vers y, des ampoules qui clignotent */
function guirlandeE(c,x0,x1,y,T,n=14){ c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath();
  for(let k=0;k<=40;k++){ const x=x0+(x1-x0)*k/40; c.lineTo(x,y+18*Math.sin(k/40*Math.PI*3)); } c.stroke();
  for(let k=0;k<n;k++){ const u=(k+.5)/n, x=x0+(x1-x0)*u, yy=y+18*Math.sin(u*Math.PI*3)+10, b=.5+.5*Math.sin(T*4+k*1.7);
    c.fillStyle=['#ff6b6b','#ffd43b','#69db7c','#74c0fc','#da77f2'][k%5]; c.globalAlpha=.55+.45*b; c.beginPath(); c.arc(x,yy,9,0,7); c.fill(); c.globalAlpha=1; } }
/* La locomotive du petit train, tournée vers la GAUCHE : (x, yBas) = l'avant en bas ; w = la longueur. Renvoie l'arrière (x). */
function locoE(c,x,yBas,w=130,T=0){ const h=w*.62;
  c.fillStyle='#e03131'; c.strokeStyle='#7d1515'; c.lineWidth=4; c.beginPath(); c.roundRect(x,yBas-h*.55,w,h*.55,10); c.fill(); c.stroke();
  c.fillStyle='#1c7ed6'; c.beginPath(); c.roundRect(x+w*.5,yBas-h,w*.5,h*.48,8); c.fill(); c.stroke();
  c.fillStyle='#a5d8ff'; c.fillRect(x+w*.6,yBas-h*.9,w*.3,h*.26);
  c.fillStyle='#343a40'; c.fillRect(x+w*.14,yBas-h*.95,w*.16,h*.42);
  for(let k=0;k<3;k++){ const u=((T*.8+k/3)%1); c.fillStyle=`rgba(241,243,245,${.7*(1-u)})`; c.beginPath(); c.arc(x+w*.22-u*30,yBas-h*.98-u*60,8+u*14,0,7); c.fill(); }
  for(const k of [.22,.72]){ c.fillStyle='#212529'; c.beginPath(); c.arc(x+w*k,yBas,h*.17,0,7); c.fill(); c.fillStyle='#fcc419'; c.beginPath(); c.arc(x+w*k,yBas,h*.07,0,7); c.fill(); }
  c.fillStyle='#fff3bf'; c.beginPath(); c.arc(x+6,yBas-h*.3,7,0,7); c.fill();
  return x+w; }
/* Un wagon ouvert : (x, yBas) = le coin avant en bas ; w = la longueur ; lueur l'éclaire */
function wagonE(c,x,yBas,w,coul,lueur=0,h=w*.62){
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(x-8,yBas-h-12,w+16,h+28,14); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=4; c.beginPath(); c.roundRect(x,yBas-h,w,h*.82,[4,4,10,10]); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(x+6,yBas-h+6,w-12,6);
  c.strokeStyle='#495057'; c.lineWidth=4; c.beginPath(); c.moveTo(x-8,yBas-h*.35); c.lineTo(x,yBas-h*.35); c.stroke();
  for(const k of [.25,.75]){ c.fillStyle='#212529'; c.beginPath(); c.arc(x+w*k,yBas,h*.15,0,7); c.fill(); } }
/* Un ourson qui dépasse d'un wagon : (x, y) = le centre de la tête ; s = l'échelle ; salut (0 → 1) agite la patte */
function oursonE(c,x,y,s=1,salut=0,T=0){ c.save(); c.translate(x,y); c.scale(s,s);
  c.fillStyle='#c08550'; c.strokeStyle='#6b3a10'; c.lineWidth=3;
  for(const dx of [-20,20]){ c.beginPath(); c.arc(dx,-20,10,0,7); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(0,0,24,0,7); c.fill(); c.stroke();
  c.fillStyle='#f1d3b0'; c.beginPath(); c.ellipse(0,8,11,8,0,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(-9,-4,3.5,0,7); c.arc(9,-4,3.5,0,7); c.arc(0,5,4,0,7); c.fill();
  if(salut>0){ const a=-.5+.45*Math.sin(T*10); c.save(); c.translate(26,16); c.rotate(a); c.fillStyle='#c08550'; c.beginPath(); c.ellipse(0,-22*salut,9,14,0,0,7); c.fill(); c.stroke(); c.restore(); }
  c.restore(); }
/* Les rails */
function railsE(c,y,x0=0,x1=1056){ c.fillStyle='#868e96'; c.fillRect(x0,y,x1-x0,7); c.fillStyle='#8a5a2b'; for(let x=x0+10;x<x1;x+=44) c.fillRect(x,y+7,24,10); }
/* Un ordinal dont la fin (« e », « er ») peut grossir : ze = l'échelle de la fin */
function ordinalZE(c,n,x,y,taille,coul=CRAIE.jaune,ze=1,coulFin=null){ const fin=n===1?'er':'e';
  c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(String(n)).width; c.font=`800 ${taille*.5}px "Segoe UI"`; const w2=c.measureText(fin).width;
  const x0=x-(w+w2)/2; ecrire(c,String(n),x0+w/2,y,taille,coul); ecrire(c,fin,x0+w+w2/2,y-taille*.28,taille*.5*ze,coulFin||coul); }
/* Un mot écrit en morceaux de couleurs : parts = [[texte, couleur], …], centré en x */
function motCouleursE(c,parts,x,y,taille){ c.font=`800 ${taille}px "Segoe UI"`; const ws=parts.map(([s])=>c.measureText(s).width), W=ws.reduce((a,b)=>a+b,0);
  let x0=x-W/2; parts.forEach(([s,col],i)=>{ ecrire(c,s,x0,y,taille,col,'left'); x0+=ws[i]; }); }

/* ---- Paire 10 (ranger) : un nombre sur une étiquette sombre, les bateaux à voile, le port, les cerfs-volants, les pots, les cartes ---- */
/* Un nombre (1 ou 2 chiffres) : dizaines orange, unités bleu. zs = l'échelle de chaque chiffre (pour insister). */
function numDUE(c,n,x,y,taille,zs=[1,1]){ const s=String(n); if(s.length===1){ ecrire(c,s,x,y,taille*zs[1],CRAIE.r0); return [x]; } return nombreDUE(c,s,x,y,taille,[CRAIE.r1,CRAIE.r0],zs); }
/* Le nombre sur une plaque sombre arrondie : (x, y) = le centre ; lueur l'entoure d'or */
function plaqueNumE(c,n,x,y,taille,zs=[1,1],lueur=0){ c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(String(n)).width+taille*.5, h=taille*1.15;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.55*lueur})`; c.beginPath(); c.roundRect(x-w/2-12,y-h/2-12,w+24,h+24,h*.4); c.fill(); }
  c.fillStyle='#1f3b2c'; c.strokeStyle='#f8f9fa'; c.lineWidth=Math.max(3,taille*.05); c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,h*.3); c.fill(); c.stroke();
  return numDUE(c,n,x,y+taille*.04,taille,zs); }
/* Un petit voilier : (x, yEau) = le milieu de la coque sur l'eau ; s = l'échelle ; n = le numéro sur la voile ; a = le roulis */
function bateauE(c,x,yEau,s,n,coul,{zs=[1,1],lueur=0,a=0}={}){ c.save(); c.translate(x,yEau); c.rotate(a); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-90,120,140,0,0,7); c.fill(); }
  c.fillStyle='#8a5a2b'; c.fillRect(-4,-205,8,195);
  c.fillStyle='#f8f9fa'; c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.moveTo(8,-200); c.lineTo(96,-30); c.lineTo(8,-30); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-8,-170); c.lineTo(-62,-30); c.lineTo(-8,-30); c.closePath(); c.fill(); c.stroke();
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=4; c.beginPath(); c.moveTo(-100,-22); c.lineTo(100,-22); c.lineTo(72,14); c.lineTo(-72,14); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(4,-205); c.lineTo(36,-196); c.lineTo(4,-187); c.fill();
  plaqueNumE(c,n,40,-88,56,zs); c.restore(); }
/* Le quai de bois du port, de x0 à x1, dessus à y ; les lanternes (allume 0 → 1) */
function quaiE(c,x0,x1,y,allume=0,T=0){ c.fillStyle='#8a5a2b'; c.fillRect(x0,y,x1-x0,26); c.strokeStyle='#5c3d0a'; c.lineWidth=3;
  for(let x=x0;x<x1;x+=60){ c.strokeRect(x,y,60,26); } c.fillStyle='#6b3a10'; for(let x=x0+30;x<x1;x+=180) c.fillRect(x-8,y+26,16,60);
  for(let x=x0+90;x<x1;x+=270){ c.fillStyle='#495057'; c.fillRect(x-4,y-120,8,120);
    if(allume>0){ const g=c.createRadialGradient(x,y-130,0,x,y-130,70); g.addColorStop(0,`rgba(255,212,59,${.7*allume})`); g.addColorStop(1,'rgba(255,212,59,0)'); c.fillStyle=g; c.beginPath(); c.arc(x,y-130,70,0,7); c.fill(); }
    c.fillStyle=allume>0?`rgb(255,${200+30*allume},${80*allume+60})`:'#868e96'; c.strokeStyle='#212529'; c.lineWidth=3; c.beginPath(); c.roundRect(x-14,y-150,28,32,6); c.fill(); c.stroke(); } }
/* Un cerf-volant : (x, y) = le centre ; s = l'échelle ; la ficelle descend vers (fx, fy) ; a = le balancement */
function cerfVolantE(c,x,y,s,n,coul,{fx=null,fy=null,a=0,zs=[1,1],lueur=0}={}){
  if(fx!==null){ c.strokeStyle='rgba(248,249,250,.8)'; c.lineWidth=2.5; c.beginPath(); c.moveTo(x,y+80*s); c.quadraticCurveTo((x+fx)/2+30,(y+fy)/2,fx,fy); c.stroke(); }
  c.save(); c.translate(x,y); c.rotate(a); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(0,0,110,0,7); c.fill(); }
  /* la queue avec ses nœuds */
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.beginPath(); c.moveTo(0,80); for(let k=1;k<=6;k++) c.lineTo(12*Math.sin(k*1.3+a*8),80+k*18); c.stroke();
  for(let k=1;k<=3;k++){ c.fillStyle=['#ffd43b','#ff6b6b','#74c0fc'][k-1]; c.beginPath(); c.arc(12*Math.sin(k*2*1.3+a*8),80+k*36,6,0,7); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=4; c.beginPath(); c.moveTo(0,-90); c.lineTo(66,-10); c.lineTo(0,80); c.lineTo(-66,-10); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(0,0,0,.3)'; c.lineWidth=2; c.beginPath(); c.moveTo(0,-90); c.lineTo(0,80); c.moveTo(-66,-10); c.lineTo(66,-10); c.stroke();
  plaqueNumE(c,n,0,-6,52,zs); c.restore(); }
/* Un pot de confiture : (x, yBas) = le milieu du fond ; w = la largeur ; coul = la confiture ; n = le numéro de l'étiquette */
function potConfitureE(c,x,yBas,w,n,coul,{zs=[1,1],lueur=0}={}){ const h=w*1.2, x0=x-w/2, y0=yBas-h;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(x0-14,y0-34,w+28,h+48,20); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=4; c.beginPath(); c.roundRect(x0,y0,w,h,[10,10,18,18]); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(x0+8,y0+10,10,h-24);
  /* le couvercle en tissu à carreaux */
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(x0-12,y0+6); c.quadraticCurveTo(x,y0-36,x0+w+12,y0+6); c.lineTo(x0+w+6,y0+16); c.lineTo(x0-6,y0+16); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; for(let k=0;k<4;k++){ c.beginPath(); c.arc(x0+w*(k+.5)/4,y0+2,5,0,7); c.fill(); }
  plaqueNumE(c,n,x,y0+h*.56,w*.4,zs); }
/* Une carte à jouer : (x, y) = le centre ; w = la largeur ; a = l'angle ; n = le nombre */
function carteNumE(c,x,y,w,n,{a=0,zs=[1,1],lueur=0,z=1,coul=null,alpha=1}={}){ if(z<=0) return; w*=Math.min(1.15,z); const h=w*1.36; c.save(); c.globalAlpha=alpha; c.translate(x,y); c.rotate(a);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.5*lueur})`; c.beginPath(); c.roundRect(-w/2-16,-h/2-16,w+32,h+32,24); c.fill(); }
  c.fillStyle='#16324f'; c.strokeStyle='#f8f9fa'; c.lineWidth=6; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,16); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,212,59,.6)'; c.lineWidth=3; c.beginPath(); c.roundRect(-w/2+12,-h/2+12,w-24,h-24,10); c.stroke();
  for(const [dx,dy] of [[-1,-1],[1,1]]){ c.fillStyle='#ffd43b'; c.beginPath(); c.arc(dx*(w/2-24),dy*(h/2-24),6,0,7); c.fill(); }
  if(n!==null&&n!=='') (coul?ecrire(c,String(n),0,4,w*.62*zs[0],coul):numDUE(c,n,0,4,w*.5,zs)); else ecrire(c,'?',0,4,w*.45,'rgba(255,212,59,.55)'); c.restore(); }
/* Des coups de vent : des traits blancs qui filent vers la droite */
function ventE(c,T,u=1,W=1056,y0=60,y1=520){ if(u<=0) return; c.strokeStyle=`rgba(248,249,250,${.6*Math.min(1,u)})`; c.lineWidth=5; c.lineCap='round';
  for(let k=0;k<7;k++){ const y=y0+(k*131)%(y1-y0), x=((k*263+T*520)%(W+400))-200;
    c.beginPath(); c.moveTo(x,y); c.bezierCurveTo(x+60,y-14,x+120,y+14,x+180,y); c.stroke();
    c.beginPath(); c.arc(x+180,y-14,14,Math.PI/2,Math.PI*1.9,true); c.stroke(); } }
/* L'herbe du jardin, de y jusqu'en bas */
function herbeE(c,y,W=1056,H=720){ c.fillStyle='#2b8a3e'; c.fillRect(0,y,W,H-y); c.strokeStyle='#51cf66'; c.lineWidth=3;
  for(let x=8;x<W;x+=22){ c.beginPath(); c.moveTo(x,y+4); c.lineTo(x+6,y-14); c.moveTo(x+10,y+4); c.lineTo(x+8,y-8); c.stroke(); } }

/* ---- Paire 11 (les costumes d'un nombre) : le théâtre, le masque, les barres de dix et les cubes, les cadres de dix, les mains derrière le mur ---- */
const COUL_BARRE='#ff922b', COUL_UNITE='#4dabf7';
/* Une barre de dix (dix petits cubes collés, orange), debout : (x, yBas) = le milieu du bas ; s = le côté d'un petit cube */
function barreDixE(c,x,yBas,s,z=1,lueur=0){ if(z<=0) return; const k=Math.min(1.15,z), w=s*k, h=10*s*k;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.5*lueur})`; c.beginPath(); c.roundRect(x-w*.9,yBas-h-w*.4,w*1.8,h+w*.8,w*.5); c.fill(); }
  c.fillStyle=COUL_BARRE; c.strokeStyle='#7a3b00'; c.lineWidth=Math.max(2,w*.08); c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,w*.15); c.fill(); c.stroke();
  c.strokeStyle='rgba(122,59,0,.6)'; c.lineWidth=Math.max(1.5,w*.05); c.beginPath(); for(let i=1;i<10;i++){ c.moveTo(x-w/2,yBas-i*w); c.lineTo(x+w/2,yBas-i*w); } c.stroke();
  c.fillStyle='rgba(255,255,255,.3)'; c.fillRect(x-w*.38,yBas-h+w*.12,w*.18,h-w*.24); }
/* Un petit cube d'unité (bleu) : (x, yBas) = le milieu du bas */
function cubeUniteE(c,x,yBas,s,z=1,lueur=0){ if(z<=0) return; const w=s*Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.5*lueur})`; c.beginPath(); c.arc(x,yBas-w/2,w*.95,0,7); c.fill(); }
  c.fillStyle=COUL_UNITE; c.strokeStyle='#0b4a7a'; c.lineWidth=Math.max(2,w*.08); c.beginPath(); c.roundRect(x-w/2,yBas-w,w,w,w*.15); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(x-w*.32,yBas-w*.85,w*.22,w*.2); }
/* Un « costume » : b barres de dix puis u cubes, posés à partir de x0 ; renvoie {xb:[…], xu:[…], fin} (milieux) */
function costumeE(c,x0,yBas,s,b,u,{zb=()=>1,zu=()=>1,lb=()=>0,lu=()=>0,ligne=10}={}){ const xb=[], xu=[]; let x=x0+s/2;
  for(let i=0;i<b;i++){ xb.push(x); barreDixE(c,x,yBas,s,zb(i),lb(i)); x+=s*1.35; } if(b) x+=s*.5;
  for(let i=0;i<u;i++){ const col=i%ligne, lig=Math.floor(i/ligne); const xx=x+col*s*1.25; xu.push(xx); cubeUniteE(c,xx,yBas-lig*s*1.25,s,zu(i),lu(i)); }
  return {xb,xu,fin:x+Math.min(u,ligne)*s*1.25}; }
/* Le rideau rouge du théâtre : u (0 → 1) l'ouvre ; la scène (plancher) en bas à y */
function rideauE(c,u,y=640,W=1056){ c.fillStyle='#8a5a2b'; c.fillRect(0,y,W,720-y); c.strokeStyle='#5c3d0a'; c.lineWidth=3; for(let x=0;x<W;x+=90){ c.beginPath(); c.moveTo(x,y); c.lineTo(x-40,720); c.stroke(); }
  const L=W/2*(1-.82*douxE(Math.min(1,u)));
  for(const sx of [0,1]){ const x0=sx?W-L:0; c.fillStyle='#c92a2a'; c.fillRect(x0,0,L,y);
    c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=6; for(let k=1;k<6;k++){ c.beginPath(); c.moveTo(x0+L*k/6,0); c.lineTo(x0+L*k/6,y); c.stroke(); } }
  c.fillStyle='#a61e1e'; c.beginPath(); for(let x=0;x<=W;x+=60){ c.moveTo(x,0); c.arc(x+30,0,30,0,Math.PI); } c.fill();
  c.fillStyle='#fcc419'; c.fillRect(0,0,W,10); }
/* Le rond du projecteur sur la scène */
function projecteurE(c,x,y,r,u=1){ if(u<=0) return; const g=c.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,`rgba(255,243,191,${.45*u})`); g.addColorStop(1,'rgba(255,243,191,0)');
  c.fillStyle=g; c.beginPath(); c.ellipse(x,y,r,r*.8,0,0,7); c.fill(); }
/* Un masque de bal (loup) : (x, y) = le centre ; w = la largeur ; coul = la couleur */
function masqueE(c,x,y,w,coul='#be4bdb',a=0){ c.save(); c.translate(x,y); c.rotate(a); const h=w*.42;
  c.fillStyle=coul; c.strokeStyle='#212529'; c.lineWidth=4; c.beginPath(); c.moveTo(-w/2,-h*.3); c.quadraticCurveTo(-w*.25,-h*.8,0,-h*.2); c.quadraticCurveTo(w*.25,-h*.8,w/2,-h*.3);
  c.quadraticCurveTo(w*.45,h*.7,w*.1,h*.5); c.lineTo(0,h*.2); c.lineTo(-w*.1,h*.5); c.quadraticCurveTo(-w*.45,h*.7,-w/2,-h*.3); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.ellipse(sx*w*.22,0,w*.1,h*.2,sx*.2,0,7); c.fill(); }
  c.fillStyle='#ffd43b'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*w*.36,-h*.3,w*.035,0,7); c.fill(); }
  c.strokeStyle='#ffd43b'; c.lineWidth=3; c.beginPath(); c.moveTo(w*.5,-h*.3); c.quadraticCurveTo(w*.62,-h*.9,w*.5,-h*1.4); c.stroke(); c.restore(); }
/* L'ombre d'un danseur masqué : (x, yBas) = les pieds ; s = l'échelle ; u = l'opacité */
function ombreMasqueeE(c,x,yBas,s,u=1,T=0){ if(u<=0) return; c.save(); c.globalAlpha=Math.min(1,u); c.translate(x,yBas); c.scale(s,s); c.rotate(.05*Math.sin(T*2));
  c.fillStyle='#212529'; c.beginPath(); c.moveTo(-70,0); c.quadraticCurveTo(-60,-150,-30,-190); c.lineTo(30,-190); c.quadraticCurveTo(60,-150,70,0); c.closePath(); c.fill();
  c.beginPath(); c.arc(0,-235,48,0,7); c.fill(); masqueE(c,0,-240,110); c.restore(); }
/* Un cadre de dix (2 rangées de 5) : (x0, y0) = le coin haut-gauche ; s = la case ; n jetons (rouges) */
function cadreDixE(c,x0,y0,s,n,z=1,lueur=0){ if(z<=0) return;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(x0-12,y0-12,5*s+24,2*s+24,14); c.fill(); }
  c.fillStyle='#f8f9fa'; c.strokeStyle='#343a40'; c.lineWidth=3; c.fillRect(x0,y0,5*s,2*s); c.beginPath();
  for(let i=0;i<=5;i++){ c.moveTo(x0+i*s,y0); c.lineTo(x0+i*s,y0+2*s); } for(let j=0;j<=2;j++){ c.moveTo(x0,y0+j*s); c.lineTo(x0+5*s,y0+j*s); } c.stroke();
  for(let i=0;i<Math.min(10,n);i++){ const cx=x0+(i%5+.5)*s, cy=y0+(Math.floor(i/5)+.5)*s; c.fillStyle='#e03131'; c.beginPath(); c.arc(cx,cy,s*.36*Math.min(1,z),0,7); c.fill(); c.fillStyle='rgba(255,255,255,.4)'; c.beginPath(); c.arc(cx-s*.1,cy-s*.12,s*.1,0,7); c.fill(); } }
/* Un mur de pierres : de x0 à x1, dessus à y, jusqu'à yb */
function murPierresE(c,x0,x1,y,yb){ c.fillStyle='#868e96'; c.fillRect(x0,y,x1-x0,yb-y); c.strokeStyle='#495057'; c.lineWidth=3;
  const h=46; for(let j=0;y+j*h<yb;j++){ const yy=y+j*h; c.beginPath(); c.moveTo(x0,yy); c.lineTo(x1,yy); c.stroke();
    for(let x=x0+(j%2?45:0);x<x1;x+=90){ c.beginPath(); c.moveTo(x,yy); c.lineTo(x,Math.min(yb,yy+h)); c.stroke(); } }
  c.fillStyle='#adb5bd'; c.fillRect(x0,y-12,x1-x0,14); c.strokeRect(x0,y-12,x1-x0,14); }
/* Une main levée, paume vers nous : (x, yBas) = le poignet ; s = l'échelle ; doigts levés (1 à 5, du pouce vers l'auriculaire) ; manche = la couleur */
function mainLeveeE(c,x,yBas,s,doigts=5,manche='#4dabf7',{droite=true,lueur=0,a=0}={}){ c.save(); c.translate(x,yBas); c.rotate(a); c.scale(droite?s:-s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.5*lueur})`; c.beginPath(); c.ellipse(0,-80,62,95,0,0,7); c.fill(); }
  c.fillStyle=manche; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3; c.beginPath(); c.roundRect(-26,-6,52,46,8); c.fill(); c.stroke();
  const peau='#f1c27d'; c.fillStyle=peau; c.strokeStyle='#a0612b'; c.lineWidth=3;
  /* les quatre doigts (index → auriculaire), puis le pouce sur le côté */
  const D=[[-21,58],[-7,66],[7,62],[20,50]];
  D.forEach(([dx,h],i)=>{ const up=i+2<=doigts, hh=up?h:16; c.beginPath(); c.roundRect(dx-6.5,-58-hh,13,hh+14,6.5); c.fill(); c.stroke(); });
  c.beginPath(); c.roundRect(-28,-62,56,62,[14,14,18,18]); c.fill(); c.stroke();
  c.save(); c.translate(-28,-26); c.rotate(doigts>=1?-.7:-.1); c.beginPath(); c.roundRect(-7,-40,14,44,7); c.fill(); c.stroke(); c.restore();
  c.restore(); }

/* ---- Paire 12 (les défis) : la forêt la nuit, le hibou des devinettes, le coffre au trésor et son cadenas à deux roues ---- */
/* Une branche d'arbre qui part du bord droit : (x0, y) = le bout ; jusqu'à x1 */
function brancheE(c,x0,x1,y){ c.strokeStyle='#5c3d0a'; c.lineCap='round'; c.lineWidth=26; c.beginPath(); c.moveTo(x1,y+10); c.quadraticCurveTo((x0+x1)/2,y-6,x0,y); c.stroke();
  c.lineWidth=10; c.beginPath(); c.moveTo(x0+80,y-2); c.lineTo(x0+40,y-46); c.stroke(); c.fillStyle='#2b8a3e'; c.beginPath(); c.arc(x0+40,y-56,22,0,7); c.fill(); }
/* La forêt la nuit : des sapins sombres */
function foretE(c,yBas=700,W=1056){ for(let k=0;k<9;k++){ const x=40+k*125+(k%2)*30; c.save(); c.globalAlpha=.2; sapinE(c,x,yBas-40,1.5+.3*(k%3)); c.restore(); }
  c.fillStyle='#0b2015'; c.fillRect(0,yBas-30,W,720-yBas+30); }
/* Le hibou des devinettes : (x, y) = les pattes sur la branche ; s = l'échelle ; yeux (0 → 1) les ouvre ; vu (0 → 1) le sort de l'ombre ; non = secoue la tête */
function hibouE(c,x,y,s,{yeux=1,vu=1,non=0,T=0,cligne=true}={}){ c.save(); c.translate(x,y); c.scale(s,s);
  const rg=(r,g,b)=>`rgba(${r},${g},${b},${Math.max(.12,vu)})`, brun=rg(140,90,43), fonce=rg(107,58,16), clair=rg(222,184,135);
  /* le corps, les ailes */
  c.fillStyle=brun; c.beginPath(); c.ellipse(0,-90,72,92,0,0,7); c.fill();
  c.fillStyle=fonce; for(const sx of [-1,1]){ c.beginPath(); c.ellipse(sx*62,-80,24,62,sx*.2,0,7); c.fill(); }
  c.fillStyle=clair; c.beginPath(); c.ellipse(0,-62,46,58,0,0,7); c.fill();
  c.strokeStyle=brun; c.lineWidth=3; for(let i=0;i<3;i++) for(let j=-1;j<=1;j++){ c.beginPath(); c.arc(j*20,-82+i*22,8,.2,Math.PI-.2); c.stroke(); }
  /* la tête qui fait « non » */
  c.save(); c.translate(0,-170); c.rotate(non*.28*Math.sin(T*12));
  c.fillStyle=brun; c.beginPath(); c.ellipse(0,0,70,58,0,0,7); c.fill();
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*40,-44); c.lineTo(sx*62,-88); c.lineTo(sx*66,-30); c.closePath(); c.fill(); }
  /* les grands yeux jaunes */
  const cl=cligne&&((T*.7)%4)<.12?.15:1, o=Math.max(0,Math.min(1,yeux))*cl;
  for(const sx of [-1,1]){ if(o<=0) continue; c.fillStyle='rgba(255,212,59,.25)'; c.beginPath(); c.arc(sx*30,-4,40,0,7); c.fill();
    c.fillStyle='#ffd43b'; c.beginPath(); c.ellipse(sx*30,-4,28,28*o+.5,0,0,7); c.fill();
    if(o>.3){ c.fillStyle='#212529'; c.beginPath(); c.arc(sx*30,-2,13*o,0,7); c.fill(); c.fillStyle='#fff'; c.beginPath(); c.arc(sx*30-4,-7,4,0,7); c.fill(); } }
  c.fillStyle=rg(240,140,0); c.beginPath(); c.moveTo(-9,18); c.lineTo(9,18); c.lineTo(0,36); c.closePath(); c.fill();
  c.restore();
  c.fillStyle=rg(240,140,0); for(const sx of [-1,1]) for(const d of [-8,0,8]){ c.beginPath(); c.arc(sx*22+d,2,5,0,7); c.fill(); }
  c.restore(); }
/* Une croix rouge (« non ») de largeur w centrée en (x, y) ; u (0 → 1) la trace */
function croixE(c,x,y,w,u=1){ if(u<=0) return; c.strokeStyle=CRAIE.faux; c.lineWidth=14; c.lineCap='round'; const v=Math.min(1,u*2), v2=Math.max(0,Math.min(1,u*2-1));
  c.beginPath(); c.moveTo(x-w/2,y-w/2); c.lineTo(x-w/2+w*v,y-w/2+w*v); c.stroke(); if(v2>0){ c.beginPath(); c.moveTo(x+w/2,y-w/2); c.lineTo(x+w/2-w*v2,y-w/2+w*v2); c.stroke(); } }
/* Le coffre au trésor : (x, yBas) = le milieu du bas ; w = la largeur ; ouvre (0 → 1) lève le couvercle ; brille ajoute un halo */
function coffreE(c,x,yBas,w,{ouvre=0,brille=0}={}){ const h=w*.5, x0=x-w/2, y0=yBas-h;
  if(brille>0){ const g=c.createRadialGradient(x,y0,0,x,y0,w*.95); g.addColorStop(0,`rgba(255,236,153,${.6*brille})`); g.addColorStop(1,'rgba(255,236,153,0)'); c.fillStyle=g; c.beginPath(); c.arc(x,y0,w*.95,0,7); c.fill(); }
  if(ouvre>0){ c.fillStyle='#fcc419'; c.beginPath(); c.ellipse(x,y0+4,w*.42,22,0,0,7); c.fill();
    c.fillStyle='#ffe066'; for(let k=0;k<7;k++){ c.beginPath(); c.arc(x0+w*.15+k*w*.12,y0-4-8*Math.sin(k*1.7),16,0,7); c.fill(); } }
  c.fillStyle='#8a5a2b'; c.strokeStyle='#3d2410'; c.lineWidth=5; c.beginPath(); c.roundRect(x0,y0,w,h,10); c.fill(); c.stroke();
  c.strokeStyle='#5c3d0a'; c.lineWidth=3; for(let k=1;k<4;k++){ c.beginPath(); c.moveTo(x0,y0+h*k/4); c.lineTo(x0+w,y0+h*k/4); c.stroke(); }
  c.fillStyle='#fcc419'; for(const k of [.12,.88]) c.fillRect(x0+w*k-12,y0,24,h);
  /* le couvercle bombé, qui pivote vers l'arrière */
  c.save(); c.translate(x0,y0); c.rotate(-1.15*douxE(Math.min(1,ouvre)));
  c.fillStyle='#a0612b'; c.strokeStyle='#3d2410'; c.lineWidth=5; c.beginPath(); c.moveTo(0,0); c.lineTo(0,-h*.35); c.quadraticCurveTo(w/2,-h*1.05,w,-h*.35); c.lineTo(w,0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#fcc419'; for(const k of [.12,.88]){ c.beginPath(); c.moveTo(w*k-12,0); c.lineTo(w*k-12,-h*.62); c.lineTo(w*k+12,-h*.64); c.lineTo(w*k+12,0); c.closePath(); c.fill(); }
  c.restore(); }
/* Le cadenas à deux roues de chiffres : (x, y) = le centre du corps ; s = l'échelle ; r1, r2 = '?' ou un chiffre ;
   tourne1/tourne2 : true pendant que la roue tourne (les chiffres défilent) ; c1, c2 = les couleurs ; ouvert (0 → 1) lève l'anse */
function cadenasE(c,x,y,s,r1,r2,{tourne1=false,tourne2=false,c1=CRAIE.r1,c2=CRAIE.r0,T=0,ouvert=0}={}){ c.save(); c.translate(x,y); c.scale(s,s);
  const lv=34*Math.min(1,ouvert); c.strokeStyle='#adb5bd'; c.lineWidth=16; c.beginPath(); c.moveTo(-58,-50-lv); c.lineTo(-58,-80-lv); c.arc(0,-80-lv,58,Math.PI,0); c.lineTo(58,-50-lv*1.6); c.stroke();
  c.fillStyle='#f59f00'; c.strokeStyle='#7a4a00'; c.lineWidth=5; c.beginPath(); c.roundRect(-95,-60,190,140,22); c.fill(); c.stroke();
  [[-42,r1,tourne1,c1],[42,r2,tourne2,c2]].forEach(([dx,v,t,col],i)=>{ c.fillStyle='#1f3b2c'; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath(); c.roundRect(dx-34,-42,68,96,10); c.fill(); c.stroke();
    c.save(); c.beginPath(); c.rect(dx-34,-42,68,96); c.clip();
    if(t){ const d=Math.floor(T*14+i*3), off=(T*14%1)*96; ecrire(c,String(d%10),dx,6+off,70,CRAIE.blanc); ecrire(c,String((d+1)%10),dx,6+off-96,70,CRAIE.blanc); }
    else ecrire(c,String(v),dx,8,74,v==='?'?CRAIE.jaune:col);
    c.restore(); });
  c.restore(); }
/* Un petit mot sur un papier : (x, y) = le centre ; deux chiffres */
function petitMotE(c,x,y,a,b,z=1,ang=-.08){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(ang); c.scale(Math.min(1.15,z),Math.min(1.15,z));
  c.fillStyle='#fff3bf'; c.strokeStyle='#e67700'; c.lineWidth=3; c.beginPath(); c.moveTo(-110,-70); c.lineTo(110,-74); c.lineTo(104,72); c.lineTo(-104,70); c.closePath(); c.fill(); c.stroke();
  ecrire(c,String(a),-48,4,96,'#1c7ed6'); ecrire(c,'et',0,8,36,'#495057'); ecrire(c,String(b),50,4,96,'#1c7ed6'); c.restore(); }
