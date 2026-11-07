/* Série Triangles 6e, épisode 03 : LES 9 BÂTONNETS (dans l'atelier).
   Chaque côté est fait de vrais bâtonnets : la longueur se compte. 3-3-3, 4-4-1, 2-3-4 ; 5-2-2 ne ferme pas. */
FILMS['type-cote']=function(outils){
  const {$}=outils;
  const DUR={'00-accroche':12.03,'01-equilateral':6.39,'02-question':15.51,'02b-reponse':6.95,'03-quelconque':6.81,'04-rate':12.02,'05-commentaire':7.3,'06-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'05-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,eq,q,r,ql,ra,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['06-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  /* ---- L'atelier ---- */
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(90,50),new THREE.MeshBasicMaterial({color:0xe7c79a})); mur.position.set(0,25,-1.75); scene3d.add(mur);
  for(let y=.55;y<12;y+=1.1){ const l=new THREE.Mesh(new THREE.PlaneGeometry(90,.035),new THREE.MeshBasicMaterial({color:0xc69c68})); l.position.set(0,y,-1.74); scene3d.add(l); }
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xb7b0a3})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const etabli=new THREE.Group(); etabli.position.set(1.5,0,-1); scene3d.add(etabli); const bois=toon(0x9c6431);
  piece(etabli,new RoundedBoxGeometry(1.75,.16,.8,3,.03),bois,[0,1.2,0],CONTOUR_FIN);
  for(const s of [-1,1]) piece(etabli,new RoundedBoxGeometry(.16,1.15,.16,2,.02),bois,[s*.72,.58,.28],CONTOUR_FIN);
  /* Le marteau et le pot de bâtonnets, sur l'établi */
  piece(etabli,new THREE.CylinderGeometry(.045,.045,.8,10),toon(0xd9a066),[.28,1.33,.1],CONTOUR_FIN).rotation.z=1.25;
  piece(etabli,new RoundedBoxGeometry(.2,.34,.2,2,.03),toon(0x5c6b7a),[-.08,1.42,.1],CONTOUR_FIN);
  piece(etabli,new THREE.CylinderGeometry(.2,.17,.42,14),toon(0x1971c2),[-.55,1.49,0],CONTOUR_FIN);
  for(const [x,z,rz] of [[-.05,0,.1],[.05,.05,-.16],[0,-.06,-.03]]) piece(etabli,new THREE.CylinderGeometry(.025,.025,.8,8),toon(0xe8590c),[-.55+x,1.8,z],CONTOUR_FIN).rotation.z=rz;
  const planches=new THREE.Group(); planches.position.set(-1.92,0,-1.1); scene3d.add(planches);
  for(let i=0;i<4;i++) piece(planches,new RoundedBoxGeometry(.78,.14,.4,2,.02),toon(i%2?0xc48a4a:0xa9713a),[0,.08+i*.15,0],CONTOUR_FIN);

  const tab=poserTableau({L:4.3,H:3,x:0,y:4.55,fond:'#fff8ea',bois:0x7a4a1f,pieds:false});
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* ---- Les bâtonnets ---- */
  const BA='#e8892b', BA2='#c9651a', ENC='#17452a', ORA='#d9480f', VE='#2f9a3a';
  /* n bâtonnets de a vers b ; k : combien sont déjà posés (peut être fractionnaire) */
  function batons(c,a,b,n,ep=20,k=n){ for(let i=0;i<Math.min(n,Math.ceil(k));i++){ const v=Math.min(1,k-i);
      const p=i/n,q2=(i+v)/n, g=.012*n/n*0+3/Math.hypot(b[0]-a[0],b[1]-a[1])*1.0;
      const A1=[a[0]+(b[0]-a[0])*(p+g),a[1]+(b[1]-a[1])*(p+g)], B1=[a[0]+(b[0]-a[0])*(q2-g),a[1]+(b[1]-a[1])*(q2-g)];
      c.lineCap='butt'; c.strokeStyle='#6b3f15'; c.lineWidth=ep+5; c.beginPath(); c.moveTo(A1[0],A1[1]); c.lineTo(B1[0],B1[1]); c.stroke();
      c.strokeStyle=i%2?BA2:BA; c.lineWidth=ep; c.beginPath(); c.moveTo(A1[0],A1[1]); c.lineTo(B1[0],B1[1]); c.stroke(); } }
  /* Les trois sommets d'un triangle de côtés a (gauche), b (droite), c (base) */
  function sommets(a,b,base,u,cx,yb){ const x=(a*a+base*base-b*b)/(2*base), y=Math.sqrt(Math.max(0,a*a-x*x)); const G=[cx-base*u/2,yb], D=[cx+base*u/2,yb], H=[G[0]+x*u,yb-y*u]; return {G,D,H}; }
  /* Une rangée de n bâtonnets debout */
  function rangee(c,n,cx,y,h=170,pas=62,tPop=0,T=1e9,de=.05){ const x0=cx-(n-1)*pas/2; for(let i=0;i<n;i++){ if(T<tPop+i*de) break; const z=Math.min(1,(T-tPop-i*de)/.12); batons(c,[x0+i*pas,y+h/2],[x0+i*pas,y+h/2-h*z],1,24); } }
  function numero(c,n,a,b,dx,dy,T,t,coul=ENC,taille=76){ if(T>=t) texte(c,n,(a[0]+b[0])/2+dx,(a[1]+b[1])/2+dy,taille*Math.max(1,pop(T,t)),coul); }

  const t9=mot('00-accroche','9'), tCombien=mot('00-accroche','Combien'), tUt=mot('00-accroche','utiliser');
  const e=[mot('01-equilateral','3',1),mot('01-equilateral','3',2),mot('01-equilateral','3',4)], tEg=mot('01-equilateral','égaux'), tEq=mot('01-equilateral','équilatéral');
  const q4=[mot('02-question','4',1),mot('02-question','4',2),mot('02-question','1')];
  const tIso=mot('02b-reponse','isocèle'), tEg2=mot('02b-reponse','deux'), tPiz=mot('02b-reponse','part');
  const l=[mot('03-quelconque','2'),mot('03-quelconque','3',1),mot('03-quelconque','4')], tDif=mot('03-quelconque','différentes'), tQ=mot('03-quelconque','quelconque');
  const x5=mot('04-rate','5'), x2=[mot('04-rate','2',1),mot('04-rate','2',3)], tAie=mot('04-rate','Aïe'), tFerme=mot('04-rate','ferme'), tAvec=mot('04-rate','Avec'), t3=mot('04-rate','3'), tFam=mot('04-rate','Un');
  const t12=mot('05-commentaire','12'), tComb2=mot('05-commentaire','combien');

  function dessiner(T){ const c=tab.c; tab.effacer(); const cx=600;
    if(T<eq){ rangee(c,9,516,240,190,88,t9,T);
      if(T>=t9) texte(c,'9 bâtonnets',516,90,80,ENC);
      if(T>=mot('00-accroche','triangle')&&T<tCombien){ const s=sommets(3,3,3,80,620,620); for(const [a,b] of [[s.G,s.D],[s.D,s.H],[s.H,s.G]]) trait(c,a,b,1,'#d5c4a8',8); }
      if(T>=tCombien) texte(c,'?',620,510,190*Math.max(1,pop(T,tCombien)),ORA);
      tab.maj(); return; }
    if(T<q){ const s=sommets(3,3,3,150,cx,575);
      const z=T>=tEg&&T<tEg+.8?26:20;
      batons(c,s.G,s.H,3,z,(T-e[0])/.14*3); batons(c,s.H,s.D,3,z,(T-e[1])/.14*3); batons(c,s.G,s.D,3,z,(T-e[2])/.14*3);
      numero(c,'3',s.G,s.H,-66,-20,T,e[0],ORA); numero(c,'3',s.H,s.D,66,-20,T,e[1],ORA); numero(c,'3',s.G,s.D,0,58,T,e[2],ORA,70);
      if(T>=tEq) texte(c,'équilatéral',516,92,96*Math.max(1,pop(T,tEq)*.5+.5),VE);
      tab.maj(); return; }
    if(T<ql){ const s=sommets(4,4,1,132,620,625);
      /* La part de pizza, au mot « pizza » */
      if(T>=tPiz){ c.fillStyle='#ffd43b'; c.beginPath(); c.moveTo(s.G[0],s.G[1]); c.lineTo(s.H[0],s.H[1]); c.lineTo(s.D[0],s.D[1]); c.closePath(); c.fill();
        c.fillStyle='#e03131'; for(const [x,y] of [[620,200],[604,400],[640,320],[622,510],[598,580]]){ c.beginPath(); c.arc(x,y,y<300?13:19,0,7); c.fill(); } }
      batons(c,s.G,s.H,4,20,(T-q4[0])/.14*4); batons(c,s.H,s.D,4,20,(T-q4[1])/.14*4); batons(c,s.G,s.D,1,20,(T-q4[2])/.14);
      numero(c,'4',s.G,s.H,-74,0,T,q4[0],ORA,100); numero(c,'4',s.H,s.D,74,0,T,q4[1],ORA,100); numero(c,'1',s.G,s.D,-112,-6,T,q4[2],ORA,90);
      if(T>=tIso) texte(c,'isocèle',270,300,112*Math.max(1,pop(T,tIso)*.5+.5),VE);
      tab.maj(); return; }
    if(T<ra){ const s=sommets(2,3,4,150,cx,575);
      batons(c,s.G,s.H,2,20,(T-l[0])/.14*2); batons(c,s.H,s.D,3,20,(T-l[1])/.14*3); batons(c,s.G,s.D,4,20,(T-l[2])/.14*4);
      numero(c,'2',s.G,s.H,-58,-30,T,l[0],ORA); numero(c,'3',s.H,s.D,58,-40,T,l[1],ORA); numero(c,'4',s.G,s.D,0,58,T,l[2],ORA,70);
      if(T>=tQ) texte(c,'quelconque',516,110,96*Math.max(1,pop(T,tQ)*.5+.5),VE);
      tab.maj(); return; }
    if(T<com){
      if(T<tAvec){ /* 5, 2 et 2 : les petits se lèvent, tournent, et ne se touchent pas */
        const u=140, G=[cx-2.5*u,560], D=[cx+2.5*u,560];
        batons(c,G,D,5,20,(T-x5)/.14*5);
        numero(c,'5',G,D,0,58,T,x5,ORA,70);
        const chute=Math.max(0,T-(tFerme+.75)), dy=1400*chute*chute;
        /* angle : debout au départ, couché sur la base au moment du « Aïe » */
        const th=(90-68*lisse((T-x2[1])/(tAie-x2[1])))*Math.PI/180+(T>=tAie?Math.sin((T-tAie)*14)*.03*Math.max(0,1-(T-tAie)):0);
        const dg=[Math.cos(th)*2*u,-Math.sin(th)*2*u], Pg=[G[0]+dg[0],G[1]+dg[1]], Pd=[D[0]-dg[0],D[1]+dg[1]];
        c.save(); c.translate(0,dy);
        if(T>=x2[0]) batons(c,G,Pg,2,20); if(T>=x2[1]) batons(c,D,Pd,2,20);
        if(T>=x2[0]) texte(c,'2',(G[0]+Pg[0])/2-Math.sin(th)*54,(G[1]+Pg[1])/2-Math.cos(th)*54,72,ORA); if(T>=x2[1]) texte(c,'2',(D[0]+Pd[0])/2+Math.sin(th)*54,(D[1]+Pd[1])/2-Math.cos(th)*54,72,ORA);
        if(T>=tAie&&dy<40){ /* L'écart : ça ne ferme pas */
          c.setLineDash([16,14]); c.strokeStyle=COUL.piege; c.lineWidth=9; c.beginPath(); c.moveTo(Pg[0],Pg[1]); c.lineTo(Pd[0],Pd[1]); c.stroke(); c.setLineDash([]);
          texte(c,'?',cx,Pg[1]-80,110*Math.max(1,pop(T,tAie)),COUL.piege); }
        c.restore();
        tab.maj(); return; }
      /* Les 3 triangles possibles */
      if(T>=t3){ texte(c,'3 triangles',516,100,92*Math.max(1,pop(T,t3)*.5+.5),ENC);
        [[3,3,3,200,'équilatéral'],[4,4,1,516,'isocèle'],[2,3,4,835,'quelconque']].forEach(([a,b,ba,x,nom],i)=>{ if(T<t3+i*.2) return; const s=sommets(a,b,ba,80,x,500);
          batons(c,s.G,s.H,a,11); batons(c,s.H,s.D,b,11); batons(c,s.G,s.D,ba,11);
          if(T>=tFam+i*.2) texte(c,nom,x,585,52,VE); });
      } else rangee(c,9,516,300,190,88,tAvec,T,0);
      tab.maj(); return; }
    /* À toi : 12 bâtonnets */
    rangee(c,12,516,300,190,76,t12,T);
    if(T>=t12) texte(c,'12 bâtonnets',516,110,84,ENC);
    if(T>=tComb2) texte(c,'?',640,560,130*Math.max(1,pop(T,tComb2)),ORA);
    tab.maj();
  }

  /* Les 9 bâtonnets de l'accroche, avant que le tableau n'arrive */
  const neuf=document.createElement('div'); neuf.className='cv'; neuf.style.cssText='left:600px;top:640px;z-index:4;display:none;';
  neuf.innerHTML='<svg width="430" height="230" viewBox="0 0 430 230">'+Array.from({length:9},(_,i)=>`<rect class="b" x="${6+i*47}" y="10" width="28" height="205" rx="4" fill="${i%2?BA2:BA}" stroke="#6b3f15" stroke-width="4"/>`).join('')+'</svg>'; document.body.append(neuf);

  /* ---- Les écrits ---- */
  const a0=dit('00-accroche'), a1=dit('01-equilateral'), a3=dit('03-quelconque'), a4=dit('04-rate'), a5=dit('05-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,acc+3.35,352,62,a0('Salut !'),a0('J’ai 9 bâtonnets.')),
    groupe(acc+3.35,acc+7.4,60,60,a0('Je veux faire un triangle,'),a0('et je dois tous les utiliser.')),
    groupe(acc+7.4,eq,60,60,a0('Combien de triangles'),a0('différents ?'),a0('Tu paries ?')),
    groupe(eq+.1,eq+3.25,60,62,a1('Premier essai : 3, 3 et 3.')),
    groupe(eq+3.25,q,60,62,a1('Trois côtés égaux :'),a1('équilatéral !')),
    groupe(ql+.1,ql+3.4,60,60,a3('Troisième essai : 2, 3 et 4.')),
    groupe(ql+3.4,ra,60,62,a3('Trois longueurs différentes :'),a3('quelconque !')),
    groupe(ra+.1,ra+3.85,60,62,a4('Et 5, 2 et 2 ?'),a4('Aïe !')),
    groupe(ra+3.85,ra+5.85,60,62,a4('Ça ne ferme pas !')),
    groupe(ra+5.85,ra+9.95,60,62,a4('Avec 9 bâtonnets,'),a4('il n’y a que 3 triangles.')),
    groupe(ra+9.95,com,60,62,a4('Un de chaque famille.')),
    groupe(com+.1,com+5,60,60,a5('À toi : avec 12 bâtonnets,'),a5('combien de triangles'),a5('différents ?')),
    groupe(com+5,f,60,62,a5('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Deuxième essai : 4, 4 et 1.'),qd('Quel triangle ?')];
  const tq=m=>mot('02-question',m)-q;
  qd.saute(6); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('deux côtés égaux, isocèle !'), rs=[rd('Tout pointu,'),rd('comme une part de pizza.')];

  poserMiniature(outils,acc+1,'<span style="font-size:76px">Combien de triangles<br>avec 9 bâtonnets ?</span>'+PARI,`<svg width="340" height="290" viewBox="0 0 340 290"><g stroke="#6b3f15" stroke-width="30" stroke-linecap="round"><path d="M40 260H300M40 260L170 40M300 260L170 40"/></g><g stroke="#e8892b" stroke-width="22" stroke-linecap="round"><path d="M40 260H300M40 260L170 40M300 260L170 40"/></g></svg>`);

  return { clips,FIN,titre:'9 bâtonnets',ceinture:0,finTitre:acc+3.35,groupes,finClip:'06-abonne',
    cuts:[acc+3.35,q,r,ql,ra,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ql,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['équilatéral',tq('A'),tq('équilatéral')],['isocèle',tq('B'),tq('isocèle')],['quelconque',tq('C'),tq('quelconque')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B :']],reponse:[r1],suite:rs },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ql, dansF=T>=f, gros=T<acc+3.35;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      tab.g.scale.setScalar(dansQ?.66:1); tab.g.position.set(dansQ?1.07:0,dansQ?3.36:4.55,-1.5);
      neuf.style.display=gros&&T>=t9&&!window.MINI?'block':'none';
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=2.15; }
      if(dansQ){ scene.x=-1.02; cam.d=11.4; cam.y=3.55; }
      if(dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<eq){ T>=tCombien?g.reflechit():g.montre(); }
      else if(T<q){ T>=tEq?g.pouce():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ql){ T<r+.62?g.ouvre():g.pouce(); if(T>=tPiz) P.jaw=.75; }
      else if(T<ra){ T>=tQ?g.pouce():g.montre(); }
      else if(T<com){ if(T>=tAie&&T<tAvec){ g.oups(); scene.ry=.25; } else T>=t3?g.pouce():g.montre(); }
      else if(T<f){ T<com+5?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); }
    } };
};
