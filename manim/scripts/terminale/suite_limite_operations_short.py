# suite_limite_operations_short.py
# EleveAI — Maths Terminale (spé) — short « ∞ − ∞, ça ne fait pas 0 »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 35. Micro du coach : limite_suite_operations (forme
# indéterminée « ∞ − ∞ » : FI du renfort, genOpsFI : n² − an…).
#   · 00-garde       : le titre, l'échelle (70 %), le pari « ∞ − ∞ ne fait pas
#                      0 ? » ; EN BAS les deux villes en silhouette dès le titre ;
#   · 01-situation   : EN HAUT Amina, géographe, et les deux villes qui
#                      grandissent ; EN BAS, EN MÊME TEMPS, « A : n² + 5n » et
#                      « B : n² » (milliers d'habitants) ;
#   · 02-infini      : les villes montent encore, « → +∞ » sur les deux lignes ;
#                      la flèche orange de l'écart, « l'écart ? » ;
#   · 03/03b         : question-pause (B : +∞), 3 s ; l'écart vaut 5n, il
#                      grandit sans fin ; « « ∞ − ∞ », ce n'est pas 0 » ;
#   · 04-commentaire : au bout de 10 ans, quel écart ? (réponse 50 milliers,
#                      NON affichée) ; « Réponds en commentaire ! » ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = la ville A (uₙ), violet = la ville B,
# orange = l'écart, vert = juste, rouge = le piège.
# Voix : manim/voix/terminale-suite-limite-operations-short.json (débit −6),
# calée par suite_limite_operations_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_limite_operations_short.py SuiteLimiteOperationsShort -o eleveai-maths-terminale-suite-limite-operations-short --media_dir manim/scripts/terminale/media-suite-limite-operations-short

import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_interpreter import OutilsLimite  # noqa: E402
from suite_limite_operations import VIOLET, VerifMargo  # noqa: E402

A = [n * n + 5 * n for n in range(30)]
B = [n * n for n in range(30)]
assert all(A[n] - B[n] == 5 * n for n in range(30))          # la réponse B : 5n → +∞
assert A[10] - B[10] == 50                                    # le commentaire : 50 milliers
PEAU = "#a16207"
KV = 0.02                                                     # hauteur d'un millier d'habitants


def amina(s=1.0):
    """Amina, géographe : foulard vert, chemise claire, une carte dépliée."""
    foulard = Circle(radius=0.34, fill_color="#15803d", fill_opacity=1, stroke_width=0).move_to(P(0, 1.02))
    tete = Circle(radius=0.24, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#f8fafc", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    carte = VGroup(*[Polygon(P(x, -0.25 + d), P(x + 0.22, -0.25 - d), P(x + 0.22, 0.2 - d), P(x, 0.2 + d),
                             fill_color=c, fill_opacity=1, stroke_width=0)
                     for x, d, c in ((0.05, 0.04, "#fbbf24"), (0.27, -0.04, "#86efac"), (0.49, 0.04, "#fbbf24"))])
    route = Line(P(0.1, -0.1), P(0.65, 0.05), stroke_color=PIEGE, stroke_width=2)
    return VGroup(corps, foulard, tete, carte, route).scale(s)


def ville(h, couleur, x, y0, larg=1.3):
    """Une ville : trois immeubles posés sur y0 (le plus haut au milieu, de hauteur h), des fenêtres."""
    g = VGroup()
    for dx, k, w in ((-0.42, 0.62, 0.42), (0.0, 1.0, 0.46), (0.42, 0.78, 0.4)):
        hh = max(h * k, 0.02)
        im = Rectangle(width=w * larg / 1.3, height=hh, stroke_color=WHITE, stroke_width=1.5, fill_color=couleur,
                       fill_opacity=0.85).move_to(P(x + dx * larg / 1.3, y0 + hh / 2))
        g.add(im)
        for j in range(int(hh / 0.22)):
            g.add(Square(0.07, stroke_width=0, fill_color="#fef9c3", fill_opacity=0.9)
                  .move_to(P(x + dx * larg / 1.3, y0 + 0.14 + 0.22 * j)))
    return g


class SuiteLimiteOperationsShort(VerifMargo, OutilsLimite, ShortSuites):
    fichier_marques = "suite_limite_operations_short_marques.json"
    nom_voix = "terminale-suite-limite-operations-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.86
    buff_boutons = 0.16
    y_tete_question = 3.52
    place_coche = -0.08
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle des ceintures

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.05)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22, x=None):
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return self.montrer(g, avec, rt=rt, avec_k=avec_k, rt_mid=rt_mid)

    def partie(self, g, ks):
        """Les morceaux ks d'une ligne déjà construite (pour en montrer une partie)."""
        sous = VGroup(*[g[k] for k in ks])
        sous.extraits = [g.extraits[k] for k in ks]
        sous.textes = [g.textes[k] for k in ks]
        return sous

    def entete(self, titre, extrait=None, fs=44):
        """Comme l'entête commun, mais le titre plus haut et l'échelle (70 %) plus bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE, 3.9).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton : rond A/B/C, le corps (≈ 36 pt), marge ≥ 20 px, la coche à droite sans toucher le texte."""
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 36, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.32 - 0.75
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.32)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.36),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def villes(self, n_t, y_t, k=KV, xa=-0.95, xb=0.95, larg=1.3, lettres=True):
        """Les deux villes (A bleue, B violette), hauteurs n² + 5n et n² (en milliers) au rang n_t,
        posées sur le sol y_t (qui peut glisser), avec leurs lettres A et B dessous."""
        def dessin():
            n, y0 = n_t.get_value(), y_t.get_value()
            g = VGroup(Line(P(xa - 0.8 * larg / 1.3, y0), P(xb + 0.8 * larg / 1.3, y0), stroke_color=GREY_B,
                            stroke_width=3),
                       ville((n * n + 5 * n) * k, TERME, xa, y0, larg), ville(n * n * k, VIOLET, xb, y0, larg))
            if lettres:
                for x, L, c in ((xa, "A", TERME), (xb, "B", VIOLET)):
                    g.add(self.t(L, 32, c, audit=False).move_to(P(x, y0 - 0.26)))
            return g
        return always_redraw(dessin)

    def ecart(self, n_t, y_t, k=KV, x=0.0):
        """La double flèche orange de l'écart (5n), entre le haut de B et le haut de A."""
        def dessin():
            n, y0 = n_t.get_value(), y_t.get_value()
            ha, hb = y0 + (n * n + 5 * n) * k, y0 + n * n * k
            return VGroup(DashedLine(P(x - 0.25, hb), P(0.95, hb), color=RAISON, stroke_width=3, dash_length=0.07),
                          DoubleArrow(P(x, hb), P(x, ha), buff=0, color=RAISON, stroke_width=5, tip_length=0.14))
        return always_redraw(dessin)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS les deux villes ──
        self.dire("00-garde")
        n_t, y_t = ValueTracker(4.0), ValueTracker(-2.5)
        vil = self.villes(n_t, y_t, lettres=False)
        self.entete("Limites", extrait="Limites")
        self.play(FadeIn(vil, shift=UP * 0.2), run_time=0.4)        # le bas n'est jamais vide
        self.ligne([("Tu paries que", WHITE, "Tu paries")], 1.95, fs=46)
        self.ligne([("∞ − ∞", RAISON, "infini moins")], 0.85, fs=100, larg=4.0)
        self.ligne([("ça ne fait pas", WHITE, "ça ne fait"), ("0 ?", PIEGE, "pas 0")], -0.3, fs=48)
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT Amina et les villes qui grandissent ; EN BAS les formules EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s, vil))
        self.remove(vil)
        vil = self.villes(n_t, y_t)
        self.add(vil)
        # la ville A en bleu, la ville B en violet : leurs formules ont leur couleur
        fa = self.construire([("n²", TERME, "n au carré"), ("+ 5n", TERME, "plus 5"), ("→ +∞", JUSTE, None)], 46, 1e9)
        fb = self.construire([("n²", VIOLET, "n au carré"), ("→ +∞", JUSTE, None)], 46, 1e9)
        kf = min(1.0, 3.8 / fa.width)          # les deux lignes à la MÊME taille
        for g, y in ((fa, -1.2), (fb, -1.9)):
            g.scale(kf).move_to(P(0, y)).align_to(P(-1.88, 0), LEFT)
        trous = VGroup(*[DashedVMobject(RoundedRectangle(width=VGroup(*g[:-1]).width + 0.3, height=0.66,
                                                         corner_radius=0.1, stroke_color=c, stroke_width=3),
                                        num_dashes=24).move_to(VGroup(*g[:-1])) for g, c in ((fa, TERME), (fb, VIOLET))])
        perso = amina(0.55).move_to(P(-1.45, 1.75))
        nom = self.t("Amina", 44, JAUNE_TITRE).move_to(P(0.6, 2.1))
        metier = self.t("géographe", 36, TERME).move_to(P(0.6, 1.55))
        self.au_mot("Amina")
        self.play(y_t.animate.set_value(-0.35), Create(trous),
                  FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("géographe")
        self.play(FadeIn(metier, shift=UP * 0.08), run_time=0.3)
        self.au_mot("grandissent")
        self.play(n_t.animate.set_value(5), run_time=0.8)
        self.au_mot("la ville A")
        self.montrer(self.partie(fa, [0, 1]), avec=[FadeOut(trous[0])])
        mil = self.t("en milliers d'habitants", 36, GREY_A).move_to(P(0, -2.55))
        self.au_mot("milliers")
        self.play(FadeIn(mil, shift=UP * 0.08), run_time=0.3)
        self.au_mot("la ville B")
        self.montrer(self.partie(fb, [0]), avec=[FadeOut(trous[1])])
        self.attendre_voix(marge=0.3)

        # ── 02 : les deux → +∞ ; et l'écart ? ──
        self.dire("02-infini")
        self.au_mot("plus l'infini")
        self.play(FadeIn(fa[2], shift=RIGHT * 0.1), FadeIn(fb[1], shift=RIGHT * 0.1), n_t.animate.set_value(6),
                  run_time=0.5)
        ec = self.ecart(n_t, y_t)
        lab = self.t("l'écart ?", 32, RAISON).move_to(P(1.15, 0.8))
        self.au_mot("l'écart")
        self.play(FadeIn(ec), FadeIn(lab, scale=1.2), run_time=0.35)
        self.insister(lab, 1.1)
        self.attendre_voix(marge=0.3)
        vil.clear_updaters()
        ec.clear_updaters()

        # ── 03 : question-pause → B (+∞) ──
        g1 = self.construire([("L'écart,", WHITE, "L'écart")], 42)
        g2 = self.construire([("n²", RAISON, "n au carré"), ("+ 5n", RAISON, "plus 5"), ("− n²", RAISON, "moins n")],
                             50)
        g3 = self.construire([("tend vers :", WHITE, "tend vers")], 42)

        def dessin():
            """Le bas ne reste pas vide : les deux villes et l'écart attendent les cadres des boutons."""
            na, ya = ValueTracker(6.0), ValueTracker(-2.2)
            va, ea = self.villes(na, ya, k=0.017, lettres=False), self.ecart(na, ya, k=0.017)
            self._attente_q = VGroup(va, ea)
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), run_time=0.3)
            va.clear_updaters()
            ea.clear_updaters()
            for g in (g1, g2, g3):
                self.montrer(g, rt=0.22)
            liste.clear()
        liste = [(g1, None), (g2, None), (g3, None)]
        q = self.poser_question("03-question", liste,
                                [self.choix([("0", "0")], 40), self.choix([("+∞", "plus l'infini")], 40),
                                 self.choix([("5", "5")], 40)], 1, dessin=dessin)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        n_t, y_t, K2 = ValueTracker(6.0), ValueTracker(0.45), 0.015
        vil = self.villes(n_t, y_t, k=K2)
        ec = self.ecart(n_t, y_t, k=K2)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[0]), FadeOut(q.cartes[2]),
                  VGroup(q.cartes[1], ok).animate.move_to(P(0, 2.95)), run_time=0.3)
        self.play(FadeIn(vil), FadeIn(ec), run_time=0.3)
        self.ligne([("L'écart vaut", WHITE, "L'écart vaut"), ("5n :", RAISON, "5 n")], -0.3, fs=46)
        self.ligne([("il grandit sans fin.", JUSTE, "il grandit")], -1.0, fs=44,
                   avec=[n_t.animate.set_value(8.5)], rt=0.8)
        self.ligne([("« ∞ − ∞ »,", PIEGE, "Infini moins")], -1.75, fs=52)
        fin = self.ligne([("ce n'est pas", WHITE, "ce n'est"), ("0.", PIEGE, "pas 0")], -2.45, fs=46)
        self.insister(fin, 1.08)
        self.attendre_voix(marge=0.4)
        vil.clear_updaters()
        ec.clear_updaters()

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        n_t, y_t = ValueTracker(6.0), ValueTracker(2.25)
        vil = self.villes(n_t, y_t, k=0.0075, larg=1.0, xa=-0.75, xb=0.75, lettres=False)
        # un grand « ? » attend en bas jusqu'à l'appel (la moitié basse jamais vide)
        qm = self.t("?", 150, RAISON, audit=False).move_to(P(0, -1.75)).set_opacity(0.55)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(vil), FadeIn(qm, scale=0.8), run_time=0.35)
        vil.clear_updaters()
        self.ligne([("au bout de", WHITE, "au bout"), ("10 ans,", JAUNE_TITRE, "10 ans")], 1.45, fs=44)
        self.ligne([("quel est l'écart", RAISON, "quel est")], 0.75, fs=46)
        self.ligne([("entre les deux villes,", WHITE, "entre les deux")], 0.1, fs=40)
        self.ligne([("en milliers d'habitants ?", GREY_A, "en milliers")], -0.55, fs=36)
        self.au_mot("Réponds en commentaire")
        appel = self.paragraphe([("Réponds en", JUSTE), ("commentaire !", JUSTE)], 44, buff=0.08, y=-1.75,
                                larg=self.largeur_texte / 1.1)
        self.play(FadeOut(qm, scale=0.8), FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque lettre
        à « A : », son contenu quand la voix le dit."""
        att = getattr(self, "_attente_q", None)
        if att is None:
            return super().q_montrer_choix(cartes)
        self._attente_q = None
        for k, (c, L) in enumerate(zip(cartes, "ABC")):
            self.suivre(f"{L} : ")
            debut = [FadeOut(att, shift=DOWN * 0.15), *[FadeIn(b[0]) for b in cartes]] if k == 0 else []
            self.play(*debut, FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.25)
            self.montrer_liste(c[1][1])
