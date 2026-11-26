/* ============================================================
   Série Suites CP — SHORT 03 : « De 2 en 2 » (micro cp_suite_2_5_10). Outils : cp-commun.js + cp-suite.js (+ cp-entier.js).
   Voix : manim/voix/cp-suite-pas-short.json (validée). Des chaussettes partout : 2, 4, 6, 8. Encore une paire : combien ?
   C (10). Commentaire : compte de 5 en 5 jusqu'à 30 (des mains). Ceinture blanche.
   ⭐ La question se joue SUR l'ardoise : les chaussettes restent visibles ; la carte est à droite sous l'ardoise (carteCoteE).
   ============================================================ */
FILMS['pas']=function(outils){
  const DUR={'00-accroche':8.03,'01-question':13.4,'01b-reponse':6.57,'02-commentaire':7.37,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2); /* 26/11 : fin courte, 1,5 s pour lire */
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  carteCoteE(); finCourteS(); /* comme les shorts nombres entiers (26/11) : carte à droite sous l'ardoise, Ti Margo petit à gauche */

  const tDes=mot('00-accroche','Des'), tCh=mot('00-accroche','chaussettes'), tPart=mot('00-accroche','partout');
  const t2=[mot('00-accroche','deux',3),mot('00-accroche','quatre'),mot('00-accroche','six'),mot('00-accroche','huit')];
  const tEnc=mot('01-question','Encore'), tPaire=mot('01-question','paire'), tComb=mot('01-question','Combien');
  const t8r=mot('01b-reponse','huit'), t10r=mot('01b-reponse','dix'), tDix2=mot('01b-reponse','dix',2);
  const t5=mot('02-commentaire','cinq',1), t30=mot('02-commentaire','trente'), tDis=mot('02-commentaire','Dis-le'), tRep=mot('02-commentaire','réponds');
  const finTitre=tDes-.08;

  const XP=[150,337,524,711,898];
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 6 mains, de 5 en 5 jusqu'à 30 */
      const xs=[110,277,444,611,778,945];
      xs.forEach((x,i)=>{ mainS(c,x,250,.85,zoom(T,com+.2+i*.1,.4),i===0?pulseS(T,t5,t5+1):(i===5?pulseS(T,t30,t30+1):0));
        if(i===0&&T>=t5) etiquette(c,'5',x,470,T,t5,CRAIE.jaune,76);
        else if(i===5&&T>=t30) etiquette(c,'30',x,470,T,t30,CRAIE.ok,76);
        else if(i>0&&i<5&&T>=t5+.5) etiquette(c,'?',x,470,T,t5+.5+i*.12,CRAIE.blanc,70); });
      if(T>=tDis) for(const [x,y] of [[200,620],[528,640],[860,620]]) etincelle(c,x,y,18+7*Math.sin(T*6+x));
      tab.maj(); return; }
    cordeS(c,40,1016,150);
    XP.forEach((x,i)=>{ if(i<4){ const t0=tCh+i*.15; if(T<t0) return;
        paireS(c,x,150,1,COUL_CH[i],zoom(T,t0,.4),T>=r?pulseS(T,i===3?t8r:1e9,t8r+.8):pulseS(T,t2[i],t2[i]+.8));
        if(T>=t2[i]) etiquette(c,String(2*(i+1)),x,470,T,t2[i],CRAIE.jaune,80); }
      else { if(T<tPaire-.6) return; /* la 5e paire arrive de la droite */
        const v=douxE(entreE(T,tPaire-.6,tPaire+.4)); paireS(c,x+260*(1-v),150,1,COUL_CH[4],1,pulseS(T,t10r,t10r+1.5));
        if(T>=tComb&&T<t10r) etiquette(c,'?',x,470,T,tComb,CRAIE.blanc,80);
        if(T>=t10r) etiquette(c,'10',x,470,T,t10r,CRAIE.ok,80); } });
    for(let i=0;i<3;i++){ const t=t2[i+1]-.3; if(T>=t) arcS(c,XP[i],XP[i+1],408,'+2',entreE(T,t,t+.35),CRAIE.jaune,36); }
    if(T>=tPaire+.4) arcS(c,XP[3],XP[4],408,'+2',entreE(T,tPaire+.4,tPaire+.8),CRAIE.jaune,40);
    if(T>=tDix2) ecrire(c,'10',528,640,150*zoom(T,tDix2,.5),CRAIE.ok);
    if(T>=tPart&&T<q) for(const [x,y] of [[90,520],[300,600],[760,600],[980,520]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    tab.maj(); }

  const qd=dit('01-question'); qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const lA=lettreS(A,'01-question','A'), lB=lettreS(A,'01-question','B'), lC=lettreS(A,'01-question','C'), lR=lettreS(A,'01b-reponse','C').t;

  poserMiniature(outils,t2[3]+.6,'2, 4, 6, 8…<br>et après ?'+PARI,ardoiseMini([['2 4 6 8','#ffd43b'],['?','#8ce99a']]));
  return { clips,FIN,titre:'De 2 en 2',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:2,tBon:lR-r,
      phrase:[phraseE('Combien ?',[tComb,tComb])],pause:pauseQ,
      choix:[['9',lA.t-q,lA.apres-q],['12',lB.t-q,lB.apres-q],['10',lC.t-q,lC.apres-q]],
      tete:[[r+.1,'Réponse '],[lR,'C !']],reponse:[phraseE('8 + 2 = 10',[t8r,t8r,t8r,t10r,t10r])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<com) g.fier();
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.fier(); } /* 26/11 : même fin que les paysages */
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
