/* ============================================================
   Série Ti Margo, division CE1 — SHORT 08 : « Les chaussettes par paires » (micro ce1_division_groupement), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-ce1-groupement-short.json.
   16 chaussettes renversées du panier à linge ; Ti Margo les range par paires. Combien de paires ? Bonne réponse B (8).
   Les paires se forment au compte « 2, 4, 6 … 16 » ; 8 × 2 = 16. Ceinture blanche. Commentaire : 20 roues, 4 par voiture.
   ============================================================ */
FILMS['groupement']=function(outils){
  const DUR={'00-accroche':7.9,'01-question':11.77,'01b-reponse':9.245,'02-commentaire':9.545,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#titre{font-size:60px;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tDans=m0('Dans'), tPanier=m0('panier'), tSeize=m0('seize'), tChau=m0('chaussettes'), tParA=m0('paires'), tDeuxA=m0('deux'), tDeuxB=m0('deux',2);
  const mq=w=>mot('01-question',w), tComb=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tCpt=[mr('Deux'),mr('quatre'),mr('six'),mr('huit'),mr('dix'),mr('douze'),mr('quatorze'),mr('seize')], tHuitP=mr('Huit'), tPairesR=mr('paires');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tVingt=mc('vingt'), tQuatreC=mc('quatre'), tVoit=mc('voiture'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tDans-.08;

  /* 8 couleurs, 2 chaussettes de chaque : en vrac sur deux rangs ; dans la réponse, la paire j se forme au j-ième nombre compté */
  const COUL=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#cc5de8','#ff922b','#f783ac','#20c997'];
  const ORDRE=[0,3,5,1,6,2,7,4, 2,6,0,4,1,7,3,5]; /* la chaussette k a la couleur ORDRE[k] */
  const VRAC=k=>[215+(k%8)*97,300+Math.floor(k/8)*175], ANG=k=>[-.35,.25,-.1,.4,-.25,.15,-.4,.3][k%8]*(k>=8?-1:1);
  const PAIRE=j=>[175+(j%4)*235,285+Math.floor(j/4)*235];
  const place=k=>{ const j=ORDRE[k], deux=ORDRE.indexOf(j)!==k; const [x,y]=PAIRE(j); return [x+(deux?34:-34),y]; };
  function decor(c){ c.fillStyle='#d0ebff'; c.fillRect(0,0,1056,600); c.fillStyle='#c08552'; c.fillRect(0,600,1056,120);
    c.strokeStyle='rgba(0,0,0,.15)'; c.lineWidth=3; for(let x=0;x<1056;x+=132){ c.beginPath(); c.moveTo(x,600); c.lineTo(x,720); c.stroke(); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 20 roues, 4 roues par voiture */
      decor(c);
      if(T>=tVingt) for(let k=0;k<20;k++) roueE(c,120+(k%10)*90,180+Math.floor(k/10)*95,36,{z:zoom(T,tVingt+k*.03,.4)});
      if(T>=tVingt) etiquette(c,'20',528,60,T,tVingt,CRAIE.jaune,56);
      if(T>=tQuatreC){ voitureE(c,360,640,330,'#e03131',{z:zoom(T,tQuatreC,.4)}); etiquette(c,'4',600,520,T,tVoit,'#74c0fc',56); }
      if(T>=tCombC) ecrire(c,'?',840,520,170*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    decor(c);
    if(T<r) panierLingeE(c,130,705,230);
    for(let k=0;k<16;k++){ if(T<tSeize) break; const j=ORDRE[k]; let p=VRAC(k), a=ANG(k);
      if(T>=r){ const t0=tCpt[j]-.35, u=entreE(T,t0,t0+.4); p=sautE(VRAC(k),place(k),u,80); a=a*(1-u); }
      const lu=T<r&&j===0&&T>=tDeuxA&&T<q?.5+.5*Math.sin(T*4):0;
      chaussetteE(c,p[0],p[1],T>=r?1.05+.1*entreE(T,tCpt[j]-.35,tCpt[j]+.05):1.15,COUL[j],{z:zoom(T,tSeize+k*.04,.4),a,dir:(ORDRE.indexOf(j)!==k)?1:-1,lueur:lu}); }
    if(T<r){
      if(T>=tSeize) etiquette(c,'16',70,110,T,tSeize,CRAIE.jaune,60);
      if(T>=tDeuxA) ecrire(c,'par 2',900,110,72*zoom(T,tDeuxA,.4),'#74c0fc');
      if(T>=tComb) ecrire(c,'?',528,110,150*zoom(T,tComb,.5),CRAIE.jaune); }
    else {
      for(let j=0;j<8;j++) if(T>=tCpt[j]){ const [x,y]=PAIRE(j); etiquette(c,String(2*(j+1)),x,y-100,T,tCpt[j],j===7?CRAIE.ok:CRAIE.jaune,44); }
      if(T>=tHuitP) formuleE(c,T,528,650,['8','×','2','=','16'],[tHuitP,tHuitP,tHuitP,tHuitP,tHuitP],80,[CRAIE.ok,CRAIE.blanc,'#74c0fc',CRAIE.blanc,CRAIE.jaune]); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[phraseE('16 chaussettes, par 2.',[tSeize,tChau,tDeuxA,tDeuxA]),qd('Combien de paires ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('8 paires !',[tHuitP,tPairesR]);

  poserMiniature(outils,q-.3,'Combien<br>de paires ?',ardoiseMini([['16 chaussettes'],['par 2','#74c0fc']]));
  return { clips,FIN,titre:'Les chaussettes par paires',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['14',tq('A'),tq('quatorze')],['8',tq('B'),tq('huit')],['18',tq('C'),tq('dix-huit')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1,phraseE('8 × 2 = 16',[tHuitP,tHuitP,tHuitP,tHuitP,tHuitP])],suite:[] },
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
      else if(T<com){ T>=tHuitP?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
