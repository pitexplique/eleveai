/* ============================================================
   Série Idriss le pêcheur — SHORT 13 : « Le trésor du filet » (micro ce1_monnaie_valeur_ensemble), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-valeur-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 2).
   Dans le filet, un vieux porte-monnaie : un billet de 20 € et deux pièces de 50 c. Bonne réponse A (21 €).
   Commentaire : un billet de 5 € et trois pièces de 10 c ? Ceinture blanche.
   ============================================================ */
FILMS['ce1-valeur']=function(outils){
  const DUR={'00-accroche':10.96,'01-question':14.225,'01b-reponse':12.555,'02-commentaire':10.04,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:40px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tDans=m0('Dans'), tFilet=m0('filet'), tPas=m0('pas'), tVieux=m0('vieux'), tDedans=m0('Dedans'), tVingt=m0('vingt'), tCinq=m0('cinquante');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tC1=mr('Cinquante'), tPlus=mr('plus'), tC2=mr('cinquante',2), tCent=mr('cent'), tUn=mr('un'), tV1=mr('Vingt'), tPlus2=mr('plus',2), tUn2=mr('un',2), tV2=mr('vingt',2), tUn3=mr('un',3), tRend=mr('rend'), tProp=mr('propriétaire');
  const mc=w=>mot('02-commentaire',w), tCinqC=mc('cinq'), tTroisC=mc('trois'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tDans-.08;

  const PM=[180,640], BIL=[560,420], C50=[[440,610],[640,610]];
  function quai(c,T){ merE(c,T,230); c.fillStyle='#a47148'; c.fillRect(0,500,1056,220); c.strokeStyle='#6b4423'; c.lineWidth=4;
    for(let x=0;x<1056;x+=132){ c.beginPath(); c.moveTo(x,500); c.lineTo(x,720); c.stroke(); } c.beginPath(); c.moveTo(0,500); c.lineTo(1056,500); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : un billet de 5 € et trois pièces de 10 c */
      quai(c,T);
      if(T>=tCinqC) euroE(c,5,260,340,56,{z:zoom(T,tCinqC,.5),grand:1});
      if(T>=tTroisC) for(let k=0;k<3;k++) centimeE(c,10,540+k*150,350,90,{z:zoom(T,tTroisC+k*.12,.5)});
      if(T>=tTroisC) ecrire(c,'3 × 10 c',690,480,56,CRAIE.jaune);
      if(T>=tCombC) ecrire(c,'?',528,620,140*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    quai(c,T);
    idrissE(c,900,720,1.25,{montre:T>=tDedans&&T<q?1:0,salut:T>=r&&T>=tRend?1:0,T});
    if(T<tDedans){ /* le filet remonte de la mer, le porte-monnaie dedans */
      const u=entreE(T,tFilet-.4,tFilet+.8); filetE(c,100,360-230*u,460,280);
      if(T>=tPas) for(const [x,y] of [[200,90],[440,90]]) ecrire(c,'?',x,y-0*u,80,CRAIE.gris);
      if(T>=tVieux) porteMonnaieCoulE(c,330,600-230*u,220,{coul:'#8d6e4f',bord:'#4e342e',gouttes:1,T,z:1});
      tab.maj(); return; }
    /* le porte-monnaie ouvert sur le quai ; le billet de 20 € et les deux pièces de 50 c */
    let pm=PM; if(T>=r&&T>=tRend) pm=sautE(PM,[-160,560],entreE(T,tRend,tRend+1.2),120);
    porteMonnaieCoulE(c,pm[0],pm[1],220,{coul:'#8d6e4f',bord:'#4e342e',gouttes:T<q?1:0,T});
    const parti=T>=r&&T>=tRend;
    if(!parti){
      if(T>=tVingt) euroE(c,20,BIL[0],BIL[1],60,{z:zoom(T,tVingt,.5),grand:1,lueur:T>=r&&T>=tV1&&T<tRend?.5:0});
      if(T>=tCinq) C50.forEach(([x,y],k)=>centimeE(c,50,x,y,92,{z:zoom(T,tCinq+k*.15,.5),lueur:T>=r&&T>=tC1&&T<tUn?.6:0}));
      if(T<r){ if(T>=q) ecrire(c,'?',800,110,150*zoom(T,q+.5,.5),CRAIE.jaune); } }
    if(T>=r){
      formuleE(c,T,528,70,['50 c','+','50 c','=','100 c','=','1 €'],[tC1,tPlus,tC2,tCent,tCent,tUn,tUn],58,
        [CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      formuleE(c,T,500,170,['20 €','+','1 €','=','21 €'],[tV1,tPlus2,tUn2,tV2,tV2],70,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.ok]);
      if(T>=tRend){ idrissE(c,150,720,1.05,{cire:'#74c0fc',cireB:'#1864ab',peau:'#f1c27d',salut:T>=tProp?1:0,T});
        for(const [x,y] of [[330,330],[700,330]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Combien d'argent dans le porte-monnaie ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,q-.3,'Combien dans<br>le porte-monnaie ?',ardoiseMini([['20 €  +  50 c'],['+ 50 c = ?','#ffd43b']]));
  return { clips,FIN,titre:'Le trésor du filet',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['21 €',tq('A'),tq('euros')],['20 € et 2 c',tq('B'),tq('centimes')],['120 €',tq('C'),tq('euros',3)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('50 c + 50 c = 1 €',[tC1,tC1,tPlus,tC2,tC2,tUn,tUn,tUn]),phraseE('20 € + 1 € = 21 €',[tV1,tV1,tPlus2,tUn2,tUn2,tV2,tV2,tV2])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tDedans?g.ouvre():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tRend?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
