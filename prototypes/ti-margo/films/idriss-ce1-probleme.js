/* ============================================================
   Série Idriss le pêcheur — SHORT 17 : « Le café et le pain » (micro ce1_monnaie_probleme), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-probleme-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 6).
   Au lever du jour, Idriss a 5 € : un café à 1,50 € et un pain à 1 €. Combien lui reste-t-il ? Bonne réponse C (2,50 €).
   Commentaire : tu as 10 €, un ballon coûte 12 €, combien te manque-t-il ? Ceinture blanche.
   ============================================================ */
FILMS['ce1-probleme']=function(outils){
  const DUR={'00-accroche':9.17,'01-question':14.205,'01b-reponse':13.565,'02-commentaire':10.83,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:38px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tAvant=m0('Avant'), tPeche=m0('pêche'), tCinq0=m0('cinq'), tAchete=m0('achète'), tCafe=m0('café'), tUnCafe=m0('un',2), tCinqu0=m0('cinquante'),
    tPain=m0('pain'), tUnPain=m0('un',4);
  const mq=(w,n=1)=>mot('01-question',w,n), tCombien=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tUnR=mr('un'), tPlus=mr('plus'), tUnR2=mr('un',2), tDeuxR=mr('deux'), tSur=mr('Sur'), tCinqR=mr('cinq'), tReste=mr('reste'),
    tDeuxR2=mr('deux',2), tBR=mr('B'), tPainR=mr('pain');
  const mc=w=>mot('02-commentaire',w), tDixC=mc('dix'), tBallon=mc('ballon'), tDouze=mc('douze'), tManque=mc('manque-t-il'), tRep=mc('réponds');
  const finTitre=tAvant-.08;

  /* le port au lever du jour : soleil bas, mer, quai de bois */
  function aube(c,T){ soleilMatinE(c,560,230,70,1); merE(c,T,230); c.fillStyle='#a47148'; c.fillRect(0,520,1056,200);
    c.strokeStyle='#6b4423'; c.lineWidth=4; c.beginPath(); c.moveTo(0,520); c.lineTo(1056,520); c.stroke(); }
  /* le rappel : 5 € dans la main ; café 1,50 € ; pain 1 € */
  function rappel(c,T){ euroE(c,5,190,200,56,{grand:1}); ecrire(c,'j\'ai 5 €',190,400,62,CRAIE.blanc);
    cafeE(c,520,330,1.4,{T}); prixE(c,'1,50 €',520,410,58);
    painE(c,850,230,320); prixE(c,'1 €',850,410,58); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : tu as 10 €, un ballon à 12 € : combien te manque-t-il ? */
      quaiBoisE(c,T,40);
      if(T>=tDixC){ euroE(c,10,260,260,60,{grand:1,z:zoom(T,tDixC,.5)}); ecrire(c,'tu as 10 €',260,430,66*zoom(T,tDixC,.4),CRAIE.blanc); }
      if(T>=tBallon) ballonFootE(c,790,300,135,{z:zoom(T,tBallon,.5)});
      if(T>=tDouze) prixE(c,'12 €',790,110,70,{z:zoom(T,tDouze,.5)});
      if(T>=tManque) sommeE(c,'il te manque ?',528,610,76,{z:zoom(T,tManque,.4)});
      tab.maj(); return; }

    if(T>=r){ /* la réponse : ce qu'il dépense, puis ce qui reste */
      quaiBoisE(c,T,40);
      formuleE(c,T,528,170,['1,50 €','+','1 €','=','2,50 €'],[tUnR,tPlus,tUnR2,tDeuxR,tDeuxR],76,[CRAIE.jaune,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tSur) formuleE(c,T,528,360,['5 €','−','2,50 €','=','2,50 €'],[tCinqR,tReste,tReste,tDeuxR2,tDeuxR2],76,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tDeuxR2) for(const [x,y] of [[50,360],[1006,360]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
      if(T>=tBR){ painE(c,170,570,250,{z:zoom(T,tBR,.4),lueur:T>=tPainR?.7:0}); ecrire(c,'B : on a oublié le pain !',640,570,52*zoom(T,tBR,.4),CRAIE.faux); }
      tab.maj(); return; }

    if(T>=q){ /* la question : le rappel en haut, « il reste ? » en bas */
      quaiBoisE(c,T,40); rappel(c,T);
      if(T>=tCombien) sommeE(c,'il lui reste ?',528,600,76,{z:zoom(T,tCombien,.4)});
      tab.maj(); return; }

    /* au lever du jour, Idriss a 5 € : un café, un pain */
    aube(c,T);
    idrissE(c,900,720,1.2,{montre:T>=tAchete?1:0,T});
    if(T>=tCinq0) euroE(c,5,680,440,52,{grand:1,z:zoom(T,tCinq0,.5),a:-.1});
    if(T>=tPeche&&T<tCafe) barqueE(c,300,300,.8,{T,rameur:false});
    if(T>=tCafe){ cafeE(c,180,500,1.45,{T,z:zoom(T,tCafe,.4)}); if(T>=tUnCafe) prixE(c,T>=tCinqu0?'1,50 €':'1 €',180,130,66,{z:zoom(T,tUnCafe,.5)}); }
    if(T>=tPain){ painE(c,440,600,300,{z:zoom(T,tPain,.4)}); if(T>=tUnPain) prixE(c,'1 €',440,130,66,{z:zoom(T,tUnPain,.5)}); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien lui reste-t-il ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,q+5,'Café + pain :<br>il reste ?',ardoiseMini([['j\'ai 5 €'],['− 1,50 € − 1 €'],['= ?','#ffd43b']]));
  return { clips,FIN,titre:'Le café et le pain',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7,50 €',tq('A'),tq('cinquante',1)],['3,50 €',tq('B'),tq('cinquante',2)],['2,50 €',tq('C'),tq('cinquante',3)]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],
      reponse:[phraseE('1,50 € + 1 € = 2,50 €',[tUnR,tUnR,tPlus,tUnR2,tUnR2,tDeuxR,tDeuxR,tDeuxR]),phraseE('5 € − 2,50 € = 2,50 €',[tCinqR,tCinqR,tReste,tReste,tReste,tDeuxR2,tDeuxR2,tDeuxR2])],suite:[] },
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
      else if(T<com){ T<tBR?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
