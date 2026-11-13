# suite_sommes.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Somme des termes d'une
# suite arithmétique » (16:9), ceinture VERTE. Série SUITES, épisode 24.
# Micro du coach : suite_sommes (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : 1 + 2 + … + n = n(n + 1)/2 ; « somme =
# nombre de termes × (premier + dernier)/2 » ; le nombre de termes).
#
# Ce que demande le coach → écran :
#   · 1 + 2 + … + n = n(n + 1) ÷ 2 (paires de somme n + 1)            → 02, 03, 07 ;
#   · somme arithmétique = nb de termes × (premier + dernier) ÷ 2      → 03, 04, 08 ;
#   · le nombre de termes : de uₚ à u_q, q − p + 1 (erreur : q − p)    → 05, 06, 08b ;
#   · le dernier terme : u₁ + (n − 1)r, pas u₁ + nr                    → 04, 06.
# Clé de voix → écran :
#   00-garde (l'escalier de cubes et son jumeau) · 01 Nora, guide-conférencière :
#   l'amphithéâtre romain (40 places, + 4 par rang, 25 rangs) · 02 Gauss :
#   les paires 1 + 100, 2 + 99, 3 + 98 · 03 la formule (l'escalier n × (n + 1))
#   · 04 l'amphithéâtre : 136 places, 2 200 places · 05/05b question (C : 26) ·
#   06 le piège (25 rangs, 24 sauts) · 07/07b question (B : 820) · 08/08b défi
#   (7 + 10 + … + 61 = 646) · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = raison, sauts et paires,
# vert = juste, rouge = piège ; violet = le nombre de termes (le rang).
# Écritures : les indices (u₅, u₃₀, uₚ, u_q) sont de VRAIS indices, assez grands
# (ligne() ci-dessous : « u_{30} » → le 30 à 62 % de la taille, sous la ligne).
# Voix : manim/voix/premiere-spe-suite-sommes.json (débit −6), calée mot à mot
# par suite_sommes_marques.json.
# Contrôle : AUDIT=1 BORDS=1 BORDS6=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_sommes.py SuiteSommes1reSpe -o eleveai-maths-premiere-spe-suite-sommes --media_dir manim/scripts/premiere/media-suite-sommes
# Sortie : manim/sorties/premiere-spe/maths/suites/24-sommes/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import EXPOSANTS, OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : boutons_ligne)
from suite_variation_spe import Bords6  # noqa: E402  (ép. 23 : contrôle des 6 %)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
assert sum(range(1, 101)) == 5050 == 50 * 101 and 1 + 100 == 2 + 99 == 3 + 98 == 101
assert all(sum(range(1, n + 1)) == n * (n + 1) // 2 for n in range(1, 60))
AMPHI = [40 + 4 * k for k in range(25)]
assert AMPHI[-1] == 40 + 24 * 4 == 136 and 40 + 25 * 4 == 140
assert sum(AMPHI) == 25 * (40 + 136) // 2 == 25 * 88 == 2200
assert 30 - 5 + 1 == 26 == len(range(5, 31))                                  # question 1 : C
assert sum(range(1, 41)) == 40 * 41 // 2 == 820 and 40 * 41 == 1640            # question 2 : B
DEFI = list(range(7, 62, 3))
assert DEFI[-1] == 61 and len(DEFI) == 19 == (61 - 7) // 3 + 1 and 61 - 7 == 54 and 54 // 3 == 18
assert sum(DEFI) == 19 * (7 + 61) // 2 == 19 * 34 == 646                       # défi

RANG = "#A855F7"
PEAU, CHEVEUX = "#8d5524", "#1f1300"
PIERRE, PIERRE_BORD, SABLE = "#57534E", "#D6C7A1", "#C8B68E"
K_IND = 0.62                      # la taille d'un indice (par rapport à la ligne)


# ── les dessins de l'épisode ────────────────────────────────────────────────

def nora(s=1.0):
    """Nora, guide-conférencière : veste bleue, badge, chignon, un fanion levé."""
    hampe = Line(P(0.62, -0.1), P(0.62, 1.55), stroke_color=GREY_A, stroke_width=4)
    fanion = Polygon(P(0.64, 1.55), P(1.12, 1.4), P(0.64, 1.25), fill_color=RAISON, fill_opacity=1, stroke_width=0)
    chignon = Circle(radius=0.13, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.34))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.16))
    veste = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.25, fill_color="#1E40AF", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    col = Polygon(P(-0.16, 0.7), P(0.16, 0.7), P(0, 0.42), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    cordon = VGroup(Line(P(-0.14, 0.66), P(-0.2, 0.18), stroke_color=JAUNE_TITRE, stroke_width=3),
                    Line(P(0.14, 0.66), P(-0.08, 0.18), stroke_color=JAUNE_TITRE, stroke_width=3))
    badge = RoundedRectangle(width=0.26, height=0.2, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(P(-0.14, 0.08))
    bras = Line(P(0.4, 0.4), P(0.62, 0.3), stroke_color="#1E40AF", stroke_width=10)
    return VGroup(hampe, fanion, veste, col, cordon, badge, bras, chignon, tete, cheveux).scale(s)


def gauss(s=1.0):
    """Carl Friedrich Gauss enfant : cheveux clairs, veste sombre, une ardoise."""
    tete = Circle(radius=0.25, fill_color="#F1C27D", fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    cheveux = Sector(radius=0.27, angle=PI, start_angle=0, fill_color="#B7791F", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.1))
    veste = RoundedRectangle(width=0.9, height=1.0, corner_radius=0.22, fill_color="#44403C", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.2))
    cadre = RoundedRectangle(width=0.8, height=0.56, corner_radius=0.04, fill_color="#1F2937", fill_opacity=1,
                             stroke_color="#A16207", stroke_width=4).move_to(P(0.05, 0.12))
    craie = VGroup(*[Line(P(-0.22, y), P(0.3, y), stroke_color=WHITE, stroke_width=2) for y in (0.22, 0.04)])
    return VGroup(veste, tete, cheveux, cadre, craie).scale(s)


def chrono(r=0.42):
    """Un chronomètre : le cadran, le bouton, l'aiguille (à tourner)."""
    cad = Circle(radius=r, stroke_color=WHITE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)
    bouton = RoundedRectangle(width=0.16, height=0.12, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).next_to(cad, UP, buff=0.02)
    aiguille = Line(ORIGIN, UP * r * 0.75, stroke_color=RAISON, stroke_width=4)
    g = VGroup(cad, bouton, aiguille)
    g.aiguille = aiguille
    return g


class Amphi(VGroup):
    """L'amphithéâtre vu de face : les rangs 1, 2, 3, « ⋮ », le dernier rang
    (de plus en plus larges vers le haut), l'arène en sable dessous.
    self.rangs[k] (k = 0, 1, 2 et 3 = le dernier), self.points, self.arene."""

    def __init__(self, x, y0, larg0=3.0, dl=0.7, h=0.5, gap=0.1, sieges=True, **kw):
        super().__init__(**kw)
        self.rangs, self.cadres = VGroup(), []
        for k, (slot, w) in enumerate(((0, larg0), (1, larg0 + dl), (2, larg0 + 2 * dl), (4, larg0 + 6 * dl))):
            b = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color=PIERRE, fill_opacity=1,
                                 stroke_color=PIERRE_BORD, stroke_width=2).move_to(P(x, y0 + slot * (h + gap)))
            self.cadres.append(b)
            g = VGroup(b)
            if sieges:
                n = int((w - 0.3) / 0.22)
                g.add(VGroup(*[Dot(P(x - (n - 1) * 0.11 + i * 0.22, b.get_top()[1] - 0.07), radius=0.035,
                                   color=SABLE) for i in range(n)]))
            self.rangs.add(g)
        self.points = Text("⋮", font_size=40, color=PIERRE_BORD).move_to(P(x, y0 + 3 * (h + gap)))
        self.points._pas_audit = True
        self.arene = Ellipse(width=larg0 * 0.8, height=0.3, fill_color=SABLE, fill_opacity=1,
                             stroke_width=0).move_to(P(x, y0 - h / 2 - 0.27))
        self.add(self.arene, self.rangs, self.points)


def escalier(n, c, couleur=TERME, opac=0.85):
    """L'escalier 1, 2, …, n en cubes de côté c (coin bas-gauche à l'origine) :
    une colonne par terme ; VGroup de colonnes (chaque colonne : ses cubes)."""
    cols = VGroup()
    for k in range(1, n + 1):
        cols.add(VGroup(*[Square(side_length=c, fill_color=couleur, fill_opacity=opac, stroke_color=WHITE,
                                 stroke_width=1.5).move_to(P((k - 0.5) * c, (j + 0.5) * c)) for j in range(k)]))
    return cols


def escalier_plein(n, c, couleur=TERME, opac=0.9, contour=WHITE):
    """L'escalier 1, 2, …, n d'un seul tenant (un polygone, pour n grand)."""
    pts = [P(0, 0)]
    for k in range(1, n + 1):
        pts += [P((k - 1) * c, k * c), P(k * c, k * c)]
    pts.append(P(n * c, 0))
    return Polygon(*pts, fill_color=couleur, fill_opacity=opac, stroke_color=contour, stroke_width=2)


# ── les outils de l'épisode (paysage ET short) ──────────────────────────────

def _indices(s):
    """« u_{30} + 1 » → (« u30 + 1 », [positions des caractères d'indice])."""
    out, pos, i = "", [], 0
    while i < len(s):
        if s.startswith("_{", i):
            j = s.index("}", i)
            for c in s[i + 2:j]:
                pos.append(len(out))
                out += c
            i = j + 1
        else:
            out += s[i]
            i += 1
    return out, pos


class OutilsSommes:
    """UNE ligne de texte (une taille, une ligne de base, de vraies espaces), avec
    de VRAIS indices assez grands (« u_{30} »), et les fractions à vraie barre."""

    def ligne(self, morceaux, fs=44):
        """morceaux = [(texte, couleur, extrait[, t2c]), …] ; « _{…} » = un indice.
        Renvoie (Text, [VGroup du morceau k]) ; part.original_text = le texte lu."""
        plains, inds = zip(*[_indices(m[0]) for m in morceaux])
        texte, debuts = "", []
        for p in plains:
            texte += "" if not texte or p[0] in EXPOSANTS or texte.endswith("(") else " "
            debuts.append(len(texte))
            texte += p
        tx = Text(texte, font_size=fs, color=WHITE, disable_ligatures=True)
        tx._pas_audit = True
        avec = len(tx) == len(texte)
        if not avec:
            assert len(tx) == len(texte.replace(" ", "")), (len(tx), texte)
        gi = (lambda i: i) if avec else (lambda i: i - texte[:i].count(" "))  # noqa: E731
        parts, runs = [], []
        for p, d, pos, m in zip(plains, debuts, inds, morceaux):
            idx = [gi(d + k) for k in range(len(p)) if avec or p[k] != " "]
            g = VGroup(*[tx[i] for i in idx])
            g.set_color(m[1])
            for sous, coul in (m[3] if len(m) > 3 and m[3] else {}).items():
                a = p.find(sous)
                VGroup(*[tx[gi(d + k)] for k in range(a, a + len(sous)) if avec or p[k] != " "]).set_color(coul)
            g.original_text = p
            parts.append(g)
            for k in pos:
                i = gi(d + k)
                if runs and runs[-1][-1] == i - 1:
                    runs[-1].append(i)
                else:
                    runs.append([i])
        for run in runs:  # l'indice : 62 % de la taille, sous la ligne de base, collé à sa lettre
            grp, base = VGroup(*[tx[i] for i in run]), tx[run[0] - 1]
            r0 = grp.get_right()[0]
            grp.scale(K_IND, about_point=P(grp.get_left()[0], base.get_bottom()[1]))
            grp.shift(DOWN * 0.11 * fs / 48 + LEFT * (grp.get_left()[0] - base.get_right()[0] - 0.03 * fs / 48))
            dx = r0 - grp.get_right()[0]
            for i in range(run[-1] + 1, len(tx)):
                tx[i].shift(LEFT * dx)
        return tx, parts

    def boite(self, a_decaler, a_encadrer=None, couleur=JUSTE):
        """Encadre un résultat sans toucher le « = » d'avant : on l'écarte d'abord de 0,12."""
        a_encadrer = a_encadrer or a_decaler
        self.play(*[m.animate.shift(RIGHT * 0.12) for m in a_decaler], run_time=0.12)
        self.play(Create(self.encadre(VGroup(*a_encadrer), couleur, 0.1)), run_time=0.3)

    def frac(self, num, den, fs=44):
        """Une fraction : numérateur, VRAIE barre, dénominateur (des morceaux)."""
        tn, pn = self.ligne(num, fs)
        td, pd = self.ligne(den, fs)
        barre = Line(LEFT, RIGHT, stroke_width=4, color=WHITE).set_width(max(tn.width, td.width) + 0.2 * fs / 44)
        g = VGroup(tn, barre, td).arrange(DOWN, buff=0.12 * fs / 44)
        g.pn, g.pd, g.barre = pn, pd, barre
        return g

    def construire(self, blocs, fs=44):
        """blocs : des lignes (listes de morceaux) et des fractions ("frac", num, den),
        côte à côte ; renvoie (VGroup, séquence [(morceau, extrait, animations)])."""
        mobs, seq = [], []
        for b in blocs:
            if isinstance(b, tuple) and b[0] == "frac":
                f = self.frac(b[1], b[2], fs)
                mobs.append(f)
                seq += [(p, m[2], []) for p, m in zip(f.pn, b[1])]
                seq += [(p, m[2], [Create(f.barre)] if k == 0 else []) for k, (p, m) in enumerate(zip(f.pd, b[2]))]
            else:
                tx, ps = self.ligne(b, fs)
                mobs.append(tx)
                seq += [(p, m[2], []) for p, m in zip(ps, b)]
        g = VGroup(*mobs).arrange(RIGHT, buff=0.24 * fs / 44)
        barres = [m.barre for m in mobs if hasattr(m, "barre")]
        if barres:
            for m in mobs:
                if not hasattr(m, "barre"):
                    m.match_y(barres[0])
        g.seq = seq
        return g

    def ecrire(self, blocs, y, centre=0.0, fs=44, larg=None, avec=(), gauche=None, run_time=0.3, avec_part=None):
        """Construit, place (centré en x = centre, ou calé à gauche en x = gauche)
        et écrit chaque morceau quand la voix dit son extrait (None : avec le
        précédent). Renvoie le VGroup ; g.parts = les morceaux dans l'ordre."""
        g = self.construire(blocs, fs)
        larg = larg or self.largeur_texte
        if g.width > larg:
            g.scale_to_fit_width(larg)
        g.move_to(P(centre, y))
        if gauche is not None:
            g.align_to(P(gauche, 0), LEFT)
        for i, an in (avec_part or {}).items():  # des animations jouées AVEC le morceau i
            p, ex, a0 = g.seq[i]
            g.seq[i] = (p, ex, a0 + list(an))
        self.jouer_seq(g.seq, avec, run_time)
        g.parts = [s[0] for s in g.seq]
        return g

    def jouer_seq(self, seq, avec=(), run_time=0.3):
        paquet, extra = [], []
        for p, ex, an in seq:
            if ex is not None and paquet:
                self.play(*[FadeIn(q, shift=UP * 0.1) for q in paquet], *extra, run_time=run_time if extra else 0.25)
                paquet, extra = [], []
            if ex is not None:
                self.suivre(ex)
            elif os.environ.get("AUDIT"):  # un nombre sans extrait : déjà dit ?
                for nb in re.findall(r"\d+(?: \d{3})*(?:,\d+)?", p.original_text):
                    if not re.search(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)",
                                     self._texte_voix[:self._curseur + 2]):
                        print(f"AUDIT-PAQUET {self._cle_voix} « {nb} » ({p.original_text})", flush=True)
            paquet.append(p)
            extra += an
        if paquet:
            self.play(*[FadeIn(q, shift=UP * 0.1) for q in paquet], *extra, *avec, run_time=run_time)


def somme_arith(ex=(None,) * 6):
    """Somme = nombre de termes × (premier + dernier) ÷ 2, la barre en vrai ;
    ex = les extraits de : Somme =, nombre de termes, ×, premier, dernier, 2."""
    return [[("Somme =", WHITE, ex[0]), ("nombre de termes", RANG, ex[1]), ("×", WHITE, ex[2])],
            ("frac", [("premier +", TERME, ex[3]), ("dernier", TERME, ex[4])], [("2", WHITE, ex[5])])]


class SuiteSommes1reSpe(Bords6, AuditMilliers, OutilsSommes, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_sommes_marques.json"
    nom_voix = "premiere-spe-suite-sommes"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.0          # 6 % de marge latérale (rien au-delà de x = ±6,25)
    k_allumer = 1.06
    place_coche = 0.7
    boutons_ligne = _E16.boutons_ligne

    def sans_sieges(self, am, k):
        """Les sièges du rang k, retirés de son groupe (le nombre écrit prend leur place)."""
        ss = am.rangs[k][1]
        am.rangs[k].remove(ss)
        self.add(ss)
        return ss

    def fleche(self, a, b, couleur, sw=5):
        return Arrow(a, b, buff=0.06, color=couleur, stroke_width=sw, max_tip_length_to_length_ratio=0.3)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """L'escalier 1, 2, …, 6 en cubes, son jumeau orange, le chronomètre."""
        c = 0.2
        esc = escalier(6, c).shift(P(-2.6, -1.85))
        jum = escalier(6, c, RAISON).rotate(PI, about_point=ORIGIN).shift(P(-2.6 + 6 * c, -1.85 + 7 * c))
        ch = chrono(0.42).move_to(P(1.3, -1.15))
        self.play(LaggedStart(*[FadeIn(col, shift=UP * 0.1) for col in esc], lag_ratio=0.15), FadeIn(ch), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(col, shift=DOWN * 0.1) for col in jum], lag_ratio=0.15),
                  Rotate(ch.aiguille, -PI / 2, about_point=ch[0].get_center()), run_time=0.8)

    def ecran_garde(self):
        self.garde("Somme des termes",
                   [("d'une suite arithmétique", "d'une suite arithmétique", TERME),
                    ("Comment additionner 100 nombres", "100 nombres"),
                    ("en quelques secondes ?", "en quelques secondes")],
                   dessin=self.dessin_garde, extrait_titre="Somme des termes")

    # ── 01 : Nora, guide-conférencière : l'amphithéâtre romain ─────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.68
        pers = nora(0.9).move_to(P(x, 1.95))
        nom = self.t("Nora", 44, JAUNE_TITRE).move_to(P(x, 0.45))
        met = VGroup(self.t("guide-", 32, TERME), self.t("conférencière", 32, TERME)).arrange(DOWN, buff=0.1)
        met.move_to(P(x, -0.4))
        self.au_mot("Nora")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("guide-conférencière")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        xa = 0.9
        am = Amphi(xa, -2.1, dl=0.6)
        self.au_mot("amphithéâtre romain")
        self.play(FadeIn(am.arene), LaggedStart(*[FadeIn(r, shift=UP * 0.1) for r in am.rangs], lag_ratio=0.2),
                  FadeIn(am.points), run_time=0.9)
        self.ecrire([[("Combien de spectateurs", JAUNE_TITRE, "combien de spectateurs")]], 2.95, centre=xa, fs=42,
                    larg=9.6)
        self.ecrire([[("pouvaient s'asseoir ici ?", JAUNE_TITRE, "pouvaient")]], 2.3, centre=xa, fs=42, larg=9.6)
        l40 = self.t("40 places", 32, WHITE).move_to(am.cadres[0])
        self.au_mot("40")
        self.play(am.cadres[0].animate.set_stroke(TERME, width=5), FadeOut(self.sans_sieges(am, 0)), FadeIn(l40, scale=1.3),
                  run_time=0.35)
        fls, labs = [], []
        for k in range(2):
            a, b = am.cadres[k].get_left(), am.cadres[k + 1].get_left()
            f = self.fleche(a + LEFT * 0.12, b + LEFT * 0.12, RAISON)
            fls.append(f)
            labs.append(self.t("+ 4", 34, RAISON).next_to(f, LEFT, buff=0.12))
        self.au_mot("4 de plus")
        self.play(*[GrowArrow(f) for f in fls], *[FadeIn(l, scale=1.3) for l in labs], run_time=0.45)
        haut, bas = am.cadres[3].get_top()[1], am.cadres[0].get_bottom()[1]
        acc = Brace(Line(P(0, bas), P(0, haut)), RIGHT, color=RANG).move_to(P(am.cadres[3].get_right()[0] + 0.3,
                                                                              (haut + bas) / 2))
        l25 = VGroup(self.t("25", 40, RANG), self.t("rangs", 34, RANG)).arrange(DOWN, buff=0.16)
        l25.next_to(acc, RIGHT, buff=0.12)
        self.au_mot("25 rangs")
        self.play(GrowFromCenter(acc), FadeIn(l25, shift=LEFT * 0.1), am.cadres[3].animate.set_stroke(RANG, width=4),
                  run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : Gauss : les paires ────────────────────────────────────────────

    def ecran_gauss(self):
        self.nouvel_ecran("02-gauss")
        self.titre("Un détour par l'histoire", JAUNE_TITRE, 44, extrait="Un détour", y=3.2)
        g = gauss(0.95).move_to(P(-5.15, 1.75))
        nm = self.t("Carl Friedrich Gauss", 38, TERME).move_to(P(0.6, 2.5))
        self.au_mot("Carl Friedrich Gauss")
        self.play(FadeIn(g, shift=UP * 0.15), FadeIn(nm, shift=UP * 0.1), run_time=0.45)
        s = self.ecrire([[("1 +", WHITE, "1"), ("2 +", WHITE, "2"), ("… +", WHITE, None), ("100", WHITE, "100"),
                          ("= ?", RAISON, None)]], 1.75, centre=0.6, fs=48)
        self.play(Indicate(s, color=JAUNE_TITRE, scale_factor=1.06), Wiggle(g, scale_value=1.08), run_time=0.5)
        xs = (-4.6, -3.25, -1.9, 1.9, 3.25, 4.6)
        lg = LigneTermes(["1", "2", "3", "98", "99", "100"], xs=xs, centre=P(0, -1.25), largeur=1.15, hauteur=0.8,
                         fs=40)
        pts = self.t("…", 44, WHITE).move_to(P(0, -1.25))
        self.au_mot("par paires")
        self.play(*[FadeIn(c[0], scale=0.8) for c in lg.cases], FadeIn(pts), run_time=0.4)
        hs, arcs = (1.75, 1.15, 0.55), []
        for k, (a, b) in enumerate(((0, 5), (1, 4), (2, 3))):
            d, f = lg.cases[a][0].get_top() + UP * 0.08, lg.cases[b][0].get_top() + UP * 0.08
            ang = -4 * np.arctan(2 * hs[k] / np.linalg.norm(f - d))
            arc = ArcBetweenPoints(d, f, angle=ang, color=RAISON, stroke_width=5)
            arcs.append(arc)
            self.suivre(lg.valeurs[a])
            self.play(FadeIn(lg.cases[a][1], scale=1.4), run_time=0.2)
            self.suivre(lg.valeurs[b])
            self.play(FadeIn(lg.cases[b][1], scale=1.4), Create(arc), run_time=0.35)
        labs = []
        for arc in arcs:
            l = self.t("101", 34, RAISON)
            fond = BackgroundRectangle(l, color=BLACK, fill_opacity=1, buff=0.08)
            labs.append(VGroup(fond, l).move_to(arc.point_from_proportion(0.5)))
        self.au_mot("101")
        self.play(*[FadeIn(l, scale=1.3) for l in labs], run_time=0.35)
        r = self.ecrire([[("50 paires :", RANG, "50 paires"), ("50 ×", WHITE, "50 fois"), ("101", WHITE, "101"),
                          ("=", WHITE, "égale"), ("5 050", JUSTE, "5 050")]], -2.5, centre=-0.4, fs=48)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.5)

    # ── 03 : la formule (et l'escalier n × (n + 1)) ────────────────────────

    def ecran_formule(self):
        self.nouvel_ecran("03-formule")
        c, n, x0, y0 = 0.42, 5, 3.3, 0.02
        esc = escalier(n, c).shift(P(x0, y0))
        tit = self.t("La formule", 46, JAUNE_TITRE).move_to(P(0, 3.2))
        self.au_mot("la formule")
        self.play(FadeIn(tit, shift=DOWN * 0.1), LaggedStart(*[FadeIn(col, shift=UP * 0.1) for col in esc], lag_ratio=0.2),
                  run_time=0.6)
        jum = escalier(n, c, RAISON).rotate(PI, about_point=ORIGIN).shift(P(x0 + n * c, y0 + (n + 1) * c))
        ln = self.t("n", 40, RANG).next_to(esc, DOWN, buff=0.15)
        ln1 = self.t("n + 1", 40, RANG, audit=False).move_to(P(x0, y0 + (n + 1) * c / 2), aligned_edge=RIGHT)
        ln1.shift(LEFT * 0.25)
        xg = -2.65
        # l'escalier : son jumeau orange à « n fois, n plus 1 » (n × (n + 1) cubes), puis la moitié
        f1 = self.ecrire([[("1 +", WHITE, "1 plus 2"), ("2 +", WHITE, None), ("… +", WHITE, None), ("n =", WHITE, "plus n")],
                          ("frac", [("n(", TERME, "n fois"), ("n + 1)", TERME, "n plus 1")], [("2", WHITE, "divisé par 2")])],
                         1.35, centre=xg, fs=52, larg=6.6,
                         avec_part={4: [LaggedStart(*[FadeIn(col, shift=DOWN * 0.1) for col in jum], lag_ratio=0.1),
                                        FadeIn(ln)],
                                    5: [FadeIn(ln1, shift=RIGHT * 0.1)],
                                    6: [jum.animate.set_opacity(0.2), Indicate(esc, color=TERME, scale_factor=1.04)]},
                         run_time=0.5)
        self.play(Create(self.encadre(f1, TERME, 0.18)), run_time=0.3)
        self.ecrire([[("Somme de termes d'une suite arithmétique :", JAUNE_TITRE, "toute somme")]], -0.95, centre=-0.3,
                    fs=40, larg=11.0)
        f2 = self.ecrire(somme_arith(("nombre de termes", None, "fois premier", None, "dernier", "divisé par 2")),
                         -2.2, centre=-0.35, fs=48, larg=11.2)
        self.play(Create(self.encadre(f2, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 04 : l'amphithéâtre : 136 places, 2 200 places ─────────────────────

    def ecran_amphi(self):
        self.nouvel_ecran("04-amphitheatre")
        am = Amphi(3.6, -1.9, larg0=2.6, dl=0.38, h=0.56)
        self.au_mot("amphithéâtre")
        self.play(FadeIn(am.arene), LaggedStart(*[FadeIn(r, shift=UP * 0.1) for r in am.rangs], lag_ratio=0.15),
                  FadeIn(am.points), run_time=0.7)
        xg, lg = -2.6, 7.0
        self.ecrire([[("Dernier rang :", WHITE, "le dernier rang")]], 2.6, centre=xg, fs=42, larg=lg)
        l40 = self.t("40 places", 30, WHITE).move_to(am.cadres[0])
        l136 = self.t("136 places", 34, JUSTE).move_to(am.cadres[3])
        self.ecrire([[("40 +", WHITE, "40"), ("24 ×", RAISON, "24 fois"), ("4", RAISON, "4"), ("=", WHITE, "égale"),
                      ("136", JUSTE, "136")]], 1.8, centre=xg, fs=52, larg=lg,
                    avec_part={0: [FadeOut(self.sans_sieges(am, 0)), FadeIn(l40, scale=1.3)]},
                    avec=[FadeOut(self.sans_sieges(am, 3)), FadeIn(l136, scale=1.3),
                          am.cadres[3].animate.set_stroke(JUSTE, width=5)])
        self.ecrire([[("25 termes", RANG, "25 termes")]], 0.85, centre=xg, fs=46, larg=lg,
                    avec=[Indicate(VGroup(am.rangs, l40, l136), color=RANG, scale_factor=1.03)])
        self.ecrire([[("Somme =", WHITE, "La somme vaut")],
                     ("frac", [("25 ×", WHITE, "25 fois"), ("(40 +", TERME, "40 plus"), ("136)", TERME, "136")],
                      [("2", WHITE, "divisé par 2")])], -0.45, centre=xg, fs=50, larg=lg)
        r = self.ecrire([[("=", WHITE, "égale"), ("25 × 88", WHITE, "25 fois 88"), ("=", WHITE, "égale"),
                          ("2 200 places", JUSTE, "2 200")]], -2.05, centre=xg, fs=50, larg=lg)
        self.boite(r.parts[-1:])
        self.play(Indicate(VGroup(am.rangs, l40, l136), color=JUSTE, scale_factor=1.03), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 05 : question-pause n° 1 : u₅ + … + u₃₀ → C (26 termes) ───────────

    def ligne_u(self, y, fs=64):
        return self.ecrire([[("u_{5}", TERME, "u indice 5"), ("+", WHITE, None), ("u_{6}", TERME, "u indice 6"),
                             ("+ … +", WHITE, None), ("u_{30}", TERME, "u indice 30"), ("?", WHITE, None)]], y, fs=fs)

    def ecran_question1(self):
        cartes = self.boutons_ligne(["30", "25", "26"], largeur=3.6, fs=56, y=-0.35, pas=3.9)

        def e1():
            self.ecrire([[("Combien de termes dans la somme", WHITE, "Combien de termes")]], 2.25, fs=44)
            self._qu = self.ligne_u(1.2)

        q = self.question_libre("05-question", [e1], cartes, P(0, -1.75))
        self.dire("05b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        r = self.ecrire([[("30 − 5", WHITE, "30 moins 5"), ("+ 1", JUSTE, "plus 1"), ("=", WHITE, "égale"),
                          ("26 termes", JUSTE, "26")]], -1.8, fs=50)
        self.au_mot("deux bouts")
        bouts = [self.encadre(self._qu.parts[i], JUSTE, 0.12) for i in (0, 4)]
        self.play(*[Create(b) for b in bouts], Indicate(r.parts[1], color=JUSTE, scale_factor=1.2), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : 25 rangs, mais 24 sauts ────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        f = self.ecrire([[("25 rangs :", RANG, "Pour 25 rangs"), ("dernier =", WHITE, "le dernier"), ("40 +", WHITE, "40 plus"),
                          ("25 ×", PIEGE, "25 fois"), ("4 ?", PIEGE, "4")]], 2.35, fs=46)
        x = self.barrer(VGroup(*f.parts[2:]))
        self.play(Create(x), run_time=0.3)
        xs = np.linspace(-5.3, 4.3, 25)
        y = 0.05
        pts = VGroup(*[Dot(P(a, y), radius=0.1, color=TERME) for a in xs])
        r1 = self.t("rang 1", 32, TERME).next_to(pts[0], DOWN, buff=0.22)
        r25 = self.t("rang 25", 32, TERME).next_to(pts[-1], DOWN, buff=0.22)
        self.au_mot("1 au rang")
        self.play(LaggedStart(*[GrowFromCenter(p) for p in pts], lag_ratio=0.04), FadeIn(r1, shift=UP * 0.1),
                  run_time=0.4)
        self.au_mot("rang 25")
        self.play(FadeIn(r25, shift=UP * 0.1), run_time=0.2)
        sauts = VGroup(*[ArcBetweenPoints(P(a + 0.08, y + 0.12), P(b - 0.08, y + 0.12), angle=-PI * 0.7,
                                          color=RAISON, stroke_width=4) for a, b in zip(xs, xs[1:])])
        acc = Brace(sauts, UP, color=RAISON, buff=0.12)
        lab = self.t("+ 4", 34, RAISON).next_to(sauts[0], UP, buff=0.12)
        self.au_mot("on ajoute 4")
        self.play(LaggedStart(*[Create(s) for s in sauts], lag_ratio=0.08), FadeIn(lab), run_time=1.0)
        self.play(FadeOut(lab), run_time=0.15)
        self.ecrire([[("+ 4, seulement", RAISON, "seulement"), ("24 fois", RAISON, "24 fois")]], 1.2, fs=44,
                    avec=[GrowFromCenter(acc)])
        r = self.ecrire([[("Dernier rang :", WHITE, "le dernier rang a"), ("136 places,", JUSTE, "136"),
                          ("pas 140", PIEGE, "pas 140")]], -1.55, centre=-0.3, fs=50, larg=11.0)
        self.boite(r.parts[1:], [VGroup(*r.parts[1][:-1])])  # le cadre laisse la virgule dehors
        self.play(Create(self.barrer(r.parts[2])), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : 1 + 2 + … + 40 → B (820) ───────────────

    def ecran_question2(self):
        cartes = self.boutons_ligne(["1 600", "820", "840"], largeur=3.7, fs=56, y=-0.35, pas=4.0)

        def e1():
            self.ecrire([[("Combien vaut", WHITE, "Combien vaut")]], 2.25, fs=44)
            self.ecrire([[("1 +", WHITE, "1"), ("2 +", WHITE, "2"), ("… +", WHITE, None), ("40 ?", WHITE, "40")]], 1.2,
                        fs=64)

        q = self.question_libre("07-question", [e1], cartes, P(0, -1.75))
        self.dire("07b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        self.ecrire([[("40 ×", WHITE, "40 fois"), ("41", WHITE, "41"), ("=", WHITE, "égale"), ("1 640", WHITE, "1 640")]],
                    -1.6, centre=-0.3, fs=50)
        r = self.ecrire([[("1 640 ÷ 2", RAISON, "divisé par 2"), ("=", WHITE, None), ("820", JUSTE, "820")]], -2.5,
                        centre=-0.3, fs=50)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : 7 + 10 + 13 + … + 61 ────────────────────────────────

    def ligne_defi(self, y):
        """Les termes en cases, reliés par « + » : la somme écrite en cases."""
        xs = (-5.0, -3.0, -1.0, 3.0)
        lg = LigneTermes(["7", "10", "13", "61"], xs=xs, centre=P(0, y), largeur=1.15, hauteur=0.85, fs=46)
        plus = [self.t("+", 46, WHITE).move_to(P((a + b) / 2, y)) for a, b in zip(xs[:2], xs[1:3])]
        plus.append(self.t("+ … +", 46, WHITE).move_to(P((xs[2] + xs[3]) / 2, y)))
        egal = self.t("= ?", 46, RAISON).next_to(lg.cases[3], RIGHT, buff=0.3)
        return lg, plus, egal

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        cal = self.ecrire([[("Calcule :", WHITE, "Calcule")]], 1.9, fs=44)
        lg, plus, egal = self.ligne_defi(0.35)
        for k, v in enumerate(lg.valeurs):
            self.suivre(v)
            anims = [FadeIn(plus[k - 1], scale=1.3)] if k else []
            self.play(FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), *anims, run_time=0.25)
        self.play(FadeIn(egal, scale=1.3), run_time=0.25)
        self.defi_pause(-1.3, x=-0.4)
        self._defi = (tit, cal, lg, plus, egal)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, cal, lg, plus, egal = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        rangee = VGroup(lg, *plus, egal)
        self.play(ReplacementTransform(tit, cor), FadeOut(cal), rangee.animate.shift(UP * 1.75), run_time=0.45)
        self.remove(cal)
        self.au_mot("La raison est")
        self.suivre("3")
        for i in range(2):
            self.sauter(lg, i, "+ 3", cote=DOWN, fs=36, run_time=0.35)
        self.ecrire([[("Nombre de termes :", RANG, "Nombre de termes"), ("61 − 7", WHITE, "61 moins 7"), ("=", WHITE, "égale"),
                      ("54 ;", WHITE, "54"), ("54 ÷", WHITE, "54 divisé"), ("3", WHITE, "3"), ("=", WHITE, "égale"),
                      ("18", WHITE, "18")]], 0.15, fs=42)
        n = self.ecrire([[("18 + 1", WHITE, "plus 1"), ("=", WHITE, None), ("19 termes", RANG, "19 termes")]], -0.62, fs=44)
        self.boite(n.parts[-1:], couleur=RANG)
        r = self.ecrire([[("Somme =", WHITE, "Somme")],
                         ("frac", [("19 ×", WHITE, "19 fois"), ("(7 +", TERME, "7 plus"), ("61)", TERME, "61")],
                          [("2", WHITE, "divisé par 2")]),
                         [("= 19 × 34", WHITE, "19 fois 34"), ("=", WHITE, "égale"), ("646", JUSTE, "646")]],
                        -1.95, centre=-0.6, fs=46, larg=10.6)
        self.boite(r.parts[-1:])
        self.play(Indicate(lg.cases, color=JUSTE, scale_factor=1.04), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 42
        p1 = [self.construire([[("1 + 2 + … + n =", WHITE, None)],
                               ("frac", [("n(", TERME, None), ("n + 1)", TERME, None)], [("2", WHITE, None)])], fs)]
        a2 = Text("Somme arithmétique :", font_size=fs, color=JAUNE_TITRE)
        a2._pas_audit = True
        p2 = [a2, self.construire([[("nombre de termes", RANG, None), ("×", WHITE, None)],
                                   ("frac", [("premier +", TERME, None), ("dernier", TERME, None)], [("2", WHITE, None)])],
                                  fs)]
        p3 = [self.construire([[("De", WHITE, None), ("u_{p}", TERME, None), ("à", WHITE, None), ("u_{q}", TERME, None),
                                (":", WHITE, None), ("q − p + 1 termes", RANG, None)]], fs)]
        self.finale([(p1, ["1 plus 2"]), (p2, ["Pour une somme arithmétique", "nombre de termes"]),
                     (p3, ["Et de u indice p"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_gauss()
        self.ecran_formule()
        self.ecran_amphi()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
