# suite_registres_short.py
# EleveAI — Maths 1re spé — short « Les mots et les symboles : tu paries que tu
# lis u₅ sans te tromper ? » (9:16), ceinture BLANCHE (échelle entière à 70 %
# sous le titre). Série SUITES, épisode 17. Micro : suite_registres.
#   · 00-garde      : le titre, l'échelle, le pari ; u₅ : le rang (violet) et la valeur ;
#   · 01-situation  : EN HAUT la chaîne de dessin de Zoé (l'écran, le crayon) ;
#                     50 abonnés, « + 8 chaque mois » ; EN BAS uₙ (abonnés après
#                     n mois) et la case u₀ = 50 ;
#   · 02-lecture    : u₃ : 3 sauts « + 8 » sur la frise ; 50 + 3 × 8 = 74, et 74
#                     s'écrit sous u₃ EN MÊME TEMPS ;
#   · 03/03b        : question-pause (B : après 5 mois, 90 abonnés), 3 s ; puis
#                     l'indice compte les mois, la valeur les abonnés, 50 + 5 × 8 = 90 ;
#   · 04-commentaire: uₙ = 130, n = ? (réponse n = 10 : 50 + 10 × 8 = 130, NON
#                     affichée) ; « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = valeurs, orange = l'ajout, vert = juste, violet = le rang.
# Voix : manim/voix/premiere-spe-suite-registres-short.json (débit −6), calée
# par suite_registres_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_registres_short.py SuiteRegistresShort -o eleveai-maths-premiere-spe-suite-registres-short --media_dir manim/scripts/premiere/media-suite-registres-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16, bouton_texte  # noqa: E402  (ép. 16)

assert 50 + 3 * 8 == 74 and 50 + 5 * 8 == 90 and 50 + 10 * 8 == 130     # u₃, question B, commentaire (n = 10)
RANG = "#A855F7"


def ecran_video(s=1.0):
    """L'écran de la chaîne : le cadre, la feuille, un dessin (un soleil), le bouton lecture."""
    cadre = RoundedRectangle(width=2.0, height=1.3, corner_radius=0.12, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    feuille = Rectangle(width=1.5, height=0.9, fill_color="#F8FAFC", fill_opacity=1, stroke_width=0)
    soleil = Circle(radius=0.16, stroke_color=RAISON, stroke_width=4).move_to(P(-0.35, 0.12))
    rayons = VGroup(*[Line(P(-0.35, 0.12) + 0.22 * np.array([np.cos(a), np.sin(a), 0]),
                           P(-0.35, 0.12) + 0.32 * np.array([np.cos(a), np.sin(a), 0]),
                           stroke_color=RAISON, stroke_width=3) for a in np.arange(0, TAU, TAU / 8)])
    vague = VMobject(stroke_color=TERME, stroke_width=4).set_points_smoothly(
        [P(-0.6, -0.25), P(-0.2, -0.12), P(0.2, -0.3), P(0.6, -0.15)])
    lecture = Triangle(fill_color=PIEGE, fill_opacity=1, stroke_width=0).scale(0.12).rotate(-PI / 2)
    lecture.move_to(P(0.5, 0.2))
    return VGroup(cadre, feuille, rayons, soleil, vague, lecture).scale(s)


def crayon(s=1.0):
    """Un crayon de couleur, penché."""
    corps = Rectangle(width=0.16, height=0.9, fill_color=RAISON, fill_opacity=1, stroke_width=0)
    mine = Triangle(fill_color="#FDE68A", fill_opacity=1, stroke_width=0).scale(0.1).rotate(PI)
    mine.next_to(corps, DOWN, buff=0)
    return VGroup(corps, mine).rotate(0.6).scale(s)


class SuiteRegistresShort(AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_registres_short_marques.json"
    nom_voix = "premiere-spe-suite-registres-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    entete = _S16.entete
    q_reponse = _S16.q_reponse

    def frise(self, n, y, x0=-1.65, pas=1.1):
        ticks = VGroup(*[Line(P(x0 + pas * k, y - 0.1), P(x0 + pas * k, y + 0.1), stroke_width=3, color=GREY_B)
                         for k in range(n)])
        axe = Line(P(x0 - 0.2, y), P(x0 + (n - 1) * pas + 0.2, y), stroke_width=3, color=GREY_B)
        noms = VGroup(*[self.t(u(k), 30, TERME).next_to(ticks[k], DOWN, buff=0.1) for k in range(n)])
        return axe, ticks, noms

    def arcs(self, ticks, j, texte="+ 8"):
        g = VGroup()
        for k in range(j):
            a = ArcBetweenPoints(ticks[k].get_top() + UP * 0.05, ticks[k + 1].get_top() + UP * 0.05, angle=-PI / 2.2,
                                 color=RAISON, stroke_width=4)
            g.add(VGroup(a, self.t(texte, 28, RAISON).next_to(a, UP, buff=0.04)))
        return g

    def grand_u(self, indice, reste="", fs=110):
        """« u₅ » (ou « u₅ = 90 ») en grand : l'indice en violet (le rang)."""
        g = Text("u" + indice + reste, font_size=fs, color=TERME)
        g[1].set_color(RANG)
        return g

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; u₅ en grand ──
        self.dire("00-garde")
        self.entete("Mots et symboles", extrait="Les mots", fs=30)
        l1 = self.t("Tu paries que", 40).next_to(self.badge, DOWN, buff=0.4)
        l2 = self.t("tu lis", 40).next_to(l1, DOWN, buff=0.15)
        self.au_mot("Tu paries")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("tu lis")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        gu = self.grand_u("₅", fs=130).move_to(P(0, 0.15))
        self.au_mot("u indice 5")
        self.play(FadeIn(gu, scale=1.3), run_time=0.35)
        l3 = self.paragraphe(["sans te", ("tromper ?", RAISON)], 40, buff=0.12, y=-1.6)
        self.au_mot("sans te tromper")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(gu[1], color=RANG, scale_factor=1.3), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT la chaîne de Zoé ; EN BAS uₙ et u₀ = 50 ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ecr = ecran_video(0.85).move_to(P(-0.25, 1.85))
        cr = crayon(0.8).move_to(P(1.35, 1.8))
        cap = self.t("la chaîne de Zoé", 30, GREY_A).move_to(P(0, 1.02))
        self.au_mot("Zoé lance")
        self.play(FadeIn(ecr, shift=UP * 0.15), FadeIn(cr, shift=LEFT * 0.15), FadeIn(cap), run_time=0.4)
        self.au_mot("50 abonnés")
        a50 = self.t("50 abonnés", 40, TERME).move_to(P(0, 0.42))
        self.play(FadeIn(a50, shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 de plus")
        p8 = self.t("+ 8 chaque mois", 34, RAISON).move_to(P(0, -0.18))
        self.play(FadeIn(p8, shift=UP * 0.1), Wiggle(cr), run_time=0.4)
        bas = self.paragraphe([("uₙ : les abonnés", WHITE), "après n mois"], 34, buff=0.1, y=-1.05)
        bas[0][:2].set_color(TERME)
        bas[1][5].set_color(RANG)
        for ligne, ex in zip(bas, ("u indice n", "après n mois")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        self.au_mot("u indice 0 égale")
        f = self.calcul([("u₀ =", TERME, None), ("50", TERME, "50")], -2.2, centre=0, fs=48)
        self.play(Create(self.encadre(f, TERME, 0.12)), Indicate(a50, color=TERME), run_time=0.35)
        self.attendre_voix(marge=0.3)

        # ── 02 : u₃ : 3 sauts « + 8 », 50 + 3 × 8 = 74 ──
        self.nouvel_ecran("02-lecture", garder=(self.badge, self.titre_s, ecr, cr))
        axe, ticks, noms = self.frise(4, 0.3)
        self.au_mot("u indice 3")
        self.play(Create(axe), FadeIn(ticks), FadeIn(noms), run_time=0.35)
        self.play(Indicate(noms[3], color=RANG, scale_factor=1.4), run_time=0.3)
        v50 = self.t("50", 30, TERME).next_to(noms[0], DOWN, buff=0.15)
        sauts = self.arcs(ticks, 3)
        self.au_mot("après 3 mois")
        self.play(LaggedStart(*[Create(g[0]) for g in sauts], lag_ratio=0.5), run_time=0.7)
        self.calcul([("u₃ =", TERME, None), ("50", TERME, "50"), ("+", WHITE, "plus"), ("3", RANG, "3"),
                     ("×", WHITE, "fois"), ("8", RAISON, "8")], -1.35, centre=0, fs=36,
                    avec_morceau={1: [FadeIn(v50, scale=1.2)], 5: [FadeIn(g[1], shift=DOWN * 0.08) for g in sauts]})
        v74 = self.t("74", 30, JUSTE).next_to(noms[3], DOWN, buff=0.15)
        c = self.calcul([("=", WHITE, "égale"), ("74 abonnés", JUSTE, "74")], -2.1, centre=0, fs=36,
                        avec_morceau={1: [FadeIn(v74, scale=1.3)]})
        self.play(Create(self.encadre(c, JUSTE, 0.12)), Indicate(v74, color=JUSTE), run_time=0.3)
        self.attendre_voix(marge=0.4)

        # ── 03 : question-pause → B ; puis l'indice compte les mois ──
        fsb = 30
        corps = [bouton_texte(l, fsb) for l in (["après 90 mois,", "5 abonnés"],
                                                ["après 5 mois,", "90 abonnés"],
                                                ["après 6 mois,", "90 abonnés"])]
        for c, ex in zip(corps, (["90 mois", "5 abonnés"], ["5 mois", "90 abonnés"], ["6 mois", "90 abonnés"])):
            c.extraits = ex  # chaque ligne du bouton quand la voix la dit
        f = min(1.0, (4.0 - self.place_coche - 0.5 * fsb / 32 - 0.45) / max(c.width for c in corps))
        for c in corps:
            c.scale(f)  # même taille de texte dans les 3 boutons
        cartes = VGroup(*[self.bouton(L, c, 4.0, fsb) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.15).move_to(P(0, 0)).align_to(P(0, 2.0), UP)
        ql = []

        def e1():
            ql.append(self.calcul([("u₅ =", TERME, "u indice 5"), ("90", WHITE, "90")], 2.92, centre=0, fs=36))
            ql.append(self.calcul([("veut dire :", WHITE, "veut dire")], 2.45, centre=0, fs=32))

        q = self.question_libre("03-question", [e1], cartes, P(0, cartes.get_bottom()[1] - 0.4))
        self.dire("03b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        b = cartes[1]
        self.play(FadeOut(cartes[0]), FadeOut(cartes[2]), FadeOut(q.tete), *[FadeOut(m) for m in ql], run_time=0.25)
        self.play(b.animate.move_to(P(0, 2.55)), run_time=0.3)
        gu = self.grand_u("₅", " = 90", fs=72).move_to(P(0, 1.1))
        self.au_mot("L'indice compte")
        r1 = self.t("indice → mois", 36, RANG).move_to(P(0, 0.15))
        self.play(FadeIn(gu[:2], scale=1.2), FadeIn(r1, shift=UP * 0.1), run_time=0.35)
        self.play(Indicate(gu[1], color=RANG, scale_factor=1.5), run_time=0.3)
        self.au_mot("la valeur compte")
        r2 = self.t("valeur → abonnés", 33, TERME).move_to(P(0, -0.45))
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.3)
        self.calcul([("50", TERME, "50"), ("+", WHITE, "plus"), ("5", RANG, "5"), ("×", WHITE, "fois"),
                     ("8", RAISON, "8")], -1.35, centre=0, fs=40)
        c = self.calcul([("=", WHITE, "égale"), ("90", JUSTE, "90")], -2.1, centre=0, fs=46,
                        avec_morceau={1: [FadeIn(gu[2:], scale=1.2)]})
        self.play(Create(self.encadre(c, JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 50, JAUNE_TITRE).move_to(P(0, 3.5))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("pour quel n")
        pq = self.t("Pour quel n", 40).move_to(P(0, 2.45))
        pq[-1].set_color(RANG)
        self.play(FadeIn(pq, shift=UP * 0.1), run_time=0.3)
        self.au_mot("u indice n égale")
        self.calcul([("uₙ =", TERME, None), ("130 ?", JUSTE, "130")], 1.3, centre=0, fs=50)
        self.appel_commentaire(-0.6)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
