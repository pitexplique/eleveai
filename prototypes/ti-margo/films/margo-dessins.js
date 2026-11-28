/* ============================================================
   SOCLE COMMUN des séries Ti Margo « margo-pb-* » : problèmes CP + division CE1 (28/11/2026).
   Relu par margo-pb-cp(.js/-paysage.js) et margo-pb-ce1(.js/-paysage.js), APRÈS cp-entier*.js et idriss-dessins*.js
   (déjà là : formuleE, enfantE, dameE, chatE, poissonE, seauE, panierE, prixE, bulleE, busE, gateauCraie, bougieCraie,
   fraiseCraie, assietteCraie, ecureuilE, noisetteE, neigeE, sapinE, billeE, crayonE, oursonE, hibouE, foretE, herbeE…).
   ⛔ Ce fichier est figé une fois les sessions de classe lancées : un dessin propre à une classe va dans
   margo-dessins-cp.js ou margo-dessins-ce1.js (une seule session écrit dans chacun).
   ============================================================ */

/* La fin des SHORTS : « Entraîne-toi sur eleveai.fr » / « ou sur YouTube @eleveai974 », rien d'autre (comme idriss.js) */
function finShortE(){ const css=document.createElement('style'); css.textContent='#f3,#f6{display:none!important;} #fin #f5{font-size:64px;}';
  document.head.append(css); document.getElementById('f4').innerHTML='<span>ou sur YouTube</span>'; }

/* Le SCHÉMA EN BARRE du coach : le tout en haut, les parts en dessous.
   (x, y) = coin haut gauche ; w = largeur ; h = hauteur d'une case.
   tout : le texte du tout ('12', '?' ou null pour rien) ; parts : [[texte, poids, couleur], …] (texte '?' possible).
   u (0 → 1) fait apparaître la barre de gauche à droite ; qLueur fait briller les « ? ». Renvoie les centres des parts. */
function barreE(c,x,y,w,h,{tout=null,parts=[],u=1,z=1,qLueur=0,taille=null,lw=6}={}){ if(z<=0||u<=0) return [];
  const k=Math.min(1.12,z), T=taille||Math.round(h*.62); c.save(); c.translate(x+w/2,y); c.scale(k,k); c.translate(-w/2,0);
  const W=w*Math.min(1,u), somme=parts.reduce((a,p)=>a+(p[1]||1),0)||1, centres=[];
  /* le tout */
  c.lineWidth=lw; c.strokeStyle=CRAIE.blanc; c.fillStyle='rgba(255,255,255,.08)';
  c.beginPath(); c.roundRect(0,0,W,h,8); c.fill(); c.stroke();
  if(tout!=null&&u>=1){ const q=tout==='?'; if(q&&qLueur>0){ c.fillStyle=`rgba(255,212,59,${.35*qLueur})`; c.beginPath(); c.arc(w/2,h/2,h*.6,0,7); c.fill(); }
    ecrire(c,tout,w/2,h/2+T*.05,T,q?CRAIE.jaune:CRAIE.blanc); }
  /* les parts */
  let xx=0; const y2=h+18;
  parts.forEach(([txt,p,coul],i)=>{ const L=w*(p||1)/somme, x0=xx, x1=Math.min(W,xx+L); xx+=L; if(x1<=x0) return;
    c.fillStyle=coul||'rgba(255,255,255,.12)'; c.strokeStyle=CRAIE.blanc; c.lineWidth=lw;
    c.beginPath(); c.roundRect(x0,y2,x1-x0,h,8); c.fill(); c.stroke();
    const cx=x0+L/2; centres.push([x+w/2+(cx-w/2)*k, y+(y2+h/2)*k]);
    if(txt!=null&&x1>=x0+L-1){ const q=txt==='?'; if(q&&qLueur>0){ c.fillStyle=`rgba(255,212,59,${.35*qLueur})`; c.beginPath(); c.arc(cx,y2+h/2,h*.6,0,7); c.fill(); }
      ecrire(c,txt,cx,y2+h/2+T*.05,T,q?CRAIE.jaune:CRAIE.blanc); } });
  c.restore(); return centres; }

/* Une rangée de n dessins identiques : dessin(c, x, y, i) est appelé pour chacun ; (x, y) = centre du premier, pas = écart.
   t0 / dt : chaque objet apparaît à son tour (zoom) si T est donné. */
function rangeeE(c,n,x,y,pas,dessin,{T=null,t0=0,dt=.25,parLigne=n,pasY=pas}={}){
  for(let i=0;i<n;i++){ const zi=T==null?1:zoom(T,t0+i*dt,.35); if(zi<=0) continue;
    const xi=x+(i%parLigne)*pas, yi=y+Math.floor(i/parLigne)*pasY; dessin(c,xi,yi,i,zi); } }

/* Une étiquette de groupe « 3 », « 4 »… dans un petit rond, sous un groupe (assiette, sac, boîte) */
function rondNombreE(c,txt,x,y,r=38,{z=1,coul=CRAIE.jaune,fond='rgba(33,37,41,.75)'}={}){ if(z<=0) return; const k=Math.min(1.15,z);
  c.save(); c.translate(x,y); c.scale(k,k); c.fillStyle=fond; c.strokeStyle=coul; c.lineWidth=5; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.stroke();
  ecrire(c,txt,0,r*.08,r*1.25,coul); c.restore(); }
