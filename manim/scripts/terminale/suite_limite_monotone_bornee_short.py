# suite_limite_monotone_bornee_short.py
# EleveAI — Maths Terminale (spé) — short « Convergence monotone »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 37. Micro du coach : limite_suite_monotone_bornee (tcm :
# « croissante et majorée par M » ≠ « converge vers M » ; tcmSituation).
#   · 00-garde       : le titre, l'échelle (70 %), le pari ; EN BAS la batterie
#                      qui se charge, dès le titre ;
#   · 01-situation   : EN HAUT Élodie, ingénieure, sa voiture électrique et la
#                      batterie ; EN BAS, EN MÊME TEMPS, u₀ = 20 (la batterie à
#                      20 %) et uₙ₊₁ = 0,5uₙ + 40 ;
#   · 02-termes      : 20 ; 50 ; 65 ; 72,5 dans leurs cases, la batterie monte
#                      d'autant à chaque case, et reste sous 100 ;
#   · 03/03b         : question-pause (C : un nombre ≤ 100), 3 s ; le plafond
#                      100 et la vraie limite, dessous ;
#   · 04-commentaire : en résolvant ℓ = 0,5ℓ + 40, à quel pourcentage ?
#                      (réponse : 80 %, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = la charge uₙ, orange = le plafond 100,
# vert = juste (la limite).
# Voix : manim/voix/terminale-suite-limite-monotone-bornee-short.json (débit −6),
# calée par suite_limite_monotone_bornee_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_limite_monotone_bornee_short.py SuiteLimiteMonotoneBorneeShort -o eleveai-maths-terminale-suite-limite-monotone-bornee-short --media_dir manim/scripts/terminale/media-suite-limite-monotone-bornee-short

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_monotone_bornee import CadreAvecTexte, recurrente  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402

C = recurrente(20, 0.5, 40)                                                 # la charge, en %
assert C[:4] == [20, 50, 65, 72.5]                                          # 02 : 20 ; 50 ; 65 ; 72,5
assert all(C[n] <= C[n + 1] <= 100 for n in range(59))                      # croissante, majorée par 100
assert abs(C[59] - 80) < 1e-9 and abs(0.5 * 80 + 40 - 80) < 1e-12           # le commentaire : 80 % (non affiché)
PEAU = "#8d5524"


def elodie(s=1.0):
    """Élodie, ingénieure : queue de cheval, veste verte, un badge éclair."""
    queue = Ellipse(width=0.2, height=0.42, fill_color="#3f2a1d", fill_opacity=1, stroke_width=0).move_to(
        P(-0.3, 0.92))
    cheveux = Sector(radius=0.3, angle=PI, start_angle=0, fill_color="#3f2a1d", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#047857", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    eclair = Polygon(P(0.2, 0.55), P(0.08, 0.3), P(0.18, 0.3), P(0.1, 0.08), P(0.32, 0.36), P(0.22, 0.36),
                     P(0.3, 0.55), fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    return VGroup(corps, queue, cheveux, tete, eclair).scale(s)


def voiture(s=1.0):
    """Une petite voiture électrique (de profil) et sa prise."""
    caisse = RoundedRectangle(width=1.6, height=0.42, corner_radius=0.14, fill_color="#e2e8f0", fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.1))
    toit = Polygon(P(-0.45, 0.3), P(-0.25, 0.62), P(0.35, 0.62), P(0.55, 0.3), fill_color="#e2e8f0", fill_opacity=1,
                   stroke_width=0)
    vitre = Polygon(P(-0.32, 0.33), P(-0.18, 0.55), P(0.3, 0.55), P(0.42, 0.33), fill_color="#0ea5e9",
                    fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.16, fill_color="#1f2937", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=2).move_to(P(x, -0.12)) for x in (-0.5, 0.5)])
    cable = CubicBezier(P(0.8, 0.12), P(1.0, 0.1), P(1.0, -0.25), P(1.15, -0.25), stroke_color=JUSTE, stroke_width=4)
    return VGroup(caisse, toit, vitre, roues, cable).scale(s)


class Batterie(VGroup):
    """Une batterie horizontale : le contour (orange : 100 %, le plafond), la
    borne, et la charge bleue qui suit c_t (en %)."""

    def __init__(self, centre, w, h, c_t, **kw):
        super().__init__(**kw)
        self.c_t, self.w, self.h = c_t, w, h
        cx, cy = centre[0], centre[1]
        self.contour = RoundedRectangle(width=w, height=h, corner_radius=0.1, stroke_color=RAISON, stroke_width=4,
                                        fill_color=FOND_CARTE, fill_opacity=1).move_to(P(cx, cy))
        self.borne = RoundedRectangle(width=0.12, height=h * 0.42, corner_radius=0.03, fill_color=RAISON,
                                      fill_opacity=1, stroke_width=0).next_to(self.contour, RIGHT, buff=0)
        self.x0 = cx - w / 2 + 0.08

        def charge():
            L = max((w - 0.16) * self.c_t.get_value() / 100, 0.001)
            return Rectangle(width=L, height=h - 0.16, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(
                P(self.x0 + L / 2, cy))
        self.charge = always_redraw(charge)
        self.add(self.contour, self.borne, self.charge)

    def X(self, v):
        return self.x0 + (self.w - 0.16) * v / 100


class SuiteLimiteMonotoneBorneeShort(CadreAvecTexte, VerifMargo, OutilsCalcul, ShortSuites):
    fichier_marques = "suite_limite_monotone_bornee_short_marques.json"
    nom_voix = "terminale-suite-limite-monotone-bornee-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.86
    buff_boutons = 0.16
    y_tete_question = 3.52
    place_coche = 0.2                   # la coche ✓ garde un vrai écart avec le texte
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle des ceintures

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.05)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22, x=None):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k, rt_mid=rt_mid)

    def entete(self, titre, extrait=None, fs=42):
        """Comme l'entête commun, mais le titre plus haut et l'échelle (70 %) plus bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE, 3.9).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton : rond A/B/C, le corps, marge ≥ 20 px, la coche à droite sans toucher le texte."""
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 40, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.25 - 0.85
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.25)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.36),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def q_montrer_choix(self, cartes):
        """À « A : » la batterie d'attente DESCEND sous les boutons (puis A arrive) ; chaque
        bouton arrive ENTIER ; la batterie part juste avant « Mets pause »."""
        att, self._attente_q = getattr(self, "_attente_q", None), None
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            if att is not None and L == "A":
                y = cartes[-1].get_bottom()[1] - 0.22 - att.height * 0.7 / 2
                self.play(att.animate.scale(0.7).move_to(P(-0.07, y)), run_time=0.25)
            ex = [e for e in getattr(c[1][1], "extraits", []) if e]
            if ex:
                self.suivre(ex[0])
            self.play(FadeIn(c, shift=RIGHT * 0.12), run_time=0.25)
        if att is not None:
            self.au_mot("Mets pause")
            self.play(FadeOut(att), run_time=0.12)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS la batterie ──
        self.dire("00-garde")
        c_t = ValueTracker(0.0)
        bat = Batterie(P(-0.06, -2.38), 2.9, 0.62, c_t)
        self.entete("Convergence monotone", extrait="Convergence")
        self.play(FadeIn(bat, shift=UP * 0.2), run_time=0.4)          # le bas n'est jamais vide
        self.ligne([("Tu paries", WHITE, "Tu paries")], 2.2, fs=42)
        self.ligne([("qu'une batterie", TERME, "qu'une batterie")], 1.65, fs=38)
        self.ligne([("qui se charge", WHITE, "qui se charge")], 1.12, fs=38, avec=[c_t.animate.set_value(45)], rt=0.9)
        self.ligne([("sans dépasser", WHITE, "sans dépasser")], 0.6, fs=38, avec=[c_t.animate.set_value(62)], rt=0.6)
        self.ligne([("100 %", RAISON, "100")], 0.0, fs=54,
                   avec=[Indicate(bat.contour, color=RAISON, scale_factor=1.04), c_t.animate.set_value(70)], rt=0.5)
        self.ligne([("ne finit pas", WHITE, "ne finit")], -0.6, fs=38, avec=[c_t.animate.set_value(76)], rt=0.5)
        self.ligne([("forcément", WHITE, "forcément")], -1.1, fs=38)
        self.ligne([("à 100 % ?", JAUNE_TITRE, "100")], -1.68, fs=50, avec=[c_t.animate.set_value(79)], rt=0.5)
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT Élodie, sa voiture, la batterie ; EN BAS les maths EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = elodie(0.58).move_to(P(-1.5, 1.75))
        nom = self.t("Élodie", 44, JAUNE_TITRE).move_to(P(0.45, 2.25))
        met = self.t("ingénieure", 32, TERME).move_to(P(0.45, 1.75))
        car = voiture(0.8).move_to(P(0.55, 0.98))
        c_t = ValueTracker(0.0)
        bat = Batterie(P(-0.06, 0.25), 2.6, 0.62, c_t)
        self.au_mot("Élodie")
        self.play(FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), run_time=0.35)
        self.au_mot("ingénieure")
        self.play(FadeIn(met, shift=UP * 0.08), run_time=0.3)
        self.au_mot("voitures")
        self.play(FadeIn(car, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("la batterie")
        self.play(FadeIn(bat, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("charge en %", GREY_A, "la charge")], -0.35, fs=36)
        l2 = self.ligne([("quart d'heure", GREY_A, "au quart"), ("n :", TERME, None)], -0.85, fs=36)
        l3 = self.ligne([("u₀ =", TERME, "u indice 0"), ("20", WHITE, "égale 20")], -1.6, fs=48,
                        avec_k={1: [c_t.animate.set_value(20)]}, rt=0.5)
        rec = self.ligne([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("0,5uₙ", WHITE, "0,5"), ("+ 40", RAISON, "plus 40")],
                         -2.35, fs=44)
        self.attendre_voix(marge=0.3)

        # ── 02 : 20 ; 50 ; 65 ; 72,5 : la batterie monte à chaque case, et reste sous 100 ──
        self.dire("02-termes")
        c2 = ValueTracker(20.0)
        grande = Batterie(P(-0.07, 1.85), 3.0, 0.85, c2)
        bat.clear_updaters()
        self.play(FadeOut(VGroup(perso, nom, met, car, l1, l2, l3)), FadeOut(bat), run_time=0.25)
        vals = ["20", "50", "65", "72,5"]
        larg_c = [Text(v, font_size=34).width + 0.3 for v in vals]   # la MÊME marge (0,15) autour de chaque nombre
        gap = 0.12
        tot = sum(larg_c) + gap * 3
        xs, x = [], -tot / 2
        for w in larg_c:
            xs.append(x + w / 2)
            x += w + gap
        lg = LigneTermes(vals, xs=xs, centre=P(0, -0.15), largeur=0.84, hauteur=0.72, fs=34,
                         noms=["u₀", "u₁", "u₂", "u₃"], fs_noms=28)
        for k, w in enumerate(larg_c):
            cad, tx = lg.cases[k]
            cad.stretch_to_fit_width(w).move_to(P(xs[k], -0.15))
            lg.cases[k].remove(tx)
            tx = Text(vals[k], font_size=34, color=WHITE).move_to(cad)
            lg.cases[k].add(tx)
            lg.noms[k].next_to(cad, DOWN, buff=0.12)
        for k, ex in enumerate(["20", "50", "65", "72,5"]):   # chaque case et la batterie, ENSEMBLE, à la voix
            self.suivre(ex)
            c = lg.cases[k]
            entree = [rec.animate.move_to(P(0, 0.95)), FadeIn(grande)] if k == 0 else []   # APRÈS le départ de l'ancien
            self.play(*entree, FadeIn(c[0], scale=0.8), FadeIn(c[1], scale=1.4), FadeIn(lg.noms[k], shift=UP * 0.08),
                      c2.animate.set_value(C[k]), run_time=0.25)
        self.ligne([("la charge", WHITE, "la charge"), ("monte,", TERME, "monte")], -1.4, fs=42)
        self.ligne([("et reste sous", WHITE, "et reste"), ("100", RAISON, "100")], -2.05, fs=42,
                   avec_k={1: [Indicate(grande.contour, color=RAISON, scale_factor=1.04)]}, rt=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C (un nombre ≤ 100) ──
        g1 = self.construire([("Croissante et", WHITE, "croissante")], 40)
        g2 = self.construire([("majorée par", RAISON, "majorée"), ("100 :", RAISON, "100")], 40)

        def dessin():
            """La question arrive AVEC le titre ; la batterie remplit la place des boutons,
            descend en bas à « A : » et part juste avant « Mets pause » : le bas n'est jamais vide."""
            ca = ValueTracker(72.5)
            self._attente_q = Batterie(P(-0.07, -0.2), 3.2, 0.95, ca)
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), FadeIn(g1, shift=UP * 0.1), run_time=0.3)
            self._attente_q.charge.clear_updaters()
            self.montrer(g2, rt=0.22)
            liste.clear()
        liste = [(g1, None), (g2, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("→", "elle converge"), ("100", "100")], 44),
                                 self.choix([("→", "elle tend"), ("+∞", "plus l'infini")], 44),
                                 self.choix_lignes([[("→ un nombre", "elle converge vers un")],
                                                    [("≤ 100", "inférieur")]], 38)],
                                2, dessin=dessin)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[0]), FadeOut(q.cartes[1]),
                  run_time=0.25)
        nu = NuageTermes((0, 9.4), (0, 112), P(-1.2, -0.85), P(1.45, 0.2), fs=26)
        pts = VGroup(*[nu.point(n, C[n], TERME, 0.07) for n in range(10)])
        p100 = DashedLine(P(nu.ax_u.get_center()[0], nu.G(0, 100)[1]), nu.G(9.6, 100), color=RAISON, stroke_width=4,
                          dash_length=0.1)
        l100 = self.t("100", 26, RAISON, audit=False).next_to(p100, LEFT, buff=0.12)
        lim = DashedLine(P(nu.ax_u.get_center()[0], nu.G(0, 80)[1]), nu.G(9.6, 80), color=JUSTE, stroke_width=3.5,
                         dash_length=0.1)
        self.play(VGroup(q.cartes[2], ok).animate.move_to(P(0, 2.95)), run_time=0.25)   # d'abord monter…
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=0.25)   # …puis le repère
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1), run_time=0.45)   # points tout de suite
        self.ligne([("Le théorème donne", WHITE, "Le théorème")], 1.85, fs=40)
        self.ligne([("la convergence ;", JUSTE, "la convergence")], 1.32, fs=40)
        self.ligne([("100 :", RAISON, "100 est"), ("un plafond,", RAISON, "un plafond")], -1.38, fs=40,
                   avec_k={0: [Create(p100), FadeIn(l100)]}, rt=0.4)
        self.ligne([("pas forcément", WHITE, "pas forcément")], -1.92, fs=40)
        self.ligne([("la limite.", JUSTE, "la limite")], -2.46, fs=40, avec_k={0: [Create(lim)]}, rt=0.4)
        self.play(Indicate(VGroup(p100, lim), color=JUSTE, scale_factor=1.04), run_time=0.4)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        c4 = ValueTracker(72.5)
        b4 = Batterie(P(-0.07, -1.0), 2.6, 0.62, c4)
        qm = self.t("?", 44, JAUNE_TITRE, audit=False).move_to(P(b4.X(86), -1.0))
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(b4), run_time=0.35)
        self.ligne([("en résolvant", WHITE, "en résolvant")], 2.65, fs=44)
        self.ligne([("ℓ =", JUSTE, "l égale"), ("0,5ℓ", WHITE, "0,5"), ("+ 40,", RAISON, "plus 40")], 1.95, fs=50)
        self.ligne([("à quel pourcentage", RAISON, "à quel")], 1.2, fs=40, avec=[FadeIn(qm, scale=1.4)], rt=0.35)
        self.ligne([("la charge se", WHITE, "la charge")], 0.6, fs=40)
        self.ligne([("stabilise-t-elle ?", WHITE, "se stabilise")], 0.0, fs=40)
        appel = self.appel_commentaire(-2.15)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")
