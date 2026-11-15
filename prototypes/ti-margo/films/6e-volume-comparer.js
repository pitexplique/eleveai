/* Série Volume 6e, ÉPISODE 03 : LA TOUR ET LE BLOC (ceinture blanche). Outils : 6e-commun.js et films/6e-volume.js.
   La tour de Ti Margo : 10 cubes l'un sur l'autre. Le bloc tout plat du copain : 3 de long, 2 de large, 2 étages.
   Question : qui a utilisé le plus de cubes ? Le copain (B) : 3 × 2 = 6 par étage, 2 étages, 12 > 10.
   La plus haute n'est pas la plus grande : il rajoute des étages. Commentaire : tour de 15 contre bloc 4 × 2 × 2 ? */

FILMS.comparer=function(outils){
  const DUR={'00-accroche':4.98,'01-bloc':10.34,'02-question':14.19,'02b-reponse':12.36,'03-ouf':5.76,'04-commentaire':10.96,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:blo,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-bloc',k), mr=k=>marque('02b-reponse',k), m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);
  { const css=document.createElement('style'); css.textContent='.choix{font-size:52px!important;}'; document.head.append(css); }

  const t10=m0(7), tLun=mot('00-accroche','l\'un');
  const tBloc=mot('01-bloc','bloc'), tPlat=mot('01-bloc','plat'), t3=m1(9), tLong=m1(12), t2=m1(13), tLarge=m1(15), t2e=m1(16), tHa=mot('01-bloc','Ha'), tGrande=mot('01-bloc','grande');
  const tB=mot('02b-reponse','B'), rLe=mot('02b-reponse','Le'), r3=mr(4), rFois=mr(5), r2=mr(6), r6=mr(7), rEtage=mr(9), r2e=mr(10), r12=mr(12), rMa=mr(14), r10=mr(16),
    r12b=mr(18), rPlus=mr(20), r10b=mr(22);
  const oHaute=m3(2), oGrande=m3(7), oRajoute=mot('03-ouf','rajoute'), oEtages=mot('03-ouf','étages');
  const c15=m4(5), cBloc=mot('04-commentaire','bloc'), c4=m4(14), c2a=m4(16), c2b=m4(18), cLequel=mot('04-commentaire','Lequel'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t10-.08, finR=rLe-.08;

  const TOURC='#ff922b', BLOCC='#74c0fc', ET=['#ffd43b','#8ce99a'];
  const eT=50, oT={e:eT,ox:88,oy:690};                  /* la tour : cube (0, k, 0), pied à gauche en bas */
  const eB=92, oB=centrerBoite(0,3,0,2,0,2,eB,720,465);   /* le bloc 3 × 2 × 2 */
  const PB=(x,y,z,oo=oB)=>cav([x,y,z],oo.e,oo.ox,oo.oy);
  function tour(c,n,{coul=TOURC,alpha=1,ee=eT,oo=oT}={}){ const pos=[...Array(Math.max(0,n)).keys()].map(k=>[0,k,0]); if(pos.length) blocs(c,pos,oo,{coul,lw:4,alpha:alpha<1?Object.fromEntries(pos.map(p=>[p.join(','),alpha])):{}}); }
  function coteTour(c,n,u,txt,{ee=eT,oo=oT}={}){ const a=cav([1,0,0],ee,oo.ox,oo.oy), b=cav([1,n,0],ee,oo.ox,oo.oy);
    cote(c,[a[0]+38,a[1]],[b[0]+38,b[1]],u); if(txt&&u>0) ecrire(c,txt,a[0]+92,(a[1]+b[1])/2,58,CRAIE.jaune); }
  /* le bloc : cubes du copain, apparition rangée par rangée (3 de long, 2 de large, 2 étages) */
  function bloc(c,T,coulFn=null){ const pos=[];
    for(let y=0;y<2;y++) for(let z=0;z<2;z++) for(let x=0;x<3;x++){ const t0=y===1?t2e:(z===0?t3+.12*x:t2+.1*x); if(T>=t0) pos.push([x,y,z]); }
    if(T>=tBloc&&T<t3) polygone(c,[PB(0,0,0),PB(3,0,0),PB(3,0,2),PB(0,0,2)],null,CRAIE.gris,4);
    blocs(c,pos,oB,{coul:coulFn||BLOCC,lw:4}); }
  function cotesBloc(c,T){
    cote(c,[PB(0,0,0)[0],PB(0,0,0)[1]+38],[PB(3,0,0)[0],PB(3,0,0)[1]+38],(T-t3)/(tLong+.2-t3)); if(T>=t3) ecrire(c,'3',(PB(0,0,0)[0]+PB(3,0,0)[0])/2,PB(0,0,0)[1]+86,56,CRAIE.jaune);
    if(T>=t2){ const a=PB(3,0,0), b=PB(3,0,2); cote(c,[a[0]+38,a[1]+8],[b[0]+38,b[1]+8],(T-t2)/(tLarge+.2-t2)); ecrire(c,'2',(a[0]+b[0])/2+84,(a[1]+b[1])/2+18,56,CRAIE.jaune); }
    if(T>=t2e){ const a=PB(0,0,0), b=PB(0,2,0); cote(c,[a[0]-38,a[1]],[b[0]-38,b[1]],(T-t2e)/.5); ecrire(c,'2',a[0]-84,(a[1]+b[1])/2,56,CRAIE.jaune); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une tour de 15 et un bloc 4 × 2 × 2 */
      const e2=37, o2={e:e2,ox:92,oy:688};
      tour(c,Math.min(15,Math.floor(15*entre(T,c15-.05,c15+.7))+(T>=c15?1:0)),{ee:e2,oo:o2});
      if(T>=c15) coteTour(c,15,(T-c15)/.6,'15',{ee:e2,oo:o2});
      const e3=86, o3=centrerBoite(0,4,0,2,0,2,e3,700,470), Q=(x,y,z)=>cav([x,y,z],e3,o3.ox,o3.oy), pos=[];
      for(let y=0;y<2;y++) for(let z=0;z<2;z++) for(let x=0;x<4;x++){ const t0=y===1?c2b:(z===0?c4+.1*x:c2a+.08*x); if(T>=t0) pos.push([x,y,z]); }
      if(T>=cBloc&&T<c4) polygone(c,[Q(0,0,0),Q(4,0,0),Q(4,0,2),Q(0,0,2)],null,CRAIE.gris,4);
      blocs(c,pos,o3,{coul:BLOCC,lw:4});
      if(T>=c4){ cote(c,[Q(0,0,0)[0],Q(0,0,0)[1]+38],[Q(4,0,0)[0],Q(4,0,0)[1]+38],(T-c4)/.5); ecrire(c,'4',(Q(0,0,0)[0]+Q(4,0,0)[0])/2,Q(0,0,0)[1]+86,56,CRAIE.jaune); }
      if(T>=c2a){ const a=Q(4,0,0), b=Q(4,0,2); cote(c,[a[0]+38,a[1]+8],[b[0]+38,b[1]+8],(T-c2a)/.4); ecrire(c,'2',(a[0]+b[0])/2+84,(a[1]+b[1])/2+18,56,CRAIE.jaune); }
      if(T>=c2b){ const a=Q(0,0,0), b=Q(0,2,0); cote(c,[a[0]-38,a[1]],[b[0]-38,b[1]],(T-c2b)/.4); ecrire(c,'2',a[0]-84,(a[1]+b[1])/2,56,CRAIE.jaune); }
      if(T>=cLequel) ecrire(c,'?',700,130,150*zoom(T,cLequel,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<blo){ /* la tour monte, cube par cube */
      tour(c,Math.min(10,Math.floor(10*entre(T,t10,tLun+.3))+1));
      if(T>=t10) coteTour(c,10,(T-t10)/(tLun+.3-t10),'10');
      tab.maj(); return; }
    if(T<q){ /* le bloc tout plat du copain ; « Ma tour est bien plus grande » */
      tour(c,10); coteTour(c,10,1,'10');
      bloc(c,T); cotesBloc(c,T);
      if(T>=tGrande) ecrire(c,'plus grande ?',700,120,60*zoom(T,tGrande,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : 3 × 2 = 6 par étage ; 2 étages : 12 cubes ; la tour : 10 ; 12 > 10 */
      tour(c,10,{coul:T>=rMa?'#ffa94d':TOURC}); coteTour(c,10,1,T>=r10?null:'10');
      if(T>=r10){ const a=cav([1,0,0],eT,oT.ox,oT.oy); ecrire(c,'10',a[0]+92,a[1]-250,64*zoom(T,r10,.5),CRAIE.jaune); }
      bloc(c,T,(x,y,z)=>T>=r2e?ET[y]:(T>=r3&&y===1?ET[0]:BLOCC)); cotesBloc(c,T);
      const X=730;
      if(T>=r3) prog(c,[[r3,'3'],[rFois,'3 ×'],[r2,'3 × 2'],[r6,'3 × 2 = 6']],T,X,90,62,ET[0]);
      if(T>=r6) ecrire(c,'par étage',X,160,44,ET[0]);
      if(T>=r2e) prog(c,[[r2e,'2 étages'],[r12,'2 étages : 12']],T,X,240,54,CRAIE.ok);
      if(T>=r12b) prog(c,[[r12b,'12'],[rPlus,'12 >'],[r10b,'12 > 10']],T,350,330,66,CRAIE.ok);
      tab.maj(); return; }
    /* ouf : la plus haute n'est pas la plus grande ; il rajoute des étages à sa tour */
    const n=10+Math.min(3,Math.floor(3*entre(T,oRajoute,oEtages+.5))+(T>=oRajoute?1:0));
    tour(c,Math.min(13,n)); if(T<oRajoute) coteTour(c,10,1,'10');
    bloc(c,1e9,(x,y,z)=>ET[y]); ecrire(c,'12',PB(1.5,2,1)[0],PB(1.5,2,1)[1]-60,64,CRAIE.ok);
    if(T>=oHaute) ecrire(c,'la plus haute',360,200,48*zoom(T,oHaute,.4),TOURC);
    if(T>=oGrande) ecrire(c,'la plus grande',720,140,48*zoom(T,oGrande,.4),BLOCC);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-bloc'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Ma tour de cubes'),a0('monte jusqu’au ciel :')),
    ...suiteDe(blo,60,62,[a0('10 cubes, l’un sur l’autre !')]),
    ...suiteDe(q,60,60,[a1('Mon copain, lui,'),a1('a fait un bloc tout plat :')],[a1('3 cubes de long, 2 de large,'),a1('2 étages.')],[a1('Ha ! Ma tour'),a1('est bien plus grande.')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui a utilisé'),qd('le plus de cubes ?')];
  const CH=choixMotAMot(qd,q,r,[['A','moi, ma tour est plus haute'],['B','mon copain'],['C','on est à égalité']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,60,[rd('Le bloc : 3 × 2,'),rd('6 par étage ;')],[rd('2 étages, 12 cubes.')],[rd('Ma tour : 10 cubes.')],[rd('12, c’est plus que 10 !')]),
    ...suiteDe(com,60,62,[a3('La plus haute'),a3('n’est pas la plus grande…')],[a3('Vite, je rajoute des étages !')]),
    ...suiteDe(f,60,58,[a4('À toi : une tour de 15 cubes,'),a4('l’un sur l’autre,'),a4('et un bloc de 4 sur 2 sur 2.')],[a4('Lequel a le plus de cubes ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[...Array(10).keys()].map(k=>`<rect x="40" y="${214-19*(k+1)}" width="19" height="19" fill="#ff922b" stroke="#1b2a3a" stroke-width="2"/>`).join('')}
    ${[0,1].map(y=>[0,1,2].map(x=>`<rect x="${120+40*x}" y="${174-40*y}" width="40" height="40" fill="#74c0fc" stroke="#1b2a3a" stroke-width="3"/>`).join('')).join('')}
    <path d="M120 134 L140 114 L260 114 L240 134 Z" fill="#a5d8ff" stroke="#1b2a3a" stroke-width="3"/><path d="M240 134 L260 114 L260 194 L240 214 Z" fill="#4dabf7" stroke="#1b2a3a" stroke-width="3"/>
    <text x="295" y="90" font-family="Segoe UI" font-weight="800" font-size="80" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Qui a le plus<br>de cubes ?'+PARI,mini);
  return { clips,FIN,titre:'La tour et le bloc',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,blo,q,r,finR,ouf,com,f],
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
      else if(T<blo) g.montre();
      else if(T<q){ T<tHa?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tB?g.ouvre():g.oups(); }
      else if(T<ouf){ T<rMa?g.montre():(T<rPlus?g.montre():g.oups()); }
      else if(T<com){ T<oRajoute?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
