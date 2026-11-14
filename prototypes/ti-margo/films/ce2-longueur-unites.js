/* ============================================================
   Série Longueurs CE2 — ÉPISODE 01 : LA QUEUE EN KILOMÈTRES. Outils : films/ce2-commun.js + ce2-longueur.js.
   Ti Margo mesure sa queue : « 10… kilomètres ? » Oups : 10 km, plus long qu'une ville ! Elle fait 10 cm.
   Question : quelle unité pour la queue d'un margouillat ? (C, le centimètre). Ceinture blanche.
   Commentaire : la plus petite unité, le mètre, le centimètre ou le millimètre ?
   ============================================================ */
FILMS['unites']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':9.11,'01-oups':7.67,'02-question':14.01,'02b-reponse':8.34,'03-ouf':4.67,'04-commentaire':8.21,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tQueue=mot('00-accroche','queue'), t10=mot('00-accroche','10'),
        tKm=mot('00-accroche','kilomètres'), tLong=mot('00-accroche','long');
  const tVille=mot('01-oups','ville'), tMa=mot('01-oups','Ma'), t10cm=mot('01-oups','centimètres');
  const tCm=mot('02b-reponse','centimètre'), tPet=mot('02b-reponse','petites'), tKmR=mot('02b-reponse','kilomètre'), tRoutes=mot('02b-reponse','routes');
  const tOuf10=mot('03-ouf','10'), tPas=mot('03-ouf','pas');
  const tPetite=mot('04-commentaire','petite'), tM=mot('04-commentaire','mètre'), tCmC=mot('04-commentaire','centimètre'),
        tMm=mot('04-commentaire','millimètre'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, Q0=90, Q1=510, YQ=560, XR=780;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : m, cm, mm : la plus petite ? */
      if(T>=tPetite) ecrire(c,'la plus petite ?',528,140,66*zoom(T,tPetite,.4),CRAIE.jaune);
      if(T>=tM) ecrire(c,'m',250,390,150*zoom(T,tM,.5),CRAIE.blanc);
      if(T>=tCmC) ecrire(c,'cm',528,390,150*zoom(T,tCmC,.5),CRAIE.blanc);
      if(T>=tMm) ecrire(c,'mm',806,390,150*zoom(T,tMm,.5),CRAIE.blanc);
      tab.maj(); return; }
    /* la queue de Ti Margo, couchée en bas à gauche */
    if(T>=tQueue) queueCraie(c,Q0,Q1,YQ,entreL(T,tQueue,tQueue+.8));
    if(T<uni){
      if(T>=t10) ecrire(c,'10…',XR,190,110*zoom(T,t10,.4),CRAIE.blanc);
      if(T>=tKm) ecrire(c,'km ?',XR,320,110*zoom(T,tKm,.4),CRAIE.faux);
      if(T>=tLong){ ecrire(c,'le plus long',XR,450,56*zoom(T,tLong,.4),CRAIE.gris); ecrire(c,'du monde !',XR,520,56*zoom(T,tLong,.4),CRAIE.gris); }
    } else if(T<q){
      ecrire(c,'10 km',XR,150,90,CRAIE.faux);
      if(T>=tVille){ ecrire(c,'plus long',XR,270,58*zoom(T,tVille,.4),CRAIE.blanc); ecrire(c,"qu'une ville !",XR,340,58*zoom(T,tVille,.4),CRAIE.blanc); }
      if(T>=tMa) regleH(c,Q0,YQ+40,42,10,entreL(T,tMa,tMa+.4));
      if(T>=t10cm){ coteH(c,Q0,Q1,YQ-70,'',CRAIE.ok); ecrire(c,'10 cm',XR,490,110*zoom(T,t10cm,.4),CRAIE.ok); }
    } else if(T<ouf){ /* la réponse : le centimètre, le kilomètre */
      if(T>=tCm) ecrire(c,'cm : petites',XR-60,200,70*zoom(T,tCm,.4),CRAIE.ok);
      if(T>=tPet) ecrire(c,'longueurs',XR-60,280,70*zoom(T,tPet,.4),CRAIE.ok);
      if(T>=tKmR) ecrire(c,'km : les routes',XR-60,430,64*zoom(T,tRoutes,.4),CRAIE.blanc);
    } else { /* ouf : 10 cm */
      regleH(c,Q0,YQ+40,42,10,1);
      if(T>=tOuf10){ coteH(c,Q0,Q1,YQ-70,'',CRAIE.ok); ecrire(c,'10 cm',XR,250,120*zoom(T,tOuf10,.4),CRAIE.ok); coche(c,XR-70,420,.5); }
      if(T>=tPas) ecrire(c,'pas mal !',XR,560,64*zoom(T,tPas,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Je mesure ma queue.')],[a0('Elle fait 10… kilomètres ?')],
      [a0('Je suis le plus long'),a0('margouillat du monde !')]),
    ...suiteDe(q,60,62,[a1('Hé ! 10 kilomètres,')],[a1("c'est plus long"),a1("qu'une ville entière !")],
      [a1('Ma queue mesure'),a1('10 centimètres.')]),
    ...suiteDe(com,60,62,[a3('Ma queue : 10 centimètres.')],[a3("C'est déjà pas mal !")]),
    ...suiteDe(f,60,60,[a4('À toi : la plus petite unité,')],[a4("c'est le mètre, le centimètre"),a4('ou le millimètre ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd("Pour la queue d'un margouillat,"),qd('quelle unité ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le centimètre,'), r2=rd('pour les petites longueurs.'), r3=rd("Le kilomètre, c'est pour les routes.");
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M30 190 Q 110 150 190 185 Q 240 205 290 175" stroke="#69db7c" stroke-width="22" fill="none" stroke-linecap="round"/>`+
    `<text x="165" y="120" font-family="Segoe UI" font-weight="800" font-size="68" fill="#ff8787" text-anchor="middle">10 km ?</text></svg>`;
  poserMiniature(outils,acc+1,'Ma queue :<br>10 km ?'+PARI,mini);
  return { clips,FIN,titre:'La queue en kilomètres',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le kilomètre',tq('A'),tq('kilomètre')],['le mètre',tq('B'),tq('mètre')],['le centimètre',tq('C'),tq('centimètre')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tKm?g.montre():g.fier(); }
      else if(T<q){ T<tMa?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.montre(); }
      else if(T<com){ T<tPas?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
