/* ============================================================
   Série NOMBRES ENTIERS CM1 — ÉPISODE 05 (multiples) : 35 BILLES PAR PAQUETS DE 4
   Outils : films/cm1-commun.js + cm1-entier.js. Ceinture BLANCHE.
   La copine de Ti Margo range 35 billes par paquets de 4 et dit « ça tombe juste ! ». On compte
   4, 8, 12 … 32 : huit paquets pleins, et il en RESTE 3. Question : lequel est un multiple de 4 ?
   B : 32. Commentaire : combien de paquets de 6 avec 54 billes ?
   ⚠️ marquesEntiers() : « 35 billes » et « 54 billes » portent deux marques identiques (WinRT pose
   une marque par mot dit) ; les nombres écrits prennent l'espace fine INSÉCABLE (nbE).
   ⛔ Cet épisode est CM1 SEUL (pas de `aussi`) : le CM2 a le sien, sur les critères de 3 et de 9.
   ============================================================ */
FILMS['multiple'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 8.01, '01-oups': 6.22, '02-question': 13.39, '02b-reponse': 8.48, '03-fin': 3.46, '04-commentaire': 6.83, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  /* ⚠️ marquesEntiers() SÉPARE le nombre du mot qui lui est collé (« 35 billes » devient deux
     marques, « 35 » puis « billes ») ET retire l'espace des milliers : on demande « 35 », pas
     « 35 billes » — sinon « mot introuvable » et la page ne démarre pas. */
  const tRange = mot('00-accroche', 'range'), t35 = mot('00-accroche', '35'),
        tPaquets = mot('00-accroche', 'paquets'), tQuatre = mot('00-accroche', '4'),
        tDit = mot('00-accroche', 'dit'), tJuste = mot('00-accroche', 'juste');
  const tCompte = mot('01-oups', 'compte'), tC4 = mot('01-oups', '4'), tC8 = mot('01-oups', '8'),
        tC12 = mot('01-oups', '12'), tC32 = mot('01-oups', '32'),
        tReste = mot('01-oups', 'reste'), tTrois = mot('01-oups', '3');
  const tMult = mot('03-fin', 'multiple'), tRien = mot('03-fin', 'RIEN');
  const tCombien = mot('04-commentaire', 'combien'), tSix = mot('04-commentaire', '6'),
        t54 = mot('04-commentaire', '54'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Ma') - .08;

  const CX = 528;

  /* ── LES BILLES RANGÉES EN PAQUETS ────────────────────────────────────────────────────────────
     n billes, par paquets de `par`. Les paquets pleins sont en grille ; le RESTE est posé à part,
     en rouge, pour qu'on voie d'un coup d'œil qu'il déborde.
     `vues` = combien de billes sont déjà posées, `boites` = combien de cadres sont déjà tracés. */
  function billesCraie(c, cx, y, n, par, { vues = n, boites = 0, colsG = 4, r = 17, gap = 9, pad = 11, gapG = 24, decalReste = 0, coul = CRAIE.jaune, coulR = CRAIE.faux } = {}) {
    const nG = Math.floor(n / par), rst = n % par;
    const cg = par <= 4 ? 2 : 3, lg = Math.ceil(par / cg);
    const w = cg * 2 * r + (cg - 1) * gap + 2 * pad, h = lg * 2 * r + (lg - 1) * gap + 2 * pad;
    const nCol = Math.min(colsG, nG), nLig = Math.ceil(nG / colsG) || 1;
    const L = nCol * w + (nCol - 1) * gapG, x0 = cx - L / 2;
    const bx = (i) => x0 + (i % colsG) * (w + gapG), by = (i) => y + Math.floor(i / colsG) * (h + gapG);
    const bille = (x, y2, cc) => {
      c.fillStyle = cc; c.beginPath(); c.arc(x, y2, r, 0, 7); c.fill();
      c.fillStyle = 'rgba(255,255,255,.55)'; c.beginPath(); c.arc(x - r * .3, y2 - r * .3, r * .28, 0, 7); c.fill();
    };
    let k = 0;
    for (let i = 0; i < nG; i++) {
      for (let j = 0; j < par; j++, k++) {
        if (k >= vues) break;
        const cx2 = bx(i) + pad + r + (j % cg) * (2 * r + gap);
        const cy2 = by(i) + pad + r + Math.floor(j / cg) * (2 * r + gap);
        bille(cx2, cy2, coul);
      }
    }
    c.strokeStyle = CRAIE.ok; c.lineWidth = 6; c.setLineDash([]);
    for (let i = 0; i < Math.min(nG, boites); i++) {
      c.beginPath(); c.roundRect(bx(i), by(i), w, h, 12); c.stroke();
    }
    const basGrille = y + nLig * h + (nLig - 1) * gapG;
    const yR = basGrille + 42 + decalReste;
    const xR = cx - (rst * 2 * r + (rst - 1) * gap) / 2;
    for (let j = 0; j < rst; j++, k++) if (k < vues) bille(xR + r + j * (2 * r + gap), yR + r, coulR);
    return { bas: yR + 2 * r, basGrille, yReste: yR + r, xReste: cx,
             largeReste: rst * 2 * r + (rst - 1) * gap, nG, rst,
             boiteX: (i) => bx(i) + w / 2, boiteBas: (i) => by(i) + h };
  }

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : combien de paquets de 6 avec 54 billes ? */
      if (T >= t54) ecrire(c, nbE(54) + ' billes', CX, 200, 104 * zoom(T, t54, .35), CRAIE.blanc);
      if (T >= tSix) ecrire(c, 'paquets de 6 :  ___', CX, 420, 76 * zoom(T, tSix, .3), CRAIE.jaune);
      tab.maj(); return;
    }
    if (T >= ouf) { /* un multiple : il ne reste RIEN */
      const b = billesCraie(c, CX, 180, 32, 4, { boites: 8 });
      if (T >= tRien) {
        /* le ✓ est DANS la chaîne : posé à part, il frôlait le « i » de « il » (vu à l'image) */
        ecrire(c, '✓  il ne reste RIEN !', CX, b.bas + 110, 72 * zoom(T, tRien, .3), CRAIE.ok);
      } else if (T >= tMult) {
        ecrire(c, '32 = 8 paquets de 4', CX, b.bas + 110, 64 * zoom(T, tMult, .3), CRAIE.blanc);
      }
      tab.maj(); return;
    }
    if (T >= sur) { /* on compte 4, 8, 12 … 32, et il en reste 3 */
      /* ⛔ Vu seulement À L'IMAGE : les comptes écrits sous CHAQUE boîte tombaient sur la rangée du
         dessous (« 4 », « 8 », « 12 » à cheval sur les boîtes), et « 32 » touchait « il en reste 3 ! ».
         La suite s'écrit maintenant sur UNE ligne, sous la grille, à des places FIXES : un terme qui
         arrive ne déplace aucun autre. Et le reste descend, le texte passe SOUS le cercle. */
      const b = billesCraie(c, CX, 110, 35, 4, { boites: 8, decalReste: 100 });
      const SUITE = [['4', tC4], ['8', tC8], ['12', tC12], ['…', tC12], ['32', tC32]];
      c.font = '800 50px "Segoe UI"';
      const larg = SUITE.map(([t]) => c.measureText(t).width), gapS = 34;
      const L = larg.reduce((a, v) => a + v, 0) + gapS * (SUITE.length - 1);
      let xs = CX - L / 2;
      SUITE.forEach(([txt, t], i) => {
        if (T >= t) ecrire(c, txt, xs + larg[i] / 2, b.basGrille + 48, 50 * zoom(T, t, .25),
                           txt === '…' ? CRAIE.gris : CRAIE.ok);
        xs += larg[i] + gapS;
      });
      if (T >= tTrois) {
        cercle(c, b.xReste, b.yReste, b.largeReste / 2 + 26, CRAIE.faux, entre(T, tTrois, tTrois + .35));
        ecrire(c, 'il en reste 3 !', CX, b.bas + 96, 62 * zoom(T, tTrois, .3), CRAIE.faux);
      } else if (T >= tReste) {
        ecrire(c, 'et il en reste…', CX, b.bas + 96, 56 * zoom(T, tReste, .3), CRAIE.faux);
      }
      tab.maj(); return;
    }
    /* l'accroche : 35 billes, des paquets de 4, « ça tombe juste ! » */
    const vues = T < t35 ? 0 : Math.round(35 * entre(T, t35, t35 + .9));
    const bo = T < tQuatre ? 0 : Math.round(8 * entre(T, tQuatre, tQuatre + .8));
    const b = billesCraie(c, CX, 110, 35, 4, { vues, boites: bo, decalReste: 100 });
    if (T >= tPaquets) ecrire(c, 'par paquets de 4', CX, 70, 54 * zoom(T, tPaquets, .3), CRAIE.jaune);
    if (T >= tJuste) ecrire(c, 'ça tombe juste ?', CX, b.bas + 110, 70 * zoom(T, tJuste, .3), CRAIE.faux);
    else if (T >= tDit) ecrire(c, 'elle dit…', CX, b.bas + 110, 58 * zoom(T, tDit, .3), CRAIE.gris);
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Ma copine range ' + nbE(35) + ' billes'), a0('par paquets de 4.')],
      [a0('Elle dit :'), a0('ça tombe juste !')]),
    ...suiteDe(q, 60, 60, [a1('On compte : 4, 8, 12… 32,')], [a1('et il en reste 3 !')]),
    ...suiteDe(com, 60, 62, [a3("Un multiple, c'est quand")], [a3('il ne reste RIEN !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : combien de paquets de 6')], [a4('avec ' + nbE(54) + ' billes ?')],
      [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Lequel est un multiple de 4 ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('4 fois 8 donne 32.'), r2 = rd("Ni 34 ni 35 n'est dans la table de 4.");
  const tB = mot('02b-reponse', 'B');

  const mini = ardoiseMini([[nbE(35) + ' billes', '#f8f9fa'], ['paquets de 4 ?', '#ff8787']]);
  poserMiniature(outils, acc + 1, nbE(35) + ' billes par paquets de 4 :<br>ça tombe juste ?' + PARI, mini);

  return {
    clips, FIN, titre: '35, multiple de 4 ?', ceinture: 0,
    finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 1, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['35', tq('A'), tq('35')], ['32', tq('B'), tq('32')], ['34', tq('C'), tq('34')]],
      tete: [[r + .1, 'Réponse '], [tB, 'B !']], reponse: [r1], suite: [r2],
    },
    jouer(P, T, cam) {
      const g = gestes(P, T); dessiner(T);
      const dansQ = T >= q && T < ouf, dansF = T >= f, gros = T < finTitre;
      tab.g.visible = !gros && !dansQ && !dansF && !window.MINI;
      cadrer(cam, { gros, large: dansQ || dansF });

      if (T < acc + 1.4) g.salut(T - acc, 1.4);
      else if (gros) g.fier();
      else if (T < sur) { T < tJuste ? g.montre() : g.oups(); }
      else if (T < q) { T < tTrois ? g.montre() : g.oups(); }
      else if (T < r) g.reflechit();
      else if (T < ouf) { T < tB ? g.ouvre() : g.fier(); }
      else if (T < com) { T < tRien ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
