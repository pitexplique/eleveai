/* ============================================================
   Série Nombres entiers CP — PAYSAGE 08 : « La boîte à perles » (micro cp_entier_decomposer), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js + cp-entier3-dessins.js.
   Voix : manim/voix/cp-entier-decomposer-paysage.json. La boîte à bijoux s'ouvre, 34 perles roulent ; on les enfile par dix :
   3 fils et 4 perles seules → 30 + 4 = 34. Questions en plein milieu : le potager de papi (5 rangées de 10 + 2) → A (50 + 2) ;
   68 = 60 + ? → B (8). Couleurs : les dizaines (fils) en orange, les unités (perles seules) en bleu.
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = la boîte qui s'ouvre et brille + « Combien de perles se cachent là-dedans ? ».
   Pendant les questions, les dessins restent à gauche de l'ardoise (x < 520) ; la carte est à droite.
   ============================================================ */
FILMS['decomposer']=function(outils){
  const DUR={'00-accroche':11.05,'01-fils':8.97,'02-addition':7.89,'03-nombre':8.66,'04-question':20.89,'04b-reponse':10.08,
    '05-question':13.24,'05b-reponse':8.81,'06-appris':6.77,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-fils':.6,'02-addition':1,'03-nombre':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,li,ad,no,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:48px!important;white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tPour=m0('Pour'), tBrac=m0('bracelet'), tReg=m0('Regarde'), tComb=m0('Combien');
  const ml=(w,n=1)=>mot('01-fils',w,n), tEnf=ml('enfile'), tLdix=ml('dix'), tUn=ml('Un'), tDeux=ml('deux'), tTrois=ml('trois'), tL4=ml('quatre');
  const ma=(w,n=1)=>mot('02-addition',w,n), tA10=ma('dix',2), tA20=ma('vingt'), tA30=ma('trente'), tA4=ma('quatre'), tAt=ma('Trente',2), tAp=ma('plus',2), tAq=ma('quatre',2);
  const mn=(w,n=1)=>mot('03-nombre',w,n), tN30=mn('Trente'), tNp=mn('plus'), tN4=mn('quatre'), tN34=mn('trente-quatre'), tN3=mn('trois'), tNv30=mn('trente',2), tNq=mn('quatre',2), tNq2=mn('quatre',3);
  const mp=(w,n=1)=>mot('06-appris',w,n), tDiz=mp('dizaines'), tUni=mp('unités'), tP34=mp('Trente-quatre'), tP30=mp('trente'), tP4=mp('quatre');
  const finTitre=tPour-.08;

  const pulse=(T,t0,t1)=>T>=t0&&T<t1?1+.14*Math.sin(T*7):1;
  /* un cadre de couleur autour d'un paquet (orange : les dizaines ; bleu : les unités) */
  function cadreE(c,x,y,w,h,coul,u=1,pz=1){ if(u<=0) return; c.strokeStyle=coul; c.lineWidth=6*pz; c.globalAlpha=Math.min(1,u); c.beginPath(); c.roundRect(x,y,w,h,22); c.stroke(); c.globalAlpha=1; }

  /* les 34 perles : où elles roulent en sortant de la boîte, puis leur place sur les fils (3 × 10) ou seules (4) */
  const R=24, YB=670, FX=[130,240,350], SX=[560,622,684,746], SY=600;
  const BOITE=[528,640], WB=420;
  const roule=[...Array(34)].map((_,k)=>{ let x=90+((k*137)%880), y=330+((k*89)%330); if(Math.abs(x-528)<230&&y>420) x=x<528?x-240:x+240;
    return [Math.max(60,Math.min(1000,x)),y]; });
  const place=k=>k<30?[FX[Math.floor(k/10)],YB-12-R-(k%10)*2*R]:[SX[k-30],SY];
  const departFil=[tEnf+.3,tUn+.15,tDeux+.15,tTrois+.2], finFil=[tUn,tDeux,tTrois,tL4];
  /* les perles des fils et les perles seules, à leur place */
  function filsEtPerles(c,T,{fx=FX,sx=SX,sy=SY,yb=YB,r=R,cadres=0,pzF=1,pzU=1}={}){
    fx.forEach(x=>filDixE(c,x,yb,r,10));
    sx.forEach((x,k)=>perleE(c,x,sy,r,COUL_PERLE[(k*3+1)%10]));
    if(cadres){ fx.forEach(x=>cadreE(c,x-r*1.7,yb-r*20-30,r*3.4,r*20+48,CRAIE.r1,cadres,pzF));
      cadreE(c,sx[0]-r*1.9,sy-r*1.9,sx[sx.length-1]-sx[0]+r*3.8,r*3.8,CRAIE.r0,cadres,pzU); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* 34 = 30 + 4 : des dizaines plus des unités */
      filsEtPerles(c,T,{fx:[130,240,350],sx:[560,622,684,746],sy:520,yb:610,r:22,cadres:1,pzF:pulse(T,tDiz,tUni),pzU:pulse(T,tUni,tP34)});
      if(T>=tDiz) ecrire(c,'dizaines',240,680,54*zoom(T,tDiz,.5),CRAIE.r1);
      if(T>=tUni) ecrire(c,'unités',653,600,54*zoom(T,tUni,.5),CRAIE.r0);
      const Y=220;
      if(T>=tP34){ nombreDUE(c,'34',520,Y,120); ecrire(c,'=',650,Y,100,CRAIE.blanc); }
      if(T>=tP30) ecrire(c,'30',775,Y,120*zoom(T,tP30,.5),CRAIE.r1);
      if(T>=tP4){ ecrire(c,'+',885,Y,100,CRAIE.blanc); ecrire(c,'4',965,Y,120*zoom(T,tP4,.5),CRAIE.r0); }
      tab.maj(); return; }
    if(T>=q2){ /* 68 = 60 + ? ; sous le tissu : 6 fils de dix et 8 perles seules */
      const Y=150, tSH=mot('05b-reponse','Soixante-huit'), t6=mot('05b-reponse','six'), t8=mot('05b-reponse','huit'), t8b=mot('05b-reponse','huit',2);
      const tq68=mot('05-question','Soixante-huit'), tq60=mot('05-question','soixante'), tqp=mot('05-question','plus');
      if(T>=tq68) nombreDUE(c,'68',75,Y,92,[CRAIE.r1,CRAIE.r0],[zoom(T,tq68,.5),zoom(T,tq68,.5)]);
      if(T>=tq60){ ecrire(c,'=',172,Y,80,CRAIE.blanc); ecrire(c,'60',268,Y,92*zoom(T,tq60,.5),CRAIE.r1); }
      if(T>=tqp){ ecrire(c,'+',362,Y,80,CRAIE.blanc);
        if(T<t8b) ecrire(c,'?',450,Y,100*zoom(T,tqp,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
        else { ecrire(c,'8',450,Y,100*zoom(T,t8b,.5),CRAIE.r0); for(const [x,y] of [[410,70],[500,230]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
      const r6=14, fx=[0,1,2,3,4,5].map(k=>55+k*56), sx=[400,455], yb=650;
      if(T>=tSH){
        fx.forEach(x=>filDixE(c,x,yb,r6,10));
        for(let k=0;k<8;k++) perleE(c,sx[k%2],yb-30-Math.floor(k/2)*58,r6*1.15,COUL_PERLE[(k*3+1)%10]);
        if(T>=t6){ cadreE(c,30,yb-r6*20-34,325,r6*20+52,CRAIE.r1,1); etiquette(c,'6',192,yb-r6*20-66,T,t6,CRAIE.r1,56); }
        if(T>=t8){ cadreE(c,368,yb-30-3*58-26,120,3*58+56,CRAIE.r0,1); etiquette(c,'8',428,yb-30-3*58-62,T,t8,CRAIE.r0,56); } }
      tissuE(c,265,500,470,300,T>=tSH?entreE(T,tSH,tSH+1.1):0,T);
      tab.maj(); return; }
    if(T>=q1){ /* le potager de papi : 5 rangées de 10 salades, et 2 salades seules */
      const mq=(w,n=1)=>mot('04-question',w,n), mr=(w,n=1)=>mot('04b-reponse',w,n);
      const tq5=mq('cinq'), tq10=mq('dix'), tq2=mq('deux'), tR5=mr('Cinq'), tR50=mr('cinquante'), tR2=mr('deux'), tRc=mr('cinquante',2), tRp=mr('plus',2), tRd=mr('deux',2), tR52=mr('cinquante-deux');
      const RY=[290,365,440,515,590], LY=672, sx=k=>48+k*42;
      RY.forEach((y,j)=>{ rangTerreE(c,24,y,428); const lu=T>=r1&&T>=tR5+j*.28?1:0;
        for(let k=0;k<10;k++) saladeE(c,sx(k),y,20,1,lu*.6);
        if(T>=r1) etiquette(c,String((j+1)*10),482,y-16,T,tR5+j*.28,CRAIE.r1,40); });
      rangTerreE(c,24,LY,110); saladeE(c,sx(0),LY,20,1,T>=tR2?.8:0); saladeE(c,sx(1),LY,20,1,T>=tR2?.8:0);
      if(T<r1){ if(T>=tq5) etiquette(c,'5',482,440,T,tq5,CRAIE.r1,60);
        if(T>=tq10) ecrire(c,'10',237,215,60*zoom(T,tq10,.5),CRAIE.r1); }
      if(T>=tq2&&(T<r1||T>=tR2)) etiquette(c,'2',190,LY-16,T,T<r1?tq2:tR2,CRAIE.r0,50);
      /* la réponse : 50 + 2 = 52 */
      if(T>=r1){ const Y=150;
        if(T>=tR50&&T<tRc) ecrire(c,'50',230,Y,100*zoom(T,tR50,.5),CRAIE.r1);
        if(T>=tRc){ ecrire(c,'50',90,Y,100,CRAIE.r1); if(T>=tRp) ecrire(c,'+',185,Y,90,CRAIE.blanc); if(T>=tRd) ecrire(c,'2',260,Y,100*zoom(T,tRd,.5),CRAIE.r0); }
        if(T>=tR52){ ecrire(c,'=',335,Y,90,CRAIE.blanc); nombreDUE(c,'52',440,Y,100,[CRAIE.r1,CRAIE.r0],[zoom(T,tR52,.5),zoom(T,tR52+.12,.5)]);
          for(const [x,y] of [[390,70],[495,230]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
      else { /* papi a planté : un soleil, un arrosoir de lumière */ soleilEtoileE(c,90,130,46,T,entreE(T,q1,q1+.8)); }
      tab.maj(); return; }

    /* ---- avant les questions : la boîte, les perles qui roulent, les fils ---- */
    const dansAcc=T<li;
    if(dansAcc){
      const ouvre=entreE(T,tReg,tReg+.9), lum=T<tReg?.25+.15*Math.sin(T*4):.6+.4*ouvre;
      boiteBijouxE(c,BOITE[0],BOITE[1],WB,ouvre,T>=finTitre?lum:0,T);
      if(T<tReg&&T>=finTitre) for(const [x,y] of [[340,440],[720,430],[528,360]]) etincelle(c,x,y,10+6*Math.sin(T*5+x));
      /* le bracelet promis (un rond de perles), en haut à gauche */
      if(T>=tBrac){ const z=zoom(T,tBrac,.5); for(let k=0;k<12;k++){ const a=k/12*Math.PI*2; perleE(c,150+Math.cos(a)*70*z,150+Math.sin(a)*56*z,14,COUL_PERLE[k%10],z); } }
    } else { const u=entreE(T,li,li+.6); if(u<1){ c.globalAlpha=1-u; boiteBijouxE(c,BOITE[0],BOITE[1]+120*u,WB,1,.5,T); c.globalAlpha=1; } }
    /* les perles : elles roulent hors de la boîte, puis vont sur les fils */
    if(T>=tReg+.5){
      if(!dansAcc) FX.forEach(x=>filDixE(c,x,YB,R,0));
      for(let k=0;k<34;k++){ const g=k<30?Math.floor(k/10):3, i=k<30?k%10:k-30;
        const t0=tReg+.5+k*.06; let p;
        if(T<t0+.8) p=sautE([BOITE[0],BOITE[1]-180],roule[k],entreE(T,t0,t0+.8),150);
        else p=[roule[k][0]+3*Math.sin(T*2+k),roule[k][1]];
        const n=g<3?10:4, d0=departFil[g], d1=finFil[g]-.2, ti=d0+(d1-d0-.5)*i/n;
        if(!dansAcc&&T>=ti) p=sautE(roule[k],place(k),entreE(T,ti,ti+.5),110);
        if(T>=t0) perleE(c,p[0],p[1],R,COUL_PERLE[(k*3+1)%10]); } }
    if(T>=tComb&&dansAcc){ ecrire(c,'?',780,170,140*zoom(T,tComb,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      for(const [x,y] of [[690,120],[870,130],[780,270]]) etincelle(c,x,y,12+6*Math.sin(T*6+x)); }
    if(!dansAcc&&T<ad){ /* « par dix » ; 1 fil, 2 fils, 3 fils ; et 4 perles seules */
      if(T>=tLdix) ecrire(c,'10',520,330,100*zoom(T,tLdix,.5),CRAIE.r1);
      [tUn,tDeux,tTrois].forEach((t,j)=>{ if(T>=t){ etiquette(c,String(j+1),FX[j],115,T,t,CRAIE.blanc,50); cadreE(c,FX[j]-R*1.7,YB-R*20-30,R*3.4,R*20+48,CRAIE.r1,entreE(T,t,t+.4)); } });
      if(T>=tL4){ etiquette(c,'4',653,500,T,tL4,CRAIE.r0,64); cadreE(c,SX[0]-R*1.9,SY-R*1.9,SX[3]-SX[0]+R*3.8,R*3.8,CRAIE.r0,entreE(T,tL4,tL4+.4)); } }
    if(T>=ad){ /* 10, 20, 30 ; + 4 ; puis 30 + 4 = 34 */
      const cad=1, pzF=T<no?1:pulse(T,tN3,tNq), pzU=T<no?1:pulse(T,tNq,tNq2+1.2);
      FX.forEach(x=>cadreE(c,x-R*1.7,YB-R*20-30,R*3.4,R*20+48,CRAIE.r1,cad,pzF));
      cadreE(c,SX[0]-R*1.9,SY-R*1.9,SX[3]-SX[0]+R*3.8,R*3.8,CRAIE.r0,cad,pzU);
      if(T<no){
        [tA10,tA20,tA30].forEach((t,j)=>{ if(T>=t) etiquette(c,String((j+1)*10),FX[j],115,T,t,CRAIE.r1,50); });
        if(T>=tA4) etiquette(c,'4',653,500,T,tA4,CRAIE.r0,64);
        if(T>=tAt){ const Y=220; ecrire(c,'30',620,Y,140*zoom(T,tAt,.5),CRAIE.r1);
          if(T>=tAp) ecrire(c,'+',750,Y,110,CRAIE.blanc); if(T>=tAq) ecrire(c,'4',860,Y,140*zoom(T,tAq,.5),CRAIE.r0); } }
      else { const Y=200;
        if(T>=tN30) ecrire(c,'30',500,Y,120*zoom(T,tN30,.5),CRAIE.r1);
        if(T>=tNp) ecrire(c,'+',612,Y,100,CRAIE.blanc);
        if(T>=tN4) ecrire(c,'4',700,Y,120*zoom(T,tN4,.5),CRAIE.r0);
        let cx=[870,940];
        if(T>=tN34){ ecrire(c,'=',790,Y,100,CRAIE.blanc); cx=nombreDUE(c,'34',905,Y,130,[CRAIE.r1,CRAIE.r0],[zoom(T,tN34,.5)*pulse(T,tN3,tNq),zoom(T,tN34+.12,.5)*pulse(T,tNq,tNq2+1.2)]); }
        /* le 3 vaut 30 : un trait vers les 3 fils ; le 4 vaut 4 : un trait vers les perles seules */
        if(T>=tN3){ lienE(c,[cx[0],268],[410,360],entreE(T,tN3,tN3+.6),CRAIE.r1); if(T>=tNv30) etiquette(c,'30',240,115,T,tNv30,CRAIE.r1,56); }
        if(T>=tNq){ lienE(c,[cx[1],268],[700,560],entreE(T,tNq,tNq+.6),CRAIE.r0); if(T>=tNq2) etiquette(c,'4',653,500,T,tNq2,CRAIE.r0,64); } } }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Quelle'); const phrase1=[qa('Quelle addition va avec le dessin ?')];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); const m5=(w,n=1)=>mot('05-question',w,n);
  const phrase2=[phraseE("68, c'est 60 + combien ?",[m5('Soixante-huit'),m5("c'est"),m5('soixante'),m5('plus'),m5('combien'),m5('combien')])];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const tA=mr1('A'), tB=mr2('B');
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:0,tBon:tA-r1,
      phrase:phrase1,pause:pause1,
      choix:[['50 + 2',tqa('A'),tqa('cinquante')],['5 + 2',tqa('B'),tqa('cinq',2)],['20 + 5',tqa('C'),tqa('vingt')]],
      tete:[[r1+.1,'Réponse '],[tA,'A !']],
      reponse:[phraseE('5 rangées de 10 : 50.',[mr1('Cinq'),mr1('rangées'),mr1('de'),mr1('dix'),mr1('dix'),mr1('cinquante')]),
        phraseE('50 + 2 = 52',[mr1('cinquante',2),mr1('plus',2),mr1('deux',2),mr1('cinquante-deux'),mr1('cinquante-deux')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:1,tBon:tB-r2,
      phrase:phrase2,pause:pause2,
      choix:[['6',tqb('A'),tqb('six')],['8',tqb('B'),tqb('huit')],['60',tqb('C'),tqb('soixante',2)]],
      tete:[[r2+.1,'Réponse '],[tB,'B !']],
      reponse:[phraseE('6 fils de 10 et 8 perles.',[mr2('six'),mr2('fils'),mr2('de'),mr2('dix'),mr2('et'),mr2('huit')]),
        phraseE('68 = 60 + 8',[mr2('Soixante-huit'),mr2('Soixante-huit'),mr2('soixante'),mr2('plus'),mr2('huit',2)])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tComb+.6,'Combien<br>de perles ?<div style="font-size:150px;margin-top:6px">💎</div>');
  return { clips,FIN,titre:'La boîte à perles',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,li,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<li) T>=tComb?g.reflechit():(T>=tReg?g.oups():g.montre());
      else if(T<ad) T>=tL4?g.fier():g.montre();
      else if(T<no) T>=tAt?g.fier():g.montre();
      else if(T<q1) T>=tN34&&T<tN3?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.reflechit(); }
    } };
};
