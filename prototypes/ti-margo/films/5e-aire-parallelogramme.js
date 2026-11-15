/* ============================================================
   Série Aire 5e — ÉPISODE 03 : LE COUP DE CISEAUX (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-aire.js.
   Une feuille en parallélogramme : base 5 cm, hauteur 2 cm. Clac ! Je coupe le petit triangle penché, je le recolle
   de l'autre côté : un rectangle. Réponse A : 5 × 2 = 10 cm², rien n'est perdu. Même aire… mais il tient droit
   dans ma boîte. Commentaire : un parallélogramme de base 7 cm et de hauteur 3 cm.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : 110 px par centimètre ; le bas du milieu est à Ti Margo, la figure reste en haut */
const PC_A=[110,330], PC_U=110, PC_DEC=1.5;
const PC_C='#e879f9', PC_B='#86198f';
/* Les sommets d'un parallélogramme de base b, hauteur h (cm), coin bas-gauche (x, y) : A B C D, H pied de la hauteur */
function pcPts(x,y,b,h,dec,u){ return {A:[x,y],B:[x+b*u,y],C:[x+(b+dec)*u,y-h*u],D:[x+dec*u,y-h*u],H:[x+dec*u,y]}; }

FILMS['parallelogramme']=function(outils){
  const DUR={'00-accroche':8.75,'01-ciseaux':8.82,'02-question':14.91,'02b-reponse':10.24,'03-ouf':4.26,'04-commentaire':10.17,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tFeuille=mot('00-accroche','feuille'), tPara=mot('00-accroche','parallélogramme'), tBase=mot('00-accroche','Base'),
        t5=mot('00-accroche','centimètres',2), tHaut=mot('00-accroche','Hauteur'), t2=mot('00-accroche','centimètres',4);
  const tClac=mot('01-ciseaux','Clac'), tCoupe=mot('01-ciseaux','coupe'), tPenche=mot('01-ciseaux','penché'),
        tRecolle=mot('01-ciseaux','recolle'), tRect=mot('01-ciseaux','rectangle');
  const tA=mot('02b-reponse','A'), tFoisR=mot('02b-reponse','fois',2), t10=mot('02b-reponse','carrés'),
        tParaR=mot('02b-reponse','parallélogramme'), t10b=mot('02b-reponse','aussi');
  const tTient=mot('03-ouf','tient'), tBoite=mot('03-ouf','boîte');
  const tPara4=mot('04-commentaire','parallélogramme'), t7=mot('04-commentaire','centimètres',2), t3=mot('04-commentaire','centimètres',4),
        tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tBase-.08, finR=mot('02b-reponse','Je')-.08;

  const p=pcPts(PC_A[0],PC_A[1],5,2,PC_DEC,PC_U), L=5*PC_U;
  /* le triangle de gauche (A, H, D) ; décalé de dx vers la droite */
  const triG=dx=>[[p.A[0]+dx,p.A[1]],[p.H[0]+dx,p.H[1]],[p.D[0]+dx,p.D[1]]];
  /* u = 0 : le triangle à sa place (le parallélogramme) ; u = 1 : recollé à droite (le rectangle) */
  function figure(c,T,u,z=1,sep=false){
    pgPoly(c,[p.H,p.B,p.C,p.D],PC_C,PC_B,8,z);
    const dx=sep?-26:L*Math.max(0,Math.min(1,u)), lev=u>0&&u<1?-40*Math.sin(Math.PI*u):0, vol=sep||(u>0&&u<1);
    pgPoly(c,triG(dx).map(([x,y])=>[x,y+lev]),vol?TRIANGLE:PC_C,vol?TRIANGLE_B:PC_B,8,z); }
  function cotes(c,T,u){
    const dx=(p.H[0]-p.A[0])*Math.max(0,Math.min(1,u));
    pgTrait(c,p.A[0]+dx,p.A[1],p.B[0]+dx,p.A[1],(T-tBase)/.5,BASE5,12);
    if(T>=t5) ecrire(c,'5 cm',p.A[0]+dx+L/2,p.A[1]+56,58*zoom(T,t5,.4),BASE5);
    pgTrait(c,p.D[0],p.D[1],p.H[0],p.H[1],(T-tHaut)/.6,HAUT5,8,[18,12]);
    if(T>=tHaut+.4){ c.strokeStyle=HAUT5; c.lineWidth=5; c.strokeRect(p.H[0],p.H[1]-26,26,26); }
    if(T>=t2) pgEtiquette(c,'2 cm',p.H[0]+80,(p.D[1]+p.H[1])/2,56*zoom(T,t2,.4),HAUT5); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : base 7 cm, hauteur 3 cm (70 px par centimètre) */
      const d=pcPts(110,420,7,3,1.7,70);
      if(T>=tPara4) pgPoly(c,[d.A,d.B,d.C,d.D],PC_C,PC_B,8,T<tPara4+.5?zoom(T,tPara4,.3):1);
      pgTrait(c,d.A[0],d.A[1],d.B[0],d.B[1],(T-tPara4-.3)/.5,BASE5,12);
      if(T>=t7) ecrire(c,'7 cm',(d.A[0]+d.B[0])/2,d.A[1]+56,58*zoom(T,t7,.4),BASE5);
      pgTrait(c,d.D[0],d.D[1],d.H[0],d.H[1],(T-t7)/.6,HAUT5,8,[18,12]);
      if(T>=t3) pgEtiquette(c,'3 cm',d.H[0]+80,(d.D[1]+d.H[1])/2,56*zoom(T,t3,.4),HAUT5);
      if(T>=tQuelle) ecrire(c,'? cm²',880,200,96*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    if(T<q){ /* l'histoire : la feuille, la découpe, le recollage, le rectangle */
      const u=T<tRecolle?0:(T-tRecolle)/.9;
      if(T>=tFeuille) figure(c,T,u,T<tFeuille+.5?zoom(T,tFeuille,.3):1,T>=tPenche&&T<tRecolle);
      cotes(c,T,u);
      if(T>=tCoupe&&T<tRecolle){ pgTrait(c,p.D[0],p.D[1]-30,p.H[0],p.H[1]+30,(T-tCoupe)/.5,CRAIE.blanc,7,[14,10]);
      }
      if(T>=tClac&&T<tCoupe+.3) ecrire(c,'Clac !',p.H[0]+30,p.D[1]-50,90*zoom(T,tClac,.3),CRAIE.jaune);
      if(T>=tRect){ c.strokeStyle=CRAIE.jaune; c.lineWidth=9; c.strokeRect(p.H[0],p.D[1],L,2*PC_U); }
      tab.maj(); return; }

    /* après la carte : le rectangle de 10 cm², puis le triangle revient (le parallélogramme fait 10 aussi) ;
       03 : il repart à droite, et le rectangle tient droit dans la boîte */
    let u=1;
    if(T>=tParaR&&T<ouf) u=1-Math.min(1,(T-tParaR)/.8);
    if(T>=ouf) u=Math.min(1,(T-ouf)/.8);
    if(T>=tBoite){ c.strokeStyle='#8a5a2b'; c.lineWidth=14; c.strokeRect(p.H[0]-24,p.D[1]-24,L+48,2*PC_U+48); }
    figure(c,T,u); cotes(c,T,u);
    pgEtiquette(c,'10 cm²',620,(p.D[1]+p.H[1])/2,58,CRAIE.jaune);
    if(T>=tBoite) ecrire(c,'ma boîte',p.H[0]+L/2,p.D[1]-70,52*zoom(T,tBoite,.3),'#e0a96d');
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-ciseaux'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0("J'ai une feuille"),a0('en forme de parallélogramme.'));
  const s0=suiteDe(dis,60,62,[a0('Base : 5 centimètres.')],[a0('Hauteur : 2 centimètres.')]);
  const s1=suiteDe(q,60,62,[a1('Clac !')],[a1('Je coupe le petit'),a1('triangle penché.')],
    [a1('Je le recolle'),a1("de l'autre côté.")],[a1('Un rectangle !')]);
  qd('Question !');
  const phraseQ=[qd("Quelle est l'aire"),qd('du parallélogramme ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le rectangle : 5 × 2,'), r2=rd('10 centimètres carrés.');
  r1[3][4]=tFoisR; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd("Je n'ai rien perdu :")],[rd('le parallélogramme'),rd('fait 10 aussi.')]),
    ...suiteDe(com,60,62,[a3('Même aire…')],[a3('mais maintenant, il tient'),a3('droit dans ma boîte !')]),
    ...suiteDe(f,60,60,[a4('À toi : un parallélogramme')],[a4('de base 7 centimètres'),a4('et de hauteur 3 centimètres.')],
      [a4('Quelle est son aire ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « cm » (« centimètres »), puis « ² » (« carrés ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="pcw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('cm',qm('centimètres',2*k))}${sp('²',qm('carrés',k))}`;
  const choixA=choixDe('10',1), choixB=choixDe('5',2), choixC=choixDe('7',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.pcv${k}) .pcw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M40 190 L210 190 L270 80 L100 80 Z" fill="${PC_C}" stroke="${PC_B}" stroke-width="7" stroke-linejoin="round"/>`+
    `<path d="M100 60 L100 210" stroke="#f8f9fa" stroke-width="6" stroke-dasharray="14 10"/>`+
    `<text x="165" y="150" font-family="Segoe UI" font-weight="800" font-size="70" fill="#ffd43b" text-anchor="middle">✂</text></svg>`;
  poserMiniature(outils,acc+1,'Un coup de<br>ciseaux ?'+PARI,mini);
  return { clips,FIN,titre:'Le coup de ciseaux',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('10')],[choixB,tq('B'),tq('5')],[choixC,tq('C'),tq('7')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('pcv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis){ T<tHaut?g.montre():g.ouvre(); }
      else if(T<q){ T<tRecolle?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.fier(); }
      else if(T<ouf){ T<t10b?g.montre():g.fier(); }
      else if(T<com){ T<tTient?g.ouvre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
