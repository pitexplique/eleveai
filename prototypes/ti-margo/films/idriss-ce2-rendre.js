/* ============================================================
   Série Idriss le pêcheur — SHORT 22 : « Idriss a-t-il bien rendu ? » (micro ce2_monnaie_rendre), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-rendre-short.json (manim/SCRIPTS-monnaie-idriss.md, CE2 4).
   Ti Margo paie un crabe 3,90 € avec 5 € ; Idriss rend 1,10 € (1 € + 10 c). 3,90 → 4 : + 10 c ; 4 → 5 : + 1 € → bonne réponse A (c'est juste).
   Commentaire : un poisson à 6,50 € payé avec 10 €. Ceinture blanche. Ti Margo petit à gauche dès la fin du titre.
   ============================================================ */
FILMS['ce2-rendre']=function(outils){
  const DUR={'00-accroche':9.875,'01-question':14.43,'01b-reponse':12.97,'02-commentaire':11.015,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:44px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tJe=m0('Je'), tCrabe=m0('crabe'), tTrois=m0('trois'), tBillet=m0('billet'), tCinq=m0('cinq'), tIdriss=m0('Idriss'), tRend=m0('rend'), tUn=m0('un',3);
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tDe=mr('De'), tQuatre=mr('quatre'), tDix=mr('dix'), tDe2=mr('De',2), tCinqR=mr('cinq'), tUnR=mr('un'), tUnR2=mr('Un',2), tBravo=mr('Bravo');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tSixC=mc('six'), tDixC=mc('dix'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tJe-.08;

  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,560,1056,160); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,560); c.lineTo(1056,560); c.stroke(); }
  const DX=[230,520,860], DY=330;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 6,50 € payé avec 10 € */
      quaiBoisE(c,T,150); comptoir(c);
      if(T>=tSixC){ poissonE(c,330,430,280,'#ffa94d',{T,z:zoom(T,tSixC,.4)}); ardoiseVCe2E(c,'6,50 €',330,210,86,{z:zoom(T,tSixC,.5)}); }
      if(T>=tDixC) euroE(c,10,770,330,48,{z:zoom(T,tDixC,.5),grand:1});
      if(T>=tCombC) ecrire(c,'?',770,520,150*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    quaiBoisE(c,T,150); comptoir(c);
    const repond=T>=r;
    idrissE(c,880,712,1.25,{montre:0,T});
    if(T>=tCrabe) crabeE(c,330,620,1.4,{T,z:zoom(T,tCrabe,.4),marche:repond&&T>=tBravo?1:0});
    if(!repond){
      if(T>=tTrois) ardoiseVCe2E(c,'3,90 €',330,440,72,{z:zoom(T,tTrois,.5)});
      /* Ti Margo (à gauche) tend le billet de 5 € ; Idriss rend 1 € et 10 c */
      if(T>=tBillet){ const p=sautE([150,250],[600,250],entreE(T,tCinq,tCinq+.6),60); euroE(c,5,p[0],p[1],30,{z:zoom(T,tBillet,.5),grand:1}); }
      if(T>=tRend){ const u=entreE(T,tRend,tRend+.6), p1=sautE([800,300],[470,150],u,50), p2=sautE([830,300],[560,150],u,50);
        euroE(c,1,p1[0],p1[1],40); centimeE(c,10,p2[0],p2[1],40); }
      if(T>=tUn) prixVCe2E(c,'1,10 €',515,70,64,{z:zoom(T,tUn,.5),fond:1});
      if(T>=q) ecrire(c,'?',700,90,120,CRAIE.jaune); }
    else {
      ardoiseVCe2E(c,'3,90 €',330,440,60);
      euroE(c,1,700,470,36); centimeE(c,10,790,470,36);
      /* la droite des prix : 3,90 € → 4 € → 5 € */
      if(T>=tDe){ droitePrixCe2E(c,[[DX[0],'3,90 €'],[DX[1],'4 €'],[DX[2],'5 €']],DY,{taille:46,z:zoom(T,tDe,.4),hi:{0:null}});
        bondCe2E(c,T,DX[0],DX[1],DY,tQuatre,tDix,'+ 10 c',60,CEN_CE2,46);
        bondCe2E(c,T,DX[1],DX[2],DY,tCinqR,tUnR,'+ 1 €',80,EUR_CE2,46); }
      if(T>=tUnR2) ardoiseVCe2E(c,'1,10 €',528,80,70,{z:zoom(T,tUnR2,.5),lueur:.5});
      if(T>=tUnR2) coche(c,680,80,.5);
      if(T>=tBravo) for(const [x,y] of [[160,120],[900,140]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Idriss a-t-il bien rendu ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,q-.3,'Bien<br>rendu ?',ardoiseMini([['5 € − 3,90 €'],['= 1,10 € ?','#ffd43b']]));
  return { clips,FIN,titre:'Idriss a-t-il bien rendu ?',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:[phraseE('3,90 €, payé 5 €, rendu 1,10 €.',[q,q,q,q,q,q,q,q]),...phraseQ],pause:pauseQ,
      choix:[["Oui, c'est juste",tq('A'),tq('juste')],['Non, il me doit plus',tq('B'),tq('plus')],["Non, il m'a trop rendu",tq('C'),tq('rendu',2)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('+ 10 c + 1 € = 1,10 €',[tDix,tDix,mr('centimes'),tUnR,tUnR,mr('euro'),tUnR2,tUnR2,tUnR2]),phraseE('Bravo, Idriss !',[tBravo,mr('Idriss')])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tIdriss?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tBravo?g.montre():g.salut(T-tBravo,1.4); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
