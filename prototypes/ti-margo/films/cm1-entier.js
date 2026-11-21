/* ============================================================
   Série NOMBRES ENTIERS CM1 (+ CM2 par `aussi`) : les shorts en dessin animé.
   Outils communs : films/cm1-commun.js (voix mot à mot, ardoise, classe, gestes, miniature).
   Chaque film vit dans son fichier, films/cm1-entier-<épisode>.js ; ici, le tableau de numération
   à la craie et les objets de la série.
   Code couleur, LE MÊME que dans les paysages (manim/scripts/cm1/entier_commun.py) :
     la classe des millions rose, celle des mille violette, celle des unités bleue,
     le zéro qui garde la place en orange.
   ⛔ Ceinture BLANCHE pour les six shorts de la série (la verte est pour les paysages).
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
