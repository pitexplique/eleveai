# puissances_2de.py
# EleveAI — Maths seconde — Les puissances (notionId : puissances_2de)
#
# ⭐ TROISIÈME NOTION DE SECONDE. Choisie, comme la précédente, sur le CALENDRIER
# de classe (Frédéric, 09/09/2026) : c'est ce que les secondes travaillent
# maintenant, alors que les fonctions de référence attendront février.
#
# Briques communes : `manim/gabarit_seconde.py` (garde, objectifs, finale,
# abonnement, radical, puissance, chute, axes) — et les pièges déjà payés,
# notamment l'absence totale de LaTeX sur ce poste.
#
# Mêmes exemples que la fiche `lib/fiches/maths-seconde-puissances.tsx`.
#
# Mapping micro-compétences (notion puissances_2de — 6 micros, TOUTES
# couvertes) → écrans :
# - puiss_calcul               → écran 1 (une puissance COMPTE des facteurs)
# - puiss_produit_quotient     → écrans 1 et 2 (on additionne / on soustrait)
# - puiss_puissance_puissance  → écran 3 (la parenthèse MULTIPLIE)
# - puiss_exposant_negatif     → écran 4 (un inverse, pas un nombre négatif)
# - puiss_expression_composee  → écran 5 (la méthode par étages) + défi
# - puiss_notation_scientifique → écran 6
#
# ⭐ Le défi est la question 2.2 du contrôle commun de mars 2025, celle qui a
# fait créer le micro `puiss_expression_composee` : la banque enseignait les
# trois règles SÉPARÉMENT et aucun énoncé ne les enchaînait, si bien que l'élève
# savait chaque règle et bloquait sur l'exercice.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/puissances_2de.py Puissances2de -o eleveai-maths-seconde-puissances --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-puissances"
VOIX_SHORT = SONS / "seconde-puissances-short"


class Puissances2de(NotionSeconde):

    dossier_voix = VOIX

    def regle_encadree(self, gauche, droite, couleur, position, sous=None):
        """Une règle « ceci = cela », encadrée — la forme qui revient 4 fois."""
        eg = Text("=", font_size=40, color=WHITE)
        ligne = VGroup(gauche, eg, droite).arrange(RIGHT, buff=0.28)
        cadre = SurroundingRectangle(ligne, color=couleur, buff=0.3, stroke_width=2.5)
        bloc = VGroup(ligne, cadre)
        if sous:
            legende = Text(sous, font_size=26, color=couleur)
            legende.next_to(cadre, DOWN, buff=0.22)
            bloc = VGroup(bloc, legende)
        return bloc.move_to(position)

    # ── écran 1 : puiss_calcul + le produit ─────────────────────────────────

    def ecran_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-produit")
        self.titre_ecran("Le produit : on ADDITIONNE")

        regle = self.regle_encadree(
            VGroup(self.puissance("a", "m", font_size=40),
                   Text("×", font_size=40, color=WHITE),
                   self.puissance("a", "n", font_size=40)).arrange(RIGHT, buff=0.2),
            self.puissance("a", "m + n", font_size=40, color_exp=JAUNE_TITRE),
            BLEU_CALCUL, [0, 2.05, 0],
        )
        self.play(FadeIn(regle))
        self.wait(0.4)

        # ⭐ On MONTRE le comptage : la règle ne fait que compter des facteurs.
        ex = VGroup(
            self.puissance(7, 4, font_size=36),
            Text("×", font_size=36, color=WHITE),
            self.puissance(7, 3, font_size=36),
            Text("=", font_size=36, color=WHITE),
            self.puissance(7, 7, font_size=36, color=VERT_OK),
        ).arrange(RIGHT, buff=0.2).move_to([0, 0.5, 0])
        self.play(FadeIn(ex, shift=DOWN * 0.2))

        facteurs = VGroup(
            Text("7×7×7×7", font_size=30, color=BLEU_CALCUL),
            Text("et", font_size=24, color=WHITE),
            Text("7×7×7", font_size=30, color=ORANGE_RETENUE),
        ).arrange(RIGHT, buff=0.3).move_to([0, -0.6, 0])
        self.play(FadeIn(facteurs))

        total = Text("4 facteurs + 3 facteurs = 7 facteurs", font_size=30, color=VERT_OK)
        total.move_to([0, -1.55, 0])
        self.play(Write(total))

        self.play(Write(self.chute("La règle ne fait que compter.")))
        self.attendre_voix()

    # ── écran 2 : le quotient ───────────────────────────────────────────────

    def ecran_quotient(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-quotient")
        self.titre_ecran("Le quotient : on SOUSTRAIT")

        regle = self.regle_encadree(
            VGroup(self.puissance("a", "m", font_size=40),
                   Text("÷", font_size=40, color=WHITE),
                   self.puissance("a", "n", font_size=40)).arrange(RIGHT, buff=0.2),
            self.puissance("a", "m − n", font_size=40, color_exp=JAUNE_TITRE),
            BLEU_CALCUL, [0, 2.05, 0],
        )
        self.play(FadeIn(regle))
        self.wait(0.4)

        ex = VGroup(
            self.puissance(7, 5, font_size=36),
            Text("÷", font_size=36, color=WHITE),
            self.puissance(7, 2, font_size=36),
            Text("=", font_size=36, color=WHITE),
            self.puissance(7, 3, font_size=36, color=VERT_OK),
        ).arrange(RIGHT, buff=0.2).move_to([0, 0.55, 0])
        self.play(FadeIn(ex, shift=DOWN * 0.2))

        # La simplification, montrée : deux facteurs s'annulent.
        haut = Text("7 × 7 × 7 × 7 × 7", font_size=30, color=WHITE).move_to([0, -0.5, 0])
        barre = Line([-2.2, -0.95, 0], [2.2, -0.95, 0], color=WHITE, stroke_width=2)
        bas = Text("7 × 7", font_size=30, color=WHITE).move_to([0, -1.4, 0])
        self.play(FadeIn(haut), Create(barre), FadeIn(bas))

        annule = VGroup(
            Line([-2.05, -0.4, 0], [-1.35, -0.6, 0], color=ROUGE_ERREUR, stroke_width=4),
            Line([-0.75, -1.3, 0], [0.75, -1.5, 0], color=ROUGE_ERREUR, stroke_width=4),
        )
        self.play(Create(annule[0]), Create(annule[1]))

        reste = Text("il reste 3 facteurs", font_size=30, color=VERT_OK).move_to([0, -2.15, 0])
        self.play(Write(reste))
        self.attendre_voix()

    # ── écran 3 : puiss_puissance_puissance ─────────────────────────────────

    def ecran_puissance_de_puissance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-puissance")
        self.titre_ecran("La parenthèse : on MULTIPLIE")

        gauche = VGroup(
            Text("(", font_size=48, color=WHITE),
            self.puissance("a", "m", font_size=40),
            Text(")", font_size=48, color=WHITE),
        ).arrange(RIGHT, buff=0.06)
        exp = Text("n", font_size=26, color=WHITE).next_to(gauche, UR, buff=0.02)
        regle = self.regle_encadree(
            VGroup(gauche, exp),
            self.puissance("a", "m × n", font_size=40, color_exp=JAUNE_TITRE),
            BLEU_CALCUL, [0, 2.05, 0],
        )
        self.play(FadeIn(regle))
        self.wait(0.4)

        g = VGroup(
            Text("(", font_size=44, color=WHITE),
            self.puissance(7, 3, font_size=36),
            Text(")", font_size=44, color=WHITE),
        ).arrange(RIGHT, buff=0.06)
        e = Text("4", font_size=24, color=WHITE).next_to(g, UR, buff=0.02)
        ex = VGroup(VGroup(g, e), Text("=", font_size=36, color=WHITE),
                    self.puissance(7, 12, font_size=36, color=VERT_OK))
        ex.arrange(RIGHT, buff=0.28).move_to([0, 0.6, 0])
        self.play(FadeIn(ex, shift=DOWN * 0.2))

        calcul = Text("3 × 4 = 12", font_size=32, color=VERT_OK).move_to([0, -0.45, 0])
        self.play(Write(calcul))

        # ⛔ L'erreur classique, montrée puis barrée.
        faux = Text("3 + 4 = 7", font_size=32, color=ROUGE_ERREUR).move_to([0, -1.45, 0])
        self.play(FadeIn(faux))
        croix = Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(croix))

        self.play(Write(self.chute("Une parenthèse, ça multiplie.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 4 : puiss_exposant_negatif ────────────────────────────────────

    def ecran_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-negatif")
        self.titre_ecran("L'exposant négatif : un INVERSE")

        alerte = Text("Un exposant négatif ne donne PAS un nombre négatif.",
                      font_size=30, color=ORANGE_RETENUE).move_to([0, 2.1, 0])
        self.play(Write(alerte))

        # a^-n = 1 / a^n
        gauche = self.puissance("a", "-n", font_size=44, color_exp=JAUNE_TITRE)
        eg = Text("=", font_size=44, color=WHITE)
        un = Text("1", font_size=36, color=WHITE)
        trait = Line(LEFT * 0.42, RIGHT * 0.42, color=WHITE, stroke_width=2.5)
        bas = self.puissance("a", "n", font_size=36)
        fraction = VGroup(un, trait, bas).arrange(DOWN, buff=0.14)
        ligne = VGroup(gauche, eg, fraction).arrange(RIGHT, buff=0.3).move_to([0, 0.85, 0])
        self.play(FadeIn(gauche), Write(eg), FadeIn(fraction))
        self.wait(0.5)

        # Le cas chiffré.
        g2 = self.puissance(7, -2, font_size=36)
        eg2 = Text("=", font_size=36, color=WHITE)
        un2 = Text("1", font_size=30, color=WHITE)
        trait2 = Line(LEFT * 0.38, RIGHT * 0.38, color=WHITE, stroke_width=2.5)
        bas2 = self.puissance(7, 2, font_size=30)
        f2 = VGroup(un2, trait2, bas2).arrange(DOWN, buff=0.12)
        eg3 = Text("=", font_size=36, color=WHITE)
        un3 = Text("1", font_size=30, color=VERT_OK)
        trait3 = Line(LEFT * 0.38, RIGHT * 0.38, color=VERT_OK, stroke_width=2.5)
        bas3 = Text("49", font_size=30, color=VERT_OK)
        f3 = VGroup(un3, trait3, bas3).arrange(DOWN, buff=0.12)
        chiffre = VGroup(g2, eg2, f2, eg3, f3).arrange(RIGHT, buff=0.26).move_to([0, -1.0, 0])
        self.play(FadeIn(chiffre, shift=UP * 0.2))
        self.play(Circumscribe(f3, color=VERT_OK, buff=0.18))

        self.play(Write(self.chute("Il retourne la fraction, il ne change pas le signe.")))
        self.attendre_voix()

    # ── écran 5 : puiss_expression_composee, la MÉTHODE ─────────────────────

    def ecran_enchainer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-enchainer")
        self.titre_ecran("Au contrôle : on ENCHAÎNE")

        constat = Text("On ne demande jamais une règle isolée.",
                       font_size=30, color=WHITE).move_to([0, 2.1, 0])
        self.play(Write(constat))

        etapes = VGroup()
        for n, (txt, coul) in enumerate([
            ("1. Je réduis le HAUT", VERT_OK),
            ("2. Je réduis le BAS", BLEU_CALCUL),
            ("3. Et SEULEMENT après, je divise", ORANGE_RETENUE),
        ]):
            etapes.add(Text(txt, font_size=34, color=coul))
        etapes.arrange(DOWN, aligned_edge=LEFT, buff=0.62).move_to([0, 0.35, 0])
        for e in etapes:
            self.play(FadeIn(e, shift=RIGHT * 0.25), run_time=0.6)

        self.play(Write(self.chute("Un étage après l'autre — jamais tout d'un coup.")))
        self.attendre_voix()

    # ── écran 6 : puiss_notation_scientifique ───────────────────────────────

    def ecran_scientifique(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-scientifique")
        self.titre_ecran("La notation scientifique")

        forme = VGroup(
            Text("un nombre entre 1 et 10", font_size=28, color=BLEU_CALCUL),
            Text("×", font_size=28, color=WHITE),
            VGroup(Text("une puissance de 10", font_size=28, color=VERT_OK)),
        ).arrange(RIGHT, buff=0.25).move_to([0, 2.05, 0])
        self.play(FadeIn(forme))

        for y, depart, mantisse, expo in [(0.75, "47 000", "4,7", 4), (-0.6, "0,000 32", "3,2", -4)]:
            g = Text(depart, font_size=36, color=WHITE)
            fl = Arrow(LEFT * 0.5, RIGHT * 0.5, buff=0, color=BLEU_CALCUL, stroke_width=3)
            m = Text(mantisse, font_size=36, color=BLEU_CALCUL)
            fois = Text("×", font_size=32, color=WHITE)
            p = self.puissance(10, expo, font_size=36, color=VERT_OK)
            ligne = VGroup(g, fl, m, fois, p).arrange(RIGHT, buff=0.24).move_to([0, y, 0])
            self.play(FadeIn(g))
            self.play(Create(fl), FadeIn(VGroup(m, fois, p), shift=RIGHT * 0.2))

        self.play(Write(self.chute("Pour comparer des ordres de grandeur d'un coup d'œil.")))
        self.attendre_voix()

    # ── défi : la vraie question du contrôle commun ─────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        origine = Text("La vraie question, tombée au contrôle commun.",
                       font_size=25, color=BLEU_CALCUL).move_to([0, 2.1, 0])
        self.play(FadeIn(origine))

        # B = (7^4 × 7^-5) / (7^3)^4
        haut = VGroup(
            self.puissance(7, 4, font_size=34),
            Text("×", font_size=32, color=WHITE),
            self.puissance(7, -5, font_size=34),
        ).arrange(RIGHT, buff=0.18)
        trait = Line(LEFT * 1.35, RIGHT * 1.35, color=WHITE, stroke_width=2.5)
        g = VGroup(Text("(", font_size=40, color=WHITE),
                   self.puissance(7, 3, font_size=34),
                   Text(")", font_size=40, color=WHITE)).arrange(RIGHT, buff=0.05)
        e = Text("4", font_size=22, color=WHITE).next_to(g, UR, buff=0.02)
        bas = VGroup(g, e)
        fraction = VGroup(haut, trait, bas).arrange(DOWN, buff=0.2)
        b = Text("B =", font_size=38, color=WHITE)
        enonce = VGroup(b, fraction).arrange(RIGHT, buff=0.3).move_to([0, 0.75, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        consigne = VGroup(
            Text("Écris B sous la forme", font_size=32, color=JAUNE_TITRE),
            self.puissance(7, "n", font_size=34, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.22).move_to([0, -0.85, 0])
        self.play(Write(consigne[0]), FadeIn(consigne[1]))

        indice = Text("Les trois règles y sont. Le haut, puis le bas, puis la division.",
                      font_size=25, color=BLEU_CALCUL).move_to([0, -1.75, 0])
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction : étage par étage")

        # 1. le haut
        t1 = Text("1. Le HAUT — un produit : j'additionne", font_size=28, color=VERT_OK)
        t1.move_to([0, 2.1, 0])
        c1 = VGroup(
            self.puissance(7, 4, font_size=32),
            Text("×", font_size=30, color=WHITE),
            self.puissance(7, -5, font_size=32),
            Text("=", font_size=30, color=WHITE),
            self.puissance(7, -1, font_size=32, color=VERT_OK),
        ).arrange(RIGHT, buff=0.2).move_to([0, 1.25, 0])
        detail1 = Text("4 + (−5) = −1", font_size=24, color=VERT_OK).move_to([0, 0.6, 0])
        self.play(Write(t1))
        self.play(FadeIn(c1, shift=RIGHT * 0.15), FadeIn(detail1))

        # 2. le bas
        t2 = Text("2. Le BAS — une parenthèse : je multiplie", font_size=28, color=BLEU_CALCUL)
        t2.move_to([0, -0.15, 0])
        g = VGroup(Text("(", font_size=38, color=WHITE),
                   self.puissance(7, 3, font_size=32),
                   Text(")", font_size=38, color=WHITE)).arrange(RIGHT, buff=0.05)
        e = Text("4", font_size=22, color=WHITE).next_to(g, UR, buff=0.02)
        c2 = VGroup(VGroup(g, e), Text("=", font_size=30, color=WHITE),
                    self.puissance(7, 12, font_size=32, color=BLEU_CALCUL))
        c2.arrange(RIGHT, buff=0.22).move_to([0, -0.95, 0])
        detail2 = Text("3 × 4 = 12", font_size=24, color=BLEU_CALCUL).move_to([0, -1.55, 0])
        self.play(Write(t2))
        self.play(FadeIn(c2, shift=RIGHT * 0.15), FadeIn(detail2))

        # 3. la division
        t3 = Text("3. Je divise — je soustrais : −1 − 12 = −13",
                  font_size=28, color=ORANGE_RETENUE)
        t3.move_to([0, -2.2, 0])
        self.play(Write(t3))

        # ⚠️ Le résultat va SOUS la troisième étape, pas à sa droite : posé à
        # x = 4,3 il s'écrivait par-dessus la fin de la ligne (rendu du 09/09).
        final = VGroup(
            Text("B =", font_size=38, color=WHITE),
            self.puissance(7, -13, font_size=40, color=VERT_OK),
        ).arrange(RIGHT, buff=0.22).move_to([0, -3.15, 0])
        self.play(FadeIn(final, shift=UP * 0.2))
        self.play(Circumscribe(final, color=VERT_OK, buff=0.18))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les puissances",
            accroche="(7³)⁴, on additionne ou on multiplie ?",
            promesse="Additionner · multiplier · enchaîner sans se tromper",
        )
        self.page_objectifs([
            "utiliser les quatre règles de calcul",
            "les enchaîner sur une seule expression, comme au contrôle",
            "écrire un nombre en notation scientifique",
        ])
        self.ecran_produit()
        self.ecran_quotient()
        self.ecran_puissance_de_puissance()
        self.ecran_negatif()
        self.ecran_enchainer()
        self.ecran_scientifique()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "le produit additionne, le quotient soustrait",
                "la parenthèse multiplie ; l'exposant négatif retourne",
                "enchaîner : le haut, le bas, puis la division",
            ],
            rappel="Toutes ces règles exigent la MÊME BASE. Sinon, aucune ne s'applique.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  Le SHORT 9:16 — micro `puiss_puissance_puissance`, le piège de la parenthèse.
#  Rendu : -r 1080,1920
# ══════════════════════════════════════════════════════════════════════════════

class Puissances2deShort(ShortSeconde):

    dossier_voix = VOIX_SHORT

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        g = VGroup(Text("(", font_size=64, color=JAUNE_TITRE),
                   self.puissance(7, 3, font_size=56, color=JAUNE_TITRE),
                   Text(")", font_size=64, color=JAUNE_TITRE)).arrange(RIGHT, buff=0.06)
        e = Text("4", font_size=34, color=JAUNE_TITRE).next_to(g, UR, buff=0.03)
        expr = VGroup(g, e).move_to([0, 1.8, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.2), run_time=0.5)

        q = VGroup(
            Text("on additionne", font_size=32, color=WHITE),
            Text("ou on multiplie ?", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.15, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_erreur(self):
        self.clear()
        self.margo_bas()
        self.dire("01-erreur")

        titre = Text("Le réflexe", font_size=34, color=ROUGE_ERREUR).move_to([0, 3.0, 0])
        self.play(Write(titre))

        bloc = VGroup(
            Text("3 + 4 = 7", font_size=40, color=WHITE),
            self.puissance(7, 7, font_size=44, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.4).move_to([0, 1.3, 0])
        cadre = SurroundingRectangle(bloc, color=ROUGE_ERREUR, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        barre = Line(cadre.get_corner(DL), cadre.get_corner(UR),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre))

        pourquoi = VGroup(
            Text("ça ressemble trop", font_size=28, color=WHITE),
            Text("à la règle du produit", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.1, 0])
        self.play(FadeIn(pourquoi, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("02-regle")

        titre = Text("Une parenthèse", font_size=32, color=JAUNE_TITRE).move_to([0, 3.1, 0])
        sous = Text("ça MULTIPLIE", font_size=38, color=VERT_OK).move_to([0, 2.5, 0])
        self.play(Write(titre), FadeIn(sous))

        bloc = VGroup(
            Text("3 × 4 = 12", font_size=40, color=WHITE),
            self.puissance(7, 12, font_size=48, color=VERT_OK),
        ).arrange(DOWN, buff=0.4).move_to([0, 0.9, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.32, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.play(Flash(bloc[1], color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_pourquoi(self):
        self.clear()
        self.margo_bas()
        self.dire("03-pourquoi")

        titre = Text("Pourquoi ?", font_size=34, color=JAUNE_TITRE).move_to([0, 3.1, 0])
        self.play(Write(titre))

        paquets = VGroup()
        for i in range(4):
            p = VGroup(
                Text("7×7×7", font_size=26, color=BLEU_CALCUL),
            )
            cadre = SurroundingRectangle(p, color=BLEU_CALCUL, buff=0.14, stroke_width=2)
            paquets.add(VGroup(p, cadre))
        paquets.arrange(DOWN, buff=0.22).move_to([0, 1.1, 0])
        for p in paquets:
            self.play(FadeIn(p, shift=RIGHT * 0.15), run_time=0.32)

        compte = VGroup(
            Text("4 paquets de 3", font_size=30, color=WHITE),
            Text("= 12 facteurs", font_size=34, color=VERT_OK),
        ).arrange(DOWN, buff=0.22).move_to([0, -1.35, 0])
        self.play(FadeIn(compte, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def ecran_retenir(self):
        self.clear()
        self.margo_bas()
        self.dire("04-retenir")

        titre = Text("À retenir", font_size=36, color=JAUNE_TITRE).move_to([0, 3.1, 0])
        self.play(Write(titre))

        croix = VGroup(
            Text("×", font_size=48, color=BLEU_CALCUL),
            Text("on ADDITIONNE", font_size=28, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.2).move_to([0, 1.5, 0])
        cadre_c = SurroundingRectangle(croix, color=BLEU_CALCUL, buff=0.26, stroke_width=2.5)

        paren = VGroup(
            Text("( )", font_size=48, color=VERT_OK),
            Text("on MULTIPLIE", font_size=28, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.6, 0])
        cadre_p = SurroundingRectangle(paren, color=VERT_OK, buff=0.26, stroke_width=2.5)

        self.play(FadeIn(croix), Create(cadre_c))
        self.play(FadeIn(paren), Create(cadre_p))
        self.play(Write(self.chute("Même base, toujours.", color=ORANGE_RETENUE, font_size=26)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_erreur()
        self.ecran_regle()
        self.ecran_pourquoi()
        self.ecran_retenir()
        self.ecran_renvoi()
