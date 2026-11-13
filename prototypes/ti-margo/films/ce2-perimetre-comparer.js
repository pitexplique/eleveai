/* Série Périmètre CE2, ÉPISODE 03 : LA COURSE AUTOUR DES TABLES (ceinture blanche). Outils : ce2-commun.js
   et films/ce2-perimetre.js (cheminCraie, boutChemin, rond, entre).
   Ti Margo prend la table longue et fine (9 × 1 pas, « elle a l'air plus petite »), son copain la table
   carrée (5 pas). Question : on fait pareil (C), 20 pas = 20 pas. Commentaire : triangle de 6 pas ou carré de 4. */

FILMS.comparer=function(outils){
  const DUR={'00-accroche':11.02,'01-course':8.08,'02-question':14.92,'02b-reponse':11.1,'03-ouf':6.71,'04-commentaire':10.28,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cou,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les tables vues de dessus : 1 pas = 46 px. La carrée à gauche, la longue à droite. */
  const S=52, CX=40, CY=150, LX=420, LY=290;
  const CAR=[[CX,CY+5*S],[CX+5*S,CY+5*S],[CX+5*S,CY],[CX,CY],[CX,CY+5*S]];
  const LON=[[LX,LY+S],[LX+9*S,LY+S],[LX+9*S,LY],[LX,LY],[LX,LY+S]];

  const tCourse=mot('00-accroche','Course'), tLongue=mot('00-accroche','longue'), tPetite=mot('00-accroche','petite'), tCarree=mot('00-accroche','carrée');
  const tC5=mot('01-course','5'), tMa=mot('01-course','Ma'), t9=mot('01-course','9'), t1=mot('01-course','1'), t9b=mot('01-course','9',3), t1b=mot('01-course','1',3),
        tPartez=mot('01-course','Partez');
  const tAir=mot('03-ouf','l\'air'), tTour=mot('03-ouf','tour'), tJuge=mot('03-ouf','juge');
  const tT6=mot('04-commentaire','6'), tCar=mot('04-commentaire','carré'), tC4=mot('04-commentaire','4'), tRep=mot('04-commentaire','Réponds');

  function table(c,pts,coul){ c.fillStyle=coul; c.beginPath(); c.moveTo(...pts[0]); pts.slice(1).forEach(p=>c.lineTo(...p)); c.closePath(); c.fill();
    c.strokeStyle='#5c3a1a'; c.lineWidth=8; c.stroke(); }
  function cote(c,s,x,y,T0,T,coul=CRAIE.blanc,taille=48){ if(T>=T0) ecrire(c,s,x,y,taille*zoom(T,T0,.4),coul); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un triangle de 6 pas de côté, ou un carré de 4 pas */
      const s=50, P1=[120,560], P2=[120+6*s,560], P3=[120+3*s,560-6*s*.866];
      if(T>=tT6){ c.fillStyle='#364fc7'; c.beginPath(); c.moveTo(...P1); c.lineTo(...P2); c.lineTo(...P3); c.closePath(); c.fill();
        c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.stroke(); cote(c,'6 pas',P1[0]+3*s,P1[1]+50,tT6,T,CRAIE.jaune,52); }
      if(T>=tCar){ c.fillStyle='#c2255c'; c.fillRect(620,360,4*s,4*s); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(620,360,4*s,4*s); }
      cote(c,'4 pas',620+2*s,560+50,tC4,T,CRAIE.jaune,52);
      if(T>=tRep) ecrire(c,'?',W/2+40,200,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tLongue||T>=cou) table(c,LON,'#c08550');
    if(T>=tCarree||T>=cou) table(c,CAR,'#c08550');
    if(T<cou){
      if(T>=tPetite) ecrire(c,'l’air plus petite…',LX+4.5*S,LY-60,50*zoom(T,tPetite,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* les côtés en pas */
    const fini=T>=ouf;
    cote(c,'5 pas',CX+2.5*S,CY+5*S+45,tC5,T); cote(c,'9 pas',LX+4.5*S,LY+S+45,t9,T); cote(c,'1 pas',LX+9*S+52,LY+S/2,t1,T,CRAIE.blanc,40);
    cote(c,'9 pas',LX+4.5*S,LY-40,t9b,T); cote(c,'1 pas',LX-52,LY+S/2,t1b,T,CRAIE.blanc,40);
    /* la course : départ à « Partez », les deux coureurs arrivent ENSEMBLE (même tour) */
    const u=fini?1:Math.min(.5,entre(T,tPartez,tPartez+2.2));
    if(T>=tPartez||fini){ cheminCraie(c,CAR,u,TOUR,12); cheminCraie(c,LON,u,'#74c0fc',12);
      rond(c,...boutChemin(CAR,u),18,'#e8590c'); rond(c,...boutChemin(LON,u),18,'#1864ab'); }
    if(!fini&&T>=tPartez+1.1) ecrire(c,'?',W/2+40,600,110*zoom(T,tPartez+1.1,.5),CRAIE.jaune);
    if(fini){ ecrire(c,'20 pas',CX+2.5*S,CY-50,56*zoom(T,ouf,.4),TOUR); ecrire(c,'20 pas',LX+4.5*S,LY-110,56*zoom(T,ouf,.4),'#74c0fc');
      if(T>=tTour) ecrire(c,'=',W/2-20,LY-70,110*zoom(T,tTour,.5),CRAIE.ok);
      if(T>=tJuge) coche(c,LX+6.6*S,LY+5.4*S,.7); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-course'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tCourse-.08,352,62,a0('Salut !')),
    ...suiteDe(cou,60,62,[a0('Course autour des tables !')],[a0('Moi, je prends la table'),a0('longue et fine :')],[a0('elle a l’air plus petite.')],
      [a0('Toi, tu prends'),a0('la table carrée !')]),
    ...suiteDe(q,60,62,[a1('La table carrée : 5 pas'),a1('de chaque côté.')],[a1('Ma table : 9 pas, 1 pas,'),a1('9 pas, 1 pas.')],[a1('Partez !')]),
    ...suiteDe(com,60,62,[a3('Ma table avait'),a3('l’air plus petite…')],[a3('mais son tour'),a3('est aussi long !')],[a3('On ne juge pas à l’œil.')]),
    ...suiteDe(f,60,60,[a4('À toi : un triangle'),a4('de 6 pas de côté,')],[a4('ou un carré'),a4('de 4 pas de côté.')],[a4('Lequel a le plus long tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui fait le plus long tour ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.jusque('5'); const r1=rd('5 + 5 + 5 + 5 = 20 pas,'), r2=rd('9 + 1 + 9 + 1 = 20 pas.');
  rd.jusque('Le'); const r3=rd('Le même tour : égalité !');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="35" y="70" width="110" height="110" fill="#c08550" stroke="#ff922b" stroke-width="8"/>
    <rect x="170" y="112" width="130" height="26" fill="#c08550" stroke="#74c0fc" stroke-width="8"/>
    <text x="235" y="215" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'La plus petite<br>a le plus<br>petit tour ?'+PARI,mini);
  return { clips,FIN,titre:'La course des tables',ceinture:0,finTitre:tCourse-.08,groupes,finClip:'05-abonne',
    cuts:[tCourse-.08,cou,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['moi, sur la table longue',tq('A'),tq('moi')],['mon copain,<br>sur la table carrée',tq('B'),tq('mon')],['on fait pareil',tq('C'),tq('on')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tCourse-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<cou){ T<tPetite?g.montre():(T<tCarree?g.fier():g.montre()); }
      else if(T<q){ T<tPartez?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ if(T<tTour){ g.oups(); } else g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
