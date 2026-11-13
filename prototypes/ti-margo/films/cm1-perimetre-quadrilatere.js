/* ============================================================
   Série Périmètre CM1 — ÉPISODE 02 : LA MOITIÉ DU TOUR. Outils : films/cm1-commun.js + cm1-perimetre.js.
   Le maître demande à Ti Margo de faire le tour du terrain en comptant ses pas : 20 pas de long, 10 de large.
   Il compte 20 + 10 = 30 pas… mais ce n'est que la moitié du tour ! 20 + 10 + 20 + 10 = 60 (C).
   Commentaire : un terrain carré de 15 pas de côté.
   ============================================================ */
/* Le terrain sur l'ardoise : 20 pas sur 10 pas, 15 px par pas, à gauche (Ti Margo cache le bas du milieu).
   Sommets : 0 en haut à gauche, 1 en haut à droite, 2 en bas à droite, 3 en bas à gauche. */
const TER=[[170,220],[470,220],[470,370],[170,370]];
const TER_DEFI=[[200,180],[500,180],[500,480],[200,480]];
const HERBE='#69db7c', HERBE_B='#2b8a3e';

/* Un côté en pointillés (ce qu'il reste à parcourir) */
function pointilles(c,a,b,coul=CRAIE.faux,lw=12){ c.save(); c.setLineDash([24,20]); c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round';
  c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); c.restore(); }
/* Le petit bonhomme qui marche sur le tour (u de 0 à 1 = le tour complet depuis le sommet 0) */
function marcheur(c,pts,u){ u=Math.max(0,Math.min(1,u)); const P=[...pts,pts[0]]; let tot=0;
  for(let k=1;k<P.length;k++) tot+=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);
  let reste=tot*u, x=P[0][0], y=P[0][1];
  for(let k=1;k<P.length;k++){ const [ax,ay]=P[k-1],[bx,by]=P[k], l=Math.hypot(bx-ax,by-ay);
    if(reste<=l){ x=ax+(bx-ax)*reste/l; y=ay+(by-ay)*reste/l; break; } reste-=l; x=bx; y=by; }
  c.fillStyle='#ffd43b'; c.strokeStyle='#e67700'; c.lineWidth=5; c.beginPath(); c.arc(x,y,20,0,7); c.fill(); c.stroke(); }

FILMS['quadrilatere']=function(outils){
  const DUR={'00-accroche':10.02,'01-moitie':7.83,'02-question':15.46,'02b-reponse':6.93,'03-ouf':4.63,'04-commentaire':8.97,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,moi,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTer=mot('00-accroche','terrain'), tComp=mot('00-accroche','comptant'), t20=mot('00-accroche','20'),
        t10=mot('00-accroche','10'), t20p=mot('00-accroche','20',3), t30=mot('00-accroche','30'), tFini=mot('00-accroche','fini');
  const tRig=mot('01-moitie','rigole'), tMoit=mot('01-moitie','moitié'), tReste=mot('01-moitie','reste'),
        tGrand=mot('01-moitie','grand'), tPetit=mot('01-moitie','petit');
  const tOuf60=mot('03-ouf','60'), tSpag=mot('03-ouf','spaghetti');
  const tTerD=mot('04-commentaire','terrain'), t15=mot('04-commentaire','15'),
        tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tComp-.08, XR=880;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un terrain carré de 15 pas de côté */
      if(T>=tTerD) polyCraie(c,TER_DEFI,zoom(T,tTerD,.3),HERBE,HERBE_B);
      if(T>=t15) coteCraie(c,TER_DEFI,0,'15 pas',zoom(T,t15,.4),CRAIE.jaune,56);
      if(T>=tComb) ecrire(c,'?',XR,370,220*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tTer) polyCraie(c,TER,zoom(T,tTer,.3),HERBE,HERBE_B);
    if(T<ouf){
      if(T>=t20) coteCraie(c,TER,0,'20 pas',zoom(T,t20,.4));
      if(T>=t10) coteCraie(c,TER,1,'10 pas',zoom(T,t10,.4),CRAIE.jaune,46,96);
      /* Ti Margo compte : 20 + 10, la moitié du tour, et s'arrête */
      if(T>=t20p){ const u=Math.min(.5,(T-t20p)/1.6*.5); tourPoly(c,TER,u,TOUR,14); if(T<moi) marcheur(c,TER,u); }
      if(T>=t20p) ecrire(c,'20 + 10',XR,250,58,CRAIE.blanc);
      if(T>=t30) ecrire(c,'= 30 pas',XR,340,62*zoom(T,t30,.4),CRAIE.ok);
      if(T>=moi){ /* la petite sœur : il reste un grand côté et un petit côté */
        if(T>=tMoit) ecrire(c,'la moitié !',XR,470,56*zoom(T,tMoit,.4),CRAIE.faux);
        if(T>=tReste){ pointilles(c,TER[2],TER[3]); pointilles(c,TER[3],TER[0]); }
        if(T>=tGrand) coteCraie(c,TER,2,'20 pas',zoom(T,tGrand,.4),CRAIE.faux);
        if(T>=tPetit) coteCraie(c,TER,3,'10 pas',zoom(T,tPetit,.4),CRAIE.faux,46,96); }
      tab.maj(); return; }
    /* la réponse : tout le tour, 60 pas */
    tourPoly(c,TER,1,TOUR,14);
    coteCraie(c,TER,0,'20 pas'); coteCraie(c,TER,2,'20 pas');
    coteCraie(c,TER,1,'10 pas',1,CRAIE.jaune,46,96); coteCraie(c,TER,3,'10 pas',1,CRAIE.jaune,46,96);
    ecrire(c,'30 × 2',XR,250,58,CRAIE.blanc);
    if(T>=tOuf60-.05) ecrire(c,'= 60 pas',XR,340,62*zoom(T,tOuf60,.4),CRAIE.ok);
    if(T>=tOuf60+.3) coche(c,XR-60,470,.6);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-moitie'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Le maître me demande'),a0('de faire le tour'),a0('du terrain')),
    ...suiteDe(moi,60,62,[a0('en comptant mes pas.')],[a0('20 pas de long,'),a0('10 pas de large.')],
      [a0('20 + 10 : 30 pas,'),a0("c'est fini !")]),
    ...suiteDe(q,60,62,[a1('Ma petite sœur rigole :')],[a1("tu n'as fait que"),a1('la moitié du tour !')],
      [a1('Il reste un grand côté'),a1('et un petit côté.')]),
    ...suiteDe(com,60,62,[a3('Ouf ! 60 pas…')],[a3("j'ai des jambes"),a3('en spaghetti !')]),
    ...suiteDe(f,60,60,[a4('À toi : un terrain carré'),a4('de 15 pas de côté.')],
      [a4('Combien de pas'),a4('pour en faire le tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('20 + 10, + 20, + 10 :'),qd('combien de pas'),qd('pour tout le tour ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('30 pas pour la moitié,'), r2=rd('× 2 : 60 pas'), r3=rd('pour tout le tour.');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="34" y="70" width="170" height="110" fill="#69db7c" stroke="#2b8a3e" stroke-width="6"/>`+
    `<polyline points="34,70 204,70 204,180" fill="none" stroke="#ff922b" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`+
    `<text x="268" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Tout le tour :<br>30 pas ?'+PARI,mini);
  return { clips,FIN,titre:'La moitié du tour',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,moi,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['30',tq('A'),tq('30')],['200',tq('B'),tq('200')],['60',tq('C'),tq('60')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<moi){ T<t20p?g.montre():g.fier(); }
      else if(T<q){ T<tRig?g.fier():(T<tReste?g.oups():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tSpag?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
