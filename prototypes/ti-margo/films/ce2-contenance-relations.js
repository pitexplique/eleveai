/* ============================================================
   Série Contenance CE2 — ÉPISODE 02 : UN SEUL VERRE SUFFIT ? Outils : films/ce2-commun.js + ce2-contenance.js.
   Ti Margo remplit sa bouteille de 1 L avec un verre de 1 dL : « un seul verre suffit ? » Raté : il compte 1, 2, 3…
   Question : combien de verres ? (B, 10 verres : 10 dL = 1 L). Ceinture blanche.
   Commentaire : combien de cuillères de 1 cL pour remplir 1 L ?
   ============================================================ */
FILMS['relations']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':8.92,'01-oups':6.45,'02-question':14.93,'02b-reponse':6.62,'03-ouf':6.8,'04-commentaire':7.19,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tBout=mot('00-accroche','bouteille'), tLitre=mot('00-accroche','litre'),
        tVerre=mot('00-accroche','verre'), tDl=mot('00-accroche','décilitre'), tSuffit=mot('00-accroche','suffit');
  const tRate=mot('01-oups','Raté'), tC=[1,2,3].map(k=>mot('01-oups',String(k)));
  const tOuf=mot('03-ouf','Ouf'), tCuil=mot('03-ouf','cuillère'), tCl=mot('03-ouf','centilitre'), tTemps=mot('03-ouf','temps');
  const tCuilC=mot('04-commentaire','cuillères'), tClC=mot('04-commentaire','centilitre'), t1LC=mot('04-commentaire','litre'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, XR=740, B={x:190,y:600,w:150,h:300}, V={x:380,y:600,w:90,h:110};

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1 L, des cuillères de 1 cL */
      bouteilleCraie(c,B.x,B.y,B.w,B.h,.9,EAU,1); graduer(c,B.x,B.y,B.w,B.h,10);
      if(T>=t1LC) ecrire(c,'1 L',B.x,660,58*zoom(T,t1LC,.4),CRAIE.jaune);
      if(T>=tCuilC) cuillereCraie(c,560,330,1.1,EAU,zoom(T,tCuilC,.4));
      if(T>=tClC) ecrire(c,'1 cL',600,430,58*zoom(T,tClC,.4),CRAIE.jaune);
      if(T>=tCuilC+.4) ecrire(c,'combien ?',870,330,64*zoom(T,tCuilC+.4,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* le niveau de la bouteille : 1 verre versé à « suffit », puis 1 de plus à chaque nombre compté */
    let niv=0; if(T>=tSuffit) niv=.1; tC.forEach(t=>{ if(T>=t) niv+=.1; });
    if(T>=ouf) niv=1;
    if(T>=tBout){ bouteilleCraie(c,B.x,B.y,B.w,B.h,niv,EAU,zoom(T,tBout,.4)); graduer(c,B.x,B.y,B.w,B.h,10); }
    if(T>=tLitre) ecrire(c,'1 L',B.x,660,58*zoom(T,tLitre,.4),CRAIE.jaune);
    if(T<ouf){
      if(T>=tVerre) recipientCraie(c,'verre',V.x,V.y,V.w,V.h,.8,EAU,zoom(T,tVerre,.4));
      if(T>=tDl) ecrire(c,'1 dL',V.x,660,50*zoom(T,tDl,.4),CRAIE.jaune);
    }
    if(T<uni){
      if(T>=tSuffit) ecrire(c,'un seul ?',XR+40,300,76*zoom(T,tSuffit,.4),CRAIE.jaune);
    } else if(T<q){
      if(T>=tRate) ecrire(c,'raté !',XR+40,170,70*zoom(T,tRate,.4),CRAIE.faux);
      tC.forEach((t,k)=>{ if(T>=t) ecrire(c,String(k+1),XR-60+k*110,360,110*zoom(T,t,.4),CRAIE.blanc); });
      if(T>=tC[2]+.4) ecrire(c,'…',XR+40,470,90,CRAIE.gris);
    } else if(T>=ouf){ /* ouf : 10 dL = 1 L ; et la minuscule cuillère de 1 cL ? */
      if(T>=tOuf){ ecrire(c,'10 dL = 1 L',XR,170,66,CRAIE.ok); coche(c,B.x+90,140,.45); }
      if(T>=tCuil) cuillereCraie(c,XR-80,360,.8,EAU,zoom(T,tCuil,.4));
      if(T>=tCl) ecrire(c,'1 cL',XR+60,430,54*zoom(T,tCl,.4),CRAIE.jaune);
      if(T>=tTemps) ecrire(c,'?',XR+170,330,150*zoom(T,tTemps,.5),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Je remplis ma bouteille'),a0('de 1 litre')],[a0('avec mon petit verre'),a0('de 1 décilitre.')],
      [a0('Un seul verre suffit, non ?')]),
    ...suiteDe(q,60,62,[a1('Raté, il en faut encore !')],[a1('Je verse, et je compte :'),a1('1, 2, 3…')]),
    ...suiteDe(com,60,62,[a3('Ouf ! Et avec ma minuscule'),a3('cuillère de 1 centilitre ?')],[a3("Euh… j'ai le temps ?")]),
    ...suiteDe(f,60,60,[a4('À toi : combien de cuillères'),a4('de 1 centilitre')],[a4('pour remplir 1 litre ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de verres'),qd('de 1 décilitre'),qd('pour remplir la bouteille'),qd('de 1 litre ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('10 décilitres,'), r2=rd("c'est 1 litre."), r3=rd('La bouteille'), r4=rd('est pleine !');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="70" width="70" height="150" rx="10" fill="none" stroke="#dee2e6" stroke-width="5"/><rect x="46" y="200" width="58" height="15" fill="#4dabf7"/>`+
    `<rect x="62" y="44" width="26" height="26" fill="#2f9e44"/><path d="M130 160 L170 160 L163 220 L137 220 Z" fill="#4dabf7" stroke="#dee2e6" stroke-width="4"/>`+
    `<text x="255" y="185" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Un seul verre<br>pour 1 litre ?'+PARI,mini);
  return { clips,FIN,titre:'Un seul verre suffit ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['100 verres',tq('A'),tq('100')],['10 verres',tq('B'),tq('10')],['5 verres',tq('C'),tq('5')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tSuffit?g.montre():g.fier(); }
      else if(T<q){ T<tC[0]?g.oups():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tCuil?g.pouce():g.oups(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
