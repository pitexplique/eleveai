/* ============================================================
   Série SUITES DE NOMBRES CP : dessins animés en short (cp-suite) ET en paysage (cp-suite-paysage, qui relit ce fichier).
   Notion du coach : suite_nombre (5 micros : compter en avant, à rebours, de 2 en 2 / 5 en 5 / 10 en 10, compléter, défi).
   Même socle que la série « nombres entiers » (films/cp-entier.js, relu ici sans y toucher) : étiquette, sautE, ardoisePaysage…
   26/11/2026, voix validées par Frédéric. ⛔ Enfants de 6-8 ans : des dessins et des NOMBRES ; chaque nombre dit est écrit.
   Les dessins sont pensés pour l'ardoise du short (1056 × 720) ; la paysage les agrandit.
   ============================================================ */
/* Les outils de la série nombres entiers (relus par un <script> en ligne : leurs « const » restent visibles).
   La paysage les a déjà chargés (par cp-entier-paysage.js) : on ne les relit pas une 2e fois. */
if(typeof etiquette!=='function'){ (function(){ const x=new XMLHttpRequest(); x.open('GET','films/cp-entier.js',false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); })(); }

/* L'instant d'une LETTRE dite (« A », « B », « C ») : le mot écrit tel quel, en majuscule (« à » ne compte pas) */
function lettreS(A,clip,L){ const l=((window.CUES||{})[VIDEO]||{})[clip]||[]; const k=l.findIndex(([,w])=>w.trim()===L);
  if(k<0) throw new Error(`${clip} : lettre introuvable « ${L} »`); return {t:A[clip]+l[k][0],apres:A[clip]+(l[k+1]||l[k])[0]}; }

/* Une case de la suite : une carte crème, le nombre au feutre. trou → un « ? » jaune en pointillé.
   (x, y) = le centre ; z (0 → 1) la fait paraître ; lueur l'entoure d'or ; coul = la couleur du nombre */
function caseS(c,s,x,y,w=120,z=1,{trou=false,lueur=0,coul='#343a40',fond='#fff9db',h=w,taille=0}={}){ if(z<=0) return; const k=Math.min(1.2,z), W=w*k, H=h*k;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(x-W/2-16,y-H/2-16,W+32,H+32,26); c.fill(); }
  if(trou){ c.fillStyle='rgba(255,255,255,.06)'; c.strokeStyle=CRAIE.jaune; c.lineWidth=5; c.setLineDash([12,9]); c.beginPath(); c.roundRect(x-W/2,y-H/2,W,H,16); c.fill(); c.stroke(); c.setLineDash([]);
    ecrire(c,'?',x,y+3,H*.62,CRAIE.jaune); return; }
  c.fillStyle=fond; c.strokeStyle='#e9c46a'; c.lineWidth=5; c.beginPath(); c.roundRect(x-W/2,y-H/2,W,H,16); c.fill(); c.stroke();
  const t=taille?taille*k:Math.min(H*.6,W*(s.length>2?.42:.62)); ecrire(c,s,x,y+3,t,coul); }
/* Un nombre à deux chiffres dont on colore les dizaines (le chiffre de gauche) : pour « une nouvelle dizaine » */
function caseDizS(c,s,x,y,w,z=1,u=1,lueur=0){ caseS(c,'',x,y,w,z,{lueur}); if(z<=0) return; const k=Math.min(1.2,z), t=w*.55*k;
  c.font=`800 ${t}px "Segoe UI"`; const w1=c.measureText(s[0]).width, w2=c.measureText(s.slice(1)).width, x0=x-(w1+w2)/2;
  ecrire(c,s[0],x0+w1/2,y+3,t*(1+.25*u),u>0?'#e8590c':'#343a40'); ecrire(c,s.slice(1),x0+w1+w2/2,y+3,t,'#343a40'); }
/* Un saut en arc au-dessus de deux cases, tracé de u = 0 à 1, avec sa flèche et son « +1 » */
function arcS(c,x1,x2,y,txt,u,coul=CRAIE.jaune,h=70){ if(u<=0) return; u=Math.min(1,u); const n=24;
  c.strokeStyle=coul; c.lineWidth=6; c.lineCap='round'; c.beginPath();
  for(let i=0;i<=n*u;i++){ const v=i/n, x=x1+(x2-x1)*v, yy=y-h*Math.sin(Math.PI*v); i?c.lineTo(x,yy):c.moveTo(x,yy); } c.stroke();
  if(u>=1){ const d=Math.sign(x2-x1); c.fillStyle=coul; c.beginPath(); c.moveTo(x2,y+4); c.lineTo(x2-d*22,y-16); c.lineTo(x2+d*6,y-22); c.closePath(); c.fill(); }
  if(u>.5&&txt) ecrire(c,txt,(x1+x2)/2,y-h-30,40,coul); }
/* Un mot barré (une fausse idée) : le texte en rouge, puis un trait qui le barre (u de 0 à 1) */
function barreS(c,txt,x,y,taille,u){ ecrire(c,txt,x,y,taille,CRAIE.faux); if(u<=0) return; c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(txt).width/2+12;
  c.strokeStyle=CRAIE.faux; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(x-w,y+taille*.3); c.lineTo(x-w+2*w*Math.min(1,u),y+taille*.3-taille*.6*Math.min(1,u)); c.stroke(); }

/* ---- AVANT : le livre du soir ---- */
/* Un livre ouvert : (x, y) = le milieu de la reliure (en haut), w = la largeur, h = la hauteur.
   À droite, le numéro de page n (en grand). Tourner (u de 0 à 1) : la page de droite passe à gauche et découvre n2. */
function livreS(c,x,y,w,h,n,{n2=null,u=0,vu2=true,lueur=0}={}){
  const g=x-w/2, d=x+w/2;
  c.fillStyle='#9c4221'; c.beginPath(); c.roundRect(g-14,y-10,w+28,h+24,14); c.fill();          /* la couverture */
  const page=(x0,x1,bombe)=>{ c.fillStyle='#fffdf5'; c.strokeStyle='#d6c7a1'; c.lineWidth=3; c.beginPath(); c.moveTo(x0,y); c.quadraticCurveTo((x0+x1)/2,y-bombe,x1,y); c.lineTo(x1,y+h); c.quadraticCurveTo((x0+x1)/2,y+h-bombe,x0,y+h); c.closePath(); c.fill(); c.stroke(); };
  page(g,x,14); page(x,d,14);
  /* la page de gauche : un petit dessin (la lune, des étoiles) et des lignes d'histoire */
  c.fillStyle='#ffd43b'; c.beginPath(); c.arc(g+w*.16,y+h*.22,h*.09,0,7); c.fill(); c.fillStyle='#fffdf5'; c.beginPath(); c.arc(g+w*.16+h*.05,y+h*.2,h*.08,0,7); c.fill();
  etincelle(c,g+w*.33,y+h*.16,h*.05,'#fab005'); etincelle(c,g+w*.27,y+h*.36,h*.035,'#fab005');
  c.strokeStyle='#ced4da'; c.lineWidth=5; for(let i=0;i<4;i++){ c.beginPath(); c.moveTo(g+w*.06,y+h*(.55+i*.1)); c.lineTo(x-w*(.05+(i===3?.12:0)),y+h*(.55+i*.1)); c.stroke(); }
  /* la page de droite : le numéro */
  const numero=(s,cx,k=1)=>{ if(s===null||s===undefined||s==='') return; if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(cx,y+h*.5,h*.33,0,7); c.fill(); }
    ecrire(c,String(s),cx,y+h*.5,h*.42*k,'#343a40'); };
  if(u<=0) numero(n,x+w/4);
  else if(u>=1) numero(n2,x+w/4);
  else { if(vu2) numero(n2,x+w/4);
    /* la page qui tourne : sa largeur suit cos(π u), d'abord à droite (le recto, n), puis à gauche (le verso, vide) */
    const v=douxE(Math.min(1,u)), l=(w/2)*Math.cos(Math.PI*v);
    if(Math.abs(l)>2){ c.fillStyle=l>0?'#fffdf5':'#f1ead6'; c.strokeStyle='#d6c7a1'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y); c.lineTo(x+l,y-10*Math.sin(Math.PI*v)); c.lineTo(x+l,y+h-10*Math.sin(Math.PI*v)); c.lineTo(x,y+h); c.closePath(); c.fill(); c.stroke();
      if(l>w*.12){ c.save(); c.translate(x+l/2,0); c.scale(l/(w/2),1); ecrire(c,String(n),0,y+h*.5,h*.42,'#343a40'); c.restore(); } } }
  c.strokeStyle='#b08950'; c.lineWidth=4; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+h); c.stroke(); }

/* ---- ARRIÈRE : la fusée ---- */
/* Une fusée : (x, yBas) = le bas des ailerons, s = l'échelle ; feu (0 → 1) la taille des flammes */
function fuseeS(c,x,yBas,s=1,feu=0,T=0){ c.save(); c.translate(x,yBas); c.scale(s,s);
  if(feu>0){ const f=feu*(1+.15*Math.sin(T*23)); c.fillStyle='#ff922b'; c.beginPath(); c.moveTo(-30,0); c.quadraticCurveTo(0,150*f,30,0); c.fill();
    c.fillStyle='#ffe066'; c.beginPath(); c.moveTo(-16,0); c.quadraticCurveTo(0,85*f,16,0); c.fill(); }
  c.fillStyle='#e03131'; c.strokeStyle='#8f1d1d'; c.lineWidth=4;
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*40,-90); c.lineTo(sx*78,4); c.lineTo(sx*36,-14); c.closePath(); c.fill(); c.stroke(); }
  c.fillStyle='#f8f9fa'; c.strokeStyle='#868e96'; c.beginPath(); c.moveTo(-42,-10); c.lineTo(-42,-200); c.quadraticCurveTo(-40,-290,0,-330); c.quadraticCurveTo(40,-290,42,-200); c.lineTo(42,-10); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(-31,-262); c.quadraticCurveTo(-20,-305,0,-330); c.quadraticCurveTo(20,-305,31,-262); c.closePath(); c.fill();
  c.fillStyle='#74c0fc'; c.strokeStyle='#495057'; c.lineWidth=6; c.beginPath(); c.arc(0,-185,22,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.7)'; c.beginPath(); c.arc(-7,-192,7,0,7); c.fill();
  c.fillStyle='#e03131'; c.fillRect(-42,-40,84,14); c.restore(); }
/* La rampe de lancement (une plateforme grise) et des nuages de fumée blanche */
function rampeS(c,x,y,w=260){ c.fillStyle='#868e96'; c.fillRect(x-w/2,y,w,18); c.fillStyle='#495057'; for(const u of [-.4,.4]) c.fillRect(x+u*w-8,y+18,16,60); }
function fumeeS(c,x,y,T,u=1){ if(u<=0) return; for(let k=0;k<7;k++){ const a=(k-3)*.45, r=(26+k%3*12)*Math.min(1,u)*(1+.08*Math.sin(T*4+k));
  c.fillStyle=`rgba(248,249,250,${.75*Math.min(1,u)})`; c.beginPath(); c.arc(x+a*90*Math.min(1,u),y-Math.abs(a)*14,r,0,7); c.fill(); } }

/* ---- PAS : chaussettes, mains, paquets de 10 crayons ---- */
/* Une chaussette rayée : (x, y) = le haut du revers ; s = l'échelle ; sx = 1 (pied à droite) ou -1 */
function chaussetteS(c,x,y,s,coul,sx=1){ c.save(); c.translate(x,y); c.scale(s*sx,s);
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=4; c.beginPath();
  c.moveTo(-22,0); c.lineTo(22,0); c.lineTo(22,80); c.quadraticCurveTo(24,92,40,96); c.lineTo(58,98); c.quadraticCurveTo(76,104,70,122); c.quadraticCurveTo(64,134,40,132);
  c.lineTo(0,130); c.quadraticCurveTo(-24,128,-22,104); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.8)'; c.fillRect(-22,0,44,16); c.fillRect(-22,40,44,9); c.fillRect(-22,62,44,9);
  c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.arc(58,116,13,0,7); c.fill(); c.restore(); }
/* Une paire de chaussettes pendue à la corde, avec ses deux pinces : (x, y) = la corde, au milieu de la paire */
function paireS(c,x,y,s,coul,z=1,lueur=0){ if(z<=0) return; s*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(x,y+68*s,82*s,92*s,0,0,7); c.fill(); }
  chaussetteS(c,x-30*s,y+4*s,s,coul,-1); chaussetteS(c,x+30*s,y+4*s,s,coul,1);
  c.fillStyle='#c08550'; for(const u of [-30,30]) c.fillRect(x+u*s-6*s,y-12*s,12*s,26*s); }
/* La corde à linge entre deux piquets */
function cordeS(c,x1,x2,y){ c.strokeStyle='#c08550'; c.lineWidth=9; for(const x of [x1,x2]){ c.beginPath(); c.moveTo(x,y-20); c.lineTo(x,y+330); c.stroke(); }
  c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath(); c.moveTo(x1,y); c.quadraticCurveTo((x1+x2)/2,y+26,x2,y); c.stroke(); }
const COUL_CH=['#ff6b6b','#4dabf7','#ffd43b','#69db7c','#da77f2','#ff922b'];
/* Une main ouverte, 5 doigts : (x, y) = le milieu de la paume */
function mainS(c,x,y,s=1,z=1,lueur=0){ if(z<=0) return; s*=Math.min(1.2,z); c.save(); c.translate(x,y); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(0,-20,105,0,7); c.fill(); }
  c.fillStyle='#ffd8a8'; c.strokeStyle='#d9480f'; c.lineWidth=4;
  for(const [a,l] of [[-1.05,58],[-.42,82],[0,90],[.42,82],[.85,70]]){ c.save(); c.rotate(a); c.beginPath(); c.roundRect(-13,-40-l,26,l+20,13); c.fill(); c.stroke(); c.restore(); }
  c.beginPath(); c.ellipse(0,0,50,56,0,0,7); c.fill(); c.stroke(); c.fillRect(-28,40,56,40); c.restore(); }
/* Un paquet de 10 crayons de couleur : (x, y) = le milieu de la boîte ; « 10 » écrit sur la boîte */
function paquetS(c,x,y,s=1,z=1,lueur=0,ecrit=true){ if(z<=0) return; s*=Math.min(1.2,z); c.save(); c.translate(x,y); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.roundRect(-96,-150,192,230,30); c.fill(); }
  const C=['#e03131','#f76707','#fab005','#40c057','#12b886','#1c7ed6','#4c6ef5','#ae3ec9','#e64980','#868e96'];
  C.forEach((k,i)=>{ const px=-70+i*15.5, py=-55-(i%2)*12; c.fillStyle=k; c.fillRect(px-6,py-50,13,60); c.fillStyle='#ffe8cc'; c.beginPath(); c.moveTo(px-6,py-50); c.lineTo(px+.5,py-72); c.lineTo(px+7,py-50); c.fill();
    c.fillStyle=k; c.beginPath(); c.moveTo(px-2,py-62); c.lineTo(px+.5,py-72); c.lineTo(px+3,py-62); c.fill(); });
  c.fillStyle='#1971c2'; c.strokeStyle='#0b3d6e'; c.lineWidth=5; c.beginPath(); c.roundRect(-82,-58,164,118,12); c.fill(); c.stroke();
  if(ecrit) ecrire(c,'10',0,4,64,'#fff'); c.restore(); }

/* ---- COMPLÉTER : le train de la fête ---- */
/* La locomotive : (x, yRails) ; fumée qui monte avec T */
function locoS(c,x,y,s=1,T=0){ c.save(); c.translate(x,y); c.scale(s,s);
  for(let k=0;k<3;k++){ const u=((T*.7+k/3)%1); c.fillStyle=`rgba(248,249,250,${.7*(1-u)})`; c.beginPath(); c.arc(-34+u*-40,-200-u*120,18+u*26,0,7); c.fill(); }
  c.fillStyle='#e03131'; c.strokeStyle='#8f1d1d'; c.lineWidth=5; c.beginPath(); c.roundRect(-80,-120,160,90,12); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(10,-180,70,150,10); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.fillRect(-48,-180,30,60);
  c.fillStyle='#ffe066'; c.beginPath(); c.roundRect(24,-165,42,38,8); c.fill();
  c.fillStyle='#ffd43b'; c.beginPath(); c.arc(-80,-75,14,0,7); c.fill();
  for(const u of [-50,0,50]){ c.fillStyle='#343a40'; c.beginPath(); c.arc(u,-24,24,0,7); c.fill(); c.fillStyle='#adb5bd'; c.beginPath(); c.arc(u,-24,8,0,7); c.fill(); }
  c.restore(); }
/* Un wagon et son numéro : (x, yRails) = le milieu du bas ; w = la largeur.
   efface (0 → 1) : la pluie brouille le numéro, il devient un « ? » ; lueur l'entoure d'or ; num2 = le numéro retrouvé (vert) */
function wagonS(c,x,y,w,num,coul,{z=1,efface=0,lueur=0,num2=null,t2=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); c.save(); c.translate(x,y); c.scale(k,k);
  const h=w*.8;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(-w/2-16,-h-40,w+32,h+44,24); c.fill(); }
  c.fillStyle='#868e96'; c.fillRect(-w/2-18,-36,18,8);
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=5; c.beginPath(); c.roundRect(-w/2,-h-24,w,h,12); c.fill(); c.stroke();
  for(const u of [-.3,.3]){ c.fillStyle='#343a40'; c.beginPath(); c.arc(u*w,-22,w*.13,0,7); c.fill(); c.fillStyle='#adb5bd'; c.beginPath(); c.arc(u*w,-22,w*.045,0,7); c.fill(); }
  /* la plaque blanche du numéro */
  const pw=w*.84, ph=h*.74, py=-h*.5-24;
  c.fillStyle='#fff'; c.strokeStyle='#343a40'; c.lineWidth=4; c.beginPath(); c.roundRect(-pw/2,py-ph/2,pw,ph,10); c.fill(); c.stroke();
  if(num2!==null){ ecrire(c,String(num2),0,py+3,ph*.78*zoom(t2,0,.5),'#2b8a3e'); }
  else { const e=Math.min(1,efface);
    if(e<1){ c.globalAlpha=1-e; ecrire(c,String(num),0,py+3,ph*.78,'#343a40'); c.globalAlpha=1; }
    if(e>0){ c.fillStyle=`rgba(165,216,255,${.55*e})`; for(let i=0;i<7;i++){ c.beginPath(); c.ellipse(-pw*.35+i*pw*.12,py-ph*.1+(i%3)*ph*.15,pw*.08,ph*.22,.3,0,7); c.fill(); }
      if(e>=1) ecrire(c,'?',0,py+3,ph*.8,'#f08c00'); } }
  c.restore(); }
/* Les rails sous le train */
function railsS(c,x1,x2,y){ c.strokeStyle='#adb5bd'; c.lineWidth=6; c.beginPath(); c.moveTo(x1,y); c.lineTo(x2,y); c.stroke();
  c.strokeStyle='#8a5a2b'; c.lineWidth=8; for(let x=x1+10;x<x2;x+=46){ c.beginPath(); c.moveTo(x,y+2); c.lineTo(x+18,y+14); c.stroke(); } }
/* Une guirlande de fanions (la fête) */
function fanionsS(c,x1,x2,y,n=10){ c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.beginPath(); c.moveTo(x1,y); c.quadraticCurveTo((x1+x2)/2,y+40,x2,y); c.stroke();
  for(let i=0;i<n;i++){ const u=(i+.5)/n, x=x1+(x2-x1)*u, yy=y+80*u*(1-u); c.fillStyle=COUL_CH[i%COUL_CH.length]; c.beginPath(); c.moveTo(x-16,yy); c.lineTo(x+16,yy); c.lineTo(x,yy+34); c.closePath(); c.fill(); } }

/* ---- DÉFI : la chasse au trésor ---- */
/* Une pierre plate grise qui porte un nombre (trou → un « ? » jaune) */
function pierreS(c,s,x,y,r=60,{z=1,lueur=0,trou=false,coul='#212529',vert=false}={}){ if(z<=0) return; r*=Math.min(1.2,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.ellipse(x,y,r*1.5,r*1.15,0,0,7); c.fill(); }
  c.fillStyle='#868e96'; c.beginPath(); c.ellipse(x,y+r*.18,r*1.12,r*.8,0,0,7); c.fill();
  c.fillStyle=vert?'#b2f2bb':'#ced4da'; c.strokeStyle='#495057'; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,r*1.12,r*.78,0,0,7); c.fill(); c.stroke();
  if(trou) ecrire(c,'?',x,y+2,r*.95,'#f08c00'); else if(s) ecrire(c,s,x,y+2,r*(s.length>1?.78:.9),vert?'#2b8a3e':coul); }
/* Le coffre au trésor : (x, yBas) ; ouvert (0 → 1) soulève le couvercle, l'or brille */
function coffreS(c,x,y,s=1,ouvert=0,T=0){ c.save(); c.translate(x,y); c.scale(s,s);
  if(ouvert>0){ c.fillStyle=`rgba(255,212,59,${.5*ouvert})`; c.beginPath(); c.arc(0,-80,150*ouvert,0,7); c.fill();
    c.fillStyle='#fcc419'; for(let i=0;i<7;i++){ c.beginPath(); c.arc(-60+i*20,-92-(i%2)*10,14,0,7); c.fill(); } }
  c.fillStyle='#a0522d'; c.strokeStyle='#5c2e0e'; c.lineWidth=5; c.beginPath(); c.roundRect(-90,-90,180,90,8); c.fill(); c.stroke();
  c.fillStyle='#fcc419'; c.fillRect(-90,-60,180,12); c.fillRect(-12,-70,24,36);
  c.save(); c.translate(0,-90); c.rotate(-1.1*douxE(Math.min(1,ouvert)));
  c.fillStyle='#b5651d'; c.strokeStyle='#5c2e0e'; c.beginPath(); c.moveTo(-90,0); c.quadraticCurveTo(-90,-60,0,-62); c.quadraticCurveTo(90,-60,90,0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#fcc419'; c.fillRect(-12,-62,24,62); c.restore();
  if(ouvert>.5) for(let k=0;k<4;k++) etincelle(c,-70+k*48,-170-20*Math.sin(T*4+k),14+6*Math.sin(T*6+k));
  c.restore(); }
/* Le chemin de terre (une bande sinueuse) qui relie les pierres */
function cheminS(c,pts,l=90){ c.strokeStyle='#b08950'; c.lineWidth=l; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y)); c.stroke(); }
/* Une puce ronde « 1 », « 2 », « 5 », « 10 » (le pas) */
const puceS=(c,s,x,y,T,t0,coul=CRAIE.jaune,taille=56)=>etiquette(c,s,x,y,T,t0,coul,taille);
/* Une grande flèche (→ en avant, ← à rebours) */
function flecheS(c,x,y,l,sens,coul,u=1){ if(u<=0) return; const d=sens, L=l*Math.min(1,u); c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=16; c.lineCap='round';
  c.beginPath(); c.moveTo(x-d*l/2,y); c.lineTo(x-d*l/2+d*L,y); c.stroke();
  if(u>=1){ c.beginPath(); c.moveTo(x+d*l/2+d*14,y); c.lineTo(x+d*l/2-d*30,y-30); c.lineTo(x+d*l/2-d*30,y+30); c.closePath(); c.fill(); } }

/* Agrandir un dessin autour de (x, y) : k = 0 → rien, 1 → taille normale */
function aGrandS(c,x,y,k,f){ if(k<=0) return; c.save(); c.translate(x,y); c.scale(k,k); c.translate(-x,-y); f(); c.restore(); }
/* Une rangée de cases : liste de [texte, instant, options] aux abscisses xs ; un saut (arc) entre deux cases voisines à l'instant donné */
function rangeeS(c,T,y,w,xs,cases,sauts=[]){ cases.forEach(([s,t,o],k)=>{ if(t!==null&&T>=t) caseS(c,s,xs[k],y,w,zoom(T,t,.5),o||{}); });
  for(const [k,t,txt,coul,sens] of sauts){ if(T<t) continue; const a=xs[k], b=xs[k+(sens||1)];
    arcS(c,a,b,y-w/2-8,txt,entreE(T,t,t+.45),coul||CRAIE.jaune,Math.min(70,w*.55)); } }
/* Une lueur qui pulse entre t0 et t1 (0 ailleurs) */
function pulseS(T,t0,t1=1e9,k=0){ return T>=t0&&T<t1?.6+.4*Math.sin(T*5+k):0; }
/* 26/11, règle de Frédéric (manim/REGLES.md, « La phrase de fin ») : paysage ET short finissent par « Entraîne-toi sur eleveai.fr,
   ou sur YouTube @eleveai974 » : ni pouce, ni abonnement, ni cloche. Notre propre version (ne dépend pas des fichiers cp-entier). */
function finCourteS(paysage=false){ const css=document.createElement('style');
  css.textContent='#f3,#f6{display:none!important;}'+(paysage?' #fin #f5{font-size:64px;}':' #fin .chaine{font-size:62px;}');
  document.head.append(css); document.getElementById('f4').innerHTML='<span>ou sur YouTube</span>'; }
