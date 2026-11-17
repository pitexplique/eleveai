/* ============================================================
   Série Durées CP — ÉPISODE 03 : BONNE NUIT… À 8 HEURES DU MATIN. Outils : films/cp-commun.js + cp-duree.js.
   Il est 8 heures : je mets mon pyjama, je vais au lit. Bonne nuit !
   Mais le soleil se lève, mes copains partent à l'école : il est 8 heures du MATIN. Réponse A : on va à l'école.
   Vite, je cours à l'école… encore en pyjama !
   Commentaire : il est 4 heures de l'après-midi. Que fais-tu d'habitude ?
   ============================================================ */
FILMS['jour-semaine']=function(outils){
  const DUR={'00-accroche':7.04,'01-oups':7.57,'02-question':13.14,'02b-reponse':6.86,'03-ouf':5.77,'04-commentaire':7.63,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.5,'01-oups':.5,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oups,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* les instants des mots */
  const t8=mot('00-accroche','8'), tLit=mot('00-accroche','lit'), tBonne=mot('00-accroche','Bonne');
  const tSoleil=mot('01-oups','soleil'), tCopains=mot('01-oups','copains'), tOups=mot('01-oups','Oups'), tMatin=mot('01-oups','matin');
  const tVite=mot('03-ouf','Vite'), tCours=mot('03-ouf','cours'), tZut=mot('03-ouf','Zut'), tPyj3=mot('03-ouf','pyjama');
  const t4=mot('04-commentaire','4'), tApres=mot('04-commentaire',"l'après-midi"), tQue=mot('04-commentaire','Que'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t8-.08;

  /* L'ardoise fait 1056 × 720. L'horloge en haut à gauche (Ti Margo cache le bas milieu-gauche), l'écrit à DROITE. */
  const RX=270, RY=230, RR=160, XD=790;
  const monte=(T,t,d)=>T<t?0:lisse(Math.min(1,(T-t)/d));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 4 heures de l'après-midi */
      horlogeCraie(c,RX,RY,RR,4,0,zoom(T,com+.1,.4));
      if(T>=t4) ecrire(c,'4 heures',XD,RY-90,84*zoom(T,t4,.5),CRAIE.jaune);
      if(T>=tApres){ ecrire(c,"de l'après-midi",XD,RY+10,58*zoom(T,tApres,.4),BOND); soleilCraie(c,RX+RR+70,RY-RR+10,30,zoom(T,tApres,.4)); }
      if(T>=tQue) ecrire(c,'?',XD,RY+150,120*zoom(T,tQue,.5),CRAIE.blanc);
      tab.maj(); return; }

    if(T>=ouf){ /* vite à l'école… en pyjama */
      ecoleCraie(c,RX+10,RY+170,300,zoom(T,ouf+.1,.4));
      soleilCraie(c,RX+250,RY-150,36,1);
      if(T>=tCours) ecrire(c,"vite, à l'école !",XD,RY-60,62*zoom(T,tCours,.4),CRAIE.blanc);
      if(T>=tPyj3) ecrire(c,'en pyjama !',XD,RY+60,70*zoom(T,tPyj3,.4),CRAIE.faux);
      tab.maj(); return; }

    /* 8 heures : le lit, la nuit… puis le soleil se lève */
    horlogeCraie(c,RX,RY-30,RR,8,0,zoom(T,acc+.2,.4));
    if(T>=t8) ecrire(c,'8 heures',XD,RY-130,80*zoom(T,t8,.5),CRAIE.blanc);
    if(T>=tLit && T<oups) litCraie(c,XD-170,RY+150,340,zoom(T,tLit,.4),T>=tBonne?Math.min(1,(T-tBonne)/1.2):0);
    if(T>=oups){
      if(T>=tSoleil) soleilCraie(c,RX+RR+60,RY+120-140*monte(T,tSoleil,1.2),34,1);
      if(T>=tCopains) ecoleCraie(c,XD,RY+330,240,zoom(T,tCopains,.4));
      if(T>=tMatin) ecrire(c,'du matin !',XD,RY-40,72*zoom(T,tMatin,.5),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Il est 8 heures.')),
    ...suiteDe(oups,60,60,[a0('Je mets mon pyjama.')],[a0('Je vais au lit.')],[a0('Bonne nuit !')]),
    ...suiteDe(q,60,58,[a1('Mais le soleil se lève.')],[a1('Mes copains partent'),a1("à l'école.")],
      [a1('Oups, il est'),a1('8 heures du matin !')]),
    ...suiteDe(com,60,62,[a3("Vite, je cours à l'école.")],[a3('Zut… je suis'),a3('encore en pyjama !')]),
    ...suiteDe(f,60,60,[a4('À toi : il est 4 heures'),a4("de l'après-midi.")],[a4("Que fais-tu d'habitude ?")],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('À 8 heures du matin,'),qd('que fait-on ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("Le matin, on va à l'école."), r2=rd('Le soir, on va au lit.');
  const tA=mot('02b-reponse','A');

  poserMiniature(outils,acc+1,'8 heures :<br>au lit ?'+PARI,ardoiseMini([['8 heures',CRAIE.blanc],['bonne nuit ?',CRAIE.jaune]]));
  return { clips,FIN,titre:'Bonne nuit… à 8 heures ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oups,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[["on va à l'école",tq('A'),tq("l'école")],['on se couche',tq('B'),tq('couche')],['on dîne',tq('C'),tq('dîne')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      /* Vite ! Ti Margo saute */
      scene.y=0;
      for(const t of [tVite,tCours]) if(T>=t-.05&&T<t+.5) scene.y=.3*Math.sin((T-t+.05)/.55*Math.PI);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<oups){ T<tBonne?g.montre():g.fier(); }
      else if(T<q){ T<tOups?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tZut?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; scene.y=0; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
