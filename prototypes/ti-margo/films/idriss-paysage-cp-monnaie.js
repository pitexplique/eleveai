/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 03 : « J'achète mon poisson » (micro cp_monnaie_constituer), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2/3-dessins.js + idriss-dessins.js.
   Voix : manim/voix/idriss-cp-monnaie-paysage.json.
   Un poisson à 7 € : billet de 5 € + pièce de 2 €, ou 5 + 1 + 1. Plusieurs façons de payer.
   Questions : un crabe à 4 € → C (2 € + 2 €) ; un gros poisson à 8 € → B (5 € + 2 € + 1 €).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480), les trois choix dessinés en pièces ; la carte est à droite.
   ============================================================ */
FILMS['cp-monnaie']=function(outils){
  const DUR={'00-accroche':10.87,'01-pieces':5.635,'02-faire7':9.5,'03-autre':9.13,'04-question':15.94,'04b-reponse':9.89,
    '05-question':14.965,'05b-reponse':10.63,'06-appris':6.97,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-pieces':.8,'02-faire7':1.2,'03-autre':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pi,f7,au,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:52px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tAu=m0('Au'), tVend=m0('vend'), tPoisson=m0('poisson'), tSept=m0('sept'), tMoi=m0('Moi'), tPM=m0('porte-monnaie'), tPieces=m0('pièces');
  const mp=w=>mot('01-pieces',w), tUnP=mp('un'), tDeuxP=mp('deux'), tCinqP=mp('cinq');
  const m7=(w,n=1)=>mot('02-faire7',w,n), tSept7=m7('sept'), tCinq7=m7('cinq'), tDeux7=m7('deux'), tCinq7b=m7('Cinq',2), tPlus7=m7('plus'), tDeux7b=m7('deux',2), tSept7b=m7('sept',2), tBon=m7('bon');
  const ma=(w,n=1)=>mot('03-autre',w,n), tAussi=ma('aussi'), tCinqA=ma('cinq'), tPlusA=ma('plus'), tUnA=ma('un'), tPlusA2=ma('plus',2), tUnA2=ma('un',2), tSeptA=ma('sept'), tFacons=ma('façons');
  const mq1=(w,n=1)=>mot('04-question',w,n), tCrabe=mq1('crabe'), tQuatreQ=mq1('quatre'), tQuelles=mq1('Quelles'), tAq=mq1('A'), tBq=mq1('B'), tCq=mq1('C');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDeux1=mr1('Deux'), tPlus1=mr1('plus'), tDeux1b=mr1('deux',2), tQuatre1=mr1('quatre'), tA1=mr1('A'), tTrois1=mr1('trois'), tB1=mr1('B'), tSix1=mr1('six'), tTrop1=mr1('trop');
  const mq2=(w,n=1)=>mot('05-question',w,n), tGros=mq2('gros'), tHuitQ=mq2('huit'), tQue=mq2('Que'), tAq2=mq2('A'), tBq2=mq2('B'), tCq2=mq2('C');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tCinq2=mr2('Cinq'), tPlus2=mr2('plus'), tDeux2=mr2('deux'), tSept2=mr2('sept'), tPlus2b=mr2('plus',2), tUn2=mr2('un'), tHuit2=mr2('huit'), tDonne2=mr2('donne'), tMerci=mr2('Merci');
  const mA=w=>mot('06-appris',w), tAjoute=mA("j'ajoute"), tBillets=mA('billets'), tPrix=mA('prix'), tFaconsA=mA('façons');
  const finTitre=tAu-.08;

  /* le marché : l'étal à gauche (un gros poisson, son prix), Idriss, le porte-monnaie de Ti Margo à droite ; on paie dans la zone du bas */
  const EX0=40, EX1=620, EY=540;
  const POS1=[820,410], POS2=[960,410], POS5=[890,515], PM=[920,700];
  const Z5=[200,645], Z2=[360,645], Z1a=[330,645], Z1b=[440,645];
  function marche(c,T,{idriss=true,lueurP=0}={}){
    quaiBoisE(c,T,140); etalE(c,EX0,EX1,EY);
    c.fillStyle='#d0ebff'; c.strokeStyle='#74c0fc'; c.lineWidth=4; c.beginPath(); c.roundRect(EX0+16,300,EX1-EX0-32,EY-300,14); c.fill(); c.stroke();
    if(T>=tPoisson) poissonE(c,330,440,330,'#ffa94d',{T,z:zoom(T,tPoisson,.4),ray:'#e8590c'});
    if(T>=tSept) prixE(c,'7 €',330,235,78,{z:zoom(T,tSept,.5),lueur:lueurP});
    if(idriss) idrissE(c,712,705,1.3,{montre:T>=tVend&&T<tMoi?1:0,T});
    if(T>=tPM) porteMonnaieE(c,PM[0],PM[1],220,1); }
  function zonePaie(c){ c.save(); c.setLineDash([14,10]); c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=4; c.beginPath(); c.roundRect(90,585,440,120,20); c.stroke(); c.restore(); }
  /* une rangée de pièces / billets à partir de x0, centrée en y ; renvoie le bord droit */
  function rangee(c,T,vals,x0,y,{z=1,lueur=0,terne=0}={}){ let x=x0;
    vals.forEach(v=>{ const w=v>2?128:96; euroE(c,v,x+w/2,y,v>2?26:38,{z,lueur,terne}); x+=w+8; }); return x; }
  function choixDessines(c,T,rangs,ts,{bonne=-1,tB=1e9,ternes=[],sommes=[]}={}){
    rangs.forEach((vals,k)=>{ if(T<ts[k]) return; const y=420+k*110, z=zoom(T,ts[k],.4);
      etiquette(c,'ABC'[k],48,y,T,ts[k],CRAIE.blanc,50);
      const tn=ternes[k]&&T>=ternes[k]?1:0, lu=k===bonne&&T>=tB?.5+.5*Math.sin(T*5):0;
      const xd=rangee(c,T,vals,95,y,{z,lueur:lu,terne:tn});
      const s=sommes[k]; if(s&&T>=s[1]) ecrire(c,s[0],xd+40,y+2,54*zoom(T,s[1],.4),s[2]); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : j'ajoute jusqu'au prix */
      marche(c,T,{idriss:false,lueurP:T>=tPrix?.5+.5*Math.sin(T*4):0}); zonePaie(c);
      euroE(c,5,Z5[0],Z5[1],34,{lueur:T>=tBillets&&T<tPrix?.6:0}); euroE(c,2,Z2[0],Z2[1],44,{lueur:T>=tAjoute&&T<tBillets?.6:0});
      if(T>=tAjoute) formuleE(c,T,830,200,['5 €','+','2 €','=','7 €'],[tAjoute,tAjoute,tAjoute,tPrix,tPrix],74,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tFaconsA) for(const [x,y] of [[640,120],[1010,300]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      tab.maj(); return; }

    if(T>=q2){ /* un gros poisson à 8 € ; les trois choix en pièces */
      quaiBoisE(c,T,40);
      const lu=T>=r2&&T>=tDonne2?.5+.5*Math.sin(T*5):0;
      if(T>=tGros) poissonE(c,190,200,300,'#4dabf7',{T,z:zoom(T,tGros,.4),ray:'#1864ab',lueur:lu});
      if(T>=tHuitQ) prixE(c,'8 €',405,200,66,{z:zoom(T,tHuitQ,.5)});
      choixDessines(c,T,[[5,2],[5,2,1],[2,1,1]],[tAq2,tBq2,tCq2],{bonne:1,tB:T>=r2?tB2:1e9,ternes:T>=r2?[r2+.6,0,r2+.6]:[],
        sommes:T>=r2?[['7 €',r2+.6,CRAIE.faux],null,['4 €',r2+.6,CRAIE.faux]]:[]});
      if(T<r2){ if(T>=tQue) ecrire(c,'?',250,325,90*zoom(T,tQue,.5),CRAIE.jaune); }
      else { formuleE(c,T,240,328,['5','+','2','+','1','=','8 €'],[tCinq2,tPlus2,tDeux2,tPlus2b,tUn2,tHuit2,tHuit2],60,
          [CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
        if(T>=tMerci) for(const [x,y] of [[40,110],[350,90]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }

    if(T>=q1){ /* un crabe à 4 € ; les trois choix en pièces */
      quaiBoisE(c,T,40);
      if(T>=tCrabe) crabeE(c,170,220,1.45,{z:zoom(T,tCrabe,.4),T,marche:0,lueur:T>=r1&&T>=tQuatre1&&T<tA1?.6:0});
      if(T>=tQuatreQ) prixE(c,'4 €',380,200,70,{z:zoom(T,tQuatreQ,.5)});
      choixDessines(c,T,[[2,1],[5,1],[2,2]],[tAq,tBq,tCq],{bonne:2,tB:T>=r1?tC1:1e9,ternes:T>=r1?[tA1,tB1,0]:[],
        sommes:T>=r1?[['3 €',tTrois1,CRAIE.faux],['6 €',tSix1,CRAIE.faux],null]:[]});
      if(T<r1){ if(T>=tQuelles) ecrire(c,'?',250,325,90*zoom(T,tQuelles,.5),CRAIE.jaune); }
      else formuleE(c,T,240,328,['2','+','2','=','4 €'],[tDeux1,tPlus1,tDeux1b,tQuatre1,tQuatre1],66,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=r1&&T>=tTrop1) ecrire(c,'trop !',420,530,46*zoom(T,tTrop1,.4),CRAIE.faux);
      tab.maj(); return; }

    /* le marché : l'accroche, les pièces, deux façons de faire 7 € */
    marche(c,T,{idriss:T<pi,lueurP:(T>=f7&&T>=tBon&&T<au)||(T>=au&&T>=tSeptA)?.5+.5*Math.sin(T*4):0});
    if(T>=f7) zonePaie(c);
    /* le billet de 5, la pièce de 2, la pièce de 1, et une 2e pièce de 1 qui sort du porte-monnaie */
    const apparu=(t)=>T>=t?zoom(T,t,.4):0;
    let p5=POS5, p2=POS2, p1=POS1, p1b=null;
    if(T>=f7){ p5=sautE(POS5,Z5,entreE(T,tCinq7-.2,tCinq7+.5),120); p2=sautE(POS2,Z2,entreE(T,tDeux7-.2,tDeux7+.5),120); }
    if(T>=au){ p2=sautE(Z2,POS2,entreE(T,au,au+.6),100); p1=sautE(POS1,Z1a,entreE(T,tUnA-.2,tUnA+.5),120);
      if(T>=tUnA2-.2) p1b=sautE([PM[0],PM[1]-120],Z1b,entreE(T,tUnA2-.2,tUnA2+.5),140); }
    if(T>=pi||T>=tPieces){
      const z1=T>=pi?apparu(tUnP):apparu(tPieces), z2=T>=pi?apparu(tDeuxP):apparu(tPieces+.15), z5=T>=pi?apparu(tCinqP):0;
      euroE(c,5,p5[0],p5[1],34,{z:z5}); euroE(c,2,p2[0],p2[1],44,{z:z2}); euroE(c,1,p1[0],p1[1],40,{z:z1});
      if(p1b) euroE(c,1,p1b[0],p1b[1],40); }
    if(T>=f7&&T<au){ formuleE(c,T,830,200,['5','+','2','=','7 €'],[tCinq7b,tPlus7,tDeux7b,tSept7b,tSept7b],86,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tBon){ coche(c,470,235,1.3); for(const [x,y] of [[640,120],[1010,300]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
    if(T>=au){ formuleE(c,T,830,200,['5','+','1','+','1','=','7 €'],[tCinqA,tPlusA,tUnA,tPlusA2,tUnA2,tSeptA,tSeptA],72,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tFacons) for(const [x,y] of [[640,120],[1010,300]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Un crabe coûte quatre euros.'); const phrase1=[qa('Quelles pièces donner ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Ce gros poisson coûte huit euros.'); const phrase2=[qb('Que donner ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('Un crabe : 4 €.',[mq1('Un'),tCrabe,tCrabe,tQuatreQ,tQuatreQ]),...phrase1],pause:pause1,
      choix:[['2 € + 1 €',tqa('A'),tqa('euro',1)],['5 € + 1 €',tqa('B'),tqa('euro',2)],['2 € + 2 €',tqa('C'),tqa('euros',5)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('2 € + 2 € = 4 €',[tDeux1,tDeux1,tPlus1,tDeux1b,tDeux1b,tQuatre1,tQuatre1,tQuatre1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('Ce gros poisson : 8 €.',[mq2('Ce'),tGros,mq2('poisson'),mq2('poisson'),tHuitQ,tHuitQ]),...phrase2],pause:pause2,
      choix:[['5 € + 2 €',tqb('A'),tqb('deux',1)],['5 € + 2 € + 1 €',tqb('B'),tqb('un',1)],['2 € + 1 € + 1 €',tqb('C'),tqb('un',3)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('5 + 2 + 1 = 8 €',[tCinq2,tPlus2,tDeux2,tPlus2b,tUn2,tHuit2,tHuit2,tHuit2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-faire7')-.5,'Payer<br>le bon prix');
  return { clips,FIN,titre:'Payer le bon prix',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pi,f7,au,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<pi) T>=tMoi?g.fier():g.montre();
      else if(T<q1) (T>=tBon&&T<au)||(T>=tFacons&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
