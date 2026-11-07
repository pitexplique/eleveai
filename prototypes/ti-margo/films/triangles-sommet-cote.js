/* Série Triangles 6e, épisode 02 : COMPTER LES TRIANGLES (en classe, au tableau noir).
   Un trait depuis le sommet : 3 triangles, et le grand qu'on oublie. Deux traits : 6. */
FILMS['sommet-cote']=function(outils){
  const DUR={'00-accroche':7.09,'01-un':7.41,'02-trait':4.18,'03-question':9.19,'03b-reponse':9.08,'04-deux-traits':9.46,'05-commentaire':7.45,'06-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'03-question':3.3,'05-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,un,tr,q,r,dx,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['06-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  /* ---- La salle de classe ---- */
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(90,50),new THREE.MeshBasicMaterial({color:0xbfe3d0})); mur.position.set(0,25,-1.75); scene3d.add(mur);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd9a066})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(90,.28),new THREE.MeshBasicMaterial({color:0x8a5a2b})); plinthe.position.set(0,.14,-1.74); scene3d.add(plinthe);
  const bureau=new THREE.Group(); bureau.position.set(1.5,0,-1); scene3d.add(bureau); const bois=toon(0xa9713a);
  piece(bureau,new RoundedBoxGeometry(1.7,.12,.8,3,.03),bois,[0,1.15,0],CONTOUR_FIN);
  for(const s of [-1,1]) piece(bureau,new RoundedBoxGeometry(.12,1.1,.7,2,.02),bois,[s*.72,.56,0],CONTOUR_FIN);
  piece(bureau,new RoundedBoxGeometry(.72,.1,.5,2,.02),toon(0x4dabf7),[-.25,1.26,0],CONTOUR_FIN);
  piece(bureau,new RoundedBoxGeometry(.64,.1,.46,2,.02),toon(0xe8590c),[-.22,1.36,0],CONTOUR_FIN);
  piece(bureau,new THREE.SphereGeometry(.15,18,14),toon(0xe03131),[.42,1.36,0],CONTOUR_FIN);
  const cartable=new THREE.Group(); cartable.position.set(-2.02,0,-1.1); scene3d.add(cartable);
  piece(cartable,new RoundedBoxGeometry(.7,.62,.28,3,.06),toon(0xf5a50a),[0,.31,0],CONTOUR_FIN);
  piece(cartable,new RoundedBoxGeometry(.44,.26,.04,2,.02),toon(0xd9480f),[0,.25,.15],null);

  const tab=poserTableau({L:4.3,H:3,x:0,y:4.55,fond:'#21453a',bois:0x8a5a2b,pieds:false});
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} #cA,#cB,#cC{display:inline-flex;width:27%;margin:8px 8px;box-sizing:border-box;}'; document.head.append(css);

  /* ---- La figure : un seul triangle, puis des traits depuis le sommet ---- */
  const CR='#f8f9fa', JA='#ffd43b', OR='#ff922b', BL='#74c0fc', RO='#ff8787', VE='#8ce99a', CO=CR;
  const S=[516,74],B=[110,640],D=[922,640], X1=[405,640],X2=[650,640], T3=[[300,640],[510,640],[710,640]];
  function poly(c,pts,coul,al=.8){ c.save(); c.globalAlpha=al; c.fillStyle=coul; c.beginPath(); pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fill(); c.restore(); }
  const qui=(a,b)=>[S,a,b];
  const tTri=mot('01-un','triangle'), tSom=mot('01-un','3',1), tCot=mot('01-un','3',3), tFac=mot('01-un','1');
  const tDu=mot('02-trait','sommet'), tBas=mot('02-trait','bas');
  const tCe1=mot('03b-reponse','Celui',1), tCe2=mot('03b-reponse','Celui',2), tEt=mot('03b-reponse','Et'), tGr=mot('03b-reponse','grand');
  const tTr2=mot('04-deux-traits','deuxième'), tTr2f=mot('04-deux-traits','trait');
  const tP=mot('04-deux-traits','3',1), tM=mot('04-deux-traits','2',1), tEt2=mot('04-deux-traits','Et'), t6=mot('04-deux-traits','6');
  const t3t=mot('05-commentaire','3',1), tCombien=mot('05-commentaire','combien');

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T<un){ if(T>=mot('00-accroche','oublier')){ texte(c,'?',516,360,330*Math.max(1,pop(T,mot('00-accroche','oublier'))*.8+.2),JA); } tab.maj(); return; }
    let traits=[];
    if(T>=com) traits=T3;
    else if(T>=dx) traits=[X1,X2];
    else if(T>=tr) traits=[X1];
    /* Les couleurs : ce que la voix est en train de compter */
    if(T>=r&&T<dx){
      if(T>=tCe1&&T<tCe2) poly(c,qui(B,X1),OR);
      if(T>=tCe2&&T<tEt) poly(c,qui(X1,D),BL);
      if(T>=tEt) poly(c,qui(B,D),JA,.8+.15*Math.sin((T-tEt)*7));
    }
    if(T>=dx&&T<com){
      const coul=[OR,BL,VE];
      if(T>=tP&&T<tM){ [[B,X1],[X1,X2],[X2,D]].forEach(([a,b],i)=>{ if(T>=tP+i*.32) poly(c,qui(a,b),coul[i]); }); texte(c,'3 petits',180,130,66,OR); }
      if(T>=tM&&T<tEt2){ const k=((T-tM)/.7|0)%2; poly(c,k?qui(X1,D):qui(B,X2),k?BL:OR); texte(c,'2 moyens',190,130,66,OR); }
      if(T>=tEt2){ poly(c,qui(B,D),JA,T<t6?.8+.15*Math.sin((T-tEt2)*7):.72); if(T<t6) texte(c,'le grand',180,130,66,JA); }
      if(T>=t6){ const z=Math.max(1,pop(T,t6)); texte(c,'6',760,130,110*z,JA); texte(c,'triangles',850+40*(z-1),215,60,JA); }
    }
    /* Le triangle */
    const u=(T-tTri)/.6;
    const epais=T>=tCot&&T<tFac?18:11;
    trait(c,S,B,u*3,CO,epais); trait(c,B,D,u*3-1,CO,epais); trait(c,D,S,u*3-2,CO,epais);
    /* Les traits : le premier se trace pendant que la voix va du sommet au bas */
    traits.forEach((x,i)=>{ let v=1;
      if(T<dx&&T>=tr) v=(T-tDu)/(tBas-tDu);
      if(T>=dx&&T<com&&i===1) v=(T-tTr2)/(tTr2f-tTr2+.3);
      if(T>=com) v=(T-t3t-i*.25)/.3;
      trait(c,S,x,v,JA,10); });
    if(T>=tSom){ const z=T<tSom+.5?pop(T,tSom):1; for(const p of [S,B,D]) point(c,p,17*Math.max(1,z),OR); }
    if(T>=tSom&&T<tFac) texte(c,'3 sommets',185,130,58,OR);
    if(T>=tCot&&T<tFac) texte(c,'3 côtés',850,130,58,CR);
    if(T>=tFac&&T<tr){ texte(c,'1',516,430,170*Math.max(1,pop(T,tFac)),JA); }
    if(T>=com&&T>=tCombien) texte(c,'?',880,130,130*Math.max(1,pop(T,tCombien)),JA);
    tab.maj();
  }

  /* ---- Les écrits ---- */
  const a0=dit('00-accroche'), a1=dit('01-un'), a2=dit('02-trait'), a4=dit('04-deux-traits'), a5=dit('05-commentaire'), qd=dit('03-question'), rd=dit('03b-reponse');
  const groupes=[
    groupe(acc+.1,acc+4.35,352,62,a0('Salut !'),a0('Tu sais compter les triangles ?')),
    groupe(acc+4.35,un,60,62,a0('Tu paries que tu vas'),a0('en oublier un ?')),
    groupe(un+.1,un+2.2,60,62,a1('Voici un triangle.')),
    groupe(un+2.2,un+4.8,60,62,a1('3 sommets, 3 côtés.')),
    groupe(un+4.8,tr,60,62,a1('Facile : 1 triangle.')),
    groupe(tr+.1,q,60,58,a2('Je trace un trait,'),a2('du sommet du haut'),a2('jusqu’au côté du bas.')),
    groupe(dx+.1,dx+2.4,60,62,a4('Je trace un deuxième trait.')),
    groupe(dx+2.4,dx+5.7,60,62,a4('3 petits.'),a4('2 moyens.')),
    groupe(dx+5.7,dx+7.2,60,62,a4('Et le grand.')),
    groupe(dx+7.2,com,60,62,a4('6 triangles !')),
    groupe(com+.1,com+5.2,60,62,a5('À toi : avec 3 traits'),a5('depuis le sommet,'),a5('combien de triangles ?')),
    groupe(com+5.2,f,60,62,a5('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de triangles'),qd('maintenant ?')];
  const tq=m=>mot('03-question',m)-q;
  qd.saute(6); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('3 !'), rs=[rd('Celui de gauche.'),rd('Celui de droite.'),rd('Et le grand,'),rd('que tout le monde oublie !')];

  poserMiniature(outils,acc+1,'Combien de triangles ?'+PARI,`<svg width="340" height="270" viewBox="0 0 400 310"><path d="M200 20L20 290H380Z" fill="#21453a" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><path d="M200 20L150 290M200 20L270 290" stroke="#ffd43b" stroke-width="9"/></svg>`);

  return { clips,FIN,titre:'Compte les triangles !',ceinture:0,finTitre:acc+4.35,groupes,finClip:'06-abonne',
    cuts:[acc+4.35,q,r,dx,com,f],
    question:{ qc:'03-question',rc:'03b-reponse',finR:dx,cpt:fin('03-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2',tq('A'),tq('2')],['3',tq('B'),tq('3')],['4',tq('C'),tq('4')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B :']],reponse:[r1],suite:rs },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<dx, dansF=T>=f, gros=T<acc+4.35;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      tab.g.scale.setScalar(dansQ?.66:1); tab.g.position.set(dansQ?1.07:0,dansQ?3.62:4.55,-1.5);
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=2.15; }
      if(dansQ){ scene.x=-1.02; cam.d=11.4; cam.y=3.55; }
      if(dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<un) g.reflechit();
      else if(T<q){ T>=tFac&&T<tr?g.pouce():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<dx){ if(T>=tEt){ g.oups(); scene.ry=.25; } else T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=t6?g.pouce():g.montre(); }
      else if(T<f){ T<com+5.2?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); }
    } };
};
