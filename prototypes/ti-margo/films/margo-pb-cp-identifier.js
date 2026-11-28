/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 01 : « Les œufs de la poule » (micro cp_probleme_identifier), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-identifier-short.json.
   La poule a pondu 8 œufs, Ti Margo en ramasse 6. Que cherche-t-on ? Bonne réponse B (les œufs qui restent dans le nid) ; 8 − 6 = 2.
   Commentaire : 3 oiseaux sur un fil, 2 arrivent : ceux qui arrivent, ou tous ? Ceinture blanche.
   ============================================================ */
FILMS['identifier']=function(outils){
  const DUR={'00-accroche':9.49,'01-question':13.38,'01b-reponse':10.91,'02-commentaire':12.105,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tLa=m0('La'), tPondu=m0('pondu'), tHuit0=m0('huit'), tSix0=m0('six'), tGateau=m0('gâteau'), tCombien0=m0('Combien'), tNid0=m0('nid');
  const mq=w=>mot('01-question',w), tQA=mq('A'), tQPanier=mq('panier'), tQB=mq('B'), tQNid=mq('nid'), tQC=mq('C'), tQPondus=mq('pondus');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tDit=mr('dit'), tHuit=mr('Huit'), tMoins=mr('moins'), tSix=mr('six'), tDeux=mr('deux'), tReste=mr('reste'), tDeux2=mr('deux',2), tPoule=mr('poule');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tTroisC=mc('trois'), tDeuxC=mc('Deux'), tCeux=mc('ceux'), tTous=mc('tous'), tDis=mc('Dis-le');
  const finTitre=tLa-.08;

  /* le nid (8 œufs : 4 derrière, 4 devant) ; Ti Margo en ramasse 6, il en reste 2 (les deux du milieu, derrière) */
  const NX=380, NY=650;
  const OEUFS=[[-165,472],[-55,462],[55,462],[165,472],[-140,505],[-47,512],[47,512],[140,505]].map(([dx,y])=>[NX+dx,y]);
  const RESTENT=[1,2], PRIS=[0,3,4,5,6,7];
  const PX=860, PY=690, DANS=[[-105,470],[0,462],[105,470],[-55,500],[55,500],[0,520]].map(([dx,y])=>[PX+dx,y]);

  function decor(c,T){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,420); soleilMatinE(c,960,90,60,1);
    c.fillStyle='rgba(255,255,255,.9)'; c.beginPath(); c.ellipse(260-((T*8)%60),120,90,32,0,0,7); c.ellipse(330-((T*8)%60),100,70,30,0,0,7); c.fill();
    herbeE(c,420); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* trois oiseaux sur un fil, deux autres arrivent */
      filPoteauxE(c,50,1006,260);
      const POS=[150,310,470,720,900];
      POS.forEach((x,k)=>{ const arrive=k>=3, t=arrive?tDeuxC+(k-3)*.35:tTroisC+k*.2; if(T<t-(arrive?1:0)) return;
        let px=x, py=filYE(50,1006,260,x)-58, ail=0;
        if(arrive){ const u=entreE(T,t-1,t+.4); const p=sautE([1100,120],[x,py],u,-60); px=p[0]; py=p[1]; ail=u<1?1:0; }
        const lu=(T>=tCeux&&T<tTous&&arrive)||(T>=tTous&&T<tDis)?.7:0;
        oiseauE(c,px,py,58,{coul:['#4dabf7','#ff8787','#69db7c','#fcc419','#da77f2'][k],T,k,aile:ail,z:arrive?1:zoom(T,t,.4),lueur:lu}); });
      if(T>=tTroisC) ecrire(c,'3',310,420,130*zoom(T,tTroisC,.4),CRAIE.jaune);
      if(T>=tDeuxC) ecrire(c,'2',810,420,130*zoom(T,tDeuxC,.4),CRAIE.jaune);
      if(T>=tCeux) ecrire(c,'?',528,600,170*zoom(T,tCeux,.5),CRAIE.jaune);
      tab.maj(); return; }

    decor(c,T);
    /* la poule : sur le nid, elle se lève à « pondu » et va à gauche ; à la fin, elle se rassoit */
    const retour=T>=r&&T>=tPoule, u=retour?entreE(T,tPoule,tPoule+.8):entreE(T,tPondu-.3,tPondu+.7);
    const PG=105, px=retour?PG+(NX-PG)*douxE(u):NX+(PG-NX)*douxE(u), py=retour?NY-60*u:NY-60+60*u;
    const assise=retour?u>=1:u<=0;
    /* les œufs : dans le nid, puis 6 sautent dans le panier */
    const luePanier=T>=tQA&&T<tQPanier+.4&&T<r?.7:0, lueTous=T>=tQC&&T<tQPondus+.4&&T<r?.6:0;
    const lueNid=(T>=tQB&&T<tQNid+.4&&T<r)||(T>=r&&T>=tDit&&T<tHuit)?.7:0;
    OEUFS.forEach(([x,y],k)=>{ if(T<tHuit0-.1&&!(T>=r)) return;
      const j=PRIS.indexOf(k); if(j>=0&&T>=tSix0+j*.3) return;
      const lu=(T>=r&&T>=tReste&&T<tPoule&&RESTENT.includes(k))?.8:(lueTous?lueTous:(T>=tHuit0&&T<tHuit0+.8?.4:0));
      oeufE(c,x,y,100,{z:T>=r?1:zoom(T,tHuit0+k*.06,.4),lueur:lu}); });
    nidE(c,NX,NY,540,{lueur:lueNid});
    pouleE(c,px,py,1.05,{assise:assise?1:0,T,dir:retour?1:(u>0&&u<1?-1:1)});
    /* les 6 œufs sautent dans le panier, un par un */
    PRIS.forEach((k,j)=>{ const t=tSix0+j*.3; if(T<t) return; const p=sautE(OEUFS[k],DANS[j],entreE(T,t,t+.5),150);
      oeufE(c,p[0],p[1],92,{lueur:luePanier||lueTous}); });
    if(T>=tSix0-.3) panierE(c,PX,PY,360);
    if(T>=tHuit0&&T<r) rondNombreE(c,'8',NX,230,62,{z:zoom(T,tHuit0,.5)});
    if(T>=tSix0&&T<r) rondNombreE(c,'6',PX,180,62,{z:zoom(T,tSix0,.5)});
    if(T>=tNid0&&T<r) rondNombreE(c,'?',NX+170,230,62,{z:zoom(T,tNid0,.5),coul:'#ff922b'});
    if(T>=r){
      if(T>=tHuit){ bandeauE(c,528,95,520,140,entreE(T,tHuit-.2,tHuit+.1)); formuleE(c,T,528,95,['8','−','6','=','2'],[tHuit,tMoins,tSix,tDeux,tDeux],100,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
      if(T>=tReste) rondNombreE(c,'2',NX,270,62,{z:zoom(T,tDeux2,.5),coul:CRAIE.ok});
      if(T>=tPoule&&u>=1){ ecrire(c,'♥',NX+170,330+Math.sin(T*4)*6,80,'#e64980'); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Que cherche-t-on ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('Il reste 2 œufs.',[mr('Il'),tReste,tDeux2,mr('œufs')]);

  poserMiniature(outils,q-.3,'Que<br>cherche-t-on ?',ardoiseMini([['8 œufs','#ffd43b'],['6 ramassés']]));
  return { clips,FIN,titre:'Les œufs de la poule',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['les œufs du panier',tq('A'),tq('panier')],['les œufs qui restent dans le nid',tq('B'),tq('nid')],['tous les œufs pondus',tq('C'),tq('pondus')]],
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
      else if(T<com){ T>=tPoule?g.fier():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
