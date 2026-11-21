/* ============================================================
   Série Masse CM2 — ÉPISODE 02 : 0,5 kg, C'EST COMBIEN DE GRAMMES ? Outils : films/cm2-commun.js + cm2-masse.js.
   Ti Margo lit la recette du gâteau : « 0,5 kg de farine ». Son copain verse… 5 g ! « Une pincée ! »
   Question : 0,5 kg, c'est… ? A, 500 g (0,5 × 1 000 = 500 g, la moitié d'un kilogramme).
   Fin : la balance affiche 500 g, un vrai tas de farine ; « avec 5 g, un gâteau… pour une fourmi ! ».
   Commentaire : 1,75 kg, c'est combien de grammes ? Ceinture blanche.
   ⛔ 1 000 s'écrit avec une espace insécable (un seul jeton pour voixDe).
   ============================================================ */
FILMS['convertir']=function(outils){
  { /* un nombre dit en plusieurs marques identiques (« 0,5 » ×3, « 500 grammes » ×3) : autant de marques
       que de jetons écrits (« 1 000 » = un seul jeton) */
    const CL=window.CUES[VIDEO];
    for(const k in CL){ const res=[]; let n=0;
      CL[k].forEach((x,i)=>{ n=(i>0&&CL[k][i-1][1]===x[1])?n+1:1;
        if(n<=x[1].trim().replace(/(\d)\s(\d{3})/g,'$1$2').split(/\s+/).length) res.push(x); });
      CL[k]=res; } }
  const DUR={'00-accroche':10.16,'01-oups':3.38,'02-question':14.06,'02b-reponse':8.15,'03-fin':4.54,'04-commentaire':7.55,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.6,'01-oups':1.0,'02-question':3.3,'03-fin':1.4,'04-commentaire':2.2});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oups,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const NBSP=' ', N=x=>x.replace(/(\d) (\d{3})/g,'$1'+NBSP+'$2');

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();

  const tRecette=mot('00-accroche','recette'), t05=mot('00-accroche','0,5'), tFarine=mot('00-accroche','farine'),
        tCopain=mot('00-accroche','copain'), t5g=mot('00-accroche','5');
  const tPincee=mot('01-oups','pincée');
  const tA=mot('02b-reponse','A');
  const tGateau=mot('03-fin','gâteau'), tFourmi=mot('03-fin','fourmi');
  const t175=mot('04-commentaire','1,75'), tCombien=mot('04-commentaire','combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=mot('00-accroche','La')-.08, SOL=590, XR=835, XF=850;
  const SF={x:165,s:1.3}, BN={x:560,s:1.15};   /* le sac de farine, la balance électronique */

  function recette(T){ const c=tab.c;
    listeCraie(c,XR,185,330,270,[['Recette','#c92a2a',50],...(T>=t05?[['0,5 kg','#212529',72]]:[]),
      ...(T>=tFarine?[['de farine','#343a40',48]]:[])],zoom(T,tRecette,.4)); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi en commentaire : 1,75 kg de farine, combien de grammes ? */
      sacRizCraie(c,330,SOL,1.75,zoom(T,com,.4),'Farine');
      if(T>=t175) ecrire(c,'1,75 kg',XF,220,96*zoom(T,t175,.4),CRAIE.jaune);
      if(T>=tCombien) ecrire(c,'= ? g',XF,350,96*zoom(T,tCombien,.4),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la fin : 500 g, un vrai tas ; et le gâteau de 5 g… pour une fourmi */
      const py=balanceNumM(c,350,SOL,1.45,'500 g',1,1); tasFarineM(c,350,py,380,zoom(T,ouf,.5));
      ecrire(c,'0,5 kg',XF,120,72,CRAIE.blanc); ecrire(c,'=',XF,200,64,CRAIE.blanc); ecrire(c,'500 g',XF,280,80,CRAIE.ok);
      if(T>=tGateau) ecrire(c,'5 g ?',XF,370,80*zoom(T,tGateau,.4),CRAIE.faux);
      if(T>=tFourmi){ fourmiM(c,XF-40,SOL,2.4,zoom(T,tFourmi,.4)); gateauM(c,XF+105,SOL,.55,zoom(T,tFourmi,.4)); }
      tab.maj(); return; }
    /* l'accroche et l'oups : la recette, le sac, la balance… 5 g, une pincée */
    recette(T);
    if(T>=tFarine) sacRizCraie(c,SF.x,SOL,SF.s,zoom(T,tFarine,.4),'Farine');
    if(T>=tCopain){ const vu=T>=t5g, py=balanceNumM(c,BN.x,SOL,BN.s,vu?'5 g':'0 g',zoom(T,tCopain,.4),vu?1:0);
      if(vu) tasFarineM(c,BN.x,py,26,zoom(T,t5g,.3));
      if(T>=oups){ c.strokeStyle=CRAIE.faux; c.lineWidth=6; c.setLineDash([14,10]); c.beginPath(); c.ellipse(BN.x,py-8,80,50,0,0,7); c.stroke(); c.setLineDash([]); } }
    if(T>=t5g) ecrire(c,'5 g ?!',430,300,110*zoom(T,t5g,.4),CRAIE.faux);
    if(T>=tPincee) ecrire(c,'Une pincée !',BN.x,SOL+60,60*zoom(T,tPincee,.4),CRAIE.jaune);
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-fin'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,66,a0('Salut !')),
    ...suiteDe(oups,60,60,[a0('La recette du gâteau dit :'),a0('0,5 kilogramme de farine.')],[a0('Mon copain verse…'),a0('5 grammes !')]),
    ...suiteDe(q,60,62,[a1('5 grammes ?'),a1('Une pincée !')]),
    ...suiteDe(com,60,62,[a3('Avec 5 grammes, on aurait'),a3('fait un gâteau…')],[a3('pour une fourmi !')]),
    ...suiteDe(f,60,60,[a4('À toi : 1,75 kilogramme,'),a4("c'est combien de grammes ?")],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('0,5 kilogramme,'),qd("c'est…")];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd(N('0,5 × 1 000 =')), r2=rd('500 grammes.'), r3=rd("La moitié d'un"), r4=rd('kilogramme !');

  poserMiniature(outils,acc+1,'0,5 kg de farine :<br>combien de grammes ?'+PARI,
    ardoiseMini([['0,5 kg'],['= ?','#ffd43b'],['g']]));
  return { clips,FIN,titre:'0,5 kg = ? g',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,oups,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['500 g',tq('A'),tq('B')-.3],['5 g',tq('B'),tq('C')-.3],['50 g',tq('C'),tq('Mets')-.3]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[r3,r4] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<tCopain) g.montre();
      else if(T<q) g.oups();
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tA?g.ouvre():g.pouce(); }
      else if(T<com){ T<tFourmi?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
