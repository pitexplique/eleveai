/* ============================================================
   Série Longueurs CM1 : les shorts en dessin animé (ceinture blanche). Outils : films/cm1-commun.js.
   Chaque film vit dans son fichier, films/cm1-longueur-<épisode>.js ; ici, la règle, le ruban et le crayon à la craie.
   Code couleur des paysages (longueur_cm1_commun.py) : ruban rose, violet, jaune, vert d'eau ; règle couleur bois.
   ============================================================ */
const RUBAN='#f472b6', RUBAN2='#a78bfa', RUBAN3='#facc15', RUBAN4='#34d399', BOIS='#fde68a', BOIS_B='#b45309', TRAIT_R='#1f2937';

/* La règle à la craie : (x, y) = le coin haut-gauche du ZÉRO (ou du premier nombre), pas = px par cm,
   n = nombre de cm, debut = le premier nombre écrit (règle cassée : debut = 4), z = l'apparition.
   Graduations : grands traits numérotés (cm), traits moyens (demi-cm), petits traits (mm) si mm.
   Renvoie la fonction X(v) = l'abscisse de la graduation v (en cm, dans la numérotation de la règle). */
function regleCraie(c,x,y,n,pas=60,{debut=0,z=1,mm=true,h=86,fs=34,casse=false}={}){
  const X=v=>x+(v-debut)*pas; if(z<=0) return X; const k=Math.min(1.12,z);
  c.save(); c.translate(x,y+h/2); c.scale(k,k); c.translate(-x,-(y+h/2));
  const g=x-18, w=n*pas+36;
  c.fillStyle=BOIS; c.strokeStyle=BOIS_B; c.lineWidth=5; c.beginPath();
  if(casse){ c.moveTo(g,y); c.lineTo(g+w,y); c.lineTo(g+w,y+h); c.lineTo(g,y+h); c.lineTo(g+10,y+h*.7); c.lineTo(g-6,y+h*.45); c.lineTo(g+8,y+h*.2); c.closePath(); }
  else c.roundRect(g,y,w,h,8);
  c.fill(); c.stroke();
  c.strokeStyle=TRAIT_R; c.lineCap='butt';
  const pasMm=mm?10:2;
  for(let i=0;i<=n*pasMm;i++){ const xx=x+i*pas/pasMm, cm=i%pasMm===0, demi=!cm&&(i*2)%pasMm===0;
    c.lineWidth=cm?4:(demi?3:2); c.beginPath(); c.moveTo(xx,y); c.lineTo(xx,y+(cm?h*.42:(demi?h*.3:h*.18))); c.stroke(); }
  c.fillStyle=TRAIT_R; c.font=`800 ${fs}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='alphabetic';
  for(let v=0;v<=n;v++) c.fillText(String(debut+v),x+v*pas,y+h-10);
  c.restore(); return X; }

/* Un ruban (corde, ficelle, piste…) horizontal qui se déroule de gauche à droite : u = 0 → 1 */
function rubanCraie(c,x,y,len,coul=RUBAN,u=1,ep=24){ if(u<=0) return; const l=len*Math.min(1,u);
  c.fillStyle=coul; c.globalAlpha=.92; c.beginPath(); c.roundRect(x,y-ep/2,l,ep,ep/2); c.fill(); c.globalAlpha=1;
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.stroke(); }

/* Un crayon à la craie, couché : (x, y) = le milieu de son bout ARRIÈRE (gauche), len = sa longueur jusqu'à la pointe */
function crayonCraie(c,x,y,len,z=1,coul='#fab005',ep=34){ if(z<=0) return; const k=Math.min(1.12,z), e=ep*k, p=Math.min(len*.18,60);
  c.lineJoin='round'; c.fillStyle='#ff8787'; c.fillRect(x,y-e/2,e*.7,e);
  c.fillStyle=coul; c.fillRect(x+e*.7,y-e/2,len-p-e*.7,e);
  c.fillStyle='#f4d6a0'; c.beginPath(); c.moveTo(x+len-p,y-e/2); c.lineTo(x+len,y); c.lineTo(x+len-p,y+e/2); c.closePath(); c.fill();
  c.fillStyle='#343a40'; c.beginPath(); c.moveTo(x+len-p*.3,y-e*.15); c.lineTo(x+len,y); c.lineTo(x+len-p*.3,y+e*.15); c.closePath(); c.fill();
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.strokeRect(x,y-e/2,len-p,e); }

/* Une flèche horizontale à double pointe entre x1 et x2 (une longueur qu'on montre), u = 0 → 1 */
function flecheLongueur(c,x1,x2,y,coul=CRAIE.jaune,u=1,lw=6){ if(u<=0) return; const m=(x1+x2)/2, d=(x2-x1)/2*Math.min(1,u);
  c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round'; c.beginPath(); c.moveTo(m-d,y); c.lineTo(m+d,y); c.stroke();
  for(const [xx,s] of [[m-d,1],[m+d,-1]]){ c.beginPath(); c.moveTo(xx+s*18,y-14); c.lineTo(xx,y); c.lineTo(xx+s*18,y+14); c.stroke(); } }
