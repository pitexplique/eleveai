/* ============================================================
   Série Masse CE2 — ÉPISODE 07 : L'ANANAS ET LES MANGUES. Outils : films/ce2-commun.js + ce2-masse.js.
   Sur la balance, l'ananas fait équilibre avec trois mangues pareilles de 400 g. Le copain se gratte la tête.
   Question : combien pèse l'ananas ? 400 g, 1 200 g, 1 kg (B : 400, 800, 1 200).
   Fin : 1 kg 200 g de jus d'ananas, miam ! Commentaire : 4 bananes de 150 g = une papaye. Ceinture jaune.
   ⛔ « 1 200 » s'écrit avec une espace insécable dans les textes de voixDe (un seul jeton).
   ============================================================ */
FILMS['defi']=function(outils){
  deuxAuPlusM();
  { /* « 400, 800, 1 200 » : un nombre seul a deux marques identiques de suite → une seule (pas « 1 200 grammes ») */
    const CR=window.CUES[VIDEO]['02b-reponse'];
    window.CUES[VIDEO]['02b-reponse']=CR.filter((x,i)=>!(i>0&&CR[i-1][1]===x[1]&&/^[\d ]+$/.test(x[1]))); }
  const DUR={'00-accroche':9.13,'01-reflexion':2.70,'02-question':13.24,'02b-reponse':9.68,'03-fin':5.18,'04-commentaire':10.21,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-reflexion':1.0,'02-question':3.3,'03-fin':1.6,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ref,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replaceAll('1 200','1'+NBSP+'200');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tSur=mot('00-accroche','Sur'), tBal=mot('00-accroche','balance'), tAna=mot('00-accroche','ananas'),
        tTrois=mot('00-accroche','trois'), t400=mot('00-accroche','400');
  const tTete=mot('01-reflexion','tête');
  const tB=mot('02b-reponse','B');
  const tSoit=mot('03-fin','Soit'), tKg=mot('03-fin','1'), tJus=mot('03-fin','jus'), tMiam=mot('03-fin','Miam');
  const tBan=mot('04-commentaire','4'), t150=mot('04-commentaire','150'), tPap=mot('04-commentaire','papaye'),
        tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tSur-.08, SOL=590, XB=550, YB=SOL-24-390, L=330;

  /* la balance à l'équilibre, ce qu'il y a sur chaque plateau ; z = zoom d'apparition */
  function balance(c,z=1){ return balanceCraie(c,XB,YB,L,0,z); }
  function mangues(c,h,z,t0){ const pos=[[-70,0],[70,0],[0,-62]];   /* deux en bas, une dessus */
    pos.forEach(([dx,dy],i)=>{ const zi=zoom(T_,t0+i*.25,.35); if(zi>0) mangueM(c,h.x+dx,h.y+dy,1.35,zi*z); }); }
  let T_=0;

  function dessiner(T){ const c=tab.c; tab.effacer(); T_=T;
    if(T>=com){ /* le défi en commentaire : 4 bananes de 150 g contre une papaye */
      const h=balance(c,zoom(T,com,.4));
      if(h){ papayeM(c,h.g.x,h.g.y,1.35,zoom(T,tPap,.4));
        if(T>=tBan){ const z=zoom(T,tBan,.4);
          bananeM(c,h.d.x-75,h.d.y-30,165,z,-.1); bananeM(c,h.d.x+75,h.d.y-30,165,z,.1);
          bananeM(c,h.d.x-75,h.d.y-88,165,z,-.1); bananeM(c,h.d.x+75,h.d.y-88,165,z,.1); }
        if(T>=t150) ecrire(c,'4 × 150 g',h.d.x,h.d.y+110,64*zoom(T,t150,.4),CRAIE.jaune);
        if(T>=tComb) ecrire(c,'? g',h.g.x,h.g.y+110,90*zoom(T,tComb,.4),CRAIE.faux); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : 1 200 g = 1 kg 200 g de jus d'ananas, miam */
      ananasM(c,250,SOL,1.75);
      ecrire(c,N('1 200 g'),700,HAUT_+20,100,CRAIE.ok);
      if(T>=tKg) ecrire(c,'= 1 kg 200 g',700,HAUT_+140,92*zoom(T,tKg,.4),CRAIE.jaune);
      if(T>=tJus) verreJusM(c,640,SOL,1.25,zoom(T,tJus,.4));
      if(T>=tMiam) ecrire(c,'Miam !',880,SOL-120,90*zoom(T,tMiam,.4),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : la balance à l'équilibre, l'ananas, les trois mangues ; puis le copain se gratte la tête */
    const h=T>=tBal?balance(c,zoom(T,tBal,.4)):null;
    if(h){
      if(T>=tAna) ananasM(c,h.g.x,h.g.y,1.35,zoom(T,tAna,.4));
      if(T>=tTrois) mangues(c,h.d,1,tTrois);
      if(T>=t400) ecrire(c,'400 g',h.d.x,h.d.y+110,78*zoom(T,t400,.4),CRAIE.jaune);
      if(T>=ref) ecrire(c,'? g',h.g.x,h.g.y+110,96*zoom(T,ref+.2,.4),CRAIE.faux); }
    tab.maj();
  }
  const HAUT_=100;

  const a0=dit('00-accroche'), a1=dit('01-reflexion'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(ref,60,60,[a0('Sur la balance,'),a0('mon ananas')],[a0('fait équilibre'),a0('avec trois mangues'),a0('pareilles.')],
      [a0('Une mangue pèse'),a0('400 grammes.')]),
    ...suiteDe(q,60,62,[a1('Mon copain'),a1('se gratte la tête…')]),
    ...suiteDe(com,60,62,[a3('Soit 1 kilogramme'),a3('200 grammes')],[a3("de jus d'ananas."),a3('Miam !')]),
    ...suiteDe(f,60,58,[a4('À toi : 4 bananes'),a4('de 150 grammes')],[a4('font équilibre'),a4('avec une papaye.')],
      [a4('Combien pèse'),a4('la papaye ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien pèse'),qd("l'ananas ?")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('3 mangues'), r1b=rd('de 400 grammes :'), r2=rd(N('400, 800, 1 200.')), r3=rd("L'ananas pèse"), r4=rd(N('1 200 grammes.'));

  poserMiniature(outils,acc+1,"Combien pèse<br>l'ananas ?"+PARI,ardoiseMini([['1 ananas ='],['3 mangues','#ffd43b'],['de 400 g']]));
  return { clips,FIN,titre:'Ananas = 3 mangues ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ref,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['400 grammes',tq('A'),tq('B')-.3],[N('1 200 grammes'),tq('B'),tq('C')-.3],['1 kilogramme',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r1b,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t400) g.montre();
      else if(T<ref) g.fier();
      else if(T<q) g.reflechit();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tMiam?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
