/* Série Vision dans l'espace 6e, ÉPISODE 03 : LA BOÎTE CADEAU (ceinture blanche). Outils : 6e-commun.js et films/6e-vision.js.
   Une boîte cadeau de 10 cm de long, 6 de large, 4 de haut : Ti Margo plie son patron… le couvercle (6 sur 4) est trop petit,
   la boîte reste ouverte. Question : quelles mesures pour le couvercle ? 10 sur 6 (C) : c'est le dessus, la longueur et
   la largeur ; 6 sur 4, c'est un côté. Le bon couvercle ferme la boîte. Commentaire : boîte 12 × 5 × 3, ses faces de côté ? */

/* Le patron d'une boîte sans couvercle (fond L × l, hauteur h) qui se plie : th = angle des 4 côtés (0 à plat, 90 debout).
   lid = {w, d, phi} : un couvercle w × d accroché en haut du côté du fond (centré), plié de phi degrés de plus.
   x = longueur, z = largeur (vers le fond), y = hauteur. Renvoie les faces {nom, P:[4 points]} */
function boitePliee(L,l,h,th,lid=null){ const t=th*Math.PI/180, s=Math.sin(t), co=Math.cos(t), F=[];
  F.push({nom:'fond',P:[[0,0,0],[L,0,0],[L,0,l],[0,0,l]]});
  F.push({nom:'avant',P:[[0,0,0],[L,0,0],[L,h*s,-h*co],[0,h*s,-h*co]]});
  F.push({nom:'arriere',P:[[0,0,l],[L,0,l],[L,h*s,l+h*co],[0,h*s,l+h*co]]});
  F.push({nom:'gauche',P:[[0,0,0],[0,0,l],[-h*co,h*s,l],[-h*co,h*s,0]]});
  F.push({nom:'droite',P:[[L,0,0],[L,0,l],[L+h*co,h*s,l],[L+h*co,h*s,0]]});
  if(lid){ const p=(th+lid.phi)*Math.PI/180, x0=(L-lid.w)/2, x1=x0+lid.w, yb=h*s, zb=l+h*co, dy=lid.d*Math.sin(p), dz=lid.d*Math.cos(p);
    F.push({nom:'couvercle',P:[[x0,yb,zb],[x1,yb,zb],[x1,yb+dy,zb+dz],[x0,yb+dy,zb+dz]]}); }
  return F; }
/* Incline tout le patron : tilt −90 = à plat face à nous, 0 = posé sur la table */
function inclinerP(p,tilt){ const t=tilt*Math.PI/180; return [p[0],p[1]*Math.cos(t)-p[2]*Math.sin(t),p[1]*Math.sin(t)+p[2]*Math.cos(t)]; }
/* Dessine les faces ; ancre = le centre du fond, placé en (cx, cy) ; couleurs = {nom: couleur} ; renvoie la projection d'un point */
function dessinerBoite(c,F,tilt,e,cx,cy,{coul='#f783ac',couleurs={},bord='#862e46',L=10,l=6}={}){
  const a=cav(inclinerP([L/2,0,l/2],tilt),e,0,0), ox=cx-a[0], oy=cy-a[1], pr=p=>cav(inclinerP(p,tilt),e,ox,oy);
  const cle=f=>{ const Q=f.P.map(p=>inclinerP(p,tilt)), m=Q.reduce((s,p)=>[s[0]+p[0]/4,s[1]+p[1]/4,s[2]+p[2]/4],[0,0,0]); return m[2]-.2*m[0]-.2*m[1]; };
  for(const f of [...F].sort((u,v)=>cle(v)-cle(u))){ const Q=f.P.map(p=>inclinerP(p,tilt)); let n=newell(Q); if(dot(n,VUE)>0) n=n.map(v=>-v);
    polygone(c,Q.map(p=>cav(p,e,ox,oy)),teinte(couleurs[f.nom]||coul,n),bord,5); }
  return pr; }
/* Le ruban du cadeau : deux bandes jaunes en croix sur le dessus (y = h) */
function ruban(c,pr,L,l,h,u=1){ if(u<=0) return; c.save(); c.globalAlpha=Math.min(1,u);
  polygone(c,[pr([L/2-.5,h,0]),pr([L/2+.5,h,0]),pr([L/2+.5,h,l]),pr([L/2-.5,h,l])],'#ffd43b','#e67700',4);
  polygone(c,[pr([0,h,l/2-.5]),pr([L,h,l/2-.5]),pr([L,h,l/2+.5]),pr([0,h,l/2+.5])],'#ffd43b','#e67700',4);
  polygone(c,[pr([L/2-.5,0,-.02]),pr([L/2+.5,0,-.02]),pr([L/2+.5,h,-.02]),pr([L/2-.5,h,-.02])],'#ffd43b','#e67700',4);
  const n=pr([L/2,h,l/2]); c.fillStyle='#ff922b'; for(const s of [-1,1]){ c.beginPath(); c.ellipse(n[0]+s*30,n[1]-18,34,20,s*.5,0,7); c.fill(); } c.restore(); }

FILMS['patron-pave']=function(outils){
  const DUR={'00-accroche':6.16,'01-couvercle':5.7,'02-question':13.75,'02b-reponse':10.65,'03-ouf':6.71,'04-commentaire':11.05,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:cou,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), mr=k=>marque('02b-reponse',k), m4=k=>marque('04-commentaire',k);

  const t10=m0(5), t10c=m0(6), tLong=m0(8), t6=m0(9), tLarge=m0(11), t4=m0(12), tHaut=m0(14);
  const tPlie=mot('01-couvercle','plie'), tCouv=mot('01-couvercle','couvercle'), tPetit=mot('01-couvercle','petit'), tOuverte=mot('01-couvercle','ouverte');
  const tC=mot('02b-reponse','C'), rLe=mr(2), rDessus=mr(6), rLongueur=mr(8), rLargeur=mr(11), r10=mr(12), rSur=mr(13), r6=mr(14), r6b=mr(15), rSur2=mr(16), r4=mr(17), rCote=mr(20);
  const oVoila=mot('03-ouf','voilà'), oFerme=mot('03-ouf','ferme'), oCadeau=mot('03-ouf','cadeau'), oZut=mot('03-ouf','Zut');
  const c12=m4(5), c12c=m4(6), c5=m4(9), c3=m4(13), cFaces=mot('04-commentaire','faces'), cCote=mot('04-commentaire','côté'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t10-.08, finR=rLe-.08;

  const L=10, l=6, h=4, PETIT={w:6,d:4}, BON={w:10,d:6};
  const X=855;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une boîte de 12 × 5 × 3 ; ses deux faces de côté ? */
      const P=pave3(12,3,5), ee=42, o=centrer(P,ee,430,380), Q=p=>cav(p,ee,o.ox,o.oy);
      const fa={}; if(T>=cFaces){ fa[faceDe(P,[1,2,6,5])]='#ffd43b'; fa[faceDe(P,[0,3,7,4])]='#ffd43b'; }
      if(T>=c12) dessinerPoly(c,P,{...o,coul:'#f783ac',trait:'#f8f9fa',lw:5,faces:fa});
      if(T>=c12){ const a=Q([0,0,0]), b=Q([12,0,0]); cote(c,[a[0],a[1]+36],[b[0],b[1]+36],(T-c12)/.5); prog(c,[[c12,'12'],[c12c,'12 cm']],T,(a[0]+b[0])/2,a[1]+82,48,CRAIE.jaune); }
      if(T>=c5){ const a=Q([12,0,0]), b=Q([12,0,5]); cote(c,[a[0]+36,a[1]+8],[b[0]+36,b[1]+8],(T-c5)/.4); ecrire(c,'5',(a[0]+b[0])/2+78,(a[1]+b[1])/2+16,48,CRAIE.jaune); }
      if(T>=c3){ const a=Q([0,0,0]), b=Q([0,3,0]); cote(c,[a[0]-36,a[1]],[b[0]-36,b[1]],(T-c3)/.4); ecrire(c,'3',a[0]-74,(a[1]+b[1])/2,48,CRAIE.jaune); }
      if(T>=cCote){ const m=Q([12,1.5,2.5]); ecrire(c,'?',m[0]+150,m[1]-150,130*zoom(T,cCote,.6),CRAIE.jaune); }
      tab.maj(); return; }
    if(T<cou){ /* le patron à plat, face à nous ; 10 cm, 6, 4 */
      const pr=dessinerBoite(c,boitePliee(L,l,h,0,{...PETIT,phi:0}),-90,30,330,430);
      if(T>=t10){ const a=pr([0,0,.8]), b=pr([L,0,.8]); cote(c,a,b,(T-t10)/(tLong+.2-t10),'#5f3dc4',5); prog(c,[[t10,'10'],[t10c,'10 cm']],T,(a[0]+b[0])/2,a[1]-38,40,'#5f3dc4'); }
      if(T>=t6){ const a=pr([1,0,0]), b=pr([1,0,l]); cote(c,a,b,(T-t6)/(tLarge+.2-t6),'#5f3dc4',5); ecrire(c,'6',a[0]+34,(a[1]+b[1])/2,40,'#5f3dc4'); }
      if(T>=t4){ const a=pr([L/2,0,0]), b=pr([L/2,0,-h]); cote(c,a,b,(T-t4)/(tHaut+.2-t4),'#5f3dc4',5); ecrire(c,'4',a[0]+34,(a[1]+b[1])/2,40,'#5f3dc4'); }
      tab.maj(); return; }
    if(T<q){ /* il plie : à plat → posé → les côtés montent → le couvercle se rabat… trop petit ! */
      const u=lisse01(entre(T,tPlie,tPlie+.5)), v=lisse01(entre(T,tPlie+.5,tCouv)), w=lisse01(entre(T,tCouv,tPetit+.1));
      const tilt=-90+90*u, e=30+16*u, cy=430+60*u;
      const pr=dessinerBoite(c,boitePliee(L,l,h,90*v,{...PETIT,phi:90*w}),tilt,e,330,cy,{couleurs:T>=tPetit?{couvercle:'#ff8787'}:{}});
      if(T>=tPetit) ecrire(c,'trop petit !',X,170,44*zoom(T,tPetit,.4),CRAIE.faux);
      if(T>=tOuverte){ const g=[pr([0,h,0]),pr([L,h,0]),pr([L,h,2]),pr([0,h,2])]; polygone(c,g,null,CRAIE.jaune,7);
        ecrire(c,'ouverte !',X,280,50*zoom(T,tOuverte,.4),CRAIE.jaune); }
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : le couvercle = le dessus : 10 sur 6 ; 6 sur 4, c'est un côté */
      const pr=dessinerBoite(c,boitePliee(L,l,h,90),0,52,360,470,{couleurs:T>=r6b?{droite:'#ff8787'}:{}});
      if(T>=rDessus){ polygone(c,[pr([0,h,0]),pr([L,h,0]),pr([L,h,l]),pr([0,h,l])],'#ffd43b','#e67700',6,.85*Math.min(1,zoom(T,rDessus,.3))); }
      if(T>=rLongueur){ const a=pr([0,h,.5]), b=pr([L,h,.5]); cote(c,a,b,(T-rLongueur)/.5,'#5f3dc4',6); if(T>=r10) ecrire(c,'10',(a[0]+b[0])/2,a[1]-36,52,'#5f3dc4'); }
      if(T>=rLargeur){ const a=pr([L,h,0]), b=pr([L,h,l]); cote(c,[a[0]+34,a[1]],[b[0]+34,b[1]],(T-rLargeur)/.5,CRAIE.jaune,6); if(T>=r6) ecrire(c,'6',(a[0]+b[0])/2+76,(a[1]+b[1])/2,52,CRAIE.jaune); }
      if(T>=r10) prog(c,[[r10,'10'],[rSur,'10 sur'],[r6,'10 sur 6']],T,X,150,58,CRAIE.ok);
      if(T>=r6+.4) coche(c,X-50,230,.4);
      if(T>=r6b) prog(c,[[r6b,'6'],[rSur2,'6 sur'],[r4,'6 sur 4']],T,X,400,54,CRAIE.faux);
      if(T>=rCote) ecrire(c,'un côté !',X,480,48*zoom(T,rCote,.4),CRAIE.faux);
      tab.maj(); return; }
    /* ouf : le bon couvercle (10 sur 6) se rabat : ça ferme ; le ruban du cadeau */
    const w=lisse01(entre(T,oVoila,oFerme+.2));
    const pr=dessinerBoite(c,boitePliee(L,l,h,90,{...BON,phi:50+40*w}),0,46,360,490);
    if(T>=oFerme) ecrire(c,'ça ferme !',X,170,50*zoom(T,oFerme,.4),CRAIE.ok);
    ruban(c,pr,L,l,h,(T-oCadeau)/.4);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-couvercle'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je fabrique une boîte cadeau :')),
    ...suiteDe(cou,60,62,[a0('10 centimètres de long,'),a0('6 de large, 4 de haut.')]),
    ...suiteDe(q,60,62,[a1('Je plie… et mon couvercle'),a1('est trop petit !')],[a1('La boîte reste ouverte !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Quelles mesures'),qd('pour le couvercle ?')];
  const CH=choixMotAMot(qd,q,r,[['A','6 sur 4'],['B','10 sur 10'],['C','10 sur 6']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Le couvercle, c’est le dessus :')],[rd('la longueur et la largeur,'),rd('10 sur 6.')],[rd('6 sur 4, c’est un côté !')]),
    ...suiteDe(com,60,62,[a3('Et voilà, ça ferme !')],[a3('Le cadeau est dedans…')],[a3('Zut, c’était le mien !')]),
    ...suiteDe(f,60,58,[a4('À toi : une boîte de 12 centimètres'),a4('de long, 5 de large et 3 de haut.')],[a4('Quelles sont les mesures'),a4('de ses deux faces de côté ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <path d="M40 120 L190 120 L222 92 L72 92 Z" fill="#f783ac" stroke="#862e46" stroke-width="4"/>
    <rect x="40" y="120" width="150" height="70" fill="#e64980" stroke="#862e46" stroke-width="4"/><path d="M190 120 L222 92 L222 162 L190 190 Z" fill="#c2255c" stroke="#862e46" stroke-width="4"/>
    <path d="M90 60 L150 60 L150 92 L90 92 Z" fill="#ff8787" stroke="#862e46" stroke-width="4"/>
    <text x="280" y="160" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Le couvercle :<br>quelles mesures ?'+PARI,mini);
  return { clips,FIN,titre:'La boîte cadeau',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cou,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:B.fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix:CH.choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); CH.maj(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<cou) g.montre();
      else if(T<q){ T<tPetit?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<r6b?g.montre():g.montre(); }
      else if(T<com){ T<oZut?g.fier():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
