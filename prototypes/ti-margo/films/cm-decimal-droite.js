/* Série CM1 / CM2 « Placer un nombre décimal sur une droite graduée » (micro decimal_droite des deux classes).
   Un seul film, le même pour le CM1 et le CM2 : aucune classe écrite à l'écran. Ceinture blanche.
   ÉPISODE « bus » : Ti Margo conduit le bus ; l'école est à 0,7 km. Il compte 7 TRAITS (le trait du départ
   compris) et s'arrête à 0,6. On recommence en comptant les SAUTS de 0,1 depuis 0 : 7 sauts, 0,7.
   Même méthode que le coach (decimal-droite.gen.ts) et que la paysage (Inès, conductrice de bus) :
   je pars de l'entier, je compte les sauts, pas le trait du départ.
   Les outils viennent de films/decimaux.js (copiés : cette série ne charge pas decimaux.js). */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ----
   Un décimal écrit « 0,7 » consomme les marques « 0 virgule », « 0 virgule », « 7 kilomètre » ;
   si la marque des décimales porte aussi le mot suivant (« 7 kilomètre »), ce mot reste pour le jeton suivant. */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const dec=w.replace(/[.!?:;,]+$/,'').match(/^(\d+),(\d+)$/);
        if(dec){ const e=norme(l[i][1]);
          if(!(e===dec[1]||e.startsWith(dec[1]+'virgule'))) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
          av=A[clip]+l[i][0]; tm.push(av); const lui=l[i][1]; while(i<l.length&&l[i][1]===lui) i++;
          if(i<l.length&&norme(l[i][1])==='virgule') i++;
          if(i>=l.length||norme(l[i][1]).split(/\s+/)[0]!==dec[2]&&!norme(l[i][1]).startsWith(dec[2])) throw new Error(`${clip} : « ${w} » : après la virgule, dit « ${l[i]&&l[i][1]} »`);
          const d2=l[i][1], suit=toks[k+1]?norme(toks[k+1]):'';
          if(d2.includes(' ')&&suit&&norme(d2).includes(suit)&&l[i+1]&&l[i+1][1]===d2){ i++; return; }
          while(i<l.length&&l[i][1]===d2) i++; return; }
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  /* L'instant du n-ième mot « m » d'un clip */
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  /* Le premier mot « m » dit après l'instant t */
  function apres(clip,m,t){ const c=norme(m); for(const [u,w] of CL[clip]) if(A[clip]+u>t+.01&&w.split(/\s+/).some(x=>norme(x)===c)) return A[clip]+u;
    throw new Error(`${clip} : « ${m} » introuvable après ${t}`); }
  /* Le début de chaque décimal « d virgule … » d'un clip (une marque par nombre dit) */
  function decimaux(clip){ const out=[]; let av=''; for(const [u,w] of CL[clip]){ if(/virgule/.test(w)&&w!==av) out.push(A[clip]+u); av=w; } return out; }
  return {dit,mot,apres,decimaux};
}
function enchainer(depart,liste,DUR,apres={},ecart=.2){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});
function suiteDe(fin,top,fs,...listes){ return listes.map((ph,k)=>groupe(ph[0][0]-.08,k+1<listes.length?listes[k+1][0][0]-.08:fin,top,fs,...ph)); }

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='560px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:44px;top:732px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Film d’animation 3D';
  m.style.cssText='left:176px;right:176px;bottom:36px;text-align:center;font-size:66px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';

/* ---- Le tableau noir ---- */
function poserTableau({L=4.4,H=3,x=0,y=4.5,z=-1.5,res=240,fond='#1f3b2c',bois=0x8a5a2b,pieds=true}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.26,H+.26,.14,4,.05),toon(bois),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  if(pieds) for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(bois),[s*(L/2-.5),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,fond,effacer(){ c.fillStyle=fond; c.fillRect(0,0,cv.width,cv.height); },maj(){ tx.needsUpdate=true; }};
}
const CRAIE={blanc:'#f8f9fa',d:'#ffd43b',ok:'#8ce99a',faux:'#ff8787',saut:'#ffa94d'};
function ecrire(c,s,x,y,taille=84,coul=CRAIE.blanc,align='center'){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };

/* ---- La salle de classe ---- */
function poserClasse(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd9a066})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-12;i<=12;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0xc08550})); l.rotation.x=-Math.PI/2; l.position.set(i*1.1,0,-10); scene3d.add(l); }
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(80,30),new THREE.MeshBasicMaterial({color:0xfff1c9})); mur.position.set(0,15,-4.2); scene3d.add(mur);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(80,.35),new THREE.MeshBasicMaterial({color:0x9c6b3c})); plinthe.position.set(0,.17,-4.18); scene3d.add(plinthe);
  const fen=new THREE.Group(); fen.position.set(-5.3,4.6,-4.15); scene3d.add(fen);
  piece(fen,new RoundedBoxGeometry(2.4,2.8,.1,3,.04),toon(0xffffff),[0,0,0],CONTOUR_FIN);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.5),new THREE.MeshBasicMaterial({color:0x8fd3f4})); ciel.position.z=.06; fen.add(ciel);
  const bureau=new THREE.Group(); bureau.position.set(-2.6,0,-1.6); scene3d.add(bureau);
  piece(bureau,new RoundedBoxGeometry(1.9,.12,.9,3,.03),toon(0xb07a45),[0,1.02,0],CONTOUR_SOMBRE);
  for(const sx of [-1,1]) piece(bureau,new RoundedBoxGeometry(.12,1,.8,2,.02),toon(0x8a5a2b),[sx*.85,.5,0],CONTOUR_SOMBRE);
}

/* Les gestes de Ti Margo */
function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  salut(t,d=1.4){ const e=lisse(t*4)*lisse((d-t)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; },
  oups(){ P.gesteD='ouverte'; P.md.set(.98,2.42,.5); P.mg.set(-.98,2.42,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); P.tetZ=.16+Math.sin(T*2)*.03; P.tetX=-.06; P.paupiere=-1.25; },
  fier(){ P.gesteD='pouce'; P.md.set(.9,2.5+Math.sin(T*4)*.05,.45); P.cd.set(.74,1.8,.14); P.tetZ=-.1; P.tetY=Math.sin(T*2)*.1; }
}; }

/* ---- Le bus en 3D, garé à côté de Ti Margo : ses roues tournent quand le bus de l'ardoise roule ---- */
function poserBus3D({x=1.0,z=.35,s=.92}={}){
  const g=new THREE.Group(); g.position.set(x,0,z); g.scale.setScalar(s); g.rotation.y=-.22; scene3d.add(g);
  const jaune=toon(0xfacc15), vitre=toon(0x9bd7f5), noir=toon(0x1f2937), gris=toon(0x94a3b8);
  piece(g,new RoundedBoxGeometry(1.5,.92,.8,4,.12),jaune,[0,.66,0],CONTOUR_SOMBRE);
  for(let k=0;k<3;k++) piece(g,new RoundedBoxGeometry(.3,.28,.04,2,.04),vitre,[-.5+k*.36,.84,.41],CONTOUR_FIN);
  piece(g,new RoundedBoxGeometry(.04,.36,.62,2,.03),vitre,[.76,.82,0],CONTOUR_FIN);
  piece(g,new RoundedBoxGeometry(.26,.5,.04,2,.03),toon(0xf59f00),[.5,.56,.41],CONTOUR_FIN);
  piece(g,new RoundedBoxGeometry(1.52,.07,.82,2,.02),toon(0x1d4ed8),[0,.42,0],null);
  const phares=[]; for(const sz of [-.26,.26]){ const p=piece(g,new THREE.SphereGeometry(.07,12,10),toon(0xfff3bf),[.76,.4,sz],CONTOUR_FIN); phares.push(p); }
  const roues=[]; for(const sx of [-.45,.45]) for(const sz of [-.4,.4]){ const r=new THREE.Group(); r.position.set(sx,.2,sz); g.add(r);
    const pneu=piece(r,new THREE.CylinderGeometry(.2,.2,.12,20),noir,[0,0,0],CONTOUR_SOMBRE); pneu.rotation.x=Math.PI/2;
    const jante=piece(r,new THREE.BoxGeometry(.24,.05,.14),gris,[0,0,0],null); roues.push(r); }
  return {g,roues,phares};
}

/* ---- La route et la droite graduée, sur l'ardoise : le bus est TOUJOURS au-dessus de son trait ---- */
const X0=58, X1=994, YR=215, YD=488;
const xt=k=>X0+(X1-X0)*k/10;
function busCanvas(c,x,yb,secoue=0){
  const s=x+Math.sin(secoue*60)*4*(secoue>0?1:0);
  c.save(); c.translate(s,yb); c.scale(1.15,1.15);
  c.fillStyle='#facc15'; c.strokeStyle='#0d2b45'; c.lineWidth=5;
  c.beginPath(); c.roundRect(-72,-78,144,66,14); c.fill(); c.stroke();
  c.fillStyle='#9bd7f5'; for(let k=0;k<3;k++){ c.beginPath(); c.roundRect(-62+k*34,-68,26,24,5); c.fill(); }
  c.beginPath(); c.roundRect(46,-68,20,30,5); c.fill();
  c.fillStyle='#1d4ed8'; c.fillRect(-70,-34,140,7);
  c.fillStyle='#1f2937'; for(const wx of [-42,42]){ c.beginPath(); c.arc(wx,-10,15,0,7); c.fill(); }
  c.fillStyle='#94a3b8'; for(const wx of [-42,42]){ c.beginPath(); c.arc(wx,-10,6,0,7); c.fill(); }
  c.restore();
}
function route(c,W){
  c.fillStyle='#475569'; c.fillRect(40,YR-40,W-80,80);
  c.strokeStyle='#f8fafc'; c.lineWidth=5; c.setLineDash([26,20]); c.beginPath(); c.moveTo(50,YR); c.lineTo(W-50,YR); c.stroke(); c.setLineDash([]);
}
function droite(c,a,b){
  c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(X0-40,YD); c.lineTo(X1+40,YD); c.stroke();
  for(let k=0;k<=10;k++){ const h=k%10?22:40; c.lineWidth=k%10?5:8; c.beginPath(); c.moveTo(xt(k),YD-h); c.lineTo(xt(k),YD+h); c.stroke(); }
  ecrire(c,a,xt(0),YD+86,80); ecrire(c,b,xt(10),YD+86,80);
}
function saut(c,k,u,coul){ /* l'arc d'un SAUT du trait k au trait k+1, tracé de 0 à u */
  if(u<=0) return; const xa=xt(k), xb=xt(k+1), xm=(xa+xb)/2, r=(xb-xa)/2;
  c.strokeStyle=coul; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.arc(xm,YD-6,r,Math.PI,Math.PI+Math.PI*Math.min(1,u)); c.stroke();
  if(u>=1){ c.fillStyle=coul; c.beginPath(); c.moveTo(xb,YD-4); c.lineTo(xb-14,YD-24); c.lineTo(xb+10,YD-22); c.fill(); }
}
function curseur(c,x){ c.strokeStyle=CRAIE.d; c.lineWidth=5; c.setLineDash([12,10]); c.beginPath(); c.moveTo(x,YR+42); c.lineTo(x,YD-48); c.stroke(); c.setLineDash([]); }
function panneauEcole(c,x,km,z=1,coul='#ea580c'){
  c.strokeStyle='#cbd5e1'; c.lineWidth=7; c.beginPath(); c.moveTo(x,YR-40); c.lineTo(x,128); c.stroke();
  c.save(); c.translate(x,82); c.scale(z,z);
  c.fillStyle=coul; c.strokeStyle='#f8fafc'; c.lineWidth=5; c.beginPath(); c.roundRect(-112,-60,224,120,16); c.fill(); c.stroke();
  ecrire(c,'École',0,km?-24:0,52,'#fff'); if(km) ecrire(c,km,0,30,48,'#fff');
  c.restore();
}
/* La position du bus (en traits) : il glisse en .35 s vers chaque nouveau trait */
function glisse(T,etapes){ let k=etapes[0][1]; for(let i=1;i<etapes.length;i++){ const [t,v]=etapes[i]; if(T<t) break; const u=lisse((T-t)/.35); k=etapes[i-1][1]+(v-etapes[i-1][1])*u; if(u<1) break; k=v; } return k; }

FILMS['bus']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':19.04,'01-rate':8.06,'02-question':14.75,'02b-reponse':7.03,'03-encore':17.35,'04-commentaire':11.46,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,apres,decimaux}=voixDe(A);
  const [acc,rat,q,r,enc,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  const bus3=poserBus3D();
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tBus=mot('00-accroche','bus'), tEcole=mot('00-accroche','L’école'), t07=mot('00-accroche','0'), tFacile=mot('00-accroche','Facile'),
        tCompte=mot('00-accroche','compte'), tStop=mot('00-accroche','Stop'), tParie=mot('00-accroche','paries');
  const kT=[]; { let t=tCompte+.5; for(let k=1;k<=7;k++){ t=apres('00-accroche',String(k),t); kT.push(t); } }
  const tOups=mot('01-rate','Oups'), tLoin=mot('01-rate','loin'), tTrait=mot('01-rate','trait'), t06=mot('01-rate','0');
  const tRep0=mot('03-encore','repars'), sT=decimaux('03-encore'), tStop2=mot('03-encore','Stop'), tEcole2=mot('03-encore','L’école'), tBravo=mot('03-encore','Bravo');
  const tC3=mot('04-commentaire','3'), tC4=mot('04-commentaire','4'), tCbus=mot('04-commentaire','bus'), tCsauts=mot('04-commentaire','sauts'),
        tCquel=mot('04-commentaire','quel'), tRep=mot('04-commentaire','Réponds');
  if(sT.length!==7) throw new Error('03-encore : 7 décimaux attendus, '+sT.length);
  const gros=T=>T<tEcole-.1;

  /* L'ardoise : en haut la route et le bus, en bas la droite ; le curseur relie le bus à son trait */
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : de 3 à 4, le bus part de 3 et fait 4 sauts ; le nombre reste à l'élève */
      route(c,W); droite(c,T>=tC3?'3':'',T>=tC4?'4':'');
      const pas=[0,1,2,3].map(k=>tCsauts+.05+k*.3);
      pas.forEach((t,k)=>saut(c,k,(T-t)/.28,CRAIE.d));
      const kb=glisse(T,[[0,0],...pas.map((t,k)=>[t,k+1])]);
      if(T>=tCbus){ curseur(c,xt(kb)); busCanvas(c,xt(kb),YR+30); }
      if(T>=tCquel) ecrire(c,'?',xt(4),YD+92,110*Math.max(1,pop(T,tCquel)),CRAIE.d);
      tab.maj(); return; }
    route(c,W); droite(c,'0','1');
    if(T>=enc){ /* on recommence : les SAUTS de 0,1, le nombre sous chaque trait */
      panneauEcole(c,xt(7),'0,7 km',T>=tEcole2?Math.max(1,pop(T,tEcole2,.6)):1,T>=tEcole2?'#2f9e44':'#ea580c');
      sT.forEach((t,k)=>{ saut(c,k,(T-t)/.3,CRAIE.ok); if(T>=t) ecrire(c,'0,'+(k+1),xt(k+1),YD+84,46*Math.max(1,pop(T,t)),CRAIE.ok); });
      const kb=glisse(T,[[0,6],[tRep0,0],...sT.map((t,k)=>[t,k+1])]);
      curseur(c,xt(kb)); busCanvas(c,xt(kb),YR+30);
      if(T>=tBravo){ c.strokeStyle=CRAIE.ok; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(xt(7)+120,60); c.lineTo(xt(7)+150,95); c.lineTo(xt(7)+205,25); c.stroke(); }
      tab.maj(); return; }
    /* l'accroche et le raté : Ti Margo compte les TRAITS, le trait du départ compris */
    if(T>=tEcole) panneauEcole(c,xt(7),T>=t07?'0,7 km':'',T>=t07&&T<t07+.5?pop(T,t07):1);
    kT.forEach((t,k)=>{ if(T>=t) ecrire(c,String(k+1),xt(k),YD-82,66*Math.max(1,pop(T,t)),CRAIE.faux); });
    const kb=glisse(T,[[0,0],...kT.map((t,k)=>[t,k])]);
    curseur(c,xt(kb)); busCanvas(c,xt(kb),YR+30,T>=tOups&&T<tOups+.5?T-tOups:0);
    if(T>=rat){
      if(T>=tLoin){ /* l'écart entre le bus et l'école : une flèche rouge sous la route */
        const u=Math.min(1,(T-tLoin)/.4), xa=xt(6)+8, xb=xa+(xt(7)-xt(6)-16)*u, y=YR+78;
        c.strokeStyle=CRAIE.faux; c.fillStyle=CRAIE.faux; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.moveTo(xa,y); c.lineTo(xb,y); c.stroke();
        if(u>=1){ c.beginPath(); c.moveTo(xb+6,y); c.lineTo(xb-14,y-13); c.lineTo(xb-14,y+13); c.fill(); } }
      if(T>=tTrait){ const u=Math.min(1,(T-tTrait)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=9; c.beginPath(); c.arc(xt(0),YD-30,62*(.6+.4*u),0,7); c.stroke(); }
      if(T>=t06) ecrire(c,'0,6',xt(6),YD+82,58*Math.max(1,pop(T,t06)),CRAIE.faux);
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-rate'), a3=dit('03-encore'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),a0('Aujourd’hui, je conduis le bus.')];
  const groupes=[
    groupe(acc+.1,tEcole-.1,352,62,...salut),
    ...suiteDe(rat,60,60,[a0('L’école est à'),a0('0,7 kilomètre.')],[a0('Facile :'),a0('je compte 7 traits.')],[a0('1, 2, 3, 4, 5, 6, 7.')],[a0('Stop !'),a0('Tu paries que c’est l’école ?')]),
    ...suiteDe(q,60,60,[a1('Oups !'),a1('L’école est plus loin.')],[a1('J’ai compté'),a1('le trait du départ :')],[a1('mon bus est à 0,6.')]),
    ...suiteDe(com,60,58,[a3('Je repars de 0,'),a3('et je compte les sauts :')],[a3('0,1, 0,2, 0,3, 0,4,'),a3('0,5, 0,6, 0,7.')],[a3('Stop ! L’école !')],[a3('Bravo moi !')]),
    ...suiteDe(f,60,58,[a4('À toi : la route va'),a4('de 3 à 4 kilomètres.')],[a4('Le bus part de 3 et'),a4('fait 4 sauts.')],[a4('À quel kilomètre est-il ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Pour aller de 0 à 0,7,'),qd('combien de sauts fait le bus ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Chaque saut vaut 1 dixième.'), r2=rd('7 sauts : 0,7.');

  poserMiniature(outils,acc+1,'L’école est à<br>0,7 km'+PARI,
    `<svg width="300" height="164" viewBox="0 0 420 230"><rect x="6" y="6" width="408" height="218" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
     <line x1="40" y1="150" x2="380" y2="150" stroke="#f8f9fa" stroke-width="6" stroke-linecap="round"/>
     ${Array.from({length:11},(_,k)=>`<line x1="${50+32*k}" y1="${k%10?136:126}" x2="${50+32*k}" y2="${k%10?164:174}" stroke="#f8f9fa" stroke-width="${k%10?4:6}"/>`).join('')}
     ${Array.from({length:7},(_,k)=>`<text x="${50+32*k}" y="112" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ff8787" text-anchor="middle">${k+1}</text>`).join('')}
     <text x="50" y="208" font-family="Segoe UI" font-weight="800" font-size="34" fill="#f8f9fa" text-anchor="middle">0</text>
     <text x="370" y="208" font-family="Segoe UI" font-weight="800" font-size="34" fill="#f8f9fa" text-anchor="middle">1</text>
     <rect x="192" y="34" width="100" height="44" rx="10" fill="#facc15" stroke="#0d2b45" stroke-width="4"/><circle cx="214" cy="80" r="9" fill="#1f2937"/><circle cx="270" cy="80" r="9" fill="#1f2937"/><line x1="242" y1="90" x2="242" y2="122" stroke="#ffd43b" stroke-width="4" stroke-dasharray="7 6"/></svg>`);
  return { clips,FIN,titre:'Le bus rate l’école',ceinture:0,finTitre:tEcole-.1,groupes,finClip:'05-abonne',
    cuts:[tEcole-.1,rat,q,r,enc,com,f],
    tics:[...kT.map(t=>({t,f:990})),{t:tStop,f:330},...sT.map(t=>({t,f:1320})),{t:tStop2,f:330}],
    question:{ qc:'02-question',rc:'02b-reponse',finR:enc,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['6 sauts',tq('A'),tq('6')],['7 sauts',tq('B'),tq('7',2)],['8 sauts',tq('C'),tq('8')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<enc, dansF=T>=f, gr=gros(T);
      tab.g.visible=!gr&&!dansQ&&!dansF&&!window.MINI;
      bus3.g.visible=!dansQ&&!dansF;
      /* les roues du bus 3D tournent quand le bus de l'ardoise roule */
      const roule=(T>=kT[0]&&T<tStop)||(T>=tRep0&&T<tStop2)||(T>=tCsauts&&T<tCsauts+1.4);
      bus3.roues.forEach(w=>w.rotation.z=roule?-T*9:0);
      bus3.phares.forEach(p=>p.scale.setScalar((T>=tStop&&T<tStop+.8)||(T>=tStop2&&T<tStop2+.8)?1+.5*Math.abs(Math.sin(T*14)):1));
      bus3.g.position.y=roule?Math.abs(Math.sin(T*18))*.02:0;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gr){ scene.x=-.62; cam.d=9.8; cam.y=1.9; cam.x=.25; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gr){ T<tBus+1?g.montre():g.ouvre(); }
      else if(T<rat){ if(T<tFacile) g.reflechit(); else if(T<tStop) g.montre(); else g.fier(); }
      else if(T<q){ if(T<tTrait){ g.oups(); scene.ry=-.12+.3*lisse((T-tOups)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<enc){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tBravo) g.fier(); else g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); bus3.g.visible=false; }
    } };
};
