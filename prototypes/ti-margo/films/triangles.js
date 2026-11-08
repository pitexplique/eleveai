/* Série Triangles 6e : les 9 shorts. Outils communs, puis un FILMS.<épisode> par film. */

/* ---- La voix : chaque mot écrit prend l'instant exact où il est dit ---- */
function voixDe(A){
  const CL=(window.CUES||{})[VIDEO]||{}, norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,'');
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0;
    const f=txt=>{ const toks=txt.split(' '), tm=[]; let av=null;
      toks.forEach((w,k)=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        const c=norme(l[i][1]); if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; tm.push(av);
        /* « 90 degrés » arrive deux fois ; écrit « 90° », il compte pour un seul mot */
        const suit=toks[k+1]?norme(toks[k+1]):''; const double=l[i+1]&&l[i+1][1]===l[i][1]&&l[i][1].includes(' ');
        i+=double&&!(suit&&norme(l[i+1][1]).includes(suit))?2:1; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
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

/* ---- La miniature : Ti Margo plein cadre, le pari, la ceinture, la mention ---- */
function poserMiniature({$,carte,legende,panneau},t,html,dessin=''){ window.tiMargoMiniature=()=>{ window.MINI=true; window.tiMargo.aller(t);
  carte.style.display='none'; panneau.style.display='none'; $('titre').style.display='none'; $('fin').style.display='none';
  legende.style.cssText+=';display:block;top:60px;left:50px;right:50px;font-size:92px;line-height:1.08;padding:26px;'; legende.innerHTML=html;
  const e=$('echelle'); e.style.display='flex'; e.style.top='500px';
  if(dessin){ const d=document.createElement('div'); d.className='cv'; d.innerHTML=dessin; d.style.cssText='left:44px;top:672px;z-index:4;'; document.body.append(d); }
  const m=document.createElement('div'); m.className='cv'; m.textContent='Dessin animé';
  m.style.cssText='left:250px;right:250px;bottom:36px;text-align:center;font-size:72px;background:#17452a;color:#fff;border-radius:999px;padding:14px 0;z-index:6;'; document.body.append(m); }; }
const PARI='<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>';

/* ---- Le tableau : une planche face caméra, dessinée au trait à chaque image.
   Une figure posée dessus garde sa vraie forme : la caméra ne la déforme pas. ---- */
function poserTableau({L=4.4,H=3,x=0,y=4.5,z=-1.5,res=240,fond='#fffdf5',bois=0xa9713a,pieds=true}={}){
  const g=new THREE.Group(); g.position.set(x,y,z); scene3d.add(g);
  const cv=document.createElement('canvas'); cv.width=Math.round(L*res); cv.height=Math.round(H*res); const c=cv.getContext('2d');
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
  piece(g,new RoundedBoxGeometry(L+.26,H+.26,.14,4,.05),toon(bois),[0,0,-.08],CONTOUR_SOMBRE);
  const face=new THREE.Mesh(new THREE.PlaneGeometry(L,H),new THREE.MeshBasicMaterial({map:tx})); face.position.z=.001; g.add(face);
  if(pieds) for(const s of [-1,1]) piece(g,new THREE.CylinderGeometry(.09,.11,y,10),toon(bois),[s*(L/2-.5),-y/2-H/4,-.14],CONTOUR_SOMBRE);
  return {g,c,W:cv.width,H:cv.height,fond,effacer(){ c.fillStyle=fond; c.fillRect(0,0,cv.width,cv.height); },maj(){ tx.needsUpdate=true; }};
}
const COUL={cote:'#1971c2',sommet:'#d9480f',ok:'#2f9a3a',encre:'#17452a',piege:'#c92a2a'};
function trait(c,a,b,u=1,coul=COUL.cote,ep=11){ if(u<=0) return; c.strokeStyle=coul; c.lineWidth=ep; c.lineCap='round'; c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(a[0]+(b[0]-a[0])*Math.min(1,u),a[1]+(b[1]-a[1])*Math.min(1,u)); c.stroke(); }
function point(c,p,r=15,coul=COUL.sommet){ if(r<=0) return; c.fillStyle=coul; c.beginPath(); c.arc(p[0],p[1],r,0,7); c.fill(); }
function texte(c,s,x,y,taille=84,coul=COUL.encre){ c.fillStyle=coul; c.font=`800 ${taille}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle'; c.fillText(s,x,y); }
/* Grandit puis retombe à sa taille : pour insister sur ce que la voix dit */
const pop=(T,t0,d=.5)=>{ const u=(T-t0)/d; return u<0?0:(u>=1?1:1+.7*Math.sin(u*Math.PI)); };

/* ---- La plage ---- */
function poserPlage(){
  const sable=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xf6e2ae})); sable.rotation.x=-Math.PI/2; sable.position.y=-.02; scene3d.add(sable);
  const mer=new THREE.Mesh(new THREE.PlaneGeometry(900,600),new THREE.MeshBasicMaterial({color:0x35a7d6})); mer.rotation.x=-Math.PI/2; mer.position.set(0,-.01,-310); scene3d.add(mer);
  const vagues=[]; for(let i=0;i<7;i++){ const v=new THREE.Mesh(new THREE.PlaneGeometry(3+i*1.6,.24+i*.1),new THREE.MeshBasicMaterial({color:0xe9f8ff})); v.rotation.x=-Math.PI/2; v.position.set(((i*37)%13)-6,0,-14-i*i*1.1); scene3d.add(v); vagues.push(v); }
  const ecume=new THREE.Mesh(new THREE.PlaneGeometry(900,.7),new THREE.MeshBasicMaterial({color:0xffffff})); ecume.rotation.x=-Math.PI/2; ecume.position.set(0,0,-10); scene3d.add(ecume);
  const soleil2=new THREE.Mesh(new THREE.CircleGeometry(1.25,32),new THREE.MeshBasicMaterial({color:0xffd23f})); soleil2.position.set(4.6,6.6,-16); scene3d.add(soleil2);
  /* Le parasol, le château, le ballon */
  const par=new THREE.Group(); par.position.set(-2.9,0,-7); scene3d.add(par);
  piece(par,new THREE.CylinderGeometry(.05,.05,2.4,10),C.blanc,[0,1.2,0],CONTOUR_FIN);
  piece(par,new THREE.ConeGeometry(1.05,.6,10),toon(0xe8590c),[0,2.6,0],CONTOUR_FIN);
  const chateau=new THREE.Group(); chateau.position.set(1.85,0,-2.4); scene3d.add(chateau); const sb=toon(0xe9c678);
  piece(chateau,new THREE.CylinderGeometry(.42,.5,.55,14),sb,[0,.27,0],CONTOUR_FIN); piece(chateau,new THREE.CylinderGeometry(.27,.32,.42,14),sb,[0,.75,0],CONTOUR_FIN);
  piece(chateau,new THREE.ConeGeometry(.08,.18,3),toon(0xe03131),[0,1.1,0],null);
  const ballon=piece(scene3d,new THREE.SphereGeometry(.26,20,14),toon(0x4dabf7),[-1.72,.26,.6],CONTOUR_FIN);
  piece(ballon,new THREE.SphereGeometry(.262,20,14,0,1.05),toon(0xffffff),null,null);
  return {vagues,ballon,soleil:soleil2,parasol:par,maj(T){ vagues.forEach((v,i)=>{ v.position.x=((i*37)%13)-6+Math.sin(T*.5+i)*.6; }); }};
}

/* ---- Le robot du gag : sa plaque porte son nom ---- */
function poserRobot(nom){
  const g=new THREE.Group(); scene3d.add(g); const m=toon(0x8fa9c4), f=toon(0x5c7a99);
  piece(g,new RoundedBoxGeometry(.95,.95,.55,4,.08),m,[0,.82,0],CONTOUR_SOMBRE);
  piece(g,new RoundedBoxGeometry(.7,.5,.48,4,.08),m,[0,1.62,0],CONTOUR_SOMBRE);
  for(const s of [-1,1]){ piece(g,new THREE.SphereGeometry(.085,14,10),C.noir,[s*.16,1.67,.25],null); piece(g,new THREE.CylinderGeometry(.09,.1,.36,10),f,[s*.26,.18,0],CONTOUR_SOMBRE); }
  piece(g,new THREE.CylinderGeometry(.018,.018,.25,8),f,[0,1.98,0],null); piece(g,new THREE.SphereGeometry(.06,12,8),toon(0xe03131),[0,2.12,0],null);
  piece(g,new RoundedBoxGeometry(.26,.05,.05,2,.02),C.noir,[0,1.5,.25],null);
  const brasG=new THREE.Group(), brasD=new THREE.Group(); brasG.position.set(-.52,1.18,0); brasD.position.set(.52,1.18,0); g.add(brasG,brasD);
  for(const [b,s] of [[brasG,-1],[brasD,1]]){ piece(b,new THREE.CylinderGeometry(.07,.07,.62,10),f,[s*.04,-.3,0],CONTOUR_SOMBRE); piece(b,new THREE.SphereGeometry(.11,12,10),m,[s*.04,-.65,0],CONTOUR_SOMBRE); }
  const cv=document.createElement('canvas'); cv.width=360; cv.height=180; const c=cv.getContext('2d'); c.fillStyle='#fffdf5'; c.fillRect(0,0,360,180); c.fillStyle='#17452a'; c.font='800 118px "Segoe UI"'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(nom,180,98);
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace;
  const plaque=new THREE.Mesh(new THREE.PlaneGeometry(.78,.39),new THREE.MeshBasicMaterial({map:tx})); plaque.position.set(0,.82,.285); g.add(plaque);
  return {g,brasD};
}

/* Les gestes de Ti Margo */
function gestes(P,T){ return {
  ouvre(){ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; },
  montre(){ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.1; P.regX=-.2; P.regY=.25; },
  pouce(){ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; },
  reflechit(){ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='ouverte'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; },
  salut(t,d=1.4){ const e=lisse(t*4)*lisse((d-t)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; },
  oups(){ P.gesteD='ouverte'; P.md.set(.98,2.42,.5); P.mg.set(-.98,2.42,.5); P.cd.set(.82,1.7,.2); P.cg.set(-.82,1.7,.2); P.tetZ=.16+Math.sin(T*2)*.03; P.tetX=-.06; P.paupiere=-1.25; }
}; }

/* ============================================================
   ÉPISODE 01 : LE TRIANGLE MER. Six noms pour le même triangle.
   ============================================================ */
FILMS.nommer=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':12.47,'01-robot':7.78,'02-question':11.28,'02b-reponse':12.31,'03-cote':5.9,'04-commentaire':10.72,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-robot','02-question','02b-reponse','03-cote','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,rob,q,r,cot,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  const plage=poserPlage(), tab=poserTableau({L:4.3,H:3,x:0,y:4.55}), robot=poserRobot('RME');
  robot.g.position.set(.92,0,.7); robot.g.visible=false;
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* La figure : M, E, R, puis S. Un triangle quelconque, sans angle droit. */
  const PM=[300,150],PE=[170,500],PR=[840,410],PS=[790,110], NOM_Y=628, SLOT=[560,640,720];
  const tTri=mot('00-accroche','triangle'), tM=mot('00-accroche','M'), tE=mot('00-accroche','E'), tR=mot('00-accroche','R');
  const tNomM=mot('00-accroche','M',2), tNomE=mot('00-accroche','E',2), tNomR=mot('00-accroche','R',2);
  const tRo=[mot('01-robot','R'),mot('01-robot','M'),mot('01-robot','E')], tRobot=mot('01-robot','robot');
  const tTout=mot('03-cote','triangle'), tCote=mot('03-cote','côté'), tSeul=mot('03-cote','M');
  const tS=mot('04-commentaire','S'), tAvec=[mot('04-commentaire','M'),mot('04-commentaire','E'),mot('04-commentaire','R'),mot('04-commentaire','S',2)];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* Le quatrième point : aucun nouveau trait, pour ne pas donner la réponse */
      trait(c,PM,PE); trait(c,PE,PR); trait(c,PR,PM);
      [[PM,'M',-44,-46],[PE,'E',-52,30],[PR,'R',56,20]].forEach(([p,l,dx,dy],i)=>{ point(c,p,15*(1+.5*Math.max(0,pop(T,tAvec[i])-1))); texte(c,l,p[0]+dx,p[1]+dy,84*Math.max(1,pop(T,tAvec[i]))); });
      if(T>=tS){ const z=Math.max(pop(T,tS),pop(T,tAvec[3])); point(c,PS,15*z); texte(c,'S',PS[0]+50,PS[1]-30,84*z,COUL.sommet); }
      tab.maj(); return; }
    if(T>=cot&&T<com){ /* M E tout seul : R et ses deux côtés tombent du tableau */
      trait(c,PE,PM,1,T>=tSeul?'#e8590c':COUL.cote,T>=tSeul?16:11);
      const k=Math.max(0,T-tTout), dy=900*k*k;
      if(dy<800){ c.save(); c.translate(0,dy); trait(c,PM,PR); c.restore(); c.save(); c.translate(0,dy*1.15); c.rotate(.0); trait(c,PE,PR); c.restore(); c.save(); c.translate(0,dy*1.3); point(c,PR); texte(c,'R',PR[0]+56,PR[1]+20); c.restore(); }
      point(c,PM); point(c,PE); texte(c,'M',PM[0]-44,PM[1]-46); texte(c,'E',PE[0]-52,PE[1]+30);
      if(T>=tCote) texte(c,'un côté',600,330,104*Math.max(1,pop(T,tCote)*.75+.25),'#e8590c');
      tab.maj(); return; }
    const u=(T-tTri)/.6; trait(c,PM,PE,u*3); trait(c,PE,PR,u*3-1); trait(c,PR,PM,u*3-2);
    if(T>=tTri+.3){ point(c,PM); point(c,PE); point(c,PR); }
    if(T>=tM) texte(c,'M',PM[0]-44,PM[1]-46,84*Math.max(1,pop(T,tM)));
    if(T>=tE) texte(c,'E',PE[0]-52,PE[1]+30,84*Math.max(1,pop(T,tE)));
    if(T>=tR) texte(c,'R',PR[0]+56,PR[1]+20,84*Math.max(1,pop(T,tR)));
    /* Le nom : les lettres glissent quand la voix change l'ordre */
    if(T>=tNomM){ texte(c,'triangle',310,NOM_Y,72);
      const v=(a,b,t)=>a+(b-a)*lisse((T-t)/.28);
      const xM=v(SLOT[0],SLOT[1],tRo[1]), xE=v(SLOT[1],SLOT[2],tRo[2]), xR=v(SLOT[2],SLOT[0],tRo[0]);
      texte(c,'M',xM,NOM_Y,84,COUL.sommet); if(T>=tNomE) texte(c,'E',xE,NOM_Y,84,COUL.sommet); const u=(T-tRo[0])/.28; if(T>=tNomR) texte(c,'R',xR,NOM_Y-(u>0&&u<1?64*Math.sin(u*Math.PI):0),84,COUL.sommet); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-robot'), a3=dit('03-cote'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,acc+3.72,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    groupe(acc+3.75,acc+6.92,60,62,a0('Tu paries que ce triangle'),a0('a plusieurs noms ?')),
    groupe(acc+6.95,acc+10.05,60,62,a0('Ses sommets s’appellent'),a0('M, E et R.')),
    groupe(acc+10.05,rob,60,62,a0('C’est le triangle M E R !')),
    groupe(rob+.1,rob+2.7,60,62,a1('Je change l’ordre : R M E.')),
    groupe(rob+2.7,rob+5,60,62,a1('On dirait un nom de robot !')),
    groupe(rob+5,q,60,62,a1('Mais c’est toujours'),a1('le même triangle.')),
    groupe(cot+.1,cot+3.9,60,62,a3('Mais M E tout seul,'),a3('ce n’est plus un triangle.')),
    groupe(cot+3.9,com,60,62,a3('C’est juste un côté !')),
    groupe(com+.1,com+2.68,60,62,a4('À toi : je pose un'),a4('quatrième point, S.')),
    groupe(com+2.68,f,60,54,a4('Avec M, E, R et S,'),a4('combien de triangles différents'),a4('peux-tu nommer ?'),a4('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Avec ces trois lettres,'),qd('combien de noms différents'),qd('pour ce même triangle ?')];
  const tq=(m)=>mot('02-question',m)-q;
  rd.saute(2); const r1=rd('6 noms !'), noms=[rd('M E R · M R E · E M R'),rd('E R M · R M E · R E M')], r3=rd('Toujours le même triangle !');
  qd.saute(6); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,acc+1,'Combien de noms<br>pour un triangle ?'+PARI,`<svg width="300" height="250" viewBox="0 0 360 300"><path d="M100 50L30 245L320 195Z" fill="#fffdf5" stroke="#1971c2" stroke-width="10" stroke-linejoin="round"/><g font-family="Segoe UI" font-weight="800" font-size="62" fill="#d9480f" text-anchor="middle"><text x="82" y="44">M</text><text x="24" y="296">E</text><text x="332" y="186">R</text></g></svg>`);
  return { clips,FIN,titre:'Combien de noms ?',ceinture:0,finTitre:acc+3.72,groupes,finClip:'05-abonne',
    cuts:[acc+3.75,q,r,cot,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:cot,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['3',tq('A'),tq('3')],['6',tq('B'),tq('6')],['9',tq('C'),tq('9')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B :']],reponse:[r1],suite:[...noms,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); plage.maj(T); dessiner(T);
      const dansQ=T>=q&&T<cot, dansF=T>=f, gros=T<acc+3.75;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI; plage.soleil.visible=!tab.g.visible;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      if(dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* Le robot sort du sable au mot « robot » */
      const voirR=T>=tRobot&&T<q; robot.g.visible=voirR&&!window.MINI;
      if(voirR){ const u=lisse((T-tRobot)/.45); robot.g.position.y=-2.3*(1-u)+Math.abs(Math.sin((T-tRobot)*3))*.05; robot.brasD.rotation.z=2.65+Math.sin(T*8)*.22; robot.g.rotation.y=-.2; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<tM) { g.montre(); }
      else if(T<q) { if(T>=tRobot&&T<rob+5){ g.oups(); scene.ry=-.12+.37*lisse((T-tRobot)/.35)*lisse((rob+5-T)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<cot) { T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com) { if(T>=tTout) g.oups(); else g.montre(); }
      else if(T<f) { T<com+8.5?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      plage.ballon.visible=!gros;
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); plage.ballon.visible=false; plage.parasol.visible=false; }
    } };
};
