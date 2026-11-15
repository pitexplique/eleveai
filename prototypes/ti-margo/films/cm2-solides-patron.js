/* ============================================================
   Série Solides CM2 — ÉPISODE 04 : LA BOÎTE CADEAU EN PYRAMIDE. Outils : films/cm2-commun.js + cm2-solides.js
   (cav, polyedre, pyramide3, dessinerPoly : perspective cavalière, arêtes cachées en pointillés).
   Ti Margo découpe un patron : 1 carré et 3 triangles autour ; il plie, il colle… il y a un trou sur le côté,
   le cadeau tombe. Question : combien de triangles autour du carré ? 4 (C) : un triangle par côté du carré.
   Il ajoute le 4e triangle : la pyramide se ferme. Commentaire : 1 pentagone + 5 triangles, quel solide ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le patron et la pyramide à gauche, le texte à droite (Ti Margo cache le bas du milieu).
   La pyramide : base carrée de côté 1 (x de 0 à 1, z de 0 à 1, y = 0), sommet à la hauteur PT_H ;
   chaque triangle tourne autour de son côté du carré, de 0 (à plat) à 1 (plié, son sommet au-dessus du centre). */
const PT_H=1, PT_S=Math.hypot(PT_H,.5), PT_PHI=Math.acos(-.5/PT_S), PT_XR=840;
const PT_BASE='#b197fc', PT_LAT='#63e6be', PT_NEUF='#ffe066', PT_CADEAU='#ff6b6b';
/* les 4 côtés du carré : [extrémité a, extrémité b, direction vers l'extérieur] ; d = à droite (le trou) */
const PT_COTES={av:[[0,0,0],[1,0,0],[0,0,-1]],d:[[1,0,0],[1,0,1],[1,0,0]],ar:[[1,0,1],[0,0,1],[0,0,1]],g:[[0,0,1],[0,0,0],[-1,0,0]]};
const ptIncl=(p,tilt)=>{ const t=tilt*Math.PI/180; return [p[0],p[1]*Math.cos(t)-p[2]*Math.sin(t),p[1]*Math.sin(t)+p[2]*Math.cos(t)]; };
/* les sommets d'un triangle du patron, plié de u (0 à 1) */
function ptTriangle(k,u){ const [a,b,d]=PT_COTES[k], m=[(a[0]+b[0])/2,0,(a[2]+b[2])/2], ph=PT_PHI*u;
  return [a,b,[m[0]+d[0]*PT_S*Math.cos(ph),PT_S*Math.sin(ph),m[2]+d[2]*PT_S*Math.cos(ph)]]; }
/* Le patron (plié ou non) dessiné à la craie, du fond vers l'avant.
   tri = {nom: [pli 0-1, zoom 0-1, couleur?]} ; tilt −90 = à plat face à nous, 0 = couché sur la table ;
   l'ancre (cx, cy) = le centre du carré à l'écran ; cadeau = [x, y, z] du coin du cadeau (ou null) */
function ptDessiner(c,tri,tilt,e,cx,cy,{cadeau=null,base=PT_BASE,zbase=1,cotes=null}={}){
  const o=cav(ptIncl([.5,0,.5],tilt),e,0,0), ox=cx-o[0], oy=cy-o[1], pr=p=>cav(ptIncl(p,tilt),e,ox,oy);
  const prof=P=>P.reduce((s,p)=>s+dot(ptIncl(p,tilt),VUE),0)/P.length;
  const items=[];
  if(zbase>0) items.push({P:[[0,0,0],[1,0,0],[1,0,1],[0,0,1]],coul:base,z:zbase});
  for(const [k,[u,z,coul]] of Object.entries(tri)) if(z>0) items.push({P:ptTriangle(k,u),coul:coul||PT_LAT,z,k});
  if(cadeau) items.push({cadeau,d:prof([[cadeau[0]+.18,cadeau[1]+.16,cadeau[2]+.18]])});
  items.forEach(it=>{ if(it.P) it.d=prof(it.P); }); items.sort((a,b)=>b.d-a.d);
  c.save(); c.lineJoin='round'; c.lineCap='round';
  for(const it of items){
    if(it.cadeau){ ptCadeau(c,it.cadeau,tilt,e,ox,oy); continue; }
    let Q=it.P.map(pr); if(it.z<1){ const g=Q.reduce((s,p)=>[s[0]+p[0]/Q.length,s[1]+p[1]/Q.length],[0,0]); Q=Q.map(p=>[g[0]+(p[0]-g[0])*it.z,g[1]+(p[1]-g[1])*it.z]); }
    const P3=it.P.map(p=>ptIncl(p,tilt)); let n=newell(P3); if(dot(n,VUE)>0) n=n.map(v=>-v);
    c.fillStyle=teinte(it.coul,n); c.strokeStyle='#f8f9fa'; c.lineWidth=6;
    c.beginPath(); Q.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke(); }
  /* les côtés du carré qui s'allument (orange, comme les arêtes) */
  if(cotes) for(const [k,u] of Object.entries(cotes)){ if(u<=0) continue; const [a,b]=PT_COTES[k], A=pr(a), B=pr(b);
    c.strokeStyle=SARETE; c.lineWidth=16*Math.min(1.4,u); c.beginPath(); c.moveTo(...A); c.lineTo(...B); c.stroke(); }
  c.restore(); return pr; }
/* Le cadeau : un petit cube rouge à ruban jaune (coin en p, côté .36, hauteur .32) */
function ptCadeau(c,p,tilt,e,ox,oy){ const [x,y,z]=p, L=.36, H=.32;
  const S=CUBE_S.map(([a,b,d])=>ptIncl([x+a*L,y+b*H,z+d*L],tilt)); const P=polyedre(S,CUBE_F);
  dessinerPoly(c,P,{e,ox,oy,coul:PT_CADEAU,lw:5,cacheesOff:true,alpha:1});
  const pr=q=>cav(ptIncl(q,tilt),e,ox,oy); c.strokeStyle='#ffd43b'; c.lineWidth=7; c.lineCap='round';
  for(const [a,b] of [[[x+L/2,y+H,z],[x+L/2,y+H,z+L]],[[x,y+H,z+L/2],[x+L,y+H,z+L/2]],[[x+L/2,y,z],[x+L/2,y+H,z]],[[x+L,y,z+L/2],[x+L,y+H,z+L/2]]]){
    c.beginPath(); c.moveTo(...pr(a)); c.lineTo(...pr(b)); c.stroke(); } }
/* La pyramide fermée : faces vues pleines, arêtes cachées en pointillés ; ancre = centre de la base */
function ptPyramide(c,e,cx,cy,{devant=PT_LAT}={}){ const P=pyramide3(4,1,PT_H), o=cav([.5,0,.5],e,0,0);
  const faces={[faceDe(P,[0,1,2,3])]:PT_BASE,[faceDe(P,[1,2,4])]:devant};
  dessinerPoly(c,P,{e,ox:cx-o[0],oy:cy-o[1],coul:PT_LAT,faces}); }
/* Un texte qui s'écrit au fil de la voix : étapes [[instant, texte], …] ; calé sur sa forme finale (centrée en x) */
function ptProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
/* Le patron de la pyramide à base pentagonale (à plat) : le pentagone, puis n triangles qui grossissent */
function ptPenta(c,cx,cy,R,zp,ztri){ const pts=[...Array(5)].map((_,i)=>{ const a=-Math.PI/2+2*Math.PI*i/5; return [cx+R*Math.cos(a),cy+R*Math.sin(a)]; });
  const cote=2*R*Math.sin(Math.PI/5), h=cote*1.05;
  c.save(); c.lineJoin='round'; c.strokeStyle='#f8f9fa'; c.lineWidth=6;
  for(let i=0;i<5;i++){ const z=ztri[i]; if(z<=0) continue; const A=pts[i], B=pts[(i+1)%5], m=[(A[0]+B[0])/2,(A[1]+B[1])/2],
      d=[m[0]-cx,m[1]-cy], l=Math.hypot(...d), S=[m[0]+d[0]/l*h,m[1]+d[1]/l*h], g=[(A[0]+B[0]+S[0])/3,(A[1]+B[1]+S[1])/3];
    const Q=[A,B,S].map(p=>[g[0]+(p[0]-g[0])*Math.min(1.2,z),g[1]+(p[1]-g[1])*Math.min(1.2,z)]);
    c.fillStyle=PT_LAT; c.beginPath(); Q.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke(); }
  if(zp>0){ const Q=pts.map(p=>[cx+(p[0]-cx)*Math.min(1.2,zp),cy+(p[1]-cy)*Math.min(1.2,zp)]);
    c.fillStyle=PT_BASE; c.beginPath(); Q.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke(); }
  c.restore(); }

FILMS['patron']=function(outils){
  const DUR={'00-accroche':10.68,'01-trou':4.53,'02-question':15.82,'02b-reponse':10.66,'03-ouf':3.81,'04-commentaire':9.04,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,tro,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tCarre=mot('00-accroche','carré'), t3=mot('00-accroche','3'), tTri=mot('00-accroche','triangles'),
        tPlie=mot('00-accroche','plie'), tColle=mot('00-accroche','colle');
  const tTrou=mot('01-trou','trou'), tCadeau=mot('01-trou','cadeau'), tTombe=mot('01-trou','tombe');
  const tUn=mot('02b-reponse','Un'), tC=mot('02b-reponse','C'), tChaque=mot('02b-reponse','chaque'), tDu=mot('02b-reponse','du'),
        t4c=mot('02b-reponse','4'), tCotes=mot('02b-reponse','côtés',2), t4t=mot('02b-reponse','4',3), t4tri=mot('02b-reponse','triangles'),
        tAvec3=mot('02b-reponse','3'), tOuvert=mot('02b-reponse','ouvert');
  const tPlus=mot('03-ouf','plus'), tCache=mot('03-ouf','caché');
  const tPenta=mot('04-commentaire','pentagone'), t5=mot('04-commentaire','5'), t5tri=mot('04-commentaire','triangles'),
        tQuel=mot('04-commentaire','Quel'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, finR=tUn-.08;

  /* à plat face à nous (e = 150), puis couché sur la table et plié (e = 250) */
  const XP=320, YP=360, XC=270, YC=470, EP=165, EC=320;
  /* le passage « à plat face à nous » → « couché » de t0 à t1, puis le pliage de t1 à t2 */
  /* (les triangles se relèvent pendant qu'il se couche : le patron ne sort jamais de l'ardoise ; il grossit en se pliant) */
  function plier(T,t0,t1,t2){ const v=lisse01(entre(T,t0,t1)), u=lisse01(entre(T,t0+.15,t2));
    return {tilt:-90+90*v,e:EP+(EC-EP)*u,cx:XP+(XC-XP)*u,cy:YP+(YC-YP)*v,u}; }
  const CAD=[.32,0,.32];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 1 pentagone, 5 triangles ; quel solide ? */
      const zt=[0,1,2,3,4].map(i=>zoom(T,t5+.12*i,.4));
      ptPenta(c,XP,370,105,zoom(T,tPenta,.4),zt);
      ptProg(c,[[tPenta,'1 pentagone']],T,PT_XR,170,58,PT_BASE);
      ptProg(c,[[t5,'5'],[t5tri,'5 triangles']],T,PT_XR,260,58,PT_LAT);
      if(T>=tQuel) ecrire(c,'?',PT_XR,450,170*zoom(T,tQuel,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<tro){ /* le patron : 1 carré, 3 triangles ; il plie, il colle */
      const p=plier(T,tPlie,tPlie+.6,tColle+.9), tri={};
      [['g',t3],['ar',t3+.15],['av',t3+.3]].forEach(([k,t])=>{ if(T>=t) tri[k]=[p.u,zoom(T,t,.4)]; });
      if(T>=tCarre) ptDessiner(c,tri,p.tilt,p.e,p.cx,p.cy,{zbase:zoom(T,tCarre,.4),cadeau:T>=tPlie+.6?CAD:null});
      ptProg(c,[[tCarre,'1 carré']],T,PT_XR,190,62,PT_BASE);
      ptProg(c,[[t3,'3'],[tTri,'3 triangles']],T,PT_XR,290,62,PT_LAT);
      tab.maj(); return; }
    if(T<q){ /* un trou sur le côté : le cadeau glisse et tombe */
      const tri={g:[1,1],ar:[1,1],av:[1,1]};
      const s=lisse01(entre(T,tCadeau,tCadeau+.45)), b=entre(T,tCadeau+.45,tTombe+.25), cad=[CAD[0]+.85*s,-.55*b*b,CAD[2]];
      const pr=ptDessiner(c,tri,0,EC,XC,YC,{cadeau:cad});
      if(T>=tTrou){ const A=pr([1,0,0]), B=pr([1,0,1]), S=pr(ptTriangle('d',1)[2]), u=zoom(T,tTrou,.4);
        c.save(); c.strokeStyle=CRAIE.faux; c.lineWidth=10*u; c.setLineDash([20,14]); c.beginPath(); c.moveTo(...A); c.lineTo(...S); c.lineTo(...B); c.closePath(); c.stroke(); c.restore();
        ecrire(c,'un trou !',PT_XR,200,66*u,CRAIE.faux); }
      if(T>=tTombe) ecrire(c,'le cadeau',PT_XR,330,56*zoom(T,tTombe,.4),CRAIE.blanc);
      if(T>=tTombe) ecrire(c,'tombe !',PT_XR,400,56*zoom(T,tTombe,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : un triangle par côté du carré */
      const cotes={}; ['av','d','ar','g'].forEach((k,i)=>{ cotes[k]=zoom(T,tChaque+(tDu-tChaque)*i/3,.5); });
      const tri={}; ['g','ar','av','d'].forEach((k,i)=>{ const t=t4t+.12*i; if(T>=t) tri[k]=[0,zoom(T,t,.4)]; });
      if(T>=tAvec3) delete tri.d;
      const pr=ptDessiner(c,tri,-90,EP,XP,YP,{cotes:T<tAvec3?cotes:null});
      if(T>=tAvec3){ const [a,b,s]=ptTriangle('d',0).map(pr);
        c.save(); c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.setLineDash([18,12]); c.beginPath(); c.moveTo(...a); c.lineTo(...s); c.lineTo(...b); c.stroke(); c.restore(); }
      ptProg(c,[[t4c,'4'],[tCotes,'4 côtés']],T,PT_XR,170,60,SARETE);
      ptProg(c,[[t4t,'4'],[t4tri,'4 triangles']],T,PT_XR,260,60,PT_LAT);
      if(T>=tAvec3) ptProg(c,[[tAvec3,'avec 3 :'],[tOuvert,'avec 3 : ouvert']],T,PT_XR,380,52,CRAIE.faux);
      tab.maj(); return; }
    /* ouf : le 4e triangle, plié avec les autres ; la pyramide se ferme sur le cadeau */
    const p=plier(T,ouf+.1,ouf+.7,tCache-.1);
    if(p.u<1){ const tri={g:[p.u,1],ar:[p.u,1],av:[p.u,1],d:[p.u,zoom(T,ouf+.1,.5),PT_NEUF]};
      ptDessiner(c,tri,p.tilt,p.e,p.cx,p.cy,{cadeau:T>=ouf+.7?CAD:null}); }
    else ptPyramide(c,EC,XC,YC,{devant:PT_NEUF});
    if(T>=tPlus) ecrire(c,'+ 1 triangle',PT_XR,200,54*zoom(T,tPlus,.3),PT_NEUF);
    if(T>=tCache) coche(c,PT_XR-60,360,.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-trou'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const g0=[a0('Je fabrique une boîte cadeau'),a0('en pyramide pour Maman.')];
  rd.saute(2); const r1=rd('Un triangle sur chaque côté'), r2=rd('du carré :'), r3=rd('4 côtés, 4 triangles.'), r4=rd('Avec 3,'), r5=rd('un côté reste ouvert.');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,...g0),
    ...suiteDe(tro,60,62,[a0('Mon patron : 1 carré,'),a0('et 3 triangles autour.')],[a0('Je plie, je colle…')]),
    ...suiteDe(q,60,62,[a1('Il y a un trou'),a1('sur le côté !')],[a1('Le cadeau tombe !')]),
    ...suiteDe(ouf,60,62,[r1,r2],[r3],[r4,r5]),
    ...suiteDe(com,60,62,[a3('Un triangle de plus…')],[a3('et le cadeau'),a3('est bien caché !')]),
    ...suiteDe(f,60,60,[a4('À toi : un patron a'),a4('1 pentagone et 5 triangles.')],[a4('Quel solide donne-t-il ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de triangles faut-il'),qd('autour du carré ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  /* les choix s'écrivent au fil de la voix : « 3 », puis « 3 triangles » */
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  const ETAPES=[[['3',1],['triangles',2]],[['5',1],['triangles',3]],[['4',1],['triangles',4]]].map(([a,b])=>[[tq(...a),a[0]],[tq(...b),a[0]+' triangles']]);
  const choix=[['3 triangles',tq('A'),tq('3')],['5 triangles',tq('B'),tq('5')],['4 triangles',tq('C'),tq('4')]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [k,e] of et) if(T-q>=k) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="92" y="88" width="66" height="66" fill="#b197fc" stroke="#f8f9fa" stroke-width="4"/>
    <polygon points="92,88 158,88 125,24" fill="#63e6be" stroke="#f8f9fa" stroke-width="4"/>
    <polygon points="92,88 92,154 28,121" fill="#63e6be" stroke="#f8f9fa" stroke-width="4"/>
    <polygon points="92,154 158,154 125,218" fill="#63e6be" stroke="#f8f9fa" stroke-width="4"/>
    <polygon points="158,88 158,154 222,121" fill="none" stroke="#ff8787" stroke-width="4" stroke-dasharray="9 7"/>
    <text x="272" y="150" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien<br>de triangles ?'+PARI,mini);
  return { clips,FIN,titre:'3 triangles ou 4 ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,tro,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<tro){ T<tPlie?g.montre():g.fier(); }
      else if(T<q){ if(T<tCadeau){ g.oups(); scene.ry=-.12+.3*lisse((T-tro)/.35); } else g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf) g.montre();
      else if(T<com){ T<tCache?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
