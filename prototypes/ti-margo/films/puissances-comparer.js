/* ============================================================
   ÉPISODE 06 : LE GRAND DUEL. 9 × 10⁵ contre 2 × 10⁶ : l'exposant décide d'abord.
   Un ring : le gros 9 fanfaronne, le petit 2 a peur. Chacun sur sa jauge à l'échelle :
   le petit monte plus haut, et met le gros K.-O. à « 6 bat 5 ». Ti Margo est l'arbitre.
   Voix validée : rien à changer dans les mots.
   ============================================================ */
FILMS.comparer=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':8.745,'01-duel':7.775,'01q-question':16.255,'01r-reponse':6.125,'02-question':9.81,'03-abonne':6.045};
  const C0='00-accroche',X='01-duel',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('comparer',DUR,{[Q]:3.3,[D]:1.5});
  const q=A[Q],r=A[R],d=A[D],f=A[F],x=A[X];

  /* ---- La salle : un mur de nuit, le public, deux projecteurs, le ring ---- */
  poserPiece(0x2a3566,0xdfe5ee,0x1a2147);
  const omb=new THREE.MeshBasicMaterial({color:0x1b2350});
  for(let i=0;i<34;i++){ const h=new THREE.Mesh(new THREE.CircleGeometry(.2+.05*(i%3),18),omb); h.position.set(-3.4+i*.21,.62+((i*7)%5)*.2,-2.32); scene3d.add(h); }
  const gradins=new THREE.Mesh(new THREE.PlaneGeometry(120,.8),omb); gradins.position.set(0,.4,-2.33); scene3d.add(gradins);
  for(const s of [-1,1]){ const tri=new THREE.BufferGeometry(); tri.setAttribute('position',new THREE.Float32BufferAttribute([s*2.6,7,-2.25, s*.2,0,-2.25, s*2.3,0,-2.25],3));
    scene3d.add(new THREE.Mesh(tri,new THREE.MeshBasicMaterial({color:0xfff3b0,transparent:true,opacity:.2,side:THREE.DoubleSide,depthWrite:false}))); }
  const ZR=-1.25;
  for(const s of [-1,1]) piece(scene3d,new RoundedBoxGeometry(.2,3,.2,2,.05),toon(s<0?0xd9480f:0x1971c2),[s*2.28,1.5,ZR],CONTOUR_FIN);
  [[.95,0xe03131],[1.7,0xffffff],[2.45,0x1971c2]].forEach(([y,c])=>piece(scene3d,new RoundedBoxGeometry(4.5,.07,.07,2,.02),toon(c),[0,y,ZR],CONTOUR_FIN));
  const tapis=new THREE.Mesh(new THREE.PlaneGeometry(4.8,1.9),new THREE.MeshBasicMaterial({color:0xcfd8e6})); tapis.rotation.x=-Math.PI/2; tapis.position.set(0,.002,-.25); scene3d.add(tapis);

  /* ---- Un boxeur : sa jauge (avec sa plaque « × 10ⁿ »), et le chiffre avec gants, yeux, jambes ---- */
  const Y=new THREE.Vector3(0,1,0), TAILLE=1.6, JAMBE=.28;
  function placeBras(me,a,b){ const v=b.clone().sub(a), l=v.length(); me.position.copy(a).addScaledVector(v,.5); me.scale.set(1,l,1); me.quaternion.setFromUnitVectors(Y,v.normalize()); }
  function boxeur(coul,couleurCss,rayonBras){
    const g=new THREE.Group(); g.position.z=.3; scene3d.add(g);
    const col=piece(g,new RoundedBoxGeometry(1,1,.5,2,.02).translate(0,.5,0),toon(coul),[0,0,0],CONTOUR_FIN); col.scale.set(.98,.6,1);
    const graduations=[0,1,2,3].map(i=>piece(g,new THREE.BoxGeometry(.3,.035,.02),toon(0x17452a),[-.3,.6*(i+1),.26],null));
    const plaque=ecran3d(.9,.5,[0,.3,.28],g);
    const corps=new THREE.Group(); g.add(corps);
    /* Les jambes et le short */
    const jambes=[-1,1].map(s=>{ const j=new THREE.Group(); j.position.x=s*.15; corps.add(j); piece(j,new RoundedBoxGeometry(.14,JAMBE+.06,.14,2,.04),toon(0x3a2d1e),[0,JAMBE/2,0],CONTOUR_FIN); piece(j,new RoundedBoxGeometry(.24,.1,.26,2,.04),toon(0xb02a2a),[s*.02,.05,.04],CONTOUR_FIN); return {j,s}; });
    const glyphe=ecran3d(TAILLE,TAILLE,[0,JAMBE+TAILLE/2-.06,.04],corps);
    const mb=toon(coul);
    const brasG=piece(corps,new THREE.CylinderGeometry(rayonBras,rayonBras,1,10),mb,null,CONTOUR_FIN), brasD=piece(corps,new THREE.CylinderGeometry(rayonBras,rayonBras,1,10),mb,null,CONTOUR_FIN);
    const gantG=piece(corps,new THREE.SphereGeometry(.26,18,14),toon(0xe03131),null,CONTOUR_FIN), gantD=piece(corps,new THREE.SphereGeometry(.26,18,14),toon(0xe03131),null,CONTOUR_FIN);
    /* Les yeux : ronds, ou en croix quand il est K.-O. */
    const yeux=[-1,1].map(s=>{ const o=new THREE.Group(); corps.add(o);
      const bl=piece(o,new THREE.SphereGeometry(.15,16,12),C.blanc,[0,0,0],CONTOUR_FIN), pu=piece(o,new THREE.SphereGeometry(.065,12,10),C.noir,[0,0,.13],null);
      const cr=new THREE.Group(); o.add(cr); for(const a of [.8,-.8]){ const b=new THREE.Mesh(new THREE.BoxGeometry(.28,.05,.02),new THREE.MeshBasicMaterial({color:0x17121a})); b.rotation.z=a; b.position.z=.16; cr.add(b); }
      return {o,pu,cr,s}; });
    const bouche=piece(corps,new THREE.SphereGeometry(.1,14,10),C.bouche,[0,0,.14],CONTOUR_FIN);
    const langue=piece(corps,new THREE.SphereGeometry(.07,10,8).scale(1,1.4,.4),C.langue,[0,0,.2],null);
    const bandage=piece(corps,new RoundedBoxGeometry(1.25,.2,.06,2,.02),toon(0xffffff),[0,0,.18],CONTOUR_FIN); bandage.rotation.z=-.16; bandage.visible=false;
    return {g,col,graduations,plaque,jambes,corps,glyphe,brasG,brasD,gantG,gantD,yeux,bouche,langue,bandage,couleurCss};
  }
  const b1=boxeur(0xf783ac,'#f783ac',.09), b2=boxeur(0x74c0fc,'#74c0fc',.05);
  /* Les étoiles du K.-O. */
  const etoiles=[0,1,2,3].map(()=>{ const e=ecran3d(.32,.32,[0,0,.6],scene3d); e.ecrire('*',(g,w,h)=>{ g.fillStyle='#ffd43b'; g.strokeStyle='#17452a'; g.lineWidth=7; g.beginPath(); for(let i=0;i<10;i++){ const r=i%2?w*.2:w*.46, a=-Math.PI/2+i*Math.PI/5; g.lineTo(w/2+r*Math.cos(a),h/2+r*Math.sin(a)); } g.closePath(); g.fill(); g.stroke(); }); return e; });
  /* Les « ? » de la question en commentaire */
  const quest=[-1,1].map(()=>{ const e=ecran3d(.7,.8,[0,0,.5],scene3d); e.ecrire('?',(g,w,h)=>{ g.font='900 190px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.lineWidth=14; g.lineJoin='round'; g.strokeStyle='#fff'; g.strokeText('?',w/2,h/2); g.fillStyle='#e8590c'; g.fillText('?',w/2,h/2); }); return e; });

  function ecrireGlyphe(b,txt){ b.glyphe.ecrire(txt,(g,w,h)=>{ let fs=h*1.2; g.font=`900 ${fs}px "Segoe UI"`; const l=g.measureText(txt).width; if(l>w*.94){ fs*=w*.94/l; g.font=`900 ${fs}px "Segoe UI"`; }
    g.textAlign='center'; g.textBaseline='alphabetic'; g.lineJoin='round'; g.lineWidth=Math.max(14,fs*.06); g.strokeStyle='#17452a'; const bas=txt.includes(',')?h*.8:h*.97; g.strokeText(txt,w/2,bas); g.fillStyle=b.couleurCss; g.fillText(txt,w/2,bas); }); }
  /* La plaque : × 10ⁿ, écrit au fil de la voix. coul : la couleur de l'exposant ; gros : il enfle */
  function ecrirePlaque(b,fois,dix,expo,coul,gros){ b.plaque.ecrire([fois,dix,expo,coul,gros].join('|'),(g,w,h)=>{ if(!fois) return; g.fillStyle='#fff'; g.strokeStyle='#17452a'; g.lineWidth=6; g.beginPath(); g.roundRect(4,4,w-8,h-8,38); g.fill(); g.stroke();
    g.textBaseline='alphabetic'; g.textAlign='left'; const y=h*.74, long=(expo||'').length>1, fb=long?62:76; g.font=`800 ${fb}px "Segoe UI"`; const tf=g.measureText('× ').width, t10=g.measureText('10').width; const fe=gros?76:(long?44:52); g.font=`800 ${fe}px "Segoe UI"`; const te=g.measureText(expo||'').width; let px=(w-tf-t10-te)/2;
    g.font=`800 ${fb}px "Segoe UI"`; if(fois){ g.fillStyle='#17452a'; g.fillText('× ',px,y); } px+=tf; if(dix){ g.fillStyle='#1971c2'; g.fillText('10',px,y); } px+=t10;
    if(expo){ g.font=`800 ${fe}px "Segoe UI"`; g.fillStyle=coul; g.fillText(expo,px,y-30); } }); }

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const nota=(c,[i0,i1,i2],n,e)=>[[i0,n+' '],[i1,'× '],[i2,ba('10')]];
  const ACC=J(C0,[[0,'9 '],[1,'× '],[2,ba('10')],[4,sup('5')+' '],[5,'contre '],[6,'2 '],[7,'× '],[8,ba('10')],[10,sup('6')]]);
  const ENT=J(X,[[4,'900 '],[5,'000 '],[6,'contre '],[7,'2 '],[8,'000 000']]);
  const BAT=J(X,[[12,ok('6')+' '],[13,'bat '],[14,pi('5')]]);
  const E1=J(D,[[0,'Et '],[3,'9,9 '],[4,'× '],[5,ba('10')],[7,sup('−')],[8,sup('4')+' '],[9,'contre']]);
  const E2=J(D,[[10,'1 '],[11,'× '],[12,ba('10')],[14,sup('−')],[15,sup('3')+' ?']]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:m(C0,11),a:x,top:60,fs:66,phrases:[ec(C0,'11:Qui 12:gagne ?'),ec(C0,'13:Pas 14:celui 15:que 16:tu 17:crois.')]},
    {de:x+.05,a:m(X,9),top:60,fs:66,phrases:[ec(X,'0:Écrits 1:en 2:entier :')]},
    {de:m(X,9),a:q,top:60,fs:62,phrases:[ec(X,'9:L’exposant 10:décide 11:d’abord :')]},
    {de:m(D,16),a:m(D,21),top:60,fs:66,phrases:[ec(D,'16:Lequel 17:est 18:le 19:plus 20:grand ?')]},
    {de:m(D,21),a:f,top:60,fs:62,phrases:[ec(D,'21:Réponds 22:en 23:commentaire !')]}
  ];
  const coup=m(X,14), coupR=m(R,10);
  const tics=[{t:m(C0,0),f:300},{t:m(C0,5),f:880},{t:m(C0,6),f:520},{t:m(X,4),f:420},{t:m(X,7),f:620},{t:coup,f:140},{t:coup+.1,f:880},{t:coupR,f:150}];
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,13)+.2,'<div style="font-size:84px;white-space:nowrap">9 × 10⁵ contre 2 × 10⁶</div><div style="color:#e8590c;font-size:112px;margin-top:8px">QUI GAGNE ?</div>');

  /* K.-O. : l'avancée de la chute, après le coup */
  const chute=(T,t0)=>T<t0?0:lisse((T-t0)/.42);
  const v3=(a,b,c)=>new THREE.Vector3(a,b,c);

  function poseBoxeur(b,{cx,ech,h,txt,vu,gants,rot=0,chuteX=0,chuteY=0,yeuxX=.17,yeuxY=.98,regard=0,bouche=.8,ko=false,bandage=false,bob=0,visible=true,saut=0}){
    b.g.visible=visible; if(!visible) return;
    b.g.position.x=cx; b.col.scale.y=h;
    b.graduations.forEach((t,i)=>{ t.visible=.6*(i+1)<h-.56; });
    b.corps.visible=vu>0; const large=txt.includes(','); b.jambes.forEach(o=>{ o.j.position.x=o.s*(large?.5:.15); o.j.scale.y=large?1.95:1; });
    b.corps.position.set(chuteX,h+chuteY+bob+saut,0); b.corps.scale.setScalar(ech*vu); b.corps.rotation.set(rot*-.5,0,rot);
    ecrireGlyphe(b,txt);
    const cy=JAMBE+TAILLE*yeuxY-.06-TAILLE*.34;
    const ep=[v3(-.36,cy-.1,-.04),v3(.36,cy-.1,-.04)], gv=[v3(...gants[0]),v3(...gants[1])];
    placeBras(b.brasG,ep[0],gv[0]); placeBras(b.brasD,ep[1],gv[1]); b.gantG.position.copy(gv[0]); b.gantD.position.copy(gv[1]);
    b.yeux.forEach(o=>{ o.o.position.set(o.s*yeuxX,cy+.22,.14); o.pu.visible=!ko; o.pu.position.x=regard*.06; o.cr.visible=ko; });
    b.bouche.position.set(0,cy-.14,.14); b.bouche.scale.set(1.1,bouche,1);
    b.langue.visible=ko; b.langue.position.set(.05,cy-.24,.2);
    b.bandage.visible=bandage; b.bandage.position.set(0,cy+.44,.17);
  }

  return { clips,FIN,tics,titre:'Le grand duel',ceinture:0,finTitre:m(C0,11),groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:7 2:× 5:10² 6:contre 7:1 8:× 11:10³ ?')],
      pause:[ec(Q,'26:Mets 27:pause, 28:et 29:choisis !')],
      choix:[['7 × '+puiss('10','2'),m(Q,12)-q,m(Q,17)-q],['1 × '+puiss('10','3'),m(Q,18)-q,m(Q,23)-q],['égalité',m(Q,24)-q,m(Q,25)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:1 3:000 3:contre 5:700.')],suite:[ec(R,'6:L’exposant 7:3 8:bat 9:l’exposant 10:2.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f, MINI=window.MINI;
      scene.ry=0; scene.z=-.6; scene.x=-.14;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }
      const vis=!dansF;
      etoiles.forEach(e=>{ e.mesh.visible=false; }); quest.forEach(e=>{ e.mesh.visible=false; });

      /* ---- Les deux boxeurs selon la partie du film ---- */
      const pop=(t0)=>{ const v=(T-t0)/.28; if(v<=0) return 0; if(v>=1) return 1; return lisse(v)*(1+.25*Math.sin(v*Math.PI)); };
      if(T<q){
        const h1=.6+.48*lisse((T-m(X,4))/.7), h2=.6+1.8*lisse((T-m(X,7))/.9);
        const c1=chute(T,coup), wob=T>=coup?Math.sin((T-coup)*13)*.05*Math.exp(-(T-coup)*2.5):0;
        const flexe=T>=m(C0,5)&&T<coup, pompe=flexe?Math.sin(T*6.5)*.1:0;
        const tRes=T-coup, ressort=T>=m(X,12)+.08&&T<coup+.38;
        /* Le coup : le gant de gauche du petit part en ressort vers la tête du gros */
        const ech2=.62, tete1=[-1.15-(1.5),h1+.85*1.45-h2];
        const e=T<coup?lisse((T-(m(X,12)+.08))/(coup-(m(X,12)+.08))):1-lisse(tRes/.38);
        const gG2=ressort?[-.5+(tete1[0]/ech2+.5)*e,1+(tete1[1]/ech2-1)*e,.3]:[-.55,1.0+Math.sin(T*9)*.03,.28];
        const peur=T<m(X,9), tremble=peur?Math.sin(T*31)*.012:0;
        poseBoxeur(b1,{cx:-1.15,ech:.85,h:h1,txt:'9',vu:pop(m(C0,0)),rot:c1*.46+wob,chuteX:c1*.08,chuteY:-c1*.25,
          gants:c1>0?[[-.72,.55-c1*.1,.2],[.62,.5,.2]]:flexe?[[-.78,1.65+pompe,.25],[.78,1.65-pompe,.25]]:[[-.72,.95,.28],[.72,.95,.28]],
          regard:.9,bouche:T>=m(C0,13)&&!c1?1.25:.8,ko:T>=coup});
        poseBoxeur(b2,{cx:1.5+tremble,ech:ech2,h:h2,txt:'2',vu:pop(m(C0,6)),gants:[gG2,[.55,1.0-Math.sin(T*9)*.03,.28]],regard:-.9,bouche:peur?.5:1,saut:T>=coup+.1?Math.abs(Math.sin((T-coup)*6))*.1:0});
        ecrirePlaque(b1,T>=m(C0,1),T>=m(C0,2),T>=m(C0,4)?'5':'',T>=coup?'#c92a2a':'#e8590c',T>=m(X,9)&&T<coup);
        ecrirePlaque(b2,T>=m(C0,7),T>=m(C0,8),T>=m(C0,10)?'6':'',T>=m(X,12)?'#2f9a3a':'#e8590c',T>=m(X,9));
        if(T>=coup){ const hx=-1.07-.72*Math.sin(.46), hy=h1-.25+1.25; etoiles.forEach((et,i)=>{ const a=(T-coup)*5+i*Math.PI/2; et.mesh.visible=true; et.mesh.position.set(hx+Math.cos(a)*.42,hy+.5+Math.sin(a)*.1,.75); }); }
      } else if(T<d){
        const h1=.6+.38*lisse((T-m(R,5))/.5), h2=.6+.8*lisse((T-m(R,2))/.5), c1=chute(T,coupR);
        const e=T>=m(R,9)&&T<coupR+.3?(T<coupR?lisse((T-m(R,9))/(coupR-m(R,9))):1-lisse((T-coupR)/.3)):0;
        const tx=(-1.15-1.5)/.62, ty=(h1+1.1-h2)/.62;
        poseBoxeur(b1,{cx:-1.15,ech:.75,h:h1,txt:'7',vu:pop(m(Q,1)),rot:c1*.42,chuteY:-c1*.2,gants:c1?[[-.72,.5,.2],[.62,.5,.2]]:[[-.72,1.1+Math.sin(T*6)*.05,.28],[.72,1.1-Math.sin(T*6)*.05,.28]],regard:.9,yeuxX:.14,ko:T>=coupR});
        poseBoxeur(b2,{cx:1.5,ech:.62,h:h2,txt:'1',vu:pop(m(Q,7)),gants:e>0?[[-.5+(tx+.5)*e,1+(ty-1)*e,.3],[.55,1,.28]]:[[-.55,1+Math.sin(T*8)*.03,.28],[.55,1-Math.sin(T*8)*.03,.28]],regard:-.9,yeuxX:.12});
        ecrirePlaque(b1,T>=m(Q,2),T>=m(Q,3),T>=m(Q,5)?'2':'',T>=coupR?'#c92a2a':'#e8590c',false);
        ecrirePlaque(b2,T>=m(Q,8),T>=m(Q,9),T>=m(Q,11)?'3':'',T>=m(R,7)?'#2f9a3a':'#e8590c',T>=m(R,7));
      } else if(vis){
        /* Le 9 revient, un bandage sur la tête : il a compris, il ne fanfaronne plus */
        poseBoxeur(b1,{cx:-1.12,ech:.9,h:.6,txt:'9,9',vu:pop(m(D,3)),gants:[[-.95,.66,-.02],[.95,.66,-.02]],regard:.9,yeuxX:.46,yeuxY:.76,bandage:true,bouche:.6});
        poseBoxeur(b2,{cx:1.5,ech:.62,h:.6,txt:'1',vu:pop(m(D,10)),gants:[[-.55,1+Math.sin(T*8)*.03,.28],[.55,1-Math.sin(T*8)*.03,.28]],regard:-.9,yeuxX:.12});
        const moins=(a,b,c)=>T>=c?b:T>=a?'−':'';
        ecrirePlaque(b1,T>=m(D,4),T>=m(D,5),moins(m(D,7),'−4',m(D,8)),'#e8590c',false);
        ecrirePlaque(b2,T>=m(D,11),T>=m(D,12),moins(m(D,14),'−3',m(D,15)),'#e8590c',false);
        if(T>=m(D,16)) quest.forEach((e,i)=>{ const s=i?1.5:-1.12; e.mesh.visible=true; e.mesh.position.set(s,(i?2.3:2.75)+Math.sin(T*4+i)*.05,.6); e.mesh.scale.setScalar(pop(m(D,16))); });
      } else { b1.g.visible=b2.g.visible=false; }

      /* ---- L'arbitre ---- */
      if(T<m(C0,5)) { g.ouvre(); PO.regY=-.3; PO.tetY=-.12; }
      else if(T<m(C0,11)){ g.oups(); PO.regY=T<m(C0,6)?-.3:.35; PO.tetY=T<m(C0,6)?-.14:.14; }
      else if(T<x){ T<m(C0,13)?g.reflechit():g.montre(); PO.regY=.4; PO.regX=-.05; }
      else if(T<m(X,9)){ g.ouvre(); PO.regY=T<m(X,7)?-.4:.4; PO.tetY=T<m(X,7)?-.16:.16; }
      else if(T<coup){ g.montre(); PO.regY=.5; }
      else if(T<q){ g.pouce(); PO.regY=-.3; PO.tetY=-.14; PO.sautY=Math.abs(Math.sin((T-coup)*5))*.1*Math.exp(-(T-coup)*1.2); }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,21)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      /* L'arbitre plonge sous le coup de ressort */
      for(const [t0,t1] of [[m(X,12)+.04,coup+.4],[m(R,9)-.1,coupR+.3]]) if(T>t0&&T<t1) PO.hanche-=.46*Math.sin((T-t0)/(t1-t0)*Math.PI);
      if(MINI){ cam.d=9.6; cam.y=2.25; PO.jaw=.62; g.oups(); PO.jaw=.62; PO.regY=.35; b1.g.position.x=-.92; b2.g.position.x=1.15; scene.x=-.06; }

      const voirP=(T>=m(C0,0)&&T<q)||(T>=m(D,0)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E1,E2]:(T<x?[ACC]:[ACC,T>=m(X,4)?ENT:[],T>=m(X,12)?BAT:[]]));
      legende.classList.remove('piege');
    } };
};
