/* ============================================================
   Série Nombres décimaux 6e, ÉPISODE 08 : DES GLACES HORS DE PRIX.
   4 glaces à 1,5 € : Ti Margo calcule 15 × 4 = 60 et paie 60 € ! Non : 6 €.
   Chargé après films/decimaux.js : utilise voixDe, poserTableau, ecrire, pop, poserClasse, suiteDe, gestes…
   ============================================================ */
FILMS['multiplier']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':14.23,'01-marchand':11.09,'02-question':12.82,'02b-reponse':10.24,'03-ouf':6.29,'04-commentaire':6.79,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-marchand','02-question','02b-reponse','03-ouf','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,mar,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  /* Une phrase dont chaque mot prend l'instant d'un mot de la voix (quand la voix lie « 5 a » en un seul mot) */
  const phr=(clip,txt,ws)=>{ const tm=ws.map(w=>Array.isArray(w)?mot(clip,...w):mot(clip,w)); return [tm[0],tm[tm.length-1],txt,tm]; };

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tUne=mot('00-accroche','Une'), tG15=mot('00-accroche','1'), t15=mot('00-accroche','15'), tX4=mot('00-accroche','4',3),
        t60=mot('00-accroche','60'), tPaie=mot('00-accroche','60',2), tParie=mot('00-accroche','paries'), tCop=mot('00-accroche','copains');
  const tM60=mot('01-marchand','60'), tRigole=mot('01-marchand','rigole'), tMoins1=mot('01-marchand','moins'), tDeux=mot('01-marchand','2'),
        tAlors=mot('01-marchand','Alors'), tMoins2=mot('01-marchand','moins',2), tHuit=mot('01-marchand','8');
  const tOublie=mot('03-ouf','oublié'), tVirg=mot('03-ouf','virgule'), tOuf=mot('03-ouf','Ouf'), tRespire=mot('03-ouf','respire');
  const tC6=mot('04-commentaire','6'), tC12=mot('04-commentaire','1'), tRep=mot('04-commentaire','Réponds');

  /* Un cornet de glace à la craie */
  function cornet(c,x,y,s=1,boule=CRAIE.c){ c.fillStyle='#e8b04a'; c.beginPath(); c.moveTo(x-38*s,y); c.lineTo(x+38*s,y); c.lineTo(x,y+105*s); c.closePath(); c.fill();
    c.strokeStyle='#a8742a'; c.lineWidth=4*s; for(const k of [-1,1]){ c.beginPath(); c.moveTo(x-30*s,y+12*s); c.lineTo(x+(k>0?14:-14)*s,y+70*s); c.stroke(); }
    c.fillStyle=boule; c.beginPath(); c.arc(x,y-22*s,44*s,0,7); c.fill(); c.fillStyle='rgba(255,255,255,.55)'; c.beginPath(); c.arc(x-15*s,y-36*s,11*s,0,7); c.fill(); }
  /* Un croissant à la craie */
  function croissant(c,x,y,s=1){ const R=58*s; c.fillStyle='#e8a53a'; c.beginPath(); c.arc(x,y,R,Math.PI*1.08,Math.PI*1.92,false); c.arc(x,y+R*.55,R*.82,Math.PI*1.78,Math.PI*1.22,true); c.closePath(); c.fill();
    c.strokeStyle='#b0701e'; c.lineWidth=5*s; c.lineCap='round'; for(const a of [1.3,1.5,1.7]){ c.beginPath(); c.moveTo(x+Math.cos(a*Math.PI)*R*.98,y+Math.sin(a*Math.PI)*R*.98); c.lineTo(x+Math.cos(a*Math.PI)*R*.55,y+Math.sin(a*Math.PI)*R*.55+R*.2); c.stroke(); } }
  /* Une ligne de morceaux, chacun à sa place (mesurée à la taille de base) ; un morceau paraît à son instant, en grossissant un peu */
  function ligneMots(c,pieces,xc,y,taille,T){ c.font=`800 ${taille}px "Segoe UI"`; const esp=taille*.5, ws=pieces.map(([s])=>c.measureText(s).width);
    let x=xc-(ws.reduce((a,b)=>a+b,0)+esp*(pieces.length-1))/2;
    pieces.forEach(([s,t0,coul],k)=>{ if(T>=t0) ecrire(c,s,x+ws[k]/2,y,taille*Math.min(1.15,Math.max(1,pop(T,t0))),coul); x+=ws[k]+esp; }); }
  const z=(T,t)=>T>=t?Math.min(1.2,Math.max(1,pop(T,t))):0;
  const BOULES=[CRAIE.c,CRAIE.d,CRAIE.ok,CRAIE.u];
  function barrer(c,x0,y0,x1,y1){ c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x0,y0); c.lineTo(x1,y1); c.moveTo(x0,y1); c.lineTo(x1,y0); c.stroke(); }
  function coche(c,x,y,s=1){ c.strokeStyle=CRAIE.ok; c.lineWidth=16*s; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x+40*s,y+40*s); c.lineTo(x+120*s,y-50*s); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : 6 croissants à 1,2 € */
      for(let k=0;k<6;k++) if(T>=tC6+k*.08) croissant(c,148+k*152,150,Math.max(1,pop(T,tC6+k*.08)));
      if(T>=tC12) ecrire(c,'1 croissant : 1,2 €',W/2,330,74*Math.max(1,pop(T,tC12)),CRAIE.d);
      if(T>=tRep) ecrire(c,'6 × 1,2 = ?',W/2,520,96*Math.max(1,pop(T,tRep)),CRAIE.blanc);
      tab.maj(); return; }
    if(T>=ouf){ /* la virgule revient : 6,0 */
      ecrire(c,'15 × 4 = 60',W/2,130,84,CRAIE.blanc);
      const zv=z(T,tVirg); const x0=W/2-60;
      ecrire(c,'6',x0,420,220,CRAIE.ok); ecrire(c,'0',x0+(zv?190:150),420,220,CRAIE.ok);
      if(zv){ c.fillStyle=CRAIE.virgule; c.beginPath(); c.arc(x0+95,500,22*zv,0,7); c.fill(); c.strokeStyle=CRAIE.virgule; c.lineWidth=12; c.lineCap='round'; c.beginPath(); c.moveTo(x0+103,508); c.lineTo(x0+85,550); c.stroke(); }
      if(T>=tRespire) coche(c,W/2+250,430,1.1);
      tab.maj(); return; }
    if(T>=mar){ /* le marchand rigole : moins de 2 € la glace, moins de 8 € les 4 */
      ecrire(c,'60 € ?',W/2,110,120,T>=tRigole?CRAIE.faux:CRAIE.blanc);
      if(T>=tRigole) barrer(c,W/2-190,50,W/2+190,170);
      if(T>=tMoins1) cornet(c,120,320,.75,BOULES[0]);
      ligneMots(c,[['1 glace :',tMoins1,CRAIE.blanc],['moins de 2 €',tDeux,CRAIE.d]],W/2+70,330,58,T);
      if(T>=tAlors) for(let k=0;k<4;k++) cornet(c,70+k*52,525,.5,BOULES[k]);
      ligneMots(c,[['4 glaces :',tAlors,CRAIE.blanc],['moins de 8 €',tHuit,CRAIE.ok]],W/2+110,530,56,T);
      tab.maj(); return; }
    /* l'accroche : 4 glaces, 1,5 € la glace, 15 × 4 = 60 */
    for(let k=0;k<4;k++) cornet(c,250+k*185,130,1,BOULES[k]);
    if(T>=tG15) ecrire(c,'1 glace : 1,5 €',W/2,330,80*Math.max(1,pop(T,tG15)),CRAIE.d);
    ligneMots(c,[['15',t15,CRAIE.blanc],['×',t15,CRAIE.blanc],['4',tX4,CRAIE.blanc],['=',t60,CRAIE.blanc],['60',t60,CRAIE.blanc]],W/2,480,96,T);
    if(T>=tPaie) ecrire(c,'Je paie 60 € !',W/2,630,84*Math.max(1,pop(T,tPaie)),CRAIE.faux);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-marchand'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),a0('J’offre 4 glaces'),a0('à mes copains.')];
  const groupes=[
    groupe(acc+.1,tUne-.08,352,62,...salut),
    ...suiteDe(mar,60,60,[a0('Une glace coûte 1,5 €.')],[a0('15 fois 4,'),a0('ça fait 60.')],[a0('Je paie 60 € !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,58,[a1('60 € pour 4 glaces ?')],[a1('Le marchand rigole.')],[a1('Une glace coûte'),a1('moins de 2 €.')],[a1('Alors 4 glaces coûtent'),a1('moins de 8 € !')]),
    ...suiteDe(com,60,58,[a3('J’avais oublié de'),a3('remettre la virgule.')],[a3('Ouf, mon porte-monnaie'),a3('respire !')]),
    ...suiteDe(f,60,56,[a4('À toi : combien coûtent'),a4('6 croissants à 1,2 € ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien je paie ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phr('02b-reponse','1,5 a un chiffre',['1','a','un','chiffre']), r2=phr('02b-reponse','après la virgule.',['après','la',['virgule',3]]);
  rd.jusque('Le'); const r3=rd('Le prix aussi : 6,0.'), r4=rd('6 €.');

  poserMiniature(outils,acc+1,'4 glaces<br>pour 60 € ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="128" font-family="Segoe UI" font-weight="800" font-size="62" fill="#f8f9fa" text-anchor="middle">1,5 × 4</text><text x="165" y="186" font-family="Segoe UI" font-weight="800" font-size="46" fill="#ff8787" text-anchor="middle">= 60 ?</text></svg>`);
  return { clips,FIN,titre:'Des glaces hors de prix',ceinture:1,finTitre:tUne-.08,groupes,finClip:'05-abonne',
    cuts:[tUne-.08,mar,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['60 €',tq('A'),tq('60')],['6 €',tq('B'),tq('6')],['0,6 €',tq('C'),tq('0')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tUne-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<mar){ if(T<t15) g.montre(); else if(T<tPaie) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T>=tRigole&&T<tMoins1) { g.oups(); scene.ry=-.12+.3*lisse((T-tRigole)/.35); } else if(T>=tMoins1) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tOuf) g.fier(); else if(T>=tVirg-.2) g.montre(); else g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
