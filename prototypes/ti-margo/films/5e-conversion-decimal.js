/* ============================================================
   Série Conversions 5e — ÉPISODE 01 : LA RECETTE DE TI MARGO (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-conversion.js.
   La recette dit 1,5 kg de farine ; la balance compte en grammes. Ti Margo met 15 g : un tout petit gâteau.
   Réponse C : 1 kg = 1 000 g ; 1,5 × 1 000 = 1 500 g. Le gâteau est assez grand pour toute la classe.
   Commentaire : 0,25 kg, c'est combien de grammes ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la recette et la balance à DROITE (Ti Margo cache le bas du milieu-gauche),
   les calculs à gauche, en haut (x ≈ 290, y 120 → 350). */
const RC_XB=830, RC_YB=660, RC_XG=290;          /* la balance : le milieu de son socle, le bas du socle */
const RC_NB=' ';                                /* « 1 000 » d'un seul tenant : un mot écrit pour la marque « 1 000 grammes » */
const RC_FARINE='#fff4e6', RC_BOL='#74c0fc', RC_BOL_B='#1864ab';
/* Une ligne de légende faite de plusieurs morceaux (un nombre à virgule : sauter sa marque de trop) */
function rcDitS(f,parts){ const rs=[]; parts.forEach(p=>{ if(typeof p==='number') f.saute(p); else rs.push(f(p)); });
  return [rs[0][0],rs[rs.length-1][1],rs.map(r=>r[2]).join(' '),rs.flatMap(r=>r[3])]; }
/* La balance de cuisine : socle, écran (texte ajusté à sa largeur), plateau, bol ; tas = la farine (0 → 1) */
function rcBalance(c,z,ecran,tas){ if(z<=0) return; const x=RC_XB, y=RC_YB; c.save(); c.globalAlpha=Math.min(1,z); c.lineJoin='round';
  c.beginPath(); c.moveTo(x-175,y); c.lineTo(x+175,y); c.lineTo(x+150,y-115); c.lineTo(x-150,y-115); c.closePath();
  c.fillStyle='#e9ecef'; c.fill(); c.strokeStyle='#495057'; c.lineWidth=6; c.stroke();
  c.fillStyle='#0b3d2e'; c.strokeStyle=CRAIE.ok; c.lineWidth=4; c.beginPath(); c.roundRect(x-115,y-95,230,66,10); c.fill(); c.stroke();
  if(ecran){ let fs=50; c.font=`800 ${fs}px "Segoe UI"`; const w=c.measureText(ecran).width; if(w>205) fs=fs*205/w; ecrire(c,ecran,x,y-61,fs,CRAIE.ok); }
  c.fillStyle='#adb5bd'; c.fillRect(x-20,y-137,40,22);
  c.fillStyle='#ced4da'; c.strokeStyle='#495057'; c.lineWidth=4; c.beginPath(); c.roundRect(x-155,y-152,310,16,6); c.fill(); c.stroke();
  /* le tas de farine, puis le bol devant */
  const yr=y-245; if(tas>0){ const h=20+150*tas, l=50+170*Math.min(1,tas*1.4);
    c.fillStyle=RC_FARINE; c.strokeStyle='#ced4da'; c.lineWidth=3; c.beginPath(); c.moveTo(x-l/2-10,yr+8);
    c.quadraticCurveTo(x,yr-2*h,x+l/2+10,yr+8); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.moveTo(x-125,yr); c.lineTo(x+125,yr); c.quadraticCurveTo(x+115,y-152,x,y-152); c.quadraticCurveTo(x-115,y-152,x-125,yr); c.closePath();
  c.fillStyle=RC_BOL; c.fill(); c.strokeStyle=RC_BOL_B; c.lineWidth=6; c.stroke(); c.restore(); }
/* La fiche recette, en haut à droite */
function rcRecette(c,z){ if(z<=0) return; const k=Math.min(1.15,z), X=830, Y=150, W=380*k, H=200*k; c.save();
  c.fillStyle='#f8f9fa'; c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.roundRect(X-W/2,Y-H/2,W,H,14); c.fill(); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.roundRect(X-W/2,Y-H/2,W,50*k,[14,14,0,0]); c.fill(); c.restore(); }
/* Un gâteau à deux étages (milieu x, bas y, largeur w), zoomé de z ; bougies allumées si feu */
function rcGateau(c,x,y,w,z,feu){ if(z<=0) return; const k=Math.min(1.2,z), W=w*k, h1=W*.32, w2=W*.7, h2=W*.26; c.save();
  c.fillStyle='#a0522d'; c.strokeStyle='#5c2e0e'; c.lineWidth=Math.max(3,W*.02);
  c.beginPath(); c.roundRect(x-W/2,y-h1,W,h1,W*.04); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(x-w2/2,y-h1-h2,w2,h2,W*.04); c.fill(); c.stroke();
  c.fillStyle='#fff0f6'; c.fillRect(x-W/2+2,y-h1,W-4,h1*.22); c.fillRect(x-w2/2+2,y-h1-h2,w2-4,h2*.24);
  if(W>120) for(let i=0;i<5;i++){ const bx=x-w2/2+w2*(i+.5)/5, by=y-h1-h2; c.fillStyle=['#ffd43b','#74c0fc','#ff8787','#8ce99a','#b197fc'][i];
    c.fillRect(bx-5,by-36,10,36); if(feu){ c.fillStyle='#ff922b'; c.beginPath(); c.ellipse(bx,by-48,7,12,0,0,7); c.fill(); } }
  c.restore(); }
/* La petite cuillère qui verse au-dessus du bol */
function rcCuillere(c,z){ if(z<=0) return; const k=Math.min(1.2,z); c.save(); c.translate(690,330); c.rotate(-.5); c.scale(k,k);
  c.strokeStyle='#ced4da'; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(-130,0); c.lineTo(-30,0); c.stroke();
  c.fillStyle='#dee2e6'; c.strokeStyle='#868e96'; c.lineWidth=4; c.beginPath(); c.ellipse(0,0,36,22,0,0,7); c.fill(); c.stroke();
  c.fillStyle=RC_FARINE; c.beginPath(); c.ellipse(4,-4,22,10,0,0,7); c.fill(); c.restore(); }

FILMS['decimal']=function(outils){
  const DUR={'00-accroche':8.43,'01-balance':6.09,'02-question':14.99,'02b-reponse':8.27,'03-ouf':4.27,'04-commentaire':7.01,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-balance':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tRecette=mot('00-accroche','recette'), t15a=mot('00-accroche','1,5'), tKilo0=mot('00-accroche','kilo'),
        tFarine=mot('00-accroche','farine'), tBalance=mot('00-accroche','balance'), tGr0=mot('00-accroche','grammes');
  const t15=mot('01-balance','15'), tGr1=mot('01-balance','grammes',2), tCuil=mot('01-balance','cuillère'),
        tPetit=mot('01-balance','petit');
  const tC=mot('02b-reponse','C'), t15r=mot('02b-reponse','1,5'), t1000b=mot('02b-reponse','000',3),
        t1500=mot('02b-reponse','500'), tGr15=mot('02b-reponse','grammes',6);
  const tGrand=mot('03-ouf','grand');
  const t025=mot('04-commentaire','0,25'), tKilo4=mot('04-commentaire','kilo'), tGr4=mot('04-commentaire','grammes'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','La')-.08, finR=t15r-.08;
  const zz=(T,t)=>T>=t?(T<t+.5?zoom(T,t,.3):1):0;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 0,25 kg sur la balance, combien de grammes ? */
      rcBalance(c,1,T>=tKilo4?'0,25 kg':'',T>=t025?.35:0);
      if(T>=t025) ecrire(c,'0,25 kg',RC_XG,150,96*zoom(T,t025,.5),CRAIE.blanc);
      if(T>=tGr4) ecrire(c,'= ? g',RC_XG,290,96*zoom(T,tGr4,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* la recette, en haut à droite */
    rcRecette(c,zz(T,tRecette));
    if(T>=tRecette) ecrire(c,'Recette',830,75,40,CRAIE.blanc);
    if(T>=t15a) ecrire(c,'1,5 kg',830,155,64*zoom(T,t15a,.4),'#1864ab');
    if(T>=tFarine) ecrire(c,'de farine',830,213,46*zoom(T,tFarine,.4),'#495057');
    /* la balance : « g », puis 15 g ; après la carte, 1 500 g */
    const ec=T>=t1500&&T>=q?`1${RC_NB}500 g`:(T>=tGr1?'15 g':(T>=tGr0?'g':''));
    const tas=T>=t1500&&T>=q?Math.min(1,(T-t1500)/.6):(T>=t15?.06:0);
    rcBalance(c,zz(T,tBalance),ec,tas);
    if(T<q){
      rcCuillere(c,T>=tCuil&&T<tPetit+.9?zz(T,tCuil):0);
      if(T>=tPetit){ rcGateau(c,RC_XG,250,60,zz(T,tPetit),false); cercle(c,RC_XG,228,70,CRAIE.jaune,(T-tPetit)/.4); }
      tab.maj(); return; }

    if(T<ouf){ /* après la carte : 1 kg = 1 000 g ; 1,5 × 1 000 = 1 500 g */
      pgLigne(c,T,[[`1 kg = 1${RC_NB}000 g`,finR+.1]],RC_XG,120,60,CRAIE.blanc);
      pgLigne(c,T,[['1,5',finR+.1],[`× 1${RC_NB}000`,t1000b]],RC_XG,235,66,BASE5);
      pgLigne(c,T,[[`= 1${RC_NB}500 g`,t1500]],RC_XG,345,70,CRAIE.ok);
    } else { /* le gâteau de toute la classe */
      ecrire(c,`1,5 kg = 1${RC_NB}500 g`,RC_XG,78,54,CRAIE.ok);
      rcGateau(c,RC_XG,450,380,zz(T,ouf+.1),T>=tGrand);
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-balance'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je fais un gâteau.'));
  const s0=suiteDe(bal,60,62,[a0('La recette dit :'),rcDitS(a0,['1,5',1,'kilo de farine.'])],[a0('Ma balance compte'),a0('en grammes.')]);
  const s1=suiteDe(q,60,62,[a1('Je mets 15 grammes.')],[a1('Une petite cuillère…')],[a1('ça fait un tout'),a1('petit gâteau !')]);
  qd('Question !');
  const phraseQ=[rcDitS(qd,['1,5',1,"kilo, c'est combien"]),qd('de grammes ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd(`1 kilo = 1${RC_NB}000 grammes.`);
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rcDitS(rd,['1,5',1,`× 1${RC_NB}000 :`])],[rd(`1${RC_NB}500 grammes.`)]),
    ...suiteDe(com,60,62,[a3('Cette fois, le gâteau'),a3('est assez grand')],[a3('pour toute la classe !')]),
    ...suiteDe(f,60,60,[rcDitS(a4,['À toi : 0,25',1,'kilo,'])],[a4("c'est combien"),a4('de grammes ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « g » quand elle dit « grammes » (la dernière marque du choix) */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="rcw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('g',qm('grammes',k))}`;
  const choixA=choixDe('150',4), choixB=choixDe('15',6), choixC=choixDe('1&nbsp;500',10);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.rcv${k}) .rcw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=ardoiseMini([['1,5 kg','#f8f9fa'],['= ? g','#ffd43b']]);
  poserMiniature(outils,acc+1,'Ma farine :<br>15 g ou 1 500 g ?'+PARI,mini);
  return { clips,FIN,titre:'La recette de Ti Margo',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bal,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('150')],[choixB,tq('B'),tq('15',4)],[choixC,tq('C'),tq('500')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('rcv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<bal){ T<tBalance?g.montre():g.ouvre(); }
      else if(T<q){ T<tPetit?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.montre(); }
      else if(T<ouf){ T<tGr15?g.montre():g.fier(); }
      else if(T<com){ T<tGrand?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
