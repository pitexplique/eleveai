/* ============================================================
   Série Carré et cube 5e, épisode 04 : LA PELUCHE DE LA FÊTE FORAINE (voix 5e-puissance-calculer-short).
   Au stand, Ti Margo parie : 2 + 3² = 25. Raté ! Le carré passe d'abord : 3² = 9, puis 2 + 9 = 11.
   Deuxième essai : 2 × 3² = 2 × 9 = 18. Gagné, la peluche est à lui.
   Code couleur : bleu le nombre (la base), orange l'exposant, vert juste, rouge piège.
   Outils : films/puissances-commun.js (chrono, lignesPanneau, gestes, ba/sup/ok/pi, poserMiniature, ecran3d).
   ============================================================ */
FILMS.calculer=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':9.865,'01-oups':7.655,'02-produit':10.59,'02q-question':12.23,'02r-reponse':7.745,'03-question':6.315,'04-abonne':6.045};
  const C0='00-accroche',X='01-oups',PR='02-produit',Q='02q-question',R='02r-reponse',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('calculer',DUR,{[C0]:.35,[X]:.35,[PR]:.5,[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],p=A[PR],q=A[Q],r=A[R],d=A[D],f=A[F];
  const tGagne=m(PR,17);
  document.body.classList.add('cartes-en-ligne');

  /* ---- La fête foraine, le soir ---- */
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(240,80),new THREE.MeshBasicMaterial({color:0x3b2f6b})); ciel.position.set(0,24,-30); scene3d.add(ciel);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xc9a66b})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  /* la grande roue au loin, et une guirlande */
  const roue=new THREE.Group(); roue.position.set(-6.5,7.2,-24); scene3d.add(roue);
  const metalR=new THREE.MeshBasicMaterial({color:0x8e7cc3});
  for(let k=0;k<8;k++){ const b=new THREE.Mesh(new THREE.PlaneGeometry(.14,9),metalR); b.rotation.z=k*Math.PI/8; roue.add(b); }
  const anneau=new THREE.Mesh(new THREE.RingGeometry(4.3,4.55,48),metalR); roue.add(anneau);
  const nacelles=[]; for(let k=0;k<8;k++){ const n=new THREE.Mesh(new THREE.CircleGeometry(.45,16),new THREE.MeshBasicMaterial({color:[0xff6b6b,0xffd43b,0x69db7c,0x4dabf7][k%4]})); roue.add(n); nacelles.push(n); }
  const lampions=[]; for(let k=0;k<22;k++){ const l=new THREE.Mesh(new THREE.SphereGeometry(.09,10,8),new THREE.MeshBasicMaterial({color:0xffe066})); l.position.set(-7+k*.68,5.6-Math.sin(k/21*Math.PI)*.5,-6); scene3d.add(l); lampions.push(l); }

  /* ---- Le stand ---- */
  const stand=new THREE.Group(); stand.position.set(.3,0,-1.7); scene3d.add(stand);
  const ROUGE=0xe03131, BLANC=0xfff5f5;
  for(let k=0;k<10;k++){ const b=new THREE.Mesh(new THREE.PlaneGeometry(.5,3.9),new THREE.MeshBasicMaterial({color:k%2?BLANC:ROUGE})); b.position.set(-2.25+k*.5,1.95,0); stand.add(b); }
  /* les montants */
  for(const px of [-2.55,2.55]) piece(stand,new RoundedBoxGeometry(.16,4.1,.16,2,.04),toon(0x8d5a2b),[px,2.05,.05],CONTOUR_FIN);
  /* l'auvent rayé et ses festons */
  piece(stand,new RoundedBoxGeometry(5.5,.36,.5,2,.06),toon(ROUGE),[0,4.12,.25],CONTOUR_FIN);
  for(let k=0;k<11;k++){ const fe=new THREE.Mesh(new THREE.CircleGeometry(.25,18,Math.PI,Math.PI),new THREE.MeshBasicMaterial({color:k%2?ROUGE:BLANC})); fe.position.set(-2.5+k*.5,3.94,.52); stand.add(fe); }
  const ampoules=[]; for(let k=0;k<11;k++){ const a=new THREE.Mesh(new THREE.SphereGeometry(.075,10,8),new THREE.MeshBasicMaterial({color:0xffd43b})); a.position.set(-2.5+k*.5,3.62,.55); stand.add(a); ampoules.push(a); }
  /* l'étagère des peluches */
  piece(stand,new RoundedBoxGeometry(3.2,.12,.5,2,.03),toon(0x8d5a2b),[.75,2.55,.3],CONTOUR_FIN);
  /* le comptoir */
  piece(stand,new RoundedBoxGeometry(3.2,1.05,.7,3,.08),toon(0x1971c2),[.75,.53,.9],CONTOUR_FIN);
  piece(stand,new RoundedBoxGeometry(3.24,.14,.74,2,.04),toon(0xffd43b),[.75,1.1,.9],CONTOUR_FIN);

  /* Une peluche d'ours : tête, oreilles, museau, corps, bras, nœud */
  function ours(coul,s=1){ const g=new THREE.Group(), mt=toon(coul), cl=toon(0xe9c995);
    piece(g,new THREE.SphereGeometry(.36,20,16).scale(1,1.08,.9),mt,[0,.36,0],CONTOUR_FIN);
    for(const sx of [-.27,.27]){ piece(g,new THREE.SphereGeometry(.13,14,10),mt,[sx*1.1,.12,.12],CONTOUR_FIN); piece(g,new THREE.SphereGeometry(.12,14,10).scale(1,1,.7),mt,[sx*.75,.6,.18],CONTOUR_FIN); }
    piece(g,new THREE.SphereGeometry(.3,20,16),mt,[0,.95,0],CONTOUR_FIN);
    for(const sx of [-.22,.22]){ piece(g,new THREE.SphereGeometry(.11,14,10),mt,[sx,1.2,0],CONTOUR_FIN); piece(g,new THREE.SphereGeometry(.06,10,8),cl,[sx,1.2,.06],null); }
    piece(g,new THREE.SphereGeometry(.12,14,10).scale(1.2,.9,.8),cl,[0,.88,.25],null);
    piece(g,new THREE.SphereGeometry(.045,10,8),C.noir,[0,.93,.34],null);
    for(const sx of [-.1,.1]) piece(g,new THREE.SphereGeometry(.04,10,8),C.noir,[sx,1.02,.26],null);
    for(const sx of [-.09,.09]) piece(g,new THREE.SphereGeometry(.07,10,8).scale(1.2,.8,.6),toon(0xe03131),[sx,.68,.28],null);
    g.scale.setScalar(s); return g; }
  const petits=[[-.45,0x74c0fc],[.1,0xffa8a8],[.6,0x8ce99a]].map(([px,c])=>{ const o=ours(c,.5); o.position.set(px,2.61,.35); stand.add(o); return o; });
  const gros=ours(0xb5651d,.95); scene3d.add(gros);
  const POS_ETAGERE=new THREE.Vector3(.3+1.4,2.61,-1.7+.35);

  /* Le tableau du jeu, sur le comptoir : l'expression et le verdict */
  piece(stand,new RoundedBoxGeometry(2.3,1.0,.08,2,.03),toon(0x0f2238),[.75,1.82,.95],CONTOUR_FIN);
  const tab=ecran3d(2.2,.92,[.75,1.82,1.0],stand);
  const BL='#e8f2ff',BA='#74c0fc',EX='#ff9f43',VE='#7ee787',RO='#ff7b72';
  /* une ligne de morceaux [texte, couleur, exposant ?] centrée */
  function ligneTab(g,w,y,morceaux,tp){ const mes=([t,,e])=>{ g.font=`800 ${e?tp*.62:tp}px "Segoe UI"`; return g.measureText(t).width+(e?4:0); };
    const tot=morceaux.reduce((s,k)=>s+mes(k),0); let px=(w-tot)/2; g.textBaseline='middle'; g.textAlign='left';
    for(const k of morceaux){ const [t,c,e]=k, l=mes(k); g.font=`800 ${e?tp*.62:tp}px "Segoe UI"`; g.fillStyle=c; g.fillText(t,px+(e?2:0),e?y-tp*.32:y);
      if(k[3]){ g.strokeStyle=RO; g.lineWidth=10; g.beginPath(); g.moveTo(px-6,y+tp*.1); g.lineTo(px+l+6,y-tp*.25); g.stroke(); } px+=l; } }
  const tok=(c,l)=>l.map(([i,t,co,e,barre])=>[m(c,i),t,co,e,barre]);
  const TA=tok(C0,[[5,'2 ',BL],[6,'+ ',BL],[7,'3',BA],[9,'2',EX,1]]);
  const TP=tok(PR,[[2,'2 ',BL],[3,'× ',BL],[4,'3',BA],[6,'2',EX,1]]);
  const TQ=tok(Q,[[3,'2 ',BL],[4,'× ',BL],[5,'5',BA],[7,'2',EX,1]]);
  const TD=tok(D,[[4,'10',BA],[6,'2',EX,1],[7,' − ',BL],[8,'2',BA],[10,'3',EX,1]]);
  function tableau(T){
    let haut, bas=[];
    if(T<x){ haut=TA; if(T>=m(C0,10)) bas=[['= 25 ?',EX]]; }
    else if(T<p){ haut=TA; bas=T<m(X,13)?[['= ',BL],['25',RO,0,1]]:[['= 11',VE]]; }
    else if(T<q){ haut=TP; if(T>=tGagne) bas=[['GAGNÉ !',VE]]; else if(T>=m(PR,16)) bas=[['= 18',VE]]; }
    else if(T<d){ haut=TQ; if(T>=m(R,2)) bas=[['= 50',VE]]; else if(T>=m(Q,7)) bas=[['= ?',EX]]; }
    else { haut=TD; if(T>=m(D,10)) bas=[['= ?',EX]]; }
    const vus=(haut||[]).filter(k=>T>=k[0]).map(k=>k.slice(1));
    const cle=JSON.stringify([vus,bas]);
    tab.ecrire(cle,(g,w,h)=>{ g.fillStyle='#0f2238'; g.fillRect(0,0,w,h); if(vus.length) ligneTab(g,w,h*.31,vus,104); if(bas.length) ligneTab(g,w,h*.74,bas,96); });
  }

  /* ---- Le panneau du bas : les maths, mot à mot ---- */
  const lignes=lignesPanneau(outils,3);
  const ACC=J(C0,[[5,'2 '],[6,'+ '],[7,ba('3')],[9,sup('2')+' '],[10,'= 25']]);
  const ACCB=[[x,'2 + '+puiss('3','2')+' = '],[x,pi('<span class="barre">25</span>')]];
  const O1=J(X,[[5,ba('3')],[7,sup('2')+' '],[8,'= '+ok('9')]]);
  const O2=J(X,[[10,'2 '],[11,'+ '],[12,'9 '],[13,'= '+ok('11')]]);
  const P0=J(PR,[[2,'2 '],[3,'× '],[4,ba('3')],[6,sup('2')]]);
  const P1=J(PR,[[8,ba('3')],[10,sup('2')+' '],[11,'= 9']]);
  const P2=J(PR,[[13,'2 '],[14,'× '],[15,'9 '],[16,'= '+ok('18')]]);
  const D0=J(D,[[4,ba('10')],[6,sup('2')+' '],[7,'− '],[8,ba('2')],[10,sup('3')+' = ?']]);
  const rangees=T=>{ if(T<x) return [ACC]; if(T<p) return [ACCB,T>=m(X,5)?O1:[],T>=m(X,10)?O2:[]];
    if(T<q) return [P0,T>=m(PR,8)?P1:[],T>=m(PR,13)?P2:[]]; return [D0]; };

  /* ---- Les écrits : exactement ce que dit la voix ---- */
  const finTitre=m(C0,5)-.05;
  const groupes=[
    {de:acc+.1,a:finTitre,top:352,fs:62,phrases:[ec(C0,'0:Salut ! 1:Moi, 2:c’est 3:Ti 4:Margo.')]},
    {de:finTitre,a:m(C0,11),top:60,fs:66,phrases:[ec(C0,'5:2 6:plus 7:3 8:au 9:carré : 10:25 !')]},
    {de:m(C0,11),a:x,top:60,fs:64,phrases:[ec(C0,'11:Tu 12:paries 13:que 14:j’ai 15:gagné'),ec(C0,'16:la 17:peluche ?')]},
    {de:x,a:m(X,5),top:60,fs:64,phrases:[ec(X,'0:Raté !'),ec(X,'1:Le 2:carré 3:passe 4:d’abord.')]},
    {de:m(X,5),a:p,top:60,fs:62,phrases:[ec(X,'5:3 6:au 7:carré : 8:9.'),ec(X,'9:Puis 10:2 11:plus 12:9 : 13:11.')]},
    {de:p,a:m(PR,7),top:60,fs:62,phrases:[ec(PR,'0:Deuxième 1:essai :'),ec(PR,'2:2 3:fois 4:3 5:au 6:carré.')]},
    {de:m(PR,7),a:tGagne,top:60,fs:62,phrases:[ec(PR,'7:D’abord 8:3 9:au 10:carré, 11:9.'),ec(PR,'12:Puis 13:2 14:fois 15:9 : 16:18.')]},
    {de:tGagne,a:q,top:60,fs:84,phrases:[ec(PR,'17:Gagné !')]},
    {de:d+.05,a:m(D,11),top:60,fs:62,phrases:[ec(D,'0:À 1:toi : 2:combien 3:font'),ec(D,'4:10 5:au 6:carré 7:moins 8:2 9:au 10:cube ?')]},
    {de:m(D,11),a:f,top:60,fs:62,phrases:[ec(D,'11:Réponds 12:en 13:commentaire !')]}
  ];

  /* Les bruitages : le buzzer du raté, le carillon du gagné, le compte à rebours */
  const tics=[{t:x+.05,f:180},{t:x+.25,f:150}];
  for(const [k,fq] of [[0,660],[1,880],[2,1046],[3,1318]]) tics.push({t:tGagne+k*.13,f:fq});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,12)+.3,'<div style="white-space:nowrap">2 + <span style="color:#1971c2">3</span><span style="font-size:.66em;vertical-align:.55em;line-height:0;color:#e8590c">2</span> = 25</div><div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  return { clips,FIN,tics,titre:'La peluche de la fête',ceinture:1,finTitre,groupes,finClip:F,
    cuts:[finTitre,x,p,q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Combien 2:vaut'),ec(Q,'3:2 4:fois 5:5 6:au 7:carré ?')],
      pause:[ec(Q,'14:Mets 15:pause,'),ec(Q,'16:et 17:choisis !')],
      choix:[['100',m(Q,8)-q,m(Q,9)-q],['50',m(Q,10)-q,m(Q,11)-q],['20',m(Q,12)-q,m(Q,13)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:50 !')],suite:[ec(R,'3:5 4:au 5:carré, 6:25.'),ec(R,'7:Puis 8:2 9:fois 10:25.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      scene.ry=0; scene.z=0; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.2;
      if(T<finTitre){ cam.d=10.6; cam.y=1.75; cam.x=-.3; }
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=-.9; cam.d=12; cam.y=3.9; }

      /* La grande roue tourne, les lampions scintillent */
      roue.rotation.z=-T*.12; nacelles.forEach((n,k)=>{ const a=k*Math.PI/4-T*.12; n.position.set(Math.cos(a)*4.4,Math.sin(a)*4.4,.02); });
      lampions.forEach((l,k)=>l.material.color.setHex(((k+Math.floor(T*3))%3)?0xffe066:0xffa94d));
      /* Les ampoules du stand : rouges qui clignotent au raté, vertes qui courent au gagné */
      const rate=T>=x&&T<m(X,5), gagne=T>=tGagne&&T<q;
      ampoules.forEach((a,k)=>{ let c=((k+Math.floor(T*4))%2)?0xffd43b:0xfff3bf;
        if(rate) c=Math.floor(T*6)%2?0xff4d4d:0x7a1f1f; if(gagne) c=((k+Math.floor(T*10))%3)?0x7ee787:0x2f9a3a; a.material.color.setHex(c); });
      tableau(T);

      /* La grosse peluche : sur l'étagère, puis dans les bras de Ti Margo */
      const ARR=new THREE.Vector3(scene.x+.12,1.05,.78);
      const u=lisse((T-tGagne)/.8);
      if(T<tGagne||window.MINI){ gros.position.copy(POS_ETAGERE); gros.rotation.set(0,-.25,0); }
      else { gros.position.lerpVectors(POS_ETAGERE,ARR,u); gros.position.y+=Math.sin(u*Math.PI)*1.1; gros.rotation.set(0,-.25+u*.25,Math.sin(u*Math.PI)*.5); }
      const tient=T>=tGagne+.6&&!window.MINI;

      /* Ti Margo */
      const jaw=PO.jaw;
      if(T<acc+2.5){ ACTIONS.salut.f(T-acc,PO); PO.jaw=jaw; }
      else if(T<finTitre) g.ouvre();
      else if(T<m(C0,11)) g.montre();
      else if(T<x) g.pouce();
      else if(T<m(X,1)+.3) g.oups();
      else if(T<m(X,5)) g.reflechit();
      else if(T<p) g.montre();
      else if(T<tGagne) T<m(PR,7)?g.ouvre():g.montre();
      else if(T<q){ if(tient){ PO.gesteD='ouverte'; PO.md.set(.5,1.62,.72); PO.mg.set(-.5,1.62,.72); PO.cd.set(.7,1.6,.3); PO.cg.set(-.7,1.6,.3); PO.tetZ=-.08; PO.paupiere=-1.1; PO.ty=.04+Math.abs(Math.sin(T*5))*.06; } else g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,11)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(tient&&T>=q){ /* il garde la peluche dans les bras jusqu'à la fin */
        PO.md.set(.5,1.62,.72); PO.mg.set(-.5,1.62,.72); PO.cd.set(.7,1.6,.3); PO.cg.set(-.7,1.6,.3); PO.gesteD='ouverte'; }
      if(window.MINI){ cam.y=2.75; cam.d=11.2; scene.x=-1.1; PO.jaw=.62; g.pouce(); }

      const voirP=(T>=m(C0,5)&&T<q)||(T>=m(D,4)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,rangees(T));
      legende.classList.toggle('piege',T>=x&&T<m(X,5));
    } };
};
