/* ============================================================
   Série IDRISS LE PÊCHEUR (27/11/2026) : les dessins communs aux 6 paires (CP → CE2).
   Idriss est le copain pêcheur de Ti Margo (un vrai copain de Frédéric). Aucun lieu nommé : un port, la mer, des mouettes.
   Chargé par films/idriss.js (shorts) et films/idriss-paysage.js (paysages), après cp-entier*.js et cp-entier2/3-dessins.js.
   ============================================================ */

/* Idriss debout : (x, yBas) = entre les bottes ; s = l'échelle (≈ 300 px de haut à s = 1).
   salut (0 → 1) lève le bras droit et l'agite ; montre (0 → 1) tend le bras gauche ; T anime le salut. */
function idrissE(c,x,yBas,s=1,{salut=0,montre=0,T=0,lueur=0}={}){ c.save(); c.translate(x,yBas); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.32*lueur})`; c.beginPath(); c.ellipse(0,-150,120,170,0,0,7); c.fill(); }
  const CIRE='#fcc419', CIRE_B='#e67700', PEAU='#b9774a', PEAU_B='#7a4a2a';
  /* les bottes et le pantalon */
  c.fillStyle='#343a40'; c.beginPath(); c.roundRect(-38,-24,32,24,6); c.roundRect(6,-24,32,24,6); c.fill();
  c.fillStyle='#1c7ed6'; c.fillRect(-32,-96,24,74); c.fillRect(8,-96,24,74);
  /* le ciré jaune */
  c.fillStyle=CIRE; c.strokeStyle=CIRE_B; c.lineWidth=4;
  c.beginPath(); c.moveTo(-50,-90); c.lineTo(-44,-196); c.quadraticCurveTo(0,-214,44,-196); c.lineTo(50,-90); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle=CIRE_B; c.lineWidth=3; c.beginPath(); c.moveTo(0,-204); c.lineTo(0,-92); c.stroke();
  for(const y of [-176,-148,-120]){ c.fillStyle='#e67700'; c.beginPath(); c.arc(6,y,4,0,7); c.fill(); }
  /* les bras : gauche (vers la droite de l'image si montre) et droit (salut) */
  const bras=(epaule,ang,main)=>{ c.save(); c.translate(epaule,-188); c.rotate(ang);
    c.fillStyle=CIRE; c.strokeStyle=CIRE_B; c.lineWidth=4; c.beginPath(); c.roundRect(-11,0,22,92,10); c.fill(); c.stroke();
    if(main){ c.fillStyle=PEAU; c.strokeStyle=PEAU_B; c.lineWidth=3; c.beginPath(); c.arc(0,100,12,0,7); c.fill(); c.stroke(); } c.restore(); };
  const agite=salut>0?Math.sin(T*9)*.25*salut:0;
  bras(-44,.18+salut*2.6+agite,true);
  bras(44,-.18-montre*1.25,true);
  /* la tête : visage, barbe courte, yeux qui sourient */
  c.fillStyle=PEAU; c.strokeStyle=PEAU_B; c.lineWidth=4; c.beginPath(); c.ellipse(0,-246,34,38,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.moveTo(-32,-244); c.quadraticCurveTo(-30,-206,0,-204); c.quadraticCurveTo(30,-206,32,-244);
  c.quadraticCurveTo(22,-224,0,-222); c.quadraticCurveTo(-22,-224,-32,-244); c.fill();
  c.strokeStyle='#212529'; c.lineWidth=4; c.lineCap='round';
  for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*13,-250,6,Math.PI*1.1,Math.PI*1.9); c.stroke(); }
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.beginPath(); c.arc(0,-226,9,.15*Math.PI,.85*Math.PI); c.stroke();
  /* le bob de pêcheur, jaune comme le ciré */
  c.fillStyle=CIRE; c.strokeStyle=CIRE_B; c.lineWidth=4;
  c.beginPath(); c.ellipse(0,-272,52,12,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-30,-272); c.quadraticCurveTo(-28,-306,0,-308); c.quadraticCurveTo(28,-306,30,-272); c.closePath(); c.fill(); c.stroke();
  c.lineCap='butt'; c.restore(); }

/* Un poisson vu de côté : (x, y) = le centre ; L = la longueur ; dir = 1 tête à droite, −1 à gauche ;
   z = l'apparition (zoom) ; lueur ; T fait frétiller la queue ; ray = des rayures */
function poissonE(c,x,y,L,coul='#74c0fc',{dir=1,z=1,lueur=0,T=0,k=0,ray=null}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(dir*z,z);
  const h=L*.42, q=Math.sin(T*8+k*1.7)*.18;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,L*.75,h*1.15,0,0,7); c.fill(); }
  /* la queue */
  c.save(); c.translate(-L*.42,0); c.rotate(q); c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3;
  c.beginPath(); c.moveTo(0,0); c.lineTo(-L*.24,-h*.62); c.lineTo(-L*.18,0); c.lineTo(-L*.24,h*.62); c.closePath(); c.fill(); c.stroke(); c.restore();
  /* le corps */
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3;
  c.beginPath(); c.moveTo(L*.5,0); c.quadraticCurveTo(L*.15,-h*.95,-L*.44,0); c.quadraticCurveTo(L*.15,h*.95,L*.5,0); c.fill(); c.stroke();
  if(ray){ c.strokeStyle=ray; c.lineWidth=Math.max(3,L*.035); for(const u of [-.12,.06]){ c.beginPath(); c.moveTo(L*u,-h*.36); c.lineTo(L*(u-.05),h*.36); c.stroke(); } }
  c.fillStyle='rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(L*.05,h*.16,L*.24,h*.12,0,0,7); c.fill();
  /* la nageoire, l'œil */
  c.fillStyle='rgba(0,0,0,.18)'; c.beginPath(); c.moveTo(-L*.02,-h*.12); c.lineTo(-L*.16,h*.08); c.lineTo(L*.06,h*.06); c.fill();
  c.fillStyle='#fff'; c.beginPath(); c.arc(L*.3,-h*.12,L*.06,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(L*.32,-h*.12,L*.032,0,7); c.fill();
  c.restore(); }
const COUL_POISSON=['#74c0fc','#ffa94d','#b197fc','#63e6be','#ffd43b','#ff8787','#a5d8ff','#ffc078','#d0bfff','#96f2d7'];

/* Un crabe rouge : (x, y) = le centre de la carapace ; s ; marche (0/1) fait courir les pattes avec T ; dir pour les yeux */
function crabeE(c,x,y,s=1,{z=1,T=0,k=0,marche=0,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(s*z,s*z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,70,52,0,0,7); c.fill(); }
  const ph=marche?Math.sin(T*16+k):0;
  c.strokeStyle='#c92a2a'; c.lineWidth=6; c.lineCap='round';
  for(const sx of [-1,1]) for(let j=0;j<3;j++){ const a=(j-1)*.32+ph*.25*(j%2?1:-1);
    c.beginPath(); c.moveTo(sx*26,6+j*6); c.lineTo(sx*(46+6*Math.cos(a)),18+j*8+6*Math.sin(a)); c.lineTo(sx*54,34+j*6); c.stroke(); }
  /* les pinces */
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*22,-8); c.lineTo(sx*40,-26); c.stroke();
    c.fillStyle='#f03e3e'; c.beginPath(); c.ellipse(sx*46,-34,14,10,sx*.6,0,7); c.fill();
    c.strokeStyle='#ffe3e3'; c.lineWidth=3; c.beginPath(); c.moveTo(sx*44,-34); c.lineTo(sx*58,-40-ph*3); c.stroke(); c.strokeStyle='#c92a2a'; c.lineWidth=6; }
  /* la carapace et les yeux sur leurs tiges */
  c.fillStyle='#f03e3e'; c.strokeStyle='#a61e1e'; c.lineWidth=3; c.beginPath(); c.ellipse(0,4,36,24,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#a61e1e'; c.lineWidth=4; for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*10,-16); c.lineTo(sx*12,-32); c.stroke();
    c.fillStyle='#fff'; c.beginPath(); c.arc(sx*12,-36,7,0,7); c.fill(); c.fillStyle='#212529'; c.beginPath(); c.arc(sx*12,-36,3.5,0,7); c.fill(); }
  c.lineCap='butt'; c.restore(); }

/* Une mouette : (x, y) = le centre du corps ; s ; aile = battement (0 posée → 1 en vol, T anime) ; dir */
function mouetteE(c,x,y,s=1,{aile=0,T=0,k=0,dir=1,z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(dir*s*z,s*z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(0,-6,48,0,7); c.fill(); }
  const b=aile>0?Math.sin(T*7+k*1.3)*aile:0;
  /* le corps blanc, la queue grise */
  c.fillStyle='#f8f9fa'; c.strokeStyle='#868e96'; c.lineWidth=3;
  c.beginPath(); c.ellipse(0,0,30,17,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#adb5bd'; c.beginPath(); c.moveTo(-26,-4); c.lineTo(-46,-10); c.lineTo(-44,6); c.closePath(); c.fill();
  /* la tête, le bec jaune, l'œil */
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(26,-14,13,0,7); c.fill(); c.stroke();
  c.fillStyle='#fab005'; c.beginPath(); c.moveTo(37,-16); c.lineTo(54,-12); c.lineTo(37,-9); c.closePath(); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(29,-17,2.6,0,7); c.fill();
  /* l'aile : repliée sur le dos, ou grande ouverte quand elle vole */
  c.fillStyle='#ced4da'; c.strokeStyle='#868e96';
  if(aile<=0){ c.beginPath(); c.ellipse(-4,-6,22,9,-.12,0,7); c.fill(); c.stroke(); }
  else { const hy=-38-26*b; c.beginPath(); c.moveTo(-10,-6); c.quadraticCurveTo(-30,hy,-58,hy+8); c.quadraticCurveTo(-28,hy+18,8,-6); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(4,-6); c.quadraticCurveTo(18,hy-4,40,hy-2); c.quadraticCurveTo(22,hy+16,14,-6); c.closePath(); c.fill(); c.stroke(); }
  /* les pattes quand elle est posée */
  if(aile<=0){ c.strokeStyle='#f59f00'; c.lineWidth=3; for(const px of [-6,6]){ c.beginPath(); c.moveTo(px,15); c.lineTo(px,26); c.stroke(); } }
  c.restore(); }

/* Un seau de couleur : (x, yBas) = le milieu du fond ; w = la largeur du haut ; une anse */
function seauCoulE(c,x,yBas,w,coul,bord){ const h=w*.72;
  c.strokeStyle='#495057'; c.lineWidth=5; c.beginPath(); c.arc(x,yBas-h,w*.46,Math.PI*1.05,Math.PI*1.95); c.stroke();
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=5; c.beginPath();
  c.moveTo(x-w/2,yBas-h); c.lineTo(x+w/2,yBas-h); c.lineTo(x+w*.36,yBas); c.lineTo(x-w*.36,yBas); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.22)'; c.fillRect(x-w*.34,yBas-h*.78,w*.1,h*.62); }

/* Une caisse de bois : (x, yBas) = le milieu du bas ; w, h */
function caisseE(c,x,yBas,w,h,lueur=0){
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.3*lueur})`; c.beginPath(); c.ellipse(x,yBas-h/2,w*.72,h*.95,0,0,7); c.fill(); }
  c.fillStyle='#c08550'; c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,6); c.fill(); c.stroke();
  c.lineWidth=3; for(let k=1;k<3;k++){ const y=yBas-h+k*h/3; c.beginPath(); c.moveTo(x-w/2,y); c.lineTo(x+w/2,y); c.stroke(); }
  c.fillStyle='#6b3a10'; c.fillRect(x-w/2+8,yBas-h+4,10,h-8); c.fillRect(x+w/2-18,yBas-h+4,10,h-8); }

/* Un panier d'osier : (x, yBas) = le milieu du fond ; w */
function panierE(c,x,yBas,w){ const h=w*.55;
  c.strokeStyle='#8a5a2b'; c.lineWidth=7; c.beginPath(); c.arc(x,yBas-h,w*.42,Math.PI,0); c.stroke();
  c.fillStyle='#d9a066'; c.strokeStyle='#8a5a2b'; c.lineWidth=5; c.beginPath();
  c.moveTo(x-w/2,yBas-h); c.lineTo(x+w/2,yBas-h); c.lineTo(x+w*.4,yBas); c.lineTo(x-w*.4,yBas); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(107,58,16,.55)'; c.lineWidth=3;
  for(let k=1;k<4;k++){ const y=yBas-h+k*h/4; c.beginPath(); c.moveTo(x-w/2+k*3,y); c.lineTo(x+w/2-k*3,y); c.stroke(); }
  for(let k=-3;k<=3;k++){ c.beginPath(); c.moveTo(x+k*w*.13,yBas-h); c.lineTo(x+k*w*.105,yBas); c.stroke(); } }

/* La petite barque bleue d'Idriss : (x, yEau) = le milieu de la ligne d'eau ; s ; T la fait tanguer.
   rameur : Idriss assis, qui rame (rame = phase) ; mat : un petit mât (pour les mouettes), son haut est rendu par mâtHautE */
function barqueE(c,x,yEau,s=1,{T=0,rameur=true,mat=false,plie=0,poissons=0,a=null,vergue=120,coque='#1971c2',coqueB='#0b3d6b',etoile=true,voile=null}={}){ c.save(); c.translate(x,yEau);
  c.rotate(a===null?Math.sin(T*1.3)*.035:a); c.scale(s,s);
  if(mat){ c.save(); c.translate(-20,-40); c.rotate(-.12*plie); c.fillStyle='#8a5a2b'; c.strokeStyle='#5c3d0a'; c.lineWidth=3;
    c.beginPath(); c.roundRect(-6,-250,12,250,4); c.fill(); c.stroke(); c.fillStyle='#5c3d0a'; c.fillRect(-vergue/2,-232,vergue,10); c.restore(); }
  if(voile){ c.fillStyle='#8a5a2b'; c.fillRect(-6,-230,12,186);
    c.fillStyle=voile; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=4; c.beginPath(); c.moveTo(10,-226); c.lineTo(10,-60); c.lineTo(130,-60); c.closePath(); c.fill(); c.stroke();
    c.beginPath(); c.moveTo(-10,-200); c.lineTo(-10,-60); c.lineTo(-90,-60); c.closePath(); c.fill(); c.stroke(); }
  if(rameur){ /* Idriss assis : buste et tête au-dessus du bord */
    c.save(); c.translate(36,-8); c.scale(.72,.72); idrissE(c,0,0,1,{}); c.restore();
    const ph=Math.sin(T*2.4); c.strokeStyle='#8a5a2b'; c.lineWidth=7; c.lineCap='round';
    c.beginPath(); c.moveTo(70,-74); c.lineTo(130+30*ph,40); c.stroke(); c.fillStyle='#8a5a2b'; c.beginPath(); c.ellipse(134+30*ph,46,10,24,-.5,0,7); c.fill(); c.lineCap='butt'; }
  /* des poissons qui dépassent du bord */
  for(let k=0;k<poissons;k++) poissonE(c,-110+k*34,-34-(k%2)*10,60,COUL_POISSON[k%10],{dir:k%2?1:-1,T,k});
  /* la coque */
  c.fillStyle=coque; c.strokeStyle=coqueB; c.lineWidth=5; c.beginPath();
  c.moveTo(-170,-46); c.lineTo(170,-46); c.quadraticCurveTo(150,26,90,30); c.lineTo(-100,30); c.quadraticCurveTo(-160,20,-170,-46); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; c.fillRect(-166,-46,332,10);
  if(etoile){ c.fillStyle='#fcc419'; c.font='bold 28px sans-serif'; c.textAlign='center'; c.fillText('★',-110,0); }
  c.restore(); }
/* Le haut du mât de la barque (la vergue, où se posent les mouettes), dans le repère de la page :
   mêmes x, yEau, s, plie que barqueE ; a0 = l'angle de tangage de la barque */
function matHautE(x,yEau,s=1,plie=0,a0=0){ const r=-.12*plie, px=s*(-20+227*Math.sin(r)), py=s*(-40-227*Math.cos(r));
  return [x+px*Math.cos(a0)-py*Math.sin(a0), yEau+px*Math.sin(a0)+py*Math.cos(a0)]; }
/* Le soleil du matin au ras de l'eau (réutilise le soleil couchant de cp-entier.js) */
function soleilMatinE(c,x,y,r,u=1){ soleilCouchant(c,x,y,r,u); }

/* ---- Paire 2 (cp-soustractif) ---- */
/* Le quai de bois vu de face, la mer au fond (yMer) : le même que dans la paysage 01 */
function quaiBoisE(c,T,yMer=300){ merE(c,T,yMer); c.fillStyle='#a47148'; c.fillRect(0,yMer+70,1056,720-yMer-70);
  c.strokeStyle='#7a4f2a'; c.lineWidth=3; for(let y=yMer+70;y<720;y+=50){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); }
  for(let k=0;k<12;k++){ const y=yMer+70+Math.floor(k/3)*50, x=(k*311)%1056; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+50); c.stroke(); } }
/* Des ronds dans l'eau (plouf) : (x, y) ; u = 0 → 1 */
function ploufE(c,x,y,u){ if(u<=0||u>=1) return; c.strokeStyle=`rgba(255,255,255,${1-u})`; c.lineWidth=4;
  for(const k of [0,.35]){ const v=Math.max(0,u-k); if(v>0){ c.beginPath(); c.ellipse(x,y,20+80*v,6+18*v,0,0,7); c.stroke(); } }
  c.fillStyle=`rgba(165,216,255,${1-u})`; for(let j=0;j<5;j++){ const a=Math.PI*(1.15+j*.17); c.beginPath(); c.arc(x+Math.cos(a)*60*u,y+Math.sin(a)*70*u+60*u*u,6,0,7); c.fill(); } }
/* L'étal d'Idriss : une table de bois sous une petite toile rayée ; (x0, x1) = les bords, y = le dessus de la table */
function etalE(c,x0,x1,y,{toile=true}={}){
  c.fillStyle='#6b3a10'; for(const x of [x0+24,x1-40]) c.fillRect(x,y+20,16,720-y);
  c.fillStyle='#c08550'; c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.roundRect(x0,y,x1-x0,34,6); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.18)'; c.fillRect(x0+6,y+5,x1-x0-12,7);
  if(toile){ c.fillStyle='#8a5a2b'; for(const x of [x0+10,x1-22]) c.fillRect(x,40,12,y-40);
    const n=8, w=(x1-x0+40)/n; for(let k=0;k<n;k++){ c.fillStyle=k%2?'#f8f9fa':'#1c7ed6';
      c.beginPath(); c.moveTo(x0-20+k*w,30); c.lineTo(x0-20+(k+1)*w,30); c.lineTo(x0-20+(k+1)*w,74); c.quadraticCurveTo(x0-20+(k+.5)*w,96,x0-20+k*w,74); c.closePath(); c.fill(); } } }

/* Un chat roux : (x, yBas) = entre les pattes ; s ; court (0/1) l'étire en pleine course avec T ; dir = 1 tête à droite ;
   bouche : il tient quelque chose (rien à dessiner ici : on pose l'objet au point renvoyé) ; renvoie [x, y] de la gueule */
function chatE(c,x,yBas,s=1,{dir=1,court=0,T=0,z=1,lueur=0}={}){ if(z<=0) return [x,yBas]; c.save(); c.translate(x,yBas); c.scale(dir*s*z,s*z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(0,-60,120,80,0,0,7); c.fill(); }
  const ROUX='#f08c00', ROUX_B='#a65b00', ph=court?Math.sin(T*18):0;
  /* la queue */
  c.strokeStyle=ROUX; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(-60,-60);
  c.quadraticCurveTo(-110,-90-20*ph,-100,-150+30*court); c.stroke();
  /* les pattes */
  c.lineWidth=14; for(const [px,d] of [[-44,1],[-26,-1],[30,1],[48,-1]]){ const a=court?ph*.7*d:0;
    c.beginPath(); c.moveTo(px,-40); c.lineTo(px+40*Math.sin(a),-4); c.stroke(); }
  c.lineCap='butt';
  /* le corps rayé */
  c.fillStyle=ROUX; c.strokeStyle=ROUX_B; c.lineWidth=4; c.beginPath(); c.ellipse(0,-62,70-6*court,34,0,0,7); c.fill(); c.stroke();
  c.strokeStyle=ROUX_B; c.lineWidth=6; for(const u of [-30,-8,14]){ c.beginPath(); c.moveTo(u,-94); c.lineTo(u+6,-74); c.stroke(); }
  /* la tête, les oreilles, les yeux verts, les moustaches */
  c.fillStyle=ROUX; c.strokeStyle=ROUX_B; c.lineWidth=4;
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(70+sx*14,-120); c.lineTo(70+sx*28,-152); c.lineTo(70+sx*34,-112); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(76,-100,34,0,7); c.fill(); c.stroke();
  for(const sx of [-1,1]){ c.fillStyle='#8ce99a'; c.beginPath(); c.ellipse(76+sx*14,-106,8,10,0,0,7); c.fill();
    c.fillStyle='#212529'; c.beginPath(); c.ellipse(78+sx*14,-106,3,7,0,0,7); c.fill(); }
  c.fillStyle='#ff8fa3'; c.beginPath(); c.moveTo(98,-94); c.lineTo(106,-90); c.lineTo(98,-86); c.fill();
  c.strokeStyle='#fff'; c.lineWidth=2; for(const v of [-6,0,6]){ c.beginPath(); c.moveTo(100,-88); c.lineTo(132,-92+v*1.6); c.stroke(); }
  c.restore(); return [x+dir*s*z*104,yBas-s*z*80]; }
/* Deux yeux qui brillent dans l'ombre (derrière une caisse) : (x, y) = entre les yeux ; u = l'ouverture (0 → 1) */
function yeuxOmbreE(c,x,y,u=1,T=0){ if(u<=0) return; const cl=(Math.sin(T*1.3)>.96)?.15:1;
  for(const sx of [-1,1]){ const g=c.createRadialGradient(x+sx*26,y,0,x+sx*26,y,30); g.addColorStop(0,`rgba(140,233,154,${.55*u})`); g.addColorStop(1,'rgba(140,233,154,0)');
    c.fillStyle=g; c.beginPath(); c.arc(x+sx*26,y,30,0,7); c.fill();
    c.fillStyle='#8ce99a'; c.beginPath(); c.ellipse(x+sx*26,y,12,14*u*cl,0,0,7); c.fill();
    c.fillStyle='#212529'; c.beginPath(); c.ellipse(x+sx*26,y,4,11*u*cl,0,0,7); c.fill(); } }

/* Une crevette rose recourbée : (x, y) = le centre ; L = la longueur ; dir ; T la fait frétiller */
function crevetteE(c,x,y,L,{dir=1,z=1,T=0,k=0,lueur=0,a=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(a+Math.sin(T*9+k*2.1)*.12); c.scale(dir*z,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(0,0,L*.62,0,7); c.fill(); }
  const n=6, R=L*.34;
  for(let j=n-1;j>=0;j--){ const t=Math.PI*(1.05-.9*j/(n-1)), r=L*(.17-.016*j);
    c.fillStyle=j%2?'#ff8787':'#ffa8a8'; c.strokeStyle='#c92a2a'; c.lineWidth=2.5; c.beginPath(); c.arc(R*Math.cos(t),R*Math.sin(t)*-1+R*.2,r,0,7); c.fill(); c.stroke(); }
  /* la queue en éventail, la tête et les antennes */
  const qx=R*Math.cos(Math.PI*.15), qy=-R*Math.sin(Math.PI*.15)+R*.2;
  c.fillStyle='#ff6b6b'; c.beginPath(); c.moveTo(qx,qy); c.lineTo(qx+L*.2,qy+L*.08); c.lineTo(qx+L*.12,qy+L*.2); c.closePath(); c.fill();
  const hx=R*Math.cos(Math.PI*1.05), hy=-R*Math.sin(Math.PI*1.05)+R*.2;
  c.fillStyle='#212529'; c.beginPath(); c.arc(hx-L*.04,hy-L*.06,L*.03,0,7); c.fill();
  c.strokeStyle='#c92a2a'; c.lineWidth=2; for(const v of [0,1]){ c.beginPath(); c.moveTo(hx-L*.1,hy); c.quadraticCurveTo(hx-L*.4,hy-L*(.3+v*.12),hx-L*.1,hy-L*(.6+v*.1)); c.stroke(); }
  c.restore(); }

/* Un hameçon : (x, y) = l'œillet en haut ; h = la hauteur ; a = l'angle (il tourne en tombant) */
function hameconE(c,x,y,h,{z=1,a=0,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(a); c.scale(z,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,h*.5,h*.45,h*.65,0,0,7); c.fill(); }
  c.strokeStyle='#495057'; c.lineWidth=Math.max(7,h*.1)+3; c.lineCap='round'; c.beginPath(); c.moveTo(0,0); c.lineTo(0,h*.72); c.arc(-h*.2,h*.72,h*.2,0,Math.PI*.9); c.stroke();
  c.strokeStyle='#dee2e6'; c.lineWidth=Math.max(7,h*.1);
  c.beginPath(); c.arc(0,-h*.06,h*.07,0,7); c.stroke();
  c.beginPath(); c.moveTo(0,0); c.lineTo(0,h*.72); c.arc(-h*.2,h*.72,h*.2,0,Math.PI*.9); c.stroke();
  c.beginPath(); c.moveTo(-h*.4,h*.68); c.lineTo(-h*.4,h*.5); c.lineTo(-h*.3,h*.6); c.stroke();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=2; c.beginPath(); c.moveTo(h*.02,h*.06); c.lineTo(h*.02,h*.6); c.stroke();
  c.lineCap='butt'; c.restore(); }

/* Une bouée rouge et blanche : (x, y) = le centre ; r ; a = la rotation (elle roule au vent) */
function boueeE(c,x,y,r,{z=1,a=0,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(a); c.scale(z,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(0,0,r*1.35,0,7); c.fill(); }
  for(let k=0;k<8;k++){ c.fillStyle=k%2?'#f8f9fa':'#e03131'; c.beginPath(); c.arc(0,0,r,k*Math.PI/4,(k+1)*Math.PI/4); c.arc(0,0,r*.52,(k+1)*Math.PI/4,k*Math.PI/4,true); c.closePath(); c.fill(); }
  c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.arc(0,0,r,0,7); c.stroke(); c.beginPath(); c.arc(0,0,r*.52,0,7); c.stroke();
  c.restore(); }

/* Une grosse vague qui s'enroule : (x, yBas) = le pied ; w ; u = la hauteur (0 → 1) */
function vagueE(c,x,yBas,w,u=1,T=0){ if(u<=0) return; const h=w*.62*u;
  c.fillStyle='#1c7ed6'; c.strokeStyle='#0b3d6b'; c.lineWidth=4; c.beginPath(); c.moveTo(x-w/2,yBas);
  c.quadraticCurveTo(x-w*.3,yBas-h*.9,x+w*.08,yBas-h); c.quadraticCurveTo(x+w*.38,yBas-h*.98,x+w*.36,yBas-h*.66);
  c.quadraticCurveTo(x+w*.18,yBas-h*.82,x+w*.12,yBas-h*.55); c.quadraticCurveTo(x+w*.3,yBas-h*.2,x+w/2,yBas); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; for(let k=0;k<7;k++){ const t=k/6; c.beginPath(); c.arc(x-w*.2+t*w*.56,yBas-h*(.86+.12*Math.sin(t*3))+3*Math.sin(T*6+k),8*u,0,7); c.fill(); } }

/* ---- Paires 3, 5, 6 (la monnaie) ---- */
/* Une pièce ou un billet en euros : v = 1, 2 (pièces) ou 5, 10, 20, 50 (billets) ; (x, y) = le centre ; t = la taille
   (le rayon d'une pièce de 1 €, la pièce de 2 € est un peu plus grande ; un billet fait 4,6 t de large) */
const BILLET_E={5:['#ced4da','#495057'],10:['#ffa8a8','#a61e1e'],20:['#a5d8ff','#1864ab'],50:['#ffc078','#a34700']};
function euroE(c,v,x,y,t=40,{z=1,lueur=0,a=0,terne=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.rotate(a); c.scale(Math.min(1.15,z),Math.min(1.15,z));
  if(terne) c.globalAlpha=1-.55*terne;
  if(v<=2){ const r=v===2?t*1.12:t;
    if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(0,0,r*1.5,0,7); c.fill(); }
    const [ext,inter]=v===2?['#ced4da','#fcc419']:['#fcc419','#ced4da'];
    c.fillStyle=ext; c.strokeStyle=v===2?'#868e96':'#e67700'; c.lineWidth=4; c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.stroke();
    c.fillStyle=inter; c.beginPath(); c.arc(0,0,r*.7,0,7); c.fill(); c.strokeStyle=v===2?'#e67700':'#868e96'; c.lineWidth=2; c.stroke();
    ecrire(c,String(v),0,-r*.06,r*.82,'#343a40'); ecrire(c,'€',0,r*.5,r*.34,'#343a40'); }
  else { const w=t*4.6, h=w*.52, [fond,encre]=BILLET_E[v]||BILLET_E[5];
    if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(-w*.62,-h*.72,w*1.24,h*1.44,18); c.fill(); }
    c.fillStyle=fond; c.strokeStyle=encre; c.lineWidth=4; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,10); c.fill(); c.stroke();
    c.strokeStyle=encre; c.globalAlpha*=.4; c.lineWidth=3; c.beginPath(); c.arc(w*.3,0,h*.28,0,7); c.stroke();
    c.beginPath(); c.moveTo(-w*.42,h*.3); c.lineTo(w*.05,h*.3); c.stroke(); c.globalAlpha/=.4;
    ecrire(c,v+' €',-w*.1,2,h*.5,encre); }
  c.restore(); }
/* Une étiquette de prix (carton blanc, ficelle) : (x, y) = le centre ; txt (« 7 € ») ; taille du texte */
function prixE(c,txt,x,y,taille=60,{z=1,lueur=0,coul='#c92a2a'}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(Math.min(1.15,z),Math.min(1.15,z)); c.rotate(-.06);
  c.font=`800 ${taille}px "Segoe UI"`; const w=Math.max(taille*1.6,c.measureText(txt).width+taille*.9), h=taille*1.35;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.roundRect(-w*.62,-h*.75,w*1.24,h*1.5,20); c.fill(); }
  c.fillStyle='#fff9db'; c.strokeStyle='#8a5a2b'; c.lineWidth=4; c.beginPath();
  c.moveTo(-w/2+h*.35,-h/2); c.lineTo(w/2,-h/2); c.lineTo(w/2,h/2); c.lineTo(-w/2+h*.35,h/2); c.lineTo(-w/2,0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#8a5a2b'; c.beginPath(); c.arc(-w/2+h*.32,0,6,0,7); c.fill();
  ecrire(c,txt,h*.18,3,taille,coul); c.restore(); }
/* Le porte-monnaie de Ti Margo : (x, yBas) ; w ; ouvre (0 → 1) */
function porteMonnaieE(c,x,yBas,w=200,ouvre=1){ const h=w*.62;
  c.fillStyle='#be4bdb'; c.strokeStyle='#862e9c'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,22); c.fill(); c.stroke();
  c.fillStyle='#da77f2'; c.beginPath(); c.moveTo(x-w/2+6,yBas-h+10); c.quadraticCurveTo(x,yBas-h-ouvre*h*.5,x+w/2-6,yBas-h+10); c.lineTo(x+w/2-6,yBas-h+24); c.lineTo(x-w/2+6,yBas-h+24); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#fcc419'; for(const sx of [-1,1]){ c.beginPath(); c.arc(x+sx*16,yBas-h+4,10,0,7); c.fill(); c.strokeStyle='#e67700'; c.lineWidth=3; c.stroke(); } }
/* Une formule écrite mot à mot, centrée sur x0 : toks = ['5','+','2','=','7'], ts = l'instant de chaque morceau ;
   le dernier morceau (le résultat) grossit en vert ; cols = une couleur par morceau (sinon : blanc, résultat vert) */
function formuleE(c,T,x0,y,toks,ts,taille=90,cols=null){ const w=toks.map(s=>s.length>1?taille*(.42+.5*s.length):taille*.98), L=w.reduce((a,b)=>a+b,0);
  let x=x0-L/2; toks.forEach((s,k)=>{ const cx=x+w[k]/2; x+=w[k]; if(T<ts[k]) return; const fin=k===toks.length-1;
    ecrire(c,s,cx,y,taille*(fin?1.08*zoom(T,ts[k],.4):1),cols?cols[k]:(fin?CRAIE.ok:CRAIE.blanc)); }); }

/* ---- Paire 4 (ce1-partage) ---- */
/* Un enfant debout (≈ 220 px de haut à s = 1) : (x, yBas) ; k choisit le tee-shirt, la peau et les cheveux ; bras = lève les bras (0 → 1) */
function enfantE(c,x,yBas,s=1,{k=0,bras=0,T=0,lueur=0}={}){ c.save(); c.translate(x,yBas); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(0,-110,90,125,0,0,7); c.fill(); }
  const TEE=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#cc5de8'][k%5], PEAU=['#8d5524','#f1c27d','#c68642','#e0ac69','#5c3a1e'][k%5],
    CHEV=['#212529','#7a4a2a','#343a40','#a0522d','#212529'][k%5], fille=k%2===1;
  c.fillStyle='#1c7ed6'; c.fillRect(-22,-70,18,62); c.fillRect(4,-70,18,62);
  c.fillStyle='#343a40'; c.beginPath(); c.roundRect(-26,-12,24,12,5); c.roundRect(2,-12,24,12,5); c.fill();
  c.strokeStyle=PEAU; c.lineWidth=13; c.lineCap='round'; const a=bras*1.9+Math.sin(T*6)*.15*bras;
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*28,-140); c.lineTo(sx*(30+46*Math.sin(.35+a)),-140+62*Math.cos(.35+a)); c.stroke(); }
  c.lineCap='butt';
  c.fillStyle=TEE; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=3; c.beginPath(); c.roundRect(-34,-150,68,86,14); c.fill(); c.stroke();
  c.fillStyle=PEAU; c.beginPath(); c.arc(0,-182,32,0,7); c.fill(); c.strokeStyle='rgba(0,0,0,.3)'; c.stroke();
  c.fillStyle=CHEV; c.beginPath(); c.arc(0,-188,33,Math.PI*1.02,Math.PI*1.98); c.fill();
  if(fille){ for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*34,-176,12,0,7); c.fill(); } }
  c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*11,-182,4,0,7); c.fill(); }
  c.strokeStyle='#c92a2a'; c.lineWidth=3; c.beginPath(); c.arc(0,-172,9,.15*Math.PI,.85*Math.PI); c.stroke();
  c.restore(); }
/* Un ruban noué sur l'anse d'un panier : (x, y) = le nœud */
function rubanE(c,x,y,coul,s=1){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=2;
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(0,0); c.lineTo(sx*30,-16); c.lineTo(sx*30,16); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.moveTo(-4,4); c.lineTo(-16,38); c.lineTo(-6,36); c.closePath(); c.fill(); c.beginPath(); c.moveTo(4,4); c.lineTo(16,38); c.lineTo(6,36); c.closePath(); c.fill();
  c.beginPath(); c.arc(0,0,8,0,7); c.fill(); c.stroke(); c.restore(); }
