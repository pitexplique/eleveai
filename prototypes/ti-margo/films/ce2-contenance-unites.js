/* ============================================================
   Série Contenance CE2 — ÉPISODE 01 : LA LIMONADE À LA RÈGLE. Outils : films/ce2-commun.js + ce2-contenance.js.
   Ti Margo mesure sa limonade avec une règle : « 20 centimètres de limonade ! » Oups : une règle mesure des
   longueurs ; la bouteille dit 1 litre. Question : quelle unité ? (B, le litre). Ceinture blanche.
   Commentaire : la plus petite unité, le litre, le décilitre ou le centilitre ?
   ============================================================ */
FILMS['unites']=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':9.43,'01-oups':8.53,'02-question':14.88,'02b-reponse':9.22,'03-ouf':4.05,'04-commentaire':8.19,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJai=mot('00-accroche',"J'ai"), tLimo=mot('00-accroche','limonade'), tRegle=mot('00-accroche','règle'),
        t20=mot('00-accroche','20');
  const tLong=mot('01-oups','longueurs'), tLiq=mot('01-oups','liquides'), tBout=mot('01-oups','bouteille'),
        t1L=mot('01-oups','litre');
  const tLr=mot('02b-reponse','litre'), tDl=mot('02b-reponse','décilitre'), tCl=mot('02b-reponse','centilitre');
  const tOuf1L=mot('03-ouf','litre'), tQui=mot('03-ouf','Qui');
  const tPetite=mot('04-commentaire','petite'), tLc=mot('04-commentaire','litre'), tDc=mot('04-commentaire','décilitre'),
        tCc=mot('04-commentaire','centilitre'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tJai-.08, XR=760, B={x:190,y:620,w:150,h:300};

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : L, dL, cL : la plus petite ? */
      if(T>=tPetite) ecrire(c,'la plus petite ?',528,140,62*zoom(T,tPetite,.4),CRAIE.jaune);
      if(T>=tLc) ecrire(c,'L',250,380,150*zoom(T,tLc,.5),CRAIE.blanc);
      if(T>=tDc) ecrire(c,'dL',528,380,150*zoom(T,tDc,.5),CRAIE.blanc);
      if(T>=tCc) ecrire(c,'cL',806,380,150*zoom(T,tCc,.5),CRAIE.blanc);
      tab.maj(); return; }
    /* la bouteille de limonade, à gauche */
    if(T>=tLimo) bouteilleCraie(c,B.x,B.y,B.w,B.h,.85,LIMONADE,zoom(T,tLimo,.4),'#f59f00');
    if(T<uni){
      if(T>=tRegle) regleCraie(c,B.x+150,B.y,330,zoom(T,tRegle,.4));
      if(T>=t20) ecrire(c,'20 cm',XR,280,110*zoom(T,t20,.4),CRAIE.faux);
      if(T>=t20+.6) ecrire(c,'de limonade ?',XR,410,58,CRAIE.gris);
    } else if(T<q){
      if(T<tBout) regleCraie(c,B.x+150,B.y,330,1);
      if(T>=tLong){ ecrire(c,'une règle :',XR,170,54,CRAIE.gris); ecrire(c,'des longueurs',XR,250,64*zoom(T,tLong,.4),CRAIE.blanc); }
      if(T>=tLiq){ ecrire(c,'pas les liquides !',XR,340,58*zoom(T,tLiq,.4),CRAIE.faux); }
      if(T>=t1L){ ecrire(c,'1 L',B.x,680,64*zoom(T,t1L,.4),CRAIE.jaune); ecrire(c,'1 litre',XR,500,96*zoom(T,t1L,.4),CRAIE.ok); }
    } else if(T<ouf){ /* la réponse : le litre, puis dL et cL pour les petites quantités */
      ecrire(c,'1 L',B.x,680,64,CRAIE.jaune);
      if(T>=tLr) ecrire(c,'L : le litre',XR,190,70*zoom(T,tLr,.4),CRAIE.ok);
      if(T>=tDl) ecrire(c,'dL : le décilitre',XR,340,54*zoom(T,tDl,.4),CRAIE.blanc);
      if(T>=tCl) ecrire(c,'cL : le centilitre',XR,450,54*zoom(T,tCl,.4),CRAIE.blanc);
    } else { /* ouf : ma limonade, 1 litre */
      if(T>=tOuf1L){ ecrire(c,'1 L',B.x,680,72*zoom(T,tOuf1L,.4),CRAIE.ok); coche(c,B.x+110,160,.5); }
      if(T>=tQui) ecrire(c,'Qui en veut ?',XR,300,70*zoom(T,tQui,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0("J'ai fait de la limonade.")],[a0("Combien j'en ai ?")],
      [a0('Je sors ma règle :'),a0('20 centimètres de limonade !')]),
    ...suiteDe(q,60,62,[a1('Hé ! Une règle mesure'),a1('des longueurs,')],[a1('pas des liquides.')],
      [a1('Sur ma bouteille,'),a1("c'est écrit : 1 litre.")]),
    ...suiteDe(com,60,62,[a3('Ma limonade : 1 litre.')],[a3('Qui en veut ?')]),
    ...suiteDe(f,60,60,[a4('À toi : la plus petite unité,')],[a4("c'est le litre,"),a4('le décilitre ou le centilitre ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Pour mesurer ce que contient'),qd('une bouteille, quelle unité ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Le litre mesure'), r2=rd('une contenance.'), r3=rd('Pour les petites quantités,'),
    r4=rd('il y a le décilitre et le centilitre.');
  const tB=mot('02b-reponse','B');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>`+
    `<rect x="40" y="80" width="64" height="140" rx="10" fill="#ffec99" stroke="#dee2e6" stroke-width="5"/><rect x="60" y="54" width="24" height="26" fill="#f59f00"/>`+
    `<rect x="120" y="60" width="26" height="160" fill="#fab005"/>`+
    `<text x="245" y="185" font-family="Segoe UI" font-weight="800" font-size="150" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'20 cm<br>de limonade ?'+PARI,mini);
  return { clips,FIN,titre:'La limonade à la règle',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le centimètre',tq('A'),tq('centimètre')],['le litre',tq('B'),tq('litre')],['le kilogramme',tq('C'),tq('kilogramme')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<t20?g.montre():g.fier(); }
      else if(T<q){ T<tLiq?g.oups():g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.montre(); }
      else if(T<com){ T<tQui?g.fier():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
