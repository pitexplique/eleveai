# annonce_probabilites.py
# EleveAI — BANDE-ANNONCE de la série « Probabilités, de l'école à la terminale ».
# Paysage 16:9, AVEC VOIX (validée par Frédéric) : manim/voix/annonce-probabilites.json
# (Julie, débit −7). Short jumeau : annonce_probabilites_short.py.
#
# Écrans : 00 garde (pièce, dé, sac en mouvement) · 01 « plus de 300 vidéos » +
# frise école → collège → lycée · 02 le sac 3 rouges / 1 bleue, certain /
# possible / impossible · 03 le dé, 1 chance sur 6, histogramme de 600 lancers ·
# 04 l'arbre, loi binomiale, bac · 05 quatre vignettes de La Réunion · 06 les
# 7 ceintures qui s'allument · 07 le questionnaire des classes.
#
# ⭐ Les 600 lancers sont un VRAI tirage (graine 1758) : 96, 99, 102, 106, 97, 100,
# et aucun 6 dans les 6 premiers (le short s'en sert).
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/annonce/annonce_probabilites.py AnnonceProbabilites -o eleveai-annonce-probabilites --media_dir manim/scripts/annonce/media
# Puis copier le mp4 dans manim/sorties/annonce/probabilites/.

import math
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import CEINTURES, ceinture  # noqa: E402

BILLE_ROUGE = "#DC2626"
BILLE_BLEUE = "#2563EB"
LETCHI = "#DC2626"
GRIS_ETEINT = "#6B7280"

_r = random.Random(1758)
TIRAGES = [_r.randint(1, 6) for _ in range(600)]


def P(x, y):
    return np.array([x, y, 0.0])


def comptes(n):
    return [TIRAGES[:n].count(i) for i in range(1, 7)]


# ── les dessins communs (paysage et short) ──────────────────────────────────

POINTS_DE = {
    1: [(0, 0)],
    2: [(-1, 1), (1, -1)],
    3: [(-1, 1), (0, 0), (1, -1)],
    4: [(-1, 1), (1, 1), (-1, -1), (1, -1)],
    5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
    6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)],
}


def de(face, cote=1.2):
    """Un dé DESSINÉ, vu de face : carré arrondi blanc, points noirs."""
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.18,
                             fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    pts = VGroup(*[Dot(P(x * cote * 0.27, y * cote * 0.27), radius=cote * 0.085, color="#111827")
                   for x, y in POINTS_DE[face]])
    return VGroup(corps, pts)


def de_qui_roule(centre, cote=1.2, periode=0.22, faces=None):
    """Un dé qui roule SANS FIN (updater) : la face change, il tangue."""
    faces = faces or [3, 5, 2, 6, 1, 4]
    etat = {"t": 0.0, "k": 0}
    holder = VGroup(de(faces[0], cote).move_to(centre))

    def maj(m, dt):
        etat["t"] += dt
        k = int(etat["t"] / periode)
        ang = 0.35 * math.sin(etat["t"] * 9)
        saut = 0.12 * abs(math.sin(etat["t"] * 9))
        m.remove(*m.submobjects)
        m.add(de(faces[k % len(faces)], cote).rotate(ang).move_to(centre + UP * saut))

    holder.add_updater(maj)
    return holder


def piece_qui_tourne(centre, r=0.75):
    """Une pièce qui tourne sur elle-même : PILE, puis FACE, puis PILE…"""
    etat = {"t": 0.0}

    def faire(t):
        c = math.cos(t * 5)
        pile = c >= 0
        disque = Circle(radius=r, fill_color=JAUNE_TITRE if pile else ORANGE_RETENUE, fill_opacity=1,
                        stroke_color=WHITE, stroke_width=3)
        mot = Text("PILE" if pile else "FACE", font_size=int(r * 34), color=BLACK, weight=BOLD)
        g = VGroup(disque, mot.move_to(disque))
        g.stretch(max(abs(c), 0.05), 0)
        return g.move_to(centre + UP * 0.25 * abs(math.sin(t * 2.5)))

    holder = VGroup(faire(0))

    def maj(m, dt):
        etat["t"] += dt
        m.remove(*m.submobjects)
        m.add(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


def sac_vide(larg=2.2, haut=2.4):
    """Un sac TRANSPARENT (on voit les billes) fermé par un lien en haut."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=larg * 0.3,
                             fill_color="#E0F2FE", fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    col = Polygon(P(-larg * 0.22, haut / 2 - 0.05), P(larg * 0.22, haut / 2 - 0.05),
                  P(larg * 0.12, haut / 2 + 0.3), P(-larg * 0.12, haut / 2 + 0.3),
                  fill_color="#E0F2FE", fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    lien = Line(P(-larg * 0.17, haut / 2 + 0.12), P(larg * 0.17, haut / 2 + 0.12),
                color=ORANGE_RETENUE, stroke_width=6)
    return VGroup(corps, col, lien)


def bille(couleur, r=0.24):
    b = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    reflet = Dot(radius=r * 0.22, color=WHITE).move_to(b.get_center() + P(-r * 0.35, r * 0.35)).set_opacity(0.7)
    return VGroup(b, reflet)


class AnnonceProbabilites(Notion6e):
    identite = "EleveAI"
    nom_voix = "annonce-probabilites"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.45):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les probabilités", 66, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("de l'école à la terminale", 36).next_to(titre, DOWN, buff=0.25)
        ident = self.t(self.identite, 26, BLEU_CALCUL).next_to(sous, DOWN, buff=0.2)
        self.play(Write(titre), FadeIn(sous, shift=DOWN * 0.2), FadeIn(ident), run_time=1.0)

        y = -0.5
        self.au_mot("Pile ou face")
        piece = piece_qui_tourne(P(-4.8, y), 1.0)
        l1 = self.t("Pile ou face", 32, BLEU_CALCUL).move_to(P(-4.8, -2.15))
        self.add(piece)
        self.play(FadeIn(l1), run_time=0.4)

        self.au_mot("Un dé")
        d = de_qui_roule(P(-1.3, y), 1.7)
        l2 = self.t("Un dé", 32, BLEU_CALCUL).move_to(P(-1.3, -2.15))
        self.add(d)
        self.play(FadeIn(l2), run_time=0.4)

        self.au_mot("Un sac de billes")
        sac = sac_vide(2.4, 2.2).move_to(P(2.3, y - 0.15))
        billes = VGroup(*[bille(c, 0.27) for c in [BILLE_ROUGE, BILLE_BLEUE, VERT_OK, BILLE_ROUGE, JAUNE_TITRE]])
        bases = [P(1.65, y - 0.75), P(2.3, y - 0.8), P(2.95, y - 0.7), P(1.95, y - 0.15), P(2.6, y - 0.15)]
        for b, p in zip(billes, bases):
            b.move_to(p)
        horloge = {"t": 0.0}

        def secoue(g, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for i, (b, p) in enumerate(zip(g, bases)):
                b.move_to(p + P(0.12 * math.sin(tt * 6 + i * 1.7), 0.14 * abs(math.sin(tt * 5 + i * 2.3))))

        billes.add_updater(secoue)
        l3 = self.t("Un sac de billes", 32, BLEU_CALCUL).move_to(P(2.3, -2.15))
        self.play(FadeIn(sac), FadeIn(billes), FadeIn(l3), run_time=0.5)

        self.au_mot("Et si on apprenait")
        ch = self.chute("Et si on apprenait à le mesurer ?", color=VERT_OK, font_size=40)
        self.play(Write(ch), run_time=1.0)
        self.attendre_voix(marge=0.8)
        for m in (piece, d, billes):
            m.clear_updaters()

    # ── 01 : l'annonce ──────────────────────────────────────────────────────

    def ecran_annonce(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-annonce")
        self.titre_ecran("Bientôt sur EleveAI")
        self.au_mot("plus de 300 vidéos")
        gros = self.ligne([("plus de", WHITE), ("300", JAUNE_TITRE), ("vidéos", WHITE)], 64, 0.3)
        gros.move_to(P(-0.6, 2.15))
        self.play(FadeIn(gros, scale=0.8), run_time=0.6)
        self.insister(gros[1])
        self.au_mot("sur les probabilités")
        sur = self.t("sur les probabilités", 36, BLEU_CALCUL).move_to(P(-0.6, 1.35))
        self.play(FadeIn(sur, shift=UP * 0.15), run_time=0.5)

        self.au_mot("de l'école")
        marches = VGroup()
        noms = [("école", "CM1 · CM2"), ("collège", "6e → 3e"), ("lycée", "2de → Tle")]
        couleurs = [VERT_OK, BLEU_CALCUL, VIOLET_ACCENT]
        for i, ((nom, sous), c) in enumerate(zip(noms, couleurs)):
            h = 0.75 * (i + 1)
            r = Rectangle(width=2.3, height=h, fill_color=c, fill_opacity=0.25, stroke_color=c, stroke_width=3)
            r.move_to(P(-5.0 + 2.3 * i, -3.45 + h / 2))
            lbl = self.t(nom, 32, c).next_to(r, UP, buff=0.12)
            s = self.t(sous, 22).move_to(r.get_top() + DOWN * 0.3)
            marches.add(VGroup(r, lbl, s))
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.3) for m in marches], lag_ratio=0.45), run_time=1.6)

        self.au_mot("Une vidéo pour chaque compétence")
        comp = self.t("une vidéo pour chaque compétence", 32).move_to(P(-0.6, 0.55))
        self.play(FadeIn(comp, shift=UP * 0.15), run_time=0.5)
        self.au_mot("qui grandit avec toi")
        fl = CurvedArrow(P(-5.4, -1.75), P(-1.15, -0.7), angle=-PI / 6, color=JAUNE_TITRE, stroke_width=5)
        idee = VGroup(self.t("une même idée", 30, JAUNE_TITRE),
                      self.t("qui grandit avec toi", 30, JAUNE_TITRE)).arrange(DOWN, buff=0.12)
        idee.move_to(P(3.3, -1.1))
        self.play(Create(fl), FadeIn(idee), run_time=1.0)
        self.attendre_voix(marge=0.7)

    # ── 02 : l'école ────────────────────────────────────────────────────────

    def ecran_ecole(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-ecole")
        self.titre_ecran("À l'école, on joue")
        self.au_mot("Dans un sac")
        sac = sac_vide(2.3, 2.5).move_to(P(-4.6, -0.6))
        self.play(FadeIn(sac), run_time=0.5)
        cibles = [P(-5.2, -1.3), P(-4.5, -1.35), P(-4.85, -0.75), P(-4.0, -1.0)]
        rouges = VGroup(*[bille(BILLE_ROUGE, 0.27).move_to(c + UP * 3.2) for c in cibles[:3]])
        bleue = bille(BILLE_BLEUE, 0.27).move_to(cibles[3] + UP * 3.2)

        self.au_mot("3 billes rouges")
        t1 = self.ligne([("3", JAUNE_TITRE), ("billes rouges", BILLE_ROUGE)], 40, 0.2)
        t1.move_to(P(1.4, 1.7))
        self.add(rouges)
        self.play(LaggedStart(*[b.animate.move_to(c) for b, c in zip(rouges, cibles[:3])], lag_ratio=0.3),
                  FadeIn(t1), run_time=1.0)
        self.au_mot("et 1 bille bleue")
        t2 = self.ligne([("1", JAUNE_TITRE), ("bille bleue", BILLE_BLEUE)], 40, 0.2)
        t2.move_to(P(1.4, 0.95))
        self.add(bleue)
        self.play(bleue.animate.move_to(cibles[3]), FadeIn(t2), run_time=0.7)

        self.au_mot("Tirer une bille rouge")
        q = self.t("Tirer une bille rouge :", 38, BLEU_CALCUL).move_to(P(1.4, -0.15))
        self.play(FadeIn(q), rouges[2].animate.move_to(P(-4.6, 1.25)), run_time=0.7)
        mots = VGroup(self.t("certain", 36, GRIS_ETEINT), self.t("possible", 36, GRIS_ETEINT),
                      self.t("impossible", 36, GRIS_ETEINT)).arrange(RIGHT, buff=0.95).move_to(P(1.3, -1.35))
        for extrait, m in zip(["c'est certain", "possible, ou", "impossible ?"], mots):
            self.au_mot(extrait)
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.35)
        self.wait(0.3)
        self.play(mots[1].animate.set_color(VERT_OK), mots[0].animate.set_opacity(0.4),
                  mots[2].animate.set_opacity(0.4), run_time=0.5)
        self.insister(mots[1], 0.4)
        self.play(Create(SurroundingRectangle(mots[1], color=VERT_OK, buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 03 : le collège ─────────────────────────────────────────────────────

    def ecran_college(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-college")
        self.titre_ecran("Au collège, on mesure")
        self.au_mot("Avec un dé")
        d = de(6, 1.3).move_to(P(-5.3, 1.6))
        self.play(SpinInFromNothing(d), run_time=0.5)

        self.au_mot("1 chance sur 6")
        chance = self.ligne([("1 chance sur 6", BLEU_CALCUL), ("=", WHITE)], 42, 0.3)
        frac = self.fraction(1, 6, 44, JAUNE_TITRE)
        VGroup(chance, frac).arrange(RIGHT, buff=0.3).move_to(P(-1.1, 1.75))
        self.play(Write(chance), run_time=0.7)
        self.play(FadeIn(frac, shift=UP * 0.15), run_time=0.4)

        # l'histogramme des 600 lancers
        base_y, x0, pas, larg = -2.7, -4.6, 1.25, 0.85
        echelle = 2.7 / 100
        axe = Line(P(x0 - 0.7, base_y), P(x0 + 5 * pas + 0.7, base_y), stroke_width=3)
        faces = VGroup(*[self.t(str(i + 1), 30, JAUNE_TITRE if i == 5 else WHITE)
                         .move_to(P(x0 + i * pas, base_y - 0.35)) for i in range(6)])
        n = ValueTracker(0)

        def barres():
            c = comptes(int(n.get_value()))
            g = VGroup()
            for i in range(6):
                h = max(c[i] * echelle, 0.001)
                g.add(Rectangle(width=larg, height=h, stroke_width=0, fill_opacity=0.85,
                                fill_color=JAUNE_TITRE if i == 5 else BLEU_CALCUL)
                      .move_to(P(x0 + i * pas, base_y + h / 2)))
            return g

        hist = always_redraw(barres)
        compteur = always_redraw(lambda: self.ligne(
            [(str(int(n.get_value())), JAUNE_TITRE), ("lancers", WHITE)], 38, 0.2).move_to(P(4.5, 0.6)))

        self.au_mot("Lance-le 600 fois")
        roule = de_qui_roule(P(-5.3, 1.6), 1.3, periode=0.07, faces=TIRAGES[:60])
        self.remove(d)
        self.add(roule)
        self.play(Create(axe), FadeIn(faces), FadeIn(compteur), run_time=0.4)
        self.add(hist)
        self.play(n.animate.set_value(600), run_time=2.2, rate_func=linear)
        roule.clear_updaters()
        self.remove(roule)
        self.add(de(6, 1.3).move_to(P(-5.3, 1.6)))
        hist.clear_updaters()
        compteur.clear_updaters()

        self.au_mot("le 6 sort environ 100 fois")
        cent = self.t("≈ 100", 38, JAUNE_TITRE).next_to(hist[5], UP, buff=0.2)
        self.play(FadeIn(cent, shift=DOWN * 0.15), Indicate(faces[5], color=JAUNE_TITRE, scale_factor=1.5),
                  run_time=0.6)
        self.insister(cent, 0.4)
        self.attendre_voix(marge=0.8)

    # ── 04 : le lycée ───────────────────────────────────────────────────────

    def ecran_lycee(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lycee")
        self.titre_ecran("Au lycée, on prévoit")

        self.au_mot("les arbres")
        r = P(-5.8, -0.3)
        n1 = [P(-3.6, 1.0), P(-3.6, -1.6)]
        n2 = [P(-1.3, 1.65), P(-1.3, 0.35), P(-1.3, -0.95), P(-1.3, -2.25)]
        rac = Dot(r, radius=0.08)
        b1 = VGroup(*[Line(r, p, stroke_width=4, color=BLEU_CALCUL, buff=0.1) for p in n1])
        l1 = VGroup(*[self.t(s, 32, JAUNE_TITRE).move_to(p) for s, p in zip("PF", n1)])
        b2 = VGroup(*[Line(n1[i // 2] + RIGHT * 0.25, p + LEFT * 0.25, stroke_width=4, color=VERT_OK)
                      for i, p in enumerate(n2)])
        l2 = VGroup(*[self.t(s, 30, JAUNE_TITRE).move_to(p) for s, p in zip("PFPF", n2)])
        self.play(FadeIn(rac), Create(b1), run_time=0.6)
        self.play(FadeIn(l1), run_time=0.3)
        self.play(Create(b2), run_time=0.6)
        self.play(FadeIn(l2), run_time=0.3)

        self.au_mot("les probabilités conditionnelles")
        c = VGroup(self.t("probabilités", 34), self.t("conditionnelles", 34)).arrange(DOWN, buff=0.1)
        c.move_to(P(2.3, 1.3))
        self.play(FadeIn(c, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("la loi binomiale")
        lb = self.t("loi binomiale", 42, VERT_OK).move_to(P(2.3, 0.0))
        self.play(FadeIn(lb, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("Jusqu'au bac")
        bac = self.t("bac", 64, JAUNE_TITRE).move_to(P(2.3, -1.5))
        cadre = SurroundingRectangle(bac, color=JAUNE_TITRE, buff=0.2, stroke_width=4)
        self.play(GrowFromCenter(bac), Create(cadre), run_time=0.6)
        self.insister(VGroup(bac, cadre), 0.4)
        self.attendre_voix(marge=0.8)

    # ── 05 : La Réunion ─────────────────────────────────────────────────────

    def v_letchis(self):
        bac = Polygon(P(-0.85, 0), P(0.85, 0), P(0.65, -0.45), P(-0.65, -0.45),
                      stroke_color=WHITE, stroke_width=2, fill_color="#E5E7EB", fill_opacity=0.9)
        fruits = VGroup(*[Circle(radius=0.17, fill_color=LETCHI, fill_opacity=1, stroke_color="#7F1D1D",
                                 stroke_width=2).move_to(P(x, y))
                          for x, y in [(-0.5, 0.12), (-0.17, 0.14), (0.17, 0.12), (0.5, 0.14),
                                       (-0.33, 0.4), (0.0, 0.42), (0.33, 0.4), (-0.15, 0.66), (0.17, 0.66)]])
        return VGroup(fruits, bac)

    def v_pluie(self):
        nuage = VGroup(*[Circle(radius=r, fill_color="#9CA3AF", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                         for x, y, r in [(-0.5, 0.55, 0.35), (0.0, 0.75, 0.48), (0.5, 0.55, 0.35),
                                         (-0.15, 0.45, 0.3), (0.25, 0.45, 0.3)]])
        gouttes = VGroup(*[Line(P(x, y), P(x - 0.08, y - 0.28), color=BLEU_CALCUL, stroke_width=4)
                           for x, y in [(-0.6, 0.1), (-0.25, -0.05), (0.1, 0.1), (0.45, -0.05),
                                        (-0.42, -0.45), (0.28, -0.45), (-0.05, -0.55)]])
        ville = Text("Saint-Denis", font_size=26, color=WHITE).move_to(P(0, -1.0))
        return VGroup(nuage, gouttes, ville)

    def v_cyclone(self):
        bras = VGroup()
        for k in range(3):
            bras.add(ParametricFunction(
                lambda s, k=k: P(0.09 * s * math.cos(s + k * TAU / 3), 0.09 * s * math.sin(s + k * TAU / 3)),
                t_range=[0.6, 10.5], color=WHITE, stroke_width=5))
        oeil = Dot(radius=0.1, color=BLEU_CALCUL)
        return VGroup(bras, oeil)

    def v_volcan(self):
        mont = Polygon(P(-1.1, -0.8), P(-0.3, 0.55), P(0.3, 0.55), P(1.1, -0.8),
                       fill_color="#78350F", fill_opacity=1, stroke_color="#451A03", stroke_width=2)
        cratere = Polygon(P(-0.3, 0.55), P(0.3, 0.55), P(0.18, 0.42), P(-0.18, 0.42),
                          fill_color="#F97316", fill_opacity=1, stroke_width=0)
        lave = Polygon(P(0.05, 0.45), P(0.18, 0.45), P(0.45, -0.1), P(0.3, -0.8), P(0.15, -0.8), P(0.25, -0.15),
                       fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
        fumee = VGroup(*[Circle(radius=r, fill_color=GREY_B, fill_opacity=0.6, stroke_width=0).move_to(P(x, y))
                         for x, y, r in [(0.0, 0.8, 0.16), (0.15, 1.05, 0.2), (0.0, 1.3, 0.14)]])
        return VGroup(mont, lave, cratere, fumee)

    def ecran_reunion(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-reunion")
        self.titre_ecran("Des exemples d'ici, à La Réunion")
        xs = [-4.65, -1.55, 1.55, 4.65]
        cadres = VGroup(*[RoundedRectangle(width=2.8, height=2.9, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                                           stroke_width=3, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, 0.55))
                          for x in xs])
        dessins = [self.v_letchis().scale(1.05), self.v_pluie(), self.v_cyclone(), self.v_volcan()]
        noms = ["les letchis", "la pluie", "les cyclones", "le Piton de\nla Fournaise"]
        extraits = ["les letchis", "la pluie à Saint-Denis", "la saison des cyclones", "le Piton de la Fournaise"]
        for i, (x, dess, nom, ex) in enumerate(zip(xs, dessins, noms, extraits)):
            self.au_mot(ex)
            dess.move_to(P(x, 0.6))
            lbl = self.t(nom, 28, JAUNE_TITRE)
            lbl.next_to(cadres[i], DOWN, buff=0.2)
            self.play(FadeIn(cadres[i]), FadeIn(dess, scale=0.7), FadeIn(lbl), run_time=0.5)
            if i == 2:
                dess.add_updater(lambda m, dt: m.rotate(-2.2 * dt))
        self.attendre_voix(marge=0.8)
        dessins[2].clear_updaters()

    # ── 06 : les ceintures ──────────────────────────────────────────────────

    def ecran_ceintures(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-ceintures")
        self.titre_ecran("Une ceinture pour chaque vidéo")
        belts = VGroup(*[ceinture(c, 1.4) for _, c in CEINTURES]).arrange(RIGHT, buff=0.42, aligned_edge=UP)
        belts.move_to(P(-0.4, 0.25))
        noms = VGroup(*[self.t(n, 28, c if n != "noire" else WHITE).next_to(b, DOWN, buff=0.18)
                        for (n, c), b in zip(CEINTURES, belts)])
        for b in belts:
            b.set_opacity(0.12)
        noms.set_opacity(0.15)
        self.play(FadeIn(belts), FadeIn(noms), run_time=0.6)
        self.au_mot("de la blanche")
        for b, nm in zip(belts, noms):
            self.play(b.animate.set_opacity(1).scale(1.3), nm.animate.set_opacity(1), run_time=0.2)
            self.play(b.animate.scale(1 / 1.3), run_time=0.15)

        self.au_mot("Tu choisis ton niveau")
        marque = Triangle(fill_color=VERT_OK, fill_opacity=1, stroke_width=0).scale(0.2).rotate(PI)
        marque.next_to(belts[1], UP, buff=0.25)
        self.play(FadeIn(marque, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("et tu montes")
        ch = self.chute("Tu choisis ton niveau, et tu montes à ton rythme.", color=VERT_OK, font_size=34)
        self.play(FadeIn(ch), run_time=0.5)
        for k in (2, 3, 4):
            self.play(marque.animate.next_to(belts[k], UP, buff=0.25), run_time=0.45)
        self.attendre_voix(marge=0.8)

    # ── 07 : le questionnaire ───────────────────────────────────────────────

    def ecran_fin(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-fin")
        self.titre_ecran("Par où on commence ?")
        colonnes = [("école", ["CM1", "CM2"]), ("collège", ["6e", "5e", "4e", "3e"]),
                    ("lycée", ["seconde", "première", "terminale"])]
        xs = [-4.9, -1.5, 2.1]
        cases, mots, entetes = [], [], VGroup()
        for (ent, classes), x in zip(colonnes, xs):
            e = self.t(ent, 28, BLEU_CALCUL).move_to(P(x + 0.6, 2.45))
            entetes.add(e)
            for j, cl in enumerate(classes):
                y = 1.75 - 0.62 * j
                box = Square(0.42, stroke_color=WHITE, stroke_width=3).move_to(P(x, y))
                txt = self.t(cl, 34).next_to(box, RIGHT, buff=0.25)
                cases.append(box)
                mots.append(txt)
        self.play(FadeIn(entetes), *[FadeIn(b) for b in cases], *[FadeIn(m) for m in mots], run_time=0.6)
        extraits = ["CM1", "CM2", "6e", "5e", "4e", "3e", "seconde", "première", "terminale"]
        for ex, b, m in zip(extraits, cases, mots):
            self.au_mot(ex)
            co = self.coche(VERT_OK, 0.17).move_to(b)
            self.play(b.animate.set_fill(VERT_OK, 0.25).set_stroke(VERT_OK), m.animate.set_color(VERT_OK),
                      Create(co), run_time=0.25)

        self.au_mot("La classe qui aura")
        rep = self.t("Réponds en commentaire !", 52, VERT_OK).move_to(P(-0.6, -1.15))
        prem = self.t("La classe qui aura le plus de réponses passera en premier.", 26).move_to(P(-0.6, -1.95))
        self.play(FadeIn(rep, scale=0.8), run_time=0.6)
        self.insister(rep, 0.4)
        self.play(FadeIn(prem), run_time=0.4)
        self.au_mot("Abonne-toi")
        ab = self.ligne([("Abonne-toi :", WHITE), ("@eleveai974", BLEU_CALCUL)], 42, 0.3).move_to(P(-0.6, -2.95))
        self.play(GrowFromCenter(ab), run_time=0.6)
        self.attendre_voix(marge=1.5)

    def construct(self):
        self.page_garde()
        self.ecran_annonce()
        self.ecran_ecole()
        self.ecran_college()
        self.ecran_lycee()
        self.ecran_reunion()
        self.ecran_ceintures()
        self.ecran_fin()
