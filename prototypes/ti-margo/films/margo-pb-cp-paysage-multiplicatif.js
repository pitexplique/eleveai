/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 04 : « Les fraises de l'anniversaire » (micro cp_probleme_multiplicatif), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-multiplicatif-paysage.json.
   4 assiettes de 3 fraises : groupes égaux ; je compte de 3 en 3 : 3, 6, 9, 12 ; 3 + 3 + 3 + 3 = 12 ; 4 fois 3 = 12.
   Questions : 3 copains, 2 ballons chacun → B (6) ; 2 rangées de 5 bougies → C (10). Au CP : « 4 fois 3 », jamais le signe.
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */

/* Une bougie (x, yBas ; k = échelle) : éteinte, allumée (flamme qui danse) ou soufflée (un filet de fumée) */
function bougieE_mult(c,x,yBas,k,{feu=0,fumee=0,T=0,coul='#74c0fc',lueur=0}={}){ const h=78*k, w=22*k;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,yBas-h-20*k,40*k,0,7); c.fill(); }
  c.fillStyle=coul; c.fillRect(x-w/2,yBas-h,w,h); c.strokeStyle='#f8f9fa'; c.lineWidth=4*k;
  for(let y=yBas-h+12*k;y<yBas;y+=22*k){ c.beginPath(); c.moveTo(x-w/2,y+7*k); c.lineTo(x+w/2,y-4*k); c.stroke(); }
  c.strokeStyle='#343a40'; c.lineWidth=3*k; c.beginPath(); c.moveTo(x,yBas-h); c.lineTo(x,yBas-h-10*k); c.stroke();
  if(feu>0){ const f=(1+.12*Math.sin(T*11+x))*Math.min(1,feu);
    c.fillStyle='#ff922b'; c.beginPath(); c.ellipse(x,yBas-h-22*k,10*k*f,20*k*f,0,0,7); c.fill();
    c.fillStyle='#ffe066'; c.beginPath(); c.ellipse(x,yBas-h-18*k,4.5*k*f,10*k*f,0,0,7); c.fill(); }
  if(fumee>0&&fumee<1){ c.strokeStyle=`rgba(222,226,230,${.8*(1-fumee)})`; c.lineWidth=4*k; c.beginPath(); c.moveTo(x,yBas-h-10*k);
    c.bezierCurveTo(x-12*k,yBas-h-30*k-40*k*fumee,x+12*k,yBas-h-50*k-40*k*fumee,x,yBas-h-70*k-50*k*fumee); c.stroke(); } }

FILMS['multiplicatif']=function(outils){
  const DUR={'00-accroche':12.07,'01-pareil':5.8,'02-compter':7.355,'03-fois':5.555,'04-question':16.28,'04b-reponse':10.385,
    '05-question':14.04,'05b-reponse':8.45,'06-appris':9.99,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-pareil':1,'02-compter':1.2,'03-fois':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pa,co,fo,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tCest=m0("C'est"), tAnniv=m0('anniversaire'), tTable=m0('table'), tQuatre0=m0('quatre'), tTrois0=m0('trois'), tCombien0=m0('Combien');
  const mp=(w,n=1)=>mot('01-pareil',w,n), tToutes=mp('Toutes'), tPareil=mp('pareil'), tTroisP=mp('trois'), tGroupesP=mp('groupes');
  const mco=(w,n=1)=>mot('02-compter',w,n), tCompte=mco('compte'), tC3=mco('trois',3), tC6=mco('six'), tC9=mco('neuf'), tC12=mco('douze'), tC12b=mco('douze',2);
  const mf=(w,n=1)=>mot('03-fois',w,n), tQuatreF=mf('Quatre'), tTroisF=mf('trois'), tQuatreF2=mf('quatre',2), tFoisF=mf('fois'), tTroisF2=mf('trois',2), tDouzeF=mf('douze');
  const mq1=(w,n=1)=>mot('04-question',w,n), tTroisQ=mq1('Trois'), tCopains=mq1('copains'), tChacun=mq1('Chacun'), tDeuxQ=mq1('deux'), tBallonsQ=mq1('ballons'), tCombien1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tD2=mr1('Deux'), tD4=mr1('quatre'), tD6=mr1('six'), tTrois1=mr1('Trois'), tFois1=mr1('fois'), tDeux1=mr1('deux',2), tSix1=mr1('six',2), tA1=mr1('A'), tAjoute=mr1('ajouté'), tPas1=mr1('pas');
  const mq2=(w,n=1)=>mot('05-question',w,n), tGateau=mq2('gâteau'), tDeuxQ2=mq2('deux'), tCinqQ2=mq2('cinq'), tBougiesQ2=mq2('bougies'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tCinq2=mr2('Cinq'), tDix2=mr2('dix'), tDeux2=mr2('Deux'), tFois2=mr2('fois'), tCinq2b=mr2('cinq',2), tDix2b=mr2('dix',2), tSouffle=mr2('souffle');
  const mA=(w,n=1)=>mot('06-appris',w,n), tGroupesA=mA('groupes'), tCompteA=mA('compte'), tRepete=mA('répète'), tQuatreA=mA('Quatre'), tFoisA=mA('fois'), tTroisA=mA('trois'),
    tT1=mA('trois',2), tP1=mA('plus'), tT2=mA('trois',3), tP2=mA('plus',2), tT3=mA('trois',4), tP3=mA('plus',3), tT4=mA('trois',5);
  const finTitre=tCest-.08;

  /* la table de fête : 4 assiettes de 3 fraises */
  const AX=[140,400,660,920], AY=540;
  function table(c,T,{lues=null,y0=AY,k=1,xs=AX}={}){
    xs.forEach((x,i)=>{ const lu=lues?lues(i):0;
      if(lu>0){ c.fillStyle=`rgba(255,212,59,${.35*lu})`; c.beginPath(); c.ellipse(x,y0-55*k,150*k,120*k,0,0,7); c.fill(); }
      assietteCraie(c,x,y0,250*k);
      FR.forEach(([dx,dy])=>fraiseCraie(c,x+dx*k,y0+dy*k,50*k)); }); }
  const FR=[[-62,-48],[62,-48],[0,-112]];
  function decorFete(c,T){ c.fillStyle='#8a5a2b'; c.fillRect(10,AY+26,1036,26); c.fillStyle='#6b3f1d'; c.fillRect(10,AY+52,1036,10);
    guirlandeE(c,30,1026,28,T,16); }

  /* un copain avec ses deux ballons (x = ses pieds) */
  const KX=[85,245,405], BCOUL=[['#ff6b6b','#ffd43b'],['#4dabf7','#69db7c'],['#da77f2','#ff922b']];
  function copain(c,T,i,{lueur=0,z=1}={}){ if(z<=0) return; const x=KX[i], yb=700;
    BCOUL[i].forEach((col,j)=>{ const bx=x+(j?38:-38), by=330-(j?44:0)+Math.sin(T*1.6+i+j)*5;
      c.strokeStyle='#dee2e6'; c.lineWidth=4; c.beginPath(); c.moveTo(bx,by+60); c.lineTo(x+(j?30:-30),yb-215); c.stroke();
      ballonAir(c,bx,by,48*Math.min(1.1,z),col,1,lueur); });
    enfantE(c,x,yb,1.42,{k:i,bras:.25,T}); }

  /* le gâteau : 2 rangées de 5 bougies (rangée du fond, rangée de devant) */
  const GX=240, GB=700, GW=225, GH=160;
  function gateau(c,T,{feu=[0,0],fumee=0,lues=[0,0]}={}){
    c.fillStyle='#f1f3f5'; c.beginPath(); c.ellipse(GX,GB+4,GW+20,18,0,0,7); c.fill();
    /* le dessus (vu un peu d'en haut) puis la face */
    c.fillStyle='#ffdeeb'; c.strokeStyle='#c2255c'; c.lineWidth=5;
    c.beginPath(); c.moveTo(GX-GW,GB-GH); c.lineTo(GX+GW,GB-GH); c.lineTo(GX+GW-30,GB-GH-180); c.lineTo(GX-GW+30,GB-GH-180); c.closePath(); c.fill(); c.stroke();
    c.fillStyle='#faa2c1'; c.beginPath(); c.roundRect(GX-GW,GB-GH,2*GW,GH,14); c.fill(); c.stroke();
    c.fillStyle='#fff5f5'; c.beginPath(); c.moveTo(GX-GW,GB-GH);
    for(let i=0;i<=10;i++){ const u=GX-GW+i*GW/5; c.quadraticCurveTo(u-GW/10,GB-GH+(i%2?40:24),u,GB-GH+8); } c.lineTo(GX+GW,GB-GH); c.closePath(); c.fill();
    [[GB-GH-160,1.3,0],[GB-GH-10,1.3,1]].forEach(([yb,k,r])=>{ for(let j=0;j<5;j++){ const x=GX-(r?190:150)+j*(r?95:75);
      bougieE_mult(c,x,yb,k,{feu:feu[r],fumee,T,coul:r?'#74c0fc':'#b197fc',lueur:lues[r]}); } }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* des groupes tous pareils : je compte un groupe, puis je répète */
      table(c,T,{y0:330,k:.95,xs:AX,lues:i=>T>=tCompteA&&T<tRepete?(i===0?.8:0):(T>=tRepete&&T<tQuatreA?.6:0)});
      if(T>=tQuatreA) formuleE(c,T,528,460,['4','fois','3'],[tQuatreA,tFoisA,tTroisA],96,[CRAIE.jaune,CRAIE.blanc,CRAIE.blanc]);
      if(T>=tT1) formuleE(c,T,528,600,['=','3','+','3','+','3','+','3'],[tT1,tT1,tP1,tT2,tP2,tT3,tP3,tT4],96,Array(8).fill(CRAIE.ok));
      tab.maj(); return; }

    if(T>=q2){ /* le gâteau : 2 rangées de 5 bougies */
      const lit=T>=r2, f1=lit?entreE(T,tCinq2-.3,tCinq2+.2):0, f2=lit?entreE(T,tDix2-.3,tDix2+.2):0, fum=lit&&T>=tSouffle?entreE(T,tSouffle,tSouffle+1.6):0;
      gateau(c,T,{feu:fum>0?[0,0]:[f1,f2],fumee:fum,lues:[lit&&T>=tCinq2&&T<tDeux2?.7:0,lit&&T>=tDix2&&T<tDeux2?.7:0]});
      if(!lit){
        if(T>=tDeuxQ2) ecrire(c,'2 rangées',240,60,76*zoom(T,tDeuxQ2,.4),CRAIE.jaune);
        if(T>=tCinqQ2) ecrire(c,'de 5 bougies',240,130,60*zoom(T,tCinqQ2,.4),CRAIE.blanc);
        if(T>=tCombien2) rondNombreE(c,'?',240,198,32,{z:zoom(T,tCombien2,.5),coul:'#ff922b'}); }
      else {
        if(T>=tCinq2&&T<tDeux2) formuleE(c,T,240,80,['5','+','5','=','10'],[tCinq2,tCinq2,tDix2,tDix2,tDix2],76,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tDeux2) formuleE(c,T,240,80,['2','fois','5','=','10'],[tDeux2,tFois2,tCinq2b,tDix2b,tDix2b],76,[CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tDeux2) ecrire(c,'5 + 5 = 10',240,170,56,CRAIE.gris); }
      tab.maj(); return; }

    if(T>=q1){ /* 3 copains, 2 ballons chacun */
      const rep=T>=r1, COMPTE=[tD2,tD4,tD6];
      KX.forEach((x,i)=>{ const t=tCopains+i*.2; if(T<t&&!rep) return;
        copain(c,T,i,{z:rep?1:zoom(T,t,.4),lueur:rep&&T>=COMPTE[i]&&T<COMPTE[i]+1.2?.8:(!rep&&T>=tBallonsQ&&T<tBallonsQ+1.2?.6:0)}); });
      if(!rep){
        if(T>=tTroisQ) ecrire(c,'3 copains',240,62,80*zoom(T,tTroisQ,.4),CRAIE.jaune);
        if(T>=tDeuxQ) ecrire(c,'2 ballons chacun',240,130,56*zoom(T,tDeuxQ,.4),CRAIE.blanc);
        if(T>=tCombien1) rondNombreE(c,'?',240,200,32,{z:zoom(T,tCombien1,.5),coul:'#ff922b'}); }
      else {
        COMPTE.forEach((t,i)=>{ if(T>=t) rondNombreE(c,['2','4','6'][i],KX[i],205,36,{z:zoom(T,t,.5),coul:i===2?CRAIE.ok:CRAIE.jaune}); });
        if(T>=tTrois1) formuleE(c,T,240,70,['3','fois','2','=','6'],[tTrois1,tFois1,tDeux1,tSix1,tSix1],76,[CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tA1){ ecrire(c,'A : 3 + 2 = 5',240,140,52*zoom(T,tA1,.4),CRAIE.faux);
          if(T>=tPas1){ const u=entreE(T,tPas1,tPas1+.4); c.strokeStyle=CRAIE.faux; c.lineWidth=6; c.beginPath(); c.moveTo(80,140); c.lineTo(80+320*u,140); c.stroke(); } } }
      tab.maj(); return; }

    /* la table de fête */
    decorFete(c,T);
    if(T>=fo){ /* 4 groupes de 3 ; 4 fois 3 = 12 */
      table(c,T);
      AX.forEach(x=>rondNombreE(c,'3',x,640,44));
      if(T>=tQuatreF) ecrire(c,'4 groupes de 3',528,100,88*zoom(T,tQuatreF,.4),CRAIE.jaune);
      if(T>=tQuatreF2) formuleE(c,T,528,245,['4','fois','3','=','12'],[tQuatreF2,tFoisF,tTroisF2,tDouzeF,tDouzeF],120,[CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }
    if(T>=co){ /* je compte de 3 en 3 : 3, 6, 9, 12 */
      const CT=[tC3,tC6,tC9,tC12];
      table(c,T,{lues:i=>T>=CT[i]&&T<CT[i]+.9?.9:0});
      AX.forEach(x=>rondNombreE(c,'3',x,640,44));
      if(T>=tCompte&&T<tC12b) ecrire(c,'de 3 en 3',528,100,84*zoom(T,tCompte,.4),CRAIE.jaune);
      CT.forEach((t,i)=>{ if(T>=t) ecrire(c,['3','6','9','12'][i],AX[i],300,100*zoom(T,t,.4),i===3?CRAIE.ok:CRAIE.jaune); });
      if(T>=tC12b) formuleE(c,T,528,110,['3','+','3','+','3','+','3','=','12'],Array(9).fill(tC12b),84,[...Array(8).fill(CRAIE.blanc),CRAIE.ok]);
      tab.maj(); return; }
    if(T>=pa){ /* toutes pareilles : des groupes égaux */
      table(c,T,{lues:i=>{ const t=tToutes+i*.35; return T>=t&&T<tPareil+1.4?.8:0; }});
      AX.forEach((x,i)=>{ const t=tTroisP+i*.12; if(T>=t||T>=tToutes+i*.35) rondNombreE(c,'3',x,640,44,{z:zoom(T,Math.min(t,tToutes+i*.35),.5)}); });
      if(T>=tGroupesP) ecrire(c,'des groupes égaux',528,170,92*zoom(T,tGroupesP,.4),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : la fête, 4 assiettes, 3 fraises sur chaque */
    if(T>=tAnniv) ecrire(c,'Joyeux anniversaire !',528,100,76*zoom(T,tAnniv,.4),'#faa2c1');
    if(T>=tTable) AX.forEach((x,i)=>{ const t=tQuatre0+i*.2; if(T<t) return; const z=zoom(T,t,.4);
      assietteCraie(c,x,AY,250,z);
      FR.forEach(([dx,dy],j)=>fraiseCraie(c,x+dx,AY+dy,50,zoom(T,tTrois0+i*.15+j*.05,.4))); });
    if(T>=tQuatre0) ecrire(c,'4 assiettes',260,230,84*zoom(T,tQuatre0,.4),CRAIE.jaune);
    if(T>=tTrois0) AX.forEach((x,i)=>rondNombreE(c,'3',x,640,44,{z:zoom(T,tTrois0+i*.15,.5)}));
    if(T>=tCombien0) ecrire(c,'combien en tout ?',790,230,60*zoom(T,tCombien0,.4),CRAIE.blanc);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien de ballons en tout ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de bougies ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:[phraseE('3 copains, 2 ballons chacun.',[tTroisQ,tCopains,tDeuxQ,tBallonsQ,tChacun]),...phrase1],pause:pause1,
      choix:[['5',tqa('A'),tqa('cinq')],['6',tqa('B'),tqa('six')],['32',tqa('C'),tqa('trente-deux')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],reponse:[phraseE('3 fois 2 = 6 ballons',[tTrois1,tFois1,tDeux1,tSix1,tSix1,mr1('ballons')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:[phraseE('2 rangées de 5 bougies.',[tDeuxQ2,mq2('rangées'),mq2('de'),tCinqQ2,tBougiesQ2]),...phrase2],pause:pause2,
      choix:[['7',tqb('A'),tqb('sept')],['25',tqb('B'),tqb('vingt-cinq')],['10',tqb('C'),tqb('dix')]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],reponse:[phraseE('2 fois 5 = 10 bougies',[tDeux2,tFois2,tCinq2b,tDix2b,tDix2b,mr2('bougies')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('03-fois')-.4,'Des groupes<br>pareils');
  return { clips,FIN,titre:"Les fraises de l'anniversaire",ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pa,co,fo,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tDouzeF&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
