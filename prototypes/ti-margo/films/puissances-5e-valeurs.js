/* ============================================================
   Série Carré et cube 5e, ÉPISODE 02 : LA COUR AUX DALLES (voix 5e-puissance-valeurs-short).
   Ti Margo pave la cour en carrés : 3 sur 3, 4 sur 4, 5 sur 5… Pour passer au carré suivant,
   il ajoute une bordure (25 + 11 = 36, 36 + 13 = 49). Le pari : 12² sans calculatrice.
   Code couleur de la série : bleu la base, orange l'exposant, vert le résultat juste, rouge le piège.
   Décor propre à l'épisode : la cour (mur crème, bacs à fleurs, sol en béton), le tracé à la craie
   du grand carré 12 × 12, les dalles qui tombent bordure par bordure (une couleur par bordure).
   Outils : puissances-commun.js (chrono, gestes, lignesPanneau, ba/ex/ok/sup, poserMiniature, poserPiece).
   ============================================================ */
FILMS.valeurs=function(outils){
  const DUR={'00-accroche':8.095,'01-carres':10.46,'02-astuce':12.475,'02q-question':13.035,'02r-reponse':6.4,
    '03-douze':5.605,'04-question':5.34,'05-abonne':6.045};
  const C0='00-accroche',K='01-carres',S='02-astuce',Q='02q-question',R='02r-reponse',D='03-douze',Q4='04-question',F='05-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('valeurs',DUR,{[Q]:3.3,[Q4]:1.5});
  const acc=A[C0],k=A[K],s=A[S],q=A[Q],r=A[R],d=A[D],q4=A[Q4],f=A[F];
  document.body.classList.add('cartes-en-ligne');

  /* ---- La cour ---- */
  poserPiece(0xf6e2bf,0xbdb5a6,0x8c7b66);
  /* Le haut du mur : un chaperon de tuiles, et deux fenêtres */
  const chap=new THREE.Mesh(new THREE.PlaneGeometry(120,.32),new THREE.MeshBasicMaterial({color:0xb5532d})); chap.position.set(0,6.4,-2.36); scene3d.add(chap);
  for(const fx of [-3.2,3.6]){ const fe=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.7),new THREE.MeshBasicMaterial({color:0x9fd3f5})); fe.position.set(fx,4.3,-2.35); scene3d.add(fe);
    const cadre=new THREE.Mesh(new THREE.PlaneGeometry(1.75,1.95),new THREE.MeshBasicMaterial({color:0x7a5230})); cadre.position.set(fx,4.3,-2.37); scene3d.add(cadre);
    const croix=new THREE.Mesh(new THREE.PlaneGeometry(.08,1.7),new THREE.MeshBasicMaterial({color:0x7a5230})); croix.position.set(fx,4.3,-2.34); scene3d.add(croix); }
  /* Des bacs à fleurs le long du mur */
  const feuille=toon(0x3f9b3a), bac=toon(0x9c5b34), fleurs=[0xff6b9a,0xffd43b,0xff922b];
  for(const [bx,i] of [[-4.6,0],[-2.3,1],[2.2,2],[4.5,0]]){ piece(scene3d,new RoundedBoxGeometry(1.3,.55,.6,2,.06),bac,[bx,.28,-1.95],CONTOUR_FIN);
    for(const dx of [-.4,0,.4]){ piece(scene3d,new THREE.SphereGeometry(.3,14,10),feuille,[bx+dx,.75,-1.95],CONTOUR_FIN);
      piece(scene3d,new THREE.SphereGeometry(.1,10,8),toon(fleurs[(i+Math.round(dx*5))%3]),[bx+dx+.06,.98,-1.75],null); } }

  /* ---- Les dalles : 12 × 12, rangées par bordure ----
     La case (i, j) : i vers la caméra, j vers la droite ; elle est dans la bordure n = max(i, j) + 1. */
  const PAS=.25, TAILLE=.228, X0=-1.0, Z0=-.95;
  const COUL_B=[0xd9773a,0xeadcc0,0x7f97b0];           /* terre cuite, sable, ardoise : une par bordure */
  const CSS_B=['#c2551d','#a07e3e','#4f6f92'];        /* les mêmes, lisibles dans le panneau */
  const coulB=n=>COUL_B[(n-1)%3], cssB=n=>CSS_B[(n-1)%3];
  const geoD=new RoundedBoxGeometry(TAILLE,.07,TAILLE,2,.02), mats=COUL_B.map(c=>toon(c));
  const dalles=[];
  for(let i=0;i<12;i++) for(let j=0;j<12;j++){ const n=Math.max(i,j)+1, me=piece(scene3d,geoD,mats[(n-1)%3],[X0+(j+.5)*PAS,.035,Z0+(i+.5)*PAS],CONTOUR_FIN);
    /* rang dans sa bordure : d'abord la rangée de devant, de gauche à droite, puis la colonne de droite, du fond vers l'avant */
    const rang=i===n-1?j:(n-1)+(n-1-i);
    dalles.push({me,n,rang,i,j}); }
  /* La craie : le contour du grand carré 12 × 12 */
  const craie=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0}), L12=12*PAS+.06;
  const traits=[[X0+6*PAS,Z0-.03,L12,.04],[X0+6*PAS,Z0+12*PAS+.03,L12,.04],[X0-.03,Z0+6*PAS,.04,L12],[X0+12*PAS+.03,Z0+6*PAS,.04,L12]].map(([x,z,w,h])=>{
    const t=new THREE.Mesh(new THREE.PlaneGeometry(w,h),craie); t.rotation.x=-Math.PI/2; t.position.set(x,.006,z); scene3d.add(t); return t; });

  /* Les instants de chaque bordure : [début, durée de la pose] */
  const POSE={1:[m(K,6),.25],2:[m(K,6)+.3,.3],3:[m(K,7)+.05,.35],4:[m(K,10),.5],5:[m(K,14),.55],
    6:[m(S,12),.45],7:[m(S,16),.5],8:[m(R,3),.35],9:[m(R,5)-.15,.4],10:[m(D,4),.3],11:[m(D,5),.3],12:[m(D,6),.3]};
  const tEnvol=m(Q4,4);
  function poserDalles(T){
    for(const dl of dalles){ const [t0,dur]=POSE[dl.n], tt=t0+dur*dl.rang/Math.max(1,2*dl.n-2), u=(T-tt)/.28;
      let y=.035, vis=T>=tt, sc=1;
      if(vis&&u<1){ const e=Math.max(0,u); y=.035+.9*(1-e)*(1-e); }
      /* le rebond de la bordure quand Ti Margo dit « bordure » (la 5) */
      if(dl.n===5){ const v=(T-m(S,9))/.7; if(v>0&&v<1) y+=.18*Math.sin(v*Math.PI); }
      /* À toi : la bordure 12 s'envole, il reste le carré 11 × 11 */
      if(dl.n===12&&T>=tEnvol){ const v=Math.min(1,(T-tEnvol-dl.rang*.012)/.7); if(v>0){ y+=2.6*v*v; sc=1-v; } if(v>=1) vis=false; }
      dl.me.visible=vis&&sc>.02; dl.me.position.y=y; dl.me.scale.setScalar(Math.max(.02,sc)); }
    craie.opacity=Math.min(1,Math.max(0,(T-m(C0,10))/.4))*.9;
  }

  /* ---- Le panneau du bas ---- */
  const lignes=lignesPanneau(outils,3);
  const nb=(n,s)=>`<span style="color:${cssB(n)}">${s}</span>`;
  const P0=J(C0,[[10,ba('12')],[12,sup('2')+' = ?']]);
  const K1=J(K,[[6,ba('3')+' '],[7,'sur '],[8,ba('3')+' : '],[9,ok('9')]]);
  const K2=J(K,[[10,ba('4')+' '],[11,'sur '],[12,ba('4')+' : '],[13,ok('16')]]);
  const K3=J(K,[[14,ba('5')+' '],[15,'sur '],[16,ba('5')+' : '],[17,ok('25')]]);
  const S1=J(S,[[10,ok('25')+' '],[11,'+ '],[12,nb(6,'11')+' = '],[13,ok('36')]]);
  const S2=J(S,[[14,ok('36')+' '],[15,'+ '],[16,nb(7,'13')+' = '],[17,ok('49')]]);
  const D1=J(D,[[1,ba('12')],[3,sup('2')+' = '],[4,ba('12')+' '],[5,'× '],[6,ba('12')]]);
  const D2=J(D,[[7,'= '+ok('144')]]);
  const E1=J(Q4,[[4,ba('11')],[6,sup('2')+' = ?']]);
  const VIDE=[];
  const rangees=T=>{ if(T<k) return [P0]; if(T<s) return [K1,T>=m(K,10)?K2:VIDE,T>=m(K,14)?K3:VIDE];
    if(T<q) return [S1,T>=m(S,14)?S2:VIDE]; if(T<q4) return [D1,T>=m(D,7)?D2:VIDE]; return [E1]; };

  /* ---- Les écrits : exactement ce que dit la voix ---- */
  const finTitre=m(C0,5);
  const groupes=[
    {de:acc+.1,a:finTitre,top:352,fs:62,phrases:[ec(C0,'0:Salut ! 1:Moi, 2:c’est 3:Ti 4:Margo.')]},
    {de:finTitre,a:k,top:60,fs:62,phrases:[ec(C0,'5:Tu 6:paries 7:que 8:tu 9:connais'),ec(C0,'10:12 11:au 12:carré,'),ec(C0,'13:sans 14:calculatrice ?')]},
    {de:k,a:s,top:60,fs:62,phrases:[ec(K,'0:Je 1:pose 2:des 3:dalles'),ec(K,'4:en 5:carré.')]},
    {de:s,a:q,top:60,fs:58,phrases:[ec(S,'0:Mon 1:astuce : 2:pour 3:passer'),ec(S,'4:au 5:carré 6:suivant,'),ec(S,'7:j’ajoute 8:une 9:bordure.')]},
    {de:d+.05,a:m(D,4),top:60,fs:66,phrases:[ec(D,'0:Et 1:12 2:au 3:carré ?')]},
    {de:m(D,4),a:q4,top:60,fs:66,phrases:[ec(D,'4:12 5:fois 6:12 :'),ec(D,'7:144 9:dalles !')]},
    {de:q4+.05,a:m(Q4,7),top:60,fs:64,phrases:[ec(Q4,'0:À 1:toi : 2:combien 3:font'),ec(Q4,'4:11 5:au 6:carré ?')]},
    {de:m(Q4,7),a:f,top:60,fs:64,phrases:[ec(Q4,'7:Réponds 8:en 9:commentaire !')]}
  ];
  /* Un petit « toc » à chaque dalle de bordure posée, et le compte à rebours */
  const tics=[]; for(const n of [3,4,5,6,7,9,12]) tics.push({t:POSE[n][0]+.28,f:300+n*30}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(D,9)+.6,`${ba('12')}${sup('2')} sans<br>calculatrice ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>`);

  return { clips,FIN,tics,titre:'La cour aux dalles',ceinture:0,finTitre,groupes,finClip:F,
    cuts:[k,q,d,q4,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Combien 2:vaut 3:9 4:au 5:carré ?')],
      pause:[ec(Q,'12:Mets 13:pause,'),ec(Q,'14:et 15:choisis !')],
      choix:[['18',m(Q,6)-q,m(Q,7)-q],['81',m(Q,8)-q,m(Q,9)-q],['99',m(Q,10)-q,m(Q,11)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:81 !')],suite:[ec(R,'3:9 4:× 5:9.'),ec(R,'6:Pas 7:9 8:× 9:2.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      poserDalles(T);
      if(dansF){ for(const dl of dalles) dl.me.visible=false; craie.opacity=0; }
      scene.x=-1.42; scene.z=-1.55; scene.ry=.45; scene.taille=.74;
      cam.x=.2; cam.e=.8; cam.d=10.4; cam.y=1.4; cam.z=.75;
      if(T<finTitre){ cam.e=.5; cam.y=2.3; cam.d=11; }
      if(T>=d&&T<f){ cam.d=10.8; }
      if(dansQ){ cam.d=12.4; cam.y=2.7; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; scene.taille=.9; cam.x=0; cam.z=0; cam.e=.1; cam.d=12; cam.y=3.9; }

      if(T<finTitre) g.ouvre();
      else if(T<k){ T<m(C0,13)?g.montre():g.reflechit(); }
      else if(T<s){ g.montre(); }
      else if(T<q){ if(T>=m(S,9)&&T<m(S,10)) g.ouvre(); else if(T>=m(S,13)&&T<m(S,14)||T>=m(S,17)) g.pouce(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<d){ if(T<m(R,1)) g.ouvre(); else if(T>=m(R,6)) g.oups(); else g.pouce(); }
      else if(T<q4){ T>=m(D,7)?g.pouce():g.montre(); }
      else if(T<f){ T<m(Q4,7)?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=-1.1; scene.z=-1.6; scene.ry=.3; scene.taille=.86; cam.x=.25; cam.e=.5; cam.d=10.8; cam.y=3.5; PO.jaw=.62; g.pouce(); }

      /* Le panneau n'apparaît qu'avec son premier mot écrit (jamais une boîte vide) */
      const ls=(!dansQ&&!dansF&&T>=m(C0,10))?rangees(T):[], voirP=ls.some(l=>l.length&&T>=l[0][0]);
      outils.panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,ls);
      for(const e of outils.panneau.querySelectorAll('.expo')){ const t0=T<k?m(C0,12):(T<q4?m(D,3):m(Q4,6)), v=(T-t0)/.7; e.style.transform=(v>0&&v<1)?`scale(${1+.8*Math.sin(v*Math.PI)})`:''; }
    } };
};
