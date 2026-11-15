/* ============================================================
   Série Conversions 5e — ÉPISODE 03 : LE RUBAN DU CADEAU (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-conversion.js.
   Un ruban de 1 m ; on en coupe 30 cm pour le nœud. « 1 − 30 = −29 » ne veut rien dire. Réponse C : 1 m = 100 cm ;
   100 − 30 = 70 cm. 70 cm : assez pour emballer le cadeau.
   Commentaire : un ruban de 2 m, on en coupe 45 cm : combien reste-t-il, en centimètres ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le ruban EN HAUT, le cadeau à DROITE (Ti Margo cache le bas du milieu-gauche), les calculs à gauche */
const RC_X=110, RC_Y=100, RC_L=800, RC_H=34, RC_XG=290;
const RC_ROSE='#f06595', RC_ROSE_B='#a61e4d', RC_BOITE='#4dabf7', RC_BOITE_B='#1864ab';
const RC_BX=690, RC_BY=400, RC_BW=270, RC_BH=220;   /* le cadeau : coin haut-gauche, largeur, hauteur */
/* Un morceau de ruban de x1 à x2 (centré en y), zoomé de z (apparition) */
function rcRuban(c,x1,x2,y,z=1,alpha=1){ if(z<=0||x2<=x1) return; const k=Math.min(1.2,z), cx=(x1+x2)/2, w=(x2-x1)*k, h=RC_H*k;
  c.save(); c.globalAlpha=alpha; c.fillStyle=RC_ROSE; c.fillRect(cx-w/2,y-h/2,w,h);
  c.strokeStyle='#fcc2d7'; c.lineWidth=4; c.beginPath(); c.moveTo(cx-w/2+6,y); c.lineTo(cx+w/2-6,y); c.stroke();
  c.strokeStyle=RC_ROSE_B; c.lineWidth=4; c.strokeRect(cx-w/2,y-h/2,w,h); c.restore(); }
/* Le cadeau ; u = 0 → 1 : les bandes du ruban qui l'emballent ; noeud = le nœud posé dessus */
function rcCadeau(c,z,u,noeud){ if(z<=0) return; const a=Math.min(1,z); c.save(); c.globalAlpha=a;
  c.fillStyle=RC_BOITE; c.fillRect(RC_BX,RC_BY,RC_BW,RC_BH); c.strokeStyle=RC_BOITE_B; c.lineWidth=6; c.strokeRect(RC_BX,RC_BY,RC_BW,RC_BH);
  c.fillStyle='#74c0fc'; c.fillRect(RC_BX-14,RC_BY-36,RC_BW+28,40); c.strokeRect(RC_BX-14,RC_BY-36,RC_BW+28,40);
  if(u>0){ const v=Math.min(1,u), cx=RC_BX+RC_BW/2; c.fillStyle=RC_ROSE;
    c.fillRect(cx-16,RC_BY-36,32,(RC_BH+36)*v); c.fillRect(RC_BX,RC_BY+RC_BH/2-16,RC_BW*v,32); }
  if(noeud>0){ const k=Math.min(1.2,noeud), cx=RC_BX+RC_BW/2, cy=RC_BY-50; c.fillStyle=RC_ROSE; c.strokeStyle=RC_ROSE_B; c.lineWidth=5;
    for(const s of [-1,1]){ c.beginPath(); c.ellipse(cx+s*42*k,cy,42*k,24*k,s*.35,0,7); c.fill(); c.stroke(); }
    c.beginPath(); c.arc(cx,cy,16*k,0,7); c.fill(); c.stroke(); }
  c.restore(); }

FILMS['avant-calcul']=function(outils){
  const DUR={'00-accroche':6.42,'01-calcul':6.24,'02-question':16.04,'02b-reponse':8.36,'03-ouf':4.31,'04-commentaire':11.29,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-calcul':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tRuban=mot('00-accroche','ruban'), tCadeau=mot('00-accroche','cadeau'), t1m=mot('00-accroche','mètre'),
        tCoupe=mot('00-accroche','coupe'), t30=mot('00-accroche','30'), t30cm=mot('00-accroche','centimètres',2),
        tNoeud=mot('00-accroche','nœud');
  const t1=mot('01-calcul','1'), t30b=mot('01-calcul','30'), t29=mot('01-calcul','29'), tRien=mot('01-calcul','rien');
  const tC=mot('02b-reponse','C'), tEgale=mot('02b-reponse','égale'), t100=mot('02b-reponse','centimètres'),
        t100m=mot('02b-reponse','moins'), t30r=mot('02b-reponse','30'), t70=mot('02b-reponse','70');
  const tEmballer=mot('03-ouf','emballer'), tCadeau3=mot('03-ouf','cadeau');
  const tRuban4=mot('04-commentaire','ruban'), t2m=mot('04-commentaire','mètres'), tCoupe4=mot('04-commentaire','coupe'),
        t45=mot('04-commentaire','45'), tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche',"J'en")-.08, finR=t100m-.08;
  const XC=RC_X+70*RC_L/100;   /* la coupe : à 70 cm du début */

  /* Le ruban du film : entier, puis coupé ; le morceau de 30 cm descend, puis devient le nœud */
  function ruban1(c,T){
    const zR=T>=tRuban?(T<tRuban+.5?zoom(T,tRuban,.3):1):0; if(zR<=0) return;
    if(T<t30){ rcRuban(c,RC_X,RC_X+RC_L,RC_Y,zR); }
    else {
      /* les 70 cm qui restent : ils partent emballer le cadeau au « 03-ouf » */
      const e=T<ouf?0:Math.min(1,(T-ouf)/.4); rcRuban(c,RC_X,XC,RC_Y,1,1-e);
      /* les 30 cm coupés : descendent, puis vont au nœud */
      if(T<tNoeud+.6){ const v=Math.min(1,(T-t30)/.4), w=T<tNoeud?0:Math.min(1,(T-tNoeud)/.6);
        const dx=(RC_BX+RC_BW/2-(XC+RC_L*.15))*w, dy=90*v+(RC_BY-50-RC_Y-90)*w;
        rcRuban(c,XC+14+dx,RC_X+RC_L+14+dx,RC_Y+dy,1,1-w*.9);
        if(T>=t30cm&&T<tNoeud) ecrire(c,'30 cm',(XC+RC_X+RC_L)/2+14,RC_Y+150,52*zoom(T,t30cm,.4),CRAIE.r1); }
    }
    if(T>=tCoupe&&T<t30+.4){ c.strokeStyle=CRAIE.faux; c.lineWidth=5; c.setLineDash([12,9]);
      c.beginPath(); c.moveTo(XC+7,RC_Y-42); c.lineTo(XC+7,RC_Y+42); c.stroke(); c.setLineDash([]); }
    if(T>=t1m&&T<t30) ecrire(c,'1 m',RC_X+RC_L/2,RC_Y+70,54*zoom(T,t1m,.4),BASE5);
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un ruban de 2 m (4 px par cm), on en coupe 45 cm */
      const u=RC_L/200, xc=RC_X+155*u, zR=T>=tRuban4?(T<tRuban4+.5?zoom(T,tRuban4,.3):1):0;
      if(T<t45) rcRuban(c,RC_X,RC_X+RC_L,RC_Y,zR);
      else { rcRuban(c,RC_X,xc,RC_Y); const v=Math.min(1,(T-t45)/.4); rcRuban(c,xc+14,RC_X+RC_L+14,RC_Y+90*v);
        ecrire(c,'45 cm',(xc+RC_X+RC_L)/2+14,RC_Y+150,52*zoom(T,t45,.4),CRAIE.r1); }
      if(T>=t2m&&T<t45) ecrire(c,'2 m',RC_X+RC_L/2,RC_Y+70,54*zoom(T,t2m,.4),BASE5);
      if(T>=tCoupe4&&T<t45+.4){ c.strokeStyle=CRAIE.faux; c.lineWidth=5; c.setLineDash([12,9]);
        c.beginPath(); c.moveTo(xc+7,RC_Y-42); c.lineTo(xc+7,RC_Y+42); c.stroke(); c.setLineDash([]); }
      if(T>=tCombien) ecrire(c,'? cm',RC_XG,330,96*zoom(T,tCombien,.5),CRAIE.jaune);
      tab.maj(); return; }

    const emb=T<ouf?0:(T-ouf-.4)/1.0;
    rcCadeau(c,T>=tCadeau?(T-tCadeau)/.4:0,emb,T>=tNoeud?(T<tNoeud+.8?zoom(T,tNoeud+.3,.3):1):0);
    ruban1(c,T);
    if(T<q){ /* le calcul faux : 1 − 30 = −29 */
      pgLigne(c,T,[['1',t1],['− 30',t30b],['= −29 ?',t29]],RC_XG,300,64,PENCHE5);
      if(T>=tRien) ecrire(c,'?!',RC_XG,420,96*zoom(T,tRien,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* après la carte : 1 m = 100 cm ; 100 − 30 = 70 cm ; les 70 cm qui restent */
    pgLigne(c,T,[['1 m',finR+.1],['= 100 cm',finR+.35]],RC_XG,280,62,CRAIE.blanc);
    pgLigne(c,T,[['100 − 30',t100m],['= 70 cm',t70]],RC_XG,390,62,CRAIE.ok);
    if(T>=t70&&T<ouf) ecrire(c,'70 cm',(RC_X+XC)/2,RC_Y+70,54*zoom(T,t70,.4),CRAIE.ok);
    if(T>=tCadeau3) coche(c,592,385,.5);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Mon ruban de cadeau'),a0('mesure 1 mètre.'));
  const s0=suiteDe(dis,60,62,[a0("J'en coupe"),a0('30 centimètres')],[a0('pour faire le nœud.')]);
  const s1=suiteDe(q,60,62,[a1('1 moins 30…'),a1('moins 29 ?')],[a1('Il me reste un ruban'),a1('plus petit que rien ?!')]);
  qd('Question !');
  const phraseQ=[qd('Combien mesure'),qd('le ruban qui reste ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('1 mètre = 100 centimètres.');
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('100 − 30 :'),rd('70 centimètres.')]),
    ...suiteDe(com,60,62,[a3('70 centimètres :'),a3('assez pour emballer'),a3('le cadeau !')]),
    ...suiteDe(f,60,60,[a4('À toi : un ruban'),a4('de 2 mètres.')],[a4('On en coupe'),a4('45 centimètres.')],
      [a4('Combien reste-t-il,'),a4('en centimètres ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « cm » (« centimètre(s) » : la 2e marque de « 29 centimètres ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="rcw${k}">${w}</span>`; };
  const choixA=`0,7 ${sp('cm',qm('centimètre'))}`, choixB=`29 ${sp('cm',qm('centimètres',2))}`, choixC=`70 ${sp('cm',qm('centimètres',4))}`;
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.rcv${k}) .rcw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="36" y="52" width="258" height="26" fill="${RC_ROSE}" stroke="${RC_ROSE_B}" stroke-width="4"/>`+
    `<line x1="214" y1="36" x2="214" y2="94" stroke="#ff8787" stroke-width="5" stroke-dasharray="9 7"/>`+
    `<text x="165" y="215" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien reste-t-il<br>de mon ruban ?'+PARI,mini);
  return { clips,FIN,titre:'Le ruban du cadeau',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('0,7')],[choixB,tq('B'),tq('29')],[choixC,tq('C'),tq('70')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('rcv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis) g.montre();
      else if(T<q){ T<tRien?g.reflechit():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t70?g.montre():g.fier(); }
      else if(T<com){ T<tEmballer?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
