# reels_intervalles.py
# EleveAI — Maths seconde — Nombres réels, intervalles et valeur absolue
# (notionId : reels_intervalles)
#
# ⭐ 21/09/2026 : la première vidéo d'une notion qui avait déjà sa fiche de cours
# ET sa feuille d'exercices en ligne le même jour. Mêmes exemples que la fiche
# `lib/fiches/maths-seconde-reels.tsx` ; le défi est son exemple 4.
# Frédéric enseigne la valeur absolue en début d'année : c'est la vidéo de sa
# seconde de cette semaine.
#
# Briques communes : `manim/gabarit_seconde.py`.
#
# Mapping micro-compétences (6 micros, TOUS couverts) → écrans :
# - reels_ensembles         → écran 1 (les ensembles emboîtés, décimal ou pas)
# - reels_droite_graduee    → écrans 2 à 6 (tout se lit sur la droite)
# - intervalle_representer  → écran 2 (le crochet dans le bon sens)
# - intervalle_appartenance → écran 2 (4 est exclu, 3,99 est dedans)
# - valeur_absolue_distance → écrans 3 à 6, défi
# - reels_encadrement       → écran 1 (voix : √3 entre 1,7 et 1,8)
#
# ⛔ LA VALEUR ABSOLUE SE RÉSOUT PAR LA DISTANCE, sur la droite ou par le calcul,
# jamais sur une courbe (Frédéric, 04/09/2026).
# ⛔ Les crochets sont DESSINÉS (pas de LaTeX) et tournés comme on les écrit :
# borne comprise, vers l'intérieur ; exclue, vers l'extérieur. Même règle que
# l'option `intervalles` du canvas `number_line` du site.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/seconde/reels_intervalles.py ReelsIntervalles2de -o eleveai-maths-seconde-reels-intervalles --media_dir manim/scripts/seconde/media
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/seconde/reels_intervalles.py ReelsIntervalles2deShortDistance -o eleveai-maths-seconde-reels-intervalles-short-distance --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, NotionSeconde, ShortSeconde

VOIX = SONS / "seconde-reels-intervalles"
VOIX_DIST = SONS / "seconde-reels-intervalles-short-distance"


class OutilsDroite:
    """La droite graduée et ses crochets, sans LaTeX."""

    def droite(self, xmin, xmax, longueur, y=0.0, font_size=24):
        axe = NumberLine(
            x_range=[xmin, xmax, 1], length=longueur,
            include_numbers=True, label_constructor=Text, font_size=font_size,
            color=WHITE,
        )
        return axe.move_to([0, y, 0])

    def crochet(self, axe, valeur, sens, couleur=VERT_OK, haut=0.36, bas=0.12, b=0.16):
        """`sens` = +1 : les becs vers la droite ; −1 : vers la gauche.
        Borne GAUCHE : comprise → +1 ; exclue → −1.
        Borne DROITE : comprise → −1 ; exclue → +1.
        ⚠️ VU AU RENDU (21/09) : symétrique (±0,32), le crochet descendait sur
        les nombres de la graduation et cachait justement la borne. Il monte
        haut et descend à peine."""
        p = axe.n2p(valeur)
        c = VMobject(stroke_color=couleur, stroke_width=6)
        c.set_points_as_corners([
            p + [sens * b, haut, 0], p + [0, haut, 0], p + [0, -bas, 0], p + [sens * b, -bas, 0],
        ])
        return c

    def bande(self, axe, a, b, couleur=VERT_OK):
        return Line(axe.n2p(a), axe.n2p(b), color=couleur, stroke_width=14, stroke_opacity=0.55)

    def point(self, axe, valeur, etiquette, couleur=BLEU_CALCUL, font_size=28):
        d = Dot(axe.n2p(valeur), radius=0.1, color=couleur)
        t = Text(etiquette, font_size=font_size, color=couleur).next_to(d, UP, buff=0.22)
        return VGroup(d, t)

    def saut(self, axe, a, b, texte, couleur=ORANGE_RETENUE):
        """Un arc au-dessus de la droite, de a à b, avec sa longueur écrite.
        ⚠️ Toujours tracé de gauche à droite : avec un angle négatif, un arc
        tracé de droite à gauche passerait SOUS la droite."""
        a, b = min(a, b), max(a, b)
        arc = ArcBetweenPoints(axe.n2p(a) + UP * 0.12, axe.n2p(b) + UP * 0.12,
                               angle=-PI / 2.2, color=couleur, stroke_width=4)
        t = Text(texte, font_size=26, color=couleur).next_to(arc, UP, buff=0.08)
        return VGroup(arc, t)


class ReelsIntervalles2de(OutilsDroite, NotionSeconde):

    dossier_voix = VOIX

    # ── écran 1 : reels_ensembles ───────────────────────────────────────────

    def ecran_ensembles(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-ensembles")
        self.titre_ecran("Cinq ensembles, l'un dans l'autre")

        # Des boîtes emboîtées, alignées en bas à gauche : chaque ensemble
        # CONTIENT le précédent. L'étiquette et un exemple vivent dans la bande
        # que chaque boîte ajoute à droite.
        # ⚠️ VU AU RENDU (21/09) : avec des bandes de 1,8, la plus grande boîte
        # allait jusqu'à x = 3,8 et la règle du décimal se posait SUR le « R ».
        # Bandes de 1,6 : la boîte s'arrête à 2,8, la règle a sa colonne.
        # ⚠️ 2e passe (même jour) : à 1,6 la règle touchait encore la boîte et
        # sortait du cadre à droite. 1,4, et la règle calée sur le bord droit.
        x0, y0, pas = -5.6, -2.35, 1.4
        noms = ["N", "Z", "D", "Q", "R"]
        exemples = ["12", "−6", "2,75", "5/7", "√3"]
        couleurs = [BLEU_CALCUL, VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, WHITE]
        boites = VGroup()
        for i in range(5):
            w, h = pas * (i + 1), 1.2 + 0.7 * i
            r = RoundedRectangle(width=w, height=h, corner_radius=0.15,
                                 color=couleurs[i], stroke_width=3)
            r.move_to([x0 + w / 2, y0 + h / 2, 0])
            nom = Text(noms[i], font_size=34, weight=BOLD, color=couleurs[i])
            nom.move_to([x0 + w - pas / 2, y0 + h - 0.36, 0])
            ex = Text(exemples[i], font_size=28, color=WHITE).move_to([x0 + w - pas / 2, y0 + 0.42, 0])
            boites.add(VGroup(r, nom, ex))
        for b in boites:
            self.play(Create(b[0]), FadeIn(b[1]), FadeIn(b[2]), run_time=0.6)

        regle = VGroup(
            Text("décimal : l'écriture s'arrête", font_size=24, color=JAUNE_TITRE),
            Text("9/20 = 0,45     1/6 = 0,1666…", font_size=24, color=WHITE),
        ).arrange(DOWN, buff=0.18, aligned_edge=LEFT).to_edge(RIGHT, buff=0.45).set_y(0.6)
        self.play(FadeIn(regle, shift=LEFT * 0.2))

        self.play(Write(self.chute("Chaque ensemble contient le précédent.")))
        self.attendre_voix()

    # ── écran 2 : intervalle_representer + intervalle_appartenance ──────────

    def ecran_intervalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-intervalle")
        self.titre_ecran("Un intervalle : un morceau de la droite")

        axe = self.droite(-1, 6, 9.0, y=0.4)
        self.play(Create(axe))
        bande = self.bande(axe, 1, 4)
        g = self.crochet(axe, 1, +1)   # 1 compris : tourné vers l'intérieur
        d = self.crochet(axe, 4, +1)   # 4 exclu : tourné vers l'extérieur
        self.play(Create(bande))
        self.play(Create(g), Create(d))

        ecrit = VGroup(
            Text("[ 1 ; 4 [", font_size=46, color=VERT_OK),
            Text("1 ≤ x < 4", font_size=40, color=WHITE),
        ).arrange(RIGHT, buff=1.2).move_to([0, 2.0, 0])
        self.play(FadeIn(ecrit, shift=DOWN * 0.15))

        notes = VGroup(
            Text("1 : compris", font_size=26, color=VERT_OK),
            Text("4 : exclu, mais 3,99 est dedans", font_size=26, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.2, aligned_edge=LEFT).move_to([0, -1.2, 0])
        self.play(FadeIn(notes, shift=UP * 0.15))

        self.play(Write(self.chute("Le crochet tourné vers le nombre le contient.")))
        self.attendre_voix()

    # ── écran 3 : valeur_absolue_distance ───────────────────────────────────

    def ecran_distance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-distance")
        self.titre_ecran("La valeur absolue est une distance")

        faux = Text("5 − 3 = 2", font_size=40, color=ROUGE_ERREUR).move_to([-3.2, 2.0, 0])
        barre = Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        juste = Text("|5 − (−3)| = 8", font_size=40, color=VERT_OK).move_to([2.6, 2.0, 0])
        self.play(FadeIn(faux))
        self.play(Create(barre))

        axe = self.droite(-4, 6, 9.5, y=-0.6)
        self.play(Create(axe))
        a = self.point(axe, -3, "−3", BLEU_CALCUL)
        b = self.point(axe, 5, "5", BLEU_CALCUL)
        self.play(FadeIn(a), FadeIn(b))
        s1 = self.saut(axe, -3, 0, "3")
        s2 = self.saut(axe, 0, 5, "5")
        self.play(Create(s1[0]), FadeIn(s1[1]))
        self.play(Create(s2[0]), FadeIn(s2[1]))
        self.play(FadeIn(juste, shift=LEFT * 0.2))
        self.play(Circumscribe(juste, color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("|a − b| : la distance entre a et b.")))
        self.attendre_voix()

    # ── écran 4 : ⛔ le piège du signe ───────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-piege")
        self.titre_ecran("Le piège : |x + 5|")

        lignes = VGroup(
            Text("|x − 5|", font_size=44, color=WHITE),
            Text("distance entre x et 5", font_size=32, color=BLEU_CALCUL),
            Text("|x + 5|  =  |x − (−5)|", font_size=44, color=WHITE),
            Text("distance entre x et −5", font_size=32, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.32).move_to([0, 0.55, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=UP * 0.12), run_time=0.55)
        self.play(Indicate(lignes[3], color=ORANGE_RETENUE))

        self.play(Write(self.chute("Un « plus » dans les barres : la distance à un NÉGATIF.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 5 : |x − a| = r ───────────────────────────────────────────────

    def ecran_equation(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-equation")
        self.titre_ecran("Résoudre |x − 6| = 2")

        axe = self.droite(2, 10, 9.0, y=-0.2)
        self.play(Create(axe))
        # ⚠️ Un point SANS étiquette : un « 6 » rouge au-dessus se coinçait sous
        # les deux arcs (vu au rendu) ; le 6 est déjà écrit sur la graduation.
        centre = Dot(axe.n2p(6), radius=0.12, color=ROUGE_ERREUR)
        self.play(FadeIn(centre))
        s1 = self.saut(axe, 6, 4, "2", VERT_OK)
        s2 = self.saut(axe, 6, 8, "2", VERT_OK)
        self.play(Create(s1[0]), FadeIn(s1[1]))
        self.play(Create(s2[0]), FadeIn(s2[1]))
        sols = VGroup(Dot(axe.n2p(4), radius=0.12, color=VERT_OK), Dot(axe.n2p(8), radius=0.12, color=VERT_OK))
        self.play(FadeIn(sols))

        rep = Text("x = 4  ou  x = 8", font_size=44, color=VERT_OK).move_to([0, 2.0, 0])
        self.play(FadeIn(rep, shift=DOWN * 0.15))
        self.play(Circumscribe(rep, color=VERT_OK, buff=0.18))

        self.play(Write(self.chute("DEUX solutions : une de chaque côté.")))
        self.attendre_voix()

    # ── écran 6 : |x − a| ≤ r ───────────────────────────────────────────────

    def ecran_inequation(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-inequation")
        self.titre_ecran("|x − 4| ≤ 1 : à moins de 1 de 4")

        axe = self.droite(0, 8, 9.0, y=-0.2)
        self.play(Create(axe))
        centre = self.point(axe, 4, "4", ROUGE_ERREUR)
        self.play(FadeIn(centre))
        self.play(Create(self.bande(axe, 3, 5)))
        self.play(Create(self.crochet(axe, 3, +1)), Create(self.crochet(axe, 5, -1)))

        rep = VGroup(
            Text("de 4 − 1 à 4 + 1", font_size=34, color=WHITE),
            Text("[ 3 ; 5 ]", font_size=48, color=VERT_OK),
        ).arrange(RIGHT, buff=1.0).move_to([0, 2.0, 0])
        self.play(FadeIn(rep, shift=DOWN * 0.15))

        self.play(Write(self.chute("Le centre, puis la même distance de chaque côté.")))
        self.attendre_voix()

    # ── défi ────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))
        self.play(Write(Text("Écris les solutions sous forme d'intervalle :",
                             font_size=30, color=WHITE).move_to([0, 1.9, 0])))
        expr = Text("|x + 1| < 3", font_size=60, color=JAUNE_TITRE).move_to([0, 0.8, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.2))
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.3))
        self.play(FadeIn(Text("Deux pièges : le centre, et les crochets.", font_size=30,
                              color=BLEU_CALCUL).move_to([0, -0.6, 0]), shift=UP * 0.15))
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")

        l1 = Text("|x + 1|  =  |x − (−1)|", font_size=36, color=WHITE).move_to([0, 2.1, 0])
        n1 = Text("le centre est −1, pas 1", font_size=26, color=ORANGE_RETENUE).move_to([0, 1.45, 0])
        self.play(FadeIn(l1))
        self.play(FadeIn(n1))

        axe = self.droite(-5, 3, 9.0, y=-0.3)
        self.play(Create(axe))
        self.play(FadeIn(self.point(axe, -1, "−1", ROUGE_ERREUR)))
        self.play(Create(self.bande(axe, -4, 2)))
        # Inégalité STRICTE : les deux bornes sont exclues, crochets à l'envers.
        self.play(Create(self.crochet(axe, -4, -1)), Create(self.crochet(axe, 2, +1)))

        rep = Text("] −4 ; 2 [", font_size=48, color=VERT_OK).move_to([0, -1.75, 0])
        self.play(FadeIn(rep, shift=UP * 0.15))
        self.play(Circumscribe(rep, color=VERT_OK, buff=0.18))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Réels, intervalles, valeur absolue",
            accroche="|x + 5| : la distance à 5, ou à −5 ?",
            promesse="Ranger · écrire un intervalle · mesurer un écart",
        )
        self.page_objectifs([
            "ranger un nombre dans son ensemble",
            "lire et écrire un intervalle, le crochet dans le bon sens",
            "utiliser la valeur absolue comme une distance",
        ])
        self.ecran_ensembles()
        self.ecran_intervalle()
        self.ecran_distance()
        self.ecran_piege()
        self.ecran_equation()
        self.ecran_inequation()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "chaque ensemble de nombres contient le précédent",
                "le crochet tourné vers le nombre le contient",
                "la valeur absolue |a − b| est la distance entre a et b",
            ],
            rappel="|x + 5| est la distance à −5 : un « plus » cache un nombre négatif.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LE SHORT : « la distance entre −3 et 5 fait 2 ? »
# ══════════════════════════════════════════════════════════════════════════════

class ReelsIntervalles2deShortDistance(OutilsDroite, ShortSeconde):
    """L'ERREUR — micro `valeur_absolue_distance`. Un short = un piège."""

    dossier_voix = VOIX_DIST

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        l1 = self.grand("Entre −3 et 5", font_size=60, color=WHITE).move_to([0, 2.3, 0])
        l2 = self.grand("la distance", font_size=56, color=JAUNE_TITRE).move_to([0, 1.2, 0])
        l3 = self.grand("fait 2 ?", font_size=80, color=JAUNE_TITRE).move_to([0, -0.05, 0])
        self.add(l1, l2, l3)  # ⭐ l'image de la 1re seconde porte déjà la question
        self.play(Flash(l3, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_erreur(self):
        self.clear()
        self.margo_bas()
        self.dire("01-erreur")
        self.play(Write(Text("Le réflexe", font_size=34, color=ROUGE_ERREUR).move_to([0, 3.0, 0])))
        faux = self.grand("5 − 3 = 2", font_size=64, color=ROUGE_ERREUR).move_to([0, 1.6, 0])
        self.play(FadeIn(faux))
        self.play(Create(Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=7)))
        self.play(Write(Text("c'est FAUX", font_size=42, color=ROUGE_ERREUR).move_to([0, 0.0, 0])))
        self.attendre_voix(marge=0.4)

    def ecran_droite(self):
        self.clear()
        self.margo_bas()
        self.dire("02-droite")
        self.play(Write(Text("On compte", font_size=36, color=JAUNE_TITRE).move_to([0, 3.0, 0])))
        axe = self.droite(-3, 5, 4.0, y=0.6, font_size=18)
        self.play(Create(axe))
        s1 = self.saut(axe, -3, 0, "3")
        s2 = self.saut(axe, 0, 5, "5")
        self.play(Create(s1[0]), FadeIn(s1[1]))
        self.play(Create(s2[0]), FadeIn(s2[1]))
        total = self.grand("3 + 5 = 8", font_size=60, color=VERT_OK).move_to([0, -0.9, 0])
        self.play(FadeIn(total, shift=UP * 0.15))
        self.play(Flash(total, color=VERT_OK, line_length=0.35))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("03-regle")
        bloc = VGroup(
            Text("la distance", font_size=34, color=WHITE),
            Text("|5 − (−3)|", font_size=52, color=JAUNE_TITRE),
            Text("= |8| = 8", font_size=52, color=VERT_OK),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.5, 0])
        for m in bloc:
            self.play(FadeIn(m, shift=UP * 0.12), run_time=0.45)
        note = VGroup(
            Text("moins un négatif", font_size=30, color=ORANGE_RETENUE),
            Text("= plus", font_size=34, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.15).move_to([0, -0.6, 0])
        self.play(Write(note))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_erreur()
        self.ecran_droite()
        self.ecran_regle()
        self.ecran_renvoi()
