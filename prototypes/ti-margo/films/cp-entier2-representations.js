/* ============================================================
   Série Nombres entiers CP — SHORT 11 : « Les mains derrière le mur » (micro cp_entier_representations), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js + cp-entier3-dessins.js. Voix : manim/voix/cp-entier-representations-short.json.
   Derrière un mur de pierres, quatre copains lèvent leurs deux mains (10 doigts chacun), un cinquième lève 3 doigts.
   Question : C (43) ; pièges 7 (4 + 3) et 34 (dizaines et unités inversées).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = les mains qui surgissent une à une derrière le mur + « Combien de doigts ? ».
   Ceinture blanche. Commentaire : 25 = ? barres + ? cubes. La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['representations']=function(outils){
  const DUR={'00-accroche':10.86,'01-question':17.48,'01b-reponse':9.12,'02-commentaire':9.71,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.6,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tDerr=m0('Derrière'), tUne=m0('Une'), tDeuxM=m0('deux'), tEnc1=m0('encore'), tEnc2=m0('encore',2), tCombien=m0('Combien');
  const mq=(w,n=1)=>mot('01-question',w,n), tQDix=mq('dix'), tQTrois=mq('trois');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tRDeux=mr('Deux'), tRMains=mr('mains'), tRDix=mr('dix'), tRDoigts=mr('doigts'), tCpt=[mr('dix',2),mr('vingt'),mr('trente'),mr('quarante')], tEt=mr('et'), tTrois=mr('trois'), t43=mr('quarante-trois');
  const mc=w=>mot('02-commentaire',w), t25=mc('vingt-cinq'), tBarres=mc('barres'), tCubes=mc('cubes'), tCombC=mc('combien'), tRep=mc('réponds');
  const finTitre=tDerr-.08;
  const pulse=(T,t0,d=1)=>T>=t0&&T<t0+d?1+.25*Math.sin((T-t0)*Math.PI/d):1;

  /* les 9 mains : 4 copains × 2 mains, puis un copain qui lève 3 doigts */
  const MANCHE=['#e03131','#1c7ed6','#2f9e44','#be4bdb','#f08c00'], YM=480;
  const MAINS=[]; for(let k=0;k<4;k++){ const b=68+k*228; MAINS.push({x:b,k,d:5,droite:false},{x:b+104,k,d:5,droite:true}); } MAINS.push({x:982,k:4,d:3,droite:true});
  const SORT=[tUne,tDeuxM,tEnc1,tEnc1+.18,tEnc1+.36,tEnc2,tEnc2+.18,tEnc2+.36,tEnc2+.56];
  const PAIRE=k=>k<4?MAINS[2*k].x+52:982, COPAINS=['chat','lapin','ours','cochon','souris'];
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 25 = ? barres + ? cubes */
      const Y=330;
      if(T>=t25){ numDUE(c,25,170,Y,140*zoom(T,t25,.5)); ecrire(c,'=',320,Y,110,CRAIE.blanc); }
      barreDixE(c,515,Y+190,38,zoom(T,com+.15,.5)*pulse(T,tBarres,.8));
      ecrire(c,'+',615,Y,110*zoom(T,com+.3,.5),CRAIE.blanc); cubeUniteE(c,860,Y+50,96,zoom(T,com+.45,.5)*pulse(T,tCubes,.8));
      if(T>=tCombC){ const z=zoom(T,tCombC,.5)*(1+.05*Math.sin(T*5)); ecrire(c,'?',420,Y,130*z,CRAIE.jaune); ecrire(c,'?',730,Y,130*z,CRAIE.jaune); }
      if(T>=tBarres) ecrire(c,'barres de 10',460,640,60,CRAIE.r1); if(T>=tCubes) ecrire(c,'cubes',830,640,60,CRAIE.r0);
      tab.maj(); return; }
    /* le ciel de la cour, le soleil */
    c.fillStyle='#74c0fc'; c.fillRect(0,0,1056,YM); c.fillStyle='#ffe066'; c.beginPath(); c.arc(960,90,50,0,7); c.fill();
    /* les copains sortent de derrière le mur en riant */
    const sort=T>=r?entreE(T,t43+.3,t43+1.2):0;
    if(sort>0) COPAINS.forEach((qui,k)=>copainE(c,qui,PAIRE(k),YM+230-260*douxE(sort)+6*Math.sin(T*8+k),1.2));
    MAINS.forEach((m,i)=>{ const u=douxE(entreE(T,SORT[i],SORT[i]+.4)); if(u<=0) return;
      let lueur=0; if(T>=r&&T<tCpt[0]&&m.k===0&&T>=tRDeux) lueur=.6+.4*Math.sin(T*6);
      if(T>=r&&m.k<4&&T>=tCpt[m.k]&&T<tCpt[m.k]+.8) lueur=.8;
      if(T>=r&&m.k===4&&T>=tEt&&T<t43+.8) lueur=.6+.4*Math.sin(T*6);
      const y=YM+30+280*(1-u)+300*douxE(sort);
      mainLeveeE(c,m.x,y,1.9,m.d,MANCHE[m.k],{droite:m.droite,lueur,a:.06*Math.sin(T*3+i)}); });
    murPierresE(c,0,1056,YM,720);
    /* les nombres : « 10 » au-dessus de chaque copain, « 3 » ; puis 10, 20, 30, 40… 41, 42, 43 */
    if(T>=q&&T<r){ if(T>=tQDix) for(let k=0;k<4;k++) plaqueNumE(c,10,PAIRE(k),190,58,[1,1],0);
      if(T>=tQTrois) plaqueNumE(c,3,982,190,58); }
    if(T>=r){ for(let k=0;k<4;k++){ const n=T>=tCpt[k]?10*(k+1):10; plaqueNumE(c,n,PAIRE(k),190,58*(T>=tCpt[k]?zoom(T,tCpt[k],.5):1),[1,1],T>=tCpt[k]?.4:0); }
      const n5=T<tEt?3:(T<t43?41+Math.min(1,Math.floor(entreE(T,tEt,t43)*2)):43); plaqueNumE(c,n5,982,190,58,[1,1],T>=tEt?.5:0);
      if(T>=t43){ plaqueNumE(c,43,528,85,100*zoom(T,t43,.5)); for(const [x,y] of [[400,60],[660,70]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
    if(T>=tCombien&&T<q) ecrire(c,'?',528,120,140*zoom(T,tCombien,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); qd.jusque('Combien'); const phraseQ=[qd('Combien de doigts en tout ?')];
  const tq=(w,n=1)=>mq(w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('2 mains : 10 doigts.',[tRDeux,tRMains,tRMains,tRDix,tRDoigts]);
  const r2=phraseE('10, 20, 30, 40… et 3 : 43',[tCpt[0],tCpt[1],tCpt[2],tCpt[3],tEt,tTrois,tTrois,t43]);

  poserMiniature(outils,q-.3,'Combien de<br>doigts ?',ardoiseMini([['🖐🖐🖐'],['?','#ffd43b']]));
  return { clips,FIN,titre:'Les mains derrière le mur',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7',tq('A'),tq('sept')],['34',tq('B'),tq('trente-quatre')],['43',tq('C'),tq('quarante-trois')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tCombien?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<t43?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
