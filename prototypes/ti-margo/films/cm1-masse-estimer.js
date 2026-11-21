/* ============================================================
   Série Masse CM1 — ÉPISODE 04 : ESTIMER. Outils : films/cm1-commun.js + cm1-masse.js.
   Le copain pèse une plume d'oiseau : la balance affiche… « 0 g » ! Pourtant la plume a une masse.
   Question : une plume pèse… C (moins de 1 g) : moins qu'un trombone.
   Fin : il en pose 1 000 et la balance bouge enfin. Commentaire : un œuf, combien de grammes ? Ceinture blanche.
   ============================================================ */
FILMS['estimer']=function(outils){
  deuxAuPlusM();
  { /* « 1 000 » : « 000 » a trois marques identiques de suite → une seule */
    for(const k of ['03-fin']){ const CR=window.CUES[VIDEO][k];
      window.CUES[VIDEO][k]=CR.filter((x,i)=>!(i>0&&CR[i-1][1]===x[1]&&/^[\d  ]+$/.test(x[1]))); } }
  const DUR={'00-accroche':6.89,'01-surprise':3.84,'02-question':13.49,'02b-reponse':5.86,'03-fin':4.30,'04-commentaire':6.72,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-surprise':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tPlume=mot('00-accroche','plume'), tBal=mot('00-accroche','balance'),
        tZero=mot('00-accroche','zéro');
  const tMasse=mot('01-surprise','masse');
  const tC=mot('02b-reponse','C');
  const tPose=mot('03-fin','pose'), tMille=mot('03-fin','000'), tBouge=mot('03-fin','bouge');
  const tOeuf=mot('04-commentaire','œuf'), tGr=mot('04-commentaire','grammes'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, SOL=590, XR=840;
  const BX=330, BS=1.45;                          /* la balance : au milieu de la partie gauche */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : un œuf, combien de grammes ? */
      oeufM(c,330,SOL,300,zoom(T,com,.4));
      if(T>=tOeuf) ecrire(c,'1 œuf',XR,220,100*zoom(T,tOeuf,.4),CRAIE.blanc);
      if(T>=tGr) ecrire(c,'= ? g',XR,370,120*zoom(T,tGr,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : 1 000 plumes, la balance bouge enfin */
      const bouge=T>=tBouge;
      const yP=balanceNumM(c,BX,SOL,BS,bouge?'1 g':'0 g',1,bouge&&T<tBouge+1.2?1:0);
      if(T>=tPose) tasPlumesM(c,BX,yP,420,zoom(T,tPose,.5));
      if(T>=tMille) ecrire(c,N('1 000'),XR,190,110*zoom(T,tMille,.4),CRAIE.blanc);
      if(T>=tMille) ecrire(c,'plumes',XR,300,80*zoom(T,tMille,.4),CRAIE.blanc);
      if(bouge) ecrire(c,'Ça bouge !',XR,440,72*zoom(T,tBouge,.4),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : la plume sur la balance, l'afficheur reste à « 0 g » */
    if(T>=finTitre){
      const yP=balanceNumM(c,BX,SOL,BS,'0 g',zoom(T,finTitre,.4),T>=tZero&&T<tZero+1.4?1:0);
      if(T>=tPlume) plumeM(c,BX,yP-40,360,zoom(T,tPlume,.4),-.3);
      if(T>=tZero){ const u=entreM(T,tZero,tZero+.5); c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.setLineDash([18,12]);
        c.beginPath(); c.ellipse(BX-73,SOL-69,165,72,0,0,7*u); c.stroke(); c.setLineDash([]); } }
    if(T>=tZero) ecrire(c,'0 g ?!',XR,200,120*zoom(T,tZero,.4),CRAIE.faux);
    if(T>=tMasse) ecrire(c,'masse ≠ 0',XR,360,62*zoom(T,tMasse,.4),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-surprise'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0('Mon copain pèse'),a0("une plume d'oiseau.")],[a0('La balance affiche…'),a0('zéro !')]),
    ...suiteDe(q,60,62,[a1('Zéro ?')],[a1('La plume a pourtant'),a1('une masse !')]),
    ...suiteDe(com,60,62,[a3(N('Il en pose 1 000…'))],[a3('et la balance'),a3('bouge enfin !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien pèse'),a4('un œuf, à ton avis,'),a4('en grammes ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Une plume pèse…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Une plume pèse'), r2=rd('moins de 1 gramme :'), r3=rd("moins qu'un trombone !");

  poserMiniature(outils,acc+1,'La balance affiche 0 g :<br>la plume ne pèse rien ?'+PARI,
    ardoiseMini([['plume'],['= 0 g ?','#ffd43b']]));
  return { clips,FIN,titre:'Combien pèse une plume ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['environ 1 kg',tq('A'),tq('B')-.3],['environ 100 g',tq('B'),tq('C')-.3],['moins de 1 g',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tZero) g.montre();
      else if(T<sur) g.oups();
      else if(T<q){ T<tMasse?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tBouge?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
