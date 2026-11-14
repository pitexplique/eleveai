/* ============================================================
   Série Contenance CM1 — ÉPISODE 03 : LA PISCINE GONFLABLE. Outils : films/cm1-commun.js + cm1-contenance.js.
   Ti Margo remplit une piscine de 1000 L avec un verre de 25 cL. D'abord 1 L = 100 cL : 25 × 4 = 100,
   4 verres pour 1 litre (C)… donc 4000 verres pour la piscine ! Il prend le tuyau d'arrosage.
   Commentaire : combien de verres de 25 cL pour un seau de 10 L ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; les dessins à gauche (Ti Margo cache le bas du milieu) */
const PG={x:270,y:330,w:470,h:190}, VE={x:95,y:625,w:95,h:115};

FILMS['estimer']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':11.04,'01-litre':5.52,'02-question':15.32,'02b-reponse':11.09,'03-ouf':5.08,'04-commentaire':8.04,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tPisc=mot('00-accroche','piscine'), tVerre=mot('00-accroche','verre'), t25=mot('00-accroche','25'),
        t1000=mot('00-accroche','1000'), tVite=mot('00-accroche','vite'), tJe=mot('00-accroche','Je');
  const tSeul=mot('01-litre','seul'), t1L=mot('01-litre','1'), t100=mot('01-litre','100');
  const tC=mot('02b-reponse','C'), tR4000=mot('02b-reponse','4000');
  const tTuyau=mot('03-ouf','tuyau');
  const tSeau=mot('04-commentaire','seau'), t10=mot('04-commentaire','10'), tV25=mot('04-commentaire','25'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, XR=790;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un seau de 10 L, des verres de 25 cL */
      { const z=zoom(T,com+.1,.4); recipientCraie(c,'verre',130,600,100,130,.8,EAU,z); ecrire(c,'25 cL',130,665,54*z,CRAIE.jaune); }
      if(T>=tSeau) recipientCraie(c,'seau',380,600,200,190,.8,EAU,zoom(T,tSeau,.4));
      if(T>=t10) ecrire(c,'10 L',380,665,58*zoom(T,t10,.4),CRAIE.jaune);
      if(T>=tRep-.6) ecrire(c,'?',XR,380,240*zoom(T,tRep-.6,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* la piscine (1000 L) et le verre (25 cL) */
    const tuyau=T>=ouf&&T>=tTuyau;
    if(T>=tPisc) piscineCraie(c,PG.x,PG.y,PG.w,PG.h,zoom(T,tPisc,.4),tuyau?Math.min(1,(T-tTuyau)/2.5):0);
    if(T>=t1000) ecrire(c,'1000 L',PG.x,PG.y-150,70*zoom(T,t1000,.4),CRAIE.jaune);
    if(T>=tVerre) recipientCraie(c,'verre',VE.x,VE.y,VE.w,VE.h,.8,EAU,zoom(T,tVerre,.4));
    if(T>=t25) ecrire(c,'25 cL',VE.x,672,50*zoom(T,t25,.4),CRAIE.jaune);
    if(T<uni){
      if(T>=t25) ecrire(c,'un verre',XR,150,64*zoom(T,t25,.4),CRAIE.gris);
      if(T>=t25) ecrire(c,'de 25 cL…',XR,240,72*zoom(T,t25,.4),CRAIE.jaune);
      if(T>=t1000) ecrire(c,'pour 1000 L',XR,370,72*zoom(T,t1000,.4),CRAIE.jaune);
      if(T>=tVite) ecrire(c,'facile ?',XR,500,80*zoom(T,tVite,.4),CRAIE.faux);
    } else if(T<ouf){ /* d'abord un seul litre */
      if(T>=tSeul) bouteilleCraie(c,XR-170,560,110,220,.85,EAU,zoom(T,tSeul,.4));
      if(T>=t1L) ecrire(c,'1 L',XR+60,300,90*zoom(T,t1L,.4),CRAIE.jaune);
      if(T>=t100) ecrire(c,'= 100 cL',XR+60,420,72*zoom(T,t100,.4),CRAIE.ok);
    } else { /* la réponse : 4 verres pour 1 L… 4000 verres pour la piscine */
      ecrire(c,'25 × 4 = 100 cL',XR,110,60,CRAIE.ok); ecrire(c,'4 verres → 1 L',XR,200,60,CRAIE.ok);
      ecrire(c,'1000 L :',XR,305,66,CRAIE.jaune);
      ecrire(c,'4000 verres !',XR,400,78*zoom(T,ouf,.5),CRAIE.faux);
      if(T>=tTuyau){ const u=Math.min(1,(T-tTuyau)/.6); c.strokeStyle='#2f9e44'; c.lineWidth=16; c.lineCap='round'; c.beginPath();
        c.moveTo(1050,560); c.bezierCurveTo(900,640,620,600,PG.x+170+(1-u)*300,PG.y+30); c.stroke();
        ecrire(c,'le tuyau !',XR,525,70*zoom(T,tTuyau,.4),CRAIE.ok); } }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-litre'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Il fait chaud !')),
    ...suiteDe(uni,60,60,[a0('Je remplis la piscine gonflable')],[a0('avec mon verre'),a0('de 25 centilitres.')],
      [a0('Elle contient 1000 litres.'),a0('Ça va aller vite !')]),
    ...suiteDe(q,60,62,[a1("D'abord, un seul litre.")],[a1("1 litre, c'est"),a1('100 centilitres.')]),
    ...suiteDe(com,60,62,[a3('4000 verres ?!')],[a3('Bon… je prends'),a3("le tuyau d'arrosage.")]),
    ...suiteDe(f,60,60,[a4('À toi : combien de verres'),a4('de 25 centilitres')],[a4('pour remplir'),a4('un seau de 10 litres ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de verres'),qd('de 25 centilitres'),qd('pour remplir 1 litre ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('25 × 4 = 100 centilitres :'), r2=rd('4 verres pour 1 litre.'), r3=rd('Alors pour 1000 litres…'), r4=rd('4000 verres !');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<ellipse cx="115" cy="160" rx="90" ry="42" fill="#f783ac" stroke="#dee2e6" stroke-width="4"/><ellipse cx="115" cy="160" rx="70" ry="29" fill="#4dabf7"/>`+
    `<path d="M200 95 L236 95 L229 160 L207 160 Z" fill="#4dabf7" stroke="#dee2e6" stroke-width="4"/>`+
    `<text x="280" y="200" font-family="Segoe UI" font-weight="800" font-size="130" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1000 L au verre :<br>combien de verres ?'+PARI,mini);
  return { clips,FIN,titre:'La piscine… au verre ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['25 verres',tq('A'),tq('verres',2)],['40 verres',tq('B'),tq('verres',3)],['4 verres',tq('C'),tq('verres',4)]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tVite?g.montre():g.fier(); }
      else if(T<q){ T<t1L?g.reflechit():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():(T<tR4000?g.pouce():g.oups()); }
      else if(T<com){ T<tTuyau?g.oups():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
