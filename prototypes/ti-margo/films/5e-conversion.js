/* ============================================================
   Série Conversions 5e (2e poste, 15/11/2026) : les shorts en dessin animé (ceinture blanche). Outils : films/5e-commun.js.
   Chaque film vit dans films/5e-conversion-<épisode>.js : ⛔ un dessin propre à un film va dans son fichier.
   ============================================================ */
const BASE5='#74c0fc', HAUT5='#8ce99a', PENCHE5='#ff8787';
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
