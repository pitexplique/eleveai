/* ============================================================
   ÉPISODE 05 : VÉRIFIER, ÇA SAUVE. Ti Margo pose 615 − 278 et trouve 347, « sûr de lui ». Il vérifie par
   l'addition : 347 + 278 = 625, ce n'est pas 615. La bonne soustraction (je casse une dizaine, puis une
   centaine) donne 337, et 337 + 278 = 615 : vérifier l'a sauvé.
   Outils : films/calcul-pose.js (poser, gestes, cadrer, fusionnerNombres…).
   ============================================================ */

/* Les grands nombres sont dits en plusieurs instants identiques (« 615 moins » ×4) : un seul mot dit,
   donc on garde les 2 premiers (la paire que voixDe sait lire). Propre à cet épisode : en 03, « 20 boîtes »
   ×4, ce sont DEUX « 20 boîtes » dits. */
function limiterRepetitions(){ const CL=(window.CUES||{})[VIDEO]||{};
  for(const k in CL){ const l=CL[k], res=[]; let n=0;
    for(const x of l){ const der=res[res.length-1];
      if(der&&der[1]===x[1]&&x[1].trim().includes(' ')){ if(++n>=2) continue; } else n=0;
      res.push(x); }
    CL[k]=res; } }

FILMS.verifier=function(outils){
  fusionnerNombres(); limiterRepetitions();
  const DUR={'00-accroche':12.16,'01-verif':12.54,'02-question':16.61,'02b-reponse':16.07,'03-ouf':9.08,'04-commentaire':10.89,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les instants */
  const t615=mot('00-accroche','615'), t278=mot('00-accroche','278'), t347=mot('00-accroche','347'),
        tSur=mot('00-accroche','sûr'), tParie=mot('00-accroche','paries'), tPose=mot('00-accroche','posé');
  const tV=mot('01-verif','vérifie'), tV347=mot('01-verif','347'), tV278=mot('01-verif','278'), tV625=mot('01-verif','625'),
        tV615=mot('01-verif','615'), tPb=mot('01-verif','problème');
  const tO337=mot('03-ouf','337'), tO278=mot('03-ouf','278'), tO615=mot('03-ouf','615'), tOuf=mot('03-ouf','Ouf');
  const t403=mot('04-commentaire','403'), t156=mot('04-commentaire','156'), t357=mot('04-commentaire','357'),
        tQuel=mot('04-commentaire','Quel'), tRep=mot('04-commentaire','Réponds');
  const tFinT=t615-.08;

  const XU=W/2+200, Y0=165, PW=150, PH=150; /* la pose au milieu de l'ardoise, le verdict à gauche */
  const pose=(c,o)=>poser(c,Object.assign({xu:XU,y0:Y0,w:PW,h:PH,ft:128,n:3,entetes:false},o));

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 403 − 156 = 357 ? La réponse reste à l'élève */
      const p=pose(c,{lignes:[{txt:'403',z:T>=t403?zoom(T,t403):0},{txt:'156',z:T>=t156?zoom(T,t156):0}],signe:T>=t156?'−':'',
        barre:T>=t156?1:0,res:{txt:'357',z:T>=t357?zoom(T,t357):0,coul:CRAIE.blanc}});
      if(T>=tQuel) ecrire(c,'?',XU+PW*.95,p.yRes,120*zoom(T,tQuel,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la preuve : 337 + 278 = 615 */
      const p=pose(c,{lignes:[{txt:'337',z:T>=tO337?zoom(T,tO337,.4):0},{txt:'278',z:T>=tO278?zoom(T,tO278,.4):0}],signe:T>=tO278?'+':'',
        barre:T>=tO278?1:0,res:{txt:'615',z:T>=tO615?zoom(T,tO615,.4):0,coul:CRAIE.ok}});
      if(T>=tO615) ecrire(c,'= 615',170,p.yRes,84*zoom(T,tO615,.4),CRAIE.ok);
      if(T>=tOuf) coche(c,XU+PW*.72,p.yRes,.6);
      tab.maj(); return; }
    if(T>=ver){ /* la vérification : 347 + 278 = 625, pas 615 */
      const p=pose(c,{lignes:[{txt:'347',z:T>=tV347?zoom(T,tV347,.4):0},{txt:'278',z:T>=tV278?zoom(T,tV278,.4):0}],signe:T>=tV278?'+':'',
        barre:T>=tV278?1:0,res:{txt:'625',z:T>=tV625?zoom(T,tV625,.4):0,coul:T>=tV615?CRAIE.faux:CRAIE.blanc}});
      if(T>=tV615) ecrire(c,'≠ 615',170,p.yRes,84*zoom(T,tV615,.4),CRAIE.faux);
      if(T>=tPb){ c.strokeStyle=CRAIE.faux; c.lineWidth=8; c.beginPath(); c.roundRect(XU-PW*2.55,p.yRes-75,PW*3.1,150,26); c.stroke(); }
      tab.maj(); return; }
    /* l'accroche : 615 − 278 posée, le résultat faux 347 */
    const p=pose(c,{lignes:[{txt:'615',z:T>=t615?zoom(T,t615,.4):0},{txt:'278',z:T>=t278?zoom(T,t278,.4):0}],signe:T>=t278?'−':'',
      barre:T>=t278?1:0,res:{txt:'347',z:T>=t347?zoom(T,t347,.4):0,coul:CRAIE.blanc}});
    if(T>=tSur){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.roundRect(XU-PW*2.55,p.yRes-75,PW*3.1,150,26); c.stroke(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verif'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tFinT,352,62,a0('Salut !'),a0('J’ai posé')),
    ...suiteDe(ver,60,62,[a0('615 − 278.')],[a0('J’ai trouvé 347.')],[a0('Je suis sûr de moi !')],[a0('Tu paries ?')]),
    ...suiteDe(q,60,62,[a1('Je vérifie'),a1('avec une addition :')],[a1('347 + 278,'),a1('ça fait 625.')],[a1('Ce n’est pas 615 !')],
      [a1('Il y a un problème.')]),
    ...suiteDe(com,60,62,[a3('Et 337 + 278,'),a3('ça fait bien 615.')],[a3('Ouf, vérifier'),a3('m’a sauvé !')]),
    ...suiteDe(f,60,60,[a4('À toi : un ami trouve'),a4('403 − 156, 357.')],[a4('Quel est'),a4('le bon résultat ?')],
      [a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien font 615 − 278 ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('Je casse une dizaine :'), r2=rd('15 − 8 = 7.'), r3=rd('Il reste 0 dizaine :'), r4=rd('je casse une centaine.'),
    r5=rd('10 − 7 = 3.'), r6=rd('5 − 2 = 3.'), r7=rd('Ça fait 337.');
  const tB=mot('02b-reponse','B');

  poserMiniature(outils,acc+1,'615 − 278<br>= 347 ?'+PARI,ardoiseMini([['615 − 278'],['= 347 ?','#ff8787']],330,240));
  return { clips,FIN,titre:'Vérifier, ça sauve',ceinture:1,finTitre:tFinT,groupes,finClip:'05-abonne',
    cuts:[tFinT,ver,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['347',tq('A'),tq('347')],['337',tq('B'),tq('337')],['463',tq('C'),tq('463')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2,r3,r4],suite:[r5,r6,r7] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tFinT;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ if(T<t347) g.montre(); else if(T<tSur) g.reflechit(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T>=tPb){ g.oups(); scene.ry=-.12+.3*lisse((T-tPb)/.35); } else if(T>=tV) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tB?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
