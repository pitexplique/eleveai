/* ============================================================
   ÉPISODE 12 (3e) : LE TAMPON. 2³ × 3³ = 6³, ça a l'air faux, et c'est juste.
   Ti Margo, inspecteur, lève son tampon FAUX ; la balance pèse 8 × 27 et 6³ : 216 des deux côtés.
   Le tampon se retourne : JUSTE. Les billes 2 et 3 se groupent par paires, trois paires de 6.
   Voix validée : manim/voix/3e-puissance-defi-short-da.json
   ============================================================ */
FILMS.defi=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':7.55,'01-verifier':16.085,'01q-question':15.515,'01r-reponse':9.155,'02-question':7.69,'03-abonne':6.045};
  const C0='00-accroche',X='01-verifier',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  /* 1,1 s de plus après « C'est juste ! » : le temps du coup de tampon et des paires */
  const {clips,A,CL,m,ec,J,FIN}=chrono('defi',DUR,{[X]:1.1,[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],q=A[Q],r=A[R],d=A[D],f=A[F];
  const tCa=m(C0,11),tFaux=m(C0,14),t22=m(X,22),t23=m(X,23),S=t23+.75,G=t23+.95;
  const BLEU='#1971c2',ORANGE='#e8590c',VERT='#2f9a3a',ROUGE='#c92a2a',ENCRE='#17452a';

  /* Une valeur qui suit des instants-clés : [[t,v],…], lissée entre deux */
  const kf=(T,l)=>{ if(T<=l[0][0]) return l[0][1]; for(let i=1;i<l.length;i++) if(T<l[i][0]) return l[i-1][1]+(l[i][1]-l[i-1][1])*lisse((T-l[i-1][0])/(l[i][0]-l[i-1][0])); return l[l.length-1][1]; };

  /* ---- Le bureau d'inspection : un mur vert d'eau, des étagères de dossiers ---- */
  poserPiece(0xd9efe3,0xc9b08d,0x6f8f80);
  const coulD=[0xf3c969,0x8fc1e3,0xe89f8b,0xa8d59c,0xc9b3e6,0xf3c969,0xe89f8b,0x8fc1e3];
  for(const [yE,dec] of [[3.1,0],[4.5,3]]){
    const et=new THREE.Mesh(new THREE.PlaneGeometry(120,.12),new THREE.MeshBasicMaterial({color:0x9c7a52})); et.position.set(0,yE,-2.34); scene3d.add(et);
    for(let i=0;i<20;i++){ const h=.72+((i*7+dec)%5)*.05, cl=new THREE.Mesh(new THREE.PlaneGeometry(.3,h),new THREE.MeshBasicMaterial({color:coulD[(i+dec)%8]})); cl.position.set(-3.4+i*.36,yE+.06+h/2,-2.32); scene3d.add(cl); }
  }

  /* ---- Le bureau et sa planchette géante ---- */
  const meuble=new THREE.Group(); meuble.position.set(1.12,0,0); scene3d.add(meuble);
  piece(meuble,new RoundedBoxGeometry(2.22,.72,.9,2,.05),toon(0x9c6b3f),[0,.36,-.42],CONTOUR_FIN);
  piece(meuble,new RoundedBoxGeometry(2.2,2.2,.08,2,.03),toon(0xb9824c),[0,1.78,-.12],CONTOUR_FIN);
  piece(meuble,new RoundedBoxGeometry(.7,.18,.12,2,.03),toon(0x93a4b3),[0,2.86,-.08],CONTOUR_FIN);
  const feuille=ecran3d(2,2,[0,1.76,-.07],meuble,384);

  /* La formule, posée d'avance : chaque morceau garde sa place et n'apparaît qu'à son instant */
  function formule(g,w,y,items,T,tp=118){
    let k=1; g.textBaseline='alphabetic'; g.textAlign='left';
    const lg=it=>{ g.font=`800 ${(it[3]?.62:1)*tp*k}px "Segoe UI"`; return g.measureText(it[1]).width; };
    let tot=items.reduce((s,it)=>s+lg(it),0); if(tot>w*.92){ k=w*.92/tot; tot*=k; }
    let px=(w-tot)/2; for(const it of items){ const l=lg(it); if(T>=it[0]){ g.fillStyle=it[2]; g.fillText(it[1],px,y-(it[3]?.42*tp*k:0)); } px+=l; }
  }
  const FA=[[m(C0,0),'2',BLEU],[m(C0,2),'3',ORANGE,1],[m(C0,3),' × ',ENCRE],[m(C0,4),'3',BLEU],[m(C0,6),'3',ORANGE,1],[m(C0,7),' = ',ENCRE],[m(C0,8),'6',BLEU],[m(C0,10),'3',ORANGE,1]];
  const FQ=[[m(Q,3),'2',BLEU],[m(Q,3),'5',ORANGE,1],[m(Q,4),' × ',ENCRE],[m(Q,5),'5',BLEU],[m(Q,7),'5',ORANGE,1],[m(R,3),' = ',ENCRE],[m(R,3),'10',VERT],[m(R,4),'5',VERT,1]];
  const FD=[[m(D,1),'4',BLEU],[m(D,3),'3',ORANGE,1],[m(D,4),' × ',ENCRE],[m(D,5),'5',BLEU],[m(D,7),'3',ORANGE,1],[m(D,10),' = ',ENCRE],[m(D,10),'?',ORANGE]];
  function dessineFeuille(T){
    const liste=T<q?FA:(T<d?FQ:FD), juste=T>=S&&T<q, cent=T>=m(R,17)&&T<d;
    const k=(T<q?'a':T<d?'q':'d')+liste.filter(i=>T>=i[0]).length+juste+cent;
    feuille.ecrire(k,(g,w,h)=>{
      g.fillStyle='#fffdf5'; g.fillRect(0,0,w,h);
      g.strokeStyle='#cfe0ea'; g.lineWidth=3; for(let i=1;i<8;i++){ g.beginPath(); g.moveTo(26,i*h/8); g.lineTo(w-26,i*h/8); g.stroke(); }
      formule(g,w,h*.23,liste,T);
      if(juste){ g.save(); g.translate(w*.46,h*.64); g.rotate(-.16); g.strokeStyle=VERT; g.lineWidth=16; g.beginPath(); g.roundRect(-300,-96,600,192,26); g.stroke(); g.fillStyle=VERT; g.font='800 150px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('JUSTE',0,10); g.restore(); }
      if(cent){ g.fillStyle=VERT; g.font='800 112px "Segoe UI"'; g.textAlign='center'; g.textBaseline='alphabetic'; g.fillText('100 000',w/2,h*.93); }
    });
  }

  /* ---- Le tampon, dans la main ---- */
  const tampon=new THREE.Group(); tampon.rotation.set(0,.2,.1); mainD.g.add(tampon);
  const corps=new THREE.Group(); tampon.add(corps);
  const bois=toon(0x8a5a2b);
  piece(corps,new THREE.CylinderGeometry(.09,.11,.52,14),bois,[0,-.12,0],CONTOUR_FIN);
  piece(corps,new THREE.SphereGeometry(.2,18,14),bois,[0,.24,0],CONTOUR_FIN);
  piece(corps,new RoundedBoxGeometry(1.3,.16,.66,2,.04),toon(0xa9713a),[0,-.44,0],CONTOUR_FIN);
  const face=ecran3d(1.22,.6,[0,-.525,0],corps,300); face.mesh.rotation.x=Math.PI/2;
  function dessineFace(T){
    let s='',c=ROUGE;
    if(T<t23){ if(T>=tFaux) s='FAUX'; }
    else if(T<q){ s='JUSTE'; c=VERT; }
    else if(T<d){ if(T>=m(R,1)){ s='JUSTE'; c=VERT; } }
    else if(T>=m(D,10)){ s='?'; c=ORANGE; }
    face.ecrire(s,(g,w,h)=>{ g.fillStyle='#fff6e4'; g.beginPath(); g.roundRect(0,0,w,h,20); g.fill(); if(!s) return; g.strokeStyle=c; g.lineWidth=9; g.beginPath(); g.roundRect(10,10,w-20,h-20,16); g.stroke(); g.fillStyle=c; g.font=`800 ${s==='JUSTE'?96:118}px "Segoe UI"`; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+6); });
  }

  /* ---- La balance, suspendue au plafond ---- */
  const bal=new THREE.Group(); bal.position.z=-.5; scene3d.add(bal);
  const metal=toon(0x7c8c9c), YF=4.9, DEMI=1.45;
  piece(bal,new THREE.CylinderGeometry(.05,.05,3,10),metal,[0,YF+1.5,0],CONTOUR_FIN);
  const fleau=piece(bal,new RoundedBoxGeometry(2*DEMI+.16,.13,.13,2,.04),metal,[0,YF,0],CONTOUR_FIN);
  piece(bal,new THREE.SphereGeometry(.13,14,12),toon(0xf5a50a),[0,YF,.05],CONTOUR_FIN);
  function plateau(){ const g=new THREE.Group(); bal.add(g);
    for(const s of [-1,1]){ const c=piece(g,new THREE.CylinderGeometry(.015,.015,1.18,6),metal,[s*.32,-.5,-.04],null); c.rotation.z=s*.6; }
    piece(g,new THREE.CylinderGeometry(.72,.62,.09,24),toon(0xc7d2dc),[0,-1,0],CONTOUR_FIN);
    const e=ecran3d(1.36,.82,[0,-.54,.3],g,300); return {g,e}; }
  const pG=plateau(), pD=plateau();
  function etiquette(p,l1,l2,cle){ p.e.mesh.visible=!!l1.length; p.e.ecrire(cle,(g,w,h)=>{ if(!l1.length) return; g.fillStyle='#fff'; g.strokeStyle=ENCRE; g.lineWidth=7; g.beginPath(); g.roundRect(5,5,w-10,h-10,26); g.fill(); g.stroke();
      const lig=(it,y)=>{ const t=it.length?it:[]; g.textAlign='left'; g.textBaseline='alphabetic'; const fs=x=>`800 ${x?56:88}px "Segoe UI"`; let tot=0; for(const [s,,e] of t){ g.font=fs(e); tot+=g.measureText(s).width; } let px=(w-tot)/2; for(const [s,c,e] of t){ g.font=fs(e); g.fillStyle=c; g.fillText(s,px,y-(e?36:0)); px+=g.measureText(s).width; } };
      if(l2.length){ lig(l1,h*.44); lig(l2,h*.86); } else lig(l1,h*.64); }); }

  /* ---- Les billes : 5 bleues, 5 orange ---- */
  function fairebille(col){ const g=new THREE.Group(); g.visible=false; scene3d.add(g);
    piece(g,new THREE.SphereGeometry(1,22,16),toon(col),null,CONTOUR_FIN);
    const e=ecran3d(1.6,1.6,[0,0,1.03],g,120); return {g,e}; }
  const bleues=[0,1,2,3,4].map(()=>fairebille(0x5cb3ff)), oranges=[0,1,2,3,4].map(()=>fairebille(0xffa24d));
  function poseB(b,X_,Y_,r,chiffre,z=.08){ b.g.visible=true; b.g.position.set(X_,Y_,z); b.g.scale.setScalar(r); b.e.ecrire(chiffre,(g,w,h)=>{ g.fillStyle='#0b1f33'; g.font='800 130px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(chiffre,w/2,h/2+6); }); }
  const capsules=[0,1,2,3,4].map(()=>{ const e=ecran3d(1.25,.68,[0,0,.02],scene3d,200); e.ecrire('x',(g,w,h)=>{ g.strokeStyle=VERT; g.lineWidth=11; g.beginPath(); g.roundRect(8,8,w-16,h-16,(h-16)/2); g.stroke(); }); e.mesh.visible=false; return e; });
  const six=[0,1,2].map(()=>{ const e=ecran3d(.7,.6,[0,0,.02],scene3d,200); e.ecrire('6',(g,w,h)=>{ g.fillStyle='#fff'; g.strokeStyle=VERT; g.lineWidth=8; g.beginPath(); g.arc(w/2,h/2,h/2-6,0,7); g.fill(); g.stroke(); g.fillStyle=VERT; g.font='800 92px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('6',w/2,h/2+5); }); e.mesh.visible=false; return e; });
  function billes(T){
    for(const l of [bleues,oranges,capsules,six]) for(const o of l) (o.mesh||o.g).visible=false;
    if(T>=t23&&T<q){ const XP=[-1.45,0,1.45], B0=[-1.9,-1.3,-.7], O0=[.7,1.3,1.9], Y=4.25;
      for(let i=0;i<3;i++){ const ch=1-lisse((T-t23-.06*i)/.32), mv=lisse((T-G)/.45), y=Y+ch*3;
        poseB(bleues[i],B0[i]+(XP[i]-.3-B0[i])*mv,y,.27,'2'); poseB(oranges[i],O0[i]+(XP[i]+.3-O0[i])*mv,y,.27,'3',mv>0&&mv<1?.7:.08);
        if(T>=G+.42){ const c=capsules[i].mesh; c.visible=true; c.position.set(XP[i],Y,.06); c.scale.setScalar(1); const s=six[i].mesh; s.visible=true; s.position.set(XP[i],Y-.68,.06); const v=(T-G-.42)/.3; s.scale.setScalar(v<1?.5+.5*lisse(v)+.25*Math.sin(Math.min(1,v)*Math.PI):1); }
      } }
    if(T>=r&&T<d&&T>=m(R,9)){ const XR=[.48,1.12,1.76,.8,1.44], YR=[1.95,1.95,1.95,1.47,1.47], RG=[11,12,13,14,15];
      for(let i=0;i<5;i++){ const tb=i?m(R,RG[i]):m(R,9), to=i?m(R,RG[i]):m(R,11);
        if(T>=tb) poseB(bleues[i],XR[i]-.14,YR[i],.13,'2'); if(T>=to){ poseB(oranges[i],XR[i]+.14,YR[i],.13,'5'); const c=capsules[i].mesh; c.visible=true; c.position.set(XR[i],YR[i],.06); c.scale.setScalar(.48); } } }
    if(T>=d&&T<f){ const XD=[.48,1.12,1.76];
      for(let i=0;i<3;i++){ if(T>=m(D,3)) poseB(bleues[i],XD[i]-.14,1.55,.13,'4'); if(T>=m(D,7)){ poseB(oranges[i],XD[i]+.14,1.55,.13,'5'); const c=capsules[i].mesh; c.visible=true; c.position.set(XD[i],1.55,.06); c.scale.setScalar(.48); } } }
  }

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const ACC=J(C0,[[0,ba('2')],[2,sup('3')+' '],[3,'× '],[4,ba('3')],[6,sup('3')+' '],[7,'= '],[8,ba('6')],[10,sup('3')]]);
  const L1=J(X,[[1,ba('2')],[3,sup('3')+' '],[4,'= 8'],[5,' &nbsp;&nbsp; '+ba('3')],[7,sup('3')+' '],[8,'= 27']]);
  const L2=J(X,[[9,'8 '],[10,'× '],[11,'27 '],[14,'= '+ok('216')]]);
  const L3=J(X,[[16,ba('6')],[18,sup('3')+' '],[21,'= '+ok('216')]]);
  const E=J(D,[[1,ba('4')],[3,sup('3')+' '],[4,'× '],[5,ba('5')],[7,sup('3')+' '],[10,'= '+ex('?')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:tCa,a:x,top:60,fs:66,phrases:[ec(C0,'11:Ça 12:a 13:l’air 14:faux, 15:non ?')]},
    {de:x,a:t22,top:60,fs:80,phrases:[ec(X,'0:Vérifions.')]},
    {de:t22,a:q,top:60,fs:80,phrases:[ec(X,'22:C’est 23:juste !')]},
    {de:m(D,8),a:m(D,11),top:60,fs:66,phrases:[ec(D,'8:Ça 9:fait 10:combien ?')]},
    {de:m(D,11),a:f,top:60,fs:62,phrases:[ec(D,'11:Réponds 12:en 13:commentaire !')]}
  ];
  const tics=[{t:tFaux,f:180},{t:S,f:150},{t:G+.42,f:620}]; for(const i of [4,8,14,21]) tics.push({t:m(X,i),f:i>10?460:360}); for(const i of [11,12,13,14,15]) tics.push({t:m(R,i),f:520}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,tFaux+.6,'<span style="color:#17452a">2³ × 3³ = 6³</span><div style="color:#c92a2a;font-size:92px;margin-top:8px">ÇA A L’AIR FAUX ?</div>');

  return { clips,FIN,tics,titre:'Le tampon',ceinture:0,finTitre:tCa,groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'3:2⁵ 4:× 7:5⁵ ?')],
      pause:[ec(Q,'20:Mets 21:pause, 22:et 23:choisis !')],
      choix:[[puiss('7','5'),m(Q,8)-q,m(Q,11)-q],[puiss('10','5'),m(Q,12)-q,m(Q,15)-q],[puiss('10','10'),m(Q,16)-q,m(Q,19)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'4:10⁵.')],suite:[ec(R,'5:On 6:fait 7:des 8:paires :'),ec(R,'9:2 10:× 11:5, 12:cinq 13:fois 14:de 15:suite.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      meuble.visible=!dansF; tampon.visible=!dansF;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      /* La balance : elle tombe à « Vérifions », penche selon ce qu'on pose, remonte à « juste » */
      bal.visible=T>=x&&T<t23+.6;
      if(bal.visible){
        const tombe=(T-x)/.5, dy=tombe<1?(1-lisse(tombe))*3.2:Math.abs(Math.sin((tombe-1)*5))*.1*Math.max(0,1-(tombe-1)*.5);
        bal.position.y=dy+lisse((T-t23)/.5)*3.6;
        const po=(t,c)=>c*lisse((T-t)/.35);
        const gauche=po(m(X,4),.4)+po(m(X,8),.3)+po(m(X,14),.3), droite=po(m(X,21),1);
        const eq=T-m(X,21), osc=eq>0?Math.sin(eq*9)*.05*Math.exp(-eq*2.2):0;
        const a=(gauche-droite)*.17+osc;
        fleau.rotation.z=a;
        pG.g.position.set(-DEMI*Math.cos(a),YF-DEMI*Math.sin(a),0); pD.g.position.set(DEMI*Math.cos(a),YF+DEMI*Math.sin(a),0);
        const l1=T<m(X,4)?[]:(T<m(X,8)?[['8',BLEU]]:(T<m(X,10)?[['8',BLEU],['   ',BLEU],['27',BLEU]]:[['8',BLEU],[' × ',ENCRE],['27',BLEU]]));
        const l2=T>=m(X,14)?[['= 216',VERT]]:[];
        etiquette(pG,l1,l2,'g'+l1.length+l2.length);
        const d1=T<m(X,16)?[]:(T<m(X,18)?[['6',BLEU]]:[['6',BLEU],['3',ORANGE,1]]);
        const d2=T>=m(X,21)?[['= 216',VERT]]:[];
        etiquette(pD,d1,d2,'d'+d1.length+d2.length);
      }
      billes(T); dessineFeuille(T); dessineFace(T);

      /* Le tampon et la main */
      PO.gesteD='poing';
      let hx=.8,hy=1.75,hz=.5,rx=0;
      if(T<q){
        hy=kf(T,[[tCa,1.75],[tCa+.45,3.45],[x+.1,3.45],[x+.5,1.75],[t22,1.75],[t22+.25,3.45],[S-.3,3.45],[S-.08,2.2],[S,1.72],[S+.28,1.72],[S+.6,3.45]]);
        hx=kf(T,[[tCa,.8],[tCa+.45,1.38],[x+.1,1.38],[x+.5,.8],[t22,.8],[t22+.25,1.38],[S-.3,1.38],[S,1.25],[S+.28,1.25],[S+.6,1.38]]);
        hz=kf(T,[[S-.3,.5],[S,.6],[S+.3,.6],[S+.6,.5]]);
        rx=kf(T,[[tCa+.1,0],[tCa+.45,-1.25],[x+.1,-1.25],[x+.5,0],[t22,0],[t23+.2,-1.25-2*Math.PI],[S-.26,-1.25-2*Math.PI],[S-.06,Math.PI/2-2*Math.PI],[S+.28,Math.PI/2-2*Math.PI],[S+.6,-1.25-2*Math.PI]]);
        scene.x=kf(T,[[t23+.25,-1.3],[S-.04,-.55],[S+.3,-.55],[S+.72,-1.3]]);
        scene.z=kf(T,[[t23+.25,-.5],[S-.04,0],[S+.3,0],[S+.72,-.5]]);
        scene.y=T>t23+.25&&T<S?Math.sin((T-t23-.25)/(S-t23-.25)*Math.PI)*.28:0;
      } else if(T<d){
        const tB=m(R,1);
        hy=kf(T,[[tB,1.75],[tB+.35,2.05]]); hx=kf(T,[[tB,.8],[tB+.35,.92]]); rx=kf(T,[[tB,0],[tB+.35,-1.25]]);
      } else if(T<f){
        const tP=m(D,10);
        hy=kf(T,[[tP-.1,1.75],[tP+.3,3.45]]); hx=kf(T,[[tP-.1,.8],[tP+.3,1.38]]); rx=kf(T,[[tP-.1,0],[tP+.2,-1.25]]);
      }
      corps.rotation.x=rx;
      if(!dansF){ PO.md.set(hx,hy,hz); PO.cd.set(.82,Math.min(1.9,1.3+hy*.2),.12); }

      /* Le regard */
      if(T<tCa){ PO.regX=-.05; PO.regY=.55; PO.tetY=.08+Math.sin(T*1.7)*.05; }
      else if(T<x){ PO.tetZ=-.1; PO.regX=-.05; PO.regY=.5; PO.paupiere=-.55; }
      else if(T<t23){ PO.regX=-.32; PO.regY=.25; PO.tetX=-.14; PO.tetZ=Math.sin(T*1.6)*.05; }
      else if(T<q){ PO.regY=.3; PO.regX=-.1; PO.paupiere=-1.1; PO.tetZ=-.1; }
      else if(T<r){ PO.tetZ=.15; PO.tetX=-.1; PO.regX=-.28; PO.regY=.35; PO.qSway=Math.sin(T*3)*.3; }
      else if(T<d){ PO.regY=.45; PO.tetZ=-.08; if(T>=m(R,1)) PO.paupiere=-1.1; }
      else if(T<f){ PO.regY=.5; PO.regX=-.05; }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      /* À « Vérifions », il suspend son geste : surpris */
      if(T>=x&&T<x+.7) PO.paupiere=-1.25;

      if(window.MINI){ cam.y=2.75; cam.d=11.6; PO.jaw=.6; }

      const voirP=(T>=m(C0,0)&&T<q)||(T>=m(D,1)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E]:(T<m(X,1)?[ACC]:[L1,T>=m(X,9)?L2:[],T>=m(X,16)?L3:[]]));
      legende.classList.toggle('piege',T>=tCa&&T<x);
      legende.style.color=T>=t22&&T<q?'#2f9a3a':'';
    } };
};
