# symboles_notations_shorts.py
# EleveAI — « Les bases » — les TROIS shorts de « Symboles et notations ».
#
# ⭐ 04/10/2026 — Frédéric : « crée shorts », textes validés avec lui (« go »).
# La paysage est en ligne : https://youtu.be/8hfB2Qj3TP8 — les shorts y renvoient
# (« vidéos similaires ») ; leur écran de fin pointe le coach, comme toute la série.
#   1. ShortSymbolesLigne      — « Cette ligne te fait peur ? » : la ligne décodée
#   2. ShortSymbolesReciproque — le piège de la flèche : x² = 9 ⇏ x = 3
#   3. ShortSymbolesLettres    — des lettres à l'envers : ∀ et ∃
# ⭐ Les dessins sont ceux de la paysage (méthodes empruntées à SymbolesNotations).
# ⛔ Zone sûre : rien de vital au-dessus de y = +3,0 ni sous y = −2,2.
#
# Voix (débit −7) :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-symboles-short.json -Debit -7
#   (idem -reciproque, -lettres)
# Rendu (un par classe) :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/symboles_notations_shorts.py ShortSymbolesLigne -o eleveai-maths-bases-symboles-short-ligne --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_bases import ShortBases
from gabarit_sixieme import _Voix6e
from symboles_notations import SymbolesNotations, VIOLET

LARG = 4.1   # largeur utile du cadre vertical (4,5)


class _ShortSymboles(_Voix6e, ShortBases):

    # les dessins de la paysage, empruntés tels quels
    m = SymbolesNotations.m
    t = SymbolesNotations.t
    barrer = SymbolesNotations.barrer
    frac = SymbolesNotations.frac
    sigma = SymbolesNotations.sigma
    formule = SymbolesNotations.formule
    retourner = SymbolesNotations.retourner
    grille = SymbolesNotations.grille
    nuage = SymbolesNotations.nuage
    flaque = SymbolesNotations.flaque

    def fit(self, mob, largeur=LARG):
        if mob.width > largeur:
            mob.scale_to_fit_width(largeur)
        return mob

    def ecran(self, voix):
        self.clear()
        self.margo_bas()
        self.dire(voix)

    def fin(self, voix="06-fin"):
        """Le renvoi de la série (coach + abonnement), précédé de la question :
        la voix dit « Ta réponse en commentaire », l'écran l'écrit."""
        self.ecran(voix)
        q = VGroup(self.grand("Ta réponse", font_size=40, color=ORANGE_RETENUE),
                   self.grand("en commentaire", font_size=40, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        q.move_to([0, 2.45, 0])
        self.play(FadeIn(q, shift=DOWN * 0.15))
        self.au_mot("Entraîne-toi")
        e = self.grand("Entraîne-toi sur", font_size=36, color=JAUNE_TITRE).move_to([0, 1.2, 0])
        site = self.grand("eleveai.fr", font_size=52, color=BLEU_CALCUL).move_to([0, 0.35, 0])
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.22, stroke_width=3)
        self.play(FadeIn(e), GrowFromCenter(site), Create(cadre))
        self.au_mot("abonne-toi")
        ab = self.grand("Abonne-toi !", font_size=40, color=VERT_OK).move_to([0, -0.85, 0])
        poignee = self.grand("@eleveai974", font_size=44, color=VERT_OK).move_to([0, -1.65, 0])
        self.play(FadeIn(ab, shift=UP * 0.12), GrowFromCenter(poignee))
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.2)


# ══════════════════════════════════════════════════════════════════════════════
# 1 · « Cette ligne te fait peur ? »
# ══════════════════════════════════════════════════════════════════════════════

class ShortSymbolesLigne(_ShortSymboles):

    nom_voix = "bases-symboles-short"

    def ligne_haut(self):
        f = self.fit(self.formule(40, buff=0.3)).move_to([0, 2.55, 0])
        self.add(f)
        return f

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : la ligne, en grand
        self.ecran("00-accroche")
        f = self.fit(self.formule(40, buff=0.3)).move_to([0, 1.5, 0])
        peur = self.grand("Elle te fait peur ?", font_size=44, color=ORANGE_RETENUE).move_to([0, 0.1, 0])
        self.add(f, peur)
        self.au_mot("En trente secondes")
        self.play(FadeIn(self.grand("En 30 secondes,\ntu vas la lire.", font_size=34).move_to([0, -1.1, 0])))
        self.attendre_voix(marge=0.3)

        # 01 — pour tout
        self.ecran("01-pour-tout")
        f = self.ligne_haut()
        self.au_mot("Ce A à l'envers")
        self.play(Indicate(f[0][0], color=JAUNE_TITRE, scale_factor=1.6))
        self.retourner("A", "∀", [-1.1, 1.0, 0], "tour", font_size=130)
        self.au_mot("pour tout")
        self.play(FadeIn(self.t("pour tout", 34, JAUNE_TITRE).move_to([0.9, 1.0, 0])))
        self.au_mot("Pour tout n appartenant")
        self.play(Write(self.m("∀ n ∈ ℕ", 56, BLEU_CALCUL).move_to([0, -0.35, 0])))
        self.au_mot("pour n'importe quel")
        self.play(FadeIn(self.t("pour n'importe quel\nentier naturel n", 28, BLEU_CALCUL).move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.3)

        # 02 — sigma
        self.ecran("02-somme")
        f = self.ligne_haut()
        self.au_mot("Ce grand E")
        self.play(Indicate(f[1][0], color=VIOLET, scale_factor=1.4))
        sg = self.sigma("n", "k = 1", "k", 64, couleurs=(VIOLET, ORANGE_RETENUE, BLEU_CALCUL)).move_to([-0.9, 0.85, 0])
        self.play(FadeIn(sg[0], scale=1.4))
        self.au_mot("une somme")
        self.play(FadeIn(self.t("sigma =\nune somme", 28, VIOLET).move_to([1.1, 0.95, 0])))
        self.au_mot("De k égale 1")
        self.play(FadeIn(sg[2], shift=UP * 0.2), FadeIn(sg[1], shift=DOWN * 0.2), FadeIn(sg[3]))
        self.au_mot("1 plus 2 plus 3")
        self.play(Write(self.fit(self.m("= 1 + 2 + 3 + … + n", 44)).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — égale n(n + 1)/2
        self.ecran("03-egal")
        f = self.ligne_haut()
        self.au_mot("Égale n fois")
        self.play(Indicate(f[2], color=ORANGE_RETENUE))
        fr = self.frac("n(n + 1)", "2", 64, ORANGE_RETENUE).move_to([0, 1.0, 0])
        self.play(FadeIn(fr, scale=1.2))
        self.play(FadeIn(self.t("n fois (n + 1),\ndivisé par 2", 28, ORANGE_RETENUE).move_to([0, -0.25, 0])))
        self.au_mot("En français")
        p = self.t("la somme des entiers\nde 1 à n vaut\nn fois (n + 1), divisé par 2", 24).move_to([0, -1.45, 0])
        self.play(FadeIn(p), Create(SurroundingRectangle(p, color=BLEU_CALCUL, buff=0.18, corner_radius=0.12)))
        self.attendre_voix(marge=0.3)

        # 04 — la vérification avec n = 4
        self.ecran("04-verif")
        self.ligne_haut()
        self.au_mot("Avec n égale 4")
        self.play(FadeIn(self.m("n = 4", 48, JAUNE_TITRE).move_to([0, 1.75, 0])))
        v1 = self.fit(self.m("1 + 2 + 3 + 4 = 10", 44)).move_to([0, 1.0, 0])
        self.play(Write(v1))
        self.au_mot("Et 4 fois 5")
        g = self.grille(4, 5, 0.38, BLEU_CALCUL, pleines=lambda i, j: j <= i).move_to([0, -0.15, 0])
        self.play(FadeIn(g))
        v2 = self.m("(4 × 5) / 2 = 10", 44, VERT_OK).move_to([0, -1.35, 0])
        self.play(Write(v2))
        self.au_mot("dix aussi")
        self.play(Create(self.coche().next_to(v2, DOWN, buff=0.2)))
        self.attendre_voix(marge=0.3)

        # 05 — le défi
        self.ecran("05-defi")
        self.ligne_haut()
        self.play(Write(self.t("À toi !", 44, ORANGE_RETENUE).move_to([0, 1.5, 0])))
        d = self.fit(self.m("1 + 2 + 3 + … + 10 = ?", 46, JAUNE_TITRE)).move_to([0, 0.4, 0])
        self.play(FadeIn(d, scale=1.2))
        self.au_mot("Utilise la formule")
        self.play(FadeIn(self.t("Utilise la formule.", 30, BLEU_CALCUL).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=1.0)

        self.fin()


# ══════════════════════════════════════════════════════════════════════════════
# 2 · Le piège de la flèche
# ══════════════════════════════════════════════════════════════════════════════

class ShortSymbolesReciproque(_ShortSymboles):

    nom_voix = "bases-symboles-short-reciproque"

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : la flèche, et sa question
        self.ecran("00-accroche")
        e1 = self.fit(self.m("x = 3  ⇒  x² = 9", 52, VERT_OK)).move_to([0, 1.8, 0])
        self.add(e1)
        self.au_mot("Et dans l'autre sens")
        e2 = self.fit(self.m("x² = 9  ⇒  x = 3 ?", 52)).move_to([0, 0.55, 0])
        self.play(FadeIn(e2, shift=UP * 0.2))
        self.au_mot("Attention, piège")
        self.play(GrowFromCenter(self.grand("Attention, piège !", font_size=42, color=ORANGE_RETENUE).move_to([0, -0.8, 0])))
        self.attendre_voix(marge=0.3)

        # 01 — implique
        self.ecran("01-implique")
        self.au_mot("Cette flèche se lit")
        self.play(FadeIn(self.m("⇒", 140, VERT_OK).move_to([0, 2.0, 0]), scale=1.3))
        self.play(FadeIn(self.t("se lit « implique »", 32, VERT_OK).move_to([0, 0.9, 0])))
        self.au_mot("x égale 3 implique")
        e = self.fit(self.m("x = 3  ⇒  x² = 9", 52, VERT_OK)).move_to([0, -0.3, 0])
        self.play(Write(e))
        self.au_mot("C'est vrai")
        self.play(Create(self.coche(taille=0.3).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.3)

        # 02 — retournée, elle ment
        self.ecran("02-retour")
        self.au_mot("Mais retournée")
        e = self.fit(self.m("x² = 9  ⇏  x = 3", 52, ROUGE_ERREUR)).move_to([0, 2.3, 0])
        self.play(Write(e))
        neuf = self.m("9", 60).move_to([0, 1.05, 0])
        p3 = self.m("3", 52, BLEU_CALCUL).move_to([1.1, -0.65, 0])
        pm3 = self.m("−3", 52, ORANGE_RETENUE).move_to([-1.1, -0.65, 0])
        f1 = Arrow(p3.get_top(), neuf.get_bottom(), buff=0.12, color=BLEU_CALCUL, stroke_width=6)
        self.play(FadeIn(neuf), FadeIn(p3), GrowArrow(f1))
        self.au_mot("Car moins 3")
        f2 = Arrow(pm3.get_top(), neuf.get_bottom(), buff=0.12, color=ORANGE_RETENUE, stroke_width=6)
        self.play(FadeIn(pm3, scale=1.4), GrowArrow(f2))
        self.play(Write(self.m("(−3)² = 9 aussi", 40, ORANGE_RETENUE).move_to([0, -1.65, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — la pluie
        self.ecran("03-pluie")
        self.au_mot("S'il pleut")
        n = self.nuage([0, 0, 0]).scale(0.75).move_to([-1.35, 2.0, 0])
        fl = self.m("⇒", 70, VERT_OK).move_to([0.05, 1.85, 0])
        fq = self.flaque([0, 0, 0]).scale(0.65).move_to([1.4, 1.55, 0])
        self.play(FadeIn(n, shift=DOWN * 0.2))
        self.play(FadeIn(fl, scale=1.3), FadeIn(fq))
        l1 = self.t("il pleut ⇒\nle sol est mouillé", 30, VERT_OK).move_to([0, 0.25, 0])
        self.play(FadeIn(l1))
        self.au_mot("Mais si le sol")
        l2 = self.t("le sol est mouillé ⇏\nil a plu", 30, ROUGE_ERREUR).move_to([0, -1.2, 0])
        self.play(FadeIn(l2))
        self.play(Create(self.barrer(l2)))
        self.attendre_voix(marge=0.3)

        # 04 — la double flèche
        self.ecran("04-double")
        self.au_mot("la double flèche")
        self.play(FadeIn(self.m("⇔", 140, BLEU_CALCUL).move_to([0, 2.0, 0]), scale=1.3))
        self.play(FadeIn(self.t("se lit « équivaut à »\ndans les deux sens", 30, BLEU_CALCUL).move_to([0, 0.7, 0])))
        self.au_mot("x plus 2 égale 5")
        self.play(Write(self.fit(self.m("x + 2 = 5  ⇔  x = 3", 50, BLEU_CALCUL)).move_to([0, -0.7, 0])))
        self.attendre_voix(marge=0.3)

        # 05 — le défi
        self.ecran("05-defi")
        self.play(Write(self.t("À toi !", 44, ORANGE_RETENUE).move_to([0, 2.4, 0])))
        a = self.fit(self.m("x = 2  ⇒  x² = 4", 52, VERT_OK)).move_to([0, 1.3, 0])
        self.play(Write(a))
        self.play(Create(self.coche().next_to(a, DOWN, buff=0.15)))
        self.au_mot("Et dans l'autre sens")
        b = self.fit(self.m("x² = 4  ⇒  x = 2 ?", 52)).move_to([0, 0.0, 0])
        self.play(FadeIn(b, shift=UP * 0.2))
        self.au_mot("vrai ou faux")
        self.play(GrowFromCenter(self.grand("Vrai ou faux ?", font_size=44, color=JAUNE_TITRE).move_to([0, -1.2, 0])))
        self.attendre_voix(marge=1.0)

        self.fin()


# ══════════════════════════════════════════════════════════════════════════════
# 3 · Des lettres à l'envers
# ══════════════════════════════════════════════════════════════════════════════

class ShortSymbolesLettres(_ShortSymboles):

    nom_voix = "bases-symboles-short-lettres"

    def construct(self):
        # 00 — ⭐ l'image de la première seconde : ∀ et ∃, en très grand
        self.ecran("00-accroche")
        g = VGroup(self.m("∀", 170, JAUNE_TITRE), self.m("∃", 170, JAUNE_TITRE)).arrange(RIGHT, buff=0.7)
        g.move_to([0, 1.1, 0])
        q = VGroup(self.grand("Des lettres", font_size=46, color=ORANGE_RETENUE),
                   self.grand("à l'envers ?", font_size=46, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        q.move_to([0, -0.8, 0])
        self.add(g, q)
        self.attendre_voix(marge=0.3)

        # 01 — pour tout
        self.ecran("01-pour-tout")
        self.au_mot("Ce A à l'envers")
        self.retourner("A", "∀", [0, 1.6, 0], "tour", font_size=170)
        self.au_mot("All")
        self.play(FadeIn(self.t("A comme « All »\n= « tous »", 32, BLEU_CALCUL).move_to([0, 0.0, 0])))
        self.au_mot("Il se lit : pour tout")
        self.play(GrowFromCenter(self.grand("pour tout", font_size=48, color=JAUNE_TITRE).move_to([0, -1.3, 0])))
        self.attendre_voix(marge=0.3)

        # 02 — il existe
        self.ecran("02-il-existe")
        self.au_mot("Ce E à l'envers")
        self.retourner("E", "∃", [0, 1.6, 0], "miroir", font_size=170)
        self.au_mot("Exists")
        self.play(FadeIn(self.t("E comme « Exists »", 32, BLEU_CALCUL).move_to([0, 0.15, 0])))
        self.au_mot("Il se lit : il existe")
        self.play(GrowFromCenter(self.grand("il existe", font_size=48, color=JAUNE_TITRE).move_to([0, -0.8, 0])))
        self.au_mot("Au moins un")
        self.play(FadeIn(self.grand("au moins un", font_size=36, color=ORANGE_RETENUE).move_to([0, -1.65, 0])))
        self.attendre_voix(marge=0.3)

        # 03 — deux exemples
        self.ecran("03-exemples")
        self.au_mot("Pour tout x appartenant")
        e1 = self.fit(self.m("∀ x ∈ ℝ,  x² ≥ 0", 50, VERT_OK)).move_to([0, 2.45, 0])
        self.play(Write(e1))
        ax = Axes(x_range=[-1.6, 1.6, 1], y_range=[-0.3, 2.4, 1], x_length=2.6, y_length=1.5,
                  tips=False, axis_config={"include_numbers": False, "stroke_width": 2}).move_to([0, 1.15, 0])
        self.play(Create(ax), Create(ax.plot(lambda x: x * x, x_range=[-1.5, 1.5], color=VERT_OK, stroke_width=5)))
        self.au_mot("Et il existe n")
        e2 = self.fit(self.m("∃ n ∈ ℕ,  n² = 49", 50, BLEU_CALCUL)).move_to([0, -0.2, 0])
        self.play(Write(e2))
        self.au_mot("Lequel ? 7")
        g = self.grille(7, 7, 0.17, BLEU_CALCUL).move_to([-0.9, -1.35, 0])
        self.play(LaggedStart(*[FadeIn(c) for c in g], lag_ratio=0.02), run_time=0.9)
        self.play(FadeIn(self.m("n = 7", 48, BLEU_CALCUL).move_to([1.0, -1.35, 0])))
        self.attendre_voix(marge=0.3)

        # 04 — le contre-exemple
        self.ecran("04-contre")
        self.au_mot("un seul contre-exemple")
        self.play(FadeIn(VGroup(self.grand("Un seul contre-exemple", font_size=30, color=ORANGE_RETENUE),
                                self.grand("suffit", font_size=30, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.1)
                         .move_to([0, 2.4, 0])))
        self.au_mot("Pour tout x, x au carré est plus grand")
        a = self.fit(self.m("∀ x,  x² > x  ?", 54)).move_to([0, 1.2, 0])
        self.play(Write(a))
        self.au_mot("Faux : 0,5")
        self.play(FadeIn(self.m("x = 0,5", 48, ROUGE_ERREUR).move_to([0, 0.1, 0])))
        self.play(FadeIn(self.fit(self.m("x² = 0,25 < 0,5", 48, ROUGE_ERREUR)).move_to([0, -0.8, 0])))
        self.play(Create(self.barrer(a)))
        self.play(GrowFromCenter(self.grand("FAUX", font_size=64, color=ROUGE_ERREUR).move_to([0, -1.75, 0])))
        self.attendre_voix(marge=0.3)

        # 05 — le défi
        self.ecran("05-defi")
        self.play(Write(self.t("À toi !", 44, ORANGE_RETENUE).move_to([0, 2.3, 0])))
        self.play(Write(self.fit(self.m("∀ x,  x + 1 > x", 56, JAUNE_TITRE)).move_to([0, 1.0, 0])))
        self.au_mot("Vrai ou faux")
        self.play(GrowFromCenter(self.grand("Vrai ou faux ?", font_size=44, color=WHITE).move_to([0, -0.4, 0])))
        self.attendre_voix(marge=1.0)

        self.fin()
