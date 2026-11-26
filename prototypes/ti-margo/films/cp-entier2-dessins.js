/* ============================================================
   Les dessins des paires 4 à 6 des nombres entiers CP (26/11/2026), à la craie, pour l'ardoise 1056 × 720.
   Relu par cp-entier2.js (shorts) et cp-entier2-paysage.js (paysages), après cp-entier.js.
   ============================================================ */

/* ---- Paire 4 (comparer) ---- */
/* Un coquillage (Saint-Jacques) : (x, y) = le bas ; r = la demi-largeur ; lueur ajoute un halo */
function coquillageE(c,x,y,r,coul='#ffc9c9',z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,y-r*.5,r*1.5,0,7); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='#c2255c'; c.lineWidth=3.5; c.beginPath(); c.moveTo(x,y);
  c.lineTo(x-r,y-r*.75); c.quadraticCurveTo(x,y-r*1.75,x+r,y-r*.75); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(194,37,92,.6)'; c.lineWidth=2.5; for(const u of [-.6,-.2,.2,.6]){ c.beginPath(); c.moveTo(x,y); c.lineTo(x+u*r,y-r*1.15+Math.abs(u)*r*.3); c.stroke(); }
  c.fillStyle=coul; c.beginPath(); c.moveTo(x-r*.28,y+r*.12); c.lineTo(x+r*.28,y+r*.12); c.lineTo(x+r*.18,y-r*.12); c.lineTo(x-r*.18,y-r*.12); c.closePath(); c.fill(); c.stroke(); }
/* La mer qui ondule (y = la ligne d'eau), de x0 à x1 */
function merE(c,T,y,x0=0,x1=1056){ const vague=x=>y+8*Math.sin(x/60+T*1.6);
  c.fillStyle='#1c7ed6'; c.beginPath(); c.moveTo(x0,vague(x0)); for(let x=x0;x<=x1;x+=12) c.lineTo(x,vague(x)); c.lineTo(x1,y+90); c.lineTo(x0,y+90); c.closePath(); c.fill();
  c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=4; c.beginPath(); for(let x=x0;x<=x1;x+=12) c.lineTo(x,vague(x)); c.stroke(); }
/* Le sable : une bande dorée de y jusqu'en bas */
function sableE(c,y,W=1056,H=720){ c.fillStyle='#e9c46a'; c.fillRect(0,y,W,H-y); c.fillStyle='rgba(255,255,255,.25)'; for(let k=0;k<40;k++){ c.beginPath(); c.arc((k*173)%W,y+12+(k*61)%Math.max(1,H-y-16),3,0,7); c.fill(); } }
/* Une luciole qui brille doucement */
function lucioleE(c,x,y,T,k=0,u=1){ if(u<=0) return; const b=.6+.4*Math.sin(T*3+k*1.7);
  c.fillStyle=`rgba(255,236,153,${.35*b*u})`; c.beginPath(); c.arc(x,y,20,0,7); c.fill();
  c.fillStyle=`rgba(255,224,102,${(.7+.3*b)*u})`; c.beginPath(); c.arc(x,y,8,0,7); c.fill(); }
/* Les places des lucioles dans un bocal (2 colonnes, qui flottent) : décalage depuis le milieu du fond */
const placeLucioleE=(k,w,h,T)=>{ const col=k%2, lig=Math.floor(k/2); return [(col-.5)*w*.42+8*Math.sin(T*1.3+k*2.1), -48-lig*62+7*Math.cos(T*1.1+k)]; };
/* Un bocal de verre : (x, yBas) = le milieu du fond ; w, h ; coul = le couvercle ; n lucioles dedans */
function bocalE(c,x,yBas,w,h,coul,n,T,u=1){ const y0=yBas-h;
  c.fillStyle='rgba(165,216,255,.16)'; c.strokeStyle='#d0ebff'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,y0,w,h,26); c.fill(); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.roundRect(x-w*.42,y0-30,w*.84,34,8); c.fill();
  for(let k=0;k<n;k++){ const [px,py]=placeLucioleE(k,w,h,T); lucioleE(c,x+px,yBas+py,T,k,u); } }
/* Le signe « > » ou « < » en bouche de crocodile : (x, y) = le centre, s = la taille ;
   vers = 'g' (bouche ouverte vers la gauche : « > ») ou 'd' (« < ») ; ouv (0 → 1) ouvre la bouche ; des dents, un œil */
function signeCrocoE(c,x,y,s,vers,ouv=1,coul='#69db7c'){ const d=vers==='g'?1:-1, pt=[x+d*s*.4,y], h=s*.45*Math.max(.12,Math.min(1,ouv));
  const a=[x-d*s*.4,y-h], b=[x-d*s*.4,y+h];
  c.strokeStyle=coul; c.lineWidth=s*.13; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(...a); c.lineTo(...pt); c.lineTo(...b); c.stroke();
  c.fillStyle='#f8f9fa'; for(const [p,sg] of [[a,1],[b,-1]]) for(const u of [.2,.45,.7]){ const qx=p[0]+(pt[0]-p[0])*u, qy=p[1]+(pt[1]-p[1])*u;
    c.beginPath(); c.moveTo(qx-s*.045,qy+sg*s*.06); c.lineTo(qx+s*.045,qy+sg*s*.06); c.lineTo(qx,qy+sg*s*.15); c.closePath(); c.fill(); }
  const ox=x+d*s*.12, oy=y-h*.7-s*.12; c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(ox,oy,s*.075,0,7); c.fill(); c.fillStyle='#212529'; c.beginPath(); c.arc(ox-d*s*.015,oy,s*.038,0,7); c.fill(); }
/* « a  >  b » écrit en grand : les deux nombres et le crocodile entre eux */
function compareE(c,a,b,x,y,taille,vers,ouv=1,ca=CRAIE.blanc,cb=CRAIE.blanc){ ecrire(c,String(a),x-taille*.95,y,taille,ca); ecrire(c,String(b),x+taille*.95,y,taille,cb);
  if(vers==='=') { c.strokeStyle='#69db7c'; c.lineWidth=taille*.11; c.lineCap='round'; for(const v of [-.16,.16]){ c.beginPath(); c.moveTo(x-taille*.3,y+v*taille); c.lineTo(x+taille*.3,y+v*taille); c.stroke(); } }
  else if(vers) signeCrocoE(c,x,y,taille*.8,vers,ouv); }
/* Un écureuil assis : (x, y) = le sol ; coul = le pelage ; vers = 1 regarde à droite, -1 à gauche */
function ecureuilE(c,x,y,s,coul,vers=1,T=0){ c.save(); c.translate(x,y); c.scale(s*vers,s);
  const fonce=coul==='#e8590c'?'#a33a06':'#495057';
  c.fillStyle=coul; c.strokeStyle=fonce; c.lineWidth=4;
  c.beginPath(); c.moveTo(-30,-10); c.bezierCurveTo(-120,-20,-130,-150,-70,-190+4*Math.sin(T*2)); c.bezierCurveTo(-30,-215,-10,-170,-40,-150); c.bezierCurveTo(-70,-120,-60,-60,-20,-40); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(5,-55,38,52,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#fff4e6'; c.beginPath(); c.ellipse(15,-48,20,34,0,0,7); c.fill();
  c.fillStyle=coul; c.beginPath(); c.arc(18,-120,30,0,7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(6,-142); c.lineTo(12,-172); c.lineTo(24,-146); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(30,-124,5,0,7); c.fill(); c.beginPath(); c.arc(47,-114,4,0,7); c.fill();
  c.restore(); }
/* Une noisette : (x, y) = le centre */
function noisetteE(c,x,y,r,z=1,lueur=0){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,y,r*1.6,0,7); c.fill(); }
  c.fillStyle='#b5651d'; c.strokeStyle='#6b3a10'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y+r*.1,r,r*.9,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#e9c46a'; c.beginPath(); c.ellipse(x,y-r*.62,r*.95,r*.36,0,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(x-r*.4,y+r*.05,r*.18,r*.3,-.3,0,7); c.fill(); }
/* La neige douce (toujours les mêmes flocons à l'instant T) */
function neigeE(c,T,W=1056,H=720,n=30){ c.fillStyle='rgba(255,255,255,.85)';
  for(let k=0;k<n;k++){ const x=((k*137+40+20*Math.sin(T+k))%W+W)%W, y=((T*70+k*97)%(H+40))-20; c.beginPath(); c.arc(x,y,3+(k%3)*2,0,7); c.fill(); } }
/* Un sapin enneigé : (x, yBas) = le pied */
function sapinE(c,x,yBas,s=1){ c.fillStyle='#8a5a2b'; c.fillRect(x-12*s,yBas-40*s,24*s,40*s);
  for(const [v,w] of [[-40,90],[-110,72],[-170,52]]){ c.fillStyle='#2b8a3e'; c.beginPath(); c.moveTo(x-w*s,yBas+v*s); c.lineTo(x,yBas+(v-95)*s); c.lineTo(x+w*s,yBas+v*s); c.closePath(); c.fill();
    c.fillStyle='#f8f9fa'; c.beginPath(); c.moveTo(x-w*.5*s,yBas+(v-48)*s); c.lineTo(x,yBas+(v-95)*s); c.lineTo(x+w*.5*s,yBas+(v-48)*s); c.closePath(); c.fill(); } }
/* Un trait en pointillé qui se trace de a vers b (u de 0 à 1) */
function lienE(c,a,b,u,coul=CRAIE.ok){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=coul; c.lineWidth=5; c.setLineDash([10,8]); c.beginPath(); c.moveTo(...a); c.lineTo(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u); c.stroke(); c.setLineDash([]); }
