/* ============================================================
   Série Idriss, monnaie CP — PAYSAGE 10 : « La sardine du petit garçon » (micro cp_monnaie_rendre), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-rendre-paysage.json.
   Une sardine à 3 €, payée avec un billet de 5 € : Idriss part du prix et avance jusqu'à 5 (4, 5) : il rend 2 €.
   Questions : crevettes à 4 €, billet de 5 € → C (1 €) ; dorade à 17 €, billet de 20 € → B (3 €).
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['cp-rendre']=function(outils){
  const DUR={'00-accroche':9.16,'01-trop':6.525,'02-avance':8.865,'03-verif':9.225,'04-question':18.165,'04b-reponse':6.745,
    '05-question':18.065,'05b-reponse':8.395,'06-appris':5.385,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-trop':1,'02-avance':1.2,'03-verif':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,tr,av,ve,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:52px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tUn0=m0('Un'), tGarcon=m0('garçon'), tSardine=m0('sardine'), tTrois0=m0('trois'), tDonne0=m0('donne'), tCinq0=m0('cinq');
  const mt=w=>mot('01-trop',w), tPlusT=mt('plus'), tTroisT=mt('trois'), tRendre=mt('rendre'), tMonnaie=mt('monnaie');
  const mv=(w,n=1)=>mot('02-avance',w,n), tPrixV=mv('prix'), tTroisV=mv('trois'), tQuatreV=mv('quatre'), tCinqV=mv('cinq',2), tDeuxV=mv('Deux'), tRendV=mv('rend'), tEurosV=mv('euros');
  const mf=(w,n=1)=>mot('03-verif',w,n), tPrixF=mf('prix'), tMonnaieF=mf('monnaie'), tDonneF=mf('donné'), tTroisF=mf('Trois'), tPlusF=mf('plus',2), tDeuxF=mf('deux'), tCinqF=mf('cinq'), tBon=mf('bon');
  const mq1=(w,n=1)=>mot('04-question',w,n), tSeau=mq1('seau'), tQuatreQ=mq1('quatre'), tCinqQ=mq1('cinq'), tCombien1=mq1('Combien');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tQuatre1=mr1('Quatre'), tCinq1=mr1('cinq'), tSeul1=mr1('seul'), tRend1=mr1('rend'), tEuro1=mr1('euro');
  const mq2=(w,n=1)=>mot('05-question',w,n), tDorade=mq2('dorade'), tDixSeptQ=mq2('dix-sept'), tVingtQ=mq2('vingt'), tCombien2=mq2('Combien');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB2=mr2('B'), t17=mr2('Dix-sept'), t18=mr2('dix-huit'), t19=mr2('dix-neuf'), t20=mr2('vingt'), tPas2=mr2('pas'), tTrois2=mr2('trois',2), tEuros2=mr2('euros');
  const mA=w=>mot('06-appris',w), tParsA=mA('pars'), tAvanceA=mA("j'avance"), tDonneA=mA('donné');
  const finTitre=tUn0-.08;

  const EX0=40, EX1=620, EY=470;
  function marche(c,T){ quaiBoisE(c,T,140); etalE(c,EX0,EX1,EY);
    c.fillStyle='#d0ebff'; c.strokeStyle='#74c0fc'; c.lineWidth=4; c.beginPath(); c.roundRect(EX0+16,300,EX1-EX0-32,EY-300,14); c.fill(); c.stroke();
    if(T>=tSardine) poissonE(c,330,400,240,'#adb5bd',{T,z:zoom(T,tSardine,.4),ray:'#495057'});
    if(T>=tTrois0) prixE(c,'3 €',330,225,72,{z:zoom(T,tTrois0,.5)});
    idrissE(c,700,705,1.25,{T});
    if(T>=tGarcon) enfantE(c,930,715,1.3,{k:0,T,bras:T>=tDonne0?.35:0});
    if(T>=tCinq0) euroE(c,5,870,330,32,{z:zoom(T,tCinq0,.4),grand:1,a:-.1}); }
  /* une droite de n0 à n1, des sauts de pièces de 1 € : ts = l'instant de chaque pas */
  function pas(c,T,X,y,n0,ts,{piece=true,h=80}={}){ ts.forEach((t,k)=>{ if(T<t-.1) return; const a=n0+k, u=entreE(T,t-.1,t+.4);
      arcSautE(c,[X(a),y-30],[X(a+1),y-30],u,h,CRAIE.jaune);
      if(piece&&u>=1) euroE(c,1,(X(a)+X(a+1))/2,y-30-h-40,34,{z:zoom(T,t+.3,.4)}); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* je pars du prix, j'avance jusqu'à ce qu'on m'a donné */
      const X=droiteE(c,250,280,430,3,5,{taille:70,hi:{3:CRAIE.jaune,5:CRAIE.ok}});
      pas(c,T,X,430,3,[tAvanceA,tAvanceA+.5]);
      if(T>=tParsA) ecrire(c,'le prix',X(3),560,52*zoom(T,tParsA,.4),CRAIE.jaune);
      if(T>=tDonneA) ecrire(c,'donné',X(5),560,52*zoom(T,tDonneA,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=q2){ /* une dorade à 17 € ; la dame donne un billet de 20 € */
      quaiBoisE(c,T,40);
      if(T>=tDorade) poissonE(c,190,300,290,'#f3a5b8',{T,z:zoom(T,tDorade,.4),ray:'#c2255c'});
      if(T>=tDixSeptQ) prixE(c,'17 €',190,140,62,{z:zoom(T,tDixSeptQ,.5)});
      if(T>=tVingtQ) euroE(c,20,380,330,26,{z:zoom(T,tVingtQ,.4),grand:1,a:-.08});
      if(T<r2){ if(T>=tCombien2) ecrire(c,'rendu : ?',230,520,60*zoom(T,tCombien2,.5),CRAIE.jaune); }
      else { const X=droiteE(c,60,130,560,17,20,{taille:46,hi:{17:CRAIE.jaune,...(T>=t20?{20:CRAIE.ok}:{})}});
        pas(c,T,X,560,17,[t18,t19,t20],{h:60});
        if(T>=tPas2) ecrire(c,'3 pas',255,400,50*zoom(T,tPas2,.4),CRAIE.jaune);
        if(T>=tEuros2) formuleE(c,T,255,660,['17','+','3','=','20'],Array(5).fill(tEuros2),56,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]); }
      tab.maj(); return; }

    if(T>=q1){ /* un seau de crevettes à 4 € ; je donne un billet de 5 € */
      quaiBoisE(c,T,40);
      if(T>=tSeau){ seauCoulE(c,150,600,220,'#4dabf7','#1864ab'); for(let k=0;k<5;k++) crevetteE(c,80+k*36,440-(k%2)*16,70,{T,k,dir:k%2?1:-1}); }
      if(T>=tQuatreQ) prixE(c,'4 €',150,250,70,{z:zoom(T,tQuatreQ,.5)});
      if(T>=tCinqQ) euroE(c,5,380,180,28,{z:zoom(T,tCinqQ,.4),grand:1,a:-.08});
      if(T<r1){ if(T>=tCombien1) ecrire(c,'?',390,360,100*zoom(T,tCombien1,.5),CRAIE.jaune); }
      else { const X=droiteE(c,290,160,470,4,5,{taille:60,hi:{4:CRAIE.jaune,...(T>=tCinq1?{5:CRAIE.ok}:{})}});
        pas(c,T,X,470,4,[tCinq1],{piece:false,h:70});
        if(T>=tSeul1) ecrire(c,'1 pas',370,330,44*zoom(T,tSeul1,.4),CRAIE.jaune);
        if(T>=tRend1){ const p=sautE([370,330],[60,650],entreE(T,tRend1,tRend1+.7),120); euroE(c,1,p[0],p[1],46,{lueur:.6}); }
        if(T>=tEuro1) formuleE(c,T,370,620,['4','+','1','=','5'],Array(5).fill(tEuro1),62,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]); }
      tab.maj(); return; }

    if(T>=ve){ /* je vérifie : le prix + la monnaie = ce qu'il a donné */
      if(T>=tPrixF) ecrire(c,'le prix',220,200,60*zoom(T,tPrixF,.4),CRAIE.jaune);
      if(T>=tMonnaieF){ ecrire(c,'+',400,200,60,CRAIE.blanc); ecrire(c,'la monnaie',580,200,60*zoom(T,tMonnaieF,.4),CRAIE.jaune); }
      if(T>=tDonneF){ ecrire(c,'=',770,200,60,CRAIE.blanc); ecrire(c,'donné',900,200,60*zoom(T,tDonneF,.4),CRAIE.ok); }
      if(T>=tTroisF) formuleE(c,T,528,420,['3 €','+','2 €','=','5 €'],[tTroisF,tPlusF,tDeuxF,tCinqF,tCinqF],110,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      if(T>=tBon){ coche(c,880,590,1); ecrire(c,'Le compte est bon !',480,610,58*zoom(T,tBon,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T>=av){ /* Idriss part du prix et avance jusqu'à 5 : 4, 5 */
      const X=droiteE(c,250,280,430,3,5,{taille:70,hi:{3:CRAIE.jaune,...(T>=tCinqV?{5:CRAIE.ok}:{})}});
      /* le petit Idriss saute de nombre en nombre */
      let px=X(3); if(T>=tQuatreV-.1) px=X(3)+(X(4)-X(3))*entreE(T,tQuatreV-.1,tQuatreV+.4); if(T>=tCinqV-.1) px=X(4)+(X(5)-X(4))*entreE(T,tCinqV-.1,tCinqV+.4);
      if(T>=tTroisV) idrissE(c,px,400,.42,{T});
      pas(c,T,X,430,3,[tQuatreV,tCinqV],{h:110});
      if(T>=tPrixV) ecrire(c,'le prix',X(3),560,46*zoom(T,tPrixV,.4),CRAIE.jaune);
      if(T>=tDeuxV) ecrire(c,'2 pas',528,630,60*zoom(T,tDeuxV,.4),CRAIE.jaune);
      if(T>=tEurosV) formuleE(c,T,860,630,['3','+','2','=','5'],Array(5).fill(tEurosV),60,[CRAIE.blanc,CRAIE.blanc,CRAIE.jaune,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }

    if(T>=tr){ /* 5 € > 3 € : Idriss doit rendre la monnaie */
      euroE(c,5,300,320,56,{grand:1}); prixE(c,'3 €',760,320,110);
      if(T>=tPlusT) ecrire(c,'5 € > 3 €',528,540,96*zoom(T,tPlusT,.4),CRAIE.blanc);
      if(T>=tMonnaie) ecrire(c,'à rendre : la monnaie',528,660,62*zoom(T,tMonnaie,.4),CRAIE.jaune);
      tab.maj(); return; }

    marche(c,T);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa('Un seau de crevettes coûte quatre euros.'); qa('Je paie avec un billet de cinq euros.'); const phrase1=[qa('Combien Idriss me rend-il ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien lui rend-on ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('Prix : 4 €. Je donne 5 €.',[tQuatreQ,tQuatreQ,tQuatreQ,tQuatreQ,mq1('paie'),mq1('paie'),tCinqQ,tCinqQ]),...phrase1],pause:pause1,
      choix:[['9 €',tqa('A'),tqa('euros',3)],['4 €',tqa('B'),tqa('euros',4)],['1 €',tqa('C'),tqa('euro')]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('Idriss me rend 1 €.',[mr1('Idriss'),tRend1,tRend1,mr1('un',2),tEuro1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB2-r2,
      phrase:[phraseE('Prix : 17 €. Donné : 20 €.',[tDixSeptQ,tDixSeptQ,tDixSeptQ,tDixSeptQ,tVingtQ,tVingtQ,tVingtQ,tVingtQ]),...phrase2],pause:pause2,
      choix:[['37 €',tqb('A'),tqb('euros',3)],['3 €',tqb('B'),tqb('euros',4)],['17 €',tqb('C'),tqb('euros',5)]],
      tete:[[r2+.1,'Réponse '],[tB2,'B !']],reponse:[phraseE('Idriss rend 3 €.',[mr2('Idriss'),mr2('rend'),tTrois2,tEuros2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-avance')-.5,'Rendre<br>la monnaie');
  return { clips,FIN,titre:'La sardine du petit garçon',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,tr,av,ve,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) T>=tBon&&T<q1?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
