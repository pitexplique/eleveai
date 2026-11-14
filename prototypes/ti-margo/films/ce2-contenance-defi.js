/* ============================================================
   Série Contenance CE2 — ÉPISODE 05 : QUI A RAISON ? Outils : films/ce2-commun.js + ce2-contenance.js.
   Trois amis, une même bouteille : Léa dit 50 cL, Kevin 5 dL, Maya un demi-litre. Deux se trompent ?
   Question : qui a raison ? (C, les trois : 5 dL = 50 cL, ½ L = 50 cL). Ceinture orange.
   Commentaire : 1 L et 5 dL, ça fait combien de centilitres ?
   ============================================================ */
FILMS['defi']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':13.3,'01-oups':5.58,'02-question':11.63,'02b-reponse':12.88,'03-ouf':4.95,'04-commentaire':7.46,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMes=mot('00-accroche','Mes'), tBout=mot('00-accroche','bouteille'), tLea=mot('00-accroche','Léa'),
        tKevin=mot('00-accroche','Kevin'), tMaya=mot('00-accroche','Maya');
  const tDiff=mot('01-oups','différentes'), tDeux=mot('01-oups','deux');
  const tTout=mot('03-ouf','Tout'), tPart=mot('03-ouf','partage');
  const t1L=mot('04-commentaire','litre'), t5dL=mot('04-commentaire','décilitres'), tComb=mot('04-commentaire','combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tMes-.08, XL=440, B={x:190,y:610,w:140,h:290};
  const AMIS=[['Léa','50 cL',tLea,'#f783ac'],['Kevin','5 dL',tKevin,'#74c0fc'],['Maya','½ L',tMaya,'#ffc078']];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1 L et 5 dL = ? cL */
      if(T>=t1L){ bouteilleCraie(c,220,580,140,280,.85,EAU,zoom(T,t1L,.4)); ecrire(c,'1 L',220,650,58*zoom(T,t1L,.4),CRAIE.jaune); }
      if(T>=t5dL){ bouteilleCraie(c,440,580,100,140,.85,EAU,zoom(T,t5dL,.4)); ecrire(c,'5 dL',440,650,58*zoom(T,t5dL,.4),CRAIE.jaune); }
      if(T>=tComb) ecrire(c,'= ? cL',820,360,96*zoom(T,tComb,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tBout) bouteilleCraie(c,B.x,B.y,B.w,B.h,.85,JUS,zoom(T,tBout,.4));
    AMIS.forEach(([nom,val,t,coul],k)=>{ if(T<t) return; const y=180+k*130, z=zoom(T,t,.4);
      ecrire(c,nom+' :',XL,y,52*z,coul,'left');
      if(T>=tTout&&T<com) ecrire(c,val+' = 50 cL',XL+210,y,52,CRAIE.ok,'left');
      else ecrire(c,val,XL+210,y,64*z,CRAIE.jaune,'left'); });
    if(T>=uni&&T<q){
      if(T>=tDiff) ecrire(c,'3 réponses ?',B.x+40,110,52*zoom(T,tDiff,.4),CRAIE.gris);
      if(T>=tDeux) ecrire(c,'2 se trompent ?',XL+200,590,56*zoom(T,tDeux,.4),CRAIE.faux);
    } else if(T>=ouf){
      if(T>=tTout) coche(c,B.x+60,130,.45);
      if(T>=tPart) ecrire(c,'on partage ?',XL+200,590,58*zoom(T,tPart,.4),CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Mes trois amis se disputent'),a0('pour la même bouteille.')],[a0('Léa dit : 50 centilitres.')],
      [a0('Kevin : 5 décilitres.')],[a0('Maya : un demi-litre.')]),
    ...suiteDe(q,60,62,[a1('Trois réponses différentes…')],[a1('Il y en a forcément deux'),a1('qui se trompent ?')]),
    ...suiteDe(com,60,62,[a3('Tout le monde a raison.')],[a3('Alors… on partage'),a3('la bouteille ?')]),
    ...suiteDe(f,60,60,[a4('À toi : 1 litre'),a4('et 5 décilitres,')],[a4('ça fait combien'),a4('de centilitres ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui a raison ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('5 décilitres : 5 × 10,'), r2=rd('50 centilitres.'), r3=rd('Un demi-litre : la moitié de 100,'),
    r4=rd('50 centilitres.'), r5=rd("C'est pareil !");
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="36" y="80" width="60" height="140" rx="10" fill="#ff922b" stroke="#dee2e6" stroke-width="5"/><rect x="54" y="54" width="24" height="26" fill="#2f9e44"/>`+
    `<text x="210" y="80" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ffd43b" text-anchor="middle">50 cL</text>`+
    `<text x="210" y="140" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ffd43b" text-anchor="middle">5 dL</text>`+
    `<text x="210" y="200" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ffd43b" text-anchor="middle">½ L</text></svg>`;
  poserMiniature(outils,acc+1,'50 cL, 5 dL, ½ L :<br>qui a raison ?'+PARI,mini);
  return { clips,FIN,titre:'Qui a raison ?',ceinture:2,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['seulement Léa',tq('A',2),tq('Léa')],['personne',tq('B'),tq('personne')],['les trois',tq('C'),tq('trois')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tMaya?g.montre():g.oups(); }
      else if(T<q) g.reflechit();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tPart?g.pouce():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
