/* ============================================================
   Série Périmètre CM1 — ÉPISODE 01 : LA GUIRLANDE DU FANION. Outils : films/cm1-commun.js + cm1-perimetre.js.
   Ti Margo fait un fanion en triangle (40, 40 et 30 cm en bas) et veut une guirlande lumineuse tout autour.
   Il a 100 cm de guirlande : 40 + 40 + 30 = 110 (B), trop court ! Il fait un fanion plus petit.
   Commentaire : un fanion avec 3 côtés de 25 centimètres.
   ============================================================ */
/* Le fanion sur l'ardoise : la base (30 cm) en bas, 11 px par cm, à gauche (Ti Margo cache le bas du milieu) */
const TRI1=[[90,500],[420,500],[255,92]];
const TRI1_DEFI=[[90,510],[440,510],[265,207]];

FILMS['triangle']=function(outils){
  const DUR={'00-accroche':12.3,'01-cotes':9.04,'02-question':15.42,'02b-reponse':11.67,'03-ouf':6.21,'04-commentaire':9.95,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTri=mot('00-accroche','triangle'), tVeux=mot('00-accroche','veux'), tGui=mot('00-accroche','guirlande'),
        t100=mot('00-accroche','100'), tSuf=mot('00-accroche','suffit');
  const t40a=mot('01-cotes','40'), t40b=mot('01-cotes','40',2), t30=mot('01-cotes','30'), tTour=mot('01-cotes','tour');
  const tPetit=mot('03-ouf','petit'), tLum=mot('03-ouf','lumière');
  const tFan=mot('04-commentaire','fanion'), t25=mot('04-commentaire','25'),
        tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tVeux-.08, XR=800;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un fanion avec 3 côtés de 25 cm */
      if(T>=tFan) polyCraie(c,TRI1_DEFI,zoom(T,tFan,.3),'#b197fc','#5f3dc4');
      if(T>=t25) for(let i=0;i<3;i++) coteCraie(c,TRI1_DEFI,i,'25',zoom(T,t25,.4),CRAIE.jaune,60);
      if(T>=tComb) ecrire(c,'?',XR,380,220*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* le fanion : plus petit à la fin (Ti Margo le refait) */
    const k=T>=tPetit?1-.28*Math.min(1,(T-tPetit)/.6):1, pts=reduire(TRI1,k);
    if(T>=tTri) polyCraie(c,pts,zoom(T,tTri,.3));
    if(T>=t100) ecrire(c,'100 cm',XR,150,64*zoom(T,t100,.4),CRAIE.jaune);
    if(T<ran){ /* il espère que sa guirlande suffit */
      if(T>=tGui) tourPoly(c,pts,(T-tGui)/1.4*.6,'#fab005',10,true);
      if(T>=tSuf) ecrire(c,'?',XR,400,200*zoom(T,tSuf,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<tPetit){
      if(T>=t40a) coteCraie(c,pts,2,'40',zoom(T,t40a,.4));
      if(T>=t40b) coteCraie(c,pts,1,'40',zoom(T,t40b,.4));
      if(T>=t30) coteCraie(c,pts,0,'30',zoom(T,t30,.4));
      if(T>=tTour) tourPoly(c,pts,(T-tTour)/1.5,TOUR,14); }
    if(T>=ouf){ /* la réponse : 110 cm, plus que 100 cm */
      if(T<tPetit){ ecrire(c,'40 + 40 + 30',XR,290,56,CRAIE.blanc); ecrire(c,'= 110 cm',XR,380,72,CRAIE.ok);
        ecrire(c,'trop court !',XR,520,60,CRAIE.faux); }
      else { tourPoly(c,pts,1,'#fab005',10,true); if(T>=tLum) coche(c,XR-60,420,.6); } }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-cotes'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je fais un fanion'),a0('en triangle'),a0('pour ma cabane !')),
    ...suiteDe(ran,60,62,[a0('Je veux une guirlande'),a0('lumineuse tout autour.')],
      [a0("J'ai 1 mètre de guirlande :"),a0('100 centimètres.')],[a0('Ça suffit ?')]),
    ...suiteDe(q,60,58,[a1('Mon fanion :'),a1('40 centimètres, 40 centimètres,')],[a1('et 30 centimètres en bas.')],
      [a1('Je fais le tour'),a1('des 3 côtés.')]),
    ...suiteDe(com,60,62,[a3('Pas grave : je fais'),a3('un fanion plus petit.')],[a3('Et je garde'),a3('la lumière pour moi !')]),
    ...suiteDe(f,60,60,[a4('À toi : un fanion'),a4('avec 3 côtés'),a4('de 25 centimètres.')],
      [a4('Combien de centimètres'),a4('de guirlande ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('40 + 40, + 30,'),qd('ça fait combien'),qd('de centimètres ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('40 + 40, 80.'), r2=rd('+ 30, 110 centimètres.'),
    r3=rd('Ma guirlande de 100 centimètres'), r4=rd('est trop courte !');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<polygon points="50,215 160,215 105,50" fill="#f783ac" stroke="#fab005" stroke-width="9" stroke-dasharray="4 14" stroke-linecap="round"/>`+
    `<text x="250" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Ma guirlande :<br>assez longue ?'+PARI,mini);
  return { clips,FIN,titre:'La guirlande du fanion',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ran,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['70',tq('A'),tq('70')],['110',tq('B'),tq('110')],['100',tq('C'),tq('100')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<t100?g.montre():(T<tSuf?g.fier():g.reflechit()); }
      else if(T<q){ T<tTour?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.oups(); }
      else if(T<com){ T<tPetit?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
