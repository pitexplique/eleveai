/* ============================================================
   ÉPISODE 11 : LE PARI DE LA BALANCE. 1 000 € tout de suite, ou 1 centime doublé 20 fois ?
   Une balance géante : la liasse à gauche, une pile de centimes à droite. 1, 2, 4, 8 : minuscule,
   Ti Margo se moque. À 2²⁰ la pile monte et sort du cadre, le fléau bascule, la liasse s'envole.
   (Le titre ne dit pas « centime » : la voix le dit plus tard.)
   Voix validée : rien à changer dans les mots.
   ============================================================ */
FILMS.defi=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':4.945,'01-doubler':6.94,'01q-question':13.785,'01r-reponse':8.15,'02-vingt':11.27,'03-question':5.88,'04-abonne':6.045};
  const C0='00-accroche',X='01-doubler',Q='01q-question',R='01r-reponse',V='02-vingt',D='03-question',F='04-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('defi',DUR,{[Q]:3.3,[D]:1.5});
  const q=A[Q],r=A[R],v=A[V],d=A[D],f=A[F],x=A[X];

  /* ---- Le décor : une salle des coffres, bleu nuit, avec de grosses portes rondes ---- */
  poserPiece(0x2f5d62,0xd8c7a0,0x1d3d40);
  for(const [px,py] of [[-1.9,4.6],[1.9,4.6],[0,5.6]]){ const po=new THREE.Mesh(new THREE.CircleGeometry(.72,32),new THREE.MeshBasicMaterial({color:0x3f7379})); po.position.set(px,py,-2.3); scene3d.add(po);
    const co=new THREE.Mesh(new THREE.RingGeometry(.5,.56,32),new THREE.MeshBasicMaterial({color:0x2a5257})); co.position.set(px,py,-2.28); scene3d.add(co); }

  /* ---- La balance : un pied, un fléau, deux plateaux ---- */
  const PIV=[0,3.05], BRAS=1.48, TIGE=1.0, ZB=-.7;
  const bal=new THREE.Group(); bal.position.z=ZB; scene3d.add(bal);
  piece(bal,new RoundedBoxGeometry(1.5,.16,.8,2,.05),toon(0x6b4e2e),[0,.08,0],CONTOUR_FIN);
  piece(bal,new RoundedBoxGeometry(.2,PIV[1],.2,2,.05),toon(0xc99a2e),[0,PIV[1]/2,0],CONTOUR_FIN);
  const fleau=piece(bal,new RoundedBoxGeometry(BRAS*2+.12,.13,.13,2,.05),toon(0xe0b03a),[PIV[0],PIV[1],.1],CONTOUR_FIN);
  piece(bal,new THREE.SphereGeometry(.15,18,14),toon(0xa77e1e),[PIV[0],PIV[1],.2],CONTOUR_FIN);
  /* Un plateau : deux cordes en V et un disque */
  function plateau(){ const g=new THREE.Group(); bal.add(g); const me=new THREE.MeshBasicMaterial({color:0x5a4a22});
    const c=[-.55,.55].map(s=>{ const l=new THREE.Mesh(new THREE.BoxGeometry(.03,Math.hypot(.55,TIGE),.03),me); l.position.set(s/2,TIGE/2,.1); l.rotation.z=Math.atan2(s,TIGE); g.add(l); return l; });
    piece(g,new THREE.CylinderGeometry(.68,.62,.07,28),toon(0xe0b03a),[0,0,.1],CONTOUR_FIN); return g; }
  const plG=plateau(), plD=plateau();

  /* La liasse : trois billets et le montant. Elle est dans le décor, pas sur le plateau : elle peut s'envoler */
  const liasse=new THREE.Group(); scene3d.add(liasse);
  for(let i=0;i<3;i++) piece(liasse,new RoundedBoxGeometry(1.08,.11,.5,2,.03),toon(i===1?0x2f9a3a:0x51cf66),[0,.06+i*.1,0],CONTOUR_FIN);
  const etiq=ecran3d(1,.46,[0,.54,.26],liasse);
  function ecrireLiasse(m1,e){ etiq.ecrire(m1+'|'+e,(g,w,h)=>{ g.fillStyle='#fff'; g.strokeStyle='#17452a'; g.lineWidth=6; g.beginPath(); g.roundRect(4,4,w-8,h-8,26); g.fill(); g.stroke(); g.fillStyle='#2f9a3a'; g.font='800 58px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.fillText((m1?'1 000':'')+(e?' €':''),w/2,h/2+4); }); }
  /* Les billets qui s'envolent quand la liasse saute */
  const billets=Array.from({length:12},(_,i)=>{ const b=piece(scene3d,new RoundedBoxGeometry(.42,.2,.02,1,.01),toon(i%2?0x51cf66:0x2f9a3a),[0,0,.35],CONTOUR_FIN); return b; });

  /* La pile de centimes : des disques cuivre, autant qu'il en faut pour la hauteur voulue */
  const DY=.058, NMAX=145;
  const geoC=new THREE.CylinderGeometry(.34,.34,DY*.86,22), matC=toon(0xd9822b), matC2=toon(0xf0a14a);
  const pieces=Array.from({length:NMAX},(_,i)=>piece(plD,geoC,i%2?matC:matC2,[0,0,.1],CONTOUR_FIN));
  /* La hauteur de la pile après k doublements : réelle jusqu'à 8, puis comprimée (sinon 2¹⁰ sortirait déjà du cadre), et hors du cadre à 2²⁰ */
  const hauteur=k=>k<=3?DY*2**k:k<=10?DY*8*(1.16/(DY*8))**((k-3)/7):1.16*(8.2/1.16)**((k-10)/10);
  /* Le « ? » sur le plateau vide */
  const point=ecran3d(.8,.9,[-BRAS*.98,2.55,.2],scene3d); point.ecrire('?',(g,w,h)=>{ g.font='900 200px "Segoe UI"'; g.textAlign='center'; g.textBaseline='middle'; g.lineWidth=14; g.lineJoin='round'; g.strokeStyle='#fff'; g.strokeText('?',w/2,h/2); g.fillStyle='#e8590c'; g.fillText('?',w/2,h/2); });

  /* Les doublements dans le temps */
  const tDouble=[m(C0,9),m(X,3),m(X,5),m(X,7)];
  const debut20=m(V,1), fin20=m(V,7);
  const kDe=T=>{ /* k = nombre de doublements déjà faits ; -1 : aucune pièce */
    if(T<tDouble[0]) return -1;
    if(T<x) return 0;
    if(T<q){ let k=0; for(let i=1;i<4;i++) if(T>=tDouble[i]) k=i; return k; }
    if(T<r) return 3;
    if(T<v) return T<m(R,4)?3:3+7*lisse((T-m(R,4))/.5);
    /* Le doublement reprend là où la réponse s'est arrêtée : 2¹⁰ */
    if(T<debut20) return 10;
    return 10+10*Math.min(1,(T-debut20)/(fin20-debut20));
  };
  /* Le fléau : penché du côté de la liasse (+), puis du côté de la pile (−) quand le centime pèse plus : 100 000 centimes = 1 000 € */
  const KBASC=Math.log2(100000), A_G=.17, A_D=-.34;
  const tBasc=debut20+(KBASC-10)/10*(fin20-debut20);
  const angleDe=T=>{ if(T<m(C0,3)) return 0; const a0=A_G*lisse((T-m(C0,3))/.35); if(T<v) return a0;
    if(T<tBasc) return A_G; const u=(T-tBasc)/.4; return u>=1?A_D+(u<2.5?Math.sin((u-1)*5)*.018*(2.5-u):0):A_G+(A_D-A_G)*lisse(u); };

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,3);
  const P1=J(C0,[[2,ok('1 000')+' '],[3,ok('€')+' '],[4,'tout '],[5,'de '],[6,'suite,']]);
  const P2=J(C0,[[7,'ou '],[8,ex('1')+' '],[9,ex('centime')+' '],[10,'doublé']]);
  const P3=J(C0,[[11,ex('20')+' '],[12,'fois ?']]);
  const D1=J(X,[[0,ex('1')+' '],[1,ex('centime.')]]);
  const D2=J(X,[[2,'Doublé : '],[3,ex('2.')]]);
  const D3=J(X,[[4,'Encore : '],[5,ex('4.')+' '],[6,'Encore : '],[7,ex('8.')]]);
  const VT=J(V,[[4,ba('2')],[6,sup('20')+' =']]);
  const VF=J(V,[[8,ex('1 ')],[10,ex('048 ')],[13,ex('576 ')],[14,'centimes']]);
  /* Le compteur : une liste de jetons par valeur, gardée pour ne pas la refaire à chaque image */
  const compteurs={}; const compteur=n=>compteurs[n]||(compteurs[n]=[[0,ex(n.toLocaleString('fr-FR').replace(/[  ]/g,' '))+' centimes']]);
  const E1=J(D,[[0,'Et '],[1,'doublé '],[2,ex('30')+' '],[3,'fois,']]);
  const E2=J(D,[[4,'ça '],[5,'fait '],[6,'combien '],[7,'d’euros ?']]);

  /* ---- Les écrits ---- */
  const groupes=[
    {de:A[C0]+.05,a:x,top:352,fs:62,phrases:[ec(C0,'0:Tu 1:préfères :')]},
    {de:m(X,8),a:q,top:60,fs:62,phrases:[ec(X,'8:Ça 9:ne 10:ressemble 11:à 12:rien.')]},
    {de:v+.05,a:m(V,15),top:60,fs:62,phrases:[ec(V,'0:Mais 1:doublé 2:20 3:fois :')]},
    {de:m(V,15),a:m(V,20),top:60,fs:62,phrases:[ec(V,'15:Plus 16:de 18:10 000 19:euros !')]},
    {de:m(V,20),a:d,top:60,fs:66,phrases:[ec(V,'20:Le 21:centime 22:gagne.')]},
    {de:m(D,8),a:f,top:60,fs:62,phrases:[ec(D,'8:Réponds 9:en 10:commentaire !')]}
  ];
  const tics=[{t:m(C0,3),f:300},{t:m(C0,9),f:980},{t:m(X,3),f:980},{t:m(X,5),f:980},{t:m(X,7),f:980},{t:tBasc,f:130},{t:tBasc+.08,f:880}];
  for(let i=0;i<8;i++) tics.push({t:debut20+i*(fin20-debut20)/8,f:600+i*60});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,12)+.2,'<div style="white-space:nowrap;font-size:88px">1 000 € ou 1 centime</div><div style="color:#e8590c;font-size:100px;margin-top:8px;white-space:nowrap">DOUBLÉ 20 FOIS ?</div>');

  return { clips,FIN,tics,titre:'Le pari de la balance',ceinture:0,finTitre:x,groupes,finClip:F,
    cuts:[q,v,d,f],
    question:{ qc:Q,rc:R,finR:v,cpt:q+DUR[Q]+.1,bonne:2,tBon:CL[R][1][0],
      phrase:[ec(Q,'1:1 2:centime 3:doublé 4:10 5:fois ?')],
      pause:[ec(Q,'16:Mets 17:pause, 18:et 19:choisis !')],
      choix:[['20 centimes',m(Q,6)-q,m(Q,8)-q],['100 centimes',m(Q,9)-q,m(Q,11)-q],['1 024 centimes',m(Q,12)-q,m(Q,15)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'C :']],reponse:[ec(R,'4:2¹⁰ = 6:1 024 7:centimes.')],
      suite:[ec(R,'8:Seulement 9:10 10:euros'),ec(R,'11:et 12:24 13:centimes.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<v, dansF=T>=f, MINI=window.MINI;
      bal.visible=!dansF; liasse.visible=!dansF;
      scene.ry=0; scene.z=.25; scene.x=0;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      /* Le fléau et les plateaux */
      const a=angleDe(T), cs=Math.cos(a), sn=Math.sin(a);
      fleau.rotation.z=a;
      const py=PIV[1]-.06;
      plG.position.set(-BRAS*cs,py-BRAS*sn-TIGE,0); plD.position.set(BRAS*cs,py+BRAS*sn-TIGE,0);
      /* La pile */
      const k=kDe(T), H=k<0?0:hauteur(k), n=k<0?0:Math.min(NMAX,Math.max(1,Math.round(H/DY)));
      pieces.forEach((p,i)=>{ p.visible=i<n; if(p.visible) p.position.set(Math.sin(i*2.4)*.01,.05+DY*(i+.5),.1); });
      /* La liasse : posée, puis lancée en l'air quand le fléau bascule */
      const lx=plG.position.x, ly=plG.position.y+.04, zl=ZB+.1;
      const tVol=T-tBasc-.08, vole=T>=v&&tVol>0, vu=T>=m(C0,2);
      liasse.visible=vu&&!dansF&&(!vole||tVol<1.6);
      if(liasse.visible){ const pop=lisse((T-m(C0,2))/.22); if(vole){ const h=tVol*5.6-tVol*tVol*.9; liasse.position.set(lx-tVol*.45,ly+h,zl+.3); liasse.rotation.set(tVol*.8,0,tVol*2.4); liasse.scale.setScalar(1); } else { const top=T<m(C0,3)?(1-pop)*.8:0; liasse.position.set(lx,ly+top,zl); liasse.rotation.set(0,0,0); liasse.scale.setScalar(.2+.8*pop); } }
      ecrireLiasse(T>=m(C0,2),T>=m(C0,3));
      /* Les billets : ils jaillissent, flottent et sortent du cadre par le haut */
      billets.forEach((b,i)=>{ const dt=tVol-.05*i; const on=T>=v&&dt>0&&T<d; b.visible=on; if(!on) return; const sx=Math.sin(i*2.1), hy=dt*(3.2+.25*(i%4))-dt*dt*.34; b.position.set(-1.45+sx*(.25+dt*.3),plG.position.y+.3+hy,.3+.03*i); b.rotation.set(dt*2+i,dt*1.2,dt*3+i); });
      /* Le « ? » sur le plateau vide */
      point.mesh.visible=T>=m(D,6)&&T<f; if(point.mesh.visible){ point.mesh.position.set(-BRAS*cs,plG.position.y+.55+Math.sin(T*4)*.05,ZB+.3); }

      /* ---- Ti Margo ---- */
      if(T<m(C0,2)){ g.ouvre(); }
      else if(T<m(C0,7)){ g.ouvre(); PO.regY=-.45; PO.tetY=-.2; }
      else if(T<x){ g.montre(); PO.regY=.5; PO.tetY=.2; }
      else if(T<m(X,8)){ g.montre(); PO.regY=.5; PO.tetY=.2; }
      else if(T<q){ /* il se moque : les épaules sautent */ g.oups(); PO.regY=.3; PO.tetY=.15; PO.sautY=Math.abs(Math.sin(T*9))*.07; PO.tetZ=Math.sin(T*9)*.06; }
      else if(T<r){ g.reflechit(); }
      else if(T<m(R,8)){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<v){ g.oups(); PO.regY=.3; }
      else if(T<tBasc){ g.montre(); PO.regY=.5; PO.regX=-.2; PO.tetX=-.15; }
      else if(T<d){ /* la tête suit la liasse qui s'envole, puis il saute */ if(T<m(V,15)){ g.oups(); PO.regY=-.3; PO.regX=-.35; PO.tetX=-.25; } else if(T<m(V,20)){ g.oups(); PO.regY=.1; PO.regX=-.2; } else { g.pouce(); PO.regY=.4; PO.sautY=Math.abs(Math.sin((T-m(V,20))*5))*.14; } }
      else if(T<f){ T<m(D,8)?g.reflechit():g.montre(); PO.regY=.2; }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(MINI){ cam.y=3.0; PO.jaw=.62; g.montre(); PO.jaw=.62; PO.regY=.5; }

      /* ---- Le panneau : jamais vide ---- */
      const voirP=(T>=m(C0,2)&&T<q)||(T>=debut20&&T<d)||(T>=m(D,0)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        if(T<x) lignes(T,[P1,T>=m(C0,7)?P2:[],T>=m(C0,11)?P3:[]]);
        else if(T<q) lignes(T,[D1,T>=m(X,2)?D2:[],T>=m(X,4)?D3:[]]);
        else if(T<d){ const kE=Math.floor(k), valeur=2**Math.min(19,kE);
          lignes(T,[T>=m(V,4)?VT:[],T>=m(V,8)?VF:compteur(valeur)]); }
        else lignes(T,[E1,T>=m(D,4)?E2:[]]);
      }
      legende.classList.remove('piege');
    } };
};
