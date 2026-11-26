/* ============================================================
   Série Suites CP — SHORT 05 : « Il manque un nombre ! » (micro cp_suite_defi). Outils : cp-commun.js + cp-suite.js (+ cp-entier.js).
   Voix : manim/voix/cp-suite-defi-short.json (validée). La fusée décolle à zéro, mais le compte à rebours a un trou :
   5, 4, ?, 2, 1, 0 → A (3). Décollage ! Commentaire : 90, 80, 70… quel nombre vient après ? Ceinture blanche.
   ⭐ La question se joue SUR l'ardoise : la fusée et les cases restent visibles ; la carte est à droite sous l'ardoise (carteCoteE).
   ============================================================ */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':7.06,'01-question':14.86,'01b-reponse':6.74,'02-commentaire':8.97,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2); /* 26/11 : fin courte, 1,5 s pour lire */
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  carteCoteE(); finCourteS(); /* comme les shorts nombres entiers (26/11) : carte à droite sous l'ardoise, Ti Margo petit à gauche */

  const tLa=mot('00-accroche','La'), tFus=mot('00-accroche','fusée'), tZero0=mot('00-accroche','zéro'), tManque=mot('00-accroche','manque');
  const lu=[mot('01-question','Cinq'),mot('01-question','quatre'),mot('01-question','trou'),mot('01-question','deux'),mot('01-question','un',2),mot('01-question','zéro')];
  const tReb=mot('01b-reponse','recule'), r4=mot('01b-reponse','quatre'), r3=mot('01b-reponse','trois'), r2=mot('01b-reponse','deux'), tDec=mot('01b-reponse','Décollage');
  const c90=[mot('02-commentaire','quatre-vingt-dix'),mot('02-commentaire','quatre-vingts'),mot('02-commentaire','soixante-dix')], tQuel=mot('02-commentaire','Quel'), tRep=mot('02-commentaire','Réponds');
  const finTitre=tLa-.08;

  const XS=[95,260,425,590,755,920], N=['5','4','','2','1','0'];
  function dessiner(T){ const c=tab.c; tab.effacer();
    etoilesE(c,T,14,1056,170);
    if(T>=com){ /* le défi : 90, 80, 70… et après ? */
      const xs=[180,405,630,855];
      c90.forEach((t,i)=>{ if(T>=t) caseS(c,['90','80','70'][i],xs[i],400,170,zoom(T,t,.5)); });
      for(let i=0;i<2;i++){ const t=c90[i+1]-.2; if(T>=t) arcS(c,xs[i],xs[i+1],307,'−10',entreE(T,t,t+.4),CRAIE.ret,60); }
      if(T>=tQuel){ caseS(c,'',xs[3],400,170,zoom(T,tQuel,.5),{trou:true}); arcS(c,xs[2],xs[3],307,'',entreE(T,tQuel,tQuel+.4),CRAIE.ret,60); }
      tab.maj(); return; }
    /* la fusée sur sa rampe (à droite) ; elle décolle à « Décollage » */
    const vol=entreE(T,tDec-.2,tDec+2), y=420-850*vol*vol, feu=T>=tDec-.25?1:(T>=r3?.4:0);
    rampeS(c,890,420,200);
    if(T>=r3) fumeeS(c,890,430,T,entreE(T,r3,r3+1)*(1+vol));
    aGrandS(c,890,260,zoom(T,tFus,.4),()=>fuseeS(c,890,y,1,feu,T));
    /* les 6 cases du compte à rebours */
    if(T>=tZero0&&T<tManque) caseS(c,'0',XS[5],590,140,zoom(T,tZero0,.5),{coul:'#2b8a3e'});
    if(T>=tManque) XS.forEach((x,i)=>{ const t0=tManque+i*.1, lueur=T>=q&&T<r?pulseS(T,lu[i],lu[i]+.9):0;
      if(i===2){ if(T>=r3) caseS(c,'3',x,590,140,zoom(T,r3,.5),{coul:'#2b8a3e',lueur:pulseS(T,r3,tDec)}); else caseS(c,'',x,590,140,zoom(T,t0,.4),{trou:true,lueur}); }
      else caseS(c,N[i],x,590,140,zoom(T,t0,.4),{lueur,coul:i===5?'#2b8a3e':'#343a40'}); });
    if(T>=tReb) for(let i=0;i<5;i++){ const t=tReb+i*.2; arcS(c,XS[i],XS[i+1],512,'−1',entreE(T,t,t+.35),CRAIE.ret,48); }
    if(T>=tDec) for(const [x,yy] of [[640,140],[1000,220],[700,330]]) etincelle(c,x,yy,18+7*Math.sin(T*7+x));
    tab.maj(); }

  const qd=dit('01-question'); qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const lA=lettreS(A,'01-question','A'), lB=lettreS(A,'01-question','B'), lC=lettreS(A,'01-question','C'), lR=lettreS(A,'01b-reponse','A').t;

  poserMiniature(outils,tManque+1,'Il manque<br>un nombre !'+PARI,ardoiseMini([['5 4 ? 2 1 0','#ffd43b']],420,180));
  return { clips,FIN,titre:'Il manque un nombre !',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:0,tBon:lR-r,
      phrase:[phraseE('5, 4, ?, 2, 1, 0',lu)],pause:pauseQ,
      choix:[['3',lA.t-q,lA.apres-q],['6',lB.t-q,lB.apres-q],['1',lC.t-q,lC.apres-q]],
      tete:[[r+.1,'Réponse '],[lR,'A !']],reponse:[phraseE('4, 3, 2',[r4,r3,r2])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<q){ T<tManque?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tDec?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.fier(); } /* 26/11 : même fin que les paysages */
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
