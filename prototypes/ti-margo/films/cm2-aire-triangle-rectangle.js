/* ============================================================
   Série Aire CM2 — ÉPISODE 05 : LE DUEL DES TOASTS. Outils : films/cm2-commun.js + cm2-aire.js.
   Mon toast carré de 10 cm de côté, coupé en diagonale : deux triangles. Ma sœur coupe le sien tout droit :
   deux rectangles. « Ton triangle est plus petit ! » Réponse C : 10 × 10 = 100 cm², le triangle en est
   la moitié, 50 cm² ; le rectangle aussi, 50 : pareil. Commentaire : un toast de 12 cm sur 10, en diagonale.
   ============================================================ */
/* L'ardoise fait 1056 × 720 : les deux toasts à gauche, l'un sous l'autre, à l'échelle (24 px par cm) ;
   le texte à droite (Ti Margo cache le bas du milieu de l'ardoise) */
const TR_X=104, TR_YA=70, TR_YB=388, TR_S=240, TR_XR=790;
const TR_MIE='#f4d58d', TR_CROUTE='#a0581c', TR_SOEUR=CRAIE.r2, TR_SOEUR_B='#a61e4d';
/* Un morceau de toast : un polygone (sommets pts), grossi de z autour de son centre */
function trMorceau(c,pts,fill,bord,z=1){ if(z<=0) return; const k=Math.min(1.2,z);
  const cx=pts.reduce((a,p)=>a+p[0],0)/pts.length, cy=pts.reduce((a,p)=>a+p[1],0)/pts.length;
  c.beginPath(); pts.forEach(([x,y],i)=>{ const X=cx+(x-cx)*k, Y=cy+(y-cy)*k; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath();
  c.fillStyle=fill; c.fill(); c.strokeStyle=bord; c.lineWidth=10; c.lineJoin='round'; c.stroke(); }
/* Le fantôme d'un morceau (pointillé blanc), tourné de a autour de (ox, oy) : il vient se poser sur l'autre moitié */
function trFantome(c,pts,ox,oy,a){ const co=Math.cos(a), si=Math.sin(a);
  c.beginPath(); pts.forEach(([x,y],i)=>{ const X=ox+(x-ox)*co-(y-oy)*si, Y=oy+(x-ox)*si+(y-oy)*co; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath();
  c.fillStyle='rgba(255,255,255,.22)'; c.fill(); c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.setLineDash([16,12]); c.stroke(); c.setLineDash([]); }
/* Les deux moitiés d'un toast w × h (coin haut-gauche x, y), écartées de d : en diagonale ou tout droit */
function trMoities(x,y,w,h,d,diag){ const dc=(pts,dx,dy)=>pts.map(([a,b])=>[a+dx,b+dy]);
  return diag ? [dc([[x,y],[x,y+h],[x+w,y+h]],-d,d), dc([[x,y],[x+w,y],[x+w,y+h]],d,-d)]
              : [dc([[x,y],[x+w/2,y],[x+w/2,y+h],[x,y+h]],-d,0), dc([[x+w/2,y],[x+w,y],[x+w,y+h],[x+w/2,y+h]],d,0)]; }
/* Le couteau : un trait jaune pointillé de (x1, y1) à (x2, y2), tracé de u = 0 à 1 */
function trCouteau(c,x1,y1,x2,y2,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.setLineDash([20,12]);
  c.beginPath(); c.moveTo(x1,y1); c.lineTo(x1+(x2-x1)*u,y1+(y2-y1)*u); c.stroke(); c.setLineDash([]); }
/* Une ligne de mots centrée en x, chaque morceau paraît à son instant (le mot dit) */
function trLigne(c,T,morceaux,x,y,fs,coul){ c.font=`800 ${fs}px "Segoe UI"`; const esp=c.measureText(' ').width*1.25;
  const ws=morceaux.map(([s])=>c.measureText(s).width), tot=ws.reduce((a,b)=>a+b,0)+esp*(ws.length-1); let px=x-tot/2;
  morceaux.forEach(([s,t],k)=>{ if(T>=t) ecrire(c,s,px,y,fs*zoom(T,t,.15),coul,'left'); px+=ws[k]+esp; }); }
/* Un texte couché (le long d'un côté vertical) */
function trCouche(c,s,x,y,fs,coul){ c.save(); c.translate(x,y); c.rotate(-Math.PI/2); ecrire(c,s,0,0,fs,coul); c.restore(); }
/* Une cote : trait jaune le long d'un côté, tracé de u = 0 à 1 */
function trCote(c,x1,y1,x2,y2,u){ if(u<=0) return; u=Math.min(1,u); c.strokeStyle=CRAIE.jaune; c.lineWidth=6; c.lineCap='round';
  c.beginPath(); c.moveTo(x1,y1); c.lineTo(x1+(x2-x1)*u,y1+(y2-y1)*u); c.stroke(); }

FILMS['triangle-rectangle']=function(outils){
  const DUR={'00-accroche':11.16,'01-dispute':6.93,'02-question':15.05,'02b-reponse':16.7,'03-ouf':4.92,'04-commentaire':10.74,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dis,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  /* « 10 centimètres » a deux marques : la 1re = « dix », la 2e = « centimètres » ; nombre + unité s'écrit à la 2e */
  const tDix=mot('00-accroche','10'), t10cm=mot('00-accroche','centimètres',2), tCote0=mot('00-accroche','côté'),
        tCoupe=mot('00-accroche','coupe'), tDiag=mot('00-accroche','diagonale'), tDeuxT=mot('00-accroche','deux'),
        tTris=mot('00-accroche','triangles'), tSoeur=mot('00-accroche','sœur'), tCoupe2=mot('00-accroche','coupe',2),
        tDroit=mot('00-accroche','droit'), tDeuxR=mot('00-accroche','deux',2), tRects=mot('00-accroche','rectangles');
  const tTon=mot('01-dispute','triangle'), tPlus=mot('01-dispute','plus'), tPetit=mot('01-dispute','petit'),
        tRect1=mot('01-dispute','rectangle'), tMoi=mot('01-dispute','Moi'), tPareil1=mot('01-dispute','pareil');
  const tC=mot('02b-reponse','C'), tFois=mot('02b-reponse','fois',2), tMon=mot('02b-reponse','Mon'),
        tMoitie=mot('02b-reponse','moitié'), t50=mot('02b-reponse','50'),
        tMoitie2=mot('02b-reponse','moitié',2), t50b=mot('02b-reponse','50',2),
        tPareilR=mot('02b-reponse','Pareil');
  const tPointe=mot('03-ouf','pointe'), tCroque=mot('03-ouf','croque');
  const tToast4=mot('04-commentaire','toast'), t12cm=mot('04-commentaire','centimètres',2), t10d=mot('04-commentaire','10'),
        tCoupe4=mot('04-commentaire','coupé'), tDiag4=mot('04-commentaire','diagonale'), tQuelle=mot('04-commentaire','Quelle'),
        tTri4=mot('04-commentaire','triangle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tDix-.08, finR=tMon-.08;
  const S=TR_S, X=TR_X, YA=TR_YA, YB=TR_YB, XR=TR_XR;
  const ecart=(T,t0)=>T<t0?0:12*Math.min(1,(T-t0)/.4);

  /* Mon toast (en haut) : entier, puis coupé en diagonale ; hl = le triangle de Ti Margo mis en avant */
  function toastA(c,T,etat){ const d=ecart(T,tDeuxT);
    if(T<tDeuxT){ trMorceau(c,[[X,YA],[X+S,YA],[X+S,YA+S],[X,YA+S]],TR_MIE,TR_CROUTE,T<finTitre+.5?zoom(T,finTitre,.3):1);
      trCouteau(c,X,YA,X+S,YA+S,(T-tCoupe)/(tDiag+.5-tCoupe)); return d; }
    const [bas,haut]=trMoities(X,YA,S,S,d,true), orange=T>=tTris;
    const un=etat.seul, zb=etat.zb||1;
    trMorceau(c,haut,orange&&!un?TRIANGLE:TR_MIE,orange&&!un?TRIANGLE_B:TR_CROUTE);
    trMorceau(c,bas,orange?TRIANGLE:TR_MIE,orange?TRIANGLE_B:TR_CROUTE,zb);
    return d; }
  /* Le toast de ma sœur (en bas) : entier, puis coupé tout droit */
  function toastB(c,T,etat){ if(T<tSoeur) return 0; const d=ecart(T,tDeuxR);
    if(T<tDeuxR){ trMorceau(c,[[X,YB],[X+S,YB],[X+S,YB+S],[X,YB+S]],TR_MIE,TR_CROUTE,T<tSoeur+.5?zoom(T,tSoeur,.3):1);
      trCouteau(c,X+S/2,YB-14,X+S/2,YB+S+14,(T-tCoupe2)/(tDroit+.4-tCoupe2)); return d; }
    const [g,dr]=trMoities(X,YB,S,S,d,false), rose=T>=tRects, un=etat.seul, zb=etat.zb||1;
    trMorceau(c,dr,rose&&!un?TR_SOEUR:TR_MIE,rose&&!un?TR_SOEUR_B:TR_CROUTE);
    trMorceau(c,g,rose?TR_SOEUR:TR_MIE,rose?TR_SOEUR_B:TR_CROUTE,zb);
    return d; }
  /* « 10 cm » en haut et à gauche de mon toast */
  function cotes(c,T){ trCote(c,X,YA-16,X+S,YA-16,(T-t10cm)/.5); if(T>=t10cm) ecrire(c,'10 cm',X+S/2,YA-44,40*zoom(T,t10cm,.4),CRAIE.jaune);
    trCote(c,X-16,YA,X-16,YA+S,(T-tCote0)/.5); if(T>=tCote0) trCouche(c,'10 cm',X-46,YA+S/2,40*zoom(T,tCote0,.4),CRAIE.jaune); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un toast de 12 cm sur 10, coupé en diagonale (même échelle : 24 px par cm) */
      const W=288, H=240, x=150, y=150, d=ecart(T,tDiag4+.6);
      if(T>=tToast4){
        if(T<tDiag4+.6){ trMorceau(c,[[x,y],[x+W,y],[x+W,y+H],[x,y+H]],TR_MIE,TR_CROUTE,T<tToast4+.5?zoom(T,tToast4,.3):1);
          trCouteau(c,x,y,x+W,y+H,(T-tCoupe4)/(tDiag4+.5-tCoupe4)); }
        else { const [bas,haut]=trMoities(x,y,W,H,d,true), o=T>=tTri4;
          trMorceau(c,haut,TR_MIE,TR_CROUTE); trMorceau(c,bas,o?TRIANGLE:TR_MIE,o?TRIANGLE_B:TR_CROUTE,o&&T<tTri4+.6?zoom(T,tTri4,.3):1); } }
      trCote(c,x,y-18,x+W,y-18,(T-t12cm)/.5); if(T>=t12cm) ecrire(c,'12 cm',x+W/2,y-48,44*zoom(T,t12cm,.4),CRAIE.jaune);
      trCote(c,x-18,y,x-18,y+H,(T-t10d)/.5); if(T>=t10d) trCouche(c,'10 cm',x-50,y+H/2,44*zoom(T,t10d,.4),CRAIE.jaune);
      if(T>=tQuelle) ecrire(c,'? cm²',XR+40,300,110*zoom(T,tQuelle,.5),CRAIE.jaune);
      tab.maj(); return; }

    if(T<q){ /* l'histoire : mon toast, celui de ma sœur, la dispute */
      const dansD=T>=tTon, seulA=dansD, seulB=T>=tRect1;
      toastA(c,T,{seul:seulA,zb:dansD&&T<tTon+.6?zoom(T,tTon,.3):1});
      toastB(c,T,{seul:seulB,zb:seulB&&T<tRect1+.6?zoom(T,tRect1,.3):1});
      cotes(c,T);
      trLigne(c,T,[['2',tDeuxT],['triangles',tTris]],XR,150,62,TRIANGLE);
      trLigne(c,T,[['2',tDeuxR],['rectangles',tRects]],XR,500,62,TR_SOEUR);
      trLigne(c,T,[['plus',tPlus],['petit ?',tPetit]],XR,236,56,CRAIE.faux);
      if(T>=tPareil1) ecrire(c,'pareil ?',XR,340,78*zoom(T,tPareil1,.5),CRAIE.jaune);
      tab.maj(); return; }

    /* la réponse : la moitié de 100, 50 ; pareil pour le rectangle ; puis je croque la pointe */
    const dA=toastA(c,T,{seul:true}), dB=toastB(c,T,{seul:true});
    cotes(c,T);
    const [basA,hautA]=trMoities(X,YA,S,S,dA,true), [gB,drB]=trMoities(X,YB,S,S,dB,false);
    if(T>=tMoitie&&T<ouf) trFantome(c,hautA,X+S/2,YA+S/2,Math.PI*Math.min(1,(T-tMoitie)/.8));
    if(T>=tMoitie2&&T<ouf) trFantome(c,drB,X+S/2,YB+S/2,Math.PI*Math.min(1,(T-tMoitie2)/.8));
    if(T>=t50) ecrire(c,'50',X+S/3-dA,YA+2*S/3+dA,64*zoom(T,t50,.5),'#0b2545');
    if(T>=t50b) ecrire(c,'50',X+S/4-dB,YB+S/2,64*zoom(T,t50b,.5),'#0b2545');
    ecrire(c,'toast : 100 cm²',XR,96,52,CRAIE.blanc);
    trLigne(c,T,[['moitié :',tMoitie],['50 cm²',t50]],XR,200,58,TRIANGLE);
    trLigne(c,T,[['moitié :',tMoitie2],['50 cm²',t50b]],XR,520,58,TR_SOEUR);
    if(T>=tPareilR){ ecrire(c,'pareil !',XR-50,350,84*zoom(T,tPareilR,.5),CRAIE.ok); coche(c,XR+130,355,.42); }
    /* 03 : la pointe de mon triangle, puis la croquée */
    const px=X+S-dA, py=YA+S+dA;
    if(T>=tPointe&&T<tCroque) cercle(c,px-20,py-10,50,CRAIE.jaune,(T-tPointe)/.3);
    if(T>=tCroque){ const u=Math.min(1,(T-tCroque)/.25); c.fillStyle=tab.fond;
      for(const [ox,oy,rr] of [[-30,-6,32],[-6,-30,30],[-56,8,26]]){ c.beginPath(); c.arc(px+ox,py+oy,rr*u,0,7); c.fill(); } }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-dispute'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=groupe(acc+.1,finTitre,330,62,a0('Mon toast carré :'));
  const s0=suiteDe(dis,60,62,[a0('10 centimètres de côté.')],[a0('Je le coupe en diagonale :'),a0('deux triangles.')],
      [a0('Ma sœur coupe le sien'),a0('tout droit :'),a0('deux rectangles.')]);
  const s1=suiteDe(q,60,62,[a1('Elle dit : ton triangle'),a1('est plus petit'),a1('que mon rectangle !')],[a1('Moi, je dis :'),a1("c'est pareil !")]);
  qd('Question !');
  const phraseQ=[qd("Quelle est l'aire"),qd('de mon triangle ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q, qm=(m,n=1)=>mot('02-question',m,n);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le toast : 10 × 10,'), r2=rd('100 centimètres carrés.');
  r1[3][4]=tFois; /* le signe « × » paraît quand la voix dit « fois » */
  const groupes=[g0,...s0,...s1,
    ...suiteDe(ouf,60,62,[rd('Mon triangle en est'),rd('la moitié : 50.')],[rd('Et le rectangle'),rd('de ma sœur ?')],
      [rd('La moitié aussi : 50.')],[rd('Pareil !')]),
    ...suiteDe(com,60,62,[a3('Égalité…'),a3('mais mon triangle'),a3('a une pointe :')],[a3('je croque en premier !')]),
    ...suiteDe(f,60,60,[a4('À toi : un toast'),a4('rectangulaire')],[a4('de 12 centimètres sur 10,'),a4('coupé en diagonale.')],
      [a4("Quelle est l'aire"),a4("d'un triangle ?")],[a4('Réponds en commentaire !')])
  ];

  /* Les choix : le nombre paraît quand la voix le dit, puis « cm » (« centimètres »), puis « ² » (« carrés ») */
  const motsChoix=[]; const sp=(w,t)=>{ const k=motsChoix.length; motsChoix.push(t); return `<span class="trw${k}">${w}</span>`; };
  const choixDe=(n,k)=>`${n} ${sp('cm',qm('centimètres',2*k))}${sp('²',qm('carrés',k))}`;
  const choixA=choixDe('100',1), choixB=choixDe('20',2), choixC=choixDe('50',3);
  { const css=document.createElement('style'); css.textContent=motsChoix.map((_,k)=>`body:not(.trv${k}) .trw${k}{visibility:hidden;}`).join(''); document.head.append(css); }

  const mini=`<svg width="300" height="227" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<path d="M40 44 L196 44 L196 200 Z" fill="${TR_MIE}" stroke="${TR_CROUTE}" stroke-width="7" stroke-linejoin="round"/>`+
    `<path d="M34 52 L34 208 L190 208 Z" fill="${TRIANGLE}" stroke="${TRIANGLE_B}" stroke-width="7" stroke-linejoin="round"/>`+
    `<text x="268" y="170" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le triangle est<br>plus petit ?'+PARI,mini);
  return { clips,FIN,titre:'Le duel des toasts',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dis,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[[choixA,tq('A'),tq('100')],[choixB,tq('B'),tq('20')],[choixC,tq('C'),tq('50')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      motsChoix.forEach((t,k)=>document.body.classList.toggle('trv'+k,T>=t));
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.montre();
      else if(T<dis){ T<tSoeur?g.montre():g.ouvre(); }
      else if(T<q){ T<tMoi?g.oups():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<tPareilR?g.montre():g.fier(); }
      else if(T<com){ T<tCroque?g.ouvre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
