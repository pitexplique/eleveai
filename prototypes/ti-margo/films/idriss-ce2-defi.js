/* ============================================================
   Série Idriss le pêcheur — SHORT 23 : « La lampe d'Idriss » (micro ce2_monnaie_defi), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-defi-short.json (manim/SCRIPTS-monnaie-idriss.md, CE2 5).
   La nuit tombe ; Idriss a 10 € ; lampe 6,20 € + flotteur 1,50 € + hameçons 2,40 € = 10,10 € > 10 € → bonne réponse A (il manque 10 c).
   Commentaire : combien de glaces à 2,50 € avec 10 € ? Ceinture blanche. Ti Margo petit à gauche dès la fin du titre.
   ============================================================ */
FILMS['ce2-defi']=function(outils){
  const DUR={'00-accroche':11.605,'01-question':13.975,'01b-reponse':15.85,'02-commentaire':9.745,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:44px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tIdriss=m0('Idriss'), tDix=m0('dix'), tLampe=m0('lampe'), tSix=m0('six'), tFlot=m0('flotteur'), tUn=m0('un',2), tHam=m0('hameçons'), tDeux=m0('deux');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tSixR=mr('Six'), tPlus=mr('plus'), tUnR=mr('un'), tSept=mr('sept'), tPlus2=mr('Plus',2), tDeuxR=mr('deux'), tDixR=mr('dix'), tManque=mr('manque'), tFlotR=mr('flotteur'), tDemain=mr('demain');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tDixC=mc('dix'), tGlaces=mc('glaces'), tDeuxC=mc('deux'), tAcheter=mc('acheter'), tRep=mc('réponds');
  const finTitre=tIdriss-.08;

  /* le soir : le ciel s'assombrit au-dessus de la mer */
  function soir(c,T,u=1){ quaiBoisE(c,T,150); c.fillStyle=`rgba(16,24,64,${.45*u})`; c.fillRect(0,0,1056,220);
    for(let k=0;k<10;k++){ const x=(k*137)%1000+30, y=20+(k*53)%120; c.fillStyle=`rgba(255,244,200,${u*(.5+.5*Math.sin(T*2+k))})`; c.beginPath(); c.arc(x,y,2.5,0,7); c.fill(); } }
  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,560,1056,160); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,560); c.lineTo(1056,560); c.stroke(); }
  const LX=420, FX=640, HX=860;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : combien de glaces à 2,50 € avec 10 € ? */
      soir(c,T,.4); comptoir(c);
      if(T>=tDixC) euroE(c,10,250,250,46,{z:zoom(T,tDixC,.5),grand:1});
      if(T>=tGlaces) for(let k=0;k<2;k++) cornetCe2E(c,560+k*150,520,210,{k,z:zoom(T,tGlaces+k*.15,.4)});
      if(T>=tDeuxC) ardoiseVCe2E(c,'2,50 €',635,150,70,{z:zoom(T,tDeuxC,.5)});
      if(T>=tAcheter) ecrire(c,'?',900,380,150*zoom(T,tAcheter,.5),CRAIE.jaune);
      tab.maj(); return; }

    const nuit=Math.min(1,(T-acc)/6); soir(c,T,nuit); comptoir(c);
    const repond=T>=r;
    idrissE(c,140,712,1.2,{montre:T>=tLampe&&T<q?1:0,T});
    if(T>=tDix) euroE(c,10,150,620,30,{z:zoom(T,tDix,.5),grand:1,lueur:repond&&T>=tManque&&T<tFlotR?.5:0});
    /* la lampe (allumée à la fin), le flotteur (reposé « pour demain »), les hameçons */
    if(T>=tLampe) lampeCe2E(c,LX,560,190,{z:zoom(T,tLampe,.4),T,allume:repond&&T>=tFlotR?entreE(T,tFlotR,tFlotR+.8):0});
    const repose=repond&&T>=tFlotR?entreE(T,tFlotR,tDemain):0;
    if(T>=tFlot) flotteurCe2E(c,FX,490,120,{z:zoom(T,tFlot,.4),T,terne:repose});
    if(T>=tHam) for(let k=0;k<3;k++) hameconE(c,HX-50+k*50,466,80,{z:zoom(T,tHam+k*.1,.4),a:(k-1)*.2});
    const ty=repond?110:250;
    if(T>=tSix) ardoiseVCe2E(c,'6,20 €',LX,ty,repond?50:60,{z:zoom(T,tSix,.5)});
    if(T>=tUn) ardoiseVCe2E(c,'1,50 €',FX,ty,repond?50:60,{z:zoom(T,tUn,.5)});
    if(T>=tDeux) ardoiseVCe2E(c,'2,40 €',HX,ty,repond?50:60,{z:zoom(T,tDeux,.5)});
    if(T<r){ if(T>=q) ecrire(c,'?',640,330,110,CRAIE.jaune); }
    else {
      calculVCe2E(c,T,640,205,['6,20 €','+','1,50 €','=','7,70 €'],[tSixR,tPlus,tUnR,tSept,tSept],56,{vert:false});
      calculVCe2E(c,T,640,290,['7,70 €','+','2,40 €','=','10,10 €'],[tPlus2,tPlus2,tDeuxR,tDixR,tDixR],56,{vert:false});
      if(T>=tManque){ calculVCe2E(c,T,780,375,['10,10 €','>','10 €'],[tManque,tManque,tManque],52,{vert:false});
        prixVCe2E(c,'il manque 10 c',780,650,56,{z:zoom(T,tManque,.5),une:CRAIE.faux,fond:1}); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("A-t-il assez d'argent ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe2E(outils,q-.3,'Assez pour<br>la lampe ?',[['10 €'],['6,20 + 1,50','#ffd43b'],['+ 2,40','#ffd43b']]);
  return { clips,FIN,titre:"La lampe d'Idriss",ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:[phraseE('Il a 10 €.',[q,q,q,q]),...phraseQ],pause:pauseQ,
      choix:[['Non, il manque 10 c',tq('A'),tq('centimes')],['Oui, pile',tq('B'),tq('pile')],['Oui, il reste 1 €',tq('C'),tq('euro')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('10,10 € > 10 €',[tDixR,tDixR,tManque,tManque,tManque]),phraseE('Il manque 10 c.',[mr('Il'),tManque,mr('dix',3),mr('centimes')])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tLampe?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tManque?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
