/* ============================================================
   Série Contenance CM1 — ÉPISODE 02 : LE SIROP DE GRENADINE. Outils : films/cm1-commun.js + cm1-contenance.js.
   La recette dit 1 cL de sirop. 1 cL = 10 mL : « 10 ! Donc 10 cuillères ! » Maman : ta cuillère contient 5 mL.
   5 + 5 = 10 mL : 2 cuillères suffisent (A). Sinon, le jus aurait été tout rouge et tout collant.
   Commentaire : 3 cL de sirop, une cuillère de 5 mL : combien de cuillères ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; les dessins à gauche (Ti Margo cache le bas du milieu) */
const VJ={x:160,y:610,w:150,h:210}, SB={x:360,y:610,w:100,h:170};

FILMS['convertir']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':13.37,'01-cuillere':4.28,'02-question':15.28,'02b-reponse':6.29,'03-ouf':5.93,'04-commentaire':10.01,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJus=mot('00-accroche','jus'), tRecette=mot('00-accroche','recette'), t1cl=mot('00-accroche','centilitre',1),
        tSirop=mot('00-accroche','sirop'), t1clb=mot('00-accroche','centilitre',3), t10=mot('00-accroche','10',1),
        t10b=mot('00-accroche','10',2), tDonc=mot('00-accroche','Donc'), tMon=mot('00-accroche','mon');
  const tCuil=mot('01-cuillere','cuillère'), t5=mot('01-cuillere','5');
  const tRouge=mot('03-ouf','rouge'), tCollant=mot('03-ouf','collant');
  const t3=mot('04-commentaire','3'), tC5=mot('04-commentaire','5'), tCombien=mot('04-commentaire','Combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, XR=790;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 3 cL de sirop, une cuillère de 5 mL */
      if(T>=t3){ const z=zoom(T,t3,.4); bouteilleCraie(c,130,SB.y,SB.w,SB.h,.6,GRENADINE,z,'#862e9c');
        ecrire(c,'3 cL',130,665,60*z,CRAIE.jaune); }
      if(T>=tC5){ const z=zoom(T,tC5,.4); cuillereCraie(c,390,440,1.7,GRENADINE,z); ecrire(c,'5 mL',420,580,60*z,CRAIE.jaune); }
      if(T>=tCombien) ecrire(c,'?',XR,380,240*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* le verre de jus et la bouteille de sirop */
    const rouge=T>=tRouge&&T>=ouf;
    if(T>=tJus) recipientCraie(c,'verre',VJ.x,VJ.y,VJ.w,VJ.h,.75,rouge?'#a61e4d':JUS,zoom(T,tJus,.4));
    if(T>=tJus) ecrire(c,'jus',VJ.x,665,44*zoom(T,tJus,.4),CRAIE.gris);
    if(T>=t1cl) bouteilleCraie(c,SB.x,SB.y,SB.w,SB.h,.8,GRENADINE,zoom(T,t1cl,.4),'#862e9c');
    if(T>=tSirop) ecrire(c,'sirop',SB.x,665,44*zoom(T,tSirop,.4),CRAIE.gris);
    if(T<uni){
      if(T>=tRecette) ecrire(c,'la recette :',XR,130,50*zoom(T,tRecette,.4),CRAIE.gris);
      if(T>=t1cl) ecrire(c,'1 cL de sirop',XR,210,58*zoom(T,t1cl,.4),CRAIE.jaune);
      if(T>=t1clb) ecrire(c,'1 cL',XR,320,70*zoom(T,t1clb,.4),CRAIE.jaune);
      if(T>=t10) ecrire(c,'= 10 mL',XR,400,70*zoom(T,t10,.4),CRAIE.ok);
      if(T>=t10b) ecrire(c,'10 cuillères ?',XR,510,58*zoom(T,t10b,.4),CRAIE.faux);
      if(T>=tDonc) for(let k=0;k<10;k++) cuillereCraie(c,610+(k%5)*90,600+Math.floor(k/5)*60,.55,GRENADINE,zoom(T,tDonc+k*.06,.4));
    } else if(T<ouf){ /* maman : ta cuillère contient 5 mL */
      if(T>=tCuil){ const z=zoom(T,tCuil,.4); cuillereCraie(c,XR-70,330,2,GRENADINE,z); }
      if(T>=t5) ecrire(c,'5 mL',XR,480,90*zoom(T,t5,.4),CRAIE.ok);
    } else { /* la réponse : 5 mL + 5 mL = 10 mL, 2 cuillères */
      cuillereCraie(c,XR-170,190,1.1,GRENADINE); cuillereCraie(c,XR+60,190,1.1,GRENADINE);
      ecrire(c,'5 mL + 5 mL',XR,300,62,CRAIE.jaune); ecrire(c,'= 10 mL',XR,385,62,CRAIE.ok);
      ecrire(c,'2 cuillères',XR,490,62*zoom(T,ouf,.4),CRAIE.ok);
      if(T>=tRouge) ecrire(c,'trop rouge !',VJ.x+90,150,60*zoom(T,tRouge,.4),CRAIE.faux);
      if(T>=tCollant) ecrire(c,'et collant…',VJ.x+90,235,56*zoom(T,tCollant,.4),CRAIE.faux); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-cuillere'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Je prépare')),
    ...suiteDe(uni,60,60,[a0('mon jus de fruits.')],[a0('La recette dit :'),a0('1 centilitre de sirop de grenadine.')],
      [a0("1 centilitre, c'est"),a0('10 millilitres.')],[a0('10 ! Donc'),a0('10 cuillères !')]),
    ...suiteDe(q,60,62,[a1("Maman m'arrête :"),a1('ta cuillère contient'),a1('5 millilitres !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Avec 10 cuillères,'),a3('mon jus aurait été tout rouge…')],[a3('et tout collant !')]),
    ...suiteDe(f,60,60,[a4('À toi : 3 centilitres'),a4('de sirop,')],[a4('avec une cuillère'),a4('de 5 millilitres.')],
      [a4('Combien de cuillères ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de cuillères'),qd('de 5 millilitres'),qd('pour faire 10 millilitres ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('5 + 5 = 10 millilitres :'), r2=rd('2 cuillères suffisent.');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="70" width="60" height="140" rx="10" fill="#e03131" stroke="#dee2e6" stroke-width="5"/><rect x="58" y="44" width="24" height="26" fill="#862e9c"/>`+
    `<ellipse cx="150" cy="170" rx="30" ry="18" fill="#e03131" stroke="#dee2e6" stroke-width="5"/><line x1="176" y1="164" x2="220" y2="140" stroke="#dee2e6" stroke-width="9" stroke-linecap="round"/>`+
    `<text x="270" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'10 mL de sirop<br>= ? cuillères'+PARI,mini);
  return { clips,FIN,titre:'Combien de cuillères de sirop ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 cuillères',tq('A'),tq('cuillères',2)],['10 cuillères',tq('B'),tq('cuillères',3)],['5 cuillères',tq('C'),tq('cuillères',4)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tDonc?g.montre():g.fier(); }
      else if(T<q){ T<t5?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tRouge?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
