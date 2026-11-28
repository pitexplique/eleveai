/* ============================================================
   Série Idriss, monnaie CP — SHORT 09 : « La mouette et le crabe » (micro cp_monnaie_comparer), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-comparer-short.json.
   La mouette a quatre pièces de 1 €, le crabe un seul billet de 5 € : qui est le plus riche ? Bonne réponse A (le crabe).
   Ceinture blanche. Commentaire : trois pièces de 2 € ou un billet de 5 € ?
   ============================================================ */
FILMS['cp-comparer']=function(outils){
  const DUR={'00-accroche':10.615,'01-question':11.825,'01b-reponse':11.59,'02-commentaire':10.08,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tLa=m0('La'), tQuatre0=m0('quatre'), tCrabe0=m0('crabe'), tBillet0=m0('billet'), tChacun=m0('Chacun'), tRiche=m0('riche');
  const mq=w=>mot('01-question',w), tQui=mq('Qui');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tQuatre=mr('quatre'), tCinq=mr('cinq'), tPlus=mr('plus'), tGagne=mr('gagne'), tPince=mr('pince');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tTroisC=mc('trois'), tCinqC=mc('cinq'), tLequel=mc('Lequel'), tRep=mc('réponds');
  const finTitre=tLa-.08;

  const PCS=[[110,640],[225,640],[340,640],[455,640]], CR=[790,560];
  function quai(c){ c.fillStyle='#a9774a'; c.fillRect(0,500,1056,220); c.strokeStyle='#6b3a10'; c.lineWidth=4;
    for(let y=500;y<720;y+=55){ c.beginPath(); c.moveTo(0,y); c.lineTo(1056,y); c.stroke(); }
    c.fillStyle='#74c0fc'; c.fillRect(0,0,1056,500); c.fillStyle='#4dabf7'; c.fillRect(0,380,1056,120); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* trois pièces de 2 € ou un billet de 5 € ? */
      if(T>=tTroisC) [150,280,410].forEach((x,k)=>euroE(c,2,x,330,62,{z:zoom(T,tTroisC+k*.12,.4)}));
      if(T>=tCinqC-.5) ecrire(c,'ou',560,330,70,CRAIE.gris);
      if(T>=tCinqC) euroE(c,5,820,330,52,{z:zoom(T,tCinqC,.4),grand:1});
      if(T>=tLequel) ecrire(c,'?',528,580,160*zoom(T,tLequel,.5),CRAIE.jaune);
      tab.maj(); return; }

    quai(c);
    /* la mouette et ses quatre pièces, le crabe et son billet */
    const gagne=T>=r&&T>=tGagne;
    if(T>=tLa) mouetteE(c,280,470,3.2,{T,z:zoom(T,tLa,.4),dir:1});
    PCS.forEach((p,k)=>{ const t=tQuatre0+k*.12; if(T>=t) euroE(c,1,p[0],p[1],48,{z:zoom(T,t,.4),lueur:T>=r&&T>=tQuatre&&T<tCinq?.55+.45*Math.sin(T*5):0}); });
    if(T>=tCrabe0){ const dx=gagne?Math.sin(T*7)*30:0;
      crabeE(c,CR[0]+dx,CR[1],2.4,{T,z:zoom(T,tCrabe0,.4),marche:gagne?1:0});
      if(T>=tBillet0) euroE(c,5,CR[0]+dx,300+(gagne?Math.sin(T*14)*12:0),50,{z:zoom(T,tBillet0,.4),grand:1,a:-.1,lueur:T>=r&&T>=tCinq&&T<tPlus+1?.55+.45*Math.sin(T*5):0}); }
    /* « c'est moi le plus riche ! » */
    if(T>=tChacun&&T<q){ const z=zoom(T,tChacun,.5); bulleE(c,260,160,250,120,290,330,'Moi !',64,z); bulleE(c,640,130,250,120,760,230,'Moi !',64,z); }
    if(T<r){ if(T>=tQui) ecrire(c,'?',528,180,150*zoom(T,tQui,.5),CRAIE.jaune); }
    else {
      if(T>=tQuatre) ecrire(c,'4 €',280,300,100*zoom(T,tQuatre,.4),CRAIE.jaune);
      if(T>=tCinq) ecrire(c,'5 €',790,150,100*zoom(T,tCinq,.4),CRAIE.ok);
      if(T>=tPlus) ecrire(c,'5 € > 4 €',528,80,80*zoom(T,tPlus,.4),CRAIE.blanc);
      if(gagne) for(const [x,y] of [[640,250],[960,420]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Qui a raison ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('5 € > 4 €',[tCinq,tCinq,tPlus,tPlus+.3,tPlus+.3]);

  poserMiniature(outils,q-.3,'Qui est<br>le plus riche ?',ardoiseMini([['1 € 1 € 1 € 1 €','#ffd43b'],['ou 5 € ?']]));
  return { clips,FIN,titre:'La mouette et le crabe',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le crabe',tq('A'),tq('crabe')],['la mouette',tq('B'),tq('mouette')],['ils ont pareil',tq('C'),tq('pareil')]],
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
      else if(T<com){ T>=tGagne?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
