/* ============================================================
   Série Longueurs CE2 — ÉPISODE 06 : LE MUR MESURÉ À LA QUEUE. Outils : films/ce2-commun.js + ce2-longueur.js.
   Pas de règle : Ti Margo mesure son mur avec sa queue de 10 cm, 10 fois. Pfiou !
   Question : 10 fois 10 cm, combien mesure le mur ? (C, 1 mètre). Ceinture jaune.
   Commentaire : environ combien mesure la hauteur d'une porte ?
   ============================================================ */
FILMS['estimer']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':7.96,'01-oups':8.29,'02-question':15.33,'02b-reponse':5.71,'03-ouf':5.6,'04-commentaire':6.5,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tComb=mot('00-accroche','Combien'), tMur=mot('00-accroche','mur'), tRegle=mot('00-accroche','règle'), tQueue=mot('00-accroche','queue');
  const t10=mot('01-oups','10'), tUne=mot('01-oups','une'), tDeux=mot('01-oups','deux'), t10f=mot('01-oups','10',3), tPf=mot('01-oups','Pfiou');
  const tGrand=mot('03-ouf','grand'), tEnv=mot('03-ouf','environ');
  const tHaut=mot('04-commentaire','hauteur'), tPorte=mot('04-commentaire','porte'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tComb-.08, M0=90, PAS=80, YM=140, HM=200;
  const mur=c=>murCraie(c,M0,YM,10*PAS,HM);

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : la hauteur d'une porte */
      if(T>=tHaut) ecrire(c,'environ ?',760,200,80*zoom(T,tHaut,.4),CRAIE.jaune);
      if(T>=tPorte){ porteCraie(c,240,620,190,440,zoom(T,tPorte,.4)); c.strokeStyle=CRAIE.jaune; c.lineWidth=5; c.beginPath(); c.moveTo(480,180); c.lineTo(480,620); c.stroke();
        ecrire(c,'? m',650,400,110*zoom(T,tPorte,.4),CRAIE.blanc); }
      tab.maj(); return; }
    if(T>=tMur) mur(c);
    if(T<uni){
      if(T>=tComb&&T>=tMur) ecrire(c,'? cm',M0+5*PAS,YM+HM/2,96*zoom(T,tMur,.4),CRAIE.jaune);
      if(T>=tRegle){ regleH(c,140,420,30,10,1,false); c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.beginPath(); c.moveTo(120,400); c.lineTo(480,520); c.stroke(); }
      if(T>=tQueue) queueCraie(c,600,920,470,entreL(T,tQueue,tQueue+.6));
    } else if(T<q){ /* la queue posée bout à bout : 1, 2… 10 fois */
      if(T>=t10){ queueCraie(c,M0,M0+PAS,YM+HM+50,1); ecrire(c,'10 cm',M0+PAS/2,YM+HM+110,40,CRAIE.ok); }
      const n=T<tUne?0:(T<tDeux?1:(T<t10f?2+Math.floor(7*entreL(T,tDeux+.4,t10f)):10));
      for(let k=0;k<n;k++){ c.strokeStyle=k%2?CRAIE.jaune:CRAIE.ok; c.lineWidth=10; c.beginPath(); c.moveTo(M0+k*PAS+6,YM-20); c.lineTo(M0+(k+1)*PAS-6,YM-20); c.stroke();
        ecrire(c,String(k+1),M0+k*PAS+PAS/2,YM-58,34,CRAIE.blanc); }
      if(T>=t10f) ecrire(c,'10 fois !',760,YM+HM+110,80*zoom(T,t10f,.4),CRAIE.jaune);
      if(T>=tPf) ecrire(c,'Pfiou !',330,560,70*zoom(T,tPf,.4),CRAIE.gris);
    } else { /* ouf : un grand pas, environ 1 m */
      if(T>=tGrand){ coteH(c,M0,M0+10*PAS,YM+HM+70,'',CRAIE.ok); ecrire(c,'un grand pas',528,YM+HM+150,64*zoom(T,tGrand,.4),CRAIE.blanc); }
      if(T>=tEnv) ecrire(c,'environ 1 m',528,YM+HM+240,80*zoom(T,tEnv,.4),CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Combien mesure mon mur ?')],[a0('Pas de règle…')],[a0('Je le mesure avec ma queue !')]),
    ...suiteDe(q,60,62,[a1('Ma queue fait 10 centimètres.')],[a1('Je la pose une fois,'),a1('deux fois…')],[a1('10 fois. Pfiou !')]),
    ...suiteDe(com,60,62,[a3('La prochaine fois,'),a3('je demande à un enfant :')],[a3('un grand pas,'),a3('environ 1 mètre !')]),
    ...suiteDe(f,60,60,[a4('À toi : environ combien mesure'),a4("la hauteur d'une porte ?")],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('10 fois ma queue de 10 centimètres :'),qd('combien mesure le mur ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('10 × 10,'), r2=rd('100 centimètres :'), r3=rd('1 mètre.');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="40" width="270" height="90" fill="#c0603a"/>`+
    `<path d="M40 170 Q 90 150 140 172 Q 150 180 165 172" stroke="#69db7c" stroke-width="18" fill="none" stroke-linecap="round"/>`+
    `<text x="238" y="194" font-family="Segoe UI" font-weight="800" font-size="50" fill="#ffd43b" text-anchor="middle">×10</text></svg>`;
  poserMiniature(outils,acc+1,'Un mur mesuré<br>à la queue ?'+PARI,mini);
  return { clips,FIN,titre:'Le mur mesuré à la queue',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10 centimètres',tq('A'),tq('10',5)],['20 centimètres',tq('B'),tq('20')],['1 mètre',tq('C'),tq('1')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tRegle?g.reflechit():(T<tQueue?g.oups():g.fier()); }
      else if(T<q){ T<tPf?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.montre(); }
      else if(T<com){ T<tEnv?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
