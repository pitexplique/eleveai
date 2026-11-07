/* ============================================================
   ÉPISODE 08 : LE COFFRE-FORT. 2³ × 2⁴ = 2⁷ = 128.
   Un coffre à interrupteurs (les bits) ; le trousseau de Ti Margo passe de 8 clés à 128 : il plie sous le poids.
   Le titre ne dit ni « clé » ni « secrète » : la voix les dit juste après.
   ============================================================ */
FILMS['produit-quotient']=function(outils){
  const {panneau,legende,lisse}=outils;
  const DUR={'00-accroche':7.435,'01-bits':16.64,'01q-question':15.54,'01r-reponse':9.05,'02-question':8.33,'03-abonne':6.045};
  const C0='00-accroche',X='01-bits',Q='01q-question',R='01r-reponse',D='02-question',F='03-abonne';
  const {clips,A,CL,m,ec,J,FIN}=chrono('produit-quotient',DUR,{[Q]:3.3,[D]:1.5});
  const acc=A[C0],x=A[X],q=A[Q],r=A[R],d=A[D],f=A[F];
  document.body.classList.add('cartes-en-ligne');

  /* ---- La salle des coffres : un mur de petits casiers ---- */
  poserPiece(0xcfdbe6,0x75879a,0x4c5d6f);
  const matCasier=new THREE.MeshBasicMaterial({color:0xbccbd9}), matBouton=new THREE.MeshBasicMaterial({color:0x9fb1c3});
  for(let l=0;l<9;l++) for(let c=0;c<11;c++){ const cx=-3.75+c*.75, cy=.72+l*.75;
    const b=new THREE.Mesh(new THREE.PlaneGeometry(.68,.68),matCasier); b.position.set(cx,cy,-2.36); scene3d.add(b);
    const o=new THREE.Mesh(new THREE.CircleGeometry(.06,12),matBouton); o.position.set(cx+.2,cy,-2.34); scene3d.add(o); }

  /* ---- Le coffre ---- */
  const coffre=new THREE.Group(); coffre.position.set(.98,0,0); scene3d.add(coffre);
  piece(coffre,new RoundedBoxGeometry(2.1,3.05,.6,3,.1),toon(0x46566a),[0,1.6,0],CONTOUR_FIN);
  piece(coffre,new RoundedBoxGeometry(1.9,2.82,.05,2,.04),toon(0x66788c),[0,1.6,.3],CONTOUR_FIN);
  for(const px of [-.72,.72]) piece(coffre,new RoundedBoxGeometry(.34,.12,.5,2,.04),toon(0x2f3c4c),[px,.05,0],CONTOUR_FIN);
  /* L'écran : le compteur */
  piece(coffre,new RoundedBoxGeometry(1.74,.58,.04,2,.02),toon(0x0f2238),[0,2.68,.33],null);
  const ecr=ecran3d(1.68,.52,[0,2.68,.36],coffre);
  const BL='#9fd0ff',OR='#ff9f43',VE='#7ee787';
  const afficher=(k,s,c)=>ecr.ecrire(k,(g,w,h)=>{ if(!s) return; let tp=108; g.font=`800 ${tp}px "Segoe UI"`; const lg=g.measureText(s).width; if(lg>w-24){ tp=Math.floor(tp*(w-24)/lg); g.font=`800 ${tp}px "Segoe UI"`; } g.fillStyle=c; g.textAlign='center'; g.textBaseline='middle'; g.fillText(s,w/2,h/2+4); });
  /* La plaque des interrupteurs */
  piece(coffre,new RoundedBoxGeometry(1.8,.92,.03,2,.02),toon(0x2b3746),[0,1.84,.33],null);
  const inter=[]; for(let i=0;i<10;i++){ const g=new THREE.Group(); coffre.add(g);
    const mt=toon(0x1971c2); piece(g,new RoundedBoxGeometry(.2,.34,.04,2,.02),mt,[0,0,0],CONTOUR_FIN);
    const bouton=piece(g,new RoundedBoxGeometry(.12,.14,.06,2,.02),toon(0xf4f7fa),[0,.07,.04],null); inter.push({g,mt,bouton}); }
  /* Les 128 bits : de toutes petites cases */
  const grille=ecran3d(1.76,.88,[0,1.84,.36],coffre); grille.mesh.visible=false;
  /* Le volant */
  const volant=new THREE.Group(); volant.position.set(0,.84,.36); coffre.add(volant);
  piece(volant,new THREE.TorusGeometry(.36,.05,10,28),toon(0xd7dee6),[0,0,0],CONTOUR_FIN);
  for(const a of [0,1.047,2.094]){ const b=piece(volant,new RoundedBoxGeometry(.72,.05,.04,2,.015),toon(0xd7dee6),[0,0,0],null); b.rotation.z=a; }
  piece(volant,new THREE.SphereGeometry(.09,14,12),toon(0x93a4b3),[0,0,.02],CONTOUR_FIN);

  /* ---- Les clés ---- */
  const matCle=toon(0xf2b632), matCle2=toon(0xc98a12), geoTete=new THREE.TorusGeometry(.075,.03,8,16), geoTige=new THREE.BoxGeometry(.04,.3,.03), geoDent=new THREE.BoxGeometry(.075,.035,.03);
  function uneCle(mt){ const g=new THREE.Group(); const t=new THREE.Mesh(geoTete,mt); const s=new THREE.Mesh(geoTige,mt); s.position.y=-.22; const u=new THREE.Mesh(geoDent,mt); u.position.set(.045,-.33,0); g.add(t,s,u); return g; }
  /* La première clé, grande, levée */
  const cleSeule=new THREE.Group(); cleSeule.rotation.z=-.2; mainD.g.add(cleSeule);
  piece(cleSeule,new THREE.TorusGeometry(.2,.06,10,22),matCle,[0,1.02,0],CONTOUR_FIN);
  piece(cleSeule,new RoundedBoxGeometry(.1,.78,.06,2,.02),matCle,[0,.42,0],CONTOUR_FIN);
  piece(cleSeule,new RoundedBoxGeometry(.2,.07,.06,2,.02),matCle,[.13,.1,0],CONTOUR_FIN);
  piece(cleSeule,new RoundedBoxGeometry(.15,.07,.06,2,.02),matCle,[.1,.24,0],CONTOUR_FIN);
  /* Le trousseau : un anneau, 8 clés en éventail, puis une énorme boule de 128 clés */
  const trousseau=new THREE.Group(); mainD.g.add(trousseau);
  piece(trousseau,new THREE.TorusGeometry(.12,.024,8,20),toon(0x93a4b3),[0,-.16,.08],CONTOUR_FIN);
  const cles=[]; const ANG=2.399963;
  for(let i=0;i<128;i++){ const k=uneCle(i%3===1?matCle2:matCle); trousseau.add(k);
    if(i<8){ const a=-1.3+i*2.25/7; k.position.set(Math.sin(a)*.3,-.16-Math.cos(a)*.3,.08+i*.004); k.rotation.z=a; k.scale.setScalar(1.75); }
    else { const u=(i-8)/119, y=1-2*u, ra=Math.sqrt(Math.max(0,1-y*y)), th=i*ANG, R0=.3+.27*((i*7)%10)/9;
      const dx=ra*Math.cos(th), dz=ra*Math.sin(th); k.position.set(dx*R0,-.64+y*R0,.12+dz*R0); k.rotation.set(dz*.7,dx*.7,th); }
    cles.push(k); }

  /* Chaque rang de la voix, chaque geste : tout est calculé depuis T */
  const bit=(i,T,v)=>{ const n=Math.floor(T*v+i*.37); return ((n*2654435+i*977)>>>5)&1; };
  const entre=(T,t,dur=.25)=>lisse((T-t)/dur);
  const flash=(T,t)=>{ const v=(T-t)/.42; return v>0&&v<1?Math.sin(v*Math.PI):0; };

  function interrupteurs(T){
    const modeQ=T>=q&&T<d, modeD=T>=d;
    inter.forEach((s,i)=>{ s.g.visible=false; });
    grille.mesh.visible=modeD&&T<f;
    if(modeD||T<acc) return;
    if(!modeQ){
      for(let i=0;i<7;i++){ const s=inter[i], bleu=i<3;
        const apparait=T<x?(bleu?m(C0,4)+i*.12:m(C0,8)+(i-3)*.1):(bleu?-1:m(X,9)+(i-3)*.1);
        const v=entre(T,apparait); s.g.visible=v>0;
        let pop=0; if(T>=x){ if(bleu) pop=Math.max(flash(T,m(X,0)),flash(T,m(X,15)),flash(T,m(X,17))); else pop=Math.max(flash(T,m(X,9)),flash(T,m(X,19)),flash(T,m(X,21))); pop=Math.max(pop,flash(T,m(X,26)+i*.09)); }
        s.g.position.set(-.72+i*.24,1.84,.36); s.g.scale.setScalar(.92*v*(1+.3*pop));
        s.mt.color.setHex(bleu?(pop>.1?0x74c0fc:0x1971c2):(pop>.1?0xffc078:0xe8590c));
        const haut=T<m(C0,4)?1:(T>=x&&T<m(X,1)?1:bit(i,T,T<x?5:(T>=m(X,26)?7:2.5))); s.bouton.position.y=haut?.07:-.07; }
    } else {
      for(let i=0;i<10;i++){ const s=inter[i], bleu=i<5, l=i%5;
        const v=entre(T,(bleu?m(Q,3):m(Q,7))+l*.06); s.g.visible=v>0;
        const pop=T>=r?Math.max(flash(T,m(R,9)-(bleu?0:9e3)+l*.05),flash(T,m(R,11)+l*.05-(bleu?9e3:0))):0;
        s.g.position.set(-.6+l*.3,bleu?2.05:1.63,.36); s.g.scale.setScalar(.92*v*(1+.3*pop));
        s.mt.color.setHex(bleu?0x1971c2:0xe8590c);
        s.bouton.position.y=bit(i,T,3)?.07:-.07; }
    }
  }
  /* Les 128 cases de la question finale */
  function casesBits(T){
    if(!grille.mesh.visible) return;
    const n=Math.min(128,Math.floor(128*Math.max(0,(T-m(D,4))/.75))), tic=Math.floor(T*4);
    grille.ecrire(n+'/'+tic,(g,w,h)=>{ const cw=w/16, ch=h/8; for(let i=0;i<n;i++){ const c=i%16, l=(i-c)/16; g.fillStyle=bit(i,tic/4,4)?'#ff9f43':'#74c0fc'; g.fillRect(c*cw+3,l*ch+3,cw-6,ch-6); } });
  }
  function compteur(T){
    if(T<m(C0,5)) return afficher('v','', BL);
    if(T<x){ if(T<m(C0,9)) return afficher('3b','3 bits',BL); if(T<m(C0,12)) return afficher('34b','3 + 4 bits',BL); return afficher('qc','? clés',OR); }
    if(T<q){ if(T<m(X,1)) return afficher('v2','',BL); if(T<m(X,5)) return afficher('3b','3 bits',BL); if(T<m(X,6)) return afficher('8','8',VE); if(T<m(X,10)) return afficher('8c','8 clés',VE);
      if(T<m(X,29)) return afficher('qc','? clés',OR); if(T<m(X,31)) return afficher('128','128',VE); return afficher('128c','128 clés',VE); }
    if(T<r) return afficher('v3','',BL);
    if(T<d){ if(T<m(R,12)) return afficher('v3','',BL); if(T<m(R,13)) return afficher('10','2¹⁰',VE); if(T<m(R,15)) return afficher('1024','1 024',VE); return afficher('1024c','1 024 clés',VE); }
    if(T<m(D,6)) return afficher('v4','',BL); if(T<m(D,9)) return afficher('128b','128 bits',BL); return afficher('qc','? clés',OR);
  }

  /* ---- Le panneau ---- */
  const lignes=lignesPanneau(outils,2);
  const ACC=J(C0,[[4,ba('3')],[5,ba(' bits')],[7,' + '],[8,ex('4')],[9,ex(' bits')],[13,' = '+ex('?')]]);
  const A1=J(X,[[2,ba('2')],[4,sup('3')+' '],[5,'= '+ok('8')],[6,ok(' clés')]]);
  const A2=J(X,[[11,'× '],[12,ba('2')],[14,sup('4')]]);
  const B1=J(X,[[15,ba('2')],[17,sup('3')+' '],[18,'× '],[19,ba('2')],[21,sup('4')+' '],[23,'= '+ba('2')],[25,sup('3 + 4')]]);
  const B2=J(X,[[26,'= '+ba('2')],[28,sup('7')+' '],[29,'= '+ok('128')],[31,ok(' clés')]]);
  const E=J(D,[[4,'128 '],[6,'bits : '],[13,ba('2')+sup('?')+' clés']]);
  const rangees=T=>{ if(T<m(X,2)) return [ACC]; if(T<m(X,15)) return [A1,A2]; return [B1,B2]; };

  /* ---- Les écrits ---- */
  const groupes=[
    {de:acc+.1,a:m(C0,10),top:352,fs:62,phrases:[ec(C0,'0:Une 1:clé 2:secrète 3:de 4:3 5:bits.'),ec(C0,'6:On 7:ajoute 8:4 9:bits.')]},
    {de:m(C0,10),a:x,top:60,fs:64,phrases:[ec(C0,'10:Combien 11:de 12:clés 13:possibles ?')]},
    {de:x,a:m(X,22),top:60,fs:64,phrases:[ec(X,'0:3 1:bits :'),ec(X,'7:On 8:ajoute 9:4 10:bits :')]},
    {de:m(X,22),a:q,top:60,fs:64,phrases:[ec(X,'22:On 23:additionne'),ec(X,'24:les 25:exposants.')]},
    {de:d+.05,a:m(D,10),top:60,fs:64,phrases:[ec(D,'0:Et 1:une 2:clé 3:de 4:128 6:bits :'),ec(D,'7:combien 8:de 9:clés ?')]},
    {de:m(D,10),a:f,top:60,fs:58,phrases:[ec(D,'10:Écris-le 11:avec 12:une 13:puissance,'),ec(D,'14:et 15:réponds 16:en 17:commentaire !')]}
  ];
  const tics=[];
  for(const t of [m(C0,4),m(C0,8),m(X,9)]) tics.push({t,f:520});
  for(const i of [5,29]) tics.push({t:m(X,i),f:880});
  tics.push({t:m(X,31),f:190},{t:m(R,13),f:190});
  for(let i=0;i<3;i++) tics.push({t:q+DUR[Q]+.1+i,f:760});

  poserMiniature(outils,m(C0,13)+.3,'3 bits + 4 bits<div style="color:#e8590c;font-size:104px;margin-top:8px">COMBIEN DE CLÉS ?</div>');

  return { clips,FIN,tics,titre:'Le coffre-fort',ceinture:0,finTitre:m(C0,10),groupes,finClip:F,
    cuts:[q,d,f],
    question:{ qc:Q,rc:R,finR:d,cpt:q+DUR[Q]+.1,bonne:0,tBon:CL[R][1][0],
      phrase:[ec(Q,'3:2⁵ 4:× 7:2⁵ ?')],
      pause:[ec(Q,'20:Mets 21:pause,'),ec(Q,'22:et 23:choisis !')],
      choix:[[puiss('2','10'),m(Q,8)-q,m(Q,11)-q],[puiss('4','10'),m(Q,12)-q,m(Q,15)-q],[puiss('2','25'),m(Q,16)-q,m(Q,19)-q]],
      tete:[[r+.1,'Réponse '],[m(R,1),'A :']],reponse:[ec(R,'4:2¹⁰.')],suite:[ec(R,'5:La 6:base 7:reste 8:2 :'),ec(R,'9:5 10:+ 11:5 12:= 10.'),ec(R,'13:1 14:024 15:clés.')] },
    jouer(PO,T,cam){
      const g=gestes(PO,T), dansQ=T>=q&&T<d, dansF=T>=f;
      coffre.visible=!dansF;
      scene.ry=0; scene.z=-.5; scene.x=-1.3;
      cam.x=0; cam.e=.02; cam.d=11.6; cam.y=2.15;
      if(dansQ){ cam.d=12; cam.y=3.1; }
      if(dansF){ scene.x=0; scene.z=0; scene.ry=-.12; cam.d=12; cam.y=3.9; }

      interrupteurs(T); casesBits(T); compteur(T);
      /* Le volant tourne quand on calcule ; le coffre saute à chaque résultat */
      volant.rotation.z=-(entre(T,m(C0,4),1)+entre(T,m(C0,8),1)+entre(T,m(X,5),1)+entre(T,m(X,29),1.2)+entre(T,m(R,13),1.2))*2.2;
      let sy=0; for(const s of [m(X,5),m(X,29),m(R,13)]){ const v=(T-s)/.5; if(v>0&&v<1) sy=Math.max(sy,.3*Math.sin(v*Math.PI)); }
      coffre.position.y=sy;

      /* La clé, puis le trousseau */
      const voitSeule=T>=m(C0,1)&&T<m(X,5);
      const t8=m(X,5), t128=m(X,29), tR=m(R,13);
      const avecTr=(T>=t8&&T<q)||(T>=tR&&T<d);
      cleSeule.visible=voitSeule; trousseau.visible=avecTr;
      let poids=0;
      if(avecTr){
        let n=T<q?Math.floor(8*Math.min(1,(T-t8)/.3)+.999):128;
        if(T<q&&T>=t128) n=8+Math.floor(120*lisse((T-t128)/.85));
        cles.forEach((c,i)=>{ c.visible=i<n; });
        poids=T<q?lisse((T-t128)/.85):1;
        const sc=T>=q?1.12:1; trousseau.scale.setScalar(sc); for(let i=0;i<8;i++) cles[i].scale.setScalar(1.75-.75*poids);
      }

      if(voitSeule){ const v=entre(T,m(C0,1),.3); PO.gesteD='poing'; PO.md.set(.86,1.9+.6*v+Math.sin(T*3)*.04*v,.42); PO.cd.set(.8,1.65+.15*v,.1); PO.regY=.55; PO.tetZ=-.06; }
      else if(T<acc+.1){ g.ouvre(); }
      else if(avecTr){
        const secoue=T<t128?Math.sin(T*9)*.03:0, chute=poids;
        PO.gesteD='poing';
        PO.md.set(.68,2.1-.72*chute+secoue,.5+.14*poids); PO.cd.set(.78-.08*poids,1.66-.38*chute,.22+.12*poids);
        PO.regY=.5*(1-poids); PO.regX=poids*.3; PO.tetX=poids*.08;
        if(poids>0){ PO.tx+=.38*chute; PO.tz-=.17*chute; PO.hanche-=.24*chute; PO.ecrase=.05*chute; PO.paupiere=-1.1*chute+(PO.paupiere||0)*(1-chute); }
      }
      else if(T<q){ g.ouvre(); }
      else if(T<r){ g.reflechit(); }
      else if(T<d){ T<m(R,1)?g.ouvre():g.pouce(); }
      else if(T<f){ T<m(D,10)?g.reflechit():g.montre(); PO.regY=.55; }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ cam.y=2.9; cam.d=11.6; PO.jaw=.62; }

      const voirP=(T>=m(C0,4)&&T<q)||(T>=m(D,4)&&T<f);
      panneau.style.display=voirP?'block':'none';
      if(voirP) lignes(T,T>=d?[E]:rangees(T));
      legende.classList.remove('piege');
    } };
};
