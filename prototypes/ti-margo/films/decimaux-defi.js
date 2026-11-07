/* Série Nombres décimaux 6e, épisode 06 : LE PIÈGE DES ÉTIQUETTES.
   Avec 3, 7 et 2, Ti Margo veut le plus grand nombre à deux chiffres après la virgule :
   il écrit 2,37, tout à l'envers. Le plus gros chiffre au rang le plus fort : 7,32.
   Chargé après films/decimaux.js : voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, poserClasse, gestes… */
FILMS['defi']=function(outils){
  const DUR={'00-accroche':13.69,'01-envers':6.37,'02-question':14.44,'02b-reponse':9.45,'03-lecon':3.34,'04-commentaire':9.27,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-lecon':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,env,q,r,lec,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tAvec=mot('00-accroche','Avec'), t3=mot('00-accroche','3'), t7=mot('00-accroche','7'), t2=mot('00-accroche','2'), tJe=mot('00-accroche','je'),
        tDeux=mot('00-accroche','deux'), t237=mot('00-accroche','2',2), tParie=mot('00-accroche','paries');
  const tEnvers=mot('01-envers','l’envers'), tPetit=mot('01-envers','petit'), tDevant=mot('01-envers','devant');
  const tGros=mot('03-lecon','gros'), tDevL=mot('03-lecon','devant');
  const t4=mot('04-commentaire','4'), t1=mot('04-commentaire','1'), t7c=mot('04-commentaire','7'), tSeul=mot('04-commentaire','seul'), tRep=mot('04-commentaire','Réponds');

  /* Les étiquettes : des cartons crème, le chiffre à l'encre */
  function carton(c,v,x,y,z=1,bord='#b45309',encre='#1f2937'){ if(z<=0) return; const w=170*z,h=200*z;
    c.fillStyle='#fef3c7'; c.strokeStyle=bord; c.lineWidth=8; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,22*z); c.fill(); c.stroke();
    ecrire(c,String(v),x,y+6*z,140*z,encre); }
  function trou(c,x,y){ c.strokeStyle='rgba(248,249,250,.8)'; c.lineWidth=6; c.setLineDash([18,14]); c.beginPath(); c.roundRect(x-92,y-108,184,216,22); c.stroke(); c.setLineDash([]); }
  function virgule(c,x,y){ c.fillStyle=CRAIE.virgule; c.beginPath(); c.arc(x,y,17,0,7); c.fill(); c.strokeStyle=CRAIE.virgule; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(x+5,y+6); c.lineTo(x-10,y+36); c.stroke(); }
  const lerp=(a,b,u)=>a+(b-a)*lisse(Math.max(0,Math.min(1,u)));
  const W=tab.W, HAUT=170, BAS=480;
  const LIBRE=[W/2-270,W/2,W/2+270];
  const S3=[W/2-300,W/2-40,W/2+200], VX3=W/2-170;            /* _ , _ _ */
  const S4=[W/2-310,W/2-80,W/2+230], VX4=W/2+75;             /* _ _ , _ */
  /* Où est chaque carton (3, 7, 2) à l'instant T */
  function places(T){
    const libre=[[LIBRE[0],HAUT],[LIBRE[1],HAUT],[LIBRE[2],HAUT]];
    if(T<t237) return libre;
    /* 2,37 : le 2 devant, puis 3, puis 7 */
    const vers237=[[S3[1],BAS],[S3[2],BAS],[S3[0],BAS]], dep=[.15,.3,0];
    let p=libre.map((l,i)=>[lerp(l[0],vers237[i][0],(T-t237-dep[i])/.45),lerp(l[1],vers237[i][1],(T-t237-dep[i])/.45)]);
    if(T<lec) return p;
    /* 7,32 : le 7 devant */
    const vers732=[[S3[1],BAS],[S3[0],BAS],[S3[2],BAS]];
    return p.map((l,i)=>[lerp(l[0],vers732[i][0],(T-lec-.1)/.6),lerp(l[1]-(i===0?0:0),vers732[i][1],(T-lec-.1)/.6)]);
  }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 4, 1, 7 ; la réponse reste à l'élève */
      [[4,t4],[1,t1],[7,t7c]].forEach(([v,t],i)=>{ if(T>=t) carton(c,v,LIBRE[i],HAUT,Math.max(1,pop(T,t)*.5+.5)); });
      if(T>=tSeul){ S4.forEach(x=>trou(c,x,BAS)); virgule(c,VX4,BAS+60); }
      if(T>=tRep) ecrire(c,'= ?',W/2+80,665,84*Math.max(1,pop(T,tRep)),CRAIE.d);
      tab.maj(); return; }
    if(T>=tDeux){ S3.forEach(x=>trou(c,x,BAS)); virgule(c,VX3,BAS+60); }
    const P3=places(T), fauxNb=T>=env&&T<lec, bonNb=T>=lec;
    [[3,t3],[7,t7],[2,t2]].forEach(([v,t],i)=>{ if(T<t) return;
      let z=Math.max(1,pop(T,t)*.5+.5);
      if(bonNb&&v===7&&T>=tGros) z=Math.max(1,pop(T,tGros)*.5+.5);
      const bord=fauxNb&&v===2&&T>=tPetit?CRAIE.faux:(bonNb&&v===7&&T>=tGros?'#2f9e44':'#b45309');
      carton(c,v,P3[i][0],P3[i][1],z,bord); });
    /* Le 2 devant : entouré en rouge */
    if(fauxNb&&T>=tPetit){ const u=Math.min(1,(T-tPetit)/.4); c.strokeStyle=CRAIE.faux; c.lineWidth=10; c.beginPath(); c.arc(S3[0],BAS,150*(.6+.4*u),0,7); c.stroke(); }
    /* 7,32 : la coche */
    if(bonNb&&T>=tDevL){ c.strokeStyle=CRAIE.ok; c.lineWidth=18; c.lineCap='round'; c.beginPath(); c.moveTo(W/2+330,BAS-10); c.lineTo(W/2+370,BAS+40); c.lineTo(W/2+460,BAS-70); c.stroke(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-envers'), a3=dit('03-lecon'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !'),a0('Avec les étiquettes'),a0('3, 7 et 2,')),
    ...suiteDe(env,60,60,[a0('je fabrique le plus'),a0('grand nombre,')],[a0('avec deux chiffres'),a0('après la virgule.')],[a0('2,37 !')],[a0('Tu paries que'),a0('c’est le plus grand ?')]),
    ...suiteDe(q,60,62,[a1('Hmm...')],[a1('J’ai tout fait'),a1('à l’envers.')],[a1('J’ai mis le plus'),a1('petit chiffre devant !')]),
    ...suiteDe(com,60,64,[a3('Je retiens :'),a3('le plus gros'),a3('chiffre devant !')]),
    ...suiteDe(f,60,56,[a4('À toi : avec 4, 1 et 7,'),a4('écris le plus petit nombre')],[a4('avec un seul chiffre'),a4('après la virgule.')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quel est le plus grand ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le plus gros chiffre'), r2=rd('au rang le plus fort :'), r3=rd('7, puis 3, puis 2 : 7,32.');

  poserMiniature(outils,acc+1,'Le plus grand<br>nombre ?'+PARI,
    `<svg width="300" height="113" viewBox="0 0 560 210">${[3,7,2].map((v,i)=>`<rect x="${8+i*186}" y="8" width="170" height="194" rx="22" fill="#fef3c7" stroke="#b45309" stroke-width="10"/><text x="${93+i*186}" y="152" font-family="Segoe UI" font-weight="800" font-size="140" fill="#1f2937" text-anchor="middle">${v}</text>`).join('')}</svg>`);
  return { clips,FIN,titre:'Le piège des étiquettes',ceinture:1,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,env,q,r,lec,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:lec,cpt:fin('02-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2,37',tq('A'),tq('2')],['7,32',tq('B'),tq('7')],['3,72',tq('C'),tq('3')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B !']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<lec, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<env){ if(T<t237-.3) g.montre(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T<tEnvers-.3) g.reflechit(); else { g.oups(); scene.ry=-.12+.3*lisse((T-tEnvers+.3)/.35); } }
      else if(T<r) g.reflechit();
      else if(T<lec){ T<r+.62?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tGros?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
