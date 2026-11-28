/* ============================================================
   Série Idriss le pêcheur — SHORT 18 : « Six beignets ? » (micro ce1_monnaie_defi), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-defi-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 7).
   Ti Margo a 5 €, un beignet coûte 1 €, il en veut six pour ses copains : a-t-il assez ? Bonne réponse B (non, il manque 1 €).
   Idriss ajoute le dernier euro. Commentaire : 1,50 €, c'est combien de centimes ? Ceinture blanche.
   ============================================================ */
FILMS['ce1-defi']=function(outils){
  const DUR={'00-accroche':8.83,'01-question':12.855,'01b-reponse':10.905,'02-commentaire':8.05,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:36px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tJai=m0('J\'ai'), tCinq0=m0('cinq'), tBeignet=m0('beignet'), tUn0=m0('un',2), tVeux=m0('veux'), tSix0=m0('six'), tCopains=m0('copains');
  const mq=(w,n=1)=>mot('01-question',w,n), tAssez=mq('assez');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tSix1=mr('Six'), tSix2=mr('six',2), tCinqR=mr('cinq'), tManque=mr('manque'), tUnR=mr('un'), tHeur=mr('Heureusement'), tIdriss=mr('Idriss'), tAjoute=mr('ajoute');
  const mc=w=>mot('02-commentaire',w), tUnC=mc('un'), tCinquC=mc('cinquante'), tCentC=mc('centimes'), tRep=mc('réponds');
  const finTitre=tJai-.08;

  /* le marchand de beignets : un comptoir et son auvent */
  function stand(c,T){ quaiBoisE(c,T,120); c.fillStyle='#e03131'; c.fillRect(0,0,1056,40);
    for(let k=0;k<12;k++){ c.fillStyle=k%2?'#fff':'#e03131'; c.beginPath(); c.arc(44+k*88,40,44,0,Math.PI); c.fill(); } }
  /* six beignets en rang, l'étiquette 1 € sous chacun quand lab */
  function sixBeignets(c,T,y,t0,r=44,lab=0){ for(let k=0;k<6;k++){ const x=108+k*168; beignetE(c,x,y,r,{z:zoom(T,t0+k*.1,.4)});
    if(lab&&T>=lab) ecrire(c,'1 €',x,y+r+38,50,CRAIE.jaune); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 1,50 €, c'est combien de centimes ? */
      quaiBoisE(c,T,40);
      if(T>=tUnC) prixVirguleE(c,'1','50',528,250,190,{z:zoom(T,tUnC,.5)});
      if(T>=tCentC) sommeE(c,'= ? c',528,520,120,{z:zoom(T,tCentC,.4)});
      tab.maj(); return; }

    if(T>=r){ /* la réponse : 6 × 1 € = 6 € ; 5 € < 6 € ; Idriss ajoute 1 € */
      stand(c,T);
      sixBeignets(c,T,120,r,54,tSix1);
      formuleE(c,T,400,330,['6','×','1 €','=','6 €'],[tSix1,tSix1,tSix1,tSix2,tSix2],90,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tCinqR) formuleE(c,T,400,470,['5 €','<','6 €'],[tCinqR,tCinqR,tCinqR],90,[CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tManque) sommeE(c,'il manque 1 €',400,620,70,{z:zoom(T,tManque,.4),coul:CRAIE.faux});
      if(T>=tIdriss) idrissE(c,900,720,1.05,{montre:1,T});
      if(T>=tAjoute){ euroE(c,1,740,560,66,{z:zoom(T,tAjoute,.5),lueur:.6+.3*Math.sin(T*5)}); }
      tab.maj(); return; }

    if(T>=q){ /* la question : j'ai 5 €, six beignets à 1 € : assez ? */
      stand(c,T);
      sixBeignets(c,T,190,q,62,q);
      euroE(c,5,250,440,60,{grand:1}); ecrire(c,'j\'ai 5 €',250,600,66,CRAIE.blanc);
      if(T>=tAssez) sommeE(c,'assez ?',760,500,90,{z:zoom(T,tAssez,.4)});
      tab.maj(); return; }

    /* le marchand de beignets ; mon billet de 5 € ; six copains attendent */
    stand(c,T);
    c.fillStyle='#8d5524'; c.fillRect(40,300,976,28);
    if(T>=tBeignet) for(let k=0;k<5;k++) beignetE(c,200+k*165,245,58,{z:zoom(T,tBeignet+k*.08,.4)});
    if(T>=tUn0) prixE(c,'1 € le beignet',760,120,58,{z:zoom(T,tUn0,.5)});
    if(T>=tCinq0) euroE(c,5,170,120,50,{grand:1,z:zoom(T,tCinq0,.5),a:-.08});
    if(T>=tSix0){ for(let k=0;k<6;k++) enfantE(c,105+k*169,718,1.2,{k,T,bras:T>=tCopains?1:0});
      sommeE(c,'6 copains',528,380,62,{z:zoom(T,tSix0,.4)}); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Ai-je assez d\'argent ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,q+5,'Six beignets<br>avec 5 € ?',ardoiseMini([['6 × 1 €'],['j\'ai 5 €','#ffd43b']]));
  return { clips,FIN,titre:'Six beignets ?',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['oui',tq('A'),tq('oui')],['non, il manque 1 €',tq('B'),tq('euro')],['oui, il reste 1 €',tq('C'),tq('euro',2)]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('6 × 1 € = 6 €',[tSix1,tSix1,tSix1,tSix1,tSix2,tSix2,tSix2]),phraseE('il manque 1 €',[tManque,tManque,tUnR,tUnR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<com){ T<tHeur?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
