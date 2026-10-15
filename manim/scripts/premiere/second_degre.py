# second_degre.py
# EleveAI — Maths première spécialité — Le second degré (notionId : second_degre)
#
# ⭐ UNE VIDÉO PAYSAGE, LA PLUS SIMPLE POSSIBLE (Frédéric, 15/09/2026 : « fais la
# vidéo paysage sur les micros du second degré en étant le plus simple possible »,
# « sans parler de la forme canonique qui n'est qu'un passage »).
#
#   SecondDegreEquation → l'ÉQUATION : a, b, c et Δ ; le signe de Δ décide ; la
#                         formule des racines ; factoriser, lire les racines.
#
# Le fil est celui de la fiche de cours (lib/fiches/maths-premiere-second-degre.tsx) :
# Δ ne calcule rien, il DÉCIDE. Mêmes nombres que la fiche (2x² − 3x − 5,
# x² + 2x + 5) et que la feuille d'exercices (x² + 6x + 9, x² − 3x − 10, x² − 2x + 7).
#
# Mapping micro-compétences (notion second_degre) :
#   sd_discriminant     → écrans 1 et 2
#   sd_racines          → écrans 3 et 4 + défi
#   sd_factorisation    → écran 5
#   sd_forme_factorisee → écran 5
#   sd_somme_produit, sd_deux_racines, sd_canonique, sd_completion_carre,
#   sd_signe, sd_inequation, sd_forme_adaptee → ⏳ vidéo suivante (signe et inéquations)
#
# Briques : `manim/gabarit_seconde.py`, et les aides de composition (rang, frac,
# paren_puissance, encadre, barrer) de `exponentielle.py`, réutilisées telles
# quelles. ⛔ Pas de LaTeX sur ce poste : Text + dessin, exposants composés.
#
# Rendu (sans cache, sinon les sons sautent) :
#   python -m manim render -qh --disable_caching manim/scripts/premiere/second_degre.py SecondDegreEquation -o eleveai-maths-premiere-second-degre-equation --media_dir manim/scripts/premiere/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from exponentielle import ExponentielleBase
from gabarit_seconde import SONS


class SecondDegreBase(ExponentielleBase):
    """Les aides communes aux deux vidéos du second degré."""

    identite = "Maths première — EleveAI"
    episode = ""
    total = 2

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        """La garde d'ExponentielleBase écrit « sur 3 » en dur ; ici deux vidéos."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.9)
        if t.width > config.frame_width - 1.0:
            t.scale_to_fit_width(config.frame_width - 1.0)
        identite = Text(f"Maths première — vidéo {self.episode} sur {self.total}" if self.episode else self.identite,
                        font_size=30, color=WHITE).next_to(t, DOWN, buff=0.35)
        acc = Text(accroche, font_size=34, color=BLEU_CALCUL).next_to(identite, DOWN, buff=0.95)
        prom = Text(promesse, font_size=26, color=WHITE).next_to(acc, DOWN, buff=0.55)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))
        self.play(GrowFromCenter(acc))
        self.play(Flash(acc, color=BLEU_CALCUL, line_length=0.3))
        self.play(FadeIn(prom, shift=UP * 0.2))
        self.attendre_voix()

    # ── aides propres au second degré ───────────────────────────────────────

    def carre(self, base, font_size=44, color=WHITE):
        """x², composé comme une puissance (jamais l'exposant Unicode)."""
        g = self.puissance(base, "2", font_size=font_size, color=color)
        g.est_puissance = True
        return g

    def indice(self, base, ind, font_size=44, color=WHITE):
        """x₁, x₂ : la lettre, et le petit indice en bas à droite. Le pendant de
        `puissance` — les indices Unicode ne se rendent pas mieux que les exposants."""
        b = Text(base, font_size=font_size, color=color)
        i = Text(str(ind), font_size=font_size * 0.6, color=color)
        i.next_to(b, DR, buff=0.02).shift(UP * font_size * 0.003)
        g = VGroup(b, i)
        g.est_puissance = True
        return g

    def terme_x(self, coef, font_size=44, color=WHITE):
        """« − 3x » : le COEFFICIENT en couleur, le x en blanc.

        ⛔ 16/09 (Frédéric) : « tu as mis 3x en couleur sur le b alors que c'est
        le coefficient qui est en couleur ». Un seul Text (l'espacement reste celui
        de la police), et seuls les glyphes du coefficient sont colorés — les
        submobjects d'un Text sont ses glyphes hors espaces.
        """
        t = self.T(f"{coef}x", font_size)
        n = len([ch for ch in coef if not ch.isspace()])
        t[:n].set_color(color)
        return t

    def trinome(self, a, b, c, font_size=44, couleurs=None):
        """ax² + bx + c = 0, avec les coefficients en couleur si on le demande."""
        # ⛔ Brouillon du 15/09 : des morceaux colorés séparés se collaient
        # (« 2x²− 3x− 5= 0 ») — le buff par défaut suppose des chaînes fusionnées.
        ca, cb, cc = couleurs or (WHITE, WHITE, WHITE)
        morceaux = [self.T(a, font_size, ca), self.carre("x", font_size)]
        morceaux += [self.terme_x(b, font_size, cb), self.T(c, font_size, cc), self.T("= 0", font_size)]
        return self.rang(*morceaux, font_size=font_size, buff=0.24)

    def petite_parabole(self, decalage, couleur):
        """Une parabole y = x² + d dans un petit repère sans graduations —
        `include_numbers=False`, donc aucun LaTeX en embuscade.
        ⛔ La courbe est COUPÉE à la hauteur du cadre : sinon la parabole Δ < 0
        sortait par le haut et les trois colonnes n'étaient plus alignées."""
        ax = Axes(x_range=[-2.2, 2.2, 1], y_range=[-1.6, 3.2, 1], x_length=3.4, y_length=3.0,
                  axis_config={"include_numbers": False, "include_ticks": False, "stroke_width": 2},
                  tips=False)
        borne = min(2.05, (3.1 - decalage) ** 0.5)
        c = ax.plot(lambda x: x * x + decalage, x_range=[-borne, borne], color=couleur, stroke_width=4)
        racines = VGroup()
        if decalage < 0:
            r = (-decalage) ** 0.5
            racines.add(Dot(ax.c2p(-r, 0), color=couleur, radius=0.09), Dot(ax.c2p(r, 0), color=couleur, radius=0.09))
        elif decalage == 0:
            racines.add(Dot(ax.c2p(0, 0), color=couleur, radius=0.09))
        return VGroup(ax, c, racines)

    def tableau_signes(self, bornes, signes, largeur=6.4, font_size=30):
        """Un tableau de signes DESSINÉ : la ligne des x avec ses bornes, la ligne
        de f(x) avec les signes et les zéros. `bornes` : ["−∞", "1", "3", "+∞"] ;
        `signes` : ["+", "0", "−", "0", "+"] (alternance signe / zéro)."""
        h = 1.5
        g = 1.3  # colonne des libellés
        cadre = Rectangle(width=largeur, height=h, stroke_width=2, color=WHITE)
        milieu = Line(cadre.get_left() + UP * 0, cadre.get_right(), stroke_width=2, color=WHITE)
        col = Line(cadre.get_corner(UL) + RIGHT * g, cadre.get_corner(DL) + RIGHT * g, stroke_width=2, color=WHITE)
        tab = VGroup(cadre, milieu, col)
        lx = self.T("x", font_size).move_to(cadre.get_left() + RIGHT * g / 2 + UP * h / 4)
        lf = self.T("f(x)", font_size).move_to(cadre.get_left() + RIGHT * g / 2 + DOWN * h / 4)
        tab.add(lx, lf)
        x0 = cadre.get_left()[0] + g
        pas = (largeur - g) / (len(bornes) - 1)
        for i, b in enumerate(bornes):
            x = x0 + i * pas
            if i == 0:
                x += 0.35
            elif i == len(bornes) - 1:
                x -= 0.35
            tab.add(self.T(b, font_size).move_to([x, cadre.get_center()[1] + h / 4, 0]))
        for i, s in enumerate(signes):
            if i % 2 == 0:  # un signe, entre deux bornes
                x = x0 + (i // 2) * pas + pas / 2
                coul = VERT_OK if s == "+" else ROUGE_ERREUR
                tab.add(self.T(s, font_size + 6, coul).move_to([x, cadre.get_center()[1] - h / 4, 0]))
            else:  # un zéro, sous une borne intérieure
                x = x0 + ((i + 1) // 2) * pas
                tab.add(self.T("0", font_size).move_to([x, cadre.get_center()[1] - h / 4, 0]))
                tab.add(DashedLine([x, cadre.get_center()[1], 0], [x, cadre.get_bottom()[1], 0], color=GREY_B, stroke_width=1.5))
        return tab

    REPERE_NU = {"include_numbers": False, "include_ticks": False, "stroke_width": 2}

    def parabole_signee(self, a, r1, r2, y_min=-2.2, y_max=2.2, x_length=3.6, y_length=2.8):
        """Une parabole a(x − r1)(x − r2), tracée en VERT là où elle est positive
        et en ROUGE là où elle est négative — le signe se VOIT (Frédéric, 15/09 :
        « fais quelque chose de visuel »).
        ⛔ La courbe est coupée à la hauteur du cadre, calculée depuis le sommet :
        au premier brouillon les branches sortaient par le haut et les figures
        n'avaient plus la même taille."""
        f = lambda x: a * (x - r1) * (x - r2)
        m = (r1 + r2) / 2
        demi = ((y_max - f(m)) / a) ** 0.5 if a > 0 else ((f(m) - y_min) / (-a)) ** 0.5
        ax = Axes(x_range=[m - demi - 0.3, m + demi + 0.3, 1], y_range=[y_min, y_max, 1],
                  x_length=x_length, y_length=y_length, axis_config=self.REPERE_NU, tips=False)
        bornes = sorted({m - demi, r1, r2, m + demi})
        segments = VGroup()
        for lo, hi in zip(bornes, bornes[1:]):
            if hi - lo < 1e-6:
                continue
            coul = VERT_OK if f((lo + hi) / 2) > 0 else ROUGE_ERREUR
            segments.add(ax.plot(f, x_range=[lo + 1e-3, hi - 1e-3], color=coul, stroke_width=4))
        pts = VGroup(*[Dot(ax.c2p(r, 0), color=WHITE, radius=0.07) for r in sorted({r1, r2})])
        return VGroup(ax, segments, pts)

    def parabole_libre(self, f, x_min, x_max, y_min, y_max, couleur, x_length=3.0, y_length=2.2):
        """Une parabole sans racine (Δ < 0), tout entière d'un côté de l'axe."""
        ax = Axes(x_range=[x_min, x_max, 1], y_range=[y_min, y_max, 1], x_length=x_length, y_length=y_length,
                  axis_config=self.REPERE_NU, tips=False)
        c = ax.plot(f, x_range=[x_min + 0.15, x_max - 0.15], color=couleur, stroke_width=4)
        return VGroup(ax, c)

    def poser(self, figure, x, y):
        """Pose une figure (repère + courbe) en visant le CENTRE DU REPÈRE. ⛔ Un
        `fig[0].move_to` ne déplace que les axes et laisse la courbe derrière."""
        figure.shift(np.array([x, y, 0]) - figure[0].get_center())
        return figure



class SecondDegreEquation(SecondDegreBase):

    dossier_voix = SONS / "premiere-second-degre-equation"
    episode = "1"

    # ── écran 1 : a, b, c et Δ (sd_discriminant) ─────────────────────────────

    def ecran_abc(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-abc")
        self.titre_ecran("a, b, c et le discriminant")

        # ⛔ Première version (15/09, en ligne un soir) : « solutions » partout, sans
        # jamais dire de quoi. Frédéric : « tu as oublié de dire résoudre f(x) = 0,
        # et les solutions sont appelées racines ». Le mot est posé ici, en premier.
        forme = self.encadre(self.rang("f(x) =", self.T("a", 40), self.carre("x", 40), "+ b x + c", "    (a ≠ 0)",
                                       font_size=40, buff=0.22)).move_to([0, 2.2, 0])
        self.play(FadeIn(forme[0]), Create(forme[1]))
        racines = self.rang("résoudre", self.T("f(x) = 0", 34, JAUNE_TITRE), ": les solutions s'appellent les",
                            self.T("racines", 36, VERT_OK), font_size=30, buff=0.22).move_to([0, 1.3, 0])
        self.play(FadeIn(racines, shift=DOWN * 0.15))
        self.play(Circumscribe(racines[-1], color=VERT_OK, buff=0.1))

        ex = self.trinome("2", "− 3", "− 5", 46, (BLEU_CALCUL, ROUGE_ERREUR, VERT_OK)).move_to([-3.2, 0.3, 0])
        self.play(FadeIn(ex, shift=DOWN * 0.2))
        coefs = VGroup(
            self.T("a = 2", 32, BLEU_CALCUL),
            self.T("b = −3", 32, ROUGE_ERREUR),
            self.T("c = −5", 32, VERT_OK),
        ).arrange(RIGHT, buff=0.7).move_to([-3.2, -0.55, 0])
        self.play(FadeIn(coefs, shift=DOWN * 0.15))
        self.play(Circumscribe(coefs[1], color=ROUGE_ERREUR, buff=0.1))
        signe = self.T("le signe fait partie du coefficient", 26, ROUGE_ERREUR).next_to(coefs, DOWN, buff=0.22)
        self.play(FadeIn(signe))

        delta = self.rang("Δ =", self.carre("b", 40), "− 4ac", font_size=40).move_to([3.3, 0.3, 0])
        self.play(Write(delta))
        calc1 = self.rang("Δ =", self.puissance("(−3)", "2", 34), "− 4 × 2 × (−5)", font_size=34).move_to([3.3, -0.75, 0])
        calc2 = self.rang("= 9", self.T("+ 40", 40, VERT_OK), "=", self.T("49", 46, VERT_OK), font_size=40).move_to([3.3, -1.55, 0])
        self.play(FadeIn(calc1, shift=DOWN * 0.15))
        self.play(FadeIn(calc2, shift=DOWN * 0.15))
        self.play(Circumscribe(calc2[1], color=VERT_OK, buff=0.1))
        note = self.T("deux signes moins se compensent", 26, VERT_OK).next_to(calc2, DOWN, buff=0.22)
        self.play(FadeIn(note))

        self.play(Write(self.chute("Δ = b² − 4ac, avec les signes de a, b et c.")))
        self.attendre_voix()

    # ── écran 2 : Δ décide (sd_discriminant) ────────────────────────────────

    def ecran_delta_decide(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-delta-decide")
        self.titre_ecran("Δ ne calcule rien : il décide")

        cas = [
            (-1.0, BLEU_CALCUL, "Δ > 0", "deux racines"),
            (0.0, VERT_OK, "Δ = 0", "une racine double"),
            (0.8, ROUGE_ERREUR, "Δ < 0", "aucune racine"),
        ]
        colonnes = VGroup()
        # Trois colonnes posées à des abscisses FIXES, repères à la même hauteur :
        # un `arrange` dépendait de la hauteur de chaque courbe.
        for (d, coul, etiquette, verdict), x in zip(cas, (-4.3, -0.5, 3.1)):
            fig = self.petite_parabole(d, coul)
            # ⛔ Deuxième brouillon : `fig[0].move_to` ne déplaçait que les axes, les
            # trois courbes restaient superposées au centre. On décale le GROUPE,
            # en visant la position du repère.
            fig.shift(np.array([x, -0.1, 0]) - fig[0].get_center())
            haut = self.T(etiquette, 40, coul).move_to([x, 2.0, 0])
            bas = self.T(verdict, 28, coul).move_to([x, -2.0, 0])
            colonnes.add(VGroup(haut, fig, bas))
        for col in colonnes:
            self.play(FadeIn(col[0]), Create(col[1][0]), run_time=0.5)
            self.play(Create(col[1][1]), FadeIn(col[1][2]), run_time=0.9)
            self.play(FadeIn(col[2], shift=UP * 0.15), run_time=0.4)

        self.play(Write(self.chute("On calcule Δ d'abord, on décide ensuite.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 3 : la formule (sd_racines) ───────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-formule")
        self.titre_ecran("Δ > 0 : la formule des racines")

        formule = self.encadre(self.rang(
            "x =", self.frac(self.rang("−b ±", self.radical("Δ", font_size=36), font_size=36), self.T("2a", 36)),
            font_size=40,
        )).move_to([-3.6, 1.35, 0])
        self.play(FadeIn(formule[0]), Create(formule[1]))

        rappel = self.rang("f(x) =", self.T("2", 34, BLEU_CALCUL), self.carre("x", 34), self.terme_x("− 3", 34, ROUGE_ERREUR),
                           self.T("− 5", 34, VERT_OK), "     Δ = 49", font_size=34, buff=0.2).move_to([2.6, 2.1, 0])
        self.play(FadeIn(rappel))

        l1 = self.rang(self.radical("49", font_size=34), "= 7", "      −b = +3", font_size=34).move_to([2.6, 1.15, 0])
        self.play(FadeIn(l1, shift=DOWN * 0.15))
        self.play(Circumscribe(l1[-1], color=ROUGE_ERREUR, buff=0.1))

        l2 = self.rang("x =", self.frac(self.T("3 ± 7", 36), self.T("4", 36)), font_size=40).move_to([2.6, 0.05, 0])
        self.play(FadeIn(l2, shift=DOWN * 0.15))

        # La parabole, à gauche : les deux solutions sont là où elle coupe l'axe.
        fig = self.poser(self.parabole_signee(2, -1, 2.5, y_min=-6.8, y_max=3.0, x_length=3.0, y_length=2.4), -3.9, -1.0)
        self.play(Create(fig[0]), run_time=0.5)
        self.play(Create(fig[1]), FadeIn(fig[2]), run_time=1.0)

        s1 = self.rang(self.indice("x", 1, 34), "=", self.frac(self.T("−4", 32), self.T("4", 32)), "=",
                       self.T("−1", 40, VERT_OK), font_size=34)
        s2 = self.rang(self.indice("x", 2, 34), "=", self.frac(self.T("10", 32), self.T("4", 32)), "=",
                       self.T("2,5", 40, VERT_OK), font_size=34)
        sols = VGroup(s1, s2).arrange(RIGHT, buff=1.0).move_to([1.4, -1.3, 0])
        self.play(FadeIn(s1, shift=RIGHT * 0.2))
        self.play(FadeIn(s2, shift=RIGHT * 0.2))

        verif = self.rang("f(−1) = 2 + 3 − 5 = 0", self.coche(), font_size=28, color=BLEU_CALCUL).move_to([1.4, -2.15, 0])
        self.play(FadeIn(verif))

        self.play(Write(self.chute("−b : le signe de b se retourne.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 4 : Δ = 0 et Δ < 0 (sd_racines) ───────────────────────────────

    def ecran_zero_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-zero-negatif")
        self.titre_ecran("Δ = 0, et Δ < 0")

        separation = Line([0.2, 2.55, 0], [0.2, -1.9, 0], color=GREY_B, stroke_width=1.5)
        self.add(separation)

        # Gauche : Δ = 0.
        g1 = self.rang(self.carre("x", 40), "+ 6x + 9 = 0", font_size=40, buff=0.2).move_to([-3.3, 2.0, 0])
        g2 = self.rang("Δ = 36 − 36 =", self.T("0", 44, VERT_OK), font_size=36).move_to([-3.3, 0.95, 0])
        g3 = self.rang("x =", self.frac(self.T("−b", 32), self.T("2a", 32)), "=", self.frac(self.T("−6", 32), self.T("2", 32)),
                       "=", self.T("−3", 44, VERT_OK), font_size=36).move_to([-3.3, -0.25, 0])
        g4 = self.T("une seule racine, dite double", 28, VERT_OK).move_to([-3.3, -1.35, 0])
        for m in (g1, g2, g3, g4):
            self.play(FadeIn(m, shift=DOWN * 0.15), run_time=0.7)

        # Droite : Δ < 0.
        d1 = self.rang(self.carre("x", 40), "+ 2x + 5 = 0", font_size=40, buff=0.2).move_to([3.6, 2.0, 0])
        d2 = self.rang("Δ = 4 − 20 =", self.T("−16", 44, ROUGE_ERREUR), font_size=36).move_to([3.6, 0.95, 0])
        d3 = self.T("aucune racine", 34, ROUGE_ERREUR).move_to([3.6, -0.25, 0])
        faux = self.rang(self.radical("−16", font_size=34), "n'existe pas", font_size=30, color=ROUGE_ERREUR).move_to([3.6, -1.35, 0])
        for m in (d1, d2, d3):
            self.play(FadeIn(m, shift=DOWN * 0.15), run_time=0.7)
        self.play(FadeIn(faux))
        self.play(Create(self.barrer(faux[0])))

        self.play(Write(self.chute("Δ < 0 : on s'arrête là.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 5 : factoriser, et lire les racines (sd_factorisation, sd_forme_factorisee) ──

    def ecran_factoriser(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-factoriser")
        self.titre_ecran("Factoriser, et lire les racines")

        regle = self.encadre(self.rang(
            "a", self.carre("x", 38), "+ bx + c  =  a (x −", self.indice("x", 1, 38), ") (x −", self.indice("x", 2, 38), ")",
            font_size=38, buff=0.2,
        )).move_to([0, 2.1, 0])
        self.play(FadeIn(regle[0]), Create(regle[1]))

        ex = self.rang(self.T("2", 40, BLEU_CALCUL), self.carre("x", 40), "− 3x − 5", "=",
                       self.T("2", 40, BLEU_CALCUL), "(x + 1) (x − 2,5)", font_size=40, buff=0.22).move_to([0, 0.85, 0])
        self.play(FadeIn(ex, shift=DOWN * 0.15))
        self.play(Circumscribe(ex[4], color=BLEU_CALCUL, buff=0.1))
        note = self.T("le a reste devant", 26, BLEU_CALCUL).next_to(ex, DOWN, buff=0.2)
        self.play(FadeIn(note))

        lecture = self.rang("3 (x − 1) (x + 4) = 0", "  ⇒  x = 1", "ou", self.T("x = −4", 40, VERT_OK),
                            font_size=34, buff=0.3).move_to([-1.7, -0.85, 0])
        self.play(FadeIn(lecture, shift=DOWN * 0.15))
        self.play(Circumscribe(lecture[-1], color=VERT_OK, buff=0.1))
        piege = self.T("x + 4 s'annule pour x = −4, pas 4", 28, ORANGE_RETENUE).next_to(lecture, DOWN, buff=0.25)
        self.play(FadeIn(piege))
        # Et la parabole 3(x − 1)(x + 4), qui coupe l'axe en −4 et en 1.
        # (Brouillon : elle mordait sur « x = −4 » — la ligne est décalée à gauche.)
        fig = self.poser(self.parabole_signee(3, -4, 1, y_min=-19.5, y_max=6.0, x_length=2.4, y_length=1.9), 4.8, -1.1)
        self.play(Create(fig[0]), run_time=0.4)
        self.play(Create(fig[1]), FadeIn(fig[2]), run_time=0.9)

        self.play(Write(self.chute("Sur une forme factorisée, les racines se lisent.")))
        self.attendre_voix()

    # ── défi et correction ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = self.T("Résous — trouve les racines, s'il y en a :", 34, JAUNE_TITRE).move_to([0, 2.0, 0])
        self.play(Write(consigne))
        d1 = self.rang("1.", self.carre("x", 46), "− 3x − 10 = 0", font_size=46, buff=0.28).move_to([0, 0.8, 0])
        d2 = self.rang("2.", self.carre("x", 46), "− 2x + 7 = 0", font_size=46, buff=0.28).move_to([0, -0.55, 0])
        self.play(FadeIn(d1, shift=DOWN * 0.2))
        self.play(FadeIn(d2, shift=DOWN * 0.2))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-correction")
        self.titre_ecran("Correction")

        c1 = self.rang("1.", "Δ = 9 + 40 = 49", "      x =", self.frac(self.T("3 ± 7", 34), self.T("2", 34)),
                       font_size=36).move_to([-1.4, 1.6, 0])
        self.play(FadeIn(c1, shift=RIGHT * 0.2))
        r1 = self.rang("racines :", self.T("−2", 40, VERT_OK), "et", self.T("5", 40, VERT_OK), font_size=36, buff=0.4).move_to([-1.4, 0.6, 0])
        self.play(FadeIn(r1, shift=RIGHT * 0.2))
        self.play(Circumscribe(r1, color=VERT_OK, buff=0.15))
        f1 = self.poser(self.parabole_signee(1, -2, 5, y_min=-13.0, y_max=4.0, x_length=2.6, y_length=2.0), 4.4, 1.1)
        self.play(Create(f1[0]), Create(f1[1]), FadeIn(f1[2]), run_time=1.0)

        c2 = self.rang("2.", "Δ = 4 − 28 =", self.T("−24", 40, ROUGE_ERREUR), font_size=36).move_to([-1.4, -0.7, 0])
        self.play(FadeIn(c2, shift=RIGHT * 0.2))
        r2 = self.T("aucune racine — on s'arrête", 34, ROUGE_ERREUR).move_to([-1.4, -1.6, 0])
        self.play(FadeIn(r2))
        # La parabole de x² − 2x + 7 : sommet en (1 ; 6), elle ne descend jamais jusqu'à l'axe.
        f2 = self.poser(self.parabole_libre(lambda x: x * x - 2 * x + 7, -1.6, 3.6, -1.0, 13.0, ROUGE_ERREUR, 2.6, 2.0), 4.4, -1.2)
        self.play(Create(f2[0]), Create(f2[1]), run_time=1.0)
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Le second degré : Δ décide",
            accroche="f(x) = 0 : deux racines, une seule, ou aucune ?",
            promesse="Un seul nombre répond, avant tout calcul.",
        )
        self.page_objectifs([
            "identifier a, b, c et calculer le discriminant Δ",
            "lire sur le signe de Δ le nombre de racines",
            "calculer les racines, et factoriser le trinôme",
        ])
        self.ecran_abc()
        self.ecran_delta_decide()
        self.ecran_formule()
        self.ecran_zero_negatif()
        self.ecran_factoriser()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "identifier a, b, c et calculer Δ",
                "lire le nombre de racines sur le signe de Δ",
                "calculer les racines, et factoriser",
            ],
            rappel="Δ < 0 : on s'arrête. √Δ n'existe pas.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  VIDÉO 2 — LE SIGNE DU TRINÔME ET LES INÉQUATIONS
#  sd_signe, sd_inequation, sd_somme_produit (+ sd_forme_factorisee, sd_deux_racines)
# ══════════════════════════════════════════════════════════════════════════════

class SecondDegreSigne(SecondDegreBase):

    dossier_voix = SONS / "premiere-second-degre-signe"
    episode = "2"

    # ── écran 1 : la règle (sd_signe) ───────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-regle")
        self.titre_ecran("Du signe de a, sauf entre les racines")

        gauche = self.poser(self.parabole_signee(1, -1, 1, x_length=4.2, y_length=3.2), -3.2, 0.1)
        tg = self.T("a > 0", 36, BLEU_CALCUL).move_to([-3.2, 2.15, 0])
        lg = VGroup(self.T("+ dehors", 28, VERT_OK), self.T("− entre", 28, ROUGE_ERREUR)).arrange(RIGHT, buff=0.6).move_to([-3.2, -1.95, 0])
        self.play(FadeIn(tg), Create(gauche[0]), run_time=0.6)
        self.play(Create(gauche[1]), FadeIn(gauche[2]), run_time=1.2)
        self.play(FadeIn(lg, shift=UP * 0.15))

        droite = self.poser(self.parabole_signee(-1, -1, 1, x_length=4.2, y_length=3.2), 3.0, 0.1)
        td = self.T("a < 0", 36, ORANGE_RETENUE).move_to([3.0, 2.15, 0])
        ld = VGroup(self.T("− dehors", 28, ROUGE_ERREUR), self.T("+ entre", 28, VERT_OK)).arrange(RIGHT, buff=0.6).move_to([3.0, -1.95, 0])
        self.play(FadeIn(td), Create(droite[0]), run_time=0.6)
        self.play(Create(droite[1]), FadeIn(droite[2]), run_time=1.2)
        self.play(FadeIn(ld, shift=UP * 0.15))

        self.play(Write(self.chute("Une seule phrase, et c'est a qui commande.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 2 : le tableau de signes (sd_signe) ───────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Le tableau de signes")

        f = self.rang("f(x) =", self.T("2", 38, BLEU_CALCUL), self.carre("x", 38), "− 8x + 6", font_size=38, buff=0.2).move_to([-3.4, 2.1, 0])
        self.play(FadeIn(f))
        rac = self.rang("Δ = 64 − 48 = 16", "     x =", self.frac(self.T("8 ± 4", 30), self.T("4", 30)), font_size=30).move_to([-3.2, 1.1, 0])
        self.play(FadeIn(rac, shift=DOWN * 0.15))
        r = self.rang("racines :", self.T("1", 36, VERT_OK), "et", self.T("3", 36, VERT_OK), font_size=32, buff=0.3).move_to([3.6, 2.1, 0])
        self.play(FadeIn(r, shift=LEFT * 0.15))
        a = self.T("a = 2 > 0 : + dehors, − entre", 26, BLEU_CALCUL).move_to([3.8, 1.3, 0])
        self.play(FadeIn(a))

        # La parabole colorée par son signe, à droite du tableau : les deux disent la même chose.
        fig = self.poser(self.parabole_signee(2, 1, 3, y_min=-2.6, y_max=3.2, x_length=3.2, y_length=2.4), 4.3, -0.55)
        self.play(Create(fig[0]), Create(fig[1]), FadeIn(fig[2]), run_time=1.0)

        tab = self.tableau_signes(["−∞", "1", "3", "+∞"], ["+", "0", "−", "0", "+"], largeur=6.4, font_size=30)
        tab.move_to([-1.9, -0.55, 0])
        self.play(Create(tab[0]), Create(tab[1]), Create(tab[2]), FadeIn(tab[3]), FadeIn(tab[4]), run_time=0.8)
        self.play(FadeIn(VGroup(*tab[5:]), lag_ratio=0.1), run_time=1.4)

        ctrl = self.rang("contrôle avec x = 2 :  f(2) = 8 − 16 + 6 =", self.T("−2", 30, ROUGE_ERREUR), self.coche(),
                         font_size=28, color=BLEU_CALCUL).move_to([-1.4, -2.05, 0])
        self.play(FadeIn(ctrl))

        self.play(Write(self.chute("Les racines d'abord, le signe de a ensuite.")))
        self.attendre_voix()

    # ── écran 3 : Δ < 0, le signe de a partout (sd_signe) ───────────────────

    def ecran_delta_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-delta-negatif")
        self.titre_ecran("Δ < 0 : le signe de a partout")

        f = self.rang(self.carre("x", 40), "+ 2x + 5", "      Δ = 4 − 20 =", self.T("−16", 40, ROUGE_ERREUR),
                      font_size=40, buff=0.2).move_to([0, 2.05, 0])
        self.play(FadeIn(f))

        ax = Axes(x_range=[-3.2, 1.6, 1], y_range=[-1.2, 6.4, 1], x_length=4.6, y_length=3.4,
                  axis_config={"include_numbers": False, "include_ticks": False, "stroke_width": 2}, tips=False)
        ax.move_to([-3.2, -0.3, 0])
        c = ax.plot(lambda x: x * x + 2 * x + 5, x_range=[-3.05, 1.05], color=VERT_OK, stroke_width=4)
        self.play(Create(ax), run_time=0.6)
        self.play(Create(c), run_time=1.2)

        t1 = self.T("pas de racine", 32, WHITE).move_to([3.2, 1.0, 0])
        t2 = self.T("donc pas d'« entre »", 32, WHITE).move_to([3.2, 0.3, 0])
        t3 = self.rang("f(x)", self.T("> 0", 40, VERT_OK), "pour tout x", font_size=36, buff=0.25).move_to([3.2, -0.8, 0])
        for t in (t1, t2, t3):
            self.play(FadeIn(t, shift=LEFT * 0.15), run_time=0.7)
        self.play(Circumscribe(t3, color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("Même règle : l'« entre » est simplement vide.")))
        self.attendre_voix()

    # ── écran 4 : une inéquation (sd_inequation) ────────────────────────────

    def ecran_inequation(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-inequation")
        self.titre_ecran("Résoudre une inéquation")

        ineq = self.rang(self.carre("x", 44), "− 4x − 5", self.T("≤ 0", 44, JAUNE_TITRE), font_size=44, buff=0.22).move_to([0, 2.1, 0])
        self.play(FadeIn(ineq))

        rac = self.rang("Δ = 16 + 20 = 36", "    x =", self.frac(self.T("4 ± 6", 30), self.T("2", 30)), "   →",
                        self.T("−1", 34, VERT_OK), "et", self.T("5", 34, VERT_OK), font_size=30, buff=0.25).move_to([-0.3, 1.05, 0])
        self.play(FadeIn(rac, shift=DOWN * 0.15))

        tab = self.tableau_signes(["−∞", "−1", "5", "+∞"], ["+", "0", "−", "0", "+"], largeur=6.4, font_size=28)
        tab.move_to([-1.9, -0.35, 0])
        self.play(FadeIn(tab), run_time=1.0)
        fig = self.poser(self.parabole_signee(1, -1, 5, y_min=-9.8, y_max=3.5, x_length=3.2, y_length=2.4), 4.3, -0.35)
        self.play(Create(fig[0]), Create(fig[1]), FadeIn(fig[2]), run_time=1.0)

        s = self.rang("S =", self.T("[ −1 ; 5 ]", 46, VERT_OK), font_size=42, buff=0.3).move_to([-2.6, -1.85, 0])
        self.play(FadeIn(s, shift=UP * 0.15))
        self.play(Circumscribe(s[1], color=VERT_OK, buff=0.15))
        note = self.T("≤ : bornes comprises", 26, BLEU_CALCUL).next_to(s, RIGHT, buff=0.6)
        self.play(FadeIn(note))

        self.play(Write(self.chute("La solution est un intervalle, pas un nombre.", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── écran 5 : quand a est négatif (sd_inequation, sd_signe) ─────────────

    def ecran_a_negatif(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-a-negatif")
        self.titre_ecran("Quand a est négatif, tout s'inverse")

        ineq = self.rang(self.T("−", 44, ORANGE_RETENUE), self.carre("x", 44), "+ 2x + 8", self.T("< 0", 44, JAUNE_TITRE),
                         font_size=44, buff=0.16).move_to([0, 2.2, 0])
        self.play(FadeIn(ineq))

        rac = self.rang("Δ = 4 + 32 = 36", "    x =", self.frac(self.T("−2 ± 6", 30), self.T("−2", 30)), "   →",
                        self.T("−2", 34, VERT_OK), "et", self.T("4", 34, VERT_OK), font_size=30, buff=0.25).move_to([-0.3, 1.25, 0])
        self.play(FadeIn(rac, shift=DOWN * 0.15))

        # ⛔ Brouillon : la phrase sur a se posait SUR la ligne des racines. Elle a
        # sa hauteur à elle, entre les racines et le tableau.
        a = self.T("a = −1 < 0 : − dehors, + entre", 26, ORANGE_RETENUE).move_to([-1.9, 0.5, 0])
        self.play(FadeIn(a))
        tab = self.tableau_signes(["−∞", "−2", "4", "+∞"], ["−", "0", "+", "0", "−"], largeur=6.4, font_size=28)
        tab.move_to([-1.9, -0.6, 0])
        self.play(FadeIn(tab), run_time=1.0)
        fig = self.poser(self.parabole_signee(-1, -2, 4, y_min=-3.5, y_max=9.8, x_length=3.2, y_length=2.4), 4.3, -0.3)
        self.play(Create(fig[0]), Create(fig[1]), FadeIn(fig[2]), run_time=1.0)

        s = self.rang("S =", self.T("] −∞ ; −2 [  ∪  ] 4 ; +∞ [", 40, VERT_OK), font_size=40, buff=0.3).move_to([-1.4, -1.95, 0])
        self.play(FadeIn(s, shift=UP * 0.15))
        self.play(Circumscribe(s[1], color=VERT_OK, buff=0.15))

        self.play(Write(self.chute("Contrôle : f(0) = 8 > 0, donc 0 n'est pas solution.", color=BLEU_CALCUL)))
        self.attendre_voix()

    # (La somme et le produit des racines ne sont PAS dans cette vidéo —
    #  Frédéric, 15/09 : « on s'en fout ». Ils restent au coach et sur la feuille.)

    # ── défi et correction ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        consigne = self.T("Résous l'inéquation :", 36, JAUNE_TITRE).move_to([0, 1.8, 0])
        self.play(Write(consigne))
        d = self.rang(self.carre("x", 50), "− 5x + 6", self.T("> 0", 50, JAUNE_TITRE), font_size=50, buff=0.24).move_to([0, 0.4, 0])
        self.play(FadeIn(d, shift=DOWN * 0.2))
        aide = self.T("les racines, le signe de a, puis l'intervalle", 28, WHITE).move_to([0, -0.8, 0])
        self.play(FadeIn(aide))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")

        r = self.rang("Δ = 25 − 24 = 1", "    x =", self.frac(self.T("5 ± 1", 30), self.T("2", 30)), "  →",
                      self.T("2", 38, VERT_OK), "et", self.T("3", 38, VERT_OK), font_size=32, buff=0.28).move_to([-0.6, 1.7, 0])
        self.play(FadeIn(r, shift=RIGHT * 0.2))
        tab = self.tableau_signes(["−∞", "2", "3", "+∞"], ["+", "0", "−", "0", "+"], largeur=6.4, font_size=28)
        tab.move_to([-1.9, 0.2, 0])
        self.play(FadeIn(tab), run_time=1.0)
        fig = self.poser(self.parabole_signee(1, 2, 3, y_min=-1.4, y_max=2.2, x_length=3.2, y_length=2.4), 4.3, 0.2)
        self.play(Create(fig[0]), Create(fig[1]), FadeIn(fig[2]), run_time=1.0)
        a = self.T("a = 1 > 0, on veut > 0 : dehors, bornes exclues", 26, BLEU_CALCUL).move_to([-1.4, -1.0, 0])
        self.play(FadeIn(a))
        s = self.rang("S =", self.T("] −∞ ; 2 [  ∪  ] 3 ; +∞ [", 42, VERT_OK), font_size=42, buff=0.3).move_to([-1.4, -1.9, 0])
        self.play(FadeIn(s, shift=UP * 0.15))
        self.play(Circumscribe(s[1], color=VERT_OK, buff=0.15))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Le second degré : le signe du trinôme",
            accroche="Positif ou négatif ? Ça dépend d'où l'on est.",
            promesse="Le tableau de signes · les inéquations · les deux pièges",
        )
        self.page_objectifs([
            "donner le signe d'un trinôme, avec un tableau de signes",
            "résoudre une inéquation du second degré",
            "éviter les deux pièges : a négatif, Δ négatif",
        ])
        self.ecran_regle()
        self.ecran_tableau()
        self.ecran_delta_negatif()
        self.ecran_inequation()
        self.ecran_a_negatif()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "le signe d'un trinôme, avec le tableau de signes",
                "résoudre une inéquation du second degré",
                "les deux pièges : a négatif, Δ négatif",
            ],
            rappel="Du signe de a, sauf entre les racines. Si a < 0, tout s'inverse.",
        )
        self.page_abonnement()
