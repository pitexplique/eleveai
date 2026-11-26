/* ============================================================
   Série Nombres entiers CP — SHORT 01 : « Qui a raison ? » (micro cp_entier_denombre). Outils : cp-commun.js + cp-entier.js.
   Le copain a compté 8 fraises, Ti Margo en compte 7. On compte ensemble : 7 ! Le copain en a compté une deux fois.
   Question : qui a raison ? A (Ti Margo). Ceinture blanche. Commentaire : combien de cerises ? (9)
   ⭐ La question se joue SUR l'ardoise : les fraises restent visibles pendant la pause, la carte se range à droite, Ti Margo à gauche (26/11).
   ============================================================ */
FILMS['denombre']=function(outils){
  const DUR={'00-accroche':8.62,'01-question':10.99,'01b-reponse':9.49,'02-commentaire':8.04,'03-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  carteCoteE(); /* 26/11 : carte à droite, Ti Margo à gauche (voir cp-entier.js) : l'ardoise et Ti Margo restent visibles */

  const tMon=mot('00-accroche','Mon'), tFr=mot('00-accroche','fraises'), tHuit=mot('00-accroche','huit'), tSept=mot('00-accroche','sept');
  const tN=k=>mot('01b-reponse',NOMBRES_E[k]);
  const tCop=mot('01b-reponse','copain'), tDeuxF=mot('01b-reponse','deux',2);
  const tCer=mot('02-commentaire','cerises'), tComb=mot('02-commentaire','combien'), tPerl=mot('02-commentaire','perles'), tRep=mot('02-commentaire','réponds');
  const finTitre=tMon-.08;

  /* Les 7 fraises, en désordre sur l'assiette */
  const FR=[[225,425],[390,385],[560,428],[728,382],[870,432],[385,562],[650,556]];
  const haut=k=>k<5;  /* rang du haut : le nombre au-dessus ; rang du bas : en dessous */
  /* Les 9 cerises du défi */
  const CE=[[250,330],[380,300],[520,340],[660,300],[800,330],[310,500],[460,480],[610,510],[760,480]];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : des cerises, brillantes comme des perles */
      CE.forEach(([x,y],k)=>ceriseCraie(c,x,y,46,zoom(T,tCer+k*.06,.4)));
      if(T>=tPerl) for(const [x,y] of CE) etincelle(c,x-18,y-18,13+5*Math.sin(T*6+x));
      if(T>=tComb) ecrire(c,'?',528,640,96*zoom(T,tComb,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* l'assiette et ses fraises (rouges comme des petits cœurs) */
    if(T>=tFr){ assietteCraie(c,540,480,900,zoom(T,tFr,.4));
      FR.forEach(([x,y],k)=>{ const allume=T>=r&&T>=tN(k+1); fraiseCraie(c,x,y,56,zoom(T,tFr+k*.07,.4),allume?.6+.4*Math.sin(T*5):0); }); }
    /* les deux avis : le copain (8), Ti Margo (7) */
    if(T>=tHuit&&T<r){ ecrire(c,'8 ?',290,130,96*zoom(T,tHuit,.4),CRAIE.ret); }
    if(T>=tSept&&T<r){ ecrire(c,'7 ?',770,130,96*zoom(T,tSept,.4),CRAIE.r0); }
    if(T>=r){ /* on compte ensemble : 1 → 7 */
      FR.forEach(([x,y],k)=>etiquette(c,String(k+1),x,haut(k)?y-108:y+100,T,tN(k+1),CRAIE.ok,56));
      if(T>=tN(7)) ecrire(c,'7',90,110,120*zoom(T,tN(7),.5),CRAIE.ok);
      /* l'erreur du copain : la fraise n° 2 comptée deux fois */
      if(T>=tCop){ const [x,y]=FR[1]; cercle(c,x,y,88,CRAIE.faux,entreE(T,tCop,tCop+.4)); }
      if(T>=tDeuxF){ const [x,y]=FR[1]; etiquette(c,'3',x+92,y-30,T,tDeuxF+.25,CRAIE.faux,48); }
    }
    tab.maj();
  }

  const qd=dit('01-question'), rd=dit('01b-reponse');
  qd('Question !');
  const phraseQ=[qd('Qui a raison ?')];
  const tq=(m,n=1)=>mot('01-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et compte !')];
  const tA=mot('01b-reponse','A');
  rd.jusque('Mon'); const r1=rd('Mon copain a compté'), r2=rd('une fraise deux fois !');

  poserMiniature(outils,acc+1,'8 ou 7<br>fraises ?'+PARI,ardoiseMini([['8 ?','#ff922b'],['7 ?','#74c0fc']]));
  return { clips,FIN,titre:'Combien de fraises ?',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['moi : 7',tq('A'),tq('moi')],['mon copain : 8',tq('B'),tq('copain')],['les deux',tq('C'),tq('deux')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<q){ T<tSept?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tCop?g.montre():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
