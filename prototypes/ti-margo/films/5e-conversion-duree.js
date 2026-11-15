/* ============================================================
   Série Conversions 5e — ÉPISODE 02 : LE FILM TROP LONG (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-conversion.js.
   Un film de 100 minutes qui commence à 20 heures. Ti Margo croit que 100 minutes = 1 heure pile : fin à 21 heures.
   Réponse A : une heure, c'est 60 minutes ; 100 − 60 = 40 ; 1 heure 40 minutes. À 21 heures, la télé s'éteint : la fin ratée.
   Commentaire : un film de 145 minutes, combien d'heures et de minutes ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la pellicule en haut à droite, l'horloge à DROITE jusqu'en bas (Ti Margo cache le bas
   du milieu-gauche), les calculs à gauche en haut */
const FM_XG=290, FM_CX=800, FM_CY=405, FM_R=158;
const FM_TOUR1='#4dabf7', FM_TOUR2='#ffa94d', FM_RATE='#ff6b6b';
/* Une pellicule (coin haut-gauche x, y), percée en haut et en bas, zoomée de z */
function fmPellicule(c,x,y,w,h,coul,z=1){ if(z<=0) return; const k=Math.min(1.15,z), W=w*k, H=h*k, X=x+(w-W)/2, Y=y+(h-H)/2;
  c.fillStyle=coul; c.fillRect(X,Y,W,H); c.strokeStyle='#212529'; c.lineWidth=5; c.strokeRect(X,Y,W,H);
  const t=H*.16, n=Math.max(1,Math.floor(W/34)), pas=W/n; c.fillStyle='#1f3b2c';
  for(let j=0;j<n;j++){ const xx=X+pas*(j+.5)-t/2; c.fillRect(xx,Y+t*.6,t,t); c.fillRect(xx,Y+H-t*1.6,t,t); } }
/* Un secteur de l'horloge : les minutes a0 → a1 (0 = midi), rayon r */
function fmSecteur(c,a0,a1,r,coul){ if(a1<=a0) return; const d=-Math.PI/2;
  c.fillStyle=coul; c.beginPath(); c.moveTo(FM_CX,FM_CY); c.arc(FM_CX,FM_CY,r,d+a0/60*2*Math.PI,d+a1/60*2*Math.PI); c.closePath(); c.fill(); }
/* L'horloge : `m` minutes de film depuis 20 h (1er tour en bleu, 2e tour en orange à l'intérieur), aiguilles à 20 h + `ma`
   minutes ; rate = le 2e tour en rouge (la fin ratée) */
function fmHorloge(c,m,ma,z=1,rate=false){ if(z<=0) return; c.save(); const k=Math.min(1.12,z); c.translate(FM_CX,FM_CY); c.scale(k,k); c.translate(-FM_CX,-FM_CY);
  c.fillStyle='#16302a'; c.beginPath(); c.arc(FM_CX,FM_CY,FM_R,0,7); c.fill();
  fmSecteur(c,0,Math.min(m,60),FM_R-6,'rgba(77,171,247,.75)');
  if(m>60) fmSecteur(c,0,m-60,FM_R*.6,rate?'rgba(255,107,107,.9)':'rgba(255,169,77,.9)');
  c.strokeStyle=CRAIE.blanc; c.lineCap='round';
  for(let j=0;j<12;j++){ const a=j/12*2*Math.PI, l=j%3?16:28; c.lineWidth=j%3?5:8;
    c.beginPath(); c.moveTo(FM_CX+Math.sin(a)*(FM_R-6-l),FM_CY-Math.cos(a)*(FM_R-6-l)); c.lineTo(FM_CX+Math.sin(a)*(FM_R-6),FM_CY-Math.cos(a)*(FM_R-6)); c.stroke(); }
  c.lineWidth=10; c.beginPath(); c.arc(FM_CX,FM_CY,FM_R,0,7); c.stroke();
  const am=ma/60*2*Math.PI, ah=(8+ma/60)/12*2*Math.PI;
  c.strokeStyle=CRAIE.jaune; c.lineWidth=16; c.beginPath(); c.moveTo(FM_CX,FM_CY); c.lineTo(FM_CX+Math.sin(ah)*FM_R*.5,FM_CY-Math.cos(ah)*FM_R*.5); c.stroke();
  c.strokeStyle=CRAIE.blanc; c.lineWidth=10; c.beginPath(); c.moveTo(FM_CX,FM_CY); c.lineTo(FM_CX+Math.sin(am)*FM_R*.84,FM_CY-Math.cos(am)*FM_R*.84); c.stroke();
  c.fillStyle=CRAIE.blanc; c.beginPath(); c.arc(FM_CX,FM_CY,13,0,7); c.fill(); c.restore(); }
const fmEntre=(T,a,b)=>Math.max(0,Math.min(1,(T-a)/(b-a)));

FILMS['duree']=function(outils){
  const DUR={'00-accroche':6.31,'01-calcul':5.71,'02-question':13.37,'02b-reponse':10.44,'03-ouf':4.46,'04-commentaire':8.53,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-calcul':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tFilm=mot('00-accroche','film'), t100=mot('00-accroche','100'), t20=mot('00-accroche','20');
  const t100c=mot('01-calcul','100'), tPile=mot('01-calcul','pile'), tAlors=mot('01-calcul','Alors'), t21=mot('01-calcul','21');
  const tA=mot('02b-reponse','A'), t100r=mot('02b-reponse','100'), t60r=mot('02b-reponse','60',3), t40=mot('02b-reponse','40'),
        t1h=mot('02b-reponse','1'), t40m=mot('02b-reponse','40',2);
  const t21o=mot('03-ouf','21'), tMaman=mot('03-ouf','maman'), tFin=mot('03-ouf','fin');
  const tFilm4=mot('04-commentaire','film'), t145=mot('04-commentaire','145'), tComb=mot('04-commentaire','Combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Il')-.08, finR=t100r-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un film de 145 minutes */
      fmPellicule(c,560,110,450,110,'#748ffc',T>=tFilm4?zoom(T,tFilm4,.3):0);
      if(T>=t145) pgEtiquette(c,'145 min',785,165,58*zoom(T,t145,.4),CRAIE.blanc);
      if(T>=tComb) ecrire(c,'? h ? min',FM_XG,200,84*zoom(T,tComb,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* la pellicule du film (100 minutes) et l'horloge qui part de 20 h */
    fmPellicule(c,560,70,450,96,'#748ffc',T>=tFilm?zoom(T,tFilm,.3):0);
    if(T>=t100) pgEtiquette(c,'100 min',785,118,54*zoom(T,t100,.4),CRAIE.blanc);
    if(T>=t20){
      let m=0, ma=0, rate=false;
      if(T<q){ m=ma=60*fmEntre(T,tAlors,t21); }
      else if(T<finR){ m=ma=60; }
      else if(T<ouf){ m=ma=T<t60r+.3?60*fmEntre(T,finR+.1,t60r+.3):60+40*fmEntre(T,t40-.2,t40+.7); }
      else { m=100; ma=60; rate=T>=tFin; }
      fmHorloge(c,m,ma,zoom(T,t20,.3),rate);
      let lab='20 h', coul=CRAIE.blanc, tl=t20;
      if(T>=t21&&T<q){ lab='21 h ?'; coul=CRAIE.jaune; tl=t21; }
      if(T>=finR&&T<ouf) lab='';
      if(T>=ouf){ lab=T>=t21o?'21 h':''; tl=t21o; }
      if(lab) ecrire(c,lab,FM_CX,FM_CY+FM_R+62,60*zoom(T,tl,.4),coul);
      if(T>=tFin) pgEtiquette(c,'la fin',FM_CX+52,FM_CY+18,46*zoom(T,tFin,.4),FM_RATE);
    }
    if(T<q){ /* le calcul de Ti Margo : 100 min = 1 h pile ? */
      if(T>=t100c) ecrire(c,'100 min',FM_XG,150,72*zoom(T,t100c,.4),CRAIE.blanc);
      if(T>=tPile) ecrire(c,'= 1 h pile ?',FM_XG,265,64*zoom(T,tPile,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<finR){ tab.maj(); return; }

    /* après la carte : 100 − 60 = 40 ; 1 h 40 min */
    pgLigne(c,T,[['100',finR+.1],['− 60',t60r],['= 40',t40]],FM_XG,140,66,CRAIE.blanc);
    pgLigne(c,T,[['1 h',t1h],['40 min',t40m]],FM_XG,270,74,CRAIE.ok);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Ce soir, je regarde'),a0('un film de 100 minutes.'));
  const s0=suiteDe(dis,60,62,[a0('Il commence'),a0('à 20 heures.')]);
  const s1=suiteDe(q,60,62,[a1('100 minutes,'),a1("c'est 1 heure pile ?")],[a1('Alors je finis'),a1('à 21 heures !')]);
  qd('Question !');
  const phraseQ=[qd("100 minutes, c'est…")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("Une heure, c'est 60 minutes.");
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('100 moins 60 :'),rd('il reste 40.')],[rd('1 heure 40 minutes.')]),
    ...suiteDe(com,60,62,[a3('À 21 heures,'),a3('maman éteint la télé…')],[a3("j'ai raté la fin !")]),
    ...suiteDe(f,60,60,[a4('À toi : un film'),a4('de 145 minutes.')],[a4("Combien d'heures"),a4('et de minutes ?')],
      [a4('Réponds en commentaire !')])
  ];

  /* Les choix : « 1 » paraît quand la voix le dit, puis « h » (2e marque de « 1 heure »), puis les minutes et « min »
     (2e marque de « 40 minutes ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="tpw${k}">${w}</span>`; };
  const choixA=`1 ${sp('h',qm('heure',2))} ${sp('40',qm('40'))} ${sp('min',qm('minutes',4))}`;
  const choixB=`1 ${sp('h',qm('heure',4))} ${sp('pile',qm('pile'))}`;
  const choixC=`1 ${sp('h',qm('heure',6))} ${sp('20',qm('20'))} ${sp('min',qm('minutes',6))}`;
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.tpv${k}) .tpw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<circle cx="110" cy="125" r="82" fill="#16302a" stroke="#f8f9fa" stroke-width="9"/>`+
    `<path d="M110 125 L110 49 A76 76 0 1 1 109.9 49 Z" fill="rgba(77,171,247,.75)"/>`+
    `<line x1="110" y1="125" x2="110" y2="58" stroke="#f8f9fa" stroke-width="9" stroke-linecap="round"/>`+
    `<line x1="110" y1="125" x2="75" y2="145" stroke="#ffd43b" stroke-width="12" stroke-linecap="round"/>`+
    `<text x="262" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'100 minutes,<br>c\'est 1 heure ?'+PARI,mini);
  return { clips,FIN,titre:'Le film trop long',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('1')],[choixB,tq('B'),tq('1',3)],[choixC,tq('C'),tq('1',5)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('tpv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis) g.montre();
      else if(T<q){ T<tAlors?g.reflechit():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t1h?g.montre():g.fier(); }
      else if(T<com){ T<tMaman?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
