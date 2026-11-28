/* ============================================================
   Série Idriss, monnaie CP — SHORT 11 : « Deux glaces pour Idriss » (micro cp_monnaie_defi), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-defi-short.json.
   Il fait chaud : deux glaces à 3 € chacune, un billet de 5 € dans la poche. Assez ? Bonne réponse B (non, il manque 1 €).
   Idriss partage une seule glace avec Ti Margo. Ceinture blanche. Commentaire : payer 4 € avec le moins de pièces.
   ============================================================ */
FILMS['cp-defi']=function(outils){
  const DUR={'00-accroche':9.975,'01-question':14.17,'01b-reponse':11.31,'02-commentaire':8.62,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tIl=m0('Il'), tChaud=m0('chaud'), tDeux0=m0('deux'), tTrois0=m0('trois'), tPoche=m0('poche'), tCinq0=m0('cinq');
  const mq=w=>mot('01-question',w), tAssez=mq('assez');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tTrois=mr('Trois'), tPlus=mr('plus'), tTrois2=mr('trois',2), tSix=mr('six'), tCinq=mr('cinq'), tManque=mr('manque'), tEuroR=mr('euro'), tPartage=mr('partage'), tMoi=mr('moi');
  const mc=w=>mot('02-commentaire',w), tMoins=mc('moins'), tPiecesC=mc('pièces'), tQuatreC=mc('quatre'), tRep=mc('réponds');
  const finTitre=tIl-.08;

  const G=[[470,470],[630,470]];
  function decor(c,T){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,560); c.fillStyle='#ffe8a1'; c.fillRect(0,560,1056,160);
    soleilMatinE(c,120,110,70,1); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* payer 4 € avec le moins de pièces possible */
      if(T>=tMoins) ecrire(c,'le moins de pièces',528,120,72*zoom(T,tMoins,.4),CRAIE.jaune);
      if(T>=tPiecesC){ euroE(c,1,300,330,78,{z:zoom(T,tPiecesC,.4)}); euroE(c,2,756,330,88,{z:zoom(T,tPiecesC+.15,.4)}); ecrire(c,'ou',528,330,60,CRAIE.gris); }
      if(T>=tQuatreC) ecrire(c,'4 € = ?',528,580,140*zoom(T,tQuatreC,.5),CRAIE.blanc);
      tab.maj(); return; }

    decor(c,T);
    chariotGlacesE(c,190,700,250,T);
    idrissE(c,905,720,1.15,{T,montre:T>=tPoche&&T<q?1:0});
    if(T>=tChaud&&T<r+1) goutteE(c,875,250,(T*.7)%1);
    /* les deux glaces, leur prix ; à la fin, Idriss partage UNE seule glace */
    const part=T>=r&&T>=tPartage;
    G.forEach(([x,y],k)=>{ const t=tDeux0+k*.2; if(T<t) return;
      if(part&&k===1){ const u=entreE(T,tPartage-.2,tPartage+.5); if(u>=1) return; c.globalAlpha=1-u; }
      glaceE(c,x,y,1.05,{coul:k?'#8ce99a':'#ff8fab',z:zoom(T,t,.4),lueur:T>=r&&T>=tTrois&&T<tSix+.6?.5:0}); c.globalAlpha=1;
      if(T>=tTrois0&&!(part&&k===1)) prixE(c,'3 €',x,525,46,{z:zoom(T,tTrois0+k*.15,.5)}); });
    if(part){ const x=G[0][0]; c.strokeStyle='#495057'; c.lineWidth=5; c.setLineDash([10,7]); c.beginPath(); c.moveTo(x,250); c.lineTo(x,480); c.stroke(); c.setLineDash([]); }
    if(T>=tCinq0) euroE(c,5,760,620,40,{z:zoom(T,tCinq0,.4),grand:1,a:-.08,lueur:T>=r&&T>=tCinq&&T<tManque?.6:0});
    if(T<r){ if(T>=tAssez) ecrire(c,'?',560,150,150*zoom(T,tAssez,.5),CRAIE.jaune); }
    else {
      if(T>=tTrois) formuleE(c,T,560,90,['3','+','3','=','6 €'],[tTrois,tPlus,tTrois2,tSix,tSix],80,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tCinq&&T<tPartage) ecrire(c,'5 € < 6 €',560,190,72*zoom(T,tCinq,.4),CRAIE.blanc);
      if(T>=tManque&&T<tPartage) ecrire(c,'il manque 1 €',560,270,64*zoom(T,tManque,.4),CRAIE.faux);
      if(T>=tPartage) ecrire(c,'une glace pour deux !',560,200,62*zoom(T,tPartage,.4),CRAIE.ok); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("A-t-il assez d'argent ?")];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('Il manque 1 €.',[mr('il',2),tManque,mr('un'),tEuroR]);

  poserMiniature(outils,q-.3,'Assez<br>d\'argent ?',ardoiseMini([['3 € + 3 €','#ffd43b'],['5 € : assez ?']]));
  return { clips,FIN,titre:'Deux glaces pour Idriss',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['oui, tout juste',tq('A'),tq('juste')],['non, il manque 1 €',tq('B'),tq('euro')],['oui, il reste 2 €',tq('C'),tq('euros')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1],suite:[] },
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
      else if(T<com){ T>=tPartage?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
