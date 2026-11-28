/* ============================================================
   Série Ti Margo, division CE1 — PAYSAGE 09 : « Les bouquets de la classe » (micro ce1_division_reste), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-ce1-reste-paysage.json.
   Pour la fête de l'école : 17 fleurs des champs, 5 par bouquet. « 5, 10, 15 » : 3 bouquets, et il reste 2 fleurs.
   Le reste est plus petit qu'un paquet (2 < 5) ; je vérifie : 3 × 5 + 2 = 17.
   Questions : 23 œufs, boîtes de 6, boîtes PLEINES → B (3) ; 22 enfants, 5 par voiture, pour que TOUS partent → A (5).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['reste']=function(outils){
  const DUR={'00-accroche':10.0,'01-bouquets':6.63,'02-reste':6.885,'03-verif':8.155,'04-question':17.16,'04b-reponse':10.89,
    '05-question':17.34,'05b-reponse':10.275,'06-appris':10.04,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-bouquets':.8,'02-reste':1.2,'03-verif':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bo,re,ve,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tPour=m0('Pour'), tFete=m0('fête'), tBouquetsA=m0('bouquets'), tDixSept=m0('Dix-sept'), tCinqA=m0('cinq'), tComb=m0('Combien');
  const mb=(w,n=1)=>mot('01-bouquets',w,n), tCnt=[mb('Cinq'),mb('dix'),mb('quinze')], tTroisB=mb('Trois'), tResteB=mb('reste'), tDeuxB=mb('deux');
  const mre=(w,n=1)=>mot('02-reste',w,n), tDeuxR=mre('Deux'), tAssez=mre('assez'), tLeR=mre('Le'), tPlusR=mre('plus'), tPaquetR=mre('paquet');
  const mv=(w,n=1)=>mot('03-verif',w,n), tTroisV=mv('trois'), tFoisV=mv('fois'), tCinqV=mv('cinq'), tQuinzeV=mv('quinze'), tPlusV=mv('Plus'), tDeuxV=mv('deux'), tDixSeptV=mv('dix-sept'), tToutes=mv('Toutes');
  const mq1=(w,n=1)=>mot('04-question',w,n), tVT=mq1('vingt-trois'), tOeufsQ=mq1('œufs'), tBoitesQ=mq1('boîtes'), tDeQ=mq1('de'), tSixQ=mq1('six'), tComb1=mq1('Combien'), tPleinesQ=mq1('pleines');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tBx=[mr1('Six'),mr1('douze'),mr1('dix-huit')], tTrois1=mr1('trois'), tReste1=mr1('reste'), tCinq1=mr1('cinq'), tOeufs1=mr1('œufs'), tQuatrieme=mr1('quatrième');
  const mq2=(w,n=1)=>mot('05-question',w,n), tVD=mq2('Vingt-deux'), tEnfQ=mq2('enfants'), tCinqQ=mq2('cinq'), tParQ=mq2('par'), tVoitQ=mq2('voiture'), tComb2=mq2('Combien'), tTous=mq2('tous');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tQuatre2=mr2('Quatre'), tVoit2=mr2('voitures'), tVingt2=mr2('vingt'), tEnf2=mr2('enfants'),
    tReste2=mr2('reste'), tDeux2=mr2('deux'), tFaut=mr2('faut'), tCinq2=mr2('cinq'), tVoit2b=mr2('voitures',2);
  const ma=w=>mot('06-appris',w), tResteA=ma('reste'), tLeA=ma('Le'), tPaquetA=ma('paquet'), tRelis=ma('relis'), tPleinsA=ma('pleins'), tMonde=ma('monde');
  const finTitre=tPour-.08;

  /* ---- la classe en fête : 17 fleurs dans un long vase ; 3 bouquets sur la table ---- */
  const TABLE=520, BX=[200,460,720], BY=712, SF=1.5, SB=1.45;
  const FL=k=>[64+k*58,505], FH=k=>k%2?195:150;
  /* les fleurs et les bouquets du CE1, en plus GRAND (l'ardoise du paysage est loin) */
  const fleurG=(c,x,y,h,o={})=>{ c.save(); c.translate(x,y); c.scale(SF,SF); fleurChampE(c,0,0,h,o); c.restore(); };
  const bouquetG=(c,x,y,o={})=>{ if((o.z??1)<=0) return; c.save(); c.translate(x,y); c.scale(SB,SB); bouquetChampE(c,0,0,5,o); c.restore(); };
  const groupeDe=k=>k<15?Math.floor(k/5):-1;
  const vol=k=>{ const j=groupeDe(k); return j<0?null:[tCnt[j]-.3+(k%5)*.06,tCnt[j]-.3+(k%5)*.06+.5]; };
  const forme=j=>tCnt[j]-.3+4*.06+.5;
  function classe(c,T){ c.fillStyle='#bac8ff'; c.fillRect(0,0,1056,TABLE);
    /* la guirlande de fanions de la fête */
    c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.moveTo(0,18); c.quadraticCurveTo(528,70,1056,18); c.stroke();
    for(let i=0;i<16;i++){ const x=20+i*67, y=18+52*(1-Math.pow((x-528)/528,2))*.98; c.fillStyle=COUL_CE1[i%8]; c.beginPath(); c.moveTo(x-20,y); c.lineTo(x+20,y); c.lineTo(x,y+36); c.closePath(); c.fill(); }
    c.fillStyle='#c08552'; c.fillRect(0,TABLE,1056,720-TABLE); c.fillStyle='#a9713f'; c.fillRect(0,TABLE,1056,14); }
  function vase(c,x0,x1){ c.fillStyle='rgba(165,216,255,.5)'; c.strokeStyle='#4dabf7'; c.lineWidth=5; c.beginPath(); c.roundRect(x0,440,x1-x0,82,14); c.fill(); c.stroke();
    c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=3; c.beginPath(); c.moveTo(x0+12,462); c.lineTo(x1-12,462); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : 3 bouquets et 2 fleurs */
      classe(c,T); vase(c,880,1010);
      BX.forEach((x,j)=>bouquetG(c,x,BY,{k:j,lueur:T>=tLeA&&T<tRelis?.35:0}));
      const lu=T>=tResteA&&T<tRelis?.5+.5*Math.sin(T*4):0;
      fleurG(c,915,505,140,{coul:COUL_CE1[0],lueur:lu}); fleurG(c,972,505,120,{coul:COUL_CE1[1],lueur:lu,a:.12});
      const tPetitA=mot('06-appris','petit');
      if(T>=tLeA) ecrire(c,'le reste',225,180,76*zoom(T,tLeA,.4),'#2b8a3e');
      if(T>=tPetitA) ecrire(c,'<',470,180,84*zoom(T,tPetitA,.4),'#212529');
      if(T>=tPaquetA) ecrire(c,'un paquet',735,180,76*zoom(T,tPaquetA,.4),'#1c3d8f');
      if(T>=tRelis){ const k=zoom(T,tRelis,.4); ecrire(c,'paquets pleins, ou tout le monde ?',440,290,48*k,'#212529'); }
      tab.maj(); return; }

    if(T>=q2){ /* 22 enfants, 5 par voiture (x < 480) */
      c.fillStyle='#d0ebff'; c.fillRect(0,0,1056,540); c.fillStyle='#ced4da'; c.fillRect(0,540,1056,50); c.fillStyle='#868e96'; c.fillRect(0,590,1056,130);
      c.strokeStyle='#fff'; c.lineWidth=6; c.setLineDash([40,30]); c.beginPath(); c.moveTo(0,700); c.lineTo(1056,700); c.stroke(); c.setLineDash([]);
      const KID=k=>[40+(k%8)*56,190+Math.floor(k/8)*115];
      /* qui monte dans quelle voiture : la rangée du bas part d'abord ; 6 et 7 (en haut à droite) restent sur le trottoir */
      const GRP=[2,2,2,2,2,3,-1,-1,3,3,3,3,1,1,1,0,0,0,0,0,1,1], RANG=k=>GRP.slice(0,k).filter(g=>g===GRP[k]).length;
      const CAR=[[115,660],[345,660],[115,480],[345,480]], C5=[290,335];
      const tour=j=>r2+.9+j*.5, arrive=k=>tour(GRP[k])+RANG(k)*.07+.4;
      if(T<r2){
        for(let k=0;k<22;k++){ if(T<tVD) break; const [x,y]=KID(k); eleveE(c,x,y,.95,COUL_CE1[k%8],{k,z:zoom(T,tVD+k*.03,.4)}); }
        if(T>=tVD) etiquette(c,'22',420,375,T,tVD,CRAIE.jaune,54);
        if(T>=tCinqQ){ voitureE(c,100,700,180,'#e03131',{z:zoom(T,tCinqQ,.4)}); etiquette(c,'5',100,555,T,tVoitQ,'#74c0fc',52); }
        if(T>=tComb2) ecrire(c,'?',290,520,110*zoom(T,tComb2,.5),'#c92a2a');
        if(T>=tTous){ const k=zoom(T,tTous,.4); ecrire(c,'pour que',355,622,42*k,'#212529'); ecrire(c,'TOUS partent',355,672,42*k,'#c92a2a'); }
      } else {
        const COUL=['#e03131','#1c7ed6','#2f9e44','#f08c00'];
        for(let j=0;j<4;j++){ if(T<tour(j)-.25) continue; const n=GRP.map((g,k)=>g===j&&T>=arrive(k)?1:0).reduce((a,b)=>a+b,0), dernier=Math.max(...GRP.map((g,k)=>g===j?arrive(k):0));
          voitureE(c,CAR[j][0],CAR[j][1],190,COUL[j],{z:j===0?1:zoom(T,tour(j)-.25,.4),tetes:n,lueur:T>=tQuatre2&&T<tVingt2+.4?.4:0});
          if(n===5) rondNombreE(c,String(5*(j+1)),CAR[j][0]-82,CAR[j][1]-118,28,{z:zoom(T,dernier,.35),coul:CRAIE.ok}); }
        for(let k=0;k<22;k++){ const p0=KID(k);
          if(GRP[k]>=0){ const t0=arrive(k)-.4, u=entreE(T,t0,t0+.4); if(u>=1) continue; const j=GRP[k], p=sautE(p0,[CAR[j][0],CAR[j][1]-70],u,60);
            eleveE(c,p[0],p[1],.95*(1-.6*u),COUL_CE1[k%8],{k}); }
          else { const u=entreE(T,tCinq2-.35,tCinq2+.05), p=sautE(p0,[C5[0]+(k===6?-40:40),C5[1]-70],u,60);
            if(u<1) eleveE(c,p[0],p[1],.95*(1-.6*u),COUL_CE1[k%8],{k,lueur:T>=tReste2&&T<tCinq2?.5+.5*Math.sin(T*4):0}); } }
        if(T>=tFaut){ const u=entreE(T,tFaut,tFaut+.6); voitureE(c,C5[0]-160*(1-u),C5[1],190,'#ae3ec9',{tetes:T>=tCinq2?2:0,lueur:T>=tCinq2?.5:0}); }
        if(T>=tCinq2) etiquette(c,'5',450,250,T,tCinq2,CRAIE.ok,56);
        if(T>=tVingt2) formuleE(c,T,200,40,['4','×','5','=','20'],[tVingt2,tVingt2,tVingt2,tVingt2,tVingt2],60,['#1c3d8f','#212529','#2b8a3e','#212529','#c92a2a']);
      }
      tab.maj(); return; }

    if(T>=q1){ /* 23 œufs, boîtes de 6, boîtes PLEINES (x < 480) */
      c.fillStyle='#d0ebff'; c.fillRect(0,0,1056,90); c.fillStyle='#e9c46a'; c.fillRect(0,90,1056,630);
      c.strokeStyle='rgba(166,124,46,.35)'; c.lineWidth=3; for(let i=0;i<60;i++){ const x=(i*97)%1056, y=110+(i*53)%600; c.beginPath(); c.moveTo(x,y); c.lineTo(x+26,y-8); c.stroke(); }
      const OEUF=k=>[62+(k%6)*66,135+Math.floor(k/6)*68];
      const BOX=[[120,455],[350,455],[120,630]], LIBRE=[[275,600],[330,600],[385,600],[302,665],[357,665]];
      if(T<r1){
        for(let k=0;k<23;k++){ if(T<tVT) break; const [x,y]=OEUF(k); oeufE(c,x,y,26,{z:zoom(T,tVT+k*.03,.4)}); }
        if(T>=tVT) etiquette(c,'23',450,235,T,tVT,CRAIE.jaune,56);
        if(T>=tBoitesQ){ boiteOeufsE(c,120,525,3,2,62,{z:zoom(T,tBoitesQ,.4)}); etiquette(c,'6',280,525,T,tSixQ,'#74c0fc',52); }
        if(T>=tComb1) ecrire(c,'?',405,525,120*zoom(T,tComb1,.5),'#c92a2a');
        if(T>=tPleinesQ){ const k=zoom(T,tPleinesQ,.4); ecrire(c,'boîtes PLEINES',245,668,54*k,'#c92a2a'); }
      } else {
        const alv=BOX.map(([x,y],j)=>boiteOeufsE(c,x,y,3,2,62,{z:zoom(T,tBx[j]-.45,.4),lueur:T>=tTrois1&&T<tReste1?.4:0}));
        for(let k=0;k<23;k++){ const p0=OEUF(k); let p=p0;
          if(k<18){ const j=Math.floor(k/6), t0=tBx[j]-.3+(k%6)*.05, u=entreE(T,t0,t0+.35); p=sautE(p0,alv[j][k%6],u,60); }
          else { const u=entreE(T,tReste1-.2,tReste1+.25); p=sautE(p0,LIBRE[k-18],u,60); }
          oeufE(c,p[0],p[1],26,{lueur:k>=18&&T>=tCinq1&&T<tQuatrieme+.8?.5+.5*Math.sin(T*4):0}); }
        BOX.forEach(([x,y],j)=>{ if(T>=tBx[j]) rondNombreE(c,String(6*(j+1)),x-98,y-70,28,{z:zoom(T,tBx[j],.35),coul:CRAIE.ok}); });
        if(T>=tCinq1) etiquette(c,'5',450,630,T,tCinq1,CRAIE.ok,50);
        if(T>=tTrois1) formuleE(c,T,245,46,['3','×','6','+','5','=','23'],[tTrois1,tTrois1,tTrois1,tCinq1,tCinq1,tOeufs1+.2,tOeufs1+.2],62,
          ['#1c3d8f','#212529','#2b8a3e','#212529','#c92a2a','#212529','#212529']);
      }
      tab.maj(); return; }

    /* la fête de l'école : les fleurs, les bouquets, le reste, la vérification */
    classe(c,T); vase(c,60,1000);
    const lb=T>=ve&&T>=tTroisV&&T<tPlusV?.5+.5*Math.sin(T*4):(T>=bo&&T>=tTroisB&&T<tResteB?.4:0);
    const lr=(T>=bo&&T>=tResteB&&T<ve)||(T>=ve&&T>=tPlusV&&T<tToutes)?.5+.5*Math.sin(T*4):0;
    /* les rubans attendent sur la table ; chacun devient le nœud d'un bouquet */
    BX.forEach((x,j)=>{ if(T>=tBouquetsA&&!(T>=bo&&T>=forme(j))) rubanE(c,x,640,'#e64980',1.4*zoom(T,tBouquetsA+j*.1,.4)); });
    for(let k=0;k<17;k++){ if(T<tDixSept) break; const [x,y]=FL(k), v=vol(k);
      if(v&&T>=bo){ const u=entreE(T,v[0],v[1]); if(u>=1) continue; const j=groupeDe(k), p=sautE([x,y],[BX[j],BY],u,90);
        fleurG(c,p[0],p[1],FH(k)-(FH(k)-160)*u,{coul:COUL_CE1[k%5],a:-.3*u+(k%5)*.15*u}); continue; }
      fleurG(c,x,y,FH(k),{coul:COUL_CE1[k%5],z:zoom(T,tDixSept+k*.04,.4),lueur:k>=15?lr:0}); }
    if(T>=bo) BX.forEach((x,j)=>{ if(T>=forme(j)) bouquetG(c,x,BY,{k:j,z:zoom(T,forme(j),.35),lueur:lb}); });
    if(T>=tDixSept) etiquette(c,'17',90,120,T,tDixSept,CRAIE.jaune,56);
    if(T<bo){
      if(T>=tCinqA){ const k=zoom(T,tCinqA,.4); ecrire(c,'5 par bouquet',528,120,62*k,'#1c3d8f'); }
      if(T>=tComb) ecrire(c,'?',960,120,130*zoom(T,tComb,.5),'#f08c00'); }
    else {
      BX.forEach((x,j)=>{ if(T>=tCnt[j]+.2) etiquette(c,String(5*(j+1)),x,395,T,tCnt[j]+.2,CRAIE.ok,50); });
      if(T<re){ if(T>=tDeuxB) etiquette(c,'2',963,125,T,tDeuxB,CRAIE.ok,50); }
      else if(T<ve){
        ecrire(c,'reste 2',840,120,62*zoom(T,re+.1,.4),'#2b8a3e');
        if(T>=tLeR) formuleE(c,T,460,230,['2','<','5'],[tLeR,tPlusR,tPaquetR],110,['#2b8a3e','#212529','#1c3d8f']); }
      else {
        formuleE(c,T,470,230,['3','×','5','+','2','=','17'],[tTroisV,tFoisV,tCinqV,tPlusV,tDeuxV,tDixSeptV,tDixSeptV],88,
          ['#1c3d8f','#212529','#2b8a3e','#212529','#2b8a3e','#212529','#c92a2a']);
        if(T>=tToutes) for(const [x,y] of [[110,240],[830,240]]) etincelle(c,x,y,16+6*Math.sin(T*6+x)); }
    }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Le fermier a vingt-trois œufs.'); qa('Il remplit des boîtes de six.'); const phrase1=[qa('Combien de boîtes pleines ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Vingt-deux enfants partent en sortie, cinq par voiture.'); const phrase2=[qb('Combien de voitures pour que tous partent ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:[phraseE('23 œufs, 6 par boîte.',[tVT,tOeufsQ,tSixQ,tSixQ,tBoitesQ]),...phrase1],pause:pause1,
      choix:[['4',tqa('A'),tqa('quatre')],['3',tqa('B'),tqa('trois')],['29',tqa('C'),tqa('vingt-neuf')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],
      reponse:[phraseE('3 boîtes pleines.',[tTrois1,mr1('boîtes'),mr1('pleines')]),phraseE('3 × 6 + 5 = 23',[tTrois1,tTrois1,tTrois1,tCinq1,tCinq1,tOeufs1+.2,tOeufs1+.2])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:[phraseE('22 enfants, 5 par voiture.',[tVD,tEnfQ,tCinqQ,tParQ,tVoitQ]),...phrase2],pause:pause2,
      choix:[['5',tqb('A'),tqb('cinq',2)],['4',tqb('B'),tqb('quatre')],['27',tqb('C'),tqb('vingt-sept')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('4 voitures : 20 enfants.',[tQuatre2,tVoit2,tVoit2,tVingt2,tEnf2]),
        phraseE('Il en reste 2 : 5 voitures !',[tReste2-.4,tReste2-.2,tReste2,tDeux2,tCinq2,tCinq2,tVoit2b,tVoit2b])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-reste')-.5,'Il en<br>reste !');
  return { clips,FIN,titre:'Les bouquets de la classe',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,bo,re,ve,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tTroisB&&T<re)||(T>=tToutes&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
