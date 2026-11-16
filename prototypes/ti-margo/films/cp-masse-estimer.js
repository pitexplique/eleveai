/* ============================================================
   Série Masse CP — ÉPISODE 03 : LA BRANCHE QUI CRAQUE. Outils : films/cp-commun.js + cp-masse.js.
   Trois chats montent sur la branche de Ti Margo : un chaton, un chat, un gros matou. La branche craque !
   Question : qui monte en premier, le plus léger ? Le chaton (A). Ceinture blanche.
   Commentaire : un éléphant, une fourmi, un lapin : range-les du plus léger au plus lourd.
   ⛔ Au CP : léger, lourd, ranger ; pas d'unité. La branche plie d'autant plus que le chat est lourd.
   ============================================================ */
FILMS['estimer']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':8.54,'01-oups':4.38,'02-question':13.1,'02b-reponse':7.04,'03-fin':3.37,'04-commentaire':9.11,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-oups':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTrois=mot('00-accroche','Trois'), tChaton=mot('00-accroche','chaton'), tChat=mot('00-accroche','chat'),
        tMatou=mot('00-accroche','matou'), tCraque=mot('00-accroche','craque');
  const tOups=mot('01-oups','Oups'), tLeger=mot('01-oups','léger');
  const tMatou3=mot('03-fin','matou'), tBas=mot('03-fin','bas');
  const tEle=mot('04-commentaire','éléphant'), tFou=mot('04-commentaire','fourmi'), tLap=mot('04-commentaire','lapin'),
        tLeg4=mot('04-commentaire','léger'), tLou4=mot('04-commentaire','lourd'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tTrois-.08, HAUT=105, SOL=620, SOL_F=690, X={chaton:250,chat:450,matou:640};

  /* le poids sur la branche : elle plie un peu pour le chaton, plus pour le chat, beaucoup pour le gros matou */
  const arrive=(T,t)=>doux(entreM(T,t,t+.5));
  function pliHistoire(T){ let p=12*arrive(T,tChaton)+28*arrive(T,tChat)+60*arrive(T,tMatou)+25*arrive(T,tCraque);
    if(T>=tCraque) p+=9*Math.sin((T-tCraque)*28)*Math.exp(-(T-tCraque)*2.2); return p; }
  function sol(c,y=SOL){ c.strokeStyle='#51cf66'; c.lineWidth=6; c.beginPath(); c.moveTo(130,y+4); c.lineTo(1010,y+4); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : trois animaux à ranger */
      sol(c);
      if(T>=tEle) elephantCraie(c,245,SOL,1.3,zoom(T,tEle,.4));
      if(T>=tFou) fourmiCraie(c,625,SOL,2.2,zoom(T,tFou,.4));
      if(T>=tLap) lapinCraie(c,880,SOL,1.6,zoom(T,tLap,.4));
      if(T>=tLeg4) ecrire(c,'du plus léger',300,HAUT,56*zoom(T,tLeg4,.4),CRAIE.blanc);
      if(T>=tLou4) ecrire(c,'au plus lourd ?',770,HAUT,56*zoom(T,tLou4,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* le gros matou descend : la branche se redresse, le chaton et le chat restent */
      const u=doux(entreM(T,tMatou3,tMatou3+.9)), pli=100-60*u;
      sol(c,SOL_F); brancheCraie(c,pli,0);
      unChat(c,'chaton',X.chaton,brancheY(X.chaton,pli)); unChat(c,'chat',X.chat,brancheY(X.chat,pli));
      const mx=X.matou+(880-X.matou)*u, my=brancheY(X.matou,100)+(SOL_F-brancheY(X.matou,100))*u-Math.sin(u*Math.PI)*70;
      unChat(c,'matou',mx,my);
      if(T>=tBas) ecrire(c,'en bas !',800,HAUT,60*zoom(T,tBas,.4),CRAIE.ret);
      tab.maj(); return; }
    /* l'histoire : la branche, les trois chats qui montent, et la branche qui craque */
    const pli=pliHistoire(T);
    if(T>=finTitre) brancheCraie(c,pli,T>=tCraque?entreM(T,tCraque,tCraque+.3):0);
    for(const [nom,t] of [['chaton',tChaton],['chat',tChat],['matou',tMatou]])
      if(T>=t) unChat(c,nom,X[nom],brancheY(X[nom],pli)-40*(1-arrive(T,t)),zoom(T,t,.4));
    if(T>=tCraque) ecrire(c,'crac !',300,HAUT,64*zoom(T,tCraque,.4),CRAIE.jaune);
    if(T>=sur&&T>=tLeger) ecrire(c,'le plus léger ?',740,HAUT,58*zoom(T,tLeger,.4),CRAIE.ok);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0('Trois chats montent'),a0('sur ma branche :')],[a0('un chaton, un chat,'),a0('un gros matou.')],
      [a0('La branche craque !')]),
    ...suiteDe(q,60,62,[a1('Oups !')],[a1('Il faut ranger :'),a1('qui est le plus léger ?')]),
    ...suiteDe(com,60,64,[a3('Le gros matou, lui,'),a3('reste en bas !')]),
    ...suiteDe(f,60,58,[a4('À toi : un éléphant,'),a4('une fourmi, un lapin.')],[a4('Range-les du plus léger'),a4('au plus lourd.')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui monte en premier,'),qd('le plus léger ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le chaton est'), r2=rd('le plus léger.'), r3=rd('Puis le chat,'), r4=rd('puis le gros matou.');
  const tA=mot('02b-reponse','A');

  const chatMini=(x,y,k,coul)=>`<g fill="${coul}" stroke="#343a40" stroke-width="2.5"><ellipse cx="${x}" cy="${y-30*k}" rx="${32*k}" ry="${30*k}"/>`+
    `<path d="M${x-26*k} ${y-82*k} L${x-20*k} ${y-108*k} L${x-4*k} ${y-92*k} Z M${x+26*k} ${y-82*k} L${x+20*k} ${y-108*k} L${x+4*k} ${y-92*k} Z"/>`+
    `<circle cx="${x}" cy="${y-74*k}" r="${22*k}"/></g>`;
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="18" y="40" width="26" height="198" fill="#6f4518"/><path d="M40 186 Q170 196 300 222" stroke="#8a5a2b" stroke-width="12" fill="none" stroke-linecap="round"/>`+
    chatMini(90,186,.55,'#ffc078')+chatMini(165,192,.8,'#adb5bd')+chatMini(250,206,1.15,'#e8590c')+
    `<text x="78" y="92" font-family="Segoe UI" font-weight="800" font-size="72" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Trois chats :<br>qui est<br>le plus léger ?'+PARI,mini);
  return { clips,FIN,titre:'Qui est le plus léger ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le chaton',tq('A'),tq('chaton')],['le gros matou',tq('B'),tq('matou')],['le chat',tq('C'),tq('chat')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<sur){ T<tCraque?g.montre():g.oups(); }
      else if(T<q){ T<tOups+1.2?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tBas?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
