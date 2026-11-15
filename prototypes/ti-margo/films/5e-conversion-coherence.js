/* ============================================================
   Série Conversions 5e — ÉPISODE 04 : LE JUS DANS UN BOUCHON (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-conversion.js.
   Ti Margo commande 1,5 L de jus ; le livreur apporte un bouchon : sur le bon, « 1,5 cL ».
   Réponse A : 1 L = 100 cL ; 1,5 × 100 = 150 cL. Une grande bouteille, pas un bouchon !
   Commentaire : 0,8 L, c'est combien de cL ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la bouteille et le carton à DROITE (Ti Margo cache le bas du milieu-gauche),
   le bon et les calculs à gauche, en haut (x ≈ 290, y 120 → 350). */
const JB_X=900, JB_Y=640, JB_H=500, JB_XG=290;          /* la bouteille : son pied en (900, 640) */
const CT_X=645, CT_Y=640;                               /* le carton du livreur : son pied en (645, 640) */
const JUS='#ff922b', JUS_B='#e8590c', VERRE='#e7f5ff';
/* La bouteille de jus (pied en x, y ; hauteur h), remplie au niveau lvl ; zoomée de z */
function jbBouteille(c,x,y,h,lvl,z=1){ if(z<=0) return; const k=Math.min(1.15,z), H=h*k, W=H*.38, Y=y-(h-H)/2, col=H*.22, gou=W*.42;
  c.save(); c.lineJoin='round';
  const forme=()=>{ c.beginPath(); c.moveTo(x-W/2,Y); c.lineTo(x-W/2,Y-H+col+W*.5); c.quadraticCurveTo(x-W/2,Y-H+col,x-gou/2,Y-H+col*.6);
    c.lineTo(x-gou/2,Y-H); c.lineTo(x+gou/2,Y-H); c.lineTo(x+gou/2,Y-H+col*.6); c.quadraticCurveTo(x+W/2,Y-H+col,x+W/2,Y-H+col+W*.5); c.lineTo(x+W/2,Y); c.closePath(); };
  forme(); c.fillStyle='rgba(231,245,255,.14)'; c.fill();
  if(lvl>0){ c.save(); forme(); c.clip(); const hl=(H-col)*Math.min(1,lvl); c.fillStyle=JUS; c.fillRect(x-W/2,Y-hl,W,hl); c.restore(); }
  forme(); c.strokeStyle=VERRE; c.lineWidth=6; c.stroke();
  c.fillStyle='#2b8a3e'; c.fillRect(x-gou/2-4,Y-H-18*k,gou+8,20*k); c.restore(); }
/* Le bouchon (centre x, y), zoomé de z */
function jbBouchon(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.25,z), w=64*k, h=40*k;
  c.fillStyle='#2b8a3e'; c.strokeStyle='#0b3d1a'; c.lineWidth=4; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,8*k); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=3; for(let i=1;i<5;i++){ const xx=x-w/2+i*w/5; c.beginPath(); c.moveTo(xx,y-h/2+6); c.lineTo(xx,y+h/2-6); c.stroke(); } }
/* Le carton du livreur, ouvert (pied en x, y), zoomé de z */
function jbCarton(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.15,z), w=170*k, h=95*k, X=x-w/2, Y=y-h;
  pgPoly(c,[[X,Y],[X-34*k,Y-34*k],[X+30*k,Y-34*k],[X+42*k,Y]],'#a9743f','#5c3a1e',5);
  pgPoly(c,[[X+w,Y],[X+w+34*k,Y-34*k],[X+w-30*k,Y-34*k],[X+w-42*k,Y]],'#a9743f','#5c3a1e',5);
  c.fillStyle='#c08550'; c.strokeStyle='#5c3a1e'; c.lineWidth=5; c.fillRect(X,Y,w,h); c.strokeRect(X,Y,w,h);
  c.strokeStyle='#e9c46a'; c.lineWidth=8; c.beginPath(); c.moveTo(X+w/2,Y+4); c.lineTo(X+w/2,Y+h-4); c.stroke(); }
/* Le bon de livraison (en haut à gauche), zoomé de z */
const BN={x:120,y:70,w:340,h:300};
function jbBon(c,z=1){ if(z<=0) return; const k=Math.min(1.1,z), w=BN.w*k, h=BN.h*k, X=BN.x+(BN.w-w)/2, Y=BN.y+(BN.h-h)/2;
  c.fillStyle='#f8f9fa'; c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.roundRect(X,Y,w,h,14); c.fill(); c.stroke();
  c.strokeStyle='#ced4da'; c.lineWidth=6; c.lineCap='round';
  for(const [a,b,yy] of [[.12,.62,.16],[.12,.45,.28],[.12,.88,.82],[.12,.7,.92]]){ c.beginPath(); c.moveTo(X+w*a,Y+h*yy); c.lineTo(X+w*b,Y+h*yy); c.stroke(); } }

FILMS['coherence']=function(outils){
  const DUR={'00-accroche':6.81,'01-bon':7.55,'02-question':16.51,'02b-reponse':11.90,'03-ouf':5.00,'04-commentaire':7.01,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-bon':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bon,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tLivreur=mot('00-accroche','livreur'), tBouchon=mot('00-accroche','bouchon');
  const tBon=mot('01-bon','bon'), tCl=mot('01-bon','centilitre'), tTrompe=mot('01-bon','trompé');
  const tA=mot('02b-reponse','A'), t15r=mot('02b-reponse','1,5'), tFois=mot('02b-reponse','fois'), t100b=mot('02b-reponse','100',2),
        t150=mot('02b-reponse','150'), tCl2=mot('02b-reponse','centilitres',2), tGrande=mot('02b-reponse','grande'),
        tBouchonR=mot('02b-reponse','bouchon');
  const tRevient=mot('03-ouf','revient'), tVraie=mot('03-ouf','bouteille'), tSante=mot('03-ouf','Santé');
  const t08=mot('04-commentaire','0,8'), tLitre4=mot('04-commentaire','litre'), tCombien=mot('04-commentaire','combien'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Le')-.08, finR=t15r-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une bouteille de 0,8 L */
      jbBouteille(c,JB_X,JB_Y-40,400,.8,T>=t08?(T<t08+.5?zoom(T,t08,.3):1):0);
      if(T>=tLitre4) pgEtiquette(c,'0,8 L',JB_X,JB_Y-150,48*zoom(T,tLitre4,.4),CRAIE.blanc);
      if(T>=tLitre4) ecrire(c,'0,8 L',JB_XG,150,88*zoom(T,tLitre4,.4),CRAIE.blanc);
      if(T>=tCombien) ecrire(c,'= ? cL',JB_XG,290,88*zoom(T,tCombien,.4),CRAIE.jaune);
      tab.maj(); return; }

    /* la bouteille commandée : vide (en pointillé de verre) jusqu'à l'ouf, pleine quand le livreur revient */
    const plein=T>=ouf?Math.min(1,(T-tVraie)/.6):0;
    jbBouteille(c,JB_X,JB_Y,JB_H,T>=tVraie?plein:0,1);
    if(T<finR) pgEtiquette(c,'1,5 L',JB_X,JB_Y-170,52,CRAIE.blanc);
    else if(T<t150) pgEtiquette(c,'1,5 L',JB_X,JB_Y-170,52,CRAIE.blanc);
    else pgEtiquette(c,'150 cL',JB_X,JB_Y-170,48*zoom(T,t150,.4),CRAIE.ok);
    /* le carton et le bouchon : jusqu'à l'ouf */
    if(T<ouf){
      jbCarton(c,CT_X,CT_Y,T>=tLivreur?(T<tLivreur+.5?zoom(T,tLivreur,.3):1):0);
      jbBouchon(c,CT_X,CT_Y-170,T>=tBouchon?zoom(T,tBouchon,.5):0);
      if(T>=tBouchonR){ const u=Math.min(1,(T-tBouchonR)/.35); c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.lineCap='round';
        c.beginPath(); c.moveTo(CT_X-62,CT_Y-215); c.lineTo(CT_X-62+124*u,CT_Y-215+90*u); c.stroke();
        if(u>=1){ c.beginPath(); c.moveTo(CT_X+62,CT_Y-215); c.lineTo(CT_X-62,CT_Y-125); c.stroke(); } }
    }
    /* le bon de livraison : de « bon » jusqu'à la carte question */
    if(T>=tBon&&T<q){ jbBon(c,T<tBon+.5?zoom(T,tBon,.3):1);
      if(T>=tCl) ecrire(c,'1,5 cL',BN.x+BN.w/2,BN.y+BN.h*.55,84*zoom(T,tCl,.4),'#c92a2a');
      if(T>=tTrompe) cercle(c,BN.x+BN.w/2,BN.y+BN.h*.55,140,CRAIE.faux,(T-tTrompe)/.4); }
    if(T<finR){ tab.maj(); return; }

    /* après la carte : 1 L = 100 cL ; 1,5 × 100 = 150 cL */
    if(T<ouf){
      pgLigne(c,T,[['1 L = 100 cL',finR+.1]],JB_XG,120,64,CRAIE.blanc);
      pgLigne(c,T,[['1,5',finR+.1],['×',tFois],['100',t100b]],JB_XG,235,68,BASE5);
      pgLigne(c,T,[['= 150',t150],['cL',tCl2]],JB_XG,350,76,CRAIE.ok);
      if(T>=tGrande) coche(c,JB_X-250,JB_Y-330,.8*Math.min(1,(T-tGrande)/.3));
    } else {
      pgLigne(c,T,[['1,5 L = 150 cL',ouf]],JB_XG,120,62,CRAIE.ok);
      if(T>=tRevient) ecrire(c,'la vraie',JB_XG,250,66*zoom(T,tRevient,.3),CRAIE.blanc);
      if(T>=tVraie) ecrire(c,'bouteille',JB_XG,330,66*zoom(T,tVraie,.3),CRAIE.blanc);
      if(T>=tSante) ecrire(c,'Santé !',JB_X-260,JB_Y-60,76*zoom(T,tSante,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  /* Une ligne de légende faite de plusieurs morceaux (un nombre : sauter autant de marques) */
  function ditS(fn,parts){ const rs=[]; parts.forEach(p=>{ if(typeof p==='number') fn.saute(p); else rs.push(fn(p)); });
    return [rs[0][0],rs[rs.length-1][1],rs.map(x=>x[2]).join(' '),rs.flatMap(x=>x[3])]; }

  /* Les écrits : exactement ce que dit la voix (« 1,5 » a trois marques : on en saute une) */
  const a0=dit('00-accroche'), a1=dit('01-bon'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,ditS(a0,["J'ai commandé 1,5",1,'litre']),a0('de jus en ligne.'));
  const s0=suiteDe(bon,60,62,[a0("Le livreur m'apporte…"),a0('un bouchon.')]);
  const s1=suiteDe(q,60,62,[a1("Sur le bon, c'est écrit :"),ditS(a1,['1,5',1,'centilitre.'])],[a1("Quelqu'un s'est trompé"),a1('en convertissant !')]);
  qd('Question !');
  const phraseQ=[ditS(qd,['1,5',1,"litre, c'est combien"]),qd('de centilitres ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('1 litre = 100 centilitres.');
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[ditS(rd,['1,5',1,'× 100 :']),rd('150 centilitres.')],[rd('Une grande bouteille,'),rd('pas un bouchon !')]),
    ...suiteDe(com,60,62,[a3('Le livreur revient…'),a3('avec la vraie bouteille.')],[a3('Santé !')]),
    ...suiteDe(f,60,60,[ditS(a4,['À toi : 0,8',1,'litre,'])],[a4("c'est combien de centilitres ?")],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « cL » quand elle dit « centilitres » (le 1er est dans la question) */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="tpw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('cL',qm('centilitres',k))}`;
  const choixA=choixDe('150',2), choixB=choixDe('15',3), choixC=choixDe('1&nbsp;500',4);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.tpv${k}) .tpw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M70 215 L70 110 Q70 85 92 75 L92 45 L118 45 L118 75 Q140 85 140 110 L140 215 Z" fill="${JUS}" stroke="${VERRE}" stroke-width="5"/>`+
    `<rect x="88" y="32" width="34" height="14" fill="#2b8a3e"/>`+
    `<rect x="180" y="160" width="46" height="30" rx="6" fill="#2b8a3e" stroke="#0b3d1a" stroke-width="4"/>`+
    `<text x="275" y="175" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Mon jus livré<br>dans un bouchon ?'+PARI,mini);
  return { clips,FIN,titre:'Le jus dans un bouchon',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bon,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('150')],[choixB,tq('B'),tq('15',4)],[choixC,tq('C'),tq('500')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('tpv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<bon){ T<tBouchon?g.montre():g.oups(); }
      else if(T<q){ T<tTrompe?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.montre(); }
      else if(T<ouf){ T<tGrande?g.montre():g.fier(); }
      else if(T<com){ T<tSante?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
