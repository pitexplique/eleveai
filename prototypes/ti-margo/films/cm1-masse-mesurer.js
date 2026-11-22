/* ============================================================
   Série Masse CM1 — ÉPISODE 02 : LIRE LA BALANCE. Outils : films/cm1-commun.js + cm1-masse.js.
   Ti Margo pèse sa pastèque : l'aiguille s'arrête pile au milieu de 2 et 3 kg. Le copain lit le nombre le
   plus proche : « 3 kg ! ». Question : combien pèse la pastèque ? 2 kg 500 g (A), soit 2 500 g.
   Fin : « Bien lu ! », on la mange (tranches). Commentaire : au milieu de 1 et 2 kg, combien de grammes ?
   Ceinture blanche. ⛔ 2 500 s'écrit avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['mesurer']=function(outils){
  deuxAuPlusM();
  const DUR={'00-accroche':8.12,'01-oups':4.42,'02-question':15.17,'02b-reponse':8.50,'03-fin':3.90,'04-commentaire':8.33,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-oups':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tJe=mot('00-accroche','Je'), tPast=mot('00-accroche','pastèque'), tAig=mot('00-accroche',"L'aiguille"),
        t2=mot('00-accroche','2'), t3=mot('00-accroche','3'), tMil=mot('00-accroche','milieu');
  const tProche=mot('01-oups','proche'), t3k=mot('01-oups','3');
  const tA=mot('02b-reponse','A');
  const tLu=mot('03-fin','lu'), tMange=mot('03-fin','mange');
  const tMilC=mot('04-commentaire','milieu'), t1=mot('04-commentaire','1'), tG=mot('04-commentaire','grammes'),
        tRep=mot('04-commentaire','Réponds');
  const finTitre=tJe-.08, SOL=590, XR=835;
  const B={x:330,R:168};   /* la balance de cuisine à cadran */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : un melon, l'aiguille au milieu de 1 et 2 kg */
      const v=1.5*doux(entreM(T,t1,t1+1.0));
      const yP=balanceAiguilleM(c,B.x,SOL,B.R,v,zoom(T,com,.4));
      melonM(c,B.x,yP,.95,zoom(T,com+.2,.4));
      if(T>=tMilC) ecrire(c,'au milieu de',XR,170,64*zoom(T,tMilC,.4),CRAIE.blanc);
      if(T>=t1) ecrire(c,'1 et 2 kg',XR,275,84*zoom(T,t1,.4),CRAIE.blanc);
      if(T>=tG) ecrire(c,'? g',XR,420,130*zoom(T,tG,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : bien lu, 2 kg 500 g = 2 500 g ; puis on la mange */
      const yP=balanceAiguilleM(c,B.x,SOL,B.R,2.5,1,[2,2.5]);
      if(T<tMange) pastequeM(c,B.x,yP,.85);
      else { const z=zoom(T,tMange,.4); trancheM(c,B.x-95,yP,1.05,z,-.12); trancheM(c,B.x+95,yP,1.05,z,.12); }
      ecrire(c,'2 kg 500 g',XR,170,84,CRAIE.ok);
      if(T>=ouf+.5) ecrire(c,N('= 2 500 g'),XR,285,84*zoom(T,ouf+.5,.4),CRAIE.ok);
      if(T>=tLu) ecrire(c,'Bien lu !',XR,420,88*zoom(T,tLu,.4),CRAIE.jaune);
      if(T>=tMange) ecrire(c,'Miam !',XR,540,70*zoom(T,tMange,.4),CRAIE.gris);
      tab.maj(); return; }
    /* l'accroche : la pastèque sur la balance, l'aiguille s'arrête entre 2 et 3 ; puis le copain lit « 3 kg » */
    const v=2.5*doux(entreM(T,tAig,tAig+1.2));
    const yP=balanceAiguilleM(c,B.x,SOL,B.R,v,zoom(T,finTitre,.4),T>=tMil?[2,3]:null);
    if(T>=tPast) pastequeM(c,B.x,yP,.85,zoom(T,tPast,.4));
    if(T>=t2) ecrire(c,'entre 2 kg',XR,150,76*zoom(T,t2,.4),CRAIE.blanc);
    if(T>=t3) ecrire(c,'et 3 kg',XR,250,76*zoom(T,t3,.4),CRAIE.blanc);
    if(T>=tMil) ecrire(c,'pile au milieu',XR,350,62*zoom(T,tMil,.4),CRAIE.jaune);
    if(T>=tProche) ecrire(c,'le plus proche :',XR,455,56*zoom(T,tProche,.4),CRAIE.faux);
    if(T>=t3k) ecrire(c,'3 kg ?!',XR,555,100*zoom(T,t3k,.4),CRAIE.faux);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(oup,60,60,[a0('Je pèse ma pastèque.')],[a0("L'aiguille s'arrête"),a0('entre 2 et 3 kilogrammes,')],
      [a0('pile au milieu.')]),
    ...suiteDe(q,60,62,[a1('Mon copain lit le nombre'),a1('le plus proche :')],[a1('3 kilogrammes !')]),
    ...suiteDe(com,60,62,[a3('Bien lu !')],[a3('Et maintenant…'),a3('on la mange !')]),
    ...suiteDe(f,60,60,[a4("À toi : l'aiguille est"),a4('au milieu de 1 et 2 kilogrammes.')],[a4('Combien de grammes ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien pèse'),qd('la pastèque ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Au milieu de 2 et 3 kilogrammes :'), r2=rd('2 kilogrammes 500 grammes,'),
    r3=rd(N('soit 2 500 grammes.'));

  poserMiniature(outils,acc+1,'Combien pèse<br>la pastèque ?'+PARI,
    ardoiseMini([['2 kg'],['ou','#ffd43b'],['3 kg ?']]));
  return { clips,FIN,titre:'La pastèque pèse… ?',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2 kg 500 g',tq('A'),tq('B')-.3],['3 kg',tq('B'),tq('C')-.3],['2 kg 300 g',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<oup) g.montre();
      else if(T<q){ T<t3k?g.reflechit():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tMange?g.fier():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
