# suite_expo_prolonger_short.py
# EleveAI — Maths 1re (sans spé) — short « Zoomer entre deux crans » (9:16),
# ceinture BLANCHE (échelle entière sous le titre). Série SUITES, épisode 39.
# Micro du coach : expo_fct_prolonger_suite (notion expo_fonction_lecture).
#   · 00-garde       : le titre, l'échelle (70 %), le pari « tu peux zoomer entre
#                      deux crans ? » ; EN BAS l'appli de cartes et le pincement ;
#   · 01-situation   : EN HAUT la carte et la fenêtre orange qui se divise par 2 ;
#                      EN BAS, EN MÊME TEMPS, les crans 400 / 200 / 100 / 50 km ;
#   · 02-crans       : × 0,5 d'un cran à l'autre, et les rangs 0, 1, 2, 3 ;
#   · 03-pincement   : deux doigts pincent, on s'arrête AU RANG 1,5 : seule
#                      f(x) = 400 × 0,5ˣ sait répondre ;
#   · 04/04b         : question-pause (C : environ 141 km), 3 s ; la corde droite
#                      donnerait 150, la courbe passe en dessous ;
#   · 05-commentaire : au rang 0,5, quelle largeur ? (réponse ≈ 282,8 km, NON
#                      affichée) ;
#   · 06-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = les crans de la suite, orange = la raison
# 0,5 et la fenêtre affichée, vert = juste (la fonction), rouge = le piège.
# Voix : manim/voix/premiere-suite-expo-prolonger-short.json (débit −6),
# calée par suite_expo_prolonger_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_expo_prolonger_short.py SuiteExpoProlongerShort -o eleveai-maths-premiere-suite-expo-prolonger-short --media_dir manim/scripts/premiere/media-suite-expo-prolonger-short

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "terminale"))

from suites_commun import *  # noqa: E402,F403
from suite_expo_prolonger import OutilsExpo  # noqa: E402  (les outils de la paysage)
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
G = lambda x: 400 * 0.5 ** x                                            # noqa: E731
assert [G(n) for n in range(4)] == [400, 200, 100, 50]                  # les quatre crans
assert round(G(1.5)) == 141 and (200 + 100) / 2 == 150 and G(1.5) < 150  # la réponse C
assert round(G(0.5), 1) == 282.8                                        # la question en commentaire

ROUTE, PARC, EAU = "#475569", "#166534", "#1d4ed8"
DOIGT = "#c68642"


def carte_appli(w=3.2, h=2.0):
    """L'écran de l'appli de cartes : des routes, un parc, une rivière."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color="#0f172a", fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=3)
    routes = VGroup(*[Line(P(-w / 2 + 0.08, y), P(w / 2 - 0.08, y), stroke_color=ROUTE, stroke_width=5)
                      for y in (-h / 4, h / 5)],
                    *[Line(P(x, -h / 2 + 0.08), P(x, h / 2 - 0.08), stroke_color=ROUTE, stroke_width=5)
                      for x in (-w / 3, w / 8, w / 2.6)])
    parc = RoundedRectangle(width=0.62, height=0.42, corner_radius=0.08, fill_color=PARC, fill_opacity=1,
                            stroke_width=0).move_to(P(-w / 2 + 0.5, -h / 2 + 0.42))
    riviere = VMobject(stroke_color=EAU, stroke_width=6)
    riviere.set_points_smoothly([P(-w / 2 + 0.08, h / 2 - 0.3), P(-0.3, 0.1), P(0.4, -0.2),
                                 P(w / 2 - 0.08, -h / 2 + 0.25)])
    return VGroup(fond, routes, riviere, parc)


def fenetre(frac, centre, w=3.2, h=2.0, couleur=RAISON):
    """La fenêtre affichée : sa largeur se divise par 2 à chaque cran, avec la
    double flèche qui mesure cette largeur."""
    lw, lh = w * frac, h * frac
    cadre = RoundedRectangle(width=max(lw, 0.3), height=max(lh, 0.26), corner_radius=0.06, stroke_color=couleur,
                             stroke_width=5, fill_opacity=0).move_to(centre)
    fl = DoubleArrow(cadre.get_left() + RIGHT * 0.03, cadre.get_right() + LEFT * 0.03, buff=0, color=couleur,
                     stroke_width=3, tip_length=min(0.14, max(lw, 0.3) / 3.2))
    return VGroup(cadre, fl)


def doigts(centre, ecart, s=1.0):
    """Deux doigts qui pincent l'écran, écartés de `ecart`."""
    def un(x):
        return VGroup(Ellipse(width=0.26, height=0.4, fill_color=DOIGT, fill_opacity=1, stroke_width=0),
                      Ellipse(width=0.2, height=0.1, fill_color="#f5d0b0", fill_opacity=1,
                              stroke_width=0).shift(UP * 0.12)).move_to(centre + RIGHT * x)
    return VGroup(un(-ecart / 2), un(ecart / 2)).scale(s)


class SuiteExpoProlongerShort(VerifMargo, OutilsExpo, OutilsCalcul, ShortSuites):
    fichier_marques = "suite_expo_prolonger_short_marques.json"
    nom_voix = "premiere-suite-expo-prolonger-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.86
    buff_boutons = 0.18
    y_tete_question = 3.45
    place_coche = -0.08
    Y_TITRE, Y_ECHELLE = 3.26, 2.5       # le titre tient sur DEUX lignes
    Y_CARTE = 1.12                       # EN HAUT : l'appli de cartes
    Y_CRANS = -1.85                      # EN BAS : les quatre crans

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.03)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22, x=None):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k, rt_mid=rt_mid)

    def entete(self, titre, extrait=None, fs=38):
        """Le titre sur deux lignes, l'échelle ENTIÈRE (70 %) dessous."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE, 3.95).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.6)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton : rond A/B/C, le corps (≈ 40 pt), marge ≥ 20 px, la coche à droite."""
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 40, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.32 - 0.75
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.32)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.36),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def crans(self, y=None, fs=22):
        """Les quatre crans de zoom, en cases (un rappel quand ils sont déjà dits)."""
        lg = LigneTermes(["400 km", "200 km", "100 km", "50 km"], centre=P(0, y if y is not None else self.Y_CRANS),
                         pas=1.02, largeur=0.97, hauteur=0.62, fs=fs)
        for c in lg.cases:
            if c[1].width > 0.8:
                c[1].scale_to_fit_width(0.8)
        return lg

    def construct(self):
        # ── 00 : la garde : le pari ; EN BAS l'appli et le pincement ───────
        self.dire("00-garde")
        self.entete("Suite géométrique et\nfonction exponentielle", extrait="Suite géométrique")
        ca = carte_appli(2.9, 1.8).move_to(P(0, -1.75))
        dg = doigts(P(0, -1.75), 1.5, 1.0)
        self.play(FadeIn(ca, shift=UP * 0.2), FadeIn(dg, scale=0.8), run_time=0.5)
        self.ligne([("Tu paries que", WHITE, "Tu paries")], 1.75, fs=44)
        self.ligne([("tu peux zoomer", JUSTE, "que tu peux")], 1.0, fs=52)
        self.ligne([("entre deux crans ?", JAUNE_TITRE, "entre deux crans")], 0.2, fs=44,
                   avec_k={0: [dg.animate.become(doigts(P(0, -1.75), 0.55, 1.0))]}, rt=0.8)
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT la fenêtre qui se divise par 2 ; EN BAS les crans ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        carte = carte_appli(3.2, 2.0).move_to(P(0, self.Y_CARTE))
        l1 = self.ligne([("Sur une appli de cartes,", WHITE, "une appli")], -0.2, fs=36,
                        avec_k={0: [FadeIn(carte, shift=UP * 0.15)]}, rt=0.45)
        self.fen = fenetre(1.0, P(0, self.Y_CARTE))
        l2 = self.ligne([("chaque cran divise", WHITE, "chaque cran"), ("par 2", RAISON, "par 2")], -0.8, fs=36,
                        avec_k={1: [FadeIn(self.fen)]}, rt=0.45)
        lg = self.crans()
        for k, (ex, frac) in enumerate(zip(("400", "200", "100", "50"), (1.0, 0.5, 0.25, 0.125))):
            self.suivre(ex)
            self.montrer_case(lg, k, run_time=0.25)
            self.play(Transform(self.fen, fenetre(frac, P(0, self.Y_CARTE))), run_time=0.4)
        self.lg = lg
        self.attendre_voix(marge=0.3)

        # ── 02 : la raison 0,5 et les rangs entiers ────────────────────────
        self.dire("02-crans")
        lg = self.lg
        self.rappel(lg)
        self.play(FadeOut(l1), FadeOut(l2), run_time=0.2)
        sauts = VGroup(*[lg.saut(i, "× 0,5", cote=UP, couleur=RAISON, fs=20, creux=0.16) for i in range(3)])
        self.ligne([("Une suite géométrique", TERME, "une suite"), ("de raison 0,5", RAISON, "0,5")],
                   -0.2, fs=36, avec_k={1: [LaggedStart(*[AnimationGroup(Create(s[0]), FadeIn(s[1], scale=1.2),
                                                                         lag_ratio=0.5) for s in sauts],
                                                        lag_ratio=0.3)]}, rt=1.0)
        self.ligne([("Mais les crans sont", WHITE, "Mais les crans"), ("des rangs entiers :", JAUNE_TITRE,
                                                                       "des rangs entiers")], -0.8, fs=36)
        rangs = VGroup()
        for k, (r, ex) in enumerate((("0", "0,"), ("1", "1,"), ("2", "2,"), ("3", "3."))):
            tr = self.t(r, 26, TERME).next_to(lg.cases[k], DOWN, buff=0.12)
            rangs.add(tr)
            self.suivre(ex)
            self.play(FadeIn(tr, scale=1.5), run_time=0.2)
        self.play(Indicate(rangs, color=TERME, scale_factor=1.2), run_time=0.45)
        self.attendre_voix(marge=0.3)

        # ── 03 : le pincement : on s'arrête au rang 1,5 ────────────────────
        self.nouvel_ecran("03-pincement", garder=(self.badge, self.titre_s, carte, self.fen))
        dg = doigts(P(0, self.Y_CARTE), 1.6, 1.0)
        self.au_mot("tu pinces")
        self.play(FadeIn(dg, scale=0.8), run_time=0.3)
        la = self.ligne([("Tu ne t'arrêtes pas", WHITE, "tu ne t'arrêtes")], -0.15, fs=38,
                        avec=[dg.animate.become(doigts(P(0, self.Y_CARTE), 0.95, 1.0)),
                              Transform(self.fen, fenetre(0.35, P(0, self.Y_CARTE)))], rt=1.2)
        lb = self.ligne([("sur un cran.", PIEGE, "sur un cran")], -0.75, fs=38)
        rang = VGroup(self.carte(2.3, 0.74, P(0, -1.05), JAUNE_TITRE),
                      self.t("rang 1,5", 40, JAUNE_TITRE).move_to(P(0, -1.05)))
        self.suivre("Tu t'arrêtes")             # les deux lignes partent : la place est rendue
        self.play(FadeOut(la), FadeOut(lb), run_time=0.2)
        self.ligne([("Tu t'arrêtes", WHITE, None)], -0.2, fs=38)
        self.au_mot("1,5")                      # le nombre lui-même, pas « au rang »
        self.play(FadeIn(rang, scale=0.8), run_time=0.4)
        self.ligne([("Seule la fonction", JUSTE, "seule la fonction")], -1.95, fs=36)
        self.ligne([("f(x) =", JUSTE, "f de x"), ("400", WHITE, "400"), ("× 0,5ˣ", RAISON, "0,5 puissance")],
                   -2.45, fs=36)
        self.attendre_voix(marge=0.3)

        # ── 04 : question-pause → C (environ 141 km) ───────────────────────
        g1 = self.construire([("Au rang 1,5,", JAUNE_TITRE, "Au rang 1,5")], 42)
        g2 = self.construire([("entre 200", TERME, "entre 200"), ("et 100 km,", TERME, "et 100")], 40)
        g3 = self.construire([("la largeur affichée est :", WHITE, "la largeur")], 38)
        q = self.question_lignes("04-question", [g1, g2, g3],
                                 [self.choix([("150 km", "150")], 42), self.choix([("50 km", "50")], 42),
                                  self.choix([("≈ 141 km", "environ 141")], 42)], 2)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[0]), FadeOut(q.cartes[1]),
                  VGroup(q.cartes[2], ok).animate.move_to(P(0, 3.0)), run_time=0.3)
        self.mixte([("t", [("400 ×", WHITE, "400 fois")]), ("p", "0,5", "1,5", RAISON, "0,5 puissance", "1,5"),
                    ("t", [("≈ 141", JUSTE, "141")])], 2.2, fs=42, larg=3.9)
        nu = self.nuage((0.85, 2.15), (80, 215), P(-1.5, -1.15), P(1.4, 0.8), nom_u="km", fs=20)
        p1, p2 = nu.point(1, 200, TERME, 0.09), nu.point(2, 100, TERME, 0.09)
        corde = Line(nu.G(1, 200), nu.G(2, 100), color=PIEGE, stroke_width=4)
        cb = self.courbe(nu, 1, 2, JUSTE, 4, f=G)
        d150 = nu.point(1.5, 150, PIEGE, 0.09)
        d141 = nu.point(1.5, 141.42, JUSTE, 0.09)
        self.play(*self.axes(nu, [GrowFromCenter(p1), GrowFromCenter(p2)]), run_time=0.5)
        self.ligne([("150, ce serait le milieu", PIEGE, "150, ce serait")], 1.62, fs=32,
                   avec_k={0: [Create(corde), GrowFromCenter(d150)]}, rt=0.5)
        self.ligne([("de la ligne droite.", PIEGE, "de la ligne droite")], -1.75, fs=36)
        self.ligne([("La courbe passe", WHITE, "la courbe passe"), ("en dessous !", JUSTE, "en dessous")],
                   -2.4, fs=34, avec_k={1: [Create(cb), GrowFromCenter(d141)]}, rt=0.7)
        self.attendre_voix(marge=0.4)

        # ── 05 : la question en commentaire ────────────────────────────────
        self.nouvel_ecran("05-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        ca = carte_appli(2.6, 1.6).move_to(P(0, 0.1))
        fe = fenetre(0.6, P(0, 0.1), 2.6, 1.6)
        qm = self.t("?", 70, RAISON, audit=False).move_to(P(0, -1.35))
        self.ligne([("au rang 0,5,", JAUNE_TITRE, "au rang 0,5")], 2.35, fs=44,
                   avec_k={0: [FadeIn(ca, shift=UP * 0.1), FadeIn(fe)]}, rt=0.4)
        self.ligne([("quelle largeur", WHITE, "quelle largeur")], 1.75, fs=40)
        self.ligne([("l'appli affiche-t-elle ?", WHITE, "l'appli affiche")], 1.2, fs=40,
                   avec_k={0: [FadeIn(qm, scale=0.7)]}, rt=0.4)
        appel = self.appel_commentaire(-2.1)
        self.play(FadeOut(qm, scale=0.8), run_time=0.2)
        self.add(appel)

        # ── 06 : la fin commune ───────────────────────────────────────────
        self.fin_short("06-abonne")
