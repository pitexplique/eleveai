/* ============================================================
   Série NOMBRES ENTIERS CM1 — ÉPISODE 03 (decomposer) : LE 5 VAUT 50 OU 5 ?
   Outils : films/cm1-commun.js + cm1-entier.js. Ceinture BLANCHE.
   La copine de Ti Margo décompose 12 405 et écrit … + 400 + 50. Le dernier chiffre est à droite,
   dans les UNITÉS : il vaut 5, pas 50. Question : que vaut le dernier chiffre ? A : 5 unités.
   Commentaire : décompose 70 804.
   ⚠️ marquesEntiers() : « 12 405 » a cinq marques identiques, « 10 000 plus » en a trois dont la
   dernière est le « plus ». Les nombres écrits portent l'espace fine INSÉCABLE.
   ============================================================ */
FILMS['decomposer'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 9.74, '01-oups': 5.23, '02-question': 14.53, '02b-reponse': 7.76, '03-fin': 3.61, '04-commentaire': 6.39, '05-abonne': 6.05 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const t12405 = mot('00-accroche', '12 405'), tEcrit = mot('00-accroche', 'écrit'),
        t10000 = mot('00-accroche', '10 000'), t2000 = mot('00-accroche', '2 000'),
        t400 = mot('00-accroche', '400'), t50 = mot('00-accroche', '50');
  const tCinq = mot('01-oups', 'Cinquante'), tDernier = mot('01-oups', 'dernier'),
        t5a = mot('01-oups', '5', 1), t5b = mot('01-oups', '5', 2);
  const tColonne = mot('03-fin', 'colonne'), tDecalage = mot('03-fin', 'décalage'), tFaux = mot('03-fin', 'faux');
  const tDecompose = mot('04-commentaire', 'décompose'), t70804 = mot('04-commentaire', '70 804'),
        tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Ma') - .08;

  const CX = 528, YTAB = 210, WCOL = 108, HCOL = 140;
  const TERMES = [[nbE(10000), t10000], [nbE(2000), t2000], [nbE(400), t400], ['50', t50, CRAIE.faux]];

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : décompose 70 804 */
      if (T >= t70804) ecrire(c, nbE(70804), CX, 230, 132 * zoom(T, t70804, .35), CRAIE.blanc);
      if (T >= tDecompose) ecrire(c, '___  +  ___  +  ___', CX, 470, 72 * zoom(T, tDecompose, .3), CRAIE.jaune);
      tab.maj(); return;
    }
    if (T >= ouf) { /* une colonne de décalage, et le compte est faux */
      const g = tableauCraie(c, CX, YTAB, { w: WCOL, h: HCOL, ban: false });
      chiffresCraie(c, g, '12405', { coul: CRAIE.blanc, zeros: CRAIE.ret, taille: 96 });
      const s = sommeCraie(c, CX, 470, TERMES.map(([x, , col]) => [x, 0, col]), T, { taille: 58 });
      if (T >= tDecalage) {
        barrerCraie(c, s.x(3), 470, 110, entre(T, tDecalage, tDecalage + .35));
        ecrire(c, '5', s.x(3), 592, 72 * zoom(T, tDecalage + .3, .35), CRAIE.ok);
      }
      if (T >= tFaux) cadreCase(c, g, 5, CRAIE.ok, zoom(T, tFaux, .4));
      tab.maj(); return;
    }
    if (T >= sur) { /* « Cinquante ? » : le dernier chiffre est dans les UNITÉS */
      if (T >= tCinq) ecrire(c, '50 ?', CX, 96, 76 * zoom(T, tCinq, .3), CRAIE.faux);
      const g = tableauCraie(c, CX, YTAB, { w: WCOL, h: HCOL, ban: false, u: entre(T, tDernier, tDernier + .5) });
      if (T >= tDernier) chiffresCraie(c, g, '12405', { coul: CRAIE.blanc, zeros: CRAIE.ret, taille: 96 });
      if (T >= t5a) cadreCase(c, g, 5, CRAIE.ok, zoom(T, t5a, .4));
      if (T >= t5b) ecrire(c, 'il vaut 5', CX, 500, 76 * zoom(T, t5b, .3), CRAIE.ok);
      tab.maj(); return;
    }
    /* l'accroche : ce que la copine a écrit */
    if (T >= t12405) ecrire(c, nbE(12405), CX, 150, 128 * zoom(T, t12405, .35), CRAIE.blanc);
    if (T >= tEcrit) sommeCraie(c, CX, 400, TERMES, T, { taille: 62 });
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Ma copine décompose'), a0(nbE(12405) + '.')], [a0('Elle écrit')],
      [a0(nbE(10000) + ' + ' + nbE(2000) + ' + ' + nbE(400) + ' + 50.')]),
    ...suiteDe(q, 60, 62, [a1('Cinquante ?')], [a1('Le dernier chiffre est 5 :')], [a1('il vaut 5.')]),
    ...suiteDe(com, 60, 62, [a3('Une colonne de décalage,')], [a3('et le compte est faux !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : décompose ' + nbE(70804) + '.')], [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Que vaut le dernier chiffre'), qd('de ' + nbE(12405) + ' ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Le 5 est tout à droite :'), r2 = rd('il vaut 5 unités.'), r3 = rd("Il n'y a aucune dizaine.");
  const tB = mot('02b-reponse', 'A');

  const mini = ardoiseMini([[nbE(12405), '#f8f9fa'], ['… + 400 + 50 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, 'Le dernier chiffre :<br>50 ou 5 ?' + PARI, mini);

  return {
    clips, FIN, titre: 'Le 5 vaut 50 ou 5 ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 0, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['5 unités', tq('A'), tq('5', 1)], ['50', tq('B'), tq('50')], ['5 dizaines', tq('C'), tq('5', 2)]],
      tete: [[r + .1, 'Réponse '], [tB, 'A !']], reponse: [r1, r2], suite: [r3],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) g.montre();
      else if (T < q) { T < t5b ? g.oups() : g.montre(); }
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tFaux ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
