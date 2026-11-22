/* ============================================================
   Série NOMBRES ENTIERS 6e — ÉPISODE 02 (comparer) : 1 408 OU 1 480 ?
   Outils : films/6e-commun.js + 6e-entier.js. Ceinture BLANCHE.
   Le copain de Ti Margo compare 1 408 et 1 480 en regardant le DERNIER chiffre (8 contre 0) et
   annonce 1 408. On compare par la gauche : même début 1 et 4, puis 8 dizaines battent 0 dizaine.
   Question : lequel est le plus grand ? A : 1 480.
   Commentaire : range 17 350, 17 340 et 16 340 du plus grand au plus petit.
   ⚠️ marquesEntiers() en tête (le piège n° 16) ; nbE() pour les nombres à espace du texte écrit.
   ⚠️ « 1408 » et « 1480 » sont marqués DEUX fois dans 02-question (l'énoncé, puis le choix) :
      les libellés des choix visent la 2ᵉ occurrence, `mot(..., 2)`.
   ⚠️ Le titre tient sur UNE ligne jusqu'à ~24 caractères (piège n° 15) : « 1 408 ou 1 480 ? » = 16.
   ============================================================ */
FILMS['comparer'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 10.10, '01-oups': 3.69, '02-question': 16.54, '02b-reponse': 9.88, '03-fin': 3.58, '04-commentaire': 11.41, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const t1408 = mot('00-accroche', '1 408'), t1480 = mot('00-accroche', '1 480');
  const tDernier = mot('00-accroche', 'dernier'), t8 = mot('00-accroche', '8'), t0 = mot('00-accroche', '0');
  const tFaux = mot('01-oups', '1 408');
  const tGauche = mot('03-fin', 'gauche'), tJamais = mot('03-fin', 'jamais');
  const t17350 = mot('04-commentaire', '17 350'), t17340 = mot('04-commentaire', '17 340'),
    t16340 = mot('04-commentaire', '16 340'), tGrand = mot('04-commentaire', 'grand'),
    tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const CX = 528, GX = 320, DX = 740;

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : trois nombres à ranger */
      if (T >= t17350) ecrire(c, nbE(17350), CX, 150, 78 * zoom(T, t17350, .3), CRAIE.jaune);
      if (T >= t17340) ecrire(c, nbE(17340), CX, 280, 78 * zoom(T, t17340, .3), CRAIE.jaune);
      if (T >= t16340) ecrire(c, nbE(16340), CX, 410, 78 * zoom(T, t16340, .3), CRAIE.jaune);
      if (T >= tGrand) ecrire(c, 'du plus grand au plus petit ?', CX, 540, 54 * zoom(T, tGrand, .3), CRAIE.r0);
      tab.maj(); return;
    }
    if (T >= ouf) { /* on compare par la GAUCHE : le rang des dizaines décide */
      const h1 = casesChiffres(c, CX, 110, 4, { w: 104, h: 120, coul: CRAIE.blanc, gap: 16 });
      const h2 = casesChiffres(c, CX, 280, 4, { w: 104, h: 120, coul: CRAIE.blanc, gap: 16 });
      '1408'.split('').forEach((d, i) => ecrire(c, d, h1.x(i), h1.yc, 80, i === 2 ? CRAIE.faux : CRAIE.blanc));
      '1480'.split('').forEach((d, i) => ecrire(c, d, h2.x(i), h2.yc, 80, i === 2 ? CRAIE.ok : CRAIE.blanc));
      if (T >= tGauche) {
        c.strokeStyle = CRAIE.ok; c.lineWidth = 8; c.setLineDash([]);
        const u = entre(T, tGauche, tGauche + .35);
        c.strokeRect(h1.x(2) - 58, 104, 116, 6 + 290 * u);
      }
      if (T >= tJamais) ecrire(c, '8 dizaines  >  0 dizaine', CX, 470, 56 * zoom(T, tJamais, .3), CRAIE.ok);
      tab.maj(); return;
    }
    /* l'accroche et l'oups : les deux nombres, et le dernier chiffre pris pour juge */
    if (T < t1408) { tab.maj(); return; }
    ecrire(c, nbE(1408), GX, 210, 86 * zoom(T, t1408, .35), CRAIE.jaune);
    if (T >= t1480) ecrire(c, nbE(1480), DX, 210, 86 * zoom(T, t1480, .35), CRAIE.jaune);
    if (T >= tDernier) ecrire(c, 'le dernier chiffre :', CX, 350, 52 * zoom(T, tDernier, .3), CRAIE.gris);
    if (T >= t8) ecrire(c, '8', GX, 450, 86 * zoom(T, t8, .3), CRAIE.faux);
    if (T >= t0) ecrire(c, '0', DX, 450, 86 * zoom(T, t0, .3), CRAIE.faux);
    if (T >= sur && T >= tFaux) { /* il annonce 1 408 : barré */
      barrerCraie(c, GX, 210, 190, entre(T, tFaux + .5, tFaux + .8));
      ecrire(c, 'le plus grand ?', CX, 560, 54 * zoom(T, tFaux + .5, .3), CRAIE.faux);
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
    qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain compare'), a0(nbE(1408) + ' et ' + nbE(1480) + '.')],
      [a0('Il regarde le dernier chiffre :')], [a0('8 contre 0.')]),
    ...suiteDe(q, 60, 62, [a1('Il annonce :')], [a1(nbE(1408) + ' est le plus grand !')]),
    ...suiteDe(com, 60, 62, [a3('On compare par la gauche,')], [a3('jamais par la fin !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : range ' + nbE(17350) + ','), a4(nbE(17340) + ' et ' + nbE(16340))],
      [a4('du plus grand au plus petit.')], [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Lequel est le plus grand :'), qd(nbE(1408) + ' ou ' + nbE(1480) + ' ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Même début : 1 et 4.'), r2 = rd('Puis 8 dizaines bat 0 dizaine.'),
    r3 = rd('Donc ' + nbE(1480) + '.');
  const tA = mot('02b-reponse', 'A');

  const mini = ardoiseMini([[nbE(1408) + ' ou ' + nbE(1480), '#ffd43b'], ['8 > 0 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, nbE(1408) + ' ou ' + nbE(1480) + ' :<br>lequel est le plus grand ?' + PARI, mini);

  return {
    clips, FIN, titre: nbE(1408) + ' ou ' + nbE(1480) + ' ?', ceinture: 0, finTitre, groupes,
    finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 0, tBon: tA - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [[nbE(1480), tq('A'), tq('1 480', 2)], [nbE(1408), tq('B'), tq('1 408', 2)],
        ["c'est pareil", tq('C'), tq("c'est")]],
      tete: [[r + .1, 'Réponse '], [tA, 'A !']], reponse: [r1, r2], suite: [r3],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) g.montre();
      else if (T < q) g.oups();
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tA ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tJamais ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
