/* ============================================================
   Série Aire 5e — ÉPISODE 01 : LA PIZZA CARRÉE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-aire.js.
   Ma pizza est carrée : 20 cm sur 20. Celle de mon frère est un rectangle : 25 cm sur 16. « La mienne est plus
   longue, donc plus grande ! » Réponse B : 20 × 20 = 400 cm², 25 × 16 = 400 cm² : même aire. On partage les deux.
   Commentaire : une pizza de 30 cm sur 10.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : 16 px par centimètre ; la pizza carrée à gauche, la rectangle à droite.
   Les longueurs au-dessus, les hauteurs sur cartouche DANS la pizza (pas de place sur les côtés) ; le bas du milieu est à Ti Margo */
const PZ_U=16, PZ_C=[100,130], PZ_R=[520,162], PZ_XR=800;
const PZ_CROUTE='#e9a35b', PZ_CROUTE_B='#9c5a1c', PZ_SAUCE='#d9480f', PZ_FROMAGE='#ffe066', PZ_PEPP='#a61e1e';
/* Une pizza rectangulaire de w × h cm, coin haut-gauche (x, y) ; z = zoom d'apparition ; coupe = 0 à 1 (le trait du partage) */
function pzPizza(c,x,y,w,h,z=1,coupe=0,graine=1){ if(z<=0) return; const k=Math.min(1.2,z), W=w*PZ_U*k, H=h*PZ_U*k;
  const cx=x+w*PZ_U/2, cy=y+h*PZ_U/2, X=cx-W/2, Y=cy-H/2;
  c.fillStyle=PZ_CROUTE; c.strokeStyle=PZ_CROUTE_B; c.lineWidth=6; c.beginPath(); c.roundRect(X,Y,W,H,22*k); c.fill(); c.stroke();
  c.fillStyle=PZ_SAUCE; c.beginPath(); c.roundRect(X+16*k,Y+16*k,W-32*k,H-32*k,14*k); c.fill();
  /* le fromage et les rondelles, à des places fixes (graine) */
  let s=graine*9301+49297; const r=()=>{ s=(s*9301+49297)%233280; return s/233280; };
  c.fillStyle=PZ_FROMAGE; for(let i=0;i<Math.round(w*h/18);i++){ const px=X+28*k+r()*(W-56*k), py=Y+28*k+r()*(H-56*k);
    c.beginPath(); c.ellipse(px,py,14*k,9*k,r()*3,0,7); c.fill(); }
  c.fillStyle=PZ_PEPP; for(let i=0;i<Math.round(w*h/45);i++){ const px=X+36*k+r()*(W-72*k), py=Y+36*k+r()*(H-72*k);
    c.beginPath(); c.arc(px,py,12*k,0,7); c.fill(); }
  if(coupe>0){ const u=Math.min(1,coupe); c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.setLineDash([16,10]);
    c.beginPath(); c.moveTo(cx,Y-14); c.lineTo(cx,Y-14+(H+28)*u); c.stroke(); c.setLineDash([]); } }
/* Une flèche double le long d'un côté, tracée de u = 0 à 1 */
function pzFleche(c,x1,y1,x2,y2,u,coul){ if(u<=0) return; u=Math.min(1,u); const X=x1+(x2-x1)*u, Y=y1+(y2-y1)*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(X,Y); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1), p=(px,py,b)=>{ c.beginPath(); c.moveTo(px,py); c.lineTo(px-26*Math.cos(b-.45),py-26*Math.sin(b-.45));
    c.lineTo(px-26*Math.cos(b+.45),py-26*Math.sin(b+.45)); c.closePath(); c.fill(); };
  p(x1,y1,a+Math.PI); if(u>=1) p(X,Y,a); }

FILMS['comprendre']=function(outils){
  const DUR={'00-accroche':8.94,'01-dispute':6.65,'02-question':14.15,'02b-reponse':12.22,'03-ouf':3.13,'04-commentaire':8.17,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 20 centimètres » a deux marques : la 1re = « vingt », la 2e = « centimètres » ; « 20 cm » s'écrit à la 2e */
  const tCarree=mot('00-accroche','carrée'), t20a=mot('00-accroche','centimètres',2), t20b=mot('00-accroche','20',3),
        tRect=mot('00-accroche','rectangle'), t25=mot('00-accroche','centimètres',4), t16=mot('00-accroche','16'),
        tCelle=mot('00-accroche','Celle');
  const tLongue=mot('01-dispute','longue'), tGrande=mot('01-dispute','grande'), tCompte=mot('01-dispute','compte');
  const tB=mot('02b-reponse','B'), tFoisR=mot('02b-reponse','fois',2), t400a=mot('02b-reponse','carrés'),
        tSienne=mot('02b-reponse','sienne'), t25R=mot('02b-reponse','25'), tFoisR2=mot('02b-reponse','fois',4),
        t400b=mot('02b-reponse','400',4), tMeme=mot('02b-reponse','Même');
  const tPartage=mot('03-ouf','partage');
  const tPizza4=mot('04-commentaire','pizza'), t30=mot('04-commentaire','centimètres',2), t10=mot('04-commentaire','10'),
        tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tCelle-.08, finR=mot('02b-reponse','La')-.08;

  const [cx,cy]=PZ_C, [rx,ry]=PZ_R, CW=20*PZ_U, RW=25*PZ_U, RH=16*PZ_U;
  function pizzas(c,T,coupe=0){
    if(T>=tCarree) pzPizza(c,cx,cy,20,20,T<tCarree+.5?zoom(T,tCarree,.3):1,coupe,1);
    if(T>=t20a) ecrire(c,'20 cm',cx+CW/2,cy-40,50*zoom(T,t20a,.4),BASE5);
    if(T>=t20b) pgEtiquette(c,'20 cm',cx+78,cy+62,44*zoom(T,t20b,.4),BASE5);
    if(T>=tRect) pzPizza(c,rx,ry,25,16,T<tRect+.5?zoom(T,tRect,.3):1,coupe,2);
    if(T>=t25) ecrire(c,'25 cm',rx+RW/2,ry-40,50*zoom(T,t25,.4),BASE5);
    if(T>=t16) pgEtiquette(c,'16 cm',rx+RW-78,ry+58,44*zoom(T,t16,.4),BASE5); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une pizza de 30 cm sur 10 */
      const x=110, y=250;
      if(T>=tPizza4) pzPizza(c,x,y,30,10,T<tPizza4+.5?zoom(T,tPizza4,.3):1,0,3);
      if(T>=t30) ecrire(c,'30 cm',x+15*PZ_U,y-40,50*zoom(T,t30,.4),BASE5);
      if(T>=t10) ecrire(c,'10 cm',x+30*PZ_U+70,y+5*PZ_U,46*zoom(T,t10,.4),BASE5);
      if(T>=tQuelle) ecrire(c,'? cm²',PZ_XR,170,96*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    if(T<q){ /* l'histoire : les deux pizzas, « la mienne est plus longue », on compte */
      pizzas(c,T);
      pzFleche(c,rx+6,ry+RH+34,rx+RW-6,ry+RH+34,(T-tLongue)/.5,CRAIE.jaune);
      if(T>=tGrande) ecrire(c,'plus grande ?',rx+RW/2,ry+RH+86,46*zoom(T,tGrande,.3),CRAIE.jaune);
      if(T>=tCompte) ecrire(c,'?',(cx+CW+rx)/2+4,cy+CW/2,110*zoom(T,tCompte,.4),CRAIE.blanc);
      tab.maj(); return; }

    /* la réponse (après la carte) : 400 cm² sous chacune, le signe « = » ; puis le partage */
    pizzas(c,T,T>=ouf?(T-tPartage)/.5:0);
    pgEtiquette(c,'400 cm²',cx+CW/2,cy+CW/2,52,CRAIE.jaune);
    if(T<ouf){
      pgLigne(c,T,[['25',t25R],['×',tFoisR2],['16',tFoisR2+.25]],rx+RW/2,ry+RH+50,52,CRAIE.blanc);
      if(T>=t400b) pgEtiquette(c,'400 cm²',rx+RW/2,ry+RH/2,52*zoom(T,t400b,.4),CRAIE.jaune);
      if(T>=tMeme) ecrire(c,'=',(cx+CW+rx)/2+4,cy+CW/2,110*zoom(T,tMeme,.4),CRAIE.ok);
    } else pgEtiquette(c,'400 cm²',rx+RW/2,ry+RH/2,52,CRAIE.jaune);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-dispute'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Ma pizza est carrée :'),a0('20 centimètres sur 20.'));
  const s0=suiteDe(dis,60,62,[a0('Celle de mon frère'),a0('est un rectangle :')],[a0('25 centimètres sur 16.')]);
  const s1=suiteDe(q,60,62,[a1('Il dit : la mienne'),a1('est plus longue,')],[a1('donc plus grande !')],
    [a1('Moi, je dis :'),a1('on compte !')]);
  qd('Question !');
  const phraseQ=[qd('Quelle pizza a'),qd('la plus grande aire ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Ma pizza : 20 × 20,'), r2=rd('400 centimètres carrés.');
  r1[3][4]=tFoisR; /* le signe « × » paraît quand la voix dit « fois » */
  const r3=rd('La sienne : 25 × 16,'); r3[3][4]=tFoisR2;
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[r3,rd('400 aussi.')],[rd('Même aire !')]),
    ...suiteDe(com,60,62,[a3('Égalité…'),a3('alors on partage les deux !')]),
    ...suiteDe(f,60,60,[a4('À toi : une pizza'),a4('de 30 centimètres sur 10.')],
      [a4('Quelle est son aire ?')],[a4('Réponds en commentaire !')])
  ];

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="60" width="120" height="120" rx="14" fill="${PZ_CROUTE}" stroke="${PZ_CROUTE_B}" stroke-width="5"/><rect x="40" y="70" width="100" height="100" rx="9" fill="${PZ_SAUCE}"/>`+
    `<rect x="170" y="78" width="140" height="88" rx="14" fill="${PZ_CROUTE}" stroke="${PZ_CROUTE_B}" stroke-width="5"/><rect x="180" y="88" width="120" height="68" rx="9" fill="${PZ_SAUCE}"/>`+
    `<text x="165" y="232" font-family="Segoe UI" font-weight="800" font-size="56" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quelle pizza<br>est la plus grande ?'+PARI,mini);
  return { clips,FIN,titre:'La pizza carrée',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['la pizza rectangle',tq('A'),tq('rectangle')],['la même aire',tq('B'),tq('aire',2)],['la pizza carrée',tq('C'),tq('carrée')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis){ T<tRect?g.montre():g.ouvre(); }
      else if(T<q){ T<tCompte?g.oups():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.fier(); }
      else if(T<ouf){ T<tMeme?g.montre():g.fier(); }
      else if(T<com){ T<tPartage?g.ouvre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
