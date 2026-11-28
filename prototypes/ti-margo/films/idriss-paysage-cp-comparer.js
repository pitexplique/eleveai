/* ============================================================
   Série Idriss, monnaie CP — PAYSAGE 09 : « Qui a le plus ? » (micro cp_monnaie_comparer), 28/11/2026.
   Voix (validée) : manim/voix/idriss-cp-comparer-paysage.json.
   Elle a cinq pièces de 1 €, lui un billet de 10 € : beaucoup de pièces n'est pas beaucoup d'argent ; parfois c'est pareil.
   Questions : tas rouge (5 + 5) / tas bleu (2 + 1) → C (le rouge) ; panier vert (10) / panier jaune (5 + 5) → B (pareil).
   ⭐ Pendant les questions, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */
FILMS['cp-comparer']=function(outils){
  const DUR={'00-accroche':11.135,'01-piege':8.035,'02-compter':11.645,'03-pareil':6.1,'04-question':19.915,'04b-reponse':13.045,
    '05-question':19.18,'05b-reponse':7.915,'06-appris':6.655,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-piege':1,'02-compter':1.2,'03-pareil':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pg,co,pa,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:46px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tDeux0=m0('Deux'), tElle0=m0('Elle'), tCinq0=m0('cinq'), tLui0=m0('Lui'), tBillet0=m0('billet'), tQui0=m0('Qui');
  const mp=(w,n=1)=>mot('01-piege',w,n), tBeaucoup=mp('Beaucoup'), tPas=mp('pas'), tArgent=mp("d'argent"), tCompteP=mp('compte');
  const mc=(w,n=1)=>mot('02-compter',w,n), tC1=mc('un'), tC2=mc('deux'), tC3=mc('trois'), tC4=mc('quatre'), tC5=mc('cinq'), tEuros5=mc('euros'), tDixC=mc('dix'), tPlusC=mc('plus'), tGarcon=mc('garçon');
  const mpa=(w,n=1)=>mot('03-pareil',w,n), tPareil=mpa('pareil'), tDeuxPa=mpa('Deux'), tValent=mpa('valent'), tUnePa=mpa('une');
  const mq1=(w,n=1)=>mot('04-question',w,n), tRouge=mq1('rouge'), tCinqQ=mq1('cinq'), tBleu=mq1('bleu'), tDeuxQ=mq1('deux',2), tUnQ=mq1('un'), tLequel1=mq1('Lequel');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC=mr1('C'), tCinqR=mr1('cinq'), tDixR=mr1('dix'), tDixR2=mr1('dix',2), tDeuxR=mr1('deux'), tTroisR=mr1('trois'), tTroisR2=mr1('trois',2), tPlusR=mr1('plus');
  const mq2=(w,n=1)=>mot('05-question',w,n), tVert=mq2('vert'), tDixQ2=mq2('dix'), tJaune=mq2('jaune'), tCinqQ2=mq2('cinq'), tLequel2=mq2('Lequel');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tB=mr2('B'), tCinqB=mr2('Cinq'), tPlusB=mr2('plus'), tDixB=mr2('dix'), tDixB2=mr2('dix',2), tPareilB=mr2('pareil');
  const mA=w=>mot('06-appris',w), tComparerA=mA('comparer'), tChaque=mA('chaque'), tPasA=mA('Pas'), tPiecesA=mA('pièces');
  const finTitre=tDeux0-.08;

  const RANG=[100,190,280,370,460];
  /* cinq pièces de 1 € en rang (à gauche) et un billet de 10 € (à droite) */
  function cinqContreDix(c,T,y,{tP=0,tB=0,lus=null,lb=0}={}){
    RANG.forEach((x,k)=>{ const t=tP+k*.12; if(T>=t) euroE(c,1,x,y,40,{z:zoom(T,t,.4),lueur:lus&&T>=lus[k]?.55+.45*Math.sin(T*5):0}); });
    if(T>=tB) euroE(c,10,800,y,48,{z:zoom(T,tB,.4),grand:1,lueur:lb}); }
  function tapis(c,x0,y0,w,h,coul){ c.fillStyle=coul; c.globalAlpha=.85; c.beginPath(); c.roundRect(x0,y0,w,h,22); c.fill(); c.globalAlpha=1; }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* je compte ce que vaut chaque tas, pas le nombre de pièces */
      cinqContreDix(c,T,380,{tP:ap,tB:ap});
      if(T>=tChaque){ ecrire(c,'5 €',280,520,90*zoom(T,tChaque,.4),CRAIE.jaune); ecrire(c,'10 €',800,520,90*zoom(T,tChaque,.4),CRAIE.ok); }
      if(T>=tPasA) ecrire(c,'pas le nombre de pièces',528,640,56*zoom(T,tPasA,.4),CRAIE.faux);
      tab.maj(); return; }

    if(T>=q2){ /* panier vert : un billet de 10 € ; panier jaune : deux billets de 5 € */
      quaiBoisE(c,T,40);
      panierE(c,130,660,220); rubanE(c,130,470,'#40c057',1.1); panierE(c,360,660,220); rubanE(c,360,470,'#fcc419',1.1);
      if(T>=tVert) ecrire(c,'vert',130,690,40,'#8ce99a');
      if(T>=tJaune) ecrire(c,'jaune',360,690,40,'#ffe066');
      if(T>=tDixQ2) euroE(c,10,130,330,30,{z:zoom(T,tDixQ2,.4),grand:1,lueur:T>=r2&&T>=tDixB2?.5:0});
      if(T>=tCinqQ2){ euroE(c,5,360,230,28,{z:zoom(T,tCinqQ2,.4),grand:1,lueur:T>=r2&&T>=tCinqB&&T<tPlusB?.6:0}); euroE(c,5,360,345,28,{z:zoom(T,tCinqQ2+.15,.4),grand:1,lueur:T>=r2&&T>=tPlusB&&T<tDixB?.6:0}); }
      if(T<r2){ if(T>=tLequel2) ecrire(c,'?',245,110,100*zoom(T,tLequel2,.5),CRAIE.jaune); }
      else { if(T>=tCinqB) formuleE(c,T,240,100,['5','+','5','=','10'],[tCinqB,tPlusB,tPlusB+.3,tDixB,tDixB],64);
        if(T>=tDixB2) ecrire(c,'10 € = 10 €',240,180,56*zoom(T,tDixB2,.4),CRAIE.ok);
        if(T>=tPareilB) for(const [x,y] of [[30,160],[455,240]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }

    if(T>=q1){ /* tas rouge : deux billets de 5 € ; tas bleu : une pièce de 2 € et une pièce de 1 € */
      quaiBoisE(c,T,40);
      tapis(c,20,150,370,200,'#c92a2a'); tapis(c,20,420,370,200,'#1971c2');
      if(T>=tRouge) ecrire(c,'rouge',205,125,36,'#ffa8a8');
      if(T>=tBleu) ecrire(c,'bleu',205,650,36,'#a5d8ff');
      const luR=k=>T>=r1&&T>=[tCinqR,tDixR][k]&&T<[tCinqR,tDixR][k]+1?.6:0, luB=k=>T>=r1&&T>=[tDeuxR,tTroisR][k]&&T<[tDeuxR,tTroisR][k]+1?.6:0;
      if(T>=tCinqQ){ euroE(c,5,115,250,28,{z:zoom(T,tCinqQ,.4),grand:1,lueur:luR(0)}); euroE(c,5,295,250,28,{z:zoom(T,tCinqQ+.15,.4),grand:1,lueur:luR(1)}); }
      if(T>=tDeuxQ) euroE(c,2,130,520,56,{z:zoom(T,tDeuxQ,.4),lueur:luB(0)});
      if(T>=tUnQ) euroE(c,1,280,520,50,{z:zoom(T,tUnQ,.4),lueur:luB(1)});
      if(T<r1){ if(T>=tLequel1) ecrire(c,'?',440,385,90*zoom(T,tLequel1,.5),CRAIE.jaune); }
      else {
        if(T>=tCinqR) ecrire(c,'5',115,190,40,CRAIE.jaune); if(T>=tDixR) ecrire(c,'10',295,190,40,CRAIE.jaune);
        if(T>=tDeuxR) ecrire(c,'2',130,450,40,CRAIE.jaune); if(T>=tTroisR) ecrire(c,'3',280,450,40,CRAIE.jaune);
        if(T>=tDixR2) ecrire(c,'10 €',440,250,52*zoom(T,tDixR2,.4),CRAIE.ok);
        if(T>=tTroisR2) ecrire(c,'3 €',440,520,52*zoom(T,tTroisR2,.4),CRAIE.blanc);
        if(T>=tPlusR) ecrire(c,'10 € > 3 €',205,385,56*zoom(T,tPlusR,.4),CRAIE.blanc); }
      tab.maj(); return; }

    if(T>=pa){ /* parfois c'est pareil : 1 € + 1 € = 2 € */
      if(T>=tDeuxPa){ euroE(c,1,200,330,78,{z:zoom(T,tDeuxPa,.4)}); euroE(c,1,400,330,78,{z:zoom(T,tDeuxPa+.15,.4)}); }
      if(T>=tUnePa) euroE(c,2,800,330,88,{z:zoom(T,tUnePa,.4)});
      if(T>=tValent) ecrire(c,'=',600,330,120*zoom(T,tValent,.4),CRAIE.ok);
      if(T>=tPareil) ecrire(c,"c'est pareil !",528,130,64*zoom(T,tPareil,.4),CRAIE.jaune);
      if(T>=tValent) formuleE(c,T,528,580,['1 €','+','1 €','=','2 €'],Array(5).fill(tValent+.3),80,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      tab.maj(); return; }

    if(T>=co){ /* elle : 1, 2, 3, 4, 5 € ; lui : 10 € ; 10 € > 5 € */
      const tc=[tC1,tC2,tC3,tC4,tC5];
      cinqContreDix(c,T,330,{tP:co,tB:co,lus:tc,lb:T>=tDixC?.6:0});
      if(T>=co) { ecrire(c,'elle',280,170,52,CRAIE.blanc); ecrire(c,'lui',800,170,52,CRAIE.blanc); }
      tc.forEach((t,k)=>{ if(T>=t) ecrire(c,String(k+1),RANG[k],250,52*zoom(T,t,.4),CRAIE.jaune); });
      if(T>=tEuros5) ecrire(c,'5 €',280,470,80*zoom(T,tEuros5,.4),CRAIE.jaune);
      if(T>=tDixC) ecrire(c,'10 €',800,470,80*zoom(T,tDixC,.4),CRAIE.ok);
      if(T>=tPlusC) ecrire(c,'10 € > 5 €',528,620,80*zoom(T,tPlusC,.4),CRAIE.blanc);
      if(T>=tGarcon) for(const [x,y] of [[660,300],[950,380]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      tab.maj(); return; }

    if(T>=pg){ /* le piège : beaucoup de pièces ≠ beaucoup d'argent */
      cinqContreDix(c,T,330,{tP:pg,tB:pg,lus:[pg,pg,pg,pg,pg]});
      if(T>=tBeaucoup) ecrire(c,'beaucoup de pièces',528,520,58*zoom(T,tBeaucoup,.4),CRAIE.blanc);
      if(T>=tPas) ecrire(c,'≠',528,590,70*zoom(T,tPas,.4),CRAIE.faux);
      if(T>=tArgent) ecrire(c,"beaucoup d'argent",528,660,58*zoom(T,tArgent,.4),CRAIE.blanc);
      if(T>=pg) ecrire(c,'Attention !',528,120,70,CRAIE.faux);
      tab.maj(); return; }

    /* le marché : Idriss donne de l'argent aux deux enfants */
    quaiBoisE(c,T,140); caisseE(c,528,715,260,90); caisseE(c,528,625,200,80);
    idrissE(c,528,540,.95,{T,montre:T>=tElle0&&T<tQui0?1:0});
    if(T>=tDeux0){ enfantE(c,190,715,1.6,{k:1,T,bras:T>=tCinq0&&T<tLui0?.6:0}); enfantE(c,870,715,1.6,{k:0,T,bras:T>=tBillet0&&T<tQui0?.6:0}); }
    [60,130,200,270,340].forEach((x,k)=>{ const t=tCinq0+k*.1; if(T>=t) euroE(c,1,x,140,32,{z:zoom(T,t,.4)}); });
    if(T>=tBillet0) euroE(c,10,870,140,36,{z:zoom(T,tBillet0,.4),grand:1});
    if(T>=tQui0) ecrire(c,'?',528,110,110*zoom(T,tQui0,.5),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Lequel'); const phrase1=[qa('Lequel vaut le plus ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Lequel'); const phrase2=[qb('Lequel vaut le plus ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC-r1,
      phrase:phrase1,pause:pause1,
      choix:[['le tas bleu',tqa('A'),tqa('bleu',2)],['les deux pareil',tqa('B'),tqa('pareil')],['le tas rouge',tqa('C'),tqa('rouge',2)]],
      tete:[[r1+.1,'Réponse '],[tC,'C !']],reponse:[phraseE('10 € > 3 €',[tPlusR,tPlusR,tPlusR,tPlusR+.3,tPlusR+.3])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:1,tBon:tB-r2,
      phrase:phrase2,pause:pause2,
      choix:[['le vert',tqb('A'),tqb('vert',2)],['les deux pareil',tqb('B'),tqb('pareil')],['le jaune',tqb('C'),tqb('jaune',2)]],
      tete:[[r2+.1,'Réponse '],[tB,'B !']],reponse:[phraseE("10 € = 10 € : c'est pareil !",[tDixB2,tDixB2,tDixB2,tDixB2,tDixB2,tPareilB,tPareilB,tPareilB,tPareilB])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-compter')-.5,'Qui a<br>le plus ?');
  return { clips,FIN,titre:'Qui a le plus ?',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pg,co,pa,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tGarcon&&T<pa)||(T>=tPareil&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
