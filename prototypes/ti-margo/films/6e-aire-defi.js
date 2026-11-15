/* ============================================================
   Série Aire 6e — ÉPISODE 04 (défi) : LA PIZZA GÉANTE. Outils : films/6e-commun.js + 6e-aire.js.
   Une pizza carrée de 20 cm de côté coûte 8 € ; une de 40 cm coûte 16 €. Le double de côté, le double de prix ?
   Ti Margo pose des petites pizzas sur la grande : 2 rangées de 2, 4 petites pizzas (A).
   20 × 20 = 400 cm² ; 40 × 40 = 1 600 cm² : 4 fois plus. Pour 16 €, 4 pizzas au prix de 2.
   Commentaire : une pizza carrée de 30 cm de côté ; combien de pizzas de 10 cm de côté tiennent dedans ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; la grande pizza à gauche, la colonne de texte à droite (Ti Margo cache le bas du milieu).
   À l'échelle : 1 cm = PZ_K px (la petite = 20 cm, la grande = 40 cm, celles du défi 30 cm et 10 cm) */
const PZ_K=11, PZ_X=80, PZ_Y=150, PZ_XR=815, PZ_PX=PZ_XR-110, PZ_PY=150;

/* Une pizza carrée (coin haut-gauche x, y ; côté s), qui grossit depuis son centre quand z va de 0 à 1 */
function pzPizza(c,x,y,s,z=1){ if(z<=0) return; const k=Math.min(1.25,z), d=s*(1-k)/2; x+=d; y+=d; s*=k;
  c.fillStyle='#d9a05b'; c.strokeStyle='#8a5a2b'; c.lineWidth=Math.max(3,s*.022); c.beginPath(); c.roundRect(x+2,y+2,s-4,s-4,s*.09); c.fill(); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.roundRect(x+s*.08,y+s*.08,s*.84,s*.84,s*.05); c.fill();
  c.fillStyle='#ffe066'; c.beginPath(); c.roundRect(x+s*.12,y+s*.12,s*.76,s*.76,s*.04); c.fill();
  /* des taches de sauce sous le fromage */
  c.fillStyle='rgba(224,49,49,.55)'; for(const [u,v,r] of [[.42,.4,.05],[.62,.62,.045],[.3,.6,.035],[.68,.4,.03]]){ c.beginPath(); c.arc(x+u*s,y+v*s,r*s,0,7); c.fill(); }
  /* le saucisson */
  for(const [u,v] of [[.3,.3],[.7,.28],[.5,.52],[.28,.72],[.72,.72]]){ c.fillStyle='#c92a2a'; c.strokeStyle='#862e2e'; c.lineWidth=Math.max(2,s*.012);
    c.beginPath(); c.arc(x+u*s,y+v*s,s*.075,0,7); c.fill(); c.stroke();
    c.fillStyle='rgba(255,255,255,.35)'; c.beginPath(); c.arc(x+u*s-s*.02,y+v*s-s*.02,s*.018,0,7); c.fill(); }
  /* les olives noires */
  c.strokeStyle='#212529'; c.lineWidth=Math.max(2,s*.016); for(const [u,v] of [[.5,.24],[.26,.5],[.76,.5],[.5,.8]]){ c.beginPath(); c.arc(x+u*s,y+v*s,s*.028,0,7); c.stroke(); }
  /* le basilic */
  c.fillStyle='#2f9e44'; for(const [u,v,a] of [[.42,.68,.6],[.6,.4,-.5],[.36,.4,2.2]]){ c.beginPath(); c.ellipse(x+u*s,y+v*s,s*.045,s*.022,a,0,7); c.fill(); } }
/* Une flèche de cote (de x1,y1 à x2,y2), tracée de u = 0 à 1 */
function pzCote(c,x1,y1,x2,y2,u,coul=CRAIE.jaune){ if(u<=0) return; u=Math.min(1,u); const xb=x1+(x2-x1)*u, yb=y1+(y2-y1)*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(xb,yb); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1); for(const [px,py,aa] of [[x1,y1,a+Math.PI],[xb,yb,a]]){ c.beginPath();
    c.moveTo(px,py); c.lineTo(px-18*Math.cos(aa-.45),py-18*Math.sin(aa-.45)); c.lineTo(px-18*Math.cos(aa+.45),py-18*Math.sin(aa+.45)); c.closePath(); c.fill(); } }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function pzProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
/* Un texte cerné de vert ardoise (lisible posé sur une pizza) */
function pzEcrit(c,s,x,y,taille,coul){ c.font=`800 ${taille}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle';
  c.lineWidth=Math.max(8,taille*.16); c.lineJoin='round'; c.strokeStyle='#1f3b2c'; c.strokeText(s,x,y); ecrire(c,s,x,y,taille,coul); }
/* L'étiquette de prix (centre x, y), qui grossit quand z va de 0 à 1 */
function pzPrix(c,s,x,y,z=1,taille=62){ if(z<=0) return; const k=Math.min(1.25,z); c.font=`800 ${taille*k}px "Segoe UI"`;
  const w=c.measureText(s).width+40*k, h=taille*k*1.3; c.fillStyle='#fff9db'; c.strokeStyle='#e67700'; c.lineWidth=6;
  c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,h/2); c.fill(); c.stroke(); ecrire(c,s,x,y+2,taille*k,'#d9480f'); }
/* La glace du dessert (centre x, bas by), qui grossit quand z va de 0 à 1 */
function pzGlace(c,x,by,z=1){ if(z<=0) return; const k=Math.min(1.25,z);
  c.fillStyle='#e8a849'; c.strokeStyle='#8a5a2b'; c.lineWidth=5; c.beginPath(); c.moveTo(x-50*k,by-130*k); c.lineTo(x+50*k,by-130*k); c.lineTo(x,by); c.closePath(); c.fill(); c.stroke();
  for(const [dx,dy,r,f] of [[-28,-150,40,'#f783ac'],[28,-150,40,'#d0bfff'],[0,-195,42,'#fff3bf']]){ c.fillStyle=f; c.strokeStyle='#495057'; c.lineWidth=4;
    c.beginPath(); c.arc(x+dx*k,by+dy*k,r*k,0,7); c.fill(); c.stroke(); }
  c.fillStyle='#e03131'; c.beginPath(); c.arc(x,by-240*k,13*k,0,7); c.fill(); }
const pzLisse=u=>u<=0?0:(u>=1?1:u*u*(3-2*u));

FILMS['defi']=function(outils){
  const DUR={'00-accroche':12.65,'01-ranger':5.13,'02-question':9.68,'02b-reponse':17.22,'03-ouf':4.6,'04-commentaire':10.93,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,marque}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 20 centimètres », « 400 centimètres », « 1 600 »… ont plusieurs marques (le nombre, puis le mot) : on les prend par leur rang */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-ranger',k), mq=k=>marque('02-question',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  const pzP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const t20=m0(4), t20c=m0(5), t8=m0(9), t8e=m0(10), tUne2=m0(11), t40=m0(13), t40c=m0(14), t16=m0(16), t16e=m0(17),
        tDouble=m0(19), tCote=m0(21), tDouble2=m0(23), tPrix=m0(25), tPareil=m0(27);
  const tPose=m1(1), tGrande=m1(7), tCombien=m1(10);
  const tA=mr(1), tRang=mr(2), tRang2=mr(3), tDe2=mr(5), t4p=mr(6), t4pp=mr(7),
        t20f=mr(9), t20x=mr(10), t20b=mr(11), t400=mr(12), tCar=mr(15), t40f=mr(16), t40x=mr(17), t40b=mr(18), t1600=mr(19), t600=mr(20), tCents=mr(21),
        t4f=mr(22), t4x=mr(23), tPlus=mr(24), tPour=mr(25), t16r=mr(26), t16re=mr(27), t4pz=mr(31), t4pzz=mr(32), tAu=mr(33), tPrixR=mr(34), tDe=mr(35), tDe2b=mr(36);
  const tGrandeO=m3(3), tEt=m3(4), tPlace=m3(9), tDessert=m3(12);
  const c30=m4(6), c30c=m4(7), cCombien=m4(10), c10=m4(14), c10c=m4(15), cDedans=m4(19), tRep=m4(20);
  const finTitre=tUne2-.08, finR=tRang-.08;

  const S=20*PZ_K, G=40*PZ_K; /* la petite (20 cm) et la grande (40 cm), en px */
  /* Les 4 places des petites sur la grande, rangée par rangée */
  const PLACES=[[PZ_X,PZ_Y],[PZ_X+S,PZ_Y],[PZ_X,PZ_Y+S],[PZ_X+S,PZ_Y+S]];
  /* La k-ième petite glisse de la colonne de droite vers sa place, de t0 à t1 */
  function glisse(c,T,k,t0,t1){ if(T<t0) return; const u=pzLisse((T-t0)/(t1-t0)), [x,y]=PLACES[k];
    pzPizza(c,PZ_PX+(x-PZ_PX)*u,PZ_PY+(y-PZ_PY)*u,S); }
  /* La grande pizza, sa cote « 40 cm » ; avec ou sans son prix */
  function grande(c,T,prix=true,pizza=true){ if(pizza) pzPizza(c,PZ_X,PZ_Y,G,zoom(T,t40,.4));
    pzCote(c,PZ_X,PZ_Y-40,PZ_X+G,PZ_Y-40,(T-t40)/(t40c+.3-t40));
    pzProg(c,[[t40,'40'],[t40c,'40 cm']],T,PZ_X+G/2,PZ_Y-86,54,CRAIE.jaune);
    if(prix&&T>=t16) pzPrix(c,T>=t16e?'16 €':'16',PZ_X+G/2,PZ_Y+G/2,zoom(T,t16,.4)); }
  /* Le contour blanc de la grande, par-dessus les petites (pour qu'on voie qu'elles la remplissent) */
  const contour=c=>{ c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.setLineDash([18,12]); c.strokeRect(PZ_X-4,PZ_Y-4,G+8,G+8); c.setLineDash([]); };
  /* Un « ? » cerné, posé sur une place vide */
  const pzQ=(c,x,y,z)=>{ if(z>0) pzEcrit(c,'?',x,y,130*Math.min(1.25,z),CRAIE.jaune); };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une pizza de 30 cm ; combien de pizzas de 10 cm dedans ? */
      const X=110, Y=170, Gd=30*PZ_K, Sd=10*PZ_K, XR=PZ_XR;
      if(T>=c30) pzPizza(c,X,Y,Gd,zoom(T,c30,.4));
      pzCote(c,X,Y-40,X+Gd,Y-40,(T-c30)/(c30c+.3-c30));
      pzProg(c,[[c30,'30'],[c30c,'30 cm']],T,X+Gd/2,Y-86,54,CRAIE.jaune);
      if(T>=c10) pzPizza(c,XR-Sd/2,Y,Sd,zoom(T,c10,.4));
      pzCote(c,XR-Sd/2,Y-40,XR+Sd/2,Y-40,(T-c10)/(c10c+.3-c10));
      pzProg(c,[[c10,'10'],[c10c,'10 cm']],T,XR,Y-86,54,CRAIE.jaune);
      if(T>=cCombien) pzQ(c,X+Gd/2,Y+Gd/2,zoom(T,cCombien,.6));
      if(T>=cDedans) ecrire(c,'combien ?',XR,Y+Sd+90,60*zoom(T,cDedans,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ran){ /* l'accroche : la petite (20 cm, 8 €) à droite, la grande (40 cm, 16 €) à gauche */
      pzPizza(c,PZ_PX,PZ_PY,S,zoom(T,t20,.4));
      pzCote(c,PZ_PX,PZ_PY-40,PZ_PX+S,PZ_PY-40,(T-t20)/(t20c+.3-t20));
      pzProg(c,[[t20,'20'],[t20c,'20 cm']],T,PZ_XR,PZ_PY-86,54,CRAIE.jaune);
      if(T>=t8) pzPrix(c,T>=t8e?'8 €':'8',PZ_XR,PZ_PY+S+70,zoom(T,t8,.4));
      if(T>=t40) grande(c,T);
      if(T>=tDouble) pzProg(c,[[tDouble,'× 2'],[tCote,'côté × 2']],T,PZ_XR,530,52,CRAIE.blanc);
      if(T>=tDouble2) pzProg(c,[[tDouble2,'× 2'],[tPrix,'prix × 2']],T,PZ_XR,605,52,CRAIE.blanc);
      if(T>=tPareil) ecrire(c,'?',PZ_XR+180,568,110*zoom(T,tPareil,.5),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* on pose les petites sur la grande ; puis les aires ; puis le prix */
      grande(c,T,false,T<t4p); /* l'étiquette « 16 € » passe à droite ; la grande disparaît sous les 4 petites */
      if(T>=tPose) contour(c);
      glisse(c,T,0,tPose,tGrande);
      if(T<finR){ /* 01-ranger : le rappel des prix ; « combien ? » sur les places vides */
        if(T>=tCombien) for(let k=1;k<4;k++) pzQ(c,PLACES[k][0]+S/2,PLACES[k][1]+S/2,zoom(T,tCombien+(k-1)*.12,.6));
        ecrire(c,'20 cm : 8 €',PZ_XR,250,52,CRAIE.blanc);
        ecrire(c,'40 cm : 16 €',PZ_XR,330,52,CRAIE.blanc);
        tab.maj(); return; }
      /* 2 rangées de 2 : les 3 autres petites se posent */
      glisse(c,T,1,tRang,tRang2+.25); glisse(c,T,2,tDe2-.35,tDe2+.25); glisse(c,T,3,tDe2-.05,t4p);
      if(T<tPour){
        pzProg(c,[[t4p,'4'],[t4pp,'4 petites']],T,PZ_XR,70,58,CRAIE.jaune);
        pzProg(c,[[t20f,'20'],[t20x,'20 ×'],[t20b,'20 × 20']],T,PZ_XR,175,56,CRAIE.blanc);
        pzProg(c,[[t400,'= 400'],[tCar,'= 400 cm²']],T,PZ_XR,245,56,CRAIE.blanc);
        pzProg(c,[[t40f,'40'],[t40x,'40 ×'],[t40b,'40 × 40']],T,PZ_XR,355,56,CRAIE.ok);
        pzProg(c,[[t1600,'= 1'],[t600,'= 1 600'],[tCents,'= 1 600 cm²']],T,PZ_XR,425,56,CRAIE.ok);
        if(T>=t4f) pzProg(c,[[t4f,'4'],[t4x,'4 fois'],[tPlus,'4 fois plus !']],T,PZ_XR,535,64,CRAIE.jaune);
      } else { /* le prix : pour 16 €, 4 pizzas au prix de 2 */
        if(T>=t16r) pzPrix(c,T>=t16re?'16 €':'16',PZ_XR,110,zoom(T,t16r,.4),70);
        pzProg(c,[[t4pz,'4'],[t4pzz,'4 pizzas']],T,PZ_XR,240,64,CRAIE.ok);
        pzProg(c,[[tAu,'au'],[tPrixR,'au prix'],[tDe,'au prix de'],[tDe2b,'au prix de 2']],T,PZ_XR,330,56,CRAIE.blanc);
        if(T>=tDe2b+.3) coche(c,PZ_XR-65,450,.5);
      }
      tab.maj(); return; }
    /* 03-ouf : la grande choisie… et plus de place pour le dessert */
    grande(c,T,false,false); PLACES.forEach(([x,y])=>pzPizza(c,x,y,S)); contour(c);
    if(T>=tGrandeO) pzEcrit(c,'la grande !',PZ_X+G/2,PZ_Y+G/2,64*zoom(T,tGrandeO,.4),CRAIE.ok);
    if(T>=tDessert){ pzGlace(c,PZ_XR,560,zoom(T,tDessert,.4));
      if(T>=tDessert+.35){ const u=Math.min(1,(T-tDessert-.35)/.3); c.strokeStyle=CRAIE.faux; c.lineWidth=14; c.lineCap='round';
        c.beginPath(); c.moveTo(PZ_XR-90,300); c.lineTo(PZ_XR-90+180*u,300+260*u); c.stroke();
        if(u>=1){ const v=Math.min(1,(T-tDessert-.65)/.3); if(v>0){ c.beginPath(); c.moveTo(PZ_XR+90,300); c.lineTo(PZ_XR+90-180*v,300+260*v); c.stroke(); } } } }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-ranger'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Une pizza carrée'),a0('de 20 centimètres de côté'),a0('coûte 8 euros.')),
    ...suiteDe(ran,60,62,[a0('Une de 40 centimètres'),a0('coûte 16 euros.')],[a0('Le double de côté,'),a0('le double de prix…')],[a0("c'est pareil, non ?")]),
    ...suiteDe(q,60,62,[a1('Je pose des petites pizzas'),a1('sur la grande,')],[a1('pour voir combien'),a1('il en tient.')]),
    ...suiteDe(ouf,60,62,[pzP(mr,'2 rangées de 2 :',[2,3,4,5,5]),pzP(mr,'4 petites pizzas.',[6,7,8])],
      [pzP(mr,'20 × 20 = 400 cm² ;',[9,10,11,12,12,15,15])],
      [pzP(mr,'40 × 40 = 1 600 :',[16,17,18,19,19,20,20]),pzP(mr,'4 fois plus.',[22,23,24])],
      [pzP(mr,'Pour 16 €, la grande,',[25,26,27,28,29]),pzP(mr,"c'est 4 pizzas au prix de 2 !",[30,31,32,33,34,35,36,36])]),
    ...suiteDe(com,60,62,[a3("J'ai choisi la grande…")],[a3("et je n'ai plus de place"),a3('pour le dessert !')]),
    ...suiteDe(f,60,60,[a4('À toi : une pizza carrée'),a4('de 30 centimètres de côté.')],
      [a4('Combien de pizzas'),a4('de 10 centimètres de côté'),a4('tiennent dedans ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de petites pizzas'),qd('tiennent dans la grande ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const tq=k=>mq(k)-q;
  const choix=[['4',tq(9),tq(10)],['2',tq(11),tq(12)],['8',tq(13),tq(14)]];

  /* La miniature : la grande (40 cm) à moitié remplie de petites (20 cm) ; un « ? » sur le reste */
  const pzSvg=(x,y,s)=>`<rect x="${x+1}" y="${y+1}" width="${s-2}" height="${s-2}" rx="${s*.09}" fill="#d9a05b" stroke="#8a5a2b" stroke-width="2"/>`+
    `<rect x="${x+s*.1}" y="${y+s*.1}" width="${s*.8}" height="${s*.8}" rx="${s*.05}" fill="#ffe066" stroke="#e03131" stroke-width="${s*.04}"/>`+
    [[.3,.3],[.7,.3],[.5,.55],[.3,.75],[.72,.74]].map(([u,v])=>`<circle cx="${x+u*s}" cy="${y+v*s}" r="${s*.075}" fill="#c92a2a" stroke="#862e2e" stroke-width="1"/>`).join('')+
    [[.5,.24],[.26,.52],[.76,.52]].map(([u,v])=>`<circle cx="${x+u*s}" cy="${y+v*s}" r="${s*.03}" fill="none" stroke="#212529" stroke-width="1.5"/>`).join('')+
    [[.42,.7,35],[.6,.4,-30]].map(([u,v,a])=>`<ellipse cx="${x+u*s}" cy="${y+v*s}" rx="${s*.05}" ry="${s*.025}" fill="#2f9e44" transform="rotate(${a} ${x+u*s} ${y+v*s})"/>`).join('');
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<text x="110" y="46" font-family="Segoe UI" font-weight="800" font-size="28" fill="#ffd43b" text-anchor="middle">40 cm</text>`+
    `<rect x="40" y="58" width="140" height="140" fill="#3b5e48" stroke="#f8f9fa" stroke-width="3" stroke-dasharray="8 6"/>`+pzSvg(40,58,70)+
    `<text x="145" y="172" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text>`+
    `<text x="262" y="84" font-family="Segoe UI" font-weight="800" font-size="28" fill="#ffd43b" text-anchor="middle">20 cm</text>`+pzSvg(227,98,70)+
    `<text x="262" y="215" font-family="Segoe UI" font-weight="800" font-size="34" fill="#f8f9fa" text-anchor="middle">8 €</text></svg>`;
  poserMiniature(outils,acc+1,'Pizza de 40 cm :<br>combien de 20 cm ?'+PARI,mini);
  return { clips,FIN,titre:'La pizza géante',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ran,q,r,finR,tPour,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<tDouble?g.montre():(T<tPareil?g.ouvre():g.reflechit()); }
      else if(T<q){ T<tCombien?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<tPlus+.3?g.montre():(T<tPour?g.oups():(T<tDe2b?g.ouvre():g.fier())); }
      else if(T<com){ T<tEt?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
