/* ============================================================
   Série Volume 5e — ÉPISODE 01 : L'ÉTIQUETTE TROP COURTE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Une boîte de conserve de rayon 2 cm ; Ti Margo coupe une étiquette de 4 cm, comme le diamètre : il manque un gros morceau.
   Réponse B : l'étiquette fait tout le tour, 2 × 3,14 × 2 = 12,56 cm, plus de trois fois le diamètre.
   6,28 : un demi-tour ; 4 : le diamètre. Commentaire : une boîte de rayon 5 cm ; la longueur de son étiquette ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la boîte de face au milieu en haut, la boîte vue de dessus à DROITE
   (Ti Margo cache le bas du milieu-gauche) ; l'étiquette à plat, puis les calculs, à gauche en haut */
const EC_X=560, EC_YT=150, EC_YB=390, EC_R=100, EC_RY=32;      /* la boîte de face (rayon 2 cm : 50 px par cm) */
const DV_X=870, DV_Y=420, DV_R=112;                            /* la même, vue de dessus */
const ET_X=70, ET_Y=110, ET_L=200, ET_H=100;                   /* l'étiquette coupée : 4 cm */
const EC_METAL='#ced4da', EC_METAL_B='#495057', EC_ROSE='#f783ac', EC_ROSE_B='#a61e4d';
const EC_ANG=2;                                                /* 4 cm enroulés sur un rayon de 2 cm : 2 radians */
/* Un nombre décimal (« 3,14 ») a une marque par mot dit (« trois », « virgule », « quatorze ») : une seule ici */
function ecFusionnerDecimaux(){ const CL=(window.CUES||{})[VIDEO]||{}, dec=/^\d+,\d+$/;
  for(const k in CL){ const res=[];
    for(const [t,w] of CL[k]){ const s=w.trim(), der=res[res.length-1];
      if(der&&dec.test(s)&&der[1]===s) continue; res.push([t,dec.test(s)?s:w]); }
    CL[k]=res; } }
/* La boîte de face : le corps (métal, ou l'étiquette rose), le fond arrondi, le couvercle ; zoomée de z */
function ecBoite(c,x,yt,yb,r,ry,z,rose=false){ if(z<=0) return; const k=Math.min(1.15,z), cy=(yt+yb)/2;
  c.save(); c.translate(x,cy); c.scale(k,k); c.translate(-x,-cy);
  c.fillStyle=rose?EC_ROSE:EC_METAL; c.strokeStyle=rose?EC_ROSE_B:EC_METAL_B; c.lineWidth=6;
  c.beginPath(); c.moveTo(x-r,yt); c.lineTo(x-r,yb); c.ellipse(x,yb,r,ry,0,Math.PI,0,true); c.lineTo(x+r,yt); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x-r,yt); c.lineTo(x-r,yb); c.ellipse(x,yb,r,ry,0,Math.PI,0,true); c.lineTo(x+r,yt); c.stroke();
  c.fillStyle=EC_METAL; c.strokeStyle=EC_METAL_B; c.beginPath(); c.ellipse(x,yt,r,ry,0,0,2*Math.PI); c.fill(); c.stroke();
  c.restore(); }
/* La boîte vue de dessus : le couvercle, et l'étiquette enroulée sur un angle a (depuis le haut, sens des aiguilles) */
function ecDessus(c,z,a,coul=EC_ROSE){ if(z<=0) return; const k=Math.min(1.15,z), R=DV_R*k;
  c.fillStyle=EC_METAL; c.strokeStyle=EC_METAL_B; c.lineWidth=6; c.beginPath(); c.arc(DV_X,DV_Y,R,0,2*Math.PI); c.fill(); c.stroke();
  c.strokeStyle=EC_METAL_B; c.lineWidth=3; c.beginPath(); c.arc(DV_X,DV_Y,R*.78,0,2*Math.PI); c.stroke();
  if(a>0){ c.strokeStyle=coul; c.lineWidth=26; c.lineCap='butt'; c.beginPath(); c.arc(DV_X,DV_Y,R+15,-Math.PI/2,-Math.PI/2+Math.min(a,2*Math.PI)); c.stroke(); } }
/* Ce qui manque : le reste du tour, en pointillé rouge */
function ecManque(c,a,alpha=1){ c.save(); c.globalAlpha=alpha; c.strokeStyle=PENCHE5; c.lineWidth=12; c.setLineDash([18,13]); c.lineCap='butt';
  c.beginPath(); c.arc(DV_X,DV_Y,DV_R+15,-Math.PI/2+a,1.5*Math.PI); c.stroke(); c.setLineDash([]); c.restore(); }
/* Une bande d'étiquette à plat (coin haut-gauche x, y) */
function ecBande(c,x,y,l,h,alpha=1){ if(alpha<=0) return; c.save(); c.globalAlpha=alpha; c.fillStyle=EC_ROSE; c.fillRect(x,y,l,h);
  c.strokeStyle=EC_ROSE_B; c.lineWidth=6; c.strokeRect(x,y,l,h); c.restore(); }

FILMS['patron-prisme-cylindre']=function(outils){
  ecFusionnerDecimaux();
  const DUR={'00-accroche':7.51,'01-coupe':7.99,'02-question':19.89,'02b-reponse':11.92,'03-ouf':3.98,'04-commentaire':9.38,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'01-coupe':.5,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tRayon=mot('00-accroche','rayon'), t2=mot('00-accroche','2');
  const tEtiq=mot('01-coupe','étiquette'), t4=mot('01-coupe','4'), tDiam=mot('01-coupe','diamètre'),
        tEnr=mot('01-coupe',"l'enroule"), tManque=mot('01-coupe','manque');
  const tB=mot('02b-reponse','B'), tTour=mot('02b-reponse','tour'), t2f=mot('02b-reponse','2'), t314=mot('02b-reponse','3,14'),
        tFois=mot('02b-reponse','fois',3), t2b=mot('02b-reponse','2',3), t1256=mot('02b-reponse','12,56'),
        tPlus=mot('02b-reponse','Plus'), tTrois=mot('02b-reponse','trois'), tDiamR=mot('02b-reponse','diamètre');
  const tFait=mot('03-ouf','fait'), tFerme=mot('03-ouf','ferme'), tPile=mot('03-ouf','pile');
  const tBoite4=mot('04-commentaire','boîte'), tRayon4=mot('04-commentaire','rayon'), t5=mot('04-commentaire','5'),
        tEtiq4=mot('04-commentaire','étiquette'), tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Le')-.08, finR=t2f-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une boîte de rayon 5 cm (30 px par cm) */
      const x=760, yt=250, yb=560, rr=170, ry=52;
      ecBoite(c,x,yt,yb,rr,ry,T>=tBoite4?(T<tBoite4+.5?zoom(T,tBoite4,.3):1):0,T>=tEtiq4);
      if(T>=tRayon4) pgTrait(c,x,yt,x+rr,yt,(T-tRayon4)/.4,BASE5,8);
      if(T>=t5) ecrire(c,'5 cm',x+rr/2,yt-ry-52,64*zoom(T,t5,.4),BASE5);
      if(T>=tEtiq4) pgEtiquette(c,'?',x,(yt+yb)/2+20,100*zoom(T,tEtiq4,.4),CRAIE.jaune);
      if(T>=tQuelle) ecrire(c,'? cm',240,230,120*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* la boîte de face : métal, puis l'étiquette qui en fait enfin le tour (« elle ferme ») */
    ecBoite(c,EC_X,EC_YT,EC_YB,EC_R,EC_RY,1,T>=tFerme);
    if(T>=tRayon&&T<tDiam) pgTrait(c,EC_X,EC_YT,EC_X+EC_R,EC_YT,(T-tRayon)/.4,BASE5,8);
    if(T>=t2&&T<ouf) ecrire(c,'2 cm',EC_X+EC_R/2,EC_YT-EC_RY-50,64*zoom(T,t2,.4),BASE5);
    if(T>=tDiam&&T<ouf) pgTrait(c,EC_X-EC_R,EC_YT,EC_X+EC_R,EC_YT,(T-tDiam)/.4,BASE5,10);

    /* l'étiquette de 4 cm, à plat ; à « l'enroule », elle part autour de la boîte vue de dessus */
    const aEnr=T<tEnr?0:Math.min(1,(T-tEnr)/1.0);
    if(T>=tEtiq&&T<q){ ecBande(c,ET_X,ET_Y,ET_L,ET_H,(T<tEtiq+.4?(T-tEtiq)/.4:1)*(1-aEnr));
      if(T>=tDiam&&aEnr<1){ c.strokeStyle=BASE5; c.lineWidth=8; c.globalAlpha=1-aEnr; c.strokeRect(ET_X-6,ET_Y-6,ET_L+12,ET_H+12); c.globalAlpha=1; } }
    if(T>=t4&&T<tEnr+.6) { c.globalAlpha=1-aEnr; ecrire(c,'4 cm',ET_X+ET_L/2,ET_Y+ET_H+60,64*zoom(T,t4,.4),BASE5); c.globalAlpha=1; }
    /* la boîte vue de dessus : l'étiquette enroulée (2 radians), puis tout le tour (« cette fois ») */
    const aOuf=T<tFait?0:Math.min(1,(T-tFait)/.9), a=EC_ANG*aEnr+(2*Math.PI-EC_ANG)*aOuf*aOuf*(3-2*aOuf);
    if(T>=tEnr){ ecDessus(c,T<tEnr+.5?zoom(T,tEnr,.3):1,a);
      if(T>=tManque&&aOuf<1) ecManque(c,a,(T<tManque+.3?(T-tManque)/.3:1)*(1-aOuf));
      if(T>=tManque&&T<q) ecrire(c,'?',DV_X,DV_Y,110*zoom(T,tManque,.4),CRAIE.jaune);
      if(T>=tPile) pgEtiquette(c,'pile !',DV_X,DV_Y,60*zoom(T,tPile,.4),CRAIE.ok); }
    if(T<q){ tab.maj(); return; }

    /* après la carte : 2 × 3,14 × 2 = 12,56 cm ; la bande de 12,56 cm, plus de trois fois 4 cm */
    if(T>=tTour&&T<ouf) ecManque(c,EC_ANG,.5+.5*Math.abs(Math.sin((T-tTour)*4)));
    pgLigne(c,T,[['2 ×',t2f],['3,14 ×',t314],['2',t2b]],245,120,64,CRAIE.blanc);
    pgLigne(c,T,[['= 12,56 cm',t1256]],245,225,64,CRAIE.ok);
    const u=40, bx=40, by=470, bh=64;
    if(T>=tPlus) ecBande(c,bx,by,12.56*u,bh,Math.min(1,(T-tPlus)/.3));
    if(T>=tTrois){ c.strokeStyle=BASE5; c.lineWidth=7; for(let k=0;k<3;k++){ if(T>=tTrois+k*.18) c.strokeRect(bx+k*4*u+5,by+5,4*u-10,bh-10); } }
    if(T>=tDiamR) ecrire(c,'4 cm',bx+2*u,by+bh+42,52*zoom(T,tDiamR,.4),BASE5);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-coupe'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,60,a0('Je colle une étiquette'),a0('autour de ma boîte'),a0('de conserve.'));
  const s0=suiteDe(dis,60,62,[a0('Le rayon de la boîte :'),a0('2 centimètres.')]);
  const s1=suiteDe(q,60,62,[a1('Je coupe une étiquette'),a1('de 4 centimètres,')],[a1('comme le diamètre.')],
    [a1("Je l'enroule…"),a1('il manque un gros morceau !')]);
  qd('Question !');
  /* « pi égal 3,14 » s'écrit « π = 3,14 » : même nombre de mots, chacun à son instant */
  const q1=qd('Quelle longueur doit avoir'), q2=qd("l'étiquette ?"), pi=qd('On prend pi égal 3,14.'); pi[2]='On prend π = 3,14.';
  const phraseQ=[q1,q2,pi];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("L'étiquette fait tout le tour :");
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('2 × 3,14 × 2,'),rd('12,56 centimètres.')],[rd('Plus de trois fois'),rd('le diamètre !')]),
    ...suiteDe(com,60,62,[a3('Cette fois, elle fait le tour…'),a3('et elle ferme pile !')]),
    ...suiteDe(f,60,60,[a4('À toi : une boîte'),a4('de rayon 5 centimètres.')],[a4('Quelle longueur doit avoir'),a4('son étiquette ?')],
      [a4('Réponds en commentaire !')])
  ];
  /* la phrase de la question : la version π dans la liste des mots aussi */
  if(pi[3]&&pi[3].length!==pi[2].split(' ').length) throw new Error('π : le nombre de mots a changé');

  /* Les choix : le nombre paraît quand la voix le dit, puis « cm » (« centimètres » : pour C, la 2e marque de la paire) */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="ecw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('cm',qm('centimètres',k))}`;
  const choixA=choixDe('6,28',1), choixB=choixDe('12,56',2), choixC=choixDe('4',4);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.ecv${k}) .ecw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M60 70 L60 190 A60 18 0 0 0 180 190 L180 70 Z" fill="${EC_METAL}" stroke="${EC_METAL_B}" stroke-width="6"/>`+
    `<path d="M60 95 L60 175 A60 18 0 0 0 120 193 L120 113 A60 18 0 0 1 60 95 Z" fill="${EC_ROSE}" stroke="${EC_ROSE_B}" stroke-width="5"/>`+
    `<ellipse cx="120" cy="70" rx="60" ry="18" fill="${EC_METAL}" stroke="${EC_METAL_B}" stroke-width="6"/>`+
    `<text x="258" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Mon étiquette<br>est trop courte ?'+PARI,mini);
  return { clips,FIN,titre:"L'étiquette trop courte",ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('6,28')],[choixB,tq('B'),tq('12,56')],[choixC,tq('C'),tq('4')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('ecv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis) g.montre();
      else if(T<q){ T<tManque?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.montre(); }
      else if(T<ouf){ T<tPlus?g.montre():g.fier(); }
      else if(T<com){ T<tPile?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
