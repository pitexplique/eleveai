/* ============================================================
   ÉPISODE 10 : LA MACHINE À SIMPLIFIER. (2³)² × 2⁴ ÷ 2⁷ = 2³ = 8.
   L'expression géante roule sur le tapis et raccourcit à chaque étape ; la machine fume, secoue,
   et crache un tout petit 8. Ti Margo est déçu, puis ravi.
   Les nombres de l'expression n'apparaissent qu'au mot : avant, des cases vides bleues et orange.
   ============================================================ */
FILMS['enchainer']=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':6.035,'01-etapes':14.075,'01q-question':13.19,'01r-reponse':9.88,'02-question':8.385,'03-abonne':6.045};
  const C0='00-accroche',X='01-etapes',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('enchainer',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],q=A[Q],r=A[R],d=A[D],f=A[F];
  document.body.classList.add('cartes-en-ligne');
  const entre=(T,t,dur=.25)=>lisse((T-t)/dur);
  const flash=(T,t,dur=.5)=>{ const v=(T-t)/dur; return v>0&&v<1?Math.sin(v*Math.PI):0; };

  /* ---- L'usine : un mur, des engrenages, un gros tuyau ---- */
  poserPiece(0xdfe8cf,0x8f9685,0x5e6657);
  const roues=[[-1.55,5.1,.85,.32],[.5,5.5,.6,-.45],[1.75,4.7,.75,.36]].map(([px,py,ra,v])=>{
    const e=ecran3d(ra*2.3,ra*2.3,[px,py,-2.32],scene3d,128);
    e.ecrire('r',(g,w,h)=>{ g.translate(w/2,h/2); g.fillStyle='#c4d0b0'; const R0=w*.36; for(let i=0;i<12;i++){ g.save(); g.rotate(i*Math.PI/6); g.fillRect(-w*.05,-w*.49,w*.1,w*.2); g.restore(); } g.beginPath(); g.arc(0,0,R0,0,7); g.fill(); g.fillStyle='#dfe8cf'; g.beginPath(); g.arc(0,0,w*.11,0,7); g.fill(); });
    return {me:e.mesh,v}; });
  const tuyau=new THREE.Mesh(new THREE.PlaneGeometry(120,.2),new THREE.MeshBasicMaterial({color:0xb7c2a6})); tuyau.position.set(0,1.1,-2.33); scene3d.add(tuyau);

  /* ---- Le tapis roulant, au-dessus de Ti Margo ---- */
  const YT=3.35, ZT=-.6;
  const tapis=new THREE.Group(); scene3d.add(tapis);
  piece(tapis,new RoundedBoxGeometry(6.25,.16,.5,2,.05),toon(0x39424e),[-.825,YT,ZT],CONTOUR_FIN);
  for(const px of [-1.98]) piece(tapis,new RoundedBoxGeometry(.14,YT,.14,2,.03),toon(0x5a6573),[px,YT/2,ZT],CONTOUR_FIN);
  const rouleaux=Array.from({length:17},()=>piece(tapis,new THREE.CylinderGeometry(.045,.045,.04,10).rotateX(Math.PI/2),toon(0xaab4bf),[0,YT,ZT+.26],null));

  /* La plaque de l'expression, sur le tapis */
  const LP=4.6, HP=.92, PX=230, plaque=ecran3d(LP,HP,[0,YT+.08+HP/2,ZT],scene3d,PX);
  const BLEU='#1971c2',ORANGE='#e8590c',VERT='#2f9a3a',ENCRE='#17452a';
  /* Un morceau : ['b',texte] base, ['e',texte] exposant, ['s',texte] signe, ['B'] case vide base, ['E'] case vide exposant, ['v',texte] résultat vert */
  const TG=140,TP=86;
  function largeur(g,l){ let s=0; for(const [k,t] of l){ if(k==='B') s+=92; else if(k==='E') s+=52; else { g.font=`800 ${k==='e'?TP:TG}px "Segoe UI"`; s+=g.measureText(t).width+(k==='s'?(t==='('||t===')'?2:24):4); } } return s; }
  function dessine(g,w,h,l){
    const W=largeur(g,l)+56; const X0=w-W-8;
    g.fillStyle='#fff'; g.strokeStyle=ENCRE; g.lineWidth=9; g.beginPath(); g.roundRect(X0,8,W,h-16,30); g.fill(); g.stroke();
    let px=X0+28; const bas=h*.75; g.textBaseline='alphabetic'; g.textAlign='left';
    for(const [k,t] of l){
      if(k==='B'){ g.fillStyle='#a5d0f5'; g.beginPath(); g.roundRect(px+4,h*.3,82,h*.46,14); g.fill(); px+=92; continue; }
      if(k==='E'){ g.fillStyle='#ffc99a'; g.beginPath(); g.roundRect(px+2,h*.14,44,h*.28,9); g.fill(); px+=52; continue; }
      g.font=`800 ${k==='e'?TP:TG}px "Segoe UI"`; g.fillStyle=k==='b'?BLEU:k==='e'?ORANGE:k==='v'?VERT:ENCRE;
      g.fillText(t,px+(k==='s'&&t!=='('&&t!==')'?12:0),k==='e'?bas-60:bas); px+=g.measureText(t).width+(k==='s'?(t==='('||t===')'?2:24):4);
    }
  }
  const lst=l=>JSON.stringify(l);
  const GRANDE=[['s','('],['B'],['E'],['s',')'],['E'],['s','×'],['B'],['E'],['s','÷'],['B'],['E']];
  /* L'expression à l'instant T, un morceau au mot où il est dit */
  function expression(T){
    const p=(i,sb,se)=>[T>=m(X,i)?['b',sb]:['B'],T>=m(X,i+2)?['e',se]:['E']];
    if(T<m(X,9)) return [['s','('],...p(0,'2','3'),['s',')'],T>=m(X,6)?['e','2']:['E'],['s','×'],['B'],['E'],['s','÷'],['B'],['E']];
    if(T<m(X,16)) return [['b','2'],['e','6'],['s','×'],...p(11,'2','4'),['s','÷'],['B'],['E']];
    if(T<m(X,24)) return [['b','2'],['e','10'],['s','÷'],...p(19,'2','7')];
    return [['b','2'],['e','3']];
  }
  function expressionD(T){
    const a=[T>=m(D,1)?['b','3']:['B'],T>=m(D,3)?['e','4']:['E']], b=[T>=m(D,10)?['b','3']:['B'],T>=m(D,12)?['e','8']:['E']];
    return [['s','('],...a,['s',')'],T>=m(D,7)?['e','2']:['E'],['s','÷'],...b];
  }
  /* Chaque raccourci : la plaque repart de son ancien bord gauche et roule vers la bouche de la machine */
  const raccourcis=[[m(X,9),expression(m(X,9)-.001),expression(m(X,9))],[m(X,16),expression(m(X,16)-.001),expression(m(X,16))],[m(X,24),expression(m(X,24)-.001),expression(m(X,24))]]
    .map(([t,av,ap])=>({t,dx:(largeur(plaque.g,av)-largeur(plaque.g,ap))/PX}));

  /* ---- La machine ---- */
  const machine=new THREE.Group(); machine.position.set(1.16,0,-.35); scene3d.add(machine);
  piece(machine,new RoundedBoxGeometry(2.04,3,.9,3,.1),toon(0x3f7d8c),[0,1.5,0],CONTOUR_FIN);
  piece(machine,new RoundedBoxGeometry(1.84,2.78,.05,2,.04),toon(0x5fa0ad),[0,1.5,.45],CONTOUR_FIN);
  /* L'entonnoir sous le bout du tapis */
  const ent=piece(machine,new THREE.CylinderGeometry(.5,.22,.42,20),toon(0x2f5f6c),[.55,3.14,-.25],CONTOUR_FIN);
  /* Trois lampes, une par étape */
  const lampes=[-.55,0,.55].map((px,i)=>{ const mt=toon(0x44525c); piece(machine,new THREE.CircleGeometry(.2,20),mt,[px,2.56,.5],null);
    const e=ecran3d(.3,.3,[px,2.56,.51],machine); e.ecrire('n',(g,w,h)=>{ g.fillStyle='#fff'; g.font='800 62px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText(i+1,w/2,h/2+3); });
    return mt; });
  /* Le cadran : l'aiguille s'affole */
  piece(machine,new THREE.CircleGeometry(.42,28),toon(0xf7f4e8),[0,1.68,.5],null);
  const bordCadran=piece(machine,new THREE.TorusGeometry(.42,.035,8,28),toon(0x2b3746),[0,1.68,.5],null);
  const aiguille=new THREE.Group(); aiguille.position.set(0,1.68,.52); machine.add(aiguille);
  piece(aiguille,new THREE.BoxGeometry(.035,.34,.01).translate(0,.16,0),toon(0xc92a2a),[0,0,0],null);
  piece(machine,new THREE.CircleGeometry(.05,12),toon(0x2b3746),[0,1.68,.53],null);
  /* La bouche, en bas : d'où sort la boîte */
  piece(machine,new RoundedBoxGeometry(1.3,.74,.03,2,.04),toon(0x1c2a33),[0,.55,.47],null);
  /* Le tuyau d'échappement, à gauche */
  piece(machine,new THREE.CylinderGeometry(.11,.13,.5,14).rotateZ(1.2),toon(0x2b3746),[-1.14,2.5,.1],CONTOUR_FIN);

  /* La fumée : quelques boules, écrites à l'instant T */
  const fumees=Array.from({length:9},()=>{ const s=piece(scene3d,new THREE.SphereGeometry(.2,14,12),toon(0xc3c8ce),[0,0,.2],null); s.visible=false; return s; });
  function fumee(T,bouffees){
    fumees.forEach(s=>s.visible=false); let k=0;
    for(const [t,fort,n] of bouffees){ for(let i=0;i<n&&k<fumees.length;i++){ const v=(T-t-i*.14)/(fort?1.25:.8); if(v<=0||v>=1) continue; const s=fumees[k++];
      const haut=fort?2.9:.5; s.visible=true; s.position.set(-.05-v*.2+Math.sin(i*2.1)*(fort?.1+v*.42:.05),2.62+v*haut,.2); s.scale.setScalar((fort?1.2+.5*Math.sin(i*1.7):.5)*(.45+v)*(1-Math.max(0,v-.75)*3)); } }
  }

  /* La boîte : elle jaillit de la bouche ; le couvercle saute au mot ; dedans, le tout petit résultat */
  const boite=new THREE.Group(); scene3d.add(boite);
  piece(boite,new RoundedBoxGeometry(.72,.5,.56,2,.03),toon(0xd9a768),[0,.25,0],CONTOUR_FIN);
  piece(boite,new THREE.BoxGeometry(.72,.05,.02),toon(0xb9854a),[0,.34,.285],null);
  const couv=new THREE.Group(); couv.position.set(0,.5,-.28); boite.add(couv);
  piece(couv,new RoundedBoxGeometry(.78,.09,.6,2,.02),toon(0xc9955a),[0,.04,.28],CONTOUR_FIN);
  const qBoite=ecran3d(.34,.34,[0,.25,.29],boite); qBoite.ecrire('q',(g,w,h)=>{ g.fillStyle=ORANGE; g.font='800 92px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText('?',w/2,h/2+3); });
  const petit=ecran3d(.56,.4,[0,.7,.18],boite,200);
  const posBoite=[1.2,.42];

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const L1=J(X,[[0,'('+ba('2')],[2,sup('3')],[3,')'],[6,sup('2')+' '],[7,'= '+ba('2')],[9,sup('6')]]);
  const L2=J(X,[[10,puiss('2','6')+' × '],[11,ba('2')],[13,sup('4')+' '],[14,'= '+ba('2')],[16,sup('10')]]);
  const L3=J(X,[[17,puiss('2','10')+' ÷ '],[19,ba('2')],[21,sup('7')+' '],[22,'= '+ba('2')],[24,sup('3')],[25,' = '+ok('8')]]);
  const E=J(D,[[1,'('+ba('3')],[3,sup('4')],[4,')'],[7,sup('2')+' '],[8,'÷ '],[10,ba('3')],[12,sup('8')],[13,' = '+ex('?')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:acc+.1,a:m(C0,3),top:338,fs:52,phrases:[ec(C0,'0:Une 1:expression 2:géante.')]},
    {de:m(C0,3),a:m(C0,8),top:60,fs:64,phrases:[ec(C0,'3:Une 4:seule 5:puissance'),ec(C0,'6:au 7:bout.')]},
    {de:m(C0,8),a:x,top:60,fs:80,phrases:[ec(C0,'8:Prêt ?')]},
    {de:m(X,2),a:m(X,10),top:60,fs:62,phrases:[ec(X,'2:2³, 3:le 4:tout 5:au 6:carré :')]},
    {de:m(X,10),a:m(X,17),top:60,fs:66,phrases:[ec(X,'10:Fois 13:2⁴ :')]},
    {de:m(X,17),a:m(X,25),top:60,fs:66,phrases:[ec(X,'17:Divisé 18:par 21:2⁷ :')]},
    {de:m(X,25),a:q,top:60,fs:96,phrases:[ec(X,'25:8 !')]},
    {de:m(D,3),a:m(D,13),top:60,fs:60,phrases:[ec(D,'3:3⁴, 4:le 5:tout 6:au 7:carré,'),ec(D,'8:divisé 9:par 12:3⁸ ?')]},
    {de:m(D,13),a:f,top:60,fs:62,phrases:[ec(D,'13:Réponds 14:en 15:commentaire !')]}
  ];
  const tEject=m(X,25)-.38, tEjectR=m(R,15)-.38;
  const tics=[{t:m(C0,1),f:300},{t:m(X,25),f:880},{t:m(R,15),f:880}];
  for(const i of [9,16,24]) tics.push({t:m(X,i),f:520});
  for(const t of [tEject,tEjectR]) tics.push({t,f:190});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,8)+.4,'Une expression géante<div style="color:#e8590c;font-size:104px;margin-top:8px">ET AU BOUT ?</div>');

  return { clips,FIN,tics,titre:'La machine à simplifier',ceinture:0,finTitre:m(C0,3),groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'3:10², 4:le 5:tout 6:au 7:cube,'),ec(Q,'8:divisé 9:par 12:10⁵ ?')],
      pause:[ec(Q,'19:Mets 20:pause,'),ec(Q,'21:et 22:choisis !')],
      choix:[['1',m(Q,13)-q,m(Q,14)-q],['10',m(Q,15)-q,m(Q,16)-q],['100',m(Q,17)-q,m(Q,18)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:10.')],suite:[ec(R,'3:2 4:× 5:3 6:= 6.'),ec(R,'7:Puis 8:6 9:− 10:5 11:= 1.'),ec(R,'14:10¹ 15:= 10.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      machine.visible=tapis.visible=!dansF;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }
      for(const o of roues) o.me.rotation.z=T*o.v;

      /* La plaque sur le tapis */
      let l=null, dxPl=0, dyPl=0;
      if(T<x){ if(T>=m(C0,1)){ l=GRANDE; dxPl=-5.2*(1-entre(T,m(C0,1),.65)); } }
      else if(T<q){ l=expression(T); for(const rc of raccourcis) if(T>=rc.t) { const v=entre(T,rc.t,.42); if(v<1) dxPl=-rc.dx*(1-v); } dyPl=-1.1*entre(T,tEject-.42,.42); if(T>=tEject) l=null; }
      else if(T>=d&&T<f){ l=expressionD(T); }
      plaque.mesh.visible=!!l;
      if(l){ plaque.ecrire(lst(l),(gc,w,h)=>dessine(gc,w,h,l)); const pop=T<x?1+.05*flash(T,m(C0,2),.45):1; plaque.mesh.scale.setScalar(1); plaque.mesh.position.set(dxPl,YT+.08+HP/2+dyPl+(pop-1)*2,ZT); }
      /* Les rouleaux tournent quand la plaque avance */
      const avance=entre(T,m(C0,1),.65)*5.2+raccourcis.reduce((s,rc)=>s+rc.dx*entre(T,rc.t,.42),0);
      rouleaux.forEach((o,i)=>{ const u=((i*.37-avance)%6.25+6.25)%6.25; o.position.x=-3.95+u; });

      /* La machine : elle tremble à chaque étape, à fond juste avant le 8 ; les lampes s'allument */
      let amp=0, etapes=[], bouffees=[];
      if(T>=x&&T<q){ amp=Math.max(.012*entre(T,m(X,7),.2)*(T<m(X,9)+.3?1:0),.016*entre(T,m(X,14),.2)*(T<m(X,16)+.3?1:0),.05*entre(T,m(X,22),.8)*(T<m(X,25)+.05?1:0)); etapes=[m(X,9),m(X,16),m(X,24)]; bouffees=[[m(X,9),false,3],[m(X,16),false,3],[m(X,23),true,9]]; }
      else if(T>=r&&T<d){ amp=.03*entre(T,m(R,12),.5)*(T<m(R,15)+.05?1:0); etapes=[m(R,6),m(R,11),m(R,14)]; bouffees=[[m(R,6),false,3],[m(R,11),false,3],[m(R,13),true,6]]; }
      machine.position.x=1.16+Math.sin(T*47)*amp; machine.rotation.z=Math.sin(T*31)*amp*.32; machine.position.y=Math.abs(Math.sin(T*23))*amp*.7;
      lampes.forEach((mt,i)=>mt.color.setHex(T>=(etapes[i]??1e9)?0x2f9a3a:0x44525c));
      aiguille.rotation.z=.9-1.8*Math.min(1,amp*22)+Math.sin(T*29)*amp*7;
      fumee(T,bouffees);

      /* La boîte : « ? » sur la boîte fermée en attendant, puis elle sort de la machine */
      const dansX=T>=x&&T<q, dansR=T>=r&&T<d;
      const tOut=dansX?tEject:(dansR?tEjectR:1e9), tOuvre=dansX?m(X,25):(dansR?m(R,15):1e9), txt=dansX?'8':'10';
      const fermee=(T>=m(C0,5)&&T<x)||(T>=m(D,13)&&T<f);
      const sortie=T>=tOut&&(dansX||dansR);
      boite.visible=fermee||sortie;
      qBoite.mesh.visible=fermee;
      if(boite.visible){
        const v=sortie?entre(T,tOut,.32):entre(T,fermee&&T<x?m(C0,5):m(D,13),.3);
        const saut=sortie?Math.sin(Math.min(1,(T-tOut)/.38)*Math.PI)*.55:0;
        boite.position.set(posBoite[0]+(sortie?(1-v)*.1:0),saut,sortie?-.2+v*(posBoite[1]+.2):posBoite[1]);
        boite.scale.setScalar(sortie?.55+.45*v:v);
        const o=sortie?Math.min(1,Math.max(0,(T-tOuvre)/.45)):0;
        /* Le couvercle saute et retombe par terre, à gauche de la boîte */
        couv.position.set(-.85*o,.5+(-.47*o)+1.1*Math.sin(o*Math.PI)*(o>0?1:0),-.28); couv.rotation.z=o*3.1*2;
        petit.mesh.visible=sortie&&T>=tOuvre;
        if(petit.mesh.visible){ petit.ecrire(txt,(gc,w,h)=>{ gc.fillStyle='#fff'; gc.strokeStyle=ENCRE; gc.lineWidth=5; gc.beginPath(); gc.roundRect(4,4,w-8,h-8,14); gc.fill(); gc.stroke(); gc.fillStyle=VERT; gc.font='800 70px "Segoe UI"'; gc.textAlign='center'; gc.textBaseline='middle'; gc.fillText(txt,w/2,h/2+3); }); const h=entre(T,tOuvre,.3); petit.mesh.position.y=.42+.3*h; petit.mesh.scale.setScalar(.4+.6*h); }
      }

      /* Ti Margo */
      if(T<m(C0,1)){ g.ouvre(); }
      else if(T<m(C0,3)){ g.oups(); PO.regY=.1; }
      else if(T<m(C0,8)){ g.montre(); PO.regY=.5; }
      else if(T<x){ g.pouce(); }
      else if(T<q){
        if(T<m(X,25)){ g.montre(); PO.regY=.55; PO.regX=T>=m(X,22)?-.3:-.4; }
        else if(T<m(X,25)+.6){ g.oups(); PO.regY=.5; PO.regX=.3; PO.tetZ=.2; PO.paupiere=-.6; }
        else { g.pouce(); const v=(T-m(X,25)-.6)/.45; PO.sautY=v>0&&v<1?.25*Math.sin(v*Math.PI):0; }
      }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():(T<m(R,15)?g.montre():g.pouce()); PO.regY=.5; }
      else if(T<f){ T<m(D,13)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ cam.y=3.08; cam.d=11.6; PO.jaw=.62; g.oups(); plaque.mesh.position.y=YT+.08+HP/2; }

      const voirP=(T>=m(X,0)&&T<q)||(T>=m(D,1)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E]:[L1,T>=m(X,10)?L2:[],T>=m(X,17)?L3:[]]);
      legende.classList.remove('piege');
    } };
};
