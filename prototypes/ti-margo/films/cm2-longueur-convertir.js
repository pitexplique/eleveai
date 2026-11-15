/* ============================================================
   Série Longueurs CM2 — ÉPISODE 02 : COMBIEN DE RUBAN ? Outils : films/cm2-commun.js + cm2-longueur.js.
   J'ai 2,5 m de ruban ; il faut 30 cm par cadeau. « 2,5 mètres… 25 centimètres. Pas même un cadeau ! »
   Je déroule le ruban : il traverse tout le salon. 2,5 × 100 = 250 cm (B) : 8 cadeaux (8 × 30 = 240), et 10 cm pour un nœud.
   Commentaire : 4,2 km, c'est combien de mètres ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le ruban à l'échelle (3,6 px par cm : 250 cm = 900 px, 30 cm = 108 px, 25 cm = 90 px),
   les dessins à gauche, le texte à droite (Ti Margo ne cache que le tout bas, à gauche du milieu) */

/* Les marques des cues, MOT PAR MOT : un nombre dit en plusieurs mots (« deux virgule cinq », « deux cent cinquante centimètres »)
   a une marque par mot dit, toutes au même texte. On n'en garde qu'une par mot ÉCRIT : le nombre à la fin de son dernier mot
   (jamais avant que la voix l'ait dit en entier), l'unité à la sienne. Renvoie de quoi remettre les marques d'origine
   (la bouche de Ti Margo, dans le socle, bouge sur tous les mots dits). */
function lgMotParMot(){ const CL=(window.CUES||{})[VIDEO]||{}, ORIG={};
  for(const k in CL){ ORIG[k]=CL[k]; const l=CL[k], res=[];
    for(let i=0;i<l.length;){ let j=i; while(j+1<l.length&&l[j+1][1]===l[i][1]) j++;
      const W=l[i][1].trim().split(/\s+/);
      if(W.length===1) res.push([l[j][0],W[0]]);
      else { res.push([l[Math.max(i,j-1)][0],W[0]]); res.push([l[j][0],W.slice(1).join(' ')]); }
      i=j+1; }
    CL[k]=res; }
  return ()=>{ for(const k in ORIG) CL[k]=ORIG[k]; }; }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé à gauche (ou centré sur sa forme finale) */
function lgProg(c,etapes,T,x,y,taille,coul,align='left'){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  if(align==='center'){ c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
  else ecrire(c,s,x,y,taille,coul,'left'); }

FILMS['convertir']=function(outils){
  const remettre=lgMotParMot();
  const DUR={'00-accroche':13.91,'01-deroule':3.73,'02-question':16.0,'02b-reponse':11.12,'03-ouf':4.08,'04-commentaire':7.04,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,der,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tIl=mot('00-accroche','Il'), t30=mot('00-accroche','30'), tCm30=mot('00-accroche','centimètres'), tPar=mot('00-accroche','par'),
        t25b=mot('00-accroche','2,5',2), tM25b=mot('00-accroche','mètres',2), t25=mot('00-accroche','25',3), tCm25=mot('00-accroche','centimètres',2),
        tPas=mot('00-accroche','Pas');
  const tDeroule=mot('01-deroule','déroule'), tTraverse=mot('01-deroule','traverse'), tSalon=mot('01-deroule','salon');
  const tB=mot('02b-reponse','B');
  const t8o=mot('03-ouf','8'), t10=mot('03-ouf','10'), tCm10=mot('03-ouf','centimètres'), tNoeud=mot('03-ouf','nœud'), tTete=mot('03-ouf','tête');
  const t42=mot('04-commentaire','4,2'), tKm=mot('04-commentaire','kilomètres'), tCombien=mot('04-commentaire','combien'),
        tMetres=mot('04-commentaire','mètres'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tIl-.08;

  const X0=78, PX=3.6, YR=330;
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  /* le rouleau de ruban (x, y = son centre) ; reste = la part encore enroulée (1 → plein, 0 → vide) */
  function rouleau(c,x,y,reste=1){ const R=26+30*reste; c.fillStyle=RUBAN; c.strokeStyle='#f8f9fa'; c.lineWidth=4;
    c.beginPath(); c.arc(x,y,R,0,7); c.fill(); c.stroke();
    c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=3; for(let k=1;k<4;k++){ if(26+k*9>R-4) break; c.beginPath(); c.arc(x,y,R-k*9,0,7); c.stroke(); }
    c.fillStyle='#e9ecef'; c.strokeStyle='#495057'; c.beginPath(); c.arc(x,y,20,0,7); c.fill(); c.stroke(); }
  /* un cadeau (x, y = son centre, s = son côté) */
  function cadeau(c,x,y,s,z=1){ if(z<=0) return; const k=Math.min(1.12,z), w=s*k; c.lineJoin='round';
    c.fillStyle='#4dabf7'; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.fillRect(x-w/2,y-w/2,w,w); c.strokeRect(x-w/2,y-w/2,w,w);
    c.fillStyle=RUBAN; c.fillRect(x-w*.09,y-w/2,w*.18,w); c.fillRect(x-w/2,y-w*.09,w,w*.18);
    noeud(c,x,y-w/2,w*.32); }
  /* un nœud de ruban (x, y = son centre, s = sa demi-largeur) */
  function noeud(c,x,y,s){ c.fillStyle=RUBAN; c.strokeStyle='#f8f9fa'; c.lineWidth=3;
    for(const d of [-1,1]){ c.beginPath(); c.moveTo(x,y); c.lineTo(x+d*s,y-s*.6); c.lineTo(x+d*s,y+s*.6); c.closePath(); c.fill(); c.stroke(); }
    c.beginPath(); c.arc(x,y,s*.25,0,7); c.fill(); c.stroke(); }
  /* un drapeau (x, y = le pied du mât) */
  function drapeau(c,x,y,coul){ c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-120); c.stroke();
    c.fillStyle=coul; c.beginPath(); c.moveTo(x,y-120); c.lineTo(x+62,y-100); c.lineTo(x,y-80); c.closePath(); c.fill(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 4,2 km, c'est combien de mètres ? */
      if(T>=t42){ const u=deroule(T,t42,.8); drapeau(c,120,560,'#ffd43b'); if(u>=1) drapeau(c,900,560,'#ff8787');
        c.strokeStyle=CRAIE.blanc; c.lineWidth=8; c.setLineDash([22,16]); c.beginPath(); c.moveTo(120,560); c.lineTo(120+780*u,560); c.stroke(); c.setLineDash([]); }
      lgProg(c,[[t42,'4,2'],[tKm,'4,2 km']],T,530,480,80,CRAIE.jaune,'center');
      if(T>=tCombien) ecrire(c,'4,2 km =',400,220,90*zoom(T,tCombien,.4),CRAIE.blanc);
      if(T>=tMetres) ecrire(c,'? m',720,220,90*zoom(T,tMetres,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<der){ /* l'accroche : le rouleau de 2,5 m ; 30 cm par cadeau ; « 2,5 m = 25 cm » ; pas même un cadeau */
      rouleau(c,130,140); ecrire(c,'2,5 m',210,140,70,CRAIE.jaune,'left');
      if(T>=t30){ cadeau(c,130,290,84,zoom(T,t30,.4)); rubanCraie(c,210,290,30*PX,RUBAN,deroule(T,t30,.4),24); }
      lgProg(c,[[t30,'30'],[tCm30,'30 cm']],T,345,290,60,CRAIE.jaune);
      if(T>=tPar) ecrire(c,'par cadeau',535,290,54*zoom(T,tPar,.4),CRAIE.gris,'left');
      lgProg(c,[[t25b,'2,5'],[tM25b,'2,5 m']],T,80,440,66,CRAIE.jaune);
      lgProg(c,[[t25,'= 25'],[tCm25,'= 25 cm ?']],T,280,440,66,CRAIE.faux);
      /* le bout de 25 cm, à la même échelle que les 30 cm du cadeau (le pointillé) */
      if(T>=tCm25){ c.strokeStyle=CRAIE.gris; c.lineWidth=3; c.setLineDash([10,8]); c.beginPath(); c.roundRect(210,568,30*PX,24,12); c.stroke(); c.setLineDash([]);
        rubanCraie(c,210,580,25*PX,RUBAN,deroule(T,tCm25,.4),24); }
      if(T>=tPas){ const u=deroule(T,tPas,.4); cadeau(c,130,580,70); c.strokeStyle=CRAIE.faux; c.lineWidth=9; c.lineCap='round';
        c.beginPath(); c.moveTo(92,542); c.lineTo(92+76*u,542+76*u); c.stroke();
        ecrire(c,'pas même un cadeau !',360,580,52*zoom(T,tPas,.4),CRAIE.faux,'left'); }
      tab.maj(); return; }
    if(T<q){ /* je déroule le ruban : il traverse tout le salon (250 cm à l'échelle) ; à côté, les « 25 cm » */
      const u=deroule(T,tDeroule,tSalon+.3-tDeroule);
      rubanCraie(c,X0,YR,250*PX,RUBAN,u,30);
      rouleau(c,X0+250*PX*u,YR-58,1-u);
      ecrire(c,'2,5 m',X0,140,70,CRAIE.jaune,'left');
      if(T>=tSalon) ecrire(c,'tout le salon !',700,140,62*zoom(T,tSalon,.4),CRAIE.jaune);
      rubanCraie(c,X0,470,25*PX,RUBAN,1,24); ecrire(c,'25 cm ?',X0+25*PX+24,470,56,CRAIE.faux,'left');
      tab.maj(); return; }
    /* la réponse : 2,5 m = 250 cm ; 8 morceaux de 30 cm ; 10 cm pour un nœud */
    ecrire(c,'2,5 m = 250 cm',528,140,72,CRAIE.ok);
    rubanCraie(c,X0,YR,250*PX,RUBAN,1,30);
    for(let k=1;k<=8;k++){ const tk=ouf+.05+(k-1)*.09; if(T<tk) continue; const x=X0+k*30*PX;
      c.strokeStyle=CRAIE.blanc; c.lineWidth=5; c.beginPath(); c.moveTo(x,YR-30); c.lineTo(x,YR+30); c.stroke();
      ecrire(c,String(k),x-15*PX,YR+62,42*zoom(T,tk,.4),CRAIE.ok); }
    ecrire(c,'8 × 30 = 240 cm',X0,480,60,CRAIE.ok,'left');
    lgProg(c,[[t10,'10'],[tCm10,'10 cm']],T,X0+245*PX,YR-70,44,CRAIE.jaune,'center');
    if(T>=tNoeud) noeud(c,X0+245*PX,YR-122,34*Math.min(1.12,zoom(T,tNoeud,.5)));
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-deroule'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0("J'ai 2,5 mètres"),a0('de ruban pour emballer'),a0('mes cadeaux.')),
    ...suiteDe(der,60,60,[a0('Il faut 30 centimètres'),a0('par cadeau.')],[a0('2,5 mètres…'),a0('25 centimètres.')],[a0('Pas même un cadeau !')]),
    ...suiteDe(q,60,62,[a1('Je déroule le ruban…')],[a1('il traverse'),a1('tout le salon !')]),
    ...suiteDe(com,60,62,[a3('8 cadeaux…')],[a3('et 10 centimètres'),a3('pour un nœud'),a3('sur ma tête !')]),
    ...suiteDe(f,60,60,[a4('À toi : 4,2 kilomètres,')],[a4("c'est combien"),a4('de mètres ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de centimètres'),qd('de ruban ai-je ?')];
  const mq=(m,n=1)=>mot('02-question',m,n), tq=(m,n=1)=>mq(m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('2,5 × 100 :'), r2=rd('250 centimètres.'), r3=rd('Assez pour 8 cadeaux,'), r4=rd('car 8 × 30 = 240.');
  /* Les choix s'écrivent au fil de la voix : « 25 », puis « 25 centimètres » */
  const ETAPES=[[[mq('25'),'25'],[mq('centimètres',2),'25 centimètres']],[[mq('250'),'250'],[mq('centimètres',3),'250 centimètres']],
    [[mq('205'),'205'],[mq('centimètres',4),'205 centimètres']]];
  const choix=[['25 centimètres',tq('A'),tq('25')],['250 centimètres',tq('B'),tq('250')],['205 centimètres',tq('C'),tq('205')]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [t,e] of et) if(T>=t) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<circle cx="70" cy="80" r="42" fill="${RUBAN}" stroke="#f8f9fa" stroke-width="4"/><circle cx="70" cy="80" r="15" fill="#e9ecef" stroke="#495057" stroke-width="3"/>`+
    `<rect x="70" y="112" width="220" height="22" rx="11" fill="${RUBAN}" stroke="#f8f9fa" stroke-width="3"/>`+
    `<rect x="40" y="160" width="62" height="62" fill="#4dabf7" stroke="#f8f9fa" stroke-width="4"/><rect x="65" y="160" width="12" height="62" fill="${RUBAN}"/><rect x="40" y="185" width="62" height="12" fill="${RUBAN}"/>`+
    `<text x="225" y="225" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'2,5 m de ruban<br>= ? cm'+PARI,mini);
  remettre();
  return { clips,FIN,titre:'Combien de ruban ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,der,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<der){ T<tPas?g.montre():g.oups(); }
      else if(T<q){ T<tTraverse?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tTete?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
