/* ============================================================
   Série Ti Margo, problèmes CP — SHORT 02 : « Les poissons de l'aquarium » (micro cp_probleme_schema), 28/11/2026.
   Voix (validée) : manim/voix/margo-pb-cp-schema-short.json.
   10 poissons, 4 orange, les autres jaunes : la barre « 10 », les parts « 4 » et « ? ». Bonne réponse A (6) ; 10 − 4 = 6.
   Commentaire : 3 chats noirs et 5 chats blancs, une barre vide, « ? » en haut. Ceinture blanche.
   ============================================================ */

/* Un chat assis, de face (centre du bas x, yBas ; échelle s ; ≈ 190 px de haut à s = 1) */
function chatAssis_schema(c,x,yBas,s=1,{coul='#f8f9fa',bord='#868e96',yeux='#69db7c',z=1,T=0,k=0}={}){ if(z<=0) return; const q=Math.min(1.15,z);
  c.save(); c.translate(x,yBas); c.scale(s*q,s*q); c.lineWidth=4; c.strokeStyle=bord; c.fillStyle=coul;
  /* la queue */
  c.lineCap='round'; c.lineWidth=14; c.beginPath(); c.moveTo(30,-18); c.quadraticCurveTo(80,-30,72+6*Math.sin(T*2+k),-90); c.strokeStyle=bord; c.stroke();
  c.lineWidth=9; c.strokeStyle=coul; c.stroke(); c.lineCap='butt'; c.lineWidth=4; c.strokeStyle=bord;
  /* le corps, les pattes */
  c.beginPath(); c.ellipse(0,-58,46,58,0,0,7); c.fill(); c.stroke();
  for(const sx of [-1,1]){ c.beginPath(); c.ellipse(sx*20,-6,16,9,0,0,7); c.fill(); c.stroke(); }
  /* les oreilles, la tête */
  for(const sx of [-1,1]){ c.beginPath(); c.moveTo(sx*34,-140); c.lineTo(sx*28,-190); c.lineTo(sx*6,-160); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(0,-136,40,0,7); c.fill(); c.stroke();
  for(const sx of [-1,1]){ c.fillStyle=yeux; c.beginPath(); c.ellipse(sx*15,-142,8,10,0,0,7); c.fill();
    c.fillStyle='#212529'; c.beginPath(); c.ellipse(sx*15,-142,3,7,0,0,7); c.fill(); }
  c.fillStyle='#ff8fa3'; c.beginPath(); c.moveTo(-6,-126); c.lineTo(6,-126); c.lineTo(0,-119); c.closePath(); c.fill();
  c.strokeStyle=coul==='#f8f9fa'?'#868e96':'#dee2e6'; c.lineWidth=2;
  for(const sx of [-1,1]) for(const v of [-4,4]){ c.beginPath(); c.moveTo(sx*10,-121); c.lineTo(sx*40,-124+v*1.5); c.stroke(); }
  c.restore(); }

/* L'aquarium : vitre (x0, y0, w, h), eau, sable, une plante, des bulles qui montent */
function aquarium_schema(c,x0,y0,w,h,T){
  const g=c.createLinearGradient(0,y0,0,y0+h); g.addColorStop(0,'#4dabf7'); g.addColorStop(1,'#1864ab');
  c.fillStyle=g; c.beginPath(); c.roundRect(x0,y0,w,h,20); c.fill();
  c.fillStyle='#e9c46a'; c.beginPath(); c.roundRect(x0,y0+h-50,w,50,[0,0,20,20]); c.fill();
  c.strokeStyle='#2f9e44'; c.lineWidth=9; c.lineCap='round';
  for(const [px,hh] of [[x0+60,120],[x0+90,90],[x0+w-70,130],[x0+w-100,95]]){ c.beginPath(); c.moveTo(px,y0+h-40);
    c.quadraticCurveTo(px+18*Math.sin(T*1.5+px),y0+h-40-hh/2,px+8*Math.sin(T*1.2+px),y0+h-40-hh); c.stroke(); }
  c.lineCap='butt'; c.strokeStyle='rgba(255,255,255,.75)'; c.lineWidth=3;
  for(let k=0;k<8;k++){ const bx=x0+110+k*((w-220)/7), by=y0+h-60-((T*70+k*53)%(h-90)); c.beginPath(); c.arc(bx+6*Math.sin(T*3+k),by,7+(k%3)*2,0,7); c.stroke(); }
  c.strokeStyle='#d0ebff'; c.lineWidth=8; c.beginPath(); c.roundRect(x0,y0,w,h,20); c.stroke();
  c.strokeStyle='rgba(255,255,255,.35)'; c.lineWidth=6; c.beginPath(); c.moveTo(x0+30,y0+40); c.lineTo(x0+90,y0+20); c.stroke(); }

FILMS['schema']=function(outils){
  const DUR={'00-accroche':10.43,'01-question':12.105,'01b-reponse':8.235,'02-commentaire':10.945,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':8.4,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#titre{font-size:60px;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tDans=m0('Dans'), tDix0=m0('dix'), tQuatre0=m0('Quatre'), tAutres=m0('autres'), tJaunes0=m0('jaunes'), tDessin=m0('dessin');
  const mq=w=>mot('01-question',w), tQJaunes=mq('jaunes');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tA=mr('A'), tPoint=mr('point'), tPart=mr('part'), tDix=mr('Dix'), tMoins=mr('moins'), tQuatre=mr('quatre'), tSix=mr('six'), tJaunesR=mr('jaunes');
  const mc=(w,n=1)=>mot('02-commentaire',w,n), tFais=mc('fais'), tTroisC=mc('Trois'), tCinqC=mc('cinq'), tCombienC=mc('Combien'), tDis=mc('Dis-le');
  const finTitre=tDans-.08;

  /* les poissons : 4 orange à gauche, 6 jaunes à droite */
  const ORANGE=[[185,165],[345,155],[195,295],[355,305]], JAUNES=[[575,160],[735,150],[895,165],[585,295],[745,305],[900,290]];
  const AQ=[60,30,936,400];
  function poissons(c,T){
    const lueO=T>=tQuatre0&&T<tAutres?.7:0, lueJ=(T>=tAutres&&T<tDessin)||(T>=q&&T>=tQJaunes&&T<tQJaunes+1.5&&T<r)?.7:0;
    const ronde=T>=r&&T>=tSix?entreE(T,tSix,tSix+.4):0;
    ORANGE.forEach(([x,y],k)=>{ const t=tDix0+k*.08; if(T<t) return;
      poissonE(c,x+10*Math.sin(T*1.1+k),y+6*Math.sin(T*1.7+k*2),150,'#ff922b',{T,k,ray:'#c2410c',z:T>=q?1:zoom(T,t,.4),lueur:lueO}); });
    JAUNES.forEach(([x,y],k)=>{ const t=tDix0+(k+4)*.08; if(T<t) return;
      const a=T*2.2+k*1.05, dx=ronde*28*Math.cos(a), dy=ronde*22*Math.sin(a);
      poissonE(c,x+10*Math.sin(T*1.1+k+4)+dx,y+6*Math.sin(T*1.7+k*2)+dy,150,'#ffd43b',{T,k:k+4,ray:'#e67700',dir:(ronde&&Math.sin(a)<0)?-1:1,z:T>=q?1:zoom(T,t,.4),lueur:lueJ||(T>=r&&T>=tSix&&T<tJaunesR+1?.6:0)}); });
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* trois chats noirs, cinq chats blancs ; la barre vide, « ? » en haut */
      [95,225,355].forEach((x,k)=>{ const t=tTroisC+k*.15; if(T>=t) chatAssis_schema(c,x,385,1.15,{coul:'#343a40',bord:'#adb5bd',yeux:'#ffd43b',z:zoom(T,t,.4),T,k}); });
      [485,597,709,821,933].forEach((x,k)=>{ const t=tCinqC+k*.12; if(T>=t) chatAssis_schema(c,x,385,1.15,{z:zoom(T,t,.4),T,k:k+3}); });
      if(T>=tTroisC) rondNombreE(c,'3',225,66,48,{z:zoom(T,tTroisC,.5)});
      if(T>=tCinqC) rondNombreE(c,'5',709,66,48,{z:zoom(T,tCinqC,.5)});
      if(T>=tFais||T>=tCombienC){ const u=entreE(T,tFais,tFais+.8);
        barreE(c,108,440,840,110,{tout:T>=tCombienC?'?':null,parts:[[null,3,'rgba(52,58,64,.9)'],[null,5,'rgba(248,249,250,.25)']],u,qLueur:T>=tCombienC?.6+.4*Math.sin(T*4):0,taille:80}); }
      tab.maj(); return; }

    aquarium_schema(c,...AQ,T);
    poissons(c,T);
    if(T>=tDix0&&T<tDessin) rondNombreE(c,'10',466,72,52,{z:zoom(T,tDix0,.5)});
    if(T>=tQuatre0&&T<tDessin) rondNombreE(c,'4',270,370,50,{z:zoom(T,tQuatre0,.5),coul:'#ff922b'});
    if(T>=tJaunes0&&T<tDessin) rondNombreE(c,'?',740,370,50,{z:zoom(T,tJaunes0,.5),coul:'#ffd43b'});
    /* la barre sous l'aquarium : 10 en haut, 4 et ? (puis 6) dessous */
    if(T>=tDessin-.3){ const u=entreE(T,tDessin-.3,tDessin+.5), six=T>=r&&T>=tSix;
      barreE(c,128,445,800,110,{tout:'10',parts:[['4',4,'rgba(255,146,43,.55)'],[six?'6':'?',6,'rgba(255,212,59,.28)']],u,
        qLueur:(T>=q&&T<r)||(T>=r&&T>=tPoint&&T<tSix)?.6+.4*Math.sin(T*4):0,taille:76}); }
    if(T>=r&&T>=tDix){ bandeauE(c,528,80,560,130,entreE(T,tDix-.2,tDix+.1));
      formuleE(c,T,528,80,['10','−','4','=','6'],[tDix,tMoins,tQuatre,tSix,tSix],96,[CRAIE.blanc,CRAIE.blanc,'#ffa94d',CRAIE.blanc,CRAIE.ok]); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd('Combien de poissons jaunes ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rep1=phraseE('10 − 4 = 6',[tDix,tMoins,tQuatre,tSix,tSix]);

  poserMiniature(outils,q-.3,'Un dessin<br>pour comprendre',ardoiseMini([['10 poissons','#ffd43b'],['4 orange'],['? jaunes']]));
  return { clips,FIN,titre:"Les poissons de l'aquarium",ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,rebours:8,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['6',tq('A'),tq('six')],['14',tq('B'),tq('quatorze')],['4',tq('C'),tq('quatre')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[rep1],suite:[] },
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
      else if(T<com){ T>=tJaunesR?g.fier():g.montre(); }
      else if(T<f){ T<tDis?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
