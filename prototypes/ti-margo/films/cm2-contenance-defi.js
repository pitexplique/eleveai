/* ============================================================
   Série Contenance CM2, ÉPISODE 04 : ÇA RENTRE DANS 2 L ? (ceinture blanche, règle des shorts CM2).
   Outils : films/cm2-commun.js + cm2-contenance.js (bouteilleCraie, JUS, MIEL, VERRE, GRENADINE).
   Un cocktail : 1,5 L d'orange, 75 cL d'ananas, 250 mL de sirop, dans un pichet de 2 L. « 1,5, 75, 250… ça rentre facile ! »
   Il verse : 150 cL, puis 225 cL (ça déborde), puis 250 cL. Réponse C : 150 + 75 + 25 = 250 cL = 2,5 L ; ½ L de trop.
   La serpillière, c'est pour lui. Commentaire : 1 L + 30 cL + 200 mL, combien de cL ? (jamais tranché à l'écran)
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le pichet gradué à gauche, À L'ÉCHELLE (DF_K px par cL ; le bord = 2 L = 200 cL),
   le bec à droite (le trop-plein coule par là), le texte à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const DF_K=1.8, DF_X=230, DF_Y=600, DF_W=230, DF_BORD=200, DF_XR=800;
const DF_LAIT='#f1f3f5';
const dfNiv=cl=>DF_Y-6-cl*DF_K;                                   /* la hauteur de cl centilitres dans le pichet */

/* Les nombres répétés par la voix (« 1,5 » × 3, « 250 » × 3, « 150 » × 2, « 2,5 » × 3, « 200 » × 2) : une seule marque */
function dfUneMarque(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const res=[]; for(const [t,w] of CL[k]){ const d=res[res.length-1];
      if(d&&/^\d+(,\d+)?\s*$/.test(w)&&d[1].trim()===w.trim()) continue; res.push([t,w]); }
    CL[k]=res; } }

/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function dfProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }

/* Le pichet gradué : couches = [[cL, couleur], …] empilées ; ce qui dépasse le bord (2 L) est dessiné en pointillés
   au-dessus (le trop-plein, à l'échelle) ; deux = le trait rouge « 2 L » ; z = l'apparition */
function dfPichet(c,couches,z=1,deux=0){ if(z<=0) return; const k=Math.min(1.12,z), w=DF_W*k, x=DF_X, y=DF_Y, g=x-w/2,
    n=cl=>y-6-cl*DF_K*k, haut=n(DF_BORD);
  let a=0; for(const [v,coul] of couches){ if(v<=0) continue; const b=a+v;
    const i1=Math.min(b,DF_BORD); if(i1>a){ c.fillStyle=coul; c.globalAlpha=.92; c.fillRect(g+6,n(i1),w-12,n(a)-n(i1)); }
    const e0=Math.max(a,DF_BORD); if(b>e0){ c.fillStyle=coul; c.globalAlpha=.68; c.fillRect(g+6,n(b),w-12,n(e0)-n(b)); }
    c.globalAlpha=1; a=b; }
  if(a>DF_BORD){ c.strokeStyle=CRAIE.blanc; c.lineWidth=4; c.setLineDash([14,10]); c.strokeRect(g+6,n(a),w-12,n(DF_BORD)-n(a)); c.setLineDash([]); }
  /* les graduations (tous les 50 cL), à gauche dedans */
  c.strokeStyle=CRAIE.gris; c.lineWidth=4; for(const v of [50,100,150]){ c.beginPath(); c.moveTo(g+6,n(v)); c.lineTo(g+(v%100?30:46)*k,n(v)); c.stroke(); }
  /* le verre, le bec (à droite), l'anse (à gauche) */
  c.strokeStyle=VERRE; c.lineWidth=6; c.lineJoin='round'; c.lineCap='round'; c.beginPath();
  c.moveTo(g,haut); c.lineTo(g,y-18); c.quadraticCurveTo(g,y,g+18,y); c.lineTo(g+w-18,y); c.quadraticCurveTo(g+w,y,g+w,y-18);
  c.lineTo(g+w,haut+14); c.lineTo(g+w+24*k,haut-8); c.stroke();
  c.lineWidth=8; c.beginPath(); c.moveTo(g,haut+60*k); c.bezierCurveTo(g-78*k,haut+60*k,g-78*k,haut+240*k,g,haut+240*k); c.stroke();
  if(deux>0){ c.globalAlpha=Math.min(1,deux); c.strokeStyle=CRAIE.faux; c.lineWidth=6; c.beginPath(); c.moveTo(g-14,haut); c.lineTo(g+w+4,haut); c.stroke();
    ecrire(c,'2 L',g-54,haut,44,CRAIE.faux); c.globalAlpha=1; } }

/* Le trop-plein : un filet qui coule du bec le long du pichet (u = sa longueur, 0 → 1), et la flaque (f = sa taille) */
function dfDebord(c,coul,u,f){ const xb=DF_X+DF_W/2+24, yb=dfNiv(DF_BORD)-8;
  if(u>0){ u=Math.min(1,u); c.strokeStyle=coul; c.lineWidth=11; c.lineCap='round'; c.beginPath(); c.moveTo(xb,yb);
    const yf=yb+(DF_Y-yb)*u; c.quadraticCurveTo(xb+26,yb+30,xb+22,Math.min(yf,yb+60)); if(yf>yb+60) c.lineTo(xb+22,yf); c.stroke(); }
  if(f>0){ f=Math.min(1,f); c.fillStyle='#e8590c'; c.globalAlpha=.85; c.beginPath(); c.ellipse(xb+40,DF_Y+16,30+80*f,8+12*f,0,0,7); c.fill(); c.globalAlpha=1; } }

/* La serpillière : un manche et une frange, posée à (x, yBas) */
function dfSerpilliere(c,x,yBas,z=1,dx=0){ if(z<=0) return; const k=Math.min(1.12,z); c.save(); c.translate(x+dx,yBas); c.scale(k,k);
  c.strokeStyle='#e8590c'; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(-60,-300); c.lineTo(0,-60); c.stroke();
  c.fillStyle='#868e96'; c.fillRect(-46,-66,92,16);
  c.strokeStyle='#dee2e6'; c.lineWidth=8; for(let i=-4;i<=4;i++){ c.beginPath(); c.moveTo(i*10,-52); c.quadraticCurveTo(i*13+5,-25,i*15,-2); c.stroke(); }
  c.restore(); }

FILMS['defi']=function(outils){
  dfUneMarque();
  const DUR={'00-accroche':18.82,'01-verse':4.83,'02-question':14.24,'02b-reponse':15.44,'03-ouf':4.05,'04-commentaire':10.47,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-verse':.9,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const t15a=mot('00-accroche','1,5'), tLa=mot('00-accroche','litre'), tOr=mot('00-accroche',"d'orange"),
        t75a=mot('00-accroche','75'), tCla=mot('00-accroche','centilitres'), tAn=mot('00-accroche',"d'ananas"),
        t250a=mot('00-accroche','250'), tMla=mot('00-accroche','millilitres'), tSir=mot('00-accroche','sirop'),
        tPich=mot('00-accroche','pichet'), t2L=mot('00-accroche','2'),
        t15b=mot('00-accroche','1,5',2), t75b=mot('00-accroche','75',2), t250b=mot('00-accroche','250',2), tRentre=mot('00-accroche','rentre'), tFac=mot('00-accroche','facile');
  const vJe2=mot('01-verse','je',2), vVerse1=mot('01-verse','verse'), vVerse2=mot('01-verse','verse',2), vCa=mot('01-verse','ça'), vMonte2=mot('01-verse','monte',2), vCa2=mot('01-verse','ça',2);
  const rC=mot('02b-reponse','C'), r150=mot('02b-reponse','150'), rP1=mot('02b-reponse','plus'), r75=mot('02b-reponse','75'),
        rP2=mot('02b-reponse','plus',2), r25=mot('02b-reponse','25'), r250=mot('02b-reponse','250'), rCl2=mot('02b-reponse','centilitres',2),
        r25L=mot('02b-reponse','2,5',2), rLit=mot('02b-reponse','litres'), rDeb=mot('02b-reponse','déborde'), rDemi=mot('02b-reponse','demi-litre');
  const oSerp=mot('03-ouf','serpillière'), oMoi=mot('03-ouf','moi');
  const c1=mot('04-commentaire','1'), cLait=mot('04-commentaire','lait'), cP1=mot('04-commentaire','plus'), c30=mot('04-commentaire','30'),
        cCl=mot('04-commentaire','centilitres'), cP2=mot('04-commentaire','plus',2), c200=mot('04-commentaire','200'), cMl=mot('04-commentaire','millilitres'),
        cCombien=mot('04-commentaire','Combien'), cCl2=mot('04-commentaire','centilitres',2), tRep=mot('04-commentaire','Réponds');
  const finTitre=t15a-.08, finR=r150-.08;

  /* les trois verses : [début de la bascule, début du versement, fin], de 0 → 150 → 225 → 250 cL */
  const V=[[ver,vVerse1,vJe2-.1],[vJe2+.05,Math.max(vVerse2,vJe2+.3),vCa-.2],[vCa-.05,vCa+.2,vMonte2]];   /* chaque bouteille s'efface (0,15 s) avant que la suivante penche */
  const BT=[[JUS,80,160,150],[MIEL,70,120,75],[GRENADINE,52,90,25]];
  function versees(T){ return BT.map(([coul,,,v],k)=>[v*lisse((T-V[k][1])/(V[k][2]-V[k][1])),coul]); }
  const total=cs=>cs.reduce((s,[v])=>s+v,0);
  const PLEIN=[[150,JUS],[75,MIEL],[25,GRENADINE]];
  const tDeb=V[1][1]+(V[1][2]-V[1][1])*(50/75);                     /* l'instant où ça passe le bord (200 cL) */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 1 L de lait + 30 cL + 200 mL = ? cL */
      if(T>=c1) bouteilleCraie(c,200,640,130,330,T>=cLait?.85*lisse((T-cLait)/.6):0,DF_LAIT,zoom(T,c1,.4),'#1c7ed6');
      if(T>=c1) dfProg(c,[[c1,'1 L'],[cLait,'1 L de lait']],T,DF_XR,140,66,CRAIE.blanc);
      if(T>=cP1) dfProg(c,[[cP1,'+'],[c30,'+ 30'],[cCl,'+ 30 cL']],T,DF_XR,250,66,CRAIE.jaune);
      if(T>=cP2) dfProg(c,[[cP2,'+'],[c200,'+ 200'],[cMl,'+ 200 mL']],T,DF_XR,360,66,CRAIE.r2);
      if(T>=cCombien) dfProg(c,[[cCombien,'= ?'],[cCl2,'= ? cL']],T,DF_XR,490,100*zoom(T,cCombien,.6),CRAIE.ok);
      tab.maj(); return; }
    if(T<tPich){ /* les trois ingrédients, à mesure que la voix les dit */
      if(T>=t15a) bouteilleCraie(c,110,DF_Y,100,250,.85,JUS,zoom(T,t15a,.4));
      if(T>=t75a) bouteilleCraie(c,250,DF_Y,84,170,.85,MIEL,zoom(T,t75a,.4));
      if(T>=t250a) bouteilleCraie(c,370,DF_Y,60,100,.85,GRENADINE,zoom(T,t250a,.4),'#862e9c');
    } else {
      let cs, deb=0, fl=0;
      if(T<ver) cs=[];
      else if(T<q){ cs=versees(T); deb=T>=tDeb?(T-tDeb)/.8:0; fl=T>=tDeb?(T-tDeb)/2.2:0; }
      else { cs=PLEIN; deb=T<oSerp?1:0; fl=T>=oMoi?1-lisse((T-oMoi)/1.2):1; }
      dfPichet(c,cs,zoom(T,tPich,.4),T>=t2L?1:0);
      const tot=total(cs), haut=cs.filter(x=>x[0]>0).pop();
      if(tot>DF_BORD) dfDebord(c,haut?haut[1]:JUS,deb,fl);
      /* la bouteille qui verse, puis s'en va */
      if(T>=ver&&T<q) BT.forEach(([coul,w,h,v],k)=>{ const [t0,t1,t2]=V[k]; if(T<t0||T>t2+.15) return;
        const u=lisse((T-t0)/Math.max(.2,t1-t0)), pv=lisse((T-t1)/(t2-t1)), part=T>t2?1-(T-t2)/.15:1;
        c.save(); c.globalAlpha=Math.max(0,part); const a=-(1.2+.8*u), cx=400, cy=70;
        c.translate(cx,cy); c.rotate(a); bouteilleCraie(c,0,h/2,w,h,.85*(1-pv)+.05,coul,1); c.restore(); c.globalAlpha=1;
        if(T>=t1&&T<t2){ const rr=h*.78*Math.min(1.15,1), mx=cx+rr*Math.sin(a), my=cy-rr*Math.cos(a);
          c.strokeStyle=coul; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(mx,my); c.lineTo(mx,dfNiv(Math.max(total(cs),0))); c.stroke(); } });
    }
    if(T<ver){ /* le texte de l'accroche, à droite */
      if(T>=t15a) dfProg(c,[[t15a,'1,5'],[tLa,'1,5 L'],[tOr,"1,5 L d'orange"]],T,DF_XR,100,54,'#ffa94d');
      if(T>=t75a) dfProg(c,[[t75a,'75'],[tCla,'75 cL'],[tAn,"75 cL d'ananas"]],T,DF_XR,190,54,CRAIE.jaune);
      if(T>=t250a) dfProg(c,[[t250a,'250'],[tMla,'250 mL'],[tSir,'250 mL de sirop']],T,DF_XR,280,54,CRAIE.faux);
      if(T>=tPich) dfProg(c,[[tPich,'pichet :'],[t2L,'pichet : 2 L']],T,DF_XR,390,60,CRAIE.blanc);
      if(T>=t15b) dfProg(c,[[t15b,'1,5'],[t75b,'1,5 ; 75'],[t250b,'1,5 ; 75 ; 250…']],T,DF_XR,495,60,CRAIE.faux);
      if(T>=tRentre) dfProg(c,[[tRentre,'ça rentre'],[tFac,'ça rentre facile !']],T,DF_XR,585,54,CRAIE.faux);
      tab.maj(); return; }
    if(T<q){ /* ça monte, ça déborde */
      if(T>=vCa) ecrire(c,'Ça monte,',DF_XR,200,68*zoom(T,vCa,.3),CRAIE.faux);
      if(T>=vCa2) ecrire(c,'ça monte !',DF_XR,300,68*zoom(T,vCa2,.3),CRAIE.faux);
      tab.maj(); return; }
    /* la réponse : tout en cL ; dans le pichet, les trois couches ; le trop-plein = ½ L */
    {
      if(T>=r150) ecrire(c,'150',DF_X,dfNiv(75),50*zoom(T,r150,.4),'#212529');
      if(T>=r75) ecrire(c,'75',DF_X,dfNiv(187.5),50*zoom(T,r75,.4),'#212529');
      if(T>=r25) ecrire(c,'25',DF_X,dfNiv(237.5)+2,38*zoom(T,r25,.4),CRAIE.blanc);
      if(T>=rDemi) ecrire(c,'½ L',DF_X+DF_W/2+80,dfNiv(225)-6,48*zoom(T,rDemi,.4),CRAIE.faux);
      ecrire(c,'tout en cL :',DF_XR,90,54,CRAIE.gris);
      dfProg(c,[[r150,'150'],[rP1,'150 +'],[r75,'150 + 75'],[rP2,'150 + 75 +'],[r25,'150 + 75 + 25']],T,DF_XR,190,62,CRAIE.blanc);
      if(T>=r250) dfProg(c,[[r250,'= 250'],[rCl2,'= 250 cL']],T,DF_XR,295,72,CRAIE.ok);
      if(T>=r25L) dfProg(c,[[r25L,'= 2,5'],[rLit,'= 2,5 L']],T,DF_XR,400,72,CRAIE.ok);
      if(T>=rDemi) ecrire(c,'½ L de trop !',DF_XR,520,60*zoom(T,rDemi,.3),CRAIE.faux); }
    if(T>=oSerp) dfSerpilliere(c,DF_X+DF_W/2+105,DF_Y+28,zoom(T,oSerp,.4),T>=oMoi?-30*Math.sin((T-oMoi)*6):0);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-verse'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Je fais un cocktail de fruits :')),
    ...suiteDe(ver,60,62,[a0("1,5 litre de jus d'orange,")],[a0('75 centilitres'),a0("de jus d'ananas,")],[a0('et 250 millilitres'),a0('de sirop.')],
      [a0('Mon pichet fait 2 litres.')],[a0('1,5, 75, 250…'),a0('ça rentre facile !')]),
    ...suiteDe(q,60,62,[a1('Je verse… je verse…')],[a1('Ça monte, ça monte !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de litres'),qd('ai-je en tout ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* la carte de réponse, courte ; l'explication passe sur l'ardoise */
  rd.saute(2); const r1=rd('Tout en centilitres :');
  groupes.push(...suiteDe(ouf,60,62,[rd('150, plus 75, plus 25 :')],[rd('250 centilitres,'),rd("c'est 2,5 litres.")],
      [rd('Le pichet de 2 litres'),rd("déborde d'un demi-litre !")]),
    ...suiteDe(com,60,62,[a3('Bon.'),a3('La serpillière,'),a3("c'est pour moi…")]),
    ...suiteDe(f,60,60,[a4('À toi : 1 litre de lait,')],[a4('plus 30 centilitres,'),a4('plus 200 millilitres.')],
      [a4('Combien de centilitres'),a4('en tout ?')],[a4('Réponds en commentaire !')]));
  const tq=(m,n=1)=>mot('02-question',m,n)-q;

  const mini=`<svg width="290" height="220" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="44" y="150" width="96" height="60" fill="#ff922b"/><rect x="44" y="120" width="96" height="30" fill="#fcc419"/>`+
    `<rect x="44" y="96" width="96" height="24" fill="#fcc419" opacity=".55"/><rect x="44" y="84" width="96" height="12" fill="#e03131" opacity=".55"/>`+
    `<rect x="44" y="84" width="96" height="36" fill="none" stroke="#f8f9fa" stroke-width="3" stroke-dasharray="8 6"/>`+
    `<path d="M38 120 V204 Q38 216 50 216 H134 Q146 216 146 204 V126 L158 112" fill="none" stroke="#dee2e6" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>`+
    `<line x1="30" y1="120" x2="148" y2="120" stroke="#ff8787" stroke-width="4"/><path d="M158 112 Q172 128 168 216" fill="none" stroke="#e03131" stroke-width="7" stroke-linecap="round"/>`+
    `<ellipse cx="178" cy="222" rx="30" ry="8" fill="#e03131"/>`+
    `<text x="268" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Ça rentre<br>dans 2 L ?'+PARI,mini);
  return { clips,FIN,titre:'Ça rentre dans 2 L ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ver,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:rC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 L',tq('A'),tq('litres',2)],['3,25 L',tq('B'),tq('litres',4)],['2,5 L',tq('C'),tq('litres',5)]],
      tete:[[r+.1,'Réponse '],[rC,'C !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ T<tRentre?g.montre():g.fier(); }
      else if(T<q){ T<tDeb?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<rC?g.ouvre():g.oups(); }
      else if(T<ouf){ T<rDeb?g.montre():g.oups(); }
      else if(T<com){ T<oSerp?g.oups():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
