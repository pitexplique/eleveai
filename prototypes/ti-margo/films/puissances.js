/* Série Puissances 4e : les shorts refaits en dessin animé (essai du 07/11).
   Un FILMS.<épisode> par film. Les mp4 Manim de la série ne sont pas touchés. */
/* Les outils communs (gestes, miniature, couleurs) sont dans puissances-commun.js ; les autres films 4e, dans puissances-<épisode>.js. */

/* ============================================================
   ÉPISODE 01 : LA FEUILLE PLIÉE. aⁿ, ce n'est pas a × n.
   Voix validée le 04/11 (seule la phrase de fin suit la règle du 05/11).
   ============================================================ */
FILMS.comprendre=function(outils){
  const {el,$,jetons,panneau}=outils;
  document.body.classList.add('cartes-en-ligne');
  const DUR={'00-accroche':7.2,'01-pliages':6.23,'01q-question':9.66,'01r-reponse':4.705,'02-suite':13.375,'03-question':7.915,'04-abonne':6.045};
  const clips=[]; { let t=.4; for(const c of Object.keys(DUR)){ clips.push([c,+t.toFixed(2)]); t+=DUR[c]+(c==='01q-question'?3.3:(c==='03-question'?1.5:.25)); } }
  const A=Object.fromEntries(clips), CL=window.CUES.comprendre;
  const [acc,pl,q,r,su,qu,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  /* L'instant du mot n° i d'un clip (les « 2 fois » répétés ont chacun le leur) */
  const m=(c,i)=>A[c]+CL[c][i][0];
  /* Une phrase écrite : chaque mot prend l'instant de son rang dans le clip ; un signe seul suit le mot d'avant */
  const dit=(c,i,txt)=>{ let k=i-1; const tm=txt.split(' ').map(w=>{ if(/[0-9a-zà-ÿ]/i.test(w)) k++; return m(c,Math.max(k,i)); }); return [tm[0],tm[tm.length-1],txt,tm]; };

  /* ---- L'atelier ---- */
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(120,60),new THREE.MeshBasicMaterial({color:0xb6e0d4})); mur.position.set(0,30,-2.4); scene3d.add(mur);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd9a066})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(120,.28),new THREE.MeshBasicMaterial({color:0x8a5a2b})); plinthe.position.set(0,.14,-2.38); scene3d.add(plinthe);
  /* Des avions de papier accrochés au mur */
  function avion(x,y,coul,rz){ const s=new THREE.Shape(); s.moveTo(0,.42); s.lineTo(.3,-.32); s.lineTo(0,-.14); s.lineTo(-.3,-.32); s.closePath();
    const a=new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:coul})); a.position.set(x,y,-2.3); a.rotation.z=rz; scene3d.add(a);
    const fil=new THREE.Mesh(new THREE.PlaneGeometry(.025,30),new THREE.MeshBasicMaterial({color:0x5b7f76})); fil.position.set(x,y+15,-2.32); scene3d.add(fil); }
  avion(-1.9,5.2,0xfff4c2,.5); avion(.2,6.1,0xffffff,-.4); avion(2,4.7,0xffd8a8,.7); avion(-3.6,7.5,0xffffff,.2); avion(3.8,8.6,0xfff4c2,-.6); avion(-.8,9.6,0xffd8a8,.4); avion(5.4,6.2,0xffffff,.3); avion(-5.6,5,0xffd8a8,-.3);

  /* ---- La table et la feuille ---- */
  const CX=.82, Y0=1.08, TH=.07, D=1.25, W=[2.3,1.35,1.15,1.05,1,1,1,1];
  const table=new THREE.Group(); scene3d.add(table); const bois=toon(0x8f5c2c);
  piece(table,new RoundedBoxGeometry(2.5,.12,1.6,3,.03),bois,[CX,Y0-.06,0],CONTOUR_FIN);
  for(const [x,z] of [[-1.1,-.62],[1.1,-.62],[-1.1,.62],[1.1,.62]]) piece(table,new RoundedBoxGeometry(.13,Y0-.1,.13,2,.02),bois,[CX+x,(Y0-.1)/2,z],CONTOUR_FIN);

  const pile=new THREE.Group(); pile.position.y=Y0; scene3d.add(pile);
  const boite=new THREE.BoxGeometry(1,1,1), creme=new THREE.MeshBasicMaterial({color:0xfffdf5}), bleu=new THREE.MeshBasicMaterial({color:0xbfe3ff}), encre=new THREE.MeshBasicMaterial({color:0x17452a});
  const couches=[]; for(let i=0;i<128;i++){ const c=new THREE.Mesh(boite,i%2?bleu:creme); c.visible=false; pile.add(c); couches.push(c); }
  const noyauF=new THREE.Mesh(boite,encre), noyauM=new THREE.Mesh(boite,encre); pile.add(noyauF,noyauM);

  /* Les pliages : [début, fin]. La couche retombe quand la voix dit le nombre. */
  const PLIS_ACC=[[m('00-accroche',0),m('00-accroche',4)+.3],[m('00-accroche',5),m('00-accroche',5)+1],[m('00-accroche',6),m('00-accroche',7)+.8]];
  const PLIS=[[m('01-pliages',1),m('01-pliages',2)],[m('01-pliages',5),m('01-pliages',9)],[m('01r-reponse',3),m('01r-reponse',7)+.2],
    [m('02-suite',1),m('02-suite',2)],[m('02-suite',5),m('02-suite',14)],[m('03-question',0)-.1,m('03-question',2)],[m('03-question',2),m('03-question',3)]];
  function etat(T){ const L=T<pl?PLIS_ACC:PLIS; let k=0,u=null,chute=null; for(const [a,b] of L){ if(T>=b){ k++; chute=T-b; } else if(T>=a){ u=(T-a)/(b-a); chute=null; break; } else break; } return {k,u,chute}; }
  const lerp=(a,b,e)=>a+(b-a)*e;
  function poserPile(T){ const {k,u,chute}=etat(T), n=2**k; let bord=null;
    couches.forEach(c=>{c.visible=false;}); noyauM.visible=false;
    const place=(c,x,y,l,h,rot,z=D)=>{ c.visible=true; c.position.set(x,y,0); c.rotation.z=rot; c.scale.set(l,h,z); };
    const haut=n*TH;
    if(u===null){ for(let i=0;i<n;i++) place(couches[i],CX,(i+.5)*TH,W[k],TH*.84,0); place(noyauF,CX,haut/2,W[k]-.01,haut-TH*.2,0,D-.02); }
    else { const e=lisse(u), w2=W[k+1], hx=lerp(CX,CX-w2/2,e), R=lerp(CX+W[k]/2,CX+w2/2,e), hw=R-hx, th=-Math.PI*e, cs=Math.cos(th), sn=Math.sin(th);
      for(let i=0;i<n;i++) place(couches[i],hx+hw/2,(i+.5)*TH,hw,TH*.84,0);
      place(noyauF,hx+hw/2,haut/2,hw-.01,haut-TH*.2,0,D-.02);
      const tourne=(dx,dy)=>[hx+dx*cs-dy*sn,haut+dx*sn+dy*cs];
      for(let j=0;j<n;j++){ const [x,y]=tourne(-hw/2,(j+.5)*TH-haut); place(couches[n+(n-1-j)],x,y,hw,TH*.84,th); }
      const [xn,yn]=tourne(-hw/2,-haut/2); place(noyauM,xn,yn,hw-.01,haut-TH*.2,th,D-.02);
      const [xb,yb]=tourne(-hw,0); bord={x:xb,y:yb+Y0}; }
    pile.scale.y=(chute!==null&&chute<.32)?1-.07*Math.sin(chute/.32*Math.PI):1;
    return {k,u,bord};
  }

  /* ---- Le panneau du bas : compteur de pliages (orange), produit (bleu), couches (vert) ---- */
  panneau.innerHTML='<div class="r" id="l1"></div><div class="r" id="l2"></div><div class="r" id="l3"></div>';
  const P='01-pliages', S='02-suite', R='01r-reponse';
  const J1a=[[m(P,0),ex('1')+' '],[m(P,1),'pliage : '],[m(P,2),ok('2')+' '],[m(P,3),ok('couches')]];
  const J1b=[[m(P,4),ex('2')+' '],[m(P,5),'pliages :']];
  const J2b=[[m(P,6),ba('2')+' '],[m(P,7),'× '],[m(P,8),ba('2')+',']];
  const J3b=[[m(P,9),ok('4')+' '],[m(P,10),ok('couches.')]];
  const J2r=[[m(R,3),ba('2')+' '],[m(R,4),'× '],[m(R,5),ba('2')+' '],[m(R,6),'× '],[m(R,7),ba('2')+' : '],[m(R,8),ba('2')],[m(R,10),sup('3')]];
  const J1c=[[m(S,0),ex('4')+' '],[m(S,1),'pliages : '],[m(S,2),ok('16')+' '],[m(S,3),ok('couches.')]];
  const J1d=[[m(S,4),ex('5')+' '],[m(S,5),'pliages :']];
  const J2d=[[m(S,6),ba('2')+' '],[m(S,7),'× '],[m(S,8),ba('2')+' '],[m(S,9),'× '],[m(S,10),ba('2')+' '],[m(S,11),'× '],[m(S,12),ba('2')+' '],[m(S,13),'× '],[m(S,14),ba('2')]];
  const J3d=[[m(S,15),'On '],[m(S,16),'écrit '],[m(S,17),ba('2')],[m(S,19),sup('5')+' : '],[m(S,20),ok('32')+' '],[m(S,21),ok('couches.')]];
  const VIDE=[];
  const rangees=T=>{ if(T<m(P,4)) return [J1a,VIDE,VIDE]; if(T<q) return [J1b,J2b,J3b]; if(T<su) return [VIDE,J2r,VIDE]; if(T<m(S,4)) return [J1c,VIDE,VIDE]; return [J1d,J2d,J3d]; };

  /* ---- Les écrits ---- */
  const C0='00-accroche', C3='03-question', Q='01q-question';
  const groupes=[
    {de:acc+.1,a:m(C0,5),top:352,fs:62,phrases:[dit(C0,0,'Plie une feuille en deux.')]},
    {de:m(C0,5),a:m(C0,6),top:352,fs:62,phrases:[dit(C0,5,'Encore.')]},
    {de:m(C0,6),a:m(C0,8),top:352,fs:62,phrases:[dit(C0,6,'Et encore.')]},
    {de:m(C0,8),a:pl,top:60,fs:62,phrases:[dit(C0,8,'Combien de couches ?')]},
    {de:m(S,22),a:qu,top:60,fs:80,phrases:[dit(S,22,'Pas 2 × 5 !')]},
    {de:qu+.05,a:m(C3,6),top:60,fs:62,phrases:[dit(C3,0,'Après 7 pliages,'),dit(C3,3,'combien de couches ?')]},
    {de:m(C3,6),a:f,top:60,fs:62,phrases:[dit(C3,6,'Écris-le avec une puissance,'),dit(C3,10,'et réponds en commentaire !')]}
  ];
  const tics=[]; for(const [,b] of PLIS.slice(0,5)) tics.push({t:b,f:330}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});
  /* Au mot « 2 fois 5 » : le 2 et le 5 se relisent dans la légende, les mots ont leur rang */
  groupes[4].phrases[0][3]=[m(S,22),m(S,23),m(S,24),m(S,25),m(S,25)];
  poserMiniature(outils,su+9.6,'Plie 7 fois :<br><span style="font-size:84px;white-space:nowrap">combien de couches ?</span><div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  return { clips,FIN,tics,titre:'La feuille pliée',ceinture:0,finTitre:m(C0,8),groupes,finClip:'04-abonne',
    cuts:[pl,q,qu,f],
    question:{ qc:Q,rc:R,finR:su,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[dit(Q,1,'Après 3 pliages,'),dit(Q,4,'combien de couches ?')],
      pause:[dit(Q,13,'Mets pause,'),dit(Q,15,'et choisis !')],
      choix:[['6',m(Q,7)-q,m(Q,8)-q],['8',m(Q,9)-q,m(Q,10)-q],['9',m(Q,11)-q,m(Q,12)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[dit(R,2,'8.')],suite:[] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), {k,u,bord}=poserPile(T);
      const dansQ=T>=q&&T<su, dansTour=T>=qu&&T<f, dansF=T>=f;
      table.visible=pile.visible=!dansF;
      /* Ti Margo se tient derrière le coin de la table : sa queue passe derrière le pied */
      scene.ry=0; scene.z=-1; scene.x=-1.28;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansTour){ const v=lisse((T-qu)/1.6); cam.d=lerp(11.6,20.4,v); cam.y=lerp(2.15,6.4,v); scene.x=lerp(-1.28,-1.7,v); }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      /* La main suit le bord libre de la feuille, tant qu'il est à portée */
      const tl=scene.taille||.9;
      if(u!==null&&!dansTour){ PO.gesteD='ouverte'; PO.md.set((bord.x-scene.x)/tl,bord.y/tl,(.75-scene.z)/tl); PO.cd.set(.82,1.55+.1*k,.55); PO.tetZ=-.1; PO.regX=-.2; PO.regY=.55; }
      else if(T<pl){ T>=m(C0,8)?g.reflechit():g.ouvre(); }
      else if(T<q){ g.montre(); }
      else if(T<r){ g.reflechit(); }
      else if(T<su){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<qu){ if(T>=m(S,22)){ g.montre(); PO.md.x+=Math.sin(T*16)*.17; PO.tetY=Math.sin(T*8)*.25; } else if(T>=m(S,17)) g.pouce(); else g.ouvre(); }
      else if(dansTour){ if(T<m(C3,6)){ g.oups(); PO.tetX=-.32; PO.regX=-.4; PO.regY=.35; } else g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=-1.28; cam.y=3.3; cam.d=11.6; PO.jaw=.62; g.pouce(); }

      /* Le panneau */
      const voirP=(T>=pl&&T<q)||(T>=m(R,3)&&T<su)||(T>=su&&T<qu);
      panneau.style.display=voirP?'block':'none';
      if(voirP){ const [a,b,c]=rangees(T); [['l1',a],['l2',b],['l3',c]].forEach(([id,l])=>{ const e=$(id); e.style.display=l.length?'':'none'; jetons(e,l,T); }); }
      for(const e of panneau.querySelectorAll('.expo')){ const t0=(T<su)?m(R,10):m(S,19), v=(T-t0)/.7; e.style.transform=(v>0&&v<1)?`scale(${1+.8*Math.sin(v*Math.PI)})`:''; }
      outils.legende.classList.toggle('piege',T>=m(S,22)&&T<qu);
    } };
};
