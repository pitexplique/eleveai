/* ============================================================
   Série Masse CP — ÉPISODE 04 : LES TROIS CADEAUX. Outils : films/cp-commun.js + cp-masse.js.
   Ti Margo a trois cadeaux de la même taille ; sa copine veut le plus lourd. Deux pesées :
   le jaune bat le rose, le rose bat le bleu. Question : le plus lourd ? Le jaune (C). Dedans : un gros caillou !
   Commentaire : le chat pèse plus que le lapin, le lapin plus que la souris : qui est le plus léger ?
   ⛔ balanceCraie : a > 0 = le plateau de DROITE descend ; ici le plus lourd est à GAUCHE (a < 0).
   ============================================================ */
FILMS['defi']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':6.59,'01-pesees':6.78,'02-question':12.11,'02b-reponse':7.49,'03-fin':4.78,'04-commentaire':10.38,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-pesees':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJai=mot('00-accroche',"J'ai"), tCad=mot('00-accroche','cadeaux'), tMeme=mot('00-accroche','même'), tLourd=mot('00-accroche','lourd');
  const tJ1=mot('01-pesees','jaune'), tD1=mot('01-pesees','descend'), tR2=mot('01-pesees','rose',2), tD2=mot('01-pesees','descend',2);
  const tCail=mot('03-fin','caillou'), tMerci=mot('03-fin','Merci'), tDed=mot('03-fin','Dedans');
  const tChat=mot('04-commentaire','chat'), tLap=mot('04-commentaire','lapin'), tSou=mot('04-commentaire','souris'),
        tLeg=mot('04-commentaire','léger'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJai-.08, HAUT=105, SOL=620, J='#ffd43b', RO='#f783ac', BL='#4dabf7';

  /* une flèche à la craie, verticale : (x, y) = le milieu, sens = +1 vers le bas */
  function fleche(c,x,y,sens,coul){ c.strokeStyle=coul; c.lineWidth=9; c.lineCap='round'; c.beginPath();
    c.moveTo(x,y-sens*38); c.lineTo(x,y+sens*38); c.moveTo(x-20,y+sens*16); c.lineTo(x,y+sens*38); c.lineTo(x+20,y+sens*16); c.stroke(); }
  /* une pesée : LA balance au milieu, un cadeau sur chaque plateau ; elle penche vers la GAUCHE à tD */
  function pesee(c,cg,cd,t0,tD){ const z=zoom(T_,t0,.4), a=-.3*doux(entreM(T_,tD,tD+.9));
    const haut=balanceCraie(c,528,250,230,a,z); cadeauCraie(c,haut.g.x,haut.g.y,1.25,z,cg); cadeauCraie(c,haut.d.x,haut.d.y,1.25,z,cd);
    if(T_>=tD+.5) fleche(c,haut.g.x-170,haut.g.y-70,1,CRAIE.ret); }
  let T_=0;

  function dessiner(T){ const c=tab.c; tab.effacer(); T_=T;
    if(T>=com){ /* le défi en commentaire : le chat, le lapin, la souris */
      if(T>=tChat) chatCraie(c,230,SOL-20,1.5,zoom(T,tChat,.4),'#ffa94d',false);
      if(T>=tLap) lapinCraie(c,560,SOL-20,1.6,zoom(T,tLap,.4));
      if(T>=tSou) sourisCraie(c,860,SOL-20,2.0,zoom(T,tSou,.4));
      if(T>=tLeg) ecrire(c,'le plus léger ?',528,HAUT,60*zoom(T,tLeg,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* on ouvre le cadeau jaune : un gros caillou ! */
      const u=doux(entreM(T,tDed,tDed+.8));
      if(T>=tCail) caillouCraie(c,528,SOL-200-60*doux(entreM(T,tCail,tCail+.5)),100,zoom(T,tCail,.4));
      cadeauCraie(c,528,SOL,2.2,1,J,u);
      if(T>=tCail) ecrire(c,'un gros caillou !',330,HAUT,58*zoom(T,tCail,.4),CRAIE.blanc);
      if(T>=tMerci) ecrire(c,'Merci !',820,HAUT,62*zoom(T,tMerci,.4),CRAIE.ok);
      tab.maj(); return; }
    if(T>=sur){ /* les deux pesées, côte à côte */
      if(T>=tR2) pesee(c,RO,BL,tR2,tD2); else if(T>=tJ1) pesee(c,J,RO,tJ1,tD1);
      if(T>=tD1+.4) ecrire(c,'le jaune descend',300,HAUT,50*zoom(T,tD1+.4,.4),T>=tR2?CRAIE.blanc:CRAIE.ret);
      if(T>=tD2+.4) ecrire(c,'le rose descend',790,HAUT,50*zoom(T,tD2+.4,.4),CRAIE.ret);
      tab.maj(); return; }
    /* l'histoire : trois cadeaux de la même taille */
    if(T>=tCad) for(const [x,coul,k] of [[250,J,0],[528,RO,1],[806,BL,2]]) cadeauCraie(c,x,SOL-60,1.8,zoom(T,tCad+.15*k,.4),coul);
    if(T>=tMeme) ecrire(c,'même taille',300,HAUT,58*zoom(T,tMeme,.4),CRAIE.blanc);
    if(T>=tLourd) ecrire(c,'le plus lourd ?',770,HAUT,58*zoom(T,tLourd,.4),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-pesees'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0("J'ai trois cadeaux"),a0('de la même taille.')],[a0('Ma copine veut'),a0('le plus lourd.')]),
    ...suiteDe(q,60,60,[a1('Le jaune contre le rose :'),a1('le jaune descend.')],[a1('Le rose contre le bleu :'),a1('le rose descend.')]),
    ...suiteDe(com,60,64,[a3('Dedans… un gros caillou !')],[a3('Merci, ma copine !')]),
    ...suiteDe(f,60,58,[a4('À toi : le chat pèse'),a4('plus que le lapin.')],[a4('Le lapin pèse plus'),a4('que la souris.')],
      [a4('Qui est le plus léger ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel cadeau'),qd('est le plus lourd ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le jaune bat le rose,'), r2=rd('et le rose bat le bleu.'), r3=rd('Le jaune est le plus lourd !');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [[60,'#ffd43b'],[150,'#f783ac'],[240,'#4dabf7']].map(([x,k])=>`<rect x="${x}" y="130" width="70" height="70" fill="${k}" stroke="#343a40" stroke-width="3"/>`+
      `<rect x="${x+29}" y="130" width="12" height="70" fill="#e03131"/><rect x="${x-4}" y="116" width="78" height="16" fill="${k}" stroke="#343a40" stroke-width="3"/>`).join('')+
    `<text x="165" y="96" font-family="Segoe UI" font-weight="800" font-size="76" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Trois cadeaux :<br>le plus<br>lourd ?'+PARI,mini);
  return { clips,FIN,titre:'Quel cadeau est le plus lourd ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le rose',tq('A'),tq('rose')],['le bleu',tq('B'),tq('bleu')],['le jaune',tq('C'),tq('jaune')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<sur) g.montre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tMerci?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
