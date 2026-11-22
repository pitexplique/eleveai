/* ============================================================
   Série Masse CM2 — ÉPISODE 03 : UN GRAIN DE RIZ PÈSE-T-IL 1 GRAMME ? Outils : films/cm2-commun.js + cm2-masse.js.
   Le copain de Ti Margo dit qu'un grain de riz pèse 1 g : un paquet de 1 kg, ce serait 1 000 grains.
   On compte… 1 000, 10 000, 30 000… il en reste encore !
   Question : un grain de riz pèse environ… ? A, 0,02 g (environ 50 grains pour 1 g).
   Fin : on arrête de compter, on fait cuire le riz (la casserole fume).
   Commentaire : environ combien de grains dans un paquet de 1 kg ? Ceinture blanche.
   ⛔ 1 000 s'écrit avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['estimer']=function(outils){
  { /* un nombre dit en plusieurs marques identiques (« 0,02 » ×4) : autant de marques que de jetons écrits
       (« 1 000 » = un seul jeton) ; « 30 000 » est marqué « 30 », « 000 », « 000 », « 000 » : on garde « 30 » */
    const CL=window.CUES[VIDEO];
    for(const k in CL){ const res=[]; let n=0;
      CL[k].forEach((x,i)=>{ if(x[1].trim()==='000') return; n=(i>0&&CL[k][i-1][1]===x[1])?n+1:1;
        if(n<=x[1].trim().replace(/(\d)\s(\d{3})/g,'$1$2').split(/\s+/).length) res.push(x); });
      CL[k]=res; } }
  const DUR={'00-accroche':8.59,'01-compter':6.53,'02-question':13.42,'02b-reponse':9.02,'03-fin':3.86,'04-commentaire':6.93,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-compter':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cmp,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tGrain=mot('00-accroche','grain'), t1g=mot('00-accroche','1'), tPaquet=mot('00-accroche','paquet'),
        t1000=mot('00-accroche','000');
  const tC1=mot('01-compter','000'), tC2=mot('01-compter','10'), tC3=mot('01-compter','30'), tReste=mot('01-compter','reste');
  const tA=mot('02b-reponse','A');
  const tCuire=mot('03-fin','cuire');
  const tCombien=mot('04-commentaire','combien'), tPaq=mot('04-commentaire','paquet'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','Mon')-.08, SOL=590, XF=830;
  const SR={x:190,s:1.45};   /* le paquet de riz de 1 kg */

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : combien de grains dans 1 kg ? */
      sacRizCraie(c,300,SOL,1.35,zoom(T,com,.4),'Riz 1 kg');
      if(T>=tCombien){ grainRizM(c,XF-130,250,130,zoom(T,tCombien,.4),-.3); ecrire(c,'× ?',XF+40,275,96*zoom(T,tCombien,.4),CRAIE.jaune); }
      if(T>=tPaq) ecrire(c,'= 1 kg',XF,420,96*zoom(T,tPaq,.4),CRAIE.blanc);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : on arrête de compter, on fait cuire le riz */
      casseroleM(c,300,SOL,1.15,zoom(T,ouf,.5),T);
      ecrire(c,'1 grain',XF,150,72,CRAIE.blanc); ecrire(c,'≈ 0,02 g',XF,240,80,CRAIE.ok);
      ecrire(c,'50 grains',XF,370,72,CRAIE.blanc); ecrire(c,'≈ 1 g',XF,460,80,CRAIE.ok);
      if(T<tCuire) ecrire(c,'Stop !',300,140,90,CRAIE.faux);
      tab.maj(); return; }
    /* l'accroche et le comptage */
    if(T>=tPaquet) sacRizCraie(c,SR.x,SOL,SR.s,zoom(T,tPaquet,.4),'Riz 1 kg');
    if(T<cmp){
      if(T>=tGrain) grainRizM(c,640,250,210,zoom(T,tGrain,.4),-.25);
      if(T>=t1g) ecrire(c,'1 g ?',870,270,100*zoom(T,t1g,.4),CRAIE.jaune);
      if(T>=t1000) ecrire(c,N('= 1 000 grains ?'),650,480,76*zoom(T,t1000,.4),CRAIE.jaune);
    } else {
      /* on compte : le tas compté grandit, le compteur monte… et le paquet est toujours plein */
      const nT=T>=tC3?5:T>=tC2?4:T>=tC1?3:2;
      tasRizM(c,520,SOL,260,1,nT);
      if(T>=tC1) ecrire(c,N('1 000'),XF,150,80*zoom(T,tC1,.3),T>=tC2?CRAIE.gris:CRAIE.blanc);
      if(T>=tC2) ecrire(c,N('10 000'),XF,250,84*zoom(T,tC2,.3),T>=tC3?CRAIE.gris:CRAIE.blanc);
      if(T>=tC3) ecrire(c,N('30 000…'),XF,355,92*zoom(T,tC3,.3),CRAIE.jaune);
      if(T>=tReste) ecrire(c,'Il en reste !',XF,460,70*zoom(T,tReste,.4),CRAIE.faux);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-compter'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(cmp,60,60,[a0("Mon copain dit qu'un grain"),a0('de riz pèse 1 gramme.')],
      [a0('Alors un paquet de 1 kilogramme,'),a0(N("c'est 1 000 grains ?"))]),
    ...suiteDe(q,60,62,[a1('On compte…'),a1(N('1 000, 10 000, 30 000…'))],[a1('il en reste encore !')]),
    ...suiteDe(com,60,62,[a3('Bon… on arrête de compter,'),a3('et on fait cuire le riz !')]),
    ...suiteDe(f,60,60,[a4('À toi : environ combien de grains'),a4('dans un paquet de 1 kilogramme ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Un grain de riz'),qd('pèse environ…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Il faut environ'), r2=rd('50 grains'), r3=rd('pour 1 gramme.'),
    r4=rd('Un grain pèse environ'), r5=rd('0,02 gramme.');

  poserMiniature(outils,acc+1,'Un grain de riz :<br>combien de grammes ?'+PARI,
    ardoiseMini([['1 grain'],['= ? g','#ffd43b']]));
  return { clips,FIN,titre:'1 grain de riz = ? g',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cmp,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['0,02 g',tq('A'),tq('B')-.3],['2 g',tq('B'),tq('C')-.3],['1 g',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2,r3],suite:[r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tPaquet) g.montre();
      else if(T<cmp) g.reflechit();
      else if(T<q){ T<tReste?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tCuire?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
