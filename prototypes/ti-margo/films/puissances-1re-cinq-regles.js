/* ============================================================
   ÉPISODE 13 (1re) : LE CONTRAT. 2³ × 2⁴ = 4⁷ ? Tu signes ?
   Chez le notaire, Ti Margo va signer ; 7 wagons « 2 » s'alignent : 2⁷ = 128, une plaque de rien du tout.
   4⁷ = 16 384 : à la même échelle, une tour qui tombe du plafond, écrase le bureau et déchire le contrat.
   Le contrat corrigé garde la base 2. Il repose le stylo.
   Voix validée : manim/voix/1re-puissance-cinq-regles-short-da.json
   ============================================================ */
FILMS['cinq-regles']=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':7.16,'01-facteurs':20.045,'01q-question':16.09,'01r-reponse':8.19,'02-question':7.915,'03-abonne':6.045};
  const C0='00-accroche',X='01-facteurs',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('cinq-regles',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],q=A[Q],r=A[R],d=A[D],f=A[F];
  const tTu=m(C0,11),tSept=m(X,16),t128=m(X,23),tEt=m(X,24),tTour=m(X,28),tCrash=m(X,32),tTrop=m(X,33),tBase=m(X,35),tPas=m(X,39);
  const BLEU='#1971c2',ORANGE='#e8590c',VERT='#2f9a3a',ROUGE='#c92a2a',ENCRE='#3a2a18';
  const kf=(T,l)=>{ if(T<=l[0][0]) return l[0][1]; for(let i=1;i<l.length;i++) if(T<l[i][0]) return l[i-1][1]+(l[i][1]-l[i-1][1])*lisse((T-l[i-1][0])/(l[i][0]-l[i-1][0])); return l[l.length-1][1]; };

  /* ---- L'étude du notaire : boiseries en bas, bibliothèque de gros livres en haut ---- */
  poserPiece(0xf4e6cf,0x9a6d45,0x5b3a20);
  const lambris=new THREE.Mesh(new THREE.PlaneGeometry(120,1.5),new THREE.MeshBasicMaterial({color:0xb98a5c})); lambris.position.set(0,.75,-2.37); scene3d.add(lambris);
  const moulure=new THREE.Mesh(new THREE.PlaneGeometry(120,.1),new THREE.MeshBasicMaterial({color:0x7d5531})); moulure.position.set(0,1.52,-2.36); scene3d.add(moulure);
  const coulL=[0x7a2e2e,0x2e4f7a,0x2f6b4a,0x8a6a2e,0x5b3a7a];
  for(const yE of [4.5,5.9]){
    const et=new THREE.Mesh(new THREE.PlaneGeometry(120,.13),new THREE.MeshBasicMaterial({color:0x6e4a2a})); et.position.set(0,yE,-2.34); scene3d.add(et);
    for(let i=0;i<22;i++){ const h=.78+((i*5+yE*3|0)%4)*.08, l=new THREE.Mesh(new THREE.PlaneGeometry(.26,h),new THREE.MeshBasicMaterial({color:coulL[(i*3+(yE|0))%5]})); l.position.set(-3.5+i*.33,yE+.07+h/2,-2.32); scene3d.add(l);
      const d0=new THREE.Mesh(new THREE.PlaneGeometry(.26,.05),new THREE.MeshBasicMaterial({color:0xe2c66e})); d0.position.set(-3.5+i*.33,yE+.07+h*.78,-2.31); scene3d.add(d0); }
  }

  /* ---- Le bureau du notaire ---- */
  const bureau=new THREE.Group(); bureau.position.set(1.12,0,-.42); scene3d.add(bureau);
  piece(bureau,new RoundedBoxGeometry(2.22,.72,.9,2,.05),toon(0x6e4122),[0,.36,0],CONTOUR_FIN);
  piece(bureau,new RoundedBoxGeometry(1.6,.34,.06,2,.02),toon(0x8a5a30),[0,.36,.45],CONTOUR_FIN);
  const pupitre=new THREE.Group(); pupitre.position.set(1.12,0,0); scene3d.add(pupitre);
  piece(pupitre,new RoundedBoxGeometry(2.2,.08,.2,2,.02),toon(0x6e4122),[0,.76,-.14],CONTOUR_FIN);

  /* ---- Le contrat : un parchemin. Entier, puis déchiré en deux moitiés ---- */
  const CW=2.14,CH=2.22,CY=1.9;
  function dessineFormule(g,w,y,items,T,tp=120){
    let k=1; g.textBaseline='alphabetic'; g.textAlign='left';
    const lg=it=>{ g.font=`800 ${(it[3]?.62:1)*tp*k}px "Segoe UI"`; return g.measureText(it[1]).width; };
    let tot=items.reduce((s,it)=>s+lg(it),0); if(tot>w*.9){ k=w*.9/tot; tot*=k; }
    let px=(w-tot)/2; for(const it of items){ const l=lg(it); if(T>=it[0]){ g.fillStyle=it[2]; g.fillText(it[1],px,y-(it[3]?.42*tp*k:0)); } px+=l; }
  }
  const FA=[[m(C0,0),'2',BLEU],[m(C0,2),'3',ORANGE,1],[m(C0,3),' × ',ENCRE],[m(C0,4),'2',BLEU],[m(C0,6),'4',ORANGE,1],[m(C0,7),' = ',ENCRE],[m(C0,8),'4',BLEU],[m(C0,10),'7',ORANGE,1]];
  const FV=[[0,'2',BLEU],[0,'3',ORANGE,1],[0,' × ',ENCRE],[0,'2',BLEU],[0,'4',ORANGE,1],[0,' = ',ENCRE],[0,'2',VERT],[0,'7',VERT,1]];
  const FQ=[[m(Q,1),'5',BLEU],[m(Q,3),'2',ORANGE,1],[m(Q,4),' × ',ENCRE],[m(Q,5),'5',BLEU],[m(Q,7),'3',ORANGE,1],[m(R,3),' = ',ENCRE],[m(R,3),'5',VERT],[m(R,4),'5',VERT,1]];
  const FD=[[m(D,1),'3',BLEU],[m(D,3),'4',ORANGE,1],[m(D,4),' × ',ENCRE],[m(D,5),'3',BLEU],[m(D,7),'5',ORANGE,1],[m(D,10),' = ',ENCRE],[m(D,10),'?',ORANGE]];
  /* Le dessin complet du contrat, sur un contexte de la taille entière */
  function dessineContrat(g,w,h,T){
    const corrige=T>=tBase&&T<q, liste=T<x?FA:(T<q?(corrige?FV:FA):(T<d?FQ:FD));
    g.fillStyle='#fbf1d8'; g.beginPath(); g.roundRect(0,0,w,h,26); g.fill(); g.strokeStyle='#c9a86a'; g.lineWidth=10; g.stroke();
    g.fillStyle='#e0cfa6'; for(const yy of [.08,.12,.16]){ g.fillRect(w*.14,h*yy,w*.72,7); }
    dessineFormule(g,w,h*.42,liste,T);
    g.fillStyle='#e0cfa6'; for(const yy of [.52,.57]){ g.fillRect(w*.1,h*yy,w*.8,7); }
    /* La ligne de signature, et le sceau */
    g.strokeStyle='#6e5a3a'; g.lineWidth=6; g.setLineDash([22,14]); g.beginPath(); g.moveTo(w*.08,h*.88); g.lineTo(w*.68,h*.88); g.stroke(); g.setLineDash([]);
    g.fillStyle='#c92a2a'; g.beginPath(); g.arc(w*.83,h*.84,w*.075,0,7); g.fill(); g.fillStyle='#e8590c'; g.beginPath(); g.arc(w*.83,h*.84,w*.042,0,7); g.fill();
    /* Les petits wagons de la réponse : 2 + 3 */
    if(T>=m(R,14)&&T<d){ const n=T>=m(R,15)?5:2, lw=w*.15, x0=w*.5-(5*lw+w*.04)/2, y0=h*.62;
      for(let i=0;i<n;i++){ const xw=x0+i*lw+(i>=2?w*.04:0); g.fillStyle=i<2?'#4dabf7':'#ff922b'; g.beginPath(); g.roundRect(xw+4,y0,lw-8,h*.14,12); g.fill(); g.fillStyle='#0b1f33'; g.font=`800 ${h*.105}px "Segoe UI"`; g.textAlign='center'; g.textBaseline='middle'; g.fillText('5',xw+lw/2,y0+h*.075); } }
  }
  const entier=ecran3d(CW,CH,[0,CY,-.06],pupitre,340);
  const moitieG=ecran3d(CW,CH,[0,CY,-.05],pupitre,340), moitieD=ecran3d(CW,CH,[0,CY,-.05],pupitre,340);
  /* Le dessin de la déchirure : une ligne en zigzag, la même pour les deux moitiés */
  const zigzag=(g,w,h,cote)=>{ g.beginPath(); g.moveTo(cote<0?0:w,0); g.lineTo(w*.5,0); for(let i=1;i<=10;i++) g.lineTo(w*(.5+(i%2?.05:-.05)),h*i/10); g.lineTo(cote<0?0:w,h); g.closePath(); g.clip(); };
  moitieG.ecrire('x',(g,w,h)=>{ g.save(); zigzag(g,w,h,-1); dessineContrat(g,w,h,tCrash); g.restore(); });
  moitieD.ecrire('x',(g,w,h)=>{ g.save(); zigzag(g,w,h,1); dessineContrat(g,w,h,tCrash); g.restore(); });
  moitieG.mesh.visible=moitieD.mesh.visible=false;
  function contrat(T){
    const corrige=T>=tBase&&T<q, liste=T<x?FA:(T<q?(corrige?FV:FA):(T<d?FQ:FD));
    const k=(T<x?'a':T<q?(corrige?'v':'A'):(T<d?'q':'d'))+liste.filter(i=>T>=i[0]).length+(T>=m(R,14)&&T<d?(T>=m(R,15)?'5':'2'):'');
    entier.ecrire(k,(g,w,h)=>dessineContrat(g,w,h,T));
    const dechire=T>=tCrash&&T<tBase;
    entier.mesh.visible=!dechire; moitieG.mesh.visible=moitieD.mesh.visible=dechire;
    if(dechire){ const v=T-tCrash, ch=Math.min(1,v/.9), cc=ch*ch;
      const yCh=CY+(.05-CY)*cc, rX=-1.42*cc, zCh=-.05-.7*cc, ech=1-.5*cc; moitieG.mesh.position.set(-.5*ch-.05,yCh,zCh); moitieG.mesh.rotation.set(rX,0,.45*ch); moitieG.mesh.scale.y=ech; moitieD.mesh.position.set(.75*ch+.05,yCh,zCh); moitieD.mesh.rotation.set(rX,0,-.5*ch); moitieD.mesh.scale.y=ech; /* posée, la moitié gauche dépasserait sous l'étiquette 128 */ if(v>=.85) moitieG.mesh.visible=false; }
    /* Le contrat corrigé tombe du plafond à « base » */
    entier.mesh.position.y=T>=tBase&&T<q?CY+(1-lisse((T-tBase)/.5))*4.6:CY;
  }

  /* ---- Le stylo, dans la main ; puis posé sur le bureau ---- */
  function fairestylo(){ const g=new THREE.Group();
    const nr=toon(0x1b2a4a), or=toon(0xe2b43c);
    piece(g,new THREE.CylinderGeometry(.075,.075,.92,14),nr,[0,.2,0],CONTOUR_FIN);
    piece(g,new THREE.CylinderGeometry(.08,.08,.08,14),or,[0,-.2,0],null);
    piece(g,new THREE.ConeGeometry(.075,.26,14).rotateX(Math.PI),or,[0,-.37,0],CONTOUR_FIN);
    piece(g,new THREE.SphereGeometry(.075,12,10),nr,[0,.66,0],CONTOUR_FIN);
    return g; }
  const stylo=fairestylo(); mainD.g.add(stylo);
  const styloPose=fairestylo(); styloPose.rotation.set(0,0,1.45); scene3d.add(styloPose);

  /* ---- Le train des facteurs ---- */
  function wagon(col){ const g=new THREE.Group(); g.visible=false; scene3d.add(g);
    piece(g,new RoundedBoxGeometry(.54,.5,.3,2,.06),toon(col),[0,.35,0],CONTOUR_FIN);
    for(const s of [-.16,.16]) piece(g,new THREE.CylinderGeometry(.08,.08,.06,16).rotateX(Math.PI/2),toon(0x2a2f38),[s,.08,.13],null);
    const e=ecran3d(.46,.44,[0,.35,.16],g,220); return {g,e}; }
  const wagons=[]; for(let i=0;i<9;i++) wagons.push(wagon(0x4dabf7));
  const rail=piece(scene3d,new THREE.BoxGeometry(5.4,.05,.2),toon(0x5b4a3a),[0,3.5,-.6],null);
  const YT=3.5, ZT=-.6;
  function poseW(w,X_,Y_,ch){ w.g.visible=true; w.g.position.set(X_,Y_,ZT); w.e.ecrire(ch,(g,W,H)=>{ g.fillStyle='#0b1f33'; g.font='800 92px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(ch,W/2,H/2+5); }); }
  const RANGS=[3,5,7,9,11,13,15];
  const XG=[-2.0,-1.42,-.84,.14,.72,1.3,1.88], XS=[-1.74,-1.16,-.58,0,.58,1.16,1.74];
  function train(T){
    for(const w of wagons) w.g.visible=false;
    const voirR=(T>=m(X,3)&&T<tEt+.7)||(T>=m(D,3)&&T<f);
    rail.visible=voirR;
    if(T>=m(X,3)&&T<tEt+.7){ const mv=lisse((T-tSept)/.5), part=lisse((T-tEt)/.6)*5.6;
      for(let i=0;i<7;i++) if(T>=m(X,RANGS[i])){ const pop=lisse((T-m(X,RANGS[i]))/.18); poseW(wagons[i],XG[i]+(XS[i]-XG[i])*mv-part,YT+(1-pop)*.8,'2'); }
    }
    if(T>=d&&T<f){ const XD=[-1.92,-1.46,-1,-.54,.06,.52,.98,1.44,1.9];
      for(let i=0;i<4;i++) if(T>=m(D,3)) poseW(wagons[i],XD[i],YT,'3');
      for(let i=4;i<9;i++) if(T>=m(D,7)) poseW(wagons[i],XD[i],YT,'3');
      for(const w of wagons) w.g.scale.setScalar(.82);
    } else for(const w of wagons) w.g.scale.setScalar(1);
  }

  /* ---- La plaque 128 et la tour 16 384 : la même échelle, 128 fois plus haut ---- */
  const HP=.06, HT=HP*128, LP=1.3, XT=1.3, ZO=.42, XP=-.1;
  const plaque=piece(scene3d,new THREE.BoxGeometry(LP,HP,.5),toon(0x40c057),[XP,HP/2,ZO],CONTOUR_FIN);
  const lab128=ecran3d(1.12,.5,[XP,.42,ZO],scene3d,240);
  lab128.ecrire('x',(g,w,h)=>{ g.fillStyle='#fff'; g.strokeStyle=VERT; g.lineWidth=8; g.beginPath(); g.roundRect(5,5,w-10,h-10,22); g.fill(); g.stroke(); g.fillStyle=VERT; g.font='800 92px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('128',w/2,h/2+5); });
  const fleche=ecran3d(.2,.2,[XP,.13,ZO],scene3d,200); fleche.ecrire('x',(g,w,h)=>{ g.fillStyle=VERT; g.beginPath(); g.moveTo(w*.1,0); g.lineTo(w*.9,0); g.lineTo(w*.5,h*.9); g.closePath(); g.fill(); });
  const tour=new THREE.Group(); tour.position.set(XT,0,ZO); scene3d.add(tour);
  piece(tour,new THREE.BoxGeometry(LP,HT,.5),toon(0xe03131),[0,HT/2,0],CONTOUR_FIN);
  const rayure=new THREE.MeshBasicMaterial({color:0xa61e1e}); for(let i=1;i<40;i++){ const b=new THREE.Mesh(new THREE.PlaneGeometry(LP,.022),rayure); b.position.set(0,i*.19,.256); tour.add(b); }
  const labTour=ecran3d(1.22,.62,[0,1.72,.26],tour,260);
  labTour.ecrire('x',(g,w,h)=>{ g.fillStyle='#fff'; g.beginPath(); g.roundRect(4,4,w-8,h-8,22); g.fill(); g.fillStyle=ROUGE; g.font='800 84px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('16 384',w/2,h/2+5); });

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const ACC=J(C0,[[0,ba('2')],[2,sup('3')+' '],[3,'× '],[4,ba('2')],[6,sup('4')+' '],[7,'= '],[8,ba('4')],[10,sup('7')]]);
  const L1=J(X,[[3,ba('2')+' '],[4,'× '],[5,ba('2')+' '],[6,'× '],[7,ba('2')+' '],[8,'× '],[9,ba('2')+' '],[10,'× '],[11,ba('2')+' '],[12,'× '],[13,ba('2')+' '],[14,'× '],[15,ba('2')]]);
  const L2=J(X,[[19,ba('2')],[21,sup('7')+' '],[23,'= '+ok('128')]]);
  const L3=J(X,[[25,pi('4')],[27,`<span class="expo pi">7</span> `],[32,'= '+pi('16 384')]]);
  const L3b=[[0,'<span class="pi barre">4</span>'],[0,`<span class="expo pi">7</span> `],[0,'= '+pi('16 384')]];
  const E=J(D,[[1,ba('3')],[3,sup('4')+' '],[4,'× '],[5,ba('3')],[7,sup('5')+' '],[10,'= '+ex('?')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:tTu,a:x,top:60,fs:80,phrases:[ec(C0,'11:Tu 12:signes ?')]},
    {de:x,a:m(X,16),top:60,fs:66,phrases:[ec(X,'0:Écris 1:les 2:facteurs :')]},
    {de:m(X,16),a:tEt,top:60,fs:66,phrases:[ec(X,'16:Sept 17:facteurs 18:2')]},
    {de:tEt,a:tTrop,top:60,fs:80,phrases:[ec(X,'24:Et 27:4⁷ ?')]},
    {de:tTrop,a:tBase,top:60,fs:80,phrases:[ec(X,'33:Beaucoup 34:trop !')]},
    {de:tBase,a:q,top:60,fs:66,phrases:[ec(X,'35:La 36:base 37:ne 38:change 39:pas.')]},
    {de:m(D,8),a:m(D,11),top:60,fs:66,phrases:[ec(D,'8:Ça 9:s’écrit 10:comment ?')]},
    {de:m(D,11),a:f,top:60,fs:62,phrases:[ec(D,'11:Réponds 12:en 13:commentaire !')]}
  ];
  const tics=[{t:tCrash,f:95},{t:tCrash+.02,f:70},{t:tPas,f:300}]; for(const i of RANGS) tics.push({t:m(X,i),f:i<8?520:600}); tics.push({t:t128,f:760}); for(const i of [14,15]) tics.push({t:m(R,i),f:520}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,tTu+.7,'<span style="color:#17452a">2³ × 2⁴ = 4⁷</span><div style="color:#e8590c;font-size:108px;margin-top:8px">TU SIGNES ?</div>');

  return { clips,FIN,tics,titre:'Le contrat',ceinture:0,finTitre:tTu,groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'3:5² 4:× 7:5³ ?')],
      pause:[ec(Q,'20:Mets 21:pause, 22:et 23:choisis !')],
      choix:[[puiss('25','5'),m(Q,8)-q,m(Q,11)-q],[puiss('5','5'),m(Q,12)-q,m(Q,15)-q],[puiss('5','6'),m(Q,16)-q,m(Q,19)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'4:5⁵.')],suite:[ec(R,'5:On 6:garde 7:la 8:base,'),ec(R,'9:on 10:additionne 11:les 12:exposants :'),ec(R,'13:2 14:+ 15:3.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(T>=x&&T<q) cam.y=2.05;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      bureau.visible=pupitre.visible=!dansF;
      /* La tour écrase le bureau : il s'aplatit au choc, reste bas jusqu'à « base », puis se redresse */
      const ecr=T<tCrash||T>=q?1:(T<tBase?.34:kf(T,[[tBase,.34],[tBase+.45,1]]));
      bureau.scale.y=ecr; pupitre.children[0].position.y=.76*ecr; pupitre.children[0].visible=!(T>=tCrash&&T<tBase);
      train(T); contrat(T);

      /* La plaque et la tour */
      const voirPl=T>=t128&&T<q; plaque.visible=lab128.mesh.visible=fleche.mesh.visible=voirPl;
      if(voirPl){ const p=lisse((T-t128)/.25); plaque.scale.set(p,1,p); }
      const voirT=T>=tTour&&T<tBase+.7; tour.visible=voirT;
      if(voirT){
        const des=(T-tTour)/(tCrash-tTour), reb=T-tCrash;
        let y=des<1?(1-des*des)*6.6:0; if(reb>0&&reb<.35) y=Math.sin(reb/.35*Math.PI)*.1;
        if(T>=tBase) y=lisse((T-tBase)/.6)*7;
        tour.position.y=y;
        const ech=reb>0&&reb<.25?1+.05*Math.sin(reb/.25*Math.PI):1; tour.scale.set(ech,1,ech);
        labTour.mesh.visible=T>=tCrash;
      }
      /* Le choc secoue la pièce */
      if(T>=tCrash&&T<tCrash+.45){ cam.x=Math.sin(T*70)*.05*(1-(T-tCrash)/.45); cam.y+=Math.sin(T*90)*.04; }

      /* Le stylo : levé, approché de la signature, retiré, posé sur le bureau à « pas » */
      const tPose=tPas+.2, enMain=T<tPose&&!dansF;
      stylo.visible=enMain;
      styloPose.visible=!enMain&&!dansF&&T<q;
      PO.gesteD='poing';
      styloPose.position.set(1.2,.8,.2);
      if(enMain){
        const hx=kf(T,[[tTu-.5,.82],[tTu,1.42],[x,1.42],[x+.5,.82],[tPas-.3,.82],[tPose,1.2]]);
        const hy=kf(T,[[tTu-.5,1.75],[tTu,1.38],[x,1.38],[x+.5,2.1],[tPas-.3,2.1],[tPose,1.25]]);
        stylo.rotation.z=kf(T,[[tTu-.5,-.2],[tTu,1.25],[x,1.25],[x+.5,-.2]]);
        PO.md.set(hx,hy,.62); PO.cd.set(.8,Math.min(1.75,1.2+hy*.2),.14);
        /* La plume tremble au-dessus de la ligne */
        if(T>=tTu&&T<x) PO.md.y+=Math.sin(T*16)*.015;
      } else if(!dansF&&T<q){ g.ouvre(); }

      /* Regards et poses */
      if(T<tTu){ PO.regX=-.05; PO.regY=.55; PO.tetY=.08+Math.sin(T*1.7)*.05; }
      else if(T<x){ PO.regX=.1; PO.regY=.5; PO.tetX=.05; }
      else if(T<tEt){ PO.regX=-.3; PO.regY=.2; PO.tetX=-.12; PO.tetZ=Math.sin(T*1.5)*.05; }
      else if(T<tCrash){ PO.regX=-.4; PO.regY=.35; PO.tetX=-.18; PO.paupiere=-1.1; }
      else if(T<tBase){ g.oups(); PO.gesteD='poing'; if(enMain){ const hy=2.1; PO.md.set(.98,hy+.3,.5); } PO.regX=.12; PO.regY=.45; }
      else if(T<q){ PO.regY=.5; PO.regX=-.05; PO.tetZ=-.06; }
      else if(T<f){ /* Le stylo est posé : pendant la question, il réfléchit */ }
      if(dansQ){ T<r?g.reflechit():(T<m(R,1)?g.ouvre():g.pouce()); }
      if(T>=d&&T<f){ T<m(D,11)?g.reflechit():g.montre(); }
      if(dansF){ T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ cam.y=2.75; cam.d=11.6; PO.jaw=.6; }

      const voirP=(T>=m(C0,0)&&T<q)||(T>=m(D,1)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E]:(T<m(X,3)?[ACC]:[L1,T>=m(X,19)?L2:[],T>=m(X,25)?(T>=tTrop?L3b:L3):[]]));
      legende.classList.toggle('piege',T>=tTrop&&T<tBase);
      legende.style.color=T>=tBase&&T<q?'#2f9a3a':'';
    } };
};
