# identites_remarquables_2de.py
# EleveAI — Maths seconde — Les identités remarquables
# (notionId : identites_remarquables_2de)
#
# ⭐ QUATRIÈME NOTION DE SECONDE (10/09/2026), et la première produite avec
# TROIS shorts d'un coup — le format court fait 50 à 175 fois plus de vues que
# la vidéo longue sur les premières mesures de la chaîne.
#
# Briques communes : `manim/gabarit_seconde.py`.
# Mêmes exemples que la fiche `lib/fiches/maths-seconde-identites.tsx`.
#
# Mapping micro-compétences (5 micros, TOUS couverts) → écrans :
# - ir_carre_somme       → écran 1 (le carré découpé, et le contre-exemple 49/25)
# - ir_carre_difference  → écran 2 (seul le double produit change de signe)
# - ir_difference_carres → écran 3 (deux termes, pas trois)
# - ir_application       → écran 4 (les deux sens : développer / factoriser)
#                          + défi et correction
# - ir_calcul_mental     → écran 5 (99² de tête)
#
# ⭐ LE CARRÉ DÉCOUPÉ (écran 1) : le double produit ne se retient pas comme une
# formule, il se VOIT. Un carré de côté a+b contient un carré a², un carré b²,
# et DEUX rectangles a×b — c'est là qu'est le 2ab qu'on oublie.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/identites_remarquables_2de.py IdentitesRemarquables2de -o eleveai-maths-seconde-identites-remarquables --media_dir manim/scripts/seconde/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/identites_remarquables_2de.py IdentitesRemarquables2deShortDoubleProduit -o eleveai-maths-seconde-identites-remarquables-short-doubleproduit --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-identites-remarquables"
VOIX_DP = SONS / "seconde-identites-remarquables-short-doubleproduit"
VOIX_DIFF = SONS / "seconde-identites-remarquables-short-difference"
VOIX_CM = SONS / "seconde-identites-remarquables-short-calculmental"


class IdentitesRemarquables2de(NotionSeconde):

    dossier_voix = VOIX

    # ── outils propres à la notion ──────────────────────────────────────────

    def carre_decoupe(self, ca=2.0, cb=1.15, centre=ORIGIN):
        """Le carré de côté a+b, découpé en a², 2ab et b².

        ⭐ C'est LE visuel du chapitre : le double produit cesse d'être un terme
        à retenir, il devient les deux rectangles qu'on voit.
        """
        cote = ca + cb
        bas_g = centre + LEFT * cote / 2 + DOWN * cote / 2

        def bloc(x, y, w, h, couleur, txt, taille=30):
            r = Rectangle(width=w, height=h, stroke_width=2.5, color=WHITE,
                          fill_color=couleur, fill_opacity=0.55)
            r.move_to(bas_g + RIGHT * (x + w / 2) + UP * (y + h / 2))
            t = Text(txt, font_size=taille, color=WHITE).move_to(r.get_center())
            return VGroup(r, t)

        a2 = bloc(0, cb, ca, ca, BLEU_CALCUL, "a²")
        b2 = bloc(ca, 0, cb, cb, VERT_OK, "b²", 26)
        ab1 = bloc(ca, cb, cb, ca, ORANGE_RETENUE, "ab", 26)
        ab2 = bloc(0, 0, ca, cb, ORANGE_RETENUE, "ab", 26)

        # les côtés, nommés
        lab_a = Text("a", font_size=26, color=BLEU_CALCUL)
        lab_a.next_to(a2, UP, buff=0.12)
        lab_b = Text("b", font_size=26, color=VERT_OK)
        lab_b.next_to(ab1, UP, buff=0.12)
        return VGroup(a2, ab1, ab2, b2), VGroup(lab_a, lab_b)

    def identite(self, gauche, droite, couleur, y, taille=40):
        g = Text(gauche, font_size=taille, color=WHITE)
        eg = Text("=", font_size=taille, color=WHITE)
        d = Text(droite, font_size=taille, color=couleur)
        ligne = VGroup(g, eg, d).arrange(RIGHT, buff=0.25)
        cadre = SurroundingRectangle(ligne, color=couleur, buff=0.28, stroke_width=2.5)
        return VGroup(ligne, cadre).move_to([0, y, 0])

    # ── écran 1 : ir_carre_somme ────────────────────────────────────────────

    def ecran_carre_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-carre-somme")
        self.titre_ecran("Le carré d'une somme")

        regle = self.identite("(a + b)²", "a² + 2ab + b²", BLEU_CALCUL, 2.15)
        self.play(FadeIn(regle))
        self.wait(0.4)

        # Le carré découpé, à gauche : le 2ab se VOIT.
        blocs, cotes = self.carre_decoupe(centre=[-3.4, -0.9, 0])
        self.play(LaggedStart(*[FadeIn(b) for b in blocs], lag_ratio=0.3))
        self.play(FadeIn(cotes))
        self.play(Indicate(blocs[1], color=ORANGE_RETENUE),
                  Indicate(blocs[2], color=ORANGE_RETENUE))

        note = Text("deux rectangles ab :", font_size=25, color=ORANGE_RETENUE)
        note2 = Text("c'est le 2ab", font_size=28, color=ORANGE_RETENUE)
        VGroup(note, note2).arrange(DOWN, buff=0.15).move_to([-3.4, -2.9, 0])
        self.play(FadeIn(note), FadeIn(note2))

        # Le contre-exemple chiffré, à droite.
        contre = VGroup(
            Text("(3 + 4)²  =  7²  =  49", font_size=30, color=VERT_OK),
            Text("3² + 4²  =  9 + 16  =  25", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.5).move_to([3.1, -0.3, 0])
        self.play(FadeIn(contre[0], shift=RIGHT * 0.2))
        self.play(FadeIn(contre[1], shift=RIGHT * 0.2))

        verdict = Text("49 ≠ 25", font_size=44, color=ROUGE_ERREUR).move_to([3.1, -1.65, 0])
        self.play(GrowFromCenter(verdict), Flash(verdict, color=ROUGE_ERREUR, line_length=0.3))
        manque = Text("il manquait 2×3×4 = 24", font_size=26, color=ORANGE_RETENUE)
        manque.move_to([3.1, -2.5, 0])
        self.play(Write(manque))
        self.attendre_voix()

    # ── écran 2 : ir_carre_difference ───────────────────────────────────────

    def ecran_carre_difference(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-carre-difference")
        self.titre_ecran("Le carré d'une différence")

        regle = self.identite("(a − b)²", "a² − 2ab + b²", BLEU_CALCUL, 2.1)
        self.play(FadeIn(regle))
        self.wait(0.4)

        # Ce qui change, et ce qui NE change pas.
        change = VGroup(
            Text("seul le double produit", font_size=30, color=ORANGE_RETENUE),
            Text("change de signe", font_size=34, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2).move_to([-3.3, 0.75, 0])
        cadre_c = SurroundingRectangle(change, color=ORANGE_RETENUE, buff=0.28, stroke_width=2.5)

        garde = VGroup(
            Text("le b² reste POSITIF", font_size=30, color=VERT_OK),
            Text("c'est un carré", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([3.3, 0.75, 0])
        cadre_g = SurroundingRectangle(garde, color=VERT_OK, buff=0.28, stroke_width=2.5)

        self.play(FadeIn(change), Create(cadre_c))
        self.play(FadeIn(garde), Create(cadre_g))
        self.wait(0.4)

        ex = VGroup(
            Text("(x − 5)²", font_size=38, color=JAUNE_TITRE),
            Text("=", font_size=38, color=WHITE),
            Text("x²", font_size=38, color=WHITE),
            Text("− 10x", font_size=38, color=ORANGE_RETENUE),
            Text("+ 25", font_size=38, color=VERT_OK),
        ).arrange(RIGHT, buff=0.24).move_to([0, -1.5, 0])
        for m in ex:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.35)
        self.attendre_voix()

    # ── écran 3 : ir_difference_carres ──────────────────────────────────────

    def ecran_difference_carres(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-difference-carres")
        self.titre_ecran("La différence de deux carrés")

        regle = self.identite("(a − b)(a + b)", "a² − b²", VERT_OK, 2.1)
        self.play(FadeIn(regle))
        self.wait(0.4)

        # POURQUOI il ne reste que deux termes : les doubles produits s'annulent.
        # ⛔ LA LIGNE EST DÉCOUPÉE EN MORCEAUX, et non écrite d'un bloc : les
        # barres d'annulation se calculent alors SUR les termes visés. Posées à
        # des coordonnées fixes (premier rendu du 10/09), elles tombaient entre
        # les deux « ab » et ne barraient rien.
        termes = VGroup(
            Text("a²", font_size=36, color=WHITE),
            Text("+ ab", font_size=36, color=ORANGE_RETENUE),
            Text("− ab", font_size=36, color=ORANGE_RETENUE),
            Text("− b²", font_size=36, color=WHITE),
        ).arrange(RIGHT, buff=0.28).move_to([0, 0.95, 0])
        self.play(FadeIn(termes))

        barres = VGroup(*[
            Line(t.get_corner(DL) + LEFT * 0.05, t.get_corner(UR) + RIGHT * 0.05,
                 color=ROUGE_ERREUR, stroke_width=5)
            for t in (termes[1], termes[2])
        ])
        self.play(Create(barres[0]), Create(barres[1]))

        annule = Text("les deux ab s'annulent", font_size=27, color=ORANGE_RETENUE)
        annule.next_to(termes, DOWN, buff=0.3)
        self.play(FadeIn(annule))

        chute_deux = Text("DEUX termes, pas trois", font_size=34, color=VERT_OK)
        chute_deux.move_to([0, -0.55, 0])
        self.play(Write(chute_deux))

        ex = VGroup(
            Text("(x − 3)(x + 3)", font_size=38, color=JAUNE_TITRE),
            Text("=", font_size=38, color=WHITE),
            Text("x² − 9", font_size=38, color=VERT_OK),
        ).arrange(RIGHT, buff=0.28).move_to([0, -1.9, 0])
        self.play(FadeIn(ex, shift=UP * 0.15))
        self.attendre_voix()

    # ── écran 4 : ir_application, les deux sens ─────────────────────────────

    def ecran_deux_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-deux-sens")
        self.titre_ecran("Elles se lisent dans les DEUX sens")

        gauche = Text("(x − 3)(x + 3)", font_size=40, color=BLEU_CALCUL).move_to([-3.3, 0.9, 0])
        droite = Text("x² − 9", font_size=40, color=VERT_OK).move_to([3.3, 0.9, 0])
        self.play(FadeIn(gauche), FadeIn(droite))

        fl_dev = Arrow([-1.5, 1.25, 0], [1.9, 1.25, 0], buff=0.1,
                       color=BLEU_CALCUL, stroke_width=4)
        lab_dev = Text("DÉVELOPPER", font_size=26, color=BLEU_CALCUL)
        lab_dev.next_to(fl_dev, UP, buff=0.12)
        self.play(Create(fl_dev), FadeIn(lab_dev))

        fl_fac = Arrow([1.9, 0.5, 0], [-1.5, 0.5, 0], buff=0.1,
                       color=ORANGE_RETENUE, stroke_width=4)
        lab_fac = Text("FACTORISER", font_size=26, color=ORANGE_RETENUE)
        lab_fac.next_to(fl_fac, DOWN, buff=0.12)
        self.play(Create(fl_fac), FadeIn(lab_fac))
        self.wait(0.5)

        cle = VGroup(
            Text("Quand tu vois  x² − 9", font_size=32, color=WHITE),
            Text("tu dois RECONNAÎTRE une différence de carrés", font_size=30, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.35).move_to([0, -1.35, 0])
        for m in cle:
            self.play(Write(m), run_time=0.8)

        self.play(Write(self.chute("Savoir dans quel sens on va : la moitié du travail.")))
        self.attendre_voix()

    # ── écran 5 : ir_calcul_mental ──────────────────────────────────────────

    def ecran_calcul_mental(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-calcul-mental")
        self.titre_ecran("99², de tête")

        etape = VGroup(
            Text("99 = 100 − 1", font_size=38, color=JAUNE_TITRE),
            Text("un nombre rond, moins un tout petit", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.0, 0])
        self.play(FadeIn(etape[0]), FadeIn(etape[1]))
        self.wait(0.4)

        lignes = VGroup(
            Text("100²", font_size=34, color=BLEU_CALCUL),
            Text("= 10 000", font_size=34, color=WHITE),
            Text("− 2 × 100 × 1", font_size=34, color=ORANGE_RETENUE),
            Text("= − 200", font_size=34, color=WHITE),
            Text("+ 1²", font_size=34, color=VERT_OK),
            Text("= + 1", font_size=34, color=WHITE),
        )
        for i in range(0, 6, 2):
            paire = VGroup(lignes[i], lignes[i + 1]).arrange(RIGHT, buff=0.5)
            paire.move_to([0, 0.85 - (i / 2) * 0.75, 0])
            self.play(FadeIn(paire, shift=RIGHT * 0.2), run_time=0.5)

        res = Text("9 801", font_size=52, color=VERT_OK).move_to([0, -1.85, 0])
        self.play(GrowFromCenter(res), Flash(res, color=VERT_OK, line_length=0.3))

        self.play(Write(self.chute("Sans poser l'opération.")))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = Text("Factorise :", font_size=32, color=WHITE).move_to([0, 1.9, 0])
        self.play(Write(consigne))

        expr = Text("(x + 3)² − 25", font_size=54, color=JAUNE_TITRE).move_to([0, 0.85, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.2))
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.3))

        indice = VGroup(
            Text("Deux étapes.", font_size=30, color=BLEU_CALCUL),
            Text("La première : quelle identité se cache là-dedans ?", font_size=27, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.25).move_to([0, -0.75, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-correction")
        self.titre_ecran("Correction")

        e1 = Text("1. Je reconnais : 25 = 5²", font_size=30, color=VERT_OK).move_to([0, 2.15, 0])
        self.play(Write(e1))

        forme = VGroup(
            Text("(x + 3)²", font_size=34, color=BLEU_CALCUL),
            Text("−", font_size=34, color=WHITE),
            Text("5²", font_size=34, color=VERT_OK),
            Text("→  a² − b²", font_size=30, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.3).move_to([0, 1.35, 0])
        self.play(FadeIn(forme, shift=RIGHT * 0.15))

        avec = Text("avec  a = x + 3   et   b = 5", font_size=28, color=WHITE)
        avec.move_to([0, 0.7, 0])
        self.play(FadeIn(avec))

        e2 = Text("2. J'applique : (a − b)(a + b)", font_size=30, color=VERT_OK)
        e2.move_to([0, -0.1, 0])
        self.play(Write(e2))

        etape = Text("(x + 3 − 5)(x + 3 + 5)", font_size=36, color=WHITE).move_to([0, -0.95, 0])
        self.play(FadeIn(etape, shift=UP * 0.15))

        final = Text("(x − 2)(x + 8)", font_size=46, color=VERT_OK).move_to([0, -2.0, 0])
        self.play(FadeIn(final, shift=UP * 0.2))
        self.play(Circumscribe(final, color=VERT_OK, buff=0.22))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les identités remarquables",
            accroche="(3 + 4)², est-ce que ça fait 3² + 4² ?",
            promesse="Développer · factoriser · calculer de tête",
        )
        self.page_objectifs([
            "développer sans oublier le double produit",
            "les lire à l'envers, pour factoriser",
            "calculer 99² de tête",
        ])
        self.ecran_carre_somme()
        self.ecran_carre_difference()
        self.ecran_difference_carres()
        self.ecran_deux_sens()
        self.ecran_calcul_mental()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "(a + b)² a TROIS termes : le double produit 2ab au milieu",
                "(a − b)(a + b) = a² − b² : deux termes seulement",
                "les trois identités se lisent dans les deux sens",
            ],
            rappel="(a + b)² n'est JAMAIS a² + b². Teste sur 3 et 4 : 49, pas 25.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LES TROIS SHORTS — un micro chacun, trois accroches différentes.
#  ⭐ C'est le format qui porte : sur les premières mesures de la chaîne, un
#  short fait 50 à 175 fois les vues d'une vidéo longue.
#  Rendu : -r 1080,1920
# ══════════════════════════════════════════════════════════════════════════════

class IdentitesRemarquables2deShortDoubleProduit(ShortSeconde):
    """L'ERREUR — micro `ir_carre_somme`. (3+4)² vaut-il 3² + 4² ?"""

    dossier_voix = VOIX_DP

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        haut = Text("(3 + 4)²", font_size=54, color=JAUNE_TITRE).move_to([0, 2.0, 0])
        eg = Text("=", font_size=44, color=WHITE).move_to([0, 1.1, 0])
        bas = Text("3² + 4² ?", font_size=54, color=JAUNE_TITRE).move_to([0, 0.3, 0])
        self.play(FadeIn(haut, shift=DOWN * 0.15), run_time=0.4)
        self.play(FadeIn(eg), FadeIn(bas), run_time=0.4)
        self.play(Flash(bas, color=JAUNE_TITRE, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_gauche(self):
        self.clear()
        self.margo_bas()
        self.dire("01-gauche")
        self.play(Write(Text("À gauche", font_size=34, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        suite = VGroup(
            Text("3 + 4 = 7", font_size=40, color=WHITE),
            Text("7² = 49", font_size=52, color=VERT_OK),
        ).arrange(DOWN, buff=0.55).move_to([0, 1.2, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=0.4)

    def ecran_droite(self):
        self.clear()
        self.margo_bas()
        self.dire("02-droite")
        self.play(Write(Text("À droite", font_size=34, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        suite = VGroup(
            Text("3² = 9", font_size=38, color=WHITE),
            Text("4² = 16", font_size=38, color=WHITE),
            Text("9 + 16 = 25", font_size=48, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.45).move_to([0, 1.2, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix(marge=0.4)

    def ecran_verdict(self):
        self.clear()
        self.margo_bas()
        self.dire("03-verdict")
        choc = Text("49 ≠ 25", font_size=84, color=ROUGE_ERREUR).move_to([0, 1.9, 0])
        self.play(GrowFromCenter(choc))
        self.play(Flash(choc, color=ROUGE_ERREUR, line_length=0.45))
        manque = VGroup(
            Text("il manque", font_size=34, color=WHITE),
            Text("24", font_size=72, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.3).move_to([0, -0.3, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in manque], lag_ratio=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("04-regle")
        self.play(Write(Text("Le DOUBLE PRODUIT", font_size=34, color=JAUNE_TITRE).move_to([0, 3.05, 0])))

        bloc = VGroup(
            Text("(a + b)²", font_size=42, color=WHITE),
            Text("a² + 2ab + b²", font_size=38, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.6, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.play(Flash(bloc[1], color=VERT_OK, line_length=0.3))

        rappel = VGroup(
            Text("2 × 3 × 4 = 24", font_size=36, color=ORANGE_RETENUE),
            Text("TROIS termes,", font_size=32, color=WHITE),
            Text("jamais deux", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.25).move_to([0, -1.0, 0])
        self.play(FadeIn(rappel, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_gauche()
        self.ecran_droite()
        self.ecran_verdict()
        self.ecran_regle()
        self.ecran_renvoi()


class IdentitesRemarquables2deShortDifference(ShortSeconde):
    """LE GESTE — micro `ir_difference_carres`. Factoriser x² − 9."""

    dossier_voix = VOIX_DIFF

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = Text("x² − 9", font_size=92, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.45)
        q = VGroup(
            Text("comment on", font_size=34, color=WHITE),
            Text("factorise ?", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.4, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_reconnaitre(self):
        self.clear()
        self.margo_bas()
        self.dire("01-reconnaitre")
        self.play(Write(Text("Reconnaître", font_size=36, color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        suite = VGroup(
            Text("9 = 3²", font_size=52, color=VERT_OK),
            Text("donc", font_size=30, color=WHITE),
            Text("un carré", font_size=38, color=BLEU_CALCUL),
            Text("moins un carré", font_size=38, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.2, 0])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        self.attendre_voix(marge=0.4)

    def ecran_formule(self):
        self.clear()
        self.margo_bas()
        self.dire("02-formule")
        bloc = VGroup(
            Text("a² − b²", font_size=52, color=WHITE),
            Text("=", font_size=42, color=WHITE),
            Text("(a − b)(a + b)", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.5, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.32, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.play(Flash(bloc[2], color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=0.4)

    def ecran_appliquer(self):
        self.clear()
        self.margo_bas()
        self.dire("03-appliquer")
        self.play(Write(Text("On applique", font_size=36, color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        avec = Text("a = x   et   b = 3", font_size=34, color=BLEU_CALCUL).move_to([0, 2.1, 0])
        self.play(FadeIn(avec))
        res = VGroup(
            Text("x² − 9", font_size=48, color=WHITE),
            Text("=", font_size=40, color=WHITE),
            Text("(x − 3)(x + 3)", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, 0.35, 0])
        for m in res:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        self.play(Circumscribe(res[2], color=VERT_OK, buff=0.2))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("04-piege")
        self.play(Write(Text("⚠ Le piège".replace("⚠ ", ""), font_size=36, color=ROUGE_ERREUR).move_to([0, 3.05, 0])))

        bloc = VGroup(
            Text("x² + 9", font_size=52, color=WHITE),
            Text("ne se factorise", font_size=30, color=ROUGE_ERREUR),
            Text("PAS", font_size=44, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.28).move_to([0, 1.4, 0])
        cadre = SurroundingRectangle(bloc, color=ROUGE_ERREUR, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))

        note = VGroup(
            Text("le signe MOINS", font_size=32, color=JAUNE_TITRE),
            Text("est la condition", font_size=32, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.0, 0])
        self.play(FadeIn(note, shift=UP * 0.15))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_reconnaitre()
        self.ecran_formule()
        self.ecran_appliquer()
        self.ecran_piege()
        self.ecran_renvoi()


class IdentitesRemarquables2deShortCalculMental(ShortSeconde):
    """LE TOUR DE FORCE — micro `ir_calcul_mental`. 99² de tête."""

    dossier_voix = VOIX_CM

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        expr = Text("99²", font_size=120, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.15), run_time=0.45)
        q = VGroup(
            Text("de tête", font_size=40, color=WHITE),
            Text("en 3 secondes", font_size=36, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.22).move_to([0, 0.3, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_astuce(self):
        self.clear()
        self.margo_bas()
        self.dire("01-astuce")
        self.play(Write(Text("L'astuce", font_size=36, color=JAUNE_TITRE).move_to([0, 3.05, 0])))
        bloc = VGroup(
            Text("99", font_size=64, color=WHITE),
            Text("=", font_size=44, color=WHITE),
            Text("100 − 1", font_size=64, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.4)
        note = Text("un nombre rond,", font_size=30, color=BLEU_CALCUL).move_to([0, -0.75, 0])
        note2 = Text("moins un tout petit", font_size=30, color=BLEU_CALCUL).move_to([0, -1.2, 0])
        self.play(FadeIn(note), FadeIn(note2))
        self.attendre_voix(marge=0.4)

    def ecran_formule(self):
        self.clear()
        self.margo_bas()
        self.dire("02-formule")
        bloc = VGroup(
            Text("(a − b)²", font_size=52, color=WHITE),
            Text("=", font_size=40, color=WHITE),
            Text("a² − 2ab + b²", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.32).move_to([0, 1.5, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.3, stroke_width=3)
        self.play(FadeIn(bloc), Create(cadre))
        self.attendre_voix(marge=0.4)

    def ecran_calcul(self):
        self.clear()
        self.margo_bas()
        self.dire("03-calcul")
        lignes = VGroup(
            Text("10 000", font_size=52, color=WHITE),
            Text("− 200", font_size=48, color=ORANGE_RETENUE),
            Text("+ 1", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.34).move_to([0, 1.9, 0])
        for m in lignes:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        trait = Line(LEFT * 1.3, RIGHT * 1.3, color=WHITE, stroke_width=3).move_to([0, 0.35, 0])
        self.play(Create(trait))
        res = Text("9 801", font_size=76, color=VERT_OK).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(res), Flash(res, color=VERT_OK, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_autre(self):
        self.clear()
        self.margo_bas()
        self.dire("04-autre")
        self.play(Write(Text("Et 101² ?", font_size=44, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        lignes = VGroup(
            Text("10 000", font_size=48, color=WHITE),
            Text("+ 200", font_size=44, color=ORANGE_RETENUE),
            Text("+ 1", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.6, 0])
        for m in lignes:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.4)
        res = Text("10 201", font_size=68, color=VERT_OK).move_to([0, -0.5, 0])
        self.play(GrowFromCenter(res))
        self.play(Write(self.chute("Tous les nombres proches d'un rond.",
                                   color=BLEU_CALCUL, font_size=24)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_astuce()
        self.ecran_formule()
        self.ecran_calcul()
        self.ecran_autre()
        self.ecran_renvoi()
