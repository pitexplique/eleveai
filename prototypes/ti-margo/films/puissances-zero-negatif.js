/* ============================================================
   ÉPISODE 04 : LE GRAND TROU. a⁰ = 1, pas 0 (⛔ jamais 0⁰).
   Un escalier de trois marches, et un grand 0 rouge : un trou au pied de l'escalier.
   Ti Margo a peur d'y tomber ; la dernière marche vaut 1 : le trou se referme, le 0 est barré.
   ============================================================ */
FILMS['zero-negatif']=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':7.54,'01-escalier':15.69,'01q-question':11.19,'01r-reponse':7.9,'02-question':6.995,'03-abonne':6.045};
  const C0='00-accroche',X='01-escalier',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('zero-negatif',DUR,{[Q]:3.3,[D]:1.5});
  const x=A[X],q=A[Q],r=A[R],d=A[D],f=A[F];

  /* ---- Le temple : un mur de sable, des arches sur le ciel ---- */
  poserPiece(0xf7dfb0,0xd0a86e,0x9a7440);
  const ciel=new THREE.MeshBasicMaterial({color:0xa9e1fb}), colline=new THREE.MeshBasicMaterial({color:0x8fcf7a}), frise=new THREE.MeshBasicMaterial({color:0xe2bd80});
  for(const px of [-2.5,0,2.5]){ const s=new THREE.Shape(); s.moveTo(-.8,1); s.lineTo(-.8,3.3); s.absarc(0,3.3,.8,Math.PI,0,true); s.lineTo(.8,1); s.closePath();
    const a=new THREE.Mesh(new THREE.ShapeGeometry(s),ciel); a.position.set(px,0,-2.35); scene3d.add(a);
    const h=new THREE.Mesh(new THREE.CircleGeometry(.8,24,0,Math.PI),colline); h.position.set(px,1,-2.33); h.scale.y=.55; scene3d.add(h); }
  for(const py of [5.3,5.75]){ const b=new THREE.Mesh(new THREE.PlaneGeometry(120,.16),frise); b.position.set(0,py,-2.34); scene3d.add(b); }

  /* ---- L'escalier : trois blocs ; le dessus d'une marche est un peu plus clair ---- */
  const XS=[-1.55,-.55,.45], HM=[1.5,1,.5], LM=1, ZF=.15, escalier=new THREE.Group(); scene3d.add(escalier);
  const dessus=[];
  XS.forEach((px,k)=>{ piece(escalier,new RoundedBoxGeometry(LM,HM[k],1.3,2,.02),toon(0xe9dfca),[px,HM[k]/2,-.5],CONTOUR_FIN);
    dessus.push(piece(escalier,new RoundedBoxGeometry(LM+.04,.07,1.34,2,.02),toon(0xfff7e6),[px,HM[k],-.5],CONTOUR_FIN)); });
  const YM=HM.map(h=>h+.04);
  const face=ecran3d(3,1.55,[-.55,.775,ZF+.04],escalier);
  const U=px=>(px+2.05)*256, V=py=>(1.55-py)*256;
  const VE='#2f9a3a',BLF='#1971c2',ORF='#e8590c';
  function fleche(g,a,b,c,e,fx,fy){ g.strokeStyle=BLF; g.lineWidth=11; g.lineCap='round'; g.beginPath(); g.moveTo(U(a),V(b)); g.quadraticCurveTo(U(c),V(e),U(fx),V(fy)); g.stroke();
    const px=U(fx),py=V(fy),an=Math.atan2(py-V(e),px-U(c)); g.fillStyle=BLF; g.beginPath(); g.moveTo(px+Math.cos(an)*20,py+Math.sin(an)*20); g.lineTo(px+Math.cos(an+2.3)*26,py+Math.sin(an+2.3)*26); g.lineTo(px+Math.cos(an-2.3)*26,py+Math.sin(an-2.3)*26); g.closePath(); g.fill(); }
  function ecritF(g,t,px,py,fs,c){ g.font=`800 ${fs}px "Segoe UI"`; g.fillStyle=c; g.textAlign='center'; g.textBaseline='middle'; g.fillText(t,U(px),V(py)); }
  function dessineFace(T){
    const fin=T>=d, p=(s)=>{ const v=(T-s)/.4; return v>0&&v<1?Math.round((1+.3*Math.sin(v*Math.PI))*20)/20:1; };
    const v9=!fin&&T>=m(X,9), v3=!fin&&T>=m(X,13), v1=!fin&&T>=m(X,28), a1=!fin&&T>=m(X,18), l1=!fin&&T>=m(X,20), a2=!fin&&T>=m(X,25), l2=!fin&&T>=m(X,27), qst=T>=m(D,9)&&T<f;
    const p9=p(m(X,9)),p3=p(m(X,13)),p1=p(m(X,28));
    face.ecrire([v9,v3,v1,a1,l1,a2,l2,qst,p9,p3,p1].join(),(g)=>{
      if(v9) ecritF(g,'9',-1.62,1.08,Math.round(150*p9),VE);
      if(v3) ecritF(g,'3',-.62,.66,Math.round(140*p3),VE);
      if(v1) ecritF(g,'1',.42,.25,Math.round(104*p1),VE);
      if(a1) fleche(g,-1.34,1.12,-1.02,1.3,-.86,.84);
      if(l1) ecritF(g,'÷ 3',-1.55,.42,84,BLF);
      if(a2) fleche(g,-.34,.72,-.08,.88,.14,.36);
      if(l2) ecritF(g,'÷ 3',-.62,.18,76,BLF);
      if(qst) ecritF(g,'?',.45,.25,104,ORF);
    });
  }

  /* ---- Le trou : un grand 0 rouge dressé au pied de l'escalier ---- */
  const trou=new THREE.Group(); trou.position.set(1.85,1.07,-1.7); scene3d.add(trou);
  const fond=piece(trou,new THREE.CircleGeometry(.5,36),new THREE.MeshBasicMaterial({color:0x14081a}),[0,0,0],null); fond.scale.y=1.45;
  const anneau=piece(trou,new THREE.TorusGeometry(.5,.13,16,48),toon(0xe03131),[0,0,.02],CONTOUR_FIN); anneau.scale.y=1.45;
  const barre0=piece(trou,new RoundedBoxGeometry(.14,2.3,.06,2,.02),toon(0xfdfdfd),[0,0,.2],CONTOUR_FIN); barre0.rotation.z=-.55;

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const A1=J(C0,[[0,ba('2026')],[4,sup('0')],[7,' = '+ex('?')]]);
  const A2=J(C0,[[5,'Ça '],[6,'fait '],[7,'combien ?']]);
  const L1=J(X,[[6,ba('3')],[8,sup('2')],[9,' = '+ok('9')]]);
  const L2=J(X,[[10,ba('3')],[12,sup('1')],[13,' = '+ok('3')]]);
  const L3=J(X,[[21,ba('3')],[23,sup('0')],[24,' = 3'],[25,' ÷'],[27,' 3'],[28,' = '+ok('1')]]);
  const E=J(D,[[0,'Et '],[1,ba('1 000 000')],[9,sup('0')+' '+ex('?')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:m(C0,8),a:x,top:60,fs:62,phrases:[ec(C0,'8:Un 9:indice : 10:ce 11:n’est 12:pas 13:0.')]},
    {de:x+.05,a:m(X,14),top:60,fs:62,phrases:[ec(X,'0:Descends 1:l’escalier'),ec(X,'2:des 3:puissances 4:de 5:3.')]},
    {de:m(X,14),a:q,top:60,fs:62,phrases:[ec(X,'14:À 15:chaque 16:marche,'),ec(X,'17:on 18:divise 19:par 20:3.')]},
    {de:m(D,10),a:f,top:60,fs:62,phrases:[ec(D,'10:Réponds 11:en 12:commentaire !')]}
  ];
  const h1=m(X,10), h2=m(X,21), DH=.42, tc=m(X,28);
  const tics=[{t:m(C0,4),f:170},{t:m(X,9),f:520},{t:m(X,13),f:620},{t:h1,f:300},{t:h2,f:300},{t:tc,f:880}]; for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,7)+.3,'2026⁰ = ?<div style="color:#e8590c;font-size:88px;margin-top:8px;white-space:nowrap">ÇA FAIT COMBIEN ?</div>');

  return { clips,FIN,tics,titre:'Le grand trou',ceinture:0,finTitre:m(C0,8),groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:1,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Alors, 2:2026 5:puissance 6:0 ?')],
      pause:[ec(Q,'15:Mets 16:pause,'),ec(Q,'17:et 18:choisis !')],
      choix:[['0',m(Q,7)-q,m(Q,8)-q],['1',m(Q,9)-q,m(Q,10)-q],['2026',m(Q,11)-q,m(Q,12)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'B :']],reponse:[ec(R,'2:1.')],suite:[ec(R,'8:La 9:dernière 10:marche :'),ec(R,'12:2026 15:÷ 16:2026 19:= 1')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      escalier.visible=!dansF;
      scene.ry=0; scene.z=-.5;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.45; }

      /* Ti Margo descend, d'un saut par marche */
      let px=XS[0],py=YM[0],pys=YM[0];
      for(const [h,k] of [[h1,1],[h2,2]]) if(T>=h){ const v=Math.min(1,(T-h)/DH), l=lisse(v); px=XS[k-1]+(XS[k]-XS[k-1])*l; pys=YM[k-1]+(YM[k]-YM[k-1])*l; py=pys+.5*Math.sin(v*Math.PI); }
      /* Il a peur quand le trou s'ouvre, et sur la dernière marche, juste au bord */
      const peur=(T>=m(C0,4)&&T<x)||(T>=h2+DH&&T<tc);
      if(peur) px+=Math.sin(T*34)*.014;
      if(T>=tc&&T<tc+.6) py+=.5*Math.sin((T-tc)/.6*Math.PI);
      scene.x=px; scene.y=py; scene.ySol=pys;
      /* Sur la dernière marche il se tourne vers le trou : sa queue passe derrière et ne le cache plus */
      if(T>=h2&&T<q){ scene.ry=.9*lisse((T-h2)/DH); scene.cacherOmbre=true; }

      dessineFace(T);
      dessus.forEach((dm,k)=>dm.material.color.setHex(k===2&&T>=m(R,8)&&T<d?0xb7f0a0:0xfff7e6));

      /* Le trou : il s'ouvre au mot « 0 », respire quand Ti Margo approche, se referme au mot « 1 » */
      const voirT=T>=m(C0,4)&&T<q;
      trou.visible=voirT;
      if(voirT){ const o=lisse((T-m(C0,4))/.3), appel=T>=h2&&T<tc?.08+.05*Math.sin(T*7):(T<x?.03*Math.sin(T*6):0);
        const fermer=lisse((T-tc)/.3), ech=1.15*o*(1+appel)*(1-.28*fermer);
        trou.scale.setScalar(Math.max(.001,ech)); trou.position.y=1.07*Math.max(.001,1-.28*fermer);
        fond.visible=fermer<1; fond.scale.set(1-fermer,1.45*(1-fermer),1);
        barre0.visible=T>=tc+.12; barre0.scale.y=lisse((T-tc-.12)/.2); }

      if(T<m(C0,4)){ g.ouvre(); PO.regY=.2; PO.regX=-.1; }
      else if(T<x){ g.oups(); PO.regX=.3; PO.regY=-.15; }
      else if(T<h1){ g.montre(); PO.regY=.1; }
      else if(T<h2){ T<m(X,14)?g.ouvre():g.montre(); PO.regY=.1; }
      else if(T<tc){ g.oups(); PO.regX=.3; PO.regY=-.1; }
      else if(T<q){ g.pouce(); }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,10)?g.reflechit():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(dansF){ scene.x=0; scene.y=0; scene.ySol=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }
      if(window.MINI){ scene.x=XS[2]; scene.y=YM[2]; scene.ySol=YM[2]; scene.ry=.9; scene.cacherOmbre=true; cam.y=2.8; PO.jaw=.62; g.oups(); PO.regX=.3; PO.regY=-.1; }

      const voirP=(T>=m(C0,0)&&T<x)||(T>=m(X,6)&&T<q)||(T>=m(D,0)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){ if(T<x) lignes(T,[A1,T>=m(C0,5)?A2:[]]); else if(T<q) lignes(T,[L1,T>=m(X,10)?L2:[],T>=m(X,21)?L3:[]]); else lignes(T,[E]); }
      legende.classList.toggle('piege',false);
    } };
};
