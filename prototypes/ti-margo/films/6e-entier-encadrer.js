/* ============================================================
   Série NOMBRES ENTIERS 6e — ÉPISODE 03 (encadrer) : 752, ENTRE 750 ET 751 ?
   Outils : films/6e-commun.js + 6e-entier.js. Ceinture BLANCHE.
   La copine de Ti Margo encadre 752 entre deux dizaines et écrit 751 et 761 : elle a pris les
   voisins au lieu des dizaines. Question : entre quelles dizaines se trouve 752 ? A : 750 et 760.
   Une dizaine finit toujours par zéro.
   Commentaire : encadre 7 755 entre deux centaines consécutives.
   ⚠️ marquesEntiers() en tête (le piège n° 16) ; nbE() pour les nombres à espace du texte écrit.
   ============================================================ */
FILMS['encadrer'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 9.94, '01-oups': 3.30, '02-question': 18.27, '02b-reponse': 10.37, '03-fin': 3.04, '04-commentaire': 8.15, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const tEncadre = mot('00-accroche', 'encadre'), t752 = mot('00-accroche', '752');
  const t751 = mot('00-accroche', '751'), t761 = mot('00-accroche', '761');
  const tZeroFaux = mot('01-oups', 'zéro');
  const tRonds = mot('03-fin', 'ronds'), tNombres = mot('03-fin', 'nombres');
  const t7755 = mot('04-commentaire', '7 755'), tCent = mot('04-commentaire', 'centaines'),
        tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Ma') - .08;

  const CX = 528, LIGNE1 = 250, LIGNE2 = 430, LIGNE3 = 560;

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : encadrer 7 755 entre deux centaines */
      if (T >= t7755) ecrire(c, nbE(7755), CX, 240, 112 * zoom(T, t7755, .35), CRAIE.jaune);
      if (T >= tCent) {
        ecrire(c, '?', 250, 470, 96 * zoom(T, tCent, .35), CRAIE.r0);
        ecrire(c, '<', 390, 470, 72, CRAIE.gris);
        ecrire(c, nbE(7755), 528, 470, 72 * zoom(T, tCent, .3), CRAIE.jaune);
        ecrire(c, '<', 680, 470, 72, CRAIE.gris);
        ecrire(c, '?', 810, 470, 96 * zoom(T, tCent + .12, .35), CRAIE.ok);
      }
      tab.maj(); return;
    }
    if (T >= ouf) { /* la bonne réponse : les deux dizaines, qui finissent par zéro */
      const d = droiteCraie(c, CX, 300, 750, 760, { n: 10, larg: 700, u: entre(T, ouf, ouf + .4) });
      if (T >= tNombres) {
        repereCraie(c, d, 752, '752', CRAIE.jaune, 52, zoom(T, tNombres, .3));
        ecrire(c, '750', d.x(750), d.y + 62, 54 * zoom(T, tNombres, .3), CRAIE.r0);
        ecrire(c, '760', d.x(760), d.y + 62, 54 * zoom(T, tNombres, .3), CRAIE.ok);
      }
      if (T >= tRonds) ecrire(c, 'ils finissent par 0', CX, 500, 62 * zoom(T, tRonds, .3), CRAIE.ok);
      tab.maj(); return;
    }
    /* l'accroche et l'oups : 752, puis l'encadrement faux 751 et 761 */
    if (T < tEncadre) { tab.maj(); return; }
    if (T >= t752) ecrire(c, '752', CX, LIGNE1, 118 * zoom(T, t752, .35), CRAIE.jaune);
    if (T >= t751) {
      ecrire(c, '751', 360, LIGNE2, 92 * zoom(T, t751, .35), CRAIE.faux);
      if (T >= t761) {
        ecrire(c, 'et', CX, LIGNE2, 62, CRAIE.gris);
        ecrire(c, '761', 700, LIGNE2, 92 * zoom(T, t761, .35), CRAIE.faux);
      }
    }
    if (T >= sur) { /* une dizaine finit par zéro : les deux bornes sont fausses */
      croixCraie(c, 360, LIGNE2, 44, entre(T, tZeroFaux, tZeroFaux + .3));
      croixCraie(c, 700, LIGNE2, 44, entre(T, tZeroFaux + .15, tZeroFaux + .45));
      if (T >= tZeroFaux) ecrire(c, 'une dizaine finit par 0', CX, LIGNE3, 58 * zoom(T, tZeroFaux, .3), CRAIE.ret);
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Ma copine encadre 752')], [a0('entre deux dizaines.')],
      [a0('Elle écrit 751 et 761.')]),
    ...suiteDe(q, 60, 62, [a1('Mais une dizaine')], [a1('finit toujours par zéro !')]),
    ...suiteDe(com, 60, 62, [a3("Encadrer, c'est")], [a3('avec des nombres ronds !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : encadre ' + nbE(7755))], [a4('entre deux centaines'), a4('consécutives.')],
      [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Entre quelles dizaines'), qd('se trouve 752 ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Juste avant : 750.'), r2 = rd('Juste après : 760.'), r3 = rd('Les deux finissent par zéro.');
  const tB = mot('02b-reponse', 'A');

  const mini = ardoiseMini([['752', '#ffd43b'], ['751 et 761 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, '752 entre deux dizaines :<br>750 ou 751 ?' + PARI, mini);

  return {
    clips, FIN, titre: '752 : 750 ou 751 ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 0, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['750 et 760', tq('A'), tq('750')], ['751 et 761', tq('B'), tq('751')],
              ['700 et 800', tq('C'), tq('700')]],
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
      else if (T < q) g.oups();
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tRonds ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
