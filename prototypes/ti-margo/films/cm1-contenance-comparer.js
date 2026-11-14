/* ============================================================
   Série Contenance CM1 — ÉPISODE 01 : QUI A LE PLUS DE JUS ? Outils : films/cm1-commun.js + cm1-contenance.js.
   Ma sœur a une bouteille de 1 L, moi de 75 cL. « 75, c'est bien plus que 1 : j'ai gagné ! »
   Ma sœur rigole : 1 L = 100 cL. 100 cL contre 75 cL : ma sœur a 25 cL de plus (B).
   Commentaire : un bidon de 3 L et une bassine de 250 cL. Lequel contient le plus ?
   ============================================================ */
/* L'ardoise fait 1056 × 720 ; les bouteilles à gauche (Ti Margo cache le bas du milieu), 2,6 px par cL */
const BS={x:150,y:600,w:130,h:260}, BM={x:360,y:600,w:130,h:195};

FILMS['comparer']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':13.91,'01-unite':6.37,'02-question':12.73,'02b-reponse':8.09,'03-ouf':3.3,'04-commentaire':10.38,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tBout=mot('00-accroche','bouteille'), tSienne=mot('00-accroche','sienne'), t1L=mot('00-accroche','1 litre'),
        tMienne=mot('00-accroche','mienne'), t75=mot('00-accroche','75'), t75b=mot('00-accroche','75',2),
        tGagne=mot('00-accroche','gagné'), tOn=mot('00-accroche','on');
  const tUnites=mot('01-unite','unités'), t1Lu=mot('01-unite','1 litre'), t100=mot('01-unite','100');
  const tContre=mot('02b-reponse','contre'), t25=mot('02b-reponse','25');
  const tBon=mot('03-ouf','Bon'), tDessin=mot('03-ouf','dessin');
  const tBidon=mot('04-commentaire','bidon'), t3L=mot('04-commentaire','3 litres'), tBass=mot('04-commentaire','bassine'),
        t250=mot('04-commentaire','250'), tLeq=mot('04-commentaire','Lequel'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tOn-.08, XR=790;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un bidon de 3 L, une bassine de 250 cL */
      if(T>=tBidon) recipientCraie(c,'bidon',190,600,170,330,.85,EAU,zoom(T,tBidon,.4));
      if(T>=t3L) ecrire(c,'3 L',190,660,58*zoom(T,t3L,.4),CRAIE.jaune);
      if(T>=tBass) recipientCraie(c,'bassine',430,600,250,150,.8,EAU,zoom(T,tBass,.4));
      if(T>=t250) ecrire(c,'250 cL',430,660,58*zoom(T,t250,.4),CRAIE.jaune);
      if(T>=tLeq) ecrire(c,'?',XR,380,240*zoom(T,tLeq,.6),CRAIE.jaune);
      tab.maj(); return; }
    /* les deux bouteilles : la sienne (1 L), la mienne (75 cL) */
    if(T>=tBout){ const z=zoom(T,tBout,.4); bouteilleCraie(c,BS.x,BS.y,BS.w,BS.h,.85,JUS,z); bouteilleCraie(c,BM.x,BM.y,BM.w,BM.h,.85,JUS,z,'#1971c2'); }
    if(T>=tSienne) ecrire(c,'ma sœur',BS.x,110,40*zoom(T,tSienne,.4),CRAIE.gris);
    if(T>=tMienne) ecrire(c,'moi',BM.x,240,40*zoom(T,tMienne,.4),CRAIE.gris);
    const unite=T>=t100&&T<com;
    if(T>=t1L) ecrire(c,unite?'100 cL':'1 L',BS.x,660,(unite?50:58)*(unite?zoom(T,t100,.4):zoom(T,t1L,.4)),unite?CRAIE.ok:CRAIE.jaune);
    if(T>=t75) ecrire(c,'75 cL',BM.x,660,50*zoom(T,t75,.4),CRAIE.jaune);
    if(T<uni){
      if(T>=t75b){ ecrire(c,'75',XR-90,300,110*zoom(T,t75b,.4),CRAIE.faux); }
      if(T>=t75b+.9){ ecrire(c,'>',XR,300,90,CRAIE.blanc); ecrire(c,'1',XR+90,300,110,CRAIE.faux); }
      if(T>=tGagne) ecrire(c,"j'ai gagné ?",XR,470,58*zoom(T,tGagne,.4),CRAIE.gris);
    } else if(T<ouf){
      if(T>=tUnites) ecrire(c,'les unités !',XR,200,58*zoom(T,tUnites,.4),CRAIE.faux);
      if(T>=t1Lu) ecrire(c,'1 L',XR-120,330,78*zoom(T,t1Lu,.4),CRAIE.jaune);
      if(T>=t100) ecrire(c,'= 100 cL',XR+70,330,78*zoom(T,t100,.4),CRAIE.ok);
    } else { /* la réponse : 100 cL contre 75 cL, ma sœur a 25 cL de plus */
      ecrire(c,'100 cL',XR,200,72,CRAIE.ok); ecrire(c,'>',XR,290,72,CRAIE.blanc); ecrire(c,'75 cL',XR,380,72,CRAIE.jaune);
      ecrire(c,'+ 25 cL',XR,500,64*zoom(T,ouf,.4),CRAIE.ok);
      coche(c,BS.x-60,140,.5); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-unite'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Ma sœur et moi,')),
    ...suiteDe(uni,60,60,[a0('on a chacun'),a0('une bouteille de jus.')],
      [a0('La sienne : 1 litre.'),a0('La mienne : 75 centilitres.')],[a0("75, c'est bien plus que 1 :"),a0("j'ai gagné !")]),
    ...suiteDe(q,60,62,[a1('Ma sœur rigole :'),a1('regarde les unités !')],[a1("1 litre, c'est"),a1('100 centilitres.')]),
    ...suiteDe(com,60,62,[a3('Bon… je lui échange'),a3('contre un beau dessin ?')]),
    ...suiteDe(f,60,60,[a4('À toi : un bidon'),a4('de 3 litres,')],[a4('et une bassine'),a4('de 250 centilitres.')],
      [a4('Lequel contient'),a4('le plus ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui a le plus de jus ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('100 centilitres'), r2=rd('contre 75 centilitres :'), r3=rd('ma sœur a'), r4=rd('25 centilitres de plus.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="70" width="60" height="140" rx="10" fill="#ff922b" stroke="#dee2e6" stroke-width="5"/><rect x="58" y="44" width="24" height="26" fill="#2f9e44"/>`+
    `<rect x="130" y="110" width="60" height="100" rx="10" fill="#ff922b" stroke="#dee2e6" stroke-width="5"/><rect x="148" y="86" width="24" height="24" fill="#1971c2"/>`+
    `<text x="265" y="190" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'1 L ou 75 cL :<br>qui a le plus ?'+PARI,mini);
  return { clips,FIN,titre:'Qui a le plus de jus ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['moi, Ti Margo',tq('A',2),tq('Margo')],['ma sœur',tq('B'),tq('sœur')],["c'est pareil",tq('C'),tq('pareil')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<tGagne?g.montre():g.fier(); }
      else if(T<q){ T<tUnites?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.oups(); }
      else if(T<com){ T<tDessin?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
