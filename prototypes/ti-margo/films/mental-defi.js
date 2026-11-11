/* Série CALCUL MENTAL 6e, épisode 06 : LE JEU ET LA MANETTE.
   49 + 52 : Ti Margo ajoute les dizaines (9) et les unités (11) et colle le tout → 911 euros !
   Le vendeur éclate de rire : l'ordre de grandeur (50 + 50 = 100) dit « autour de 100 ». Réponse : 101 euros.
   Chargé après films/mental.js : voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, ligneMots,
   barrer, coche, droiteBonds, poserClasse, gestes, poserMiniature, PARI… */
FILMS['defi']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':12.5,'01-ordre':17.42,'02-question':12.95,'02b-reponse':9.26,'03-ouf':4.35,'04-commentaire':6.53,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-ordre','02-question','02b-reponse','03-ouf','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ord,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants (les nombres répétés : « 49 euros » compte deux marques, « 50 plus » aussi) */
  const tJachete=mot('00-accroche','J\'achète'), tJeu=mot('00-accroche','jeu'), t49=mot('00-accroche','49'),
        tManette=mot('00-accroche','manette'), t52=mot('00-accroche','52'), tPlus=mot('00-accroche','plus'),
        t52b=mot('00-accroche','52',3), t911=mot('00-accroche','911'), tParie=mot('00-accroche','paries');
  const tVendeur=mot('01-ordre','vendeur'), tRire=mot('01-ordre','rire'), t49o=mot('01-ordre','49'), t50a=mot('01-ordre','50'),
        t52o=mot('01-ordre','52'), t50b=mot('01-ordre','50',2), t50c=mot('01-ordre','50',3), t50e=mot('01-ordre','50',5),
        t100=mot('01-ordre','100'), tPrix=mot('01-ordre','prix'), tAutour=mot('01-ordre','autour'), t100b=mot('01-ordre','100',2);
  const tOuf=mot('03-ouf','Ouf'), tReste=mot('03-ouf','reste'), tBonbons=mot('03-ouf','bonbons');
  const tC98=mot('04-commentaire','98'), tC103=mot('04-commentaire','103'), tRep=mot('04-commentaire','Réponds');

  /* Les dessins à la craie : la boîte du jeu, la manette, le rire du vendeur, les bonbons */
  function boiteJeu(c,x,y,s=1){ c.fillStyle='#4c6ef5'; c.strokeStyle=CRAIE.blanc; c.lineWidth=6*s; c.beginPath(); c.roundRect(x-55*s,y-72*s,110*s,144*s,12*s); c.fill(); c.stroke();
    c.fillStyle='#ffd43b'; c.beginPath(); c.moveTo(x,y-38*s); c.lineTo(x+12*s,y-8*s); c.lineTo(x+42*s,y-6*s); c.lineTo(x+18*s,y+14*s); c.lineTo(x+26*s,y+44*s);
    c.lineTo(x,y+27*s); c.lineTo(x-26*s,y+44*s); c.lineTo(x-18*s,y+14*s); c.lineTo(x-42*s,y-6*s); c.lineTo(x-12*s,y-8*s); c.closePath(); c.fill(); }
  function manetteC(c,x,y,s=1){ c.fillStyle='#495057'; c.strokeStyle=CRAIE.blanc; c.lineWidth=6*s; c.beginPath(); c.roundRect(x-90*s,y-45*s,180*s,90*s,42*s); c.fill(); c.stroke();
    c.fillStyle=CRAIE.blanc; c.fillRect(x-62*s,y-7*s,44*s,14*s); c.fillRect(x-47*s,y-22*s,14*s,44*s);
    [['#ff6b6b',48,0],['#8ce99a',22,0],['#74c0fc',35,-14],['#ffd43b',35,14]].forEach(([k,dx,dy])=>{ c.fillStyle=k; c.beginPath(); c.arc(x+dx*s,y+dy*s,8*s,0,7); c.fill(); }); }
  function rire(c,x,y,T,t0){ if(T<t0) return; const sec=Math.max(0,Math.min(1,(T-t0)/.3)), b=Math.sin(T*18)*7*(T<t0+2.4?1:0);
    c.save(); c.translate(x,y+b); c.scale(sec,sec);
    c.fillStyle='#ffd8a8'; c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.beginPath(); c.arc(0,0,78,0,7); c.fill(); c.stroke();
    c.strokeStyle='#343a40'; c.lineWidth=7; c.lineCap='round';
    for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*42,-24); c.lineTo(sx*22,-14); c.lineTo(sx*42,-4); c.stroke(); }
    c.fillStyle='#c92a2a'; c.beginPath(); c.moveTo(-44,12); c.quadraticCurveTo(0,82,44,12); c.closePath(); c.fill();
    c.fillStyle='#74c0fc'; for(const sx of [-1,1]){ c.beginPath(); c.ellipse(sx*66,4,9,15,0,0,7); c.fill(); }
    c.restore(); }
  function bonbons(c,x,y,T,t0){ if(T<t0) return; const B=['#ff6b6b','#ffd43b','#74c0fc','#8ce99a','#faa2c1'];
    B.forEach((k,i)=>{ const u=Math.max(0,Math.min(1,(T-t0-i*.08)/.3)); if(u<=0) return; const xx=x+(i-2)*78, yy=y+(i%2)*26;
      c.save(); c.translate(xx,yy); c.scale(u,u); c.fillStyle=k;
      c.beginPath(); c.ellipse(0,0,30,20,0,0,7); c.fill();
      c.beginPath(); c.moveTo(-28,0); c.lineTo(-48,-16); c.lineTo(-48,16); c.closePath(); c.fill();
      c.beginPath(); c.moveTo(28,0); c.lineTo(48,-16); c.lineTo(48,16); c.closePath(); c.fill(); c.restore(); }); }

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W;
    if(T>=com){ /* le défi : 98 + 103 */
      manetteC(c,170,340,1.05);
      ligneMots(c,[['98 +',tC98,CRAIE.blanc],['103',tC103,CRAIE.d],['= ?',tRep,CRAIE.ok]],W/2+165,340,112,T);
      tab.maj(); return; }
    if(T>=ouf){ /* il reste de quoi acheter des bonbons : 101 € */
      boiteJeu(c,150,220,1); manetteC(c,150,470,.85);
      ecrire(c,'101 €',W/2+150,250,130*Math.max(1,pop(T,tOuf)),CRAIE.ok);
      if(T>=tReste) coche(c,W/2+330,330,.8);
      bonbons(c,W/2+150,520,T,tBonbons);
      tab.maj(); return; }
    if(T>=ord){ /* 911 € ? Le vendeur rit ; l'ordre de grandeur : 50 + 50 = 100 */
      ecrire(c,'911 € ?',240,100,104,CRAIE.faux);
      if(T>=tRire) barrer(c,70,40,410,160);
      rire(c,W-170,120,T,tVendeur);
      ligneMots(c,[['49 ≈',t49o,CRAIE.blanc],['50',t50a,CRAIE.u]],W/2-240,300,84,T);
      ligneMots(c,[['52 ≈',t52o,CRAIE.blanc],['50',t50b,CRAIE.u]],W/2+240,300,84,T);
      ligneMots(c,[['50 +',t50c,CRAIE.u],['50',t50e,CRAIE.u],['= 100',t100,CRAIE.ok]],W/2,450,90,T);
      ligneMots(c,[['autour de',tAutour,CRAIE.blanc],['100 €',t100b,CRAIE.ok]],W/2,595,90,T);
      tab.maj(); return; }
    /* l'accroche : le jeu à 49 €, la manette à 52 €, 49 + 52… 911 € (le 9 des dizaines, le 11 des unités) */
    if(T>=tJeu) boiteJeu(c,120,115,.8);
    if(T>=tManette) manetteC(c,120,275,.72);
    ligneMots(c,[['un jeu :',tJeu,CRAIE.blanc],['49 €',t49,CRAIE.d]],W/2+110,115,80,T);
    ligneMots(c,[['une manette :',tManette,CRAIE.blanc],['52 €',t52,CRAIE.d]],W/2+110,275,80,T);
    ligneMots(c,[['49 +',tPlus,CRAIE.blanc],['52',t52b,CRAIE.blanc]],W/2,425,90,T);
    if(T>=t911){ const z=Math.max(1,pop(T,t911)), ft=120*z; c.font=`800 ${ft}px "Segoe UI"`;
      const parts=[['9',CRAIE.d],['11',CRAIE.u],[' € !',CRAIE.faux]], ws=parts.map(([s])=>c.measureText(s).width);
      let x=W/2-ws.reduce((a,b)=>a+b,0)/2; parts.forEach(([s,k],i)=>{ ecrire(c,s,x+ws[i]/2,575,ft,k); x+=ws[i]; }); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-ordre'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !')];
  const groupes=[
    groupe(acc+.1,tJachete-.08,352,62,...salut),
    ...suiteDe(ord,60,58,[a0('J’achète un jeu à 49 euros')],[a0('et une manette à 52 euros.')],[a0('49 plus 52…')],[a0('911 euros !')],[a0.jusque('Tu')('Tu paries ?')]),
    ...suiteDe(q,60,58,[a1('911 euros ?')],[a1.jusque('Le')('Le vendeur éclate de rire.')],[a1('49, c’est presque 50.')],[a1('52, c’est presque 50.')],
      [a1('50 plus 50,'),a1('ça fait 100.')],[a1('Le prix est autour'),a1('de 100 euros.')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Il me reste de quoi'),a3('acheter des bonbons.')]),
    ...suiteDe(f,60,58,[a4('À toi : combien font'),a4('98 plus 103 ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien je paie ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('49 plus 1, ça fait 50.'), r2=rd('50 plus 51, ça fait 101 euros.');

  poserMiniature(outils,acc+1,'49 + 52<br>= 911 € ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><text x="165" y="92" font-family="Segoe UI" font-weight="800" font-size="62" fill="#f8f9fa" text-anchor="middle">49 + 52</text><text x="165" y="170" font-family="Segoe UI" font-weight="800" font-size="62" fill="#ff8787" text-anchor="middle">= 911 € ?</text></svg>`);
  return { clips,FIN,titre:'La manette de Ti Margo',ceinture:1,finTitre:tJachete-.08,groupes,finClip:'05-abonne',
    cuts:[tJachete-.08,ord,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['911 €',tq('A'),tq('911')],['101 €',tq('B'),tq('101')],['91 €',tq('C'),tq('91')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJachete-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* il se tourne vers le vendeur qui rit, puis revient au tableau */
      scene.ry=-.12; if(T>=ord&&T<q) scene.ry=-.12+.3*lisse((T-tVendeur)/.35)*(1-lisse((T-t49o)/.4));

      if(T<acc+1.2) g.salut(T-acc,1.2);
      else if(gros) g.ouvre();
      else if(T<ord){ if(T<tPlus) g.montre(); else if(T<t911) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T<t49o) g.oups(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf+.3?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
