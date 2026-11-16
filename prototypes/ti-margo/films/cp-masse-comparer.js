/* ============================================================
   Série Masse CP — ÉPISODE 02 : LE PLATEAU QUI DESCEND. Outils : films/cp-commun.js + cp-masse.js.
   Ti Margo pose son gros doudou sur la balance ; son copain, sa petite voiture en fer. Le doudou monte !
   Question : qui est le plus lourd ? La voiture (B). Ceinture blanche.
   Commentaire : 2 pommes d'un côté, combien de pommes pareilles de l'autre pour l'équilibre ?
   ⛔ balanceCraie : a > 0 = le plateau de DROITE descend (la voiture est à droite).
   ============================================================ */
FILMS['comparer']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':9.94,'01-surprise':3.69,'02-question':14.63,'02b-reponse':6.05,'03-fin':4.52,'04-commentaire':9.51,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-surprise':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tDou=mot('00-accroche','doudou'), tBal=mot('00-accroche','balance'),
        tVoit=mot('00-accroche','voiture'), tMonte=mot('00-accroche','monte');
  const tGros=mot('01-surprise','gros'), tLourde=mot('01-surprise','lourde');
  const tGout=mot('03-fin','goûter'), tEq=mot('03-fin','Équilibre');
  const tPom=mot('04-commentaire','pommes'), tPla=mot('04-commentaire','plateau'), tAutre=mot('04-commentaire',"l'autre"),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, PV={x:528,y:280,L:250}, HAUT=105;

  /* une flèche à la craie, verticale : (x, y) = le milieu, sens = -1 vers le haut, +1 vers le bas */
  function fleche(c,x,y,sens,coul){ c.strokeStyle=coul; c.lineWidth=10; c.lineCap='round'; c.beginPath();
    c.moveTo(x,y-sens*45); c.lineTo(x,y+sens*45); c.moveTo(x-24,y+sens*20); c.lineTo(x,y+sens*45); c.lineTo(x+24,y+sens*20); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2 pommes d'un côté, combien de l'autre ? */
      if(T>=tPla){ const haut=balanceCraie(c,PV.x,PV.y,PV.L,0,zoom(T,tPla,.4));
        if(T>=tPom){ const u=zoom(T,tPom,.4); pommeCraie(c,haut.g.x-50,haut.g.y-46,46,u); pommeCraie(c,haut.g.x+50,haut.g.y-46,46,u); }
        if(T>=tAutre) ecrire(c,'?',haut.d.x,haut.d.y-70,130*zoom(T,tAutre,.4),CRAIE.jaune); }
      else if(T>=tPom){ const u=zoom(T,tPom,.4); pommeCraie(c,PV.x-50,360,46,u); pommeCraie(c,PV.x+50,360,46,u); }
      if(T>=tPom) ecrire(c,'2 pommes',PV.x-PV.L,HAUT,58*zoom(T,tPom,.4),CRAIE.blanc);
      if(T>=tAutre) ecrire(c,'combien ?',PV.x+PV.L,HAUT,58*zoom(T,tAutre,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* le goûter rejoint le doudou : la balance revient droite */
      const a=.3*(1-doux(entreM(T,tGout+.4,tEq))), haut=balanceCraie(c,PV.x,PV.y,PV.L,a,1);
      doudouCraie(c,haut.g.x-(T>=tGout?46:0),haut.g.y,1.05,1); voitureFerCraie(c,haut.d.x,haut.d.y,1.1,1);
      if(T>=tGout){ biscuitCraie(c,haut.g.x+78,haut.g.y-34,34,zoom(T,tGout,.4)); ecrire(c,'+ goûter',PV.x-PV.L,HAUT,54*zoom(T,tGout,.4),CRAIE.r1); }
      if(T>=tEq) ecrire(c,'équilibre !',PV.x+PV.L+20,HAUT,58*zoom(T,tEq,.4),CRAIE.ok);
      tab.maj(); return; }
    /* l'histoire : le doudou, la balance, la voiture… et le doudou qui monte */
    const a=T>=tMonte?.3*doux(entreM(T,tMonte,tMonte+1)):0;
    const haut=T>=tBal?balanceCraie(c,PV.x,PV.y,PV.L,a,zoom(T,tBal,.4)):null;
    const gx=haut?haut.g.x:PV.x-PV.L, gy=haut?haut.g.y:PV.y+135;
    if(T>=tDou) doudouCraie(c,gx,gy,1.05,zoom(T,tDou,.4));
    if(T>=tVoit&&haut) voitureFerCraie(c,haut.d.x,haut.d.y,1.1,zoom(T,tVoit,.4));
    if(T<sur){
      if(T>=tMonte){ const u=zoom(T,tMonte,.4); fleche(c,gx-175,gy-90,-1,CRAIE.jaune); ecrire(c,'monte !',PV.x-PV.L,HAUT,58*u,CRAIE.jaune); }
    } else {
      if(T>=tGros) ecrire(c,'gros',PV.x-PV.L,HAUT,62*zoom(T,tGros,.4),CRAIE.blanc);
      if(T>=tLourde){ const u=zoom(T,tLourde,.4); ecrire(c,'plus lourde',PV.x+PV.L+30,HAUT,56*u,CRAIE.ret); fleche(c,haut.d.x+175,haut.d.y-40,1,CRAIE.ret); }
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-surprise'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0('Je mets mon doudou'),a0('sur la balance.')],[a0('Mon copain met sa petite'),a0('voiture en fer.')],
      [a0('Mon doudou monte'),a0('tout en haut !')]),
    ...suiteDe(q,60,62,[a1('Mon doudou est gros…'),a1('mais la voiture'),a1('est plus lourde !')]),
    ...suiteDe(com,60,64,[a3("J'ajoute mon goûter"),a3('avec le doudou…')],[a3('Équilibre !')]),
    ...suiteDe(f,60,58,[a4('À toi : 2 pommes'),a4('sur un plateau.')],[a4('Combien de pommes'),a4("pareilles de l'autre côté,"),a4("pour l'équilibre ?")],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Le plateau du doudou monte.'),qd('Qui est le plus lourd ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le plateau qui descend'), r2=rd('porte le plus lourd :'), r3=rd('la voiture.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<line x1="150" y1="70" x2="150" y2="215" stroke="#dee2e6" stroke-width="7"/><rect x="105" y="212" width="90" height="12" fill="#8a5a2b"/>`+
    `<line x1="60" y1="52" x2="240" y2="88" stroke="#fab005" stroke-width="7" stroke-linecap="round"/><circle cx="150" cy="70" r="8" fill="#fab005"/>`+
    `<path d="M22 108 Q60 128 98 108 Z" fill="#fab005"/><path d="M202 144 Q240 164 278 144 Z" fill="#fab005"/>`+
    `<circle cx="60" cy="80" r="17" fill="#c08552" stroke="#6f4518" stroke-width="3"/><ellipse cx="60" cy="99" rx="15" ry="10" fill="#c08552"/>`+
    `<rect x="214" y="122" width="52" height="16" rx="4" fill="#868e96" stroke="#343a40" stroke-width="3"/><circle cx="226" cy="140" r="6" fill="#212529"/><circle cx="254" cy="140" r="6" fill="#212529"/>`+
    `<text x="292" y="92" font-family="Segoe UI" font-weight="800" font-size="76" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le doudou<br>ou la voiture :<br>le plus lourd ?'+PARI,mini);
  return { clips,FIN,titre:'Qui est le plus lourd ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le doudou',tq('A'),tq('doudou',2)],['la voiture',tq('B'),tq('voiture')],['personne',tq('C'),tq('personne')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<sur){ T<tMonte?g.montre():g.oups(); }
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tEq?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
