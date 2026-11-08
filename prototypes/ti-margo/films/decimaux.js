/* Série Nombres décimaux 6e : les 12 shorts. Outils communs, puis FILMS["lire-ecrire"] (épisode 01).
   Les autres épisodes vivent dans films/decimaux-<épisode>.js et réutilisent ces outils.
   Modèle : films/triangles.js (voix mot à mot, tableau, miniature, gestes). */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ----
   ⭐ Les décimaux : la voix dit « 3 virgule 05 », les instants arrivent en « 3 virgule », « 3 virgule »,
   « 05 », « 05 ». Écrit « 3,05 », le nombre consomme toutes ces marques et prend l'instant du premier mot. */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const dec=w.replace(/[.!?:;]+$/,'').match(/^(\d+),(\d+)$/);
        if(dec){ const e=norme(l[i][1]);
          if(!(e===dec[1]||e.startsWith(dec[1]+'virgule'))) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
          av=A[clip]+l[i][0]; tm.push(av); const lui=l[i][1]; while(i<l.length&&l[i][1]===lui) i++;
          if(i<l.length&&norme(l[i][1])==='virgule') i++;
          if(i>=l.length||norme(l[i][1]).split(/\s+/)[0]!==dec[2]&&!norme(l[i][1]).startsWith(dec[2])) throw new Error(`${clip} : « ${w} » : après la virgule, dit « ${l[i]&&l[i][1]} »`);
          const d2=l[i][1]; while(i<l.length&&l[i][1]===d2) i++; return; }
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
  return {dit,mot};
}
/* Enchaîne les clips : durée lue sur le WAV ; attente supplémentaire après certains clips */
function enchainer(depart,liste,DUR,apres={},ecart=.2){ let t=depart; return liste.map(c=>{ const r=[c,+t.toFixed(2)]; t+=DUR[c]+(apres[c]??ecart); return r; }); }
const groupe=(de,a,top,fs,...phrases)=>({de,a,top,fs,phrases});
/* Une suite de légendes : chacune paraît à son premier mot et reste jusqu'à la suivante */
function suiteDe(fin,top,fs,...listes){ return listes.map((ph,k)=>groupe(ph[0][0]-.08,k+1<listes.length?listes[k+1][0][0]-.08:fin,top,fs,...ph)); }

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='560px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:44px;top:732px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
  m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';

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
/* Les craies : blanc, et une couleur par rang (les mêmes que dans les paysages) */
const CRAIE={blanc:'#f8f9fa',u:'#74c0fc',d:'#ffd43b',c:'#faa2c1',m:'#b197fc',ok:'#8ce99a',faux:'#ff8787',virgule:'#ff6b6b'};
function ecrire(c,s,x,y,taille=84,coul=CRAIE.blanc,align='center'){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign=align; c.textBaseline='middle'; c.fillText(s,x,y); }
/* Grandit puis retombe à sa taille : pour insister sur ce que la voix dit */
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };
/* Le tableau de numération à la craie. rangs : [['Unités','u'],…] ; la virgule après le 1er rang.
   etat(i) → {chiffre, coul, z (pop), dy (chute), cadre (couleur du cadre), vide} */
function cases(c,rangs,x0,y0,w=250,h=200,etat=()=>({}),ft=48){
  rangs.forEach(([nom,k],i)=>{ const x=x0+i*w, e=etat(i)||{};
    ecrire(c,nom,x+w/2,y0-34,ft,CRAIE[k]);
    c.strokeStyle=e.cadre||CRAIE[k]; c.lineWidth=e.cadre?12:7; c.setLineDash(e.vide?[22,16]:[]); c.strokeRect(x+8,y0,w-16,h); c.setLineDash([]);
    if(e.chiffre!==undefined&&e.z>0) ecrire(c,String(e.chiffre),x+w/2,y0+h/2+(e.dy||0),150*e.z,e.coul||CRAIE[k]);
    if(e.mot) ecrire(c,e.mot,x+w/2,y0+h/2,56,CRAIE.faux); });
  c.fillStyle=CRAIE.virgule; c.beginPath(); c.arc(x0+w,y0+h-26,15,0,7); c.fill();
  c.strokeStyle=CRAIE.virgule; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(x0+w+6,y0+h-20); c.lineTo(x0+w-8,y0+h+8); c.stroke();
}
const RANGS3=[['Unités','u'],['Dixièmes','d'],['Centièmes','c']];
const RANGS4=[['Unités','u'],['Dixièmes','d'],['Centièmes','c'],['Millièmes','m']];

/* ---- La salle de classe : parquet, mur, fenêtre, bureau, plante ---- */
function poserClasse(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd9a066})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const lames=[]; for(let i=-12;i<=12;i++){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.04,60),new THREE.MeshBasicMaterial({color:0xc08550})); l.rotation.x=-Math.PI/2; l.position.set(i*1.1,0,-10); scene3d.add(l); lames.push(l); }
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

/* ============================================================
   ÉPISODE 01 : LA DICTÉE. Trois unités et cinq centièmes : 3,5 ? Non, 3,05.
   ============================================================ */
FILMS['lire-ecrire']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':12.57,'01-cases':11.61,'02-question':14.52,'02b-reponse':6.51,'03-encore':10.05,'04-commentaire':6.63,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-cases','02-question','02b-reponse','03-encore','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cas,q,r,enc,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const t35=mot('00-accroche','3'), tFacile=mot('00-accroche','Facile'), tParie=mot('00-accroche','paries'), tTrois=mot('00-accroche','Trois');
  const tU=mot('01-cases','Unités'), tU3=mot('01-cases','3'), tD=mot('01-cases','Dixièmes'), tD5=mot('01-cases','5'), tC=mot('01-cases','Centièmes'),
        tVide=mot('01-cases','vide'), tOups=mot('01-cases','Oups'), tTombe=mot('01-cases','tombé'), tDix=mot('01-cases','dixièmes',2);
  const tDeux=mot('03-encore','Deux'), tSept=mot('03-encore','sept'), t27=mot('03-encore','2'), tAtt=mot('03-encore','attention'), tBravo=mot('03-encore','Bravo');
  const tQ1=mot('04-commentaire','quatre'), tQ2=mot('04-commentaire','quatre',2), tMil=mot('04-commentaire','millièmes'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : quatre rangs, rien de rempli (la réponse reste à l'élève) */
      if(T>=tQ1) ecrire(c,'4 unités',W/2,70,66*Math.max(1,pop(T,tQ1)),CRAIE.u);
      if(T>=tQ2) ecrire(c,'et 4 millièmes',W/2,165,66*Math.max(1,pop(T,tQ2)),CRAIE.m);
      cases(c,RANGS4,48,270,240,200,()=>({}),40);
      if(T>=tRep) ecrire(c,'= ?',W/2,640,96*Math.max(1,pop(T,tRep)),CRAIE.d);
      tab.maj(); return; }
    if(T>=enc){ /* deux unités et sept dixièmes : juste, cette fois */
      cases(c,RANGS3,153,250,250,210,i=>i===0?{chiffre:2,z:T>=tDeux?Math.max(1,pop(T,tDeux)):0}:i===1?{chiffre:7,z:T>=tSept?Math.max(1,pop(T,tSept)):0}:{});
      if(T>=t27) ecrire(c,'2,7',W/2,600,130*Math.max(1,pop(T,t27)),CRAIE.ok);
      if(T>=tBravo){ c.strokeStyle=CRAIE.ok; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(W/2+150,600); c.lineTo(W/2+190,640); c.lineTo(W/2+270,550); c.stroke(); }
      tab.maj(); return; }
    if(T>=cas){ /* on vérifie avec les cases : le 5 tombe chez les dixièmes */
      ecrire(c,'3,5',W/2,95,110,T>=tOups?CRAIE.faux:CRAIE.blanc);
      const chute=u=>-260*(1-lisse(u));
      cases(c,RANGS3,153,250,250,210,i=>{
        if(i===0) return {chiffre:3,z:T>=tU3?Math.max(1,pop(T,tU3)):0,cadre:T>=tU&&T<tD?CRAIE.u:null};
        if(i===1) return {chiffre:5,z:T>=tD5?1:0,dy:chute((T-tD5)/.45),coul:T>=tTombe?CRAIE.faux:CRAIE.d,cadre:(T>=tD&&T<tC)||T>=tTombe?(T>=tTombe?CRAIE.faux:CRAIE.d):null};
        return {vide:T>=tVide,mot:T>=tVide?'vide':null,cadre:T>=tC&&T<tOups?CRAIE.c:null}; });
      if(T>=tTombe){ const u=Math.min(1,(T-tTombe)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.beginPath(); c.arc(153+250*1.5,355,120*(.6+.4*u),0,7); c.stroke(); }
      tab.maj(); return; }
    /* l'accroche : Ti Margo écrit 3,5 en grand */
    if(T>=t35) ecrire(c,'3,5',W/2,H2(c)/2,240*Math.max(1,pop(T,t35)),CRAIE.blanc);
    tab.maj();
  }
  const H2=c=>c.canvas.height;

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-cases'), a3=dit('03-encore'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),a0('Dicte-moi un nombre,'),a0('je l’écris.')];
  const groupes=[
    groupe(acc+.1,tTrois-.08,352,62,...salut),
    ...suiteDe(cas,60,62,[a0('Trois unités et'),a0('cinq centièmes ?')],[a0('Facile : 3,5 !')],[a0('Tu paries que'),a0('c’est juste ?')]),
    ...suiteDe(q,60,58,[a1('On vérifie avec les cases.')],[a1('Unités : 3.'),a1('Dixièmes : 5.'),a1('Centièmes : vide.')],[a1('Oups !')],[a1('Mon 5 est tombé dans'),a1('la case des dixièmes.')]),
    ...suiteDe(com,60,60,[a3('Encore un !')],[a3('Deux unités'),a3('et sept dixièmes.')],[a3('Cette fois,'),a3('je fais attention : 2,7.')],[a3('Bravo moi !')]),
    ...suiteDe(f,60,56,[a4('À toi : écris en chiffres'),a4('quatre unités'),a4('et quatre millièmes.'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Que fallait-il écrire ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Un 0 garde la place'), r2=rd('des dixièmes : 3,05.');

  poserMiniature(outils,acc+1,'Trois unités et<br>cinq centièmes'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="140" font-family="Segoe UI" font-weight="800" font-size="104" fill="#f8f9fa" text-anchor="middle">3,5 ?</text></svg>`);
  return { clips,FIN,titre:'La dictée de nombres',ceinture:0,finTitre:tTrois-.08,groupes,finClip:'05-abonne',
    cuts:[tTrois-.08,cas,q,r,enc,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:enc,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['3,5',tq('A'),tq('3',1)],['3,05',tq('B'),tq('3',3)],['3,50',tq('C'),tq('3',5)]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<enc, dansF=T>=f, gros=T<tTrois-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<cas){ if(T<tFacile) g.reflechit(); else if(T<tParie) g.montre(); else g.fier(); }
      else if(T<q){ if(T>=tOups) { g.oups(); scene.ry=-.12+.3*lisse((T-tOups)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<enc){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tBravo) g.fier(); else if(T>=tAtt-.2) g.montre(); else g.reflechit(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
