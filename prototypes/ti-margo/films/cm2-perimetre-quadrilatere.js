/* ============================================================
   Série Périmètre CM2 — ÉPISODE 03 : DEUX TOURS DE BASKET. Outils : films/cm2-commun.js + cm2-perimetre.js.
   Le coach demande à Ti Margo 2 tours du terrain de basket (28 m sur 15 m). Il calcule 28 + 15 = 43 m
   et croit que c'est un tour : 2 tours = 86 m… Mais 28 + 15, c'est la moitié du tour !
   Un tour : 43 × 2 = 86 m ; deux tours : 86 × 2 = 172 m (A). Commentaire : un terrain carré de 20 m, 3 tours.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le terrain à gauche, le calcul à droite (Ti Margo cache le bas du milieu).
   Échelle : 14 px par mètre, terrain de x = 150 à 542 (28 m = 392 px, 15 m = 210 px ; le carré du défi, 20 m = 280 px).
   Sommets : 0 en haut à gauche, 1 en haut à droite, 2 en bas à droite, 3 en bas à gauche. */
const PXM=14, XT=150, YT=200;
const TER=[[XT,YT],[XT+28*PXM,YT],[XT+28*PXM,YT+15*PXM],[XT,YT+15*PXM]];
const CAR=[[150,170],[150+20*PXM,170],[150+20*PXM,170+20*PXM],[150,170+20*PXM]];
const PARQUET='#4dabf7', PARQUET_B='#1864ab';

/* Les lignes blanches du terrain de basket : ligne médiane, rond central, les deux raquettes et les paniers */
function lignesBasket(c,pts,z=1){ if(z<=0) return; const [x0,y0]=pts[0], [x1,y1]=pts[2], w=x1-x0, h=y1-y0, cx=x0+w/2, cy=y0+h/2;
  c.save(); c.globalAlpha=Math.min(1,z); c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=4;
  c.beginPath(); c.moveTo(cx,y0); c.lineTo(cx,y1); c.stroke();
  c.beginPath(); c.arc(cx,cy,h*.17,0,7); c.stroke();
  const rw=w*.2, rh=h*.36;
  c.strokeRect(x0,cy-rh/2,rw,rh); c.strokeRect(x1-rw,cy-rh/2,rw,rh);
  c.beginPath(); c.arc(x0+rw,cy,rh/2,-Math.PI/2,Math.PI/2); c.stroke();
  c.beginPath(); c.arc(x1-rw,cy,rh/2,Math.PI/2,3*Math.PI/2); c.stroke();
  c.strokeStyle='#ff6b6b'; c.lineWidth=5;
  c.beginPath(); c.arc(x0+w*.06,cy,9,0,7); c.stroke(); c.beginPath(); c.arc(x1-w*.06,cy,9,0,7); c.stroke();
  c.restore(); }
/* Un côté en pointillés (ce qu'il reste à parcourir) */
function pointilles(c,a,b,coul=CRAIE.faux,lw=12){ c.save(); c.setLineDash([24,20]); c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round';
  c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); c.restore(); }
/* Le coureur sur le tour (u de 0 à 1 = un tour complet depuis le sommet 0 ; au-delà de 1, il repart) */
function coureur(c,pts,u){ u=Math.max(0,u)%1; const P=[...pts,pts[0]]; let tot=0;
  for(let k=1;k<P.length;k++) tot+=Math.hypot(P[k][0]-P[k-1][0],P[k][1]-P[k-1][1]);
  let reste=tot*u, x=P[0][0], y=P[0][1];
  for(let k=1;k<P.length;k++){ const [ax,ay]=P[k-1],[bx,by]=P[k], l=Math.hypot(bx-ax,by-ay);
    if(reste<=l){ x=ax+(bx-ax)*reste/l; y=ay+(by-ay)*reste/l; break; } reste-=l; x=bx; y=by; }
  c.fillStyle='#ffd43b'; c.strokeStyle='#e67700'; c.lineWidth=5; c.beginPath(); c.arc(x,y,20,0,7); c.fill(); c.stroke(); }
/* Un grand verre d'eau, à la craie */
function verreCraie(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.2,z), w=90*k, h=130*k;
  c.save(); c.fillStyle='rgba(116,192,252,.75)'; c.beginPath(); c.moveTo(x-w/2+8*k,y-h/2+34*k); c.lineTo(x+w/2-8*k,y-h/2+34*k); c.lineTo(x+w/2-16*k,y+h/2); c.lineTo(x-w/2+16*k,y+h/2); c.closePath(); c.fill();
  c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.lineJoin='round'; c.beginPath(); c.moveTo(x-w/2,y-h/2); c.lineTo(x-w/2+16*k,y+h/2); c.lineTo(x+w/2-16*k,y+h/2); c.lineTo(x+w/2,y-h/2); c.stroke();
  c.restore(); }

FILMS['quadrilatere']=function(outils){
  const DUR={'00-accroche':7.93,'01-calcul':10.4,'02-question':16.57,'02b-reponse':15.31,'03-ouf':4.96,'04-commentaire':8.92,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTer=mot('00-accroche','terrain',2), t28=mot('00-accroche','28'), t15=mot('00-accroche','15');
  const tMoi=mot('01-calcul','Moi'), t28p=mot('01-calcul','28'), t15p=mot('01-calcul','15'), t43=mot('01-calcul','43'),
        tDonc=mot('01-calcul','Donc'), t2t=mot('01-calcul','2'), t86=mot('01-calcul','86'), tFac=mot('01-calcul','Facile');
  const tOuf172=mot('03-ouf','172'), tBes=mot('03-ouf','besoin'), tVerre=mot('03-ouf','verre');
  const tTerD=mot('04-commentaire','carré'), t20=mot('04-commentaire','20'), tComb=mot('04-commentaire','Combien'),
        t3t=mot('04-commentaire','3'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Le',2)-.08, XR=880;
  const H43=t28p, D43=t43-t28p; /* la moitié du tour se trace pendant « 28 plus 15 » */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un terrain carré de 20 m de côté, 3 tours */
      if(T>=tTerD){ polyCraie(c,CAR,zoom(T,tTerD,.3),PARQUET,PARQUET_B); }
      if(T>=t20) coteCraie(c,CAR,0,'20 m',zoom(T,t20,.4),CRAIE.jaune,56);
      if(T>=tComb) ecrire(c,'?',XR,420,200*zoom(T,tComb,.6),CRAIE.jaune);
      if(T>=t3t) ecrire(c,'3 tours',XR,230,72*zoom(T,t3t,.4),TOUR);
      tab.maj(); return; }
    if(T>=tTer){ polyCraie(c,TER,zoom(T,tTer,.3),PARQUET,PARQUET_B); lignesBasket(c,TER,(T-tTer)/.4); }
    if(T<ouf){
      if(T>=t28) coteCraie(c,TER,0,'28 m',zoom(T,t28,.4));
      if(T>=t15) coteCraie(c,TER,1,'15 m',zoom(T,t15,.4),CRAIE.jaune,46,96);
      /* Ti Margo additionne : le haut puis la droite, la moitié du tour seulement */
      if(T>=H43){ const u=Math.min(.5,(T-H43)/D43*.5); tourPoly(c,TER,u,TOUR,14); if(T<tDonc) coureur(c,TER,u); }
      /* « 28 + » puis « 15 », chacun quand la voix le dit */
      if(T>=t28p){ c.font='800 62px "Segoe UI"'; const w1=c.measureText('28 + ').width, w2=c.measureText('15').width, x0=XR-(w1+w2)/2;
        ecrire(c,'28 +',x0,210,62,CRAIE.blanc,'left'); if(T>=t15p) ecrire(c,'15',x0+w1,210,62,CRAIE.blanc,'left'); }
      if(T>=t43) ecrire(c,'= 43 m',XR,300,64*zoom(T,t43,.4),CRAIE.blanc);
      if(T>=t2t) ecrire(c,'2 tours :',XR,440,62*zoom(T,t2t,.4),CRAIE.jaune);
      if(T>=t86) ecrire(c,'86 m',XR,530,66*zoom(T,t86,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* la réponse : le tour complet, 86 m, et 2 tours = 172 m */
    tourPoly(c,TER,1,TOUR,14);
    coteCraie(c,TER,0,'28 m'); coteCraie(c,TER,2,'28 m');
    coteCraie(c,TER,1,'15 m',1,CRAIE.jaune,46,96); coteCraie(c,TER,3,'15 m',1,CRAIE.jaune,46,96);
    ecrire(c,'1 tour : 86 m',XR,200,46,CRAIE.blanc);
    if(T>=tOuf172) ecrire(c,'2 tours :',XR,330,60*zoom(T,tOuf172,.25),CRAIE.ok);
    if(T>=tOuf172) ecrire(c,'172 m',XR,420,72*zoom(T,tOuf172,.3),CRAIE.ok);
    if(T>=tVerre) verreCraie(c,XR,570,zoom(T,tVerre,.4));
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Le coach me dit :'),a0('fais 2 tours du terrain'),a0('de basket !')),
    ...suiteDe(cal,60,62,[a0('Le terrain mesure'),a0('28 mètres sur 15 mètres.')]),
    ...suiteDe(q,60,62,[a1('Moi, je calcule vite :')],[a1('28 + 15 : 43 mètres.')],
      [a1('Donc 2 tours :'),a1('86 mètres. Facile !')]),
    ...suiteDe(com,60,62,[a3('172 mètres…')],[a3('J’ai besoin'),a3('d’un grand verre d’eau !')]),
    ...suiteDe(f,60,60,[a4('À toi : un terrain carré'),a4('de 20 mètres de côté.')],
      [a4('Combien de mètres'),a4('pour 3 tours ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres'),qd('Ti Margo court-il vraiment,'),qd('pour 2 tours ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('28 + 15, c’est seulement'), r2=rd('la moitié du tour.'),
    r3=rd('Un tour : 43 × 2, 86 mètres.'), r4=rd('Deux tours : 86 × 2, 172 mètres.');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="30" y="80" width="180" height="96" fill="#4dabf7" stroke="#1864ab" stroke-width="6"/>`+
    `<line x1="120" y1="80" x2="120" y2="176" stroke="#fff" stroke-width="3"/><circle cx="120" cy="128" r="16" fill="none" stroke="#fff" stroke-width="3"/>`+
    `<polyline points="30,80 210,80 210,176" fill="none" stroke="#ff922b" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`+
    `<text x="270" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'2 tours de basket :<br>86 m ?'+PARI,mini);
  return { clips,FIN,titre:'Deux tours de basket',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['172 mètres',tq('A'),tq('172')],['86 mètres',tq('B'),tq('86')],['420 mètres',tq('C'),tq('420')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cal) g.montre();
      else if(T<q){ T<t28p?g.reflechit():(T<tFac?g.montre():g.fier()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tBes?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
