/* ============================================================
   Série Longueurs CM1 — ÉPISODE 01 : QUI A SAUTÉ LE PLUS LOIN ? Outils : films/cm1-commun.js + cm1-longueur.js.
   Concours de saut en longueur : moi 150, Noé 2. « 150, c'est bien plus que 2 : j'ai gagné ! »
   Noé rigole : les unités ! 2 m = 200 cm. 200 cm contre 150 cm : Noé a sauté 50 cm de plus (A).
   Commentaire : une corde de 3 m et une ficelle de 250 cm. Laquelle est la plus longue ?
   ============================================================ */
FILMS['comparer']=function(outils){
  fusionnerNombres();
  /* « 250 centimètres » a 4 marques identiques : on n'en garde que 2 (une par mot écrit) */
  { const CL=window.CUES[VIDEO]; for(const k in CL){ const res=[]; let n=0;
      for(const e of CL[k]){ const der=res[res.length-1]; n=der&&der[1]===e[1]?n+1:1; if(n<=e[1].trim().split(/\s+/).length) res.push(e); }
      CL[k]=res; } }
  const DUR={'00-accroche':11.92,'01-unite':8.46,'02-question':12.62,'02b-reponse':10.36,'03-ouf':4.2,'04-commentaire':10.45,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMoi=mot('00-accroche','Moi'), t150=mot('00-accroche','150'), tNoe=mot('00-accroche','Noé'), t2=mot('00-accroche','2'),
        t150b=mot('00-accroche','150',2), tPlus=mot('00-accroche','plus'), t2b=mot('00-accroche','2',2), tGagne=mot('00-accroche','gagné');
  const tUnites=mot('01-unite','unités'), t2m=mot('01-unite','2'), t150cm=mot('01-unite','150');
  const tRessorts=mot('03-ouf','ressorts');
  const tCorde=mot('04-commentaire','corde'), t3m=mot('04-commentaire','3'), tFicelle=mot('04-commentaire','ficelle'),
        t250=mot('04-commentaire','250'), tLaq=mot('04-commentaire','Laquelle'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMoi-.08, XR=790;

  /* Les deux sauts, à l'échelle : 3,3 px par cm, depuis la ligne d'appel (x = X0) ; le texte en haut de l'ardoise */
  const X0=90, PX=3.3, YM=370, YN=570, EP=44, YH=140;
  const deroule=(T,t,d=.8)=>T<t?0:Math.min(1,(T-t)/d);
  function ressort(c,x,y,u){ if(u<=0) return; c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.lineCap='round'; c.lineJoin='round'; c.beginPath(); c.moveTo(x,y);
    for(let k=1;k<=8;k++) c.lineTo(x+(k%2?-20:20),y-k*9*u); c.lineTo(x,y-80*u); c.stroke(); }
  function pelote(c,x,y,R,coul,z){ if(z<=0) return; const k=Math.min(1.12,z); c.strokeStyle=coul; c.lineWidth=11; c.lineCap='round';
    for(let i=0;i<4;i++){ c.beginPath(); c.arc(x,y,R*k*(1-i*.22),0,Math.PI*2); c.stroke(); }
    c.beginPath(); c.moveTo(x+R*k,y); c.quadraticCurveTo(x+R*k*1.3,y+R*k*.9,x+R*k*1.75,y+R*k*.7); c.stroke(); }
  /* un saut : le ruban se déroule, son étiquette suit le bout du ruban */
  function saut(c,y,cm,coul,T,t,txt,taille,teinte){ const u=deroule(T,t); rubanCraie(c,X0,y,cm*PX,coul,u,EP);
    if(T>=t&&txt) ecrire(c,txt,X0+cm*PX*u+22,y,taille,teinte,'left'); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une corde de 3 m, une ficelle de 250 cm, roulées (on ne donne pas la réponse) */
      if(T>=tCorde) pelote(c,250,380,130,RUBAN2,zoom(T,tCorde,.4));
      if(T>=t3m) ecrire(c,'3 m',250,600,76*zoom(T,t3m,.4),CRAIE.jaune);
      if(T>=tFicelle) pelote(c,660,400,100,RUBAN3,zoom(T,tFicelle,.4));
      if(T>=t250) ecrire(c,'250 cm',670,600,76*zoom(T,t250,.4),CRAIE.jaune);
      if(T>=tLaq) ecrire(c,'?',950,380,200*zoom(T,tLaq,.6),CRAIE.jaune);
      tab.maj(); return; }
    const rep=T>=ouf, cm=T>=t150cm, m=T>=t2m;
    /* la ligne d'appel */
    c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.setLineDash([16,12]); c.beginPath(); c.moveTo(X0,270); c.lineTo(X0,630); c.stroke(); c.setLineDash([]);
    /* mon saut (150 cm) et celui de Noé (200 cm) */
    if(T>=tMoi) ecrire(c,'moi',X0+16,YM-62,56*zoom(T,tMoi,.4),CRAIE.gris,'left');
    saut(c,YM,150,RUBAN,T,t150,cm?'150 cm':'150',(cm?60:68)*(cm&&!rep?zoom(T,t150cm,.5):(T<uni?zoom(T,t150,.4):1)),CRAIE.jaune);
    if(T>=tNoe) ecrire(c,'Noé',X0+16,YN-62,56*zoom(T,tNoe,.4),CRAIE.gris,'left');
    saut(c,YN,200,RUBAN2,T,t2,rep?'200 cm':(m?'2 m':'2'),(rep?60:68)*(m&&!rep?zoom(T,t2m,.5):(T<uni?zoom(T,t2,.4):1)),rep?CRAIE.ok:CRAIE.jaune);
    if(T<uni){
      if(T>=t150b) ecrire(c,'150',250,YH,110*zoom(T,t150b,.4),CRAIE.faux);
      if(T>=tPlus) ecrire(c,'>',400,YH,96*zoom(T,tPlus,.4),CRAIE.blanc);
      if(T>=t2b) ecrire(c,'2',510,YH,110*zoom(T,t2b,.4),CRAIE.faux);
      if(T>=tGagne) ecrire(c,"j'ai gagné ?",800,YH,60*zoom(T,tGagne,.4),CRAIE.gris);
    } else if(T<ouf){
      if(T>=tUnites) ecrire(c,'regarde les unités !',528,YH,74*zoom(T,tUnites,.4),CRAIE.faux);
    } else { /* la réponse : 200 cm contre 150 cm, Noé a sauté 50 cm de plus */
      const xa=X0+150*PX, xb=X0+200*PX;
      c.strokeStyle=CRAIE.gris; c.lineWidth=4; c.setLineDash([10,10]); c.beginPath(); c.moveTo(xa,YM+26); c.lineTo(xa,YN-26); c.stroke(); c.setLineDash([]);
      flecheLongueur(c,xa,xb,YN-58,CRAIE.ok,deroule(T,ouf,.5),6);
      ecrire(c,'+ 50 cm',(xa+xb)/2,YN-108,54*zoom(T,ouf,.4),CRAIE.ok);
      coche(c,X0+150,YN-60,.45);
      ecrire(c,'200 cm',290,YH,80,CRAIE.ok); ecrire(c,'>',528,YH,80,CRAIE.blanc); ecrire(c,'150 cm',766,YH,80,CRAIE.jaune);
      if(T>=tRessorts){ const u=deroule(T,tRessorts,.4); ressort(c,X0+190,YM-24,u); ressort(c,X0+250,YM-24,u); } }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-unite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Concours de saut'),a0('en longueur !')),
    ...suiteDe(uni,60,60,[a0("Moi, j'ai sauté 150.")],[a0('Noé, seulement 2.')],[a0("150, c'est bien plus que 2 :"),a0("j'ai gagné !")]),
    ...suiteDe(q,60,62,[a1('Noé rigole :'),a1('regarde les unités !')],[a1('Lui, 2 mètres.'),a1('Moi, 150 centimètres.')]),
    ...suiteDe(com,60,62,[a3('Bon… la prochaine fois,'),a3('je saute avec des ressorts !')]),
    ...suiteDe(f,60,60,[a4('À toi : une corde'),a4('de 3 mètres,')],[a4('et une ficelle'),a4('de 250 centimètres.')],
      [a4('Laquelle est'),a4('la plus longue ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui a sauté le plus loin ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("2 mètres, c'est 200 centimètres."), r2=rd('200 contre 150 :'), r3=rd('Noé a sauté'), r4=rd('50 centimètres de plus.');
  const tA=mot('02b-reponse','A');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<line x1="34" y1="40" x2="34" y2="210" stroke="#f8f9fa" stroke-width="5" stroke-dasharray="12 9"/>`+
    `<rect x="34" y="70" width="135" height="28" rx="14" fill="${RUBAN}" stroke="#f8f9fa" stroke-width="3"/>`+
    `<rect x="34" y="150" width="180" height="28" rx="14" fill="${RUBAN2}" stroke="#f8f9fa" stroke-width="3"/>`+
    `<text x="272" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'150 cm ou 2 m :<br>qui a gagné ?'+PARI,mini);
  return { clips,FIN,titre:'Qui a sauté le plus loin ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['Noé',tq('A',2),tq('Noé')],['moi, Ti Margo',tq('B'),tq('moi')],["c'est pareil",tq('C'),tq("c'est")]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tGagne?g.montre():g.fier(); }
      else if(T<q){ T<tUnites?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.oups(); }
      else if(T<com){ T<tRessorts?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
