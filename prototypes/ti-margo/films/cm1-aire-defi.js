/* ============================================================
   Série Aire CM1 — ÉPISODE 05 : LA CLÔTURE DE NOÉ. Outils : films/cm1-commun.js.
   Noé se vante : sa clôture est plus longue, donc son jardin est plus grand. Vraiment ?
   Ti Margo : un carré de 5 sur 5 ; Noé : 3 rangées de 8 → 25 contre 24, Ti Margo gagne (A).
   Commentaire : une bande de 1 rangée de 9 carreaux, et un carré de 3 carreaux de côté.
   ============================================================ */
/* Les deux jardins sur l'ardoise, cases de S5 px : Ti Margo 5 × 5 à gauche, Noé 8 × 3 à droite */
const S5=70, XM=60, YM=150, XN=465, YN=150;
const MOI5=CARREAU, MOI5_B=CARREAU_B, NOE5=CRAIE.r1, NOE5_B='#d9480f';

FILMS['defi']=function(outils){
  const DUR={'00-accroche':9.5,'01-jardins':7.43,'02-question':13.61,'02b-reponse':13.48,'03-ouf':4.68,'04-commentaire':10.52,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tLa=mot('00-accroche','la'), tCl=mot('00-accroche','clôture'), tMienne=mot('00-accroche','mienne'),
        tGrand=mot('00-accroche','grand'), tVrai=mot('00-accroche','Vraiment');
  const tCarre=mot('01-jardins','carré'), t5=mot('01-jardins','5'), tNoe=mot('01-jardins','Noé'),
        t3=mot('01-jardins','3'), t8=mot('01-jardins','8');
  const tTom=mot('03-ouf','tomates');
  const tBande=mot('04-commentaire','bande'), t1c=mot('04-commentaire','1'), t9=mot('04-commentaire','9'),
        tCarreC=mot('04-commentaire','carré'), t3c=mot('04-commentaire','3'), tLequel=mot('04-commentaire','Lequel'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tLa-.08;

  /* Un jardin : la terre, ses carreaux (à partir de tc), puis sa clôture orange tracée à partir de tt */
  function jardin(c,T,x,y,nc,nr,tc,coul,bord,tt){
    solVide(c,x,y,nc,nr,S5,T>=ran);
    if(T>=tc) for(let j=0;j<nr;j++) for(let i=0;i<nc;i++) carreauCraie(c,x+i*S5,y+j*S5,S5,zoom(T,tc+(j*nc+i)*.025,.3),coul,bord);
    tourCraie(c,x,y,nc*S5,nr*S5,(T-tt)/1.1); }
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une bande de 1 rangée de 9 carreaux, un carré de 3 carreaux de côté */
      const S6=80, X6=90, Y6=110;
      if(T>=tBande) solVide(c,X6,Y6,9,1,S6);
      if(T>=t1c) ecrire(c,'1',X6-44,Y6+S6/2,56*zoom(T,t1c,.4),CRAIE.jaune);
      if(T>=t9) ecrire(c,'9',X6+4.5*S6,Y6-38,56*zoom(T,t9,.4),CRAIE.jaune);
      if(T>=tCarreC) solVide(c,X6,Y6+2*S6,3,3,S6);
      if(T>=t3c){ ecrire(c,'3',X6-44,Y6+3.5*S6,56*zoom(T,t3c,.4),CRAIE.r1); ecrire(c,'3',X6+1.5*S6,Y6+2*S6-38,56*zoom(T,t3c,.4),CRAIE.r1); }
      if(T>=tLequel) ecrire(c,'?',760,440,220*zoom(T,tLequel,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* les noms au-dessus des jardins */
    ecrire(c,'Noé',XN+4*S5,70,54,NOE5);
    if(T>=tMienne) ecrire(c,'Ti Margo',XM+2.5*S5,70,54*zoom(T,tMienne,.4),'#74c0fc');
    jardin(c,T,XN,YN,8,3,tNoe,NOE5,NOE5_B,tCl);
    jardin(c,T,XM,YM,5,5,tCarre,MOI5,MOI5_B,tMienne);
    if(T<ran){ /* il croit Noé : son jardin serait plus grand */
      if(T>=tVrai) ecrire(c,'?',XN+4*S5,470,200*zoom(T,tVrai,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=t5){ const z=zoom(T,t5,.4); ecrire(c,'5',XM+2.5*S5,YM-32,48*z,CRAIE.jaune); ecrire(c,'5',XM-30,YM+2.5*S5,48*z,CRAIE.jaune); }
    if(T>=t3) ecrire(c,'3',XN-30,YN+1.5*S5,48*zoom(T,t3,.4),CRAIE.jaune);
    if(T>=t8) ecrire(c,'8',XN+4*S5,YN-32,48*zoom(T,t8,.4),CRAIE.jaune);
    if(T>=ouf){ /* la réponse : 25 contre 24 */
      ecrire(c,'5 × 5 = 25',XM+2.5*S5,555,60,CRAIE.ok); ecrire(c,'3 × 8 = 24',XN+4*S5,420,60,CRAIE.blanc);
      coche(c,XM+2.5*S5+132,62,.42); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-jardins'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Mon copain Noé'),a0('se vante :')),
    ...suiteDe(ran,60,62,[a0('la clôture de son jardin'),a0('est plus longue'),a0('que la mienne.')],
      [a0('Donc son jardin'),a0('est plus grand !')],[a0('Vraiment ?')]),
    ...suiteDe(q,60,62,[a1('Mon jardin : un carré'),a1('de 5 carreaux de côté.')],[a1('Le jardin de Noé :'),a1('3 rangées de 8 carreaux.')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Noé, tu viens'),a3('planter des tomates'),a3('chez moi ?')]),
    ...suiteDe(f,60,60,[a4('À toi : une bande'),a4('de 1 rangée de 9 carreaux,')],
      [a4('et un carré de 3 carreaux'),a4('de côté.')],[a4('Lequel a la plus'),a4('grande aire ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui a le jardin'),qd('avec la plus'),qd('grande aire ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Moi : 5 × 5, 25 carreaux.'), r2=rd('Noé : 3 × 8, 24 carreaux.'),
    r3=rd('Une clôture plus longue,'), r4=rd('ça ne veut pas dire'), r5=rd('plus de place !');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [...Array(25)].map((_,k)=>`<rect x="${26+(k%5)*24}" y="${60+Math.floor(k/5)*24}" width="22" height="22" rx="4" fill="${MOI5}" stroke="${MOI5_B}" stroke-width="2"/>`).join('')+
    [...Array(24)].map((_,k)=>`<rect x="${158+(k%8)*19}" y="${60+Math.floor(k/8)*19}" width="17" height="17" rx="3" fill="${NOE5}" stroke="${NOE5_B}" stroke-width="2"/>`).join('')+
    `<text x="234" y="228" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le plus grand jardin :<br>lequel ?'+PARI,mini);
  return { clips,FIN,titre:'La clôture de Noé',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ran,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['moi, Ti Margo',tq('A',2),tq('moi')],['Noé',tq('B'),tq('Noé')],['la même aire',tq('C'),tq('la',2)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<tGrand?g.montre():(T<tVrai?g.oups():g.reflechit()); }
      else if(T<q){ T<tNoe?g.montre():(T<t8+1?g.montre():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tTom?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
