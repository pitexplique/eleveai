/* ============================================================
   Série Masse CE2 — ÉPISODE 04 : 2 TONNES DE BANANES. Outils : films/ce2-commun.js + ce2-masse.js.
   Le copain écrit la liste des courses : « 2 t de bananes ». Le camion de livraison arrive… et bouche la rue !
   Question : il voulait écrire… 2 tonnes, 2 kilogrammes (B), 2 grammes.
   Fin : beaucoup de gâteaux à la banane. Commentaire : un melon, combien de grammes ? Ceinture jaune.
   ============================================================ */
FILMS['choisir-unite']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':5.76,'01-camion':4.10,'02-question':12.22,'02b-reponse':8.42,'03-fin':3.62,'04-commentaire':6.72,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-camion':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cam_,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tListe=mot('00-accroche','liste'), tT=mot('00-accroche','tonnes'),
        tBan=mot('00-accroche','bananes');
  const tArr=mot('01-camion','arrive'), tBouche=mot('01-camion','bouche');
  const tB=mot('02b-reponse','B');
  const tGat=mot('03-fin','gâteaux');
  const tMelon=mot('04-commentaire','melon'), tGr=mot('04-commentaire','grammes'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, HAUT=100, SOL=620;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : un melon, combien de grammes ? */
      if(T>=tMelon) melonM(c,300,SOL-20,1.9,zoom(T,tMelon,.4));
      if(T>=tGr){ const z=zoom(T,tGr,.4); ecrire(c,'= ? g',740,SOL-170,130*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : 2 kg de bananes… et beaucoup de gâteaux */
      regimeM(c,230,SOL-10,1.5,1,5); ecrire(c,'2 kg',230,HAUT+40,90,CRAIE.ok);
      if(T>=tGat) [[620,SOL-10],[880,SOL-10],[750,SOL-140]].forEach(([x,y],i)=>gateauM(c,x,y,1.6,zoom(T,tGat+i*.2,.4)));
      tab.maj(); return; }
    if(T<cam_){ /* l'accroche : la liste des courses, « 2 t de bananes » */
      if(T>=tListe) listeCraie(c,320,370,440,500,[['Liste :','#343a40',64],['du pain','#343a40',56],['du lait','#343a40',56],
        ...(T>=tT?[['2 t de','#e03131',72],['bananes !','#e03131',72]]:[])],zoom(T,tListe,.4));
      if(T>=tBan) regimeM(c,800,SOL-20,1.6,zoom(T,tBan,.4),5);
      tab.maj(); return; }
    /* le camion de livraison arrive de la droite… et bouche toute la rue */
    c.fillStyle='#495057'; c.fillRect(0,SOL-8,1056,100); c.fillStyle='#f8f9fa';
    for(let u=20;u<1056;u+=120) c.fillRect(u,SOL+30,60,10);
    const x=1500-972*doux(entreM(T,cam_,tArr+.2));
    camionM(c,x,SOL+10,2.0,1,'2 t');
    if(T>=tBouche) ecrire(c,'bouché !',528,HAUT,84*zoom(T,tBouche,.4),CRAIE.faux);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-camion'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(cam_,60,62,[a0('Mon copain écrit'),a0('la liste des courses :')],[a0('2 tonnes de bananes !')]),
    ...suiteDe(q,60,62,[a1('Le camion de livraison'),a1('arrive…')],[a1('et il bouche'),a1('toute la rue !')]),
    ...suiteDe(com,60,64,[a3('Bon… on va faire'),a3('beaucoup de gâteaux'),a3('à la banane !')]),
    ...suiteDe(f,60,58,[a4('À toi : combien pèse'),a4('un melon, à ton avis,')],[a4('en grammes ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Il voulait écrire…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('2 kilogrammes de bananes, ça tient dans un sac.'), r2=rd('2 tonnes, il faut un camion !');

  poserMiniature(outils,acc+1,'2 tonnes<br>de bananes ?'+PARI,ardoiseMini([['2 t de'],['bananes ?','#ff8787']]));
  return { clips,FIN,titre:'2 tonnes de bananes ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cam_,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 tonnes',tq('A'),tq('B')-.3],['2 kilogrammes',tq('B'),tq('C')-.3],['2 grammes',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tT) g.montre();
      else if(T<cam_) g.oups();
      else if(T<tBouche) g.montre();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
