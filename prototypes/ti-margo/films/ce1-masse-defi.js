/* ============================================================
   Série Masse CE1 — ÉPISODE 05 : 1 KG DE PLUMES CONTRE 1 KG DE CAILLOUX. Outils : films/ce1-commun.js + ce1-masse.js.
   Le pari : la copine dit « les cailloux, c'est sûr ! ». Sur la balance : elle reste en équilibre (A),
   car 1 kg, c'est 1 kg ; le sac de plumes est juste plus gros. Fin : l'oreiller de plumes.
   Commentaire : combien de grammes dans 2 kg de plumes ?
   Ceinture BLANCHE (la paysage du défi est en jaune).
   ============================================================ */
FILMS['defi']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':9.32,'01-pari':6.14,'02-question':13.71,'02b-reponse':7.84,'03-fin':5.88,'04-commentaire':6.43,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-pari':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pari,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tCop=mot('00-accroche','copine'), tPlumes=mot('00-accroche','plumes'), tCail=mot('00-accroche','cailloux');
  const tDit=mot('01-pari','cailloux'), tPose=mot('01-pari','pose'), tBal=mot('01-pari','balance');
  const tA=mot('02b-reponse','A');
  const tGagne=mot('03-fin','gagné'), tOreil=mot('03-fin',"l'oreiller"), tPas=mot('03-fin','cailloux');
  const tKg=mot('04-commentaire','kilogrammes'), tPl2=mot('04-commentaire','plumes'), tRep=mot('04-commentaire','Réponds');
  const tMa=mot('00-accroche','Ma'), finTitre=mot('00-accroche','Le')-.08, HAUT=105, SOL=560, PV={x:528,y:265,L:250};
  /* les deux sacs : les plumes (à gauche, gros), les cailloux (à droite, petit) ; 1 kg chacun */
  const SP={x0:250,y0:SOL}, SC={x0:806,y0:SOL};

  function sacPlumes(c,x,yBas,s,z){ if(z<=0) return; const k=Math.min(1.15,z)*s;
    sacCraie(c,x,yBas,250*k,250*k,1,'#f8f9fa');
    for(const [dx,a] of [[-46,-.5],[0,0],[46,.5]]){ c.save(); c.translate(x+dx*k,yBas-275*k); c.rotate(a); plumeCraie(c,0,0,95*k); c.restore(); }
    ecrire(c,'1 kg',x,yBas-105*k,58*k,'#212529'); }
  function sacCailloux(c,x,yBas,s,z){ if(z<=0) return; const k=Math.min(1.15,z)*s;
    sacCraie(c,x,yBas,175*k,155*k,1,'#adb5bd');
    for(const [dx,dy,rr] of [[-32,-172,23],[8,-181,19],[40,-170,17]]) caillouCraie(c,x+dx*k,yBas+dy*k,rr*k);
    ecrire(c,'1 kg',x,yBas-66*k,54*k,'#212529'); }
  /* l'oreiller de plumes : (x, y) = le centre */
  function oreillerCraie(c,x,y,s,z){ if(z<=0) return; const k=Math.min(1.15,z)*s, w=300*k, h=150*k;
    c.fillStyle='#e7f5ff'; c.strokeStyle='#74c0fc'; c.lineWidth=6*k; c.lineJoin='round'; c.beginPath();
    c.moveTo(x-w/2,y-h/2); c.quadraticCurveTo(x,y-h/2-28*k,x+w/2,y-h/2); c.quadraticCurveTo(x+w/2+24*k,y,x+w/2,y+h/2);
    c.quadraticCurveTo(x,y+h/2+28*k,x-w/2,y+h/2); c.quadraticCurveTo(x-w/2-24*k,y,x-w/2,y-h/2); c.closePath(); c.fill(); c.stroke();
    plumeCraie(c,x+w/2-10*k,y-h/2-20*k,80*k); plumeCraie(c,x-w/2+30*k,y-h/2-10*k,70*k); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2 kg de plumes, combien de grammes ? */
      if(T>=tKg){ const z=zoom(T,tKg,.4); sacPlumes(c,260,600,1,z); sacPlumes(c,520,600,1,zoom(T,tKg+.25,.4)); }
      if(T>=tPl2){ const z=zoom(T,tPl2,.4); ecrire(c,'2 kg',840,300,80*z,CRAIE.blanc); ecrire(c,'= ? g',840,420,80*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf&&T>=tOreil-.15){ /* la fin : pari gagné, l'oreiller de plumes, les cailloux par terre */
      if(T>=tGagne) ecrire(c,'pari gagné !',528,HAUT,70*zoom(T,tGagne,.4),CRAIE.ok);
      if(T>=tOreil){ oreillerCraie(c,330,420,1.25,zoom(T,tOreil,.4)); ecrire(c,'zzz',330,250,56*zoom(T,tOreil+.3,.4),CRAIE.blanc); }
      if(T>=tPas){ const z=zoom(T,tPas,.4); for(const [dx,rr] of [[-62,48],[14,40],[78,34]]) caillouCraie(c,800+dx,560,rr*Math.min(1.15,z));
        if(z>0){ c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.beginPath(); c.moveTo(690,460); c.lineTo(910,640); c.moveTo(910,460); c.lineTo(690,640); c.stroke(); } }
      tab.maj(); return; }
    /* la balance (à niveau : 1 kg contre 1 kg, elle reste en équilibre) */
    const haut=T>=pari?balanceCraie(c,PV.x,PV.y,PV.L,0,zoom(T,pari,.4)):null;
    const u=doux(entreM(T,tPose,tBal+.4));
    const place=(S,cote)=>{ if(!haut) return {x:S.x0,y:S.y0}; const p=haut[cote];
      return {x:S.x0+(p.x-S.x0)*u,y:S.y0+(p.y-S.y0)*u-Math.sin(u*Math.PI)*90}; };
    const s=haut?1-.2*u:1, p1=place(SP,'g'), p2=place(SC,'d');
    if(T>=tPlumes) sacPlumes(c,p1.x,p1.y,s,zoom(T,tPlumes,.4));
    if(T>=tCail) sacCailloux(c,p2.x,p2.y,s,zoom(T,tCail,.4));
    if(T<pari){
      if(T>=tCail+.6) ecrire(c,'?',528,HAUT+40,110*zoom(T,tCail+.6,.4),CRAIE.jaune);
    } else if(T<q){
      if(T>=tDit&&T<tPose) ecrire(c,'les cailloux !',528,HAUT,64*zoom(T,tDit,.4),CRAIE.faux);
      if(T>=tBal+.5) ecrire(c,'?',PV.x,HAUT,110*zoom(T,tBal+.5,.4),CRAIE.jaune);
    } else if(T>=ouf){ /* après la réponse : la balance reste à niveau, et le pari est gagné */
      ecrire(c,'1 kg = 1 kg',PV.x,HAUT,64,CRAIE.ok);
      if(T>=tGagne) ecrire(c,'pari gagné !',215,600,54*zoom(T,tGagne,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-pari'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tMa-.08,330,66,a0('Salut !')),
    groupe(tMa-.08,finTitre,330,60,a0('Ma copine et moi,'),a0('on fait un pari.')),
    ...suiteDe(pari,60,60,[a0('Le plus lourd :')],
      [a0('1 kilogramme de plumes,'),a0('ou 1 kilogramme de cailloux ?')]),
    ...suiteDe(q,60,62,[a1('Elle dit : les cailloux,'),a1("c'est sûr !")],[a1('Je pose les deux sacs'),a1('sur la balance…')]),
    ...suiteDe(com,60,62,[a3('Pari gagné !')],[a3("Mais je dors sur l'oreiller"),a3('de plumes,')],[a3('pas sur les cailloux.')]),
    ...suiteDe(f,60,58,[a4('À toi : combien de grammes'),a4('dans 2 kilogrammes de plumes ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Que fait la balance ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("1 kilogramme, c'est 1 kilogramme !"), r2=rd('Le sac de plumes est juste plus gros.');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<text x="165" y="110" font-family="Segoe UI" font-weight="800" font-size="44" fill="#f8f9fa" text-anchor="middle">1 kg plumes</text>`+
    `<text x="165" y="200" font-family="Segoe UI" font-weight="800" font-size="44" fill="#ffd43b" text-anchor="middle">1 kg cailloux</text></svg>`;
  poserMiniature(outils,acc+1,'Plumes ou<br>cailloux ?'+PARI,mini);
  return { clips,FIN,titre:'Plumes ou cailloux ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,pari,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['elle reste en équilibre',tq('A'),tq('reste')],['les cailloux descendent',tq('B'),tq('cailloux')],
        ['les plumes descendent',tq('C'),tq('plumes')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<pari) g.montre();
      else if(T<tPose) g.oups();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tOreil?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
