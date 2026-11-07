/* ============================================================
   Série Nombres décimaux 6e, ÉPISODE 09 : LA PIZZA CARRÉE.
   0,5 de la largeur et 0,5 de la hauteur : « multiplier agrandit toujours », croit Ti Margo.
   Non : 0,5 × 0,5 = 0,25, un quart de la pizza.
   Chargé après films/decimaux.js : utilise voixDe, poserTableau, ecrire, pop, poserClasse, suiteDe, gestes…
   ============================================================ */
FILMS['multiplier-decimaux']=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':17.11,'01-coupe':8.52,'02-question':14.29,'02b-reponse':10.91,'03-lecon':11.4,'04-commentaire':7.39,'05-abonne':6.04};
  const clips=enchainer(.4,['00-accroche','01-coupe','02-question','02b-reponse','03-lecon','04-commentaire','05-abonne'],DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cou,q,r,lec,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  /* Une phrase dont chaque mot prend l'instant d'un mot de la voix (quand la voix lie « 5 de » en un seul mot) */
  const phr=(clip,txt,ws)=>{ const tm=ws.map(w=>Array.isArray(w)?mot(clip,...w):mot(clip,w)); return [tm[0],tm[tm.length-1],txt,tm]; };

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJe2=mot('00-accroche','Je',2), t05a=mot('00-accroche','0',1), t05b=mot('00-accroche','0',3),
        tMult=mot('00-accroche','Multiplier'), tAgr=mot('00-accroche','agrandit'), tTouj=mot('00-accroche','toujours'),
        tPlus=mot('00-accroche','plus'), tMoit=mot('00-accroche','moitié'), tParie=mot('00-accroche','paries');
  const tDec=mot('01-coupe','découpe'), tHe=mot('01-coupe','Hé'), tMorc=mot('01-coupe','morceau'), tCoin=mot('01-coupe','coin'),
        tQuart=mot('01-coupe','quart');
  const tMoins=mot('03-lecon','moins'), tRap=mot('03-lecon','rapetisse'), tToute=mot('03-lecon','toute'), tL05=mot('03-lecon','0'),
        tL1=mot('03-lecon','1',2), tLMoit=mot('03-lecon','moitié'), tMiam=mot('03-lecon','Miam');
  const tC04=mot('04-commentaire','0',1), tCx=mot('04-commentaire','4'), tC05=mot('04-commentaire','0',3), tRep=mot('04-commentaire','Réponds');

  /* La pizza carrée à la craie. sel : la part prise (fraction de la largeur, de la hauteur, depuis le coin en haut à gauche) ;
     ombre : l'opacité du voile sur le reste ; sort : le décalage de la part découpée */
  const PEPP=[[.18,.2],[.62,.16],[.4,.42],[.82,.38],[.15,.66],[.55,.7],[.84,.82],[.32,.88],[.72,.56]];
  function pizza(c,x,y,L,{sel=null,ombre=0,sort=0,traitX=null,traitY=null}={}){
    const dessine=(dx,dy)=>{ c.fillStyle='#d9922e'; c.fillRect(x+dx,y+dy,L,L); c.fillStyle='#f2c94c'; c.fillRect(x+dx+18,y+dy+18,L-36,L-36);
      c.fillStyle='#e03131'; for(const [a,b] of PEPP){ c.beginPath(); c.arc(x+dx+18+a*(L-36),y+dy+18+b*(L-36),L*.055,0,7); c.fill(); }
      c.fillStyle='#2f9e44'; for(const [a,b] of PEPP.slice(0,5)){ c.beginPath(); c.ellipse(x+dx+18+(1-b)*(L-36),y+dy+18+a*(L-36),L*.02,L*.035,a*3,0,7); c.fill(); } };
    dessine(0,0);
    if(sel){ const [fx,fy]=sel, w=L*fx, h=L*fy;
      c.fillStyle=`rgba(31,59,44,${ombre})`; c.fillRect(x+w,y,L-w,L); c.fillRect(x,y+h,w,L-h);
      if(sort){ c.fillStyle='#16301f'; c.fillRect(x,y,w,h); c.save(); c.beginPath(); c.rect(x,y-sort,w,h); c.clip(); dessine(0,-sort); c.restore(); }
      c.strokeStyle=CRAIE.ok; c.lineWidth=9; c.strokeRect(x,y-sort,w,h); }
    c.setLineDash([18,14]); c.strokeStyle=CRAIE.blanc; c.lineWidth=6;
    if(traitX!==null){ c.beginPath(); c.moveTo(x+L*traitX,y-10); c.lineTo(x+L*traitX,y+L+10); c.stroke(); }
    if(traitY!==null){ c.beginPath(); c.moveTo(x-10,y+L*traitY); c.lineTo(x+L+10,y+L*traitY); c.stroke(); }
    c.setLineDash([]);
  }
  const P0={x:160,y:160,L:400};
  const z=(T,t)=>T>=t?Math.min(1.2,Math.max(1,pop(T,t))):0;
  function etiquettes(c,T,ta,tb,va='0,5',vb='0,5'){ const {x,y,L}=P0;
    if(T>=ta) ecrire(c,va,x+L*.25,y+L+44,56*z(T,ta),CRAIE.d);
    if(T>=tb) ecrire(c,vb,x-26,y+L*.25,56*z(T,tb),CRAIE.c,'right'); }
  function coche(c,x,y,s=1){ c.strokeStyle=CRAIE.ok; c.lineWidth=16*s; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x+40*s,y+40*s); c.lineTo(x+120*s,y-50*s); c.stroke(); }
  const XD=805;

  function dessiner(T){ const c=tab.c; tab.effacer(); const W=tab.W, {x,y,L}=P0;
    if(T>=com){ /* le défi : 0,4 × 0,5 */
      if(T>=tC04) ecrire(c,'0,4',W/2-220,330,130*z(T,tC04),CRAIE.d);
      if(T>=tCx) ecrire(c,'×',W/2-30,330,110,CRAIE.blanc);
      if(T>=tC05) ecrire(c,'0,5',W/2+160,330,130*z(T,tC05),CRAIE.c);
      if(T>=tRep) ecrire(c,'= ?',W/2,520,120*z(T,tRep),CRAIE.blanc);
      tab.maj(); return; }
    if(T>=lec){ /* la leçon : multiplier par moins de 1 rapetisse ; 0,5 × 1, la moitié */
      const moitie=T>=tToute;
      pizza(c,x,y,L,{sel:moitie?[.5,1]:[.5,.5],ombre:.6,traitX:.5});
      etiquettes(c,T,lec,moitie?1e9:lec);
      if(moitie&&T>=tL1) ecrire(c,'1',x-26,y+L*.5,60*z(T,tL1),CRAIE.c,'right');
      if(T>=tMoins) ecrire(c,'× moins de 1 :',XD,240,62*z(T,tMoins),CRAIE.blanc);
      if(T>=tRap) ecrire(c,'ça rapetisse !',XD,330,62*z(T,tRap),CRAIE.faux);
      if(T>=tL05) ecrire(c,'0,5 × 1',XD,470,74*z(T,tL05),CRAIE.blanc);
      if(T>=tLMoit) ecrire(c,'= la moitié',XD,560,66*z(T,tLMoit),CRAIE.ok);
      if(T>=tMiam) coche(c,XD+150,640,.8);
      tab.maj(); return; }
    if(T>=cou){ /* la découpe : un petit carré dans le coin, un quart */
      const s=T>=tDec?60*lisse((T-tDec)/.8):0;
      pizza(c,x,y,L,{sel:[.5,.5],ombre:T>=tDec?.55:0,sort:s,traitX:.5,traitY:.5});
      etiquettes(c,T,cou,cou);
      if(T>=tCoin){ c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.strokeRect(x-12,y-s-12,L*.5+24,L*.5+24); }
      if(T>=tMorc) ecrire(c,'Mon morceau :',XD,280,62*z(T,tMorc),CRAIE.blanc);
      if(T>=tQuart){ ecrire(c,'un quart',XD,390,84*z(T,tQuart),CRAIE.d); ecrire(c,'de la pizza !',XD,480,62,CRAIE.blanc); }
      tab.maj(); return; }
    /* l'accroche : 0,5 de la largeur, 0,5 de la hauteur ; « multiplier agrandit toujours » */
    pizza(c,x,y,L,{traitX:T>=t05a?.5:null,traitY:T>=t05b?.5:null});
    etiquettes(c,T,t05a,t05b);
    if(T>=tMult) ecrire(c,'Multiplier,',XD,230,64*z(T,tMult),CRAIE.blanc);
    if(T>=tAgr) ecrire(c,'ça agrandit',XD,320,64*z(T,tAgr),CRAIE.blanc);
    if(T>=tTouj) ecrire(c,'toujours !',XD,410,64*z(T,tTouj),CRAIE.blanc);
    if(T>=tPlus) ecrire(c,'Plus que',XD,540,64*z(T,tPlus),CRAIE.d);
    if(T>=tMoit) ecrire(c,'la moitié !',XD,625,64*z(T,tMoit),CRAIE.d);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-coupe'), a3=dit('03-lecon'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const salut=[a0('Salut !'),a0('Je coupe une'),a0('pizza carrée.')];
  const p1=phr('00-accroche','Je prends 0,5 de la largeur,',[['Je',2],'prends',['0',1],['de',1],['la',1],'largeur']),
        p2=phr('00-accroche','et 0,5 de la hauteur.',['et',['0',3],['de',3],['la',2],'hauteur']);
  a0.jusque('Multiplier');
  const groupes=[
    groupe(acc+.1,tJe2-.08,352,62,...salut),
    ...suiteDe(cou,60,60,[p1,p2],[a0('Multiplier,'),a0('ça agrandit toujours.')],[a0('Alors j’aurai plus'),a0('que la moitié !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,60,[a1('Je découpe…')],[a1('Hé ! Mon morceau,'),a1('c’est un petit carré'),a1('dans le coin.')],[a1('Un quart de la pizza !')]),
    ...suiteDe(com,60,58,[a3('Multiplier par moins de 1,'),a3('ça rapetisse !')],[a3('La prochaine fois,'),a3('je prends toute la hauteur :'),a3('0,5 × 1, la moitié.')],[a3('Miam !')]),
    ...suiteDe(f,60,56,[a4('À toi : combien font'),a4('0,4 × 0,5 ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien font 0,5 × 0,5 ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('5 × 5, ça fait 25.'), r2=rd('Deux chiffres après'), r3=rd('la virgule : 0,25.'), r4=rd('Un quart !');

  poserMiniature(outils,acc+1,'0,5 × 0,5<br>c’est plus grand ?'+PARI,
    `<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/><rect x="95" y="35" width="180" height="180" fill="#d9922e"/><rect x="105" y="45" width="160" height="160" fill="#f2c94c"/><circle cx="135" cy="80" r="11" fill="#e03131"/><circle cx="225" cy="75" r="11" fill="#e03131"/><circle cx="170" cy="130" r="11" fill="#e03131"/><circle cx="235" cy="170" r="11" fill="#e03131"/><circle cx="130" cy="180" r="11" fill="#e03131"/><line x1="185" y1="28" x2="185" y2="222" stroke="#f8f9fa" stroke-width="5" stroke-dasharray="12 9"/><line x1="88" y1="125" x2="282" y2="125" stroke="#f8f9fa" stroke-width="5" stroke-dasharray="12 9"/></svg>`);
  return { clips,FIN,titre:'La pizza carrée',ceinture:1,finTitre:tJe2-.08,groupes,finClip:'05-abonne',
    cuts:[tJe2-.08,cou,q,r,lec,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:lec,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2,5',tq('A'),tq('2')],['0,25',tq('B'),tq('0',5)],['1',tq('C'),tq('1')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<lec, dansF=T>=f, gros=T<tJe2-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<cou){ if(T<tMult) g.montre(); else if(T<tPlus) g.reflechit(); else g.fier(); }
      else if(T<q){ if(T>=tHe&&T<tQuart) { g.oups(); scene.ry=-.12+.3*lisse((T-tHe)/.35); } else if(T>=tQuart) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<lec){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ if(T>=tMiam) g.fier(); else if(T>=tToute-.2) g.montre(); else g.reflechit(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
