/* ============================================================
/* ============================================================
   Série Volume 5e (2e poste, 15/11/2026) : les shorts en dessin animé (ceinture blanche). Outils : films/5e-commun.js.
   Épisodes = les slugs des voix (« volume-pave » → manim/voix/5e-volume-pave-short.json) : le patron n'a pas le
   préfixe « volume- ». Chaque film vit dans films/5e-volume-<épisode>.js : ⛔ un dessin propre à un film va dans son fichier.
   Code couleur des paysages (manim/scripts/5e/aire_volume_5e_commun.py) : la base bleue, la hauteur verte, le triangle orange.
   ============================================================ */
const TRIANGLE='#fb923c', TRIANGLE_B='#7c2d12', BASE5='#74c0fc', HAUT5='#8ce99a', PENCHE5='#ff8787';
/* Une ligne de mots centrée en x, chaque morceau paraît à son instant */
function pgLigne(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* Une étiquette posée SUR un dessin : un cartouche couleur ardoise derrière, pour rester lisible sur le bois ou l'orange */
function pgEtiquette(c,s,x,y,fs,coul){ if(fs<=0) return; c.font=`800 ${fs}px "Segoe UI"`; const w=c.measureText(s).width+fs*.5, h=fs*1.15;
  c.fillStyle='rgba(31,59,44,.92)'; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,fs*.25); c.fill(); ecrire(c,s,x,y,fs,coul); }
/* Un polygone plein, zoomé de z autour de son centre (apparition) */
function pgPoly(c,pts,fill,bord,lw=8,z=1){ if(z<=0) return; const k=Math.min(1.2,z);
  const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length, cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;
  c.beginPath(); pts.forEach(([x,y],i)=>{ const X=cx+(x-cx)*k, Y=cy+(y-cy)*k; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath();
  if(fill){ c.fillStyle=fill; c.fill(); } if(bord){ c.strokeStyle=bord; c.lineWidth=lw; c.lineJoin='round'; c.stroke(); } }
/* Un trait tracé de u = 0 à 1 (plein ou pointillé) */
function pgTrait(c,x1,y1,x2,y2,u,coul,lw=8,tirets=null){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round';
  if(tirets) c.setLineDash(tirets); c.beginPath(); c.moveTo(x1,y1); c.lineTo(x1+(x2-x1)*u,y1+(y2-y1)*u); c.stroke(); c.setLineDash([]); }
/* Un pavé en perspective cavalière : (x, y) = le coin bas-gauche de la face avant ; l, p, h en unités, u px par unité ;
   la profondeur part vers le haut-droite (k = 0,5, angle 35°). grille = les cubes-unité dessinés sur les trois faces. */
const PV_DX=.5*Math.cos(.61), PV_DY=-.5*Math.sin(.61);
function pvPave(c,x,y,l,p,h,u,{face='#74c0fc',dessus='#a5d8ff',cote='#4dabf7',bord='#1864ab',lw=5,grille=false,z=1}={}){ if(z<=0) return;
  const k=Math.min(1.15,z), U=u*k, dx=PV_DX*p*U, dy=PV_DY*p*U, W=l*U, H=h*U;
  const X=x+(l*u-W)/2, Y=y-(h*u-H)/2;
  const poly=(pts,f)=>{ c.beginPath(); pts.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b)); c.closePath(); c.fillStyle=f; c.fill(); c.strokeStyle=bord; c.lineWidth=lw; c.lineJoin='round'; c.stroke(); };
  poly([[X,Y],[X+W,Y],[X+W,Y-H],[X,Y-H]],face);
  poly([[X,Y-H],[X+W,Y-H],[X+W+dx,Y-H+dy],[X+dx,Y-H+dy]],dessus);
  poly([[X+W,Y],[X+W+dx,Y+dy],[X+W+dx,Y-H+dy],[X+W,Y-H]],cote);
  if(grille){ c.strokeStyle=bord; c.lineWidth=Math.max(2,lw*.5); c.beginPath();
    for(let i=1;i<l;i++){ c.moveTo(X+i*U,Y); c.lineTo(X+i*U,Y-H); c.lineTo(X+i*U+dx,Y-H+dy); }
    for(let j=1;j<h;j++){ c.moveTo(X,Y-j*U); c.lineTo(X+W,Y-j*U); c.lineTo(X+W+dx,Y-j*U+dy); }
    for(let q=1;q<p;q++){ const ex=PV_DX*q*U, ey=PV_DY*q*U; c.moveTo(X+ex,Y-H+ey); c.lineTo(X+W+ex,Y-H+ey); c.lineTo(X+W+ex,Y+ey); }
    c.stroke(); } }
