/* ============================================================
   Série Ti Margo, problèmes CP — PAYSAGE 06 : « Les livres de la bibliothèque » (micro cp_probleme_reponse), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-reponse-paysage.json.
   20 livres rouges et bleus ; le copain dit « 24 rouges » : impossible (une partie ne dépasse pas le tout) ; il recompte : 8 ; la phrase.
   Questions : 25 élèves, « 30 filles » → B (non, plus que toute la classe) ; Nina 6 crayons + 2 → C (« Nina a 8 crayons. »).
   ⭐ Pendant les questions et les réponses, les dessins restent à gauche (x < 480) ; la carte est à droite.
   ============================================================ */

const ROUGE_rep='#e03131', BLEU_rep='#1c7ed6';
/* Un livre debout : (x, yBas) = le milieu du bas */
function livreE_rep(c,x,yBas,w,h,coul,{z=1,lueur=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); c.save(); c.translate(x,yBas); c.scale(k,k);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.5*lueur})`; c.beginPath(); c.roundRect(-w/2-10,-h-10,w+20,h+20,12); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.45)'; c.lineWidth=3; c.beginPath(); c.roundRect(-w/2,-h,w,h,6); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.75)'; c.fillRect(-w/2+6,-h*.78,w-12,8); c.fillRect(-w/2+6,-h*.24,w-12,8);
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(-w/2+10,-h*.6,w-20,h*.25); c.restore(); }
/* La bibliothèque : 20 livres (2 rayons de 10) ; ROUGES = les 8 rouges */
const ROUGES_rep=[1,4,6,9,11,13,16,18];
const LIVRES_rep=Array.from({length:20},(_,i)=>[80+(i%10)*58+26, i<10?470:690, ROUGES_rep.includes(i)?ROUGE_rep:BLEU_rep]);
function bibliothequeE_rep(c,T,{t0=-1,lue=null,lueRouges=0,lueBleus=0}={}){
  c.fillStyle='#8a5a2b'; c.fillRect(56,300,18,410); c.fillRect(666,300,18,410); c.fillRect(56,290,628,16);
  LIVRES_rep.forEach(([x,y,coul],i)=>{ const z=t0<0?1:zoom(T,t0+i*.05,.4); const rouge=coul===ROUGE_rep;
    livreE_rep(c,x,y,52,150,coul,{z,lueur:(lue&&lue(i))||(rouge?lueRouges:lueBleus)}); });
  c.fillStyle='#b07a45'; c.fillRect(56,470,628,18); c.fillRect(56,690,628,18); }
/* Une petite tête d'élève (pour « 25 élèves ») ; fille = deux couettes */
function teteE_rep(c,x,y,r,k,{z=1,lueur=0}={}){ if(z<=0) return; r*=Math.min(1.15,z);
  const PEAU=['#8d5524','#f1c27d','#c68642','#e0ac69','#5c3a1e'][k%5], CHEV=['#212529','#7a4a2a','#343a40','#a0522d','#212529'][(k*3)%5], fille=k%3!==1;
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.45*lueur})`; c.beginPath(); c.arc(x,y,r*1.5,0,7); c.fill(); }
  c.fillStyle=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#cc5de8'][k%5]; c.beginPath(); c.ellipse(x,y+r*1.25,r*.95,r*.5,0,Math.PI,0); c.fill();
  c.fillStyle=PEAU; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.fillStyle=CHEV; c.beginPath(); c.arc(x,y-r*.18,r*1.02,Math.PI*1.02,Math.PI*1.98); c.fill();
  if(fille) for(const sx of [-1,1]){ c.beginPath(); c.arc(x+sx*r*1.05,y+r*.15,r*.36,0,7); c.fill(); }
  c.fillStyle='#212529'; for(const sx of [-1,1]){ c.beginPath(); c.arc(x+sx*r*.35,y+r*.05,r*.12,0,7); c.fill(); }
  c.strokeStyle='#c92a2a'; c.lineWidth=2.5; c.beginPath(); c.arc(x,y+r*.3,r*.3,.15*Math.PI,.85*Math.PI); c.stroke(); }
/* Une part du schéma qui peut DÉBORDER du tout : (x, y) = coin haut gauche ; L = la largeur du tout ; p = part / tout (peut dépasser 1) ;
   u fait grandir la part ; le morceau qui dépasse est rouge et rayé */
function partDebordeE_rep(c,x,y,L,h,p,txt,{u=1,coul='rgba(255,135,135,.35)',lueDeb=0,T=0}={}){ if(u<=0) return;
  const W=L*p*Math.min(1,u), W1=Math.min(W,L);
  c.fillStyle=coul; c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.beginPath(); c.roundRect(x,y,W1,h,8); c.fill(); c.stroke();
  if(W>L){ c.save(); c.beginPath(); c.roundRect(x+L,y,W-L,h,8); c.fillStyle=`rgba(255,135,135,${.55+.35*lueDeb*Math.abs(Math.sin(T*5))})`; c.fill(); c.clip();
    c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=5; for(let k=-h;k<W-L;k+=26){ c.beginPath(); c.moveTo(x+L+k,y+h); c.lineTo(x+L+k+h,y); c.stroke(); } c.restore();
    c.strokeStyle=CRAIE.faux; c.lineWidth=7; c.beginPath(); c.roundRect(x+L,y,W-L,h,8); c.stroke(); }
  if(u>=1&&txt) ecrire(c,txt,x+W/2,y+h/2+4,Math.round(h*.62),CRAIE.blanc); }

/* Une phrase écrite mot à mot (chaque mot à l'instant où il est dit), centrée en (x, y) */
function motAMotE_rep(c,T,mots,ts,x,y,taille,coul){ c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, ws=mots.map(m=>c.measureText(m).width);
  let xx=x-(ws.reduce((a,b)=>a+b,0)+esp*(mots.length-1))/2;
  mots.forEach((m,k)=>{ if(T>=ts[k]) ecrire(c,m,xx+ws[k]/2,y,taille*zoom(T,ts[k],.3),coul); xx+=ws[k]+esp; }); }

FILMS['reponse']=function(outils){
  const DUR={'00-accroche':10.695,'01-possible':8.745,'02-recompte':7.665,'03-phrase':5.34,'04-question':19.355,'04b-reponse':8.845,
    '05-question':20.77,'05b-reponse':8.665,'06-appris':7.46,'07-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-possible':1.2,'02-recompte':1,'03-phrase':1.2,
    '04-question':8.4,'04b-reponse':1.4,'05-question':8.4,'05b-reponse':1.4,'06-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,po,rc,ph,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['07-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:44px!important;line-height:1.08;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tSur=m0('Sur'), tVingt0=m0('vingt'), tRouges0=m0('rouges'), tBleus0=m0('bleus'), tCopain=m0('copain'), tCompte=m0('compté'), tDit0=m0('dit'), t24=m0('vingt-quatre');
  const mp=(w,n=1)=>mot('01-possible',w,n), tPoss=mp('possible'), tRougesP=mp('rouges'), tPartie=mp('partie'), tVingtP=mp('vingt'), tUneP=mp('Une',2), tPlusP=mp('plus'), tToutP=mp('tout');
  const mR=(w,n=1)=>mot('02-recompte',w,n), tRecompte=mR('recompte'), tHuitR=mR('huit'), tHuitR2=mR('Huit',2), tMoinsR=mR('moins'), tVingtR=mR('vingt'), tPossR=mR('possible');
  const mh=(w,n=1)=>mot('03-phrase',w,n), tPhrase=mh('phrase'), tIl=mh('il'), tY=mh('y'), tA=mh('a'), tHuitH=mh('huit'), tLivresH=mh('livres'), tRougesH=mh('rouges');
  const mq1=(w,n=1)=>mot('04-question',w,n), tClasseQ=mq1('classe'), t25Q=mq1('vingt-cinq'), tElevesQ=mq1('élèves'), tUneQ=mq1('Une'), t30Q=mq1('trente'), tFillesQ=mq1('filles'),
    tQA1=mq1('A',2), tQOui=mq1('oui'), tQB1=mq1('B'), tQClasse=mq1('classe',2), tQC1=mq1('C'), tQSavoir=mq1('savoir');
  const mr1=(w,n=1)=>mot('04b-reponse',w,n), tB1=mr1('B'), tFilles1=mr1('filles'), tPartie1=mr1('partie'), tClasse1=mr1('classe'), t30=mr1('Trente'), tCest1=mr1("c'est"), tPlus1=mr1('plus'), tQue1=mr1('que'), t25=mr1('vingt-cinq'), tImposs=mr1('impossible');
  const mq2=(w,n=1)=>mot('05-question',w,n), tNinaQ=mq2('Nina'), tSixQ=mq2('six'), tCrayonsQ=mq2('crayons'), tAchete=mq2('achète'), tDeuxQ=mq2('deux'), tCombienQ=mq2('Combien'),
    tQA2=mq2('A',2), tQB2=mq2('B'), tQC2=mq2('C'), tQCr2=mq2('crayons',2), tQCr3=mq2('crayons',3), tQCr4=mq2('crayons',4);
  const mr2=(w,n=1)=>mot('05b-reponse',w,n), tC2=mr2('C'), tSix2=mr2('Six'), tPlus2=mr2('plus'), tDeux2=mr2('deux'), tHuit2=mr2('huit'), tPhrase2=mr2('phrase'), tNina2=mr2('Nina'), tHuit2b=mr2('huit',2), tCrayons2=mr2('crayons');
  const mA=w=>mot('06-appris',w), tVerifie=mA('vérifie'), tPossA=mA('possible'), tEcris=mA("j'écris"), tPhraseA=mA('phrase'), tQuestionA=mA('question');
  const finTitre=tSur-.08;

  /* le copain qui a compté (à droite de la bibliothèque) */
  function copain(c,T,bras=0){ enfantE(c,890,712,1.6,{k:2,T,bras}); }
  /* les crayons de Nina : 6 dans la main, 2 achetés */
  const CR=[170,200,230,260,290,320], CR2=[385,415];
  function crayons(c,T,{t6=-1,t2=-1,lue6=0,lue2=0}={}){
    CR.forEach((x,k)=>{ if(t6>=0&&T<t6+k*.08) return; if(lue6){ c.fillStyle=`rgba(255,212,59,${.3*lue6})`; c.fillRect(x-18,395,36,250); }
      crayonE(c,x,640,240,COUL_CRAYON[k],24,t6>=0?zoom(T,t6+k*.08,.4):1); });
    CR2.forEach((x,k)=>{ if(t2>=0&&T<t2-.5) return; const u=t2>=0?entreE(T,t2-.5,t2+.2):1; const p=sautE([560,700],[x,640],u,120);
      if(lue2){ c.fillStyle=`rgba(255,212,59,${.3*lue2})`; c.fillRect(x-18,395,36,250); }
      crayonE(c,p[0],p[1],240,COUL_CRAYON[k+6],24); }); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* je vérifie que c'est possible ; une phrase qui répond */
      if(T>=tVerifie) ecrire(c,'Est-ce possible ?',528,200,90*zoom(T,tVerifie,.4),CRAIE.jaune);
      if(T>=tPossA) coche(c,850,330,.8);
      if(T>=tPhraseA) ecrire(c,'Une phrase qui répond',528,440,74*zoom(T,tPhraseA,.4),CRAIE.blanc);
      if(T>=tQuestionA) ecrire(c,'Il y a 8 livres rouges.',528,560,58*zoom(T,tQuestionA,.4),CRAIE.ok);
      tab.maj(); return; }

    if(T>=q2){ /* Nina : 6 crayons, elle en achète 2 */
      if(T>=tNinaQ) enfantE(c,70,715,1.3,{k:3,T,bras:T>=r2&&T>=tHuit2b?.8:0});
      const lue6=T<r2&&T>=tQA2&&T<tQCr2+.6?.8:(T<r2&&T>=tQC2&&T<tQCr4+.6?.8:0);
      const lue2=T<r2&&T>=tQB2&&T<tQCr3+.6?.8:(T<r2&&T>=tQC2&&T<tQCr4+.6?.8:0);
      const lueTous=T>=r2&&T>=tHuit2&&T<tHuit2+1.2?.8:(T>=r2&&T>=tHuit2b?.8:0);
      if(T>=tSixQ) crayons(c,T,{t6:tSixQ,t2:T>=tDeuxQ?tDeuxQ:1e9,lue6:lue6||lueTous,lue2:lue2||lueTous});
      if(T<r2){
        if(T>=tSixQ) rondNombreE(c,'6',245,330,50,{z:zoom(T,tSixQ,.5)});
        if(T>=tDeuxQ) rondNombreE(c,'+2',400,330,56,{z:zoom(T,tDeuxQ,.5),coul:CRAIE.ok});
        if(T>=tCombienQ){ const z=zoom(T,tCombienQ,.4); ecrire(c,'Combien',250,90,64*z,CRAIE.jaune); ecrire(c,'en a-t-elle ?',250,170,64*z,CRAIE.jaune); } }
      else {
        if(T>=tSix2) formuleE(c,T,250,100,['6','+','2','=','8'],[tSix2,tPlus2,tDeux2,tHuit2,tHuit2],84,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
        if(T>=tNina2) ecrire(c,'Nina a 8 crayons.',250,240,52*zoom(T,tNina2,.4),CRAIE.ok); }
      tab.maj(); return; }

    if(T>=q1){ /* la classe de 25 élèves ; une élève dit « 30 filles ! » */
      if(T<r1){
        const lueTous=T>=tQB1&&T<tQClasse+.6?.8:0;
        for(let i=0;i<25;i++){ const t=tClasseQ+i*.04; if(T<t) continue; teteE_rep(c,150+(i%5)*72,80+Math.floor(i/5)*70,31,i,{z:zoom(T,t,.4),lueur:lueTous}); }
        if(T>=t25Q) rondNombreE(c,'25',52,230,46,{z:zoom(T,t25Q,.5)});
        if(T>=tUneQ) enfantE(c,100,715,1.4,{k:1,T,bras:T>=tFillesQ?.3:0});
        if(T>=t30Q) bulleE(c,330,590,290,110,170,530,'30 filles !',56,zoom(T,t30Q,.5));
        if(T>=tQC1&&T<tQSavoir+.6) rondNombreE(c,'?',52,100,42,{coul:'#ff922b'}); }
      else { /* la barre : le tout 25 ; la part « 30 » déborde, puis se dégonfle */
        const L=360, X=40, Y=170, H=110;
        barreE(c,X,Y,L,H,{tout:T>=tClasse1-.1?'25':null,u:entreE(T,r1+.1,r1+.6),qLueur:0});
        if(T>=tClasse1&&T<tClasse1+1){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.roundRect(X-8,Y-8,L+16,H+16,12); c.stroke(); }
        const deg=entreE(T,tImposs+.4,tImposs+1.4);
        partDebordeE_rep(c,X,Y+H+18,L,H,1.2*(1-.75*deg),deg>0?'':(T>=t30?'30':''),{u:entreE(T,tFilles1,tFilles1+.8),lueDeb:T>=tPlus1?1:0,T});
        if(T>=tFilles1&&T<tImposs+.4) ecrire(c,'filles',X+L*.6,Y+2*H+70,44,CRAIE.gris);
        if(T>=tImposs){ ecrire(c,'impossible !',220,560,64*zoom(T,tImposs,.4),CRAIE.faux); croixE(c,220,420,140,entreE(T,tImposs,tImposs+.5)); } }
      tab.maj(); return; }

    if(T>=ph){ /* la phrase qui répond */
      bibliothequeE_rep(c,T,{lueRouges:T>=tHuitH&&T<tRougesH+1?.7:0});
      copain(c,T);
      if(T>=tIl) motAMotE_rep(c,T,['Il','y','a','8','livres','rouges.'],[tIl,tY,tA,tHuitH,tLivresH,tRougesH],528,165,76,CRAIE.jaune);
      if(T>=tPhrase&&T<tIl) ecrire(c,'une phrase…',528,150,70*zoom(T,tPhrase,.4),CRAIE.gris);
      tab.maj(); return; }

    if(T>=rc){ /* il recompte : 8 rouges ; 8 tient dans le tout */
      bibliothequeE_rep(c,T,{lue:i=>{ const j=ROUGES_rep.indexOf(i); return j>=0&&T>=tRecompte+j*.18?.8:0; }});
      copain(c,T,T<tHuitR+1?.3:0);
      barreE(c,100,40,600,100,{tout:'20'});
      if(T>=tHuitR) partDebordeE_rep(c,100,158,600,100,.4,'8',{u:entreE(T,tHuitR,tHuitR+.5),coul:'rgba(140,233,154,.35)'});
      if(T>=tPossR) coche(c,800,150,1);
      tab.maj(); return; }

    if(T>=po){ /* une partie ne peut pas être plus grande que le tout */
      const X=120, Y=170, L=600, H=120;
      barreE(c,X,Y,L,H,{tout:'20',u:entreE(T,po+.1,po+.6)});
      if(T>=tToutP){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.roundRect(X-8,Y-8,L+16,H+16,12); c.stroke(); ecrire(c,'le tout',870,Y+H/2,54,CRAIE.jaune); }
      if(T>=tPartie) partDebordeE_rep(c,X,Y+H+18,L,H,1.2,'24',{u:entreE(T,tPartie,tPartie+.9),lueDeb:T>=tPlusP?1:0,T});
      if(T>=tPartie) ecrire(c,'une partie : les rouges',X+L/2,Y+2*H+80,52,CRAIE.gris);
      if(T>=tPlusP) ecrire(c,'trop grand !',X+L*1.1,Y+2*H+170,58*zoom(T,tPlusP,.4),CRAIE.faux);
      tab.maj(); return; }

    /* la bibliothèque : 20 livres ; le copain : « 24 rouges ! » */
    bibliothequeE_rep(c,T,{t0:tVingt0,lueRouges:T>=tRouges0&&T<tRouges0+.9?.8:0,lueBleus:T>=tBleus0&&T<tBleus0+.9?.8:0});
    if(T>=tVingt0) rondNombreE(c,'20',370,225,54,{z:zoom(T,tVingt0,.5)});
    if(T>=tCopain-.2) copain(c,T,T>=tCompte&&T<t24?.35:(T>=t24?.6:0));
    if(T>=t24) bulleE(c,860,170,380,110,880,340,'24 rouges !',58,zoom(T,t24,.5));
    tab.maj();
  }

  const qa=dit('04-question'), qb=dit('05-question');
  qa('Question !'); qa.jusque('Est-ce'); const phrase1=[qa('Est-ce possible ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  qb('Question !'); qb.jusque('Quelle'); const phrase2=[qb('Quelle phrase répond à la question ?')]; qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=(w,n=1)=>mot('04-question',w,n)-q1, tqb=(w,n=1)=>mot('05-question',w,n)-q2;
  const questions=[
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,rebours:8,bonne:1,tBon:tB1-r1,
      phrase:[phraseE('25 élèves. Elle dit : « 30 filles ».',[t25Q,tElevesQ,tUneQ,mq1('dit'),t30Q]),...phrase1],pause:pause1,
      choix:[['oui',tqa('A',2),tqa('oui')],["non, c'est plus que toute la classe",tqa('B'),tqa('classe',2)],['on ne peut pas savoir',tqa('C'),tqa('savoir')]],
      tete:[[r1+.1,'Réponse '],[tB1,'B !']],reponse:[phraseE("30, c'est plus que 25 : impossible !",[t30,tCest1,tPlus1,tQue1,t25,t25,tImposs,tImposs])],suite:[] },
    { qc:'05-question',rc:'05b-reponse',finR:fin('05b-reponse')+.8,cpt:fin('05-question')+.1,rebours:8,bonne:2,tBon:tC2-r2,
      phrase:[phraseE('6 crayons, + 2.',[tSixQ,tCrayonsQ,tDeuxQ,tDeuxQ]),...phrase2],pause:pause2,
      choix:[['Nina a 6 crayons.',tqb('A',2),tqb('crayons',2)],['Nina a acheté 2 crayons.',tqb('B'),tqb('crayons',3)],['Nina a 8 crayons.',tqb('C'),tqb('crayons',4)]],
      tete:[[r2+.1,'Réponse '],[tC2,'C !']],reponse:[phraseE('6 + 2 = 8',[tSix2,tPlus2,tDeux2,tHuit2,tHuit2])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,fin('01-possible')-.5,'Est-ce<br>possible ?');
  return { clips,FIN,titre:'Les livres de la bibliothèque',ceinture:0,finTitre,groupes,finClip:'07-abonne',
    cuts:[finTitre,po,rc,ph,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<po) g.montre();
      else if(T<rc) T>=tPlusP?g.oups():g.montre();
      else if(T<q1) T>=tPossR&&T<ph?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else g.ouvre();

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
