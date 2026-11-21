/* ============================================================
   Série NOMBRES ENTIERS 6e — ÉPISODE 04 (decomposer) : 507, C'EST 500 + 70 OU 500 + 7 ?
   Outils : films/6e-commun.js + 6e-entier.js. Ceinture BLANCHE.
   Le copain de Ti Margo décompose 507 et écrit 500 + 70 : il a lu le 7 comme un 70.
   Question : quelle est la décomposition de 507 ? B : 500 + 7. Le 0 est aux dizaines :
   il n'y a aucune dizaine, mais le zéro garde la place.
   Commentaire : décompose 2 340.
   ⚠️ marquesEntiers() en tête (le piège n° 16) ; nbE() pour les nombres à espace du texte écrit.
   ⚠️ Le titre tient sur UNE ligne jusqu'à ~24 caractères (piège n° 15) : « 507 : 70 ou 7 ? » = 15.
   ============================================================ */
FILMS['decomposer'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 8.00, '01-oups': 5.34, '02-question': 16.30, '02b-reponse': 8.22, '03-fin': 4.02, '04-commentaire': 6.00, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const t507 = mot('00-accroche', '507'), t500 = mot('00-accroche', '500'), t70 = mot('00-accroche', '70');
  const tSoixante = mot('01-oups', 'Soixante-dix'), tVaut = mot('01-oups', 'vaut');
  const tZero = mot('03-fin', 'zéro'), tPlace = mot('03-fin', 'garde');
  const t2340 = mot('04-commentaire', '2340'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const CX = 528, LIGNE1 = 230, LIGNE2 = 400, LIGNE3 = 540;

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : décomposer 2 340 */
      if (T >= t2340) ecrire(c, nbE(2340), CX, 230, 112 * zoom(T, t2340, .35), CRAIE.jaune);
      if (T >= tRep) {
        sommeCraie(c, CX, 470, [['?', tRep, CRAIE.r0], ['?', tRep + .12, CRAIE.ok], ['?', tRep + .24, CRAIE.jaune]],
          T, { taille: 86 });
      }
      tab.maj(); return;
    }
    if (T >= ouf) { /* le zéro ne s'écrit pas, mais il garde la place */
      const cs = casesChiffres(c, CX, 150, 3, { w: 110, h: 140, coul: CRAIE.blanc, gap: 20 });
      const COUL = [CRAIE.jaune, CRAIE.ret, CRAIE.ok];
      ['5', '0', '7'].forEach((d, i) => ecrire(c, d, cs.x(i), cs.yc, 104 * zoom(T, ouf + i * .12, .3), COUL[i]));
      if (T >= tZero) {
        ecrire(c, '500', cs.x(0), 400, 64 * zoom(T, tZero, .3), CRAIE.jaune);
        ecrire(c, '–', cs.x(1), 400, 64 * zoom(T, tZero, .3), CRAIE.gris);
        ecrire(c, '7', cs.x(2), 400, 64 * zoom(T, tZero, .3), CRAIE.ok);
      }
      if (T >= tPlace) ecrire(c, 'il garde la place', CX, 520, 60 * zoom(T, tPlace, .3), CRAIE.ret);
      tab.maj(); return;
    }
    /* l'accroche et l'oups : 507, puis la fausse décomposition 500 + 70 */
    if (T < t507) { tab.maj(); return; }
    ecrire(c, '507', CX, LIGNE1, 118 * zoom(T, t507, .35), CRAIE.jaune);
    const s = sommeCraie(c, CX, LIGNE2, [['500', t500, CRAIE.faux], ['70', t70, CRAIE.faux]], T, { taille: 86 });
    if (T >= sur) { /* le 7 est tout à droite : le second terme est barré, il vaut 7 */
      // ⚠️ 150 px de barre dépassaient de 27 px de chaque côté du « 70 » (large de ~95 px) et
      //    mordaient sur le « + » posé 18 px avant : 120 px laissent 12 px de marge.
      barrerCraie(c, s.x(1), LIGNE2, 120, entre(T, tSoixante, tSoixante + .3));
      if (T >= tVaut) {
        ecrire(c, '↓', s.x(1), LIGNE2 + 70, 52 * zoom(T, tVaut, .3), CRAIE.gris);
        ecrire(c, '7', s.x(1), LIGNE3, 86 * zoom(T, tVaut + .1, .3), CRAIE.ok);
      }
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
    qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain décompose 507.')], [a0('Il écrit 500 plus 70.')]),
    ...suiteDe(q, 60, 62, [a1('Soixante-dix ?')], [a1('Le 7 est tout à droite :'), a1('il vaut 7 !')]),
    ...suiteDe(com, 60, 62, [a3("Le zéro ne s'écrit pas,")], [a3('mais il garde la place !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : décompose ' + nbE(2340))], [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Quelle est la décomposition'), qd('de 507 ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Le 0 est aux dizaines :'), r2 = rd("il n'y a aucune dizaine."), r3 = rd('Donc 500 plus 7.');
  const tB = mot('02b-reponse', 'B');

  const mini = ardoiseMini([['507', '#ffd43b'], ['500 + 70 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, '507 : 500 + 70<br>ou 500 + 7 ?' + PARI, mini);

  return {
    clips, FIN, titre: '507 : 70 ou 7 ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 1, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['500 + 70', tq('A'), tq('500 +')], ['500 + 7', tq('B'), tq('500 +', 2)],
        ['50 + 7', tq('C'), tq('50 +')]],
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
      else if (T < com) { T < tPlace ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
