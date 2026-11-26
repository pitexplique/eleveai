/* ============================================================
   Série Nombres entiers CP — PAYSAGE 05 : « Les bouquets de la fleuriste » (micro cp_entier_dizaine_unite), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js. Voix : manim/voix/cp-entier-dizaine-paysage.json.
   Au marché, 34 tulipes : des bouquets de 10 (dizaines), 4 fleurs seules (unités) → 34. Questions en plein milieu :
   2 paquets de 10 crayons et 5 seuls → C (25) ; dans 46, que compte le 4 ? → B (les bouquets de dix).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 520) ; la carte est à droite.
   ============================================================ */
FILMS['dizaine']=function(outils){
  const DUR={'00-accroche':9.26,'01-paquet':12.41,'02-encore':8.63,'03-nombre':11.08,'04-question':14.92,'04b-reponse':11.72,
    '05-question':14.31,'05b-reponse':9.36,'06-appris':8.29,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-paquet':.5,'02-encore':1,'03-nombre':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pa,en,no,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:56px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w), tCe=m0('Ce'), tMarche=m0('marché'), tTul=m0('tulipes'), tTrop=m0('Trop');
  const mp=(w,n=1)=>mot('01-paquet',w,n);
  const tCompte=[mp('un',2)].concat(['deux','trois','quatre','cinq','six','sept','huit','neuf'].map(w=>mp(w))).concat([mp('dix',2)]), tRuban=mp('ruban'), tDiz=mp('dizaine');
  const me=(w,n=1)=>mot('02-encore',w,n), tB2=me('bouquet'), tB3=me('un',2), tTrois=me('Trois'), tReste=me('reste'), tQuatre=me('quatre'), tUnites=me('unités');
  const mn=(w,n=1)=>mot('03-nombre',w,n), t34=mn('trente-quatre'), tTroisG=mn('trois',2), tGauche=mn('gauche'), tQuatreD=mn('quatre',2), tDroite=mn('droite');
  const ma=(w,n=1)=>mot('06-appris',w,n), tGaucheA=ma('gauche'), tDroiteA=ma('droite'), tPaqA=ma('paquets');
  const finTitre=tCe-.08;

  /* le seau : 34 tulipes au départ ; on en prend 10 par bouquet */
  const SEAU=Array.from({length:34},(_,i)=>{ const col=i%7, row=Math.floor(i/7); return [722+col*36+(row%2)*14+((i*37)%11-5),340+row*42+((i*53)%13-6)]; });
  function seau(c,T,n,lueurDer=0){ for(let i=0;i<n;i++){ const [x,y]=SEAU[i]; tulipeE(c,830+(x-830)*.25,560,x,y,COUL_TULIPE[i%5],1,i<4?lueurDer:0); } seauE(c,830,690,220); }
  const XB=i=>140+i*200, YB=650;
  /* combien de fleurs dans le bouquet i à l'instant T */
  function nBouquet(i,T){ if(i===0){ let n=0; for(const t of tCompte) if(T>=t) n++; return n; }
    const t0=i===1?tB2:tB3; return T<t0?0:Math.min(10,Math.floor((T-t0)/.08)+1); }
  /* 34 : 3 bouquets à gauche, 4 fleurs seules à droite */
  function trenteQuatre(c,T,tG,tD,tN){ const pg=T>=tG&&T<tD+.2?1+.12*Math.sin(T*6):1, pd=T>=tD?1+.12*Math.sin(T*6):1;
    nombreDUE(c,'34',528,160,230*(tN!==undefined?zoom(T,tN,.4):1),[CRAIE.r1,CRAIE.r0],[pg,pd]);
    for(let i=0;i<3;i++) bouquetE(c,120+i*165,680,10,1,1,T>=tG&&T<tD?.5+.5*Math.sin(T*5):0,i);
    for(let k=0;k<4;k++) tulipeE(c,640+k*90,680,640+k*90,500,COUL_TULIPE[k],1.2,T>=tD?.5+.5*Math.sin(T*5+k):0); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ trenteQuatre(c,T,tGaucheA,tDroiteA); tab.maj(); return; }
    if(T>=q2){ /* 46 : que compte le 4 ? */
      const s=nombreDUE(c,'46',260,250,280*(T>=r2?1:zoom(T,mot('05-question','quarante-six'),.4)),T>=r2?[CRAIE.r1,CRAIE.r0]:[CRAIE.blanc,CRAIE.blanc]);
      const tQ4=mot('05-question','quatre'); if(T>=tQ4) cercle(c,s[0],255,120,CRAIE.jaune,entreE(T,tQ4,tQ4+.4));
      if(T>=r2){ const tb=mot('05b-reponse','bouquets'), ts=mot('05b-reponse','six');
        if(T>=tb) for(let i=0;i<4;i++) bouquetE(c,50+i*74,660,10,1,.55*zoom(T,tb+i*.12,.4),0,i);
        if(T>=ts) for(let k=0;k<6;k++) tulipeE(c,360+k*26,660,360+k*26,530,COUL_TULIPE[k%5],zoom(T,ts+k*.08,.4)); }
      tab.maj(); return; }
    if(T>=q1){ /* 2 paquets de 10 crayons, 5 crayons seuls */
      const XC=k=>320+k*40, tR=[mot('04b-reponse','vingt',2),mot('04b-reponse','vingt-deux'),mot('04b-reponse','vingt-trois'),mot('04b-reponse','vingt-quatre'),mot('04b-reponse','vingt-cinq')];
      const t25=mot('04b-reponse','vingt-cinq',2);
      paquetCrayonsE(c,90,650,300,1,T>=r1&&T>=mot('04b-reponse','dizaines')&&T<t25?.6:0); paquetCrayonsE(c,215,650,300,1,T>=r1&&T>=mot('04b-reponse','dizaines')&&T<t25?.6:0);
      for(let k=0;k<5;k++) crayonE(c,XC(k),650,250,COUL_CRAYON[(k*3)%10],16,1,T>=r1&&T>=mot('04b-reponse','unités')&&T<t25?.6:0);
      if(T<r1){ const td=mot('04-question','dix'), tc=mot('04-question','cinq');
        if(T>=td){ ecrire(c,'10',90,300,62*zoom(T,td,.5),CRAIE.r1); ecrire(c,'10',215,300,62*zoom(T,td+.1,.5),CRAIE.r1); }
        if(T>=tc) ecrire(c,'5',400,340,72*zoom(T,tc,.5),CRAIE.r0); }
      else { etiquette(c,'10',90,290,T,mot('04b-reponse','Dix'),CRAIE.r1,44); etiquette(c,'20',215,290,T,mot('04b-reponse','vingt'),CRAIE.r1,44);
        tR.forEach((t,k)=>etiquette(c,String(21+k),XC(k),k%2?280:350,T,t,k===4?CRAIE.ok:CRAIE.r0,34));
        if(T>=t25) ecrire(c,'25',260,120,130*zoom(T,t25,.5),CRAIE.ok); }
      tab.maj(); return; }
    if(T>=no){ trenteQuatre(c,T,tTroisG,tQuatreD,t34); tab.maj(); return; }

    /* le marché : le store, le seau de tulipes, les bouquets de 10 */
    if(T>=tMarche) storeE(c);
    let pris=0; for(let i=0;i<3;i++) pris+=nBouquet(i,T);
    if(T>=tTul) seau(c,T,34-pris,T>=tReste&&T<no?.5+.5*Math.sin(T*5):0);
    if(T>=tTrop&&T<pa) for(const [x,y] of [[650,250],[1000,280],[830,200]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
    if(T>=pa) for(let i=0;i<3;i++){ const n=nBouquet(i,T); if(!n) continue;
      const ru=i===0?(T>=tRuban?entreE(T,tRuban,tRuban+.5):0):entreE(T,(i===1?tB2:tB3)+.9,(i===1?tB2:tB3)+1.3);
      bouquetE(c,XB(i),YB,n,ru,1.3,0,i);
      if(ru>=1&&(i>0||T>=tDiz)) etiquette(c,'10',XB(i),688,T,i===0?tDiz:(i===1?tB2:tB3)+1.3,CRAIE.r1,52); }
    /* pendant le compte : le nombre qui grandit au-dessus du premier bouquet */
    if(T>=pa&&T<en){ const n=nBouquet(0,T); if(n) ecrire(c,String(n),XB(0)+170,170,110*zoom(T,tCompte[n-1],.5),n===10?CRAIE.ok:CRAIE.jaune); }
    if(T>=en&&T>=tTrois) ecrire(c,'3',XB(1),150,110*zoom(T,tTrois,.5),CRAIE.r1);
    if(T>=en&&T>=tQuatre) ecrire(c,'4',830,250,110*zoom(T,tQuatre,.5),CRAIE.r0);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question'), mq=w=>mot('04-question',w), mq2=w=>mot('05-question',w);
  qa('Question !');
  const phrase1=[phraseE('2 paquets de 10, et 5 seuls.',[mq('Deux'),mq('paquets'),mq('de'),mq('dix'),mq('et'),mq('cinq'),mq('seuls')]),(qa.jusque('Combien'),qa('Combien de crayons ?'))];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); const phrase2=[phraseE('Dans 46, que compte le 4 ?',[mq2('Dans'),mq2('quarante-six'),mq2('que'),mq2('compte'),mq2('le'),mq2('quatre'),mq2('quatre')])];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=w=>mot('05-question',w)-q2;
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const tC=mr1('C'), tB=mr2('B');
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:2,tBon:tC-r1,
      phrase:phrase1,pause:pause1,
      choix:[['7',tqa('A'),tqa('sept')],['52',tqa('B'),tqa('cinquante-deux')],['25',tqa('C'),tqa('vingt-cinq')]],
      tete:[[r1+.1,'Réponse '],[tC,'C !']],
      reponse:[phraseE('10, 20, … 25.',[mr1('Dix'),mr1('vingt'),mr1('puis'),mr1('vingt-cinq')]),phraseE('2 dizaines, 5 unités : 25.',[mr1('Deux'),mr1('dizaines'),mr1('cinq'),mr1('unités'),mr1('vingt-cinq',2)])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:1,tBon:tB-r2,
      phrase:phrase2,pause:pause2,
      choix:[['les fleurs seules',tqb('A'),tqb('fleurs')],['les bouquets de 10',tqb('B'),tqb('bouquets')],['rien du tout',tqb('C'),tqb('rien')]],
      tete:[[r2+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('4 bouquets de 10,',[mr2('quatre',2),mr2('bouquets'),mr2('de')]),phraseE('6 fleurs seules : 46 !',[mr2('six'),mr2('fleurs'),mr2('seules'),mr2('seules'),mr2('Quarante-six'),mr2('Quarante-six')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-encore'),'Combien<br>de fleurs ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>');
  return { clips,FIN,titre:'Les paquets de dix',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,no,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros||T<pa) T>=tTrop?g.oups():g.ouvre();
      else if(T<q1) (T>=tDiz&&T<en)||(T>=t34&&T<t34+1.5)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
