/* ============================================================
   Série Périmètre CM1 — ÉPISODE 04 : LA COURSE D'ESCARGOTS. Outils : films/cm1-commun.js + cm1-perimetre.js.
   Ti Margo a 20 m de ruban pour faire une piste en triangle à ses escargots. Deux côtés : 8 m et 7 m.
   8 + 7 = 15 ; le reste du ruban va au dernier côté : 20 − 15 = 5 m (A). Les escargots partent… lentement.
   Commentaire : un ruban de 30 m, un triangle avec deux côtés de 10 et 12 m. Combien pour le troisième ?
   ============================================================ */
/* La piste sur l'ardoise (1056 × 720), à gauche (Ti Margo cache le bas du milieu), 62 px par mètre, à l'échelle :
   côté 0 = 8 m (en bas), côté 1 = 5 m (à droite, celui qui manque), côté 2 = 7 m (à gauche) */
const PISTE=[[50,560],[546,560],[391,292]];
/* Le défi : 10 m en bas, 8 m à droite (à trouver), 12 m à gauche ; 40 px par mètre */
const PISTE_DEFI=[[70,560],[470,560],[430,242]];
/* Un escargot à la craie : (x, y) = le bas du corps, s = la taille, u = sa tête qui dodeline */
function escargot(c,x,y,s=1,coq='#f59f00',u=0){ const k=s;
  c.fillStyle='#c0eb75'; c.strokeStyle='#5c940d'; c.lineWidth=4*k; c.beginPath(); c.ellipse(x,y-9*k,40*k,10*k,0,0,7); c.fill(); c.stroke();
  const hx=x+34*k, hy=y-16*k+Math.sin(u)*2*k; c.beginPath(); c.arc(hx,hy,11*k,0,7); c.fill(); c.stroke();
  c.strokeStyle='#5c940d'; c.lineWidth=3*k; c.beginPath(); c.moveTo(hx+2*k,hy-9*k); c.lineTo(hx+6*k,hy-30*k); c.moveTo(hx+8*k,hy-7*k); c.lineTo(hx+18*k,hy-26*k); c.stroke();
  c.fillStyle='#212529'; [[hx+6*k,hy-30*k],[hx+18*k,hy-26*k]].forEach(([a,b])=>{ c.beginPath(); c.arc(a,b,4*k,0,7); c.fill(); });
  c.fillStyle=coq; c.strokeStyle='#7f4f24'; c.lineWidth=4*k; c.beginPath(); c.arc(x-6*k,y-34*k,25*k,0,7); c.fill(); c.stroke();
  c.beginPath(); for(let a=0;a<4*Math.PI;a+=.2){ const r=22*k*(1-a/(4.4*Math.PI)); const X=x-6*k+r*Math.cos(a), Y=y-34*k+r*Math.sin(a); a?c.lineTo(X,Y):c.moveTo(X,Y); } c.stroke(); }
/* Un côté repassé (sans le reste du tour) */
function coteTrait(c,pts,i,coul=TOUR,lw=14){ const a=pts[i], b=pts[(i+1)%pts.length];
  c.strokeStyle=coul; c.lineWidth=lw; c.lineCap='round'; c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); }
/* Le côté qui manque, en pointillé rouge */
function cotePointille(c,pts,i,coul=CRAIE.faux){ const a=pts[i], b=pts[(i+1)%pts.length];
  c.strokeStyle=coul; c.lineWidth=10; c.setLineDash([18,16]); c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); c.setLineDash([]); }

FILMS['defi']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':11.06,'01-ruban':8.31,'02-question':14.41,'02b-reponse':6.57,'03-ouf':4.42,'04-commentaire':11.05,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tEsc=mot('00-accroche',"d'escargots"), tJai=mot('00-accroche',"J'ai"), t20=mot('00-accroche','20'),
        tPiste=mot('00-accroche','piste'), tTri=mot('00-accroche','triangle'), t8=mot('00-accroche','8'),
        t7=mot('00-accroche','7'), tDer=mot('00-accroche','dernier');
  const tCotes=mot('01-ruban','côtés'), t8p=mot('01-ruban','8'), t7p=mot('01-ruban','7'), t15=mot('01-ruban','15'),
        tReste=mot('01-ruban','reste'), tTroi=mot('01-ruban','troisième');
  const tFerm=mot('02b-reponse','fermée');
  const tPartez=mot('03-ouf','Partez'), tBon=mot('03-ouf','Bon');
  const tRub=mot('04-commentaire','ruban'), t30=mot('04-commentaire','30'), tTri2=mot('04-commentaire','triangle'),
        t10=mot('04-commentaire','10'), tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJai-.08, XR=790;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 30 m de ruban, un triangle de 10 m et 12 m, le troisième à trouver */
      if(T>=tRub) ecrire(c,'ruban : 30 m',XR,200,62*zoom(T,tRub,.4),CRAIE.jaune);
      if(T>=tTri2) polyCraie(c,PISTE_DEFI,zoom(T,tTri2,.3),'#8ce99a','#2b8a3e');
      if(T>=t10){ coteCraie(c,PISTE_DEFI,0,'10 m',zoom(T,t10,.4),CRAIE.jaune,52,40);
        coteCraie(c,PISTE_DEFI,2,'12 m',zoom(T,t10+.3,.4),CRAIE.jaune,52,56);
        cotePointille(c,PISTE_DEFI,1); coteCraie(c,PISTE_DEFI,1,'?',zoom(T,t10+.3,.4),CRAIE.faux,60,44); }
      if(T>=tComb) ecrire(c,'?',XR,430,220*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* la piste et ses escargots */
    const avance=T>=tPartez?Math.min(1,(T-tPartez)/6)*40:0;
    if(T>=tTri) polyCraie(c,PISTE,zoom(T,tTri,.3),'#8ce99a','#2b8a3e');
    if(T>=t20) ecrire(c,'ruban : 20 m',XR,170,62*zoom(T,t20,.4),CRAIE.jaune);
    if(T<ouf){
      if(T>=t8&&T<ran) coteTrait(c,PISTE,0,TOUR,12);
      if(T>=t7&&T<ran) coteTrait(c,PISTE,2,TOUR,12);
      if(T>=t8p) coteTrait(c,PISTE,0,TOUR,12);
      if(T>=t7p) coteTrait(c,PISTE,2,TOUR,12);
      if(T>=t8) coteCraie(c,PISTE,0,'8 m',zoom(T,t8,.4),CRAIE.jaune,54,40);
      if(T>=t7) coteCraie(c,PISTE,2,'7 m',zoom(T,t7,.4),CRAIE.jaune,54,56);
      if(T>=tDer){ cotePointille(c,PISTE,1); coteCraie(c,PISTE,1,'?',zoom(T,tDer,.5),CRAIE.faux,66,48); }
      if(T>=t8p) ecrire(c,'8 + 7',XR,300,66*zoom(T,t8p,.4),CRAIE.blanc);
      if(T>=t15) ecrire(c,'= 15 m',XR,390,72*zoom(T,t15,.4),CRAIE.ok);
      if(T>=tReste) ecrire(c,'reste : ?',XR,510,62*zoom(T,tReste,.4),CRAIE.faux);
    } else { /* la réponse : 20 − 15 = 5 m, la piste est fermée */
      tourPoly(c,PISTE,1,TOUR,12);
      coteCraie(c,PISTE,0,'8 m',1,CRAIE.jaune,54,40); coteCraie(c,PISTE,2,'7 m',1,CRAIE.jaune,54,56);
      coteCraie(c,PISTE,1,'5 m',zoom(T,ouf,.5),CRAIE.ok,58,48);
      ecrire(c,'20 − 15',XR,300,66,CRAIE.blanc); ecrire(c,'= 5 m',XR,390,76,CRAIE.ok);
      coche(c,XR-70,520,.6); }
    if(T>=tEsc){ const z=zoom(T,tEsc,.4); escargot(c,130+avance,552,1.4*z,'#f59f00',T*3); escargot(c,250+avance*.7,552,1.15*z,'#e64980',T*3+1); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-ruban'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0("Course d'escargots !")),
    ...suiteDe(ran,60,62,[a0("J'ai 20 mètres de ruban"),a0('pour faire une piste'),a0('en triangle.')],
      [a0('Deux côtés :'),a0('8 mètres et 7 mètres.')],[a0('Et le dernier ?')]),
    ...suiteDe(q,60,58,[a1("J'ajoute les deux côtés :"),a1('8 + 7, 15 mètres.')],
      [a1('Le reste du ruban,'),a1("c'est pour le troisième côté.")]),
    ...suiteDe(com,60,62,[a3('Partez !')],[a3('Bon, ils arriveront'),a3('peut-être demain.')]),
    ...suiteDe(f,60,60,[a4('À toi : un ruban'),a4('de 30 mètres,')],[a4('et un triangle avec deux côtés'),a4('de 10 et 12 mètres.')],
      [a4('Combien pour'),a4('le troisième ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de mètres de ruban'),qd('pour le dernier côté ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('20 − 15,'), r2=rd('5 mètres.'), r3=rd('La piste'), r4=rd('est fermée !');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<polygon points="40,205 200,205 150,118" fill="#8ce99a" stroke="#ff922b" stroke-width="9" stroke-linejoin="round"/>`+
    `<line x1="200" y1="205" x2="150" y2="118" stroke="#ff8787" stroke-width="9" stroke-dasharray="12 10"/>`+
    `<text x="270" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le dernier côté :<br>combien ?'+PARI,mini);
  return { clips,FIN,titre:"La course d'escargots",ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ran,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['5 m',tq('A'),tq('5')],['15 m',tq('B'),tq('15')],['35 m',tq('C'),tq('35')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<ran){ T<tDer?g.montre():g.reflechit(); }
      else if(T<q){ T<tReste?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tBon?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
