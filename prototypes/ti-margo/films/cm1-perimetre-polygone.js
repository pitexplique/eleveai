/* ============================================================
   Série Périmètre CM1 — ÉPISODE 03 : L'ÉTOILE À 10 CÔTÉS. Outils : films/cm1-commun.js + cm1-perimetre.js.
   Ti Margo fait une étoile pour le sapin et veut une guirlande tout autour. « 5 pointes, donc 5 côtés » :
   faux ! Sa petite sœur compte avec des croix : 10 côtés de 6 cm → 6 × 10 = 60 cm (A).
   Commentaire : un panneau stop a 8 côtés de 30 centimètres. Combien mesure son tour ?
   ============================================================ */
/* L'étoile sur l'ardoise (1056 × 720), à gauche (Ti Margo cache le bas du milieu) : 5 pointes, 10 côtés */
function etoile(cx,cy,R,r){ return Array.from({length:10},(_,j)=>{ const a=-Math.PI/2+j*Math.PI/5, d=j%2?r:R; return [cx+d*Math.cos(a),cy+d*Math.sin(a)]; }); }
const ETO=etoile(290,375,290,140);
/* Le panneau stop : un octogone régulier, un côté en bas */
const STOP=Array.from({length:8},(_,k)=>{ const a=Math.PI/2+Math.PI/8+k*Math.PI/4; return [270+215*Math.cos(a),370+215*Math.sin(a)]; });
/* Une croix à la craie au milieu du côté i ; son numéro, dedans */
function croixCote(c,pts,i,z=1,coul=CRAIE.jaune,num=null){ if(z<=0) return; const a=pts[i], b=pts[(i+1)%pts.length];
  const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2, s=15*Math.min(1.3,z);
  c.strokeStyle=coul; c.lineWidth=7; c.lineCap='round'; c.beginPath(); c.moveTo(mx-s,my-s); c.lineTo(mx+s,my+s); c.moveTo(mx-s,my+s); c.lineTo(mx+s,my-s); c.stroke();
  if(num!==null){ const cx=pts.reduce((t,p)=>t+p[0],0)/pts.length, cy=pts.reduce((t,p)=>t+p[1],0)/pts.length, n=Math.hypot(cx-mx,cy-my)||1;
    ecrire(c,String(num),mx+(cx-mx)/n*40,my+(cy-my)/n*40,40*Math.min(1.2,z),CRAIE.blanc); } }

FILMS['polygone']=function(outils){
  const DUR={'00-accroche':9.5,'01-compter':8.93,'02-question':14.81,'02b-reponse':9.07,'03-ouf':3.8,'04-commentaire':9.13,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ran,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tEto=mot('00-accroche','étoile'), tMets=mot('00-accroche','mets'), tGui=mot('00-accroche','guirlande'),
        t5p=mot('00-accroche','pointes'), tDonc=mot('00-accroche','donc'), tFac=mot('00-accroche','facile');
  const tCroix=mot('01-compter','croix'), t1=mot('01-compter','1'), t2=mot('01-compter','2'), t3=mot('01-compter','3'),
        t10=mot('01-compter','10'), t6=mot('01-compter','6');
  const tBrille=mot('03-ouf','brille');
  const tPan=mot('04-commentaire','panneau'), t30=mot('04-commentaire','30'),
        tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMets-.08, XR=790;
  /* l'instant de la k-ième croix (k = 0 → 9) : 1, 2, 3 à leur mot, puis 4 → 10 jusqu'à « 10 côtés » */
  const tCr=k=>k<3?[t1,t2,t3][k]:t3+(t10-t3)*(k-2)/8;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un panneau stop à 8 côtés de 30 cm */
      if(T>=tPan){ polyCraie(c,STOP,zoom(T,tPan,.3),'#e03131','#f8f9fa'); if(T>=tPan+.3) ecrire(c,'STOP',270,370,110,CRAIE.blanc); }
      if(T>=t30) for(let i=0;i<8;i++) coteCraie(c,STOP,i,'30',zoom(T,t30,.4),CRAIE.jaune,46,40);
      if(T>=tComb) ecrire(c,'?',XR,380,220*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tEto) polyCraie(c,ETO,zoom(T,tEto,.3),'#ffd43b','#e67700');
    if(T<ran){ /* il croit : 5 pointes, donc 5 côtés */
      if(T>=tGui) tourPoly(c,ETO,Math.min(.55,(T-tGui)/2.4),'#ff6b6b',9,true);
      if(T>=t5p) for(let k=0;k<5;k++){ const [x,y]=ETO[2*k], z=zoom(T,t5p+k*.12,.4);
        if(z>0) ecrire(c,String(k+1),290+(x-290)*1.13,375+(y-375)*1.13,44*z,CRAIE.r0); }
      if(T>=t5p) ecrire(c,'5 pointes',XR,250,62*zoom(T,t5p,.4),CRAIE.r0);
      if(T>=tDonc) ecrire(c,'→ 5 côtés ?',XR,370,62*zoom(T,tDonc,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<ouf){ /* la petite sœur compte avec des croix */
      ecrire(c,'5 côtés ?',XR,200,52,CRAIE.gris);
      if(T>=t10){ c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.beginPath(); c.moveTo(XR-130,200); c.lineTo(XR+130,200); c.stroke(); }
      for(let k=0;k<10;k++) if(T>=tCr(k)) croixCote(c,ETO,k,zoom(T,tCr(k),.5),CRAIE.jaune,T<t6?k+1:null);
      if(T>=t10) ecrire(c,'10 côtés !',XR,330,74*zoom(T,t10,.5),CRAIE.ok);
      if(T>=t6){ for(let i=0;i<10;i++) coteCraie(c,ETO,i,'6',zoom(T,t6,.4),CRAIE.jaune,46,36);
        ecrire(c,'6 cm chacun',XR,460,56*zoom(T,t6,.4),CRAIE.jaune); }
      tab.maj(); return; }
    /* la réponse : l'étoile brille de partout */
    tourPoly(c,ETO,Math.min(1,(T-ouf)/1.1),'#ff6b6b',9,true);
    ecrire(c,'6 × 10',XR,250,66,CRAIE.blanc); ecrire(c,'= 60 cm',XR,350,76,CRAIE.ok);
    if(T>=tBrille) coche(c,XR-70,480,.6);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-compter'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je fais une étoile'),a0('pour le sapin !')),
    ...suiteDe(ran,60,62,[a0('Je mets une guirlande'),a0('tout autour.')],[a0('5 pointes,'),a0('donc 5 côtés…'),a0('facile !')]),
    ...suiteDe(q,60,58,[a1('Ma petite sœur compte'),a1('avec des croix :')],[a1('1, 2, 3…'),a1('10 côtés !')],
      [a1('Chaque côté mesure'),a1('6 centimètres.')]),
    ...suiteDe(com,60,62,[a3('Ouf !'),a3('Mon étoile brille'),a3('de partout !')]),
    ...suiteDe(f,60,60,[a4('À toi : un panneau stop'),a4('a 8 côtés'),a4('de 30 centimètres.')],
      [a4('Combien mesure'),a4('son tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('10 côtés de 6 centimètres :'),qd('combien de centimètres'),qd('de guirlande ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('6 × 10,'), r2=rd('60 centimètres.'),
    r3=rd('Avec 5 côtés,'), r4=rd("j'en aurais oublié la moitié !");
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<polygon points="${etoile(110,130,95,40).map(p=>p.map(v=>v.toFixed(0)).join(',')).join(' ')}" fill="#ffd43b" stroke="#ff6b6b" stroke-width="9" stroke-dasharray="4 14" stroke-linecap="round"/>`+
    `<text x="260" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Mon étoile :<br>5 côtés ou 10 ?'+PARI,mini);
  return { clips,FIN,titre:"L'étoile à 10 côtés",ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ran,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['60',tq('A'),tq('60')],['30',tq('B'),tq('30')],['16',tq('C'),tq('16')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<ran){ T<t5p?g.montre():(T<tFac?g.reflechit():g.fier()); }
      else if(T<q){ T<tCroix?g.ouvre():(T<t10?g.montre():g.oups()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com) g.fier();
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
