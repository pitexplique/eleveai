# prop_proportionnalite.py
# EleveAI — Maths 4e — Tout comprendre sur la proportionnalité
# (notionId : prop_proportionnalite), AVEC VOIX.
# Voix validée par Frédéric le 04/10 : manim/voix/4e-prop-proportionnalite.json
# (débit −7, celui de la 4e). Fil rouge : le bowling (7 € la partie,
# proportionnel) contre le taxi (3 € de prise en charge + 3 € du km, pas
# proportionnel). ⛔ Aucun exemple de la feuille d'exercices de 4e.
#
# ⭐ Chaque écran a son DESSIN (tableau, graphique, cahiers, silhouettes,
# flèches de coefficient), et chaque nombre dit est écrit quand il est dit
# (`au_mot`). Objectifs en UNE phrase.
#
# Mapping micro-compétences (coach 4e, notion prop_proportionnalite) → écrans :
# - prop_reconnaitre → 01-reconnaitre (quotients 7 / 7 contre 4,5 / 3,75)
# - prop_table       → 02-tableau (1, 2, 3, 5 → 7, 14, 21, 35 ; 42 € → 6)
# - prop_graphique   → 03-graphique (droite par l'origine ; le taxi part de 3)
# - prop_coeff       → 04-unite (3 cahiers 5,40 € → 1,80 € → 7 cahiers 12,60 €)
# - prop_quatrieme   → 05-croix (4 pers. 300 g → 6 pers. 450 g ; taxi 18 ≠ 15)
# - prop_probleme    → 06-probleme (robinet 12 L / 3 min → 32 L ; la taille)
# - prop_relation    → 07-relation (y = 7 × x ; taxi y = 3 × x + 3)
# - prop_defi        → 08-defi + correction (recharge 20 min → 120 km ; 300 km → 50 min)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/prop_proportionnalite.py PropProportionnalite4e -o eleveai-maths-4e-prop-proportionnalite --media_dir manim/scripts/4e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

BLEU_P = "#3B82F6"
VERT_P = "#22C55E"
ROUGE_P = "#EF4444"
ORANGE_P = "#F59E0B"
TAXI = "#FACC15"

OBJECTIFS = [
    "Reconnaître la proportionnalité (tableau, graphique)",
    "Trouver une valeur manquante",
    "Écrire la relation entre deux grandeurs",
]


class Notion4e(Notion6e):
    identite = "Maths 4e — EleveAI"


class PropProportionnalite4e(Notion4e):
    nom_voix = "4e-prop-proportionnalite"

    # ── les dessins ─────────────────────────────────────────────────────────

    def gauche(self, mob, x, y):
        """Pose `mob` avec son bord GAUCHE en x."""
        return mob.move_to([0, y, 0]).align_to(np.array([x, 0, 0]), LEFT)

    def barrer(self, mob):
        return Cross(mob, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.9)

    def etiquette(self, texte, couleur, font_size=34, couleur_texte=BLACK):
        t = Text(texte, font_size=font_size, color=couleur_texte, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.3, corner_radius=0.12,
                                stroke_width=0).set_fill(couleur, opacity=1)
        return VGroup(fond, t.move_to(fond))

    def boule(self):
        b = Circle(radius=0.55, stroke_width=3, color=WHITE).set_fill("#1E3A8A", opacity=1)
        trous = VGroup(*[Circle(radius=0.08, stroke_width=0).set_fill(BLACK, opacity=1)
                         .move_to(b.get_center() + d) for d in (UP * 0.22 + LEFT * 0.12,
                                                                 UP * 0.3 + RIGHT * 0.12,
                                                                 UP * 0.05 + RIGHT * 0.2)])
        return VGroup(b, trous)

    def taxi(self):
        corps = RoundedRectangle(width=1.7, height=0.6, corner_radius=0.15, stroke_width=0).set_fill(TAXI, opacity=1)
        toit = RoundedRectangle(width=1.0, height=0.45, corner_radius=0.12, stroke_width=0).set_fill(TAXI, opacity=1)
        toit.next_to(corps, UP, buff=-0.1)
        enseigne = Text("TAXI", font_size=18, color=BLACK, weight=BOLD).next_to(toit, UP, buff=0.04)
        roues = VGroup(*[Circle(radius=0.17, stroke_width=0).set_fill(GREY_D, opacity=1)
                         .move_to(corps.get_bottom() + RIGHT * dx) for dx in (-0.5, 0.5)])
        return VGroup(toit, corps, enseigne, roues)

    def cahier(self, couleur=BLEU_P):
        r = Rectangle(width=0.42, height=0.58, stroke_width=2, color=WHITE).set_fill(couleur, opacity=0.95)
        dos = Line(r.get_corner(UL) + RIGHT * 0.07, r.get_corner(DL) + RIGHT * 0.07, stroke_width=3, color=WHITE)
        return VGroup(r, dos)

    def voiture(self):
        corps = RoundedRectangle(width=2.0, height=0.65, corner_radius=0.2, stroke_width=0).set_fill(VERT_P, opacity=1)
        toit = RoundedRectangle(width=1.1, height=0.5, corner_radius=0.18, stroke_width=0).set_fill(VERT_P, opacity=1)
        toit.next_to(corps, UP, buff=-0.12).shift(LEFT * 0.1)
        roues = VGroup(*[Circle(radius=0.2, stroke_width=0).set_fill(GREY_D, opacity=1)
                         .move_to(corps.get_bottom() + RIGHT * dx) for dx in (-0.6, 0.6)])
        eclair = Polygon([0.08, 0.22, 0], [-0.12, -0.02, 0], [0.02, -0.02, 0], [-0.08, -0.22, 0],
                         [0.12, 0.04, 0], [-0.02, 0.04, 0], stroke_width=0).set_fill(TAXI, opacity=1).move_to(corps)
        return VGroup(toit, corps, roues, eclair)

    def tableau(self, haut, bas, lignes, x0=-5.8, y=1.2, lc=1.15, ll=2.3, h=0.75, font_size=34,
                couleurs=(WHITE, BLEU_P)):
        """Un tableau de deux lignes. Renvoie (cadres, étiquettes, textes du haut,
        textes du bas) ; une case vide = "" (rien d'écrit)."""
        n = len(haut)
        cadres, etiq, th, tb = VGroup(), VGroup(), VGroup(), VGroup()
        for r, nom in enumerate(lignes):
            yy = y - r * h
            c = Rectangle(width=ll, height=h, stroke_width=2, color=GREY_B).set_fill(GREY_E, opacity=0.6)
            self.gauche(c, x0, yy)
            cadres.add(c)
            etiq.add(Text(nom, font_size=24, color=GREY_A).move_to(c))
            for j in range(n):
                cc = Rectangle(width=lc, height=h, stroke_width=2, color=GREY_B)
                cc.move_to([x0 + ll + lc * (j + 0.5), yy, 0])
                cadres.add(cc)
        for j in range(n):
            x = x0 + ll + lc * (j + 0.5)
            th.add(Text(haut[j], font_size=font_size, color=couleurs[0]).move_to([x, y, 0]))
            tb.add(Text(bas[j], font_size=font_size, color=couleurs[1]).move_to([x, y - h, 0]))
        return cadres, etiq, th, tb

    def axes(self, x_max, y_max, y_pas, centre, x_length=6.0, y_length=4.6, font_size=22):
        a = Axes(
            x_range=[0, x_max, 1], y_range=[0, y_max, y_pas],
            x_length=x_length, y_length=y_length,
            axis_config={"include_numbers": True, "label_constructor": Text, "font_size": font_size,
                         "color": GREY_A},
            tips=False,
        )
        return a.move_to(centre)

    # ── 00 : la page de garde, parlée (le bowling et le taxi) ───────────────

    def page_de_garde(self, titre, accroche, promesse, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        t = Text(titre, font_size=52, color=JAUNE_TITRE).to_edge(UP, buff=0.6)
        if t.width > config.frame_width - 1.4:
            t.scale_to_fit_width(config.frame_width - 1.4)
        identite = Text(self.identite, font_size=28).next_to(t, DOWN, buff=0.25)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))
        l1 = Text("Les maths, ça sert à rien… sauf à savoir si un prix est honnête.",
                  font_size=28, color=BLEU_CALCUL)
        if l1.width > 11.5:
            l1.scale_to_fit_width(11.5)
        l1.move_to([-0.4, 1.6, 0])
        self.play(FadeIn(l1, shift=UP * 0.15))

        self.au_mot("Au bowling")
        b = self.boule().move_to([-5.0, 0.2, 0])
        lb = Text("Bowling", font_size=30, color=BLEU_P).next_to(b, DOWN, buff=0.2)
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(lb))
        b1 = Text("2 parties → 14 €", font_size=34)
        self.gauche(b1, -4.1, 0.55)
        self.play(Write(b1))
        self.au_mot("4 parties, 28")
        b2 = Text("4 parties → 28 €", font_size=34)
        self.gauche(b2, -4.1, -0.25)
        self.play(Write(b2))

        self.au_mot("En taxi")
        tx = self.taxi().move_to([1.3, 0.25, 0])
        lt = Text("Taxi", font_size=30, color=TAXI).next_to(tx, DOWN, buff=0.2)
        self.play(FadeIn(tx, shift=LEFT * 0.3), FadeIn(lt))
        t1 = Text("2 km → 9 €", font_size=34)
        self.gauche(t1, 2.5, 0.55)
        self.play(Write(t1))
        self.au_mot("4 kilomètres, 15")
        t2 = Text("4 km → 15 €", font_size=34)
        self.gauche(t2, 2.5, -0.25)
        self.play(Write(t2))

        self.au_mot("Lequel ?")
        q = Text("Lequel est proportionnel ?", font_size=46, color=JAUNE_TITRE).move_to([-0.6, -1.6, 0])
        self.play(GrowFromCenter(q))
        self.au_mot("d'un coup d'œil")
        self.play(Write(self.chute("Réponse dans la vidéo !", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 01 : reconnaître, en divisant ───────────────────────────────────────

    def ecran_reconnaitre(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-reconnaitre")
        self.titre_ecran("Proportionnel ? Je divise")

        self.au_mot("multiplier toujours par le même nombre")
        regle = Text("Proportionnel = × toujours le même nombre", font_size=32, color=JAUNE_TITRE).move_to([0, 2.45, 0])
        self.play(Write(regle))
        self.au_mot("je divise le prix par la quantité")
        reg2 = Text("prix ÷ quantité", font_size=30, color=GREY_A).next_to(regle, DOWN, buff=0.2)
        self.play(FadeIn(reg2))

        b = self.boule().scale(0.6).move_to([-5.4, 1.0, 0])
        lb = Text("Bowling", font_size=30, color=BLEU_P).next_to(b, RIGHT, buff=0.25)
        tx = self.taxi().scale(0.65).move_to([1.4, 1.0, 0])
        lt = Text("Taxi", font_size=30, color=TAXI).next_to(tx, RIGHT, buff=0.25)

        self.au_mot("Au bowling")
        self.play(FadeIn(b), FadeIn(lb))
        self.au_mot("14 divisé par 2")
        c1 = Text("14 ÷ 2 = 7", font_size=40)
        self.gauche(c1, -5.6, 0.0)
        self.play(Write(c1))
        self.au_mot("28 divisé par 4")
        c2 = Text("28 ÷ 4 = 7", font_size=40)
        self.gauche(c2, -5.6, -0.8)
        self.play(Write(c2))
        self.au_mot("Toujours 7")
        self.play(c1[-1].animate.set_color(VERT_OK), c2[-1].animate.set_color(VERT_OK))
        ok = VGroup(self.coche(), Text("toujours 7 : proportionnel", font_size=26, color=VERT_OK)).arrange(RIGHT, buff=0.2)
        self.gauche(ok, -5.6, -1.65)
        self.play(FadeIn(ok, shift=UP * 0.15))

        self.au_mot("En taxi")
        self.play(FadeIn(tx), FadeIn(lt))
        self.au_mot("9 divisé par 2")
        d1 = Text("9 ÷ 2 = 4,5", font_size=40)
        self.gauche(d1, 0.9, 0.0)
        self.play(Write(d1))
        self.au_mot("15 divisé par 4")
        d2 = Text("15 ÷ 4 = 3,75", font_size=40)
        self.gauche(d2, 0.9, -0.8)
        self.play(Write(d2))
        self.au_mot("Le quotient change")
        self.play(d1[-3:].animate.set_color(ROUGE_P), d2[-4:].animate.set_color(ROUGE_P))
        non = Text("ça change : pas proportionnel", font_size=26, color=ROUGE_P)
        self.gauche(non, 0.9, -1.65)
        self.play(FadeIn(non, shift=UP * 0.15))
        self.au_mot("la prise en charge")
        self.play(Write(self.chute("La prise en charge : 3 €, payés une seule fois", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 02 : le tableau et son coefficient ──────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Le tableau de proportionnalité")

        cadres, etiq, th, tb = self.tableau(["1", "2", "3", "5", "?"], ["7", "14", "21", "35", "42"],
                                            ["parties", "prix (€)"], x0=-6.0, y=1.3)
        # la dernière colonne arrive à la fin (42 €)
        col5 = VGroup(cadres[5], cadres[11])
        self.au_mot("une ligne par grandeur")
        self.play(FadeIn(VGroup(*[c for i, c in enumerate(cadres) if i not in (5, 11)])), FadeIn(etiq))
        self.au_mot("En haut, les parties")
        self.play(etiq[0].animate.set_color(WHITE))
        self.play(LaggedStart(*[Write(th[j]) for j in range(4)], lag_ratio=0.35))
        self.au_mot("En bas, le prix")
        self.play(etiq[1].animate.set_color(BLEU_P))
        self.play(LaggedStart(*[Write(tb[j]) for j in range(4)], lag_ratio=0.35))

        # les flèches du coefficient, entre les deux lignes
        self.au_mot("ici 7")
        fleches = VGroup()
        for j in range(4):
            fl = Arrow(th[j].get_bottom() + DOWN * 0.02, tb[j].get_top() + UP * 0.02, buff=0.05,
                       color=JAUNE_TITRE, stroke_width=4, max_tip_length_to_length_ratio=0.35)
            fleches.add(fl)
        k = Text("× 7", font_size=44, color=JAUNE_TITRE).move_to([2.6, -0.85, 0])
        self.play(LaggedStart(*[GrowArrow(f) for f in fleches], lag_ratio=0.15), Write(k))
        self.au_mot("c'est le coefficient")
        coef = Text("le coefficient de proportionnalité", font_size=30, color=JAUNE_TITRE)
        self.gauche(coef, -6.0, -1.0)
        self.play(FadeOut(fleches), Write(coef))

        self.au_mot("Pour descendre")
        bas = Arrow([4.0, 1.35, 0], [4.0, 0.5, 0], buff=0, color=VERT_OK, stroke_width=6)
        lbas = Text("× 7", font_size=34, color=VERT_OK).next_to(bas, RIGHT, buff=0.15)
        self.play(FadeOut(k), GrowArrow(bas), Write(lbas))
        self.au_mot("Pour remonter")
        haut = Arrow([5.4, 0.5, 0], [5.4, 1.35, 0], buff=0, color=ORANGE_P, stroke_width=6)
        lhaut = Text("÷ 7", font_size=34, color=ORANGE_P).next_to(haut, RIGHT, buff=0.15)
        self.play(GrowArrow(haut), Write(lhaut))
        self.au_mot("42 euros")
        self.play(FadeIn(col5), Write(tb[4]), Write(th[4]))
        self.au_mot("c'est 6 parties")
        six = Text("6", font_size=34, color=VERT_OK).move_to(th[4])
        self.play(Transform(th[4], six))
        self.play(Write(self.chute("42 ÷ 7 = 6 : 42 €, c'est 6 parties", color=VERT_OK)))
        self.attendre_voix()

    # ── 03 : le graphique ───────────────────────────────────────────────────

    def ecran_graphique(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-graphique")
        self.titre_ecran("Sur un graphique")

        ax = self.axes(6, 42, 7, centre=[-2.5, -0.45, 0])
        lx = Text("parties", font_size=24, color=GREY_A).next_to(ax.x_axis.get_end(), DOWN, buff=0.45)
        ly = Text("prix (€)", font_size=24, color=GREY_A).next_to(ax.y_axis.get_end(), UP, buff=0.15)
        self.au_mot("les parties en abscisse")
        self.play(Create(ax), FadeIn(lx), FadeIn(ly))

        pts = VGroup()
        for x, extrait in ((1, "1 et 7"), (2, "2 et 14"), (3, "3 et 21")):
            self.au_mot(extrait)
            d = Dot(ax.c2p(x, 7 * x), radius=0.1, color=BLEU_P)
            lab = Text(f"({x} ; {7 * x})", font_size=22, color=BLEU_P).next_to(d, UL, buff=0.05)
            pts.add(VGroup(d, lab))
            self.play(GrowFromCenter(d), FadeIn(lab))

        self.au_mot("Les points sont alignés")
        droite = Line(ax.c2p(0, 0), ax.c2p(6, 42), color=BLEU_P, stroke_width=4)
        self.play(Create(droite))
        self.au_mot("passe par l'origine")
        o = Dot(ax.c2p(0, 0), radius=0.12, color=VERT_OK)
        lo = Text("(0 ; 0)", font_size=22, color=VERT_OK).next_to(o, DL, buff=0.08).shift(DOWN * 0.15)
        self.play(GrowFromCenter(o), FadeIn(lo))
        self.play(Flash(o, color=VERT_OK))
        self.au_mot("C'est la marque")
        r1 = VGroup(self.coche(), Text("par l'origine :\nproportionnel", font_size=28, color=BLEU_P)).arrange(RIGHT, buff=0.2)
        self.gauche(r1, 1.6, 1.3)
        self.play(FadeIn(r1, shift=LEFT * 0.2))

        self.au_mot("je lis : 4 parties")
        p4 = ax.c2p(4, 28)
        v = DashedLine(ax.c2p(4, 0), p4, color=JAUNE_TITRE, stroke_width=3)
        h = DashedLine(p4, ax.c2p(0, 28), color=JAUNE_TITRE, stroke_width=3)
        self.play(Create(v))
        self.play(Create(h))
        l4 = Text("4 parties → 28 €", font_size=30, color=JAUNE_TITRE)
        self.gauche(l4, 1.6, 0.15)
        self.play(Write(l4))

        self.au_mot("Le taxi aussi")
        dt = Line(ax.c2p(0, 3), ax.c2p(6, 21), color=TAXI, stroke_width=4)
        self.play(Create(dt))
        self.au_mot("elle part de 3 euros")
        p3 = Dot(ax.c2p(0, 3), radius=0.11, color=TAXI)
        l3 = Text("3 €", font_size=24, color=TAXI).next_to(p3, LEFT, buff=0.45)
        self.play(GrowFromCenter(p3), FadeIn(l3))
        self.au_mot("Elle ne passe pas")
        r2 = Text("taxi : pas par l'origine,\npas proportionnel", font_size=28, color=TAXI)
        self.gauche(r2, 1.6, -1.1)
        self.play(FadeIn(r2, shift=LEFT * 0.2))
        self.attendre_voix()

    # ── 04 : le passage à l'unité ───────────────────────────────────────────

    def ecran_unite(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-unite")
        self.titre_ecran("Passer par l'unité")

        def rangee(n, y):
            g = VGroup(*[self.cahier() for _ in range(n)]).arrange(RIGHT, buff=0.12)
            return self.gauche(g, -5.8, y)

        self.au_mot("3 cahiers")
        r3 = rangee(3, 1.5)
        p3 = Text("3 cahiers : 5,40 €", font_size=36)
        self.gauche(p3, -1.2, 1.5)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in r3], lag_ratio=0.2), Write(p3))

        self.au_mot("Un cahier :")
        f1 = Arrow([-5.0, 1.0, 0], [-5.0, 0.4, 0], buff=0, color=ORANGE_P, stroke_width=6)
        l1 = Text("÷ 3", font_size=32, color=ORANGE_P).next_to(f1, RIGHT, buff=0.15)
        r1 = rangee(1, 0.0)
        p1 = Text("1 cahier : 5,40 ÷ 3 = 1,80 €", font_size=36)
        self.gauche(p1, -1.2, 0.0)
        self.play(GrowArrow(f1), Write(l1))
        self.play(FadeIn(r1, shift=DOWN * 0.2), Write(p1))
        self.play(p1[-5:].animate.set_color(VERT_OK))

        self.au_mot("Donc 7 cahiers")
        f2 = Arrow([-5.0, -0.5, 0], [-5.0, -1.1, 0], buff=0, color=BLEU_P, stroke_width=6)
        l2 = Text("× 7", font_size=32, color=BLEU_P).next_to(f2, RIGHT, buff=0.15)
        r7 = rangee(7, -1.5)
        self.play(GrowArrow(f2), Write(l2))
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in r7], lag_ratio=0.1))
        self.au_mot("7 fois 1 virgule 80")
        p7 = Text("7 cahiers : 7 × 1,80 = 12,60 €", font_size=36)
        self.gauche(p7, -1.2, -1.5)
        self.play(Write(p7))
        self.au_mot("12 euros 60")
        self.play(p7[-6:].animate.set_color(VERT_OK))
        self.play(Write(self.chute("D'abord le prix d'UN cahier, puis de 7", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 05 : le produit en croix ────────────────────────────────────────────

    def ecran_croix(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-croix")
        self.titre_ecran("Le produit en croix")

        self.au_mot("Pour 4 personnes")
        cadres, etiq, th, tb = self.tableau(["4", "6"], ["300", ""], ["personnes", "farine (g)"],
                                            x0=-6.0, y=1.7, lc=1.4)
        self.play(FadeIn(cadres), FadeIn(etiq), Write(th[0]), Write(tb[0]))
        self.au_mot("Combien pour 6 personnes")
        self.play(Write(th[1]))
        case = np.array([th[1].get_x(), tb[0].get_y(), 0])
        q = Text("?", font_size=40, color=JAUNE_TITRE).move_to(case)
        self.play(Write(q))

        self.au_mot("Je multiplie en diagonale")
        diag = Line(th[1].get_center() + DL * 0.2, tb[0].get_center() + UR * 0.22, color=JAUNE_TITRE, stroke_width=5)
        self.play(Create(diag), Indicate(th[1], color=JAUNE_TITRE), Indicate(tb[0], color=JAUNE_TITRE))
        c1 = Text("6 × 300 = 1 800", font_size=38)
        self.gauche(c1, 0.0, 1.7)
        self.play(Write(c1))
        self.au_mot("je divise par le nombre qui reste")
        cercle = Circle(radius=0.38, color=ORANGE_P, stroke_width=4).move_to(th[0])
        self.play(Create(cercle))
        c2 = Text("1 800 ÷ 4 = 450", font_size=38)
        self.gauche(c2, 0.0, 0.95)
        self.play(Write(c2))
        self.au_mot("450 grammes")
        r = Text("450 g", font_size=30, color=VERT_OK).move_to(case)
        self.play(Transform(q, r), c2[-3:].animate.set_color(VERT_OK))

        self.au_mot("Attention")
        att = Text("Seulement si c'est proportionnel !", font_size=32, color=ORANGE_RETENUE)
        self.gauche(att, -6.0, -0.35)
        self.play(Write(att))
        self.au_mot("En taxi, il donnerait")
        tx = self.taxi().scale(0.55)
        self.gauche(tx, -6.0, -1.25)
        faux = Text("4 × 9 ÷ 2 = 18 €", font_size=36, color=ROUGE_P)
        self.gauche(faux, -4.6, -1.25)
        self.play(FadeIn(tx), Write(faux))
        self.au_mot("Le vrai prix")
        vrai = Text("vrai prix : 15 €", font_size=36, color=VERT_OK)
        self.gauche(vrai, 0.0, -1.25)
        self.play(Write(vrai))
        self.play(Create(self.barrer(faux[-4:])))
        self.au_mot("sans prévenir")
        self.play(Write(self.chute("Le produit en croix se trompe sans prévenir", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── 06 : dans un problème ───────────────────────────────────────────────

    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-probleme")
        self.titre_ecran("Dans un problème : je double")

        self.au_mot("si je double l'un")
        q = Text("Si je double l'un, l'autre double-t-il ?", font_size=34, color=JAUNE_TITRE).move_to([0, 2.35, 0])
        self.play(Write(q))

        # le robinet et ses litres
        self.au_mot("Un robinet verse 12 litres")
        tuyau = VGroup(
            Rectangle(width=1.0, height=0.25, stroke_width=0).set_fill(GREY_B, opacity=1),
            Rectangle(width=0.25, height=0.35, stroke_width=0).set_fill(GREY_B, opacity=1),
        )
        tuyau[1].next_to(tuyau[0], DOWN, buff=0).align_to(tuyau[0], RIGHT)
        self.gauche(tuyau, -6.2, 1.5)
        gouttes = VGroup(*[Circle(radius=0.07, stroke_width=0).set_fill(BLEU_P, opacity=1)
                           .move_to(tuyau[1].get_bottom() + DOWN * (0.2 + 0.25 * i)) for i in range(3)])
        l1 = Text("3 min → 12 L", font_size=34)
        self.gauche(l1, -4.7, 1.35)
        self.play(FadeIn(tuyau), FadeIn(gouttes, shift=DOWN * 0.2), Write(l1))
        self.au_mot("En 8 minutes ?")
        l8 = Text("8 min → ?", font_size=34)
        self.gauche(l8, -4.7, 0.65)
        self.play(Write(l8))
        self.au_mot("Deux fois plus de temps")
        dbl = Text("× 2 le temps → × 2 l'eau", font_size=28, color=VERT_OK)
        self.gauche(dbl, -6.2, -0.05)
        self.play(Write(dbl))
        self.play(FadeIn(self.coche().next_to(dbl, RIGHT, buff=0.2)))
        self.au_mot("En une minute, 4 litres")
        u = Text("1 min → 12 ÷ 3 = 4 L", font_size=32)
        self.gauche(u, -6.2, -0.8)
        self.play(Write(u))
        self.au_mot("En 8 minutes, 32 litres")
        r = Text("8 min → 8 × 4 = 32 L", font_size=32, color=VERT_OK)
        self.gauche(r, -6.2, -1.5)
        self.play(Write(r))
        self.play(Transform(l8, Text("8 min → 32 L", font_size=34, color=VERT_OK).move_to(l8).align_to(l8, LEFT)))

        # la taille : pas proportionnelle à l'âge
        sol = Line([1.6, -1.9, 0], [5.6, -1.9, 0], color=GREY_B, stroke_width=3)
        ech = 1.25

        def silhouette(taille, x, couleur, pointille=False):
            hauteur = taille * ech
            tete = Circle(radius=0.16, color=couleur, stroke_width=4)
            corps = Line([x, -1.9, 0], [x, -1.9 + hauteur - 0.32, 0], color=couleur, stroke_width=6)
            if pointille:
                corps = DashedLine([x, -1.9, 0], [x, -1.9 + hauteur - 0.32, 0], color=couleur, stroke_width=6)
            tete.move_to([x, -1.9 + hauteur - 0.16, 0])
            return VGroup(corps, tete)

        self.au_mot("Mais à 10 ans")
        s1 = silhouette(1.40, 2.4, BLEU_P)
        t1 = Text("10 ans\n1,40 m", font_size=24, color=BLEU_P).next_to(s1, RIGHT, buff=0.15)
        self.play(Create(sol), FadeIn(s1), FadeIn(t1))
        self.au_mot("À 20 ans")
        s2 = silhouette(2.80, 4.4, ROUGE_P, pointille=True)
        t2 = Text("20 ans\n2,80 m ?", font_size=24, color=ROUGE_P).next_to(s2, RIGHT, buff=0.15)
        self.play(FadeIn(s2), FadeIn(t2))
        self.play(Create(self.barrer(Rectangle(width=1.4, height=1.4).move_to(s2[1]))))
        self.attendre_voix()

    # ── 07 : la relation y = k × x ──────────────────────────────────────────

    def ecran_relation(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-relation")
        self.titre_ecran("La relation : y = coefficient × x")

        cadres, etiq, th, tb = self.tableau(["1", "2", "3"], ["7", "14", "21"], ["x : parties", "y : prix (€)"],
                                            x0=-6.0, y=1.75, lc=1.0, ll=2.6)
        self.au_mot("Au bowling")
        self.play(FadeIn(cadres), FadeIn(etiq), FadeIn(th), FadeIn(tb))
        self.au_mot("le prix, c'est 7 fois")
        phr = Text("prix = 7 × nombre de parties", font_size=32)
        self.gauche(phr, -6.0, 0.2)
        self.play(Write(phr))
        self.au_mot("Avec x le nombre de parties")
        self.play(Indicate(etiq[0], color=JAUNE_TITRE), Indicate(etiq[1], color=JAUNE_TITRE))
        self.au_mot("y égale 7 fois x")
        rel = Text("y = 7 × x", font_size=64, color=BLEU_P, t2c={"7": JAUNE_TITRE})
        self.gauche(rel, -6.0, -0.75)
        self.play(Write(rel))
        self.au_mot("c'est le coefficient")
        lc = Text("le coefficient", font_size=26, color=JAUNE_TITRE).move_to([rel[2].get_x() + 0.6, -1.65, 0])
        fl = Arrow(lc.get_top() + LEFT * 0.6, rel[2].get_bottom(), buff=0.08, color=JAUNE_TITRE, stroke_width=5)
        self.play(GrowArrow(fl), FadeIn(lc))

        self.au_mot("dans le tableau")
        cad = SurroundingRectangle(VGroup(th[0], tb[0]), color=JAUNE_TITRE, buff=0.15)
        self.play(Create(cad))
        # le mini-graphique : le point d'abscisse 1
        ax = self.axes(3, 21, 7, centre=[3.4, 0.9, 0], x_length=3.0, y_length=2.4, font_size=18)
        self.au_mot("sur le graphique")
        d = Line(ax.c2p(0, 0), ax.c2p(3, 21), color=BLEU_P, stroke_width=3)
        self.play(Create(ax), Create(d))
        self.au_mot("pour x égale 1")
        p = Dot(ax.c2p(1, 7), radius=0.09, color=JAUNE_TITRE)
        g = VGroup(DashedLine(ax.c2p(1, 0), ax.c2p(1, 7), color=JAUNE_TITRE),
                   DashedLine(ax.c2p(1, 7), ax.c2p(0, 7), color=JAUNE_TITRE))
        lp = Text("x = 1 → y = 7", font_size=24, color=JAUNE_TITRE).next_to(ax, DOWN, buff=0.45)
        self.play(Create(g), GrowFromCenter(p), FadeIn(lp))

        self.au_mot("En taxi")
        tr = VGroup(Text("Taxi :  y = 3 × x", font_size=40, color=TAXI), Text("+ 3", font_size=40, color=ROUGE_P)).arrange(RIGHT, buff=0.25)
        self.gauche(tr, -6.0, -2.55)
        self.play(Write(tr))
        self.au_mot("Ce plus 3")
        self.play(Create(SurroundingRectangle(tr[1], color=ROUGE_P, buff=0.1)))
        non = Text("pas proportionnel", font_size=30, color=ROUGE_P).next_to(tr, RIGHT, buff=0.4)
        self.play(FadeIn(non))
        self.attendre_voix()

    # ── 08 : défi et correction ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.titre_ecran("Défi", font_size=48)
        v = self.voiture().move_to([-4.3, 1.4, 0])
        self.play(FadeIn(v, shift=RIGHT * 0.3))
        self.au_mot("120 kilomètres")
        d = Text("20 min de recharge → 120 km", font_size=40)
        self.gauche(d, -2.8, 1.4)
        self.play(Write(d))
        self.au_mot("C'est proportionnel")
        self.play(FadeIn(Text("(c'est proportionnel)", font_size=28, color=GREY_A).next_to(d, DOWN, buff=0.2)))
        self.au_mot("Écris la relation")
        q1 = Text("1. La relation entre x (minutes) et y (km) ?", font_size=34, color=JAUNE_TITRE)
        self.gauche(q1, -5.8, -0.2)
        self.play(Write(q1))
        self.au_mot("pour 300 kilomètres")
        q2 = Text("2. Combien de minutes pour 300 km ?", font_size=34, color=JAUNE_TITRE)
        self.gauche(q2, -5.8, -1.0)
        self.play(Write(q2))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")

        cadres, etiq, th, tb = self.tableau(["20", "?"], ["120", "300"], ["x : minutes", "y : km"],
                                            x0=-6.0, y=1.7, lc=1.3, ll=2.4)
        self.play(FadeIn(cadres), FadeIn(etiq), FadeIn(th), FadeIn(tb))
        self.au_mot("120 divisé par 20")
        c1 = Text("120 ÷ 20 = 6 km par minute", font_size=28)
        self.gauche(c1, 1.6, 1.7)
        self.play(Write(c1))
        fb = Arrow([-0.8, 1.75, 0], [-0.8, 0.95, 0], buff=0, color=VERT_OK, stroke_width=6)
        lfb = Text("× 6", font_size=30, color=VERT_OK).next_to(fb, RIGHT, buff=0.1)
        self.play(GrowArrow(fb), Write(lfb))
        self.au_mot("La relation")
        rel = Text("y = 6 × x", font_size=56, color=BLEU_P)
        self.gauche(rel, 1.6, 0.75)
        self.play(Write(rel))

        self.au_mot("je remonte")
        fh = Arrow([0.4, 0.95, 0], [0.4, 1.75, 0], buff=0, color=ORANGE_P, stroke_width=6)
        lfh = Text("÷ 6", font_size=30, color=ORANGE_P).next_to(fh, RIGHT, buff=0.1)
        self.play(GrowArrow(fh), Write(lfh))
        self.au_mot("300 divisé par 6")
        c2 = Text("300 ÷ 6 = 50 minutes", font_size=40, color=VERT_OK)
        self.gauche(c2, -6.0, -0.4)
        self.play(Write(c2))
        r = Text("50", font_size=34, color=VERT_OK).move_to(th[1])
        self.play(Transform(th[1], r))
        self.au_mot("Le piège")
        piege = Text("300 × 6 = 1 800 minutes", font_size=36, color=ROUGE_P)
        self.gauche(piege, -6.0, -1.45)
        self.play(Write(piege))
        self.play(Create(self.barrer(piege)))
        self.au_mot("Pour remonter, on divise")
        self.play(Write(self.chute("Pour remonter, on divise", color=ORANGE_RETENUE)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="Tout comprendre sur la proportionnalité",
            accroche="", promesse="",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_reconnaitre()
        self.ecran_tableau()
        self.ecran_graphique()
        self.ecran_unite()
        self.ecran_croix()
        self.ecran_probleme()
        self.ecran_relation()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Proportionnel : × toujours le même nombre",
                "Graphique : des points alignés avec l'origine",
                "Case vide : coefficient, unité ou produit en croix",
            ],
            rappel="Le taxi : régulier, mais PAS proportionnel.",
            voix="09-finale",
        )
        self.page_abonnement(voix="10-abonne")
