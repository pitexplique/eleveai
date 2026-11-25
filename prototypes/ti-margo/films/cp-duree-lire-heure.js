/* ============================================================
   Série Durées CP — ÉPISODE 01 : LE RÉVEIL DE TI MARGO. Outils : films/cp-commun.js + cp-duree.js.
   Mon réveil sonne : la petite aiguille sur le 6, la grande sur le 12. « Il est 12 heures ! » Oups…
   La grande aiguille est si longue qu'elle m'a trompé : c'est la petite qui donne l'heure. Réponse C : 6 heures.
   6 heures du matin ? Je retourne sous ma couette !
   Commentaire : la petite aiguille sur le 9, la grande sur le 12. Quelle heure est-il ?
   ============================================================ */
FILMS['lire-heure']=function(outils){
  const DUR={'00-accroche':11.07,'01-aiguilles':6.03,'02-question':11.72,'02b-reponse':6.56,'03-ouf':4.55,'04-commentaire':9.85,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.5,'01-aiguilles':.5,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,aig,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* les instants des mots */
  const tSonne=mot('00-accroche','sonne'), tLa=mot('00-accroche','La'), tPetite=mot('00-accroche','petite'), t6=mot('00-accroche','6'),
        tGrande=mot('00-accroche','grande'), t12=mot('00-accroche','12'), tCrie=mot('00-accroche','crie'), t12h=mot('00-accroche','12',2),
        tOups=mot('00-accroche','Oups');
  const tGrA=mot('01-aiguilles','grande'), tLongue=mot('01-aiguilles','longue'), tTrompe=mot('01-aiguilles','trompé'),
        tPetA=mot('01-aiguilles','petite'), tHeure=mot('01-aiguilles',"l'heure");
  const tMatin=mot('03-ouf','matin'), tCouette=mot('03-ouf','couette'), tRetourne=mot('03-ouf','retourne');
  const tPet4=mot('04-commentaire','petite'), t9=mot('04-commentaire','9'), tGr4=mot('04-commentaire','grande'), t12c=mot('04-commentaire','12'),
        tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tLa-.08;

  /* L'ardoise fait 1056 × 720. Le réveil en haut à gauche (Ti Margo cache le bas milieu-gauche), l'écrit à DROITE. */
  const RX=290, RY=235, RR=170, XD=800;
  const QX=470, QY=860, QW=420, QH=420; /* l'ardoise de la question, en px de la page 1080 × 1920 */
  const entre=(T,a,b)=>T>=a&&T<b;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : la petite aiguille sur le 9 */
      horlogeCraie(c,RX,RY+20,RR+10,9,0,zoom(T,tPet4,.4),true,{h:T>=tPet4&&T<tGr4?1:0,m:T>=tGr4&&T<tQuelle?1:0});
      if(T>=t9){ const [x,y]=placeNombre(RX,RY+20,RR+10,9); cercle(c,x,y,34,AIG_H,(T-t9)/.3); }
      if(T>=t12c){ const [x,y]=placeNombre(RX,RY+20,RR+10,12); cercle(c,x,y,34,AIG_M,(T-t12c)/.3); }
      if(T>=tQuelle){ ecrire(c,'?',XD,RY,190*zoom(T,tQuelle,.5),CRAIE.jaune); ecrire(c,'heures',XD,RY+150,70*zoom(T,tQuelle,.4),CRAIE.blanc); }
      tab.maj(); return; }

    if(T>=ouf){ /* 6 heures du matin : sous la couette ! */
      reveilCraie(c,RX,RY,RR,6,0,1,0,{h:1});
      ecrire(c,'6 heures',XD,140,74*zoom(T,ouf,.4),CRAIE.ok);
      if(T>=tMatin) ecrire(c,'du matin',XD,225,58*zoom(T,tMatin,.4),CRAIE.blanc);
      if(T>=tRetourne) litCraie(c,580,610,430,zoom(T,tRetourne,.4),T>=tCouette?Math.min(1,(T-tCouette)/1.2):0);
      tab.maj(); return; }

    /* le réveil : il sonne, puis la petite et la grande aiguille brillent tour à tour */
    const tremble=entre(T,tSonne,tLa)?T-tSonne:0;
    let lu={};
    if(T<aig){ if(entre(T,tPetite,tGrande)) lu={h:1}; else if(entre(T,tGrande,tCrie)) lu={m:1}; else if(entre(T,t12h,tOups+.6)) lu={m:1}; }
    else { lu=T<tPetA?{m:1}:{h:1}; }
    if(T>=acc) reveilCraie(c,RX,RY,RR,6,0,zoom(T,acc+.2,.4),tremble,lu);
    if(T>=t6){ const [x,y]=placeNombre(RX,RY,RR,6); cercle(c,x,y,32,AIG_H,(T-t6)/.3); }
    if(T>=t12&&T<aig){ const [x,y]=placeNombre(RX,RY,RR,12); cercle(c,x,y,32,AIG_M,(T-t12)/.3); }

    if(T<aig){ /* l'erreur de Ti Margo : « 12 heures ! » */
      if(T>=t12h) ecrire(c,'12 heures !',XD,RY-20,74*zoom(T,t12h,.5),T>=tOups?CRAIE.faux:CRAIE.blanc);
      if(T>=tOups){ const u=Math.min(1,(T-tOups)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.lineCap='round';
        c.beginPath(); c.moveTo(565,RY-80); c.lineTo(565+450*u,RY-80+120*u); c.moveTo(565,RY+40); c.lineTo(565+450*u,RY+40-120*u); c.stroke(); }
      tab.maj(); return; }

    /* les deux aiguilles, rangées à droite : la grande est longue… mais c'est la petite qui donne l'heure */
    c.lineCap='round';
    if(T>=tGrA){ const u=Math.min(1,(T-tGrA)/.5); c.strokeStyle=AIG_M; c.lineWidth=16; c.beginPath(); c.moveTo(580,150); c.lineTo(580+420*u,150); c.stroke();
      if(T>=tLongue) ecrire(c,'grande',790,212,56*zoom(T,tLongue,.4),AIG_M); }
    if(T>=tPetA){ const u=Math.min(1,(T-tPetA)/.4); c.strokeStyle=AIG_H; c.lineWidth=26; c.beginPath(); c.moveTo(580,320); c.lineTo(580+140*u,320); c.stroke();
      ecrire(c,'petite',650,385,56*zoom(T,tPetA,.4),AIG_H); }
    if(T>=tHeure){ ecrire(c,"= l'heure",880,320,58*zoom(T,tHeure,.5),CRAIE.ok); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-aiguilles'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Mon réveil sonne.')),
    ...suiteDe(aig,60,60,[a0('La petite aiguille'),a0('est sur le 6.')],[a0('La grande'),a0('est sur le 12.')],
      [a0('Je crie :'),a0('il est 12 heures !')],[a0('Oups…')]),
    ...suiteDe(q,60,58,[a1('La grande aiguille'),a1('est si longue'),a1("qu'elle m'a trompé !")],
      [a1("C'est la petite"),a1("qui donne l'heure.")]),
    ...suiteDe(com,60,62,[a3('6 heures du matin ?')],[a3('Je retourne'),a3('sous ma couette !')]),
    ...suiteDe(f,60,60,[a4('À toi : la petite aiguille'),a4('est sur le 9.')],[a4('La grande'),a4('est sur le 12.')],
      [a4('Quelle heure est-il ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle heure est-il ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('La petite aiguille'), r2=rd('est sur le 6.'), r3=rd('Il est 6 heures.');
  const tC=mot('02b-reponse','C');
  /* 25/11 (Frédéric) : pendant la question et la réponse, LE RÉVEIL RESTE À L'ÉCRAN, sinon l'enfant ne peut pas lire l'heure.
     Une petite ardoise à droite de Ti Margo, sous la carte ; à la réponse, la petite aiguille brille et le 6 est entouré. */
  const tPetR=mot('02b-reponse','petite'), t6R=mot('02b-reponse','6');
  const ardQ=document.createElement('canvas'); ardQ.className='cv'; ardQ.width=QW*2; ardQ.height=QH*2;
  ardQ.style.cssText=`left:${QX}px;top:${QY}px;width:${QW}px;height:${QH}px;display:none;z-index:3;border-radius:28px;box-shadow:0 0 0 10px #8a5a2b,0 0 0 13px #5c3a1a,0 12px 26px rgba(0,0,0,.28);`;
  document.body.append(ardQ);
  function dessinerQ(T){ const c=ardQ.getContext('2d'); c.setTransform(2,0,0,2,0,0); c.clearRect(0,0,QW,QH);
    c.fillStyle='#1f3b2c'; c.fillRect(0,0,QW,QH);
    const x=QW/2, y=QH/2+14, rr=QW*.33;
    reveilCraie(c,x,y,rr,6,0,1,0,T>=tPetR&&T<t6R+1.2?{h:1}:{});
    if(T>=t6R){ const [px,py]=placeNombre(x,y,rr,6); c.save(); c.lineWidth=7; cercle(c,px,py,26,AIG_H,(T-t6R)/.3); c.restore(); } }

  poserMiniature(outils,acc+1,'Mon réveil :<br>quelle heure ?'+PARI,ardoiseMini([['12 heures ?'],['6 heures ?']]));
  return { clips,FIN,titre:'Quelle heure est-il ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,aig,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['12 heures',tq('A'),tq('12')],['7 heures',tq('B'),tq('7')],['6 heures',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      ardQ.style.display=dansQ&&!window.MINI?'block':'none';
      if(dansQ){ dessinerQ(T); scene.x=-1.2; }
      /* le réveil sonne : Ti Margo sursaute */
      scene.y=0; if(T>=tSonne&&T<tSonne+.6) scene.y=.3*Math.sin((T-tSonne)/.6*Math.PI);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.oups();
      else if(T<aig){ T<tCrie?g.montre():(T<tOups?g.fier():g.oups()); }
      else if(T<q){ T<tPetA?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tRetourne?g.fier():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; scene.y=0; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
