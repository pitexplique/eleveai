/* ============================================================
   Série Nombres entiers CP — PAYSAGE 01 : « Combien de fraises ? » (micro cp_entier_denombre), 25/11/2026.
   Outils : cp-commun.js + cp-entier.js (relu par cp-entier-paysage.js). Voix : manim/voix/cp-entier-denombre-paysage.json.
   Au soleil couchant, Ti Margo compte ses 7 fraises et en compte une deux fois (« Oups ! »). Son astuce : une fraise,
   un nombre, hop dans le bol. Le dernier nombre dit, c'est combien : 7.
   Deux questions EN PLEIN MILIEU (Frédéric, 25/11) : 5 pommes dans l'arbre (B), 7 ballons dans le ciel (C).
   ⭐ Pendant les questions, l'ardoise reste visible (les dessins à gauche), la carte est à droite.
   ============================================================ */
FILMS['denombre']=function(outils){
  const DUR={'00-accroche':17.41,'01-astuce':6.76,'02-compte':8.91,'03-dernier':6.34,'04-question':15.08,'04b-reponse':5.96,
    '05-question':13.46,'05b-reponse':4.84,'06-appris':6.38,'07-abonne':9.74};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-astuce':.5,'02-compte':.6,'03-dernier':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ast,cpt,der,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();

  const m0=w=>mot('00-accroche',w);
  const tLe=m0('Le'), tSol=m0('soleil'), tAss=m0('assiette'), tFr=m0('fraises'), tCoeur=m0('cœurs'), tComb=m0('Combien'),
        tC4=['Un','deux','trois','quatre'].map(m0), tOups=m0('Oups');
  const tAst=mot('01-astuce','astuce'), tPrend=mot('01-astuce','prends'), tNomb=mot('01-astuce','nombre'), tHop=mot('01-astuce','hop');
  const tCompte=['Un','Deux','Trois','Quatre','Cinq','Six','Sept'].map(w=>mot('02-compte',w));
  const tDern=mot('03-dernier','dernier'), tSept=mot('03-dernier','sept'), tCoeur2=mot('03-dernier','cœurs');
  const tPom=mot('04-question','pommes'), tRP=['Un','deux','trois','quatre','cinq'].map(w=>mot('04b-reponse',w)), tCinq2=mot('04b-reponse','cinq',2);
  const tBal=mot('05-question','ballons'), tVol=mot('05-question',"s'envolent"), tRC=mot('05b-reponse','C'), tSeptB=mot('05b-reponse','Sept'), tVent=mot('05b-reponse','vent');
  const tTouche=mot('06-appris','touche'), tFois=mot('06-appris','fois'), tDern2=mot('06-appris','dernier'), tComb2=mot('06-appris','combien');
  const tRep=mot('07-abonne','commentaire');
  const finTitre=tLe-.08;

  /* Les 7 fraises sur l'assiette (en désordre), et leur place dans le bol */
  const FR=[[150,448],[268,426],[392,452],[508,430],[208,540],[336,552],[462,538]];
  const BOL=[800,455], DANS=[[722,425],[800,420],[878,425],[760,378],[840,378],[800,334],[722,372]];
  /* Quand chaque fraise saute dans le bol : la 1re au « hop » de l'astuce, les autres au nombre dit */
  const sautDe=k=>k===0?tHop-.15:tCompte[k]-.4;
  const posFraise=(k,T)=>{ const d=sautDe(k); return T<d?FR[k]:sautE(FR[k],DANS[k],(T-d)/.5,140); };
  /* Les 5 pommes dans le pommier, les 7 ballons dans le ciel (à gauche de l'ardoise : la carte est à droite) */
  const POM=[[153,326],[286,251],[412,326],[208,447],[352,430]];
  const BAL=[[85,250],[205,140],[320,265],[445,150],[465,385],[125,430],[315,455]],
        COUL_B=['#ff6b6b','#ffd43b','#74c0fc','#b197fc','#ff922b','#8ce99a','#faa2c1'];
  const RANG=k=>[135+k*131,390];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : je touche chaque fraise une fois, le dernier nombre dit combien */
      const pas=k=>tTouche+.1+k*((tFois+.9-tTouche)/7);
      for(let k=0;k<7;k++){ const [x,y]=RANG(k), touche=T>=pas(k);
        fraiseCraie(c,x,y,56,1,touche&&T<pas(k)+.5?1:0);
        if(touche) etiquette(c,String(k+1),x,y+105,T,pas(k),k===6&&T>=tDern2?CRAIE.ok:CRAIE.jaune,k===6&&T>=tDern2?62:50); }
      const kd=Math.min(6,Math.max(0,Math.floor((T-tTouche-.1)/((tFois+.9-tTouche)/7))));
      if(T>=tTouche&&T<pas(6)+.6){ const [x,y]=RANG(kd); doigtE(c,x,y-52,100); }
      if(T>=tDern2) cercle(c,RANG(6)[0],RANG(6)[1]+105,62,CRAIE.ok,entreE(T,tDern2,tDern2+.4));
      if(T>=tComb2) ecrire(c,'7',528,170,150*zoom(T,tComb2,.5),CRAIE.ok);
      tab.maj(); return; }
    if(T>=q2){ /* les ballons s'envolent, et se balancent dans le vent */
      const monte=k=>(1-douxE(entreE(T,tVol-.4+k*.12,tVol+1+k*.12)))*380;
      BAL.forEach(([x,y],k)=>{ if(T<tBal+k*.06) return; const bx=x+10*Math.sin(T*1.4+k*1.7), by=y+monte(k)+6*Math.sin(T*1.1+k);
        const n=tRC+.35+k*.17, allume=T>=r2&&T>=n;
        ballonAir(c,bx,by,50,COUL_B[k],zoom(T,tBal+k*.06,.4),allume?.6+.4*Math.sin(T*5+k):0);
        if(allume) etiquette(c,String(k+1),bx,by,T,n,CRAIE.blanc,46); });
      if(T>=tSeptB) ecrire(c,'7',90,110,130*zoom(T,tSeptB,.5),CRAIE.ok);
      if(T>=tVent) for(let k=0;k<3;k++){ const y=560+k*42, x=60+((T*120+k*140)%460); c.strokeStyle='rgba(248,249,250,.45)'; c.lineWidth=4; c.beginPath(); c.moveTo(x,y); c.quadraticCurveTo(x+40,y-16,x+80,y); c.stroke(); }
      tab.maj(); return; }
    if(T>=q1){ /* le pommier et ses 5 pommes */
      pommierCraie(c,280,705,1.1,1);
      POM.forEach(([x,y],k)=>{ const allume=T>=r1&&T>=tRP[k]; pommeE(c,x,y,44,zoom(T,tPom+k*.08,.4),allume?.6+.4*Math.sin(T*5+k):0);
        if(T>=r1) etiquette(c,String(k+1),x+50,y-50,T,tRP[k],CRAIE.blanc,44); });
      if(T>=tCinq2) ecrire(c,'5',90,110,130*zoom(T,tCinq2,.5),CRAIE.ok);
      tab.maj(); return; }

    /* L'accroche, l'astuce, le compte : l'assiette, les fraises, le soleil couchant, puis le bol */
    if(T<ast&&T>=tSol) soleilCouchant(c,820,330,110,entreE(T,tSol,tSol+1.2));
    if(T>=tAss) assietteCraie(c,330,520,580,zoom(T,tAss,.4));
    if(T>=tAst) bolCraie(c,BOL[0],BOL[1],340,zoom(T,tAst,.4));
    if(T>=tFr) FR.forEach((p,k)=>{ let [x,y]=posFraise(k,T);
      if(k===0&&T>=tPrend&&T<sautDe(0)) y-=36*douxE(entreE(T,tPrend,tPrend+.4));   /* « je prends une fraise » : elle se soulève */
      const arrive=T>=cpt&&T>=sautDe(k)+.5;
      let l=0;
      if(T>=tCoeur&&T<tCoeur+1.4) l=.5+.5*Math.sin((T-tCoeur)*7);                  /* « des petits cœurs » : elles brillent */
      if(arrive&&T<sautDe(k)+1.1) l=1;                                               /* elle arrive dans le bol */
      if(T>=tSept&&T<q1) l=.6+.4*Math.sin(T*5+k);                                    /* sept fraises : toutes allumées */
      fraiseCraie(c,x,y,50,zoom(T,tFr+k*.07,.4),l); });
    if(T>=tComb&&T<tC4[0]) ecrire(c,'?',330,250,120*zoom(T,tComb,.4),CRAIE.jaune);
    if(T>=tC4[0]&&T<ast){ /* Ti Margo compte… et compte deux fois la même ! */
      [0,1,2].forEach(k=>{ const [x,y]=FR[k]; etiquette(c,String(k+1),x,y-100,T,tC4[k],CRAIE.jaune,46); });
      if(T>=tC4[3]){ const [x,y]=FR[1]; etiquette(c,'4',x,y-170,T,tC4[3],CRAIE.faux,52); }
      if(T>=tOups){ const [x,y]=FR[1]; cercle(c,x,y,82,CRAIE.faux,entreE(T,tOups,tOups+.4)); } }
    if(T>=tNomb&&T<sautDe(0)+.3){ const [x,y]=FR[0]; etiquette(c,'1',x,y-110,T,tNomb,CRAIE.jaune,46); }
    if(T>=cpt){ /* le nombre grandit au-dessus du bol, à chaque fraise */
      const n=tCompte.filter(t=>T>=t).length;
      if(n>0){ const tn=tCompte[n-1], fini=T>=tDern;
        ecrire(c,String(n),BOL[0],175,(fini?170:140)*(fini?zoom(T,tDern,.5):zoom(T,tn,.5)),fini?CRAIE.ok:CRAIE.jaune); } }
    if(T>=tCoeur2&&T<q1) for(const [x,y] of [[650,300],[950,300],[700,200],[905,215],[800,560]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
    tab.maj();
  }

  /* La carte des deux questions */
  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('des'); const phrase1=[qa('Des pommes.'),qa('Combien ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et compte !')];
  qb('Question !'); qb.jusque('Des'); const phrase2=[qb('Des ballons'),(qb.jusque('Combien'),qb('Combien ?'))]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et compte !')];
  const tqa=m=>mot('04-question',m)-q1, tqb=m=>mot('05-question',m)-q2;
  const tB=mot('04b-reponse','B'), tC=tRC;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:1,tBon:tB-r1,
      phrase:phrase1,pause:pause1,
      choix:[['4',tqa('A'),tqa('quatre')],['5',tqa('B'),tqa('cinq')],['6',tqa('C'),tqa('six')]],
      tete:[[r1+.1,'Réponse '],[tB,'B !']],reponse:[phraseE('5 pommes',[tCinq2,mot('04b-reponse','pommes')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:2,tBon:tC-r2,
      phrase:phrase2,pause:pause2,
      choix:[['8',tqb('A'),tqb('huit')],['6',tqb('B'),tqb('six')],['7',tqb('C'),tqb('sept')]],
      tete:[[r2+.1,'Réponse '],[tC,'C !']],reponse:[phraseE('7 ballons',[tSeptB,mot('05b-reponse','ballons')])],suite:[] }
  ];
  /* Le seul texte hors des cartes : le titre de la fin, en haut et centré (pour ceux qui commencent à lire) */
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tC4[0]+.2,'Combien de<br>fraises ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>');
  return { clips,FIN,titre:'Combien de fraises ?',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,ast,cpt,der,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ast){ T<tComb?g.ouvre():(T<tOups?g.montre():g.oups()); }
      else if(T<der) g.montre();
      else if(T<q1) g.fier();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
