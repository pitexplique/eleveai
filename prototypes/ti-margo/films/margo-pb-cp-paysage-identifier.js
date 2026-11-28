/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 01 : « Les biscuits du train » (micro cp_probleme_identifier), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-identifier-paysage.json.
   Dans le train, 9 biscuits, Ti Margo en mange 3 : je lis la question, je la redis, je calcule (9 − 3 = 6).
   Questions : le garçon 5 cartes + 4 de sa sœur, que cherche-t-on → C (toutes ses cartes, à la fin) ;
   le cousin 7 ballons, moi 2 de plus → A (7 + 2). Ceinture blanche.
   ⭐ Pendant les questions et les réponses, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['identifier']=function(outils){
  const DUR={'00-accroche':10.02,'01-question':5.54,'02-redire':8.255,'03-calcul':7.555,'04-question':21.595,'04b-reponse':9.755,
    '05-question':19.645,'05b-reponse':8.26,'06-appris':8.47,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':1,'02-redire':1,'03-calcul':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,qu,re,ca,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:46px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tJe=m0('Je'), tNeuf0=m0('neuf'), tMange=m0('mange'), tTrois0=m0('trois');
  const mq=(w,n=1)=>mot('01-question',w,n), tCombienQ=mq('Combien');
  const md=(w,n=1)=>mot('02-redire',w,n), tRestent=md('restent'), tBoite=md('boîte'), tPas=md('Pas');
  const mc=(w,n=1)=>mot('03-calcul',w,n), tNeufC=mc('Neuf'), tMoinsC=mc('moins'), tTroisC=mc('trois'), tSixC=mc('six'), tIl=mc('Il'), tReste=mc('reste'), tRepond=mc('répond');
  const mq1=(w,n=1)=>mot('04-question',w,n), tGarcon=mq1('garçon'), tCinqQ=mq1('cinq'), tSoeur=mq1('sœur'), tQuatreQ=mq1('quatre'), tMaintenantQ=mq1('maintenant');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tMaint1=mr1('Maintenant'), tToutes1=mr1('toutes'), tCinq1=mr1('Cinq'), tPlus1=mr1('plus'), tQuatre1=mr1('quatre'), tNeuf1=mr1('neuf');
  const mq2=(w,n=1)=>mot('05-question',w,n), tCousin=mq2('cousin'), tSeptQ=mq2('sept'), tMoi=mq2('Moi'), tDeuxQ=mq2('deux'), tPlusQ=mq2('plus'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tPlus2=mr2('plus'), tSept2=mr2('sept'), tAjoute=mr2("j'ajoute"), tDeux2=mr2('deux'), tNeuf2=mr2('Neuf');
  const mA=w=>mot('06-appris',w), tLis=mA('lis'), tDis=mA('dis'), tCalcule=mA('calcule');
  const finTitre=tJe-.08;

  /* la boîte de 9 biscuits : 5 derrière, 4 devant ; Ti Margo mange les 3 de droite */
  const BX=178, BW=700, BY=712, BH=340;
  const BIS=[0,1,2,3,4].map(i=>[BX+90+i*130,432]).concat([0,1,2,3].map(i=>[BX+155+i*130,528]));
  const MANGES=[4,3,8], RESTENT=[0,1,2,5,6,7];
  const tCroque=j=>tMange+j*.34;
  function boite(c,T,{lueRestent=0,croix=0}={}){
    boiteFondE(c,BX,BY,BW,BH,'#4dabf7');
    BIS.forEach(([x,y],k)=>{ if(T<tNeuf0+k*.07) return; const j=MANGES.indexOf(k);
      let croque=0, terne=0; if(j>=0&&T>=tCroque(j)){ croque=entreE(T,tCroque(j),tCroque(j)+.3); terne=T>=tCroque(j)+.45?1:0; }
      const lu=RESTENT.includes(k)?lueRestent:0;
      biscuitE(c,x,y,54,{z:T>=qu?1:zoom(T,tNeuf0+k*.07,.4),croque,terne,lueur:lu});
      /* les miettes volent à la bouchée */
      if(j>=0&&T>=tCroque(j)&&T<tCroque(j)+.8){ const u=entreE(T,tCroque(j),tCroque(j)+.8); c.fillStyle=`rgba(232,161,92,${1-u})`;
        for(let m=0;m<6;m++){ const a=-1.2+m*.45; c.beginPath(); c.arc(x+30+Math.cos(a)*90*u,y-30+Math.sin(a)*70*u+60*u*u,6,0,7); c.fill(); } } });
    boiteDevantE(c,BX,BY,BW,BH,'#4dabf7');
    if(croix>0) MANGES.forEach((k,j)=>croixE(c,BIS[k][0],BIS[k][1],80,entreE(croix,j*.2,j*.2+.5)));
  }
  function nombres(c,T){ if(T>=tNeuf0) rondNombreE(c,'9',110,520,62,{z:zoom(T,tNeuf0,.5)});
    if(T>=tTrois0) rondNombreE(c,'3',950,500,62,{z:zoom(T,tTrois0,.5),coul:CRAIE.faux}); }
  function questionHaut(c,T,t0,taille,y1,y2){ ecrire(c,'Combien en',528,y1,taille*zoom(T,t0,.4),CRAIE.blanc); ecrire(c,'reste-t-il ?',528,y2,taille*zoom(T,t0,.4),CRAIE.blanc); }

  /* question 1 : le garçon a 5 cartes (roses), sa sœur lui en donne 4 (bleues) */
  const RANG1=[0,1,2,3,4].map(i=>[165+i*70,205]), RANG2=[0,1,2,3].map(i=>[200+i*70,335]), SOEUR=[0,1,2,3].map(i=>[200+i*70,585]);
  function cartes(c,T){
    enfantE(c,62,345,1.3,{k:0,T}); enfantE(c,62,700,1.3,{k:1,T});
    const lueTout=T>=r1&&T>=tToutes1&&T<tCinq1+.6?.7:0;
    RANG1.forEach(([x,y],i)=>{ if(T<tCinqQ+i*.08) return; carteJeuE(c,x,y,64,{a:(i-2)*.05,z:T>=r1?1:zoom(T,tCinqQ+i*.08,.4),lueur:lueTout}); });
    if(T<r1){
      if(T>=tCinqQ) rondNombreE(c,'5',305,90,46,{z:zoom(T,tCinqQ,.5)});
      SOEUR.forEach(([x,y],i)=>{ if(T<tQuatreQ+i*.08) return; carteJeuE(c,x,y,64,{coul:'#1c7ed6',a:(i-1.5)*.05,z:zoom(T,tQuatreQ+i*.08,.4)}); });
      if(T>=tQuatreQ) rondNombreE(c,'4',305,470,46,{z:zoom(T,tQuatreQ,.5)});
      if(T>=tQuatreQ+.4){ /* la flèche : la sœur donne */ const u=entreE(T,tQuatreQ+.4,tQuatreQ+1);
        c.strokeStyle=CRAIE.jaune; c.fillStyle=CRAIE.jaune; c.lineWidth=7; c.lineCap='round';
        c.beginPath(); c.moveTo(470,630); c.lineTo(470,630-270*u); c.stroke();
        if(u>=1){ c.beginPath(); c.moveTo(470,342); c.lineTo(452,376); c.lineTo(488,376); c.closePath(); c.fill(); } }
      if(T>=tMaintenantQ) ecrire(c,'?',305,335,100*zoom(T,tMaintenantQ,.5),CRAIE.jaune);
    } else {
      SOEUR.forEach((p,i)=>{ const t=tMaint1+i*.18, u=entreE(T,t,t+.6); const [x,y]=sautE(p,RANG2[i],u,60);
        carteJeuE(c,x,y,64,{coul:'#1c7ed6',a:(i-1.5)*.05,lueur:lueTout}); });
      if(T>=tCinq1) formuleE(c,T,290,462,['5','+','4','=','9'],[tCinq1,tPlus1,tQuatre1,tNeuf1,tNeuf1],66,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
    }
  }

  /* question 2 : le cousin a 7 ballons ; moi, 2 de plus */
  const COUL_B=['#ff6b6b','#4dabf7','#fcc419','#51cf66','#cc5de8','#ff922b','#f783ac'];
  const COUSIN=[[70,175],[140,160],[210,178],[55,250],[125,240],[195,255],[125,318]];
  const MOI=[[295,170],[370,165],[445,170],[295,250],[370,245],[445,250],[295,330],[370,330],[445,330]];
  const MAINC=[150+75*1.05,700-129*1.05], NOEUD=[370,520];
  function ficelles(c,pts,[hx,hy],z){ c.strokeStyle='#dee2e6'; c.lineWidth=3; pts.forEach(([x,y])=>{ c.beginPath(); c.moveTo(x,y+36*1.2*z); c.lineTo(hx,hy); c.stroke(); }); }
  function ballons(c,T){
    c.fillStyle='#868e96'; c.fillRect(0,700,1056,20);
    enfantE(c,150,700,1.05,{k:2,bras:.55,T});
    if(T>=tSeptQ){ const z=T>=r2?1:zoom(T,tSeptQ,.4); ficelles(c,COUSIN,MAINC,1); COUSIN.forEach(([x,y],i)=>ballonAir(c,x,y,36,COUL_B[i],z)); rondNombreE(c,'7',45,420,44,{z:zoom(T,tSeptQ,.5)}); }
    if(T>=tMoi){ ecrire(c,'moi',370,568,52*zoom(T,tMoi,.4),CRAIE.blanc); if(T>=r2){ c.fillStyle=CRAIE.blanc; c.beginPath(); c.arc(NOEUD[0],NOEUD[1],8,0,7); c.fill(); } }
    if(T<r2){
      if(T>=tPlusQ) ecrire(c,'2 de plus',370,440,50*zoom(T,tPlusQ,.4),CRAIE.jaune);
      if(T>=tCombien2) ecrire(c,'?',370,250,130*zoom(T,tCombien2,.5),CRAIE.jaune);
    } else {
      const vus=MOI.map((p,i)=>i<7?(T>=tSept2+i*.06):(T>=tDeux2+(i-7)*.15)).map((v,i)=>v?MOI[i]:null).filter(Boolean);
      ficelles(c,vus,NOEUD,1);
      MOI.forEach(([x,y],i)=>{ const t=i<7?tSept2+i*.06:tDeux2+(i-7)*.15; if(T<t) return;
        ballonAir(c,x,y,34,i<7?COUL_B[i]:'#e8590c',zoom(T,t,.4),i>=7&&T<tNeuf2+.8?.8:0); });
      if(T>=tSept2) formuleE(c,T,240,68,['7','+','2','=','9'],[tSept2,tAjoute,tDeux2,tNeuf2,tNeuf2],62,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
    }
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* je lis, je redis, je calcule */
      [[tLis,'1. je lis la question',220],[tDis,'2. je dis ce que je cherche',350],[tCalcule,'3. je calcule',480]].forEach(([t,s,y],k)=>{
        if(T>=t) ecrire(c,s,528,y,58*zoom(T,t,.4),k===2?CRAIE.ok:CRAIE.blanc); });
      tab.maj(); return; }
    if(T>=q2){ ballons(c,T); tab.maj(); return; }
    if(T>=q1){ cartes(c,T); tab.maj(); return; }

    if(T<qu){ fenetreTrainE(c,60,20,936,290,T); }
    const enCalcul=T>=ca;
    boite(c,T,{lueRestent:(T>=tRestent&&T<tPas)?.8:(enCalcul&&T>=tReste&&T<tRepond?.6:0),croix:T>=tPas&&T<ca?entreE(T,tPas,tPas+1.2):(enCalcul?1:0)});
    nombres(c,T);
    if(T>=qu&&T<ca){
      if(T<re){ questionHaut(c,T,tCombienQ,84,95,190);
        if(T>=tCombienQ) ecrire(c,'?',935,150,170*(.92+.08*Math.sin(T*4))*zoom(T,tCombienQ,.5),`rgba(255,212,59,${.65+.35*Math.sin(T*3)})`); }
      else { questionHaut(c,T,0,72,72,150);
        if(T>=tRestent-.2){ ecrire(c,'ce qui reste',528,262,66*zoom(T,tRestent-.2,.4),CRAIE.jaune); entoureE(c,528,262,450,70,entreE(T,tRestent,tBoite+.3)); } } }
    if(enCalcul){
      formuleE(c,T,528,105,['9','−','3','=','6'],[tNeufC,tMoinsC,tTroisC,tSixC,tSixC],110,[CRAIE.blanc,CRAIE.blanc,CRAIE.faux,CRAIE.blanc,CRAIE.ok]);
      RESTENT.forEach((k,i)=>{ const t=tIl+i*.3; if(T>=t) rondNombreE(c,String(i+1),BIS[k][0],BIS[k][1],28,{z:zoom(T,t,.5),coul:CRAIE.ok}); });
      if(T>=tReste) ecrire(c,'Il reste 6 biscuits.',528,245,60*zoom(T,tReste,.4),CRAIE.ok);
      if(T>=tRepond) coche(c,850,265,.55); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien en a‑t‑il maintenant ?'),qa('Que cherche‑t‑on ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); qb('Combien de ballons ai-je ?'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const tB=(w,n)=>mot('05-question',w,n);
  const phrase2=[phraseE('Combien de ballons a Ti Margo ?',[tCombien2,tB('de',2),tB('ballons',2),tB('ai-je'),tB('ai-je')]),
    phraseE('Quel calcul ?',[tB('Quel'),tB('calcul')])];
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['les cartes de sa sœur',tqa('A'),tqa('sœur',2)],['les cartes du début',tqa('B'),tqa('début')],['toutes ses cartes, à la fin',tqa('C'),tqa('fin')]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('5 + 4 = 9',[tCinq1,tPlus1,tQuatre1,tNeuf1,tNeuf1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['7 + 2',tqb('A'),tqb('deux',2)],['7 − 2',tqb('B'),tqb('deux',3)],['2 + 2',tqb('C'),tqb('deux',5)]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],reponse:[phraseE('7 + 2 = 9',[tSept2,tAjoute,tDeux2,tNeuf2,tNeuf2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-redire')-.4,'Que<br>cherche-t-on ?');
  return { clips,FIN,titre:'Les biscuits du train',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,qu,re,ca,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tRepond&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
