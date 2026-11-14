/* ============================================================
   Série Aire CM2 — ÉPISODE 07 : LA TERRASSE EN DALLES. Outils : films/cm2-commun.js + cm2-aire.js.
   Ti Margo a 24 dalles carrées de 1 m de côté ; il les pose toutes, en rectangle, sur 4 m de large.
   4 dalles par rangée… combien de rangées ? 24 ÷ 4 = 6 rangées : la terrasse fait 6 m de long (C).
   Commentaire : 35 dalles de 1 m de côté, posées sur 5 m de large. Combien de mètres de long ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; la terrasse à gauche, à l'échelle (1 dalle de 1 m = DF_S px, rangée de 4 par rangée de 4),
   le texte à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const DF_S=80, DF_X=170, DF_Y=130, DF_XR=815;

/* Une flèche de cote (de x1,y1 à x2,y2), tracée de u = 0 à 1 */
function dfCote(c,x1,y1,x2,y2,u,coul=CRAIE.jaune){ if(u<=0) return; u=Math.min(1,u); const xb=x1+(x2-x1)*u, yb=y1+(y2-y1)*u;
  c.strokeStyle=coul; c.fillStyle=coul; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(xb,yb); c.stroke();
  const a=Math.atan2(y2-y1,x2-x1); for(const [px,py,aa] of [[x1,y1,a+Math.PI],[xb,yb,a]]){ c.beginPath();
    c.moveTo(px,py); c.lineTo(px-18*Math.cos(aa-.45),py-18*Math.sin(aa-.45)); c.lineTo(px-18*Math.cos(aa+.45),py-18*Math.sin(aa+.45)); c.closePath(); c.fill(); } }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function dfProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
/* Une rangée de n dalles (coin haut-gauche x, y), chaque dalle k grossit à partir de t0 + k·pas */
function dfRangee(c,T,x,y,n,t0,pas){ for(let i=0;i<n;i++) carreauCraie(c,x+i*DF_S,y,DF_S,zoom(T,t0+i*pas,.3)); }
/* Le hamac : deux poteaux, puis la toile rayée qui pend entre eux, tracés de u = 0 à 1 */
function dfHamac(c,x1,x2,y,u){ if(u<=0) return; u=Math.min(1,u); const h=210, k=Math.min(1,u/.5);
  c.fillStyle='#a0522d'; c.strokeStyle='#5c3a1a'; c.lineWidth=4;
  for(const x of [x1,x2]){ c.beginPath(); c.roundRect(x-12,y-h*k,24,h*k,6); c.fill(); c.stroke(); }
  if(u<.5) return; const v=(u-.5)/.5, yh=y-h+22, xm=(x1+x2)/2, haut=yh+40*v, bas=yh+95*v;
  c.save(); c.beginPath(); c.moveTo(x1+12,yh); c.quadraticCurveTo(xm,haut+40*v,x2-12,yh); c.quadraticCurveTo(xm,bas+70*v,x1+12,yh); c.closePath();
  c.fillStyle='#ff922b'; c.fill(); c.clip();
  c.strokeStyle='#ffd43b'; c.lineWidth=12; for(let i=-6;i<=6;i++){ c.beginPath(); c.moveTo(xm+i*34,yh-20); c.lineTo(xm+i*34,y); c.stroke(); }
  c.restore(); c.strokeStyle='#d9480f'; c.lineWidth=5; c.beginPath(); c.moveTo(x1+12,yh); c.quadraticCurveTo(xm,haut+40*v,x2-12,yh); c.quadraticCurveTo(xm,bas+70*v,x1+12,yh); c.stroke();
  c.strokeStyle='#f8f9fa'; c.lineWidth=3; for(const [a,b] of [[x1,x1+12],[x2,x2-12]]){ c.beginPath(); c.moveTo(a,yh-14); c.lineTo(b,yh); c.stroke(); } }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':9.24,'01-rangees':3.72,'02-question':13.44,'02b-reponse':14.56,'03-ouf':4.8,'04-commentaire':10.37,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 24 dalles », « 4 mètres »… ont deux marques (le nombre, puis le mot) : on les prend par leur rang */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-rangees',k), mq=k=>marque('02-question',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  const dfP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const tJe=m0(12), tLarg4=m0(18), t4=m0(19), t4m=m0(20), tLarge=m0(22);
  const tRangee=m1(3), tCombien=m1(5);
  const tC=mr(1), t24=mr(7), tDiv=mr(8), tPar4=mr(10), t6=mr(11), tFois6=mr(15), tFois=mr(16), tF4=mr(17), tF24=mr(18),
        t6m=mr(22), t6mm=mr(23), tLong=mr(25);
  const tFinie=m3(3), tHamac=m3(5);
  const c35=m4(2), c35d=m4(3), cCote=m4(8), cPose=m4(9), c5=m4(11), c5m=m4(12), cLarge=m4(14), cCombien=m4(15), cMetres=m4(17), tRep=m4(20);
  const finTitre=tJe-.08, finR=t24-.08;

  /* La terrasse : la cote du haut « 4 m », la 1re rangée, puis les 5 autres (k = 1…5 à partir de tk(k)) */
  function terrasse(c,T,tk){
    dfCote(c,DF_X,DF_Y-40,DF_X+4*DF_S,DF_Y-40,(T-t4)/(tLarge+.3-t4));
    if(T>=t4) dfProg(c,[[t4,'4'],[t4m,'4 m']],T,DF_X+2*DF_S,DF_Y-86,54,CRAIE.jaune);
    if(T>=ran) dfRangee(c,T,DF_X,DF_Y,4,ran+.1,.18);
    if(tk) for(let k=1;k<6;k++) dfRangee(c,T,DF_X,DF_Y+k*DF_S,4,tk(k),.05); }
  /* les 5 rangées qui manquent se posent pendant « 24 divisé par 4 », la dernière quand la voix dit « 6 » */
  const pasR=(t6-.15-tDiv)/4, tkR=k=>tDiv+(k-1)*pasR;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 35 dalles, 5 m de large */
      const X=150;
      if(T>=c35) dfProg(c,[[c35,'35'],[c35d,'35 dalles']],T,DF_XR,200,64,CRAIE.blanc);
      if(T>=cPose) dfRangee(c,T,X,DF_Y,5,cPose,.12);
      dfCote(c,X,DF_Y-40,X+5*DF_S,DF_Y-40,(T-c5)/(cLarge+.3-c5));
      if(T>=c5) dfProg(c,[[c5,'5'],[c5m,'5 m']],T,X+2.5*DF_S,DF_Y-86,54,CRAIE.jaune);
      if(T>=cCote){ const z=zoom(T,cCote,.4); carreauCraie(c,DF_XR-DF_S/2,250,DF_S,z); dfCote(c,DF_XR-DF_S/2,DF_S+275,DF_XR+DF_S/2,DF_S+275,1,CRAIE.blanc);
        ecrire(c,'1 m',DF_XR,DF_S+320,48*z,CRAIE.blanc); }
      if(T>=cCombien) ecrire(c,'?',X+2.5*DF_S,DF_Y+DF_S+190,200*zoom(T,cCombien,.6),CRAIE.jaune);
      if(T>=cMetres) ecrire(c,'? m',DF_XR,510,90*zoom(T,cMetres,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<finR){ /* l'accroche et la 1re rangée */
      ecrire(c,'24 dalles',DF_XR,190,64,CRAIE.blanc);
      carreauCraie(c,DF_XR-DF_S/2,250,DF_S); dfCote(c,DF_XR-DF_S/2,DF_S+275,DF_XR+DF_S/2,DF_S+275,1,CRAIE.blanc);
      ecrire(c,'1 m',DF_XR,DF_S+320,48,CRAIE.blanc);
      terrasse(c,T,null);
      if(T>=tRangee) ecrire(c,'4 par rangée',DF_XR,500,56*zoom(T,tRangee,.4),CRAIE.jaune);
      if(T>=tCombien) ecrire(c,'?',DF_X+2*DF_S,DF_Y+DF_S+190,200*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* la réponse : 24 ÷ 4 = 6 rangées ; 6 × 4 = 24 ; la terrasse fait 6 m de long ; puis le hamac */
    terrasse(c,T,tkR);
    dfProg(c,[[t24,'24'],[tDiv,'24 ÷'],[tPar4,'24 ÷ 4'],[t6,'24 ÷ 4 = 6']],T,DF_XR,180,64,T>=ouf?CRAIE.ok:CRAIE.jaune);
    if(T>=tFois6) dfProg(c,[[tFois6,'6'],[tFois,'6 ×'],[tF4,'6 × 4'],[tF24,'6 × 4 = 24']],T,DF_XR,280,58,CRAIE.blanc);
    if(T>=tF24+.3) coche(c,DF_XR+180,290,.36);
    dfCote(c,DF_X-40,DF_Y,DF_X-40,DF_Y+6*DF_S,(T-t6m)/(tLong+.3-t6m),CRAIE.ok);
    if(T>=t6m) dfProg(c,[[t6m,'6'],[t6mm,'6 m']],T,DF_X-118,DF_Y+3*DF_S,56,CRAIE.ok);
    if(T>=tHamac) dfHamac(c,DF_XR-150,DF_XR+150,640,(T-tHamac)/.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-rangees'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  const r3=dfP(mr,'24 ÷ 4 = 6 rangées.',[7,8,10,11,11,12]), r4=dfP(mr,'On vérifie : 6 × 4 = 24.',[13,14,14,15,16,17,18,18]),
        r5=dfP(mr,'La terrasse fait',[19,20,21]), r6=dfP(mr,'6 mètres de long.',[22,23,24,25]);
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0("J'ai 24 dalles carrées"),a0('de 1 mètre de côté'),a0('pour ma terrasse.')),
    ...suiteDe(ran,60,62,[a0('Je les pose toutes,'),a0('en rectangle,'),a0('sur 4 mètres de large.')]),
    ...suiteDe(q,60,62,[a1('4 dalles par rangée…')],[a1('mais combien de rangées ?')]),
    ...suiteDe(ouf,60,62,[r3],[r4],[r5,r6]),
    ...suiteDe(com,60,62,[a3('Ma terrasse est finie…')],[a3('Le hamac,'),a3("c'est pour demain !")]),
    ...suiteDe(f,60,60,[a4('À toi : 35 dalles'),a4('de 1 mètre de côté,')],[a4('posées sur 5 mètres'),a4('de large.')],
      [a4('Combien de mètres'),a4('de long ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres de long'),qd('fera ma terrasse ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte (elle reste au-dessus de la tête de Ti Margo) ; l'explication passe sur l'ardoise */
  const r1=dfP(mr,'24 dalles,',[2,3]), r2=dfP(mr,'4 par rangée…',[4,5,6]);
  /* Les choix s'écrivent au fil de la voix : « 20 », puis « 20 m » */
  const tq=k=>mq(k)-q;
  const ETAPES=[[[10,'20'],[11,'20 m']],[[13,'12'],[14,'12 m']],[[16,'6'],[17,'6 m']]];
  const choix=[['20 m',tq(9),tq(10)],['12 m',tq(12),tq(13)],['6 m',tq(15),tq(16)]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [k,e] of et) if(T>=mq(k)) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<text x="112" y="50" font-family="Segoe UI" font-weight="800" font-size="30" fill="#ffd43b" text-anchor="middle">4 m</text>`+
    [0,1,2,3].map(i=>`<rect x="${34+i*39}" y="64" width="37" height="37" rx="5" fill="#74c0fc" stroke="#1864ab" stroke-width="3"/>`).join('')+
    `<rect x="34" y="104" width="155" height="120" fill="none" stroke="#f8f9fa" stroke-width="3" stroke-dasharray="8 7"/>`+
    `<text x="112" y="196" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text>`+
    `<text x="262" y="110" font-family="Segoe UI" font-weight="800" font-size="56" fill="#f8f9fa" text-anchor="middle">24</text>`+
    `<text x="262" y="150" font-family="Segoe UI" font-weight="800" font-size="30" fill="#f8f9fa" text-anchor="middle">dalles</text></svg>`;
  poserMiniature(outils,acc+1,'24 dalles :<br>combien de long ?'+PARI,mini);
  return { clips,FIN,titre:'La terrasse en dalles',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ran,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<tLarg4?g.ouvre():g.montre(); }
      else if(T<q){ T<tCombien?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<tF24+.3?g.montre():g.fier(); }
      else if(T<com){ T<tFinie+.3?g.fier():(T<tHamac?g.ouvre():g.pouce()); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
