/* ============================================================
   Série Aire CM2 — ÉPISODE 06 : LE GAZON ET LE BAC À SABLE. Outils : films/cm2-commun.js + cm2-aire.js.
   Ti Margo pose du gazon sur son terrain de jeu, un rectangle de 6 carreaux sur 5 ; au milieu, son bac à
   sable de 2 carreaux sur 2 : pas de gazon dans le sable. Réponse B : 6 × 5 = 30, 2 × 2 = 4, 30 − 4 = 26.
   Il lui reste 4 carreaux : un tapis de sieste. Commentaire : un terrain de 8 sur 6 avec une mare de 3 sur 2.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le terrain à gauche (carreaux de CO_S px, la même taille partout dans l'image),
   le texte à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const CO_X=90, CO_Y=140, CO_S=88, CO_NC=6, CO_NR=5, CO_XR=845;
const CO_GAZON='#51cf66', CO_GAZON_B='#2b8a3e', CO_SABLE='#f4d27a', CO_SABLE_B='#9c6b30', CO_EAU='#4dabf7', CO_EAU_B='#1864ab';
/* Le bac à sable : colonnes 2-3, rangées 1-2 */
const CO_BAC=[2,1];
const coDansBac=(i,j)=>i>=CO_BAC[0]&&i<CO_BAC[0]+2&&j>=CO_BAC[1]&&j<CO_BAC[1]+2;
/* Les 26 carreaux de gazon, rangée par rangée, sans ceux du bac */
const CO_GAZ=[]; for(let j=0;j<CO_NR;j++) for(let i=0;i<CO_NC;i++) if(!coDansBac(i,j)) CO_GAZ.push([i,j]);

/* Un carreau de gazon (coin x, y ; côté s) : vert, avec quelques brins d'herbe ; grossit quand z va de 0 à 1 */
function coGazon(c,x,y,s,z=1){ if(z<=0) return; carreauCraie(c,x,y,s,z,CO_GAZON,CO_GAZON_B); if(z<.6) return;
  const k=Math.min(1.25,z), cx=x+s/2, cy=y+s/2; c.strokeStyle='#2f9e44'; c.lineWidth=Math.max(2,s*.045); c.lineCap='round';
  for(const [dx,dy] of [[-.22,.12],[0,-.12],[.22,.16]]){ const bx=cx+dx*s*k, by=cy+dy*s*k+s*.12*k;
    c.beginPath(); c.moveTo(bx-s*.06*k,by); c.lineTo(bx-s*.1*k,by-s*.16*k); c.moveTo(bx,by); c.lineTo(bx,by-s*.2*k);
    c.moveTo(bx+s*.06*k,by); c.lineTo(bx+s*.1*k,by-s*.16*k); c.stroke(); } }
/* Un bac (sable ou eau) de n × m carreaux (coin x, y ; carreau s) : un cadre en bois, qui grossit quand z va de 0 à 1 */
function coBac(c,x,y,n,m,s,z=1,eau=false){ if(z<=0) return; const k=Math.min(1.15,z), w=n*s, h=m*s, cx=x+w/2, cy=y+h/2;
  c.save(); c.translate(cx,cy); c.scale(k,k); c.translate(-cx,-cy);
  c.fillStyle=eau?CO_EAU:CO_SABLE; c.fillRect(x+4,y+4,w-8,h-8);
  if(eau){ c.strokeStyle='#d0ebff'; c.lineWidth=4; c.lineCap='round';
    for(let r=0;r<m*2;r++){ const yy=y+s*.5*(r+.5); c.beginPath();
      for(let u=0;u<=1.001;u+=.05){ const xx=x+14+(w-28)*u, yv=yy+5*Math.sin(u*n*2*Math.PI); u?c.lineTo(xx,yv):c.moveTo(xx,yv); } c.stroke(); } }
  else { c.fillStyle='#d9a441'; for(let p=0;p<n*m*7;p++){ const hs=a=>{ const s=Math.sin(a)*43758.5453; return s-Math.floor(s); }, u=hs(p*12.9898+1.3), v=hs(p*78.233+4.7); c.beginPath(); c.arc(x+12+(w-24)*u,y+12+(h-24)*v,3.2,0,7); c.fill(); } }
  c.strokeStyle=eau?CO_EAU_B:CO_SABLE_B; c.lineWidth=12; c.strokeRect(x+6,y+6,w-12,h-12);
  c.restore(); }
/* Une ligne de mots centrée en x : chaque morceau paraît à son instant (le mot dit) */
function coLigne(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* Une croix rouge (centre x, y ; demi-taille r), tracée de u = 0 à 1 */
function coCroix(c,x,y,r,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.faux; c.lineWidth=16; c.lineCap='round';
  const a=Math.min(1,u*2), b=Math.max(0,u*2-1);
  c.beginPath(); c.moveTo(x-r,y-r); c.lineTo(x-r+2*r*a,y-r+2*r*a); c.stroke();
  if(b>0){ c.beginPath(); c.moveTo(x+r,y-r); c.lineTo(x+r-2*r*b,y-r+2*r*b); c.stroke(); } }

FILMS['composer']=function(outils){
  const DUR={'00-accroche':10.31,'01-sable':5.55,'02-question':12.62,'02b-reponse':12.47,'03-ouf':6.72,'04-commentaire':10.55,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,sab,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 6 carreaux », « 2 fois », « 30 moins »… ont deux marques (le nombre, puis le mot) */
  const tUn=mot('00-accroche','un'), tRect=mot('00-accroche','rectangle'), t6=mot('00-accroche','6'), tSur=mot('00-accroche','sur',2),
        t5=mot('00-accroche','5'), tMilieu=mot('00-accroche','milieu'), tBac=mot('00-accroche','bac'), tA=mot('00-accroche','à',2),
        tSable=mot('00-accroche','sable'), t2a=mot('00-accroche','2'), tSur2=mot('00-accroche','sur',3), t2b=mot('00-accroche','2',3);
  const tPas=mot('01-sable','Pas'), tCouvre=mot('01-sable','couvre'), tAutour=mot('01-sable','autour');
  const tB=mot('02b-reponse','B'), tFois1=mot('02b-reponse','fois',2), tBacR=mot('02b-reponse','bac'),
        t2r=mot('02b-reponse','2'), tFois2=mot('02b-reponse','fois',4), t2r2=mot('02b-reponse','2',3), t4r=mot('02b-reponse','4'),
        tEnleve=mot('02b-reponse','enlève'), t30r=mot('02b-reponse','30',3), tMoins=mot('02b-reponse','moins',2),
        t4r2=mot('02b-reponse','4',2), t26=mot('02b-reponse','26'), tGazR=mot('02b-reponse','gazon');
  const o30=mot('03-ouf','30'), oReste=mot('03-ouf','reste'), o4=mot('03-ouf','4'), oTapis=mot('03-ouf','tapis'), oSieste=mot('03-ouf','sieste');
  const tTer4=mot('04-commentaire','terrain'), t8=mot('04-commentaire','8'), tSur4=mot('04-commentaire','sur'), t6d=mot('04-commentaire','6'),
        tMare=mot('04-commentaire','mare'), t3=mot('04-commentaire','3'), tSur5=mot('04-commentaire','sur',2), t2d=mot('04-commentaire','2'),
        tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tUn-.08, finR=mot('02b-reponse','Le',2)-.08;
  const S=CO_S, X=CO_X, Y=CO_Y, XR=CO_XR, BX=X+CO_BAC[0]*S, BY=Y+CO_BAC[1]*S;

  /* Le terrain : la terre (quadrillage pâle), les cotes 6 et 5, le bac à sable ; n = le nombre de carreaux de gazon posés */
  function terrain(c,T,gazon){
    solVide(c,X,Y,CO_NC,CO_NR,S);
    if(T>=t6) ecrire(c,'6',X+3*S,Y-44,60*zoom(T,t6,.4),CRAIE.jaune);
    if(T>=t5) ecrire(c,'5',X-44,Y+2.5*S,60*zoom(T,t5,.4),CRAIE.jaune);
    CO_GAZ.forEach(([i,j],k)=>coGazon(c,X+i*S,Y+j*S,S,gazon(k)));
    if(T>=tBac) coBac(c,BX,BY,2,2,S,T<tBac+.6?zoom(T,tBac,.3):1); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un terrain de 8 sur 6, une mare de 3 sur 2 (carreaux de 64 px) */
      const s=64, x=96, y=150, mx=x+3*s, my=y+2*s;
      if(T>=tTer4) solVide(c,x,y,8,6,s);
      if(T>=t8) ecrire(c,'8',x+4*s,y-42,58*zoom(T,t8,.4),CRAIE.jaune);
      if(T>=t6d) ecrire(c,'6',x-42,y+3*s,58*zoom(T,t6d,.4),CRAIE.jaune);
      if(T>=tMare) coBac(c,mx,my,3,2,s,T<tMare+.6?zoom(T,tMare,.3):1,true);
      coLigne(c,T,[['8',t8],['sur',tSur4],['6',t6d]],XR,200,64,CO_GAZON);
      if(T>=tMare) ecrire(c,'mare',XR,320,54*zoom(T,tMare,.4),CO_EAU);
      coLigne(c,T,[['3',t3],['sur',tSur5],['2',t2d]],XR,400,64,CO_EAU);
      if(T>=tCombien) ecrire(c,'?',XR,560,170*zoom(T,tCombien,.6),CRAIE.jaune);
      tab.maj(); return; }

    if(T<sab){ /* le terrain vide, ses mesures, le bac à sable */
      if(T>=tRect) terrain(c,T,()=>0);
      if(T>=tMilieu&&T<tBac) cercle(c,BX+S,BY+S,96,CRAIE.jaune,(T-tMilieu)/.3);
      coLigne(c,T,[['6',t6],['sur',tSur],['5',t5]],XR,200,66,CO_GAZON);
      coLigne(c,T,[['bac',tBac],['à',tA],['sable',tSable]],XR,350,54,CO_SABLE);
      coLigne(c,T,[['2',t2a],['sur',tSur2],['2',t2b]],XR,430,66,CO_SABLE);
      tab.maj(); return; }

    if(T<q){ /* pas de gazon dans le sable ; le gazon tout autour, carreau par carreau */
      const pas=(tAutour+.35-tCouvre)/CO_GAZ.length;
      terrain(c,T,k=>Math.min(1.08,zoom(T,tCouvre+k*pas,.15)));
      if(T<tCouvre) coCroix(c,BX+S,BY+S,60,(T-tPas)/.5);
      coLigne(c,T,[['6',-1],['sur',-1],['5',-1]],XR,200,66,CO_GAZON);
      coLigne(c,T,[['bac',-1],['à',-1],['sable',-1]],XR,350,54,CO_SABLE);
      coLigne(c,T,[['2',-1],['sur',-1],['2',-1]],XR,430,66,CO_SABLE);
      tab.maj(); return; }

    /* la réponse : 6 × 5 = 30, 2 × 2 = 4, 30 − 4 = 26 ; puis les 4 carreaux en trop : un tapis de sieste */
    terrain(c,T,()=>1);
    if(T<tEnleve+.7){ /* les 4 carreaux du bac comptés dans les 30 : des fantômes en pointillé, qui s'en vont à « enlève » */
      const u=T<tEnleve?0:Math.min(1,(T-tEnleve)/.7), dy=-70*u;
      c.globalAlpha=1-u; c.setLineDash([12,10]); c.strokeStyle=CRAIE.blanc; c.lineWidth=5;
      for(const [i,j] of [[0,0],[1,0],[0,1],[1,1]]) c.strokeRect(BX+i*S+8,BY+j*S+8+dy,S-16,S-16);
      c.setLineDash([]); c.globalAlpha=1; }
    if(T>=tBacR&&T<tEnleve) cercle(c,BX+S,BY+S,108,CRAIE.jaune,(T-tBacR)/.3);
    if(T<ouf){
      coLigne(c,T,[['6',-1],['×',-1],['5',-1],['=',-1],['30',-1]],XR,180,60,CO_GAZON);
      coLigne(c,T,[['2',t2r],['×',tFois2],['2',t2r2],['=',t4r],['4',t4r]],XR,310,60,CO_SABLE);
      coLigne(c,T,[['30',t30r],['−',tMoins],['4',t4r2],['=',t26],['26',t26]],XR,450,60,CRAIE.ok);
      if(T>=tGazR) coche(c,XR+60,540,.42);
    } else {
      coLigne(c,T,[['30',-1],['−',-1],['4',-1],['=',-1],['26',-1]],XR,120,60,CRAIE.ok);
      /* les 4 carreaux qui restent : un carré de 2 sur 2, à la même taille que ceux du terrain */
      const tx=XR-S, ty=250;
      for(const [i,j] of [[0,0],[1,0],[0,1],[1,1]]) coGazon(c,tx+i*S,ty+j*S,S,zoom(T,o4+(i+2*j)*.08,.3));
      if(T>=oTapis){ const z=zoom(T,oTapis,.4); c.fillStyle='#fff'; c.strokeStyle='#adb5bd'; c.lineWidth=5;
        c.beginPath(); c.roundRect(tx+S-60*z,ty+16,120*z,52*z,22); c.fill(); c.stroke(); }
      if(T>=oSieste){ [[0,'Z',58],[1,'z',46],[2,'z',36]].forEach(([k,s,fs])=>{ if(T>=oSieste+k*.18)
        ecrire(c,s,tx+2*S+14+k*30,ty-8-k*38,fs*zoom(T,oSieste+k*.18,.4),CRAIE.blanc); }); }
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-sable'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je pose du gazon'),a0('sur mon terrain de jeu :'));
  const s0=suiteDe(sab,60,62,[a0('un rectangle'),a0('de 6 carreaux sur 5.')],[a0('Mais au milieu,'),a0('il y a mon bac à sable :'),a0('2 carreaux sur 2.')]);
  const s1=suiteDe(q,60,62,[a1('Pas de gazon'),a1('dans le sable !')],[a1('Je couvre seulement'),a1('les carreaux autour.')]);
  qd('Question !');
  const phraseQ=[qd('Combien de carreaux'),qd('de gazon ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le terrain : 6 × 5,'), r2=rd('30 carreaux.');
  r1[3][4]=tFois1; /* le signe « × » paraît quand la voix dit « fois » */
  const b1=rd('Le bac à sable :'), b2=rd('2 × 2, 4.'); b2[3][1]=tFois2;
  const b3=rd('On enlève :'), b4=rd('30 − 4,'); b4[3][1]=tMoins;
  const b5=rd('26 carreaux de gazon.');
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[b1,b2],[b3,b4],[b5]),
    ...suiteDe(com,60,62,[a3("J'avais acheté 30 carreaux…")],[a3("Il m'en reste 4 :"),a3('je me fais un tapis de sieste !')]),
    ...suiteDe(f,60,60,[a4('À toi : un terrain'),a4('de 8 carreaux sur 6,')],[a4('avec une mare'),a4('de 3 carreaux sur 2.')],
      [a4('Combien de carreaux'),a4('de gazon ?')],[a4('Réponds en commentaire !')])
  ];

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    CO_GAZ.map(([i,j])=>`<rect x="${28+i*30}" y="${50+j*30}" width="28" height="28" rx="5" fill="${CO_GAZON}" stroke="${CO_GAZON_B}" stroke-width="2"/>`).join('')+
    `<rect x="${30+2*30}" y="${52+30}" width="56" height="56" fill="${CO_SABLE}" stroke="${CO_SABLE_B}" stroke-width="6"/>`+
    `<text x="268" y="170" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Gazon autour<br>du sable : combien ?'+PARI,mini);
  return { clips,FIN,titre:'Gazon et bac à sable',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,sab,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['34',tq('A'),tq('34')],['26',tq('B'),tq('26')],['30',tq('C'),tq('30')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<sab){ T<tBac?g.montre():g.ouvre(); }
      else if(T<q){ T<tCouvre?g.oups():(T<tAutour+.4?g.montre():g.fier()); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<t26?g.montre():g.fier(); }
      else if(T<com){ T<oReste?g.ouvre():(T<oTapis?g.montre():g.fier()); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
