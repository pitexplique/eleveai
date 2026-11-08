/* ============================================================
   Carré et cube 5e, ÉPISODE 03 : LA FÊTE DES LANTERNES (micro puissance_simple_ecrire).
   La nuit, Ti Margo a 64 lanternes. Il parie d'en faire un carré (8 rangées de 8 : 64 = 8²),
   puis un cube (4 sur 4, 4 étages : 64 = 4³). Question : 100 = 10². Défi en commentaire : 49 et 27.
   Code couleur : bleu la base, orange l'exposant, vert le résultat.
   ============================================================ */
FILMS.ecrire=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':10.235,'01-carre':9.23,'02-cube':11.795,'02q-question':12.355,'02r-reponse':7.675,'03-question':7.26,'04-abonne':6.045};
  const C0='00-accroche',X='01-carre',Y='02-cube',Q='02q-question',R='02r-reponse',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('ecrire',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],y=A[Y],q=A[Q],r=A[R],qu=A[D],f=A[F];

  /* La nuit : le ciel sombre derrière le canvas ; les exposants des choix n'arrivent qu'au mot « carré » / « cube » */
  { const css=document.createElement('style'); css.textContent=`body.video{background:linear-gradient(#0a1230 0%,#1b2a5c 60%,#141a33 60%);}
    body:not(.vxA) .xA,body:not(.vxB) .xB,body:not(.vxC) .xC{visibility:hidden;}`; document.head.append(css); }

  /* ---- Le décor : la place de la fête, la nuit ---- */
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(160,80),new THREE.MeshBasicMaterial({color:0x13204a})); ciel.position.set(0,30,-6); scene3d.add(ciel);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x2a2440})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  /* Les collines, la lune, les étoiles */
  for(const [cx,rx,ry,c] of [[-4,5,1.6,0x1b1838],[3.5,6,2.2,0x201c42],[9,4,1.3,0x1b1838]]){ const h=new THREE.Mesh(new THREE.CircleGeometry(1,40),new THREE.MeshBasicMaterial({color:c})); h.scale.set(rx,ry,1); h.position.set(cx,0,-5.8); scene3d.add(h); }
  const lune=new THREE.Mesh(new THREE.CircleGeometry(.55,40),new THREE.MeshBasicMaterial({color:0xfff3c4})); lune.position.set(-2.6,6.1,-5.7); scene3d.add(lune);
  const etoiles=[]; { const blanc=new THREE.MeshBasicMaterial({color:0xffffff}); for(let i=0;i<70;i++){ const e=new THREE.Mesh(new THREE.CircleGeometry(.025+Math.random()*.03,6),blanc); e.position.set(-7+Math.random()*14,1.8+Math.random()*7.5,-5.75); scene3d.add(e); etoiles.push(e); } }
  /* Le portique des lanternes : deux poteaux, une barre, 8 fils */
  const XW=1.12, ZW=-1.6, YH=4.05, PAS=.33;
  const bois=toon(0x6b4423);
  for(const px of [XW-1.55,XW+1.55]) piece(scene3d,new RoundedBoxGeometry(.12,4.5,.12,2,.03),bois,[px,2.25,ZW-.05],CONTOUR_FIN);
  piece(scene3d,new RoundedBoxGeometry(3.3,.12,.12,2,.03),bois,[XW,4.48,ZW-.05],CONTOUR_FIN);
  const fil=new THREE.MeshBasicMaterial({color:0x3b3355});
  for(let c=0;c<8;c++){ const w=new THREE.Mesh(new THREE.PlaneGeometry(.012,2.55),fil); w.position.set(XW+(c-3.5)*PAS,4.42-1.27,ZW-.04); scene3d.add(w); }
  /* Les guirlandes au loin */
  const ampoules=[]; { const coul=[0xffd43b,0xff8787,0x74c0fc,0x8ce99a]; for(let i=0;i<26;i++){ const t=i/25, b=new THREE.Mesh(new THREE.CircleGeometry(.06,10),new THREE.MeshBasicMaterial({color:coul[i%4]})); b.position.set(-6+t*12,5.2-1.2*Math.sin(t*Math.PI)*.0-.5*Math.sin(t*Math.PI*2)**2,-5.5); scene3d.add(b); ampoules.push(b); } }

  /* ---- Les 64 lanternes ---- */
  const ETEINTE=0x7a2e1f, ALLUMEE=0xffa94d, VIVE=0xffe066;
  const geoL=new THREE.SphereGeometry(.14,20,14).scale(1,.86,1), geoC=new THREE.CylinderGeometry(.06,.06,.05,12);
  const capMat=toon(0x3b2a20);
  const L=[]; for(let i=0;i<64;i++){ const g=new THREE.Group(); scene3d.add(g);
    const mat=new THREE.MeshBasicMaterial({color:ETEINTE}); piece(g,geoL,mat,[0,0,0],CONTOUR_FIN);
    piece(g,geoC,capMat,[0,.13,0],null); piece(g,geoC,capMat,[0,-.13,0],null);
    L.push({g,mat}); }
  /* Les trois places de chaque lanterne : en vrac (accroche), au portique (carré), dans le cube */
  const VRAC=L.map(()=>[-.3+Math.random()*2.6,.7+Math.random()*3.6,-1.4+Math.random()*1.6]);
  const MUR=L.map((_,i)=>{ const rg=Math.floor(i/8), c=i%8; return [XW+(c-3.5)*PAS,YH-rg*.34,ZW]; });
  const CX=1.05, CZ=-.25, RY=.55, PC=.32;
  const CUBE=L.map((_,i)=>{ const j=Math.floor(i/16), k=Math.floor((i%16)/4), ii=i%4; const lx=(ii-1.5)*PC, lz=(1.5-k)*PC;
    return [CX+lx*Math.cos(RY)+lz*Math.sin(RY),.2+j*PC,CZ-lx*Math.sin(RY)+lz*Math.cos(RY)]; });
  /* La fin : elles s'envolent dans le ciel */
  const CIEL=L.map((_,i)=>[-1.8+Math.random()*4.4,7+Math.random()*3,-2.5-Math.random()*2]);

  /* Les instants : rangée r du carré, étage j du cube */
  const tRang=rg=>m(X,1)+rg*(m(X,6)+.3-m(X,1))/8;
  const tEtage=j=>j===0?m(Y,3):m(Y,8)+(j-1)*.36;
  const tVrac=i=>m(C0,6)+.6*i/64;
  const DV=.45;
  const vers=(a,b,e)=>[a[0]+(b[0]-a[0])*e,a[1]+(b[1]-a[1])*e+Math.sin(e*Math.PI)*.35,a[2]+(b[2]-a[2])*e];
  function poserLanternes(T){
    L.forEach((l,i)=>{ const rg=Math.floor(i/8), j=Math.floor(i/16);
      let p, vu=T>=tVrac(i), coul=ALLUMEE, s=1;
      if(T<tRang(rg)){ p=VRAC[i].slice(); p[1]+=Math.sin(T*1.3+i)*.06; s=Math.min(1,(T-tVrac(i))/.3); }
      else if(T<tEtage(j)){ const e=lisse((T-tRang(rg))/DV); p=vers(VRAC[i],MUR[i],e); coul=e<1?ALLUMEE:VIVE; }
      else if(T<qu+.2){ const e=lisse((T-tEtage(j))/DV); p=vers(MUR[i],CUBE[i],e); coul=e<1?ALLUMEE:VIVE; }
      else { const e=lisse((T-qu-.2-(i%16)*.05)/3.2); p=vers(CUBE[i],CIEL[i],e); p[0]+=Math.sin(T*1.1+i)*.08*e; coul=ALLUMEE; }
      /* « 64 ! » : toutes s'allument d'un coup ; au portique, la rangée dite clignote */
      for(const t0 of [m(X,10),m(Y,14)]){ const v=(T-t0)/.6; if(v>0&&v<1){ coul=0xffffff; s*=1+.25*Math.sin(v*Math.PI); } }
      l.g.visible=vu&&s>0; l.g.position.set(...p); l.g.scale.setScalar(Math.max(.01,s)); l.mat.color.setHex(coul);
    });
  }

  /* Le cadre du carré parfait (au portique) et l'arête du cube */
  const jaune=new THREE.LineBasicMaterial({color:0xffd43b});
  const cadreMur=(()=>{ const w=8*PAS, h=8*.34, x0=XW-w/2, y0=YH+.17-h; const g=new THREE.BufferGeometry().setFromPoints([[x0,y0],[x0+w,y0],[x0+w,y0+h],[x0,y0+h],[x0,y0]].map(([a,b])=>new THREE.Vector3(a,b,ZW+.02))); const l=new THREE.Line(g,jaune); scene3d.add(l); return l; })();
  const cadreCube=(()=>{ const b=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(4*PC,4*PC,4*PC)),jaune); b.position.set(CX,.2-PC/2+2*PC,CZ); b.rotation.y=RY; scene3d.add(b); return b; })();
  /* Les « 8 » et les « 4 » écrits à côté des lanternes, en bleu */
  function chiffre(s,pos){ const e=ecran3d(.42,.42,pos); e.ecrire(s,(g,w,h)=>{ g.fillStyle='#74c0fc'; g.font='800 190px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+8); }); return e.mesh; }
  const huitG=chiffre('8',[XW-4*PAS-.32,YH+.17-4*.34,ZW+.03]), huitH=chiffre('8',[XW,4.83,ZW+.03]);
  /* Un point du cube : coordonnées locales (lx, y, lz) → scène */
  const toW=(lx,py,lz)=>[CX+lx*Math.cos(RY)+lz*Math.sin(RY),py,CZ-lx*Math.sin(RY)+lz*Math.cos(RY)];
  const h=2*PC;
  const qL=chiffre('4',toW(0,.16,h+.32)), qP=chiffre('4',toW(-h-.32,.16,0)), qH=chiffre('4',toW(h+.3,.2+1.5*PC,h+.05));

  /* ---- Le panneau du bas ---- */
  const lignes=lignesPanneau(outils,3);
  const K1=J(X,[[3,ba('8')+' '],[4,'rangées '],[5,'de '],[6,ba('8')+' :']]);
  const K2=J(X,[[7,ba('8')+' '],[8,'× '],[9,ba('8')+' '],[10,'= '+ok('64')]]);
  const K3=J(X,[[11,ok('64')+' '],[12,'= '],[13,ba('8')],[15,sup('2')]]);
  const B1=J(Y,[[3,ba('4')+' '],[4,'sur '],[5,ba('4')+', '],[6,'et '],[7,ba('4')+' '],[8,'étages :']]);
  const B2=J(Y,[[9,ba('4')+' '],[10,'× '],[11,ba('4')+' '],[12,'× '],[13,ba('4')+' '],[14,'= '+ok('64')]]);
  const B3=J(Y,[[15,ok('64')+' '],[16,'= '],[18,ba('4')],[20,sup('3')]]);
  const E1=J(D,[[3,ba('49')+' = '],[6,'?'+sup('2')]]);
  const E2=J(D,[[8,ba('27')+' = '],[11,'?'+sup('3')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:m(C0,5),a:m(C0,8),top:352,fs:66,phrases:[ec(C0,'5:J’ai 6:64 7:lanternes.')]},
    {de:m(C0,8),a:x,top:60,fs:62,phrases:[ec(C0,'8:Tu 9:paries 10:que 11:j’en 12:fais 13:un 14:carré,'),ec(C0,'15:et 16:aussi 17:un 18:cube ?')]},
    {de:x+.05,a:y,top:60,fs:66,phrases:[ec(X,'0:D’abord 1:un 2:carré :')]},
    {de:y+.05,a:q,top:60,fs:66,phrases:[ec(Y,'0:Maintenant 1:un 2:cube :')]},
    {de:qu+.05,a:m(D,12),top:60,fs:62,phrases:[ec(D,'0:À 1:toi : 2:écris 3:49 4:comme 5:un 6:carré,'),ec(D,'7:et 8:27 9:comme 10:un 11:cube.')]},
    {de:m(D,12),a:f,top:60,fs:62,phrases:[ec(D,'12:Réponds 13:en 14:commentaire !')]}
  ];
  const tics=[]; for(let rg=0;rg<8;rg++) tics.push({t:tRang(rg)+DV,f:520+rg*40});
  tics.push({t:m(X,10),f:880}); for(let j=0;j<4;j++) tics.push({t:tEtage(j)+DV,f:330+j*90}); tics.push({t:m(Y,14),f:880});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(X,10)+.7,'<div style="white-space:nowrap;font-size:86px">64 lanternes :</div><div style="font-size:74px;white-space:nowrap">un carré ET un cube ?</div><div style="color:#e8590c;font-size:136px;margin-top:6px">TU PARIES ?</div>');

  const supE=(s,k)=>`<span class="expo ${k}">${s}</span>`;
  return { clips,FIN,tics,titre:'La fête des lanternes',ceinture:1,finTitre:m(C0,8),groupes,finClip:F,
    cuts:[x,q,qu,f],
    question:{ qc:Q,rc:R,finR:qu,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:100 2:égale…')],
      pause:[ec(Q,'15:Mets 16:pause,'),ec(Q,'17:et 18:choisis !')],
      choix:[[ba('50')+supE('2','xA'),m(Q,3)-q,m(Q,4)-q],[ba('10')+supE('2','xB'),m(Q,7)-q,m(Q,8)-q],[ba('10')+supE('3','xC'),m(Q,11)-q,m(Q,12)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:10 3:au 4:carré !')],
      suite:[ec(R,'5:10 6:× 7:10 7:= 8:100.'),ec(R,'9:Deux 10:zéros, 11:exposant 12:2.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<qu, dansF=T>=f;
      document.body.classList.toggle('vxA',T>=m(Q,6)||T>=r); document.body.classList.toggle('vxB',T>=m(Q,10)||T>=r); document.body.classList.toggle('vxC',T>=m(Q,14)||T>=r);
      scene.ry=0; scene.z=-.5; scene.x=-1.6;
      cam.x=0; cam.e=.04; cam.d=11.6; cam.y=2.25;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      /* Le cube : la caméra monte un peu pour qu'on voie le dessus */
      if(T>=y&&T<q){ const v=lisse((T-y)/1.2); cam.e=.04+.2*v; cam.y=2.25-.45*v; cam.d=11.6+1.4*v; }
      poserLanternes(T);
      etoiles.forEach((e,i)=>{ e.scale.setScalar(.75+.35*Math.sin(T*2.3+i*1.7)); });
      ampoules.forEach((b,i)=>{ b.visible=Math.sin(T*3+i)>-.6; });
      cadreMur.visible=T>=m(X,2)&&T<tEtage(0);
      cadreCube.visible=T>=m(Y,2)&&T<qu;
      huitG.visible=T>=m(X,3)&&T<tEtage(0); huitH.visible=T>=m(X,6)&&T<tEtage(0);
      qL.visible=T>=m(Y,3)&&T<q; qP.visible=T>=m(Y,5)&&T<q; qH.visible=T>=m(Y,7)&&T<q;

      if(T<m(C0,5)){ g.ouvre(); PO.regY=.55; PO.regX=-.2; }
      else if(T<m(C0,8)){ g.montre(); PO.regY=.55; }
      else if(T<x){ g.reflechit(); }
      else if(T<m(X,10)){ g.montre(); PO.regY=.55; }
      else if(T<y){ g.pouce(); }
      else if(T<m(Y,14)){ g.montre(); PO.regY=.3; }
      else if(T<q){ g.pouce(); }
      else if(T<r){ g.reflechit(); }
      else if(T<qu){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,12)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; cam.e=.1; }
      if(window.MINI){ cam.x=.15; cam.y=3.3; cam.d=13.2; cam.e=.04; PO.jaw=.62; g.pouce(); }

      const voirP=(T>=m(X,3)&&T<q)||(T>=m(D,3)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){ if(T<y) lignes(T,[K1,T>=m(X,7)?K2:[],T>=m(X,11)?K3:[]]); else if(T<q) lignes(T,[B1,T>=m(Y,9)?B2:[],T>=m(Y,15)?B3:[]]); else lignes(T,[E1,T>=m(D,8)?E2:[]]); }
      legende.classList.toggle('piege',false);
    } };
};
