/* ============================================================
   Série Masse CE2 — ÉPISODE 02 : LE SAC DE 1 200 KG. Outils : films/ce2-commun.js + ce2-masse.js.
   Sur le sac de riz : « 1 kg 200 g ». Le copain lit « 1 200 kg » et le soulève… facile !
   Sur la balance, 1 200 kg pèserait plus qu'une voiture. Question : 1 kg 200 g, c'est… 120 g, 1 200 kg, 1 200 g (C).
   Fin : même sac, deux écritures (1 kg 200 g = 1 200 g). Commentaire : 3 kg 500 g = ? g. Ceinture jaune.
   ⛔ « 1 000 », « 1 200 » s'écrivent avec une espace insécable dans les textes de voixDe (un seul jeton).
   ============================================================ */
FILMS['relations']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':11.37,'01-oups':5.35,'02-question':14.59,'02b-reponse':7.76,'03-fin':2.93,'04-commentaire':7.23,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-oups':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const NBSP=' ', N=x=>x.replaceAll('1 000','1'+NBSP+'000').replaceAll('1 200','1'+NBSP+'200');
  const tSur=mot('00-accroche','Sur'), tSac=mot('00-accroche','sac'), tKg=mot('00-accroche','kilogramme'),
        t1200=mot('00-accroche','kilogrammes'), tSoul=mot('00-accroche','soulève'), tFac=mot('00-accroche','facile');
  const tCe=mot('01-oups','Ce');
  const tC=mot('02b-reponse','C');
  const tMeme=mot('03-fin','Même'), tDeux=mot('03-fin','deux');
  const t3=mot('04-commentaire','3'), t500=mot('04-commentaire','500'), tComb=mot('04-commentaire','combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tSur-.08, HAUT=100, SOL=600, PV={x:528,y:250,L:250};
  const ET='1 kg 200 g';

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 3 kg 500 g = ? g */
      if(T>=t3){ const z=zoom(T,t3,.4); sacRizCraie(c,270,SOL,1.9,z,T>=t500?'3 kg 500 g':'3 kg'); }
      if(T>=tComb){ const z=zoom(T,tComb,.4); ecrire(c,'= ? g',760,SOL-210,120*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : même sac, deux écritures */
      sacRizCraie(c,240,SOL,1.9,1,ET);
      if(T>=tMeme){ const z=zoom(T,tMeme,.4); ecrire(c,'=',515,SOL-210,110*z,CRAIE.blanc); ecrire(c,N('1 200 g'),780,SOL-210,104*z,CRAIE.ok); }
      if(T>=tDeux) ecrire(c,'deux écritures !',735,HAUT+10,72*zoom(T,tDeux,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* l'accroche : le sac de riz, « 1 200 kg » lu de travers, il le soulève */
      const lev=doux(entreM(T,tSoul,tSoul+.7))*70;
      if(T>=tSac) sacRizCraie(c,280,SOL-lev,1.9,zoom(T,tSac,.4),T>=tKg?ET:'');
      if(T>=t1200) ecrire(c,N('1 200 kg ?!'),760,HAUT+40,80*zoom(T,t1200,.4),CRAIE.faux);
      if(T>=tFac) ecrire(c,'facile !',760,HAUT+190,72*zoom(T,tFac,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* oups : sur la balance, « 1 200 kg » contre une voiture : le sac l'emporte (le plateau de GAUCHE descend) */
    const a=-.28*doux(entreM(T,tCe,tCe+.8));
    const haut=balanceCraie(c,PV.x,PV.y,PV.L,a,zoom(T,oup,.4));
    if(haut){ sacRizCraie(c,haut.g.x,haut.g.y,1.15,zoom(T,oup+.2,.4),N('1 200 kg')); voitureM(c,haut.d.x,haut.d.y,1.4,zoom(T,oup+.2,.4)); }
    if(T>=tCe) ecrire(c,'plus lourd ?!',PV.x,HAUT,72*zoom(T,tCe,.4),CRAIE.faux);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(oup,60,60,[a0('Sur le sac de riz :'),a0('1 kilogramme 200 grammes.')],[a0('Mon copain lit :'),a0(N('1 200 kilogrammes !'))],
      [a0('Il le soulève… facile !')]),
    ...suiteDe(q,60,62,[a1(N('1 200 kilogrammes ?'))],[a1('Ce serait plus lourd'),a1("qu'une voiture !")]),
    ...suiteDe(com,60,64,[a3('Même sac,'),a3('deux écritures !')]),
    ...suiteDe(f,60,58,[a4('À toi : 3 kilogrammes'),a4('500 grammes,')],[a4("c'est combien de grammes ?")],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('1 kilogramme 200 grammes,'),qd("c'est…")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd(N("1 kilogramme, c'est 1 000 grammes.")), r2=rd(N('Plus 200 : 1 200 grammes.'));

  poserMiniature(outils,acc+1,N('1 200 kg<br>de riz ?')+PARI,ardoiseMini([['1 kg 200 g'],['= ? g','#ffd43b']]));
  return { clips,FIN,titre:N('1 200 kg de riz ?'),ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['120 g',tq('A'),tq('B')-.3],[N('1 200 kg'),tq('B'),tq('C')-.3],[N('1 200 g'),tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t1200) g.montre();
      else if(T<oup) g.oups();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
