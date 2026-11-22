/* ============================================================
   Série Masse CE2 — ÉPISODE 06 : LA VALISE DE 24 KG. Outils : films/ce2-commun.js + ce2-masse.js.
   La valise de la copine pèse 24 kg ; à l'aéroport, c'est 23 kg au plus. Elle enlève des chaussettes (100 g) :
   pas assez ! Question : combien enlever, au moins ? 1 kg, 100 g, 24 kg (A : 24 − 23 = 1 kg).
   Fin : elle enlève son gros livre de 1 kg, la balance affiche 23 kg, ça passe. Commentaire : 27 kg. Ceinture jaune.
   ============================================================ */
FILMS['probleme']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':10.04,'01-chaussettes':4.70,'02-question':13.84,'02b-reponse':8.68,'03-fin':4.38,'04-commentaire':9.72,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-chaussettes':1.0,'02-question':3.3,'03-fin':1.6,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,chs,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tSa=mot('00-accroche','Ma'), tValise=mot('00-accroche','valise'), t24=mot('00-accroche','24'), t23=mot('00-accroche','23');
  const tChaus=mot('01-chaussettes','chaussettes'), t100=mot('01-chaussettes','100');
  const tA=mot('02b-reponse','A');
  const tLivre=mot('03-fin','livre'), tPasse=mot('03-fin','passe');
  const tV27=mot('04-commentaire','valise'), t27=mot('04-commentaire','27'), t23c=mot('04-commentaire','23'),
        tEnl=mot('04-commentaire','enlever'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tSa-.08, HAUT=100, SOL=590, XB=290, XP=880, YP=HAUT+80;
  const tKg=mot('03-fin','kilogramme');

  /* la balance à bagages et la valise posée dessus */
  function bagage(c,texte,zv=1,coul){ const dessus=basculeCraie(c,XB,SOL,400,texte); valiseM(c,XB,dessus,1.5,zv,coul); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 27 kg, 23 au plus */
      if(T>=tV27) bagage(c,T>=t27?'27 kg':'',zoom(T,tV27,.4),'#2f9e44');
      if(T>=t23c) pancarteM(c,XP,YP,1.0,zoom(T,t23c,.4));
      if(T>=tEnl){ const z=zoom(T,tEnl,.4); ecrire(c,'− ? kg',XP,SOL-170,120*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : le gros livre de 1 kg sort, la balance affiche 23 kg : ça passe */
      bagage(c,T>=tKg?'23 kg':'24 kg');   /* le livre sort au mot « kilogramme » : 24 − 1 = 23 */
      pancarteM(c,XP,YP,1.0);
      if(T>=tLivre) livreM(c,XP-10,SOL,1.3,zoom(T,tLivre,.4),'1 kg');
      if(T>=tPasse) ecrire(c,'ça passe !',XP-25,SOL-210,78*zoom(T,tPasse,.4),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche et les chaussettes */
    if(T>=tValise) bagage(c,T>=t24&&T<chs?'24 kg':'',zoom(T,tValise,.4));   /* chaussettes ôtées : l'afficheur cherche */
    if(T>=t24&&T<chs) ecrire(c,'24 kg',XP,SOL-200,130*zoom(T,t24,.4),CRAIE.faux);
    if(T>=t23||T>=chs) pancarteM(c,XP,YP,1.0,T>=chs?1:zoom(T,t23,.4));
    if(T>=chs){
      if(T>=tChaus) chaussettesM(c,XP,SOL,1.3,zoom(T,tChaus,.4));
      if(T>=t100) ecrire(c,'100 g',XP,SOL-250,96*zoom(T,t100,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-chaussettes'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(chs,60,62,[a0('Ma copine part'),a0('en vacances.')],[a0('Sa valise pèse'),a0('24 kilogrammes.')],
      [a0("Mais c'est"),a0('23 kilogrammes'),a0('au plus !')]),
    ...suiteDe(q,60,62,[a1('Elle enlève…'),a1('une paire'),a1('de chaussettes.')],[a1('100 grammes.')]),
    ...suiteDe(com,60,64,[a3('Elle enlève'),a3('son gros livre'),a3('de 1 kilogramme…')],[a3('et ça passe !')]),
    ...suiteDe(f,60,58,[a4('À toi : une valise'),a4('de 27 kilogrammes,'),a4('23 au plus.')],
      [a4('Combien de kilogrammes'),a4('enlever ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien doit-elle enlever,'),qd('au moins ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('24 moins 23 :'), r2=rd('il faut enlever'), r3=rd('1 kilogramme.'), r4=rd('Les chaussettes'), r5=rd('ne suffisent pas !');

  poserMiniature(outils,acc+1,'Ma valise<br>est trop lourde ?'+PARI,ardoiseMini([['Valise :'],['24 kg','#ff8787'],['23 kg au plus']]));
  return { clips,FIN,titre:'Valise trop lourde ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,chs,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 kilogramme',tq('A'),tq('B')-.3],['100 grammes',tq('B'),tq('C')-.3],['24 kilogrammes',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3],suite:[r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t24) g.montre();
      else if(T<chs) g.oups();
      else if(T<t100) g.montre();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tPasse?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
