/* ============================================================
   Série Carré et cube 5e, épisode 01 : LE CUBE DE DÉS (voix 5e-puissance-notation-short).
   La salle de jeux : Ti Margo croit que 3 au cube fait 9. Il pose une couche de 3 rangées de 3 dés :
   9 dés, c'est 3². Mais un cube a une hauteur : 3 couches de 9, 27 dés, 3³ = 3 × 3 × 3 = 27.
   Code couleur de la série : bleu le nombre (la base), orange l'exposant, vert juste, rouge piège.
   Outils communs (gestes, chrono, lignesPanneau, ba/sup/ok/pi, poserPiece, ecran3d, poserMiniature) :
   films/puissances-commun.js.
   ============================================================ */
FILMS.notation=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':9.005,'01-couche':8.235,'02-cube':11.125,'02q-question':8.435,'02r-reponse':6.425,'03-question':9.13,'04-abonne':6.045};
  const C0='00-accroche',CO='01-couche',CU='02-cube',Q='02q-question',R='02r-reponse',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('notation',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],co=A[CO],cu=A[CU],q=A[Q],r=A[R],d=A[D],f=A[F];
  document.body.classList.add('cartes-en-ligne');

  /* ---- La salle de jeux : mur lavande, moquette bleue ---- */
  poserPiece(0xcdbdf0,0x5b7fc0,0x4c3d8f);
  /* Une étagère de boîtes de jeux, au mur */
  piece(scene3d,new RoundedBoxGeometry(2.6,.1,.5,2,.03),toon(0x8a5a2b),[.95,4.15,-2.1],CONTOUR_FIN);
  [[-1.25,.95,.5,0xe03131],[-.82,.7,.4,0x1971c2],[-.42,1.05,.36,0x2f9e44],[-.02,.8,.42,0xf59f00],[.42,.9,.46,0x9c36b5],[.85,.62,.34,0x0c8599]]
    .forEach(([x,h,l,c])=>piece(scene3d,new RoundedBoxGeometry(l,h,.4,2,.03),toon(c),[x+1.15,4.2+h/2,-2.1],CONTOUR_FIN));
  /* Une affiche en pixels (un cœur) */
  const affiche=ecran3d(1.05,1.05,[-1.75,4.75,-2.33]);
  affiche.ecrire('coeur',(g,w,h)=>{ g.fillStyle='#fff8e1'; g.fillRect(0,0,w,h); g.strokeStyle='#4c3d8f'; g.lineWidth=14; g.strokeRect(7,7,w-14,h-14);
    const M=['0110110','1111111','1111111','0111110','0011100','0001000'], p=w/9;
    M.forEach((l,i)=>[...l].forEach((v,j)=>{ if(v==='1'){ g.fillStyle='#e03131'; g.fillRect(p+j*p,p*1.5+i*p,p-3,p-3); } })); });

  /* ---- La table de jeu, tapis vert ---- */
  const CX=.8, Y0=1.08;
  const table=new THREE.Group(); scene3d.add(table); const bois=toon(0x7a4a22);
  piece(table,new RoundedBoxGeometry(2.6,.12,1.9,3,.03),bois,[CX,Y0-.07,0],CONTOUR_FIN);
  piece(table,new RoundedBoxGeometry(2.36,.02,1.66,2,.01),toon(0x2b8a3e),[CX,Y0,0],null);
  for(const [x,z] of [[-1.15,-.78],[1.15,-.78],[-1.15,.78],[1.15,.78]]) piece(table,new RoundedBoxGeometry(.13,Y0-.12,.13,2,.02),bois,[CX+x,(Y0-.12)/2,z],CONTOUR_FIN);

  /* ---- Les dés : une texture par face, un jeu de matériaux par dé (pour le teinter) ---- */
  const PIPS={1:[[.5,.5]],2:[[.27,.27],[.73,.73]],3:[[.25,.25],[.5,.5],[.75,.75]],4:[[.27,.27],[.73,.27],[.27,.73],[.73,.73]],
    5:[[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]],6:[[.27,.22],[.73,.22],[.27,.5],[.73,.5],[.27,.78],[.73,.78]]};
  const TEX=[1,6,2,5,3,4].map(n=>{ const cv=document.createElement('canvas'); cv.width=cv.height=128; const g=cv.getContext('2d');
    g.fillStyle='#ffffff'; g.fillRect(0,0,128,128); g.fillStyle=n===1?'#e03131':'#1f2937';
    for(const [x,y] of PIPS[n]){ g.beginPath(); g.arc(x*128,y*128,n===1?17:12,0,7); g.fill(); }
    const t=new THREE.CanvasTexture(cv); t.colorSpace=THREE.SRGBColorSpace; return t; });
  const S=.44, PAS=.48, GEO=new RoundedBoxGeometry(S,S,S,3,.05);
  function de(parent){ const mats=TEX.map(t=>new THREE.MeshBasicMaterial({map:t})); const me=piece(parent,GEO,mats,[0,0,0],CONTOUR_FIN);
    me.rotation.y=(Math.random()-.5)*.12; return {me,mats,teinte:null}; }
  function teinter(dd,hex){ if(dd.teinte===hex) return; dd.teinte=hex; dd.mats.forEach(mt=>mt.color.setHex(hex)); }
  const BLANC=0xffffff, BLEU=0x9fd3ff, VERT=0xa9f0a4, ROUGE=0xffb1b1;

  /* Le cube de 27 : DES[j][k][i], couche j (bas en haut), rangée k (de l'avant au fond), dé i (de gauche à droite) */
  const cube=new THREE.Group(); scene3d.add(cube);
  const DES=[0,1,2].map(j=>[0,1,2].map(k=>[0,1,2].map(i=>{ const dd=de(cube); dd.pos=[CX+(i-1)*PAS,Y0+S/2+.005+j*(S+.012),(1-k)*PAS]; return dd; })));
  /* Le cube de 8 (la réponse) : DE2[j][k][i] */
  const cube2=new THREE.Group(); scene3d.add(cube2);
  const DE2=[0,1].map(j=>[0,1].map(k=>[0,1].map(i=>{ const dd=de(cube2); dd.pos=[CX+(i-.5)*PAS,Y0+S/2+.005+j*(S+.012),(.5-k)*PAS]; return dd; })));
  /* L'arête de 4 dés (le défi) et le cube de côté 4, en fil orange */
  const defi=new THREE.Group(); scene3d.add(defi);
  const ARETE=[0,1,2,3].map(i=>{ const dd=de(defi); dd.pos=[CX+(i-1.5)*PAS*.85,Y0+S/2+.005,.5]; return dd; });
  /* Le cube de côté 4 : ses 12 arêtes en baguettes orange (bien visibles) */
  const L4=4*PAS*.85, fil=new THREE.Group(); fil.position.set(CX,Y0+L4/2+.005,.5+S/2+.01-L4/2); defi.add(fil);
  { const h=L4/2, e=.035, mo=new THREE.MeshBasicMaterial({color:0xe8590c});
    for(const a of [-h,h]) for(const b of [-h,h]){
      const x=new THREE.Mesh(new THREE.BoxGeometry(L4+e,e,e),mo); x.position.set(0,a,b); fil.add(x);
      const y=new THREE.Mesh(new THREE.BoxGeometry(e,L4+e,e),mo); y.position.set(a,0,b); fil.add(y);
      const z=new THREE.Mesh(new THREE.BoxGeometry(e,e,L4+e),mo); z.position.set(a,b,0); fil.add(z); } }
  const pointQ=ecran3d(.9,.9,[CX,Y0+L4/2,fil.position.z+.2],defi);
  pointQ.ecrire('q',(g,w,h)=>{ g.fillStyle='#e8590c'; g.font='800 200px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('?',w/2,h/2+10); });
  /* Le carré orange posé sur la couche de 9 (« ça, c'est 3 au carré ») */
  const carre=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(3*PAS+.06,3*PAS+.06)),new THREE.LineBasicMaterial({color:0xe8590c}));
  carre.rotation.x=-Math.PI/2; carre.position.set(CX,Y0+S+.03,0); scene3d.add(carre);
  const carreLarge=[]; for(const [w,h,x,z] of [[3*PAS+.1,.07,0,1.5*PAS+.03],[3*PAS+.1,.07,0,-1.5*PAS-.03],[.07,3*PAS+.1,1.5*PAS+.03,0],[.07,3*PAS+.1,-1.5*PAS-.03,0]]){
    const b=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color:0xe8590c})); b.rotation.x=-Math.PI/2; b.position.set(CX+x,Y0+S+.035,z); scene3d.add(b); carreLarge.push(b); }

  /* ---- Les instants ---- */
  const tRang=[m(CO,4),m(CO,5),m(CO,7)];           /* 3 rangées de 3 : une rangée par mot */
  const tCouche=[co,m(CU,7),m(CU,9)];              /* la couche 1 est posée ; « J'empile », « couches » */
  const t9=m(CO,11), tCarre=m(CO,17), tCarreFin=cu+.1;
  const tAcc3=m(C0,5);                              /* l'accroche : 3 dés, au mot « 3 » */
  const u=(T,t0,dt=.35)=>lisse((T-t0)/dt);
  function poser(dd,T,t0,haut=1.3){ const vu=T>=t0; dd.me.visible=vu; if(!vu) return; const v=u(T,t0); dd.me.position.set(dd.pos[0],dd.pos[1]+(1-v)*haut,dd.pos[2]); }

  function des(T){
    const voirCube=T<q, voir2=T>=r&&T<d, voirDefi=T>=d&&T<f;
    cube.visible=voirCube; cube2.visible=voir2; defi.visible=voirDefi;
    if(voirCube){
      for(let j=0;j<3;j++) for(let k=0;k<3;k++) for(let i=0;i<3;i++){ const dd=DES[j][k][i];
        let t0;
        if(T<co) t0=(j===0&&k===0)?tAcc3+i*.08:1e9;                 /* l'accroche : la rangée de devant */
        else if(j===0) t0=k===0?co-1:tRang[k]+i*.07;                   /* la couche, rangée par rangée */
        else t0=tCouche[j]+k*.05+i*.03;                                  /* les couches du dessus tombent */
        poser(dd,T,t0,j===0?.7:1.4);
        /* Les couleurs : bleu = ce qu'on compte (la base), vert = le résultat juste */
        let c=BLANC;
        if(T>=tAcc3&&T<co&&j===0&&k===0) c=BLEU;
        if(T>=m(CO,8)&&T<t9&&j===0) c=(k===0&&T<m(CO,10))?BLEU:(T>=m(CO,10)?BLEU:BLANC);
        if(T>=t9&&T<m(CO,13)&&j===0) c=VERT;
        if(T>=m(CU,12)&&T<m(CU,14)) c=VERT;
        if(T>=m(CU,18)&&T<m(CU,23)){ if(k===0&&j===0) c=BLEU; if(T>=m(CU,20)&&j===0) c=BLEU; if(T>=m(CU,22)) c=BLEU; }
        if(T>=m(CU,23)) c=VERT;
        teinter(dd,c); }
    }
    if(voir2) for(let j=0;j<2;j++) for(let k=0;k<2;k++) for(let i=0;i<2;i++){ const dd=DE2[j][k][i];
      const t0=j===1?m(R,7):(k===1?m(R,5):m(R,3)+i*.08); poser(dd,T,t0,j?1.2:.7); teinter(dd,T>=m(R,7)+.4?VERT:BLEU); }
    if(voirDefi){ ARETE.forEach((dd,i)=>{ poser(dd,T,m(D,9)+i*.1,.7); teinter(dd,BLEU); });
      fil.visible=T>=m(D,7); pointQ.mesh.visible=T>=m(D,2); }
    const vc=T>=tCarre&&T<tCarreFin; carre.visible=vc; carreLarge.forEach(b=>b.visible=vc);
  }
  /* ---- Le panneau du bas : les maths, écrites en même temps que les dés ---- */
  const lignes=lignesPanneau(outils,3);
  const P0=J(C0,[[5,ba('3')],[7,sup('3')+' '],[9,'= '],[10,pi('9')+' ?']]);
  const P1=J(CO,[[4,ba('3')+' '],[5,'rangées '],[6,'de '],[7,ba('3')]]);
  const P2=J(CO,[[8,ba('3')+' '],[9,'× '],[10,ba('3')+' '],[11,'= '+ok('9')]]);
  const P3=J(CO,[[13,'Ça, '],[14,'c’est '],[15,ba('3')],[17,sup('2')]]);
  const K1=J(CU,[[8,ba('3')+' '],[9,'couches '],[10,'de '],[11,ba('9')+' : '],[12,ok('27')+' '],[13,ok('dés')]]);
  const K2=J(CU,[[14,ba('3')],[16,sup('3')+' '],[17,'= '],[18,ba('3')+' '],[19,'× '],[20,ba('3')+' '],[21,'× '],[22,ba('3')+' '],[23,'= '+ok('27')]]);
  const R1=J(R,[[3,ba('2')+' '],[4,'× '],[5,ba('2')+' '],[6,'× '],[7,ba('2')+' = '+ok('8')]]);
  const R2=J(R,[[8,pi('Pas')+' '],[9,pi('2')+' '],[10,pi('×')+' '],[11,pi('3')]]);
  const D1=J(D,[[9,ba('4')],[16,sup('?')]]);
  const rangees=T=>{ if(T<co) return [P0]; if(T<cu) return [P1,T>=m(CO,8)?P2:[],T>=m(CO,13)?P3:[]]; if(T<q) return [T>=m(CU,8)?K1:[],T>=m(CU,14)?K2:[]];
    if(T<d) return [R1,T>=m(R,8)?R2:[]]; return [D1]; };

  /* ---- Les écrits : exactement ce que dit la voix ---- */
  const finTitre=m(C0,5)-.08;
  const groupes=[
    {de:acc+.1,a:finTitre,top:352,fs:62,phrases:[ec(C0,'0:Salut !'),ec(C0,'1:Moi, 2:c’est 3:Ti 4:Margo.')]},
    {de:finTitre,a:m(C0,12)-.08,top:60,fs:66,phrases:[ec(C0,'5:3 6:au 7:cube, 8:ça 9:fait 10:9, 11:non ?')]},
    {de:m(C0,12)-.08,a:co,top:60,fs:66,phrases:[ec(C0,'12:Tu 13:paries 14:que 15:c’est 16:faux ?')]},
    {de:co,a:m(CO,13)-.08,top:60,fs:60,phrases:[ec(CO,'0:Je 1:pose 2:des 3:dés :'),ec(CO,'4:3 5:rangées 6:de 7:3.')]},
    {de:m(CO,13)-.08,a:cu,top:60,fs:60,phrases:[ec(CO,'13:Ça, 14:c’est 15:3 16:au 17:carré.')]},
    {de:cu,a:m(CU,7)-.08,top:60,fs:60,phrases:[ec(CU,'0:Mais 1:un 2:cube,'),ec(CU,'3:ça 4:a 5:une 6:hauteur !')]},
    {de:m(CU,7)-.08,a:m(CU,14)-.08,top:60,fs:60,phrases:[ec(CU,'7:J’empile 8:3 9:couches 10:de 11:9 :'),ec(CU,'12:27 13:dés.')]},
    {de:m(CU,14)-.08,a:q,top:60,fs:60,phrases:[ec(CU,'14:3 15:au 16:cube, 17:c’est'),ec(CU,'18:3 19:fois 20:3 21:fois 22:3 : 23:27.')]},
    {de:d+.05,a:m(D,13)-.08,top:60,fs:58,phrases:[ec(D,'0:À 1:toi : 2:combien 3:de 4:dés 5:pour'),ec(D,'6:un 7:cube 8:de 9:4 10:dés 11:de 12:côté ?')]},
    {de:m(D,13)-.08,a:f,top:60,fs:58,phrases:[ec(D,'13:Écris-le 14:avec 15:un 16:exposant.'),ec(D,'17:Réponds 18:en 19:commentaire !')]}
  ];
  /* Les bruitages : un « toc » à chaque rangée et couche posée, le tic-tac du compte à rebours */
  const tics=[{t:tAcc3+.3,f:520}]; for(const t of tRang.slice(1)) tics.push({t:t+.3,f:520}); for(const t of tCouche.slice(1)) tics.push({t:t+.36,f:430});
  for(const t of [m(R,3),m(R,5),m(R,7)]) tics.push({t:t+.3,f:520}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(CU,16)+.2,`${ba('3')}${sup('3')} = ${pi('9')} ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>`);

  return { clips,FIN,tics,titre:'Le cube de dés',ceinture:0,finTitre,groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Combien 2:vaut 3:2 4:au 5:cube ?')],
      pause:[ec(Q,'12:Mets 13:pause,'),ec(Q,'14:et 15:choisis !')],
      choix:[['6',m(Q,6)-q,m(Q,7)-q],['8',m(Q,8)-q,m(Q,9)-q],['9',m(Q,10)-q,m(Q,11)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:8 !')],suite:[] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<r, dansR=T>=r&&T<d, dansF=T>=f;
      des(T);
      table.visible=!dansF;
      scene.ry=0; scene.z=-.4; scene.x=-1.3;
      cam.x=0; cam.e=.36; cam.d=11.6; cam.y=2.1;
      if(T<finTitre){ cam.d=10.6; cam.y=2.4; }
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansR){ cam.d=12; cam.y=2.6; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; cam.e=.1; }

      if(T<co){ if(T<m(C0,5)) g.ouvre(); else if(T<m(C0,12)) g.reflechit(); else g.montre(); }
      else if(T<cu){ if(T>=tCarre) g.pouce(); else g.montre(); }
      else if(T<q){ if(T<m(CU,7)){ g.oups(); PO.tetX=-.3; PO.regY=.5; } else if(T>=m(CU,23)) g.pouce(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<d){ T<m(R,1)?g.ouvre():(T<m(R,8)?g.pouce():g.montre()); }
      else if(T<f){ T<m(D,17)?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ cam.x=.12; cam.y=2.7; cam.d=11.6; cam.e=.2; PO.jaw=.62; g.reflechit(); }

      const voirP=(T>=m(C0,5)&&T<q&&!(T>=cu&&T<m(CU,8)))||(T>=m(R,3)&&T<d)||(T>=m(D,9)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,rangees(T));
      for(const e of panneau.querySelectorAll('.expo')){ const v=(T-(T<co?m(C0,7):(T<cu?tCarre:(T<q?m(CU,16):m(D,16)))))/.7; e.style.transform=(v>0&&v<1)?`scale(${1+.8*Math.sin(v*Math.PI)})`:''; }
      legende.classList.toggle('piege',T>=m(C0,5)&&T<m(C0,12));
    } };
};
