/* ============================================================
   Série NOMBRES ENTIERS CM1 — ÉPISODE 02 (comparer) : 987 OU 1 002 ?
   Outils : films/cm1-commun.js + cm1-entier.js. Ceinture BLANCHE.
   Le copain de Ti Margo croit que 987 bat 1 002 « parce qu'il commence par 9 ». On COMPTE d'abord
   les chiffres : trois contre quatre. Question : lequel est le plus grand ? B : 1 002.
   Commentaire : range 4 410, 4 140 et 4 190 du plus petit au plus grand.
   ⚠️ Nombres à espace : marquesEntiers() remet UNE marque par nombre (et sort le mot collé —
   « 987 est », « 4 140 et » — à son vrai instant) ; le texte écrit porte l'espace fine INSÉCABLE.
   ============================================================ */
FILMS['comparer'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 8.19, '01-oups': 3.43, '02-question': 15.18, '02b-reponse': 6.28, '03-fin': 4.14, '04-commentaire': 10.53, '05-abonne': 6.05 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const t987 = mot('00-accroche', '987'), tGrand = mot('00-accroche', 'grand'),
        t1002 = mot('00-accroche', '1 002'), t9 = mot('00-accroche', '9');
  const tChif = mot('01-oups', 'chiffres'), tTrois = mot('01-oups', 'trois'), tQuatre = mot('01-oups', 'quatre');
  const tPremier = mot('03-fin', 'premier'), tDecide = mot('03-fin', 'décide'), tCompte = mot('03-fin', 'compté');
  const t4410 = mot('04-commentaire', '4 410'), t4140 = mot('04-commentaire', '4 140'),
        t4190 = mot('04-commentaire', '4 190'), tPetit = mot('04-commentaire', 'petit'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const XG = 290, XD = 760, YN = 230, YB = 330, YC = 470, YV = 600;

  /* Les deux nombres, et sous chacun une case par chiffre : c'est la LONGUEUR qui décide */
  function duel(c, T, { zG = 1, zD = 1, cases = 0, nG = 0, nD = 0, coulG = CRAIE.blanc, coulD = CRAIE.blanc }) {
    if (zG > 0) ecrire(c, '987', XG, YN, 140 * zG, coulG);
    if (zD > 0) ecrire(c, nbE(1002), XD, YN, 140 * zD, coulD);
    if (cases > 0) {
      casesChiffres(c, XG, YB, 3, { vues: Math.round(3 * Math.min(1, cases)), coul: CRAIE.jaune });
      casesChiffres(c, XD, YB, 4, { vues: Math.round(4 * Math.min(1, cases)), coul: CRAIE.ok });
    }
    if (nG > 0) ecrire(c, '3 chiffres', XG, YC, 56 * nG, CRAIE.jaune);
    if (nD > 0) ecrire(c, '4 chiffres', XD, YC, 56 * nD, CRAIE.ok);
  }

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : range les trois nombres */
      const xs = [200, 528, 856], ns = [4410, 4140, 4190], ts = [t4410, t4140, t4190];
      ns.forEach((n, i) => { if (T >= ts[i]) ecrire(c, nbE(n), xs[i], 240, 86 * zoom(T, ts[i], .35), CRAIE.blanc); });
      if (T >= tPetit) ecrire(c, '___  <  ___  <  ___', 528, 500, 76 * zoom(T, tPetit, .3), CRAIE.jaune);
      tab.maj(); return;
    }
    if (T >= ouf) { /* le premier chiffre ne décide rien : c'est la longueur qui a décidé */
      duel(c, T, { cases: 1, nG: 1, nD: 1 });
      if (T >= tPremier) cercle(c, XG - 76, YN, 62, CRAIE.faux, entre(T, tPremier, tPremier + .3));
      barrerCraie(c, XG - 76, YN, 150, entre(T, tDecide, tDecide + .4));
      if (T >= tCompte) ecrire(c, nbE(1002) + '  >  987', 528, YV, 86 * zoom(T, tCompte, .3), CRAIE.ok);
      tab.maj(); return;
    }
    /* l'accroche : ce que le copain affirme ; puis on compte les chiffres */
    duel(c, T, {
      zG: zoom(T, t987, .4), zD: zoom(T, t1002, .4),
      cases: T >= sur ? entre(T, tChif, tChif + .7) : 0,
      nG: T >= tTrois ? zoom(T, tTrois, .35) : 0, nD: T >= tQuatre ? zoom(T, tQuatre, .35) : 0,
    });
    if (T >= tGrand && T < sur) ecrire(c, '>', 500, YN, 120 * zoom(T, tGrand, .3), CRAIE.faux);
    if (T >= t9 && T < sur) { cercle(c, XG - 76, YN, 62, CRAIE.faux, entre(T, t9, t9 + .3)); ecrire(c, '9 !', XG - 76, 440, 68 * zoom(T, t9, .3), CRAIE.faux); }
    if (T >= sur) ecrire(c, '?', 500, YN, 120, CRAIE.ret);
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain dit que')], [a0('987 est plus grand'), a0('que ' + nbE(1002) + '.')],
      [a0('Il commence par 9 !')]),
    ...suiteDe(q, 60, 62, [a1('On compte les chiffres :')], [a1('trois contre quatre.')]),
    ...suiteDe(com, 60, 62, [a3('Le premier chiffre')], [a3('ne décide rien')], [a3("tant qu'on n'a pas compté !")]),
    ...suiteDe(f, 60, 58, [a4('À toi : range')], [a4(nbE(4410) + ', ' + nbE(4140) + ' et ' + nbE(4190))],
      [a4('du plus petit au plus grand ?')], [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Lequel est le plus grand :'), qd('987 ou ' + nbE(1002) + ' ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Quatre chiffres battent'), r2 = rd('trois chiffres.'), r3 = rd(nbE(1002) + ' gagne !');
  const tB = mot('02b-reponse', 'B');

  const mini = ardoiseMini([['987  ou  ' + nbE(1002), '#f8f9fa'], ['lequel gagne ?', '#ffd43b']]);
  poserMiniature(outils, acc + 1, '987 ou ' + nbE(1002) + ' ?' + PARI, mini);

  return {
    clips, FIN, titre: '987 ou ' + nbE(1002) + ' ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 1, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['987', tq('A'), tq('987', 2)], [nbE(1002), tq('B'), tq('1 002', 2)], ["c'est pareil", tq('C'), tq("c'est")]],
      tete: [[r + .1, 'Réponse '], [tB, 'B !']], reponse: [r1, r2], suite: [r3],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) { T < t9 ? g.montre() : g.oups(); }
      else if (T < q) g.montre();
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tCompte ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
