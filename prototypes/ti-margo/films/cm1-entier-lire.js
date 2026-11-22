/* ============================================================
   Série NOMBRES ENTIERS CM1 — ÉPISODE 01 (lire) : « HUIT MILLE NEUF », OÙ VA LE NEUF ?
   Outils : films/cm1-commun.js + cm1-entier.js. Ceinture BLANCHE.
   Le copain de Ti Margo écrit « huit mille neuf » et pose 8 900 : son 9 est tombé dans les
   CENTAINES. Question : « huit mille neuf », ça s'écrit comment ? A : 8 009 (bonne réponse).
   Les deux zéros gardent la place des centaines et des dizaines.
   Commentaire : écris « soixante mille quarante » en chiffres.
   ⚠️ Nombres à espace partout : marquesEntiers() remet UNE marque par nombre, et le texte écrit
   porte l'espace fine INSÉCABLE (ESP) pour que voixDe n'y voie qu'un seul mot.
   ============================================================ */
FILMS['lire'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 7.80, '01-oups': 4.34, '02-question': 14.22, '02b-reponse': 6.13, '03-fin': 3.77, '04-commentaire': 6.80, '05-abonne': 6.05 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  /* Les instants dont le dessin a besoin */
  const tEcrit = mot('00-accroche', 'écrit'), tTableau = mot('00-accroche', 'tableau'), t8900 = mot('00-accroche', '8 900');
  const tCents = mot('01-oups', 'cents'), tMeme = mot('01-oups', 'même');
  const tZero = mot('03-fin', 'zéro'), tNombre = mot('03-fin', 'nombre'), tTaille = mot('03-fin', 'taille');
  const tSoixante = mot('04-commentaire', 'soixante'), tChiffres = mot('04-commentaire', 'chiffres'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const CX = 528, YH = 230, LIGNE1 = 490, LIGNE2 = 600;

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : écris « soixante mille quarante » */
      const g = tableauCraie(c, CX, 260, { w: 130, h: 150, ban: false, u: 1 });
      if (T >= tChiffres) for (let i = 0; i < g.n; i++) ecrire(c, '?', g.x(i), g.yc, 96 * zoom(T, tChiffres + i * .07, .4), CRAIE.jaune);
      if (T >= tSoixante) ecrire(c, '« soixante mille quarante »', CX, 540, 58 * zoom(T, tSoixante, .3), CRAIE.jaune);
      tab.maj(); return;
    }
    if (T >= ouf) { /* la bonne écriture : 8 009, les deux zéros gardent la place */
      const g = tableauCraie(c, CX, YH, { w: 130, h: 150, u: 1 });
      /* le 8 et le 9 sont là d'emblée ; les deux zéros arrivent au mot « zéro » */
      chiffresCraie(c, g, '8009', { coul: CRAIE.ok, zeros: CRAIE.ret, z: (j) => (j === 0 || j === 3 ? 1 : zoom(T, tZero, .35)) });
      if (T >= tZero) { cadreCase(c, g, 3, CRAIE.ret, zoom(T, tZero, .4)); cadreCase(c, g, 4, CRAIE.ret, zoom(T, tZero + .12, .4)); }
      if (T >= tNombre) ecrire(c, nbE(8009), 340, LIGNE1, 92 * zoom(T, tNombre, .3), CRAIE.ok);
      if (T >= tTaille) ecrire(c, '≠ ' + nbE(8900), 740, LIGNE1, 92 * zoom(T, tTaille, .3), CRAIE.faux);
      tab.maj(); return;
    }
    /* l'accroche et l'oups : le tableau se trace colonne par colonne, puis ce que le copain a écrit */
    const u = entre(T, tEcrit, tTableau);
    if (u <= 0) { tab.maj(); return; }
    const g = tableauCraie(c, CX, YH, { w: 130, h: 150, u });
    if (T >= t8900) {
      chiffresCraie(c, g, '8900', { coul: CRAIE.faux, z: (j) => zoom(T, t8900 + (3 - j) * .08, .4) });
      ecrire(c, nbE(8900), CX, LIGNE1, 92 * zoom(T, t8900 + .3, .3), CRAIE.faux);
    }
    if (T >= sur) { /* le 9 est tombé dans les CENTAINES */
      if (T >= tCents) { cadreCase(c, g, 3, CRAIE.ret, zoom(T, tCents, .4)); ecrire(c, '9 centaines ?', CX, LIGNE2, 64 * zoom(T, tCents, .3), CRAIE.ret); }
      croixCraie(c, 830, LIGNE1, 46, entre(T, tMeme, tMeme + .35));
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain écrit')], [a0('« huit mille neuf »'), a0('sur le tableau.')],
      [a0('Il écrit ' + nbE(8900) + '.')]),
    ...suiteDe(q, 60, 62, [a1('Huit mille neuf cents ?')], [a1("Ce n'est pas"), a1('le même nombre !')]),
    ...suiteDe(com, 60, 62, [a3('Un zéro oublié,')], [a3('et le nombre'), a3('change de taille !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : écris')], [a4('« soixante mille quarante »'), a4('en chiffres.')],
      [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('« Huit mille neuf »,'), qd("ça s'écrit comment ?")];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Neuf unités :'), r2 = rd('deux zéros gardent'), r3 = rd('les centaines et les dizaines.');
  const tB = mot('02b-reponse', 'A');

  const mini = ardoiseMini([['« huit mille neuf »', '#ffd43b'], [nbE(8900) + ' ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, 'Huit mille neuf :<br>' + nbE(8009) + ' ou ' + nbE(8900) + ' ?' + PARI, mini);

  return {
    clips, FIN, titre: 'Où va le neuf ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 0, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [[nbE(8009), tq('A'), tq('8 009')], [nbE(8090), tq('B'), tq('8 090')], [nbE(8900), tq('C'), tq('8 900')]],
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
      else if (T < com) { T < tNombre ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
