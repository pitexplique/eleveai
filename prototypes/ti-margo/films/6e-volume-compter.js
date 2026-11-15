/* Série Volume 6e, ÉPISODE 02 : LE BLOC DE SUCRES (ceinture blanche). Outils : 6e-commun.js et films/6e-volume.js.
   Ti Margo construit un bloc de sucres : 4 de long, 2 de large, et 3 étages pareils. Question : combien de morceaux ?
   Un étage : 4 × 2 = 8 ; 3 étages : 8 × 3 = 24 (C). 9 = 4 + 2 + 3 : on a additionné. Il en mange un seul.
   Commentaire : un bloc de 5 sur 3, 2 étages ? */

FILMS.compter=function(outils){
  const DUR={'00-accroche':5.63,'01-etages':2.85,'02-question':10.38,'02b-reponse':14.01,'03-ouf':5.03,'04-commentaire':9.35,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:eta,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-etages',k), mr=k=>marque('02b-reponse',k), m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);

  const tAvec=mot('00-accroche','avec'), tSucre=mot('00-accroche','sucre'), t4=m0(9), tLong=m0(11), t2=m0(12), tLarge=m0(14);
  const t3=m1(2), t3b=m1(3), tPareils=mot('01-etages','pareils');
  const tC=mot('02b-reponse','C'), rUn=m(2), rEtage=mr(3), r4=mr(4), rFois=mr(5), r2=mr(6), r8=mr(7), r3e=mr(9), r8b=mr(11), rFois2=mr(12), r3=mr(13), r24=mr(14), r24m=mr(15),
    r9=mr(16), r4p=mr(18), r2p=mr(20), r3c=mr(22), rAdd=mot('02b-reponse','additionné');
  function m(k){ return mr(k); }
  const o24=m3(0), oMange=mot('03-ouf','mange'), oSeul=mot('03-ouf','seul'), oPromis=mot('03-ouf','promis');
  const c5=m4(5), cLong=mot('04-commentaire','long'), c3=m4(9), c2=m4(13), cCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=t4-.08, finR=rUn-.08;

  const SUCRE='#f1f3f5', TR='#5c6b7a', ETAGE=['#ffd43b','#8ce99a','#74c0fc'];
  const e=92, o=centrerBoite(0,4,0,3,0,2,e,340,410);
  const Pp=(x,y,z,oo=o)=>cav([x,y,z],oo.e,oo.ox,oo.oy);
  /* les cubes du bloc, étage par étage ; apparition : rangée de devant au « 4 », rangée de derrière au « 2 », étages au « 3 » */
  function bloc(c,T,{couleurs=null,sans=[],decal={},alpha={}}={}){
    const pos=[];
    for(let y=0;y<3;y++) for(let z=0;z<2;z++) for(let x=0;x<4;x++){ const k=x+','+y+','+z; if(sans.includes(k)) continue;
      let t0; if(y===0) t0=z===0?t4+.12*x:t2+.1*x; else t0=y===1?t3:t3+.3;
      if(T>=t0) pos.push([x,y,z]); }
    blocs(c,pos,o,{coul:(x,y,z)=>couleurs?couleurs(x,y,z):SUCRE,trait:TR,lw:4,decal,alpha}); }
  /* les cotes : 4 sous la rangée de devant, 2 sur la fuyante de droite, 3 à gauche */
  function cotes(c,T){
    cote(c,[Pp(0,0,0)[0],Pp(0,0,0)[1]+40],[Pp(4,0,0)[0],Pp(4,0,0)[1]+40],(T-t4)/(tLong+.2-t4));
    if(T>=t4) ecrire(c,'4',(Pp(0,0,0)[0]+Pp(4,0,0)[0])/2,Pp(0,0,0)[1]+90,60,CRAIE.jaune);
    const a=Pp(4,0,0), b=Pp(4,0,2); cote(c,[a[0]+40,a[1]+10],[b[0]+40,b[1]+10],(T-t2)/(tLarge+.2-t2));
    if(T>=t2) ecrire(c,'2',(a[0]+b[0])/2+90,(a[1]+b[1])/2+20,60,CRAIE.jaune);
    if(T>=t3){ const a2=Pp(0,0,0), b2=Pp(0,3,0); cote(c,[a2[0]-40,a2[1]],[b2[0]-40,b2[1]],(T-t3)/.6); ecrire(c,'3',a2[0]-90,(a2[1]+b2[1])/2,60,CRAIE.jaune); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 5 de long, 3 de large, 2 étages */
      const ee=72, oc=centrerBoite(0,5,0,2,0,3,ee,360,420), Q=(x,y,z)=>cav([x,y,z],ee,oc.ox,oc.oy), pos=[];
      for(let y=0;y<2;y++) for(let z=0;z<3;z++) for(let x=0;x<5;x++){ const t0=y===1?c2:(z===0?c5+.08*x:c3+.05*(x+5*z)); if(T>=t0) pos.push([x,y,z]); }
      blocs(c,pos,oc,{coul:SUCRE,trait:TR,lw:4});
      cote(c,[Q(0,0,0)[0],Q(0,0,0)[1]+40],[Q(5,0,0)[0],Q(5,0,0)[1]+40],(T-c5)/(cLong+.2-c5)); if(T>=c5) ecrire(c,'5',(Q(0,0,0)[0]+Q(5,0,0)[0])/2,Q(0,0,0)[1]+90,60,CRAIE.jaune);
      if(T>=c3){ const a=Q(5,0,0), b=Q(5,0,3); cote(c,[a[0]+40,a[1]+10],[b[0]+40,b[1]+10],(T-c3)/.5); ecrire(c,'3',(a[0]+b[0])/2+90,(a[1]+b[1])/2+20,60,CRAIE.jaune); }
      if(T>=c2){ const a=Q(0,0,0), b=Q(0,2,0); cote(c,[a[0]-40,a[1]],[b[0]-40,b[1]],(T-c2)/.5); ecrire(c,'2',a[0]-90,(a[1]+b[1])/2,60,CRAIE.jaune); }
      if(T>=cCombien) ecrire(c,'?',850,300,160*zoom(T,cCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<q){ bloc(c,T); cotes(c,T); tab.maj(); return; }
    if(T<ouf){ /* la réponse : un étage (4 × 2 = 8), puis 3 étages (8 × 3 = 24) ; 9 = 4 + 2 + 3, additionné */
      const coul=(x,y,z)=>{ if(T>=r3e){ const k=Math.floor((T-r3e)/.25); return y<=k?ETAGE[y]:SUCRE; } return (T>=rEtage&&y===2)?ETAGE[0]:SUCRE; };
      bloc(c,T,{couleurs:coul}); cotes(c,T);
      const X=830;
      if(T>=r4) prog(c,[[r4,'4'],[rFois,'4 ×'],[r2,'4 × 2'],[r8,'4 × 2 = 8']],T,X,130,70,ETAGE[0]);
      if(T>=r3e) for(let y=0;y<3;y++) if(T>=r3e+.25*y){ const p=Pp(4,y+.5,2); ecrire(c,'8',p[0]+40,p[1],48*zoom(T,r3e+.25*y,.4),ETAGE[y]); }
      if(T>=r8b) prog(c,[[r8b,'8'],[rFois2,'8 ×'],[r3,'8 × 3'],[r24,'8 × 3 = 24']],T,X,260,70,CRAIE.ok);
      if(T>=r24m+.3) coche(c,X-50,340,.4);
      if(T>=r9) prog(c,[[r9,'9'],[r4p,'9 = 4 +'],[r2p,'9 = 4 + 2 +'],[r3c,'9 = 4 + 2 + 3']],T,X,470,52,CRAIE.faux);
      if(T>=rAdd){ ecrire(c,'additionné !',X-20,560,46*zoom(T,rAdd,.4),CRAIE.faux); trait(c,[X-200,500],[X+200,440],(T-rAdd)/.4,CRAIE.faux,9); }
      tab.maj(); return; }
    /* ouf : 24 morceaux ; il en prend un seul (celui d'en haut, devant à droite) */
    const k='3,2,0', u=lisse01(entre(T,oMange,oSeul));
    bloc(c,T,{decal:{[k]:[1.6*u,1.2*u,0]},alpha:{[k]:1-lisse01(entre(T,oPromis,oPromis+.6))}});
    if(T>=o24) ecrire(c,'24 morceaux',800,110,54*zoom(T,o24,.4),CRAIE.ok);
    if(T>=oSeul) ecrire(c,'1 seul !',820,300,54*zoom(T,oSeul,.4),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-etages'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je construis un bloc'),a0('avec des morceaux de sucre :')),
    ...suiteDe(eta,60,62,[a0('4 de long, 2 de large.')]),
    ...suiteDe(q,60,62,[a1('Et j’empile 3 étages pareils !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de morceaux'),qd('de sucre en tout ?')];
  const CH=choixMotAMot(qd,q,r,[['A','9'],['B','8'],['C','24']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Un étage : 4 × 2,'),rd('8 morceaux.')],[rd('3 étages : 8 × 3,'),rd('24 morceaux.')],
      [rd('9, c’est 4 + 2 + 3 :'),rd('on a additionné !')]),
    ...suiteDe(com,60,62,[a3('24 morceaux…')],[a3('Je n’en mange qu’un seul,'),a3('promis !')]),
    ...suiteDe(f,60,60,[a4('À toi : un bloc de 5 sucres de long,'),a4('3 de large et 2 étages.')],[a4('Combien de morceaux ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[0,1,2].map(y=>[0,1,2,3].map(x=>`<rect x="${40+40*x}" y="${150-40*y}" width="40" height="40" fill="#f1f3f5" stroke="#5c6b7a" stroke-width="3"/>`).join('')).join('')}
    <path d="M40 70 L68 42 L228 42 L200 70 Z" fill="#ffffff" stroke="#5c6b7a" stroke-width="3"/><path d="M200 70 L228 42 L228 162 L200 190 Z" fill="#ced4da" stroke="#5c6b7a" stroke-width="3"/>
    <text x="280" y="150" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Combien<br>de sucres ?'+PARI,mini);
  return { clips,FIN,titre:'Le bloc de sucres',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,eta,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:B.fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix:CH.choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); CH.maj(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<eta) g.montre();
      else if(T<q){ T<tPareils?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<r9?g.montre():(T<rAdd?g.montre():g.oups()); }
      else if(T<com){ T<oMange?g.fier():(T<oPromis?g.ouvre():g.pouce()); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
