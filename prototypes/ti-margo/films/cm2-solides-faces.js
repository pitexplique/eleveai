/* Série Solides CM2, ÉPISODE 03 : LA BOÎTE PEINTE (ceinture blanche, règle des shorts CM2). Outils : cm2-commun.js et
   films/cm2-solides.js (polyedre, dessinerPoly, prisme3, centrer).
   Ti Margo peint une boîte à chaussures, une couleur par face : rouge dessus, bleu, vert, jaune sur les côtés. 4 couleurs ?
   Il la retourne : le dessous est blanc, un côté aussi. Question : pavé droit, 6 faces → 6 couleurs (A).
   Commentaire : un prisme à bases triangulaires, combien de faces ? (jamais compté à l'écran).
   L'ardoise fait 1056 × 720 : la boîte à gauche, le texte à droite (Ti Margo cache le bas du milieu). */

const FC_L=1.8, FC_H=.8, FC_P=1, FC_E=240, FC_CX=300, FC_CY=400, FC_XT=800;
/* Les faces de la boîte (indices de CUBE_F) : 0 devant, 1 fond, 2 dessous, 3 dessus, 4 gauche, 5 droite */
const FC_DEV=0, FC_FOND=1, FC_DESSOUS=2, FC_DESSUS=3, FC_GAUCHE=4, FC_DROITE=5;
const FC_COUL={rouge:'#ff6b6b',bleu:'#4dabf7',vert:'#51cf66',jaune:'#fcc419',violet:'#9775fa',orange:'#ff922b',blanc:'#ffffff'};
/* La boîte tournée de th autour de l'axe devant-derrière (th = π : retournée, le dessous en haut, la gauche à droite) */
function fcBoite(th=0){ const cx=FC_L/2, cy=FC_H/2, co=Math.cos(th), si=Math.sin(th);
  return polyedre(CUBE_S.map(([x,y,z])=>{ const X=x*FC_L-cx, Y=y*FC_H-cy; return [cx+X*co-Y*si, cy+X*si+Y*co, z*FC_P]; }),CUBE_F); }
/* Le contour d'une face (pr = les sommets à l'écran, rendus par dessinerPoly) ; pointillés si la face est cachée */
function fcContour(c,P,pr,k,coul,lw=12){ const fa=P.faces[k]; c.save(); c.strokeStyle=coul; c.lineWidth=fa.vue?lw:lw*.6; c.lineJoin='round'; c.setLineDash(fa.vue?[]:[16,12]);
  c.beginPath(); fa.f.forEach((i,j)=>j?c.lineTo(...pr[i]):c.moveTo(...pr[i])); c.closePath(); c.stroke(); c.restore(); }
function fcProg(c,etapes,T,x,y,taille,coul){ let s=''; for(const [t,e] of etapes) if(T>=t) s=e; if(!s) return;
  c.font=`800 ${taille}px "Segoe UI"`; const w=c.measureText(etapes[etapes.length-1][1]).width; ecrire(c,s,x-w/2,y,taille,coul,'left'); }
/* Une tache de peinture (z = grossissement) */
function fcTache(c,x,y,coul,z=1){ if(z<=0) return; c.fillStyle=coul; c.strokeStyle='#f8f9fa'; c.lineWidth=4; c.beginPath();
  for(let i=0;i<=16;i++){ const a=i/16*2*Math.PI, rr=36*z*(1+.12*Math.sin(5*a)); i?c.lineTo(x+rr*Math.cos(a),y+rr*Math.sin(a)):c.moveTo(x+rr*Math.cos(a),y+rr*Math.sin(a)); }
  c.closePath(); c.fill(); c.stroke(); }

FILMS['faces']=function(outils){
  const DUR={'00-accroche':11.47,'01-retourne':5.23,'02-question':13.22,'02b-reponse':10.71,'03-ouf':4.45,'04-commentaire':8.6,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ret,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tBoite=mot('00-accroche','boîte'), tCouleur=mot('00-accroche','couleur'), tFace=mot('00-accroche','face'), tRouge=mot('00-accroche','Rouge'),
    tBleu=mot('00-accroche','bleu'), tVert=mot('00-accroche','vert'), tJaune=mot('00-accroche','jaune'), tCotes=mot('00-accroche','côtés'),
    t4=mot('00-accroche','4'), t4b=mot('00-accroche','4',2), tFini=mot('00-accroche','fini');
  const tRet=mot('01-retourne','retourne'), tDessous=mot('01-retourne','dessous'), tTout=mot('01-retourne','tout'), tBlanc=mot('01-retourne','blanc'), tCote=mot('01-retourne','côté'), tAussi=mot('01-retourne','aussi');
  const rA=mot('02b-reponse','A'), rUne=mot('02b-reponse','Une'), rPave=mot('02b-reponse','pavé'), rDroit=mot('02b-reponse','droit'), r6=mot('02b-reponse','6'), r6b=mot('02b-reponse','6',2),
    rDessus=mot('02b-reponse','dessus'), rDessous=mot('02b-reponse','dessous'), r4=mot('02b-reponse','4'), r4b=mot('02b-reponse','4',2), r6c=mot('02b-reponse','6',3), r6d=mot('02b-reponse','6',4);
  const tViolet=mot('03-ouf','violet'), tOrange=mot('03-ouf',"l'orange"), tParfait=mot('03-ouf','Parfait');
  const cPrisme=mot('04-commentaire','prisme'), c2=mot('04-commentaire','2'), c2b=mot('04-commentaire','2',2), cTri=mot('04-commentaire','triangle'),
    cFaces=mot('04-commentaire','faces'), cTout=mot('04-commentaire','tout'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tCouleur-.08, finR=rUne-.08;

  const B0=fcBoite(0), O=centrer(B0,FC_E,FC_CX,FC_CY);
  /* La boîte : chaque face vue dans SA couleur exacte (la droite un peu plus sombre), aucune face cachée voilée par-dessus ;
     arêtes vues pleines, arêtes cachées en pointillés */
  const sombre=(hex,k)=>{ const v=parseInt(hex.slice(1),16); return 'rgb('+[v>>16,(v>>8)&255,v&255].map(x=>Math.round(x*k)).join(',')+')'; };
  const boite=(c,P,faces)=>{ const pr=P.S.map(p=>cav(p,O.e,O.ox,O.oy)); c.save(); c.lineJoin='round'; c.lineCap='round';
    P.faces.forEach((fa,k)=>{ if(!fa.vue) return; const col=faces[k]||FC_COUL.blanc, k2=fa.n[0]>.5?.8:(fa.n[1]>.5?1:.92);
      c.fillStyle=sombre(col,k2); c.beginPath(); fa.f.forEach((i,j)=>j?c.lineTo(...pr[i]):c.moveTo(...pr[i])); c.closePath(); c.fill(); });
    for(const ar of P.aretes){ c.strokeStyle=ar.vue?'#212529':'#495057'; c.lineWidth=ar.vue?6:4; c.setLineDash(ar.vue?[]:[14,10]);
      c.beginPath(); c.moveTo(...pr[ar.a]); c.lineTo(...pr[ar.b]); c.stroke(); }
    c.setLineDash([]); c.restore(); return pr; };
  /* les couleurs déjà posées à l'instant T (accroche) */
  const peint=T=>{ const fa={[FC_DESSOUS]:FC_COUL.blanc,[FC_GAUCHE]:FC_COUL.blanc};
    if(T>=tRouge) fa[FC_DESSUS]=FC_COUL.rouge; if(T>=tBleu) fa[FC_DEV]=FC_COUL.bleu; if(T>=tVert) fa[FC_DROITE]=FC_COUL.vert; if(T>=tJaune) fa[FC_FOND]=FC_COUL.jaune; return fa; };
  const TACHES=[[tRouge,'rouge'],[tBleu,'bleu'],[tVert,'vert'],[tJaune,'jaune']];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un prisme à bases triangulaires */
      const PR=prisme3([[0,0],[1.1,0],[.55,.95]],1.5), o=centrer(PR,280,FC_CX,FC_CY), fb={};
      if(T>=c2){ fb[faceDe(PR,[0,1,2])]=BASE_C; fb[faceDe(PR,[3,4,5])]=BASE_C; }
      if(T>=cPrisme) dessinerPoly(c,PR,{...o,coul:LAT_C,faces:fb,alpha:1,lw:6});
      if(T>=c2) fcProg(c,[[c2,'2'],[c2b,'2 bases']],T,FC_XT,120,60,BASE_C);
      if(T>=cTri) fcProg(c,[[cTri,'en triangle']],T,FC_XT,195,52,BASE_C);
      if(T>=cFaces) fcProg(c,[[cFaces,'? faces'],[cTout,'? faces en tout']],T,FC_XT,340,52,CRAIE.jaune);
      if(T>=tRep) ecrire(c,'?',FC_XT,500,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ret){ /* une couleur par face : rouge, bleu, vert, jaune */
      if(T>=tBoite) boite(c,B0,peint(T));
      if(T>=tCouleur) fcProg(c,[[tCouleur,'une couleur']],T,FC_XT,90,54,CRAIE.blanc);
      if(T>=tFace) fcProg(c,[[tFace,'par face']],T,FC_XT,155,54,CRAIE.blanc);
      TACHES.forEach(([t,n],k)=>{ if(T>=t) fcTache(c,FC_XT-165+110*k,270,FC_COUL[n],Math.min(1,zoom(T,t,.5))); });
      if(T>=t4) fcProg(c,[[t4,'4'],[t4b,'4 couleurs']],T,FC_XT,400,66,CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* il la retourne : le dessous est blanc, un côté aussi */
      const th=Math.PI*lisse01(entre(T,tRet,tRet+.8)), P=fcBoite(th), pr=boite(c,P,peint(T));
      if(T>=tDessous&&th>=Math.PI-1e-6) fcContour(c,P,pr,FC_DESSOUS,CRAIE.faux);
      if(T>=tCote) fcContour(c,P,pr,FC_GAUCHE,CRAIE.faux);
      if(T>=tDessous) fcProg(c,[[tDessous,'le dessous']],T,FC_XT,100,56,CRAIE.faux);
      if(T>=tTout) fcProg(c,[[tTout,'tout'],[tBlanc,'tout blanc !']],T,FC_XT,170,56,CRAIE.faux);
      if(T>=tCote) fcProg(c,[[tCote,'un côté'],[tAussi,'un côté aussi !']],T,FC_XT,300,56,CRAIE.faux);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : un pavé droit, 6 faces : le dessus, le dessous, 4 côtés */
      const pr=boite(c,B0,peint(T));
      if(T>=rDessus) fcContour(c,B0,pr,FC_DESSUS,CRAIE.jaune);
      if(T>=rDessous) fcContour(c,B0,pr,FC_DESSOUS,CRAIE.jaune);
      if(T>=r4) [FC_DEV,FC_DROITE,FC_FOND,FC_GAUCHE].forEach((k,j)=>{ if(T>=r4+.12*j) fcContour(c,B0,pr,k,CRAIE.ok,9); });
      if(T>=rPave) fcProg(c,[[rPave,'pavé'],[rDroit,'pavé droit']],T,FC_XT,90,60,SFACE);
      if(T>=r6) fcProg(c,[[r6,'6'],[r6b,'6 faces']],T,FC_XT,180,64,CRAIE.blanc);
      if(T>=rDessus) fcProg(c,[[rDessus,'dessus'],[rDessous,'dessus + dessous']],T,FC_XT,300,50,CRAIE.jaune);
      if(T>=r4) fcProg(c,[[r4,'+ 4'],[r4b,'+ 4 côtés']],T,FC_XT,380,52,CRAIE.ok);
      if(T>=r6c) fcProg(c,[[r6c,'= 6'],[r6d,'= 6 couleurs']],T,FC_XT,480,58,CRAIE.blanc);
      tab.maj(); return; }
    /* ouf : retournée, le dessous en violet, le côté en orange : parfait */
    const fa=peint(T); fa[FC_DESSOUS]=T>=tViolet?FC_COUL.violet:FC_COUL.blanc; fa[FC_GAUCHE]=T>=tOrange?FC_COUL.orange:FC_COUL.blanc;
    boite(c,fcBoite(Math.PI),fa);
    if(T>=tViolet) fcTache(c,FC_XT-80,160,FC_COUL.violet,Math.min(1,zoom(T,tViolet,.5)));
    if(T>=tOrange) fcTache(c,FC_XT+80,160,FC_COUL.orange,Math.min(1,zoom(T,tOrange,.5)));
    if(T>=tParfait) coche(c,FC_XT-60,360,.8);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-retourne'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Je peins une boîte'),a0('à chaussures,')),
    ...suiteDe(ret,60,62,[a0('une couleur par face.')],[a0('Rouge sur le dessus,')],[a0('puis bleu, vert et jaune'),a0('sur les côtés.')],[a0('4 couleurs, c’est fini !')]),
    ...suiteDe(q,60,62,[a1('Je la retourne…')],[a1('le dessous est tout blanc !')],[a1('Et un côté aussi !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de couleurs'),qd('fallait-il ?')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const rr1=rd('Une boîte à chaussures,'), rr2=rd('c’est un pavé droit : 6 faces.'), rr3=rd('Le dessus, le dessous,'), rr4=rd('et 4 côtés : 6 couleurs.');
  groupes.push(...suiteDe(ouf,60,62,[rr1,rr2],[rr3,rr4]),
    ...suiteDe(com,60,62,[a3('Il me reste du violet'),a3('et de l’orange.')],[a3('Parfait !')]),
    ...suiteDe(f,60,60,[a4('À toi : une boîte en prisme'),a4('a 2 bases en triangle.')],[a4('Combien de faces en tout ?'),a4('Réponds en commentaire !')]));

  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  const ETAPES=[[[tq('6'),'6'],[tq('6',2),'6 couleurs']],[[tq('4'),'4'],[tq('4',2),'4 couleurs']],[[tq('8'),'8'],[tq('8',2),'8 couleurs']]];
  const choix=[['6 couleurs',tq('A'),tq('6')],['4 couleurs',tq('B'),tq('4')],['8 couleurs',tq('C'),tq('8')]];
  function majChoix(T){ ETAPES.forEach((et,i)=>{ let s=et[et.length-1][1]; if(T<r) for(const [t,e] of et) if(T-q>=t) s=e; choix[i][0]=s; }); }

  const mini=`<svg width="290" height="220" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <polygon points="40,120 190,120 190,200 40,200" fill="#4dabf7" stroke="#f8f9fa" stroke-width="5" stroke-linejoin="round"/>
    <polygon points="40,120 190,120 235,80 85,80" fill="#ff6b6b" stroke="#f8f9fa" stroke-width="5" stroke-linejoin="round"/>
    <polygon points="190,120 235,80 235,160 190,200" fill="#51cf66" stroke="#f8f9fa" stroke-width="5" stroke-linejoin="round"/>
    <text x="280" y="150" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'4 couleurs,<br>c’est fini ?'+PARI,mini);
  return { clips,FIN,titre:'La boîte peinte',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ret,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:fin('02-question')+.1,bonne:0,tBon:rA-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[r+.1,'Réponse '],[rA,'A !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); majChoix(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ret){ T<t4?g.montre():g.fier(); }
      else if(T<q){ if(T>=tDessous-.1){ g.oups(); scene.ry=-.12+.3*lisse((T-tDessous+.1)/.35); } else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<rA?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<r6c?g.montre():g.fier(); }
      else if(T<com){ T<tParfait?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
