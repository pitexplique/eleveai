/* ============================================================
   Série Solides CM2 — ÉPISODE 06 : LE GÂTEAU CUBE (défi). Outils : films/cm2-commun.js + cm2-solides.js
   (cav, pave3, dessinerPoly : perspective cavalière, arêtes cachées en pointillés).
   Le gâteau est un cube couvert de chocolat partout, même dessous ; coupé en 27 petits cubes (3, 3 et 3).
   Les meilleurs morceaux ont 3 faces au chocolat : combien ? 8 (B) : ce sont les coins, un par sommet du cube.
   Ouf : 8 super-morceaux et 19 pour les copains. Commentaire : combien de morceaux sans chocolat ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; le gâteau à gauche, le texte à droite (Ti Margo cache le bas du milieu).
   Petits cubes : (x, y, z) de 0 à 2 ; x à droite, y en haut, z vers le fond ; GC_E pixels par petit cube. */
const GC_E=118, GC_XR=850, GC_CX=335, GC_CY=335;
const GC_CHOC='#8b5a2b', GC_GENOISE='#f3d9a4', GC_OR='#ffd43b';
const GC_O=(()=>{ const pr=[[0,0,0],[3,3,3],[3,0,3],[0,3,0],[3,0,0],[0,3,3]].map(p=>cav(p,GC_E,0,0)), xs=pr.map(p=>p[0]), ys=pr.map(p=>p[1]);
  return {ox:GC_CX-(Math.min(...xs)+Math.max(...xs))/2, oy:GC_CY-(Math.min(...ys)+Math.max(...ys))/2}; })();
const gcPr=p=>cav(p,GC_E,GC_O.ox,GC_O.oy);
const gcCoin=(x,y,z)=>(x===0||x===2)&&(y===0||y===2)&&(z===0||z===2);
/* Les 27 petits cubes, du fond vers l'avant. choc : la couche de chocolat est posée ; coupe : 0 → 1, les traits de coupe ;
   eclat(k) : décalage [dx, dy, dz] d'un morceau ; lueur(k) : 0 → 1, le morceau s'allume en or */
function gcGateau(c,{choc=true,coupe=1,eclat=null,lueur=null}={}){
  const pos=[]; for(let x=0;x<3;x++) for(let y=0;y<3;y++) for(let z=0;z<3;z++) pos.push([x,y,z]);
  const P=pos.map(([x,y,z])=>{ const d=eclat?eclat(x,y,z):[0,0,0]; return {x,y,z,X:x+d[0],Y:y+d[1],Z:z+d[2]}; });
  P.sort((a,b)=>(b.Z-a.Z)||(a.Y-b.Y)||(a.X-b.X));
  c.save(); c.lineJoin='round';
  for(const q of P){ const {x,y,z,X,Y,Z}=q, Q=(a,b,d)=>gcPr([X+a,Y+b,Z+d]), lu=lueur?lueur(x,y,z):0;
    const faces=[[[Q(0,0,0),Q(1,0,0),Q(1,1,0),Q(0,1,0)],[0,0,-1],z===0],[[Q(0,1,0),Q(1,1,0),Q(1,1,1),Q(0,1,1)],[0,1,0],y===2],[[Q(1,0,0),Q(1,0,1),Q(1,1,1),Q(1,1,0)],[1,0,0],x===2]];
    for(const [pr,n,dehors] of faces){ const col=choc&&dehors?GC_CHOC:GC_GENOISE;
      c.fillStyle=teinte(col,n); c.strokeStyle=coupe>0?`rgba(${dehors&&choc?'255,236,200':'120,80,40'},${Math.min(1,coupe)})`:teinte(col,n); c.lineWidth=4;
      c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke();
      if(lu>0){ c.fillStyle=`rgba(255,212,59,${.45*Math.min(1,lu)})`; c.fill(); } }
    if(lu>0){ c.strokeStyle=GC_OR; c.lineWidth=7*Math.min(1.4,lu); c.beginPath();
      for(const [a,b] of [[Q(0,0,0),Q(1,0,0)],[Q(1,0,0),Q(1,0,1)],[Q(1,0,1),Q(1,1,1)],[Q(1,1,1),Q(0,1,1)],[Q(0,1,1),Q(0,1,0)],[Q(0,1,0),Q(0,0,0)]]){ c.moveTo(...a); c.lineTo(...b); }
      c.stroke(); } }
  c.restore(); }
/* Le gâteau entier, avant la coupe : un cube, arêtes cachées en pointillés ; dessous = la face du dessous teintée */
function gcCube(c,{choc=0,dessous=false}={}){ const P=pave3(3,3,3), faces={};
  if(dessous) faces[faceDe(P,[0,1,5,4])]=GC_CHOC;
  const col=choc>=1?GC_CHOC:GC_GENOISE;
  dessinerPoly(c,P,{e:GC_E,ox:GC_O.ox,oy:GC_O.oy,coul:col,faces,alpha:1});
  if(choc>0&&choc<1){ c.save(); c.globalAlpha=choc; dessinerPoly(c,P,{e:GC_E,ox:GC_O.ox,oy:GC_O.oy,coul:GC_CHOC,alpha:1}); c.restore(); } }
/* Les 3 arêtes cachées du grand cube, en pointillés (par-dessus les petits cubes, comme dessinerPoly) */
function gcCachees(c){ const s=[0,0,3]; c.save(); c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.setLineDash([16,12]);
  for(const b of [[3,0,3],[0,3,3],[0,0,0]]){ c.beginPath(); c.moveTo(...gcPr(s)); c.lineTo(...gcPr(b)); c.stroke(); } c.restore(); }
function gcProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const W=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-W/2,y,taille,coul,'left'); }
/* La loupe (centre x, y) */
function gcLoupe(c,x,y){ c.save(); c.strokeStyle='#5c3a1a'; c.lineWidth=16; c.lineCap='round'; c.beginPath(); c.moveTo(x+48,y+48); c.lineTo(x+100,y+100); c.stroke();
  c.fillStyle='rgba(200,235,255,.35)'; c.strokeStyle='#f8f9fa'; c.lineWidth=9; c.beginPath(); c.arc(x,y,62,0,7); c.fill(); c.stroke(); c.restore(); }

FILMS['defi']=function(outils){
  const DUR={'00-accroche':16.55,'01-compte':5.26,'02-question':13.67,'02b-reponse':9.24,'03-ouf':3.71,'04-commentaire':6.38,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cpt,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tChoc=mot('00-accroche','chocolat'), tDessous=mot('00-accroche','dessous'), tCoupe=mot('00-accroche','coupe'),
        t27=mot('00-accroche','27'), tPetits=mot('00-accroche','petits',2), tCubes=mot('00-accroche','cubes'),
        t3a=mot('00-accroche','3',1), t3b=mot('00-accroche','3',2), t3c=mot('00-accroche','3',4),
        tMeill=mot('00-accroche','meilleurs'), t3f=mot('00-accroche','faces'), tAu=mot('00-accroche','au'), tChoc2=mot('00-accroche','chocolat',2),
        tPlein=mot('00-accroche','plein');
  const tCherche=mot('01-compte','cherche'), tChoc3=mot('01-compte','chocolat'), tPas=mot('01-compte','pas');
  const tUn=mot('02b-reponse','Un'), tB=mot('02b-reponse','B'), tCoin=mot('02b-reponse','coin'), t8s=mot('02b-reponse','8'), t8m=mot('02b-reponse','morceaux');
  const t8=mot('03-ouf','8'), t19=mot('03-ouf','19'), tPour=mot('03-ouf','pour',2), tCopains=mot('03-ouf','copains');
  const tMorc=mot('04-commentaire','morceaux'), tChocC=mot('04-commentaire','chocolat'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, finR=tUn-.08;
  const COINS=[[2,2,0],[0,2,0],[2,0,0],[0,0,0],[2,2,2],[0,2,2],[2,0,2],[0,0,2]];
  /* les 8 sommets du grand cube (le dernier, derrière en bas à gauche, est caché) */
  const SOMMETS=[[3,3,0],[0,3,0],[3,0,0],[0,0,0],[3,3,3],[0,3,3],[3,0,3],[0,0,3]];

  /* les « 3 » des 3 dimensions : la largeur, la hauteur, la profondeur */
  function cotes(c,T){ const L=[[t3a,gcPr([1.5,0,0]),[0,46]],[t3b,gcPr([0,1.5,0]),[-44,0]],[t3c,gcPr([3,0,1.5]),[44,14]]];
    for(const [t,p,d] of L) if(T>=t) ecrire(c,'3',p[0]+d[0],p[1]+d[1],60*zoom(T,t,.5),CRAIE.jaune); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : combien de morceaux sans chocolat ? */
      gcGateau(c); gcCachees(c);
      if(T>=tMorc){ const z=zoom(T,tMorc,.4), x=GC_XR, y=250, s=110*z, pr=(a,b,d)=>[x-s/2+(a+.35*d)*s,y+s/2-(b+.35*d)*s];
        c.save(); c.lineJoin='round'; c.strokeStyle='#8a6a3a'; c.lineWidth=5;
        for(const [Q,n] of [[[pr(0,0,0),pr(1,0,0),pr(1,1,0),pr(0,1,0)],[0,0,-1]],[[pr(0,1,0),pr(1,1,0),pr(1,1,1),pr(0,1,1)],[0,1,0]],[[pr(1,0,0),pr(1,0,1),pr(1,1,1),pr(1,1,0)],[1,0,0]]]){
          c.fillStyle=teinte(GC_GENOISE,n); c.beginPath(); Q.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke(); }
        c.restore(); }
      if(T>=tChocC) ecrire(c,'?',GC_XR,470,170*zoom(T,tChocC,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<cpt){ /* l'accroche : le cube, le chocolat, la coupe en 27, les morceaux à 3 faces */
      if(T<tCoupe) gcCube(c,{choc:entre(T,tChoc,tChoc+.5),dessous:T>=tDessous});
      else { gcGateau(c,{coupe:entre(T,tCoupe,tCoupe+.4),lueur:T>=t3f?((x,y,z)=>x===2&&y===2&&z===0?zoom(T,t3f,.5):0):null}); gcCachees(c); }
      if(T>=tDessous&&T<tCoupe) ecrire(c,'même dessous',GC_XR,200,48*zoom(T,tDessous,.3),'#e0a96d');
      if(T<tMeill){ gcProg(c,[[t27,'27']],T,GC_XR,170,96,CRAIE.blanc); gcProg(c,[[tPetits,'petits'],[tCubes,'petits cubes']],T,GC_XR,260,52,CRAIE.blanc); }
      if(T>=tCoupe) cotes(c,T);
      if(T>=t3f){ gcProg(c,[[t3f,'3 faces']],T,GC_XR,170,64,GC_OR); gcProg(c,[[tAu,'au'],[tChoc2,'au chocolat']],T,GC_XR,250,52,'#e0a96d'); }
      if(T>=tPlein) ecrire(c,'plein ?',GC_XR,380,66*zoom(T,tPlein,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* il cherche : la loupe passe sur le gâteau */
      const u=lisse01(entre(T,tCherche,tChoc3+.2)), a=gcPr([.5,2.5,0]), b=gcPr([2.5,3,.5]);
      gcGateau(c,{lueur:T>=tChoc3+.2?((x,y,z)=>x===2&&y===2&&z===0?zoom(T,tChoc3+.2,.5):0):null}); gcCachees(c);
      gcLoupe(c,a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u-20);
      if(T>=tPas){ const z=zoom(T,tPas,.4); ecrire(c,'pas tant',GC_XR,200,58*z,CRAIE.blanc); ecrire(c,'que ça !',GC_XR,275,58*z,CRAIE.blanc); }
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : seulement les coins ; 8 sommets, 8 morceaux */
      const lueur=(x,y,z)=>{ if(T>=t8m&&gcCoin(x,y,z)) return zoom(T,t8m,.5); if(T>=tCoin&&x===2&&y===2&&z===0) return zoom(T,tCoin,.5); return 0; };
      gcGateau(c,{lueur}); gcCachees(c);
      if(T>=t8s) SOMMETS.forEach((s,k)=>{ const t=t8s+.09*k; if(T<t) return; const p=gcPr(s), z=zoom(T,t,.5);
        if(k<7) rond(c,p[0],p[1],15*z,SSOMMET); else { c.save(); c.strokeStyle=SSOMMET; c.lineWidth=5; c.setLineDash([8,6]); c.beginPath(); c.arc(p[0],p[1],15*z,0,7); c.stroke(); c.restore(); } });
      if(T>=tCoin) ecrire(c,'un coin',GC_XR,170,62*zoom(T,tCoin,.4),GC_OR);
      if(T>=t8s) ecrire(c,'8 sommets',GC_XR,270,58*zoom(T,t8s,.4),SSOMMET);
      if(T>=t8m) ecrire(c,'8 morceaux',GC_XR,360,58*zoom(T,t8m,.4),CRAIE.ok);
      tab.maj(); return; }
    /* ouf : les 8 coins s'écartent (les super-morceaux), 19 pour les copains */
    const v=lisse01(entre(T,t8,t8+.6));
    gcGateau(c,{eclat:(x,y,z)=>gcCoin(x,y,z)?[(x-1)*.15*v,(y-1)*.15*v,(z-1)*.15*v]:[0,0,0],lueur:(x,y,z)=>gcCoin(x,y,z)?1:0});
    if(T>=t8) ecrire(c,'8',GC_XR,160,110*zoom(T,t8,.5),GC_OR);
    if(T>=t19) ecrire(c,'19',GC_XR,310,96*zoom(T,t19,.5),CRAIE.blanc);
    gcProg(c,[[tPour,'pour'],[tCopains,'pour les copains']],T,GC_XR,400,48,CRAIE.blanc);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-compte'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  rd.saute(2); const r1=rd('Un morceau a 3 faces'), r2=rd('au chocolat seulement'), r3=rd('s’il est dans un coin.'), r4=rd('Un cube a 8 sommets :'), r5=rd('8 morceaux.');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Mon gâteau est un cube.')),
    ...suiteDe(cpt,60,62,[a0('Je le couvre de chocolat'),a0('partout, même dessous.')],[a0('Puis je le coupe'),a0('en 27 petits cubes :'),a0('3, 3 et 3.')],
      [a0('Les meilleurs morceaux'),a0('ont 3 faces au chocolat.')],[a0('Il y en a sûrement plein !')]),
    ...suiteDe(q,60,62,[a1('Je cherche les morceaux'),a1('à 3 faces au chocolat…')],[a1('il n’y en a pas'),a1('tant que ça !')]),
    ...suiteDe(ouf,60,62,[r1,r2,r3],[r4,r5]),
    ...suiteDe(com,60,62,[a3('8 super-morceaux…')],[a3('et 19 pour les copains !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien de morceaux'),a4('n’ont pas du tout de chocolat ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de morceaux ont'),qd('3 faces au chocolat ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  const choix=[['6 morceaux',tq('A'),tq('6')],['8 morceaux',tq('B'),tq('8')],['12 morceaux',tq('C'),tq('12')]];

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <polygon points="40,90 160,90 200,50 80,50" fill="#a8743f" stroke="#ffecc8" stroke-width="4"/>
    <polygon points="160,90 200,50 200,170 160,210" fill="#6e4520" stroke="#ffecc8" stroke-width="4"/>
    <rect x="40" y="90" width="120" height="120" fill="#8b5a2b" stroke="#ffecc8" stroke-width="4"/>
    <path d="M80 90V210M120 90V210M40 130H160M40 170H160M53 77H173M67 63H187M80 90L120 50M120 90L160 50M173 77V197M187 63V183M160 130L200 90M160 170L200 130" stroke="#ffecc8" stroke-width="3" fill="none"/>
    <text x="270" y="150" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'3 faces<br>au chocolat ?'+PARI,mini);
  return { clips,FIN,titre:'3 faces au chocolat ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cpt,q,r,finR,ouf,com,f],
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
      else if(T<cpt){ T<tMeill?g.montre():(T<tPlein?g.fier():g.ouvre()); }
      else if(T<q){ if(T<tPas) g.reflechit(); else { g.oups(); } }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.pouce(); }
      else if(T<ouf) g.montre();
      else if(T<com) g.fier();
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
