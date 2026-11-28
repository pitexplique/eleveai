/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 06 : « Les cerises de Lina » (micro cp_probleme_reponse), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-reponse-short.json.
   Lina avait 10 cerises, elle en mange 4 et dit « il m'en reste 14 ». Est-ce possible ? Bonne réponse C (non : plus qu'au début) ; 10 − 4 = 6.
   Commentaire : 3 poissons dans le bocal, on en ajoute 2, Tom trouve 1 : possible ? Ceinture blanche.
   ============================================================ */

/* Une soucoupe vue de face : (x, y) = le centre du bord */
function soucoupeE_rep(c,x,y,w){ c.fillStyle='#f8f9fa'; c.strokeStyle='#adb5bd'; c.lineWidth=4;
  c.beginPath(); c.ellipse(x,y,w/2,w*.14,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#e9ecef'; c.beginPath(); c.ellipse(x,y-2,w*.3,w*.07,0,0,7); c.fill(); }
/* Un noyau de cerise */
function noyauE_rep(c,x,y,r=13){ c.fillStyle='#f3d9b1'; c.strokeStyle='#b08850'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,r*.8,r,0,0,7); c.fill(); c.stroke(); }
/* Un bocal à poissons (aquarium rectangulaire) : coin haut-gauche (x, y), w × h ; eau, sable, une algue */
function aquariumE_rep(c,x,y,w,h,T){ c.fillStyle='rgba(116,192,252,.35)'; c.beginPath(); c.roundRect(x,y+24,w,h-24,18); c.fill();
  c.fillStyle='#ffe8a3'; c.beginPath(); c.roundRect(x+6,y+h-46,w-12,40,12); c.fill();
  c.strokeStyle='#2f9e44'; c.lineWidth=9; c.lineCap='round';
  for(const [dx,hh] of [[60,160],[95,120],[w-70,140]]){ c.beginPath(); c.moveTo(x+dx,y+h-30);
    c.quadraticCurveTo(x+dx+18*Math.sin(T*1.6+dx),y+h-30-hh/2,x+dx+6,y+h-30-hh); c.stroke(); }
  c.lineCap='butt'; c.strokeStyle='#d0ebff'; c.lineWidth=7; c.beginPath(); c.roundRect(x,y,w,h,20); c.stroke();
  c.fillStyle='rgba(255,255,255,.5)'; for(let k=0;k<5;k++){ const by=y+h-60-((T*50+k*70)%(h-90)); c.beginPath(); c.arc(x+w-110+12*Math.sin(T*2+k),by,7,0,7); c.fill(); } }
/* Une barre rouge qui raye (de a à b, u de 0 à 1) */
function rayerE_rep(c,a,b,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.faux; c.lineWidth=14; c.lineCap='round';
  c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u); c.stroke(); c.lineCap='butt'; }

FILMS['reponse']=function(outils){
  const DUR={'00-accroche':8.585,'01-question':14.87,'01b-reponse':8.22,'02-commentaire':12.575,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:44px!important;line-height:1.08;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tLina=m0('Lina'), tDix0=m0('dix'), tMange=m0('mange'), tQuatre0=m0('quatre'), tDit0=m0('dit'), tQuatorze=m0('quatorze');
  const mq=w=>mot('01-question',w), tQA=mq('A'), tQLina=mq('Lina'), tQB=mq('B'), tQSavoir=mq('savoir'), tQC=mq('C'), tQDebut=mq('début');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tMangeR=mr('mangé'), tMoinsQue=mr('moins'), tDixR=mr('dix'), tDix=mr('Dix',2), tMoins=mr('moins',2), tQuatre=mr('quatre'), tSix=mr('six'), tCerises=mr('cerises');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tTroisC=mc('trois'), tBocal=mc('bocal'), tAjoute=mc('ajoute'), tDeuxC=mc('deux'), tTom=mc('Tom'), tUnC=mc('un'), tPossC=mc('possible'), tDis=mc('Dis-le');
  const finTitre=tLina-.08;

  /* le bol de 10 cerises (pyramide 4 + 3 + 2 + 1) ; Lina mange les 4 du haut ; il en reste 6 */
  const BX=370, TABLE=600, BW=460, BH=TABLE-BW*.55;
  const CER=[[241,319],[327,319],[413,319],[499,319],[284,257],[370,257],[456,257],[327,195],[413,195],[370,133]];
  const MANGE=[9,8,7,6], RESTE=[0,1,2,3,4,5];
  const LX=880, LY=800, LS=2.2, BOUCHE=[LX,LY-172*LS];
  const SX=700, SY=585, NOY=[[650,572],[685,580],[720,571],[752,581]];

  function cuisine(c){ c.fillStyle='#ffe8cc'; c.fillRect(0,0,1056,TABLE); /* le mur */
    c.fillStyle='rgba(255,192,120,.35)'; for(let x=0;x<1056;x+=88) c.fillRect(x,0,44,TABLE);
  }
  function table(c){ c.fillStyle='#b07a45'; c.fillRect(0,TABLE,1056,30); c.fillStyle='#8a5a2b'; c.fillRect(0,TABLE+30,1056,90);
    c.fillStyle='rgba(255,255,255,.18)'; for(let x=20;x<1056;x+=120) c.fillRect(x,TABLE+40,60,8); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* trois poissons dans le bocal, on en ajoute deux, Tom dit « 1 » */
      aquariumE_rep(c,80,250,600,400,T);
      const POS=[[230,420],[420,360],[330,540],[530,470],[200,560]];
      POS.forEach(([x,y],k)=>{ const ajoute=k>=3, t=ajoute?tDeuxC+(k-3)*.4:tTroisC+k*.2; if(T<t-(ajoute?.9:0)) return;
        let px=x+Math.sin(T*1.3+k)*14, py=y+Math.sin(T*2+k*2)*6;
        if(ajoute){ const u=entreE(T,t-.9,t+.3); const p=sautE([1000,120],[x,y],u,-80); px=u<1?p[0]:px; py=u<1?p[1]:py; }
        poissonE(c,px,py,150,['#ffa94d','#ff8787','#fcc419','#74c0fc','#b197fc'][k],{T,k,dir:k%2?-1:1,z:ajoute?1:zoom(T,t,.4),ray:['#e8590c','#c92a2a','#e67700','#1864ab','#6741d9'][k]}); });
      if(T>=tTroisC) rondNombreE(c,'3',380,170,60,{z:zoom(T,tTroisC,.5)});
      if(T>=tDeuxC) rondNombreE(c,'+ 2',600,170,60,{z:zoom(T,tDeuxC,.5),coul:CRAIE.ok});
      if(T>=tTom-.3) enfantE(c,890,715,1.9,{k:0,T,bras:T>=tUnC&&T<tPossC?.35:0});
      if(T>=tUnC) bulleE(c,880,150,220,120,890,300,'1 !',80,zoom(T,tUnC,.5));
      if(T>=tPossC) rondNombreE(c,'?',745,330,58,{z:zoom(T,tPossC,.5),coul:'#ff922b'});
      tab.maj(); return; }

    cuisine(c);
    /* Lina, derrière la table ; elle rit à la fin */
    const rit=T>=r&&T>=tSix, saute=rit?Math.abs(Math.sin((T-tSix)*7))*18:0;
    enfantE(c,LX,LY-saute,LS,{k:1,T,bras:rit?.9:0});
    table(c);
    /* le bol et ses cerises ; 4 s'envolent vers la bouche de Lina */
    bolCraie(c,BX,BH,BW);
    const lueRestent=T>=r&&T>=tSix&&T<tCerises+.9?.8:0;
    CER.forEach(([x,y],k)=>{ if(T<tDix0-.1) return;
      const j=MANGE.indexOf(k), z=T>=q?1:zoom(T,tDix0+k*.05,.4);
      if(j>=0){ const t=tMange+j*.32; if(T>=t+.5) return;
        if(T>=t){ const p=sautE([x,y],BOUCHE,entreE(T,t,t+.5),110); ceriseCraie(c,p[0],p[1],40*(1-.4*entreE(T,t,t+.5))); return; } }
      if(RESTE.includes(k)&&lueRestent){ c.fillStyle=`rgba(255,212,59,${.4*lueRestent})`; c.beginPath(); c.arc(x,y,58,0,7); c.fill(); }
      ceriseCraie(c,x,y,40,z); });
    /* la soucoupe et les noyaux */
    if(T>=tMange-.2){ soucoupeE_rep(c,SX,SY+18,210); NOY.forEach(([x,y],j)=>{ if(T>=tMange+j*.32+.5) noyauE_rep(c,x,y,16); }); }
    /* les nombres : 10, 4, la bulle « 14 » */
    const bandeau=T>=r&&T>=tDix-.2;
    const lue10=(T>=tQC&&T<tQDebut+.6&&T<r)||(T>=r&&T>=tMoinsQue&&T<tDix);
    if(T>=tDix0&&!bandeau){ if(lue10){ c.fillStyle='rgba(255,212,59,.35)'; c.beginPath(); c.arc(100,300,90,0,7); c.fill(); }
      rondNombreE(c,'10',100,300,64,{z:zoom(T,tDix0,.5)}); }
    if(T>=tQuatre0&&!bandeau) rondNombreE(c,'4',SX,470,52,{z:zoom(T,tQuatre0,.5)});
    if(T>=tQuatorze){ const lueB=T>=tQA&&T<tQLina+.6&&T<r;
      if(lueB){ c.fillStyle='rgba(255,212,59,.35)'; c.beginPath(); c.ellipse(800,215,290,100,0,0,7); c.fill(); }
      bulleE(c,800,215,500,120,850,325,"Il m'en reste 14 !",54,zoom(T,tQuatorze,.5));
      if(T>=r) rayerE_rep(c,[580,262],[1020,168],entreE(T,tC,tC+.5)); }
    if(T>=tQB&&T<tQSavoir+.6&&T<r) rondNombreE(c,'?',SX,470,52,{coul:'#ff922b'});
    if(bandeau){ bandeauE(c,470,80,560,140,entreE(T,tDix-.2,tDix+.1));
      formuleE(c,T,470,80,['10','−','4','=','6'],[tDix,tMoins,tQuatre,tSix,tSix],100,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Est-ce possible ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('10 − 4 = 6',[tDix,tMoins,tQuatre,tSix,tSix]);

  poserMiniature(outils,q-.3,'Est-ce<br>possible ?',ardoiseMini([['10 cerises','#ffd43b'],['il en reste 14 ?']]));
  return { clips,FIN,titre:'Les cerises de Lina',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['oui, bravo Lina',tq('A'),tq('Lina')],['on ne peut pas savoir',tq('B'),tq('savoir')],["non, il ne peut pas en rester plus qu'au début",tq('C'),tq('début')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[rep1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=finTitre&&T<f) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<com){ T>=tSix?g.fier():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
