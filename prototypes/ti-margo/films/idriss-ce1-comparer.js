/* ============================================================
   Série Idriss le pêcheur — SHORT 14 : « Le crabe têtu » (micro ce1_monnaie_comparer_ensembles), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-comparer-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 3).
   Le crabe a dix pièces de 10 c, la mouette une pièce de 2 € : qui est le plus riche ? Bonne réponse C (la mouette).
   Commentaire : cinq pièces de 20 c ou une pièce de 1 € ? Ceinture blanche.
   ============================================================ */
FILMS['ce1-comparer']=function(outils){
  const DUR={'00-accroche':12.195,'01-question':12.265,'01b-reponse':11.235,'02-commentaire':10.225,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:40px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tLe=m0('Le'), tCrabe=m0('crabe'), tDix=m0('dix'), tMouette=m0('mouette'), tDeux=m0('deux'), tCrie=m0('crie'), tRiche=m0('riche');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tDixR=mr('Dix'), tCent=mr('cent'), tUn=mr('un'), tDeuxR=mr('deux'), tPlusR=mr('Plus'), tMoins=mr('moins');
  const mc=w=>mot('02-commentaire',w), tCinqC=mc('cinq'), tUnC=mc('un'), tLequel=mc('Lequel'), tRep=mc('réponds');
  const finTitre=tLe-.08;

  /* la montagne de pièces de 10 c (4 + 3 + 2 + 1) sous le crabe */
  const PILE=[]; [[4,560],[3,490],[2,420],[1,350]].forEach(([n,y],j)=>{ for(let k=0;k<n;k++) PILE.push([260+(k-(n-1)/2)*108,y]); });
  const MOU=[790,420];
  function quai(c,T){ merE(c,T,230); c.fillStyle='#a47148'; c.fillRect(0,560,1056,160); c.strokeStyle='#6b4423'; c.lineWidth=4; c.beginPath(); c.moveTo(0,560); c.lineTo(1056,560); c.stroke(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : cinq pièces de 20 c, ou une pièce de 1 € ? */
      quai(c,T);
      if(T>=tCinqC) [[100,300],[230,300],[360,300],[165,430],[295,430]].forEach(([x,y],k)=>centimeE(c,20,x,y,80,{z:zoom(T,tCinqC+k*.1,.5)}));
      if(T>=tCinqC) ecrire(c,'5 × 20 c',230,560,60,CRAIE.jaune);
      if(T>=tUnC){ ecrire(c,'ou',590,360,60,CRAIE.blanc); euroE(c,1,820,360,100,{z:zoom(T,tUnC,.5)}); ecrire(c,'1 €',820,520,60,CRAIE.jaune); }
      if(T>=tLequel) ecrire(c,'?',528,650,110*zoom(T,tLequel,.5),CRAIE.jaune);
      tab.maj(); return; }

    quai(c,T);
    /* le crabe sur sa montagne de dix pièces de 10 c */
    if(T>=tCrabe) PILE.forEach(([x,y],k)=>{ if(T>=tDix+k*.06) centimeE(c,10,x,y,78,{lueur:T>=r&&T>=tDixR&&T<tUn?.5:0}); });
    if(T>=tCrabe) crabeE(c,260,250,1.3,{z:zoom(T,tCrabe,.4),T,marche:T>=tCrie&&T<q?1:0});
    if(T>=r) coquilleCacheE(c,260,300,240,entreE(T,tMoins-.2,tMoins+.5));
    if(T>=tDix&&T<r) ecrire(c,'10 × 10 c',260,660,60*zoom(T,tDix,.4),CRAIE.jaune);
    /* la mouette et sa pièce de 2 € dans le bec */
    if(T>=tMouette){ const p=sautE([1150,80],MOU,entreE(T,tMouette-.4,tMouette+.5),40);
      mouetteE(c,p[0],p[1],2.7,{aile:T<tMouette+.5?1:0,T,dir:-1,lueur:T>=r&&T>=tDeuxR&&T<tPlusR?.6:0});
      euroE(c,2,p[0]-100,p[1]+15,56,{z:zoom(T,tDeux,.4)}); }
    if(T>=tDeux&&T<r) ecrire(c,'2 €',MOU[0],660,64*zoom(T,tDeux,.4),CRAIE.jaune);
    if(T>=tCrie&&T<r) bulleE(c,580,90,660,120,300,200,'Le plus riche, c’est moi !',40,zoom(T,tCrie,.4));
    if(T>=r){
      formuleE(c,T,528,70,['10 × 10 c','=','100 c','=','1 €'],[tDixR,tCent,tCent,tUn,tUn],56,[CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tDeuxR) formuleE(c,T,528,170,['2 €','>','1 €'],[tDeuxR,tDeuxR+.3,tDeuxR+.5],84,[CRAIE.ok,CRAIE.blanc,CRAIE.jaune]);
      if(T>=tPlusR) sommeE(c,'plus de pièces… moins d’argent !',528,650,44,{z:zoom(T,tPlusR,.4),coul:'#ffc078'}); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Qui a le plus d'argent ?")];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,q-.3,'Qui a le plus<br>d’argent ?',ardoiseMini([['10 × 10 c'],['ou  2 € ?','#ffd43b']]));
  return { clips,FIN,titre:'Le crabe têtu',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['Le crabe',tq('A'),tq('crabe')],['Les deux pareil',tq('B'),tq('pareil')],['La mouette',tq('C'),tq('mouette')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],
      reponse:[phraseE('10 × 10 c = 1 €',[tDixR,tDixR,tDixR,tDixR,tUn,tUn,tUn]),phraseE('2 € > 1 €',[tDeuxR,tDeuxR,tDeuxR,tDeuxR,tDeuxR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tCrie?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tPlusR?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
