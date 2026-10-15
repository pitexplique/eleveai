# arithmetique_entiers.py
# EleveAI — Maths seconde — Multiples, diviseurs et nombres premiers
# (notionId : arithmetique_entiers)
#
# ⭐ 21/09/2026 : la leçon paysage qui manquait, faite « pour faire le lien »
# (Frédéric). Fiche de cours et feuille d'exercices en ligne depuis le 21/09
# (`lib/fiches/maths-seconde-arithmetique.tsx`). Mêmes exemples que la FICHE :
# les diviseurs de 30 par paires, 56 = 8 × 7, 15 + 40 = 5 × 11, 119 = 7 × 17,
# 72 = 2³ × 3², 72/150 = 12/25 ; le défi est son exercice des billes et calots.
#
# ⭐ LE FIL DE LA FICHE : TOUT SE DIT PAR UNE ÉGALITÉ. Et la démonstration du
# BO (« la somme de deux multiples de a est un multiple de a ») se fait avec
# des lettres, à l'écran 3.
# ⭐ Les sigles PGCD et PPCM ne sont pas prononcés : « le plus grand diviseur
# commun ». Écrire — et dire — simplement.
#
# Briques communes : `manim/gabarit_seconde.py`.
#
# Mapping micro-compétences (4 micros, TOUS couverts) → écrans :
# - arith_multiple_diviseur     → écrans 1, 2, 3
# - arith_nombre_premier        → écrans 4, 5
# - arith_fraction_irreductible → écran 6
# - arith_probleme              → défi (les sachets)
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/arithmetique_entiers.py Arithmetique2de -o eleveai-maths-seconde-arithmetique --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde

VOIX = SONS / "seconde-arithmetique"


class Arithmetique2de(NotionSeconde):

    dossier_voix = VOIX

    def colonne(self, textes, y=0.5, font_size=36, couleurs=None, buff=0.32, x=0.0):
        couleurs = couleurs or [WHITE] * len(textes)
        g = VGroup(*[Text(t, font_size=font_size, color=c) for t, c in zip(textes, couleurs)])
        return g.arrange(DOWN, buff=buff).move_to([x, y, 0])

    # ── écran 1 : les diviseurs par paires ──────────────────────────────────

    def ecran_diviseurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-diviseurs")
        self.titre_ecran("Les diviseurs vont par paires")

        paires = self.colonne(["1 × 30", "2 × 15", "3 × 10", "5 × 6"], y=0.55, font_size=40,
                              couleurs=[BLEU_CALCUL] * 4, x=-2.8)
        for p in paires:
            self.play(FadeIn(p, shift=RIGHT * 0.15), run_time=0.45)
        stop = Text("on s'arrête : 5 et 6 se rejoignent", font_size=26, color=ORANGE_RETENUE)
        stop.next_to(paires[3], RIGHT, buff=0.6)
        self.play(FadeIn(stop))
        liste = Text("1, 2, 3, 5, 6, 10, 15, 30", font_size=36, color=VERT_OK).move_to([0, -1.55, 0])
        self.play(Write(liste))
        self.play(Write(self.chute("30 a 8 diviseurs.")))
        self.attendre_voix()

    # ── écran 2 : tout se dit par une égalité ───────────────────────────────

    def ecran_egalite(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-egalite")
        self.titre_ecran("Tout se dit par une égalité")

        l1 = Text("56 = 8 × 7", font_size=56, color=VERT_OK).move_to([0, 1.7, 0])
        self.play(FadeIn(l1, shift=DOWN * 0.15))
        sens = self.colonne(["8 divise 56", "7 divise 56", "56 est un multiple de 8 et de 7"],
                            y=0.25, font_size=30, couleurs=[WHITE, WHITE, BLEU_CALCUL], buff=0.25)
        for s in sens:
            self.play(FadeIn(s, shift=UP * 0.1), run_time=0.45)
        non = Text("56 = 6 × 9 + 2 : reste 2, donc 6 ne divise pas 56", font_size=28,
                   color=ORANGE_RETENUE).move_to([0, -1.45, 0])
        self.play(Write(non))
        self.attendre_voix()

    # ── écran 3 : pair, impair, et la démonstration du BO ───────────────────

    def ecran_demontrer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-demontrer")
        self.titre_ecran("Démontrer avec une lettre")

        formes = VGroup(
            Text("pair : 2k", font_size=36, color=BLEU_CALCUL),
            Text("impair : 2k + 1", font_size=36, color=BLEU_CALCUL),
        ).arrange(RIGHT, buff=1.4).move_to([0, 2.0, 0])
        self.play(FadeIn(formes))
        q = Text("La somme de deux multiples de 5 est-elle un multiple de 5 ?", font_size=28,
                 color=JAUNE_TITRE).move_to([0, 1.05, 0])
        self.play(Write(q))
        ex = Text("15 + 40 = 55 = 5 × 11", font_size=34, color=WHITE).move_to([0, 0.2, 0])
        self.play(FadeIn(ex))
        preuve = Text("5k + 5m = 5(k + m)", font_size=46, color=VERT_OK).move_to([0, -0.85, 0])
        self.play(FadeIn(preuve, shift=UP * 0.12))
        self.play(Circumscribe(preuve, color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("L'exemple montre ; la lettre DÉMONTRE.")))
        self.attendre_voix()

    # ── écran 4 : les nombres premiers ──────────────────────────────────────

    def ecran_premiers(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-premiers")
        self.titre_ecran("Un nombre premier : deux diviseurs")

        lignes = VGroup(
            VGroup(Text("13", font_size=40, color=WHITE), Text("1 et 13", font_size=32, color=WHITE),
                   Text("premier", font_size=32, color=VERT_OK)),
            VGroup(Text("15", font_size=40, color=WHITE), Text("1, 3, 5, 15", font_size=32, color=WHITE),
                   Text("non", font_size=32, color=ROUGE_ERREUR)),
            VGroup(Text("1", font_size=40, color=WHITE), Text("1", font_size=32, color=WHITE),
                   Text("non : un seul diviseur", font_size=32, color=ROUGE_ERREUR)),
        )
        for i, l in enumerate(lignes):
            l[0].move_to([-4.0, 1.5 - 1.0 * i, 0])
            l[1].move_to([-1.2, 1.5 - 1.0 * i, 0])
            l[2].next_to(l[1], RIGHT, buff=1.0).set_y(1.5 - 1.0 * i)
            self.play(FadeIn(l), run_time=0.5)
        self.play(Write(self.chute("Le seul nombre premier pair : 2.")))
        self.attendre_voix()

    # ── écran 5 : tester, puis décomposer ───────────────────────────────────

    def ecran_tester(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-tester")
        self.titre_ecran("119 : premier, ou pas ?")

        essais = self.colonne(["÷ 2 : non", "÷ 3 : non", "÷ 5 : non", "÷ 7 : oui !"], y=0.7, font_size=34,
                              couleurs=[WHITE, WHITE, WHITE, VERT_OK], x=-3.4)
        for e in essais:
            self.play(FadeIn(e, shift=RIGHT * 0.12), run_time=0.4)
        res = Text("119 = 7 × 17", font_size=50, color=VERT_OK).move_to([2.6, 0.9, 0])
        self.play(FadeIn(res, shift=LEFT * 0.15))
        concl = Text("il n'est PAS premier", font_size=32, color=ROUGE_ERREUR).move_to([2.6, 0.0, 0])
        self.play(Write(concl))
        regle = Text("On essaie 2, 3, 5, 7… jusqu'à la racine du nombre (ici ≈ 10,9).",
                     font_size=26, color=BLEU_CALCUL).move_to([0, -1.65, 0])
        self.play(FadeIn(regle))
        self.attendre_voix()

    def ecran_decomposer(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-decomposer")
        self.titre_ecran("Décomposer en facteurs premiers")

        # L'échelle des divisions : le nombre à gauche, le premier à droite.
        pas = [("72", "2"), ("36", "2"), ("18", "2"), ("9", "3"), ("3", "3"), ("1", "")]
        echelle = VGroup()
        for i, (n, p) in enumerate(pas):
            y = 2.1 - 0.62 * i
            echelle.add(VGroup(Text(n, font_size=34, color=WHITE).move_to([-3.6, y, 0]),
                               Text(p, font_size=34, color=BLEU_CALCUL).move_to([-2.4, y, 0])))
        barre = Line([-3.0, 2.4, 0], [-3.0, 2.1 - 0.62 * 5 - 0.25, 0], color=WHITE, stroke_width=3)
        self.play(Create(barre))
        for e in echelle:
            self.play(FadeIn(e), run_time=0.35)
        res = Text("72 = 2³ × 3²", font_size=52, color=VERT_OK).move_to([2.6, 0.9, 0])
        self.play(FadeIn(res, shift=LEFT * 0.15))
        self.play(Circumscribe(res, color=VERT_OK, buff=0.15))
        piege = Text("72 = 8 × 9 n'est pas fini :\n8 et 9 ne sont pas premiers", font_size=26,
                     color=ORANGE_RETENUE).move_to([2.6, -0.5, 0])
        self.play(FadeIn(piege))
        self.attendre_voix()

    # ── écran 6 : la fraction irréductible ──────────────────────────────────

    def ecran_fraction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-fraction")
        self.titre_ecran("Rendre une fraction irréductible")

        d = self.colonne(["72 = 2³ × 3²", "150 = 2 × 3 × 5²"], y=1.5, font_size=38,
                         couleurs=[WHITE, WHITE], buff=0.35)
        self.play(FadeIn(d, shift=UP * 0.12))
        commun = Text("en commun : 2 × 3 = 6", font_size=34, color=BLEU_CALCUL).move_to([0, 0.15, 0])
        self.play(Write(commun))
        res = Text("72/150 = 12/25", font_size=50, color=VERT_OK).move_to([0, -0.95, 0])
        self.play(FadeIn(res, shift=UP * 0.12))
        self.play(Circumscribe(res, color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("On divise par TOUT ce qui est commun, en une fois.")))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))
        enonce = self.colonne(["24 billes et 36 calots.", "Des sachets identiques, le plus possible,",
                               "sans rien laisser."], y=1.1, font_size=32, couleurs=[JAUNE_TITRE, WHITE, WHITE],
                              buff=0.28)
        self.play(FadeIn(enonce, shift=DOWN * 0.15))
        self.play(FadeIn(Text("Combien de sachets ? Que contient chacun ?", font_size=30,
                              color=BLEU_CALCUL).move_to([0, -0.6, 0]), shift=UP * 0.15))
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-correction")
        self.titre_ecran("Correction")
        lignes = self.colonne(["24 = 2³ × 3", "36 = 2² × 3²", "en commun : 2² × 3 = 12"], y=1.3,
                              font_size=36, couleurs=[WHITE, WHITE, BLEU_CALCUL], buff=0.32)
        for l in lignes:
            self.play(FadeIn(l, shift=UP * 0.12), run_time=0.5)
        rep = Text("12 sachets : 2 billes et 3 calots", font_size=42, color=VERT_OK).move_to([0, -0.8, 0])
        self.play(FadeIn(rep, shift=UP * 0.12))
        self.play(Circumscribe(rep, color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("On PARTAGE : c'est un diviseur commun qu'on cherche.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Multiples, diviseurs, nombres premiers",
            accroche="119 : premier, ou pas ?",
            promesse="Diviser · démontrer · décomposer",
        )
        self.page_objectifs([
            "justifier qu'un nombre en divise un autre, par une égalité",
            "reconnaître un nombre premier, et décomposer un entier",
            "rendre une fraction irréductible, et partager sans reste",
        ])
        self.ecran_diviseurs()
        self.ecran_egalite()
        self.ecran_demontrer()
        self.ecran_premiers()
        self.ecran_tester()
        self.ecran_decomposer()
        self.ecran_fraction()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "« 8 divise 56 » s'écrit 56 = 8 × 7",
                "un nombre premier a deux diviseurs ; on décompose jusqu'au bout",
                "on divise par tout ce qui est commun, et on partage sans reste",
            ],
            rappel="119 a l'air premier, et 119 = 7 × 17 : on teste jusqu'à la racine.",
        )
        self.page_abonnement()
