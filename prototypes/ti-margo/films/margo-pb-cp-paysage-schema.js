/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 02 : « Les bonnets dans la neige » (micro cp_probleme_schema), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-schema-paysage.json.
   12 enfants, 5 bonnets rouges, les autres bleus : la barre « 12 », les parts « 5 » et « ? » ; 12 − 5 = 7.
   Questions : 6 en luge, 3 en ski, combien en tout → A (6 + 3) ; 15 moufles, 10 sèches, où est le « ? » → A (sur une part).
   ⭐ Pendant les questions et les réponses, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */

const ROUGE_S='#e03131', BLEU_S='#1c7ed6';
/* Le bonnet à pompon posé sur la tête d'un enfantE (x, yBas, s : les mêmes que l'enfant) */
function bonnet_schema(c,x,yBas,s,coul){ c.save(); c.translate(x,yBas); c.scale(s,s);
  c.fillStyle=coul; c.beginPath(); c.arc(0,-188,36,Math.PI,0); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(-39,-194,78,15,6); c.fill();
  c.beginPath(); c.arc(0,-228,11,0,7); c.fill(); c.restore(); }
function enfantBonnet_schema(c,x,yBas,s,coul,{k=0,T=0,lueur=0,z=1}={}){ if(z<=0) return; const q=Math.min(1.12,z);
  enfantE(c,x,yBas,s*q,{k,T,lueur}); bonnet_schema(c,x,yBas,s*q,coul); }
/* Un enfant assis sur une luge (centre du bas x, yBas ; échelle s ; ≈ 130 px de haut, 120 de large à s = 1) */
function lugeur_schema(c,x,yBas,s,coul,{z=1,lueur=0,k=0}={}){ if(z<=0) return; const q=Math.min(1.12,z); c.save(); c.translate(x,yBas); c.scale(s*q,s*q);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(0,-60,75,78,0,0,7); c.fill(); }
  const TEE=['#ff922b','#51cf66','#cc5de8','#fcc419','#4dabf7','#ff6b6b'][k%6], PEAU=['#8d5524','#f1c27d','#c68642','#e0ac69'][k%4];
  c.strokeStyle='#5c3d0a'; c.lineWidth=6; c.lineCap='round'; c.beginPath(); c.moveTo(-55,0); c.lineTo(42,0); c.quadraticCurveTo(64,0,60,-20); c.stroke();
  c.beginPath(); c.moveTo(-35,0); c.lineTo(-35,-14); c.moveTo(25,0); c.lineTo(25,-14); c.stroke();
  c.fillStyle='#c08550'; c.beginPath(); c.roundRect(-55,-26,100,14,5); c.fill();
  c.fillStyle='#1c7ed6'; c.beginPath(); c.roundRect(-8,-44,58,18,8); c.fill();
  c.fillStyle=TEE; c.beginPath(); c.roundRect(-30,-92,40,62,12); c.fill();
  c.fillStyle=PEAU; c.beginPath(); c.arc(-10,-112,24,0,7); c.fill();
  c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(-10+sx*8,-112,3.5,0,7); c.fill(); }
  c.fillStyle=coul; c.beginPath(); c.arc(-10,-116,27,Math.PI,0); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(-39,-121,58,11,5); c.fill(); c.beginPath(); c.arc(-10,-146,8,0,7); c.fill();
  c.lineCap='butt'; c.restore(); }
/* Un enfant à skis (centre du bas x, yBas ; échelle s ; ≈ 140 px de haut à s = 1) */
function skieur_schema(c,x,yBas,s,coul,{z=1,lueur=0,k=0}={}){ if(z<=0) return; const q=Math.min(1.12,z); c.save(); c.translate(x,yBas); c.scale(s*q,s*q);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(0,-70,70,85,0,0,7); c.fill(); }
  const TEE=['#20c997','#f783ac','#fab005'][k%3], PEAU=['#e0ac69','#8d5524','#f1c27d'][k%3];
  c.strokeStyle='#e8590c'; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(-55,-2); c.lineTo(55,-2); c.quadraticCurveTo(68,-2,66,-14); c.stroke();
  c.strokeStyle='#868e96'; c.lineWidth=4; c.beginPath(); c.moveTo(-30,-70); c.lineTo(-44,-4); c.moveTo(30,-70); c.lineTo(44,-4); c.stroke();
  c.fillStyle='#1c7ed6'; c.fillRect(-14,-50,11,46); c.fillRect(3,-50,11,46);
  c.fillStyle=TEE; c.beginPath(); c.roundRect(-22,-104,44,58,12); c.fill();
  c.strokeStyle=PEAU; c.lineWidth=9; c.beginPath(); c.moveTo(-20,-92); c.lineTo(-30,-70); c.moveTo(20,-92); c.lineTo(30,-70); c.stroke();
  c.fillStyle=PEAU; c.beginPath(); c.arc(0,-124,23,0,7); c.fill();
  c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*8,-124,3.5,0,7); c.fill(); }
  c.fillStyle=coul; c.beginPath(); c.arc(0,-128,26,Math.PI,0); c.closePath(); c.fill();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(-28,-133,56,11,5); c.fill(); c.beginPath(); c.arc(0,-157,8,0,7); c.fill();
  c.lineCap='butt'; c.restore(); }
/* Une moufle suspendue par une pince (x = milieu, yHaut = le fil ; échelle s ; ≈ 95 px de haut) ; mouillee : bleue, des gouttes */
function moufle_schema(c,x,yHaut,s,coul,{mouillee=0,T=0,k=0,z=1,lueur=0}={}){ if(z<=0) return; const q=Math.min(1.12,z); c.save(); c.translate(x,yHaut); c.scale(s*q,s*q);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,52,46,58,0,0,7); c.fill(); }
  c.fillStyle='#c08550'; c.fillRect(-5,-10,10,26);
  c.fillStyle='#f8f9fa'; c.beginPath(); c.roundRect(-22,12,44,16,5); c.fill();
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=3;
  c.beginPath(); c.ellipse(-24,52,10,20,-.5,0,7); c.fill(); c.stroke();
  c.beginPath(); c.roundRect(-20,26,40,62,[4,4,20,20]); c.fill(); c.stroke();
  if(mouillee){ c.fillStyle='rgba(165,216,255,.95)';
    for(let d=0;d<2;d++){ const u=((T*.9+k*.37+d*.5)%1); c.globalAlpha=1-u; c.beginPath(); c.arc(-8+d*16,92+u*50,5,0,7); c.fill(); }
    c.globalAlpha=1; }
  c.restore(); }
/* Une part sous la barre (comme barreE) : x0, largeur L, haut y, hauteur h */
function part_schema(c,x0,L,y,h,txt,coul,{taille=60,qLueur=0}={}){ c.fillStyle=coul; c.strokeStyle=CRAIE.blanc; c.lineWidth=6;
  c.beginPath(); c.roundRect(x0,y,L,h,8); c.fill(); c.stroke();
  if(txt!=null){ const qq=txt==='?'; if(qq&&qLueur>0){ c.fillStyle=`rgba(255,212,59,${.35*qLueur})`; c.beginPath(); c.arc(x0+L/2,y+h/2,h*.6,0,7); c.fill(); }
    ecrire(c,txt,x0+L/2,y+h/2+taille*.05,taille,qq?CRAIE.jaune:CRAIE.blanc); } }

FILMS['schema']=function(outils){
  const DUR={'00-accroche':12.85,'01-barre':6.895,'02-parts':8.69,'03-calcul':8.615,'04-question':22.82,'04b-reponse':8.085,
    '05-question':20.75,'05b-reponse':10.17,'06-appris':8.62,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-barre':1,'02-parts':1,'03-calcul':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ba,pa,ca,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:50px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n), tIl=m0('Il'), tDouze0=m0('Douze'), tCinq0=m0('Cinq'), tRouge0=m0('rouge'), tAutres0=m0('autres'), tBleu0=m0('bleu'), tCombien0=m0('Combien');
  const mb=(w,n=1)=>mot('01-barre',w,n), tFais=mb('fais'), tBarre=mb('barre'), tDouzeB=mb('douze');
  const mp=(w,n=1)=>mot('02-parts',w,n), tPartR=mp('part'), tCinqP=mp('cinq'), tPartB=mp('part',2), tSais=mp('sais'), tPointP=mp('point');
  const mc=(w,n=1)=>mot('03-calcul',w,n), tPartC=mc('part'), tEnleve=mc("j'enlève"), tDouzeC=mc('Douze'), tMoinsC=mc('moins'), tCinqC=mc('cinq'), tSeptC=mc('sept'), tSept2C=mc('Sept',2);
  const mq1=(w,n=1)=>mot('04-question',w,n), tSixQ=mq1('Six'), tLuge=mq1('luge'), tTroisQ=mq1('Trois'), tSki=mq1('ski'), tCombienQ=mq1('Combien'), tHaut=mq1('haut');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tA1=mr1('A'), tReunit=mr1('réunit'), tSix1=mr1('Six'), tPlus1=mr1('plus'), tTrois1=mr1('trois'), tNeuf1=mr1('neuf');
  const mq2=(w,n=1)=>mot('05-question',w,n), tQuinzeQ=mq2('Quinze'), tDixQ=mq2('Dix'), tMouilleesQ=mq2('mouillées'), tOu=mq2('Où');
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tA2=mr2('A'), tToutR=mr2('tout'), tPart2=mr2('part'), tQuinze2=mr2('Quinze',2), tMoins2=mr2('moins'), tDix2=mr2('dix'), tCinq2=mr2('cinq');
  const mA=(w,n=1)=>mot('06-appris',w,n), tBarreA=mA('barre'), tToutA=mA('tout'), tPartsA=mA('parts'), tPointA=mA('point'), tAjouteA=mA("j'ajoute"), tEnleveA=mA("j'enlève");
  const finTitre=tIl-.08;

  /* les 12 enfants : 5 bonnets rouges (mêlés), 7 bleus */
  const ROUGES=[0,3,5,8,10], coulK=k=>ROUGES.includes(k)?ROUGE_S:BLEU_S;
  function montagne(c,T){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,720);
    for(const [x,w,h] of [[180,420,250],[560,520,300],[920,400,230]]){ c.fillStyle='#868e96'; c.beginPath(); c.moveTo(x-w/2,330); c.lineTo(x,330-h); c.lineTo(x+w/2,330); c.closePath(); c.fill();
      c.fillStyle='#f8f9fa'; c.beginPath(); c.moveTo(x-w*.16,330-h*.68); c.lineTo(x,330-h); c.lineTo(x+w*.16,330-h*.68); c.closePath(); c.fill(); }
    c.fillStyle='#f1f3f5'; c.fillRect(0,320,1056,400); sapinE(c,60,380,.9); sapinE(c,1000,370,.8); }
  function enfants12(c,T){ /* deux rangs de six */
    for(let k=0;k<12;k++){ const back=k<6, i=k%6, x=back?140+i*155:215+i*155, y=back?470:695, s=back?.95:1.05, t=tDouze0+k*.06; if(T<t) continue;
      const lu=(T>=tRouge0-.3&&T<tAutres0&&ROUGES.includes(k))||(T>=tBleu0-.3&&T<tCombien0+1&&!ROUGES.includes(k))?.7:0;
      enfantBonnet_schema(c,x,y,s,coulK(k),{k,T,lueur:lu,z:zoom(T,t,.4)}); } }
  function rangee(c,T,{lueR=0,lueB=0}={}){ for(let k=0;k<12;k++){ const x=88+k*80, rouge=ROUGES.includes(k);
      enfantBonnet_schema(c,x,712,.84,coulK(k),{k,T,lueur:rouge?lueR:lueB}); } }

  /* la barre des enfants : x 128, w 800 ; tout 175 → 295, parts 313 → 433 */
  const BX=128, BW=800, BYB=175, BH=120;
  function barre12(c,T,{tout='12',u=1,rouge=null,bleu=null,qLueur=0}={}){
    barreE(c,BX,BYB,BW,BH,{tout:u>=1?tout:null,parts:[],u,taille:80});
    const y2=BYB+BH+18, L5=BW*5/12;
    if(rouge) part_schema(c,BX,L5,y2,BH,rouge.txt,'rgba(224,49,49,.55)',{taille:80});
    if(bleu) part_schema(c,BX+L5,BW-L5,y2,BH,bleu.txt,'rgba(28,126,214,.5)',{taille:80,qLueur}); }

  /* question 1 : 6 en luge, 3 en ski */
  const LUGES=[[75,240],[185,240],[295,240],[75,385],[185,385],[295,385]], SKIS=[[420,175],[420,295],[420,415]];
  /* les petites barres des questions : x 30, w 440 ; tout 465 → 555, parts 573 → 663 */
  const QX=30, QW=440, QY=465, QH=90;
  function petiteBarre(c,{tout,a,b,pa,pb,qLueurT=0,qLueurP=0,lueP=0}){
    barreE(c,QX,QY,QW,QH,{tout,parts:[],taille:64,qLueur:qLueurT});
    const y2=QY+QH+18, La=QW*pa/(pa+pb);
    if(lueP>0){ c.fillStyle=`rgba(255,212,59,${.3*lueP})`; c.beginPath(); c.roundRect(QX-12,y2-12,QW+24,QH+24,14); c.fill(); }
    if(a!==undefined) part_schema(c,QX,La,y2,QH,a,'rgba(255,255,255,.12)',{taille:64});
    if(b!==undefined) part_schema(c,QX+La,QW-La,y2,QH,b,'rgba(255,255,255,.12)',{taille:64,qLueur:qLueurP}); }
  function sport(c,T){
    c.fillStyle='rgba(241,243,245,.18)'; c.beginPath(); c.moveTo(0,430); c.lineTo(480,430); c.lineTo(480,445); c.lineTo(0,445); c.fill();
    const lueTout=T>=r1&&T>=tReunit&&T<tSix1+.4?.7:0;
    LUGES.forEach(([x,y],k)=>{ const t=tSixQ+k*.08; if(T>=t) lugeur_schema(c,x,y,1,k%2?BLEU_S:ROUGE_S,{z:T>=r1?1:zoom(T,t,.4),k,lueur:lueTout}); });
    SKIS.forEach(([x,y],k)=>{ const t=tTroisQ+k*.1; if(T>=t) skieur_schema(c,x,y,.85,k%2?ROUGE_S:BLEU_S,{z:T>=r1?1:zoom(T,t,.4),k,lueur:lueTout}); });
    const neuf=T>=r1&&T>=tNeuf1;
    if(T>=tSixQ) petiteBarre(c,{tout:T>=tCombienQ?(neuf?'9':'?'):null,a:'6',b:T>=tTroisQ?'3':undefined,pa:6,pb:3,
      qLueurT:(T>=tHaut-.3&&T<r1)?.6+.4*Math.sin(T*4):0,lueP:lueTout});
    if(T>=r1&&T>=tSix1) formuleE(c,T,185,50,['6','+','3','=','9'],[tSix1,tPlus1,tTrois1,tNeuf1,tNeuf1],64,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
  }

  /* question 2 : 15 moufles sur trois fils, 10 sèches, 5 mouillées */
  const COUL_M=['#e03131','#f59f00','#2f9e44','#be4bdb','#e64980'];
  const FILS=[135,245,355];
  function moufles(c,T){
    c.strokeStyle='#dee2e6'; c.lineWidth=4; FILS.forEach(y=>{ c.beginPath(); c.moveTo(12,y); c.quadraticCurveTo(240,y+14,470,y); c.stroke(); });
    const lueM=T>=r2&&T>=tPart2&&T<tCinq2+1?.7:0;
    for(let k=0;k<15;k++){ const ligne=Math.floor(k/5), i=k%5, x=62+i*90, y=FILS[ligne]+4*Math.sin(Math.PI*(x-12)/458), t=tQuinzeQ+k*.05; if(T<t) continue;
      const mouillee=k>=10; moufle_schema(c,x,y,1,mouillee?'#4dabf7':COUL_M[(k+ligne)%5],{mouillee,T,k,z:T>=r2?1:zoom(T,t,.4),lueur:mouillee?lueM:(T>=tDixQ&&T<tDixQ+1?.5:0)}); }
    if(T>=tQuinzeQ){ const cinq=T>=r2&&T>=tCinq2, q=T>=r2&&T>=tPart2;
      petiteBarre(c,{tout:'15',a:T>=tDixQ?'10':null,b:cinq?'5':(q?'?':null),pa:10,pb:5,qLueurP:q&&!cinq?.6+.4*Math.sin(T*4):0}); }
    if(T>=r2&&T>=tQuinze2) formuleE(c,T,225,50,['15','−','10','=','5'],[tQuinze2,tMoins2,tDix2,tCinq2,tCinq2],60,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* le tout en haut, les parts dessous ; le « ? » dit si j'ajoute ou si j'enlève */
      if(T>=tBarreA){ const u=entreE(T,tBarreA,tBarreA+.6); barreE(c,370,190,620,110,{tout:u>=1?'12':null,parts:[],u,taille:76});
        if(T>=tPartsA){ part_schema(c,370,620*5/12,318,110,'5','rgba(224,49,49,.55)',{taille:76});
          part_schema(c,370+620*5/12,620*7/12,318,110,'?','rgba(28,126,214,.5)',{taille:76,qLueur:T>=tPointA?.6+.4*Math.sin(T*4):0}); } }
      if(T>=tToutA) ecrire(c,'le tout',170,245,56*zoom(T,tToutA,.4),CRAIE.jaune);
      if(T>=tPartsA) ecrire(c,'les parts',170,373,56*zoom(T,tPartsA,.4),CRAIE.jaune);
      if(T>=tAjouteA) ecrire(c,"j'ajoute",450,560,66*zoom(T,tAjouteA,.4),CRAIE.ok);
      if(T>=tAjouteA+.3) ecrire(c,'ou',640,560,56,CRAIE.blanc);
      if(T>=tEnleveA) ecrire(c,"j'enlève ?",840,560,66*zoom(T,tEnleveA,.4),CRAIE.faux);
      tab.maj(); return; }
    if(T>=q2){ moufles(c,T); tab.maj(); return; }
    if(T>=q1){ sport(c,T); tab.maj(); return; }

    if(T<ba){ /* la montagne, la neige, les douze enfants */
      montagne(c,T); enfants12(c,T); neigeE(c,T,1056,720,40);
      if(T>=tDouze0) rondNombreE(c,'12',528,60,58,{z:zoom(T,tDouze0,.5)});
      if(T>=tCinq0) rondNombreE(c,'5',90,60,52,{z:zoom(T,tCinq0,.5),coul:'#ff8787'});
      if(T>=tCombien0) rondNombreE(c,'?',966,60,52,{z:zoom(T,tCombien0,.5),coul:'#74c0fc'});
      tab.maj(); return; }

    /* le dessin : la barre des 12, puis les parts */
    neigeE(c,T,1056,720,18);
    const enCalc=T>=ca, sept=enCalc&&T>=tSeptC;
    rangee(c,T,{lueR:(T>=pa&&T>=tPartR&&T<tPartB)?.7:0,lueB:(T>=pa&&T>=tPartB&&T<ca)||(sept&&T<tSept2C+1.2)?.7:0});
    if(T<pa&&T<tBarre-.2&&T>=tFais) ecrire(c,'je fais un dessin',528,300,70*zoom(T,tFais,.4),CRAIE.jaune);
    if(T>=tBarre-.2||T>=pa) barre12(c,T,{u:T>=pa?1:entreE(T,tBarre-.2,tDouzeB),
      rouge:T>=pa&&T>=tPartR?{txt:T>=tCinqP?'5':null}:null,
      bleu:T>=pa&&T>=tPartB?{txt:sept?'7':(T>=tPointP?'?':null)}:null,
      qLueur:(T>=tPointP&&T<ca)||(enCalc&&T<tSeptC)?.6+.4*Math.sin(T*4):0});
    if(enCalc&&T>=tEnleve-.3&&T<tDouzeC) ecrire(c,"j'enlève",528,85,70*zoom(T,tEnleve-.3,.4),CRAIE.faux);
    if(enCalc&&T>=tDouzeC) formuleE(c,T,528,85,['12','−','5','=','7'],[tDouzeC,tMoinsC,tCinqC,tSeptC,tSeptC],90,[CRAIE.blanc,CRAIE.blanc,'#ff8787',CRAIE.blanc,CRAIE.ok]);
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien en tout ?')]; qa.jusque('Quel'); phrase1.push(qa('Quel calcul ?')); qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien sont encore mouillées ?')]; qb.jusque('Où').saute(3).jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  phrase2.push(phraseE('Où je mets le « ? » ?',[tOu,mq2('je'),mq2('mets'),mq2('point')]));
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:0,tBon:tA1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['6 + 3',tqa('A'),tqa('trois',2)],['6 − 3',tqa('B'),tqa('trois',3)],['6 + 6',tqa('C'),tqa('six',5)]],
      tete:[[r1+.1,'Réponse '],[tA1,'A !']],reponse:[phraseE('6 + 3 = 9',[tSix1,tPlus1,tTrois1,tNeuf1,tNeuf1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:0,tBon:tA2-r2,
      phrase:phrase2,pause:pause2,
      choix:[['sur une part',tqb('A'),tqb('part')],['sur le tout',tqb('B'),tqb('tout')],['nulle part',tqb('C'),tqb('part',2)]],
      tete:[[r2+.1,'Réponse '],[tA2,'A !']],reponse:[phraseE('15 − 10 = 5',[tQuinze2,tMoins2,tDix2,tCinq2,tCinq2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('02-parts')-.4,'Un dessin<br>pour comprendre');
  return { clips,FIN,titre:'Les bonnets dans la neige',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,ba,pa,ca,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tSept2C&&T<q1)?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
