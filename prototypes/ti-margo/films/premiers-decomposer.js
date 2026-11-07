/* Série Nombres premiers 4e, épisode 10 : LE MARTEAU (voix 4e-premier-decomposer-short), décor : le chantier.
   Ti Margo, casque de chantier sur la tête et marteau à la main, casse 84 : Bam ! 2 × 42, Bam ! 2 × 21, Bam ! 3 × 7.
   Il tape sur 7 : il ne casse pas, 7 est premier. Ses briques : 2, 2, 3 et 7, donc 84 = 2 × 2 × 3 × 7.
   Outils communs (voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, tz, fleche, gestes, poserMiniature, PARI,
   CRAIE) : films/premiers.js. Code couleur : un facteur premier (une brique incassable) en jaune. */

/* ---- Le chantier : sol de terre, mur en construction, grue, barrières, palettes de briques, cônes ---- */
function decompChantier(){
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(240,70),new THREE.MeshBasicMaterial({color:0xbfe6ff})); ciel.position.set(0,22,-30); scene3d.add(ciel);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd8c39a})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  /* des traces de pneus dans la terre */
  for(const x of [-1.3,1.3]){ const tr=new THREE.Mesh(new THREE.PlaneGeometry(.5,40),new THREE.MeshBasicMaterial({color:0xc4ab7f})); tr.rotation.x=-Math.PI/2; tr.position.set(x,-.01,8); scene3d.add(tr); }
  /* le mur en construction, au fond : des rangées de briques qui s'arrêtent en escalier */
  const rouges=[0xb5542d,0xc4622d,0xa84a28];
  for(let r=0;r<7;r++){ const n=24-r*2; for(let k=0;k<n;k++){ const x=-11+k*.92+(r%2?.46:0);
    piece(scene3d,new THREE.BoxGeometry(.86,.4,.4),toon(rouges[(k+r)%3]),[x,.21+r*.42,-9],CONTOUR_FIN); } }
  /* la grue */
  const jaune=toon(0xfab005);
  piece(scene3d,new THREE.BoxGeometry(.5,13,.5),jaune,[8.5,6.5,-16],CONTOUR_FIN);
  piece(scene3d,new THREE.BoxGeometry(14,.45,.45),jaune,[4.5,13.1,-16],CONTOUR_FIN);
  piece(scene3d,new THREE.BoxGeometry(1.6,1.1,1.1),toon(0x495057),[11.5,12.6,-16],CONTOUR_FIN);
  piece(scene3d,new THREE.CylinderGeometry(.03,.03,4,6),toon(0x343a40),[-.6,11,-16],null);
  piece(scene3d,new THREE.BoxGeometry(1.4,.5,.6),toon(0xb5542d),[-.6,8.8,-16],CONTOUR_FIN);
  /* les barrières de chantier, rayées rouge et blanc */
  for(const x of [-8.2,-6,-3.8,3.8,6,8.2]){ const b=new THREE.Group(); b.position.set(x,0,-5.2); scene3d.add(b);
    piece(b,new THREE.BoxGeometry(2,.3,.08),toon(0xffffff),[0,.95,0],CONTOUR_FIN);
    for(let k=0;k<4;k++) piece(b,new THREE.BoxGeometry(.24,.3,.09),toon(0xe03131),[-.75+k*.5,.95,0],null);
    for(const s of [-1,1]) piece(b,new THREE.BoxGeometry(.08,1.1,.08),toon(0xadb5bd),[s*.9,.55,0],null); }
  /* deux palettes de briques */
  for(const [x,z] of [[-6.3,-3.4],[5.9,-3.6]]){ piece(scene3d,new THREE.BoxGeometry(1.7,.14,1.1),toon(0xa47148),[x,.07,z],CONTOUR_FIN);
    for(let e=0;e<3;e++) for(let k=0;k<3;k++) piece(scene3d,new THREE.BoxGeometry(.5,.24,.9),toon(rouges[(e+k)%3]),[x-.54+k*.54,.27+e*.26,z],CONTOUR_FIN); }
  /* les cônes */
  for(const [x,z] of [[-3.7,-2.6],[3.6,-2.4],[-8.8,-1.5]]){ piece(scene3d,new THREE.ConeGeometry(.3,.85,18),toon(0xfd7e14),[x,.43,z],CONTOUR_FIN);
    piece(scene3d,new THREE.CylinderGeometry(.17,.21,.12,18),toon(0xffffff),[x,.5,z],null);
    piece(scene3d,new THREE.BoxGeometry(.7,.06,.7),toon(0xfd7e14),[x,.03,z],null); }
}

/* ---- Le casque de chantier et le marteau de Ti Margo (le marteau dans la main gauche) ---- */
function decompCostume(){
  const jaune=toon(0xfcc419);
  const h=new THREE.Group(); h.position.set(0,.6,-.22); h.rotation.set(-.3,0,.06); tete.add(h);
  piece(h,new THREE.SphereGeometry(.46,28,16,0,Math.PI*2,0,Math.PI/2),jaune,[0,0,0],CONTOUR_SOMBRE).scale.set(1,.72,1);
  piece(h,new THREE.CylinderGeometry(.58,.58,.05,30),jaune,[0,.01,.06],CONTOUR_SOMBRE);
  piece(h,new THREE.BoxGeometry(.1,.06,.84),toon(0xf59f00),[0,.31,0],null);
  const m=new THREE.Group(); m.position.set(0,.06,.1); m.rotation.set(.35,0,.15); mainG.g.add(m);
  piece(m,new THREE.CylinderGeometry(.05,.055,1,12),toon(0xa0662b),[0,.32,0],CONTOUR_FIN);
  piece(m,new RoundedBoxGeometry(.5,.2,.2,3,.04),toon(0x868e96),[0,.84,0],CONTOUR_SOMBRE);
  return {h,m};
}

/* ---- Une brique à la craie, son nombre écrit dessus ---- */
const DEC_BRIQUE='#c4622d', DEC_JOINT='#5c2a12';
function decompBrique(c,x,y,txt,{w=150,h=86,taille=62,texte=CRAIE.blanc,z=1,bord=null,fissure=0,alpha=1}={}){
  if(z<=0||alpha<=0) return; c.save(); c.globalAlpha*=alpha; c.translate(x,y); c.scale(z,z);
  c.fillStyle=DEC_BRIQUE; c.fillRect(-w/2,-h/2,w,h); c.strokeStyle=DEC_JOINT; c.lineWidth=6; c.strokeRect(-w/2,-h/2,w,h);
  if(fissure>0){ c.strokeStyle='#1c1c1c'; c.lineWidth=6; c.lineJoin='round'; c.beginPath(); c.moveTo(-w*.08,-h/2);
    c.lineTo(w*.1,-h*.18); c.lineTo(-w*.06,h*.12); c.lineTo(w*.08,h/2); c.stroke(); }
  ecrire(c,txt,0,3,taille,texte);
  if(bord){ c.strokeStyle=bord; c.lineWidth=8; c.strokeRect(-w/2-9,-h/2-9,w+18,h+18); }
  c.restore(); }
/* Une brique vide en pointillés (une brique encore à trouver) */
function decompVide(c,x,y,w,h){ c.strokeStyle=CRAIE.petit; c.lineWidth=6; c.setLineDash([16,12]); c.strokeRect(x-w/2,y-h/2,w,h); c.setLineDash([]); ecrire(c,'?',x,y+3,60,CRAIE.petit); }
/* L'éclat du coup de marteau */
function decompBam(c,T,t0,x,y){ const u=(T-t0)/.7; if(u<0||u>=1) return; const r1=30+40*u, r2=52+48*u;
  c.save(); c.globalAlpha=1-u*u; c.strokeStyle='#ffa94d'; c.lineWidth=8; c.lineCap='round';
  for(let k=0;k<8;k++){ const a=k*Math.PI/4+.3; c.beginPath(); c.moveTo(x+r1*Math.cos(a),y+r1*Math.sin(a)); c.lineTo(x+r2*Math.cos(a),y+r2*Math.sin(a)); c.stroke(); }
  ecrire(c,'BAM !',x,y-r2-10,62*Math.min(1.25,pop(T,t0,.4)||1),'#ffa94d'); c.restore(); }
/* Une ligne de jetons écrits chacun à son instant : [[instant, texte, couleur], …], centrée en x */
function decompLigne(c,T,toks,x,y,taille=70){
  c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width);
  let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
  toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; });
}
const decompU=(T,t0,d=.5)=>{ const u=Math.max(0,Math.min(1,(T-t0)/d)); return u*u*(3-2*u); };

FILMS.decomposer=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':11.35,'01-casse':13.49,'02-briques':14.88,'02q-question':14.47,'02r-reponse':6.54,'03-question':6.09,'04-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-casse','02-briques','02q-question','02r-reponse','03-question','04-abonne'],DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ca,br,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  decompChantier(); decompCostume();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#2b3036',bois:0xf59f00});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les écrits : exactement ce que dit la voix (on garde les instants de chaque mot) */
  const a0=dit('00-accroche'), a1=dit('01-casse'), a2=dit('02-briques'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const s0=a0('Salut !'), s1=a0('Moi, c’est Ti Margo.'), s2=a0('Avec mon marteau,'), s3=a0('je casse le nombre'), s4=a0('84 en briques incassables.'), s5=a0('Tu paries que j’y arrive ?');
  const b1=a1('Bam !'), p1=a1('84, c’est 2 × 42.'), b2=a1('Bam !'), p2=a1('42, c’est 2 × 21.'), b3=a1('Bam !'), p3=a1('21, c’est 3 × 7.');
  const e1=a2('Et 7 ?'), e2=a2('Je tape, je tape…'), e3=a2('il ne casse pas !'), e4=a2('7 est premier.'), e5=a2('Mes briques : 2, 2, 3 et 7.'), fA=a2('84 = 2 × 2 × 3 × 7.');
  const d1=a3('À toi : casse'), d2=a3('150 en facteurs premiers.'), d3=a3('Réponds en commentaire !');

  /* Les instants */
  const tAvec=s2[3][0], tMarteau=s2[3][2], t84=s4[3][0], tBriques=s4[3][2], tParie=s5[3][1];
  const B=[b1,b2,b3].map(x=>x[3][0]);
  const kid=[[p1[3][2],p1[3][4]],[p2[3][2],p2[3][4]],[p3[3][2],p3[3][4]]];   /* [le facteur premier, l'autre] */
  const tTape=[e2[3][1],e2[3][3]], tPas=e3[3][3], tPremier=e4[3][2], tMes=e5[3][0];
  const tLeaf=[e5[3][3],e5[3][4],e5[3][5],e5[3][7]];   /* 2, 2, 3, 7 */
  const tF=fA[3];   /* 84 = 2 × 2 × 3 × 7 */
  const tCasse=d1[3][3], t150=d2[3][0], tFact=d2[3][2], tReponds=d3[3][0];
  const finTitre=tAvec-.08;

  /* L'arbre : 84 → 2 et 42 → 2 et 21 → 3 et 7 */
  const N={n84:[420,95],a2:[225,275],n42:[610,275],b2:[440,455],n21:[790,455],c3:[620,635],n7:[930,635]};
  const ROW=[[243,250],[433,250],[623,250],[813,250]];
  const branche=(c,a,b)=>{ c.strokeStyle='#dee2e6'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(a[0],a[1]+46); c.lineTo(b[0],b[1]-46); c.stroke(); };
  const secoue=(T,t0)=>{ const u=T-t0; return u>=0&&u<.5?14*Math.sin(u*55)*(1-u/.5):0; };

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 150 à casser, rien de la réponse */
      if(T>=tCasse) ecrire(c,'Casse',W/2,80,84*Math.max(1,pop(T,tCasse)),CRAIE.blanc);
      if(T>=t150) decompBrique(c,W/2,260,'150',{w:340,h:180,taille:130,z:Math.max(1,Math.min(1.12,pop(T,t150)))});
      if(T>=tFact) ecrire(c,'en facteurs premiers ?',W/2,450,76*Math.max(1,Math.min(1.12,pop(T,tFact))),CRAIE.petit);
      tab.maj(); return; }
    if(T>=br){ /* 7 ne casse pas ; les briques ; 84 = 2 × 2 × 3 × 7 */
      const u=decompU(T,tF[0],.7), feuilles=[['a2','2'],['b2','2'],['c3','3'],['n7','7']];
      c.save(); c.globalAlpha=1-u;
      branche(c,N.n84,N.a2); branche(c,N.n84,N.n42); branche(c,N.n42,N.b2); branche(c,N.n42,N.n21); branche(c,N.n21,N.c3); branche(c,N.n21,N.n7);
      decompBrique(c,...N.n84,'84',{fissure:1}); decompBrique(c,...N.n42,'42',{fissure:1}); decompBrique(c,...N.n21,'21',{fissure:1});
      c.restore();
      feuilles.forEach(([k,s],i)=>{ const [x0,y0]=N[k], [x1,y1]=ROW[i], dx=k==='n7'?secoue(T,tTape[0])+secoue(T,tTape[1]):0;
        const bord=T>=tLeaf[i]?CRAIE.ok:(k==='n7'&&T>=tPremier?CRAIE.ok:null);
        decompBrique(c,x0+(x1-x0)*u+dx,y0+(y1-y0)*u,s,{w:120,texte:CRAIE.petit,bord,z:(T>=tLeaf[i]&&T<tLeaf[i]+.5?Math.min(1.15,pop(T,tLeaf[i])):1)*(1+.4*u)}); });
      if(u<1){ c.save(); c.globalAlpha=1-u;
        tTape.forEach(t=>{ const v=(T-t)/.45; if(v<0||v>=1) return; c.strokeStyle='#ffa94d'; c.lineWidth=7; c.lineCap='round';
          for(let k=0;k<6;k++){ const a=-Math.PI*(.15+k*.14); c.beginPath(); c.moveTo(930+70*Math.cos(a),590+70*Math.sin(a)); c.lineTo(930+(95+40*v)*Math.cos(a),590+(95+40*v)*Math.sin(a)); c.stroke(); } });
        if(T>=tPas) ecrire(c,'il ne casse pas !',800,95,58*Math.max(1,Math.min(1.12,pop(T,tPas))),CRAIE.faux);
        if(T>=tPremier){ ecrire(c,'7 est premier',800,180,58*Math.max(1,Math.min(1.12,pop(T,tPremier))),CRAIE.ok); fleche(c,985,215,985,570,CRAIE.ok,8); }
        c.restore(); }
      if(T>=tF[0]) decompLigne(c,T,[[tF[0],'84'],[tF[1],'='],[tF[2],'2',CRAIE.petit],[tF[3],'×'],[tF[4],'2',CRAIE.petit],[tF[5],'×'],[tF[6],'3',CRAIE.petit],[tF[7],'×'],[tF[8],'7',CRAIE.petit]],W/2,440,104);
      tab.maj(); return; }
    if(T>=ca){ /* Bam ! Bam ! Bam ! l'arbre pousse, coup après coup */
      const vu=t=>T>=t, z=t=>Math.max(1,Math.min(1.15,pop(T,t)));
      if(vu(kid[0][0])) branche(c,N.n84,N.a2); if(vu(kid[0][1])) branche(c,N.n84,N.n42);
      if(vu(kid[1][0])) branche(c,N.n42,N.b2); if(vu(kid[1][1])) branche(c,N.n42,N.n21);
      if(vu(kid[2][0])) branche(c,N.n21,N.c3); if(vu(kid[2][1])) branche(c,N.n21,N.n7);
      decompBrique(c,...N.n84,'84',{fissure:vu(B[0])});
      if(vu(kid[0][0])) decompBrique(c,...N.a2,'2',{w:120,texte:CRAIE.petit,z:z(kid[0][0])});
      if(vu(kid[0][1])) decompBrique(c,...N.n42,'42',{fissure:vu(B[1]),z:z(kid[0][1])});
      if(vu(kid[1][0])) decompBrique(c,...N.b2,'2',{w:120,texte:CRAIE.petit,z:z(kid[1][0])});
      if(vu(kid[1][1])) decompBrique(c,...N.n21,'21',{fissure:vu(B[2]),z:z(kid[1][1])});
      if(vu(kid[2][0])) decompBrique(c,...N.c3,'3',{w:120,texte:CRAIE.petit,z:z(kid[2][0])});
      if(vu(kid[2][1])) decompBrique(c,...N.n7,'7',{w:120,texte:CRAIE.petit,z:z(kid[2][1])});
      decompBam(c,T,B[0],N.n84[0]+270,N.n84[1]+70); decompBam(c,T,B[1],N.n42[0]+200,N.n42[1]-10); decompBam(c,T,B[2],N.n21[0]+125,N.n21[1]-55);
      tab.maj(); return; }
    /* l'accroche : le gros bloc 84, quatre briques à trouver, le pari */
    if(T>=t84) decompBrique(c,W/2,200,'84',{w:330,h:170,taille:130,z:Math.max(1,Math.min(1.12,pop(T,t84)))});
    if(T>=tBriques) ROW.forEach(([x],k)=>{ if(T>=tBriques+k*.12) decompVide(c,x,385,120,86); });
    if(T>=tParie) ecrire(c,'TU PARIES ?',W/2,510,110*Math.max(1,pop(T,tParie)),'#ff922b');
    tab.maj();
  }

  const groupes=[
    groupe(acc+.1,finTitre,352,62,s0,s1),
    ...suiteDe(ca,60,58,[s2,s3,s4],[s5]),
    ...suiteDe(br,60,58,[b1,p1],[b2,p2],[b3,p3]),
    ...suiteDe(q,60,58,[e1,e2,e3],[e4,e5],[fA]),
    ...suiteDe(f,60,56,[d1,d2],[d3])
  ];
  qd('Question !');
  const phraseQ=[qd('Laquelle est la décomposition de 12 ?')];
  const CH=[qd('A : 2 × 6.'),qd('B : 2 × 2 × 3.'),qd('C : 3 × 4.')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse B !'), r1=rd('6 et 4 se cassent encore.'), r2=rd('2 et 3, non.');
  /* Un choix s'écrit mot à mot : chaque mot à l'instant où il est dit */
  const motsChoix=CH.map(([,,txt,tm])=>({mots:txt.replace(/\.$/,'').split(' ').slice(2),tm:tm.slice(2)}));
  const choix=CH.map(([,,,tm])=>['',tm[0]-q,tm[2]-q]);
  const ecrireChoix=T=>choix.forEach((ch,i)=>{ const {mots,tm}=motsChoix[i];
    ch[0]=mots.map((w,k)=>`<span style="visibility:${T>=tm[k]||T>=r?'visible':'hidden'}">${w}</span>`).join(' '); });

  /* Le coup de marteau : le bras gauche monte, puis frappe à l'instant t0 */
  function frappe(P,T,t0,fort=1){ const u=T-t0;
    if(u<-.5||u>.45) return false;
    const haut=u<0?decompU(T,t0-.5,.4):Math.max(0,1-u/.12), bas=u>=0?Math.min(1,u/.08)*(1-Math.max(0,(u-.2)/.25)):0;
    P.mg.set(-.92-.06*haut,2.2+.75*haut*fort-.25*bas,.34+.3*bas); P.cg.set(-.8,1.75+.25*haut,.12); P.tetZ=.06*haut; P.jaw=.2+.5*bas; return true; }

  poserMiniature(outils,acc+1,'Je casse 84<br>en briques'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#2b3036" stroke="#f59f00" stroke-width="12"/>
      <rect x="40" y="40" width="250" height="130" fill="#c4622d" stroke="#5c2a12" stroke-width="7"/>
      <path d="M150 40 L172 85 L148 120 L168 170" stroke="#1c1c1c" stroke-width="7" fill="none" stroke-linejoin="round"/>
      <text x="165" y="128" font-family="Segoe UI" font-weight="800" font-size="92" fill="#f8f9fa" text-anchor="middle">84</text></svg>`);
  /* le dessin à droite : à gauche, il cacherait le marteau levé */
  { const m0=window.tiMargoMiniature; window.tiMargoMiniature=()=>{ m0(); const d=[...document.querySelectorAll('.cv')].find(x=>x.querySelector('svg')); if(d) d.style.cssText='right:40px;top:1190px;z-index:4;'; }; }
  return { clips,FIN,titre:'Le marteau à nombres',ceinture:2,finTitre,groupes,finClip:'04-abonne',
    cuts:[finTitre,ca,br,q,r,com,f],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:1,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T); ecrireChoix(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<ca){ T>=tParie?g.fier():g.montre(); if(T>=tMarteau&&T<tParie){ P.mg.set(-.98,2.85,.36); P.cg.set(-.84,1.98,.12); } }
      else if(T<br){ g.montre(); B.some(t=>frappe(P,T,t)); }
      else if(T<q){ if(T>=tPas&&T<tPremier) g.oups(); else if(T>=tPremier&&T<tMes) g.fier(); else if(T>=tF[0]+.8) g.fier(); else g.montre();
        tTape.some(t=>frappe(P,T,t,.7)); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<rR[3][1]?g.ouvre():g.pouce(); }
      else if(T<f){ T<tReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); P.mg.set(-.98,2.85,.36); P.cg.set(-.84,1.98,.12); }
    } };
};
