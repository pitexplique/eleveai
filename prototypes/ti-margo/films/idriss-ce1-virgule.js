/* ============================================================
   Série Idriss le pêcheur — SHORT 16 : « La mouette et l'ardoise » (micro ce1_monnaie_virgule), 28/11/2026.
   Voix VALIDÉES : manim/voix/idriss-ce1-virgule-short.json (manim/SCRIPTS-monnaie-idriss.md, CE1 5).
   Sur l'ardoise : sardine 1,05 €. Combien de centimes après l'euro ? Bonne réponse B (5 c).
   Commentaire : écrire 7 € et 40 c avec une virgule. Ceinture blanche. La virgule est GROSSE et blanche.
   ============================================================ */
FILMS['ce1-virgule']=function(outils){
  const DUR={'00-accroche':8.885,'01-question':14.24,'01b-reponse':11.32,'02-commentaire':9.035,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:40px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tUne=m0('Une'), tMouette=m0('mouette'), tArdoise=m0("l'ardoise"), tSardine=m0('sardine'), tUn=m0('un'), tVirg=m0('virgule'), tCinq=m0('cinq'), tPenche=m0('penche');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tDerriere=mr('Derrière'), tZero=mr('zéro'), tCinqR=mr('cinq',2), tUnR=mr('Un'), tCinqR2=mr('cinq',3), tPas=mr('Pas');
  const mc=w=>mot('02-commentaire',w), tSeptC=mc('sept'), tQuarC=mc('quarante'), tVirgC=mc('virgule'), tRep=mc('réponds');
  const finTitre=tUne-.08;

  function quai(c,T){ merE(c,T,230); c.fillStyle='#a47148'; c.fillRect(0,540,1056,180); c.strokeStyle='#6b4423'; c.lineWidth=4; c.beginPath(); c.moveTo(0,540); c.lineTo(1056,540); c.stroke(); }
  const AX=400, AY=370;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 7 € et 40 c avec une virgule */
      quai(c,T);
      if(T>=tSeptC) ecrire(c,T>=tQuarC?'7 € et 40 c':'7 €',528,220,110*zoom(T,tSeptC,.4),CRAIE.blanc);
      if(T>=tVirgC){ ecrire(c,'=',528,370,100,CRAIE.blanc); ecrire(c,'? , ?',528,480,120*zoom(T,tVirgC,.4),CRAIE.jaune); }
      tab.maj(); return; }

    quai(c,T);
    idrissE(c,900,720,1.2,{montre:T>=tArdoise&&T<tPenche?1:0,T});
    /* l'ardoise d'Idriss : sardine 1,05 € (la virgule grosse et blanche) */
    if(T>=tArdoise){ ardoisePrixE(c,AX,AY,[['sardine',CRAIE.blanc],[' ',CRAIE.blanc]],88,{z:zoom(T,tArdoise,.4)}); }
    let P=null; if(T>=tUn) P=prixVirguleE(c,'1','05',AX,AY+55,96,{lueurV:T>=tVirg&&T<tCinq+.8?.5+.5*Math.sin(T*8):0});
    /* la mouette posée sur l'ardoise, qui penche la tête */
    if(T>=tMouette){ const p=sautE([-100,60],[AX+40,AY-200],entreE(T,tMouette-.4,tMouette+.5),40), pose=T>=tMouette+.5;
      c.save(); if(pose&&T>=tPenche&&T<r){ c.translate(p[0],p[1]); c.rotate(.25*Math.sin(Math.min(1,(T-tPenche)*2)*1.57)); c.translate(-p[0],-p[1]); }
      mouetteE(c,p[0],p[1],2.4,{aile:pose?0:1,T,dir:1}); c.restore(); }
    if(T>=tPenche&&T<r) ecrire(c,'?',AX+190,AY-260,90*zoom(T,tPenche,.4),CRAIE.jaune);
    if(T>=r&&P){
      if(T>=tDerriere) entoureE(c,P.cC,AY+62,P.wC,90,entreE(T,tDerriere,tZero+.3));
      if(T>=tCinqR) formuleE(c,T,500,640,['1,05 €','=','1 € et 5 c'],[tCinqR,tUnR,tUnR],56,[CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tCinqR) ecrire(c,'5 c',660,140,90*zoom(T,tCinqR,.4),CRAIE.ok);
      if(T>=tPas) ecrire(c,'pas 50 c !',820,110,60*zoom(T,tPas,.4),CRAIE.faux); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Combien de centimes après l'euro ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];

  miniCe1E(outils,q+3,'1,05 € :<br>combien de centimes ?',ardoiseMini([['1,05 €'],['… c ?','#ffd43b']]));
  return { clips,FIN,titre:"La mouette et l'ardoise",ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['50 c',tq('A'),tq('centimes',2)],['5 c',tq('B'),tq('centimes',3)],['105 c',tq('C'),tq('centimes',4)]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('1,05 € = 1 € et 5 c',[tCinqR,tCinqR,tUnR,tUnR,tUnR,tUnR,tCinqR2,tCinqR2])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tPenche?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tPas?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
