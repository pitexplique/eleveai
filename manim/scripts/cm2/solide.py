# solide.py
# EleveAI — Maths CM2 — Les solides (notionId : solide)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-solides.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. VARIÉTÉ
# D'ANIMATIONS (plan → espace, faces/arêtes/sommets qui s'allument, la galerie
# de solides, le patron qui se plie, l'assemblage à compter) + légendes distribuées.
#
# Mapping micro-compétences (banque solides.bank.ts) → écrans :
# - solide_reconnaitre       → écran 1 (plan vs espace : le carré devient un cube)
# - solide_face              → écran 2 (face / arête / sommet qui s'allument)
# - solide_sommet_arete_face → écran 3 (la galerie : cube, pavé, cylindre, cône, boule, pyramide)
#                            + écran 4 (compter : 6 faces, 8 sommets, 12 arêtes)
# - solide_patron            → écran 5 (le patron du cube : 6 carrés)
# - solide_defi              → défi (compter les cubes d'un assemblage) + correction (4 + 2 = 6)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/solide.py SolideCM2 -o eleveai-maths-cm2-solide --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat

TOP = "#7DC4F5"        # face du dessus (bleu clair)
SIDE = "#1E4682"       # face de côté (bleu foncé)
NAVY_STROKE = "#072A4A"  # contour des solides


def cube(center, s=1.6, dp=0.66, face=BLEU_CALCUL):
    """Un cube en perspective : face avant + dessus + côté droit."""
    c = np.array([center[0], center[1], 0])
    ftl = c + [-s / 2, s / 2, 0]
    ftr = c + [s / 2, s / 2, 0]
    fbr = c + [s / 2, -s / 2, 0]
    fbl = c + [-s / 2, -s / 2, 0]
    off = np.array([dp, dp, 0])
    btl, btr, bbr = ftl + off, ftr + off, fbr + off
    top = Polygon(ftl, ftr, btr, btl, color=NAVY_STROKE, fill_color=TOP, fill_opacity=1, stroke_width=3)
    right = Polygon(ftr, fbr, bbr, btr, color=NAVY_STROKE, fill_color=SIDE, fill_opacity=1, stroke_width=3)
    front = Polygon(ftl, ftr, fbr, fbl, color=NAVY_STROKE, fill_color=face, fill_opacity=1, stroke_width=3)
    grp = VGroup(top, right, front)
    grp.sommets = [ftl, ftr, fbr, fbl, btl, btr, bbr]  # 7 visibles (le 8e est caché)
    grp.front = front
    grp.pts = dict(ftl=ftl, ftr=ftr, fbr=fbr, fbl=fbl, btl=btl, btr=btr, bbr=bbr)
    return grp


class SolideCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les solides", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        c = cube([-2.4, -0.6, 0], s=1.7)
        accroche = Text("Un objet de l'espace : un dé, une boîte, un ballon.", font_size=30, color=BLEU_CALCUL)
        accroche.move_to([1.4, 0.2, 0])
        astuce = Text("On le reconnaît, on compte ses faces, arêtes et sommets.", font_size=26, color=VERT_OK)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous, shift=0.3 * DOWN))
        self.play(GrowFromCenter(c))
        self.play(FadeIn(accroche, shift=0.2 * DOWN))
        self.play(FadeIn(astuce, scale=1.1))
        self.wait(2.2)

    # ── écran 1 : du plan à l'espace ────────────────────────────────────────

    def ecran_reconnaitre(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Une figure de l'espace")

        # un carré plat (le plan) → il « prend de l'épaisseur » et devient un cube.
        carre = Square(2.0, color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3).move_to([-3.0, -0.4, 0])
        lab_plan = Text("une figure plane", font_size=26, color=WHITE).next_to(carre, DOWN, buff=0.3)
        self.play(FadeIn(carre), FadeIn(lab_plan))
        self.wait(0.6)

        fleche = Arrow([-1.5, -0.4, 0], [0.2, -0.4, 0], color=ORANGE_RETENUE, buff=0.1)
        depais = Text("elle prend de l'épaisseur", font_size=24, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.2)
        self.play(GrowArrow(fleche), FadeIn(depais))

        c = cube([2.2, -0.4, 0], s=2.0)
        lab_solide = Text("un solide (en 3D)", font_size=26, color=VERT_OK).next_to(c, DOWN, buff=0.35)
        self.play(GrowFromCenter(c))
        self.play(Write(lab_solide))

        note = Text("Un solide a 3 dimensions : il occupe de la place dans l'espace.",
                    font_size=25, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.0)

    # ── écran 2 : face, arête, sommet ───────────────────────────────────────

    def ecran_vocabulaire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Face, arête, sommet")

        c = cube([-1.6, -0.2, 0], s=2.4, dp=1.0)
        self.play(GrowFromCenter(c))
        p = c.pts

        # la face avant s'allume
        face = c.front.copy().set_fill(VERT_OK, opacity=0.6).set_stroke(VERT_OK, width=6)
        lab_face = Text("une FACE : une surface", font_size=28, color=VERT_OK).move_to([3.2, 1.4, 0])
        self.play(FadeIn(face), FadeIn(lab_face))
        self.wait(0.6)
        self.play(FadeOut(face))

        # une arête s'allume
        arete = Line(p["ftr"], p["btr"], color=ORANGE_RETENUE, stroke_width=9)
        lab_arete = Text("une ARÊTE : un segment", font_size=28, color=ORANGE_RETENUE).move_to([3.2, 0.2, 0])
        self.play(Create(arete), FadeIn(lab_arete))
        self.wait(0.6)

        # un sommet s'allume
        sommet = Dot(p["ftr"], radius=0.12, color=JAUNE_TITRE)
        lab_sommet = Text("un SOMMET : un coin", font_size=28, color=JAUNE_TITRE).move_to([3.2, -1.0, 0])
        self.play(GrowFromCenter(sommet), FadeIn(lab_sommet), Flash(p["ftr"], color=JAUNE_TITRE))
        self.wait(2.2)

    # ── écran 3 : la galerie de solides ─────────────────────────────────────

    def petit_solide(self, mob, nom, couleur, pos):
        mob.move_to(pos)
        t = Text(nom, font_size=24, color=couleur).next_to(mob, DOWN, buff=0.2)
        return VGroup(mob, t)

    def ecran_galerie(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.titre_ecran("3. Les solides à connaître")

        # rangée du haut : les polyèdres (faces planes)
        cub = cube([-4.4, 1.0, 0], s=1.0, dp=0.4)
        pave = cube([-1.5, 1.0, 0], s=1.0, dp=0.4)
        pave.stretch(1.5, 0)  # étiré en largeur = un pavé droit
        # pyramide (base + sommet)
        py_c = np.array([1.6, 0.55, 0])
        pyramide = VGroup(
            Polygon(py_c + [-0.7, 0, 0], py_c + [0.7, 0, 0], py_c + [0.2, 0.25, 0], py_c + [-1.2, 0.25, 0],
                    color=NAVY_STROKE, fill_color=SIDE, fill_opacity=1, stroke_width=3),
            Polygon(py_c + [-0.7, 0, 0], py_c + [0.7, 0, 0], py_c + [-0.1, 1.3, 0],
                    color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3),
        )

        g1 = self.petit_solide(cub, "cube", VERT_OK, [-4.4, 1.0, 0])
        g2 = self.petit_solide(pave, "pavé droit", VERT_OK, [-1.6, 1.0, 0])
        g3 = self.petit_solide(pyramide, "pyramide", VERT_OK, [1.5, 1.0, 0])
        polyedres = Text("polyèdres : toutes les faces sont planes", font_size=24, color=VERT_OK).move_to([-1.2, -0.55, 0])

        self.play(LaggedStart(FadeIn(g1), FadeIn(g2), FadeIn(g3), lag_ratio=0.3))
        self.play(FadeIn(polyedres, shift=0.2 * DOWN))
        self.wait(0.6)

        # rangée du bas : les solides ronds (surface courbe)
        cylindre = VGroup(
            Ellipse(width=1.0, height=0.3, color=NAVY_STROKE, fill_color=TOP, fill_opacity=1, stroke_width=3).move_to([-4.4, -1.35, 0]),
            Rectangle(width=1.0, height=1.0, color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3).move_to([-4.4, -1.85, 0]),
            Ellipse(width=1.0, height=0.3, color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3).move_to([-4.4, -2.35, 0]),
        )
        cone = VGroup(
            Polygon([-1.6, -1.15, 0], [-2.1, -2.35, 0], [-1.1, -2.35, 0], color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3),
            Ellipse(width=1.0, height=0.28, color=NAVY_STROKE, fill_color=TOP, fill_opacity=1, stroke_width=3).move_to([-1.6, -2.35, 0]),
        )
        boule = VGroup(
            Circle(radius=0.55, color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3).move_to([1.5, -1.85, 0]),
            Arc(radius=0.45, start_angle=-0.7, angle=1.4, arc_center=[1.5, -1.85, 0], color=TOP, stroke_width=3),
        )
        h1 = self.petit_solide(cylindre, "cylindre", BLEU_CALCUL, [-4.4, -1.85, 0])
        h2 = self.petit_solide(cone, "cône", BLEU_CALCUL, [-1.6, -1.75, 0])
        h3 = self.petit_solide(boule, "boule", BLEU_CALCUL, [1.5, -1.85, 0])
        ronds = Text("ronds : une surface courbe", font_size=24, color=BLEU_CALCUL).to_edge(DOWN, buff=0.3)

        self.play(LaggedStart(FadeIn(h1), FadeIn(h2), FadeIn(h3), lag_ratio=0.3))
        self.play(FadeIn(ronds, shift=0.2 * DOWN))
        self.wait(2.4)

    # ── écran 4 : compter (6, 8, 12) ────────────────────────────────────────

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Compter sur un cube")

        c = cube([-2.6, -0.2, 0], s=2.6, dp=1.1)
        self.play(GrowFromCenter(c))

        lignes = VGroup(
            Text("6 faces (les surfaces)", font_size=30, color=VERT_OK),
            Text("8 sommets (les coins)", font_size=30, color=JAUNE_TITRE),
            Text("12 arêtes (les segments)", font_size=30, color=ORANGE_RETENUE),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to([3.0, 0.0, 0])

        # les 7 sommets visibles clignotent pendant qu'on annonce « 8 »
        dots = VGroup(*[Dot(s, radius=0.09, color=JAUNE_TITRE) for s in c.sommets])
        self.play(FadeIn(lignes[0]))
        self.play(LaggedStart(*[GrowFromCenter(dpt) for dpt in dots], lag_ratio=0.15), FadeIn(lignes[1]))
        self.play(FadeIn(lignes[2]))

        note = Text("Le pavé droit, c'est pareil : 6 faces, 8 sommets, 12 arêtes.",
                    font_size=25, color=WHITE).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.4)

    # ── écran 5 : le patron ─────────────────────────────────────────────────

    def ecran_patron(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Le patron du cube")

        # 6 carrés en croix (à plat)
        u = 0.85
        base = np.array([-2.6, -0.2, 0])
        coords = [(1, 0), (1, 1), (0, 1), (2, 1), (3, 1), (1, 2)]  # (col, ligne)
        carres = VGroup()
        for (cx, cy) in coords:
            carres.add(Square(u, color=NAVY_STROKE, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=3)
                       .move_to(base + [cx * u, cy * u, 0]))
        self.play(LaggedStart(*[GrowFromCenter(cr) for cr in carres], lag_ratio=0.15))

        compte = Text("6 carrés", font_size=32, color=ORANGE_RETENUE).next_to(carres, DOWN, buff=0.4)
        self.play(FadeIn(compte))
        self.wait(0.5)

        fleche = Arrow([1.4, 0.0, 0], [2.6, 0.0, 0], color=ORANGE_RETENUE, buff=0.1)
        plier = Text("on plie", font_size=24, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.15)
        c = cube([4.2, 0.0, 0], s=1.6)
        self.play(GrowArrow(fleche), FadeIn(plier))
        self.play(GrowFromCenter(c))

        note = Text("Un patron, c'est le solide « à plat » : plié, il redonne le cube.",
                    font_size=25, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(FadeIn(note))
        self.wait(2.2)

    # ── écran 6 : défi (compter les cubes) ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        # Un vrai empilement en perspective : empreinte 2 × 2 au sol (4 cubes)
        # + 2 cubes posés sur la rangée avant = 6. (gx : gauche/droite,
        # gy : profondeur, gz : hauteur.) On dessine du fond vers l'avant.
        base = np.array([-0.6, -1.2, 0])
        ux, prof, haut = 1.05, np.array([0.45, 0.35, 0]), np.array([0, 1.05, 0])
        cellules = [
            (0, 1, 0), (1, 1, 0),           # rangée arrière, au sol
            (0, 0, 0), (1, 0, 0),           # rangée avant, au sol
            (0, 0, 1), (1, 0, 1),           # 2 cubes posés devant
        ]
        pile = VGroup()
        for (gx, gy, gz) in cellules:
            centre = base + [gx * ux, 0, 0] + gy * prof + gz * haut
            pile.add(cube(centre, s=1.0, dp=0.42))
        self.play(LaggedStart(*[GrowFromCenter(k) for k in pile], lag_ratio=0.2))

        q = Text("Combien de petits cubes en tout ?", font_size=32, color=BLEU_CALCUL).move_to([0, -2.3, 0])
        pause = Text("Mets pause et compte !", font_size=28, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.3)
        self.play(Write(q))
        self.play(FadeIn(pause, scale=1.15))
        self.wait(4.0)

    # ── écran 7 : correction ────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = Text("Au sol : un carré de 2 × 2 = 4 cubes.", font_size=32, color=WHITE).move_to([0, 1.2, 0])
        e2 = Text("Posés dessus : 2 cubes.", font_size=32, color=BLEU_CALCUL).move_to([0, 0.3, 0])
        e3 = Text("4 + 2 = 6 cubes", font_size=40, color=ORANGE_RETENUE).move_to([0, -0.7, 0])
        self.play(Write(e1))
        self.play(Write(e2))
        self.play(GrowFromCenter(e3))
        self.wait(0.5)

        conclusion = Text("N'oublie jamais les cubes cachés derrière !", font_size=32, color=VERT_OK).to_edge(DOWN, buff=0.8)
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 8 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Un solide est un objet de l'espace (3 dimensions).", font_size=27),
            Text("2. Face = une surface, arête = un segment, sommet = un coin.", font_size=27),
            Text("3. Cube et pavé droit : 6 faces, 8 sommets, 12 arêtes.", font_size=27),
            Text("4. Cylindre, cône, boule : surface courbe (pas des polyèdres).", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.42).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_reconnaitre()
        self.ecran_vocabulaire()
        self.ecran_galerie()
        self.ecran_compter()
        self.ecran_patron()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! Les solides. Un solide, c'est un objet de l'espace :
#                      un dé, une boîte, un ballon. »
# [Écran 1 ~0:14]    « Une figure plane est plate sur la feuille. Un solide, lui,
#                      prend de l'épaisseur : il a trois dimensions, il occupe de
#                      la place. »
# [Écran 2 ~0:32]    « Sur un cube, trois mots. La face, une surface. L'arête, le
#                      segment où deux faces se touchent. Le sommet, un coin. »
# [Écran 3 ~0:52]    « Les vedettes. En haut, les polyèdres, toutes leurs faces sont
#                      planes : cube, pavé droit, pyramide. En bas, les solides
#                      ronds : cylindre, cône, boule. »
# [Écran 4 ~1:14]    « On compte sur le cube : six faces, huit sommets — les coins —,
#                      douze arêtes. Le pavé droit, c'est pareil ! »
# [Écran 5 ~1:34]    « Le patron : le cube à plat. Six carrés. On plie, et on
#                      retrouve le cube. »
# [Défi ~1:52]       « À toi ! Combien de petits cubes dans cet empilement ? Mets
#                      pause. »
# [Correction ~2:06] « Au sol, un carré de deux sur deux : quatre cubes. Deux posés
#                      dessus. Quatre plus deux, six cubes. N'oublie pas ceux qui
#                      sont cachés ! »
# [À retenir ~2:24]  « On retient : un solide occupe l'espace. Face, arête, sommet.
#                      Cube et pavé : six, huit, douze. Et les ronds ont une surface
#                      courbe. À bientôt ! »
