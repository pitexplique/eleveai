/* ============================================================
   Série Longueurs CE2 — ÉPISODE 07 : LA CORDE À SAUTER. Outils : films/ce2-commun.js + ce2-longueur.js.
   Ti Margo attache 1 m et 50 cm de corde : « 1 + 50 = 51 ! » Oups : on n'additionne pas des m et des cm.
   Question : 1 m et 50 cm, combien de cm en tout ? (B, 150). Ceinture jaune.
   Commentaire : 2 m de ruban et 30 cm, combien de cm en tout ?
   ============================================================ */
FILMS['probleme']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':12.73,'01-oups':7.68,'02-question':15.29,'02b-reponse':5.71,'03-ouf':4.1,'04-commentaire':8.02,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tAtt=mot('00-accroche',"J'attache"), t1m=mot('00-accroche','1'), t50=mot('00-accroche','50'), t1p=mot('00-accroche','plus'),
        t51=mot('00-accroche','51'), tPetit=mot('00-accroche','petit');
  const tAdd=mot('01-oups',"n'additionne"), t1mb=mot('01-oups','1'), t100=mot('01-oups','100');
  const t150=mot('03-ouf','150'), tSauter=mot('03-ouf','sauter');
  const t2m=mot('04-commentaire','2'), t30=mot('04-commentaire','30'), tTout=mot('04-commentaire','tout'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tAtt-.08, X0=80, E=4.2, YC=160;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2 m et 30 cm = ? cm */
      if(T>=t2m) ecrire(c,'2 m',300,260,130*zoom(T,t2m,.5),CRAIE.blanc);
      if(T>=t30) ecrire(c,'+ 30 cm',700,260,110*zoom(T,t30,.5),CRAIE.blanc);
      if(T>=tTout) ecrire(c,'= ? cm',528,450,120*zoom(T,tTout,.5),CRAIE.jaune);
      tab.maj(); return; }
    if(T<uni){
      if(T>=t1m){ cordeCraie(c,X0,YC,100*E,CORDE1,entreL(T,t1m,t1m+.5)); ecrire(c,'1 m',X0+50*E,YC-55,64*zoom(T,t1m,.4),CORDE1); }
      if(T>=t50){ cordeCraie(c,X0+100*E+8,YC,50*E,CORDE2,entreL(T,t50,t50+.4)); ecrire(c,'50 cm',X0+125*E+8,YC-55,64*zoom(T,t50,.4),CORDE2); }
      if(T>=t1p) ecrire(c,'1 + 50',400,350,100*zoom(T,t1p,.4),CRAIE.blanc);
      if(T>=t51) ecrire(c,'= 51 ?',760,350,100*zoom(T,t51,.4),CRAIE.faux);
      if(T>=tPetit){ cordeCraie(c,X0,500,51*E/10,CRAIE.faux,1); ecrire(c,'tout petit…',X0+260,500,60*zoom(T,tPetit,.4),CRAIE.gris); }
    } else if(T<q){
      cordeCraie(c,X0,YC,100*E,CORDE1,1); cordeCraie(c,X0+100*E+8,YC,50*E,CORDE2,1);
      if(T<t1mb){ ecrire(c,'1 m',X0+50*E,YC-55,64,CORDE1); }
      ecrire(c,'50 cm',X0+125*E+8,YC-55,64,CORDE2);
      if(T>=tAdd){ ecrire(c,'1 + 50 = 51',528,330,90,CRAIE.faux); const u=entreL(T,tAdd,tAdd+.4); c.strokeStyle=CRAIE.faux; c.lineWidth=12;
        c.beginPath(); c.moveTo(250,330); c.lineTo(250+560*u,330); c.stroke(); }
      if(T>=t1mb) ecrire(c,'1 m = 100 cm',X0+50*E,YC-55,58*zoom(T,t100,.4),CRAIE.ok);
      if(T>=t100) ecrire(c,'1 m = 100 cm',528,470,96*zoom(T,t100,.4),CRAIE.ok);
    } else { /* ouf : 150 cm de corde */
      cordeCraie(c,X0,YC,100*E,CORDE1,1); cordeCraie(c,X0+100*E+8,YC,50*E,CORDE2,1);
      ecrire(c,'100 cm',X0+50*E,YC-55,58,CORDE1); ecrire(c,'50 cm',X0+125*E+8,YC-55,58,CORDE2);
      if(T>=t150){ coteH(c,X0,X0+150*E+8,YC+70,'',CRAIE.ok); ecrire(c,'150 cm',528,350,120*zoom(T,t150,.4),CRAIE.ok); }
      if(T>=tSauter) ecrire(c,'on saute !',528,490,76*zoom(T,tSauter,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0("J'attache deux cordes pour faire"),a0('une grande corde à sauter :')],[a0('1 mètre, et 50 centimètres.')],
      [a0('1 + 50 : 51 !')],[a0("C'est tout petit…")]),
    ...suiteDe(q,60,62,[a1('Hé ! On n\'additionne pas'),a1('des mètres et des centimètres.')],[a1("1 mètre, c'est 100 centimètres.")]),
    ...suiteDe(com,60,62,[a3('150 centimètres de corde :')],[a3('on peut sauter !')]),
    ...suiteDe(f,60,60,[a4('À toi : 2 mètres de ruban'),a4('et 30 centimètres,')],[a4('combien de centimètres en tout ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('1 mètre et 50 centimètres :'),qd('combien de centimètres en tout ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('100 + 50,'), r2=rd('150 centimètres.');
  const tB=mot('02b-reponse','B');

  const mini=ardoiseMini([['1 m + 50 cm','#ffc078'],['= 51 ?','#ff8787']]);
  poserMiniature(outils,acc+1,'1 m + 50 cm<br>= 51 ?'+PARI,mini);
  return { clips,FIN,titre:'La corde à sauter',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['51',tq('A'),tq('51')],['150',tq('B'),tq('150')],['60',tq('C'),tq('60')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<t51?g.montre():(T<tPetit?g.fier():g.oups()); }
      else if(T<q){ T<t1mb?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.montre(); }
      else if(T<com){ T<tSauter?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
