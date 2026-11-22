/* ============================================================
   Série Masse CE2 — ÉPISODE 05 : MON CHAT PÈSE 400 KG ! Outils : films/ce2-commun.js + ce2-masse.js.
   La copine dit que le chat pèse 400 kg. 400 kg… c'est la masse d'un ours !
   Question : un chat pèse environ… 400 kg, 4 g, 4 kg (C : quatre briques de lait).
   Fin : le chat vexé part bouder sur le canapé. Commentaire : un chien, combien de kilogrammes ? Ceinture jaune.
   ============================================================ */
FILMS['estimer']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':5.42,'01-ours':4.45,'02-question':13.34,'02b-reponse':6.22,'03-fin':4.02,'04-commentaire':7.04,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-ours':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ours,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMa=mot('00-accroche','Ma'), tChat=mot('00-accroche','chat'), t400=mot('00-accroche','400');
  const tOurs=mot('01-ours','ours');
  const tC=mot('02b-reponse','C');
  const tVexe=mot('03-fin','vexé'), tBouder=mot('03-fin','bouder');
  const tChien=mot('04-commentaire','chien'), tKg=mot('04-commentaire','kilogrammes'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMa-.08, HAUT=100, SOL=590, GRIS='#adb5bd';

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : un chien, combien de kilogrammes ? */
      if(T>=tChien) chienM(c,300,SOL,2.2,zoom(T,tChien,.4));
      if(T>=tKg){ const z=zoom(T,tKg,.4); ecrire(c,'= ? kg',760,SOL-200,130*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : le chat vexé boude sur le canapé */
      const assise=canapeM(c,528,SOL,1.75);
      chatM(c,528,assise+10,1.45,1,GRIS,T>=tBouder);  /* il se retourne au mot « bouder » */
      if(T>=tVexe) ecrire(c,'vexé !',528,HAUT+20,96*zoom(T,tVexe,.4),CRAIE.faux);
      ecrire(c,'4 kg',150,HAUT+20,90,CRAIE.ok);
      tab.maj(); return; }
    if(T<ours){ /* l'accroche : le chat… de « 400 kg » ?! */
      if(T>=tChat) chatM(c,300,SOL,2.0,zoom(T,tChat,.4),GRIS);
      if(T>=t400) ecrire(c,'400 kg ?!',720,HAUT+180,140*zoom(T,t400,.4),CRAIE.faux);
      tab.maj(); return; }
    /* 400 kg : la masse d'un ours ! Le chat, tout petit à côté */
    ecrire(c,'400 kg',250,HAUT,110,CRAIE.faux);
    if(T>=tOurs){ oursM(c,390,SOL,1.75,zoom(T,tOurs,.5)); ecrire(c,'= un ours !',720,HAUT,96*zoom(T,tOurs,.4),CRAIE.jaune); }
    chatM(c,930,SOL,1.1,1,GRIS);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-ours'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(ours,60,62,[a0('Ma copine dit que'),a0('mon chat pèse')],[a0('400 kilogrammes !')]),
    ...suiteDe(q,60,62,[a1('400 kilogrammes ?')],[a1("C'est la masse"),a1("d'un ours !")]),
    ...suiteDe(com,60,64,[a3('Mon chat est vexé,'),a3('il part bouder'),a3('sur le canapé.')]),
    ...suiteDe(f,60,58,[a4('À toi : combien pèse'),a4('un chien, à ton avis,')],[a4('en kilogrammes ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Un chat pèse environ…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Un chat pèse environ'), r2=rd('4 kilogrammes :'), r3=rd('quatre briques de lait.');

  poserMiniature(outils,acc+1,'Mon chat<br>pèse 400 kg ?'+PARI,ardoiseMini([['Mon chat :'],['400 kg ?','#ff8787']]));
  return { clips,FIN,titre:'Un chat de 400 kg ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ours,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['400 kilogrammes',tq('A'),tq('B')-.3],['4 grammes',tq('B'),tq('C')-.3],['4 kilogrammes',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t400) g.montre();
      else if(T<ours) g.oups();
      else if(T<tOurs) g.montre();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tVexe?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
