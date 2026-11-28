/* ============================================================
   Série Idriss, monnaie CP — PAYSAGE 08 : « Combien m'a-t-on donné ? » (micro cp_monnaie_valeur), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-valeur-paysage.json.
   Compter un tas d'argent : le plus gros d'abord (5, puis 6, 7, puis 8), puis deux billets de 10 et deux pièces de 1 (22).
   Questions : trois pièces de 2 € → C (6 €) ; 20 € + 5 € + 2 € → B (27 €).
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['cp-valeur']=function(outils){
  const DUR={'00-accroche':9.005,'01-compter':11.22,'02-gros':4.505,'03-dizaines':8.425,'04-question':15.43,'04b-reponse':9.335,
    '05-question':18.24,'05b-reponse':10.215,'06-appris':6.98,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-compter':1,'02-gros':1,'03-dizaines':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,co,gr,di,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:52px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tUne=m0('Une'), tDorade=m0('dorade'), tPose=m0('pose'), tCombien0=m0('Combien');
  const mc=(w,n=1)=>mot('01-compter',w,n), tBillet=mc('billet'), tCinq=mc('cinq'), tDeux=mc('deux'), tSix=mc('six'), tSept=mc('sept'), tUnC=mc('un'), tHuit=mc('huit'), tHuit2=mc('huit',2);
  const mg=w=>mot('02-gros',w), tToujours=mg('toujours'), tGros=mg('gros'), tPetits=mg('petits');
  const md=(w,n=1)=>mot('03-dizaines',w,n), tDixD=md('dix',2), tVingtD=md('vingt'), tPlusD=md('Plus'), tVingtUn=md('vingt',2), tVingtDeux=md('vingt-deux'), tVingtDeux2=md('vingt-deux',2);
  const mq1=(w,n=1)=>mot('04-question',w,n), tGarcon=mq1('garçon'), tTroisQ=mq1('trois'), tCombien1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDeux1=mr1('Deux'), tQuatre1=mr1('quatre'), tSix1=mr1('six'), tSix1b=mr1('six',2), tA1=mr1('A'), tNombre1=mr1('nombre');
  const mq2=(w,n=1)=>mot('05-question',w,n), tPecheur=mq2('pêcheur'), tVingtQ=mq2('vingt'), tCinqQ=mq2('cinq'), tDeuxQ=mq2('deux'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tVingt2=mr2('Vingt'), tVC=mr2('vingt-cinq'), tVS=mr2('vingt-six'), tVSept=mr2('vingt-sept'), tVSept2=mr2('vingt-sept',2), tC2=mr2('C'), tOublie=mr2('oublié');
  const mA=w=>mot('06-appris',w), tGrosA=mA('gros'), tResteA=mA('reste');
  const finTitre=tUne-.08;

  /* le marché : l'étal à gauche avec la dorade, la dame à droite ; elle pose son argent dans la zone du bas */
  const EX0=40, EX1=640, EY=430;
  function marche(c,T){ quaiBoisE(c,T,140); etalE(c,EX0,EX1,EY);
    c.fillStyle='#d0ebff'; c.strokeStyle='#74c0fc'; c.lineWidth=4; c.beginPath(); c.roundRect(EX0+16,260,EX1-EX0-32,EY-260,14); c.fill(); c.stroke();
    if(T>=tDorade) poissonE(c,340,345,330,'#f3a5b8',{T,z:zoom(T,tDorade,.4),ray:'#c2255c'});
    dameE(c,870,715,1.05,{tend:T>=tPose&&T<tPose+1.6?1:0,T}); }
  /* trois objets en rang, avec leurs nombres comptés au-dessus */
  function compte(c,T,objs,y,labels){ objs.forEach(([v,x,t,tt],k)=>{ if(T<t) return;
      const lu=T>=tt&&T<tt+1.1?.55+.45*Math.sin(T*5):0;
      euroE(c,v,x,y,v>2?44:66,{z:zoom(T,t,.4),grand:1,lueur:lu}); });
    labels.forEach(([s,x,t])=>{ if(T>=t) ecrire(c,s,x,y-150,72*zoom(T,t,.4),CRAIE.jaune); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* le plus gros billet d'abord, puis le reste */
      compte(c,T,[[5,250,ap,tGrosA],[2,560,ap,tResteA],[1,780,ap,tResteA+.3]],400,[]);
      if(T>=tGrosA){ c.strokeStyle=CRAIE.ok; c.lineWidth=8; const u=entreE(T,tGrosA,tResteA+.6); c.beginPath(); c.moveTo(150,530); c.lineTo(150+720*u,530); c.stroke(); }
      if(T>=tResteA) formuleE(c,T,528,640,['5','+','2','+','1','=','8 €'],Array(7).fill(tResteA),76,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }

    if(T>=q2){ /* le pêcheur voisin pose un billet de 20 €, un billet de 5 €, une pièce de 2 € */
      quaiBoisE(c,T,40);
      if(T>=tPecheur) idrissE(c,105,715,1.0,{T,cire:'#69db7c',cireB:'#2b8a3e',peau:'#8d5524'});
      const it=[[20,330,220,tVingtQ,tVingt2],[5,330,390,tCinqQ,tVC],[2,330,545,tDeuxQ,tVS]];
      it.forEach(([v,x,y,t,tt])=>{ if(T<t) return; const lu=T>=r2&&T>=tt&&T<tt+1.2?.55+.45*Math.sin(T*5):0;
        euroE(c,v,x,y,v>2?36:56,{z:zoom(T,t,.4),grand:1,lueur:lu}); });
      if(T<r2){ if(T>=tCombien2) ecrire(c,'?',460,100,90*zoom(T,tCombien2,.5),CRAIE.jaune); }
      else {
        if(T>=tVingt2) ecrire(c,'20',455,220,56*zoom(T,tVingt2,.4),CRAIE.jaune);
        if(T>=tVC) ecrire(c,'25',455,390,56*zoom(T,tVC,.4),CRAIE.jaune);
        if(T>=tVS) ecrire(c,'26, 27',448,545,48*zoom(T,tVS,.4),CRAIE.jaune);
        if(T>=tVSept2) formuleE(c,T,235,90,['20','+','5','+','2','=','27 €'],Array(7).fill(tVSept2),52,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tOublie){ cercle(c,330,545,80,CRAIE.faux,entreE(T,tOublie,tOublie+.4)); ecrire(c,'25 € : pièce oubliée',235,660,40,CRAIE.faux); } }
      tab.maj(); return; }

    if(T>=q1){ /* un garçon pose trois pièces de 2 € */
      quaiBoisE(c,T,40);
      if(T>=tGarcon) enfantE(c,110,560,1.45,{k:0,T});
      const P=[[210,tDeux1],[320,tQuatre1],[430,tSix1]];
      P.forEach(([x,tt],k)=>{ const t=tTroisQ+k*.15; if(T<t) return; const lu=T>=r1&&T>=tt&&T<tt+1?.55+.45*Math.sin(T*5):0;
        euroE(c,2,x,650,46,{z:zoom(T,t,.4),lueur:lu}); if(T>=r1&&T>=tt) ecrire(c,String(2*k+2),x,560,62*zoom(T,tt,.4),CRAIE.jaune); });
      if(T<r1){ if(T>=tCombien1) ecrire(c,'?',330,160,110*zoom(T,tCombien1,.5),CRAIE.jaune); }
      else { if(T>=tSix1b) formuleE(c,T,300,150,['2','+','2','+','2','=','6 €'],Array(7).fill(tSix1b),56,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
        if(T>=tNombre1) ecrire(c,'3 pièces, pas 3 €',300,260,44*zoom(T,tNombre1,.4),CRAIE.faux); }
      tab.maj(); return; }

    if(T>=di){ /* deux billets de 10 € et deux pièces de 1 € : 10, 20… 21, 22 */
      compte(c,T,[[10,190,di+.2,tDixD],[10,450,di+.4,tVingtD],[1,670,tPlusD,tVingtUn],[1,830,tPlusD+.15,tVingtDeux]],400,
        [['10',190,tDixD],['20',450,tVingtD],['21',670,tVingtUn],['22',830,tVingtDeux]]);
      if(T>=tVingtDeux2) formuleE(c,T,528,620,['10','+','10','+','1','+','1','=','22 €'],Array(9).fill(tVingtDeux2),72,
        [CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }

    if(T>=co){ /* je commence par le billet : 5, puis 6, 7, puis 8 */
      const objs=[[5,250,co+.1,tCinq],[2,560,co+.2,tSix],[1,780,co+.3,tHuit]];
      compte(c,T,objs,400,[['5',250,tCinq],['8',780,tHuit]]);
      if(T>=tSix) ecrire(c,T<tSept?'6':'6, 7',560,250,72*zoom(T,T<tSept?tSix:tSept,.4),CRAIE.jaune);
      if(T>=tHuit2) formuleE(c,T,528,620,['5','+','2','+','1','=','8 €'],Array(7).fill(tHuit2),80,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=gr-.4) for(const [x,y] of [[120,560],[930,560]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      /* 02 : le plus gros d'abord, une flèche passe sur les trois */
      tab.maj(); return; }

    /* une dame achète une dorade et pose son argent */
    marche(c,T);
    const Z=[[5,170,600],[2,370,600],[1,500,600]];
    Z.forEach(([v,x,y],k)=>{ const t0=tPose+k*.3; if(T<t0) return; const u=entreE(T,t0,t0+.6); const p=sautE([780,520],[x,y],u,110);
      euroE(c,v,p[0],p[1],v>2?40:58,{grand:1}); });
    if(T>=tCombien0) ecrire(c,'?',900,150,130*zoom(T,tCombien0,.5),CRAIE.jaune);
    tab.maj();
  }
  /* 02-gros : le même rang que 01, avec une flèche du plus gros au plus petit */
  const dessin01=dessiner;
  function dessinerTout(T){ if(T>=gr&&T<di){ const c=tab.c; tab.effacer();
      compte(c,T,[[5,250,0,tToujours],[2,560,0,tPetits],[1,780,0,tPetits+.3]],400,[]);
      if(T>=tToujours){ const u=entreE(T,tToujours,tPetits+.6); c.strokeStyle=CRAIE.ok; c.lineWidth=8; c.beginPath(); c.moveTo(150,540); c.lineTo(150+720*u,540); c.stroke();
        if(u>=1){ c.fillStyle=CRAIE.ok; c.beginPath(); c.moveTo(900,540); c.lineTo(866,520); c.lineTo(866,560); c.closePath(); c.fill(); } }
      if(T>=tGros) ecrire(c,"le plus gros d'abord",528,150,66*zoom(T,tGros,.4),CRAIE.jaune);
      tab.maj(); return; }
    dessin01(T); }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien a-t-il donné ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien en tout ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('3 pièces de 2 €.',[tTroisQ,mq1('pièces'),mq1('de'),mq1('deux'),mq1('euros')]),...phrase1],pause:pause1,
      choix:[['3 €',tqa('A'),tqa('euros',2)],['5 €',tqa('B'),tqa('euros',3)],['6 €',tqa('C'),tqa('euros',4)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('2 + 2 + 2 = 6 €',[tDeux1,tQuatre1,tQuatre1,tSix1,tSix1,tSix1b,tSix1b,tSix1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('20 € + 5 € + 2 €',[tVingtQ,tVingtQ,tCinqQ,tCinqQ,tCinqQ,tDeuxQ,tDeuxQ,tDeuxQ]),...phrase2],pause:pause2,
      choix:[['3 €',tqb('A'),tqb('euros',4)],['27 €',tqb('B'),tqb('euros',5)],['25 €',tqb('C'),tqb('euros',6)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],reponse:[phraseE('20 + 5 + 2 = 27 €',[tVingt2,tVC,tVC,tVS,tVS,tVSept2,tVSept2,tVSept2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-compter')-.5,'Combien<br>dans le tas ?');
  return { clips,FIN,titre:"Combien m'a-t-on donné ?",ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,co,gr,di,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessinerTout(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<co) g.montre();
      else if(T<q1) (T>=tHuit2&&T<gr)||(T>=tVingtDeux2&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
