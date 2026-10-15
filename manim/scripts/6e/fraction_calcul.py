# fraction_calcul.py
# EleveAI — Maths 6e — Calculer avec les fractions
# (notionId : fraction_calcul), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-6e-fraction-calcul.tsx.
#
# ⭐ Script de la voix validé par Frédéric le 05/10/2026 :
# manim/voix/6e-fraction-calcul.json (débit −10).
# Chaque écran a un DESSIN qui porte l'idée : une pizza, une tablette, une barre
# de 60, des barres de quarts et de sixièmes, une bouteille, 30 élèves.
#
# Mapping micro-compétences (coach 6e, notion fraction_calcul) → écrans :
# - fraction_quantite          → 01 (la tablette, 3/4 de 20), 02 (2/5 de 60)
# - fraction_additionner       → 03 (la pizza), 04 (1/2 + 1/4), 05 (le piège), 06 (la bouteille)
# - fraction_multiplier_entier → 07 (3 × 2/5), 08 (6/5 dépasse 1)
# - fraction_calcul_defi       → 09 + correction (la classe de 30)
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/fraction_calcul.py FractionCalcul6e -o eleveai-maths-6e-fraction-calcul --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Prendre une fraction d'un nombre",
    "Additionner et soustraire des fractions",
    "Multiplier une fraction par un entier",
]

CHOCOLAT = "#92400E"
JUS = "#F59E0B"


class FractionCalcul6e(Notion6e):
    nom_voix = "6e-fraction-calcul"

    # ── les dessins propres à cette vidéo ──────────────────────────────────

    def expr(self, items, font_size=40, color=WHITE):
        """Une ligne de calcul : (n, d) ou (n, d, couleur) → fraction écrite ;
        "texte" ou ("texte", couleur) → texte."""
        g = VGroup()
        for it in items:
            # ⚠️ WHITE est un ManimColor, pas une chaîne : on reconnaît une
            # fraction à son dénominateur ENTIER (un « = » blanc sortait en
            # fraction « = sur #FFFFFF »).
            if isinstance(it, tuple) and len(it) >= 2 and isinstance(it[1], int):
                c = it[2] if len(it) > 2 else color
                g.add(self.fraction(it[0], it[1], font_size=int(font_size * 0.85), color=c))
            elif isinstance(it, tuple):
                g.add(Text(it[0], font_size=font_size, color=it[1]))
            else:
                g.add(Text(it, font_size=font_size, color=color))
        return g.arrange(RIGHT, buff=0.2)

    def chute_expr(self, items, font_size=40, color=VERT_OK):
        """La conclusion de l'écran, en bas, avec de vraies fractions."""
        g = self.expr(items, font_size=font_size, color=color)
        if g.width > config.frame_width - 3.8:
            g.scale_to_fit_width(config.frame_width - 3.8)
        return g.to_edge(DOWN, buff=0.55).shift(LEFT * 0.6)

    def pizza(self, rayon=1.5, centre=ORIGIN):
        p = self.disque(5, 0, rayon=rayon, centre=centre)
        croute = Circle(radius=rayon + 0.08, color="#D97706", stroke_width=8).move_to(centre)
        return p, croute

    def colorier(self, secteurs, couleur):
        return [s.animate.set_fill(couleur, opacity=0.85) for s in secteurs]

    def tablette(self, centre, cote=0.6):
        """4 rangées de 5 carrés : une rangée = un paquet."""
        rangees = VGroup()
        for r in range(4):
            rangee = VGroup(*[Square(side_length=cote, stroke_color="#FDE68A", stroke_width=2,
                                     fill_color=CHOCOLAT, fill_opacity=1)
                              .move_to([c * cote, -r * cote, 0]) for c in range(5)])
            rangees.add(rangee)
        return rangees.move_to(centre)

    def bouteille(self, centre, largeur=1.6, hauteur=3.2):
        corps = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.15,
                                 stroke_color=WHITE, stroke_width=3).move_to(centre)
        col = Rectangle(width=largeur * 0.4, height=hauteur * 0.14, stroke_color=WHITE, stroke_width=3)
        col.next_to(corps, UP, buff=0)
        grads = VGroup(*[Line(corps.get_left() + RIGHT * 0.05, corps.get_left() + RIGHT * 0.35,
                              stroke_width=2, color=WHITE)
                         .shift(UP * (-hauteur / 2 + hauteur * k / 4)) for k in (1, 2, 3)])
        return VGroup(corps, col, grads), corps

    def liquide(self, corps, fraction):
        h = max(fraction * corps.height - 0.06, 0.01)
        e = Rectangle(width=corps.width - 0.1, height=h, stroke_width=0, fill_color=JUS, fill_opacity=0.85)
        return e.move_to(corps.get_bottom() + UP * (h / 2 + 0.04))

    # ── 00 : page de garde — la pizza ──────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")

        t = Text("Calculer avec les fractions", font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = Text(self.identite, font_size=30, color=WHITE).next_to(t, DOWN, buff=0.3)
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))

        p, croute = self.pizza(rayon=1.45, centre=[-4.0, -0.5, 0])
        l5 = Text("5 parts égales", font_size=32).next_to(croute, DOWN, buff=0.25)
        self.play(FadeIn(croute), FadeIn(p, scale=0.7), FadeIn(l5))

        self.au_mot("Tu en manges 1")
        self.play(*self.colorier([p[0]], BLEU_CALCUL))
        toi = Text("Toi : 1 part", font_size=34, color=BLEU_CALCUL).move_to([0, 0.9, 0], aligned_edge=LEFT)
        toi.align_to([-1.9, 0, 0], LEFT)
        self.play(FadeIn(toi, shift=RIGHT * 0.2))
        self.au_mot("Ton frère")
        self.play(*self.colorier([p[1], p[2]], VERT_OK))
        frere = Text("Ton frère : 2 parts", font_size=34, color=VERT_OK)
        frere.next_to(toi, DOWN, buff=0.4).align_to(toi, LEFT)
        self.play(FadeIn(frere, shift=RIGHT * 0.2))

        self.au_mot("Quelle part")
        q = Text("Quelle part de la pizza ?", font_size=40, color=JAUNE_TITRE)
        q.next_to(frere, DOWN, buff=0.55).align_to(toi, LEFT)
        self.play(Write(q))
        self.play(Flash(q, color=JAUNE_TITRE, line_length=0.3))

        self.au_mot("Bonne nouvelle")
        b = Text("Calculer avec les fractions,", font_size=32)
        b2 = Text("c'est compter des parts !", font_size=36, color=BLEU_CALCUL)
        VGroup(b, b2).arrange(DOWN, aligned_edge=LEFT, buff=0.2).next_to(q, DOWN, buff=0.55).align_to(toi, LEFT)
        self.play(FadeIn(b, shift=UP * 0.2))
        self.au_mot("c'est compter")
        self.play(Write(b2))
        self.attendre_voix()

    # ── 00b : les objectifs ────────────────────────────────────────────────

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
        for mot, l in zip(("prendre une fraction", "additionner des", "et multiplier"), lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.25), run_time=0.5)
        self.attendre_voix()

    # ── 01 : une fraction d'un nombre — la tablette de 20 carrés ───────────

    def ecran_quantite_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-quantite-sens")
        self.titre_ecran("Une fraction d'un nombre")

        tab = self.tablette([-3.9, 0.4, 0])
        l20 = Text("20 carrés", font_size=32).next_to(tab, DOWN, buff=0.3)
        self.play(FadeIn(tab, scale=0.8), FadeIn(l20))

        x_txt = 2.6
        self.au_mot("Tu en manges les 3 quarts")
        q = self.expr([(3, 4, JAUNE_TITRE), "de 20 = ?"], font_size=44).move_to([x_txt, 2.0, 0])
        self.play(FadeIn(q))
        self.au_mot("3 quarts, c'est")
        sens = Text("3 parts sur 4", font_size=36, color=JAUNE_TITRE).move_to([x_txt, 0.9, 0])
        self.play(Write(sens))

        self.au_mot("On coupe les 20 carrés")
        self.play(*[r.animate.shift(DOWN * 0.22 * i) for i, r in enumerate(tab)],
                  l20.animate.shift(DOWN * 0.66), run_time=1.0)
        self.au_mot("20 divisé par 4")
        d = Text("20 ÷ 4 = 5", font_size=40, color=BLEU_CALCUL).move_to([x_txt, 0.0, 0])
        self.play(Write(d))
        self.au_mot("Chaque paquet a 5")
        cinq = VGroup(*[Text("5", font_size=30, color=BLEU_CALCUL).next_to(r, RIGHT, buff=0.25) for r in tab])
        self.play(LaggedStart(*[FadeIn(c) for c in cinq], lag_ratio=0.15))

        self.au_mot("Tu prends 3 paquets")
        self.play(*[sq.animate.set_fill(ORANGE_RETENUE, opacity=1) for r in tab[:3] for sq in r])
        self.au_mot("3 fois 5")
        m = Text("3 × 5 = 15", font_size=40, color=ORANGE_RETENUE).move_to([x_txt, -0.9, 0])
        self.play(Write(m))
        self.au_mot("Tu manges 15")
        self.play(Write(self.chute_expr([(3, 4), "de 20 = 15 carrés"])))
        self.attendre_voix()

    # ── 02 : la méthode — 2/5 de 60 ────────────────────────────────────────

    def ecran_quantite_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-quantite-methode")
        self.titre_ecran("Je divise, puis je multiplie")

        self.au_mot("Calculons 2 cinquièmes")
        q = self.expr([(2, 5, JAUNE_TITRE), "de 60"], font_size=44).move_to([-0.6, 2.25, 0])
        barre = self.barre_parts(5, 0, largeur=9.0, hauteur=0.9, centre=[-0.6, 0.9, 0])
        l60 = Text("60", font_size=40).next_to(barre, LEFT, buff=0.3)
        self.play(FadeIn(q), FadeIn(barre), FadeIn(l60))

        self.au_mot("Je divise 60 par 5")
        douze = VGroup(*[Text("12", font_size=34, color=BLEU_CALCUL).move_to(c) for c in barre])
        self.play(LaggedStart(*[FadeIn(t) for t in douze], lag_ratio=0.12))
        d = Text("60 ÷ 5 = 12", font_size=40, color=BLEU_CALCUL).move_to([-3.9, -1.1, 0])
        self.play(Write(d))

        self.au_mot("c'est un cinquième")
        un = self.fraction(1, 5, font_size=30, color=BLEU_CALCUL).next_to(barre[0], DOWN, buff=0.15)
        self.play(Indicate(barre[0], color=BLEU_CALCUL), FadeIn(un))

        self.au_mot("Puis je multiplie par 2")
        self.play(barre[0].animate.set_fill(ORANGE_RETENUE, opacity=0.85),
                  barre[1].animate.set_fill(ORANGE_RETENUE, opacity=0.85))
        self.au_mot("2 fois 12")
        m = Text("2 × 12 = 24", font_size=40, color=VERT_OK).move_to([-3.9, -2.1, 0])
        self.play(Write(m))
        self.play(Circumscribe(m, color=VERT_OK))

        grosse = self.fraction(2, 5, font_size=64, color=WHITE).move_to([0.9, -1.55, 0])
        self.au_mot("Le nombre du bas")
        self.play(FadeIn(grosse))
        bas = Text("en combien on coupe", font_size=28, color=VIOLET_ACCENT).next_to(grosse[2], RIGHT, buff=0.4)
        self.play(grosse[2].animate.set_color(VIOLET_ACCENT), FadeIn(bas, shift=LEFT * 0.2))
        self.au_mot("Le nombre du haut")
        haut = Text("combien de parts on prend", font_size=28, color=ORANGE_RETENUE).next_to(grosse[0], RIGHT, buff=0.4)
        self.play(grosse[0].animate.set_color(ORANGE_RETENUE), FadeIn(haut, shift=LEFT * 0.2))
        self.attendre_voix()

    # ── 03 : additionner, même dénominateur — retour à la pizza ────────────

    def ecran_addition_meme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-addition-meme")
        self.titre_ecran("Même dénominateur : j'ajoute le haut")

        p, croute = self.pizza(rayon=1.5, centre=[-4.3, 0.5, 0])
        self.play(FadeIn(croute), FadeIn(p))

        x = 1.9
        e1 = self.fraction(1, 5, font_size=46, color=BLEU_CALCUL)
        plus = Text("+", font_size=46)
        e2 = self.fraction(2, 5, font_size=46, color=VERT_OK)
        egal = Text("=", font_size=46)
        e3 = self.fraction(3, 5, font_size=46, color=JAUNE_TITRE)
        ligne = VGroup(e1, plus, e2, egal, e3).arrange(RIGHT, buff=0.3).move_to([x, 1.6, 0])

        self.au_mot("Tu as mangé 1 cinquième")
        self.play(*self.colorier([p[0]], BLEU_CALCUL), FadeIn(e1))
        self.au_mot("Ton frère")
        self.play(*self.colorier([p[1], p[2]], VERT_OK), FadeIn(plus), FadeIn(e2))

        self.au_mot("parts de même taille")
        meme = Text("des parts de même taille", font_size=30, color=WHITE).move_to([x, 0.2, 0])
        self.play(FadeIn(meme), Indicate(VGroup(e1[2], e2[2]), color=VIOLET_ACCENT))

        self.au_mot("On les compte")
        c = Text("1 + 2 = 3", font_size=40, color=JAUNE_TITRE).move_to(meme)
        self.play(FadeOut(meme), Write(c))
        self.au_mot("Vous avez mangé 3")
        self.play(FadeIn(egal), TransformFromCopy(c, e3))
        l3 = self.expr([(3, 5, JAUNE_TITRE), ("mangés", JAUNE_TITRE)], font_size=34).next_to(croute, DOWN, buff=0.2)
        self.play(FadeIn(l3))

        self.au_mot("On ajoute les numérateurs")
        self.play(*[f[0].animate.set_color(ORANGE_RETENUE) for f in (e1, e2, e3)])
        n = Text("Numérateurs : on les ajoute", font_size=30, color=ORANGE_RETENUE).move_to([x, -1.0, 0])
        self.play(FadeIn(n, shift=UP * 0.15))
        self.au_mot("Le dénominateur ne change pas")
        self.play(*[f[2].animate.set_color(VIOLET_ACCENT) for f in (e1, e2, e3)])
        dn = Text("Dénominateur : il ne change pas", font_size=30, color=VIOLET_ACCENT).move_to([x, -1.8, 0])
        self.play(FadeIn(dn, shift=UP * 0.15))
        self.attendre_voix()

    # ── 04 : sinon, je change une fraction — 1/2 + 1/4 ─────────────────────

    def ecran_addition_sinon(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-addition-sinon")
        self.titre_ecran("Parts différentes : je change une fraction")

        b1 = self.barre_parts(2, 1, largeur=6.0, hauteur=0.75, centre=[-1.6, 2.0, 0], couleur=BLEU_CALCUL)
        b2 = self.barre_parts(4, 1, largeur=6.0, hauteur=0.75, centre=[-1.6, 0.9, 0], couleur=VERT_OK)
        f1 = self.fraction(1, 2, font_size=34, color=BLEU_CALCUL).next_to(b1, LEFT, buff=0.3)
        f2 = self.fraction(1, 4, font_size=34, color=VERT_OK).next_to(b2, LEFT, buff=0.3)
        self.play(FadeIn(b1), FadeIn(f1))
        self.play(FadeIn(b2), FadeIn(f2))

        self.au_mot("Calculons un demi")
        q = self.expr([(1, 2, BLEU_CALCUL), "+", (1, 4, VERT_OK), "= ?"], font_size=44).move_to([-1.6, -0.6, 0])
        self.play(FadeIn(q))

        self.au_mot("On coupe la moitié en deux")
        b1q = self.barre_parts(4, 2, largeur=6.0, hauteur=0.75, centre=[-1.6, 2.0, 0], couleur=BLEU_CALCUL)
        self.play(FadeIn(b1q), FadeOut(b1))
        f1b = self.expr([(1, 2, BLEU_CALCUL), ("=", BLEU_CALCUL), (2, 4, BLEU_CALCUL)], font_size=40)
        f1b.next_to(b1q, RIGHT, buff=0.35)
        self.play(FadeIn(f1b))

        self.au_mot("On a multiplié le haut")
        h = Text("× 2", font_size=28, color=ORANGE_RETENUE).next_to(f1b, UP, buff=0.1)
        self.play(FadeIn(h), f1b[0][0].animate.set_color(ORANGE_RETENUE), f1b[2][0].animate.set_color(ORANGE_RETENUE))
        self.au_mot("et le bas par 2")
        bb = Text("× 2", font_size=28, color=ORANGE_RETENUE).next_to(f1b, DOWN, buff=0.1)
        self.play(FadeIn(bb), f1b[0][2].animate.set_color(ORANGE_RETENUE), f1b[2][2].animate.set_color(ORANGE_RETENUE))

        self.au_mot("tout est en quarts")
        self.play(Indicate(VGroup(b1q, b2), color=WHITE, scale_factor=1.05))

        self.au_mot("2 quarts plus 1 quart")
        r = self.expr([(1, 2, BLEU_CALCUL), "+", (1, 4, VERT_OK), "=", (2, 4, BLEU_CALCUL), "+",
                       (1, 4, VERT_OK)], font_size=44).move_to([-1.6, -0.6, 0])
        self.play(Transform(q, r))
        self.au_mot("ça fait 3 quarts")
        self.play(Write(self.chute_expr([(1, 2), "+", (1, 4), "=", (3, 4)], font_size=44)))
        self.attendre_voix()

    # ── 05 : le piège — 1/2 + 1/3 n'est pas 2/5 ────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Attention au piège !", font_size=44)

        self.au_mot("Un élève écrit")
        faux = self.expr([(1, 2), "+", (1, 3), "=", (2, 5)], font_size=48).move_to([-3.6, 1.9, 0])
        self.play(FadeIn(faux))
        self.au_mot("Il a ajouté les hauts")
        self.play(*[faux[i][0].animate.set_color(ORANGE_RETENUE) for i in (0, 2, 4)])
        self.au_mot("puis les bas")
        self.play(*[faux[i][2].animate.set_color(VIOLET_ACCENT) for i in (0, 2, 4)])
        self.au_mot("C'est faux")
        croix = Cross(faux, stroke_color=ROUGE_ERREUR, stroke_width=6)
        lf = Text("FAUX", font_size=40, color=ROUGE_ERREUR).next_to(faux, DOWN, buff=0.12)
        self.play(Create(croix), FadeIn(lf))

        self.au_mot("2 cinquièmes, c'est moins")
        bd = self.barre_parts(2, 1, largeur=5.0, hauteur=0.55, centre=[3.6, 2.3, 0], couleur=BLEU_CALCUL)
        bc = self.barre_parts(5, 2, largeur=5.0, hauteur=0.55, centre=[3.6, 1.45, 0], couleur=ROUGE_ERREUR)
        ld = self.fraction(1, 2, font_size=26, color=BLEU_CALCUL).next_to(bd, LEFT, buff=0.2)
        lc = self.fraction(2, 5, font_size=26, color=ROUGE_ERREUR).next_to(bc, LEFT, buff=0.2)
        self.play(FadeIn(bd), FadeIn(ld), FadeIn(bc), FadeIn(lc))
        self.au_mot("on ne peut pas trouver moins")
        moins = Text("En ajoutant, on ne peut pas trouver moins !", font_size=30, color=ROUGE_ERREUR)
        moins.move_to([0, 0.15, 0])
        self.play(Write(moins))

        self.au_mot("tout en sixièmes")
        s1 = self.barre_parts(6, 3, largeur=5.0, hauteur=0.55, centre=[-3.4, -0.65, 0], couleur=BLEU_CALCUL)
        s2 = self.barre_parts(6, 2, largeur=5.0, hauteur=0.55, centre=[-3.4, -1.55, 0], couleur=VERT_OK)
        self.play(FadeIn(s1), FadeIn(s2))
        self.au_mot("Un demi, c'est 3 sixièmes")
        e1 = self.expr([(1, 2, BLEU_CALCUL), ("=", BLEU_CALCUL), (3, 6, BLEU_CALCUL)], font_size=30).next_to(s1, RIGHT, buff=0.3)
        self.play(FadeIn(e1))
        self.au_mot("Un tiers, c'est 2 sixièmes")
        e2 = self.expr([(1, 3, VERT_OK), ("=", VERT_OK), (2, 6, VERT_OK)], font_size=30).next_to(s2, RIGHT, buff=0.3)
        self.play(FadeIn(e2))
        self.au_mot("3 sixièmes plus 2 sixièmes")
        self.play(Write(self.chute_expr([(1, 2), "+", (1, 3), "=", (3, 6), "+", (2, 6), "=", (5, 6)],
                                        font_size=36)))
        self.attendre_voix()

    # ── 06 : soustraire — la bouteille ─────────────────────────────────────

    def ecran_soustraction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-soustraction")
        self.titre_ecran("Je soustrais : pareil")

        b, corps = self.bouteille([-4.4, 0.0, 0])
        jus = self.liquide(corps, 3 / 4)
        lb = self.expr([(3, 4, JUS), ("de litre", JUS)], font_size=32).next_to(b, DOWN, buff=0.25)
        self.au_mot("Une bouteille contient")
        self.play(FadeIn(b), GrowFromEdge(jus, DOWN), FadeIn(lb))

        verre = Polygon([-0.55, 0.6, 0], [0.55, 0.6, 0], [0.42, -0.9, 0], [-0.42, -0.9, 0],
                        stroke_color=WHITE, stroke_width=3).move_to([-1.6, -0.6, 0])
        self.au_mot("On en verse 1 quart")
        dans_verre = Polygon([-0.48, 0.05, 0], [0.48, 0.05, 0], [0.4, -0.86, 0], [-0.4, -0.86, 0],
                             stroke_width=0, fill_color=JUS, fill_opacity=0.85)
        dans_verre.move_to(verre.get_bottom() + UP * 0.5)
        lv = self.expr([(1, 4, JUS), ("de litre", JUS)], font_size=28).next_to(verre, DOWN, buff=0.25)
        self.play(FadeIn(verre))
        self.play(jus.animate.stretch_to_fit_height(jus.height * 2 / 3, about_edge=DOWN),
                  FadeIn(dans_verre), FadeIn(lv), run_time=1.5)

        self.au_mot("3 quarts moins 1 quart")
        e = self.expr([(3, 4), "−", (1, 4), "=", (2, 4, JAUNE_TITRE)], font_size=48).move_to([3.0, 1.3, 0])
        self.play(Write(e))
        self.au_mot("Et 2 quarts")
        d = self.expr([(2, 4, JAUNE_TITRE), "=", (1, 2, VERT_OK)], font_size=48).move_to([3.0, -0.4, 0])
        dl = Text("un demi-litre", font_size=34, color=VERT_OK).next_to(d, DOWN, buff=0.3)
        self.play(FadeIn(d), FadeIn(dl))
        self.play(Indicate(jus, color=VERT_OK))
        self.attendre_voix()

    # ── 07 : multiplier par un entier — 3 × 2/5 ────────────────────────────

    def ecran_multiplier(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-multiplier")
        self.titre_ecran("Multiplier par un entier")

        self.au_mot("Calculons 3 fois")
        q = self.expr(["3 ×", (2, 5)], font_size=48).move_to([-4.4, 2.15, 0])
        self.play(FadeIn(q))
        self.au_mot("c'est ajouter 3 fois")
        s = self.expr([("=", WHITE), (2, 5, BLEU_CALCUL), "+", (2, 5, VERT_OK), "+", (2, 5, ORANGE_RETENUE)],
                      font_size=48).next_to(q, RIGHT, buff=0.25)
        self.play(Write(s), run_time=2.0)

        u1 = self.barre_parts(5, 0, largeur=4.5, hauteur=0.7, centre=[-3.5, 0.55, 0])
        u2 = self.barre_parts(5, 0, largeur=4.5, hauteur=0.7, centre=[1.2, 0.55, 0])
        cases = list(u1) + list(u2)
        self.play(FadeIn(u1), FadeIn(u2))
        couleurs = [BLEU_CALCUL, VERT_OK, ORANGE_RETENUE]
        etiq = VGroup()
        for k, c in enumerate(couleurs):
            self.play(cases[2 * k].animate.set_fill(c, opacity=0.85),
                      cases[2 * k + 1].animate.set_fill(c, opacity=0.85), run_time=0.45)
            et = Text(f"{k + 1} fois", font_size=22, color=c).next_to(
                VGroup(cases[2 * k], cases[2 * k + 1]), DOWN, buff=0.15)
            etiq.add(et)
            self.play(FadeIn(et), run_time=0.25)

        self.au_mot("ça fait 6 cinquièmes")
        r1 = self.expr(["3 ×", (2, 5), "=", ("3 × 2", 5, ORANGE_RETENUE), "=", (6, 5, JAUNE_TITRE)],
                       font_size=44).move_to([-1.6, -1.2, 0])
        # le numérateur « 3 × 2 » s'écrit en texte : fraction() accepte une chaîne
        self.play(FadeIn(r1[:2]), FadeIn(r1[2]), FadeIn(r1[5]))
        self.au_mot("On multiplie le haut")
        self.play(FadeIn(r1[3]), FadeIn(r1[4]))
        self.au_mot("Le bas ne change pas")
        self.play(*[f[2].animate.set_color(VIOLET_ACCENT) for f in (r1[1], r1[3], r1[5])])
        lb = Text("les parts gardent leur taille", font_size=26, color=VIOLET_ACCENT).next_to(r1, RIGHT, buff=0.35)
        self.play(FadeIn(lb))

        self.au_mot("l'ordre ne compte pas")
        self.play(Write(self.chute_expr([(2, 5), "× 3 =", (6, 5), ": l'ordre ne compte pas"], font_size=38)))
        self.attendre_voix()

    # ── 08 : 6/5 dépasse 1 ─────────────────────────────────────────────────

    def ecran_plus_que_un(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-plus-que-un")
        self.titre_ecran("Plus grand que 1 !")

        u1 = self.barre_parts(5, 0, largeur=4.5, hauteur=0.8, centre=[-3.5, 0.9, 0])
        u2 = self.barre_parts(5, 0, largeur=4.5, hauteur=0.8, centre=[1.2, 0.9, 0])
        self.play(FadeIn(u1), FadeIn(u2))
        f6 = self.fraction(6, 5, font_size=46, color=JAUNE_TITRE).move_to([-1.15, 2.15, 0])
        self.au_mot("6 cinquièmes")
        self.play(FadeIn(f6), *[c.animate.set_fill(JAUNE_TITRE, opacity=0.85) for c in list(u1) + [u2[0]]])

        self.au_mot("5 cinquièmes font 1")
        self.play(*[c.animate.set_fill(BLEU_CALCUL, opacity=0.85) for c in u1])
        l1 = self.expr([(5, 5, BLEU_CALCUL), ("= 1 entier", BLEU_CALCUL)], font_size=34).next_to(u1, DOWN, buff=0.3)
        self.play(FadeIn(l1))
        self.au_mot("Il reste 1 cinquième")
        self.play(u2[0].animate.set_fill(ORANGE_RETENUE, opacity=0.85))
        l2 = self.expr([("+", ORANGE_RETENUE), (1, 5, ORANGE_RETENUE)], font_size=34).next_to(u2[0], DOWN, buff=0.3)
        self.play(FadeIn(l2))

        e = self.expr([(6, 5, JAUNE_TITRE), "=", (5, 5, BLEU_CALCUL), "+", (1, 5, ORANGE_RETENUE), "=",
                       ("1 +", BLEU_CALCUL), (1, 5, ORANGE_RETENUE)], font_size=44).move_to([-1.2, -1.45, 0])
        self.play(FadeIn(e))
        self.au_mot("Une fraction peut dépasser 1")
        self.play(Write(self.chute("Une fraction peut dépasser 1 !", color=VERT_OK, font_size=42)))
        self.attendre_voix()

    # ── 09 : défi (la classe de 30) et correction ──────────────────────────

    def eleves(self, centre):
        g = VGroup(*[Dot(radius=0.17, color=GREY_B) for _ in range(30)])
        g.arrange_in_grid(rows=3, cols=10, buff=0.2)
        return g.move_to(centre)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-defi")
        self.titre_ecran("Défi", font_size=48)

        self.au_mot("Une classe a 30")
        el = self.eleves([-3.4, 1.3, 0])
        l30 = Text("30 élèves", font_size=32).next_to(el, DOWN, buff=0.3)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in el], lag_ratio=0.03), FadeIn(l30))

        x = 3.2
        self.au_mot("2 cinquièmes font")
        a = self.expr([(2, 5, ORANGE_RETENUE), (": espagnol", ORANGE_RETENUE)], font_size=34).move_to([x, 2.2, 0])
        self.play(FadeIn(a, shift=LEFT * 0.2))
        self.au_mot("1 tiers fait")
        b = self.expr([(1, 3, VIOLET_ACCENT), (": allemand", VIOLET_ACCENT)], font_size=34).move_to([x, 0.9, 0])
        self.play(FadeIn(b, shift=LEFT * 0.2))
        self.au_mot("Les autres font")
        c = Text("les autres : chinois", font_size=34, color=VERT_OK).move_to([x, -0.2, 0])
        self.play(FadeIn(c, shift=LEFT * 0.2))
        self.au_mot("Combien d'élèves")
        q = Text("Combien d'élèves font du chinois ?", font_size=40, color=JAUNE_TITRE).move_to([-0.6, -1.5, 0])
        self.play(Write(q))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=3.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-correction")
        self.titre_ecran("Correction")

        el = self.eleves([-4.0, 1.3, 0]).scale(0.85)
        self.add(el)
        x = 2.4
        self.au_mot("2 cinquièmes de 30")
        a = self.expr([(2, 5, ORANGE_RETENUE), "de 30 :", "30 ÷ 5 = 6"], font_size=32).move_to([x, 2.25, 0])
        self.play(FadeIn(a))
        self.au_mot("2 fois 6")
        a2 = Text("2 × 6 = 12 élèves en espagnol", font_size=32, color=ORANGE_RETENUE).move_to([x, 1.25, 0])
        self.play(Write(a2), *[d.animate.set_color(ORANGE_RETENUE) for d in el[:12]])

        self.au_mot("1 tiers de 30")
        b = self.expr([(1, 3, VIOLET_ACCENT), "de 30 :", "30 ÷ 3 = 10"], font_size=32).move_to([x, 0.15, 0])
        self.play(FadeIn(b))
        self.au_mot("10 élèves en allemand")
        b2 = Text("10 élèves en allemand", font_size=32, color=VIOLET_ACCENT).move_to([x, -0.85, 0])
        self.play(Write(b2), *[d.animate.set_color(VIOLET_ACCENT) for d in el[12:22]])

        self.au_mot("Il reste")
        r = Text("30 − 12 − 10 = 8", font_size=40, color=VERT_OK).move_to([-4.0, -0.6, 0])
        self.play(Write(r), *[d.animate.set_color(VERT_OK) for d in el[22:]])
        self.au_mot("8 élèves font du chinois")
        self.play(Write(self.chute("8 élèves font du chinois", color=VERT_OK, font_size=46)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_garde()
        self.ecran_objectifs()
        self.ecran_quantite_sens()
        self.ecran_quantite_methode()
        self.ecran_addition_meme()
        self.ecran_addition_sinon()
        self.ecran_piege()
        self.ecran_soustraction()
        self.ecran_multiplier()
        self.ecran_plus_que_un()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Une fraction d'un nombre : je divise, puis je multiplie",
                "Additionner : parts de même taille, j'ajoute le haut",
                "Multiplier par un entier : je multiplie le haut",
            ],
            rappel="Le bas ne bouge pas : on n'ajoute jamais les dénominateurs !",
        )
        self.page_abonnement()
