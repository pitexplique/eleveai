/* ============================================================
   Série Volume 5e — ÉPISODE 06 : LE CHÂTEAU DE SABLE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Un bloc de 40 dm³, une tour de 10 dm³ posée dessus. Le frère multiplie : 40 × 10 = 400.
   Réponse A : on empile, donc on additionne : 40 + 10 = 50 dm³. Il a rapporté 350 dm³ de trop : tout un village !
   Commentaire : un bloc de 60 dm³ et deux tours de 12 dm³.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le château à DROITE (Ti Margo cache le bas du milieu-gauche), les calculs à gauche */
const CS_U=72, CS_X=570, CS_Y=560, CS_XG=290;
const CS_SABLE={face:'#e9c46a',dessus:'#f4d58d',cote:'#d4a24c',bord:'#8a5a2b'};
const CS_TOUR={face:'#f4a261',dessus:'#f8c49a',cote:'#e07a3a',bord:'#8a4a1b'};
/* Un point d'un pavé en cavalière (comme pvPave) : (x, y) = coin bas-gauche de la face avant ; (a, b, h) en unités */
const csPt=(x,y,a,b,h,u)=>[x+a*u+PV_DX*b*u,y-h*u+PV_DY*b*u];
/* Le petit drapeau rouge planté au point (x, y) */
function csDrapeau(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.2,z); c.strokeStyle='#5c3a1e'; c.lineWidth=6; c.lineCap='round';
  c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-70*k); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.moveTo(x,y-70*k); c.lineTo(x+46*k,y-56*k); c.lineTo(x,y-42*k); c.closePath(); c.fill(); }
/* Le château : le bloc 5 × 4 × 2 (40), la tour 2,5 × 2 × 2 (10) posée au milieu ; zb, zt = zooms ; dy = la tour qui tombe */
function csChateau(c,x,y,u,zb,zt,dy=0,lw=6){
  pvPave(c,x,y,5,4,2,u,{...CS_SABLE,lw,z:zb});
  if(zt>0){ const [tx,ty]=csPt(x,y,1.25,1,2,u); pvPave(c,tx,ty-dy,2.5,2,2,u,{...CS_TOUR,lw,z:zt});
    if(u>40){ const [fx,fy]=csPt(x,y,2.5,2,4,u); csDrapeau(c,fx,fy-dy,zt); } } }
/* Le seau du frère */
function csSeau(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.2,z), w=100*k, h=90*k;
  pgPoly(c,[[x-w/2,y-h/2],[x+w/2,y-h/2],[x+w*.38,y+h/2],[x-w*.38,y+h/2]],'#4dabf7','#1864ab',6);
  c.strokeStyle='#1864ab'; c.lineWidth=6; c.beginPath(); c.arc(x,y-h/2,w*.42,Math.PI,0); c.stroke(); }

FILMS['volume-assemblage']=function(outils){
  fusionnerNombres();  /* « 400 », « 350 » : une seule marque par nombre */
  const DUR={'00-accroche':10.26,'01-frere':8.21,'02-question':15.29,'02b-reponse':8.00,'03-ouf':6.12,'04-commentaire':10.63,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'01-frere':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,fre,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tChateau=mot('00-accroche','château'), tBloc=mot('00-accroche','bloc'), t40=mot('00-accroche','40'),
        tDessus=mot('00-accroche','Au-dessus'), tTour=mot('00-accroche','tour'), t10=mot('00-accroche','10');
  const t40f=mot('01-frere','40'), tFoisF=mot('01-frere','fois',2), t10f=mot('01-frere','10'), t400=mot('01-frere','400'),
        tChercher=mot('01-frere','chercher'), t400b=mot('01-frere','400',2);
  const tA=mot('02b-reponse','A'), tEmpile=mot('02b-reponse','empile'), t40r=mot('02b-reponse','40'),
        tPlusR=mot('02b-reponse','plus',2), t10r=mot('02b-reponse','10'), t50=mot('02b-reponse','50');
  const t350=mot('03-ouf','350'), tTrop=mot('03-ouf','trop'), tVillage=mot('03-ouf','village');
  const tBloc4=mot('04-commentaire','bloc'), t60=mot('04-commentaire','60'), tTours=mot('04-commentaire','tours'),
        t12=mot('04-commentaire','12'), tQuel=mot('04-commentaire','Quel'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','En')-.08, finR=t40r-.08;
  const zz=(T,t)=>T>=t?(T<t+.5?zoom(T,t,.3):1):0;
  /* les centres des faces avant : le bloc, la tour */
  const BX=CS_X+5*CS_U/2, BY=CS_Y-CS_U, [TX0,TY0]=csPt(CS_X,CS_Y,1.25,1,2,CS_U), TX=TX0+1.25*CS_U, TY=TY0-CS_U;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un bloc de 60 dm³ (6 × 4 × 2,5) et deux tours de 12 dm³ (2,4 × 2 × 2,5) */
      const u=60, x=CS_X-10, y=CS_Y;
      pvPave(c,x,y,6,4,2.5,u,{...CS_SABLE,lw:6,z:zz(T,tBloc4)});
      for(const a of [0.4,3.2]){ const [tx,ty]=csPt(x,y,a,1,2.5,u); pvPave(c,tx,ty,2.4,2,2.5,u,{...CS_TOUR,lw:6,z:zz(T,tTours)});
        const [fx,fy]=csPt(x,y,a+1.2,2,5,u); csDrapeau(c,fx,fy,zz(T,tTours));
        if(T>=t12) pgEtiquette(c,'12 dm³',tx+1.2*u,ty-1.25*u,34*zoom(T,t12,.4),CRAIE.blanc); }
      if(T>=t60) pgEtiquette(c,'60 dm³',x+3*u,y-1.25*u,46*zoom(T,t60,.4),CRAIE.blanc);
      if(T>=tQuel) ecrire(c,'? dm³',CS_XG,200,96*zoom(T,tQuel,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* le château ; la tour tombe du ciel au « Au-dessus » ; au « village », trois petits châteaux en bas */
    const chute=T<tDessus?0:Math.max(0,1-(T-tDessus)/.5), dy=180*chute*chute;
    csChateau(c,CS_X,CS_Y,CS_U,zz(T,tBloc),T>=tDessus?1:0,dy);
    if(T>=t40&&T<ouf) pgEtiquette(c,'40 dm³',BX,BY,50*zoom(T,t40,.4),CRAIE.blanc);
    if(T>=t10&&T<ouf) pgEtiquette(c,'10 dm³',TX,TY,40*zoom(T,t10,.4),CRAIE.blanc);
    if(T>=tVillage) for(let k=0;k<3;k++) csChateau(c,590+k*148,700,20,zz(T,tVillage+k*.15),zz(T,tVillage+k*.15+.1),0,4);

    /* le frère : 40 × 10 = 400 (faux), puis son seau */
    if(T>=t40f&&T<q) pgLigne(c,T,[['40',t40f],['× 10',t10f],['= 400',t400]],CS_XG,120,62,PENCHE5);
    if(T>=tChercher&&T<q){ csSeau(c,CS_XG-170,290,zoom(T,tChercher,.4)); if(T>=t400b) ecrire(c,'400 dm³',CS_XG+40,290,60*zoom(T,t400b,.4),PENCHE5); }
    if(T<q){ tab.maj(); return; }

    /* après la carte : 40 + 10 = 50 dm³ ; le 400 du frère, barré ; puis les 350 de trop */
    pgLigne(c,T,[['40',finR+.1],['+ 10',t10r],['= 50 dm³',t50]],CS_XG,120,58,CRAIE.ok);
    pgLigne(c,T,[['40 × 10 = 400',finR+.1]],CS_XG,240,52,PENCHE5);
    { c.strokeStyle=PENCHE5; c.lineWidth=7; const u=Math.min(1,Math.max(0,(T-finR-.4)/.4)); if(u>0){
      c.beginPath(); c.moveTo(CS_XG-185,252); c.lineTo(CS_XG-185+370*u,228); c.stroke(); } }
    if(T>=t350) ecrire(c,'350 dm³',CS_XG,350,62*zoom(T,t350,.3),CRAIE.jaune);
    if(T>=tTrop) ecrire(c,'de trop !',CS_XG,440,58*zoom(T,tTrop,.3),CRAIE.jaune);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-frere'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je construis'),a0('un château de sable.'));
  const s0=suiteDe(fre,60,62,[a0('En bas, un bloc'),a0('de 40 décimètres cubes.')],[a0('Au-dessus, une tour'),a0('de 10 décimètres cubes.')]);
  const m1=a1('Mon frère dit :'), f1=a1('40 × 10, 400 !'); f1[3][1]=tFoisF; /* le « × » paraît quand la voix dit « fois » */
  const s1=suiteDe(q,60,62,[m1,f1],[a1('Il part chercher'),a1('400 décimètres cubes de sable…')]);
  qd('Question !');
  const phraseQ=[qd('Quel est le volume'),qd('du château ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('On empile, donc on additionne :');
  const f2=rd('40 + 10,'); f2[3][1]=tPlusR;
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[f2,rd('50 décimètres cubes.')]),
    ...suiteDe(com,60,62,[a3('Il a rapporté'),a3('350 décimètres cubes de trop…')],[a3('on construit'),a3('tout un village !')]),
    ...suiteDe(f,60,60,[a4('À toi : un bloc'),a4('de 60 décimètres cubes')],[a4('et deux tours'),a4('de 12 décimètres cubes.')],
      [a4('Quel est le volume'),a4('du château ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « dm » (« décimètres »), puis « ³ » (« cubes ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="csw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('dm',qm('décimètres',k))}${sp('³',qm('cubes',k))}`;
  const choixA=choixDe('50',1), choixB=choixDe('400',2), choixC=choixDe('4',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.csv${k}) .csw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="150" width="150" height="60" fill="${CS_SABLE.face}" stroke="${CS_SABLE.bord}" stroke-width="5"/>`+
    `<path d="M40 150 L70 128 L220 128 L190 150 Z" fill="${CS_SABLE.dessus}" stroke="${CS_SABLE.bord}" stroke-width="5" stroke-linejoin="round"/>`+
    `<path d="M190 150 L220 128 L220 188 L190 210 Z" fill="${CS_SABLE.cote}" stroke="${CS_SABLE.bord}" stroke-width="5" stroke-linejoin="round"/>`+
    `<rect x="95" y="70" width="60" height="70" fill="${CS_TOUR.face}" stroke="${CS_TOUR.bord}" stroke-width="5"/>`+
    `<path d="M125 70 L125 30 L150 38 L125 46" fill="#e03131" stroke="#5c3a1e" stroke-width="4"/>`+
    `<text x="272" y="110" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quel volume<br>pour mon château ?'+PARI,mini);
  return { clips,FIN,titre:'Le château de sable',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,fre,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('50')],[choixB,tq('B'),tq('400')],[choixC,tq('C'),tq('4')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('csv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<fre){ T<tTour?g.montre():g.fier(); }
      else if(T<q){ T<tChercher?g.reflechit():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t50?g.montre():g.fier(); }
      else if(T<com){ T<tVillage?g.oups():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
