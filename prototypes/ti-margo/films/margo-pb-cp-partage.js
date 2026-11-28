/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 05 : « Les crêpes de mamie » (micro cp_probleme_partage), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-partage-short.json.
   Mamie a fait 10 crêpes, nous sommes 5 à table, autant chacun. Bonne réponse C (2) : 2, 4, 6, 8, 10 ; 2 + 2 + 2 + 2 + 2 = 10.
   Commentaire : 6 bonbons pour 3 enfants, autant chacun. Ceinture blanche.
   ============================================================ */

/* Une crêpe dorée vue de côté (centre x, y ; largeur w) */
function crepeE_partage(c,x,y,w=140,{z=1,lueur=0,a=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; c.save(); c.translate(x,y); c.rotate(a);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.ellipse(0,0,w*.65,w*.3,0,0,7); c.fill(); }
  c.fillStyle='#f2b155'; c.strokeStyle='#b8741a'; c.lineWidth=4; c.beginPath(); c.ellipse(0,0,w/2,w*.13,0,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(166,91,0,.45)'; for(const [u,v] of [[-.25,-.02],[.1,.03],[.3,-.03],[-.05,-.04]]){ c.beginPath(); c.ellipse(u*w,v*w,w*.05,w*.025,0,0,7); c.fill(); }
  c.restore(); }
/* Une assiette posée (centre x, y ; largeur w), les crêpes s'empilent dessus */
function assietteE_partage(c,x,y,w,{lueur=0}={}){ if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(x,y-30,w*.7,w*.45,0,0,7); c.fill(); }
  c.fillStyle='#f1f3f5'; c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.ellipse(x,y,w/2,w*.15,0,0,7); c.fill(); c.stroke();
  c.strokeStyle='#ced4da'; c.lineWidth=3; c.beginPath(); c.ellipse(x,y,w*.35,w*.09,0,0,7); c.stroke(); }
/* Mamie en entier (x = ses pieds, yBas) avec sa poêle ; saut (0 → 1) : la crêpe vole au-dessus de la poêle */
function mamieE_partage(c,x,yBas,s,T,{saut=0}={}){ c.save(); c.translate(x,yBas); c.scale(s,s);
  c.fillStyle='#343a40'; c.fillRect(-26,-30,20,30); c.fillRect(6,-30,20,30);
  c.fillStyle='#9c36b5'; c.beginPath(); c.moveTo(-50,-30); c.lineTo(50,-30); c.lineTo(34,-150); c.lineTo(-34,-150); c.closePath(); c.fill();
  c.fillStyle='#fff'; c.beginPath(); c.moveTo(-30,-40); c.lineTo(30,-40); c.lineTo(22,-130); c.lineTo(-22,-130); c.closePath(); c.fill();
  c.strokeStyle='#f3c9a0'; c.lineWidth=13; c.lineCap='round'; c.beginPath(); c.moveTo(-30,-140); c.lineTo(-52,-90); c.stroke();
  c.beginPath(); c.moveTo(30,-140); c.lineTo(70,-118); c.stroke(); c.lineCap='butt';
  /* la poêle */
  c.strokeStyle='#212529'; c.lineWidth=10; c.beginPath(); c.moveTo(70,-118); c.lineTo(112,-124); c.stroke();
  c.fillStyle='#343a40'; c.beginPath(); c.ellipse(150,-126,46,12,0,0,7); c.fill();
  c.restore();
  mamieE(c,x,yBas-178*s,s*1.15,0,T);
  const h=Math.sin(Math.PI*Math.min(1,saut))*150*s; crepeE_partage(c,x+150*s,yBas-(140*s)-h,80*s,{a:saut*Math.PI*2*(saut<1?1:0)}); }
/* Un bonbon emballé (centre x, y ; rayon r) */
function bonbonE_partage(c,x,y,r,coul,{z=1,lueur=0}={}){ if(z<=0) return; r*=Math.min(1.15,z);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.4*lueur})`; c.beginPath(); c.arc(x,y,r*1.9,0,7); c.fill(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=3;
  for(const s of [-1,1]){ c.beginPath(); c.moveTo(x+s*r*.8,y); c.lineTo(x+s*r*1.7,y-r*.7); c.lineTo(x+s*r*1.7,y+r*.7); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  c.strokeStyle='rgba(255,255,255,.7)'; c.lineWidth=5; c.beginPath(); c.arc(x,y,r*.6,-2.4,-1.2); c.stroke(); }

FILMS['partage']=function(outils){
  const DUR={'00-accroche':7.69,'01-question':11.81,'01b-reponse':9.195,'02-commentaire':9.77,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tMamie0=m0('Mamie'), tDix0=m0('dix'), tCinq0=m0('cinq'), tTable0=m0('table'), tAutant0=m0('Autant');
  const mq=w=>mot('01-question',w), tQCombien=mq('Combien');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tC=mr('C'), tDeux=mr('Deux'), tChacun=mr('chacun'), tD2=mr('Deux',2), tD4=mr('quatre'), tD6=mr('six'), tD8=mr('huit'), tD10=mr('dix'), tMerci=mr('Merci');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tSixC=mc('six'), tTroisC=mc('trois'), tAutantC=mc('autant'), tCombienC=mc('Combien'), tDis=mc('Dis-le');
  const finTitre=tMamie0-.08;

  const PX=[120,324,528,732,936], PY=640, PILE=[640,330];
  const COMPTE=[tD2,tD4,tD6,tD8,tD10];
  /* la crêpe n° i (0 → 9) part de la pile vers l'assiette i % 5, au tour 1 puis au tour 2 */
  const tVol=i=>r+.9+i*.17;

  function decor(c,T){ c.fillStyle='#5c3d2e'; c.fillRect(0,0,1056,720);
    c.fillStyle='rgba(255,255,255,.06)'; for(let y=0;y<520;y+=60) for(let x=(y/60)%2*60;x<1056;x+=120) c.fillRect(x,y,60,60);
    c.fillStyle='#c08550'; c.fillRect(0,PY+10,1056,80); c.fillStyle='#8a5a2b'; c.fillRect(0,PY+10,1056,12); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* 6 bonbons pour 3 enfants */
      const BC=['#ff6b6b','#4dabf7','#51cf66','#fcc419','#da77f2','#ff922b'];
      BC.forEach((col,i)=>{ const t=tSixC+i*.1; if(T>=t) bonbonE_partage(c,150+i*151,200,42,col,{z:zoom(T,t,.4)}); });
      [250,528,806].forEach((x,k)=>{ const t=tTroisC+k*.15; if(T>=t) enfantE(c,x,710,1.6,{k:k+1,T,bras:T>=tAutantC&&T<tCombienC?.3:0}); });
      if(T>=tSixC) ecrire(c,'6 bonbons',290,80,72*zoom(T,tSixC,.4),CRAIE.jaune);
      if(T>=tTroisC) ecrire(c,'3 enfants',780,80,72*zoom(T,tTroisC,.4),CRAIE.blanc);
      if(T>=tAutantC) ecrire(c,'autant chacun',450,300,60*zoom(T,tAutantC,.4),CRAIE.ok);
      if(T>=tCombienC) rondNombreE(c,'?',800,300,46,{z:zoom(T,tCombienC,.5),coul:'#ff922b'});
      tab.maj(); return; }

    decor(c,T);
    const rep=T>=r;
    /* mamie fait sauter une crêpe (l'accroche) */
    mamieE_partage(c,175,PY+10,1.8,T,{saut:entreE(T,tMamie0,tMamie0+1.2)});
    /* les assiettes */
    if(T>=tCinq0||rep) PX.forEach((x,i)=>{ const lu=rep&&T>=COMPTE[i]&&T<COMPTE[i]+1?.8:0;
      assietteE_partage(c,x,PY,192,{lueur:lu}); });
    /* la pile : 10 crêpes, qui s'envolent une à une vers les assiettes */
    const xP=680, yP=PY-150;
    if(T<tVol(0)+.2){ c.fillStyle='#e9ecef'; c.beginPath(); c.ellipse(xP,yP+14,120,24,0,0,7); c.fill(); }
    for(let i=9;i>=0;i--){ const tc=tDix0+(9-i)*.05; if(T<tc&&!rep) continue;
      const empile=[xP,yP-(9-i)*17];
      if(!rep||T<tVol(i)){ crepeE_partage(c,empile[0],empile[1],170,{z:rep?1:zoom(T,tc,.3)}); continue; }
      const dest=[PX[i%5],PY-14-Math.floor(i/5)*15], p=sautE(empile,dest,entreE(T,tVol(i),tVol(i)+.45),180);
      crepeE_partage(c,p[0],p[1],160,{a:T<tVol(i)+.45?(T-tVol(i))*9:0,lueur:T>=COMPTE[i%5]&&T<COMPTE[i%5]+1?.6:0}); }
    if(!rep){
      if(T>=tDix0) ecrire(c,'10 crêpes',800,110,74*zoom(T,tDix0,.4),CRAIE.jaune);
      if(T>=tCinq0) rondNombreE(c,'5',960,300,50,{z:zoom(T,tCinq0,.5)});
      if(T>=tCinq0) ecrire(c,'à table',960,380,46,CRAIE.blanc);
      if(T>=tAutant0) ecrire(c,'autant chacun',440,185,58*zoom(T,tAutant0,.4),CRAIE.ok);
      if(T>=q) rondNombreE(c,'?',420,300,50,{z:zoom(T,tQCombien,.5),coul:'#ff922b'}); }
    else {
      if(T>=tDeux) ecrire(c,'2 chacun',528,110,74*zoom(T,tDeux,.4),CRAIE.jaune);
      COMPTE.forEach((t,i)=>{ if(T>=t) rondNombreE(c,['2','4','6','8','10'][i],PX[i],684,34,{z:zoom(T,t,.5),coul:i===4?CRAIE.ok:CRAIE.jaune}); });
      if(T>=tD10) formuleE(c,T,690,250,['2','+','2','+','2','+','2','+','2','=','10'],Array(11).fill(tD10),66,[...Array(10).fill(CRAIE.blanc),CRAIE.ok]);
      if(T>=tMerci) ecrire(c,'♥',528+Math.sin(T*3)*6,370,70*zoom(T,tMerci,.4),'#e64980'); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien de crêpes pour chacun ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('2 crêpes chacun',[tDeux,mr('crêpes'),tChacun]);

  poserMiniature(outils,q-.3,'Autant<br>chacun ?',ardoiseMini([['10 crêpes','#ffd43b'],['5 à table']]));
  return { clips,FIN,titre:'Les crêpes de mamie',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['5 crêpes',tq('A'),tq('cinq')],['15 crêpes',tq('B'),tq('quinze')],['2 crêpes',tq('C'),tq('deux')]],
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
      else if(T<com){ T>=tMerci?g.fier():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
