/* Série Vision dans l'espace 6e, ÉPISODE 02 : C'EST UN CARRÉ, TON TRUC ! (ceinture blanche). Outils : 6e-commun.js et films/6e-vision.js.
   Ti Margo a dessiné un cube : son copain n'y voit qu'un carré. La feuille est plate : comment montrer la profondeur ?
   Question : quoi ajouter ? Des traits en biais, depuis les coins (C), tous pareils ; on relie les bouts, les arêtes
   cachées en pointillés : un vrai cube (perspective cavalière). Le copain veut l'attraper : c'est un dessin.
   Commentaire : combien d'arêtes en tout, pointillés compris ? */

/* Une main (doigts vers la gauche), centre (x, y), taille s */
function main6(c,x,y,s=1){ c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle='#ffc9a0'; c.strokeStyle='#8a5a2b'; c.lineWidth=5;
  for(const [dy,l] of [[-48,95],[-16,110],[16,104],[46,86]]){ c.beginPath(); c.roundRect(-l-20,dy-14,l+40,28,14); c.fill(); c.stroke(); }
  c.beginPath(); c.roundRect(-30,-70,40,48,18); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(30,0,60,72,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#4dabf7'; c.fillRect(80,-60,90,120); c.restore(); }

FILMS.representation=function(outils){
  const DUR={'00-accroche':6.41,'01-plat':6.32,'02-question':15.8,'02b-reponse':11.7,'03-ouf':4.47,'04-commentaire':9.6,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:pla,q,r,ouf,com,f,FIN,tab,W}=B;
  const mr=k=>marque('02b-reponse',k);
  { const css=document.createElement('style'); css.textContent='.choix{font-size:48px!important;}'; document.head.append(css); }

  const tIl=mot('00-accroche','Il'), tCarre=mot('00-accroche','carré'), tTruc=mot('00-accroche','truc');
  const tRaison=mot('01-plat','raison'), tFeuille=mot('01-plat','feuille'), tPlate=mot('01-plat','plate'), tComment=mot('01-plat','Comment'), tProf=mot('01-plat','profondeur');
  const tC=mot('02b-reponse','C'), rDepuis=mot('02b-reponse','Depuis'), rCoin=mr(4), rTrait=mr(6), rBiais=mr(8), rPareils=mr(10), rRelie=mr(12), rBouts=mr(14),
    rAretes=mr(17), rCachees=mr(18), rPoint=mr(20), rVoila=mr(21), rCube=mr(24);
  const oAttraper=mot('03-ouf','l\'attraper'), oDessin=mot('03-ouf','dessin');
  const cCube=mot('04-commentaire','cube'), cPersp=mot('04-commentaire','perspective'), cCav=mot('04-commentaire','cavalière'), cAretes=mot('04-commentaire','d\'arêtes'),
    cPoint=mot('04-commentaire','pointillés'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tIl-.08, finR=rDepuis-.08;

  const CRAYON='#343a40', BIAIS='#e8590c', CACHE='#868e96';
  const e=230, ox=210, oy=500;                       /* le carré de devant : de (210, 270) à (440, 500) */
  const Pc=(x,y,z)=>cav([x,y,z],e,ox,oy);
  function feuille(c){ c.save(); c.shadowColor='rgba(0,0,0,.35)'; c.shadowBlur=18; c.fillStyle='#fffdf5'; c.fillRect(120,110,520,500); c.restore();
    c.strokeStyle='#a5d8ff'; c.lineWidth=2; c.beginPath(); for(let y=150;y<600;y+=40){ c.moveTo(120,y); c.lineTo(640,y); } c.stroke(); }
  const AV=[[0,0],[1,0],[1,1],[0,1]];
  function carre(c,coul=CRAYON,lw=7){ polygone(c,AV.map(([x,y])=>Pc(x,y,0)),null,coul,lw); }
  /* les 4 traits en biais (u = 0 → 1) ; le trait du coin en bas à gauche passe en pointillés quand cache > 0 */
  function biais(c,u,cache=0,coul=BIAIS){ AV.forEach(([x,y])=>{ const h=x===0&&y===0&&cache>0; trait(c,Pc(x,y,0),Pc(x,y,1),u,h?CACHE:coul,h?5:7,h?[16,12]:null); }); }
  /* la face du fond : arêtes vues (haut, droite) ; arêtes cachées (bas, gauche) en pointillés à partir de « pointillés » */
  function fond(c,u,cache){ trait(c,Pc(0,1,1),Pc(1,1,1),u,CRAYON,7); trait(c,Pc(1,1,1),Pc(1,0,1),u,CRAYON,7);
    if(cache) { trait(c,Pc(0,0,1),Pc(1,0,1),u,CACHE,5,[16,12]); trait(c,Pc(0,0,1),Pc(0,1,1),u,CACHE,5,[16,12]); }
    else { trait(c,Pc(0,0,1),Pc(1,0,1),u,CRAYON,7); trait(c,Pc(0,0,1),Pc(0,1,1),u,CRAYON,7); } }
  const X=850;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : le cube en perspective cavalière ; combien d'arêtes en tout ? */
      feuille(c);
      if(T>=cCube){ const fl=T>=cPoint&&T<cPoint+1.2&&Math.sin((T-cPoint)*14)>0;
        dessinerPoly(c,pave3(1,1,1),{e,ox,oy,coul:'#ffe8cc',trait:CRAYON,lw:7,alpha:.6}); if(fl) { trait(c,Pc(0,0,0),Pc(0,0,1),1,CRAIE.jaune,9,[16,12]); trait(c,Pc(0,0,1),Pc(1,0,1),1,CRAIE.jaune,9,[16,12]); trait(c,Pc(0,0,1),Pc(0,1,1),1,CRAIE.jaune,9,[16,12]); } }
      if(T>=cPersp) ecrire(c,'perspective',X,130,44,CRAIE.blanc); if(T>=cCav) ecrire(c,'cavalière',X,185,44,CRAIE.blanc);
      if(T>=cAretes) ecrire(c,'? arêtes',X,330,62*zoom(T,cAretes,.5),CRAIE.jaune);
      tab.maj(); return; }
    if(T<q){ /* le carré ; la feuille est plate ; la profondeur ? */
      feuille(c); carre(c,T>=tCarre&&T<pla?CRAIE.faux:CRAYON);
      if(T>=tCarre&&T<pla) ecrire(c,'un carré ?',X,300,52*zoom(T,tCarre,.4),CRAIE.faux);
      if(T>=tPlate) ecrire(c,'feuille plate',X,250,40*zoom(T,tPlate,.4),CRAIE.blanc);
      if(T>=tProf) ecrire(c,'profondeur ?',X,380,44*zoom(T,tProf,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : depuis chaque coin, un trait en biais, tous pareils ; on relie les bouts ; arêtes cachées en pointillés */
      feuille(c);
      if(T>=rVoila) dessinerPoly(c,pave3(1,1,1),{e,ox,oy,coul:'#ffe8cc',trait:CRAYON,lw:7,alpha:lisse01(entre(T,rVoila,rCube+.3))*.6,cacheesOff:true});
      carre(c);
      if(T>=rCoin) AV.forEach(([x,y],k)=>{ if(T>=rCoin+.12*k) rond(c,...Pc(x,y,0),13,BIAIS); });
      biais(c,(T-rTrait)/(rBiais+.4-rTrait),T>=rPoint);
      if(T>=rPareils) AV.forEach(([x,y])=>{ const m=Pc(x,y,.5); trait(c,[m[0]-12,m[1]-12],[m[0]+12,m[1]+12],1,CRAIE.jaune,6); });
      fond(c,(T-rRelie)/(rBouts+.4-rRelie),T>=rPoint);
      if(T>=rBiais) ecrire(c,'en biais',X,170,54*zoom(T,rBiais,.4),BIAIS);
      if(T>=rPareils) ecrire(c,'tous pareils',X,250,44*zoom(T,rPareils,.4),CRAIE.jaune);
      if(T>=rCachees) prog(c,[[rCachees,'cachées :'],[rPoint,'cachées : - - -']],T,X,360,42,'#ced4da');
      if(T>=rCube) coche(c,X-60,500,.6);
      tab.maj(); return; }
    /* ouf : le copain veut l'attraper… c'est toujours un dessin */
    feuille(c); dessinerPoly(c,pave3(1,1,1),{e,ox,oy,coul:'#ffe8cc',trait:CRAYON,lw:7,alpha:.6});
    const u=lisse01(entre(T,oAttraper-.3,oAttraper+.7)), rec=lisse01(entre(T,oDessin,oDessin+.5));
    if(T>=oAttraper-.3) main6(c,1000-u*420+rec*200,360,1);
    if(T>=oDessin) ecrire(c,'un dessin !',X,140,46*zoom(T,oDessin,.4),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-plat'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('J’ai dessiné un cube'),a0('pour mon copain.')),
    ...suiteDe(pla,60,62,[a0('Il me dit :'),a0('« C’est un carré, ton truc ! »')]),
    ...suiteDe(q,60,62,[a1('Il a raison…')],[a1('Ma feuille est plate.')],[a1('Comment montrer'),a1('la profondeur ?')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qu’est-ce que je dois ajouter ?')];
  const CH=choixMotAMot(qd,q,r,[['A','un deuxième carré, collé à côté'],['B','rien, c’est parfait'],['C','des traits en biais, depuis les coins']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Depuis chaque coin,'),rd('un trait en biais, tous pareils.')],[rd('On relie les bouts,'),rd('et les arêtes cachées en pointillés.')],
      [rd('Voilà un vrai cube !')]),
    ...suiteDe(com,60,62,[a3('Mon copain veut l’attraper…')],[a3('C’est toujours un dessin !')]),
    ...suiteDe(f,60,58,[a4('À toi : sur le dessin d’un cube'),a4('en perspective cavalière,')],[a4('combien d’arêtes en tout,'),a4('pointillés compris ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <rect x="30" y="30" width="200" height="190" fill="#fffdf5"/>
    <rect x="60" y="100" width="100" height="100" fill="none" stroke="#343a40" stroke-width="6"/>
    <text x="280" y="160" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Un carré…<br>ou un cube ?'+PARI,mini);
  return { clips,FIN,titre:'Mon cube tout plat',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,pla,q,r,finR,ouf,com,f],
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
      else if(T<pla){ T<tCarre?g.montre():g.oups(); }
      else if(T<q){ T<tComment?g.ouvre():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<rVoila?g.montre():g.fier(); }
      else if(T<com){ T<oDessin?g.oups():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
