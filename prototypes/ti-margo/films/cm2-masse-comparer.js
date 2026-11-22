/* ============================================================
   Série Masse CM2 — ÉPISODE 01 : 1,5 kg OU 1,25 kg ? Outils : films/cm2-commun.js + cm2-masse.js.
   Ti Margo se vante : « ma copine a un melon de 1,5 kg, moi de 1,25 kg ; 25, c'est plus que 5 : j'ai le plus gros ! ».
   On pose les deux melons sur la balance… Question : quel melon est le plus lourd ? A, 1,5 kg (1 500 g > 1 250 g).
   Fin : le melon de 1,5 kg descend ; « je lui échange contre une mangue ? ». Commentaire : 2,8 kg ou 2 750 g ? Ceinture blanche.
   ⛔ 1 500, 1 250 et 2 750 s'écrivent avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['comparer']=function(outils){
  { /* un nombre dit en plusieurs marques identiques (« 1,5 » ×3, « 1 500 grammes » ×4) : autant de marques
       que de jetons écrits (« 1 500 » = un seul jeton) */
    const CL=window.CUES[VIDEO];
    for(const k in CL){ const res=[]; let n=0;
      CL[k].forEach((x,i)=>{ n=(i>0&&CL[k][i-1][1]===x[1])?n+1:1;
        if(n<=x[1].trim().replace(/(\d)\s(\d{3})/g,'$1$2').split(/\s+/).length) res.push(x); });
      CL[k]=res; } }
  const DUR={'00-accroche':13.04,'01-balance':2.96,'02-question':16.03,'02b-reponse':12.81,'03-fin':3.10,'04-commentaire':8.65,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-balance':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMa=mot('00-accroche','Ma'), tMelon=mot('00-accroche','melon'), t15=mot('00-accroche','1,5'),
        tMoi=mot('00-accroche','Moi'), t125=mot('00-accroche','1,25'), t25=mot('00-accroche','25'),
        t5=mot('00-accroche','5'), tGros=mot('00-accroche','gros');
  const tPose=mot('01-balance','pose'), tBal=mot('01-balance','balance');
  const tA=mot('02b-reponse','A');
  const tEch=mot('03-fin','échange'), tMangue=mot('03-fin','mangue');
  const t28=mot('04-commentaire','2,8'), t275=mot('04-commentaire','ou')+.15, tRep=mot('04-commentaire','Réponds');
  const finTitre=tMa-.08, SOL=590, XR=835, XF=850;
  const MA={x:205,s:1.85}, MB={x:545,s:1.85};   /* le melon de la copine (1,5 kg), celui de Ti Margo (1,25 kg) */
  const PV={x:330,y:150,L:210};

  function balanceMelons(T,a,z){ const c=tab.c, h=balanceCraie(c,PV.x,PV.y,PV.L,a,z); if(!h) return null;
    melonM(c,h.g.x,h.g.y,.95,z); melonM(c,h.d.x,h.d.y,.95,z);
    ecrire(c,'1,5 kg',h.g.x,h.g.y+90,56*Math.min(1,z),CRAIE.blanc);
    ecrire(c,'1,25 kg',h.d.x,h.d.y+90,56*Math.min(1,z),CRAIE.blanc);
    return h; }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2,8 kg ou 2 750 g ? la balance attend */
      const h=balanceCraie(c,550,170,300,0,zoom(T,com,.4));
      if(h){
        if(T>=t28) ecrire(c,'2,8 kg',h.g.x,h.g.y+120,96*zoom(T,t28,.4),CRAIE.jaune);
        if(T>=t275) ecrire(c,N('2 750 g'),h.d.x,h.d.y+120,84*zoom(T,t275,.4),CRAIE.jaune);
        if(T>=t275+.6) ecrire(c,'?',550,85,120,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : le melon de 1,5 kg descend ; et si on l'échangeait contre une mangue ? */
      balanceMelons(T,-.3*doux(entreM(T,ouf+.2,ouf+1.2)),1);
      ecrire(c,N('1 500 g'),XF+20,150,72,CRAIE.ok);
      if(T>=ouf+.5) ecrire(c,'>',XF+20,240,70*zoom(T,ouf+.5,.4),CRAIE.jaune);
      if(T>=ouf+.9) ecrire(c,N('1 250 g'),XF+20,330,72*zoom(T,ouf+.9,.4),CRAIE.blanc);
      if(T>=tMangue){ mangueM(c,XF,580,2.3,zoom(T,tMangue,.4)); ecrire(c,'?',XF+125,450,80*zoom(T,tMangue,.4),CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=bal){ /* on pose les deux melons sur la balance… qui attend */
      balanceMelons(T,0,zoom(T,tPose,.4));
      if(T>=tBal) ecrire(c,'?',XF,300,160*zoom(T,tBal,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* l'accroche : les deux melons, Ti Margo se vante */
    if(T>=tMelon){ melonM(c,MA.x,SOL,MA.s,zoom(T,tMelon,.4));
      ecrire(c,'Ma copine',MA.x,SOL+55,40,CRAIE.gris);
      if(T>=t15) ecrire(c,'1,5 kg',MA.x,SOL-335,72*zoom(T,t15,.4),CRAIE.blanc); }
    if(T>=tMoi){ melonM(c,MB.x,SOL,MB.s,zoom(T,tMoi,.4));
      ecrire(c,'Moi',MB.x,SOL+55,40,CRAIE.gris);
      if(T>=t125) ecrire(c,'1,25 kg',MB.x,SOL-335,72*zoom(T,t125,.4),CRAIE.blanc); }
    if(T>=t25) ecrire(c,'25',XR-80,150,100*zoom(T,t25,.4),CRAIE.faux);
    if(T>=t5){ ecrire(c,'>',XR+25,150,80*zoom(T,t5,.4),CRAIE.faux); ecrire(c,'5',XR+100,150,100*zoom(T,t5,.4),CRAIE.faux); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-balance'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(bal,60,60,[a0('Ma copine a un melon'),a0('de 1,5 kilogramme.')],[a0('Moi, un de'),a0('1,25 kilogramme.')],
      [a0("25, c'est plus que 5 :"),a0("j'ai le plus gros !")]),
    ...suiteDe(q,60,62,[a1('On pose les deux melons'),a1('sur la balance…')]),
    ...suiteDe(com,60,62,[a3('Bon… je lui échange'),a3('contre une mangue ?')]),
    ...suiteDe(f,60,60,[a4('À toi : qui est'),a4('le plus lourd,')],[a4('2,8 kilogrammes'),a4(N('ou 2 750 grammes ?'))],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel melon'),qd('est le plus lourd ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('1,5 kilogramme,'), r2=rd(N("c'est 1 500 grammes.")), r3=rd('1,25 kilogramme,'),
    r4=rd(N('1 250 grammes.'));

  poserMiniature(outils,acc+1,'1,5 kg ou 1,25 kg :<br>le plus lourd ?'+PARI,
    ardoiseMini([['1,5 kg'],['ou','#ffd43b'],['1,25 kg']]));
  return { clips,FIN,titre:'1,5 kg ou 1,25 kg ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bal,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['celui de 1,5 kg',tq('A'),tq('B')-.3],['celui de 1,25 kg',tq('B'),tq('C')-.3],['ils pèsent pareil',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t25) g.montre();
      else if(T<bal) g.fier();
      else if(T<q) g.reflechit();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.oups(); }
      else if(T<com){ T<tEch?g.oups():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
