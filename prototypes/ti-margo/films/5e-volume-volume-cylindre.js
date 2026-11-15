/* ============================================================
   Série Volume 5e — ÉPISODE 05 : LA CANETTE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Une canette de rayon 3 cm et de hauteur 10 cm ; le copain parie « moins de 200 cm³ ». Réponse C :
   le disque 3,14 × 3 × 3 = 28,26 ; × 10 = 282,6 cm³ : plus de 200, Ti Margo a gagné.
   Leurres : A 188,4 (le diamètre 6 pris à la place du rayon : 3,14 × 6 × 10) ; B 94,2 (rayon × 1 : 3,14 × 3 × 10).
   Commentaire : un verre de rayon 4 cm et de hauteur 10 cm : son volume ?
   ⚠️ Les décimaux (« 3,14 », « 188,4 », « 282,6 ») ont 3 à 5 marques identiques (une par mot dit) : dit() n'en saute
   que deux. Les lignes qui les contiennent sont posées à la main par leurs marques (Lm), mot par mot.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la canette à DROITE (Ti Margo cache le bas du milieu-gauche), les calculs à gauche en haut */
const CN_X=850, CN_TOP=110, CN_U=33, CN_XG=280;
const CN_ROUGE='#e03131', CN_BORD='#7f1d1d', CN_ALU='#ced4da', RAYON5=BASE5, HAUTEUR5=HAUT5; /* code de la série : le rayon (sur la base) bleu, la hauteur verte */
/* Un cylindre debout dessiné à la craie : centre x, haut y, rayon r et hauteur h (unités), u px par unité ; zoomé de z.
   type 'canette' (rouge, couvercle alu, languette) ou 'verre' (transparent). Renvoie les points utiles. */
function cnCylindre(c,cx,top,r,h,u,z=1,type='canette'){ const R=r*u, ry=R*.32, H=h*u, yt=top+ry, yb=yt+H;
  const pts={cx,yt,yb,R,ry,top};
  if(z<=0) return pts; const k=Math.min(1.15,z), my=(yt+yb)/2;
  c.save(); c.translate(cx,my); c.scale(k,k); c.translate(-cx,-my);
  const verre=type==='verre', corps=verre?'rgba(165,216,255,.28)':CN_ROUGE, bord=verre?'#a5d8ff':CN_BORD;
  /* le corps : le rectangle et le demi-disque du bas */
  c.beginPath(); c.moveTo(cx-R,yt); c.lineTo(cx-R,yb); c.ellipse(cx,yb,R,ry,0,Math.PI,0,true); c.lineTo(cx+R,yt); c.closePath();
  c.fillStyle=corps; c.fill();
  if(!verre){ /* une bande claire et une rondelle d'orange : la canette de jus */
    c.save(); c.beginPath(); c.rect(cx-R,yt+H*.36,2*R,H*.3); c.clip(); c.fillStyle='#fff4e6'; c.fillRect(cx-R,yt+H*.36,2*R,H*.3); c.restore();
    c.fillStyle='#fd7e14'; c.beginPath(); c.arc(cx,yt+H*.51,H*.1,0,7); c.fill();
    c.strokeStyle='#fff4e6'; c.lineWidth=4; c.beginPath(); for(let a=0;a<6;a++){ c.moveTo(cx,yt+H*.51); c.lineTo(cx+Math.cos(a*1.047)*H*.1,yt+H*.51+Math.sin(a*1.047)*H*.1); } c.stroke(); }
  c.strokeStyle=bord; c.lineWidth=6; c.lineJoin='round';
  c.beginPath(); c.moveTo(cx-R,yt); c.lineTo(cx-R,yb); c.ellipse(cx,yb,R,ry,0,Math.PI,0,true); c.lineTo(cx+R,yt); c.stroke();
  /* le disque du haut */
  c.beginPath(); c.ellipse(cx,yt,R,ry,0,0,7); c.fillStyle=verre?'rgba(165,216,255,.45)':CN_ALU; c.fill(); c.stroke();
  if(!verre){ c.fillStyle='#868e96'; c.beginPath(); c.roundRect(cx-R*.66,yt-ry*.3,R*.4,ry*.55,6); c.fill(); }
  c.restore(); return pts; }
/* Le rayon (bleu, sur un liseré sombre) sur le disque du haut, du centre vers la droite, tracé de u = 0 à 1 */
function cnRayon(c,p,u){ if(u<=0) return; pgTrait(c,p.cx,p.yt,p.cx+p.R,p.yt,u,'#1864ab',14); pgTrait(c,p.cx,p.yt,p.cx+p.R,p.yt,u,RAYON5,8);
  c.fillStyle=RAYON5; c.strokeStyle='#1864ab'; c.lineWidth=3; c.beginPath(); c.arc(p.cx,p.yt,9,0,7); c.fill(); c.stroke(); }
/* La hauteur (verte) à gauche du cylindre, avec ses deux taquets */
function cnHauteur(c,p,u){ if(u<=0) return; const x=p.cx-p.R-26;
  pgTrait(c,x,p.yt,x,p.yb,u,HAUTEUR5,7); if(u>=1) for(const y of [p.yt,p.yb]) pgTrait(c,x-12,y,x+12,y,1,HAUTEUR5,6); }
/* Une petite canette (le gage) : coin bas-gauche x, y */
function cnPetite(c,x,y,alpha=1){ if(alpha<=0) return; c.save(); c.globalAlpha=alpha; cnCylindre(c,x+26,y-79,1,2.4,26,1,'canette'); c.restore(); }
/* La poubelle de recyclage */
function cnPoubelle(c,x,y,z){ if(z<=0) return; const k=Math.min(1.15,z); c.save(); c.translate(x,y); c.scale(.85*k,.85*k);
  c.fillStyle='#2f9e44'; c.strokeStyle='#1b5e20'; c.lineWidth=6; c.beginPath(); c.moveTo(-50,-80); c.lineTo(50,-80); c.lineTo(40,70); c.lineTo(-40,70); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#37b24d'; c.beginPath(); c.roundRect(-60,-100,120,24,8); c.fill(); c.stroke();
  ecrire(c,'♻',0,-2,82,'#ffffff'); c.restore(); }

FILMS['volume-cylindre']=function(outils){
  const DUR={'00-accroche':8.15,'01-pari':7.01,'02-question':22.94,'02b-reponse':15.34,'03-ouf':4.15,'04-commentaire':9.73,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-pari':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,pari,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  /* Une ligne posée à la main : chaque mot (ou signe) à la marque k de son clip */
  const Lm=(clip,txt,ks)=>{ const tm=ks.map(k=>marque(clip,k)); if(tm.length!==txt.split(' ').length) throw new Error('Lm : '+txt);
    return [tm[0],tm[tm.length-1],txt,tm]; };

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tCanette=mot('00-accroche','canette'), tRayon=mot('00-accroche','Rayon'), t3=mot('00-accroche','3'),
        tHauteur=mot('00-accroche','Hauteur'), t10=mot('00-accroche','10');
  const tCopain=mot('01-pari','copain'), tMoins=mot('01-pari','moins'), t200=mot('01-pari','200'), tMoi=mot('01-pari','Moi'),
        tPlus=mot('01-pari','plus');
  /* 02b : 0 Réponse, 1 C, 2 Le, 3 disque, 4-6 « 3,14 », 7 fois, 8-9 « 3 fois », 10 « 3 », 11-13 « 28,26 », 14 Fois, 15 10,
     16-20 « 282,6 », 21 centimètres, 22 cubes, 23 Plus, 24 de, 25-26 « 200 », 27 j'ai, 28 gagné */
  const tC=mot('02b-reponse','C'), t2826=marque('02b-reponse',11), tFois10=marque('02b-reponse',14), t10r=marque('02b-reponse',15),
        t2826r=marque('02b-reponse',16), tPlusR=marque('02b-reponse',23), tGagne=marque('02b-reponse',28);
  const tCanettes=mot('03-ouf','canettes'), tRecyclage=mot('03-ouf','recyclage');
  const tVerre=mot('04-commentaire','verre'), tRayon4=mot('04-commentaire','rayon'), t4=mot('04-commentaire','4'),
        tHauteur4=mot('04-commentaire','hauteur'), t10c=mot('04-commentaire','10'), tQuel=mot('04-commentaire','Quel'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tRayon-.08, finR=t2826-.08;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un verre de rayon 4 cm et de hauteur 10 cm */
      const p=cnCylindre(c,CN_X,CN_TOP,4,10,CN_U,T>=tVerre?(T<tVerre+.5?zoom(T,tVerre,.3):1):0,'verre');
      if(T>=tRayon4) cnRayon(c,p,(T-tRayon4)/.4);
      if(T>=t4) pgEtiquette(c,'4 cm',p.cx+p.R/2,p.top-38,52*zoom(T,t4,.4),RAYON5);
      if(T>=tHauteur4) cnHauteur(c,p,(T-tHauteur4)/.4);
      if(T>=t10c) ecrire(c,'10 cm',p.cx-p.R-26-86,(p.yt+p.yb)/2,50*zoom(T,t10c,.4),HAUTEUR5);
      if(T>=tQuel) ecrire(c,'? cm³',CN_XG,200,96*zoom(T,tQuel,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* la canette, à droite, toute l'histoire */
    const p=cnCylindre(c,CN_X,CN_TOP,3,10,CN_U,T>=tCanette?(T<tCanette+.5?zoom(T,tCanette,.3):1):0);
    if(T>=tRayon) cnRayon(c,p,(T-tRayon)/.4);
    if(T>=t3) pgEtiquette(c,'3 cm',p.cx+p.R/2,p.top-38,52*zoom(T,t3,.4),RAYON5);
    if(T>=tHauteur) cnHauteur(c,p,(T-tHauteur)/.4);
    if(T>=t10) ecrire(c,'10 cm',p.cx-p.R-26-86,(p.yt+p.yb)/2,50*zoom(T,t10,.4),HAUTEUR5);
    if(T<q){ /* le pari du copain */
      if(T>=tMoins) pgLigne(c,T,[['moins de',tMoins],['200 cm³ ?',t200]],CN_XG,140,58,CRAIE.faux);
      if(T>=tPlus) ecrire(c,'Moi : plus !',CN_XG,250,64*zoom(T,tPlus,.4),CRAIE.jaune);
      tab.maj(); return; }

    /* après la carte : 3,14 × 3 × 3 = 28,26 ; × 10 = 282,6 cm³ ; plus de 200 */
    pgLigne(c,T,[['3,14 × 3 × 3',finR+.1]],CN_XG,120,62,CRAIE.blanc);
    pgLigne(c,T,[['= 28,26',t2826]],CN_XG,200,62,CRAIE.ok);
    pgLigne(c,T,[['× 10',t10r],['= 282,6 cm³',t2826r]],CN_XG,280,56,CRAIE.ok);
    if(T>=tPlusR) ecrire(c,'plus de 200 !',CN_XG,360,60*zoom(T,tPlusR,.4),CRAIE.jaune);
    if(T>=ouf){ /* le gage : les canettes partent au recyclage */
      const v=T<tRecyclage?0:Math.min(1,(T-tRecyclage)/1.4), lisse=v*v*(3-2*v);
      cnPoubelle(c,990,640,T>=tRecyclage?(T<tRecyclage+.5?zoom(T,tRecyclage,.3):1):0);
      if(T>=tCanettes) for(let k=0;k<4;k++){ const x0=620+k*66, x=x0+(935-x0)*lisse;
        cnPetite(c,x,690,(x<900?1:Math.max(0,1-(x-900)/30))*Math.min(1,(T-tCanettes-k*.12)/.3)); }
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-pari'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Je bois du jus'),a0('dans une canette.'));
  const s0=suiteDe(pari,60,62,[a0('Rayon : 3 centimètres.'),a0('Hauteur : 10 centimètres.')]);
  const s1=suiteDe(q,60,62,[a1('Mon copain parie'),a1("qu'elle contient moins"),a1('de 200 centimètres cubes.')],[a1('Moi, je dis plus !')]);
  qd('Question !');
  /* 02-question : 8 On, 9 prend, 10 pi, 11 égal, 12-14 « 3,14 » */
  const phraseQ=[qd('Quel est le volume'),qd('de la canette ?'),Lm('02-question','On prend π = 3,14.',[8,9,10,11,12])];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=Lm('02b-reponse','Le disque : 3,14 × 3 × 3',[2,3,3,4,7,8,9,10]);
  const groupes=[g0,...s0,...s1,
    groupe(finR,tFois10-.08,60,62,Lm('02b-reponse','3,14 × 3 × 3, 28,26.',[4,7,8,9,10,11])),
    groupe(tFois10-.08,tPlusR-.08,60,62,Lm('02b-reponse','Fois 10 :',[14,15,15]),Lm('02b-reponse','282,6 centimètres cubes.',[16,21,22])),
    groupe(tPlusR-.08,ouf,60,62,Lm('02b-reponse','Plus de 200 :',[23,24,25,25]),Lm('02b-reponse',"j'ai gagné !",[27,28,28])),
    ...suiteDe(com,60,62,[a3('Son gage : il porte'),a3('toutes nos canettes'),a3('au recyclage !')]),
    ...suiteDe(f,60,60,[a4('À toi : un verre'),a4('de rayon 4 centimètres')],[a4('et de hauteur 10 centimètres.')],
      [a4('Quel est son volume ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « cm³ » au mot « centimètres » (une marque seule) */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="tpw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('cm³',qm('centimètres',k))}`;
  const choixA=choixDe('188,4',1), choixB=choixDe('94,2',2), choixC=choixDe('282,6',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.tpv${k}) .tpw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M50 62 L50 192 A50 16 0 0 0 150 192 L150 62 Z" fill="${CN_ROUGE}" stroke="${CN_BORD}" stroke-width="6"/>`+
    `<rect x="50" y="105" width="100" height="40" fill="#fff4e6"/><circle cx="100" cy="125" r="14" fill="#fd7e14"/>`+
    `<ellipse cx="100" cy="62" rx="50" ry="16" fill="${CN_ALU}" stroke="${CN_BORD}" stroke-width="6"/>`+
    `<text x="250" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Plus ou moins<br>de 200 cm³ ?'+PARI,mini);
  return { clips,FIN,titre:'La canette',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,pari,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('188,4')],[choixB,tq('B'),tq('94,2')],[choixC,tq('C'),tq('282,6')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('tpv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<pari) g.montre();
      else if(T<q){ T<tMoi?(T<tCopain+.3?g.montre():g.reflechit()):g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.montre(); }
      else if(T<ouf){ T<tGagne?g.montre():g.fier(); }
      else if(T<com){ T<tRecyclage?g.ouvre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
