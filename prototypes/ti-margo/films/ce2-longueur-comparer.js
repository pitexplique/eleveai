/* ============================================================
   Série Longueurs CE2 — ÉPISODE 04 : LE GECKO ET MOI. Outils : films/ce2-commun.js + ce2-longueur.js.
   Le gecko mesure 1 dm, Ti Margo 9 cm : « 9 est plus grand que 1 ! » Oups : 1 dm = 10 cm, 10 contre 9.
   Question : 1 m ou 90 cm, qui est le plus long ? (B, 1 m). Ceinture jaune.
   Commentaire : 2 m ou 150 cm, qui est le plus long ?
   ============================================================ */
FILMS['comparer']=function(outils){
  fusionnerNombres(); deuxAuPlus();
  const DUR={'00-accroche':10.88,'01-oups':8.18,'02-question':15.41,'02b-reponse':7.6,'03-ouf':5.52,'04-commentaire':7.27,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,uni,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), tGecko=mot('00-accroche','gecko'), t1dm=mot('00-accroche','décimètre'), tMoi=mot('00-accroche','Moi'),
        t9=mot('00-accroche','9'), t9est=mot('00-accroche','grand'), tMoiL=mot('00-accroche','moi');
  const t1dmb=mot('01-oups','décimètre'), t10=mot('01-oups','10'), t10c=mot('01-oups','contre'), tLui=mot('01-oups','lui');
  const tBat=mot('03-ouf','centimètre'), tVite=mot('03-ouf','vite');
  const t2m=mot('04-commentaire','2'), t150=mot('04-commentaire','150'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tMon-.08, XG=80, PAS=36, XR=800;

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 2 m ou 150 cm ? */
      ecrire(c,'le plus long ?',528,150,70,CRAIE.jaune);
      if(T>=t2m) ecrire(c,'2 m',300,380,140*zoom(T,t2m,.5),CRAIE.blanc);
      if(T>=t2m) ecrire(c,'ou',528,380,70,CRAIE.gris);
      if(T>=t150) ecrire(c,'150 cm',790,380,120*zoom(T,t150,.5),CRAIE.blanc);
      tab.maj(); return; }
    /* le gecko en haut, Ti Margo (en vert) dessous : chacun avec sa longueur */
    if(T>=tGecko) geckoCraie(c,XG+5*PAS,150,10*PAS,'#b197fc',zoom(T,tGecko,.4));
    if(T>=tMoi) geckoCraie(c,XG+4.5*PAS,330,9*PAS,QUEUE,zoom(T,tMoi,.4));
    if(T<uni){
      if(T>=t1dm) ecrire(c,'1 dm',XR,150,96*zoom(T,t1dm,.4),'#b197fc');
      if(T>=t9) ecrire(c,'9 cm',XR,330,96*zoom(T,t9,.4),QUEUE);
      if(T>=t9est) ecrire(c,'9 > 1 : moi !',528,500,80*zoom(T,t9est,.4),CRAIE.faux);
    } else if(T<q){
      ecrire(c,'9 cm',XR,330,96,QUEUE);
      if(T>=t1dmb) ecrire(c,'1 dm = 10 cm',XR-30,150,72*zoom(T,t1dmb,.4),'#b197fc');
      if(T>=t10){ cordeCraie(c,XG,215,10*PAS,'#b197fc',entreL(T,t10,t10+.4),14); }
      if(T>=t10c){ cordeCraie(c,XG,395,9*PAS,QUEUE,entreL(T,t10c,t10c+.4),14); ecrire(c,'10 > 9',528,500,96*zoom(T,t10c,.4),CRAIE.ok); }
      if(T>=tLui) cercle(c,XG+5*PAS,150,190,CRAIE.ok,entreL(T,tLui,tLui+.3));
    } else { /* ouf : il me bat d'un centimètre */
      cordeCraie(c,XG,215,10*PAS,'#b197fc',1,14); cordeCraie(c,XG,395,9*PAS,QUEUE,1,14);
      if(T>=tBat){ coteH(c,XG+9*PAS,XG+10*PAS+40,470,'',CRAIE.jaune); ecrire(c,"1 cm d'écart",XR,300,72*zoom(T,tBat,.4),CRAIE.jaune); }
      if(T>=tVite) ecrire(c,'mais je cours vite !',XR-40,450,52*zoom(T,tVite,.4),CRAIE.ok);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(uni,60,60,[a0('Mon copain le gecko'),a0('mesure 1 décimètre.')],[a0('Moi, 9 centimètres.')],
      [a0('9 est plus grand que 1 :'),a0("c'est moi le plus long !")]),
    ...suiteDe(q,60,62,[a1('Hé, attends…')],[a1('1 décimètre,'),a1("c'est 10 centimètres.")],
      [a1('10 contre 9 :'),a1("c'est lui le plus long !")]),
    ...suiteDe(com,60,62,[a3("Bon, il me bat d'un centimètre.")],[a3('Mais moi, je cours plus vite !')]),
    ...suiteDe(f,60,60,[a4('À toi : qui est le plus long,')],[a4('2 mètres ou 150 centimètres ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Qui est le plus long :'),qd('1 mètre, ou 90 centimètres ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("1 mètre, c'est 100 centimètres."), r2=rd('100 est plus grand que 90.');
  const tB=mot('02b-reponse','B');

  const mini=ardoiseMini([['1 dm','#b197fc'],['ou 9 cm ?','#69db7c']]);
  poserMiniature(outils,acc+1,'1 dm ou 9 cm :<br>le plus long ?'+PARI,mini);
  return { clips,FIN,titre:'Le gecko et moi',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,uni,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['90 centimètres',tq('A'),tq('90',3)],['1 mètre',tq('B'),tq('1',3)],["c'est pareil",tq('C'),tq('pareil')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<uni){ T<t9est?g.montre():g.fier(); }
      else if(T<q){ T<tLui?g.reflechit():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.montre(); }
      else if(T<com){ T<tVite?g.oups():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
