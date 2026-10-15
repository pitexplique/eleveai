# notations_geometrie.py
# EleveAI — « Les bases » — Les notations en géométrie : la leçon paysage ET son short.
#
# ⭐ 30/09/2026 — demandée par Frédéric « pour mes 6e » : « un récapitulatif sur les
# notations en géométrie » — (AB), [AB), [AB], AB, ∈, triangle, //, ⊥, angle.
# Scripts de voix validés avec lui avant ce fichier.
# ⭐ SA RÈGLE DE MISE EN PAGE (même jour) : « à chaque écran un dessin, puis la
# notation ». Le dessin se trace d'abord, la notation tombe dessous ensuite.
# ⭐ LE CODE COULEUR QUI RELIE LES DEUX : ROUGE = ça s'arrête (le crochet, le petit
# mur tracé sur le point), VERT = ça continue (la parenthèse, le trait qui file
# jusqu'au bord). Un feu rouge, un feu vert : un élève de 11 ans le lit sans lire.
# ⚠️ Les 6e lisent difficilement : peu de mots à l'écran, la voix explique.
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU (série « Les bases »).
#
# Voix (débit −8, plus lent : des 6e) :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-notations-geometrie.json -Debit -8
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-notations-geometrie-short.json -Debit -8
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/notations_geometrie.py NotationsGeometrie -o eleveai-maths-bases-notations-geometrie --media_dir manim/scripts/bases/media
#   python -m manim render -qh --disable_caching -r 1080,1920 manim/scripts/bases/notations_geometrie.py NotationsGeometrieShort -o eleveai-maths-bases-notations-geometrie-short --media_dir manim/scripts/bases/media

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases, ShortBases
from gabarit_seconde import SONS

VOIX = Path(__file__).resolve().parents[2] / "voix"
TEXTES = {n: json.loads((VOIX / f"{n}.json").read_text(encoding="utf-8"))
          for n in ("bases-notations-geometrie", "bases-notations-geometrie-short")}

STOP = ROUGE_ERREUR     # le crochet : ça s'arrête
SUITE = VERT_OK         # la parenthèse : ça continue


class _Geo:
    """Ce que les deux formats dessinent : points, lignes, notations."""

    nom_voix = None

    # ── la synchro : `au("fragment")` attend que la voix y arrive ────────────

    def dire(self, nom, dossier=None):
        duree = super().dire(nom, dossier)
        self._cle, self._t0, self._duree = nom, self.renderer.time, duree
        return duree

    def au(self, fragment):
        texte = TEXTES[self.nom_voix][self._cle]
        t = self._t0 + texte.index(fragment) / len(texte) * self._duree
        if t - self.renderer.time > 0.05:
            self.wait(t - self.renderer.time)

    # ── les briques ─────────────────────────────────────────────────────────

    def croix(self, p, lettre="", cote=UP, couleur=WHITE, t=0.11, font_size=36):
        p = np.array(p, dtype=float)
        g = VGroup(Line(p + UL * t, p + DR * t, color=couleur, stroke_width=5),
                   Line(p + UR * t, p + DL * t, color=couleur, stroke_width=5))
        if lettre:
            # VU AU RENDU : à 0,18 la lettre touchait le petit mur rouge.
            g.add(Text(lettre, font_size=font_size, color=couleur).next_to(p, cote, buff=0.34))
        return g

    def mur(self, p, h=0.28):
        p = np.array(p, dtype=float)
        return Line(p + UP * h, p + DOWN * h, color=STOP, stroke_width=9)

    def trace(self, xa, xb, y, gauche, droite, xmin, xmax, la="A", lb="B", font_size=36):
        """Une ligne passant par A et B. `gauche`/`droite` : True = elle continue
        (trait VERT jusqu'au bord), False = elle s'arrête (petit mur ROUGE)."""
        A, B = np.array([xa, y, 0.0]), np.array([xb, y, 0.0])
        coeur = Line(A, B, color=WHITE, stroke_width=5)
        bouts = VGroup()
        bouts.add(Line([xmin, y, 0], A, color=SUITE, stroke_width=5) if gauche else self.mur(A))
        bouts.add(Line(B, [xmax, y, 0], color=SUITE, stroke_width=5) if droite else self.mur(B))
        points = VGroup(self.croix(A, la, font_size=font_size), self.croix(B, lb, font_size=font_size))
        return coeur, bouts, points

    def jouer_trace(self, coeur, bouts, points):
        self.play(FadeIn(points), run_time=0.4)
        self.play(Create(coeur), run_time=0.6)
        self.play(*[Create(b) for b in bouts], run_time=0.7)

    def notation(self, morceaux, font_size=100):
        """[("[", STOP), ("AB", WHITE), (")", SUITE)] → une notation colorée."""
        g = VGroup(*[Text(t, font_size=font_size, color=c) for t, c in morceaux]).arrange(RIGHT, buff=0.06)
        # VU AU RENDU : « AB = 5 cm » en 80 sortait du cadre vertical.
        if g.width > config.frame_width - 0.6:
            g.scale_to_fit_width(config.frame_width - 0.6)
        return g

    def chapeau(self, mob, couleur=WHITE):
        g, d, h = mob.get_corner(UL), mob.get_corner(UR), mob.get_top()
        v = VMobject(stroke_color=couleur, stroke_width=5)
        v.set_points_as_corners([g + UP * 0.1, h + UP * 0.38, d + UP * 0.1])
        return v

    def coche_verte(self, mob):
        return self.coche().next_to(mob, RIGHT, buff=0.35)


# ══════════════════════════════════════════════════════════════════════════════
# LA LEÇON PAYSAGE
# ══════════════════════════════════════════════════════════════════════════════

X = 6.8          # la ligne va de −X à +X


class NotationsGeometrie(_Geo, NotionBases):

    nom_voix = "bases-notations-geometrie"
    dossier_voix = SONS / "bases-notations-geometrie"

    def sous(self, texte, y=-2.55, couleur=WHITE):
        return Text(texte, font_size=32, color=couleur).move_to([-0.4, y, 0])

    # ── 01 · le point ───────────────────────────────────────────────────────

    def ecran_point(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-point")
        self.titre_ecran("Le point")
        self.au("petite croix")
        c = self.croix([0, 1.0, 0], t=0.3)
        self.play(Create(c), run_time=0.8)
        self.au("lettre majuscule")
        a = Text("A", font_size=56).next_to(c, UR, buff=0.12)
        self.play(FadeIn(a))
        n = self.notation([("A", WHITE)], font_size=110).move_to([0, -1.3, 0])
        self.play(Write(n))
        self.attendre_voix()

    # ── 02 · la règle : le mur et la porte ──────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        self.titre_ecran("La règle qui explique tout")
        # à gauche : la ligne arrive sur le point… et s'arrête
        self.au("Le crochet")
        l1 = Line([-6.3, 1.0, 0], [-2.6, 1.0, 0], color=WHITE, stroke_width=5)
        p1 = self.croix([-2.6, 1.0, 0])
        self.play(FadeIn(p1), Create(l1))
        self.play(Create(self.mur([-2.6, 1.0, 0], h=0.4)))
        c1 = Text("[", font_size=130, color=STOP).move_to([-4.3, -0.8, 0])
        t1 = Text("ça s'arrête", font_size=36, color=STOP).move_to([-4.3, -2.2, 0])
        self.play(FadeIn(c1, scale=1.3), FadeIn(t1))
        # à droite : la ligne passe le point… et continue
        self.au("La parenthèse")
        p2 = self.croix([2.4, 1.0, 0])
        l2 = Line([0.8, 1.0, 0], [2.4, 1.0, 0], color=WHITE, stroke_width=5)
        l3 = Line([2.4, 1.0, 0], [6.3, 1.0, 0], color=SUITE, stroke_width=5)
        self.play(FadeIn(p2), Create(l2))
        self.play(Create(l3))
        c2 = Text("(", font_size=130, color=SUITE).move_to([3.2, -0.8, 0])
        t2 = Text("ça continue", font_size=36, color=SUITE).move_to([3.2, -2.2, 0])
        self.play(FadeIn(c2, scale=1.3), FadeIn(t2))
        self.attendre_voix()

    # ── 03 · 04 · 05 · droite, demi-droite, segment ─────────────────────────

    def ecran_ligne(self, voix, titre, gauche, droite, morceaux):
        self.clear()
        self.add_mascotte()
        self.dire(voix)
        self.titre_ecran(titre)
        tr = self.trace(-2.5, 2.5, 1.0, gauche, droite, -X, X)
        self.jouer_trace(*tr)
        n = self.notation(morceaux, font_size=110).move_to([0, -1.1, 0])
        self.play(Write(n))
        return tr, n

    def ecran_droite(self):
        tr, n = self.ecran_ligne("03-droite", "La droite", True, True,
                                 [("(", SUITE), ("AB", WHITE), (")", SUITE)])
        self.au("lettre minuscule")
        d = Text("(d)", font_size=36, color=SUITE).move_to([5.9, 1.45, 0])
        n2 = self.notation([("(", SUITE), ("d", WHITE), (")", SUITE)], font_size=64).move_to([0, -2.55, 0])
        self.play(FadeIn(d), FadeIn(n2))
        self.attendre_voix()

    def ecran_demi_droite(self):
        tr, n = self.ecran_ligne("04-demi-droite", "La demi-droite", False, True,
                                 [("[", STOP), ("AB", WHITE), (")", SUITE)])
        self.au("c'est son origine")
        self.play(Indicate(tr[2][0], color=STOP, scale_factor=1.5))
        self.au("la première lettre")
        o = self.sous("A, la première lettre : l'origine", couleur=STOP)
        self.play(FadeIn(o), Indicate(n[1], color=STOP))
        self.attendre_voix()

    def ecran_segment(self):
        tr, n = self.ecran_ligne("05-segment", "Le segment", False, False,
                                 [("[", STOP), ("AB", WHITE), ("]", STOP)])
        self.au("A et B sont")
        self.play(FadeIn(self.sous("A et B : les extrémités")))
        self.attendre_voix()

    # ── 06 · les trois côte à côte ──────────────────────────────────────────

    def ecran_comparaison(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-comparaison")
        self.titre_ecran("Les trois, côte à côte")
        lignes = [
            ("Deux parenthèses", True, True, [("(", SUITE), ("AB", WHITE), (")", SUITE)], "droite"),
            ("Un crochet et", False, True, [("[", STOP), ("AB", WHITE), (")", SUITE)], "demi-droite"),
            ("Deux crochets", False, False, [("[", STOP), ("AB", WHITE), ("]", STOP)], "segment"),
        ]
        for i, (frag, g, d, morceaux, nom) in enumerate(lignes):
            y = 1.7 - i * 1.65
            self.au(frag)
            tr = self.trace(-4.6, -2.4, y, g, d, -6.6, -0.4, font_size=28)
            n = self.notation(morceaux, font_size=64).move_to([1.6, y, 0])
            m = Text(nom, font_size=32, color=JAUNE_TITRE).move_to([4.5, y, 0])
            self.play(FadeIn(tr[2]), Create(tr[0]), *[Create(b) for b in tr[1]], run_time=0.8)
            self.play(FadeIn(n), FadeIn(m), run_time=0.5)
        self.attendre_voix()

    # ── 07 · la longueur ────────────────────────────────────────────────────

    def ecran_longueur(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-longueur")
        self.titre_ecran("Sans rien autour : une longueur")
        tr = self.trace(-2.5, 2.5, 1.0, False, False, -X, X)
        self.jouer_trace(*tr)
        cote = DoubleArrow([-2.5, 2.1, 0], [2.5, 2.1, 0], buff=0, color=BLEU_CALCUL,
                           stroke_width=4, tip_length=0.2)
        cm = Text("5 cm", font_size=34, color=BLEU_CALCUL).next_to(cote, UP, buff=0.1)
        self.play(GrowFromCenter(cote), FadeIn(cm))
        self.au("On écrit")
        n = self.notation([("AB = 5 cm", VERT_OK)], font_size=80).move_to([-0.6, -0.7, 0])
        self.play(Write(n))
        self.play(Create(self.coche_verte(n)))
        self.au("Mais jamais")
        f = self.notation([("[", STOP), ("AB", WHITE), ("]", STOP), (" = 5 cm", WHITE)], font_size=64)
        f.move_to([-0.6, -2.2, 0])
        self.play(FadeIn(f))
        self.play(Create(Cross(f, stroke_color=ROUGE_ERREUR, stroke_width=6)))
        self.attendre_voix()

    # ── 08 · appartient ─────────────────────────────────────────────────────

    def ecran_appartient(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-appartient")
        self.titre_ecran("Appartient")
        tr = self.trace(-3.5, 0.0, 0.8, True, True, -X, X)
        self.jouer_trace(*tr)
        self.au("C appartient")
        c = self.croix([3.2, 0.8, 0], "C", couleur=SUITE)
        self.play(FadeIn(c, scale=1.4))
        n1 = self.notation([("C ∈ (AB)", SUITE)], font_size=76).move_to([-3.2, -1.6, 0])
        self.play(Write(n1))
        self.au("E n'appartient")
        e = self.croix([1.6, 2.2, 0], "E", cote=RIGHT, couleur=STOP)
        self.play(FadeIn(e, scale=1.4))
        n2 = self.notation([("E ∉ (AB)", STOP)], font_size=76).move_to([2.6, -1.6, 0])
        self.play(Write(n2))
        self.attendre_voix()

    # ── 09 · triangle et quadrilatère ───────────────────────────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-triangle")
        self.titre_ecran("Nommer une figure")
        A, B, C = np.array([-5.6, -0.3, 0]), np.array([-1.6, -0.3, 0]), np.array([-3.9, 2.2, 0])
        tri = Polygon(A, B, C, color=BLEU_CALCUL, stroke_width=5)
        lettres = VGroup(Text("A", font_size=36).next_to(A, DL, buff=0.1),
                         Text("B", font_size=36).next_to(B, DR, buff=0.1),
                         Text("C", font_size=36).next_to(C, UP, buff=0.1))
        self.play(Create(tri), run_time=0.9)
        self.au("On lit les lettres")
        for l in lettres:
            self.play(FadeIn(l, scale=1.4), run_time=0.45)
        n = self.notation([("triangle ABC", WHITE)], font_size=56).move_to([-3.6, -1.4, 0])
        self.play(Write(n))
        self.au("Ses trois côtés")
        cotes = self.notation([("[AB]  [BC]  [CA]", JAUNE_TITRE)], font_size=40).move_to([-3.6, -2.3, 0])
        self.play(Indicate(tri, color=JAUNE_TITRE), FadeIn(cotes))

        self.au("Pareil pour un quadrilatère")
        P = [np.array(p) for p in ([1.2, -0.3, 0], [4.6, -0.3, 0], [5.2, 2.1, 0], [1.8, 2.1, 0])]
        quad = Polygon(*P, color=BLEU_CALCUL, stroke_width=5)
        noms = VGroup(Text("A", font_size=36).next_to(P[0], DL, buff=0.1),
                      Text("B", font_size=36).next_to(P[1], DR, buff=0.1),
                      Text("C", font_size=36).next_to(P[2], UR, buff=0.1),
                      Text("D", font_size=36).next_to(P[3], UL, buff=0.1))
        self.play(Create(quad), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(m, scale=1.4) for m in noms], lag_ratio=0.3), run_time=1.2)
        tour = CurvedArrow([2.3, 0.2, 0], [4.1, 0.2, 0], angle=PI / 2, color=ORANGE_RETENUE)
        nq = self.notation([("ABCD", WHITE)], font_size=56).move_to([3.3, -1.4, 0])
        self.play(Create(tour), Write(nq))
        self.attendre_voix()

    # ── 09b · parallèles et perpendiculaires ────────────────────────────────

    def ecran_paralleles(self):
        self.clear()
        self.add_mascotte()
        self.dire("09b-paralleles")
        self.titre_ecran("Parallèles, perpendiculaires")
        d1 = Line([-6.2, 0.4, 0], [-1.2, 1.6, 0], color=BLEU_CALCUL, stroke_width=5)
        d2 = Line([-6.2, -0.6, 0], [-1.2, 0.6, 0], color=BLEU_CALCUL, stroke_width=5)
        e1 = VGroup(Text("(d)", font_size=30).next_to(d1.get_end(), RIGHT, buff=0.1),
                    Text("(d')", font_size=30).next_to(d2.get_end(), RIGHT, buff=0.1))
        self.play(Create(d1), Create(d2), FadeIn(e1))
        self.au("On écrit deux petits traits")
        n1 = self.notation([("(d) // (d')", WHITE)], font_size=64).move_to([-3.7, -1.9, 0])
        self.play(Write(n1))

        self.au("Deux droites qui se coupent")
        h = Line([1.2, 0.6, 0], [5.8, 0.6, 0], color=BLEU_CALCUL, stroke_width=5)
        v = Line([3.5, -0.8, 0], [3.5, 2.3, 0], color=BLEU_CALCUL, stroke_width=5)
        carre = Square(side_length=0.3, color=JAUNE_TITRE, stroke_width=4).move_to([3.65, 0.75, 0])
        e2 = VGroup(Text("(d)", font_size=30).next_to(h.get_end(), RIGHT, buff=0.1),
                    Text("(d')", font_size=30).next_to(v.get_end(), RIGHT, buff=0.1))
        self.play(Create(h), Create(v), FadeIn(e2))
        self.play(Create(carre))
        self.au("On écrit un T")
        n2 = self.notation([("(d) ⊥ (d')", WHITE)], font_size=64).move_to([3.3, -1.9, 0])
        self.play(Write(n2))
        self.attendre_voix()

    # ── 09c · l'angle ───────────────────────────────────────────────────────

    def ecran_angle(self):
        self.clear()
        self.add_mascotte()
        self.dire("09c-angle")
        self.titre_ecran("L'angle")
        # VU AU RENDU : plus haut, le A mordait sur le titre.
        B = np.array([-2.2, -0.1, 0])
        A = B + 2.6 * np.array([np.cos(0.9), np.sin(0.9), 0])
        C = B + 4.2 * RIGHT
        r1, r2 = Line(B, A, color=WHITE, stroke_width=5), Line(B, C, color=WHITE, stroke_width=5)
        arc = Arc(radius=0.8, start_angle=0, angle=0.9, arc_center=B, color=JAUNE_TITRE, stroke_width=6)
        pts = VGroup(self.croix(A, "A", cote=UL), self.croix(C, "C", cote=DOWN))
        self.play(Create(r1), Create(r2), FadeIn(pts))
        self.play(Create(arc))
        mots = VGroup(Text("A", font_size=100), Text("B", font_size=100, color=JAUNE_TITRE),
                      Text("C", font_size=100)).arrange(RIGHT, buff=0.06).move_to([0.6, -2.0, 0])
        self.au("Angle A B C")
        self.play(Write(mots))
        self.play(Create(self.chapeau(mots)))
        self.au("la lettre du milieu")
        sommet = self.croix(B, "B", cote=LEFT, couleur=JAUNE_TITRE)
        self.play(FadeIn(sommet, scale=1.5), Indicate(mots[1], color=JAUNE_TITRE))
        self.play(FadeIn(Text("le sommet", font_size=30, color=JAUNE_TITRE).next_to(sommet, DOWN, buff=0.2)))
        self.attendre_voix()

    # ── 09d · le récapitulatif ──────────────────────────────────────────────

    def mini(self, i, cx, cy):
        """Le petit dessin de la case i du récapitulatif (largeur ~2,4)."""
        g, x0, x1 = VGroup(), cx - 1.25, cx + 1.25
        if i in (0, 1, 2, 3):
            gauche, droite = [(True, True), (False, True), (False, False), (False, False)][i]
            tr = self.trace(cx - 0.6, cx + 0.6, cy, gauche, droite, x0, x1, font_size=22)
            g.add(*tr)
            if i == 3:
                g.add(Text("5 cm", font_size=20, color=BLEU_CALCUL).move_to([cx, cy + 0.35, 0]))
        elif i == 4:
            g.add(Line([x0, cy, 0], [x1, cy, 0], color=WHITE, stroke_width=4),
                  self.croix([cx, cy, 0], "C", couleur=SUITE, font_size=22))
        elif i == 5:
            g.add(Line([x0, cy - 0.25, 0], [x1, cy + 0.05, 0], color=BLEU_CALCUL, stroke_width=4),
                  Line([x0, cy + 0.05, 0], [x1, cy + 0.35, 0], color=BLEU_CALCUL, stroke_width=4))
        elif i == 6:
            g.add(Line([x0, cy - 0.2, 0], [x1, cy - 0.2, 0], color=BLEU_CALCUL, stroke_width=4),
                  Line([cx, cy - 0.45, 0], [cx, cy + 0.45, 0], color=BLEU_CALCUL, stroke_width=4),
                  Square(side_length=0.18, color=JAUNE_TITRE, stroke_width=3).move_to([cx + 0.09, cy - 0.11, 0]))
        else:
            B = np.array([cx - 0.8, cy - 0.3, 0])
            g.add(Line(B, B + 1.2 * np.array([np.cos(0.8), np.sin(0.8), 0]), color=WHITE, stroke_width=4),
                  Line(B, B + 1.8 * RIGHT, color=WHITE, stroke_width=4),
                  Arc(radius=0.35, angle=0.8, arc_center=B, color=JAUNE_TITRE, stroke_width=4))
        return g

    def ecran_recap(self):
        self.clear()
        self.dire("09d-recap")
        titre = self.titre_ecran("Le récapitulatif")
        cases = [
            ("Deux parenthèses", [("(", SUITE), ("AB", WHITE), (")", SUITE)]),
            ("Un crochet et", [("[", STOP), ("AB", WHITE), (")", SUITE)]),
            ("Deux crochets", [("[", STOP), ("AB", WHITE), ("]", STOP)]),
            ("Rien autour", [("AB = 5 cm", WHITE)]),
            ("Le signe appartient", [("C ∈ (AB)", WHITE)]),
            ("Deux traits penchés", [("(d) // (d')", WHITE)]),
            ("Le T à l'envers", [("(d) ⊥ (d')", WHITE)]),
            ("le chapeau", [("ABC", WHITE)]),
        ]
        for i, (frag, morceaux) in enumerate(cases):
            col, rang = divmod(i, 4)
            cx, cy = (-5.2 if col == 0 else 1.9), 2.0 - rang * 1.4
            self.au(frag)
            dessin = self.mini(i, cx, cy)
            n = self.notation(morceaux, font_size=40).move_to([cx + 2.6, cy, 0])
            anims = [FadeIn(dessin), FadeIn(n)]
            if i == 7:
                anims.append(Create(self.chapeau(n)))
            self.play(*anims, run_time=0.6)
        self.attendre_voix(marge=1.5)

    # ── 10 · le défi, puis sa correction ────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-defi")
        self.titre_ecran("À toi !")
        # ⛔ DESSIN NEUTRE, sans couleurs : elles donneraient la réponse.
        M, N = np.array([-3.5, 1.0, 0]), np.array([0.5, 1.0, 0])
        pts = VGroup(self.croix(M, "M"), self.croix(N, "N"))
        self.play(FadeIn(pts))
        self.au("passe par N")
        self.play(Create(Line(M, [X, 1.0, 0], color=WHITE, stroke_width=5)), run_time=1.2)
        self.au("Comment l'écrire")
        q = Text("?", font_size=140, color=JAUNE_TITRE).move_to([0, -1.2, 0])
        self.play(FadeIn(q, scale=1.3))
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("10b-correction")
        self.titre_ecran("Correction")
        tr = self.trace(-3.5, 0.5, 1.4, False, True, -X, X, la="M", lb="N")
        self.add(tr[0], tr[2])
        self.au("un crochet devant M")
        self.play(Create(tr[1][0]))
        self.au("Elle continue après N")
        self.play(Create(tr[1][1]))
        self.au("C'est la demi-droite")
        n = self.notation([("[", STOP), ("MN", WHITE), (")", SUITE)], font_size=100).move_to([-0.6, -0.4, 0])
        self.play(Write(n))
        self.play(Create(self.coche_verte(n)))
        self.au("Attention")
        # l'autre demi-droite : elle part de N et file vers la GAUCHE
        # VU AU RENDU : « [NM) » chevauchait la phrase — tout se décale à gauche.
        m2 = VGroup(Line([-6.6, -2.3, 0], [-4.2, -2.3, 0], color=SUITE, stroke_width=4),
                    Line([-4.2, -2.3, 0], [-3.2, -2.3, 0], color=WHITE, stroke_width=4),
                    self.mur([-3.2, -2.3, 0], h=0.2),
                    self.croix([-4.2, -2.3, 0], "M", font_size=24),
                    self.croix([-3.2, -2.3, 0], "N", font_size=24))
        n2 = self.notation([("[", STOP), ("NM", WHITE), (")", SUITE)], font_size=56).move_to([-1.3, -2.3, 0])
        autre = Text("une autre : elle part de N", font_size=26, color=ORANGE_RETENUE).move_to([2.6, -2.3, 0])
        self.play(FadeIn(m2), FadeIn(n2), FadeIn(autre))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Les notations en géométrie",
            accroche="(AB), [AB), [AB] : trois dessins différents ?",
            promesse="Tu vas apprendre à lire chaque signe.",
        )
        self.page_objectifs([
            "lire et écrire une droite, une demi-droite, un segment",
            "ne pas confondre un segment et sa longueur",
            "lire ∈, //, ⊥, un triangle et un angle",
        ])
        self.ecran_point()
        self.ecran_regle()
        self.ecran_droite()
        self.ecran_demi_droite()
        self.ecran_segment()
        self.ecran_comparaison()
        self.ecran_longueur()
        self.ecran_appartient()
        self.ecran_triangle()
        self.ecran_paralleles()
        self.ecran_angle()
        self.ecran_recap()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "lire et écrire une droite, une demi-droite, un segment",
                "ne pas confondre un segment et sa longueur",
                "lire ∈, //, ⊥, un triangle et un angle",
            ],
            rappel="Crochet : ça s'arrête.  Parenthèse : ça continue.",
            voix="11-finale",
        )
        self.page_abonnement(voix="12-abonne")


# ══════════════════════════════════════════════════════════════════════════════
# LE SHORT
# ══════════════════════════════════════════════════════════════════════════════

XS = 2.15        # la ligne va de −XS à +XS dans le cadre vertical


class NotationsGeometrieShort(_Geo, ShortBases):

    nom_voix = "bases-notations-geometrie-short"
    dossier_voix = SONS / "bases-notations-geometrie-short"

    def titre(self, texte, couleur=JAUNE_TITRE, font_size=46):
        return self.grand(texte, font_size=font_size, color=couleur).move_to([0, 2.95, 0])

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")
        # ⭐ l'image de la 1re seconde porte la question : trois dessins, mêmes lettres
        g = VGroup()
        for i, (ga, dr) in enumerate([(True, True), (False, True), (False, False)]):
            y = 2.5 - i * 1.25
            g.add(*self.trace(-0.9, 0.9, y, ga, dr, -XS, XS, font_size=30))
            g.add(Text("?", font_size=40, color=JAUNE_TITRE).move_to([0, y - 0.45, 0]))
        q = self.grand("Tu sais pourquoi ?", font_size=44, color=JAUNE_TITRE).move_to([0, -1.2, 0])
        self.add(g, q)
        self.attendre_voix(marge=0.5)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("01-regle")
        l1 = Line([-2.0, 2.3, 0], [0.2, 2.3, 0], color=WHITE, stroke_width=5)
        p1 = self.croix([0.2, 2.3, 0])
        self.play(FadeIn(p1), Create(l1))
        self.play(Create(self.mur([0.2, 2.3, 0], h=0.35)))
        c1 = VGroup(Text("[", font_size=110, color=STOP),
                    self.grand("ça s'arrête", font_size=38, color=STOP)).arrange(RIGHT, buff=0.3).move_to([0, 1.2, 0])
        self.play(FadeIn(c1))
        self.au("La parenthèse")
        l2 = Line([-2.0, 0.0, 0], [-0.2, 0.0, 0], color=WHITE, stroke_width=5)
        l3 = Line([-0.2, 0.0, 0], [2.1, 0.0, 0], color=SUITE, stroke_width=5)
        p2 = self.croix([-0.2, 0.0, 0])
        self.play(FadeIn(p2), Create(l2))
        self.play(Create(l3))
        c2 = VGroup(Text("(", font_size=110, color=SUITE),
                    self.grand("ça continue", font_size=38, color=SUITE)).arrange(RIGHT, buff=0.3).move_to([0, -1.1, 0])
        self.play(FadeIn(c2))
        self.attendre_voix(marge=0.4)

    def ecran_ligne(self, voix, nom, gauche, droite, morceaux):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        t = self.titre(nom)
        self.play(FadeIn(t), run_time=0.4)
        self.jouer_trace(*self.trace(-1.0, 1.0, 1.5, gauche, droite, -XS, XS))
        n = self.notation(morceaux, font_size=120).move_to([0, -0.3, 0])
        self.play(Write(n))
        self.attendre_voix(marge=0.5)

    def ecran_longueur(self):
        self.clear()
        self.margo_bas()
        self.dire("05-longueur")
        self.play(FadeIn(self.titre("Rien autour ?")), run_time=0.4)
        self.jouer_trace(*self.trace(-1.0, 1.0, 1.05, False, False, -XS, XS))
        cote = DoubleArrow([-1.0, 2.0, 0], [1.0, 2.0, 0], buff=0, color=BLEU_CALCUL,
                           stroke_width=4, tip_length=0.18)
        self.au("C'est un nombre")
        n = self.notation([("AB = 5 cm", VERT_OK)], font_size=80).move_to([0, -0.2, 0])
        cm = Text("5 cm", font_size=30, color=BLEU_CALCUL).next_to(cote, UP, buff=0.08)
        self.play(GrowFromCenter(cote), FadeIn(cm), Write(n))
        self.play(FadeIn(self.grand("un nombre", font_size=42, color=VERT_OK).move_to([0, -1.4, 0])))
        self.attendre_voix(marge=0.5)

    def ecran_defi(self):
        self.clear()
        self.margo_bas()
        self.dire("06-defi")
        self.play(Write(Text("À toi", font_size=46, color=ORANGE_RETENUE).move_to([0, 2.8, 0])), run_time=0.5)
        M, N = np.array([-1.3, 1.4, 0]), np.array([0.4, 1.4, 0])
        self.play(FadeIn(VGroup(self.croix(M, "M"), self.croix(N, "N"))))
        self.play(Create(Line(M, [XS, 1.4, 0], color=WHITE, stroke_width=5)), run_time=1.0)
        q = self.grand("= ?", font_size=110, color=JAUNE_TITRE).move_to([0, -0.4, 0])
        self.play(FadeIn(q, scale=1.2))
        self.play(Flash(q, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_accroche()
        self.ecran_regle()
        self.ecran_ligne("02-droite", "la droite", True, True, [("(", SUITE), ("AB", WHITE), (")", SUITE)])
        self.ecran_ligne("03-demi-droite", "la demi-droite", False, True,
                         [("[", STOP), ("AB", WHITE), (")", SUITE)])
        self.ecran_ligne("04-segment", "le segment", False, False, [("[", STOP), ("AB", WHITE), ("]", STOP)])
        self.ecran_longueur()
        self.ecran_defi()
        self.ecran_renvoi(voix="07-fin")
