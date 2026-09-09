# repere_coordonnees.py
# EleveAI — Maths seconde — Repère et coordonnées (notionId : repere_coordonnees)
#
# ⭐ DEUXIÈME NOTION DE SECONDE, et la PREMIÈRE en géométrie repérée — la famille
# que j'avais chiffrée au coefficient le plus lourd (1,8). Choisie par Frédéric
# le 09/09/2026 sur le CALENDRIER, et non sur la difficulté : « les fonctions de
# référence sont en février, aujourd'hui les secondes ne vont pas regarder ça ».
# On produit ce que la classe rencontre maintenant.
#
# Toutes les briques communes (garde, objectifs, finale, abonnement, radical,
# chute, axes) viennent de `manim/gabarit_seconde.py` — voir ce fichier pour les
# pièges déjà payés, notamment l'absence de LaTeX sur ce poste.
#
# Mêmes exemples que la fiche `lib/fiches/maths-seconde-repere.tsx`.
#
# Mapping micro-compétences (notion repere_coordonnees — 4 micros, TOUTES
# couvertes) → écrans :
# - repere_coordonnees_point → écran 1 (lire et placer A(2 ; 4))
# - repere_milieu            → écran 2 (la moyenne : A(2;4), B(8;10) → M(5;7))
# - repere_distance          → écran 3 (Pythagore déguisé : 3 et 4 → 5)
#                              + écran 4 (⛔ elle EXIGE un repère orthonormé)
# - repere_configuration     → écran 5 (parallélogramme = diagonales de même
#                              milieu) + défi + correction
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/repere_coordonnees.py RepereCoordonnees2de -o eleveai-maths-seconde-repere-coordonnees --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-repere-coordonnees"
VOIX_SHORT = SONS / "seconde-repere-coordonnees-short"


class RepereCoordonnees2de(NotionSeconde):

    dossier_voix = VOIX

    # ── outils propres à la notion ──────────────────────────────────────────

    def point_nomme(self, axes, x, y, nom, couleur=BLEU_CALCUL, direction=UR):
        """Un point du plan avec son étiquette « A(2 ; 4) »."""
        p = Dot(axes.c2p(x, y), color=couleur, radius=0.09)
        etiq = Text(f"{nom}({x:g} ; {y:g})", font_size=24, color=couleur)
        etiq.next_to(p, direction, buff=0.12)
        return VGroup(p, etiq)

    # ── écran 1 : repere_coordonnees_point ──────────────────────────────────

    def ecran_point(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-point")
        self.titre_ecran("Lire et placer un point")

        axes = self.axes_notion([0, 6, 1], [0, 6, 1], x_length=5.6, y_length=4.0)
        axes.move_to([-2.6, -0.35, 0])
        self.play(Create(axes))

        # On montre le chemin : d'abord l'abscisse, ensuite l'ordonnée.
        chemin_x = Arrow(axes.c2p(0, 0), axes.c2p(2, 0), buff=0, color=BLEU_CALCUL, stroke_width=4)
        lab_x = Text("2 vers la droite", font_size=22, color=BLEU_CALCUL)
        # ⚠️ La flèche est POSÉE SUR l'axe : en dessous elle heurte les
        # graduations, et plus bas encore elle heurte la phrase de fin d'écran.
        # La seule zone libre est AU-DESSUS d'elle, dans le quart vide du repère.
        lab_x.next_to(chemin_x, UP, buff=0.12)
        self.play(Create(chemin_x), FadeIn(lab_x))

        chemin_y = Arrow(axes.c2p(2, 0), axes.c2p(2, 4), buff=0, color=VERT_OK, stroke_width=4)
        lab_y = Text("puis 4 vers le haut", font_size=22, color=VERT_OK)
        lab_y.next_to(chemin_y, RIGHT, buff=0.15)
        self.play(Create(chemin_y), FadeIn(lab_y))

        a = self.point_nomme(axes, 2, 4, "A", JAUNE_TITRE)
        self.play(GrowFromCenter(a[0]), Write(a[1]))

        # Le vocabulaire, posé à droite du repère.
        mots = VGroup(
            Text("2 = l'ABSCISSE", font_size=28, color=BLEU_CALCUL),
            Text("elle se lit en horizontal", font_size=22, color=WHITE),
            Text("4 = l'ORDONNÉE", font_size=28, color=VERT_OK),
            Text("elle se lit en vertical", font_size=22, color=WHITE),
        ).arrange(DOWN, buff=0.3, aligned_edge=LEFT).move_to([3.3, 0.5, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=RIGHT * 0.2) for m in mots], lag_ratio=0.35))

        self.play(Write(self.chute("L'abscisse s'écrit TOUJOURS en premier.")))
        self.attendre_voix()

    # ── écran 2 : repere_milieu ─────────────────────────────────────────────

    def ecran_milieu(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-milieu")
        self.titre_ecran("Le milieu : une MOYENNE")

        axes = self.axes_notion([0, 12, 2], [0, 12, 2], x_length=5.2, y_length=3.8)
        axes.move_to([-3.0, -0.5, 0])
        self.play(Create(axes))

        # ⚠️ A est près de l'axe des ordonnées : son étiquette part vers la
        # DROITE-BAS, sinon elle recouvre les graduations verticales.
        a = self.point_nomme(axes, 2, 4, "A", BLEU_CALCUL, DR)
        b = self.point_nomme(axes, 8, 10, "B", BLEU_CALCUL, UR)
        seg = Line(axes.c2p(2, 4), axes.c2p(8, 10), color=WHITE, stroke_width=3)
        self.play(FadeIn(a), FadeIn(b))
        self.play(Create(seg))

        # Le calcul, à droite, ligne à ligne.
        calc = VGroup(
            Text("x du milieu :", font_size=26, color=WHITE),
            Text("(2 + 8) ÷ 2 = 5", font_size=30, color=BLEU_CALCUL),
            Text("y du milieu :", font_size=26, color=WHITE),
            Text("(4 + 10) ÷ 2 = 7", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.28, aligned_edge=LEFT).move_to([3.1, 0.9, 0])
        for m in calc:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        m = self.point_nomme(axes, 5, 7, "M", JAUNE_TITRE, UL)
        self.play(GrowFromCenter(m[0]), Write(m[1]))
        self.play(Flash(m[0], color=JAUNE_TITRE, line_length=0.3))

        alerte = Text("une SOMME divisée par 2 — jamais une différence",
                      font_size=25, color=ORANGE_RETENUE).move_to([2.9, -1.7, 0])
        if alerte.width > 6.4:
            alerte.scale_to_fit_width(6.4)
        self.play(Write(alerte))
        self.attendre_voix()

    # ── écran 3 : repere_distance ───────────────────────────────────────────

    def ecran_distance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-distance")
        self.titre_ecran("La distance : Pythagore déguisé")

        axes = self.axes_notion([0, 6, 1], [0, 6, 1], x_length=5.0, y_length=3.8)
        axes.move_to([-3.1, -0.5, 0])
        self.play(Create(axes))

        a = self.point_nomme(axes, 1, 1, "A", BLEU_CALCUL, DL)
        b = self.point_nomme(axes, 4, 5, "B", BLEU_CALCUL, UR)
        self.play(FadeIn(a), FadeIn(b))

        # Le triangle rectangle CACHÉ dans la formule : on le fait apparaître.
        horiz = Line(axes.c2p(1, 1), axes.c2p(4, 1), color=ORANGE_RETENUE, stroke_width=4)
        vert = Line(axes.c2p(4, 1), axes.c2p(4, 5), color=ORANGE_RETENUE, stroke_width=4)
        hyp = Line(axes.c2p(1, 1), axes.c2p(4, 5), color=VERT_OK, stroke_width=5)
        angle = Square(side_length=0.22, stroke_width=3, color=ORANGE_RETENUE)
        angle.move_to(axes.c2p(4, 1) + LEFT * 0.11 + UP * 0.11)

        l_h = Text("3", font_size=26, color=ORANGE_RETENUE).next_to(horiz, DOWN, buff=0.12)
        l_v = Text("4", font_size=26, color=ORANGE_RETENUE).next_to(vert, RIGHT, buff=0.12)

        self.play(Create(horiz), FadeIn(l_h))
        self.play(Create(vert), FadeIn(l_v), Create(angle))
        self.play(Create(hyp))

        calc = VGroup(
            Text("AB =", font_size=28, color=WHITE),
            self.radical("3² + 4²", font_size=30, color=WHITE),
            self.radical(25, font_size=30, color=WHITE),
            Text("= 5", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([3.2, 0.4, 0])
        for m in calc:
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.5)
        self.play(Circumscribe(calc[3], color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Le triangle rectangle était caché dans la formule.")))
        self.attendre_voix()

    # ── écran 4 : le piège du repère orthonormé ─────────────────────────────

    def ecran_orthonorme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-orthonorme")
        self.titre_ecran("⚠ La distance EXIGE un repère orthonormé".replace("⚠ ", ""))

        rappel = Text("Des axes perpendiculaires, et la même unité sur les deux.",
                      font_size=28, color=WHITE).move_to([0, 2.05, 0])
        self.play(Write(rappel))

        # Deux colonnes : ce qui casse, ce qui tient.
        casse = VGroup(
            Text("Sans angle droit", font_size=30, color=ROUGE_ERREUR),
            Text("plus de triangle rectangle", font_size=24, color=WHITE),
            Text("plus de Pythagore", font_size=24, color=WHITE),
            Text("la formule MENT", font_size=28, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.26).move_to([-3.3, 0.15, 0])
        cadre_casse = SurroundingRectangle(casse, color=ROUGE_ERREUR, buff=0.28, stroke_width=2.5)

        tient = VGroup(
            Text("Le MILIEU, lui,", font_size=30, color=VERT_OK),
            Text("reste vrai dans", font_size=24, color=WHITE),
            Text("n'importe quel repère", font_size=24, color=WHITE),
            Text("c'est une moyenne", font_size=26, color=VERT_OK),
        ).arrange(DOWN, buff=0.26).move_to([3.3, 0.15, 0])
        cadre_tient = SurroundingRectangle(tient, color=VERT_OK, buff=0.28, stroke_width=2.5)

        self.play(FadeIn(casse), Create(cadre_casse))
        self.play(FadeIn(tient), Create(cadre_tient))

        self.play(Write(self.chute("C'est la question que le sujet pose pour te tester.",
                                   color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 5 : repere_configuration ──────────────────────────────────────

    def ecran_parallelogramme(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-parallelogramme")
        self.titre_ecran("Prouver un parallélogramme")

        regle = Text("ABCD est un parallélogramme si ses DIAGONALES ont le même milieu.",
                     font_size=27, color=WHITE).move_to([0, 2.15, 0])
        if regle.width > 11.5:
            regle.scale_to_fit_width(11.5)
        self.play(Write(regle))

        axes = self.axes_notion([0, 8, 2], [0, 8, 2], x_length=4.4, y_length=3.4)
        axes.move_to([-3.4, -0.75, 0])
        self.play(Create(axes))

        # ⚠️ Chaque sommet pousse son étiquette VERS L'EXTÉRIEUR du quadrilatère,
        # sinon elle tombe sur une diagonale ou sur l'axe (cas de A, en bas à
        # gauche, collé à l'axe des ordonnées).
        pts = {"A": (1, 2), "B": (5, 3), "C": (6, 7), "D": (2, 6)}
        vers = {"A": DR, "B": DR, "C": UR, "D": UL}
        sommets = VGroup()
        for nom, (x, y) in pts.items():
            d = Dot(axes.c2p(x, y), color=BLEU_CALCUL, radius=0.08)
            e = Text(nom, font_size=24, color=BLEU_CALCUL).next_to(d, vers[nom], buff=0.1)
            sommets.add(VGroup(d, e))
        self.play(LaggedStart(*[FadeIn(s) for s in sommets], lag_ratio=0.25))

        cotes = VGroup(*[
            Line(axes.c2p(*pts[a]), axes.c2p(*pts[b]), color=WHITE, stroke_width=2.5)
            for a, b in [("A", "B"), ("B", "C"), ("C", "D"), ("D", "A")]
        ])
        self.play(Create(cotes))

        # ⛔ LE PIÈGE DU CHAPITRE : les diagonales sautent une lettre.
        diag1 = Line(axes.c2p(*pts["A"]), axes.c2p(*pts["C"]), color=VERT_OK, stroke_width=4)
        diag2 = Line(axes.c2p(*pts["B"]), axes.c2p(*pts["D"]), color=ORANGE_RETENUE, stroke_width=4)
        self.play(Create(diag1), Create(diag2))

        legende = VGroup(
            Text("les DIAGONALES", font_size=30, color=JAUNE_TITRE),
            Text("[AC] et [BD]", font_size=32, color=VERT_OK),
            Text("elles sautent une lettre", font_size=24, color=WHITE),
            Text("PAS les côtés [AB] et [CD]", font_size=25, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.32).move_to([3.2, 0.0, 0])
        for m in legende:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.5)

        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        coords = VGroup(
            Text("A(1 ; 2)", font_size=34, color=BLEU_CALCUL),
            Text("B(5 ; 3)", font_size=34, color=BLEU_CALCUL),
            Text("C(6 ; 7)", font_size=34, color=BLEU_CALCUL),
            Text("D(2 ; 6)", font_size=34, color=BLEU_CALCUL),
        ).arrange(RIGHT, buff=0.55).move_to([0, 1.55, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.15) for m in coords], lag_ratio=0.25))

        question = Text("ABCD est-il un parallélogramme ?", font_size=38, color=JAUNE_TITRE)
        question.move_to([0, 0.35, 0])
        self.play(Write(question))

        indice = Text("Indice : compare les milieux des deux diagonales.",
                      font_size=26, color=BLEU_CALCUL).move_to([0, -0.75, 0])
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-correction")
        self.titre_ecran("Correction")

        # Diagonale [AC]
        t1 = Text("Milieu de [AC] :", font_size=28, color=VERT_OK).move_to([-3.4, 1.95, 0])
        c1 = VGroup(
            Text("x : (1 + 6) ÷ 2 = 3,5", font_size=28, color=WHITE),
            Text("y : (2 + 7) ÷ 2 = 4,5", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).next_to(t1, DOWN, buff=0.3, aligned_edge=LEFT)
        self.play(Write(t1))
        for m in c1:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        # Diagonale [BD]
        t2 = Text("Milieu de [BD] :", font_size=28, color=ORANGE_RETENUE).move_to([2.9, 1.95, 0])
        c2 = VGroup(
            Text("x : (5 + 2) ÷ 2 = 3,5", font_size=28, color=WHITE),
            Text("y : (3 + 6) ÷ 2 = 4,5", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).next_to(t2, DOWN, buff=0.3, aligned_edge=LEFT)
        self.play(Write(t2))
        for m in c2:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        egal = Text("(3,5 ; 4,5)  =  (3,5 ; 4,5)", font_size=36, color=VERT_OK).move_to([0, -0.9, 0])
        self.play(Write(egal))
        self.play(Circumscribe(egal, color=VERT_OK, buff=0.22))

        conclusion = Text("Même milieu → ABCD est un parallélogramme.",
                          font_size=32, color=VERT_OK).move_to([0, -1.95, 0])
        self.play(Write(conclusion))

        self.play(Write(self.chute("Et je n'ai rien mesuré : que des moyennes.")))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="Repère et coordonnées",
            accroche="Deux formules. Mais pour prouver quoi ?",
            promesse="Placer · calculer · démontrer sans mesurer",
        )
        self.page_objectifs([
            "lire et placer un point dans un repère",
            "calculer un milieu et une distance",
            "prouver qu'un quadrilatère est un parallélogramme",
        ])
        self.ecran_point()
        self.ecran_milieu()
        self.ecran_distance()
        self.ecran_orthonorme()
        self.ecran_parallelogramme()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "placer un point : l'abscisse d'abord, l'ordonnée ensuite",
                "le milieu est une moyenne ; la distance, c'est Pythagore",
                "deux diagonales de même milieu → parallélogramme",
            ],
            rappel="Les diagonales sautent une lettre : [AC] et [BD], jamais [AB] et [CD].",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  Le SHORT 9:16 — micro `repere_configuration`, le piège des diagonales.
#  Rendu : -r 1080,1920
# ══════════════════════════════════════════════════════════════════════════════

class RepereCoordonnees2deShort(ShortSeconde):

    dossier_voix = VOIX_SHORT

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        pts = VGroup(
            Text("A(1 ; 2)", font_size=30, color=BLEU_CALCUL),
            Text("B(5 ; 3)", font_size=30, color=BLEU_CALCUL),
            Text("C(6 ; 7)", font_size=30, color=BLEU_CALCUL),
            Text("D(2 ; 6)", font_size=30, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.24).move_to([0, 1.9, 0])
        q = VGroup(
            Text("Parallélogramme", font_size=34, color=JAUNE_TITRE),
            Text("ou pas ?", font_size=34, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.5, 0])

        # ⛔ Tout est posé avant 1 s : c'est cette image que YouTube prélève.
        self.play(FadeIn(pts, shift=DOWN * 0.15), run_time=0.5)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(q, color=JAUNE_TITRE, line_length=0.3))
        self.attendre_voix(marge=0.4)

    def ecran_erreur(self):
        self.clear()
        self.margo_bas()
        self.dire("01-erreur")

        titre = Text("L'erreur", font_size=34, color=ROUGE_ERREUR).move_to([0, 3.0, 0])
        self.play(Write(titre))

        bloc = VGroup(
            Text("comparer les", font_size=28, color=WHITE),
            Text("CÔTÉS", font_size=40, color=ROUGE_ERREUR),
            Text("[AB] et [CD]", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.2, 0])
        cadre = SurroundingRectangle(bloc, color=ROUGE_ERREUR, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))

        # La barre qui invalide : elle traverse le cadre.
        barre = Line(cadre.get_corner(DL), cadre.get_corner(UR),
                     color=ROUGE_ERREUR, stroke_width=7)
        self.play(Create(barre))

        verdict = Text("ça ne prouve RIEN", font_size=32, color=ROUGE_ERREUR).move_to([0, -0.9, 0])
        self.play(Write(verdict))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("02-regle")

        titre = Text("Ce qu'il faut", font_size=32, color=JAUNE_TITRE).move_to([0, 3.0, 0])
        self.play(Write(titre))

        bloc = VGroup(
            Text("comparer les", font_size=28, color=WHITE),
            Text("DIAGONALES", font_size=36, color=VERT_OK),
            Text("[AC] et [BD]", font_size=34, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.4, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.play(Flash(bloc[1], color=VERT_OK, line_length=0.3))

        astuce = VGroup(
            Text("elles sautent", font_size=30, color=JAUNE_TITRE),
            Text("une lettre", font_size=30, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.1, 0])
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.attendre_voix(marge=0.4)

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("03-calcul")

        titre = Text("Les deux milieux", font_size=30, color=JAUNE_TITRE).move_to([0, 3.1, 0])
        self.play(Write(titre))

        ac = VGroup(
            Text("[AC]", font_size=30, color=VERT_OK),
            Text("(1+6)÷2 = 3,5", font_size=26, color=WHITE),
            Text("(2+7)÷2 = 4,5", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.5, 0])
        cadre_ac = SurroundingRectangle(ac, color=VERT_OK, buff=0.2, stroke_width=2)

        bd = VGroup(
            Text("[BD]", font_size=30, color=ORANGE_RETENUE),
            Text("(5+2)÷2 = 3,5", font_size=26, color=WHITE),
            Text("(3+6)÷2 = 4,5", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.8, 0])
        cadre_bd = SurroundingRectangle(bd, color=ORANGE_RETENUE, buff=0.2, stroke_width=2)

        self.play(FadeIn(ac), Create(cadre_ac))
        self.play(FadeIn(bd), Create(cadre_bd))
        self.attendre_voix(marge=0.4)

    def ecran_conclusion(self):
        self.clear()
        self.margo_bas()
        self.dire("04-conclusion")

        egal = Text("3,5 ; 4,5", font_size=44, color=VERT_OK).move_to([0, 2.2, 0])
        meme = Text("des DEUX côtés", font_size=30, color=WHITE).move_to([0, 1.3, 0])
        self.play(GrowFromCenter(egal), FadeIn(meme))
        self.play(Flash(egal, color=VERT_OK, line_length=0.35))

        oui = VGroup(
            Text("OUI", font_size=56, color=VERT_OK),
            Text("c'est un", font_size=28, color=WHITE),
            Text("parallélogramme", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.25).move_to([0, -0.5, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in oui], lag_ratio=0.3))

        self.play(Write(self.chute("Rien mesuré : que des moyennes.", color=BLEU_CALCUL, font_size=24)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_erreur()
        self.ecran_regle()
        self.ecran_calcul()
        self.ecran_conclusion()
        self.ecran_renvoi()
