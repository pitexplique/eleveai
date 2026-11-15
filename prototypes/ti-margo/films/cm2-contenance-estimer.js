/* ============================================================
   Série Contenance CM2, ÉPISODE 03 : UN PARFUM DE 50… QUOI ? (ceinture blanche, règle des shorts CM2).
   Outils : films/cm2-commun.js + cm2-contenance.js (cuillereCraie, VERRE).
   Ti Margo achète un parfum pour Maman. Sur la boîte : 50. « 50 litres ! » Il prévoit une brouette (énorme)…
   la vendeuse lui tend une toute petite boîte. Réponse A : 50 mL (un flacon tient dans la main), 10 cuillères à café.
   Il range la brouette : le cadeau tient dans sa poche. Commentaire : un arrosoir contient 10… mL, cL ou L ? (jamais tranché)
   ============================================================ */
/* L'ardoise fait 1056 × 720 : les dessins à gauche (la brouette, énorme ; le flacon, minuscule), le texte à droite
   (Ti Margo cache le bas du milieu de l'ardoise) */
const ES_XR=790, ES_BX=790, ES_BY=300, ES_BW=280, ES_BH=190, ES_FX=232, ES_FY=582, ES_PX=300, ES_PY=330;
const ES_ROSE='#f783ac', ES_ROSE_F='#d6336c', ES_FER='#74b816';

/* Les nombres répétés par la voix : une seule marque, la première (filet de sécurité, les cues ne sont pas modifiés) */
function esUneMarque(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const [t,w] of CL[k]){ const d=res[res.length-1];
      if(d&&/^\d+(,\d+)?\s*$/.test(w)&&d[1].trim()===w.trim()) continue; res.push([t,w]); }
    CL[k]=res; } }

/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function esProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }

/* La boîte du parfum : (x, yBas) = le milieu du fond, w × h, k = l'échelle (elle rétrécit), avec « 50 » dessus */
function esBoite(c,x,yBas,w,h,k,ecrit,z=1){ if(z<=0||k<=0) return; const kz=Math.min(1.15,z); w*=k*kz; h*=k*kz; const g=x-w/2, y=yBas-h;
  c.fillStyle=ES_ROSE_F; c.strokeStyle=VERRE; c.lineWidth=Math.max(2,6*k); c.lineJoin='round';
  c.beginPath(); c.roundRect(g,y,w,h,10*k); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(g,y+h*.2); c.lineTo(g+w,y+h*.2); c.stroke();                         /* le couvercle */
  /* le nœud, sur le dessus */
  c.fillStyle=CRAIE.jaune; c.strokeStyle='#f59f00'; c.lineWidth=Math.max(1.5,4*k);
  for(const s of [-1,1]){ c.beginPath(); c.ellipse(x+s*w*.1,y-h*.09,w*.1,h*.09,s*.5,0,7); c.fill(); c.stroke(); }
  c.beginPath(); c.arc(x,y-h*.04,Math.max(3,h*.06),0,7); c.fill(); c.stroke();
  if(ecrit) ecrire(c,'50',x,y+h*.6,h*.5,CRAIE.blanc); }

/* La brouette, énorme : dx = le décalage (elle part à gauche quand on la range), z = l'apparition */
function esBrouette(c,dx,z=1,a=1){ if(z<=0||a<=0) return; const k=Math.min(1.12,z); c.save(); c.globalAlpha=a; c.translate(dx+260,480); c.scale(k,k); c.translate(-260,-560);
  c.lineJoin='round'; c.lineCap='round';
  /* les brancards et la béquille */
  c.strokeStyle='#ced4da'; c.lineWidth=12; c.beginPath(); c.moveTo(455,615); c.lineTo(60,520); c.lineTo(8,512); c.stroke();
  c.lineWidth=10; c.beginPath(); c.moveTo(175,555); c.lineTo(160,662); c.lineTo(130,662); c.stroke();
  /* la caisse */
  c.fillStyle='#2b8a3e'; c.globalAlpha=.55*a; c.beginPath(); c.moveTo(60,360); c.lineTo(505,360); c.lineTo(420,560); c.lineTo(150,560); c.closePath(); c.fill(); c.globalAlpha=a;
  c.strokeStyle=ES_FER; c.lineWidth=9; c.stroke();
  c.lineWidth=12; c.beginPath(); c.moveTo(48,360); c.lineTo(517,360); c.stroke();                /* le rebord */
  /* la roue */
  c.fillStyle='#343a40'; c.strokeStyle='#ced4da'; c.lineWidth=9; c.beginPath(); c.arc(455,615,52,0,7); c.fill(); c.stroke();
  c.fillStyle='#ced4da'; c.beginPath(); c.arc(455,615,11,0,7); c.fill();
  c.restore(); }

/* Le flacon de parfum, minuscule : (x, yBas) = le milieu du fond, s = l'échelle */
function esFlacon(c,x,yBas,s=1,z=1){ if(z<=0) return; s*=Math.min(1.15,z); const w=42*s, h=46*s, g=x-w/2, y=yBas-h;
  c.fillStyle=ES_ROSE; c.globalAlpha=.9; c.beginPath(); c.roundRect(g+4*s,y+12*s,w-8*s,h-16*s,6*s); c.fill(); c.globalAlpha=1;
  c.strokeStyle=VERRE; c.lineWidth=4*s; c.lineJoin='round'; c.beginPath(); c.roundRect(g,y,w,h,10*s); c.stroke();
  c.fillStyle=VERRE; c.fillRect(x-6*s,y-9*s,12*s,9*s);                                               /* le col */
  c.fillStyle=CRAIE.jaune; c.beginPath(); c.roundRect(x-11*s,y-24*s,22*s,16*s,4*s); c.fill(); }      /* le bouchon */

/* La poche du jean : (x, y) = le haut du milieu */
function esPoche(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.12,z), w=190*k, h=170*k, g=x-w/2;
  c.fillStyle='#1971c2'; c.strokeStyle='#a5d8ff'; c.lineWidth=6; c.lineJoin='round';
  c.beginPath(); c.moveTo(g,y); c.lineTo(g+w,y); c.lineTo(g+w,y+h*.7); c.lineTo(x,y+h); c.lineTo(g,y+h*.7); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle='#ffd8a8'; c.lineWidth=3; c.setLineDash([9,7]); c.beginPath();
  c.moveTo(g+12,y+12); c.lineTo(g+w-12,y+12); c.lineTo(g+w-12,y+h*.7-6); c.lineTo(x,y+h-14); c.lineTo(g+12,y+h*.7-6); c.closePath(); c.stroke(); c.setLineDash([]); }

/* Un arrosoir à la craie (vide : on ne donne pas la réponse) : (x, yBas) = le milieu du fond ; le bec part à gauche */
function esArrosoir(c,x,yBas,z=1){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x,yBas); c.scale(k,k);
  c.strokeStyle='#8ce99a'; c.lineWidth=7; c.lineJoin='round'; c.lineCap='round';
  c.fillStyle='#2b8a3e'; c.globalAlpha=.5; c.beginPath(); c.moveTo(-110,0); c.lineTo(110,0); c.lineTo(95,-220); c.lineTo(-95,-220); c.closePath(); c.fill(); c.globalAlpha=1; c.stroke();
  c.beginPath(); c.moveTo(-100,-60); c.lineTo(-250,-250); c.stroke();                               /* le bec */
  c.fillStyle='#2b8a3e'; c.beginPath(); c.ellipse(-258,-260,34,14,-.9,0,7); c.fill(); c.stroke();   /* la pomme */
  c.lineWidth=9; c.beginPath(); c.moveTo(-60,-220); c.bezierCurveTo(-60,-320,80,-320,80,-220); c.stroke();  /* l'anse */
  c.restore(); }

FILMS['estimer']=function(outils){
  esUneMarque();
  const DUR={'00-accroche':10.31,'01-boite':3.6,'02-question':14.8,'02b-reponse':7.7,'03-ouf':4.7,'04-commentaire':7.91,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,boi,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tSur=mot('00-accroche','Sur'), tBoite=mot('00-accroche','boîte'), t50=mot('00-accroche','50'), t50b=mot('00-accroche','50',2),
        tLitres=mot('00-accroche','litres',2), tBesoin=mot('00-accroche','besoin'), tBrou=mot('00-accroche','brouette');
  const bTend=mot('01-boite','tend'), bPetite=mot('01-boite','petite');
  const rA=mot('02b-reponse','A'), r50=mot('02b-reponse','50'), rMl=mot('02b-reponse','millilitres'), r10=mot('02b-reponse','10'),
        rCuil=mot('02b-reponse','cuillères'), rCafe=mot('02b-reponse','café');
  const oRange=mot('03-ouf','range'), oBrou=mot('03-ouf','brouette'), oCadeau=mot('03-ouf','cadeau'), oPoche=mot('03-ouf','poche');
  const cArros=mot('04-commentaire','arrosoir'), c10=mot('04-commentaire','10'), cMl=mot('04-commentaire','millilitres'),
        cCl=mot('04-commentaire','centilitres'), cL=mot('04-commentaire','litres'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tSur-.08, finR=r50-.08;

  /* la boîte : grande quand Ti Margo l'imagine, toute petite quand la vendeuse la tend */
  const echBoite=T=>T<bPetite?1:1-.7*lisse((T-bPetite)/.7);

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un arrosoir contient 10… mL, cL ou L ? */
      if(T>=cArros) esArrosoir(c,350,575,zoom(T,cArros,.4));
      if(T>=c10) ecrire(c,'10 …',ES_XR,130,110*zoom(T,c10,.4),CRAIE.jaune);
      if(T>=cMl) ecrire(c,'mL ?',ES_XR,280,84*zoom(T,cMl,.4),CRAIE.blanc);
      if(T>=cCl) ecrire(c,'cL ?',ES_XR,400,84*zoom(T,cCl,.4),CRAIE.blanc);
      if(T>=cL) ecrire(c,'L ?',ES_XR,520,84*zoom(T,cL,.4),CRAIE.blanc);
      tab.maj(); return; }
    /* la brouette, énorme (elle part quand on la range) */
    const ur=T>=oRange?lisse((T-oRange)/Math.max(.6,oBrou+.6-oRange)):0;   /* elle glisse un peu et s'efface */
    if(T>=tBrou&&ur<1) esBrouette(c,-120*ur,zoom(T,tBrou,.4),1-ur);
    if(T<q){ /* « Sur la boîte : 50. 50 litres ! » ; la boîte rétrécit quand la vendeuse la tend */
      if(T>=tBoite) esBoite(c,ES_BX,ES_BY,ES_BW,ES_BH,echBoite(T),T>=t50,zoom(T,tBoite,.4));
      if(T>=t50b) esProg(c,[[t50b,'50'],[tLitres,'50 L ?!']],T,ES_XR,450,100,CRAIE.faux);
      tab.maj(); return; }
    /* la réponse : le flacon, minuscule (sous la brouette) ; 50 mL = 10 cuillères à café */
    if(T<oPoche) esFlacon(c,ES_FX,ES_FY,1.1,zoom(T,finR,.5));
    if(T>=r50) esProg(c,[[r50,'50'],[rMl,'50 mL']],T,ES_XR,110,88,CRAIE.ok);
    if(T>=r10) esProg(c,[[r10,'= 10'],[rCuil,'= 10 cuillères']],T,ES_XR,225,64,CRAIE.jaune);
    if(T>=rCafe) ecrire(c,'à café',ES_XR,305,64*zoom(T,rCafe,.4),CRAIE.jaune);
    if(T>=rCuil) for(let i=0;i<10;i++){ const ti=rCuil+i*.09; if(T<ti) break;
      cuillereCraie(c,565+(i%5)*98,425+Math.floor(i/5)*95,.5,ES_ROSE,zoom(T,ti,.4)); }
    /* ouf : la brouette part ; le flacon (le cadeau) tient dans la poche */
    if(T>=oPoche){ const u=lisse((T-oPoche)/.5); esFlacon(c,ES_FX+(ES_PX-ES_FX)*u,ES_FY+(ES_PY+25-ES_FY)*u,1.1);
      esPoche(c,ES_PX,ES_PY,zoom(T,oPoche,.4)); }
    else if(T>=oCadeau) cercle(c,ES_FX,ES_FY-48,72,CRAIE.jaune,(T-oCadeau)/.4);
    if(T>=oPoche+.5) coche(c,ES_PX+125,ES_PY+80,.45);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-boite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0("J'achète un parfum"),a0('pour Maman.')),
    ...suiteDe(boi,60,62,[a0('Sur la boîte : 50.')],[a0('50 litres !')],[a0("Je vais avoir besoin"),a0("d'une brouette.")]),
    ...suiteDe(q,60,62,[a1('La vendeuse me tend…')],[a1('une toute petite boîte.')])
  ];
  qd('Question !');
  const phraseQ=[qd('Le flacon contient'),qd('50… quoi ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte ; l'explication passe sur l'ardoise */
  rd.saute(2); const r1=rd('Un flacon de parfum'), r2=rd('tient dans la main :');
  groupes.push(...suiteDe(ouf,60,62,[rd('50 millilitres,')],[rd("c'est 10 cuillères"),rd('à café.')]),
    ...suiteDe(com,60,62,[a3('Je range la brouette.')],[a3('Le cadeau tient'),a3('dans ma poche !')]),
    ...suiteDe(f,60,60,[a4('À toi : un arrosoir'),a4('contient 10…')],[a4('millilitres, centilitres,'),a4('ou litres ?')],
      [a4('Réponds en commentaire !')]));
  const tq=(m,n=1)=>mot('02-question',m,n)-q;

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M30 92 H190 L162 160 H62 Z" fill="#2b8a3e" stroke="#74b816" stroke-width="6" stroke-linejoin="round"/>`+
    `<path d="M178 196 L30 150 L16 148" fill="none" stroke="#ced4da" stroke-width="6" stroke-linecap="round"/><line x1="76" y1="162" x2="72" y2="206" stroke="#ced4da" stroke-width="5" stroke-linecap="round"/>`+
    `<circle cx="178" cy="196" r="22" fill="#343a40" stroke="#ced4da" stroke-width="5"/>`+
    `<rect x="96" y="194" width="18" height="20" rx="4" fill="#f783ac" stroke="#dee2e6" stroke-width="2"/><rect x="100" y="186" width="10" height="7" rx="2" fill="#ffd43b"/>`+
    `<text x="268" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Un parfum de 50 :<br>mL, cL ou L ?'+PARI,mini);
  return { clips,FIN,titre:'Un parfum de 50… quoi ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,boi,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:rA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['50 mL',tq('A'),tq('millilitres')],['50 L',tq('B'),tq('litres',2)],['50 cL',tq('C'),tq('centilitres')]],
      tete:[[r+.1,'Réponse '],[rA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<boi){ T<t50b?g.montre():(T<tBesoin?g.oups():g.fier()); }
      else if(T<q){ T<bPetite?g.ouvre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<rA?g.ouvre():g.fier(); }
      else if(T<ouf) g.montre();
      else if(T<com){ T<oPoche?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
