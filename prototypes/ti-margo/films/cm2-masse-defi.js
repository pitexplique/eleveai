/* ============================================================
   Série Masse CM2 — ÉPISODE 04 : DÉFI (le dernier de la série). Outils : films/cm2-commun.js + cm2-masse.js.
   Avec 4 copains (5 enfants de 35 kg) et le moniteur (85 kg), le copain prend le téléphérique : 0,4 t au plus.
   Sa copine sort sa calculatrice.
   Question : combien de kg reste-t-il ? B, 140 kg (0,4 t = 400 kg ; 5 × 35 + 85 = 260 ; 400 − 260 = 140).
   Fin : il reste de la place… pour le panier de pique-nique. Commentaire : combien d'enfants de 35 kg peuvent
   encore monter ? Ceinture blanche.
   ============================================================ */
FILMS['defi']=function(outils){
  { /* un nombre dit en plusieurs marques identiques (« 400 moins » ×3, « 260 » ×3, « 0,4 » ×3) :
       autant de marques que de jetons écrits */
    const CL=window.CUES[VIDEO];
    for(const k in CL){ const res=[]; let n=0;
      CL[k].forEach((x,i)=>{ n=(i>0&&CL[k][i-1][1]===x[1])?n+1:1;
        if(n<=x[1].trim().replace(/(\d)\s(\d{3})/g,'$1$2').split(/\s+/).length) res.push(x); });
      CL[k]=res; } }
  const DUR={'00-accroche':13.32,'01-calcul':3.03,'02-question':15.92,'02b-reponse':15.31,'03-fin':3.42,'04-commentaire':7.29,'05-abonne':6.05};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.8,'01-calcul':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cal,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const t04=mot('00-accroche','0,4'), t5=mot('00-accroche','5'),
        t35=mot('00-accroche','35'), tMoni=mot('00-accroche','moniteur'), t85=mot('00-accroche','85');
  const tCalc=mot('01-calcul','calculatrice');
  const tB=mot('02b-reponse','B');
  const tPique=mot('03-fin','pique-nique');
  const tEnf=mot('04-commentaire',"d'enfants"), tMonter=mot('04-commentaire','monter'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','On')-.08, SOL=590, XR=850, XT=365, ST=1.2;
  const ENF=[['#4dabf7','#3b2314','#c68642'],['#f06595','#111111','#8d5524'],['#69db7c','#a0522d','#f1c27d'],
             ['#ffd43b','#3b2314','#e0ac69'],['#b197fc','#111111','#8d5524']];

  /* les 5 enfants (35 kg) et le moniteur (85 kg) dans la cabine */
  function passagers(c,T,cab,depuis5=0,depuisM=0){
    if(T>=depuis5) ENF.forEach(([co,ch,pe],i)=>enfantM(c,cab.g+50+i*84,cab.sol,190,zoom(T,depuis5+i*.08,.3),co,ch,pe));
    if(T>=depuisM) enfantM(c,cab.d-68,cab.sol,265,zoom(T,depuisM,.4),'#fd7e14','#212529','#c68642'); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : combien d'enfants de 35 kg peuvent encore monter ? */
      const cab=telepheriqueM(c,XT,SOL,ST,zoom(T,com,.4),'0,4 t max'); passagers(c,T,cab,com,com);
      ecrire(c,'Il reste',XR,95,56,CRAIE.blanc); ecrire(c,'140 kg',XR,170,76,CRAIE.ok);
      if(T>=tEnf){ const z=zoom(T,tEnf,.4); enfantM(c,XR-70,SOL-10,230,z,'#ff8787');
        ecrire(c,'35 kg',XR+75,SOL-130,60*z,CRAIE.jaune); }
      if(T>=tMonter) ecrire(c,'Combien ?',XR+10,275,58*zoom(T,tMonter,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : il reste de la place… pour le pique-nique */
      const cab=telepheriqueM(c,XT,SOL,ST,1,'0,4 t max'); passagers(c,T,cab);
      ecrire(c,'140 kg',XR,125,100,CRAIE.ok); ecrire(c,'de libre !',XR,225,64,CRAIE.blanc);
      if(T>=tPique) panierPiqueM(c,XR,SOL-10,1.05,zoom(T,tPique,.4));
      tab.maj(); return; }
    /* l'accroche : le téléphérique, la pancarte, les 5 enfants, le moniteur ; puis la calculatrice */
    if(T>=finTitre){ const cab=telepheriqueM(c,XT,SOL,ST,zoom(T,finTitre,.4),T>=t04?'0,4 t max':'');
      passagers(c,T,cab,t5,tMoni); }
    if(T<cal){
      if(T>=t04) ecrire(c,'0,4 t',XR,120,100*zoom(T,t04,.4),CRAIE.faux);
      if(T>=t04) ecrire(c,'au plus',XR,215,60*zoom(T,t04+.3,.4),CRAIE.blanc);
      if(T>=t35) ecrire(c,'5 × 35 kg',XR,335,64*zoom(T,t35,.4),CRAIE.jaune);
      if(T>=t85) ecrire(c,'+ 85 kg',XR,440,64*zoom(T,t85,.4),CRAIE.jaune);
    } else {
      ecrire(c,'0,4 t',XR,105,80,CRAIE.faux);
      if(T>=tCalc) calculatriceM(c,XR,385,1.25,zoom(T,tCalc,.4),'?');
    }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-calcul'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(cal,60,60,[a0('On prend le téléphérique.'),a0('Il porte 0,4 tonne.')],
      [a0('Nous sommes 5 enfants'),a0('de 35 kilogrammes,')],[a0('avec un moniteur'),a0('de 85 kilogrammes.')]),
    ...suiteDe(q,60,62,[a1('Ma copine sort'),a1('sa calculatrice…')]),
    ...suiteDe(com,60,62,[a3('Il reste de la place…'),a3('pour le pique-nique !')]),
    ...suiteDe(f,60,60,[a4("À toi : combien d'enfants"),a4('de 35 kilogrammes'),a4('peuvent encore monter ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de kilogrammes'),qd('reste-t-il ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd("0,4 tonne, c'est"), r2=rd('400 kilogrammes.'), r3=rd('5 fois 35, plus 85 : 260.'),
    r4=rd('400 moins 260 : 140.');

  poserMiniature(outils,acc+1,'Le téléphérique porte 0,4 t :<br>il reste combien ?'+PARI,
    ardoiseMini([['0,4 t max'],['5 × 35 kg','#ffd43b'],['+ 85 kg','#ffd43b']]));
  return { clips,FIN,titre:'Le téléphérique de 0,4 t',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,cal,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['260 kg',tq('A'),tq('B')-.3],['140 kg',tq('B'),tq('C')-.3],['3,4 kg',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<t5) g.montre();
      else if(T<cal) g.fier();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.fier(); }
      else if(T<com){ T<tPique?g.montre():g.pouce(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
