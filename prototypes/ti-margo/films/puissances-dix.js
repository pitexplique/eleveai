/* ============================================================
   ÉPISODE 03 : LE COMPTEUR FOU. 10ⁿ = 1 suivi de n zéros.
   Studio de vidéaste : la borne au compteur de vues. Au milliard, elle est trop étroite :
   elle s'étire et éjecte Ti Margo hors du cadre. À 10¹⁰⁰, les zéros défilent sans fin et elle fume.
   ============================================================ */
FILMS.dix=function(outils){
  const {panneau,legende}=outils;
  const DUR={'00-accroche':3.965,'01-compteur':10.415,'01q-question':12.995,'01r-reponse':6.57,'02-milliard':5.815,'03-question':10.29,'04-abonne':6.045};
  const C0='00-accroche',X='01-compteur',Q='01q-question',R='01r-reponse',M='02-milliard',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('dix',DUR,{[Q]:3.3,[D]:1.5});
  const x=A[X],q=A[Q],r=A[R],mil=A[M],qu=A[D],f=A[F];

  /* ---- Le studio ---- */
  poserPiece(0x9d8df1,0x4b3f86,0x362d63);
  const mousse=[new THREE.MeshBasicMaterial({color:0x8676de}),new THREE.MeshBasicMaterial({color:0x7766cf})];
  for(let i=0;i<9;i++) for(let j=0;j<6;j++){ const c=new THREE.Mesh(new THREE.PlaneGeometry(.66,.66),mousse[(i+j)%2]); c.position.set(-3.2+i*.8,1.2+j*.8,-2.36); scene3d.add(c); }
  /* La lampe annulaire */
  const lampe=new THREE.Group(); lampe.position.set(-1.75,4.55,-2.1); scene3d.add(lampe);
  piece(lampe,new THREE.TorusGeometry(.62,.1,14,44),new THREE.MeshBasicMaterial({color:0xfff6c8}),[0,0,0],CONTOUR_FIN);
  piece(lampe,new THREE.CylinderGeometry(.035,.035,4.6,10),toon(0x2c2550),[0,-2.92,-.05],null);
  /* Les plaques au mur : un triangle de lecture, doré ou argenté */
  const plaques=new THREE.Group(); scene3d.add(plaques);
  for(const [px,py,cl] of [[.25,5.45,0xffd166],[1.2,5.45,0xdfe6ee],[2.15,5.45,0xffd166]]){ const pl=new THREE.Group(); pl.position.set(px,py,-2.2); plaques.add(pl);
    piece(pl,new RoundedBoxGeometry(.76,.76,.05,2,.02),toon(cl),[0,0,0],CONTOUR_FIN);
    const s=new THREE.Shape(); s.moveTo(-.14,-.2); s.lineTo(.24,0); s.lineTo(-.14,.2); s.closePath(); const t=new THREE.Mesh(new THREE.ShapeGeometry(s),new THREE.MeshBasicMaterial({color:0x362d63})); t.position.z=.03; pl.add(t); }

  /* ---- La borne : le compteur en haut, la courbe des vues en bas. Sa droite ne bouge pas : elle s'étire vers la gauche ---- */
  const XD=2.2, borne=new THREE.Group(); scene3d.add(borne);
  const caisse=new THREE.Group(); caisse.position.z=-.5; borne.add(caisse);
  const corps=piece(caisse,new RoundedBoxGeometry(1,3.8,.5,2,.02),toon(0x241d45),[0,1.98,0],CONTOUR_FIN);
  const dalle=piece(caisse,new RoundedBoxGeometry(.97,1.34,.04,1,.01),toon(0x0b1020),[0,3.1,.26],null);
  const roues=[-1,1].map(()=>piece(borne,new THREE.SphereGeometry(.09,14,10),toon(0x0f0b24),[0,.09,-.5],null));
  const barres=[0,1,2,3,4,5].map((i)=>piece(borne,new RoundedBoxGeometry(.24,1,.05,1,.01),toon(i%2?0xff6b6b:0xffa94d),[.72+i*.27,.8,-.22],null));
  const txt=ecran3d(4.36,1.24,[.02,3.1,-.2],borne);
  const fumees=[0,1,2,3,4].map(()=>piece(borne,new THREE.SphereGeometry(.2,14,10),toon(0xb9bcc9),[0,0,-.3],CONTOUR_FIN));

  const OR='#ff9f43',BL='#f4f7ff',GR='#b7c0d8',RO='#ef4444',VE='#7ee787';
  function dessineEntete(g,cx,H,vues){ const y=H*.2; g.textBaseline='middle'; g.font='800 58px "Segoe UI"'; const lv=vues?g.measureText('vues').width+16:0, xi=cx-(76+lv)/2;
    g.fillStyle=RO; g.beginPath(); g.roundRect(xi,y-26,76,52,14); g.fill(); g.fillStyle='#fff'; g.beginPath(); g.moveTo(xi+28,y-14); g.lineTo(xi+54,y); g.lineTo(xi+28,y+14); g.closePath(); g.fill();
    if(vues){ g.fillStyle=GR; g.textAlign='left'; g.fillText('vues',xi+92,y+2); } }
  /* Le nombre, centré sur cx : 1 suivi de n zéros, les zéros ORANGE, groupés par trois */
  function morceaux(n){ const l=[['1',BL]]; for(let k=0;k<n;k++){ if((n-k)%3===0) l.push([' ',BL]); l.push(['0',OR]); } return l; }
  function largeur(g,l,fs){ g.font=`800 ${fs}px "Segoe UI"`; let s=0; for(const [c] of l) s+=c===' '?fs*.33:g.measureText(c).width; return s; }
  function dessineNombre(g,cx,y,n,fs,pz,nums){ const l=morceaux(n), tot=largeur(g,l,fs); let px=cx-tot/2, k=0; g.textBaseline='middle'; g.textAlign='center';
    for(const [c,co] of l){ if(c===' '){ px+=fs*.33; continue; } g.font=`800 ${fs}px "Segoe UI"`; const lc=g.measureText(c).width;
      if(co===OR&&pz!==1) g.font=`800 ${Math.round(fs*pz)}px "Segoe UI"`; g.fillStyle=co; g.fillText(c,px+lc/2,y);
      if(co===OR){ if(nums&&k<nums){ g.font='800 48px "Segoe UI"'; g.fillStyle=OR; g.fillText(String(k+1),px+lc/2,y+fs*.62); } k++; }
      px+=lc; } }
  function dessineMots(g,cx,y,morc,fs){ g.font=`800 ${fs}px "Segoe UI"`; g.textBaseline='middle'; g.textAlign='left'; const tot=morc.reduce((s,[t])=>s+g.measureText(t).width,0); let px=cx-tot/2; for(const [t,c] of morc){ g.fillStyle=c; g.fillText(t,px,y); px+=g.measureText(t).width; } }

  /* Les coups du milliard : un zéro de plus, un coup d'étirement de plus */
  const b1=m(M,1), b2=b1+.24, b3=b2+.24;
  function largeurBorne(T){ let w=2.2; if(T>=m(R,6)&&T<f) w=2.2+.3*lisse((T-m(R,6))/.25);
    for(const [b,c] of [[b1,3],[b2,3.5],[b3,4.4]]) if(T>=b&&T<f) w+=(c-w)*lisse((T-b)/.2);
    return w; }
  /* Combien de zéros au compteur à l'instant T (null : pas encore un nombre) */
  function zeros(T){ if(T<m(X,0)) return null; if(T<m(X,5)) return 1; if(T<m(X,10)) return 2; if(T<q) return 3; if(T<m(R,6)) return null; if(T<b1) return 6; if(T<b2) return 7; if(T<b3) return 8; return 9; }
  const taille={1:190,2:190,3:190,6:130,7:140,8:150,9:162};
  /* Un coup de zoom sur les zéros, quand la voix les nomme */
  const COUPS=()=>[m(C0,6),m(X,0),m(X,5),m(X,10),m(X,18),m(R,6),m(R,12),b1,b2,b3,m(M,9)];
  function pop(T){ let p=1; for(const s of COUPS()){ const v=(T-s)/.35; if(v>0&&v<1) p=Math.max(p,1+.22*Math.sin(v*Math.PI)); } return Math.round(p*25)/25; }
  /* Les zéros numérotés de 1 à 9 : le « 9 » tombe sur le mot « 9 » */
  function numeros(T){ if(T<m(M,6)+.1||T>=qu) return 0; const d0=m(M,6)+.1, d1=m(M,8); let k=0; for(let i=0;i<9;i++) if(T>=d0+i*(d1-d0)/8) k=i+1; return k; }

  function afficheur(T,w){ const W=1116,H=318,cx=W-w/2*256, p=pop(T), n=zeros(T), nums=numeros(T);
    if(T<x){ const vu=T>=m(C0,1), v=T>=m(C0,3), pq=T>=m(C0,5)?Math.round((1+.05*Math.sin(T*9))*25)/25:1;
      txt.ecrire(`a${vu}${v}${pq}${w}`,(g)=>{ dessineEntete(g,cx,H,v); if(vu){ dessineMots(g,cx,H*.62,[['1 ',BL],['milliard',OR]],Math.round(102*pq)); } }); return; }
    if(T>=q&&T<m(R,6)){ const un=T>=m(Q,1), mi=T>=m(Q,2), v=T>=m(Q,4)||T>=r;
      txt.ecrire(`q${un}${mi}${v}`,(g)=>{ dessineEntete(g,cx,H,v); if(un) dessineMots(g,cx,H*.62,mi?[['1 ',BL],['million',OR]]:[['1',BL]],110); }); return; }
    if(T>=m(D,3)&&T<f){ const off=Math.round((T-m(D,3))*620/6)*6;
      txt.ecrire('s'+off,(g)=>{ dessineEntete(g,cx,H,true); g.save(); g.beginPath(); g.rect(W-w*256+18,0,w*256-30,H); g.clip();
        const l=morceaux(100), fs=162; let px=W-w*256+50-off; g.textBaseline='middle'; g.textAlign='left'; g.font=`800 ${fs}px "Segoe UI"`; const lc=g.measureText('0').width;
        for(const [c,co] of l){ if(c===' '){ px+=fs*.33; continue; } if(px>W) break; if(px>-200){ g.fillStyle=co; g.fillText(c,px,H*.62); } px+=lc; } g.restore(); }); return; }
    const fs=taille[n]||130;
    txt.ecrire(`n${n}${p}${nums}${Math.round(w*50)}`,(g)=>{ dessineEntete(g,cx,H,true); dessineNombre(g,cx,nums?H*.54:H*.62,n,nums?Math.round(fs*.9):fs,n>=7?Math.round((1+(p-1)*.35)*25)/25:p,nums); });
  }

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const zo=s=>ex(s);
  const L1=J(X,[[0,'1'+zo('0')+' '],[2,'= '+ba('10')],[4,sup('1')]]);
  const L2=J(X,[[5,'1'+zo('00')+' '],[7,'= '+ba('10')],[9,sup('2')]]);
  const L3=J(X,[[10,'1 '+zo('000')+' '],[12,'= '+ba('10')],[14,sup('3')]]);
  const S1=J(M,[[5,'1 '],[6,'suivi '],[7,'de '],[8,ex('9')+' '],[9,ex('zéros')]]);
  const S2=J(M,[[10,ba('10')],[12,sup('9')]]);
  const E=J(D,[[1,ba('10')],[3,sup('100')]]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:m(C0,4),a:x,top:352,fs:66,phrases:[ec(C0,'4:Combien 5:de 6:zéros ?')]},
    {de:m(X,15),a:q,top:60,fs:62,phrases:[ec(X,'15:L’exposant 16:compte 17:les 18:zéros.')]},
    {de:mil+.05,a:qu,top:60,fs:66,phrases:[ec(M,'0:Un 1:milliard 2:de 3:vues :')]},
    {de:qu+.05,a:m(D,7),top:60,fs:62,phrases:[ec(D,'0:Et 1:10 2:puissance 3:100 :'),ec(D,'4:combien 5:de 6:zéros ?')]},
    {de:m(D,7),a:m(D,14),top:60,fs:62,phrases:[ec(D,'7:Ce 8:nombre 9:porte 10:un 11:nom 12:célèbre.'),ec(D,'13:Lequel ?')]},
    {de:m(D,14),a:f,top:60,fs:62,phrases:[ec(D,'14:Réponds 15:en 16:commentaire !')]}
  ];
  const tics=[{t:m(C0,1),f:300}]; for(const [i,fr] of [[0,520],[5,620],[10,720]]) tics.push({t:m(X,i),f:fr});
  for(const [b,fr] of [[b1,190],[b2,170],[b3,150]]) tics.push({t:b,f:fr}); tics.push({t:m(M,12),f:880},{t:m(D,3),f:240});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,6)+.3,'<div style="white-space:nowrap;font-size:84px">Un milliard de vues :</div><div style="color:#e8590c;font-size:80px;margin-top:8px;white-space:nowrap">COMBIEN DE ZÉROS ?</div>');

  return { clips,FIN,tics,titre:'Le compteur fou',ceinture:0,finTitre:x,groupes,finClip:F,
    cuts:[q,mil,qu,f],
    question:{ qc:Q,rc:R,finR:mil,cpt:q+DUR[Q]+.1,bonne:0,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:Un 2:million 3:de 4:vues, 5:c’est :')],
      pause:[ec(Q,'18:Mets 19:pause,'),ec(Q,'20:et 21:choisis !')],
      choix:[[puiss('10','6'),m(Q,6)-q,m(Q,9)-q],[puiss('10','7'),m(Q,10)-q,m(Q,13)-q],['10 × 6',m(Q,14)-q,m(Q,17)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'A :']],reponse:[ec(R,'4:10⁶.')],suite:[ec(R,'5:Un 6:million, 7:c’est'),ec(R,'8:un 9:1 10:suivi 11:de 12:6 13:zéros.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<mil, dansF=T>=f;
      borne.visible=!dansF; lampe.visible=!dansF&&!dansQ; plaques.visible=T<qu;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }

      /* La borne s'étire vers la gauche */
      const w=largeurBorne(T), xL=XD-w;
      const secoue=T>=m(D,4)&&T<f?Math.sin(T*41)*.012:0;
      borne.position.x=secoue;
      caisse.scale.x=w; caisse.position.x=XD-w/2;
      /* Au milliard elle grandit aussi : le compteur passe au-dessus de la tête de Ti Margo */
      const monte=T>=b1&&T<f?lisse((T-b1)/.7):0;
      corps.scale.y=(3.8+monte)/3.8; corps.position.y=.08+(3.8+monte)/2; dalle.position.y=3.1+monte; txt.mesh.position.y=3.1+monte;
      roues[0].position.x=xL+.2; roues[1].position.x=XD-.2;
      let sy=0; for(const s of [m(X,0),m(X,5),m(X,10),b1,b2,b3]){ const v=(T-s)/.3; if(v>0&&v<1) sy=Math.max(sy,.07*Math.sin(v*Math.PI)); }
      borne.position.y=sy;
      afficheur(T,w);
      /* La courbe des vues grimpe avec le compteur */
      const nz=T<x?2:(T>=q&&T<m(R,6)?5:(zeros(T)||2)), hb=.25+.3*Math.min(nz,6);
      barres.forEach((b,i)=>{ const h=hb*(i+1)/6; b.scale.y=h; b.position.y=.28+h/2; });
      /* À 10¹⁰⁰, elle fume */
      fumees.forEach((p,i)=>{ const v=((T*.55+i*.2)%1+1)%1, ok=T>=m(D,4)&&T<f; p.visible=ok; p.position.set(.35+i*.38+Math.sin(T*2+i)*.06,2.3+v*1.05,-.2); p.scale.setScalar(.35+v*.8); });

      /* Ti Margo : poussé par la borne, presque hors du cadre ; il revient d'un bond, devant */
      const retour=m(M,5);
      if(T>=mil&&T<f){
        const pousse=Math.min(-1.3,xL-.55);
        if(T<retour){ scene.x=pousse; PO.tz=T>=b1?-.1:0; }
        else { const v=lisse((T-retour)/.42); scene.x=pousse+(-1.05-pousse)*v; scene.z=-.5+1.25*v; scene.y=.75*Math.sin(Math.min(1,(T-retour)/.42)*Math.PI); }
      }

      if(T<m(C0,4)){ g.ouvre(); PO.regY=.55; PO.regX=-.2; }
      else if(T<x){ g.reflechit(); }
      else if(T<m(X,15)){ g.montre(); PO.regY=.55; }
      else if(T<q){ T>=m(X,18)?g.pouce():g.montre(); }
      else if(T<r){ g.reflechit(); }
      else if(T<mil){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<b1){ g.ouvre(); }
      else if(T<retour+.42){ g.oups(); PO.regX=.25; PO.regY=.1; }
      else if(T<m(M,12)){ g.montre(); PO.regY=.55; }
      else if(T<qu){ g.pouce(); }
      else if(T<m(D,13)){ g.reflechit(); }
      else if(T<f){ g.montre(); PO.regY=.55; }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(dansF){ scene.x=0; scene.z=0; scene.y=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }
      if(window.MINI){ cam.y=2.5; PO.jaw=.62; g.oups(); lampe.visible=false; plaques.visible=false; }

      const voirP=(T>=m(X,0)&&T<q)||(T>=m(M,5)&&T<qu)||(T>=m(D,1)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){ if(T<q) lignes(T,[L1,T>=m(X,5)?L2:[],T>=m(X,10)?L3:[]]); else if(T<qu) lignes(T,[S1,T>=m(M,10)?S2:[]]); else lignes(T,[E]); }
      legende.classList.toggle('piege',false);
    } };
};
