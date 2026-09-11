# fractions.py
# EleveAI — « Les bases » — Les fractions
# LA VIDÉO LONGUE. Les huit shorts sont dans `fractions_shorts.py`.
#
# ⭐ SÉRIE SANS CLASSE (Frédéric, 11/09/2026). Les fractions traversent DOUZE
# classes du coach, du CE1 à la première spé — 103 micro-compétences — et rien
# ne les rassemblait. Cette vidéo vise le collégien, le lycéen ET l'étudiant qui
# révise.
# ⛔ Donc aucune étiquette de niveau nulle part : voir `manim/gabarit_bases.py`.
#
# ── LE PLAN, ET CE QUE FRÉDÉRIC Y A AJOUTÉ ────────────────────────────────────
# Son plan de départ : définition · jamais zéro · 3/3 = 1 · simplifier ·
# multiplier. J'y ai ajouté l'ADDITION — c'est là que ça casse, et c'est
# exactement le piège de la racine carrée : le produit passe tout droit, la
# somme non, et c'est PARCE QUE le premier est si simple qu'on se trompe sur le
# second.
# ⭐ Puis Frédéric a ajouté deux choses, les meilleures des deux :
#   · le DÉFI : 2/5 − 3/5 × 1/3. « Ils butent là-dessus. » Il apporte la
#     priorité des opérations, que le plan n'avait pas.
#     ⛔ PROVENANCE CORRIGÉE PAR FRÉDÉRIC (11/09) : cette question vient du
#     BREVET DES COLLÈGES, pas d'un test d'entrée à l'université — je l'avais
#     écrit sur trois écrans et dans deux voix. Une provenance est une
#     affirmation vérifiable : on ne la décore pas pour impressionner.
#   · fraction → décimale → pourcentage (1/5 = 0,2 = 20 %), « ils butent aussi
#     là-dessus ». Trois écritures du MÊME nombre — le prolongement exact de
#     l'idée d'ouverture : une fraction EST un nombre.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/fractions.py Fractions -o eleveai-maths-bases-fractions --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases
from gabarit_seconde import SONS

VOIX = SONS / "bases-fractions"


class Fractions(NotionBases):

    dossier_voix = VOIX

    # ── écran 1 : un partage, ET un nombre ─────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-definition")
        self.titre_ecran("Un partage… et un nombre")

        # Le partage : trois quarts d'un gâteau.
        gateau = self.disque(4, 3, rayon=1.15, centre=[-4.1, 0.75, 0])
        self.play(LaggedStart(*[FadeIn(s) for s in gateau], lag_ratio=0.18))

        f = self.fraction(3, 4, font_size=52, color=JAUNE_TITRE).move_to([-1.6, 0.75, 0])
        self.play(FadeIn(f, shift=RIGHT * 0.2))

        legende = VGroup(
            Text("4 : en combien de parts", font_size=26, color=BLEU_CALCUL),
            Text("3 : combien on en prend", font_size=26, color=VERT_OK),
        ).arrange(DOWN, buff=0.24).move_to([1.9, 0.75, 0])
        for m in legende:
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.45)

        # ⭐ LE SAUT QUE PEU FONT : c'est aussi un nombre, sur la droite.
        deuxieme = Text("et c'est aussi un NOMBRE", font_size=34, color=JAUNE_TITRE)
        deuxieme.move_to([0, -0.85, 0])
        self.play(Write(deuxieme))

        axe, marques = self.droite_fractions(
            [(0.75, "3/4", JAUNE_TITRE)], longueur=7.0, centre=[0, -2.1, 0])
        self.play(Create(axe))
        self.play(FadeIn(marques))
        self.attendre_voix()

    # ── écran 2 : jamais zéro en bas ───────────────────────────────────────

    def ecran_zero(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-zero")
        self.titre_ecran("Jamais zéro en bas")

        # Le partage impossible.
        impossible = VGroup(
            Text("couper un gâteau", font_size=30, color=WHITE),
            Text("en ZÉRO part ?", font_size=34, color=ROUGE_ERREUR),
            Text("ça ne veut rien dire", font_size=28, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.26).move_to([-3.6, 1.15, 0])
        self.play(FadeIn(impossible, shift=DOWN * 0.12))

        # L'explosion : plus le bas est petit, plus le résultat est grand.
        lignes = VGroup()
        for den, res in [("1/2", "2"), ("1/10", "10"), ("1/1000", "1000")]:
            lignes.add(VGroup(
                Text("1 ÷", font_size=30, color=WHITE),
                Text(den, font_size=30, color=BLEU_CALCUL),
                Text("=", font_size=30, color=WHITE),
                Text(res, font_size=32, color=VERT_OK),
            ).arrange(RIGHT, buff=0.28))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([3.0, 0.9, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.5)

        explose = Text("plus le bas est petit, plus le résultat explose",
                       font_size=28, color=ORANGE_RETENUE).move_to([0, -1.3, 0])
        if explose.width > 11.5:
            explose.scale_to_fit_width(11.5)
        self.play(Write(explose))

        interdit = VGroup(
            self.fraction("a", 0, font_size=44, color=ROUGE_ERREUR),
            Text("INTERDIT", font_size=38, color=ROUGE_ERREUR),
        ).arrange(RIGHT, buff=0.6).move_to([0, -2.35, 0])
        self.play(FadeIn(interdit), Flash(interdit[1], color=ROUGE_ERREUR, line_length=0.3))
        self.attendre_voix()

    # ── écran 3 : 3/3 = 4/4 = 1 ────────────────────────────────────────────

    def ecran_egales(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-egales")
        self.titre_ecran("Quand le haut et le bas sont égaux")

        gateaux = VGroup()
        for i, (parts, x) in enumerate([(3, -4.2), (4, -1.4), (8, 1.4)]):
            g = self.disque(parts, parts, rayon=0.95, centre=[x, 0.85, 0], couleur=VERT_OK)
            f = self.fraction(parts, parts, font_size=32, color=VERT_OK)
            f.next_to(g, DOWN, buff=0.3)
            gateaux.add(VGroup(g, f))
        for g in gateaux:
            self.play(FadeIn(g), run_time=0.5)

        egal = Text("=", font_size=44, color=WHITE).move_to([3.4, 0.85, 0])
        un = Text("1", font_size=72, color=JAUNE_TITRE).move_to([4.5, 0.85, 0])
        self.play(Write(egal), GrowFromCenter(un))
        self.play(Flash(un, color=JAUNE_TITRE, line_length=0.35))

        raison = Text("à chaque fois, tu prends TOUTES les parts",
                      font_size=32, color=VERT_OK).move_to([0, -1.6, 0])
        self.play(Write(raison))

        self.play(Write(self.chute("Un gâteau entier, quelle que soit la découpe.")))
        self.attendre_voix()

    # ── écran 4 : simplifier ───────────────────────────────────────────────

    def ecran_simplifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-simplifier")
        self.titre_ecran("Simplifier : la même part, écrite plus court")

        # ⭐ Les deux barres l'une sous l'autre : la surface est IDENTIQUE.
        b1 = self.barre_parts(8, 6, largeur=6.4, hauteur=0.75, centre=[-1.1, 1.35, 0])
        f1 = self.fraction(6, 8, font_size=36, color=WHITE)
        f1.next_to(b1, RIGHT, buff=0.6)
        self.play(Create(b1), FadeIn(f1))

        b2 = self.barre_parts(4, 3, largeur=6.4, hauteur=0.75, centre=[-1.1, 0.05, 0],
                              couleur=VERT_OK)
        f2 = self.fraction(3, 4, font_size=36, color=VERT_OK)
        f2.next_to(b2, RIGHT, buff=0.6)
        self.play(Create(b2), FadeIn(f2))

        meme = Text("la même surface coloriée", font_size=30, color=JAUNE_TITRE)
        meme.move_to([0, -0.95, 0])
        self.play(Write(meme))

        regle = VGroup(
            Text("je divise le haut ET le bas", font_size=30, color=WHITE),
            Text("par le même nombre", font_size=30, color=WHITE),
            Text("6 ÷ 2 = 3     8 ÷ 2 = 4", font_size=30, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.26).move_to([0, -2.1, 0])
        for m in regle:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.42)
        self.attendre_voix()

    # ── écran 5 : fraction → décimal → pourcentage ─────────────────────────

    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.dire("04b-ecritures")
        self.titre_ecran("Trois écritures du MÊME nombre")

        f = self.fraction(1, 5, font_size=52, color=JAUNE_TITRE).move_to([-4.0, 1.5, 0])
        fl1 = Arrow([-3.1, 1.5, 0], [-1.6, 1.5, 0], buff=0.1, color=BLEU_CALCUL, stroke_width=4)
        lab1 = Text("÷", font_size=26, color=BLEU_CALCUL).next_to(fl1, UP, buff=0.1)
        dec = Text("0,2", font_size=52, color=BLEU_CALCUL).move_to([-0.7, 1.5, 0])
        fl2 = Arrow([0.2, 1.5, 0], [1.7, 1.5, 0], buff=0.1, color=VERT_OK, stroke_width=4)
        lab2 = Text("× 100", font_size=26, color=VERT_OK).next_to(fl2, UP, buff=0.1)
        pct = Text("20 %", font_size=52, color=VERT_OK).move_to([3.1, 1.5, 0])

        self.play(FadeIn(f))
        self.play(Create(fl1), FadeIn(lab1), FadeIn(dec))
        self.play(Create(fl2), FadeIn(lab2), FadeIn(pct))

        # ⭐ Le même point sur la droite : c'est CELA qui prouve l'égalité.
        axe, marques = self.droite_fractions(
            [(0.2, "1/5 = 0,2 = 20 %", JAUNE_TITRE)], longueur=7.6, centre=[0, -0.25, 0])
        self.play(Create(axe))
        self.play(FadeIn(marques))

        piege = VGroup(
            Text("mais toutes ne s'écrivent pas en décimal :", font_size=27, color=ORANGE_RETENUE),
            Text("1/3  =  0,333…  et ça ne s'arrête jamais", font_size=30, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.26).move_to([0, -2.15, 0])
        for m in piege:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── écran 6 : multiplier ───────────────────────────────────────────────

    def ecran_multiplier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-multiplier")
        self.titre_ecran("Multiplier : ça passe TOUT DROIT")

        a = self.fraction(2, 3, font_size=44, color=BLEU_CALCUL)
        fois = Text("×", font_size=40, color=WHITE)
        b = self.fraction(3, 4, font_size=44, color=BLEU_CALCUL)
        eg = Text("=", font_size=40, color=WHITE)
        c = self.fraction(6, 12, font_size=44, color=VERT_OK)
        ligne = VGroup(a, fois, b, eg, c).arrange(RIGHT, buff=0.35).move_to([0, 1.3, 0])
        self.play(FadeIn(a), Write(fois), FadeIn(b))
        self.play(Write(eg), FadeIn(c, shift=RIGHT * 0.2))

        # Les deux flèches qui montrent le « tout droit ».
        fl_haut = Arrow(a[0].get_top() + UP * 0.12, c[0].get_top() + UP * 0.12,
                        buff=0.1, color=JAUNE_TITRE, stroke_width=3,
                        path_arc=-0.8)
        fl_bas = Arrow(a[2].get_bottom() + DOWN * 0.12, c[2].get_bottom() + DOWN * 0.12,
                       buff=0.1, color=JAUNE_TITRE, stroke_width=3, path_arc=0.8)
        self.play(Create(fl_haut))
        self.play(Create(fl_bas))
        lab = VGroup(
            Text("2 × 3 = 6", font_size=26, color=JAUNE_TITRE),
            Text("3 × 4 = 12", font_size=26, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.3).move_to([4.6, 1.3, 0])
        self.play(FadeIn(lab))

        simpl = VGroup(
            self.fraction(6, 12, font_size=38, color=WHITE),
            Text("=", font_size=34, color=WHITE),
            self.fraction(1, 2, font_size=38, color=VERT_OK),
        ).arrange(RIGHT, buff=0.35).move_to([0, -1.35, 0])
        self.play(FadeIn(simpl, shift=UP * 0.15))
        self.play(Circumscribe(simpl[2], color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Haut fois haut, bas fois bas.")))
        self.attendre_voix()

    # ── écran 7 : ⛔ additionner ───────────────────────────────────────────

    def ecran_additionner(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-additionner")
        self.titre_ecran("Additionner : ça ne passe PAS")

        faux = VGroup(
            self.fraction(1, 2, font_size=38, color=WHITE),
            Text("+", font_size=34, color=WHITE),
            self.fraction(1, 3, font_size=38, color=WHITE),
            Text("=", font_size=34, color=WHITE),
            self.fraction(2, 5, font_size=38, color=ROUGE_ERREUR),
        ).arrange(RIGHT, buff=0.32).move_to([0, 2.0, 0])
        self.play(FadeIn(faux))
        croix = Line(faux[4].get_corner(DL) + LEFT * 0.12,
                     faux[4].get_corner(UR) + RIGHT * 0.12,
                     color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(croix))

        # La vérification chiffrée : c'est elle qui tranche.
        verif = VGroup(
            Text("0,5 + 0,33 ≈ 0,83", font_size=32, color=VERT_OK),
            Text("mais 2/5 = 0,4", font_size=32, color=ROUGE_ERREUR),
            Text("deux fois trop petit", font_size=28, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.26).move_to([-3.3, 0.15, 0])
        for m in verif:
            self.play(FadeIn(m, shift=RIGHT * 0.12), run_time=0.45)

        # ⭐ LA RAISON, montrée : des parts de tailles différentes.
        b1 = self.barre_parts(2, 1, largeur=3.4, hauteur=0.55, centre=[3.1, 0.85, 0])
        l1 = Text("1/2", font_size=26, color=BLEU_CALCUL).next_to(b1, RIGHT, buff=0.25)
        b2 = self.barre_parts(3, 1, largeur=3.4, hauteur=0.55, centre=[3.1, -0.05, 0],
                              couleur=ORANGE_RETENUE)
        l2 = Text("1/3", font_size=26, color=ORANGE_RETENUE).next_to(b2, RIGHT, buff=0.25)
        self.play(Create(b1), FadeIn(l1))
        self.play(Create(b2), FadeIn(l2))
        pas_meme = Text("pas la même taille de part", font_size=26, color=ORANGE_RETENUE)
        pas_meme.move_to([3.1, -0.85, 0])
        self.play(Write(pas_meme))

        regle = Text("on n'additionne que des parts de MÊME TAILLE",
                     font_size=32, color=JAUNE_TITRE).move_to([0, -2.1, 0])
        if regle.width > 11.5:
            regle.scale_to_fit_width(11.5)
        self.play(Write(regle))
        self.attendre_voix()

    # ── défi : la question du test d'entrée ────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        origine = Text("Posé au brevet des collèges. Beaucoup se trompent.",
                       font_size=27, color=BLEU_CALCUL).move_to([0, 2.1, 0])
        self.play(FadeIn(origine))

        expr = VGroup(
            self.fraction(2, 5, font_size=48, color=JAUNE_TITRE),
            Text("−", font_size=42, color=WHITE),
            self.fraction(3, 5, font_size=48, color=JAUNE_TITRE),
            Text("×", font_size=42, color=WHITE),
            self.fraction(1, 3, font_size=48, color=JAUNE_TITRE),
        ).arrange(RIGHT, buff=0.38).move_to([0, 0.75, 0])
        self.play(FadeIn(expr, shift=DOWN * 0.2))
        self.play(Flash(expr, color=JAUNE_TITRE, line_length=0.35))

        indice = Text("Il y a un piège avant même de commencer à calculer.",
                      font_size=28, color=ORANGE_RETENUE).move_to([0, -0.85, 0])
        self.play(FadeIn(indice, shift=UP * 0.15))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")

        piege = Text("le piège, c'est l'ORDRE : × avant −",
                     font_size=32, color=ROUGE_ERREUR).move_to([0, 2.2, 0])
        self.play(Write(piege))

        e1 = Text("1.  la multiplication d'abord", font_size=28, color=VERT_OK)
        e1.move_to([-3.5, 1.35, 0])
        self.play(Write(e1))
        c1 = VGroup(
            self.fraction(3, 5, font_size=32, color=WHITE),
            Text("×", font_size=28, color=WHITE),
            self.fraction(1, 3, font_size=32, color=WHITE),
            Text("=", font_size=28, color=WHITE),
            self.fraction(3, 15, font_size=32, color=BLEU_CALCUL),
            Text("=", font_size=28, color=WHITE),
            self.fraction(1, 5, font_size=32, color=VERT_OK),
        ).arrange(RIGHT, buff=0.24).move_to([0, 0.45, 0])
        self.play(FadeIn(c1, shift=RIGHT * 0.15))

        e2 = Text("2.  la soustraction ensuite", font_size=28, color=VERT_OK)
        e2.move_to([-3.6, -0.55, 0])
        self.play(Write(e2))
        c2 = VGroup(
            self.fraction(2, 5, font_size=32, color=WHITE),
            Text("−", font_size=28, color=WHITE),
            self.fraction(1, 5, font_size=32, color=WHITE),
            Text("=", font_size=28, color=WHITE),
            self.fraction(1, 5, font_size=40, color=VERT_OK),
        ).arrange(RIGHT, buff=0.28).move_to([0, -1.45, 0])
        self.play(FadeIn(c2, shift=UP * 0.15))
        self.play(Circumscribe(c2[4], color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("Même dénominateur : je soustrais les numérateurs.")))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les fractions",
            accroche="1/2 + 1/3, est-ce que ça fait 2/5 ?",
            # ⭐ PAS D'ÉNUMÉRATION ICI (Frédéric, 11/09 : « tu vas apprendre, comme
            # enseignement explicite, sans tout énumérer — une phrase simple »).
            # Les trois objectifs ont leur écran juste après ; la garde, elle,
            # doit tenir en UNE promesse.
            promesse="Tu vas apprendre à calculer avec les fractions sans te tromper.",
        )
        self.page_objectifs([
            "dire ce qu'est une fraction, et pourquoi jamais zéro en bas",
            "simplifier, et passer au décimal puis au pourcentage",
            "multiplier et additionner — sans confondre les deux",
        ])
        self.ecran_definition()
        self.ecran_zero()
        self.ecran_egales()
        self.ecran_simplifier()
        self.ecran_ecritures()
        self.ecran_multiplier()
        self.ecran_additionner()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "une fraction est un partage ET un nombre",
                "1/5 = 0,2 = 20 % : trois écritures du même nombre",
                "multiplier passe tout droit, additionner exige le même dénominateur",
            ],
            rappel="On n'additionne que des parts de MÊME TAILLE.",
        )
        self.page_abonnement()
