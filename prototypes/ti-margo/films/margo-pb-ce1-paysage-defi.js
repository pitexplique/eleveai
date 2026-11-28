/* ============================================================
   Série Ti Margo, division CE1 — PAYSAGE 10 : « Les défis du tournoi » (micro ce1_division_defi), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-ce1-defi-paysage.json.
   Défi 1 : 32 joueurs en équipes de 8 → 8, 16, 24, 32 : 4 équipes ; 4 × 8 = 32.
   Défi 2 (deux étapes) : 3 packs de 6 gourdes = 18 ; 18 pour 2 équipes → 9 ; 9 + 9 = 18.
   Questions : 25 ballons, filets de 6, TOUS rangés → B (5) ; 2 équipes de 10, groupes de 5 → B (4).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':10.86,'01-equipes':5.615,'02-defi2':8.725,'03-etapes':9.77,'04-question':16.475,'04b-reponse':9.44,
    '05-question':15.935,'05b-reponse':8.645,'06-appris':9.035,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-equipes':1.2,'02-defi2':1,'03-etapes':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,eq,d2,et,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tAu=m0('Au'), tTournoi=m0('tournoi'), tDefis=m0('défis'), tDefi1=m0('Défi'), t32=m0('trente-deux'), tJoueurs=m0('joueurs'), tEquipes0=m0('équipes'), tHuit0=m0('huit'), tComb0=m0('Combien');
  const me=(w,n=1)=>mot('01-equipes',w,n), tCpt=[me('Huit'),me('seize'),me('vingt-quatre'),me('trente-deux')], tQuatreE=me('Quatre'), tEquipesE=me('équipes');
  const md=(w,n=1)=>mot('02-defi2',w,n), tDefi2=md('Défi'), tTroisD=md('trois'), tPacks=md('packs'), tSixD=md('six'), tGourdes=md('gourdes'), tPartage=md('partage'), tDeuxD=md('deux',2), tEquipesD=md('équipes'), tCombD=md('Combien');
  const mt=(w,n=1)=>mot('03-etapes',w,n), tEt1=mt('Étape'), tS6=mt('six'), tS12=mt('douze'), tS18=mt('dix-huit'), tEt2=mt('Étape',2), tS18b=mt('dix-huit',2), tPartageT=mt('partagé'), tEnDeux=mt('deux',2), tNeuf=mt('Neuf'), tEquipeT=mt('équipe');
  const mq1=w=>mot('04-question',w), t25=mq1('Vingt-cinq'), tBallons=mq1('ballons'), tFilets=mq1('filets'), tSixQ=mq1('six'), tComb1=mq1('Combien'), tTous=mq1('tous');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tQuatreF=mr1('Quatre'), tFiletsR=mr1('filets'), t24=mr1('vingt-quatre'), tBallonsR=mr1('ballons'), tReste=mr1('reste'), tUn=mr1('un'), tFilet1=mr1('filet'), tPlus=mr1('plus'), tCinqF=mr1('Cinq'), tFiletsR2=mr1('filets',2);
  const mq2=(w,n=1)=>mot('05-question',w,n), tDeuxQ=mq2('Deux'), tEquipesQ=mq2('équipes'), tDixQ=mq2('dix'), tEnfQ=mq2('enfants'), tGroupesQ=mq2('groupes'), tCinqQ=mq2('cinq'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tDix2=mr2('Dix'), tPlus2=mr2('plus'), tDix2b=mr2('dix',2), tVingt2=mr2('vingt'), tEnf2=mr2('enfants'),
    tC5=[mr2('Cinq'),mr2('dix',3),mr2('quinze'),mr2('vingt',2)], tQuatreG=mr2('quatre'), tGroupesR=mr2('groupes');
  const ma=w=>mot('06-appris',w), tJe=ma('Je'), tNombre=ma('nombre'), tPaquetsA=ma('paquets'), tChaqueA=ma('chaque'), tSil=ma("S'il"), tResteA=ma('reste'), tRelis=ma('relis'), tQuestionA=ma('question');
  const finTitre=tAu-.08;

  /* ---- le tournoi : terrain, fanions ---- */
  const EQC=['#e03131','#1c7ed6','#f59f00','#9c36b5'];
  function tournoi(c,T,yH=270){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,yH); terrainE(c,yH);
    [60,250,806,996].forEach((x,i)=>fanionE(c,x,yH+6,120,EQC[i],T)); }

  /* défi 1 : 32 joueurs en vrac (3 rangs), maillots des 4 équipes mélangés ; ils rejoignent leur équipe au compte */
  const EQ=k=>[0,2,1,3,1,0,3,2][k%8]^(Math.floor(k/8)%4); /* l'équipe du joueur k (8 par équipe) */
  const RANG=(()=>{ const n=[0,0,0,0], r=[]; for(let k=0;k<32;k++){ const e=EQ(k); r.push(n[e]++); } return r; })();
  const VRAC=k=>{ const ligne=k<11?0:(k<22?1:2), i=k-[0,11,22][ligne]; return [62+i*93+(ligne===1?46:0)+[8,-10,4,-6,12][k%5],[440,570,700][ligne]]; };
  const GX=[140,393,663,916], GROUPE=k=>{ const e=EQ(k), m=RANG[k]; return [GX[e]+[-84,-28,28,84][m%4],m<4?548:690]; };
  const quandEq=k=>tCpt[EQ(k)]-.4+RANG[k]*.035;

  /* défi 2 : 3 packs de 6 gourdes, 2 équipes (rouge, bleue) ; 9 gourdes pour chacune */
  const PKX=[200,528,856], PKY=262, ZX=[290,766];
  const GOURDE=k=>{ const p=Math.floor(k/6), m=k%6; return [PKX[p]-66+(m%3)*66,PKY+(m<3?-8:68)]; };
  const ZONE=k=>{ const z=k%2, m=Math.floor(k/2); return [ZX[z]-64+(m%3)*64,[565,635,705][Math.floor(m/3)]]; };
  const quandG=k=>tPartageT+k*.07;

  function joueur(c,x,yB,s,coul,k,o={}){ c.save(); c.translate(x,yB); c.scale(s,s); eleveE(c,0,0,1,coul,{k,...o}); c.restore(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris */
      c.fillStyle='#1f3b2c'; c.fillRect(0,0,1056,720);
      const g1=T>=tNombre&&T<tChaqueA, g2=T>=tChaqueA&&T<tSil;
      /* à gauche : des paquets de 4 sandwichs, on cherche le NOMBRE de paquets */
      [[150,250],[300,250],[150,400],[300,400]].forEach(([x,y],j)=>{ paquetE(c,x,y,130,120,{z:zoom(T,ap+.2+j*.1,.4),lueur:g1?.5+.5*Math.sin(T*4):0});
        for(let m=0;m<4;m++) sandwichE(c,x+(m%2?28:-28),y+(m<2?-24:26),46,{z:zoom(T,ap+.3+j*.1,.4)}); });
      if(T>=tPaquetsA) ecrire(c,'? paquets',225,510,62*zoom(T,tPaquetsA,.4),CRAIE.jaune);
      /* à droite : on connaît le nombre de paquets, on cherche COMBIEN DANS CHAQUE */
      [[700,320],[880,320]].forEach(([x,y],j)=>{ paquetE(c,x,y,150,170,{z:zoom(T,ap+.5+j*.1,.4),lueur:g2?.5+.5*Math.sin(T*4):0});
        if(T>=tChaqueA) ecrire(c,'?',x,y+6,110*zoom(T,tChaqueA+j*.1,.5),CRAIE.jaune); });
      if(T>=tChaqueA) ecrire(c,'? dans chaque',790,510,62*zoom(T,tChaqueA,.4),'#74c0fc');
      c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=4; c.beginPath(); c.moveTo(528,170); c.lineTo(528,540); c.stroke();
      if(T>=tResteA){ ballonFootE(c,330,600,34,{z:zoom(T,tResteA,.4)}); ecrire(c,'Il reste ?',548,602,60*zoom(T,tResteA,.4),CRAIE.ret); }
      if(T>=tRelis) ecrire(c,'Je relis la question.',528,676,56*zoom(T,tRelis,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=q2){ /* 2 équipes de 10 enfants ; des groupes de 5 (x < 480) */
      tournoi(c,T,0);
      /* question : chaque équipe en grappe (6 derrière, 4 devant) ; réponse : 4 rangées de 5 */
      const GR=k=>{ const e=k<10?0:1, m=k%10, yb=e?520:265; return m<6?[78+m*64,yb]:[110+(m-6)*64,yb+64]; };
      const RG=k=>[72+(k%5)*78,[236,350,464,578][Math.floor(k/5)]];
      if(T>=r2) for(let g=0;g<4;g++) paquetE(c,226,RG(g*5)[1]-52,420,116,{z:zoom(T,tC5[g],.4),lueur:T>=tC5[g]&&T<tQuatreG+.6?.4:0});
      const pos=[]; for(let k=0;k<20;k++){ let p=GR(k); if(T>=r2){ const t0=tEnf2+.2+k*.05, u=entreE(T,t0,t0+.4); p=sautE(GR(k),RG(k),u,80); } pos[k]=p; }
      const vus=[...Array(20).keys()].sort((a,b)=>pos[a][1]-pos[b][1]); /* ceux de derrière d'abord */
      for(const k of vus){ if(T<tEnfQ) break; joueur(c,pos[k][0],pos[k][1],.9,EQC[k<10?0:1],k,{z:zoom(T,tEnfQ+k*.03,.4)}); }
      if(T<r2){
        if(T>=tDixQ){ etiquette(c,'10',448,200,T,tDixQ,'#ff8787',46); etiquette(c,'10',448,455,T,tDixQ+.1,'#74c0fc',46); }
        if(T>=tGroupesQ) ecrire(c,'groupes de 5',215,665,52*zoom(T,tGroupesQ,.4),'#74c0fc');
        if(T>=tComb2) ecrire(c,'?',440,665,96*zoom(T,tComb2,.5),CRAIE.jaune); }
      else {
        formuleE(c,T,240,56,['10','+','10','=','20'],[tDix2,tPlus2,tDix2b,tVingt2,tVingt2],62,['#ff8787',CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.ok]);
        for(let g=0;g<4;g++) if(T>=tC5[g]) etiquette(c,String(5*(g+1)),458,RG(g*5)[1]-52,T,tC5[g],g===3?CRAIE.ok:'#ff922b',40);
        if(T>=tQuatreG) ecrire(c,'4 groupes',240,672,60*zoom(T,tQuatreG,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T>=q1){ /* 25 ballons ; des filets de 6 ; TOUS les ballons (x < 480) */
      tournoi(c,T,0);
      const GRILLE=k=>[70+(k%5)*72,115+Math.floor(k/5)*70];
      const FX=j=>55+j*92, FY=575, SLOT=(j,m)=>[FX(j)+(m%2?20:-20),FY-52+Math.floor(m/2)*50];
      if(T<r1){
        if(T>=tFilets){ filetBallonsE(c,90,560,120,170,{z:zoom(T,tFilets,.4),coul:'#fff'}); etiquette(c,'6',200,560,T,tSixQ,'#ff922b',46); }
        if(T>=tComb1) ecrire(c,'?',330,560,110*zoom(T,tComb1,.5),CRAIE.jaune);
        if(T>=tTous) ecrire(c,'TOUS les ballons',240,680,48*zoom(T,tTous,.4),'#ff922b'); }
      for(let k=0;k<25;k++){ if(T<t25) break; let p=GRILLE(k), rr=29;
        if(T>=r1){ const j=Math.floor(k/6), m=k%6, t0=k<24?tQuatreF-.3+k*.045:tFilet1-.1, u=entreE(T,t0,t0+.4); p=sautE(GRILLE(k),SLOT(j,m),u,70); rr=29-9*u; }
        ballonFootE(c,p[0],p[1],rr,{z:zoom(T,t25+k*.03,.4)}); }
      if(T>=r1){
        for(let j=0;j<5;j++){ const t0=j<4?tQuatreF-.4+j*.27:tFilet1-.4; if(T<t0) continue;
          filetBallonsE(c,FX(j),FY,84,160,{z:zoom(T,t0,.4),lueur:j===4&&T>=tFilet1&&T<tCinqF+.6?.5+.5*Math.sin(T*5):0}); }
        for(let j=0;j<4;j++) etiquette(c,String(6*(j+1)),FX(j),690,T,tQuatreF+.1+j*.25,j===3?'#ff922b':'#74c0fc',38);
        if(T>=tReste) etiquette(c,'1',FX(4),690,T,tUn,'#ff8787',38);
        if(T>=t24) ecrire(c,'24',440,180,64*zoom(T,t24,.4),'#ff922b');
        if(T>=tCinqF) ecrire(c,'5 filets',240,440,76*zoom(T,tCinqF,.4),CRAIE.ok); }
      else if(T>=t25) etiquette(c,'25',445,80,T,t25,'#ff922b',48);
      tab.maj(); return; }

    if(T>=d2){ /* défi 2 : 3 packs de 6 gourdes, 2 équipes */
      tournoi(c,T,0); c.fillStyle='rgba(255,255,255,.12)'; c.fillRect(0,0,1056,720);
      const uP=1-entreE(T,tPartageT+.6,tPartageT+1.4);
      c.save(); c.globalAlpha=Math.max(0,uP); for(let p=0;p<3;p++) if(uP>0) packE(c,PKX[p],PKY+30,240,190,{z:zoom(T,tPacks+p*.12,.4),lueur:T>=et&&T<tEt2&&T>=[tS6,tS12,tS18][p]?.6:0}); c.restore();
      /* les 2 équipes : une zone de couleur, 2 joueurs de chaque côté */
      ZX.forEach((x,z)=>{ if(T<tDeuxD) return; const zz=zoom(T,tDeuxD+z*.12,.4);
        c.save(); c.globalAlpha=Math.min(1,zz); c.fillStyle=z?'rgba(28,126,214,.28)':'rgba(224,49,49,.28)'; c.beginPath(); c.roundRect(x-205,480,410,236,26); c.fill(); c.restore();
        joueur(c,x-150,712,1.25,EQC[z],z*2,{z:zz}); joueur(c,x+150,712,1.25,EQC[z],z*2+1,{z:zz}); });
      for(let k=0;k<18;k++){ if(T<tGourdes) break; let p=GOURDE(k), h=82;
        if(T>=et){ const u=entreE(T,quandG(k),quandG(k)+.45); p=sautE(GOURDE(k),ZONE(k),u,110); h=82-16*u; }
        gourdeE(c,p[0],p[1],h,COUL_CE1[(k*3)%8],{z:zoom(T,tGourdes+k*.03,.4)}); }
      if(T<et){
        if(T>=tDefi2) ecrire(c,'Défi 2',528,60,70*zoom(T,tDefi2,.4),CRAIE.jaune);
        for(let p=0;p<3;p++) if(T>=tSixD) etiquette(c,'6',PKX[p],140,T,tSixD+p*.1,'#ff922b',44);
        if(T>=tEquipesD) ecrire(c,'2 équipes',528,438,60*zoom(T,tEquipesD,.4),CRAIE.blanc);
        if(T>=tCombD) ZX.forEach((x,z)=>ecrire(c,'?',x,600,110*zoom(T,tCombD+z*.1,.5),CRAIE.jaune)); }
      else {
        if(T>=tEt1) ecrire(c,'Étape 1',140,62,48*zoom(T,tEt1,.4),CRAIE.jaune);
        formuleE(c,T,600,62,['6','+','6','+','6','=','18'],[tS6,tS12,tS12,tS18,tS18,tS18,tS18],74,['#ff922b',CRAIE.blanc,'#ff922b',CRAIE.blanc,'#ff922b',CRAIE.blanc,'#74c0fc']);
        if(T>=tEt2) ecrire(c,'Étape 2',140,160,48*zoom(T,tEt2,.4),CRAIE.jaune);
        if(T>=tS18b&&T<tNeuf) ecrire(c,'18 en 2',600,160,74*zoom(T,tS18b,.4),'#74c0fc');
        formuleE(c,T,600,160,['9','+','9','=','18'],[tNeuf,tNeuf,tNeuf,tNeuf,tNeuf],74,[CRAIE.ok,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,'#74c0fc']);
        ZX.forEach((x,z)=>{ if(T>=tNeuf) etiquette(c,'9',x,438,T,tNeuf+z*.12,CRAIE.ok,48); }); }
      tab.maj(); return; }

    /* défi 1 : 32 joueurs, des équipes de 8 */
    tournoi(c,T);
    const pos=[]; for(let k=0;k<32;k++){ let p=VRAC(k); if(T>=eq){ const u=entreE(T,quandEq(k),quandEq(k)+.4); p=sautE(VRAC(k),GROUPE(k),u,90); } pos[k]=p; }
    const ordre=[...Array(32).keys()].sort((a,b)=>pos[a][1]-pos[b][1]);
    for(const k of ordre){ if(T<tJoueurs) break; joueur(c,pos[k][0],pos[k][1],1.05,EQC[EQ(k)],k,{z:zoom(T,tJoueurs+k*.025,.4)}); }
    if(T<eq){
      if(T>=tDefi1) ecrire(c,'Défi 1',170,70,72*zoom(T,tDefi1,.4),'#c92a2a');
      if(T>=t32) etiquette(c,'32',470,72,T,t32,'#ff922b',56);
      if(T>=tHuit0) ecrire(c,'8 par équipe',780,72,64*zoom(T,tHuit0,.4),'#1864ab');
      if(T>=tComb0) ecrire(c,'?',528,190,110*zoom(T,tComb0,.5),'#e8590c'); }
    else {
      for(let e=0;e<4;e++) etiquette(c,String(8*(e+1)),GX[e],378,T,tCpt[e],e===3?CRAIE.ok:'#ff922b',46);
      formuleE(c,T,528,165,['4','×','8','=','32'],[tQuatreE,tQuatreE,tQuatreE,tQuatreE,tQuatreE],86,['#2b8a3e','#343a40','#1864ab','#343a40','#e8590c']);
      if(T>=tEquipesE) ecrire(c,'4 équipes',528,62,64*zoom(T,tEquipesE,.4),'#2b8a3e'); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Vingt-cinq ballons, rangés dans des filets de six.'); const phrase1=[qa('Combien de filets pour ranger tous les ballons ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Deux équipes de dix enfants.'); qb('On fait des groupes de cinq.'); const phrase2=[qb('Combien de groupes ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:[phraseE('25 ballons, filets de 6.',[t25,tBallons,tFilets,mq1('de'),tSixQ]),...phrase1],pause:pause1,
      choix:[['4',tqa('A'),tqa('quatre')],['5',tqa('B'),tqa('cinq')],['6',tqa('C'),mot('04-question','six',2)-q1]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],
      reponse:[phraseE('4 filets : 24 ballons.',[tQuatreF,tFiletsR,t24,t24,tBallonsR]),phraseE('Il en reste 1 : 5 filets !',[mr1('Il'),mr1('en'),tReste,tUn,tCinqF,tCinqF,tFiletsR2,tFiletsR2])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('2 équipes de 10, groupes de 5.',[tDeuxQ,tEquipesQ,mq2('de'),tDixQ,tGroupesQ,mq2('de',2),tCinqQ]),...phrase2],pause:pause2,
      choix:[['2',tqb('A'),tqb('deux',2)],['4',tqb('B'),tqb('quatre')],['15',tqb('C'),tqb('quinze')]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('10 + 10 = 20',[tDix2,tPlus2,tDix2b,tVingt2,tVingt2]),phraseE('5, 10, 15, 20 : 4 groupes.',[tC5[0],tC5[1],tC5[2],tC5[3],tQuatreG,tQuatreG,tGroupesR])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-equipes')-.3,'Les défis<br>du tournoi');
  return { clips,FIN,titre:'Les défis du tournoi',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,eq,d2,et,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tEquipesE&&T<d2)||(T>=tNeuf&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
