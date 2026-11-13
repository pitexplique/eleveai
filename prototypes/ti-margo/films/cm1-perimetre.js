/* ============================================================
   Série Périmètre CM1 : les shorts en dessin animé (ceinture blanche). Outils : films/cm1-commun.js.
   Chaque film vit dans son fichier, films/cm1-perimetre-<épisode>.js ; ici, les outils des polygones.
   Code couleur des paysages (perimetre_cm1_commun.py) : le tour (périmètre) toujours orange.
   ============================================================ */

/* Un polygone à la craie : pts = [[x,y],…], qui grossit depuis son centre quand z va de 0 à 1 */
function polyCraie(c,pts,z=1,fond='#f783ac',bord='#a61e4d'){ if(z<=0) return; const k=Math.min(1.15,z);
  const cx=pts.reduce((s,p)=>s+p[0],0)/pts.length, cy=pts.reduce((s,p)=>s+p[1],0)/pts.length;
  c.fillStyle=fond; c.strokeStyle=bord; c.lineWidth=6; c.lineJoin='round'; c.beginPath();
  pts.forEach(([x,y],i)=>{ const X=cx+(x-cx)*k, Y=cy+(y-cy)*k; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath(); c.fill(); c.stroke(); }
/* Le tour d'un polygone, tracé de u = 0 à 1 depuis le premier sommet ; perles = des ampoules jaunes sur le tour */
function tourPoly(c,pts,u=1,coul=TOUR,lw=14,perles=false){ if(u<=0) return; u=Math.min(1,u);
  const P=[...pts,pts[0]]; let tot=0; for(let k=1;k<P.length;k++) tot+=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);
  let reste=tot*u; c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(P[0][0],P[0][1]);
  const vus=[]; for(let k=1;k<P.length&&reste>0;k++){ const [ax,ay]=P[k-1],[bx,by]=P[k], l=Math.hypot(bx-ax,by-ay), v=Math.min(1,reste/l);
    c.lineTo(ax+(bx-ax)*v,ay+(by-ay)*v); for(let s=0;s<=v*l;s+=46) vus.push([ax+(bx-ax)*s/l,ay+(by-ay)*s/l]); reste-=l; }
  c.stroke();
  if(perles) vus.forEach(([x,y])=>{ c.fillStyle='#ffe066'; c.beginPath(); c.arc(x,y,lw*.75,0,7); c.fill(); }); }
/* L'étiquette du côté i (du sommet i au sommet i+1), posée dehors, au milieu */
function coteCraie(c,pts,i,s,z=1,coul=CRAIE.jaune,taille=56,ecart=48){ if(z<=0) return;
  const a=pts[i], b=pts[(i+1)%pts.length], cx=pts.reduce((t,p)=>t+p[0],0)/pts.length, cy=pts.reduce((t,p)=>t+p[1],0)/pts.length;
  const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2, n=Math.hypot(mx-cx,my-cy)||1;
  ecrire(c,s,mx+(mx-cx)/n*ecart,my+(my-cy)/n*ecart,taille*z,coul); }
/* Un polygone réduit d'un facteur k autour de son centre */
function reduire(pts,k){ const cx=pts.reduce((s,p)=>s+p[0],0)/pts.length, cy=pts.reduce((s,p)=>s+p[1],0)/pts.length;
  return pts.map(([x,y])=>[cx+(x-cx)*k,cy+(y-cy)*k]); }
