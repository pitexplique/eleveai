/* ============================================================
   Série Aire 6e — ÉPISODE 02 : LA PLUS GRANDE PART. Outils : films/6e-commun.js + 6e-aire.js.
   Trois parts de gâteau : A 10 cm sur 6, B un carré de 7 cm, C 12 cm sur 4 (la plus longue).
   Quelle part a la plus grande aire ? Réponse A : 60 cm², contre 49 et 48 ; la plus longue est la plus petite.
   Ti Margo a déjà croqué la C. Commentaire : un carré de 8 cm, ou un rectangle de 16 cm sur 4 ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : les trois parts à gauche, À L'ÉCHELLE (1 cm = GC_S px, le même carreau pour les trois),
   le calcul à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const GC_S=28, GC_X=130, GC_XL=70, GC_XR=815, GC_FOND='#1f3b2c';
/* Les trois parts : [lettre, largeur en cm, hauteur en cm, haut y] */
const GC_PARTS=[['A',10,6,60],['B',7,7,286],['C',12,4,545]];
const GC_BISCUIT='#f2c58c', GC_CHOCO='#8b5a2b', GC_CREME='#fff4e0';

/* Une part de gâteau vue de dessus (coin x, y ; w × h px) : le biscuit, le bord chocolat, la crème le long du haut ;
   elle grossit depuis son centre quand z va de 0 à 1 */
function gcPart(c,x,y,w,h,z=1){ if(z<=0) return; const k=Math.min(1.15,z), dx=w*(1-k)/2, dy=h*(1-k)/2; x+=dx; y+=dy; w*=k; h*=k;
  c.fillStyle=GC_BISCUIT; c.strokeStyle=GC_CHOCO; c.lineWidth=7; c.beginPath(); c.roundRect(x,y,w,h,10); c.fill(); c.stroke();
  c.fillStyle=GC_CREME; const n=Math.max(3,Math.round(w/34)); for(let i=0;i<n;i++){ c.beginPath(); c.arc(x+(i+.5)*w/n,y+13,9,0,7); c.fill(); }
  c.fillStyle='#e03131'; c.beginPath(); c.arc(x+w/2,y+h/2+6,10,0,7); c.fill(); }
/* Les carreaux de 1 cm² d'une part, rangée par rangée : la rangée j se pose à t0 + j·pas */
function gcCarreaux(c,T,x,y,nc,nr,s,t0,pas){ for(let j=0;j<nr;j++){ const t=t0+j*pas; if(T<t) continue;
  for(let i=0;i<nc;i++) carreauCraie(c,x+i*s,y+j*s,s,zoom(T,t+i*.012,.3)); } }
/* Un bord surligné à la craie jaune (de x1,y1 à x2,y2), tracé de u = 0 à 1 */
function gcBord(c,x1,y1,x2,y2,u,coul=CRAIE.jaune){ if(u<=0) return; u=Math.min(1,u);
  c.strokeStyle=coul; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(x1,y1); c.lineTo(x1+(x2-x1)*u,y1+(y2-y1)*u); c.stroke(); }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (align : centre ou gauche) */
function gcProg(c,etapes,T,x,y,taille,coul,align='center'){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,align==='center'?x-W/2:x,y,taille,coul,'left'); }
/* Les coups de dent : des ronds couleur ardoise qui mordent le coin haut-droit d'une part, de u = 0 à 1 */
function gcCroque(c,x,y,u){ if(u<=0) return; const R=[[-20,26,40],[-26,86,36],[-70,-2,34]];
  R.forEach(([dx,dy,r],k)=>{ if(u<k/3) return; c.fillStyle=GC_FOND; c.beginPath(); c.arc(x+dx,y+dy,r,0,7); c.fill(); }); }
/* La petite part de la carte de choix, à l'échelle (6 px par cm) */
const gcMini=(w,h)=>`<svg width="84" height="60" viewBox="0 0 84 60" style="vertical-align:middle;margin-right:20px"><rect x="${42-w*3}" y="${30-h*3}" width="${w*6}" height="${h*6}" rx="4" fill="${GC_BISCUIT}" stroke="${GC_CHOCO}" stroke-width="4"/></svg>`;

FILMS['comparer']=function(outils){
  const DUR={'00-accroche':5.62,'01-parts':10.26,'02-question':8.37,'02b-reponse':14.44,'03-ouf':3.15,'04-commentaire':11.52,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,par,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 10 centimètres », « 10 fois »… ont deux marques (le nombre, puis le mot) : on les prend par leur rang */
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-parts',k), mr=k=>marque('02b-reponse',k),
        m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  const gcP=(mk,txt,idx)=>{ const tm=idx.map(mk); return [tm[0],tm[tm.length-1],txt,tm]; };

  const tJe=m0(6);
  /* 01-parts : A, « 10 », « centimètres », « sur », « 6 » ; B, « carré », « 7 », « centimètres » ; C, « 12 », « centimètres », « 4 », « longue » */
  const P1=[{l:m1(0),n:m1(1),u:m1(2),h:m1(4)},{l:m1(5),n:m1(9),u:m1(10),h:m1(10)},{l:m1(11),n:m1(12),u:m1(13),h:m1(15)}], tLongue=m1(18);
  /* 02b-reponse : « A », puis pour chaque part « n fois » (2 marques), « p », le résultat (et « centimètres carrés » pour A) */
  const tA=mr(1), R1=[[2,3,4,5],[8,9,10,11],[12,13,14,15]].map(k=>k.map(mr)), tCm=mr(6), tCar=mr(7), tLong2=mr(18), tPetite=mr(22);
  const tCroque=m3(4), tC3=m3(6);
  const tCarre4=m4(3), t8=m4(5), t8c=m4(6), tRect=m4(11), t16=m4(13), t16c=m4(14), t4=m4(16), tLequel=m4(17), tAire4=m4(22), tRep=m4(23);
  const finTitre=tJe-.08, finR=R1[0][0]-.08;

  /* Une part : la lettre, le gâteau, ses mesures (les bords se surlignent pendant que la voix les dit) */
  function part(c,T,k,{cotes=true}={}){ const [L,w,h,y]=GC_PARTS[k], W=w*GC_S, H=h*GC_S, p=P1[k];
    gcPart(c,GC_X,y,W,H,zoom(T,finTitre+k*.18,.4));
    if(T>=p.l) ecrire(c,L,GC_XL,y+H/2,72*zoom(T,p.l,.5),CRAIE.blanc);
    if(!cotes) return;
    if(T>=p.n&&T<r){ gcBord(c,GC_X,y,GC_X+W,y,(T-p.n)/(p.u+.3-p.n)); }
    if(T>=p.n){ const z=k===2&&T>=tLongue&&T<q?zoom(T,tLongue,.6):1;
      gcProg(c,[[p.n,String(w)],[p.u,w+' cm']],T,GC_X+W/2,y-28,44*z,CRAIE.jaune); }
    if(T>=p.h&&T<r) gcBord(c,GC_X+W,y,GC_X+W,y+H,(T-p.h)/.45);
    if(T>=p.h) gcProg(c,[[p.h,h+' cm']],T,GC_X+W+18,y+H/2,44,CRAIE.jaune,'left'); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un carré de 8 cm de côté, ou un rectangle de 16 cm sur 4 (même échelle : 1 cm = 28 px) */
      const S=28, X=GC_X, Y1=96, Y2=430;
      if(T>=tCarre4) gcPart(c,X,Y1,8*S,8*S,zoom(T,tCarre4,.4));
      if(T>=t8) gcProg(c,[[t8,'8'],[t8c,'8 cm']],T,X+4*S,Y1-28,44,CRAIE.jaune);
      if(T>=t8c) gcProg(c,[[t8c,'8 cm']],T,X+8*S+18,Y1+4*S,44,CRAIE.jaune,'left');
      if(T>=tRect) gcPart(c,X,Y2,16*S,4*S,zoom(T,tRect,.4));
      if(T>=t16) gcProg(c,[[t16,'16'],[t16c,'16 cm']],T,X+8*S,Y2-28,44,CRAIE.jaune);
      if(T>=t4) gcProg(c,[[t4,'4 cm']],T,X+16*S+18,Y2+2*S,44,CRAIE.jaune,'left');
      if(T>=tAire4){ const z=zoom(T,tAire4,.4); ecrire(c,'? cm²',GC_XR+60,Y1+4*S,68*z,CRAIE.jaune); ecrire(c,'? cm²',GC_XR+60,Y2+2*S,68*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T<finR){ /* les trois parts et leurs mesures */
      for(let k=0;k<3;k++) part(c,T,k);
      tab.maj(); return; }
    /* la réponse : chaque part se remplit de carreaux de 1 cm² pendant « n fois p » ; son aire à droite */
    for(let k=0;k<3;k++){ const [L,w,h,y]=GC_PARTS[k], [tn,tf,tp,tres]=R1[k];
      part(c,T,k);
      gcCarreaux(c,T,GC_X,y,w,h,GC_S,tn,(tres-.1-tn)/h);
      if(k===2&&T>=tCroque) gcCroque(c,GC_X+w*GC_S,y,(T-tCroque)/.45);
      const fini=T>=tPetite, coul=fini?(k===0?CRAIE.ok:(k===2?CRAIE.faux:CRAIE.blanc)):CRAIE.blanc;
      gcProg(c,[[tn,String(w)],[tf,w+' ×'],[tp,w+' × '+h]],T,GC_XR,y+h*GC_S/2-36,54,CRAIE.blanc);
      const res=w*h; gcProg(c,k===0?[[tres,'= '+res],[tCm,'= '+res+' cm'],[tCar,'= '+res+' cm²']]:[[tres,'= '+res+' cm²']],T,GC_XR,y+h*GC_S/2+32,62,coul);
      if(k===0&&fini) coche(c,GC_XR+178,y+h*GC_S/2+30,.34); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-parts'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  /* les lignes de la réponse, chaque mot à sa marque (« 10 fois » = 2 marques : « 10 », puis « fois ») */
  const r1=gcP(mr,'10 × 6, 60 centimètres carrés.',[2,3,4,5,6,7]), r2=gcP(mr,'7 × 7, 49.',[8,9,10,11]), r3=gcP(mr,'12 × 4, 48.',[12,13,14,15]),
        r4=gcP(mr,'La plus longue',[16,17,18]), r5=gcP(mr,'est la plus petite !',[19,20,21,22,22]);
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Trois parts de gâteau'),a0('pour moi.')),
    ...suiteDe(par,60,62,[a0('Je prends la plus grande,'),a0('évidemment !')]),
    ...suiteDe(q,60,62,[a1('A : 10 centimètres sur 6.')],[a1('B : un carré'),a1('de 7 centimètres.')],[a1('C : 12 centimètres sur 4,'),a1('la plus longue !')]),
    ...suiteDe(ouf,60,62,[r1],[r2],[r3],[r4,r5]),
    ...suiteDe(com,60,62,[a3('Trop tard…'),a3('j’ai déjà croqué la C !')]),
    ...suiteDe(f,60,60,[a4('À toi : un carré'),a4('de 8 centimètres de côté,')],[a4('ou un rectangle'),a4('de 16 centimètres sur 4 ?')],
      [a4('Lequel a la plus grande aire ?')],[a4('Réponds en commentaire !')])
  ];
  /* une bulle n'apparaît jamais vide : chaque légende commence à son 1er mot, la précédente reste jusque-là */
  groupes.forEach(g=>{ const t0=g.phrases[0][0]; if(g.de>=t0) return;
    const av=groupes.find(h=>h!==g&&Math.abs(h.a-g.de)<1e-6); if(av) av.a=t0; g.de=t0; });
  qd('Question !');
  const phraseQ=[qd('Quelle part a'),qd('la plus grande aire ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* « Quelle part a… » : le 1er « a » n'est pas la lettre A */
  const tq=(m,n=1)=>mot('02-question',m,n)-q, tqA=tq('A',2), tqB=tq('B'), tqC=tq('C');
  /* les choix reprennent les mots de « 01-parts », avec la part à l'échelle */
  const choix=[[gcMini(10,6)+'10 cm sur 6',tqA,tqA],[gcMini(7,7)+'un carré de 7 cm',tqB,tqB],[gcMini(12,4)+'12 cm sur 4',tqC,tqC]];

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    [['A',10,6,30],['B',7,7,96],['C',12,4,172]].map(([L,w,h,y])=>`<text x="34" y="${y+h*4+10}" font-family="Segoe UI" font-weight="800" font-size="30" fill="#f8f9fa" text-anchor="middle">${L}</text>`+
      `<rect x="56" y="${y}" width="${w*8}" height="${h*8}" rx="5" fill="${GC_BISCUIT}" stroke="${GC_CHOCO}" stroke-width="4"/>`).join('')+
    `<text x="262" y="160" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quelle part est<br>la plus grande ?'+PARI,mini);
  return { clips,FIN,titre:'La plus grande part',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,par,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<par) g.fier();
      else if(T<q){ T<tLongue?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<tPetite?g.montre():g.oups(); }
      else if(T<com){ T<tCroque?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
