/* ============================================================
   Série Nombres entiers CP — PAYSAGE 09 : « La tour qui touche la lune » (micro cp_entier_ordinal), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js + cp-entier3-dessins.js.
   Voix : manim/voix/cp-entier-ordinal-paysage.json. Une tour de cubes la nuit : 1er, 2e, 3e, 4e ; « ième » ; 4e et 1er écrits ;
   cinquième, neuvième (f → v), dixième. Questions en plein milieu : le cube qui brille → B (7e) ; le 20e cube touche la lune → B (20e).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = la lune tout en haut, le premier cube qui vacille + « Quel cube va la toucher ? ».
   Pendant les questions, les dessins restent à gauche de l'ardoise (x < 520) ; la carte est à droite.
   ============================================================ */
FILMS['ordinal']=function(outils){
  const DUR={'00-accroche':9.71,'01-mots':12.7,'02-ecrire':12.16,'03-pieges':8.82,'04-question':14.16,'04b-reponse':13.64,
    '05-question':16.96,'05b-reponse':7.83,'06-appris':8.04,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-mots':.6,'02-ecrire':1,'03-pieges':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,mo,ec,pi,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:48px!important;white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tCe=m0('Ce'), tCubes=m0('cubes'), tLune=m0('lune'), tMais=m0('Mais');
  const mm=(w,n=1)=>mot('01-mots',w,n), tM=[mm('premier'),mm('deuxième'),mm('troisième'),mm('quatrième')], tIeme=mm('ième'), tM4=mm('quatre'), tM4e=mm('quatrième',2);
  const me=(w,n=1)=>mot('02-ecrire',w,n), tPe1=me('petit'), tPe2=me('petit',2), tEMais=me('Mais'), tUnieme=me('unième'), tPrem=me('premier'), tOn3=me('On',4), tEe=me('e',3), tEr=me('r');
  const mp=(w,n=1)=>mot('03-pieges',w,n), tCinq=mp('Cinq'), tCinqe=mp('cinquième'), tNeuf=mp('Neuf'), tNeufe=mp('neuvième'), tF=mp('f'), tV=mp('v'), tDixe=mp('dixième');
  const ma=(w,n=1)=>mot('06-appris',w,n), tA4=ma('quatrième'), tA20=ma('vingtième'), tA1=ma('premier'), tA1b=ma('premier',2);
  const finTitre=tCe-.08;

  const S=62, X=200, YB=690;
  /* quand chaque cube de la grande tour se pose (cubes 1 à 10) */
  const tPose=k=>[tCubes,tM[1],tM[2],tM[3],tCinq,tCinqe+.4,tCinqe+.8,tCinqe+1.2,tNeuf,tDixe][k];
  const tEtiq=k=>[tM[0],tM[1],tM[2],tM[3],tCinqe,tCinqe+.4,tCinqe+.8,tCinqe+1.2,tNeufe,tDixe][k];
  const pulseE=(T,t0,t1)=>T>=t0&&T<t1?1+.45*Math.max(0,Math.sin((T-t0)*Math.PI/(t1-t0))):1;

  function tour(c,T,n,s,x=X,yb=YB,lueur=()=>0){ for(let k=0;k<n;k++) cubeE(c,x,yb-k*s,s,COUL_CUBE[k%10],1,lueur(k)); }

  function dessiner(T){ const c=tab.c; tab.effacer(); etoilesE(c,T,14,1056,300);
    if(T>=ap){ /* 1er, 4e, 20e */
      tour(c,T,4,80);
      for(let k=0;k<4;k++) rangE(c,k+1,320,YB-k*80-40,T,ap+.05,CRAIE.jaune,48);
      if(T>=tA4) ordinalZE(c,4,580,280,160*zoom(T,tA4,.5),CRAIE.jaune);
      if(T>=tA20) ordinalZE(c,20,850,280,160*zoom(T,tA20,.5),CRAIE.jaune);
      if(T>=tA1){ ordinalZE(c,1,580,520,160*zoom(T,tA1,.5),CRAIE.ok); }
      if(T>=tA1b) ecrire(c,'premier',840,520,76*zoom(T,tA1b,.5),CRAIE.ok);
      tab.maj(); return; }
    if(T>=q2){ /* 20 cubes : le dernier touche la lune */
      const s=30, mr=(w,n=1)=>mot('05b-reponse',w,n), tAll=mr('Regarde'), tPet=mr('petit'), tVg=mr('vingt');
      pleineLuneE(c,182,52,42,entreE(T,tAll,tAll+1),T);
      tour(c,T,20,s,110,YB,k=>k===19&&T<r2?.6+.4*Math.sin(T*5):0);
      const tq=mot('05-question','vingtième');
      if(T>=tq&&T<r2){ ecrire(c,'vingtième',325,260,56*zoom(T,tq,.5),CRAIE.blanc); lienE(c,[270,232],[142,108],entreE(T,tq,tq+.6),CRAIE.jaune); }
      if(T>=r2&&T>=tVg){ ordinalZE(c,20,300,340,120*zoom(T,tVg,.5),CRAIE.ok,pulseE(T,tPet,tPet+1.1)); lienE(c,[255,262],[142,108],1,CRAIE.ok);
        if(T>=tAll) for(const [x,y] of [[260,40],[60,150],[420,190]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }
    if(T>=q1){ /* une tour de 7 cubes : le 7e brille */
      const s=80, mr=(w,n=1)=>mot('04b-reponse',w,n), tR=['Premier','deuxième','troisième','quatrième','cinquième','sixième','septième'].map(w=>mr(w)), tSept=mr('sept'), tPet=mr('petit');
      if(T<r1) pleineLuneE(c,430,90,44,0,T);
      tour(c,T,7,s,X,YB,k=>k===6?(T<r1?.6+.4*Math.sin(T*5):(T>=tR[6]?1:0)):0);
      const tc=mot('04-question','compte');
      if(T<r1){ if(T>=mot('04-question','lequel')) ecrire(c,'?',330,YB-6.5*s,110*(1+.05*Math.sin(T*5)),CRAIE.jaune);
        if(T>=tc){ const u=entreE(T,tc,tc+1.2), y=YB-8-u*(7*s-20); c.strokeStyle=CRAIE.jaune; c.lineWidth=7; c.beginPath(); c.moveTo(100,YB-8); c.lineTo(100,y); c.stroke();
          c.fillStyle=CRAIE.jaune; c.beginPath(); c.moveTo(100,y-24); c.lineTo(82,y+6); c.lineTo(118,y+6); c.closePath(); c.fill(); } }
      else { for(let k=0;k<7;k++) rangE(c,k+1,320,YB-k*s-s/2,T,tR[k],k===6?CRAIE.ok:CRAIE.jaune,46);
        if(T>=tSept) ordinalZE(c,7,440,95,110*zoom(T,tSept,.5),CRAIE.ok,pulseE(T,tPet,tPet+1.1)); }
      tab.maj(); return; }

    /* ---- avant les questions : la grande tour, la lune, les mots ---- */
    pleineLuneE(c,960,90,58,0,T);
    const n=[0,1,2,3,4,5,6,7,8,9].filter(k=>T>=tPose(k)).length;
    for(let k=0;k<n;k++){ const t0=tPose(k), z=entreE(T,t0,t0+.45), y=YB-k*S-(1-douxE(z))*160;
      const a=k===0&&T<mo?.08*Math.sin(T*5)*Math.max(0,1-(T-t0)/4):0;
      cubeE(c,X,y,S,COUL_CUBE[k%10],1,0,a);
      if(T>=tEtiq(k)) { const z2=zoom(T,tEtiq(k),.5); ordinalE(c,k+1,X+100,YB-k*S-S/2,56*z2,k===3&&T>=ec&&T<pi?CRAIE.ok:CRAIE.jaune); } }
    if(T>=tMais&&T<mo){ ecrire(c,'?',520,300,140*zoom(T,tMais,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      for(const [x,y] of [[860,60],[1010,180],[440,220]]) etincelle(c,x,y,12+6*Math.sin(T*6+x)); }
    if(T>=mo&&T<ec){ /* j'ajoute « ième » : 4 → quatrième */
      if(T>=tIeme&&T<tM4e) ecrire(c,'+ ième',760,460,80*zoom(T,tIeme,.5),CRAIE.jaune);
      if(T>=tM4) ecrire(c,'4',500,330,120*zoom(T,tM4,.5),CRAIE.blanc);
      if(T>=tM4e){ ecrire(c,'→',600,330,80,CRAIE.blanc); motCouleursE(c,[['quatr',CRAIE.blanc],['ième',CRAIE.jaune]],840,330,76*zoom(T,tM4e,.5)); } }
    if(T>=ec&&T<pi){ /* 4e ; pas « unième » : premier, 1er */
      if(T<tEMais) ordinalZE(c,4,720,330,240*zoom(T,ec+.1,.5),CRAIE.jaune,Math.max(pulseE(T,tPe1,tPe1+.9),pulseE(T,tPe2,tPe2+.9)));
      else if(T<tOn3){ if(T>=tUnieme){ ecrire(c,'unième',720,280,96*zoom(T,tUnieme,.5),CRAIE.blanc);
          if(T>=tUnieme+.5){ const u=entreE(T,tUnieme+.5,tUnieme+.9); c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.beginPath(); c.moveTo(560,250); c.lineTo(560+320*u,250+60*u); c.stroke(); } }
        if(T>=tPrem) ecrire(c,'premier',720,450,96*zoom(T,tPrem,.5),CRAIE.ok); }
      else { ordinalZE(c,1,720,300,240*zoom(T,tOn3,.5),CRAIE.ok,Math.max(pulseE(T,tEe,tEe+.6),pulseE(T,tEr,tEr+.8)),T>=tEe?CRAIE.jaune:CRAIE.ok);
        ecrire(c,'premier',720,520,70,CRAIE.ok); } }
    if(T>=pi){ /* cinquième ; neuvième (f → v) ; dixième */
      if(T>=tCinq){ ecrire(c,'cinq',450,260,72*zoom(T,tCinq,.5),CRAIE.blanc); if(T>=tCinqe){ ecrire(c,'→',585,260,72,CRAIE.blanc); ecrire(c,'cinquième',830,260,72*zoom(T,tCinqe,.5),CRAIE.blanc); } }
      if(T>=tNeuf){ motCouleursE(c,[['neu',CRAIE.blanc],['f',T>=tF?CRAIE.faux:CRAIE.blanc]],450,400,72*zoom(T,tNeuf,.5));
        if(T>=tNeufe){ ecrire(c,'→',585,400,72,CRAIE.blanc); motCouleursE(c,[['neu',CRAIE.blanc],['v',T>=tV?CRAIE.ok:CRAIE.blanc],['ième',CRAIE.blanc]],830,400,72*zoom(T,tNeufe,.5)); } }
      if(T>=tDixe) ecrire(c,'dixième',830,540,72*zoom(T,tDixe,.5),CRAIE.blanc); }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Le'); const phrase1=[qa("Le cube qui brille, c'est lequel ?")];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et compte depuis le bas !')];
  qb('Question !'); qb.jusque('Comment'); const phrase2=[qb("Comment l'écrit-on ?")];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const tB1=mr1('B'), tB2=mr2('B');
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:1,tBon:tB1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['le 6<sup>e</sup>',tqa('A'),tqa('sixième')],['le 7<sup>e</sup>',tqa('B'),tqa('septième')],['le 8<sup>e</sup>',tqa('C'),tqa('huitième')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],
      reponse:[phraseE('1ᵉʳ, 2ᵉ, 3ᵉ, 4ᵉ, 5ᵉ, 6ᵉ, 7ᵉ !',['Premier','deuxième','troisième','quatrième','cinquième','sixième','septième'].map(w=>mr1(w))),
        phraseE('On écrit 7ᵉ.',[mr1('On'),mr1('écrit'),mr1('sept')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:1,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['2<sup>e</sup>',tqb('A'),tqb('deux')],['20<sup>e</sup>',tqb('B'),tqb('vingt')],['20',tqb('C'),tqb('vingt',2)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],
      reponse:[phraseE('Vingtième : 20ᵉ.',[mr2('Vingtième'),mr2('Vingtième'),mr2('vingt')]),
        phraseE("La lune s'allume !",[mr2('la'),mr2('lune'),mr2("s'allume"),mr2("s'allume")])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tMais+.4,'Qui touche<br>la lune ?<div style="font-size:150px;margin-top:6px">🌕</div>');
  return { clips,FIN,titre:'La tour qui touche la lune',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,mo,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<mo) T>=tMais?g.reflechit():g.montre();
      else if(T<ec) T>=tM4e?g.fier():g.montre();
      else if(T<pi) T>=tEMais&&T<tPrem?g.oups():g.montre();
      else if(T<q1) T>=tF&&T<tDixe?g.oups():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.reflechit(); }
    } };
};
