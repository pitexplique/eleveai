/* ============================================================
   Série Ti Margo, division CE1 — SHORT 09 : « Les cookies des quatre amis » (micro ce1_division_reste), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-ce1-reste-short.json.
   14 cookies chauds sur la plaque, 4 amis derrière la table, autant chacun. Combien restent sur la plaque ? Bonne réponse C (2).
   Les cookies se distribuent tour après tour : 3 chacun (douze) ; 2 restent ; 4 × 3 + 2 = 14. Ceinture blanche.
   Commentaire : 19 cartes pour 3 joueurs, « reste ? ».
   ============================================================ */
FILMS['reste']=function(outils){
  const DUR={'00-accroche':5.175,'01-question':12.33,'01b-reponse':7.305,'02-commentaire':10.365,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#titre{font-size:60px;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tQuatorze=m0('Quatorze'), tCookies=m0('cookies'), tQuatre=m0('quatre'), tAmis=m0('amis'), tAutant=m0('autant'), tChacun=m0('chacun');
  const mq=w=>mot('01-question',w), tComb=mq('Combien'), tPlaqueQ=mq('plaque');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tTroisR=mr('Trois'), tChacunR=mr('chacun'), tDouze=mr('douze'), tReste=mr('reste'), tDeuxR=mr('deux'), tPlaqueR=mr('plaque');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tDixNeuf=mc('dix-neuf'), tCartes=mc('cartes'), tTroisC=mc('trois'), tJoueurs=mc('joueurs'), tCombC=mc('Combien'), tRep=mc('réponds');
  const finTitre=tQuatorze-.08;

  /* la plaque : 14 cookies en 2 rangs de 7 ; les deux du milieu du haut et du bas (colonne 3) restent à la fin */
  const PX=500, PY=200, PW=690, PH=230, PAS=92;
  const COOK=k=>[PX+((k%7)-3)*PAS,PY-50+Math.floor(k/7)*100];
  const ORDRE=[0,13,1,12,2,11,4,9,5,8,6,7]; /* les 12 cookies distribués, dans l'ordre ; le i-ième va à l'ami i % 4 */
  const RESTE=[3,10];
  /* les 4 amis derrière la table ; leurs assiettes sur la table */
  const AX=[150,395,640,885], TABLE=530, AY=618;
  const SUR=(j,m)=>[AX[j]+(m-1)*50,AY-8-(m===1?10:0)];
  /* trois tours : un cookie à chacun, puis encore un, puis encore un */
  const T0=r+.95, DT=.42, DJ=.09;
  const depart=i=>T0+Math.floor(i/4)*DT+(i%4)*DJ;
  function decor(c){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,TABLE);
    c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=3; for(let x=0;x<1056;x+=88){ c.beginPath(); c.moveTo(x,0); c.lineTo(x,TABLE); c.stroke(); }
    for(let y=88;y<TABLE;y+=88){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); } }
  function table(c){ c.fillStyle='#c08552'; c.fillRect(0,TABLE,1056,720-TABLE); c.fillStyle='#a9713f'; c.fillRect(0,TABLE,1056,16);
    c.strokeStyle='rgba(0,0,0,.12)'; c.lineWidth=3; for(const y of [580,650]){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 19 cartes, 3 joueurs, « reste ? » */
      c.fillStyle='#ffe8cc'; c.fillRect(0,0,1056,720); c.fillStyle='#2b8a3e'; c.beginPath(); c.roundRect(30,40,910,320,30); c.fill();
      c.strokeStyle='#1e6b30'; c.lineWidth=8; c.stroke();
      for(let k=0;k<19;k++){ if(T<tDixNeuf) break; const x=k<10?107+k*86:150+(k-10)*86, y=k<10?130:270;
        carteJeuE(c,x,y,70,{z:zoom(T,tDixNeuf+k*.03,.4),a:((k*37)%7-3)*.03}); }
      if(T>=tDixNeuf) etiquette(c,'19',995,200,T,tDixNeuf,CRAIE.jaune,56);
      if(T>=tTroisC) for(let j=0;j<3;j++) enfantE(c,160+j*230,712,1.45,{k:j+2,T});
      if(T>=tTroisC) etiquette(c,'3',62,540,T,tTroisC,'#74c0fc',56);
      if(T>=tCombC){ const k=zoom(T,tCombC,.5); ecrire(c,'reste ?',858,560,76*k,'#c92a2a'); }
      tab.maj(); return; }

    decor(c);
    /* les amis (derrière la table) */
    for(let j=0;j<4;j++){ if(T<tQuatre) break; const fier=T>=r&&T>=tChacunR;
      enfantE(c,AX[j],TABLE+95,1.32,{k:j,T,bras:fier&&T<tDouze+.6?.5:0}); }
    /* la plaque et les cookies */
    plaqueE(c,PX,PY,PW,PH);
    if(T>=tQuatorze) etiquette(c,'14',70,PY,T,tQuatorze,CRAIE.jaune,60);
    table(c);
    for(let j=0;j<4;j++) if(T>=tQuatre) assietteCraie(c,AX[j],AY,210,zoom(T,tQuatre+j*.08,.4));
    const chauds=T<r;
    for(let k=0;k<14;k++){ if(T<tQuatorze) break; let p=COOK(k), rr=38;
      const i=ORDRE.indexOf(k);
      if(i>=0&&T>=r){ const u=entreE(T,depart(i),depart(i)+.38); p=sautE(COOK(k),SUR(i%4,Math.floor(i/4)),u,110); rr=38-6*u; }
      const lu=T>=r&&RESTE.includes(k)&&T>=tReste?.5+.5*Math.sin(T*4):(T>=q&&T<r&&T>=tPlaqueQ?.25:0);
      cookieE(c,p[0],p[1],rr,{z:zoom(T,tQuatorze+k*.04,.4),T,fume:chauds?1:0,lueur:lu}); }
    if(T<r){
      if(T>=tAmis) ecrire(c,'4 amis',528,690,58*zoom(T,tAmis,.4),'#fff3bf');
      if(T>=tComb) ecrire(c,'?',960,PY,150*zoom(T,tComb,.5),'#c92a2a'); }
    else {
      for(let j=0;j<4;j++) if(T>=tChacunR) rondNombreE(c,'3',AX[j]+92,AY-62,30,{z:zoom(T,tChacunR+j*.08,.4),coul:CRAIE.ok});
      if(T>=tDeuxR) etiquette(c,'2',PX+100,PY,T,tDeuxR,CRAIE.ok,50);
      if(T>=tDouze) formuleE(c,T,528,690,['4','×','3','+','2','=','14'],[tDouze,tDouze,tDouze,tDeuxR,tDeuxR,tPlaqueR,tPlaqueR],70,
        ['#74c0fc',CRAIE.blanc,CRAIE.ok,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.blanc]); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[phraseE('14 cookies, 4 amis.',[tQuatorze,tCookies,tQuatre,tAmis]),qd('Combien de cookies restent sur la plaque ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('3 chacun : 12.',[tTroisR,tChacunR,tChacunR,tDouze]);

  poserMiniature(outils,q-.3,'Combien<br>en reste-t-il ?',ardoiseMini([['14 cookies'],['4 amis','#74c0fc']]));
  return { clips,FIN,titre:'Les cookies des quatre amis',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['4',tq('A'),tq('quatre')],['3',tq('B'),tq('trois')],['2',tq('C'),tq('deux')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1,phraseE('Il en reste 2.',[mr('Il'),mr('en'),tReste,tDeuxR])],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.2) g.salut(T-acc,1.2);
      else if(gros) g.ouvre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<com){ T>=tReste?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
