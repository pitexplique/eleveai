/* ============================================================
   Série Durées CM1 : les shorts en dessin animé (ceinture blanche). Outils : films/cm1-commun.js.
   Chaque film vit dans son fichier, films/cm1-duree-<épisode>.js ; ici, l'horloge, le billet et la frise des bonds, à la craie.
   Code couleur des paysages et du coach (manim/scripts/cp/duree_commun.py) : petite aiguille BLEUE, grande aiguille ROUGE ;
   les bonds de la frise en orange, leur durée en jaune.
   ============================================================ */
const AIG_H='#4dabf7', AIG_M='#ff6b6b', BOND='#ffa94d';

/* L'horloge à la craie : centre (x, y), rayon r, l'heure h et les minutes m (m peut dépasser 60 : l'heure avance avec),
   zoomée de z. La petite aiguille avance avec la grande. */
function horlogeCraie(c,x,y,r,h,m,z=1){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,y); c.scale(k,k);
  c.fillStyle='#16302a'; c.beginPath(); c.arc(0,0,r,0,7); c.fill();
  c.strokeStyle=CRAIE.blanc; c.lineCap='round';
  for(let j=0;j<12;j++){ const a=j/12*2*Math.PI, l=j%3?r*.1:r*.18; c.lineWidth=j%3?3:6;
    c.beginPath(); c.moveTo(Math.sin(a)*(r*.92-l),-Math.cos(a)*(r*.92-l)); c.lineTo(Math.sin(a)*r*.92,-Math.cos(a)*r*.92); c.stroke(); }
  c.lineWidth=7; c.beginPath(); c.arc(0,0,r,0,7); c.stroke();
  c.fillStyle=CRAIE.blanc; c.font=`800 ${Math.round(r*.3)}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle';
  for(const [n,a] of [[12,0],[3,1],[6,2],[9,3]]){ const t=a*Math.PI/2; c.fillText(String(n),Math.sin(t)*r*.62,-Math.cos(t)*r*.62); }
  const tot=h*60+m, am=(tot%60)/60*2*Math.PI, ah=((tot/60)%12)/12*2*Math.PI;
  c.strokeStyle=AIG_H; c.lineWidth=r*.13; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.sin(ah)*r*.48,-Math.cos(ah)*r*.48); c.stroke();
  c.strokeStyle=AIG_M; c.lineWidth=r*.08; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.sin(am)*r*.8,-Math.cos(am)*r*.8); c.stroke();
  c.fillStyle=CRAIE.blanc; c.beginPath(); c.arc(0,0,r*.09,0,7); c.fill(); c.restore(); }

/* Le billet (de cinéma, de bus…) : coin haut-gauche (x, y), w × h, les coins entaillés */
function billetCraie(c,x,y,w,h,coul='#ffe8cc',z=1){ if(z<=0) return; const k=Math.min(1.08,z); c.save(); c.translate(x+w/2,y+h/2); c.scale(k,k);
  const X=-w/2, Y=-h/2, e=18; c.fillStyle=coul; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath();
  c.moveTo(X+e,Y); c.lineTo(X+w-e,Y); c.arc(X+w,Y,e,Math.PI,Math.PI/2,true); c.lineTo(X+w,Y+h-e); c.arc(X+w,Y+h,e,-Math.PI/2,Math.PI,true);
  c.lineTo(X+e,Y+h); c.arc(X,Y+h,e,0,-Math.PI/2,true); c.lineTo(X,Y+e); c.arc(X,Y,e,Math.PI/2,0,true); c.closePath(); c.fill(); c.stroke();
  c.restore(); }

/* La frise : une ligne de x1 à x2 à la hauteur y, des jalons aux abscisses xs (chacun visible si vus[k]) */
function friseCraie(c,x1,x2,y,xs,vus=[],u=1){ if(u<=0) return; c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.lineCap='round';
  c.beginPath(); c.moveTo(x1,y); c.lineTo(x1+(x2-x1)*Math.min(1,u),y); c.stroke();
  xs.forEach((xx,k)=>{ if(vus[k]===false) return; c.lineWidth=7; c.beginPath(); c.moveTo(xx,y-22); c.lineTo(xx,y+22); c.stroke(); }); }
/* Un bond de xa à xb au-dessus de la frise (hauteur h), tracé de u = 0 à 1, avec sa pointe de flèche à l'arrivée */
function bondCraie(c,xa,xb,y,h,u=1,coul=BOND){ if(u<=0) return; u=Math.min(1,u); const mx=(xa+xb)/2, cy=y-2*h, n=40;
  const P=s=>[(1-s)*(1-s)*xa+2*(1-s)*s*mx+s*s*xb,(1-s)*(1-s)*y+2*(1-s)*s*cy+s*s*y];
  c.strokeStyle=coul; c.lineWidth=8; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(xa,y-4);
  for(let i=1;i<=Math.round(n*u);i++){ const [px,py]=P(i/n); c.lineTo(px,py-4); } c.stroke();
  if(u>=1){ const [px,py]=P(.94), a=Math.atan2(y-py,xb-px); c.beginPath();
    c.moveTo(xb-Math.cos(a-.5)*26,y-4-Math.sin(a-.5)*26); c.lineTo(xb,y-4); c.lineTo(xb-Math.cos(a+.5)*26,y-4-Math.sin(a+.5)*26); c.stroke(); } }
