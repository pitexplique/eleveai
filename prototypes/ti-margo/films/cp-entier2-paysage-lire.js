/* ============================================================
   Série Nombres entiers CP — PAYSAGE 07 : « Le bus de la piscine » (micro cp_entier_lire_ecrire), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js + cp-entier3-dessins.js.
   Voix : manim/voix/cp-entier-lire-paysage.json. Un bus dans la brume, le ticket « 4 puis 7 » → 47 ; le piège 74 ;
   écrire ce qu'on entend (vingt-huit → 2 puis 8). Questions en plein milieu : « trente-deux » → B (32) ; le casier 65 → A.
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = le bus caché dans la brume + « Est-ce que c'est le nôtre ? ».
   Pendant les questions, les dessins restent à gauche de l'ardoise (x < 520) ; la carte est à droite.
   ============================================================ */
FILMS['lire']=function(outils){
  const DUR={'00-accroche':13.14,'01-lire':11.38,'02-piege':7.58,'03-ecrire':14.05,'04-question':16.02,'04b-reponse':8.87,
    '05-question':16.86,'05b-reponse':9.78,'06-appris':11.19,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-lire':.6,'02-piege':1,'03-ecrire':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,li,pi,ec,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:48px!important;white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tCe=m0('Ce'), tBus=m0('bus',2), tBrume=m0('brume'), tEst=m0('Est-ce'), tTicket=m0('ticket'), tQ4=m0('quatre'), tQ7=m0('sept');
  const ml=(w,n=1)=>mot('01-lire',w,n), tL4=ml('quatre'), tL40=ml('quarante'), tL7=ml('sept'), tL47=ml('Quarante-sept'), tLbus=ml('bus');
  const mp=(w,n=1)=>mot('02-piege',w,n), tP7=mp('sept'), tP74=mp('soixante-quatorze'), tPce=mp('Ce');
  const me=(w,n=1)=>mot('03-ecrire',w,n), tChauf=me('chauffeur'), tE28=me('vingt-huit'), tE20=me('vingt'), tE2=me('deux'), tE8=me('huit',2), tE28b=me('Vingt-huit',2);
  const ma=(w,n=1)=>mot('06-appris',w,n), tDiz=ma('dizaines'), tOrdre=ma("L'ordre");
  const finTitre=tCe-.08;

  /* un grand nombre à deux chiffres (dizaines orange, unités bleu) dans un cadre sombre, au-dessus du bus */
  function grandNombre(c,s,x,y,taille,zs=[1,1],cols=[CRAIE.r1,CRAIE.r0]){ c.fillStyle='rgba(20,40,30,.85)'; c.beginPath(); c.roundRect(x-taille*.75,y-taille*.62,taille*1.5,taille*1.2,26); c.fill();
    return nombreDUE(c,s,x,y,taille,cols,zs); }
  const pulse=(T,t0,t1)=>T>=t0&&T<t1?1+.14*Math.sin(T*7):1;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* 47 et 74 : l'ordre des chiffres compte */
      const pz=pulse(T,tDiz,tOrdre);
      grandNombre(c,'47',300,300,190,[pz,1]); grandNombre(c,'74',760,300,190,[pz,1]);
      if(T>=tOrdre) ecrire(c,'≠',530,300,150*zoom(T,tOrdre,.5),CRAIE.jaune);
      ecrire(c,'quarante-sept',300,480,46,CRAIE.blanc); ecrire(c,'soixante-quatorze',760,480,46,CRAIE.blanc);
      tab.maj(); return; }
    if(T>=q2){ /* le bracelet du casier : 65 */
      piscineE(c,T,600);
      const ouvre=T>=r2?mot('05b-reponse','Voilà'):Infinity;
      if(T<ouvre){ braceletE(c,240,300,1);
        const tS=mot('05b-reponse','six'), tC5=mot('05b-reponse','cinq');
        nombreDUE(c,'65',240,300,120,T>=r2?[CRAIE.r1,CRAIE.r0]:['#212529','#212529'],[pulse(T,tS,tC5),pulse(T,tC5,tC5+1.4)]);
        if(T>=r2){ const t60=mot('05b-reponse','soixante'), t65=mot('05b-reponse','soixante-cinq');
          if(T>=t60&&T<t65) ecrire(c,'soixante',240,530,56*zoom(T,t60,.5),CRAIE.r1);
          if(T>=t65) ecrire(c,'soixante-cinq',240,530,56*zoom(T,t65,.5),CRAIE.ok); } }
      else { casierE(c,260,560,210,330,'65',entreE(T,ouvre,ouvre+.8)); ecrire(c,'65',260,170,90,CRAIE.ok);
        for(const [x,y] of [[120,260],[400,260]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }
    if(T>=q1){ /* « trente-deux ! » : quel numéro est écrit ? */
      routeE(c,600); const b=busE(c,250,600,420,'#fcc419');
      const t3=mot('04b-reponse','trois'), t2=mot('04b-reponse','deux',2), t32=mot('04b-reponse','Trente-deux');
      if(T<r1){ const tc=mot('04-question','trente-deux'); if(T>=tc){ bulleE(c,270,170,430,110,90,330,'trente-deux !',58,zoom(T,tc,.4)); if(T<tc+2.5) ondesE(c,470,170,T); }
        ecrire(c,'? ?',b.px,b.py+2,b.ph*.8,CRAIE.jaune); }
      else { if(T>=t3) ecrire(c,'3',b.px-22,b.py+2,b.ph*.85*zoom(T,t3,.4),CRAIE.r1); if(T>=t2) ecrire(c,'2',b.px+22,b.py+2,b.ph*.85*zoom(T,t2,.4),CRAIE.r0);
        if(T>=t3) grandNombre(c,T>=t2?'32':'3 ',270,170,130,[zoom(T,t3,.5),T>=t2?zoom(T,t2,.5):0]);
        if(T>=t32) for(const [x,y] of [[120,90],[420,90]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }
    if(T>=ec){ /* écrire ce que j'entend : vingt-huit → 2, puis 8 */
      routeE(c,600); busE(c,720,600,520,'#fcc419');
      if(T>=tChauf){ bulleE(c,720,140,440,110,520,330,T>=tE28?'vingt-huit':'…',62,zoom(T,tChauf,.4)); if(T>=tE28&&T<tE28+2.2) ondesE(c,950,140,T); }
      if(T>=tE20) ecrire(c,'vingt',150,190,46*zoom(T,tE20,.5),CRAIE.r1);
      if(T>=tE2) ecrire(c,'2',170,360,210*zoom(T,tE2,.5),CRAIE.r1);
      if(T>=tE8){ ecrire(c,'huit',320,190,46,CRAIE.r0); ecrire(c,'8',300,360,210*zoom(T,tE8,.5),CRAIE.r0); }
      if(T>=tE28b){ c.strokeStyle=CRAIE.ok; c.lineWidth=8; c.beginPath(); c.roundRect(80,230,320,260,30); c.stroke(); for(const [x,y] of [[80,230],[400,490]]) etincelle(c,x,y,16+6*Math.sin(T*6+x)); }
      tab.maj(); return; }

    /* le matin : l'arrêt, la route, le bus qui arrive dans la brume */
    routeE(c,600); arretBusE(c,110,600);
    let xb=T<tBus?1800:620+Math.max(0,(1-douxE(entreE(T,tBus,tBrume+.4))))*780;
    if(T>=pi&&T>=tPce) xb=620+douxE(entreE(T,tPce,tPce+1.6))*900;
    const b=busE(c,xb,600,560,'#fcc419');
    const brume=T<li?1:1-entreE(T,li,li+1.4);
    if(b&&T<li) ecrire(c,'? ?',b.px,b.py+2,b.ph*.8,'#868e96');
    brumeE(c,T,brume,0,1056,260,600);
    if(T>=tEst&&T<li) for(const [x,y] of [[xb-120,220],[xb+60,180],[xb+240,230]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    /* le ticket : un 4 puis un 7 */
    if(T>=tTicket&&T<li+.3){ ticketE(c,250,140,260,140,zoom(T,tTicket,.4)); if(T>=tQ4) ecrire(c,'4',205,145,100*zoom(T,tQ4,.5),CRAIE.r1); if(T>=tQ7) ecrire(c,'7',295,145,100*zoom(T,tQ7,.5),CRAIE.r0); }
    if(T>=li&&b){ /* 47 sur le bus, et en grand au-dessus ; puis le 7 qui saute devant (piège) */
      let s='47', z=[pulse(T,tL4,tL7),pulse(T,tL7,tL47)];
      if(T>=pi){ const u=entreE(T,tP7,tP7+.9); s=u<.5?'47':'74'; z=[1,1]; }
      ecrire(c,s,b.px,b.py+2,b.ph*.85,T>=pi&&T>=tP7+.45?CRAIE.faux:CRAIE.blanc);
      const X=620, Y=170;
      if(T<pi||T<tP7) grandNombre(c,'47',X,Y,150,z);
      else if(T<tP7+.9){ const u=entreE(T,tP7,tP7+.9); grandNombre(c,'  ',X,Y,150);
        const [ax,ay]=sautE([X-42,Y],[X+42,Y],u,90), [bx,by]=sautE([X+42,Y],[X-42,Y],u,-90);
        ecrire(c,'4',ax,ay,150,CRAIE.r1); ecrire(c,'7',bx,by,150,CRAIE.r0); }
      else grandNombre(c,'74',X,Y,150,[1,1],[CRAIE.r0,CRAIE.r1]);
      if(T<pi){ if(T>=tL40&&T<tL47) ecrire(c,'40',X-42,Y+125,60*zoom(T,tL40,.5),CRAIE.r1);
        if(T>=tL47) ecrire(c,'quarante-sept',X,Y+125,56*zoom(T,tL47,.5),CRAIE.ok);
        if(T>=tLbus) for(const [x,y] of [[X-150,90],[X+150,90]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      else if(T>=tP74){ ecrire(c,'soixante-quatorze',X,Y+125,52*zoom(T,tP74,.5),CRAIE.faux); } }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Quel'); const phrase1=[qa('Quel numéro est écrit sur son bus ?')];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Comment'); const phrase2=[qb('Comment se lit ce nombre ?')];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=w=>mot('05-question',w)-q2;
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const tB=mr1('B'), tA=mr2('A');
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:1,tBon:tB-r1,
      phrase:phrase1,pause:pause1,
      choix:[['23',tqa('A'),tqa('vingt-trois')],['32',tqa('B'),tqa('trente-deux',2)],['302',tqa('C'),tqa('trois')]],
      tete:[[r1+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('Trente : un 3 devant.',[mr1('trente'),mr1('trente'),mr1('un'),mr1('trois'),mr1('devant')]),
        phraseE('Deux : un 2 derrière.',[mr1('deux'),mr1('deux'),mr1('un',2),mr1('deux',2),mr1('derrière')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:0,tBon:tA-r2,
      phrase:phrase2,pause:pause2,
      choix:[['soixante-cinq',tqb('A'),tqb('soixante-cinq')],['cinquante-six',tqb('B'),tqb('cinquante-six')],['six-cinq',tqb('C'),tqb('six-cinq')]],
      tete:[[r2+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('Un 6 devant : soixante.',[mr2('Un'),mr2('six'),mr2('devant'),mr2('devant'),mr2('soixante')]),
        phraseE('Un 5 derrière : soixante-cinq.',[mr2('Un',2),mr2('cinq'),mr2('derrière'),mr2('derrière'),mr2('soixante-cinq')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tEst+.3,'Est-ce<br>notre bus ?<div style="font-size:150px;margin-top:6px">🚌</div>');
  return { clips,FIN,titre:'Le bus de la piscine',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,ec,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<li) T>=tEst&&T<tTicket?g.reflechit():g.montre();
      else if(T<pi) T>=tL47?g.fier():g.montre();
      else if(T<ec) T>=tP74?g.oups():g.montre();
      else if(T<q1) T>=tE28b?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.reflechit(); }
    } };
};
