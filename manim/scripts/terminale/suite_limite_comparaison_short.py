# suite_limite_comparaison_short.py
# EleveAI — Maths Terminale (spé) — short « Le théorème des gendarmes »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 36. Micro du coach : limite_suite_comparaison (gendarmes :
# genGendarmes du renfort, fixed_1).
#   · 00-garde       : le titre, l'échelle (70 %), le pari « une limite sans
#                      connaître la suite ? » ; EN BAS deux gendarmes et le « ? »
#                      qu'ils escortent, dès le titre ;
#   · 01-situation   : EN HAUT Théo, technicien de laboratoire, et le cadran de
#                      sa mesure (deux butées orange, l'aiguille bleue entre) ; EN
#                      BAS, EN MÊME TEMPS, 8 − 1/n ≤ uₙ ≤ 8 + 2/n (la butée de
#                      gauche au-dessus de « 8 − 1/n », celle de droite au-dessus
#                      de « 8 + 2/n ») ;
#   · 02-bornes      : 1/n → 0, 2/n → 0 : les butées se resserrent ;
#   · 03/03b         : question-pause (A : 8), 3 s ; les butées se referment sur 8 ;
#   · 04-commentaire : pour n = 100, entre quels nombres est la mesure ?
#                      (réponse : entre 7,99 et 8,02, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = la mesure uₙ, orange = les bornes,
# vert = juste (la limite 8).
# Voix : manim/voix/terminale-suite-limite-comparaison-short.json (débit −6),
# calée par suite_limite_comparaison_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_limite_comparaison_short.py SuiteLimiteComparaisonShort -o eleveai-maths-terminale-suite-limite-comparaison-short --media_dir manim/scripts/terminale/media-suite-limite-comparaison-short

import math
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_comparaison import gendarme  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402

M = {n: 8 + (0.5 + 1.4 * math.sin(1.3 * n)) / n for n in range(1, 400)}            # une mesure possible
assert all(8 - 1 / n <= M[n] <= 8 + 2 / n for n in M)                       # coincée entre les bornes
assert abs(M[399] - 8) < 0.01                                               # → 8 : la réponse A
assert (round(8 - 1 / 100, 2), round(8 + 2 / 100, 2)) == (7.99, 8.02)       # le commentaire (non affiché)
PEAU = "#e0ac69"
VA, VB = 6.6, 10.4                                                          # le cadran : de 6,6 à 10,4


def theo(s=1.0):
    """Théo, technicien de laboratoire : blouse blanche, lunettes, cheveux bouclés."""
    cheveux = VGroup(*[Circle(radius=0.1, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
                       .move_to(P(-0.2 + 0.1 * k, 1.25 + 0.03 * (k % 2))) for k in range(5)])
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    lun = VGroup(Circle(radius=0.07, stroke_color="#0f172a", stroke_width=2.5).move_to(P(-0.1, 1.02)),
                 Circle(radius=0.07, stroke_color="#0f172a", stroke_width=2.5).move_to(P(0.1, 1.02)))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#f1f5f9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.14, 0.68), P(0.14, 0.68), P(0, 0.42), fill_color="#0ea5e9", fill_opacity=1, stroke_width=0)
    tube = VGroup(RoundedRectangle(width=0.14, height=0.5, corner_radius=0.06, stroke_color="#94a3b8",
                                   stroke_width=2, fill_opacity=0).move_to(P(0.35, 0.05)),
                  RoundedRectangle(width=0.12, height=0.22, corner_radius=0.05, fill_color=TERME, fill_opacity=1,
                                   stroke_width=0).move_to(P(0.35, -0.08)))
    return VGroup(corps, col, cheveux, tete, lun, tube).scale(s)


class Cadran(VGroup):
    """Le cadran de la mesure, horizontal, de VA à VB : la piste, deux butées
    orange (les bornes) et l'aiguille bleue (la mesure). Sans nombres."""

    def __init__(self, y, x0=-1.9, x1=1.9, **kw):
        super().__init__(**kw)
        self.y, self.x0, self.x1 = y, x0, x1
        self.piste = RoundedRectangle(width=x1 - x0 + 0.2, height=0.34, corner_radius=0.12, stroke_color=GREY_B,
                                      stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(0, y))
        self.crans = VGroup(*[Line(P(self.X(v), y - 0.17), P(self.X(v), y - 0.05), stroke_color=GREY_B,
                                   stroke_width=2) for v in (7, 8, 9, 10)])
        self.add(self.piste, self.crans)

    def X(self, v):
        return self.x0 + (v - VA) / (VB - VA) * (self.x1 - self.x0)

    def butee(self, v):
        x = self.X(v)
        return VGroup(Line(P(x, self.y - 0.36), P(x, self.y + 0.36)),
                      Line(P(x - 0.08, self.y + 0.36), P(x + 0.08, self.y + 0.36)),
                      Line(P(x - 0.08, self.y - 0.36), P(x + 0.08, self.y - 0.36))).set_stroke(RAISON, 6)

    def aiguille(self, v):
        x = self.X(v)
        return Polygon(P(x, self.y - 0.05), P(x - 0.11, self.y + 0.3), P(x + 0.11, self.y + 0.3), fill_color=TERME,
                       fill_opacity=1, stroke_width=0)

    def vivant(self, n_t):
        """Les butées en 8 − 1/n et 8 + 2/n, l'aiguille en M(n) (n réel), qui suivent n_t."""
        return VGroup(always_redraw(lambda: self.butee(8 - 1 / n_t.get_value())),
                      always_redraw(lambda: self.butee(8 + 2 / n_t.get_value())),
                      always_redraw(lambda: self.aiguille(8 + (0.5 + 1.4 * math.sin(1.3 * n_t.get_value())) / n_t.get_value())))


class SuiteLimiteComparaisonShort(VerifMargo, OutilsCalcul, ShortSuites):
    fichier_marques = "suite_limite_comparaison_short_marques.json"
    nom_voix = "terminale-suite-limite-comparaison-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.86
    buff_boutons = 0.16
    y_tete_question = 3.52
    place_coche = -0.08
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
        """Un bouton : rond A/B/C, le corps (≈ 40 pt), marge ≥ 20 px, la coche à droite sans toucher le texte."""
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

    def encadrement(self, fs=44):
        """8 − 1/n ≤ uₙ ≤ 8 + 2/n (fractions empilées), chaque morceau à sa voix."""
        g = self.ligne_maths([("t", [("8 −", RAISON, "8 moins")]), ("f", [("1", RAISON, "1 sur")], [("n", RAISON, None)]),
                                 ("t", [("≤", WHITE, "inférieur ou égal à u"), ("uₙ", TERME, None),
                                        ("≤", WHITE, "inférieur ou égal à 8"), ("8 +", RAISON, None)]),
                                 ("f", [("2", RAISON, "2 sur")], [("n", RAISON, None)])], fs)
        if g.width > 3.95:
            g.scale_to_fit_width(3.95)
        return g

    def escorte(self, y, s=0.62):
        """Deux gendarmes et, entre eux, le « ? » bleu qu'ils escortent."""
        qm = VGroup(Circle(radius=0.33, fill_color=TERME, fill_opacity=1, stroke_width=0),
                    self.t("?", 44, WHITE, audit=False)).move_to(P(0, y))
        qm[1].move_to(qm[0])
        return VGroup(gendarme(s).move_to(P(-0.95, y + 0.1)), qm, gendarme(s).move_to(P(0.95, y + 0.1)))

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS l'escorte ──
        self.dire("00-garde")
        esc = self.escorte(-2.05)
        self.entete("Théorème des gendarmes", extrait="Théorème")
        self.play(FadeIn(esc, shift=UP * 0.2), run_time=0.4)        # le bas n'est jamais vide
        self.ligne([("Tu paries que", WHITE, "Tu paries")], 2.0, fs=46)
        self.ligne([("tu trouves", WHITE, "tu trouves")], 1.35, fs=46)
        self.ligne([("une limite", JUSTE, "une limite")], 0.6, fs=58)
        self.ligne([("sans connaître", WHITE, "sans connaître")], -0.15, fs=46)
        self.ligne([("la suite ?", JAUNE_TITRE, "la suite")], -0.85, fs=58,
                   avec_k={0: [Indicate(esc[1], color=JAUNE_TITRE, scale_factor=1.2)]})
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT Théo et son cadran ; EN BAS l'encadrement EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = theo(0.58).move_to(P(-1.5, 1.6))
        nom = self.t("Théo", 44, JAUNE_TITRE).move_to(P(0.45, 2.1))
        met1 = self.t("technicien", 32, TERME).move_to(P(0.45, 1.55))
        met2 = self.t("de laboratoire", 32, TERME).move_to(P(0.45, 1.12))
        cad = Cadran(0.3)
        n_t = ValueTracker(1.0)
        viv = cad.vivant(n_t)
        self.au_mot("Théo")
        self.play(FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), run_time=0.35)
        self.au_mot("technicien")
        self.play(FadeIn(met1, shift=UP * 0.08), FadeIn(met2, shift=UP * 0.08), run_time=0.3)
        f = self.ligne([("formule de", WHITE, "la formule"), ("uₙ :", TERME, "u indice n"), ("?", PIEGE, None)], -0.6,
                       fs=42, avec_k={0: [FadeIn(cad)]})
        mp = self.ligne([("mais pour", GREY_A, "mais il sait"), ("n ≥ 1 :", GREY_A, "égal à 1")], -1.25, fs=40)
        enc = self.encadrement(44).move_to(P(0, -2.12))
        ks = enc.extraits
        self.montrer(enc, avec_k={0: [FadeIn(viv[0])], 3: [FadeIn(viv[2])], len(ks) - 2: [FadeIn(viv[1])]})
        self.attendre_voix(marge=0.3)

        # ── 02 : 1/n → 0, 2/n → 0 : les butées se resserrent ──
        self.dire("02-bornes")
        self.play(FadeOut(f), run_time=0.2)
        self.ligne([("1/n", RAISON, "1 sur n"), ("et", WHITE, None), ("2/n", RAISON, "2 sur n"), ("→ 0", JUSTE, "vers 0")],
                   -0.6, fs=46)
        self.au_mot("Les deux bornes")
        self.play(FadeOut(mp), run_time=0.2)
        self.ligne([("les bornes se resserrent", RAISON, "se resserrent")], -1.25, fs=40,
                   avec=[n_t.animate.set_value(12), Indicate(enc, color=RAISON, scale_factor=1.04)], rt=1.6)
        self.attendre_voix(marge=0.3)
        for m in viv:
            m.clear_updaters()

        # ── 03 : question-pause → A (8) ──
        g1 = self.construire([("La mesure", WHITE, "La mesure"), ("uₙ", TERME, None)], 46)
        g2 = self.construire([("converge vers :", WHITE, "converge")], 46)

        def dessin():
            """Le bas ne reste pas vide : le cadran attend, puis s'en va AVANT les cadres des boutons."""
            ca = Cadran(-1.0)
            na = ValueTracker(12.0)
            self._attente_q = VGroup(ca, *ca.vivant(na))
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), run_time=0.3)
            for m in self._attente_q[1:]:
                m.clear_updaters()
            for g in (g1, g2):
                self.montrer(g, rt=0.22)
            liste.clear()
        liste = [(g1, None), (g2, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("8", "8")], 44), self.choix([("10", "10")], 44),
                                 self.choix_lignes([[("on ne peut", "on ne peut")], [("pas savoir", "pas savoir")]], 40)],
                                0, dessin=dessin)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[1]), FadeOut(q.cartes[2]),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 2.95)), run_time=0.3)
        cad = Cadran(1.55)
        n_t = ValueTracker(3.0)
        viv = cad.vivant(n_t)
        huit = VGroup(Line(P(cad.X(8), 1.55 - 0.42), P(cad.X(8), 1.55 + 0.42), stroke_color=JUSTE, stroke_width=3),
                      self.t("8", 36, JUSTE, audit=False).move_to(P(cad.X(8), 0.9)))
        rap = self.encadrement(42).move_to(P(0, -0.4))           # le bas n'est pas vide : les bornes attendent
        for m in rap:
            m.set_opacity(1)
        self.play(FadeIn(cad), FadeIn(viv), FadeIn(rap, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Les deux bornes")
        self.play(FadeOut(rap, shift=DOWN * 0.1), run_time=0.2)
        self.ligne([("Les deux bornes", RAISON, None)], 0.2, fs=42,
                   avec=[n_t.animate.set_value(8)], rt=0.6)
        self.ligne([("→ 8 :", JUSTE, "vers 8")], -0.5, fs=52, avec_k={0: [FadeIn(huit), n_t.animate.set_value(60)]},
                   rt=0.9)
        self.ligne([("coincée entre elles,", WHITE, "coincée")], -1.2, fs=42)
        fin = self.ligne([("la mesure", WHITE, "la mesure"), ("uₙ → 8", JUSTE, "vers 8")], -1.95, fs=42, larg=3.55)
        self.play(Create(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.4)
        for m in viv:
            m.clear_updaters()

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        qm = self.t("?", 130, RAISON, audit=False).move_to(P(0, -2.05)).set_opacity(0.55)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(qm, scale=0.8), run_time=0.35)
        self.ligne([("pour", WHITE, "pour n"), ("n = 100,", JAUNE_TITRE, "100")], 2.65, fs=46)
        rap = self.encadrement(40).move_to(P(0, -0.55))
        for m in rap:
            m.set_opacity(1)
        self.ligne([("entre quels nombres", RAISON, "entre quels")], 1.95, fs=40, avec=[FadeIn(rap, shift=UP * 0.1)],
                   rt=0.35)
        self.ligne([("se trouve forcément", WHITE, "se trouve")], 1.3, fs=40)
        self.ligne([("la mesure ?", WHITE, "la mesure")], 0.65, fs=42)
        self.au_mot("Réponds en commentaire")
        appel = self.paragraphe([("Réponds en", JUSTE), ("commentaire !", JUSTE)], 44, buff=0.08, y=-2.05,
                                larg=self.largeur_texte / 1.1)
        self.play(FadeOut(qm, scale=0.8), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque lettre
        à « A : », son contenu quand la voix le dit."""
        att = getattr(self, "_attente_q", None)
        if att is None:
            return super().q_montrer_choix(cartes)
        self._attente_q = None
        self.play(FadeOut(att, shift=DOWN * 0.15), run_time=0.25)      # le dessin part AVANT les cadres
        for c, L in zip(cartes, "ABC"):
            # le cadre, sa lettre et son 1er morceau arrivent ENSEMBLE, quand la voix dit ce morceau
            self.suivre(f"{L} : ")
            corps = c[1][1]
            for k, (m, ex) in enumerate(zip(corps.nombres, corps.extraits)):
                self.suivre(ex)
                debut = [FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15)] if k == 0 else []
                self.play(*debut, FadeIn(m, scale=1.2), run_time=0.25)
