/* ============================================================
   Série Durées CP — ÉPISODE 02 : LE RÉVEIL À L'ENVERS. Outils : films/cp-commun.js + cp-duree.js.
   Je règle mon réveil sur 5 heures : la grande aiguille sur le 5, la petite sur le 12. Hop !
   Mais mon réveil montre 12 heures : j'ai inversé les aiguilles. Réponse A : la grande va sur le 12.
   Mon réveil est réparé… et c'est moi qui dois me réveiller !
   Commentaire : pour montrer 10 heures, où va la petite aiguille ?
   ============================================================ */
FILMS['placer-aiguilles']=function(outils){
  const DUR={'00-accroche':9.79,'01-oups':7.76,'02-question':13.81,'02b-reponse':6.68,'03-ouf':5.84,'04-commentaire':6.62,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.5,'01-oups':.5,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oups,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* les instants des mots */
  const tRegle=mot('00-accroche','règle'), t5h=mot('00-accroche','5'), tMets=mot('00-accroche','mets'), tGrande=mot('00-accroche','grande'),
        t5=mot('00-accroche','5',3), tPetite=mot('00-accroche','petite'), t12=mot('00-accroche','12'), tHop=mot('00-accroche','Hop');
  const tMontre=mot('01-oups','montre'), tInverse=mot('01-oups','inversé'), tPetO=mot('01-oups','petite'), tHeure=mot('01-oups',"l'heure");
  const tRepare=mot('03-ouf','réparé'), tMoi=mot('03-ouf','moi'), tReveiller=mot('03-ouf','réveiller');
  const t10=mot('04-commentaire','10'), tOu=mot('04-commentaire','où'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMets-.08;

  /* L'ardoise fait 1056 × 720. Le réveil en haut à gauche (Ti Margo cache le bas milieu-gauche), l'écrit à DROITE. */
  const RX=290, RY=235, RR=170, XD=800;
  const bouge=(T,t,d=.9)=>T<t?0:lisse(Math.min(1,(T-t)/d));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 10 heures, où va la petite aiguille ? */
      reveilCraie(c,RX,RY,RR,0,0,zoom(T,com+.1,.4),0,{},[12,12],{h:0,m:1});
      if(T>=t10) ecrire(c,'10 heures',XD,RY-40,80*zoom(T,t10,.5),CRAIE.jaune);
      if(T>=tOu){ ecrire(c,'?',RX,RY+70,110*zoom(T,tOu,.5),AIG_H); ecrire(c,'la petite ?',XD,RY+80,60*zoom(T,tOu,.4),AIG_H); }
      tab.maj(); return; }

    if(T>=ouf){ /* le réveil réparé : la petite va sur le 5, la grande sur le 12 ; puis il sonne ! */
      const u=bouge(T,ouf+.2,1.2);
      const tremble=T>=tMoi?T-tMoi:0;
      reveilCraie(c,RX,RY,RR,0,0,1,tremble,{},[12+5*u,5+7*u]);
      if(T>=tRepare){ ecrire(c,'5 heures',XD,RY-40,84*zoom(T,tRepare,.5),CRAIE.ok); coche(c,XD-70,RY+70,.9); }
      tab.maj(); return; }

    /* Ti Margo règle : la grande sur le 5, la petite sur le 12 (à l'envers !) */
    const vm=T<tGrande?0:Math.min(1,(T-tGrande)/.5), vh=T<tPetite?0:Math.min(1,(T-tPetite)/.5);
    const nm=T<t5?12:12+5*bouge(T,t5-.2,.7);
    let lu={};
    if(T>=oups){ lu=T>=tPetO?{h:1}:{}; }
    const hop=T>=tHop&&T<tHop+.6?Math.sin((T-tHop)/.6*Math.PI):0;
    if(T>=acc) reveilCraie(c,RX,RY-30*hop,RR,0,0,zoom(T,acc+.2,.4),0,lu,[12,nm],{h:vh,m:vm});
    if(T>=t5h) ecrire(c,'5 heures',XD,RY-90,80*zoom(T,t5h,.5),CRAIE.blanc);
    if(T>=tGrande&&T<oups){ ecrire(c,'grande → 5',XD,RY+40,58*zoom(T,t5,.4)*(T>=t5?1:0),AIG_M); }
    if(T>=t12&&T<oups){ ecrire(c,'petite → 12',XD,RY+130,58*zoom(T,t12,.4),AIG_H); }

    if(T>=oups){ /* « mon réveil montre 12 heures ! » : c'est à l'envers */
      if(T>=tMontre) ecrire(c,'12 heures ?',XD,RY+40,74*zoom(T,tMontre,.5),CRAIE.faux);
      if(T>=tInverse){ const u=Math.min(1,(T-tInverse)/.5); c.strokeStyle=CRAIE.jaune; c.lineWidth=9; c.lineCap='round';
        /* deux flèches qui s'échangent : du 12 vers le 5, du 5 vers le 12 */
        const [x12,y12]=placeNombre(RX,RY,RR,12), [x5,y5]=placeNombre(RX,RY,RR,5);
        c.beginPath(); c.moveTo(x12+40,y12); c.quadraticCurveTo(RX+RR*1.35,RY-RR*.4,x12+(x5-x12)*u+30,y12+(y5-y12)*u); c.stroke();
        ecrire(c,'inversées !',XD,RY+140,58*zoom(T,tInverse,.4),CRAIE.jaune); }
      if(T>=tHeure) ecrire(c,"petite = l'heure",XD,RY+240,54*zoom(T,tHeure,.4),AIG_H);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Je règle mon réveil'),a0('sur 5 heures.')),
    ...suiteDe(oups,60,60,[a0('Je mets la grande aiguille'),a0('sur le 5.')],[a0('Et la petite'),a0('sur le 12.')],[a0('Hop !')]),
    ...suiteDe(q,60,58,[a1('Mais mon réveil'),a1('montre 12 heures !')],[a1("J'ai inversé"),a1('les aiguilles.')],
      [a1("C'est la petite"),a1("qui donne l'heure.")]),
    ...suiteDe(com,60,62,[a3('Voilà mon réveil réparé.')],[a3("Maintenant, c'est moi"),a3('qui dois me réveiller !')]),
    ...suiteDe(f,60,60,[a4('À toi : pour montrer'),a4('10 heures,'),a4('où va la petite aiguille ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Pour 5 heures,'),qd('où va la grande aiguille ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('La grande va sur le 12.'), r2=rd('La petite va sur le 5.');
  const tA=mot('02b-reponse','A');

  poserMiniature(outils,acc+1,'Mon réveil :<br>à l\'envers ?'+PARI,ardoiseMini([['grande → 5',CRAIE.faux],['petite → 12',CRAIE.faux]]));
  return { clips,FIN,titre:'Où vont les aiguilles ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oups,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['sur le 12',tq('A'),tq('12')],['sur le 5',tq('B'),tq('5',3)],['sur le 6',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      /* Hop ! et le réveil qui sonne : Ti Margo saute */
      scene.y=0;
      for(const t of [tHop,tReveiller]) if(T>=t-.05&&T<t+.5) scene.y=.3*Math.sin((T-t+.05)/.55*Math.PI);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<oups){ T<tHop?g.montre():g.fier(); }
      else if(T<q){ T<tPetO?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tMoi?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; scene.y=0; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
