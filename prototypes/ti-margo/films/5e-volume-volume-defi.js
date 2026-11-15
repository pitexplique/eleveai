/* ============================================================
   Série Volume 5e — ÉPISODE 08 : LE BIDON SOUS LA GOUTTIÈRE (2e poste, 15/11/2026). Outils : films/5e-commun.js + 5e-volume.js.
   Il pleut ; un bidon de 30 cm sur 20, et 10 de haut, sous la gouttière. L'arrosoir fait 5 litres.
   Réponse B : 30 × 20 × 10 = 6 000 cm³ ; ÷ 1 000 : 6 litres. L'arrosoir est plein, il reste un litre pour les plantes.
   Commentaire : un bidon de 40 cm sur 20, et 10 de haut : combien de litres ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : la gouttière et le bidon à DROITE (Ti Margo cache le bas du milieu-gauche),
   l'arrosoir puis les calculs à gauche, en haut */
const BG_X=520, BG_Y=560, BG_U=110, BG_XG=290, BG_TUYAU=698;
const BG_BIDON={face:'#ced4da',dessus:'#868e96',cote:'#adb5bd',bord:'#343a40'};
const BG_EAU='rgba(116,192,252,.82)', BG_GOUTTE='#74c0fc', BG_TOLE='#e03131', BG_ZINC='#adb5bd';
/* Le toit en tôle, la gouttière et la descente qui plonge dans le bidon (en haut à droite) */
function bgGouttiere(c,a){ if(a<=0) return; c.save(); c.globalAlpha=Math.min(1,a);
  c.fillStyle=BG_TOLE; c.beginPath(); c.moveTo(560,0); c.lineTo(1056,0); c.lineTo(1056,34); c.lineTo(580,34); c.closePath(); c.fill();
  c.strokeStyle='#7c1d1d'; c.lineWidth=3; c.beginPath(); for(let x=600;x<1056;x+=36){ c.moveTo(x,2); c.lineTo(x-8,32); } c.stroke();
  c.fillStyle=BG_ZINC; c.strokeStyle='#495057'; c.lineWidth=3;
  c.beginPath(); c.roundRect(580,34,476,18,6); c.fill(); c.stroke();
  c.beginPath(); c.rect(BG_TUYAU-9,52,18,393); c.fill(); c.stroke(); c.restore(); }
/* La pluie : des gouttes qui tombent à droite, au-dessus du bidon */
function bgPluie(c,T,a){ if(a<=0) return; c.save(); c.globalAlpha=Math.min(1,a); c.fillStyle=BG_GOUTTE;
  for(let k=0;k<16;k++){ const x=740+(k*113)%290+(k%3)*10, y=90+((T*260+k*67)%270);
    c.beginPath(); c.arc(x,y,10,0,7); c.moveTo(x-9.2,y-3.5); c.lineTo(x,y-25); c.lineTo(x+9.2,y-3.5); c.fill(); }
  c.restore(); }
/* L'eau dans le bidon : niveau de 0 à 1, dessinée dans la face avant (l × h unités, u px) */
function bgEau(c,x,y,l,h,u,niv){ if(niv<=0) return; const W=l*u, H=h*u, hh=(H-10)*Math.min(1,niv);
  c.fillStyle=BG_EAU; c.fillRect(x+5,y-5-hh,W-10,hh); }
/* L'arrosoir (centre x, y ; échelle s), rempli d'eau jusqu'au niveau niv ; z = zoom d'apparition */
function bgArrosoir(c,x,y,s,z,niv){ if(z<=0) return; const k=Math.min(1.2,z)*s;
  const corps=[[x-70*k,y-60*k],[x+70*k,y-60*k],[x+82*k,y+80*k],[x-82*k,y+80*k]];
  c.save(); c.lineJoin='round'; c.lineCap='round';
  c.strokeStyle='#1b4332'; c.lineWidth=16*k; c.beginPath(); c.moveTo(x-62*k,y+30*k); c.lineTo(x-150*k,y-62*k); c.stroke();
  c.strokeStyle='#2f9e44'; c.lineWidth=10*k; c.beginPath(); c.moveTo(x-62*k,y+30*k); c.lineTo(x-150*k,y-62*k); c.stroke();
  c.fillStyle='#2f9e44'; c.strokeStyle='#1b4332'; c.lineWidth=5*k; c.beginPath(); c.ellipse(x-158*k,y-70*k,20*k,12*k,-.8,0,7); c.fill(); c.stroke();
  c.strokeStyle='#1b4332'; c.lineWidth=16*k; c.beginPath(); c.arc(x+70*k,y-2*k,58*k,-1.45,1.25); c.stroke();
  c.strokeStyle='#40c057'; c.lineWidth=9*k; c.beginPath(); c.arc(x+70*k,y-2*k,58*k,-1.45,1.25); c.stroke();
  c.beginPath(); corps.forEach(([a,b],i)=>i?c.lineTo(a,b):c.moveTo(a,b)); c.closePath();
  c.fillStyle='#40c057'; c.fill(); c.save(); c.clip(); if(niv>0){ const hh=140*k*Math.min(1,niv); c.fillStyle=BG_EAU; c.fillRect(x-90*k,y+80*k-hh,180*k,hh); } c.restore();
  c.strokeStyle='#1b4332'; c.lineWidth=6*k; c.stroke(); c.restore(); }
/* Le pot de fleurs (centre x, y = le haut du pot) */
function bgPot(c,x,y,z){ if(z<=0) return; const k=Math.min(1.2,z); c.save(); c.lineJoin='round';
  c.fillStyle='#2f9e44'; for(const [dx,dy,r] of [[-26,-22,20],[0,-38,22],[26,-22,20]]){ c.beginPath(); c.arc(x+dx*k,y+dy*k,r*k,0,7); c.fill(); }
  c.fillStyle='#f783ac'; c.beginPath(); c.arc(x,y-44*k,9*k,0,7); c.fill();
  c.fillStyle='#d9480f'; c.strokeStyle='#7c2d12'; c.lineWidth=5; c.beginPath();
  c.moveTo(x-48*k,y); c.lineTo(x+48*k,y); c.lineTo(x+36*k,y+70*k); c.lineTo(x-36*k,y+70*k); c.closePath(); c.fill(); c.stroke(); c.restore(); }

FILMS['volume-defi']=function(outils){
  const DUR={'00-accroche':6.90,'01-arrosoir':5.76,'02-question':13.58,'02b-reponse':8.99,'03-ouf':5.22,'04-commentaire':9.05,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'01-arrosoir':.4,'02-question':3.3,'02b-reponse':.6,'03-ouf':.8,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,arr,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tPleut=mot('00-accroche','pleut'), tBidon=mot('00-accroche','bidon'), tGout=mot('00-accroche','gouttière'),
        t30=mot('00-accroche','30'), t20=mot('00-accroche','20'), t10=mot('00-accroche','10');
  const tArros=mot('01-arrosoir','arrosoir'), t5=mot('01-arrosoir','5'), tRemplir=mot('01-arrosoir','remplir');
  const tB=mot('02b-reponse','B'), tFois2=mot('02b-reponse','fois',2), tFois4=mot('02b-reponse','fois',4),
        t6000=mot('02b-reponse','6'), tCubes=mot('02b-reponse','cubes'), t1000=mot('02b-reponse','1'), t6L=mot('02b-reponse','litres');
  const tArr3=mot('03-ouf',"l'arrosoir"), tPlein=mot('03-ouf','plein'), tLitre=mot('03-ouf','litre'), tPlantes=mot('03-ouf','plantes');
  const tBidon4=mot('04-commentaire','bidon'), t40=mot('04-commentaire','40'), t20c=mot('04-commentaire','20'),
        t10c=mot('04-commentaire','10'), tCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t30-.08, finR=t6000-.08;
  const W=3*BG_U, H=BG_U, DX=PV_DX*2*BG_U, DY=PV_DY*2*BG_U;

  /* Les trois mesures du bidon, posées contre lui (jamais sur un trait) */
  function mesures(c,T,x,y,l,u,tl,tp,th,sl){ const w=l*u, h=u, dx=PV_DX*2*u, dy=PV_DY*2*u;
    if(T>=tl) ecrire(c,sl,x+w/2,y+46,54*zoom(T,tl,.4),BASE5);
    if(T>=tp) ecrire(c,'20 cm',x+w+dx/2+56,y+dy/2+50,54*zoom(T,tp,.4),BASE5);
    if(T>=th) ecrire(c,'10 cm',x-88,y-h/2,54*zoom(T,th,.4),HAUT5); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un bidon de 40 cm sur 20, et 10 de haut (72 px par décimètre) */
      const u=88, x=470, y=500;
      pvPave(c,x,y,4,2,1,u,{...BG_BIDON,z:T>=tBidon4?(T<tBidon4+.5?zoom(T,tBidon4,.3):1):0});
      mesures(c,T,x,y,4,u,t40,t20c,t10c,'40 cm');
      if(T>=tCombien) ecrire(c,'? L',BG_XG,200,96*zoom(T,tCombien,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* la gouttière, la pluie, le bidon qui se remplit ; au « ouf », l'arrosoir boit 5 litres sur les 6 */
    bgGouttiere(c,T>=tGout?(T-tGout)/.4:0);
    if(T<q) bgPluie(c,T,T>=tPleut?(T-tPleut)/.5:0);
    const zB=T>=tBidon?(T<tBidon+.5?zoom(T,tBidon,.3):1):0;
    pvPave(c,BG_X,BG_Y,3,2,1,BG_U,{...BG_BIDON,z:zB});
    if(zB>=1){ let niv=Math.min(.9,Math.max(0,(T-tGout)/7));
      if(T>=ouf) niv=.9-(.9-.15)*Math.min(1,Math.max(0,(T-tArr3)/(tPlein-tArr3+.3)));
      bgEau(c,BG_X,BG_Y,3,1,BG_U,niv); }
    if(T<ouf) mesures(c,T,BG_X,BG_Y,3,BG_U,t30,t20,t10,'30 cm');

    if(T<q){ /* l'arrosoir de 5 litres, et la question : le bidon pourra-t-il le remplir ? */
      bgArrosoir(c,BG_XG,235,1.25,T>=tArros?(T<tArros+.5?zoom(T,tArros,.3):1):0,0);
      if(T>=t5) pgEtiquette(c,'5 L',BG_XG,262,60*zoom(T,t5,.4),CRAIE.blanc);
      if(T>=tRemplir) ecrire(c,'?',580,250,100*zoom(T,tRemplir,.4),CRAIE.jaune);
      tab.maj(); return; }

    if(T<ouf){ /* après la carte : 30 × 20 × 10 = 6 000 cm³ ; ÷ 1 000 = 6 L */
      pgLigne(c,T,[['30 × 20 × 10',finR+.1]],BG_XG,120,62,CRAIE.blanc);
      pgLigne(c,T,[['= 6 000',finR+.3],['cm³',tCubes]],BG_XG,230,62,CRAIE.blanc);
      pgLigne(c,T,[['÷ 1 000',t1000],['= 6 L',t6L]],BG_XG,340,62,CRAIE.ok);
      if(T>=t6L) pgEtiquette(c,'6 L',BG_X+W/2,BG_Y-H/2,56*zoom(T,t6L,.4),CRAIE.jaune);
      tab.maj(); return; }

    /* « ouf » : l'arrosoir se remplit (5 L), il reste 1 L dans le bidon pour le pot de fleurs */
    const nivA=Math.min(1,Math.max(0,(T-tArr3)/(tPlein-tArr3+.3)));
    bgArrosoir(c,BG_XG,235,1.25,1,nivA);
    if(T>=tArr3) pgEtiquette(c,'5 L',BG_XG,262,60,CRAIE.blanc);
    if(T>=tPlein) ecrire(c,'plein !',BG_XG,80,62*zoom(T,tPlein,.3),CRAIE.ok);
    if(T>=tLitre) pgEtiquette(c,'1 L',BG_X+W/2,BG_Y-H/2,56*zoom(T,tLitre,.4),CRAIE.jaune);
    bgPot(c,BG_X+W/2,640,T>=tPlantes?(T<tPlantes+.5?zoom(T,tPlantes,.3):1):0);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-arrosoir'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Il pleut.'),a0('Je mets un bidon'),a0('sous la gouttière :'));
  const s0=suiteDe(arr,60,62,[a0('30 centimètres sur 20,'),a0('et 10 de haut.')]);
  const s1=suiteDe(q,60,62,[a1('Mon arrosoir fait'),a1('5 litres.')],[a1('Le bidon pourra-t-il'),a1('le remplir ?')]);
  qd('Question !');
  const phraseQ=[qd('Combien de litres'),qd('contient le bidon ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('30 × 20 × 10 :');
  r1[3][1]=tFois2; r1[3][3]=tFois4; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('6 000 centimètres cubes.')],[rd('Divisé par 1 000 :'),rd('6 litres.')]),
    ...suiteDe(com,60,62,[a3('6 litres :'),a3("l'arrosoir est plein,")],[a3('et il reste un litre'),a3('pour mes plantes en pot !')]),
    ...suiteDe(f,60,60,[a4('À toi : un bidon'),a4('de 40 centimètres sur 20,')],[a4('et 10 de haut.')],
      [a4('Combien de litres ?')],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « L » (« litres » : la dernière marque de chaque nombre) */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="bgw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('L',qm('litres',k))}`;
  const choixA=choixDe('60',3), choixB=choixDe('6',5), choixC=choixDe('600',8);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.bgv${k}) .bgw${k}{visibility:hidden;}`).join('')+
    '#titre{font-size:66px !important;}'; /* « Le bidon sous la gouttière » tient sur une ligne */ document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="18" width="270" height="14" fill="${BG_ZINC}"/><rect x="82" y="30" width="12" height="120" fill="${BG_ZINC}"/>`+
    `<path d="M40 210 L190 210 L190 160 L40 160 Z" fill="${BG_BIDON.face}" stroke="${BG_BIDON.bord}" stroke-width="5"/>`+
    `<path d="M40 160 L190 160 L222 137 L72 137 Z" fill="${BG_BIDON.dessus}" stroke="${BG_BIDON.bord}" stroke-width="5"/>`+
    `<path d="M190 210 L222 187 L222 137 L190 160 Z" fill="${BG_BIDON.cote}" stroke="${BG_BIDON.bord}" stroke-width="5"/>`+
    `<rect x="45" y="172" width="140" height="34" fill="#74c0fc"/>`+
    `<text x="272" y="150" font-family="Segoe UI" font-weight="800" font-size="110" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien de litres<br>dans mon bidon ?'+PARI,mini);
  return { clips,FIN,titre:'Le bidon sous la gouttière',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,arr,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('60')],[choixB,tq('B'),tq('6')],[choixC,tq('C'),tq('600')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('bgv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<arr) g.montre();
      else if(T<q){ T<tRemplir?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.montre(); }
      else if(T<ouf){ T<t6L?g.montre():g.fier(); }
      else if(T<com){ T<tPlein?g.montre():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
