/* Série Calcul posé 6e : les 5 shorts. Outils communs, puis FILMS.addition (épisode 01).
   Les autres épisodes vivent dans films/calcul-pose-<épisode>.js et réutilisent ces outils.
   Modèle : films/decimaux.js (voix mot à mot, ardoise, miniature, gestes), sans la virgule.
   Code couleur des rangs, le même que dans les paysages (calcul_pose_commun.py) :
   unités bleues, dizaines ambre, centaines roses, milliers violets ; retenues orange. */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ---- */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    f.jusque=m=>{ const c=norme(m); while(i<l.length&&norme(l[i][1].split(/\s+/)[0])!==c) i++; return f; };
    return f; }
  /* L'instant du n-ième mot « m » d'un clip (un instant « 7 plus » compte pour « 7 » et pour « plus ») */
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  /* L'instant de la k-ième marque du clip (0 = la première) */
  const marque=(clip,k)=>A[clip]+CL[clip][k][0];
  return {dit,mot,marque};
}
/* Enchaîne les clips : durée lue sur le WAV ; attente supplémentaire après certains clips */
function enchainer(depart,liste,DUR,apres={},ecart=.2){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});
/* Une suite de légendes : chacune paraît à son premier mot et reste jusqu'à la suivante */
function suiteDe(fin,top,fs,...listes){ return listes.map((ph,k)=>groupe(ph[0][0]-.08,k+1<listes.length?listes[k+1][0][0]-.08:fin,top,fs,...ph)); }

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention « Dessin animé » ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='560px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:28px;top:740px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
  m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';
/* Le dessin de la miniature : une petite ardoise avec un calcul (lignes de texte) */
function ardoiseMini(lignes,w=330,h=250){ const pas=(h-40)/lignes.length;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><rect x="6" y="6" width="${w-12}" height="${h-12}" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    lignes.map(([s,coul],k)=>`<text x="${w/2}" y="${30+pas*(k+.78)}" font-family="Segoe UI" font-weight="800" font-size="${Math.min(84,pas*.92,(w-40)/(s.length*.56))}" fill="${coul||'#f8f9fa'}" text-anchor="middle">${s}</text>`).join('')+'</svg>'; }

/* ---- Le tableau noir : une ardoise face caméra, écrite à la craie à chaque image ---- */
function poserTableau({L=4.4,H=3,x=0,y=4.5,z=-1.5,res=240,fond='#1f3b2c',bois=0x8a5a2b,pieds=true}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.26,H+.26,.14,4,.05),toon(bois),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  if(pieds) for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(bois),[s*(L/2-.5),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,fond,effacer(){ c.fillStyle=fond; c.fillRect(0,0,cv.width,cv.height); },maj(){ tx.needsUpdate=true; }};
}
/* Les craies : blanc, une couleur par rang (0 unités, 1 dizaines, 2 centaines, 3 milliers), la retenue */
const CRAIE={blanc:'#f8f9fa',r0:'#74c0fc',r1:'#ffc078',r2:'#faa2c1',r3:'#b197fc',ret:'#ff922b',ok:'#8ce99a',faux:'#ff8787',jaune:'#ffd43b',gris:'#adb5bd'};
const NOM_RANG=['u','d','c','m'];
function ecrire(c,s,x,y,taille=84,coul=CRAIE.blanc,align='center'){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
/* Grandit puis retombe à sa taille : pour insister sur ce que la voix dit */
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };
/* 0 avant t, puis un pop atténué (k) qui retombe à 1 */
const zoom=(T,t,k=.5)=>T<t?0:Math.max(1,pop(T,t)*k+(1-k));
function coche(c,x,y,s=1){ c.strokeStyle=CRAIE.ok; c.lineWidth=18*s; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x+40*s,y+50*s); c.lineTo(x+130*s,y-60*s); c.stroke(); }
function cercle(c,x,y,r,coul=CRAIE.faux,u=1){ c.strokeStyle=coul; c.lineWidth=10; c.beginPath(); c.arc(x,y,r*(.6+.4*Math.min(1,u)),0,7); c.stroke(); }

/* ---- L'opération posée, à la craie ----
   o.xu : centre de la colonne des unités ; o.y0 : centre de la 1re ligne ; o.w, o.h : colonne, ligne ; o.ft : taille.
   o.n : nombre de colonnes ; o.lignes : [{txt, z (nombre ou fonction du rang), coul (idem)}] ;
   o.signe ('+', '−', '×') sur la dernière ligne ; o.res : {txt, z, coul} sous la barre ;
   o.ret : {rang: {txt, z}} retenues orange au-dessus ; o.cadre : {rang: couleur} colonne encadrée ;
   o.entetes : initiales des rangs au-dessus (u, d, c). Renvoie les positions utiles. */
function poser(c,o){
  const {xu,y0,w=150,h=135,ft=118,n=2,lignes=[],signe='+',res=null,ret={},cadre={},entetes=true,barre=1}=o;
  const X=k=>xu-k*w, yRet=y0-h*.74, yEnt=y0-h*1.3;
  const val=(v,k,def)=>typeof v==='function'?v(k):(v===undefined?def:v);
  for(const k in cadre){ if(!cadre[k]) continue; const x=X(+k); c.strokeStyle=cadre[k]; c.lineWidth=9; c.setLineDash([]);
    c.beginPath(); c.roundRect(x-w*.46,y0-h*.96,w*.92,(lignes.length+(res?1:0))*h+h*.82,22); c.stroke(); }
  if(entetes) for(let k=0;k<n;k++) ecrire(c,NOM_RANG[k],X(k),yEnt,ft*.42,CRAIE['r'+k]);
  const chiffres=(txt,y,z,coul)=>{ const s=String(txt); for(let j=0;j<s.length;j++){ const k=s.length-1-j, zk=val(z,k,1); if(zk>0) ecrire(c,s[j],X(k),y,ft*zk,val(coul,k,CRAIE['r'+k]||CRAIE.blanc)); } };
  lignes.forEach((L,i)=>chiffres(L.txt,y0+i*h,L.z,L.coul));
  const yBar=y0+(lignes.length-.5)*h+8, xg=X(n-1)-w*.95;
  if(signe&&lignes.length>1) ecrire(c,signe,xg+w*.22,y0+(lignes.length-1)*h,ft*.9,CRAIE.blanc);
  if(barre>0){ c.strokeStyle=CRAIE.blanc; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(xg-10,yBar); c.lineTo(xg-10+(xu+w*.55-xg+10)*Math.min(1,barre),yBar); c.stroke(); }
  if(res) chiffres(res.txt,yBar+h*.55,res.z,res.coul??CRAIE.blanc);
  for(const k in ret){ const r=ret[k], z=r.z??1; if(z<=0) continue;
    const x=X(+k)-w*.36, y=yRet; c.fillStyle=CRAIE.ret; c.beginPath(); c.arc(x,y,ft*.34*z,0,7); c.fill();
    ecrire(c,r.txt,x,y+3,ft*.52*z,r.coul||'#1f3b2c'); }
  return {X,yBar,yRes:yBar+h*.55,yRet,xg};
}

/* ---- La salle de classe : parquet, mur, fenêtre, bureau, plante ---- */
function poserClasse(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd9a066})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(let i=-12;i<=12;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0xc08550})); l.rotation.x=-Math.PI/2; l.position.set(i*1.1,0,-10); scene3d.add(l); }
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(80,30),new THREE.MeshBasicMaterial({color:0xfff1c9})); mur.position.set(0,15,-4.2); scene3d.add(mur);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(80,.35),new THREE.MeshBasicMaterial({color:0x9c6b3c})); plinthe.position.set(0,.17,-4.18); scene3d.add(plinthe);
  const fen=new THREE.Group(); fen.position.set(-5.3,4.6,-4.15); scene3d.add(fen);
  piece(fen,new RoundedBoxGeometry(2.4,2.8,.1,3,.04),toon(0xffffff),[0,0,0],CONTOUR_FIN);
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(2.1,2.5),new THREE.MeshBasicMaterial({color:0x8fd3f4})); ciel.position.z=.06; fen.add(ciel);
  piece(fen,new THREE.BoxGeometry(.08,2.5,.04),toon(0xffffff),[0,0,.08],null); piece(fen,new THREE.BoxGeometry(2.1,.08,.04),toon(0xffffff),[0,0,.08],null);
  const bureau=new THREE.Group(); bureau.position.set(-2.6,0,-1.6); scene3d.add(bureau);
  piece(bureau,new RoundedBoxGeometry(1.9,.12,.9,3,.03),toon(0xb07a45),[0,1.02,0],CONTOUR_SOMBRE);
  for(const sx of [-1,1]) piece(bureau,new RoundedBoxGeometry(.12,1,.8,2,.02),toon(0x8a5a2b),[sx*.85,.5,0],CONTOUR_SOMBRE);
  piece(bureau,new RoundedBoxGeometry(.5,.08,.36,2,.02),toon(0xe03131),[-.3,1.12,0],CONTOUR_FIN);
  piece(bureau,new RoundedBoxGeometry(.46,.08,.34,2,.02),toon(0x1971c2),[-.28,1.2,0],CONTOUR_FIN);
  const pot=new THREE.Group(); pot.position.set(3.1,0,-2.2); scene3d.add(pot);
  piece(pot,new THREE.CylinderGeometry(.32,.24,.55,14),toon(0xd9480f),[0,.27,0],CONTOUR_FIN);
  for(let i=0;i<5;i++) piece(pot,new THREE.SphereGeometry(.3,12,10),toon(0x37b24d),[Math.cos(i*1.3)*.22,.8+i*.12,Math.sin(i*1.3)*.12],CONTOUR_FIN);
  return {bureau,pot,fen};
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
/* Le plan commun : gros plan au début, ardoise pendant l'histoire, plan large pour la question et la fin */
function cadrer(cam,{gros,large}){ scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
  if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
  if(large){ scene.x=-.1; cam.d=11.4; cam.y=3.55; } }
function cssCartes(){ const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css); }

/* Un sac de billes à la craie : le sac, des billes qui dépassent, le nombre écrit dessus */
function sacCraie(c,x,y,txt,z=1){ if(z<=0) return; const K=['#74c0fc','#ff8787','#8ce99a','#ffd43b','#b197fc'];
  K.forEach((k,i)=>{ c.fillStyle=k; c.beginPath(); c.arc(x+(i-2)*30,y-92-(i%2)*14,18,0,7); c.fill(); });
  c.fillStyle='#c08a4a'; c.strokeStyle='#7a4a1c'; c.lineWidth=7; c.beginPath();
  c.moveTo(x-80,y-80); c.quadraticCurveTo(x-125,y+20,x-95,y+80); c.lineTo(x+95,y+80); c.quadraticCurveTo(x+125,y+20,x+80,y-80); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='#7a4a1c'; c.lineWidth=9; c.beginPath(); c.moveTo(x-82,y-72); c.lineTo(x+82,y-72); c.stroke();
  ecrire(c,txt,x,y+12,82*z,'#fff3bf'); }

/* ============================================================
   ÉPISODE 01 : LA RETENUE OUBLIÉE. 47 billes + 38 billes : Ti Margo trouve 75.
   Il vérifie à l'ordre de grandeur (50 + 40 = 90) : la retenue manque, c'est 85.
   ============================================================ */
FILMS.addition=function(outils){
  const DUR={'00-accroche':16.55,'01-verif':16.77,'02-question':13.37,'02b-reponse':12.1,'03-ouf':6.75,'04-commentaire':6.42,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les instants */
  const t47=mot('00-accroche','47'), tMon=mot('00-accroche','Mon'), t38=mot('00-accroche','38'), t7p=mot('00-accroche','7'), t8=mot('00-accroche','8'),
        t15=mot('00-accroche','15'), t5=mot('00-accroche','5'), t4p=mot('00-accroche','4'), t3=mot('00-accroche','3'), t7=mot('00-accroche','7',3),
        t75=mot('00-accroche','75'), tParie=mot('00-accroche','paries');
  const tV=mot('01-verif','vérifie'), tV47=mot('01-verif','47'), tV50=mot('01-verif','50'), tV38=mot('01-verif','38'), tV40=mot('01-verif','40'),
        tVp=mot('01-verif','50',2), tV90=mot('01-verif','90'), tV75=mot('01-verif','75'), tLoin=mot('01-verif','loin'), tProb=mot('01-verif','problème');
  const tO85=mot('03-ouf','85'), tO90=mot('03-ouf','90'), tOuf=mot('03-ouf','Ouf'), tRet=mot('03-ouf','retenue');
  const t56=mot('04-commentaire','56'), t27=mot('04-commentaire','27'), tRep=mot('04-commentaire','Réponds');

  const XU=760, Y0=250; /* la pose, à droite de l'ardoise ; les billes à gauche */
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 56 + 27, la réponse reste à l'élève */
      poser(c,{xu:W/2+75,y0:Y0,lignes:[{txt:'56',z:T>=t56?zoom(T,t56):0},{txt:'27',z:T>=t27?zoom(T,t27):0}],signe:T>=t27?'+':'',barre:T>=t27?1:0});
      if(T>=tRep) ecrire(c,'?',W/2+75-75,Y0+2*135+60,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la bonne pose : la retenue est là, 85, tout près de 90 */
      const p=poser(c,{xu:560,y0:Y0,lignes:[{txt:'47'},{txt:'38'}],ret:{1:{txt:'1',z:T>=tRet?Math.max(1,pop(T,tRet)):1}},
        res:{txt:'85',z:T>=tO85?zoom(T,tO85,.4):0,coul:CRAIE.ok}});
      if(T>=tO90){ ecrire(c,'≈ 90',850,p.yRes,104*zoom(T,tO90,.4),CRAIE.ok); }
      if(T>=tOuf) coche(c,790,p.yRes-170,.8);
      if(T>=tRet) cercle(c,p.X(1)-150*.36,p.yRet,58,CRAIE.ret,(T-tRet)/.4);
      tab.maj(); return; }
    if(T>=ver){ /* la vérification : 50 + 40 = 90, et 75 est trop loin */
      const lg=(txt,y,t,coul)=>{ if(T>=t) ecrire(c,txt,W/2,y,96*zoom(T,t,.4),coul); };
      if(T>=tV47) ecrire(c,'47',W/2-120,95,96*zoom(T,tV47,.4),CRAIE.blanc);
      if(T>=tV50){ ecrire(c,'→',W/2,95,90,CRAIE.gris); ecrire(c,'50',W/2+130,95,96*zoom(T,tV50,.4),CRAIE.jaune); }
      if(T>=tV38) ecrire(c,'38',W/2-120,220,96*zoom(T,tV38,.4),CRAIE.blanc);
      if(T>=tV40){ ecrire(c,'→',W/2,220,90,CRAIE.gris); ecrire(c,'40',W/2+130,220,96*zoom(T,tV40,.4),CRAIE.jaune); }
      if(T>=tVp){ c.strokeStyle=CRAIE.gris; c.lineWidth=6; c.beginPath(); c.moveTo(W/2-300,290); c.lineTo(W/2+300,290); c.stroke(); }
      if(T>=tVp) ecrire(c,'50 + 40',W/2-110,370,96,CRAIE.jaune);
      if(T>=tV90) ecrire(c,'= 90',W/2+210,370,96*zoom(T,tV90,.4),CRAIE.ok);
      lg('75',540,tV75,T>=tLoin?CRAIE.faux:CRAIE.blanc);
      if(T>=tLoin){ ecrire(c,'trop loin de 90',W/2,640,64,CRAIE.faux); }
      if(T>=tProb) ecrire(c,'?!',W/2+150,540,120*zoom(T,tProb,.4),CRAIE.faux);
      tab.maj(); return; }
    /* l'accroche : les deux tas de billes, l'addition posée sans la retenue */
    sacCraie(c,190,190,'47',zoom(T,t47,.4));
    sacCraie(c,190,530,'38',zoom(T,t38,.4));
    const enU=T>=t7p&&T<t4p, enD=T>=t4p&&T<t75;
    const p=poser(c,{xu:XU,y0:Y0,lignes:[{txt:'47',z:T>=t47?1:0},{txt:'38',z:T>=t38?1:0}],signe:T>=t38?'+':'',barre:T>=t38?1:0,
      cadre:{0:enU?CRAIE.r0:null,1:enD?CRAIE.r1:null},
      res:{txt:'75',z:k=>k===0?(T>=t5?zoom(T,t5,.4):0):(T>=t7?zoom(T,t7,.4):0),coul:T>=t75?CRAIE.blanc:undefined}});
    /* « 15 » s'écrit à côté ; le 5 descend dans la colonne ; le 1 reste seul, oublié */
    if(T>=t15&&T<t75){ const u=T>=t5?lisse((T-t5)/.5):0;
      ecrire(c,'1',XU+170,Y0+50,80,T>=t5?CRAIE.gris:CRAIE.blanc);
      if(u<1) ecrire(c,'5',XU+225-(225)*u,Y0+50+(p.yRes-Y0-50)*u,80*(1+.45*u),CRAIE.blanc); }
    if(T>=t75){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.roundRect(XU-235,p.yRes-75,310,150,24); c.stroke(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verif'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tMon-.08,352,62,a0('Salut !'),a0('J’ai 47 billes.')),
    ...suiteDe(ver,60,62,[a0('Mon copain'),a0('m’en donne 38.')],[a0('7 + 8 = 15 :'),a0('j’écris 5.')],[a0('4 + 3 = 7.')],[a0('J’ai 75 billes !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,62,[a1('Je vérifie.')],[a1('47, c’est presque 50.')],[a1('38, c’est presque 40.')],[a1('50 + 40 = 90.')],[a1('75, c’est trop loin !')],[a1('Il y a un problème.')]),
    ...suiteDe(com,60,62,[a3('85, c’est bien'),a3('près de 90.')],[a3('Ouf, j’ai retrouvé'),a3('ma retenue !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien font'),a4('56 + 27 ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien ai-je de billes ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('7 + 8 = 15 :'), r2=rd('j’écris 5,'), r3=rd('et je retiens 1.'), r4=rd('1 + 4 + 3 = 8.'), r5=rd('Ça fait 85.');
  const tC=mot('02b-reponse','C');

  poserMiniature(outils,acc+1,'47 billes<br>+ 38 billes'+PARI,ardoiseMini([['47 + 38'],['= 75 ?','#ff8787']],320,240));
  return { clips,FIN,titre:'La retenue oubliée',ceinture:1,finTitre:tMon-.08,groupes,finClip:'05-abonne',
    cuts:[tMon-.08,ver,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['75',tq('A'),tq('75')],['715',tq('B'),tq('715')],['85',tq('C'),tq('85')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3],suite:[r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tMon-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ if(T<t7p) g.montre(); else if(T<t75) g.reflechit(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T>=tLoin){ g.oups(); scene.ry=-.12+.3*lisse((T-tLoin)/.35); } else if(T>=tV) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
