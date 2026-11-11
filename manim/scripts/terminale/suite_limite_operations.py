# suite_limite_operations.py
# EleveAI — Maths Terminale (spé) — paysage « Opérations sur les limites »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 35.
# Micro du coach : limite_suite_operations (notion limite_suite) :
# lib/tutor-v4/questionBank/terminale-spe/maths/limites-suites.bank.ts + limites-suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · somme et produit de limites finies (fixed_1, fixed_2, tpl_1, genOpsFinies) → 02 ;
#   · limites infinies : ℓ + (+∞), règle des signes, ℓ / ∞ (genOpsInfini)         → 03, 04 (C) ;
#   · les formes indéterminées ∞ − ∞, 0 × ∞, ∞ / ∞ (FI, opsFI)                     → 05, 08-piege ;
#   · lever « ∞ − ∞ » en transformant l'écriture (genOpsFI : n² − an…)            → 06, 07 (B) ;
#   · une expression morceau par morceau (fixed_3, fixed_4, genOpsExpr)           → 09 défi, 09b.
# Clé de voix → écran :
#   00-garde (les trois cartes somme / produit / quotient, « → ? »)
#   · 01 Sarah, économiste (vélos cargo) : recettes et coûts qui montent sans
#   fin, la bulle du patron « donc le bénéfice tend vers 0 ? » · 02 limites
#   finies : 3 + 2 (deux planches bout à bout), 3 × 2 (le carrelage de 6
#   carreaux), 3 ÷ 2 (la corde coupée en deux) · 03 l'infini : la flèche qui
#   file, la flèche retournée (règle des signes), le gâteau partagé à l'infini
#   · 04/04b question (C : −∞) · 05 les trois formes indéterminées, un « ? »
#   rouge sur chacune · 06 le bénéfice n² + 3n − n² = 3n (les barres : coûts en
#   violet, bénéfice en orange) · 07/07b question (B : −∞), les barres du
#   bénéfice qui plongent · 08 le piège « ∞ − ∞ = 0 » barré, trois issues, le
#   cadenas qui s'ouvre · 09/09b défi (le rectangle qui tend vers 4 × 3 = 12, le
#   gâteau 5 ÷ √n) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = uₙ, violet = vₙ (les coûts), orange =
# l'écart (le bénéfice), vert = juste, rouge = piège et formes indéterminées.
# ⛔ Pas de LaTeX. Voix : manim/voix/terminale-suite-limite-operations.json
# (débit −6), calée mot à mot par suite_limite_operations_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
#   (BORDS=1 vérifie aussi que rien n'approche Ti-Margo à moins de 0,15 : MARGO)
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_limite_operations.py SuiteLimiteOperationsTle -o eleveai-maths-terminale-suite-limite-operations --media_dir manim/scripts/terminale/media-suite-limite-operations
# Sortie : manim/sorties/terminale/maths/suites/35-limite-operations/

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_interpreter import OutilsLimite, glyphes  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
assert (3 + 2, 3 * 2, 3 / 2) == (5, 6, 1.5)                                   # 02
R = [n * n + 3 * n for n in range(40)]                                         # recettes
C1, C2 = [n * n for n in range(40)], [2 * n * n for n in range(40)]            # coûts
assert all(R[n] - C1[n] == 3 * n for n in range(40))                           # 06 : 3n → +∞
assert all(abs(R[n] - C2[n] - n * n * (-1 + 3 / n)) < 1e-9 for n in range(1, 40))        # 07b : n² (−1 + 3/n)
assert R[30] - C2[30] < -800                                                   # → −∞ : la réponse B
U9 = [(4 + 1 / n) * (3 - 2 / n) for n in range(1, 100001)]
assert abs(U9[-1] - 12) < 1e-3 and 4 * 3 == 12                                 # défi : 12
assert 5 / 10000 ** 0.5 == 0.05                                                # 5/√n → 0

VIOLET = "#a78bfa"
PEAU, PEAU2 = "#c68642", "#8d5524"
BOIS, GATEAU = "#b45309", "#fde68a"


class VerifMargo:
    """BORDS=1 : après chaque animation, rien de visible ne doit approcher
    Ti-Margo à moins de 0,15 (≈ 20 px en HD) : sinon une ligne MARGO."""

    def setup(self):
        super().setup()
        if os.environ.get("BORDS") != "1":
            return
        orig = self.renderer.play

        def play(scene, *a, **k):
            orig(scene, *a, **k)
            self._verif_margo()
        self.renderer.play = play

    def _verif_margo(self, air=0.15):
        m = getattr(self, "_margo", None)
        if m is None or m not in self.mobjects:
            return
        g, d = m.get_left()[0] - air, m.get_right()[0] + air
        b, h = m.get_bottom()[1] - air, m.get_top()[1] + air
        vus = self.__dict__.setdefault("_margo_vus", set())
        for mob in self.mobjects:
            if mob is m:
                continue
            for f in mob.family_members_with_points():
                if isinstance(f, VMobject) and f.get_fill_opacity() < 0.05 and f.get_stroke_opacity() < 0.05:
                    continue
                if f.width < 1e-3 and f.height < 1e-3:
                    continue
                if f.get_right()[0] > g and f.get_left()[0] < d and f.get_top()[1] > b and f.get_bottom()[1] < h:
                    c = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(f.get_left()[0], 1),
                         round(f.get_top()[1], 1))
                    if c not in vus:
                        vus.add(c)
                        print(f"MARGO {c[0]} {c[1]} x0={c[2]} y1={c[3]}", flush=True)


# ── les dessins de l'épisode ───────────────────────────────────────────────

def sarah(s=1.0):
    """Sarah, économiste : cheveux longs, veste bleue, un carnet de graphiques."""
    cheveux = RoundedRectangle(width=0.74, height=0.8, corner_radius=0.3, fill_color="#111827", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.92))
    tete = Circle(radius=0.27, fill_color=PEAU2, fill_opacity=1, stroke_width=0).move_to(P(0, 1.02))
    frange = Sector(radius=0.29, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.2))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#1d4ed8", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.16, 0.68), P(0.16, 0.68), P(0, 0.4), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    carnet = RoundedRectangle(width=0.5, height=0.42, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).move_to(P(0.32, -0.05))
    courbe = VMobject(stroke_color=JUSTE, stroke_width=3).set_points_as_corners(
        [P(0.13, -0.18), P(0.27, -0.08), P(0.37, -0.12), P(0.5, 0.1)])
    return VGroup(cheveux, corps, col, tete, frange, carnet, courbe).scale(s)


def patron(s=1.0):
    """Le patron : chemise blanche, cravate rouge, cheveux gris."""
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.29, angle=PI, start_angle=0, fill_color=GREY_B, fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.17))
    corps = RoundedRectangle(width=0.95, height=1.1, corner_radius=0.25, fill_color="#e2e8f0", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    cravate = Polygon(P(-0.07, 0.66), P(0.07, 0.66), P(0.1, 0.05), P(0, -0.08), P(-0.1, 0.05), fill_color=PIEGE,
                      fill_opacity=1, stroke_width=0)
    return VGroup(corps, cravate, tete, cheveux).scale(s)


def velo_cargo(s=1.0):
    """Un vélo cargo : deux roues, le cadre, la caisse orange à l'avant."""
    k = dict(stroke_color=GREY_A, stroke_width=4)
    r1 = Circle(radius=0.32, **k).move_to(P(-0.9, 0))
    r2 = Circle(radius=0.32, **k).move_to(P(0.95, 0))
    cadre = VMobject(**k).set_points_as_corners([P(-0.9, 0), P(-0.3, 0.55), P(0.35, 0.05), P(-0.9, 0)])
    fourche = Line(P(0.95, 0), P(0.55, 0.75), **k)
    guidon = Line(P(0.45, 0.78), P(0.7, 0.82), **k)
    selle = Line(P(-0.45, 0.68), P(-0.15, 0.68), stroke_color=GREY_A, stroke_width=7)
    tige = Line(P(-0.3, 0.55), P(-0.3, 0.68), **k)
    caisse = RoundedRectangle(width=0.75, height=0.45, corner_radius=0.06, fill_color="#F97316", fill_opacity=1,
                              stroke_width=0).move_to(P(0.98, 0.52))
    return VGroup(r1, r2, cadre, fourche, guidon, tige, selle, caisse).scale(s)


def cadenas(s=1.0, couleur=PIEGE):
    """Un cadenas fermé ; g[1] est l'anse (on la soulève pour l'ouvrir)."""
    corps = RoundedRectangle(width=0.8, height=0.65, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    anse = Arc(radius=0.27, start_angle=0, angle=PI, stroke_color=GREY_A, stroke_width=8).move_to(P(0, 0.45))
    trou = VGroup(Circle(radius=0.07, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(P(0, 0.03)),
                  Rectangle(width=0.05, height=0.16, fill_color="#0f172a", fill_opacity=1,
                            stroke_width=0).move_to(P(0, -0.08)))
    return VGroup(corps, anse, trou).scale(s)


def gateau(r, k, couleur=RAISON):
    """Un gâteau vu de dessus, coupé en k parts ; une part (g[1]) en couleur."""
    disque = Circle(radius=r, fill_color=GATEAU, fill_opacity=1, stroke_color=BOIS, stroke_width=3)
    a0, a1 = PI / 2, PI / 2 + TAU / k
    bord = [r * np.array([np.cos(a), np.sin(a), 0]) for a in np.linspace(a0, a1, 24)]
    part = Polygon(ORIGIN, *bord, fill_color=couleur, fill_opacity=1, stroke_width=0)
    coupes = VGroup(*[Line(ORIGIN, r * np.array([np.cos(PI / 2 + TAU * j / k), np.sin(PI / 2 + TAU * j / k), 0]),
                           stroke_color=BOIS, stroke_width=2) for j in range(k)])
    return VGroup(disque, part, coupes)


class SuiteLimiteOperationsTle(VerifMargo, OutilsLimite, PaysageSuites):
    fichier_marques = "suite_limite_operations_marques.json"
    nom_voix = "terminale-suite-limite-operations"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 10.6
    hauteur_bouton = 0.74
    place_coche = 1.2

    def bouton(self, lettre, corps, largeur, fs):
        """Le bouton du module, avec une marge intérieure d'au moins 20 px autour du texte."""
        b = super().bouton(lettre, corps, largeur, fs)
        cadre, ligne = b
        h = max(self.hauteur_bouton, ligne.height + 0.4)
        if cadre.height < h:
            cadre.stretch_to_fit_height(h)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return b

    def ligne(self, morceaux, y, x=None, fs=40, avec=(), larg=None, avec_k=None, rt=0.25):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k)

    def question_lignes(self, cle, groupes, choix, bonne, **kw):
        """poser_question, chaque ligne de la question en morceaux, chaque morceau à sa voix."""
        liste = [(g, None) for g in groupes]

        def dessin():
            for g in groupes:
                self.montrer(g, rt=0.22)
            liste.clear()                     # poser_question ne les remontre pas
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def fleche_a(self, g, h, y, couleur=GREY_A):
        """Une flèche horizontale de g à h, à la hauteur y."""
        return Arrow(P(g, y), P(h, y), buff=0, color=couleur, stroke_width=5, tip_length=0.2)

    # ── 00 : la garde : somme, produit, quotient → ? ───────────────────────

    def ecran_garde(self):
        """La garde du module (titre, question, identité, échelle), mais chaque carte
        « uₙ + vₙ → ? » apparaît AVEC le mot de la voix (somme, produit, quotient)."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Opérations sur les limites", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Opérations")
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        cartes = {}
        for x, ops, ex in ((-4.35, "+", "somme"), (-0.6, "×", "produit"), (3.15, "/", "quotient")):
            c = self.carte(3.45, 1.05, P(x, -0.55), TERME)
            f = self.construire([("uₙ", TERME, None), (ops, WHITE, None), ("vₙ", VIOLET, None),
                                 ("→ ?", RAISON, None)], 38).move_to(c)
            cartes[ex] = (c, f)

        def avec(ex):
            c, f = cartes[ex]
            return [FadeIn(c, scale=0.9), FadeIn(f, shift=UP * 0.1)]
        self.ligne([("Si deux suites ont une limite,", WHITE, "Si deux")], y, fs=40)
        self.ligne([("que font leur", WHITE, "que font"), ("somme,", TERME, "somme"), ("leur", WHITE, None),
                    ("produit,", TERME, "produit")], y - 0.66, fs=40,
                   avec_k={1: avec("somme"), 3: avec("produit")}, rt=0.35)
        self.ligne([("leur", WHITE, "leur quotient"), ("quotient ?", TERME, None)], y - 1.32, fs=40,
                   avec_k={0: avec("quotient")}, rt=0.35)
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y - 1.88))
        self.play(FadeIn(ident), *[Indicate(f[3], color=RAISON, scale_factor=1.3) for _, f in cartes.values()],
                  run_time=0.5)
        self.attendre_voix(marge=0.9)

    # ── 01 : Sarah, économiste : recettes et coûts sans fin, le patron ─────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = sarah(1.0).move_to(P(-5.25, 1.85))
        nom = self.t("Sarah", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.2)
        metier = self.t("économiste", 32, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Sarah")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("économiste")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        velo = velo_cargo(1.25).move_to(P(-2.2, 1.75))
        self.au_mot("vélos cargo")
        self.play(FadeIn(velo, shift=RIGHT * 0.6), run_time=0.5)
        # les barres des recettes (bleu) et des coûts (violet), mois après mois
        X0, YB, K = 1.3, -0.95, 3.2 / 40
        base = Line(P(X0 - 0.2, YB), P(5.5, YB), stroke_color=GREY_B, stroke_width=3)
        n_t = ValueTracker(0.0)

        def barres():
            g = VGroup()
            for n in range(1, 6):
                a = min(max(n_t.get_value() - n + 1, 0), 1)
                for j, (v, c) in enumerate(((R[n], TERME), (C1[n], VIOLET))):
                    h = max(v * K * a, 0.01)
                    g.add(Rectangle(width=0.3, height=h, stroke_width=0, fill_color=c, fill_opacity=1 if a else 0)
                          .move_to(P(X0 + 0.15 + 0.82 * (n - 1) + 0.33 * j, YB + h / 2)))
            return g
        lr = self.t("recettes", 32, TERME).move_to(P(2.35, 2.75))
        lc = self.t("coûts", 32, VIOLET).move_to(P(4.35, 2.75))
        self.au_mot("les recettes")
        self.play(Create(base), FadeIn(lr, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("les coûts")
        self.play(FadeIn(lc, shift=DOWN * 0.1), run_time=0.3)
        b = always_redraw(barres)
        self.add(b)
        self.au_mot("augmentent")
        self.play(n_t.animate.set_value(3), run_time=0.6, rate_func=linear)
        fl = Arrow(P(5.75, -0.4), P(5.75, 2.2), buff=0, color=JUSTE, stroke_width=6, tip_length=0.22)
        self.au_mot("sans fin")
        self.play(GrowArrow(fl), n_t.animate.set_value(5), run_time=0.6, rate_func=linear)
        # le patron et sa bulle
        pat = patron(0.75).move_to(P(-5.6, -2.45))
        bulle = RoundedRectangle(width=9.6, height=1.45, corner_radius=0.25, stroke_color=GREY_B, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-0.1, -2.45))
        pointe = Polygon(P(-4.9, -2.3), P(-4.9, -2.65), P(-5.2, -2.55), stroke_width=0, fill_color=GREY_B,
                         fill_opacity=1)
        self.au_mot("Son patron")
        self.play(FadeIn(pat, shift=UP * 0.15), FadeIn(bulle), FadeIn(pointe), run_time=0.4)
        l1 = self.construire([("« Les deux tendent vers", WHITE, "Les deux"), ("+∞,", JUSTE, "plus l'infini")], 36)
        l2 = self.construire([("donc le bénéfice tend vers", WHITE, "donc le bénéfice"), ("0,", PIEGE, "vers 0"),
                              ("non ? »", WHITE, "non")], 36)
        VGroup(l1, l2).arrange(DOWN, buff=0.16).move_to(bulle)
        self.montrer(l1)
        self.montrer(l2)
        rep = self.t("?", 60, RAISON).next_to(perso, RIGHT, buff=0.15).shift(UP * 0.35)
        self.au_mot("Sarah doit")
        self.play(FadeIn(rep, scale=0.6), Indicate(perso, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.45)
        self.attendre_voix(marge=0.5)
        b.clear_updaters()

    # ── 02 : limites finies : planches, carrelage, corde ───────────────────

    def ecran_finies(self):
        self.nouvel_ecran("02-finies")
        self.titre("Limites finies : tout va bien", JAUNE_TITRE, 46, extrait="Avec des limites")
        self.ligne([("Si", WHITE, "Si u"), ("uₙ → 3", TERME, "3"), ("et", WHITE, "et v"), ("vₙ → 2,", VIOLET, "2")],
                   2.25, fs=44)
        x0, S = -5.6, 0.55
        # 1. la somme : deux planches bout à bout (3 + 2)
        p3 = Rectangle(width=3 * S, height=0.32, fill_color=TERME, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        p2 = Rectangle(width=2 * S, height=0.32, fill_color=VIOLET, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        p3.move_to(P(1.6 + 1.5 * S, 1.05))
        p2.move_to(P(4.6, 1.45))
        tot = Line(P(1.6, 0.72), P(1.6 + 5 * S, 0.72), stroke_color=JUSTE, stroke_width=5)
        crans = VGroup(*[Line(P(1.6 + k * S, 0.64), P(1.6 + k * S, 0.8), stroke_color=JUSTE, stroke_width=3)
                         for k in range(6)])
        self.ligne([("uₙ + vₙ", TERME, "u indice n plus"), ("→ 5", JUSTE, "5")], 1.05, x=x0, fs=46,
                   avec_k={0: [FadeIn(p3, shift=RIGHT * 0.2), FadeIn(p2)],
                           1: [p2.animate.move_to(P(1.6 + 4 * S, 1.05)), Create(tot), FadeIn(crans)]}, rt=0.45)
        # 2. le produit : le carrelage de 3 × 2 carreaux
        cx, cy, c = 1.6, -0.75, 0.48
        carreaux = VGroup(*[Square(c, stroke_color=WHITE, stroke_width=2, fill_color=TERME, fill_opacity=0.25)
                            .move_to(P(cx + c / 2 + i * c, cy + c / 2 + j * c)) for j in range(2) for i in range(3)])
        self.ligne([("uₙ × vₙ", TERME, "le produit"), ("→ 6", JUSTE, "6")], -0.35, x=x0, fs=46,
                   avec_k={0: [FadeIn(carreaux, scale=0.9)],
                           1: [LaggedStart(*[q.animate.set_fill(JUSTE, 0.85) for q in carreaux], lag_ratio=0.12)]},
                   rt=0.6)
        # 3. le quotient : la corde de 3 coupée en 2 parts égales
        yq = -1.75
        corde = VGroup(Line(P(1.6, yq), P(1.6 + 1.5 * S, yq)), Line(P(1.6 + 1.5 * S, yq), P(1.6 + 3 * S, yq)))
        corde.set_stroke(TERME, 9)
        ciseau = DashedLine(P(1.6 + 1.5 * S, yq - 0.35), P(1.6 + 1.5 * S, yq + 0.35), color=RAISON, stroke_width=4,
                            dash_length=0.08)
        self.ligne([("uₙ / vₙ", TERME, "le quotient"), ("→ 3/2", WHITE, "3 sur 2"), ("= 1,5", JUSTE, "1,5")], yq,
                   x=x0, fs=46, avec_k={0: [Create(corde)],
                                        1: [Create(ciseau), corde[1].animate.shift(RIGHT * 0.4)],
                                        2: [corde[0].animate.set_stroke(JUSTE, 11)]}, rt=0.4)
        self.attendre_voix(marge=0.6)

    # ── 03 : l'infini : la flèche qui file, la flèche retournée, le gâteau ──

    def ecran_infinies(self):
        self.nouvel_ecran("03-infinies")
        self.titre("Avec l'infini : des règles", JAUNE_TITRE, 46, extrait="Avec l'infini")
        x0, xd = -6.2, 4.35
        # 1. un nombre + (+∞) : la flèche file vers la droite
        y1 = 1.95
        pt = Dot(P(xd, y1), radius=0.12, color=GREY_A)
        file = Arrow(P(xd, y1), P(xd + 0.5, y1), buff=0, color=JUSTE, stroke_width=7, tip_length=0.22)
        self.ligne([("un nombre", WHITE, "Un nombre"), ("+ (+∞)", WHITE, "plus plus")], y1, x=x0, fs=38,
                   avec_k={0: [GrowFromCenter(pt)]})
        f1 = self.fleche_a(1.75, 2.55, y1)
        self.ligne([("+∞", JUSTE, "plus l'infini")], y1, x=2.8, fs=46,
                   avec_k={0: [GrowArrow(f1), GrowArrow(file)]})
        self.play(Transform(file, Arrow(P(xd, y1), P(xd + 1.9, y1), buff=0, color=JUSTE, stroke_width=7,
                                        tip_length=0.22)), run_time=0.6)
        # 2. (−2) × (+∞) : la flèche se retourne et s'allonge
        y2 = 0.55
        haut = Arrow(P(5.1, y2 - 0.1), P(5.1, y2 + 0.6), buff=0, color=JUSTE, stroke_width=7, tip_length=0.22)
        self.ligne([("(−2) × (+∞)", WHITE, "Moins 2")], y2, x=x0, fs=38, avec_k={0: [GrowArrow(haut)]})
        f2 = self.fleche_a(1.75, 2.55, y2)
        self.ligne([("−∞", PIEGE, "moins l'infini")], y2, x=2.8, fs=46,
                   avec_k={0: [GrowArrow(f2), Transform(haut, Arrow(P(5.1, y2 + 0.4), P(5.1, y2 - 0.75), buff=0,
                                                                   color=PIEGE, stroke_width=7, tip_length=0.22))]})
        self.ligne([("règle des signes :", GREY_A, "par la règle"), ("−", PIEGE, None), ("×", WHITE, None),
                    ("+", JUSTE, None), ("=", WHITE, None), ("−", PIEGE, None)], y2 - 0.65, x=x0 + 0.3, fs=32)
        # 3. un nombre ÷ (quantité → ∞) : le gâteau partagé entre de plus en plus de monde
        y3 = -1.3
        gt = gateau(0.6, 2).move_to(P(5.15, y3))
        self.ligne([("un nombre", WHITE, "Un nombre divisé"), ("÷", WHITE, None),
                    ("(quantité → ∞)", WHITE, "une quantité")], y3, x=x0, fs=38,
                   avec_k={0: [FadeIn(gt, scale=0.8)]})
        for k in (4, 8, 16):
            self.play(Transform(gt, gateau(0.6, k).move_to(P(5.15, y3))), run_time=0.3)
        f3 = self.fleche_a(1.75, 2.55, y3)
        self.ligne([("0", JUSTE, "0")], y3, x=2.8, fs=50,
                   avec_k={0: [GrowArrow(f3), Transform(gt, gateau(0.6, 40).move_to(P(5.15, y3)))]})
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 → C (−3 × +∞ = −∞) ────────────────────────

    def ecran_question1(self):
        g1 = self.construire([("uₙ", TERME, "u indice n"), ("→ −3", WHITE, "moins 3"), ("et", WHITE, "et v"),
                              ("vₙ", VIOLET, None), ("→ +∞.", WHITE, "plus l'infini")], 44)
        g2 = self.construire([("La limite de", WHITE, "La limite"), ("uₙ × vₙ", TERME, "u indice n fois"),
                              ("est :", WHITE, "est")], 42)
        q = self.question_lignes(
            "04-question", [g1, g2],
            [self.choix([("+∞", "plus l'infini")], 50), self.choix([("0", "0")], 50),
             self.choix([("−∞", "moins l'infini")], 50)], 2, en_ligne=True, largeur=3.7, fs=46)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question),
                  VGroup(q.cartes[2], ok).animate.move_to(P(0, 1.55)), run_time=0.3)
        haut = Arrow(P(4.2, -1.3), P(4.2, -0.3), buff=0, color=JUSTE, stroke_width=8, tip_length=0.25)
        f = self.ligne([("(−3) × (+∞)", WHITE, "Moins 3")], 0.1, x=-5.2, fs=50, avec_k={0: [GrowArrow(haut)]})
        self.ligne([("règle des signes :", GREY_A, "la règle"), ("−", PIEGE, None), ("×", WHITE, None),
                    ("+", JUSTE, None), ("=", WHITE, None), ("−", PIEGE, None)], -1.05, x=-5.2, fs=38)
        res = self.construire([("→ −∞", PIEGE, "donne moins")], 50).next_to(f, RIGHT, buff=0.4)
        bas = Arrow(P(4.2, -0.2), P(4.2, -2.0), buff=0, color=PIEGE, stroke_width=8, tip_length=0.25)
        self.montrer(res, avec=[Transform(haut, bas)], rt=0.45)
        self.play(Create(self.encadre(VGroup(f, res), JUSTE, 0.18)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : les trois formes indéterminées, un « ? » rouge sur chacune ────

    def ecran_indeterminees(self):
        self.nouvel_ecran("05-indeterminees")
        self.titre("Mais trois cas résistent", JAUNE_TITRE, 46, extrait="Mais trois")
        cartes = []
        for x, (txt, ex) in zip((-4.4, 0.0, 4.4), (("∞ − ∞", "infini moins"), ("0 × ∞", "0 fois"),
                                                   ("∞ / ∞", "infini sur"))):
            c = self.carte(3.9, 1.7, P(x, 0.85), PIEGE)
            f = self.construire([(txt, WHITE, ex)], 56).move_to(c).shift(LEFT * 0.32)
            qm = self.t("?", 66, PIEGE, audit=False).next_to(f, RIGHT, buff=0.3)
            self.au_mot(ex)
            self.play(FadeIn(c, scale=0.9), FadeIn(f, shift=UP * 0.1), run_time=0.3)
            self.play(FadeIn(qm, scale=1.6), run_time=0.25)
            cartes.append(VGroup(c, f, qm))
        self.ligne([("Ce sont des", WHITE, "Ce sont"), ("formes indéterminées :", PIEGE, "formes")], -1.0, fs=46)
        self.ligne([("les règles ne permettent pas", WHITE, "les règles"), ("de conclure directement.", WHITE,
                                                                          "de conclure")], -1.85, fs=38)
        self.play(*[Indicate(c[2], color=PIEGE, scale_factor=1.3) for c in cartes], run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 06 : le bénéfice de Sarah : n² + 3n − n² = 3n ──────────────────────

    def barres_benefice(self, couts, X0=3.55, YB=-1.75, K=3.4 / 40, n_max=5):
        """Pour chaque mois n : la barre des recettes n² + 3n ; dedans, les coûts (violet)
        et, au-dessus, le bénéfice (orange). Renvoie (recettes, couts, benefices)."""
        rec, cou, ben = VGroup(), VGroup(), VGroup()
        for n in range(1, n_max + 1):
            x = X0 + 0.52 * (n - 1)
            hr, hc = R[n] * K, couts[n] * K
            rec.add(Rectangle(width=0.42, height=hr, stroke_color=TERME, stroke_width=3, fill_color=TERME,
                              fill_opacity=0.35).move_to(P(x, YB + hr / 2)))
            cou.add(Rectangle(width=0.42, height=hc, stroke_width=0, fill_color=VIOLET,
                              fill_opacity=1).move_to(P(x, YB + hc / 2)))
            ben.add(Rectangle(width=0.42, height=hr - hc, stroke_width=0, fill_color=RAISON,
                              fill_opacity=1).move_to(P(x, YB + hc + (hr - hc) / 2)))
        return rec, cou, ben

    def ecran_benefice(self):
        self.nouvel_ecran("06-benefice")
        self.titre("Retour au bénéfice de Sarah", JAUNE_TITRE, 46, extrait="Retour")
        x0 = -6.2
        base = Line(P(3.2, -1.75), P(6.0, -1.75), stroke_color=GREY_B, stroke_width=3)
        rec, cou, ben = self.barres_benefice(C1)
        self.ligne([("Recettes :", TERME, "Recettes"), ("uₙ =", TERME, "u indice n"), ("n²", WHITE, "n au carré"),
                    ("+ 3n", WHITE, "plus 3")], 2.2, x=x0, fs=42, avec_k={0: [Create(base)],
                                                                   3: [LaggedStart(*[GrowFromEdge(b, DOWN) for b in rec], lag_ratio=0.15)]},
                   rt=0.6)
        self.ligne([("Coûts :", VIOLET, "Coûts"), ("vₙ =", VIOLET, "v indice n"), ("n²", WHITE, "n au carré")],
                   1.4, x=x0, fs=42, avec_k={2: [LaggedStart(*[GrowFromEdge(b, DOWN) for b in cou], lag_ratio=0.15)]},
                   rt=0.6)
        self.ligne([("Les deux → +∞ :", WHITE, "Les deux"), ("« ∞ − ∞ »", PIEGE, "infini moins")], 0.55, x=x0, fs=40)
        self.ligne([("On calcule :", GREY_A, "On calcule"), ("uₙ − vₙ", RAISON, "u indice n moins"),
                    ("= 3n", RAISON, "égale 3"), ("→ +∞", JUSTE, "qui tend")], -0.3, x=x0, fs=40,
                   avec_k={2: [LaggedStart(*[FadeIn(b) for b in ben], lag_ratio=0.12)]}, rt=0.5)
        fl = Arrow(P(6.25, -0.2), P(6.25, 1.7), buff=0, color=JUSTE, stroke_width=6, tip_length=0.22)
        self.play(GrowArrow(fl), Indicate(ben, color=RAISON, scale_factor=1.06), run_time=0.45)
        self.ligne([("Le bénéfice", WHITE, "Le bénéfice"), ("ne tend pas vers 0 :", PIEGE, "vers 0")], -1.2, x=x0,
                   fs=40)
        fin = self.ligne([("il grandit sans fin.", JUSTE, "il grandit")], -2.1, x=x0 + 0.2, fs=44)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 → B (n² + 3n − 2n² → −∞) ─────────────────

    def ecran_question2(self):
        g1 = self.construire([("Si les coûts étaient", WHITE, "Si les coûts"), ("vₙ =", VIOLET, "v indice n"),
                              ("2n²,", VIOLET, "2 n")], 42)
        g2 = self.construire([("le bénéfice", WHITE, "le bénéfice"), ("n²", RAISON, "n au carré"),
                              ("+ 3n", RAISON, "plus 3"), ("− 2n²", RAISON, "moins 2")], 44)
        g3 = self.construire([("tendrait vers :", WHITE, "tendrait")], 42)
        q = self.question_lignes(
            "07-question", [g1, g2, g3],
            [self.choix([("0", "0")], 50), self.choix([("−∞", "moins l'infini")], 50),
             self.choix([("+∞", "plus l'infini")], 50)], 1, en_ligne=True, largeur=3.7, fs=46)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 1)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), FadeOut(q.question),
                  VGroup(q.cartes[1], ok).animate.move_to(P(-3.6, 1.75)), run_time=0.3)
        x0 = -6.2
        # les barres du bénéfice n² + 3n − 2n² : positives, puis elles plongent
        X0, Y0, K = 2.4, 0.9, 0.17
        base = Line(P(X0 - 0.4, Y0), P(5.3, Y0), stroke_color=GREY_B, stroke_width=3)
        bens = VGroup()
        for n in range(1, 6):
            v = R[n] - C2[n]
            h = max(abs(v) * K, 0.04)
            bens.add(Rectangle(width=0.42, height=h, stroke_width=0, fill_color=RAISON if v > 0 else PIEGE,
                               fill_opacity=1).move_to(P(X0 + 0.66 * (n - 1), Y0 + (h / 2 if v > 0 else -h / 2))))
        l1 = self.ligne([("Il reste", GREY_A, "Il reste"), ("−n²", RAISON, "moins n"), ("+ 3n", RAISON, "plus 3")], 0.55,
                        x=x0, fs=44, avec_k={2: [Create(base), LaggedStart(*[GrowFromEdge(b, UP if k > 2 else DOWN)
                                                                 for k, b in enumerate(bens)], lag_ratio=0.2)]},
                        rt=0.9)
        l2 = self.construire([("=", WHITE, "égale n"), ("n²", WHITE, None), ("×", WHITE, "fois"),
                              ("(−1", WHITE, "moins 1"), ("+ 3/n)", WHITE, "3 sur n")], 44)
        l2.move_to(P(0, -0.35)).align_to(P(x0 + 1.2, 0), LEFT)
        self.montrer(l2)
        a1 = self.t("→ +∞", 32, GREY_A, audit=False).next_to(l2[1], DOWN, buff=0.18)
        a2 = self.t("→ −1", 32, GREY_A, audit=False).next_to(VGroup(l2[3], l2[4]), DOWN, buff=0.18)
        res = self.construire([("→ −∞", PIEGE, "moins l'infini")], 48).next_to(l2, RIGHT, buff=0.4)
        self.montrer(res, avec=[FadeIn(a1, shift=UP * 0.1), FadeIn(a2, shift=UP * 0.1),
                                Indicate(bens[3:], color=PIEGE, scale_factor=1.1)], rt=0.45)
        self.ligne([("La même forme", WHITE, "La même forme"), ("« ∞ − ∞ »", PIEGE, "infini moins")], -1.75,
                   x=x0, fs=40)
        fin = self.ligne([("donne ici le résultat inverse.", JAUNE_TITRE, "donne ici")], -2.5, x=x0, fs=40)
        self.insister(fin, 1.06)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège « ∞ − ∞ = 0 », trois issues, le cadenas qui s'ouvre ──

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        tit = self.t("Voilà le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        f = self.construire([("« ∞ − ∞", WHITE, "Infini moins"), ("= 0 »", PIEGE, "égale 0")], 60)
        f.move_to(P(-1.6, 2.0))
        self.montrer(f)
        bar = self.barrer(f)
        faux = self.t("c'est faux", 44, PIEGE).next_to(f, RIGHT, buff=0.6)
        self.au_mot("c'est faux")
        self.play(Create(bar), FadeIn(faux, scale=1.2), run_time=0.4)
        self.ligne([("Selon les suites, on peut trouver :", WHITE, "Selon")], 0.95, fs=38)
        issues = []
        for x, (txt, coul, ex) in zip((-4.1, -0.3, 3.5), (("+∞", JUSTE, "plus l'infini"), ("−∞", JUSTE, "moins l'infini"),
                                                          ("un nombre", JUSTE, "un nombre"))):
            c = self.carte(3.5, 1.0, P(x, -0.3), JUSTE)
            t = self.construire([(txt, coul, ex)], 40).move_to(c)
            self.suivre(ex)
            self.play(FadeIn(c, scale=0.9), FadeIn(t, scale=1.2), run_time=0.3)
            issues.append(c)
        cad = cadenas(1.0).move_to(P(4.75, -1.95))
        self.ligne([("Une forme indéterminée,", PIEGE, "Une forme"), ("ça se lève,", WHITE, "ça se lève")], -1.75,
                   x=-6.2, fs=38, avec_k={0: [FadeIn(cad, scale=0.8)],
                                          1: [cad[1].animate.shift(UP * 0.3).rotate(0.5, about_point=cad[1].get_right()),
                                              cad[0].animate.set_fill(JUSTE)]}, rt=0.5)
        fin = self.ligne([("en transformant l'écriture.", JUSTE, "en transformant")], -2.6, x=-6.0, fs=42)
        self.play(Create(self.encadre(fin, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : (4 + 1/n) × (3 − 2/n) et 5/√n ────────────────────────

    def rectangle_n(self, n, S=0.5, coin=P(2.95, 0.15)):
        """Le rectangle de côtés (4 + 1/n) et (3 − 2/n), posé sur son coin bas-gauche."""
        w, h = (4 + 1 / n) * S, (3 - 2 / n) * S
        return Rectangle(width=w, height=h, stroke_color=TERME, stroke_width=4, fill_color=TERME,
                         fill_opacity=0.3).move_to(coin + P(w / 2, h / 2))

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        x0 = -6.2
        self.ligne([("Pour", WHITE, "Pour n"), ("n ≥ 1,", GREY_A, "égal à 1"), ("trouve la limite de", WHITE, "trouve")],
                   2.2, x=x0, fs=40)
        rect = self.rectangle_n(1)
        self.ligne([("uₙ =", TERME, "u indice n"), ("(4 +", WHITE, "4 plus"), ("1/n)", WHITE, "1 sur n"),
                    ("×", WHITE, "fois"), ("(3 −", WHITE, "3 moins"), ("2/n)", WHITE, "2 sur n")], 1.25, x=x0 + 0.2,
                   fs=46, avec_k={1: [FadeIn(rect)]})
        n_t = ValueTracker(1.0)
        rect.add_updater(lambda m: m.become(self.rectangle_n(n_t.get_value())))
        self.play(n_t.animate.set_value(3), run_time=0.8)
        gt = gateau(0.55, 3).move_to(P(4.2, -1.1))
        self.ligne([("Puis celle de", WHITE, "Puis celle"), ("vₙ =", VIOLET, "v indice n"), ("5/√n", WHITE, "5 sur")],
                   0.05, x=x0, fs=46, avec_k={2: [FadeIn(gt, scale=0.8)]})
        self.play(n_t.animate.set_value(6), run_time=0.8)
        rect.clear_updaters()
        self.defi_pause(-2.0, x=-1.8)
        self._defi = (tit,)

    def ecran_correction(self):
        self.dire("09b-correction")
        (tit,) = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        autres = [m for m in self.mobjects if m is not tit and m is not self._margo]
        self.play(*[FadeOut(m) for m in autres], ReplacementTransform(tit, cor), run_time=0.4)
        self.remove(*autres)
        x0, S = -6.2, 0.5
        n_t = ValueTracker(1.0)
        rect = self.rectangle_n(1)
        cible = VGroup(*[Square(S, stroke_color=JUSTE, stroke_width=2, fill_color=JUSTE, fill_opacity=0)
                         .move_to(P(2.95 + S / 2 + i * S, 0.15 + S / 2 + j * S)) for j in range(3) for i in range(4)])
        self.ligne([("4 +", WHITE, "4 plus"), ("1/n", WHITE, "1 sur n"), ("→ 4,", JUSTE, "tend vers 4")], 2.2, x=x0,
                   fs=44, avec_k={0: [FadeIn(rect)], 2: [n_t.animate.set_value(4)]}, rt=0.6)
        rect.add_updater(lambda m: m.become(self.rectangle_n(n_t.get_value())))
        self.ligne([("3 −", WHITE, "et 3"), ("2/n", WHITE, "2 sur n"), ("→ 3", JUSTE, "tend vers 3")], 1.4, x=x0,
                   fs=44, avec_k={2: [n_t.animate.set_value(60)]}, rt=0.6)
        rect.clear_updaters()
        fin = self.ligne([("le produit", WHITE, "le produit"), ("→ 4 × 3", WHITE, "4 fois 3"), ("= 12", JUSTE, "12")],
                         0.5, x=x0, fs=44, avec_k={2: [LaggedStart(*[q.animate.set_fill(JUSTE, 0.55) for q in cible],
                                                                  lag_ratio=0.06)]}, rt=0.6)
        self.add(cible)
        self.play(Create(self.encadre(fin[2], JUSTE, 0.14)), run_time=0.3)
        gt = gateau(0.6, 3).move_to(P(4.2, -1.35))
        self.ligne([("Pour", WHITE, "Pour v"), ("v,", VIOLET, None), ("on divise", WHITE, "on divise"),
                    ("5", WHITE, "5 par")], -0.55, x=x0, fs=40, avec_k={3: [FadeIn(gt, scale=0.8)]})
        self.ligne([("par une quantité → +∞ :", WHITE, "une quantité")], -1.3, x=x0, fs=40,
                   avec=[Transform(gt, gateau(0.6, 12).move_to(P(4.2, -1.35)))], rt=0.5)
        self.play(Transform(gt, gateau(0.6, 40).move_to(P(4.2, -1.35))), run_time=0.4)
        fin2 = self.ligne([("vₙ", VIOLET, "v indice n"), ("→ 0", JUSTE, "tend vers 0")], -2.2, x=x0 + 0.2, fs=48)
        self.play(Create(self.encadre(fin2, JUSTE, 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        def base(l):
            """La ligne de base : le bas d'une lettre sans jambage (a, e, n, o…), sinon le bas de la ligne."""
            gl = [m for morceau in l for m in morceau]
            car = glyphes(" ".join(l.textes))
            k = next((i for i, c in enumerate(car) if c in "acemnorsuvwxz0123456789"), None)
            return gl[k].get_bottom()[1] if k is not None else l.get_bottom()[1]
        J = JAUNE_TITRE
        points = [[[("On opère sur les limites :", WHITE, "On opère")],
                   [("somme,", TERME, "somme"), ("produit,", TERME, "produit"), ("quotient,", TERME, "quotient")],
                   [("avec la règle des signes.", WHITE, "avec la règle")]],
                  [[("Sauf dans les", WHITE, "Sauf"), ("formes indéterminées :", PIEGE, "formes")],
                   [("∞ − ∞,", PIEGE, "infini moins"), ("0 × ∞,", PIEGE, "0 fois"), ("∞ / ∞", PIEGE, "infini sur")]],
                  [[("Là, on transforme l'écriture", JUSTE, "Là, on")], [("avant de conclure.", WHITE, "avant de")]]]
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.construire(l, 44, 1e9) for l in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
            for k, l in enumerate(lignes):      # même pas entre les lignes de base
                if k:
                    l.shift(UP * (base(lignes[0]) - 0.66 * k - base(l)))
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        if tout.height > 5.9:
            tout.scale_to_fit_height(5.9)
        tout.move_to(P(0, -0.3))
        for bloc in blocs:
            for k, l in enumerate(bloc[1]):
                self.montrer(l, rt=0.3, avec_k={0: [Create(bloc[0])]} if k == 0 else None)
        self.attendre_voix(marge=0.8)

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_finies, self.ecran_infinies,
                  self.ecran_question1, self.ecran_indeterminees, self.ecran_benefice, self.ecran_question2,
                  self.ecran_piege, self.ecran_defi, self.ecran_correction, self.ecran_appris,
                  lambda: self.fin("11-abonne")]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "9" in choix.split(",")):
                e()
