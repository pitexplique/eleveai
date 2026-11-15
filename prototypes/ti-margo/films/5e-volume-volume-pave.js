/* ============================================================
   Série Volume 5e — ÉPISODE 03 : L'AQUARIUM (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Un aquarium de 5 dm × 3 dm × 4 dm. Ti Margo additionne (5 + 3 + 4 = 12 L) : le fond est à peine mouillé.
   Réponse C : 5 × 3 = 15 au fond, × 4 = 60 dm³ ; 1 dm³ = 1 L : 60 litres. Les poissons nagent.
   Commentaire : un aquarium de 6 dm sur 3, et 5 de haut : combien de litres ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : l'aquarium à DROITE jusqu'en bas (Ti Margo cache le bas du milieu-gauche), les calculs à gauche en haut */
const AQ_X=470, AQ_Y=630, AQ_U=68, AQ_XG=290;
const AQ_VERRE={face:'rgba(165,216,255,.16)',dessus:'rgba(165,216,255,.10)',cote:'rgba(116,192,252,.22)',bord:'#e7f5ff',lw:6};
const AQ_EAU={face:'rgba(34,139,230,.78)',dessus:'rgba(116,192,252,.9)',cote:'rgba(24,100,171,.82)',bord:'rgba(0,0,0,0)',lw:1};
/* L'aquarium l × p × h (dm) : l'eau jusqu'à e dm, puis le verre par-dessus ; (x, y) = coin bas-gauche de la face avant */
function aqAquarium(c,x,y,l,p,h,u,e,z=1){ if(z<=0) return;
  if(e>.02) pvPave(c,x,y,l,p,Math.min(e,h),u,{...AQ_EAU,z:Math.min(1,z)});
  pvPave(c,x,y,l,p,h,u,{...AQ_VERRE,z}); }
/* Un poisson orange (vers la droite si s > 0) */
function aqPoisson(c,x,y,s,coul='#ff922b'){ c.save(); c.translate(x,y); c.scale(s,Math.abs(s));
  c.fillStyle=coul; c.beginPath(); c.ellipse(0,0,30,17,0,0,7); c.fill();
  c.beginPath(); c.moveTo(-24,0); c.lineTo(-50,-17); c.lineTo(-50,17); c.closePath(); c.fill();
  c.fillStyle='#1f3b2c'; c.beginPath(); c.arc(15,-4,4,0,7); c.fill(); c.restore(); }
const lisse01=v=>{ v=Math.max(0,Math.min(1,v)); return v*v*(3-2*v); };

FILMS['volume-pave']=function(outils){
  const DUR={'00-accroche':7.34,'01-seaux':8.13,'02-question':15.20,'02b-reponse':13.04,'03-ouf':3.10,'04-commentaire':9.32,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'01-seaux':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tAqua=mot('00-accroche','aquarium'), t5=mot('00-accroche','5'), t3=mot('00-accroche','3'), t4=mot('00-accroche','4');
  const t5s=mot('01-seaux','5'), tPlus1=mot('01-seaux','plus',2), t3s=mot('01-seaux','3'), tPlus2=mot('01-seaux','plus',4),
        t4s=mot('01-seaux','4'), t12=mot('01-seaux','12'), tVerse=mot('01-seaux','verse'), tFond=mot('01-seaux','fond'),
        tMouille=mot('01-seaux','mouillé');
  const tC=mot('02b-reponse','C'), tFois1=mot('02b-reponse','fois',2), tFois4=mot('02b-reponse','fois',3),
        t4r=mot('02b-reponse','4'), t60=mot('02b-reponse','60'), tDm=mot('02b-reponse','décimètre'),
        tLitre=mot('02b-reponse','litre'), t60L=mot('02b-reponse','litres');
  const tPoissons=mot('03-ouf','poissons'), tNager=mot('03-ouf','nager');
  const tAqua4=mot('04-commentaire','aquarium'), t6c=mot('04-commentaire','6'), t3c=mot('04-commentaire','3'),
        t5c=mot('04-commentaire','5'), tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t5-.08, finR=tFois4-.08;
  const FX=PV_DX*3*AQ_U, FY=PV_DY*3*AQ_U;   /* le décalage de la profondeur (3 dm) */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un aquarium de 6 × 3 × 5 dm (56 px par dm) */
      const u=56, x=470, y=630, dx=PV_DX*3*u, dy=PV_DY*3*u;
      aqAquarium(c,x,y,6,3,5,u,0,T>=tAqua4?(T<tAqua4+.5?zoom(T,tAqua4,.3):1):0);
      if(T>=t6c) ecrire(c,'6 dm',x+3*u,y+50,50*zoom(T,t6c,.4),BASE5);
      if(T>=t3c) ecrire(c,'3 dm',x+6*u+dx/2+40,y+dy/2+50,48*zoom(T,t3c,.4),BASE5);
      if(T>=t5c) ecrire(c,'5 dm',x+6*u+dx+66,y+dy-2.5*u,44*zoom(T,t5c,.4),HAUT5);
      if(T>=tCombien) ecrire(c,'? L',AQ_XG,200,96*zoom(T,tCombien,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* l'eau : 0,8 dm quand Ti Margo verse ses 12 litres, puis pleine (4 dm) au « Fois 4 » de la réponse */
    const e=T<finR?.8*lisse01((T-tVerse)/1.2):.8+3.2*lisse01((T-tFois4)/1.6);
    aqAquarium(c,AQ_X,AQ_Y,5,3,4,AQ_U,e,T>=tAqua?(T<tAqua+.5?zoom(T,tAqua,.3):1):0);
    if(T>=t5) ecrire(c,'5 dm',AQ_X+2.5*AQ_U,AQ_Y+56,50*zoom(T,t5,.4),BASE5);
    if(T>=t3) ecrire(c,'3 dm',AQ_X+5*AQ_U+FX/2+40,AQ_Y+FY/2+56,48*zoom(T,t3,.4),BASE5);
    if(T>=t4) ecrire(c,'4 dm',AQ_X+5*AQ_U+FX+66,AQ_Y+FY-2*AQ_U,44*zoom(T,t4,.4),HAUT5);
    if(T<q){
      pgLigne(c,T,[['5',t5s],['+',tPlus1],['3',t3s],['+',tPlus2],['4',t4s],['= 12 L',t12]],AQ_XG,120,62,PENCHE5);
      if(T>=tMouille){ /* le fond à peine mouillé, entouré en rouge */
        const u=Math.min(1,(T-tMouille)/.3); c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.beginPath();
        c.ellipse(AQ_X+2.5*AQ_U+FX/2,AQ_Y-.4*AQ_U+FY/2,(2.5*AQ_U+FX/2+34)*(.6+.4*u),(.4*AQ_U-FY/2+6)*(.6+.4*u),0,0,7); c.stroke(); }
      tab.maj(); return; }

    /* après la carte : 5 × 3 = 15 ; × 4 = 60 dm³ ; 1 dm³ = 1 L ; 60 L */
    pgLigne(c,T,[['5 × 3',finR+.1],['= 15',finR+.3]],AQ_XG,110,58,CRAIE.blanc);
    pgLigne(c,T,[['× 4',tFois4],['= 60 dm³',t60]],AQ_XG,190,58,CRAIE.ok);
    pgLigne(c,T,[['1 dm³',tDm],['= 1 L',tLitre]],AQ_XG,270,58,CRAIE.jaune);
    if(T>=t60L) ecrire(c,'60 L !',AQ_XG,350,70*zoom(T,t60L,.4),CRAIE.ok);
    if(T>=t60) pgEtiquette(c,'60 dm³',AQ_X+2.5*AQ_U,AQ_Y-2*AQ_U,50*zoom(T,t60,.4),CRAIE.blanc);
    if(T>=ouf){ /* les poissons nagent */
      const a=T-ouf;
      aqPoisson(c,AQ_X+110+50*Math.sin(a*1.6),AQ_Y-.8*AQ_U+6*Math.sin(a*3),Math.cos(a*1.6)>=0?1.3:-1.3);
      aqPoisson(c,AQ_X+230+50*Math.sin(a*1.3+2),AQ_Y-3.25*AQ_U,Math.cos(a*1.3+2)>=0?1.15:-1.15,'#fcc419');
      aqPoisson(c,AQ_X+250+40*Math.sin(a*1.1+4),AQ_Y-.9*AQ_U,Math.cos(a*1.1+4)>=0?1:-1,'#ff8787'); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-seaux'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0("J'ai un aquarium :"));
  const s0=suiteDe(dis,60,62,[a0('5 décimètres de long,'),a0('3 de large, 4 de haut.')],[a0("Je verse l'eau…")]);
  const p1=a1('Je pense :'), p2=a1('5 + 3 + 4, 12 litres.');
  p2[3][1]=tPlus1; p2[3][3]=tPlus2; /* le signe « + » paraît quand la voix dit « plus » */
  const s1=suiteDe(q,60,62,[p1,p2],[a1('Je verse 12 litres…'),a1('le fond est à peine mouillé !')]);
  qd('Question !');
  const phraseQ=[qd('Quel est le volume'),qd("de l'aquarium ?")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('5 × 3, 15 au fond.');
  r1[3][1]=tFois1; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('Fois 4 :'),rd('60 décimètres cubes.')],[rd('Et 1 décimètre cube,'),rd("c'est 1 litre :")],[rd('60 litres !')]),
    ...suiteDe(com,60,62,[a3('Mes poissons vont enfin'),a3('pouvoir nager !')]),
    ...suiteDe(f,60,60,[a4('À toi : un aquarium'),a4('de 6 décimètres sur 3,')],[a4('et 5 de haut.')],
      [a4('Combien de litres ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « dm » (« décimètres »), puis « ³ » (« cubes ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="aqw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('dm',qm('décimètres',k))}${sp('³',qm('cubes',k))}`;
  const choixA=choixDe('12',1), choixB=choixDe('20',2), choixC=choixDe('60',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.aqv${k}) .aqw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="36" y="78" width="150" height="130" fill="rgba(165,216,255,.16)" stroke="#e7f5ff" stroke-width="5"/>`+
    `<path d="M36 78 L70 54 L220 54 L186 78 Z" fill="rgba(165,216,255,.12)" stroke="#e7f5ff" stroke-width="5" stroke-linejoin="round"/>`+
    `<path d="M186 78 L220 54 L220 184 L186 208 Z" fill="rgba(116,192,252,.22)" stroke="#e7f5ff" stroke-width="5" stroke-linejoin="round"/>`+
    `<rect x="39" y="190" width="145" height="16" fill="#1c7ed6"/>`+
    `<text x="272" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien de litres<br>dans mon aquarium ?'+PARI,mini);
  return { clips,FIN,titre:"L'aquarium",ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('12')],[choixB,tq('B'),tq('20')],[choixC,tq('C'),tq('60')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('aqv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis) g.montre();
      else if(T<q){ T<tVerse?g.reflechit():(T<tFond?g.montre():g.oups()); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t60L?g.montre():g.fier(); }
      else if(T<com){ T<tNager?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
