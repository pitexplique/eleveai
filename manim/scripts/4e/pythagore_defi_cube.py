# pythagore_defi_cube.py
# EleveAI — Maths 4e — Pythagore, le DÉFI : combien de triangles rectangles dans un cube ?
# (notionId : pythagore_theoreme, micro : pythagore_defi), AVEC VOIX. CEINTURE ORANGE.
#
# ⭐ « Fais-les dessiner rapidement » : 0,2 s par triangle (0,5 pour les 4 premiers).
# ⭐ Frédéric, 13/10/2026 : « tu dessines un cube avec ses lettres, puis tu dessines
# en rouge un triangle, puis l'autre, en effaçant les précédents, avec un compteur en
# bas, sans tous les nommer ; ne dis pas à haute voix tous les triangles ».
# Les comptes, vérifiés par le calcul : 56 triangles = 24 sur les faces (1, 1, 2)
# + 24 en biais (1, 2, 3) + 8 équilatéraux (2, 2, 2).
#
# Deux scènes : la paysage (la correction) et le short (la question seule, publié AVANT).
# Voix : manim/voix/4e-pythagore-defi-cube.json et 4e-pythagore-defi-cube-short.json.
# Rendu paysage : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_defi_cube.py DefiCube4e -o eleveai-maths-4e-pythagore-defi-cube --media_dir manim/scripts/4e/media
# Rendu short   : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_defi_cube.py DefiCubeShort4e -o eleveai-maths-4e-pythagore-defi-cube-short --media_dir manim/scripts/4e/media
# Puis copier les mp4 dans manim/sorties/4e/maths/pythagore/08-defi-cube/.

import sys
from itertools import combinations
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_reconnaitre import P, Notion4e  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import ceinture, echelle_ceintures  # noqa: E402

ROUGE_TRI = "#EF4444"
SOMMETS = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
           "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
ARETES = ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"]
CACHEES = {"CD", "DA", "DH"}  # les arêtes qui partent de D, le sommet du fond
FACES = ["ABCD", "EFGH", "ABFE", "BCGF", "CDHG", "DAEH"]


def d2(p, q):
    return sum((SOMMETS[p][i] - SOMMETS[q][i]) ** 2 for i in range(3))


def type_triangle(t):
    return tuple(sorted([d2(t[0], t[1]), d2(t[1], t[2]), d2(t[0], t[2])]))


def familles():
    """Les triangles des faces (rangés face par face), en biais (ABG d'abord), équilatéraux."""
    faces = []
    for f in FACES:
        for t in combinations(f, 3):
            faces.append("".join(t))
    tous = ["".join(t) for t in combinations("ABCDEFGH", 3)]
    biais = [t for t in tous if type_triangle(t) == (1, 2, 3)]
    biais.sort(key=lambda t: t != "ABG")
    equi = [t for t in tous if type_triangle(t) == (2, 2, 2)]
    assert len(faces) == 24 and len(biais) == 24 and len(equi) == 8
    return faces, biais, equi


class _Cube:
    """Le cube ABCDEFGH en perspective cavalière (fuyantes à 45°, coefficient 0,45)."""

    def pt(self, nom):
        x, y, z = SOMMETS[nom]
        return self.origine + self.arete * np.array([x + 0.45 * y * 0.71, z + 0.45 * y * 0.71, 0])

    def dessiner_cube(self, font_size=30):
        traits = VGroup()
        for a in ARETES:
            p, q = self.pt(a[0]), self.pt(a[1])
            if a in CACHEES or a[::-1] in CACHEES:
                traits.add(DashedLine(p, q, color=GRAY_B, stroke_width=3, dash_length=0.12))
            else:
                traits.add(Line(p, q, color=WHITE, stroke_width=4))
        centre = sum(self.pt(n) for n in SOMMETS) / 8
        lettres = VGroup()
        for n in SOMMETS:
            d = self.pt(n) - centre
            lettres.add(Text(n, font_size=font_size).move_to(self.pt(n) + d / np.linalg.norm(d) * 0.32))
        return traits, lettres

    def tri(self, t, couleur=ROUGE_TRI):
        return Polygon(*[self.pt(n) for n in t], color=couleur, stroke_width=6,
                       fill_color=couleur, fill_opacity=0.35)


class DefiCube4e(_Cube, Notion4e):
    nom_voix = "4e-pythagore-defi-cube"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def compteur(self, n, libelle="triangles rectangles", couleur=ROUGE_TRI, x=-3.6, taille=64):
        return VGroup(self.t(str(n), taille, couleur), self.t(libelle, 30, couleur)).arrange(RIGHT, buff=0.3) \
            .move_to(P(x, -3.25))

    def defiler(self, triangles, debut, duree, couleur=ROUGE_TRI, libelle="triangles rectangles", x=-3.6):
        """Chaque triangle remplace le précédent ; le compteur avance d'un cran."""
        for k, t in enumerate(triangles):
            nouveau = self.tri(t, couleur)
            anims = [FadeIn(nouveau),
                     Transform(self.cpt, self.compteur(debut + k, libelle, couleur, x=x, taille=(48 if x > 0 else 64)))]
            if self.courant is not None:
                anims.append(FadeOut(self.courant))
            self.play(*anims, run_time=duree)
            self.courant = nouveau

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le défi du cube", 60, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("combien de triangles")
        q1 = self.t("Combien de triangles rectangles", 40, BLEU_CALCUL)
        q2 = self.t("dans un cube ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.4))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.au_mot("Mets pause")
        self.play(FadeIn(self.t("Mets pause, et compte !", 34, ORANGE_RETENUE).move_to(P(0, -0.8))))
        self.play(FadeIn(echelle_ceintures("orange").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.5)

    # ── le déroulé sur UN même écran : le cube reste, les triangles défilent ─

    def construct(self):
        self.page_de_garde()

        self.clear()
        self.add_mascotte(scale=0.45)
        self.origine, self.arete = P(-6.0, -2.1), 3.0
        traits, lettres = self.dessiner_cube()
        faces, biais, equi = familles()
        self.courant = None
        self.cpt = self.compteur(0)
        xr = 2.9

        # 01 : le cube
        self.dire("01-cube")
        self.play(Create(traits), run_time=1.6)
        self.play(FadeIn(lettres))
        self.au_mot("On choisit trois")
        exemple = self.tri("ACH", BLEU_CALCUL)
        self.play(FadeIn(exemple))
        self.play(FadeOut(exemple))
        self.au_mot("Combien de ces triangles")
        q = self.t("Combien ont un angle droit ?", 34, BLEU_CALCUL).move_to(P(xr, 2.2))
        self.play(FadeIn(q))
        self.attendre_voix()

        # 02 : les faces
        self.dire("02-faces")
        self.play(FadeOut(q))
        panneau1 = VGroup(self.t("1. Sur les faces", 38, JAUNE_TITRE).move_to(P(xr, 2.2)))
        self.play(FadeIn(panneau1[0]), FadeIn(self.cpt))
        self.au_mot("deux arêtes et une diagonale")
        panneau1.add(self.t("2 arêtes + 1 diagonale de face", 28).move_to(P(xr, 1.5)))
        self.play(FadeIn(panneau1[1]))
        self.au_mot("Une face en contient 4")
        self.defiler(faces[:4], 1, 0.5)
        panneau1.add(self.t("4 par face", 30, ROUGE_TRI).move_to(P(xr, 0.8)))
        self.play(FadeIn(panneau1[2]))
        self.au_mot("Le cube a 6 faces")
        self.defiler(faces[4:], 5, 0.2)
        panneau1.add(self.t("6 × 4 = 24", 44, ROUGE_TRI).move_to(P(xr, 0.0)))
        self.play(FadeIn(panneau1[3]))
        self.attendre_voix()

        # 03 : en biais — le panneau des faces se range en une ligne de résumé
        self.dire("03-biais")
        resume1 = self.t("sur les faces : 24", 28, ROUGE_TRI).move_to(P(xr, 2.75))
        self.play(FadeOut(self.courant), ReplacementTransform(panneau1, resume1))
        self.courant = None
        panneau2 = VGroup(self.t("2. En biais", 38, JAUNE_TITRE).move_to(P(xr, 2.05)))
        self.play(FadeIn(panneau2[0]))
        self.au_mot("Une arête, une diagonale de face")
        panneau2.add(self.t("1 arête + 1 diagonale de face", 26).move_to(P(xr, 1.45)),
                     self.t("+ 1 grande diagonale", 26).move_to(P(xr, 1.0)))
        self.play(FadeIn(panneau2[1]), FadeIn(panneau2[2]))
        self.au_mot("Par exemple ABG")
        abg = self.tri("ABG")
        self.play(FadeIn(abg), Transform(self.cpt, self.compteur(25)))
        self.au_mot("perpendiculaire à toute la face")
        face = Polygon(*[self.pt(n) for n in "BCGF"], stroke_width=0, fill_color=BLEU_CALCUL, fill_opacity=0.25)
        ab = Line(self.pt("A"), self.pt("B"), color=BLEU_CALCUL, stroke_width=8)
        self.play(FadeIn(face), Create(ab))
        self.au_mot("l'angle en B est droit")
        rond = Circle(radius=0.3, color=BLEU_CALCUL, stroke_width=5).move_to(self.pt("B"))
        self.play(Create(rond), FadeIn(self.t("angle droit en B", 28, BLEU_CALCUL).move_to(P(xr, 0.3))))
        self.au_mot("La réciproque le confirme")
        verif = VGroup(self.t("AG² = 3", 32, ORANGE_RETENUE), self.t("AB² + BG² = 1 + 2 = 3", 32, BLEU_CALCUL))             .arrange(DOWN, buff=0.15).move_to(P(xr, -0.7))
        self.play(FadeIn(verif))
        self.au_mot("Il y en a 24")
        self.play(FadeOut(face), FadeOut(rond), FadeOut(ab))
        self.courant = abg
        self.defiler(biais[1:], 26, 0.2)
        self.attendre_voix()

        # 04 : le total — le panneau de droite se vide
        self.dire("04-total")
        a_effacer = [m for m in self.mobjects if isinstance(m, (Text, VGroup)) and m is not self.cpt
                     and m is not lettres and m is not traits and m.get_center()[0] > 0.5 and m.get_center()[1] > -2.8]
        self.play(FadeOut(self.courant), *[FadeOut(m) for m in a_effacer])
        self.courant = None
        bilan = VGroup(self.t("sur les faces : 24", 34, ROUGE_TRI), self.t("en biais : 24", 34, ROUGE_TRI),
                       self.t("24 + 24 = 48", 56, VERT_OK)).arrange(DOWN, buff=0.35).move_to(P(xr, 0.8))
        self.play(FadeIn(bilan[0]), FadeIn(bilan[1]))
        self.play(Write(bilan[2]), self.cpt.animate.scale(1.2))
        self.play(Circumscribe(bilan[2], color=VERT_OK))
        self.attendre_voix()

        # 05 : le piège, les équilatéraux — leur compteur à droite, l'autre reste à 48
        self.dire("05-piege")
        self.play(FadeOut(bilan[0]), FadeOut(bilan[1]), bilan[2].animate.scale(0.6).move_to(P(xr, 2.6)))
        self.au_mot("trois diagonales de faces")
        self.cpt_rect = self.cpt
        self.cpt = self.compteur(0, "équilatéraux", ORANGE_RETENUE, x=3.4, taille=48)
        self.play(FadeIn(self.cpt))
        self.defiler(equi, 1, 0.35, couleur=ORANGE_RETENUE, libelle="équilatéraux", x=3.4)
        self.au_mot("aucun angle droit")
        self.play(FadeIn(self.t("équilatéral : aucun angle droit", 30, ORANGE_RETENUE).move_to(P(xr, 1.4))))
        self.au_mot("En tout, 56")
        self.play(FadeOut(self.courant), Write(self.t("56 = 48 + 8", 52, JAUNE_TITRE).move_to(P(xr, 0.2))))
        self.attendre_voix()

        # 06 : la fin
        self.dire("06-fin")
        self.play(Write(self.chute("Tu en avais trouvé combien ? Dis-le en commentaire !", color=VERT_OK, font_size=30)))
        self.attendre_voix(marge=1.0)
        self.page_abonnement(voix="07-abonne")


class DefiCubeShort4e(_Cube, Short6e):
    nom_voix = "4e-pythagore-defi-cube-short"

    def construct(self):
        self.margo_bas()
        self.dire("00-accroche")
        titre = self.grand("Le défi du cube", font_size=44, color=JAUNE_TITRE).move_to(P(0, 2.85))
        badge = VGroup(ceinture("#F97316", 0.8).scale(0.7), self.grand("Ceinture orange", font_size=22))
        badge.arrange(RIGHT, buff=0.18).move_to(P(0, 2.3))
        q = self.grand("Combien de triangles rectangles ?", font_size=26, color=BLEU_CALCUL).move_to(P(0, 1.9))
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Combien")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ⭐ Frédéric, 13/10 : « dans le short, tableau en bas » (règle du short blanc :
        # l'image en haut, les maths qui se remplissent en bas, en même temps).
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.3)
        self.origine, self.arete = P(-0.9, -0.3), 1.5
        traits, lettres = self.dessiner_cube(font_size=22)
        # Le tableau : « triangle | angle droit ? », trois lignes vides.
        x0, x1, x2 = -1.5, 0.2, 1.7
        ys = [-1.0, -1.42, -1.84, -2.26]
        cadre = VGroup(*[Line(P(x0, y + 0.21), P(x2, y + 0.21), color=GRAY_B, stroke_width=2) for y in ys],
                       Line(P(x0, ys[-1] - 0.21), P(x2, ys[-1] - 0.21), color=GRAY_B, stroke_width=2),
                       Line(P(x0, ys[0] + 0.21), P(x0, ys[-1] - 0.21), color=GRAY_B, stroke_width=2),
                       Line(P(x1, ys[0] + 0.21), P(x1, ys[-1] - 0.21), color=GRAY_B, stroke_width=2),
                       Line(P(x2, ys[0] + 0.21), P(x2, ys[-1] - 0.21), color=GRAY_B, stroke_width=2))
        entete = VGroup(Text("triangle", font_size=16, color=JAUNE_TITRE).move_to(P((x0 + x1) / 2, ys[0])),
                        Text("angle droit ?", font_size=16, color=JAUNE_TITRE).move_to(P((x1 + x2) / 2, ys[0])))
        self.au_mot("Un cube")
        self.play(Create(traits), FadeIn(lettres), Create(cadre), FadeIn(entete), run_time=1.2)
        courant = None
        for k, (mot, t, verdict, coul) in enumerate([("Trois sommets", "ABC", "✓ oui", VERT_OK),
                                                     ("Celui-là aussi", "ABG", "✓ oui", VERT_OK),
                                                     ("Et celui-là", "ACF", "?", ORANGE_RETENUE)]):
            self.au_mot(mot)
            tri = self.tri(t)
            y = ys[k + 1]
            nom = Text(t, font_size=24, color=ROUGE_TRI).move_to(P((x0 + x1) / 2, y))
            rep = Text(verdict, font_size=24, color=coul).move_to(P((x1 + x2) / 2, y))
            anims = [FadeIn(tri), FadeIn(nom)]
            if courant is not None:
                anims.append(FadeOut(courant))
            self.play(*anims, run_time=0.5)
            self.play(FadeIn(rep, scale=1.4), run_time=0.4)
            courant = tri
        self.attendre_voix(marge=0.6)

        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.play(Write(self.grand("À toi !", font_size=52, color=JAUNE_TITRE).move_to(P(0, 2.8))))
        self.origine, self.arete = P(-0.75, -0.05), 1.3
        traits, lettres = self.dessiner_cube(font_size=20)
        self.add(traits, lettres)
        self.au_mot("Combien de triangles")
        self.play(FadeIn(self.grand("Combien de triangles", font_size=32, color=BLEU_CALCUL).move_to(P(0, -0.75))),
                  FadeIn(self.grand("rectangles dans un cube ?", font_size=32, color=BLEU_CALCUL).move_to(P(0, -1.2))))
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=34, color=VERT_OK),
                     self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        self.play(FadeIn(rep.move_to(P(0, -2.0))))
        self.attendre_voix(marge=1.5)
