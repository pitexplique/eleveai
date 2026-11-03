# convexite_derivee_seconde_short.py
# EleveAI — Maths Tle spé — short « Tu accélères ou tu freines ? » (9:16),
# ceinture BLANCHE. Micro : convexite_derivee_seconde. Centre : transports.
# Paysage jumelle : convexite_derivee_seconde.py (même code couleur).
#   · 00 : le titre, l'échelle ENTIÈRE des ceintures, la route et le repère ;
#   · 01 : EN HAUT la voiture accélère (bleue) puis freine (orange) ; EN BAS la
#          courbe de la distance se trace EN MÊME TEMPS, au même x (un pointillé
#          relie la voiture à son point) : creux bleu f'' > 0, bosse orange f'' < 0 ;
#   · 02 : question-pause : un bus freine pour s'arrêter (B : concave), 3 s ;
#   · 03 : « pendant combien de secondes la voiture accélère-t-elle ? » : le
#          graphique gradué (accélère de 0 à 8 s, freine ensuite) ; la réponse
#          se LIT, elle n'est pas écrite ;
#   · 04 : « Entraîne-toi sur eleveai.fr ».
# Le trajet : d(t) = t²/2 sur [0 ; 8] (accélère), puis 32 + 8(t − 8) − (t − 8)²
# sur [8 ; 12] (freine jusqu'à l'arrêt) : d'' = 1 > 0, puis d'' = −2 < 0.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-convexite-derivee-seconde-short.json (débit −6),
# calée par convexite_derivee_seconde_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/convexite_derivee_seconde_short.py ConvexiteDeriveeSecondeShort -o eleveai-maths-terminale-convexite-derivee-seconde-short --media_dir manim/scripts/terminale/media-convexite-derivee-seconde-short

import os
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

LARGEUR_MAX = 4.0
CONVEXE, CONCAVE = BLEU_CALCUL, ORANGE_RETENUE
FOND_CARTE = "#0b1220"
T_BASCULE, T_FIN = 8.0, 12.0
Y_ROUTE = 1.5


def dist(t):
    if t <= T_BASCULE:
        return t * t / 2
    u = t - T_BASCULE
    return 32 + 8 * u - u * u


def vit(t):
    return t if t <= T_BASCULE else 8 - 2 * (t - T_BASCULE)


assert dist(8) == 32 and dist(12) == 48 and vit(12) == 0
assert all(dist(a) + dist(b) > 2 * dist((a + b) / 2) for a, b in ((0, 8), (1, 7)))       # creux
assert all(dist(a) + dist(b) < 2 * dist((a + b) / 2) for a, b in ((8, 12), (9, 11.5)))   # bosse

# le repère du bas : temps (0 → 12,8 s) en x, distance (0 → 52) en y
XA, XB, YA, YB = 0.0, 12.8, 0.0, 52.0
X0, Y0, X1, Y1 = -1.7, -2.65, 1.75, 0.2


def G(t, d):
    return P(X0 + (t - XA) / (XB - XA) * (X1 - X0), Y0 + (d - YA) / (YB - YA) * (Y1 - Y0))


def courbe(a, b, color, sw=6, n=60):
    m = VMobject(stroke_color=color, stroke_width=sw)
    m.set_points_smoothly([G(t, dist(t)) for t in np.linspace(a, b, n)])
    return m


def voiture(couleur=WHITE):
    """La voiture vue de côté : caisse, habitacle, vitre, roues, feu stop en [5]."""
    caisse = RoundedRectangle(width=0.66, height=0.2, corner_radius=0.07, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    toit = Polygon(P(-0.2, 0.1), P(0.16, 0.1), P(0.08, 0.27), P(-0.13, 0.27), fill_color=couleur, fill_opacity=1,
                   stroke_width=0)
    vitre = Polygon(P(-0.15, 0.12), P(0.12, 0.12), P(0.06, 0.24), P(-0.1, 0.24), fill_color="#0f172a",
                    fill_opacity=1, stroke_width=0)
    roues = VGroup(*[Circle(radius=0.085, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=2).move_to(P(x, -0.1)) for x in (-0.2, 0.2)])
    stop = Rectangle(width=0.05, height=0.07, fill_color=GREY_D, fill_opacity=1, stroke_width=0).move_to(
        P(-0.32, 0.03))
    return VGroup(caisse, toit, vitre, roues, VGroup(), stop)


def bus():
    corps = RoundedRectangle(width=1.05, height=0.42, corner_radius=0.07, fill_color="#FACC15", fill_opacity=1,
                             stroke_width=0)
    vitres = VGroup(*[Rectangle(width=0.15, height=0.13, fill_color="#0f172a", fill_opacity=1, stroke_width=0)
                      .move_to(P(-0.36 + 0.2 * i, 0.07)) for i in range(5)])
    roues = VGroup(*[Circle(radius=0.09, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=2).move_to(P(x, -0.21)) for x in (-0.3, 0.3)])
    return VGroup(corps, vitres, roues)


class ConvexiteDeriveeSecondeShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "convexite_derivee_seconde_short_marques.json"
    nom_voix = "terminale-convexite-derivee-seconde-short"
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

    def fond(self, mob):
        """Un fond noir derrière une étiquette : le pointillé voiture → point passe DESSOUS."""
        r = BackgroundRectangle(mob, color=BLACK, fill_opacity=1, buff=0.05)
        self.__dict__.setdefault("_fonds", []).append(r)
        return r

    def fonds(self):
        """Les fonds posés jusqu'ici (ils partent avec leur écran)."""
        f, self._fonds = VGroup(*getattr(self, "_fonds", [])), []
        return f

    def sans_audit(self, mob):
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def t_mot(self, extrait):
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix")
        m = self._marques().get(self._cle_voix) or []
        return self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0])

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        reste = self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0]) - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    # ── le trajet : la voiture en haut, la courbe en bas, au même x ────────

    def trajet(self):
        """Un ValueTracker du temps, la voiture qui suit, la courbe, le point, le lien."""
        tt = ValueTracker(0.0)
        car = voiture(WHITE)
        y_car = Y_ROUTE + 0.04 - car.get_bottom()[1] + car.get_center()[1]

        def suivre(m):
            m.move_to(P(G(tt.get_value(), 0)[0], y_car))

        def traits():
            v = vit(tt.get_value())
            if v < 0.6:
                return VGroup()
            return VGroup(*[Line(P(0, 0), P(0.07 * v, 0), stroke_width=3, color=GREY_B)
                            .next_to(car[0], LEFT, buff=0.05).shift(UP * dy) for dy in (-0.04, 0.07)])

        car.add_updater(suivre)
        car.traits = always_redraw(traits)
        point = always_redraw(lambda: Dot(G(tt.get_value(), dist(tt.get_value())), radius=0.07,
                                          color=JAUNE_TITRE))
        lien = always_redraw(lambda: DashedLine(P(G(tt.get_value(), 0)[0], Y_ROUTE - 0.12),
                                                G(tt.get_value(), dist(tt.get_value())) + UP * 0.08,
                                                stroke_width=2, color=GREY_C, dash_length=0.08))
        return tt, car, point, lien

    def decor(self):
        route = Rectangle(width=3.9, height=0.1, fill_color=GREY_D, fill_opacity=1, stroke_width=0).move_to(
            P(0.05, Y_ROUTE - 0.05))
        tirets = VGroup(*[Line(P(x, Y_ROUTE - 0.05), P(x + 0.18, Y_ROUTE - 0.05), stroke_width=2, color=WHITE)
                          for x in np.arange(-1.8, 1.8, 0.4)])
        kw = dict(buff=0, stroke_width=2, color=GREY_B, tip_length=0.13, max_tip_length_to_length_ratio=0.08)
        axes = VGroup(Arrow(G(0, 0), G(XB, 0), **kw), Arrow(G(0, 0), G(0, YB), **kw))
        lt = self.t("temps", 20, GREY_A).next_to(G(XB, 0), DOWN, buff=0.1).align_to(G(XB, 0), RIGHT)
        ld = self.t("distance", 20, GREY_A).next_to(G(0, YB), RIGHT, buff=0.1)
        return VGroup(route, tirets), VGroup(axes, lt, ld)

    def construct(self):
        self.margo_bas()
        self.dire("00-accroche")
        titre = self.t("Tu accélères ou tu freines ?", 34, JAUNE_TITRE).move_to(P(0, 3.45))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.88))
        self.play(Write(titre), FadeIn(badge), run_time=0.8)
        route, rep = self.decor()
        tt, car, point, lien = self.trajet()
        self.au_mot("La courbe")
        self.play(FadeIn(route), FadeIn(car), run_time=0.4)
        self.au_mot("ta distance")
        self.play(Create(rep[0]), FadeIn(rep[1:]), run_time=0.6)
        self.add(point)
        self.attendre_voix(marge=0.2)
        self.ecran_image(tt, car, point, lien)
        self.ecran_question(titre, badge, route, rep, car)
        self.ecran_commentaire(titre, badge, route, rep)

    def rouler(self, tt, cible, fin):
        """Le temps du trajet avance seul (updater) jusqu'à `cible`, atteint à l'instant `fin`."""
        v = (cible - tt.get_value()) / max(0.4, fin - self.renderer.time)
        tt.clear_updaters()
        tt.add_updater(lambda m, dt: m.set_value(min(cible, m.get_value() + v * dt)))

    def peindre(self, car, couleur, stop=None):
        """Change la couleur SANS .animate : la voiture roule (updater) pendant ce temps,
        un .animate figerait la caisse à sa position de départ (caisse décrochée des roues)."""
        c0, s0 = car[0].get_fill_color(), car[5].get_fill_color()

        def teinter(m, a):
            m[0].set_fill(interpolate_color(c0, ManimColor(couleur), a))
            m[1].set_fill(interpolate_color(c0, ManimColor(couleur), a))
            if stop is not None:
                m[5].set_fill(interpolate_color(s0, ManimColor(stop), a))

        return [UpdateFromAlphaFunc(car, teinter)]

    # ── 01 : accélère (creux, bleu), freine (bosse, orange) ────────────────

    def ecran_image(self, tt, car, point, lien):
        self.dire("01-image")
        trace_b = always_redraw(lambda: courbe(0, max(0.02, min(tt.get_value(), T_BASCULE)), CONVEXE))
        trace_o = always_redraw(lambda: courbe(T_BASCULE, max(T_BASCULE + 0.02, tt.get_value()), CONCAVE)
                                if tt.get_value() > T_BASCULE + 0.02 else VMobject())
        self.add(tt, trace_b, trace_o, car.traits, lien, point)
        self.au_mot("La voiture accélère")
        acc = self.t("accélère", 30, CONVEXE).move_to(P(-1.05, 0.85))
        self.rouler(tt, T_BASCULE, self.t_mot("La voiture freine") - 0.15)
        self.play(*self.peindre(car, CONVEXE), FadeIn(self.fond(acc)), FadeIn(acc, shift=RIGHT * 0.1), run_time=0.35)
        # les étiquettes bleues : en haut à gauche du repère (le creux est en bas)
        b1 = VGroup(Arc(radius=0.15, start_angle=PI, angle=PI, stroke_color=CONVEXE, stroke_width=4),
                    self.t("se creuse", 24, CONVEXE)).arrange(RIGHT, buff=0.1)
        b2 = self.t("f'' > 0", 26, CONVEXE)
        b3 = self.t("convexe", 26, CONVEXE)
        bleu = VGroup(b1, b2, b3).arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(0, -0.5))
        bleu.align_to(P(-1.55, 0), LEFT)
        fb = [self.fond(b) for b in (b1, b2, b3)]
        self.au_mot("la courbe se creuse")
        self.play(FadeIn(fb[0]), FadeIn(b1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("f seconde est positive")
        self.play(FadeIn(fb[1]), FadeIn(b2, scale=1.3), run_time=0.3)
        self.au_mot("convexe")
        self.play(FadeIn(fb[2]), FadeIn(b3, scale=1.3), run_time=0.3)
        self.au_mot("La voiture freine")
        fre = self.t("freine", 30, CONCAVE).move_to(P(0.98, 0.85))
        self.rouler(tt, T_FIN, self.t_mot("concave") + 0.2)
        self.play(*self.peindre(car, CONCAVE, ROUGE_ERREUR), acc.animate.set_opacity(0.35),
                  FadeIn(self.fond(fre)), FadeIn(fre, shift=LEFT * 0.1), run_time=0.35)
        o1 = VGroup(Arc(radius=0.15, start_angle=0, angle=PI, stroke_color=CONCAVE, stroke_width=4),
                    self.t("se bombe", 24, CONCAVE)).arrange(RIGHT, buff=0.1)
        o2 = self.t("f'' < 0", 26, CONCAVE)
        o3 = self.t("concave", 26, CONCAVE)
        orange = VGroup(o1, o2, o3).arrange(DOWN, aligned_edge=LEFT, buff=0.06).move_to(P(0, -2.05))
        orange.align_to(P(2.0, 0), RIGHT)
        self.au_mot("la courbe se bombe")
        self.play(FadeIn(o1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("f seconde est négative")
        self.play(FadeIn(o2, scale=1.3), run_time=0.3)
        self.au_mot("concave")
        self.play(FadeIn(o3, scale=1.3), run_time=0.3)
        self.attendre_voix(marge=0.3)
        tt.clear_updaters()
        tt.set_value(T_FIN)
        for m in (car, trace_b, trace_o, car.traits, lien, point):
            m.clear_updaters()
        self._image = VGroup(trace_b, trace_o, lien, point, acc, fre, bleu, orange, car.traits)

    # ── 02 : question-pause : le bus ───────────────────────────────────────

    def carte(self, lettre, corps, largeur=3.7, fs=26):
        rond = Circle(radius=0.2, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.2)
        cadre = RoundedRectangle(width=largeur, height=0.5, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def ecran_question(self, titre, badge, route, rep, car):
        self.dire("02-question")
        t0 = self.renderer.time
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.26), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.15)
        tete.move_to(P(-0.35, 0.95))
        rebours = CompteARebours(3, r=0.24, fs=24).next_to(tete, RIGHT, buff=0.3)
        self.play(FadeOut(VGroup(self._image, rep, car, self.fonds())), FadeIn(tete, shift=DOWN * 0.15),
                  run_time=0.4)
        b = bus()
        y_bus = Y_ROUTE + 0.02 - b.get_bottom()[1] + b.get_center()[1]
        b.move_to(P(-1.45, y_bus))
        arret = VGroup(Line(P(1.55, Y_ROUTE), P(1.55, 2.15), stroke_width=3, color=GREY_B),
                       RoundedRectangle(width=0.5, height=0.26, corner_radius=0.05, fill_color=BLEU_CALCUL,
                                        fill_opacity=1, stroke_width=0).move_to(P(1.55, 2.2)))
        arret.add(Text("BUS", font_size=16, color=WHITE, weight=BOLD).move_to(arret[1]))
        q1 = self.t("Un bus freine pour s'arrêter.", 26).move_to(P(0, 0.45))
        q2 = self.t("Sa courbe de distance est :", 26).move_to(P(0, 0.05))
        self.au_mot("Un bus")
        self.play(FadeIn(b, shift=RIGHT * 0.3), FadeIn(arret), FadeIn(q1[:5], shift=UP * 0.1), run_time=0.4)
        self.au_mot("freine")
        duree = max(0.6, self.t_mot("Sa courbe") - self.renderer.time - 0.1)
        feu = Rectangle(width=0.05, height=0.1, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
        feu.move_to(b.get_left() + P(0.03, 0.0))
        b.add(feu)
        self.play(b.animate.move_to(P(0.8, y_bus)), FadeIn(q1[5:], shift=UP * 0.1), run_time=duree,
                  rate_func=rate_functions.ease_out_cubic)
        self.au_mot("Sa courbe")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        cartes = VGroup(*[self.carte(L, c) for L, c in zip("ABC", ["convexe", "concave", "une droite"])])
        cartes.arrange(DOWN, buff=0.1).move_to(P(0, -1.07))
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, -2.3))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=1", flush=True)
        # la réponse
        self.dire("02b-reponse")
        bon = cartes[1]
        self.play(bon[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1),
                  bon[1][0][0].animate.set_fill(VERT_OK), cartes[0].animate.set_opacity(0.3),
                  cartes[2].animate.set_opacity(0.3), FadeOut(pause), FadeOut(rebours), run_time=0.25)
        self.play(bon.animate.scale(1.12), run_time=0.25)
        self.play(bon.animate.scale(1 / 1.12), run_time=0.25)
        self.au_mot("Il freine")
        self.play(FadeOut(cartes[0]), FadeOut(cartes[2]), Indicate(feu, color=ROUGE_ERREUR, scale_factor=2),
                  run_time=0.4)
        self.au_mot("f seconde est négative")
        neg = self.t("f'' < 0", 32, CONCAVE).move_to(cartes[0])
        self.play(FadeIn(neg, scale=1.3), run_time=0.3)
        self.au_mot("la courbe se bombe")
        kw = dict(buff=0, stroke_width=2, color=GREY_B, tip_length=0.1, max_tip_length_to_length_ratio=0.1)
        o = cartes[2].get_center() + LEFT * 0.75 + DOWN * 0.3
        ax = VGroup(Arrow(o, o + RIGHT * 1.5, **kw), Arrow(o, o + UP * 0.62, **kw))
        bosse = ParametricFunction(lambda s: o + P(1.4 * s, 0.55 * (2 * s - s * s)), t_range=[0, 1],
                                   color=CONCAVE, stroke_width=5)
        ic = Arc(radius=0.17, start_angle=0, angle=PI, stroke_color=CONCAVE, stroke_width=4).next_to(ax, RIGHT,
                                                                                                    buff=0.2)
        self.play(Create(ax), Create(bosse), FadeIn(ic), run_time=0.6)
        self.attendre_voix(marge=0.3)
        self._question = VGroup(tete, b, arret, q1, q2, cartes[1], neg, ax, bosse, ic)

    # ── 03 : la question en commentaire : le graphique gradué ──────────────

    def ecran_commentaire(self, titre, badge, route, rep):
        self.dire("03-commentaire")
        self.au_mot("À toi")
        et = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(ReplacementTransform(titre, et), FadeOut(self._question), run_time=0.4)
        grads = VGroup()
        for s in range(0, 12, 2):
            tr = Line(G(s, 0) + DOWN * 0.06, G(s, 0) + UP * 0.06, stroke_width=2, color=GREY_B)
            grads.add(VGroup(tr, Text(str(s), font_size=20, color=GREY_A).next_to(tr, DOWN, buff=0.06)))
        grads.add(Line(G(12, 0) + DOWN * 0.06, G(12, 0) + UP * 0.06, stroke_width=2, color=GREY_B))
        self.sans_audit(grads)
        unite = self.t("temps (s)", 20, GREY_A).next_to(G(XB, 0), UP, buff=0.12).align_to(G(XB, 0), RIGHT)
        tt, car, point, lien = self.trajet()
        trace_b = always_redraw(lambda: courbe(0, max(0.02, min(tt.get_value(), T_BASCULE)), CONVEXE))
        trace_o = always_redraw(lambda: courbe(T_BASCULE, max(T_BASCULE + 0.02, tt.get_value()), CONCAVE)
                                if tt.get_value() > T_BASCULE + 0.02 else VMobject())
        self.au_mot("sur ce trajet")
        car[0].set_fill(CONVEXE)
        car[1].set_fill(CONVEXE)
        car.update()
        self.play(FadeIn(rep[0]), FadeIn(rep[2]), FadeIn(unite), FadeIn(grads), FadeIn(car), run_time=0.4)
        self.add(tt, trace_b, trace_o, car.traits, lien, point)

        def teinte(m):
            c = CONVEXE if tt.get_value() <= T_BASCULE else CONCAVE
            m[0].set_fill(c)
            m[1].set_fill(c)
            m[5].set_fill(ROUGE_ERREUR if tt.get_value() > T_BASCULE else GREY_D)

        car.add_updater(teinte)
        self.rouler(tt, T_FIN, self.t_mot("Réponds") - 0.2)
        q1 = self.t("Pendant combien de secondes", 24, WHITE).move_to(P(0, 1.0))
        q2 = self.t("la voiture accélère-t-elle ?", 24, CONVEXE).move_to(P(0, 0.62))
        self.au_mot("pendant combien")
        self.play(FadeIn(self.fond(q1)), FadeIn(q1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("la voiture accélère")
        self.play(FadeIn(self.fond(q2)), FadeIn(q2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 28, VERT_OK, largeur=3.6).move_to(P(0, 2.25))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)
        tt.clear_updaters()
        for m in (car, trace_b, trace_o, car.traits, lien, point):
            m.clear_updaters()
        self.fin_short("04-abonne", [et, badge, route, rep[0], rep[2], unite, grads, car, car.traits, trace_b,
                                     trace_o, lien, point, q1, q2, appel])

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer, self.fonds())), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
