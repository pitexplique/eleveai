/* ============================================================
   Série Contenance CE2 — ÉPISODE 03 : LE JUS A BAISSÉ ? Outils : films/ce2-commun.js + ce2-contenance.js.
   Le copain de Ti Margo verse le jus d'une bouteille haute dans un saladier : le jus a baissé, il en a perdu ?
   Non : rien bu, rien renversé ; le saladier est plus large. Question : autant de jus (B). Ceinture jaune.
   Commentaire : qui contient le plus, 5 dL ou 40 cL ?
   ============================================================ */
FILMS['comparer']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':10.29,'01-oups':5.85,'02-question':12.66,'02b-reponse':8.62,'03-ouf':5.91,'04-commentaire':7.59,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tBout=mot('00-accroche','bouteille'), tSal=mot('00-accroche','saladier'),
        tBaisse=mot('00-accroche','baissé'), tPerdu=mot('00-accroche','perdu');
  const tBu=mot('01-oups','bu'), tRenv=mot('01-oups','renversé'), tLarge=mot('01-oups','large');
  const tRev=mot('03-ouf','reverse'), tHaute=mot('03-ouf','haute'), tPleine=mot('03-ouf','pleine');
  const t5=mot('04-commentaire','5'), t40=mot('04-commentaire','40'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, XR=800, B={x:140,y:600,w:110,h:330}, S={x:430,y:460,a:175,h:125};

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 5 dL ou 40 cL ? */
      if(T>=t5){ bouteilleCraie(c,300,560,130,260,.85,JUS,zoom(T,t5,.4)); ecrire(c,'5 dL',300,640,62*zoom(T,t5,.4),CRAIE.jaune); }
      if(T>=t40){ bouteilleCraie(c,760,560,130,260,.85,EAU,zoom(T,t40,.4),'#1971c2'); ecrire(c,'40 cL',760,640,62*zoom(T,t40,.4),CRAIE.jaune); }
      if(T>=t40+.5) ecrire(c,'?',530,360,180,CRAIE.jaune);
      tab.maj(); return; }
    /* le jus passe de la bouteille au saladier (accroche), puis revient (ouf) */
    const u=T<ouf?entreC(T,tSal,tSal+1.4):1-entreC(T,tRev,tRev+1.4);
    if(T>=tBout) bouteilleCraie(c,B.x,B.y,B.w,B.h,.85*(1-u),JUS,zoom(T,tBout,.4));
    if(T>=tSal) saladierCraie(c,S.x,S.y,S.a,S.h,.55*u,JUS,zoom(T,tSal,.4));
    if(u>0&&u<1){ c.strokeStyle=JUS; c.lineWidth=10; c.beginPath(); c.moveTo(B.x+30,B.y-B.h-80); c.quadraticCurveTo(S.x-60,B.y-B.h-90,S.x-20,S.y+20); c.stroke(); }
    if(T<uni){
      if(T>=tBaisse){ ecrire(c,'le jus',XR,200,56,CRAIE.gris); ecrire(c,'a baissé ?',XR,280,64*zoom(T,tBaisse,.4),CRAIE.jaune); }
      if(T>=tPerdu) ecrire(c,'perdu ?',XR,420,80*zoom(T,tPerdu,.4),CRAIE.faux);
    } else if(T<q){
      if(T>=tBu) ecrire(c,'rien bu',XR,170,62*zoom(T,tBu,.4),CRAIE.ok);
      if(T>=tRenv) ecrire(c,'rien renversé',XR,270,56*zoom(T,tRenv,.4),CRAIE.ok);
      if(T>=tLarge) ecrire(c,'plus large !',XR,400,64*zoom(T,tLarge,.4),CRAIE.jaune);
    } else if(T>=ouf){ /* ouf : on reverse ; même jus, même quantité */
      if(T>=tHaute) ecrire(c,'haute…',XR,200,64*zoom(T,tHaute,.4),CRAIE.blanc);
      if(T>=tPleine){ ecrire(c,'même jus !',XR,330,70*zoom(T,tPleine,.4),CRAIE.ok); coche(c,B.x+80,150,.45); }
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Mon copain verse son jus'),a0('de sa bouteille haute')],[a0('dans un saladier.')],
      [a0('Regarde : le jus a baissé !')],[a0('Il en a perdu ?')]),
    ...suiteDe(q,60,62,[a1("Il n'a rien bu,"),a1('rien renversé…')],[a1('Le saladier est juste'),a1('plus large.')]),
    ...suiteDe(com,60,62,[a3('Bon, je reverse tout'),a3('dans la bouteille.')],[a3('Elle est haute,'),a3('mais pas plus pleine !')]),
    ...suiteDe(f,60,60,[a4('À toi : qui contient le plus,')],[a4('5 décilitres'),a4('ou 40 centilitres ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Dans le saladier,'),qd('il y a…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("C'est le même jus,"), r2=rd('la même quantité.'), r3=rd('La forme ne dit pas'),
    r4=rd('combien un récipient contient.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="36" y="50" width="48" height="170" rx="10" fill="none" stroke="#dee2e6" stroke-width="5"/><rect x="42" y="200" width="36" height="14" fill="#ff922b"/>`+
    `<path d="M110 150 A80 60 0 0 0 270 150 Z" fill="none" stroke="#dee2e6" stroke-width="5"/><path d="M128 178 A62 30 0 0 0 252 178 Z" fill="#ff922b"/>`+
    `<text x="285" y="110" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le jus a baissé :<br>il en a perdu ?'+PARI,mini);
  return { clips,FIN,titre:'Le jus a baissé ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['moins de jus',tq('A',2),tq('moins')],['autant de jus',tq('B'),tq('autant')],['plus de jus',tq('C'),tq('plus')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tBaisse?g.montre():g.oups(); }
      else if(T<q){ T<tLarge?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tPleine?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
