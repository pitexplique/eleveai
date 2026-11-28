/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 03 : « Le bus qui s'arrête » (micro cp_probleme_deux_etapes), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-deux-etapes-paysage.json.
   8 personnes dans le bus ; 1er arrêt, 3 montent : 8 + 3 = 11 ; 2e arrêt, 2 descendent : 11 − 2 = 9.
   Questions : 5 croissants + 4 pains au chocolat, on en mange 2 → A (7) ; 10 crayons, j'en prête 3, on m'en rend 1 → B (8).
   ⭐ Pendant les questions et les réponses, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */

/* Un croissant (centre x, y ; largeur w) */
function croissant_deux(c,x,y,w=90,{z=1,lueur=0,terne=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); c.save(); c.translate(x,y); c.scale(k*w/90,k*w/90);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,62,44,0,0,7); c.fill(); }
  c.globalAlpha=terne?.3:1; c.fillStyle='#f4a742'; c.strokeStyle='#b8651b'; c.lineWidth=3;
  for(const [dx,dy,rx,ry] of [[-36,10,14,12],[36,10,14,12],[-20,-4,17,17],[20,-4,17,17],[0,-10,20,21]]){ c.beginPath(); c.ellipse(dx,dy,rx,ry,0,0,7); c.fill(); c.stroke(); }
  c.fillStyle='rgba(255,255,255,.35)'; c.beginPath(); c.ellipse(-4,-18,8,5,-.3,0,7); c.fill(); c.globalAlpha=1; c.restore(); }
/* Un pain au chocolat (centre x, y ; largeur w) */
function painChoco_deux(c,x,y,w=90,{z=1,lueur=0,terne=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); c.save(); c.translate(x,y); c.scale(k*w/90,k*w/90);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,62,44,0,0,7); c.fill(); }
  c.globalAlpha=terne?.3:1; c.fillStyle='#e8a15c'; c.strokeStyle='#a0522d'; c.lineWidth=3;
  c.beginPath(); c.roundRect(-45,-26,90,52,14); c.fill(); c.stroke();
  c.strokeStyle='rgba(160,82,45,.6)'; c.lineWidth=2; for(const v of [-10,4]){ c.beginPath(); c.moveTo(-40,v); c.lineTo(40,v); c.stroke(); }
  c.fillStyle='#5c3317'; c.fillRect(-49,-12,10,22); c.fillRect(39,-12,10,22); c.globalAlpha=1; c.restore(); }
/* Une tête dans une fenêtre du bus (x, y = le centre ; r ; k choisit peau et cheveux) */
function tete_deux(c,x,y,r,k){ const PEAU=['#8d5524','#f1c27d','#c68642','#e0ac69','#5c3a1e','#f3c9a0'][k%6], CHEV=['#212529','#7a4a2a','#343a40','#a0522d','#d9a066','#495057'][k%6];
  c.fillStyle=PEAU; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.fillStyle=CHEV; c.beginPath(); c.arc(x,y-r*.15,r*1.03,Math.PI*1.05,Math.PI*1.95); c.fill();
  c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(x+sx*r*.35,y+r*.05,r*.13,0,7); c.fill(); } }
/* Ti Margo, tout petit, au premier rang (tête verte, grands yeux) */
function margoTete_deux(c,x,y,r){ c.fillStyle='#82c91e'; c.strokeStyle='#2b8a3e'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,r*1.15,r,0,0,7); c.fill(); c.stroke();
  for(const sx of [-1,1]){ c.fillStyle='#fff'; c.beginPath(); c.arc(x+sx*r*.5,y-r*.55,r*.42,0,7); c.fill(); c.stroke(); c.fillStyle='#1864ab'; c.beginPath(); c.arc(x+sx*r*.5,y-r*.5,r*.2,0,7); c.fill(); }
  c.strokeStyle='#5c3d0a'; c.lineWidth=3; c.beginPath(); c.arc(x,y+r*.15,r*.5,.2*Math.PI,.8*Math.PI); c.stroke(); }
/* Une trousse ouverte : le fond (dessiner les crayons ensuite), puis le devant */
function trousseFond_deux(c,x0,yBas,w,h){ c.fillStyle='#1864ab'; c.beginPath(); c.roundRect(x0,yBas-h,w,h,18); c.fill(); }
function trousseDevant_deux(c,x0,yBas,w,h){ c.fillStyle='#339af0'; c.strokeStyle='#1864ab'; c.lineWidth=5; c.beginPath(); c.roundRect(x0,yBas-h*.5,w,h*.5,18); c.fill(); c.stroke();
  c.strokeStyle='#adb5bd'; c.lineWidth=6; c.setLineDash([10,6]); c.beginPath(); c.moveTo(x0+16,yBas-h*.5+10); c.lineTo(x0+w-16,yBas-h*.5+10); c.stroke(); c.setLineDash([]);
  c.fillStyle='#ced4da'; c.beginPath(); c.roundRect(x0+w-40,yBas-h*.5-4,24,30,6); c.fill(); }

FILMS['deux-etapes']=function(outils){
  const DUR={'00-accroche':10.74,'01-etape1':5.535,'02-etape2':7.535,'03-deux':9.98,'04-question':17.255,'04b-reponse':9.88,
    '05-question':18.225,'05b-reponse':8.22,'06-appris':7.94,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-etape1':1.4,'02-etape2':1.2,'03-deux':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,e1,e2,de,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tJe=m0('Je'), tHuit0=m0('huit'), tDeux0=m0('deux'), tCombien0=m0('Combien');
  const m1=(w,n=1)=>mot('01-etape1',w,n), tPremier=m1('Premier'), tTrois1=m1('trois'), tMontent=m1('montent'), tHuit1=m1('Huit'), tPlus1=m1('plus'), tTrois1b=m1('trois',2), tOnze1=m1('onze');
  const m2=(w,n=1)=>mot('02-etape2',w,n), tDeuxieme=m2('Deuxième'), tDeux2=m2('deux'), tDescendent=m2('descendent'), tPars=m2('pars'), tOnze2=m2('Onze',2), tMoins2=m2('moins'), tDeux2b=m2('deux',2), tNeuf2=m2('neuf');
  const m3=(w,n=1)=>mot('03-deux',w,n), tBouge=m3('bouge'), tResultat=m3('résultat'), tSert=m3('sert'), tNeuf3=m3('Neuf');
  const mq1=(w,n=1)=>mot('04-question',w,n), tCinqQ=mq1('cinq'), tQuatreQ=mq1('quatre'), tMange=mq1('mange'), tDeuxQ=mq1('deux'), tCombienQ=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tCinq1=mr1('cinq'), tPlus1r=mr1('plus'), tQuatre1=mr1('quatre'), tNeuf1=mr1('neuf'), tNeuf1b=mr1('neuf',2), tMoins1=mr1('moins'), tDeux1=mr1('deux',2), tSept1=mr1('sept'), tB1=mr1('B');
  const mq2=(w,n=1)=>mot('05-question',w,n), tDixQ=mq2('dix'), tTroisQ=mq2('trois'), tRend=mq2('rend'), tUnQ=mq2('un',2), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), tDix2=mr2('dix'), tMoins2r=mr2('moins'), tTrois2=mr2('trois'), tSept2=mr2('sept'), tSept2b=mr2('sept',2), tPlus2=mr2('plus'), tUn2=mr2('un',2), tHuit2=mr2('huit');
  const mA=(w,n=1)=>mot('06-appris',w,n), tBougeA=mA('bouge'), tEtapesA=mA('étapes'), tResultatA=mA('résultat'), tSertA=mA('sert');
  const finTitre=tJe-.08;

  /* le bus : 4 fenêtres, 3 places par fenêtre ; 8 têtes au départ, 3 montent, 2 descendent */
  const BW=760, BXc=528, BYB=575, BX0=BXc-BW/2, BH=BW*.42, BY0=BYB-BH;
  const PLACES=[]; for(let i=0;i<4;i++) for(let j=0;j<3;j++) PLACES.push([BX0+BW*.2+i*BW*.19+BW*.15*(.2+.3*j),BY0+BH*.3+BH*.3*.6]);
  const DEPART=[0,2,3,5,6,8,9,11], MONTENT=[1,4,7], DESCENDENT=[3,9];
  const ARRET_X=70;
  function rue(c,T){ c.fillStyle='#d0ebff'; c.fillRect(0,0,1056,720);
    for(const [x,w,h,coul] of [[120,200,260,'#ffc9c9'],[380,180,220,'#ffec99'],[640,220,280,'#b2f2bb'],[920,200,240,'#d0bfff']]){ c.fillStyle=coul; c.fillRect(x-w/2,520-h,w,h);
      c.fillStyle='rgba(255,255,255,.7)'; for(let k=0;k<2;k++) c.fillRect(x-w/2+30+k*(w-90),520-h+40,60,60); }
    c.fillStyle='#adb5bd'; c.fillRect(0,520,1056,40); routeE(c,560); }
  function bus(c,T,dx=0){ c.save(); c.translate(dx,0); busE(c,BXc,BYB,BW,'#fcc419');
    margoTete_deux(c,BX0+10+BW*.065,BY0+BH*.3+BH*.36*.62,22);
    PLACES.forEach(([x,y],k)=>{ let la=DEPART.includes(k)&&T>=tHuit0-.2;
      if(MONTENT.includes(k)) la=T>=e1&&T>=tMontent+MONTENT.indexOf(k)*.3+.6;
      if(DESCENDENT.includes(k)&&T>=e2&&T>=tDescendent+DESCENDENT.indexOf(k)*.3) la=false;
      const lu=(T>=de&&T>=tNeuf3&&T<ap)||(T>=e2&&T<de&&T>=tNeuf2)?.6:0;
      if(la){ if(lu){ c.fillStyle=`rgba(255,212,59,${.5*lu})`; c.beginPath(); c.arc(x,y,30,0,7); c.fill(); } tete_deux(c,x,y,22,k); } });
    c.restore(); }
  /* les gens qui montent (étape 1) ou descendent (étape 2) */
  function passants(c,T){
    if(T>=e1&&T<e2) MONTENT.forEach((k,i)=>{ const t=tTrois1+i*.3, u=entreE(T,t-.6,tMontent+i*.3+.6); if(T<t-.6||u>=1) return;
      enfantE(c,-60+(BX0+40+60)*u,700,.95,{k:i+1,T}); });
    if(T>=e2&&T<de) DESCENDENT.forEach((k,i)=>{ const t=tDescendent+i*.3, u=entreE(T,t,t+1.6); if(T<t||u>=1) return;
      enfantE(c,BX0+60-(BX0+160)*u,700,.95,{k:i+3,T}); });
  }
  /* les deux calculs : le « 11 » de la 1re ligne juste au-dessus du « 11 » de la 2e (flèche) */
  function deuxCalculs(c,T,y1,y2,{t1,t2,lab1=-1,lab2=-1,fleche=-1,taille=80}){
    const C1=370, C2=C1+313.6*taille/80;
    if(lab1>=0&&T>=lab1) ecrire(c,'étape 1',C1+340*taille/80,y1,50*taille/80*zoom(T,lab1,.4),CRAIE.jaune);
    if(t1&&T>=t1[0]) formuleE(c,T,C1,y1,['8','+','3','=','11'],t1,taille,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
    if(lab2>=0&&T>=lab2) ecrire(c,'étape 2',C2-340*taille/80,y2,50*taille/80*zoom(T,lab2,.4),CRAIE.jaune);
    if(t2&&T>=t2[0]) formuleE(c,T,C2,y2,['11','−','2','=','9'],t2,taille,[CRAIE.jaune,CRAIE.blanc,CRAIE.faux,CRAIE.blanc,CRAIE.ok]);
    if(fleche>=0&&T>=fleche){ const u=entreE(T,fleche,fleche+.5), x=C1+156.8*taille/80;
      cercle(c,x,y1,taille*.62,CRAIE.jaune,u); cercle(c,x,y2,taille*.62,CRAIE.jaune,u);
      c.strokeStyle=CRAIE.jaune; c.fillStyle=CRAIE.jaune; c.lineWidth=7; const ya=y1+taille*.62+4, yb=y2-taille*.62-6;
      c.beginPath(); c.moveTo(x,ya); c.lineTo(x,ya+(yb-ya)*u); c.stroke();
      if(u>=1){ c.beginPath(); c.moveTo(x,yb+6); c.lineTo(x-14,yb-18); c.lineTo(x+14,yb-18); c.closePath(); c.fill(); } }
  }

  /* question 1 : 5 croissants, 4 pains au chocolat ; on en mange 2 (le dernier croissant et le dernier pain) */
  const CROI=[[85,80],[250,80],[415,80],[165,170],[330,170]], PAINS=[[95,275],[250,275],[95,355],[250,355]];
  function viennoiseries(c,T){
    const mange=T>=r1&&T>=tMoins1, lueF=T>=r1&&T>=tSept1&&T<tB1+.6?.7:0;
    CROI.forEach(([x,y],i)=>{ const t=tCinqQ+i*.08; if(T>=t) croissant_deux(c,x,y,138,{z:T>=r1?1:zoom(T,t,.4),terne:mange&&i===4,lueur:mange&&i===4?0:lueF}); });
    PAINS.forEach(([x,y],i)=>{ const t=tQuatreQ+i*.08; if(T>=t) painChoco_deux(c,x,y,118,{z:T>=r1?1:zoom(T,t,.4),terne:mange&&i===3,lueur:mange&&i===3?0:lueF}); });
    if(mange){ croixE(c,CROI[4][0],CROI[4][1],90,entreE(T,tMoins1,tMoins1+.5)); croixE(c,PAINS[3][0],PAINS[3][1],90,entreE(T,tDeux1,tDeux1+.5)); }
    if(T>=tCinqQ) rondNombreE(c,'5',470,170,36,{z:zoom(T,tCinqQ,.5)});
    if(T>=tQuatreQ) rondNombreE(c,'4',400,315,36,{z:zoom(T,tQuatreQ,.5)});
    if(T>=tMange) ecrire(c,'on en mange 2',250,445,58*zoom(T,tMange,.4),'#ff8787');
    if(T<r1){ if(T>=tCombienQ) ecrire(c,'?',250,600,170*zoom(T,tCombienQ,.5),CRAIE.jaune); }
    else {
      if(T>=tCinq1){ ecrire(c,'1',25,525,46,CRAIE.gris); formuleE(c,T,265,525,['5','+','4','=','9'],[tCinq1,tPlus1r,tQuatre1,tNeuf1,tNeuf1],76,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.jaune]); }
      if(T>=tNeuf1b){ ecrire(c,'2',25,612,46,CRAIE.gris); formuleE(c,T,265,612,['9','−','2','=','7'],[tNeuf1b,tMoins1,tDeux1,tSept1,tSept1],76,[CRAIE.jaune,CRAIE.blanc,'#ff8787',CRAIE.blanc,CRAIE.ok]); }
      if(T>=tB1){ ecrire(c,'B : 9, trop tôt !',250,686,46*zoom(T,tB1,.4),CRAIE.gris); }
    }
  }
  /* question 2 : la trousse, 10 crayons ; j'en prête 3, on m'en rend 1 */
  const TX=15, TYB=400, TW=490, TH=160, CX=[0,1,2,3,4,5,6,7,8,9].map(i=>TX+47+i*44);
  const PRETES=[7,8,9];
  function trousse(c,T){
    trousseFond_deux(c,TX,TYB,TW,TH);
    const lue8=T>=r2&&T>=tHuit2?.7:0;
    CX.forEach((x,i)=>{ const t=tDixQ+i*.06; if(T<t) return; const j=PRETES.indexOf(i);
      let dy=0, al=1;
      if(T>=r2&&j>=0){ const tp=tTrois2+j*.12; if(T>=tp){ const u=entreE(T,tp,tp+.7); dy=-260*u; al=1-u; }
        if(j===0&&T>=tUn2){ const u=entreE(T,tUn2,tUn2+.7); dy=-260*(1-u); al=u; } }
      if(al<=0) return; c.globalAlpha=al; crayonE(c,x,TYB-30+dy,270,COUL_CRAYON[i],32,T>=r2?1:zoom(T,t,.4),j===0||j<0?lue8:0); c.globalAlpha=1; });
    trousseDevant_deux(c,TX,TYB,TW,TH);
    if(T>=tDixQ) rondNombreE(c,'10',250,465,46,{z:zoom(T,tDixQ,.5)});
    if(T>=tTroisQ) rondNombreE(c,'−3',95,465,46,{z:zoom(T,tTroisQ,.5),coul:'#ff8787'});
    if(T>=tUnQ) rondNombreE(c,'+1',405,465,46,{z:zoom(T,tUnQ,.5),coul:CRAIE.ok});
    if(T<r2){ if(T>=tCombien2) ecrire(c,'?',250,610,160*zoom(T,tCombien2,.5),CRAIE.jaune); }
    else {
      if(T>=tDix2){ ecrire(c,'1',25,575,46,CRAIE.gris); formuleE(c,T,265,575,['10','−','3','=','7'],[tDix2,tMoins2r,tTrois2,tSept2,tSept2],72,[CRAIE.blanc,CRAIE.blanc,'#ff8787',CRAIE.blanc,CRAIE.jaune]); }
      if(T>=tSept2b){ ecrire(c,'2',25,672,46,CRAIE.gris); formuleE(c,T,265,672,['7','+','1','=','8'],[tSept2b,tPlus2,tUn2,tHuit2,tHuit2],72,[CRAIE.jaune,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok]); }
    }
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* l'histoire bouge deux fois : deux étapes ; le résultat de la 1re sert à la 2e */
      if(T>=tBougeA) ecrire(c,"l'histoire bouge 2 fois",528,165,68*zoom(T,tBougeA,.4),CRAIE.blanc);
      if(T>=tEtapesA) deuxCalculs(c,T,330,530,{t1:Array(5).fill(tEtapesA),t2:Array(5).fill(tEtapesA+.4),lab1:tEtapesA,lab2:tEtapesA+.4,fleche:tSertA,taille:96});
      tab.maj(); return; }
    if(T>=q2){ trousse(c,T); tab.maj(); return; }
    if(T>=q1){ viennoiseries(c,T); tab.maj(); return; }

    rue(c,T);
    if(T>=e1) arretBusE(c,ARRET_X,560,300);
    /* au début, le bus arrive par la droite ; il s'arrête */
    const dx=T<e1?Math.max(0,700*(1-entreE(T,acc+.3,tHuit0-.4))):0;
    bus(c,T,dx);
    passants(c,T);
    if(T<e1){ if(T>=tHuit0) rondNombreE(c,'8',BXc,95,58,{z:zoom(T,tHuit0,.5)});
      if(T>=tDeux0) ecrire(c,'2 arrêts',830,95,60*zoom(T,tDeux0,.4),'#e8590c');
      if(T>=tCombien0) rondNombreE(c,'?',230,95,58,{z:zoom(T,tCombien0,.5),coul:'#e8590c'}); }
    else { bandeauE(c,528,135,1000,250,1);
      deuxCalculs(c,T,80,190,{t1:[tHuit1,tPlus1,tTrois1b,tOnze1,tOnze1],t2:T>=e2?[tPars,tMoins2,tDeux2b,tNeuf2,tNeuf2]:null,
        lab1:tPremier,lab2:T>=e2?tDeuxieme:-1,fleche:T>=de?tResultat:(T>=e2?tPars:-1)}); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien en reste‑t‑il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de crayons dans ma trousse ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['7',tqa('A'),tqa('sept')],['9',tqa('B'),tqa('neuf')],['11',tqa('C'),tqa('onze')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('5 + 4 = 9',[tCinq1,tPlus1r,tQuatre1,tNeuf1,tNeuf1]),phraseE('9 − 2 = 7',[tNeuf1b,tMoins1,tDeux1,tSept1,tSept1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['7',tqb('A'),tqb('sept')],['8',tqb('B'),tqb('huit')],['14',tqb('C'),tqb('quatorze')]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],reponse:[phraseE('10 − 3 = 7',[tDix2,tMoins2r,tTrois2,tSept2,tSept2]),phraseE('7 + 1 = 8',[tSept2b,tPlus2,tUn2,tHuit2,tHuit2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('03-deux')-.5,'Deux<br>étapes');
  return { clips,FIN,titre:"Le bus qui s'arrête",ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,e1,e2,de,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tNeuf3&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
