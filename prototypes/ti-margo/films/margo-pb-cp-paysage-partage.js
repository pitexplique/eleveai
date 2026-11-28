/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 05 : « Le pique-nique dans la forêt » (micro cp_probleme_partage), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-partage-paysage.json.
   9 mandarines pour 3 amis, autant chacun : je donne une par une, tour après tour ; 3 chacun ; 3 + 3 + 3 = 9 (le partage est juste).
   Questions : 8 glands pour 2 écureuils → A (4) ; 12 champignons, 4 par sac → A (3 sacs).
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */

/* Une mandarine (centre x, y ; rayon r) */
function mandarineE_partage(c,x,y,r,{z=1,lueur=0}={}){ if(z<=0) return; r*=Math.min(1.15,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(x,y,r*1.6,0,7); c.fill(); }
  c.fillStyle='#fd7e14'; c.strokeStyle='#c2410c'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,r,r*.9,0,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(x-r*.38,y-r*.3,r*.2,r*.14,-.5,0,7); c.fill();
  c.fillStyle='#2f9e44'; c.beginPath(); c.ellipse(x+r*.3,y-r*.95,r*.42,r*.18,-.5,0,7); c.fill();
  c.fillStyle='#5c3d1e'; c.beginPath(); c.arc(x,y-r*.85,r*.1,0,7); c.fill(); }
/* Un gland (centre x, y ; rayon r) */
function glandE_partage(c,x,y,r,{z=1,lueur=0}={}){ if(z<=0) return; r*=Math.min(1.15,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(x,y,r*1.7,0,7); c.fill(); }
  c.fillStyle='#c9862f'; c.strokeStyle='#7a4a12'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y+r*.25,r*.72,r*.9,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#7a5230'; c.beginPath(); c.ellipse(x,y-r*.42,r*.92,r*.45,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='rgba(0,0,0,.3)'; c.lineWidth=2; for(const u of [-.45,0,.45]){ c.beginPath(); c.moveTo(x+u*r,y-r*.8); c.lineTo(x+u*r,y-r*.05); c.stroke(); }
  c.strokeStyle='#5c3d1e'; c.lineWidth=4; c.beginPath(); c.moveTo(x,y-r*.85); c.lineTo(x+r*.15,y-r*1.15); c.stroke(); }
/* Un champignon (centre du chapeau x, y ; rayon r) */
function champignonE_partage(c,x,y,r,{z=1,lueur=0}={}){ if(z<=0) return; r*=Math.min(1.15,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(x,y+r*.3,r*1.5,0,7); c.fill(); }
  c.fillStyle='#fff4e6'; c.strokeStyle='#c9a27c'; c.lineWidth=3; c.beginPath(); c.roundRect(x-r*.32,y-r*.1,r*.64,r*1.05,r*.2); c.fill(); c.stroke();
  c.fillStyle='#e8590c'; c.strokeStyle='#a33a06'; c.beginPath(); c.moveTo(x-r,y+r*.05); c.quadraticCurveTo(x-r,y-r*.95,x,y-r*.95); c.quadraticCurveTo(x+r,y-r*.95,x+r,y+r*.05); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#fff'; for(const [u,v,s] of [[-.5,-.35,.16],[.1,-.6,.13],[.5,-.25,.15],[-.05,-.15,.1]]){ c.beginPath(); c.arc(x+u*r,y+v*r,r*s,0,7); c.fill(); } }
/* La nappe à carreaux (x0, y0, w, h) */
function nappeE_partage(c,x0,y0,w,h){ c.fillStyle='#fff'; c.fillRect(x0,y0,w,h); c.fillStyle='rgba(224,49,49,.75)';
  const p=44; for(let i=0;i*p<w;i++) for(let j=0;j*p<h;j++) if((i+j)%2===0) c.fillRect(x0+i*p,y0+j*p,Math.min(p,w-i*p),Math.min(p,h-j*p));
  c.fillStyle='rgba(224,49,49,.35)'; for(let i=0;i*p<w;i+=2) c.fillRect(x0+i*p,y0,p,h); }
/* La clairière : de grands arbres derrière, l'herbe */
function clairiereE_partage(c,T,yHerbe=380){ c.fillStyle='#1b3a2a'; c.fillRect(0,0,1056,720);
  for(let k=0;k<7;k++){ const x=60+k*160+(k%2)*40; c.save(); c.globalAlpha=.35; sapinE(c,x,yHerbe+10,2.2+.4*(k%3)); c.restore(); }
  c.fillStyle='#2b8a3e'; c.fillRect(0,yHerbe,1056,720-yHerbe); c.strokeStyle='#51cf66'; c.lineWidth=3;
  for(let x=10;x<1056;x+=34){ c.beginPath(); c.moveTo(x,yHerbe+12); c.lineTo(x+6,yHerbe-4); c.stroke(); } }

FILMS['partage']=function(outils){
  const DUR={'00-accroche':11.495,'01-distribue':8.4,'02-chacun':4.46,'03-verif':8.825,'04-question':15.88,'04b-reponse':7.29,
    '05-question':15.87,'05b-reponse':6.935,'06-appris':8.05,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-distribue':1,'02-chacun':1,'03-verif':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,di,ch,ve,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tPique=m0('Pique-nique'), tTrois0=m0('trois'), tAmis=m0('amis'), tPanier0=m0('panier'), tNeuf0=m0('neuf'), tPartage0=m0('partage'), tAutant0=m0('autant');
  const md=(w,n=1)=>mot('01-distribue',w,n), tDonne=md('donne'), tU1=md('une',3), tU2=md('une',4), tU3=md('une',5), tEncore=md('Encore'), tEncore2=md('encore',2);
  const mch=(w,n=1)=>mot('02-chacun',w,n), tVide=mch('vide'), tChacun=mch('Chacun'), tTroisCh=mch('trois');
  const mv=(w,n=1)=>mot('03-verif',w,n), tV1=mv('trois'), tVp1=mv('plus'), tV2=mv('trois',2), tVp2=mv('plus',2), tV3=mv('trois',3), tV9=mv('neuf'), tRetrouve=mv('retrouve'), tJuste=mv('juste');
  const mq1=(w,n=1)=>mot('04-question',w,n), tHuitQ=mq1('Huit'), tGlandsQ=mq1('glands'), tDeuxQ=mq1('deux'), tEcureuilsQ=mq1('écureuils'), tAutantQ=mq1('autant'), tCombien1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tLun=mr1("l'un"), tLautre=mr1("l'autre"), tQ4a=mr1('quatre',3), tPlus1=mr1('plus'), tQ4b=mr1('quatre',4), tHuit1=mr1('huit');
  const mq2=(w,n=1)=>mot('05-question',w,n), tDouzeQ=mq2('Douze'), tChampQ=mq2('champignons'), tQuatreQ=mq2('quatre'), tSacQ=mq2('sac'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tS4=mr2('Quatre'), tS8=mr2('huit'), tS12=mr2('douze'), tTrois2=mr2('Trois'), tSacs2=mr2('sacs'), tQuatre2=mr2('quatre',2);
  const mA=(w,n=1)=>mot('06-appris',w,n), tDonneA=mA('donne'), tDernier=mA('dernier'), tVerifieA=mA('vérifie'), tParts=mA('parts'), tTout=mA('tout');
  const finTitre=tPique-.08;

  /* les 3 places (ami, amie, moi) et le panier de 9 mandarines */
  const PL=[150,410,670], PK=[1,3], PANX=915, PANY=700, NAPPE=[20,500,790,210];
  const PAN=[[-90,550],[-30,550],[30,550],[90,550],[-60,500],[0,500],[60,500],[-30,452],[30,452]].map(([dx,y])=>[PANX+dx,y]);
  /* la mandarine n° i (0 → 8) va à la place i % 3, au tour i / 3 ; quand */
  const TDON=[tU1,tU2,tU3,tEncore+.2,tEncore+.55,tEncore+.9,tEncore2+.15,tEncore2+.5,tEncore2+.85];
  const dest=i=>[PL[i%3]-78+Math.floor(i/3)*78,575];
  function amis(c,T){ PK.forEach((k,j)=>enfantE(c,PL[j],650,1.9,{k,T,bras:0}));
    /* ma place : un coussin vert, « moi » écrit dessus */
    c.fillStyle='#69db7c'; c.strokeStyle='#2b8a3e'; c.lineWidth=6; c.beginPath(); c.ellipse(PL[2],478,110,40,0,0,7); c.fill(); c.stroke();
    ecrire(c,'moi',PL[2],400,64,CRAIE.jaune); }
  function scenePique(c,T,{nPanier=9,places=null,lues=null}={}){
    clairiereE_partage(c,T); amis(c,T);
    nappeE_partage(c,...NAPPE);
    for(let j=0;j<nPanier;j++) mandarineE_partage(c,PAN[j][0],PAN[j][1],34);
    panierE(c,PANX,PANY,270);
    if(places) places(c); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* je donne un par un ; les parts réunies redonnent le tout */
      if(T>=tDonneA) ecrire(c,'je donne un par un',528,130,76*zoom(T,tDonneA,.4),CRAIE.jaune);
      [198,528,858].forEach(x=>{ for(let k=0;k<3;k++) mandarineE_partage(c,x-92+k*92,300,42); rondNombreE(c,'3',x,405,44); });
      if(T>=tParts) formuleE(c,T,528,545,['3','+','3','+','3','=','9'],Array(7).fill(tParts),104,[...Array(6).fill(CRAIE.blanc),CRAIE.ok]);
      if(T>=tTout) ecrire(c,'tout le panier',528,655,64*zoom(T,tTout,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=q2){ /* 12 champignons, 4 dans chaque sac */
      herbeE(c,640);
      const rep=T>=r2, GR=[tS4,tS8,tS12], SX=[85,240,395];
      for(let i=0;i<12;i++){ const x=75+(i%4)*110, y=165+Math.floor(i/4)*95, g=Math.floor(i/4);
        if(!rep){ if(T>=tDouzeQ) champignonE_partage(c,x,y,40,{z:zoom(T,tDouzeQ+i*.05,.4)}); continue; }
        const t=GR[g]-.35+(i%4)*.08; if(T<t){ champignonE_partage(c,x,y,40); continue; }
        const d=[SX[g]-42+(i%4)*28,545-(i%2)*24], p=sautE([x,y],d,entreE(T,t,t+.35),90); champignonE_partage(c,p[0],p[1],28); }
      if(!rep){
        if(T>=tDouzeQ) ecrire(c,'12 champignons',240,62,56*zoom(T,tDouzeQ,.4),CRAIE.jaune);
        if(T>=tQuatreQ){ sacE(c,120,705,170,'#c08550',zoom(T,tQuatreQ,.4)); rondNombreE(c,'4',120,620,44,{z:zoom(T,tQuatreQ,.5)});
          ecrire(c,'4 par sac',330,500,56*zoom(T,tQuatreQ,.4),CRAIE.blanc); }
        if(T>=tCombien2) rondNombreE(c,'?',330,610,46,{z:zoom(T,tCombien2,.5),coul:'#ff922b'}); }
      else {
        SX.forEach((x,g)=>{ if(T>=GR[g]-.4) sacE(c,x,705,135,['#c08550','#a9713a','#d9a066'][g],zoom(T,GR[g]-.4,.4)); });
        GR.forEach((t,g)=>{ if(T>=t) rondNombreE(c,['4','8','12'][g],SX[g],455,40,{z:zoom(T,t,.5),coul:g===2?CRAIE.ok:CRAIE.jaune}); });
        if(T>=tS12) formuleE(c,T,240,62,['4','+','4','+','4','=','12'],Array(7).fill(tS12),60,[...Array(6).fill(CRAIE.blanc),CRAIE.ok]);
        if(T>=tTrois2) ecrire(c,'3 sacs',240,360,76*zoom(T,tTrois2,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T>=q1){ /* 8 glands pour 2 écureuils, autant chacun */
      clairiereE_partage(c,T,600);
      c.strokeStyle='#5c3d0a'; c.lineCap='round'; c.lineWidth=30; c.beginPath(); c.moveTo(-10,665); c.quadraticCurveTo(240,650,480,665); c.stroke(); c.lineCap='butt';
      const rep=T>=r1, EX=[120,360];
      if(T>=tEcureuilsQ||rep) EX.forEach((x,j)=>ecureuilE(c,x,655,1.3,j?'#e8590c':'#868e96',j?-1:1,T));
      for(let i=0;i<8;i++){ const x=75+(i%4)*110, y=165+Math.floor(i/4)*100;
        if(!rep){ if(T>=tHuitQ) glandE_partage(c,x,y,40,{z:zoom(T,tHuitQ+i*.05,.4),lueur:T>=tAutantQ&&T<tCombien1?.5:0}); continue; }
        const t=r1+.9+i*.16; if(T<t){ glandE_partage(c,x,y,40); continue; }
        const j=i%2, n=Math.floor(i/2), d=[EX[j]-50+(n%2)*100,165+Math.floor(n/2)*100], p=sautE([x,y],d,entreE(T,t,t+.4),60);
        glandE_partage(c,p[0],p[1],40,{lueur:(j===0&&T>=tLun&&T<tLun+1)||(j===1&&T>=tLautre&&T<tLautre+1)?.8:0}); }
      if(!rep){
        if(T>=tHuitQ) ecrire(c,'8 glands',240,62,66*zoom(T,tHuitQ,.4),CRAIE.jaune);
        if(T>=tDeuxQ) ecrire(c,'2 écureuils',205,350,56*zoom(T,tDeuxQ,.4),CRAIE.blanc);
        if(T>=tCombien1) rondNombreE(c,'?',425,350,38,{z:zoom(T,tCombien1,.5),coul:'#ff922b'}); }
      else {
        c.strokeStyle='rgba(255,255,255,.5)'; c.lineWidth=4; c.setLineDash([12,10]); c.beginPath(); c.moveTo(240,120); c.lineTo(240,320); c.stroke(); c.setLineDash([]);
        if(T>=tLun) rondNombreE(c,'4',EX[0],350,42,{z:zoom(T,tLun,.5)});
        if(T>=tLautre) rondNombreE(c,'4',EX[1],350,42,{z:zoom(T,tLautre,.5)});
        if(T>=tQ4a) formuleE(c,T,240,62,['4','+','4','=','8'],[tQ4a,tPlus1,tQ4b,tHuit1,tHuit1],70,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
      tab.maj(); return; }

    if(T>=ve){ /* 3 + 3 + 3 = 9 : je retrouve tout le panier */
      scenePique(c,T,{nPanier:T>=tRetrouve?9:0,places:c=>{ for(let i=0;i<9;i++){ const d=dest(i); if(T<tRetrouve) mandarineE_partage(c,d[0],d[1],36,{lueur:T>=[tV1,tV2,tV3][i%3]&&T<tV9?.6:0}); } }});
      PL.forEach(x=>rondNombreE(c,'3',x,660,40));
      formuleE(c,T,528,80,['3','+','3','+','3','=','9'],[tV1,tVp1,tV2,tVp2,tV3,tV9,tV9],92,[...Array(6).fill(CRAIE.blanc),CRAIE.ok]);
      if(T>=tRetrouve) rondNombreE(c,'9',PANX,370,48,{z:zoom(T,tRetrouve,.5),coul:CRAIE.ok});
      if(T>=tJuste) ecrire(c,'le partage est juste !',528,175,56*zoom(T,tJuste,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=ch){ /* le panier est vide ; chacun a 3 */
      scenePique(c,T,{nPanier:0,places:c=>{ for(let i=0;i<9;i++){ const d=dest(i); mandarineE_partage(c,d[0],d[1],36,{lueur:T>=tChacun&&T<tChacun+1.5?.5:0}); } }});
      if(T>=tVide) ecrire(c,'vide !',PANX,300,64*zoom(T,tVide,.4),CRAIE.faux);
      PL.forEach((x,j)=>{ if(T>=tTroisCh) rondNombreE(c,'3',x,660,44,{z:zoom(T,tTroisCh+j*.1,.5)}); });
      if(T>=tChacun) ecrire(c,'3 chacun',528,90,84*zoom(T,tChacun,.4),CRAIE.jaune);
      tab.maj(); return; }

    if(T>=di){ /* je les donne une par une, tour après tour */
      const partis=TDON.filter(t=>T>=t-.25).length;
      scenePique(c,T,{nPanier:9-partis,places:c=>{ for(let i=0;i<partis;i++){ const t=TDON[i]-.25, p=sautE(PAN[8-i],dest(i),entreE(T,t,t+.45),140);
        mandarineE_partage(c,p[0],p[1],36,{lueur:T<t+1?.6:0}); } }});
      if(T>=tDonne) ecrire(c,'une par une',400,90,80*zoom(T,tDonne,.4),CRAIE.jaune);
      if(T>=tEncore) ecrire(c,T>=tEncore2?'3e tour':'2e tour',PANX,300,64,CRAIE.blanc);
      else if(T>=tU1) ecrire(c,'1er tour',PANX,300,64,CRAIE.blanc);
      tab.maj(); return; }

    /* l'accroche : la clairière, 3 amis, 9 mandarines dans le panier */
    scenePique(c,T,{nPanier:T>=tPanier0?9:0});
    if(T>=tTrois0) ecrire(c,'3 amis',200,90,84*zoom(T,tTrois0,.4),CRAIE.jaune);
    if(T>=tNeuf0) rondNombreE(c,'9',PANX,370,52,{z:zoom(T,tNeuf0,.5)});
    if(T>=tNeuf0) ecrire(c,'mandarines',PANX,280,52,CRAIE.blanc);
    if(T>=tAutant0) ecrire(c,'autant chacun',640,90,66*zoom(T,tAutant0,.4),CRAIE.ok);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien de glands pour chaque écureuil ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de sacs ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:[phraseE('8 glands pour 2 écureuils.',[tHuitQ,tGlandsQ,mq1('pour'),tDeuxQ,tEcureuilsQ]),...phrase1],pause:pause1,
      choix:[['4',tqa('A'),tqa('quatre')],['6',tqa('B'),tqa('six')],['10',tqa('C'),tqa('dix')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('4 + 4 = 8',[tQ4a,tPlus1,tQ4b,tHuit1,tHuit1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:[phraseE('12 champignons, 4 dans chaque sac.',[tDouzeQ,tChampQ,tQuatreQ,mq2('dans'),mq2('chaque'),tSacQ]),...phrase2],pause:pause2,
      choix:[['3',tqb('A'),tqb('trois')],['8',tqb('B'),tqb('huit')],['16',tqb('C'),tqb('seize')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],reponse:[phraseE('3 sacs de 4 champignons',[tTrois2,tSacs2,mr2('de'),tQuatre2,mr2('champignons')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-chacun')-.3,'Partager<br>autant chacun');
  return { clips,FIN,titre:'Le pique-nique dans la forêt',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,di,ch,ve,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tJuste&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
