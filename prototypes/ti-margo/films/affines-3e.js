/* ============================================================
   SÉRIE FONCTIONS AFFINES 3e, ÉPISODE 09 (défi) : LE TOUR DU MAGICIEN.
   TEST du 23/11/2026 : le même défi que le short Manim (manim/scripts/3e/affine_defi_short.py),
   en dessin animé, pour comparer les vues.
   « Tu paries ? » Pense à un nombre, × 4, + 12, ÷ 4, − ton nombre : tu trouves 3.
   Ti Margo, magicien devant un rideau rouge, glisse une enveloppe scellée sur la table AVANT le calcul ;
   elle s'ouvre sur un « 3 ». La tirelire de Léa (25 €) et la chaussure de Tom (38) le vérifient ;
   un « x » sort du chapeau pour le pourquoi : (4x + 12) ÷ 4 = x + 3, moins x : il reste 3 (a = 0).
   Code couleur (celui de la série Manim) : x bleu, a orange, juste vert.
   Voix validée par Frédéric le 23/11 : manim/voix/3e-affine-defi-short-da.json
   ============================================================ */
FILMS.defi=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':9.41,'01-programme':10.53,'02-exemples':23.51,'03-pourquoi':15.705,'03q-question':16.925,'03r-reponse':8.785,'04-question':7.6,'05-abonne':6.045};
  const C0='00-accroche',PR='01-programme',EX='02-exemples',PQ='03-pourquoi',Q='03q-question',R='03r-reponse',D='04-question',F='05-abonne';
  /* 0,8 s après « Tu trouves 3 ! » : le temps d'ouvrir l'enveloppe */
  const {clips,A,CL,m,ec,J,FIN}=chrono('defi',DUR,{[PR]:.8,[Q]:3.3,[D]:1.5});
  const pr=A[PR],tEx=A[EX],pq=A[PQ],q=A[Q],r=A[R],d=A[D],f=A[F];

  /* ---- Le décor : un rideau de théâtre rouge, ses plis, un plancher ---- */
  poserPiece(0xa61e2a,0x8a5a32,0x5c0f17);
  for(let i=-12;i<=12;i++){ const pli=new THREE.Mesh(new THREE.PlaneGeometry(.22,40),new THREE.MeshBasicMaterial({color:i%2?0x8c1622:0xbd2c38})); pli.position.set(i*.46,20,-2.36); scene3d.add(pli); }
  const lambrequin=new THREE.Mesh(new THREE.PlaneGeometry(40,.5),new THREE.MeshBasicMaterial({color:0xe0b03a})); lambrequin.position.set(0,5.9,-2.3); scene3d.add(lambrequin);

  /* ---- Deux guéridons : à gauche le chapeau (puis la tirelire, la chaussure), à droite l'enveloppe ---- */
  const XG=-1.62, XD=1.66, HT=1.18, HD=1.78, ZT=-.35;  /* le guéridon de droite plus haut : l'enveloppe passe au-dessus de la queue */
  function gueridon(x,nappe,HT){ const g=new THREE.Group(); g.position.set(x,0,ZT); scene3d.add(g);
    piece(g,new THREE.CylinderGeometry(.08,.12,HT,12),toon(0x5a3a1e),[0,HT/2,0],CONTOUR_FIN);
    piece(g,new THREE.CylinderGeometry(.3,.34,.06,20),toon(0x5a3a1e),[0,.03,0],CONTOUR_FIN);
    piece(g,new THREE.CylinderGeometry(.66,.6,.22,28),toon(nappe),[0,HT-.08,0],CONTOUR_FIN); return g; }
  const tables=[gueridon(XG,0x6741d9,HT),gueridon(XD,0x6741d9,HD)];

  /* Le chapeau haut-de-forme, son ruban rouge */
  const chapeau=new THREE.Group(); scene3d.add(chapeau);
  piece(chapeau,new THREE.CylinderGeometry(.62,.62,.06,28),toon(0x1f2937),[0,.03,0],CONTOUR_FIN);
  piece(chapeau,new THREE.CylinderGeometry(.38,.4,.78,26),toon(0x1f2937),[0,.45,0],CONTOUR_FIN);
  piece(chapeau,new THREE.CylinderGeometry(.405,.41,.13,26),toon(0xdc2626),[0,.15,0],CONTOUR_FIN);
  /* Les étincelles qui jaillissent du chapeau à chaque étape du programme */
  const etincelles=Array.from({length:8},(_,i)=>piece(scene3d,new THREE.OctahedronGeometry(.09),toon(i%2?0xffd43b:0xffffff),[0,0,0],CONTOUR_FIN));
  /* La carte « x » qui sort du chapeau (le pourquoi), puis « ? » (la question en commentaire) */
  const carteX=ecran3d(.62,.62,[0,0,0],scene3d);
  function ecrireCarte(e,s,coul){ e.ecrire(s+coul,(g,w,h)=>{ g.fillStyle='#fff'; g.strokeStyle='#17452a'; g.lineWidth=10; g.beginPath(); g.roundRect(6,6,w-12,h-12,30); g.fill(); g.stroke();
    g.fillStyle=coul; g.font=`900 ${s.length>1?100:120}px "Segoe UI"`; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+6); }); }

  /* La tirelire cochon de Léa */
  const cochon=new THREE.Group(); scene3d.add(cochon);
  const rose=toon(0xf783ac), roseF=toon(0xe64980);
  const corps=piece(cochon,new THREE.SphereGeometry(.4,24,18),rose,[0,.42,0],CONTOUR_FIN); corps.scale.set(1.2,.95,.95);
  piece(cochon,new THREE.CylinderGeometry(.14,.15,.12,18),roseF,[.5,.44,0],CONTOUR_FIN).rotation.z=Math.PI/2;
  for(const z of [-.18,.18]){ piece(cochon,new THREE.ConeGeometry(.1,.18,10),roseF,[.28,.8,z],CONTOUR_FIN); piece(cochon,new THREE.SphereGeometry(.04,10,8),toon(0x212529),[.42,.55,z*.7],CONTOUR_FIN); }
  for(const [x,z] of [[-.25,-.2],[-.25,.2],[.25,-.2],[.25,.2]]) piece(cochon,new THREE.CylinderGeometry(.07,.07,.16,10),roseF,[x,.08,z],CONTOUR_FIN);
  piece(cochon,new RoundedBoxGeometry(.24,.03,.05,1,.01),toon(0x495057),[-.02,.8,0],CONTOUR_FIN);
  /* La chaussure de Tom */
  const basket=new THREE.Group(); scene3d.add(basket);
  piece(basket,new RoundedBoxGeometry(1.0,.12,.4,2,.05),toon(0xf8f9fa),[0,.06,0],CONTOUR_FIN);
  piece(basket,new RoundedBoxGeometry(.98,.26,.38,3,.12),toon(0x1c7ed6),[0,.24,0],CONTOUR_FIN);
  piece(basket,new RoundedBoxGeometry(.42,.42,.38,3,.14),toon(0x1c7ed6),[-.26,.4,0],CONTOUR_FIN);
  for(let i=0;i<3;i++) piece(basket,new RoundedBoxGeometry(.04,.03,.3,1,.01),toon(0xffffff),[.02+i*.12,.4-i*.03,0],CONTOUR_FIN);
  /* L'étiquette au-dessus de l'objet : « 25 € », puis « 38 » */
  const etiq=ecran3d(1,.46,[0,0,0],scene3d);
  function ecrireEtiq(s){ etiq.ecrire(s,(g,w,h)=>{ g.fillStyle='#fff'; g.strokeStyle='#17452a'; g.lineWidth=7; g.beginPath(); g.roundRect(4,4,w-8,h-8,26); g.fill(); g.stroke(); g.fillStyle='#1971c2'; g.font='900 70px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+4); }); }

  /* L'enveloppe scellée, et la carte de la prédiction qui en sort */
  const env=new THREE.Group(); scene3d.add(env);
  piece(env,new RoundedBoxGeometry(1.0,.66,.05,2,.02),toon(0xfff3bf),[0,.33,0],CONTOUR_FIN);
  const rabat=new THREE.Group(); rabat.position.set(0,.66,.03); env.add(rabat);
  { const forme=new THREE.Shape(); forme.moveTo(-.5,0); forme.lineTo(.5,0); forme.lineTo(0,-.4); forme.lineTo(-.5,0);
    piece(rabat,new THREE.ShapeGeometry(forme),toon(0xffe066),[0,0,0],CONTOUR_FIN); }
  /* Le rabat ouvert : le même triangle, pointe en haut, derrière la carte */
  const rabatO=new THREE.Group(); rabatO.position.set(0,.66,-.03); env.add(rabatO);
  { const forme=new THREE.Shape(); forme.moveTo(-.5,0); forme.lineTo(.5,0); forme.lineTo(0,.4); forme.lineTo(-.5,0);
    piece(rabatO,new THREE.ShapeGeometry(forme),toon(0xffe066),[0,0,0],CONTOUR_FIN); }
  const sceau=piece(env,new THREE.CylinderGeometry(.09,.09,.03,16),toon(0xc92a2a),[0,.27,.06],CONTOUR_FIN); sceau.rotation.x=Math.PI/2;
  const prediction=ecran3d(.7,.86,[0,0,0],env);
  function ecrirePrediction(s,coul){ prediction.ecrire(s+coul,(g,w,h)=>{ g.fillStyle='#fff'; g.strokeStyle=coul; g.lineWidth=12; g.beginPath(); g.roundRect(7,7,w-14,h-14,26); g.fill(); g.stroke();
    g.fillStyle=coul; g.font='900 170px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+10); }); }
  /* La lueur derrière la carte : elle pulse quand la prédiction tombe juste */
  const lueur=new THREE.Mesh(new THREE.CircleGeometry(.75,32),new THREE.MeshBasicMaterial({color:0xfff3a3,transparent:true,opacity:0})); env.add(lueur);

  /* ---- Les instants clés ---- */
  const tEnv=m(C0,16);                           /* « deviner » : l'enveloppe arrive sur la table */
  const etapes=[m(PR,2),m(PR,4),m(PR,7),m(PR,10)];/* les quatre étapes : des étincelles */
  const tOuvre=m(PR,15);                          /* « 3 » : l'enveloppe s'ouvre */
  const tLea=m(EX,0), tTom=m(EX,22), tX=m(PQ,4);
  const juste=[m(EX,21),m(EX,34),m(PQ,20)];       /* chaque « 3 » trouvé : la carte pulse */

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,4);
  const A1=J(C0,[[6,'ton '],[7,'âge,']]), A2=J(C0,[[8,'ta '],[9,'pointure,']]), A3=J(C0,[[10,'l’argent '],[11,'de '],[12,'ta '],[13,'tirelire.']]);
  const P1=J(PR,[[0,'×'],[2,ex(' 4')],[3,'   + '],[4,ex('12')]]);
  const P2=J(PR,[[5,'÷'],[7,ex(' 4')],[8,'   − '],[9,ba('ton ')],[10,ba('nombre')]]);
  const P3=J(PR,[[13,'Tu '],[14,'trouves '],[15,ok('3 !')]]);
  const L1=J(EX,[[7,ba('25')],[8,' × '],[9,'4'],[10,' = 100']]), L2=J(EX,[[11,'100 + '],[12,'12'],[13,' = 112']]);
  const L3=J(EX,[[15,'112 ÷ '],[17,'4'],[18,' = 28']]), L4=J(EX,[[19,'28 − '],[20,ba('25')],[21,' = '+ok('3')]]);
  const T1=J(EX,[[25,ba('38')],[26,' × 4 = 152']]), T2=J(EX,[[28,'152 + 12 = 164']]);
  const T3=J(EX,[[30,'164 ÷ 4 = 41']]), T4=J(EX,[[31,'41 − '],[32,ba('38')],[34,' = '+ok('3')]]);
  const W1=J(PQ,[[5,'('+ba('4x')],[7,' + '],[8,'12'],[9,') ÷ '],[11,'4']]), W2=J(PQ,[[12,'= '],[13,ba('x')],[14,' + '],[15,'3']]);
  const W3=J(PQ,[[16,ba('x')+' + 3 − '],[17,ba('x')],[18,' = '],[20,ok('3')]]);
  const W4=J(PQ,[[26,ex('a')],[27,ex(' = ')],[28,ex('0')]]);
  const S1=J(D,[[2,'Invente '],[3,'un '],[4,'programme']]), S2=J(D,[[5,'de '],[6,'calcul '],[7,'qui '],[8,'donne']]), S3=J(D,[[9,'toujours '],[10,ok('7')]]);

  /* ---- Les écrits du haut ---- */
  const groupes=[
    {de:A[C0]+.05,a:m(C0,14),top:352,fs:62,phrases:[ec(C0,'2:Pense 3:à 4:un 5:nombre :')]},
    {de:m(C0,14),a:pr,top:352,fs:62,phrases:[ec(C0,'14:Je 15:vais 16:deviner 17:ton 18:résultat.')]},
    {de:pr,a:tEx,top:60,fs:62,phrases:[ec(PR,'0:Multiplie-le, 3:ajoute, 5:divise, 8:enlève…')]},
    {de:tLea,a:tTom,top:60,fs:62,phrases:[ec(EX,'0:Léa 1:a 2:25 3:€ 4:dans 5:sa 6:tirelire.')]},
    {de:tTom,a:m(EX,33),top:60,fs:62,phrases:[ec(EX,'22:Tom 23:chausse 24:du 25:38.')]},
    {de:m(EX,33),a:pq,top:60,fs:70,phrases:[ec(EX,'33:Encore 34:3 !')]},
    {de:pq,a:m(PQ,21),top:60,fs:62,phrases:[ec(PQ,'0:Pourquoi ? 1:Appelle 2:ton 3:nombre 4:x.')]},
    {de:m(PQ,21),a:q,top:60,fs:58,phrases:[ec(PQ,'21:C’est 22:une 23:fonction 24:affine 25:avec 26:a 27:= 28:0 :'),ec(PQ,'29:une 30:fonction 31:constante.')]},
    {de:d,a:m(D,11),top:60,fs:66,phrases:[ec(D,'0:À 1:toi !')]},
    {de:m(D,11),a:f,top:60,fs:62,phrases:[ec(D,'11:Réponds 12:en 13:commentaire !')]}
  ];
  const tics=[{t:tEnv,f:520},...etapes.map((t,i)=>({t,f:700+i*90})),{t:tOuvre,f:980},{t:tOuvre+.1,f:1320},
    {t:m(EX,21),f:980},{t:m(EX,34),f:980},{t:tX,f:760},{t:m(PQ,20),f:980}];
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,tOuvre+.9,'<div style="font-size:86px">Pense à un nombre :</div><div style="color:#e8590c;font-size:120px;margin-top:8px">JE LE DEVINE !</div>');

  return { clips,FIN,tics,titre:'Tu paries ?',ceinture:4,finTitre:pr,groupes,finClip:F,
    cuts:[pr,q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:0,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Programme : 2:× 4:2, 5:+ 6:10, 7:÷ 9:2,'),ec(Q,'10:− 11:ton 12:nombre. 13:Que 14:trouves-tu 15:toujours ?')],
      pause:[ec(Q,'23:Mets 24:pause, 25:et 26:choisis !')],
      choix:[['5',m(Q,16)-q,m(Q,17)-q],['10',m(Q,18)-q,m(Q,19)-q],['ton nombre',m(Q,20)-q,m(Q,21)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'A :']],reponse:[ec(R,'2:(2x 4:+ 5:10) 6:÷ 8:2 9:= 10:x 11:+ 12:5')],
      suite:[ec(R,'13:Moins 14:x : 15:il 16:reste 17:5.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f, MINI=window.MINI;
      scene.ry=0; scene.z=.25; scene.x=0; tables.forEach(t=>t.visible=!dansF);
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      /* ---- Le guéridon de gauche : chapeau, tirelire, chaussure, chapeau ---- */
      const yT=HT+.03, voirCh=!dansF&&!(T>=tLea&&T<pq), voirCo=T>=tLea&&T<tTom, voirBa=T>=tTom&&T<pq;
      const surgit=t0=>.2+.8*lisse((T-t0)/.25);
      chapeau.visible=voirCh; chapeau.position.set(XG,yT,ZT); chapeau.scale.setScalar(T>=pq&&T<pq+.3?surgit(pq):1);
      chapeau.rotation.z=0; for(const t of etapes) if(T>=t&&T<t+.35) chapeau.rotation.z=Math.sin((T-t)*28)*.08;
      cochon.visible=voirCo; cochon.position.set(XG,yT,ZT); cochon.rotation.y=-.5+Math.sin(T*1.4)*.08; cochon.scale.setScalar(surgit(tLea));
      basket.visible=voirBa; basket.position.set(XG,yT,ZT); basket.rotation.y=-.45; basket.scale.setScalar(surgit(tTom));
      const voirEt=voirCo||voirBa; etiq.mesh.visible=voirEt&&!dansQ;
      if(voirEt){ ecrireEtiq(voirCo?'25 €':'38'); const t0=voirCo?m(EX,2):m(EX,25); etiq.mesh.visible=T>=t0; etiq.mesh.position.set(XG,yT+1.2+Math.sin(T*3)*.03,ZT+.3); etiq.mesh.scale.setScalar(lisse((T-t0)/.25)); }
      /* Les étincelles : une gerbe par étape */
      etincelles.forEach((e,i)=>{ let on=false; for(const t of etapes){ const u=(T-t)/.7; if(u>=0&&u<1){ on=true; const a=i/8*Math.PI*2;
        e.position.set(XG+Math.cos(a)*u*.75,yT+.9+u*.9-u*u*.5+Math.sin(a)*u*.3,ZT+.4); e.rotation.set(u*6,u*4,0); e.scale.setScalar(1-u*.6); } } e.visible=on&&!dansF; });
      /* La carte qui sort du chapeau : « x » (bleu), puis « ? » (orange) pour la question en commentaire */
      const voirX=(T>=tX&&T<q)||(T>=m(D,2)&&T<f);
      carteX.mesh.visible=voirX&&voirCh;
      if(carteX.mesh.visible){ const t0=T>=d?m(D,2):tX, u=lisse((T-t0)/.45);
        if(T>=d) ecrireCarte(carteX,'?','#e8590c'); else ecrireCarte(carteX,'x','#1971c2');
        carteX.mesh.position.set(XG,yT+.5+u*.95+Math.sin(T*3)*.03,ZT+.05); carteX.mesh.scale.setScalar(.3+.7*u); }

      /* ---- L'enveloppe : elle arrive, s'ouvre sur « 3 », puis montre « 7 » pour le défi ---- */
      const voirEnv=T>=tEnv&&!dansF; env.visible=voirEnv;
      if(voirEnv){ const arr=lisse((T-tEnv)/.4); env.position.set(XD,HD+.05+(1-arr)*1.4,ZT+.05); env.rotation.set(0,-.25,(1-arr)*.6);
        const ou=lisse((T-tOuvre)/.35); rabat.visible=ou<.5; rabat.scale.y=Math.max(.01,1-2*ou); rabatO.visible=ou>=.5; rabatO.scale.y=Math.max(.01,2*ou-1); sceau.visible=ou<.5;
        const sort=lisse((T-tOuvre-.25)/.45); prediction.mesh.visible=T>=tOuvre+.25;
        if(T>=d){ ecrirePrediction('7','#e8590c'); } else ecrirePrediction('3','#2f9a3a');
        prediction.mesh.position.set(0,.33+sort*.72,-.02);
        /* La carte pulse à chaque « 3 » juste */
        let z=1, l=0; for(const t of [tOuvre+.3,...juste]){ const u=(T-t)/.7; if(u>=0&&u<1){ z=1+.22*Math.sin(u*Math.PI); l=Math.sin(u*Math.PI); } }
        prediction.mesh.scale.setScalar(z*(T>=tOuvre+.25?.4+.6*sort:1));
        lueur.material.opacity=.85*l; lueur.position.set(0,1.05,-.05); lueur.scale.setScalar(.8+.4*l); }

      /* ---- Ti Margo ---- */
      if(T<m(C0,2)){ g.ouvre(); }
      else if(T<m(C0,14)){ g.montre(); PO.regY=.1; }
      else if(T<pr){ g.reflechit(); if(T>=tEnv){ PO.regX=.35; PO.tetX=.2; } }
      else if(T<tOuvre){ g.montre(); PO.regX=-.3; PO.tetX=-.2; PO.regY=.3; }
      else if(T<tEx){ /* ta-da ! */ g.oups(); PO.regX=.3; PO.tetX=.2; PO.sautY=Math.abs(Math.sin((T-tOuvre)*6))*.12; }
      else if(T<m(EX,21)){ g.montre(); PO.regX=-.3; PO.tetX=-.2; }
      else if(T<tTom){ g.pouce(); }
      else if(T<m(EX,34)){ g.montre(); PO.regX=-.3; PO.tetX=-.2; }
      else if(T<pq){ g.oups(); PO.sautY=Math.abs(Math.sin((T-m(EX,34))*6))*.12; }
      else if(T<tX){ g.reflechit(); }
      else if(T<m(PQ,20)){ g.montre(); PO.regX=-.3; PO.tetX=-.2; }
      else if(T<m(PQ,21)){ g.pouce(); }
      else if(T<q){ g.ouvre(); }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<m(D,11)){ g.reflechit(); }
      else if(T<f){ g.montre(); PO.regY=.2; }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(MINI){ cam.y=2.6; g.montre(); PO.jaw=.62; PO.regY=.4; PO.regX=.3; }

      /* ---- Le panneau : jamais vide ---- */
      const voirP=(T>=m(C0,6)&&T<q)||(T>=m(D,2)&&T<f);
      let ls=[];
      if(voirP){
        if(T<pr) ls=[A1,T>=m(C0,8)?A2:[],T>=m(C0,10)?A3:[]];
        else if(T<tEx) ls=[P1,T>=m(PR,5)?P2:[],T>=m(PR,13)?P3:[]];
        else if(T<tTom) ls=[T>=m(EX,7)?L1:[],T>=m(EX,11)?L2:[],T>=m(EX,15)?L3:[],T>=m(EX,19)?L4:[]];
        else if(T<pq) ls=[T>=m(EX,25)?T1:[],T>=m(EX,28)?T2:[],T>=m(EX,30)?T3:[],T>=m(EX,31)?T4:[]];
        else if(T<q) ls=[T>=m(PQ,5)?W1:[],T>=m(PQ,12)?W2:[],T>=m(PQ,16)?W3:[],T>=m(PQ,26)?W4:[]];
        else ls=[S1,T>=m(D,5)?S2:[],T>=m(D,9)?S3:[]];
      }
      /* Le panneau ne s'affiche que s'il a déjà un mot écrit : jamais de cadre vide */
      const plein=ls.some(l=>l.length&&l[0][0]<=T);
      panneau.style.display=plein?'block':'none';
      if(plein) lignes(T,ls);
      legende.classList.remove('piege');
    } };
};
