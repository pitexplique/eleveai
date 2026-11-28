/* ============================================================
   Série Idriss, monnaie CP — SHORT 10 : « Le filet du voisin » (micro cp_monnaie_rendre), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-rendre-short.json.
   Le voisin achète un filet à 9 € et donne un billet de 10 € : combien Idriss rend-il ? Bonne réponse A (1 €).
   Ceinture blanche. Commentaire : une glace à 3 €, payée avec un billet de 10 €.
   ============================================================ */
FILMS['cp-rendre']=function(outils){
  const DUR={'00-accroche':7.595,'01-question':12.615,'01b-reponse':6.625,'02-commentaire':10.635,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tLe=m0('Le'), tVoisin=m0('voisin'), tFilet=m0('filet'), tNeuf0=m0('neuf'), tDonne=m0('donne'), tDix0=m0('dix');
  const mq=w=>mot('01-question',w), tCombien=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tNeuf=mr('Neuf'), tDix=mr('dix'), tSeul=mr('seul'), tRend=mr('rend'), tEuro=mr('euro');
  const mc=w=>mot('02-commentaire',w), tGlace=mc('glace'), tTrois=mc('trois'), tDixC=mc('dix'), tCombienC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tLe-.08;

  function etal(c){ c.fillStyle='#c08550'; c.fillRect(0,480,1056,240); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,480); c.lineTo(1056,480); c.stroke();
    c.fillStyle='rgba(255,255,255,.15)'; c.fillRect(0,486,1056,10); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* une glace à 3 €, payée avec un billet de 10 € */
      if(T>=tGlace) glaceE(c,280,680,2.4,{z:zoom(T,tGlace,.4)});
      if(T>=tTrois) prixE(c,'3 €',280,170,90,{z:zoom(T,tTrois,.5)});
      if(T>=tDixC) euroE(c,10,770,300,66,{z:zoom(T,tDixC,.4),grand:1});
      if(T>=tCombienC) ecrire(c,'rendu : ?',770,580,90*zoom(T,tCombienC,.5),CRAIE.jaune);
      tab.maj(); return; }

    etal(c);
    if(T>=tVoisin) idrissE(c,940,720,1.35,{T,cire:'#69db7c',cireB:'#2b8a3e',peau:'#8d5524',montre:T>=tDonne&&T<q?1:0});
    if(T>=tFilet) filetRouleE(c,330,630,330,{z:zoom(T,tFilet,.4)});
    if(T>=tNeuf0) prixE(c,'9 €',330,400,90,{z:zoom(T,tNeuf0,.5),lueur:T>=r&&T>=tNeuf&&T<tDix?.6:0});
    if(T>=tDix0) euroE(c,10,690,290,60,{z:zoom(T,tDix0,.4),grand:1,a:-.08,lueur:T>=r&&T>=tDix&&T<tSeul?.6:0});
    if(T<r){ if(T>=tCombien) ecrire(c,'?',528,130,150*zoom(T,tCombien,.5),CRAIE.jaune); }
    else {
      /* de 9 à 10 : un seul pas ; une pièce de 1 € glisse vers le voisin */
      const X=droiteE(c,300,400,150,9,10,{z:zoom(T,r+.2,.4),taille:70,hi:{9:CRAIE.jaune,...(T>=tDix?{10:CRAIE.ok}:{})}});
      if(T>=tDix) arcSautE(c,[X(9),130],[X(10),130],entreE(T,tDix-.1,tDix+.5),90,CRAIE.jaune);
      if(T>=tSeul) ecrire(c,'1 pas',500,40,52*zoom(T,tSeul,.4),CRAIE.jaune);
      if(T>=tRend){ const p=sautE([330,420],[780,520],entreE(T,tRend,tRend+.6),120); euroE(c,1,p[0],p[1],56,{lueur:.6}); }
      if(T>=tEuro) formuleE(c,T,330,280,['9','+','1','=','10'],Array(5).fill(tEuro),72,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien Idriss lui rend-il ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('Idriss rend 1 €.',[mr('Idriss'),tRend,mr('un',2),tEuro]);

  poserMiniature(outils,q-.3,'Combien<br>on te rend ?',ardoiseMini([['9 €   payé 10 €','#ffd43b'],['rendu : ?']]));
  return { clips,FIN,titre:'Le filet du voisin',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['1 €',tq('A'),tq('euro')],['19 €',tq('B'),tq('euros',1)],['10 €',tq('C'),tq('euros',2)]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[rep1],suite:[] },
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
      else if(T<com){ T>=tEuro?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
