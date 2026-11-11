/* Série CALCUL MENTAL 6e : épisode 05, LES ASTUCES (short Ti Margo en dessin animé).
   Les outils (voixDe, enchainer, suiteDe, poserTableau, ecrire, ligneMots, barrer, coche, gestes…) viennent de films/mental.js. */

/* ---- Dessins à la craie propres à l'épisode ---- */
/* Une plaquette de beurre : le beurre jaune, le papier blanc rayé de bleu qui l'enveloppe à moitié */
function beurreCraie(c,x,y,s=1){ const w=230*s, h=110*s;
  c.fillStyle='#ffe066'; c.strokeStyle='#f8f9fa'; c.lineWidth=6*s; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,14*s); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(x-w/2,y-h/2,w*.55,h,[14*s,0,0,14*s]); c.fill();
  c.fillStyle='#4dabf7'; c.fillRect(x-w/2,y-h/2+h*.38,w*.55,h*.24); }
/* La montagne de beurre : des plaquettes empilées en pyramide ; `u` (0 → 1) la fait monter */
function montagneCraie(c,x,y,s=1,u=1){ const rangs=[4,3,2,1]; let k=0, n=Math.ceil(10*u);
  rangs.forEach((m,j)=>{ for(let i=0;i<m;i++){ if(k++>=n) return; beurreCraie(c,x+(i-(m-1)/2)*92*s,y-j*52*s,.38*s); } }); }
/* Un gâteau à deux étages, crème et cerise */
function gateauCraie(c,x,y,s=1){
  c.fillStyle='#d6a76c'; c.strokeStyle='#f8f9fa'; c.lineWidth=6*s;
  c.beginPath(); c.roundRect(x-150*s,y-20*s,300*s,120*s,14*s); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(x-100*s,y-120*s,200*s,100*s,14*s); c.fill(); c.stroke();
  c.fillStyle='#fff3bf'; c.fillRect(x-150*s,y-20*s,300*s,22*s); c.fillRect(x-100*s,y-120*s,200*s,20*s);
  c.fillStyle='#ff6b6b'; c.beginPath(); c.arc(x,y-140*s,22*s,0,7); c.fill(); }
/* Plusieurs morceaux de phrase lus l'un après l'autre, réunis en une légende */
const joindre=(...ps)=>[ps[0][0],ps[ps.length-1][1],ps.map(p=>p[2]).join(' '),ps.flatMap(p=>p[3])];

/* ============================================================
   ÉPISODE 05 : LE BEURRE. 125 g de beurre doublés : Ti Margo annonce 1 250 g ! Non : 125 + 125 = 250 g.
   ============================================================ */
FILMS['astuces']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':10.66,'01-beurre':17.26,'02-question':14.11,'02b-reponse':6.34,'03-ouf':4.71,'04-commentaire':6.4,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-beurre','02-question','02b-reponse','03-ouf','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bt,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tMa=mot('00-accroche','Ma'), tRecette=mot('00-accroche','recette'), t125=mot('00-accroche','125'), tBeurre=mot('00-accroche','beurre'),
        tDouble=mot('00-accroche','double'), t1250=mot('00-accroche','1');
  const tMont=mot('01-beurre','montagne'), tDe=mot('01-beurre','double'), t125a=mot('01-beurre','125',3), t125b=mot('01-beurre','125',6),
        t100a=mot('01-beurre','100'), t100b=mot('01-beurre','100',3), t200=mot('01-beurre','200'),
        t25a=mot('01-beurre','25'), t25b=mot('01-beurre','25',3), t50=mot('01-beurre','50');
  const tOuf=mot('03-ouf','Ouf'), tGateau=mot('03-ouf','gâteau');
  const tCdouble=mot('04-commentaire','double'), tC375=mot('04-commentaire','375'), tRep=mot('04-commentaire','Réponds');

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : le double de 375 */
      beurreCraie(c,190,350,1.05);
      ligneMots(c,[['le double',tCdouble,CRAIE.blanc],['de',tCdouble+.3,CRAIE.blanc]],W/2+150,250,100,T);
      ligneMots(c,[['375',tC375,CRAIE.d],['= ?',tRep,CRAIE.ok]],W/2+150,450,110,T);
      tab.maj(); return; }
    if(T>=ouf){ /* 250 g : un vrai gâteau, pas une montagne */
      gateauCraie(c,270,420,1.05);
      beurreCraie(c,700,170,.7); beurreCraie(c,880,170,.7);
      ecrire(c,'250 g',790,400,130*Math.max(1,pop(T,tOuf)),CRAIE.ok);
      if(T>=tGateau) coche(c,700,560,1);
      tab.maj(); return; }
    if(T>=bt){ /* 1 250 g ? Une montagne ! Le double de 125 : 125 + 125, 100 + 100 = 200, 25 + 25 = 50 */
      ligneMots(c,[['1 250',bt+.1,CRAIE.faux],['g ?',tGrB,CRAIE.faux]],230,100,90,T);
      if(T>=tMont){ barrer(c,50,45,410,155); montagneCraie(c,800,215,1,Math.min(1,(T-tMont)/.8)); }
      ligneMots(c,[['125',t125a,CRAIE.blanc],['+',tPlusA,CRAIE.blanc],['125',t125b,CRAIE.blanc]],W/2,320,92,T);
      ligneMots(c,[['100',t100a,CRAIE.c],['+',tPlus100,CRAIE.c],['100',t100b,CRAIE.c],['= 200',t200,CRAIE.c]],W/2,470,84,T);
      ligneMots(c,[['25',t25a,CRAIE.d],['+',tPlus25,CRAIE.d],['25',t25b,CRAIE.d],['= 50',t50,CRAIE.d]],W/2,610,84,T);
      tab.maj(); return; }
    /* l'accroche : 125 g de beurre, le double… 1 250 g ! */
    if(T>=tRecette) beurreCraie(c,250,150,1.25);
    ligneMots(c,[['125',t125,CRAIE.blanc],['g',tGr125,CRAIE.blanc]],700,150,120,T);
    if(T>=tDouble) ecrire(c,'le double :',W/2,355,96*Math.max(1,pop(T,tDouble)),CRAIE.d);
    ligneMots(c,[['1 250',t1250,CRAIE.faux],['g !',tGr1250,CRAIE.faux]],W/2,555,140,T);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-beurre'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const g00=a0('Ma recette demande'), g01=a0('125'), g0=[g00,joindre(g01,a0('grammes de beurre.'))], g1=[a0('Je la double :')];
  const x0=a0('1 250'); a0.saute(1); const g2=[joindre(x0,a0('grammes de beurre !'))];
  const g3=[a0.jusque('Tu')('Tu paries ?')];
  const w0=a1('1 250'); a1.saute(1); const h0=[joindre(w0,a1('grammes ?'))]; a1.jusque('C\'est');
  const h1=[a1('C’est une montagne'),a1('de beurre !')];
  const y0=a1('Le double de 125,'); a1.jusque('c\'est'); const y1=a1('c’est 125'), y2=a1('plus'), y3=a1('125.');
  const h2=[y0,joindre(y1,y2,y3)];
  a1.jusque('100'); const h3=[a1('100 plus 100,'),a1('ça fait 200.')];
  a1.jusque('25'); const h4=[a1('25 plus 25,'),a1('ça fait 50.')];
  const groupes=[
    groupe(acc+.1,tMa-.08,352,62,...salut),
    ...suiteDe(bt,60,60,g0,g1,g2,g3),
    ...suiteDe(q,60,60,h0,h1,h2,h3,h4),
    ...suiteDe(com,60,62,[a3('Ouf ! Mon gâteau ne sera pas'),a3('une montagne de beurre.')]),
    ...suiteDe(f,60,58,[a4('À toi : quel est le double'),a4('de 375 ?'),a4.jusque('Réponds')('Réponds en commentaire !')])
  ];
  /* les instants des mots lus dans les légendes (« grammes », « plus » : après le nombre) */
  const tGr125=g0[1][3][1], tGr1250=g2[0][3][2], tGrB=h0[0][3][2], tPlusA=y2[0], tPlus100=h3[0][3][1], tPlus25=h4[0][3][1];
  qd('Question !');
  const phraseQ=[qd('Le double de 125 ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r0=rd('200'), r1=joindre(r0,rd('plus 50 :')); const z0=rd('250'); rd.saute(1); const r2=joindre(z0,rd('grammes de beurre.'));

  poserMiniature(outils,acc+1,'Le double de 125<br>= 1 250 ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><rect x="60" y="34" width="210" height="62" rx="10" fill="#ffe066" stroke="#f8f9fa" stroke-width="4"/><rect x="60" y="34" width="112" height="62" rx="10" fill="#f8f9fa"/><rect x="60" y="56" width="112" height="16" fill="#4dabf7"/><text x="165" y="170" font-family="Segoe UI" font-weight="800" font-size="58" fill="#ff8787" text-anchor="middle">1 250 g ?</text></svg>`);
  return { clips,FIN,titre:'Le beurre de Ti Margo',ceinture:1,finTitre:tMa-.08,groupes,finClip:'05-abonne',
    cuts:[tMa-.08,bt,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:.64,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 250',tq('A'),tq('1')],['127',tq('B'),tq('127')],['250',tq('C'),tq('250',5)]],
      tete:[[r+.1,'Réponse '],[r+.64,'C !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tMa-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.2) g.salut(T-acc,1.2);
      else if(gros) g.ouvre();
      else if(T<bt){ if(T<tDouble) g.montre(); else if(T<t1250) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T<tDe) { g.oups(); scene.ry=-.12+.3*lisse((T-bt)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.64?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf+.3?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
