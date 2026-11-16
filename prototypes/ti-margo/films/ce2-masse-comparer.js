/* ============================================================
   Série Masse CE2 — ÉPISODE 03 : 900 g OU 1 kg ? Outils : films/ce2-commun.js + ce2-masse.js.
   La copine de Ti Margo : « 900, c'est plus que 1 ! ». On pose les deux fromages sur la balance.
   Question : quel plateau descend ? Celui de 1 kg (B) : 1 kg = 1 000 g. Ceinture jaune.
   Commentaire : qui est le plus lourd, 2 kg ou 1 800 g ?
   ⛔ 1 000 et 1 800 s'écrivent avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['comparer']=function(outils){
  deuxAuPlusM(); fusionnerNombres();
  const DUR={'00-accroche':12.75,'01-balance':2.58,'02-question':14.48,'02b-reponse':7.19,'03-fin':4.03,'04-commentaire':7.19,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-balance':1.2,'02-question':3.3,'03-fin':1.2,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMa=mot('00-accroche','Ma'), t900=mot('00-accroche','fromage'), tMoi=mot('00-accroche','morceau'),
        tElle=mot('00-accroche','dit'), tQue=mot('00-accroche','que'), tGros=mot('00-accroche','gros');
  const tPose=mot('01-balance','pose'), tBal=mot('01-balance','balance');
  const tGrim=mot('03-fin','grimace'), tPart=mot('03-fin','partage');
  const t2=mot('04-commentaire','2'), t18=mot('04-commentaire','ou')+.15, tRep=mot('04-commentaire','Réponds');
  const finTitre=tMa-.08, XR=860, PV={x:320,y:165,L:205};
  /* les deux fromages : 900 g (la copine, à gauche), 1 kg (Ti Margo, à droite) */
  const F9={w:190,h:120,x0:150,y0:600}, F1={w:220,h:140,x0:470,y0:600};

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2 kg ou 1 800 g ? */
      if(T>=t2){ sacCraie(c,300,560,190,250,zoom(T,t2,.4)); ecrire(c,'2 kg',300,640,62*zoom(T,t2,.4),CRAIE.jaune); }
      if(T>=t18){ sacCraie(c,760,560,190,250,zoom(T,t18,.4),'#a9c8e8'); ecrire(c,'1 800 g',760,640,62*zoom(T,t18,.4),CRAIE.jaune); }
      if(T>=t18+.6) ecrire(c,'?',530,330,170,CRAIE.jaune);
      tab.maj(); return; }
    /* la balance : à niveau tant qu'on n'a pas répondu, puis le plateau de 1 kg descend */
    const a=T<ouf?0:.3*doux(entreM(T,ouf+.1,ouf+1.1));
    const u=entreM(T,tPose,tBal+.5); /* les fromages montent sur les plateaux */
    const haut=T>=bal?balanceCraie(c,PV.x,PV.y,PV.L,a,zoom(T,bal,.4)):null;
    const place=(F,cote)=>{ if(!haut) return {x:F.x0,y:F.y0};
      const p=haut[cote], v=doux(u); return {x:F.x0+(p.x-F.x0)*v,y:F.y0+(p.y-F.y0)*v-Math.sin(v*Math.PI)*90}; };
    if(T>=t900||T>=tMoi){ const p9=place(F9,'g'), p1=place(F1,'d');
      if(T>=t900){ fromageCraie(c,p9.x,p9.y,F9.w,F9.h,zoom(T,t900,.4)); ecrire(c,'900 g',p9.x,p9.y-F9.h-40,62,CRAIE.blanc); }
      if(T>=tMoi){ fromageCraie(c,p1.x,p1.y,F1.w,F1.h,zoom(T,tMoi,.4)); ecrire(c,'1 kg',p1.x,p1.y-F1.h-40,62,CRAIE.blanc); } }
    if(T<bal){
      if(T>=tElle) ecrire(c,'900',XR,190,96*zoom(T,tElle,.4),CRAIE.faux);
      if(T>=tQue) ecrire(c,'plus que 1 ?',XR,310,60*zoom(T,tQue,.4),CRAIE.faux);
      if(T>=tGros) ecrire(c,'le plus gros ?',XR,450,52*zoom(T,tGros,.4),CRAIE.jaune);
    } else if(T<q){
      if(T>=tBal+.3) ecrire(c,'?',XR,330,170*zoom(T,tBal+.3,.4),CRAIE.jaune);
    } else if(T>=ouf){ /* la copine fait la grimace ; on partage */
      if(T>=ouf+1.1) coche(c,XR-60,560,.6);
      if(T>=tGrim) ecrire(c,'grimace…',XR,200,64*zoom(T,tGrim,.4),CRAIE.gris);
      if(T>=tPart) ecrire(c,'je partage !',XR,360,60*zoom(T,tPart,.4),CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-balance'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(bal,60,60,[a0('Ma copine a un fromage'),a0('de 900 grammes.')],[a0('Moi, un morceau'),a0('de 1 kilogramme.')],
      [a0('Elle dit : 900,'),a0("c'est plus que 1 !")],[a0("J'ai le plus gros !")]),
    ...suiteDe(q,60,62,[a1('On pose les deux'),a1('sur la balance…')]),
    ...suiteDe(com,60,62,[a3('Ma copine'),a3('fait la grimace…')],[a3('Je partage'),a3('quand même !')]),
    ...suiteDe(f,60,60,[a4('À toi : qui est'),a4('le plus lourd,')],[a4('2 kilogrammes'),a4('ou 1 800 grammes ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel plateau descend ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('1 kilogramme,'), r2=rd("c'est 1 000 grammes."), r3=rd('1 000 est plus grand'),
    r4=rd('que 900 !');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<line x1="60" y1="80" x2="230" y2="80" stroke="#fab005" stroke-width="7" stroke-linecap="round"/><line x1="145" y1="80" x2="145" y2="215" stroke="#dee2e6" stroke-width="7"/>`+
    `<path d="M25 140 A35 14 0 0 0 95 140 Z" fill="none" stroke="#fab005" stroke-width="5"/><path d="M195 140 A35 14 0 0 0 265 140 Z" fill="none" stroke="#fab005" stroke-width="5"/>`+
    `<line x1="60" y1="80" x2="32" y2="140" stroke="#dee2e6" stroke-width="2"/><line x1="60" y1="80" x2="88" y2="140" stroke="#dee2e6" stroke-width="2"/>`+
    `<line x1="230" y1="80" x2="202" y2="140" stroke="#dee2e6" stroke-width="2"/><line x1="230" y1="80" x2="258" y2="140" stroke="#dee2e6" stroke-width="2"/>`+
    `<text x="60" y="190" font-family="Segoe UI" font-weight="800" font-size="34" fill="#f8f9fa" text-anchor="middle">900 g</text>`+
    `<text x="230" y="190" font-family="Segoe UI" font-weight="800" font-size="34" fill="#f8f9fa" text-anchor="middle">1 kg</text>`+
    `<text x="292" y="120" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'900 g ou 1 kg :<br>le plus lourd ?'+PARI,mini);
  return { clips,FIN,titre:'900 g ou 1 kg ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bal,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['celui de 900 g',tq('A'),tq('900')],['celui de 1 kg',tq('B'),tq('kilogramme')],["aucun : l'équilibre",tq('C'),tq('aucun')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<bal){ T<tElle?g.montre():(T<tGros?g.oups():g.fier()); }
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tPart?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
