/* ============================================================
   Série Aire CM2 — ÉPISODE 01 : QUI A LA PLUS GRANDE SERVIETTE ? Outils : films/cm2-commun.js.
   Ma serviette de plage : 3 rangées de 4 carreaux ; celle de ma sœur, toute longue : 2 rangées de 6.
   Elle dit que la sienne est plus grande (son tour est plus long). Réponse C : 12 carreaux chacune,
   la même aire ; seul le tour change. Commentaire : 1 seule rangée de 12 carreaux, combien mesure son tour ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 : les deux serviettes à gauche (même carreau, à l'échelle), le texte à droite
   (Ti Margo cache le bas du milieu de l'ardoise) */
const SV=72, XSA=110, YSA=80, XSB=110, YSB=440, XRS=800;
/* Une serviette de plage : le tissu (cases en pointillé), ses franges blanches à gauche et à droite,
   ses carreaux bleu ciel qui se posent rangée par rangée à partir de t0 (pas = l'écart entre deux rangées) */
function servietteCraie(c,T,x,y,nc,nr,tissu,t0,pas){ const w=nc*SV, h=nr*SV;
  c.strokeStyle=CRAIE.blanc; c.lineWidth=4; c.lineCap='round'; c.beginPath();
  for(let yy=y+10;yy<y+h-4;yy+=16){ c.moveTo(x-4,yy); c.lineTo(x-22,yy); c.moveTo(x+w+4,yy); c.lineTo(x+w+22,yy); }
  c.stroke();
  solVide(c,x,y,nc,nr,SV,true,tissu);
  for(let j=0;j<nr;j++) for(let i=0;i<nc;i++){ const t=t0+j*pas+i*.04; if(T>=t) carreauCraie(c,x+i*SV,y+j*SV,SV,zoom(T,t,.3)); } }
/* Une ligne de mots centrée en x, chaque morceau paraît à son instant (le mot dit) */
function ligneMots(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* Le parasol rayé, planté entre les deux serviettes */
function parasolCraie(c,x,y,z=1){ if(z<=0) return; const k=Math.min(1.2,z), r=86*k;
  c.strokeStyle='#f8f9fa'; c.lineWidth=8; c.lineCap='round'; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y+230*k); c.stroke();
  for(let s=0;s<6;s++){ c.fillStyle=s%2?'#f8f9fa':'#fa5252'; c.beginPath(); c.moveTo(x,y); c.arc(x,y,r,Math.PI+s*Math.PI/6,Math.PI+(s+1)*Math.PI/6); c.closePath(); c.fill(); }
  c.strokeStyle='#c92a2a'; c.lineWidth=4; c.beginPath(); c.arc(x,y,r,Math.PI,2*Math.PI); c.stroke(); }

FILMS['comprendre']=function(outils){
  const DUR={'00-accroche':11.05,'01-doute':4.11,'02-question':14.38,'02b-reponse':11.77,'03-ouf':4.48,'04-commentaire':10.01,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dou,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* Les instants : « 3 rangées » a deux marques (« trois », puis « rangées ») ; de même « 4 carreaux »… */
  const a00=k=>mot('00-accroche',k[0],k[1]||1);
  const tA3=a00(['3']), tArg=a00(['rangées',2]), tAde=a00(['de',2]), tA4=a00(['4']), tAca=a00(['carreaux',2]),
        tSoeur=a00(['sœur']), tB2=a00(['2']), tBrg=a00(['rangées',4]), tBde=a00(['de',4]), tB6=a00(['6']), tBca=a00(['carreaux',4]),
        tElle=a00(['Elle']), tPlus=a00(['plus']), tGrande=a00(['grande']);
  const tTour=mot('01-doute','tour');
  const tEgal=mot('03-ouf','Égalité'), tBon=mot('03-ouf','Bon'), tParasol=mot('03-ouf','parasol');
  const tCserv=mot('04-commentaire','serviette'), tC1=mot('04-commentaire','1'), tCrg=mot('04-commentaire','rangée'), tCde=mot('04-commentaire','de',2),
        tC12=mot('04-commentaire','12'), tCca=mot('04-commentaire','carreaux',2), tCombien=mot('04-commentaire','Combien'),
        tSon=mot('04-commentaire','son'), tCtour=mot('04-commentaire','tour'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tA3-.08;
  const WA=4*SV, HA=3*SV, WB=6*SV, HB=2*SV;
  /* Les deux tours dessinés à la même vitesse : celui de la sœur, plus long, finit après */
  const VIT=2*(WB+HB)/1.1;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 1 seule rangée de 12 carreaux ; son tour reste à trouver */
      const X=(tab.W-12*SV)/2, Y=120;
      if(T>=tCserv) servietteCraie(c,T,X,Y,12,1,'#5f3dc4',tC12,0);
      if(T>=tCtour) tourCraie(c,X,Y,12*SV,SV,(T-tCtour)/1);
      ligneMots(c,T,[['1',tC1],['rangée',tCrg],['de',tCde],['12',tC12],['carreaux',tCca]],tab.W/2,300,64,CRAIE.jaune);
      if(T>=tCombien&&T<tCtour) ecrire(c,'?',tab.W/2,560,170*zoom(T,tCombien,.6),CRAIE.jaune);
      ligneMots(c,T,[['son',tSon],['tour : ? côtés',tCtour]],tab.W/2,410,64,TOUR);
      tab.maj(); return; }
    if(T>=tA3) servietteCraie(c,T,XSA,YSA,4,3,'#2b8a3e',tA3,.22);
    if(T>=tSoeur) servietteCraie(c,T,XSB,YSB,6,2,'#a61e4d',tB2,.22);
    /* les tours, à partir de « tour » (01-doute) */
    if(T>=tTour){ const d=(T-tTour)*VIT; tourCraie(c,XSA,YSA,WA,HA,d/(2*(WA+HA))); tourCraie(c,XSB,YSB,WB,HB,d/(2*(WB+HB))); }
    if(T<ouf){
      ligneMots(c,T,[['3',tA3],['rangées',tArg]],XRS,150,62,CRAIE.jaune);
      ligneMots(c,T,[['de',tAde],['4',tA4],['carreaux',tAca]],XRS,225,62,CRAIE.jaune);
      ligneMots(c,T,[['2',tB2],['rangées',tBrg]],XRS,475,62,CRAIE.jaune);
      ligneMots(c,T,[['de',tBde],['6',tB6],['carreaux',tBca]],XRS,550,62,CRAIE.jaune);
      ligneMots(c,T,[['plus',tPlus],['grande !',tGrande]],XSB+WB/2,384,54,CRAIE.faux);
    } else { /* même aire : 12 carreaux de chaque côté ; le parasol à partager */
      ecrire(c,'12 carreaux',XRS,YSA+HA/2,64,CRAIE.ok);
      ecrire(c,'12 carreaux',XRS,YSB+HB/2,64,CRAIE.ok);
      if(T>=tEgal) ecrire(c,'=',XRS,(YSA+HA+YSB)/2+6,110*zoom(T,tEgal,.5),CRAIE.ok);
      if(T>=tParasol) parasolCraie(c,530,120,zoom(T,tParasol,.4));
    }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-doute'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Ma serviette de plage :')),
    ...suiteDe(dou,60,62,[a0('3 rangées de 4 carreaux.')],[a0('Celle de ma sœur'),a0('est toute longue :')],[a0('2 rangées de 6 carreaux.')],
      [a0('Elle dit que la sienne'),a0('est plus grande !')]),
    ...suiteDe(q,60,62,[a1('C’est vrai qu’elle a'),a1('l’air plus grande…')],[a1('et son tour'),a1('est plus long.')]),
    ...suiteDe(com,60,62,[a3('Égalité !')],[a3('Bon… on partage'),a3('le parasol.')]),
    ...suiteDe(f,60,60,[a4('À toi : une serviette'),a4('de 1 seule rangée'),a4('de 12 carreaux.')],
      [a4('Combien de côtés'),a4('de carreau mesure'),a4('son tour ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelle serviette a'),qd('la plus grande aire ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('3 rangées de 4 :'), r2=rd('12 carreaux.'), r3=rd('2 rangées de 6 :'), r4=rd('12 carreaux.'),
    r5=rd('La même aire !'), r6=rd('Seul le tour change.');
  const tC=mot('02b-reponse','C');

  /* Les choix, mot à mot : chaque mot paraît quand la voix le dit (une règle CSS par mot, réglée dans jouer) */
  const motsChoix=[]; const lab=(...ms)=>ms.map(([w,t])=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="cw${k}">${w}</span>`; }).join(' ');
  const qm=(m,n=1)=>mot('02-question',m,n);
  const choixA=lab(['celle',qm('celle')],['de',qm('de')],['Ti',qm('Ti')],['Margo',qm('Margo')]),
        choixB=lab(['celle',qm('celle',2)],['de',qm('de',2)],['sa',qm('sa')],['sœur',qm('sœur')]),
        choixC=lab(['les',qm('les')],['deux,',qm('deux')],['pareil',qm('pareil')]);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.vw${k}) .cw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const tuiles=(x,y,nc,nr,s)=>[...Array(nc*nr)].map((_,k)=>`<rect x="${x+(k%nc)*s}" y="${y+Math.floor(k/nc)*s}" width="${s-2}" height="${s-2}" rx="4" fill="#74c0fc" stroke="#1864ab" stroke-width="2"/>`).join('');
  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    tuiles(34,30,4,3,26)+tuiles(34,150,6,2,26)+
    `<text x="262" y="132" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Qui a la plus grande<br>serviette ?'+PARI,mini);
  return { clips,FIN,titre:'Duel de serviettes',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dou,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A',2),tq('celle')],[choixB,tq('B'),tq('celle',2)],[choixC,tq('C'),tq('les')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3,r4],suite:[r5,r6] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('vw'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dou){ T<tElle?g.montre():g.oups(); }
      else if(T<q){ T<tTour?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tBon?g.fier():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
