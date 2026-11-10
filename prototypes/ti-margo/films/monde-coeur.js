/* Série « Comprendre le monde », épisode 02 : TON CŒUR (voix monde-coeur-short).
   L'article du Journal « Ton cœur bat environ 100 000 fois par jour ». On prend son pouls sur 15 s,
   on multiplie par 4 (une minute = 4 × 15 s) ; Ti Margo compte 18 → 72 par minute. Avec 70 par minute :
   70 × 60 = 4 200 en une heure ; 24 h = 1 440 min, 70 × 1 440 = 100 800 en un jour.
   Question-pause : 20 en 15 s → A : 80. En commentaire : 25 en 15 s → 100.
   Code couleur : le cœur et les battements sont rouges ; le « × 4 » est jaune. */

const CO_ROUGE='#ff6b6b', CO_JAUNE='#ffd43b';

/* Un cœur qui bat (bpm : battements par minute) ; renvoie le facteur de battement */
const coBat=(T,bpm)=>1+.14*Math.pow(Math.max(0,Math.sin(T*Math.PI*bpm/60)),6);
/* Le bras, le poignet et deux doigts posés dessus */
function coPoignet(c,x,y,s,T,z){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(s*z,s*z);
  c.fillStyle='#f3c9a5'; c.beginPath(); c.roundRect(-260,-60,520,120,60); c.fill();
  c.fillStyle='#e8b48f'; c.beginPath(); c.ellipse(-260,0,90,95,0,0,7); c.fill();   /* la paume, à gauche */
  for(const dx of [40,110]){ c.fillStyle='#f7d6b8'; c.beginPath(); c.roundRect(dx-26,-150,52,140,26); c.fill(); c.strokeStyle='#c99a77'; c.lineWidth=4; c.stroke(); }
  const b=coBat(T,72); c.strokeStyle=CO_ROUGE; c.lineWidth=6; for(const r of [70,100]){ c.globalAlpha=Math.min(1,(b-1)*7); c.beginPath(); c.arc(75,30,r*b,0.15*Math.PI,.85*Math.PI); c.stroke(); }
  c.globalAlpha=1; c.restore(); }
/* Un chronomètre rond avec sa durée */
function coChrono(c,x,y,r,txt,frac,z=1){ if(z<=0) return; r*=z; c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.fillStyle='#adb5bd'; c.fillRect(x-r*.15,y-r*1.3,r*.3,r*.25);
  c.fillStyle=CO_JAUNE; c.beginPath(); c.moveTo(x,y); c.arc(x,y,r*.86,-Math.PI/2,-Math.PI/2+frac*2*Math.PI); c.closePath(); c.fill();
  ecrire(c,txt,x,y+3,r*.62,'#212529'); }
/* Une silhouette d'enfant, le cœur, et le sang qui descend jusqu'aux orteils */
function coCorps(c,x,y,T,t0,z=1){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(z,z); c.strokeStyle='#f8f9fa'; c.lineWidth=14; c.lineCap='round';
  c.beginPath(); c.arc(0,-250,55,0,7); c.stroke();
  c.beginPath(); c.moveTo(0,-195); c.lineTo(0,20); c.moveTo(0,-140); c.lineTo(-110,-40); c.moveTo(0,-140); c.lineTo(110,-40); c.moveTo(0,20); c.lineTo(-70,230); c.moveTo(0,20); c.lineTo(70,230); c.stroke();
  baCoeur(c,-14,-110,34*coBat(T,72),CO_ROUGE,1);
  const u=Math.max(0,Math.min(1,(T-t0)/1.6)); c.strokeStyle=CO_ROUGE; c.lineWidth=7; c.setLineDash([18,14]); c.lineDashOffset=-T*60;
  for(const s of [-1,1]){ c.beginPath(); c.moveTo(-14,-90); c.lineTo(-14+s*10,20); c.lineTo(-14+s*10+(s*70)*u,20+210*u); c.stroke(); }
  c.setLineDash([]); if(u>=1) for(const s of [-1,1]){ c.fillStyle=CO_ROUGE; c.beginPath(); c.arc(s*72,236,13*coBat(T,72),0,7); c.fill(); }
  c.restore(); }

FILMS.coeur=function(outils){
  const {panneau}=outils;
  const ORDRE=['00-accroche','01-pouls','01q-question','01r-reponse','02-moi','03-heure','04-jour','05-orteils','06-sport','07-question','08-abonne'];
  const DUR={'00-accroche':13.28,'01-pouls':7.99,'01q-question':16.61,'01r-reponse':9.775,'02-moi':8.015,'03-heure':12.855,'04-jour':10.485,'05-orteils':6.96,'06-sport':6.925,'07-question':9.47,'08-abonne':6.045};
  const clips=enchainer(.4,ORDRE,DUR,{'01q-question':3.3,'01r-reponse':.4,'07-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,po,q,r,mo,he,jo,or,sp,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['08-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const CL=(window.CUES||{})[VIDEO]||{}, at=(clip,k)=>A[clip]+CL[clip][k][0];

  poserJardin();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tAuj=mot('00-accroche','Aujourd\'hui'), tCent=at('00-accroche',12), tSans=mot('00-accroche','Sans'), tCompte=mot('00-accroche','compte');
  const finTitre=tAuj-.08;
  const pPose=at('01-pouls',0), pPoignet=mot('01-pouls','poignet'), pSens=mot('01-pouls','sens'), p15=at('01-pouls',14);
  const m18=at('02-moi',3), mFois=at('02-moi',7), m4=at('02-moi',9), m72=at('02-moi',10);
  const h70=at('03-heure',4), hHeure=mot('03-heure','heure'), h60=at('03-heure',14), hT=[16,17,18,19,21].map(k=>at('03-heure',k));
  const jJour=mot('04-jour','journée'), j24=at('04-jour',4), j1440=at('04-jour',7), jT=[12,13,14,18,20].map(k=>at('04-jour',k));
  const oSang=mot('05-orteils','sang'), oOrteils=mot('05-orteils','orteils'), oQuel=mot('05-orteils','Quel');
  const sFais=mot('06-sport','Fais'), sVite=mot('06-sport','vite'), sBouger=mot('06-sport','Bouger'), sFort=mot('06-sport','fort');
  const c15=at('07-question',3), c25=at('07-question',8), cCombien=mot('07-question','Combien'), cReponds=mot('07-question','Réponds');

  /* Une ligne de jetons écrits chacun à son instant, centrée en x */
  function ligne(c,T,toks,x,y,taille){ c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width);
    let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
    toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; }); }
  const Z=(T,t)=>T>=t?Math.max(1,Math.min(1.2,pop(T,t))):0;

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 25 en 15 s, rien de la réponse */
      coChrono(c,230,250,110,'15 s',1,Z(T,c15));
      if(T>=c25){ baCoeur(c,560,250,60*coBat(T,100),CO_ROUGE,1); ecrire(c,'25',760,250,150*Math.max(1,Math.min(1.15,pop(T,c25))),CO_JAUNE); }
      if(T>=cCombien) ecrire(c,'par minute ?',W/2+150,520,92*Math.max(1,Math.min(1.12,pop(T,cCombien))),CRAIE.blanc);
      tab.maj(); return; }
    if(T>=sp){ /* bouger : 30 sauts, le cœur s'emballe */
      const vite=T>=sVite?150:72;
      if(T>=sFais){ ecrire(c,'30 sauts',W/2,90,96,CO_JAUNE); }
      if(T>=sFais) baCoeur(c,W/2+200,340,95*coBat(T,vite),CO_ROUGE,1);
      if(T>=sVite) ecrire(c,'plus vite !',W/2+200,520,70*Math.max(1,Math.min(1.15,pop(T,sVite))),CRAIE.faux);
      if(T>=sFort) ecrire(c,'plus fort !',W/2+200,630,76*Math.max(1,pop(T,sFort)),CRAIE.ok);
      tab.maj(); return; }
    if(T>=or){ /* le sang jusqu'aux orteils */
      coCorps(c,W/2+180,400,T,oSang,1);
      if(T>=oOrteils) ecrire(c,'jusqu’aux orteils !',W/2-210,150,54*Math.max(1,Math.min(1.15,pop(T,oOrteils))),CO_ROUGE);
      if(T>=oQuel) ecrire(c,'Quel travailleur !',W/2-210,260,54,CO_JAUNE);
      tab.maj(); return; }
    if(T>=jo){ /* une journée */
      ligne(c,T,[[jJour,'1 jour'],[j24,'='],[j24,'24 heures',CRAIE.grand]],W/2,95,78);
      ligne(c,T,[[j1440,'='],[j1440,'1 440 minutes',CRAIE.grand]],W/2+40,215,78);
      ligne(c,T,[[jT[0],'70'],[jT[1],'×'],[jT[2],'1 440'],[jT[3],'='],[jT[3],'100 800',CO_JAUNE]],W/2,400,96);
      if(T>=jT[4]){ baCoeur(c,W/2-300,560,46*coBat(T,72),CO_ROUGE,1); ecrire(c,'battements !',W/2+70,560,76*Math.max(1,Math.min(1.12,pop(T,jT[4]))),CO_ROUGE); }
      tab.maj(); return; }
    if(T>=he){ /* une heure */
      if(T>=h70){ baCoeur(c,180,100,40*coBat(T,70),CO_ROUGE,1); ecrire(c,'70 par minute',W/2+60,100,76*Math.max(1,Math.min(1.12,pop(T,h70))),CRAIE.blanc); }
      ligne(c,T,[[hHeure,'1 heure'],[h60,'='],[h60,'60 minutes',CRAIE.grand]],W/2,250,78);
      ligne(c,T,[[hT[0],'70'],[hT[1],'×'],[hT[2],'60'],[hT[3],'='],[hT[3],'4 200',CO_JAUNE]],W/2,450,110);
      tab.maj(); return; }
    if(T>=mo){ /* Ti Margo : 18 en 15 s, × 4 = 72 ; la minute coupée en 4 quarts */
      const X0=110, Lb=W-220, y=150;
      for(let k=0;k<4;k++){ const on=k===0?T>=m18:T>=mFois+k*.18; c.fillStyle=on?'#c92a2a':'#3b5249'; c.fillRect(X0+k*Lb/4+6,y-60,Lb/4-12,120);
        if(on){ ecrire(c,'15 s',X0+(k+.5)*Lb/4,y-22,40,'#ffe3e3'); ecrire(c,'18',X0+(k+.5)*Lb/4,y+28,62,CRAIE.blanc); } }
      if(T>=m18) ecrire(c,'1 minute',W/2,y+110,50,CRAIE.grand);
      ligne(c,T,[[mFois,'18'],[mFois+.2,'×'],[m4,'4',CO_JAUNE],[m72,'='],[m72,'72',CO_ROUGE]],W/2,430,130);
      if(T>=m72) ecrire(c,'par minute',W/2,590,66,CRAIE.blanc);
      tab.maj(); return; }
    if(T>=po){ /* le pouls : deux doigts sur le poignet, le chrono de 15 s */
      coPoignet(c,W/2-90,430,1,T,Z(T,pPose));
      if(T>=pSens) baCoeur(c,W/2-80,150,55*coBat(T,72),CO_ROUGE,1);
      if(T>=p15) coChrono(c,W-150,180,100,'15 s',Math.min(1,(T-p15)/2),1);
      tab.maj(); return; }
    /* l'accroche : un cœur qui bat, 100 000 fois */
    if(T>=tAuj) baCoeur(c,W/2,240,110*coBat(T,72),CO_ROUGE,1);
    if(T>=tCent){ const z=Math.max(1,Math.min(1.15,pop(T,tCent))); ecrire(c,'100 000 fois',W/2,470,130*z,CO_JAUNE); ecrire(c,'par jour',W/2,600,70,CRAIE.blanc); }
    if(T>=tCompte) ecrire(c,'On compte !',W/2+300,90,58,CRAIE.ok);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const D=Object.fromEntries(ORDRE.map(k=>[k,dit(k)])), a0=D['00-accroche'], qd=D['01q-question'], rd=D['01r-reponse'], d4=D['04-jour'];
  const joint=(...ps)=>[ps[0][0],ps[ps.length-1][1],ps.map(p=>p[2]).join(' '),ps.flatMap(p=>p[3])];
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(po,60,58,[a0('Aujourd’hui, ton cœur va battre plus de 100 mille fois.')],[a0('Sans que tu y penses !')],[a0('Tu ne me crois pas ? On compte.')]),
    ...suiteDe(q,60,58,[D['01-pouls']('Pose 2 doigts sur ton poignet.'),D['01-pouls']('Tu sens ton cœur ?')],[D['01-pouls']('Compte tes battements pendant 15 secondes.')]),
    ...suiteDe(he,60,58,[D['02-moi']('Moi, j’en compte 18 en 15 secondes.')],[D['02-moi']('18 × 4 : 72 battements par minute.')]),
    ...suiteDe(jo,60,58,[D['03-heure']('Pour compter facilement,'),D['03-heure']('disons 70 battements par minute.')],[D['03-heure']('En une heure, il y a 60 minutes.')],[D['03-heure']('70 × 60 : 4 mille 200 battements !')]),
    ...suiteDe(or,60,58,[d4('Et une journée, c’est 24 heures,'),(()=>{ const p=d4('donc 1 440 minutes.'); d4.saute(1); return p; })()],
      [(()=>{ const p1=d4('70 × 1 440 :'); d4.saute(1); return joint(p1,d4('100 mille 800 battements !')); })()]),
    ...suiteDe(sp,60,58,[D['05-orteils']('Et à chaque battement, ton cœur envoie du sang'),D['05-orteils']('jusqu’au bout de tes orteils.')],[D['05-orteils']('Quel travailleur !')]),
    ...suiteDe(com,60,58,[D['06-sport']('Fais 30 sauts sur place :'),D['06-sport']('ton cœur bat plus vite.')],[D['06-sport']('Bouger chaque jour le rend plus fort !')]),
    ...suiteDe(f,60,58,[D['07-question']('À toi : en 15 secondes, un cœur bat 25 fois.')],[D['07-question']('Combien de battements par minute ?')],[D['07-question']('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('En 15 secondes,'),qd('tu comptes 20 battements.'),qd('Combien de battements'),qd('par minute ?')];
  const tq=(m,n=1)=>mot('01q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse A : 80 !'), r1=rd('Dans une minute,'), r1b=rd('il y a 4 × 15 secondes.'), r2=rd('Donc 20 × 4 = 80.');

  poserMiniature(outils,acc+1,'Ton cœur bat<br>100 000 fois'+'<div style="color:#e8590c;font-size:136px;margin-top:10px">PAR JOUR ?</div>',
    `<svg width="300" height="190" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#24452c" stroke="#8a5a2b" stroke-width="12"/>
      <path d="M95 165 C15 105 40 40 95 80 C150 40 175 105 95 165Z" fill="#ff6b6b"/>
      <text x="245" y="95" font-family="Segoe UI" font-weight="800" font-size="40" fill="#f8f9fa" text-anchor="middle">15 s</text>
      <text x="245" y="160" font-family="Segoe UI" font-weight="800" font-size="52" fill="#ffd43b" text-anchor="middle">× 4</text></svg>`);
  return { clips,FIN,titre:'Ton cœur, 100 000 fois',ceinture:1,finTitre,groupes,finClip:'08-abonne',
    cuts:[finTitre,po,q,r,mo,he,jo,or,sp,com,f],
    question:{ qc:'01q-question',rc:'01r-reponse',finR:mo,cpt:fin('01q-question')+.1,bonne:0,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['80',tq('A'),tq('80')],['35',tq('B'),tq('35')],['60',tq('C'),tq('60')]],
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'A : 80 !']],reponse:[r1,r1b],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<mo, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      /* les 30 sauts : Ti Margo saute sur place */
      if(T>=sFais&&T<sBouger) scene.y=Math.abs(Math.sin((T-sFais)*Math.PI*2.2))*.45;

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<po){ T>=tSans?g.fier():g.montre(); }
      else if(T<q){ T<pSens?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<mo){ T<rR[3][1]?g.ouvre():g.pouce(); }
      else if(T<he){ T>=m72?g.fier():g.montre(); }
      else if(T<jo){ T>=hT[3]?g.fier():g.montre(); }
      else if(T<or){ T>=jT[3]?g.oups():g.montre(); }
      else if(T<sp){ T>=oQuel?g.pouce():g.montre(); }
      else if(T<com){ if(T<sBouger) g.ouvre(); else T>=sFort?g.fier():g.montre(); }
      else if(T<f){ T<cReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
