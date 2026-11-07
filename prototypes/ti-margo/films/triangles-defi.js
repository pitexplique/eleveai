/* Série Triangles 6e, épisode 05 : LE SECRET DU TANGRAM (au salon de thé).
   Un vrai tangram : les 7 pièces gardent leur taille exacte du carré au chat, puis au bateau.
   Les 5 triangles sont rectangles isocèles : c'est le secret. */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':10.76,'01-pieces':9.99,'02-question':15.16,'02b-reponse':8.29,'03-figures':5.2,'04-commentaire':7.71,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-figures':1,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pc,q,r,fg,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  /* ---- Le salon de thé ---- */
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(90,50),new THREE.MeshBasicMaterial({color:0xf3ead7})); mur.position.set(0,25,-1.75); scene3d.add(mur);
  for(let x=-8;x<=8;x+=1.1){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.05,50),new THREE.MeshBasicMaterial({color:0xcbb68f})); l.position.set(x,25,-1.74); scene3d.add(l); }
  for(let y=.9;y<12;y+=1.1){ const l=new THREE.Mesh(new THREE.PlaneGeometry(90,.05),new THREE.MeshBasicMaterial({color:0xcbb68f})); l.position.set(0,y,-1.74); scene3d.add(l); }
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd8c98f})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const plinthe=new THREE.Mesh(new THREE.PlaneGeometry(90,.26),new THREE.MeshBasicMaterial({color:0x9b2226})); plinthe.position.set(0,.13,-1.73); scene3d.add(plinthe);
  /* La table basse, la théière, deux tasses */
  const table=new THREE.Group(); table.position.set(1.5,0,-1); scene3d.add(table); const bois=toon(0x7a3e1d);
  piece(table,new RoundedBoxGeometry(1.7,.1,.8,3,.03),bois,[0,.72,0],CONTOUR_FIN);
  for(const s of [-1,1]) piece(table,new RoundedBoxGeometry(.13,.68,.62,2,.02),bois,[s*.68,.35,0],CONTOUR_FIN);
  const bleu=toon(0x4dabf7);
  piece(table,new THREE.SphereGeometry(.24,20,14),bleu,[-.22,.98,0],CONTOUR_FIN);
  piece(table,new THREE.CylinderGeometry(.08,.09,.06,12),bleu,[-.22,1.24,0],CONTOUR_FIN);
  piece(table,new THREE.CylinderGeometry(.03,.05,.28,10),bleu,[.03,1.03,0],CONTOUR_FIN).rotation.z=-.85;
  for(const x of [.32,.6]) piece(table,new THREE.CylinderGeometry(.09,.07,.14,12),C.blanc,[x,.84,.08],CONTOUR_FIN);
  /* Une lanterne rouge */
  const lant=new THREE.Group(); lant.position.set(-2,2.3,-1.2); scene3d.add(lant);
  const boule=piece(lant,new THREE.SphereGeometry(.34,20,14),toon(0xe03131),[0,0,0],CONTOUR_FIN); boule.scale.y=.85;
  for(const s of [-1,1]) piece(lant,new THREE.CylinderGeometry(.14,.14,.05,14),toon(0xf5a50a),[0,s*.3,0],CONTOUR_FIN);
  piece(lant,new THREE.CylinderGeometry(.012,.012,.36,6),C.noir,[0,.47,0],null);

  const tab=poserTableau({L:4.3,H:3,x:0,y:4.55,fond:'#fff7e6',bois:0x9b2226,pieds:false});
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} #cq{min-height:0!important;}'; document.head.append(css);

  /* ---- Les 7 pièces, ordre : G1 G2 M P1 P2 CARRE PARA ---- */
  const COULS=['#e03131','#1971c2','#2f9a3a','#f5a50a','#12b886','#7048e8','#e8590c'];
  const G1=0,G2=1,MO=2,P1=3,P2=4,CA=5,PA=6;
  const CARRE=[[[0,0],[4,0],[2,2]],[[0,0],[0,4],[2,2]],[[4,2],[4,4],[2,4]],[[4,0],[4,2],[3,1]],[[2,2],[3,3],[1,3]],[[3,1],[4,2],[3,3],[2,2]],[[1,3],[3,3],[2,4],[0,4]]];
  const CHAT=[[[0,0],[4,0],[2,2]],[[0,0],[0,4],[2,2]],[[4,0],[4,2],[2,2]],[[-1,5],[-1,7],[0,6]],[[0,6],[1,7],[1,5]],[[0,4],[1,5],[0,6],[-1,5]],[[0,2],[0,0],[-1,1],[-1,3]]];
  const BATEAU=[[[2,1],[0,3],[0,1]],[[-2,1],[0,3],[0,1]],[[.5,1],[1.5,0],[2.5,1]],[[-2.5,1],[-1.5,0],[-1.5,1]],[[-.5,0],[.5,0],[-.5,1]],[[-1.5,0],[-.5,0],[-.5,1],[-1.5,1]],[[1.5,0],[.5,1],[-.5,1],[.5,0]]];
  const place=(forme,u,x0,y0,haut=false)=>forme.map(p=>p.map(([x,y])=>[x0+u*x,haut?y0-u*y:y0+u*y]));
  const lCarre=place(CARRE,130,340,90), lChat=place(CHAT,84,470,640,true), lBateau=place(BATEAU,120,516,630,true);
  /* Les 5 triangles côte à côte, angle droit en bas à gauche */
  const LEG=[240,240,170,120,120]; const X=[495,755,305,25,165], BASE=600;
  const rangTri=(i)=>{ const L=LEG[i],x=X[i],a=[x,BASE],b=[x+L,BASE],c=[x,BASE-L]; return i===MO?[b,a,c]:i===P2?[a,b,c]:[b,c,a]; };
  const lRang=[rangTri(0),rangTri(1),rangTri(2),rangTri(3),rangTri(4),lCarre[CA],lCarre[PA]];
  const lGrand=lCarre.map(x=>x); lGrand[G1]=[[210,590],[822,590],[516,284]]; lGrand[G2]=lRang[G2];
  /* Le carré éclaté : chaque pièce s'écarte un peu du centre */
  const centre=[600,350], lEclat=lCarre.map(p=>{ const g=[p.reduce((s,q)=>s+q[0],0)/p.length,p.reduce((s,q)=>s+q[1],0)/p.length]; const d=[(g[0]-centre[0])*.09,(g[1]-centre[1])*.09]; return p.map(q=>[q[0]+d[0],q[1]+d[1]]); });

  const tCarre=mot('00-accroche','carré'), tAns=mot('00-accroche','200'), tChine=mot('00-accroche','Chine'), tTan=mot('00-accroche','tangram'), tSec=mot('00-accroche','secret');
  const tCas=mot('01-pieces','casse'), t7=mot('01-pieces','7'), tUnC=mot('01-pieces','carré'), tPen=mot('01-pieces','pièce'), t5=mot('01-pieces','5'), tPet=mot('01-pieces','petits'), tMoy=mot('01-pieces','moyen'), tGra=mot('01-pieces','grands');
  const tQ5=mot('02-question','5'), tDr=mot('02b-reponse','droit'), tEg=mot('02b-reponse','égaux'), tForme=mot('02b-reponse','forme');
  const tFais=mot('03-figures','fais'), tChat=mot('03-figures','chat'), tPuis=mot('03-figures','Puis'), tBat=mot('03-figures','bateau');
  const tGrand=mot('04-commentaire','grand'), tPetits=mot('04-commentaire','petits');

  function etat(T){ let cur=lCarre;
    const lerp=(a,b,u)=>a.map((p,i)=>p.map((q,j)=>[q[0]+(b[i][j][0]-q[0])*u,q[1]+(b[i][j][1]-q[1])*u]));
    for(const [t0,d,cible] of [[tCas,.18,lEclat],[tQ5-.15,.55,lRang],[tFais,.6,lChat],[tPuis,.6,lBateau],[com,.01,lRang],[tGrand-.2,.5,lGrand]]){ if(T<t0) break; cur=lerp(cur,cible,lisse((T-t0)/d)); }
    return cur; }
  function alpha(i,T){ /* Ce que la voix nomme reste vif, le reste pâlit */
    const tri=[G1,G2,MO,P1,P2];
    if(T>=pc&&T<q){ if(T>=tGra) return i===G1||i===G2?1:.22; if(T>=tMoy) return i===MO?1:.22; if(T>=tPet) return i===P1||i===P2?1:.22; if(T>=t5) return tri.includes(i)?1:.22; if(T>=tPen) return i===PA?1:.22; if(T>=tUnC) return i===CA?1:.22; return 1; }
    if(T>=q&&T<fg) return i===CA||i===PA?Math.max(0,1-(T-tQ5)/.3):1;
    if(T>=com) return i===G1?1:0;
    return 1; }

  function dessiner(T){ const c=tab.c; tab.effacer(); const L=etat(T), entier=T<tCas;
    if(T<pc&&!entier){}
    for(let i=0;i<7;i++){ const a=alpha(i,T); if(a<=0) continue; c.save(); c.globalAlpha=a; c.fillStyle=entier?'#e03131':COULS[i]; c.beginPath(); L[i].forEach((p,k)=>k?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fill(); if(!entier){ c.lineJoin='round'; c.strokeStyle='#17452a'; c.lineWidth=5; c.stroke(); } c.restore(); }
    if(entier){ c.fillStyle='#e03131'; c.fillRect(340,90,520,520); c.strokeStyle='#17452a'; c.lineWidth=7; c.strokeRect(340,90,520,520); }
    if(T<pc){ if(T>=tAns) texte(c,'200 ans',165,190,72,COUL.encre); if(T>=tChine) texte(c,'Chine',165,300,72,COUL.piege); if(T>=tTan) texte(c,'tangram',165,410,70*Math.max(1,pop(T,tTan)*.4+.6),COUL.piege);
      if(T>=tSec) texte(c,'?',600,350,240*Math.max(1,pop(T,tSec)*.4+.6),'#ffffff'); }
    if(T>=pc&&T<q){ const s=T>=tGra?['2 grands',0]:T>=tMoy?['1 moyen',0]:T>=tPet?['2 petits',0]:T>=t5?['5 triangles',0]:T>=tPen?['penchée',0]:T>=tUnC?['1 carré',0]:T>=t7?['7 pièces',0]:null;
      if(s) texte(c,s[0],165,350,s[0].length>8?50:58,COUL.encre); }
    /* Les yeux du chat, au mot « chat » */
    if(T>=tChat&&T<tPuis){ const [a,b,d,e]=L[CA], cx=(a[0]+d[0])/2, cy=(a[1]+d[1])/2; for(const s of [-1,1]){ point(c,[cx+s*30,cy],13,'#fff'); point(c,[cx+s*30,cy],6,'#111'); } }
    /* La réponse : angle droit, côtés égaux, sur chacun des 5 */
    if(T>=tDr&&T<fg) [G1,G2,MO,P1,P2].forEach(i=>{ const [, ,]=[]; const x=X[i], ll=LEG[i], s=Math.max(20,ll*.14);
      c.strokeStyle='#fff'; c.lineWidth=6; c.beginPath(); c.moveTo(x+s,BASE); c.lineTo(x+s,BASE-s); c.lineTo(x,BASE-s); c.stroke();
      if(T>=tEg){ c.strokeStyle='#fff'; c.lineWidth=7; c.beginPath(); c.moveTo(x+ll/2,BASE-13); c.lineTo(x+ll/2,BASE+13); c.moveTo(x-13,BASE-ll/2); c.lineTo(x+13,BASE-ll/2); c.stroke(); } });
    if(T>=tForme&&T<fg) texte(c,'même forme !',516,190,92*Math.max(1,pop(T,tForme)*.4+.6),COUL.ok);
    /* À toi : le grand triangle, l'angle droit et les deux petits angles */
    if(T>=com&&T>=tGrand+.3){ const [a,b,h]=lGrand[G1]; const s=40;
      c.strokeStyle='#fff'; c.lineWidth=7; c.beginPath(); c.moveTo(h[0]-s,h[1]+s); c.lineTo(h[0],h[1]+2*s); c.lineTo(h[0]+s,h[1]+s); c.stroke();
      if(T>=tPetits){ for(const [p,d0,sg] of [[a,0,1],[b,Math.PI,-1]]){ c.strokeStyle='#ffd43b'; c.lineWidth=9; c.beginPath(); c.arc(p[0],p[1],104,sg>0?-Math.PI/4:Math.PI,sg>0?0:Math.PI+Math.PI/4); c.stroke(); texte(c,'?',p[0]+sg*165,p[1]-58,84*Math.max(1,pop(T,tPetits)*.5+.5),'#fff'); } } }
    tab.maj();
  }

  /* Le carré dans le gros plan du début */
  const mini=document.createElement('div'); mini.className='cv'; mini.style.cssText='left:680px;top:660px;z-index:4;display:none;';
  mini.innerHTML='<svg width="330" height="330" viewBox="0 0 330 330"><rect x="6" y="6" width="318" height="318" fill="#e03131" stroke="#17452a" stroke-width="8"/></svg>'; document.body.append(mini);

  /* ---- Les écrits ---- */
  const a0=dit('00-accroche'), a1=dit('01-pieces'), a3=dit('03-figures'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,acc+2.75,352,62,a0('Salut !'),a0('Ce carré est un puzzle')),
    groupe(acc+2.75,acc+5,60,62,a0('vieux de plus de 200 ans.')),
    groupe(acc+5,acc+8.1,60,62,a0('Il vient de Chine :'),a0('le tangram.')),
    groupe(acc+8.1,pc,60,62,a0('Tu paries qu’il cache'),a0('un secret ?')),
    groupe(pc+.1,pc+2.55,60,62,a1('Je le casse en 7 pièces.')),
    groupe(pc+2.55,pc+6.9,60,60,a1('Un carré, une pièce penchée,'),a1('et 5 triangles.')),
    groupe(pc+6.9,q,60,60,a1('2 petits, 1 moyen, 2 grands.')),
    groupe(fg+.1,fg+3.3,60,62,a3('Avec ces 7 pièces,'),a3('je fais un chat.')),
    groupe(fg+3.3,com,60,62,a3('Puis un bateau.')),
    groupe(com+.1,com+2.1,60,58,a4('À toi : dans le grand triangle,')),
    groupe(com+2.1,com+5.4,60,62,a4('combien mesure chacun'),a4('des deux petits angles ?')),
    groupe(com+5.4,f,60,62,a4('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Ces 5 triangles,'),qd('de quelle famille sont-ils ?')];
  const tq=m=>mot('02-question',m)-q;
  qd.saute(7); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const rs=[rd('Les 5 ont un angle droit'),rd('et deux côtés égaux.'),rd('Petits ou grands,'),rd('c’est la même forme !')];

  const svgT=CARRE.map((p,i)=>`<path d="M${p.map(([x,y])=>(x*70+10)+' '+(y*70+10)).join('L')}Z" fill="${COULS[i]}" stroke="#17452a" stroke-width="4"/>`).join('');
  poserMiniature(outils,acc+1,'<span style="font-size:80px">Le secret du tangram</span>'+PARI,`<svg width="250" height="250" viewBox="0 0 300 300">${svgT}</svg>`);

  return { clips,FIN,titre:'Le secret du tangram',ceinture:1,finTitre:acc+2.75,groupes,finClip:'05-abonne',
    cuts:[acc+2.75,q,r,fg,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:fg,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['équilatéraux',tq('A'),tq('équilatéraux')],['rectangles isocèles',tq('B'),tq('rectangles')],['quelconques',tq('C'),tq('quelconques')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B.']],reponse:[],suite:rs },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<fg, dansF=T>=f, gros=T<acc+2.75;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      tab.g.scale.setScalar(dansQ?.66:1); tab.g.position.set(dansQ?1.07:0,dansQ?3.06:4.55,-1.5);
      mini.style.display=gros&&T>=tCarre&&!window.MINI?'block':'none';
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=2.15; }
      if(dansQ){ scene.x=-1.02; cam.d=11.4; cam.y=3.55; }
      if(dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<pc){ T>=tSec-.8?g.reflechit():g.montre(); }
      else if(T<q){ if(T>=tCas&&T<pc+2.5){ g.oups(); scene.ry=.25; } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<fg){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tChat?g.pouce():g.montre(); }
      else if(T<f){ T<com+5.4?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      lant.visible=!window.MINI&&!dansQ&&!dansF&&!gros;
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); }
    } };
};
