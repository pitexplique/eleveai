/* ============================================================
   Série Idriss le pêcheur — SHORT 02 : « Le goûter de la mouette » (micro cp_probleme_soustractif), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2/3-dessins.js + idriss-dessins.js. Voix : manim/voix/idriss-cp-soustractif-short.json.
   Six crevettes dans le seau d'Idriss, une mouette plonge et repart avec une : combien en reste-t-il ?
   Bonne réponse C (5). Ceinture blanche. Commentaire : 10 bouées, le vent en emporte 3 ?
   ⭐ Comme le short 01 : Ti Margo petit à gauche, la carte à droite sous l'ardoise.
   ============================================================ */
FILMS['cp-soustractif']=function(outils){
  const DUR={'00-accroche':7.865,'01-question':13.86,'01b-reponse':9.665,'02-commentaire':10.1,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tDans=m0('Dans'), tSeau=m0('seau'), tSix=m0('six'), tFret=m0('frétillent'), tAtt=m0('Attention'), tMou=m0('mouette'), tPlonge=m0('plonge');
  const mq=w=>mot('01-question',w), tRepart=mq('repart'), tUne=mq('crevette'), tComb=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tSixR=mr('Six'), tMoins=mr('moins'), tUn=mr('un'), tCinq=mr('cinq'), tReste=mr('reste'), tLa=mr('La'), tGouter=mr('goûter');
  const mc=w=>mot('02-commentaire',w);
  const tDixC=mc('dix'), tQuai=mc('quai'), tVent=mc('vent'), tEmp=mc('emporte'), tTroisC=mc('trois'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tDans-.08;

  /* le seau, au milieu de l'ardoise ; les 6 crevettes posées en deux rangs au-dessus du bord */
  const SX=540, SY=700, SW=300, HAUT=SY-SW*.72;
  const CREV=k=>[SX-190+(k%3)*190,HAUT-40-Math.floor(k/3)*120];
  const PRISE=4; /* la crevette que prend la mouette (rang du haut, au milieu) */
  /* la mouette : arrive d'en haut à droite à « plonge », se pose au-dessus du seau, repart avec la crevette à « repart » */
  const AU_SEAU=[CREV(PRISE)[0]+20,CREV(PRISE)[1]-70], LOIN=[880,120];
  function mouettePos(T){
    if(T<tPlonge) return null;
    const u=douxE(entreE(T,tPlonge-.1,tPlonge+.8));
    let p=sautE([1120,-40],AU_SEAU,u,-60);
    if(T>=tRepart){ const v=douxE(entreE(T,tRepart,tRepart+1.1)); p=sautE(AU_SEAU,LOIN,v,40); }
    if(T>=r&&T>=tLa){ const w=douxE(entreE(T,tLa,tLa+2.4)); p=[LOIN[0]+300*w,LOIN[1]-60*w+8*Math.sin(T*3)]; }
    else if(T>=tRepart+1.1) p=[LOIN[0]+18*Math.cos(T*1.3),LOIN[1]+12*Math.sin(T*1.6)];
    return p; }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le quai : 10 bouées, le vent en emporte 3 */
      merE(c,T,170); c.fillStyle='#a47148'; c.fillRect(0,250,1056,470);
      c.strokeStyle='#7a4f2a'; c.lineWidth=3; for(let y=250;y<720;y+=60){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); }
      if(T>=tVent) ventE(c,T,entreE(T,tVent,tVent+.6),1056,60,520);
      const B=k=>[180+(k%5)*175,420+Math.floor(k/5)*170], VOL=k=>[700+k*130,90+(k%2)*70];
      for(let k=0;k<10;k++){ if(T<tDixC) break; let p=B(k), a=0;
        if(k>=7&&T>=tEmp){ const u=douxE(entreE(T,tEmp+(k-7)*.25,tEmp+1.1+(k-7)*.25)); p=sautE(B(k),VOL(k-7),u,80);
          p=[p[0]+10*Math.sin(T*2+k)*u,p[1]+8*Math.cos(T*2.4+k)*u]; a=u*4+T*.8*u; }
        boueeE(c,p[0],p[1],62,{z:zoom(T,tDixC+k*.06,.4),a}); }
      if(T>=tQuai) etiquette(c,'10',90,300,T,tQuai,CRAIE.jaune,60);
      if(T>=tTroisC) etiquette(c,'3',560,96,T,tTroisC,'#74c0fc',60);
      if(T>=tCombC) ecrire(c,'?',500,640,140*zoom(T,tCombC,.5),CRAIE.jaune);
      tab.maj(); return; }

    merE(c,T,100); c.fillStyle='rgba(28,126,214,.55)'; c.fillRect(0,190,1056,40);
    c.fillStyle='#a47148'; c.fillRect(0,230,1056,490); c.strokeStyle='#7a4f2a'; c.lineWidth=3;
    for(let y=230;y<720;y+=60){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); }
    seauCoulE(c,SX,SY,SW,'#1c7ed6','#0b3d6b');
    const reste=T>=r&&T>=tCinq, lueurR=T>=r&&T>=tCinq&&T<tLa?.5+.5*Math.sin(T*5):0;
    if(T>=tSix) for(let k=0;k<6;k++){ if(k===PRISE&&T>=tRepart) continue; const [x,y]=CREV(k);
      crevetteE(c,x,y,150,{dir:k%2?1:-1,T:T>=tFret?T:0,k,z:zoom(T,tSix+k*.08,.4),lueur:lueurR}); }
    const mp=mouettePos(T);
    if(mp){ const vole=!(T>=tPlonge+.8&&T<tRepart);
      mouetteE(c,mp[0],mp[1],2.2,{aile:vole?1:0,T,dir:-1});
      if(T>=tRepart) crevetteE(c,mp[0]-112,mp[1]+10,90,{dir:-1,T,k:9,a:.5}); }
    if(T>=tAtt&&T<tPlonge+.6) ecrire(c,'!',960,140,130*zoom(T,tAtt,.5),'#ff8787');
    /* les nombres */
    if(T<r){ if(T>=tSix) etiquette(c,'6',SX-330,HAUT-110,T,tSix,CRAIE.jaune,70);
      if(T>=tUne) etiquette(c,'1',LOIN[0]-60,LOIN[1]+120,T,tUne,'#ff8787',60);
      if(T>=tComb) ecrire(c,'?',SX+330,HAUT-40,150*zoom(T,tComb,.5),CRAIE.jaune); }
    else {
      const x0=330, y0=64;
      if(T>=tSixR) ecrire(c,'6',x0-190,y0,100,CRAIE.jaune);
      if(T>=tMoins) ecrire(c,'−',x0-95,y0,100,CRAIE.blanc);
      if(T>=tUn) ecrire(c,'1',x0,y0,100,'#ff8787');
      if(T>=tCinq){ ecrire(c,'=',x0+95,y0,100,CRAIE.blanc); ecrire(c,'5',x0+190,y0,110*zoom(T,tCinq,.4),CRAIE.ok); }
      if(T>=tGouter&&mp) for(const [x,y] of [[mp[0]-40,mp[1]-70],[mp[0]+50,mp[1]-50]]) etincelle(c,x,y,12+5*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); qd.jusque('Combien'); const phraseQ=[qd('Combien en reste-t-il dans le seau ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('6 − 1 = 5',[tSixR,tMoins,tUn,tCinq,tCinq]);

  poserMiniature(outils,q-.3,'Combien en<br>reste-t-il ?',ardoiseMini([['6 − 1'],['= ?','#ffd43b']]));
  return { clips,FIN,titre:'Le goûter de la mouette',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7',tq('A'),tq('sept')],['1',tq('B'),tq('une')],['5',tq('C'),tq('cinq')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1,phraseE('Il en reste 5.',[mr('Il'),mr('en'),tReste,mr('cinq',2)])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tAtt?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tLa?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
