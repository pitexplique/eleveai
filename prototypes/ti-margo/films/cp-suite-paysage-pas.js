/* ============================================================
   Série Suites CP — PAYSAGE 03 : « Compter plus vite » (micro cp_suite_2_5_10), 26/11/2026.
   Voix : manim/voix/cp-suite-pas-paysage.json (validée). Les chaussettes vont par deux : 2, 4, 6, 8, 10.
   Les mains : 5, 10, 15, 20. Les paquets de 10 crayons : 10, 20, 30, 40.
   Questions : 10, 12, 14… → B (16) ; 30, 40, 50… → C (60).
   ============================================================ */
FILMS['pas']=function(outils){
  const DUR={'00-accroche':9.49,'01-deux':9.04,'02-cinq-dix':11.13,'03-question':14.97,'03b-reponse':4.67,
    '04-question':16.99,'04b-reponse':5.25,'05-appris':6.91,'06-abonne':6.1};
  let K=null;
  const temps=S=>{ if(K) return K; const m=S.m;
    K={ tCh:m('00-accroche','chaussettes',1), tPar:m('00-accroche','par'), tComb:m('00-accroche','Combien'),
      t2:[m('01-deux','deux',3),m('01-deux','quatre'),m('01-deux','six'),m('01-deux','huit'),m('01-deux','dix',1)], tDix:m('01-deux','dix',2), tUn:m('01-deux','un'), tRap:m('01-deux','rapide'),
      tMains:m('02-cinq-dix','mains'), t5:[m('02-cinq-dix','cinq',3),m('02-cinq-dix','dix',1),m('02-cinq-dix','quinze'),m('02-cinq-dix','vingt',1)],
      tPaq:m('02-cinq-dix','paquets'), tDixC:m('02-cinq-dix','dix',2), t10:[m('02-cinq-dix','dix',3),m('02-cinq-dix','vingt',2),m('02-cinq-dix','trente'),m('02-cinq-dix','quarante')],
      q1:[m('03-question','dix'),m('03-question','douze'),m('03-question','quatorze')], q1Ap:m('03-question','après'),
      tDeuxR:m('03b-reponse','Deux'), t16r:m('03b-reponse','seize'),
      q2:[m('04-question','trente'),m('04-question','quarante'),m('04-question','cinquante',1)], q2Ap:m('04-question','après'),
      tDixR:m('04b-reponse','Dix'), t60r:m('04b-reponse','soixante'),
      aDeux:m('05-appris','deux',1), aCinq:m('05-appris','cinq',1), aDix:m('05-appris','dix',1), aRap:m('05-appris','rapide') };
    return K; };

  const XP=[170,349,528,707,886];   /* les 5 paires sur la corde */
  function dessiner(c,T,S){ const k=temps(S);
    if(T>=S.ap){ /* ce que tu as appris : trois rangées, de 2 en 2, de 5 en 5, de 10 en 10 */
      const L=[[k.aDeux,['2','4','6'],'+2',o=>paireS(c,110,o-60,.5,COUL_CH[0],1)],
               [k.aCinq,['5','10','15'],'+5',o=>mainS(c,110,o+10,.55,1)],
               [k.aDix,['10','20','30'],'+10',o=>paquetS(c,110,o+18,.55,1)]];
      L.forEach(([t0,N,pas,icone],r)=>{ if(T<t0) return; const y=170+r*215, xs=[330,560,790];
        aGrandS(c,110,y,zoom(T,t0,.5),()=>icone(y));
        N.forEach((s,i)=>caseS(c,s,xs[i],y,104,zoom(T,t0+i*.15,.5),{lueur:pulseS(T,k.aRap)}));
        for(let i=0;i<2;i++) arcS(c,xs[i],xs[i+1],y-60,pas,entreE(T,t0+.3+i*.2,t0+.7+i*.2),CRAIE.jaune,42);
        if(T>=t0+.3) arcS(c,xs[2],xs[2]+190,y-60,'',entreE(T,t0+.8,t0+1.2),CRAIE.gris,42); });
      if(T>=k.aRap) for(const [x,y] of [[960,170],[960,385],[960,600]]) etincelle(c,x,y,20+8*Math.sin(T*7+y));
      return; }
    if(T>=S.q2){ /* 30, 40, 50… et après ? (des paquets de 10) */
      const xs=[-10,130,270,410];
      k.q2.forEach((t,i)=>{ if(T<t) return; caseS(c,['30','40','50'][i],xs[i],440,125,zoom(T,t,.5)); aGrandS(c,xs[i],235,zoom(T,t,.5),()=>paquetS(c,xs[i],235,.55,1)); });
      if(T>=k.q2Ap&&T<k.t60r) caseS(c,'',xs[3],440,125,zoom(T,k.q2Ap,.5),{trou:true});
      if(T>=k.t60r){ caseS(c,'60',xs[3],440,125,zoom(T,k.t60r,.5),{coul:'#2b8a3e',lueur:pulseS(T,k.t60r)}); aGrandS(c,xs[3],235,zoom(T,k.t60r,.5),()=>paquetS(c,xs[3],235,.55,1,pulseS(T,k.t60r))); }
      [[0,k.q2[1]],[1,k.q2[2]],[2,k.q2Ap]].forEach(([i,t])=>{ if(T>=t) arcS(c,xs[i],xs[i+1],368,'+10',entreE(T,t,t+.4),CRAIE.jaune,42); });
      return; }
    if(T>=S.q1){ /* 10, 12, 14… et après ? (de 2 en 2) */
      const xs=[-10,130,270,410];
      cordeS(c,-80,500,150);
      k.q1.forEach((t,i)=>{ if(T<t) return; caseS(c,['10','12','14'][i],xs[i],460,125,zoom(T,t,.5)); paireS(c,xs[i],150,.62,COUL_CH[i+1],zoom(T,t,.5)); });
      if(T>=k.q1Ap&&T<k.t16r) caseS(c,'',xs[3],460,125,zoom(T,k.q1Ap,.5),{trou:true});
      if(T>=k.t16r){ caseS(c,'16',xs[3],460,125,zoom(T,k.t16r,.5),{coul:'#2b8a3e',lueur:pulseS(T,k.t16r)}); paireS(c,xs[3],150,.62,COUL_CH[4],zoom(T,k.t16r,.5),pulseS(T,k.t16r)); }
      [[0,k.q1[1]],[1,k.q1[2]],[2,k.q1Ap]].forEach(([i,t])=>{ if(T>=t) arcS(c,xs[i],xs[i+1],388,'+2',entreE(T,t,t+.4),CRAIE.jaune,42); });
      return; }
    if(T>=S.c2){ /* les mains (5 en 5) et les paquets de 10 crayons (10 en 10) */
      const xs=[200,410,620,830];
      xs.forEach((x,i)=>{ if(T>=k.tMains+i*.12) mainS(c,x,170,.72,zoom(T,k.tMains+i*.12,.4),pulseS(T,k.t5[i],k.t5[i]+.8));
        if(T>=k.t5[i]) etiquette(c,['5','10','15','20'][i],x,300,T,k.t5[i],CRAIE.jaune,52);
        if(T>=k.tPaq+i*.12) paquetS(c,x,480,.68,zoom(T,k.tPaq+i*.12,.4),pulseS(T,k.t10[i],k.t10[i]+.8),T>=k.tDixC);
        if(T>=k.t10[i]) etiquette(c,['10','20','30','40'][i],x,640,T,k.t10[i],CRAIE.jaune,52); });
      return; }
    /* l'accroche et le compte de 2 en 2 : la corde à linge */
    cordeS(c,60,996,140);
    XP.forEach((x,i)=>{ const t0=k.tCh+i*.12; if(T<t0) return;
      const l=T>=k.tPar&&T<k.tPar+1.3?.6+.4*Math.sin((T-k.tPar)*7):pulseS(T,k.t2[i],k.t2[i]+.8);
      paireS(c,x,140,.95,COUL_CH[i],zoom(T,t0,.4),l);
      if(T>=k.t2[i]) etiquette(c,String(2*(i+1)),x,440,T,k.t2[i],i===4&&T>=k.tDix?CRAIE.ok:CRAIE.jaune,58); });
    for(let i=0;i<4;i++){ const t=k.t2[i+1]-.3; if(T>=t) arcS(c,XP[i],XP[i+1],395,'+2',entreE(T,t,t+.35),CRAIE.jaune,40); }
    if(T>=k.tComb&&T<k.t2[0]) ecrire(c,'?',528,580,130*zoom(T,k.tComb,.4),CRAIE.jaune);
    if(T>=k.tDix) ecrire(c,'10',528,585,150*zoom(T,k.tDix,.5),CRAIE.ok);
    if(T>=k.tUn) ecrire(c,'1, 2, 3, 4…',528,690,50*zoom(T,k.tUn,.5),CRAIE.gris);
    if(T>=k.tRap) for(const [x,y] of [[400,585],[656,585]]) etincelle(c,x,y,20+8*Math.sin(T*7+x));
  }

  return filmSuiteP(outils,{ DUR, titre:'Compter plus vite', dessiner,
    mini:'2, 4, 6, 8…<br>et après ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>',
    tMini:S=>temps(S).t2[3]+.5,
    questions:[
      { choix:['15','16','20'], bonne:1,
        phrase:S=>{ const k=temps(S); return [phraseE('10, 12, 14, ?',[...k.q1,k.q1Ap])]; },
        reponse:S=>{ const k=temps(S); return [phraseE('14 + 2 = 16',[k.tDeuxR,k.tDeuxR,k.tDeuxR,k.t16r,k.t16r])]; } },
      { choix:['51','55','60'], bonne:2,
        phrase:S=>{ const k=temps(S); return [phraseE('30, 40, 50, ?',[...k.q2,k.q2Ap])]; },
        reponse:S=>{ const k=temps(S); return [phraseE('50 + 10 = 60',[k.tDixR,k.tDixR,k.tDixR,k.t60r,k.t60r])]; } } ] });
};
