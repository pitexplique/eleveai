/* ============================================================
   Série NOMBRES ENTIERS CM2 — ÉPISODE 01 (multiple) : MULTIPLE DE 3, SANS DIVISER
   Outils : films/cm2-commun.js + cm2-entier.js. Ceinture BLANCHE (le paysage est vert).
   Le copain de Ti Margo veut savoir si 48 231 est un multiple de 3 et pose la division ;
   sa copine additionne les chiffres (4 + 8 + 2 + 3 + 1 = 18) et a déjà fini.
   Question : lequel est un multiple de 3 ? A : 57 651 (5 + 7 + 6 + 5 + 1 = 24).
   Commentaire : 742 950 est-il un multiple de 50 ?
   ⚠️ marquesEntiers() en tête (le piège n° 16) ; nbE() pour les nombres à espace du texte écrit.
   ⚠️ Le 2ᵉ clip s'appelle `01-astuce` et NON `01-oups` : la table des écarts de `enchainer`
      est indexée par le nom du clip — avec la mauvaise clé, son silence de 1,2 s disparaît
      sans un mot et tout le film se décale.
   ⚠️ Le titre tient sur UNE ligne jusqu'à ~24 caractères (piège n° 15) : celui-ci en fait 24.
   ============================================================ */
FILMS['multiple'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 9.34, '01-astuce': 4.97, '02-question': 17.77, '02b-reponse': 7.79, '03-fin': 4.00, '04-commentaire': 8.13, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-astuce': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const t48231 = mot('00-accroche', '48 231'), tTrois = mot('00-accroche', '3'),
    tDivision = mot('00-accroche', 'division');
  const tAddit = mot('01-astuce', 'additionne'), tFini = mot('01-astuce', 'fini');
  const tDiviser = mot('03-fin', 'diviser'), tChiffres = mot('03-fin', 'chiffres');
  const t742950 = mot('04-commentaire', '742 950'), tCinquante = mot('04-commentaire', '50'),
    tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const CX = 528, LIGNE1 = 200, LIGNE2 = 370, LIGNE3 = 520;

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : 742 950 est-il un multiple de 50 ? */
      if (T >= t742950) ecrire(c, nbE(742950), CX, 230, 96 * zoom(T, t742950, .3), CRAIE.jaune);
      if (T >= tCinquante) ecrire(c, 'multiple de 50 ?', CX, 420, 66 * zoom(T, tCinquante, .3), CRAIE.r0);
      tab.maj(); return;
    }
    if (T >= ouf) { /* pas besoin de diviser : on additionne */
      ecrire(c, nbE(48231), CX, 170, 86 * zoom(T, ouf, .3), CRAIE.jaune);
      if (T >= tDiviser) {
        // ⛔ VU À L'IMAGE : « ÷ 3 » seul fait ~90 px de large, et la barre de rature l'a
        //    entièrement recouvert — on lisait une tache rouge, pas une division rayée. C'est
        //    la DIVISION ENTIÈRE qu'on raye, et la barre se mesure sur elle (piège n° 29).
        ecrire(c, nbE(48231) + ' ÷ 3', CX, 310, 64, CRAIE.faux);
        barrerCraie(c, CX, 310, 330, entre(T, tDiviser, tDiviser + .3));
      }
      if (T >= tChiffres) {
        ecrire(c, '4 + 8 + 2 + 3 + 1 = 18', CX, 450, 62 * zoom(T, tChiffres, .3), CRAIE.ok);
        ecrire(c, '18 = 3 × 6', CX, 560, 56 * zoom(T, tChiffres + .2, .3), CRAIE.ok);
      }
      tab.maj(); return;
    }
    /* l'accroche et l'astuce : lui pose la division, elle additionne */
    if (T < t48231) { tab.maj(); return; }
    ecrire(c, nbE(48231), CX, LIGNE1, 104 * zoom(T, t48231, .35), CRAIE.jaune);
    if (T >= tTrois) ecrire(c, 'multiple de 3 ?', CX, LIGNE2, 62 * zoom(T, tTrois, .3), CRAIE.gris);
    if (T >= tDivision) { /* il pose la division : long */
      ecrire(c, nbE(48231) + '  ÷ 3', 420, LIGNE3, 58 * zoom(T, tDivision, .3), CRAIE.faux);
      ecrire(c, '…', 790, LIGNE3, 64, CRAIE.faux);
    }
    if (T >= sur && T >= tAddit) { /* elle additionne les chiffres */
      ecrire(c, '4 + 8 + 2 + 3 + 1', CX, 640, 58 * zoom(T, tAddit, .3), CRAIE.ok);
      if (T >= tFini) ecrire(c, '= 18', 880, 640, 58 * zoom(T, tFini, .3), CRAIE.ok);
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-astuce'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
    qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain veut savoir si'), a0(nbE(48231) + ' est un multiple de 3.')],
      [a0('Il pose la division.')]),
    ...suiteDe(q, 60, 62, [a1('Ma copine, elle,')], [a1('additionne les chiffres…')],
      [a1('et elle a déjà fini !')]),
    ...suiteDe(com, 60, 62, [a3('Pas besoin de diviser :')], [a3('on additionne les chiffres !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : ' + nbE(742950)), a4('est-il un multiple de 50 ?')],
      [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Lequel est un multiple de 3 ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('5 plus 7 plus 6 plus 5 plus 1 donne 24,'), r2 = rd('un multiple de 3.');
  const tA = mot('02b-reponse', 'A');

  const mini = ardoiseMini([[nbE(48231), '#ffd43b'], ['multiple de 3 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, 'Multiple de 3 :<br>sans poser la division ?' + PARI, mini);

  return {
    clips, FIN, titre: 'Multiple de 3 : lequel ?', ceinture: 0, finTitre, groupes,
    finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 0, tBon: tA - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [[nbE(57651), tq('A'), tq('57 651')], [nbE(57658), tq('B'), tq('57 658')],
        [nbE(57671), tq('C'), tq('57 671')]],
      tete: [[r + .1, 'Réponse '], [tA, 'A !']], reponse: [r1], suite: [r2],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) g.montre();
      else if (T < q) g.fier();
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tA ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tChiffres ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
