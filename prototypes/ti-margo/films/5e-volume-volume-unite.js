/* ============================================================
   Série Volume 5e — ÉPISODE 07 : LE CUBE MAGIQUE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Une bouteille de 1 L versée dans une boîte cubique de 10 cm de côté : elle la remplit pile.
   Réponse B : 10 × 10 × 10 = 1 000 cm³, donc 1 L = 1 000 cm³. Commentaire : 2,5 L, c'est combien de cm³ ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la boîte et la bouteille à DROITE (Ti Margo cache le bas du milieu-gauche),
   les calculs à gauche, en haut (x ≈ 290, y 120 → 350). */
const CM_U=28, CM_X=540, CM_Y=470, CM_XG=290;          /* la boîte : 10 × 10 × 10 cubes de 28 px, coin avant-bas en (540, 470) */
const BT_X=1000, BT_Y=470, BT_H=270;                    /* la bouteille : son pied en (1000, 470), à 25 px de la boîte */
const EAU1='#38bdf8', EAU2='#7dd3fc', EAU3='#0ea5e9', EAU_T='#7dd3fc', CM3='#ffd43b';
const VIDE='rgba(0,0,0,0)';
const NB=' ';   /* « 1 000 » d'un seul tenant : un mot écrit pour une seule marque « 1 000 centimètres » */
/* « cm³ » s'écrit, « centimètres cubes » se dit : dit() reçoit les mots, la légende garde le symbole */
function ditU(f){ const g=txt=>{ const toks=txt.split(' '), mots=[], n=[];
    toks.forEach(w=>{ const m=w.match(/^cm³(.*)$/); if(m){ mots.push('centimètres','cubes'+m[1]); n.push(2); } else { mots.push(w); n.push(1); } });
    const r=f(mots.join(' ')), tm=[]; let k=0; n.forEach(c=>{ tm.push(r[3][k]); k+=c; });
    return [tm[0],tm[tm.length-1],txt,tm]; };
  g.saute=x=>{ f.saute(x); return g; }; g.jusque=x=>{ f.jusque(x); return g; }; return g; }
/* Une ligne de légende faite de plusieurs morceaux (un nombre : sauter autant de marques) */
function ditS(f,parts){ const rs=[]; parts.forEach(p=>{ if(typeof p==='number') f.saute(p); else rs.push(f(p)); });
  return [rs[0][0],rs[rs.length-1][1],rs.map(r=>r[2]).join(' '),rs.flatMap(r=>r[3])]; }
/* La boîte de verre, l'eau au niveau lvl (0 → 1), les cubes de 1 cm³ si grille */
function cmBoite(c,lvl,grille,z=1){ if(z<=0) return;
  pvPave(c,CM_X,CM_Y,10,10,10,CM_U,{face:'rgba(165,216,255,.16)',dessus:'rgba(165,216,255,.10)',cote:'rgba(165,216,255,.24)',bord:'#a5d8ff',lw:5,z});
  if(lvl>0.002&&z>=1) pvPave(c,CM_X,CM_Y,10,10,10*Math.min(1,lvl),CM_U,{face:'rgba(56,189,248,.82)',dessus:'rgba(125,211,252,.92)',cote:'rgba(14,165,233,.85)',bord:'#1864ab',lw:3});
  pvPave(c,CM_X,CM_Y,10,10,10,CM_U,{face:VIDE,dessus:VIDE,cote:VIDE,bord:grille?'#1864ab':'#e7f5ff',lw:grille?4:5,grille,z}); }
/* La bouteille (pied en x, y ; hauteur h), l'eau au niveau lvl */
function bouteille(c,x,y,h,lvl,z=1){ if(z<=0) return; const k=Math.min(1.15,z), H=h*k, W=H*.3, Y=y-(h-H)/2, col=H*.22, gou=W*.42;
  c.save(); c.lineJoin='round';
  const forme=()=>{ c.beginPath(); c.moveTo(x-W/2,Y); c.lineTo(x-W/2,Y-H+col+W*.5); c.quadraticCurveTo(x-W/2,Y-H+col,x-gou/2,Y-H+col*.6);
    c.lineTo(x-gou/2,Y-H); c.lineTo(x+gou/2,Y-H); c.lineTo(x+gou/2,Y-H+col*.6); c.quadraticCurveTo(x+W/2,Y-H+col,x+W/2,Y-H+col+W*.5); c.lineTo(x+W/2,Y); c.closePath(); };
  forme(); c.fillStyle='rgba(165,216,255,.16)'; c.fill();
  if(lvl>0){ c.save(); forme(); c.clip(); const hl=(H-col)*Math.min(1,lvl); c.fillStyle=EAU1; c.fillRect(x-W/2,Y-hl,W,hl); c.restore(); }
  forme(); c.strokeStyle='#e7f5ff'; c.lineWidth=5; c.stroke();
  c.fillStyle='#e03131'; c.fillRect(x-gou/2-3,Y-H-14*k,gou+6,16*k); c.restore(); }

FILMS['volume-unite']=function(outils){
  const DUR={'00-accroche':5.14,'01-verse':4.81,'02-question':15.78,'02b-reponse':11.27,'03-ouf':5.35,'04-commentaire':7.35,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-verse':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tBout=mot('00-accroche','bouteille'), t1L=mot('00-accroche','litre'), tBoite=mot('00-accroche','boîte'),
        t10=mot('00-accroche','10'), tCm=mot('00-accroche','centimètres',2);
  const tVerse=mot('01-verse','verse'), tGlou=mot('01-verse','glou'), tGlou3=mot('01-verse','glou',3);
  const tB=mot('02b-reponse','B'), tBoiteR=mot('02b-reponse','boîte'), t1000=mot('02b-reponse','000'), tCubes=mot('02b-reponse','cubes'),
        tBout2=mot('02b-reponse','bouteille'), tPile=mot('02b-reponse','pile'), t1L2=mot('02b-reponse','litre'),
        tEg=mot('02b-reponse','égale'), t1000b=mot('02b-reponse','000',3), tCubes2=mot('02b-reponse','cubes',2);
  const tGoutte=mot('03-ouf','goutte'), tMagique=mot('03-ouf','magique'), tNon=mot('03-ouf','Non'), tMaths=mot('03-ouf','maths');
  const t25=mot('04-commentaire','2,5'), tLitres=mot('04-commentaire','litres'), tCombien=mot('04-commentaire','combien'),
        tCubesC=mot('04-commentaire','cubes'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','et')-.08, finR=t1000-.08;
  /* le versement : de « verse » à la fin du dernier « glou » */
  const v0=tVerse+.2, v1=tGlou3+.6, verse=T=>T<v0?0:Math.min(1,(T-v0)/(v1-v0));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 2,5 litres = deux bouteilles et une demie */
      const zb=T<t25?0:1;
      [[700,1],[820,1],[940,.5]].forEach(([x,l],k)=>bouteille(c,x,430,270,l,T>=t25+k*.2?zoom(T,t25+k*.2,.4):0));
      if(T>=tLitres) pgEtiquette(c,'2,5 L',820,490,56*zoom(T,tLitres,.4),EAU_T);
      if(T>=tCombien) ecrire(c,'2,5 L',CM_XG,140,84*zoom(T,tCombien,.4),EAU_T);
      if(T>=tCubesC) ecrire(c,'= ? cm³',CM_XG,270,84*zoom(T,tCubesC,.4),CRAIE.jaune);
      tab.maj(); return; }

    /* la boîte et la bouteille */
    const v=verse(T), grille=T>=finR+.1;
    cmBoite(c,v,grille,T>=tBoite?(T<tBoite+.5?zoom(T,tBoite,.3):1):0);
    bouteille(c,BT_X,BT_Y,BT_H,1-v,T>=tBout?(T<tBout+.5?zoom(T,tBout,.3):1):0);
    if(T>=v0&&T<v1+.15){ /* le filet d'eau, du goulot jusque dans la boîte */
      const a=Math.min(1,(T-v0)/.3)*Math.min(1,(v1+.15-T)/.3);
      c.save(); c.globalAlpha=a; c.strokeStyle=EAU1; c.lineWidth=12; c.lineCap='round';
      c.beginPath(); c.moveTo(BT_X,BT_Y-BT_H-6); c.quadraticCurveTo(BT_X-50,BT_Y-BT_H-110,CM_X+200,CM_Y-320); c.stroke(); c.restore(); }
    if(T>=t1L&&T<q) pgEtiquette(c,'1 L',BT_X,BT_Y+48,54*zoom(T,t1L,.4),EAU_T);
    if(T>=t10&&T<ouf){ ecrire(c,'10 cm',CM_X+140,CM_Y+44,52*zoom(T,t10,.4),CRAIE.blanc); }
    if(T<q){ tab.maj(); return; }

    /* après la carte : 10 × 10 × 10 = 1 000 cm³ ; 1 L = 1 000 cm³ */
    if(T<ouf){
      pgLigne(c,T,[['10',finR+.1],['×',finR+.1],['10',finR+.1],['×',finR+.1],['10',finR+.1]],CM_XG,120,66,BASE5);
      pgLigne(c,T,[['= 1 000',finR+.1],['cm³',tCubes]],CM_XG,215,60,CRAIE.ok);
      pgLigne(c,T,[['1 L',t1L2],['=',tEg],['1 000',t1000b],['cm³',tCubes2]],CM_XG-10,320,54,EAU_T);
      if(T>=tPile&&T<ouf) pgEtiquette(c,'1 L',CM_X+140,CM_Y-140,60*zoom(T,tPile,.4),EAU_T);
    } else {
      pgLigne(c,T,[['1 L = 1 000 cm³',ouf]],CM_XG-10,120,54,EAU_T);
      pgEtiquette(c,'1 L',CM_X+140,CM_Y-140,60*zoom(T,tGoutte,.4),EAU_T);
      if(T>=tGoutte) coche(c,CM_XG-70,235,.85*Math.min(1,(T-tGoutte)/.3));
      if(T>=tMaths) ecrire(c,'les maths !',CM_XG,350,76*zoom(T,tMaths,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verse'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const qdU=ditU(qd), rdU=ditU(rd), a4U=ditU(a4);
  const g0=groupe(acc+.1,finTitre,330,62,a0("J'ai une bouteille"),a0('de 1 litre'));
  const s0=suiteDe(ver,60,62,[a0('et une boîte cubique'),a0('de 10 centimètres de côté.')]);
  const s1=suiteDe(q,60,62,[a1('Je verse toute la bouteille'),a1('dans la boîte…')],[a1('glou, glou, glou…')]);
  qd('Question !');
  const phraseQ=[qd("1 L, c'est combien"),qdU('de cm³ ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('La boîte : 10 × 10 × 10,');
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rdU(`1${NB}000 cm³.`)],[rd('Et la bouteille'),rd('la remplit pile :')],[rdU(`1 L = 1${NB}000 cm³.`)]),
    ...suiteDe(com,60,62,[a3('Pas une goutte de trop…'),a3("c'est magique ?")],[a3('Non, ce sont les maths !')]),
    ...suiteDe(f,60,60,[ditS(a4,['À toi : 2,5',1,'litres,'])],[a4U("c'est combien de cm³ ?")],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « cm³ » quand elle dit « cubes » */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="tpw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('cm³',qm('cubes',k))}`;
  const choixA=choixDe('100',2), choixB=choixDe('1&nbsp;000',3), choixC=choixDe('10',4);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.tpv${k}) .tpw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<polygon points="70,200 190,200 190,80 70,80" fill="${EAU1}" stroke="#e7f5ff" stroke-width="5"/>`+
    `<polygon points="70,80 190,80 230,52 110,52" fill="${EAU2}" stroke="#e7f5ff" stroke-width="5"/>`+
    `<polygon points="190,200 230,172 230,52 190,80" fill="${EAU3}" stroke="#e7f5ff" stroke-width="5"/>`+
    `<text x="280" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1 litre, c\'est<br>combien de cm³ ?'+PARI,mini);
  return { clips,FIN,titre:'Le cube magique',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ver,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('100')],[choixB,tq('B'),tq('000')],[choixC,tq('C'),tq('10')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('tpv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ver) g.montre();
      else if(T<q){ T<tGlou?g.montre():g.ouvre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.montre(); }
      else if(T<ouf){ T<tPile?g.montre():g.fier(); }
      else if(T<com){ T<tNon?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
