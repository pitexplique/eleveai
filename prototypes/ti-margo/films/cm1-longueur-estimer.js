/* ============================================================
   Série Longueurs CM1 — ÉPISODE 03 : COMBIEN MESURE TI MARGO ? Outils : films/cm1-commun.js + cm1-longueur.js.
   « Je mesure 15 mètres, le plus grand de la classe ! » 15 m, c'est plus haut que l'école (à l'échelle).
   Il tient sur une règle de 30 cm : il mesure 15 cm (B). 15 mm, ce serait une fourmi.
   Commentaire : la table de classe mesure 70… 70 mm, 70 cm ou 70 m ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; les dessins à gauche ou en haut (Ti Margo cache le bas du milieu) */

/* Ti Margo à la craie, couché de profil : (x, y) = le bout de la queue, posé sur la ligne y ; len = du bout de la queue au museau */
function margouillatCraie(c,x,y,len,z=1,coul='#69db7c'){ if(z<=0) return; const L=len, k=Math.min(1.12,z);
  c.save(); c.translate(x+L/2,y-L*.06); c.scale(k,k); c.translate(-(x+L/2),-(y-L*.06));
  c.fillStyle=coul; c.strokeStyle='#f8f9fa'; c.lineWidth=Math.max(2,L*.008); c.lineJoin='round'; c.lineCap='round';
  /* les pattes (sous le corps) */
  for(const [px,s] of [[.5,-1],[.72,1]]){ c.beginPath(); c.moveTo(x+L*px,y-L*.04); c.lineTo(x+L*(px+s*.04),y-L*.004); c.lineTo(x+L*(px+s*.075),y-L*.004); c.stroke(); }
  /* la queue, qui s'affine */
  c.beginPath(); c.moveTo(x,y-L*.05); c.quadraticCurveTo(x+L*.24,y-L*.115,x+L*.47,y-L*.115); c.lineTo(x+L*.47,y-L*.035);
  c.quadraticCurveTo(x+L*.24,y-L*.04,x,y-L*.05); c.closePath(); c.fill(); c.stroke();
  /* le corps et la tête */
  c.beginPath(); c.ellipse(x+L*.6,y-L*.07,L*.17,L*.055,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x+L*.87,y-L*.08,L*.115,L*.05,-.08,0,7); c.fill(); c.stroke();
  c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x+L*.9,y-L*.095,L*.016,0,7); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(x+L*.905,y-L*.095,L*.008,0,7); c.fill();
  c.restore(); }
/* Une fourmi à la craie : (x, y) = son bout arrière, posé sur la ligne y ; len = sa longueur */
function fourmiCraie(c,x,y,len,coul='#ffc078'){ const r=len/6; c.fillStyle=coul; c.strokeStyle=coul; c.lineWidth=2; c.lineCap='round';
  for(const [k,rr] of [[1.1,1.15],[3,.75],[4.8,.85]]){ c.beginPath(); c.arc(x+r*k,y-r*1.4,r*rr,0,7); c.fill(); }
  for(const dx of [2.4,3,3.6]){ c.beginPath(); c.moveTo(x+r*dx,y-r*1.4); c.lineTo(x+r*(dx-.6),y); c.stroke(); } }
/* L'école à la craie : (x, sol) = le coin bas-gauche, w la largeur, h la hauteur avec le toit */
function ecoleCraie(c,x,sol,w,h,z=1){ if(z<=0) return; const k=Math.min(1.12,z), hm=h*.72;
  c.save(); c.translate(x+w/2,sol); c.scale(k,k); c.translate(-(x+w/2),-sol);
  c.lineWidth=5; c.strokeStyle='#f8f9fa'; c.lineJoin='round';
  c.fillStyle='#ffe8cc'; c.fillRect(x,sol-hm,w,hm); c.strokeRect(x,sol-hm,w,hm);
  c.fillStyle='#e8590c'; c.beginPath(); c.moveTo(x-14,sol-hm); c.lineTo(x+w/2,sol-h); c.lineTo(x+w+14,sol-hm); c.closePath(); c.fill(); c.stroke();
  c.fillStyle='#74c0fc'; for(const fy of [.28,.62]) for(const fx of [.12,.42,.72]) c.fillRect(x+w*fx,sol-hm*(1-fy)-hm*.16,w*.16,hm*.16);
  c.fillStyle='#8a5a2b'; c.fillRect(x+w*.42,sol-hm*.3,w*.16,hm*.3);
  c.restore(); }
/* Une table de classe à la craie : (x, y) = le coin haut-gauche du plateau, w sa largeur */
function tableCraie(c,x,y,w,z=1){ if(z<=0) return; const k=Math.min(1.12,z);
  c.save(); c.translate(x+w/2,y+80); c.scale(k,k); c.translate(-(x+w/2),-(y+80));
  c.fillStyle='#c08550'; c.strokeStyle='#f8f9fa'; c.lineWidth=5;
  c.fillRect(x,y,w,26); c.strokeRect(x,y,w,26);
  for(const lx of [x+22,x+w-46]){ c.fillRect(lx,y+26,24,180); c.strokeRect(lx,y+26,24,180); }
  c.restore(); }
/* Une flèche verticale à double pointe, du sol (y1) vers le haut (y2), tracée de u = 0 à 1 */
function flecheHauteur(c,x,y1,y2,coul=CRAIE.jaune,u=1){ if(u<=0) return; const yy=y1-(y1-y2)*Math.min(1,u);
  c.strokeStyle=coul; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.moveTo(x,y1); c.lineTo(x,yy); c.stroke();
  for(const [y0,s] of [[y1,-1],[yy,1]]){ c.beginPath(); c.moveTo(x-14,y0+s*18); c.lineTo(x,y0); c.lineTo(x+14,y0+s*18); c.stroke(); } }

FILMS['estimer']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':8.41,'01-unite':7.25,'02-question':13.93,'02b-reponse':10.68,'03-ouf':4.13,'04-commentaire':11.66,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 15 mètres » a deux marques : la 1re = « quinze », la 2e = « mètres » ; un nombre + unité s'écrit à la 2e */
  const tMoi=mot('00-accroche','Moi'), tMesure=mot('00-accroche','mesure'), t15=mot('00-accroche','15',2),
        tGrand=mot('00-accroche','grand'), tClasse=mot('00-accroche','classe');
  const t15u0=mot('01-unite','15'), t15u=mot('01-unite','15',2), tHaut=mot('01-unite','haut'), tEcole=mot('01-unite',"l'école"),
        tEt=mot('01-unite','Et'), tMoiU=mot('01-unite','moi'), tRegle=mot('01-unite','règle');
  const tB=mot('02b-reponse','B');
  const tMarg=mot('03-ouf','margouillats');
  const tTable=mot('04-commentaire','table'), t70=mot('04-commentaire','70'), tMm=mot('04-commentaire','millimètres',2),
        tCm=mot('04-commentaire','centimètres',2), tM=mot('04-commentaire','mètres',2), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMoi-.08, XR=790;
  /* La règle de 30 cm, à 31 px par cm, en haut de l'ardoise ; Ti Margo (15 cm) couché dessus, à l'échelle */
  const RX=70, RY=330, PAS=31;

  function regle30(c,z,nombres){ const X=regleCraie(c,RX,RY,30,PAS,{mm:false,h:72,fs:.01,z});
    if(nombres&&z>0) for(let v=0;v<=30;v+=5) ecrire(c,String(v),X(v),RY+52,30,TRAIT_R);
    return X; }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : la table de classe mesure 70… */
      if(T>=tTable){ tableCraie(c,70,400,400,zoom(T,tTable,.4)); }
      if(T>=t70){ flecheLongueur(c,70,470,330,CRAIE.jaune,Math.min(1,(T-t70)/.5)); ecrire(c,'70…',270,260,80*zoom(T,t70,.4),CRAIE.jaune); }
      if(T>=tMm) ecrire(c,'70 mm ?',XR,190,74*zoom(T,tMm,.4),CRAIE.blanc);
      if(T>=tCm) ecrire(c,'70 cm ?',XR,320,74*zoom(T,tCm,.4),CRAIE.blanc);
      if(T>=tM) ecrire(c,'70 m ?',XR,450,74*zoom(T,tM,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<uni){ /* « je mesure 15 mètres ! » */
      if(T>=tMoi) margouillatCraie(c,60,430,420,zoom(T,tMoi,.4));
      if(T>=tMesure) ecrire(c,'je mesure',XR,170,58*zoom(T,tMesure,.4),CRAIE.gris);
      if(T>=t15) ecrire(c,'15 m !',XR,300,120*zoom(T,t15,.4),CRAIE.faux);
      if(T>=tGrand) ecrire(c,'le plus grand',XR,440,60*zoom(T,tGrand,.4),CRAIE.gris);
      if(T>=tClasse) ecrire(c,'de la classe ?',XR,520,60*zoom(T,tClasse,.4),CRAIE.gris);
    } else if(T<q){
      if(T<tEt){ /* 15 m contre l'école (8 m), à l'échelle : 34 px par mètre */
        const SOL=650, PM=34;
        if(T>=t15u0) flecheHauteur(c,360,SOL,SOL-15*PM,CRAIE.faux,(T-t15u0)/.6);
        if(T>=t15u) ecrire(c,'15 m',XR,180,100*zoom(T,t15u,.4),CRAIE.faux);
        if(T>=tHaut) ecrire(c,'plus haut',XR,320,66*zoom(T,tHaut,.4),CRAIE.gris);
        if(T>=tEcole){ ecoleCraie(c,60,SOL,230,8*PM,zoom(T,tEcole,.4)); ecrire(c,"que l'école !",XR,420,66*zoom(T,tEcole,.4),CRAIE.gris); }
      } else { /* « et moi, je tiens sur une règle » */
        if(T>=tRegle) regle30(c,Math.min(1,.4+(T-tRegle)/.5),false); /* sans dépasser : la règle prend toute la largeur */
        if(T>=tMoiU) margouillatCraie(c,RX,RY,15*PAS,zoom(T,tMoiU,.4));
      }
    } else { /* la réponse : sur la règle de 30 cm, Ti Margo mesure 15 cm ; 15 mm, une fourmi */
      const X=regle30(c,1,true);
      margouillatCraie(c,RX,RY,15*PAS,1);
      flecheLongueur(c,X(0),X(15),200,CRAIE.ok,1);
      ecrire(c,'15 cm',X(7.5),140,74*zoom(T,ouf,.5),CRAIE.ok);
      coche(c,X(15)+40,150,.45);
      ecrire(c,'30 cm',X(27),270,54,CRAIE.jaune);
      fourmiCraie(c,X(0),480,1.5*PAS);
      ecrire(c,'15 mm : une fourmi',X(0)+80,470,46,CRAIE.r1,'left');
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-unite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('La maîtresse demande'),a0('notre taille.')),
    ...suiteDe(uni,60,60,[a0('Moi, je mesure'),a0('15 mètres !')],[a0('Je suis le plus grand'),a0('de la classe !')]),
    ...suiteDe(q,60,62,[a1('Hum… 15 mètres,'),a1("c'est plus haut que l'école !")],[a1('Et moi, je tiens'),a1('sur une règle.')]),
    ...suiteDe(com,60,62,[a3('Bon… je suis le plus grand'),a3('des margouillats, alors !')]),
    ...suiteDe(f,60,60,[a4('À toi : ta table de classe'),a4('mesure 70…')],[a4('70 millimètres,'),a4('70 centimètres'),a4('ou 70 mètres ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien mesure vraiment'),qd('Ti Margo ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Je tiens sur une règle'), r2=rd('de 30 centimètres :'), r3=rd('je mesure 15 centimètres.'),
    r4=rd('15 millimètres,'), r5=rd('ce serait une fourmi !');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="26" y="150" width="200" height="44" rx="6" fill="#fde68a" stroke="#b45309" stroke-width="4"/>`+
    [0,1,2,3,4,5,6,7,8,9,10].map(i=>`<line x1="${36+i*18}" y1="150" x2="${36+i*18}" y2="${i%5?164:172}" stroke="#1f2937" stroke-width="3"/>`).join('')+
    `<path d="M36 140 Q80 118 120 120 L120 140 Q80 140 36 140 Z" fill="#69db7c" stroke="#f8f9fa" stroke-width="3"/>`+
    `<ellipse cx="150" cy="130" rx="34" ry="14" fill="#69db7c" stroke="#f8f9fa" stroke-width="3"/><ellipse cx="190" cy="127" rx="22" ry="12" fill="#69db7c" stroke="#f8f9fa" stroke-width="3"/>`+
    `<circle cx="196" cy="123" r="4" fill="#fff"/>`+
    `<text x="280" y="200" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'15 m ou 15 cm :<br>ma vraie taille ?'+PARI,mini);
  return { clips,FIN,titre:'Ma vraie taille ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['15 mm',tq('A'),tq('millimètres')],['15 cm',tq('B'),tq('centimètres')],['15 m',tq('C'),tq('mètres')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<uni){ T<tGrand?g.montre():g.fier(); }
      else if(T<q){ T<tEcole?g.reflechit():(T<tEt?g.oups():g.montre()); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T<tMarg?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
