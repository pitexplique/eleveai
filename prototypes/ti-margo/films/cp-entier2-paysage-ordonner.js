/* ============================================================
   Série Nombres entiers CP — PAYSAGE 10 : « Les bateaux rentrent au port » (micro cp_entier_ordonner), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js + cp-entier3-dessins.js.
   Voix : manim/voix/cp-entier-ordonner-paysage.json. Quatre voiliers en désordre (21, 5, 30, 12) : le plus petit d'abord (5, un seul chiffre),
   puis les dizaines (12, 21, 30) : 5 < 12 < 21 < 30. Questions en plein milieu : cerfs-volants 40, 24, 14 → C (14 en premier) ;
   pots de confiture 38, 32, 35 → A (32 ; 35 ; 38 : mêmes dizaines, on regarde les unités).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = les bateaux qui se cognent en désordre + « Comment les ranger ? ».
   Pendant les questions, les dessins restent à gauche de l'ardoise (x < 470) ; la carte est à droite.
   ============================================================ */
FILMS['ordonner']=function(outils){
  const DUR={'00-accroche':10.8,'01-petit':7.17,'02-dizaines':9.16,'03-range':8.34,'04-question':20.64,'04b-reponse':9.31,
    '05-question':23.51,'05b-reponse':8.94,'06-appris':8.98,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.4,'01-petit':1.2,'02-dizaines':1.4,'03-range':1.6,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pe,di,ra,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:58px!important;white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tLe=m0('Le'), tBat=m0('bateaux'), tMais=m0('Mais'), tComment=m0('Comment');
  const mp=w=>mot('01-petit',w), tCinq=mp('Cinq'), tDev=mp('devant');
  const md=w=>mot('02-dizaines',w), tDouze=md('Douze'), tUne=md('une'), tVingt=md('Vingt'), tDeux=md('deux'), tTrente=md('Trente'), tTrois=md('trois');
  const mra=w=>mot('03-range',w), tR=[mra('Cinq'),mra('douze'),mra('vingt'),mra('trente')], tBonne=mra('Bonne');
  const ma=w=>mot('06-appris',w), tAPetit=ma('petit'), tADiz=ma('dizaines'), tAUnit=ma('unités');
  const mq1=(w,n=1)=>mot('04-question',w,n), mr1=(w,n=1)=>mot('04b-reponse',w,n);
  const mq2=(w,n=1)=>mot('05-question',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const finTitre=tLe-.08;
  const pulse=(T,t0,d=1)=>T>=t0&&T<t0+d?1+.5*Math.sin((T-t0)*Math.PI/d):1;

  /* les bateaux : 21, 5, 30, 12 ; le désordre sur l'eau, puis les places le long du quai (5, 12, 21, 30) */
  const NUM=[21,5,30,12], COUL=['#e03131','#1c7ed6','#2f9e44','#f08c00'], S=1.2, YQ=640;
  const DES=[[215,480,-.05],[690,540,.06],[450,450,.04],[900,500,-.07]];
  const PLACE=[[650,YQ-8],[150,YQ-8],[900,YQ-8],[400,YQ-8]], VA=[tVingt,tCinq,tTrente,tDouze];
  function bateaux(c,T){ for(const k of [2,0,3,1]){
    const [dx,dy,da]=DES[k], arr=entreE(T,tBat+k*.35,tMais-.2), xa=1250+k*120;
    let x=xa+(dx-xa)*douxE(arr)+(arr>=1?10*Math.sin(T*2.2+k*1.7):0), y=dy+4*Math.sin(T*1.8+k), a=(arr>=1?da*Math.sin(T*2.6+k*2):0);
    if(T>=VA[k]){ const u=douxE(entreE(T,VA[k],VA[k]+1.3)), [px,py]=PLACE[k]; x+=(px-x)*u; y+=(py-y)*u; a*=1-u; }
    let zs=[1,1], lueur=0;
    if(k===1&&T>=tCinq&&T<tDev+.6) lueur=.6+.4*Math.sin(T*6);
    if(T<ra){ if(k===3) zs=[pulse(T,tUne-.1),1]; if(k===0) zs=[pulse(T,tDeux-.1),1]; if(k===2) zs=[pulse(T,tTrois-.1),1]; }
    if(T>=ap) zs=[k!==1?pulse(T,tADiz-.1):1,pulse(T,tAUnit-.1)];
    bateauE(c,x,y,S,NUM[k],COUL[k],{zs,lueur,a}); } }
  /* « 5 < 12 < 21 < 30 » écrit en grand, chaque nombre à son mot */
  function suite(c,T,ns,ts,x0,dx,y,taille){ ns.forEach((n,i)=>{ if(T>=ts[i]){ const z=zoom(T,ts[i],.5); numDUE(c,n,x0+i*dx,y,taille*z); if(i>0) ecrire(c,'<',x0+(i-.5)*dx,y,taille*.85,CRAIE.blanc); } }); }
  function port(c,T,nuit){ c.fillStyle='#1864ab'; c.fillRect(0,300,1056,420);
    if(nuit<1) soleilCouchant(c,850,300+60*nuit,85,1-nuit*.9);
    merE(c,T,300); quaiE(c,0,1056,YQ,entreE(T,tBonne,tBonne+1.2),T); }

  /* les pots de confiture de mamie, sur l'étagère : 38, 32, 35 → 32, 35, 38 (deux échanges en arc) */
  const POTS=[38,32,35], CPOT=['#5f3dc4','#c92a2a','#f08c00'], XP=[85,240,395], YE=480;
  const tTr=mr2('trois'), tU=[mr2('deux'),mr2('cinq'),mr2('huit')], UNI={32:0,35:1,38:2};
  const ETAPES=[[[tU[0],XP[1],-80],[tU[1],XP[2],-80]],[[tU[0],XP[0],60]],[[tU[1],XP[1],60]]];
  function pots(c,T){ etagereE(c,8,YE,462);
    POTS.forEach((n,k)=>{ let x=XP[k], y=YE;
      if(T>=r2) for(const [t0,nx,h] of ETAPES[k]){ if(T<t0) break; const [px,py]=sautE([x,y],[nx,YE],entreE(T,t0,t0+.8),h); x=px; y=py; }
      potConfitureE(c,x,y,140,n,CPOT[k],{zs:T>=r2?[pulse(T,tTr-.1),pulse(T,tU[UNI[n]]-.1)]:[1,1]}); });
    if(T>=r2&&T>=tU[2]+.5) suite(c,T,[32,35,38],[tU[2]+.5,tU[2]+.5,tU[2]+.5],75,165,610,72); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ port(c,T,1); etoilesE(c,T,10,1056,200); bateaux(c,T); suite(c,T,[5,12,21,30],[ap+.05,ap+.05,ap+.05,ap+.05],215,210,130,100);
      if(T>=tAPetit&&T<tADiz) etincelle(c,160,330,16+6*Math.sin(T*6));
      tab.maj(); return; }
    if(T>=q2){ /* l'étagère de mamie */
      pots(c,T); const tQ=mq2('Quel');
      if(T<r2&&T>=tQ) ecrire(c,'?',235,150,120*zoom(T,tQ,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=q1){ /* le parc : trois cerfs-volants 40, 24, 14 */
      herbeE(c,610,1056,720);
      const tL=mq1('Lequel');
      const K=[[40,'#e03131',[110,140],mq1('quarante'),mr1('quarante'),[400,310]],[24,'#7048e8',[350,215],mq1('vingt-quatre'),mr1('vingt-quatre'),[235,310]],[14,'#f08c00',[185,410],mq1('quatorze'),mr1('Quatorze'),[70,310]]];
      K.forEach(([n,coul,[x0,y0],tv,tr,[x1,y1]],k)=>{ if(T<tv) return;
        let x=x0+12*Math.sin(T*1.4+k*2), y=y0+10*Math.cos(T*1.2+k), s=1.12*zoom(T,tv,.4), a=.12*Math.sin(T*1.7+k);
        if(T>=r1&&T>=tr){ const u=douxE(entreE(T,tr,tr+1)); x+=(x1-x)*u; y+=(y1-y)*u; s+=(.84-s)*u; a*=1-u; }
        cerfVolantE(c,x,y,s,n,coul,{fx:250,fy:640,a,lueur:k===2&&T>=r1&&T<mr1('Puis')?.5+.4*Math.sin(T*6):0}); });
      if(T<r1&&T>=tL) ecrire(c,'?',440,90,110*zoom(T,tL,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T>=r1){ const t2=mr1('vingt-quatre'), t3=mr1('quarante');         if(T>=t3+.6) suite(c,T,[14,24,40],[t3+.6,t3+.6,t3+.6],70,165,575,72); }
      tab.maj(); return; }

    /* ---- avant les questions : le port au coucher du soleil ---- */
    port(c,T,T<ra?0:entreE(T,tBonne-.5,tBonne+2));
    if(T>=tBonne) etoilesE(c,T,10,1056,200);
    bateaux(c,T);
    if(T>=tComment&&T<pe) ecrire(c,'?',560,150,140*zoom(T,tComment,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
    if(T>=tMais&&T<pe) for(const [x,y] of [[340,330],[600,360],[770,320]]) if(Math.sin(T*7+x)>.3) etincelle(c,x,y,12,'#f8f9fa');
    if(T>=ra) suite(c,T,[5,12,21,30],tR,215,210,140,100);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Lequel'); const phrase1=[qa('Lequel passe en premier ?')];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Quel'); const phrase2=[qb('Quel rangement est juste ?')];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mq1(w,n)-q1, tqb=(w,n=1)=>mq2(w,n)-q2;
  const tC1=mr1('C'), tA2=mr2('A');
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:2,tBon:tC1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['40',tqa('A'),tqa('quarante',2)],['24',tqa('B'),tqa('vingt-quatre',2)],['14',tqa('C'),tqa('quatorze',2)]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],
      reponse:[phraseE('14 passe en premier.',[mr1('Quatorze'),mr1('passe'),mr1('en'),mr1('premier')]),
        phraseE('14 < 24 < 40',[mr1('Quatorze'),mr1('vingt-quatre'),mr1('vingt-quatre'),mr1('quarante'),mr1('quarante')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['32 ; 35 ; 38',tqb('A'),tqb('trente-deux')],['38 ; 35 ; 32',tqb('B'),tqb('trente-huit',2)],['35 ; 32 ; 38',tqb('C'),tqb('trente-cinq',3)]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('Tous : 3 dizaines.',[mr2('tous'),mr2('tous'),mr2('trois'),mr2('dizaines')]),
        phraseE('32 < 35 < 38',[mr2('deux'),mr2('cinq'),mr2('cinq'),mr2('huit'),mr2('huit')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tComment+.6,'Comment les<br>ranger ?<div style="font-size:150px;margin-top:6px">⛵⛵⛵</div>');
  return { clips,FIN,titre:'Les bateaux rentrent au port',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,pe,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<pe) T>=tMais&&T<tComment?g.oups():(T>=tComment?g.reflechit():g.montre());
      else if(T<di) T>=tCinq?g.fier():g.montre();
      else if(T<q1) T>=tBonne?g.ouvre():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.reflechit(); }
    } };
};
