/* ============================================================
   Série NOMBRES ENTIERS CM1 — ÉPISODE 06 (le défi) : LE PLUS GRAND CODE AVEC 7, 4, 1 ET 0
   Outils : films/cm1-commun.js + cm1-entier.js. Ceinture BLANCHE (la paysage, elle, est BLEUE).
   Le copain de Ti Margo cherche le plus grand code à quatre chiffres avec 7, 4, 1 et 0, et tape
   0 741 : le zéro devant fait perdre un chiffre, il ne reste que 741. Question : A : 7 410.
   Commentaire : le plus petit nombre de quatre chiffres avec 0, 5, 3 et 8.
   ⚠️ marquesEntiers() sépare le nombre du mot collé (« 1 et » → « 1 » puis « et ») et retire
   l'espace des milliers : on demande `mot(..., '7 410')`, que `norme()` ramène à « 7410 ».
   ============================================================ */
FILMS['defi'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 6.88, '01-essai': 4.91, '02-question': 16.66, '02b-reponse': 8.56, '03-fin': 3.62, '04-commentaire': 8.20, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-essai': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const tCode = mot('00-accroche', 'code'),
        tA7 = mot('00-accroche', '7'), tA4 = mot('00-accroche', '4'),
        tA1 = mot('00-accroche', '1'), tA0 = mot('00-accroche', '0');
  const tGrand = mot('01-essai', 'grand'), tTape = mot('01-essai', 'tape'),
        tZero = mot('01-essai', '0'), t741 = mot('01-essai', '741');
  const tZeroD = mot('03-fin', 'zéro'), tDevant = mot('03-fin', 'devant'),
        tPerd = mot('03-fin', 'perd'), tChiffre = mot('03-fin', 'chiffre');
  const tPetit = mot('04-commentaire', 'petit'),
        tC0 = mot('04-commentaire', '0'), tC5 = mot('04-commentaire', '5'),
        tC3 = mot('04-commentaire', '3'), tC8 = mot('04-commentaire', '8'),
        tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const CX = 528;

  /* ── LES ÉTIQUETTES-CHIFFRES DU DÉFI ──────────────────────────────────────────────────────────
     Une case par chiffre, le chiffre dedans. (cx, y) = le milieu du HAUT de la rangée.
     `vues` = combien de cases sont déjà posées ; `barree` = l'indice d'une case barrée en rouge. */
  function tuilesCraie(c, cx, y, chiffres, { vues = chiffres.length, w = 112, h = 142, gap = 20, coul = CRAIE.jaune, barree = -1, taille = 92 } = {}) {
    const n = chiffres.length, L = n * w + (n - 1) * gap, x0 = cx - L / 2;
    const X = (i) => x0 + i * (w + gap) + w / 2;
    c.setLineDash([]); c.lineWidth = 7;
    for (let i = 0; i < Math.min(n, vues); i++) {
      const cc = i === barree ? CRAIE.faux : coul;
      c.strokeStyle = cc;
      c.beginPath(); c.roundRect(x0 + i * (w + gap), y, w, h, 14); c.stroke();
      ecrire(c, String(chiffres[i]), X(i), y + h / 2, taille, cc);
    }
    return { x: X, yc: y + h / 2, bas: y + h, gauche: x0, droite: x0 + L };
  }

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : le plus petit avec 0, 5, 3 et 8 */
      const vus = [tC0, tC5, tC3, tC8].filter((t) => T >= t).length;
      tuilesCraie(c, CX, 180, [0, 5, 3, 8], { vues: vus });
      if (T >= tPetit) ecrire(c, 'le plus petit :  ____', CX, 470, 68 * zoom(T, tPetit, .3), CRAIE.jaune);
      tab.maj(); return;
    }
    if (T >= ouf) { /* un zéro devant, et le nombre perd un chiffre */
      const t = tuilesCraie(c, CX, 150, [0, 7, 4, 1], { barree: T >= tZeroD ? 0 : -1 });
      if (T >= tDevant) croixCraie(c, t.x(0), t.yc, 52, entre(T, tDevant, tDevant + .35));
      if (T >= tPerd) ecrire(c, '741 — trois chiffres !', CX, t.bas + 96, 64 * zoom(T, tPerd, .3), CRAIE.faux);
      if (T >= tChiffre) ecrire(c, 'un chiffre en moins', CX, t.bas + 186, 56 * zoom(T, tChiffre, .3), CRAIE.gris);
      tab.maj(); return;
    }
    if (T >= sur) { /* il veut le plus grand, et il tape 0 741 */
      if (T >= tGrand) ecrire(c, 'le plus grand ?', CX, 80, 58 * zoom(T, tGrand, .3), CRAIE.jaune);
      const vus = T < tZero ? 0 : (T < t741 ? 1 : 4);
      const t = tuilesCraie(c, CX, 160, [0, 7, 4, 1], { vues: vus, coul: T >= t741 ? CRAIE.faux : CRAIE.jaune });
      if (T >= t741 + 1.0) ecrire(c, '0 741 ?', CX, t.bas + 96, 70 * zoom(T, t741 + 1.0, .3), CRAIE.faux);
      tab.maj(); return;
    }
    /* l'accroche : un code à quatre chiffres avec 7, 4, 1 et 0 */
    if (T >= tCode) ecrire(c, 'un code à quatre chiffres', CX, 80, 56 * zoom(T, tCode, .3), CRAIE.blanc);
    const vus = [tA7, tA4, tA1, tA0].filter((t) => T >= t).length;
    tuilesCraie(c, CX, 180, [7, 4, 1, 0], { vues: vus });
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-essai'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain cherche un code')], [a0('à quatre chiffres avec 7, 4, 1 et 0.')]),
    ...suiteDe(q, 60, 62, [a1('Il veut le plus grand.')], [a1('Il tape 0 741 !')]),
    ...suiteDe(com, 60, 62, [a3('Un zéro devant,')], [a3('et le nombre perd un chiffre !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : le plus petit nombre')],
      [a4('de quatre chiffres avec 0, 5, 3 et 8 ?')], [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Quel est le plus grand nombre'), qd('avec 7, 4, 1 et 0 ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Du plus grand chiffre au plus petit :'), r2 = rd('7, 4, 1, 0.'), r3 = rd('Donc ' + nbE(7410) + '.');
  const tB = mot('02b-reponse', 'A');

  const mini = ardoiseMini([['0 741 ?', '#ff8787'], [nbE(7410), '#8ce99a']]);
  poserMiniature(outils, acc + 1, 'Le plus grand avec<br>7, 4, 1 et 0 ?' + PARI, mini);

  return {
    clips, FIN, titre: 'Le plus grand : 0 741 ?', ceinture: 0,
    finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 0, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [[nbE(7410), tq('A'), tq('7 410')], [nbE(1047), tq('B'), tq('1 047')], [nbE(4710), tq('C'), tq('4 710')]],
      tete: [[r + .1, 'Réponse '], [tB, 'A !']], reponse: [r1], suite: [r2, r3],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) g.montre();
      else if (T < q) { T < t741 ? g.montre() : g.oups(); }
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tPerd ? g.oups() : g.montre(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
