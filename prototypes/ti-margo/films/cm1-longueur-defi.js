/* ============================================================
   Série Longueurs CM1 — ÉPISODE 05 : LE CHEMIN DE LA PLAGE. Outils : films/cm1-commun.js + cm1-longueur.js.
   La plage est à 1 km ; Ti Margo a déjà marché 600 m. « 1 − 600… impossible ! »
   Même unité : 1 km = 1000 m ; 1000 − 600 = 400 : il reste 400 m (A). Il court jusqu'à la mer.
   Commentaire : une piste de 500 m, 3 tours : combien de mètres en tout ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le chemin en haut (à l'échelle : 1000 m = 810 px), le texte à droite, la piste à gauche
   (Ti Margo cache le bas du milieu) */
const CH={x0:90,x1:900,y:170}, CH_PX=(CH.x1-CH.x0)/1000, CH_X=m=>CH.x0+m*CH_PX;

FILMS['defi']=function(outils){
  fusionnerNombres();
  /* « un moins », « mille moins » : deux marques au même texte (« 1 moins », « 1 moins ») ; la 2e est le « moins » dit */
  { const CL=(window.CUES||{})[VIDEO]||{};
    for(const k of ['00-accroche','02b-reponse']){ const L=CL[k]; if(!L) continue;
      for(let i=1;i<L.length;i++) if(/^\d+ moins$/.test(L[i][1])&&L[i][1]===L[i-1][1]) L[i]=[L[i][0],'moins']; } }
  const DUR={'00-accroche':11.18,'01-unite':3.48,'02-question':15.05,'02b-reponse':7.15,'03-ouf':5.12,'04-commentaire':8.86,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJai=mot('00-accroche',"J'ai"), t600=mot('00-accroche','600'), t600m=mot('00-accroche','mètres',3),
        t1=mot('00-accroche','moins'), tMoins=mot('00-accroche','moins',2), t600b=mot('00-accroche','600',4),
        tImp=mot('00-accroche','impossible'), tPerdu=mot('00-accroche','perdu');
  const t1km=mot('01-unite','kilomètre',2), t1000=mot('01-unite','1000',2);
  const tA=mot('02b-reponse','A');
  const tO400=mot('03-ouf','400'), tOm=mot('03-ouf','mètres'), tMer=mot('03-ouf','mer'), tCours=mot('03-ouf','cours');
  const tPiste=mot('04-commentaire','piste'), t500=mot('04-commentaire','500',3), t3t=mot('04-commentaire','tours',2),
        tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJai-.08, XR=770;
  const lisse01=u=>u<=0?0:(u>=1?1:u*u*(3-2*u));

  /* La maison (départ) et la plage (arrivée), au bout du chemin */
  function maison(c,x,y){ c.lineJoin='round'; c.fillStyle='#ffc9c9'; c.strokeStyle=CRAIE.blanc; c.lineWidth=4;
    c.fillRect(x-26,y-30,52,44); c.strokeRect(x-26,y-30,52,44);
    c.fillStyle='#e03131'; c.beginPath(); c.moveTo(x-36,y-28); c.lineTo(x,y-62); c.lineTo(x+36,y-28); c.closePath(); c.fill(); c.stroke();
    c.fillStyle='#8a5a2b'; c.fillRect(x-8,y-10,16,24); }
  function plage(c,x,y,lueur=0){ c.fillStyle='#ffe066'; c.beginPath(); c.ellipse(x,y+14,78,26,0,Math.PI,0); c.fill();
    c.strokeStyle='#4dabf7'; c.lineWidth=7; c.lineCap='round';
    for(let k=0;k<2;k++){ c.beginPath(); for(let i=0;i<=40;i++){ const xx=x-70+i*3.5, yy=y+30+k*22+Math.sin(i*.6)*6; i?c.lineTo(xx,yy):c.moveTo(xx,yy); } c.stroke(); }
    c.fillStyle='#ffd43b'; c.beginPath(); c.arc(x+44,y-56,20+lueur*6,0,7); c.fill();
    if(lueur>0){ c.globalAlpha=.35*lueur; c.beginPath(); c.arc(x+44,y-56,40,0,7); c.fill(); c.globalAlpha=1; } }
  /* Ti Margo sur le chemin : un point jaune */
  function point(c,x,y){ c.fillStyle=CRAIE.jaune; c.strokeStyle='#1f3b2c'; c.lineWidth=4; c.beginPath(); c.arc(x,y,17,0,7); c.fill(); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une piste de 500 m, 3 tours */
      const cx=270, cy=330, rx=210, ry=130;
      if(T>=tPiste){ const z=zoom(T,tPiste,.4); c.save(); c.translate(cx,cy); c.scale(z,z);
        c.strokeStyle='#e8590c'; c.lineWidth=34; c.beginPath(); c.ellipse(0,0,rx,ry,0,0,7); c.stroke();
        c.strokeStyle=CRAIE.blanc; c.lineWidth=3; c.setLineDash([14,12]); c.beginPath(); c.ellipse(0,0,rx,ry,0,0,7); c.stroke(); c.setLineDash([]);
        c.restore(); }
      if(T>=t500) ecrire(c,'500 m',cx,cy,70*zoom(T,t500,.4),CRAIE.jaune);
      if(T>=t3t){ ecrire(c,'3 tours',cx,cy+215,64*zoom(T,t3t,.4),CRAIE.jaune);
        const u=Math.min(1,(T-t3t)/2.4)*3, a=-Math.PI/2+u*2*Math.PI; point(c,cx+rx*Math.cos(a),cy+ry*Math.sin(a));
        for(let k=0;k<3;k++) if(u>=k+1) ecrire(c,String(k+1),cx-70+k*70,cy+78,54,CRAIE.ok); }
      if(T>=tCombien) ecrire(c,'?',XR,330,220*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }

    /* le chemin de 1 km, à l'échelle : la part marchée (600 m, rose), puis le reste (400 m, vert d'eau) */
    const y=CH.y, x600=CH_X(600);
    maison(c,45,y+8); plage(c,970,y-10,T>=ouf&&T>=tMer?Math.min(1,(T-tMer)/.4):0);
    c.strokeStyle=CRAIE.gris; c.lineWidth=4; c.setLineDash([14,12]); c.beginPath(); c.roundRect(CH.x0,y-12,CH.x1-CH.x0,24,12); c.stroke(); c.setLineDash([]);
    const unite=T>=t1000;
    ecrire(c,unite?'1000 m':'1 km',(CH.x0+CH.x1)/2,y-62,(unite?56*zoom(T,t1000,.4):56),unite?CRAIE.ok:CRAIE.jaune);
    flecheLongueur(c,CH.x0,CH.x1,y-24,unite?CRAIE.ok:CRAIE.jaune,1,4);
    const u6=T>=t600?Math.min(1,(T-t600)/(t600m-t600+.05)):0;
    rubanCraie(c,CH.x0,y,x600-CH.x0,RUBAN,u6);
    if(T>=t600m) ecrire(c,'600 m',(CH.x0+x600)/2,y+60,52*zoom(T,t600m,.4),RUBAN);
    if(T>=ouf){ const u4=T>=tO400?Math.min(1,(T-tO400)/.55):0; rubanCraie(c,x600,y,CH.x1-x600,RUBAN4,u4);
      if(T>=tOm) ecrire(c,'400 m',(x600+CH.x1)/2,y+60,52*zoom(T,tOm,.4),RUBAN4); }
    /* Ti Margo avance avec le ruban, puis court jusqu'à la plage */
    if(T>=t600){ let px=CH.x0+(x600-CH.x0)*u6; if(T>=ouf&&T>=tCours) px=x600+(CH.x1-x600)*lisse01((T-tCours)/1.1); point(c,px,y); }

    if(T<uni){
      if(T>=t1) ecrire(c,'1',XR-175,330,104*zoom(T,t1,.4),CRAIE.faux);
      if(T>=tMoins) ecrire(c,'−',XR-75,330,96,CRAIE.blanc);
      if(T>=t600b) ecrire(c,'600',XR+95,330,104*zoom(T,t600b,.4),CRAIE.faux);
      if(T>=tImp) ecrire(c,'impossible !',XR,450,66*zoom(T,tImp,.4),CRAIE.faux);
      if(T>=tPerdu) ecrire(c,'perdu ?',XR,550,60*zoom(T,tPerdu,.4),CRAIE.gris);
    } else if(T<ouf){ /* la même unité : des mètres */
      if(T>=t1km) ecrire(c,'1 km',XR,330,90*zoom(T,t1km,.4),CRAIE.jaune);
      if(T>=t1000) ecrire(c,'= 1000 m',XR,450,90*zoom(T,t1000,.4),CRAIE.ok);
    } else { /* la réponse : 1000 − 600 = 400 m */
      ecrire(c,'1000 − 600',XR,330,74,CRAIE.ok);
      if(T>=tOm) ecrire(c,'= 400 m',XR,430,84*zoom(T,tOm,.4),CRAIE.ok); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-unite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Je vais à la plage :'),a0('elle est à 1 kilomètre.')),
    ...suiteDe(uni,60,60,[a0("J'ai déjà marché"),a0('600 mètres.')],[a0('1 − 600…'),a0('impossible !')],[a0('Je suis perdu ?')]),
    ...suiteDe(q,60,62,[a1('Attends : 1 kilomètre,'),a1("c'est 1000 mètres !")]),
    ...suiteDe(com,60,62,[a3('400 mètres…'),a3("et la mer m'attend !")],[a3('Allez, je cours !')]),
    ...suiteDe(f,60,60,[a4('À toi : une piste'),a4('de 500 mètres,')],[a4('3 tours.')],
      [a4('Combien de mètres'),a4('en tout ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres'),qd('me reste-t-il ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('1000 − 600 = 400 :'), r2=rd('il me reste 400 mètres.');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="160" width="270" height="22" rx="11" fill="none" stroke="#adb5bd" stroke-width="4" stroke-dasharray="10 8"/>`+
    `<rect x="30" y="160" width="162" height="22" rx="11" fill="#f472b6" stroke="#f8f9fa" stroke-width="3"/>`+
    `<text x="111" y="225" font-family="Segoe UI" font-weight="800" font-size="34" fill="#f472b6" text-anchor="middle">600 m</text>`+
    `<text x="165" y="70" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ffd43b" text-anchor="middle">1 km</text>`+
    `<text x="250" y="148" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1 km, déjà 600 m :<br>il reste combien ?'+PARI,mini);
  return { clips,FIN,titre:'Il reste combien ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['400 mètres',tq('A'),tq('400')],['599 mètres',tq('B'),tq('599')],['1600 mètres',tq('C'),tq('1600')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<t1?g.montre():g.oups(); }
      else if(T<q){ T<t1000?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tCours?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
