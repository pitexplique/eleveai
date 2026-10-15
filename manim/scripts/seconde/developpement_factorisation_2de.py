# developpement_factorisation_2de.py
# EleveAI — Maths seconde — Développement et factorisation
# (notionId : developpement_factorisation_2de)
#
# ⭐ 21/09/2026 : la leçon paysage qui manquait, faite « pour faire le lien »
# (Frédéric). La fiche de cours existe depuis le 10/09/2026
# (`lib/fiches/maths-seconde-devfac.tsx`) ; la feuille d'exercices est en ligne
# depuis le 21/09. La vidéo reprend les exemples de la FICHE, tels quels :
# (3x + 2)(x + 5), 7 − (2x + 5), 6x² + 9x, 5x² − 20x = 0, x² − 36 = 0 ; le défi
# est son dernier exercice d'entraînement (4x² + 8x = 0).
#
# ⭐⭐ LE FIL, CELUI DE FRÉDÉRIC (10/09/2026) : « surtout explique bien que c'est
# pour RÉSOUDRE une équation produit nul ». On factorise parce qu'un produit nul
# se résout, et qu'une somme ne se résout pas.
#
# Briques communes : `manim/gabarit_seconde.py`.
#
# Mapping micro-compétences (5 micros, TOUS couverts) → écrans :
# - devfac_developper_simple   → écrans 1 et 3 (le moins devant la parenthèse)
# - devfac_developper_double   → écran 2 (quatre produits, dessinés en rectangle)
# - devfac_facteur_commun      → écran 4
# - devfac_factoriser_identite → écran 6 (x² − 36)
# - devfac_choisir_forme       → écran 5 (le produit nul), défi
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/developpement_factorisation_2de.py DevFac2de -o eleveai-maths-seconde-developpement-factorisation --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde

VOIX = SONS / "seconde-developpement-factorisation"


class DevFac2de(NotionSeconde):

    dossier_voix = VOIX

    def ligne(self, gauche, droite, note, y, couleur=WHITE, font_size=36):
        """Une ligne de calcul « gauche = droite », et sa note à droite."""
        l = Text(f"{gauche}  =  {droite}", font_size=font_size, color=couleur).move_to([-1.2, y, 0])
        n = Text(note, font_size=24, color=BLEU_CALCUL).next_to(l, RIGHT, buff=0.6)
        return l, n

    # ── écran 1 : deux écritures, deux sens ─────────────────────────────────

    def ecran_deux_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-deux-sens")
        self.titre_ecran("Deux écritures, deux sens")

        produit = Text("3(x + 2)", font_size=54, color=BLEU_CALCUL).move_to([-3.4, 0.9, 0])
        somme = Text("3x + 6", font_size=54, color=VERT_OK).move_to([3.4, 0.9, 0])
        self.play(FadeIn(produit), FadeIn(somme))
        haut = Arrow([-1.6, 1.35, 0], [1.6, 1.35, 0], buff=0, color=VERT_OK, stroke_width=5)
        bas = Arrow([1.6, 0.45, 0], [-1.6, 0.45, 0], buff=0, color=BLEU_CALCUL, stroke_width=5)
        t_haut = Text("développer", font_size=28, color=VERT_OK).next_to(haut, UP, buff=0.12)
        t_bas = Text("factoriser", font_size=28, color=BLEU_CALCUL).next_to(bas, DOWN, buff=0.12)
        self.play(GrowArrow(haut), FadeIn(t_haut))
        self.play(GrowArrow(bas), FadeIn(t_bas))

        noms = VGroup(
            Text("un PRODUIT", font_size=30, color=BLEU_CALCUL).move_to([-3.4, -0.35, 0]),
            Text("une SOMME", font_size=30, color=VERT_OK).move_to([3.4, -0.35, 0]),
        )
        self.play(FadeIn(noms))
        self.play(Write(self.chute("Le même nombre, deux formes. On choisit selon la question.")))
        self.attendre_voix()

    # ── écran 2 : développer un produit double ──────────────────────────────

    def ecran_double(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-double")
        self.titre_ecran("Développer : chacun avec chacun")

        depart = Text("(3x + 2)(x + 5)", font_size=44, color=JAUNE_TITRE).move_to([0, 2.15, 0])
        self.play(FadeIn(depart, shift=DOWN * 0.15))

        # Le rectangle découpé : les quatre produits sont quatre aires.
        x0, y0, lx, l2, hx, h5 = -4.9, -1.6, 2.4, 1.2, 1.2, 1.7
        cases = [
            ((x0, y0 + h5), lx, hx, "3x²", BLEU_CALCUL),
            ((x0 + lx, y0 + h5), l2, hx, "2x", VERT_OK),
            ((x0, y0), lx, h5, "15x", VERT_OK),
            ((x0 + lx, y0), l2, h5, "10", ORANGE_RETENUE),
        ]
        rects = VGroup()
        for (x, y), w, h, t, c in cases:
            r = Rectangle(width=w, height=h, color=c, fill_opacity=0.25, stroke_width=3)
            r.move_to([x + w / 2, y + h / 2, 0])
            rects.add(VGroup(r, Text(t, font_size=30, color=WHITE).move_to(r.get_center())))
        cotes = VGroup(
            Text("3x", font_size=24, color=WHITE).move_to([x0 + lx / 2, y0 + h5 + hx + 0.25, 0]),
            Text("+2", font_size=24, color=WHITE).move_to([x0 + lx + l2 / 2, y0 + h5 + hx + 0.25, 0]),
            Text("x", font_size=24, color=WHITE).move_to([x0 - 0.3, y0 + h5 + hx / 2, 0]),
            Text("+5", font_size=24, color=WHITE).move_to([x0 - 0.35, y0 + h5 / 2, 0]),
        )
        self.play(FadeIn(cotes))
        for r in rects:
            self.play(FadeIn(r), run_time=0.45)

        res = VGroup(
            Text("3x² + 15x + 2x + 10", font_size=34, color=WHITE),
            Text("= 3x² + 17x + 10", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to([2.9, -0.2, 0])
        self.play(FadeIn(res[0], shift=LEFT * 0.15))
        self.play(FadeIn(res[1], shift=LEFT * 0.15))
        self.play(Circumscribe(res[1], color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("Quatre produits, puis on regroupe les termes en x.")))
        self.attendre_voix()

    # ── écran 3 : ⛔ le moins devant la parenthèse ───────────────────────────

    def ecran_moins(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-moins")
        self.titre_ecran("Le moins devant la parenthèse")

        l0 = Text("7 − (2x + 5)", font_size=48, color=JAUNE_TITRE).move_to([0, 2.05, 0])
        self.play(FadeIn(l0))

        faux = Text("7 − 2x + 5", font_size=40, color=ROUGE_ERREUR).move_to([-3.2, 0.7, 0])
        barre = Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        juste = Text("7 − 2x − 5", font_size=40, color=VERT_OK).move_to([3.2, 0.7, 0])
        self.play(FadeIn(faux))
        self.play(Create(barre))
        self.play(FadeIn(juste))
        fin = Text("= −2x + 2", font_size=44, color=VERT_OK).move_to([3.2, -0.3, 0])
        self.play(FadeIn(fin, shift=UP * 0.12))

        verif = Text("avec x = 0 :  7 − 5 = 2, et non 12", font_size=28, color=BLEU_CALCUL).move_to([0, -1.5, 0])
        self.play(FadeIn(verif, shift=UP * 0.15))

        self.play(Write(self.chute("Le moins change le signe de TOUS les termes.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 4 : devfac_facteur_commun ─────────────────────────────────────

    def ecran_commun(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-commun")
        self.titre_ecran("Factoriser : chercher le commun")

        l0 = Text("6x² + 9x", font_size=48, color=JAUNE_TITRE).move_to([0, 2.05, 0])
        self.play(FadeIn(l0))
        decomp = VGroup(
            Text("6x² = 3x × 2x", font_size=36, color=WHITE),
            Text("9x = 3x × 3", font_size=36, color=WHITE),
        ).arrange(DOWN, buff=0.3).move_to([0, 0.75, 0])
        self.play(FadeIn(decomp, shift=UP * 0.12))
        commun = Text("3x est dans les deux", font_size=30, color=BLEU_CALCUL).move_to([0, -0.35, 0])
        self.play(Write(commun))
        res = Text("6x² + 9x = 3x(2x + 3)", font_size=44, color=VERT_OK).move_to([0, -1.35, 0])
        self.play(FadeIn(res, shift=UP * 0.12))
        self.play(Circumscribe(res, color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("On vérifie en redéveloppant : 10 secondes.")))
        self.attendre_voix()

    # ── écran 5 : ⭐ le produit nul ──────────────────────────────────────────

    def ecran_produit_nul(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-produit-nul")
        self.titre_ecran("Pourquoi on factorise : RÉSOUDRE")

        regle = Text("Un produit est nul si l'un de ses facteurs est nul.",
                     font_size=30, color=JAUNE_TITRE).move_to([0, 2.2, 0])
        self.play(Write(regle))

        l1, n1 = self.ligne("5x² − 20x", "0", "l'équation", 1.2)
        l2, n2 = self.ligne("5x(x − 4)", "0", "je factorise", 0.3, BLEU_CALCUL)
        self.play(FadeIn(l1), FadeIn(n1))
        self.play(FadeIn(l2), FadeIn(n2))
        sol = Text("5x = 0  ou  x − 4 = 0", font_size=34, color=WHITE).move_to([0, -0.6, 0])
        rep = Text("x = 0  ou  x = 4", font_size=44, color=VERT_OK).move_to([0, -1.45, 0])
        self.play(FadeIn(sol, shift=UP * 0.12))
        self.play(FadeIn(rep, shift=UP * 0.12))
        self.play(Circumscribe(rep, color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("Diviser par x ? On PERDRAIT la solution 0.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 6 : devfac_factoriser_identite ────────────────────────────────

    def ecran_identite(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-identite")
        self.titre_ecran("Factoriser avec une identité")

        l1, n1 = self.ligne("x² − 36", "0", "a² − b², avec a = x et b = 6", 1.6)
        l2, n2 = self.ligne("(x − 6)(x + 6)", "0", "c'est un produit", 0.55, BLEU_CALCUL)
        self.play(FadeIn(l1), FadeIn(n1))
        self.play(FadeIn(l2), FadeIn(n2))
        rep = Text("x = 6  ou  x = −6", font_size=44, color=VERT_OK).move_to([0, -0.6, 0])
        self.play(FadeIn(rep, shift=UP * 0.12))
        self.play(Circumscribe(rep, color=VERT_OK, buff=0.15))
        oubli = Text("« x = 6 » tout seul : il manque la moitié", font_size=28,
                     color=ORANGE_RETENUE).move_to([0, -1.55, 0])
        self.play(FadeIn(oubli))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))
        self.play(Write(Text("Résous :", font_size=32, color=WHITE).move_to([0, 1.9, 0])))
        expr = Text("4x² + 8x = 0", font_size=62, color=JAUNE_TITRE).move_to([0, 0.8, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.2))
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.3))
        self.play(FadeIn(Text("Combien de solutions ?", font_size=32,
                              color=BLEU_CALCUL).move_to([0, -0.6, 0]), shift=UP * 0.15))
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")
        l1, n1 = self.ligne("4x² + 8x", "0", "", 2.0)
        l2, n2 = self.ligne("4x(x + 2)", "0", "le commun : 4x", 1.0, BLEU_CALCUL)
        self.play(FadeIn(l1))
        self.play(FadeIn(l2), FadeIn(n2))
        sol = Text("4x = 0  ou  x + 2 = 0", font_size=34, color=WHITE).move_to([0, 0.0, 0])
        rep = Text("x = 0  ou  x = −2", font_size=46, color=VERT_OK).move_to([0, -1.0, 0])
        self.play(FadeIn(sol, shift=UP * 0.12))
        self.play(FadeIn(rep, shift=UP * 0.12))
        self.play(Circumscribe(rep, color=VERT_OK, buff=0.15))
        self.play(Write(self.chute("Deux solutions. Et 0 en fait partie.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Développer et factoriser",
            accroche="5x² = 20x : tu divises par x ?",
            promesse="Développer · factoriser · résoudre",
        )
        self.page_objectifs([
            "développer un produit, sans perdre un signe",
            "factoriser avec un facteur commun ou une identité",
            "résoudre une équation produit nul",
        ])
        self.ecran_deux_sens()
        self.ecran_double()
        self.ecran_moins()
        self.ecran_commun()
        self.ecran_produit_nul()
        self.ecran_identite()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "développer : chacun avec chacun, et le moins change tous les signes",
                "factoriser : sortir ce qui est commun, ou reconnaître a² − b²",
                "un produit nul : on factorise pour résoudre",
            ],
            rappel="On ne divise jamais par x : on factorise, sinon on perd une solution.",
        )
        self.page_abonnement()
