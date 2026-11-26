/* ============================================================
   Série Nombres entiers CP — SHORT 03 : « Les bougies » (micro cp_entier_construire_collection), 25/11/2026.
   Outils : cp-commun.js + cp-entier.js. Voix : manim/voix/cp-entier-collection-short.json.
   La petite sœur de Ti Margo a 5 ans ; sur le gâteau, seulement 4 bougies (une place reste vide).
   Question : combien de bougies pour 5 ans ? A (5). Ceinture blanche. Commentaire : et pour 6 ans ?
   ⭐ La carte se range à droite, Ti Margo à gauche (26/11) : le gâteau reste visible pendant la question.
   ============================================================ */
FILMS['collection']=function(outils){
  const DUR={'00-accroche':7.85,'01-question':12.05,'01b-reponse':8.1,'02-commentaire':6.92,'03-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  carteCoteE(); /* 26/11 : carte à droite, Ti Margo à gauche (voir cp-entier.js) */

  const tMa=mot('00-accroche','Ma'), tCinq=mot('00-accroche','cinq'), tGat=mot('00-accroche','gâteau'), tLune=mot('00-accroche','lune');
  const tA=mot('01b-reponse','A'), tCinq2=mot('01b-reponse','cinq',1), tBoug=mot('01b-reponse','bougies'), tManq=mot('01b-reponse','manquait'), tJoy=mot('01b-reponse','Joyeux');
  const tSix=mot('02-commentaire','six'), tRep=mot('02-commentaire','réponds');
  const finTitre=tMa-.08;

  /* 5 places sur le gâteau : 4 bougies, la 5e place reste vide jusqu'à la réponse */
  const SLOT=i=>528+(i-2)*104;
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* et pour 6 ans ? un gâteau sans bougie */
      gateauCraie(c,528,650,560,zoom(T,com+.1,.4));
      if(T>=tSix){ const z=zoom(T,tSix,.5); ecrire(c,'6 ans',470,110,96*z,CRAIE.jaune); ecrire(c,'?',650,110,96*z,CRAIE.jaune); }
      tab.maj(); return; }
    if(T<tGat){ if(T>=tCinq) ecrire(c,'5 ans',528,360,150*zoom(T,tCinq,.5),CRAIE.jaune); tab.maj(); return; }
    if(T>=tLune&&T<q) etoilesE(c,T,12,1056,200);
    const haut=gateauCraie(c,528,650,560,zoom(T,tGat,.4));
    for(let i=0;i<4;i++) bougieCraie(c,SLOT(i),haut,T,zoom(T,tGat+.3+i*.12,.4),T>=tLune&&T<q?.5+.5*Math.sin(T*4+i):(T>=tJoy?.6+.4*Math.sin(T*5+i):0));
    /* la place vide : un petit rond en pointillé */
    if(T>=tGat+.8&&T<tBoug){ c.strokeStyle=CRAIE.faux; c.lineWidth=5; c.setLineDash([10,8]); c.beginPath(); c.arc(SLOT(4),haut-50,34,0,7); c.stroke(); c.setLineDash([]); }
    if(T>=r&&T>=tBoug){ bougieCraie(c,SLOT(4),haut,T,zoom(T,tBoug,.5),T>=tManq?.7+.3*Math.sin(T*5):0);
      if(T>=tManq&&T<tJoy) cercle(c,SLOT(4),haut-60,72,CRAIE.ok,entreE(T,tManq,tManq+.4)); }
    if(T>=q) ecrire(c,'5 ans',528,110,96*(T>=r&&T>=tCinq2?zoom(T,tCinq2,.5):1),T>=r&&T>=tCinq2?CRAIE.ok:CRAIE.jaune);
    /* la réponse : on compte les bougies, 1 → 5, sur le gâteau */
    if(T>=r&&T>=tBoug) for(let i=0;i<5;i++) etiquette(c,String(i+1),SLOT(i),haut+70,T,tBoug+.15+i*.14,i===4?CRAIE.ok:CRAIE.jaune,44);
    if(T>=tJoy) for(const [x,y] of [[200,250],[860,250],[150,450],[910,450],[528,200]]) etincelle(c,x,y,18+7*Math.sin(T*6+x));
    tab.maj();
  }

  const qd=dit('01-question'), rd=dit('01b-reponse');
  qd('Question !'); const phraseQ=[qd('Combien de bougies'),phraseE('pour 5 ans ?',[mot('01-question','pour'),mot('01-question','cinq'),mot('01-question','ans'),mot('01-question','ans')])];
  const tq=m=>mot('01-question',m)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('5 ans, 5 bougies.',[tCinq2,mot('01b-reponse','ans'),mot('01b-reponse','cinq',2),tBoug,tBoug]);
  rd.jusque('Il'); const r2=rd('Il en manquait une !');

  poserMiniature(outils,q-.3,'Combien<br>de bougies ?'+PARI,ardoiseMini([['5 ans'],['🎂 ?','#ffd43b']]));
  return { clips,FIN,titre:'Les bougies',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,tGat,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:0,tBon:tA-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['5',tq('A'),tq('cinq')],['4',tq('B'),tq('quatre')],['6',tq('C'),tq('six')]],
      tete:[[r+.1,'Réponse '],[tA,'A !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tGat?g.fier():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tJoy?g.montre():g.ouvre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
