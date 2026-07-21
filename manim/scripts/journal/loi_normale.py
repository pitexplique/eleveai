# loi_normale.py
# EleveAI — Le Journal · « Un peu de maths » — La courbe en cloche n'est pas
# tombée du ciel (l'article /loi-normale, né du dessin de Frédéric du 21/07 :
# une courbe dentelée, une flèche « n → ∞ », une courbe lisse).
#
# Format « article du journal » : hors banques (pas de notionId), jumeau des
# vidéos de notions pour la structure (accueil → cœur → cas réels → défi →
# correction → à retenir) et de la série « en vrai » pour les effets
# (anim_entree / legende_mobile, légendes distribuées, défi à 2 étapes).
#
# ⚠️ MUET + TEXTE (Frédéric, 21/07 : pas de voix) : le texte à l'écran porte
# TOUTE l'explication, waits généreux.
#
# Le fil : pile ou face → les coefficients du triangle de Pascal → l'escalier
# de la binomiale se lisse en cloche quand n grandit (De Moivre-Laplace) →
# LES CAS RÉELS (le sondage et la règle du racine de n, l'usine de sucre,
# tes propres notes : signal ou bruit) → défi sondage à 2 étapes.
#
# Rendu brouillon :
#   python -m manim render -ql manim/scripts/journal/loi_normale.py LoiNormaleJournal --media_dir manim/scripts/journal/media
# Rendu final :
#   python -m manim render -qh manim/scripts/journal/loi_normale.py LoiNormaleJournal \
#     -o eleveai-maths-journal-loi-normale --media_dir manim/scripts/journal/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import math

import numpy as np

from manim import *

from charte import *
from mascotte import MascotteMargouillat

ROUGE = "#ef4444"
OR_ESCALIER = "#e8a013"


def binomiale(n, p=0.5):
    """P(X = k) pour k = 0..n (math.comb : exact, pas de scipy)."""
    return [math.comb(n, k) * p**k * (1 - p) ** (n - k) for k in range(n + 1)]


class JournalBase(Scene):
    """Helpers communs (mêmes que la série « en vrai » : lait_reunion.py)."""

    LARGEUR_SURE = 12.8

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def T(self, texte, size=28, color=WHITE, **kw):
        t = Text(texte, font_size=size, color=color, **kw)
        if t.width > self.LARGEUR_SURE:
            t.scale_to_fit_width(self.LARGEUR_SURE)
        return t

    def titre_ecran(self, texte):
        t = self.T(texte, size=38, color=JAUNE_TITRE).to_edge(UP)
        if not hasattr(self, "_tt"):
            self._tt = 0
        anim = [Write(t), FadeIn(t, shift=0.3 * DOWN), GrowFromCenter(t)][self._tt % 3]
        self._tt += 1
        self.play(anim)
        return t

    def anim_entree(self, m, mode=None, run_time=0.8):
        palette = ["fade_up", "pop", "slide_r", "grow", "fade_down", "slide_l", "write"]
        if mode is None:
            if not hasattr(self, "_ai"):
                self._ai = 0
            mode = palette[self._ai % len(palette)]
            self._ai += 1
        table = {
            "write": lambda: Write(m, run_time=run_time),
            "fade_up": lambda: FadeIn(m, shift=0.45 * UP, run_time=run_time),
            "fade_down": lambda: FadeIn(m, shift=0.45 * DOWN, run_time=run_time),
            "slide_r": lambda: FadeIn(m, shift=0.7 * RIGHT, run_time=run_time),
            "slide_l": lambda: FadeIn(m, shift=0.7 * LEFT, run_time=run_time),
            "pop": lambda: FadeIn(m, scale=0.5, run_time=run_time),
            "grow": lambda: GrowFromCenter(m, run_time=run_time),
        }
        return table[mode]()

    def legende_mobile(self):
        state = {"m": None, "k": 0}
        places = [(-3.4, 1.9), (3.1, -1.4), (0, 2.5), (-3.2, -0.2), (0, -2.7), (3.2, 1.5)]

        def dire(texte, size=26, couleur=BLEU_CALCUL, mode=None, pos=None):
            x, y = pos if pos is not None else places[state["k"] % len(places)]
            t = self.T(texte, size=size, color=couleur).move_to([x, y, 0])
            if t.width > self.LARGEUR_SURE - 1.0:
                t.scale_to_fit_width(self.LARGEUR_SURE - 1.0).move_to([0, y, 0])
            entree = self.anim_entree(t, mode=mode)
            if state["m"] is None:
                self.play(entree)
            else:
                self.play(FadeOut(state["m"], shift=0.2 * DOWN), entree)
            state["m"] = t
            state["k"] += 1
            return t

        return dire, state

    # ── les dessins partagés ────────────────────────────────────────────────

    def escalier_dessin(self, largeur=3.6, hauteur=2.2, couleur=OR_ESCALIER):
        """L'escalier du dessin d'origine : la binomiale n = 8 en marches."""
        probs = binomiale(8)
        pmax = max(probs)
        n = len(probs)
        pas = largeur / n
        pts = [np.array([-largeur / 2, 0, 0])]
        for k, p in enumerate(probs):
            y = hauteur * p / pmax
            pts.append(np.array([-largeur / 2 + k * pas, y, 0]))
            pts.append(np.array([-largeur / 2 + (k + 1) * pas, y, 0]))
        pts.append(np.array([largeur / 2, 0, 0]))
        return VMobject(color=couleur, stroke_width=5).set_points_as_corners(pts)

    def cloche_dessin(self, largeur=3.6, hauteur=2.2, couleur=BLEU_CALCUL):
        """La cloche lisse du dessin d'origine."""
        return ParametricFunction(
            lambda t: np.array([t * largeur / 2, hauteur * math.exp(-4.5 * t * t), 0]),
            t_range=[-1, 1], color=couleur, stroke_width=5,
        )

    # ── écran 0 : accueil = LE DESSIN ───────────────────────────────────────
    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = self.T("La courbe en cloche n'est pas tombée du ciel",
                       size=44, color=JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.T("Le Journal d'EleveAI — Un peu de maths", size=26,
                      color=WHITE).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(sous))

        note = self.T("Tout part d'un dessin sur une feuille à carreaux :",
                      size=26, color=WHITE).move_to([0, 1.15, 0])
        self.play(self.anim_entree(note, mode="fade_up"))

        # le dessin : escalier dentelé → flèche n → infini → cloche lisse
        esc = self.escalier_dessin().move_to([-3.9, -1.3, 0])
        clo = self.cloche_dessin().move_to([3.6, -1.3, 0])
        fleche = Arrow([-1.5, -1.2, 0], [1.3, -1.2, 0], color=WHITE, stroke_width=5)
        ninf = self.T("n → ∞", size=34, color=JAUNE_TITRE).next_to(fleche, UP, buff=0.2)

        self.play(Create(esc), run_time=1.8)
        lab1 = self.T("une courbe dentelée", size=22, color=OR_ESCALIER).next_to(esc, DOWN, buff=0.25)
        self.play(FadeIn(lab1, shift=0.3 * UP))
        self.play(GrowArrow(fleche), FadeIn(ninf, scale=0.5))
        self.play(Create(clo), run_time=1.6)
        lab2 = self.T("une courbe lisse", size=22, color=BLEU_CALCUL).next_to(clo, DOWN, buff=0.25)
        self.play(FadeIn(lab2, shift=0.3 * UP))
        self.wait(2.2)

        intuition = self.T("L'intuition : la courbe lisse est la LIMITE de la dentelée.",
                           size=26, color=VERT_OK).to_edge(DOWN, buff=0.4)
        self.play(self.anim_entree(intuition, mode="grow"))
        self.wait(2.6)

    # ── écran 1 : pile ou face → les coefficients de Pascal ─────────────────
    def ecran_pascal(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("D'où vient la dentelée ? D'un jeu de pile ou face")
        dire, _ = self.legende_mobile()

        piece = VGroup(
            Circle(radius=0.45, color=JAUNE_TITRE, fill_color=JAUNE_TITRE,
                   fill_opacity=0.25, stroke_width=5),
            self.T("P", size=34, color=JAUNE_TITRE),
        ).move_to([-5.8, 2.0, 0])
        self.play(self.anim_entree(piece, mode="pop"))
        dire("Je lance une pièce 4 fois.\nCombien de PILE ? 0, 1, 2, 3 ou 4.",
             pos=(3.35, 1.8), size=23)

        # le triangle de Pascal, lignes 0 → 4 (décalé à gauche : les légendes
        # vivent dans la colonne de droite)
        lignes = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]
        tri = VGroup()
        for i, ligne in enumerate(lignes):
            rang = VGroup(*[self.T(str(v), size=30, color=WHITE) for v in ligne])
            rang.arrange(RIGHT, buff=0.55).move_to([-2.6, 1.45 - i * 0.72, 0])
            tri.add(rang)
        for i, rang in enumerate(tri):
            self.play(LaggedStart(*[FadeIn(v, scale=0.5) for v in rang],
                                  lag_ratio=0.18), run_time=0.55)
        dire("Chaque nombre compte les\nCHEMINS pour y arriver.", size=23,
             pos=(3.35, 0.5))

        # la ligne 4 en couleur + le pic central
        derniere = tri[4]
        self.play(derniere.animate.set_color(OR_ESCALIER).scale(1.15))
        self.play(Circumscribe(derniere[2], color=VERT_OK, run_time=1.2))
        dire("6 chemins mènent à « 2 piles »,\nun seul à « 4 piles ».",
             couleur=VERT_OK, size=23, pos=(3.35, -0.8))

        # les coefficients deviennent des barres (la naissance de la bosse)
        barres = VGroup()
        vals = [1, 4, 6, 4, 1]
        for k, v in enumerate(vals):
            b = Rectangle(width=0.62, height=v * 0.28, color=OR_ESCALIER,
                          fill_color=OR_ESCALIER, fill_opacity=0.55, stroke_width=2)
            b.move_to([-4.2 + k * 0.8, -2.6 + v * 0.14, 0])
            barres.add(b)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.15))
        dire("Beaucoup de chemins au milieu,\ntrès peu aux bords : voilà la bosse.",
             couleur=OR_ESCALIER, size=23, pos=(3.35, -2.2))
        self.wait(2.6)

    # ── écran 2 : l'escalier se lisse en cloche (le théorème) ───────────────
    def barres_std(self, ax, n):
        """Les barres de la binomiale STANDARDISÉE (centrée-réduite) : la
        cloche reste fixe, l'escalier se raffine — on VOIT la convergence."""
        probs = binomiale(n)
        mu, sig = n / 2, math.sqrt(n) / 2
        g = VGroup()
        for k, p in enumerate(probs):
            z = (k - mu) / sig
            if abs(z) > 3.6:
                continue
            h = p * sig
            base = ax.c2p(z - 0.5 / sig, 0)
            haut = ax.c2p(z + 0.5 / sig, h)
            b = Rectangle(width=haut[0] - base[0], height=haut[1] - base[1],
                          color=OR_ESCALIER, fill_color=OR_ESCALIER,
                          fill_opacity=0.45, stroke_width=1.5)
            b.move_to([(base[0] + haut[0]) / 2, (base[1] + haut[1]) / 2, 0])
            g.add(b)
        return g

    def ecran_convergence(self):
        self.clear()
        self.add_mascotte(scale=0.45)
        self.titre_ecran("Fais grandir n : l'escalier devient la cloche")
        dire, _ = self.legende_mobile()

        ax = Axes(x_range=[-3.6, 3.6, 1], y_range=[0, 0.47, 0.1],
                  x_length=9.6, y_length=4.4,
                  axis_config={"include_tip": False, "stroke_width": 3, "color": WHITE},
                  ).shift(DOWN * 0.9)
        self.play(Create(ax), run_time=1.0)

        cloche = ax.plot(lambda z: math.exp(-z * z / 2) / math.sqrt(2 * math.pi),
                         x_range=[-3.6, 3.6], color=BLEU_CALCUL, stroke_width=6)
        b4 = self.barres_std(ax, 4)
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in b4], lag_ratio=0.1))
        self.play(Create(cloche), run_time=1.4)
        dire("n = 4 lancers : l'escalier est dentelé, la cloche bleue est loin.",
             pos=(-3.3, 2.3), size=24)
        self.wait(1.6)

        b16 = self.barres_std(ax, 16)
        self.play(Transform(b4, b16), run_time=1.4)
        dire("n = 16 : les marches se resserrent, l'escalier épouse la cloche...",
             pos=(3.0, 2.3), size=24)
        self.wait(1.6)

        b64 = self.barres_std(ax, 64)
        self.play(Transform(b4, b64), run_time=1.4)
        dire("n = 64 : on ne les distingue presque plus.", pos=(-3.3, 2.3),
             couleur=VERT_OK, size=24)
        self.wait(1.6)

        thm = self.T("C'est un théorème : De Moivre-Laplace (1733).",
                     size=26, color=JAUNE_TITRE).to_edge(DOWN, buff=0.35)
        self.play(self.anim_entree(thm, mode="grow"))
        self.wait(2.6)

    # ── écran 3 : CAS RÉEL 1 — le sondage (échantillon → population) ────────
    def ecran_sondage(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Cas réel 1 : de l'échantillon à la population")
        dire, _ = self.legende_mobile()

        # la population : une foule de points, l'échantillon en or
        foule = VGroup()
        rng = np.random.default_rng(974)
        for i in range(13 * 9):
            r, c = divmod(i, 13)
            d = Dot(radius=0.055, color=GREY_B).move_to(
                [-5.7 + c * 0.42, 1.9 - r * 0.42, 0])
            foule.add(d)
        self.play(FadeIn(foule, lag_ratio=0.01, run_time=1.4))
        dire("La Réunion : 860 000 personnes.\nImpossible de TOUT interroger.",
             pos=(3.2, 1.9), size=23)

        tires = rng.choice(len(foule), size=12, replace=False)
        self.play(LaggedStart(*[foule[i].animate.set_color(OR_ESCALIER).scale(1.9)
                                for i in tires], lag_ratio=0.08))
        dire("On en tire 1 000 AU HASARD :\nl'échantillon.",
             couleur=OR_ESCALIER, pos=(3.2, 0.7), size=23)
        self.wait(1.2)

        # la cloche de l'estimation + la fourchette
        clo = self.cloche_dessin(largeur=4.4, hauteur=1.7).move_to([3.3, -1.55, 0])
        axe = Line([0.9, -2.4, 0], [5.7, -2.4, 0], color=WHITE, stroke_width=3)
        g50 = self.T("50 %", size=22, color=WHITE).move_to([3.3, -2.75, 0])
        fourchette = Rectangle(width=1.35, height=2.1, color=VERT_OK,
                               fill_color=VERT_OK, fill_opacity=0.18,
                               stroke_width=2).move_to([3.3, -1.5, 0])
        self.play(Create(axe), FadeIn(g50), Create(clo), run_time=1.4)
        self.play(GrowFromCenter(fourchette))
        borne = self.T("± 3 points", size=26, color=VERT_OK).next_to(fourchette, UP, buff=0.15)
        self.play(self.anim_entree(borne, mode="pop"))
        dire("La cloche donne la FOURCHETTE :\nle vrai score de TOUTE l'île est à\n± 3 points (19 fois sur 20).",
             couleur=VERT_OK, pos=(-3.2, -2.35), size=23)
        self.wait(2.4)

        regle = self.T("La règle : marge ≈ 1 ÷ √n   (1 ÷ √1000 ≈ 3 %)",
                       size=26, color=JAUNE_TITRE).to_edge(DOWN, buff=0.35)
        self.play(self.anim_entree(regle, mode="fade_up"))
        self.wait(2.6)

    # ── écran 4 : CAS RÉEL 2 — l'usine de sucre ─────────────────────────────
    def ecran_usine(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Cas réel 2 : l'usine de sucre")
        dire, _ = self.legende_mobile()

        # le tapis roulant et les paquets
        tapis = Line([-6.2, 0.2, 0], [2.6, 0.2, 0], color=GREY_B, stroke_width=8)
        self.play(Create(tapis), run_time=0.8)
        paquets = VGroup()
        poids = ["998 g", "1 003 g", "1 001 g", "997 g", "1 002 g"]
        for i, p in enumerate(poids):
            paq = VGroup(
                Rectangle(width=1.15, height=1.0, color=WHITE, fill_color=WHITE,
                          fill_opacity=0.12, stroke_width=3),
                self.T("SUCRE", size=17, color=WHITE).shift(UP * 0.22),
                self.T(p, size=19, color=OR_ESCALIER).shift(DOWN * 0.22),
            ).move_to([-5.4 + i * 1.55, 0.85, 0])
            paquets.add(paq)
        self.play(LaggedStart(*[FadeIn(p, shift=0.5 * RIGHT) for p in paquets],
                              lag_ratio=0.2), run_time=1.6)
        dire("Chaque paquet affiche 1 kg... mais aucun ne pèse EXACTEMENT 1 kg.",
             pos=(0, 2.45), size=24)
        self.wait(1.2)

        # les poids s'empilent en cloche
        clo = self.cloche_dessin(largeur=4.6, hauteur=1.8, couleur=OR_ESCALIER).move_to([0, -2.2, 0])
        axe = Line([-2.8, -3.0, 0], [2.8, -3.0, 0], color=WHITE, stroke_width=3)
        kg = self.T("1 kg", size=22, color=WHITE).move_to([0, -3.35, 0])
        self.play(Create(axe), FadeIn(kg))
        self.play(Create(clo), run_time=1.4)
        dire("On pèse QUELQUES paquets par heure : leurs poids dessinent une cloche.",
             couleur=OR_ESCALIER, pos=(-3.4, -0.6), size=23)
        self.wait(1.4)
        fleches = VGroup(
            Arrow([-0.9, -2.1, 0], [-0.25, -2.1, 0], color=VERT_OK, stroke_width=4, buff=0),
            Arrow([0.9, -2.1, 0], [0.25, -2.1, 0], color=VERT_OK, stroke_width=4, buff=0),
        )
        self.play(*[GrowArrow(f) for f in fleches])
        dire("Cloche étroite = machine bien réglée. Cloche large = alerte !\nQuelques paquets suffisent à surveiller TOUTE la production.",
             couleur=VERT_OK, pos=(3.2, -0.6), size=23)
        self.wait(2.6)

    # ── écran 5 : CAS RÉEL 3 — tes notes (signal ou bruit) ──────────────────
    def ecran_notes(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Cas réel 3 : tes propres notes")
        dire, _ = self.legende_mobile()

        # la droite des notes 0 → 20
        axe = NumberLine(x_range=[0, 20, 5], length=10.4, color=WHITE,
                         include_numbers=True, font_size=26,
                         stroke_width=3).move_to([0, -0.6, 0])
        self.play(Create(axe), run_time=1.0)

        notes = [10, 12, 11, 13, 9, 12.5, 11.5]
        pts = VGroup(*[Dot(axe.n2p(v) + UP * 0.32, radius=0.09, color=BLEU_CALCUL)
                       for v in notes])
        self.play(LaggedStart(*[FadeIn(p, shift=0.4 * DOWN) for p in pts], lag_ratio=0.15))
        dire("Tes notes de l'année : elles dansent\nautour de TA moyenne (ici 11).",
             pos=(-3.2, 1.5), size=23)

        bande = Rectangle(width=axe.n2p(15)[0] - axe.n2p(7)[0], height=1.1,
                          color=VERT_OK, fill_color=VERT_OK, fill_opacity=0.15,
                          stroke_width=2).move_to([(axe.n2p(7)[0] + axe.n2p(15)[0]) / 2, -0.35, 0])
        self.play(GrowFromCenter(bande))
        dire("Ta fourchette normale :\n« entre 7 et 15, c'est TOI ».",
             couleur=VERT_OK, pos=(-3.4, 1.5), size=23)
        self.wait(1.4)

        mauvaise = Dot(axe.n2p(8) + UP * 0.32, radius=0.13, color=ROUGE)
        self.play(GrowFromCenter(mauvaise), Flash(mauvaise.get_center(), color=ROUGE))
        dire("Un 8, un jour sans ? Du BRUIT.\nNe te juge JAMAIS sur une note.",
             couleur=ROUGE, pos=(3.3, 1.5), size=23)
        self.wait(2.2)

        # le vrai progrès : toute la cloche se déplace
        groupe = VGroup(pts, bande, mauvaise)
        decal = axe.n2p(3)[0] - axe.n2p(0)[0]
        self.play(groupe.animate.shift(RIGHT * decal), run_time=1.6)
        dire("Le VRAI progrès, c'est quand toute ta cloche se déplace.",
             couleur=JAUNE_TITRE, pos=(0, -2.55), size=26)
        self.wait(2.8)

    # ── écran 6 : un peu d'histoire ─────────────────────────────────────────
    def ecran_histoire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Un peu d'histoire")
        dire, _ = self.legende_mobile()

        lignes = VGroup(
            self.T("1733 · Abraham de Moivre — pour les joueurs de cartes", size=26),
            self.T("1809 · Carl Friedrich Gauss — pour les erreurs des astronomes", size=26),
            self.T("1873 · Francis Galton — la planche à clous", size=26),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([-0.6, 1.3, 0])
        for i, l in enumerate(lignes):
            self.play(self.anim_entree(l, mode=["slide_r", "slide_l", "fade_up"][i]))
        self.wait(1.0)

        # la planche de Galton : des billes tombent à pile ou face... et
        # s'empilent en cloche (notre machine, en bois).
        vals = [1, 3, 6, 9, 6, 3, 1]
        piles = VGroup()
        for c, v in enumerate(vals):
            for r in range(v):
                piles.add(Dot(radius=0.085, color=OR_ESCALIER)
                          .move_to([-1.8 + c * 0.6, -2.9 + r * 0.24, 0]))
        self.play(LaggedStart(*[FadeIn(b, shift=1.4 * DOWN) for b in piles],
                              lag_ratio=0.03), run_time=2.4)
        dire("Des billes tombent au hasard...\net s'empilent TOUJOURS en cloche.", couleur=OR_ESCALIER,
             pos=(3.2, -1.6), size=23)
        self.wait(2.6)

    # ── écran 7 : le défi (2 étapes) ────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.55)
        titre = self.T("Défi : ton premier sondage", size=42, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        enonce = self.T("Tu interroges 400 personnes au hasard.", size=30,
                        color=WHITE).move_to([0, 1.6, 0])
        self.play(self.anim_entree(enonce, mode="fade_up"))

        # le dessin du défi : la petite foule interrogée
        foule = VGroup(*[Dot(radius=0.06, color=OR_ESCALIER)
                         .move_to([-1.9 + (i % 10) * 0.42, 0.65 - (i // 10) * 0.34, 0])
                         for i in range(30)])
        n400 = self.T("n = 400", size=28, color=OR_ESCALIER).next_to(foule, RIGHT, buff=0.6)
        self.play(FadeIn(foule, lag_ratio=0.02), FadeIn(n400, scale=0.5))

        q1 = self.T("Étape 1 : combien vaut √400 ?", size=28,
                    color=BLEU_CALCUL).move_to([0, -1.15, 0])
        q2 = self.T("Étape 2 : la marge = 1 ÷ √400... en points de % ?", size=28,
                    color=BLEU_CALCUL).move_to([0, -1.85, 0])
        self.play(self.anim_entree(q1, mode="slide_r"))
        self.play(self.anim_entree(q2, mode="slide_l"))

        pause = self.T("Mets pause et cherche !", size=30,
                       color=ORANGE_RETENUE).to_edge(DOWN, buff=0.45)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 8 : la correction ─────────────────────────────────────────────
    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        e1 = self.T("√400 = 20   (car 20 × 20 = 400)", size=32, color=WHITE).move_to([0, 1.3, 0])
        self.play(self.anim_entree(e1, mode="fade_up"))
        self.wait(1.2)

        e2 = self.T("marge = 1 ÷ 20 = 0,05 = 5 points", size=34, color=VERT_OK).move_to([0, 0.2, 0])
        self.play(self.anim_entree(e2, mode="grow"))
        self.play(Flash(e2.get_center(), color=ORANGE_RETENUE))

        lecture = self.T("Ton sondage dit 50 % ? Le vrai score de la population\nest entre 45 % et 55 %, 19 fois sur 20.",
                         size=26, color=BLEU_CALCUL).move_to([0, -1.3, 0])
        self.play(self.anim_entree(lecture, mode="fade_up"))
        bonus = self.T("Pour une marge 2 fois plus petite, il faut 4 fois plus de monde !",
                       size=24, color=ORANGE_RETENUE).to_edge(DOWN, buff=0.45)
        self.play(self.anim_entree(bonus, mode="slide_r"))
        self.wait(3.0)

    # ── écran 9 : à retenir ─────────────────────────────────────────────────
    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = self.T("À retenir", size=44, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        points = VGroup(
            self.T("1. La cloche est la LIMITE des coefficients de Pascal (1733).", size=27),
            self.T("2. Un petit échantillon au hasard révèle toute la population : marge ≈ 1 ÷ √n.", size=27),
            self.T("3. Une note isolée, c'est du bruit — le progrès, c'est ta cloche qui bouge.", size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to([0, 0.3, 0])
        self.play(LaggedStart(*[FadeIn(p, shift=0.35 * RIGHT) for p in points], lag_ratio=0.35))

        devise = self.T("De l'individu vers l'humanité :\nde l'échantillon vers la population.",
                        size=30, color=JAUNE_TITRE).move_to([0, -1.55, 0])
        self.play(self.anim_entree(devise, mode="grow"))
        self.wait(1.2)
        art = self.T("L'article complet et sa machine : eleveai.fr/loi-normale",
                     size=24, color=BLEU_CALCUL).move_to([0, -2.55, 0])
        self.play(self.anim_entree(art, mode="pop"))
        signature = self.T(SIGNATURE, size=26, color=VERT_OK).to_edge(DOWN)
        self.play(Write(signature))
        self.wait(3.0)


class LoiNormaleJournal(JournalBase):
    def construct(self):
        self.ecran_accueil()
        self.ecran_pascal()
        self.ecran_convergence()
        self.ecran_sondage()
        self.ecran_usine()
        self.ecran_notes()
        self.ecran_histoire()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()
