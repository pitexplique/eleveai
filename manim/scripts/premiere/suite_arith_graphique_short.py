# suite_arith_graphique_short.py
# EleveAI — Maths 1re (sans spé) — short « Suite arithmétique sur un graphique :
# tu la reconnais au premier coup d'œil ? » (9:16), ceinture BLANCHE (échelle
# entière sous le titre). Série SUITES, épisode 07. Micro : lin_suite_graphique.
#   · 00-garde      : le titre, l'échelle, le pari, un nuage aligné (escalier) ;
#   · 01-situation  : EN HAUT les épisodes de Lina, monteuse vidéo, en piles (4,
#                     puis 3 de plus chaque semaine, en orange) ; EN BAS le point
#                     de chaque semaine se pose SOUS sa pile, EN MÊME TEMPS ;
#   · 02-alignes    : l'escalier « +3 », la droite pointillée : points alignés ;
#   · 03/03b        : question-pause (C : des points alignés), 3 s ; trois petits
#                     nuages dans les boutons ;
#   · 04-commentaire: (0 ; 4), (1 ; 7), (2 ; 10) … puis « ? » à l'abscisse 10 ;
#                     « Réponds en commentaire ! » (réponse 34 = 4 + 3 × 10, NON
#                     affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = raison, vert = juste.
# Voix : manim/voix/premiere-suite-arith-graphique-short.json (débit −6), calée
# par suite_arith_graphique_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_graphique_short.py SuiteArithGraphiqueShort -o eleveai-maths-premiere-suite-arith-graphique-short --media_dir manim/scripts/premiere/media-suite-arith-graphique-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suite_arith_graphique import GRIS_DROITE, OutilsGraphique, Repere, nuage_mini  # noqa: E402
from suites_commun import *  # noqa: E402,F403

EP = [4, 7, 10]
assert all(b - a == 3 for a, b in zip(EP, EP[1:]))
assert 4 + 3 * 10 == 34                                   # l'abscisse 10 (commentaire)
TUILE_H, TUILE_G, Y_PILE = 0.13, 0.02, 0.05               # une tuile = un épisode


def tuile(x, k, couleur=TERME, w=0.5):
    """L'épisode k d'une pile : une vignette (et son petit triangle « lecture »)."""
    y = Y_PILE + k * (TUILE_H + TUILE_G) + TUILE_H / 2
    v = RoundedRectangle(width=w, height=TUILE_H, corner_radius=0.03, fill_color=couleur, fill_opacity=1,
                         stroke_width=0).move_to(P(x, y))
    tri = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.04).rotate(-PI / 2).move_to(P(x, y))
    return VGroup(v, tri)


def clap(s=1.0):
    """Le clap de cinéma : le pictogramme du montage vidéo."""
    corps = RoundedRectangle(width=0.6, height=0.38, corner_radius=0.05, fill_color="#334155", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(0, -0.08))
    barre = Polygon(P(-0.3, 0.13), P(0.3, 0.13), P(0.33, 0.3), P(-0.27, 0.3), fill_color=WHITE, fill_opacity=1,
                    stroke_width=0).rotate(0.18, about_point=P(-0.3, 0.13))
    rayures = VGroup(*[Line(P(-0.2 + 0.15 * k, 0.15), P(-0.14 + 0.15 * k, 0.28), stroke_color="#0F172A",
                            stroke_width=4).rotate(0.18, about_point=P(-0.3, 0.13)) for k in range(4)])
    return VGroup(corps, barre, rayures).scale(s)


class SuiteArithGraphiqueShort(OutilsGraphique, ShortSuites):
    fichier_marques = "suite_arith_graphique_short_marques.json"
    nom_voix = "premiere-suite-arith-graphique-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def repere_lina(self):
        r = Repere((0, 3.3), (0, 11.5), P(-1.45, -2.5), P(1.55, -0.6), 1, etiq_n=(0, 1, 2, 3), fs=28, fs_grad=26)
        r.lab_u.next_to(r.ax_u.get_end(), RIGHT, buff=0.1)
        return r

    def etiquette_u(self, rep, v):
        """Le nombre v sur l'axe des uₙ (il apparaît quand la voix dit le point)."""
        x, y = rep.ax_u.get_center()[0], rep.G(0, v)[1]
        tr = Line(P(x - 0.07, y), P(x + 0.07, y), stroke_width=2, color=GREY_B)
        return VGroup(tr, self.t(fr(v), 24, TERME).next_to(tr, LEFT, buff=0.05))

    def bouton_nuage(self, lettre, valeurs, lignes, fs=36, largeur=4.0, hauteur=1.0):
        """Un bouton A/B/C : rond + petit nuage + 1 ou 2 lignes (taille 28)."""
        rond = Circle(radius=0.25 * fs / 32, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        mini = nuage_mini(valeurs, 0.8, 0.7, r=0.06)
        txt = VGroup(*[self.t(l, 28, WHITE, 1e9) for l in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        corps = VGroup(mini, txt).arrange(RIGHT, buff=0.12)
        ligne = VGroup(VGroup(rond, lt), corps).arrange(RIGHT, buff=0.15)
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.14, stroke_color=TERME,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.15, LEFT)
        return VGroup(cadre, ligne)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari, un nuage ──
        self.dire("00-garde")
        self.entete("Suite arithmétique", extrait="Suite")
        sg = self.t("sur un graphique", 38, TERME).move_to(P(0, 2.3))
        self.au_mot("sur un graphique")
        self.play(FadeIn(sg, shift=UP * 0.1), run_time=0.3)
        pari = self.paragraphe(["Tu paries que", "tu la reconnais", ("au premier", RAISON), ("coup d'œil ?", RAISON)],
                               self.fs_grand, buff=0.24, y=0.6)
        for ligne, ex in zip(pari, ("Tu paries", "tu la", "au premier", "coup d'œil")):
            self.au_mot(ex)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.25)
        pts = [P(-1.5 + 0.75 * k, -2.5 + 0.3 * k) for k in range(5)]
        dots = VGroup(*[Dot(p, radius=0.09, color=TERME) for p in pts])
        marches = VGroup(*[VGroup(Line(pts[k], P(pts[k + 1][0], pts[k][1])),
                                  Line(P(pts[k + 1][0], pts[k][1]), pts[k + 1])).set_stroke(RAISON, 5)
                           for k in range(4)])
        dr = DashedLine(pts[0] + P(-0.3, -0.12), pts[-1] + P(0.3, 0.12), color=GRIS_DROITE, stroke_width=3)
        for k in range(5):
            self.play(GrowFromCenter(dots[k]), *([Create(marches[k - 1])] if k else []), run_time=0.14)
        self.play(Create(dr), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT les piles d'épisodes ; EN BAS le point sous sa pile ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        nom = self.t("Lina", 42, JAUNE_TITRE)
        ic = clap(0.75)
        tete = VGroup(ic, nom).arrange(RIGHT, buff=0.25).move_to(P(0, 2.43))
        metier = self.t("monteuse vidéo", 34, TERME).move_to(P(0, 1.88))
        self.au_mot("Lina")
        self.play(FadeIn(tete, shift=UP * 0.1), run_time=0.35)
        self.au_mot("monteuse")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.3)
        rep = self.repere_lina()
        xs = [rep.G(n, 0)[0] for n in range(3)]
        piles = [VGroup(*[tuile(xs[n], k, TERME if k < 4 + 3 * (n - 1) or n == 0 else RAISON) for k in range(EP[n])])
                 for n in range(3)]
        self.au_mot("4 épisodes")
        self.play(*rep.anims(), LaggedStart(*[FadeIn(t, shift=DOWN * 0.1) for t in piles[0]], lag_ratio=0.15),
                  run_time=0.6)
        self.au_mot("3 de plus")
        plus = self.t("+ 3", 44, RAISON).move_to(P(1.42, 1.05))
        self.play(TransformFromCopy(piles[0], piles[1][:4]), FadeIn(plus, scale=1.3), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(t, scale=1.5) for t in piles[1][4:]], lag_ratio=0.2), run_time=0.35)
        self.au_mot("chaque semaine")
        cs = VGroup(self.t("chaque", 24, GREY_A), self.t("semaine", 24, GREY_A)).arrange(DOWN, buff=0.04)
        cs.next_to(plus, DOWN, buff=0.12)
        self.play(TransformFromCopy(piles[1], piles[2][:7]), FadeIn(cs), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(t, scale=1.5) for t in piles[2][7:]], lag_ratio=0.2), run_time=0.35)
        pts = VGroup()
        for n in range(3):
            self.suivre(f"{n} et")
            self.suivre(str(EP[n]))
            d = rep.point(n, EP[n], r=0.1)
            self.play(GrowFromCenter(d), Flash(d, color=TERME, line_length=0.12), FadeIn(self.etiquette_u(rep, EP[n])),
                      Indicate(piles[n], color=TERME, scale_factor=1.08), run_time=0.3)
            pts.add(d)
        self.attendre_voix(marge=0.3)

        # ── 02 : on ajoute toujours 3 : les points sont alignés ──
        self.dire("02-alignes")
        self.au_mot("toujours")
        self.suivre("3")
        marches = [rep.marche(n, EP[n], EP[n + 1], largeur=6) for n in range(2)]
        p3 = [self.t("+3", 30, RAISON).next_to(m[1], RIGHT, buff=0.08) for m in marches]
        self.play(*[Create(m) for m in marches], *[FadeIn(p, scale=1.3) for p in p3],
                  *[Indicate(piles[n][-3:], color=RAISON, scale_factor=1.2) for n in (1, 2)], run_time=0.45)
        self.bring_to_front(pts)
        self.au_mot("alignés")
        dr = rep.droite(0, 3.2, lambda n: 4 + 3 * n)
        al = self.t("points alignés", 42, JUSTE, larg=3.7).move_to(P(0, 2.1))
        self.play(FadeOut(tete), FadeOut(metier), run_time=0.2)
        self.play(Create(dr), FadeIn(al, scale=1.2), run_time=0.45)
        self.bring_to_front(pts)
        self.attendre_voix(marge=0.6)

        # ── 03 : question-pause → C ──
        lignes = self.paragraphe(["Lequel de", "ces nuages est", "arithmétique ?"], 42, buff=0.12, y=2.15)
        cartes = VGroup(self.bouton_nuage("A", [1, 2, 4, 8, 16], ["de plus en", "plus vite"]),
                        self.bouton_nuage("B", [3, 8, 2, 9, 4], ["en zigzag"]),
                        self.bouton_nuage("C", [2, 4, 6, 8, 10], ["alignés"]))
        cartes.arrange(DOWN, buff=0.12).move_to(P(0, 0)).align_to(P(0, lignes.get_bottom()[1] - 0.25), UP)

        def e1():
            for l, ex in zip(lignes, ("Lequel", "nuages", "arithmétique")):
                self.au_mot(ex)
                self.play(FadeIn(l, shift=UP * 0.08), run_time=0.25)

        q = self.question_libre("03-question", [e1], cartes, P(0, cartes.get_bottom()[1] - 0.42))
        self.dire("03b-reponse")
        self.au_mot("Réponse C")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(cartes[0]), FadeOut(cartes[1]), run_time=0.2)
        self.play(VGroup(cartes[2], ok).animate.shift(cartes[0].get_center() - cartes[2].get_center()), run_time=0.3)
        rep2 = Repere((0, 3.4), (0, 14), P(-1.3, -2.6), P(1.5, -0.75), 2, fs=26)
        rep2.lab_u.next_to(rep2.ax_u.get_end(), RIGHT, buff=0.1)
        vals = [4, 7, 10, 13]
        pts2 = VGroup(*[rep2.point(n, v, r=0.1) for n, v in enumerate(vals)])
        self.au_mot("écart constant")
        m2 = [rep2.marche(n, vals[n], vals[n + 1], largeur=6) for n in range(3)]
        self.play(*rep2.anims(), LaggedStart(*[GrowFromCenter(d) for d in pts2], lag_ratio=0.2), run_time=0.45)
        self.play(*[Create(m) for m in m2], run_time=0.35)
        self.bring_to_front(pts2)
        self.au_mot("alignés")
        dr2 = rep2.droite(0, 3.3, lambda n: 4 + 3 * n)
        self.play(Create(dr2), *[Indicate(d, color=JUSTE, scale_factor=1.5) for d in pts2], run_time=0.45)
        self.bring_to_front(pts2)
        self.attendre_voix(marge=1.2)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        X0, Y0, KU = -1.45, 1.4, 0.1
        XN = {0: -1.45, 1: -0.9, 2: -0.35, 10: 1.3}
        k = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.15)
        ax_n = Arrow(P(X0, Y0), P(1.72, Y0), **k)
        ax_u = Arrow(P(X0, Y0), P(X0, 2.7), **k)
        coupe = VGroup(*[Line(P(0.3 + dx, Y0 - 0.1), P(0.4 + dx, Y0 + 0.1), stroke_width=4, color=GREY_B)
                         for dx in (0, 0.1)])
        ln = self.t("n", 28, GREY_A).next_to(ax_n, RIGHT, buff=0.06)
        lu = self.t("uₙ", 28, GREY_A).next_to(ax_u.get_end(), RIGHT, buff=0.1)
        self.play(Create(ax_n), Create(ax_u), FadeIn(coupe), FadeIn(ln), FadeIn(lu), run_time=0.35)
        pts = VGroup()
        for n, v in zip((0, 1, 2), EP):
            self.suivre(f"{n} et")
            gn = self.t(str(n), 24, GREY_A).move_to(P(XN[n], Y0 - 0.22))
            self.play(FadeIn(gn), run_time=0.15)
            self.suivre(str(v))
            d = Dot(P(XN[n], Y0 + KU * v), radius=0.1, color=TERME)
            tr = Line(P(X0 - 0.07, Y0 + KU * v), P(X0 + 0.07, Y0 + KU * v), stroke_width=2, color=GREY_B)
            gu = self.t(str(v), 24, TERME).next_to(tr, LEFT, buff=0.05)
            self.play(GrowFromCenter(d), FadeIn(tr), FadeIn(gu), run_time=0.25)
            pts.add(d)
        dr = DashedLine(P(XN[0], Y0 + KU * 4), P(0.1, Y0 + KU * (4 + 3 * (0.1 - XN[0]) / 0.55)), color=GRIS_DROITE,
                        stroke_width=3)
        pp = self.t("…", 40, GREY_A).move_to(P(0.55, 2.2))
        self.play(Create(dr), FadeIn(pp), run_time=0.3)
        self.bring_to_front(pts)
        question = self.paragraphe(["Quelle est", "l'ordonnée", "du point", ("d'abscisse 10 ?", RAISON)], 38,
                                   buff=0.1, y=-0.25)
        for ligne, ex in zip(question, ("Quelle", "l'ordonnée", "du point", "abscisse 10")):
            if ex == "abscisse 10":
                self.suivre("10")
            else:
                self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "abscisse 10":
                g10 = self.t("10", 24, RAISON).move_to(P(XN[10], Y0 - 0.22))
                vl = DashedLine(P(XN[10], Y0), P(XN[10], 2.25), color=RAISON, stroke_width=3)
                qm = self.t("?", 44, RAISON).move_to(P(XN[10], 2.5))
                anims += [FadeIn(g10), Create(vl), FadeIn(qm, scale=1.4)]
            self.play(*anims, run_time=0.3)
        self.appel_commentaire(-2.28)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
