# reels_short_0999.py
# EleveAI — Maths seconde — le short « 0,999… = 1 »
# (notionId : reels_intervalles — micros `reels_ensembles`, `reels_droite_graduee`)
#
# ⭐ 21/09/2026 — Frédéric : « pourquoi ne ferait-on pas une vidéo lycée sur une
# contradiction ? ». C'est l'APPÂT de la notion « Nombres réels, intervalles et
# valeur absolue », celle qui ouvre l'année de seconde : le relevé du 11/09 range les
# shorts dans l'ordre de la tension de leur première ligne (paradoxe 852 vues,
# énoncé de tâche 9). Celui-ci ouvre sur une égalité que l'élève croit fausse et
# qu'il peut vérifier seul : 1 ÷ 3 × 3 sur sa calculatrice.
#
# ⛔ FICHIER À PART, exprès : la leçon et son short « distance » vivent dans
# `reels_intervalles.py`, qu'une autre session écrivait le même jour. Rien n'est
# importé de là-bas — la droite est refaite ici en quatre lignes.
# ⛔ AUCUNE étiquette de classe à l'écran : l'égalité parle du CM2 à l'adulte.
# ⛔ Pas de LaTeX sur ce poste : la fraction est DESSINÉE (`fraction()`), et la
# droite n'a PAS `include_numbers` (ses graduations passeraient par LaTeX et
# écriraient « 0.5 » avec un point).
#
# La preuve s'appuie sur une démonstration du programme — « 1/3 n'est pas
# décimal » — qui est déjà un exercice de la feuille
# `lib/fiches-exercices/maths-seconde-reels.tsx`.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/seconde-reels-short-0999.json -Debit -4
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/seconde/reels_short_0999.py Reels2deShort0999 -o eleveai-maths-seconde-reels-intervalles-short-0999 --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, ShortSeconde

VOIX_0999 = SONS / "seconde-reels-short-0999"


class Reels2deShort0999(ShortSeconde):
    """LE PARADOXE — deux écritures décimales, un seul réel."""

    dossier_voix = VOIX_0999

    # ── les briques ─────────────────────────────────────────────────────────

    def borner(self, mobject, marge=0.5):
        """VU AU RENDU (21/09) : le cadre vertical fait 4,5 unités. `grand()` ne
        borne qu'un Text ; une égalité composée (fraction + « = » + texte)
        sortait des deux côtés sans un mot d'erreur."""
        largeur_max = config.frame_width - marge
        if mobject.width > largeur_max:
            mobject.scale_to_fit_width(largeur_max)
        return mobject

    def fraction(self, haut, bas, font_size=56, color=WHITE):
        """Une fraction DESSINÉE : numérateur, trait, dénominateur."""
        n = Text(haut, font_size=font_size, color=color)
        d = Text(bas, font_size=font_size, color=color)
        trait = Line(LEFT, RIGHT, color=color, stroke_width=5)
        trait.set_width(max(n.width, d.width) + 0.22)
        return VGroup(n, trait, d).arrange(DOWN, buff=0.12)

    def egalite(self, gauche, droite, font_size=56, color=WHITE):
        """`gauche` (un mobject) = `droite` (un texte), le « = » à mi-hauteur."""
        egal = Text("=", font_size=font_size, color=color)
        d = Text(droite, font_size=font_size, color=color)
        return VGroup(gauche, egal, d).arrange(RIGHT, buff=0.28)

    def droite_01(self, y, longueur=3.7):
        """La droite de 0 à 1, deux étiquettes posées à la main."""
        axe = NumberLine(x_range=[0, 1, 0.1], length=longueur, include_numbers=False,
                         color=WHITE, tick_size=0.07).move_to([0, y, 0])
        zero = Text("0", font_size=26, color=WHITE).next_to(axe.n2p(0), DOWN, buff=0.22)
        un = Text("1", font_size=26, color=WHITE).next_to(axe.n2p(1), DOWN, buff=0.22)
        return axe, VGroup(zero, un)

    # ── les écrans ──────────────────────────────────────────────────────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        l1 = self.grand("0,999…", font_size=96, color=WHITE).move_to([0, 2.2, 0])
        l2 = self.grand("= 1", font_size=110, color=JAUNE_TITRE).move_to([0, 0.75, 0])
        # ⭐ l'image de la 1re seconde porte déjà la contradiction entière
        self.add(l1, l2)
        self.play(Flash(l2, color=JAUNE_TITRE, line_length=0.4))
        l3 = VGroup(
            Text("et ce n'est pas", font_size=38, color=ORANGE_RETENUE),
            Text("un arrondi", font_size=46, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.16).move_to([0, -1.0, 0])
        self.play(FadeIn(l3, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def ecran_tiers(self):
        self.clear()
        self.margo_bas()
        self.dire("01-tiers")
        self.play(Write(Text("Tu le sais déjà", font_size=36, color=JAUNE_TITRE).move_to([0, 2.9, 0])))
        eg = self.borner(self.egalite(self.fraction("1", "3"), "0,333…"), marge=0.9).move_to([0, 1.1, 0])
        self.play(FadeIn(eg, shift=UP * 0.15))
        # ⚠️ Trois lignes courtes : sur deux, `borner()` réduisait tout à 20 pt,
        # illisible sur un téléphone.
        note = VGroup(
            Text("des 3 à l'infini :", font_size=32, color=ORANGE_RETENUE),
            Text("1 ÷ 3 ne tombe", font_size=32, color=ORANGE_RETENUE),
            Text("jamais juste", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.16)
        self.borner(note, marge=0.7).move_to([0, -0.9, 0])
        self.play(FadeIn(note))
        self.attendre_voix(marge=0.4)

    def ecran_fois3(self):
        self.clear()
        self.margo_bas()
        self.dire("02-fois3")
        self.play(Write(Text("× 3 des deux côtés", font_size=32, color=JAUNE_TITRE).move_to([0, 2.9, 0])))

        haut = self.borner(self.egalite(self.fraction("1", "3"), "0,333…"), marge=1.3).move_to([0, 1.55, 0])
        self.play(FadeIn(haut))

        bas = self.borner(self.egalite(self.fraction("3", "3"), "0,999…"), marge=1.3).move_to([0, -0.75, 0])
        # Les deux flèches « × 3 », une par côté de l'égalité.
        fleches = VGroup()
        # VU AU RENDU : calées sur chaque membre, elles n'avaient pas la même
        # longueur (la fraction est plus haute que le décimal). Mêmes y pour les deux.
        y_depart, y_arrivee = haut.get_bottom()[1] - 0.1, bas.get_top()[1] + 0.1
        for cote_bas in (bas[0], bas[2]):
            x = cote_bas.get_center()[0]
            f = Arrow([x, y_depart, 0], [x, y_arrivee, 0],
                      color=BLEU_CALCUL, stroke_width=5, buff=0, max_tip_length_to_length_ratio=0.3)
            t = Text("× 3", font_size=26, color=BLEU_CALCUL).next_to(f, RIGHT, buff=0.12)
            fleches.add(VGroup(f, t))
        self.play(*[GrowArrow(g[0]) for g in fleches], *[FadeIn(g[1]) for g in fleches])
        self.play(FadeIn(bas, shift=DOWN * 0.1))

        # Trois tiers, c'est 1 : la fraction cède sa place.
        # ⚠️ `bas` a été borné, donc réduit : le « 1 » prend la hauteur des chiffres
        # d'à côté, sinon il est plus gros que l'égalité qu'il complète.
        un = Text("1", font_size=64, color=VERT_OK)
        un.scale_to_fit_height(bas[2].height * 0.92).move_to(bas[0].get_center())
        self.play(FadeOut(bas[0], scale=0.6), FadeIn(un, scale=1.4))
        self.play(bas[2].animate.set_color(VERT_OK), bas[1].animate.set_color(VERT_OK))
        self.play(Circumscribe(VGroup(un, bas[1], bas[2]), color=VERT_OK, buff=0.2))
        self.attendre_voix(marge=0.4)

    def ecran_droite(self):
        self.clear()
        self.margo_bas()
        self.dire("03-droite")
        self.play(Write(Text("Pas convaincu ?", font_size=38, color=JAUNE_TITRE).move_to([0, 2.9, 0])))

        regle = VGroup(
            Text("Entre deux nombres", font_size=30, color=WHITE),
            Text("différents, il y en a", font_size=30, color=WHITE),
            Text("toujours un autre", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.12)
        self.borner(regle, marge=0.6).move_to([0, 1.72, 0])
        self.play(FadeIn(regle))

        axe, bornes = self.droite_01(y=0.2)
        self.play(Create(axe), FadeIn(bornes))
        a = Dot(axe.n2p(0.3), radius=0.09, color=BLEU_CALCUL)
        b = Dot(axe.n2p(0.7), radius=0.09, color=BLEU_CALCUL)
        self.play(FadeIn(a, scale=1.5), FadeIn(b, scale=1.5))
        m = Dot(axe.n2p(0.5), radius=0.1, color=ORANGE_RETENUE)
        tm = Text("leur moyenne", font_size=24, color=ORANGE_RETENUE).next_to(m, UP, buff=0.2)
        self.play(FadeIn(m, scale=1.8), FadeIn(tm))
        self.wait(0.6)

        # Les 0,9 · 0,99 · 0,999 viennent se poser SUR le 1 : plus rien entre eux.
        self.play(FadeOut(a), FadeOut(b), FadeOut(m), FadeOut(tm))
        question = self.grand("Entre 0,999… et 1 ?", font_size=34, color=WHITE).move_to([0, -1.0, 0])
        self.play(FadeIn(question))
        p = Dot(axe.n2p(0.9), radius=0.1, color=ROUGE_ERREUR)
        self.play(FadeIn(p, scale=1.5))
        for v in (0.99, 0.999, 1.0):
            self.play(p.animate.move_to(axe.n2p(v)), run_time=0.45)
        aucun = self.grand("Aucun.", font_size=56, color=ROUGE_ERREUR).move_to([0, -1.8, 0])
        self.play(FadeIn(aucun, scale=1.2))
        meme = Text("le même point", font_size=26, color=VERT_OK)
        # son bord DROIT à l'aplomb du 1 : centré dessus, il sortait du cadre.
        meme.move_to(axe.n2p(1) + UP * 0.42, aligned_edge=RIGHT).shift(RIGHT * 0.12)
        self.play(p.animate.set_color(VERT_OK), FadeIn(meme))
        self.attendre_voix(marge=0.4)

    def ecran_ecritures(self):
        self.clear()
        self.margo_bas()
        self.dire("04-ecritures")
        titre = VGroup(
            Text("Deux écritures,", font_size=34, color=JAUNE_TITRE),
            Text("un seul nombre", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.14).move_to([0, 2.75, 0])
        self.play(Write(titre))

        demi = self.egalite(self.fraction("1", "2", font_size=44), "0,5", font_size=44).move_to([0, 1.35, 0])
        un = self.grand("1 = 0,999…", font_size=48, color=VERT_OK).move_to([0, 0.25, 0])
        self.play(FadeIn(demi))
        self.play(FadeIn(un))
        self.wait(1.2)

        defi = VGroup(
            Text("À toi", font_size=32, color=ORANGE_RETENUE),
            self.grand("0,4999… = ?", font_size=64, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.3, 0])
        self.play(FadeIn(defi[0]))
        self.play(FadeIn(defi[1], scale=1.15))
        self.play(Flash(defi[1], color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.5)

    def construct(self):
        self.ecran_accroche()
        self.ecran_tiers()
        self.ecran_fois3()
        self.ecran_droite()
        self.ecran_ecritures()
        self.ecran_renvoi()
