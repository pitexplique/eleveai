/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 07 : « Les défis du cirque » (micro cp_probleme_defi), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-defi-paysage.json.
   Défi 1 : le clown donne 5 ballons, il en reste 6 : au début 6 + 5 = 11. Défi 2 : le jongleur a 12 balles, 3 de plus que la jongleuse : 12 − 3 = 9.
   Questions : l'acrobate perd 4 rubans, il en reste 8 → C (12) ; le tigre saute 7 cerceaux, 2 de moins que le lion → C (9).
   ⭐ Pendant les questions et les réponses, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */

/* Le chapiteau vu de l'intérieur : des pans rouges et blancs, les gradins, la piste ronde */
function chapiteauE_defi(c,T){ const X=528, Y=-160;
  for(let k=-9;k<=9;k++){ const a0=Math.PI/2+k*.13, a1=a0+.13; c.fillStyle=k%2?'#e03131':'#fff5f5';
    c.beginPath(); c.moveTo(X,Y); c.lineTo(X+Math.cos(a0)*1400,Y+Math.sin(a0)*1400); c.lineTo(X+Math.cos(a1)*1400,Y+Math.sin(a1)*1400); c.closePath(); c.fill(); }
  c.fillStyle='#5f3dc4'; c.fillRect(-120,430,1300,80);
  c.fillStyle='rgba(255,255,255,.25)'; for(let x=-100;x<1170;x+=46){ c.beginPath(); c.arc(x,470,12,0,7); c.fill(); }
  c.fillStyle='#e8590c'; c.beginPath(); c.ellipse(528,640,640,150,0,0,7); c.fill();
  c.fillStyle='#ffd8a8'; c.beginPath(); c.ellipse(528,646,600,128,0,0,7); c.fill();
  c.fillStyle='#ffd43b'; for(let k=0;k<8;k++){ const x=40+k*140, b=.5+.5*Math.sin(T*3+k); c.globalAlpha=.4+.6*b; c.beginPath(); c.arc(x,24,9,0,7); c.fill(); } c.globalAlpha=1; }
/* Le clown : un enfant avec un nez rouge, des cheveux en boule et un chapeau pointu */
function clownE_defi(c,x,yBas,s,{T=0,bras=0}={}){ enfantE(c,x,yBas,s,{k:3,T,bras});
  c.fillStyle='#ff922b'; for(const sx of [-1,1]){ c.beginPath(); c.arc(x+sx*36*s,yBas-188*s,17*s,0,7); c.fill(); c.beginPath(); c.arc(x+sx*30*s,yBas-168*s,13*s,0,7); c.fill(); }
  c.fillStyle='#fa5252'; c.beginPath(); c.arc(x,yBas-176*s,9*s,0,7); c.fill();
  chapeauFete(c,x,yBas-208*s,s*.9,'#4dabf7');
  c.fillStyle='#f8f9fa'; for(const dy of [-130,-100,-75]){ c.beginPath(); c.arc(x,yBas+dy*s,6*s,0,7); c.fill(); } }
/* La main levée (bras = .5) d'un enfantE : le point où il tient les ficelles */
const mainE_defi=(x,yBas,s,bras=.5)=>{ const a=bras*1.9; return [x+(30+46*Math.sin(.35+a))*s, yBas+(-140+62*Math.cos(.35+a))*s]; };
/* Un ballon tenu par une ficelle jusqu'à la main m */
function ballonTenuE_defi(c,x,y,r,coul,m,{z=1,lueur=0}={}){ if(z<=0) return; if(m){ c.strokeStyle='rgba(248,249,250,.9)'; c.lineWidth=3; c.beginPath(); c.moveTo(x,y+r*1.3); c.lineTo(m[0],m[1]); c.stroke(); }
  ballonAir(c,x,y,r,coul,z,lueur); }
/* Une boîte fermée (les balles cachées) ; ouvre lève le couvercle */
function boiteE_defi(c,x,yBas,w,h,{ouvre=0}={}){ c.fillStyle='#be4bdb'; c.strokeStyle='#5f3dc4'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,yBas-h,w,h,10); c.fill(); c.stroke();
  c.fillStyle='#ffd43b'; for(const dx of [-.3,0,.3]){ c.beginPath(); c.arc(x+dx*w,yBas-h/2,8,0,7); c.fill(); }
  c.save(); c.translate(x-w/2-6,yBas-h); c.rotate(-1.2*ouvre); c.fillStyle='#da77f2'; c.beginPath(); c.roundRect(0,-22,w+12,24,8); c.fill(); c.stroke(); c.restore(); }
/* Un cerceau sur son pied : (x, y) = le centre de l'anneau, h = sa hauteur */
function cerceauE_defi(c,x,y,h,{z=1,lueur=0,sol=470}={}){ if(z<=0) return; const k=Math.min(1.15,z);
  c.strokeStyle='#868e96'; c.lineWidth=6; c.beginPath(); c.moveTo(x,y+h/2*k); c.lineTo(x,sol); c.stroke();
  if(lueur>0){ c.strokeStyle=`rgba(255,212,59,${.6*lueur})`; c.lineWidth=22; c.beginPath(); c.ellipse(x,y,h*.21*k,h/2*k,0,0,7); c.stroke(); }
  c.strokeStyle='#ff922b'; c.lineWidth=10; c.beginPath(); c.ellipse(x,y,h*.21*k,h/2*k,0,0,7); c.stroke();
  c.strokeStyle='#ffd43b'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,h*.21*k,h/2*k,0,0,7); c.stroke(); }
/* Le tigre qui court / saute (vers la droite) : (x, y) = le centre du corps */
function tigreE_defi(c,x,y,s,{T=0,court=0}={}){ c.save(); c.translate(x,y); c.scale(s,s);
  const p=Math.sin(T*14)*court*16;
  c.strokeStyle='#e8590c'; c.lineWidth=14; c.lineCap='round';
  for(const [dx,ph] of [[-38,1],[38,-1]]){ c.beginPath(); c.moveTo(dx,20); c.lineTo(dx+p*ph,62); c.stroke(); }
  c.lineWidth=9; c.beginPath(); c.moveTo(-66,-6); c.quadraticCurveTo(-110,-30,-100,-64); c.stroke(); c.lineCap='butt';
  c.fillStyle='#ff922b'; c.strokeStyle='#212529'; c.lineWidth=3; c.beginPath(); c.ellipse(0,0,72,36,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#212529'; c.lineWidth=7; for(const dx of [-44,-20,4,28]){ c.beginPath(); c.moveTo(dx,-34); c.lineTo(dx+8,-8); c.stroke(); }
  c.fillStyle='#ff922b'; c.lineWidth=3; c.beginPath(); c.arc(78,-22,32,0,7); c.fill(); c.stroke();
  for(const dx of [62,92]){ c.beginPath(); c.arc(dx,-50,10,0,7); c.fill(); c.stroke(); }
  c.fillStyle='#fff'; c.beginPath(); c.ellipse(90,-12,16,11,0,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(74,-28,4.5,0,7); c.arc(94,-28,4.5,0,7); c.fill(); c.beginPath(); c.arc(100,-16,5,0,7); c.fill();
  c.restore(); }
/* Le lion assis (de face) : (x, yBas) = le bas */
function lionE_defi(c,x,yBas,s,{T=0,lueur=0}={}){ c.save(); c.translate(x,yBas); c.scale(s,s);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,-80,100,110,0,0,7); c.fill(); }
  c.fillStyle='#fcc419'; c.strokeStyle='#a0522d'; c.lineWidth=3; c.beginPath(); c.ellipse(0,-50,52,52,0,0,7); c.fill(); c.stroke();
  for(const sx of [-1,1]){ c.beginPath(); c.ellipse(sx*30,-6,20,12,0,0,7); c.fill(); c.stroke(); }
  c.fillStyle='#d9480f'; for(let k=0;k<12;k++){ const a=k/12*Math.PI*2+Math.sin(T*2)*.05; c.beginPath(); c.arc(Math.cos(a)*46,-130+Math.sin(a)*46,22,0,7); c.fill(); }
  c.fillStyle='#fcc419'; c.beginPath(); c.arc(0,-130,40,0,7); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(-14,-138,5,0,7); c.arc(14,-138,5,0,7); c.fill();
  c.fillStyle='#862e1c'; c.beginPath(); c.moveTo(-8,-122); c.lineTo(8,-122); c.lineTo(0,-112); c.closePath(); c.fill();
  c.strokeStyle='#862e1c'; c.lineWidth=3; c.beginPath(); c.arc(-7,-108,7,0,Math.PI*.9); c.arc(7,-108,7,Math.PI*.1,Math.PI); c.stroke();
  c.restore(); }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':14.18,'01-debut':7.745,'02-defi2':8.52,'03-piege':8.605,'04-question':18.325,'04b-reponse':7.1,
    '05-question':16.105,'05b-reponse':8.935,'06-appris':9.06,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-debut':1.2,'02-defi2':1,'03-piege':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,de,d2,pi,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tAu=m0('Au'), tCirque=m0('cirque'), tClown=m0('clown'), tDefis=m0('défis'), tDefi1=m0('Défi'), tUn0=m0('un'), tBallons0=m0('ballons'), tDonne=m0('donné'), tCinq0=m0('cinq'), tReste0=m0('reste'), tSix0=m0('six'), tCombien0=m0('Combien'), tDebut0=m0('début');
  const md=(w,n=1)=>mot('01-debut',w,n), tPlusD=md('plus'), tRemets=md('remets'), tSixD=md('Six'), tPlusD2=md('plus',2), tCinqD=md('cinq'), tOnzeD=md('onze');
  const m2=(w,n=1)=>mot('02-defi2',w,n), tDeux2=m2('deux'), tJongleur=m2('jongleur'), tDouze2=m2('douze'), tTrois2=m2('trois'), tPlus2=m2('plus'), tJongleuse=m2('jongleuse'), tCombien2=m2('Combien');
  const mp=(w,n=1)=>mot('03-piege',w,n), tPlusP=mp('plus'), tLui=mp('lui'), tPlusP2=mp('plus',2), tElleP=mp('Elle'), tMoinsP=mp('moins'), tDouzeP=mp('Douze'), tMoinsP2=mp('moins',2), tTroisP=mp('trois'), tNeufP=mp('neuf');
  const mq1=(w,n=1)=>mot('04-question',w,n), tAcro=mq1("L'acrobate"), tRubansQ=mq1('rubans'), tPerd=mq1('perd'), tQuatreQ=mq1('quatre'), tHuitQ=mq1('huit'), tCombienQ=mq1('Combien'), tDebutQ=mq1('début'),
    tQA1=mq1('A'), tQB1=mq1('B'), tQC1=mq1('C');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tC1=mr1('C'), tDebut1=mr1('début'), tPlus1=mr1('plus'), tHuit1=mr1('Huit'), tPlus1b=mr1('plus',2), tQuatre1=mr1('quatre'), tDouze1=mr1('douze');
  const mq2=(w,n=1)=>mot('05-question',w,n), tTigreQ=mq2('tigre'), tSauteQ=mq2('saute'), tSeptQ=mq2('sept'), tDeuxQ=mq2('deux'), tMoinsQ=mq2('moins'), tLionQ=mq2('lion'), tCombienQ2=mq2('Combien'), tLionQ2=mq2('lion',2);
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tTigre2=mr2('tigre'), tMoins2=mr2('moins'), tLion2=mr2('lion'), tPlus2r=mr2('plus'), tSept2=mr2('Sept'), tPlus2b=mr2('plus',2), tDeux2r=mr2('deux'), tNeuf2=mr2('neuf');
  const mA=w=>mot('06-appris',w), tDebutA=mA('début'), tRemetsA=mA('remets'), tPartiA=mA('parti'), tMotA=mA('mot'), tPlusA=mA('plus'), tHistoire=mA("l'histoire");
  const finTitre=tAu-.08;

  /* défi 1 : le clown et ses ballons ; 5 partent chez deux enfants, 6 restent */
  const CX=330, CY=650, CS=1.5, MC=mainE_defi(CX,CY,CS);
  const K1=[790,650,1.15], K2=[960,650,1.15], M1=mainE_defi(...K1), M2=mainE_defi(...K2);
  const RESTE6=[[380,160],[460,140],[540,170],[400,250],[480,235],[560,262]];
  const DONNES=[[620,120],[640,220],[300,110],[250,200],[700,170]];          /* au début, près du clown */
  const CHEZ=[[[830,250],M1],[[900,200],M1],[[880,310],M1],[[1010,230],M2],[[1080,270],M2]];
  const COUL6=['#ff6b6b','#fcc419','#4dabf7','#51cf66','#cc5de8','#ff922b'], COUL5=['#f783ac','#20c997','#748ffc','#ffa94d','#94d82d'];
  function defi1(c,T,{u=0,retour=0,lue5=0,lue6=0}={}){
    RESTE6.forEach(([x,y],k)=>ballonTenuE_defi(c,x,y,40,COUL6[k],MC,{lueur:lue6}));
    DONNES.forEach(([x,y],k)=>{ const v=Math.max(0,Math.min(1,u-k*.12)), w=Math.max(0,Math.min(1,retour-k*.12)), [[cx,cy],m]=CHEZ[k];
      const a=sautE([x,y],[cx,cy],v,60), b=sautE([cx,cy],[x,y],w,60), p=w>0?b:a;
      ballonTenuE_defi(c,p[0],p[1],40,COUL5[k],(v>0&&v<1)||(w>0&&w<1)?null:(w>=1||v<=0?MC:m),{lueur:lue5}); });
    clownE_defi(c,CX,CY,CS,{T,bras:.5}); }

  /* défi 2 : le jongleur et ses 12 balles ; la jongleuse et sa boîte */
  const JX=240, JY=700, JS=1.5, EX=790, BX=960;
  function jongleur(c,T,{lueur=0}={}){ enfantE(c,JX,JY,JS,{k:0,T,bras:1,lueur});
    for(let i=0;i<12;i++){ const a=i/12*Math.PI*2+T*.5; billeE(c,JX+Math.cos(a)*150,250+Math.sin(a)*105,24,COUL_BILLE[i%5]); } }
  function jongleuse(c,T,{lueur=0,ouvre=0,neuf=0}={}){ enfantE(c,EX,JY,JS,{k:1,T,lueur});
    if(neuf>0) for(let i=0;i<9;i++) billeE(c,BX-50+(i%3)*50,350+Math.floor(i/3)*58,24,COUL_BILLE[(i+2)%5],zoom(neuf,1+i*.06,.4));
    boiteE_defi(c,BX,690,170,120,{ouvre}); }
  function bandeTexte(c,txt,x,y,taille,u=1,{w=null,lumMot=null}={}){ c.font=`800 ${taille}px "Segoe UI"`; const L=w||c.measureText(txt).width+60;
    bandeauE(c,x,y,L,taille*1.6,u); if(u>=1) ecrire(c,txt,x,y+3,taille,CRAIE.blanc); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* le début : je remets ce qui est parti ; plus, moins : je lis l'histoire */
      if(T>=tDebutA) ecrire(c,'Au début ?',528,140,80*zoom(T,tDebutA,.4),CRAIE.jaune);
      if(T>=tRemetsA) ecrire(c,'je remets ce qui est parti',528,240,62*zoom(T,tRemetsA,.4),CRAIE.blanc);
      if(T>=tPlusA) ecrire(c,'« plus », « moins » ?',528,420,80*zoom(T,tPlusA,.4),CRAIE.jaune);
      if(T>=tHistoire) ecrire(c,"je lis l'histoire",528,520,62*zoom(T,tHistoire,.4),CRAIE.ok);
      tab.maj(); return; }

    chapiteauE_defi(c,T);
    c.fillStyle=`rgba(255,249,240,${T>=q1?.55:.3})`; c.fillRect(0,0,1056,720);
    if(T>=q2){ /* le tigre saute 7 cerceaux, 2 de moins que le lion */
      const N=T>=r2&&T>=tDeux2r-.2?9:7, HX=i=>48+i*50;
      for(let i=0;i<9;i++){ if(i<7&&T<tSauteQ-.4+i*.06) continue; if(i>=7&&N<9) continue;
        cerceauE_defi(c,HX(i),350,170,{z:i>=7?zoom(T,tDeux2r-.2+(i-7)*.25,.4):zoom(T,tSauteQ-.4+i*.06,.4),lueur:T>=r2&&T>=tNeuf2&&T<tNeuf2+2.4?.6:0}); }
      /* le tigre traverse les 7 cerceaux puis descend en bas à droite */
      if(T>=tTigreQ-.2){ const u=entreE(T,tSauteQ,tSauteQ+2.4), v=entreE(T,tSauteQ+2.4,tSauteQ+3);
        let x=-60+430*u, y=350-Math.abs(Math.sin(u*Math.PI*7))*10; if(v>0){ const p=sautE([370,350],[360,620],v,40); x=p[0]; y=p[1]; }
        tigreE_defi(c,x,y,1,{T,court:u>0&&u<1?1:0}); }
      /* le lion : attend en bas à gauche ; à la réponse, il traverse les 9 cerceaux */
      if(T>=tLionQ-.2){ let lx=110, ly=715, saute=0;
        if(T>=r2&&T>=tNeuf2){ const u=entreE(T,tNeuf2+.1,tNeuf2+.6), w=entreE(T,tNeuf2+.6,tNeuf2+2.6), v=entreE(T,tNeuf2+2.6,tNeuf2+3.2);
          if(v>0){ const p=sautE([480,350],[110,595],v,60); lx=p[0]; ly=v<1?p[1]:715; saute=v<1; } else if(w>0){ lx=10+470*w; ly=350; saute=1; } else if(u>0){ const p=sautE([110,595],[10,350],u,40); lx=p[0]; ly=p[1]; saute=1; } }
        if(saute) tigreE_lion_defi(c,lx,ly,T); else lionE_defi(c,lx,ly,1.15,{T,lueur:T>=r2&&T>=tLion2&&T<tPlus2r+.8?.8:0}); }
      if(T<r2){
        if(T>=tSeptQ) rondNombreE(c,'7',260,520,50,{z:zoom(T,tSeptQ,.5)});
        if(T>=tDeuxQ){ bandeauE(c,240,105,460,170,entreE(T,tDeuxQ-.2,tDeuxQ+.1)); ecrire(c,'2 de moins',240,70,56,CRAIE.blanc); ecrire(c,'que le lion',240,140,56,CRAIE.blanc);
          if(T>=tMoinsQ&&T<tMoinsQ+1) ecrire(c,'2 de moins',240,70,56,CRAIE.jaune); }
        if(T>=tCombienQ2) rondNombreE(c,'?',110,455,48,{z:zoom(T,tCombienQ2,.5),coul:'#ff922b'}); }
      else {
        if(T<tSept2-.2){ bandeauE(c,240,105,460,170); ecrire(c,'2 de moins',240,70,56,T>=tMoins2?CRAIE.jaune:CRAIE.blanc); ecrire(c,'que le lion',240,140,56,CRAIE.blanc);
          if(T>=tMoins2){ c.strokeStyle=CRAIE.jaune; c.lineWidth=5; c.beginPath(); c.moveTo(195,102); c.lineTo(375,102); c.stroke(); } }
        else { bandeauE(c,240,100,440,140,entreE(T,tSept2-.2,tSept2+.1)); formuleE(c,T,240,100,['7','+','2','=','9'],[tSept2,tPlus2b,tDeux2r,tNeuf2,tNeuf2],84,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
        if(T>=tPlus2r&&T<tSept2) bandeTexte(c,'le lion : plus',240,232,48);
        if(T>=tNeuf2) rondNombreE(c,'9',260,520,50,{z:zoom(T,tNeuf2,.5),coul:CRAIE.ok}); }
      tab.maj(); return; }

    if(T>=q1){ /* l'acrobate et ses rubans ; 4 s'envolent, il en reste 8 */
      const RX=[175,265,355,445], RY=[185,290,395];
      enfantE(c,15,715,1.45,{k:3,T,bras:1});
      const lue4=T<r1&&T>=tQA1&&T<tQA1+1.4?.8:0, lue8=T<r1&&T>=tQB1&&T<tQB1+1.4?.8:0;
      for(let i=0;i<12;i++){ const row=Math.floor(i/4), x=RX[i%4], y=RY[row], part=row===0, t0=tRubansQ+i*.05; if(T<t0) continue;
        let px=x, py=y;
        if(part){ const j=i, t=tPerd+j*.18, u=entreE(T,t,t+.9), back=T>=r1?entreE(T,tPlus1+j*.18,tPlus1+j*.18+.7):0;
          if(T<r1||back<=0){ if(u>=1) continue; if(u>0){ px=x+260*u; py=y-300*u; } }
          else { px=x+260*(1-back); py=y-300*(1-back); } }
        if((part&&lue4)||(!part&&lue8)){ c.fillStyle='rgba(255,212,59,.4)'; c.beginPath(); c.arc(x,y+10,52,0,7); c.fill(); }
        rubanE(c,px,py,['#e64980','#4dabf7','#fcc419','#51cf66','#cc5de8','#ff922b'][i%6],1.5); }
      if(T<r1){
        if(T>=tQuatreQ){ if(lue4){ c.fillStyle='rgba(255,212,59,.35)'; c.beginPath(); c.arc(345,80,76,0,7); c.fill(); } rondNombreE(c,'−4',345,80,60,{z:zoom(T,tQuatreQ,.5),coul:'#ff8787'}); }
        if(T>=tHuitQ){ if(lue8){ c.fillStyle='rgba(255,212,59,.35)'; c.beginPath(); c.arc(310,580,70,0,7); c.fill(); } rondNombreE(c,'8',310,560,52,{z:zoom(T,tHuitQ,.5)}); }
        if(T>=tCombienQ) rondNombreE(c,'?',190,80,52,{z:zoom(T,tDebutQ,.5),coul:'#ff922b'}); }
      else {
        if(T>=tHuit1){ bandeauE(c,250,90,430,130,entreE(T,tHuit1-.2,tHuit1+.1)); formuleE(c,T,250,90,['8','+','4','=','12'],[tHuit1,tPlus1b,tQuatre1,tDouze1,tDouze1],72,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
        if(T>=tDouze1) rondNombreE(c,'12',310,560,52,{z:zoom(T,tDouze1,.5),coul:CRAIE.ok}); }
      tab.maj(); return; }

    if(T>=d2){ /* défi 2 et le piège du mot « plus » */
      const piege=T>=pi;
      jongleur(c,T,{lueur:piege&&T>=tLui&&T<tElleP?.8:0});
      jongleuse(c,T,{lueur:piege&&T>=tElleP&&T<tDouzeP?.8:0,ouvre:piege?entreE(T,tNeufP-.3,tNeufP+.2):0,neuf:piege&&T>=tNeufP?1+(T-tNeufP):0});
      if(T>=tDouze2) rondNombreE(c,'12',460,500,50,{z:piege?1:zoom(T,tDouze2,.5)});
      if(!piege&&T>=tJongleuse) rondNombreE(c,'?',BX,560,44,{z:zoom(T,tJongleuse,.5),coul:'#ff922b'});
      if(!piege&&T<tTrois2) bandeTexte(c,'Défi 2',600,70,64,entreE(T,d2,d2+.3));
      if(T>=tTrois2){ bandeTexte(c,"3 de plus qu'elle",600,70,58,piege?1:entreE(T,tTrois2-.2,tTrois2+.1),{w:560});
        const lu=(!piege&&T>=tPlus2&&T<tPlus2+1)||(piege&&T>=tPlusP&&T<tElleP);
        if(lu){ c.font='800 58px "Segoe UI"'; const w0=c.measureText('3 de ').width, w1=c.measureText('plus').width, L=c.measureText("3 de plus qu'elle").width;
          const x0=600-L/2+w0; c.fillStyle='rgba(255,212,59,.35)'; c.beginPath(); c.roundRect(x0-8,40,w1+16,64,12); c.fill(); ecrire(c,'plus',x0+w1/2,73,58,CRAIE.jaune); } }
      if(piege&&T>=tMoinsP) bandeTexte(c,'elle : moins',880,300,48);
      if(piege&&T>=tDouzeP){ bandeauE(c,600,185,440,120,entreE(T,tDouzeP-.2,tDouzeP+.1)); formuleE(c,T,600,185,['12','−','3','=','9'],[tDouzeP,tMoinsP2,tTroisP,tNeufP,tNeufP],80,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
      if(piege&&T>=tNeufP) rondNombreE(c,'9',BX,560,48,{z:zoom(T,tNeufP,.5),coul:CRAIE.ok});
      tab.maj(); return; }

    /* défi 1 : le clown, ses ballons donnés, ceux qui restent ; au début ? 6 + 5 = 11 */
    const debut=T>=de;
    if(T>=tDonne-.2||debut){ enfantE(c,...K1.slice(0,2),K1[2],{k:0,T,bras:.5}); enfantE(c,...K2.slice(0,2),K2[2],{k:4,T,bras:.5}); }
    if(T>=tClown-.2) defi1(c,T,{u:entreE(T,tDonne,tDonne+1.3),retour:debut?entreE(T,tRemets,tRemets+1.4):0,
      lue5:(!debut&&T>=tCinq0&&T<tCinq0+1)||(debut&&T>=tCinqD&&T<tCinqD+1)?.7:0,lue6:(!debut&&T>=tSix0&&T<tSix0+1)||(debut&&T>=tSixD&&T<tSixD+1)?.7:0});
    if(!debut){
      if(T>=tDefi1) bandeTexte(c,'Défi 1',780,60,60,entreE(T,tDefi1-.2,tDefi1+.1));
      if(T>=tBallons0&&T<tDonne) rondNombreE(c,'?',CX,70,46,{z:zoom(T,tBallons0,.5),coul:'#ff922b'});
      if(T>=tCinq0) rondNombreE(c,'5',960,110,50,{z:zoom(T,tCinq0,.5)});
      if(T>=tSix0) rondNombreE(c,'6',CX-150,140,50,{z:zoom(T,tSix0,.5)});
      if(T>=tCombien0) rondNombreE(c,'?',CX,70,50,{z:zoom(T,tDebut0,.5),coul:'#ff922b'}); }
    else {
      if(T>=tSixD-.2){ bandeauE(c,760,70,520,130,entreE(T,tSixD-.2,tSixD+.1)); formuleE(c,T,760,70,['6','+','5','=','11'],[tSixD,tPlusD2,tCinqD,tOnzeD,tOnzeD],86,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
      if(T>=tOnzeD) rondNombreE(c,'11',CX-150,140,52,{z:zoom(T,tOnzeD,.5),coul:CRAIE.ok});
      else if(T<tRemets) rondNombreE(c,'?',CX,70,50,{coul:'#ff922b'}); }
    tab.maj();
  }
  /* le lion en plein saut (vu de côté, comme le tigre mais jaune, avec sa crinière) */
  function tigreE_lion_defi(c,x,y,T){ c.save(); c.translate(x,y); c.scale(1,1);
    c.strokeStyle='#e67700'; c.lineWidth=14; c.lineCap='round'; for(const dx of [-38,38]){ c.beginPath(); c.moveTo(dx,20); c.lineTo(dx+(dx<0?-22:22),50); c.stroke(); }
    c.lineWidth=9; c.beginPath(); c.moveTo(-66,-6); c.quadraticCurveTo(-110,-30,-100,-64); c.stroke(); c.lineCap='butt';
    c.fillStyle='#fcc419'; c.strokeStyle='#a0522d'; c.lineWidth=3; c.beginPath(); c.ellipse(0,0,72,36,0,0,7); c.fill(); c.stroke();
    c.fillStyle='#d9480f'; for(let k=0;k<10;k++){ const a=k/10*Math.PI*2; c.beginPath(); c.arc(78+Math.cos(a)*34,-22+Math.sin(a)*34,16,0,7); c.fill(); }
    c.fillStyle='#fcc419'; c.beginPath(); c.arc(78,-22,30,0,7); c.fill(); c.stroke();
    c.fillStyle='#212529'; c.beginPath(); c.arc(74,-28,4.5,0,7); c.arc(94,-28,4.5,0,7); c.fill(); c.beginPath(); c.arc(100,-16,5,0,7); c.fill();
    c.restore(); }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien en avait-elle au début ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Combien'); const phrase2=[qb('Combien de cerceaux saute le lion ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:2,tBon:tC1-r1,
      phrase:[phraseE('Elle perd 4 rubans. Il en reste 8.',[mq1('Elle'),tPerd,tQuatreQ,mq1('Il'),mq1('en',2),tHuitQ]),...phrase1],pause:pause1,
      choix:[['4',tqa('A'),tqa('quatre',2)],['8',tqa('B'),tqa('huit',2)],['12',tqa('C'),tqa('douze')]],
      tete:[[r1+.1,'Réponse '],[tC1,'C !']],reponse:[phraseE('8 + 4 = 12',[tHuit1,tPlus1b,tQuatre1,tDouze1,tDouze1])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:[phraseE('Le tigre : 7, 2 de moins que le lion.',[mq2('Le'),tTigreQ,tTigreQ,tSeptQ,tDeuxQ,mq2('de'),tMoinsQ,mq2('que'),mq2('le',2),tLionQ]),...phrase2],pause:pause2,
      choix:[['5',tqb('A'),tqb('cinq')],['7',tqb('B'),tqb('sept',2)],['9',tqb('C'),tqb('neuf')]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],reponse:[phraseE('7 + 2 = 9',[tSept2,tPlus2b,tDeux2r,tNeuf2,tNeuf2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-debut')-.5,'Défis<br>du cirque');
  return { clips,FIN,titre:'Les défis du cirque',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,de,d2,pi,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q1) (T>=tOnzeD&&T<d2)||(T>=tNeufP&&T<q1)?g.fier():(T>=tPlusP&&T<tElleP&&T>=pi?g.oups():g.montre());
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
