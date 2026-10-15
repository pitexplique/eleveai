# second_degre_short_lucarne.py
# EleveAI — Maths seconde — le short « Coup franc à 30 m : la lucarne »
#
# ⭐ 25/09/2026, jour de Turquie–France (Ligue des nations). Frédéric : « quelle
# est la trajectoire d'un ballon pour atteindre la lucarne », puis « à 30 m des
# poteaux ». Même gabarit que le short dauphin/baleine (1re spé), qu'il a adoré :
# l'équation donnée, les réponses lues sur le dessin, « à quoi ça sert ».
# ⛔ Niveau SECONDE : pas de Δ. On calcule des images, puis on résout y = 0 en
# FACTORISANT (produit nul).
#
# ⛔ Modèle vérifié :  y = −0,012x² + 0,432x = 0,012·x·(36 − x)
#   mur  x = 9,15 → y ≈ 2,95 (mur qui saute ≈ 2,25 : ordre de grandeur)
#   but  x = 30   → y = −10,8 + 12,96 = 2,16 → 0,28 m sous la barre (2,44)
#   racines 0 et 36 ; sommet x = 18 → y = 3,888 ≈ 3,89
#   Sans l'effet ni l'air : dit en toutes lettres à l'écran 07.
#
# Voix : powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/seconde-second-degre-short-lucarne.json -Debit -4
# Rendu :
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/seconde/second_degre_short_lucarne.py SecondDegreShortLucarne -o eleveai-maths-seconde-second-degre-short-lucarne --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_seconde import SONS, ShortSeconde

C_TIR = BLEU_CALCUL
C_MUR = ROUGE_ERREUR
C_BUT = WHITE

TIR = lambda x: -0.012 * x * x + 0.432 * x
X_MUR, H_MUR = 9.15, 2.25
X_BUT, H_BARRE = 30, 2.44


class SecondDegreShortLucarne(ShortSeconde):

    dossier_voix = SONS / "seconde-second-degre-short-lucarne"

    def borner(self, m, marge=0.5):
        if m.width > config.frame_width - marge:
            m.scale_to_fit_width(config.frame_width - marge)
        return m

    def equation(self, font_size=30, color=C_TIR):
        """y = −0,012 x² + 0,432 x, sans LaTeX : le carré est composé."""
        e = VGroup(
            Text("y = −0,012", font_size=font_size, color=color),
            self.puissance("x", "2", font_size=font_size, color=color),
            Text("+ 0,432x", font_size=font_size, color=color),
        ).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)
        e[1].shift(UP * 0.02)
        return self.borner(e)

    def terrain(self, centre=(0.1, 0.0), x_len=4.0, y_len=2.0, jusqua=X_BUT, numeros=True):
        """Le terrain vu de côté : le mur, le but (poteau, barre, filet), le tir."""
        ax = Axes(x_range=[0, 37, 6], y_range=[0, 4.5, 1], x_length=x_len, y_length=y_len, tips=False,
                  x_axis_config={"include_numbers": numeros, "label_constructor": Text, "font_size": 14},
                  y_axis_config={"include_numbers": numeros, "label_constructor": Text, "font_size": 14})
        ax.move_to([centre[0], centre[1], 0])
        mur = Polygon(ax.c2p(X_MUR - 0.5, 0), ax.c2p(X_MUR + 0.5, 0), ax.c2p(X_MUR + 0.5, H_MUR),
                      ax.c2p(X_MUR - 0.5, H_MUR), color=C_MUR, fill_opacity=0.55, stroke_width=2)
        poteau = Line(ax.c2p(X_BUT, 0), ax.c2p(X_BUT, H_BARRE), color=C_BUT, stroke_width=5)
        barre = Line(ax.c2p(X_BUT, H_BARRE), ax.c2p(X_BUT + 1.6, H_BARRE), color=C_BUT, stroke_width=5)
        filet = DashedLine(ax.c2p(X_BUT + 1.6, H_BARRE), ax.c2p(X_BUT + 3.2, 0), color=GREY_B, stroke_width=2)
        but = VGroup(poteau, barre, filet)
        tir = ax.plot(TIR, x_range=[0, jusqua], color=C_TIR, stroke_width=5)
        return ax, mur, but, tir

    def ballon(self, ax, x):
        return Dot(ax.c2p(x, TIR(x)), color=WHITE, radius=0.07).set_stroke(C_TIR, 2)

    def footballeur(self, pose="frappe"):
        """Un joueur façon BANDE DESSINÉE, cerné de noir : maillot bleu, short
        blanc, chaussettes rouges. Haut de 1,1 unité, les pieds en y = 0.
        Renvoie (le joueur, sa jambe de frappe, une fonction qui donne la hanche
        À JOUR — la jambe tourne autour d'elle, et le joueur a bougé entre-temps)."""
        PEAU, NUIT, CHEVEUX = "#E0AC69", "#1D3C8F", "#3B2A1A"

        def membre(a, b, couleur, w=8):
            a, b = np.array([*a, 0]), np.array([*b, 0])
            return VGroup(Line(a, b, color=BLACK, stroke_width=w + 5), Line(a, b, color=couleur, stroke_width=w))

        def jambe_de(hx, fx):
            genou = ((hx + fx) / 2, 0.24)
            return VGroup(membre((hx, 0.42), genou, PEAU), membre(genou, (fx, 0.06), RED),
                          Ellipse(width=0.16, height=0.08, color=BLACK, fill_opacity=1).move_to([fx + 0.03, 0.04, 0]))

        appui = jambe_de(-0.06, -0.1)
        frappe = jambe_de(0.06, 0.08)
        bras = VGroup(membre((-0.12, 0.8), (-0.26, 0.56), PEAU, 7), membre((0.12, 0.8), (0.25, 0.6), PEAU, 7))
        if pose == "bras_croises":
            # ⭐ La célébration demandée par Frédéric (« le geste de Mbappé ») : les
            # bras croisés sur la poitrine, droit comme un i. Le GESTE seul — le
            # joueur reste générique, aucun visage ni nom de personne réelle.
            appui = jambe_de(-0.07, -0.08)
            frappe = jambe_de(0.07, 0.08)
            bras = VGroup(membre((-0.13, 0.8), (0.1, 0.64), PEAU, 7),
                          membre((0.13, 0.8), (-0.1, 0.68), PEAU, 7))
        maillot = Polygon([-0.14, 0.84, 0], [0.14, 0.84, 0], [0.12, 0.5, 0], [-0.12, 0.5, 0],
                          color=BLACK, stroke_width=3).set_fill(NUIT, 1)
        short = Polygon([-0.12, 0.5, 0], [0.12, 0.5, 0], [0.13, 0.38, 0], [-0.13, 0.38, 0],
                        color=BLACK, stroke_width=3).set_fill(WHITE, 1)
        tete = Circle(radius=0.13, color=BLACK, stroke_width=3).set_fill(PEAU, 1).move_to([0.01, 0.97, 0])
        cheveux = Sector(radius=0.135, angle=PI, start_angle=0, color=CHEVEUX, fill_opacity=1).move_to([0.01, 1.03, 0])
        oeil = Dot([0.07, 0.98, 0], radius=0.018, color=BLACK)
        joueur = VGroup(appui, short, maillot, frappe, bras, tete, cheveux, oeil)
        if pose == "bras_croises":
            # de face : deux yeux et un sourire
            oeil.move_to([-0.04, 0.98, 0])
            joueur.add(Dot([0.06, 0.98, 0], radius=0.018, color=BLACK),
                       Arc(radius=0.06, start_angle=PI + 0.5, angle=PI - 1.0, color=BLACK,
                           stroke_width=3).move_to([0.01, 0.91, 0]))
        repere = Dot([0.06, 0.42, 0], radius=0.001).set_opacity(0)  # suit la hanche de frappe
        joueur.add(repere)
        return joueur, frappe, (lambda: repere.get_center())

    def rouler(self, ax, a, b, run_time=1.2):
        """⭐ Frédéric, 25/09 : « un ballon qui suit la parabole ». Le ballon part
        de x = a et suit la courbe jusqu'à x = b ; il reste à l'image."""
        bal = self.ballon(ax, a)
        self.add(bal)
        self.play(MoveAlongPath(bal, ax.plot(TIR, x_range=[a, b])), run_time=run_time, rate_func=linear)
        return bal

    # ── 00 : l'accroche — tout à l'image dès la première seconde ────────────

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        haut = VGroup(
            self.grand("France – Turquie", font_size=30, color=WHITE),
            self.grand("Coup franc à 30 m", font_size=46, color=JAUNE_TITRE),
            # ⭐ Frédéric, 25/09 : « l'important c'est l'angle de 23° et la vitesse »
            self.grand("23° et 80 km/h", font_size=42, color=VERT_OK),
            self.grand("la recette de la lucarne ?", font_size=30, color=C_TIR),
        ).arrange(DOWN, buff=0.16).move_to([0, 2.15, 0])
        # ⛔ Brouillon : l'étiquette « mur » sous le mur chevauchait « mur : 9,15 m ».
        # Le repère monte, seule la légende du bas nomme le mur (en rouge, comme lui).
        # ⚠️ Le repère glisse à droite (origine à x ≈ −1,55) : il faut la place du
        # footballeur à gauche du ballon, dans un cadre large de 4,5.
        ax, mur, but, tir = self.terrain(centre=(0.3, -0.3), x_len=3.7, numeros=False)
        lb = Text("but", font_size=18, color=C_BUT).next_to(but, DOWN, buff=0.1)

        # ⭐ Frédéric, 25/09 : « en premier tu dessines un footballeur qui arrive
        # et qui shoote… un peu comme une bande dessinée… un peu fun ».
        # ⛔ Brouillon : à l'échelle du terrain, le joueur faisait 1,1 unité et se
        # collait à l'axe — illisible sur un téléphone. D'où une CASE de BD en gros
        # plan (joueur ×2), puis la case DÉZOOME sur le terrain : le joueur rétrécit
        # jusqu'à sa place, et le ballon trace la parabole.
        joueur, jambe, hanche = self.footballeur()
        joueur.scale(2.0)
        sol_case = -1.55
        case = RoundedRectangle(corner_radius=0.12, width=4.2, height=2.7, color=WHITE, stroke_width=4
                                ).move_to([0, -0.55, 0])
        gros = Circle(radius=0.14, color=BLACK, stroke_width=3).set_fill(WHITE, 1).move_to([0.35, sol_case + 0.14, 0])
        joueur.move_to([-3.3, sol_case + joueur.height / 2, 0])
        self.add(haut, case, gros, joueur)  # à l'image à la première seconde : la question + la case
        vitesse = VGroup(*[Line(LEFT * 0.5, ORIGIN, color=WHITE, stroke_width=4).move_to(
            [-1.35, sol_case + h, 0]) for h in (0.5, 1.0, 1.5)])
        self.play(joueur.animate.move_to([-0.3, joueur.get_center()[1], 0]), run_time=1.0, rate_func=rush_from)
        self.play(FadeIn(vitesse, shift=RIGHT * 0.3), run_time=0.25)
        self.play(FadeOut(vitesse), Rotate(jambe, angle=-0.8, about_point=hanche()), run_time=0.35)
        paf = VGroup(
            Star(n=9, outer_radius=0.72, inner_radius=0.5, color=BLACK, stroke_width=4).set_fill(JAUNE_TITRE, 1),
            Text("PAF !", font_size=26, color=BLACK, weight=BOLD),
        ).move_to([1.2, sol_case + 1.1, 0])
        self.play(Rotate(jambe, angle=1.5, about_point=hanche()), FadeIn(paf, scale=0.4),
                  gros.animate.shift(RIGHT * 0.25 + UP * 0.1), run_time=0.2)
        self.wait(0.3)
        # le dézoom : la case s'efface, le terrain apparaît, le joueur prend sa place
        b = self.ballon(ax, 0)
        sol = ax.c2p(0, 0)
        self.play(FadeOut(case), FadeOut(paf), FadeIn(ax), FadeIn(mur), FadeIn(but), FadeIn(lb),
                  joueur.animate.scale(0.5).move_to([sol[0] - 0.3, sol[1] + joueur.height / 4, 0]),
                  ReplacementTransform(gros, b), run_time=0.8)
        self.play(Create(tir), MoveAlongPath(b, tir), run_time=1.5, rate_func=linear)
        # ⭐ « un peu fun » : la bulle BUT !! et le joueur qui saute de joie.
        but_bulle = VGroup(
            Star(n=11, outer_radius=0.62, inner_radius=0.44, color=BLACK, stroke_width=3).set_fill(ORANGE_RETENUE, 1),
            Text("BUT !!", font_size=17, color=BLACK, weight=BOLD),
        ).move_to([0.6, -0.6, 0])  # ⛔ au-dessus du but, elle sortait du cadre : sous la courbe, place libre
        self.play(Flash(b, color=JAUNE_TITRE, line_length=0.25), FadeIn(but_bulle, scale=0.3),
                  Rotate(jambe, angle=-0.7, about_point=hanche()), run_time=0.5)
        # La CÉLÉBRATION : retour en gros plan, dans une case de BD — bras croisés.
        terrain = VGroup(ax, mur, but, tir, b, lb, joueur, but_bulle)
        star, _, _ = self.footballeur(pose="bras_croises")
        star.scale(2.1).move_to([-0.5, sol_case + 1.1 * 2.1 / 2, 0])
        case2 = RoundedRectangle(corner_radius=0.12, width=4.2, height=2.7, color=WHITE, stroke_width=4
                                 ).move_to([0, -0.55, 0])
        bulle2 = VGroup(
            Star(n=11, outer_radius=0.7, inner_radius=0.5, color=BLACK, stroke_width=4).set_fill(ORANGE_RETENUE, 1),
            Text("BUT !!", font_size=22, color=BLACK, weight=BOLD),
        ).move_to([1.15, 0.35, 0])
        self.play(FadeOut(terrain), FadeIn(case2), FadeIn(star, scale=0.8), run_time=0.5)
        self.play(FadeIn(bulle2, scale=0.4), star.animate.shift(UP * 0.12), run_time=0.3)
        self.play(star.animate.shift(DOWN * 0.12), run_time=0.2)
        self.wait(1.3)
        self.play(FadeOut(case2), FadeOut(star), FadeOut(bulle2), FadeIn(terrain), run_time=0.5)
        rep = VGroup(
            Text("mur à 9,15 m", font_size=22, color=C_MUR),
            Text("barre à 2,44 m", font_size=22, color=C_BUT),
        ).arrange(DOWN, buff=0.1).move_to([0, -1.95, 0])
        self.play(FadeIn(rep, shift=UP * 0.1))
        self.attendre_voix(marge=0.3)

    # ── 01 : l'équation du tir ──────────────────────────────────────────────

    def ecran_equation(self):
        self.clear()
        self.margo_bas()
        self.dire("01-equation")
        self.play(Write(self.grand("Le tir", font_size=44, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        eq = self.equation().move_to([0, 2.2, 0])
        self.play(FadeIn(eq, shift=RIGHT * 0.1))
        ax, mur, but, tir = self.terrain(centre=(0.1, 0.35))
        self.play(Create(ax), FadeIn(mur), FadeIn(but), run_time=0.8)
        b = self.ballon(ax, 0)
        self.add(b)
        self.play(Create(tir), MoveAlongPath(b, tir), run_time=1.8, rate_func=linear)
        legende = VGroup(self.grand("x : la distance, en m", font_size=24, color=WHITE),
                         self.grand("y : la hauteur, en m", font_size=24, color=WHITE)
                         ).arrange(DOWN, buff=0.1).move_to([0, -1.8, 0])
        self.play(FadeIn(legende))
        self.attendre_voix(marge=0.3)

    # ── 01b : l'angle de départ (Frédéric, 25/09 : « il manque l'angle ») ───
    # ⭐ Sans dérivée : près de 0, x² est négligeable, le tir suit y = 0,432x ;
    # tan(angle) = 0,432 → ≈ 23,4°. ⛔ Repère à ÉCHELLE ÉGALE (1,2 unité par
    # mètre sur les deux axes), sinon l'angle dessiné ment.

    def ecran_angle(self):
        self.clear()
        self.margo_bas()
        self.dire("01b-angle")
        self.play(Write(self.grand("L'angle de départ ?", font_size=40, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        # ⛔ Brouillon : de 0 à 3 m, le triangle était minuscule et « 23° » s'y
        # écrasait. Zoom de 0 à 2 m, 1,9 unité par mètre sur les DEUX axes.
        ax = Axes(x_range=[0, 2, 1], y_range=[0, 0.9, 1], x_length=3.8, y_length=1.71, tips=False,
                  axis_config={"include_numbers": False}).move_to([0, 1.35, 0])
        tir = ax.plot(TIR, x_range=[0, 2], color=C_TIR, stroke_width=5)
        droite = DashedLine(ax.c2p(0, 0), ax.c2p(2, 0.864), color=ORANGE_RETENUE, stroke_width=3)
        self.play(Create(ax), Create(tir), run_time=0.8)
        l1 = self.grand("x petit : y ≈ 0,432x", font_size=28, color=ORANGE_RETENUE).move_to([0, -0.2, 0])
        self.play(Create(droite), FadeIn(l1))
        tri = Polygon(ax.c2p(0, 0), ax.c2p(1, 0), ax.c2p(1, 0.432), color=WHITE, stroke_width=3)
        t1 = Text("1 m", font_size=20, color=WHITE).next_to(ax.c2p(0.5, 0), DOWN, buff=0.1)
        t2 = Text("0,43 m", font_size=20, color=WHITE).next_to(ax.c2p(1, 0.216), RIGHT, buff=0.08)
        self.play(Create(tri), FadeIn(t1), FadeIn(t2))
        a = np.arctan(0.432)
        arc = Arc(radius=0.7, start_angle=0, angle=a, arc_center=ax.c2p(0, 0), color=VERT_OK, stroke_width=4)
        ta = Text("23°", font_size=24, color=VERT_OK).move_to(ax.c2p(0, 0) + 1.15 * np.array([np.cos(a / 2), np.sin(a / 2), 0]))
        l2 = self.grand("tan(angle) = 0,432", font_size=30, color=WHITE).move_to([0, -0.85, 0])
        self.play(FadeIn(l2))
        l3 = self.grand("angle ≈ 23°", font_size=44, color=VERT_OK).move_to([0, -1.65, 0])
        self.play(Create(arc), FadeIn(ta), Write(l3))
        self.attendre_voix(marge=0.3)

    # ── 01c : la vitesse — lue par la PHYSIQUE, pas calculée en seconde ─────
    # ⛔ Modèle sans air : 0,012 = g / (2 v² cos²θ) → v² ≈ 485, v ≈ 22,0 m/s
    # (79 km/h) ; vitesse horizontale ≈ 20,2 m/s → 30 m en ≈ 1,48 s.

    def ecran_vitesse(self):
        self.clear()
        self.margo_bas()
        self.dire("01c-vitesse")
        self.play(Write(self.grand("Et la vitesse ?", font_size=42, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        l1 = self.grand("la physique la lit dans le 0,012", font_size=24, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(l1))
        v = VGroup(
            self.grand("v ≈ 22 m/s", font_size=44, color=C_TIR),
            self.grand("≈ 80 km/h", font_size=34, color=C_TIR),
        ).arrange(DOWN, buff=0.12).move_to([0, 1.45, 0])
        self.play(FadeIn(v, scale=1.1))
        ax, mur, but, tir = self.terrain(centre=(0.1, -0.35), y_len=1.4, numeros=False)
        self.add(ax, mur, but)
        b = self.ballon(ax, 0)
        self.add(b)
        # ⭐ le ballon met VRAIMENT 1,5 s à l'écran
        self.play(Create(tir), MoveAlongPath(b, tir), run_time=1.5, rate_func=linear)
        chrono = self.grand("1,5 s", font_size=40, color=ORANGE_RETENUE).move_to(ax.c2p(30, 4.3))
        self.play(FadeIn(chrono, scale=1.2), Flash(b, color=ORANGE_RETENUE, line_length=0.2))
        g = self.grand("le temps du gardien", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.85, 0])
        self.play(Write(g))
        self.attendre_voix(marge=0.3)

    # ── 02 : le mur ─────────────────────────────────────────────────────────

    # ⭐ Frédéric, 25/09 : « quand tu parles du mur et de la barre, fais un zoom
    # dessus ». Le terrain entier d'abord, puis on PLONGE sur l'objet décrit ; les
    # mesures s'écrivent sur la figure agrandie, pas dans un bloc de texte à part.
    # ⚠️ Les graduations ne survivent pas au zoom (elles grossiraient sur le
    # texte du bas) : les axes s'effacent, un trait de sol les remplace.

    def zoomer(self, ax, objets, x0, cible, k):
        """Agrandit `objets` d'un facteur k autour du pied de x0, posé en `cible`.
        Renvoie la fonction qui place un point (x, y) du terrain dans le zoom."""
        pivot = ax.c2p(x0, 0)
        cible = np.array(cible)
        sol = Line(ax.c2p(-3, 0), ax.c2p(40, 0), color=WHITE, stroke_width=2)
        self.play(FadeOut(ax), FadeIn(sol), run_time=0.4)
        g = VGroup(sol, *objets)
        self.play(g.animate.scale(k, about_point=pivot).shift(cible - pivot), run_time=1.3)
        return lambda x, y: cible + k * (ax.c2p(x, y) - pivot)

    def ecran_mur(self):
        self.clear()
        self.margo_bas()
        self.dire("02-mur")
        self.play(Write(self.grand("Et le mur ?", font_size=44, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        ax, mur, but, tir = self.terrain(centre=(0.1, 0.5), y_len=1.8)
        self.add(ax, mur, but, tir)
        calc = self.grand("x = 9,15  →  y ≈ 2,95 m", font_size=30, color=C_TIR).move_to([0, 2.35, 0])
        self.play(FadeIn(calc))
        p = self.rouler(ax, 0, X_MUR, run_time=0.9)
        # ⛔ k = 2,2 et sol à −1,3 : à 2,5 la courbe montait sur la ligne de calcul.
        # Le ballon est DANS le zoom : il grossit avec la figure.
        P = self.zoomer(ax, [mur, but, tir, p], X_MUR, (0, -1.3, 0), 2.2)
        tp = Text("2,95 m", font_size=26, color=C_TIR).next_to(p, UL, buff=0.1)
        self.play(FadeIn(tp), Flash(p, color=C_TIR, line_length=0.2))
        # ⛔ Brouillon : à droite du mur, l'étiquette sortait du cadre. À gauche, sur
        # deux lignes, sous la courbe qui monte.
        tm = VGroup(Text("mur", font_size=24, color=C_MUR), Text("≈ 2,25 m", font_size=24, color=C_MUR)
                    ).arrange(DOWN, buff=0.06).next_to(P(X_MUR - 0.6, H_MUR * 0.3), LEFT, buff=0.12)
        self.play(FadeIn(tm), Indicate(mur, color=C_MUR, scale_factor=1.06))
        fl = DoubleArrow(P(X_MUR, H_MUR), P(X_MUR, TIR(X_MUR)), buff=0.02, color=VERT_OK,
                         stroke_width=4, tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        tf = Text("70 cm", font_size=24, color=VERT_OK).next_to(fl, RIGHT, buff=0.12)
        self.play(GrowFromCenter(fl), FadeIn(tf))
        ok = VGroup(self.coche(), Text("ça passe au-dessus", font_size=28, color=VERT_OK)
                    ).arrange(RIGHT, buff=0.2).move_to([0, -1.85, 0])
        self.play(FadeIn(ok, shift=UP * 0.1))
        self.attendre_voix(marge=0.3)

    # ── 03 : la barre ───────────────────────────────────────────────────────

    def ecran_but(self):
        self.clear()
        self.margo_bas()
        self.dire("03-but")
        self.play(Write(self.grand("Et la barre ?", font_size=44, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        ax, mur, but, tir = self.terrain(centre=(0.1, 1.2), y_len=1.8)
        self.add(ax, mur, but, tir)
        # ⛔ Brouillon : « x = 30 » s'écrivait sur les graduations. Deux lignes au
        # lieu de trois, posées plus bas.
        calc = VGroup(
            self.grand("x = 30 → −10,8 + 12,96", font_size=30, color=WHITE),
            self.grand("y = 2,16 m", font_size=40, color=C_TIR),
        ).arrange(DOWN, buff=0.14).move_to([0, -0.6, 0])
        self.play(FadeIn(calc[0]))
        roule = self.rouler(ax, 0, X_BUT, run_time=1.5)
        self.play(FadeIn(calc[1]))
        # Le zoom : le calcul part, la figure plonge sur le but. ⛔ k = 2,8 et sol
        # à −1,5 : plus haut, le début de la courbe touchait le titre à gauche.
        # Le petit ballon cède la place au ballon À L'ÉCHELLE, dessiné après.
        self.play(FadeOut(calc), FadeOut(roule), run_time=0.4)
        P = self.zoomer(ax, [mur, but, tir], X_BUT, (0.35, -1.5, 0), 2.8)
        # ⭐ le ballon À L'ÉCHELLE : 11 cm de rayon, comme un vrai ballon
        r = 0.11 * (P(0, 1)[1] - P(0, 0)[1])
        b = Circle(radius=r, color=C_TIR, stroke_width=3).set_fill(WHITE, 1).move_to(P(X_BUT, TIR(X_BUT)))
        # ⛔ Brouillon : « barre 2,44 m » posé AU-DESSUS de la barre passait sur la
        # courbe. À droite du but, la courbe s'arrête : la place est libre. Le filet
        # s'efface pour la laisser.
        self.play(GrowFromCenter(b), FadeOut(but[2]))
        tb = Text("2,16 m", font_size=26, color=C_TIR).next_to(b, LEFT, buff=0.18).shift(DOWN * 0.2)
        tbar = VGroup(Text("barre", font_size=24, color=WHITE), Text("2,44 m", font_size=24, color=WHITE)
                      ).arrange(DOWN, buff=0.06).next_to(P(X_BUT + 1.6, H_BARRE), UR, buff=0.12)
        self.play(FadeIn(tb), FadeIn(tbar))
        fl = DoubleArrow(P(X_BUT + 0.9, TIR(X_BUT)), P(X_BUT + 0.9, H_BARRE), buff=0.0, color=ORANGE_RETENUE,
                         stroke_width=4, tip_length=0.12, max_tip_length_to_length_ratio=0.35)
        tf = Text("28 cm", font_size=26, color=ORANGE_RETENUE).next_to(fl, RIGHT, buff=0.15).shift(DOWN * 0.25)
        self.play(GrowFromCenter(fl), FadeIn(tf))
        luc = self.grand("LUCARNE !", font_size=46, color=VERT_OK).move_to([0, -1.95, 0])
        self.play(Write(luc), Flash(b, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=0.3)

    # ── 04 : l'équation y = 0, par le produit nul ───────────────────────────

    def ecran_resoudre(self):
        self.clear()
        self.margo_bas()
        self.dire("04-equation")
        self.play(Write(self.grand("Sans le filet ?", font_size=42, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        l1 = self.grand("on résout y = 0", font_size=28, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(l1))
        l2 = self.grand("x (0,432 − 0,012x) = 0", font_size=30, color=C_TIR).move_to([0, 1.8, 0])
        self.play(FadeIn(l2, shift=RIGHT * 0.1))
        l3 = VGroup(
            self.grand("un produit est nul", font_size=24, color=ORANGE_RETENUE),
            self.grand("si un facteur est nul", font_size=24, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.06).move_to([0, 1.15, 0])
        self.play(FadeIn(l3))
        ax, mur, but, tir = self.terrain(centre=(0.1, -0.35), y_len=1.4, jusqua=36, numeros=False)
        tir = ax.plot(TIR, x_range=[0, X_BUT], color=C_TIR, stroke_width=5)
        suite = DashedVMobject(ax.plot(TIR, x_range=[X_BUT, 36], color=C_TIR, stroke_width=4), num_dashes=6)
        self.add(ax, mur, but, tir)
        r0 = Dot(ax.c2p(0, 0), color=VERT_OK, radius=0.08)
        r36 = Dot(ax.c2p(36, 0), color=VERT_OK, radius=0.08)
        self.play(Create(suite), run_time=0.8)
        self.rouler(ax, 0, 36, run_time=1.8)  # le ballon file jusqu'au sol, à 36 m
        rep = VGroup(
            self.grand("x = 0 : le pied du tireur", font_size=24, color=WHITE),
            self.grand("x = 36 m", font_size=40, color=VERT_OK),
        ).arrange(DOWN, buff=0.14).move_to([0, -1.7, 0])
        self.play(GrowFromCenter(r0), FadeIn(rep[0]))
        self.play(GrowFromCenter(r36), FadeIn(rep[1]), Flash(r36, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=0.3)

    # ── 05 : le plus haut ───────────────────────────────────────────────────

    def ecran_haut(self):
        self.clear()
        self.margo_bas()
        self.dire("05-haut")
        self.play(Write(self.grand("Le plus haut ?", font_size=44, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        regle = self.grand("au milieu de 0 et 36", font_size=28, color=WHITE).move_to([0, 2.35, 0])
        self.play(FadeIn(regle))
        ax, mur, but, tir = self.terrain(centre=(0.1, 0.8), y_len=2.0)
        self.add(ax, mur, but, tir)
        self.rouler(ax, 0, 18, run_time=1.2)  # le ballon monte et s'arrête au sommet
        s = Dot(ax.c2p(18, TIR(18)), color=ORANGE_RETENUE, radius=0.08)
        h = DashedLine(ax.c2p(18, 0), ax.c2p(18, TIR(18)), color=ORANGE_RETENUE, stroke_width=2)
        rep = VGroup(
            self.grand("x = 18 m", font_size=32, color=WHITE),
            self.grand("y ≈ 3,89 m", font_size=42, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.14).move_to([0, -1.35, 0])
        self.play(Create(h), GrowFromCenter(s), FadeIn(rep[0]))
        self.play(FadeIn(rep[1]), Flash(s, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=0.3)

    # ── 06 : à quoi ça sert ─────────────────────────────────────────────────

    def ecran_sert(self):
        self.clear()
        self.margo_bas()
        self.dire("06-sert")
        # ⭐ « À quoi ça sert ? » devient LA RECETTE : l'angle et la vitesse, en gros.
        self.play(Write(self.grand("La recette", font_size=44, color=JAUNE_TITRE).move_to([0, 2.95, 0])))
        recette = self.grand("23°  ·  80 km/h", font_size=46, color=VERT_OK).move_to([0, 2.25, 0])
        self.play(FadeIn(recette, scale=1.2), Flash(recette, color=VERT_OK, line_length=0.3))
        ax, mur, but, tir = self.terrain(centre=(0.1, 0.85), y_len=1.5, numeros=False)
        self.play(Create(ax), FadeIn(mur), FadeIn(but), Create(tir), run_time=0.9)
        self.rouler(ax, 0, X_BUT, run_time=1.5)
        p1 = VGroup(self.grand("assez haut", font_size=28, color=C_TIR),
                    self.grand("→ passer le mur", font_size=22, color=WHITE)).arrange(DOWN, buff=0.04)
        p2 = VGroup(self.grand("assez bas", font_size=28, color=C_TIR),
                    self.grand("→ passer sous la barre", font_size=22, color=WHITE)).arrange(DOWN, buff=0.04)
        VGroup(p1, p2).arrange(DOWN, buff=0.18).move_to([0, -0.85, 0])
        self.play(FadeIn(p1, shift=UP * 0.1))
        self.play(FadeIn(p2, shift=UP * 0.1))
        fin = self.grand("une PARABOLE", font_size=40, color=ORANGE_RETENUE).move_to([0, -1.85, 0])
        self.play(Write(fin))
        self.attendre_voix(marge=0.3)

    # ── 07 : en vrai ────────────────────────────────────────────────────────

    def ecran_en_vrai(self):
        self.clear()
        self.margo_bas()
        self.dire("07-en-vrai")
        self.play(Write(self.grand("En vrai…", font_size=46, color=JAUNE_TITRE).move_to([0, 2.6, 0])))
        l = VGroup(
            self.grand("le ballon tourne", font_size=32, color=WHITE),
            self.grand("l'air le freine", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.25).move_to([0, 1.2, 0])
        self.play(FadeIn(l[0]))
        self.play(FadeIn(l[1]))
        m = VGroup(
            self.grand("la parabole :", font_size=30, color=ORANGE_RETENUE),
            self.grand("le modèle de départ", font_size=34, color=ORANGE_RETENUE),
        ).arrange(DOWN, buff=0.12).move_to([0, -0.6, 0])
        self.play(FadeIn(m, shift=UP * 0.1))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_equation()
        self.ecran_angle()
        self.ecran_vitesse()
        self.ecran_mur()
        self.ecran_but()
        self.ecran_resoudre()
        self.ecran_haut()
        self.ecran_sert()
        self.ecran_en_vrai()
        self.ecran_renvoi("08-fin")
