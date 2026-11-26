/* ============================================================
   Série Suites CP — PAYSAGE 05 : « La chasse au trésor » (micro cp_suite_defi), 26/11/2026.
   Voix : manim/voix/cp-suite-defi-paysage.json (validée). Des pierres numérotées : 5, 10, 15, ?, 25 → 20 (de 5 en 5).
   Astuce : on avance ou on recule ? De 1, de 2, de 5, de 10 ? Questions : 20, 19, 18, ?, 16 → C (17) ; 40, 45, 50, ? → A (55), le trésor !
   ============================================================ */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':9.62,'01-pas':9.76,'02-astuce':8.06,'03-question':15.88,'03b-reponse':5.95,
    '04-question':17.77,'04b-reponse':7.88,'05-appris':9.38,'06-abonne':6.1};
  let K=null;
  const temps=S=>{ if(K) return K; const m=S.m;
    K={ tTres:m('00-accroche','trésor'), tChemin:m('00-accroche','chemin'), tPierre:m('00-accroche','pierre'), tNombre:m('00-accroche','nombre'), tBonnes:m('00-accroche','bonnes'),
      lu:[m('01-pas','cinq',1),m('01-pas','dix'),m('01-pas','quinze'),m('01-pas','trou'),m('01-pas','vingt-cinq')], tCinq:m('01-pas','cinq',2), t20:m('01-pas','vingt'),
      tAv:m('02-astuce','avance'), tRec:m('02-astuce','recule'), pas:[m('02-astuce','un'),m('02-astuce','deux'),m('02-astuce','cinq'),m('02-astuce','dix')],
      q1:[m('03-question','Vingt'),m('03-question','dix-neuf'),m('03-question','dix-huit'),m('03-question','trou'),m('03-question','seize')],
      tRecR:m('03b-reponse','recule'), r1:[m('03b-reponse','dix-huit'),m('03b-reponse','dix-sept'),m('03b-reponse','seize')],
      tDern:m('04-question','Dernière'), q2:[m('04-question','quarante'),m('04-question','quarante-cinq'),m('04-question','cinquante',1),m('04-question','trou')],
      tCinqR:m('04b-reponse','cinq',1), t50r:m('04b-reponse','cinquante'), t55r:m('04b-reponse','cinquante-cinq'), tTresR:m('04b-reponse','trésor'),
      aPas:[m('05-appris','un'),m('05-appris','deux'),m('05-appris','cinq'),m('05-appris','dix')], aAv:m('05-appris','avant'), aReb:m('05-appris','rebours'), aCont:m('05-appris','continue') };
    return K; };

  function herbe(c,pts){ c.strokeStyle='#40c057'; c.lineWidth=4; for(const [x,y] of pts) for(const a of [-.5,0,.5]){ c.beginPath(); c.moveTo(x,y); c.lineTo(x+a*30,y-26); c.stroke(); } }

  function dessiner(c,T,S){ const k=temps(S);
    if(T>=S.ap){ /* ce que tu as appris : le pas (1, 2, 5, 10), en avant ou à rebours, puis je continue */
      ['1','2','5','10'].forEach((s,i)=>puceS(c,s,250+i*185,120,T,k.aPas[i],CRAIE.jaune,80));
      flecheS(c,330,320,300,1,CRAIE.ok,entreE(T,k.aAv,k.aAv+.4));
      flecheS(c,730,320,300,-1,CRAIE.ret,entreE(T,k.aReb,k.aReb+.4));
      const xs=[200,420,640,860];
      cheminS(c,[[100,570],[960,570]],110);
      ['10','15','20'].forEach((s,i)=>pierreS(c,s,xs[i],560,82,{z:zoom(T,S.ap+.3+i*.15,.4)}));
      if(T>=S.ap+.6&&T<k.aCont) pierreS(c,'',xs[3],560,82,{trou:true,z:zoom(T,S.ap+.75,.4)});
      if(T>=k.aCont) pierreS(c,'25',xs[3],560,82,{vert:true,z:zoom(T,k.aCont,.5),lueur:pulseS(T,k.aCont)});
      for(let i=0;i<3;i++){ const t=S.ap+.9+i*.2; if(T>=t) arcS(c,xs[i],xs[i+1],478,'+5',entreE(T,t,t+.4),CRAIE.jaune,40); }
      return; }
    if(T>=S.q2){ /* la dernière pierre : 40, 45, 50, ? ; le trésor */
      const xs=[-30,110,250,390], ys=[300,420,300,420];
      cheminS(c,xs.map((x,i)=>[x,ys[i]]),90);
      ['40','45','50'].forEach((s,i)=>{ if(T>=k.q2[i]) pierreS(c,s,xs[i],ys[i],70,{z:zoom(T,k.q2[i],.5)}); });
      if(T>=k.q2[3]&&T<k.t55r) pierreS(c,'',xs[3],ys[3],70,{trou:true,z:zoom(T,k.q2[3],.5)});
      if(T>=k.t55r) pierreS(c,'55',xs[3],ys[3],70,{vert:true,z:zoom(T,k.t55r,.5),lueur:pulseS(T,k.t55r)});
      [[0,k.q2[1]],[1,k.q2[2]],[2,k.q2[3]]].forEach(([i,t])=>{ if(T>=t) arcS(c,xs[i],xs[i+1],228,T>=k.tCinqR?'+5':'',entreE(T,t,t+.4),CRAIE.jaune,48); });
      aGrandS(c,180,670,zoom(T,k.tDern,.4),()=>coffreS(c,180,670,.85,entreE(T,k.tTresR-.3,k.tTresR+.6),T));
      return; }
    if(T>=S.q1){ /* 20, 19, 18, ?, 16 */
      const xs=[-40,75,190,305,420], ys=[350,490,350,490,350];
      cheminS(c,xs.map((x,i)=>[x,ys[i]]),90);
      ['20','19','18','','16'].forEach((s,i)=>{ const t=k.q1[i]; if(T<t) return;
        if(i===3){ if(T<k.r1[1]) pierreS(c,'',xs[i],ys[i],64,{trou:true,z:zoom(T,t,.5)}); else pierreS(c,'17',xs[i],ys[i],64,{vert:true,z:zoom(T,k.r1[1],.5),lueur:pulseS(T,k.r1[1])}); }
        else pierreS(c,s,xs[i],ys[i],64,{z:zoom(T,t,.5)}); });
      if(T>=k.tRecR) for(let i=0;i<4;i++) arcS(c,xs[i],xs[i+1],285,'−1',entreE(T,k.tRecR+i*.25,k.tRecR+i*.25+.4),CRAIE.ret,44);
      herbe(c,[[0,650],[160,680],[330,640],[450,670]]);
      return; }
    /* l'accroche, le pas, l'astuce : le chemin des pierres jusqu'au coffre */
    const P=[[100,570],[275,420],[450,570],[625,420],[800,570]], C=[965,600];
    if(T>=k.tChemin) cheminS(c,[[30,600],...P,[C[0]-60,C[1]-40]],100);
    herbe(c,[[40,420],[360,690],[540,330],[720,690],[880,400],[190,700]]);
    if(T>=k.tTres-.2) aGrandS(c,C[0],C[1],zoom(T,k.tTres-.2,.4),()=>coffreS(c,C[0],C[1],.85,T>=k.tBonnes?.25+.1*Math.sin(T*4):0,T));
    P.forEach(([x,y],i)=>{ const t0=k.tPierre+i*.12; if(T<t0) return;
      const vu=T>=k.tNombre+i*.12, l=T<S.c2?pulseS(T,k.lu[i],k.lu[i]+.9):0;
      if(i===3){ if(T>=k.t20) pierreS(c,'20',x,y,76,{vert:true,z:zoom(T,k.t20,.5),lueur:pulseS(T,k.t20,S.c2)}); else pierreS(c,'',x,y,76,{trou:vu,z:zoom(T,t0,.4),lueur:l}); }
      else pierreS(c,vu?String(5*(i+1)):'',x,y,76,{z:zoom(T,t0,.4),lueur:l}); });
    if(T>=k.tCinq) for(let i=0;i<4;i++){ const t=k.tCinq+i*.2; arcS(c,P[i][0],P[i+1][0],345,'+5',entreE(T,t,t+.35),CRAIE.jaune,40); }
    if(T>=S.c2){ /* l'astuce : on avance (→) ou on recule (←) ? de 1, de 2, de 5, de 10 ? */
      flecheS(c,200,90,240,1,CRAIE.ok,entreE(T,k.tAv,k.tAv+.4));
      flecheS(c,200,190,240,-1,CRAIE.ret,entreE(T,k.tRec,k.tRec+.4));
      ['1','2','5','10'].forEach((s,i)=>puceS(c,s,470+i*150,140,T,k.pas[i],CRAIE.jaune,72)); }
  }

  return filmSuiteP(outils,{ DUR, titre:'La chasse au trésor', dessiner,
    mini:'5, 10, 15, ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>',
    tMini:S=>temps(S).lu[3]+.3,
    questions:[
      { choix:['19','15','17'], bonne:2,
        phrase:S=>{ const k=temps(S); return [phraseE('20, 19, 18, ?, 16',k.q1)]; },
        reponse:S=>{ const k=temps(S); return [phraseE('18, 17, 16',k.r1)]; } },
      { choix:['55','51','60'], bonne:0,
        phrase:S=>{ const k=temps(S); return [phraseE('40, 45, 50, ?',k.q2)]; },
        reponse:S=>{ const k=temps(S); return [phraseE('50 + 5 = 55',[k.t50r,k.t50r,k.t50r,k.t55r,k.t55r])]; } } ] });
};
