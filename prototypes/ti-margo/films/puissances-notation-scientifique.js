/* ============================================================
   ÉPISODE 05 : LA LONGUE BANDEROLE. 8 × 10⁹ ; 7 × 10⁻⁶.
   La foule se multiplie, la banderole 8 000 000 000 sort du cadre ; ses 9 zéros s'envolent en ballons
   et l'exposant 9 les attrape. Puis la loupe sur un globule rouge, la virgule qui saute 6 rangs.
   Fin : la Terre tombe sur un pèse-personne.
   ============================================================ */
FILMS['notation-scientifique']=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':5.11,'01-humains':6.645,'01q-question':15.355,'01r-reponse':6.2,'02-petit':10.285,'03-question':10.905,'04-abonne':6.045};
  const C0='00-accroche',H='01-humains',Q='01q-question',R='01r-reponse',P='02-petit',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('notation-scientifique',DUR,{[Q]:3.3,[D]:1.5});
  const h=A[H],q=A[Q],r=A[R],p=A[P],d=A[D],f=A[F];

  /* ---- La nuit : le ciel étoilé, un observatoire, un sol clair ---- */
  poserPiece(0x24406f,0x7f93b3,0x3a5580);
  { const et=new THREE.MeshBasicMaterial({color:0xfff5cf}); let gr=7; const al=()=>(gr=(gr*16807)%2147483647)/2147483647;
    for(let i=0;i<70;i++){ const s=new THREE.Mesh(new THREE.CircleGeometry(.018+al()*.026,8),et); s.position.set(-3.6+al()*7.2,.9+al()*6.4,-2.36); scene3d.add(s); } }

  /* ---- La Terre : une sphère, ses continents peints ---- */
  const cvT=document.createElement('canvas'); cvT.width=1024; cvT.height=512; { const g=cvT.getContext('2d'); g.fillStyle='#2b78e4'; g.fillRect(0,0,1024,512); g.fillStyle='#46b04a';
    for(const [a,b,c,e,o] of [[170,150,110,80,.4],[230,330,60,105,.2],[520,140,80,60,0],[560,300,75,100,.1],[770,170,140,80,.2],[880,370,65,42,0]]){ g.beginPath(); g.ellipse(a,b,c,e,o,0,7); g.fill(); g.beginPath(); g.ellipse(a+c*.5,b+e*.5,c*.55,e*.5,o,0,7); g.fill(); }
    g.fillStyle='#f1f7ff'; g.fillRect(0,0,1024,26); g.fillRect(0,486,1024,26); }
  const txTerre=new THREE.CanvasTexture(cvT); txTerre.colorSpace=THREE.SRGBColorSpace;
  const terre=piece(scene3d,new THREE.SphereGeometry(1,40,28),new THREE.MeshBasicMaterial({map:txTerre}),[1.15,3,-.6],CONTOUR_FIN);

  /* ---- La foule de petits margouillats, qui double et redouble ---- */
  const foule=new THREE.Group(); scene3d.add(foule); const peauF=[0x7ac943,0x5fb536,0x8fd356], blanc=new THREE.MeshBasicMaterial({color:0xffffff}), noir=new THREE.MeshBasicMaterial({color:0x17202a});
  const gBody=new THREE.SphereGeometry(.1,10,8).scale(.85,1.2,.8), gOeil=new THREE.SphereGeometry(.036,8,6), gPup=new THREE.SphereGeometry(.018,6,5);
  const petits=[]; { let gr=11; const al=()=>(gr=(gr*16807)%2147483647)/2147483647;
    for(let i=0;i<72;i++){ const g=new THREE.Group(), l=i%12, ra=Math.floor(i/12);
      g.position.set(-.15+l*.215+(ra%2)*.1+al()*.04,0,.85-ra*.42);
      const mt=new THREE.MeshBasicMaterial({color:peauF[i%3]}), c=new THREE.Mesh(gBody,mt); c.position.y=.13; g.add(c);
      const te=new THREE.Mesh(new THREE.SphereGeometry(.085,10,8),mt); te.position.y=.3; g.add(te);
      for(const s of [-1,1]){ const o=new THREE.Mesh(gOeil,blanc); o.position.set(s*.042,.36,.05); g.add(o); const n=new THREE.Mesh(gPup,noir); n.position.set(s*.042,.36,.08); g.add(n); }
      foule.add(g); petits.push(g); } }

  /* ---- La banderole : elle se déroule depuis la main de Ti Margo ---- */
  const X0=-.5, YB=1.72, ZB=.45, banniere=ecran3d(6,.8,[X0+3,YB,ZB],scene3d,200);
  const rouleau=piece(scene3d,new THREE.CylinderGeometry(.085,.085,.86,14),toon(0xfff3d6),[0,YB,ZB+.02],CONTOUR_FIN);
  const SOM='#17452a',ORB='#e8590c',VEB='#2f9a3a',BLB='#1971c2';
  const FS=140, gm=banniere.g; gm.font=`800 ${FS}px "Segoe UI"`; const LC=gm.measureText('0').width, GAP=FS*.33, M0=34;
  /* Le centre de chaque zéro du nombre 8 000 000 000, en unités du décor */
  const SLOTS=[]; { let u=M0+LC+GAP; for(let i=0;i<9;i++){ SLOTS.push(X0+(u+LC/2)/200); u+=LC; if(i%3===2) u+=GAP; } }
  const LONG=(SLOTS[8]-X0)+.5, COURT=2.5;
  const FC=118, lX=(s)=>{ gm.font=`800 ${FC}px "Segoe UI"`; return gm.measureText(s).width; };
  /* La place de l'exposant, sur la banderole courte */
  const U_EXP=M0+lX('8')+lX(' × ')+lX('10')+6;
  const EXP={x:X0+(U_EXP+lX('9')*.33)/200,y:YB+.14};
  function fond(g,lpx){ g.clearRect(0,0,1200,160); g.fillStyle='#fffdf6'; g.fillRect(0,0,lpx,160); g.fillStyle='#e8590c'; g.fillRect(0,0,lpx,10); g.fillRect(0,150,lpx,10); }
  function dessineBanniere(T,lon){ const lpx=Math.round(lon*200);
    const dep=i=>m(H,7)+i*.09;
    if(T<h+m(H,8)-h||T<m(H,8)){ /* le long nombre */
      const o=T>=m(C0,8), v8=T>=m(H,3)&&T<q, nb=[0,1,2,3,4,5,6,7,8].map(i=>T<dep(i)?1:0).join('');
      banniere.ecrire(`L${lpx}${o}${v8}${nb}`,(g,w,ht)=>{ fond(g,lpx); g.save(); g.beginPath(); g.rect(0,0,lpx,ht); g.clip(); g.font=`800 ${FS}px "Segoe UI"`; g.textBaseline='middle'; g.textAlign='left';
        let u=M0; g.fillStyle=v8?VEB:SOM; g.fillText('8',u,ht/2+4); u+=LC+GAP; for(let i=0;i<9;i++){ if(T<dep(i)){ g.fillStyle=o?ORB:SOM; g.fillText('0',u,ht/2+4); } u+=LC; if(i%3===2) u+=GAP; } g.restore(); }); return; }
    if(T<q){ const a=T>=m(H,11), b=T>=m(H,12), c=T>=m(H,14);
      banniere.ecrire(`C${lpx}${a}${b}${c}`,(g,w,ht)=>{ fond(g,lpx); g.save(); g.beginPath(); g.rect(0,0,lpx,ht); g.clip(); g.font=`800 ${FC}px "Segoe UI"`; g.textBaseline='middle'; g.textAlign='left';
        let u=M0; g.fillStyle=VEB; g.fillText('8',u,ht/2+4); u+=lX('8'); g.fillStyle=SOM; if(a) g.fillText(' × ',u,ht/2+4); u+=lX(' × '); g.font=`800 ${FC}px "Segoe UI"`; g.fillStyle=BLB; if(b) g.fillText('10',u,ht/2+4); u+=lX('10')+6;
        if(c){ g.font=`800 ${Math.round(FC*.66)}px "Segoe UI"`; g.fillStyle=ORB; g.fillText('9',u,ht/2-26); } g.restore(); }); return; }
    /* La question, la réponse : 3 millions, puis 3 000 000 */
    const m3=T>=m(Q,3), n3=T>=m(R,8), o3=T>=m(R,11);
    banniere.ecrire(`Q${m3}${n3}${o3}`,(g,w,ht)=>{ fond(g,lpx); g.textBaseline='middle'; g.textAlign='left';
      if(n3){ const fs=82; g.font=`800 ${fs}px "Segoe UI"`; let u=30; const lc=g.measureText('0').width; g.fillStyle=VEB; g.fillText('3',u,ht/2+4); u+=lc+fs*.33; for(let i=0;i<6;i++){ g.fillStyle=o3?ORB:SOM; g.fillText('0',u,ht/2+4); u+=lc; if(i===2) u+=fs*.33; } }
      else if(m3){ const fs=84; g.font=`800 ${fs}px "Segoe UI"`; g.fillStyle=VEB; g.fillText('3 ',30,ht/2+4); g.fillStyle=SOM; g.fillText('millions',30+g.measureText('3 ').width,ht/2+4); } });
  }

  /* ---- Les 9 ballons ---- */
  const ballons=SLOTS.map((sx,i)=>{ const e=ecran3d(.5,.74,[0,0,ZB+.25],scene3d,200); e.ecrire('b',(g,w,ht)=>{ g.strokeStyle='#5b6b7d'; g.lineWidth=3; g.beginPath(); g.moveTo(w/2,104); g.lineTo(w/2+((i%2)?7:-7),ht-2); g.stroke(); g.fillStyle='#f98a2c'; g.strokeStyle='#17452a'; g.lineWidth=4; g.beginPath(); g.ellipse(w/2,54,46,52,0,0,7); g.fill(); g.stroke(); g.fillStyle='#fff'; g.font='800 62px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('0',w/2,56); });
    return { e, sx, fx:-.05+(i%3)*.82+(Math.floor(i/3)%2)*.22, fy:2.75+Math.floor(i/3)*.62, i }; });

  /* ---- La loupe sur le globule rouge ---- */
  const loupe=new THREE.Group(); loupe.position.set(1.08,3.22,-.1); scene3d.add(loupe);
  piece(loupe,new THREE.CircleGeometry(.84,40),new THREE.MeshBasicMaterial({color:0xe2f6ff}),[0,0,-.03],null);
  const globule=new THREE.Group(); loupe.add(globule);
  piece(globule,new THREE.SphereGeometry(.6,28,20).scale(1,1,.3),toon(0xe03131),[0,0,0],CONTOUR_FIN);
  piece(globule,new THREE.CircleGeometry(.27,24),new THREE.MeshBasicMaterial({color:0xf47c7c}),[0,0,.19],null);
  piece(loupe,new THREE.TorusGeometry(.84,.08,14,50),toon(0x2b3a4d),[0,0,0],CONTOUR_FIN);
  const manche=piece(loupe,new RoundedBoxGeometry(.13,.92,.1,2,.03),toon(0x8b5a2b),[-1.03,-.72,0],CONTOUR_FIN); manche.rotation.z=-.96;

  /* ---- Le tableau : 0,000 007 et la virgule qui saute ---- */
  const tableau=new THREE.Group(); scene3d.add(tableau);
  piece(tableau,new RoundedBoxGeometry(2.4,1.28,.06,2,.02),toon(0xfff7e0),[.96,1.17,-.05],CONTOUR_FIN);
  for(const px of [.04,1.88]) piece(tableau,new RoundedBoxGeometry(.08,.56,.05,1,.01),toon(0x8b5a2b),[px,.28,-.08],null);
  const ardoise=ecran3d(2.34,1.22,[.96,1.17,0],tableau);
  const DX=72, D0=62, XD=k=>D0+k*DX+(k>=4?20:0);
  const CH='0000007', RANGS=[6,8,9,10,11,12,13];
  const sauts=()=>{ const l=[]; for(let j=0;j<5;j++) l.push(m(P,14)+.25+j*.22); l.push(m(P,19)); return l; };
  function dessineArdoise(T){ const SA=sauts(), dur=j=>j===5?.26:.2;
    let fait=0,en=-1,v=0; SA.forEach((s,j)=>{ if(T>=s+dur(j)) fait=j+1; else if(T>=s&&en<0){ en=j; v=(T-s)/dur(j); } });
    const vis=RANGS.filter(i=>T>=m(P,i)).length, virg=T>=m(P,7), metre=T>=m(P,14), vert=T>=m(P,15), six=T>=m(P,20), gris=T>=m(P,20);
    ardoise.ecrire([vis,virg,metre,vert,six,gris,fait,en,Math.round(v*12)].join(),(g,w,ht)=>{ const y=ht*.5, fs=108;
      g.textBaseline='middle'; g.textAlign='center'; g.font=`800 ${fs}px "Segoe UI"`;
      for(let k=0;k<vis;k++){ g.fillStyle=k===6?(vert?VEB:SOM):(gris?'#b9c1c9':SOM); g.fillText(CH[k],XD(k),y); }
      if(metre){ g.font='800 52px "Segoe UI"'; g.fillStyle=SOM; g.textAlign='right'; g.fillText('mètre',w-22,ht-28); g.textAlign='center'; }
      /* Les arcs déjà sautés, numérotés ; le 6 ne s'écrit qu'au mot « 6 » */
      const xv=k=>(XD(k)+XD(k+1))/2; g.lineCap='round';
      for(let j=0;j<Math.max(fait,en+1);j++){ if(j>=fait&&en!==j) continue; const a=xv(j), b=xv(j+1), fin=j<fait?1:v; g.strokeStyle='#e8590c'; g.lineWidth=7; g.beginPath(); for(let i=0;i<=16;i++){ const u=i/16*fin, px=a+(b-a)*u, py=y-56-44*Math.sin(u*Math.PI); i?g.lineTo(px,py):g.moveTo(px,py); } g.stroke();
        if(j<fait&&(j<5||six)){ g.font='800 50px "Segoe UI"'; g.fillStyle=ORB; g.fillText(String(j+1),(a+b)/2,y-124); } }
      /* La virgule, à sa place ou en plein saut */
      if(virg){ const j=en>=0?en:fait, a=xv(j), b=xv(j+1), u=en>=0?v:0, px=a+(b-a)*u, py=y+10-(en>=0?72*Math.sin(u*Math.PI):0); g.fillStyle='#c92a2a'; g.beginPath(); g.arc(px,py+16,14,0,7); g.fill(); g.beginPath(); g.moveTo(px+13,py+20); g.quadraticCurveTo(px+10,py+44,px-12,py+52); g.quadraticCurveTo(px+1,py+36,px-4,py+26); g.closePath(); g.fill(); }
    });
  }

  /* ---- Le pèse-personne ---- */
  const pese=new THREE.Group(); pese.position.set(1.05,0,-.5); scene3d.add(pese);
  const socle=piece(pese,new RoundedBoxGeometry(2.1,.36,1.5,3,.08),toon(0xf1f3f5),[0,.18,0],CONTOUR_FIN);
  const cadran=ecran3d(1.36,.28,[1.05,.2,.27],scene3d);

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,2);
  const E1=J(H,[[8,'On '],[9,'écrit '],[10,ok('8')],[11,' × '],[12,ba('10')],[14,sup('9')]]);
  const G1=J(P,[[15,ok('7')],[16,' × '],[17,ba('10')],[19,sup('−')],[20,sup('6')]]);
  const T1=J(D,[[7,ok('6')+' '],[8,'suivi '],[9,'de '],[10,ex('24')+' '],[11,ex('zéros')+' '],[12,'kg']]);
  const T2=J(D,[[16,ok('6')+' × '+ba('10')+sup('?')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:A[C0]+.05,a:m(C0,3),top:352,fs:62,phrases:[ec(C0,'0:8 1:milliards 2:d’humains.')]},
    {de:m(C0,3),a:h,top:352,fs:60,phrases:[ec(C0,'3:Comment 4:l’écrire'),ec(C0,'5:sans 6:aligner 7:les 8:zéros ?')]},
    {de:h+.05,a:q,top:60,fs:58,phrases:[ec(H,'0:8 1:milliards :'),ec(H,'2:un 3:8 4:suivi 5:de 6:9 7:zéros.')]},
    {de:p+.05,a:d,top:60,fs:62,phrases:[ec(P,'0:Et 1:le 2:minuscule ?'),ec(P,'3:Un 4:globule 5:rouge :')]},
    {de:d+.05,a:m(D,13),top:60,fs:62,phrases:[ec(D,'0:À 1:ton 2:tour :'),ec(D,'3:la 4:Terre 5:pèse 6:environ')]},
    {de:m(D,13),a:m(D,17),top:60,fs:62,phrases:[ec(D,'13:Écris-le 14:en 15:notation'),ec(D,'16:scientifique.')]},
    {de:m(D,17),a:f,top:60,fs:62,phrases:[ec(D,'17:Réponds 18:en 19:commentaire !')]}
  ];
  const tics=[{t:m(C0,2),f:420},{t:m(H,14),f:880},{t:m(P,4),f:520},{t:m(P,20),f:880},{t:m(D,5),f:150}];
  for(let j=0;j<9;j++) tics.push({t:m(H,7)+j*.09,f:600+j*30}); for(const s of sauts()) tics.push({t:s,f:560});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,8)+.25,'<div style="white-space:nowrap;font-size:78px">8 milliards d’humains :</div><div style="color:#e8590c;font-size:80px;margin-top:8px;white-space:nowrap">COMMENT L’ÉCRIRE ?</div>');

  return { clips,FIN,tics,titre:'La longue banderole',ceinture:0,finTitre:h,groupes,finClip:F,
    cuts:[q,p,d,f],
    question:{ qc:Q,rc:R,finR:p,cpt:q+DUR[Q]+.1,bonne:0,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Et 2:3 3:millions ?')],
      pause:[ec(Q,'22:Mets 23:pause,'),ec(Q,'24:et 25:choisis !')],
      choix:[['3 × '+puiss('10','6'),m(Q,4)-q,m(Q,9)-q],['3 × '+puiss('10','3'),m(Q,10)-q,m(Q,15)-q],['30 × '+puiss('10','5'),m(Q,16)-q,m(Q,21)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'A :']],reponse:[ec(R,'6:3 × 10⁶.')],suite:[ec(R,'7:Un 8:3 9:suivi 10:de 11:6 12:zéros.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<p, dansP=T>=p&&T<d, dansD=T>=d&&T<f, dansF=T>=f;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }

      /* La Terre tourne ; à la fin, elle tombe sur la balance */
      const avant=T<p;
      terre.visible=avant||dansD;
      if(avant){ terre.position.set(1.15,3,-.6); terre.scale.setScalar(.72); terre.rotation.y=T*.35; }
      if(dansD){ const ta=m(D,3), to=m(D,5), rb=Math.max(0,1-(T-to)/.4), c=T<ta?-1:Math.min(1,(T-ta)/(to-ta)), yy=c<0?9:(6.6+(1.34-6.6)*c*c)+(T>=to?.12*Math.sin((T-to)/.4*Math.PI)*rb:0);
        terre.position.set(1.05,yy,-.5); terre.scale.setScalar(.98); terre.rotation.y=T*.3; }

      /* La foule double, du mot « d'humains » à la fin de la première phrase */
      const voirF=T<p;
      foule.visible=voirF;
      if(voirF){ const n=T<m(C0,2)?0:Math.min(72,Math.pow(2,1+Math.floor((T-m(C0,2))/.16))); petits.forEach((pt,i)=>{ pt.visible=i<n; pt.position.y=Math.abs(Math.sin(T*5+i))*.035; }); }

      /* La banderole */
      const dTo=T>=m(C0,3)?lisse((T-m(C0,3))/(m(C0,8)-m(C0,3)))*LONG:0;
      let lon=dTo; if(T>=m(H,8)) lon=LONG+(COURT-LONG)*lisse((T-m(H,8))/(m(H,10)-m(H,8)));
      const voirB=T>=m(C0,3)&&T<p&&(T<q||T>=m(Q,3));
      if(T>=q) lon=COURT;
      banniere.mesh.visible=rouleau.visible=voirB;
      if(voirB){ dessineBanniere(T,lon); rouleau.position.x=X0+lon; }

      /* Les ballons : du banderole au ciel, puis dans l'exposant, au mot « 9 » */
      const tc=m(H,14)-.38;
      ballons.forEach((b)=>{ const t0=m(H,7)+b.i*.09, vu=T>=t0&&T<m(H,14)+.02&&T<q; b.e.mesh.visible=vu; if(!vu) return;
        const v=lisse((T-t0)/.7); let px=b.sx+(b.fx-b.sx)*v, py=YB+(b.fy-YB)*v+Math.sin(T*3+b.i)*.05*v, s=1;
        if(T>=tc){ const w=lisse((T-tc)/.38); px+=(EXP.x-px)*w; py+=(EXP.y-py)*w; s=1-.8*w; }
        b.e.mesh.position.set(px,py,ZB+.25+b.i*.002); b.e.mesh.scale.setScalar(s); });

      /* La loupe et le tableau */
      loupe.visible=tableau.visible=dansP;
      if(dansP){ const o=lisse((T-p)/.3); loupe.scale.setScalar(Math.max(.001,o)); const z=T<m(P,4)?.08:.08+.92*lisse((T-m(P,4))/.5); globule.scale.setScalar(z*(1+.025*Math.sin(T*3))); globule.rotation.z=T*.25; dessineArdoise(T); }

      /* Le pèse-personne s'écrase quand la Terre le touche */
      pese.visible=cadran.mesh.visible=dansD;
      if(dansD){ const to=m(D,5), ec2=T>=to?(1-.24*lisse((T-to)/.12)):1; socle.scale.y=ec2; socle.position.y=.18*ec2; cadran.mesh.position.y=.2*ec2; const v=T>=m(D,12); cadran.ecrire('c'+v,(gc,w,ht)=>{ gc.fillStyle='#0f2238'; gc.beginPath(); gc.roundRect(0,0,w,ht,14); gc.fill(); if(v){ gc.fillStyle='#ff9f43'; gc.font='800 56px "Segoe UI"'; gc.textAlign='center'; gc.textBaseline='middle'; gc.fillText('? kg',w/2,ht/2+2); } }); }

      if(T<m(C0,3)){ g.ouvre(); PO.regY=.2; PO.regX=-.2; }
      else if(T<h){ g.ouvre(); PO.md.set(.9,1.98,.5); PO.regY=-.05; PO.regX=-.25; }
      else if(T<m(H,14)){ g.ouvre(); PO.md.set(.9,1.98,.5); PO.regY=T>=m(H,7)?.5:0; PO.regX=-.2; }
      else if(T<q){ g.pouce(); }
      else if(T<r){ g.reflechit(); }
      else if(T<p){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<d){ PO.gesteD='poing'; PO.md.set(1.08,2.42,.45); PO.cd.set(.82,1.8,.2); PO.regX=-.25; PO.regY=.3; }
      else if(T<f){ const to=m(D,5); if(T<m(D,3)) g.ouvre(); else if(T<to+.8){ g.oups(); PO.regX=.25; PO.regY=.35; } else if(T<m(D,13)) g.montre(); else g.reflechit(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }
      if(window.MINI){ PO.jaw=.62; cam.y=2.6; }

      const voirP=(T>=m(H,8)&&T<q)||(T>=m(P,15)&&T<d)||(T>=m(D,7)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){ if(T<q) lignes(T,[E1]); else if(T<d) lignes(T,[G1]); else lignes(T,[T1,T>=m(D,16)?T2:[]]); }
      legende.classList.toggle('piege',false);
    } };
};
