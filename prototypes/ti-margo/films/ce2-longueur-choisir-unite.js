/* ============================================================
   Série Longueurs CE2 — ÉPISODE 05 : MAMIE À 3 MILLIONS DE CM. Outils : films/ce2-commun.js + ce2-longueur.js.
   Mamie habite à « 3 millions de centimètres » : trop de zéros ! Pour une route, le kilomètre : 30 km.
   Question : quelle unité pour un trajet en voiture ? (A, le kilomètre). Ceinture blanche.
   Commentaire : avec quelle unité mesures-tu ta gomme ?
   ============================================================ */
FILMS['choisir-unite']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':9.24,'01-oups':7.74,'02-question':14.91,'02b-reponse':7.4,'03-ouf':3.4,'04-commentaire':5.94,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tMamie=mot('00-accroche','Mamie'), t3=mot('00-accroche','3'), tCm=mot('00-accroche','centimètres'),
        tEcrire=mot('00-accroche',"l'écrire");
  const tZeros=mot('01-oups','zéros'), tRoute=mot('01-oups','route'), tKm=mot('01-oups','kilomètre'), t30=mot('01-oups','30');
  const tOuf30=mot('03-ouf','30'), tEnR=mot('03-ouf','route');
  const tUnite=mot('04-commentaire','unité'), tGomme=mot('04-commentaire','gomme'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, YS=250;

  function route(c,u=1){ c.strokeStyle=CRAIE.gris; c.lineWidth=8; c.beginPath(); c.moveTo(60,YS+10); c.lineTo(60+(860-60)*u,YS+10); c.stroke();
    c.setLineDash([24,20]); c.lineWidth=4; c.strokeStyle=CRAIE.blanc; c.beginPath(); c.moveTo(60,YS+34); c.lineTo(60+(860-60)*u,YS+34); c.stroke(); c.setLineDash([]); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : la gomme */
      if(T>=tUnite) ecrire(c,'quelle unité ?',528,150,72*zoom(T,tUnite,.4),CRAIE.jaune);
      if(T>=tGomme){ gommeCraie(c,400,380,1.6,zoom(T,tGomme,.4)); ecrire(c,'? ?',760,380,110*zoom(T,tGomme,.4),CRAIE.blanc); }
      tab.maj(); return; }
    /* Ti Margo (la voiture) à gauche, la maison de Mamie au bout de la route */
    if(T>=tMamie) maisonCraie(c,930,YS,.9,zoom(T,tMamie,.4));
    const roule=T>=ouf&&T>=tEnR?entreL(T,tEnR,tEnR+1.4):0;
    if(T>=tMamie){ route(c,1); voitureCraie(c,150+roule*620,YS,.9); }
    if(T<uni){
      if(T>=t3) ecrire(c,'3 000 000',470,410,100*zoom(T,t3,.4),CRAIE.faux);
      if(T>=tCm) ecrire(c,'cm',795,410,100*zoom(T,tCm,.4),CRAIE.faux);
      if(T>=tEcrire) ecrire(c,'trop long à écrire !',470,520,58*zoom(T,tEcrire,.4),CRAIE.gris);
    } else if(T<q){
      ecrire(c,'3 000 000 cm',470,410,80,CRAIE.faux);
      if(T>=tZeros){ const k=entreL(T,tZeros,tZeros+.3); c.strokeStyle=CRAIE.faux; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(330,452); c.lineTo(330+270*k,452); c.stroke(); } /* « trop de zéros » : on souligne les zéros */
      if(T>=tRoute) ecrire(c,'une route :',300,520,64*zoom(T,tRoute,.4),CRAIE.gris);
      if(T>=tKm) ecrire(c,'le km',620,520,80*zoom(T,tKm,.4),CRAIE.ok);
      if(T>=t30){ coteH(c,150,870,YS-150,'30 km',CRAIE.ok,72); }
    } else { /* ouf : en route ! */
      coteH(c,150,870,YS-150,'30 km',CRAIE.ok,72);
      if(T>=tOuf30) ecrire(c,'30 km : court !',528,450,80*zoom(T,tOuf30,.4),CRAIE.ok);
      if(T>=tEnR) ecrire(c,'en route !',528,550,64*zoom(T,tEnR,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Je vais chez Mamie.')],[a0('Elle habite à 3 millions'),a0('de centimètres !')],
      [a0("Je n'arrive même pas"),a0("à l'écrire.")]),
    ...suiteDe(q,60,62,[a1('Trop de zéros !')],[a1('Pour une route,'),a1('on prend le kilomètre.')],
      [a1('Mamie habite à 30 kilomètres.')]),
    ...suiteDe(com,60,62,[a3('30 kilomètres :'),a3('en route pour chez Mamie !')]),
    ...suiteDe(f,60,60,[a4('À toi : avec quelle unité'),a4('mesures-tu ta gomme ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Avec quelle unité mesure-t-on'),qd('un trajet en voiture ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le kilomètre,'), r2=rd('pour les grandes distances.'), r3=rd('Le nombre reste court.');
  const tA=mot('02b-reponse','A');

  const mini=ardoiseMini([['3 000 000','#ff8787'],['cm ?','#ff8787']]);
  poserMiniature(outils,acc+1,'Chez Mamie :<br>3 000 000 cm ?'+PARI,mini);
  return { clips,FIN,titre:'Mamie à 3 millions de cm',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le kilomètre',tq('A'),tq('kilomètre')],['le centimètre',tq('B'),tq('centimètre')],['le millimètre',tq('C'),tq('millimètre')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tEcrire?g.montre():g.oups(); }
      else if(T<q){ T<tRoute?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.montre(); }
      else if(T<com) g.fier();
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
