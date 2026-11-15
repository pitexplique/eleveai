/* ============================================================
   Série Aire 5e — ÉPISODE 05 : LE TAPIS TROP LARGE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-aire.js.
   Un tapis de 12 m², long de 4 m ; le couloir fait 2 m de large. Réponse A : longueur × largeur = 12 ;
   12 ÷ 4 = 3 m de large. 3 m dans un couloir de 2 : le tapis ira au salon.
   Commentaire : un tapis de 20 m², long de 5 m : sa largeur ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : le tapis et le couloir à DROITE (Ti Margo cache le bas du milieu-gauche), les calculs à gauche */
const TP_U=90, TP_X=640, TP_Y=90, TP_XG=290;
const TP_FOND='#c2410c', TP_BORD='#7c2d12', TP_FRANGE='#fbbf24';
const CL_Y1=440, CL_Y2=620, CL_X1=600, CL_X2=1050;
/* Un tapis de l × h mètres (coin haut-gauche x, y ; u px par mètre), zoomé de z */
function tpTapis(c,x,y,l,h,u,z=1,alpha=1){ if(z<=0) return; const k=Math.min(1.2,z), W=l*u*k, H=h*u*k, X=x+(l*u-W)/2, Y=y+(h*u-H)/2;
  c.save(); c.globalAlpha=alpha; c.fillStyle=TP_FOND; c.fillRect(X,Y,W,H);
  c.strokeStyle=TP_FRANGE; c.lineWidth=8; c.strokeRect(X+16,Y+16,W-32,H-32);
  c.strokeStyle=TP_BORD; c.lineWidth=6; c.strokeRect(X,Y,W,H);
  c.strokeStyle=TP_FRANGE; c.lineWidth=4; for(let j=0;j<=Math.floor(H/14);j++){ const yy=Y+j*14; if(yy>Y+H) break;
    c.beginPath(); c.moveTo(X-14,yy); c.lineTo(X,yy); c.moveTo(X+W,yy); c.lineTo(X+W+14,yy); c.stroke(); }
  c.restore(); }
/* Le couloir : deux murs gris, le sol en bois sombre */
function tpCouloir(c,z){ if(z<=0) return; const a=Math.min(1,z); c.save(); c.globalAlpha=a;
  c.fillStyle='#5b3a1e'; c.fillRect(CL_X1,CL_Y1,CL_X2-CL_X1,CL_Y2-CL_Y1);
  c.strokeStyle='#adb5bd'; c.lineWidth=16; c.lineCap='butt';
  c.beginPath(); c.moveTo(CL_X1,CL_Y1); c.lineTo(CL_X2,CL_Y1); c.moveTo(CL_X1,CL_Y2); c.lineTo(CL_X2,CL_Y2); c.stroke(); c.restore(); }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':5.60,'01-couloir':5.44,'02-question':13.00,'02b-reponse':8.39,'03-ouf':4.49,'04-commentaire':8.78,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-couloir':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTapis=mot('00-accroche','tapis'), t12=mot('00-accroche','12'), tCarres=mot('00-accroche','carrés'),
        tLong=mot('00-accroche','long'), t4=mot('00-accroche','4');
  const tCouloir=mot('01-couloir','couloir'), t2=mot('01-couloir','2'), tLarge=mot('01-couloir','large'),
        tRentrer=mot('01-couloir','rentrer');
  const tA=mot('02b-reponse','A'), t12b=mot('02b-reponse','12',2), tDiv=mot('02b-reponse','divisé'),
        t4r=mot('02b-reponse','4'), t3=mot('02b-reponse','3');
  const tCouloir3=mot('03-ouf','couloir'), t2o=mot('03-ouf','2'), tSalon=mot('03-ouf','salon');
  const tTapis4=mot('04-commentaire','tapis'), t20=mot('04-commentaire','20'), t5=mot('04-commentaire','5'),
        tQuelle=mot('04-commentaire','Quelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Il')-.08, finR=t12b-.08;
  const LX=TP_X+4*TP_U/2, HX=TP_X-82, HY=TP_Y+3*TP_U/2;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un tapis de 20 m², long de 5 m (64 px par mètre) */
      const u=72, x=TP_X, y=110;
      tpTapis(c,x,y,5,4,u,T>=tTapis4?(T<tTapis4+.5?zoom(T,tTapis4,.3):1):0);
      if(T>=t20) pgEtiquette(c,'20 m²',x+5*u/2,y+2*u,56*zoom(T,t20,.4),CRAIE.blanc);
      if(T>=t5) ecrire(c,'5 m',x+5*u/2,y-34,54*zoom(T,t5,.4),BASE5);
      if(T>=tQuelle){ ecrire(c,'? m',x-82,y+2*u,52*zoom(T,tQuelle,.4),CRAIE.jaune);
        ecrire(c,'? m',TP_XG,200,96*zoom(T,tQuelle,.5),CRAIE.jaune); }
      tab.maj(); return; }

    /* le tapis : en haut ; au « couloir » d'après la réponse, il descend dans le couloir (3 m dans 2 m) */
    const v=T<ouf?0:Math.min(1,(T-ouf)/1.2), lisseV=v*v*(3-2*v), ty=TP_Y+(CL_Y1+(CL_Y2-CL_Y1)/2-3*TP_U/2-TP_Y)*lisseV;
    if(T>=tCouloir) tpCouloir(c,(T-tCouloir)/.4);
    tpTapis(c,TP_X,ty,4,3,TP_U,T>=tTapis?(T<tTapis+.5?zoom(T,tTapis,.3):1):0);
    if(T>=tCarres&&T<ouf) pgEtiquette(c,'12 m²',LX,HY,56*zoom(T,tCarres,.4),CRAIE.blanc);
    if(T>=t4&&T<ouf) ecrire(c,'4 m',LX,TP_Y-34,54*zoom(T,t4,.4),BASE5);
    if(T>=t2&&T<ouf){ c.strokeStyle=CRAIE.blanc; c.lineWidth=5; const xa=CL_X2-40;
      c.beginPath(); c.moveTo(xa,CL_Y1+14); c.lineTo(xa,CL_Y2-14); c.stroke();
      pgEtiquette(c,'2 m',xa-70,(CL_Y1+CL_Y2)/2,50*zoom(T,t2,.4),HAUT5); }
    if(T>=tRentrer&&T<t3) ecrire(c,'?',HX,HY,80*zoom(T,tRentrer,.4),CRAIE.jaune);
    if(T>=t3&&T<ouf) ecrire(c,'3 m',HX,HY,52*zoom(T,t3,.4),CRAIE.ok);
    if(T>=ouf){ /* les deux bandes qui dépassent du couloir, en rouge */
      const y0=ty, y1=ty+3*TP_U; c.fillStyle='rgba(255,135,135,.55)';
      c.fillRect(TP_X,y0,4*TP_U,CL_Y1-8-y0); c.fillRect(TP_X,CL_Y2+8,4*TP_U,y1-CL_Y2-8);
    }
    if(T<q){ tab.maj(); return; }

    /* après la carte : 12 ÷ 4 = 3 m ; puis « le salon » */
    pgLigne(c,T,[['12',finR+.1],['÷ 4',t4r],['= 3 m',t3]],TP_XG,120,64,CRAIE.ok);
    if(T>=ouf){ pgLigne(c,T,[['3 m',ouf+.1],['dans 2 m',t2o]],TP_XG,240,62,PENCHE5);
      if(T>=tSalon) ecrire(c,'le salon !',TP_XG,350,62*zoom(T,tSalon,.3),CRAIE.jaune); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-couloir'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0("J'ai acheté un tapis"),a0('de 12 mètres carrés.'));
  const s0=suiteDe(dis,60,62,[a0('Il est long'),a0('de 4 mètres.')]);
  const s1=suiteDe(q,60,62,[a1('Mon couloir fait'),a1('2 mètres de large.')],[a1('Le tapis'),a1('va-t-il rentrer ?')]);
  qd('Question !');
  const phraseQ=[qd('Quelle est la largeur'),qd('du tapis ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Longueur × largeur = 12.');
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('12 ÷ 4 :'),rd('3 mètres de large.')]),
    ...suiteDe(com,60,62,[a3('3 mètres dans'),a3('un couloir de 2…')],[a3('je le pose'),a3('dans le salon !')]),
    ...suiteDe(f,60,60,[a4('À toi : un tapis'),a4('de 20 mètres carrés')],[a4('et de 5 mètres de long.')],
      [a4('Quelle est sa largeur ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « m » (« mètres » : la 2e marque de chaque paire) */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="tpw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('m',qm('mètres',k))}`;
  const choixA=choixDe('3',2), choixB=choixDe('8',4), choixC=choixDe('48',6);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.tpv${k}) .tpw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="60" width="160" height="120" fill="${TP_FOND}" stroke="${TP_BORD}" stroke-width="6"/>`+
    `<rect x="52" y="72" width="136" height="96" fill="none" stroke="${TP_FRANGE}" stroke-width="5"/>`+
    `<text x="265" y="170" font-family="Segoe UI" font-weight="800" font-size="120" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quelle largeur<br>pour mon tapis ?'+PARI,mini);
  return { clips,FIN,titre:'Le tapis trop large',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('3')],[choixB,tq('B'),tq('8')],[choixC,tq('C'),tq('48')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('tpv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis) g.montre();
      else if(T<q){ T<tRentrer?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t3?g.montre():g.fier(); }
      else if(T<com){ T<tSalon?g.oups():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
