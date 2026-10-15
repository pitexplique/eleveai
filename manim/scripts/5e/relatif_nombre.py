# relatif_nombre.py
# EleveAI — Maths 5e — Les nombres relatifs (notionId : relatif_nombre), AVEC VOIX.
# Mêmes exemples que la fiche lib/fiches/maths-5e-nombres-relatifs.tsx.
#
# ⭐ 08/10/2026 : la version MUETTE de juillet (jamais publiée) devient PARLÉE.
# Voix validée par Frédéric : manim/voix/5e-relatif-nombre.json (débit −8,
# entre la 6e à −10 et la 4e à −7).
# ⭐ L'accroche est LE piège de la fiche : −7 ou −4, lequel est le plus grand ?
# La version de juillet ne comparait qu'un négatif et un positif.
#
# Mapping micro-compétences (coach 5e, notion relatif_nombre) → écrans :
# - relatif_lire, relatif_signe → 01-signe (le zéro, les deux côtés, −3)
# - relatif_placer              → 02-placer (A d'abscisse −3)
# - relatif_comparer            → 03-comparer (+6 > −1, puis −4 > −7)
# - relatif_oppose              → 04-oppose (−7 et +7)
# - relatif_valeur_absolue      → 05-distance (la distance à 0 de −5 et de +5)
# - relatif_defi                → 06-defi + correction (−2, +5, −3 → 0)
#
# ⛔ Pas de LaTeX sur ce poste : droite tracée à la main, « − » typographique.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/relatif_nombre.py RelatifNombre5e -o eleveai-maths-5e-relatif-nombre --media_dir manim/scripts/5e/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Lire un nombre relatif",
    "Le placer sur une droite graduée",
    "Comparer deux nombres relatifs",
    "Trouver son opposé et sa distance à zéro",
]


def ecrit(v):
    """−3, 0, 3 : le moins typographique, jamais le tiret."""
    return f"−{-v}" if v < 0 else str(v)


def signe(v):
    """+6 / −7 : le signe écrit, pour les nombres que la voix dit « plus 6 »."""
    return f"+{v}" if v > 0 else ecrit(v)


class Notion5e(Notion6e):
    """Le gabarit parlé de la 6e, étiqueté 5e."""

    identite = "Maths 5e — EleveAI"


class RelatifNombre5e(Notion5e):
    nom_voix = "5e-relatif-nombre"

    # ── les dessins ─────────────────────────────────────────────────────────

    def droite_rel(self, vmin, vmax, y=0.0, longueur=10.0, x=-0.3, font_size=26):
        """La droite des relatifs : négatifs en rouge, 0 en jaune, positifs en vert."""
        valeurs = list(range(vmin, vmax + 1))
        groupe, pt = self.droite(vmin, vmax, vmax - vmin, {v: ecrit(v) for v in valeurs},
                                 longueur=longueur, centre=(x, y), font_size=font_size)
        for v, lbl in zip(valeurs, groupe[2]):
            lbl.set_color(ROUGE_ERREUR if v < 0 else (JAUNE_TITRE if v == 0 else VERT_OK))
        groupe[0].add_tip(tip_length=0.22)
        return groupe, pt

    def montrer_droite(self, groupe):
        self.play(Create(groupe[0]), Create(groupe[1]))
        self.play(LaggedStart(*[FadeIn(l) for l in groupe[2]], lag_ratio=0.04), run_time=0.8)

    def pastille(self, pt, v, texte, color, haut=True, font_size=30):
        return self.point(pt, v, texte, color=color, font_size=font_size, haut=haut)

    def mesure(self, pt, a, b, y, texte, color=BLEU_CALCUL, font_size=26):
        """Une double flèche de a à b, à la hauteur y, avec son nombre dessous."""
        p, q = pt(a), pt(b)
        f = DoubleArrow([p[0], y, 0], [q[0], y, 0], buff=0.04, color=color,
                        stroke_width=3, tip_length=0.18)
        t = Text(texte, font_size=font_size, color=color).move_to([(p[0] + q[0]) / 2, y - 0.38, 0])
        return VGroup(f, t)

    def congelateur(self, temp, x, couleur):
        corps = RoundedRectangle(width=2.2, height=2.2, corner_radius=0.15,
                                 stroke_color=WHITE, stroke_width=3,
                                 fill_color="#1E3A5F", fill_opacity=0.9)
        porte = Line([-0.95, 0.15, 0], [0.95, 0.15, 0], stroke_width=2, color=WHITE)
        poignee = Line([0.75, -0.2, 0], [0.75, -0.7, 0], stroke_width=4, color=GRAY_B)
        t = Text(temp, font_size=34, color=couleur).move_to(corps.get_top() + DOWN * 0.55)
        return VGroup(corps, porte, poignee, t).move_to([x, -1.3, 0])

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1,
                    stroke_width=5, color=color)

    # ── 00 : la page de garde, PARLÉE ───────────────────────────────────────

    def page_de_garde(self, titre, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)

        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = Text(self.identite, font_size=28, color=WHITE).next_to(t, DOWN, buff=0.25)
        q = Text("−7 ou −4 : lequel est le plus grand ?", font_size=36, color=BLEU_CALCUL)
        q.next_to(identite, DOWN, buff=0.45)
        # ⭐ La question est à l'écran DÈS la première seconde : c'est l'image
        # que YouTube prélève.
        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2), FadeIn(q))

        self.au_mot("sauf à savoir")
        l1 = Text("Les maths, ça sert à rien… sauf à savoir où il fait le plus froid.",
                  font_size=26, color=WHITE).next_to(q, DOWN, buff=0.35)
        self.play(FadeIn(l1, shift=UP * 0.15))

        self.au_mot("Dans un congélateur")
        c1 = self.congelateur("−7 °C", -3.6, ROUGE_ERREUR)
        self.play(FadeIn(c1, shift=UP * 0.2))
        self.au_mot("Dans l'autre")
        c2 = self.congelateur("−4 °C", -0.6, ROUGE_ERREUR)
        self.play(FadeIn(c2, shift=UP * 0.2))

        self.au_mot("Lequel est le plus grand")
        self.play(Indicate(q, color=BLEU_CALCUL))

        self.au_mot("Beaucoup répondent")
        rep = Text("−7 ?", font_size=48, color=ORANGE_RETENUE).move_to([2.7, -0.9, 0])
        self.play(Write(rep))
        self.au_mot("Et c'est faux")
        faux = Text("Faux !", font_size=40, color=ROUGE_ERREUR).next_to(rep, DOWN, buff=0.3)
        self.play(Create(self.barrer(rep)), Write(faux))
        self.attendre_voix()

    # ── 01 : un signe et un côté ────────────────────────────────────────────

    def ecran_signe(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-signe")
        self.titre_ecran("1. Un signe et un côté")

        d, pt = self.droite_rel(-5, 5, y=0.3)
        self.montrer_droite(d)

        self.au_mot("Au milieu, le zéro")
        zero = SurroundingRectangle(d[2][5], color=JAUNE_TITRE, buff=0.1)
        zt = Text("0 : ni positif, ni négatif", font_size=28, color=JAUNE_TITRE).move_to([-0.3, -1.0, 0])
        self.play(Create(zero), Write(zt))

        self.au_mot("À droite du zéro")
        fd = Arrow(pt(0.4) + UP * 1.0, pt(5) + UP * 1.0, buff=0, color=VERT_OK)
        td = Text("positifs : signe +", font_size=28, color=VERT_OK).next_to(fd, UP, buff=0.12)
        self.play(GrowArrow(fd), Write(td))

        self.au_mot("À gauche, les nombres")
        fg = Arrow(pt(-0.4) + UP * 1.0, pt(-5) + UP * 1.0, buff=0, color=ROUGE_ERREUR)
        tg = Text("négatifs : signe −", font_size=28, color=ROUGE_ERREUR).next_to(fg, UP, buff=0.12)
        self.play(GrowArrow(fg), Write(tg))

        self.au_mot("Trois degrés en dessous")
        self.play(FadeOut(zero), FadeOut(zt))
        dot = Dot(pt(-3), color=ROUGE_ERREUR, radius=0.13)
        lire = Text("3 degrés en dessous de 0  →  −3", font_size=32, color=WHITE).move_to([-0.3, -1.1, 0])
        self.play(FadeIn(dot, scale=0.4), Write(lire))
        self.play(Flash(dot, color=ROUGE_ERREUR), Indicate(d[2][2], color=ROUGE_ERREUR))

        self.au_mot("Un nombre relatif, c'est donc")
        self.play(Write(self.chute("Un nombre relatif = un signe + une distance à zéro", color=BLEU_CALCUL)))
        self.attendre_voix()

    # ── 02 : placer un point ────────────────────────────────────────────────

    def ecran_placer(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-placer")
        self.titre_ecran("2. Placer un point")

        consigne = Text("Place le point A d'abscisse −3", font_size=32, color=WHITE).move_to([-0.3, 2.1, 0])
        self.play(Write(consigne))
        d, pt = self.droite_rel(-5, 5, y=0.2)
        self.montrer_droite(d)

        self.au_mot("Je pars de zéro")
        curseur = Dot(pt(0), color=JAUNE_TITRE, radius=0.13)
        self.play(FadeIn(curseur, scale=0.4), Flash(curseur, color=JAUNE_TITRE))

        self.au_mot("Le signe moins")
        e1 = Text("le signe −  →  à gauche", font_size=30, color=ROUGE_ERREUR).move_to([-0.3, -1.0, 0])
        self.play(Write(e1))

        self.au_mot("Le 3 me dit")
        e2 = Text("le 3  →  3 graduations", font_size=30, color=ORANGE_RETENUE).move_to([-0.3, -1.65, 0])
        self.play(Write(e2))

        self.au_mot("Un, deux, trois")
        sauts = VGroup()
        for k in range(1, 4):
            arc = ArcBetweenPoints(pt(-(k - 1)) + UP * 0.25, pt(-k) + UP * 0.25, angle=-PI / 2,
                                   color=ORANGE_RETENUE, stroke_width=3)
            n = Text(str(k), font_size=26, color=ORANGE_RETENUE).move_to(arc.get_top() + UP * 0.25)
            self.play(Create(arc), FadeIn(n), curseur.animate.move_to(pt(-k)), run_time=0.45)
            sauts.add(arc, n)

        self.au_mot("Voilà le point A")
        a = Text("A", font_size=38, color=BLEU_CALCUL).move_to(pt(-3) + UP * 0.5 + LEFT * 0.35)
        self.play(curseur.animate.set_color(BLEU_CALCUL), Write(a))
        self.play(Write(self.chute("A est à l'abscisse −3", color=BLEU_CALCUL, font_size=32)))
        self.attendre_voix()

    # ── 03 : comparer ───────────────────────────────────────────────────────

    def ecran_comparer(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-comparer")
        self.titre_ecran("3. Comparer")

        regle = Text("Le plus à droite est le plus grand", font_size=32, color=BLEU_CALCUL).move_to([-0.3, 2.3, 0])
        self.play(Write(regle))
        d, pt = self.droite_rel(-8, 7, y=0.45, longueur=10.6, font_size=24)
        self.montrer_droite(d)
        fleche = Arrow(pt(-8) + UP * 1.15, pt(7) + UP * 1.15, buff=0, color=BLEU_CALCUL, stroke_width=3)
        self.play(GrowArrow(fleche))

        # −1 et +6
        self.au_mot("Moins 1 et plus 6")
        p1 = self.pastille(pt, -1, "−1", ROUGE_ERREUR, haut=False)
        p2 = self.pastille(pt, 6, "+6", VERT_OK, haut=False)
        for p in (p1, p2):
            p[1].shift(DOWN * 0.45)
        self.play(FadeIn(p1, scale=0.4), FadeIn(p2, scale=0.4))
        self.au_mot("donc plus 6 est plus grand")
        r1 = Text("+6 > −1", font_size=40, color=VERT_OK).move_to([-2.6, -1.6, 0])
        self.play(Write(r1), Circumscribe(p2, color=VERT_OK))
        self.au_mot("Un positif est toujours")
        r2 = Text("positif > négatif", font_size=30, color=WHITE).move_to([2.0, -1.6, 0])
        self.play(Write(r2))

        # −7 et −4 : les congélateurs
        self.au_mot("nos congélateurs")
        self.play(FadeOut(p1), FadeOut(p2), FadeOut(r1), FadeOut(r2))
        q7 = self.pastille(pt, -7, "−7 °C", ROUGE_ERREUR, haut=False)
        q4 = self.pastille(pt, -4, "−4 °C", ROUGE_ERREUR, haut=False)
        for p in (q7, q4):
            p[1].shift(DOWN * 0.45)
        self.play(FadeIn(q7, scale=0.4), FadeIn(q4, scale=0.4))

        self.au_mot("Moins 4 est à droite")
        f = Arrow(pt(-7) + DOWN * 1.45, pt(-4) + DOWN * 1.45, buff=0.05, color=VERT_OK)
        self.play(GrowArrow(f))
        self.au_mot("Donc moins 4 est plus grand")
        r3 = Text("−4 > −7", font_size=44, color=VERT_OK).move_to([2.4, -1.4, 0])
        self.play(Write(r3), Circumscribe(q4, color=VERT_OK))
        self.au_mot("Le congélateur le plus froid")
        r4 = Text("le plus froid : −7 °C", font_size=28, color=BLEU_CALCUL).next_to(r3, DOWN, buff=0.3)
        self.play(Write(r4), Indicate(q7, color=BLEU_CALCUL))

        self.au_mot("Le piège")
        piege = Text("7 > 4   mais   −7 < −4", font_size=34, color=ORANGE_RETENUE).move_to([-0.6, -3.0, 0])
        cadre = SurroundingRectangle(piege, color=ORANGE_RETENUE, buff=0.18, stroke_width=2)
        self.play(FadeOut(f), Write(piege), Create(cadre))

        self.au_mot("Chez les négatifs")
        loin = self.mesure(pt, -7, 0, 1.75, "loin de 0 : plus petit", color=ORANGE_RETENUE, font_size=22)
        self.play(FadeOut(regle), FadeOut(fleche))
        self.play(GrowFromCenter(loin[0]), FadeIn(loin[1]))
        self.attendre_voix()

    # ── 04 : l'opposé ───────────────────────────────────────────────────────

    def ecran_oppose(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-oppose")
        self.titre_ecran("4. L'opposé")

        defi = Text("Le même nombre, de l'autre côté du zéro", font_size=30, color=BLEU_CALCUL).move_to([-0.3, 2.2, 0])
        self.play(Write(defi))
        d, pt = self.droite_rel(-8, 8, y=0.5, longueur=10.6, font_size=22)
        self.montrer_droite(d)

        self.au_mot("Moins 7 est à 7")
        pn = self.pastille(pt, -7, "−7", ROUGE_ERREUR)
        self.play(FadeIn(pn, scale=0.4))
        mg = self.mesure(pt, -7, 0, -0.55, "7 graduations", color=WHITE)
        self.play(GrowFromCenter(mg[0]), Write(mg[1]))

        self.au_mot("Je fais la même distance")
        md = self.mesure(pt, 0, 7, -0.55, "7 graduations", color=WHITE)
        self.play(GrowFromCenter(md[0]), Write(md[1]))
        self.au_mot("j'arrive à plus 7")
        pp = self.pastille(pt, 7, "+7", VERT_OK)
        self.play(TransformFromCopy(pn, pp))

        self.au_mot("L'opposé de moins 7")
        r1 = Text("L'opposé de −7, c'est +7", font_size=34, color=VERT_OK).move_to([-0.6, -1.85, 0])
        self.play(Write(r1))
        self.au_mot("Et l'opposé de plus 7")
        r2 = Text("L'opposé de +7, c'est −7", font_size=34, color=ROUGE_ERREUR).move_to([-0.6, -2.65, 0])
        self.play(Write(r2))
        self.attendre_voix()

    # ── 05 : la distance à zéro ─────────────────────────────────────────────

    def ecran_distance(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-distance")
        self.titre_ecran("5. La distance à zéro")

        d, pt = self.droite_rel(-6, 6, y=0.9)
        self.montrer_droite(d)

        self.au_mot("De moins 5 à zéro")
        pn = self.pastille(pt, -5, "−5", ROUGE_ERREUR)
        m1 = self.mesure(pt, -5, 0, -0.1, "5 graduations")
        self.play(FadeIn(pn, scale=0.4))
        self.play(GrowFromCenter(m1[0]), Write(m1[1]))

        self.au_mot("La distance à zéro de moins 5")
        r1 = Text("distance à zéro de −5 : 5", font_size=32, color=BLEU_CALCUL).move_to([-0.6, -1.3, 0])
        self.play(Write(r1))

        self.au_mot("Et celle de plus 5")
        pp = self.pastille(pt, 5, "+5", VERT_OK)
        m2 = self.mesure(pt, 0, 5, -0.1, "5 graduations")
        self.play(FadeIn(pp, scale=0.4), GrowFromCenter(m2[0]), Write(m2[1]))
        r2 = Text("distance à zéro de +5 : 5", font_size=32, color=BLEU_CALCUL).move_to([-0.6, -1.95, 0])
        self.play(Write(r2))

        self.au_mot("valeur absolue")
        va = Text("= la valeur absolue", font_size=30, color=JAUNE_TITRE).move_to([-0.6, 2.25, 0])
        self.play(Write(va))

        self.au_mot("Une distance n'a pas de signe")
        self.play(Write(self.chute("Une distance n'a pas de signe : toujours positive", color=VERT_OK)))
        self.attendre_voix()

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        titre = Text("À toi de jouer", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        self.au_mot("Au sommet")
        q1 = Text("Au sommet d'une montagne, il fait −2 °C.", font_size=32).move_to([-0.3, 1.7, 0])
        self.play(Write(q1))
        self.au_mot("La température monte")
        q2 = Text("La température monte de 5 °C,", font_size=32, color=VERT_OK).move_to([-0.3, 0.95, 0])
        self.play(Write(q2))
        self.au_mot("puis redescend")
        q3 = Text("puis redescend de 3 °C.", font_size=32, color=ORANGE_RETENUE).move_to([-0.3, 0.3, 0])
        self.play(Write(q3))
        self.au_mot("Quelle est la température")
        q4 = Text("Quelle est la température finale ?", font_size=34, color=BLEU_CALCUL).move_to([-0.3, -0.6, 0])
        self.play(Write(q4))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 06b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")

        d, pt = self.droite_rel(-4, 6, y=1.0)
        self.montrer_droite(d)

        self.au_mot("On part de moins 2")
        cur = Dot(pt(-2), color=BLEU_CALCUL, radius=0.14)
        e0 = Text("départ : −2 °C", font_size=30, color=WHITE).move_to([-0.6, -0.75, 0])
        self.play(FadeIn(cur, scale=0.4), Write(e0))

        self.au_mot("On monte de 5")
        f1 = CurvedArrow(pt(-2) + UP * 0.3, pt(3) + UP * 0.3, angle=-PI / 3, color=VERT_OK)
        e1 = Text("+5 graduations vers la droite  →  +3", font_size=30, color=VERT_OK).move_to([-0.6, -1.4, 0])
        self.play(Create(f1), cur.animate.move_to(pt(3)), Write(e1), run_time=1.4)

        self.au_mot("On redescend de 3")
        f2 = CurvedArrow(pt(3) + DOWN * 0.85, pt(0) + DOWN * 0.85, angle=-PI / 3, color=ORANGE_RETENUE)
        e2 = Text("3 graduations vers la gauche  →  0", font_size=30, color=ORANGE_RETENUE).move_to([-0.6, -2.05, 0])
        self.play(Create(f2), cur.animate.move_to(pt(0)).set_color(JAUNE_TITRE), Write(e2), run_time=1.4)

        self.au_mot("La température finale")
        self.play(Write(self.chute("Température finale : 0 °C", color=VERT_OK, font_size=36)),
                  Flash(cur, color=JAUNE_TITRE))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(titre="Les nombres relatifs")
        self.page_objectifs(OBJECTIFS)
        self.ecran_signe()
        self.ecran_placer()
        self.ecran_comparer()
        self.ecran_oppose()
        self.ecran_distance()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Un relatif : un signe et une distance à zéro",
                "Le plus à droite est le plus grand : −4 > −7",
                "L'opposé : même distance, de l'autre côté du zéro",
            ],
            rappel="Piège : 7 > 4, mais −7 < −4.",
            voix="07-finale",
        )
        self.page_abonnement(voix="08-abonne")
