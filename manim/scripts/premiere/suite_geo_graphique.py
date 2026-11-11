# suite_geo_graphique.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# la représentation graphique » (16:9), ceinture VERTE. Série SUITES, épisode 15.
# Micro du coach : expo_suite_graphique (notion expo_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts (aGraphNature, gGraphLireQ, gGraphDeux,
# gGraphConjecture, gGraphPoint ; indice « Points alignés : arithmétique ;
# points qui se creusent : géométrique »). Jumelle de l'ép. 07 (arith-graphique).
#
# Ce que demande le coach → écran :
#   · nature du nuage (alignés / courbe qui se creuse)   → 03-courbe, 07-question ;
#   · lire u₀, u₁ puis q = u₁ ÷ u₀ (gGraphLireQ)          → 02-points, 04-question ;
#   · deux nuages : lequel est géométrique (gGraphDeux)   → 07-question ;
#   · conjecture : q > 1 → aussi grand que l'on veut ;
#     0 < q < 1 → vers 0 (gGraphConjecture)               → 05-conjecture, 08 défi ;
#   · un point du nuage (gGraphPoint, piège a × q × k)    → 08 défi, 08b ;
#   · erreur typique : lire la raison comme un écart       → 04b, 06-piege (courbe « petite »).
# Clé de voix → écran :
#   00-garde (points qui se creusent, courbe pointillée) · 01 Laura, technicienne
#   qualité en cuisine centrale : la marmite, le frigo, le plat oublié (100
#   bactéries qui doublent toutes les 20 min) · 02 le tableau n / uₙ et les points
#   (0 ; 100) … (4 ; 1 600) qui se posent, le plat qui se remplit · 03 pas alignés
#   (la droite rouge), la courbe qui se creuse, les écarts orange 100 ; 200 ; 400 ;
#   800, q > 1 · 04/04b question (A : 0,5 ; −20 = l'écart) · 05 q > 1 / 0 < q < 1
#   (deux cartes), puis la planche à découper (− 90 % : 10 000 ; 1 000 ; 100 ; 10,
#   q = 0,1) · 06 le piège : 13 points, u₆ = 6 400 tout en bas, u₁₂ = 409 600 ·
#   07/07b question (B : la rouge) · 08/08b défi uₙ = 3 × 2ⁿ, (4 ; 48) ou (4 ; 24)
#   · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes et points, orange = raison et
# écarts, vert = juste, rouge = piège. ⛔ Pas de LaTeX : Text et MarkupText.
# Voix : manim/voix/premiere-suite-geo-graphique.json (débit −6), calée mot à mot
# par suite_geo_graphique_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_graphique.py SuiteGeoGraphique1re -o eleveai-maths-premiere-suite-geo-graphique --media_dir manim/scripts/premiere/media-suite-geo-graphique
# Sortie : manim/sorties/premiere/maths/suites/15-geo-graphique/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import GRIS_DROITE, OutilsGraphique, Repere, formule  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers, liste_aeree, points_disque  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12 : calcul sur une ligne de base)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
BACT = [100 * 2 ** n for n in range(13)]
assert BACT[:5] == [100, 200, 400, 800, 1600]
assert [b - a for a, b in zip(BACT, BACT[1:4 + 1])] == [100, 200, 400, 800]       # les écarts grandissent
assert BACT[6] == 100 * 2 ** 6 == 6400 and BACT[12] == 409600                        # le piège : 2 h, 4 h
assert 6 * 20 == 120 and 12 * 20 == 240
assert 20 / 40 == 0.5 and 20 - 40 == -20                                              # question 1 : A (0,5)
PLANCHE = [10000, 1000, 100, 10]
assert all(abs(b - a * 0.1) < 1e-9 for a, b in zip(PLANCHE, PLANCHE[1:]))           # − 90 % : q = 0,1
BLEUE, ROUGE = [3, 6, 9, 12], [3, 6, 12, 24]
assert len({b - a for a, b in zip(BLEUE, BLEUE[1:])}) == 1                           # la bleue : + 3
assert len({b / a for a, b in zip(ROUGE, ROUGE[1:])}) == 1                           # question 2 : B (la rouge)
assert 3 * 2 ** 4 == 3 * 16 == 48 and 3 * 2 * 4 == 24                               # défi : (4 ; 48)

PEAU, CHARLOTTE, BLOUSE = "#c68642", "#BFDBFE", "#F1F5F9"
SAUCE, BOIS, ROUGE_S = "#3f3f46", "#B45309", PIEGE


# ── les dessins de l'épisode ────────────────────────────────────────────────

def laura(s=1.0):
    """Laura, technicienne qualité : charlotte bleue, blouse, une fiche de contrôle."""
    charlotte = Ellipse(width=0.74, height=0.36, fill_color=CHARLOTTE, fill_opacity=1, stroke_width=0)
    charlotte.move_to(P(0, 1.25))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=BLOUSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = VGroup(Line(P(-0.18, 0.66), P(0, 0.4)), Line(P(0.18, 0.66), P(0, 0.4))).set_stroke("#94A3B8", 4)
    fiche = RoundedRectangle(width=0.42, height=0.56, corner_radius=0.04, fill_color="#FEF3C7", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2).move_to(P(0.66, 0.12))
    lignes = VGroup(*[Line(P(0.52, y), P(0.8, y), stroke_color=GREY_D, stroke_width=2) for y in (0.26, 0.14, 0.02)])
    coche = VMobject(stroke_color=JUSTE, stroke_width=3).set_points_as_corners([P(0.52, -0.08), P(0.58, -0.14),
                                                                                P(0.68, -0.02)])
    return VGroup(corps, col, tete, charlotte, fiche, lignes, coche).scale(s)


def marmite(s=1.0):
    """La marmite de la cuisine centrale, et sa vapeur."""
    corps = RoundedRectangle(width=1.3, height=0.8, corner_radius=0.12, fill_color=GREY_B, fill_opacity=1,
                             stroke_width=0)
    bord = RoundedRectangle(width=1.5, height=0.14, corner_radius=0.05, fill_color=GREY_A, fill_opacity=1,
                            stroke_width=0).next_to(corps, UP, buff=0)
    anses = VGroup(*[RoundedRectangle(width=0.22, height=0.12, corner_radius=0.04, fill_color=GREY_A,
                                      fill_opacity=1, stroke_width=0).move_to(P(x, 0.22)) for x in (-0.78, 0.78)])
    vapeur = VGroup(*[VMobject(stroke_color=GREY_A, stroke_width=4).set_points_smoothly(
        [P(x, 0.6), P(x + 0.1, 0.78), P(x - 0.05, 0.95), P(x + 0.06, 1.12)]) for x in (-0.35, 0.0, 0.35)])
    return VGroup(corps, bord, anses, vapeur).scale(s)


def frigo(s=1.0):
    """Le frigo : deux portes, deux poignées."""
    caisse = RoundedRectangle(width=1.2, height=2.2, corner_radius=0.1, fill_color="#E2E8F0", fill_opacity=1,
                              stroke_color=GREY_B, stroke_width=3)
    sep = Line(P(-0.6, 0.35), P(0.6, 0.35), stroke_color=GREY_B, stroke_width=3)
    poignees = VGroup(Line(P(0.4, 0.55), P(0.4, 0.85)), Line(P(0.4, -0.05), P(0.4, 0.15))).set_stroke("#475569", 6)
    return VGroup(caisse, sep, poignees).scale(s)


PTS_PLAT = points_disque(32, 0.58)


def plat(centre, n, avant=0, r=0.85):
    """Le plat oublié, vu de dessus : l'assiette, la sauce, n bactéries (les
    `avant` premières en bleu, les nouvelles en orange)."""
    c = np.array(centre, dtype=float)
    assiette = Circle(radius=r, fill_color="#F8FAFC", fill_opacity=1, stroke_color=GREY_B, stroke_width=3).move_to(c)
    sauce = Circle(radius=r * 0.8, fill_color=SAUCE, fill_opacity=1, stroke_width=0).move_to(c)
    k = r / 0.85
    anc = VGroup(*[Dot(c + P(x * k, y * k), radius=0.06 * k, color=TERME) for x, y in PTS_PLAT[:avant]])
    neu = VGroup(*[Dot(c + P(x * k, y * k), radius=0.06 * k, color=RAISON) for x, y in PTS_PLAT[avant:n]])
    return VGroup(VGroup(assiette, sauce), anc, neu)


def danger(s=1.0):
    """Le panneau « risque » : un triangle orange et son point d'exclamation."""
    tri = Triangle(fill_color=RAISON, fill_opacity=1, stroke_color=RAISON, stroke_width=4).scale(0.45)
    ex = VGroup(RoundedRectangle(width=0.08, height=0.26, corner_radius=0.03), Dot(radius=0.05))
    ex[0].move_to(tri.get_center() + P(0, 0.02))
    ex[1].move_to(tri.get_center() + P(0, -0.2))
    ex.set_fill("#111827", 1).set_stroke(width=0)
    return VGroup(tri, ex).scale(s)


def horloge_min(centre, r=0.38):
    """Une horloge : la grande aiguille (orange) tourne de 20 min (un tiers de tour)."""
    c = np.array(centre, dtype=float)
    cadran = Circle(radius=r, stroke_color=WHITE, stroke_width=3).move_to(c)
    marques = VGroup(*[Line(c + r * 0.72 * np.array([np.cos(a), np.sin(a), 0]),
                            c + r * 0.95 * np.array([np.cos(a), np.sin(a), 0]), stroke_width=2, color=GREY_B)
                       for a in np.arange(0, TAU, TAU / 12)])
    petite = Line(c, c + P(0.18, 0.12) * r / 0.38, stroke_color=WHITE, stroke_width=4)
    grande = Line(c, c + UP * r * 0.8, stroke_color=RAISON, stroke_width=4)
    return VGroup(cadran, marques, petite), grande


def planche_bois(centre, larg=2.9, haut=1.7):
    """La planche à découper (bois), son trou pour l'accrocher."""
    c = np.array(centre, dtype=float)
    p = RoundedRectangle(width=larg, height=haut, corner_radius=0.22, fill_color=BOIS, fill_opacity=1,
                         stroke_color="#78350F", stroke_width=3).move_to(c)
    trou = Circle(radius=0.12, fill_color=FOND_CARTE, fill_opacity=1, stroke_color="#78350F",
                  stroke_width=2).move_to(c + P(larg / 2 - 0.28, haut / 2 - 0.28))
    return VGroup(p, trou)


def spray(s=1.0):
    """Le flacon de produit nettoyant, et sa bruine."""
    corps = RoundedRectangle(width=0.5, height=0.85, corner_radius=0.1, fill_color="#22C55E", fill_opacity=1,
                             stroke_width=0)
    tete = Rectangle(width=0.36, height=0.22, fill_color=GREY_A, fill_opacity=1, stroke_width=0)
    tete.next_to(corps, UP, buff=0)
    bec = Rectangle(width=0.28, height=0.08, fill_color=GREY_A, fill_opacity=1, stroke_width=0)
    bec.next_to(tete, LEFT, buff=0).shift(UP * 0.04)
    bruine = VGroup(*[Dot(bec.get_left() + P(-0.12 - 0.12 * i, 0.12 * (j - 1) * (1 + i * 0.4)), radius=0.03,
                          color=GREY_A) for i in range(3) for j in range(3)])
    return VGroup(corps, tete, bec, bruine).scale(s)


class Tableau(VGroup):
    """Le tableau n / uₙ (deux lignes) : la colonne des noms, puis une colonne
    par terme ; self.case(ligne, k) : le cadre de la case ; les nombres sont
    écrits plus tard (ecrire_dans), au moment où la voix les dit."""

    def __init__(self, x0, y, largs, larg_tete=0.8, haut=0.62, noms=("n", "uₙ"), fs=30):
        super().__init__()
        self.cadres = [[], []]
        x = x0
        for k, w in enumerate([larg_tete] + list(largs)):
            for i in range(2):
                c = Rectangle(width=w, height=haut, stroke_color=GREY_B, stroke_width=2.5,
                              fill_color=FOND_CARTE if k else "#111a2e", fill_opacity=1)
                c.move_to(P(x + w / 2, y + (0.5 - i) * haut))
                self.cadres[i].append(c)
                self.add(c)
            x += w
        self.noms = VGroup(*[Text(nm, font_size=fs, color=TERME if i else GREY_A).move_to(self.cadres[i][0])
                             for i, nm in enumerate(noms)])
        self.add(self.noms)

    def case(self, i, k):
        return self.cadres[i][k + 1]


class SuiteGeoGraphique1re(AuditMilliers, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_geo_graphique_marques.json"
    nom_voix = "premiere-suite-geo-graphique"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    XG = -3.3                     # le centre de la colonne de gauche (texte), x ∈ [−6,55 ; −0,05]

    def tc(self, texte, fs, t2c, larg=6.4):
        """Une ligne (une taille, une ligne de base) avec des mots colorés."""
        t = Text(texte, font_size=fs, color=WHITE, t2c=t2c)
        if t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def tg(self, texte, fs=36, color=WHITE, audit=True):
        """Une ligne de la colonne de gauche (au plus 6,4 de large)."""
        return self.t(texte, fs, color, larg=6.4, audit=audit)

    def ecrire_dans(self, cadre, texte, fs=30, couleur=WHITE, anims=(), run_time=0.25):
        """Un nombre dans une case : centré, marge intérieure de 0,14 de chaque côté."""
        tx = Text(texte, font_size=fs, color=couleur)
        if tx.width > cadre.width - 0.28:
            tx.scale_to_fit_width(cadre.width - 0.28)
        tx.move_to(cadre)
        self.play(FadeIn(tx, scale=1.4), *anims, run_time=run_time)
        return tx

    def mini_creuse(self, larg, haut, vals=(1, 2, 4, 8, 16)):
        """Un petit nuage qui se creuse (coin d'axes + points + courbe pointillée)."""
        n, vmax = len(vals), max(vals)
        pts = [P(-larg / 2 + 0.14 + k * (larg - 0.28) / (n - 1), -haut / 2 + 0.1 + v / vmax * (haut - 0.22))
               for k, v in enumerate(vals)]
        ax = VGroup(Line(P(-larg / 2, -haut / 2), P(larg / 2, -haut / 2)),
                    Line(P(-larg / 2, -haut / 2), P(-larg / 2, haut / 2))).set_stroke(GREY_B, 2)
        cb = DashedVMobject(VMobject().set_points_smoothly(pts), num_dashes=14).set_stroke(GRIS_DROITE, 2)
        return VGroup(ax, cb, VGroup(*[Dot(p, radius=0.06, color=TERME) for p in pts]))

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def nuage_garde(self):
        """Des points qui se creusent (× 2), la courbe pointillée qui les porte."""
        vals = [1, 2, 4, 8, 16]
        pts = [P(-2.2 + 1.15 * k, -1.95 + 0.1 * v) for k, v in enumerate(vals)]
        dots = VGroup(*[Dot(p, radius=0.11, color=TERME) for p in pts])
        ecarts = VGroup(*[Line(P(pts[k + 1][0], pts[k][1]), pts[k + 1]).set_stroke(RAISON, 5) for k in range(4)])
        courbe = DashedVMobject(VMobject().set_points_smoothly(pts), num_dashes=26).set_stroke(GRIS_DROITE, 3)
        self.au_mot("son dessin")
        for k in range(5):
            anims = [GrowFromCenter(dots[k])]
            if k:
                anims.append(Create(ecarts[k - 1]))
            self.play(*anims, run_time=0.18)
        self.play(Create(courbe), run_time=0.45)
        self.bring_to_front(dots)

    def ecran_garde(self):
        self.garde("Suite géométrique",
                   [("la représentation graphique", "la représentation", TERME),
                    ("À quoi ressemble une suite qui multiplie,", "À quoi"),
                    ("et que nous dit son dessin ?", "et que nous")],
                   dessin=self.nuage_garde)

    # ── 01 : Laura et le plat oublié ───────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.2
        pers = laura(1.05).move_to(P(x, 1.95))
        nom = self.t("Laura", 44, JAUNE_TITRE).move_to(P(x, 0.72))
        met = [self.t("technicienne qualité", 30, TERME), self.t("en cuisine centrale", 30, TERME)]
        met[0].move_to(P(x, 0.15))
        met[1].move_to(P(x, -0.3))
        cant = self.t("repas des cantines", 28, GREY_A).move_to(P(x, -0.78))
        self.au_mot("Laura")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("technicienne")
        self.play(FadeIn(met[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("cuisine centrale")
        self.play(FadeIn(met[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("repas")
        self.play(FadeIn(cant, shift=UP * 0.1), run_time=0.35)
        fr_ = frigo(1.0).move_to(P(0.0, 1.05))
        cp = P(2.55, 1.05)
        pl = plat(cp, 8, 0, r=0.95)
        self.au_mot("Un plat")
        self.play(FadeIn(fr_, shift=RIGHT * 0.2), FadeIn(pl[0], scale=0.8), run_time=0.45)
        hors = self.t("hors du frigo", 30, GREY_A).move_to(P(2.55, -0.25))
        self.au_mot("hors du frigo")
        self.play(FadeIn(hors, shift=UP * 0.1), Indicate(fr_, color=GREY_A, scale_factor=1.05), run_time=0.4)
        self.suivre("100")
        cent = self.t("100 bactéries", 34, TERME).move_to(P(2.55, -0.78))
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pl[2]], lag_ratio=0.1), FadeIn(cent, scale=1.2),
                  run_time=0.5)
        cadran, grande = horloge_min(P(4.85, 2.2))
        self.suivre("20 minutes")
        vingt = self.t("20 min", 32, RAISON).next_to(cadran, DOWN, buff=0.14)
        self.play(FadeIn(cadran), FadeIn(grande), FadeIn(vingt, shift=UP * 0.1), run_time=0.35)
        self.play(Rotate(grande, angle=-TAU / 3, about_point=cadran[0].get_center()), run_time=0.6)
        self.au_mot("double")
        pl2 = plat(cp, 16, 8, r=0.95)
        fois = self.t("× 2", 48, RAISON, audit=False).move_to(P(4.85, 0.55))
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pl2[2]], lag_ratio=0.06), FadeIn(fois, scale=1.4),
                  run_time=0.6)
        self.play(Rotate(grande, angle=-TAU / 3, about_point=cadran[0].get_center()), run_time=0.5)
        pl3 = plat(cp, 32, 16, r=0.95)
        self.play(*[d.animate.set_color(TERME) for d in pl2[2]],
                  LaggedStart(*[GrowFromCenter(d) for d in pl3[2]], lag_ratio=0.04),
                  Indicate(fois, color=RAISON, scale_factor=1.25), run_time=0.6)
        self.au_mot("évaluer le risque")
        dg = danger(1.0)
        risque = self.t("évaluer le risque", 34, RAISON)
        VGroup(dg, risque).arrange(RIGHT, buff=0.3).move_to(P(-3.4, -2.3))
        self.play(FadeIn(dg, scale=0.6), FadeIn(risque, shift=RIGHT * 0.1), run_time=0.4)
        self.au_mot("d'un seul dessin")
        dessin = VGroup(self.t("un seul dessin :", 34), self.mini_creuse(1.3, 0.95)).arrange(RIGHT, buff=0.3)
        dessin.move_to(P(2.5, -2.3))
        self.play(FadeIn(dessin[0], shift=UP * 0.1), FadeIn(dessin[1], scale=0.7), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : le tableau et les points (n ; uₙ) ─────────────────────────────

    def repere_laura(self):
        return Repere((0, 4.5), (0, 1700), P(1.35, -2.2), P(5.15, 2.3), 200, etiq_u=(400, 800, 1200, 1600),
                      etiq_n=range(0, 5), buff_grad=0.2)

    def ecran_points(self):
        self.nouvel_ecran("02-points")
        x = self.XG
        l1 = formule([("u_{n}", TERME), (": le nombre", WHITE)], 42).move_to(P(x, 2.95))
        l2 = self.tg("de bactéries après", 38).move_to(P(x, 2.37))
        l3, (a3, b3) = self.ligne([("n périodes de", WHITE), ("20 min", WHITE)], 38)
        l3.move_to(P(x, 1.83))
        l4 = formule([("u_{0} =", TERME), ("100", WHITE)], 50).move_to(P(x, 1.08))
        self.au_mot("u indice n")
        self.play(FadeIn(l1.parts[0], scale=1.3), run_time=0.3)
        self.au_mot("le nombre")
        self.play(FadeIn(l1.parts[1], shift=UP * 0.08), run_time=0.3)
        self.au_mot("de bactéries")
        self.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("périodes")
        self.play(FadeIn(a3, shift=UP * 0.08), run_time=0.25)
        self.suivre("20")
        self.play(FadeIn(b3, shift=UP * 0.08), run_time=0.25)
        self.au_mot("u indice 0")
        self.play(FadeIn(l4.parts[0], scale=1.3), run_time=0.3)
        self.suivre("100")
        self.play(FadeIn(l4.parts[1], scale=1.3), run_time=0.3)
        tab = Tableau(-6.15, 0.0, [0.9, 0.9, 0.9, 0.9, 1.25])
        rep = self.repere_laura()
        self.au_mot("On place")
        self.play(*rep.anims(), FadeIn(tab), run_time=0.6)
        cp = P(x, -2.0)
        pl = plat(cp, 0, 0, r=0.72)
        self.play(FadeIn(pl[0], scale=0.8), run_time=0.3)
        pts, textes, bact = VGroup(), VGroup(), []
        for n in range(5):
            self.suivre(f"{n} et")
            textes.add(self.ecrire_dans(tab.case(0, n), str(n), run_time=0.15))
            self.suivre(fr(BACT[n]))
            d = rep.point(n, BACT[n], r=0.1)
            neu = plat(cp, 2 ** n, 2 ** n // 2 if n else 0, r=0.72)
            anims = [GrowFromCenter(d), Flash(d, color=TERME, line_length=0.12),
                     LaggedStart(*[GrowFromCenter(b) for b in neu[2]], lag_ratio=0.05)]
            if bact:
                anims.append(VGroup(*bact).animate.set_color(TERME))
            textes.add(self.ecrire_dans(tab.case(1, n), fr(BACT[n]), anims=anims, run_time=0.3))
            bact += list(neu[2])
            pts.add(d)
        self.attendre_voix(marge=0.5)
        self._laura = (rep, pts, VGroup(l1, l2, a3, b3, l4, tab, textes, pl[0], *bact))

    # ── 03 : pas alignés, la courbe se creuse ──────────────────────────────

    def ecran_courbe(self):
        self.dire("03-courbe")
        rep, pts, gauche = self._laura
        x = self.XG
        self.play(FadeOut(gauche), run_time=0.3)
        l1 = self.tc("Points pas alignés :", 40, {"pas alignés": PIEGE}).move_to(P(x, 2.95))
        dr = DashedLine(rep.G(0, BACT[0]), rep.G(4, BACT[4]), color=PIEGE, stroke_width=4, dash_length=0.12)
        self.au_mot("Ces points")
        self.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
        self.au_mot("pas alignés")
        self.play(Create(dr), run_time=0.5)
        self.bring_to_front(pts)
        self.play(*[Indicate(d, color=PIEGE, scale_factor=1.5) for d in pts[1:4]], run_time=0.4)
        self.play(dr.animate.set_stroke(opacity=0.0), run_time=0.3)
        self.remove(dr)
        l2 = self.tg("ils montent de plus").move_to(P(x, 2.32))
        l2b = self.tg("en plus vite,").move_to(P(x, 1.8))
        self.au_mot("ils montent")
        self.play(FadeIn(l2, shift=UP * 0.08), *[Indicate(d, color=TERME, scale_factor=1.4) for d in pts],
                  run_time=0.4)
        self.au_mot("en plus vite")
        self.play(FadeIn(l2b, shift=UP * 0.08), run_time=0.3)
        l3 = self.tc("une courbe qui se creuse.", 36, {"se creuse": TERME}).move_to(P(x, 1.22))
        courbe = DashedVMobject(VMobject().set_points_smoothly([d.get_center() for d in pts]), num_dashes=34)
        courbe.set_stroke(GRIS_DROITE, 3)
        self.au_mot("sur une courbe")
        self.play(FadeIn(l3, shift=UP * 0.08), Create(courbe), run_time=0.6)
        self.bring_to_front(pts)
        l4 = self.tg("Les écarts grandissent :", 36, RAISON).move_to(P(x, 0.42))
        self.au_mot("Les écarts")
        self.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)
        ec = liste_aeree([fr(v) for v in (100, 200, 400, 800)], 42, RAISON).move_to(P(x, -0.25))
        marches = [rep.marche(n, BACT[n], BACT[n + 1], largeur=6) for n in range(4)]
        for k, (nb, m) in enumerate(zip(ec.nombres, marches)):
            self.suivre(nb.original_text)
            anims = [FadeIn(nb, scale=1.3), Create(m)]
            if k:
                anims.append(FadeIn(ec.seps[k - 1]))
            self.play(*anims, run_time=0.25)
            self.bring_to_front(pts)
        l5 = self.tg("C'est l'allure d'une suite").move_to(P(x, -1.08))
        l5b = self.tg("géométrique").move_to(P(x, -1.72))
        self.au_mot("C'est l'allure")
        self.play(FadeIn(l5, shift=UP * 0.08), run_time=0.3)
        self.au_mot("géométrique")
        self.play(FadeIn(l5b, shift=UP * 0.08), run_time=0.3)
        l6, (a6, b6) = self.ligne([("de raison", WHITE), ("q > 1", RAISON)], 46)
        l6.move_to(P(x, -2.45))
        self.au_mot("de raison")
        self.play(FadeIn(a6, shift=UP * 0.08), run_time=0.3)
        self.au_mot("plus grande que")
        self.suivre("1")
        self.play(FadeIn(b6, scale=1.3), run_time=0.3)
        self.insister(b6, 1.3)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : lire u₀, u₁, la raison → A (0,5) ────────

    def boutons_ligne(self, textes, couleurs=None, largeur=3.3, fs=52, y=-1.15, pas=3.6):
        couleurs = couleurs or [WHITE] * 3
        corps = [self.t(c, fs, k, 1e9) for c, k in zip(textes, couleurs)]
        place = largeur - self.place_coche - 0.5 * fs / 32 - 0.45
        f = min(1.0, place / max(c.width for c in corps))  # même taille de texte dans les 3 boutons
        for c in corps:
            c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, largeur, fs) for L, c in zip("ABC", corps)])
        for c, dx in zip(cartes, (-pas, 0, pas)):
            c.move_to(P(dx, y))
        return cartes

    def ecran_question1(self):
        x = -3.3
        l1 = self.tg("Sur le graphique d'une", 34).move_to(P(x, 2.35))
        l2 = self.tg("suite géométrique, on lit", 34).move_to(P(x, 1.8))
        l3 = formule([("u_{0} =", TERME), ("40", WHITE), ("et", WHITE), ("u_{1} =", TERME), ("20", WHITE)], 46)
        l3.move_to(P(x, 1.08))
        l4 = self.t("Sa raison est :", 38, RAISON).move_to(P(x, 0.42))
        rep = Repere((0, 2.6), (0, 48), P(1.7, -0.1), P(5.2, 2.05), 10, etiq_u=(20, 40), etiq_n=(0, 1, 2), fs=30,
                     fs_grad=32, buff_grad=0.12)
        p0, p1 = rep.point(0, 40, r=0.11), rep.point(1, 20, r=0.11)

        def e1():
            self.au_mot("Sur le graphique")
            self.play(FadeIn(l1, shift=UP * 0.08), *rep.anims(), run_time=0.45)
            self.au_mot("suite géométrique")
            self.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)

        def e2():
            self.au_mot("u indice 0")
            self.play(FadeIn(l3.parts[0], scale=1.2), run_time=0.2)
            self.suivre("40")
            self.play(FadeIn(l3.parts[1], scale=1.2), GrowFromCenter(p0), Flash(p0, color=TERME, line_length=0.12),
                      run_time=0.3)
            self.au_mot("et u indice 1")
            self.play(FadeIn(l3.parts[2]), FadeIn(l3.parts[3], scale=1.2), run_time=0.2)
            self.suivre("20")
            self.play(FadeIn(l3.parts[4], scale=1.2), GrowFromCenter(p1), Flash(p1, color=TERME, line_length=0.12),
                      run_time=0.3)
            self.au_mot("Sa raison")
            self.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)

        cartes = self.boutons_ligne(["0,5", "−20", "2"])
        q = self.question_libre("04-question", [e1, e2], cartes, P(0, -2.3))
        self.dire("04b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.au_mot("On divise")
        c1 = self.calcul([("20", WHITE, "20"), ("÷", WHITE, "divisé"), ("40", WHITE, "40"), ("=", WHITE, "égale"),
                          ("0,5", JUSTE, "0,5")], -2.3, centre=-1.6, fs=50)
        cad = self.encadre(c1, JUSTE, 0.14)
        self.play(Create(cad), Indicate(VGroup(p0, p1), color=JUSTE, scale_factor=1.4), run_time=0.35)
        self.au_mot("Moins 20")
        seg = DashedLine(rep.G(1, 40), rep.G(1, 20), color=PIEGE, stroke_width=5, dash_length=0.08)
        m20 = self.t("−20", 34, PIEGE).next_to(seg, RIGHT, buff=0.16)
        self.play(Create(seg), FadeIn(m20, scale=1.3), Indicate(cartes[1], color=PIEGE, scale_factor=1.06),
                  run_time=0.4)
        self.au_mot("l'écart")
        l5, (a5, b5) = self.ligne([("−20 : l'écart,", PIEGE), ("pas la raison", PIEGE)], 38)
        l5.move_to(P(-1.6, -3.05))
        self.play(FadeIn(a5, shift=UP * 0.08), run_time=0.3)
        self.au_mot("pas la raison")
        self.play(FadeIn(b5, shift=UP * 0.08), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : et si on continue ? q > 1 ; 0 < q < 1 ; la planche à découper ──

    def carte_conj(self, cx, monte):
        """Une carte : un repère sans nombres, les points qui montent ou descendent."""
        cadre = self.carte(5.6, 5.0, P(cx, -0.3))
        vals = [1, 2, 4, 8, 16, 32] if monte else [32, 16, 8, 4, 2, 1]
        rep = Repere((0, 5.6), (0, 36), P(cx - 2.15, -1.05), P(cx + 1.95, 1.1), 6, fs=28)
        rep.lab_u.next_to(rep.ax_u.get_end(), RIGHT, buff=0.1)
        pts = VGroup(*[rep.point(n, v, r=0.09) for n, v in enumerate(vals)])
        return cadre, rep, pts

    def ecran_conjecture(self):
        self.nouvel_ecran("05-conjecture")
        tit = self.titre("Et si on continue ?", JAUNE_TITRE, 44, extrait="Et si", y=3.2)
        cx1, cx2 = -3.5, 2.4
        c1, r1, p1 = self.carte_conj(cx1, True)
        h1 = self.tc("q > 1", 46, {"q > 1": RAISON}).move_to(P(cx1, 1.7))
        self.au_mot("Avec q")
        self.play(FadeIn(c1), *r1.anims(), run_time=0.4)
        self.au_mot("plus grand que")
        self.suivre("1")
        self.play(FadeIn(h1, scale=1.2), LaggedStart(*[GrowFromCenter(d) for d in p1], lag_ratio=0.2), run_time=0.4)
        fl = Arrow(r1.G(5.3, 22), r1.G(5.3, 37), color=RAISON, buff=0, stroke_width=6,
                   max_tip_length_to_length_ratio=0.3)
        t1 = self.paragraphe(["les termes deviennent", "aussi grands", "que l'on veut"], 30, buff=0.08,
                             y=-1.95).move_to(P(cx1, -1.95))
        self.au_mot("les termes deviennent")
        self.play(GrowArrow(fl), FadeIn(t1[0], shift=UP * 0.08), run_time=0.35)
        self.au_mot("aussi grands")
        self.play(FadeIn(t1[1:], shift=UP * 0.08), Indicate(p1[-1], color=RAISON, scale_factor=1.6), run_time=0.35)
        c2, r2, p2 = self.carte_conj(cx2, False)
        h2, (h2a, h2b) = self.ligne([("0 <", RAISON), ("q < 1", RAISON)], 46)
        h2.move_to(P(cx2, 1.7))
        self.au_mot("Avec q entre")
        self.play(FadeIn(c2), *r2.anims(), run_time=0.4)
        self.suivre("0")
        self.play(FadeIn(h2a, scale=1.2), run_time=0.2)
        self.suivre("1")
        self.play(FadeIn(h2b, scale=1.2), run_time=0.25)
        self.au_mot("les points descendent")
        self.play(LaggedStart(*[GrowFromCenter(d) for d in p2], lag_ratio=0.2), run_time=0.7)
        t2 = self.paragraphe(["ils descendent,", "se rapprochent de 0,", "sans jamais l'atteindre"], 30, buff=0.08,
                             y=-1.95).move_to(P(cx2, -1.95))
        self.play(FadeIn(t2[0], shift=UP * 0.08), run_time=0.3)
        self.au_mot("se rapprochent")
        self.play(FadeIn(VGroup(*t2[1][:13]), shift=UP * 0.08), run_time=0.3)
        self.suivre("0")
        self.play(FadeIn(VGroup(*t2[1][13:]), shift=UP * 0.08), Indicate(r2.ax_n, color=JUSTE, scale_factor=1.03),
                  run_time=0.35)
        self.au_mot("sans jamais")
        self.play(FadeIn(t2[2], shift=UP * 0.08), run_time=0.3)
        # la planche à découper : − 90 % à chaque passage
        self.au_mot("Quand on nettoie")
        self.play(*[FadeOut(m) for m in (c1, r1, p1, h1, fl, t1, c2, r2, p2, h2a, h2b, t2, tit)], run_time=0.3)
        tit2 = self.t("Une planche à découper", 44, JAUNE_TITRE).move_to(P(0, 3.2))
        x = -3.4
        pb = planche_bois(P(x - 0.4, 1.35))
        bact = VGroup(*[Dot(P(x - 0.4, 1.35) + P(px * 1.9, py * 1.05), radius=0.055, color=TERME)
                        for px, py in points_disque(40, 0.62)])
        sp = spray(0.9).move_to(P(x + 2.0, 1.95))
        self.play(FadeIn(tit2, shift=DOWN * 0.1), FadeIn(pb, scale=0.9), FadeIn(bact), run_time=0.4)
        self.au_mot("chaque passage")
        self.play(FadeIn(sp, shift=LEFT * 0.2), run_time=0.25)
        pa = self.tg("chaque passage :", 36, RAISON).move_to(P(x, 0.05))
        pb90 = self.tg("− 90 %", 48, RAISON).move_to(P(x, -0.55))
        self.play(FadeIn(pa, shift=UP * 0.08), run_time=0.25)
        self.suivre("90 %")
        self.play(FadeIn(pb90, scale=1.3), run_time=0.3)
        rep = Repere((0, 4.5), (0, 11000), P(1.45, -2.2), P(5.15, 2.0), 2500, etiq_u=(5000, 10000),
                     etiq_n=range(0, 5), buff_grad=0.2)
        self.au_mot("des bactéries")
        self.play(*rep.anims(), run_time=0.4)
        lst = liste_aeree([fr(v) for v in PLANCHE], 34, WHITE).move_to(P(x, -1.25))
        restes = (40, 4, 1, 1)
        pts = VGroup()
        for k, (nb, v) in enumerate(zip(lst.nombres, PLANCHE)):
            self.suivre(nb.original_text)
            d = rep.point(k, v, r=0.1)
            anims = [FadeIn(nb, scale=1.3), GrowFromCenter(d), Flash(d, color=TERME, line_length=0.12)]
            if k:
                anims += [FadeIn(lst.seps[k - 1]), *[FadeOut(b) for b in bact[restes[k]:restes[k - 1]]]]
                if k == 3:
                    anims.append(bact[0].animate.set_opacity(0.35))
                anims.append(Wiggle(sp, scale_value=1.1, rotation_angle=0.05))
            self.play(*anims, run_time=0.3)
            pts.add(d)
        self.au_mot("q égale")
        qq, (qa, qb) = self.ligne([("q =", RAISON), ("0,1", RAISON)], 50)
        qq.move_to(P(x, -1.95))
        self.play(FadeIn(qa, scale=1.2), run_time=0.25)
        self.suivre("0,1")
        self.play(FadeIn(qb, scale=1.3), run_time=0.3)
        self.au_mot("descendent vers 0")
        v0 = VGroup(self.tg("les points descendent", 34, JUSTE), self.tg("vers 0", 34, JUSTE))
        v0.arrange(DOWN, buff=0.1).move_to(P(x, -2.85))
        self.play(FadeIn(v0, shift=UP * 0.08), Indicate(rep.ax_n, color=JUSTE, scale_factor=1.03),
                  *[Indicate(d, color=JUSTE, scale_factor=1.5) for d in pts], run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : une courbe qui démarre doucement ne reste pas petite ──

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        x = -3.4
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        rep = Repere((0, 12.6), (0, 450000), P(1.45, -2.2), P(5.2, 1.95), 100000,
                     etiq_u=(100000, 200000, 300000, 400000), etiq_n=(0, 4, 8, 12), fs_grad=24, buff_grad=0.15)
        pts = VGroup(*[rep.point(n, BACT[n], r=0.085) for n in range(13)])
        l1 = self.tg("Croire qu'une courbe", 34).move_to(P(x, 2.45))
        l1b = self.tg("qui démarre doucement", 34).move_to(P(x, 1.95))
        l2 = self.tg("reste petite…", 34).move_to(P(x, 1.45))
        self.au_mot("Croire")
        self.play(FadeIn(l1, shift=UP * 0.08), *rep.anims(), run_time=0.4)
        self.au_mot("qui démarre")
        self.play(FadeIn(l1b, shift=UP * 0.08), LaggedStart(*[GrowFromCenter(d) for d in pts[:7]], lag_ratio=0.15),
                  run_time=0.5)
        self.au_mot("reste petite")
        self.play(FadeIn(l2, shift=UP * 0.08), Indicate(pts[:7], color=TERME, scale_factor=1.3), run_time=0.4)
        a3 = self.tg("Après 2 heures,", 34).move_to(P(x, 0.78))
        b3 = self.tg("soit 6 périodes :", 34).move_to(P(x, 0.28))
        self.au_mot("2 heures")
        self.play(FadeIn(a3, shift=UP * 0.08), run_time=0.25)
        self.au_mot("soit")
        self.suivre("6")
        self.play(FadeIn(b3, shift=UP * 0.08), Indicate(pts[6], color=TERME, scale_factor=1.8), run_time=0.3)
        lab6 = self.t("6 400", 30, JUSTE).next_to(pts[6], UP, buff=0.36)
        self.calcul([("u₆ =", TERME, "u indice 6"), ("100 ×", WHITE, "100 fois"), ("2", WHITE, "2 puissance"),
                     ("⁶", RAISON, None), ("=", WHITE, "égale"), ("6 400", JUSTE, "6 400")], -0.35, centre=x, fs=40,
                    avec=[FadeIn(lab6, scale=1.3), pts[6].animate.set_color(JUSTE)])
        l4 = self.tg("Après 4 heures :", 34).move_to(P(x, -1.02))
        self.au_mot("4 heures")
        self.play(FadeIn(l4, shift=UP * 0.08), LaggedStart(*[GrowFromCenter(d) for d in pts[7:]], lag_ratio=0.35),
                  run_time=0.7)
        lab12 = self.t("409 600", 30, PIEGE).next_to(pts[12], LEFT, buff=0.25)
        self.calcul([("u₁₂ =", TERME, "u indice 12"), ("409 600", PIEGE, "409 600")], -1.6, centre=x, fs=44,
                    avec=[FadeIn(lab12, scale=1.3), Flash(pts[12], color=PIEGE, line_length=0.2),
                          pts[12].animate.set_color(PIEGE)])
        courbe = DashedVMobject(VMobject().set_points_smoothly([d.get_center() for d in pts]), num_dashes=40)
        courbe.set_stroke(GRIS_DROITE, 3)
        barre = VGroup(self.barre_lisible(l1), self.barre_lisible(l1b), self.barre_lisible(l2))
        self.play(Create(courbe), Create(barre), run_time=0.5)
        self.bring_to_front(pts)
        self.au_mot("C'est pour ça")
        regle = VGroup(self.tg("On ne laisse pas un plat", 32, JAUNE_TITRE),
                       self.tg("hors du frigo !", 32, JAUNE_TITRE)).arrange(DOWN, buff=0.1).move_to(P(x, -2.62))
        self.play(FadeIn(regle[0], shift=UP * 0.08), run_time=0.35)
        self.au_mot("hors du frigo")
        self.play(FadeIn(regle[1], shift=UP * 0.08), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : deux nuages, lequel est géométrique → B ──

    def ecran_question2(self):
        x = -2.95
        l1 = self.t("Deux nuages de points.", 34, larg=7.2).move_to(P(x, 2.35))
        nb = self.t("La suite bleue :", 34, TERME, 1e9)
        lb = liste_aeree([str(v) for v in BLEUE], 34, TERME)
        VGroup(nb, lb).arrange(RIGHT, buff=0.3).move_to(P(x, 1.62))
        lb.align_to(nb, DOWN)
        nr = self.t("La suite rouge :", 34, PIEGE, 1e9)
        lr = liste_aeree([str(v) for v in ROUGE], 34, PIEGE)
        VGroup(nr, lr).arrange(RIGHT, buff=0.3).move_to(P(x, 0.92))
        lr.align_to(nr, DOWN)
        l4 = self.t("Laquelle est géométrique ?", 34, RAISON, larg=7.2).move_to(P(x, 0.22))
        rep = Repere((0, 3.5), (0, 26), P(1.7, -0.3), P(5.2, 2.05), 3, etiq_u=(6, 12, 18, 24), etiq_n=range(4),
                     fs=30, fs_grad=28, buff_grad=0.12)
        pb = [rep.point(n, v, r=0.09) for n, v in enumerate(BLEUE)]
        pr = [Circle(radius=0.14, stroke_color=PIEGE, stroke_width=5).move_to(rep.G(n, v)) for n, v in enumerate(ROUGE)]

        def e1():
            self.au_mot("Deux nuages")
            self.play(FadeIn(l1, shift=UP * 0.08), *rep.anims(), run_time=0.45)

        def serie(nom, lst, marques, extrait):
            def f():
                self.au_mot(extrait)
                self.play(FadeIn(nom, shift=UP * 0.08), run_time=0.25)
                for k, (n_, m) in enumerate(zip(lst.nombres, marques)):
                    self.suivre(n_.original_text)
                    anims = [FadeIn(n_, scale=1.3), GrowFromCenter(m)]
                    if k:
                        anims.append(FadeIn(lst.seps[k - 1]))
                    self.play(*anims, run_time=0.22)
            return f

        def e4():
            self.au_mot("Laquelle")
            self.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)

        cartes = self.boutons_ligne(["la bleue", "la rouge", "les deux"], [TERME, PIEGE, WHITE], largeur=3.6,
                                    fs=42, pas=3.9, y=-1.38)
        q = self.question_libre("07-question", [e1, serie(nb, lb, pb, "La suite bleue"),
                                                serie(nr, lr, pr, "La suite rouge"), e4], cartes, P(0, -2.45))
        self.dire("07b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        cr = DashedVMobject(VMobject().set_points_smoothly([rep.G(n, v) for n, v in enumerate(ROUGE)]),
                            num_dashes=22).set_stroke(PIEGE, 3)
        r1, (a1, b1) = self.ligne([("La rouge double :", PIEGE), ("ses points se creusent.", WHITE)], 34)
        r1.move_to(P(-0.6, -2.35))
        self.au_mot("La rouge double")
        self.play(FadeIn(a1, shift=UP * 0.08), *[Indicate(c, color=PIEGE, scale_factor=1.3) for c in pr],
                  run_time=0.4)
        self.au_mot("se creusent")
        self.play(FadeIn(b1, shift=UP * 0.08), Create(cr), run_time=0.45)
        db = DashedLine(rep.G(0, 3), rep.G(3.4, 13.2), color=TERME, stroke_width=3, dash_length=0.1)
        r2, (a2, a2b, b2) = self.ligne([("La bleue", TERME), ("ajoute 3 :", TERME), ("ses points sont alignés.", WHITE)],
                                       34)
        r2.move_to(P(-0.6, -3.0))
        self.au_mot("La bleue")
        self.play(FadeIn(a2, shift=UP * 0.08), run_time=0.25)
        self.au_mot("ajoute")
        self.suivre("3")
        self.play(FadeIn(a2b, shift=UP * 0.08), run_time=0.25)
        self.au_mot("sont alignés")
        self.play(FadeIn(b2, shift=UP * 0.08), Create(db), run_time=0.45)
        self.bring_to_front(*pb)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : uₙ = 3 × 2ⁿ, (4 ; 48) ou (4 ; 24) ? ──────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        x = self.XG
        rep = Repere((0, 6.3), (0, 54), P(1.4, -1.7), P(5.25, 2.05), 6, etiq_u=(12, 24, 36, 48), etiq_n=(0, 2, 4, 6),
                     buff_grad=0.15)
        l1 = self.tg("Une suite est définie par", 34).move_to(P(x, 2.3))
        self.au_mot("Une suite")
        self.play(FadeIn(l1, shift=UP * 0.08), *rep.anims(), run_time=0.45)
        f = self.calcul([("uₙ =", TERME, "u indice n"), ("3 ×", WHITE, "3 fois"), ("2", WHITE, "2 puissance"),
                         ("ⁿ", RAISON, None)], 1.5, centre=x, fs=58)
        l2 = self.tg("Lequel de ces points est", 34).move_to(P(x, 0.65))
        l3 = self.tg("sur son graphique ?", 34).move_to(P(x, 0.15))
        self.au_mot("Lequel")
        self.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("sur son graphique")
        self.play(FadeIn(l3, shift=UP * 0.08), run_time=0.3)
        ch, (c4a, c48, cou, c4b, c24) = self.ligne([("(4 ;", RAISON), ("48)", RAISON), ("ou", WHITE), ("(4 ;", RAISON),
                                                    ("24) ?", RAISON)], 40)
        ch.move_to(P(x, -0.62))
        r48 = Circle(radius=0.16, stroke_color=RAISON, stroke_width=5).move_to(rep.G(4, 48))
        r24 = Circle(radius=0.16, stroke_color=RAISON, stroke_width=5).move_to(rep.G(4, 24))
        e48 = self.t("(4 ; 48)", 32, RAISON).next_to(r48, LEFT, buff=0.15)
        e24 = self.t("(4 ; 24)", 32, RAISON).next_to(r24, RIGHT, buff=0.15)
        self.au_mot("coordonnées 4")
        self.play(FadeIn(c4a, scale=1.2), run_time=0.15)
        self.suivre("48")
        self.play(FadeIn(c48, scale=1.2), Create(r48), FadeIn(e48, scale=1.2), run_time=0.35)
        self.au_mot("ou le point")
        self.play(FadeIn(cou), run_time=0.2)
        self.au_mot("coordonnées 4", n=2)
        self.play(FadeIn(c4b, scale=1.2), run_time=0.15)
        self.suivre("24")
        self.play(FadeIn(c24, scale=1.2), Create(r24), FadeIn(e24, scale=1.2), run_time=0.35)
        l4 = self.tg("Que conjecturer quand", 34).move_to(P(x, -1.45))
        l5 = self.tg("n devient très grand ?", 34).move_to(P(x, -1.95))
        self.au_mot("conjecturer")
        self.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)
        self.au_mot("n devient")
        self.play(FadeIn(l5, shift=UP * 0.08), run_time=0.3)
        self.defi_pause(-2.85, x=-2.3)
        self._defi = (tit, rep, VGroup(l1, f), VGroup(l2, l3, ch, l4, l5), (r48, r24, e48, e24))

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, rep, garde_, efface, (r48, r24, e48, e24) = self._defi
        x = self.XG
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), FadeOut(efface), run_time=0.45)
        pts = VGroup(*[rep.point(n, 3 * 2 ** n, r=0.09) for n in range(5)])
        c = self.calcul([("u₄ =", TERME, "u indice 4"), ("3 × 2", WHITE, "3 fois 2"), ("⁴", RAISON, None),
                         ("=", WHITE, "égale"), ("3 × 16", WHITE, "3 fois 16"), ("=", WHITE, "égale"),
                         ("48", JUSTE, "48")], 0.55, centre=x, fs=34,
                        avec=[LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.15),
                              r48.animate.set_stroke(JUSTE, width=6), e48.animate.set_color(JUSTE)])
        self.bring_to_front(r48)
        ok = self.coche(JUSTE, 0.2).next_to(e48, UP, buff=0.12)
        l1, (a1, b1) = self.ligne([("c'est le point", JUSTE), ("(4 ; 48)", JUSTE)], 36)
        l1.move_to(P(x, -0.22))
        self.au_mot("c'est le point")
        self.play(FadeIn(a1, shift=UP * 0.08), Create(ok), run_time=0.3)
        self.suivre("48")
        self.play(FadeIn(b1, scale=1.2), run_time=0.3)
        l2, (a2, b2) = self.ligne([("(4 ; 24) :", PIEGE), ("3 × 2 × 4 = 24", PIEGE)], 34)
        l2.move_to(P(x, -1.0))
        self.au_mot("Le point 4")
        self.suivre("24")
        cx = self.croix(r24.get_center(), r=0.2)
        self.play(FadeIn(a2, shift=UP * 0.08), r24.animate.set_stroke(PIEGE), e24.animate.set_color(PIEGE),
                  Create(cx), run_time=0.35)
        self.au_mot("3 fois 2 fois")
        self.suivre("4")
        self.play(FadeIn(b2, shift=UP * 0.08), run_time=0.3)
        l3 = self.tg("c'est l'erreur à éviter", 34, PIEGE).move_to(P(x, -1.55))
        self.au_mot("l'erreur")
        self.play(FadeIn(l3, shift=UP * 0.08), run_time=0.3)
        l4, (a4, b4) = self.ligne([("q = 2", RAISON), ("> 1 :", RAISON)], 38)
        l4.move_to(P(x, -2.15))
        c4 = self.tg("les termes deviennent", 32).move_to(P(x, -2.65))
        l5 = self.tg("aussi grands que l'on veut", 32).move_to(P(x, -3.12))
        self.au_mot("La raison")
        self.suivre("2")
        self.play(FadeIn(a4, scale=1.2), run_time=0.25)
        self.au_mot("plus grande que 1")
        self.play(FadeIn(b4, scale=1.2), run_time=0.25)
        self.au_mot("les termes deviennent")
        self.play(FadeIn(c4, shift=UP * 0.08), run_time=0.3)
        self.au_mot("aussi grands")
        suite = VMobject().set_points_smoothly([rep.G(t, 3 * 2 ** t) for t in np.linspace(0, 4.16, 30)])
        courbe = DashedVMobject(suite, num_dashes=30).set_stroke(GRIS_DROITE, 3)
        bout = Arrow(rep.G(4.0, 48), rep.G(4.17, 54) + P(0.02, 0.25), color=RAISON, buff=0, stroke_width=5,
                     max_tip_length_to_length_ratio=0.5)
        self.play(FadeIn(l5, shift=UP * 0.08), Create(courbe), run_time=0.5)
        self.play(GrowArrow(bout), run_time=0.3)
        self.bring_to_front(pts, r48)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [self.t("Les points d'une suite géométrique ne sont pas alignés :", fs, larg=1e9),
              self.tc("q > 1 : ils montent de plus en plus vite ;", fs, {"q > 1": RAISON}, 1e9),
              self.tc("0 < q < 1 : ils descendent vers 0.", fs, {"0 < q < 1": RAISON}, 1e9)]
        p2 = [self.tc("Sur un graphique, la raison est le quotient", fs, {"la raison": RAISON}, 1e9),
              self.t("de deux ordonnées qui se suivent.", fs, larg=1e9)]
        self.finale([(p1, ["Les points", "1, ils montent", "0 et 1"]),
                     (p2, ["Sur un graphique", "de deux ordonnées"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_points()
        self.ecran_courbe()
        self.ecran_question1()
        self.ecran_conjecture()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
