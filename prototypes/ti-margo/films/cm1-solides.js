/* Série Solides et espace CM1 : les shorts en dessin animé. Outils : films/cm1-commun.js, plus ici :
   le moteur 3D des shorts CE2 (films/ce2-solides.js, recopié) : solides en PERSPECTIVE CAVALIÈRE à la craie
   (fuyantes à 45°, coefficient 0,5, faces vues pleines, arêtes cachées en POINTILLÉS), pliage d'un patron
   de cube en 3D ; plus le prisme droit (prisme3), le patron « décalé » et les caisses empilées (caisses).
   Code couleur des paysages (manim/scripts/cm1/solides_cm1_commun.py) : bases violettes, faces latérales
   vertes, arêtes orange, sommets jaunes.
   Chaque film vit dans son fichier : films/cm1-solides-<épisode>.js (prisme, patron, defi). */

const KC=.5, AC=Math.PI/4, VUE=[-KC*Math.cos(AC),-KC*Math.sin(AC),1];
const SFACE='#74c0fc', SARETE='#ff922b', SSOMMET='#ffd43b';
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
/* Projection cavalière : (x à droite, y en haut, z vers le fond) → pixels, e = pixels par unité */
function cav(p,e,ox,oy){ return [ox+(p[0]+KC*p[2]*Math.cos(AC))*e, oy-(p[1]+KC*p[2]*Math.sin(AC))*e]; }
function newell(P){ let n=[0,0,0]; for(let i=0;i<P.length;i++){ const c=cross(P[i],P[(i+1)%P.length]); n=[n[0]+c[0],n[1]+c[1],n[2]+c[2]]; }
  const l=Math.hypot(...n)||1; return n.map(v=>v/l); }
/* Un polyèdre : faces orientées vers l'extérieur, faces vues, arêtes vues ou cachées */
function polyedre(S,F){ const g=S.reduce((a,p)=>[a[0]+p[0]/S.length,a[1]+p[1]/S.length,a[2]+p[2]/S.length],[0,0,0]);
  const faces=F.map(f=>{ let P=f.map(i=>S[i]), n=newell(P); const m=P.reduce((a,p)=>[a[0]+p[0]/P.length,a[1]+p[1]/P.length,a[2]+p[2]/P.length],[0,0,0]);
    if(dot(n,sub(m,g))<0){ f=[...f].reverse(); n=n.map(v=>-v); } return {f,n,vue:dot(n,VUE)<-1e-6}; });
  const A={}; faces.forEach((fa,k)=>fa.f.forEach((a,j)=>{ const b=fa.f[(j+1)%fa.f.length], key=Math.min(a,b)+'-'+Math.max(a,b); (A[key]=A[key]||[]).push(k); }));
  const aretes=Object.entries(A).map(([key,ks])=>{ const [a,b]=key.split('-').map(Number); return {a,b,key,vue:ks.some(k=>faces[k].vue)}; });
  return {S,faces,aretes}; }
const CUBE_S=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
const CUBE_F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
function pave3(L=1,h=1,p=1){ return polyedre(CUBE_S.map(([x,y,z])=>[x*L,y*h,z*p]),CUBE_F); }
function pyramide3(n=4,cote=1,h=1.1,L=null){ let b;
  if(n===4){ const l=L||cote; b=[[0,0,0],[l,0,0],[l,0,cote],[0,0,cote]]; return polyedre([...b,[l/2,h,cote/2]],[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]]); }
  const r=cote/(2*Math.sin(Math.PI/n)), r0=-Math.PI/2-Math.PI/n;
  b=[...Array(n)].map((_,i)=>[r*Math.cos(r0+2*Math.PI*i/n),0,r*Math.sin(r0+2*Math.PI*i/n)]);
  return polyedre([...b,[0,h,0]],[[...Array(n).keys()],...[...Array(n).keys()].map(i=>[i,(i+1)%n,n])]); }
/* Teinte d'une face selon sa normale : le dessus clair, la droite plus sombre */
function teinte(hex,n){ const l=.55*Math.max(0,n[1])-.35*Math.max(0,n[0])+.15*Math.max(0,-n[2]);
  const v=parseInt(hex.slice(1),16), rgb=[v>>16,(v>>8)&255,v&255].map(x=>l>=0?x+(255-x)*Math.min(l,.6):x*(1+Math.max(l,-.6)));
  return 'rgb('+rgb.map(Math.round).join(',')+')'; }
/* Dessine un polyèdre. o = {e, ox, oy, coul, trait, lw, faces:{k:couleur}, aretes:{'a-b':couleur}, alpha} */
function dessinerPoly(c,P,o){ const e=o.e, pr=P.S.map(p=>cav(p,e,o.ox,o.oy)), lw=o.lw||6;
  c.save(); c.lineJoin='round'; c.lineCap='round';
  P.faces.forEach((fa,k)=>{ if(!fa.vue) return; c.globalAlpha=o.alpha??.92; c.fillStyle=teinte((o.faces&&o.faces[k])||o.coul||SFACE,fa.n);
    c.beginPath(); fa.f.forEach((i,j)=>j?c.lineTo(...pr[i]):c.moveTo(...pr[i])); c.closePath(); c.fill(); });
  c.globalAlpha=1;
  P.faces.forEach((fa,k)=>{ if(fa.vue||!(o.faces&&o.faces[k])) return; c.fillStyle=o.faces[k]; c.globalAlpha=.3;
    c.beginPath(); fa.f.forEach((i,j)=>j?c.lineTo(...pr[i]):c.moveTo(...pr[i])); c.closePath(); c.fill(); c.globalAlpha=1; });
  for(const ar of P.aretes){ const col=(o.aretes&&o.aretes[ar.key])||o.trait||'#f8f9fa';
    if(o.cacheesOff&&!ar.vue) continue;
    c.strokeStyle=col; c.lineWidth=(o.aretes&&o.aretes[ar.key])?lw*1.8:(ar.vue?lw:lw*.7); c.setLineDash(ar.vue?[]:[16,12]);
    c.beginPath(); c.moveTo(...pr[ar.a]); c.lineTo(...pr[ar.b]); c.stroke(); }
  c.setLineDash([]); c.restore(); return pr; }
/* Le centre écran d'un polyèdre : ox, oy pour que son dessin soit centré sur (cx, cy) */
function centrer(P,e,cx,cy){ const pr=P.S.map(p=>cav(p,e,0,0)), xs=pr.map(p=>p[0]), ys=pr.map(p=>p[1]);
  return {e,ox:cx-(Math.min(...xs)+Math.max(...xs))/2, oy:cy-(Math.min(...ys)+Math.max(...ys))/2}; }
/* Le cône et le cylindre debout : base en ellipse (devant pleine, derrière en pointillés) */
function ellipseBase(c,x,y,rx,ry,coul,lw=6){ c.strokeStyle=coul; c.lineWidth=lw; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,Math.PI); c.stroke();
  c.setLineDash([14,10]); c.lineWidth=lw*.7; c.beginPath(); c.ellipse(x,y,rx,ry,0,Math.PI,2*Math.PI); c.stroke(); c.setLineDash([]); }
function cone(c,x,y,r,h,coul='#69db7c',{pointe=false,disque=null,trait='#f8f9fa',bas=true}={}){ const ry=r*.32;
  c.fillStyle=coul; c.beginPath(); c.moveTo(x-r,y); c.lineTo(x,y-h); c.lineTo(x+r,y); c.ellipse(x,y,r,ry,0,0,Math.PI); c.fill();
  if(disque){ c.fillStyle=disque; c.globalAlpha=.6; c.beginPath(); c.ellipse(x,y,r,ry,0,0,2*Math.PI); c.fill(); c.globalAlpha=1; }
  c.strokeStyle=trait; c.lineWidth=6; c.lineJoin='round'; c.beginPath(); c.moveTo(x-r,y); c.lineTo(x,y-h); c.lineTo(x+r,y); c.stroke();
  if(bas) ellipseBase(c,x,y,r,ry,trait); if(pointe) rond(c,x,y-h,14,SSOMMET); }
function cylindre(c,x,y,r,h,coul='#4dabf7',{haut=null,bas=null,trait='#f8f9fa'}={}){ const ry=r*.32;
  c.fillStyle=coul; c.beginPath(); c.moveTo(x-r,y); c.lineTo(x-r,y-h); c.ellipse(x,y-h,r,ry,0,Math.PI,0,true); c.lineTo(x+r,y); c.ellipse(x,y,r,ry,0,0,Math.PI); c.fill();
  c.fillStyle=haut||'#a5d8ff'; c.beginPath(); c.ellipse(x,y-h,r,ry,0,0,2*Math.PI); c.fill();
  if(bas){ c.fillStyle=bas; c.globalAlpha=.5; c.beginPath(); c.ellipse(x,y,r,ry,0,0,2*Math.PI); c.fill(); c.globalAlpha=1; }
  c.strokeStyle=trait; c.lineWidth=6; c.beginPath(); c.ellipse(x,y-h,r,ry,0,0,2*Math.PI); c.stroke();
  c.beginPath(); c.moveTo(x-r,y); c.lineTo(x-r,y-h); c.moveTo(x+r,y); c.lineTo(x+r,y-h); c.stroke(); ellipseBase(c,x,y,r,ry,trait); }
function rond(c,x,y,r,coul){ c.fillStyle=coul; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
const entre=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));
const lisse01=u=>u*u*(3-2*u);

/* ---- Le patron de cube qui se plie : cellules (colonne, rangée), parents, angles (degrés), tilt ---- */
const PATRONS={ croix:[{fond:[1,1],g:[0,1],d:[2,1],av:[1,0],ar:[1,2],couv:[1,3]},{fond:null,g:'fond',d:'fond',av:'fond',ar:'fond',couv:'ar'}],
  ligne:[{a:[0,0],fond:[1,0],c:[2,0],d:[3,0],e:[4,0],f:[5,0]},{fond:null,a:'fond',c:'fond',d:'c',e:'d',f:'e'}],
  decale:[{b0:[0,1],fond:[1,1],b2:[2,1],b3:[3,1],haut:[0,2],bas:[3,0]},{fond:null,b0:'fond',b2:'fond',b3:'b2',haut:'b0',bas:'b3'}] };
function rotRod(v,a,th){ const c=Math.cos(th), s=Math.sin(th), axv=cross(a,v), d=dot(a,v);
  return [v[0]*c+axv[0]*s+a[0]*d*(1-c), v[1]*c+axv[1]*s+a[1]*d*(1-c), v[2]*c+axv[2]*s+a[2]*d*(1-c)]; }
/* angles : {nom: degrés}, tilt : −90 = à plat face à nous, 0 = couché sur la table ; sens −1 : plié vers l'arrière */
function plierPatron(nom,angles,tilt=0,sens=1){ const [cel,par]=PATRONS[nom], t=tilt*Math.PI/180;
  const monde=(k,p)=>{ let s=k; while(par[s]){ const pa=par[s], [c1,r1]=cel[s], [c0,r0]=cel[pa];
      const d=[c1-c0,0,r1-r0], ch=[(c0+c1)/2+.5,0,(r0+r1)/2+.5], ax=cross(d,[0,sens,0]);
      const v=rotRod(sub(p,ch),ax,(angles[s]||0)*Math.PI/180); p=[ch[0]+v[0],ch[1]+v[1],ch[2]+v[2]]; s=pa; } return p; };
  const incl=p=>[p[0],p[1]*Math.cos(t)-p[2]*Math.sin(t),p[1]*Math.sin(t)+p[2]*Math.cos(t)];
  return Object.keys(cel).map(k=>{ const [c0,r0]=cel[k], P=[[c0,0,r0],[c0+1,0,r0],[c0+1,0,r0+1],[c0,0,r0+1]].map(p=>incl(monde(k,p)));
    return {nom:k,P,n:newell(P),z:P.reduce((a,p)=>a+p[2],0)/4-.02*P.reduce((a,p)=>a+p[1],0)/4}; }).sort((a,b)=>b.z-a.z); }
/* Dessine les carrés pliés ; ancre = le centre du fond (cellule racine) à l'écran */
function dessinerPatron(c,carres,e,cx,cy,{coul='#e8b04b',couleurs={},caches=[],numeros=null}={}){
  const fond=carres.find(q=>q.nom==='fond'), m=fond.P.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4,a[2]+p[2]/4],[0,0,0]), o=cav(m,e,0,0);
  const ox=cx-o[0], oy=cy-o[1];
  for(const q of carres){ if(caches.includes(q.nom)) continue; const pr=q.P.map(p=>cav(p,e,ox,oy)), n=dot(q.n,VUE)>0?q.n.map(v=>-v):q.n;
    c.fillStyle=teinte(couleurs[q.nom]||coul,n); c.strokeStyle='#7c4a12'; c.lineWidth=6; c.lineJoin='round';
    c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke();
    if(numeros&&numeros[q.nom]){ const g=pr.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4],[0,0]); ecrire(c,numeros[q.nom],g[0],g[1]+18,56,'#3b2a14'); } } }


/* ---- Le prisme droit : base = points 2D (u, v) ; axe 'z' (bases devant / au fond), 'y' (debout), 'x' (couché) ---- */
const BASE_C='#b197fc', LAT_C='#63e6be';
function prisme3(base,p=1.6,axe='z'){ const n=base.length, pose={z:(u,v,w)=>[u,v,w],y:(u,v,w)=>[u,w,v],x:(u,v,w)=>[w,v,u]}[axe];
  const S=[...base.map(([u,v])=>pose(u,v,0)),...base.map(([u,v])=>pose(u,v,p))];
  const F=[[...Array(n).keys()],[...Array(n).keys()].map(i=>n+i),...[...Array(n).keys()].map(i=>[i,(i+1)%n,n+(i+1)%n,n+i])];
  return polyedre(S,F); }
/* La tente : triangle équilatéral de côté a, profondeur p. Sommets 0 bas-gauche, 1 bas-droit, 2 le faîte, 3-5 au fond.
   Faces : 0 l'entrée, 1 le fond, 2 le sol, 3 le toit à droite, 4 le toit à gauche */
function tente3(a=1,p=1.5){ return prisme3([[0,0],[a,0],[a/2,a*Math.sqrt(3)/2]],p); }
/* L'indice de la face d'un polyèdre qui contient tous ces sommets (les faces sont réordonnées par polyedre) */
const faceDe=(P,som)=>P.faces.findIndex(fa=>som.every(i=>fa.f.includes(i)));

/* ---- Des caisses (cubes unité) empilées : pos = [[x,y,z]…], dessinées du fond vers l'avant (opaques) ----
   o = {e, ox, oy} ; couleurs : {'x,y,z': couleur} ; alpha : {'x,y,z': opacité} ; lw : trait */
function caisses(c,pos,o,{coul='#c8843a',couleurs={},alpha={},lw=5}={}){
  const tri=[...pos].sort((a,b)=>(b[2]-a[2])||(a[1]-b[1])||(a[0]-b[0]));
  for(const [x,y,z] of tri){ const k=x+','+y+','+z, col=couleurs[k]||coul, al=alpha[k]??1;
    const Q=(a,b,d)=>cav([x+a,y+b,z+d],o.e,o.ox,o.oy);
    const faces=[[[Q(0,0,0),Q(1,0,0),Q(1,1,0),Q(0,1,0)],[0,0,-1]],[[Q(0,1,0),Q(1,1,0),Q(1,1,1),Q(0,1,1)],[0,1,0]],[[Q(1,0,0),Q(1,0,1),Q(1,1,1),Q(1,1,0)],[1,0,0]]];
    c.save(); c.globalAlpha=al; c.lineJoin='round';
    for(const [pr,n] of faces){ c.fillStyle=teinte(col,n); c.strokeStyle='#4a2c0a'; c.lineWidth=lw;
      c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke(); }
    /* les planches de la caisse : deux traits sur la face de devant */
    c.strokeStyle='rgba(74,44,10,.55)'; c.lineWidth=lw*.6;
    for(const v of [1/3,2/3]){ c.beginPath(); c.moveTo(...Q(.06,v,0)); c.lineTo(...Q(.94,v,0)); c.stroke(); }
    c.restore(); } }
/* Le centre écran (ox, oy) pour que des caisses soient centrées sur (cx, cy) */
function centrerCaisses(pos,e,cx,cy){ const pr=pos.flatMap(([x,y,z])=>[[0,0,0],[1,1,0],[1,1,1],[0,0,1],[1,0,0],[0,1,1]].map(([a,b,d])=>cav([x+a,y+b,z+d],e,0,0)));
  const xs=pr.map(p=>p[0]), ys=pr.map(p=>p[1]); return {e,ox:cx-(Math.min(...xs)+Math.max(...xs))/2, oy:cy-(Math.min(...ys)+Math.max(...ys))/2}; }
