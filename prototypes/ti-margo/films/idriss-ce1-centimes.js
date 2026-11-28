/* ============================================================
   Série Idriss le pêcheur — SHORT 12 : « La pièce de la mouette » (micro ce1_monnaie_euros_centimes), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-centimes-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 1).
   Une mouette pose une pièce de 50 c sur le comptoir : combien en faut-il pour 1 € ? Bonne réponse B (deux).
   Commentaire : combien de pièces de 20 c pour 1 € ? Ceinture blanche.
   ============================================================ */
FILMS['ce1-centimes']=function(outils){
  const DUR={'00-accroche':9.375,'01-question':12.475,'01b-reponse':10.68,'02-commentaire':8.1,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:40px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tUne=m0('Une'), tMouette=m0('mouette'), tDepose=m0('dépose'), tCinq=m0('cinquante'), tIdriss=m0('Idriss'), tRit=m0('rit'), tEuro=m0('euro');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tC1=mr('Cinquante'), tPlus=mr('plus'), tC2=mr('cinquante',2), tCent=mr('cent'), tUnR=mr('un'), tDeux=mr('Deux'), tRepart=mr('repart');
  const mc=w=>mot('02-commentaire',w), tVingtC=mc('vingt'), tEuroC=mc('euro'), tRep=mc('réponds');
  const finTitre=tUne-.08;

  const P1=[400,440], P2=[620,440], NID=[90,60];
  function comptoir(c,T){ merE(c,T,250); c.fillStyle='#c08550'; c.fillRect(0,520,1056,200); c.strokeStyle='#6b3a10'; c.lineWidth=5;
    c.beginPath(); c.moveTo(0,520); c.lineTo(1056,520); c.stroke(); c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(0,526,1056,10); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : combien de pièces de 20 c pour 1 € ? */
      comptoir(c,T);
      if(T>=tVingtC){ centimeE(c,20,260,420,100,{z:zoom(T,tVingtC,.5)}); centimeE(c,20,480,420,100,{z:zoom(T,tVingtC+.15,.5)}); ecrire(c,'…',660,430,110,CRAIE.blanc); ecrire(c,'20 c',370,600,64*zoom(T,tVingtC,.4),CRAIE.jaune); }
      if(T>=tEuroC) formuleE(c,T,528,150,['1 €','=','?'],[tEuroC,tEuroC,tEuroC+.2],100,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune]);
      tab.maj(); return; }

    comptoir(c,T);
    idrissE(c,880,720,1.3,{salut:T>=tRit&&T<q?1:0,montre:T>=r&&T>=tDeux&&T<tRepart?1:0,T});
    /* la mouette arrive à « mouette », pose la pièce à « dépose » ; dans la réponse elle repart à « repart » */
    let mp=sautE(NID,[P1[0]+40,P1[1]-140],entreE(T,tMouette-.3,tDepose+.2),60), vole=T<tDepose+.2;
    if(T>=r&&T>=tRepart){ mp=sautE([P1[0]+40,P1[1]-140],[-120,40],entreE(T,tRepart,tRepart+1.4),80); vole=true; }
    if(T>=tMouette-.3) mouetteE(c,mp[0],mp[1],2.7,{aile:vole?1:0,T,dir:T>=tRepart&&T>=r?-1:1});
    /* la pièce de 50 c : dans le bec, puis posée */
    if(T>=tMouette-.3){ const pose=T>=tDepose+.2, p=pose?P1:[mp[0]+60,mp[1]+20];
      centimeE(c,50,p[0],p[1],pose?96:46,{lueur:T>=tCinq&&T<tIdriss?.6:0}); }
    if(T<r){ if(T>=tCinq) ecrire(c,'50 c',P1[0],P1[1]+140,64*zoom(T,tCinq,.4),CRAIE.jaune);
      if(T>=tEuro) formuleE(c,T,300,150,['1 €','=','?'],[tEuro,tEuro,tEuro+.2],96,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune]); }
    else {
      /* la deuxième pièce de 50 c arrive ; 50 c + 50 c = 100 c = 1 € */
      if(T>=tC2) centimeE(c,50,P2[0],P2[1],96,{z:zoom(T,tC2,.5)});
      formuleE(c,T,528,80,['50 c','+','50 c','=','100 c','=','1 €'],[tC1,tPlus,tC2,tCent,tCent,tUnR,tUnR],60,
        [CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tUnR) euroE(c,1,510,250,60,{z:zoom(T,tUnR,.5),lueur:.6});
      if(T>=tDeux) sommeE(c,'2 pièces',510,640,54,{z:zoom(T,tDeux,.4),coul:CRAIE.ok});
      if(T>=tDeux) for(const [x,y] of [[300,330],[720,330]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien de pièces de cinquante centimes pour faire un euro ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,r-.5,'1 € =<br>combien de 50 c ?',ardoiseMini([['50 c  +  …'],['= 1 € ?','#ffd43b']]));
  return { clips,FIN,titre:'La pièce de la mouette',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['50 pièces',tq('A'),tq('cinquante')],['2 pièces',tq('B'),tq('deux')],['100 pièces',tq('C'),tq('cent')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('50 c + 50 c = 100 c',[tC1,tC1,tPlus,tC2,tC2,tCent,tCent,tCent]),phraseE('100 c = 1 €',[tCent,tCent,tCent,tUnR,tUnR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tRit?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tDeux?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
