/* ============================================================
   Série Nombres entiers CP — SHORT 04 : « Les noisettes des écureuils » (micro cp_entier_comparer), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js. Voix : manim/voix/cp-entier-comparer-short.json.
   Il neige. Le roux a fait un tas tout haut, le gris a étalé ses noisettes : 7 et 7.
   Question : qui en a le plus ? C (autant). Ceinture blanche. Commentaire : 12 ou 21 ?
   ⭐ La carte se range à droite sous l'ardoise, Ti Margo à gauche (comme les shorts 01-03).
   ============================================================ */
FILMS['comparer']=function(outils){
  const DUR={'00-accroche':9.64,'01-question':12.26,'01b-reponse':10.79,'02-commentaire':7.4,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tIl=m0('Il'), tDeux=m0('Deux'), tNois=m0('noisettes'), tRoux=m0('roux'), tTas=m0('tas'), tHaut=m0('haut');
  const mr=w=>mot('01b-reponse',w);
  const tC=mr('C'), tSept1=mr('Sept'), tSept2=mot('01b-reponse','sept',2), tIls=mr('Ils'), tAut=mr('autant'), tUn=mr('Un'), tPas=mr('Pas');
  const tDouze=mot('02-commentaire','douze'), tVingt=mot('02-commentaire','vingt'), tLequel=mot('02-commentaire','lequel'), tRep=mot('02-commentaire','réponds');
  const finTitre=tIl-.08;

  const ROUX='#e8590c', GRIS='#adb5bd', XR=k=>392+k*78;
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 12 ou 21 ? */
      if(T>=tDouze) ecrire(c,'12',290,330,210*zoom(T,tDouze,.5),CRAIE.jaune);
      if(T>=tVingt) ecrire(c,'21',766,330,210*zoom(T,tVingt,.5),CRAIE.r0);
      if(T>=tLequel) ecrire(c,'?',528,330,150*zoom(T,tLequel,.5),CRAIE.blanc);
      tab.maj(); return; }
    /* l'hiver : la neige au sol, deux sapins, les flocons */
    c.fillStyle='#e7f5ff'; c.fillRect(0,640,1056,80);
    sapinE(c,60,650,.75); sapinE(c,1000,650,.75);
    if(T>=tDeux){ ecureuilE(c,175,648,1.2*zoom(T,tDeux,.4),ROUX,1,T); ecureuilE(c,975,648,1.2*zoom(T,tDeux+.25,.4),GRIS,-1,T+1); }
    /* le gris : 7 noisettes étalées */
    if(T>=tNois) for(let k=0;k<7;k++) noisetteE(c,XR(k),604,34,zoom(T,tNois+k*.08,.4),T>=tPas?.5+.5*Math.sin(T*5+k):0);
    /* le roux : 7 noisettes en tas tout haut (une colonne qui oscille), puis elles se rangent face au gris */
    const range=T>=r&&T>=tIls?douxE(entreE(T,tIls,tIls+.9)):0;
    if(T>=tTas) for(let k=0;k<7;k++){ const t0=tTas+k*.12; if(T<t0) continue;
      const cx=318+Math.sin(T*2.2)*k*1.6, cy=604-k*66, bx=XR(k), by=500;
      noisetteE(c,cx+(bx-cx)*range,cy+(by-cy)*range,34,zoom(T,t0,.4),T>=tPas?.5+.5*Math.sin(T*5+k):0); }
    if(T>=tHaut&&T<q) for(const [x,y] of [[318,170],[380,260]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    /* la réponse : 7 et 7, puis face à face, puis 7 = 7 */
    if(T>=r&&T<tIls){ etiquette(c,'7',420,150,T,tSept1,CRAIE.jaune,60); etiquette(c,'7',626,500,T,tSept2,CRAIE.jaune,60); }
    if(T>=r&&T>=tIls){ for(let k=0;k<7;k++) lienE(c,[XR(k),530],[XR(k),566],entreE(T,tIls+.9+k*.08,tIls+1.2+k*.08));
      if(T>=tAut) compareE(c,7,7,600,200,170*zoom(T,tAut,.4),'=',1,CRAIE.ok,CRAIE.ok); }
    if(T<com) neigeE(c,T);
    tab.maj();
  }

  const qd=dit('01-question'), rd=dit('01b-reponse');
  qd('Question !'); const phraseQ=[qd('Qui a le plus de noisettes ?')];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('7 et 7 :',[tSept1,mr('et'),tSept2,tSept2]);
  rd.jusque('Ils'); const r2=rd('Ils en ont autant !');
  const pt=coul=>`<span style="color:${coul};font-size:.8em">●</span> `;

  poserMiniature(outils,q-.3,'Qui en a<br>le plus ?'+PARI,ardoiseMini([['🐿️ 🌰 🐿️'],['?','#ffd43b']]));
  return { clips,FIN,titre:'Les écureuils',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[pt(ROUX)+'le roux',tq('A'),tq('roux')],[pt(GRIS)+'le gris',tq('B'),tq('gris')],['autant',tq('C'),tq('autant')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tRoux?g.ouvre():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tPas?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
