/* ============================================================
   Série Nombres entiers CP — PAYSAGE 04 : « Les coquillages » (micro cp_entier_comparer), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier-paysage.js + cp-entier2-dessins.js. Voix : manim/voix/cp-entier-comparer-paysage.json.
   Sur la plage, Ti Margo (6 coquillages) et le chat (4) : face à face, 2 restent seuls ; 6 > 4, la bouche du crocodile ; 4 = 4.
   Questions en plein milieu : les lucioles, 8 rouges et 5 bleues → B (le rouge) ; 7 et 9, vers qui la bouche ? → A (vers le 9).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise (x < 520) ; la carte est à droite.
   ============================================================ */
FILMS['comparer']=function(outils){
  const DUR={'00-accroche':9.86,'01-face':6.67,'02-reste':10.86,'03-signe':9.51,'03b-egal':7.22,'04-question':19.34,'04b-reponse':6.85,
    '05-question':15.81,'05b-reponse':8.02,'06-appris':8.55,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-face':.5,'02-reste':1,'03-signe':1,'03b-egal':1.2,
    '04-question':3.3,'04b-reponse':1.4,'05-question':3.3,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,fa,re,si,eg,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tSur=m0('Sur'), tPlage=m0('plage'), tMer=m0('mer'), tChante=m0('chante'), tChat=m0('chat'), tCoq=m0('coquillages'), tQui=m0('Qui');
  const tRange=mot('01-face','range'), tFace=mot('01-face','face');
  const tDeux=mot('02-reste','deux'), tSeuls=mot('02-reste','seuls'), tSix=mot('02-reste','six'), tQuatre=mot('02-reste','quatre'), tPlus=mot('02-reste','plus');
  const tSigne=mot('03-signe','signe'), tCroco=mot('03-signe','crocodile'), tGrand=mot('03-signe','grand'), tSixB=mot('03-signe','Six');
  const tPers=mot('03b-egal','personne'), tAutant=mot('03b-egal','autant'), tEcrit=mot('03b-egal','écrit');
  const mq1=w=>mot('04-question',w), tHuit=mq1('Huit'), tCinq=mq1('cinq'), tLequel=mq1('Lequel');
  const mr1=w=>mot('04b-reponse',w), tB=mr1('B'), tPlusR1=mr1('plus'), tBocal=mr1('bocal');
  const mq2=w=>mot('04-question',w);
  const tSept=mot('05-question','Sept'), tNeuf=mot('05-question','neuf');
  const mr2=w=>mot('05b-reponse',w), tA2=mr2('A'), tNeufR=mr2('Neuf'), tOuvre=mr2("s'ouvre"), tPetit=mr2('petit');
  const tFaceA=mot('06-appris','face'), tRestes=mot('06-appris','restes'), tSigneA=mot('06-appris','signe');
  const finTitre=tSur-.08;

  /* les coquillages : 6 roses pour Ti Margo (rangée du haut), 4 orangés pour le chat (rangée du bas) */
  const ROSE='#ffc9c9', ORANGE='#ffd8a8', XC=k=>300+k*112, YH=470, YB=660;
  const TAS_M=[[360,470],[460,450],[560,478],[400,400],[505,380],[610,420]], TAS_C=[[640,660],[740,640],[690,590],[790,675]];
  function rangees(c,T,u,lueurReste=0){ /* u : 0 = en tas, 1 = rangés face à face */
    for(let k=0;k<6;k++){ const [x0,y0]=TAS_M[k], x=x0+(XC(k)-x0)*u, y=y0+(YH-y0)*u; coquillageE(c,x,y,50,ROSE,1,k>=4?lueurReste:0); }
    for(let k=0;k<4;k++){ const [x0,y0]=TAS_C[k], x=x0+(XC(k)-x0)*u, y=y0+(YB-y0)*u; coquillageE(c,x,y,50,ORANGE,1); } }
  function plage(c,T){ merE(c,T,190); sableE(c,270); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : face à face, les restes, le signe */
      plage(c,T); copainE(c,'margo',140,500,1); copainE(c,'chat',140,700,.95);
      rangees(c,T,1,T>=tRestes?.5+.5*Math.sin(T*5):0);
      for(let k=0;k<4;k++) lienE(c,[XC(k),YH+14],[XC(k),YB-92],entreE(T,tFaceA+k*.1,tFaceA+.3+k*.1));
      if(T>=tSigneA) compareE(c,6,4,640,110,110*zoom(T,tSigneA,.4),'g',.7+.3*Math.sin(T*4),CRAIE.ok,CRAIE.blanc);
      tab.maj(); return; }
    if(T>=q2){ /* 7 et 9 : vers qui s'ouvre la bouche ? */
      if(T>=tSept) ecrire(c,'7',80,360,190*zoom(T,tSept,.5),T>=r2&&T>=tPetit?CRAIE.r0:CRAIE.blanc);
      if(T>=tNeuf) ecrire(c,'9',450,360,190*zoom(T,tNeuf,.5),T>=r2&&T>=tNeufR?CRAIE.ok:CRAIE.blanc);
      if(T<r2||T<tOuvre){ c.strokeStyle=CRAIE.gris; c.lineWidth=5; c.setLineDash([12,9]); c.beginPath(); c.arc(265,360,62,0,7); c.stroke(); c.setLineDash([]); }
      else signeCrocoE(c,265,360,175*zoom(T,tOuvre,.4),'d',.65+.35*Math.sin(T*5));
      if(T>=r2&&T>=tNeufR) for(const [x,y] of [[420,200],[500,280],[340,250]]) etincelle(c,x,y,14+6*Math.sin(T*6+x));
      tab.maj(); return; }
    if(T>=q1){ /* les lucioles : 8 dans le bocal rouge, 5 dans le bleu */
      etoilesE(c,T,10,520,120);
      bocalE(c,130,650,170,330,'#e03131',T>=tHuit?8:0,T,1); bocalE(c,390,650,170,330,'#1c7ed6',T>=tCinq?5:0,T,1);
      if(T>=tHuit) ecrire(c,'8',130,230,110*zoom(T,tHuit,.5),'#ff8787');
      if(T>=tCinq) ecrire(c,'5',390,230,110*zoom(T,tCinq,.5),'#74c0fc');
      if(T>=r1&&T>=tPlusR1) signeCrocoE(c,260,230,95*zoom(T,tPlusR1,.4),'g',.65+.35*Math.sin(T*5));
      if(T>=r1&&T>=tBocal){ c.fillStyle=`rgba(255,236,153,${.18+.1*Math.sin(T*4)})`; c.beginPath(); c.ellipse(130,480,140,220,0,0,7); c.fill(); }
      tab.maj(); return; }
    if(T>=eg){ /* 4 = 4 : personne n'a de reste */
      plage(c,T);
      for(let k=0;k<4;k++){ coquillageE(c,XC(k)+90,YH,50,ROSE,zoom(T,eg+.2+k*.08,.4)); coquillageE(c,XC(k)+90,YB,50,ORANGE,zoom(T,eg+.3+k*.08,.4));
        lienE(c,[XC(k)+90,YH+14],[XC(k)+90,YB-92],entreE(T,tPers+k*.12,tPers+.35+k*.12)); }
      if(T>=tAutant) for(let k=0;k<4;k++) etincelle(c,XC(k)+90,YH-80,12+5*Math.sin(T*6+k));
      if(T>=tEcrit) compareE(c,4,4,528,100,120*zoom(T,tEcrit,.4),'=',1,CRAIE.blanc,CRAIE.blanc);
      tab.maj(); return; }
    if(T>=si){ /* 6 > 4 : le crocodile gourmand */
      const ouv=T>=tCroco&&T<tSixB+1.5?.55+.45*Math.abs(Math.sin((T-tCroco)*4)):.85;
      ecrire(c,'6',528-250,360,260,T>=tGrand?CRAIE.ok:CRAIE.blanc); ecrire(c,'4',528+250,360,260,CRAIE.blanc);
      if(T>=tSigne) signeCrocoE(c,528,360,230*zoom(T,tSigne,.4),'g',ouv);
      if(T>=tGrand) for(const [x,y] of [[250,170],[420,150],[300,560]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
      tab.maj(); return; }

    /* la plage : la mer chante, les deux amis, les coquillages en tas, puis face à face */
    if(T>=tPlage) plage(c,T);
    if(T>=tChante&&T<fa) for(let k=0;k<3;k++){ const u=((T-tChante)*.5+k/3)%1; ecrire(c,'♪',620+k*130,300-u*180,56,`rgba(255,255,255,${1-u})`); }
    if(T>=tChat){ copainE(c,'margo',140,500,zoom(T,tChat+.25,.4)); copainE(c,'chat',140,700,.95*zoom(T,tChat,.4)); }
    if(T>=tCoq){ const u=T>=fa?douxE(entreE(T,tRange,tRange+1)):0;
      if(u<=0){ TAS_M.forEach(([x,y],k)=>coquillageE(c,x,y,50,ROSE,zoom(T,tCoq+k*.08,.4))); TAS_C.forEach(([x,y],k)=>coquillageE(c,x,y,50,ORANGE,zoom(T,tCoq+.5+k*.08,.4))); }
      else rangees(c,T,u,T>=re&&T>=tDeux?.5+.5*Math.sin(T*5):0); }
    if(T>=fa&&T>=tFace) for(let k=0;k<4;k++) lienE(c,[XC(k),YH+14],[XC(k),YB-92],entreE(T,tFace+k*.12,tFace+.35+k*.12));
    if(T>=re&&T>=tSeuls) for(const k of [4,5]) cercle(c,XC(k),YH-32,74,CRAIE.jaune,entreE(T,tSeuls,tSeuls+.4));
    if(T>=re&&T>=tSix) ecrire(c,'6',1000,YH-40,110*zoom(T,tSix,.5),CRAIE.ok);
    if(T>=re&&T>=tQuatre) ecrire(c,'4',1000,YB-40,110*zoom(T,tQuatre,.5),CRAIE.blanc);
    if(T>=re&&T>=tPlus) etincelle(c,1000,YH-140,16+6*Math.sin(T*6));
    if(T>=tQui&&T<fa) ecrire(c,'?',900,560,130*zoom(T,tQui,.5),CRAIE.jaune);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Lequel'); const phrase1=[qa('Lequel brille le plus ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); const phrase2=[phraseE('7 et 9.',[tSept,mot('05-question','et'),tNeuf,tNeuf]),(qb.jusque('Vers'),qb('Vers qui le crocodile ouvre-t-il sa bouche ?'))];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=w=>mot('04-question',w)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const pt=coul=>`<span style="color:${coul};font-size:.8em">●</span> `;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:1,tBon:tB-r1,
      phrase:phrase1,pause:pause1,
      choix:[[pt('#1c7ed6')+'le bleu',tqa('A'),tqa('bleu')],[pt('#e03131')+'le rouge',tqa('B'),tqa('rouge')],['autant',tqa('C'),tqa('autant')]],
      tete:[[r1+.1,'Réponse '],[tB,'B !']],reponse:[phraseE("8, c'est plus que 5.",[mr1('Huit'),mr1("c'est"),tPlusR1,mr1('que'),mr1('cinq')])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['vers le 9',tqb('A'),tqb('neuf',2)],['vers le 7',tqb('B'),tqb('sept',2)],['pareils',tqb('C'),tqb('pareils')]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],
      reponse:[phraseE('9 est le plus grand.',[tNeufR,mr2('est'),mr2('le'),mr2('plus'),mr2('grand')]),phraseE('7 < 9',[mot('05b-reponse','sept'),tPetit,mot('05b-reponse','neuf',2)])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-reste'),'Qui en a<br>le plus ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>');
  return { clips,FIN,titre:'Qui en a le plus ?',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,si,eg,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros||T<fa) g.ouvre();
      else if(T<q1) (T>=tPlus&&T<si)||(T>=tGrand&&T<eg)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
