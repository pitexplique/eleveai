/* ============================================================
   Série Périmètre CM2 — ÉPISODE 04 : LE TRAIN DE BISCUITS. Outils : films/cm2-commun.js + cm2-perimetre.js.
   Ti Margo colle 4 biscuits carrés de 10 cm en ligne et met un ruban tout autour. Il calcule :
   1 biscuit = 40 cm, 4 biscuits = 40 × 4 = 160 cm… faux ! Le ruban ne passe pas entre les biscuits :
   40 + 40 + 10 + 10 = 100 cm (A). Il garde 60 cm de ruban : un nœud papillon.
   Commentaire : 3 biscuits carrés de 10 cm collés en ligne, combien de ruban tout autour ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le train en haut à gauche (Ti Margo cache le bas du milieu), le texte à droite.
   À l'échelle : 120 px pour 10 cm, dans toutes les images. */
const BS=120, BX0=100, BY0=200, BXR=850;
const BISC='#e8b56a', BISC_B='#a0612b';
/* Un biscuit carré (coin haut-gauche x, y), qui grossit depuis son centre quand z va de 0 à 1 */
function biscuit(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.15,z), s=BS*k, d=(BS-s)/2;
  c.fillStyle=BISC; c.strokeStyle=BISC_B; c.lineWidth=5; c.beginPath(); c.roundRect(x+d,y+d,s,s,10*k); c.fill(); c.stroke();
  c.fillStyle=BISC_B; for(let i=0;i<3;i++) for(let j=0;j<3;j++){ c.beginPath(); c.arc(x+d+s*(.25+.25*i),y+d+s*(.25+.25*j),4*k,0,7); c.fill(); } }
/* Les biscuits d'un train de n : u = 0 écartés (30 px), u = 1 collés ; x0 = le bord gauche une fois collés */
function trainX(n,x0,u){ const ec=30*(1-Math.max(0,Math.min(1,u))), mil=x0+n*BS/2, L=n*BS+(n-1)*ec;
  return Array.from({length:n},(_,k)=>mil-L/2+k*(BS+ec)); }
/* Les roues du train, sous chaque biscuit */
function roues(c,xs,y,z=1){ if(z<=0) return; xs.forEach(x=>[x+BS*.26,x+BS*.74].forEach(rx=>{
  c.fillStyle='#495057'; c.strokeStyle='#212529'; c.lineWidth=4; c.beginPath(); c.arc(rx,y+16,13*Math.min(1.2,z),0,7); c.fill(); c.stroke(); })); }
/* Le contour d'un rectangle (sommets dans le sens des aiguilles depuis le haut-gauche) */
const rectPts=(x,y,w,h)=>[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];
/* Un segment tracé de u = 0 à 1 */
function trait(c,a,b,u,coul=TOUR,lw=14){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round';
  c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u); c.stroke(); }
/* Une ligne de mots centrée en x : chaque morceau paraît à son instant (le mot dit) */
function bLigne(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* Le nœud papillon orange (centre x, y) */
function noeud(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.2,z);
  c.fillStyle=TOUR; c.strokeStyle='#d9480f'; c.lineWidth=6; c.lineJoin='round';
  for(const s of [-1,1]){ c.beginPath(); c.moveTo(x,y); c.lineTo(x+s*95*k,y-58*k); c.quadraticCurveTo(x+s*118*k,y,x+s*95*k,y+58*k); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.roundRect(x-22*k,y-28*k,44*k,56*k,12*k); c.fill(); c.stroke(); }

FILMS['polygone']=function(outils){
  const DUR={'00-accroche':11.17,'01-calcul':10.38,'02-question':15.59,'02b-reponse':16.86,'03-ouf':5.83,'04-commentaire':10.89,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* Les instants : « 4 biscuits », « 10 centimètres »… ont deux marques (le nombre, puis le mot) */
  const tJe=mot('00-accroche','Je'), tColle=mot('00-accroche','colle'), tLigne=mot('00-accroche','ligne'), tTrain=mot('00-accroche','train'),
        tRuban=mot('00-accroche','ruban'), tAutour=mot('00-accroche','autour'), tSoeur=mot('00-accroche','sœur');
  const tUn=mot('01-calcul','Un'), tBisc=mot('01-calcul','biscuit'), tC4=mot('01-calcul','4'), tCde=mot('01-calcul','de'), tC10=mot('01-calcul','10'),
        tC40=mot('01-calcul','40'), tC40cm=mot('01-calcul','centimètres',2), tC4b=mot('01-calcul','4',3), tC4bis=mot('01-calcul','biscuits',2),
        tC40f=mot('01-calcul','40',3), tCfois=mot('01-calcul','fois',2), tCx4=mot('01-calcul','4',5), tC160=mot('01-calcul','160'),
        tC160cm=mot('01-calcul','centimètres',5);
  const tA=mot('02b-reponse','A'), tHaut=mot('02b-reponse','haut'), tH40=mot('02b-reponse','40'), tBas=mot('02b-reponse','bas'),
        tB40=mot('02b-reponse','40',2), tE10=mot('02b-reponse','Et'), tBout=mot('02b-reponse','bout'),
        tS40=mot('02b-reponse','40',3), tSp1=mot('02b-reponse','plus',2), tS40b=mot('02b-reponse','40',5),
        tSp2=mot('02b-reponse','plus',3), tS10=mot('02b-reponse','10',3), tSp3=mot('02b-reponse','plus',4), tS10b=mot('02b-reponse','10',4),
        tS100=mot('02b-reponse','100'), tS100cm=mot('02b-reponse','centimètres',2);
  const oGarde=mot('03-ouf','gardé'), o60=mot('03-ouf','60'), o60cm=mot('03-ouf','centimètres',2), oNoeud=mot('03-ouf','nœud');
  const t3=mot('04-commentaire','3'), tD10=mot('04-commentaire','10'), tD10cm=mot('04-commentaire','centimètres',2),
        tColles=mot('04-commentaire','collés'), tComb=mot('04-commentaire','Combien'), tDRuban=mot('04-commentaire','ruban'),
        tDAutour=mot('04-commentaire','autour'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, finR=mot('02b-reponse','En')-.08;
  /* le train collé : 4 biscuits, 400 × 100 px ; son contour */
  const XS=trainX(4,BX0,1), W4=4*BS, R4=rectPts(BX0,BY0,W4,BS);
  const BAS=BY0+BS;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 3 biscuits de 10 cm, collés en ligne ; le ruban tout autour, sa longueur à trouver */
      const x0=BX0+60, u=T<tColles?0:Math.min(1,(T-tColles)/.5), xs=trainX(3,x0,u);
      if(T>=t3) xs.forEach((x,k)=>biscuit(c,x,BY0,zoom(T,t3+k*.12,.3)));
      bLigne(c,T,[['10',tD10],['cm',tD10cm]],xs[0]+BS/2,BY0-48,50,CRAIE.jaune);
      if(T>=tDRuban) tourPoly(c,rectPts(x0,BY0,3*BS,BS),(T-tDRuban)/((tDAutour+.4)-tDRuban),TOUR,14);
      if(T>=tComb) ecrire(c,'?',BXR,330,220*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }

    if(T<cal){ /* les 4 biscuits ; collés en ligne : un train ; le ruban tout autour */
      const u=T<tColle?0:Math.min(1,(T-tColle)/((tLigne+.3)-tColle)), xs=trainX(4,BX0,u);
      if(T>=tTrain) roues(c,xs,BAS,zoom(T,tTrain,.4));
      xs.forEach(x=>biscuit(c,x,BY0));
      ecrire(c,'10 cm',xs[0]+BS/2,BY0-48,50,CRAIE.jaune);
      if(T>=tRuban) tourPoly(c,R4,(T-tRuban)/((tAutour+.4)-tRuban),TOUR,14);
      ecrire(c,'4 biscuits',BXR,200,62,CRAIE.blanc);
      ecrire(c,'de 10 cm',BXR,285,62,CRAIE.jaune);
      if(T>=tTrain) ecrire(c,'un train !',BXR,400,58*zoom(T,tTrain,.4),BISC);
      tab.maj(); return; }

    roues(c,XS,BAS); XS.forEach(x=>biscuit(c,x,BY0));
    if(T<r){ /* son calcul : le tour de chaque biscuit, l'un après l'autre (les côtés collés comptés deux fois) */
      const tb=k=>k?tC4bis+(k-1)*.25:tBisc, dur=k=>k?.5:(tC4+.3-tBisc);
      XS.forEach((x,k)=>{ if(T>=tb(k)) tourPoly(c,rectPts(x+11,BY0+11,BS-22,BS-22),(T-tb(k))/dur(k),CRAIE.jaune,7); });
      if(T>=tC40) ecrire(c,'40',XS[0]+BS/2,BAS+66,46*zoom(T,tC40,.4),CRAIE.blanc);
      if(T>=tC40f) for(let k=1;k<4;k++) ecrire(c,'40',XS[k]+BS/2,BAS+66,46*zoom(T,tC40f,.4),CRAIE.blanc);
      bLigne(c,T,[['1 biscuit',tBisc]],BXR,130,56,CRAIE.blanc);
      bLigne(c,T,[['4',tC4],['×',tCde],['10',tC10]],BXR,210,62,CRAIE.jaune);
      bLigne(c,T,[['=',tC40],['40',tC40],['cm',tC40cm]],BXR,290,62,CRAIE.jaune);
      bLigne(c,T,[['4 biscuits',tC4bis]],BXR,400,56,CRAIE.blanc);
      bLigne(c,T,[['40',tC40f],['×',tCfois],['4',tCx4]],BXR,480,62,CRAIE.faux);
      bLigne(c,T,[['=',tC160],['160',tC160],['cm ?',tC160cm]],BXR,560,62,CRAIE.faux);
      tab.maj(); return; }

    /* la réponse : le ruban en haut, en bas, et à chaque bout ; 40 + 40 + 10 + 10 = 100 cm */
    const [p0,p1,p2,p3]=R4;
    if(T<ouf){
      if(T>=finR){ /* entre les biscuits : pas de ruban */
        for(let k=1;k<4;k++){ const x=XS[k]; c.strokeStyle=CRAIE.faux; c.lineWidth=7; c.lineCap='round'; c.beginPath();
          c.moveTo(x-14,BY0+BS/2-14); c.lineTo(x+14,BY0+BS/2+14); c.moveTo(x-14,BY0+BS/2+14); c.lineTo(x+14,BY0+BS/2-14); c.stroke(); } }
      trait(c,p0,p1,(T-tHaut)/.6); trait(c,p3,p2,(T-tBas)/.6);
      if(T>=tE10){ trait(c,p0,p3,(T-tE10)/.4); trait(c,p1,p2,(T-tE10)/.4); }
    } else tourPoly(c,R4,1,TOUR,14);
    if(T>=tH40) ecrire(c,'40',BX0+W4/2,BY0-48,56*zoom(T,tH40,.4),CRAIE.jaune);
    if(T>=tB40) ecrire(c,'40',BX0+W4/2,BAS+70,56*zoom(T,tB40,.4),CRAIE.jaune);
    if(T>=tE10){ ecrire(c,'10',BX0-50,BY0+BS/2,46*zoom(T,tE10,.4),CRAIE.jaune); ecrire(c,'10',BX0+W4+50,BY0+BS/2,46*zoom(T,tE10,.4),CRAIE.jaune); }
    if(T<ouf){
      bLigne(c,T,[['40',tS40],['+',tSp1],['40',tS40b]],BXR,410,64,CRAIE.blanc);
      bLigne(c,T,[['+',tSp2],['10',tS10],['+',tSp3],['10',tS10b]],BXR,500,64,CRAIE.blanc);
      bLigne(c,T,[['=',tS100],['100',tS100],['cm',tS100cm]],BXR,610,72,CRAIE.ok);
      if(T>=tS100cm+.3) coche(c,BX0+W4/2-70,540,.7);
    } else { /* il garde 60 cm de ruban : un nœud papillon */
      ecrire(c,'= 100 cm',BXR,170,72,CRAIE.ok);
      if(T>=oGarde) ecrire(c,'gardé :',BXR,410,62*zoom(T,oGarde,.4),TOUR);
      bLigne(c,T,[['60',o60],['cm',o60cm]],BXR,500,72,TOUR);
      if(T>=oNoeud) noeud(c,BX0+W4/2,520,zoom(T,oNoeud,.4));
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0("J'ai 4 biscuits carrés"),a0('de 10 centimètres.'));
  const s0=suiteDe(cal,60,62,[a0('Je les colle en ligne :'),a0('un train de biscuits !')],[a0('Je mets un ruban'),a0('tout autour,'),a0("pour l'offrir à ma sœur.")]);
  const c1=a1('Un biscuit : 4 côtés de 10,'), c2=a1('40 centimètres.'), c3=a1('4 biscuits : 40 × 4,'), c4=a1('160 centimètres de ruban ?');
  c3[3][4]=tCfois; /* le signe « × » paraît quand la voix dit « fois » */
  const s1=suiteDe(q,60,62,[c1,c2],[c3,c4]);
  qd('Question !');
  const phraseQ=[qd('Combien de ruban'),qd('autour du train'),qd('de biscuits ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le ruban ne passe pas'), r2=rd('entre les biscuits.');
  const b1=rd('En haut, 40.'), b2=rd('En bas, 40.'), b3=rd('Et 10 à chaque bout.'), b4=rd('40 + 40, + 10, + 10 :'), b5=rd('100 centimètres.');
  b4[3][1]=tSp1;
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[b1,b2],[b3],[b4,b5]),
    ...suiteDe(com,60,62,[a3("J'ai gardé 60 centimètres"),a3('de ruban…')],[a3("Je m'en fais"),a3('un nœud papillon !')]),
    ...suiteDe(f,60,60,[a4('À toi : 3 biscuits carrés'),a4('de 10 centimètres,'),a4('collés en ligne.')],
      [a4('Combien de centimètres'),a4('de ruban tout autour ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix, mot à mot : « cm » paraît quand la voix dit « centimètres » */
  const motsChoix=[]; const lab=(...ms)=>ms.map(([w,t])=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="cw${k}">${w}</span>`; }).join(' ');
  const choixA=lab(['100',qm('100')],['cm',qm('centimètres',2)]),
        choixB=lab(['160',qm('160')],['cm',qm('centimètres',5)]),
        choixC=lab(['40',qm('40')],['cm',qm('centimètres',7)]);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.vw${k}) .cw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [0,1,2,3].map(k=>`<rect x="${30+k*44}" y="80" width="44" height="44" rx="5" fill="${BISC}" stroke="${BISC_B}" stroke-width="3"/>`).join('')+
    `<rect x="30" y="80" width="176" height="44" fill="none" stroke="#ff922b" stroke-width="8" stroke-linejoin="round"/>`+
    [0,1,2,3].map(k=>`<circle cx="${41+k*44}" cy="134" r="6" fill="#495057"/><circle cx="${63+k*44}" cy="134" r="6" fill="#495057"/>`).join('')+
    `<text x="270" y="170" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'4 biscuits :<br>160 cm de ruban ?'+PARI,mini);
  return { clips,FIN,titre:'Le train de biscuits',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cal,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('100')],[choixB,tq('B'),tq('160')],[choixC,tq('C'),tq('40')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('vw'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cal){ T<tRuban?g.montre():(T<tSoeur?g.ouvre():g.fier()); }
      else if(T<q){ T<tC160?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.oups(); }
      else if(T<ouf){ T<tS100?g.montre():g.fier(); }
      else if(T<com){ T<oNoeud?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
