/* ============================================================
   Série Idriss le pêcheur — SHORT 21 : « La glace et les appâts » (micro ce2_monnaie_additionner), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-additionner-short.json (manim/SCRIPTS-monnaie-idriss.md, CE2 3).
   Un sac de glace 2,60 € + des appâts 3,50 € : 60 c + 50 c = 110 c = 1 € et 10 c ; 2 + 3 + 1 = 6 → bonne réponse A (6,10 €).
   Commentaire : 4,75 € + 2,25 €. Ceinture blanche. Ti Margo petit à gauche dès la fin du titre.
   ============================================================ */
FILMS['ce2-additionner']=function(outils){
  const DUR={'00-accroche':8.315,'01-question':14.695,'01b-reponse':15.525,'02-commentaire':11.255,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:48px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tIdriss=m0('Idriss'), tSac=m0('sac'), tDeux=m0('deux'), tAppats=m0('appâts'), tTrois=m0('trois');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tSoix=mr('Soixante'), tPlus=mr('plus'), tCinq=mr('cinquante'), tCent=mr('cent'), tUn=mr('un'), tDix2=mr('dix',2),
    tDeuxR=mr('Deux'), tPlus2=mr('plus',2), tTroisR=mr('trois'), tPlus3=mr('plus',3), tUn2=mr('un',2), tSix=mr('six'), tSix2=mr('Six',2), tC=mr('C'), tOublie=mr('oublié');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tQuatreC=mc('quatre'), tPlusC=mc('plus'), tDeuxC=mc('deux'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tIdriss-.08;

  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,560,1056,160); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,560); c.lineTo(1056,560); c.stroke(); }
  const GX=500, PX=840;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 4,75 € + 2,25 € */
      quaiBoisE(c,T,150); comptoir(c);
      if(T>=tQuatreC) prixVCe2E(c,'4,75 €',600,120,110,{z:zoom(T,tQuatreC,.5),fond:1});
      if(T>=tPlusC) prixVCe2E(c,'+ 2,25 €',540,270,110,{z:zoom(T,tDeuxC,.5),fond:1});
      if(T>=tCombC) prixVCe2E(c,'= ?',650,430,110,{z:zoom(T,tCombC,.5),une:CRAIE.jaune});
      tab.maj(); return; }

    quaiBoisE(c,T,150); comptoir(c);
    const repond=T>=r;
    idrissE(c,140,712,1.2,{montre:T>=tSac&&T<q?1:0,T});
    if(T>=tSac) sacGlaceCe2E(c,GX,560,170,{z:zoom(T,tSac,.4),lueur:repond&&T>=tSoix&&T<tCent?.5:0});
    if(T>=tAppats) appatsCe2E(c,PX,560,210,{z:zoom(T,tAppats,.4),T,lueur:repond&&T>=tCinq&&T<tCent?.5:0});
    if(!repond){
      if(T>=tDeux) ardoiseVCe2E(c,'2,60 €',GX-40,215,66,{z:zoom(T,tDeux,.5)});
      if(T>=tTrois) ardoiseVCe2E(c,'3,50 €',PX+20,250,66,{z:zoom(T,tTrois,.5)});
      if(T>=q) ecrire(c,'+',(GX+PX)/2,250,110,CRAIE.blanc); }
    else {
      prixVCe2E(c,'2,60 €',GX,380,54,{fond:1}); prixVCe2E(c,'3,50 €',PX,380,54,{fond:1});
      /* les centimes d'abord : 60 c + 50 c = 110 c = 1 € et 10 c */
      calculVCe2E(c,T,528,70,['60 c','+','50 c','=','110 c'],[tSoix,tPlus,tCinq,tCent,tCent],68,{vert:false});
      if(T>=tUn) prixVCe2E(c,'= 1 € et 10 c',640,155,68,{z:zoom(T,tUn,.5),fond:1});
      /* puis les euros : 2 + 3 + 1 = 6 ; le « 1 » (l'euro de plus, venu des centimes) en JAUNE */
      formuleE(c,T,480,255,['2','+','3','+','1','=','6'],[tDeuxR,tPlus2,tTroisR,tPlus3,tUn2,tSix,tSix],70,[EUR_CE2,CRAIE.blanc,EUR_CE2,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tSix2) ardoiseVCe2E(c,'6,10 €',890,265,66,{z:zoom(T,tSix2,.5),lueur:T<tC?.6:0});
      if(T>=tC){ prixVCe2E(c,'C : 5,10 €',520,650,56,{z:zoom(T,tC,.5),fond:1}); if(T>=tOublie) barreCe2E(c,[400,650],[640,650],entreE(T,tOublie,tOublie+.4)); }
      if(T>=tSix2) for(const [x,y] of [[760,330],[1010,200]]) etincelle(c,x,y,12+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien paie-t-il en tout ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe2E(outils,q-.3,'Combien<br>en tout ?',[['2,60 €'],['+ 3,50 €','#ffd43b']]);
  return { clips,FIN,titre:'La glace et les appâts',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:[phraseE('2,60 € + 3,50 €',[mot('00-accroche','deux'),mot('00-accroche','euros'),mot('00-accroche','et'),tTrois,mot('00-accroche','euros',2)].map(t=>Math.max(q,t))),...phraseQ],pause:pauseQ,
      choix:[['6,10 €',tq('A'),tq('euros',1)],['5,110 €',tq('B'),tq('euros',2)],['5,10 €',tq('C'),tq('euros',3)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('110 c = 1 € et 10 c',[tCent,mr('centimes'),tUn,tUn,mr('euro'),mr('et'),tDix2,tDix2]),phraseE('6,10 €',[tSix2,mr('euros',2)])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tAppats?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tSix2?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
