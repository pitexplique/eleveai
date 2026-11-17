/* ============================================================
   Série Masse CE1 — ÉPISODE 02 : 1 KG DE BILLES CONTRE 1 000 G. Outils : films/ce1-commun.js + ce1-masse.js.
   La copine a un sac de 1 kg de billes, Ti Margo un sac de 1 000 g : « 1 000, c'est plus que 1 : j'ai gagné ! ».
   Sur la balance : elle reste en équilibre (A), car 1 kg = 1 000 g. Égalité : on joue aux billes ensemble.
   Commentaire : combien de sacs de 250 g pour faire 1 kg ?
   ⛔ « 1 000 » s'écrit avec une espace insécable dans les textes de voixDe (un seul jeton).
   ============================================================ */
FILMS['relation']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':10.48,'01-balance':2.96,'02-question':13.3,'02b-reponse':7.12,'03-fin':4.25,'04-commentaire':7.71,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-balance':1.2,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tCop=mot('00-accroche','copine'), tSac=mot('00-accroche','sac'), tMoi=mot('00-accroche','Moi'),
        tPlus=mot('00-accroche','plus'), tGagne=mot('00-accroche','gagné');
  const tPose=mot('01-balance','pose'), tBal=mot('01-balance','balance');
  const tEga=mot('03-fin','Égalité'), tJoue=mot('03-fin','joue');
  const tSacs=mot('04-commentaire','sacs'), tFaire=mot('04-commentaire','faire'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tCop-.08, HAUT=105, SOL=560, PV={x:528,y:215,L:250}, NBSP=' ';
  const BL='#4dabf7', RO='#f783ac';
  /* les deux sacs : la copine (à gauche, 1 kg), Ti Margo (à droite, 1 000 g) */
  const S1={x0:250,y0:SOL,coul:'#e599f7',et:'1 kg'}, S2={x0:806,y0:SOL,coul:'#74c0fc',et:'1 000 g'};
  const BILLES=['#ff6b6b','#ffd43b','#51cf66','#4dabf7','#cc5de8'];

  function sacBilles(c,x,yBas,s,z,S){ if(z<=0) return; const k=Math.min(1.15,z)*s;
    sacCraie(c,x,yBas,190*k,220*k,1,S.coul);
    for(let i=0;i<5;i++){ c.fillStyle=BILLES[i]; c.strokeStyle='#343a40'; c.lineWidth=2.5; c.beginPath();
      c.arc(x+(-48+24*i)*k,yBas-220*k-14*k-(i%2)*14*k,15*k,0,7); c.fill(); c.stroke(); }
    c.font=`800 ${Math.round(52*k)}px "Segoe UI"`; const fs=52*k*Math.min(1,150*k/c.measureText(S.et).width); /* le texte tient dans le sac */
    ecrire(c,S.et,x,yBas-95*k,fs,'#212529'); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : des sacs de 250 g pour faire 1 kg ? */
      if(T>=tSacs){ for(let k=0;k<2;k++){ const z=zoom(T,tSacs+.25*k,.4); if(z<=0) continue;
          sacCraie(c,200+k*220,500,170*Math.min(1.15,z),200*Math.min(1.15,z),1,'#ffe066'); ecrire(c,'250 g',200+k*220,420,44*Math.min(1.15,z),'#212529'); }
        if(T>=tSacs+.6) ecrire(c,'…',640,440,90,CRAIE.blanc); }
      if(T>=tFaire){ ecrire(c,'= 1 kg ?',850,440,72*zoom(T,tFaire,.4),CRAIE.jaune); ecrire(c,'combien de sacs ?',528,HAUT,60*zoom(T,tFaire,.4),CRAIE.jaune); }
      tab.maj(); return; }
    /* la balance (à niveau : elle reste en équilibre) */
    const haut=T>=bal?balanceCraie(c,PV.x,PV.y,PV.L,0,zoom(T,bal,.4)):null;
    const u=doux(entreM(T,tPose,tBal+.4));
    const place=(S,cote)=>{ if(!haut) return {x:S.x0,y:S.y0}; const p=haut[cote];
      return {x:S.x0+(p.x-S.x0)*u,y:S.y0+(p.y-S.y0)*u-Math.sin(u*Math.PI)*90}; };
    const s=haut?1-.22*u:1, p1=place(S1,'g'), p2=place(S2,'d');
    if(T>=tSac) sacBilles(c,p1.x,p1.y,s,zoom(T,tSac,.4),S1);
    if(T>=tMoi) sacBilles(c,p2.x,p2.y,s,zoom(T,tMoi,.4),S2);
    if(T<bal){
      if(T>=tPlus) ecrire(c,'1 000 > 1 ?',528,HAUT,66*zoom(T,tPlus,.4),CRAIE.faux);
      if(T>=tGagne) ecrire(c,"j'ai gagné ?",528,300,54*zoom(T,tGagne,.4),CRAIE.jaune);
    } else if(T<q){
      if(T>=tBal+.5) ecrire(c,'?',PV.x,HAUT,110*zoom(T,tBal+.5,.4),CRAIE.jaune);
    } else if(T>=ouf){
      ecrire(c,'1 kg = 1 000 g',PV.x,HAUT,62,CRAIE.ok);
      if(T>=tEga) ecrire(c,'égalité !',250,480,62*zoom(T,tEga,.4),CRAIE.ok);
      if(T>=tJoue) for(let i=0;i<10;i++){ const z=zoom(T,tJoue+.06*i,.3); if(z<=0) continue; c.fillStyle=BILLES[i%5]; c.strokeStyle='#343a40'; c.lineWidth=2.5;
        c.beginPath(); c.arc(600+(i%5)*85,640+Math.floor(i/5)*50,20*Math.min(1.15,z),0,7); c.fill(); c.stroke(); }
    }
    tab.maj();
  }

  const N=x=>x.replaceAll('1 000','1'+NBSP+'000');
  const a0=dit('00-accroche'), a1=dit('01-balance'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(bal,60,60,[a0('Ma copine a un sac'),a0('de 1 kilogramme de billes.')],[a0(N("Moi, j'ai 1 000 grammes."))],
      [a0(N("1 000, c'est plus que 1 :")),a0("j'ai gagné !")]),
    ...suiteDe(q,60,62,[a1('On pose les deux sacs'),a1('sur la balance…')]),
    ...suiteDe(com,60,64,[a3('Égalité !')],[a3('Bon… on joue aux billes'),a3('ensemble ?')]),
    ...suiteDe(f,60,58,[a4('À toi : combien de sacs'),a4('de 250 grammes')],[a4('pour faire 1 kilogramme ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Que fait la balance ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd(N("1 kilogramme, c'est 1 000 grammes.")), r2=rd('Même masse : équilibre !');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<text x="165" y="110" font-family="Segoe UI" font-weight="800" font-size="58" fill="#ff8787" text-anchor="middle">1 000 g</text>`+
    `<text x="165" y="200" font-family="Segoe UI" font-weight="800" font-size="58" fill="#ffd43b" text-anchor="middle">ou 1 kg ?</text></svg>`;
  poserMiniature(outils,acc+1,'1 000 g contre<br>1 kg ?'+PARI,mini);
  return { clips,FIN,titre:'1 000 grammes contre 1 kilogramme ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bal,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['elle reste en équilibre',tq('A'),tq('reste')],['mon sac descend',tq('B'),tq('mon')],['son sac descend',tq('C'),tq('son')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tGagne) g.montre();
      else if(T<bal) g.fier();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tJoue?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
