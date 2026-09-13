# fonctions.py
# EleveAI — « Les maths, ça sert à rien… sauf à prévoir »
# LA VIDÉO PAYSAGE. À quoi servent les fonctions : dessiner, et surtout prévoir.
#
# ── POURQUOI CETTE VIDÉO (13/09/2026) ─────────────────────────────────────────
# Frédéric : « le but n'est pas que l'élève mémorise toutes les formes de
# fonctions, mais à quoi ça sert — dessiner, prévoir ». Et en statisticien :
# « un des buts des maths, c'est de modéliser, donc prévoir — il faut
# l'expliquer aux élèves ».
# ⭐ LE TITRE EST SA PHRASE : il commençait ses cours par « Les maths, ça sert à
# rien… sauf à ». La vidéo s'ouvre et se ferme dessus.
#
# ⭐ LE FORMAT D'UN ÉCRAN, IDENTIQUE POUR CHAQUE FONCTION (proposé et retenu) :
#   1. la QUESTION — un vrai besoin, avant toute formule ;
#   2. l'ALLURE — la courbe se construit sous les yeux ;
#   3. le NOM — la formule arrive en dernier, comme le nom de ce qu'on a vu ;
#   4. la RÉPONSE — on s'en sert pour répondre à la question du début.
# ⛔ Pas « définition → allure → explication » : ça commence par ce qu'on doit
# mémoriser, exactement ce que Frédéric ne veut pas.
#
# ⭐ LE FIL : la PRÉDICTION. Le dessin sert de promesse (la première seconde
# montre l'aire de jeux finie) et de récompense (on la construit à la fin).
# Trois questions, trois fonctions — c'est ce que l'élève doit retenir :
#   COMBIEN ?  → exponentielle
#   QUAND ?    → logarithme (même situation, question inverse : fonctions inverses)
#   JUSQU'OÙ ? → fonction inverse 1/x (Frédéric : « se contenter de 1/x » plutôt
#                que l'homographique, absente du coach — 1/x est dans celui de
#                seconde)
#
# ⛔ LES CHIFFRES SONT DES MODÈLES, PAS DES FAITS, et la vidéo le dit (écran
# « modéliser ») : une vidéo qui double chaque jour ne le fera pas éternellement.
#   100 vues aujourd'hui, ×2 par jour : dans 10 jours 100·2¹⁰ = 102 400 ;
#   le million : 2ˣ = 10 000 → x = ln(10 000)/ln 2 ≈ 13,29 jours.
#   ⚠️ « 100 vues le PREMIER jour … au dixième jour 100·2¹⁰ » était FAUX d'un
#   jour (le jour 10 ferait 100·2⁹) : corrigé en « aujourd'hui / dans 10 jours ».
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/fonctions.py FonctionsLongue -o eleveai-maths-bases-fonctions --media_dir manim/scripts/bases/media

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases
from gabarit_seconde import SONS

VOIX = SONS / "bases-fonctions"

# Une couleur par sorte de fonction, la MÊME dans chaque écran et dans le dessin
# final : c'est ce qui permet de retrouver « la jaune, c'est l'exponentielle ».
C_CONST = GREY_B
C_AFFINE = ORANGE_RETENUE
C_PARAB = VERT_OK
C_EXP = JAUNE_TITRE
C_LOG = BLEU_CALCUL
C_INV = VIOLET_ACCENT


class FonctionsLongue(NotionBases):

    dossier_voix = VOIX
    identite = "Les fonctions · EleveAI"

    # ── outils ──────────────────────────────────────────────────────────────

    def colonne(self, lignes, x=3.7, y_haut=2.3, buff=0.32):
        """La colonne de droite : question, nom, réponse. Posée à droite des axes
        et AU-DESSUS du coin de Ti-Margo (bas-droit)."""
        g = VGroup(*lignes).arrange(DOWN, buff=buff, aligned_edge=LEFT)
        larg_max = config.frame_width / 2 - 0.6
        if g.width > larg_max:
            g.scale_to_fit_width(larg_max)
        g.move_to([x, 0, 0]).align_to([0, y_haut, 0], UP)
        return g

    def axes_nus(self, x_range, y_range, x_length, y_length, opacite=0.0):
        """Des axes SANS graduation, pour le dessin : aucun nombre à lire, donc
        rien qui passe par LaTeX, et rien qui distraie du dessin."""
        return Axes(x_range=x_range, y_range=y_range, x_length=x_length,
                    y_length=y_length, tips=False,
                    axis_config={"include_numbers": False, "stroke_opacity": opacite})

    def aire_de_jeux(self, axes):
        """⭐ L'AIRE DE JEUX — sept formules, six sortes de fonctions, chacune à
        l'endroit où sa FORME a un sens. Coordonnées du dessin : x ∈ [0 ; 16],
        y ∈ [0 ; 5], le sol à y = 0,5.
        Les murs et l'échelle sont des DÉCORS (des segments verticaux ne sont pas
        des fonctions) : seules les courbes étiquetées sont des fonctions."""
        sol = 0.5
        c = {}
        c["sol"] = axes.plot(lambda x: sol, x_range=[0, 16], color=C_CONST, stroke_width=5)
        c["toit_g"] = axes.plot(lambda x: 0.9 * (x - 0.7) + 2.5, x_range=[0.7, 2.5],
                                color=C_AFFINE, stroke_width=6)
        c["toit_d"] = axes.plot(lambda x: -0.9 * (x - 4.3) + 2.5, x_range=[2.5, 4.3],
                                color=C_AFFINE, stroke_width=6)
        c["colline"] = axes.plot(lambda x: -0.45 * (x - 6.5) ** 2 + 2.3, x_range=[4.5, 8.5],
                                 color=C_PARAB, stroke_width=6)
        c["rampe"] = axes.plot(lambda x: sol + 0.12 * (math.exp(1.4 * (x - 9)) - 1),
                               x_range=[9, 11], color=C_EXP, stroke_width=6)
        c["toboggan"] = axes.plot(lambda x: sol + 0.9 / (x - 11.0), x_range=[11.3, 13.8],
                                  color=C_INV, stroke_width=6)
        c["route"] = axes.plot(lambda x: sol + 0.7 * math.log(1 + 2.5 * (x - 14)),
                               x_range=[14, 16], color=C_LOG, stroke_width=6)

        decor = VGroup(
            # les murs de la cabane
            Line(axes.c2p(1.0, sol), axes.c2p(1.0, 2.77), color=WHITE, stroke_width=3),
            Line(axes.c2p(4.0, sol), axes.c2p(4.0, 2.77), color=WHITE, stroke_width=3),
            # l'échelle du toboggan
            Line(axes.c2p(11.3, sol), axes.c2p(11.3, 3.5), color=WHITE, stroke_width=3),
            # le soleil
            Circle(radius=0.38, color=JAUNE_TITRE, fill_opacity=0.85, stroke_width=0)
            .move_to(axes.c2p(6.5, 4.4)),
        )
        return c, decor

    def etiquettes_dessin(self, axes):
        """Les noms, posés à côté de chaque courbe."""
        lab = [
            ("constante", C_CONST, (2.3, 0.12)),
            ("affine", C_AFFINE, (2.5, 4.55)),
            ("parabole", C_PARAB, (6.5, 2.75)),
            ("exponentielle", C_EXP, (9.6, 2.8)),
            ("inverse", C_INV, (12.6, 3.3)),
            ("logarithme", C_LOG, (15.0, 2.25)),
        ]
        return VGroup(*[Text(t, font_size=20, color=c).move_to(axes.c2p(*p)) for t, c, p in lab])

    # ── 0 : la garde — l'aire de jeux FINIE, dès la première seconde ────────

    def ecran_garde(self):
        """⛔ PAS la page de garde du gabarit : la promesse est une IMAGE. YouTube
        prélève l'image à 1 seconde — l'aire de jeux doit y être entière."""
        self.clear()
        self.dire("00-garde")
        axes = self.axes_nus([0, 16, 1], [0, 5, 1], 11.5, 3.6).move_to([0, -1.55, 0])
        courbes, decor = self.aire_de_jeux(axes)
        dessin = VGroup(decor, *courbes.values())
        self.play(FadeIn(dessin), run_time=0.5)

        t1 = Text("Les maths, ça sert à rien…", font_size=52, color=WHITE).move_to([0, 2.95, 0])
        self.play(FadeIn(t1, shift=DOWN * 0.15), run_time=0.45)
        t2 = Text("sauf à PRÉVOIR", font_size=58, color=JAUNE_TITRE).move_to([0, 1.95, 0])
        self.play(GrowFromCenter(t2))
        self.play(Flash(t2, color=JAUNE_TITRE, line_length=0.35))
        ident = Text("Les fonctions · EleveAI", font_size=26, color=GREY_B).move_to([0, 1.2, 0])
        note = Text("7 formules · aucun trait à la main", font_size=26, color=BLEU_CALCUL)
        note.move_to([0, 0.65, 0])
        self.play(FadeIn(ident), FadeIn(note, shift=UP * 0.1))
        self.attendre_voix()

    # ── 1-3 : DESSINER ──────────────────────────────────────────────────────

    def ecran_constante(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("01-constante")
        self.titre_ecran("Dessiner : le sol")
        axes = self.axes_notion([0, 8, 1], [0, 4, 1], x_length=6.2, y_length=3.6, font_size=20)
        axes.move_to([-3.4, -0.35, 0])
        self.play(Create(axes), run_time=0.8)

        q = Text("Comment tracer le sol ?", font_size=32, color=BLEU_CALCUL)
        col = self.colonne([q])
        self.play(FadeIn(q))

        courbe = axes.plot(lambda x: 1, x_range=[0, 8], color=C_CONST, stroke_width=6)
        self.play(Create(courbe))
        points = VGroup(*[Dot(axes.c2p(x, 1), color=WHITE, radius=0.07) for x in (1, 3, 5, 7)])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in points], lag_ratio=0.2))

        suite = [
            Text("la hauteur ne change jamais", font_size=28, color=WHITE),
            Text("fonction constante", font_size=36, color=C_CONST),
            Text("f(x) = k", font_size=40, color=WHITE),
            Text("ici : f(x) = 1", font_size=30, color=VERT_OK),
        ]
        col = self.colonne([q, *suite])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.45)
        self.play(Write(self.chute("Quel que soit x, la hauteur reste la même.")))
        self.attendre_voix()

    def ecran_affine(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("02-affine")
        self.titre_ecran("Dessiner : le toit")
        axes = self.axes_notion([0, 8, 1], [0, 6, 1], x_length=6.2, y_length=3.9, font_size=20)
        axes.move_to([-3.4, -0.4, 0])
        self.play(Create(axes), run_time=0.8)

        q = Text("Comment tracer un toit ?", font_size=32, color=BLEU_CALCUL)
        self.colonne([q])
        self.play(FadeIn(q))

        droite = axes.plot(lambda x: 0.5 * x + 1, x_range=[0, 8], color=C_AFFINE, stroke_width=6)
        self.play(Create(droite))
        # ⭐ La pente se MONTRE : un pas à droite, toujours la même montée.
        for x0 in (2, 5):
            pas = VGroup(
                Line(axes.c2p(x0, 0.5 * x0 + 1), axes.c2p(x0 + 1, 0.5 * x0 + 1), color=WHITE, stroke_width=3),
                Line(axes.c2p(x0 + 1, 0.5 * x0 + 1), axes.c2p(x0 + 1, 0.5 * (x0 + 1) + 1),
                     color=VERT_OK, stroke_width=5),
            )
            self.play(Create(pas), run_time=0.5)
        lineaire = DashedLine(axes.c2p(0, 0), axes.c2p(8, 4), color=C_AFFINE, stroke_width=3)
        lab_lin = Text("b = 0 : linéaire", font_size=22, color=C_AFFINE).move_to(axes.c2p(6.3, 2.2))

        suite = [
            Text("une droite qui monte régulièrement", font_size=26, color=WHITE),
            Text("fonction affine", font_size=36, color=C_AFFINE),
            Text("f(x) = ax + b", font_size=40, color=WHITE),
            Text("a : la pente   ·   b : le départ", font_size=26, color=VERT_OK),
        ]
        self.colonne([q, *suite])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.45)
        self.play(Create(lineaire), FadeIn(lab_lin))
        self.play(Write(self.chute("À chaque pas, toujours la même hauteur gagnée.")))
        self.attendre_voix()

    def ecran_polynome(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("03-polynome")
        self.titre_ecran("Dessiner : la colline")
        axes = self.axes_notion([0, 8, 1], [0, 5, 1], x_length=6.2, y_length=3.7, font_size=20)
        axes.move_to([-3.4, -0.35, 0])
        self.play(Create(axes), run_time=0.8)

        q = Text("Et une colline ?", font_size=32, color=BLEU_CALCUL)
        self.colonne([q])
        self.play(FadeIn(q))

        courbe = axes.plot(lambda x: -0.5 * (x - 4) ** 2 + 4.5, x_range=[1, 7],
                           color=C_PARAB, stroke_width=6)
        self.play(Create(courbe), run_time=1.2)
        sommet = Dot(axes.c2p(4, 4.5), color=WHITE, radius=0.09)
        lab = Text("sommet", font_size=22, color=WHITE).next_to(sommet, UP, buff=0.15)
        self.play(GrowFromCenter(sommet), FadeIn(lab))

        suite = [
            Text("monte, ralentit, redescend", font_size=28, color=WHITE),
            Text("polynôme du second degré", font_size=32, color=C_PARAB),
            Text("sa forme : une parabole", font_size=30, color=WHITE),
        ]
        self.colonne([q, *suite])
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.45)
        self.play(Write(self.chute("Les logiciels de dessin tracent leurs courbes avec des polynômes.")))
        self.attendre_voix()

    # ── 3b : MODÉLISER = PRÉVOIR ────────────────────────────────────────────

    def ecran_modeliser(self):
        """⭐ Frédéric : « modéliser = prévoir, il faut l'expliquer aux élèves ».
        Trois cases et deux flèches — et la précaution du statisticien."""
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("03b-modeliser")
        self.titre_ecran("Le vrai pouvoir : MODÉLISER")

        def case(txt, coul):
            t = Text(txt, font_size=24, color=coul)
            r = RoundedRectangle(width=t.width + 0.6, height=t.height + 0.55, corner_radius=0.18,
                                 color=coul, stroke_width=3)
            return VGroup(r, t)

        a = case("une situation réelle", BLEU_CALCUL)
        b = case("une formule", JAUNE_TITRE)
        c = case("ce qui n'est pas encore arrivé", VERT_OK)
        chaine = VGroup(a, b, c).arrange(RIGHT, buff=1.35).move_to([0, 1.0, 0])
        if chaine.width > config.frame_width - 0.8:
            chaine.scale_to_fit_width(config.frame_width - 0.8)
        f1 = Arrow(a.get_right(), b.get_left(), buff=0.12, color=WHITE, stroke_width=5)
        f2 = Arrow(b.get_right(), c.get_left(), buff=0.12, color=WHITE, stroke_width=5)
        haut = chaine.get_top()[1] + 0.32
        mots = VGroup(
            Text("modéliser", font_size=24, color=JAUNE_TITRE).move_to([f1.get_center()[0], haut, 0]),
            Text("prévoir", font_size=24, color=VERT_OK).move_to([f2.get_center()[0], haut, 0]),
        )
        self.play(FadeIn(a, shift=RIGHT * 0.15))
        self.play(GrowArrow(f1), FadeIn(mots[0]))
        self.play(FadeIn(b, shift=RIGHT * 0.15))
        self.play(GrowArrow(f2), FadeIn(mots[1]))
        self.play(FadeIn(c, shift=RIGHT * 0.15))

        prudence = VGroup(
            Text("Attention : une formule ne dit pas l'avenir", font_size=30, color=ORANGE_RETENUE),
            Text("elle dit ce qui arrivera SI ça continue comme maintenant", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([-0.4, -1.0, 0])
        if prudence.width > config.frame_width - 3.0:
            prudence.scale_to_fit_width(config.frame_width - 3.0)
        self.play(FadeIn(prudence, shift=UP * 0.12))
        self.play(Write(self.chute("Trois questions qu'une formule sait prévoir.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 4-6 : PRÉVOIR ───────────────────────────────────────────────────────

    def question_geante(self, mot, coul):
        return Text(mot, font_size=54, color=coul)

    def ecran_exponentielle(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("04-exponentielle")
        self.titre_ecran("Prévoir : COMBIEN ?")
        # y en MILLIERS de vues : des graduations entières, pas de « 0.5 » à
        # l'anglaise que `Text` écrirait avec un point.
        axes = self.axes_notion([0, 10, 2], [0, 120, 20], x_length=6.2, y_length=3.4, font_size=20)
        axes.move_to([-3.2, 0.05, 0])
        lx = Text("jours", font_size=20, color=GREY_B).next_to(axes.x_axis, DOWN, buff=0.42)
        ly = Text("milliers de vues", font_size=20, color=GREY_B).next_to(axes.y_axis, UP, buff=0.15).align_to(axes.y_axis, LEFT)
        self.play(Create(axes), FadeIn(lx), FadeIn(ly), run_time=0.8)

        q = VGroup(
            Text("100 vues aujourd'hui,", font_size=28, color=BLEU_CALCUL),
            Text("et ça double chaque jour.", font_size=28, color=BLEU_CALCUL),
            Text("Combien dans 10 jours ?", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.12, aligned_edge=LEFT)
        self.colonne([q])
        self.play(FadeIn(q))

        courbe = axes.plot(lambda x: 0.1 * 2 ** x, x_range=[0, 10], color=C_EXP, stroke_width=6)
        self.play(Create(courbe), run_time=2.4, rate_func=linear)
        pt = Dot(axes.c2p(10, 102.4), color=WHITE, radius=0.09)
        guide = DashedLine(axes.c2p(0, 102.4), axes.c2p(10, 102.4), color=WHITE, stroke_width=2)
        self.play(GrowFromCenter(pt), Create(guide))

        formule = VGroup(Text("f(x) = 100 × ", font_size=36, color=WHITE),
                         self.puissance("2", "x", font_size=36)).arrange(RIGHT, buff=0.06)
        suite = [
            Text("presque rien… puis tout", font_size=28, color=WHITE),
            Text("croissance exponentielle", font_size=32, color=C_EXP),
            formule,
            Text("dans 10 jours : 102 400 vues", font_size=28, color=VERT_OK),
        ]
        self.colonne([q, *suite], buff=0.26)
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.45)
        self.play(Write(self.chute("L'exponentielle répond à : COMBIEN ?", color=C_EXP)))
        self.attendre_voix()

    def ecran_logarithme(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("05-logarithme")
        self.titre_ecran("Prévoir : QUAND ?")
        # ⛔ PAS `axes_notion` ici : `Text` écrit 1200 « 1,200 », le séparateur
        # de milliers ANGLAIS, qu'un élève lit « un virgule deux ». L'axe vertical
        # n'a donc aucun nombre automatique ; on pose des libellés français.
        axes = Axes(x_range=[0, 14, 2], y_range=[0, 1800, 600], x_length=6.2, y_length=3.4,
                    tips=False,
                    x_axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 20},
                    y_axis_config={"include_numbers": False})
        # ⚠️ Décalé à droite : les libellés « 1,8 M » se posent à GAUCHE de l'axe,
        # et à −3,2 le « 1 » sortait du cadre (tirage du 13/09).
        axes.move_to([-2.75, 0.05, 0])
        grad_y = VGroup(*[Text(t, font_size=18, color=WHITE).next_to(axes.c2p(0, v), LEFT, buff=0.15)
                          for v, t in ((600, "0,6 M"), (1200, "1,2 M"), (1800, "1,8 M"))])
        lx = Text("jours", font_size=20, color=GREY_B).next_to(axes.x_axis, DOWN, buff=0.42)
        ly = Text("millions de vues", font_size=20, color=GREY_B).next_to(axes.y_axis, UP, buff=0.15).align_to(axes.y_axis, LEFT)
        self.play(Create(axes), FadeIn(grad_y), FadeIn(lx), FadeIn(ly), run_time=0.8)

        q = VGroup(
            Text("Même vidéo.", font_size=28, color=BLEU_CALCUL),
            Text("Quand le million ?", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.12, aligned_edge=LEFT)
        self.colonne([q])
        self.play(FadeIn(q))

        courbe = axes.plot(lambda x: 0.1 * 2 ** x, x_range=[0, 14], color=C_EXP, stroke_width=6)
        self.play(Create(courbe), run_time=2.0, rate_func=linear)
        # ⭐ On part du RÉSULTAT (1 million) et on redescend vers le temps : le
        # geste inverse de l'écran d'avant, dessiné comme tel.
        x_m = math.log(10_000) / math.log(2)
        h = DashedLine(axes.c2p(0, 1000), axes.c2p(x_m, 1000), color=C_LOG, stroke_width=3)
        v = DashedLine(axes.c2p(x_m, 1000), axes.c2p(x_m, 0), color=C_LOG, stroke_width=3)
        lab_m = Text("1 million", font_size=20, color=C_LOG).next_to(axes.c2p(0, 1000), RIGHT, buff=0.1).shift(UP * 0.18)
        self.play(Create(h), FadeIn(lab_m))
        self.play(Create(v))
        pt = Dot(axes.c2p(x_m, 0), color=C_LOG, radius=0.1)
        self.play(GrowFromCenter(pt))
        dix = Dot(axes.c2p(10, 102.4), color=WHITE, radius=0.07)
        lab_dix = Text("J+10 : presque rien", font_size=18, color=WHITE).next_to(dix, UP, buff=0.4).shift(LEFT * 0.7)
        self.play(FadeIn(dix), FadeIn(lab_dix))

        suite = [
            Text("on connaît le résultat,", font_size=26, color=WHITE),
            Text("on cherche le temps", font_size=26, color=WHITE),
            Text("logarithme", font_size=36, color=C_LOG),
            Text("il défait l'exponentielle", font_size=26, color=WHITE),
            Text("x = ln(10 000) ÷ ln 2 ≈ 13,3 jours", font_size=26, color=VERT_OK),
        ]
        self.colonne([q, *suite], buff=0.22)
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.play(Write(self.chute("Le logarithme répond à : QUAND ?", color=C_LOG)))
        self.attendre_voix()

    def ecran_inverse(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("06-inverse")
        self.titre_ecran("Prévoir : JUSQU'OÙ ?")
        axes = self.axes_notion([0, 10, 1], [0, 1, 1], x_length=6.2, y_length=3.3, font_size=20)
        axes.move_to([-3.2, 0.05, 0])
        lx = Text("nombre de personnes", font_size=20, color=GREY_B).next_to(axes.x_axis, DOWN, buff=0.42)
        ly = Text("part de gâteau", font_size=20, color=GREY_B).next_to(axes.y_axis, UP, buff=0.15).align_to(axes.y_axis, LEFT)
        self.play(Create(axes), FadeIn(lx), FadeIn(ly), run_time=0.8)

        q = VGroup(
            Text("Un gâteau pour x personnes.", font_size=28, color=BLEU_CALCUL),
            Text("La part de chacun ?", font_size=30, color=WHITE),
        ).arrange(DOWN, buff=0.12, aligned_edge=LEFT)
        self.colonne([q])
        self.play(FadeIn(q))

        courbe = axes.plot(lambda x: 1 / x, x_range=[1, 10], color=C_INV, stroke_width=6)
        self.play(Create(courbe), run_time=1.6)
        for x in (1, 2, 10):
            self.play(GrowFromCenter(Dot(axes.c2p(x, 1 / x), color=WHITE, radius=0.08)), run_time=0.3)
        # les parts, dessinées : le gâteau de la série « Les bases »
        g2 = self.disque(2, 1, rayon=0.42, couleur=C_INV).move_to([-1.7, 2.0, 0])
        g10 = self.disque(10, 1, rayon=0.42, couleur=C_INV).move_to([-0.6, 2.0, 0])
        self.play(FadeIn(g2), FadeIn(g10))

        formule = VGroup(Text("f(x) =", font_size=36, color=WHITE),
                         self.fraction("1", "x", font_size=36)).arrange(RIGHT, buff=0.18)
        suite = [
            Text("2 → 1/2   ·   10 → 1/10   ·   100 → 1/100", font_size=24, color=WHITE),
            Text("fonction inverse", font_size=36, color=C_INV),
            formule,
            Text("elle rétrécit sans fin,", font_size=26, color=VERT_OK),
            Text("mais n'atteint jamais zéro", font_size=26, color=VERT_OK),
        ]
        self.colonne([q, *suite], buff=0.22)
        for m in suite:
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.4)
        self.play(Write(self.chute("La fonction inverse répond à : JUSQU'OÙ ?", color=C_INV)))
        self.attendre_voix()

    # ── 7-8 : le défi — reconnaître la QUESTION, pas calculer ──────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("07-defi")
        self.play(Write(Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)))
        sit = VGroup(
            Text("1.  Une ville perd 2 % d'habitants par an. Combien dans 20 ans ?",
                 font_size=28, color=WHITE),
            Text("2.  Un placement double tous les 12 ans. Quand sera-t-il × 8 ?",
                 font_size=28, color=WHITE),
            Text("3.  Un car à 600 € partagé entre les élèves. Jusqu'où baisse la part ?",
                 font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.45, aligned_edge=LEFT)
        if sit.width > config.frame_width - 1.0:
            sit.scale_to_fit_width(config.frame_width - 1.0)
        sit.move_to([0, 0.9, 0])
        for s in sit:
            self.play(FadeIn(s, shift=RIGHT * 0.15), run_time=0.55)
        choix = VGroup(
            Text("COMBIEN ?", font_size=34, color=C_EXP),
            Text("QUAND ?", font_size=34, color=C_LOG),
            Text("JUSQU'OÙ ?", font_size=34, color=C_INV),
        ).arrange(RIGHT, buff=1.0).move_to([-0.6, -1.25, 0])
        self.play(FadeIn(choix, shift=UP * 0.12))
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("08-correction")
        self.titre_ecran("Correction")
        lignes = VGroup()
        for num, quest, fonc, coul in [
            ("1. la ville", "COMBIEN ?", "exponentielle", C_EXP),
            ("2. le placement", "QUAND ?", "logarithme", C_LOG),
            ("3. le car", "JUSQU'OÙ ?", "fonction inverse", C_INV),
        ]:
            lignes.add(VGroup(
                Text(num, font_size=32, color=WHITE),
                Text(quest, font_size=32, color=coul),
                Text("→ " + fonc, font_size=32, color=coul),
            ).arrange(RIGHT, buff=0.55))
        # colonnes alignées
        larg = [max(l[i].width for l in lignes) for i in range(3)]
        for l in lignes:
            for i in (1, 2):
                l[i].shift(RIGHT * sum(larg[j] - l[j].width for j in range(i)))
        lignes.arrange(DOWN, buff=0.5, aligned_edge=LEFT).move_to([-0.5, 1.0, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.55)
        bonus = Text("et de tête : 8 = 2 × 2 × 2, trois doublements → 36 ans",
                     font_size=28, color=VERT_OK).move_to([-0.5, -1.2, 0])
        self.play(FadeIn(bonus, shift=UP * 0.1))
        self.play(Write(self.chute("On choisit la fonction d'après la QUESTION.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 9 : LE DESSIN — la promesse tenue ───────────────────────────────────

    def ecran_dessin(self):
        self.clear()
        self.dire("09-dessin")
        titre = Text("Sept formules, une aire de jeux", font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))
        axes = self.axes_nus([0, 16, 1], [0, 5, 1], 12.8, 4.6).move_to([0, -0.55, 0])
        courbes, decor = self.aire_de_jeux(axes)
        labs = self.etiquettes_dessin(axes)
        ordre = [("sol", 0), ("toit_g", 1), ("toit_d", None), ("colline", 2),
                 ("rampe", 3), ("toboggan", 4), ("route", 5)]
        self.play(FadeIn(decor[3]))  # le soleil d'abord
        for cle, i_lab in ordre:
            anims = [Create(courbes[cle])]
            if i_lab is not None:
                anims.append(FadeIn(labs[i_lab]))
            if cle == "toit_g":
                anims += [Create(decor[0]), Create(decor[1])]
            if cle == "toboggan":
                anims.append(Create(decor[2]))
            self.play(*anims, run_time=0.9)
        self.play(Write(self.chute("Aucune courbe tracée à la main.", color=VERT_OK)))
        self.attendre_voix()

    def construct(self):
        self.ecran_garde()
        self.page_objectifs([
            "ce que veut dire modéliser, et pourquoi c'est prévoir",
            "lire une courbe pour répondre à une question",
            "choisir la fonction selon la question : combien, quand, jusqu'où",
        ])
        self.ecran_constante()
        self.ecran_affine()
        self.ecran_polynome()
        self.ecran_modeliser()
        self.ecran_exponentielle()
        self.ecran_logarithme()
        self.ecran_inverse()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_dessin()
        self.page_finale(
            points=[
                "modéliser : une formule pour calculer ce qui n'est pas encore arrivé",
                "combien → exponentielle · quand → logarithme · jusqu'où → inverse",
                "on choisit une fonction pour la question, pas pour sa forme",
            ],
            rappel="Les maths, ça sert à rien… sauf à prévoir.",
        )
        self.page_abonnement()
