/* Série Triangles 6e, épisode 09 : QUI MENT ? Trois copains, trois triangles : 179° existe (vraiment aplati),
   deux angles droits non (les côtés restent parallèles), 90-45-45 oui. Cour de récréation. */

function voixTri09(A){
  const norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,''), CL={};
  for(const [k,l] of Object.entries((window.CUES||{})[VIDEO]||{})){ CL[k]=[]; for(const [t,w] of l){ const d=CL[k][CL[k].length-1]; if(!(d&&norme(d[1])===norme(w)&&/[0-9]/.test(w))) CL[k].push([t,w]); } }
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0, prec='', av=null;
    const f=txt=>{ const tm=[]; txt.split(' ').forEach(w=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        const c=i<l.length?norme(l[i][1]):'';
        if(prec.includes(n)&&!(c&&(c.includes(n)||n.includes(c)))){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; prec=c; tm.push(av); i++; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    return f; }
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}

function poserCour(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({color:0xc9c4b6})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const cv=document.createElement('canvas'); cv.width=512; cv.height=256; const a=cv.getContext('2d'); a.fillStyle='#f6d9a8'; a.fillRect(0,0,512,256); a.fillStyle='#e8b878'; a.fillRect(0,236,512,20);
  for(const x of [48,304]){ a.fillStyle='#8fd0ef'; a.fillRect(x,70,160,110); a.strokeStyle='#ffffff'; a.lineWidth=10; a.strokeRect(x,70,160,110); a.beginPath(); a.moveTo(x+80,70); a.lineTo(x+80,180); a.moveTo(x,125); a.lineTo(x+160,125); a.stroke(); }
  const tx=new THREE.CanvasTexture(cv); tx.wrapS=tx.wrapT=THREE.RepeatWrapping; tx.repeat.set(10,5); tx.colorSpace=THREE.SRGBColorSpace;
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(60,30),new THREE.MeshBasicMaterial({map:tx})); mur.position.set(0,15,-6); scene3d.add(mur);
  /* La marelle, peinte au sol */
  const mc=document.createElement('canvas'); mc.width=256; mc.height=512; const b=mc.getContext('2d'); b.strokeStyle='#ffffff'; b.lineWidth=10; b.fillStyle='#ffffff'; b.font='800 70px "Segoe UI"'; b.textAlign='center'; b.textBaseline='middle';
  [[78,420,'1'],[78,320,'2'],[28,220,'3'],[128,220,'4'],[78,120,'5']].forEach(([x,y,n])=>{ b.strokeRect(x,y-40,100,100); b.fillText(n,x+50,y+10); });
  const mt=new THREE.CanvasTexture(mc); mt.colorSpace=THREE.SRGBColorSpace;
  const mar=new THREE.Mesh(new THREE.PlaneGeometry(1.6,3.2),new THREE.MeshBasicMaterial({map:mt,transparent:true})); mar.rotation.x=-Math.PI/2; mar.position.set(-2.2,0,-2.6); scene3d.add(mar);
}
/* Un copain : sa plaque porte son nom ; le nez de Max s'allonge */
function poserCopain(nom,tenue,cheveux,peau,x){ const g=new THREE.Group(); g.position.set(x,0,-1); g.scale.setScalar(.82); scene3d.add(g); const t=toon(tenue), pa=toon(peau), j=toon(0x2b3a55);
  for(const s of [-1,1]){ piece(g,new THREE.CylinderGeometry(.13,.12,.62,12),j,[s*.17,.31,0],CONTOUR_SOMBRE); piece(g,new THREE.CylinderGeometry(.075,.07,.66,10),pa,[s*.5,.98,0],CONTOUR_SOMBRE); }
  piece(g,new RoundedBoxGeometry(.78,.82,.42,4,.1),t,[0,1,0],CONTOUR_SOMBRE);
  piece(g,new THREE.SphereGeometry(.42,22,18),pa,[0,1.78,0],CONTOUR_SOMBRE);
  piece(g,new THREE.SphereGeometry(.44,22,12,0,Math.PI*2,0,Math.PI*.5),toon(cheveux),[0,1.82,-.03],null);
  for(const s of [-1,1]){ piece(g,new THREE.SphereGeometry(.075,12,10),C.blanc,[s*.15,1.8,.37],null); piece(g,new THREE.SphereGeometry(.04,10,8),C.noir,[s*.15,1.8,.435],null); }
  const nez=piece(g,new THREE.ConeGeometry(.055,.16,10),pa,[0,1.7,.46],null); nez.rotation.x=Math.PI/2;
  const b=piece(g,new THREE.TorusGeometry(.12,.016,6,14,Math.PI),C.noir,[0,1.62,.385],null); b.rotation.x=Math.PI;
  const cv=document.createElement('canvas'); cv.width=300; cv.height=150; const c=cv.getContext('2d'); c.fillStyle='#fffdf5'; c.fillRect(0,0,300,150); c.fillStyle='#17452a'; c.font='800 104px "Segoe UI"'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(nom,150,82);
  const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; const pl=new THREE.Mesh(new THREE.PlaneGeometry(.66,.33),new THREE.MeshBasicMaterial({map:tx})); pl.position.set(0,1.02,.222); g.add(pl);
  return {g,nez}; }
const coinDroit09=(c,S,u,v,t=44,coul=COUL.piege)=>{ c.strokeStyle=coul; c.lineWidth=7; c.beginPath(); c.moveTo(S[0]+u[0]*t,S[1]+u[1]*t); c.lineTo(S[0]+(u[0]+v[0])*t,S[1]+(u[1]+v[1])*t); c.lineTo(S[0]+v[0]*t,S[1]+v[1]*t); c.stroke(); };

FILMS['propriete-defi']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':8.69,'01-copains':14.32,'02-question':10.36,'02b-reponse':13.19,'03-zia':5.99,'04-lou':9.75,'05-commentaire':9.87,'06-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'05-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixTri09(A);
  const [acc,cop,q,r,zia,lou,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['06-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x], m=mot;

  poserCour();
  const tab=poserTableau({L:4.3,H:3,x:0,y:4.55});
  /* Le banc : les copains montent dessus, leur plaque reste visible au-dessus de la queue */
  const banc=new THREE.Group(); banc.position.set(1,0,-1); scene3d.add(banc); piece(banc,new RoundedBoxGeometry(2.44,.1,.72,2,.03),toon(0xb5763a),[0,.72,0],CONTOUR_SOMBRE); for(const x of [-1.04,1.04]) piece(banc,new RoundedBoxGeometry(.12,.72,.6,2,.03),toon(0x8a5a2b),[x,.36,0],CONTOUR_SOMBRE);
  const Y_BANC=.77;
  const cL=poserCopain('Lou',0xe8590c,0x3b2a1a,0xf1c9a5,.34), cM=poserCopain('Max',0x1971c2,0xc98b2b,0xe7b98f,1.06), cZ=poserCopain('Zia',0x9c36b5,0x20242c,0xa9714b,1.78);
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} #pause{font-size:48px;}'; document.head.append(css);

  cM.nez.material=toon(0xe0603f);
  const tSeul=m('00-accroche','Un'), tCo=m('00-accroche','copains'), tTu=m('00-accroche','Tu'), tTri0=m('00-accroche','triangle');
  const tLou=A['01-copains']+.1, tTriL=m('01-copains','triangle'), t179=m('01-copains','179'), tMax=m('01-copains','Max'), tDeux=m('01-copains','deux'), tDr=m('01-copains','droits'), tZia=m('01-copains','Zia'), t90=m('01-copains','90'), t45=m('01-copains','45');
  const tRMax=m('02b-reponse','Max'), t9090=m('02b-reponse','180'), tRien=m('02b-reponse','rien'), tSes=m('02b-reponse','Ses'), tMont=m('02b-reponse','montent'), tJam=m('02b-reponse','jamais');
  const tZv=m('03-zia','vrai'), tZ180=m('03-zia','180'), tZ90=m('03-zia','90'), tZ45a=m('03-zia','45'), tZ45b=m('03-zia','45',2);
  const tLv=m('04-lou','Vrai'), tL1=m('04-lou','1'), tLtr=m('04-lou','trait'), tLtri=m('04-lou','triangle');
  const tC60=m('05-commentaire','60'), tCb=m('05-commentaire','Combien');

  /* 179° : base de 912 pixels, sommet à 456·tan(0,5°) = 4 pixels au-dessus de la base */
  const FB=[60,380], FC=[972,380], FA=[516,380-456*Math.tan(.5*Math.PI/180)];
  function plat(c,T,voirT,opt={}){ c.beginPath(); c.moveTo(FA[0],FA[1]); c.lineTo(FB[0],FB[1]); c.lineTo(FC[0],FC[1]); c.closePath(); c.strokeStyle=COUL.cote; c.lineWidth=7; c.lineJoin='round'; c.stroke();
    for(const p of [FA,FB,FC]) point(c,p,14);
    if(opt.arc){ c.strokeStyle=COUL.sommet; c.lineWidth=8; c.beginPath(); c.arc(FA[0],FA[1],80,Math.PI*.002,Math.PI*.998); c.stroke(); texte(c,'179°',FA[0],FA[1]+150,84*(opt.z||1),COUL.sommet); } }
  function droits(c,T,hMax,dep,fin_){ const B=[300,590], C_=[730,590], h=Math.min(hMax,hMax*lisse((T-dep)/(fin_-dep))); trait(c,B,C_);
    c.save(); c.setLineDash([]); trait(c,B,[B[0],B[1]-h]); trait(c,C_,[C_[0],C_[1]-h]); c.restore();
    coinDroit09(c,B,[1,0],[0,-1]); coinDroit09(c,C_,[-1,0],[0,-1]); point(c,B); point(c,C_); }
  function zia3(c,T,t1,t2,t3){ const B=[420,600], C_=[900,600], H=[420,120]; c.beginPath(); c.moveTo(B[0],B[1]); c.lineTo(C_[0],C_[1]); c.lineTo(H[0],H[1]); c.closePath(); c.fillStyle='#dbeafe'; c.fill(); trait(c,B,C_); trait(c,C_,H); trait(c,H,B); coinDroit09(c,B,[1,0],[0,-1]);
    for(const p of [B,C_,H]) point(c,p);
    if(T>=t1) texte(c,'90°',510,520,58*Math.max(1,pop(T,t1)*.4+.6),COUL.piege);
    if(T>=t2) texte(c,'45°',480,256,50*Math.max(1,pop(T,t2)*.4+.6));
    if(T>=t3) texte(c,'45°',760,566,54*Math.max(1,pop(T,t3)*.4+.6)); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* Pas de figure : elle donnerait la réponse */
      const cases=[[250,T>=tC60?'60°':'',COUL.cote,tC60],[560,T>=tCb?'?':'','#e8590c',tCb+.5],[820,T>=tCb?'?':'','#e8590c',tCb+.9]];
      for(const [x,s,co,t0] of cases){ c.beginPath(); c.arc(x,300,118,0,7); c.fillStyle='#fff'; c.fill(); c.strokeStyle=COUL.encre; c.lineWidth=8; c.stroke(); if(s) texte(c,s,x,304,92*Math.max(1,pop(T,t0)*.4+.6),co); }
      tab.maj(); return; }
    if(T>=lou){ plat(c,T,lou,{arc:true}); if(T>=tL1){ const z=Math.max(1,pop(T,tL1)*.4+.6); for(const p of [FB,FC]){ c.strokeStyle='#e8590c'; c.lineWidth=8; c.beginPath(); c.arc(p[0],p[1],36*z,0,7); c.stroke(); } texte(c,'1°',516,190,110*z,'#e8590c'); }
      if(T>=tLtri) texte(c,'✓',900,190,120*Math.max(1,pop(T,tLtri)*.4+.6),COUL.ok); tab.maj(); return; }
    if(T>=zia){ zia3(c,T,tZ90,tZ45a,tZ45b); if(T>=tZ180) texte(c,'✓',880,200,130*Math.max(1,pop(T,tZ180)*.4+.6),COUL.ok); tab.maj(); return; }
    if(T>=tZia){ zia3(c,T,t90,t45,t45+.5); tab.maj(); return; }
    if(T>=tMax){ droits(c,T,500,tDr-.1,tDr+.7); if(T>=tDeux){ texte(c,'90°',385,520,54); texte(c,'90°',645,520,54); } tab.maj(); return; }
    if(T>=cop){ if(T>=tTriL) plat(c,T,tTriL,{arc:T>=t179,z:Math.max(1,pop(T,t179)*.4+.6)}); tab.maj(); return; }
    /* L'accroche : trois triangles, une seule ment */
    if(T>=tTri0){ const des=[[[120,420],[350,420],[200,220]],[[420,420],[640,420],[420,200]],[[700,420],[960,420],[840,180]]]; for(const S of des){ trait(c,S[0],S[1]); trait(c,S[1],S[2]); trait(c,S[2],S[0]); } }
    if(T>=tSeul) texte(c,'?',516,560,130*Math.max(1,pop(T,tSeul)*.4+.6),'#e8590c');
    tab.maj();
  }

  /* Sous la carte : les côtés de Max montent et restent parallèles */
  const dq=document.createElement('canvas'); dq.className='cv'; dq.width=400; dq.height=400; dq.style.cssText='left:796px;top:893px;width:248px;height:248px;background:#fffdf5;border:6px solid #17452a;border-radius:26px;display:none;z-index:3;'; document.body.append(dq);
  function dessinerQ(T){ const c=dq.getContext('2d'); c.fillStyle='#fffdf5'; c.fillRect(0,0,400,400); const B=[90,350], C_=[310,350], h=70+250*lisse((T-tMont)/2);
    trait(c,B,C_,1,COUL.cote,9); trait(c,B,[B[0],B[1]-h],1,COUL.cote,9); trait(c,C_,[C_[0],C_[1]-h],1,COUL.cote,9); coinDroit09(c,B,[1,0],[0,-1],32); coinDroit09(c,C_,[-1,0],[0,-1],32); texte(c,'90°',150,290,38); texte(c,'90°',252,290,38);
    if(T>=tJam) texte(c,'?',200,120,76,COUL.piege); }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-copains'), a3=dit('03-zia'), a4=dit('04-lou'), a5=dit('05-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,acc+4.7,352,58,a0('Salut !'),a0('Mes trois copains me'),a0('parlent de leur triangle.')),
    groupe(acc+4.7,acc+6.3,60,72,a0('Un seul ment.')),
    groupe(acc+6.3,cop,60,62,a0('Tu paries'),a0('que tu le trouves ?')),
    groupe(cop+.1,cop+4.9,60,58,a1('Lou dit : mon triangle'),a1('a un angle de 179°.')),
    groupe(cop+4.9,cop+8,60,58,a1('Max dit : le mien'),a1('a deux angles droits.')),
    groupe(cop+8,q,60,58,a1('Zia dit : le mien a des'),a1('angles de 90, 45 et 45°.')),
    groupe(zia+.1,lou,60,62,a3('Zia dit vrai :'),a3('90 + 45 + 45 = 180.')),
    groupe(lou+.1,lou+2.9,60,62,a4('Et Lou ?'),a4('Vrai aussi !')),
    groupe(lou+2.9,lou+6.2,60,60,a4('Il reste 1 degré pour'),a4('les deux autres angles.')),
    groupe(lou+6.2,com,60,60,a4('On dirait un trait,'),a4('mais c’est bien un triangle !')),
    groupe(com+.1,com+5,60,58,a5('À toi : le plus grand angle'),a5('de mon triangle mesure 60°.')),
    groupe(com+5,f,60,60,a5('Combien mesurent'),a5('les deux autres ?'),a5('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Qui ment ?')];
  const tq=w=>m('02-question',w)-q;
  rd.saute(2); const r1=rd('Max !'), r2=rd('90 + 90 = 180.'), r3=rd('Il ne reste rien pour le troisième angle.'), r4=rd('Ses côtés montent, et ne se rejoignent jamais !');
  qd.saute(6); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,acc+1,'Un copain ment :<br>lequel ?'+PARI,`<svg width="300" height="250" viewBox="0 0 360 300"><path d="M20 280H330" stroke="#1971c2" stroke-width="9" stroke-linecap="round"/><path d="M60 280V40M290 280V40" stroke="#1971c2" stroke-width="10" stroke-linecap="round"/><path d="M60 245H95V280M290 245H255V280" fill="none" stroke="#c92a2a" stroke-width="8"/><text x="175" y="130" font-family="Segoe UI" font-weight="800" font-size="110" fill="#e8590c" text-anchor="middle">?</text></svg>`);
  const saut=(T,a,b)=>T>=a&&T<b?Math.abs(Math.sin((T-a)*5))*.14:0;
  return { clips,FIN,titre:'Qui ment ?',ceinture:1,finTitre:acc+4.7,groupes,finClip:'06-abonne',
    cuts:[acc+4.7,q,r,zia,lou,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:zia,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['Lou',tq('A'),tq('Lou')],['Max',tq('B'),tq('Max')],['Zia',tq('C'),tq('Zia')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B :']],reponse:[r1],suite:[r2,r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<zia, dansF=T>=f, gros=T<acc+4.7;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      const voirQ=T>=r&&T<zia&&T>=t9090&&!window.MINI; dq.style.display=voirQ?'block':'none'; if(voirQ) dessinerQ(T);
      scene.x=-.98; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.98; cam.d=11; cam.y=2.5; }
      if(dansQ||dansF){ scene.x=-.98; cam.d=11.4; cam.y=3.55; }

      /* Les copains : celui qui parle saute ; le nez de Max s'allonge quand il est démasqué */
      const voirC=!window.MINI&&T>=tCo; for(const k of [cL,cM,cZ]) k.g.visible=voirC; banc.visible=!window.MINI;
      cL.g.position.y=Y_BANC+saut(T,tLou,tMax-.3)+saut(T,lou,lou+1.3);
      cM.g.position.y=Y_BANC+saut(T,tMax,tZia-.3)+saut(T,tRMax,tRMax+1.2);
      cZ.g.position.y=Y_BANC+saut(T,tZia,cop+14)+saut(T,zia,zia+1.2);
      const long=T>=tRMax&&T<com, n=long?1+3.5*lisse((T-tRMax)/.8):1; cM.nez.scale.y=n; if(long){ cM.nez.rotation.set(0,0,-.72); cM.nez.position.set(.05+.052*n,1.72+.06*n,.43); } else { cM.nez.rotation.set(Math.PI/2,0,0); cM.nez.position.set(0,1.7,.46); }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<tTu) g.reflechit();
      else if(T<cop) g.pouce();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<zia){ if(T<r+.62) g.ouvre(); else if(T<tSes) g.pouce(); else g.oups(); }
      else if(T<lou) { T<tZ180?g.montre():g.pouce(); }
      else if(T<tL1){ g.ouvre(); P.tetZ=.14; P.paupiere=-1.25; }
      else if(T<com) { T<tLtri?g.montre():g.pouce(); }
      else if(T<f){ T<com+7.6?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
