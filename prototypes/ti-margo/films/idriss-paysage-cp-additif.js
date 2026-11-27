/* ============================================================
   Série Idriss le pêcheur — PAYSAGE 01 : « Le retour de la barque » (micro cp_probleme_additif), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2/3-dessins.js + idriss-dessins.js.
   Voix : manim/voix/idriss-cp-additif-paysage.json.
   La barque d'Idriss rentre au port ; seau rouge 4 poissons, seau bleu 3 : tous dans la caisse, 4 + 3 = 7.
   Questions en plein milieu : 5 crabes + 2 qui courent → B (7) ; 6 gros + 4 petits poissons → C (10).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 470) ; la carte est à droite.
   ============================================================ */
FILMS['cp-additif']=function(outils){
  const DUR={'00-accroche':10.9,'01-seaux':9.19,'02-ensemble':9.48,'03-mots':7.27,'04-question':16.53,'04b-reponse':6.53,
    '05-question':15.38,'05b-reponse':11.01,'06-appris':7.29,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-seaux':.8,'02-ensemble':1.2,'03-mots':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,se,en,mo,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tVoici=m0('Voici'), tIdriss=m0('Idriss'), tPecheur=m0('pêcheur'), tMatin=m0('matin'), tBarque=m0('barque'), tPort=m0('port'), tPleine=m0('pleine');
  const ms=w=>mot('01-seaux',w);
  const tRouge=ms('rouge'), tQuatreS=ms('quatre'), tBleu=ms('bleu'), tTroisS=ms('trois'), tIdS=ms('Idriss'), tTout=ms('tout');
  const me=(w,n=1)=>mot('02-ensemble',w,n);
  const tMets=me('mets'), tCaisse=me('caisse'), tQ4=me('Quatre'), tC5=me('cinq'), tS6=me('six'), tS7=me('sept'), tQ4b=me('Quatre',2), tPlusE=me('plus'), tTroisE=me('trois'), tS7b=me('sept',2);
  const mm=w=>mot('03-mots',w);
  const tReunit=mm('réunit'), tToutM=mm('tout'), tAjoute=mm('ajoute'), tAdd=mm('addition');
  const mq1=w=>mot('04-question',w), tPanier=mq1('panier'), tCinqQ=mq1('cinq'), tQuai=mq1('quai'), tDeuxQ=mq1('deux'), tCourent=mq1('courent'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB=mr1('B'), tSix1=mr1('six'), tSept1=mr1('sept'), tCinq2=mr1('Cinq',2), tPlus1=mr1('plus'), tDeux1=mr1('deux'), tSept1b=mr1('sept',2);
  const mq2=w=>mot('05-question',w), tSixQ=mq2('six'), tGros=mq2('gros'), tQuatreQ=mq2('quatre'), tPetits=mq2('petits'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC=mr2('C'), tSeptR=mr2('sept'), tHuitR=mr2('huit'), tNeufR=mr2('neuf'), tDixR=mr2('dix'),
    tSix2=mr2('Six',2), tPlus2=mr2('plus'), tQuatre2=mr2('quatre'), tDix2=mr2('dix',2), tDizaine=mr2('dizaine');
  const ma=w=>mot('06-appris',w), tTasA=ma('tas'), tToutA=ma('tout'), tAjA=ma("J'ajoute");
  const finTitre=tVoici-.08;

  /* le quai : la mer au fond (yMer), le plancher de bois devant */
  function quai(c,T,yMer=300){ merE(c,T,yMer); c.fillStyle='#a47148'; c.fillRect(0,yMer+70,1056,720-yMer-70);
    c.strokeStyle='#7a4f2a'; c.lineWidth=3; for(let y=yMer+70;y<720;y+=50){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); }
    for(let k=0;k<12;k++){ const y=yMer+70+Math.floor(k/3)*50, x=(k*311)%1056; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+50); c.stroke(); } }
  /* les poissons posés en tas au-dessus d'un seau, 2 par 2, et dans la caisse, 4 par rang */
  const SR=[190,700], SB=[480,700], SW=250, FL=124, CX=800, CY=700, CW=440, CH=160;
  const tasSeau=(x,yHaut,k)=>[x+(k%2?64:-64),yHaut-22-Math.floor(k/2)*54];
  const dansCaisse=k=>[CX-156+(k%4)*104,CY-CH-26-Math.floor(k/4)*56];
  const COUL_R='#ff8787', COUL_B='#74c0fc', HAUT=SR[1]-SW*.72;

  function seaux(c,T,nR,nB){
    seauCoulE(c,SR[0],SR[1],SW,'#e03131','#a61e1e'); seauCoulE(c,SB[0],SB[1],SW,'#1c7ed6','#0b3d6b');
    for(let k=0;k<nR;k++){ const [x,y]=tasSeau(SR[0],HAUT,k); poissonE(c,x,y,FL,COUL_R,{dir:k%2?1:-1,T,k}); }
    for(let k=0;k<nB;k++){ const [x,y]=tasSeau(SB[0],HAUT,k); poissonE(c,x,y,FL,COUL_B,{dir:k%2?1:-1,T,k:k+4}); } }
  function formule(c,T,x0,y,a,b,s,ca,cb,tP,tB,tS,taille=96){ const d=taille*.98;
    ecrire(c,String(a),x0-2*d,y,taille,ca); if(T>=tP) ecrire(c,'+',x0-d,y,taille,CRAIE.blanc);
    if(T>=tB) ecrire(c,String(b),x0,y,taille,cb); if(T>=tS){ ecrire(c,'=',x0+d,y,taille,CRAIE.blanc); ecrire(c,String(s),x0+2*d+(s>9?taille*.2:0),y,taille*1.08*zoom(T,tS,.4),CRAIE.ok); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : deux tas → la caisse, 4 + 3 = 7 */
      quai(c,T,300); seaux(c,T,0,0);
      caisseE(c,CX,CY,CW,CH,T>=tToutA?.5+.5*Math.sin(T*4):0);
      for(let k=0;k<7;k++){ const [x,y]=dansCaisse(k); poissonE(c,x,y,124,k<4?COUL_R:COUL_B,{dir:k%2?1:-1,T,k}); }
      for(const x of [SR[0],SB[0]]) lienE(c,[x+60,HAUT-30],[CX-190,CY-CH-70],entreE(T,tTasA,tTasA+.6),CRAIE.jaune);
      if(T>=tAjA) formule(c,T,CX-40,200,4,3,7,COUL_R,COUL_B,tAjA,tAjA,tAjA,100);
      tab.maj(); return; }
    if(T>=q2){ /* 6 gros poissons, 4 petits (à gauche de la carte : x < 480) */
      quai(c,T,60);
      const G=k=>[100+(k%2)*175,250+Math.floor(k/2)*120], P=k=>[425,230+k*90];
      const tPose=[tSeptR,tHuitR,tNeufR,tDixR], dix=T>=r2&&T>=tDizaine?.5+.5*Math.sin(T*5):0;
      if(T>=tGros) for(let k=0;k<6;k++){ const [x,y]=G(k); poissonE(c,x,y,165,COUL_POISSON[k],{dir:k%2?-1:1,T,k,z:zoom(T,tGros+k*.08,.4),lueur:dix}); }
      if(T>=tPetits) for(let k=0;k<4;k++){ const u=T>=r2?douxE(entreE(T,tPose[k]-.3,tPose[k]+.25)):0, p=sautE(P(k),[70+k*110,630],u,80);
        poissonE(c,p[0],p[1],100,'#ffd43b',{dir:-1,T,k:k+6,z:zoom(T,tPetits+k*.08,.4),lueur:dix}); }
      if(T<r2){ if(T>=tSixQ) etiquette(c,'6',188,150,T,tSixQ,CRAIE.jaune,64); if(T>=tQuatreQ) etiquette(c,'4',425,150,T,tQuatreQ,'#ffd43b',56);
        if(T>=tComb2) ecrire(c,'?',260,640,120*zoom(T,tComb2,.5),CRAIE.jaune); }
      else {
        if(T<tSix2){ const n=T>=tDixR?10:T>=tNeufR?9:T>=tHuitR?8:T>=tSeptR?7:6, t0=[r2,tSeptR,tHuitR,tNeufR,tDixR][n-6];
          ecrire(c,String(n),260,140,130*zoom(T,t0,.35),n===10?CRAIE.ok:CRAIE.jaune); }
        else formule(c,T,230,140,6,4,10,CRAIE.jaune,'#ffd43b',tPlus2,tQuatre2,tDix2,86);
        if(T>=tDizaine) for(const [x,y] of [[40,330],[470,420],[470,250]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }
    if(T>=q1){ /* 5 crabes dans le panier, 2 qui courent sur le quai (à gauche de la carte) */
      quai(c,T,60);
      panierE(c,200,560,350);
      const DANS=k=>[[85,430],[200,430],[315,430],[142,345],[257,345],[372,345],[200,262]][k];
      if(T>=tCinqQ) for(let k=0;k<5;k++){ const [x,y]=DANS(k); crabeE(c,x,y,.9,{z:zoom(T,tCinqQ+k*.08,.4),T,k}); }
      for(let k=0;k<2;k++){ if(T<tDeuxQ) break;
        const libre=[130+k*230+50*Math.sin(T*2.2+k*2),650], u=T>=r1?entreE(T,[tSix1,tSept1][k]-.35,[tSix1,tSept1][k]+.25):0;
        const p=sautE(libre,DANS(5+k),u,140);
        crabeE(c,p[0],p[1],.9,{z:zoom(T,tDeuxQ+k*.1,.4),T,k:k+5,marche:u>0?0:1}); }
      if(T<r1){ if(T>=tCinqQ) etiquette(c,'5',200,170,T,tCinqQ,CRAIE.jaune,64); if(T>=tDeuxQ) etiquette(c,'2',450,480,T,tDeuxQ,'#ff8787',56);
        if(T>=tComb1) ecrire(c,'?',420,190,120*zoom(T,tComb1,.5),CRAIE.jaune); }
      else {
        if(T<tCinq2){ const n=T>=tSept1?7:T>=tSix1?6:5, t0=[r1,tSix1,tSept1][n-5]; ecrire(c,String(n),220,150,130*zoom(T,t0,.35),n===7?CRAIE.ok:CRAIE.jaune); }
        else formule(c,T,220,150,5,2,7,CRAIE.jaune,'#ff8787',tPlus1,tDeux1,tSept1b,90); }
      tab.maj(); return; }
    if(T>=se){ /* les deux seaux, puis tout dans la caisse */
      quai(c,T,300);
      const verse=T>=en;
      const nR=verse?(T>=tQ4-.45?0:4):(T>=tQuatreS?4:0), nB=verse?(T>=tS7-.45?0:T>=tS6-.45?1:T>=tC5-.45?2:3):(T>=tTroisS?3:0);
      seaux(c,T,nR,nB);
      if(!verse&&T>=tRouge&&T<tQuatreS+1.2) cercle(c,SR[0],HAUT-20,150,CRAIE.jaune,entreE(T,tRouge,tRouge+.4));
      if(!verse&&T>=tBleu&&T<tTroisS+1.2) cercle(c,SB[0],HAUT-20,150,CRAIE.jaune,entreE(T,tBleu,tBleu+.4));
      if(!verse){ if(T>=tQuatreS) etiquette(c,'4',SR[0],200,T,tQuatreS,COUL_R,64); if(T>=tTroisS) etiquette(c,'3',SB[0],200,T,tTroisS,COUL_B,64);
        idrissE(c,880,705,1.45,{montre:T>=tIdS?1:0,T}); if(T>=tTout) bulleE(c,770,120,210,140,840,230,'?',100); }
      if(verse){
        if(T>=tCaisse||T>=mo) caisseE(c,CX,CY,CW,CH,T>=mo&&T>=tToutM?.5+.5*Math.sin(T*4):0);
        /* les 4 rouges sautent ensemble à « Quatre », puis les bleus un à un à « cinq, six, sept » */
        const sauts=[tQ4,tQ4+.12,tQ4+.24,tQ4+.36,tC5,tS6,tS7];
        for(let k=0;k<7;k++){ const t0=sauts[k]-.45; if(T<t0) continue;
          const dep=k<4?tasSeau(SR[0],HAUT,k):tasSeau(SB[0],HAUT,2-(k-4)), u=entreE(T,t0,t0+.45);
          const p=sautE(dep,dansCaisse(k),u,170); poissonE(c,p[0],p[1],FL+(124-FL)*u,k<4?COUL_R:COUL_B,{dir:k%2?1:-1,T,k}); }
        if(T<tQ4b&&T>=tQ4){ const n=T>=tS7?7:T>=tS6?6:T>=tC5?5:4, t0=[tQ4,tC5,tS6,tS7][n-4]; ecrire(c,String(n),CX,220,140*zoom(T,t0,.35),n===7?CRAIE.ok:CRAIE.jaune); }
        if(T>=tQ4b) formule(c,T,T>=mo?CX-40:528,T>=mo?200:180,4,3,7,COUL_R,COUL_B,tPlusE,tTroisE,tS7b,100);
        if(T>=mo){ for(const x of [SR[0],SB[0]]) lienE(c,[x+60,HAUT-30],[CX-190,CY-CH-70],entreE(T,tReunit,tReunit+.6),CRAIE.jaune);
          if(T>=tToutM){ c.fillStyle='rgba(31,59,44,.85)'; c.beginPath(); c.roundRect(CX-120,CY-CH+30,240,80,16); c.fill(); ecrire(c,'en tout',CX,CY-CH+72,58*zoom(T,tToutM,.4),CRAIE.jaune); }
          if(T>=tAdd) for(const [x,y] of [[CX-300,120],[CX+230,110]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      }
      tab.maj(); return; }

    /* l'accroche : la barque bleue rentre au port, pleine de poissons */
    const u=douxE(entreE(T,tMatin-.6,tPort+.6)), bx=230+330*u;
    soleilMatinE(c,880,400,80,entreE(T,finTitre,finTitre+1));
    merE(c,T,400); c.fillStyle='rgba(28,126,214,.55)'; c.fillRect(0,490,1056,230);
    quaiE(c,820,1056,430,0,T);
    for(let k=0;k<3;k++) mouetteE(c,300+k*240+40*Math.sin(T*.8+k),90+k*26+16*Math.cos(T*1.1+k),1.25,{aile:1,T,k,dir:k%2?1:-1});
    barqueE(c,bx,520,1.6,{T,rameur:true,poissons:T>=tPleine?6:0});
    if(T>=tIdriss&&T<tMatin) etincelle(c,bx+120,170,18+6*Math.sin(T*6));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien de crabes en tout ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de poissons en tout ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=w=>mot('05-question',w)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB-r1,
      phrase:phrase1,pause:pause1,
      choix:[['3',tqa('A'),tqa('trois')],['7',tqa('B'),tqa('sept')],['52',tqa('C'),tqa('cinquante-deux')]],
      tete:[[r1+.1,'Réponse '],[tB,'B !']],reponse:[phraseE('5 + 2 = 7',[tCinq2,tPlus1,tDeux1,tSept1b,tSept1b])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC-r2,
      phrase:phrase2,pause:pause2,
      choix:[['2',tqb('A'),tqb('deux')],['9',tqb('B'),tqb('neuf')],['10',tqb('C'),tqb('dix')]],
      tete:[[r2+.1,'Réponse '],[tC,'C !']],
      reponse:[phraseE('6 + 4 = 10',[tSix2,tPlus2,tQuatre2,tDix2,tDix2]),phraseE('Une dizaine !',[mr2('Une'),tDizaine,tDizaine])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-seaux')-.5,'Combien<br>en tout ?');
  return { clips,FIN,titre:'Combien en tout ?',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,se,en,mo,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros||T<se) g.ouvre();
      else if(T<q1) (T>=tS7b&&T<mo)||(T>=tAdd&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
