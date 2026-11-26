/* ============================================================
   Série Suites CP — PAYSAGE 02 : « Le compte à rebours » (micro cp_suite_compter_arriere), 26/11/2026.
   Voix : manim/voix/cp-suite-arriere-paysage.json (validée). Une fusée décolle : 10, 9, 8… 0, décollage !
   Le piège : à rebours, après 30, pas « vingt-dix » mais 29. Questions : 43, 42, … → C (41) ; juste avant 60 → B (59).
   ============================================================ */
FILMS['arriere']=function(outils){
  const DUR={'00-accroche':8.7,'01-compter':10.0,'02-piege':9.32,'03-question':16.13,'03b-reponse':5.17,
    '04-question':13.72,'04b-reponse':5.46,'05-appris':7.45,'06-abonne':6.1};
  let K=null;
  const temps=S=>{ if(K) return K; const m=S.m;
    K={ tFus:m('00-accroche','fusée'), tCompte:m('00-accroche','compte'),
      tN:[m('01-compter','zéro'),m('01-compter','un',2),m('01-compter','deux'),m('01-compter','trois'),m('01-compter','quatre'),m('01-compter','cinq'),m('01-compter','Six'),
        m('00-accroche','sept'),m('00-accroche','huit'),m('00-accroche','neuf'),m('00-accroche','dix')],
      tMoins:m('01-compter','moins'), tDecol:m('01-compter','Décollage'),
      t30:m('02-piege','trente'), tVD:m('02-piege','vingt-dix'), tCest:m('02-piege',"C'est"), t29:m('02-piege','vingt-neuf'), tDesc:m('02-piege','descend'),
      t43:m('03-question','quarante-trois'), t42:m('03-question','quarante-deux'), tApres:m('03-question','après'),
      tUnR:m('03b-reponse','Un'), t42r:m('03b-reponse','quarante-deux'), t41r:m('03b-reponse','quarante'),
      tAvant:m('04-question','avant'), t60:m('04-question','soixante',1), t59r:m('04b-reponse','cinquante-neuf'),
      tReb:m('05-appris','rebours'), tUnA:m('05-appris','un',1), tZero:m('05-appris','zéro'), tDizA:m('05-appris','dizaine') };
    return K; };

  function dessiner(c,T,S){ const k=temps(S);
    etoilesE(c,T,T>=S.q1&&T<S.ap?6:12,T>=S.q1&&T<S.ap?500:1056,130);
    if(T>=S.ap){ /* ce que tu as appris : 32 → 28, un de moins à chaque fois ; avant un zéro, la dizaine d'avant */
      const xs=[140,334,528,722,916], N=['32','31','30','29','28'];
      flecheS(c,528,170,560,-1,CRAIE.ret,entreE(T,k.tReb,k.tReb+.5));
      N.forEach((s,i)=>{ const t0=S.ap+.3+i*.15; if(T<t0) return;
        if(s==='29'&&T>=k.tDizA) caseDizS(c,s,xs[i],430,140,1,entreE(T,k.tDizA,k.tDizA+.4),pulseS(T,k.tDizA));
        else caseS(c,s,xs[i],430,140,zoom(T,t0,.5),{lueur:s==='30'?pulseS(T,k.tZero,k.tDizA):0}); });
      for(let i=0;i<4;i++){ const t=k.tUnA-.2+i*.3; if(T>=t) arcS(c,xs[i],xs[i+1],352,'−1',entreE(T,t,t+.4),CRAIE.ret,60); }
      if(T>=k.tZero) cercle(c,xs[2]+22,433,34,CRAIE.jaune,entreE(T,k.tZero,k.tZero+.4));
      return; }
    if(T>=S.q2){ /* juste avant 60 ? */
      const xs=[60,360];
      if(T>=k.t60) caseS(c,'60',xs[1],400,170,zoom(T,k.t60,.5));
      if(T>=k.tAvant&&T<k.t59r) caseS(c,'',xs[0],400,170,zoom(T,k.tAvant,.5),{trou:true});
      if(T>=k.t59r) caseS(c,'59',xs[0],400,170,zoom(T,k.t59r,.5),{coul:'#2b8a3e',lueur:pulseS(T,k.t59r)});
      if(T>=k.t60) arcS(c,xs[1],xs[0],307,'−1',entreE(T,k.t60+.3,k.t60+.8),CRAIE.ret,70);
      return; }
    if(T>=S.q1){ /* 43, 42… et après ? */
      const xs=[20,205,390];
      if(T>=k.t43) caseS(c,'43',xs[0],400,150,zoom(T,k.t43,.5));
      if(T>=k.t42) caseS(c,'42',xs[1],400,150,zoom(T,k.t42,.5));
      if(T>=k.tApres&&T<k.t41r) caseS(c,'',xs[2],400,150,zoom(T,k.tApres,.5),{trou:true});
      if(T>=k.t41r) caseS(c,'41',xs[2],400,150,zoom(T,k.t41r,.5),{coul:'#2b8a3e',lueur:pulseS(T,k.t41r)});
      [[0,k.t42],[1,k.tApres]].forEach(([i,t])=>{ if(T>=t) arcS(c,xs[i],xs[i+1],317,'−1',entreE(T,t,t+.4),CRAIE.ret,60); });
      fuseeS(c,205,700,.42,0,T); rampeS(c,205,700,140);
      return; }
    if(T>=S.c2){ /* le piège : à rebours, après 30, pas « vingt-dix » mais 29 */
      if(T>=k.t30) caseDizS(c,'30',260,470,160,zoom(T,k.t30,.5),T>=k.tDesc?entreE(T,k.tDesc,k.tDesc+.4):0);
      if(T>=k.tVD) barreS(c,'vingt-dix',700,190,86,entreE(T,k.tCest-.2,k.tCest+.3));
      if(T>=k.tCest) arcS(c,260,700,382,'−1',entreE(T,k.tCest,k.tCest+.5),CRAIE.ok,60);
      if(T>=k.t29) caseDizS(c,'29',700,470,160,zoom(T,k.t29,.5),T>=k.tDesc?entreE(T,k.tDesc,k.tDesc+.4):0,pulseS(T,k.t29));
      if(T>=k.tDesc) flecheS(c,480,640,200,-1,CRAIE.ret,entreE(T,k.tDesc,k.tDesc+.5));
      return; }
    /* l'accroche et le compte : la fusée sur sa rampe ; le grand écran du compte à rebours */
    const vol=entreE(T,k.tDecol-.2,k.tDecol+2.2), y=600-1000*vol*vol;
    const feu=T>=k.tDecol-.25?1:(T>=k.tN[0]?.45:0);
    rampeS(c,770,600,280);
    if(T>=k.tN[0]) fumeeS(c,770,610,T,entreE(T,k.tN[0],k.tN[0]+1.2)*(1+vol));
    aGrandS(c,770,500,zoom(T,k.tFus,.4),()=>fuseeS(c,770,y,1.15,feu,T));
    /* l'écran rond : le dernier nombre dit */
    const dits=k.tN.map((t,n)=>[t,n]).filter(([t])=>T>=t).sort((a,b)=>b[0]-a[0]);
    if(T>=k.tN[10]-.3){ const z=zoom(T,k.tN[10]-.3,.4);
      c.fillStyle='rgba(31,59,44,.95)'; c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.arc(300,330,160*Math.min(1,z),0,7); c.fill(); c.stroke();
      if(dits.length){ const [t,n]=dits[0]; ecrire(c,String(n),300,338,(n===10?190:230)*zoom(T,t,.55),n===0?CRAIE.ok:CRAIE.jaune); } }
    if(T>=k.tMoins&&T<k.tDecol) ecrire(c,'−1',300,580,90*zoom(T,k.tMoins,.5),CRAIE.ret);
    if(T>=k.tDecol) for(const [x,yy] of [[560,200],[980,240],[620,420],[930,470]]) etincelle(c,x,yy,18+7*Math.sin(T*7+x));
  }

  return filmSuiteP(outils,{ DUR, titre:'Le compte à rebours', dessiner,
    mini:'À rebours :<br>après 30 ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>',
    tMini:S=>temps(S).tN[7]+.3,
    questions:[
      { choix:['44','40','41'], bonne:2,
        phrase:S=>{ const k=temps(S); return [phraseE('43, 42, ?',[k.t43,k.t42,k.tApres])]; },
        reponse:S=>{ const k=temps(S); return [phraseE('42 − 1 = 41',[k.tUnR,k.tUnR,k.tUnR,k.t41r,k.t41r])]; } },
      { choix:['61','59','50'], bonne:1,
        phrase:S=>{ const k=temps(S); return [phraseE('?, 60',[k.tAvant,k.t60])]; },
        reponse:S=>{ const k=temps(S); return [phraseE('59, 60',[k.t59r,k.t59r])]; } } ],
    geste:(g,T,S)=>{ const k=temps(S);
      if(T>=S.finTitre&&T<S.c2){ T<k.tDecol?g.montre():g.fier(); return true; }
      if(T>=S.c2&&T<S.q1){ T<k.tCest?g.oups():g.fier(); return true; } return false; } });
};
