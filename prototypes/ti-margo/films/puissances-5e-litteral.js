/* ============================================================
   Série Carré et cube 5e, épisode 05 : LA MACHINE À CARRÉS (voix 5e-puissance-litteral-short).
   Dans son atelier d'inventeur, Ti Margo a une machine : on met x, elle sort x² + 1.
   Le pari : avec 3, elle sort 7 ? Non : 3² = 9, 9 + 1 = 10. Puis 4 → 17, la question 5 → 26,
   le défi en commentaire : 2 × x² pour x = 10.
   Code couleur : bleu le nombre (la base), orange l'exposant, vert le résultat, rouge le piège.
   Outils communs (gestes, chrono, lignesPanneau, ba/ex/sup/ok/pi, poserMiniature, poserPiece, ecran3d) :
   films/puissances-commun.js.
   ============================================================ */
FILMS.litteral=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':12.09,'01-calcul':7.515,'02-autre':6.605,'02q-question':13.79,'02r-reponse':6.745,'03-question':7.025,'04-abonne':6.045};
  const C0='00-accroche',K='01-calcul',U='02-autre',Q='02q-question',R='02r-reponse',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('litteral',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],k=A[K],u=A[U],q=A[Q],r=A[R],d=A[D],f=A[F];
  document.body.classList.add('cartes-en-ligne');

  /* ---- L'atelier de l'inventeur : mur menthe, tuyaux de cuivre, roues dentées, plan bleu ---- */
  poserPiece(0xd3eee2,0x8e9aa6,0x55626e);
  const cuivre=toon(0xd08a4a);
  const tuyau=piece(scene3d,new THREE.CylinderGeometry(.11,.11,40,14),cuivre,[0,5.9,-2.25],null); tuyau.rotation.z=Math.PI/2;
  piece(scene3d,new THREE.CylinderGeometry(.11,.11,6,14),cuivre,[-2.65,2.95,-2.25],null);
  piece(scene3d,new THREE.CylinderGeometry(.11,.11,6,14),cuivre,[3.05,2.95,-2.25],null);
  for(const [x,y] of [[-2.65,5.9],[3.05,5.9]]) piece(scene3d,new THREE.SphereGeometry(.17,14,12),cuivre,[x,y,-2.25],null);
  /* Une roue dentée plate (n dents, rayon R) */
  function roue(R,n,coul,trou=true){ const s=new THREE.Shape(), N=n*4;
    for(let i=0;i<=N;i++){ const a=i/N*Math.PI*2, rr=(i%4<2)?R:R*.8; i?s.lineTo(Math.cos(a)*rr,Math.sin(a)*rr):s.moveTo(Math.cos(a)*rr,Math.sin(a)*rr); }
    if(trou){ const h=new THREE.Path(); h.absarc(0,0,R*.28,0,Math.PI*2,true); s.holes.push(h); }
    return new THREE.Mesh(new THREE.ShapeGeometry(s,24),new THREE.MeshBasicMaterial({color:coul})); }
  const rouesMur=[[-1.9,4.55,.95,10],[-.55,5.05,.6,8],[2.35,4.4,.8,9]].map(([x,y,R,n])=>{ const w=roue(R,n,0xb3dccb); w.position.set(x,y,-2.36); scene3d.add(w); return w; });
  /* Le plan bleu de la machine, punaisé au mur */
  const plan=ecran3d(1.3,.95,[.95,4.75,-2.3],scene3d,200);
  plan.ecrire('plan',(g,w,h)=>{ g.fillStyle='#1c5d99'; g.fillRect(0,0,w,h); g.strokeStyle='rgba(255,255,255,.25)'; g.lineWidth=2;
    for(let x=0;x<w;x+=26){ g.beginPath(); g.moveTo(x,0); g.lineTo(x,h); g.stroke(); } for(let y=0;y<h;y+=26){ g.beginPath(); g.moveTo(0,y); g.lineTo(w,y); g.stroke(); }
    g.strokeStyle='#fff'; g.lineWidth=5; g.strokeRect(w*.3,h*.3,w*.4,h*.5); g.beginPath(); g.moveTo(w*.38,h*.3); g.lineTo(w*.42,h*.12); g.lineTo(w*.58,h*.12); g.lineTo(w*.62,h*.3); g.stroke();
    g.beginPath(); g.arc(w*.5,h*.62,h*.1,0,7); g.stroke(); g.fillStyle='#e03131'; g.beginPath(); g.arc(w*.5,h*.06,9,0,7); g.fill(); });

  /* ---- La machine à carrés ---- */
  const MX=.95;
  const mach=new THREE.Group(); mach.position.set(MX,0,0); scene3d.add(mach);
  const corps=new THREE.Group(); mach.add(corps);
  piece(mach,new RoundedBoxGeometry(2.05,.26,1.3,3,.06),toon(0x343a40),[0,.13,0],CONTOUR_FIN);
  piece(corps,new RoundedBoxGeometry(1.8,2.0,1.1,3,.12),toon(0x7048e8),[0,1.26,0],CONTOUR_FIN);
  piece(corps,new RoundedBoxGeometry(1.86,.12,1.16,2,.04),toon(0xfcc419),[0,2.24,0],CONTOUR_FIN);
  /* L'entonnoir, en haut */
  const ent=piece(corps,new THREE.CylinderGeometry(.5,.2,.55,26,1,true),toon(0xadb5bd,{side:THREE.DoubleSide}),[-.25,2.57,0],CONTOUR_FIN);
  piece(corps,new THREE.TorusGeometry(.5,.04,8,26),toon(0x868e96),[-.25,2.845,0],null).rotation.x=Math.PI/2;
  /* Le voyant */
  const matVoyant=toon(0x868e96); piece(corps,new THREE.SphereGeometry(.15,18,14),matVoyant,[.6,2.42,0],CONTOUR_FIN);
  /* L'écran du programme : deux lignes */
  piece(corps,new RoundedBoxGeometry(1.5,.82,.05,2,.03),toon(0x10212f),[0,1.66,.56],null);
  const ecr=ecran3d(1.42,.74,[0,1.66,.59],corps);
  /* La bouche de sortie et son plateau, devant */
  piece(corps,new RoundedBoxGeometry(.72,.44,.06,2,.03),toon(0x212529),[0,.58,.56],null);
  piece(mach,new RoundedBoxGeometry(.95,.08,.62,2,.03),toon(0xced4da),[0,.36,.88],CONTOUR_FIN);
  /* Deux roues dentées qui tournent quand la machine calcule */
  const roues=[[-.6,.72,.2,8,0xfcc419],[.6,.78,.17,7,0x63e6be]].map(([x,y,R,n,c])=>{ const w=roue(R,n,c,false); w.position.set(x,y,.565); corps.add(w);
    const axe=new THREE.Mesh(new THREE.CircleGeometry(R*.25,16),new THREE.MeshBasicMaterial({color:0x343a40})); axe.position.set(x,y,.57); corps.add(axe); return w; });

  /* Les jetons : un cube blanc, le nombre écrit sur sa face */
  function jeton(){ const g=new THREE.Group(); piece(g,new RoundedBoxGeometry(.56,.56,.56,3,.08),toon(0xffffff),[0,0,0],CONTOUR_FIN);
    const e=ecran3d(.5,.5,[0,0,.285],g,240); scene3d.add(g); g.visible=false; return {g,e}; }
  const tokIn=jeton(), tokOut=jeton();
  const BL='#1971c2',VE='#2f9a3a',OR='#e8590c',BLC='#e8f2ff';
  function ecrireJeton(t,s,coul){ t.e.ecrire(s+coul,(g,w,h)=>{ g.fillStyle=coul; g.font=`900 ${Math.round(h*(s.length>2?.5:(s.length>1?.7:.86)))}px "Segoe UI"`; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+h*.05); }); }  /* police à la taille de la toile : 150-180 px dans 120 px rognaient le haut */

  /* Les passages dans la machine : [nombre, instant du nombre, début du calcul, fin, sortie, instant de la sortie] */
  const PASSAGES=[
    {n:'x',t:m(C0,10),de:m(C0,11),a:m(C0,17),s:null,ts:1e9},
    {n:'3',t:m(K,2),de:m(K,4),a:m(K,12),s:'10',ts:m(K,12)},
    {n:'4',t:m(U,2),de:m(U,3),a:m(U,9),s:'17',ts:m(U,9)},
    {n:'5',t:m(Q,3),de:m(Q,4),a:m(Q,7),s:'?',ts:m(Q,7)},
    {n:'10',t:m(D,5),de:m(D,6),a:m(D,12)+.6,s:'?',ts:m(D,12)+.6}
  ];
  const passage=T=>{ let p=null; for(const x of PASSAGES) if(T>=x.t) p=x; return p; };
  const sortieR=m(R,2);

  /* L'écran : la ligne du programme, puis la valeur de x */
  function morceaux(g,w,y,liste,tp){ g.font=`800 ${tp}px "Segoe UI"`; g.textBaseline='middle'; g.textAlign='left';
    const L=liste.map(([t,,sup])=>{ g.font=`800 ${sup?tp*.62:tp}px "Segoe UI"`; return g.measureText(t).width; }); let px=(w-L.reduce((a,b)=>a+b,0))/2;
    liste.forEach(([t,c,sup],i)=>{ g.font=`800 ${sup?tp*.62:tp}px "Segoe UI"`; g.fillStyle=c; g.fillText(t,px,sup?y-tp*.34:y); px+=L[i]; }); }
  function afficheur(T){
    let a=[],b=[];
    if(T<d){ if(T>=m(C0,13)) a.push(['x',BL]); if(T>=m(C0,15)) a.push(['2',OR,1]); if(T>=m(C0,16)) a.push([' + ',BLC]); if(T>=m(C0,17)) a.push(['1',BLC]); }
    else { if(T>=m(D,8)) a.push(['2 × ',BLC]); if(T>=m(D,10)) a.push(['x',BL]); if(T>=m(D,12)) a.push(['2',OR,1]); }
    const p=passage(T); if(p&&p.n!=='x'&&T>=p.t&&!(T>=d&&p.n!=='10')) b=[['x = ',BLC],[p.n,BL]];
    const cle=JSON.stringify([a,b]);
    ecr.ecrire(cle,(g,w,h)=>{ if(a.length) morceaux(g,w,h*.32,a,96); if(b.length) morceaux(g,w,h*.75,b,78); });
  }

  /* ---- Le panneau du bas : le calcul écrit en même temps ---- */
  const lignes=lignesPanneau(outils,2);
  const ACC1=J(C0,[[13,ba('x')],[15,sup('2')+' '],[16,'+ '],[17,'1']]), ACC2=J(C0,[[19,'avec '+ba('3')+' : '],[24,ex('7')+' ?']]);
  const K1=J(K,[[5,ba('3')],[7,sup('2')+' '],[8,'= 9']]), K2=J(K,[[10,'9 + '],[11,'1 '],[12,'= '+ok('10')]]);
  const U1=J(U,[[3,ba('4')],[5,sup('2')+' '],[6,'= 16']]), U2=J(U,[[7,'16 + '],[8,'1 '],[9,'= '+ok('17')]]);
  const D1=J(D,[[3,ba('x')+' '],[4,'= '],[5,ba('10')]]), D2=J(D,[[8,'2 × '],[10,ba('x')],[12,sup('2')]]);
  const rangees=T=>{ if(T<k) return [ACC1,T>=m(C0,19)?ACC2:[]]; if(T<u) return [K1,K2]; if(T<q) return [U1,U2]; return [D1,D2]; };

  /* ---- Les écrits : exactement ce que dit la voix ---- */
  const finTitre=m(C0,5)-.08;
  const groupes=[
    {de:acc+.1,a:finTitre,top:352,fs:62,phrases:[ec(C0,'0:Salut ! 1:Moi, 2:c’est 3:Ti 4:Margo.')]},
    {de:m(C0,5),a:m(C0,18),top:60,fs:58,phrases:[ec(C0,'5:Voici 6:ma 7:machine :'),ec(C0,'8:tu 9:mets 10:x, 11:elle 12:sort'),ec(C0,'13:x 14:au 15:carré 16:plus 17:1.')]},
    {de:m(C0,18),a:k,top:60,fs:62,phrases:[ec(C0,'18:Avec 19:3, 20:tu 21:paries'),ec(C0,'22:qu’elle 23:sort 24:7 ?')]},
    {de:k,a:m(K,13),top:60,fs:58,phrases:[ec(K,'0:Je 1:mets 2:3.'),ec(K,'3:Elle 4:calcule 5:3 6:au 7:carré : 8:9.'),ec(K,'9:Puis 10:plus 11:1 : 12:10.')]},
    {de:m(K,13),a:u,top:60,fs:80,phrases:[ec(K,'13:Pas 14:7 !')]},
    {de:u,a:q,top:60,fs:58,phrases:[ec(U,'0:Je 1:mets 2:4.'),ec(U,'3:4 4:au 5:carré, 6:16.'),ec(U,'7:Plus 8:1 : 9:17.')]},
    {de:d+.05,a:m(D,13),top:60,fs:58,phrases:[ec(D,'0:À 1:toi : 2:si 3:x 4:vaut 5:10,'),ec(D,'6:combien 7:vaut 8:2 9:fois 10:x'),ec(D,'11:au 12:carré ?')]},
    {de:m(D,13),a:f,top:60,fs:62,phrases:[ec(D,'13:Réponds 14:en 15:commentaire !')]}
  ];
  /* Bruitages : le jeton qui tombe, le jeton qui sort, le compte à rebours */
  const tics=[]; for(const p of PASSAGES){ tics.push({t:p.t+.5,f:300}); if(p.s!==null&&p.s!=='?') tics.push({t:p.ts,f:880}); }
  tics.push({t:sortieR,f:880}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,24)+.4,`${ba('x')}${sup('2')}&thinsp;+ 1 avec ${ba('3')} :<br>elle sort ${ex('7')} ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>`);

  return { clips,FIN,tics,titre:'La machine à carrés',ceinture:1,finTitre,groupes,finClip:F,
    cuts:[finTitre,q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Je 2:mets 3:5.'),ec(Q,'4:Que 5:sort 6:la 7:machine ?')],
      pause:[ec(Q,'14:Mets 15:pause,'),ec(Q,'16:et 17:choisis !')],
      choix:[['11',m(Q,8)-q,m(Q,9)-q],['26',m(Q,10)-q,m(Q,11)-q],['36',m(Q,12)-q,m(Q,13)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:26 !')],suite:[ec(R,'3:5 4:au 5:carré, 6:25.'),ec(R,'7:Plus 8:1.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      mach.visible=!dansF;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(T<finTitre){ cam.d=10.6; cam.y=1.75; }
      if(dansQ){ cam.d=12.4; cam.y=3.0; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      /* La machine : elle tremble et ses roues tournent pendant le calcul */
      const p=passage(T), marche=p&&T>=p.de&&T<p.a;
      corps.rotation.z=marche?Math.sin(T*36)*.012:0; corps.position.y=marche?Math.abs(Math.sin(T*18))*.03:0;
      const tour=PASSAGES.reduce((s,x)=>s+Math.max(0,Math.min(T,x.a)-x.de)*(T>=x.de?1:0),0);
      roues[0].rotation.z=-tour*5; roues[1].rotation.z=tour*6;
      rouesMur.forEach((w,i)=>{ w.rotation.z=(i%2?1:-1)*T*.08; });
      afficheur(T);

      /* Le jeton d'entrée : il apparaît au-dessus de l'entonnoir quand le nombre est dit, puis il tombe dedans */
      tokIn.g.visible=false;
      if(p&&!dansF){ const dt=T-p.t; if(dt>=0&&dt<1.15){ tokIn.g.visible=true; ecrireJeton(tokIn,p.n,BL);
        const z=Math.min(1,dt/.22), ch=lisse((dt-.45)/.6); tokIn.g.position.set(MX-.25,3.75-ch*1.1,0); tokIn.g.rotation.set(.12,-.25+ch*.8,0);
        tokIn.g.scale.setScalar((dt<.22?(.4+.75*z):1.0)*(1-.75*ch)); } }
      /* Le jeton de sortie : il glisse sur le plateau */
      tokOut.g.visible=false;
      if(!dansF){ let s=null,ts=0,coul=VE;
        if(p&&p.s!==null&&T>=p.ts&&!(T>=d&&p.n!=='10')){ s=p.s; ts=p.ts; coul=p.s==='?'?OR:VE; }
        if(T>=sortieR&&T<d){ s='26'; ts=sortieR; coul=VE; }
        if(s!==null){ const v=lisse((T-ts)/.45); tokOut.g.visible=true; ecrireJeton(tokOut,s,coul);
          tokOut.g.position.set(MX,.68-.26*v,.35+.62*v); tokOut.g.rotation.set(-.08,0,0); tokOut.g.scale.setScalar(.55+.45*v+.12*Math.sin(Math.min(1,(T-ts)/.6)*Math.PI)); }
        matVoyant.color.setHex(s===null?0x868e96:(coul===VE?0x40c057:0xfd7e14)); }

      if(window.MINI){ tokIn.g.visible=true; ecrireJeton(tokIn,'3',BL); tokIn.g.position.set(MX-.25,3.35,0); tokIn.g.rotation.set(.12,-.25,0); tokIn.g.scale.setScalar(1.05);
        tokOut.g.visible=true; ecrireJeton(tokOut,'7',OR); tokOut.g.position.set(MX,.42,.97); tokOut.g.scale.setScalar(1.05); matVoyant.color.setHex(0xfd7e14); }

      /* Ti Margo */
      if(T<finTitre) g.ouvre();
      else if(T<m(C0,18)) g.montre();
      else if(T<k){ T>=m(C0,21)?g.ouvre():g.montre(); PO.regX=0; PO.regY=0; }
      else if(T<u){ T>=m(K,12)?g.pouce():g.montre(); }
      else if(T<q){ T>=m(U,9)?g.pouce():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,13)?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ cam.y=2.55; cam.d=10.4; PO.jaw=.62; g.montre(); }

      const rs=rangees(T), voirP=!window.MINI&&((T>=m(C0,13)&&T<q)||(T>=m(D,3)&&T<f))&&rs.some(l=>l.length&&l[0][0]<=T);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,rs);
      legende.classList.toggle('piege',T>=m(K,13)&&T<u);
    } };
};
