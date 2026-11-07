/* Série Nombres décimaux 6e, épisode 04 : LE GÂTEAU ARRONDI DEUX FOIS.
   2,46 kg : au dixième 2,5, puis à l'unité 3 ? Non : on arrondit en une seule fois, 2.
   Chargé après films/decimaux.js : voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, poserClasse, gestes… */

/* Une phrase dite, prolongée de mots que la voix a déjà fondus dans un nombre (« 46 kilogrammes ») */
function prolonger(ph,suite,t){ const m=suite.split(' '); return [ph[0],Math.max(ph[1],t),ph[2]+' '+suite,[...ph[3],...m.map(()=>t)]]; }
/* La droite graduée à la craie, de x0 à x1, coupée en n parts ; renvoie la position d'une valeur u ∈ [0, 1] */
function droiteCraie(c,x0,x1,y,n,coul=CRAIE.blanc,grad=n){
  c.strokeStyle=coul; c.lineCap='round'; c.lineWidth=8; c.beginPath(); c.moveTo(x0-34,y); c.lineTo(x1+34,y); c.stroke();
  for(let i=0;i<=n;i++){ if(i>0&&i<n&&i>grad) continue; const x=x0+(x1-x0)*i/n, h=(i===0||i===n)?34:18; c.lineWidth=(i===0||i===n)?8:5;
    c.beginPath(); c.moveTo(x,y-h); c.lineTo(x,y+h); c.stroke(); }
  return u=>x0+(x1-x0)*u;
}
function repereCraie(c,x,y,txt,coul,z=1,taille=64){ c.fillStyle=coul; c.beginPath(); c.moveTo(x,y-14); c.lineTo(x-20,y-48); c.lineTo(x+20,y-48); c.closePath(); c.fill();
  ecrire(c,txt,x,y-92,taille*z,coul); }
function fleche(c,x0,x1,y,coul){ c.strokeStyle=coul; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(x0,y); c.lineTo(x1,y); c.moveTo(x1-24,y-18); c.lineTo(x1,y); c.lineTo(x1-24,y+18); c.stroke(); }
function barre(c,x0,x1,y,coul){ c.strokeStyle=coul; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.moveTo(x0,y); c.lineTo(x1,y); c.stroke(); }

FILMS['arrondir']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':16.2,'01-droite':8.07,'02-question':11.85,'02b-reponse':6.34,'03-lecon':8.32,'04-commentaire':6.36,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-droite','02-question','02b-reponse','03-lecon','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dr,q,r,lec,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  /* Le gâteau, sur le bureau */
  const gat=new THREE.Group(); gat.position.set(-2.15,1.08,-1.6); scene3d.add(gat);
  piece(gat,new THREE.CylinderGeometry(.34,.34,.3,28),toon(0xf4a6c8),[0,.15,0],CONTOUR_FIN);
  piece(gat,new THREE.CylinderGeometry(.35,.35,.07,28),toon(0xffffff),[0,.33,0],CONTOUR_FIN);
  piece(gat,new THREE.SphereGeometry(.08,14,10),toon(0xe03131),[0,.42,0],CONTOUR_FIN);
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJe=mot('00-accroche','Je'), t246=mot('00-accroche','2'), tDix=mot('00-accroche','dixième'), t25=mot('00-accroche','5'),
        tU2=mot('00-accroche','l\'unité',2), t3=mot('00-accroche','3'), tParie=mot('00-accroche','paries'), tKg=mot('00-accroche','46');
  const tPlace=mot('01-droite','2'), tEntre=mot('01-droite','entre'), tD2=mot('01-droite','2',3), tD3=mot('01-droite','3'),
        tPres=mot('01-droite','près'), tDe2=mot('01-droite','2',5);
  const tFaute=mot('03-lecon','faute'), tL25=mot('03-lecon','2'), tTrompe=mot('03-lecon','trompé'), tSeule=mot('03-lecon','seule');
  const t745=mot('04-commentaire','7'), tLU=mot('04-commentaire','l\'unité'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W, H=tab.H;
    const z=t0=>Math.max(1,pop(T,t0));
    if(T>=com){ /* le défi : 7,45 à l'unité, réponse à l'élève */
      if(T>=t745) ecrire(c,'7,45',W/2,230,190*z(t745),CRAIE.d);
      if(T>=tLU) ecrire(c,'à l’unité',W/2,410,80*z(tLU),CRAIE.blanc);
      if(T>=tRep) ecrire(c,'= ?',W/2,580,120*z(tRep),CRAIE.ok);
      tab.maj(); return; }
    if(T>=lec){ /* la leçon : deux fois, c'est faux ; une seule fois, c'est 2 */
      const xs=[160,535,890], y1=200;
      ecrire(c,'2,46',xs[0],y1,100,CRAIE.faux); fleche(c,290,410,y1,CRAIE.faux);
      ecrire(c,'2,5',xs[1],y1,100*(T>=tL25&&T<tTrompe+.5?z(tL25):1),CRAIE.faux); fleche(c,660,780,y1,CRAIE.faux);
      ecrire(c,'3',xs[2],y1,104,CRAIE.faux);
      if(T>=tFaute){ const u=Math.min(1,(T-tFaute)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.beginPath(); c.moveTo(90,y1); c.lineTo(90+(966-90)*u,y1); c.stroke(); }
      if(T>=tL25){ const u=Math.min(1,(T-tL25)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=9; c.beginPath(); c.arc(xs[1],y1,95,0,7*u); c.stroke(); }
      if(T>=tSeule){ const zz=z(tSeule);
        ecrire(c,'2,46',290,500,120*zz,CRAIE.blanc); fleche(c,470,600,500,CRAIE.ok); ecrire(c,'2',710,500,140*zz,CRAIE.ok);
        c.strokeStyle=CRAIE.ok; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(800,500); c.lineTo(840,545); c.lineTo(920,445); c.stroke(); }
      tab.maj(); return; }
    if(T>=dr){ /* la droite de 2 à 3 : 2,46 bien plus près de 2 */
      const y=420, X=droiteCraie(c,130,926,y,10), x=X(.46);
      if(T>=tD2) ecrire(c,'2',X(0),y+90,96*z(tD2),T>=tDe2?CRAIE.ok:CRAIE.u);
      if(T>=tD3) ecrire(c,'3',X(1),y+90,96*z(tD3),CRAIE.u);
      if(T>=tPlace) repereCraie(c,x,y,'2,46',CRAIE.d,z(tPlace),76);
      if(T>=tPres){ const u=Math.min(1,(T-tPres)/.5); barre(c,X(0),X(0)+(x-X(0))*u,y+170,CRAIE.ok); barre(c,x,x+(X(1)-x)*u,y+205,CRAIE.faux); }
      if(T>=tDe2){ const u=Math.min(1,(T-tDe2)/.4); c.strokeStyle=CRAIE.ok; c.lineWidth=9; c.beginPath(); c.arc(X(0),y+90,70,0,7*u); c.stroke(); }
      tab.maj(); return; }
    /* l'accroche : 2,46 → 2,5 → 3, en deux fois */
    const y=330;
    if(T>=t246) ecrire(c,'2,46',160,y,100*z(t246),CRAIE.blanc);
    if(T>=tDix){ fleche(c,290,410,y,CRAIE.d); ecrire(c,'dixième',350,y+80,40,CRAIE.d); }
    if(T>=t25) ecrire(c,'2,5',535,y,100*z(t25),CRAIE.d);
    if(T>=tU2){ fleche(c,660,780,y,CRAIE.u); ecrire(c,'unité',720,y+80,40,CRAIE.u); }
    if(T>=t3) ecrire(c,'3',890,y,140*z(t3),CRAIE.u);
    if(T>=tParie) ecrire(c,'?',965,y-80,80*z(tParie),CRAIE.faux);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-droite'), a3=dit('03-lecon'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),prolonger(a0('Mon gâteau pèse 2,46'),'kg.',tKg)];
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,...salut),
    ...suiteDe(dr,60,60,[a0('Je l’arrondis à l’unité,'),a0('en deux fois.')],[a0('Au dixième : 2,5.')],[a0('Puis à l’unité : 3 !')],[a0('Tu paries que'),a0('c’est juste ?')]),
    ...suiteDe(q,60,60,[a1('On place 2,46'),a1('sur la droite.')],[a1('Il est entre 2 et 3...')],[a1('et bien plus près de 2 !')]),
    ...suiteDe(com,60,60,[a3('Ma faute :'),a3('j’ai arrondi deux fois.')],[a3('Le 2,5 m’a trompé.')],[a3('On arrondit en'),a3('une seule fois !')]),
    ...suiteDe(f,60,58,[prolonger(a4('À toi : arrondis 7,45'),'à l’unité.',tLU),a4.saute(1)('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel est l’arrondi'),qd('à l’unité de 2,46 ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('On regarde seulement le'), r2=rd('chiffre des dixièmes : 4.'), r3=rd('On garde 2.');

  poserMiniature(outils,acc+1,'Je l’arrondis<br>en deux fois'+PARI,
    `<svg width="290" height="171" viewBox="0 0 340 200"><rect x="6" y="6" width="328" height="188" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="170" y="128" font-family="Segoe UI" font-weight="800" font-size="54" fill="#f8f9fa" text-anchor="middle">2,46 → 3 ?</text></svg>`);
  return { clips,FIN,titre:'Le gâteau arrondi',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,dr,q,r,lec,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:lec,cpt:fin('02-question')+.1,bonne:0,tBon:.66,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2',tq('A',2),tq('2',3)],['3',tq('B'),tq('3',1)],['2,5',tq('C'),tq('2',4)]],
      tete:[[r+.1,'Réponse '],[r+.66,'A !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<lec, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<dr){ if(T<tDix) g.reflechit(); else if(T<tParie) g.montre(); else g.fier(); }
      else if(T<q){ if(T>=tPres) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<lec){ T<r+.66?g.ouvre():g.pouce(); }
      else if(T<com){ if(T<tSeule-.3){ g.oups(); scene.ry=-.12+.3*lisse((T-lec)/.35); } else g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
