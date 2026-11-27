/* ============================================================
   Série Nombres entiers CP — PAYSAGE 12 : « Les devinettes du hibou » (micro cp_entier_defi), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js + cp-entier3-dessins.js.
   Voix : manim/voix/cp-entier-defi-paysage.json. La forêt la nuit, deux yeux s'allument : le hibou des devinettes.
   4 dizaines et 2 unités → 42 ; avec 3 et 8, le plus grand → 83 ; on échange → 38 (la place du chiffre change tout).
   Questions en plein milieu : entre 60 et 70, unités 5 → A (65) ; avec 5, 0, 9 le plus petit à deux chiffres → C (50, jamais de 0 devant).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = deux grands yeux jaunes qui s'ouvrent dans la nuit + « Tu es prêt à jouer ? ».
   Pendant les questions, les dessins restent à gauche de l'ardoise (x < 470) ; la carte est à droite.
   ============================================================ */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':9.6,'01-devinette':12.48,'02-cartes':11.25,'03-echange':9.1,'04-question':20.13,'04b-reponse':10.73,
    '05-question':17,'05b-reponse':11.01,'06-appris':8.88,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.2,'01-devinette':1.2,'02-cartes':1.2,'03-echange':1.6,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,de,ca,ec,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:58px!important;white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tDans=m0('Dans'), tYeux=m0('yeux'), tHibou=m0('hibou'), tTu=m0('Tu');
  const md=(w,n=1)=>mot('01-devinette',w,n), tQuatre=md('quatre'), tQ2=md('Quatre',2), t40=md('quarante'), tD2=md('Deux',2), t2=md('deux',3), t42=md('Quarante-deux');
  const mc=(w,n=1)=>mot('02-cartes',w,n), tC3=mc('trois'), tC8=mc('huit'), tGrand=mc('grand'), tHuit=mc('Huit',2), t83=mc('quatre-vingt-trois');
  const me=w=>mot('03-echange',w), tEch=me("j'échange"), t38=me('Trente-huit'), tMeme=me('même'), tPlace=me('place');
  const ma=(w,n=1)=>mot('06-appris',w,n), tADiz=ma('dizaines'), tAZero=ma('zéro');
  const mq1=(w,n=1)=>mot('04-question',w,n), mr1=(w,n=1)=>mot('04b-reponse',w,n);
  const mq2=(w,n=1)=>mot('05-question',w,n), mr2=(w,n=1)=>mot('05b-reponse',w,n);
  const finTitre=tDans-.08;
  const pulse=(T,t0,d=1)=>T>=t0&&T<t0+d?1+.5*Math.sin((T-t0)*Math.PI/d):1;

  function nuit(c,T){ luneE(c,120,90,50); etoilesE(c,T,10,1056,220); foretE(c,700); }
  /* un nombre écrit avec ses deux chiffres, dizaine orange et unité bleue */
  function cartesDeux(c,T,xs,ns,cols,w=160,y=420,zs=[1,1]){ ns.forEach((n,i)=>carteNumE(c,xs[i],y,w,n,{coul:cols[i],zs:[zs[i],zs[i]]})); }

  function dessiner(T){ const c=tab.c; tab.effacer(); nuit(c,T);
    if(T>=ap){ brancheE(c,620,1056,420); hibouE(c,830,420,1.4,{T});
      numDUE(c,83,300,200,130,[pulse(T,tADiz-.1),1]); numDUE(c,38,300,390,130,[pulse(T,tADiz-.1),1]);
      if(T>=tAZero){ ecrire(c,'05',300,570,100*zoom(T,tAZero,.5),CRAIE.blanc); croixE(c,300,570,150,entreE(T,tAZero+.2,tAZero+.8)); }
      tab.maj(); return; }
    if(T>=q2){ /* 5, 0, 9 : le plus petit nombre à deux chiffres */
      const tP=mq2('petit'), tZ=mr2('zéro'), tJam=mr2('jamais'), tDev=mr2('devant'), tCq=mr2('cinq'), t50=mr2('cinquante'), tHou=mr2('Hou');
      hibouE(c,410,240,.62,{T,non:T>=r2&&T>=tJam&&T<tDev+1.2?1:0});
      if(T>=tP&&(T<r2||T>=tHou)) bulleE(c,185,105,T<r2?360:280,90,330,160,T<r2?'le plus petit ?':'Hou hou !',50,zoom(T,T<r2?tP:tHou,.5));
      const base=[[90,330],[235,330],[380,330]], tv=[mq2('cinq'),mq2('zéro'),mq2('neuf')], N=[5,0,9];
      N.forEach((n,k)=>{ if(T<tv[k]) return; let [x,y]=base[k], alpha=1;
        if(T>=r2){ if(k===2) alpha=1-.72*entreE(T,tZ,tZ+.8);
          if(k===1&&T>=tZ){ [x,y]=sautE([x,y],[110,560],entreE(T,tZ,tZ+.8),60); if(T>=tCq) [x,y]=sautE([x,y],[240,560],entreE(T,tCq,tCq+.8),-70); }
          if(k===0&&T>=tZ){ [x,y]=sautE([x,y],[240,560],entreE(T,tZ,tZ+.8),60); if(T>=tCq) [x,y]=sautE([x,y],[110,560],entreE(T,tCq,tCq+.8),70); } }
        const coul=T>=r2&&T>=t50&&k<2?(k===0?CRAIE.r1:CRAIE.r0):CRAIE.blanc;
        carteNumE(c,x,y,130,n,{coul,alpha,z:zoom(T,tv[k],.5),lueur:T>=t50&&k<2?.4:0}); });
      if(T>=r2&&T>=tJam&&T<tCq) croixE(c,175,560,230,entreE(T,tJam,tJam+.6));
      if(T>=t50) for(const [x,y] of [[60,440],[300,450]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      tab.maj(); return; }
    if(T>=q1){ /* entre 60 et 70, l'unité est 5 */
      const t70=mq1('soixante-dix'), tCinq=mq1('cinq'), tQ=mq1('Qui'), t6=mr1('six'), t5=mr1('cinq',2), t65=mr1('Soixante-cinq');
      brancheE(c,300,470,330); hibouE(c,395,330,.72,{T});
      if(T>=t70) bulleE(c,185,85,360,86,330,160,'entre 60 et 70',48,zoom(T,t70,.5));
      if(T>=tCinq) bulleE(c,150,195,280,84,320,215,'unités : 5',48,zoom(T,tCinq,.5));
      /* la piste de 60 à 70 */
      const Y=470, X0=90, X1=380; if(T>=t70){ c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.beginPath(); c.moveTo(X0,Y); c.lineTo(X1,Y); c.stroke();
        for(let i=0;i<=10;i++){ const x=X0+(X1-X0)*i/10, h=i%5?10:20; c.beginPath(); c.moveTo(x,Y-h); c.lineTo(x,Y+h); c.stroke(); }
        numDUE(c,60,X0,Y+62,62); numDUE(c,70,X1,Y+62,62); }
      if(T<r1&&T>=tQ) ecrire(c,'?',(X0+X1)/2,Y-60,90*zoom(T,tQ,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
      if(T>=r1){ if(T>=t6) ecrire(c,'6',200,620,120*zoom(T,t6,.5),CRAIE.r1); if(T>=t5) ecrire(c,'5',270,620,120*zoom(T,t5,.5),CRAIE.r0);
        if(T>=t65){ const x=X0+(X1-X0)*.5; pointE(c,x,Y,CRAIE.ok,zoom(T,t65,.5)); lienE(c,[235,560],[x,Y+25],entreE(T,t65,t65+.5),CRAIE.ok); for(const [a,b] of [[120,590],[350,600]]) etincelle(c,a,b,14+6*Math.sin(T*6+a)); } }
      tab.maj(); return; }

    /* ---- avant les questions : la forêt, le hibou ---- */
    brancheE(c,620,1056,420);
    const vu=entreE(T,tHibou-.4,tHibou+.6);
    hibouE(c,820,420,1.4,{T,yeux:entreE(T,tYeux,tYeux+.7),vu,cligne:T>=tHibou});
    if(T<de&&T>=tHibou) bulleE(c,500,110,340,100,700,170,'Hou hou !',58,zoom(T,tHibou,.5));
    if(T<de&&T>=tTu) ecrire(c,'?',300,330,150*zoom(T,tTu,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
    if(T>=de&&T<ca){ /* 4 dizaines et 2 unités */
      if(T>=tQuatre) bulleE(c,400,100,640,110,700,170,'4 dizaines et 2 unités',54,zoom(T,tQuatre,.5));
      if(T>=tQ2) costumeE(c,60,650,30,4,T>=tD2?2:0,{zb:i=>zoom(T,tQ2+i*.15,.5),zu:i=>zoom(T,tD2+i*.15,.5),lb:()=>T>=tQ2&&T<t40+.8?.6:0,lu:()=>T>=tD2&&T<t2+.8?.6:0});
      if(T>=t40) plaqueNumE(c,40,136,300,56,[zoom(T,t40,.5),zoom(T,t40,.5)]);
      if(T>=t2) plaqueNumE(c,2,272,560,56,[zoom(T,t2,.5),zoom(T,t2,.5)]);
      if(T>=t42){ numDUE(c,42,430,380,160*zoom(T,t42,.5)); for(const [x,y] of [[340,270],[520,280]]) etincelle(c,x,y,14+6*Math.sin(T*6+x)); } }
    if(T>=ca){ /* 3 et 8 : le plus grand, puis l'échange */
      const tomber=(k,t)=>sautE([780,230],[k?480:300,420],entreE(T,t,t+.8),-80);
      let p3=T>=tC3?tomber(0,tC3):null, p8=T>=tC8?tomber(1,tC8):null;
      if(T>=tHuit){ p8=sautE(p8,[300,420],entreE(T,tHuit,tHuit+.8),90); p3=sautE(p3,[480,420],entreE(T,tHuit,tHuit+.8),-90); }
      if(T>=tEch){ p3=sautE(p3,[300,420],entreE(T,tEch,tEch+.8),90); p8=sautE(p8,[480,420],entreE(T,tEch,tEch+.8),-90); }
      const forme=T>=t83, z=pulse(T,tPlace,.9);
      const c3=T>=ec?(T>=t38?CRAIE.r1:CRAIE.blanc):(forme?CRAIE.r0:CRAIE.blanc), c8=T>=ec?(T>=t38?CRAIE.r0:CRAIE.blanc):(forme?CRAIE.r1:CRAIE.blanc);
      if(p3) carteNumE(c,p3[0],p3[1],160,3,{coul:c3,zs:[z,z],a:T<tHuit?.1:0});
      if(p8) carteNumE(c,p8[0],p8[1],160,8,{coul:c8,zs:[z,z],a:T<tHuit?-.1:0});
      if(T<ec&&T>=tGrand) bulleE(c,420,100,420,100,700,170,'le plus grand ?',54,zoom(T,tGrand,.5));
      if(T<ec&&forme) numDUE(c,83,390,630,96*zoom(T,t83,.5));
      if(T>=ec&&T>=t38&&T<tMeme) numDUE(c,38,390,630,96*zoom(T,t38,.5));
      if(T>=tMeme){ const zz=zoom(T,tMeme,.5); numDUE(c,83,270,630,90*zz); ecrire(c,'>',390,630,80*zz,CRAIE.blanc); numDUE(c,38,510,630,90*zz); } }
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Qui'); const phrase1=[qa('Qui suis-je ?')];
  qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('le'); const phrase2=[qb('Le plus petit nombre ?')];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mq1(w,n)-q1, tqb=(w,n=1)=>mq2(w,n)-q2;
  const tA1=mr1('A'), tC2=mr2('C');
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['65',tqa('A'),tqa('soixante-cinq')],['56',tqa('B'),tqa('cinquante-six')],['75',tqa('C'),tqa('soixante-quinze')]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],
      reponse:[phraseE('Entre 60 et 70.',[mr1('Entre'),mr1('soixante'),mr1('et'),mr1('soixante-dix')]),
        phraseE('6 devant, 5 derrière : 65',[mr1('six'),mr1('devant'),mr1('cinq',2),mr1('derrière'),mr1('derrière'),mr1('Soixante-cinq')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:2,tBon:tC2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['05',tqb('A'),tqb('zéro',2)],['59',tqb('B'),tqb('cinquante-neuf')],['50',tqb('C'),tqb('cinquante')]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],
      reponse:[phraseE('Jamais de 0 devant.',[mr2('jamais'),mr2('jamais'),mr2('jamais'),mr2('devant')]),
        phraseE('5 devant, 0 derrière : 50.',[mr2('cinq'),mr2('devant',2),mr2('zéro',2),mr2('derrière'),mr2('derrière'),mr2('cinquante')])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tTu+.5,'Qui suis-je ?<div style="font-size:150px;margin-top:6px">🦉</div>');
  return { clips,FIN,titre:'Les devinettes du hibou',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,de,ca,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<de) T>=tYeux&&T<tHibou?g.oups():(T>=tTu?g.ouvre():g.montre());
      else if(T<ca) T>=t42?g.fier():g.montre();
      else if(T<ec) T>=t83?g.fier():g.montre();
      else if(T<q1) T>=tMeme&&T<tPlace?g.oups():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.reflechit(); }
    } };
};
