# decimal_calcul.py
# EleveAI — Maths 6e — Calculer avec les décimaux
# (notionId : decimal_calcul), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-6e-decimal-calcul.tsx.
#
# ⭐ 04/10/2026 : Frédéric, « ce sont des 6e, ils sont moyens-faibles, donc on
# explique clairement avec schémas et dessins qui s'affichent avec ». Chaque
# écran a un DESSIN qui porte l'idée : des pièces, des colonnes de couleur, des
# barres qu'on casse en dixièmes, des ananas, des bouteilles qui se remplissent.
# Voix : manim/voix/6e-decimal-calcul.json (débit −10).
#
# Mapping micro-compétences (coach 6e, notion decimal_calcul) → écrans :
# - decimal_additionner        → 01 (les pièces), 02 (addition posée), 03 (soustraction)
# - decimal_multiplier         → 04 (4 ananas), 05 (méthode + ordre de grandeur), 06 (deux virgules)
# - decimal_multiplier_par_01  → 07 (37 × 0,1 dans le tableau)
# - decimal_diviser_par_entier → 08 (7,5 L dans 5 bouteilles)
# - decimal_calcul_defi        → 09 + correction (3 cahiers, billet de 5 €)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/decimal_calcul.py DecimalCalcul6e -o eleveai-maths-6e-decimal-calcul --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Additionner et soustraire des décimaux",
    "Multiplier des décimaux",
    "Partager un décimal (diviser)",
]

# ⭐ une couleur par rang, la même sur tous les écrans : l'élève suit la colonne
ROSE_CENTIEME = "#F472B6"
COULEURS_RANG = {
    "Dizaines": GREY_B,
    "Unités": BLEU_CALCUL,
    "Dixièmes": VIOLET_ACCENT,
    "Centièmes": ROSE_CENTIEME,
}
EAU = "#3B82F6"


class DecimalCalcul6e(Notion6e):
    nom_voix = "6e-decimal-calcul"

    # ── les dessins propres à cette vidéo ──────────────────────────────────

    def colonnes(self, entetes, x_centre, largeur, y_ent, y_bas):
        """Des colonnes de couleur, une par rang : l'opération se pose dedans.

        Renvoie (groupe, abscisses, {rang: bande}).
        """
        largeurs = [0.6 if e == "," else largeur for e in entetes]
        x = x_centre - sum(largeurs) / 2
        xs, g, bandes = [], VGroup(), {}
        haut = y_ent - 0.35
        for e, w in zip(entetes, largeurs):
            cx = x + w / 2
            xs.append(cx)
            if e != ",":
                c = COULEURS_RANG[e]
                bande = Rectangle(width=w - 0.1, height=haut - y_bas, stroke_width=0,
                                  fill_color=c, fill_opacity=0.14).move_to([cx, (haut + y_bas) / 2, 0])
                lbl = Text(e, font_size=26, color=c).move_to([cx, y_ent, 0])
                if lbl.width > w - 0.15:
                    lbl.scale_to_fit_width(w - 0.15)
                g.add(bande, lbl)
                bandes[e] = bande
            x += w
        return g, xs, bandes

    def ligne(self, xs, y, chaine, font_size=56, color=WHITE):
        """Un nombre posé dans les colonnes ; la virgule en jaune."""
        r = self.chiffres(xs, y, chaine, font_size=font_size, color=color)
        for m, c in zip(r, chaine):
            if c == ",":
                m.set_color(JAUNE_TITRE)
        return r

    def allumer(self, bande):
        return Succession(bande.animate.set_fill(opacity=0.5), bande.animate.set_fill(opacity=0.14))

    def piece(self, texte, rayon, couleur):
        return VGroup(Circle(radius=rayon, color=couleur, fill_opacity=0.25, stroke_width=4),
                      Text(texte, font_size=int(rayon * 55), color=couleur))

    def croissant(self):
        c = AnnularSector(inner_radius=0.45, outer_radius=0.95, angle=PI, start_angle=0,
                          fill_color="#D97706", fill_opacity=1, stroke_color="#FBBF24", stroke_width=3)
        return c

    def jus(self):
        verre = Polygon([-0.45, 0.7, 0], [0.45, 0.7, 0], [0.35, -0.7, 0], [-0.35, -0.7, 0],
                        stroke_color=WHITE, stroke_width=3)
        liquide = Polygon([-0.41, 0.35, 0], [0.41, 0.35, 0], [0.35, -0.66, 0], [-0.35, -0.66, 0],
                          stroke_width=0, fill_color=ORANGE_RETENUE, fill_opacity=0.9)
        paille = Line([0.15, -0.2, 0], [0.4, 1.05, 0], color=ROUGE_ERREUR, stroke_width=6)
        return VGroup(liquide, verre, paille)

    def ananas(self):
        corps = Ellipse(width=0.8, height=1.05, fill_color="#EAB308", fill_opacity=1,
                        stroke_color="#A16207", stroke_width=3)
        hachures = VGroup(*[Line([-0.3, -0.35 + 0.25 * k, 0], [0.3, -0.1 + 0.25 * k, 0],
                                 color="#A16207", stroke_width=2) for k in range(3)])
        feuilles = VGroup(*[Polygon([dx - 0.13, 0.48, 0], [dx + 0.13, 0.48, 0], [dx * 1.6, 0.95, 0],
                                    stroke_width=0, fill_color="#16A34A", fill_opacity=1)
                            for dx in (-0.15, 0.0, 0.15)])
        return VGroup(feuilles, corps, hachures)

    def cahier(self):
        couv = Rectangle(width=0.9, height=1.2, fill_color=BLEU_CALCUL, fill_opacity=0.85,
                         stroke_color=WHITE, stroke_width=2)
        etiquette = Rectangle(width=0.6, height=0.25, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).move_to(couv.get_center() + UP * 0.25)
        dos = Line(couv.get_corner(UL) + RIGHT * 0.1, couv.get_corner(DL) + RIGHT * 0.1,
                   color=WHITE, stroke_width=3)
        return VGroup(couv, etiquette, dos)

    def bouteille(self, largeur, hauteur, x, y_bas):
        corps = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.12,
                                 stroke_color=WHITE, stroke_width=3)
        corps.move_to([x, y_bas + hauteur / 2, 0])
        col = Rectangle(width=largeur * 0.4, height=hauteur * 0.15, stroke_color=WHITE, stroke_width=3)
        col.next_to(corps, UP, buff=0)
        return VGroup(corps, col), corps

    def eau(self, corps, fraction):
        h = max(fraction * (corps.height - 0.08), 0.01)
        e = Rectangle(width=corps.width - 0.08, height=h, stroke_width=0, fill_color=EAU, fill_opacity=0.8)
        return e.move_to(corps.get_bottom() + UP * (h / 2 + 0.04))

    def point_sous(self, mob, couleur=ORANGE_RETENUE):
        return Dot(mob.get_bottom() + DOWN * 0.2, color=couleur, radius=0.08)

    # ── 00 : page de garde — la voix raconte une situation, on la DESSINE ──

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")

        t = Text("Calculer avec les décimaux", font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = Text(self.identite, font_size=30, color=WHITE).next_to(t, DOWN, buff=0.3)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))

        cr = self.croissant().move_to([-3.6, 0.6, 0])
        p_cr = Text("1,20 €", font_size=40).move_to([-3.6, -0.6, 0])
        self.play(FadeIn(cr, scale=0.6), FadeIn(p_cr))
        self.au_mot("Un jus coûte")
        js = self.jus().move_to([-0.6, 0.6, 0])
        p_js = Text("2,50 €", font_size=40).move_to([-0.6, -0.6, 0])
        self.play(FadeIn(js, scale=0.6), FadeIn(p_js))

        self.au_mot("Combien tu paies")
        q = Text("1,20 € + 2,50 € = ?", font_size=42, color=BLEU_CALCUL).move_to([-1.0, -1.45, 0])
        self.play(GrowFromCenter(q))
        self.play(Flash(q, color=BLEU_CALCUL, line_length=0.3))

        self.au_mot("Bonne nouvelle")
        b = Text("On calcule comme avec les entiers.", font_size=32).move_to([-1.0, -2.2, 0])
        self.play(FadeIn(b, shift=UP * 0.2))
        self.au_mot("où va la virgule")
        v = Text("Où va la virgule ?", font_size=44, color=JAUNE_TITRE).move_to([-1.0, -3.05, 0])
        self.play(Write(v))
        self.play(Indicate(v, color=JAUNE_TITRE))
        self.attendre_voix()

    # ── 00b : les objectifs, une phrase, chaque ligne avec son mot ─────────

    def ecran_objectifs(self):
        self.clear()
        self.add_mascotte()
        self.dire("00b-objectifs")

        titre = Text("À la fin, tu sauras", font_size=44, color=JAUNE_TITRE).to_edge(UP, buff=0.75)
        self.play(Write(titre), run_time=0.8)
        lignes = VGroup()
        for i, texte in enumerate(OBJECTIFS):
            num = Text(f"{i + 1}.", font_size=34, color=BLEU_CALCUL)
            corps = Text(texte, font_size=32, color=WHITE)
            lignes.add(VGroup(num, corps).arrange(RIGHT, buff=0.28, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.72).move_to([-0.3, 0.1, 0])
        for mot, l in zip(("additionner", "multiplier", "et partager"), lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.25), run_time=0.5)
        self.attendre_voix()

    # ── 01 : pourquoi on aligne — les euros avec les euros ─────────────────

    def ecran_addition_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-addition-sens")
        self.titre_ecran("Pourquoi on aligne les virgules ?")

        y1, y2 = 1.7, 0.3
        l_cr = Text("Croissant : 1,20 €", font_size=34).move_to([-4.6, y1, 0])
        l_js = Text("Jus : 2,50 €", font_size=34)
        l_js.move_to([0, y2, 0]).align_to(l_cr, LEFT)
        p1 = self.piece("1 €", 0.45, JAUNE_TITRE).move_to([-1.5, y1, 0])
        p20 = self.piece("20 c", 0.38, ORANGE_RETENUE).move_to([-0.4, y1, 0])
        p2 = self.piece("2 €", 0.45, JAUNE_TITRE).move_to([-1.5, y2, 0])
        p50 = self.piece("50 c", 0.38, ORANGE_RETENUE).move_to([-0.4, y2, 0])
        self.play(FadeIn(l_cr), GrowFromCenter(p1), GrowFromCenter(p20))
        self.au_mot("Le jus")
        self.play(FadeIn(l_js), GrowFromCenter(p2), GrowFromCenter(p50))

        self.au_mot("On met les euros")
        boite_e = Rectangle(width=1.9, height=2.6, color=JAUNE_TITRE).move_to([1.6, 1.0, 0])
        boite_c = Rectangle(width=1.9, height=2.6, color=ORANGE_RETENUE).move_to([4.8, 1.0, 0])
        t_e = Text("Euros", font_size=28, color=JAUNE_TITRE).next_to(boite_e, UP, buff=0.12)
        t_c = Text("Centimes", font_size=28, color=ORANGE_RETENUE).next_to(boite_c, UP, buff=0.12)
        self.play(Create(boite_e), Create(boite_c), FadeIn(t_e), FadeIn(t_c))
        c1, c2 = p1.copy(), p2.copy()
        self.play(c1.animate.move_to([1.6, 1.6, 0]), c2.animate.move_to([1.6, 0.4, 0]))
        self.au_mot("1 plus 2")
        s_e = Text("1 + 2 = 3 €", font_size=30, color=JAUNE_TITRE).next_to(boite_e, DOWN, buff=0.25)
        self.play(Write(s_e))

        self.au_mot("Et les centimes")
        c3, c4 = p20.copy(), p50.copy()
        self.play(c3.animate.move_to([4.8, 1.6, 0]), c4.animate.move_to([4.8, 0.4, 0]))
        self.au_mot("20 plus 50")
        s_c = Text("20 + 50 = 70 c", font_size=30, color=ORANGE_RETENUE).next_to(boite_c, DOWN, buff=0.25)
        self.play(Write(s_c))

        self.au_mot("Tu paies 3 virgule 70")
        res = Text("Tu paies 3,70 €", font_size=46, color=VERT_OK).move_to([-2.6, -1.4, 0])
        self.play(GrowFromCenter(res))

        self.au_mot("C'est pour ça qu'on aligne")
        self.play(FadeOut(VGroup(l_cr, l_js, p1, p20, p2, p50, boite_e, boite_c, t_e, t_c,
                                 c1, c2, c3, c4, s_e, s_c, res)), run_time=0.6)
        cols, xs, bandes = self.colonnes(["Unités", ",", "Dixièmes", "Centièmes"], -0.8, 2.0, 2.3, -1.4)
        r1 = self.ligne(xs, 1.4, "1,20")
        r2 = self.ligne(xs, 0.4, "2,50")
        plus = Text("+", font_size=56).move_to([xs[0] - 1.25, 0.4, 0])
        trait = Line([xs[0] - 1.5, -0.15, 0], [xs[3] + 0.9, -0.15, 0], stroke_width=3)
        r3 = self.ligne(xs, -0.75, "3,70", color=VERT_OK)
        self.play(FadeIn(cols))
        self.play(FadeIn(r1), FadeIn(r2), FadeIn(plus), Create(trait))
        self.play(FadeIn(r3, shift=DOWN * 0.2))
        self.au_mot("les unités sous les unités")
        self.play(self.allumer(bandes["Unités"]))
        self.au_mot("les dixièmes sous les dixièmes")
        self.play(self.allumer(bandes["Dixièmes"]))
        self.attendre_voix()

    # ── 02 : l'addition posée (2,8 + 1,35) ─────────────────────────────────

    def ecran_addition_posee(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-addition-posee")
        self.titre_ecran("J'additionne : virgule sous virgule")

        cols, xs, bandes = self.colonnes(["Unités", ",", "Dixièmes", "Centièmes"], -1.4, 2.0, 2.3, -1.6)
        y1, y2, yr = 1.3, 0.2, -1.0
        self.play(FadeIn(cols))
        r1 = self.ligne(xs, y1, "2,8 ")
        r2 = self.ligne(xs, y2, "1,35")
        plus = Text("+", font_size=56).move_to([xs[0] - 1.25, y2, 0])
        trait = Line([xs[0] - 1.5, -0.4, 0], [xs[3] + 0.9, -0.4, 0], stroke_width=3)
        self.au_mot("On pose la virgule")
        self.play(FadeIn(r1, shift=DOWN * 0.2), FadeIn(r2, shift=UP * 0.2), FadeIn(plus), Create(trait))
        self.play(Circumscribe(VGroup(r1[1], r2[1]), color=JAUNE_TITRE))

        self.au_mot("Il manque un chiffre")
        trou = DashedVMobject(Square(side_length=0.85, color=ORANGE_RETENUE)).move_to([xs[3], y1, 0])
        qm = Text("?", font_size=48, color=ORANGE_RETENUE).move_to([xs[3], y1, 0])
        self.play(Create(trou), FadeIn(qm))
        self.au_mot("On ajoute un zéro")
        zero = Text("0", font_size=56, color=ORANGE_RETENUE).move_to([xs[3], y1, 0])
        note0 = Text("2,8 = 2,80", font_size=36, color=ORANGE_RETENUE).move_to([4.6, 2.0, 0])
        self.play(FadeOut(qm), FadeOut(trou), GrowFromCenter(zero), Write(note0))

        self.au_mot("Les centièmes")
        n1 = Text("0 + 5 = 5", font_size=34, color=ROSE_CENTIEME).move_to([4.6, 1.0, 0])
        c5 = Text("5", font_size=56, color=VERT_OK).move_to([xs[3], yr, 0])
        self.play(self.allumer(bandes["Centièmes"]), FadeIn(n1))
        self.play(FadeIn(c5, shift=DOWN * 0.2))

        self.au_mot("Les dixièmes")
        n2 = Text("8 + 3 = 11", font_size=34, color=VIOLET_ACCENT).move_to([4.6, 0.1, 0])
        self.play(self.allumer(bandes["Dixièmes"]), FadeIn(n2))
        self.au_mot("J'écris 1")
        c1 = Text("1", font_size=56, color=VERT_OK).move_to([xs[2], yr, 0])
        self.play(FadeIn(c1, shift=DOWN * 0.2))
        self.au_mot("je retiens 1")
        ret = Text("1", font_size=30, color=ORANGE_RETENUE).move_to([xs[0] + 0.55, y1 + 0.55, 0])
        self.play(TransformFromCopy(c1, ret))

        self.au_mot("Les unités")
        n3 = Text("2 + 1 + 1 = 4", font_size=34, color=BLEU_CALCUL).move_to([4.6, -0.8, 0])
        self.play(self.allumer(bandes["Unités"]), FadeIn(n3), Indicate(ret, color=ORANGE_RETENUE))
        c4 = Text("4", font_size=56, color=VERT_OK).move_to([xs[0], yr, 0])
        self.play(FadeIn(c4, shift=DOWN * 0.2))

        self.au_mot("On descend la virgule")
        vr = Text(",", font_size=56, color=JAUNE_TITRE).move_to([xs[1], yr, 0])
        self.play(TransformFromCopy(r2[1], vr))
        self.au_mot("Résultat")
        self.play(Write(self.chute("2,8 + 1,35 = 4,15", color=VERT_OK, font_size=46)))
        self.attendre_voix()

    # ── 03 : la soustraction — on casse une unité en 10 dixièmes ───────────

    def ecran_soustraction(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-soustraction")
        self.titre_ecran("Je soustrais : virgule sous virgule")

        cols, xs, bandes = self.colonnes(["Unités", ",", "Dixièmes"], -4.3, 1.6, 2.3, -1.5)
        y1, y2, yr = 1.3, 0.2, -1.0
        r1 = self.ligne(xs, y1, "3,2")
        r2 = self.ligne(xs, y2, "1,5")
        moins = Text("−", font_size=56).move_to([xs[0] - 0.95, y2, 0])
        trait = Line([xs[0] - 1.15, -0.4, 0], [xs[2] + 0.8, -0.4, 0], stroke_width=3)
        self.play(FadeIn(cols), FadeIn(r1), FadeIn(r2), FadeIn(moins), Create(trait))

        self.au_mot("Calculons 3 virgule 2")
        barres = VGroup(*[self.barre_parts(10, 10, largeur=3.0, hauteur=0.45, centre=[1.3, y, 0])
                          for y in (1.9, 1.25, 0.6)])
        def x_baton(k):
            return -0.15 + 0.3 * k
        batons = VGroup(*[Rectangle(width=0.22, height=0.45, stroke_width=1.5, color=WHITE,
                                    fill_color=VIOLET_ACCENT, fill_opacity=0.85).move_to([x_baton(k), -0.4, 0])
                          for k in range(2)])
        l_u = Text("3 unités", font_size=30, color=BLEU_CALCUL).move_to([4.1, 1.25, 0])
        l_d = Text("2 dixièmes", font_size=30, color=VIOLET_ACCENT)
        l_d.move_to([0, -1.05, 0]).align_to(batons, LEFT)
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in barres], lag_ratio=0.2), FadeIn(l_u))
        self.play(FadeIn(batons), FadeIn(l_d))

        self.au_mot("Les dixièmes : 2 moins 5")
        imp = Text("2 − 5 : impossible !", font_size=32, color=ROUGE_ERREUR).move_to([-4.3, -2.1, 0])
        self.play(self.allumer(bandes["Dixièmes"]), FadeIn(imp))

        self.au_mot("on casse une unité")
        casse = barres[2]
        self.play(Wiggle(casse))
        self.play(*[r.animate.stretch_to_fit_width(0.22).move_to([x_baton(k + 2), -0.4, 0])
                    .set_fill(VIOLET_ACCENT, opacity=0.85) for k, r in enumerate(casse)], run_time=1.4)
        barre_3 = Line(r1[0].get_corner(DL), r1[0].get_corner(UR), color=ROUGE_ERREUR, stroke_width=4)
        r_2 = Text("2", font_size=30, color=ORANGE_RETENUE).next_to(r1[0], UP, buff=0.08)
        r_1 = Text("1", font_size=30, color=ORANGE_RETENUE).next_to(r1[2], LEFT, buff=0.05).shift(UP * 0.2)
        self.play(Create(barre_3), FadeIn(r_2), FadeIn(r_1),
                  Transform(l_u, Text("2 unités", font_size=30, color=BLEU_CALCUL).move_to(l_u)))
        self.au_mot("Ça fait 12 dixièmes")
        self.play(Transform(l_d, Text("12 dixièmes", font_size=30, color=VIOLET_ACCENT).move_to(l_d, aligned_edge=LEFT)))

        tous = VGroup(*batons, *casse)
        self.au_mot("12 moins 5")
        partent = VGroup(*tous[7:])
        self.play(partent.animate.set_fill(ROUGE_ERREUR, opacity=0.9))
        self.play(FadeOut(partent, shift=DOWN * 0.4))
        n1 = Text("12 − 5 = 7", font_size=32, color=VIOLET_ACCENT).move_to(imp)
        c7 = Text("7", font_size=56, color=VERT_OK).move_to([xs[2], yr, 0])
        self.play(Transform(imp, n1), FadeIn(c7, shift=DOWN * 0.2),
                  Transform(l_d, Text("7 dixièmes", font_size=30, color=VIOLET_ACCENT).move_to(l_d, aligned_edge=LEFT)))

        self.au_mot("Il reste 2 unités")
        self.play(Indicate(r_2, color=ORANGE_RETENUE))
        self.au_mot("2 moins 1")
        self.play(barres[1].animate.set_fill(ROUGE_ERREUR, opacity=0.9))
        self.play(FadeOut(barres[1], shift=DOWN * 0.4))
        n2 = Text("2 − 1 = 1", font_size=32, color=BLEU_CALCUL).move_to(imp)
        c1 = Text("1", font_size=56, color=VERT_OK).move_to([xs[0], yr, 0])
        self.play(Transform(imp, n2), FadeIn(c1, shift=DOWN * 0.2),
                  Transform(l_u, Text("1 unité", font_size=30, color=BLEU_CALCUL).move_to(l_u)))

        self.au_mot("Résultat")
        vr = Text(",", font_size=56, color=JAUNE_TITRE).move_to([xs[1], yr, 0])
        self.play(FadeIn(vr))
        self.play(Write(self.chute("3,2 − 1,5 = 1,7", color=VERT_OK, font_size=46)))
        self.attendre_voix()

    # ── 04 : multiplier, c'est ajouter (4 ananas à 1,5 €) ──────────────────

    def ecran_multiplier_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-multiplier-sens")
        self.titre_ecran("Multiplier, c'est ajouter")

        xa = [-5.0, -2.9, -0.8, 1.3]
        fruits = VGroup(*[self.ananas().move_to([x, 2.0, 0]) for x in xa])
        prix = VGroup(*[Text("1,5 €", font_size=30).move_to([x, 1.15, 0]) for x in xa])
        self.au_mot("Un ananas coûte")
        self.play(FadeIn(fruits[0], scale=0.6), FadeIn(prix[0]))
        self.au_mot("Combien coûtent 4 ananas")
        self.play(LaggedStart(*[AnimationGroup(FadeIn(f, scale=0.6), FadeIn(p))
                                for f, p in zip(fruits[1:], prix[1:])], lag_ratio=0.25))
        q = Text("?", font_size=64, color=JAUNE_TITRE).move_to([3.2, 1.7, 0])
        self.play(GrowFromCenter(q))

        self.au_mot("Multiplier par 4")
        m = Text("1,5 × 4  =", font_size=40, color=BLEU_CALCUL)
        s = Text("1,5 + 1,5 + 1,5 + 1,5", font_size=40)
        ligne = VGroup(m, s).arrange(RIGHT, buff=0.3).move_to([-1.3, 0.3, 0])
        self.play(FadeOut(q), Write(m))
        self.au_mot("1 virgule 5, plus")
        self.play(Write(s), run_time=2.5)

        self.au_mot("4 fois 1 euro")
        euros = VGroup(*[self.piece("1 €", 0.38, JAUNE_TITRE).move_to([x - 0.42, -0.8, 0]) for x in xa])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in euros], lag_ratio=0.15))
        t1 = Text("4 × 1 € = 4 €", font_size=34, color=JAUNE_TITRE).move_to([-3.8, -1.9, 0])
        self.play(Write(t1))

        self.au_mot("4 fois 50 centimes")
        cts = VGroup(*[self.piece("50 c", 0.32, ORANGE_RETENUE).move_to([x + 0.42, -0.8, 0]) for x in xa])
        self.play(LaggedStart(*[GrowFromCenter(p) for p in cts], lag_ratio=0.15))
        t2 = Text("4 × 50 c = 2 €", font_size=34, color=ORANGE_RETENUE).move_to([0.9, -1.9, 0])
        self.play(Write(t2))

        self.au_mot("En tout")
        self.play(Write(self.chute("1,5 € × 4 = 4 € + 2 € = 6 €", color=VERT_OK, font_size=42)))
        self.attendre_voix()

    # ── 05 : la méthode rapide (2,4 × 3) et l'ordre de grandeur ────────────

    def ecran_multiplier_technique(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-multiplier-technique")
        self.titre_ecran("La méthode rapide")

        e1 = VGroup(Text("2,4", font_size=64), Text("×", font_size=64), Text("3", font_size=64))
        e1.arrange(RIGHT, buff=0.3).move_to([-1.5, 2.25, 0])
        self.play(FadeIn(e1, scale=1.2))

        self.au_mot("on oublie la virgule")
        virgule = e1[0][1]
        self.play(virgule.animate.set_color(ORANGE_RETENUE).shift(UP * 0.6).set_opacity(0))
        e2a = Text("24 × 3", font_size=50, color=BLEU_CALCUL)
        e2b = Text("= 72", font_size=50, color=BLEU_CALCUL)
        e2 = VGroup(e2a, e2b).arrange(RIGHT, buff=0.3).move_to([-1.5, 1.2, 0])
        self.play(FadeIn(e2a))
        self.au_mot("ça fait 72")
        self.play(FadeIn(e2b))

        self.au_mot("Puis on remet la virgule")
        self.play(virgule.animate.set_color(JAUNE_TITRE).shift(DOWN * 0.6).set_opacity(1))
        self.au_mot("2 virgule 4 a un chiffre")
        d1 = self.point_sous(e1[0][2])
        l1 = Text("1 chiffre", font_size=24, color=ORANGE_RETENUE).next_to(d1, RIGHT, buff=0.15)
        self.play(FadeIn(d1, scale=2), FadeIn(l1))
        self.au_mot("Le résultat aussi")
        e3 = VGroup(Text("2,4 × 3 =", font_size=56), Text("7,2", font_size=64, color=VERT_OK))
        e3.arrange(RIGHT, buff=0.3).move_to([-1.5, 0.05, 0])
        self.play(FadeIn(e3[0]), TransformFromCopy(e2b, e3[1]))
        d2 = self.point_sous(e3[1][2])
        self.play(FadeIn(d2, scale=2))

        self.au_mot("On vérifie")
        v1 = Text("2,4 c'est presque 2", font_size=32, color=BLEU_CALCUL).move_to([-3.9, -1.0, 0])
        self.play(FadeIn(v1))
        self.au_mot("Et 2 fois 3")
        v2 = Text("2 × 3 = 6", font_size=32, color=BLEU_CALCUL).move_to([0.6, -1.0, 0])
        self.play(FadeIn(v2))

        self.au_mot("7 virgule 2 est proche de 6")
        etiquettes = {v: str(v) for v in range(0, 81, 10)}
        dr, pt = self.droite(0, 80, 8, etiquettes, longueur=10.0, centre=(-1.0, -2.3), font_size=22)
        self.play(Create(dr[0]), Create(dr[1]), FadeIn(dr[2]))
        zone = Line(pt(6), pt(7.2), color=VERT_OK, stroke_width=10)
        p72v = self.point(pt, 7.2, "7,2", color=VERT_OK, font_size=28)
        self.play(Create(zone), FadeIn(p72v, scale=0.5))
        ok = self.coche().next_to(v2, RIGHT, buff=0.3)
        self.play(Create(ok))

        self.au_mot("72 serait beaucoup trop grand")
        p72 = self.point(pt, 72, "72 : beaucoup trop grand !", color=ROUGE_ERREUR, font_size=26)
        p72[1].shift(LEFT * 1.4)
        self.play(FadeIn(p72, scale=0.5))
        self.play(Indicate(p72[1], color=ROUGE_ERREUR))
        self.attendre_voix()

    # ── 06 : deux nombres à virgule (1,2 × 0,3) ────────────────────────────

    def ecran_deux_virgules(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-deux-virgules")
        self.titre_ecran("Deux nombres à virgule")

        e1 = VGroup(Text("1,2", font_size=64), Text("×", font_size=64), Text("0,3", font_size=64))
        e1.arrange(RIGHT, buff=0.3).move_to([-1.5, 2.3, 0])
        self.play(FadeIn(e1, scale=1.2))

        self.au_mot("On oublie les virgules")
        self.play(e1[0][1].animate.set_color(ORANGE_RETENUE), e1[2][1].animate.set_color(ORANGE_RETENUE))
        e2a = Text("12 × 3", font_size=50, color=BLEU_CALCUL)
        e2b = Text("= 36", font_size=50, color=BLEU_CALCUL)
        VGroup(e2a, e2b).arrange(RIGHT, buff=0.3).move_to([-1.5, 0.85, 0])
        self.play(FadeIn(e2a))
        self.au_mot("ça fait 36")
        self.play(FadeIn(e2b))

        self.au_mot("un dans 1 virgule 2")
        d1 = self.point_sous(e1[0][2])
        l1 = Text("1", font_size=26, color=ORANGE_RETENUE).next_to(d1, RIGHT, buff=0.12)
        self.play(FadeIn(d1, scale=2), FadeIn(l1))
        self.au_mot("un dans 0 virgule 3")
        d2 = self.point_sous(e1[2][2])
        l2 = Text("1", font_size=26, color=ORANGE_RETENUE).next_to(d2, RIGHT, buff=0.12)
        self.play(FadeIn(d2, scale=2), FadeIn(l2))
        self.au_mot("Un plus un")
        t = Text("1 + 1 = 2 chiffres après la virgule", font_size=34, color=ORANGE_RETENUE).move_to([-1.5, -0.25, 0])
        self.play(Write(t))

        self.au_mot("Le résultat a deux chiffres")
        res = Text("0,36", font_size=80, color=VERT_OK).move_to([-1.5, -1.45, 0])
        self.play(TransformFromCopy(e2b, res))
        dots = VGroup(self.point_sous(res[2]), self.point_sous(res[3]))
        self.play(FadeIn(dots, scale=2))
        self.play(Write(self.chute("1,2 × 0,3 = 0,36", color=VERT_OK, font_size=44)))
        self.attendre_voix()

    # ── 07 : multiplier par 0,1 — les chiffres reculent d'un rang ──────────

    def ecran_par_01(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-par-01")
        self.titre_ecran("Multiplier par 0,1")

        q = Text("37 × 0,1 = ?", font_size=50, color=BLEU_CALCUL).move_to([-2.2, 2.45, 0])
        self.play(FadeIn(q))
        self.au_mot("0 virgule 1, c'est un dixième")
        d = Text("0,1 = 1 dixième", font_size=36, color=VIOLET_ACCENT).move_to([3.6, 2.45, 0])
        self.play(Write(d))

        cols, xs, bandes = self.colonnes(["Dizaines", "Unités", ",", "Dixièmes"], -1.4, 2.0, 1.45, -0.3)
        ch = self.ligne(xs, 0.4, "37  ")
        self.play(FadeIn(cols), FadeIn(ch))
        self.au_mot("c'est prendre un dixième de 37")
        self.play(Indicate(ch, color=BLEU_CALCUL))

        self.au_mot("chaque chiffre recule")
        fl = VGroup(*[CurvedArrow([xs[i] + 0.2, 0.95, 0], [xs[j] - 0.2, 0.95, 0], angle=-PI / 2.5,
                                  color=ORANGE_RETENUE)
                      for i, j in ((0, 1), (1, 3))])
        self.play(Create(fl))
        vg = Text(",", font_size=56, color=JAUNE_TITRE).move_to([xs[2], 0.35, 0])
        self.play(ch[0].animate.move_to([xs[1], 0.4, 0]), ch[1].animate.move_to([xs[3], 0.4, 0]),
                  FadeIn(vg), run_time=1.2)
        self.play(FadeOut(fl), Transform(q, Text("37 × 0,1 = 3,7", font_size=50, color=VERT_OK).move_to(q)))

        self.au_mot("Attention")
        att = Text("3,7 est plus petit que 37 !", font_size=36, color=ROUGE_ERREUR).move_to([-1.4, -1.0, 0])
        self.play(FadeIn(att, scale=1.3))
        self.au_mot("Multiplier par 0 virgule 1, c'est diviser par 10")
        r1 = Text("× 0,1   c'est   ÷ 10", font_size=40, color=VERT_OK).move_to([-1.4, -1.95, 0])
        self.play(Write(r1), Create(SurroundingRectangle(r1, color=VERT_OK, buff=0.15)))
        self.au_mot("multiplier par 0 virgule 01")
        r2 = Text("× 0,01   c'est   ÷ 100 : deux rangs", font_size=34, color=BLEU_CALCUL).move_to([-1.4, -2.9, 0])
        self.play(Write(r2))
        self.attendre_voix()

    # ── 08 : partager (7,5 L dans 5 bouteilles) ────────────────────────────

    def ecran_diviser(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-diviser")
        self.titre_ecran("Partager un nombre décimal")

        grande, corps_g = self.bouteille(1.4, 3.0, -5.4, -0.9)
        eau_g = self.eau(corps_g, 7.5 / 8)
        l_g = Text("7,5 L", font_size=36, color=EAU).next_to(grande, DOWN, buff=0.2)
        self.play(FadeIn(grande), GrowFromEdge(eau_g, DOWN), FadeIn(l_g))

        self.au_mot("dans 5 bouteilles")
        xb = [-2.9, -1.4, 0.1, 1.6, 3.1]
        petites = [self.bouteille(0.9, 1.7, x, 0.1) for x in xb]
        self.play(LaggedStart(*[FadeIn(b[0], shift=DOWN * 0.2) for b in petites], lag_ratio=0.15))

        self.au_mot("c'est 75 dixièmes")
        t1 = Text("7,5 L = 75 dixièmes de litre", font_size=34, color=BLEU_CALCUL).move_to([0.3, -1.3, 0])
        self.play(Write(t1))

        self.au_mot("75 dixièmes partagés en 5")
        eaux = [self.eau(c, 0.75) for _, c in petites]
        self.play(eau_g.animate.stretch_to_fit_height(0.01, about_edge=DOWN),
                  *[GrowFromEdge(e, DOWN) for e in eaux], run_time=2.0)
        t2 = Text("75 ÷ 5 = 15 dixièmes chacun", font_size=34, color=VIOLET_ACCENT).move_to([0.3, -2.1, 0])
        self.play(Write(t2))

        self.au_mot("15 dixièmes, c'est 1 virgule 5")
        ls = VGroup(*[Text("1,5 L", font_size=26, color=VERT_OK).next_to(b[0], DOWN, buff=0.15) for b in petites])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.15) for l in ls], lag_ratio=0.12))

        self.au_mot("Chaque bouteille")
        self.play(Write(self.chute("7,5 ÷ 5 = 1,5 L", color=VERT_OK, font_size=46)))
        self.au_mot("On vérifie")
        v = Text("Vérification : 1,5 × 5 = 7,5", font_size=34, color=VERT_OK).move_to(t1)
        self.play(FadeOut(t1), FadeIn(v))
        self.play(Create(self.coche().next_to(v, RIGHT, buff=0.3)))
        self.attendre_voix()

    # ── 09 : défi (3 cahiers, billet de 5 €) et correction ─────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.titre_ecran("Défi", font_size=48)

        self.au_mot("Tu achètes 3 cahiers")
        cahiers = VGroup(*[self.cahier().move_to([x, 1.4, 0]) for x in (-5.2, -3.5, -1.8)])
        prix = VGroup(*[Text("1,25 €", font_size=26).next_to(c, DOWN, buff=0.15) for c in cahiers])
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cahiers], lag_ratio=0.2), FadeIn(prix))
        self.au_mot("Tu paies avec un billet")
        billet = VGroup(Rectangle(width=2.0, height=1.0, fill_color="#16A34A", fill_opacity=0.8,
                                  stroke_color=WHITE, stroke_width=2),
                        Text("5 €", font_size=40)).move_to([1.6, 1.4, 0])
        self.play(FadeIn(billet, shift=LEFT * 0.4))
        self.au_mot("Combien on te rend")
        q = Text("On te rend combien ?", font_size=46, color=JAUNE_TITRE).move_to([-1.0, -0.6, 0])
        self.play(Write(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        self.titre_ecran("Correction")

        a = Text("1 : le prix des 3 cahiers", font_size=30, color=JAUNE_TITRE).move_to([-4.0, 2.45, 0])
        self.play(FadeIn(a))
        self.au_mot("125 fois 3")
        l1 = Text("125 × 3 = 375", font_size=44, color=BLEU_CALCUL).move_to([-1.2, 1.6, 0])
        self.play(Write(l1))
        self.au_mot("Deux chiffres après la virgule")
        l2 = VGroup(Text("1,25 × 3 =", font_size=44), Text("3,75 €", font_size=48, color=VERT_OK))
        l2.arrange(RIGHT, buff=0.3).move_to([-1.2, 0.6, 0])
        self.play(FadeIn(l2))
        dots = VGroup(self.point_sous(l2[0][2]), self.point_sous(l2[0][3]),
                      self.point_sous(l2[1][2]), self.point_sous(l2[1][3]))
        self.play(FadeIn(dots, scale=2))

        self.au_mot("Ensuite, on enlève au billet")
        b = Text("2 : ce qu'on te rend", font_size=30, color=JAUNE_TITRE).move_to([0, -0.5, 0]).align_to(a, LEFT)
        l3a = Text("5,00 − 3,75", font_size=44)
        l3b = Text("= 1,25", font_size=48, color=VERT_OK)
        VGroup(l3a, l3b).arrange(RIGHT, buff=0.3).move_to([-1.2, -1.4, 0])
        l3a[2:4].set_color(ORANGE_RETENUE)
        self.play(FadeIn(b), FadeIn(l3a))
        self.au_mot("ça fait 1 virgule 25")
        self.play(Write(l3b))
        self.au_mot("On te rend")
        self.play(Write(self.chute("On te rend 1,25 €", color=VERT_OK, font_size=46)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_garde()
        self.ecran_objectifs()
        self.ecran_addition_sens()
        self.ecran_addition_posee()
        self.ecran_soustraction()
        self.ecran_multiplier_sens()
        self.ecran_multiplier_technique()
        self.ecran_deux_virgules()
        self.ecran_par_01()
        self.ecran_diviser()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Additionner et soustraire : virgule sous virgule",
                "Multiplier : on oublie la virgule, puis on la remet",
                "Partager un nombre décimal",
            ],
            rappel="Multiplier par 0,1, ça rend plus petit !",
        )
        self.page_abonnement()
