# suite_arith_graphique.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# la représentation graphique » (16:9), ceinture VERTE. Série SUITES, épisode 07.
# Micro du coach : lin_suite_graphique (notion lin_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts (aGraphLire, aGraphSens, aGraphNature,
# aGraphRaison, aGraphPoint, aGraphDroite). Le coach montre un repère quadrillé,
# les points (n ; uₙ) en bleu, la droite qui les porte en gris : la vidéo aussi.
#
# Ce que demande le coach → écran :
#   · lire uₖ ou la raison sur le nuage (aGraphLire)      → 02-points, 05-lire ;
#   · la raison par deux points de la droite (aGraphRaison) → 04-question ;
#   · nature : alignés ou courbe (aGraphNature)            → 06-nature ;
#   · sens de variation (aGraphSens)                       → 06-nature, 09 défi ;
#   · un point du nuage (aGraphPoint, piège (uₙ ; n))      → 07-question ;
#   · la droite y = u₀ + rx (aGraphDroite)                 → 03-alignes, 09, 10 ;
#   · erreur typique : lire r à l'ordonnée à l'origine     → 08-piege.
# Clé de voix → écran :
#   00-garde (nuage aligné, escalier orange) · 01 Amel, ingénieure en robotique :
#   le robot livre des médicaments, la batterie (8 crans de 15 min) se vide ·
#   02 les points (0 ; 120) … (3 ; 75), isolés (le trait plein barré) · 03 alignés,
#   uₙ = 120 − 15n, y = 120 − 15x, l'escalier « +1 / −15 », u₀ sur l'axe ·
#   04/04b question (A : 4, l'escalier de 3 marches) · 05 le point d'abscisse 8
#   sur l'axe, recharge · 06 points en courbe barrés, trois nuages · 07/07b
#   question (B : (4 ; 17)) · 08 le piège : u₀ n'est pas la raison · 09/09b défi
#   y = 30 − 2x · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et marches,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : Text et MarkupText (indices).
# Voix : manim/voix/premiere-suite-arith-graphique.json (débit −6), calée mot à
# mot par suite_arith_graphique_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_graphique.py SuiteArithGraphique1re -o eleveai-maths-premiere-suite-arith-graphique --media_dir manim/scripts/premiere/media-suite-arith-graphique
# Sortie : manim/sorties/premiere/maths/suites/07-arith-graphique/

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
AMEL = [120 - 15 * n for n in range(9)]
assert AMEL[:4] == [120, 105, 90, 75] and AMEL[8] == 0 and 120 // 15 == 8
Q1 = ((1, 7), (4, 19))
assert (19 - 7) / (4 - 1) == 4 and 4 - 1 == 3 and 19 - 7 == 12                # question 1 : A (4)
assert 5 + 3 * 4 == 17 and 5 + 3 * 17 != 4 and 5 + 3 * 4 != 20               # question 2 : B (4 ; 17)
DEFI = [30 - 2 * n for n in range(11)]
assert DEFI[0] == 30 and DEFI[6] == 18                                        # défi : 30 ; −2 ; ↓ ; 18
PIEGE_U = [2 + 3 * n for n in range(6)]                                       # le nuage du coach (u₀ = 2, r = 3)
GEO = [1, 2, 4, 8, 16]
GRIS_DROITE = "#94a3b8"                                                        # la droite du coach
PEAU, CHEVEUX = "#8d5524", "#1f1300"


def _md(s, fs):
    """« u_{n} » → l'indice en vrai indice Pango (62 %, abaissé)."""
    r = -max(2, round(fs * 0.1))
    return re.sub(r"_\{([^}]*)\}", lambda m: f'<span size="62%" rise="{r}pt">{m.group(1)}</span>', s)


def formule(pieces, fs=40, couleur=WHITE):
    """Une formule en UN MarkupText (vrais indices) ; f.parts[k] = les glyphes
    du morceau k, pour les dévoiler quand la voix les dit (repris de l'ép. 03).
    ⚠️ Ses nombres ne sont pas audités : on les cale à la main (suivre)."""
    pieces = [(p, couleur) if isinstance(p, str) else p for p in pieces]
    mk = " ".join(f'<span foreground="{ManimColor(c).to_hex()}">{_md(t, fs)}</span>' for t, c in pieces)
    m = MarkupText(f'<span font_features="liga=0">{mk}</span>', font_size=fs)
    parts, k = [], 0
    for t, _ in pieces:
        n = len(re.sub(r"\s", "", re.sub(r"_\{([^}]*)\}", r"\1", t)))
        parts.append(m[k:k + n])
        k += n
    assert k == len(m), f"glyphes {len(m)} ≠ {k} : {pieces}"
    m.parts = parts
    return m


# ── les dessins de l'épisode ────────────────────────────────────────────────

def amel(s=1.0):
    """Amel, ingénieure en robotique : cheveux longs, blouse, une télécommande."""
    dos = RoundedRectangle(width=0.66, height=0.75, corner_radius=0.25, fill_color=CHEVEUX, fill_opacity=1,
                           stroke_width=0).move_to(P(0, 0.88))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.02))
    frange = Arc(radius=0.27, start_angle=0.2, angle=PI - 0.4, stroke_color=CHEVEUX, stroke_width=10).move_to(P(0, 1.22))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#F1F5F9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.08))
    col = Polygon(P(-0.16, 0.66), P(0.16, 0.66), P(0, 0.42), fill_color="#0EA5E9", fill_opacity=1, stroke_width=0)
    boitier = RoundedRectangle(width=0.5, height=0.34, corner_radius=0.06, fill_color="#334155", fill_opacity=1,
                               stroke_color=GREY_B, stroke_width=2).move_to(P(0.62, 0.05))
    boutons = VGroup(Dot(P(0.5, 0.05), radius=0.05, color=JUSTE), Dot(P(0.72, 0.05), radius=0.05, color=RAISON))
    antenne = Line(P(0.78, 0.22), P(0.86, 0.42), stroke_color=GREY_B, stroke_width=3)
    return VGroup(dos, corps, col, tete, frange, boitier, boutons, antenne).scale(s)


def robot(s=1.0):
    """Le robot livreur : caisse blanche, écran (croix verte), roues, antenne."""
    caisse = RoundedRectangle(width=0.9, height=0.7, corner_radius=0.1, fill_color="#E2E8F0", fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.5))
    tete = RoundedRectangle(width=0.6, height=0.36, corner_radius=0.08, fill_color="#CBD5E1", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 1.06))
    yeux = VGroup(Dot(P(-0.12, 1.07), radius=0.05, color="#0F172A"), Dot(P(0.12, 1.07), radius=0.05, color="#0F172A"))
    croix = VGroup(Rectangle(width=0.26, height=0.08), Rectangle(width=0.08, height=0.26)).set_fill(JUSTE, 1)
    croix.set_stroke(width=0).move_to(P(0, 0.52))
    roues = VGroup(*[Circle(radius=0.11, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(P(x, 0.1))
                     for x in (-0.28, 0.28)])
    antenne = VGroup(Line(P(0, 1.24), P(0, 1.42), stroke_color=GREY_B, stroke_width=3),
                     Dot(P(0, 1.44), radius=0.05, color=RAISON))
    return VGroup(roues, caisse, croix, tete, yeux, antenne).scale(s, about_point=ORIGIN)


def batterie(hauteur=3.0, largeur=1.0, crans=8):
    """Une batterie verticale de 8 crans (8 × 15 min) : b.crans[k], du bas en haut."""
    cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.1, stroke_color=GREY_A, stroke_width=4)
    borne = RoundedRectangle(width=largeur * 0.4, height=0.14, corner_radius=0.04, fill_color=GREY_A, fill_opacity=1,
                             stroke_width=0).next_to(cadre, UP, buff=0)
    h = (hauteur - 0.12) / crans
    cr = VGroup(*[Rectangle(width=largeur - 0.18, height=h - 0.06, fill_color=JUSTE, fill_opacity=1, stroke_width=0)
                  .move_to(P(0, -hauteur / 2 + 0.06 + h * (k + 0.5))) for k in range(crans)])
    b = VGroup(cadre, borne, cr)
    b.crans = cr
    return b


def prise(s=1.0):
    """Une prise électrique (la recharge)."""
    corps = RoundedRectangle(width=0.5, height=0.42, corner_radius=0.08, fill_color=GREY_B, fill_opacity=1,
                             stroke_width=0)
    broches = VGroup(*[Rectangle(width=0.07, height=0.2, fill_color=GREY_B, fill_opacity=1, stroke_width=0)
                       .move_to(P(x, 0.3)) for x in (-0.12, 0.12)])
    fil = VMobject(stroke_color=GREY_B, stroke_width=5).set_points_smoothly([P(0, -0.2), P(0.15, -0.45), P(0.5, -0.5)])
    eclair = Polygon(P(0.02, 0.14), P(-0.1, -0.02), P(0.0, -0.02), P(-0.04, -0.16), P(0.1, 0.02), P(0.0, 0.02),
                     fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    return VGroup(fil, corps, broches, eclair).scale(s)


class Repere(NuageTermes):
    """Le repère du coach : quadrillage léger, axes n et uₙ, graduations (données
    du repère, non auditées). pas_n, pas_u : le quadrillage ; etiq_n, etiq_u :
    les nombres écrits sur les axes."""

    def __init__(self, nr, ur, bg, hd, pas_u, etiq_u=(), etiq_n=(), pas_n=1, nom_u="uₙ", fs=28, fs_grad=26):
        super().__init__(nr, ur, bg, hd, nom_u=nom_u, fs=fs)
        k = dict(stroke_color=GREY_D, stroke_width=1.2, stroke_opacity=0.8)
        self.grille = VGroup()
        n = self.na + pas_n
        while n <= self.nb + 1e-9:
            self.grille.add(Line(self.G(n, self.ua), self.G(n, self.ub), **k))
            n += pas_n
        v = self.ua + pas_u
        while v <= self.ub + 1e-9:
            self.grille.add(Line(self.G(self.na, v), self.G(self.nb, v), **k))
            v += pas_u
        self.grads = VGroup()
        for n in etiq_n:
            self.grads.add(self.graduation_n(n, fr(n), fs_grad))
        x = self.ax_u.get_center()[0]
        for v in etiq_u:
            y = self.G(0, v)[1]
            tr = Line(P(x - 0.07, y), P(x + 0.07, y), stroke_width=2, color=GREY_B)
            t = Text(fr(v), font_size=fs_grad, color=GREY_A).next_to(tr, LEFT, buff=0.06)
            t._pas_audit = True
            self.grads.add(VGroup(tr, t))
        self.add_to_back(self.grille)
        self.add(self.grads)

    def anims(self):
        return [FadeIn(self.grille), Create(self.ax_n), Create(self.ax_u), FadeIn(self.lab_n), FadeIn(self.lab_u),
                FadeIn(self.grads)]

    def droite(self, n0, n1, f, couleur=GRIS_DROITE, largeur=3):
        """La droite pointillée qui porte les points, de n0 à n1 (f : n → u)."""
        return DashedLine(self.G(n0, f(n0)), self.G(n1, f(n1)), color=couleur, stroke_width=largeur,
                          dash_length=0.12)

    def marche(self, n, u1, u2, couleur=RAISON, largeur=6):
        """Une marche de l'escalier : + 1 en n (horizontale), puis de u1 à u2."""
        h = Line(self.G(n, u1), self.G(n + 1, u1), color=couleur, stroke_width=largeur)
        v = Line(self.G(n + 1, u1), self.G(n + 1, u2), color=couleur, stroke_width=largeur)
        return VGroup(h, v)


def nuage_mini(valeurs, largeur=1.5, hauteur=1.05, droite=False, couleur=TERME, r=0.07, axes=True):
    """Un petit nuage (pour une carte ou un bouton) : un coin d'axes, les points."""
    g = VGroup()
    vmin, vmax = min(valeurs + [0]), max(valeurs)
    n = len(valeurs)

    def G(k, v):
        return P(-largeur / 2 + 0.18 + k * (largeur - 0.3) / max(n - 1, 1),
                 -hauteur / 2 + 0.12 + (v - vmin) / max(vmax - vmin, 1e-9) * (hauteur - 0.24))
    if axes:
        g.add(Line(P(-largeur / 2, -hauteur / 2), P(largeur / 2, -hauteur / 2), stroke_width=2, color=GREY_B),
              Line(P(-largeur / 2, -hauteur / 2), P(-largeur / 2, hauteur / 2), stroke_width=2, color=GREY_B))
    if droite:
        g.add(DashedLine(G(-0.3, valeurs[0] - 0.3 * (valeurs[1] - valeurs[0])),
                         G(n - 0.7, valeurs[-1] + 0.3 * (valeurs[-1] - valeurs[-2])), color=GRIS_DROITE,
                         stroke_width=2, dash_length=0.07))
    pts = VGroup(*[Dot(G(k, v), radius=r, color=couleur) for k, v in enumerate(valeurs)])
    g.add(pts)
    g.pts = pts
    return g


class OutilsGraphique:
    """Ce que la paysage et le short de l'épisode partagent (pas dans le module commun)."""

    def morceaux(self, pieces, fs=34, buff=0.16):
        """Une ligne en morceaux [(texte, couleur, extrait)] : chaque morceau quand
        la voix dit son extrait (None : avec le précédent). Renvoie la ligne."""
        g = VGroup(*[self.t(p[0], fs, p[1], 1e9) for p in pieces]).arrange(RIGHT, buff=buff)
        g.extraits = [p[2] for p in pieces]
        return g

    def jouer_morceaux(self, g, run_time=0.25):
        paquet = []
        for m, ex in zip(g, g.extraits):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], run_time=run_time)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
        if paquet:
            self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], run_time=run_time)

    def q_montrer_choix(self, cartes):
        """Comme le module commun ; un corps en morceaux (« (17 ; » puis « 4) ») :
        chaque morceau quand la voix dit son nombre."""
        if not any(hasattr(c[1][1], "extraits") for c in cartes):
            return super().q_montrer_choix(cartes)
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.jouer_morceaux(c[1][1], run_time=0.18)

    def question_libre(self, cle, etapes, cartes, pause_xy, dessin=None):
        """L'écran « Question ! » à sa mise en page : etapes = [fonction(), …]
        jouées dans l'ordre de la voix (chacune attend ses mots) ; cartes : les
        boutons A/B/C déjà placés ; pause_xy : « Mets pause, et choisis ! »."""
        k = self.k_question
        self.nouvel_ecran(cle)
        t0 = self.renderer.time
        tete, rebours = self.tete_question(self.y_tete_question)
        pause = self.t("Mets pause, et choisis !", int(32 * k), RAISON)
        VGroup(pause, rebours).arrange(RIGHT, buff=0.3).move_to(pause_xy)
        gp = VGroup(pause, rebours)
        lim = 2 * (config.frame_width / 2 - config.frame_width * 0.03 - 0.1 - abs(pause_xy[0]))
        if gp.width > min(self.largeur_texte, lim):
            gp.scale_to_fit_width(min(self.largeur_texte, lim)).move_to(pause_xy)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if dessin:
            dessin()
        for e in etapes:
            e()
        self.q_montrer_choix(cartes)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        q = VGroup(tete, cartes, pause, rebours)
        q.tete, q.cartes, q.pause, q.rebours = tete, cartes, pause, rebours
        return q


def porte(x, y_sol):
    p = Rectangle(width=0.8, height=1.35, fill_color="#1E293B", fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    p.move_to(P(x, y_sol + 0.675))
    vitre = Rectangle(width=0.4, height=0.3, fill_color="#38BDF8", fill_opacity=0.5, stroke_width=0)
    vitre.move_to(P(x, y_sol + 1.05))
    poignee = Dot(P(x + 0.25, y_sol + 0.6), radius=0.04, color=GREY_A)
    return VGroup(p, vitre, poignee)


class SuiteArithGraphique1re(OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_arith_graphique_marques.json"
    nom_voix = "premiere-suite-arith-graphique"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    XG = -4.0                     # le centre de la colonne de gauche

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def nuage_garde(self):
        """Des points alignés, l'escalier orange entre eux, la droite pointillée."""
        pts = [P(-2.4 + 1.2 * k, -1.75 + 0.3 * k) for k in range(5)]
        dots = VGroup(*[Dot(p, radius=0.1, color=TERME) for p in pts])
        marches = VGroup(*[VGroup(Line(pts[k], P(pts[k + 1][0], pts[k][1])),
                                  Line(P(pts[k + 1][0], pts[k][1]), pts[k + 1])).set_stroke(RAISON, 5)
                           for k in range(4)])
        dr = DashedLine(pts[0] + P(-0.4, -0.1), pts[-1] + P(0.4, 0.1), color=GRIS_DROITE, stroke_width=3)
        self.au_mot("coup d'œil")
        for k in range(5):
            anims = [GrowFromCenter(dots[k])]
            if k:
                anims.append(Create(marches[k - 1]))
            self.play(*anims, run_time=0.18)
        self.play(Create(dr), run_time=0.4)

    def ecran_garde(self):
        self.garde("Suite arithmétique",
                   [("la représentation graphique", "la représentation", TERME),
                    ("Comment lire une suite sur un dessin,", "Comment"),
                    ("et la reconnaître au premier coup d'œil ?", "et la reconnaître")],
                   dessin=self.nuage_garde)

    # ── 01 : Amel et son robot ─────────────────────────────────────────────

    Y_SOL = -1.9
    X_PORTES = (-1.5, 0.2, 1.9)

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        pers = amel(1.0).move_to(P(-4.95, 1.1))
        nom = self.t("Amel", 40, JAUNE_TITRE).next_to(pers, DOWN, buff=0.3)
        met = VGroup(self.t("ingénieure", 32, TERME), self.t("en robotique", 32, TERME)).arrange(DOWN, buff=0.08)
        met.next_to(nom, DOWN, buff=0.12)
        self.au_mot("Amel")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("ingénieure")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.4)
        rob = robot(0.95).move_to(P(-2.8, self.Y_SOL), aligned_edge=DOWN)
        self.au_mot("un robot")
        self.play(FadeIn(rob, shift=RIGHT * 0.3), run_time=0.4)
        self.au_mot("médicaments")
        self.play(Indicate(rob[2], color=JUSTE, scale_factor=1.6), run_time=0.5)
        sol = Line(P(-3.6, self.Y_SOL), P(3.0, self.Y_SOL), stroke_color=GREY_B, stroke_width=4)
        portes = VGroup(*[porte(x, self.Y_SOL) for x in self.X_PORTES])
        ens = self.t("hôpital", 34, GREY_A).move_to(P(0.2, 0.25))
        self.au_mot("hôpital")
        self.play(Create(sol), LaggedStart(*[FadeIn(p, shift=UP * 0.1) for p in portes], lag_ratio=0.2),
                  FadeIn(ens), run_time=0.6)
        self.bring_to_front(rob)
        bat = batterie(3.0, 1.0).move_to(P(4.9, 0.25))
        self.au_mot("batterie")
        self.play(FadeIn(bat[:2]), LaggedStart(*[FadeIn(c, scale=0.7) for c in bat.crans], lag_ratio=0.12),
                  run_time=0.6)
        self.au_mot("120 minutes")
        lab = self.t("120 min", 38, WHITE).next_to(bat, DOWN, buff=0.22)
        self.play(FadeIn(lab, scale=1.3), run_time=0.35)
        self.au_mot("chaque livraison")
        moins = self.t("− 15 min", 34, RAISON).next_to(bat.crans[7], LEFT, buff=0.3)
        self.play(rob.animate.move_to(P(self.X_PORTES[0], self.Y_SOL), aligned_edge=DOWN), run_time=0.7)
        self.suivre("15")
        self.play(bat.crans[7].animate.set_fill(RAISON), FadeIn(moins, shift=LEFT * 0.1), run_time=0.3)
        self.play(bat.crans[7].animate.set_fill(opacity=0.12), run_time=0.4)
        self.au_mot("Amel veut")
        self.play(rob.animate.move_to(P(self.X_PORTES[1], self.Y_SOL), aligned_edge=DOWN),
                  moins.animate.next_to(bat.crans[6], LEFT, buff=0.3), run_time=0.7)
        self.play(bat.crans[6].animate.set_fill(RAISON), run_time=0.25)
        self.play(bat.crans[6].animate.set_fill(opacity=0.12), run_time=0.35)
        self.au_mot("recharger")
        qd = self.t("Quand recharger ?", 40, RAISON).move_to(P(0.6, 2.7))
        pr = prise(1.0).next_to(qd, RIGHT, buff=0.4)
        self.play(FadeIn(qd, shift=DOWN * 0.1), FadeIn(pr, scale=0.7), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : les points (n ; uₙ) ───────────────────────────────────────────

    def repere_amel(self):
        return Repere((0, 9), (0, 135), P(-0.6, -2.2), P(4.9, 2.4), 15, etiq_u=(30, 60, 90, 120),
                      etiq_n=range(0, 10))

    def ecran_points(self):
        self.nouvel_ecran("02-points")
        x = self.XG
        l1 = formule([("u_{n}", TERME), (": l'autonomie,", WHITE)], 40).move_to(P(x, 3.0))
        l1b = self.t("en minutes,", 36).move_to(P(x, 2.42))
        l2 = self.t("après n livraisons", 36).move_to(P(x, 1.9))
        l3 = formule([("u_{0}", TERME), ("=", WHITE), ("120", WHITE)], 48).move_to(P(x, 1.15))
        self.au_mot("u indice n")
        self.play(FadeIn(l1.parts[0], scale=1.3), run_time=0.3)
        self.au_mot("l'autonomie")
        self.play(FadeIn(l1.parts[1], shift=UP * 0.08), run_time=0.3)
        self.au_mot("en minutes")
        self.play(FadeIn(l1b, shift=UP * 0.08), run_time=0.25)
        self.au_mot("après")
        self.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("u indice 0")
        self.play(FadeIn(l3.parts[0], scale=1.3), FadeIn(l3.parts[1]), run_time=0.3)
        self.suivre("120")
        self.play(FadeIn(l3.parts[2], scale=1.3), run_time=0.3)
        bat = batterie(1.9, 0.7).move_to(P(x - 0.9, -0.75))
        rob = robot(0.75).move_to(P(x + 0.7, -1.55), aligned_edge=DOWN)
        rep = self.repere_amel()
        self.au_mot("On place")
        self.play(*rep.anims(), FadeIn(bat), FadeIn(rob), run_time=0.6)
        pts, labs = VGroup(), VGroup()
        for n in range(4):
            d = rep.point(n, AMEL[n], r=0.1)
            lb = VGroup(self.t(f"({n} ;", 30, TERME), self.t(f"{AMEL[n]})", 30, TERME)).arrange(RIGHT, buff=0.14)
            lb.next_to(d, UR, buff=0.04)
            self.suivre(f"{n} et")
            self.play(FadeIn(lb[0], shift=UP * 0.05), run_time=0.15)
            self.suivre(fr(AMEL[n]))
            anims = [GrowFromCenter(d), Flash(d, color=TERME, line_length=0.12), FadeIn(lb[1], shift=UP * 0.05)]
            if n:
                anims.append(bat.crans[8 - n].animate.set_fill(opacity=0.12))
            self.play(*anims, run_time=0.3)
            pts.add(d)
            labs.add(lb)
        self.au_mot("points isolés")
        e1 = self.t("des points isolés", 36, JAUNE_TITRE).move_to(P(x, -2.3))
        self.play(FadeIn(e1, shift=UP * 0.1), *[Indicate(d, color=TERME, scale_factor=1.6) for d in pts], run_time=0.5)
        self.au_mot("on ne les relie")
        trait = VMobject(stroke_color=PIEGE, stroke_width=5).set_points_smoothly([d.get_center() for d in pts])
        e2 = self.t("on ne les relie pas", 34, PIEGE).move_to(P(x + 0.35, -2.95))
        cx = self.barrer(Square(0.32)).next_to(e2, LEFT, buff=0.2)
        self.play(Create(trait), FadeIn(e2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("relie pas")
        self.play(Create(cx), trait.animate.set_stroke(opacity=0.25), run_time=0.3)
        self.play(FadeOut(trait), run_time=0.3)
        self.attendre_voix(marge=0.5)
        self._amel = (rep, pts, labs, VGroup(l1, l1b, l2, l3, bat, rob, e1, e2, cx))

    # ── 03 : les points sont alignés ───────────────────────────────────────

    def ecran_alignes(self):
        self.dire("03-alignes")
        rep, pts, labs, gauche = self._amel
        x = self.XG
        self.play(FadeOut(gauche), FadeOut(labs), run_time=0.3)
        self.au_mot("alignés")
        dr = rep.droite(0, 8, lambda n: 120 - 15 * n)
        tit = self.t("Ces points sont alignés", 36, JUSTE, larg=5.3).move_to(P(x, 2.75))
        self.play(Create(dr), FadeIn(tit, shift=DOWN * 0.1), run_time=0.6)
        self.bring_to_front(pts)
        self.play(*[Indicate(d, color=JUSTE, scale_factor=1.5) for d in pts], run_time=0.4)
        f1 = formule([("u_{n} =", TERME), ("120", WHITE), ("− 15n", RAISON)], 44).move_to(P(x - 0.15, 1.75))
        self.au_mot("u indice n")
        self.play(FadeIn(f1.parts[0], scale=1.2), run_time=0.25)
        self.suivre("120")
        self.play(FadeIn(f1.parts[1], scale=1.2), run_time=0.25)
        self.suivre("15 n")
        self.play(FadeIn(f1.parts[2], scale=1.2), run_time=0.25)
        self.au_mot("comme une droite")
        cd = self.t("comme la droite", 30, GREY_A).move_to(P(x, 1.0))
        f2 = formule([("y =", GRIS_DROITE), ("120", WHITE), ("− 15x", RAISON)], 44).move_to(P(x - 0.15, 0.35))
        self.play(FadeIn(cd, shift=UP * 0.08), Indicate(dr, color=WHITE, scale_factor=1.02), run_time=0.4)
        self.au_mot("y égale")
        self.play(FadeIn(f2.parts[0], scale=1.2), run_time=0.25)
        self.suivre("120")
        self.play(FadeIn(f2.parts[1], scale=1.2), run_time=0.25)
        self.suivre("15 x")
        self.play(FadeIn(f2.parts[2], scale=1.2), run_time=0.25)
        self.au_mot("La raison")
        marches = VGroup(*[rep.marche(k, AMEL[k], AMEL[k + 1]) for k in range(3)])
        p1 = self.t("+1", 28, RAISON, audit=False).next_to(marches[1][0], UP, buff=0.08)
        self.play(*[Create(m) for m in marches], run_time=0.6)
        self.bring_to_front(pts)
        self.play(FadeIn(p1, scale=1.3), run_time=0.2)
        self.suivre("15")
        m15 = self.t("−15", 32, RAISON).next_to(marches[1][1], RIGHT, buff=0.1)
        rr = self.t("r = −15", 44, RAISON).move_to(P(x, -0.75))
        self.play(FadeIn(m15, scale=1.3), FadeIn(rr, scale=1.3), run_time=0.3)
        self.au_mot("coefficient directeur")
        cdir = self.t("le coefficient directeur", 32, WHITE).move_to(P(x, -1.3))
        self.play(FadeIn(cdir, shift=UP * 0.08), Indicate(f2.parts[2], color=RAISON, scale_factor=1.3), run_time=0.45)
        self.au_mot("Et u indice 0")
        rond = Circle(radius=0.22, color=TERME, stroke_width=5).move_to(pts[0])
        self.play(Create(rond), Flash(pts[0], color=TERME, line_length=0.18), run_time=0.4)
        self.suivre("120")
        u0 = formule([("u_{0} =", TERME), ("120", TERME)], 44).move_to(P(x, -2.1))
        self.play(FadeIn(u0, scale=1.3), run_time=0.3)
        self.au_mot("l'ordonnée")
        org = self.t("l'ordonnée à l'origine", 32, WHITE).move_to(P(x, -2.7))
        self.play(FadeIn(org, shift=UP * 0.08), Indicate(f2.parts[1], color=TERME, scale_factor=1.3), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : la raison par deux points → A (4) ────────

    XQ, XB = -3.45, 3.55          # la colonne de la question, celle des boutons

    def boutons(self, corps, largeur=4.6, fs=36, ys=(1.9, 1.0, 0.1)):
        cartes = VGroup(*[self.bouton(L, c, largeur, fs) for L, c in zip("ABC", corps)])
        for c, y in zip(cartes, ys):
            c.move_to(P(self.XB, y))
        return cartes

    def ecran_question1(self):
        x = self.XQ
        l1 = self.t("Les points d'une suite", 38).move_to(P(x, 2.55))
        l1b = self.t("arithmétique sont sur une", 38, larg=6.2).move_to(P(x, 1.99))
        l2 = self.t("droite qui passe par", 38).move_to(P(x, 1.43))
        l3 = self.morceaux([("(1 ;", TERME, "1 et"), ("7)", TERME, "7"), ("puis", WHITE, "puis"),
                            ("(4 ;", TERME, "4 et"), ("19)", TERME, "19")], 38, buff=0.17)
        l3[2].shift(RIGHT * 0.12)
        l3[3:].shift(RIGHT * 0.24)
        l3.move_to(P(x, 0.85))
        l4 = self.t("Quelle est la raison ?", 38, RAISON).move_to(P(x, 0.3))
        rep = Repere((0, 5), (0, 22), P(-6.0, -3.05), P(-1.4, -0.85), 2, etiq_u=(4, 8, 12, 16, 20),
                     etiq_n=range(0, 6))
        f = lambda n: 3 + 4 * n  # noqa: E731
        p1, p2 = rep.point(1, 7, r=0.1), rep.point(4, 19, r=0.1)
        dr = rep.droite(0, 4.75, f)

        def e1():
            self.au_mot("Les points")
            self.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
            self.au_mot("arithmétique sont")
            self.play(FadeIn(l1b, shift=UP * 0.08), run_time=0.3)
            self.au_mot("droite qui")
            self.play(FadeIn(l2, shift=UP * 0.08), *rep.anims(), run_time=0.5)

        def e2():
            self.suivre("1 et")
            self.play(FadeIn(l3[0], shift=UP * 0.08), run_time=0.15)
            self.suivre("7")
            self.play(FadeIn(l3[1], shift=UP * 0.08), GrowFromCenter(p1), run_time=0.25)
            self.suivre("puis")
            self.play(FadeIn(l3[2]), run_time=0.15)
            self.suivre("4 et")
            self.play(FadeIn(l3[3], shift=UP * 0.08), run_time=0.15)
            self.suivre("19")
            self.play(FadeIn(l3[4], shift=UP * 0.08), GrowFromCenter(p2), run_time=0.25)
            self.play(Create(dr), run_time=0.4)
            self.bring_to_front(p1, p2)
            self.au_mot("Quelle")
            self.play(FadeIn(l4, shift=UP * 0.08), run_time=0.3)

        cartes = self.boutons(["4", "12", "3"])
        q = self.question_libre("04-question", [e1, e2], cartes, P(self.XB, -0.85))
        self.dire("04b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.au_mot("l'abscisse 1")
        self.play(Indicate(p1, color=TERME, scale_factor=1.8), run_time=0.35)
        self.au_mot("l'abscisse 4")
        self.play(Indicate(p2, color=TERME, scale_factor=1.8), run_time=0.35)
        marches = VGroup(*[rep.marche(n, f(n), f(n + 1), largeur=5) for n in (1, 2, 3)])
        self.au_mot("3 pas")
        pas = self.t("3 pas", 40, RAISON).move_to(P(self.XB - 0.4, -0.95))
        self.play(*[Create(m[0]) for m in marches], FadeIn(pas, scale=1.3), run_time=0.45)
        self.au_mot("on monte")
        self.play(*[Create(m[1]) for m in marches], run_time=0.4)
        self.bring_to_front(p1, p2)
        self.suivre("12")
        monte = self.t("on monte de 12", 38, RAISON).move_to(P(self.XB - 0.4, -1.6))
        self.play(FadeIn(monte, shift=UP * 0.08), *[Indicate(m[1], color=RAISON) for m in marches], run_time=0.25)
        self.au_mot("12 divisé")
        calc = self.morceaux([("12 ÷", JUSTE, None), ("3", JUSTE, None), ("= 4", JUSTE, None)], 44, buff=0.22)
        calc.move_to(P(self.XB - 0.4, -2.3))
        self.play(FadeIn(calc[0], shift=UP * 0.08), run_time=0.25)
        self.suivre("3")
        self.play(FadeIn(calc[1], shift=UP * 0.08), run_time=0.2)
        self.suivre("4")
        cad = self.encadre(calc, JUSTE, 0.14)
        self.play(FadeIn(calc[1], scale=1.3), Create(cad), run_time=0.3)
        self.insister(VGroup(calc, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 05 : lire sur le graphique : le point d'abscisse 8 ─────────────────

    def ecran_lire(self):
        self.nouvel_ecran("05-lire")
        x = self.XG
        rep = self.repere_amel()
        dr = rep.droite(0, 8, lambda n: 120 - 15 * n)
        pts = [rep.point(n, AMEL[n], r=0.1) for n in range(9)]
        bat = batterie(2.4, 0.85).move_to(P(x - 1.0, 0.35))
        for k in (5, 6, 7):
            bat.crans[k].set_fill(opacity=0.12)
        rob = robot(0.8).move_to(P(x + 0.95, -0.85), aligned_edge=DOWN)
        tit = self.t("Le graphique d'Amel", 36, GREY_A).move_to(P(x, 2.75))
        self.au_mot("graphique d'Amel")
        self.play(*rep.anims(), FadeIn(tit), FadeIn(bat), FadeIn(rob), *[FadeIn(d) for d in pts[:4]],
                  FadeIn(dr), run_time=0.6)
        self.au_mot("15 plus bas")
        m15 = self.t("chaque point : − 15", 34, RAISON).move_to(P(x, 2.15))
        marches = [rep.marche(k, AMEL[k], AMEL[k + 1], largeur=5) for k in range(8)]
        self.play(FadeIn(m15, shift=UP * 0.08), *[Create(m) for m in marches[:3]], run_time=0.5)
        self.bring_to_front(*pts[:4])
        self.au_mot("précédent")
        for n in range(4, 8):
            self.play(Create(marches[n - 1]), GrowFromCenter(pts[n]), bat.crans[8 - n].animate.set_fill(opacity=0.12),
                      run_time=0.25)
        self.au_mot("8 arrive")
        self.play(Create(marches[7]), run_time=0.2)
        pts[8].set_color(JUSTE)
        self.play(GrowFromCenter(pts[8]), Flash(pts[8], color=JUSTE, line_length=0.2), bat.crans[0].animate.set_fill(
            PIEGE, opacity=0.6), run_time=0.4)
        self.au_mot("u indice 8")
        f = formule([("u_{8} =", TERME), ("120 − 120", WHITE), ("= 0", JUSTE)], 42)
        f.scale_to_fit_width(min(f.width, 5.3)).move_to(P(x, -1.55))
        self.play(FadeIn(f.parts[0], scale=1.2), run_time=0.25)
        self.suivre("120 moins")
        self.play(FadeIn(f.parts[1], scale=1.2), run_time=0.25)
        self.suivre("0")
        self.play(FadeIn(f.parts[2], scale=1.3), Indicate(pts[8], color=JUSTE, scale_factor=1.6), run_time=0.35)
        self.au_mot("8 livraisons")
        apres = self.t("après 8 livraisons :", 32).move_to(P(x - 0.5, -2.3))
        self.play(FadeIn(apres, shift=UP * 0.08), run_time=0.3)
        self.au_mot("recharger")
        rc = self.t("recharge !", 36, RAISON).move_to(P(x - 0.5, -2.9))
        pr = prise(0.9).next_to(rc, RIGHT, buff=0.35)
        self.play(FadeIn(rc, scale=1.2), FadeIn(pr, shift=LEFT * 0.2), bat.crans[0].animate.set_fill(opacity=0.12),
                  run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 06 : et si les points ne sont pas alignés ? ─────────────────────────

    def carte_nature(self, valeurs, l1, l2, c2, y, droite=True):
        cadre = self.carte(7.3, 1.45, P(1.55, y))
        mini = nuage_mini(valeurs, 1.5, 1.0, droite=droite).move_to(P(-1.25, y))
        a = self.t(l1, 32, WHITE).move_to(P(0, y + 0.27)).align_to(P(-0.2, 0), LEFT)
        b = self.t(l2, 34, c2).move_to(P(0, y - 0.27)).align_to(P(-0.2, 0), LEFT)
        return cadre, mini, a, b

    def ecran_nature(self):
        self.nouvel_ecran("06-nature")
        self.titre("Et si les points ne sont pas alignés ?", JAUNE_TITRE, 40, extrait="Et si", y=3.2)
        rep = Repere((0, 4.5), (0, 17.5), P(-6.1, -1.55), P(-2.9, 2.15), 2, etiq_u=(4, 8, 12, 16),
                     etiq_n=range(0, 5))
        pts = VGroup(*[rep.point(n, v, r=0.1) for n, v in enumerate(GEO)])
        self.au_mot("montent")
        self.play(*rep.anims(), run_time=0.4)
        for d in pts:
            self.play(GrowFromCenter(d), run_time=0.18)
        self.au_mot("une courbe")
        courbe = DashedVMobject(VMobject().set_points_smoothly([d.get_center() for d in pts]), num_dashes=30)
        courbe.set_stroke(GRIS_DROITE, 3)
        self.play(Create(courbe), run_time=0.6)
        self.bring_to_front(pts)
        self.au_mot("ce n'est pas")
        cx = self.barrer(VGroup(pts, courbe), buff=0.15)
        pa = self.t("pas arithmétique", 34, PIEGE).move_to(P(-4.5, -2.32))
        self.play(Create(cx), FadeIn(pa, shift=UP * 0.08), run_time=0.45)
        self.au_mot("l'allure")
        g1 = self.t("l'allure d'une suite", 30, RAISON).move_to(P(-4.5, -2.84))
        g2 = self.t("géométrique", 30, RAISON).move_to(P(-4.5, -3.27))
        self.play(FadeIn(g1, shift=UP * 0.08), run_time=0.3)
        self.au_mot("géométrique")
        self.play(FadeIn(g2, shift=UP * 0.08), run_time=0.3)
        cartes = [self.carte_nature([1, 2, 3, 4, 5], "Points alignés", "arithmétique", JUSTE, 1.85),
                  self.carte_nature([1, 2.5, 4, 5.5, 7], "Points qui montent", "raison positive", RAISON, 0.2, False),
                  self.carte_nature([7, 5.5, 4, 2.5, 1], "Points qui descendent", "raison négative", RAISON, -1.45, False)]
        for (cadre, mini, a, b), (e1, e2) in zip(cartes, (("Points alignés", "arithmétique"),
                                                          ("Points qui montent", "raison positive"),
                                                          ("Points qui descendent", "raison négative"))):
            self.au_mot(e1)
            self.play(FadeIn(cadre), FadeIn(mini, scale=0.8), FadeIn(a, shift=RIGHT * 0.1), run_time=0.35)
            self.suivre(e2)
            self.play(FadeIn(b, shift=RIGHT * 0.1), Indicate(mini.pts, color=b.get_color(), scale_factor=1.3),
                      run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : un point du nuage → B (4 ; 17) ──────────

    def ecran_question2(self):
        x = self.XQ
        l1 = self.t("La suite w est définie par", 34).move_to(P(x, 2.35))
        l2 = formule([("w_{n} =", TERME), ("5", WHITE), ("+ 3n", RAISON)], 52).move_to(P(x, 1.62))
        l3 = self.t("Quel point fait partie de sa", 34, larg=6.3).move_to(P(x, 0.9))
        l4 = self.t("représentation graphique ?", 34, larg=6.3).move_to(P(x, 0.38))
        rep = Repere((0, 6), (0, 22), P(-6.0, -2.95), P(-1.4, -0.85), 5, etiq_u=(5, 10, 15, 20),
                     etiq_n=range(0, 7), nom_u="wₙ")

        def e1():
            self.au_mot("La suite w")
            self.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
            self.au_mot("w indice n")
            self.play(FadeIn(l2.parts[0], scale=1.2), run_time=0.25)
            self.suivre("5")
            self.play(FadeIn(l2.parts[1], scale=1.2), run_time=0.25)
            self.suivre("3 n")
            self.play(FadeIn(l2.parts[2], scale=1.2), run_time=0.25)

        def e2():
            self.au_mot("Quel point")
            self.play(FadeIn(l3, shift=UP * 0.08), run_time=0.3)
            self.au_mot("représentation")
            self.play(FadeIn(l4, shift=UP * 0.08), *rep.anims(), run_time=0.45)

        cartes = self.boutons([self.morceaux([(f"({a} ;", WHITE, str(a)), (f"{b})", WHITE, str(b))], 36, buff=0.17)
                               for a, b in ((17, 4), (4, 17), (4, 20))])
        q = self.question_libre("07-question", [e1, e2], cartes, P(self.XB, -0.85))
        self.dire("07b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        pts = VGroup(*[rep.point(n, 5 + 3 * n, r=0.09) for n in range(6)])
        calc = formule([("w_{4} =", TERME), ("5 + 3 × 4", WHITE), ("= 17", JUSTE)], 44).move_to(P(self.XB - 0.5, -0.95))
        self.au_mot("w indice 4")
        self.play(FadeIn(calc.parts[0], scale=1.2), LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.15),
                  run_time=0.5)
        self.suivre("5 plus")
        self.play(FadeIn(calc.parts[1], shift=UP * 0.08), run_time=0.3)
        self.suivre("17")
        p4 = pts[4]
        self.play(FadeIn(calc.parts[2], scale=1.3), p4.animate.set_color(JUSTE).scale(1.4),
                  Flash(p4, color=JUSTE, line_length=0.18), run_time=0.4)
        self.au_mot("l'abscisse")
        v = DashedLine(p4.get_center(), rep.G(4, 0), color=RAISON, stroke_width=4, dash_length=0.08)
        a1 = self.morceaux([("abscisse", WHITE, None), ("= le rang", RAISON, None)], 36).move_to(P(self.XB - 0.6, -1.55))
        self.play(Create(v), FadeIn(a1, shift=UP * 0.08), run_time=0.4)
        self.au_mot("l'ordonnée")
        h = DashedLine(p4.get_center(), rep.G(0, 17), color=TERME, stroke_width=4, dash_length=0.08)
        a2 = self.morceaux([("ordonnée", WHITE, None), ("= le terme", TERME, None)], 36).move_to(P(self.XB - 0.6, -2.12))
        self.play(Create(h), FadeIn(a2, shift=UP * 0.08), run_time=0.4)
        self.bring_to_front(p4)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : la raison n'est pas l'ordonnée à l'origine ─────────

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        rep = Repere((0, 6), (0, 19), P(-5.45, -2.9), P(-0.95, 2.25), 1, etiq_u=PIEGE_U[1:], etiq_n=range(0, 7))
        dr = rep.droite(0, 5.6, lambda n: 2 + 3 * n)
        pts = VGroup(*[rep.point(n, v, r=0.09) for n, v in enumerate(PIEGE_U)])
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(2.9, 3.0))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), *rep.anims(), FadeIn(dr), FadeIn(pts), run_time=0.5)
        xr = 2.9
        self.au_mot("Lire la raison")
        l1 = self.t("La raison, ici ?", 38, PIEGE).move_to(P(xr, 2.05))
        fl = Arrow(l1.get_left() + P(-0.1, -0.1), pts[0].get_center() + P(0.15, 0.05), color=PIEGE, buff=0.05,
                   stroke_width=5, max_tip_length_to_length_ratio=0.06)
        self.play(FadeIn(l1, shift=LEFT * 0.1), run_time=0.3)
        self.au_mot("coupe l'axe")
        rond = Circle(radius=0.22, color=PIEGE, stroke_width=5).move_to(pts[0])
        self.play(GrowArrow(fl), Create(rond), run_time=0.45)
        self.au_mot("Ce nombre")
        cx = self.barrer(l1)
        self.play(Create(cx), FadeOut(fl), rond.animate.set_color(TERME), run_time=0.35)
        self.au_mot("u indice 0")
        u0 = formule([("u_{0}", TERME)], 42).next_to(pts[0], LEFT, buff=0.3)
        l2 = formule([("Ce nombre-là :", WHITE), ("u_{0}", TERME)], 38).move_to(P(xr, 1.2))
        self.play(FadeIn(u0, scale=1.3), FadeIn(l2, shift=UP * 0.08), run_time=0.35)
        self.au_mot("La raison, c'est")
        l3 = formule([("La raison", WHITE), ("r", RAISON), (":", WHITE)], 38).move_to(P(xr, 0.2))
        m = rep.marche(3, 11, 14)
        self.play(FadeIn(l3, shift=UP * 0.08), run_time=0.3)
        self.au_mot("de combien")
        l4 = self.t("de combien on monte,", 34).move_to(P(xr, -0.4))
        self.play(FadeIn(l4, shift=UP * 0.08), Create(m[1]), run_time=0.35)
        lr = self.t("r", 38, RAISON).next_to(m[1], RIGHT, buff=0.1)
        self.play(FadeIn(lr, scale=1.4), run_time=0.2)
        self.au_mot("ou on descend")
        l5 = self.t("ou on descend,", 34).move_to(P(xr, -1.0))
        self.play(FadeIn(l5, shift=UP * 0.08), run_time=0.3)
        self.au_mot("quand on avance")
        l6 = self.t("quand on avance d'un rang", 34).move_to(P(xr, -1.6))
        rang = self.t("un rang", 28, RAISON).next_to(m[0], DOWN, buff=0.2).shift(RIGHT * 0.35)
        self.play(FadeIn(l6, shift=UP * 0.08), Create(m[0]), run_time=0.35)
        self.bring_to_front(pts)
        self.au_mot("d'un rang")
        self.play(FadeIn(rang, scale=1.3), Indicate(m, color=RAISON), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        x = -3.6
        l1 = self.t("Les points d'une suite", 36).move_to(P(x, 2.5))
        l1b = self.t("arithmétique sont sur", 36).move_to(P(x, 1.95))
        l2 = self.t("la droite d'équation", 36).move_to(P(x, 1.4))
        eq = formule([("y =", GRIS_DROITE), ("30", WHITE), ("− 2x", RAISON)], 56).move_to(P(x, 0.62))
        rep = Repere((0, 10), (0, 32), P(1.65, -1.75), P(5.2, 2.3), 2, etiq_u=(10, 20, 30), etiq_n=(0, 2, 4, 6, 8, 10))
        dr = rep.droite(0, 10, lambda n: 30 - 2 * n)
        self.au_mot("Les points")
        self.play(FadeIn(l1, shift=UP * 0.08), *rep.anims(), run_time=0.4)
        self.au_mot("sont sur")
        self.play(FadeIn(l1b, shift=UP * 0.08), run_time=0.3)
        self.au_mot("la droite")
        self.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("y égale")
        self.play(FadeIn(eq.parts[0], scale=1.2), run_time=0.25)
        self.suivre("30")
        self.play(FadeIn(eq.parts[1], scale=1.2), run_time=0.25)
        self.suivre("2 x")
        self.play(FadeIn(eq.parts[2], scale=1.2), Create(dr), run_time=0.45)
        fs = 38
        noms = [formule([("u_{0} =", TERME)], fs), formule([("r =", RAISON)], fs),
                self.t("sens de variation :", fs - 8), formule([("u_{6} =", TERME)], fs)]
        asks = []
        for k, (nm, ex) in enumerate(zip(noms, ("Donne u indice 0", "la raison", "le sens", "u indice 6"))):
            nm.move_to(P(0, -0.2 - 0.62 * k)).align_to(P(-6.3, 0), LEFT)
            qm = self.t("?", fs, RAISON).next_to(nm, RIGHT, buff=0.25)
            self.au_mot(ex)
            self.play(FadeIn(nm, shift=RIGHT * 0.1), FadeIn(qm, scale=1.4), run_time=0.3)
            asks.append((nm, qm))
        self.defi_pause(-2.95, x=-2.85)
        self._defi = (tit, rep, asks)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, rep, asks = self._defi
        pts = VGroup(*[rep.point(n, v, r=0.08) for n, v in enumerate(DEFI)])
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.08),
                  run_time=0.6)

        def remplacer(k, morceaux, avec=()):
            nm, qm = asks[k]
            v = self.morceaux(morceaux, 38).next_to(nm, RIGHT, buff=0.25)
            return v, qm

        self.au_mot("L'ordonnée")
        rond = Circle(radius=0.2, color=JUSTE, stroke_width=5).move_to(pts[0])
        self.play(Create(rond), Flash(pts[0], color=JUSTE, line_length=0.15), run_time=0.4)
        self.suivre("30")
        v, qm = remplacer(0, [("30", JUSTE, None)])
        self.play(ReplacementTransform(qm, v), run_time=0.3)
        self.au_mot("coefficient directeur")
        m = rep.marche(3, 24, 22, largeur=6)
        p1 = self.t("+1", 30, RAISON, audit=False).next_to(m[0], UP, buff=0.08)
        self.play(Create(m), FadeIn(p1), run_time=0.45)
        self.bring_to_front(pts)
        self.suivre("2")
        m2 = self.t("−2", 32, RAISON).next_to(m[1], RIGHT, buff=0.3).shift(UP * 0.2)
        v, qm = remplacer(1, [("−2", JUSTE, None)])
        self.play(ReplacementTransform(qm, v), FadeIn(m2, scale=1.3), run_time=0.3)
        self.au_mot("décroissante")
        nm, qm = asks[2]
        v = self.t("décroissante", 32, JUSTE).next_to(nm, RIGHT, buff=0.2)
        self.play(ReplacementTransform(qm, v), run_time=0.35)
        self.au_mot("30 moins")
        nm, qm = asks[3]
        v = self.morceaux([("30 −", WHITE, None), ("2 ×", WHITE, None), ("6", WHITE, None), ("= 18", JUSTE, None)], 38, buff=0.2)
        v.next_to(nm, RIGHT, buff=0.25)
        self.play(ReplacementTransform(qm, v[0]), run_time=0.25)
        self.suivre("2 fois")
        self.play(FadeIn(v[1], shift=UP * 0.08), run_time=0.2)
        self.suivre("6")
        self.play(FadeIn(v[2], shift=UP * 0.08), run_time=0.2)
        self.suivre("18")
        p6 = pts[6]
        h = DashedLine(p6.get_center(), rep.G(0, 18), color=JUSTE, stroke_width=3, dash_length=0.08)
        self.play(FadeIn(v[3], scale=1.3), p6.animate.set_color(JUSTE).scale(1.5), Create(h), run_time=0.4)
        cad = self.encadre(v[3], JUSTE, 0.1)
        self.play(Create(cad), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [formule([("Les points", WHITE), ("(n ; u_{n})", TERME), ("d'une suite arithmétique", WHITE)], fs),
              self.t("sont alignés, sur la droite", fs),
              formule([("y = u_{0} + r x", JUSTE)], 46)]
        p2 = [formule([("La raison", WHITE), ("r", RAISON), ("est le coefficient directeur :", WHITE)], fs),
              self.t("l'écart entre deux points qui se suivent.", fs)]
        self.finale([(p1, ["Les points", "sont alignés", "y égale"]), (p2, ["La raison", "l'écart"])])

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_points()
        self.ecran_alignes()
        self.ecran_question1()
        self.ecran_lire()
        self.ecran_nature()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin()
