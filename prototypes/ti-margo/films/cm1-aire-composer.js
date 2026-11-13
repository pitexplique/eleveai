/* ============================================================
   Série Aire CM1 — ÉPISODE 04 : LE GÂTEAU EN L. Outils : films/cm1-commun.js.
   Ti Margo a fait un gâteau en L pour son anniversaire : combien de parts carrées ? Bloqué !
   Sa petite sœur coupe en deux rectangles : 2 rangées de 4 + 2 rangées de 2 → 8 + 4 = 12 (C).
   Commentaire : un rectangle de 3 rangées de 5 parts et un carré de 2 parts de côté.
   ============================================================ */
/* Le gâteau sur l'ardoise : en haut 2 rangées de 4 parts, en bas 2 rangées de 2 (colonnes 0-1) */
const X4=120, Y4=130, S4=104;
const PARTS4=[...[0,1].flatMap(j=>[0,1,2,3].map(i=>[i,j])), ...[2,3].flatMap(j=>[0,1].map(i=>[i,j]))];
const GATEAU='#c08552', GATEAU_B='#6f3d1b', HAUT4=CRAIE.r2, BAS4=CRAIE.r1;

FILMS['composer']=function(outils){
  const DUR={'00-accroche':9.92,'01-decouper':10.1,'02-question':14.13,'02b-reponse':7.12,'03-ouf':4.07,'04-commentaire':11.03,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tGat=mot('00-accroche','gâteau'), tComb=mot('00-accroche','Combien'), tRect0=mot('00-accroche','rectangle'),
        tBloq=mot('00-accroche','bloqué');
  const tCou=mot('01-decouper','couteau'), tCoupe=mot('01-decouper','coupe'), tHaut=mot('01-decouper','haut'),
        tBas=mot('01-decouper','bas');
  const tMoi=mot('03-ouf','moi');
  const tRect=mot('04-commentaire','rectangle'), t3=mot('04-commentaire','3'), t5=mot('04-commentaire','5'),
        tCarre=mot('04-commentaire','carré'), t2=mot('04-commentaire','2'), tCombien=mot('04-commentaire','Combien'),
        tRep=mot('04-commentaire','Réponds');

  const XR=800; /* le milieu de la colonne de droite (texte) */
  function gateau(c,T){ PARTS4.forEach(([i,j],k)=>{ let coul=GATEAU, bord=GATEAU_B;
      if(T>=tHaut&&k<8){ coul=HAUT4; bord='#a61e4d'; } if(T>=tBas&&k>=8){ coul=BAS4; bord='#d9480f'; }
      carreauCraie(c,X4+i*S4,Y4+j*S4,S4,T<tComb?zoom(T,tGat+k*.04,.3):1,coul,bord); }); }
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un rectangle de 3 rangées de 5 parts et un carré de 2 parts de côté */
      const S6=84, X6=200, Y6=90;
      if(T>=tRect) solVide(c,X6,Y6,5,3,S6);
      if(T>=t3) ecrire(c,'3',X6-44,Y6+1.5*S6,64*zoom(T,t3,.4),CRAIE.jaune);
      if(T>=t5) ecrire(c,'5',X6+2.5*S6,Y6-42,64*zoom(T,t5,.4),CRAIE.jaune);
      if(T>=tCarre) solVide(c,X6,Y6+3*S6,2,2,S6);
      if(T>=t2) ecrire(c,'2',X6-44,Y6+4*S6,64*zoom(T,t2,.4),CRAIE.r1);
      if(T>=tCombien) ecrire(c,'?',XR+40,330,220*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tGat) gateau(c,T);
    if(T<ran){ /* il ne sait pas compter les parts */
      if(T>=tComb) ecrire(c,'?',XR,330,220*zoom(T,tComb,.6),T>=tBloq?CRAIE.faux:CRAIE.jaune);
      tab.maj(); return; }
    /* le couteau : un trait entre la 2e et la 3e rangée */
    if(T>=tCoupe){ const u=Math.min(1,(T-tCoupe)/.5); c.strokeStyle=CRAIE.jaune; c.lineWidth=10; c.setLineDash([22,14]);
      c.beginPath(); c.moveTo(X4-30,Y4+2*S4); c.lineTo(X4-30+(4*S4+60)*u,Y4+2*S4); c.stroke(); c.setLineDash([]); }
    if(T<ouf){
      if(T>=tHaut) ecrire(c,'2 rangées de 4',XR,250,58*zoom(T,tHaut,.4),HAUT4);
      if(T>=tBas) ecrire(c,'2 rangées de 2',XR,380,58*zoom(T,tBas,.4),BAS4);
    } else {
      ecrire(c,'2 × 4 = 8',XR,220,64,HAUT4); ecrire(c,'2 × 2 = 4',XR,330,64,BAS4);
      ecrire(c,'8 + 4 = 12',XR,470,80,CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-decouper'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tComb-.08,330,62,a0("J'ai fait un gâteau"),a0('en forme de L'),a0('pour mon anniversaire !')),
    ...suiteDe(ran,60,62,[a0('Combien de parts carrées ?')],[a0("Ce n'est pas un rectangle…"),a0('je suis bloqué !')]),
    ...suiteDe(q,60,62,[a1('Ma petite sœur'),a1('prend le couteau :')],[a1('on coupe'),a1('en deux rectangles !')],
      [a1('En haut, 2 rangées'),a1('de 4 parts.')],[a1('En bas, 2 rangées'),a1('de 2 parts.')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Onze copains…'),a3('et une part pour moi !')]),
    ...suiteDe(f,60,60,[a4('À toi : un gâteau fait'),a4("d'un rectangle"),a4('de 3 rangées de 5 parts,')],
      [a4("et d'un carré de 2 parts"),a4('de côté.')],[a4('Combien de parts ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('2 × 4 + 2 × 2,'),qd('ça fait combien'),qd('de parts ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('8 + 4 :'), r2=rd('12 parts de gâteau.'), r3=rd('Une pour chaque copain !');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    PARTS4.map(([i,j])=>`<rect x="${34+i*44}" y="${32+j*44}" width="40" height="40" rx="6" fill="${GATEAU}" stroke="${GATEAU_B}" stroke-width="3"/>`).join('')+
    `<text x="258" y="170" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Un gâteau en L :<br>combien de parts ?'+PARI,mini);
  return { clips,FIN,titre:'Le gâteau en L',ceinture:0,finTitre:tComb-.08,groupes,finClip:'05-abonne',
    cuts:[tComb-.08,ran,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10',tq('A'),tq('10')],['16',tq('B'),tq('16')],['12',tq('C'),tq('12')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tComb-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<tRect0?g.montre():(T<tBloq?g.reflechit():g.oups()); }
      else if(T<q){ T<tCou?g.reflechit():(T<tBas+1?g.montre():g.fier()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tMoi?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
