/* ============================================================
   Série Masse CM1 — ÉPISODE 05 : DÉFI. Outils : films/cm1-commun.js + cm1-masse.js.
   Avec ses copains (40, 45 et 35 kg), le copain prend l'ascenseur : 300 kg au plus. Sa copine veut monter le piano (200 kg).
   Question : peut-on monter avec le piano ? A (non, 320 kg, c'est trop).
   Fin : le piano prend l'ascenseur tout seul, et eux l'escalier. Commentaire : combien de kg en trop ? Ceinture blanche.
   ============================================================ */
FILMS['defi']=function(outils){
  { /* un nombre dit en plusieurs marques identiques (« 45 et 35 » ×4) : autant de marques que de mots écrits */
    const CL=window.CUES[VIDEO];
    for(const k in CL){ const res=[]; let n=0;
      CL[k].forEach((x,i)=>{ n=(i>0&&CL[k][i-1][1]===x[1])?n+1:1; if(n<=x[1].trim().split(/\s+/).length) res.push(x); });
      CL[k]=res; } }
  const DUR={'00-accroche':12.52,'01-piano':5.19,'02-question':17.36,'02b-reponse':10.74,'03-fin':4.68,'04-commentaire':6.65,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-piano':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pia,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tAvec=mot('00-accroche','Avec'), tAsc=mot('00-accroche',"l'ascenseur"), t300=mot('00-accroche','300',2),
        tPlus=mot('00-accroche','plus'), tNous=mot('00-accroche','Nous'), t40=mot('00-accroche','40'),
        t45=mot('00-accroche','45'), t35=mot('00-accroche','35',3);
  const tPiano=mot('01-piano','piano'), tDeux=mot('01-piano','200');
  const tA=mot('02b-reponse','A');
  const tSeul=mot('03-fin','seul'), tNous3=mot('03-fin','nous'), tEsc=mot('03-fin',"l'escalier");
  const tTrop=mot('04-commentaire','trop'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tAvec-.08, SOL=590, XR=800;
  const AX=275;                                   /* l'ascenseur : au milieu de la partie gauche */
  const COP=[[160,245,'#4dabf7','40',t40],[275,270,'#f06595','45',t45],[390,235,'#69db7c','35',t35]];

  function copains(c,T,z=1,chiffres=true){
    for(const [x,h,coul,n,t] of COP){ enfantM(c,x,SOL-4,h,z,coul);
      if(chiffres&&T>=t) ecrire(c,n,x,SOL-h-40,64*zoom(T,t,.4),CRAIE.jaune); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : combien de kg en trop ? */
      ascenseurM(c,AX,SOL,1,zoom(T,com,.4)); copains(c,T,zoom(T,com,.4));
      pianoM(c,XR,SOL,1.2,zoom(T,com,.4)); ecrire(c,'200 kg',XR,SOL-165,52,CRAIE.jaune);
      if(T>=tTrop) ecrire(c,'En trop :',XR,110,80*zoom(T,tTrop,.4),CRAIE.blanc);
      if(T>=tTrop) ecrire(c,'? kg',XR,215,110*zoom(T,tTrop+.3,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : le piano monte seul, les copains prennent l'escalier */
      ascenseurM(c,AX,SOL,1,1); pianoM(c,AX,SOL-4,1.25,1);
      if(T>=tSeul) ecrire(c,'tout seul !',AX,SOL-345,56*zoom(T,tSeul,.4),CRAIE.ok);
      if(T>=tNous3){ const z=zoom(T,tNous3,.4), m=escalierM(c,560,SOL,440,400,5,z);
        COP.forEach(([x,h,coul],i)=>{ const [ex,ey]=m(i); enfantM(c,ex,ey,h*.75,z,coul); }); }
      if(T>=tEsc) ecrire(c,"l'escalier !",XR,85,72*zoom(T,tEsc,.4),CRAIE.jaune);
      tab.maj(); return; }
    /* l'accroche : l'ascenseur « 300 kg max », les trois copains, puis le piano de 200 kg */
    if(T>=finTitre){
      const z=zoom(T,finTitre,.4); ascenseurM(c,AX,SOL,1,z,T>=t300?'300 kg max':'');
      if(T>=tNous) copains(c,T,zoom(T,tNous,.4));
    }
    if(T>=t300) ecrire(c,'300 kg',XR,120,110*zoom(T,t300,.4),CRAIE.faux);
    if(T>=tPlus) ecrire(c,'au plus',XR,215,64*zoom(T,tPlus,.4),CRAIE.blanc);
    if(T>=tPiano){ pianoM(c,XR,SOL,1.4,zoom(T,tPiano,.4));
      if(T>=tDeux) ecrire(c,'200 kg',XR,SOL-195,60*zoom(T,tDeux,.4),CRAIE.jaune); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-piano'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(pia,60,60,[a0('Avec mes copains,'),a0("on prend l'ascenseur.")],[a0('Il porte 300 kilogrammes'),a0('au plus.')],
      [a0('Nous : 40,'),a0('45 et 35 kilogrammes.')]),
    ...suiteDe(q,60,62,[a1('Ma copine dit :'),a1('on monte aussi le piano,')],[a1('il pèse 200 kilogrammes !')]),
    ...suiteDe(com,60,62,[a3("Le piano prend l'ascenseur"),a3('tout seul…')],[a3("et nous, l'escalier !")]),
    ...suiteDe(f,60,60,[a4('À toi : combien'),a4('de kilogrammes en trop,'),a4('avec le piano ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Peut-on monter avec le piano ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('40 plus 45 plus 35 :'), r2=rd('120 kilogrammes.'), r3=rd('Plus 200 : 320,'), r4=rd("c'est plus que 300 !");

  poserMiniature(outils,acc+1,"Le piano dans l'ascenseur :<br>ça passe ?"+PARI,
    ardoiseMini([['300 kg max'],['+ piano','#ffd43b'],['200 kg']]));
  return { clips,FIN,titre:"Le piano dans l'ascenseur ?",ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,pia,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['non, 320 kg : trop',tq('A'),tq('B')-.3],['oui, il reste de la place',tq('B'),tq('C')-.3],['oui, 300 kg tout juste',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tNous) g.montre();
      else if(T<pia) g.fier();
      else if(T<q){ T<tDeux?g.montre():g.oups(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.fier(); }
      else if(T<com){ T<tEsc?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
