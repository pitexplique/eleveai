/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 04 : « Les pattes des chatons » (micro cp_probleme_multiplicatif), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-multiplicatif-short.json.
   Trois chatons dorment dans un panier, quatre pattes chacun. Combien de pattes ? Bonne réponse B (12) : 4, 8, 12 ; 3 fois 4 = 12.
   Commentaire : 4 mains, 5 doigts sur chaque main. Au CP on écrit « 3 fois 4 », jamais le signe. Ceinture blanche.
   ============================================================ */

/* Le grand panier vu de face : le fond (derrière les chatons) puis le devant (x = centre, yBord = le bord, yBas = le bas) */
function panierFondE_mult(c,x,yBord,w){ c.fillStyle='#8a5a2b'; c.beginPath(); c.ellipse(x,yBord,w/2,46,0,Math.PI,0); c.fill();
  c.fillStyle='#5c3d1e'; c.beginPath(); c.ellipse(x,yBord,w/2-14,34,0,Math.PI,0); c.fill(); }
function panierDevantE_mult(c,x,yBord,yBas,w){ c.fillStyle='#d9a066'; c.strokeStyle='#8a5a2b'; c.lineWidth=6;
  c.beginPath(); c.moveTo(x-w/2,yBord); c.lineTo(x+w/2,yBord); c.lineTo(x+w/2-40,yBas); c.lineTo(x-w/2+40,yBas); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='rgba(107,58,16,.5)'; c.lineWidth=3;
  for(let k=1;k<4;k++){ const y=yBord+k*(yBas-yBord)/4, d=40*k/4; c.beginPath(); c.moveTo(x-w/2+d,y); c.lineTo(x+w/2-d,y); c.stroke(); }
  for(let k=-6;k<=6;k++){ c.beginPath(); c.moveTo(x+k*w*.075,yBord); c.lineTo(x+k*w*.07,yBas); c.stroke(); }
  c.fillStyle='#b07a43'; c.strokeStyle='#8a5a2b'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2-12,yBord-14,w+24,28,14); c.fill(); c.stroke(); }

/* Un chaton dans le panier (x = centre, yBord = le bord du panier) ; etire (0 → 1) : il se lève et ouvre les yeux.
   pattes() dessine ses 4 pattes qui dépassent du bord (à appeler APRÈS le devant du panier, pour qu'on les compte). */
const CHATONS_mult=[{fond:'#f59f00',fonce:'#a65b00',rayes:1},{fond:'#adb5bd',fonce:'#495057',rayes:0},{fond:'#fff4e6',fonce:'#c9a27c',rayes:0}];
function chatonE_mult(c,x,yBord,k,{etire=0,T=0,z=1,lueur=0}={}){ if(z<=0) return; const C=CHATONS_mult[k%3], up=60*etire, by=yBord-42-up;
  c.save(); c.translate(x,yBord); c.scale(1.15*Math.min(1.12,z),1.15*Math.min(1.12,z)); c.translate(-x,-yBord);
  if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.35*lueur})`; c.beginPath(); c.ellipse(x,by-30,170,120,0,0,7); c.fill(); }
  const souffle=etire>0?0:Math.sin(T*2.2+k)*4;
  /* la queue */
  c.strokeStyle=C.fond; c.lineWidth=20; c.lineCap='round'; c.beginPath(); c.moveTo(x-90,by+10); c.quadraticCurveTo(x-150,by-30-40*etire,x-120,by-80-50*etire); c.stroke();
  c.strokeStyle=C.fonce; c.lineWidth=4; c.beginPath(); c.moveTo(x-90,by+10); c.quadraticCurveTo(x-150,by-30-40*etire,x-120,by-80-50*etire); c.stroke(); c.lineCap='butt';
  c.strokeStyle=C.fond; c.lineWidth=16; c.beginPath(); c.moveTo(x-90,by+10); c.quadraticCurveTo(x-150,by-30-40*etire,x-120,by-80-50*etire); c.stroke();
  /* le corps rond */
  c.fillStyle=C.fond; c.strokeStyle=C.fonce; c.lineWidth=5; c.beginPath(); c.ellipse(x,by+souffle*.3,118,62+souffle,0,0,7); c.fill(); c.stroke();
  if(C.rayes){ c.strokeStyle=C.fonce; c.lineWidth=8; for(const u of [-50,-15,20]){ c.beginPath(); c.moveTo(x+u,by-58); c.lineTo(x+u+10,by-28); c.stroke(); } }
  /* la tête */
  const hx=x+70, hy=by-62-10*etire;
  c.fillStyle=C.fond; c.strokeStyle=C.fonce; c.lineWidth=5;
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(hx+sx*20,hy-46); c.lineTo(hx+sx*44,hy-92); c.lineTo(hx+sx*56,hy-34); c.closePath(); c.fill(); c.stroke();
    c.fillStyle='#ffc9c9'; c.beginPath(); c.moveTo(hx+sx*28,hy-48); c.lineTo(hx+sx*43,hy-78); c.lineTo(hx+sx*49,hy-44); c.closePath(); c.fill(); c.fillStyle=C.fond; }
  c.beginPath(); c.arc(hx,hy,62,0,7); c.fill(); c.stroke();
  /* les yeux : fermés (deux arcs) qui s'ouvrent quand il s'étire */
  for(const sx of [-1,1]){ const ex=hx+sx*24, ey=hy-8;
    if(etire>.5){ c.fillStyle='#8ce99a'; c.beginPath(); c.ellipse(ex,ey,10,13,0,0,7); c.fill(); c.fillStyle='#212529'; c.beginPath(); c.ellipse(ex,ey,4,10,0,0,7); c.fill(); }
    else { c.strokeStyle='#212529'; c.lineWidth=5; c.lineCap='round'; c.beginPath(); c.arc(ex,ey-4,11,.3,Math.PI-.3); c.stroke(); c.lineCap='butt'; } }
  c.fillStyle='#ff8fa3'; c.beginPath(); c.moveTo(hx-9,hy+12); c.lineTo(hx+9,hy+12); c.lineTo(hx,hy+22); c.closePath(); c.fill();
  c.strokeStyle='#212529'; c.lineWidth=3; c.beginPath(); c.moveTo(hx,hy+22); c.quadraticCurveTo(hx-8,hy+32,hx-16,hy+26); c.moveTo(hx,hy+22); c.quadraticCurveTo(hx+8,hy+32,hx+16,hy+26); c.stroke();
  c.strokeStyle='rgba(255,255,255,.85)'; c.lineWidth=2.5; for(const sx of [-1,1]) for(const v of [-6,4]){ c.beginPath(); c.moveTo(hx+sx*30,hy+16+v*.4); c.lineTo(hx+sx*76,hy+10+v*1.6); c.stroke(); }
  c.restore(); }
/* Ses 4 pattes qui pendent par-dessus le bord ; lueur : elles brillent (on les compte) */
function pattesE_mult(c,x,yBord,k,{etire=0,z=1,lueur=0}={}){ if(z<=0) return; const C=CHATONS_mult[k%3], L=58+24*etire;
  c.save(); c.translate(x,yBord); c.scale(1.15*Math.min(1.12,z),1.15*Math.min(1.12,z));
  [-84,-30,30,84].forEach(dx=>{ if(lueur>0){ c.fillStyle=`rgba(255,212,59,${.5*lueur})`; c.beginPath(); c.ellipse(dx,L*.6,34,L*.6+16,0,0,7); c.fill(); }
    c.fillStyle=C.fond; c.strokeStyle=C.fonce; c.lineWidth=4; c.beginPath(); c.roundRect(dx-20,-24,40,L+24,20); c.fill(); c.stroke();
    c.fillStyle='#ffa8a8'; c.beginPath(); c.ellipse(dx,L-12,10,8,0,0,7); c.fill();
    for(const u of [-11,0,11]){ c.beginPath(); c.arc(dx+u,L-26,4.5,0,7); c.fill(); } });
  c.restore(); }

FILMS['multiplicatif']=function(outils){
  const DUR={'00-accroche':6.53,'01-question':10.375,'01b-reponse':8.51,'02-commentaire':9.15,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const tTrois0=m0('Trois'), tChatons0=m0('chatons'), tPanier0=m0('panier'), tQuatre0=m0('quatre'), tPattes0=m0('pattes');
  const mq=w=>mot('01-question',w), tQPattes=mq('pattes'), tQA=mq('A'), tQB=mq('B'), tQC=mq('C');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tQuatre=mr('Quatre'), tHuit=mr('huit'), tDouze=mr('douze'), tTrois=mr('Trois'), tFois=mr('fois'), tQuatre2=mr('quatre',2), tDouze2=mr('douze',2), tMiaou=mr('Miaou');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tQuatreC=mc('quatre'), tMains=mc('mains'), tCinqC=mc('cinq'), tCombienC=mc('Combien'), tDis=mc('Dis-le');
  const finTitre=tTrois0-.08;

  const PX=528, BORD=470, BAS=660, XS=[215,528,841];
  const DECOMPTE=[tQuatre,tHuit,tDouze];

  function decor(c,T){ /* la chambre, le soir : un mur bleu nuit, un tapis */
    c.fillStyle='#2b2d52'; c.fillRect(0,0,1056,720);
    c.fillStyle='rgba(255,236,153,.55)'; for(let k=0;k<12;k++){ const x=(k*173+40)%1056, y=30+(k*67)%150, b=.6+.4*Math.sin(T*2+k); c.globalAlpha=b; c.beginPath(); c.arc(x,y,3.5,0,7); c.fill(); } c.globalAlpha=1;
    c.fillStyle='#7b4b94'; c.beginPath(); c.ellipse(528,675,520,60,0,0,7); c.fill(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* quatre mains ouvertes, cinq doigts chacune */
      const MX=[150,405,660,915], MAN=['#4dabf7','#ff6b6b','#51cf66','#fcc419'];
      MX.forEach((x,k)=>{ const t=tQuatreC+k*.22; if(T<t) return; const z=zoom(T,t,.4);
        mainLeveeE(c,x,690,2.45*Math.min(1.1,z),5,MAN[k],{droite:k%2===0,lueur:T>=tCinqC&&T<tCombienC?.6:0}); });
      if(T>=tQuatreC) ecrire(c,'4 mains',290,90,74*zoom(T,tQuatreC,.4),CRAIE.jaune);
      if(T>=tCinqC) ecrire(c,'5 doigts sur chaque main',528,190,58*zoom(T,tCinqC,.4),CRAIE.blanc);
      if(T>=tCombienC) rondNombreE(c,'?',800,90,58,{z:zoom(T,tCombienC,.5),coul:'#ff922b'});
      tab.maj(); return; }

    decor(c,T);
    const enRep=T>=r;
    panierFondE_mult(c,PX,BORD,960);
    [2,1,0].forEach(k=>{ const x=XS[k], t=tChatons0+k*.2; if(T<t&&!enRep) return;
      const e=enRep?entreE(T,DECOMPTE[k]-.25,DECOMPTE[k]+.35):0;
      chatonE_mult(c,x,BORD,k,{etire:e,T,z:enRep?1:zoom(T,t,.4),lueur:enRep&&T>=DECOMPTE[k]&&T<tTrois?.5:0}); });
    panierDevantE_mult(c,PX,BORD,BAS,960);
    const lueQ=T>=tQPattes&&T<tQA+.3&&T<r?.8:0, lueP=T>=tPattes0&&T<tPattes0+1.2?.7:0;
    XS.forEach((x,k)=>{ const t=tChatons0+k*.2; if(T<t&&!enRep) return;
      const e=enRep?entreE(T,DECOMPTE[k]-.25,DECOMPTE[k]+.35):0;
      pattesE_mult(c,x,BORD,k,{etire:e,z:enRep?1:zoom(T,t,.4),lueur:enRep?(T>=DECOMPTE[k]&&T<DECOMPTE[k]+1.1?.9:0):Math.max(lueQ,lueP)}); });
    /* les « z » des chatons qui dorment */
    if(!enRep&&T>=tChatons0) XS.forEach((x,k)=>{ const u=((T*.6+k*.33)%1); c.globalAlpha=1-u; ecrire(c,'z',x+165+u*30,BORD-215-u*60,34+u*16,'#e7f5ff'); c.globalAlpha=1; });
    if(!enRep){
      if(T>=tTrois0) ecrire(c,'3 chatons',270,90,78*zoom(T,tTrois0,.4),CRAIE.jaune);
      if(T>=tQuatre0) ecrire(c,'4 pattes chacun',760,90,62*zoom(T,tQuatre0,.4),CRAIE.blanc);
      if(T>=q) rondNombreE(c,'?',528,618,50,{z:zoom(T,tQPattes,.5),coul:'#ff922b'}); }
    else {
      DECOMPTE.forEach((t,k)=>{ if(T>=t) rondNombreE(c,['4','8','12'][k],XS[k],620,46,{z:zoom(T,t,.5)}); });
      if(T>=tDouze&&T<tTrois) formuleE(c,T,528,90,['4','+','4','+','4','=','12'],Array(7).fill(tDouze),86,[CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
      if(T>=tTrois) formuleE(c,T,528,90,['3','fois','4','=','12'],[tTrois,tFois,tQuatre2,tDouze2,tDouze2],86,[CRAIE.jaune,CRAIE.blanc,CRAIE.blanc,CRAIE.blanc,CRAIE.ok]);
    }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien de pattes en tout ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('3 fois 4 = 12 pattes',[tTrois,tFois,tQuatre2,tDouze2,tDouze2,mr('pattes')]);

  poserMiniature(outils,q-.3,'Combien<br>de pattes ?',ardoiseMini([['3 chatons','#ffd43b'],['4 pattes chacun']]));
  return { clips,FIN,titre:'Les pattes des chatons',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['7 pattes',tq('A'),tq('sept')],['12 pattes',tq('B'),tq('douze')],['3 pattes',tq('C'),tq('trois')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[rep1],suite:[] },
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
      else if(T<com){ T>=tMiaou?g.fier():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
