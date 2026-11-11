/* Série « Comprendre le monde », épisode 03 : LA PLANÈTE MER (voix monde-oceans-short).
   L'article du Journal « Notre planète devrait s'appeler la planète Mer ». La surface de la Terre
   en 10 morceaux : 7 d'océan, 3 de terres ; en 100 morceaux : 71 d'océan (71 %), 29 de terres,
   71 + 29 = 100 ; sur un disque, presque les trois quarts. Les océans et le plancton, la Lune
   mieux connue que leur fond ; le geste : ramasser un déchet plastique.
   Question-pause : 100 morceaux → A : environ 70. En commentaire : 7 sur 10 → sur 50 ? (35).
   Code couleur : l'océan est bleu, les terres vertes ; le « presque » des trois quarts est jaune. */

const OC_BLEU='#4dabf7', OC_MER='#1c7ed6', OC_TERRE='#51cf66', OC_JAUNE='#ffd43b', OC_VIDE='#3b5249';

/* La Terre : un disque bleu, des continents verts qui tournent lentement */
const OC_CONT=[[-.5,-.4,.3,.2,.5],[-.35,.25,.16,.34,.25],[.35,-.25,.36,.18,-.3],[.55,.3,.18,.15,0],[.05,.82,.45,.1,0],[-.05,-.86,.35,.08,0]];
function ocGlobe(c,x,y,r,T,z=1){ if(z<=0) return; r*=z; c.save(); c.beginPath(); c.arc(x,y,r,0,7); c.fillStyle=OC_MER; c.fill(); c.clip();
  const s=(T*.05)%2; c.fillStyle=OC_TERRE;
  for(const [a,b,rx,ry,rot] of OC_CONT) for(const o of [0,-2]){ c.beginPath(); c.ellipse(x+(a+s+o)*r,y+b*r,rx*r,ry*r,rot,0,7); c.fill(); }
  c.fillStyle='rgba(255,255,255,.18)'; c.beginPath(); c.ellipse(x-r*.35,y-r*.4,r*.45,r*.3,-.6,0,7); c.fill();
  c.restore(); c.strokeStyle='#a5d8ff'; c.lineWidth=6; c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); }
/* Le ciel noir et ses étoiles, sur tout le tableau */
function ocEspace(c,W,H,T){ c.fillStyle='#0b1d3a'; c.fillRect(0,0,W,H);
  for(let k=0;k<60;k++){ const x=(k*397)%W, y=(k*211)%H, a=.4+.6*Math.abs(Math.sin(T*1.3+k)); c.fillStyle=`rgba(255,255,255,${a})`; c.beginPath(); c.arc(x,y,k%5===0?3.5:2,0,7); c.fill(); } }
/* Une bande de n morceaux : nb bleus (dès tb), puis verts (dès tv) */
function ocBande(c,x,y,w,h,n,nb,T,tb,tv){ const L=w/n;
  for(let k=0;k<n;k++){ const bleu=k<nb&&T>=tb+k*.12, vert=k>=nb&&T>=tv+(k-nb)*.12;
    c.fillStyle=bleu?OC_BLEU:vert?OC_TERRE:OC_VIDE; c.fillRect(x+k*L+4,y,L-8,h);
    c.strokeStyle='#f8f9fa'; c.lineWidth=3; c.strokeRect(x+k*L+4,y,L-8,h); } }
/* La grille de 100 morceaux : 71 bleus (dès t71), 29 verts (dès t29) */
function ocGrille(c,x,y,d,T,t71,t29){ for(let k=0;k<100;k++){ const i=k%10, j=Math.floor(k/10);
  const bleu=k<71&&T>=t71+k*.012, vert=k>=71&&T>=t29+(k-71)*.025;
  c.fillStyle=bleu?OC_BLEU:vert?OC_TERRE:OC_VIDE; c.fillRect(x+i*d+2,y+j*d+2,d-4,d-4); } }
/* Le disque : 71 % bleu, 29 % vert ; les trois quarts en jaune (dès tq) */
function ocDisque(c,x,y,r,T,tq,z=1){ if(z<=0) return; r*=z; const a0=-Math.PI/2, a71=a0+.71*2*Math.PI;
  c.fillStyle=OC_BLEU; c.beginPath(); c.moveTo(x,y); c.arc(x,y,r,a0,a71); c.closePath(); c.fill();
  c.fillStyle=OC_TERRE; c.beginPath(); c.moveTo(x,y); c.arc(x,y,r,a71,a0+2*Math.PI); c.closePath(); c.fill();
  c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.arc(x,y,r,0,7); c.stroke();
  if(T>=tq){ const u=Math.min(1,(T-tq)/1); c.setLineDash([16,12]); c.lineWidth=5; c.strokeStyle='#f8f9fa';
    for(let k=0;k<4;k++){ const a=a0+k*Math.PI/2; c.beginPath(); c.moveTo(x,y); c.lineTo(x+r*Math.cos(a),y+r*Math.sin(a)); c.stroke(); }
    c.setLineDash([]); c.strokeStyle=OC_JAUNE; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.arc(x,y,r+16,a0,a0+u*1.5*Math.PI); c.stroke(); } }
/* L'eau, le plancton qui flotte et les bulles d'oxygène qui montent (dès tb) */
function ocEau(c,W,H,T,tb){ const g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,'#4dabf7'); g.addColorStop(1,'#1864ab'); c.fillStyle=g; c.fillRect(0,0,W,H);
  for(let k=0;k<26;k++){ const x=(k*173+40*Math.sin(T*.7+k))%W, y=380+(k*97)%300+12*Math.sin(T*1.1+k*2); c.fillStyle='#8ce99a'; c.beginPath(); c.arc(x,y,7+(k%3)*3,0,7); c.fill(); }
  if(T>=tb) for(let k=0;k<16;k++){ const v=((T-tb)*.35+k/16)%1, x=80+(k*131)%(W-160)+20*Math.sin(T*2+k), y=H-60-v*(H-120);
    c.strokeStyle=`rgba(255,255,255,${.9-v*.6})`; c.lineWidth=4; c.beginPath(); c.arc(x,y,10+(k%4)*4,0,7); c.stroke(); } }
/* La Lune grise et ses cratères */
function ocLune(c,x,y,r,z=1){ if(z<=0) return; r*=z; c.fillStyle='#ced4da'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.fillStyle='#adb5bd'; for(const [a,b,s] of [[-.35,-.3,.2],[.3,.1,.26],[-.15,.45,.14],[.45,-.45,.1]]){ c.beginPath(); c.arc(x+a*r,y+b*r,s*r,0,7); c.fill(); } }
/* Une bouteille en plastique couchée (a : son angle) */
function ocBouteille(c,x,y,a,s=1){ c.save(); c.translate(x,y); c.rotate(a); c.scale(s,s);
  c.fillStyle='rgba(165,216,255,.85)'; c.beginPath(); c.roundRect(-80,-32,130,64,22); c.fill(); c.beginPath(); c.roundRect(40,-18,40,36,8); c.fill();
  c.fillStyle='#e8590c'; c.fillRect(78,-16,18,32); c.fillStyle='#f8f9fa'; c.fillRect(-50,-32,50,64); c.restore(); }

FILMS.oceans=function(outils){
  const {panneau}=outils;
  const ORDRE=['00-accroche','01-espace','02-dix','01q-question','01r-reponse','03-pourcent','04-trois-quarts','05-oxygene','06-agir','07-question','08-abonne'];
  const DUR={'00-accroche':11.45,'01-espace':6.395,'02-dix':10.76,'01q-question':14.505,'01r-reponse':10.05,'03-pourcent':13.905,'04-trois-quarts':7.27,'05-oxygene':12.22,'06-agir':10.58,'07-question':10.465,'08-abonne':6.045};
  const clips=enchainer(.4,ORDRE,DUR,{'01q-question':3.3,'01r-reponse':.4,'07-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,es,di,q,r,pc,tq,ox,ag,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['08-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const CL=(window.CUES||{})[VIDEO]||{}, at=(clip,k)=>A[clip]+CL[clip][k][0];

  poserJardin();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tNotre=at('00-accroche',5), tTerre=at('00-accroche',9), tMer=at('00-accroche',17), tTu=at('00-accroche',18);
  const finTitre=tNotre-.08;
  const eBleue=at('01-espace',8), eOceans=at('01-espace',14);
  const d10=at('02-dix',8), d7=at('02-dix',11), dTerres=at('02-dix',17), d3=at('02-dix',25);
  const p71=at('03-pourcent',4), p100=at('03-pourcent',6), pDit=at('03-pourcent',9), p29=at('03-pourcent',14), pTerres=at('03-pourcent',18),
    pPlus=at('03-pourcent',19), pPlus2=at('03-pourcent',20), p29b=at('03-pourcent',21), pEg=at('03-pourcent',22), p100b=at('03-pourcent',23), pToute=at('03-pourcent',24);
  const qOcean=at('04-trois-quarts',3), qTrois=at('04-trois-quarts',7), qMer=at('04-trois-quarts',9);
  const xPlancton=at('05-oxygene',8), xOxy=at('05-oxygene',15), xPourtant=at('05-oxygene',18), xLune=at('05-oxygene',26), xFond=at('05-oxygene',29);
  const gGeste=at('06-agir',2), gRamasse=at('06-agir',3), gClasse=at('06-agir',15), gCombien=at('06-agir',17), gSemaine=at('06-agir',23);
  const c10=at('07-question',3), c7=at('07-question',8), c50=at('07-question',13), cCombien=at('07-question',15), cReponds=at('07-question',17);

  const Z=(T,t)=>T>=t?Math.max(1,Math.min(1.2,pop(T,t))):0;
  const zt=(T,t)=>Math.max(1,Math.min(1.15,pop(T,t)));
  /* Une ligne de jetons écrits chacun à son instant, centrée en x */
  function ligne(c,T,toks,x,y,taille){ c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width);
    let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
    toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; }); }

  function dessiner(T){ const c=tab.c, W=tab.W, H=tab.H; tab.effacer();
    if(T>=com){ /* le défi : 7 sur 10, et sur 50 ? rien de la réponse */
      if(T>=c10){ ecrire(c,'10 morceaux',W/2,70,58*zt(T,c10),CRAIE.blanc); ocBande(c,78,130,900,130,10,7,T,c7,c7+.9); }
      if(T>=c7) ecrire(c,'7 d’océan',78+315,320,56*zt(T,c7),OC_BLEU);
      if(T>=c50) ecrire(c,'50 morceaux',W/2,470,92*zt(T,c50),OC_JAUNE);
      if(T>=cCombien) ecrire(c,'combien d’océan ?',W/2,610,74*zt(T,cCombien),OC_BLEU);
      tab.maj(); return; }
    if(T>=ag){ /* le geste : la plage, la bouteille ramassée, on compte */
      c.fillStyle=OC_MER; c.fillRect(0,0,W,300); c.fillStyle='#e9c46a'; c.fillRect(0,300,W,H-300);
      c.strokeStyle='#a5d8ff'; c.lineWidth=8; c.beginPath(); for(let x=0;x<=W;x+=12) c.lineTo(x,300+10*Math.sin(x/40+T*2)); c.stroke();
      if(T>=gGeste) ecrire(c,'un geste',W/2,80,70*zt(T,gGeste),CRAIE.blanc);
      /* le sac, à droite */
      c.fillStyle='#343a40'; c.beginPath(); c.roundRect(820,420,170,210,40); c.fill(); c.fillStyle='#495057'; c.fillRect(860,395,90,40);
      const u=T<gRamasse?0:lisse(Math.min(1,(T-gRamasse)/1.6));
      if(u<1) ocBouteille(c,260+u*640,520-Math.sin(u*Math.PI)*260+u*-40,u*Math.PI*1.5,1.2);
      if(T>=gRamasse) ecrire(c,'1 déchet plastique',W/2,190,60*zt(T,gRamasse),CRAIE.blanc);
      if(T>=gClasse){ const n=Math.min(12,Math.floor((T-gClasse)*3)); c.strokeStyle='#212529'; c.lineWidth=9; c.lineCap='round';
        for(let k=0;k<n;k++){ const g=Math.floor(k/5), i=k%5, x0=80+g*190;
          c.beginPath(); if(i<4){ c.moveTo(x0+i*34,370); c.lineTo(x0+i*34,470); } else { c.moveTo(x0-14,450); c.lineTo(x0+116,390); } c.stroke(); } }
      if(T>=gCombien) ecrire(c,'combien ?',330,560,74*zt(T,gCombien),'#c92a2a');
      if(T>=gSemaine) ecrire(c,'en une semaine',330,655,54*zt(T,gSemaine),'#212529');
      tab.maj(); return; }
    if(T>=ox){ /* les océans travaillent ; la Lune mieux connue que leur fond */
      if(T<xPourtant){ ocEau(c,W,H,T,xOxy);
        if(T>=xPlancton) ecrire(c,'le plancton',W/2,640,66*zt(T,xPlancton),'#b2f2bb');
        if(T>=xOxy) ecrire(c,'l’oxygène',W/2,110,100*zt(T,xOxy),CRAIE.blanc);
        tab.maj(); return; }
      ocEspace(c,W/2,H,T); c.fillStyle='#0b2545'; c.fillRect(W/2,0,W/2,H);
      ocLune(c,W/4,320,170,Z(T,xLune));
      if(T>=xLune) ecrire(c,'la Lune',W/4,600,62,CRAIE.blanc);
      if(T>=xFond){ c.fillStyle='#071a2f'; c.beginPath(); c.moveTo(W/2,520); for(let x=W/2;x<=W;x+=20) c.lineTo(x,520+18*Math.sin(x/37)); c.lineTo(W,H); c.lineTo(W/2,H); c.fill();
        ecrire(c,'?',W*.75,320,220*zt(T,xFond),OC_JAUNE); ecrire(c,'le fond des océans',W*.75,600,44,CRAIE.blanc); }
      c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath(); c.moveTo(W/2,0); c.lineTo(W/2,H); c.stroke();
      tab.maj(); return; }
    if(T>=tq){ /* le disque : presque les trois quarts */
      ocDisque(c,290,370,255,T,qTrois,Z(T,tq));
      if(T>=qOcean) ecrire(c,'71 %',830,170,110*zt(T,qOcean),OC_BLEU);
      if(T>=qTrois){ ecrire(c,'presque',830,320,58,OC_JAUNE); ecrire(c,'les trois quarts',830,400,46*zt(T,qTrois),OC_JAUNE); }
      if(T>=qMer) ecrire(c,'planète Mer !',830,580,60*zt(T,qMer),OC_BLEU);
      tab.maj(); return; }
    if(T>=pc){ /* la grille de 100 : 71 bleus, 29 verts */
      ocGrille(c,40,40,56,T,pc,p29);
      if(T>=p71) ecrire(c,'71',830,120,140*zt(T,p71),OC_BLEU);
      if(T>=p100) ecrire(c,'sur 100',830,230,70*zt(T,p100),CRAIE.blanc);
      if(T>=pDit) ecrire(c,'= 71 %',830,345,84*zt(T,pDit),OC_BLEU);
      if(T>=p29) ecrire(c,'29 %',830,465,84*zt(T,p29),OC_TERRE);
      if(T>=pTerres) ecrire(c,'de terres',830,545,50,OC_TERRE);
      ligne(c,T,[[pPlus,'71',OC_BLEU],[pPlus2,'+'],[p29b,'29',OC_TERRE],[pEg,'='],[p100b,'100',OC_JAUNE]],W/2,675,64);
      tab.maj(); return; }
    if(T>=q){ tab.maj(); return; }
    if(T>=di){ /* 10 morceaux : 7 d'océan, 3 de terres */
      if(T>=d10){ ecrire(c,'10 morceaux',W/2,110,80*zt(T,d10),CRAIE.blanc); ocBande(c,78,220,900,170,10,7,T,d7,dTerres); }
      if(T>=d7) ecrire(c,'7 d’océan',78+315,480,70*zt(T,d7),OC_BLEU);
      if(T>=d3) ecrire(c,'3 de terres',78+765,480,56*zt(T,d3),OC_TERRE);
      if(T>=dTerres){ c.strokeStyle=OC_TERRE; c.lineWidth=6; c.beginPath(); c.moveTo(78+634,410); c.lineTo(78+896,410); c.stroke(); }
      if(T>=d7){ c.strokeStyle=OC_BLEU; c.lineWidth=6; c.beginPath(); c.moveTo(82,410); c.lineTo(78+626,410); c.stroke(); }
      tab.maj(); return; }
    if(T>=es){ /* vue de l'espace */
      ocEspace(c,W,H,T);
      if(T>=eBleue){ const b=.5+.5*Math.sin((T-eBleue)*4); c.fillStyle=`rgba(116,192,252,${.18+.12*b})`; c.beginPath(); c.arc(W/2+120,370,300,0,7); c.fill(); }
      ocGlobe(c,W/2+120,370,250,T,1);
      if(T>=eOceans){ ecrire(c,'les océans',220,140,64*zt(T,eOceans),OC_JAUNE); fleche(c,220,190,W/2-20,330,OC_JAUNE); }
      tab.maj(); return; }
    /* l'accroche : la Terre… ou la planète Mer ? */
    ocGlobe(c,W/2,260,190,T,Z(T,finTitre));
    if(T>=tTerre){ ecrire(c,'la Terre',W/2,535,80*zt(T,tTerre),OC_TERRE);
      if(T>=tMer){ const u=Math.min(1,(T-tMer)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.beginPath(); c.moveTo(W/2-170,535); c.lineTo(W/2-170+340*u,535); c.stroke(); } }
    if(T>=tMer) ecrire(c,'la planète Mer ?',W/2,650,76*zt(T,tMer),OC_BLEU);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const D=Object.fromEntries(ORDRE.map(k=>[k,dit(k)])), a0=D['00-accroche'], qd=D['01q-question'], rd=D['01r-reponse'];
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(es,60,58,[a0('Notre planète s’appelle la Terre…')],[a0('mais elle devrait plutôt s’appeler la planète Mer !')],[a0('Tu vas voir pourquoi.')]),
    ...suiteDe(di,60,58,[D['01-espace']('Vue de l’espace, la Terre est presque toute bleue.')],[D['01-espace']('Ce bleu, c’est l’eau des océans.')]),
    ...suiteDe(q,60,58,[D['02-dix']('Découpons toute la surface de la Terre'),D['02-dix']('en 10 morceaux égaux.')],[D['02-dix']('7 morceaux sont couverts d’océan.')],[D['02-dix']('Les terres, là où nous vivons, n’en font que 3.')]),
    ...suiteDe(tq,60,58,[D['03-pourcent']('En vrai, c’est même 71 sur 100.')],[D['03-pourcent']('On dit 71 pour cent.'),D['03-pourcent']('Il reste 29 pour cent de terres.')],[D['03-pourcent']('71 + 29 = 100 :'),D['03-pourcent']('toute la planète !')]),
    ...suiteDe(ox,60,58,[D['04-trois-quarts']('Sur ce disque, l’océan prend presque les trois quarts.')],[D['04-trois-quarts']('La planète Mer, je te l’avais dit !')]),
    ...suiteDe(ag,60,58,[D['05-oxygene']('Et les océans travaillent pour nous :')],[D['05-oxygene']('grâce au plancton, ils fabriquent'),D['05-oxygene']('une bonne partie de l’oxygène qu’on respire.')],
      [D['05-oxygene']('Pourtant, on connaît mieux la surface de la Lune'),D['05-oxygene']('que le fond des océans !')]),
    ...suiteDe(com,60,58,[D['06-agir']('Alors, un geste :'),D['06-agir']('ramasse un déchet plastique avant qu’il n’arrive à la mer.')],[D['06-agir']('Avec ta classe, comptez combien vous en ramassez en une semaine !')]),
    ...suiteDe(f,60,58,[D['07-question']('À toi : sur 10 morceaux de la planète, 7 sont de l’océan.')],[D['07-question']('Sur 50 morceaux, combien d’océan ?')],[D['07-question']('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Et si on la découpe'),qd('en 100 petits morceaux,'),qd('environ combien sont'),qd('couverts d’océan ?')];
  const tq_=(m,n=1)=>mot('01q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse A : environ 70 !'), r1=rd('7 sur 10,'), r1b=rd('c’est comme 70 sur 100.'), r2=rd('Chaque morceau est coupé en 10.');

  poserMiniature(outils,acc+1,'La Terre ?<br>Non : la planète'+'<div style="color:#1c7ed6;font-size:150px;margin-top:10px">MER !</div>',
    `<svg width="300" height="190" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#24452c" stroke="#8a5a2b" stroke-width="12"/>
      <circle cx="82" cy="105" r="60" fill="#1c7ed6" stroke="#a5d8ff" stroke-width="5"/>
      <ellipse cx="62" cy="84" rx="20" ry="13" fill="#51cf66"/><ellipse cx="102" cy="120" rx="15" ry="22" fill="#51cf66"/>
      <text x="230" y="124" font-family="Segoe UI" font-weight="800" font-size="56" fill="#4dabf7" text-anchor="middle">71 %</text></svg>`);
  return { clips,FIN,titre:'La planète Mer',ceinture:1,finTitre,groupes,finClip:'08-abonne',
    cuts:[finTitre,es,di,q,r,pc,tq,ox,ag,com,f],
    question:{ qc:'01q-question',rc:'01r-reponse',finR:pc,cpt:fin('01q-question')+.1,bonne:0,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['70',tq_('A'),tq_('70')],['7',tq_('B'),tq_('7')],['30',tq_('C'),tq_('30')]],
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'A : environ 70 !']],reponse:[r1,r1b],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<pc, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<es){ T>=tMer?(T>=tTu?g.montre():g.oups()):g.ouvre(); }
      else if(T<di){ T>=eOceans?g.montre():g.ouvre(); }
      else if(T<q){ g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<pc){ T<rR[3][1]?g.ouvre():g.pouce(); }
      else if(T<tq){ T>=pToute?g.fier():g.montre(); }
      else if(T<ox){ T>=qMer?g.fier():g.montre(); }
      else if(T<ag){ T>=xPourtant&&T<xLune?g.reflechit():g.montre(); }
      else if(T<com){ T>=gSemaine?g.pouce():g.montre(); }
      else if(T<f){ T<cReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
