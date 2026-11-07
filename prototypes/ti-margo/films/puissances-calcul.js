/* ============================================================
   ÉPISODE 07 : LE JEU DES ANNEAUX. 10² × 10⁴ = 10⁶, pas 10⁸.
   Un stand de foire : les zéros sont des anneaux orange sur deux tringles. Ti Margo tente 10⁸ :
   buzzer, « Perdu ! ». Il fait glisser les anneaux sur une seule tringle : 2 + 4 = 6, 1 000 000.
   (Le titre ne dit pas « zéros » : la voix ne le dit qu'après l'accroche.)
   Voix validée : rien à changer dans les mots.
   ============================================================ */
FILMS.calcul=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':6.925,'01-zeros':10.405,'01q-question':15.175,'01r-reponse':6.5,'02-question':6.575,'03-abonne':6.045};
  const C0='00-accroche',X='01-zeros',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('calcul',DUR,{[Q]:3.3,[D]:1.5});
  const q=A[Q],r=A[R],d=A[D],f=A[F],x=A[X];

  /* ---- La foire, le soir : un mur violet, une toile rayée, une guirlande ---- */
  poserPiece(0x4b2a7a,0xe2c48f,0x2f1a52);
  for(let i=-7;i<7;i++){ const b=new THREE.Mesh(new THREE.PlaneGeometry(.62,2.5),new THREE.MeshBasicMaterial({color:i%2?0xe03131:0xfff5e0})); b.position.set(i*.62+.31,5.55,-1.7); scene3d.add(b); }
  for(let i=-7;i<7;i++){ const pt=new THREE.Mesh(new THREE.CircleGeometry(.31,20,Math.PI,Math.PI),new THREE.MeshBasicMaterial({color:i%2?0xe03131:0xfff5e0})); pt.position.set(i*.62+.31,4.3,-1.7); scene3d.add(pt); }
  const bulbes=[]; for(let i=0;i<13;i++){ const am=new THREE.Mesh(new THREE.CircleGeometry(.07,14),new THREE.MeshBasicMaterial({color:0xffe066})); am.position.set(-2.7+i*.45,3.88-Math.abs(Math.sin(i*.8))*.06,-1.68); scene3d.add(am); bulbes.push(am); }
  for(const s of [-1,1]){ const po=new THREE.Mesh(new THREE.PlaneGeometry(.14,5),new THREE.MeshBasicMaterial({color:0x8a5a2b})); po.position.set(s*2.32,2,-1.69); scene3d.add(po); }

  /* ---- Le stand : un grand tableau, trois tringles, un buzzer ---- */
  const BX=.8, RAILS=[3.2,2.2,1.2], Z=.1;
  const stand=new THREE.Group(); scene3d.add(stand);
  piece(stand,new RoundedBoxGeometry(2.84,3.62,.14,3,.06),toon(0xb9441f),[BX,1.8,-.06],CONTOUR_FIN);
  piece(stand,new RoundedBoxGeometry(2.64,3.42,.04,2,.02),toon(0xfff1cf),[BX,1.8,.02],null);
  for(const y of RAILS) piece(stand,new THREE.CylinderGeometry(.03,.03,2.64,10).rotateZ(Math.PI/2),toon(0x7c8b99),[BX,y,Z],CONTOUR_FIN);
  /* Le buzzer rouge */
  const matBuz=toon(0x8a1c1c); const buz=piece(stand,new THREE.SphereGeometry(.26,20,14,0,Math.PI*2,0,Math.PI/2),matBuz,[BX,3.62,.02],CONTOUR_FIN);
  piece(stand,new RoundedBoxGeometry(.72,.1,.3,2,.03),toon(0x3a2d1e),[BX,3.62,.02],CONTOUR_FIN);

  /* Les anneaux : ce sont des zéros */
  const matAn=toon(0xf5820a), matLu=toon(0xffc83a);
  const anneaux=Array.from({length:10},()=>piece(stand,new THREE.TorusGeometry(.088,.034,10,24).scale(1,1.42,1),matAn,[0,0,.18],CONTOUR_FIN));
  /* Le chiffre « 1 » devant les zéros, à chaque tringle */
  const XPL=-.22, X1=.31, XA=.58, PAS=.25;
  const chiffres=RAILS.map(y=>{ const e=ecran3d(.32,.52,[X1,y-.27,.14],stand); e.ecrire('1',(g,w,h)=>{ g.font='900 112px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle='#1971c2'; g.fillText('1',w/2,h/2+6); }); return e; });
  /* La plaque de chaque tringle : 10ⁿ. coul : couleur de l'exposant, gros : il enfle */
  const plaques=RAILS.map(y=>ecran3d(.7,.52,[XPL,y-.27,.14],stand));
  function plaque(i,dix,expo,coul='#e8590c',gros=false,px=XPL){ const e=plaques[i]; e.mesh.position.x=px; e.mesh.visible=!!dix; if(!dix) return;
    e.ecrire([expo,coul,gros].join('|'),(g,w,h)=>{ const y=h*.72; g.fillStyle='#fff'; g.strokeStyle='#17452a'; g.lineWidth=5; g.beginPath(); g.roundRect(4,4,w-8,h-8,26); g.fill(); g.stroke();
      g.textBaseline='alphabetic'; g.textAlign='left'; g.font='800 74px "Segoe UI"'; const t10=g.measureText('10').width; const fe=gros?72:50; g.font=`800 ${fe}px "Segoe UI"`; const te=g.measureText(expo||'').width; let cx=(w-t10-te)/2;
      g.font='800 74px "Segoe UI"'; g.fillStyle='#1971c2'; g.fillText('10',cx,y); cx+=t10; if(expo){ g.font=`800 ${fe}px "Segoe UI"`; g.fillStyle=coul; g.fillText(expo,cx,y-28); } }); }
  /* L'enseigne lumineuse de l'accroche : 10⁸, sur la 3e tringle */
  const enseigne=new THREE.Group(); enseigne.position.set(BX+.42,.93,.22); stand.add(enseigne);
  piece(enseigne,new RoundedBoxGeometry(1.46,1,.06,2,.03),toon(0x2c1a46),[0,0,0],CONTOUR_FIN);
  const ampoules=[]; for(let i=0;i<14;i++){ const u=i/14*4.76, a=u<1.3?[-.66+u,.42]:u<2.38?[.64,.42-(u-1.3)*.84/1.08]:u<3.68?[.64-(u-2.38),-.42]:[-.66,-.42+(u-3.68)*.84/1.08]; const b=new THREE.Mesh(new THREE.SphereGeometry(.04,10,8),new THREE.MeshBasicMaterial({color:0xffe066})); b.position.set(a[0],a[1],.05); enseigne.add(b); ampoules.push(b); }
  const texteE=ecran3d(1.2,.76,[0,0,.05],enseigne);
  function ecrireEnseigne(dix,huit,eteint){ texteE.ecrire([dix,huit,eteint].join('|'),(g,w,h)=>{ const y=h*.74; g.textBaseline='alphabetic'; g.textAlign='left'; g.font='900 150px "Segoe UI"'; const t10=g.measureText('10').width; g.font='900 100px "Segoe UI"'; const t8=g.measureText('8').width; let cx=(w-t10-t8)/2;
      g.font='900 150px "Segoe UI"'; g.fillStyle=eteint?'#6b5a80':'#ffe066'; if(dix) g.fillText('10',cx,y); cx+=t10; g.font='900 100px "Segoe UI"'; g.fillStyle=eteint?'#6b5a80':'#ff9f43'; if(huit) g.fillText('8',cx,y-46);
      if(eteint){ g.strokeStyle='#ff4040'; g.lineWidth=20; g.lineCap='round'; g.beginPath(); g.moveTo(w*.14,h*.82); g.lineTo(w*.86,h*.16); g.stroke(); } }); }
  /* Le « ? » de la question en commentaire */
  const point=ecran3d(.8,.8,[BX+.2,.95,.2],stand); point.ecrire('?',(g,w,h)=>{ g.font='900 170px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillStyle='#e8590c'; g.fillText('?',w/2,h/2+6); });

  /* Où se place l'anneau i parmi n, à droite du départ x0, groupé par trois comme on écrit un nombre */
  const place=(i,n,x0,pas=PAS)=>{ const k=n-1-i, gr=Math.floor((n-1)/3)-Math.floor(k/3); return x0+pas*i+.06*gr; };
  /* Les pas de 1/30 s n'accumulent rien : la position d'un anneau ne dépend que de T */
  function poseAnneau(a,T,{t0,rail,xx,t1=null,rail2=null,xx2=null,lueur=null}){
    a.visible=T>=t0; if(!a.visible) return;
    let ax=xx, ay=RAILS[rail]-.27, sc=lisse((T-t0)/.2);
    if(t1!==null&&T>=t1){ const v=lisse((T-t1)/.75), b2=RAILS[rail2]-.27; ax=xx+(xx2-xx)*v; ay=ay+(b2-ay)*v+Math.sin(v*Math.PI)*.22; }
    const lu=lueur&&lueur.some(l=>T>=l&&T<l+.7); const pul=lu?1+.28*Math.sin(Math.min(1,(T-lueur.find(l=>T>=l&&T<l+.7))/.7)*Math.PI):1;
    a.material=lu?matLu:matAn; a.position.set(ax,ay,.18); a.scale.setScalar(sc*pul);
  }

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const ACC=J(C0,[[0,ba('10')],[2,sup('2')+' '],[3,'× '],[4,ba('10')],[6,sup('4')]]);
  const FAUX=J(C0,[[7,'= '+ba('10')],[9,sup('8')+' ?']]);
  const BARRE=J(C0,[[7,'= <span class="barre pi">10⁸</span>']]);
  const SOM=J(X,[[4,ex('2')+' '],[6,'+ '],[7,ex('4')+' '],[9,'= '+ex('6')]]);
  const RES=J(X,[[12,'1 000 000 '],[13,'= '],[14,ba('10')],[16,sup('6')]]);
  const E1=J(D,[[0,'Et '],[1,ba('10')],[3,sup('7')+' '],[4,'÷ '],[6,ba('10')],[8,sup('3')+' ?']]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:m(C0,10),a:x,top:60,fs:104,phrases:[ec(C0,'10:Perdu !')]},
    {de:x+.05,a:m(X,4),top:60,fs:66,phrases:[ec(X,'0:100 1:× 3:10 000 :')]},
    {de:m(X,4),a:m(X,11),top:60,fs:56,phrases:[ec(X,'4:2 5:zéros 6:+ 7:4 8:zéros : 9:6 10:zéros')]},
    {de:m(X,11),a:m(X,17),top:60,fs:62,phrases:[ec(X,'12:1 000 000, 13:c’est 16:10⁶')]},
    {de:m(X,17),a:q,top:60,fs:62,phrases:[ec(X,'17:On 18:additionne 19:les 20:exposants.')]},
    {de:m(D,9),a:f,top:60,fs:62,phrases:[ec(D,'9:Réponds 10:en 11:commentaire !')]}
  ];
  const tics=[{t:m(C0,10),f:110},{t:m(C0,10)+.18,f:90}]; for(const [c,i,fq] of [[C0,2,620],[C0,6,700],[C0,9,900],[X,4,620],[X,7,700],[X,9,880],[X,16,990],[R,10,880]]) tics.push({t:m(c,i),f:fq}); for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,10)+.5,'<div style="white-space:nowrap;color:#17452a">10² × 10⁴ = 10⁸ ?</div><div style="color:#c92a2a;font-size:118px;margin-top:8px">PERDU !</div>');

  const glisse1=m(X,9);
  return { clips,FIN,tics,titre:'Le jeu des anneaux',ceinture:0,finTitre:m(C0,10),groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'3:10⁴ 4:× 7:10⁴ ?')],
      pause:[ec(Q,'20:Mets 21:pause, 22:et 23:choisis !')],
      choix:[[puiss('10','16'),m(Q,8)-q,m(Q,11)-q],[puiss('10','8'),m(Q,12)-q,m(Q,15)-q],[puiss('20','8'),m(Q,16)-q,m(Q,19)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'4:10⁸.')],suite:[ec(R,'5:4 6:zéros 7:+ 8:4 9:zéros : 10:8 11:zéros.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f, MINI=window.MINI;
      stand.visible=!dansF;
      scene.ry=0; scene.z=-.5; scene.x=-1.5;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }
      for(const a of anneaux) a.visible=false;
      chiffres.forEach(c=>{ c.mesh.visible=false; }); plaques.forEach(p=>{ p.mesh.visible=false; });
      enseigne.visible=false; point.mesh.visible=false;
      /* La guirlande clignote */
      bulbes.forEach((b,i)=>{ b.material.color.setHex(Math.floor(T*2.5+i)%2?0xffe066:0xffa94d); });

      /* Le buzzer et la secousse du stand */
      const tP=m(C0,10), buzzOn=T>=tP&&T<x;
      matBuz.color.setHex(buzzOn&&Math.floor((T-tP)*8)%2===0?0xff2020:0x8a1c1c);
      buz.scale.y=buzzOn&&T<tP+.2?.7:1;
      const sec=T>=tP&&T<tP+.5?Math.sin((T-tP)*48)*.022*(1-(T-tP)/.5):0;
      stand.position.x=sec;

      if(T<x){
        plaque(0,T>=m(C0,0),T>=m(C0,2)?'2':''); plaque(1,T>=m(C0,4),T>=m(C0,6)?'4':'');
        for(let i=0;i<2;i++) poseAnneau(anneaux[i],T,{t0:m(C0,2)+i*.08,rail:0,xx:place(i,2,XA)});
        for(let i=0;i<4;i++) poseAnneau(anneaux[2+i],T,{t0:m(C0,6)+i*.08,rail:1,xx:place(i,4,XA)});
        /* L'enseigne : 10⁸ s'allume, puis s'éteint à « Perdu » */
        const eteint=T>=tP; enseigne.visible=T>=m(C0,7);
        ecrireEnseigne(T>=m(C0,7),T>=m(C0,9),eteint);
        ampoules.forEach((b,i)=>{ b.material.color.setHex(eteint?0x4b3a60:(Math.floor(T*7+i)%2?0xffe066:0xfff5c0)); });
      } else if(T<q){
        plaque(0,true,'2',T>=m(X,4)&&T<glisse1?'#e8590c':'#e8590c',(T>=m(X,4)&&T<m(X,6))||(T>=m(X,17)&&T<q));
        plaque(1,true,'4','#e8590c',(T>=m(X,7)&&T<m(X,9))||(T>=m(X,17)&&T<q));
        chiffres[0].mesh.visible=T<glisse1+.1; chiffres[1].mesh.visible=T>=m(X,3)&&T<glisse1+.5; chiffres[2].mesh.visible=T>=m(X,11);
        if(T>=m(X,16)) plaque(2,true,'6','#2f9a3a',T<m(X,17)+.6);
        for(let i=0;i<2;i++) poseAnneau(anneaux[i],T,{t0:0,rail:0,xx:place(i,2,XA),t1:glisse1+i*.06,rail2:2,xx2:place(i,6,XA),lueur:[m(X,4),m(X,16)]});
        for(let i=0;i<4;i++) poseAnneau(anneaux[2+i],T,{t0:0,rail:1,xx:place(i,4,XA),t1:glisse1+.12+i*.06,rail2:2,xx2:place(2+i,6,XA),lueur:[m(X,7),m(X,16)]});
      } else if(T<d){
        plaque(0,T>=m(Q,1),T>=m(Q,3)?'4':'',undefined,false,XPL); plaque(1,T>=m(Q,5),T>=m(Q,7)?'4':'',undefined,false,XPL);
        const tg=m(R,10); plaque(2,T>=tg,'8','#2f9a3a',false,1.8);
        for(let i=0;i<4;i++) poseAnneau(anneaux[i],T,{t0:m(Q,3)+i*.06,rail:0,xx:place(i,4,.34),t1:tg+i*.04,rail2:2,xx2:-.42+.245*i,lueur:[m(R,5)]});
        for(let i=0;i<4;i++) poseAnneau(anneaux[4+i],T,{t0:m(Q,7)+i*.06,rail:1,xx:place(i,4,.34),t1:tg+.16+i*.04,rail2:2,xx2:-.42+.245*(4+i),lueur:[m(R,8)]});
      } else if(T<f){
        plaque(0,T>=m(D,1),T>=m(D,3)?'7':''); plaque(1,T>=m(D,6),T>=m(D,8)?'3':'');
        for(let i=0;i<7;i++) poseAnneau(anneaux[i],T,{t0:m(D,3)+i*.03,rail:0,xx:.34+.25*i});
        for(let i=0;i<3;i++) poseAnneau(anneaux[7+i],T,{t0:m(D,8)+i*.05,rail:1,xx:.34+.25*i});
        point.mesh.visible=T>=m(D,8); if(point.mesh.visible) point.mesh.scale.setScalar(lisse((T-m(D,8))/.25)*(1+Math.sin(T*4)*.05));
      }

      /* ---- Ti Margo ---- */
      if(T<m(C0,7)){ g.ouvre(); PO.regY=.5; }
      else if(T<tP){ g.montre(); PO.regY=.5; PO.jaw=Math.max(PO.jaw,.3); }
      else if(T<x){ g.oups(); PO.regY=.3; PO.sautY=T<tP+.3?Math.sin((T-tP)/.3*Math.PI)*.16:0; }
      else if(T<glisse1){ g.montre(); PO.regY=.5; }
      else if(T<m(X,11)){ /* il pousse les anneaux vers la tringle du bas */ const v=lisse((T-glisse1)/.8); PO.gesteD='ouverte'; PO.md.set(.9+.1*v,2.6-1.1*v,.5); PO.cd.set(.8,1.7,.2); PO.regY=.5; PO.regX=.15; }
      else if(T<q){ T>=m(X,16)?g.pouce():g.montre(); PO.regY=.5; }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,9)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(MINI){ cam.y=2.75; PO.jaw=.62; g.oups(); }
      /* Les bras restent devant le stand et dans le cadre */
      if(!dansF){ PO.md.x=Math.min(PO.md.x,.6); PO.cd.x=Math.min(PO.cd.x,.66); PO.mg.x=Math.max(PO.mg.x,-.62); PO.cg.x=Math.max(PO.cg.x,-.66); }

      const voirP=(T>=m(C0,0)&&T<q)||(T>=m(D,0)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E1]:(T<m(X,4)?[ACC,T>=tP?BARRE:(T>=m(C0,7)?FAUX:[])]:[ACC,SOM,T>=m(X,12)?RES:[]]));
      legende.classList.toggle('piege',T>=tP&&T<x);
    } };
};
