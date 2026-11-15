/* ============================================================
   Série Aire 5e — ÉPISODE 04 : LA PANCARTE MAISON (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-aire.js.
   Une pancarte en forme de maison : un carré de 4 dm, un toit en triangle (base 4 dm, hauteur 3 dm), peint en rouge.
   Réponse C : 4 × 4 = 16 ; 4 × 3 = 12, ÷ 2 = 6 ; en tout 22 dm². 28, c'était le toit sans diviser par 2.
   Commentaire : un carré de 5 dm et un toit de base 5 dm, de hauteur 4 dm.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la maison à DROITE (Ti Margo cache le bas du milieu-gauche), les calculs à gauche */
const PM_U=80, PM_X=600, PM_Y=300, PM_XG=290;
const PM_MUR='#e9c46a', PM_MUR_B='#8a5a2b', PM_TOIT='#d6b98c', PM_ROUGE='#e03131', PM_ROUGE_B='#7c1d1d';
/* La maison : carré de c dm (coin haut-gauche x, y), toit de hauteur h dm ; z = zoom ; rouge = toit peint */
function pmMaison(c,x,y,cote,h,u,zMur,zToit,rouge){
  if(zMur>0) pgPoly(c,[[x,y],[x+cote*u,y],[x+cote*u,y+cote*u],[x,y+cote*u]],PM_MUR,PM_MUR_B,8,zMur);
  if(zToit>0) pgPoly(c,[[x,y],[x+cote*u,y],[x+cote*u/2,y-h*u]],rouge?PM_ROUGE:PM_TOIT,rouge?PM_ROUGE_B:PM_MUR_B,8,zToit); }

FILMS['composer']=function(outils){
  const DUR={'00-accroche':8.40,'01-toit':7.24,'02-question':15.28,'02b-reponse':12.48,'03-ouf':6.84,'04-commentaire':12.10,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMaison=mot('00-accroche','maison'), tCarre=mot('00-accroche','carré'), t4dm=mot('00-accroche','décimètres'),
        tTriangle=mot('00-accroche','triangle');
  const tBase=mot('01-toit','base'), tBase4=mot('01-toit','décimètres'), tHaut=mot('01-toit','hauteur'),
        t3dm=mot('01-toit','décimètres',2), tRouge=mot('01-toit','rouge');
  const tC=mot('02b-reponse','C'), tFois1=mot('02b-reponse','fois',2), t16=mot('02b-reponse','16'),
        tFois2=mot('02b-reponse','fois',4), t6=mot('02b-reponse','6'), tTout=mot('02b-reponse','tout'), t22=mot('02b-reponse','carrés');
  const tSans=mot('03-ouf','sans'), tTrop=mot('03-ouf','trop');
  const tCarre4=mot('04-commentaire','carré'), t5=mot('04-commentaire','décimètres'), tToit4=mot('04-commentaire','toit'),
        t5b=mot('04-commentaire','décimètres',2), t4=mot('04-commentaire','décimètres',3),
        tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tCarre-.08, finR=mot('02b-reponse','divisé')-.08;
  const C4=4*PM_U, AX=PM_X+C4/2, AY=PM_Y-3*PM_U;

  function maison(c,T){
    pmMaison(c,PM_X,PM_Y,4,3,PM_U,T>=tCarre?(T<tCarre+.5?zoom(T,tCarre,.3):1):0,
      T>=tTriangle?(T<tTriangle+.5?zoom(T,tTriangle,.3):1):0,T>=tRouge);
    if(T>=t4dm) ecrire(c,'4 dm',AX,PM_Y+C4+44,54*zoom(T,t4dm,.4),BASE5);
    pgTrait(c,PM_X,PM_Y,PM_X+C4,PM_Y,(T-tBase)/.5,BASE5,10);
    pgTrait(c,AX,AY,AX,PM_Y,(T-tHaut)/.6,HAUT5,8,[18,12]);
    if(T>=tHaut+.4){ c.strokeStyle=HAUT5; c.lineWidth=5; c.strokeRect(AX,PM_Y-26,26,26); }
    if(T>=t3dm) pgEtiquette(c,'3 dm',AX+150,(AY+PM_Y)/2,52*zoom(T,t3dm,.4),HAUT5); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : carré de 5 dm, toit de base 5 dm et de hauteur 4 dm (48 px par dm) */
      const u=64, x=PM_X, y=320, cx=x+5*u/2;
      pmMaison(c,x,y,5,4,u,T>=tCarre4?(T<tCarre4+.5?zoom(T,tCarre4,.3):1):0,T>=tToit4?(T<tToit4+.5?zoom(T,tToit4,.3):1):0,true);
      if(T>=t5) ecrire(c,'5 dm',cx,y+5*u+44,54*zoom(T,t5,.4),BASE5);
      pgTrait(c,cx,y-4*u,cx,y,(T-t5b)/.6,HAUT5,8,[18,12]);
      if(T>=t4) pgEtiquette(c,'4 dm',cx+150,y-2*u,52*zoom(T,t4,.4),HAUT5);
      if(T>=tQuelle) ecrire(c,'? dm²',PM_XG,200,96*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    maison(c,T);
    if(T<q){ tab.maj(); return; }

    /* après la carte : 16 dans le carré, 6 dans le toit, 22 dm² en tout ; puis le 28 qui oubliait ÷ 2 */
    pgEtiquette(c,'16 dm²',AX,PM_Y+C4/2,52,CRAIE.jaune);
    if(T>=t6) pgEtiquette(c,'6 dm²',AX,PM_Y-70,46*zoom(T,t6,.4),CRAIE.jaune);
    pgLigne(c,T,[['12',finR+.1],['÷ 2',finR+.5],['= 6',t6]],PM_XG,120,62,CRAIE.blanc);
    pgLigne(c,T,[['16 + 6',tTout],['= 22 dm²',t22]],PM_XG,230,62,CRAIE.ok);
    if(T>=ouf){ pgLigne(c,T,[['16 + 12',ouf+.1],['= 28',ouf+.3]],PM_XG,350,58,PENCHE5);
      if(T>=tSans){ c.strokeStyle=PENCHE5; c.lineWidth=8; const u=Math.min(1,(T-tSans)/.4);
        c.beginPath(); c.moveTo(PM_XG-190,365); c.lineTo(PM_XG-190+380*u,335); c.stroke(); }
      if(T>=tTrop) ecrire(c,'trop !',PM_XG,440,58*zoom(T,tTrop,.3),PENCHE5); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-toit'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je fabrique une pancarte'),a0('en forme de maison.'));
  const s0=suiteDe(dis,60,62,[a0('Un carré de 4 décimètres'),a0('de côté,')],[a0('et un toit en triangle.')]);
  const s1=suiteDe(q,60,62,[a1('Le toit a une base'),a1('de 4 décimètres')],[a1('et une hauteur'),a1('de 3 décimètres.')],
    [a1('Je le peins en rouge.')]);
  qd('Question !');
  const phraseQ=[qd("Quelle est l'aire"),qd('de toute la pancarte ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le carré : 4 × 4, 16.'), r2=rd('Le toit : 4 × 3, 12,');
  r1[3][4]=tFois1; r2[3][4]=tFois2; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('divisé par 2, 6.')],[rd('En tout :'),rd('22 décimètres carrés.')]),
    ...suiteDe(com,60,62,[a3("28, c'était le toit"),a3('sans diviser par 2.')],[a3("J'aurais acheté"),a3('trop de peinture !')]),
    ...suiteDe(f,60,60,[a4('À toi : un carré'),a4('de 5 décimètres')],[a4('et un toit de base'),a4('5 décimètres,')],
      [a4('de hauteur 4 décimètres.')],[a4("Quelle est l'aire"),a4('de la pancarte ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « dm » (« décimètres »), puis « ² » (« carrés ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="pmw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('dm',qm('décimètres',k))}${sp('²',qm('carrés',k))}`;
  const choixA=choixDe('28',1), choixB=choixDe('16',2), choixC=choixDe('22',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.pmv${k}) .pmw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="60" y="120" width="110" height="110" fill="${PM_MUR}" stroke="${PM_MUR_B}" stroke-width="6"/>`+
    `<path d="M60 120 L170 120 L115 40 Z" fill="${PM_ROUGE}" stroke="${PM_ROUGE_B}" stroke-width="6" stroke-linejoin="round"/>`+
    `<text x="250" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quelle aire<br>pour ma pancarte ?'+PARI,mini);
  return { clips,FIN,titre:'La pancarte maison',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('28')],[choixB,tq('B'),tq('16')],[choixC,tq('C'),tq('22')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('pmv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis){ T<tTriangle?g.montre():g.ouvre(); }
      else if(T<q){ T<tRouge?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t22?g.montre():g.fier(); }
      else if(T<com){ T<tTrop?g.oups():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
