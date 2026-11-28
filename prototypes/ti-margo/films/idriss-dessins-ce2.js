/* Dessins propres à la série monnaie CE2 avec Idriss (28/11). Relu après idriss-dessins.js par idriss.js et idriss-paysage.js.
   ⛔ Une seule session écrit ici : celle du CE2. Les dessins communs (euroE, centimeE…) restent dans idriss-dessins.js. */

/* Couleurs des prix à virgule : les euros en bleu, les centimes en orange, la virgule blanche (règle CE2 : « 3 » bleu, virgule, « 45 » orange) */
const EUR_CE2='#74c0fc', CEN_CE2='#ffc078';
/* Un prix écrit avec sa virgule, centré sur (x, y) : txt = « 3,45 € », « 345 c », « 2 € » ;
   les euros en bleu, la virgule blanche et un peu plus grasse, les centimes en orange, le signe en blanc.
   z = l'apparition (zoom) ; une = toute l'écriture d'une seule couleur ; fond = une plaque sombre derrière (lisible sur un dessin). */
function prixVCe2E(c,txt,x,y,taille=80,{z=1,une=null,fond=0,lueur=0}={}){ if(z<=0) return []; const k=Math.min(1.15,z), t=taille*k;
  c.save(); c.font=`800 ${t}px "Segoe UI"`;
  const m=txt.match(/^(\D*?)(\d+)(?:,(\d+))?\s*(€|c)?(.*)$/);
  let parts;
  if(!m) parts=[[txt,une||CRAIE.blanc]];
  else { const [,av,a,b,u,reste]=m;
    if(b!==undefined) parts=[[av,une||CRAIE.blanc],[a,une||EUR_CE2],[',',une||CRAIE.blanc],[b,une||CEN_CE2],[u?' '+u:'',une||CRAIE.blanc],[reste,une||CRAIE.blanc]];
    else parts=[[av,une||CRAIE.blanc],[a,une||(u==='c'?CEN_CE2:EUR_CE2)],[u?' '+u:'',une||CRAIE.blanc],[reste,une||CRAIE.blanc]]; }
  const ws=parts.map(([s])=>c.measureText(s).width+(s===','?t*.1:0)), L=ws.reduce((p,q)=>p+q,0);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.roundRect(x-L/2-t*.35,y-t*.72,L+t*.7,t*1.44,t*.3); c.fill(); }
  if(fond){ c.fillStyle='rgba(31,59,44,.92)'; c.beginPath(); c.roundRect(x-L/2-t*.3,y-t*.66,L+t*.6,t*1.32,t*.25); c.fill(); }
  const xs=[]; let cx=x-L/2; parts.forEach(([s,coul],i)=>{ if(!s){ return; } c.fillStyle=coul; c.textAlign='left'; c.textBaseline='middle';
    if(s===','){ c.font=`900 ${t*1.08}px "Segoe UI"`; c.fillText(s,cx+t*.05,y); xs.push(cx+ws[i]/2); c.font=`800 ${t}px "Segoe UI"`; }
    else { c.fillText(s,cx,y); let u=cx; for(const ch of s){ const w=c.measureText(ch).width; xs.push(u+w/2); u+=w; } } cx+=ws[i]; });
  c.restore(); return xs; }
/* Une ligne de calcul, morceau par morceau (comme formuleE) mais chaque morceau en prixVCe2E : toks = ['6,40 €','+','3,30 €','=','9,70 €'] ;
   ts = l'instant de chaque morceau ; le dernier grossit ; vert = le résultat en vert d'un seul tenant */
function calculVCe2E(c,T,x0,y,toks,ts,taille=70,{vert=true}={}){ c.save(); c.font=`800 ${taille}px "Segoe UI"`;
  const w=toks.map(s=>c.measureText(s).width+taille*.45), L=w.reduce((a,b)=>a+b,0); c.restore();
  let x=x0-L/2; toks.forEach((s,k)=>{ const cx=x+w[k]/2; x+=w[k]; if(T<ts[k]) return; const fin=k===toks.length-1;
    if(/^[+−=×<>→]$/.test(s)) ecrire(c,s,cx,y,taille,CRAIE.blanc);
    else prixVCe2E(c,s,cx,y,taille*(fin?1.06:1),{z:fin?zoom(T,ts[k],.4):1,une:fin&&vert?CRAIE.ok:null}); }); }
/* Une pièce ou un billet donné par son nom : '10€', '2€', '50c' ; (x, y) = le centre ; t = la taille d'euroE */
function argentCe2E(c,nom,x,y,t=40,o={}){ const v=parseInt(nom,10); if(nom.endsWith('c')) centimeE(c,v,x,y,t,o); else euroE(c,v,x,y,t,o); }
/* Un tas d'argent en ligne (gauche → droite) : noms = ['5€','2€','20c'] ; pas = l'écart ; zs = l'apparition de chacun ; renvoie les x */
function tasCe2E(c,noms,x0,y,t=34,pas=110,{zs=null,lueur=0}={}){ const X=[]; let x=x0;
  noms.forEach((n,k)=>{ const billet=!n.endsWith('c')&&parseInt(n,10)>=5, w=billet?t*4.6:t*2.1;
    const cx=x+w/2; X.push(cx); argentCe2E(c,n,cx,y,t,{z:zs?zs[k]:1,lueur,grand:1}); x+=w+(pas-t*2.1); });
  return X; }

/* Un flotteur de pêche (rouge en haut, blanc en bas, une antenne) : (x, y) = le centre ; h = la hauteur ; T le fait danser */
function flotteurCe2E(c,x,y,h=120,{z=1,lueur=0,T=0,k=0,terne=0}={}){ if(z<=0) return; c.save(); c.translate(x,y+Math.sin(T*2.4+k)*h*.02); c.scale(Math.min(1.15,z),Math.min(1.15,z));
  if(terne) c.globalAlpha=1-.55*terne;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.42*lueur})`; c.beginPath(); c.ellipse(0,0,h*.42,h*.62,0,0,7); c.fill(); }
  c.strokeStyle='#343a40'; c.lineWidth=Math.max(3,h*.03); c.beginPath(); c.moveTo(0,-h*.5); c.lineTo(0,-h*.22); c.moveTo(0,h*.22); c.lineTo(0,h*.5); c.stroke();
  c.fillStyle='#fff'; c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.ellipse(0,0,h*.2,h*.26,0,0,7); c.fill(); c.stroke();
  c.save(); c.beginPath(); c.ellipse(0,0,h*.2,h*.26,0,0,7); c.clip(); c.fillStyle='#e03131'; c.fillRect(-h*.25,-h*.3,h*.5,h*.3); c.restore();
  c.strokeStyle='#495057'; c.beginPath(); c.ellipse(0,0,h*.2,h*.26,0,0,7); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.arc(0,-h*.5,h*.045,0,7); c.fill();
  c.restore(); }
/* Une lampe-tempête de pêcheur : (x, yBas) ; h = la hauteur ; allume (0 → 1) allume la flamme et le halo */
function lampeCe2E(c,x,yBas,h=200,{z=1,allume=0,T=0,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const s=Math.min(1.15,z); c.scale(s,s);
  const w=h*.5;
  if(allume>0){ const g=c.createRadialGradient(0,-h*.48,4,0,-h*.48,h*.9); g.addColorStop(0,`rgba(255,224,102,${.55*allume})`); g.addColorStop(1,'rgba(255,224,102,0)');
    c.fillStyle=g; c.beginPath(); c.arc(0,-h*.48,h*.9,0,7); c.fill(); }
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-h*.5,w*.9,h*.62,0,0,7); c.fill(); }
  c.strokeStyle='#495057'; c.lineWidth=6; c.beginPath(); c.arc(0,-h*.92,w*.3,Math.PI,0); c.stroke();
  c.fillStyle='#c92a2a'; c.strokeStyle='#862e2e'; c.lineWidth=4;
  c.beginPath(); c.roundRect(-w*.42,-h*.88,w*.84,h*.12,6); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(-w*.5,-h*.14,w,h*.14,8); c.fill(); c.stroke();
  c.fillStyle=allume>0?`rgba(255,243,191,${.55+.4*allume})`:'rgba(233,236,239,.55)'; c.strokeStyle='#495057'; c.lineWidth=3;
  c.beginPath(); c.roundRect(-w*.36,-h*.76,w*.72,h*.62,10); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-w*.36,-h*.45); c.lineTo(w*.36,-h*.45); c.moveTo(0,-h*.76); c.lineTo(0,-h*.14); c.globalAlpha=.4; c.stroke(); c.globalAlpha=1;
  if(allume>0){ const f=1+.08*Math.sin(T*14); c.fillStyle='#ff922b'; c.beginPath(); c.ellipse(0,-h*.4,w*.09*f,h*.1*f*allume,0,0,7); c.fill();
    c.fillStyle='#ffe066'; c.beginPath(); c.ellipse(0,-h*.38,w*.05,h*.06*allume,0,0,7); c.fill(); }
  c.restore(); }
/* Un sac de glace (plastique transparent, glaçons dedans, « GLACE ») : (x, yBas) ; w */
function sacGlaceCe2E(c,x,yBas,w=170,{z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const s=Math.min(1.15,z); c.scale(s,s); const h=w*1.05;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-h*.5,w*.75,h*.7,0,0,7); c.fill(); }
  c.fillStyle='rgba(208,235,255,.85)'; c.strokeStyle='#1c7ed6'; c.lineWidth=4;
  c.beginPath(); c.moveTo(-w*.44,-h*.82); c.lineTo(w*.44,-h*.82); c.quadraticCurveTo(w*.56,-h*.1,w*.4,0); c.lineTo(-w*.4,0); c.quadraticCurveTo(-w*.56,-h*.1,-w*.44,-h*.82); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-w*.2,-h*.82); c.quadraticCurveTo(0,-h*1.02,w*.2,-h*.82); c.stroke();
  c.fillStyle='#e7f5ff'; c.strokeStyle='#74c0fc'; c.lineWidth=3;
  for(const [u,v,a] of [[-.24,-.22,.2],[.08,-.2,-.3],[.28,-.3,.5],[-.12,-.45,-.1],[.2,-.55,.3]]){ c.save(); c.translate(w*u,h*v); c.rotate(a);
    c.beginPath(); c.roundRect(-w*.1,-w*.1,w*.2,w*.2,6); c.fill(); c.stroke(); c.restore(); }
  ecrire(c,'GLACE',0,-h*.66,w*.17,'#1864ab'); c.restore(); }
/* Une boîte d'appâts (des petites crevettes dans une barquette) : (x, yBas) ; w */
function appatsCe2E(c,x,yBas,w=190,{z=1,lueur=0,T=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const s=Math.min(1.15,z); c.scale(s,s); const h=w*.5;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-h*.6,w*.7,h*1.1,0,0,7); c.fill(); }
  for(let j=0;j<4;j++) crevetteE(c,-w*.3+j*w*.2,-h*.95,w*.26,{T,k:j,dir:j%2?-1:1});
  c.fillStyle='#69db7c'; c.strokeStyle='#2b8a3e'; c.lineWidth=4; c.beginPath(); c.moveTo(-w/2,-h); c.lineTo(w/2,-h); c.lineTo(w*.42,0); c.lineTo(-w*.42,0); c.closePath(); c.fill(); c.stroke();
  ecrire(c,'APPÂTS',0,-h*.5,w*.15,'#1b4332'); c.restore(); }
/* Un filet de pêche neuf, plié (des mailles, une corde, deux flotteurs de liège) : (x, yBas) ; w */
function filetCe2E(c,x,yBas,w=260,{z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const s=Math.min(1.15,z); c.scale(s,s); const h=w*.62;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-h*.5,w*.7,h*.75,0,0,7); c.fill(); }
  c.fillStyle='rgba(32,201,151,.25)'; c.beginPath(); c.moveTo(-w/2,-h*.2); c.quadraticCurveTo(-w*.45,-h,0,-h); c.quadraticCurveTo(w*.45,-h,w/2,-h*.2); c.lineTo(w*.46,0); c.lineTo(-w*.46,0); c.closePath(); c.fill();
  c.save(); c.clip(); c.strokeStyle='#0ca678'; c.lineWidth=2.5;
  for(let u=-w;u<w;u+=w*.09){ c.beginPath(); c.moveTo(u,0); c.lineTo(u+h,-h); c.stroke(); c.beginPath(); c.moveTo(u,0); c.lineTo(u-h,-h); c.stroke(); } c.restore();
  c.strokeStyle='#8a5a2b'; c.lineWidth=7; c.beginPath(); c.moveTo(-w/2,-h*.2); c.quadraticCurveTo(-w*.45,-h,0,-h); c.quadraticCurveTo(w*.45,-h,w/2,-h*.2); c.stroke();
  c.fillStyle='#e8b05c'; c.strokeStyle='#8a5a2b'; c.lineWidth=3; for(const u of [-.25,.25]){ c.beginPath(); c.ellipse(w*u,-h*.9,w*.06,w*.04,0,0,7); c.fill(); c.stroke(); }
  c.restore(); }
/* Un citron : (x, y) = le centre ; r */
function citronCe2E(c,x,y,r=40,{z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); const s=Math.min(1.15,z); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(0,0,r*1.5,0,7); c.fill(); }
  c.fillStyle='#ffe066'; c.strokeStyle='#f59f00'; c.lineWidth=4; c.beginPath(); c.ellipse(0,0,r*1.15,r*.85,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#f59f00'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*r*1.15,0,r*.14,0,7); c.fill(); }
  c.fillStyle='#51cf66'; c.beginPath(); c.ellipse(r*.4,-r*.85,r*.35,r*.14,-.4,0,7); c.fill();
  c.restore(); }
/* Une glace en cornet (deux boules) : (x, yBas) = la pointe du cornet ; h ; k choisit les parfums */
function cornetCe2E(c,x,yBas,h=150,{z=1,k=0,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); const s=Math.min(1.15,z); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-h*.6,h*.45,h*.65,0,0,7); c.fill(); }
  const P=[['#ffc9c9','#fa5252'],['#d3f9d8','#40c057'],['#fff3bf','#fab005'],['#e5dbff','#7950f2']];
  const [a,b]=[P[k%4],P[(k+1)%4]];
  c.fillStyle=b[0]; c.strokeStyle=b[1]; c.lineWidth=3; c.beginPath(); c.arc(0,-h*.82,h*.2,0,7); c.fill(); c.stroke();
  c.fillStyle=a[0]; c.strokeStyle=a[1]; c.beginPath(); c.arc(0,-h*.58,h*.24,0,7); c.fill(); c.stroke();
  c.fillStyle='#e8b05c'; c.strokeStyle='#8a5a2b'; c.beginPath(); c.moveTo(-h*.24,-h*.52); c.lineTo(h*.24,-h*.52); c.lineTo(0,0); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(138,90,43,.6)'; c.lineWidth=2; c.beginPath(); for(const u of [-.12,0,.12]){ c.moveTo(-h*.2+h*(u+.12),-h*.52); c.lineTo(h*u*.4,-h*.08); } c.stroke();
  c.restore(); }
/* Une craie blanche (dans la main d'Idriss) : (x, y) le centre ; a l'angle */
function craieCe2E(c,x,y,L=46,a=-.6){ c.save(); c.translate(x,y); c.rotate(a); c.fillStyle='#f8f9fa'; c.strokeStyle='#adb5bd'; c.lineWidth=2;
  c.beginPath(); c.roundRect(-L/2,-L*.13,L,L*.26,4); c.fill(); c.stroke(); c.restore(); }
/* La main tendue (bras « montre ») d'Idriss dessiné par idrissE(c, x, yBas, s, {montre:1}) */
const mainIdrissCe2E=(x,yBas,s)=>[x+161*s,yBas-238*s];
/* Un trait qui barre (rouge) : de a à b, u (0 → 1) */
function barreCe2E(c,a,b,u=1,coul=CRAIE.faux){ if(u<=0) return; c.strokeStyle=coul; c.lineWidth=9; c.lineCap='round';
  c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(a[0]+(b[0]-a[0])*Math.min(1,u),a[1]+(b[1]-a[1])*Math.min(1,u)); c.stroke(); c.lineCap='butt'; }
/* Une plaque d'étiquette sombre avec un texte (pour un calcul posé sur un dessin) */
function plaqueCe2E(c,txt,x,y,taille,T,t0,coul=CRAIE.jaune){ if(T<t0) return; const k=zoom(T,t0,.4);
  c.font=`800 ${taille*k}px "Segoe UI"`; const w=c.measureText(txt).width+taille*.8;
  c.fillStyle='rgba(31,59,44,.92)'; c.beginPath(); c.roundRect(x-w/2,y-taille*.75*k,w,taille*1.45*k,16); c.fill();
  c.strokeStyle=coul; c.lineWidth=3; c.stroke(); ecrire(c,txt,x,y,taille*k,coul); }
/* Une petite ardoise de prix (cadre de bois) avec UN prix à virgule bien lisible (couleurs de prixVCe2E) : (x, y) le centre */
function ardoiseVCe2E(c,txt,x,y,taille=64,{z=1,lueur=0,une=null}={}){ if(z<=0) return; c.save(); c.translate(x,y); const s=Math.min(1.12,z); c.scale(s,s);
  c.font=`800 ${taille}px "Segoe UI"`; const w=Math.max(taille*2.2,c.measureText(txt).width+taille*1.1), h=taille*1.6;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.42*lueur})`; c.beginPath(); c.roundRect(-w/2-22,-h/2-22,w+44,h+44,22); c.fill(); }
  c.fillStyle='#212529'; c.strokeStyle='#8a5a2b'; c.lineWidth=10; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,12); c.fill(); c.stroke();
  prixVCe2E(c,txt,0,2,taille,{une}); c.restore(); }
/* Une droite des prix (rendre la monnaie) : pts = [[x, '3,90 €'], [x, '4 €'], …] sur la ligne y ; hi = { indice: couleur } ; z = l'apparition */
function droitePrixCe2E(c,pts,y,{taille=44,z=1,hi={}}={}){ if(z<=0) return; c.save(); c.globalAlpha=Math.min(1,z);
  c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.beginPath(); c.moveTo(pts[0][0]-34,y); c.lineTo(pts[pts.length-1][0]+34,y); c.stroke();
  pts.forEach(([x,txt],k)=>{ c.beginPath(); c.moveTo(x,y-14); c.lineTo(x,y+14); c.stroke(); prixVCe2E(c,txt,x,y+46,taille,{une:hi[k]||null}); });
  c.restore(); }
/* Un bond sur la droite des prix, de x0 à x1 (au-dessus de la ligne y), dessiné de t0 à t0 + 0,6 s ; le texte (« + 40 c ») paraît à tTxt */
function bondCe2E(c,T,x0,x1,y,t0,tTxt,txt,h=60,coul='#74c0fc',taille=46){ if(T<t0) return;
  arcSautE(c,[x0,y-16],[x1,y-16],entreE(T,t0,t0+.6),h,coul);
  if(T>=tTxt) prixVCe2E(c,txt,(x0+x1)/2,y-16-h-30,taille,{z:zoom(T,tTxt,.4),une:coul}); }
