/* ============================================================
   Série Ti Margo, division CE1 — PAYSAGE 08 : « Les croissants du boulanger » (micro ce1_division_groupement), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-ce1-groupement-paysage.json.
   24 croissants sortent du four, rangés par boîtes de 6 : « 6, 12, 18, 24 » → 4 boîtes ; je connais la taille d'un paquet, je cherche
   le nombre de paquets ; 4 × 6 = 24. Questions : 30 élèves en équipes de 5 → B (6) ; 40 œufs par boîtes de 10 → A (4).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['groupement']=function(outils){
  const DUR={'00-accroche':10.77,'01-paquets':6.275,'02-boites':3.025,'03-difference':11.335,'04-question':14.97,'04b-reponse':8.665,
    '05-question':15.12,'05b-reponse':7.385,'06-appris':9.02,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-paquets':.8,'02-boites':1,'03-difference':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pq,bo,di,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tLe=m0('Le'), tVQ=m0('vingt-quatre'), tCrois=m0('croissants'), tFour=m0('four'), tBoites0=m0('boîtes'), tSix0=m0('six'), tComb=m0('Combien');
  const mp=(w,n=1)=>mot('01-paquets',w,n), tPaq=mp('paquets'), tP=[mp('six',2),mp('douze'),mp('dix-huit'),mp('vingt-quatre')];
  const mb=w=>mot('02-boites',w), tCompte=mb('compte'), tQuatreB=mb('quatre'), tBoitesB=mb('boîtes');
  const md=(w,n=1)=>mot('03-difference',w,n), tTaille=md('taille'), tSixD=md('six'), tNombre=md('nombre'), tPaqD=md('paquets'), tVerif=md('vérifie'),
    tD4=md('quatre'), tDfois=md('fois'), tD6=md('six',2), tD24=md('vingt-quatre');
  const mq1=w=>mot('04-question',w), tTrenteQ=mq1('Trente'), tElevesQ=mq1('élèves'), tEquipesQ=mq1('équipes'), tDeQ=mq1('de'), tCinqQ=mq1('cinq'), tComb1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tC1=[mr1('Cinq'),mr1('dix'),mr1('quinze'),mr1('vingt'),mr1('vingt-cinq'),mr1('trente')],
    tSixE=mr1('Six'), tEquipesR=mr1('équipes'), tDeR=mr1('de'), tCinqR=mr1('cinq',2);
  const mq2=w=>mot('05-question',w), tQuaranteQ=mq2('Quarante'), tOeufsQ=mq2('œufs'), tBoitesQ=mq2('boîtes'), tDixQ=mq2('dix'), tComb2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tC2=[mr2('Dix'),mr2('vingt'),mr2('trente'),mr2('quarante')], tQuatreR2=mr2('Quatre'), tBoitesR2=mr2('boîtes'), tDeR2=mr2('de'), tDixR2=mr2('dix',2);
  const ma=w=>mot('06-appris',w), tTailleA=ma('taille'), tFaisA=ma('fais'), tCompteA=ma('compte'), tVerA=ma('vérifie'), tMultA=ma('multiplication');
  const finTitre=tLe-.08;

  /* la boulangerie : 24 croissants sur la plaque (4 rangs de 6) ; 4 boîtes de 6 places en bas ; le croissant k va dans la boîte k/6 */
  const PL=k=>[255+(k%6)*108,165+Math.floor(k/6)*72], BX=[170,400,630,860], BY=690, BW=200, BH=115;
  const DANS=k=>{ const b=Math.floor(k/6), i=k%6; return [BX[b]+((i%3)-1)*58,BY-BH+30+Math.floor(i/3)*42]; };
  const quand=k=>tP[Math.floor(k/6)]-.75+(k%6)*.08;
  function boulangerie(c,T){ c.fillStyle='#5c3d2e'; c.fillRect(0,0,1056,720); c.fillStyle='rgba(255,169,77,.12)'; c.fillRect(0,0,1056,720);
    c.fillStyle='#8a5a2b'; c.fillRect(0,600,1056,120); c.fillStyle='#a0703f'; c.fillRect(0,592,1056,14); }
  function four(c,T,ouvre){ c.fillStyle='#868e96'; c.strokeStyle='#495057'; c.lineWidth=6; c.beginPath(); c.roundRect(905,120,140,260,16); c.fill(); c.stroke();
    c.fillStyle=ouvre?'#ff922b':'#343a40'; c.beginPath(); c.roundRect(925,175,100,120,40); c.fill();
    if(ouvre){ c.fillStyle=`rgba(255,212,59,${.35+.15*Math.sin(T*5)})`; c.beginPath(); c.arc(975,235,70,0,7); c.fill(); } }
  function plaque(c){ plaqueE(c,525,272,690,320); }
  function boites(c,T,{ferme=0,nums=null,lueur=0}={}){ BX.forEach((x,b)=>boiteE(c,x,BY,BW,BH,{ferme:typeof ferme==='function'?ferme(b):ferme,num:nums?nums(b):'',lueur})); }
  function croissants(c,T,n=24,{bouge=true,lu=0}={}){ for(let k=0;k<n;k++){ if(T<tVQ) break; let p=PL(k), L=92;
      if(bouge&&T>=pq){ const u=entreE(T,quand(k),quand(k)+.45); p=sautE(PL(k),DANS(k),u,110); L=92-34*u; }
      else if(!bouge){ p=DANS(k); L=58; }
      croissantE(c,p[0],p[1],L,{z:zoom(T,tVQ+k*.03,.4),lueur:lu}); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : 4 boîtes de 6, « 6, 12, 18, 24 », 4 × 6 = 24 */
      boulangerie(c,T); boites(c,T,{lueur:T>=tFaisA&&T<tVerA?.5+.5*Math.sin(T*4):0}); croissants(c,T,24,{bouge:false});
      BX.forEach((x,b)=>etiquette(c,String(6*(b+1)),x,BY-BH-60,T,ap+.3+b*.2,b===3?CRAIE.ok:CRAIE.jaune,50));
      if(T>=tTailleA) ecrire(c,'un paquet : 6',528,150,80*zoom(T,tTailleA,.4),'#74c0fc');
      if(T>=tVerA) formuleE(c,T,528,330,['4','×','6','=','24'],[tVerA,tVerA,tVerA,tMultA,tMultA],96,[CRAIE.ok,CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.jaune]);
      tab.maj(); return; }

    if(T>=q2){ /* 40 œufs, des boîtes de 10 (x < 480) */
      c.fillStyle='#d3f9d8'; c.fillRect(0,0,1056,720); herbeE(c,600);
      const BO=[[215,95],[215,210],[215,325],[215,440]], CEL=BO.map(([x,y])=>boiteOeufsE(c,x,y,5,2,44,{z:0}));
      if(T<r2){ if(T>=tBoitesQ){ boiteOeufsE(c,215,200,5,2,44,{z:zoom(T,tBoitesQ,.4)}); etiquette(c,'10',395,200,T,tDixQ,'#74c0fc',50); } }
      else BO.forEach(([x,y],b)=>{ if(T>=tC2[b]-.9) boiteOeufsE(c,x,y,5,2,44,{z:zoom(T,tC2[b]-.9,.4)}); });
      for(let k=0;k<40;k++){ if(T<tQuaranteQ) break; let p=[55+(k%8)*52,470+Math.floor(k/8)*50];
        if(T>=r2){ const b=Math.floor(k/10), t0=tC2[b]-.6+(k%10)*.05, u=entreE(T,t0,t0+.4); p=sautE(p,CEL[b][k%10],u,60); }
        oeufE(c,p[0],p[1],15,{z:zoom(T,tQuaranteQ+k*.02,.4)}); }
      if(T<r2){ if(T>=tQuaranteQ) etiquette(c,'40',450,355,T,tQuaranteQ,CRAIE.jaune,50);
        if(T>=tComb2) ecrire(c,'?',215,330,120*zoom(T,tComb2,.5),CRAIE.jaune); }
      else { BO.forEach(([x,y],b)=>{ if(T>=tC2[b]) etiquette(c,String(10*(b+1)),400,y,T,tC2[b],b===3?CRAIE.ok:CRAIE.jaune,44); });
        if(T>=tQuatreR2) formuleE(c,T,240,610,['4','×','10','=','40'],[tQuatreR2,tQuatreR2,tDixR2,tDixR2,tDixR2],76,[CRAIE.ok,CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.jaune]); }
      tab.maj(); return; }

    if(T>=q1){ /* 30 élèves au gymnase, des équipes de 5 (x < 480) */
      c.fillStyle='#e7f5ff'; c.fillRect(0,0,1056,720); c.fillStyle='#e9b872'; c.fillRect(0,560,1056,160);
      c.strokeStyle='#d9480f'; c.lineWidth=4; c.beginPath(); c.moveTo(0,640); c.lineTo(1056,640); c.stroke();
      const EQ=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#cc5de8','#ff922b'];
      const VR=k=>[50+(k%6)*76+((k*37)%23)-11, 290+Math.floor(k/6)*80+((k*53)%19)-9];
      const COL=k=>{ const e=Math.floor(k/5), i=k%5; return [42+e*78, 235+i*82]; };
      for(let k=0;k<30;k++){ if(T<tTrenteQ) break; let p=VR(k), coul='#ced4da';
        if(T>=r1){ const e=Math.floor(k/5), t0=tC1[e]-.55+(k%5)*.05, u=entreE(T,t0,t0+.4); p=sautE(VR(k),COL(k),u,50); if(u>0) coul=EQ[e]; }
        eleveE(c,p[0],p[1]+40,.7,coul,{k,z:zoom(T,tTrenteQ+k*.02,.4)}); }
      if(T<r1){ if(T>=tTrenteQ) etiquette(c,'30',450,70,T,tTrenteQ,CRAIE.jaune,50);
        if(T>=tCinqQ) ecrire(c,'équipes de 5',210,70,58*zoom(T,tCinqQ,.4),'#74c0fc');
        if(T>=tComb1) ecrire(c,'?',240,175,90*zoom(T,tComb1,.5),CRAIE.jaune); }
      else { for(let e=0;e<6;e++) if(T>=tC1[e]) etiquette(c,String(5*(e+1)),42+e*78,120,T,tC1[e],e===5?CRAIE.ok:CRAIE.jaune,38);
        if(T>=tSixE) formuleE(c,T,240,50,['6','×','5','=','30'],[tSixE,tSixE,tCinqR,tCinqR,tCinqR],62,[CRAIE.ok,CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.jaune]); }
      tab.maj(); return; }

    /* la boulangerie : les croissants, les paquets de 6, les 4 boîtes, la taille d'un paquet */
    boulangerie(c,T); if(T<di){ four(c,T,T<pq); plaque(c); }
    const ferme=T>=bo?b=>entreE(T,tCompte+b*.25,tCompte+b*.25+.3):0;
    boites(c,T,{ferme,nums:T>=bo?b=>String(b+1):null,lueur:T>=tTaille&&T<tNombre?.5+.5*Math.sin(T*4):0});
    if(T<bo||T<tCompte+1.3) croissants(c,T);
    if(T<pq){ if(T>=tVQ) etiquette(c,'24',75,165,T,tVQ,CRAIE.jaune,56);
      if(T>=tSix0) ecrire(c,'6 par boîte',528,480,72*zoom(T,tSix0,.4),'#74c0fc');
      if(T>=tComb) ecrire(c,'?',840,480,120*zoom(T,tComb,.5),CRAIE.jaune); }
    else if(T<bo){ BX.forEach((x,b)=>{ if(T>=tP[b]) etiquette(c,String(6*(b+1)),x,BY-BH-60,T,tP[b],b===3?CRAIE.ok:CRAIE.jaune,50); }); }
    else if(T<di){ if(T>=tQuatreB) ecrire(c,'4 boîtes',528,300,120*zoom(T,tQuatreB,.4),CRAIE.ok); }
    else {
      BX.forEach((x,b)=>{ if(T>=tSixD) etiquette(c,'6',x+BW/2-10,BY-BH-40,T,tSixD+b*.1,'#74c0fc',44); });
      if(T>=tTaille) ecrire(c,'un paquet : 6',528,110,76*zoom(T,tTaille,.4),'#74c0fc');
      if(T>=tNombre) ecrire(c,'combien de paquets ? 4',528,225,66*zoom(T,tNombre,.4),CRAIE.jaune);
      if(T>=tD4) formuleE(c,T,528,370,['4','×','6','=','24'],[tD4,tDfois,tD6,tD24,tD24],100,[CRAIE.ok,CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.jaune]);
      if(T>=tD24) for(const [x,y] of [[200,370],[860,370]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Trente élèves font des équipes de cinq.'); const phrase1=[qa("Combien d'équipes ?")]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb('Quarante œufs, rangés par boîtes de dix.'); const phrase2=[qb('Combien de boîtes ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:[phraseE('30 élèves, équipes de 5.',[tTrenteQ,tElevesQ,tEquipesQ,tDeQ,tCinqQ]),...phrase1],pause:pause1,
      choix:[['25',tqa('A'),tqa('vingt-cinq')],['6',tqa('B'),tqa('six')],['35',tqa('C'),tqa('trente-cinq')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],reponse:[phraseE('6 équipes de 5',[tSixE,tEquipesR,tDeR,tCinqR]),phraseE('6 × 5 = 30',[tSixE,tSixE,tCinqR,tCinqR,tCinqR])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:[phraseE('40 œufs, boîtes de 10.',[tQuaranteQ,tOeufsQ,tBoitesQ,tBoitesQ,tDixQ]),...phrase2],pause:pause2,
      choix:[['4',tqb('A'),tqb('quatre')],['10',tqb('B'),tqb('dix',2)],['50',tqb('C'),tqb('cinquante')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('4 boîtes de 10',[tQuatreR2,tBoitesR2,tDeR2,tDixR2]),phraseE('4 × 10 = 40',[tQuatreR2,tQuatreR2,tDixR2,tDixR2,tDixR2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-boites')-.3,'Combien<br>de paquets ?');
  return { clips,FIN,titre:'Combien de paquets ?',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pq,bo,di,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tQuatreB&&T<di)||(T>=tD24&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
