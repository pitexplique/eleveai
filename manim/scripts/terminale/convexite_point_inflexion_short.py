# convexite_point_inflexion_short.py
# EleveAI — Maths Tle spé — short « Point d'inflexion » (9:16), ceinture BLANCHE.
# Micro du coach : convexite_point_inflexion. Paysage jumelle :
# convexite_point_inflexion.py (même code couleur).
#   · 00 : un nouveau jeu vidéo sort : en HAUT la manette, le compteur de
#          joueurs et les joueurs qui arrivent ; en BAS la courbe en S qui se
#          trace EN MÊME TEMPS (jours en abscisse, grille) ;
#   · 01 : la tangente glisse le long de la courbe (le compteur suit le point
#          de contact) : creux bleu, bosse orange, la bascule = point d'inflexion ;
#   · 02 : question-pause (la tangente au point d'inflexion : A traverse) +
#          compte à rebours de 3 s ; réponse : au-dessus avant, au-dessous après ;
#   · 03 : « à quel jour se trouve le point d'inflexion ? » : la grille des
#          jours permet de lire 10, rien n'est écrit au point ;
#   · 04 : « Entraîne-toi sur eleveai.fr ».
# Code couleur : bleu = creux (convexe), orange = bosse (concave), jaune = le
# point d'inflexion, violet = la tangente, vert = la bonne réponse.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-convexite-point-inflexion-short.json (débit −6),
# calée par convexite_point_inflexion_short_marques.json.
# AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/terminale/convexite_point_inflexion_short.py ConvexitePointInflexionShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/convexite_point_inflexion_short.py ConvexitePointInflexionShort -o eleveai-maths-terminale-convexite-point-inflexion-short --media_dir manim/scripts/terminale/media-convexite-point-inflexion-short
# Sortie : manim/sorties/terminale/maths/analyse/convexite-point-inflexion/

import math
import os
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

LARGEUR_MAX = 3.6  # ×1,15 quand on insiste : 4,14 < 4,23 (marge de 3 %)
FOND_CARTE = "#0b1220"
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
TANGENTE = VIOLET_ACCENT
POINT_I = JAUNE_TITRE
JOUEURS_MAX = 100000
# le repère du graphique (en bas) : jours 0 → 21, joueurs (sur 1) 0 → 1,1
XA, XB, YA, YB = 0, 21, 0, 1.1
X0, Y0, X1, Y1 = -1.85, -2.25, 1.95, -0.5


def joueurs(t):
    """Les joueurs cumulés (sur 1), jour t ; inflexion au jour 10."""
    return 1 / (1 + math.exp(-(t - 10) / 2.5))


def pente(t):
    c = joueurs(t)
    return c * (1 - c) / 2.5


def G(x, y):
    return P(X0 + (x - XA) / (XB - XA) * (X1 - X0), Y0 + (y - YA) / (YB - YA) * (Y1 - Y0))


def courbe(a, b, color=WHITE, sw=5, n=120):
    m = VMobject(stroke_color=color, stroke_width=sw)
    m.set_points_smoothly([G(x, joueurs(x)) for x in np.linspace(a, b, n)])
    return m


def tangente(u, L=2.3, color=TANGENTE, sw=5):
    """La tangente au jour u, longueur L à l'écran, centrée sur le contact."""
    a, b = G(u, joueurs(u)), G(u + 1, joueurs(u) + pente(u))
    d = (b - a) / np.linalg.norm(b - a)
    # rognée pour rester dans le cadre (marge de 3 % : |x| ≤ 2,05)
    k1 = min(L / 2, (a[0] + 2.05) / max(d[0], 1e-6))
    k2 = min(L / 2, (2.05 - a[0]) / max(d[0], 1e-6))
    return Line(a - d * k1, a + d * k2, color=color, stroke_width=sw)


def zone(a, b, color, u=10, op=0.5, n=50):
    """Entre la courbe et la tangente au jour u, sur [a ; b]."""
    y0, m = joueurs(u), pente(u)
    haut = [G(x, joueurs(x)) for x in np.linspace(a, b, n)]
    bas = [G(x, y0 + m * (x - u)) for x in np.linspace(b, a, n)]
    return Polygon(*haut, *bas, stroke_width=0, fill_color=color, fill_opacity=op)


def manette(s=1.0):
    """Une manette de jeu : le corps, deux poignées, la croix, quatre boutons."""
    corps = RoundedRectangle(width=1.5, height=0.62, corner_radius=0.28, fill_color="#334155", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    poignees = VGroup(*[Circle(radius=0.3, fill_color="#334155", fill_opacity=1, stroke_color=GREY_B,
                               stroke_width=2).move_to(P(dx, -0.2)) for dx in (-0.52, 0.52)])
    croix = VGroup(Rectangle(width=0.32, height=0.1), Rectangle(width=0.1, height=0.32))
    croix.set_fill(WHITE, 1).set_stroke(width=0).move_to(P(-0.45, 0.02))
    boutons = VGroup(*[Dot(P(0.45 + dx, 0.02 + dy), radius=0.055, color=c) for (dx, dy), c in
                       zip([(0, 0.12), (0.12, 0), (0, -0.12), (-0.12, 0)], [VERT_OK, ROUGE_ERREUR, BLEU_CALCUL,
                                                                             JAUNE_TITRE])])
    return VGroup(poignees, corps, croix, boutons).scale(s)


def joueur(color):
    tete = Circle(radius=0.075, fill_color=color, fill_opacity=1, stroke_width=0)
    corps = RoundedRectangle(width=0.2, height=0.15, corner_radius=0.07, fill_color=color, fill_opacity=1,
                             stroke_width=0).next_to(tete, DOWN, buff=0.02)
    return VGroup(tete, corps)


def nombre_fr(n):
    """45 210 : l'espace des milliers, à la française."""
    return f"{n:,}".replace(",", " ")


assert nombre_fr(45210) == "45 210"
assert abs(joueurs(10) - 0.5) < 1e-12 and max(range(1, 21), key=pente) == 10


class ConvexitePointInflexionShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "convexite_point_inflexion_short_marques.json"
    nom_voix = "terminale-convexite-point-inflexion-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def sans_audit(self, mob):
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    # ── le décor : la grille des jours (en bas) ─────────────────────────────

    def grille(self):
        g = VGroup()
        for k in range(1, 21):
            g.add(Line(G(k, 0), G(k, YB), stroke_width=1.2 if k % 5 else 2, color=GREY_D if k % 5 else GREY_C,
                       stroke_opacity=0.6 if k % 5 else 0.8))
        for y in (0.25, 0.5, 0.75, 1.0):
            g.add(Line(G(0, y), G(XB, y), stroke_width=1.2, color=GREY_D, stroke_opacity=0.6))
        kw = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.13, max_tip_length_to_length_ratio=0.06)
        axes = VGroup(Arrow(G(0, 0), G(XB, 0), **kw), Arrow(G(0, 0), G(0, YB), **kw))
        nums = self.sans_audit(VGroup(*[Text(str(k), font_size=20, color=GREY_A).next_to(G(k, 0), DOWN, buff=0.07)
                                        for k in (0, 5, 10, 15, 20)]))
        jours = self.t("jours", 20, GREY_A).next_to(G(XB, 0), UP, buff=0.06).align_to(G(XB, 0), RIGHT)
        nomj = self.t("joueurs", 20, GREY_A).next_to(G(0, YB), RIGHT, buff=0.1)
        return g, axes, nums, jours, nomj

    # ── le jeu (en haut) : la manette, le compteur, les joueurs ────────────

    def jeu(self, u):
        m = manette(0.85).move_to(P(-1.15, 1.55))
        foule = VGroup(*[joueur(CONVEXE if i < 10 else CONCAVE) for i in range(20)])
        foule.arrange_in_grid(rows=4, cols=5, buff=(0.14, 0.1)).move_to(P(1.05, 1.5))

        def allumer(g):
            n = round(20 * joueurs(u.get_value()))
            for i, j in enumerate(g):
                j.set_opacity(1 if i < n else 0.12)

        foule.add_updater(allumer)
        etiquette = self.t("joueurs :", 28, GREY_A)

        def compteur():
            n = int(round(JOUEURS_MAX * joueurs(u.get_value()), -1))
            t = Text(nombre_fr(n), font_size=34, color=JAUNE_TITRE)
            t._pas_audit = True
            return VGroup(etiquette.copy(), t).arrange(RIGHT, buff=0.15).move_to(P(0, 2.45))

        cpt = always_redraw(compteur)
        return m, foule, cpt

    # ── la question-pause (cartes étroites, rebours de 3 s) ────────────────

    def carte(self, lettre, texte, largeur=3.5, fs=26):
        rond = Circle(radius=0.19, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(texte, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.2)
        if ligne.width > largeur - 0.75:  # le texte reste DANS la carte, la coche à sa droite
            ligne.scale_to_fit_width(largeur - 0.75)
        cadre = RoundedRectangle(width=largeur, height=0.44, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.15, LEFT)
        return VGroup(cadre, ligne)

    def construct(self):
        self.margo_bas()
        titre = self.t("Point d'inflexion", 40, JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(titre, badge)
        u = ValueTracker(0)
        grille, axes, nums, jours, nomj = self.grille()
        m, foule, cpt = self.jeu(u)

        # ── 00 : le jeu sort, les joueurs arrivent, la courbe se trace ──
        self.dire("00-accroche")
        jeu = self.t("nouveau jeu vidéo", 28, BLEU_CALCUL).move_to(P(0, 0.62))
        self.au_mot("nouveau jeu vidéo")
        self.play(FadeIn(m, shift=UP * 0.2), FadeIn(jeu), run_time=0.5)
        self.au_mot("Le nombre de joueurs")
        self.play(FadeIn(cpt), FadeIn(foule), FadeIn(grille), Create(axes), FadeIn(nums), FadeIn(jours),
                  FadeIn(nomj), run_time=0.5)
        c1, c2 = courbe(0, 10), courbe(10, 20)
        point = always_redraw(lambda: Dot(G(u.get_value(), joueurs(u.get_value())), radius=0.07, color=WHITE))
        self.add(point)
        self.au_mot("explose")
        self.play(Create(c1), u.animate.set_value(10), run_time=0.85, rate_func=linear)
        self.au_mot("puis ralentit")
        self.play(Create(c2), u.animate.set_value(20), run_time=1.7, rate_func=linear)
        self.au_mot("Où est la bascule")
        ou = self.t("Où est la bascule ?", 32, POINT_I).move_to(P(0, 0.62))
        self.play(FadeOut(jeu), FadeIn(ou, scale=1.2), FadeOut(point), run_time=0.4)
        self.insister(ou, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 01 : la tangente glisse ; creux bleu, bosse orange ──
        self.dire("01-image")
        u.set_value(1.5)
        tg = always_redraw(lambda: tangente(u.get_value()))
        contact = always_redraw(lambda: Dot(G(u.get_value(), joueurs(u.get_value())), radius=0.07, color=WHITE))
        self.au_mot("Au début")
        self.play(FadeOut(ou), FadeIn(tg), FadeIn(contact), run_time=0.3)
        self.play(u.animate.set_value(9.6), run_time=2.2, rate_func=rate_functions.ease_in_sine)
        self.au_mot("la courbe se creuse")
        b1 = VGroup(Arc(radius=0.15, start_angle=PI, angle=PI, stroke_color=CONVEXE, stroke_width=5),
                    self.t("se creuse", 22, CONVEXE)).arrange(DOWN, buff=0.06).move_to(G(4, 0.8))
        b1.align_to(G(0.6, 0), LEFT)  # ni sur l'axe, ni sous la tangente qui glisse
        self.play(c1.animate.set_color(CONVEXE), FadeIn(b1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Ensuite")
        self.play(u.animate.set_value(18.5), run_time=2.6, rate_func=rate_functions.ease_out_sine)
        self.au_mot("elle se bombe")
        b2 = VGroup(Arc(radius=0.15, start_angle=0, angle=PI, stroke_color=CONCAVE, stroke_width=5),
                    self.t("se bombe", 24, CONCAVE)).arrange(DOWN, buff=0.06).move_to(G(16, 0.42))  # loin de « jours »
        self.play(c2.animate.set_color(CONCAVE), FadeIn(b2, shift=UP * 0.1), FadeOut(tg), FadeOut(contact),
                  run_time=0.45)
        tg.clear_updaters()
        contact.clear_updaters()
        self.au_mot("La bascule")
        I = Dot(G(10, 0.5), radius=0.1, color=POINT_I)
        u.set_value(10)
        self.play(FadeIn(I, scale=2.5), Flash(I, color=POINT_I, line_length=0.2), run_time=0.5)
        self.au_mot("point d'inflexion")
        pi = self.t("point d'inflexion", 32, POINT_I).move_to(P(0, 0.62))
        self.play(FadeIn(pi, scale=1.2), run_time=0.4)
        self.insister(pi, 1.12)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : la tangente au point d'inflexion ──
        self.dire("02-question")
        t0 = self.renderer.time
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=24)
        # l'échelle des ceintures (vue au début) s'efface : la question prend sa place
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 2.95))
        q1 = self.t("Au point d'inflexion,", 26)
        q2 = self.t("la tangente :", 26)
        VGroup(q1, q2).arrange(DOWN, buff=0.06).move_to(P(0, 2.3))
        cartes = VGroup(*[self.carte(l, c) for l, c in
                          zip("ABC", ["traverse la courbe", "reste au-dessus", "reste au-dessous"])])
        cartes.arrange(DOWN, buff=0.07)
        cartes.align_to(P(0, q2.get_bottom()[1] - 0.14), UP)
        # au-dessus du graphique (l'étiquette « joueurs » est en y ≈ −0,15)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE)
        pause.align_to(P(0, cartes.get_bottom()[1] - 0.1), UP)
        self.au_mot("Question")
        self.play(FadeOut(VGroup(m, foule, cpt, pi, badge)), FadeIn(tete, shift=DOWN * 0.15), run_time=0.4)
        foule.clear_updaters()
        cpt.clear_updaters()
        self.au_mot("Au point d'inflexion")
        self.play(FadeIn(q1, shift=UP * 0.1), Indicate(I, color=POINT_I, scale_factor=1.6), run_time=0.4)
        self.au_mot("la tangente")
        tgI = tangente(10, 2.6)
        self.play(FadeIn(q2, shift=UP * 0.1), Create(tgI), run_time=0.45)
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=0", flush=True)

        # ── 02b : la réponse : au-dessus avant, au-dessous après ──
        self.dire("02b-reponse")
        b = cartes[0]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  cartes[1].animate.set_opacity(0.3), cartes[2].animate.set_opacity(0.3), FadeOut(rebours),
                  FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.15).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.25)
        self.au_mot("Avant")
        z1 = zone(4.5, 10, CONVEXE)
        self.play(FadeIn(z1), FadeOut(b1), run_time=0.35)
        self.au_mot("au-dessus")
        l1 = self.t("au-dessus", 26, CONVEXE).move_to(G(4, 0.8)).align_to(G(0.6, 0), LEFT)
        self.play(FadeIn(l1, shift=DOWN * 0.1), Indicate(z1, color=CONVEXE, scale_factor=1.04), run_time=0.45)
        self.au_mot("après")
        z2 = zone(10, 15.5, CONCAVE)
        self.play(FadeIn(z2), FadeOut(b2), run_time=0.35)
        self.au_mot("au-dessous")
        l2 = self.t("au-dessous", 24, CONCAVE).move_to(G(15.8, 0.4))
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(z2, color=CONCAVE, scale_factor=1.04), run_time=0.45)
        self.attendre_voix(marge=0.3)

        # ── 03 : à quel jour ? la grille permet de lire, rien n'est écrit ──
        self.dire("03-commentaire")
        self.au_mot("À toi")
        a_toi = self.t("À toi :", 42, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(ReplacementTransform(titre, a_toi), FadeOut(VGroup(tete, q1, q2, cartes, ok, z1, z2, l1, l2, tgI, I)),
                  run_time=0.4)
        self.au_mot("sur ce graphique")
        self.play(Indicate(VGroup(grille, nums), color=GREY_A, scale_factor=1.03), run_time=0.6)
        self.au_mot("à quel jour")
        lq = VGroup(self.t("à quel jour se trouve", 32), self.t("le point d'inflexion ?", 32, POINT_I))
        lq.arrange(DOWN, buff=0.12).move_to(P(0, 1.85))
        self.play(FadeIn(lq[0], shift=UP * 0.1), Indicate(nums, scale_factor=1.3), run_time=0.45)
        self.au_mot("le point d'inflexion")
        self.play(FadeIn(lq[1], shift=UP * 0.1), run_time=0.35)
        self.insister(lq[1], 1.12)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 32, VERT_OK).move_to(P(0, 0.75))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 04 : la fin ──
        self.fin_short("04-abonne", [a_toi, grille, axes, nums, jours, nomj, c1, c2, lq, appel])

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
