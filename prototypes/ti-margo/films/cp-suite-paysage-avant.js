/* ============================================================
   Série Suites CP — PAYSAGE 01 : « La page suivante » (micro cp_suite_compter_avant), 26/11/2026.
   Voix : manim/voix/cp-suite-avant-paysage.json (validée). Le soir, Ti Margo lit une histoire : page 28, il tourne → 29 → 30.
   Le piège : après 29, pas « vingt-dix » mais 30 (une nouvelle dizaine). Questions : page après 45 → B (46) ; après 59 → A (60).
   ============================================================ */
FILMS['avant']=function(outils){
  const DUR={'00-accroche':9.23,'01-compter':8.52,'02-piege':8.46,'03-question':16.16,'03b-reponse':5.74,
    '04-question':16.77,'04b-reponse':6.8,'05-appris':7.46,'06-abonne':6.1};
  let K=null;
  const temps=S=>{ if(K) return K; const m=S.m;
    K={ tLis:m('00-accroche','lis'), t28a:m('00-accroche','vingt-huit'), tTourne:m('00-accroche','tourne'),
      t28b:m('01-compter','vingt-huit'), t29:m('01-compter','vingt-neuf'), tPuis:m('01-compter','Puis'), t30:m('01-compter','trente'),
      tChaque:m('01-compter','chaque'), tUn:m('01-compter','un'),
      t29p:m('02-piege','vingt-neuf'), tVD:m('02-piege','vingt-dix'), tCest:m('02-piege',"C'est"), t30p:m('02-piege','trente'), tDiz:m('02-piege','dizaine'),
      tPage:m('03-question','page',1), t45:m('03-question','quarante-cinq'), tSuiv:m('03-question','suivante'),
      t45r:m('03b-reponse','quarante-cinq'), tUnR:m('03b-reponse','un'), t46r:m('03b-reponse','quarante-six'),
      t57:m('04-question','cinquante-sept'), t58:m('04-question','cinquante-huit'), t59:m('04-question','cinquante-neuf'), tApres:m('04-question','après'),
      t59r:m('04b-reponse','cinquante-neuf'), t60r:m('04b-reponse','soixante'), tNouv:m('04b-reponse','nouvelle'),
      tAvantA:m('05-appris','avant'), tUnA:m('05-appris','un',1), tNeuf:m('05-appris','neuf'), tDizA:m('05-appris','dizaine') };
    return K; };

  function dessiner(c,T,S){ const k=temps(S);
    if(T>=S.ap){ /* ce que tu as appris : 27 → 31, un de plus à chaque fois ; après 29, la dizaine suivante */
      const xs=[140,334,528,722,916], N=['27','28','29','30','31'];
      flecheS(c,528,150,560,1,CRAIE.ok,entreE(T,k.tAvantA,k.tAvantA+.5));
      N.forEach((s,i)=>{ const t0=S.ap+.3+i*.15; if(T<t0) return;
        if(s==='30'&&T>=k.tDizA) caseDizS(c,s,xs[i],430,140,1,entreE(T,k.tDizA,k.tDizA+.4),pulseS(T,k.tDizA));
        else caseS(c,s,xs[i],430,140,zoom(T,t0,.5),{lueur:s==='29'?pulseS(T,k.tNeuf,k.tDizA):0}); });
      for(let i=0;i<4;i++){ const t=k.tUnA-.2+i*.3; if(T>=t) arcS(c,xs[i],xs[i+1],352,'+1',entreE(T,t,t+.4),CRAIE.jaune,60); }
      if(T>=k.tNeuf) cercle(c,xs[2]+22,433,34,CRAIE.jaune,entreE(T,k.tNeuf,k.tNeuf+.4));
      return; }
    if(T>=S.q2){ /* 57, 58, 59… et après ? */
      const xs=[-10,130,270,410];
      [['57',k.t57],['58',k.t58],['59',k.t59]].forEach(([s,t],i)=>{ if(T>=t) caseS(c,s,xs[i],380,125,zoom(T,t,.5)); });
      if(T>=k.tApres&&T<k.t60r) caseS(c,'',xs[3],380,125,zoom(T,k.tApres,.5),{trou:true});
      if(T>=k.t60r) caseDizS(c,'60',xs[3],380,125,zoom(T,k.t60r,.5),T>=k.tNouv?entreE(T,k.tNouv,k.tNouv+.4):0,pulseS(T,k.t60r));
      [[0,k.t58],[1,k.t59],[2,k.tApres]].forEach(([i,t])=>{ if(T>=t) arcS(c,xs[i],xs[i+1],308,'+1',entreE(T,t,t+.4),CRAIE.jaune,55); });
      etoilesE(c,T,6,500,150);
      return; }
    if(T>=S.q1){ /* le livre : page 45 → ? */
      const u=entreE(T,k.t46r-1,k.t46r-.05);
      livreS(c,215,150,520,330,T>=k.t45?45:'',{n2:46,u,vu2:T>=k.t46r,lueur:pulseS(T,k.t46r)});
      if(T>=k.tSuiv&&T<S.r1) ecrire(c,'?',215,590,120*zoom(T,k.tSuiv,.5),CRAIE.jaune);
      if(T>=k.tUnR) ecrire(c,'+1',215,590,110*zoom(T,k.tUnR,.5),CRAIE.ok);
      etoilesE(c,T,6,500,150);
      return; }
    if(T>=S.c2){ /* le piège : après 29, pas « vingt-dix » mais 30 */
      etoilesE(c,T,8,1056,120);
      if(T>=k.t29p) caseS(c,'29',260,470,160,zoom(T,k.t29p,.5));
      if(T>=k.tVD) barreS(c,'vingt-dix',700,190,86,entreE(T,k.tCest-.2,k.tCest+.3));
      if(T>=k.tCest) arcS(c,260,700,382,'+1',entreE(T,k.tCest,k.tCest+.5),CRAIE.ok,60);
      if(T>=k.t30p) caseDizS(c,'30',700,470,160,zoom(T,k.t30p,.5),T>=k.tDiz?entreE(T,k.tDiz,k.tDiz+.4):0,pulseS(T,k.tDiz));
      if(T>=k.tDiz) for(const [x,y] of [[580,370],[820,370],[600,580],[800,580]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
      return; }
    /* l'accroche et le compte : le livre du soir, sous les étoiles */
    etoilesE(c,T,9,1056,90);
    let n='',n2=null,u=0,vu2=true;
    const f1=k.tTourne+.1, f2=k.tPuis-.3;
    if(T<f1) n=T>=k.t28a?28:'';
    else if(T<f2){ n=28; n2=29; u=entreE(T,f1,f1+1.2); vu2=T>=k.t29; }
    else { n=29; n2=30; u=entreE(T,f2,f2+1); vu2=T>=k.t30; }
    aGrandS(c,528,250,zoom(T,k.tLis,.4),()=>livreS(c,528,95,600,320,n,{n2,u,vu2,lueur:pulseS(T,k.t28a,k.t28a+1.2)}));
    /* la rangée : 28, 29, 30 ; un de plus à chaque fois */
    const xs=[310,528,746];
    [['28',k.t28b],['29',k.t29],['30',k.t30]].forEach(([s,t],i)=>{ if(T>=t) caseS(c,s,xs[i],610,140,zoom(T,t,.5),{lueur:i===2?pulseS(T,k.t30,k.t30+1):0}); });
    for(let i=0;i<2;i++){ const t=k.tChaque+i*.45; if(T>=t) arcS(c,xs[i],xs[i+1],532,T>=k.tUn?'+1':'',entreE(T,t,t+.4),CRAIE.jaune,44); }
  }

  return filmSuiteP(outils,{ DUR, titre:'La page suivante', dessiner,
    mini:'Après 29 ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>',
    tMini:S=>temps(S).t29p+.3,
    questions:[
      { choix:['44','46','55'], bonne:1,
        phrase:S=>{ const k=temps(S); return [phraseE('Page 45 → ?',[k.tPage,k.t45,k.tSuiv,k.tSuiv])]; },
        reponse:S=>{ const k=temps(S); return [phraseE('45 + 1 = 46',[k.t45r,k.tUnR,k.tUnR,k.t46r,k.t46r])]; } },
      { choix:['60','<span style="font-size:46px">cinquante-dix</span>','50'], bonne:0,
        phrase:S=>{ const k=temps(S); return [phraseE('57, 58, 59, ?',[k.t57,k.t58,k.t59,k.tApres])]; },
        reponse:S=>{ const k=temps(S); return [phraseE('59 → 60',[k.t59r,k.t60r,k.t60r])]; } } ],
    geste:(g,T,S)=>{ const k=temps(S); if(T>=S.c2&&T<S.q1){ T<k.tCest?g.oups():g.fier(); return true; } return false; } });
};
