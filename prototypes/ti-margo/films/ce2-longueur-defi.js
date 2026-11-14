/* ============================================================
   Série Longueurs CE2 — ÉPISODE 08 : LE SKATE DE 6 DM. Outils : films/ce2-commun.js + ce2-longueur.js.
   Trois amis mesurent le skate : 6 dm, 60 cm, 600 mm. Ils se disputent ! Mais 6 dm = 60 cm = 600 mm.
   Question : qui a raison ? (A, les trois). Ceinture orange.
   Commentaire : 1 mètre, c'est combien de décimètres ?
   ============================================================ */
FILMS['defi']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':15.36,'01-oups':9.99,'02-question':12.74,'02b-reponse':5.34,'03-ouf':4.36,'04-commentaire':6.21,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTrois=mot('00-accroche','Trois'), tSkate=mot('00-accroche','skate'), t6=mot('00-accroche','6'), t60=mot('00-accroche','60'),
        t600=mot('00-accroche','600'), tDisp=mot('00-accroche','disputent');
  const t6b=mot('01-oups','6'), t60b=mot('01-oups','60'), t600b=mot('01-oups','600'), tAussi=mot('01-oups','aussi');
  const tTout=mot('03-ouf','Tout'), tTour=mot('03-ouf','tour');
  const t1m=mot('04-commentaire','1'), tDm=mot('04-commentaire','décimètres'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tTrois-.08, XL=560;
  const AMIS=[['6 dm',t6,t6b,'#b197fc'],['60 cm',t60,t60b,'#74c0fc'],['600 mm',t600,t600b,'#ffc078']];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1 m = ? dm */
      if(T>=t1m) ecrire(c,'1 m',300,330,140*zoom(T,t1m,.5),CRAIE.blanc);
      if(T>=tDm) ecrire(c,'= ? dm',700,330,120*zoom(T,tDm,.5),CRAIE.jaune);
      tab.maj(); return; }
    const roule=T>=ouf&&T>=tTour?entreL(T,tTour,tTour+1.4):0;
    if(T>=tSkate) skateCraie(c,250+roule*500,200,340,zoom(T,tSkate,.4));
    AMIS.forEach(([val,t,tb,coul],k)=>{ if(T<t||roule>0) return; const y=330+k*110, z=zoom(T,t,.4);
      if(T>=uni&&T>=tb&&k>0){ ecrire(c,val+' = 60 cm',XL-80,y,64*zoom(T,tb,.4),CRAIE.ok,'left'); return; }
      if(T>=uni&&T>=tb&&k===0){ ecrire(c,val+' = 60 cm',XL-80,y,64*zoom(T,tb,.4),CRAIE.ok,'left'); return; }
      ecrire(c,val,XL-80,y,72*z,coul,'left'); });
    if(T<uni){
      if(T>=t6) coteH(c,80,420,90,'',CRAIE.jaune);
      if(T>=tDisp) ecrire(c,'qui a raison ?',280,620-90,56*zoom(T,tDisp,.4),CRAIE.faux);
    } else if(T<q){
      coteH(c,80,420,90,'',CRAIE.jaune);
      if(T>=tAussi){ for(let k=0;k<3;k++) coche(c,960,300+k*110,.28); }
    } else { /* ouf : tout le monde a raison */
      if(T>=tTout&&roule===0){ for(let k=0;k<3;k++){ ecrire(c,AMIS[k][0]+' = 60 cm',XL-80,330+k*110,64,CRAIE.ok,'left'); coche(c,960,300+k*110,.28); } }
      if(T>=tTour) ecrire(c,'un tour de skate !',528,500,70*zoom(T,tTour,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Trois amis mesurent mon skate.')],[a0('Le premier dit 6 décimètres.')],
      [a0('Le deuxième, 60 centimètres.')],[a0('Le troisième, 600 millimètres.')],[a0('Ils se disputent !')]),
    ...suiteDe(q,60,62,[a1('Attendez…')],[a1("6 décimètres, c'est 60 centimètres.")],
      [a1('Et 600 millimètres,'),a1("c'est aussi 60 centimètres !")]),
    ...suiteDe(com,60,62,[a3('Tout le monde a raison.')],[a3('On fait un tour de skate ?')]),
    ...suiteDe(f,60,60,[a4("À toi : 1 mètre, c'est"),a4('combien de décimètres ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui a raison ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("C'est la même longueur,"), r2=rd('écrite de trois façons.');
  const tA=mot('02b-reponse','A');

  const mini=ardoiseMini([['6 dm','#b197fc'],['60 cm','#74c0fc'],['600 mm','#ffc078']]);
  poserMiniature(outils,acc+1,'6 dm, 60 cm, 600 mm :<br>qui a raison ?'+PARI,mini);
  return { clips,FIN,titre:'Le skate de 6 dm',ceinture:2,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['les trois',tq('A',2),tq('trois')],['seulement celui des cm',tq('B'),tq('centimètres')],['personne',tq('C'),tq('personne')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tDisp?g.montre():g.oups(); }
      else if(T<q){ T<tAussi?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tTour?g.pouce():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
