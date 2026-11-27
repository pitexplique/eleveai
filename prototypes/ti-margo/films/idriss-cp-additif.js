/* ============================================================
   Série Idriss le pêcheur — SHORT 01 : « Les mouettes sur le mât » (micro cp_probleme_additif), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2/3-dessins.js + idriss-dessins.js. Voix : manim/voix/idriss-cp-additif-short.json.
   Trois mouettes posées sur la vergue de la barque d'Idriss, quatre autres qui planent : combien sur le mât ?
   Bonne réponse A (7). Ceinture blanche. Commentaire : 2 bateaux rouges + 5 blancs ?
   ⭐ La carte se range à droite sous l'ardoise, Ti Margo à gauche (comme les shorts CP).
   ============================================================ */
FILMS['cp-additif']=function(outils){
  const DUR={'00-accroche':8.29,'01-question':11.88,'01b-reponse':9.37,'02-commentaire':10.08,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tSur=m0('Sur'), tMat=m0('mât'), tBarque=m0('barque'), tTrois=m0('trois'), tMou=m0('mouettes'), tEt=m0('Et'), tQuatre=m0('quatre'), tPlan=m0('planant');
  const mr=w=>mot('01b-reponse',w);
  const tA=mr('A'), tTroisR=mr('Trois'), tQ4=mr('quatre'), tC5=mr('cinq'), tS6=mr('six'), tS7=mr('sept'),
    tTrois2=mot('01b-reponse','Trois',2), tPlus=mr('plus'), tQuatre2=mot('01b-reponse','quatre',2), tSept2=mot('01b-reponse','sept',2), tLe=mr('Le'), tPlier=mr('plier');
  const mc=w=>mot('02-commentaire',w);
  const tDeuxC=mc('deux'), tRouges=mc('rouges'), tCinqC=mc('cinq'), tBlancs=mc('blancs'), tCombien=mc('Combien'), tRep=mc('réponds');
  const finTitre=tSur-.08;

  /* la barque : grande, au milieu ; la vergue porte 7 places */
  const BX=470, BY=600, BS=1.45, VER=520, MS=1.15;
  const plieDe=T=>T>=r&&T>=tLe&&T<com?.6+.4*Math.sin((T-tLe)*5):0;
  const place=(k,T)=>{ const [hx,hy]=matHautE(BX,BY,BS,plieDe(T),0), r0=-.12*plieDe(T), dx=(k-3)*118;
    return [hx+dx*Math.cos(r0),hy+dx*Math.sin(r0)-30]; };
  /* les 4 qui planent, en rond à droite, puis se posent sur les places 3, 4, 5, 6 à « quatre, cinq, six, sept » */
  const VOL=[[740,190],[850,120],[960,200],[880,280]];
  const posesR=[tQ4,tC5,tS6,tS7];
  function ciel(c,T){ soleilMatinE(c,900,520,62,1); merE(c,T,520); c.fillStyle='rgba(28,126,214,.55)'; c.fillRect(0,610,1056,110); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le port : 2 bateaux rouges, 5 bateaux blancs */
      merE(c,T,380); c.fillStyle='rgba(28,126,214,.5)'; c.fillRect(0,540,1056,180);
      for(let k=0;k<2;k++) if(T>=tDeuxC) barqueE(c,200+k*260,470,.75*zoom(T,tDeuxC+k*.12,.4),{T:T+k,rameur:false,coque:'#e03131',coqueB:'#a61e1e',etoile:false,voile:'#ffe3e3'});
      for(let k=0;k<5;k++) if(T>=tCinqC) barqueE(c,112+k*208,690,.55*zoom(T,tCinqC+k*.1,.4),{T:T+k+3,rameur:false,coque:'#f8f9fa',coqueB:'#868e96',etoile:false,voile:'#f8f9fa'});
      if(T>=tRouges) ecrire(c,'2',720,400,130*zoom(T,tRouges,.5),'#ff8787');
      if(T>=tBlancs) ecrire(c,'5',1000,480,120*zoom(T,tBlancs,.5),CRAIE.blanc);
      if(T>=tCombien) ecrire(c,'?',880,180,160*zoom(T,tCombien,.5),CRAIE.jaune);
      tab.maj(); return; }
    ciel(c,T);
    if(T>=tBarque||T>=r) barqueE(c,BX,BY,BS,{T:0,mat:true,plie:plieDe(T),a:0,vergue:VER,rameur:true});
    /* les 3 posées */
    if(T>=tTrois) for(let k=0;k<3;k++){ const [x,y]=place(k,T); mouetteE(c,x,y,MS,{z:zoom(T,tTrois+k*.12,.4),dir:1,lueur:T>=r&&T>=tTroisR&&T<tQ4?.6:0}); }
    /* les 4 qui arrivent : d'abord de la droite, puis elles planent en rond ; dans la réponse elles se posent une à une */
    if(T>=tQuatre) for(let k=0;k<4;k++){ const [vx,vy]=VOL[k], ond=[vx+22*Math.cos(T*1.4+k*1.6),vy+14*Math.sin(T*1.4+k*1.6)];
      const arr=douxE(entreE(T,tQuatre+k*.25,tQuatre+1.3+k*.25)), dep=[1150,vy-40];
      let p=[dep[0]+(ond[0]-dep[0])*arr,dep[1]+(ond[1]-dep[1])*arr], aile=1;
      if(T>=r){ const u=entreE(T,posesR[k]-.35,posesR[k]+.3); if(u>0){ p=sautE(ond,place(3+k,T),u,60); if(u>=1) aile=0; } }
      mouetteE(c,p[0],p[1],MS,{aile,T,k,dir:-1}); }
    /* les nombres : 3 et 4 au-dessus, puis le compte qui monte dans la réponse */
    if(T<r){ if(T>=tMou) etiquette(c,'3',place(1,T)[0],78,T,tMou,CRAIE.jaune,64);
      if(T>=tPlan) etiquette(c,'4',640,80,T,tPlan,'#74c0fc',64); }
    if(T>=r){
      if(T>=tTroisR&&T<tTrois2){ const n=T>=tS7?7:T>=tS6?6:T>=tC5?5:T>=tQ4?4:3, t0=[tTroisR,tQ4,tC5,tS6,tS7][n-3];
        ecrire(c,String(n),place(3,T)[0],70,110*zoom(T,t0,.35),n===7?CRAIE.ok:CRAIE.jaune); }
      if(T>=tTrois2){ const x0=place(3,T)[0];
        if(T>=tTrois2) ecrire(c,'3',x0-190,70,100,CRAIE.jaune);
        if(T>=tPlus) ecrire(c,'+',x0-95,70,100,CRAIE.blanc);
        if(T>=tQuatre2) ecrire(c,'4',x0,70,100,'#74c0fc');
        if(T>=tSept2){ ecrire(c,'=',x0+95,70,100,CRAIE.blanc); ecrire(c,'7',x0+190,70,110*zoom(T,tSept2,.4),CRAIE.ok); } }
      if(T>=tPlier) for(const [x,y] of [[place(0,T)[0]-30,250],[place(6,T)[0]+40,240]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question'), rd=dit('01b-reponse');
  qd('Question !'); const phraseQ=[qd('Combien de mouettes sur le mât, maintenant ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('3 + 4 = 7',[tTrois2,tPlus,tQuatre2,tSept2,tSept2]);

  poserMiniature(outils,q-.3,'Combien sur<br>le mât ?',ardoiseMini([['3 + 4'],['= ?','#ffd43b']]));
  return { clips,FIN,titre:'Les mouettes',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7',tq('A'),tq('sept')],['1',tq('B'),tq('une')],['34',tq('C'),tq('trente-quatre')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE(); /* Ti Margo petit à gauche : tout le tableau reste visible */

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tEt?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tPlier?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
