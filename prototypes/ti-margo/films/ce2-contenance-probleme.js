/* ============================================================
   Série Contenance CE2 — ÉPISODE 04 : L'ARROSOIR. Outils : films/ce2-commun.js + ce2-contenance.js.
   Arrosoir de 2 L, 3 plantes à 50 cL : « 2 moins 50 ? Impossible ! » La même unité d'abord : 2 L = 200 cL.
   Question : combien reste-t-il ? (C, 50 cL). Ceinture jaune.
   Commentaire : un seau de 3 L, 4 verres de 25 cL : combien de centilitres reste-t-il ?
   ============================================================ */
FILMS['probleme']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':14.12,'01-oups':6.05,'02-question':15.85,'02b-reponse':10.93,'03-ouf':5.42,'04-commentaire':11.56,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tArr=mot('00-accroche','arrosoir'), t2L=mot('00-accroche','litres'),
        tPl=mot('00-accroche','plantes'), t50=mot('00-accroche','50'), tMoins=mot('00-accroche','moins'),
        tImp=mot('00-accroche','Impossible');
  const tUnite=mot('01-oups','unité'), t200=mot('01-oups','200');
  const tCactus=mot('03-ouf','cactus'), tBeauc=mot('03-ouf','beaucoup');
  const tSeau=mot('04-commentaire','seau'), t3L=mot('04-commentaire','litres'), tVer=mot('04-commentaire','verres'),
        t25=mot('04-commentaire','25'), tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, XR=790, AR={x:170,y:610};

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : un seau de 3 L, 4 verres de 25 cL */
      if(T>=tSeau) recipientCraie(c,'seau',220,560,260,220,.75,EAU,zoom(T,tSeau,.4));
      if(T>=t3L) ecrire(c,'3 L',220,640,62*zoom(T,t3L,.4),CRAIE.jaune);
      if(T>=tVer) for(let k=0;k<4;k++) recipientCraie(c,'verre',640+k*110,300,80,100,.8,EAU,zoom(T,tVer+k*.12,.4));
      if(T>=t25) ecrire(c,'25 cL chacun',805,360,52*zoom(T,t25,.4),CRAIE.jaune);
      if(T>=tComb) ecrire(c,'il reste ?',805,500,70*zoom(T,tComb,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* l'arrosoir, à gauche ; il se vide un peu à chaque plante arrosée */
    const niv=T<ouf?.85:.25;
    if(T>=tArr) arrosoirCraie(c,AR.x,AR.y,1.15,niv,zoom(T,tArr,.4));
    const lab=T>=ouf?'50 cL':(T>=t200?'200 cL':'2 L');
    if(T>=t2L) ecrire(c,lab,AR.x,665,56*zoom(T,T>=t200&&T<ouf?t200:t2L,.4),T>=t200?CRAIE.ok:CRAIE.jaune);
    if(T<uni){
      if(T>=tPl) for(let k=0;k<3;k++) planteCraie(c,640+k*125,330,.85,zoom(T,tPl+k*.15,.4));
      if(T>=t50) ecrire(c,'50 cL chacune',765,375,46*zoom(T,t50,.4),CRAIE.jaune);
      if(T>=tMoins) ecrire(c,'2 − 50 ?',XR,480,84*zoom(T,tMoins,.4),CRAIE.faux);
      if(T>=tImp) ecrire(c,'impossible !',XR,580,56*zoom(T,tImp,.4),CRAIE.faux);
    } else if(T<q){
      if(T>=tUnite) ecrire(c,'la même unité !',XR,190,62*zoom(T,tUnite,.4),CRAIE.jaune);
      if(T>=t200){ ecrire(c,'2 L',XR,320,80,CRAIE.blanc); ecrire(c,'= 200 cL',XR,430,80*zoom(T,t200,.4),CRAIE.ok); }
    } else if(T>=ouf){ /* ouf : il reste juste assez pour le cactus */
      if(T>=tCactus) planteCraie(c,XR,420,1.1,zoom(T,tCactus,.4),true);
      if(T>=tBeauc){ ecrire(c,'juste assez !',XR,520,58*zoom(T,tBeauc,.4),CRAIE.ok); coche(c,AR.x+60,180,.45); }
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Mon arrosoir contient'),a0('2 litres.')],[a0("J'arrose mes 3 plantes,"),a0('50 centilitres chacune.')],
      [a0('Il reste… 2 moins 50 ?')],[a0('Impossible !')]),
    ...suiteDe(q,60,62,[a1('Ah oui : la même unité'),a1("d'abord !")],[a1("2 litres, c'est"),a1('200 centilitres.')]),
    ...suiteDe(com,60,62,[a3('Il en reste juste assez'),a3('pour mon cactus.')],[a3('Il ne boit pas beaucoup !')]),
    ...suiteDe(f,60,60,[a4('À toi : un seau de 3 litres.')],[a4('Tu verses 4 verres'),a4('de 25 centilitres.')],
      [a4('Combien de centilitres'),a4('reste-t-il ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de centilitres'),qd("reste-t-il dans l'arrosoir ?")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('3 plantes : 3 × 50,'), r2=rd('150 centilitres.'), r3=rd('200 − 150,'), r4=rd('50 centilitres.');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="110" width="90" height="100" rx="10" fill="#4dabf7" stroke="#40c057" stroke-width="6"/><path d="M128 140 L180 90" stroke="#40c057" stroke-width="8"/>`+
    `<text x="85" y="95" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ffd43b" text-anchor="middle">2 L</text>`+
    `<text x="255" y="185" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'2 L − 3 × 50 cL :<br>il en reste ?'+PARI,mini);
  return { clips,FIN,titre:"L'arrosoir",ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['150 centilitres',tq('A'),tq('150')],['0 centilitre',tq('B'),tq('0')],['50 centilitres',tq('C'),tq('50')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tMoins?g.montre():g.oups(); }
      else if(T<q){ T<t200?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tBeauc?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
