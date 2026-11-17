/* ============================================================
   Série Masse CE2 — ÉPISODE 01 : PESER UN ÉLÉPHANT. Outils : films/ce2-commun.js + ce2-masse.js.
   Le copain de Ti Margo pose un éléphant sur la balance de cuisine : l'aiguille fait trois tours… crac !
   Question : pour peser un éléphant, on prend… le gramme, le litre, la tonne (C). Un éléphant ≈ 5 tonnes.
   Fin : la farine sur la balance de cuisine, l'éléphant sur la bascule du port.
   Commentaire : 1 tonne, c'est combien de kilogrammes ? Ceinture jaune.
   ============================================================ */
FILMS['unites']=function(outils){
  const DUR={'00-accroche':6.1,'01-crac':5.3,'02-question':12.78,'02b-reponse':7.83,'03-fin':6.9,'04-commentaire':6.12,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'01-crac':1.4,'02-question':3.3,'03-fin':1.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cr,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tMon=mot('00-accroche','Mon'), finTitre=mot('00-accroche','sur')-.08, tBal=mot('00-accroche','balance');
  const tFait=mot('01-crac','fait'), tCrac=mot('01-crac','crac'), tIl=mot('01-crac','Il');
  const tC=mot('02b-reponse','C');
  const tCuis=mot('03-fin','balance'), tFar=mot('03-fin','farine'), tEle=mot('03-fin',"L'éléphant"), tBasc=mot('03-fin','bascule');
  const t1t=mot('04-commentaire','1'), tKg=mot('04-commentaire','kilogrammes'), tRep=mot('04-commentaire','Réponds');
  const HAUT=95, SOL=600, BC={x:250,s:1.3}, EL={x0:780,s:1.3};

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1 tonne = ? kg */
      if(T>=t1t){ const z=zoom(T,t1t,.4); elephantM(c,530,590,1.15,z); ecrire(c,'1 t',350,150,120*z,CRAIE.blanc); }
      if(T>=tKg){ const z=zoom(T,tKg,.4); ecrire(c,'= ? kg',620,150,120*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : la farine sur la balance de cuisine, l'éléphant sur la bascule du port */
      if(T>=tCuis){ const z=zoom(T,tCuis,.4), top=balanceCuisineCraie(c,190,SOL,1.1,T>=tFar?.9*doux(entreM(T,tFar,tFar+.6)):0,z);
        if(T>=tFar){ sacCraie(c,190,top,165,160,zoom(T,tFar,.4),'#f8f9fa'); ecrire(c,'farine',190,top-66,38,'#212529');
          ecrire(c,'1 kg',190,HAUT+5,64*zoom(T,tFar+.4,.4),CRAIE.ok); } }
      if(T>=tEle){ const top=basculeCraie(c,600,SOL,430,T>=tBasc+.4?'5 t':'',zoom(T,tEle,.4));
        elephantM(c,600,top,1.25,zoom(T,tEle+.15,.4));
        if(T>=tBasc+.4) ecrire(c,'5 tonnes',600,HAUT+5,64*zoom(T,tBasc+.4,.4),CRAIE.ok); }
      tab.maj(); return; }
    /* la balance de cuisine et l'éléphant : l'éléphant monte, l'aiguille fait trois tours, crac ! */
    const u=doux(entreM(T,cr+.1,tFait)), tours=doux(entreM(T,tFait,tCrac))*Math.PI*6, casse=T>=tCrac?doux(entreM(T,tCrac,tCrac+.3)):0;
    const top=T>=tBal?balanceCuisineCraie(c,BC.x,SOL,BC.s,tours,zoom(T,tBal,.4),casse):SOL-260;
    const ex=EL.x0+(BC.x-EL.x0)*u, ey=SOL+(top-SOL)*u-Math.sin(u*Math.PI)*70;
    elephantM(c,ex,ey,EL.s,zoom(T,finTitre,.4),-1);
    if(T<cr){ if(T>=tBal+.5) ecrire(c,'?',BC.x,HAUT+10,120*zoom(T,tBal+.5,.4),CRAIE.jaune); }
    else if(T<q){
      if(T>=tFait&&T<tCrac){ const n=Math.min(3,Math.floor(tours/(2*Math.PI))+1); ecrire(c,n+(n>1?' tours':' tour'),860,HAUT+20,60,CRAIE.blanc); }
      if(T>=tCrac) ecrire(c,'CRAC !',800,HAUT+30,96*zoom(T,tCrac,.3),CRAIE.faux);
      if(T>=tIl) ecrire(c,'autre unité ?',800,HAUT+150,56*zoom(T,tIl,.4),CRAIE.jaune);
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-crac'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tMon-.08,330,66,a0('Salut !')),
    groupe(tMon-.08,finTitre,330,60,a0('Mon copain veut peser'),a0('un éléphant…')),
    ...suiteDe(cr,60,60,[a0('sur la balance'),a0('de la cuisine !')]),
    ...suiteDe(q,60,62,[a1("L'aiguille fait trois tours"),a1('et… crac !')],[a1('Il faut une autre unité.')]),
    ...suiteDe(com,60,60,[a3('La balance de cuisine,'),a3("c'est pour la farine.")],[a3("L'éléphant, c'est"),a3('la bascule du port !')]),
    ...suiteDe(f,60,60,[a4('À toi : 1 tonne,'),a4("c'est combien de kilogrammes ?")],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Pour peser un éléphant,'),qd('on prend…')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Un éléphant pèse'), r2=rd('environ 5 tonnes.'), r3=rd("La tonne, c'est pour"), r4=rd('les très lourds !');

  poserMiniature(outils,acc+1,'Peser un<br>éléphant ?'+PARI,ardoiseMini([['g ? kg ?'],['t ?','#ffd43b']]));
  return { clips,FIN,titre:'Peser un éléphant ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cr,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['le gramme',tq('A'),tq('gramme')],['le litre',tq('B'),tq('litre')],['la tonne',tq('C'),tq('tonne')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tCrac) g.montre();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.fier(); }
      else if(T<com){ T<tEle?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
