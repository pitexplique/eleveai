/* ============================================================
   Série NOMBRES ENTIERS 6e — ÉPISODE 01 (rang) : DANS 7 305, LE 3 OU LE 0 ?
   Outils : films/6e-commun.js + 6e-entier.js. Ceinture BLANCHE.
   Le copain de Ti Margo cherche le chiffre des DIZAINES de 7 305 et pointe le 3 : il a compté
   de GAUCHE à droite. Question : dans 7 305, quel est le chiffre des dizaines ? B : 0 (bonne).
   Les rangs se comptent en partant de la DROITE : 5 unités, puis 0 dizaine.
   Commentaire : dans 9 261, quel est le chiffre des unités de mille ?
   ⚠️ Nombres à espace : marquesEntiers() ramène « 7 305 » dit en cinq mots à UNE marque « 7305 »
   (vérifié marque par marque avant d'écrire une ligne), et le texte écrit porte l'espace fine
   INSÉCABLE (nbE) pour que voixDe n'y voie qu'un seul mot.
   ============================================================ */
FILMS['rang'] = function (outils) {
  marquesEntiers();
  const DUR = { '00-accroche': 8.40, '01-oups': 2.69, '02-question': 10.82, '02b-reponse': 8.22, '03-fin': 3.67, '04-commentaire': 8.10, '05-abonne': 6.04 };
  const clips = enchainer(.4, Object.keys(DUR), DUR, { '01-oups': 1.2, '02-question': 3.3, '03-fin': 1.6, '04-commentaire': 1.5 });
  const A = Object.fromEntries(clips), { dit, mot } = voixDe(A);
  const [acc, sur, q, r, ouf, com, f] = clips.map((x) => x[1]), FIN = +(f + DUR['05-abonne'] + .5).toFixed(2);
  const fin = (x) => A[x] + DUR[x];

  poserClasse(); const tab = poserTableau({ L: 4.4, H: 3, x: 0, y: 4.55 });
  outils.panneau.style.display = 'none'; cssCartes();

  /* Les instants dont le dessin a besoin */
  const tCherche = mot('00-accroche', 'cherche'), t7305 = mot('00-accroche', '7 305'), tPointe = mot('00-accroche', 'pointe');
  const tTrois = mot('00-accroche', '3');
  const tCompte = mot('01-oups', 'compté'), tDroiteFaux = mot('01-oups', 'droite');
  const tRangs = mot('03-fin', 'rangs'), tPartant = mot('03-fin', 'partant'), tDroiteOk = mot('03-fin', 'droite');
  const t9261 = mot('04-commentaire', '9 261'), tMille = mot('04-commentaire', 'mille'), tRep = mot('04-commentaire', 'Réponds');
  const finTitre = mot('00-accroche', 'Mon') - .08;

  const CX = 528, YH = 250, H = 170, W = 130, LIGNE = 560;

  /* Les quatre chiffres dans leurs cases (le même dessin que le paysage : une case par rang) */
  function cases4(c, nombre, { vues = 4, coul = CRAIE.blanc, z = 1 } = {}) {
    const g = casesChiffres(c, CX, YH, 4, { vues, w: W, h: H, coul: CRAIE.gris, gap: 16 });
    const ch = String(nombre).split('');
    for (let i = 0; i < Math.min(4, vues); i++) {
      const k = typeof z === 'function' ? z(i) : z;
      if (k > 0) ecrire(c, ch[i], g.x(i), g.yc, 104 * k, typeof coul === 'function' ? coul(i) : coul);
    }
    return g;
  }

  /* Une flèche horizontale à la craie, de x1 vers x2 (elle POUSSE dans le sens de la lecture) */
  function fleche(c, x1, x2, y, coul, u = 1) {
    if (u <= 0) return;
    const xf = x1 + (x2 - x1) * Math.min(1, u), s = Math.sign(x2 - x1) || 1;
    c.strokeStyle = coul; c.lineWidth = 9; c.lineCap = 'round'; c.setLineDash([]);
    c.beginPath(); c.moveTo(x1, y); c.lineTo(xf, y); c.stroke();
    c.fillStyle = coul; c.beginPath();
    c.moveTo(xf + s * 22, y); c.lineTo(xf - s * 8, y - 17); c.lineTo(xf - s * 8, y + 17); c.closePath(); c.fill();
  }

  function dessiner(T) {
    const c = tab.c; tab.effacer();
    if (T >= com) { /* le défi en commentaire : dans 9 261, le chiffre des unités de mille ? */
      const g = cases4(c, '9261', { vues: T >= t9261 ? 4 : 0, z: (i) => zoom(T, t9261 + i * .07, .4) });
      if (T >= tMille) {
        cadreCase(c, { x: g.x, w: W, h: H, yc: g.yc }, 0, CRAIE.jaune, zoom(T, tMille, .4));
        ecrire(c, '?', g.x(0), g.yc + H / 2 + 62, 86 * zoom(T, tMille, .3), CRAIE.jaune);
      }
      tab.maj(); return;
    }
    if (T >= ouf) { /* ce qu'il fallait faire : on part de la DROITE */
      const g = cases4(c, '7305', { vues: T >= tRangs ? 4 : 0 });
      if (T >= tPartant) fleche(c, g.x(3) + W / 2, g.x(0) - W / 2, g.yc + H / 2 + 60, CRAIE.ok, entre(T, tPartant, tPartant + .5));
      if (T >= tDroiteOk) {
        cadreCase(c, { x: g.x, w: W, h: H, yc: g.yc }, 2, CRAIE.ok, zoom(T, tDroiteOk, .4));
        ecrire(c, 'dizaines', g.x(2), g.yc - H / 2 - 52, 54 * zoom(T, tDroiteOk, .3), CRAIE.ok);
      }
      tab.maj(); return;
    }
    /* l'accroche et l'oups : les cases se tracent, 7 305 s'écrit, le copain pointe le 3 */
    const vues = T < tCherche ? 0 : Math.min(4, 1 + Math.floor((T - tCherche) / .18));
    if (vues <= 0) { tab.maj(); return; }
    const g = cases4(c, '7305', { vues, z: (i) => (T >= t7305 ? zoom(T, t7305 + i * .08, .4) : 0) });
    if (T >= tPointe) { /* le doigt du copain, puis le 3 entouré en rouge */
      fleche(c, g.x(1), g.x(1), g.yc + H / 2 + 70, CRAIE.faux, 1);
      if (T >= tTrois) cercle(c, g.x(1), g.yc, 84, CRAIE.faux, entre(T, tTrois, tTrois + .35));
    }
    if (T >= sur) { /* il a compté de GAUCHE à droite : la flèche fautive, barrée */
      if (T >= tCompte) fleche(c, g.x(0) - W / 2, g.x(3) + W / 2, g.yc - H / 2 - 58, CRAIE.faux,
                               entre(T, tCompte, tCompte + .5));
      if (T >= tDroiteFaux) croixCraie(c, CX, g.yc - H / 2 - 58, 42, entre(T, tDroiteFaux, tDroiteFaux + .35));
    }
    tab.maj();
  }

  const a0 = dit('00-accroche'), a1 = dit('01-oups'), a3 = dit('03-fin'), a4 = dit('04-commentaire'),
        qd = dit('02-question'), rd = dit('02b-reponse');
  const groupes = [
    groupe(acc + .1, finTitre, 330, 66, a0('Salut !')),
    ...suiteDe(sur, 60, 60, [a0('Mon copain cherche')], [a0('le chiffre des dizaines'), a0('de ' + nbE(7305) + '.')],
      [a0('Il pointe le 3.')]),
    ...suiteDe(q, 60, 62, [a1('Il a compté')], [a1('de gauche à droite !')]),
    ...suiteDe(com, 60, 62, [a3('Les rangs,')], [a3('ça se compte'), a3('en partant de la droite !')]),
    ...suiteDe(f, 60, 58, [a4('À toi : dans ' + nbE(9261) + ',')], [a4('quel est le chiffre'), a4('des unités de mille ?')],
      [a4('Réponds en commentaire !')]),
  ];
  qd('Question !');
  const phraseQ = [qd('Dans ' + nbE(7305) + ','), qd('quel est le chiffre'), qd('des dizaines ?')];
  const tq = (m, n = 1) => mot('02-question', m, n) - q;
  qd.jusque('Mets'); const pauseQ = [qd('Mets pause, et choisis !')];
  rd.saute(2);
  const r1 = rd('De droite à gauche :'), r2 = rd('5 unités, puis 0 dizaine.'), r3 = rd('La réponse est 0.');
  const tB = mot('02b-reponse', 'B');

  const mini = ardoiseMini([[nbE(7305), '#f8f9fa'], ['dizaines = ?', '#ffd43b']]);
  poserMiniature(outils, acc + 1, 'Dans ' + nbE(7305) + ' :<br>le 3 ou le 0 ?' + PARI, mini);

  return {
    clips, FIN, titre: nbE(7305) + ' : le 3 ou le 0 ?', ceinture: 0, finTitre, groupes, finClip: '05-abonne',
    cuts: [finTitre, sur, q, r, ouf, com, f],
    question: {
      qc: '02-question', rc: '02b-reponse', finR: ouf, cpt: fin('02-question') + .1, bonne: 1, tBon: tB - r,
      phrase: phraseQ, pause: pauseQ,
      choix: [['3', tq('A'), tq('3')], ['0', tq('B'), tq('0')], ['7', tq('C'), tq('7')]],
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
      else if (T < com) { T < tDroiteOk ? g.montre() : g.fier(); }
      else if (T < f) { T < tRep ? g.montre() : g.pouce(); }
      else { T - f < 2.35 ? g.ouvre() : g.pouce(); }

      if (window.MINI) { scene.x = .1; scene.ry = -.12; cam.x = .2; cam.y = 2.62; cam.d = 9.2; cam.e = .04; P.jaw = .62; g.fier(); }
    },
  };
};
