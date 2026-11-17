/* ============================================================
   Série Durées CP : les shorts en dessin animé (ceinture blanche). Outils : films/cp-commun.js (série masses, NON modifié).
   Chaque film vit dans son fichier, films/cp-duree-<épisode>.js ; ici, l'horloge, le réveil, le lit, la frise, à la craie.
   Copié de films/cm1-duree.js (17/11), avec les 12 nombres du cadran (au CP on lit le nombre de la petite aiguille).
   Code couleur des paysages et du coach (manim/scripts/cp/duree_commun.py) : petite aiguille BLEUE, grande aiguille ROUGE.
   ⛔ Au CP : heures entières seulement (la grande aiguille sur le 12).
   ============================================================ */
const AIG_H='#4dabf7', AIG_M='#ff6b6b', BOND='#ffa94d';

/* L'horloge à la craie : centre (x, y), rayon r, l'heure h et les minutes m (la petite aiguille avance avec la grande),
   zoomée de z. tous=true : les 12 nombres du cadran (sinon 12, 3, 6, 9). lueur = {h: k, m: k} : une aiguille qui brille (0 à 1). */
function horlogeCraie(c,x,y,r,h,m,z=1,tous=true,lueur={}){ const tot=h*60+m;
  horlogeNum(c,x,y,r,((tot/60)%12),(tot%60)/5,z,lueur,{},tous); }
/* La même horloge, les aiguilles données en « nombres du cadran » : nh pour la petite, nm pour la grande (12 = en haut,
   5 = sur le 5, 4.5 = entre le 4 et le 5) ; vis = {h: 0 à 1, m: 0 à 1} fait pousser une aiguille depuis le centre (défaut 1). */
function horlogeNum(c,x,y,r,nh,nm,z=1,lueur={},vis={},tous=true){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,y); c.scale(k,k);
  c.fillStyle='#16302a'; c.beginPath(); c.arc(0,0,r,0,7); c.fill();
  c.strokeStyle=CRAIE.blanc; c.lineCap='round';
  for(let j=0;j<12;j++){ const a=j/12*2*Math.PI, l=j%3?r*.08:r*.14; c.lineWidth=j%3?3:6;
    c.beginPath(); c.moveTo(Math.sin(a)*(r*.95-l),-Math.cos(a)*(r*.95-l)); c.lineTo(Math.sin(a)*r*.95,-Math.cos(a)*r*.95); c.stroke(); }
  c.lineWidth=7; c.beginPath(); c.arc(0,0,r,0,7); c.stroke();
  c.fillStyle=CRAIE.blanc; c.font=`800 ${Math.round(r*(tous?.22:.3))}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle';
  const nums=tous?[12,1,2,3,4,5,6,7,8,9,10,11]:[12,3,6,9];
  nums.forEach(n=>{ const t=(n%12)/12*2*Math.PI; c.fillText(String(n),Math.sin(t)*r*.7,-Math.cos(t)*r*.7); });
  const am=(nm%12)/12*2*Math.PI, ah=(nh%12)/12*2*Math.PI, vh=vis.h??1, vm=vis.m??1;
  const aiguille=(a,l,lw,coul,lu)=>{ if(lu>0){ c.save(); c.globalAlpha=.45*lu; c.strokeStyle=CRAIE.jaune; c.lineWidth=lw*2.4;
      c.beginPath(); c.moveTo(0,0); c.lineTo(Math.sin(a)*l,-Math.cos(a)*l); c.stroke(); c.restore(); }
    c.strokeStyle=coul; c.lineWidth=lw; c.beginPath(); c.moveTo(0,0); c.lineTo(Math.sin(a)*l,-Math.cos(a)*l); c.stroke(); };
  if(vh>0) aiguille(ah,r*.46*Math.min(1,vh),r*.13,AIG_H,lueur.h||0);
  if(vm>0) aiguille(am,r*.8*Math.min(1,vm),r*.075,AIG_M,lueur.m||0);
  c.fillStyle=CRAIE.blanc; c.beginPath(); c.arc(0,0,r*.09,0,7); c.fill(); c.restore(); }
/* La place du nombre n sur le cadran de l'horloge (x, y, r) : pour l'entourer */
const placeNombre=(x,y,r,n)=>{ const t=(n%12)/12*2*Math.PI; return [x+Math.sin(t)*r*.7,y-Math.cos(t)*r*.7]; };

/* Le réveil : l'horloge, deux cloches et deux pieds ; il tremble quand tremble > 0 */
function reveilCraie(c,x,y,r,h,m,z=1,tremble=0,lueur={},num=null,vis={}){ if(z<=0) return; const dx=tremble?Math.sin(tremble*60)*8:0, k=Math.min(1.12,z);
  c.save(); c.translate(x+dx,y); c.rotate(tremble?Math.sin(tremble*45)*.05:0); c.scale(k,k);
  c.fillStyle='#e03131'; c.strokeStyle=CRAIE.blanc; c.lineWidth=5;
  for(const s of [-1,1]){ c.beginPath(); c.arc(s*r*.62,-r*.92,r*.3,Math.PI,0); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(s*r*.55,r*.85); c.lineTo(s*r*.72,r*1.12); c.stroke(); }
  c.fillStyle='#e03131'; c.beginPath(); c.arc(0,0,r*1.1,0,7); c.fill(); c.stroke();
  c.restore();
  if(num) horlogeNum(c,x+dx,y,r,num[0],num[1],z,lueur,vis); else horlogeCraie(c,x+dx,y,r,h,m,z,true,lueur);
  if(tremble){ c.strokeStyle=CRAIE.jaune; c.lineWidth=6; c.lineCap='round';
    for(const s of [-1,1]) for(let j=0;j<2;j++){ c.beginPath(); c.arc(x,y-r*.2,r*(1.45+j*.25),s>0?-.5:Math.PI-.5,s>0?.5:Math.PI+.5); c.stroke(); } } }

/* Le lit et la couette : coin bas-gauche (x, y), largeur w ; zz = 0 à 1 fait monter des « z » */
function litCraie(c,x,y,w,z=1,zz=0){ if(z<=0) return; const k=Math.min(1.08,z), h=w*.32; c.save(); c.translate(x+w/2,y-h/2); c.scale(k,k); c.translate(-w/2,h/2);
  c.lineCap='round'; c.lineJoin='round'; c.strokeStyle=CRAIE.blanc; c.lineWidth=6;
  c.fillStyle='#8a5a2b'; c.fillRect(0,-h*1.6,w*.08,h*1.6); c.strokeRect(0,-h*1.6,w*.08,h*1.6);
  c.fillRect(w*.92,-h*.9,w*.08,h*.9); c.strokeRect(w*.92,-h*.9,w*.08,h*.9);
  c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(w*.1,-h*.95,w*.22,h*.4,16); c.fill();
  c.fillStyle='#74c0fc'; c.beginPath(); c.roundRect(w*.08,-h*.65,w*.84,h*.5,22); c.fill(); c.stroke();
  c.fillStyle='#d0ebff'; for(let i=0;i<4;i++){ c.beginPath(); c.arc(w*(.3+i*.16),-h*.4,h*.06,0,7); c.fill(); }
  c.restore();
  if(zz>0){ ['z','z','Z'].forEach((s,i)=>{ const u=Math.min(1,Math.max(0,zz*3-i)); if(u<=0) return;
    ecrire(c,s,x+w*.25+i*40,y-h*1.3-i*45-u*10,40+i*14,CRAIE.jaune); }); } }

/* La frise : une ligne de x1 à x2 à la hauteur y, des jalons aux abscisses xs (chacun visible si vus[k]) */
function friseCraie(c,x1,x2,y,xs,vus=[],u=1){ if(u<=0) return; c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.lineCap='round';
  c.beginPath(); c.moveTo(x1,y); c.lineTo(x1+(x2-x1)*Math.min(1,u),y); c.stroke();
  xs.forEach((xx,k)=>{ if(vus[k]===false) return; c.lineWidth=7; c.beginPath(); c.moveTo(xx,y-22); c.lineTo(xx,y+22); c.stroke(); }); }

/* Le soleil (épisode 03) : un disque jaune et 8 rayons ; z = zoom (0 à 1) */
function soleilCraie(c,x,y,r,z=1){ if(z<=0) return; const k=Math.min(1.1,z); c.save(); c.translate(x,y); c.scale(k,k);
  c.strokeStyle='#fcc419'; c.lineWidth=r*.16; c.lineCap='round';
  for(let j=0;j<8;j++){ const a=j/8*2*Math.PI; c.beginPath(); c.moveTo(Math.cos(a)*r*1.3,Math.sin(a)*r*1.3); c.lineTo(Math.cos(a)*r*1.75,Math.sin(a)*r*1.75); c.stroke(); }
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.restore(); }
/* L'école : un bâtiment, son toit, sa porte et son drapeau ; centre bas (x, y), largeur w */
function ecoleCraie(c,x,y,w,z=1){ if(z<=0) return; const k=Math.min(1.1,z), h=w*.55; c.save(); c.translate(x,y); c.scale(k,k);
  c.lineJoin='round'; c.lineCap='round'; c.strokeStyle=CRAIE.blanc; c.lineWidth=6;
  c.fillStyle='#f4a261'; c.fillRect(-w/2,-h,w,h); c.strokeRect(-w/2,-h,w,h);
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(-w/2-14,-h); c.lineTo(0,-h-w*.32); c.lineTo(w/2+14,-h); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#16302a'; c.fillRect(-w*.1,-h*.5,w*.2,h*.5);
  c.fillStyle='#a5d8ff'; for(const s of [-1,1]) c.fillRect(s*w*.3-w*.08,-h*.75,w*.16,h*.22);
  c.beginPath(); c.moveTo(0,-h-w*.32); c.lineTo(0,-h-w*.6); c.stroke();
  c.fillStyle='#4dabf7'; c.fillRect(0,-h-w*.6,w*.18,w*.11); c.restore(); }
