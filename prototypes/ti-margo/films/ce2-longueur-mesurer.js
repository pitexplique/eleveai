/* ============================================================
   Série Longueurs CE2 — ÉPISODE 03 : LA BANANE MAL POSÉE. Outils : films/ce2-commun.js + ce2-longueur.js.
   Ti Margo mesure sa banane : le bout tombe sur le 12, « 12 cm ! » Oups : elle commençait sur le 2.
   Question : du 2 au 12, combien ? (B, 10 cm). Ceinture blanche.
   Commentaire : un crayon du 0 au 9, combien mesure-t-il ?
   ============================================================ */
FILMS['mesurer']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':8.12,'01-oups':5.28,'02-question':16.48,'02b-reponse':7.0,'03-ouf':5.23,'04-commentaire':8.56,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tBan=mot('00-accroche','banane'), tBout=mot('00-accroche','bout'), t12=mot('00-accroche','12'),
        t12cm=mot('00-accroche','12',2);
  const tCom=mot('01-oups','commençait'), t2=mot('01-oups','2'), t0=mot('01-oups','0');
  const tPose=mot('03-ouf','pose'), tO0=mot('03-ouf','0'), tMiam=mot('03-ouf','Miam');
  const tCray=mot('04-commentaire','crayon'), t9=mot('04-commentaire','9'), tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, X0=110, PAS=60, YR=300, YB=280;
  const xr=k=>X0+k*PAS;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : un crayon du 0 au 9 */
      regleH(c,X0,YR,PAS,14,1);
      if(T>=tCray){ const z=Math.min(1,zoom(T,tCray,.4)); c.globalAlpha=z; c.fillStyle='#ffd43b'; c.fillRect(xr(0),YB-40,xr(9)-xr(0)-40,36);
        c.fillStyle='#f4a259'; c.beginPath(); c.moveTo(xr(9)-40,YB-40); c.lineTo(xr(9),YB-22); c.lineTo(xr(9)-40,YB-4); c.fill(); c.globalAlpha=1; }
      if(T>=t9) cercle(c,xr(9),YR+52,30,CRAIE.jaune,entreL(T,t9,t9+.3));
      if(T>=tComb) ecrire(c,'? cm',528,520,96*zoom(T,tComb,.4),CRAIE.jaune);
      tab.maj(); return; }
    regleH(c,X0,YR,PAS,14,T>=tBan?1:0);
    const debut=T>=ouf&&T>=tPose?2-2*entreL(T,tPose,tPose+.8):2;
    if(T>=tBan) bananeCraie(c,xr(debut),xr(debut+10),YB,zoom(T,tBan,.4));
    if(T<uni){
      if(T>=t12) cercle(c,xr(12),YR+52,30,CRAIE.faux,entreL(T,t12,t12+.3));
      if(T>=t12cm) ecrire(c,'12 cm ?',528,520,96*zoom(T,t12cm,.4),CRAIE.faux);
    } else if(T<q){
      cercle(c,xr(12),YR+52,30,CRAIE.faux,1);
      if(T>=t2) cercle(c,xr(2),YR+52,30,CRAIE.jaune,entreL(T,t2,t2+.3));
      if(T>=t0){ cercle(c,xr(0),YR+52,30,CRAIE.ok,entreL(T,t0,t0+.3)); ecrire(c,'pas sur le 0 !',528,520,80*zoom(T,t0,.4),CRAIE.faux); }
      else if(T>=tCom) ecrire(c,'elle commence où ?',528,520,64*zoom(T,tCom,.4),CRAIE.gris);
    } else { /* ouf : posée sur le 0 */
      if(T>=tO0) cercle(c,xr(0),YR+52,30,CRAIE.ok,entreL(T,tO0,tO0+.3));
      if(T>=tO0) ecrire(c,'du 0 au 10 : 10 cm',528,520,70*zoom(T,tO0,.4),CRAIE.ok);
      if(T>=tMiam) ecrire(c,'Miam !',840,130,72*zoom(T,tMiam,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Je mesure ma banane.')],[a0('Le bout tombe sur le 12 :')],
      [a0('ma banane fait'),a0('12 centimètres !')]),
    ...suiteDe(q,60,62,[a1('Oups !')],[a1('Ma banane commençait'),a1('sur le 2, pas sur le 0.')]),
    ...suiteDe(com,60,62,[a3('La prochaine fois,'),a3('je pose le bout sur le 0.')],[a3('Miam !')]),
    ...suiteDe(f,60,60,[a4('À toi : un crayon va'),a4('du 0 au 9 sur la règle.')],[a4('Combien mesure-t-il ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Ma banane va du 2 au 12.'),qd('Combien mesure-t-elle ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('12 − 2, 10.'), r2=rd('Ma banane mesure'), r3=rd('10 centimètres.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M70 120 Q 175 175 290 120 Q 175 140 70 120 Z" fill="#ffe066" stroke="#e67700" stroke-width="4"/>`+
    `<rect x="24" y="160" width="290" height="50" fill="#fab005"/>`+
    `<text x="80" y="205" font-family="Segoe UI" font-weight="800" font-size="30" fill="#3b2a00" text-anchor="middle">2</text>`+
    `<text x="290" y="205" font-family="Segoe UI" font-weight="800" font-size="30" fill="#3b2a00" text-anchor="middle">12</text>`+
    `<text x="165" y="80" font-family="Segoe UI" font-weight="800" font-size="64" fill="#ff8787" text-anchor="middle">12 cm ?</text></svg>`;
  poserMiniature(outils,acc+1,'Ma banane :<br>12 cm ?'+PARI,mini);
  return { clips,FIN,titre:'La banane mal posée',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['12 cm',tq('A'),tq('12',2)],['10 cm',tq('B'),tq('10')],['14 cm',tq('C'),tq('14')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<t12cm?g.montre():g.fier(); }
      else if(T<q){ T<tCom?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.montre(); }
      else if(T<com){ T<tMiam?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
