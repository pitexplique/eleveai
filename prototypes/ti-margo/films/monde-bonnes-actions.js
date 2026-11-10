/* Série « Comprendre le monde », épisode 01 : DEUX BONNES ACTIONS (voix monde-bonnes-actions-short).
   La Une du Journal d'EleveAI du 10/11/2026. Ti Margo fait une bonne action à 2 amis, chacun la passe
   à 2 autres : chaque jour le nombre double. Jour 5 : 32 = 2⁵ (et pas 2 × 5). Jour 7 : 128, une école ;
   jour 15 : 32 768, une petite ville ; jour 21 : 2 097 152, Paris ; jour 30 : plus d'un milliard ;
   en tout, au 32e jour : 2³³ − 2 ≈ 8,6 milliards, autant que d'habitants sur Terre.
   Code couleur : les bonnes actions sont des cœurs roses ; le « 2 » qui se répète est jaune. */

const BA_ROSE='#faa2c1', BA_JAUNE='#ffd43b';

/* La Terre : un disque bleu et trois continents verts */
function baTerre(c,x,y,r,z=1){ if(z<=0) return; r*=z; c.save(); c.beginPath(); c.arc(x,y,r,0,7); c.fillStyle='#4dabf7'; c.fill(); c.clip();
  c.fillStyle='#69db7c'; for(const [a,b,s] of [[-.35,-.3,.42],[.38,.05,.36],[-.1,.5,.3],[.5,-.55,.2]]){ c.beginPath(); c.ellipse(x+a*r,y+b*r,s*r,s*r*.7,a,0,7); c.fill(); }
  c.restore(); c.strokeStyle='#e7f5ff'; c.lineWidth=Math.max(3,r*.06); c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); }
/* Une école : le bâtiment, le toit, la porte, les fenêtres, le drapeau */
function baEcole(c,x,y,s,z=1){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(s*z,s*z);
  c.fillStyle='#ffe8cc'; c.fillRect(-150,-60,300,120); c.fillStyle='#e8590c'; c.beginPath(); c.moveTo(-170,-60); c.lineTo(0,-140); c.lineTo(170,-60); c.closePath(); c.fill();
  c.fillStyle='#5c3d2e'; c.fillRect(-24,0,48,60); c.fillStyle='#74c0fc'; for(const fx of [-110,-65,45,90]) c.fillRect(fx,-35,32,30);
  c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.moveTo(0,-140); c.lineTo(0,-200); c.stroke();
  c.fillStyle='#1c7ed6'; c.fillRect(0,-200,18,26); c.fillStyle='#f8f9fa'; c.fillRect(18,-200,18,26); c.fillStyle='#fa5252'; c.fillRect(36,-200,18,26); c.restore(); }
/* Une petite ville : des immeubles de hauteurs variées, fenêtres allumées */
function baVille(c,x,y,s,z=1){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(s*z,s*z);
  [[-260,120,'#748ffc'],[-170,190,'#9775fa'],[-80,140,'#4dabf7'],[10,230,'#748ffc'],[100,160,'#9775fa'],[190,110,'#4dabf7']].forEach(([bx,h,col])=>{
    c.fillStyle=col; c.fillRect(bx,-h,80,h); c.fillStyle='#ffe066';
    for(let yy=-h+18;yy<-14;yy+=34) for(const xx of [12,46]) c.fillRect(bx+xx,yy,20,18); });
  c.restore(); }
/* La tour Eiffel, au trait de craie */
function baTour(c,x,y,s,z=1){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(s*z,s*z); c.strokeStyle='#ffc078'; c.lineWidth=7; c.lineJoin='round';
  c.beginPath(); c.moveTo(-110,0); c.quadraticCurveTo(-40,-110,-14,-300); c.lineTo(0,-340); c.lineTo(14,-300); c.quadraticCurveTo(40,-110,110,0); c.stroke();
  c.beginPath(); c.moveTo(-60,0); c.quadraticCurveTo(0,-70,60,0); c.stroke();
  for(const [h,w] of [[-95,70],[-190,34]]){ c.beginPath(); c.moveTo(-w,h); c.lineTo(w,h); c.stroke(); }
  c.beginPath(); c.moveTo(-60,-60); c.lineTo(30,-150); c.moveTo(60,-60); c.lineTo(-30,-150); c.stroke(); c.restore(); }
/* Un maillon de chaîne */
function baMaillon(c,x,y,w,h,coul){ c.strokeStyle=coul; c.lineWidth=12; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,h/2); c.stroke(); }
/* Un virus, une bulle de rumeur, une ampoule d'idée */
function baVirus(c,x,y,r,z){ if(z<=0) return; r*=z; c.strokeStyle='#8ce99a'; c.lineWidth=6; for(let k=0;k<10;k++){ const a=k*Math.PI/5; c.beginPath(); c.moveTo(x+Math.cos(a)*r,y+Math.sin(a)*r); c.lineTo(x+Math.cos(a)*r*1.35,y+Math.sin(a)*r*1.35); c.stroke(); c.fillStyle='#8ce99a'; c.beginPath(); c.arc(x+Math.cos(a)*r*1.4,y+Math.sin(a)*r*1.4,r*.13,0,7); c.fill(); }
  c.fillStyle='#2f9e44'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
function baBulle(c,x,y,r,z){ if(z<=0) return; r*=z; c.fillStyle='#f8f9fa'; c.beginPath(); c.ellipse(x,y,r*1.3,r,0,0,7); c.fill(); c.beginPath(); c.moveTo(x-r*.5,y+r*.7); c.lineTo(x-r*.9,y+r*1.35); c.lineTo(x-r*.05,y+r*.85); c.fill();
  c.fillStyle='#495057'; for(const k of [-1,0,1]){ c.beginPath(); c.arc(x+k*r*.45,y,r*.13,0,7); c.fill(); } }
function baAmpoule(c,x,y,r,z){ if(z<=0) return; r*=z; c.fillStyle='#ffe066'; c.beginPath(); c.arc(x,y-r*.2,r,0,7); c.fill(); c.fillStyle='#adb5bd'; c.fillRect(x-r*.45,y+r*.7,r*.9,r*.5);
  c.strokeStyle='#ffe066'; c.lineWidth=5; for(let k=-2;k<=2;k++){ const a=-Math.PI/2+k*.5; c.beginPath(); c.moveTo(x+Math.cos(a)*r*1.3,y-r*.2+Math.sin(a)*r*1.3); c.lineTo(x+Math.cos(a)*r*1.65,y-r*.2+Math.sin(a)*r*1.65); c.stroke(); } }
/* Un grand nombre écrit, qui « pop » à son instant */
const baGros=(c,T,t,s,x,y,taille,coul)=>{ if(T>=t) ecrire(c,s,x,y,taille*Math.max(1,Math.min(1.15,pop(T,t))),coul); };

FILMS['bonnes-actions']=function(outils){
  const {panneau}=outils;
  const ORDRE=['00-accroche','01-situation','01q-question','01r-reponse','02-premiers','03-piege','04-ecole','05-ville','06-paris','07-milliard','08-planete','09-en-vrai','10-question','11-abonne'];
  const DUR={'00-accroche':10.825,'01-situation':10.67,'01q-question':14.835,'01r-reponse':4.285,'02-premiers':14.72,'03-piege':7.425,'04-ecole':5.36,'05-ville':6.08,'06-paris':6.75,'07-milliard':5.31,'08-planete':8.895,'09-en-vrai':12.905,'10-question':7.745,'11-abonne':6.045};
  const clips=enchainer(.4,ORDRE,DUR,{'01q-question':3.3,'01r-reponse':.4,'10-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,si,q,r,pr,pi,ec,vi,pa,mi,pl,ev,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['11-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const CL=(window.CUES||{})[VIDEO]||{}, at=(clip,k)=>A[clip]+CL[clip][k][0];

  poserJardin();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tAvec=mot('00-accroche','Avec'), tDeux=at('00-accroche',7), tPlanete=mot('00-accroche','planète'), tMois=mot('00-accroche','mois'), tSi=mot('00-accroche','Si');
  const finTitre=tAvec-.08;
  const sFais=mot('01-situation','fais'), sAmis=at('01-situation',7), sAutres=mot('01-situation','autres'), sSuite=mot('01-situation','suite'), sJour=mot('01-situation','jour');
  const pJour=[0,5,8,11,14].map(k=>at('02-premiers',k)), pNb=[2,7,10,13,16].map(k=>at('02-premiers',k)), pDouble=mot('02-premiers','double');
  const iPas=[3,4,5].map(k=>at('03-piege',k)), iTok=[7,8,9,10,11,12,13,14,15].map(k=>at('03-piege',k)), iPui=at('03-piege',16), iCinq=at('03-piege',18);
  const eJour=at('04-ecole',0), e128=at('04-ecole',2), eEcole=mot('04-ecole','école');
  const vJour=at('05-ville',0), vNb=at('05-ville',2), vVille=mot('05-ville','ville');
  const aJour=at('06-paris',0), aNb=at('06-paris',2), aParis=mot('06-paris','Paris');
  const mJour=at('07-milliard',0), mPlus=mot('07-milliard','plus'), mJournee=mot('07-milliard','journée');
  const lComptant=mot('08-planete','comptant'), l32=mot('08-planete','32e'), l8=at('08-planete',13), lTerre=mot('08-planete','Terre');
  const nCasse=mot('09-en-vrai','casse'), nMais=mot('09-en-vrai','Mais'), nPuiss=mot('09-en-vrai','puissances'), nGig=mot('09-en-vrai','gigantesque'),
        nComme=mot('09-en-vrai','Comme'), nVirus=mot('09-en-vrai','virus'), nRumeur=mot('09-en-vrai','rumeur'), nIdee=mot('09-en-vrai','idée');
  const cDix=mot('10-question','10e'), cCombien=mot('10-question','combien'), cReponds=mot('10-question','Réponds');

  /* n cœurs en lignes de « parLigne », à partir de x0, centrés verticalement en y */
  function coeurs(c,n,x0,y,pas,r,z,parLigne=16){ const lignes=Math.ceil(n/parLigne);
    for(let k=0;k<n;k++){ const li=Math.floor(k/parLigne), co=k%parLigne; baCoeur(c,x0+co*pas,y+(li-(lignes-1)/2)*pas*.95,r,BA_ROSE,z); } }

  function dessiner(T){ const c=tab.c, W=tab.W, H=tab.H; tab.effacer();
    if(T>=com){ /* le défi : jour 10, rien de la réponse */
      baGros(c,T,cDix,'Jour 10',W/2,200,170,BA_JAUNE);
      if(T>=cCombien) [[200,470],[400,520],[W/2,470],[W-400,520],[W-200,470]].forEach(([x,y],k)=>{ const z=Math.max(1,Math.min(1.2,pop(T,cCombien+k*.1))); baCoeur(c,x,y-60,34,BA_ROSE,1); ecrire(c,'?',x,y+40,80*z,CRAIE.blanc); });
      tab.maj(); return; }
    if(T>=ev){ /* en vrai : la chaîne casse, puis la force des puissances */
      if(T<nPuiss){ const X=[180,350,520,690,860], casse=T>=nCasse;
        X.forEach((x,k)=>{ const dx=casse&&k>=3?60:0, dy=casse&&k===2?14:0; baMaillon(c,x+dx,H/2+dy,190,100,casse&&(k===2||k===3)?CRAIE.faux:CRAIE.blanc); });
        if(casse){ const z=Math.max(1,Math.min(1.2,pop(T,nCasse))); ecrire(c,'crac !',W/2+80,170,86*z,CRAIE.faux); }
        tab.maj(); return; }
      if(T<nComme){ baGros(c,T,nPuiss,'la force des',W/2,150,70,CRAIE.blanc); baGros(c,T,nPuiss,'PUISSANCES',W/2,280,130,BA_JAUNE);
        if(T>=nGig){ const z=Math.max(1,pop(T,nGig)); ecrire(c,'2 → 4 → 8 → … → GIGANTESQUE',W/2,500,58*z,BA_ROSE); }
        tab.maj(); return; }
      const Z=t=>T>=t?Math.max(1,Math.min(1.2,pop(T,t))):0;
      baVirus(c,200,320,70,Z(nVirus)); baBulle(c,W/2,320,80,Z(nRumeur)); baAmpoule(c,W-200,320,80,Z(nIdee));
      if(T>=nVirus) ecrire(c,'un virus',200,540,56,CRAIE.ok); if(T>=nRumeur) ecrire(c,'une rumeur',W/2,540,56,CRAIE.blanc); if(T>=nIdee) ecrire(c,'une idée',W-200,540,56,BA_JAUNE);
      tab.maj(); return; }
    if(T>=pl){ /* toute la planète */
      if(T>=lComptant) ecrire(c,'2 + 4 + 8 + 16 + …',W/2,90,66,BA_ROSE);
      baGros(c,T,l32,'au jour 32 :',330,250,74,CRAIE.blanc);
      if(T>=l8){ const z=Math.max(1,Math.min(1.15,pop(T,l8))); ecrire(c,'plus de',330,390,64,CRAIE.blanc); ecrire(c,'8 milliards',320,500,90*z,BA_JAUNE); }
      baTerre(c,860,400,150,T>=lTerre?Math.max(1,pop(T,lTerre)):T>=l32?.75:0);
      tab.maj(); return; }
    if(T>=mi){ /* jour 30 */
      baGros(c,T,mJour,'Jour 30',W/2,100,110,CRAIE.blanc);
      baGros(c,T,mPlus,'1 073 741 824',W/2,300,140,BA_JAUNE);
      if(T>=mPlus) ecrire(c,'plus d’1 milliard !',W/2,450,80,BA_ROSE);
      if(T>=mJournee){ const z=Math.max(1,pop(T,mJournee)); ecrire(c,'en une seule journée',W/2,600,70*z,CRAIE.ok); }
      tab.maj(); return; }
    const etape=(tJ,jour,tN,nb,tD,dessin)=>{ baGros(c,T,tJ,jour,W/2,95,100,CRAIE.blanc); baGros(c,T,tN,nb,W/2,255,150,BA_JAUNE);
      if(T>=tD) dessin(c,W/2,T>=tD?Math.max(1,Math.min(1.2,pop(T,tD))):0); tab.maj(); };
    if(T>=pa){ etape(aJour,'Jour 21',aNb,'2 097 152',aParis,(c,x,z)=>{ baTour(c,x+250,705,.95,z); ecrire(c,'Paris',x-40,440,72,'#ffc078'); }); return; }
    if(T>=vi){ etape(vJour,'Jour 15',vNb,'32 768',vVille,(c,x,z)=>baVille(c,x+240,650,.78,z)); return; }
    if(T>=ec){ etape(eJour,'Jour 7',e128,'128',eEcole,(c,x,z)=>baEcole(c,x+250,600,.95,z)); return; }
    if(T>=pi){ /* le piège : 2 × 5, non ; 2 × 2 × 2 × 2 × 2 = 2⁵ */
      const ligne=(toks,y,taille)=>{ c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width); let gx=W/2-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
        toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; }); };
      ligne([[iPas[0],'2',BA_JAUNE],[iPas[1],'×'],[iPas[2],'5']],120,110);
      if(T>=iPas[2]+.25){ c.strokeStyle=CRAIE.faux; c.lineWidth=12; c.beginPath(); c.moveTo(W/2-180,60); c.lineTo(W/2+180,180); c.moveTo(W/2+180,60); c.lineTo(W/2-180,180); c.stroke(); }
      ligne(iTok.map((t,k)=>[t,k%2?'×':'2',k%2?CRAIE.blanc:BA_JAUNE]),340,100);
      if(T>=iPui){ const z=Math.max(1,Math.min(1.15,pop(T,iPui))); ecrire(c,'=',W/2-200,560,110); ecrire(c,'2',W/2-60,575,170*z,BA_JAUNE); }
      if(T>=iCinq){ const z=Math.max(1,Math.min(1.2,pop(T,iCinq))); ecrire(c,'5',W/2+22,490,96*z,CRAIE.grand); ecrire(c,'= 32',W/2+200,560,110,CRAIE.ok); }
      tab.maj(); return; }
    if(T>=pr){ /* jour après jour : les cœurs doublent */
      const Y=[88,210,332,454,600], N=[2,4,8,16,32];
      N.forEach((n,k)=>{ if(T<pJour[k]) return; ecrire(c,'Jour '+(k+1),105,Y[k],52,CRAIE.blanc);
        if(T>=pNb[k]){ ecrire(c,String(n),255,Y[k],70*Math.max(1,Math.min(1.15,pop(T,pNb[k]))),BA_JAUNE); coeurs(c,n,340,Y[k],38,13,Math.max(1,Math.min(1.2,pop(T,pNb[k],.4)))); } });
      if(T>=pDouble) for(let k=0;k<4;k++){ const z=Math.max(1,Math.min(1.2,pop(T,pDouble+k*.12))); ecrire(c,'× 2',985,(Y[k]+Y[k+1])/2,40*z,CRAIE.ok); }
      tab.maj(); return; }
    if(T>=si){ /* la chaîne : moi, 2 amis, 4 personnes, et ainsi de suite */
      const R=[[W/2,95]], N2=[[W/2-260,300],[W/2+260,300]], N4=[[W/2-390,500],[W/2-130,500],[W/2+130,500],[W/2+390,500]];
      const trait=(a,b)=>{ c.strokeStyle='#dee2e6'; c.lineWidth=6; c.beginPath(); c.moveTo(a[0],a[1]+30); c.lineTo(b[0],b[1]-34); c.stroke(); };
      if(T>=sFais){ baCoeur(c,R[0][0],R[0][1],40,BA_JAUNE,1); ecrire(c,'moi',R[0][0]+110,R[0][1],52,BA_JAUNE); }
      if(T>=sAmis){ const z=Math.max(1,Math.min(1.2,pop(T,sAmis))); N2.forEach(p=>{ trait(R[0],p); baCoeur(c,p[0],p[1],40,BA_ROSE,z); }); ecrire(c,'2',W/2,300,90*z,BA_JAUNE); }
      if(T>=sAutres){ const z=Math.max(1,Math.min(1.2,pop(T,sAutres))); N4.forEach((p,k)=>{ trait(N2[k>>1],p); baCoeur(c,p[0],p[1],34,BA_ROSE,z); }); }
      if(T>=sSuite) for(const p of N4) ecrire(c,'⋮',p[0],610,70,CRAIE.blanc);
      if(T>=sJour){ const z=Math.max(1,Math.min(1.15,pop(T,sJour))); ecrire(c,'chaque jour × 2',W-215,668,50*z,CRAIE.ok); }
      tab.maj(); return; }
    /* l'accroche : 2 cœurs → toute la planète, en un mois */
    if(T>=tDeux){ const z=Math.max(1,Math.min(1.2,pop(T,tDeux))); baCoeur(c,150,300,70,BA_ROSE,z); baCoeur(c,330,300,70,BA_ROSE,z); ecrire(c,'2',240,470,120*z,BA_JAUNE); }
    if(T>=tPlanete){ fleche(c,440,320,560,320,CRAIE.blanc,10); baTerre(c,790,320,200,Math.max(1,pop(T,tPlanete))); }
    if(T>=tMois){ const z=Math.max(1,pop(T,tMois)); ecrire(c,'en 1 mois',W/2+60,640,84*z,CRAIE.ok); }
    if(T>=tSi){ const z=Math.max(1,Math.min(1.2,pop(T,tSi))); ecrire(c,'?!',240,620,90*z,'#ff922b'); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const D=Object.fromEntries(ORDRE.map(k=>[k,dit(k)])), a0=D['00-accroche'], qd=D['01q-question'], rd=D['01r-reponse'];
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(si,60,58,[a0('Avec seulement 2 bonnes actions,')],[a0('je peux changer la planète entière en un mois.')],[a0('Si, si !')]),
    ...suiteDe(q,60,58,[D['01-situation']('Aujourd’hui, je fais une bonne action à 2 amis.')],[D['01-situation']('Demain, chacun en fait une'),D['01-situation']('à 2 autres personnes.')],[D['01-situation']('Et ainsi de suite, chaque jour.')]),
    ...suiteDe(pi,60,58,[D['02-premiers']('Jour 1 : 2 bonnes actions.'),D['02-premiers']('Jour 2 : 4. Jour 3 : 8.')],[D['02-premiers']('Jour 4 : 16. Jour 5 : 32.')],[D['02-premiers']('Chaque jour, le nombre double.')]),
    ...suiteDe(ec,60,58,[D['03-piege']('Ce n’est pas 2 × 5.')],[D['03-piege']('C’est 2 × 2 × 2 × 2 × 2 :'),D['03-piege']('2 puissance 5.')]),
    ...suiteDe(vi,60,58,[D['04-ecole']('Jour 7 : 128 bonnes actions.'),D['04-ecole']('Toute une école !')]),
    ...suiteDe(pa,60,58,[D['05-ville']('Jour 15 : 32 mille 768.'),D['05-ville']('Une petite ville !')]),
    ...suiteDe(mi,60,58,[D['06-paris']('Jour 21 : 2 millions 97 mille.'),D['06-paris']('À peu près tous les habitants de Paris !')]),
    ...suiteDe(pl,60,58,[D['07-milliard']('Jour 30 : plus d’1 milliard de bonnes actions,'),D['07-milliard']('en une seule journée !')]),
    ...suiteDe(ev,60,58,[D['08-planete']('Et en comptant tous les jours depuis le début,')],[D['08-planete']('au 32e jour : plus de 8 milliards.')],[D['08-planete']('Autant que d’habitants sur Terre !')]),
    ...suiteDe(com,60,58,[D['09-en-vrai']('En vrai, la chaîne se casse souvent.')],[D['09-en-vrai']('Mais c’est la force des puissances :')],[D['09-en-vrai']('ce qui double chaque jour devient gigantesque.')],[D['09-en-vrai']('Comme un virus, une rumeur…'),D['09-en-vrai']('ou une idée généreuse.')]),
    ...suiteDe(f,60,58,[D['10-question']('À toi : le 10e jour, combien de bonnes actions sont faites ce jour-là ?')],[D['10-question']('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Le 5e jour,'),qd('combien de bonnes actions'),qd('sont faites ce jour-là ?')];
  const tq=(m,n=1)=>mot('01q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse C : 32 !'), r1=rd('Regarde.');

  poserMiniature(outils,acc+1,'2 bonnes actions,<br>toute la planète'+'<div style="color:#e8590c;font-size:136px;margin-top:10px">EN 1 MOIS ?</div>',
    `<svg width="300" height="190" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#24452c" stroke="#8a5a2b" stroke-width="12"/>
      <path d="M70 150 C20 110 40 70 70 95 C100 70 120 110 70 150Z" fill="#faa2c1"/>
      <text x="70" y="190" font-family="Segoe UI" font-weight="800" font-size="34" fill="#ffd43b" text-anchor="middle">× 2</text>
      <circle cx="235" cy="105" r="72" fill="#4dabf7" stroke="#e7f5ff" stroke-width="5"/><ellipse cx="210" cy="85" rx="30" ry="21" fill="#69db7c"/><ellipse cx="262" cy="112" rx="25" ry="18" fill="#69db7c"/><ellipse cx="228" cy="140" rx="20" ry="14" fill="#69db7c"/>
      <path d="M125 105 L150 105" stroke="#f8f9fa" stroke-width="8" stroke-linecap="round"/><path d="M150 93 L165 105 L150 117Z" fill="#f8f9fa"/></svg>`);
  return { clips,FIN,titre:'Bonnes actions × 2',ceinture:1,finTitre,groupes,finClip:'11-abonne',
    cuts:[finTitre,si,q,r,pr,pi,ec,vi,pa,mi,pl,ev,com,f],
    question:{ qc:'01q-question',rc:'01r-reponse',finR:pr,cpt:fin('01q-question')+.1,bonne:2,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['10',tq('A'),tq('10')],['25',tq('B'),tq('25')],['32',tq('C'),tq('32')]],
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'C : 32 !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<pr, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<si){ T<tSi?g.montre():g.fier(); }
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<pr){ T<rR[3][1]?g.ouvre():g.pouce(); }
      else if(T<pi){ T>=pDouble?g.fier():g.montre(); }
      else if(T<ec){ T<iTok[0]?g.oups():g.montre(); }
      else if(T<vi){ T>=eEcole?g.fier():g.montre(); }
      else if(T<pa){ T>=vVille?g.fier():g.montre(); }
      else if(T<mi){ T>=aParis?g.fier():g.montre(); }
      else if(T<pl){ T>=mJournee?g.oups():g.montre(); }
      else if(T<ev){ T>=lTerre?g.fier():g.montre(); }
      else if(T<com){ if(T<nMais) g.reflechit(); else if(T<nComme) g.montre(); else g.ouvre(); }
      else if(T<f){ T<cReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
