/* ============================================================
   Série NOMBRES ENTIERS CM1 — ÉPISODE 04 (arrondir) : 4 682 → 4 600 OU 4 700 ?
   Outils : films/cm1-commun.js + cm1-entier.js. Ceinture BLANCHE.
   La copine de Ti Margo arrondit 4 682 à la centaine en COUPANT la fin : 4 600. Sur la droite
   graduée, 4 682 est pourtant bien plus près de 4 700. Question : ça donne ? C : 4 700.
   Commentaire : arrondis 23 249 au millier près.
   ⚠️ marquesEntiers() : « 4 682 à » et « 4 682 est » ont six marques identiques dont la dernière
   est le mot collé. Les nombres écrits portent l'espace fine INSÉCABLE.
   ============================================================ */
FILMS['arrondir'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 9.25, '01-oups': 4.91, '02-question': 17.25, '02b-reponse': 6.34, '03-fin': 4.59, '04-commentaire': 6.96, '05-abonne': 6.05 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  const tArrondit = mot('00-accroche', 'arrondit'), t4682 = mot('00-accroche', '4 682'),
        tCoupe = mot('00-accroche', 'coupe'), t4600 = mot('00-accroche', '4 600');
  const tMais = mot('01-oups', 'Mais'), tPres = mot('01-oups', 'près'), t4700 = mot('01-oups', '4 700');
  const tCouper = mot('03-fin', 'couper'), tChoisir = mot('03-fin', 'choisir'), tProche = mot('03-fin', 'proche');
  const tArrondis = mot('04-commentaire', 'arrondis'), t23249 = mot('04-commentaire', '23 249'),
        tMillier = mot('04-commentaire', 'millier'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Ma') - .08;

  const CX = 528, YD = 400, LARG = 790;

  /* La droite 4 600 → 4 700, ses bornes, et le nombre posé dessus */
  function droite(T, { milieu = false, borneD = false, u = 1 }) {
    const c = tab.c;
    const d = droiteCraie(c, CX, YD, 4600, 4700, { n: 10, larg: LARG, milieu, u });
    if (u < 1) return d;
    ecrire(c, nbE(4600), d.x(4600), YD + 62, 46, CRAIE.r0);
    if (borneD) ecrire(c, nbE(4700), d.x(4700), YD + 62, 46, CRAIE.ret);
    if (T >= t4682) repereCraie(c, d, 4682, nbE(4682), CRAIE.jaune, 52, zoom(T, t4682, .35));
    return d;
  }

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : arrondis 23 249 au millier */
      if (T >= t23249) ecrire(c, nbE(23249), CX, 240, 128 * zoom(T, t23249, .35), CRAIE.blanc);
      if (T >= tMillier) ecrire(c, 'au millier :  ___', CX, 470, 76 * zoom(T, tMillier, .3), CRAIE.jaune);
      tab.maj(); return;
    }
    if (T >= ouf) { /* arrondir, c'est choisir le PLUS PROCHE */
      const d = droite(T, { milieu: true, borneD: true });
      if (T >= tCouper) { ecrire(c, 'couper', 210, 150, 60, CRAIE.faux); barrerCraie(c, 210, 150, 190, entre(T, tCouper, tCouper + .35), CRAIE.faux); }
      if (T >= tChoisir) flecheCraie(c, d, 4682, 4700, 126, CRAIE.ok, entre(T, tChoisir, tChoisir + .5));
      if (T >= tProche) ecrire(c, 'le plus proche !', CX, 600, 64 * zoom(T, tProche, .3), CRAIE.ok);
      tab.maj(); return;
    }
    if (T >= sur) { /* 4 682 est tout près de 4 700 */
      const d = droite(T, { milieu: true, borneD: T >= t4700 });
      if (T >= tPres) flecheCraie(c, d, 4682, 4700, 126, CRAIE.ok, entre(T, tPres, tPres + .5));
      if (T >= t4700) ecrire(c, 'tout près !', CX + 150, 620, 60 * zoom(T, t4700, .3), CRAIE.ok);
      tab.maj(); return;
    }
    /* l'accroche : la copine coupe la fin */
    const d = droite(T, { u: entre(T, tArrondit, tArrondit + .6) });
    if (T >= tCoupe) ecrire(c, 'on coupe la fin ?', CX, 150, 58 * zoom(T, tCoupe, .3), CRAIE.faux);
    if (T >= t4600) {
      ecrire(c, nbE(4600) + ' ?', CX, 600, 76 * zoom(T, t4600, .3), CRAIE.faux);
      cercle(c, d.x(4600), YD + 62, 70, CRAIE.faux, entre(T, t4600, t4600 + .35));
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Ma copine arrondit'), a0(nbE(4682) + ' à la centaine.')],
      [a0('Elle coupe la fin :'), a0(nbE(4600) + '.')]),
    ...suiteDe(q, 60, 62, [a1('Mais ' + nbE(4682) + ' est'), a1('tout près de ' + nbE(4700) + ' !')]),
    ...suiteDe(com, 60, 60, [a3("Arrondir, ce n'est pas couper :")], [a3("c'est choisir le plus proche !")]),
    ...suiteDe(f, 60, 58, [a4('À toi : arrondis ' + nbE(23249))], [a4('au millier près.')],
      [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd(nbE(4682) + ' arrondi à la centaine près,'), qd('ça donne ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('Le chiffre des dizaines est 8 :'), r2 = rd('on monte à ' + nbE(4700) + '.');
  const tB = mot('02b-reponse', 'C');

  const mini = ardoiseMini([[nbE(4682) + '  →', '#f8f9fa'], [nbE(4600) + ' ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, nbE(4682) + ' à la centaine :<br>' + nbE(4600) + ' ou ' + nbE(4700) + ' ?' + PARI, mini);

  return {
    clips, FIN, titre: nbE(4682) + ' : ' + nbE(4600) + ' ou ' + nbE(4700) + ' ?', ceinture: 0,
    finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 2, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [[nbE(4600), tq('A'), tq('4 600')], [nbE(4680), tq('B'), tq('4 680')], [nbE(4700), tq('C'), tq('4 700')]],
      tete: [[r + .1, 'Réponse '], [tB, 'C !']], reponse: [r1], suite: [r2],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) { T < tCoupe ? g.montre() : g.oups(); }
      else if (T < q) g.montre();
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tProche ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
