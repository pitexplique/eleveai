/* ============================================================
   Série Longueurs CM1 — ÉPISODE 04 : LA RÈGLE CASSÉE. Outils : films/cm1-commun.js + cm1-longueur.js.
   Ma règle cassée commence au 4 ; mon crayon va du 4 au 10 : « 10 centimètres ! »
   Mais il ne commence pas au 0 : la fin moins le début, 10 − 4 = 6 cm (C).
   Commentaire : une gomme va du 3 au 8 sur la règle. Combien mesure-t-elle ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; la règle en haut, à l'échelle (80 px par cm) ; le texte en bas à gauche
   (Ti Margo cache le bas de l'ardoise, sous sa tête) */

/* Une gomme à la craie, couchée sur la règle : de x1 à x2, le bas sur la ligne y */
function gommeCraie(c,x1,x2,y,z=1){ if(z<=0) return; const k=Math.min(1.12,z), h=66, w=x2-x1;
  c.save(); c.translate((x1+x2)/2,y); c.scale(1,k); c.translate(-(x1+x2)/2,-y);
  c.lineWidth=4; c.strokeStyle='#f8f9fa';
  c.fillStyle='#ffc9c9'; c.beginPath(); c.roundRect(x1,y-h,w,h,10); c.fill();
  c.fillStyle='#4dabf7'; c.fillRect(x1+w*.38,y-h,w*.62,h);
  c.beginPath(); c.roundRect(x1,y-h,w,h,10); c.stroke();
  c.restore(); }

FILMS['mesurer']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':9.84,'01-unite':3.81,'02-question':14.38,'02b-reponse':7.89,'03-ouf':2.81,'04-commentaire':8.46,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 10 centimètres » a deux marques : la 1re = « dix », la 2e = « centimètres » ; nombre + unité s'écrit à la 2e */
  const tJe=mot('00-accroche','Je'), tCrayon=mot('00-accroche','crayon'), t4=mot('00-accroche','4',2), t10=mot('00-accroche','10'),
        t10cm=mot('00-accroche','centimètres',2);
  const tAtt=mot('01-unite','attends'), t0=mot('01-unite','0');
  const tC=mot('02b-reponse','C'), tMoins=mot('02b-reponse','moins',3);
  const tRecol=mot('03-ouf','recoller');
  const tGomme=mot('04-commentaire','gomme'), t3=mot('04-commentaire','3'), t8=mot('04-commentaire','8'),
        tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08;
  /* La règle cassée : X(v) = 60 + 80 v ; elle commence au 4 (x = 380) et va jusqu'au 11 */
  const PAS=80, X0=60, RY=330, XN=v=>X0+v*PAS, YN=RY+64, CRY=RY-34, TX=240, TY=575;

  function regleCassee(c){ return regleCraie(c,XN(4),RY,7,PAS,{debut:4,casse:true}); }
  function crayon(c,z=1){ crayonCraie(c,XN(4),CRY,XN(10)-XN(4),z); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une gomme du 3 au 8, sur une règle entière */
      if(T>=tGomme){ const z=zoom(T,tGomme,.4), X=regleCraie(c,110,RY,10,PAS,{z}); gommeCraie(c,X(3),X(8),RY-6,z);
        if(T>=t3) cercle(c,X(3),YN,36,CRAIE.jaune,(T-t3)/.3);
        if(T>=t8) cercle(c,X(8),YN,36,CRAIE.jaune,(T-t8)/.3); }
      if(T>=tCombien) ecrire(c,'? cm',TX,TY,100*zoom(T,tCombien,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* la règle cassée, le crayon du 4 au 10, « 10 cm ! » */
      regleCassee(c);
      if(T>=tCrayon) crayon(c,zoom(T,tCrayon,.4));
      if(T>=t4) cercle(c,XN(4),YN,36,CRAIE.jaune,(T-t4)/.3);
      if(T>=t10) cercle(c,XN(10),YN,36,CRAIE.jaune,(T-t10)/.3);
      if(T>=t10cm) ecrire(c,'10 cm !',TX,TY,96*zoom(T,t10cm,.4),CRAIE.faux);
      if(T>=t0){ /* le morceau qui manque : le 0 est là, pas sur ma règle */
        c.setLineDash([14,12]); c.strokeStyle=CRAIE.faux; c.lineWidth=5; c.strokeRect(XN(0)-38,RY,XN(4)-XN(0)+10,86); c.setLineDash([]);
        ecrire(c,'0',XN(0)+6,YN,48*zoom(T,t0,.5),CRAIE.faux); }
    } else { /* la réponse : la fin moins le début, 10 − 4 = 6 cm ; puis je recolle ma règle */
      if(T>=tRecol){ const u=Math.min(1,(T-tRecol)/.6), dx=-420*(1-u);
        regleCraie(c,XN(0)+dx,RY,4,PAS,{fs:.01}); ecrire(c,'0',XN(0)+dx,YN+2,34,TRAIT_R); }
      regleCassee(c); crayon(c);
      cercle(c,XN(4),YN,36,CRAIE.jaune); cercle(c,XN(10),YN,36,CRAIE.jaune);
      flecheLongueur(c,XN(4),XN(10),230,CRAIE.ok,1);
      ecrire(c,'6 cm',XN(7),165,84*zoom(T,ouf,.5),CRAIE.ok);
      coche(c,XN(7)+170,175,.45);
      ecrire(c,'10 − 4 = 6',TX+40,TY,80,CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-unite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Ma règle est cassée :'),a0('elle commence au 4 !')),
    ...suiteDe(uni,60,60,[a0('Je mesure mon crayon :'),a0('il va du 4 au 10.')],[a0('Il mesure'),a0('10 centimètres !')]),
    ...suiteDe(q,60,62,[a1('Mais attends… mon crayon'),a1('ne commence pas au 0 !')]),
    ...suiteDe(com,60,62,[a3('Bon… je vais recoller'),a3('ma règle !')]),
    ...suiteDe(f,60,60,[a4('À toi : une gomme va'),a4('du 3 au 8 sur la règle.')],[a4('Combien mesure-t-elle ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien mesure vraiment'),qd('mon crayon ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('La fin moins le début :'), r2=rd('10 − 4 = 6.'), r3=rd('Mon crayon mesure'), r4=rd('6 centimètres.');
  r2[3][1]=tMoins; /* le signe « − » paraît quand la voix dit « moins » */

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M40 140 L226 140 L226 190 L40 190 L48 176 L34 165 L46 152 Z" fill="#fde68a" stroke="#b45309" stroke-width="4"/>`+
    [0,1,2,3,4].map(i=>`<line x1="${56+i*34}" y1="140" x2="${56+i*34}" y2="160" stroke="#1f2937" stroke-width="3"/><text x="${56+i*34}" y="184" font-family="Segoe UI" font-weight="800" font-size="20" fill="#1f2937" text-anchor="middle">${4+i}</text>`).join('')+
    `<rect x="56" y="108" width="150" height="24" fill="#fab005" stroke="#f8f9fa" stroke-width="3"/><rect x="56" y="108" width="16" height="24" fill="#ff8787"/>`+
    `<path d="M206 108 L226 120 L206 132 Z" fill="#f4d6a0"/>`+
    `<text x="285" y="200" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Du 4 au 10 :<br>combien de cm ?'+PARI,mini);
  return { clips,FIN,titre:'La règle cassée',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10 cm',tq('A'),tq('10')],['14 cm',tq('B'),tq('14')],['6 cm',tq('C'),tq('6')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.oups();
      else if(T<uni){ T<t10cm?g.montre():g.fier(); }
      else if(T<q){ T<tAtt+.3?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tRecol?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
