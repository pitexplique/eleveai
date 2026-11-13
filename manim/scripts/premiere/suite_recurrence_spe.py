# suite_recurrence_spe.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Suite définie par
# récurrence » (16:9), ceinture VERTE. Série SUITES, épisode 19.
# Micro du coach : suite_recurrence (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts) : calculer de proche en proche à partir de
# u₀ et de uₙ₊₁ = f(uₙ) ; passer à la forme explicite pour un terme lointain
# (suite arithmétique / géométrique) ; passer de l'explicite à la récurrence ;
# voir où commence la suite (u₀ ou u₁). Vidéo COMMUNE : elle sert aussi la Tle
# (suite_explicite_recurrence).
#
# Ce que demande le coach → écran :
#   · u₀ et uₙ₊₁ = uₙ + 4 → u₂ (de proche en proche)          → 02, 03, 04-question ;
#   · uₙ₊₁ = 2uₙ − 1 (erreurs : oublier le − 1, sauter un rang) → 04-question ;
#   · terme lointain : la forme explicite uₙ = u₀ + nr          → 05-explicite ;
#   · explicite → récurrence (vₙ = 5 × 2ⁿ → vₙ₊₁ = 2vₙ)          → 06-inverse ;
#   · reconnaître une définition explicite / par récurrence    → 08-question ;
#   · départ à u₁ : uₙ = u₁ + (n − 1)r                          → 07-piege, 09 défi.
# Clé de voix → écran :
#   00-garde (les cases u₀ → u₁ → u₂ et le grand saut vers uₙ) · 01 Awa,
#   vétérinaire d'un centre de soins pour tortues marines : 40 g, + 15 g par
#   semaine (la tortue sur la balance) · 02 u₀ = 40, uₙ₊₁ = uₙ + 15, « un premier
#   terme, une règle » · 03 de proche en proche : 55, 70, 85 (la tortue grandit)
#   · 04/04b question (A : 9) · 05 52 semaines : 52 sauts… la forme explicite
#   uₙ = 40 + 15n, u₅₂ = 820 · 06 les algues : vₙ = 5 × 2ⁿ → vₙ₊₁ = 2vₙ, v₀ = 5
#   · 07 le piège : départ à u₁, n − 1 semaines · 08/08b question (B : n² − 4)
#   · 09/09b défi (u₁ = 7, − 4 ; u₃₀ = −109) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = la règle (+ 15, × 2),
# vert = juste, rouge = piège.
# Voix : manim/voix/premiere-spe-suite-recurrence.json (débit −6), calée mot à
# mot par suite_recurrence_spe_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_recurrence_spe.py SuiteRecurrence1reSpe -o eleveai-maths-premiere-spe-suite-recurrence --media_dir manim/scripts/premiere/media-suite-recurrence
# Sortie : manim/sorties/premiere-spe/maths/suites/19-recurrence/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
assert [40 + 15 * k for k in range(4)] == [40, 55, 70, 85]                # 03 de proche en proche
assert 2 * 3 - 1 == 5 and 2 * 5 - 1 == 9                                   # question 1 : A (9)
assert 40 + 15 * 52 == 820                                                 # 05 u₅₂
assert all(5 * 2 ** (n + 1) == 2 * (5 * 2 ** n) for n in range(6))          # 06 vₙ₊₁ = 2vₙ
assert all(40 + 15 * (n - 1) == 40 + 15 * n - 15 for n in range(1, 9))      # 07 le piège
assert 7 - 4 * 29 == 7 - 116 == -109                                       # défi : u₃₀ = −109

PEAU, BLOUSE = "#8d5524", "#F1F5F9"
CARAPACE, ECAILLE, PEAU_T = "#15803D", "#86EFAC", "#65A30D"
EAU = "#0E7490"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def awa(s=1.0):
    """Awa, vétérinaire : blouse blanche, stéthoscope, cheveux attachés."""
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=BLOUSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.16, 0.69), P(0.16, 0.69), P(0, 0.4), fill_color="#0EA5E9", fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.17))
    chignon = Circle(radius=0.13, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, 1.36))
    steth = VMobject(stroke_color="#334155", stroke_width=4).set_points_smoothly(
        [P(-0.2, 0.62), P(-0.26, 0.3), P(0.0, 0.05), P(0.22, 0.25)])
    pastille = Circle(radius=0.07, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(P(0.23, 0.22))
    croix = VGroup(Rectangle(width=0.2, height=0.06), Rectangle(width=0.06, height=0.2)).set_fill(PIEGE, 1)
    croix.set_stroke(width=0).move_to(P(-0.25, -0.15))
    return VGroup(corps, col, tete, cheveux, chignon, steth, pastille, croix).scale(s)


def tortue(s=1.0):
    """Une jeune tortue marine vue de dessus : carapace, écailles, tête, 4 nageoires."""
    nag = VGroup(*[Ellipse(width=0.55, height=0.2, fill_color=PEAU_T, fill_opacity=1, stroke_width=0)
                   .rotate(a).move_to(P(x, y)) for x, y, a in
                   ((-0.42, 0.28, 0.5), (0.42, 0.28, -0.5), (-0.36, -0.3, -0.4), (0.36, -0.3, 0.4))])
    tete = Circle(radius=0.15, fill_color=PEAU_T, fill_opacity=1, stroke_width=0).move_to(P(0, 0.55))
    yeux = VGroup(*[Dot(P(x, 0.6), radius=0.025, color="#111827") for x in (-0.06, 0.06)])
    car = Ellipse(width=0.8, height=0.95, fill_color=CARAPACE, fill_opacity=1, stroke_color="#14532D",
                  stroke_width=3)
    ec = VGroup(RegularPolygon(6, fill_color=ECAILLE, fill_opacity=0.55, stroke_width=0).scale(0.15),
                *[RegularPolygon(6, fill_color=ECAILLE, fill_opacity=0.4, stroke_width=0).scale(0.1)
                  .move_to(P(x, y)) for x, y in ((-0.2, 0.22), (0.2, 0.22), (-0.2, -0.22), (0.2, -0.22))])
    return VGroup(nag, tete, yeux, car, ec).rotate(-PI / 2).scale(s)


def balance(s=1.0):
    """La balance du centre de soins : le plateau, le pied, l'écran vide."""
    plateau = RoundedRectangle(width=2.0, height=0.14, corner_radius=0.06, fill_color=GREY_B, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0))
    pied = Rectangle(width=0.18, height=0.5, fill_color=GREY_C, fill_opacity=1, stroke_width=0).move_to(P(0, -0.32))
    socle = RoundedRectangle(width=1.6, height=0.55, corner_radius=0.1, fill_color="#334155", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.82))
    ecran = RoundedRectangle(width=1.0, height=0.38, corner_radius=0.06, fill_color="#052e16", fill_opacity=1,
                             stroke_color=JUSTE, stroke_width=2).move_to(P(0, -0.82))
    g = VGroup(plateau, pied, socle, ecran).scale(s)
    g.ecran = ecran
    return g


def bassin(larg=3.4, haut=2.0):
    """Le bassin du centre : l'eau, le bord, deux vaguelettes."""
    eau = RoundedRectangle(width=larg, height=haut, corner_radius=0.25, fill_color=EAU, fill_opacity=1,
                           stroke_color="#CBD5E1", stroke_width=6)
    vag = VGroup(*[VMobject(stroke_color="#67E8F9", stroke_width=3).set_points_smoothly(
        [P(x - 0.35, y), P(x - 0.12, y + 0.07), P(x + 0.12, y - 0.07), P(x + 0.35, y)])
        for x, y in ((-0.9, 0.6), (0.8, -0.65))])
    return VGroup(eau, vag)


def algue(p, s=1.0):
    """Une touffe d'algues : trois brins verts."""
    br = VGroup(*[VMobject(stroke_color=c, stroke_width=5).set_points_smoothly(
        [P(dx, -0.2), P(dx + 0.07, 0.0), P(dx - 0.05, 0.15), P(dx + 0.04, 0.3)])
        for dx, c in ((-0.1, "#4ADE80"), (0.0, "#22C55E"), (0.1, "#86EFAC"))])
    return br.scale(s).move_to(p)


PLACES_ALGUES = [(-1.1, 0.25), (-0.3, -0.35), (0.5, 0.35), (1.2, -0.2), (-1.25, -0.5), (-0.55, 0.55),
                 (0.15, -0.05), (0.95, 0.65)]


class SuiteRecurrence1reSpe(AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_recurrence_spe_marques.json"
    nom_voix = "premiere-spe-suite-recurrence"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne

    def sauter(self, lg, i, texte, j=None, cote=DOWN, couleur=RAISON, fs=None, run_time=0.3):
        """Comme le module commun, mais le texte vient AVEC la flèche (au mot dit)."""
        sa = lg.saut(i, texte, j, cote, couleur, fs)
        self.play(Create(sa[0]), FadeIn(sa[1], scale=1.3), run_time=run_time)
        lg.sauts[i] = sa
        return sa

    def decoller_encadrer(self, m, dx=0.22, couleur=JUSTE, buff=0.14):
        """Le résultat glisse un peu à droite, PUIS son cadre : le cadre ne touche
        plus le « = » qui le précède."""
        cad = self.encadre(m.copy().shift(RIGHT * dx), couleur, buff)
        self.play(m.animate.shift(RIGHT * dx), Create(cad), run_time=0.3)
        return cad

    def morceaux_ligne(self, pieces, fs):
        """Comme morceaux (ép. 07), mais en UNE ligne de texte (une ligne de base,
        de vraies espaces) : chaque morceau quand la voix dit son extrait."""
        _, parts = self.ligne([(p[0], p[1]) for p in pieces], fs)
        g = VGroup(*parts)
        g.extraits = [p[2] for p in pieces]
        return g

    def arcs(self, lg, paires, couleur=GREY_B, creux=0.25):
        """Les petits sauts SANS texte d'une case à l'autre (au-dessus)."""
        g = VGroup()
        for i, j in paires:
            a, b = lg.cases[i][0].get_top() + UP * 0.08, lg.cases[j][0].get_top() + UP * 0.08
            ang = -4 * np.arctan(2 * creux / max(np.linalg.norm(b - a), 0.1))
            g.add(CurvedArrow(a, b, angle=ang, color=couleur, stroke_width=3, tip_length=0.13))
        return g

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """u₀ → u₁ → u₂ de proche en proche, puis le grand saut vers uₙ."""
        lg = LigneTermes(["u₀", "u₁", "u₂", "uₙ"], xs=[-3.4, -1.9, -0.4, 2.2], centre=P(0, -1.2), largeur=1.05,
                         hauteur=0.62, fs=32)
        pts = Text("…", font_size=40, color=GREY_B).move_to(P(0.9, -1.2))
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases[:3]], lag_ratio=0.3), run_time=0.3)
        petits = self.arcs(lg, [(0, 1), (1, 2)], couleur=TERME, creux=0.2)
        self.play(LaggedStart(*[Create(a) for a in petits], lag_ratio=0.6), run_time=0.3)
        grand = CurvedArrow(lg.cases[0][0].get_corner(UL) + P(0.15, 0.06), lg.cases[3][0].get_corner(UR) + P(-0.15, 0.06),
                            angle=-0.9, color=RAISON, stroke_width=5, tip_length=0.18)
        self.play(FadeIn(lg.cases[3], scale=0.8), FadeIn(pts), Create(grand), run_time=0.6)

    def ecran_garde(self):
        self.garde("Suites",
                   [("définies par récurrence", "par récurrence", TERME),
                    ("Comment calculer un terme à partir du précédent,", "Comment calculer"),
                    ("et quand passer à une formule directe ?", "et quand")],
                   dessin=self.dessin_garde, extrait_titre="Suite")

    # ── 01 : Awa et la jeune tortue ────────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.6
        pers = awa(1.05).move_to(P(x, 1.75))
        nom = self.t("Awa", 46, JAUNE_TITRE).move_to(P(x, 0.5))
        met = self.t("vétérinaire", 34, TERME).move_to(P(x, -0.05))
        self.au_mot("Awa")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("vétérinaire")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        cen = VGroup(self.t("un centre de soins", 32, GREY_A, larg=4.0), self.t("pour tortues marines", 32, GREY_A, larg=4.0))
        cen.arrange(DOWN, buff=0.1).move_to(P(-4.5, -1.0))
        bal = balance(1.2).move_to(P(1.2, -0.2))
        tor = tortue(0.95).next_to(bal[0], UP, buff=0.02)
        self.au_mot("centre de soins")
        self.play(FadeIn(cen[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("tortues marines")
        self.play(FadeIn(cen[1], shift=UP * 0.1), FadeIn(tor, shift=DOWN * 0.3), run_time=0.45)
        self.au_mot("À son arrivée")
        self.play(FadeIn(bal, shift=UP * 0.1), run_time=0.4)
        self.suivre("40")
        g40 = self.t("40 g", 30, JUSTE).move_to(bal.ecran)
        lab = self.t("à l'arrivée : 40 g", 40, TERME).move_to(P(1.2, 2.6))
        self.play(FadeIn(g40, scale=1.3), FadeIn(lab, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Chaque semaine")
        sem = self.t("chaque semaine :", 40, RAISON).move_to(P(0, -2.35)).align_to(P(-2.7, 0), LEFT)
        self.play(FadeIn(sem, shift=UP * 0.1), run_time=0.3)
        self.suivre("15")
        p15 = self.t("+ 15 g", 46, RAISON).next_to(sem, RIGHT, buff=0.3)
        self.play(FadeIn(p15, scale=1.3), tor.animate.scale(1.15, about_edge=DOWN), run_time=0.45)
        self.play(Indicate(p15, color=RAISON, scale_factor=1.2), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : la définition par récurrence ──────────────────────────────────

    def ecran_recurrence(self):
        self.nouvel_ecran("02-recurrence")
        self.calc([("uₙ :", TERME, "u indice n"), ("sa masse, en grammes, après", WHITE, "sa masse"),
                   ("n semaines", RAISON, "après n semaines")], 2.95, centre=0, fs=40, larg=12.4)
        u0 = self.calc([("La suite commence à", WHITE, "la suite commence"), ("u₀ =", TERME, "u indice 0"),
                        ("40", TERME, "40")], 2.15, centre=0, fs=40, larg=12.4)
        lg = LigneTermes(["uₙ", "uₙ₊₁"], centre=P(-3.5, 0.3), pas=2.8, largeur=1.5, hauteur=0.9, fs=40)
        self.au_mot("Pour passer")
        self.play(*[FadeIn(c) for c in lg.cases], run_time=0.35)
        self.au_mot("on ajoute")
        self.suivre("15")
        self.sauter(lg, 0, "+ 15", cote=UP)
        f = self.calc([("uₙ₊₁ =", TERME, "u indice n plus 1 égale"), ("uₙ", TERME, None), ("+ 15", RAISON, "plus 15")],
                      0.3, centre=2.75, fs=54, larg=6.6)
        self.au_mot("définition par récurrence")
        d = self.t("C'est une définition par récurrence :", 42, JAUNE_TITRE).move_to(P(0, -0.95))
        self.play(FadeIn(d, shift=UP * 0.1), run_time=0.35)
        t1 = self.t("un premier terme", 38, TERME).move_to(P(-3.4, -2.05))
        t2 = VGroup(self.t("une règle pour", 38, RAISON), self.t("passer au suivant", 38, RAISON))
        t2.arrange(DOWN, buff=0.1).move_to(P(2.2, -2.05))
        self.au_mot("un premier terme")
        c1 = self.encadre(u0[1:].copy().shift(RIGHT * 0.2), TERME, 0.12)
        self.play(FadeIn(t1, shift=UP * 0.1), u0[1:].animate.shift(RIGHT * 0.2), Create(c1), run_time=0.4)
        self.au_mot("une règle")
        c2 = self.encadre(f, RAISON, 0.15)
        self.play(FadeIn(t2, shift=UP * 0.1), Create(c2), Indicate(lg.sauts[0], color=RAISON), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 03 : de proche en proche ───────────────────────────────────────────

    def ecran_proche(self):
        self.nouvel_ecran("03-proche")
        self.titre("De proche en proche", JAUNE_TITRE, 46, extrait="de proche", y=3.2)
        xs = [-4.5, -1.7, 1.1, 3.9]
        lg = LigneTermes(["40", "55", "70", "85"], xs=xs, centre=P(0, -0.9), largeur=1.6, hauteur=0.95, fs=46,
                         noms=[u(k) for k in range(4)])
        lg.cases[0][1]._pas_audit = True       # u₀ = 40 : la donnée de départ (dite à l'écran 02)
        tor = [tortue(0.55 + 0.1 * k).move_to(P(xs[k], 1.25)) for k in range(4)]
        self.play(FadeIn(lg.cases[0]), FadeIn(lg.noms[0]), FadeIn(tor[0], scale=0.8), run_time=0.35)
        for k, (nom, val) in enumerate((("u indice 1", "55"), ("u indice 2", "70"), ("u indice 3", "85"))):
            self.suivre(nom)
            sa = lg.saut(k, "+ 15", cote=UP)
            sa[1]._pas_audit = True             # la règle de l'écran 02 (+ 15), redite par le dessin
            self.play(Create(sa[0]), FadeIn(sa[1], scale=1.3), FadeIn(lg.cases[k + 1][0]),
                      FadeIn(lg.noms[k + 1]), run_time=0.35)
            self.suivre(val)
            self.play(FadeIn(lg.cases[k + 1][1], scale=1.4), TransformFromCopy(tor[k], tor[k + 1]), run_time=0.4)
        self.play(*self.allumer_cases(lg, [3]), Indicate(tor[3], scale_factor=1.15), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : u₂ = 9 → A ─────────────────────────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["9", "5", "10"], largeur=3.3, fs=56, y=-0.55, pas=3.6)
        for c in cartes:
            c.shift(LEFT * 0.5)

        def e1():
            self.au_mot("Une suite")
            self.play(FadeIn(self.t("Une suite est définie par :", 40).move_to(P(-0.5, 2.25)), shift=UP * 0.1),
                      run_time=0.3)
            self.calc([("u₀ =", TERME, "u indice 0"), ("3", TERME, "3"), ("et", WHITE, "et"),
                       ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("2uₙ", RAISON, "2 u indice n"),
                       ("− 1", RAISON, "moins 1")], 1.4, centre=-0.5, fs=52, larg=12)
            self.calc([("Combien vaut", RAISON, "Combien vaut"), ("u₂ ?", TERME, "u indice 2")], 0.55, centre=-0.5,
                      fs=46, larg=12)

        q = self.question_libre("04-question", [e1], cartes, P(-0.5, -1.65))
        self.dire("04b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.calc([("u₁ =", TERME, "u indice 1"), ("2 ×", WHITE, "2 fois"), ("3", TERME, "3"), ("− 1", RAISON, "moins 1"),
                   ("=", WHITE, "égale"), ("5", JUSTE, "5")], -1.75, centre=-0.5, fs=46, larg=11)
        c = self.calc([("u₂ =", TERME, "u indice 2"), ("2 ×", WHITE, "2 fois"), ("5", TERME, "5"),
                       ("− 1", RAISON, "moins 1"), ("=", WHITE, "égale"), ("9", JUSTE, "9")], -2.6, centre=-0.5,
                      fs=46, larg=11)
        self.decoller_encadrer(c[-1])
        self.attendre_voix(marge=0.6)

    # ── 05 : 52 semaines : la forme explicite ──────────────────────────────

    def ecran_explicite(self):
        self.nouvel_ecran("05-explicite")
        self.calc([("La masse après", WHITE, "la masse après"), ("52 semaines :", TERME, "52"), ("u₅₂ ?", TERME, None)],
                  3.1, centre=0, fs=44, larg=12)
        xs = [-4.4 + 1.15 * k for k in range(6)] + [3.9]
        lg = LigneTermes(["", "", "", "", "", "", "?"], xs=xs, centre=P(0, 1.75), largeur=0.85, hauteur=0.62, fs=30,
                         noms=[u(k) for k in range(6)] + ["u₅₂"], fs_noms=26)
        pts = Text("…", font_size=44, color=GREY_B).move_to(P(2.25, 1.75))
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases], lag_ratio=0.08), FadeIn(lg.noms), FadeIn(pts),
                  run_time=0.5)
        self.suivre("52 calculs")
        petits = self.arcs(lg, [(k, k + 1) for k in range(6)], couleur=GREY_B, creux=0.2)
        cal = self.t("52 calculs !", 42, PIEGE).move_to(P(0, 0.65))
        self.play(LaggedStart(*[Create(a) for a in petits], lag_ratio=0.4), FadeIn(cal, scale=1.2), run_time=0.8)
        self.au_mot("On ajoute toujours")
        self.calc([("On ajoute toujours", WHITE, None), ("15 :", RAISON, "15"),
                   ("c'est une suite arithmétique", JAUNE_TITRE, "suite arithmétique")], -0.25, centre=0, fs=40, larg=12,
                  avec=[petits.animate.set_color(RAISON)])
        f = self.calc([("Forme explicite :", JAUNE_TITRE, "forme explicite"), ("uₙ =", TERME, "u indice n égale"),
                       ("40", TERME, "40"), ("+ 15n", RAISON, "plus 15 n")], -1.2, centre=0, fs=50, larg=12)
        self.decoller_encadrer(f[1:], dx=0.2, buff=0.16)
        grand = CurvedArrow(lg.cases[0][0].get_bottom() + DOWN * 0.42, lg.cases[6][0].get_bottom() + DOWN * 0.42,
                            angle=0.32, color=JUSTE, stroke_width=5, tip_length=0.2)
        v = self.t("820", 30, JUSTE).move_to(lg.cases[6][0])
        self.calc([("u₅₂ =", TERME, "u indice 52"), ("40 + 15 ×", WHITE, "40 plus 15 fois"), ("52", TERME, "52"),
                   ("=", WHITE, "égale"), ("820 g", JUSTE, "820")], -2.3, centre=-0.6, fs=48, larg=10,
                  avec_morceau={4: [Transform(lg.cases[6][1], v), Create(grand), FadeOut(cal)]})
        self.attendre_voix(marge=0.6)

    # ── 06 : dans l'autre sens : les algues ────────────────────────────────

    def ecran_inverse(self):
        self.nouvel_ecran("06-inverse")
        self.titre("Dans l'autre sens", JAUNE_TITRE, 46, extrait="l'autre sens", y=3.2)
        bs = bassin(3.4, 2.1).move_to(P(-4.45, 0.75))
        ag = VGroup(*[algue(bs.get_center() + P(*PLACES_ALGUES[k]), 0.9) for k in range(2)])
        cap = self.t("le bassin", 32, GREY_A).next_to(bs, DOWN, buff=0.15)
        self.au_mot("Dans le bassin")
        self.play(FadeIn(bs, shift=UP * 0.15), FadeIn(cap), run_time=0.4)
        self.au_mot("algues")
        self.play(LaggedStart(*[GrowFromEdge(a, DOWN) for a in ag], lag_ratio=0.3), run_time=0.5)
        xc = 2.3
        self.calc([("vₙ =", TERME, "v indice n égale"), ("5", TERME, "5 fois"), ("× 2ⁿ", RAISON, "2 puissance")],
                  2.05, centre=xc, fs=56, larg=7.4)
        self.calc([("en kg, après n mois", GREY_A, "en kilogrammes")], 1.3, centre=xc, fs=32, larg=7.4)
        lg = LigneTermes([u("n", "v"), u("n+1", "v")], xs=[-1.0, 1.4], centre=P(0, -0.45), largeur=1.5, hauteur=0.9,
                         fs=40)
        self.au_mot("Chaque terme")
        self.play(*[FadeIn(c) for c in lg.cases], run_time=0.35)
        self.suivre("2 fois")
        ag2 = VGroup(*[algue(bs.get_center() + P(*PLACES_ALGUES[k]), 0.9) for k in range(2, 4)])
        self.sauter(lg, 0, "× 2", cote=UP)
        self.play(*[TransformFromCopy(a, b) for a, b in zip(ag, ag2)], run_time=0.4)
        self.calc([("vₙ₊₁ =", TERME, "v indice n plus 1"), ("2vₙ", RAISON, "2 v indice n")], -0.45, centre=4.5,
                  fs=46, larg=3.2)
        self.calc([("avec", WHITE, "avec"), ("v₀ =", TERME, "v indice 0"), ("5", TERME, "5")], -1.5, centre=xc,
                  fs=46, larg=7.4)
        self.calc([("forme explicite", TERME, "On passe"), ("→", WHITE, None), ("récurrence", RAISON, "récurrence")],
                  -2.4, centre=-0.4, fs=44, larg=10)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : la suite commence à u₁ ─────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        self.calc([("Awa note", WHITE, "Awa note"), ("u₁", PIEGE, "u indice 1"),
                   ("la masse à l'arrivée", WHITE, "la masse")], 2.35, centre=0, fs=42, larg=12)
        lg = LigneTermes(["40", "", "", ""], xs=[-3.6, -1.6, 0.4, 3.4], centre=P(0, 0.85), largeur=1.4, hauteur=0.85,
                         fs=42, noms=["u₁", "u₂", "u₃", "uₙ"])
        pts = Text("…", font_size=48, color=GREY_B).move_to(P(1.9, 0.85))
        self.au_mot("la suite commence")
        self.play(*[FadeIn(c[0]) for c in lg.cases], FadeIn(lg.noms), FadeIn(pts), run_time=0.4)
        self.play(Indicate(lg.noms[0], color=PIEGE, scale_factor=1.5), run_time=0.35)
        self.suivre("40")
        self.play(FadeIn(lg.cases[0][1], scale=1.4), run_time=0.3)
        self.au_mot("au rang n")
        self.play(Indicate(lg.noms[3], color=PIEGE, scale_factor=1.5), run_time=0.35)
        self.au_mot("1 semaines")
        arcs = self.arcs(lg, [(0, 1), (1, 2), (2, 3)], couleur=RAISON, creux=0.25)
        ns = self.t("n − 1 semaines", 40, RAISON).move_to(P(-0.1, -0.35))
        self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.4), FadeIn(ns, shift=UP * 0.1), run_time=0.7)
        f = self.calc([("uₙ =", TERME, "u indice n égale"), ("40", TERME, "40"), ("+ 15 ×", RAISON, "plus 15 fois"),
                       ("(n − 1)", PIEGE, "n moins 1")], -1.35, centre=-0.4, fs=52, larg=11)
        self.play(Create(self.encadre(f, JUSTE, 0.16)), run_time=0.3)
        b = self.calc([("Avec", WHITE, "Avec"), ("40 + 15n", WHITE, "40 plus 15 n"), (":", WHITE, None)],
                      -2.5, centre=-3.7, fs=38, larg=6)
        self.au_mot("compterait")
        tr = Line(b[1].get_left() + LEFT * 0.03, b[1].get_right() + RIGHT * 0.03, stroke_color=PIEGE,
                  stroke_width=5).move_to(b[1].get_center())
        trop = self.t("une semaine de trop !", 38, PIEGE).next_to(b, RIGHT, buff=0.3)
        self.play(Create(tr), run_time=0.3)
        self.au_mot("une semaine de trop")
        self.play(FadeIn(trop, shift=LEFT * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : la définition explicite → B ─────────────

    def ecran_question2(self):
        xb = -2.4
        fs = 42
        corps = [self.morceaux_ligne(p, fs) for p in (
            [("u₀ =", WHITE, "u indice 0"), ("2", WHITE, "2"), ("et uₙ₊₁ =", WHITE, "et"), ("3uₙ", WHITE, "3")],
            [("uₙ =", WHITE, "u indice n égale"), ("n²", WHITE, "n au carré"), ("− 4", WHITE, "moins 4")],
            [("u₁ =", WHITE, "u indice 1"), ("5", WHITE, "5"), ("et uₙ₊₁ =", WHITE, "et"),
             ("uₙ + n", WHITE, "u indice n plus n")])]
        larg = 7.6
        place = larg - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, larg, fs) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.18).move_to(P(xb, 0)).align_to(P(0, 1.0), UP)

        def e1():
            self.au_mot("Laquelle")
            self.play(FadeIn(self.t("Laquelle de ces suites est définie", 42).move_to(P(-0.3, 2.3)), shift=UP * 0.1),
                      run_time=0.3)
            self.calc([("de façon", WHITE, "de façon"), ("explicite ?", RAISON, "explicite")], 1.65, centre=-0.3,
                      fs=42, larg=12)

        q = self.question_libre("08-question", [e1], cartes, P(xb, cartes.get_bottom()[1] - 0.42))
        self.dire("08b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        x, L = 4.25, 4.3
        self.calc([("uₙ", TERME, "u indice n est"), ("est donné", WHITE, None)], 0.75, centre=x, fs=40, larg=L)
        self.calc([("directement", JUSTE, "directement")], 0.15, centre=x, fs=40, larg=L)
        self.calc([("en fonction de", WHITE, "en fonction"), ("n", RAISON, None)], -0.45, centre=x, fs=40, larg=L)
        c = self.calc([("u₁₀₀", TERME, "u indice 100"), ("tout de suite", JUSTE, "tout de suite")], -1.3, centre=x,
                      fs=40, larg=L)
        self.play(Create(self.encadre(c, JUSTE, 0.14)), run_time=0.3)
        self.calc([("sans les termes d'avant", GREY_A, "sans les termes")], -2.05, centre=x - 0.3, fs=32, larg=L)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : u₁ = 7, − 4 à chaque fois ───────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        self.au_mot("Une suite")
        self.play(FadeIn(self.t("Une suite est définie par :", 42).move_to(P(-2.5, 2.35)), shift=UP * 0.1),
                  run_time=0.3)
        self.calc([("u₁ =", TERME, "u indice 1 égale"), ("7", TERME, "7")], 2.35, centre=2.6, fs=42, larg=4)
        self.calc([("et, pour n ≥", WHITE, "pour n"), ("1,", WHITE, "1"), ("uₙ₊₁ =", TERME, "u indice n plus 1"), ("uₙ", TERME, None),
                   ("− 4", RAISON, "moins 4")], 1.6, centre=0, fs=42, larg=12)
        lg = LigneTermes(["7", "?", "?"], centre=P(-0.5, -0.15), pas=2.6, largeur=1.3, hauteur=0.8, fs=40,
                         noms=[u(1), u(2), u(3)])
        lg.cases[0][1]._pas_audit = True
        self.play(*[FadeIn(c) for c in lg.cases], FadeIn(lg.noms), run_time=0.35)
        sa = [lg.saut(k, "− 4", cote=UP) for k in range(2)]
        for s in sa:
            s[1]._pas_audit = True
        self.play(*[Create(s[0]) for s in sa], *[FadeIn(s[1], scale=1.3) for s in sa], run_time=0.4)
        self.calc([("Donne sa", JAUNE_TITRE, "Donne"), ("forme explicite,", JAUNE_TITRE, "forme explicite"),
                   ("puis calcule", JAUNE_TITRE, "puis calcule"), ("u₃₀.", TERME, "u indice 30")], -1.35, centre=0,
                  fs=42, larg=12)
        self.defi_pause(-2.4, x=-0.6)
        self._defi = (tit, [m for m in self.mobjects if m is not tit and m is not self._margo])

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, efface = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], run_time=0.45)
        self.remove(*efface)
        self.calc([("On enlève", WHITE, "On enlève"), ("4", RAISON, "4"), ("à chaque fois :", WHITE, None)], 2.35,
                  centre=-0.4, fs=42, larg=12)
        self.calc([("suite arithmétique", JAUNE_TITRE, "suite arithmétique"), ("de raison", WHITE, "de raison"),
                   ("r = −4,", RAISON, "moins 4")], 1.65, centre=-0.4, fs=42, larg=12)
        self.calc([("qui commence à", WHITE, "qui commence"), ("u₁", PIEGE, "u indice 1")], 0.95, centre=-0.4, fs=42,
                  larg=12)
        f = self.calc([("uₙ =", TERME, "u indice n égale"), ("7", TERME, "7"), ("− 4 ×", RAISON, "moins 4 fois"),
                       ("(n − 1)", PIEGE, "n moins 1")], -0.1, centre=-0.4, fs=52, larg=11)
        self.play(Create(self.encadre(f, JUSTE, 0.16)), run_time=0.3)
        self.calc([("u₃₀ =", TERME, "u indice 30"), ("7 − 4 ×", WHITE, "7 moins 4 fois"), ("29", RAISON, "29")],
                  -1.3, centre=-0.4, fs=46, larg=11)
        c = self.calc([("=", WHITE, "égale"), ("7 − 116", WHITE, "7 moins 116"), ("=", WHITE, "égale"),
                       ("−109", JUSTE, "moins 109")], -2.25, centre=-0.4, fs=46, larg=11)
        self.decoller_encadrer(c[-1])
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d)  # noqa: E731
        p1 = [tc("Une récurrence : un premier terme", {"un premier terme": TERME}),
              tc("et une règle pour passer au suivant ;", {"une règle": RAISON}),
              tc("on calcule de proche en proche.", {"de proche en proche": TERME})]
        p2 = [tc("Terme lointain : arithmétique ou géométrique ?", {"arithmétique ou géométrique": JAUNE_TITRE}),
              tc("On passe à la forme explicite.", {"forme explicite": JUSTE})]
        p3 = [tc("Vérifie où commence la suite : u₀ ou u₁ ?", {"u₀ ou u₁": PIEGE})]
        self.finale([(p1, ["Une récurrence", "et une règle", "on calcule"]), (p2, ["Pour un terme", "et on passe"]),
                     (p3, ["Et on vérifie"])], cle="10-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_recurrence()
        self.ecran_proche()
        self.ecran_question1()
        self.ecran_explicite()
        self.ecran_inverse()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("11-abonne")
