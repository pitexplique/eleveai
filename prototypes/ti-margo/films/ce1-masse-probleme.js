/* ============================================================
   Série Masse CE1 — ÉPISODE 04 : LE SEAU DE COQUILLAGES. Outils : films/ce1-commun.js + ce1-masse.js.
   Le seau plein de coquillages pèse 1 kg ; le copain dit : « 1 kg de coquillages ! ». Mais le seau aussi a une
   masse : vide, il pèse 200 g. Question : les coquillages pèsent… 800 g (A). 1 000 g − 200 g = 800 g.
   Commentaire : un panier plein pèse 900 g, vide 100 g : combien pèsent les fruits ?
   ⛔ « 1 000 » s'écrit avec une espace insécable dans les textes de voixDe (un seul jeton).
   ============================================================ */
FILMS['probleme']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':8.68,'01-oups':5.76,'02-question':13.49,'02b-reponse':6.61,'03-fin':3.48,'04-commentaire':9.16,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-oups':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replaceAll('1 000','1'+NBSP+'000').replaceAll('1 200','1'+NBSP+'200');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tSeau=mot('00-accroche','seau'), tCoq=mot('00-accroche','coquillages'), tKilo=mot('00-accroche','kilogramme'),
        tCop=mot('00-accroche','copain'), tKilo2=mot('00-accroche','kilogramme',3);
  const tSeau2=mot('01-oups','seau'), tVide=mot('01-oups','Vide'), t200=mot('01-oups','200');
  const tA=mot('02b-reponse','A');
  const tJoli=mot('03-fin','joli');
  const tPanier=mot('04-commentaire','panier'), t900=mot('04-commentaire','900'), tVide2=mot('04-commentaire','vide'),
        t100=mot('04-commentaire','100'), tFruits=mot('04-commentaire','fruits'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tSeau-.08, HAUT=105;
  const BG={x:300,y:590}, BD={x:760,y:590}, SC=1.2; /* les deux balances de cuisine (le milieu du bas) */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : le panier de fruits */
      if(T>=tPanier) panierCraie(c,330,585,1.7,zoom(T,tPanier,.4),true);
      if(T>=t900) ecrire(c,'plein : 900 g',790,250,64*zoom(T,t900,.4),CRAIE.blanc);
      if(T>=tVide2) ecrire(c,'vide : 100 g',790,370,64*zoom(T,tVide2,.4),CRAIE.blanc);
      if(T>=tFruits) ecrire(c,'fruits : ? g',790,500,68*zoom(T,tFruits,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){
      /* à gauche : le seau plein sur la balance */
      const zg=zoom(T,tSeau,.4);
      if(T>=tSeau){ const h=balanceNumCraie(c,BG.x,BG.y,SC,T>=tKilo?'1 kg':'0 g',zg); seauCraie(c,BG.x,h,SC,zg,T>=tCoq); }
      if(T<sur){
        if(T>=tKilo2){ const z=zoom(T,tKilo2,.4); ecrire(c,'1 kg de',760,250,66*z,CRAIE.faux); ecrire(c,'coquillages ?',760,340,66*z,CRAIE.faux); }
      } else {
        if(T>=tSeau2) ecrire(c,T>=tVide?'le seau vide':'et le seau ?',528,HAUT,66*zoom(T,tSeau2,.4),CRAIE.ret);
        if(T>=tVide){ const z=zoom(T,tVide,.4), h=balanceNumCraie(c,BD.x,BD.y,SC,T>=t200?'200 g':'0 g',z); seauCraie(c,BD.x,h,SC,z,false); }
      }
    } else { /* après la réponse : le seau vide à gauche, les coquillages seuls à droite */
      const hg=balanceNumCraie(c,BG.x,BG.y,SC,'200 g'), hd=balanceNumCraie(c,BD.x,BD.y,SC,'800 g');
      seauCraie(c,BG.x,hg,SC,1,false); tasCoquillages(c,BD.x,hd,280,11,SC);
      ecrire(c,N('1 000 g − 200 g = 800 g'),528,HAUT,62,CRAIE.ok);
      if(T>=tJoli) for(const [dx,dy,k] of [[-150,-240,0],[140,-225,.12],[-160,-80,.24],[155,-60,.36]])
        etincelle(c,BG.x+dx,hg+dy,30*zoom(T,tJoli+k,.3));
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0('Mon seau plein de coquillages'),a0('pèse 1 kilogramme.')],[a0('Mon copain dit :'),a0('1 kilogramme de coquillages !')]),
    ...suiteDe(q,60,62,[a1('Attends… le seau aussi'),a1('a une masse !')],[a1('Vide, il pèse'),a1('200 grammes.')]),
    ...suiteDe(com,60,62,[a3('Le seau ne compte pas…'),a3('mais il est très joli !')]),
    ...suiteDe(f,60,58,[a4('À toi : un panier plein'),a4('pèse 900 grammes,')],[a4('vide 100 grammes.')],
      [a4('Combien pèsent les fruits ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien pèsent les coquillages ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd(N('1 000 grammes moins')), r2=rd('200 grammes de seau :'), r3=rd('800 grammes de coquillages.');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M120 60 L210 60 L196 150 L134 150 Z" fill="#4dabf7" stroke="#1864ab" stroke-width="5"/>`+
    `<rect x="116" y="54" width="98" height="16" fill="#1c7ed6" stroke="#1864ab" stroke-width="4"/>`+
    `<text x="165" y="215" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ff8787" text-anchor="middle">1 kg ?</text></svg>`;
  poserMiniature(outils,acc+1,'Le seau compte<br>ou pas ?'+PARI,mini);
  return { clips,FIN,titre:'Le seau de coquillages',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['800 grammes',tq('A'),tq('800')],['1 kilogramme',tq('B'),tq('kilogramme')],[N('1 200 grammes'),tq('C'),tq('200')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tCop) g.montre();
      else if(T<sur) g.fier();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tJoli?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
