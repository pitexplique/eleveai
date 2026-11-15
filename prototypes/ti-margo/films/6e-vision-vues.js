/* Série Vision dans l'espace 6e, ÉPISODE 01 : LE DRONE (ceinture blanche). Outils : 6e-commun.js et films/6e-vision.js.
   Le copain a construit deux tours de 5 cubes, collées ; Ti Margo les survole avec son drone. Vu d'en haut, plus de hauteur :
   on ne voit que le dessus des colonnes. Question : combien de carreaux ? 2 (A) : chaque colonne donne un seul carreau ;
   les 10 cubes se cachent les uns sous les autres. Commentaire : un escalier 4, 3, 2, 1 : combien de carreaux de face ? */

/* Le drone (centre x, y ; taille s) : un corps, quatre hélices qui tournent, et des lunettes si besoin */
function drone(c,x,y,s,T,lunettes=0){ c.save(); c.translate(x,y); c.scale(s,s);
  c.strokeStyle='#495057'; c.lineWidth=10; c.beginPath(); c.moveTo(-90,-6); c.lineTo(90,-6); c.stroke();
  for(const sx of [-90,90]){ c.fillStyle='#868e96'; c.fillRect(sx-5,-30,10,26); const l=60*Math.abs(Math.cos(T*30+sx));
    c.strokeStyle='#dee2e6'; c.lineWidth=8; c.beginPath(); c.moveTo(sx-l,-32); c.lineTo(sx+l,-32); c.stroke(); }
  c.fillStyle='#e03131'; c.strokeStyle='#7d1a1a'; c.lineWidth=5; c.beginPath(); c.roundRect(-46,-24,92,46,16); c.fill(); c.stroke();
  c.fillStyle='#212529'; c.beginPath(); c.arc(0,30,12,0,7); c.fill();
  if(lunettes>0){ c.globalAlpha=Math.min(1,lunettes); c.strokeStyle='#212529'; c.lineWidth=6; c.fillStyle='rgba(165,216,255,.7)';
    for(const sx of [-20,20]){ c.beginPath(); c.arc(sx,0,17,0,7); c.fill(); c.stroke(); } c.beginPath(); c.moveTo(-3,0); c.lineTo(3,0); c.stroke(); }
  c.restore(); }

FILMS.vues=function(outils){
  const DUR={'00-accroche':7.54,'01-drone':4.78,'02-question':9.88,'02b-reponse':10.51,'03-ouf':5.4,'04-commentaire':11.17,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:dro,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), mr=k=>marque('02b-reponse',k), m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);

  const tDeux=mot('00-accroche','deux'), t5=m0(7), t5c=m0(8), tCollees=mot('00-accroche','collées'), tSurvole=mot('00-accroche','survole'), tDrone=mot('00-accroche','drone');
  const tHaut=mot('01-drone','haut'), tHauteur=mot('01-drone','hauteur'), tDessus=mot('01-drone','dessus'), tColonnes=mot('01-drone','colonnes');
  const tA=mot('02b-reponse','A'), rChaque=mot('02b-reponse','Chaque'), rColonne=mr(3), rSeul=mr(6), rCarreau=mr(7), rHaut=mr(10), r2t=mr(11), r2c=mr(13), r2cc=mr(14),
    r10=mr(16), rCachent=mot('02b-reponse','cachent'), rSous=mot('02b-reponse','sous');
  const o10=m3(0), o2=mot('03-ouf','2'), oLunettes=mot('03-ouf','lunettes');
  const cEsc=mot('04-commentaire','escalier'), c4c=m4(5), c4=m4(8), c3=m4(9), c2=m4(10), c1=m4(12), cVue=mot('04-commentaire','vue'), cFace=mot('04-commentaire','face'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tDeux-.08, finR=rChaque-.08;

  const CUBE='#74c0fc', DESSUS='#ffd43b', e=82, o={e,ox:200,oy:640};
  const P=(x,y,z)=>cav([x,y,z],e,o.ox,o.oy);
  const TOURS=[...[0,1,2,3,4].map(y=>[0,y,0]),...[0,1,2,3,4].map(y=>[1,y,0])];
  const ORD=[...TOURS].sort((a,b)=>(a[1]-b[1])||(a[0]-b[0]));
  function tours(c,T,{n=10,dessus=false,fantome=0}={}){
    const pos=ORD.slice(0,n), al={};
    if(fantome>0) pos.forEach(p=>{ if(p[1]<4) al[p.join(',')]=1-.75*fantome; });
    blocs(c,pos,o,{coul:(x,y,z,fa)=>dessus&&fa==='haut'&&y===4?DESSUS:CUBE,lw:4,alpha:al}); }
  /* la position du drone : il arrive de la droite au « survole », puis plane au-dessus des tours */
  const DX=P(1,5,.5)[0], DY=110;
  function droneLa(c,T,lun=0){ const u=lisse01(entre(T,tSurvole-.3,tDrone+.3)); drone(c,DX+(1-u)*700,DY+6*Math.sin(T*3),1,T,lun); }
  /* les traits de vue du drone vers le dessus des colonnes */
  function regard(c,u){ if(u<=0) return; for(const p of [P(0,5,0),P(2,5,0),P(2,5,1),P(0,5,1)]) trait(c,[DX,DY+40],p,u,'rgba(255,255,255,.55)',4,[12,10]); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un escalier de 4 colonnes, de 4, 3, 2 et 1 cubes */
      const ee=88, oc=centrerBoite(0,4,0,4,0,1,ee,380,420), Q=(x,y,z)=>cav([x,y,z],ee,oc.ox,oc.oy), H=[4,3,2,1], tH=[c4,c3,c2,c1], pos=[];
      if(T>=c4c&&T<c4) for(let x=0;x<4;x++) polygone(c,[Q(x,0,0),Q(x+1,0,0),Q(x+1,0,1),Q(x,0,1)],null,CRAIE.gris,4);
      H.forEach((h,x)=>{ if(T>=tH[x]) for(let y=0;y<h;y++) pos.push([x,y,0]); });
      blocs(c,pos,oc,{coul:CUBE,lw:4});
      H.forEach((h,x)=>{ if(T>=tH[x]){ const p=Q(x+.5,h,.5); ecrire(c,String(h),p[0],p[1]-44,56*zoom(T,tH[x],.4),CRAIE.jaune); } });
      if(T>=cVue) prog(c,[[cVue,'vue'],[cFace,'vue de face']],T,840,170,56,CRAIE.blanc);
      if(T>=cFace) ecrire(c,'?',840,330,150*zoom(T,cFace,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<dro){ /* deux tours de 5 cubes, collées ; le drone arrive */
      if(T>=t5) tours(c,T,{n:Math.min(10,Math.floor(10*entre(T,t5,t5c+.3))+1)});
      if(T>=t5){ const a=P(2,0,0), b=P(2,5,0); cote(c,[a[0]+50,a[1]],[b[0]+50,b[1]],(T-t5)/(t5c+.3-t5)); prog(c,[[t5,'5'],[t5c,'5 cubes']],T,a[0]+190,(a[1]+b[1])/2,54,CRAIE.jaune); }
      if(T>=tCollees&&T<tSurvole-.3) ecrire(c,'collées',P(1,5,0)[0],P(1,5,0)[1]-50,46*zoom(T,tCollees,.4),CRAIE.blanc);
      if(T>=tSurvole-.3) droneLa(c,T);
      tab.maj(); return; }
    if(T<q){ /* vu d'en haut : on ne voit que le dessus des colonnes */
      tours(c,T,{dessus:T>=tDessus});
      const a=P(2,0,0), b=P(2,5,0); cote(c,[a[0]+50,a[1]],[b[0]+50,b[1]],1); ecrire(c,'5 cubes',a[0]+190,(a[1]+b[1])/2,54,CRAIE.jaune);
      regard(c,(T-tHaut)/.6); droneLa(c,T);
      if(T>=tHauteur) ecrire(c,'plus de hauteur !',770,560,42*zoom(T,tHauteur,.4),CRAIE.faux);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : un carreau par colonne ; 2 tours, 2 carreaux ; les 10 cubes se cachent */
      tours(c,T,{dessus:true,fantome:entre(T,rCachent,rSous+.3)}); regard(c,1); droneLa(c,T);
      const X=800, Y=330, s=120;
      if(T>=rHaut-.4) ecrire(c,'vu d’en haut',X,170,50*zoom(T,rHaut-.4,.4),CRAIE.blanc);
      for(const k of [0,1]){ const tk=k?rCarreau:rSeul; if(T>=tk){ const z=zoom(T,tk,.4), x=X-s+k*s;
        c.save(); c.translate(x+s/2,Y); c.scale(z,z); c.fillStyle=DESSUS; c.strokeStyle='#1b2a3a'; c.lineWidth=5; c.fillRect(-s/2,-s/2,s,s); c.strokeRect(-s/2,-s/2,s,s); c.restore(); } }
      if(T>=r2t) ecrire(c,'2 tours',555,480,46*zoom(T,r2t,.4),CRAIE.blanc);
      if(T>=r2c) prog(c,[[r2c,'2'],[r2cc,'2 carreaux']],T,X,Y+120,54,DESSUS);
      if(T>=r10) ecrire(c,'10 cubes',X,560,54*zoom(T,r10,.4),CUBE);
      tab.maj(); return; }
    /* ouf : 10 cubes, et le drone n'en voit que 2 : il lui faut des lunettes */
    tours(c,T,{dessus:true}); regard(c,1); droneLa(c,T,(T-oLunettes)/.3);
    if(T>=o10) ecrire(c,'10 cubes',800,330,62*zoom(T,o10,.4),CUBE);
    if(T>=o2) ecrire(c,'2',800,460,120*zoom(T,o2,.5),DESSUS);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-drone'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Mon copain a construit')),
    ...suiteDe(dro,60,62,[a0('deux tours de 5 cubes, collées.')],[a0('Moi, je les survole'),a0('avec mon drone !')]),
    ...suiteDe(q,60,62,[a1('Vu d’en haut, plus de hauteur :')],[a1('je ne vois que'),a1('le dessus des colonnes.')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de carreaux'),qd('voit mon drone ?')];
  const CH=choixMotAMot(qd,q,r,[['A','2'],['B','10'],['C','5']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Chaque colonne donne un seul carreau'),rd('vu d’en haut.')],[rd('2 tours : 2 carreaux.')],
      [rd('Les 10 cubes se cachent'),rd('les uns sous les autres.')]),
    ...suiteDe(com,60,62,[a3('10 cubes, et mon drone'),a3('n’en voit que 2…')],[a3('Il lui faut des lunettes !')]),
    ...suiteDe(f,60,58,[a4('À toi : un escalier de 4 colonnes,'),a4('de 4, 3, 2 et 1 cubes.')],[a4('Combien de carreaux'),a4('dans sa vue de face ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[0,1,2,3,4].map(y=>[0,1].map(x=>`<rect x="${70+30*x}" y="${200-30*(y+1)}" width="30" height="30" fill="#74c0fc" stroke="#1b2a3a" stroke-width="3"/>`).join('')).join('')}
    <path d="M70 50 L82 38 L142 38 L130 50 Z" fill="#ffd43b" stroke="#1b2a3a" stroke-width="3"/>
    <rect x="80" y="14" width="44" height="18" rx="6" fill="#e03131"/><line x1="60" y1="16" x2="144" y2="16" stroke="#dee2e6" stroke-width="5"/>
    <text x="250" y="160" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Vu d’en haut :<br>combien de carreaux ?'+PARI,mini);
  return { clips,FIN,titre:'Mon drone et les tours',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dro,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:B.fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,choix:CH.choix,
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); CH.maj(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<dro){ T<tSurvole?g.montre():g.fier(); }
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tA?g.ouvre():g.pouce(); }
      else if(T<ouf) g.montre();
      else if(T<com){ T<oLunettes?g.oups():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
