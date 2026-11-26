/* ============================================================
   Série Suites CP — PAYSAGE 04 : « Le train de la fête » (micro cp_suite_completer), 26/11/2026.
   Voix : manim/voix/cp-suite-completer-paysage.json (validée). La pluie efface un numéro : 12, 13, ?, 15 → 14.
   Astuce : regarder le nombre d'avant ET le nombre d'après. Questions : 36, 37, ?, 39 → A (38) ; 10, 20, ?, 40 → B (30).
   ============================================================ */
FILMS['completer']=function(outils){
  const DUR={'00-accroche':10.53,'01-trou':7.42,'02-astuce':4.84,'03-question':16.77,'03b-reponse':5.52,
    '04-question':15.06,'04b-reponse':6.74,'05-appris':6.11,'06-abonne':6.1};
  let K=null;
  const temps=S=>{ if(K) return K; const m=S.m;
    K={ tTrain:m('00-accroche','train'), tNum:m('00-accroche','numéro',1), tOh:m('00-accroche','oh'), tPluie:m('00-accroche','pluie'), tEff:m('00-accroche','effacé'),
      lu:[m('01-trou','douze'),m('01-trou','treize',1),m('01-trou','trou'),m('01-trou','quinze',1)], tEntre:m('01-trou','Entre'), t14:m('01-trou','quatorze'),
      tAvant:m('02-astuce',"d'avant"), tApres:m('02-astuce',"d'après"),
      q1:[m('03-question','Trente-six'),m('03-question','trente-sept'),m('03-question','trou'),m('03-question','trente-neuf')],
      r1:[m('03b-reponse','trente-sept'),m('03b-reponse','trente-huit'),m('03b-reponse','trente-neuf')],
      q2:[m('04-question','Dix'),m('04-question','vingt',1),m('04-question','trou'),m('04-question','quarante')],
      tAv2:m('04b-reponse','avance'), r2:[m('04b-reponse','dix',3),m('04b-reponse','vingt'),m('04b-reponse','trente'),m('04b-reponse','quarante')],
      aComb:m('05-appris','combien'), aAv:m('05-appris','avance'), aRemp:m('05-appris','remplis') };
    return K; };
  const COUL_W=['#4dabf7','#ffd43b','#69db7c','#da77f2'];

  /* Un petit train de 4 wagons (sans locomotive) pour les questions : nums = [texte, instant] ; trou = l'indice du wagon effacé */
  function petitTrain(c,T,xs,y,w,nums,trou,rep,tRep){
    railsS(c,xs[0]-w*.7,xs[3]+w*.7,y);
    nums.forEach(([s,t],i)=>{ if(T<t) return; const z=zoom(T,t,.5);
      if(i===trou) wagonS(c,xs[i],y,w,'',COUL_W[i],{z,efface:1,num2:T>=tRep?rep:null,t2:T-tRep,lueur:pulseS(T,tRep)});
      else wagonS(c,xs[i],y,w,s,COUL_W[i],{z}); }); }

  function dessiner(c,T,S){ const k=temps(S);
    fanionsS(c,T>=S.q1&&T<S.ap?-90:40,T>=S.q1&&T<S.ap?500:1016,40,T>=S.q1&&T<S.ap?7:12);
    if(T>=S.ap){ /* ce que tu as appris : de combien on avance (+5), puis on remplit le trou */
      const xs=[230,420,610,800];
      petitTrain(c,T,xs,600,170,[['20',S.ap+.2],['25',S.ap+.35],['',S.ap+.5],['35',S.ap+.65]],2,'30',k.aRemp);
      for(let i=0;i<3;i++){ const t=k.aComb+i*.35; if(T>=t) arcS(c,xs[i],xs[i+1],430,T>=k.aAv?'+5':'?',entreE(T,t,t+.4),CRAIE.jaune,55); }
      return; }
    if(T>=S.q2){ /* 10, 20, ?, 40 */
      const xs=[-30,118,266,414];
      petitTrain(c,T,xs,560,140,[['10',k.q2[0]],['20',k.q2[1]],['',k.q2[2]],['40',k.q2[3]]],2,'30',k.r2[2]);
      for(let i=0;i<3;i++){ const t=k.tAv2+i*.3; if(T>=t) arcS(c,xs[i],xs[i+1],415,'+10',entreE(T,t,t+.4),CRAIE.jaune,48); }
      return; }
    if(T>=S.q1){ /* 36, 37, ?, 39 */
      const xs=[-30,118,266,414];
      petitTrain(c,T,xs,560,140,[['36',k.q1[0]],['37',k.q1[1]],['',k.q1[2]],['39',k.q1[3]]],2,'38',k.r1[1]);
      if(T>=k.r1[0]) for(let i=0;i<3;i++) arcS(c,xs[i],xs[i+1],415,'+1',entreE(T,k.r1[0]+i*.3,k.r1[0]+i*.3+.4),CRAIE.jaune,48);
      return; }
    /* l'accroche, le trou, l'astuce : le train de la fête arrive en gare ; la pluie efface le 14 */
    const dx=900*(1-douxE(entreE(T,k.tTrain-.6,k.tTrain+1.6))), y=600, xs=[300,505,710,915];
    railsS(c,0,1056,y);
    locoS(c,105+dx,y,1.05,T);
    const N=['12','13','14','15'];
    xs.forEach((x,i)=>{ const vu=T>=k.tNum+i*.15;
      const l=T<S.c2?pulseS(T,k.lu[i],k.lu[i]+.9):(i===1?pulseS(T,k.tAvant):(i===3?pulseS(T,k.tApres):0));
      if(i===2) wagonS(c,x+dx,y,190,vu?N[i]:'',COUL_W[i],{efface:entreE(T,k.tEff-.1,k.tEff+.9),num2:T>=k.t14?'14':null,t2:T-k.t14,lueur:T>=k.t14?pulseS(T,k.t14,k.t14+1.2):l});
      else wagonS(c,x+dx,y,190,vu?N[i]:'',COUL_W[i],{lueur:l}); });
    if(T>=k.tPluie&&T<S.c1+.5) pluieE(c,T,1056,720,30,Math.min(entreE(T,k.tPluie,k.tPluie+.6),1-entreE(T,S.c1,S.c1+.5)));
    if(T>=k.tEntre&&T<S.c2){ arcS(c,xs[1],xs[2],412,'',entreE(T,k.tEntre,k.tEntre+.4),CRAIE.jaune,60); arcS(c,xs[3],xs[2],412,'',entreE(T,k.tEntre+.4,k.tEntre+.8),CRAIE.jaune,60); }
    if(T>=S.c2){ if(T>=k.tAvant) arcS(c,xs[1],xs[2],412,'',entreE(T,k.tAvant,k.tAvant+.4),CRAIE.ok,60);
      if(T>=k.tApres) arcS(c,xs[3],xs[2],412,'',entreE(T,k.tApres,k.tApres+.4),CRAIE.ok,60);
      if(T>=k.tAvant) if(T<k.tAvant+1.5) doigtE(c,xs[1],290,90*Math.min(1,zoom(T,k.tAvant,.5)));
      if(T>=k.tApres) if(T<k.tApres+1.5) doigtE(c,xs[3],290,90*Math.min(1,zoom(T,k.tApres,.5))); }
  }

  return filmSuiteP(outils,{ DUR, titre:'Le train de la fête', dessiner,
    mini:'12, 13, ?, 15<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>',
    tMini:S=>temps(S).lu[2]+.3,
    questions:[
      { choix:['38','40','35'], bonne:0,
        phrase:S=>{ const k=temps(S); return [phraseE('36, 37, ?, 39',k.q1)]; },
        reponse:S=>{ const k=temps(S); return [phraseE('37, 38, 39',k.r1)]; } },
      { choix:['21','30','50'], bonne:1,
        phrase:S=>{ const k=temps(S); return [phraseE('10, 20, ?, 40',k.q2)]; },
        reponse:S=>{ const k=temps(S); return [phraseE('10, 20, 30, 40',k.r2)]; } } ] });
};
