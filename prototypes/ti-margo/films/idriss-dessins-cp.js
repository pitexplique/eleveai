/* Dessins propres à la série monnaie CP avec Idriss (28/11). Relu après idriss-dessins.js par idriss.js et idriss-paysage.js.
   ⛔ Une seule session écrit ici : celle du CP. Les dessins communs (euroE, centimeE…) restent dans idriss-dessins.js. */

/* Un coquillage ROND et doré (une coquille Saint-Jacques), SANS aucun nombre : (x, y) = le centre ; r = le rayon */
function coquilleRondeE(c,x,y,r,{z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(Math.min(1.15,z),Math.min(1.15,z));
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(0,0,r*1.5,0,7); c.fill(); }
  c.fillStyle='#f2c94c'; c.strokeStyle='#b7861a'; c.lineWidth=4;
  c.beginPath(); c.moveTo(-r*.28,r*.78); c.lineTo(-r*.5,r*.98); c.lineTo(r*.5,r*.98); c.lineTo(r*.28,r*.78); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.arc(0,0,r*.92,Math.PI*.82,Math.PI*2.18); c.lineTo(0,r*.82); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(183,134,26,.8)'; c.lineWidth=3;
  for(const u of [-.75,-.45,-.15,.15,.45,.75]){ c.beginPath(); c.moveTo(0,r*.8); c.lineTo(Math.sin(u)*r*.9,-Math.cos(u)*r*.9); c.stroke(); }
  c.fillStyle='rgba(255,255,255,.45)'; c.beginPath(); c.ellipse(-r*.35,-r*.45,r*.14,r*.24,-.5,0,7); c.fill();
  c.restore(); }

/* Une loupe : (x, y) = le centre du verre ; r = le rayon du verre */
function loupeE(c,x,y,r,{z=1}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(Math.min(1.15,z),Math.min(1.15,z));
  c.strokeStyle='#6b3a10'; c.lineWidth=r*.28; c.lineCap='round'; c.beginPath(); c.moveTo(r*.75,r*.75); c.lineTo(r*1.65,r*1.65); c.stroke(); c.lineCap='butt';
  c.fillStyle='rgba(208,235,255,.28)'; c.strokeStyle='#495057'; c.lineWidth=r*.16; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=5; c.beginPath(); c.arc(0,0,r*.72,Math.PI*1.1,Math.PI*1.45); c.stroke();
  c.restore(); }

/* Une vieille boîte à hameçons rouillée : (x, yBas) ; w ; ouvre (0 → 1) soulève le couvercle ; tremble (0 → 1) la secoue */
function boiteHameconsE(c,x,yBas,w,{ouvre=0,tremble=0,T=0}={}){ const h=w*.5; c.save(); c.translate(x+Math.sin(T*40)*8*tremble,yBas); c.rotate(Math.sin(T*33)*.06*tremble);
  c.fillStyle='#a5532a'; c.strokeStyle='#5c2a10'; c.lineWidth=5; c.beginPath(); c.roundRect(-w/2,-h,w,h,10); c.fill(); c.stroke();
  c.fillStyle='rgba(92,42,16,.45)'; for(const [u,v,r] of [[-.3,-.35,14],[.22,-.6,10],[.35,-.25,18],[-.1,-.75,8]]){ c.beginPath(); c.arc(u*w,v*h,r,0,7); c.fill(); }
  c.fillStyle='#ced4da'; c.strokeStyle='#868e96'; c.lineWidth=3; c.beginPath(); c.roundRect(-16,-h*.55,32,20,4); c.fill(); c.stroke();
  c.save(); c.translate(-w/2,-h); c.rotate(-ouvre*1.1); c.fillStyle='#b8612f'; c.strokeStyle='#5c2a10'; c.lineWidth=5;
  c.beginPath(); c.roundRect(0,-h*.32,w,h*.32,8); c.fill(); c.stroke(); c.restore();
  c.restore(); }

/* Un filet de pêche roulé (un gros rouleau vert avec ses mailles et deux flotteurs) : (x, yBas) ; w */
function filetRouleE(c,x,yBas,w,{z=1,lueur=0}={}){ if(z<=0) return; const h=w*.5; c.save(); c.translate(x,yBas-h/2); c.scale(Math.min(1.15,z),Math.min(1.15,z));
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,w*.68,h*.85,0,0,7); c.fill(); }
  c.fillStyle='#2f9e44'; c.strokeStyle='#1b5e20'; c.lineWidth=5; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,h/2); c.fill(); c.stroke();
  c.save(); c.beginPath(); c.roundRect(-w/2,-h/2,w,h,h/2); c.clip(); c.strokeStyle='rgba(235,251,238,.55)'; c.lineWidth=2.5;
  for(let u=-w;u<w;u+=26){ c.beginPath(); c.moveTo(u,-h/2); c.lineTo(u+h,h/2); c.stroke(); c.beginPath(); c.moveTo(u+h,-h/2); c.lineTo(u,h/2); c.stroke(); } c.restore();
  c.fillStyle='#ff922b'; c.strokeStyle='#d9480f'; c.lineWidth=3; for(const u of [-.25,.25]){ c.beginPath(); c.ellipse(u*w,-h/2-6,16,11,0,0,7); c.fill(); c.stroke(); }
  c.restore(); }

/* Une glace en cornet : (x, yBas) = la pointe du cornet ; s (≈ 190 px de haut à s = 1) ; coul = la boule ; moitie = la moitié gauche seulement */
function glaceE(c,x,yBas,s=1,{coul='#ff8fab',z=1,lueur=0,moitie=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); c.scale(s*Math.min(1.15,z),s*Math.min(1.15,z));
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.ellipse(0,-110,90,120,0,0,7); c.fill(); }
  if(moitie){ c.beginPath(); c.rect(-200,-260,200,300); c.clip(); }
  c.fillStyle='#e8a85c'; c.strokeStyle='#a0612a'; c.lineWidth=4; c.beginPath(); c.moveTo(0,0); c.lineTo(-44,-110); c.lineTo(44,-110); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(160,97,42,.7)'; c.lineWidth=2.5; for(const u of [-28,-6,16]){ c.beginPath(); c.moveTo(u,-110); c.lineTo(u+30,-40); c.stroke(); c.beginPath(); c.moveTo(-u,-110); c.lineTo(-u-30,-40); c.stroke(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.25)'; c.lineWidth=3; c.beginPath(); c.arc(0,-140,50,Math.PI*.95,Math.PI*2.05); c.lineTo(48,-112);
  for(let u=48;u>-48;u-=16) c.quadraticCurveTo(u-8,-98,u-16,-112); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.5)'; c.beginPath(); c.ellipse(-18,-160,9,15,-.5,0,7); c.fill();
  if(moitie){ c.strokeStyle='#495057'; c.lineWidth=4; c.setLineDash([8,6]); c.beginPath(); c.moveTo(0,-195); c.lineTo(0,0); c.stroke(); c.setLineDash([]); }
  c.restore(); }

/* Le chariot du marchand de glaces : (x, yBas) ; w ; avec son parasol rayé */
function chariotGlacesE(c,x,yBas,w,T=0){ const h=w*.55; c.save(); c.translate(x,yBas);
  c.strokeStyle='#495057'; c.lineWidth=6; c.beginPath(); c.moveTo(0,-h); c.lineTo(0,-h-w*.75); c.stroke();
  for(let k=0;k<6;k++){ c.fillStyle=k%2?'#fff':'#4dabf7'; c.beginPath(); c.moveTo(0,-h-w*.85); const a0=Math.PI+k*Math.PI/6, a1=a0+Math.PI/6;
    c.lineTo(Math.cos(a0)*w*.62,-h-w*.62+Math.sin(a0)*-w*.0); c.lineTo(Math.cos(a1)*w*.62,-h-w*.62+Math.sin(a1)*-w*.0); c.closePath(); c.fill(); }
  c.strokeStyle='#1971c2'; c.lineWidth=3; c.beginPath(); c.moveTo(-w*.62,-h-w*.62); c.lineTo(0,-h-w*.85); c.lineTo(w*.62,-h-w*.62); c.stroke();
  c.fillStyle='#fff4e6'; c.strokeStyle='#e8590c'; c.lineWidth=5; c.beginPath(); c.roundRect(-w/2,-h,w,h*.82,14); c.fill(); c.stroke();
  c.fillStyle='#ff922b'; c.fillRect(-w/2+4,-h*.52,w-8,h*.14);
  c.fillStyle='#343a40'; for(const u of [-.3,.3]){ c.beginPath(); c.arc(u*w,-h*.12,h*.16,0,7); c.fill(); }
  c.fillStyle='#adb5bd'; for(const u of [-.3,.3]){ c.beginPath(); c.arc(u*w,-h*.12,h*.06,0,7); c.fill(); }
  c.restore(); }

/* Une goutte de sueur (il fait chaud) : (x, y) ; u (0 → 1) la fait glisser */
function goutteE(c,x,y,u=0,r=14){ const yy=y+u*40; c.fillStyle='rgba(116,192,252,.9)'; c.strokeStyle='#1971c2'; c.lineWidth=2.5;
  c.beginPath(); c.moveTo(x,yy-r*1.8); c.quadraticCurveTo(x+r,yy-r*.2,x,yy+r*.2); c.quadraticCurveTo(x-r,yy-r*.2,x,yy-r*1.8); c.closePath(); c.fill(); c.stroke(); }

/* Un tas d'argent : une rangée de pièces et billets centrée sur (x, y) ; vals = [10, 1, 1…] ; t = la taille ;
   opts.lus = un tableau d'instants : la k-ième valeur brille à partir de lus[k] ; renvoie les centres */
function tasE(c,T,vals,x,y,t=40,{z=1,ecart=8,lus=null,lueurDuree=1e9,terne=0,grand=1}={}){
  const lar=v=>v>2?t*4.6*(grand?({5:1,10:1.06,20:1.11,50:1.17}[v]||1):1):(v===2?t*2.24:t*2);
  const L=vals.reduce((a,v)=>a+lar(v),0)+ecart*(vals.length-1); let xx=x-L/2; const pos=[];
  vals.forEach((v,k)=>{ const cx=xx+lar(v)/2; xx+=lar(v)+ecart; pos.push(cx);
    const lu=lus&&T>=lus[k]&&T<lus[k]+lueurDuree?.55+.45*Math.sin(T*5):0;
    euroE(c,v,cx,y,t,{z,lueur:lu,grand,terne}); });
  return pos; }
