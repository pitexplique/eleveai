/* Série Vision dans l'espace 6e, ÉPISODE 04 : LE GÂTEAU AU CHOCOLAT (ceinture blanche). Outils : 6e-commun.js et films/6e-vision.js.
   Un gâteau en cube 3 × 3 × 3, recouvert de chocolat dehors, coupé en 27 petits cubes. Les gourmands veulent ceux qui ont
   3 faces au chocolat. Question : combien ? 8 (B) : ce sont les coins, un cube a 8 coins. Le morceau du centre, sans chocolat :
   personne n'en veut, Ti Margo le prend. Commentaire : combien de morceaux ont exactement 2 faces au chocolat ? */

const CHOCO='#6b3a1e', GENOISE='#f6d58e', TRAIT_G='#3b2008';
/* La couleur d'une face d'un petit cube du gâteau : chocolat si elle est dehors (x, y, z de 0 à 2) */
const faceGateau=(choco=1)=>(x,y,z,fa)=>{ const dehors=fa==='av'?z===0:fa==='haut'?y===2:x===2; return dehors&&choco>=1?CHOCO:GENOISE; };
const COINS=[];
for(const x of [0,2]) for(const y of [0,2]) for(const z of [0,2]) COINS.push([x,y,z]);

FILMS.defi=function(outils){
  const DUR={'00-accroche':8.83,'01-coins':5.71,'02-question':10.69,'02b-reponse':6.87,'03-ouf':7.52,'04-commentaire':7.06,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:coi,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-coins',k), mr=k=>marque('02b-reponse',k), m4=k=>marque('04-commentaire',k);

  const t3a=m0(4), t3b=m0(6), t3c=m0(8), tRecouvert=mot('00-accroche','recouvert'), tChoco=mot('00-accroche','chocolat'), tCoupe=mot('00-accroche','coupe'), t27=m0(18), t27p=m0(19), tCubes=m0(20);
  const tCeux=mot('01-coins','ceux'), t3f=m1(11), t3fa=m1(12), tChoco1=mot('01-coins','chocolat');
  const tB=mot('02b-reponse','B'), rCe=mr(2), rCoins=mr(5), rUn=mr(8), r8=mr(11), r8c=mr(12), r8m=mr(13);
  const oCentre=mot('03-ouf','centre'), oGoutte=mot('03-ouf','goutte'), oChoco=mot('03-ouf','chocolat'), oPersonne=mot('03-ouf','Personne'), oPrends=mot('03-ouf','prends');
  const cMorceaux=mot('04-commentaire','morceaux'), c2=m4(7), cChoco=mot('04-commentaire','chocolat'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t3a-.08, finR=rCe-.08;

  const e=105, o=centrerBoite(0,3,0,3,0,3,e,330,380), P=(x,y,z)=>cav([x,y,z],e,o.ox,o.oy);
  const TOUS=paveCubes(3,3,3), X=830;
  function cotes3(c,T){
    if(T>=t3a){ const a=P(0,3,3), b=P(3,3,3); cote(c,[a[0],a[1]-34],[b[0],b[1]-34],(T-t3a)/.4); ecrire(c,'3',(a[0]+b[0])/2,a[1]-76,52,CRAIE.jaune); }
    if(T>=t3b){ const a=P(3,0,0), b=P(3,0,3); cote(c,[a[0]+36,a[1]+8],[b[0]+36,b[1]+8],(T-t3b)/.4); ecrire(c,'3',(a[0]+b[0])/2+76,(a[1]+b[1])/2+16,52,CRAIE.jaune); }
    if(T>=t3c){ const a=P(0,0,0), b=P(0,3,0); cote(c,[a[0]-36,a[1]],[b[0]-36,b[1]],(T-t3c)/.4); ecrire(c,'3',a[0]-74,(a[1]+b[1])/2,52,CRAIE.jaune); } }
  /* le contour jaune des faces d'un petit cube (déplacé de d) ; faces ⊂ ['av','haut','dr'] */
  function contour(c,[x,y,z],faces,d=[0,0,0],coul=CRAIE.jaune){ const Q=(a,b,g)=>P(x+a+d[0],y+b+d[1],z+g+d[2]);
    const F={av:[Q(0,0,0),Q(1,0,0),Q(1,1,0),Q(0,1,0)],haut:[Q(0,1,0),Q(1,1,0),Q(1,1,1),Q(0,1,1)],dr:[Q(1,0,0),Q(1,0,1),Q(1,1,1),Q(1,1,0)]};
    for(const fa of faces) polygone(c,F[fa],null,coul,8); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un morceau de bord, 2 faces au chocolat ; combien en tout ? */
      blocs(c,TOUS,o,{coul:faceGateau(),trait:TRAIT_G,lw:3});
      if(T>=c2) contour(c,[1,2,0],['av','haut']);
      if(T>=c2) prog(c,[[c2,'2 faces']],T,X,250,56,CRAIE.jaune);
      if(T>=cMorceaux) ecrire(c,'? morceaux',X,420,56*zoom(T,cMorceaux,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T<coi){ /* le gâteau : 3 sur 3 sur 3, recouvert de chocolat ; coupé en 27 */
      const k=lisse01(entre(T,tRecouvert,tChoco+.3));
      if(T<tCoupe){ /* un seul gros cube, la génoise qui se couvre de chocolat (mélange de couleurs) */
        const mix=(a,b,u)=>'#'+[0,2,4].map(i=>Math.round(parseInt(a.slice(1+i,3+i),16)*(1-u)+parseInt(b.slice(1+i,3+i),16)*u).toString(16).padStart(2,'0')).join('');
        blocs(c,[[0,0,0]],{e:3*e,ox:o.ox,oy:o.oy},{coul:mix(GENOISE,CHOCO,k),trait:TRAIT_G,lw:5}); }
      else blocs(c,TOUS,o,{coul:faceGateau(),trait:TRAIT_G,lw:3});
      cotes3(c,T);
      if(T>=tChoco) ecrire(c,'chocolat',X,170,52*zoom(T,tChoco,.4),'#d9a066');
      if(T>=t27) prog(c,[[t27,'27'],[t27p,'27 petits'],[tCubes,'27 petits cubes']],T,X,300,46,CRAIE.blanc);
      tab.maj(); return; }
    if(T<q){ /* le coin d'en haut, devant à droite, sort du gâteau : 3 faces au chocolat */
      const u=lisse01(entre(T,tCeux,tCeux+.6)), d=[1.6*u,1.2*u,-.8*u], k='2,2,0';
      blocs(c,TOUS,o,{coul:faceGateau(),trait:TRAIT_G,lw:3,decal:{[k]:d}});
      cotes3(c,1e9);
      if(T>=t3f){ contour(c,[2,2,0],['av','haut','dr'],d);
        const Q=(a,b,g)=>P(2+a+d[0],2+b+d[1],g+d[2]); [[Q(.5,.5,0),'1'],[Q(.5,1,.5),'2'],[Q(1,.5,.5),'3']].forEach(([p,s],i)=>{ if(T>=t3f+.15*i) ecrire(c,s,p[0],p[1],40,CRAIE.jaune); });
        prog(c,[[t3f,'3 faces']],T,X,230,54,CRAIE.jaune); }
      if(T>=tChoco1) ecrire(c,'au chocolat',X,300,46,'#d9a066');
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : les coins du gâteau ; un cube a 8 coins */
      const coin=([x,y,z])=>COINS.some(p=>p[0]===x&&p[1]===y&&p[2]===z), al={};
      if(T>=rCoins) TOUS.forEach(p=>{ if(!coin(p)) al[p.join(',')]=.28; });
      blocs(c,TOUS,o,{coul:faceGateau(),trait:TRAIT_G,lw:3,alpha:al});
      if(T>=rCoins) COINS.forEach(p=>contour(c,p,['av','haut','dr'],[0,0,0],'rgba(255,212,59,.9)'));
      if(T>=rUn){ const ordre=[[0,2,0],[2,2,0],[2,0,0],[0,0,0],[0,2,2],[2,2,2],[2,0,2],[0,0,2]];
        ordre.forEach((p,i)=>{ const ti=rUn+(r8c-rUn)*i/7; if(T>=ti){ const m=P(p[0]+.5,p[1]+.5,p[2]?p[2]+1:0); /* coins du fond : sur leur face arrière, sinon cachés par ceux de devant */ const fz=50*zoom(T,ti,.4); c.save(); c.font=`800 ${fz}px "Segoe UI"`; c.textAlign='center'; c.textBaseline='middle'; c.lineJoin='round'; c.lineWidth=9; c.strokeStyle='#2b1a0a'; c.strokeText(String(i+1),m[0],m[1]); c.restore(); /* liseré sombre : lisible sur le biscuit clair */
          ecrire(c,String(i+1),m[0],m[1],fz,CRAIE.jaune); } }); }
      if(T>=r8) prog(c,[[r8,'8'],[r8c,'8 coins']],T,X,200,62,CRAIE.jaune);
      if(T>=r8m) ecrire(c,'8 morceaux',X,300,56*zoom(T,r8m,.4),CRAIE.ok);
      tab.maj(); return; }
    /* ouf : le morceau du centre, sans chocolat ; personne n'en veut ; Ti Margo le prend */
    const u=lisse01(entre(T,oPrends,oPrends+.7)), al={};
    if(T>=oCentre) TOUS.forEach(p=>{ if(p.join(',')!=='1,1,1') al[p.join(',')]=.22; });
    blocs(c,TOUS,o,{coul:faceGateau(),trait:TRAIT_G,lw:3,alpha:al,decal:{'1,1,1':[3.4*u,.6*u,-1*u]}});
    if(T>=oCentre) contour(c,[1,1,1],['av','haut','dr'],[3.4*u,.6*u,-1*u],CRAIE.blanc);
    if(T>=oGoutte) prog(c,[[oGoutte,'sans'],[oChoco,'sans chocolat']],T,X,170,50,'#d9a066');
    if(T>=oPersonne) ecrire(c,'personne ?',X,560,48*zoom(T,oPersonne,.4),CRAIE.gris);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-coins'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Mon gâteau en cube,')),
    ...suiteDe(coi,60,60,[a0('3 sur 3 sur 3,'),a0('est recouvert de chocolat dehors.')],[a0('Je le coupe'),a0('en 27 petits cubes !')]),
    ...suiteDe(q,60,60,[a1('Les gourmands veulent'),a1('les morceaux les plus chocolatés :')],[a1('ceux qui ont'),a1('3 faces au chocolat.')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de morceaux ont'),qd('3 faces au chocolat ?')];
  const CH=choixMotAMot(qd,q,r,[['A','6'],['B','8'],['C','12']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Ce sont les coins du gâteau.')],[rd('Un cube a 8 coins :'),rd('8 morceaux.')]),
    ...suiteDe(com,60,60,[a3('Et le morceau du centre,'),a3('sans une goutte de chocolat…')],[a3('Personne n’en veut.')],[a3('Je le prends !')]),
    ...suiteDe(f,60,58,[a4('À toi : combien de morceaux'),a4('ont exactement 2 faces'),a4('au chocolat ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[0,1,2].map(y=>[0,1,2].map(x=>`<rect x="${40+45*x}" y="${200-45*(y+1)}" width="45" height="45" fill="#6b3a1e" stroke="#3b2008" stroke-width="3"/>`).join('')).join('')}
    <path d="M40 65 L88 17 L223 17 L175 65 Z" fill="#8a5a2b" stroke="#3b2008" stroke-width="3"/><path d="M175 65 L223 17 L223 152 L175 200 Z" fill="#4a2810" stroke="#3b2008" stroke-width="3"/>
    <text x="280" y="160" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'3 faces au chocolat :<br>combien ?'+PARI,mini);
  return { clips,FIN,titre:'Le gâteau au chocolat',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,coi,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:B.fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,choix:CH.choix,
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); CH.maj(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<coi) g.montre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.pouce(); }
      else if(T<ouf) g.montre();
      else if(T<com){ T<oPersonne?g.montre():(T<oPrends?g.ouvre():g.fier()); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
