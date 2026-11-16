/* ============================================================
   Série Masse CP — ÉPISODE 01 : GROS, DONC LOURD ? Outils : films/cp-commun.js + cp-masse.js.
   Le copain de Ti Margo prend son élan pour porter le gros ballon de plage… et le soulève d'un doigt.
   Question : le gros ballon ou la petite bille en fer, qui est le plus lourd ? La bille (A). Ceinture blanche.
   Commentaire : une pomme, une plume, une pastèque, du plus léger au plus lourd.
   ============================================================ */
FILMS['lexique']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':8.37,'01-surprise':4.15,'02-question':15.36,'02b-reponse':5.6,'03-fin':2.33,'04-commentaire':9.24,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-surprise':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sur,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tBal=mot('00-accroche','ballon'), tElan=mot('00-accroche','élan'),
        tSoul=mot('00-accroche','soulève'), tDoigt=mot('00-accroche','doigt');
  const tGros=mot('01-surprise','gros'), tLeger=mot('01-surprise','léger'), tPlein=mot('01-surprise','plein');
  const tFin=mot('03-fin','Gros'), tLourd=mot('03-fin','lourd');
  const tPom=mot('04-commentaire','pomme'), tPlu=mot('04-commentaire','plume'), tPas=mot('04-commentaire','pastèque'),
        tRange=mot('04-commentaire','Range-les'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, XR=860;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : la pomme, la plume, la pastèque */
      if(T>=tPom){ pommeCraie(c,190,400,90,zoom(T,tPom,.4)); ecrire(c,'pomme',190,560,56*zoom(T,tPom,.4),CRAIE.blanc); }
      if(T>=tPlu){ plumeCraie(c,520,400,230,zoom(T,tPlu,.4)); ecrire(c,'plume',520,560,56*zoom(T,tPlu,.4),CRAIE.blanc); }
      if(T>=tPas){ pastequeCraie(c,850,400,280,190,zoom(T,tPas,.4)); ecrire(c,'pastèque',850,560,56*zoom(T,tPas,.4),CRAIE.blanc); }
      if(T>=tRange){ const u=zoom(T,tRange,.4); ecrire(c,'léger',150,140,54*u,CRAIE.r0);
        c.strokeStyle=CRAIE.jaune; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(290,140); c.lineTo(760,140);
        c.lineTo(725,115); c.moveTo(760,140); c.lineTo(725,165); c.stroke(); ecrire(c,'lourd',900,140,54*u,CRAIE.ret); }
      tab.maj(); return; }
    if(T>=ouf){ /* la balance : le ballon monte, la bille descend */
      const a=.3*doux(entreM(T,ouf+.1,ouf+1.1)), haut=balanceCraie(c,360,250,210,a,1);
      ballonCraie(c,haut.g.x,haut.g.y-82,80,1); billeCraie(c,haut.d.x,haut.d.y-28,28,1);
      if(T>=tFin) ecrire(c,'gros',XR+50,230,64*zoom(T,tFin,.4),CRAIE.blanc);
      if(T>=tFin+.25) ecrire(c,'≠',XR+50,340,80*zoom(T,tFin+.25,.4),CRAIE.faux);
      if(T>=tLourd) ecrire(c,'lourd',XR+50,450,64*zoom(T,tLourd,.4),CRAIE.ret);
      tab.maj(); return; }
    /* l'histoire : le gros ballon, l'élan, un seul doigt */
    if(T>=tBal){ const hop=T>=tSoul?Math.min(1,doux(entreM(T,tSoul,tSoul+.8))):0;
      const y=470-hop*190; ballonCraie(c,330,y,170,zoom(T,tBal,.4));
      if(T>=tDoigt){ c.strokeStyle=CRAIE.jaune; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(330,y+175); c.lineTo(330,y+300); c.stroke();
        ecrire(c,"d'un doigt !",330,665,52*zoom(T,tDoigt,.4),CRAIE.jaune); } }
    if(T<sur){
      if(T>=tElan) ecrire(c,'hop… hop…',XR,250,60*zoom(T,tElan,.4),CRAIE.gris);
    } else if(T<q){
      if(T>=tGros) ecrire(c,'gros',XR,190,72*zoom(T,tGros,.4),CRAIE.blanc);
      if(T>=tLeger) ecrire(c,'léger',XR,320,72*zoom(T,tLeger,.4),CRAIE.r0);
      if(T>=tPlein){ ecrire(c,"plein d'air",XR,450,52*zoom(T,tPlein,.4),CRAIE.gris);
        c.strokeStyle=CRAIE.r0; c.lineWidth=4; for(const [u,v,rr] of [[700,560,18],[780,600,12],[860,570,22],[950,610,14]]){ c.beginPath(); c.arc(u,v,rr,0,7); c.stroke(); } }
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-surprise'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(sur,60,60,[a0('Mon copain veut porter'),a0('le gros ballon de plage.')],[a0('Il prend son élan…')],
      [a0('et il le soulève'),a0("d'un doigt !")]),
    ...suiteDe(q,60,62,[a1('Le ballon est gros,'),a1('mais il est léger :')],[a1("il est plein d'air.")]),
    ...suiteDe(com,60,66,[a3('Gros ne veut pas'),a3('dire lourd !')]),
    ...suiteDe(f,60,60,[a4('À toi : une pomme,'),a4('une plume, une pastèque.')],[a4('Range-les du plus léger'),a4('au plus lourd.')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Le gros ballon, ou la petite bille en fer :'),qd('qui est le plus lourd ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Petite, mais en fer :'), r2=rd('la bille est plus lourde.');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<circle cx="110" cy="125" r="72" fill="#f8f9fa"/><path d="M110 125 L110 53 A72 72 0 0 1 172 89 Z" fill="#ff6b6b"/><path d="M110 125 L172 161 A72 72 0 0 1 110 197 Z" fill="#ffd43b"/><path d="M110 125 L48 161 A72 72 0 0 1 48 89 Z" fill="#4dabf7"/>`+
    `<circle cx="235" cy="170" r="20" fill="#868e96" stroke="#343a40" stroke-width="3"/><circle cx="228" cy="163" r="6" fill="#f8f9fa"/>`+
    `<text x="272" y="100" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le gros ballon<br>ou la bille :<br>le plus lourd ?'+PARI,mini);
  return { clips,FIN,titre:'Gros, donc lourd ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sur,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['la bille en fer',tq('A'),tq('bille',2)],["c'est pareil",tq('B'),tq('pareil')],['le gros ballon',tq('C'),tq('ballon',2)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<sur){ T<tSoul?g.montre():g.oups(); }
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com) g.montre();
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
