/* ============================================================
   Série Solides CM2 — ÉPISODE 05 : LE DÉ QUI NE FERME PAS. Outils : films/cm2-commun.js + cm2-solides.js
   (plierPatron, cav, rotRod, teinte : le pliage d'un patron de cube en 3D, perspective cavalière).
   Ti Margo découpe 6 carrés en 2 rangées de 3 et plie : deux faces l'une sur l'autre, un trou de chaque côté.
   Question : combien de patrons de cube différents ? 11 (B) ; la croix en est un, les 2 rangées de 3 non.
   Il reprend la croix : le dé se ferme et roule. Commentaire : le 1 est en face du 6 ; en face du 3 ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le patron à gauche, le texte à droite (Ti Margo cache le bas du milieu). */
const PC_XR=840;
/* Les 2 rangées de 3 : le fond en bas au milieu ; hg et hd tiennent au carré du haut (ils se plient sur g et d) */
PATRONS.pcRangees=[{g:[0,0],fond:[1,0],d:[2,0],hg:[0,1],haut:[1,1],hd:[2,1]},{fond:null,g:'fond',d:'fond',haut:'fond',hg:'haut',hd:'haut'}];
const PC_COUL={fond:'#ffd43b',g:'#ff8787',d:'#69db7c',haut:'#74c0fc',hg:'#b197fc',hd:'#ffa94d',av:'#74c0fc',ar:'#b197fc',couv:'#ffa94d'};
/* Les 11 patrons du cube (colonne, rangée vers le bas) ; le premier = la croix */
const PC_ONZE=[
  [[1,0],[0,1],[1,1],[2,1],[3,1],[1,2]],
  [[0,0],[0,1],[1,1],[2,1],[3,1],[0,2]],[[0,0],[0,1],[1,1],[2,1],[3,1],[1,2]],[[0,0],[0,1],[1,1],[2,1],[3,1],[2,2]],
  [[0,0],[0,1],[1,1],[2,1],[3,1],[3,2]],[[1,0],[0,1],[1,1],[2,1],[3,1],[2,2]],
  [[0,0],[1,0],[1,1],[2,1],[3,1],[1,2]],[[0,0],[1,0],[1,1],[2,1],[3,1],[2,2]],[[0,0],[1,0],[1,1],[2,1],[3,1],[3,2]],
  [[0,0],[1,0],[1,1],[2,1],[2,2],[3,2]],[[0,0],[1,0],[2,0],[2,1],[3,1],[4,1]]];
/* Un petit patron centré en (cx, cy), cellule s, qui grossit avec z */
function pcMiniPatron(c,cel,cx,cy,s,z,coul='#f8f9fa',bord='#7c4a12'){ if(z<=0) return; const k=Math.min(1.2,z)*s;
  const nc=Math.max(...cel.map(p=>p[0]))+1, nr=Math.max(...cel.map(p=>p[1]))+1;
  c.fillStyle=coul; c.strokeStyle=bord; c.lineWidth=4;
  for(const [x,y] of cel){ c.beginPath(); c.rect(cx+(x-nc/2)*k,cy+(y-nr/2)*k,k,k); c.fill(); c.stroke(); } }
/* Dessine des carrés 3D (de plierPatron, éventuellement roulés) : décalage (ox, oy) donné, tri du fond vers l'avant */
function pcCarres(c,carres,e,ox,oy,{couleurs=PC_COUL,numeros=null,surligne={}}={}){
  const tri=[...carres].sort((a,b)=>b.P.reduce((s,p)=>s+dot(p,VUE),0)-a.P.reduce((s,p)=>s+dot(p,VUE),0));
  for(const q of tri){ const pr=q.P.map(p=>cav(p,e,ox,oy)), n0=newell(q.P), n=dot(n0,VUE)>0?n0.map(v=>-v):n0;
    c.fillStyle=teinte(surligne[q.nom]||couleurs[q.nom]||'#e8b04b',n); c.strokeStyle='#7c4a12'; c.lineWidth=6; c.lineJoin='round';
    c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke();
    if(numeros&&numeros[q.nom]){ const g=pr.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4],[0,0]); ecrire(c,numeros[q.nom],g[0],g[1]+4,64,'#3b2a14'); } } }
/* Le décalage pour que le centre du fond (à plat, tilt donné) arrive en (cx, cy) */
function pcAncre(carres,e,cx,cy){ const f=carres.find(q=>q.nom==='fond'), m=f.P.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4,a[2]+p[2]/4],[0,0,0]), o=cav(m,e,0,0); return [cx-o[0],cy-o[1]]; }
function pcProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }

FILMS['patron-construire']=function(outils){
  const DUR={'00-accroche':8.22,'01-rate':4.00,'02-question':13.87,'02b-reponse':10.43,'03-ouf':4.01,'04-commentaire':8.62,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,rat,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const t6=mot('00-accroche','6'), tHaut=mot('00-accroche','haut'), t3h=mot('00-accroche','3',1), t3b=mot('00-accroche','3',3), tBas=mot('00-accroche','bas'),
        tPlie=mot('00-accroche','plie');
  const tFaces=mot('01-rate','faces'), tLune=mot('01-rate','l\'une'), tTrou=mot('01-rate','trou');
  const tIl=mot('02b-reponse','Il'), tB=mot('02b-reponse','B'), t11=mot('02b-reponse','11'), tCroix=mot('02b-reponse','croix'),
        tRangees=mot('02b-reponse','rangées'), tNon=mot('02b-reponse','non'), tPas=mot('02b-reponse','pas');
  const tCroix2=mot('03-ouf','croix'), tRoule=mot('03-ouf','roule'), tEnfin=mot('03-ouf','enfin');
  const tC1=mot('04-commentaire','1'), tC6=mot('04-commentaire','6'), tC3=mot('04-commentaire','3'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t6-.08, finR=tIl-.08;

  /* les 2 rangées de 3 : à plat face à nous (e = 130), puis couchées et pliées (e = 190) */
  const XP=330, YP=360, EP=150, EC=290;
  function rangees(c,T,t0,{ztop=1,zbas=1,surligne={}}={}){
    const v=lisse01(entre(T,t0,t0+.6)), u=lisse01(entre(T,t0+.3,rat+.5)), tilt=-90+90*v, e=EP+(EC-EP)*u;
    const car=plierPatron('pcRangees',{g:90*u,d:90*u,haut:90*u,hg:82*u,hd:82*u},tilt);
    const [ox,oy]=pcAncre(car,e,XP-20*v,YP+110*v);
    /* les carrés qui apparaissent : on les dessine petits (zoom autour de leur centre) avant le pliage */
    const vis=car.filter(q=>(['hg','haut','hd'].includes(q.nom)?ztop:zbas)>0);
    if(v===0&&(ztop<1||zbas<1)){ vis.forEach(q=>{ const z=Math.min(1.2,['hg','haut','hd'].includes(q.nom)?ztop:zbas), m=q.P.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4,a[2]+p[2]/4],[0,0,0]);
      q.P=q.P.map(p=>[m[0]+(p[0]-m[0])*z,m[1]+(p[1]-m[1])*z,m[2]+(p[2]-m[2])*z]); }); }
    pcCarres(c,vis,e,ox,oy,{surligne}); return {e,ox,oy}; }

  /* la croix : à plat (tilt −90), couchée, pliée ; puis le dé roule de « roule » à « enfin » (2 tours de 90°) */
  function de(c,T,{t0,cx,cy,e0,e1,roule=0,numeros=null,couleurs=PC_COUL}){
    const v=lisse01(entre(T,t0,t0+.5)), u=lisse01(entre(T,t0+.5,t0+1.1)), w=lisse01(entre(T,t0+1.1,t0+1.5)), tilt=-90+90*v, e=e0+(e1-e0)*v;
    let car=plierPatron('croix',{g:90*u,d:90*u,av:90*u,ar:90*u,couv:90*w},tilt);
    const [ox,oy]=pcAncre(car,e,cx,cy);
    if(roule>0){ const a1=Math.min(1,roule)*Math.PI/2, a2=Math.max(0,roule-1)*Math.PI/2;
      const rot=(p,px,a)=>{ const v2=rotRod([p[0]-px,p[1],0],[0,0,1],-a); return [px+v2[0],v2[1],p[2]]; };
      car=car.map(q=>({...q,P:q.P.map(p=>{ let s=rot(p,2,a1); if(a2>0) s=rot(s,3,a2); return s; })})); car.forEach(q=>q.n=newell(q.P)); }
    pcCarres(c,car,e,ox,oy,{numeros,couleurs}); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : la croix à plat ; 1 au milieu, 6 en face, 3 devant, « ? » en face du 3 */
      const num={}; if(T>=tC1) num.fond='1'; if(T>=tC6) num.couv='6'; if(T>=tC3) num.av='3'; if(T>=tC3+.3) num.ar='?';
      const car=plierPatron('croix',{},-90), [ox,oy]=pcAncre(car,130,330,380);
      pcCarres(c,car,130,ox,oy,{couleurs:{},numeros:num,surligne:T>=tC3+.3?{ar:'#ffe066'}:{}});
      if(T>=tC3+.3) ecrire(c,'?',PC_XR,330,170*zoom(T,tC3+.3,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<rat){ /* 6 carrés : 3 en haut, 3 en bas ; il plie */
      rangees(c,T,tPlie,{ztop:zoom(T,t3h,.4),zbas:zoom(T,t3b,.4)});
      pcProg(c,[[t6,'6 carrés']],T,PC_XR,170,62,CRAIE.blanc);
      pcProg(c,[[t3h,'3 en'],[tHaut,'3 en haut']],T,PC_XR,270,56,PC_COUL.haut);
      pcProg(c,[[t3b,'3 en'],[tBas,'3 en bas']],T,PC_XR,350,56,PC_COUL.fond);
      tab.maj(); return; }
    if(T<q){ /* raté : deux faces l'une sur l'autre, un trou de chaque côté */
      const rouge=T>=tFaces?{g:'#e03131',hg:'#ff8787',d:'#e03131',hd:'#ff8787'}:{};
      const {e,ox,oy}=rangees(c,T,tPlie,{surligne:rouge});
      if(T>=tTrou){ const u=zoom(T,tTrou,.4), pr=p=>cav(p,e,ox,oy);
        c.save(); c.strokeStyle=CRAIE.jaune; c.lineWidth=10*u; c.setLineDash([20,14]);
        for(const Q of [[[1,1,0],[2,1,0],[2,1,1],[1,1,1]],[[1,0,0],[2,0,0],[2,1,0],[1,1,0]]]){ c.beginPath(); Q.map(pr).forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.stroke(); }
        c.restore(); }
      if(T>=tFaces) ecrire(c,'2 faces',PC_XR,170,62*zoom(T,tFaces,.4),CRAIE.faux);
      if(T>=tLune) ecrire(c,'l’une sur l’autre',PC_XR,250,46*zoom(T,tLune,.4),CRAIE.faux);
      if(T>=tTrou) ecrire(c,'des trous !',PC_XR,370,60*zoom(T,tTrou,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : les 11 patrons ; la croix en est un ; les 2 rangées de 3, non */
      PC_ONZE.forEach((cel,k)=>{ const row=k<6?0:1, col=row?k-6:k, cx=row?130+col*199:95+col*173, cy=row?285:115;
        const croix=k===0&&T>=tCroix; pcMiniPatron(c,cel,cx,cy,33,zoom(T,t11+.07*k,.4),croix?'#8ce99a':'#f8f9fa');
        if(croix){ const z=1+.12*(zoom(T,tCroix,.5)-1); c.strokeStyle=CRAIE.ok; c.lineWidth=8; c.beginPath(); c.roundRect(cx-82*z,cy-62*z,164*z,124*z,14); c.stroke(); } });
      if(T>=t11) ecrire(c,'11 !',PC_XR,450,110*zoom(T,t11,.5),CRAIE.jaune);
      if(T>=tRangees){ const z=zoom(T,tRangees,.4); pcMiniPatron(c,[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]],160,560,46,z,'#ffc9c9');
        if(T>=tNon){ const u=zoom(T,tNon,.5); c.strokeStyle='#e03131'; c.lineWidth=14; c.lineCap='round'; c.beginPath();
          c.moveTo(160-90*u,560-60*u); c.lineTo(160+90*u,560+60*u); c.moveTo(160+90*u,560-60*u); c.lineTo(160-90*u,560+60*u); c.stroke(); } }
      if(T>=tPas){ const z=zoom(T,tPas,.4); ecrire(c,'pas un patron',PC_XR,570,50*z,CRAIE.faux); ecrire(c,'de cube',PC_XR,630,50*z,CRAIE.faux); }
      tab.maj(); return; }
    /* ouf : il reprend la croix ; elle se plie, le dé roule */
    if(T>=tCroix2) de(c,T,{t0:tCroix2,cx:230,cy:420,e0:120,e1:200,roule:2*lisse01(entre(T,tRoule,tEnfin+.6))});
    if(T>=tCroix2&&T<tRoule) ecrire(c,'la croix',PC_XR,150,62*zoom(T,tCroix2,.4),CRAIE.ok);
    if(T>=tEnfin+.3) coche(c,PC_XR+20,600,.7);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-rate'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=[a0('Je découpe un patron'),a0('pour fabriquer mon dé.')];
  rd.saute(2); const r1=rd('Il en existe 11 !'), r2=rd('La croix en est un.'), r3=rd('Mes 2 rangées de 3, non :'), r4=rd('ce n’est pas un patron de cube.');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,...g0),
    ...suiteDe(rat,60,62,[a0('6 carrés :'),a0('3 en haut, 3 en bas.')],[a0('Je plie…')]),
    ...suiteDe(q,60,62,[a1('Deux faces'),a1('l’une sur l’autre…')],[a1('et un trou'),a1('de chaque côté !')]),
    ...suiteDe(ouf,60,62,[r1],[r2],[r3,r4]),
    ...suiteDe(com,60,62,[a3('Je reprends la croix…')],[a3('Mon dé roule enfin !')]),
    ...suiteDe(f,60,60,[a4('À toi : sur un dé,'),a4('le 1 est en face du 6.')],[a4('Qu’y a-t-il'),a4('en face du 3 ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de patrons de cube'),qd('différents existe-t-il ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  const choix=[['1 patron',tq('A'),tq('1')],['11 patrons',tq('B'),tq('11')],['6 patrons',tq('C'),tq('6')]];

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[[0,0],[1,0],[2,0],[0,1],[1,1],[2,1]].map(([x,y],k)=>`<rect x="${30+58*x}" y="${70+58*y}" width="56" height="56" fill="${['#b197fc','#74c0fc','#ffa94d','#ff8787','#ffd43b','#69db7c'][k]}" stroke="#7c4a12" stroke-width="4"/>`).join('')}
    <text x="272" y="150" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien<br>de patrons ?'+PARI,mini);
  return { clips,FIN,titre:'1 patron ou 11 ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,rat,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<rat){ T<tPlie?g.montre():g.fier(); }
      else if(T<q){ if(T<tTrou){ g.oups(); scene.ry=-.12+.3*lisse((T-rat)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.pouce(); }
      else if(T<ouf) g.montre();
      else if(T<com){ T<tRoule?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
