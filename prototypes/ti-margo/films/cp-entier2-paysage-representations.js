/* ============================================================
   Série Nombres entiers CP — PAYSAGE 11 : « Le bal masqué des nombres » (micro cp_entier_representations), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js + cp-entier3-dessins.js.
   Voix : manim/voix/cp-entier-representations-paysage.json. Le rideau s'ouvre sur une ombre masquée : 2 barres de dix + 3 cubes,
   on compte 10, 20… 21, 22, 23 et le masque tombe : 23. Ses costumes : « vingt-trois », 20 + 3, deux cadres de dix pleins + 3 jetons.
   Questions en plein milieu : 3 barres + 6 cubes → C (36) ; le costume de 52 → A (5 barres et 2 cubes).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = le rideau qui s'ouvre sur une ombre masquée + « Qui se cache là-dessous ? ».
   Pendant les questions, les dessins restent à gauche de l'ardoise (x < 470) ; la carte est à droite.
   ============================================================ */
FILMS['representations']=function(outils){
  const DUR={'00-accroche':10.01,'01-cubes':8.91,'02-costumes':11.66,'03-meme':5.81,'04-question':16.09,'04b-reponse':10.56,
    '05-question':16.37,'05b-reponse':8.19,'06-appris':8.09,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.2,'01-cubes':1.4,'02-costumes':1.4,'03-meme':1.6,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cu,co,me,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:58px!important;white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tCe=m0('Ce'), tBal=m0('bal'), tUn=m0('Un'), tQui=m0('Qui');
  const mc=(w,n=1)=>mot('01-cubes',w,n), tBarres=mc('barres'), tCubes=mc('cubes');
  const tCompte=[mc('Dix'),mc('vingt'),mc('un'),mc('vingt-deux'),mc('vingt-trois')];
  const mo=(w,n=1)=>mot('02-costumes',w,n), tChange=mo('change'), tLettres=mo('vingt-trois'), t20=mo('vingt'), tPlus=mo('plus'), t3=mo('trois'),
    tCadres=mo('cadres'), tDeuxC=mo('deux'), tPleins=mo('pleins'), tJetons=mo('trois',2);
  const mm=w=>mot('03-meme',w), tEcr=mm('écritures'), tMeme=mm('même'), t23=mm('vingt-trois'), tLui=mm('lui');
  const ma=w=>mot('06-appris',w), tAChif=ma('chiffres'), tALet=ma('lettres'), tABar=ma('barres'), tACub=ma('cubes');
  const mq1=(w,n=1)=>mot('04-question',w,n), mr1=(w,n=1)=>mot('04b-reponse',w,n);
  const mq2=(w,n=1)=>mot('05-question',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const finTitre=tCe-.08;
  const pulse=(T,t0,d=1)=>T>=t0&&T<t0+d?1+.5*Math.sin((T-t0)*Math.PI/d):1;

  /* le masque qui tombe : à t0, il glisse, tourne et disparaît sous la scène */
  function masqueTombe(c,x,y,w,T,t0){ if(T<t0) return; const u=entreE(T,t0,t0+1.2); if(u>=1) return;
    c.save(); c.globalAlpha=1-u*.8; masqueE(c,x+60*u,y+420*u*u,w,'#be4bdb',u*2.5); c.restore(); }
  /* le compteur : une plaque qui montre le dernier nombre compté */
  function compteur(c,T,ns,ts,x,y,taille){ let k=-1; ts.forEach((t,i)=>{ if(T>=t) k=i; }); if(k<0) return; plaqueNumE(c,ns[k],x,y,taille*zoom(T,ts[k],.4),[1,1],.3); }

  /* ---- 23 et ses costumes (clips 02, 03, 06) ---- */
  function costumes(c,T,t0,{tN=t0,tL=t0,tCa=t0,tLi=Infinity,glN=0,glL=0,glC=0}={}){
    const u=douxE(entreE(T,t0,t0+1));
    /* « 23 », du rideau au milieu */
    const x=700+(528-700)*u, y=400+(330-400)*u, sN=(200+(170-200)*u)*pulse(T,tN,.9)*(1+.15*glN);
    numDUE(c,23,x,y,sN);
    /* les barres et les cubes, de la scène au coin haut-gauche */
    const s=34+(27-34)*u, x0=150+(105-150)*u, yb=620+(310-620)*u;
    costumeE(c,x0,yb,s,2,3,{lb:()=>glC,lu:()=>glC});
    /* en lettres */
    if(T>=tL) ecrire(c,'vingt-trois',815,150,70*zoom(T,tL,.5)*(1+.12*glL),CRAIE.blanc);
    /* en calcul : 20 + 3 */
    if(T>=t20) numDUE(c,20,140,575,96*zoom(T,t20,.5)); if(T>=tPlus) ecrire(c,'+',245,575,90,CRAIE.blanc); if(T>=t3) numDUE(c,3,325,575,96*zoom(T,t3,.5));
    /* dans les cadres de dix : deux cadres pleins et trois jetons */
    if(T>=tCa){ const n=k=>Math.round(10*entreE(T,tDeuxC+k*.35,tPleins+k*.35+.3));
      cadreDixE(c,600,445,50,T<tDeuxC?0:n(0),zoom(T,tCa,.5)); cadreDixE(c,600,560,50,T<tDeuxC?0:n(1),zoom(T,tCa,.5));
      if(T>=tJetons) for(let i=0;i<3;i++){ const z=zoom(T,tJetons+i*.15,.5); if(z<=0) continue; c.fillStyle='#e03131'; c.beginPath(); c.arc(890+i*52,560,20*Math.min(1.2,z),0,7); c.fill(); } }
    /* « C'est toujours lui » : un trait de 23 vers chaque costume */
    if(T>=tLi){ const v=k=>entreE(T,tLi+k*.25,tLi+k*.25+.5); lienE(c,[430,290],[250,200],v(0),CRAIE.jaune); lienE(c,[630,290],[760,185],v(1),CRAIE.jaune);
      lienE(c,[430,380],[300,525],v(2),CRAIE.jaune); lienE(c,[630,380],[690,435],v(3),CRAIE.jaune); } }

  /* ---- les trois costumes de la question 2 : A (5 barres, 2 cubes), B (2 barres, 5 cubes), C (7 cubes) ---- */
  function troisCostumes(c,T){ const s=21, Y=560, tA=mr2('A'), tCinqB=mr2('cinq');
    const fade=k=>T>=r2&&T>=tA&&k>0?.28:1;
    const gl=T>=r2&&T>=tCinqB&&T<mr2('Plus')?.7+.3*Math.sin(T*6):0;
    [[10,5,2,3,105],[218,2,5,10,315],[418,0,7,2,442]].forEach(([x0,b,u,lig,xl],k)=>{ c.save(); c.globalAlpha=fade(k);
      costumeE(c,x0,Y,s,b,u,{ligne:lig,lb:()=>k===0?gl:0,lu:()=>k===0&&T>=mr2('deux')&&T<mr2('Cinquante-deux')?.6:0});
      c.fillStyle=k===0&&T>=r2&&T>=tA?'#2f9a3a':'#f8f9fa'; c.beginPath(); c.arc(xl,620,30,0,7); c.fill();
      ecrire(c,'ABC'[k],xl,622,40,k===0&&T>=r2&&T>=tA?'#f8f9fa':'#17452a'); c.restore(); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ rideauE(c,1); projecteurE(c,528,400,360);
      costumes(c,T,ap-5,{tN:tAChif,tL:-1,tCa:-1,tLi:ap+.3,glN:0,glL:T>=tALet&&T<tABar?1:0,glC:T>=tABar&&T<tACub+1?.7:0});
      tab.maj(); return; }
    if(T>=q2){ /* « 52 » cherche son costume */
      const t52=mq2('cinquante-deux'), tL=mq2('Lequel');
      if(T>=t52) numDUE(c,52,110,130,120*zoom(T,t52,.5));
      if(T<r2&&T>=tL) ecrire(c,'?',250,130,120*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T<r2) masqueE(c,380,125,140,'#be4bdb',.1*Math.sin(T*2));
      if(T>=mq2('A')) troisCostumes(c,T);
      if(T>=r2){ const tC=mr2('Cinquante'), tP=mr2('Plus'), tD=mr2('deux'), t52b=mr2('Cinquante-deux'), Y=300;
        if(T>=tC) numDUE(c,50,80,Y,80*zoom(T,tC,.5)); if(T>=tP) ecrire(c,'+',168,Y,70,CRAIE.blanc); if(T>=tD) numDUE(c,2,230,Y,80*zoom(T,tD,.5));
        if(T>=t52b){ ecrire(c,'=',295,Y,70,CRAIE.blanc); numDUE(c,52,380,Y,80*zoom(T,t52b,.5)); for(const [x,y] of [[300,60],[440,210]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
      tab.maj(); return; }
    if(T>=q1){ /* un autre danseur masqué : 3 barres et 6 cubes */
      const tB=mq1('trois'), tS=mq1('six'), tQ=mq1('Qui');
      const tD=[mr1('dix'),mr1('vingt'),mr1('trente')], tCubesR=[0,1,2,3,4,5].map(i=>mr1('un')+(mr1('trente-six')+.6-mr1('un'))*i/5), t36=mr1('trente-six',2);
      const gb=i=>T>=r1&&T>=tD[i]&&T<tD[i]+.9?.9:0, gu=i=>T>=r1&&T>=tCubesR[i]&&T<tCubesR[i]+.7?.9:0;
      projecteurE(c,390,560,140,T<t36+.5?1:.4);
      if(T<t36+1.2) ombreMasqueeE(c,400,640,.78,T<t36?1:1-entreE(T,t36,t36+.8),T);
      masqueTombe(c,400,453,86,T,t36);
      if(T>=tB) costumeE(c,30,620,36,3,T>=tS?6:0,{ligne:3,zb:i=>zoom(T,tB+i*.15,.5),zu:i=>zoom(T,tS+i*.1,.5),lb:gb,lu:gu});
      if(T<r1&&T>=tQ) ecrire(c,'?',395,200,120*zoom(T,tQ,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T>=r1) compteur(c,T,[10,20,30,31,32,33,34,35,36],[...tD,...tCubesR],170,150,80);
      if(T>=t36){ numDUE(c,36,395,330,130*zoom(T,t36,.5)); for(const [x,y] of [[320,250],[460,250]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
      tab.maj(); return; }

    /* ---- avant les questions : le théâtre ---- */
    rideauE(c,T<tCe?0:entreE(T,tCe,tBal+1.2));
    projecteurE(c,700,560,220,entreE(T,tUn-.5,tUn+.5));
    if(T<co){ const t23=tCompte[4], v=entreE(T,tUn,tUn+1.3);
      if(T<t23+1) ombreMasqueeE(c,700+260*(1-douxE(v)),640,1.5,(T<t23?v:1-entreE(T,t23,t23+.7)),T);
      masqueTombe(c,700,280,165,T,t23);
      if(T>=tQui&&T<cu) ecrire(c,'?',700,110,150*zoom(T,tQui,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T>=cu){ const gb=i=>T>=tCompte[i]&&T<tCompte[i]+.9?.9:0, gu=i=>T>=tCompte[i+2]&&T<tCompte[i+2]+.8?.9:0;
        if(T>=tBarres) costumeE(c,150,620,34,2,T>=tCubes?3:0,{zb:i=>zoom(T,tBarres+i*.15,.5),zu:i=>zoom(T,tCubes+i*.12,.5),lb:gb,lu:gu});
        compteur(c,T,[10,20,21,22,23],tCompte,250,180,80);
        if(T>=t23){ numDUE(c,23,700,400,200*zoom(T,t23,.5)); for(const [x,y] of [[580,260],[830,270],[700,190]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
      tab.maj(); return; }
    costumes(c,T,tChange,{tN:t23,tL:tLettres,tCa:tCadres,tLi:T>=me?tEcr:Infinity});
    if(T>=tLui) for(const [x,y] of [[430,230],[630,230],[528,470]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Qui'); const phrase1=[qa('Qui est-ce ?')];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const phrase2=[phraseE('52 : quel costume ?',[mq2('cinquante-deux'),mq2('cinquante-deux'),mq2('Lequel'),mq2('Lequel')])];
  const tqa=(w,n=1)=>mq1(w,n)-q1, tqb=(w,n=1)=>mq2(w,n)-q2;
  const tC1=mr1('C'), tA2=mr2('A'), P='<span style="font-size:44px">';
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:2,tBon:tC1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['63',tqa('A'),tqa('soixante-trois')],['9',tqa('B'),tqa('neuf')],['36',tqa('C'),tqa('trente-six')]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],
      reponse:[phraseE('10, 20, 30… 36 !',[mr1('dix'),mr1('vingt'),mr1('trente'),mr1('trente-six'),mr1('trente-six')]),
        phraseE("C'est 36 !",[mr1("C'est"),mr1('trente-six',2),mr1('trente-six',2)])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[[P+'5 barres, 2 cubes</span>',tqb('A'),tqb('cinq')],[P+'2 barres, 5 cubes</span>',tqb('B'),tqb('deux',2)],[P+'7 cubes</span>',tqb('C'),tqb('sept')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('5 barres de 10.',[mr2('cinq'),mr2('barres'),mr2('de'),mr2('dix')]),
        phraseE('50 + 2 = 52',[mr2('Cinquante'),mr2('Plus'),mr2('deux'),mr2('Cinquante-deux'),mr2('Cinquante-deux')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tQui+.6,'Qui se cache<br>là-dessous ?<div style="font-size:150px;margin-top:6px">🎭</div>');
  return { clips,FIN,titre:'Le bal masqué des nombres',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,cu,co,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<cu) T>=tQui?g.reflechit():g.montre();
      else if(T<co) T>=tCompte[4]?g.fier():g.montre();
      else if(T<q1) T>=tLui?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.reflechit(); }
    } };
};
