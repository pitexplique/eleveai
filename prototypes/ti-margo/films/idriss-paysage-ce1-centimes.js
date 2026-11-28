/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 12 : « Les toutes petites pièces » (micro ce1_monnaie_euros_centimes), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-centimes-paysage.json (manim/SCRIPTS-monnaie-idriss.md, CE1 1).
   Une dame paie avec des centimes ; les six pièces ; 1 € = 100 c (comme 1 m = 100 cm) ; 50 c + 50 c = 1 €.
   Questions : combien de pièces de 10 c pour 1 € → A (dix) ; 3 € en centimes → A (300 c).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['ce1-centimes']=function(outils){
  const DUR={'00-accroche':9.695,'01-pieces':6.495,'02-cent':6.08,'03-cinquante':7.165,'04-question':13.22,'04b-reponse':9.415,
    '05-question':16.28,'05b-reponse':10.03,'06-appris':5.835,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-pieces':1,'02-cent':1.2,'03-cinquante':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pi,ce,ci,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tCe=m0('Ce'), tDame=m0('dame'), tPetites=m0('petites'), tPieces=m0('pièces'), tEuros=m0('euros'), tCentimes=m0('centimes');
  const mp=(w,n=1)=>mot('01-pieces',w,n), VALS=[1,2,5,10,20,50], tV=[mp('un'),mp('deux'),mp('cinq'),mp('dix'),mp('vingt'),mp('cinquante')];
  const mce=(w,n=1)=>mot('02-cent',w,n), tUnE=mce('Un'), tCent=mce('cent'), tMetre=mce('mètre'), tCent2=mce('cent',2);
  const mci=(w,n=1)=>mot('03-cinquante',w,n), tDeuxP=mci('Deux'), tC1=mci('cinquante',2), tPlusC=mci('plus'), tC2=mci('cinquante',3), tCentC=mci('cent'), tUnC=mci('Un');
  const mq1=w=>mot('04-question',w), tDixQ=mq1('dix'), tEuroQ=mq1('euro');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tD10=mr1('Dix'), tD20=mr1('vingt'), tD30=mr1('trente'), tD100=mr1('cent'), tDixP=mr1('Dix',2), tCent1b=mr1('cent',2), tUn1=mr1('un');
  const mq2=(w,n=1)=>mot('05-question',w,n), tIdQ=mq2('Idriss'), tTroisQ=mq2('trois'), tCombQ=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tUnR2=mr2('Un'), tCentR2=mr2('cent'), tTroisE=mr2('Trois'), tC100=mr2('cent',2), tC200=mr2('deux'), tC300=mr2('trois',2), tFin2=mr2('trois',3);
  const ma=w=>mot('06-appris',w), tPetA=ma('petites'), tUnA=ma('Un');
  const finTitre=tCe-.08;

  /* la pluie de petites pièces : du porte-monnaie de la dame (à gauche) vers le comptoir */
  const PLUIE=[[50,330],[10,380],[20,420],[5,470],[2,350],[1,410],[50,450],[10,500]].map(([v,x],k)=>({v,x,y:560+((k*37)%3)*20,k}));
  const RX=VALS.map((_,k)=>116+k*165);

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : les petites pièces sont des centimes ; 1 € = 100 c */
      quaiBoisE(c,T,40);
      VALS.forEach((v,k)=>{ centimeE(c,v,RX[k],250,84,{lueur:T>=tPetA&&T<tUnA?.5:0}); ecrire(c,v+' c',RX[k],370,52,CRAIE.blanc); });
      if(T>=tUnA){ euroE(c,1,200,540,62,{z:zoom(T,tUnA,.5)}); formuleE(c,T,640,540,['1 €','=','100 c'],[tUnA,tUnA+.3,tUnA+.5],100,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
      tab.maj(); return; }

    if(T>=q2){ /* Idriss a 3 € : combien de centimes ? (x < 480) */
      quaiBoisE(c,T,40);
      const CX=[90,240,390];
      if(T<r2){ if(T>=tIdQ) idrissE(c,400,715,1.1,{montre:1,T});
        if(T>=tTroisQ) CX.forEach((x,k)=>euroE(c,1,x-30,230,62,{z:zoom(T,tTroisQ+k*.1,.4)}));
        if(T>=tCombQ) formuleE(c,T,200,620,['3 €','=','?','c'],[tCombQ,tCombQ,tCombQ+.2,tCombQ+.2],80,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc]); }
      else { CX.forEach((x,k)=>{ euroE(c,1,x,200,64,{lueur:T>=[tC100,tC200,tC300][k]&&T<tFin2?.5:0});
          if(T>=(k?tTroisE:tCentR2)) ecrire(c,'100 c',x,315,48,CRAIE.r0); });
        const NB=['100','200','300'];
        CX.forEach((x,k)=>{ const t=[tC100,tC200,tC300][k]; if(T>=t) ecrire(c,NB[k],x,430,72*zoom(T,t,.4),CRAIE.jaune); });
        if(T>=tFin2) formuleE(c,T,240,600,['3 €','=','300 c'],[tFin2,tFin2,tFin2+.2],86); }
      tab.maj(); return; }

    if(T>=q1){ /* une pile de pièces de 10 c : combien pour 1 € ? (x < 480) */
      quaiBoisE(c,T,40);
      if(T<r1){ if(T>=tDixQ) for(let k=0;k<10;k++) centimeE(c,10,240+((k*53)%5-2)*16,560-k*34,84,{z:zoom(T,tDixQ+k*.05,.3)});
        if(T>=tEuroQ) formuleE(c,T,240,140,['1 €','=','?'],[tEuroQ,tEuroQ,tEuroQ+.2],90,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune]); }
      else { /* les pièces tombent une à une : 10, 20, 30 … 100 */
        const ts=[tD10,tD20,tD30]; for(let k=3;k<10;k++) ts.push(tD30+(tD100-tD30)*(k-2)/7);
        for(let k=0;k<10;k++){ if(T<ts[k]-.2) continue; const x=56+(k%5)*92, y=k<5?160:330, p=sautE([x,-40],[x,y],entreE(T,ts[k]-.2,ts[k]+.15),20);
          centimeE(c,10,p[0],p[1],56); if(T>=ts[k]) ecrire(c,String(10*(k+1)),x,y+76,42,k===9?CRAIE.ok:CRAIE.jaune); }
        if(T>=tDixP) ecrire(c,'10 pièces',240,540,66*zoom(T,tDixP,.4),CRAIE.jaune);
        if(T>=tCent1b) formuleE(c,T,240,640,['=','100 c','=','1 €'],[tCent1b,tCent1b,tUn1,tUn1],66); }
      tab.maj(); return; }

    if(T<pi){ /* la dame vide son porte-monnaie : une pluie de petites pièces */
      quaiBoisE(c,T,140); etalE(c,40,1016,600);
      dameE(c,150,705,1.15,{tend:T>=tPetites?1:0,T});
      if(T>=tDame) porteMonnaieE(c,270,330,120,1);
      PLUIE.forEach(o=>{ const t0=tPetites+o.k*.12; if(T<t0) return; const p=sautE([270,300],[o.x+150,o.y],entreE(T,t0,t0+.6),120);
        centimeE(c,o.v,p[0],p[1],58,{a:o.k}); });
      idrissE(c,860,705,1.3,{montre:T>=tPieces&&T<tEuros?1:0,T});
      if(T>=tEuros&&T<tCentimes) ecrire(c,'des euros ?',560,250,70*zoom(T,tEuros,.4),CRAIE.faux);
      if(T>=tCentimes) sommeE(c,'des centimes !',560,250,70,{z:zoom(T,tCentimes,.4),coul:CRAIE.ok});
      tab.maj(); return; }

    quaiBoisE(c,T,40);
    if(T<ce){ /* les six pièces en centimes */
      VALS.forEach((v,k)=>{ if(T<tV[k]) return; centimeE(c,v,RX[k],300,92,{z:zoom(T,tV[k],.5),lueur:T<tV[k]+.6?.6:0}); ecrire(c,v+' c',RX[k],440,60*zoom(T,tV[k],.4),k<3?'#ffc078':CRAIE.jaune); });
      if(T>=tV[5]+.4){ ecrire(c,'cuivre',RX[1],560,50,'#ffc078'); ecrire(c,'dorées',RX[4],560,50,CRAIE.jaune); }
      tab.maj(); return; }
    if(T<ci){ /* 1 € = 100 c, comme 1 m = 100 cm */
      euroE(c,1,250,280,110,{z:zoom(T,tUnE,.5)});
      if(T>=tCent) for(let k=0;k<10;k++) for(let j=0;j<10;j++) if(T>=tCent+(k*10+j)*.006) centimeE(c,1,560+j*42,110+k*36,30);
      if(T>=tCent) ecrire(c,'=',470,280,90,CRAIE.blanc);
      formuleE(c,T,528,570,['1 €','=','100 c'],[tUnE,tCent,tCent],110);
      if(T>=tMetre) ecrire(c,'1 m = 100 cm',528,672,56*zoom(T,tMetre,.4),CRAIE.gris);
      tab.maj(); return; }
    /* deux pièces de 50 c se rejoignent : 1 € */
    const u=entreE(T,tCentC-.2,tUnC+.1);
    if(u<1){ centimeE(c,50,330+150*u,280,112,{z:zoom(T,tDeuxP,.5)}); centimeE(c,50,730-150*u,280,112,{z:zoom(T,tDeuxP+.15,.5)}); }
    else euroE(c,1,528,280,120,{z:zoom(T,tUnC,.6),lueur:.6});
    if(T>=tDeuxP){ ecrire(c,'50 c',330,440,60*(u<1?1:0),CRAIE.jaune); ecrire(c,'50 c',730,440,60*(u<1?1:0),CRAIE.jaune); }
    formuleE(c,T,528,610,['50 c','+','50 c','=','100 c','=','1 €'],[tC1,tPlusC,tC2,tCentC,tCentC,tUnC,tUnC],76,
      [CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); const phrase1=[qa('Combien de pièces de dix centimes faut-il pour faire un euro ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Idriss a trois euros.'); const phrase2=[qb('Combien de centimes, ça fait ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['10 pièces',tqa('A'),tqa('dix',2)],['100 pièces',tqa('B'),tqa('cent')],['1 pièce',tqa('C'),tqa('une')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('10 pièces de 10 c',[tDixP,tDixP,tDixP,tDixP,tDixP]),phraseE('= 100 c = 1 €',[tCent1b,tCent1b,tCent1b,tUn1,tUn1,tUn1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['300 c',tqb('A'),tqb('cents')],['30 c',tqb('B'),tqb('trente')],['3 c',tqb('C'),tqb('trois',3)]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('3 € = 300 c',[tFin2,tFin2,tFin2,tFin2,tFin2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('03-cinquante')-.5,'1 € =<br>100 centimes');
  return { clips,FIN,titre:'Les toutes petites pièces',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pi,ce,ci,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tUnC&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
