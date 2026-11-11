# suite_arith_explicite.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# la formule explicite » (16:9), ceinture VERTE. Série SUITES, épisode 05.
# Micro du coach : lin_suite_explicite (notion lin_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts. ⚠️ Vidéo COMMUNE : elle sert aussi la micro
# suite_arithmetique de la 1re spé (premiere-spe/maths/suites.bank.ts + renfort :
# « uₙ = u₀ + nr », « u₅ − u₂ = (5 − 2)r », « de u₁ à u₇ il y a 6 étapes »).
#
# Ce que demande le coach → écran :
#   · aExpl0 (rang 0 : uₙ = u₀ + n × r)              → 02, 03, 04-question (C) ;
#   · aExpl1 (rang 1 : uₙ = u₁ + (n − 1) × r)        → 03, 08-question (B) ;
#   · aExplLire (lire u₀ et r dans uₙ = a + bn)      → 07-lire-prouver ;
#   · aExplContexte (une situation → la formule)     → 01, 02, 05-rang ;
#   · aExplCalcul / tpl_2 (calculer un terme, un rang) → 05-rang, 10 défi ;
#   · 1re spé : deux termes → la raison (écart ÷ pas) → 06-deux-termes, 10 défi ;
#   · erreurs typiques : premier terme et raison échangés (09-piege, leurres A
#     et C), formule du rang 1 au rang 0 (leurre B de 04), du rang 0 au rang 1
#     (leurre A de 08), formule géométrique (le short).
# Clé de voix → écran :
#   00-garde (la longue ligne des termes, puis le saut « d'un coup » jusqu'à
#   u₁₀₀) · 01 Sofiane, conseiller bancaire ; Jade, 17 ans, son livret (300 €,
#   + 45 € par mois, la jauge vers 1 200 €, le permis) · 02 les flèches « + 45 »
#   qui se regroupent en un bloc orange « n × 45 » : uₙ = 300 + 45n · 03 les deux
#   formules (rang 0 : n sauts ; rang 1 : un saut de moins) · 04/04b question
#   (C : 8 − 3n) · 05 le rang : 300 + 45n = 1 200, n = 20 (la jauge se remplit
#   d'un coup) · 06 deux termes u₃ = 17, u₈ = 42 : 5 pas, + 25, r = 5 ;
#   uₙ = uₚ + (n − p) × r · 07 lire wₙ = 7 + 4n, prouver wₙ₊₁ − wₙ = 4 ·
#   08/08b question (B : 14 + 6n) · 09 le piège 45 + 300n (les deux jauges) ·
#   10/10b défi u₂ = 11, u₆ = 31 → r = 5, uₙ = 1 + 5n, n = 19 · 11 « Ce que tu
#   as appris » · 12 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et écarts,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/premiere-suite-arith-explicite.json (débit −6), calée mot à
# mot par suite_arith_explicite_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_explicite.py SuiteArithExplicite1re -o eleveai-maths-premiere-suite-arith-explicite --media_dir manim/scripts/premiere/media-suite-arith-explicite
# Sortie : manim/sorties/premiere/maths/suites/05-arith-explicite/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U0, R, CIBLE = 300, 45, 1200
assert (CIBLE - U0) % R == 0 and (CIBLE - U0) // R == 20 and 45 * 20 == 900
Q1 = (8, -3)                                   # v₀ = 8, r = −3 → C : 8 − 3n
assert all(8 - 3 * n == 8 + n * -3 for n in range(5))
assert -3 + 8 * 2 != 8 - 3 * 2 and 8 - 3 * (2 - 1) != 8 - 3 * 2           # A et B fausses
assert (42 - 17) / (8 - 3) == 5 and all(17 + (n - 3) * 5 == 2 + 5 * n for n in range(10))
assert all((7 + 4 * (n + 1)) - (7 + 4 * n) == 4 for n in range(10))
assert all(20 + 6 * (n - 1) == 14 + 6 * n for n in range(1, 10)) and 14 + 6 == 20   # B
assert 45 + 300 * 0 == 45
assert (31 - 11) / (6 - 2) == 5 and 11 - 2 * 5 == 1 and (96 - 1) / 5 == 19 and 1 + 5 * 19 == 96

PEAU, PEAU2, CHEVEUX = "#8d5524", "#c68642", "#1f1300"
COSTUME, CRAVATE, PIERRE = "#1E3A8A", "#DC2626", "#94A3B8"
ROSE = "#EC4899"


def sofiane(s=1.0):
    """Sofiane, conseiller bancaire : costume, chemise, cravate rouge."""
    tete = Circle(radius=0.3, fill_color=PEAU2, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.31, start_angle=PI * 0.05, angle=PI * 0.9, stroke_color=CHEVEUX, stroke_width=9)
    cheveux.move_to(P(0, 1.27))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.25, fill_color=COSTUME, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    chemise = Polygon(P(-0.22, 0.7), P(0.22, 0.7), P(0, 0.2), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    cravate = Polygon(P(-0.06, 0.62), P(0.06, 0.62), P(0.09, 0.3), P(0, 0.18), P(-0.09, 0.3),
                      fill_color=CRAVATE, fill_opacity=1, stroke_width=0)
    return VGroup(corps, chemise, cravate, tete, cheveux).scale(s)


def banque(s=1.0):
    """Une banque : fronton, trois colonnes, socle."""
    fronton = Polygon(P(-0.6, 0.3), P(0.6, 0.3), P(0, 0.62), fill_color=PIERRE, fill_opacity=1, stroke_width=0)
    cols = VGroup(*[Rectangle(width=0.14, height=0.55, fill_color=PIERRE, fill_opacity=1, stroke_width=0).move_to(
        P(x, 0.0)) for x in (-0.38, 0, 0.38)])
    socle = Rectangle(width=1.25, height=0.14, fill_color=PIERRE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.34))
    euro = Text("€", font_size=26, color=COSTUME).move_to(P(0, 0.42))
    euro._pas_audit = True
    return VGroup(fronton, cols, socle, euro).scale(s)


def jade(s=1.0):
    """Jade, 17 ans : queue de cheval, sweat rose."""
    queue = Circle(radius=0.17, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0.3, 1.1))
    cheveux = Circle(radius=0.32, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.1))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(-0.03, 1.0))
    corps = RoundedRectangle(width=0.9, height=1.1, corner_radius=0.3, fill_color=ROSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    return VGroup(queue, cheveux, corps, tete).scale(s)


def livret(s=1.0):
    """Le livret d'épargne : une couverture bleue et son titre."""
    couv = RoundedRectangle(width=1.5, height=1.0, corner_radius=0.08, fill_color="#1D4ED8", fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2)
    dos = Line(couv.get_corner(UL) + RIGHT * 0.15, couv.get_corner(DL) + RIGHT * 0.15, stroke_color=WHITE,
               stroke_width=2)
    tit = Text("Livret", font_size=26, color=WHITE).move_to(couv).shift(RIGHT * 0.08)
    return VGroup(couv, dos, tit).scale(s)


def voiture(s=1.0, couleur=RAISON):
    """Une petite voiture (le permis de conduire)."""
    caisse = RoundedRectangle(width=1.3, height=0.38, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    cabine = Polygon(P(-0.35, 0.18), P(0.3, 0.18), P(0.15, 0.48), P(-0.22, 0.48), fill_color=couleur,
                     fill_opacity=1, stroke_width=0)
    vitre = Polygon(P(-0.25, 0.22), P(0.22, 0.22), P(0.11, 0.42), P(-0.16, 0.42), fill_color="#BFDBFE",
                    fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.14, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=2).move_to(P(x, -0.2)) for x in (-0.38, 0.38)])
    return VGroup(caisse, cabine, vitre, roues).scale(s)


class Jauge(VGroup):
    """La jauge du livret : un tube vertical de y0 (0 €) à y1 (max €)."""

    def __init__(self, x, y0, y1, maxi, largeur=0.7, **kw):
        super().__init__(**kw)
        self.x, self.y0, self.k, self.l = x, y0, (y1 - y0) / maxi, largeur
        self.tube = RoundedRectangle(width=largeur + 0.12, height=y1 - y0 + 0.12, corner_radius=0.1,
                                     stroke_color=GREY_B, stroke_width=3).move_to(P(x, (y0 + y1) / 2))
        self.add(self.tube)

    def Y(self, v):
        return self.y0 + self.k * v

    def bloc(self, a, b, couleur):
        """Le morceau de a € à b € (un rectangle plein)."""
        return Rectangle(width=self.l, height=self.k * (b - a), fill_color=couleur, fill_opacity=1,
                         stroke_color=FOND_CARTE, stroke_width=1).move_to(P(self.x, self.Y((a + b) / 2)))

    def trait(self, v, couleur=JUSTE, dx=0.6):
        return DashedLine(P(self.x - self.l / 2 - dx, self.Y(v)), P(self.x + self.l / 2 + dx, self.Y(v)),
                          color=couleur, stroke_width=3, dash_length=0.12)


class SuiteArithExplicite1re(PaysageSuites):
    fichier_marques = "suite_arith_explicite_marques.json"
    nom_voix = "premiere-suite-arith-explicite"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── outils de l'épisode ────────────────────────────────────────────────

    def calcul(self, morceaux, y, x=-6.25, fs=40, avec=(), centre=False):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent)."""
        ts = [self.t(m[0], fs, m[1], audit=len(m) < 4) for m in morceaux]  # 4e élément : nombres déjà dits
        g = VGroup(*ts).arrange(RIGHT, buff=0.18).move_to(P(0, y))
        if centre:
            g.move_to(P(x, y))
        else:
            g.align_to(P(x, 0), LEFT)
        paquet = []
        for tx, ex in zip(ts, [m[2] for m in morceaux]):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=0.2)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.25)
        return g

    def cacher_case(self, lg, i, texte="…"):
        """La case i devient « … » (pas de cadre) : la ligne continue au loin."""
        c = lg.cases[i]
        c[0].set_stroke(opacity=0).set_fill(opacity=0)
        pts = Text(texte, font_size=40, color=GREY_A).move_to(c[0])
        c.remove(c[1])
        c.add(pts)
        return c

    def noms_dessus(self, lg, buff=0.1):
        """Les noms u₀, u₁… AU-DESSUS des cases (les flèches « + r » passent dessous)."""
        for c, nm in zip(lg.cases, lg.noms):
            nm.next_to(c[0], UP, buff=buff)
        return lg

    def regrouper(self, lg, i, j, texte, sauts, cote=UP, creux=0.55, fs=34, run_time=0.6, pale=0.3, audit=True, pale_lab=None):
        """Les petites flèches `sauts` se regroupent en UN bloc orange : l'arc de
        la case i à la case j (au-dessus), son texte encadré ; les petites pâlissent."""
        a, b = lg.cases[i][0], lg.cases[j][0]
        if np.allclose(cote, UP) and len(lg.noms):  # les noms sont au-dessus : l'arc part au-dessus d'eux
            y = max(n.get_top()[1] for n in lg.noms if n.original_text.strip()) + 0.08  # pas le nom vide
            d, f = P(a.get_center()[0], y), P(b.get_center()[0], y)
        else:
            bord = (lambda m: m.get_top()) if np.allclose(cote, UP) else (lambda m: m.get_bottom())
            d, f = bord(a) + 0.1 * cote, bord(b) + 0.1 * cote
        angle = -4 * np.arctan(2 * creux / np.linalg.norm(f - d)) * (1 if np.allclose(cote, UP) else -1)
        arc = CurvedArrow(d, f, angle=angle, color=RAISON, stroke_width=6, tip_length=0.2)
        lab = self.t(texte, fs, RAISON, audit=audit)
        boite = SurroundingRectangle(lab, color=RAISON, buff=0.1, stroke_width=3, corner_radius=0.08)
        bloc = VGroup(boite, lab).next_to(arc, cote, buff=0.04)
        copies = [s[1].copy() for s in sauts]
        self.add(*copies)
        self.play(*[c.animate.move_to(lab).set_opacity(0.6) for c in copies],
                  *[s[0].animate.set_opacity(pale) for s in sauts],
                  *[s[1].animate.set_opacity(pale if pale_lab is None else pale_lab) for s in sauts],
                  Create(arc), run_time=run_time)
        self.remove(*copies)
        self.play(FadeIn(lab, scale=1.5), Create(boite), run_time=0.3)
        return VGroup(arc, bloc)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def longue_ligne(self):
        """La longue ligne des termes qui se déroule, puis le saut d'un coup."""
        noms = [u(k) for k in range(5)] + ["", u(100)]   # les noms DANS les cases (l'échelle est dessous)
        lg = LigneTermes(noms, xs=(-4.7, -3.75, -2.8, -1.85, -0.9, 0.55, 2.4), centre=P(0, -1.6), largeur=0.75,
                         hauteur=0.5, fs=28)
        for c in lg.cases:
            c[1].set_color(GREY_A)
        self.cacher_case(lg, 5)
        self.play(*[FadeIn(c, scale=0.8) for c in lg.cases], run_time=0.3)
        sauts = []
        for k in range(5):
            s = lg.saut(k, "+ r", cote=UP, fs=20, creux=0.12)
            s[1].set_opacity(0)
            sauts.append(s)
            self.play(Create(s[0]), FadeIn(s[1]), run_time=0.12)
        lg.cases[6][0].set_stroke(JUSTE)
        self.regrouper(lg, 0, 6, "d'un coup !", sauts, creux=0.22, fs=26, run_time=0.5, pale=0.2, pale_lab=0)
        self.play(Indicate(lg.cases[6], color=JUSTE, scale_factor=1.25), run_time=0.4)

    def ecran_garde(self):
        self.garde("Suite arithmétique",
                   [("la formule explicite", "la formule explicite", TERME),
                    ("Comment calculer n'importe quel terme", "Comment"),
                    ("d'un seul coup, et retrouver le rang ?", "d'un seul coup")],
                   dessin=self.longue_ligne)

    # ── 01 : Sofiane, Jade et son livret ───────────────────────────────────

    J = (4.3, -2.45, 2.3)          # la jauge : x, y de 0 €, y de 1 200 €

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        so = sofiane(1.0).move_to(P(-4.85, 0.55))
        bq = banque(0.9).move_to(P(-4.85, 2.55))
        nom = self.t("Sofiane", 40, JAUNE_TITRE).next_to(so, DOWN, buff=0.25)
        metier = self.t("conseiller bancaire", 32, TERME, larg=3.3).next_to(nom, DOWN, buff=0.1)
        self.au_mot("Sofiane")
        self.play(FadeIn(so, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("conseiller")
        self.play(FadeIn(metier, shift=UP * 0.1), FadeIn(bq, shift=DOWN * 0.15), run_time=0.4)
        ja = jade(1.0).move_to(P(-1.75, 0.5))
        njade = self.t("Jade", 40, JAUNE_TITRE).next_to(ja, DOWN, buff=0.25)
        age = self.t("17 ans", 32, GREY_A).next_to(njade, DOWN, buff=0.1)
        self.au_mot("Jade")
        self.play(FadeIn(ja, shift=LEFT * 0.2), FadeIn(njade, shift=UP * 0.1), run_time=0.4)
        self.suivre("17")
        self.play(FadeIn(age, shift=UP * 0.1), run_time=0.25)
        lv = livret(1.0).move_to(P(1.05, 1.75))
        jg = Jauge(*self.J, CIBLE)
        s300 = self.t("300 €", 40, TERME).next_to(lv, DOWN, buff=0.2)
        b300 = jg.bloc(0, U0, TERME)
        self.suivre("300")
        self.play(FadeIn(lv, scale=0.8), FadeIn(s300, scale=1.3), Create(jg.tube), GrowFromEdge(b300, DOWN),
                  run_time=0.45)
        self.au_mot("livret")
        self.play(Indicate(lv, color=TERME, scale_factor=1.12), run_time=0.4)
        self.au_mot("permis")
        car = voiture(0.85).move_to(P(5.9, self.J[2] + 0.55))
        self.play(FadeIn(car, shift=LEFT * 0.4), run_time=0.4)
        self.suivre("45")
        p45 = self.t("+ 45 €", 40, RAISON).move_to(P(1.05, -0.3))
        self.play(FadeIn(p45, scale=1.3), run_time=0.3)
        self.au_mot("chaque mois")
        cm = self.t("chaque mois", 32, RAISON).next_to(p45, DOWN, buff=0.12)
        self.play(FadeIn(cm, shift=UP * 0.1), run_time=0.25)
        blocs = VGroup()
        for k in range(3):
            piece = Circle(radius=0.13, fill_color=RAISON, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            piece.move_to(lv.get_top() + UP * 0.5)
            b = jg.bloc(U0 + R * k, U0 + R * (k + 1), RAISON)
            self.play(FadeIn(piece), piece.animate.move_to(lv.get_center()), GrowFromEdge(b, DOWN),
                      run_time=0.3)
            self.remove(piece)
            blocs.add(b)
        self.au_mot("dans combien")
        q1 = self.t("Dans combien de mois", 36, WHITE)
        q2 = self.t("aurai-je 1 200 € ?", 36, RAISON)
        qq = VGroup(q1, q2).arrange(RIGHT, buff=0.2).move_to(P(-1.6, -2.6))
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.3)
        self.suivre("1 200")
        cible = jg.trait(CIBLE)
        lc = self.t("1 200 €", 30, JUSTE).next_to(jg.tube, RIGHT, buff=0.15).align_to(cible, UP).shift(DOWN * 0.22)
        self.play(FadeIn(q2, shift=UP * 0.1), Create(cible), FadeIn(lc, scale=1.3), run_time=0.4)
        self.play(Indicate(car, color=JUSTE, scale_factor=1.15), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : de la récurrence à la formule explicite ───────────────────────

    def ecran_vers_explicite(self):
        self.nouvel_ecran("02-vers-explicite")
        self.calcul([("uₙ :", TERME, "u indice n"), ("la somme sur le livret", WHITE, "la somme"),
                     ("après n mois", WHITE, "après n mois")], 3.3, x=0, fs=36, centre=True)
        noms = [u(k) for k in range(4)] + ["", u("n")]
        lg = LigneTermes(["300", "", "", "", "", ""], xs=(-5.2, -3.5, -1.8, -0.1, 1.6, 3.3), centre=P(0, 1.1),
                         largeur=1.3, hauteur=0.72, fs=36, noms=noms)
        self.cacher_case(lg, 4)
        self.noms_dessus(lg)
        self.au_mot("commence")
        self.play(*[FadeIn(lg.cases[k][0], scale=0.8) for k in range(6)], FadeIn(lg.cases[4]),
                  *[FadeIn(n) for n in lg.noms], run_time=0.4)
        self.calcul([("u₀ =", WHITE, "u indice 0"), ("300", TERME, "300")], -0.55, x=-6.2,
                    avec=[FadeIn(lg.cases[0][1], scale=1.4)])
        self.suivre("45")
        sauts = []
        for k in range(5):
            s = lg.saut(k, "+ 45", fs=28)
            sauts.append(s)
            self.play(Create(s[0]), FadeIn(s[1], scale=1.3), run_time=0.14)
        self.calcul([("uₙ₊₁", WHITE, "u indice n plus 1"), ("= uₙ", WHITE, "égale u"), ("+ 45", RAISON, "45")],
                    -1.25, x=-6.2)
        self.calcul([("Après n mois :", WHITE, "Après n mois"), ("n × 45", RAISON, "n fois 45")], -1.95, x=-6.2)
        self.regrouper(lg, 0, 5, "n × 45", sauts, creux=0.4, fs=32)
        f = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("300", TERME, "300"), ("+", WHITE, None),
                         ("45n", RAISON, "45 n")], -2.85, x=0, fs=48, centre=True)
        cad = self.encadre(f, JAUNE_TITRE, 0.16)
        self.play(Create(cad), run_time=0.3)
        self.insister(VGroup(f, cad), 1.12)
        self.attendre_voix(marge=0.5)

    # ── 03 : les deux formules : rang 0, rang 1 ────────────────────────────

    def ligne_formule(self, y, depuis0=True):
        noms = [u(k) for k in range(4)] + ["", u("n")]
        lg = LigneTermes([""] * 6, xs=(-5.9, -4.75, -3.6, -2.45, -1.3, -0.15), centre=P(0, y), largeur=0.8,
                         hauteur=0.55, fs=28, noms=noms, fs_noms=26)
        self.cacher_case(lg, 4)
        self.noms_dessus(lg)
        if not depuis0:
            lg.cases[0][0].set_stroke(GREY_D, opacity=0.6)
            lg.noms[0].set_opacity(0.45)
        return lg

    def ecran_formules(self):
        self.nouvel_ecran("03-formules")
        self.titre("La formule explicite", JAUNE_TITRE, 44, extrait="formule", y=3.22)
        la = self.ligne_formule(1.45)
        self.play(*[FadeIn(c, scale=0.8) for c in la.cases], *[FadeIn(n) for n in la.noms], run_time=0.3)
        sa = []
        for k in range(5):
            s = la.saut(k, "+ r", fs=24, creux=0.22)
            sa.append(s)
            self.play(Create(s[0]), FadeIn(s[1]), run_time=0.12)
        fa = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("u₀", TERME, "0 plus"), ("+ n × r", RAISON, "n fois")],
                         1.45, x=3.55, fs=40, centre=True)
        self.regrouper(la, 0, 5, "n × r", sa, creux=0.3, fs=30, run_time=0.45)
        ca = self.encadre(fa, JAUNE_TITRE, 0.15)
        self.play(Create(ca), run_time=0.3)
        lb = self.ligne_formule(-1.5, depuis0=False)
        self.au_mot("Si la suite")
        self.play(*[FadeIn(c, scale=0.8) for c in lb.cases], *[FadeIn(n) for n in lb.noms], run_time=0.3)
        sb = []
        for k in range(5):
            s = lb.saut(k, "+ r", fs=24, creux=0.22, couleur=GREY_D if k == 0 else RAISON)
            sb.append(s)
            self.play(Create(s[0]), FadeIn(s[1]), run_time=0.12)
        self.au_mot("u indice 1")
        cx = self.barrer(sb[0], buff=0.02)
        self.play(Indicate(lb.cases[1], color=TERME, scale_factor=1.25), Create(cx), run_time=0.4)
        fb = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("u₁", TERME, "1 plus"),
                          ("+ (n − 1) × r", RAISON, "n moins")], -1.5, x=3.75, fs=38, centre=True)
        self.au_mot("fois r", n=2)
        self.regrouper(lb, 1, 5, "(n − 1) × r", sb[1:], creux=0.3, fs=30, run_time=0.45)
        cb = self.encadre(fb, JAUNE_TITRE, 0.15)
        self.play(Create(cb), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : v₀ = 8, r = −3 → C ──────────────────────

    def ecran_question1(self):
        lignes = [(self.t("Une suite arithmétique a pour", 36), "Une suite"),
                  (self.t("premier terme v₀ = 8", 36, TERME), "8"),
                  (self.t("et pour raison −3.", 36, RAISON), "3"),
                  (self.t("Pour tout entier naturel n :", 36), "Pour tout")]
        choix = ["vₙ = −3 + 8n", "vₙ = 8 − 3 × (n − 1)", "vₙ = 8 − 3n"]
        q = self.poser_question("04-question", lignes, choix, 2)
        self.dire("04b-reponse")
        self.q_reponse(q, 2)
        # A et B s'effacent : les deux remarques prennent leur place, au-dessus de C
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), run_time=0.25)
        a1 = self.t("le nombre seul = le premier terme", 36, TERME).move_to(q.cartes[0])
        a2 = self.t("la raison multiplie n", 36, RAISON).move_to(q.cartes[1])
        self.au_mot("nombre seul")
        self.play(FadeIn(a1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("la raison")
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.3)
        corps = q.cartes[2][1][1]           # « vₙ=8−3n » : v ₙ = 8 − 3 n
        self.suivre("8")
        self.play(corps[3].animate.set_color(TERME).scale(1.3), run_time=0.25)
        self.suivre("3")
        self.play(corps[3].animate.scale(1 / 1.3), corps[4:].animate.set_color(RAISON).scale(1.2), run_time=0.25)
        self.play(corps[4:].animate.scale(1 / 1.2), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 05 : retrouver le rang : 300 + 45n = 1 200 ─────────────────────────

    def ecran_rang(self):
        self.nouvel_ecran("05-rang")
        self.titre("Revenons à Jade", JAUNE_TITRE, 44, extrait="Revenons", y=3.22)
        ja = jade(0.8).move_to(P(-5.55, 1.75))
        jg = Jauge(*self.J, CIBLE)
        b300 = jg.bloc(0, U0, TERME)
        car = voiture(0.85).move_to(P(5.9, self.J[2] + 0.55))
        self.au_mot("Jade")
        self.play(FadeIn(ja, shift=RIGHT * 0.2), Create(jg.tube), GrowFromEdge(b300, DOWN), FadeIn(car), run_time=0.45)
        self.au_mot("1 200")
        cible = jg.trait(CIBLE)
        lc = self.t("1 200 €", 30, JUSTE).next_to(jg.tube, RIGHT, buff=0.15).align_to(cible, UP).shift(DOWN * 0.22)
        self.play(Create(cible), FadeIn(lc, scale=1.3), run_time=0.35)
        self.au_mot("résout")
        x0 = -4.75
        self.calcul([("300", TERME, "300"), ("+", WHITE, None), ("45n", RAISON, "45 n"), ("= 1 200", WHITE, "1 200")],
                    2.0, x=x0, fs=42)
        self.calcul([("45n", RAISON, "45 n"), ("= 900", WHITE, "900")], 1.15, x=x0, fs=42)
        self.calcul([("n =", WHITE, "n égale"), ("900", WHITE, "900"), ("÷ 45", WHITE, "45"), ("= 20", JUSTE, "20")],
                    0.3, x=x0, fs=42)
        # le terme lointain, atteint d'un coup : u₀ … u₂₀ ; la jauge se remplit
        lg = LigneTermes(["300", "", "1 200"], xs=(-4.3, -2.6, -0.9), centre=P(0, -3.0), largeur=1.35, hauteur=0.66,
                         fs=32, noms=[u(0), "", u(20)])
        self.cacher_case(lg, 1)
        self.noms_dessus(lg)
        for k in (0, 2):
            lg.cases[k][1]._pas_audit = True   # 300 et 1 200 : déjà dits, relus dans la ligne
        self.suivre("20 mois")
        d20 = self.t("Dans 20 mois,", 34, WHITE)
        p20 = self.t("son permis est payé !", 34, JUSTE)
        VGroup(d20, p20).arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(0, -0.72)).align_to(P(x0, 0), LEFT)
        blocs = [jg.bloc(U0 + R * k, U0 + R * (k + 1), RAISON) for k in range(20)]
        self.play(FadeIn(d20, shift=UP * 0.1), *[FadeIn(c, scale=0.8) for c in lg.cases], *[FadeIn(n) for n in lg.noms],
                  run_time=0.3)
        self.regrouper(lg, 0, 2, "20 × 45", [], creux=0.3, fs=30, run_time=0.3, audit=False)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in blocs], lag_ratio=0.25), run_time=0.5)
        self.au_mot("payé")
        ok = self.coche(JUSTE, 0.2).next_to(p20, RIGHT, buff=0.2)
        self.play(FadeIn(p20, shift=UP * 0.1), Create(ok), Indicate(car, color=JUSTE, scale_factor=1.2),
                  Indicate(lg.cases[2], color=JUSTE), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 06 : deux termes connus : u₃ = 17, u₈ = 42 ─────────────────────────

    def ecran_deux_termes(self):
        self.nouvel_ecran("06-deux-termes")
        self.titre("Avec deux termes", JAUNE_TITRE, 44, extrait="deux termes", y=3.22)
        lg = LigneTermes(["17", "", "", "", "", "42"], xs=[-5.5 + 1.5 * k for k in range(6)], centre=P(0, 1.15),
                         largeur=1.1, hauteur=0.7, fs=36, noms=[u(k) for k in range(3, 9)])
        self.noms_dessus(lg)
        self.play(*[FadeIn(c[0], scale=0.8) for c in lg.cases], *[FadeIn(n) for n in lg.noms], run_time=0.35)
        self.suivre("17")
        self.play(FadeIn(lg.cases[0][1], scale=1.4), run_time=0.25)
        self.suivre("42")
        self.play(FadeIn(lg.cases[5][1], scale=1.4), run_time=0.25)
        self.au_mot("rang 3")
        self.play(Indicate(VGroup(lg.cases[0], lg.noms[0]), color=TERME, scale_factor=1.2), run_time=0.35)
        self.au_mot("rang 8")
        self.play(Indicate(VGroup(lg.cases[5], lg.noms[5]), color=TERME, scale_factor=1.2), run_time=0.35)
        self.suivre("5 pas")
        sauts = []
        for k in range(5):
            s = lg.saut(k, "?", fs=30)
            sauts.append(s)
            self.play(Create(s[0]), FadeIn(s[1]), run_time=0.12)
        pas = self.t("5 pas", 34, WHITE).move_to(P(lg.get_center()[0], -0.5))
        self.play(FadeIn(pas, scale=1.3), run_time=0.25)
        self.calcul([("42", WHITE, "42 moins"), ("− 17", WHITE, "17"), ("= 25", RAISON, "25")], -1.17, x=-6.2)
        bloc = self.regrouper(lg, 0, 5, "+ 25", [], creux=0.3, fs=32, run_time=0.4)
        self.calcul([("r =", RAISON, "raison est"), ("25", WHITE, "25"), ("÷ 5", WHITE, "5"), ("= 5", JUSTE, "5")],
                    -1.17, x=0.3)
        neufs = [self.t("+ 5", 30, RAISON).move_to(s[1]) for s in sauts]
        copies = [bloc[1][1].copy() for _ in sauts]
        self.add(*copies)
        self.play(*[c.animate.move_to(n).set_opacity(0) for c, n in zip(copies, neufs)],
                  *[ReplacementTransform(s[1], n) for s, n in zip(sauts, neufs)], run_time=0.5)
        self.remove(*copies)
        f = self.calcul([("Depuis uₚ :", GREY_A, "Depuis"), ("uₙ =", WHITE, "u indice n égale"),
                         ("uₚ", TERME, "u indice p plus"), ("+ (n − p) × r", RAISON, "n moins p")], -2.03, x=0,
                        fs=40, centre=True)
        cad = self.encadre(f[1:], JAUNE_TITRE, 0.14)
        self.play(Create(cad), run_time=0.3)
        self.calcul([("Ici : uₙ =", WHITE, "Ici"), ("17", TERME, "17"), ("+ (n − 3)", RAISON, "n moins 3"),
                     ("× 5", RAISON, "5"), ("= 2", JUSTE, "2 plus"), ("+ 5n", JUSTE, "5 n")], -2.9, x=-6.2, fs=40)
        self.attendre_voix(marge=0.5)

    # ── 07 : lire une formule, prouver qu'une suite est arithmétique ───────

    def ecran_lire_prouver(self):
        self.nouvel_ecran("07-lire-prouver")
        self.titre("Dans l'autre sens : lire la formule", JAUNE_TITRE, 44, extrait="l'autre sens", y=3.22)
        f = self.calcul([("wₙ =", WHITE, "w indice"), ("7", TERME, "7 plus"), ("+", WHITE, None), ("4n", RAISON, "4 n")],
                        2.15, x=0, fs=64, centre=True)
        self.au_mot("nombre seul")
        fl1 = Arrow(f[1].get_bottom(), P(-3.0, 1.0), color=TERME, buff=0.1, stroke_width=4)
        l1 = self.t("le nombre seul", 36, TERME).move_to(P(-3.6, 0.7))
        self.play(GrowArrow(fl1), FadeIn(l1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("premier terme")
        l1b = self.t("= le premier terme", 36, TERME).next_to(l1, DOWN, buff=0.12)
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        w0 = self.calcul([("w₀ =", WHITE, "w indice 0"), ("7", TERME, "7")], l1b.get_center()[1] - 0.75, x=-3.6,
                         fs=40, centre=True)
        self.play(Create(self.encadre(w0, TERME, 0.12)), run_time=0.25)
        self.au_mot("nombre devant")
        fl2 = Arrow(f[3].get_bottom(), P(2.6, 1.0), color=RAISON, buff=0.1, stroke_width=4)
        l2 = self.t("le nombre devant n", 36, RAISON).move_to(P(3.2, 0.7))
        self.play(GrowArrow(fl2), FadeIn(l2, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("la raison")
        l2b = self.t("= la raison", 36, RAISON).next_to(l2, DOWN, buff=0.12)
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        r4 = self.calcul([("r =", RAISON, None), ("4", RAISON, "4")], w0.get_center()[1], x=3.2, fs=40, centre=True)
        self.play(Create(self.encadre(r4, RAISON, 0.12)), run_time=0.25)
        self.au_mot("Pour prouver")
        pp = self.t("Pour prouver qu'elle est arithmétique :", 36, JAUNE_TITRE).move_to(P(0, -1.3)).align_to(
            P(-6.2, 0), LEFT)
        self.play(FadeIn(pp, shift=UP * 0.1), run_time=0.35)
        self.calcul([("wₙ₊₁ − wₙ", WHITE, "w indice n plus 1"),
                     ("= 7 + 4(n + 1) − (7 + 4n)", GREY_A, None, False)], -2.05, x=-6.2, fs=38)
        res = self.calcul([("=", WHITE, "trouve"), ("4", JUSTE, "4")], -2.8, x=-6.0, fs=44)
        self.au_mot("ne dépend")
        nd = VGroup(self.coche(JUSTE, 0.2), self.t("un nombre qui ne dépend pas de n", 36, JUSTE)).arrange(RIGHT, buff=0.2)
        nd.next_to(res, RIGHT, buff=0.5)
        self.play(Create(nd[0]), FadeIn(nd[1], shift=UP * 0.1), Create(self.encadre(res[1], JUSTE, 0.1)), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 08 : question-pause n° 2 : t₁ = 20, r = 6 → B ──────────────────────

    def ecran_question2(self):
        lignes = [(self.t("Une suite arithmétique commence à t₁ = 20,", 36, TERME), "20"),
                  (self.t("et sa raison est 6.", 36, RAISON), "6"),
                  (self.t("Pour tout entier n ≥ 1 :", 36), "1")]
        choix = ["tₙ = 20 + 6n", "tₙ = 14 + 6n", "tₙ = 6 + 20n"]
        q = self.poser_question("08-question", lignes, choix, 1, en_ligne=True, largeur=3.9, fs=34)
        self.dire("08b-reponse")
        self.q_reponse(q, 1)
        y = q.cartes.get_bottom()[1] - 0.75
        self.calcul([("tₙ =", WHITE, "t indice n"), ("20", TERME, "20"), ("+ 6 ×", RAISON, "6 fois"), ("(n − 1)", RAISON, "1"),
                     ("= 14", JUSTE, "14"), ("+ 6n", JUSTE, "6 n")], y, x=-5.6, fs=40)
        v = self.calcul([("On vérifie : t₁ =", WHITE, "On vérifie"), ("14", WHITE, "14"), ("+ 6", WHITE, "6"),
                         ("= 20", JUSTE, "20")], y - 0.95, x=-5.6, fs=40)
        ok = self.coche(JUSTE, 0.2).next_to(v, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 09 : le piège : le premier terme et la raison échangés ─────────────

    def ecran_piege(self):
        self.nouvel_ecran("09-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(-3.0, 3.22))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        b1 = self.t("premier terme", 34, TERME)
        b2 = self.t("raison", 34, RAISON)
        c1, c2 = self.encadre(b1, TERME, 0.12), self.encadre(b2, RAISON, 0.12)
        g1, g2 = VGroup(c1, b1), VGroup(c2, b2)
        VGroup(g1, g2).arrange(RIGHT, buff=1.4).move_to(P(-3.0, 2.25))
        self.au_mot("Échanger")
        self.play(FadeIn(g1, shift=RIGHT * 0.2), FadeIn(g2, shift=LEFT * 0.2), run_time=0.35)
        self.au_mot("raison")
        self.play(CyclicReplace(g1, g2, path_arc=PI * 0.7), run_time=0.7)
        faux = self.calcul([("45", PIEGE, "45 plus"), ("+", PIEGE, None), ("300n", PIEGE, "300 n")], 1.05, x=-3.0, fs=56,
                           centre=True)
        self.au_mot("n'est pas")
        np_ = self.t("ce n'est pas la somme de Jade", 32, PIEGE).move_to(P(-3.0, 0.2))
        cx = self.barrer(Square(0.5)).next_to(faux, LEFT, buff=0.35)
        self.play(FadeIn(np_, shift=UP * 0.1), Create(cx), run_time=0.35)
        jr = Jauge(3.3, -1.35, 1.9, 300, largeur=0.6)
        jb = Jauge(5.0, -1.35, 1.9, 300, largeur=0.6)
        self.calcul([("n = 0 :", WHITE, "0"), ("45 + 300 × 0 = 45 €", PIEGE, "45 euros", False)], -0.65,
                    x=-6.2, fs=36, avec=[Create(jr.tube), GrowFromEdge(jr.bloc(0, 45, PIEGE), DOWN)])
        l45 = self.t("45 €", 32, PIEGE, audit=False).next_to(jr.tube, DOWN, buff=0.12)
        self.play(FadeIn(l45), run_time=0.2)
        self.calcul([("au lieu de", JUSTE, "au lieu"), ("300 €", JUSTE, "300")], -1.3, x=-6.2, fs=36,
                    avec=[Create(jb.tube), GrowFromEdge(jb.bloc(0, 300, TERME), DOWN)])
        l300 = self.t("300 €", 32, TERME, audit=False).next_to(jb.tube, DOWN, buff=0.12)
        self.play(FadeIn(l300), run_time=0.2)
        self.au_mot("Pour vérifier")
        r1 = self.t("Pour vérifier une formule :", 36, JAUNE_TITRE)
        r2 = self.t("remplace n par le premier rang,", 36, WHITE)
        r3 = self.t("tu dois retrouver le premier terme.", 36, JUSTE)
        VGroup(r1, r2, r3).arrange(DOWN, aligned_edge=LEFT, buff=0.14).move_to(P(0, -2.68)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("remplace")
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("retrouver")
        self.play(FadeIn(r3, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 10 : le défi : u₂ = 11, u₆ = 31 ; 10b : la correction ──────────────

    XS_DEFI = [-6.0 + 1.42 * k for k in range(9)]

    def ecran_defi(self):
        self.nouvel_ecran("10-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi", y=3.12)
        noms = [u(k) for k in range(7)] + ["", u("n")]
        lg = LigneTermes(["1", "", "11", "", "", "", "31", "", "96"], xs=self.XS_DEFI, centre=P(0, 1.45), largeur=1.0,
                         hauteur=0.66, fs=34, noms=noms)
        self.cacher_case(lg, 7)
        self.noms_dessus(lg)
        vus = [2, 3, 4, 5, 6]
        self.au_mot("Une suite")
        self.play(*[FadeIn(lg.cases[k][0], scale=0.8) for k in vus], *[FadeIn(lg.noms[k]) for k in vus], run_time=0.35)
        self.suivre("11")
        self.play(FadeIn(lg.cases[2][1], scale=1.4), run_time=0.25)
        self.suivre("31")
        self.play(FadeIn(lg.cases[6][1], scale=1.4), run_time=0.25)
        qs = []
        for k, (txt, ex) in enumerate((("→ sa raison r", "Trouve sa raison"), ("→ sa formule explicite", "formule"),
                                        ("→ le rang n pour lequel uₙ = 96", "96"))):
            m = self.t(txt, 38, RAISON if k == 2 else WHITE).move_to(P(0, 0.05 - 0.68 * k)).align_to(P(-4.6, 0), LEFT)
            self.au_mot(ex)
            anims = [FadeIn(m, shift=UP * 0.1)]
            if k == 2:
                anims += [FadeIn(lg.cases[7]), FadeIn(lg.cases[8][0], scale=0.8), FadeIn(lg.noms[8]),
                          FadeIn(lg.cases[8][1], scale=1.4)]
            self.play(*anims, run_time=0.3)
            qs.append(m)
        self.defi_pause(-2.4, x=-0.6)
        self._defi = (tit, lg, VGroup(*qs))

    def ecran_correction(self):
        self.dire("10b-correction")
        tit, lg, qs = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 44, JUSTE).move_to(P(-5.0, 3.22))
        self.play(FadeOut(qs), FadeOut(tit), FadeIn(cor, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("rang 2")
        self.play(Indicate(VGroup(lg.cases[2], lg.noms[2]), color=TERME, scale_factor=1.2), run_time=0.3)
        self.au_mot("rang 6")
        self.play(Indicate(VGroup(lg.cases[6], lg.noms[6]), color=TERME, scale_factor=1.2), run_time=0.3)
        self.suivre("4 pas")
        sauts = []
        for k in range(2, 6):
            s = lg.saut(k, "?", fs=28)
            sauts.append(s)
            self.play(Create(s[0]), FadeIn(s[1]), run_time=0.12)
        self.calcul([("4 pas :", WHITE, None, False), ("31", WHITE, "31 moins"), ("− 11", WHITE, "11"),
                     ("= 20", RAISON, "20")], -0.15, x=-6.2, fs=38)
        bloc = self.regrouper(lg, 2, 6, "+ 20", [], creux=0.3, fs=30, run_time=0.4)
        self.calcul([("r =", RAISON, "raison est"), ("20", WHITE, "20"), ("÷ 4", WHITE, "4"), ("= 5", JUSTE, "5")],
                    -0.15, x=0.6, fs=38)
        neufs = [self.t("+ 5", 28, RAISON).move_to(s[1]) for s in sauts]
        copies = [bloc[1][1].copy() for _ in sauts]
        self.add(*copies)
        self.play(*[c.animate.move_to(n).set_opacity(0) for c, n in zip(copies, neufs)],
                  *[ReplacementTransform(s[1], n) for s, n in zip(sauts, neufs)], run_time=0.45)
        self.remove(*copies)
        self.au_mot("u indice 0")
        arriere = [lg.saut(k, "+ 5", fs=28) for k in (1, 0)]
        self.play(*[FadeIn(lg.cases[k][0], scale=0.8) for k in (0, 1)], *[FadeIn(lg.noms[k]) for k in (0, 1)],
                  *[Create(a[0]) for a in arriere], *[FadeIn(a[1]) for a in arriere], run_time=0.4)
        self.calcul([("u₀ =", WHITE, None), ("11", WHITE, "11 moins"), ("− 2", WHITE, "2 fois"), ("× 5", WHITE, "5"),
                     ("= 1", JUSTE, "1")], -0.95, x=-6.2, fs=38, avec=[FadeIn(lg.cases[0][1], scale=1.4)])
        f = self.calcul([("uₙ =", WHITE, "u indice n égale"), ("1", TERME, "1 plus"), ("+ 5n", RAISON, "5 n")], -1.75,
                        x=-6.2, fs=40)
        self.play(Create(self.encadre(f, JAUNE_TITRE, 0.12)), run_time=0.3)
        self.calcul([("1", WHITE, "Enfin"), ("+ 5n", WHITE, "5 n"), ("= 96", WHITE, "96"), ("→", GREY_B, None),
                     ("5n", WHITE, "5 n"), ("= 95", WHITE, "95"), ("→", GREY_B, None), ("n = 19", JUSTE, "19")],
                    -2.6, x=-6.2, fs=38)
        n19 = self.t(u(19), 26, JUSTE).move_to(lg.noms[8])
        self.play(ReplacementTransform(lg.noms[8], n19), lg.cases[8][0].animate.set_stroke(JUSTE, width=7),
                  run_time=0.35)
        self.insister(VGroup(lg.cases[8], n19), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ; 12 : la fin ─────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [self.t("La formule explicite :", fs, JAUNE_TITRE),
              VGroup(self.t("uₙ = u₀", fs + 4, TERME), self.t("+ n × r", fs + 4, RAISON)).arrange(RIGHT, buff=0.2)]
        p2 = [self.t("Avec deux termes, la raison r =", fs),
              self.t("leur écart ÷ le nombre de pas.", fs, RAISON)]
        p3 = [self.t("Pour trouver un rang :", fs), self.t("on résout une équation.", fs, JUSTE)]
        self.finale([(p1, ["La formule", "u indice n"]), (p2, ["Avec deux", "leur écart"]),
                     (p3, ["pour trouver", "on résout"])], cle="11-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_vers_explicite()
        self.ecran_formules()
        self.ecran_question1()
        self.ecran_rang()
        self.ecran_deux_termes()
        self.ecran_lire_prouver()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("12-abonne")
