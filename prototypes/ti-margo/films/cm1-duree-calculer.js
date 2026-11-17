/* ============================================================
   Série Durées CM1 — ÉPISODE 04 : LE FILM DE TI MARGO. Outils : films/cm1-commun.js + cm1-duree.js.
   Mon film commence à 15 h 45 et finit à 17 h 20. « 17 − 15, et 20 − 45… » : ça ne marche pas !
   Alors je saute sur la frise : + 15 min (16 h), + 1 h (17 h), + 20 min (17 h 20). Réponse C : 1 h 35.
   J'ai tellement sauté… que j'ai raté la fin du film !
   Commentaire : un dessin animé de 10 h 50 à 11 h 30. Combien de temps dure-t-il ?
   ============================================================ */
FILMS['calculer']=function(outils){
  const DUR={'00-accroche':15.64,'01-bonds':16.26,'02-question':14.44,'02b-reponse':7.23,'03-ouf':4.06,'04-commentaire':10.46,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.5,'01-bonds':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bon,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* les instants des mots */
  const t15=mot('00-accroche','15'), tIl=mot('00-accroche','Il'), t17=mot('00-accroche','17'), tCombienA=mot('00-accroche','Combien'),
        tFacile=mot('00-accroche','Facile'), t17m=mot('00-accroche','17',3), t20m=mot('00-accroche','20',2), tAie=mot('00-accroche','Aïe');
  const tDe=[mot('01-bonds','De',1),mot('01-bonds','De',2),mot('01-bonds','De',3)],
        tMin=[mot('01-bonds','minutes',1),mot('01-bonds','heure',1),mot('01-bonds','minutes',3)],
        tHop=[mot('01-bonds','Hop',1),mot('01-bonds','Hop',2)],
        tJal=[mot('01-bonds','15'),mot('01-bonds','16'),mot('01-bonds','17',1),mot('01-bonds','20')];
  const tRate=mot('03-ouf','raté'), tFinO=mot('03-ouf','fin');
  const tDessin=mot('04-commentaire','dessin'), t10=mot('04-commentaire','10'), t11=mot('04-commentaire','11'),
        tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tIl-.08;

  /* L'ardoise fait 1056 × 720. Le billet en haut à gauche, l'horloge en haut à droite ;
     la frise en bas, ses heures dessous ; le calcul (faux puis juste) entre les deux. */
  const BX=40, BY=36, BW=760, BH=112, HX=955, HY=122, HR=74;
  const FY=330, J=[130,330,730,950], HB=[50,80,50];
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  const bouge=(T,t,d=1)=>T<t?0:lisse(Math.min(1,(T-t)/d));

  function billet(c,T,t1,s1,t2,s2,z){ billetCraie(c,BX,BY,BW,BH,'#ffe8cc',z);
    if(T>=t1) ecrire(c,s1,BX+180,BY+BH/2,64*zoom(T,t1,.4),'#1f2937');
    if(T>=t2){ ecrire(c,'→',BX+380,BY+BH/2,64,'#1f2937'); ecrire(c,s2,BX+580,BY+BH/2,64*zoom(T,t2,.4),'#1f2937'); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un dessin animé de 10 h 50 à 11 h 30 */
      billet(c,T,t10,'10 h 50',t11,'11 h 30',zoom(T,tDessin,.4));
      if(T>=t10) horlogeCraie(c,HX,HY,HR,10,50+40*bouge(T,t11,1.2),zoom(T,t10,.4));
      const xs=[160,400,900];
      if(T>=t10){ friseCraie(c,90,1000,FY,xs,[true,T>=tCombien,T>=t11],deroule(T,t10,.8));
        ecrire(c,'10 h 50',xs[0],FY+58,50,CRAIE.blanc); }
      if(T>=t11) ecrire(c,'11 h 30',xs[2],FY+58,50*zoom(T,t11,.4),CRAIE.blanc);
      if(T>=tCombien){ ecrire(c,'11 h',xs[1],FY+58,50*zoom(T,tCombien,.4),CRAIE.blanc);
        bondCraie(c,xs[0],xs[1],FY,55,deroule(T,tCombien,.6)); bondCraie(c,xs[1],xs[2],FY,85,deroule(T,tCombien+.5,.8));
        if(T>=tCombien+.6) ecrire(c,'?',(xs[0]+xs[1])/2,FY-55-40,60*zoom(T,tCombien+.6,.4),CRAIE.jaune);
        if(T>=tCombien+1.3) ecrire(c,'?',(xs[1]+xs[2])/2,FY-85-40,60*zoom(T,tCombien+1.3,.4),CRAIE.jaune); }
      tab.maj(); return; }

    /* le billet du film et l'horloge, tout le temps */
    billet(c,T,t15,'15 h 45',t17,'17 h 20',zoom(T,t15,.4));
    if(T>=t15){ let m;
      if(T<bon) m=T<t17?45:80;
      else if(T<ouf) m=45+15*bouge(T,tMin[0])+60*bouge(T,tMin[1],1.2)+20*bouge(T,tMin[2]);
      else m=80;
      horlogeCraie(c,HX,HY,HR,15,m,zoom(T,t15,.4)); }

    if(T<bon){ /* le calcul qui ne marche pas */
      if(T>=t17m) ecrire(c,'17 − 15 = 2',420,300,84*zoom(T,t17m,.4),CRAIE.blanc);
      if(T>=t20m) ecrire(c,'20 − 45 = ?',420,430,84*zoom(T,t20m,.4),T>=tAie?CRAIE.faux:CRAIE.blanc);
      if(T>=tAie){ const u=deroule(T,tAie,.4); c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.lineCap='round';
        c.beginPath(); c.moveTo(190,385); c.lineTo(190+460*u,385+90*u); c.moveTo(190,475); c.lineTo(190+460*u,475-90*u); c.stroke(); }
      tab.maj(); return; }

    /* la frise et ses trois bonds */
    const rep=T>=ouf, vu=k=>rep||T>=tJal[k];
    friseCraie(c,70,1010,FY,J,[vu(0),vu(1),vu(2),vu(3)],rep?1:deroule(T,bon+.3,.9));
    ['15 h 45','16 h','17 h','17 h 20'].forEach((s,k)=>{ if(vu(k)) ecrire(c,s,J[k],FY+58,50*(rep?1:zoom(T,tJal[k],.4)),CRAIE.blanc); });
    ['+ 15 min','+ 1 h','+ 20 min'].forEach((s,k)=>{
      bondCraie(c,J[k],J[k+1],FY,HB[k],rep?1:deroule(T,tDe[k]+.3,1.1));
      if(rep||T>=tMin[k]) ecrire(c,s,(J[k]+J[k+1])/2,FY-HB[k]-32,50*(rep?1:zoom(T,tMin[k],.4)),CRAIE.jaune); });
    if(rep){ /* la réponse : 1 h + 15 min + 20 min = 1 h 35 */
      const zr=zoom(T,ouf,.3); ['1 h + 15 min','+ 20 min','= 1 h 35'].forEach((s,k)=>ecrire(c,s,1000,470+k*72,58*zr,CRAIE.ok,'right'));
      /* la fin ratée : un tampon rouge sur le billet */
      if(T>=tRate){ const z=zoom(T,tRate,.6); c.save(); c.translate(BX+580,BY+BH/2); c.rotate(-.18); c.scale(z,z);
        c.fillStyle='rgba(255,232,204,.92)'; c.fillRect(-150,-46,300,92); c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.strokeRect(-150,-46,300,92); ecrire(c,'RATÉ !',0,4,70,CRAIE.faux); c.restore(); } }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-bonds'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Mon film commence'),a0('à 15 heures 45.')),
    ...suiteDe(bon,60,60,[a0('Il finit à 17 heures 20.')],[a0('Combien de temps'),a0('dure-t-il ?')],
      [a0('Facile : 17 moins 15,'),a0('et 20 moins 45…')],[a0('Aïe, ça ne marche pas !')]),
    ...suiteDe(q,60,58,[a1('Alors je saute'),a1('sur la frise.')],
      [a1('De 15 heures 45 à'),a1('16 heures :'),a1('15 minutes. Hop !')],
      [a1('De 16 heures'),a1('à 17 heures :'),a1('1 heure. Hop !')],
      [a1('De 17 heures'),a1('à 17 heures 20 :'),a1('20 minutes.')]),
    ...suiteDe(com,60,62,[a3("J'ai tellement sauté…")],[a3("que j'ai raté"),a3('la fin du film !')]),
    ...suiteDe(f,60,60,[a4('À toi : un dessin animé'),a4('commence à 10 heures'),a4('50 et finit à 11 heures 30.')],
      [a4('Combien de temps'),a4('dure-t-il ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de temps'),qd('dure mon film ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('1 heure, plus 15 minutes,'), r2=rd('plus 20 minutes :'), r3=rd('1 heure 35.');
  const tC=mot('02b-reponse','C');

  poserMiniature(outils,acc+1,'Mon film :<br>15 h 45 → 17 h 20'+PARI,ardoiseMini([['17 − 15 = 2'],['20 − 45 = ?',CRAIE.faux]]));
  return { clips,FIN,titre:'Combien de temps ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bon,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 heures 25',tq('A'),tq('2')],['1 heure 75',tq('B'),tq('1')],['1 heure 35',tq('C'),tq('1',3)]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      /* Hop ! Ti Margo saute à chaque bond */
      scene.y=0; for(const t of tHop) if(T>=t-.05&&T<t+.5) scene.y=.3*Math.sin((T-t+.05)/.55*Math.PI);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<bon){ T<tFacile?g.montre():(T<tAie?g.fier():g.oups()); }
      else if(T<q){ g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tRate?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; scene.y=0; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
