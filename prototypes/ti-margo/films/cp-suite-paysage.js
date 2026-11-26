/* ============================================================
   La PAYSAGE (1920 × 1080) des suites de nombres CP (26/11/2026). Relit films/cp-entier-paysage.js (le cadre :
   Ti Margo à gauche, le grand tableau, la carte à droite, la miniature) et films/cp-suite.js (les dessins de la série).
   ⚠ Relus par un <script> en ligne, pas par eval (les « const » restent visibles). Aucun fichier cp-entier n'est modifié.
   Les 5 films (un par micro) : films/cp-suite-paysage-<épisode>.js. Ils ont tous le même plan, fabriqué par filmSuiteP :
   accroche → 2 explications → question 1 → réponse → question 2 → réponse → « Ce que tu as appris » → fin.
   ⭐ Questions EN PLEIN MILIEU (Frédéric, 25/11) ; pendant une question, on dessine à GAUCHE de l'ardoise (x < 520).
   ============================================================ */
(function(){ for(const f of ['films/cp-entier-paysage.js','films/cp-suite.js']){ const x=new XMLHttpRequest(); x.open('GET',f,false); x.send();
  const s=document.createElement('script'); s.textContent=x.responseText; document.head.append(s); } })();

/* cfg = { DUR, titre, mini (html de la miniature), tMini(S), dessiner(c,T,S), questions:[{choix,bonne,phrase(S),reponse(S)}×2], geste(g,T,S) } */
function filmSuiteP(outils,cfg){
  const {DUR}=cfg, cles=Object.keys(DUR);
  const apres={[cles[0]]:1,[cles[1]]:.5,[cles[2]]:1.2,'03-question':3.3,'03b-reponse':1.4,'04-question':3.3,'04b-reponse':1.4,'05-appris':1.4};
  const clips=enchainer(.4,cles,DUR,apres);
  const A=Object.fromEntries(clips), {dit,mot,marque}=voixDe(A);
  const fin=x=>A[x]+DUR[x];
  const S={A,fin,m:mot,acc:A[cles[0]],c1:A[cles[1]],c2:A[cles[2]],q1:A['03-question'],r1:A['03b-reponse'],q2:A['04-question'],r2:A['04b-reponse'],ap:A['05-appris'],f:A['06-abonne']};
  const FIN=+(S.f+DUR['06-abonne']+1.5).toFixed(2) /* 26/11 : fin courte « eleveai.fr ou YouTube @eleveai974 » (cadrePaysageE), 1,5 s pour lire */, finTitre=marque(cles[0],1)-.08; S.finTitre=finTitre;

  poserClasse(); const tab=cadrePaysageE(); finCourteS(true);
  outils.panneau.style.display='none'; cssCartes();

  const L=['A','B','C'];
  const questions=cfg.questions.map((Q,i)=>{ const qc=i?'04-question':'03-question', rc=i?'04b-reponse':'03b-reponse', q0=A[qc], r0=A[rc];
    const d=dit(qc); d.jusque('Mets'); const pause=[d('Mets pause, et choisis !')];
    const choix=Q.choix.map((s,k)=>{ const l=lettreS(A,qc,L[k]); return [s,l.t-q0,l.apres-q0]; });
    const lb=lettreS(A,rc,L[Q.bonne]).t;
    return { qc,rc,finR:fin(rc)+.8,cpt:fin(qc)+.1,bonne:Q.bonne,tBon:lb-r0,phrase:Q.phrase(S),pause,choix,
      tete:[[r0+.1,'Réponse '],[lb,L[Q.bonne]+' !']],reponse:Q.reponse(S),suite:[] }; });
  /* Le seul texte hors des cartes : le titre de la fin, en haut et centré */
  const groupes=[groupe(S.ap+.05,S.f,30,60,phraseE('Ce que tu as appris',[S.ap+.05,S.ap+.05,S.ap+.05,S.ap+.05,S.ap+.05]))];

  miniPaysageE(outils,cfg.tMini(S),cfg.mini);
  return { clips,FIN,titre:cfg.titre,ceinture:0,finTitre,groupes,finClip:'06-abonne',
    cuts:[finTitre,S.c1,S.c2,S.q1,S.r1,S.q2,S.r2,S.ap,S.f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); tab.effacer(); cfg.dessiner(tab.c,T,S); tab.maj();
      const dansF=T>=S.f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=S.q1&&T<S.r1)||(T>=S.q2&&T<S.r2);
      if(T<S.acc+1.4) g.salut(T-S.acc,1.4);
      else if(gros) g.ouvre();
      else if(cfg.geste&&cfg.geste(g,T,S)) {}
      else if(T<S.c1) g.ouvre();
      else if(T<S.q1) g.montre();
      else if(dansQ) g.reflechit();
      else if(T<S.ap) g.fier();
      else if(T<S.f) g.montre();
      else { T-S.f<2.35?g.ouvre():g.fier(); }
      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
}
