/* ============================================================
   Série Ti Margo, division CE1 — SHORT 10 : « Les sandwichs du goûter » (micro ce1_division_defi), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-ce1-defi-short.json.
   Un goûter sur une nappe dans l'herbe : 3 paquets de 4 sandwichs, 6 enfants, autant chacun. Combien chacun ? Bonne réponse A (2).
   Défi en deux étapes : 3 × 4 = 12 sandwichs, puis 12 pour 6 enfants → 2 chacun ; 6 × 2 = 12. Ceinture blanche.
   Commentaire : 36 chaises rangées par 9, combien de rangées ?
   ============================================================ */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':7.625,'01-question':11.975,'01b-reponse':7.935,'02-commentaire':9.59,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#titre{font-size:60px;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tTrois=m0('Trois'), tPaq=m0('paquets'), tDe=m0('de'), tQuatre=m0('quatre'), tSand=m0('sandwichs'), tSix=m0('Six'), tEnf=m0('enfants'), tAutant=m0('Autant'), tChacun=m0('chacun');
  const mq=w=>mot('01-question',w), tComb=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tTroisR=mr('Trois'), tFois=mr('fois'), tQuatreR=mr('quatre'), tDouzeR=mr('douze'), tDouze2=mr('douze',2), tPour=mr('pour'), tSixR=mr('six'), tEnfR=mr('enfants'), tDeuxR=mr('deux'), tChacunR=mr('chacun');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tTrente=mc('trente-six'), tChaises=mc('chaises'), tNeuf=mc('neuf'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tTrois-.08;

  /* la nappe ; 3 paquets de 4 sandwichs (2 × 2) ; 6 enfants en bas, devant la nappe */
  const PQ=[250,528,806], PY=360;
  const SAND=k=>{ const j=Math.floor(k/4), m=k%4; return [PQ[j]+(m%2?44:-44),PY+(m<2?-34:38)]; };
  const EX=i=>110+i*167, EY=712;
  /* le sandwich k va devant l'enfant k%6 (il y est le 1er ou le 2e) : douze pour six enfants */
  const DEVANT=k=>[EX(k%6)+(k<6?-30:30),510];
  const quand=k=>tDouze2+.15+k*.1;
  function decor(c){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,230); herbeE(c,230);
    c.fillStyle='#fff3bf'; c.beginPath(); c.arc(960,70,44,0,7); c.fill(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 36 chaises, rangées par 9 */
      c.fillStyle='#d0ebff'; c.fillRect(0,0,1056,720); c.fillStyle='#c08552'; c.fillRect(0,656,1056,64);
      for(let k=0;k<36;k++){ if(T<tTrente) break; const i=k%6, j=Math.floor(k/6);
        chaiseE(c,100+i*90,196+j*92,.82,{z:zoom(T,tTrente+k*.025,.4),coul:COUL_CE1[(k*5)%8]}); }
      if(T>=tTrente) etiquette(c,'36',325,62,T,tTrente,CRAIE.jaune,68);
      if(T>=tNeuf) ecrire(c,'par 9',830,230,90*zoom(T,tNeuf,.4),'#1864ab');
      if(T>=tCombC){ ecrire(c,'rangées ?',830,380,70*zoom(T,tCombC,.4),'#343a40'); ecrire(c,'?',830,530,160*zoom(T,tCombC,.5),'#e8590c'); }
      tab.maj(); return; }

    decor(c); nappeE(c,528,PY,768,240);
    /* les paquets : ils s'effacent quand les sandwichs partent vers les enfants */
    const uP=T>=r?1-entreE(T,tDouze2,tDouze2+.5):1;
    for(let j=0;j<3;j++){ if(T<tPaq) break; const lu=T>=r&&T<tDouze2&&T>=tCptP(j)?.4:0;
      paquetE(c,PQ[j],PY+2,210,170,{z:zoom(T,tPaq+j*.12,.4),u:uP,lueur:lu}); }
    for(let k=0;k<12;k++){ if(T<tQuatre) break; let p=SAND(k), w=76;
      if(T>=r){ const u=entreE(T,quand(k),quand(k)+.45); p=sautE(SAND(k),DEVANT(k),u,90); w=76-10*u; }
      sandwichE(c,p[0],p[1],w,{z:zoom(T,tQuatre+k*.04,.4),a:(k%3-1)*.12}); }
    for(let i=0;i<6;i++){ if(T<tSix) break; const ok=T>=tDeuxR;
      c.save(); c.translate(EX(i),EY); c.scale(1.22,1.22);
      eleveE(c,0,0,1.15,COUL_CE1[i],{z:zoom(T,tSix+i*.07,.4),k:i,lueur:T>=tAutant&&T<q&&i===0?.5+.5*Math.sin(T*4):0,saute:ok?Math.max(0,Math.sin((T-tDeuxR)*7+i))*8:0}); c.restore(); }
    if(T<r){
      if(T>=tTrois) ecrire(c,'3 paquets de 4',360,80,66*zoom(T,tTrois,.4),'#e8590c');
      if(T>=tSix) ecrire(c,'6 enfants',360,170,66*zoom(T,tSix,.4),'#1864ab');
      if(T>=tComb) for(let i=0;i<6;i++) ecrire(c,'?',EX(i),505,90*zoom(T,tComb+i*.06,.5),'#e8590c'); }
    else {
      formuleE(c,T,360,80,['3','×','4','=','12'],[tTroisR,tFois,tQuatreR,tDouzeR,tDouzeR],80,['#e8590c','#343a40','#e8590c','#343a40','#e03131']);
      if(T>=tDeuxR){ for(let i=0;i<6;i++) etiquette(c,'2',EX(i),452,T,tDeuxR+i*.05,'#2f9e44',40);
        formuleE(c,T,360,175,['6','×','2','=','12'],[tChacunR,tChacunR,tChacunR,tChacunR,tChacunR],80,['#1864ab','#343a40','#2f9e44','#343a40','#e03131']); } }
    tab.maj();
  }
  /* pendant la réponse, chaque paquet brille quand on le compte (« trois fois quatre ») */
  function tCptP(j){ return [tTroisR,tFois,tQuatreR][j]; }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[phraseE('3 paquets de 4, 6 enfants.',[tTrois,tPaq,tDe,tQuatre,tSix,tEnf]),qd('Combien de sandwichs pour chacun ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('3 × 4 = 12',[tTroisR,tFois,tQuatreR,tDouzeR,tDouzeR]);
  const rep2=phraseE('2 chacun !',[tDeuxR,tChacunR,tChacunR]);

  poserMiniature(outils,q-.3,'Combien<br>chacun ?',ardoiseMini([['3 paquets de 4'],['6 enfants','#74c0fc']]));
  return { clips,FIN,titre:'Les sandwichs du goûter',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2',tq('A'),tq('deux')],['12',tq('B'),tq('douze')],['4',tq('C'),tq('quatre')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[rep1,rep2],suite:[] },
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
      else if(T<com){ T>=tDeuxR?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
