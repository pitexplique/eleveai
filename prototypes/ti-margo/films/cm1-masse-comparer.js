/* ============================================================
   Série Masse CM1 — ÉPISODE 01 : 3 500 g OU 4 kg ? Outils : films/cm1-commun.js + cm1-masse.js.
   Le copain de Ti Margo se vante : « mon cartable pèse 3 500 g, le tien seulement 4 kg ; 3 500, c'est plus que 4 ! ».
   Hum… pas la même unité. Question : quel cartable est le plus lourd ? Celui de 4 kg (A) : 4 kg = 4 000 g.
   Fin : la balance, le cartable de 4 kg descend. Commentaire : 2 t ou 1 900 kg ? Ceinture blanche.
   ⛔ 3 500, 4 000 et 1 900 s'écrivent avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['comparer']=function(outils){
  deuxAuPlusM();
  { /* « 3 500, c'est… » / « que 3 500. » : un nombre seul a deux marques identiques de suite → une seule */
    for(const k of ['00-accroche','02b-reponse']){ const CR=window.CUES[VIDEO][k];
      window.CUES[VIDEO][k]=CR.filter((x,i)=>!(i>0&&CR[i-1][1]===x[1]&&/^[\d ]+$/.test(x[1]))); } }
  const DUR={'00-accroche':12.29,'01-doute':2.79,'02-question':15.36,'02b-reponse':8.71,'03-fin':5.32,'04-commentaire':7.20,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-doute':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dou,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tCart=mot('00-accroche','cartable'), t35=mot('00-accroche','3'),
        tTien=mot('00-accroche','tien'), t4=mot('00-accroche','4'), t35b=mot('00-accroche','3',2),
        tPlus=mot('00-accroche','plus');
  const tUnite=mot('01-doute','unité');
  const tA=mot('02b-reponse','A');
  const tMeme=mot('03-fin','même'), tLourd=mot('03-fin','lourd');
  const t2t=mot('04-commentaire','2'), t19=mot('04-commentaire','ou')+.15, tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, SOL=590, XR=835;
  const CA={x:185,s:1.2}, CB={x:505,s:1.2};   /* le cartable du copain (3 500 g), celui de Ti Margo (4 kg) */
  const PV={x:330,y:150,L:210}, XF=850;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2 t ou 1 900 kg ? la balance attend */
      const h=balanceCraie(c,550,170,300,0,zoom(T,com,.4));
      if(h){
        if(T>=t2t) ecrire(c,'2 t',h.g.x,h.g.y+120,110*zoom(T,t2t,.4),CRAIE.jaune);
        if(T>=t19) ecrire(c,N('1 900 kg'),h.d.x,h.d.y+120,84*zoom(T,t19,.4),CRAIE.jaune);
        if(T>=t19+.6) ecrire(c,'?',550,85,120,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : sur la balance, le cartable de 4 kg descend */
      const a=.3*doux(entreM(T,ouf+.2,ouf+1.2));
      const h=balanceCraie(c,PV.x,PV.y,PV.L,a,1);
      cartableCraie(c,h.g.x,h.g.y,1); ecrire(c,N('3 500 g'),h.g.x,h.g.y+95,56,CRAIE.blanc);
      cartableCraie(c,h.d.x,h.d.y,1); ecrire(c,'4 kg',h.d.x,h.d.y+95,56,CRAIE.blanc);
      ecrire(c,'4 kg',XF,150,84,CRAIE.ok);
      if(T>=ouf+.5) ecrire(c,N('= 4 000 g'),XF,260,64*zoom(T,ouf+.5,.4),CRAIE.ok);
      if(T>=ouf+1.0) ecrire(c,N('> 3 500 g'),XF,360,64*zoom(T,ouf+1.0,.4),CRAIE.jaune);
      if(T>=tMeme) ecrire(c,'même unité !',XF,470,56*zoom(T,tMeme,.4),CRAIE.jaune);
      if(T>=tLourd) ecrire(c,'lourd !',XF,560,60*zoom(T,tLourd,.4),CRAIE.gris);
      tab.maj(); return; }
    /* l'accroche : les deux cartables, le copain se vante ; puis « pas la même unité » */
    if(T>=tCart){ cartableCraie(c,CA.x,SOL,CA.s,zoom(T,tCart,.4));
      if(T>=t35) ecrire(c,N('3 500 g'),CA.x,SOL-305,72*zoom(T,t35,.4),CRAIE.blanc); }
    if(T>=tTien){ cartableCraie(c,CB.x,SOL,CB.s,zoom(T,tTien,.4));
      if(T>=t4) ecrire(c,'4 kg',CB.x,SOL-305,72*zoom(T,t4,.4),CRAIE.blanc); }
    if(T<dou){
      if(T>=t35b) ecrire(c,N('3 500'),XR,190,90*zoom(T,t35b,.4),CRAIE.faux);
      if(T>=tPlus) ecrire(c,'plus que 4 ?',XR,320,52*zoom(T,tPlus,.4),CRAIE.faux);
    } else {
      ecrire(c,N('3 500'),XR,190,90,CRAIE.faux); ecrire(c,'plus que 4 ?',XR,320,52,CRAIE.faux);
      if(T>=tUnite) ecrire(c,'g ≠ kg !',XR,460,70*zoom(T,tUnite,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-doute'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(dou,60,60,[a0('Mon copain se vante :'),a0('mon cartable pèse')],[a0(N('3 500 grammes,')),a0('le tien seulement'),a0('4 kilogrammes !')],
      [a0(N("3 500, c'est")),a0('bien plus que 4 !')]),
    ...suiteDe(q,60,62,[a1('Hum…'),a1("il n'a pas la même unité.")]),
    ...suiteDe(com,60,62,[a3("D'abord"),a3('la même unité !')],[a3('Bon… mon cartable'),a3('est vraiment lourd.')]),
    ...suiteDe(f,60,60,[a4('À toi : qui est'),a4('le plus lourd,')],[a4('2 tonnes'),a4(N('ou 1 900 kilogrammes ?'))],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel cartable'),qd('est le plus lourd ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('4 kilogrammes,'), r2=rd(N("c'est 4 000 grammes.")), r3=rd(N('4 000 est plus grand')),
    r4=rd(N('que 3 500.'));

  poserMiniature(outils,acc+1,N('3 500 g ou 4 kg :')+'<br>le plus lourd ?'+PARI,
    ardoiseMini([[N('3 500 g')],['ou','#ffd43b'],['4 kg']]));
  return { clips,FIN,titre:N('3 500 g ou 4 kg ?'),ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dou,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['celui de 4 kg',tq('A'),tq('B')-.3],['ils pèsent pareil',tq('B'),tq('C')-.3],[N('celui de 3 500 g'),tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t35b) g.montre();
      else if(T<dou) g.oups();
      else if(T<q) g.reflechit();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tLourd?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
