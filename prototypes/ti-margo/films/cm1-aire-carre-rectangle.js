/* ============================================================
   Série Aire CM1 — ÉPISODE 03 : PERDU DANS LES CARREAUX. Outils : films/cm1-commun.js.
   Ti Margo compte les carreaux de sa terrasse un par un (1, 2, 3… 37, 38… perdu !).
   Sa petite sœur : regarde les rangées ! 8 rangées de 5 carreaux → 8 × 5 = 40 (B).
   Commentaire : un carré de 6 carreaux de côté, combien de carreaux ?
   ============================================================ */
/* La terrasse sur l'ardoise : 5 carreaux par rangée, 8 rangées, cases de S3 px, coin haut-gauche (X3, Y3) */
const X3=130, Y3=84, S3=72, NC=5, NR=8;
function terrasse(c,z=1){ for(let j=0;j<NR;j++) for(let i=0;i<NC;i++) carreauCraie(c,X3+i*S3,Y3+j*S3,S3,z); }
/* Le numéro du carreau k (rangée par rangée), écrit au milieu */
function numero(c,k,coul='#0b2545',z=1){ if(z<=0) return; const i=k%NC, j=Math.floor(k/NC);
  ecrire(c,String(k+1),X3+i*S3+S3/2,Y3+j*S3+S3/2+2,34*Math.min(1.3,z),coul); }

FILMS['carre-rectangle']=function(outils){
  const DUR={'00-accroche':10.66,'01-rangees':9.62,'02-question':14.15,'02b-reponse':6.65,'03-ouf':6.31,'04-commentaire':7.63,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTer=mot('00-accroche','terrasse'), t1=mot('00-accroche','1'), t2=mot('00-accroche','2'), t3=mot('00-accroche','3'),
        t37=mot('00-accroche','37'), t38=mot('00-accroche','38'), tPerdu=mot('00-accroche','perdu');
  const tRg=mot('01-rangees','rangées'), t8=mot('01-rangees','8'), t5=mot('01-rangees','5'), tChaque=mot('01-rangees','chaque'),
        tPas=mot('01-rangees','Pas');
  const tMul=mot('03-ouf','multiplie'), tDoigts=mot('03-ouf','doigts');
  const tCarre=mot('04-commentaire','carré'), t6=mot('04-commentaire','6'), tCote=mot('04-commentaire','côté'),
        tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');

  const XR=790; /* le milieu de la colonne de droite (texte) */
  /* Les rangées : un cadre jaune par rangée, posé l'une après l'autre ; leurs numéros à gauche ; les 5 cases en haut */
  function rangees(c,T,depart){ for(let j=0;j<NR;j++){ if(T<depart+j*.14) break;
      c.strokeStyle=CRAIE.jaune; c.lineWidth=6; c.strokeRect(X3-4,Y3+j*S3+3,NC*S3+8,S3-6); }
    if(T>=t8) for(let j=0;j<NR;j++) ecrire(c,String(j+1),X3-48,Y3+j*S3+S3/2+2,34*zoom(T,t8+j*.06,.4),CRAIE.jaune);
    if(T>=t5) for(let i=0;i<NC;i++) ecrire(c,String(i+1),X3+i*S3+S3/2,Y3-34,32*zoom(T,t5+i*.06,.4),CRAIE.r1); }
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un carré de 6 carreaux de côté */
      const S6=88, X6=200, Y6=96;
      if(T>=tCarre) solVide(c,X6,Y6,6,6,S6);
      if(T>=t6){ ecrire(c,'6',X6+3*S6,Y6-44,54*zoom(T,t6,.4),CRAIE.jaune); ecrire(c,'6',X6-46,Y6+3*S6,54*zoom(T,t6,.4),CRAIE.jaune); }
      if(T>=tCote){ c.strokeStyle=CRAIE.jaune; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(X6,Y6); c.lineTo(X6+6*S6*Math.min(1,(T-tCote)/.5),Y6); c.stroke(); }
      if(T>=tCombien) ecrire(c,'?',X6+3*S6,Y6+3*S6+10,220*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tTer) terrasse(c,T<t1?zoom(T,tTer,.3):1);
    if(T<ran){ /* il compte un par un, puis se perd */
      const perdu=T>=tPerdu, coul=perdu?'#c92a2a':'#0b2545';
      if(T>=t1) numero(c,0,coul,zoom(T,t1,.5)); if(T>=t2) numero(c,1,coul,zoom(T,t2,.5)); if(T>=t3) numero(c,2,coul,zoom(T,t3,.5));
      const n=T<t3+.3?0:Math.min(33,Math.floor((T-t3-.3)/(t37-.1-t3-.3)*33)); /* 4 à 36, très vite */
      for(let k=3;k<3+n;k++) numero(c,k,coul);
      if(T>=t37) numero(c,36,coul,zoom(T,t37,.5)); if(T>=t38) numero(c,37,coul,zoom(T,t38,.5));
      if(perdu) ecrire(c,'?',XR,360,240*zoom(T,tPerdu,.6),CRAIE.faux);
      tab.maj(); return; }
    rangees(c,T,T<ouf?tRg:-99);
    if(T<ouf){
      if(T>=t8) ecrire(c,'8 rangées',XR,250,66*zoom(T,t8,.4),CRAIE.jaune);
      if(T>=t5) ecrire(c,'5 carreaux',XR,350,66*zoom(T,t5,.4),CRAIE.r1);
      if(T>=tChaque) ecrire(c,'par rangée',XR,428,46,CRAIE.gris);
    } else {
      ecrire(c,'8 rangées',XR,250,66,CRAIE.jaune); ecrire(c,'5 carreaux',XR,350,66,CRAIE.r1);
      if(T>=tMul) ecrire(c,'8 × 5 = 40',XR,480,82*zoom(T,tMul,.4),CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-rangees'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,t1-.08,330,62,a0('Salut ! Je compte'),a0('les carreaux de ma terrasse,'),a0('un par un.')),
    ...suiteDe(ran,60,62,[a0('1, 2, 3…'),a0('37, 38…')],[a0('je suis perdu !')]),
    ...suiteDe(q,60,62,[a1('Ma petite sœur rigole :'),a1('regarde les rangées !')],[a1('8 rangées, et 5 carreaux'),a1('dans chaque rangée.')],
      [a1('Pas besoin de tout compter !')]),
    ...suiteDe(com,60,62,[a3('Ouf ! La prochaine fois,'),a3('je multiplie…')],[a3('et je garde mes doigts'),a3('pour le goûter.')]),
    ...suiteDe(f,60,60,[a4('À toi : un carré de'),a4('6 carreaux de côté.')],[a4('Combien de carreaux ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('8 rangées de 5 carreaux,'),qd('ça fait combien'),qd('de carreaux ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('8 × 5 :'), r2=rd('40 carreaux.'), r3=rd('En une seconde !');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [...Array(40)].map((_,k)=>`<rect x="${36+(k%5)*25}" y="${26+Math.floor(k/5)*25}" width="23" height="23" rx="4" fill="#74c0fc" stroke="#1864ab" stroke-width="2"/>`).join('')+
    `<text x="248" y="160" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'8 rangées de 5 :<br>combien ?'+PARI,mini);
  return { clips,FIN,titre:'Perdu dans les carreaux',ceinture:0,finTitre:t1-.08,groupes,finClip:'05-abonne',
    cuts:[t1-.08,ran,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['13',tq('A'),tq('13')],['40',tq('B'),tq('40')],['35',tq('C'),tq('35')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<t1-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<tPerdu?g.montre():g.oups(); }
      else if(T<q){ T<tRg?g.reflechit():(T<tPas?g.montre():g.fier()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tDoigts?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
