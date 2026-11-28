/* ============================================================
   Série Idriss, monnaie CP — PAYSAGE 07 : « Le soir, la caisse d'Idriss » (micro cp_monnaie_reconnaitre), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-reconnaitre-paysage.json.
   Les pièces (rondes, en métal : 1 €, 2 €), les billets (en papier : 5, 10, 20, 50 €, plus il vaut, plus il est grand), lire le nombre.
   Questions : le billet bleu que montre Idriss → A (un billet de 20 €) ; la pièce de 2 € parmi trois → C.
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['cp-reconnaitre']=function(outils){
  const DUR={'00-accroche':8.85,'01-pieces':7.18,'02-billets':10.275,'03-lire':5.445,'04-question':15.85,'04b-reponse':9.535,
    '05-question':10.53,'05b-reponse':12.18,'06-appris':11.615,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-pieces':.8,'02-billets':1,'03-lire':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pi,bi,li,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:46px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tLe=m0('Le'), tVide=m0('vide'), tQue=m0('Que');
  const mp=(w,n=1)=>mot('01-pieces',w,n), tRondes=mp('rondes'), tMetal=mp('métal'), tUnP=mp('un'), tDeuxP=mp('deux');
  const mb=w=>mot('02-billets',w), tRect=mb('rectangles'), tPapier=mb('papier'), tCinqB=mb('Cinq'), tDixB=mb('dix'), tVingtB=mb('vingt'), tCinquanteB=mb('cinquante'), tPlusB=mb('Plus'), tGrand=mb('grand');
  const ml=w=>mot('03-lire',w), tLis=ml('lis'), tNombre=ml('nombre'), tDessus=ml('dessus');
  const mq1=(w,n=1)=>mot('04-question',w,n), tMontre=mq1('montre'), tQuoi=mq1("Qu'est-ce");
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tRect1=mr1('rectangle'), tBillet1=mr1('billet'), tVingt1=mr1('vingt'), tVingt1b=mr1('vingt',2);
  const mq2=(w,n=1)=>mot('05-question',w,n), tCherche=mq2('cherche'), tLaquelle=mq2('Laquelle');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tRonde2=mr2('ronde'), tPiece2=mr2('pièce'), tDeux2=mr2('deux'), tA2=mr2('A'), tBillet2=mr2('billet'), tCinq2=mr2('cinq'), tB2=mr2('B'), tPiece2b=mr2('pièce',2), tUn2=mr2('un',2);
  const mA=(w,n=1)=>mot('06-appris',w,n), tRondesA=mA('rondes'), tUnA=mA('un'), tDeuxA=mA('deux'), tBilletsA=mA('billets'), tCinqA=mA('cinq'), tDixA=mA('dix'), tVingtA=mA('vingt'), tCinquanteA=mA('cinquante'), tLisA=mA('lis');
  const finTitre=tLe-.08;

  /* le soir sur le port : l'étal, Idriss à droite ; la caisse se vide sur l'étal */
  const EX0=40, EX1=640, EY=470;
  const TAS=[[1,130,440,-.3],[2,250,452,.2],[20,380,420,-.12],[1,520,446,.4],[5,180,380,.15],[2,590,440,-.2],[10,450,370,.1],[50,300,330,-.06],[1,90,452,0]];
  function soir(c,T){ const g=c.createLinearGradient(0,0,0,300); g.addColorStop(0,'#5f3dc4'); g.addColorStop(1,'#ff922b'); c.fillStyle=g; c.fillRect(-120,0,1300,300);
    soleilCouchant(c,880,300,70,1); quaiBoisE(c,T,300); }
  function tas(c,T){ TAS.forEach(([v,x,y,a],k)=>{ const t0=tVide+k*.18; if(T<t0) return; const u=entreE(T,t0,t0+.7);
      const p=sautE([760,330],[x,y],u,v>2?160:60); euroE(c,v,p[0],p[1],v>2?30:40,{a:a*u+(1-u)*(v>2?2:6),grand:1}); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : à gauche les pièces, à droite les billets */
      c.save(); c.setLineDash([16,12]); c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=4; c.beginPath(); c.moveTo(372,150); c.lineTo(372,700); c.stroke(); c.restore();
      if(T>=tRondesA){ ecrire(c,'pièces',190,190,64*zoom(T,tRondesA,.4),CRAIE.jaune); }
      if(T>=tUnA) euroE(c,1,190,330,78,{z:zoom(T,tUnA,.4)});
      if(T>=tDeuxA) euroE(c,2,190,560,78,{z:zoom(T,tDeuxA,.4)});
      if(T>=tBilletsA) ecrire(c,'billets',720,190,64*zoom(T,tBilletsA,.4),CRAIE.jaune);
      [[5,tCinqA,560,330],[10,tDixA,880,330],[20,tVingtA,560,530],[50,tCinquanteA,880,530]].forEach(([v,t,x,y])=>{ if(T>=t) euroE(c,v,x,y,32,{z:zoom(T,t,.4),grand:1}); });
      if(T>=tLisA) for(const [x,y] of [[190,330],[190,560],[540,330],[860,330],[540,530],[860,530]]) etincelle(c,x+70,y-60,12+5*Math.sin(T*6+x));
      tab.maj(); return; }

    if(T>=q2){ /* trois objets : A un billet de 5 €, B une pièce de 1 €, C une pièce de 2 € */
      quaiBoisE(c,T,40); etalE(c,-20,470,620,{toile:false});
      const OB=[[5,240,300],[1,140,520],[2,350,520]], tl=[mq2('A'),mq2('B'),mq2('C')];
      OB.forEach(([v,x,y],k)=>{ if(T<tl[k]) return; let p=[x,y];
        if(k===2&&T>=r2) p=sautE([x,y],[x,y-40],entreE(T,tC2,tC2+.5),90);
        const lu=T>=r2&&((k===2&&T>=tC2&&T<tA2)||(k===0&&T>=tA2&&T<tB2)||(k===1&&T>=tB2))?.55+.45*Math.sin(T*5):0;
        euroE(c,v,p[0],p[1],v>2?44:(v===2?62:62),{z:zoom(T,tl[k],.4),lueur:lu,grand:1});
        etiquette(c,'ABC'[k],x-(v>2?150:95),y-60,T,tl[k],CRAIE.blanc,46); });
      if(T<r2){ if(T>=tLaquelle) ecrire(c,'?',440,170,110*zoom(T,tLaquelle,.5),CRAIE.jaune); }
      else {
        if(T>=tPiece2) ecrire(c,'pièce',350,640,44*zoom(T,tPiece2,.4),CRAIE.blanc);
        if(T>=tDeux2) ecrire(c,'2 €',350,385,64*zoom(T,tDeux2,.4),CRAIE.ok);
        if(T>=tBillet2) ecrire(c,'billet',240,170,44*zoom(T,tBillet2,.4),CRAIE.blanc);
        if(T>=tCinq2) ecrire(c,'5 €',410,170,52*zoom(T,tCinq2,.4),CRAIE.blanc);
        if(T>=tPiece2b) ecrire(c,'pièce',140,640,44*zoom(T,tPiece2b,.4),CRAIE.blanc);
        if(T>=tUn2) ecrire(c,'1 €',140,385,52*zoom(T,tUn2,.4),CRAIE.blanc);
        if(T>=tRonde2&&T<tA2) for(const [x,y] of [[260,470],[440,580]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }

    if(T>=q1){ /* Idriss lève un billet bleu */
      quaiBoisE(c,T,40);
      idrissE(c,170,715,1.15,{montre:1,T});
      const lu=T>=r1&&T>=tA1?.55+.45*Math.sin(T*5):0;
      if(T>=tMontre) euroE(c,20,345,200,46,{z:zoom(T,tMontre,.4),grand:1,a:-.12,lueur:lu});
      if(T<r1){ if(T>=tQuoi) ecrire(c,'?',420,400,120*zoom(T,tQuoi,.5),CRAIE.jaune); }
      else { if(T>=tBillet1) ecrire(c,'billet',360,400,70*zoom(T,tBillet1,.4),CRAIE.blanc);
        if(T>=tVingt1) ecrire(c,'20 €',360,500,90*zoom(T,tVingt1,.4),CRAIE.ok);
        if(T>=tRect1&&T<tBillet1){ c.save(); c.strokeStyle=CRAIE.jaune; c.lineWidth=6; c.setLineDash([12,8]); c.translate(345,200); c.rotate(-.12); c.strokeRect(-135,-72,270,144); c.restore(); } }
      tab.maj(); return; }

    if(T>=li){ /* je lis le nombre : la loupe sur le 2 de la pièce, puis sur le 20 du billet */
      euroE(c,2,300,380,120); euroE(c,20,760,380,56,{grand:1});
      const u=entreE(T,tNombre-.2,tDessus+.3), lx=T<tLis?300:(300+(735-300)*u), ly=T<tLis?560:(380-8);
      loupeE(c,lx,ly,92,{z:zoom(T,li+.2,.4)});
      if(T>=tNombre) ecrire(c,'je lis le nombre',528,130,62*zoom(T,tNombre,.4),CRAIE.jaune);
      tab.maj(); return; }

    if(T>=bi){ /* les billets en rang, du plus petit au plus grand */
      if(T>=tRect) ecrire(c,'billets',528,120,72*zoom(T,tRect,.4),CRAIE.jaune);
      if(T>=tPapier) ecrire(c,'en papier',528,195,46*zoom(T,tPapier,.4),CRAIE.blanc);
      const B=[[5,tCinqB],[10,tDixB],[20,tVingtB],[50,tCinquanteB]]; let x=48;
      B.forEach(([v,t],k)=>{ const w=44*4.6*({5:1,10:1.06,20:1.11,50:1.17}[v]); if(T>=t) euroE(c,v,x+w/2,400,44,{z:zoom(T,t,.4),grand:1}); x+=w+30; });
      if(T>=tPlusB){ const u=entreE(T,tPlusB,tGrand+.4); c.strokeStyle=CRAIE.ok; c.lineWidth=8; c.beginPath(); c.moveTo(60,560); c.lineTo(60+900*u,560); c.stroke();
        if(u>=1){ c.fillStyle=CRAIE.ok; c.beginPath(); c.moveTo(985,560); c.lineTo(950,540); c.lineTo(950,580); c.closePath(); c.fill(); }
        if(T>=tGrand) ecrire(c,'plus grand',528,630,56*zoom(T,tGrand,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T>=pi){ /* les pièces : rondes, en métal */
      if(T>=tRondes) ecrire(c,'pièces',528,120,72*zoom(T,tRondes,.4),CRAIE.jaune);
      if(T>=tMetal) ecrire(c,'rondes, en métal',528,195,46*zoom(T,tMetal,.4),CRAIE.blanc);
      if(T>=tUnP){ euroE(c,1,330,430,120,{z:zoom(T,tUnP,.4)}); ecrire(c,'pièce',330,620,50,CRAIE.blanc); }
      if(T>=tDeuxP){ euroE(c,2,730,430,120,{z:zoom(T,tDeuxP,.4)}); ecrire(c,'pièce',730,620,50,CRAIE.blanc); }
      tab.maj(); return; }

    /* le soir : Idriss vide sa caisse sur l'étal */
    soir(c,T); etalE(c,EX0,EX1,EY);
    const pench=entreE(T,tVide-.4,tVide+.2);
    c.save(); c.translate(760,EY); c.rotate(-pench*1.2); caisseE(c,0,0,170,110); c.restore();
    idrissE(c,900,715,1.3,{montre:T>=tVide&&T<tQue?1:0,T});
    tas(c,T);
    if(T>=tQue) for(const [x,y] of [[140,300],[460,280],[600,380]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Idriss me montre ceci.'); const phrase1=[qa("Qu'est-ce que c'est ?")]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); const phrase2=[qb('Idriss cherche la pièce de deux euros.')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['un billet de 20 €',tqa('A'),tqa('euros',1)],['une pièce de 20 €',tqa('B'),tqa('euros',2)],['un billet de 2 €',tqa('C'),tqa('euros',3)]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('un billet de 20 €',[mr1('un',3),mr1('billet',2),mr1('billet',2),tVingt1b,tVingt1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:[phraseE('Idriss cherche la pièce de 2 €.',[mq2('Idriss'),tCherche,mq2('la'),mq2('pièce'),mq2('de'),mq2('deux'),mq2('euros')]),phraseE('Laquelle est-ce ?',[tLaquelle,tLaquelle,tLaquelle])],pause:pause2,
      choix:[['A',tqb('A'),tqb('A')+.3],['B',tqb('B'),tqb('B')+.3],['C',tqb('C'),tqb('C')+.3]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],reponse:[phraseE('une pièce de 2 €',[tPiece2,tPiece2,tPiece2,tDeux2,tDeux2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-billets')-.5,'Pièce<br>ou billet ?');
  return { clips,FIN,titre:"Le soir, la caisse d'Idriss",ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pi,bi,li,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) T>=tQue&&T<pi?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
