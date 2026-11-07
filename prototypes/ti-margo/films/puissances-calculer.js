/* ============================================================
   ÉPISODE 02 : SOS CALCULATRICE. −2⁴ = −16 ; (−2)⁴ = 16.
   Ti Margo veut la réparer à la clé anglaise : elle n'est pas cassée, c'est la priorité.
   Voix validée (seule la phrase de fin suit la règle du 05/11).
   ============================================================ */
FILMS.calculer=function(outils){
  const {$,panneau,legende}=outils;
  const DUR={'00-accroche':6.955,'01-explication':15.09,'01q-question':10.935,'01r-reponse':4.73,'02-question':6.0,'03-abonne':6.045};
  const C0='00-accroche',X='01-explication',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('calculer',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],q=A[Q],r=A[R],d=A[D],f=A[F];
  document.body.classList.add('cartes-en-ligne');

  /* ---- L'atelier de réparation ---- */
  poserPiece(0xffe3b0,0x9fb4c7,0x5b6f82);
  /* Des outils accrochés au mur */
  const ombreOutil=new THREE.MeshBasicMaterial({color:0xc99a5e});
  const planche=new THREE.Mesh(new THREE.PlaneGeometry(4.4,1.3),new THREE.MeshBasicMaterial({color:0xe4b777})); planche.position.set(0,4.7,-2.34); scene3d.add(planche);
  /* Marteaux et tournevis dessinés en silhouette : un manche et une tête */
  for(const [px,tl,th] of [[-1.7,.42,.2],[-.95,.12,.34],[-.2,.42,.2],[.55,.12,.34],[1.3,.42,.2]]){ const o=new THREE.Mesh(new THREE.PlaneGeometry(.1,.75),ombreOutil); o.position.set(px,4.6,-2.3); scene3d.add(o); const t=new THREE.Mesh(new THREE.PlaneGeometry(tl,th),ombreOutil); t.position.set(px,5,-2.3); scene3d.add(t); }
  /* L'établi au fond */
  const etabli=new THREE.Mesh(new THREE.PlaneGeometry(120,1.1),new THREE.MeshBasicMaterial({color:0x7d8fa1})); etabli.position.set(0,.8,-2.32); scene3d.add(etabli);

  /* ---- La calculatrice, avec ses yeux ---- */
  const calc=new THREE.Group(); calc.position.set(.98,0,0); scene3d.add(calc);
  piece(calc,new RoundedBoxGeometry(2.05,3.05,.34,3,.1),toon(0x2b4a6f),[0,1.6,0],CONTOUR_FIN);
  for(const px of [-.7,.7]) piece(calc,new RoundedBoxGeometry(.34,.14,.3,2,.05),toon(0x1c3350),[px,.05,0],CONTOUR_FIN);
  const yeuxC=[]; for(const px of [-.36,.36]){ piece(calc,new THREE.SphereGeometry(.21,20,16),C.blanc,[px,3.24,.14],CONTOUR_FIN); yeuxC.push(piece(calc,new THREE.SphereGeometry(.09,14,12),C.noir,[px,3.24,.32],null)); }
  /* L'écran : deux lignes */
  piece(calc,new RoundedBoxGeometry(1.84,1.02,.04,2,.02),toon(0x0f2238),[0,2.42,.17],null);
  const ecr=ecran3d(1.76,.94,[0,2.42,.2],calc);
  /* Le voyant du signe du produit, entre les yeux */
  const voyant=ecran3d(.3,.3,[0,3.24,.2],calc); voyant.mesh.visible=false;
  /* Les touches ; les parenthèses sont les deux du milieu en haut */
  const touches=[]; for(let l=0;l<3;l++) for(let c=0;c<4;c++){ const kx=-.69+c*.46, ky=1.5-l*.42, par=l===0&&(c===1||c===2);
    const t=piece(calc,new RoundedBoxGeometry(.38,.32,.06,2,.03),toon(par?0x8fa3b8:(c===3?0xf5a50a:0xdbe4ec)),[kx,ky,.18],CONTOUR_FIN); if(par) touches.push(t); }
  ['(',')'].forEach((s,i)=>{ const e=ecran3d(.3,.28,[-.23+i*.46,1.5,.22],calc); e.ecrire(s,(g,w,h)=>{ g.fillStyle='#0f2238'; g.font='800 70px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2); }); });
  const matPar=touches.map(t=>t.material);

  /* La sueur de la calculatrice */
  const gouttes=[0,1,2].map(()=>piece(calc,new THREE.SphereGeometry(.07,12,10).scale(1,1.4,1),toon(0x8fd6ff),[-1.05,3,.1],null));

  /* La clé anglaise : dans la main, puis par terre */
  function fairecle(){ const g=new THREE.Group(), mt=toon(0x93a4b3);
    piece(g,new RoundedBoxGeometry(.13,.95,.07,2,.02),mt,[0,.34,0],CONTOUR_FIN);
    piece(g,new RoundedBoxGeometry(.38,.2,.08,2,.02),mt,[0,.88,0],CONTOUR_FIN);
    piece(g,new RoundedBoxGeometry(.11,.22,.08,2,.02),mt,[-.13,1.04,0],CONTOUR_FIN); piece(g,new RoundedBoxGeometry(.11,.22,.08,2,.02),mt,[.13,1.04,0],CONTOUR_FIN);
    return g; }
  const cleMain=fairecle(); cleMain.rotation.z=-.25; mainD.g.add(cleMain);
  const clePar=fairecle(); scene3d.add(clePar);

  /* Ce que dit l'écran : une liste de morceaux [texte,couleur] par ligne */
  const BL='#e8f2ff',OR='#ff9f43',VE='#7ee787',RO='#ff7b72',PA='#5d7690';
  function dessineLigne(g,w,y,morceaux,tp=112){ g.font=`800 ${tp}px "Segoe UI"`; const tot=morceaux.reduce((s,[t])=>s+g.measureText(t).width,0); let px=(w-tot)/2; g.textBaseline='middle'; g.textAlign='left';
    for(const [t,c] of morceaux){ g.fillStyle=c; g.fillText(t,px,y); px+=g.measureText(t).width; } }
  function afficheur(T){
    let a=[],b=[],k='';
    if(T<q){
      if(T<x){ if(T>=m(C0,4)) a.push(['−2',BL]); if(T>=m(C0,6)) a.push(['^4',BL]); if(T>=m(C0,9)) b=[['= −16',BL]]; k='a'+a.length+b.length; }
      else if(T<m(X,20)){ const de2=T>=m(X,7)&&T<m(X,13), moinsRouge=T>=m(X,13);
        a=[['−',de2?PA:(moinsRouge?RO:BL)],['2',de2?OR:BL],['^4',de2?OR:BL]]; b=[['= −16',T>=m(X,16)?RO:BL]]; k='b'+de2+moinsRouge+(T>=m(X,16)); }
      else { a=[['(',VE],['−2',BL],[')',VE],['^4',BL]]; if(T>=m(X,31)) b=[['= 16',VE]]; k='c'+b.length; }
    } else if(T<d){ a=T>=m(Q,6)?[['(',VE],['−3',BL],[')',VE],['^2',BL]]:[]; if(T>=m(R,2)) b=[['= 9',VE]]; k='d'+a.length+b.length; }
    else { if(T>=m(D,4)) a=[['−1^100',BL]]; else if(T>=m(D,2)) a=[['−1',BL]]; if(T>=m(D,4)) b=[['= ?',OR]]; k='e'+a.length+(a[0]?a[0][0].length:0)+b.length; }
    ecr.ecrire(k,(g,w,h)=>{ if(a.length) dessineLigne(g,w,h*.3,a,a.length===1&&a[0][0].length>4?96:112); if(b.length) dessineLigne(g,w,h*.74,b); });
  }

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const ACC=J(C0,[[3,'−'],[4,ba('2')],[6,sup('4')+' '],[7,'= '],[9,pi('−16')]]);
  const L1=J(X,[[8,ba('2')],[9,sup('4')+' '],[10,'= '+ok('16')]]);
  const L2=J(X,[[11,'puis '],[13,pi('−')+' '],[14,'devant : '],[16,pi('−16')]]);
  const P1=J(X,[[20,'('+ba('−2')+') '],[22,'× '],[24,'('+ba('−2')+')']]);
  const P2=J(X,[[25,'× '],[27,'('+ba('−2')+') '],[28,'× '],[30,'('+ba('−2')+')']]);
  const P3=J(X,[[31,'= '+ok('16')]]);
  const E=J(D,[[1,'−'],[2,ba('1')],[4,sup('100')]]);
  const rangees=T=>{ if(T<m(X,7)) return [ACC]; if(T<m(X,20)) return [L1,T>=m(X,11)?L2:[]]; return [P1,P2,P3]; };

  /* ---- Les écrits ---- */
  const groupes=[
    {de:acc+.1,a:m(C0,10),top:352,fs:62,phrases:[ec(C0,'0:Ma 1:calculatrice 2:dit :')]},
    {de:m(C0,10),a:x,top:60,fs:66,phrases:[ec(C0,'10:Elle 11:est 12:cassée ?')]},
    {de:x,a:m(X,1),top:60,fs:80,phrases:[ec(X,'0:Non !')]},
    {de:m(X,1),a:m(X,17),top:60,fs:58,phrases:[ec(X,'1:Sans 2:parenthèses,'),ec(X,'3:la 4:puissance 5:passe 6:d’abord :')]},
    {de:m(X,17),a:q,top:60,fs:62,phrases:[ec(X,'17:Avec 18:des 19:parenthèses :')]},
    {de:d+.05,a:m(D,7),top:60,fs:66,phrases:[ec(D,'0:Et 2:−1 3:puissance 4:100,'),ec(D,'5:sans 6:parenthèses ?')]},
    {de:m(D,7),a:f,top:60,fs:62,phrases:[ec(D,'7:Réponds 8:en 9:commentaire !')]}
  ];
  const tics=[{t:x+.42,f:190}]; for(const i of [20,23,26,29]) tics.push({t:m(X,i),f:i%2?420:520}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,12)+.3,'−2⁴ = −16<div style="color:#e8590c;font-size:108px;margin-top:8px">ELLE EST CASSÉE ?</div>');

  return { clips,FIN,tics,titre:'SOS calculatrice',ceinture:0,finTitre:m(C0,10),groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'2:−3, 3:entre 4:parenthèses,'),ec(Q,'5:au 6:carré ?')],
      pause:[ec(Q,'14:Mets 15:pause,'),ec(Q,'16:et 17:choisis !')],
      choix:[['−9',m(Q,7)-q,m(Q,9)-q],['9',m(Q,10)-q,m(Q,11)-q],['6',m(Q,12)-q,m(Q,13)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:9.')],suite:[ec(R,'3:Deux 4:signes 5:moins :'),ec(R,'6:le 7:résultat 8:est 9:positif.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      calc.visible=!dansF;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      /* La calculatrice : elle tremble tant qu'on la croit cassée ; saut quand elle a raison */
      const tremble=T<x?Math.min(1,Math.max(0,(T-m(C0,9))/.3)):0;
      calc.rotation.z=Math.sin(T*38)*.018*tremble;
      let sy=0; for(const s of [x,m(X,31),m(R,2)]){ const v=(T-s)/.55; if(v>0&&v<1) sy=Math.max(sy,.42*Math.sin(v*Math.PI)); }
      calc.position.y=sy;
      gouttes.forEach((gt,i)=>{ const v=((T-i*.33)%1+1)%1; gt.visible=tremble>0; gt.position.set(-1.1-v*.25,3.1-v*1.1,.05); gt.scale.setScalar(1-.4*v); });
      /* Les yeux : ils surveillent la clé, puis Ti Margo */
      const regard=T>=m(C0,10)&&T<x?[-.05,-.04]:(T>=x&&T<m(X,17)?[-.06,0]:[0,-.05]);
      yeuxC.forEach((n,i)=>{ n.position.x=(i?.36:-.36)+regard[0]; n.position.y=3.24+regard[1]; });
      afficheur(T);
      /* Le voyant : le signe du produit, à chaque facteur −2 */
      const nbM=[20,23,26,29].filter(i=>T>=m(X,i)).length, voirV=T>=m(X,20)&&T<q;
      voyant.mesh.visible=voirV;
      if(voirV) voyant.ecrire('v'+nbM,(gc,w,h)=>{ gc.fillStyle=nbM%2?'#c92a2a':'#2f9a3a'; gc.beginPath(); gc.arc(w/2,h/2,w/2-2,0,7); gc.fill(); gc.fillStyle='#fff'; gc.font='800 62px "Segoe UI"'; gc.textAlign='center'; gc.textBaseline='middle'; gc.fillText(nbM%2?'−':'+',w/2,h/2+3); });
      /* Les touches ( ) s'allument quand la voix dit « parenthèses » */
      const allume=(T>=m(X,19)&&T<q)||(T>=m(Q,4)&&T<d);
      matPar.forEach(mp=>mp.color.setHex(allume?0x7ee787:0x8fa3b8));

      /* La clé : levée à « cassée », lâchée à « Non ! » */
      const tient=T>=m(C0,10)&&T<x; cleMain.visible=tient;
      clePar.visible=T>=x&&T<f;
      if(clePar.visible){ const dt=T-x, ch=Math.min(1,dt/.42); clePar.position.set(-.42,Math.max(.1,2.9-ch*ch*2.8),.7); clePar.rotation.set(ch*-1.45,0,-.25+ch*1.6); }

      if(tient){ PO.gesteD='poing'; const v=lisse((T-m(C0,10))/.5); PO.md.set(.9,2.1+.7*v+Math.sin(T*5)*.05*v,.42); PO.cd.set(.82,1.7+.2*v,.1); PO.tetZ=-.08; PO.regX=-.05; PO.regY=.55; }
      else if(T<x){ T<m(C0,3)?g.ouvre():g.montre(); PO.regY=.55; PO.regX=-.2; }
      else if(T<m(X,1)){ g.oups(); PO.regX=.25; PO.regY=.1; }
      else if(T<m(X,17)){ g.montre(); PO.regY=.55; }
      else if(T<q){ T>=m(X,31)?g.pouce():g.ouvre(); }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,7)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ cam.y=2.9; cam.d=11.6; PO.jaw=.62; cleMain.visible=true; PO.gesteD='poing'; PO.md.set(.9,2.8,.42); PO.cd.set(.82,1.9,.1); }

      const voirP=(T>=m(C0,3)&&T<q)||(T>=m(D,1)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E]:rangees(T));
      legende.classList.toggle('piege',T>=m(C0,10)&&T<x);
    } };
};
