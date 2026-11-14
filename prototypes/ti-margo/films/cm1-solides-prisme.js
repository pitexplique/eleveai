/* Série Solides CM1, ÉPISODE 01 : MA TENTE PYRAMIDE (ceinture jaune). Outils : cm1-commun.js et
   films/cm1-solides.js (tente3, dessinerPoly, pyramide3).
   Ti Margo monte sa tente : « une vraie pyramide ! »… sans pointe, avec une longue arête en haut.
   Oups : une pyramide a UNE base, la tente en a deux (triangle devant, triangle au fond) : c'est un prisme.
   Question : combien de faces, le sol compris ? 5 (C). Commentaire : combien d'arêtes ? */

FILMS.prisme=function(outils){
  const DUR={'00-accroche':10.92,'01-oups':8.17,'02-question':16.25,'02b-reponse':9.99,'03-ouf':5.21,'04-commentaire':5.39,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tJe=mot('00-accroche','J\'ai'), tTente=mot('00-accroche','tente'), tPyr=mot('00-accroche','pyramide'),
    tPointe=mot('00-accroche','pointe'), tArete=mot('00-accroche','arête');
  const tSeule=mot('01-oups','seule'), tDeux=mot('01-oups','deux'), tDevant=mot('01-oups','devant'), tFond=mot('01-oups','fond');
  const tFerme=mot('03-ouf','fermé'), tNuit=mot('03-ouf','nuit');
  const tAretes=mot('04-commentaire',"d'arêtes"), tRep=mot('04-commentaire','Réponds');

  const TENTE=tente3(1,1.7), TOILE='#ff922b';
  const fEntree=faceDe(TENTE,[0,1,2]), fFond=faceDe(TENTE,[3,4,5]);
  const PYR=pyramide3(4,1,1.15);
  function tente(c,cx,cy,e,opts={}){ const o=centrer(TENTE,e,cx,cy); return dessinerPoly(c,TENTE,{...o,coul:TOILE,trait:'#fff4e6',...opts}); }

  function dessiner(T){ const c=tab.c; tab.effacer(); const X=W/2;
    if(T>=com){ /* le défi : les arêtes de la tente, et un « ? » */
      const ar={}; if(T>=tAretes) TENTE.aretes.forEach(a=>ar[a.key]=CRAIE.jaune);
      tente(c,X-100,400,340,{aretes:ar});
      if(T>=tRep) ecrire(c,'?',X+330,330,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* la tente se monte ; « pyramide ? », pas de pointe, une longue arête en haut */
      if(T>=tTente){ const k=Math.min(1,zoom(T,tTente,.5)); const ar={};
        if(T>=tArete) ar['2-5']=CRAIE.jaune;
        tente(c,X,410,360*k,{aretes:ar}); }
      if(T>=tPyr) ecrire(c,'une pyramide ?',X,95,62*zoom(T,tPyr,.4),CRAIE.blanc);
      if(T>=tPointe&&T<tArete) ecrire(c,'pointe ?',X+330,200,56*zoom(T,tPointe,.4),CRAIE.faux);
      if(T>=tArete) ecrire(c,'une longue arête',X+200,665,52*zoom(T,tArete,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<q){ /* une pyramide : UNE base ; la tente : DEUX bases */
      const o=centrer(PYR,210,250,400), fb={}; if(T>=tSeule) fb[faceDe(PYR,[0,1,2,3])]=BASE_C;
      dessinerPoly(c,PYR,{...o,coul:'#ffd43b',faces:fb});
      if(T>=tSeule) ecrire(c,'1 seule base',250,630,50*zoom(T,tSeule,.4),BASE_C);
      const ft={}; if(T>=tDevant) ft[fEntree]=BASE_C; if(T>=tFond) ft[fFond]=BASE_C;
      tente(c,W-310,390,240,{faces:ft});
      if(T>=tDeux) ecrire(c,'2 bases !',W-310,630,56*zoom(T,tDeux,.4),BASE_C);
      tab.maj(); return; }
    /* ouf : la tente fermée, la lune et les étoiles */
    tente(c,X-60,440,290);
    rond(c,W-150,130,60,'#fff3bf'); rond(c,W-125,115,55,'#1f3b2c');
    [[120,110],[260,70],[420,140],[700,80]].forEach(([x,y],k)=>{ if(T>=ouf+.3*k) rond(c,x,y,9,CRAIE.jaune); });
    if(T>=tFerme) coche(c,W-150,620,.7);
    if(T>=tNuit) ecrire(c,'Bonne nuit !',X-60,110,60*zoom(T,tNuit,.4),'#fff3bf');
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('J’ai monté ma tente.'),a0('Une vraie pyramide !')],[a0('Bon… elle n’a pas de pointe.')],
      [a0('Elle a une longue arête,'),a0('tout en haut.')]),
    ...suiteDe(q,60,62,[a1('Hé !'),a1('Une pyramide a une seule base.')],[a1('Ma tente en a deux :'),a1('un triangle devant,'),a1('un triangle au fond !')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Mon prisme est bien fermé.')],[a3('Bonne nuit !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien d’arêtes'),a4('a ma tente ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Ma tente est un prisme.'),qd('Combien a-t-elle de faces,'),qd('le sol compris ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('2 triangles,'), r2=rd('plus 3 rectangles :'), r3=rd('les deux pans du toit et le sol.'), r4=rd('2 plus 3, 5 faces.');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <path d="M60 200 L160 200 L110 113 Z" fill="#ff922b" stroke="#fff4e6" stroke-width="5"/>
    <path d="M160 200 L250 140 L200 53 L110 113 Z" fill="#e8590c" stroke="#fff4e6" stroke-width="5"/>
    <line x1="110" y1="113" x2="200" y2="53" stroke="#ff922b" stroke-width="9"/>
    <text x="275" y="120" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Pyramide<br>ou prisme ?'+PARI,mini);
  return { clips,FIN,titre:'Ma tente pyramide',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['3 faces',tq('A'),tq('3')],['4 faces',tq('B'),tq('4')],['5 faces',tq('C'),tq('5')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3,r4],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<tPyr?g.montre():(T<tPointe?g.fier():g.reflechit()); }
      else if(T<q){ if(T<tSeule){ g.oups(); scene.ry=-.12+.3*lisse((T-oup)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tFerme?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
