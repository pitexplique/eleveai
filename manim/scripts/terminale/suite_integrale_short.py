# suite_integrale_short.py
# EleveAI — Maths Terminale (spé) — short « Une suite d'intégrales »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 41. Micro du coach : integrale_suite (notion
# primitive_integrale) : tpl_1 (le terme de rang k) et tpl_4 (la limite).
#   · 00-garde       : le titre, l'échelle (70 %), le pari « cette aire finit
#                      par disparaître ? » ; EN BAS l'affiche, déjà encrée ;
#   · 01-situation   : EN HAUT l'affiche et son dégradé du blanc au noir
#                      (l'encre = l'aire sous y = xⁿ, la courbe en bleu) ;
#                      EN BAS, EN MÊME TEMPS, le profil et l'intervalle ;
#   · 02-courbes     : n = 1, 2, 5, 20 : l'encre maigrit EN HAUT pendant que
#                      les aires 1/2, 1/3, 1/6, 1/21 s'écrivent EN BAS, puis
#                      Iₙ = 1/(n + 1) ;
#   · 03/03b         : question-pause (B : 0), 3 s ; l'affiche devient blanche ;
#   · 04-commentaire : combien vaut I₉ ? (réponse 1/10 = 0,1, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = l'aire Iₙ (le profil), orange = n et
# l'intervalle, vert = juste (la limite 0).
# Voix : manim/voix/terminale-suite-integrale-short.json (débit −6), calée par
# suite_integrale_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_integrale_short.py SuiteIntegraleShort -o eleveai-maths-terminale-suite-integrale-short --media_dir manim/scripts/terminale/media-suite-integrale-short

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_calculer import OutilsCalcul  # noqa: E402
from suite_limite_operations import VerifMargo  # noqa: E402
from suite_integrale import Rampe  # noqa: E402

A = {n: 1 / (n + 1) for n in (1, 2, 5, 20, 9)}
assert (A[1], A[2], A[5], A[20]) == (1 / 2, 1 / 3, 1 / 6, 1 / 21)   # 02 : les quatre aires
assert A[9] == 0.1                                                  # 04 : I₉ = 1/10 = 0,1
assert 1 / (1000 + 1) < 1e-3                                        # 03 : la limite est 0 (B)
ENCRE, PAPIER = "#111827", "#f1f5f9"


class Affiche(VGroup):
    """L'affiche : le papier blanc, l'ENCRE (le noir) sous la courbe y = xⁿ, et
    la courbe elle-même en bleu. Plus n est grand, moins il y a d'encre :
    l'encre utilisée, c'est l'aire sous la courbe."""

    def __init__(self, cote, centre, **kw):
        super().__init__(**kw)
        self.papier = Rectangle(width=cote, height=cote, fill_color=PAPIER, fill_opacity=1, stroke_color=GREY_B,
                                stroke_width=3).move_to(centre)
        g = self.papier.get_corner(DL)
        self.ra = Rampe(P(g[0], g[1]), P(g[0] + cote, g[1] + cote))
        self.add(self.papier)

    def encre(self, n):
        return self.ra.aire(lambda x: x ** n, ENCRE, 1.0, 0)

    def profil(self, n):
        return self.ra.profil(n, TERME, 4)


class SuiteIntegraleShort(VerifMargo, OutilsCalcul, ShortSuites):
    fichier_marques = "suite_integrale_short_marques.json"
    nom_voix = "terminale-suite-integrale-short"
    identite = "Maths Tle spé — EleveAI"
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

    def affiche_vivante(self, cote, y, n_t):
        """L'affiche dont l'encre et la courbe suivent n (ValueTracker)."""
        af = Affiche(cote, P(0, y))
        enc = always_redraw(lambda: af.encre(n_t.get_value()))
        prof = always_redraw(lambda: af.profil(n_t.get_value()))
        return af, enc, prof

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS l'affiche ──
        self.dire("00-garde")
        af0 = Affiche(1.9, P(0, -1.75))
        enc0, pr0 = af0.encre(1), af0.profil(1)
        self.entete("Une suite d'intégrales", extrait="Une suite")
        self.ligne([("Tu paries que", WHITE, "Tu paries")], 2.05, fs=44)
        self.ligne([("cette aire", JUSTE, "cette aire")], 1.35, fs=56,
                   avec_k={0: [FadeIn(af0), FadeIn(enc0), Create(pr0)]}, rt=0.6)
        self.ligne([("finit par", WHITE, "finit par")], 0.65, fs=44)
        self.ligne([("disparaître ?", JAUNE_TITRE, "disparaître")], -0.05, fs=56,
                   avec_k={0: [Indicate(pr0, color=TERME, scale_factor=1.05)]}, rt=0.5)
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT l'affiche et son dégradé ; EN BAS le profil, EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        af = Affiche(1.8, P(0, 1.4))
        enc, prof = af.encre(1), af.profil(1)
        hach = af.ra.aire(lambda x: x, TERME, 0, 11, 2.6)
        seg = Line(af.ra.G(0, 0), af.ra.G(1, 0), stroke_color=RAISON, stroke_width=7)
        # cinq lignes COURTES, toutes à la même taille (une ligne longue serait rétrécie)
        self.ligne([("un dégradé", WHITE, "un dégradé")], 0.05, fs=38, avec_k={0: [FadeIn(af)]}, rt=0.4)
        self.ligne([("du blanc au noir", WHITE, "va du blanc")], -0.6, fs=38, avec_k={0: [FadeIn(enc)]}, rt=0.5)
        self.ligne([("profil :", GREY_A, "Son profil"), ("y = xⁿ", TERME, "y égale x puissance n")], -1.2, fs=38,
                   avec_k={1: [Create(prof)]}, rt=0.5)
        self.ligne([("entre 0 et 1", RAISON, "entre 0 et 1")], -1.8, fs=38, avec_k={0: [Create(seg)]})
        self.ligne([("l'encre, c'est l'aire", TERME, "L'encre utilisée")], -2.4, fs=38,
                   avec_k={0: [FadeIn(hach), Indicate(prof, color=TERME, scale_factor=1.05)]}, rt=0.6)
        self.attendre_voix(marge=0.3)

        # ── 02 : l'encre maigrit EN HAUT, les aires s'écrivent EN BAS ──
        self.nouvel_ecran("02-courbes", garder=(self.badge, self.titre_s))
        n_t = ValueTracker(1.0)
        af2, enc2, pr2 = self.affiche_vivante(1.7, 1.5, n_t)
        for k, (n, val, dit) in enumerate(((1, "1/2", "1 divisé par 2"), (2, "1/3", "1 divisé par 3"),
                                           (5, "1/6", "1 divisé par 6"), (20, "1/21", "1 divisé par 21"))):
            debut = {0: [FadeIn(af2), FadeIn(enc2), FadeIn(pr2)]} if k == 0 else {}
            debut[2] = [n_t.animate.set_value(n)] if k else [Wait(0.01)]
            self.ligne([(f"n = {n}", RAISON, f"n égale {n}"), ("→", GREY_A, None), (val, TERME, dit)],
                       0.15 - 0.57 * k, fs=36, avec_k=debut, rt=0.5 if k else 0.3)
        # encadré remonté : il doit rester à 0,15 au-dessus de Ti-Margo (BORDS=1 : MARGO)
        fin = self.ligne([("Iₙ =", TERME, "I indice n"), ("1/(n + 1)", JUSTE, "1 divisé par n plus 1")], -2.3, fs=40)
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.3)
        for m in (enc2, pr2):
            m.clear_updaters()

        # ── 03 : question-pause → B (0) ──
        g1 = self.construire([("La limite de", WHITE, "La limite"), ("Iₙ", TERME, "I indice n")], 44)
        g2 = self.construire([("quand n → +∞ est :", RAISON, "quand n tend")], 40)

        def dessin():
            """Le bas ne reste pas vide : l'affiche attend, puis s'en va AVANT les cadres."""
            at = Affiche(1.8, P(0, -0.5))
            self._attente_q = VGroup(at, at.encre(20), at.profil(20))
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), run_time=0.3)
            for g in (g1, g2):
                self.montrer(g, rt=0.22)
            liste.clear()
        liste = [(g1, None), (g2, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("1", "1")], 44), self.choix([("0", "0")], 44),
                                 self.choix_lignes([[("on ne peut", "on ne peut")],
                                                    [("pas conclure", "pas conclure")]], 40)],
                                1, dessin=dessin)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        m_t = ValueTracker(20.0)
        af3, enc3, pr3 = self.affiche_vivante(1.7, 1.25, m_t)
        # l'affiche arrive AVEC le départ des cartes : sinon la voix a déjà dit « n plus 1 » (RETARD)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[0]), FadeOut(q.cartes[2]),
                  VGroup(q.cartes[1], ok).animate.move_to(P(0, 2.95)),
                  FadeIn(af3), FadeIn(enc3), FadeIn(pr3), run_time=0.2)
        self.ligne([("n + 1", RAISON, "n plus 1"), ("→ +∞", RAISON, "tend vers plus l'infini")], -0.15, fs=44)
        self.ligne([("donc", GREY_A, "donc"), ("1/(n + 1)", TERME, "1 divisé par n plus 1"),
                    ("→ 0", JUSTE, "tend vers 0")], -0.95, fs=40,
                   avec_k={2: [m_t.animate.set_value(300)]}, rt=1.0)
        f1 = self.ligne([("il ne reste presque", WHITE, "il ne reste")], -1.75, fs=38)
        fin = VGroup(f1, self.ligne([("plus d'encre.", JUSTE, "plus d'encre")], -2.3, fs=38))
        self.play(FadeIn(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.4)
        for m in (enc3, pr3):
            m.clear_updaters()

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        af4 = Affiche(2.0, P(0, 0.6))
        self.ligne([("combien vaut", WHITE, "combien vaut")], 2.9, fs=44)
        self.ligne([("I₉ ?", JAUNE_TITRE, "I indice 9")], 2.2, fs=58,
                   avec_k={0: [FadeIn(af4), FadeIn(af4.encre(9)), Create(af4.profil(9))]}, rt=0.6)
        self.appel_commentaire(-2.15, fs=44)
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
            self.suivre(f"{L} : ")
            corps = c[1][1]
            for k, (m, ex) in enumerate(zip(corps.nombres, corps.extraits)):
                self.suivre(ex)
                debut = [FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15)] if k == 0 else []
                self.play(*debut, FadeIn(m, scale=1.2), run_time=0.25)
