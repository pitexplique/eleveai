/* ============================================================
   Série NOMBRES ENTIERS 6e (lot B) : les shorts en dessin animé.
   Outils communs : films/6e-commun.js (voix mot à mot, ardoise, classe, gestes, miniature) —
   la page charge le commun d'après le PRÉFIXE de la série (`6e-entier` → `6e-commun.js`).
   Chaque film vit dans son fichier, films/6e-entier-<épisode>.js ; ici, le tableau de numération
   à la craie et les objets de la série.
   Code couleur, LE MÊME que dans les paysages (manim/scripts/6e/entier_rang.py) :
     la classe des millions rose, celle des mille violette, celle des unités bleue,
     le zéro qui garde la place en orange.
   ⛔ Ceinture BLANCHE pour les cinq shorts du lot B (la verte est pour les paysages,
      et B5 `defi` est BLEUE en paysage, blanche au short comme les autres).

   ⛔ POURQUOI UNE COPIE ET PAS UN IMPORT de films/cm1-entier.js (21/11/2026)
   `cm1-entier.js` sert SIX films déjà rendus et publiés. Un outil partagé ferait bouger ces six
   films à chaque retouche faite pour la 6e, et un MP4 rendu avec un commun qui a changé devient
   « douteux » pour toujours (manim/REGLES.md, « le SOURCE n'est pas le RÉSULTAT »). Même raison
   que pour `entier_commun.py` côté Manim : on COPIE, on n'importe pas.
   ============================================================ */

/* ── ⚠️ LE PIÈGE DU LOT : les nombres à ESPACE et les marques de WinRT ───────────────────────────
   WinRT pose UNE marque par MOT DIT, mais toutes portent le même texte : « 8 900 » dit en quatre
   mots (« huit mille neuf cents ») donne QUATRE marques « 8 900 » ; « 987 est » en donne quatre
   aussi, dont la dernière est en fait « est ». `voixDe` n'en saute qu'une : la suite se décale.
   On ramène donc chaque série de marques identiques à :
     - le nombre, SANS espace, au PREMIER instant (c'est là qu'il commence à être dit) ;
     - et, si un mot est collé au nombre dans la marque (« 987 est », « 4 140 et »), ce mot au
       DERNIER instant du groupe — c'est bien là qu'il est prononcé.
   ⛔ Dans le TEXTE ÉCRIT, un nombre à espace s'écrit avec une espace fine INSÉCABLE (ESP) :
   `voixDe` coupe sur l'espace ordinaire, et le nombre deviendrait deux mots qui ne s'alignent plus. */
const ESP = ' ';
const nbE = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ESP);
/* 0 avant t0, 1 après t1, entre les deux la montée */
const entre = (T, t0, t1) => Math.max(0, Math.min(1, (T - t0) / Math.max(0.05, t1 - t0)));

function marquesEntiers() {
  const CL = (window.CUES || {})[VIDEO] || {};
  const sansEsp = (s) => s.replace(/[\s  ]+/g, '');
  for (const k in CL) {
    const l = CL[k], res = [];
    let i = 0;
    while (i < l.length) {
      const s = l[i][1].trim();
      let j = i;
      while (j + 1 < l.length && l[j + 1][1].trim() === s) j++;
      const m = s.match(/^(\d[\d\s  ]*)[\s  ]([a-zà-ÿ'’]+)$/i);
      if (m && j > i) { res.push([l[i][0], sansEsp(m[1])]); res.push([l[j][0], m[2]]); }
      else res.push([l[i][0], /^[\d\s  ]+$/.test(s) ? sansEsp(s) : s]);
      i = j + 1;
    }
    CL[k] = res;
  }
}

/* ── LE TABLEAU DE NUMÉRATION À LA CRAIE, groupé par CLASSES de trois chiffres ──────────────────
   (cx, yHaut) = le milieu du HAUT des cases. `u` (0 → 1) trace le tableau progressivement.
   Renvoie : .x(i) le milieu de la colonne i (0 = la plus à gauche), .xd(i) depuis la DROITE
   (0 = les unités), .yc le milieu des cases, .w, .h, .n, .coul(i). */
const CL_CRAIE = { millions: '#faa2c1', mille: '#b197fc', 'unités': '#74c0fc' };

function tableauCraie(c, cx, yHaut, { classes = ['mille', 'unités'], w = 130, h = 150, ban = true, u = 1 } = {}) {
  const n = classes.length * 3, L = n * w, x0 = cx - L / 2;
  const coulDe = (i) => CL_CRAIE[classes[Math.floor(i / 3)]] || CRAIE.blanc;
  const vues = Math.max(0, Math.min(n, Math.round(n * Math.min(1, u))));
  if (u > 0) {
    if (ban) classes.forEach((cl, k) => {
      if (3 * k >= vues) return;
      const coul = CL_CRAIE[cl] || CRAIE.blanc, xa = x0 + k * 3 * w, lab = 'classe des ' + cl;
      c.strokeStyle = coul; c.lineWidth = 5; c.beginPath(); c.roundRect(xa + 6, yHaut - 118, 3 * w - 12, 54, 16); c.stroke();
      ecrire(c, lab, xa + 1.5 * w, yHaut - 90, Math.min(38, (3 * w - 40) / (lab.length * 0.52)), coul);
    });
    for (let i = 0; i < vues; i++) {
      const coul = coulDe(i);
      c.strokeStyle = coul; c.lineWidth = 6; c.strokeRect(x0 + i * w, yHaut, w, h);
      ecrire(c, 'cdu'[i % 3], x0 + i * w + w / 2, yHaut - 32, 40, coul);
    }
  }
  return {
    x0, w, h, n, yHaut, coul: coulDe,
    x: (i) => x0 + (i + 0.5) * w,
    xd: (i) => x0 + (n - 1 - i + 0.5) * w,
    yc: yHaut + h / 2,
    bas: yHaut + h,
  };
}

/* Les chiffres d'un nombre, alignés à DROITE dans le tableau. `zeros` : une couleur pour les 0
   (ils gardent la place). `z(j)` : le grossissement du chiffre de rang j (0 = les unités). */
function chiffresCraie(c, tab, s, { coul = CRAIE.blanc, zeros = null, z = 1, taille = 104 } = {}) {
  const ch = String(s).replace(/\D/g, '').split('').reverse();
  ch.forEach((d, j) => {
    const i = tab.n - 1 - j;
    if (i < 0) return;
    const k = typeof z === 'function' ? z(j) : z;
    if (k <= 0) return;
    ecrire(c, d, tab.x(i), tab.yc, taille * k, (d === '0' && zeros) ? zeros : coul);
  });
}

/* Un cadre autour d'une colonne du tableau (le rang qu'on montre) */
function cadreCase(c, tab, i, coul = CRAIE.ret, u = 1, lw = 10) {
  if (u <= 0) return;
  const k = 1 + 0.12 * (1 - Math.min(1, u));
  c.strokeStyle = coul; c.lineWidth = lw; c.setLineDash([]);
  c.strokeRect(tab.x(i) - tab.w / 2 * k + 4, tab.yc - tab.h / 2 * k + 4, tab.w * k - 8, tab.h * k - 8);
}

/* ── COMPTER LES CHIFFRES : une petite case par chiffre, sous un nombre ─────────────────────────
   (cx, y) = le milieu du haut de la rangée ; `vues` = combien de cases sont déjà tracées. */
function casesChiffres(c, cx, y, n, { vues = n, w = 58, h = 70, coul = CRAIE.jaune, gap = 12 } = {}) {
  const L = n * w + (n - 1) * gap, x0 = cx - L / 2;
  c.strokeStyle = coul; c.lineWidth = 6; c.setLineDash([]);
  for (let i = 0; i < Math.min(n, vues); i++) c.strokeRect(x0 + i * (w + gap), y, w, h);
  return { x: (i) => x0 + i * (w + gap) + w / 2, yc: y + h / 2, bas: y + h };
}

/* ── UNE SOMME ÉCRITE TERME À TERME : 10 000 + 2 000 + 400 + 50 ────────────────────────────────
   items = [[texte, instant, couleur], …] ; le « + » qui précède un terme paraît avec lui.
   (cx, y) = le milieu de la ligne. Les places sont calculées sur la ligne ENTIÈRE : un terme qui
   n'est pas encore dit laisse son trou, et rien ne bouge quand il arrive. */
function sommeCraie(c, cx, y, items, T, { taille = 72, coulPlus = CRAIE.gris, gap = 18 } = {}) {
  c.font = `800 ${taille}px "Segoe UI"`;
  const bouts = [];
  items.forEach(([s, t, coul], i) => { if (i) bouts.push(['+', t, coulPlus]); bouts.push([s, t, coul || CRAIE.blanc]); });
  const larg = bouts.map((b) => c.measureText(b[0]).width);
  const L = larg.reduce((a, b) => a + b, 0) + gap * (bouts.length - 1);
  const pos = [];
  let x = cx - L / 2;
  bouts.forEach((b, i) => { pos.push(x + larg[i] / 2); x += larg[i] + gap; });
  bouts.forEach((b, i) => { if (T >= b[1]) ecrire(c, b[0], pos[i], y, taille * zoom(T, b[1], 0.3), b[2]); });
  return { x: (i) => pos[2 * i], gauche: cx - L / 2, droite: cx + L / 2 };
}

/* ── LA DROITE GRADUÉE À LA CRAIE (arrondir, encadrer) ─────────────────────────────────────────
   De a à b, coupée en n parts, le milieu en pointillé si on le demande.
   (cx, y) = le milieu de la droite. Rend .x(v) (le point d'une valeur) et .y. */
function droiteCraie(c, cx, y, a, b, { n = 10, larg = 800, coul = CRAIE.blanc, milieu = false, u = 1 } = {}) {
  if (u <= 0) return { x: () => cx, y };
  larg *= Math.min(1, u);
  const x0 = cx - larg / 2, x1 = cx + larg / 2;
  c.strokeStyle = coul; c.lineWidth = 7; c.lineCap = 'round'; c.setLineDash([]);
  c.beginPath(); c.moveTo(x0 - 24, y); c.lineTo(x1 + 24, y); c.stroke();
  c.lineWidth = 5;
  for (let i = 1; i < n; i++) { const x = x0 + larg * i / n; c.beginPath(); c.moveTo(x, y - 14); c.lineTo(x, y + 14); c.stroke(); }
  c.lineWidth = 9;
  for (const x of [x0, x1]) { c.beginPath(); c.moveTo(x, y - 26); c.lineTo(x, y + 26); c.stroke(); }
  const X = (v) => x0 + larg * (v - a) / (b - a);
  if (milieu) {
    c.strokeStyle = CRAIE.gris; c.lineWidth = 5; c.setLineDash([12, 10]);
    c.beginPath(); c.moveTo(X((a + b) / 2), y - 64); c.lineTo(X((a + b) / 2), y + 36); c.stroke(); c.setLineDash([]);
  }
  return { x: X, y };
}

/* Le repère d'un nombre sur la droite : un triangle, et le nombre écrit au-dessus */
function repereCraie(c, d, v, s, coul = CRAIE.jaune, taille = 52, z = 1) {
  if (z <= 0) return;
  const x = d.x(v);
  c.fillStyle = coul;
  c.beginPath(); c.moveTo(x, d.y - 8); c.lineTo(x - 16 * z, d.y - 40 * z); c.lineTo(x + 16 * z, d.y - 40 * z); c.closePath(); c.fill();
  ecrire(c, s, x, d.y - 74, taille * z, coul);
}

/* Une flèche horizontale : de la valeur v1 à la valeur v2, au-dessus de la droite */
function flecheCraie(c, d, v1, v2, dy = 108, coul = CRAIE.ok, u = 1) {
  if (u <= 0) return;
  const x1 = d.x(v1), x2 = x1 + (d.x(v2) - d.x(v1)) * Math.min(1, u), y = d.y - dy, s = Math.sign(x2 - x1) || 1;
  c.strokeStyle = coul; c.lineWidth = 8; c.lineCap = 'round';
  c.beginPath(); c.moveTo(x1, y); c.lineTo(x2, y); c.stroke();
  c.fillStyle = coul; c.beginPath();
  c.moveTo(x2 + s * 18, y); c.lineTo(x2 - s * 6, y - 14); c.lineTo(x2 - s * 6, y + 14); c.closePath(); c.fill();
}

/* Une grande croix rouge (« ce n'est pas le même nombre ») */
function croixCraie(c, x, y, r, u = 1) {
  if (u <= 0) return;
  const k = r * Math.min(1, u);
  c.strokeStyle = CRAIE.faux; c.lineWidth = 16; c.lineCap = 'round'; c.beginPath();
  c.moveTo(x - k, y - k); c.lineTo(x + k, y + k); c.moveTo(x + k, y - k); c.lineTo(x - k, y + k); c.stroke();
}

/* Un trait qui barre ce qui ne décide rien */
function barrerCraie(c, x, y, w, u = 1, coul = CRAIE.faux) {
  if (u <= 0) return;
  c.strokeStyle = coul; c.lineWidth = 12; c.lineCap = 'round'; c.beginPath();
  c.moveTo(x - w / 2, y + 10); c.lineTo(x - w / 2 + w * Math.min(1, u), y - 10); c.stroke();
}
