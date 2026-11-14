/* ============================================================
   Série Périmètre CM2 — ÉPISODE 02 : LE CERF-VOLANT LUMINEUX. Outils : films/cm2-commun.js + cm2-perimetre.js.
   Ti Margo veut coller des lumières tout autour de son cerf-volant en triangle : 60 cm, 60 cm et 1 m en bas.
   Il ajoute 60 + 60 + 1… Réponse C : 1 m = 100 cm, 60 + 60 = 120, + 100 = 220 cm (pas 121 : on convertit d'abord).
   Commentaire : un cerf-volant de 70 cm, 70 cm et 1 m (voix refaite le 14/11 : 50, 50, 1 m n'était pas un vrai triangle).
   ============================================================ */
/* Le cerf-volant sur l'ardoise (1056 × 720) : à l'échelle, 6,5 px par cm (base 100 cm = 650 px, côtés 60 cm = 390 px),
   en haut (Ti Margo cache le bas du milieu de l'ardoise), le calcul en bas à droite.
   Sommets : 0 en bas à gauche, 1 en haut, 2 en bas à droite ; côté 0 = gauche (60), côté 1 = droite (60), côté 2 = la base (1 m). */
const KITE2=[[70,330],[395,114],[720,330]];
/* Le défi : 70, 70 et 1 m, à la même échelle (côtés 455 px, base 650 px, hauteur 318 px) */
const KITE2_DEFI=[[70,400],[395,82],[720,400]];
const KITE2_FOND='#74c0fc', KITE2_BORD='#1864ab', LUMIERE2='#fab005';

/* Une étiquette en morceaux (chaque morceau paraît quand la voix le dit), posée dehors au milieu du côté i */
function etiqKite2(c,T,pts,i,morceaux,taille=56,coul=CRAIE.jaune,ecart=48){ if(T<morceaux[0][1]) return;
  const a=pts[i], b=pts[(i+1)%pts.length], cx=pts.reduce((t,p)=>t+p[0],0)/pts.length, cy=pts.reduce((t,p)=>t+p[1],0)/pts.length;
  const mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2, n=Math.hypot(mx-cx,my-cy)||1;
  ligneKite2(c,T,morceaux,mx+(mx-cx)/n*ecart,my+(my-cy)/n*ecart,taille,coul); }
/* Une ligne de morceaux centrée en x ; chaque morceau paraît à son instant */
function ligneKite2(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* La queue du cerf-volant : une ficelle qui ondule depuis le coin bas gauche, avec 3 nœuds de ruban */
function queueKite2(c,pts,T,z=1){ if(z<=0) return; const [x0,y0]=pts[0];
  c.strokeStyle=CRAIE.blanc; c.lineWidth=4; c.lineCap='round'; c.beginPath(); c.moveTo(x0,y0);
  const P=[]; for(let s=0;s<=1.0001;s+=.05){ const x=x0+15+8*s+10*Math.sin(s*9+T*3), y=y0+200*s*z; P.push([x,y]); c.lineTo(x,y); } c.stroke();
  [.33,.66,.97].forEach((s,k)=>{ const [x,y]=P[Math.round(s*20)]; c.fillStyle=k%2?'#f783ac':'#ffd43b';
    c.beginPath(); c.moveTo(x,y); c.lineTo(x-24,y-14); c.lineTo(x-24,y+14); c.closePath(); c.fill();
    c.beginPath(); c.moveTo(x,y); c.lineTo(x+24,y-14); c.lineTo(x+24,y+14); c.closePath(); c.fill(); }); }
/* Le cerf-volant : la toile, la croix en baguettes, la queue */
function kiteCraie2(c,pts,T,z=1){ if(z<=0) return; queueKite2(c,pts,T,Math.min(1,z));
  polyCraie(c,pts,z,KITE2_FOND,KITE2_BORD);
  if(z>=1){ c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=5; c.beginPath(); c.moveTo(pts[1][0],pts[1][1]); c.lineTo(pts[1][0],pts[0][1]);
    const ym=(pts[0][1]+pts[1][1])/2+20; c.moveTo((pts[0][0]+pts[1][0])/2+20,ym); c.lineTo((pts[2][0]+pts[1][0])/2-20,ym); c.stroke(); } }
/* La lune */
function luneKite2(c,x,y,r,z=1){ if(z<=0) return; r*=Math.min(1.2,z); c.fillStyle='#fff3bf'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.fillStyle='#1f3b2c'; c.beginPath(); c.arc(x+r*.45,y-r*.25,r*.85,0,7); c.fill(); }
/* Une chauve-souris jalouse (ailes festonnées, yeux jaunes, sourcils froncés) */
function chauveKite2(c,x,y,s,T,z=1){ if(z<=0) return; s*=Math.min(1.2,z); const b=Math.sin(T*10)*.25;
  c.save(); c.translate(x,y); c.fillStyle='#9775fa'; c.strokeStyle='#5f3dc4'; c.lineWidth=3;
  for(const d of [-1,1]){ c.beginPath(); c.moveTo(0,-4*s); c.quadraticCurveTo(d*40*s,(-34+20*b)*s,d*76*s,(-14+30*b)*s);
    c.quadraticCurveTo(d*62*s,6*s,d*50*s,4*s); c.quadraticCurveTo(d*40*s,18*s,d*28*s,8*s); c.quadraticCurveTo(d*18*s,20*s,0,12*s); c.closePath(); c.fill(); c.stroke(); }
  c.beginPath(); c.ellipse(0,4*s,16*s,20*s,0,0,7); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(-12*s,-12*s); c.lineTo(-8*s,-28*s); c.lineTo(-2*s,-14*s); c.moveTo(12*s,-12*s); c.lineTo(8*s,-28*s); c.lineTo(2*s,-14*s); c.fill();
  c.fillStyle='#ffd43b'; for(const d of [-1,1]){ c.beginPath(); c.arc(d*6*s,0,4*s,0,7); c.fill(); }
  c.strokeStyle='#212529'; c.lineWidth=2.5*s; c.beginPath(); c.moveTo(-11*s,-7*s); c.lineTo(-2*s,-4*s); c.moveTo(11*s,-7*s); c.lineTo(2*s,-4*s); c.stroke();
  c.restore(); }

FILMS['triangle']=function(outils){
  const DUR={'00-accroche':7.35,'01-cotes':10.55,'02-question':13.67,'02b-reponse':14.88,'03-ouf':4.86,'04-commentaire':11.95,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const [acc,cot,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tTri=mot('00-accroche','triangle'), tJe=mot('00-accroche','Je'), tLum=mot('00-accroche','lumières'),
        tAut=mot('00-accroche','autour'), tNuit=mot('00-accroche','nuit');
  /* 01-cotes : « 60 centimètres » a deux marques (« soixante », puis « centimètres ») ; « 1 mètre » aussi */
  const m1=k=>marque('01-cotes',k);
  const tA60=m1(2), tAcm=m1(3), tB60=m1(4), tBcm=m1(5), tC1=m1(7), tCm=m1(8),
        tAj=m1(11), tS60a=m1(12), tSp1=m1(13), tS60b=m1(14), tSp2=m1(15), tS1=m1(16);
  const tBril=mot('03-ouf','brille'), tCiel=mot('03-ouf','ciel'), tChauv=mot('03-ouf','chauves-souris'), tJal=mot('03-ouf','jalouses');
  const m4=k=>marque('04-commentaire',k);
  const tDcv=mot('04-commentaire','cerf-volant'), tD50a=m4(5), tD50acm=m4(6), tD50b=m4(7), tD50bcm=m4(8), tD1=m4(10), tDm=m4(11),
        tComb=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, XR=860, XC=780;
  /* les trois côtés, à la même échelle (px) */
  const LG=[0,1,2].map(i=>Math.hypot(KITE2[(i+1)%3][0]-KITE2[i][0],KITE2[(i+1)%3][1]-KITE2[i][1])), TOT=LG[0]+LG[1]+LG[2];
  /* le tour orange suit l'addition : côté gauche au 1er « 60 », côté droit au 2e « 60 », la base au « 1 » */
  const uAddition=T=>{ const p=(t,d=.8)=>Math.max(0,Math.min(1,(T-t)/d)); return (LG[0]*p(tS60a)+LG[1]*p(tS60b)+LG[2]*p(tS1))/TOT; };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 70 cm, 70 cm et 1 m */
      if(T>=tDcv) kiteCraie2(c,KITE2_DEFI,T,zoom(T,tDcv,.3));
      etiqKite2(c,T,KITE2_DEFI,0,[['70',tD50a],['cm',tD50acm]],56,CRAIE.jaune,100);
      etiqKite2(c,T,KITE2_DEFI,1,[['70',tD50b],['cm',tD50bcm]],56,CRAIE.jaune,100);
      etiqKite2(c,T,KITE2_DEFI,2,[['1',tD1],['m',tDm]],56,CRAIE.jaune,50);
      if(T>=tComb) ecrire(c,'?',XR,500,220*zoom(T,tComb,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=tTri) kiteCraie2(c,KITE2,T,zoom(T,tTri,.3));
    if(T<cot){ /* il colle ses lumières tout autour ; il rêve de le faire voler la nuit */
      if(T>=tLum) tourPoly(c,KITE2,(T-tLum)/(tAut+.8-tLum),LUMIERE2,10,true);
      if(T>=tNuit) luneKite2(c,900,170,80,zoom(T,tNuit,.4));
      tab.maj(); return; }
    if(T<ouf){ /* les côtés, puis son addition : 60 + 60 + 1 */
      etiqKite2(c,T,KITE2,0,[['60',tA60],['cm',tAcm]],56,CRAIE.jaune,100);
      etiqKite2(c,T,KITE2,1,[['60',tB60],['cm',tBcm]],56,CRAIE.jaune,100);
      etiqKite2(c,T,KITE2,2,[['1',tC1],['m',tCm]],56,CRAIE.jaune,50);
      if(T>=tS60a) tourPoly(c,KITE2,uAddition(T),TOUR,14);
      ligneKite2(c,T,[['60',tS60a],['+',tSp1],['60',tS60b],['+',tSp2],['1',tS1]],XC,470,72,CRAIE.blanc);
      if(T>=tS1+.6) ecrire(c,'?',XC,610,150*zoom(T,tS1+.6,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* la réponse : 1 m = 100 cm, 60 + 60 + 100 = 220 cm ; le cerf-volant brille, les chauves-souris sont jalouses */
    etiqKite2(c,T,KITE2,0,[['60 cm',ouf]],56,CRAIE.jaune,100);
    etiqKite2(c,T,KITE2,1,[['60 cm',ouf]],56,CRAIE.jaune,100);
    etiqKite2(c,T,KITE2,2,[['1 m = 100 cm',ouf]],52,CRAIE.jaune,50);
    if(T<tBril) tourPoly(c,KITE2,1,TOUR,14);
    else tourPoly(c,KITE2,(T-tBril)/.9,LUMIERE2,10,true);
    ecrire(c,'60 + 60 + 100',XC,470,68,CRAIE.blanc);
    ecrire(c,'= 220 cm',XC,580,76,CRAIE.ok);
    if(T>=tCiel) luneKite2(c,960,90,56,zoom(T,tCiel,.4));
    if(T>=tChauv){ chauveKite2(c,720,90,1,T,zoom(T,tChauv,.4)); chauveKite2(c,900,300,.9,T+.4,zoom(T,tChauv+.25,.4)); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-cotes'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  /* « 70 centimètres, 70 centimètres » se lit d'un bloc (deux groupes identiques de suite), puis se coupe en deux bulles
     de 2 lignes (à 4 lignes, la bulle mordait le cadre du tableau) */
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Mon cerf-volant'),a0('est un triangle !')),
    ...suiteDe(cot,60,62,[a0('Je veux coller des lumières'),a0('tout autour,')],[a0('pour le faire voler'),a0('la nuit.')]),
    ...suiteDe(q,60,58,[a1('Ses côtés :'),a1('60 centimètres, 60 centimètres,')],[a1('et 1 mètre en bas.')],
      [a1("J'ajoute :"),a1('60 + 60 + 1…')]),
    ...suiteDe(com,60,62,[a3('Mon cerf-volant'),a3('brille dans le ciel…')],[a3('et les chauves-souris'),a3('sont jalouses !')]),
    ...(()=>{ const a=a4('À toi : un cerf-volant'), d=a4('de 70 centimètres, 70 centimètres'), m=d[3],
        c70a=[m[0],m[2],'de 70 centimètres,',m.slice(0,3)], c70b=[m[3],m[4],'70 centimètres',m.slice(3)];
      return suiteDe(f,60,60,[a,c70a],[c70b,a4('et 1 mètre.')],
      [a4('Combien de centimètres'),a4('de lumières ?')],[a4('Réponds en commentaire !')]); })()
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de centimètres'),qd('de lumières ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* La réponse : « 60 plus 60, 120 » et « 220 centimètres » sont découpés à part (marques exactes, aucun mot en avance) */
  const mr=k=>marque('02b-reponse',k);
  rd.saute(2); const r1=rd("1 mètre, c'est 100 centimètres.");
  const r2=[mr(7),mr(10),'60 + 60, 120.',[mr(7),mr(8),mr(9),mr(10)]];
  const r3=[mr(12),mr(17),'Plus 100 : 220 centimètres.',[mr(12),mr(13),mr(13),mr(14),mr(17)]];
  rd.jusque('Pas'); const r4=rd("Pas 121 : on convertit d'abord !");
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<polygon points="30,190 120,130 210,190" fill="#74c0fc" stroke="#fab005" stroke-width="9" stroke-dasharray="4 14" stroke-linecap="round" stroke-linejoin="round"/>`+
    `<text x="120" y="232" font-family="Segoe UI" font-weight="800" font-size="34" fill="#ffd43b" text-anchor="middle">1 m</text>`+
    `<text x="52" y="140" font-family="Segoe UI" font-weight="800" font-size="34" fill="#ffd43b" text-anchor="middle">60</text>`+
    `<text x="190" y="140" font-family="Segoe UI" font-weight="800" font-size="34" fill="#ffd43b" text-anchor="middle">60</text>`+
    `<text x="272" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Mon cerf-volant :<br>121 cm ?'+PARI,mini);
  return { clips,FIN,titre:'Le cerf-volant lumineux',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cot,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['121',tq('A'),tq('121')],['160',tq('B'),tq('160')],['220',tq('C'),tq('220')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3],suite:[r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<cot){ T<tNuit?g.montre():g.fier(); }
      else if(T<q){ T<tAj?g.montre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():(T<mr(18)?g.fier():g.montre()); }
      else if(T<com){ T<tChauv?g.fier():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
