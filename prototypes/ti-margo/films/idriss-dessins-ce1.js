/* Dessins propres à la série monnaie CE1 avec Idriss (28/11). Relu après idriss-dessins.js par idriss.js et idriss-paysage.js.
   ⛔ Une seule session écrit ici : celle du CE1. Les dessins communs (euroE, centimeE…) restent dans idriss-dessins.js. */

/* Une pièce, en euros (v = 1, 2) ou en centimes (v = '50c'…) : un seul appel pour les rangées mélangées */
function pieceCE1(c,v,x,y,t=40,o={}){ if(typeof v==='string'&&v.endsWith('c')) centimeE(c,+v.slice(0,-1),x,y,t,o); else euroE(c,v,x,y,t,o); }
/* Une somme écrite « 3 € et 20 c » / « 2,50 € » dans un cartouche sombre bien lisible : (x, y) = le centre */
function sommeE(c,txt,x,y,taille=60,{z=1,coul=CRAIE.jaune,fond='rgba(33,37,41,.86)'}={}){ if(z<=0) return; const k=Math.min(1.12,z);
  c.save(); c.translate(x,y); c.scale(k,k); c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(txt).width+taille*.9, h=taille*1.45;
  c.fillStyle=fond; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,taille*.3); c.fill(); ecrire(c,txt,0,2,taille,coul); c.restore(); }
/* Un prix à virgule en trois couleurs : euros en bleu, la virgule GROSSE en blanc, les centimes en orange ; (x, y) = le centre.
   eu = '4', ce = '50' ; suf = ' €' ; lueurV fait clignoter la virgule. Renvoie les centres des 3 morceaux (pour entourer) */
function prixVirguleE(c,eu,ce,x,y,taille=110,{z=1,suf=' €',lueurV=0,tons=['#74c0fc','#ffc078']}={}){ if(z<=0) return null; const k=Math.min(1.12,z);
  c.save(); c.font=`800 ${taille*k}px "Segoe UI"`; const wE=c.measureText(eu).width, wV=taille*k*.42, wC=c.measureText(ce).width, wS=c.measureText(suf).width;
  const L=wE+wV+wC+wS; let x0=x-L/2; c.restore();
  const cE=x0+wE/2, cV=x0+wE+wV/2, cC=x0+wE+wV+wC/2, cS=x0+wE+wV+wC+wS/2;
  ecrire(c,eu,cE,y,taille*k,tons[0]);
  if(lueurV>0){ c.fillStyle=`rgba(255,212,59,${.5*lueurV})`; c.beginPath(); c.arc(cV,y+taille*k*.28,taille*k*.26,0,7); c.fill(); }
  ecrire(c,',',cV,y+taille*k*.05,taille*k*1.25,CRAIE.blanc); ecrire(c,ce,cC,y,taille*k,tons[1]); if(suf) ecrire(c,suf,cS,y,taille*k,CRAIE.blanc);
  return {cE,cV,cC,cS,wC}; }
/* Un rond de craie autour d'un morceau (cx, cy, largeur w) : u (0 → 1) le trace */
function entoureE(c,cx,cy,w,h,u=1,coul=CRAIE.jaune){ if(u<=0) return; c.strokeStyle=coul; c.lineWidth=7; c.lineCap='round';
  c.beginPath(); c.ellipse(cx,cy,w/2+22,h/2+16,-.05,-1.6,-1.6+Math.min(1,u)*6.5); c.stroke(); }

/* Un sac de glace pilée (plastique bleuté, glaçons, buée froide) : (x, yBas) ; w */
function sacGlaceE(c,x,yBas,w=200,{z=1,T=0,lueur=0}={}){ if(z<=0) return; const k=Math.min(1.12,z); w*=k; const h=w*1.1;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(x,yBas-h/2,w*.75,h*.7,0,0,7); c.fill(); }
  c.fillStyle='rgba(208,235,255,.95)'; c.strokeStyle='#4dabf7'; c.lineWidth=5; c.beginPath();
  c.moveTo(x-w*.42,yBas-h*.82); c.quadraticCurveTo(x-w*.55,yBas-h*.2,x-w*.4,yBas); c.lineTo(x+w*.4,yBas); c.quadraticCurveTo(x+w*.55,yBas-h*.2,x+w*.42,yBas-h*.82);
  c.lineTo(x+w*.12,yBas-h*.9); c.lineTo(x,yBas-h); c.lineTo(x-w*.12,yBas-h*.9); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#fff'; c.strokeStyle='#a5d8ff'; c.lineWidth=2;
  for(const [u,v,s] of [[-.22,.25,.16],[.05,.2,.14],[.25,.3,.15],[-.12,.5,.13],[.15,.55,.15],[-.25,.72,.12],[.02,.75,.14],[.24,.75,.12]]){
    c.save(); c.translate(x+u*w,yBas-v*h); c.rotate(u*3); c.beginPath(); c.roundRect(-s*w/2,-s*w/2,s*w,s*w,6); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle='#1c7ed6'; c.beginPath(); c.roundRect(x-w*.3,yBas-h*.62,w*.6,h*.2,8); c.fill(); ecrire(c,'GLACE',x,yBas-h*.52,h*.13,'#fff');
  for(let i=0;i<3;i++){ const u=((T*.6+i/3)%1); c.strokeStyle=`rgba(255,255,255,${.7*(1-u)})`; c.lineWidth=5; c.beginPath();
    const bx=x+(i-1)*w*.28; c.moveTo(bx,yBas-h-8-u*60); c.bezierCurveTo(bx+14,yBas-h-25-u*60,bx-14,yBas-h-40-u*60,bx,yBas-h-55-u*60); c.stroke(); } }
/* Un gobelet de café fumant : (x, yBas) ; s (≈ 150 px de haut à s = 1) */
function cafeE(c,x,yBas,s=1,{z=1,T=0,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const k=s*Math.min(1.12,z); c.scale(k,k);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-70,95,100,0,0,7); c.fill(); }
  c.fillStyle='#fff'; c.strokeStyle='#495057'; c.lineWidth=5; c.beginPath(); c.moveTo(-45,-110); c.lineTo(45,-110); c.lineTo(35,0); c.lineTo(-35,0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#a0522d'; c.beginPath(); c.moveTo(-42,-80); c.lineTo(42,-80); c.lineTo(38,-45); c.lineTo(-38,-45); c.closePath(); c.fill();
  c.strokeStyle='#495057'; c.lineWidth=7; c.beginPath(); c.arc(50,-62,20,-1.3,1.3); c.stroke();
  for(let i=0;i<2;i++){ const u=((T*.5+i/2)%1); c.strokeStyle=`rgba(255,255,255,${.8*(1-u)})`; c.lineWidth=5; c.beginPath();
    const bx=(i?14:-14); c.moveTo(bx,-118-u*40); c.bezierCurveTo(bx+14,-135-u*40,bx-14,-150-u*40,bx,-165-u*40); c.stroke(); }
  c.restore(); }
/* Un pain (baguette) en biais : (x, y) = le centre ; L = la longueur */
function painE(c,x,y,L=260,{z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(-.18); const k=Math.min(1.12,z); c.scale(k,k);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,L*.62,L*.22,0,0,7); c.fill(); }
  c.fillStyle='#e8a849'; c.strokeStyle='#a8641c'; c.lineWidth=5; c.beginPath(); c.ellipse(0,0,L/2,L*.12,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#fff3bf'; c.lineWidth=6; c.lineCap='round'; for(let i=-2;i<=2;i++){ c.beginPath(); c.moveTo(i*L*.17-L*.05,-L*.05); c.lineTo(i*L*.17+L*.05,L*.04); c.stroke(); }
  c.restore(); }
/* Un beignet doré sucré : (x, y) ; r */
function beignetE(c,x,y,r=50,{z=1,lueur=0}={}){ if(z<=0) return; const k=Math.min(1.12,z); r*=k;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(x,y,r*1.45,0,7); c.fill(); }
  c.fillStyle='#e8a849'; c.strokeStyle='#a8641c'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#f4c56b'; c.beginPath(); c.arc(x-r*.2,y-r*.22,r*.55,0,7); c.fill();
  c.fillStyle='#fff'; for(let i=0;i<9;i++){ const a=i*2.4, d=r*(.25+.5*((i*37)%10)/10); c.fillRect(x+Math.cos(a)*d-2,y+Math.sin(a)*d-2,5,5); } }
/* Une lampe suspendue qui éclaire (le soir) : (x, yHaut) = l'accroche ; s */
function lampeE(c,x,yHaut,s=1,{T=0,cone=1}={}){ c.save(); c.translate(x,yHaut); c.scale(s,s);
  if(cone>0){ const g=c.createRadialGradient(0,60,10,0,260,330); g.addColorStop(0,`rgba(255,236,153,${.55*cone})`); g.addColorStop(1,'rgba(255,236,153,0)');
    c.fillStyle=g; c.beginPath(); c.moveTo(-40,60); c.lineTo(40,60); c.lineTo(300,560); c.lineTo(-300,560); c.closePath(); c.fill(); }
  c.strokeStyle='#343a40'; c.lineWidth=4; c.beginPath(); c.moveTo(0,0); c.lineTo(0,30); c.stroke();
  c.fillStyle='#2b8a3e'; c.strokeStyle='#1b4d2a'; c.beginPath(); c.moveTo(-18,30); c.lineTo(18,30); c.lineTo(48,64); c.lineTo(-48,64); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#fff3bf'; c.beginPath(); c.arc(0,66,14+1.5*Math.sin(T*3),0,7); c.fill(); c.restore(); }
/* Un filet de pêche (mailles) tendu entre deux flotteurs : (x, y) = le coin haut gauche ; w, h ; u (0 → 1) le remonte */
function filetE(c,x,y,w,h,{coul='#adb5bd',flot=true}={}){ c.strokeStyle=coul; c.lineWidth=3;
  for(let i=0;i<=8;i++){ const xx=x+w*i/8; c.beginPath(); c.moveTo(xx,y); c.quadraticCurveTo(xx+(i-4)*4,y+h*.6,x+w/2+(xx-x-w/2)*.6,y+h); c.stroke(); }
  for(let j=0;j<=5;j++){ const yy=y+h*j/5, r=1-.4*j/5; c.beginPath(); c.moveTo(x+w/2-w/2*r,yy); c.quadraticCurveTo(x+w/2,yy+10,x+w/2+w/2*r,yy); c.stroke(); }
  if(flot) for(const xx of [x,x+w]){ c.fillStyle='#ff6b6b'; c.beginPath(); c.arc(xx,y,13,0,7); c.fill(); c.strokeStyle='#c92a2a'; c.lineWidth=3; c.stroke(); } }
/* Un porte-monnaie de couleur (rouge, bleu, vieux et mouillé…) : (x, yBas) ; w ; coul, bord ; gouttes = l'eau qui coule */
function porteMonnaieCoulE(c,x,yBas,w=200,{coul='#e03131',bord='#862e1c',ouvre=1,gouttes=0,T=0,lueur=0}={}){ const h=w*.62;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(x,yBas-h/2,w*.7,h*.8,0,0,7); c.fill(); }
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,22); c.fill(); c.stroke();
  c.globalAlpha=.35; c.fillStyle='#fff'; c.beginPath(); c.moveTo(x-w/2+6,yBas-h+10); c.quadraticCurveTo(x,yBas-h-ouvre*h*.5,x+w/2-6,yBas-h+10); c.lineTo(x+w/2-6,yBas-h+24); c.lineTo(x-w/2+6,yBas-h+24); c.closePath(); c.fill(); c.globalAlpha=1;
  c.strokeStyle=bord; c.stroke();
  c.fillStyle='#fcc419'; for(const sx of [-1,1]){ c.beginPath(); c.arc(x+sx*16,yBas-h+4,10,0,7); c.fill(); c.strokeStyle='#e67700'; c.lineWidth=3; c.stroke(); }
  if(gouttes) for(let i=0;i<4;i++){ const u=((T*.8+i*.27)%1); c.fillStyle=`rgba(116,192,252,${1-u})`; c.beginPath(); c.arc(x-w*.35+i*w*.23,yBas+6+u*60,7,0,7); c.fill(); } }
/* Un cornet de glace : (x, yBas) ; s ; coul de la boule */
function cornetE(c,x,yBas,s=1,{z=1,coul='#ffa8a8',lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const k=s*Math.min(1.12,z); c.scale(k,k);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.ellipse(0,-80,80,105,0,0,7); c.fill(); }
  c.fillStyle='#e8a849'; c.strokeStyle='#a8641c'; c.lineWidth=4; c.beginPath(); c.moveTo(-40,-100); c.lineTo(40,-100); c.lineTo(0,0); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-25,-70); c.lineTo(15,-30); c.moveTo(25,-70); c.lineTo(-15,-30); c.stroke();
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.25)'; c.beginPath(); c.arc(0,-125,44,0,7); c.fill(); c.stroke(); c.restore(); }
/* Un ballon de foot : (x, y) ; r */
function ballonFootE(c,x,y,r=60,{z=1}={}){ if(z<=0) return; r*=Math.min(1.12,z);
  c.fillStyle='#fff'; c.strokeStyle='#212529'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; const pent=(cx,cy,rr)=>{ c.beginPath(); for(let i=0;i<5;i++){ const a=-1.57+i*1.2566; c.lineTo(cx+rr*Math.cos(a),cy+rr*Math.sin(a)); } c.closePath(); c.fill(); };
  pent(x,y,r*.32); for(let i=0;i<5;i++){ const a=-1.57+i*1.2566; c.save(); c.beginPath(); c.arc(x,y,r,0,7); c.clip(); pent(x+Math.cos(a)*r*.85,y+Math.sin(a)*r*.85,r*.28); c.restore(); } }
/* La coquille où le crabe se cache (de honte !) : (x, yBas) ; u (0 → 1) le recouvre */
function coquilleCacheE(c,x,yBas,w=220,u=1){ if(u<=0) return; const h=w*.7*Math.min(1,u);
  c.fillStyle='#ffd8a8'; c.strokeStyle='#d9480f'; c.lineWidth=5; c.beginPath(); c.moveTo(x-w/2,yBas); c.quadraticCurveTo(x-w/2,yBas-h*1.25,x,yBas-h*1.3); c.quadraticCurveTo(x+w/2,yBas-h*1.25,x+w/2,yBas); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(217,72,15,.55)'; c.lineWidth=4; for(let i=-2;i<=2;i++){ c.beginPath(); c.moveTo(x+i*w*.1,yBas); c.quadraticCurveTo(x+i*w*.16,yBas-h*.7,x,yBas-h*1.25); c.stroke(); } }
/* Des pièces en rang (liste de valeurs) centrées sur x : renvoie les centres */
function rangPiecesE(c,vals,x,y,t=44,pas=110,o={}){ const x0=x-(vals.length-1)*pas/2, P=[];
  vals.forEach((v,k)=>{ const oo=typeof o==='function'?o(k):o; pieceCE1(c,v,x0+k*pas,y,t,oo); P.push(x0+k*pas); }); return P; }

/* La miniature d'un short CE1 « gabarit A » : tout ce qui compte entre y = 215 et 1700 (la carte YouTube coupe 150 px en haut et en bas) */
function miniCe1E(outils,t,html,dessin=''){ poserMiniature(outils,t,html,dessin); const f=window.tiMargoMiniature;
  window.tiMargoMiniature=()=>{ f(); const {$,legende}=outils;
    legende.style.top='230px'; legende.style.fontSize='88px';
    const e=$('echelle'); if(e) e.style.top='720px';
    for(const d of document.querySelectorAll('body > .cv')){ if(d.textContent==='Dessin animé') d.style.bottom='240px'; else if(d.innerHTML.includes('<svg')) d.style.top='900px'; } }; }
