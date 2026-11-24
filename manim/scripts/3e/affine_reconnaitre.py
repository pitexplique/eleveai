# affine_reconnaitre.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 01 : RECONNAÎTRE une fonction affine.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE.
# Métier : Maya, monteuse vidéo (trois clients : 20 € la minute ; 50 € le projet + 15 € la minute ;
# des miniatures carrées de x cm de côté) : f(x) = 20x, g(x) = 15x + 50, h(x) = x².
# Écrans (clés de manim/voix/3e-affine-reconnaitre.json) :
#   00-garde        page de garde, échelle des ceintures (jaune grandie), un repère : droite ou courbe ?
#   01-monteuse     Maya, ses trois clients, les trois formules f, g, h
#   02-forme        la forme « un nombre × x + un nombre » = ax + b ; a et b de g ; f linéaire ; h pas affine
#   03-droites      le repère (minutes, euros) : f et g droites, f par l'origine, g coupe l'axe vertical à 50,
#                   h une courbe
#   03q / 03r       QUESTION 1 (5 s) : laquelle est affine ? réponse C (3 − 2x)
#   04-deguisee     les fonctions déguisées : 5(x + 10) = 5x + 50 ; le tarif fixe 0 × x + 100, droite horizontale
#   05q / 05r       QUESTION 2 (5 s) : f(x) = 4x, comment l'appeler ? réponse A (linéaire, et aussi affine)
#   06-defi         à toi : 2(x + 3) et x(x + 1) − x²
#   06b-correction  2x + 6 affine ; x² + x − x² = x, linéaire donc affine
#   07-finale       « Ce que tu as appris » (titre en haut, centré)
#   08-abonne       la fin commune (manim/fin_commune.py)
# Lettres des questions : 03q → C ; 05q → A.
# Code couleur : x bleu ; a (coefficient directeur) orange ; b (ordonnée à l'origine) violet ; juste vert ;
# piège rouge ; droite de f bleue, droite de g orange, courbe de h rouge.
# Voix : manim/voix/3e-affine-reconnaitre.json (validée) ; marques : affine_reconnaitre_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_reconnaitre.py AffineReconnaitre3e --media_dir manim/scripts/3e/media-affine-01-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_reconnaitre.py AffineReconnaitre3e -o eleveai-maths-3e-affine-reconnaitre --media_dir manim/scripts/3e/media-affine-01
# Sortie : manim/sorties/3e/maths/fonctions-affines/01-reconnaitre/eleveai-maths-3e-affine-reconnaitre.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, pastille, croix  # noqa: E402
from ident_factoriser import IdentFactoriser3e  # noqa: E402

PAROLE["²"] = "carré"
PAROLE["€"] = "euros"
PAROLE["ax"] = "a x"
PAROLE["0"] = "0"  # relatif_commun le fait dire « zéro » : ici la voix dit « 0 »

COUL_A = ORANGE_RETENUE   # a : le coefficient directeur
COUL_B = "#a78bfa"        # b : l'ordonnée à l'origine
COUL_F = INCONNUE         # la droite de f
COUL_G = ORANGE_RETENUE   # la droite de g
COUL_H = PIEGE            # la courbe de h (pas affine)
GRIS_AXE = "#94a3b8"


def A(s, fs=40, couleur=WHITE, audit=True):
    """Une écriture : x en bleu, a en orange, b en violet (« ax » : a orange, x bleu)."""
    e = E(s, fs, couleur, lettres="x", audit=audit)
    for at in e.atomes:
        t = at.original_text
        if t == "a":
            at.set_color(COUL_A)
        elif t == "b":
            at.set_color(COUL_B)
        elif t == "ax":
            at[0].set_color(COUL_A)
            at[1].set_color(INCONNUE)
    return e


class Repere(VGroup):
    """Un repère dessiné à la main (pas de LaTeX) : origine o, largeur w, hauteur h.
    Graduations ≥ 28 pt (données de figure : sans audit), axes nommés. .p(x, y) : le point à l'écran."""

    def __init__(self, xmax, ymax, xpas, ypas, w, h, o, nom_x="", nom_y="", fs=28, nombres=True, xs=None, ys=None,
                 **kw):
        super().__init__(**kw)
        self.o = np.array(o, dtype=float)
        self.kx, self.ky = w / xmax, h / ymax
        self.ax = Arrow(self.o, self.o + RIGHT * (w + 0.35), buff=0, stroke_width=3, tip_length=0.16,
                        max_tip_length_to_length_ratio=0.1, color=GRIS_AXE)
        self.ay = Arrow(self.o, self.o + UP * (h + 0.35), buff=0, stroke_width=3, tip_length=0.16,
                        max_tip_length_to_length_ratio=0.1, color=GRIS_AXE)
        self.ticks, self.labels = VGroup(), VGroup()
        if nombres:
            for v in (xs or range(xpas, xmax + 1, xpas)):
                c = self.p(v, 0)
                self.ticks.add(Line(c + DOWN * 0.08, c + UP * 0.08, color=GRIS_AXE, stroke_width=3))
                self.labels.add(T(str(v), fs, "#e2e8f0", audit=False).next_to(c, DOWN, buff=0.14))
            for v in (ys or range(ypas, ymax + 1, ypas)):
                c = self.p(0, v)
                self.ticks.add(Line(c + LEFT * 0.08, c + RIGHT * 0.08, color=GRIS_AXE, stroke_width=3))
                self.labels.add(T(str(v), fs, "#e2e8f0", audit=False).next_to(c, LEFT, buff=0.14))
            self.labels.add(T("0", fs, "#e2e8f0", audit=False).next_to(self.o, DL, buff=0.08))
        self.noms = VGroup()
        if nom_x:
            self.noms.add(T(nom_x, fs, GRIS_AXE, audit=False).next_to(self.ax.get_end(), UP, buff=0.12)
                          .align_to(self.ax.get_end(), RIGHT))
        if nom_y:
            self.noms.add(T(nom_y, fs, GRIS_AXE, audit=False).next_to(self.ay.get_end(), RIGHT, buff=0.15))
        self.add(self.ax, self.ay, self.ticks, self.labels, self.noms)

    def p(self, x, y):
        return self.o + RIGHT * x * self.kx + UP * y * self.ky

    def droite(self, f, x0, x1, couleur, sw=6):
        return Line(self.p(x0, f(x0)), self.p(x1, f(x1)), color=couleur, stroke_width=sw)

    def courbe(self, f, x0, x1, couleur, sw=6):
        return ParametricFunction(lambda t: self.p(t, f(t)), t_range=[x0, x1, 0.05], color=couleur, stroke_width=sw)


def maya(s=0.72, fs=34):
    """Maya, monteuse vidéo : son ordinateur portable, une vidéo et sa ligne de montage à l'écran."""
    m = Metier(["Maya", "monteuse vidéo"], fs=fs, peau="#e0ac69", tenue="#be185d", cheveux="#3b1f0e", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.08)
    p = m.perso
    ecran = RoundedRectangle(width=1.25 * s, height=0.82 * s, corner_radius=0.05, fill_color="#0f172a",
                             fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
    lecture = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.11 * s)
    lecture.move_to(ecran.get_center() + UP * 0.1 * s)
    pistes = VGroup(*[Rectangle(width=w * s, height=0.09 * s, fill_color=c, fill_opacity=1, stroke_width=0)
                      for w, c in ((0.34, "#3b82f6"), (0.22, "#f97316"), (0.3, "#22c55e"))])
    pistes.arrange(RIGHT, buff=0.04 * s).move_to(ecran.get_bottom() + UP * 0.14 * s)
    clavier = Polygon(P(-0.7, 0), P(0.7, 0), P(0.8, -0.12), P(-0.8, -0.12), fill_color="#94a3b8", fill_opacity=1,
                      stroke_width=0).scale(s)
    clavier.next_to(ecran, DOWN, buff=0)
    ordi = VGroup(ecran, lecture, pistes, clavier).next_to(p.corps, RIGHT, buff=0.05).align_to(p.corps, DOWN)
    p.add(ordi)
    return m


def miniature(c=0.95):
    """Une miniature carrée (une image de vidéo) de côté x."""
    cadre = Square(c, fill_color="#1e3a8a", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    soleil = Circle(radius=c * 0.12, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    soleil.move_to(cadre.get_center() + P(c * 0.22, c * 0.22))
    mont = Polygon(cadre.get_corner(DL), cadre.get_corner(DL) + P(c * 0.4, c * 0.5),
                   cadre.get_corner(DL) + P(c * 0.7, c * 0.2), cadre.get_corner(DR) + P(0, c * 0.35),
                   cadre.get_corner(DR), fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    return VGroup(cadre, soleil, mont)


def masque():
    """Un masque de carnaval : la fonction déguisée."""
    corps = Ellipse(width=2.2, height=0.95, fill_color="#7c3aed", fill_opacity=1, stroke_color="#c4b5fd",
                    stroke_width=3)
    yeux = VGroup(*[Ellipse(width=0.55, height=0.3, fill_color="#0b1220", fill_opacity=1, stroke_width=0)
                    .move_to(P(dx, 0.08)) for dx in (-0.45, 0.45)])
    plumes = VGroup(*[Ellipse(width=0.16, height=0.6, fill_color=c, fill_opacity=1, stroke_width=0)
                      .rotate(a).move_to(P(0.75 + dx, 0.6)) for c, a, dx in
                      (("#f472b6", 0.5, -0.12), ("#facc15", 0.2, 0.05), ("#22d3ee", -0.15, 0.2))])
    baton = Line(P(1.0, -0.3), P(1.5, -1.1), color="#d6d3d1", stroke_width=6)
    return VGroup(baton, plumes, corps, yeux)


class AffineReconnaitre3e(IdentFactoriser3e):
    nom_voix = "3e-affine-reconnaitre"
    fichier_marques = "affine_reconnaitre_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"

    def la(self, s, y, fs=40, c=WHITE, x0=0.25, maxw=6.2):
        """Une ligne calée à gauche en x0 (x bleu, a orange, b violet), signalée si elle rétrécit."""
        e = A(s, fs, c)
        if e.width > maxw:
            print(f"RETRECI « {s} » {e.width:.2f} > {maxw:.2f}", flush=True)
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y)).align_to(P(x0, 0), LEFT)

    def _taille(self, t, ref=36):
        """La taille réelle (pt) d'un Text posé, mesurée contre le même texte à ref pt."""
        return ref * t.height / max(1e-6, Text(t.original_text, font_size=ref).height)

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        cartes, pause = r[2], r[3]
        # -ql 22/11 : la carte C et « Mets pause » touchaient Ti-Margo : une carte ne s'étend pas plus loin que
        # son texte (+ la place de la coche), et jamais au-delà de x = 5,0 dans le bas de l'écran.
        gauche = min(c[0].get_left()[0] for c in cartes)
        besoin = max(c[1].get_right()[0] for c in cartes) + 1.0 - gauche
        larg = min(cartes[0][0].width, max(besoin, 3.0))
        if cartes.get_bottom()[1] < -1.6 and besoin > 5.0 - gauche:
            # -ql 22/11 (2e passe) : les textes longs débordaient des cartes bornées à 5,0 : cartes tassées
            # (0,72 de haut) pour finir au-dessus de Ti-Margo (haut −2,2), et alors elles peuvent s'allonger.
            haut = cartes.get_top()[1]
            for c in cartes:
                c[0].stretch_to_fit_height(0.72)
                c[1].set_y(c[0].get_y())
            cartes.arrange(DOWN, buff=0.1, aligned_edge=LEFT)
            cartes.shift(UP * (haut - cartes.get_top()[1]))
            larg = besoin if cartes.get_bottom()[1] > -2.1 else min(larg, 5.0 - gauche)
            pause.next_to(cartes, DOWN, buff=0.2).align_to(cartes, LEFT)
        elif cartes.get_bottom()[1] < -1.6:
            larg = min(larg, 5.0 - gauche)
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        # 3e relecture -ql 22/11 : les cartes de la question 2 mordaient sur le repère (à gauche jusqu'à −3,8)
        gmin = getattr(self, "_gauche_q", None)
        if gmin is not None and cartes.get_left()[0] < gmin:
            cartes.shift(RIGHT * (gmin - cartes.get_left()[0]))
        # 3e relecture -ql 22/11 : « Mets pause, et choisis ! » sur une ligne à ~28 pt → deux lignes à 36,
        # à droite des cartes (modèle du 02), ou dessous si la place manque
        neuf = VGroup(T("Mets pause,", 36, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 36, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, RIGHT, buff=0.3).set_y(cartes.get_y())
        if neuf.get_right()[0] > 6.6:
            neuf.next_to(cartes, DOWN, buff=0.2).align_to(cartes, LEFT)
        pause = neuf
        r = (r[0], r[1], cartes, neuf) + tuple(r[4:])
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE {self._cle_voix} cartes {cartes.get_left()[0]:.2f}…{cartes.get_right()[0]:.2f} / "
                  f"{cartes.get_bottom()[1]:.2f} pause {neuf.get_right()[0]:.2f} / {neuf.get_bottom()[1]:.2f}", flush=True)
            for m in self.mobjects:
                if type(m).__name__.startswith("Mascotte"):
                    for nom, g in (("cartes", cartes), ("pause", pause)):
                        if g.get_right()[0] > m.get_left()[0] - 0.2 and g.get_bottom()[1] < m.get_top()[1] + 0.2:
                            print(f"MARGO {nom} x≤{g.get_right()[0]:.2f} y≥{g.get_bottom()[1]:.2f}", flush=True)
            for c in r[2]:
                corps = c[1][1]
                if isinstance(corps, Text):
                    pt = self._taille(corps)
                    if pt < 32:
                        print(f"TAILLE-CARTE « {corps.original_text} » {pt:.0f} pt", flush=True)
        return r

    def monter_reponse(self, bonne):
        """Celui de la série (cartes effacées, réponse sous la bonne) ; AUDIT : taille de la réponse
        (≥ 36 pt attendus, signalée sous 34) et chevauchement de Ti-Margo."""
        super().monter_reponse(bonne)
        self._verifier_reponse()

    def _verifier_reponse(self):
        if os.environ.get("AUDIT") == "1":
            ph = self.ph_q
            pt = self._taille(ph[0])
            if pt < 34:
                print(f"TAILLE-REPONSE {self._cle_voix} {pt:.0f} pt", flush=True)
            for m in self.mobjects:
                if type(m).__name__.startswith("Mascotte"):
                    if ph.get_right()[0] > m.get_left()[0] and ph.get_bottom()[1] < m.get_top()[1]:
                        print(f"MARGO {self._cle_voix} réponse x≤{ph.get_right()[0]:.2f} y≥{ph.get_bottom()[1]:.2f}",
                              flush=True)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître une fonction affine", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Reconnaître", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        r = Repere(4, 4, 1, 1, 2.6, 2.3, P(-6.0, -1.55), nombres=False)
        d = r.droite(lambda x: 0.6 * x + 0.8, 0, 4, COUL_F)
        c = r.courbe(lambda x: 0.25 * x * x, 0, 3.9, COUL_H)
        self.play(FadeIn(r), Create(d), run_time=0.6)
        l1 = self.la("Comment savoir si", 0.85, 46, x0=-1.6, maxw=7.9)
        self.dit(l1, "Comment savoir si")
        l2 = self.la("une fonction est affine ?", 0.1, 46, JAUNE_TITRE, x0=-1.6, maxw=7.9)
        self.dit(l2, "une fonction est affine ?")
        self.play(Create(c), run_time=0.6)
        self.insister(l2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Maya et ses trois clients ──────────────────────────────────────
    def ecran_monteuse(self):
        self.ecran("01-monteuse")
        m = maya(1.01, 34)  # -ql 22/11 : Maya × 1,4 (elle faisait 0,9 de haut)
        m.perso.move_to(P(-4.85, 2.3))
        x0 = -3.0
        l0 = self.la("Maya, monteuse vidéo.", 3.05, 42, CIEL, x0=x0, maxw=8.0)
        self.poser_gestes(l0, "Maya est monteuse vidéo.", {0: lambda: [FadeIn(m.perso, shift=UP * 0.3)]})
        l0b = self.la("Trois clients la paient.", 2.35, 38, x0=x0, maxw=6.0)
        self.dit(l0b, "Trois clients la paient.")
        xp, xd, xf = -5.95, -5.45, 1.5
        p1 = pastille("1", CIEL, 0.27).move_to(P(xp, 0.65))
        l1 = self.la("20 € par minute.", 0.65, 38, x0=xd, maxw=5.4)
        self.dit(l1, "Le premier : 20 euros par minute de vidéo montée.", avec=[FadeIn(p1, scale=1.3)])
        p2 = pastille("2", CIEL, 0.27).move_to(P(xp, -0.3))
        l2 = self.la("50 € le projet,", -0.3, 38, x0=xd, maxw=5.4)
        self.dit(l2, "Le deuxième : 50 euros pour le projet,", avec=[FadeIn(p2, scale=1.3)])
        l2b = self.la("+ 15 € par minute.", -0.92, 38, x0=xd, maxw=5.4)
        self.dit(l2b, "plus 15 euros par minute.")
        img = miniature(0.85).move_to(P(0.55, -2.25))  # -ql 22/11 : à droite de « carrées », marge 0,5
        fl = DoubleArrow(img.get_corner(UL) + UP * 0.18, img.get_corner(UR) + UP * 0.18, buff=0, stroke_width=3,
                         tip_length=0.13, max_tip_length_to_length_ratio=0.25, color=WHITE)
        lx = T("x", 34, INCONNUE, audit=False).next_to(fl, UP, buff=0.05)
        p3 = pastille("3", CIEL, 0.27).move_to(P(xp, -1.85))
        l3 = self.la("miniatures carrées,", -1.85, 38, x0=xd, maxw=5.4)
        self.poser_gestes(l3, "Le troisième veut des miniatures carrées,",
                          {0: lambda: [FadeIn(p3, scale=1.3), FadeIn(img, scale=0.8)]})
        l3b = self.la("de x cm de côté.", -2.5, 38, x0=xd, maxw=5.4)
        self.poser_gestes(l3b, "de x centimètres de côté.", {1: lambda: [GrowFromCenter(fl), FadeIn(lx)]})
        lp = self.la("Pour x minutes :", 1.45, 34, CIEL, x0=xf, maxw=4.7)
        self.dit(lp, "Pour x minutes :")
        f1 = self.la("f(x) = 20x", 0.65, 44, x0=xf, maxw=4.7)
        self.dire_eq(f1, "f de x égale 20 x.", echelle=1.15)
        f2 = self.la("g(x) = 15x + 50", -0.61, 42, x0=xf, maxw=4.75)
        self.dire_eq(f2, "g de x égale 15 x plus 50.", echelle=1.15)
        self.au("l'aire de la miniature", Indicate(img, color=JAUNE_TITRE, scale_factor=1.1), rt=0.4)
        f3 = self.la("h(x) = x²", -2.17, 44, x0=xf, maxw=4.7)
        self.dire_eq(f3, "h de x égale x au carré.", echelle=1.15)
        self.insister(VGroup(f1, f2, f3), 1.05, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : la forme ax + b ────────────────────────────────────────────────
    def ecran_forme(self):
        self.ecran("02-forme")
        x0, xa = -6.3, -1.0  # -ql 22/11 : au moins 0,4 entre « g(x) = 15x + 50 » et « Pour g »
        rf = self.la("f(x) = 20x", 1.15, 40, x0=x0, maxw=4.5)
        rg = self.la("g(x) = 15x + 50", -0.45, 40, x0=x0, maxw=4.5)
        rh = self.la("h(x) = x²", -1.8, 40, x0=x0, maxw=4.5)
        for e in (rf, rg, rh):
            e.sans_audit()
        self.play(FadeIn(VGroup(rf, rg, rh)), run_time=0.3)
        l1 = self.la("Même forme : un nombre × x + un nombre", 3.05, 39, x0=x0, maxw=12.6)
        self.poser_gestes(l1, "la même forme : un nombre fois x, plus un nombre.",
                          {0: lambda: [Indicate(VGroup(rf, rg), color=JAUNE_TITRE, scale_factor=1.06)]})
        l2 = self.la("C'est une fonction affine : ax + b", 2.2, 44, x0=x0, maxw=12.6)
        self.dire_eq(l2, "C'est une fonction affine : a x plus b.", echelle=1.1)
        cad = SurroundingRectangle(VGroup(*l2.atomes[-3:]), color=JAUNE_TITRE, buff=0.14, stroke_width=4,
                                   corner_radius=0.08)
        self.play(Create(cad), run_time=0.3)
        # g : a = 15, b = 50
        lg = self.la("Pour g, a = 15 et b = 50.", -0.45, 38, x0=xa, maxw=7.2)
        self.poser_gestes(lg, "Pour g, a vaut 15 et b vaut 50.",
                          {5: lambda: [rg.atomes[5].animate.set_color(COUL_A)],
                           9: lambda: [rg.atomes[8].animate.set_color(COUL_B)]})
        # f : b = 0, linéaire
        lf = self.la("Pour f, b = 0 : f est linéaire,", 1.15, 38, x0=xa, maxw=7.2)
        self.poser_gestes(lf, "Pour f, b vaut 0 : f est linéaire,",
                          {1: lambda: [Indicate(rf, color=JAUNE_TITRE, scale_factor=1.06)]})
        lf2 = self.la("prix proportionnel à la durée.", 0.4, 36, CIEL, x0=xa, maxw=7.4)
        self.dit(lf2, "le prix est proportionnel à la durée.")
        # h : pas affine
        lh = self.la("h : x² = x × x.", -1.8, 40, x0=xa, maxw=6.1)
        self.poser_gestes(lh, "Et h ? x au carré, c'est x fois x.",
                          {0: lambda: [Indicate(rh, color=JAUNE_TITRE, scale_factor=1.06)]})
        lh2 = self.la("Pas un nombre × x :", -2.5, 40, PIEGE, x0=xa, maxw=6.1)
        self.dit(lh2, "pas un nombre fois x :")
        x_h = croix(rh, PIEGE, 0.32).move_to(rh)
        v_h = self.verdict("Pas affine", PIEGE, 34)
        v_h.next_to(rh, DOWN, buff=0.3).align_to(P(x0, 0), LEFT)
        lh3 = self.la("h n'est pas affine.", -3.15, 40, PIEGE, x0=xa, maxw=6.1)
        self.poser_gestes(lh3, "h n'est pas affine.", {4: lambda: [Create(x_h)], 5: lambda: [FadeIn(v_h, scale=1.3)]})
        self.attendre_voix(marge=0.8)

    # ── 03 : sur un graphique ───────────────────────────────────────────────
    def ecran_droites(self):
        self.ecran("03-droites")
        r = Repere(14, 250, 2, 50, 4.9, 4.9, P(-5.75, -2.75), nom_x="minutes", nom_y="euros")
        self.play(FadeIn(r), run_time=0.4)
        df = r.droite(lambda x: 20 * x, 0, 12, COUL_F)  # -ql 22/11 : coupées sous 250
        dg = r.droite(lambda x: 15 * x + 50, 0, 12.6, COUL_G)
        ch = r.courbe(lambda x: x * x, 0, 14, COUL_H)
        nf = T("f", 38, COUL_F, audit=False).move_to(r.p(9.6, 150))
        ng = T("g", 38, COUL_G, audit=False).move_to(r.p(2.2, 112))
        nh = T("h", 38, COUL_H, audit=False).next_to(r.p(14, 196), RIGHT, buff=0.12)
        x0, mw = -0.1, 6.35
        l1 = self.la("Sur un graphique,", 3.05, 40, CIEL, x0=x0, maxw=mw)
        self.dit(l1, "Sur un graphique,")
        l2 = self.la("f et g : des droites.", 2.35, 40, x0=x0, maxw=mw)
        self.dit(l2, "f et g donnent des droites.")
        self.play(Create(df), Create(dg), FadeIn(nf), FadeIn(ng), run_time=0.8)
        oo = Dot(r.p(0, 0), radius=0.11, color=COUL_F)
        l3 = self.la("f passe par l'origine :", 1.6, 40, x0=x0, maxw=mw)
        self.poser_gestes(l3, "f passe par l'origine :", {5: lambda: [GrowFromCenter(oo)]})
        self.play(Flash(oo, color=COUL_F, line_length=0.18), run_time=0.4)
        l4 = self.la("elle est linéaire.", 0.9, 40, x0=x0 + 0.4, maxw=mw)
        self.dit(l4, "elle est linéaire.")
        pb = Dot(r.p(0, 50), radius=0.11, color=COUL_B)
        l5 = self.la("g coupe l'axe vertical", 0.1, 40, x0=x0, maxw=mw)
        self.poser_gestes(l5, "g coupe l'axe vertical",
                          {4: lambda: [Indicate(r.ay, color=JAUNE_TITRE, scale_factor=1.0)]})
        l5b = self.la("à 50.", -0.6, 40, x0=x0 + 0.4, maxw=mw)
        self.poser_gestes(l5b, "à 50.", {1: lambda: [GrowFromCenter(pb), r.labels[7].animate.set_color(COUL_B)]})
        l6 = self.la("Et h : une courbe,", -1.35, 40, x0=x0, maxw=mw)
        self.dit(l6, "Et h donne une courbe,")
        self.play(Create(ch), FadeIn(nh), run_time=0.8)
        l7 = self.la("qui monte de plus", -2.05, 40, x0=x0, maxw=5.3)
        self.dit(l7, "qui monte de plus")
        l7b = self.la("en plus vite.", -2.75, 40, x0=x0, maxw=5.3)
        self.dit(l7b, "en plus vite.")
        self.play(Indicate(ch, color=JAUNE_TITRE, scale_factor=1.0), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.7  # -ql 22/11 : la réponse sortait petite ; la colonne s'élargit
        m = maya(1.35, 36)  # -ql 22/11 : × 1,5
        m.perso.move_to(P(-4.15, -0.95))
        q = T("?", 96, JAUNE_TITRE, audit=False).next_to(m.perso, UP, buff=0.35)
        self.add(m.perso)

        def avant(sc):
            sc.play(FadeIn(q, scale=1.4), run_time=0.3)

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_gestes(0, "Réponse C :", "Réponse C :", {}, premier=True)
            sc.ph_gestes(1, "3 − 2x = −2x + 3.", "3 moins 2 x, c'est moins 2 x plus 3.", {})
            sc.ph_gestes(2, "a = −2 et b = 3.", "a vaut moins 2, et b vaut 3.", {})
            sc.ph_gestes(3, "L'ordre ne change rien.", "L'ordre des termes ne change rien.", {})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Laquelle est affine ?"],
                            [X("x² + 3", 34), X("3 ÷ x", 34), X("3 − 2x", 34)], 2,
                            ["Réponse C :", "3 − 2x = −2x + 3.", "a = −2 et b = 3.", "L'ordre ne change rien."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : les fonctions déguisées ────────────────────────────────────────
    def ecran_deguisee(self):
        self.ecran("04-deguisee")
        mq = masque().scale(0.95).move_to(P(-4.75, 1.4))
        x0, mw = -2.2, 8.4
        l1 = self.la("Attention aux fonctions", 2.95, 42, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l1, "Attention aux fonctions")
        l1b = self.la("déguisées !", 2.25, 42, JAUNE_TITRE, x0=x0, maxw=mw)
        self.poser_gestes(l1b, "déguisées.", {0: lambda: [FadeIn(mq, scale=0.7)]})
        l2 = self.la("Le deuxième client", 1.35, 38, CIEL, x0=x0, maxw=mw)
        self.dit(l2, "Le deuxième client")
        l2b = self.la("change de formule :", 0.7, 38, CIEL, x0=x0, maxw=mw)
        self.dit(l2b, "change de formule :")
        e1 = self.la("g(x) = 5(x + 10)", -0.2, 50, x0=x0 + 0.4, maxw=mw)
        tete = list(e1.atomes[:5])
        self.dire_eq(e1, "5 fois la parenthèse x plus 10.", avec=[FadeIn(VGroup(*tete))], sauf=tete, echelle=1.15)
        l3 = self.la("On développe : 5x + 50.", -1.05, 42, x0=x0, maxw=mw)
        self.dit(l3, "On développe : 5 x plus 50.")
        l4 = self.la("Affine, cachée derrière", -1.85, 40, VERT_OK, x0=x0, maxw=7.2)
        self.poser_gestes(l4, "affine, cachée derrière",
                          {2: lambda: [mq.animate.shift(UP * 0.3).set_opacity(0.35)]})
        l4b = self.la("une parenthèse.", -2.55, 40, VERT_OK, x0=x0, maxw=7.2)
        self.dit(l4b, "une parenthèse.", avec=[Indicate(e1, color=JAUNE_TITRE, scale_factor=1.05)])
        # le tarif fixe : une autre moitié d'écran, avec son repère
        r = Repere(10, 150, 2, 50, 3.8, 3.9, P(-5.6, -2.6), nom_x="minutes", nom_y="euros")
        dh = r.droite(lambda x: 100, 0, 10, COUL_G)
        self.au("Et un tarif", FadeOut(VGroup(l1, l1b, l2, l2b, e1, l3, l4, l4b, mq)), FadeIn(r), rt=0.3)
        x0, mw = -0.7, 6.9
        l5 = self.la("Tarif fixe : 100 €,", 2.9, 42, x0=x0, maxw=mw)
        self.dit(l5, "tarif fixe, 100 euros")
        l5b = self.la("quelle que soit la durée ?", 2.2, 36, CIEL, x0=x0, maxw=mw)
        self.dit(l5b, "quelle que soit la durée ?")
        l6 = self.la("0 × x + 100 : a = 0.", 1.25, 44, x0=x0, maxw=mw)
        self.dit(l6, "0 fois x plus 100 : a vaut 0.")
        l7 = self.la("C'est encore affine !", 0.35, 42, VERT_OK, x0=x0, maxw=mw)
        self.dit(l7, "C'est encore une fonction affine.")
        l8 = self.la("Sa droite est horizontale.", -0.5, 38, x0=x0, maxw=mw)
        self.poser_gestes(l8, "Sa droite est horizontale.", {3: lambda: [Create(dh)]})
        self.play(r.labels[6].animate.set_color(COUL_B), Indicate(dh, color=JAUNE_TITRE, scale_factor=1.0),
                  run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.3  # -ql 22/11 : cartes à ~20 pt ; la colonne s'élargit, les choix raccourcissent
        r = Repere(5, 20, 1, 5, 3.3, 4.3, P(-5.6, -2.7), nom_x="x", nom_y="f(x)")
        d = r.droite(lambda x: 4 * x, 0, 5, COUL_F)
        oo = Dot(r.p(0, 0), radius=0.11, color=VERT_OK)
        self._gauche_q = r.get_right()[0] + 0.45

        def avant(sc):
            sc._lq = sc.ligne_q("f(x) = 4x.", "f de x égale 4 x.", {0: lambda: [FadeIn(r)]})

        def apres(sc):
            # -ql 22/11 : cinq lignes sous la question tombaient à 23 pt. L'énoncé s'efface, la bonne carte
            # monte à sa place : la réponse a la hauteur d'être à 36 pt.
            ok, cartes, ph = sc.mobjects[-1], sc.cartes_q, sc.ph_q
            dv = UP * (sc._lq.get_top()[1] - cartes[0].get_top()[1])
            sc.play(FadeOut(sc._lq), FadeOut(sc.q_q), FadeOut(cartes[1]), FadeOut(cartes[2]),
                    cartes[0].animate.shift(dv), ok.animate.shift(dv), run_time=0.2)
            haut = cartes[0].get_bottom()[1] - 0.3
            ph.arrange(DOWN, aligned_edge=LEFT, buff=0.2)
            k = min(sc._h36 / ph[0].height, (6.3 - sc.XL) / ph.width, (haut + 3.15) / ph.height)
            ph.scale(k).next_to(P(0, haut), DOWN, buff=0).align_to(P(sc.XL, 0), LEFT)
            sc._verifier_reponse()
            sc.ph_gestes(0, "Réponse A :", "Réponse A :", {}, premier=True)
            sc.ph_gestes(1, "4x = 4x + 0 : b = 0,", "4 x, c'est 4 x plus 0. b vaut 0,", {})
            sc.ph_gestes(2, "donc f est linéaire.", "donc f est linéaire.", {3: lambda: [GrowFromCenter(oo)]})
            sc.play(Create(d), run_time=0.6)
            sc.ph_gestes(3, "Une linéaire est", "une fonction linéaire est", {})
            sc.ph_gestes(4, "une affine particulière.", "une fonction affine particulière.", {})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["f(x) = 4x.", "Comment l'appeler ?"],
                            ["linéaire et affine", "linéaire, pas affine", "ni l'une ni l'autre"], 0,
                            ["Réponse A :", "4x = 4x + 0 : b = 0,", "donc f est linéaire.",
                             "Une linéaire est", "une affine particulière."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL
        self._gauche_q = None

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        m = maya(1.08, 34)  # -ql 22/11 : × 1,5
        m.perso.move_to(P(-4.75, -2.0))
        q = T("?", 72, JAUNE_TITRE, audit=False).next_to(m.perso, UP, buff=0.3)
        self.play(FadeIn(m.perso), run_time=0.3)
        x0 = -2.7
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        l1 = self.la("Ces fonctions sont-elles affines ?", 1.95, 38, x0=x0, maxw=9.0)
        self.dit(l1, "Ces fonctions sont-elles affines ?", avec=[FadeIn(q, scale=1.4)])
        p1 = pastille("1", CIEL, 0.3).move_to(P(x0 + 0.3, 0.95))
        e1 = A("f(x) = 2(x + 3)", 52).next_to(p1, RIGHT, buff=0.3)
        self.dire_eq(e1, "f de x égale 2 fois la parenthèse x plus 3.", avec=[FadeIn(p1, scale=1.3)], echelle=1.15)
        p2 = pastille("2", CIEL, 0.3).move_to(P(x0 + 0.3, -0.4))
        e2 = A("g(x) = x(x + 1) − x²", 52).next_to(p2, RIGHT, buff=0.3)
        self.dire_eq(e2, "g de x égale x fois la parenthèse x plus 1, moins x au carré.",
                     avec=[FadeIn(p2, scale=1.3)], echelle=1.15)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -1.9)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, e1=e1, e2=e2, p1=p1, p2=p2, pz=pz, autres=VGroup(m.perso, q, l1))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        x0 = -6.3
        self.dire("06b-correction")
        tit = T("Correction", 52, JAUNE_TITRE).move_to(P(0, 3.05)).align_to(P(x0, 0), LEFT)
        e1, e2, p1, p2 = d["e1"], d["e2"], d["p1"], d["p2"]
        g1, g2 = VGroup(p1, e1), VGroup(p2, e2)
        c1 = g1.copy().scale(0.85).align_to(P(x0, 0), LEFT).set_y(2.2)
        c2 = g2.copy().scale(0.85).align_to(P(x0, 0), LEFT).set_y(-0.15)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["autres"]),
                Transform(g1, c1), Transform(g2, c2), rt=0.45)
        xi = x0 + 0.9
        s1 = self.la("On développe : 2x + 6.", 1.45, 42, x0=xi, maxw=6.8)
        self.dit(s1, "on développe. 2 x plus 6")
        s1b = self.a_cote(A("a = 2, b = 6.", 42), s1, buff=0.4, i_e=0, i_ref=0)
        self.dit(s1b, "a vaut 2, b vaut 6.")
        s1c = self.la("f est affine.", 0.75, 44, VERT_OK, x0=xi, maxw=6.0)
        self.dit(s1c, "f est affine.")
        self.play(Create(self.cadre_ok(s1c, 0.12)), run_time=0.25)
        s2 = self.la("x(x + 1) = x² + x", -0.9, 42, x0=xi, maxw=8.0)
        self.dire_eq(s2, "x fois la parenthèse x plus 1, c'est x au carré plus x.", echelle=1.1)
        s3 = self.la("On enlève x² : il reste x.", -1.6, 42, x0=xi, maxw=8.0)
        b1 = self.barrer(VGroup(*s2.atomes[7:9]))
        self.poser_gestes(s3, "On enlève x au carré : il reste x.", {2: lambda: [Create(b1)]})
        s4 = self.la("g est linéaire, donc affine aussi.", -2.35, 44, VERT_OK, x0=xi, maxw=9.9)
        self.dit(s4, "g est linéaire, donc affine aussi.")
        self.play(Create(self.cadre_ok(s4, 0.12)), run_time=0.25)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        r = Repere(4, 4, 1, 1, 3.3, 4.6, P(-6.2, -2.7), nom_x="x", nom_y="y", nombres=False)  # -ql 22/11 : plus grand
        d_aff = r.droite(lambda x: 0.55 * x + 1.4, 0, 4, COUL_F)
        d_lin = r.droite(lambda x: 1.0 * x, 0, 3.7, VERT_OK)
        d_cst = r.droite(lambda x: 0.45, 0, 4, COUL_G)  # en bas : ne traverse plus le texte
        pb = Dot(r.p(0, 1.4), radius=0.09, color=COUL_B)
        oo = Dot(r.p(0, 0), radius=0.09, color=VERT_OK)
        self.play(Write(tit), FadeIn(r), run_time=0.6)
        x0, mw = -2.0, 8.3

        def ok(e):
            k = self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y()))
            return [Create(k)]

        y = [2.25, 1.55, 0.7, 0.0, -0.85, -1.7, -2.4]
        l0 = self.la("Affine : ax + b,", y[0], 42, x0=x0, maxw=mw)
        self.poser_gestes(l0, "Une fonction affine s'écrit a x plus b,", {0: lambda: ok(l0)})
        l1 = self.la("et sa courbe est une droite.", y[1], 40, x0=x0, maxw=mw)
        self.poser_gestes(l1, "et sa courbe est une droite.", {5: lambda: [Create(d_aff), FadeIn(pb)]})
        l2 = self.la("Si b = 0, elle est linéaire :", y[2], 40, x0=x0, maxw=mw)
        self.poser_gestes(l2, "Si b vaut 0, elle est linéaire :", {0: lambda: ok(l2)})
        l3 = self.la("sa droite passe par l'origine.", y[3], 38, x0=x0, maxw=mw)
        self.poser_gestes(l3, "sa droite passe par l'origine.",
                          {6: lambda: [Create(d_lin), GrowFromCenter(oo)]})
        l4 = self.la("Si a = 0, elle est constante.", y[4], 40, x0=x0, maxw=mw)
        self.poser_gestes(l4, "Si a vaut 0, elle est constante.",
                          {0: lambda: ok(l4), 7: lambda: [Create(d_cst)]})
        l5 = self.la("Avant de décider,", y[5], 40, x0=x0, maxw=mw)
        self.poser_gestes(l5, "Avant de décider,", {0: lambda: ok(l5)})
        l6 = self.la("on développe et on réduit.", y[6], 38, VERT_OK, x0=x0, maxw=7.2)
        self.dit(l6, "on développe et on réduit.")
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_monteuse()
        self.ecran_forme()
        self.ecran_droites()
        self.ecran_question1()
        self.ecran_deguisee()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
