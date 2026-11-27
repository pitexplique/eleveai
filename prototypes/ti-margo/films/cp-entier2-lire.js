/* ============================================================
   Série Nombres entiers CP — SHORT 07 : « La porte de mamie » (micro cp_entier_lire_ecrire), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js + cp-entier3-dessins.js. Voix : manim/voix/cp-entier-lire-short.json.
   Mamie dit au téléphone « quarante et un » ; trois portes la nuit. Question : laquelle ? C (41) ; pièges 14 et 401.
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = la rue la nuit, la lanterne qui cherche, les plaques « ? ».
   Ceinture blanche. Commentaire : comment écrire soixante-dix ? La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['lire']=function(outils){
  const DUR={'00-accroche':13.42,'01-question':12.72,'01b-reponse':10.78,'02-commentaire':7.71,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tCe=m0('Ce'), tMamie=m0('mamie'), tTel=m0('téléphone'), t41=m0('quarante'), tMais=m0('Mais'), tPortes=m0('portes'), tLaq=m0('Laquelle');
  const mq=w=>mot('01-question',w), tqA=mq('A'), tqB=mq('B'), tqC=mq('C');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tQuar=mr('Quarante'), tQuatre=mr('quatre'), tUn=mr('un',4), t41r=mr('Quarante',2), tBonj=mr('Bonjour');
  const mc=w=>mot('02-commentaire',w), t70=mc('soixante-dix'), tChif=mc('chiffres'), tRep=mc('réponds');
  const finTitre=tCe-.08;

  const XM=[200,528,856], COUL_M=['#ffa8a8','#ffa8a8','#ffa8a8'], NUM=['14','401','41'], TQ=[tqA,tqB,tqC];
  function rue(c,T){ etoilesE(c,T,12,1056,200); luneE(c,960,90,52);
    c.fillStyle='#2b2f33'; c.fillRect(0,690,1056,30); }
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* soixante-dix : comment l'écrire en chiffres ? */
      if(T>=t70) ecrire(c,'soixante-dix',528,220,110*zoom(T,t70,.5),CRAIE.jaune);
      if(T>=tChif) for(const [k,x] of [[0,430],[1,626]]){ const z=zoom(T,tChif+k*.15,.5); if(!z) continue;
        c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.strokeRect(x-80*z,470-100*z,160*z,200*z); ecrire(c,'?',x,470,140*z,k?CRAIE.r0:CRAIE.r1); }
      tab.maj(); return; }
    rue(c,T);
    const dansQ=T>=q;
    /* les trois maisons : la lanterne les cherche avant la question */
    const cible=dansQ?-1:Math.floor(((T-acc)*.55)%3);
    XM.forEach((x,i)=>{ const montre=dansQ&&T>=TQ[i]; const bonne=i===2&&T>=tC;
      maisonE(c,x,690,270,COUL_M[i],{num:montre?NUM[i]:(T>=tPortes?'?':''),numCoul:bonne?'#2b8a3e':'#212529',
        ouvre:T>=tBonj&&i===2?entreE(T,tBonj,tBonj+.8):0,allume:T>=tBonj&&i===2?1:0,
        eclaire:dansQ?(bonne?.8+.2*Math.sin(T*5):.4):(i===cible?1:0),terne:T>=tC&&i<2?1:0});
      if(dansQ&&T>=TQ[i]) ecrire(c,'ABC'[i],x,250,60*zoom(T,TQ[i],.5),bonne?CRAIE.ok:CRAIE.jaune); });
    if(T>=tBonj) mamieE(c,XM[2],690-283+.15*283+10,1.15,entreE(T,tBonj+.5,tBonj+1),T);
    if(!dansQ&&T>=tMamie) faisceauE(c,10,700,XM[cible]+0*Math.sin(T),540,entreE(T,tMamie,tMamie+.6));
    /* au téléphone : « quarante et un » */
    if(T>=tTel&&T<r) { bulleE(c,528,110,540,110,300,250,T>=t41?'quarante et un':'📞',T>=t41?62:60,zoom(T,tTel,.4)); if(T<tMais) ondesE(c,800,110,T); }
    if(T>=tLaq&&!dansQ) for(const x of XM) etincelle(c,x,240,12+5*Math.sin(T*6+x));
    /* la réponse : un 4 devant, un 1 derrière */
    if(T>=r&&T>=tQuar){ c.fillStyle='rgba(31,59,44,.9)'; c.beginPath(); c.roundRect(378,22,300,180,30); c.fill();
      if(T>=tQuatre) ecrire(c,'4',480,115,150*zoom(T,tQuatre,.5),CRAIE.r1);
      if(T>=tUn) ecrire(c,'1',580,115,150*zoom(T,tUn,.5),CRAIE.r0);
      if(T>=t41r) for(const [x,y] of [[350,60],[706,60],[528,215]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Quelle est la porte de mamie ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('Quarante : un 4 devant.',[tQuar,tQuar,mr('un'),tQuatre,mr('devant')]);
  const r2=phraseE('Et un : un 1 derrière.',[mr('Et'),mr('un',2),mr('un',2),mr('un',3),tUn,mr('derrière')]);

  poserMiniature(outils,q-.3,'Quelle porte<br>est chez mamie ?',ardoiseMini([['🏠 🏠 🏠'],['? ? ?','#ffd43b']]));
  return { clips,FIN,titre:'La porte de mamie',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['14',tq('A'),tq('quatorze')],['401',tq('B'),tq('quatre')],['41',tq('C'),tq('quarante')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tMais?g.montre():(T<tLaq?g.oups():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tBonj?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
