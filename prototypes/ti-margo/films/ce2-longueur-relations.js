/* ============================================================
   Série Longueurs CE2 — ÉPISODE 02 : LA FICELLE DU CERF-VOLANT. Outils : films/ce2-commun.js + ce2-longueur.js.
   Ti Margo voulait 1 m de ficelle ; le vendeur lui donne 100 cm : « beaucoup trop ! » Il mesure : c'est pareil.
   Question : combien de cm dans 2 m ? (A, 200). Ceinture blanche.
   Commentaire : combien de mètres dans 1 kilomètre ?
   ============================================================ */
FILMS['relations']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':11.23,'01-oups':6.51,'02-question':11.12,'02b-reponse':7.89,'03-ouf':4.3,'04-commentaire':5.95,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), t1m=mot('00-accroche','1'), tFic=mot('00-accroche','ficelle'), tCerf=mot('00-accroche','cerf-volant'),
        tVend=mot('00-accroche','vendeur'), t100=mot('00-accroche','100'), tTrop=mot('00-accroche','trop');
  const tMes=mot('01-oups','mesure'), tPareil=mot('01-oups','pareil'), t100b=mot('01-oups','100'), t1mb=mot('01-oups','1');
  const tOufM=mot('03-ouf','mètre'), tEnv=mot('03-ouf',"s'envole");
  const t1km=mot('04-commentaire','kilomètre'), tComb=mot('04-commentaire','combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, XR=780, F0=80, F1=500, YF=330;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1 km = ? m */
      if(T>=tComb) ecrire(c,'combien de m ?',528,170,70*zoom(T,tComb,.4),CRAIE.jaune);
      if(T>=t1km) ecrire(c,'1 km = ? m',528,400,130*zoom(T,t1km,.5),CRAIE.blanc);
      tab.maj(); return; }
    if(T<uni){
      if(T>=tCerf) cerfVolant(c,170,170,.9,zoom(T,tCerf,.4));
      if(T>=t1m) ecrire(c,'1 m',XR,150,110*zoom(T,t1m,.4),CRAIE.jaune);
      if(T>=tFic) ecrire(c,'de ficelle',XR,250,52*zoom(T,tFic,.4),CRAIE.gris);
      if(T>=tVend) cordeCraie(c,F0,YF+130,F1-F0,CRAIE.blanc,entreL(T,tVend,t100),10);
      if(T>=t100) ecrire(c,'100 cm',XR,400,100*zoom(T,t100,.4),CRAIE.blanc);
      if(T>=tTrop) ecrire(c,'beaucoup trop ?',XR,520,60*zoom(T,tTrop,.4),CRAIE.faux);
    } else if(T<q){
      cerfVolant(c,170,170,.9,1);
      cordeCraie(c,F0,YF+130,F1-F0,CRAIE.blanc,1,10);
      if(T>=tMes){ regleH(c,F0,YF+170,(F1-F0)/10,10,entreL(T,tMes,tMes+.5),false); coteH(c,F0,F1,YF+80,'1 m',CRAIE.jaune,44); }
      if(T>=tPareil) ecrire(c,"c'est pareil !",XR,180,70*zoom(T,tPareil,.4),CRAIE.ok);
      if(T>=t100b) ecrire(c,'100 cm',XR,330,100*zoom(T,t100b,.4),CRAIE.blanc);
      if(T>=t1mb) ecrire(c,'= 1 m',XR,460,100*zoom(T,t1mb,.4),CRAIE.ok);
    } else { /* ouf : le cerf-volant s'envole, avec son mètre de ficelle */
      const u=T>=tEnv?entreL(T,tEnv,tEnv+1.2):0;
      cerfVolant(c,170+u*120,330-u*190,.9,1,90,620);
      if(T>=tOufM) ecrire(c,'1 m = 100 cm',XR,250,76*zoom(T,tOufM,.4),CRAIE.ok);
      if(T>=tEnv) ecrire(c,'il vole !',XR,420,80*zoom(T,tEnv,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Je voulais 1 mètre de ficelle'),a0('pour mon cerf-volant.')],[a0("Le vendeur m'en donne"),a0('100 centimètres.')],
      [a0('100 ?'),a0("C'est beaucoup trop !")]),
    ...suiteDe(q,60,62,[a1('Je mesure…')],[a1("C'est pareil !")],[a1('100 centimètres,'),a1("c'est 1 mètre.")]),
    ...suiteDe(com,60,62,[a3('Avec mon mètre de ficelle,')],[a3("mon cerf-volant s'envole !")]),
    ...suiteDe(f,60,60,[a4('À toi : combien de mètres'),a4('dans 1 kilomètre ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de centimètres'),qd('dans 2 mètres ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("1 mètre, c'est 100 centimètres."), r2=rd("2 mètres, c'est 200 centimètres.");
  const tA=mot('02b-reponse','A');

  const mini=ardoiseMini([['1 m','#ffd43b'],['100 cm ?','#ff8787']]);
  poserMiniature(outils,acc+1,'1 m ou 100 cm :<br>trop long ?'+PARI,mini);
  return { clips,FIN,titre:'La ficelle du cerf-volant',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['200',tq('A'),tq('200')],['20',tq('B'),tq('20')],['2',tq('C'),tq('2',3)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tTrop?g.montre():g.oups(); }
      else if(T<q){ T<tPareil?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.montre(); }
      else if(T<com){ T<tEnv?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
