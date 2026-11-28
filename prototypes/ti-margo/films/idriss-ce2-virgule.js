/* ============================================================
   Série Idriss le pêcheur — SHORT 19 : « Le zéro oublié » (micro ce2_monnaie_ecriture_virgule), 28/11/2026.
   Voix VALIDÉE par Frédéric : manim/voix/idriss-ce2-virgule-short.json (manim/SCRIPTS-monnaie-idriss.md, CE2 1).
   Un crabe coûte 409 c : quelle étiquette ? Bonne réponse C (4,09 €). Commentaire : 205 c en euros.
   Dessins CE2 (prixVCe2E, ardoiseVCe2E…) : films/idriss-dessins-ce2.js. Ceinture blanche. Ti Margo petit à gauche dès la fin du titre.
   ============================================================ */
FILMS['ce2-virgule']=function(outils){
  const DUR={'00-accroche':7.715,'01-question':15.505,'01b-reponse':13.92,'02-commentaire':8.555,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:48px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tCe=m0('Ce'), tCrabe=m0('crabe'), tQuatre=m0('quatre'), tCentimes=m0('centimes'), tIdriss=m0('Idriss'), tEcrire=m0('écrire'), tEuros=m0('euros');
  const mq=(w,n=1)=>mot('01-question',w,n), tEtiq=mq('étiquette');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tQ1=mr('Quatre'), tCents=mr('cents'), tQ2=mr('quatre',2), tEur1=mr('euros'), tReste=mr('reste'), tNeuf1=mr('neuf'), tZero=mr('zéro'), tNeuf2=mr('neuf',2),
    tQ3=mr('Quatre',3), tVirg=mr('virgule'), tB=mr('B'), tQV=mr('quatre-vingt-dix');
  const mc=w=>mot('02-commentaire',w), tCinqC=mc('cinq'), tEurosC=mc('euros'), tVirgC=mc('virgule'), tRep=mc('réponds');
  const finTitre=tCe-.08;

  /* le quai, l'étal ; le crabe au milieu avec son étiquette ; Idriss à gauche, la craie à la main */
  const CX=600, CY=470;
  function comptoir(c){ c.fillStyle='#c08550'; c.fillRect(0,560,1056,160); c.strokeStyle='#6b3a10'; c.lineWidth=5; c.beginPath(); c.moveTo(0,560); c.lineTo(1056,560); c.stroke(); }
  function crabe(c,T,{saute=0}={}){ const dy=saute?-Math.abs(Math.sin(T*7))*26:0; crabeE(c,CX,CY+dy,2.1,{T,marche:saute}); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 205 c en euros */
      quaiBoisE(c,T,150); comptoir(c);
      crabeE(c,860,500,1.3,{T,k:2});
      if(T>=tCinqC) prixVCe2E(c,'205 c',528,170,130,{z:zoom(T,tCinqC,.5),fond:1});
      if(T>=tEurosC){ ecrire(c,'=',528,330,110*zoom(T,tEurosC,.5),CRAIE.blanc); }
      /* « en euros » : ? € ; « avec une virgule » : ? , ? ? € (la place de la virgule et des deux chiffres des centimes) */
      if(T>=tEurosC&&T<tVirgC) prixVCe2E(c,'? €',528,460,120,{z:zoom(T,tEurosC+.2,.5),une:CRAIE.jaune,fond:1});
      if(T>=tVirgC){ c.fillStyle='rgba(31,59,44,.92)'; c.beginPath(); c.roundRect(300,385,456,150,30); c.fill();
        const k=zoom(T,tVirgC,.5); ecrire(c,'?',380,460,120*k,EUR_CE2); ecrire(c,',',438,478,140*k,CRAIE.blanc); ecrire(c,'??',530,460,120*k,CEN_CE2); ecrire(c,'€',680,460,120*k,CRAIE.blanc); }
      tab.maj(); return; }

    quaiBoisE(c,T,150); comptoir(c);
    const montre=T>=tIdriss&&T<q?1:(T>=r&&T>=tQ3&&T<tB?1:0);
    idrissE(c,150,712,1.25,{montre,T});
    if(montre){ const [hx,hy]=mainIdrissCe2E(150,712,1.25); craieCe2E(c,hx+14,hy-8,52); }
    if(T>=tCrabe) crabe(c,T,{saute:T>=r&&T>=tQ3?1:0});
    /* l'étiquette du crabe (ficelle) : vide puis « ? », puis 4,09 € dans la réponse */
    if(T>=tCrabe){ c.strokeStyle='#8a5a2b'; c.lineWidth=3; c.beginPath(); c.moveTo(CX-20,CY-40); c.lineTo(CX+40,CY-150); c.stroke(); }
    const ex=CX+90, ey=CY-190;
    if(T>=tCrabe&&!(T>=r&&T>=tQ3)) ardoiseVCe2E(c,T>=tEcrire?'? €':'    ',ex,ey,72,{z:zoom(T,tCrabe,.4),une:CRAIE.jaune,lueur:T>=q&&T<r?.4:0});
    if(T>=r&&T>=tQ3) ardoiseVCe2E(c,'4,09 €',ex,ey,80,{z:zoom(T,tQ3,.5),lueur:T<tB?.6:0});
    if(T<r){ /* la bulle : 409 c */
      if(T>=tQuatre) bulleE(c,400,110,250,110,300,220,'409 c',70,zoom(T,tQuatre,.5));
      if(T>=tEuros) ecrire(c,'→ €',925,300,90*zoom(T,tEuros,.5),CRAIE.jaune); }
    else {
      /* 400 c = 4 € ; il reste 9 c → 0 9 */
      calculVCe2E(c,T,560,80,['400 c','=','4 €'],[tQ1,tQ2,tQ2],76,{vert:false});
      /* 9 c → 0 9 : sur une plaque sombre (la mer derrière rendait l'orange peu lisible), à gauche de l'ardoise du crabe */
      if(T>=tReste){ c.fillStyle='rgba(31,59,44,.94)'; c.beginPath(); c.roundRect(222,104,356,100,18); c.fill(); prixVCe2E(c,'9 c',300,155,72); }
      if(T>=tZero){ ecrire(c,'→',400,155,72,CRAIE.blanc); prixVCe2E(c,'0',480,155,80,{z:zoom(T,tZero,.5),une:CEN_CE2}); }
      if(T>=tNeuf2) prixVCe2E(c,'9',530,155,80,{z:zoom(T,tNeuf2,.5),une:CEN_CE2});
      if(T>=tZero) cercle(c,480,157,44,CRAIE.jaune,entreE(T,tZero,tZero+.4));
      if(T>=tB) prixVCe2E(c,'B : 4,90 €',840,606,54,{z:zoom(T,tB,.5),fond:1});
      if(T>=tQV) prixVCe2E(c,'= 90 c',840,676,54,{z:zoom(T,tQV,.5),fond:1});
      if(T>=tQ3) for(const [x,y] of [[CX-200,CY-60],[CX+230,CY-40]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Quelle étiquette est juste ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('400 c = 4 €',[tQ1,tCents,tQ2,tQ2,tEur1]);
  const rep2=phraseE('4,09 €',[tQ3,mr('euros',2)]);

  miniCe2E(outils,q-.3,'Le zéro<br>oublié ?',[['409 c'],['= ? €','#ffd43b']]);
  return { clips,FIN,titre:'Le zéro oublié',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['40,9 €',tq('A'),tq('euros',1)],['4,90 €',tq('B'),tq('euros',2)],['4,09 €',tq('C'),tq('euros',3)]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1,rep2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tIdriss?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tQ3?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
