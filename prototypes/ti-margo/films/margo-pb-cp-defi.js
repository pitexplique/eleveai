/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 07 : « Les billes de la récré » (micro cp_probleme_defi), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-defi-short.json.
   Ce matin, des billes ; à la récré, j'en gagne 3 ; maintenant 10. Combien ce matin ? Bonne réponse C (7) ; 10 − 3 = 7 ; A (13) = le piège du mot « gagne ».
   Commentaire : j'ai mangé 2 bonbons, il m'en reste 5 : combien au début ? Ceinture blanche.
   ============================================================ */

/* Le marronnier de la cour : (x, yBas) = le pied du tronc */
function marronnierE_defi(c,x,yBas,s=1){ c.fillStyle='#8a5a2b'; c.strokeStyle='#5c3a1e'; c.lineWidth=4;
  c.beginPath(); c.moveTo(x-24*s,yBas); c.lineTo(x-14*s,yBas-250*s); c.lineTo(x+14*s,yBas-250*s); c.lineTo(x+24*s,yBas); c.closePath(); c.fill(); c.stroke();
  for(const [dx,dy,r,coul] of [[-90,-290,95,'#2f9e44'],[80,-300,100,'#2f9e44'],[0,-360,115,'#37b24d'],[-40,-250,80,'#40c057'],[60,-240,80,'#40c057']]){
    c.fillStyle=coul; c.beginPath(); c.arc(x+dx*s,yBas+dy*s,r*s,0,7); c.fill(); }
  c.fillStyle='#a0522d'; for(const [dx,dy] of [[-70,-300],[50,-330],[10,-250],[90,-270]]){ c.beginPath(); c.arc(x+dx*s,yBas+dy*s,9*s,0,7); c.fill(); } }
/* La cour : le ciel, le mur de l'école, le sol */
function courE_defi(c,T){ c.fillStyle='#a5d8ff'; c.fillRect(0,0,1056,300); soleilMatinE(c,960,80,50,1);
  c.fillStyle='#ffd8a8'; c.fillRect(0,180,1056,160); c.fillStyle='#e8590c'; c.fillRect(0,170,1056,16);
  c.fillStyle='#d0ebff'; c.strokeStyle='#f8f9fa'; c.lineWidth=8; for(const x of [420,640,860]){ c.beginPath(); c.roundRect(x,210,150,100,8); c.fill(); c.stroke(); }
  c.fillStyle='#ced4da'; c.fillRect(0,340,1056,380); c.fillStyle='rgba(255,255,255,.35)'; for(let x=30;x<1056;x+=140) c.fillRect(x,500,70,6); }
/* Le petit trou des billes */
function trouE_defi(c,x,y){ c.fillStyle='#495057'; c.beginPath(); c.ellipse(x,y,95,30,0,0,7); c.fill(); c.fillStyle='#343a40'; c.beginPath(); c.ellipse(x,y+5,76,20,0,0,7); c.fill(); }
/* Un bonbon emballé (ou son papier vide, froissé) : (x, y) = le centre */
function bonbonE_defi(c,x,y,r,coul,{vide=0,z=1,lueur=0,a=0}={}){ if(z<=0) return; r*=Math.min(1.15,z); c.save(); c.translate(x,y); c.rotate(a);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,r*2.6,r*1.4,0,0,7); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=3;
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*r*.8,0); c.lineTo(sx*r*2.1,-r*.75); c.lineTo(sx*r*1.9,0); c.lineTo(sx*r*2.1,r*.75); c.closePath(); c.fill(); c.stroke(); }
  if(vide){ c.beginPath(); c.moveTo(-r*.9,-r*.3); c.lineTo(-r*.3,-r*.55); c.lineTo(r*.2,-r*.25); c.lineTo(r*.9,-r*.5); c.lineTo(r*.85,r*.35); c.lineTo(r*.2,r*.15); c.lineTo(-r*.4,r*.45); c.lineTo(-r*.9,r*.25); c.closePath(); c.fill(); c.stroke(); }
  else { c.beginPath(); c.ellipse(0,0,r,r*.8,0,0,7); c.fill(); c.stroke(); c.fillStyle='rgba(255,255,255,.6)'; c.beginPath(); c.ellipse(-r*.35,-r*.3,r*.28,r*.16,-.5,0,7); c.fill(); }
  c.restore(); }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':9.14,'01-question':12.15,'01b-reponse':9.965,'02-commentaire':11.11,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tCe=m0('Ce'), tMatin0=m0('matin'), tBilles0=m0('billes'), tRecre=m0('récré'), tGagne=m0('gagne'), tTrois0=m0('trois'), tMaint=m0('Maintenant'), tDix0=m0('dix');
  const mq=w=>mot('01-question',w), tQCombien=mq('Combien'), tQA=mq('A'), tQ13=mq('treize'), tQB=mq('B'), tQ3=mq('trois'), tQC=mq('C'), tQ7=mq('sept');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tMoinsR=mr('moins'), tEnleve=mr("J'enlève"), tGagnees=mr('gagnées'), tDix=mr('dix'), tMoins=mr('moins',2), tTrois=mr('trois'), tSept=mr('sept'), tA=mr('A'), tPiege=mr('piège'), tGagneR=mr('gagne');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tMangeC=mc('mangé'), tDeuxC=mc('deux'), tResteC=mc('reste'), tCinqC=mc('cinq'), tCombienC=mc('Combien'), tDebutC=mc('début'), tDis=mc('Dis-le');
  const finTitre=tCe-.08;

  /* le sac et ses billes : 10 en tas (4 + 3 + 2 + 1) ; les 3 du haut sont les billes gagnées */
  const SX=330, SY=705, SW=380, RB=40;
  const TAS=[[210,300],[290,300],[370,300],[450,300],[250,232],[330,232],[410,232],[290,164],[370,164],[330,96]];
  const GAGNEES=[9,8,7], MATIN=[0,1,2,3,4,5,6];
  const TROU=[760,640];
  const COUL=k=>COUL_BILLE[k%5];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* j'ai mangé 2 bonbons, il m'en reste 5 */
      const BC=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#cc5de8'];
      if(T>=tMangeC-.2){ c.save(); c.globalAlpha=.75; bonbonE_defi(c,150,560,56,'#f783ac',{vide:1,z:zoom(T,tMangeC-.2,.4),a:-.3}); bonbonE_defi(c,350,610,56,'#ffa94d',{vide:1,z:zoom(T,tMangeC,.4),a:.25}); c.restore(); }
      if(T>=tDeuxC) rondNombreE(c,'2',250,420,62,{z:zoom(T,tDeuxC,.5)});
      /* la main ouverte, 5 bonbons dedans */
      if(T>=tResteC-.3){ c.fillStyle='#e0ac69'; c.strokeStyle='#a0522d'; c.lineWidth=5; c.beginPath(); c.ellipse(750,530,280,120,0,0,Math.PI); c.closePath(); c.fill(); c.stroke();
        c.beginPath(); c.roundRect(1005,470,48,66,20); c.fill(); c.stroke();
        for(let k=0;k<5;k++){ const t=tCinqC+k*.12; if(T<t-.4) continue; bonbonE_defi(c,560+k*95,505-(k%2)*44,42,BC[k],{z:zoom(T,t-.4,.4),lueur:T>=tCinqC&&T<tCinqC+1?.6:0}); } }
      if(T>=tCinqC) rondNombreE(c,'5',750,300,62,{z:zoom(T,tCinqC,.5)});
      if(T>=tCombienC){ ecrire(c,'au début ?',330,140,84*zoom(T,tCombienC,.4),CRAIE.jaune); rondNombreE(c,'?',640,140,62,{z:zoom(T,tDebutC,.5),coul:'#ff922b'}); }
      tab.maj(); return; }

    courE_defi(c,T);
    marronnierE_defi(c,110,560,1);
    /* le trou et les 3 billes qui roulent, puis sautent dans le sac */
    trouE_defi(c,TROU[0],TROU[1]);
    const ouvert=T>=tDix0-.2;
    sacE(c,SX,SY,SW,'#c08550');
    const reponse=T>=r;
    if(!ouvert&&T>=tBilles0) rondNombreE(c,'?',SX,200,62,{z:zoom(T,tBilles0,.5),coul:'#ff922b'});
    if(!ouvert) GAGNEES.forEach((k,j)=>{ const t=tGagne-.4+j*.25; if(T<t) return;
      const u1=entreE(T,t,t+.7), x1=1100+(TROU[0]-1100)*douxE(u1), y1=TROU[1]-34;
      if(u1<1){ billeE(c,x1,y1,RB,COUL(k)); return; }
      const u2=entreE(T,tTrois0+j*.2,tTrois0+j*.2+.5); if(u2<=0){ billeE(c,TROU[0]-44+j*44,y1+4,RB,COUL(k)); return; }
      const p=sautE([TROU[0],y1],[SX,SY-400],u2,160); if(u2<1) billeE(c,p[0],p[1],RB,COUL(k)); });
    if(ouvert){ const lue7=reponse&&T>=tSept&&T<tA?.8:0;
      TAS.forEach(([x,y],k)=>{ const j=GAGNEES.indexOf(k); let px=x, py=y;
        if(reponse&&j>=0){ const t=tEnleve+j*.3, u=entreE(T,t,t+.6); if(u>=1) return; if(u>0){ const p=sautE([x,y],TROU,u,180); px=p[0]; py=p[1]; } }
        if(MATIN.includes(k)&&lue7){ c.fillStyle='rgba(255,212,59,.4)'; c.beginPath(); c.arc(x,y,RB*1.45,0,7); c.fill(); }
        billeE(c,px,py,RB,COUL(k),reponse?1:zoom(T,tDix0+k*.04,.4)); }); }
    /* les nombres */
    if(T>=tTrois0&&!(reponse&&T>=tDix-.2)) rondNombreE(c,'+3',TROU[0],520,60,{z:zoom(T,tTrois0,.5),coul:CRAIE.ok});
    if(ouvert&&!(reponse&&T>=tDix-.2)) rondNombreE(c,'10',SX+225,255,62,{z:zoom(T,tDix0,.5)});
    if(T>=q&&!reponse){ if(T>=tQCombien){ rondNombreE(c,'?',870,110,48,{z:zoom(T,tQCombien,.5),coul:'#ff922b'}); ecrire(c,'ce matin',870,195,58,'#1864ab'); } }
    if(reponse){
      if(T>=tDix-.2){ bandeauE(c,720,110,540,140,entreE(T,tDix-.2,tDix+.1)); formuleE(c,T,720,110,['10','−','3','=','7'],[tDix,tMoins,tTrois,tSept,tSept],100,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
      if(T>=tSept) rondNombreE(c,'7',SX+225,255,62,{z:zoom(T,tSept,.5),coul:CRAIE.ok});
      if(T>=tA){ rondNombreE(c,'13',840,350,58,{z:zoom(T,tA,.5),coul:CRAIE.faux}); if(T>=tPiege) croixE(c,840,350,120,entreE(T,tPiege,tPiege+.5)); } }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien de billes avais-je ce matin ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('10 − 3 = 7',[tDix,tMoins,tTrois,tSept,tSept]);

  poserMiniature(outils,q-.3,'Combien<br>ce matin ?',ardoiseMini([['+ 3 billes','#8ce99a'],['maintenant 10']]));
  return { clips,FIN,titre:'Les billes de la récré',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['13',tq('A'),tq('treize')],['3',tq('B'),tq('trois')],['7',tq('C'),tq('sept')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q) T>=tGagne?g.fier():g.montre();
      else if(T<r) g.reflechit();
      else if(T<com){ T>=tPiege?g.oups():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
