/* ============================================================
   Série Nombres entiers CP — SHORT 08 : « La tirelire » (micro cp_entier_decomposer), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js + cp-entier3-dessins.js. Voix : manim/voix/cp-entier-decomposer-short.json.
   La tirelire cochon tremble, s'ouvre : 4 billets de 10 € et 6 pièces de 1 €. Question : combien d'euros ? B (46) ; pièges 10 et 64.
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = la tirelire qui tremble et tinte + « Combien d'euros sont cachés dedans ? ».
   Ceinture blanche. Commentaire : 20 + 9 = ? La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['decomposer']=function(outils){
  const DUR={'00-accroche':13.39,'01-question':13.07,'01b-reponse':10.64,'02-commentaire':7.28,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tMa=m0('Ma'), tLourde=m0('lourde'), tSecoue=m0('secoue'), tD1=m0('ding'), tD2=m0('ding',2), tComb=m0('Combien'),
    tQuatre=m0('Quatre'), tDix=m0('dix'), tSix=m0('six'), tUn=m0("d'un");
  const mq=w=>mot('01-question',w), tqA=mq('A'), tqB=mq('B'), tqC=mq('C');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tR4=mr('Quatre'), tR40=mr('quarante'), tR6=mr('Six'), tR6b=mr('six',2), tRq=mr('Quarante',2), tRp=mr('plus'), tR6c=mr('six',3), tR46=mr('quarante-six');
  const mc=w=>mot('02-commentaire',w), t20=mc('vingt'), tPlus=mc('plus'), t9=mc('neuf'), tComb2=mc('combien'), tRep=mc('réponds');
  const finTitre=tMa-.08;

  /* la tirelire sur son étagère, à gauche ; les billets (2 × 2) et les pièces (une ligne) à droite */
  const TX=250, TY=560, TS=1.15, TRAPPE=[TX-10*TS,TY-60*TS];
  const BIL=[[590,175],[805,175],[590,320],[805,320]], PIE=[0,1,2,3,4,5].map(k=>[520+k*76,480]);
  const vole=(T,t0,a,b,h=150)=>{ const u=entreE(T,t0,t0+.7); return u<=0?null:sautE(a,b,u,h); };
  const pulse=(T,t0,t1)=>T>=t0&&T<t1?1+.14*Math.sin(T*7):1;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 20 + 9 = ? */
      const Y=230;
      if(T>=t20) ecrire(c,'20',300,Y,140*zoom(T,t20,.5),CRAIE.r1);
      if(T>=tPlus) ecrire(c,'+',445,Y,120*zoom(T,tPlus,.5),CRAIE.blanc);
      if(T>=t9) ecrire(c,'9',570,Y,140*zoom(T,t9,.5),CRAIE.r0);
      if(T>=tComb2){ ecrire(c,'=',690,Y,120,CRAIE.blanc); ecrire(c,'?',820,Y,150*zoom(T,tComb2,.5)*(1+.06*Math.sin(T*6)),CRAIE.jaune); }
      if(T>=t20) for(const [k,x] of [[0,180],[1,410]]) billetDixE(c,x,520,200,zoom(T,t20+k*.15,.5));
      if(T>=t9) for(let k=0;k<9;k++) pieceUnE(c,590+(k%5)*82,k<5?460:560,36,zoom(T,t9+k*.06,.5));
      tab.maj(); return; }
    etagereE(c,60,TY,420);
    const ouvre=T>=tQuatre?1:0, tremble=T>=tSecoue&&T<tComb+.8?1:(T<q&&T>=tLourde?.25:0);
    tirelireE(c,TX,TY,TS,tremble,T,ouvre);
    /* ding, ding ! */
    for(const [t,x,y] of [[tD1,120,300],[tD2,410,290]]) if(T>=t&&T<t+1.1){ const z=zoom(T,t,.4); ecrire(c,'ding !',x,y-30*entreE(T,t,t+1.1),46*z,CRAIE.jaune); ondesE(c,x+70,y,T); }
    /* « Combien d'euros ? » : un ? qui brille au-dessus */
    if(T>=tComb&&T<r){ ecrire(c,'?',TX,170,130*zoom(T,tComb,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T<tQuatre) for(const [x,y] of [[TX-110,140],[TX+110,150],[780,260]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    /* les 4 billets de 10 €, puis les 6 pièces de 1 €, qui s'envolent de la trappe */
    const pb=[], pp=[];
    BIL.forEach((b,k)=>{ const t0=tQuatre+.15+k*.22; if(T<t0) return; const p=T<t0+.7?vole(T,t0,TRAPPE,b,170):b; pb.push(p);
      const lueur=T>=r&&T>=tR4+k*.32?1:0;
      billetDixE(c,p[0],p[1],200,1,T<t0+.7?.5*(1-entreE(T,t0,t0+.7)):0,lueur); });
    PIE.forEach((b,k)=>{ const t0=tSix+.05+k*.12; if(T<t0) return; const p=T<t0+.7?vole(T,t0,TRAPPE,b,140):b; pp.push(p);
      pieceUnE(c,p[0],p[1],36,1,T>=r&&T>=tR6+k*.12?1:0); });
    /* 4 billets, 6 pièces : les nombres écrits */
    if(T>=tQuatre+.2) etiquette(c,'4',975,248,T,tQuatre+.2,CRAIE.r1,70);
    if(T>=tSix) etiquette(c,'6',985,480,T,tSix,CRAIE.r0,70);
    /* la réponse : 10, 20, 30, 40 sur les billets ; + 6 ; 40 + 6 = 46 */
    if(T>=r){ ['10','20','30','40'].forEach((s,k)=>{ const t0=tR4+k*.32; if(T<t0) return; const z=zoom(T,t0,.5), [x,y]=BIL[k];
        c.fillStyle='#1f3b2c'; c.beginPath(); c.roundRect(x-90*z,y-44*z,180*z,88*z,18); c.fill(); c.strokeStyle=CRAIE.r1; c.lineWidth=4; c.stroke();
        ecrire(c,s,x,y+3,68*z,CRAIE.r1); });
      const Y=655;
      if(T>=tR40) ecrire(c,'40',400,Y,110*zoom(T,tR40,.5),CRAIE.r1);
      if(T>=tR6b){ ecrire(c,'+',515,Y,100*zoom(T,tR6b,.5),CRAIE.blanc); ecrire(c,'6',610,Y,110*zoom(T,tR6b,.5),CRAIE.r0); }
      if(T>=tR46){ ecrire(c,'=',705,Y,100,CRAIE.blanc); nombreDUE(c,'46',835,Y,120,[CRAIE.r1,CRAIE.r0],[zoom(T,tR46,.5),zoom(T,tR46+.12,.5)]);
        ecrire(c,'€',948,Y,80,CRAIE.ok);
        for(const [x,y] of [[760,585],[995,600]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      const pz=pulse(T,tRq,tR46); if(T>=tRq&&T<tR46){ c.strokeStyle=CRAIE.jaune; c.lineWidth=6*pz; c.beginPath(); c.roundRect(320,Y-66,360,132,30); c.stroke(); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Combien d'euros dans ma tirelire ?")];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('4 billets de 10 : 40.',[tR4,mr('billets'),mr('de'),mr('dix'),mr('dix'),tR40]);
  const r2=phraseE('40 + 6 = 46 €',[tRq,tRp,tR6c,tR46,tR46,mr('euros')]);

  poserMiniature(outils,q-.3,'Combien dans<br>ma tirelire ?',ardoiseMini([['🐷 💶'],['?','#ffd43b']]));
  return { clips,FIN,titre:'La tirelire',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10',tq('A'),tq('dix')],['46',tq('B'),tq('quarante-six')],['64',tq('C'),tq('soixante-quatre')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tSecoue?g.montre():(T<tComb?g.oups():(T<tQuatre?g.reflechit():g.fier())); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tR46?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
