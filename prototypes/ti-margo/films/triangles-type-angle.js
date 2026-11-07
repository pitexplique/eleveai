/* Série Triangles 6e, épisode 04 : L'HORLOGE (dans le salon).
   Trois nombres reliés : un triangle inscrit dans le cadran, donc de vrais angles.
   12-4-8 : 60° partout. 12-3-6 : droit en 3. 12-1-2 : 150° en 1. 12-5-6 : droit en 5 (la question en commentaire). */
FILMS['type-angle']=function(outils){
  const DUR={'00-accroche':12.25,'01-aigu':5.83,'02-droit':8.02,'03-question':13.2,'03b-reponse':6.92,'04-commentaire':11.77,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'03-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,au,dr,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  /* ---- Le salon ---- */
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(90,50),new THREE.MeshBasicMaterial({color:0xfbe3cf})); mur.position.set(0,25,-1.75); scene3d.add(mur);
  for(let x=-8;x<=8;x+=.8){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.28,50),new THREE.MeshBasicMaterial({color:0xf8d8bf})); l.position.set(x,25,-1.74); scene3d.add(l); }
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xc58a52})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(90,.26),new THREE.MeshBasicMaterial({color:0xffffff})); plinthe.position.set(0,.13,-1.73); scene3d.add(plinthe);
  const tapis=new THREE.Mesh(new THREE.CircleGeometry(1.5,40),new THREE.MeshBasicMaterial({color:0xd9485f})); tapis.rotation.x=-Math.PI/2; tapis.scale.set(1.45,.62,1); tapis.position.set(-.3,-.01,.2); scene3d.add(tapis);
  const canape=new THREE.Group(); canape.position.set(1.5,0,-1.05); scene3d.add(canape); const bleu=toon(0x2b8a9e), bleu2=toon(0x1f6f80);
  piece(canape,new RoundedBoxGeometry(1.7,.42,.7,4,.08),bleu,[0,.42,0],CONTOUR_FIN);
  piece(canape,new RoundedBoxGeometry(1.7,.75,.2,4,.07),bleu2,[0,.95,-.28],CONTOUR_FIN);
  for(const s of [-1,1]) piece(canape,new RoundedBoxGeometry(.2,.6,.72,3,.06),bleu2,[s*.84,.56,0],CONTOUR_FIN);
  piece(canape,new RoundedBoxGeometry(.42,.42,.12,3,.05),toon(0xffd43b),[-.38,.85,-.08],CONTOUR_FIN).rotation.z=.25;
  const lampe=new THREE.Group(); lampe.position.set(-1.98,0,-1.1); scene3d.add(lampe);
  piece(lampe,new THREE.CylinderGeometry(.24,.28,.07,16),toon(0x495057),[0,.04,0],CONTOUR_FIN);
  piece(lampe,new THREE.CylinderGeometry(.03,.03,1.75,10),toon(0x495057),[0,.9,0],CONTOUR_FIN);
  piece(lampe,new THREE.CylinderGeometry(.2,.36,.42,18),toon(0xffe08a),[0,1.9,0],CONTOUR_FIN);

  const tab=poserTableau({L:3.4,H:3.4,x:0,y:4.62,fond:'#e6c9a0',bois:0x6b3f15,pieds:false});
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} #cq{min-height:0!important;}'; document.head.append(css);

  /* ---- Le cadran : 12 en haut, un vrai cercle ---- */
  const CX=408,CY=408,RT=282,RN=350, ORA='#d9480f', BL='#1971c2', VE='#2f9a3a', ENC='#17452a', OR2='#f5a50a';
  const pos=(n,rr=RT)=>{ const a=(n*30-90)*Math.PI/180; return [CX+rr*Math.cos(a),CY+rr*Math.sin(a)]; };
  function cadran(c,T,forts,aiguilles,seulsForts=false){
    c.fillStyle='#fffdf5'; c.beginPath(); c.arc(CX,CY,396,0,7); c.fill(); c.strokeStyle='#6b3f15'; c.lineWidth=10; c.stroke();
    for(let n=1;n<=12;n++){ const [x,y]=pos(n,RN), t=forts[n];
      const fort=t!==undefined&&T>=t; if(seulsForts&&!fort) continue; texte(c,''+n,x,y,(fort?74:56)*(fort?Math.max(1,pop(T,t)*.7+.3):1),fort?ORA:'#868e96'); point(c,pos(n),fort?15:6,fort?ORA:'#adb5bd'); }
    if(aiguilles){ const m=(T*40-90)*Math.PI/180, h=(T*3.3+300-90)*Math.PI/180;
      c.strokeStyle=ENC; c.lineCap='round'; c.lineWidth=20; c.beginPath(); c.moveTo(CX,CY); c.lineTo(CX+130*Math.cos(h),CY+130*Math.sin(h)); c.stroke();
      c.lineWidth=12; c.beginPath(); c.moveTo(CX,CY); c.lineTo(CX+220*Math.cos(m),CY+220*Math.sin(m)); c.stroke(); point(c,[CX,CY],20,ENC); }
  }
  function relier(c,[a,b,d],v,coul=BL,ep=11){ const P1=pos(a),P2=pos(b),P3=pos(d); trait(c,P1,P2,v*3,coul,ep); trait(c,P2,P3,v*3-1,coul,ep); trait(c,P3,P1,v*3-2,coul,ep); }
  /* Un angle : un arc plein au sommet s, entre les directions vers p1 et p2 */
  function arc(c,s,p1,p2,rr,coul){ let a=Math.atan2(p1[1]-s[1],p1[0]-s[0]), b=Math.atan2(p2[1]-s[1],p2[0]-s[0]); let d=b-a; while(d<=-Math.PI)d+=2*Math.PI; while(d>Math.PI)d-=2*Math.PI;
    c.fillStyle=coul; c.globalAlpha=.32; c.beginPath(); c.moveTo(s[0],s[1]); c.arc(s[0],s[1],rr,a,a+d,d<0); c.closePath(); c.fill(); c.globalAlpha=1; c.strokeStyle=coul; c.lineWidth=8; c.beginPath(); c.arc(s[0],s[1],rr,a,a+d,d<0); c.stroke(); }
  function angles(c,[a,b,d],coul,rr=66){ const P1=pos(a),P2=pos(b),P3=pos(d); arc(c,P1,P2,P3,rr,coul); arc(c,P2,P3,P1,rr,coul); arc(c,P3,P1,P2,rr,coul); }

  const tHor=mot('00-accroche','horloge'), tChoi=mot('00-accroche','choisis'), t3n=mot('00-accroche','3'), tRel=mot('00-accroche','relie'), tAng=mot('00-accroche','angles');
  const au1=[mot('01-aigu','12'),mot('01-aigu','4'),mot('01-aigu','8')], tAi=mot('01-aigu','angles'), tAc=mot('01-aigu','acutangle');
  const dr1=[mot('02-droit','12'),mot('02-droit','3',1),mot('02-droit','6')], tCoin=mot('02-droit','coin'), tDr=mot('02-droit','droit'), tRe=mot('02-droit','rectangle');
  const q1=[mot('03-question','12'),mot('03-question','1'),mot('03-question','2')];
  const tCo=mot('03b-reponse','coin'), tOb=mot('03b-reponse','obtusangle');
  const c1=[mot('04-commentaire','12'),mot('04-commentaire','5',1),mot('04-commentaire','6')], tBiz=mot('04-commentaire','bizarre'), tLa=mot('04-commentaire',"l'angle"), tEq=mot('04-commentaire','équerre');

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T<au){ const forts=T>=t3n?{2:t3n,5:t3n+.1,9:t3n+.2}:{}; cadran(c,T,forts,T<tChoi);
      if(T>=tRel) relier(c,[2,5,9],(T-tRel)/.5); if(T>=tAng) angles(c,[2,5,9],OR2);
      if(T>=tRel) for(const n of [2,5,9]) point(c,pos(n),15,ORA);
    } else if(T<dr){ cadran(c,T,{12:au1[0],4:au1[1],8:au1[2]},false);
      if(T>=au1[2]) relier(c,[12,4,8],(T-au1[2])/.3);
      if(T>=tAi) angles(c,[12,4,8],VE);
      if(T>=tAc) texte(c,'acutangle',CX,CY+36,70*Math.max(1,pop(T,tAc)*.5+.5),VE);
      for(const [i,n] of [[0,12],[1,4],[2,8]]) if(T>=au1[i]) point(c,pos(n),15,ORA);
    } else if(T<q){ cadran(c,T,{12:dr1[0],3:dr1[1],6:dr1[2]},false);
      if(T>=dr1[2]) relier(c,[12,3,6],(T-dr1[2])/.3);
      /* L'équerre vient se caler dans le coin : son angle droit tombe juste */
      const P3=pos(3), h=Math.hypot(RT,RT), u=[(pos(12)[0]-P3[0])/h,(pos(12)[1]-P3[1])/h], v=[(pos(6)[0]-P3[0])/h,(pos(6)[1]-P3[1])/h];
      if(T>=tCoin&&T<tDr+.8){ const k=1-lisse((T-tCoin)/.45), dx=k*260, L=170; c.save(); c.translate(dx,0); c.fillStyle='rgba(245,165,10,.72)'; c.strokeStyle='#8a5a00'; c.lineWidth=5; c.beginPath(); c.moveTo(P3[0],P3[1]); c.lineTo(P3[0]+u[0]*L,P3[1]+u[1]*L); c.lineTo(P3[0]+v[0]*L,P3[1]+v[1]*L); c.closePath(); c.fill(); c.stroke(); c.restore(); }
      if(T>=tDr){ const s=46*Math.max(1,pop(T,tDr)*.5+.5); c.strokeStyle=ORA; c.lineWidth=9; c.lineJoin='miter'; c.beginPath(); c.moveTo(P3[0]+u[0]*s,P3[1]+u[1]*s); c.lineTo(P3[0]+(u[0]+v[0])*s,P3[1]+(u[1]+v[1])*s); c.lineTo(P3[0]+v[0]*s,P3[1]+v[1]*s); c.stroke(); }
      if(T>=tRe) texte(c,'rectangle',262,CY,54*Math.max(1,pop(T,tRe)*.4+.6),VE);
      for(const [i,n] of [[0,12],[1,3],[2,6]]) if(T>=dr1[i]) point(c,pos(n),15,ORA);
    } else if(T<com){ /* Le triangle est petit sur le cadran : on zoome sur le haut du cadran */
      c.save(); c.translate(408,330); c.scale(1.7,1.7); c.translate(-520,-195);
      cadran(c,T,{12:q1[0],1:q1[1],2:q1[2]},false,true);
      if(T>=q1[2]) relier(c,[12,1,2],(T-q1[2])/.3);
      if(T>=tCo){ const s=pos(1); arc(c,s,pos(12),pos(2),62*Math.max(1,pop(T,tCo)*.4+.6),ORA); }
      for(const [i,n] of [[0,12],[1,1],[2,2]]) if(T>=q1[i]) point(c,pos(n),15,ORA);
      c.restore();
      if(T>=tOb){ c.fillStyle='rgba(255,253,245,.9)'; c.fillRect(0,650,816,166); texte(c,'obtusangle',CX,730,110*Math.max(1,pop(T,tOb)*.4+.6),ORA); }
    } else { cadran(c,T,{12:c1[0],5:c1[1],6:c1[2]},false);
      if(T>=c1[2]) relier(c,[12,5,6],(T-c1[2])/.3);
      if(T>=tLa){ const s=pos(5); arc(c,s,pos(12),pos(6),58,OR2); texte(c,'?',s[0]-96,s[1]-112,110*Math.max(1,pop(T,tLa)*.6+.4),ORA); }
      for(const [i,n] of [[0,12],[1,5],[2,6]]) if(T>=c1[i]) point(c,pos(n),15,ORA);
    }
    tab.maj();
  }

  /* L'horloge dans le gros plan du début */
  const mini=document.createElement('div'); mini.className='cv'; mini.style.cssText='left:650px;top:640px;z-index:4;display:none;';
  mini.innerHTML='<svg width="370" height="370" viewBox="0 0 370 370"><rect x="4" y="4" width="362" height="362" rx="16" fill="#e6c9a0" stroke="#6b3f15" stroke-width="8"/><circle cx="185" cy="185" r="160" fill="#fffdf5" stroke="#6b3f15" stroke-width="6"/><g font-family="Segoe UI" font-weight="800" font-size="40" fill="#495057" text-anchor="middle"><text x="185" y="68">12</text><text x="316" y="199">3</text><text x="185" y="328">6</text><text x="54" y="199">9</text></g><path d="M185 185L120 130M185 185L250 105" stroke="#17452a" stroke-width="11" stroke-linecap="round"/></svg>'; document.body.append(mini);

  /* ---- Les écrits ---- */
  const a0=dit('00-accroche'), a1=dit('01-aigu'), a2=dit('02-droit'), a4=dit('04-commentaire'), qd=dit('03-question'), rd=dit('03b-reponse');
  const groupes=[
    groupe(acc+.1,acc+4.4,352,62,a0('Salut !'),a0('Mon horloge cache'),a0('des triangles.')),
    groupe(acc+4.4,acc+7.4,60,62,a0('Tu paries que tu ne'),a0('les as jamais vus ?')),
    groupe(acc+7.4,au,60,54,a0('Je choisis 3 nombres,'),a0('je les relie,'),a0('et je regarde les angles.')),
    groupe(au+.1,au+2.4,60,62,a1('12, 4 et 8.')),
    groupe(au+2.4,dr,60,62,a1('Trois angles aigus :'),a1('triangle acutangle.')),
    groupe(dr+.1,dr+2.4,60,62,a2('12, 3 et 6.')),
    groupe(dr+2.4,dr+5.8,60,62,a2('Regarde le coin en 3 :'),a2('un angle droit !')),
    groupe(dr+5.8,q,60,62,a2('Triangle rectangle.')),
    groupe(com+.1,com+3.4,60,62,a4('À toi : relie 12, 5 et 6.')),
    groupe(com+3.4,com+5.4,60,62,a4('Il a l’air bizarre !')),
    groupe(com+5.4,com+8.2,60,62,a4('Combien mesure'),a4('l’angle en 5 ?')),
    groupe(com+8.2,f,60,60,a4('Prends ton équerre,'),a4('et réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('12, 1 et 2 : quel triangle ?')];
  const tq=m=>mot('03-question',m)-q;
  qd.saute(6); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const rs=[rd('Le coin en 1 est très ouvert,'),rd('plus de 90 degrés :'),rd('obtusangle !')];

  poserMiniature(outils,acc+1,'<span style="font-size:80px">Mon horloge cache<br>des triangles !</span>'+PARI,`<svg width="290" height="290" viewBox="0 0 370 370"><circle cx="185" cy="185" r="175" fill="#fffdf5" stroke="#6b3f15" stroke-width="10"/><path d="M185 55L315 185L185 315Z" fill="rgba(25,113,194,.15)" stroke="#1971c2" stroke-width="10" stroke-linejoin="round"/><g font-family="Segoe UI" font-weight="800" font-size="40" fill="#d9480f" text-anchor="middle"><text x="185" y="46">12</text><text x="340" y="199">3</text><text x="185" y="356">6</text></g></svg>`);

  return { clips,FIN,titre:'L’horloge cachée',ceinture:0,finTitre:acc+4.4,groupes,finClip:'05-abonne',
    cuts:[acc+4.4,q,r,com,f],
    question:{ qc:'03-question',rc:'03b-reponse',finR:com,cpt:fin('03-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['rectangle',tq('A'),tq('rectangle')],['obtusangle',tq('B'),tq('obtusangle')],['acutangle',tq('C'),tq('acutangle')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B.']],reponse:[],suite:rs },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<acc+4.4;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      tab.g.scale.setScalar(dansQ?.66:1); tab.g.position.set(dansQ?1.37:0,dansQ?3.23:4.62,-1.5);
      mini.style.display=gros&&T>=tHor&&!window.MINI?'block':'none';
      scene.x=-.85; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=2.15; }
      if(dansQ){ scene.x=-1.02; cam.d=11.4; cam.y=3.55; }
      if(dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<au){ T<acc+7.4?g.reflechit():g.montre(); }
      else if(T<q){ (T>=tAc&&T<dr)||T>=tRe?g.pouce():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<f){ if(T>=tBiz-.3&&T<com+5.4){ g.oups(); scene.ry=.25; } else T>=tEq?g.pouce():g.montre(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      lampe.visible=!window.MINI; if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); }
    } };
};
