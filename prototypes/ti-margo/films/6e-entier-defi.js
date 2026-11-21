/* ============================================================
   Série NOMBRES ENTIERS 6e — ÉPISODE 05 (defi) : DE 569 À 600, IL MANQUE 31 OU 41 ?
   Outils : films/6e-commun.js + 6e-entier.js. ⛔ Ceinture BLANCHE (le PAYSAGE est bleu).
   La copine de Ti Margo a 569 points, il en faut 600, elle annonce 41 : elle a compté trop vite.
   Question : combien manque-t-il à 569 pour atteindre 600 ? B : 31.
   La méthode : on avance par étapes rondes — 569 + 1 = 570, puis 570 + 30 = 600, en tout 31.
   Commentaire : le plus petit nombre de quatre chiffres avec 3, 0, 6 et 5 ?
   ⚠️ marquesEntiers() en tête (le piège n° 16) ; nbE() pour les nombres à espace du texte écrit.
   ⚠️ Le titre tient sur UNE ligne jusqu'à ~24 caractères (piège n° 15) : « 569 à 600 : 31 ou 41 ? » = 22.
   ============================================================ */
FILMS['defi'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 7.78, '01-essai': 3.60, '02-question': 15.25, '02b-reponse': 11.47, '03-fin': 3.86, '04-commentaire': 8.20, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-essai': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const t569 = mot('00-accroche', '569'), t600 = mot('00-accroche', '600');
  const tAnnonce = mot('01-essai', 'annonce'), t41 = mot('01-essai', '41');
  const tEtapes = mot('03-fin', 'étapes'), tRondes = mot('03-fin', 'rondes');
  const tAvec = mot('04-commentaire', 'avec'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Ma') - .08;

  const CX = 528, LIGNE1 = 230, LIGNE2 = 400, LIGNE3 = 555;

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : le plus petit nombre avec 3, 0, 6 et 5 */
      if (T >= tAvec) {
        const cs = casesChiffres(c, CX, 160, 4, { w: 110, h: 140, coul: CRAIE.jaune, gap: 22 });
        ['3', '0', '6', '5'].forEach((d, i) => {
          const t = mot('04-commentaire', d);
          if (T >= t) ecrire(c, d, cs.x(i), cs.yc, 96 * zoom(T, t, .3), CRAIE.jaune);
        });
      }
      if (T >= tRep) ecrire(c, 'le plus petit ?', CX, 480, 72 * zoom(T, tRep, .3), CRAIE.r0);
      tab.maj(); return;
    }
    if (T >= ouf) { /* la méthode : deux étapes rondes, 569 → 570 → 600 */
      ecrire(c, '569', 230, 300, 86 * zoom(T, ouf, .3), CRAIE.jaune);
      if (T >= tEtapes) {
        ecrire(c, '+ 1', 390, 200, 46 * zoom(T, tEtapes, .3), CRAIE.ret);
        ecrire(c, '→', 390, 300, 64, CRAIE.gris);
        ecrire(c, '570', 528, 300, 86 * zoom(T, tEtapes, .3), CRAIE.ok);
        ecrire(c, '+ 30', 680, 200, 46 * zoom(T, tEtapes + .18, .3), CRAIE.ret);
        ecrire(c, '→', 680, 300, 64, CRAIE.gris);
        ecrire(c, '600', 830, 300, 86 * zoom(T, tEtapes + .18, .3), CRAIE.ok);
      }
      if (T >= tRondes) ecrire(c, 'des étapes rondes', CX, 480, 62 * zoom(T, tRondes, .3), CRAIE.ok);
      tab.maj(); return;
    }
    /* l'accroche et l'essai : 569 points, but 600, et la réponse 41 annoncée trop vite */
    if (T < t569) { tab.maj(); return; }
    ecrire(c, '569', CX, LIGNE1, 118 * zoom(T, t569, .35), CRAIE.jaune);
    if (T >= t600) {
      ecrire(c, 'but :', 400, LIGNE2, 66, CRAIE.gris);
      ecrire(c, '600', 610, LIGNE2, 86 * zoom(T, t600, .3), CRAIE.blanc);
    }
    if (T >= sur && T >= t41) { /* elle annonce 41 : barré */
      ecrire(c, '41 ?', CX, LIGNE3, 86 * zoom(T, t41, .3), CRAIE.faux);
      barrerCraie(c, CX, LIGNE3, 150, entre(T, t41 + .45, t41 + .75));
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-essai'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
    qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Ma copine a 569 points.')], [a0('Il en faut 600')],
      [a0('pour gagner le niveau.')]),
    ...suiteDe(q, 60, 62, [a1('Elle compte très vite…')], [a1('et elle annonce 41 !')]),
    ...suiteDe(com, 60, 62, [a3('On avance par étapes rondes,')], [a3('et on ne se trompe plus !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : le plus petit nombre'), a4('de quatre chiffres')],
      [a4('avec 3, 0, 6 et 5 ?')], [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Combien manque-t-il'), qd('à 569 pour atteindre 600 ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('569 plus 1 donne 570.'), r2 = rd('Puis 30 de plus : 600.'), r3 = rd('En tout, 31.');
  const tB = mot('02b-reponse', 'B');

  const mini = ardoiseMini([['569 → 600', '#ffd43b'], ['41 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, '569 à 600 :<br>31 ou 41 ?' + PARI, mini);

  return {
    clips, FIN, titre: '569 à 600 : 31 ou 41 ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 1, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['29', tq('A'), tq('29')], ['31', tq('B'), tq('31')], ['41', tq('C'), tq('41')]],
      tete: [[r + .1, 'Réponse '], [tB, 'B !']], reponse: [r1, r2], suite: [r3],
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
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tRondes ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
