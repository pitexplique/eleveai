/* ============================================================
   Série Contenance CM2, ÉPISODE 01 : 33 cL OU 0,5 L ? (ceinture blanche, règle des shorts CM2).
   Outils : films/cm2-commun.js + cm2-contenance.js (bouteilleCraie, recipientCraie, JUS, EAU, VERRE).
   Au snack, même prix : une canette de 33 cL ou une bouteille de 0,5 L. « 33, c'est bien plus que 0,5 : je prends la canette ! »
   L'étiquette : 0,5 L, c'est combien de cL ? Réponse B : 0,5 L = un demi-litre = 50 cL ; 50 contre 33 : 17 cL de plus.
   Commentaire : un seau de 1,25 L et une casserole de 130 cL. Lequel contient le plus ? (jamais tranché à l'écran)
   ============================================================ */
/* L'ardoise fait 1056 × 720 : les deux récipients à gauche, À L'ÉCHELLE (même largeur, CN_K px de liquide par cL :
   même contenance = même niveau), le texte à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const CN_K=5, CN_Y=600, CN_W=130, CN_XC=150, CN_XB=360, CN_XR=790, CN_NIV=.9;
const CN_HC=8+33*CN_K/CN_NIV, CN_HB=8+50*CN_K/CN_NIV;            /* hauteur du corps : canette (33 cL), bouteille (50 cL) */
const CN_Y33=CN_Y-6-33*CN_K, CN_Y50=CN_Y-6-50*CN_K;              /* le haut du liquide : 33 cL, 50 cL */
const CN_ROUGE='#ff8787';

/* Les nombres répétés par la voix (« 0,5 » × 3, « 1,25 » × 3, « 130 » × 2) : une seule marque, la première */
function cnUneMarque(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const [t,w] of CL[k]){ const d=res[res.length-1];
      if(d&&/^\d+(,\d+)?\s*$/.test(w)&&d[1].trim()===w.trim()) continue; res.push([t,w]); }
    CL[k]=res; } }

/* Une canette à la craie : (x, yBas) = le milieu du fond, w × h = le corps, niv = le liquide (0 → 1), z = l'apparition */
function cnCanette(c,x,yBas,w,h,niv=CN_NIV,coul=JUS,z=1){ if(z<=0) return; const k=Math.min(1.15,z);
  w*=k; h*=k; const g=x-w/2, r=Math.min(14*k,w/5), hl=(h-8)*niv, ep=14*k;
  c.fillStyle=coul; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.strokeStyle=CN_ROUGE; c.lineWidth=6; c.lineJoin='round'; c.beginPath();
  c.moveTo(g+r,yBas); c.lineTo(g+w-r,yBas); c.quadraticCurveTo(g+w,yBas,g+w,yBas-r); c.lineTo(g+w,yBas-h);
  c.lineTo(x+w*.4,yBas-h-ep); c.lineTo(x-w*.4,yBas-h-ep); c.lineTo(g,yBas-h); c.lineTo(g,yBas-r); c.quadraticCurveTo(g,yBas,g+r,yBas); c.stroke();
  /* la languette */
  c.strokeStyle=VERRE; c.lineWidth=4; c.beginPath(); c.ellipse(x+w*.12,yBas-h-ep-7*k,13*k,6*k,0,0,7); c.stroke(); }

/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function cnProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
/* Une ellipse tracée de u = 0 à 1 */
function cnEllipse(c,x,y,rx,ry,coul,u){ if(u<=0) return; c.strokeStyle=coul; c.lineWidth=9; c.lineCap='round';
  c.beginPath(); c.ellipse(x,y,rx,ry,0,-Math.PI/2,-Math.PI/2+2*Math.PI*Math.min(1,u)); c.stroke(); }
/* L'étiquette du vendeur : un carton percé, attaché au goulot de la bouteille */
function cnEtiquette(c,x,y,z){ if(z<=0) return; const k=Math.min(1.15,z), w=300*k, h=150*k;
  c.strokeStyle=CRAIE.gris; c.lineWidth=4; c.setLineDash([10,8]); c.beginPath(); c.moveTo(CN_XB+CN_W*.18,CN_Y-CN_HB*1.2); c.lineTo(x-w/2+30*k,y); c.stroke(); c.setLineDash([]);
  c.fillStyle='#f8f9fa'; c.strokeStyle='#adb5bd'; c.lineWidth=5; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,18*k); c.fill(); c.stroke();
  c.fillStyle='#1f3b2c'; c.beginPath(); c.arc(x-w/2+30*k,y,11*k,0,7); c.fill(); }
/* Une étoile jaune (la canette rejoint la collection) */
function cnEtoile(c,x,y,r){ if(r<=0) return; c.fillStyle=CRAIE.jaune; c.beginPath();
  for(let i=0;i<10;i++){ const a=-Math.PI/2+i*Math.PI/5, rr=i%2?r*.45:r; c.lineTo(x+rr*Math.cos(a),y+rr*Math.sin(a)); } c.closePath(); c.fill(); }
/* Une casserole à la craie : (x, yBas) = le milieu du fond, le manche part à gauche */
function cnCasserole(c,x,yBas,w,h,niv,coul=EAU,z=1){ if(z<=0) return; const k=Math.min(1.15,z); w*=k; h*=k; const g=x-w/2, hl=(h-8)*niv;
  c.fillStyle=coul; c.globalAlpha=.9; c.fillRect(g+6,yBas-6-hl,w-12,hl); c.globalAlpha=1;
  c.strokeStyle=VERRE; c.lineWidth=6; c.lineJoin='round'; c.beginPath(); c.roundRect(g,yBas-h,w,h,[4,4,16,16]); c.stroke();
  c.fillStyle='#495057'; c.strokeStyle=VERRE; c.lineWidth=4; c.beginPath(); c.roundRect(g-92*k,yBas-h+16*k,92*k,20*k,10*k); c.fill(); c.stroke(); }

FILMS['comparer']=function(outils){
  cnUneMarque();
  const DUR={'00-accroche':12.94,'01-etiquette':6.38,'02-question':12.64,'02b-reponse':12.45,'03-ouf':3.54,'04-commentaire':10.71,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,eti,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tUne=mot('00-accroche','une'), tCan=mot('00-accroche','canette'), t33=mot('00-accroche','33'), tCl=mot('00-accroche','centilitres'),
        tBout=mot('00-accroche','bouteille'), t05=mot('00-accroche','0,5'), tL=mot('00-accroche','litre'),
        t33b=mot('00-accroche','33',2), tPlus=mot('00-accroche','plus'), t05b=mot('00-accroche','0,5',2),
        tPrends=mot('00-accroche','prends'), tCan2=mot('00-accroche','canette',2);
  const eEtiq=mot('01-etiquette',"l'étiquette"), e05=mot('01-etiquette','0,5'), eL=mot('01-etiquette','litre'),
        eCombien=mot('01-etiquette','combien'), eCl=mot('01-etiquette','centilitres');
  const rB=mot('02b-reponse','B'), r50=mot('02b-reponse','50'), rCl=mot('02b-reponse','centilitres'),
        r50c=mot('02b-reponse','contre'), rContre=mot('02b-reponse','contre',2), r33=mot('02b-reponse','33'),
        r17=mot('02b-reponse','17'), rCl17=mot('02b-reponse','centilitres',2);
  const tGarde=mot('03-ouf','garde'), tColl=mot('03-ouf','collection');
  const cSeau=mot('04-commentaire','seau'), c125=mot('04-commentaire','1,25'), cL=mot('04-commentaire','litre'),
        cCass=mot('04-commentaire','casserole'), c130=mot('04-commentaire','130'), cCl=mot('04-commentaire','centilitres'),
        cLeq=mot('04-commentaire','Lequel'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tUne-.08, finR=r50-.08;
  const monte=(T,t0,t1)=>CN_NIV*lisse((T-t0)/Math.max(.3,t1-t0));

  /* la canette et la bouteille, à l'échelle ; le liquide monte pendant que la voix dit la contenance */
  function recipients(c,T){
    if(T>=tCan){ const zc=T>=tGarde&&T<com?1+.12*Math.sin(Math.min(1,(T-tGarde)/.6)*Math.PI):zoom(T,tCan,.4);
      cnCanette(c,CN_XC,CN_Y,CN_W,CN_HC,T>=t33?monte(T,t33,tCl+.4):0,JUS,zc); }
    if(T>=tBout) bouteilleCraie(c,CN_XB,CN_Y,CN_W,CN_HB,T>=t05?monte(T,t05,tL+.3):0,JUS,zoom(T,tBout,.4));
    if(T>=t33) cnProg(c,[[t33,'33'],[tCl,'33 cL']],T,CN_XC,660,50,CRAIE.jaune);
    if(T>=rCl) cnProg(c,[[rCl,'50 cL']],T,CN_XB,660,50*zoom(T,rCl,.4),CRAIE.ok);
    else if(T>=t05) cnProg(c,[[t05,'0,5'],[tL,'0,5 L']],T,CN_XB,660,50,CRAIE.jaune); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un seau de 1,25 L, une casserole de 130 cL */
      if(T>=cSeau) recipientCraie(c,'seau',180,CN_Y,180,230,T>=c125?.8*lisse((T-c125)/(cL+.3-c125)):0,EAU,zoom(T,cSeau,.4));
      if(T>=c125) cnProg(c,[[c125,'1,25'],[cL,'1,25 L']],T,180,660,50,CRAIE.jaune);
      if(T>=cCass) cnCasserole(c,500,CN_Y,170,170,T>=c130?.8*lisse((T-c130)/(cCl+.3-c130)):0,EAU,zoom(T,cCass,.4));
      if(T>=c130) cnProg(c,[[c130,'130'],[cCl,'130 cL']],T,500,660,50,CRAIE.jaune);
      if(T>=cLeq) ecrire(c,'?',CN_XR,380,240*zoom(T,cLeq,.6),CRAIE.jaune);
      tab.maj(); return; }
    recipients(c,T);
    if(T<eti){ /* « 33, c'est bien plus que 0,5 : je prends la canette ! » */
      if(T>=t33b) cnProg(c,[[t33b,'33'],[tPlus,'33 >'],[t05b,'33 > 0,5']],T,CN_XR,300,100,CRAIE.faux);
      if(T>=tCan2) cnEllipse(c,CN_XC,CN_Y-CN_HC/2-18,105,CN_HC/2+14,CRAIE.faux,(T-tCan2)/.5);
      tab.maj(); return; }
    if(T<q){ /* l'étiquette : 0,5 L, c'est combien de cL ? */
      if(T>=eEtiq){ cnEtiquette(c,CN_XR,190,zoom(T,eEtiq,.4));
        if(T>=e05) cnProg(c,[[e05,'0,5'],[eL,'0,5 L']],T,CN_XR+28,192,76,'#1f3b2c'); }
      if(T>=eCombien) cnProg(c,[[eCombien,'= ?'],[eCl,'= ? cL']],T,CN_XR,420,96,CRAIE.jaune);
      tab.maj(); return; }
    /* la réponse : 0,5 L = 50 cL ; 50 > 33 ; la bouteille a 17 cL de plus (la part en trop surlignée) */
    if(T>=r33){ c.strokeStyle=CRAIE.jaune; c.lineWidth=5; c.setLineDash([16,12]); c.beginPath(); c.moveTo(CN_XC-CN_W/2-15,CN_Y33); c.lineTo(CN_XB+CN_W/2+15,CN_Y33); c.stroke(); c.setLineDash([]); }
    if(T>=r17){ c.fillStyle=CRAIE.ok; c.globalAlpha=.85*Math.min(1,(T-r17)/.4); c.fillRect(CN_XB-CN_W/2+6,CN_Y50,CN_W-12,CN_Y33-CN_Y50); c.globalAlpha=1; }
    ecrire(c,'0,5 L',CN_XR,110,64,CRAIE.jaune);
    if(T>=r50) cnProg(c,[[r50,'= 50'],[rCl,'= 50 cL']],T,CN_XR,200,70,CRAIE.ok);
    if(T>=r50c) cnProg(c,[[r50c,'50'],[rContre,'50 >'],[r33,'50 > 33']],T,CN_XR,330,84,CRAIE.blanc);
    if(T>=r17) cnProg(c,[[r17,'+ 17'],[rCl17,'+ 17 cL']],T,CN_XR,460,72,CRAIE.ok);
    if(T>=ouf) coche(c,CN_XB+85,CN_Y50+10,.45);
    if(T>=tColl) cnEtoile(c,CN_XC,CN_Y-CN_HC-75,38*zoom(T,tColl,.5));
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-etiquette'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Au snack, même prix :')),
    ...suiteDe(eti,60,62,[a0('une canette'),a0('de 33 centilitres,')],[a0('ou une bouteille'),a0('de 0,5 litre.')],
      [a0("33, c'est bien plus"),a0('que 0,5 :')],[a0('je prends la canette !')]),
    ...suiteDe(q,60,62,[a1('Le vendeur me montre'),a1("l'étiquette :")],[a1('0,5 litre…'),a1("c'est combien"),a1('de centilitres ?')])
  ];
  qd('Question !');
  const phraseQ=[qd("Qu'est-ce qui contient"),qd('le plus ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte ; l'explication passe sur l'ardoise */
  rd.saute(2); const r1=rd('0,5 litre,'), r2=rd("c'est un demi-litre :");
  groupes.push(...suiteDe(ouf,60,62,[rd('50 centilitres.')],[rd('50 contre 33 :')],[rd('la bouteille contient'),rd('17 centilitres de plus.')]),
    ...suiteDe(com,60,62,[a3('Bon… je garde la canette'),a3('pour ma collection !')]),
    ...suiteDe(f,60,60,[a4('À toi : un seau'),a4('de 1,25 litre,')],[a4('et une casserole'),a4('de 130 centilitres.')],
      [a4('Lequel contient'),a4('le plus ?')],[a4('Réponds en commentaire !')]));
  const tq=(m,n=1)=>mot('02-question',m,n)-q;

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="44" y="138" width="56" height="74" fill="#ff922b"/><path d="M38 212 V128 L50 118 H94 L106 128 V212 Z" fill="none" stroke="#ff8787" stroke-width="6" stroke-linejoin="round"/>`+
    `<rect x="136" y="98" width="56" height="114" fill="#ff922b"/><path d="M130 212 V86 L152 70 V58 H170 V70 L192 86 V212 Z" fill="none" stroke="#dee2e6" stroke-width="6" stroke-linejoin="round"/>`+
    `<rect x="148" y="50" width="22" height="10" fill="#2f9e44"/>`+
    `<text x="265" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'33 cL ou 0,5 L :<br>qui a le plus ?'+PARI,mini);
  return { clips,FIN,titre:'33 cL ou 0,5 L ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,eti,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:rB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['la canette',tq('A'),tq('canette')],['la bouteille',tq('B'),tq('bouteille')],["c'est pareil",tq('C'),tq('pareil')]],
      tete:[[r+.1,'Réponse '],[rB,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<eti){ T<tPrends?g.montre():g.fier(); }
      else if(T<q){ T<eCombien?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<rB?g.ouvre():g.oups(); }
      else if(T<ouf){ T<rCl17+.3?g.montre():g.oups(); }
      else if(T<com){ T<tGarde?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
