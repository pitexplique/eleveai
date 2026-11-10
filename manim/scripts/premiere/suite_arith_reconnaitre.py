# suite_arith_reconnaitre.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite arithmétique :
# la reconnaître » (16:9), ceinture VERTE. Série SUITES, épisode 01 (pilote).
# Micro du coach : lin_suite_reconnaitre (notion lin_suite_arithmetique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-arithmetiques.bank.ts
# + suites-arithmetiques-renfort.ts.
#
# Ce que demande le coach → écran :
#   · ★1 raison d'une liste (réponse courte)      → 02-ecarts, 03-definition, 08 ;
#   · ★1 nature en QCM (liste ou situation)       → 01-situation, 04-question ;
#   · ★1 raison d'un motif                         → 06-motif (la croix) ;
#   · ★2-3 nature avec la raison                   → 04b, 05-negative, 09 défi ;
#   · ★2-3 motif linéaire ou non, piège ×          → 07-piege (2, 4, 8, 16) ;
#   · erreur typique « celui d'avant moins l'autre » → 08-question (B : −4).
# Clé de voix → écran :
#   00-garde (escalier aux marches égales, échelle des ceintures) · 01 Lucas,
#   agriculteur : la haie qui s'allonge (40, 70, 100, 130 arbres, en barres
#   d'arbres, les 3 arbres neufs en orange) · 02 les écarts « + 30 » qui sautent
#   de case en case · 03 la définition, la raison r = 30 · 04/04b question
#   (C : 20 ; 17 ; 14 ; 11) · 05 le silo qui se vide (900, 840, 780 : r = −60)
#   · 06 la croix de carreaux (5, 9, 13 : r = 4) · 07 le piège 2, 4, 8, 16
#   (écarts en rouge, × 2, nuage de points) · 08/08b question (A : 4) ·
#   09/09b défi 12 ; 9,5 ; 7 ; 4,5 (r = −2,5) · 10 « Ce que tu as appris » ·
#   11 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et écarts,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix VALIDÉE (10/11) : manim/voix/premiere-suite-arith-reconnaitre.json (débit −6),
# calée mot à mot par suite_arith_reconnaitre_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_arith_reconnaitre.py SuiteArithReconnaitre1re -o eleveai-maths-premiere-suite-arith-reconnaitre --media_dir manim/scripts/premiere/media-suite-arith-reconnaitre
# Sortie : manim/sorties/premiere/maths/suites/01-arith-reconnaitre/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
HAIE = [40, 70, 100, 130]
assert all(b - a == 30 for a, b in zip(HAIE, HAIE[1:]))
SILO = [900, 840, 780]
assert all(b - a == -60 for a, b in zip(SILO, SILO[1:]))
CROIX = [1 + 4 * k for k in (1, 2, 3)]
assert CROIX == [5, 9, 13]
Q1 = [[3, 6, 12, 24], [5, 8, 12, 17], [20, 17, 14, 11]]
_ar = [len({b - a for a, b in zip(l, l[1:])}) == 1 for l in Q1]
assert _ar == [False, False, True] and Q1[2][1] - Q1[2][0] == -3          # réponse C, r = −3
assert [b - a for a, b in zip([2, 4, 8, 16], [4, 8, 16])] == [2, 4, 8]
Q2 = [7, 11, 15, 19]
assert all(b - a == 4 for a, b in zip(Q2, Q2[1:]))                          # réponse A : 4
DEFI = [12, 9.5, 7, 4.5]
assert all(abs(b - a + 2.5) < 1e-9 for a, b in zip(DEFI, DEFI[1:]))        # r = −2,5

VERT_ARBRE, TRONC, SOL = "#22C55E", "#92400E", "#78350F"
GRAIN = "#EAB308"


def arbre(couleur=VERT_ARBRE, s=1.0):
    """Un arbre stylisé : tronc brun, houppier rond."""
    tronc = Rectangle(width=0.08, height=0.14, fill_color=TRONC, fill_opacity=1, stroke_width=0).move_to(P(0, -0.1))
    hou = Circle(radius=0.13, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.06))
    return VGroup(tronc, hou).scale(s)


def colonne_arbres(n, x, y0, neufs=0, pas=0.31):
    """Une barre d'arbres : n arbres empilés depuis y0, les `neufs` du haut en orange."""
    return VGroup(*[arbre(RAISON if k >= n - neufs else VERT_ARBRE).move_to(P(x, y0 + pas * k))
                    for k in range(n)])


def lucas(s=1.0):
    """Lucas, agriculteur : chapeau de paille, salopette, un jeune arbre à la main."""
    tete = Circle(radius=0.28, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    bord = Ellipse(width=0.95, height=0.16, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, 1.2))
    calotte = RoundedRectangle(width=0.5, height=0.26, corner_radius=0.1, fill_color="#FDE68A", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 1.33))
    ruban = Rectangle(width=0.5, height=0.06, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(P(0, 1.24))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#F1F5F9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    salop = RoundedRectangle(width=0.7, height=0.8, corner_radius=0.12, fill_color="#1D4ED8", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.05))
    bretelles = VGroup(Line(P(-0.25, 0.32), P(-0.3, 0.62)), Line(P(0.25, 0.32), P(0.3, 0.62))).set_stroke("#1D4ED8", 7)
    plant = arbre(VERT_ARBRE, 1.6).move_to(P(0.75, 0.15))
    return VGroup(corps, salop, bretelles, tete, bord, calotte, ruban, plant).scale(s)


def oiseau(s=1.0):
    o = VMobject(stroke_color=WHITE, stroke_width=4)
    o.set_points_smoothly([P(-0.25, 0.08), P(-0.12, 0.12), P(0, 0), P(0.12, 0.12), P(0.25, 0.08)])
    return o.scale(s)


def silo(hauteur=3.2, largeur=1.7):
    """Le silo en coupe : le corps (son contenu se remplit à part) et le toit."""
    corps = Rectangle(width=largeur, height=hauteur, stroke_color=GREY_B, stroke_width=4)
    toit = Arc(radius=largeur / 2, start_angle=0, angle=PI, stroke_color=GREY_B, stroke_width=4)
    toit.next_to(corps, UP, buff=0)
    goulotte = Polygon(corps.get_corner(DR) + P(0, 0.35), corps.get_corner(DR) + P(0.35, 0.15),
                       corps.get_corner(DR) + P(0.35, 0.0), corps.get_corner(DR) + P(0, 0.12),
                       stroke_color=GREY_B, stroke_width=3)
    return VGroup(corps, toit, goulotte)


def croix(etape, cote=0.34, x=0.0, y=0.0):
    """La croix de carreaux de l'étape k : un carreau central, 4 bras de k
    carreaux ; le carreau au bout de chaque bras (neuf) est à part."""
    def carreau(i, j, coul):
        return Square(cote, fill_color=coul, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).move_to(
            P(x + i * cote, y + j * cote))
    anciens = VGroup(carreau(0, 0, TERME))
    neufs = VGroup()
    for (di, dj) in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        for k in range(1, etape + 1):
            (neufs if k == etape and etape > 1 else anciens).add(
                carreau(di * k, dj * k, RAISON if (k == etape and etape > 1) else TERME))
    return VGroup(anciens, neufs)


class SuiteArithReconnaitre1re(PaysageSuites):
    fichier_marques = "suite_arith_reconnaitre_marques.json"
    nom_voix = "premiere-suite-arith-reconnaitre"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def escalier(self):
        """Des marches toutes égales : les termes (points bleus), le pas (orange)."""
        x0, y0, w, h = -2.6, -1.85, 1.05, 0.34
        marches, pas, points = VGroup(), VGroup(), VGroup()
        for k in range(5):
            marches.add(Line(P(x0 + k * w, y0 + k * h), P(x0 + (k + 1) * w, y0 + k * h), stroke_width=5,
                             color=GREY_B))
            points.add(Dot(P(x0 + k * w + w / 2, y0 + k * h + 0.12), radius=0.09, color=TERME))
            if k < 4:
                pas.add(Line(P(x0 + (k + 1) * w, y0 + k * h), P(x0 + (k + 1) * w, y0 + (k + 1) * h),
                             stroke_width=7, color=RAISON))
        self.play(Create(marches), run_time=0.4)
        self.au_mot("même pas")
        for k in range(5):
            anims = [GrowFromCenter(points[k])]
            if k < 4:
                anims.append(Create(pas[k]))
            self.play(*anims, run_time=0.16)

    def ecran_garde(self):
        self.garde("Suite arithmétique",
                   [("la reconnaître", "la reconnaître", TERME),
                    ("Comment savoir qu'une liste de nombres", "Comment"),
                    ("avance toujours du même pas ?", "avance")],
                   dessin=self.escalier)

    # ── 01 : Lucas et sa haie ──────────────────────────────────────────────

    XS_HAIE = (-1.0, 0.7, 2.4, 4.1)
    Y_PIED, Y_CASES = -1.55, -2.2

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = lucas(1.0).move_to(P(-4.9, 1.05))
        nom = self.t("Lucas", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = self.t("agriculteur", 34, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Lucas")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("agriculteur")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        sol = Rectangle(width=6.6, height=0.12, fill_color=SOL, fill_opacity=1, stroke_width=0)
        sol.move_to(P(1.55, self.Y_PIED - 0.2))
        self.au_mot("haies d'arbres")
        echant = VGroup(*[arbre().move_to(P(-1.6 + 0.32 * k, self.Y_PIED)) for k in range(4)])
        self.play(FadeIn(sol), LaggedStart(*[FadeIn(a, shift=UP * 0.15) for a in echant], lag_ratio=0.2),
                  run_time=0.6)
        self.au_mot("sols")
        self.play(Indicate(sol, color="#B45309", scale_factor=1.05), run_time=0.5)
        self.au_mot("oiseaux")
        ois = oiseau(1.0).move_to(P(-2.2, 2.6))
        self.play(FadeIn(ois), ois.animate.move_to(P(3.2, 2.9)), run_time=1.2, rate_func=smooth)
        self.play(FadeOut(ois, shift=RIGHT * 0.5), FadeOut(echant), run_time=0.3)
        # la haie, année après année : une barre d'arbres par année
        lg = LigneTermes([str(v) for v in HAIE], xs=self.XS_HAIE, centre=P(0, self.Y_CASES), largeur=1.25,
                         hauteur=0.62, fs=32)
        cols = [colonne_arbres(v // 10, x, self.Y_PIED, neufs=0 if k == 0 else 3)
                for k, (v, x) in enumerate(zip(HAIE, self.XS_HAIE))]
        self.au_mot("40 arbres")
        self.play(LaggedStart(*[FadeIn(a, shift=UP * 0.2) for a in cols[0]], lag_ratio=0.15),
                  FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4), run_time=0.6)
        self.au_mot("30 de plus")
        plus = self.t("+ 30", 34, RAISON).next_to(cols[1][-1], UP, buff=0.2)
        base1 = cols[1][:4]
        self.play(TransformFromCopy(cols[0], base1), FadeIn(plus, shift=DOWN * 0.1), run_time=0.45)
        self.play(LaggedStart(*[FadeIn(a, scale=1.6) for a in cols[1][4:]], lag_ratio=0.2), run_time=0.45)
        self.suivre("40")
        self.play(Indicate(lg.cases[0], color=TERME, scale_factor=1.15), run_time=0.35)
        self.suivre("70")
        self.montrer_case(lg, 1, run_time=0.25)
        for k in (2, 3):
            self.suivre(str(HAIE[k]))
            anc = cols[k][:-3]
            self.play(TransformFromCopy(cols[k - 1], anc), FadeIn(cols[k][-3:], scale=1.5),
                      FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), run_time=0.3)
            for a in anc:
                a[1].set_fill(VERT_ARBRE)
        self.attendre_voix(marge=0.5)
        self._haie = (perso, nom, metier, sol, cols, lg, plus)

    # ── 02 : les écarts ────────────────────────────────────────────────────

    def calcul(self, morceaux, y, x=-6.25, fs=40, avec=()):
        """Un calcul écrit morceau par morceau : [(texte, couleur, extrait), …] ;
        chaque morceau quand la voix dit son extrait (None : avec le précédent)."""
        ts = [self.t(m, fs, c) for m, c, _ in morceaux]
        g = VGroup(*ts).arrange(RIGHT, buff=0.18).move_to(P(0, y)).align_to(P(x, 0), LEFT)
        paquet = []
        for tx, (_, _, ex) in zip(ts, morceaux):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], run_time=0.2)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(tx)
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=0.3)
        return g

    def ecran_ecarts(self):
        self.dire("02-ecarts")
        perso, nom, metier, sol, cols, lg, plus = self._haie
        self.play(FadeOut(VGroup(perso, nom, metier, plus), shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("l'écart")
        tit = self.t("L'écart", 44, RAISON).move_to(P(-4.2, 2.6))
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.35)
        lignes = []
        for k, y in zip((1, 2, 3), (1.6, 0.75, -0.1)):
            a, b = str(HAIE[k]), str(HAIE[k - 1])
            s = lg.saut(k - 1, "+ 30", fs=28)
            lg.sauts[k - 1] = s
            lignes.append(self.calcul([(a, WHITE, a), ("−", WHITE, None), (b, WHITE, b), ("=", WHITE, "30"),
                                       ("30", RAISON, None)], y, avec=[Create(s[0]), FadeIn(s[1], scale=1.4)]))
            self.play(Indicate(cols[k][-3:], color=RAISON, scale_factor=1.25), run_time=0.4)
        self.au_mot("L'écart est")
        r1 = self.t("L'écart est", 34, WHITE)
        r2 = self.t("toujours le même", 34, RAISON)
        reg = VGroup(r1, r2).arrange(DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, -1.2)).align_to(P(-6.25, 0), LEFT)
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("toujours")
        self.play(FadeIn(r2, shift=UP * 0.1), *[Indicate(l[-1], color=RAISON, scale_factor=1.3) for l in lignes],
                  *[Indicate(s[1], color=RAISON, scale_factor=1.3) for s in lg.sauts.values()], run_time=0.6)
        self.attendre_voix(marge=0.5)
        self._ecarts = (tit, VGroup(*lignes), VGroup(r1, r2))

    # ── 03 : la définition, la raison ──────────────────────────────────────

    def ecran_definition(self):
        self.dire("03-definition")
        perso, nom, metier, sol, cols, lg, plus = self._haie
        tit, lignes, reg = self._ecarts
        sauts = VGroup(*lg.sauts.values())
        self.play(FadeOut(VGroup(tit, lignes, reg, sol, *cols)), run_time=0.4)
        bloc = VGroup(lg, sauts)
        self.play(bloc.animate.shift(P(-1.55, 3.45)), run_time=0.5)
        self.au_mot("d'un terme")
        self.play(Indicate(lg.cases[0], color=TERME, scale_factor=1.2), run_time=0.35)
        self.au_mot("au suivant")
        self.play(Indicate(lg.cases[1], color=TERME, scale_factor=1.2), run_time=0.35)
        self.au_mot("ajoutant")
        for s in lg.sauts.values():
            self.play(Indicate(s, color=RAISON, scale_factor=1.15), run_time=0.3)
        self.au_mot("arithmétique")
        d = self.t("suite arithmétique", 52, JAUNE_TITRE).move_to(P(0, -0.35))
        cad = self.encadre(d, JAUNE_TITRE, 0.2)
        self.play(FadeIn(d, scale=1.3), Create(cad), run_time=0.5)
        self.au_mot("raison")
        r1 = self.t("la raison :", 44, WHITE)
        r2 = self.t("r", 50, RAISON)
        rr = VGroup(r1, r2).arrange(RIGHT, buff=0.25).move_to(P(0, -1.5))
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("r.")
        nouveaux = [self.t("+ r", 30, RAISON).move_to(s[1]) for s in lg.sauts.values()]
        self.play(FadeIn(r2, scale=1.5), *[ReplacementTransform(s[1], n) for s, n in zip(lg.sauts.values(), nouveaux)],
                  run_time=0.5)
        self.au_mot("égale")
        e1 = self.t("r =", 46, RAISON)
        e2 = self.t("30", 46, RAISON)
        ee = VGroup(e1, e2).arrange(RIGHT, buff=0.2).move_to(P(0, -2.6))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("30")
        cad2 = self.encadre(ee, RAISON, 0.18)
        self.play(FadeIn(e2, scale=1.4), Create(cad2), run_time=0.35)
        self.insister(VGroup(ee, cad2), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : laquelle est arithmétique ? → C ─────────

    def ecarts_sous(self, liste, texte, couleur=RAISON, fs=26, bas=None):
        """De petites flèches sous une liste_nombres, d'un nombre au suivant."""
        g = VGroup()
        for a, b in zip(liste.nombres, liste.nombres[1:]):
            y = (bas if bas is not None else a.get_bottom()[1]) - 0.06
            fl = CurvedArrow(P(a.get_center()[0], y), P(b.get_center()[0], y), angle=TAU / 4,
                             color=couleur, stroke_width=3, tip_length=0.12)
            lab = self.t(texte, fs, couleur).next_to(fl, DOWN, buff=0.04)
            g.add(VGroup(fl, lab))
        return g

    def ecran_question1(self):
        listes = [liste_nombres([str(v) for v in l], 34) for l in Q1]
        q = self.poser_question("04-question",
                                [(self.t("Laquelle de ces listes est arithmétique ?", 38), "Laquelle")],
                                listes, 2)
        self.dire("04b-reponse")
        self.q_reponse(q, 2)
        self.au_mot("3 à")
        ec = self.ecarts_sous(listes[2], "−3", bas=q.cartes[2].get_bottom()[1])
        self.play(*[Create(e[0]) for e in ec], run_time=0.3)
        self.play(*[FadeIn(e[1], scale=1.3) for e in ec], run_time=0.2)
        self.au_mot("3", n=2)
        rr = VGroup(self.t("r =", 40, JUSTE), self.t("−3", 40, JUSTE)).arrange(RIGHT, buff=0.15)
        rr.next_to(q.cartes[2], RIGHT, buff=0.45)
        cad = self.encadre(rr, JUSTE)
        self.play(FadeIn(rr, scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 05 : la raison négative : le silo ──────────────────────────────────

    def ecran_negative(self):
        self.nouvel_ecran("05-negative")
        self.titre("La raison peut être négative", RAISON, 44, extrait="négative")
        si = silo().move_to(P(-4.6, -0.45))
        corps = si[0]
        bas, H = corps.get_bottom()[1], corps.height

        def grain(t):
            r = Rectangle(width=corps.width - 0.08, height=H * t / 1000, fill_color=GRAIN, fill_opacity=0.9,
                          stroke_width=0)
            return r.move_to(P(corps.get_center()[0], bas + 0.02 + H * t / 2000))

        self.au_mot("silo")
        lsi = self.t("le silo de Lucas", 30, GREY_A).next_to(si, UP, buff=0.15)
        self.play(Create(si), FadeIn(lsi), run_time=0.6)
        self.au_mot("900 tonnes")
        g = grain(900)
        lab = self.t("900 t", 34, WHITE).next_to(g, RIGHT, buff=0.55).align_to(g, UP)
        self.play(GrowFromEdge(g, DOWN), FadeIn(lab), run_time=0.5)
        self.bring_to_front(si)
        self.au_mot("60 tonnes")
        bec = si[2].get_right()
        flux = VGroup(*[Dot(bec + P(0.16 * k, -0.12 * k), radius=0.05, color=GRAIN) for k in range(1, 5)])
        sort = self.t("− 60 t", 34, RAISON).next_to(flux, RIGHT, buff=0.15)
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.15) for d in flux], lag_ratio=0.2), FadeIn(sort),
                  run_time=0.5)
        lg = LigneTermes([str(v) for v in SILO], xs=(0.4, 2.5, 4.6), centre=P(0, 0.9), largeur=1.45, hauteur=0.75,
                         fs=36)
        for k, v in enumerate(SILO):
            self.suivre(str(v))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4)]
            if k:
                g2 = grain(v)
                lab2 = self.t(f"{v} t", 34, WHITE).move_to(lab).align_to(g2, UP)
                anims += [Transform(g, g2), Transform(lab, lab2), Indicate(flux, color=RAISON)]
            self.play(*anims, run_time=0.35)
        self.au_mot("60", n=2)
        for k in (0, 1):
            s = lg.saut(k, "− 60", fs=30)
            lg.sauts[k] = s
        rr = VGroup(self.t("r =", 44, RAISON), self.t("−60", 44, RAISON)).arrange(RIGHT, buff=0.15)
        rr.move_to(P(2.5, -1.35))
        cad = self.encadre(rr, RAISON, 0.18)
        self.play(*[Create(s[0]) for s in lg.sauts.values()], *[FadeIn(s[1], scale=1.4) for s in lg.sauts.values()],
                  FadeIn(rr, scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 06 : un motif : la croix de carreaux ───────────────────────────────

    XS_CROIX = (-4.9, -1.7, 2.2)   # la croix × 1,6 (retour du 10/11) : carreau 0,5

    def ecran_motif(self):
        self.nouvel_ecran("06-motif")
        self.titre("Un motif qui cache une suite", JAUNE_TITRE, 42, extrait="Un motif")
        croix_ = [croix(k, 0.5, x, 0.85) for k, x in zip((1, 2, 3), self.XS_CROIX)]
        lg = LigneTermes([str(v) for v in CROIX], xs=self.XS_CROIX, centre=P(0, -2.05), largeur=1.85, hauteur=1.05,
                         fs=56)
        etapes = [self.t(f"étape {k}", 44, GREY_A).move_to(P(x, -1.22)) for k, x in zip((1, 2, 3), self.XS_CROIX)]
        self.au_mot("croix")
        self.play(LaggedStart(*[GrowFromCenter(c) for c in croix_[0][0]], lag_ratio=0.12), run_time=0.6)
        for k in range(3):
            self.suivre(str(CROIX[k]))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4)]
            if k:
                anims.insert(0, TransformFromCopy(VGroup(*croix_[k - 1][0], *croix_[k - 1][1]), croix_[k][0]))
            self.play(*anims, run_time=0.35)
            if k:
                self.play(LaggedStart(*[GrowFromCenter(c) for c in croix_[k][1]], lag_ratio=0.15), run_time=0.3)
            self.suivre(str(k + 1))
            self.play(FadeIn(etapes[k], shift=UP * 0.1), run_time=0.25)
        self.au_mot("4 carreaux")
        for k in (0, 1):
            lg.sauts[k] = lg.saut(k, "+ 4", fs=42)
        self.play(*[Create(x[0]) for x in lg.sauts.values()], run_time=0.3)
        self.play(*[FadeIn(x[1], scale=1.4) for x in lg.sauts.values()], run_time=0.2)
        self.au_mot("un au bout")
        for k in (1, 2):
            self.play(*[Flash(c, color=RAISON, line_length=0.22, num_lines=8) for c in croix_[k][1]],
                      Indicate(croix_[k][1], color=RAISON, scale_factor=1.15), run_time=0.45)
        self.au_mot("raison est")
        rr = VGroup(self.t("r =", 60, RAISON), self.t("4", 60, RAISON)).arrange(RIGHT, buff=0.2)
        rr.move_to(P(5.25, 0.9))
        self.play(FadeIn(rr[0]), run_time=0.2)
        self.suivre("4")
        cad = self.encadre(rr, RAISON, 0.16)
        self.play(FadeIn(rr[1], scale=1.4), Create(cad), run_time=0.3)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : 2, 4, 8, 16 ────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(-3.45, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        vals = [2, 4, 8, 16]
        lg = LigneTermes([str(v) for v in vals], xs=(-5.7, -4.2, -2.7, -1.2), centre=P(0, 1.2), largeur=1.05,
                         hauteur=0.7, fs=36)
        nu = NuageTermes((0, 4.5), (0, 17.5), P(0.9, -1.9), P(5.0, 2.4))
        for n in range(1, 5):
            nu.add(nu.graduation_n(n))
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), *[FadeIn(g) for g in nu[4:]],
                  run_time=0.4)
        pts = []
        for k, v in enumerate(vals):
            self.suivre(str(v))
            d = nu.point(k + 1, v)
            self.play(FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), GrowFromCenter(d),
                      run_time=0.3)
            pts.append(d)
        self.au_mot("ajoute")
        marches = []
        for k, d in enumerate(vals[1:]):
            self.suivre(str(d - vals[k]))
            hor = DashedLine(nu.G(k + 1, vals[k]), nu.G(k + 2, vals[k]), color=GREY_B, stroke_width=2)
            ver = Line(nu.G(k + 2, vals[k]), nu.G(k + 2, d), color=PIEGE, stroke_width=6)
            s = lg.saut(k, f"+ {d - vals[k]}", cote=UP, couleur=PIEGE, fs=30)
            lg.sauts[k] = s
            self.play(Create(s[0]), FadeIn(s[1], scale=1.4), Create(hor), Create(ver), run_time=0.35)
            marches.append(ver)
        self.au_mot("écarts changent")
        e1 = self.t("les écarts changent", 36, PIEGE).move_to(P(0, -0.75)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(e1, shift=UP * 0.1), *[Indicate(m, color=PIEGE) for m in marches], run_time=0.5)
        self.au_mot("pas arithmétique")
        cx = self.barrer(Square(0.4))
        e2 = VGroup(cx, self.t("pas arithmétique", 36, PIEGE)).arrange(RIGHT, buff=0.25)
        e2.move_to(P(0, -1.45)).align_to(P(-6.3, 0), LEFT)
        self.play(Create(cx), FadeIn(e2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("multiplie")
        self.suivre("2")
        fois = [lg.saut(k, "× 2", couleur=RAISON, fs=30) for k in range(3)]
        self.play(*[Create(x[0]) for x in fois], run_time=0.25)
        self.play(*[FadeIn(x[1], scale=1.4) for x in fois], run_time=0.2)
        self.au_mot("géométrique")
        e3 = self.t("suite géométrique", 36, RAISON)
        e3.move_to(P(0, -2.15)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(e3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("autre vidéo")
        e4 = self.t("dans une autre vidéo", 30, GREY_A).move_to(P(0, -2.8)).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(e4, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : la raison de 7, 11, 15, 19 → A ──────────

    def ecran_question2(self):
        lg = LigneTermes([str(v) for v in Q2], pas=1.55, largeur=1.15, hauteur=0.72, fs=36)
        q = self.poser_question("08-question",
                                [(self.t("Les termes d'une suite sont :", 38), "Les termes"), (lg, None),
                                 (self.t("Sa raison est :", 38), "Sa raison")],
                                ["4", "−4", "7"], 0, en_ligne=True, largeur=2.6, fs=36)
        self.dire("08b-reponse")
        self.q_reponse(q, 0)
        y = q.cartes.get_bottom()[1] - 0.55
        c1 = self.calcul([("11", JUSTE, "11"), ("−", JUSTE, None), ("7", JUSTE, "7"), ("=", JUSTE, "4"),
                          ("4", JUSTE, None)], y, x=-5.4, avec=self.allumer_cases(lg, (0, 1)))
        self.au_mot("un terme")
        regle = self.t("un terme − celui d'avant", 36, WHITE).move_to(P(-1.2, y - 0.8))
        self.play(FadeIn(regle, shift=UP * 0.1), run_time=0.35)
        self.au_mot("pas l'inverse")
        inv = self.t("7 − 11", 38, PIEGE, audit=False).move_to(P(2.6, y))  # l'inverse : nombres déjà dits
        self.play(FadeIn(inv, shift=UP * 0.1), run_time=0.25)
        self.play(Create(self.barrer(inv)), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi ───────────────────────────────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        lg = LigneTermes([fr(v) for v in DEFI], centre=P(0, 1.55), pas=2.1, largeur=1.4, hauteur=0.8, fs=38)
        self.au_mot("Les termes")
        tt = self.t("Les termes d'une suite :", 36, GREY_A).move_to(P(0, 2.45))
        self.play(FadeIn(tt, shift=DOWN * 0.1), run_time=0.3)
        self.remplir_ligne(lg)
        self.au_mot("Est-elle")
        sauts = [lg.saut(k, "?", fs=40) for k in range(3)]
        q1 = self.t("Est-elle arithmétique ?", 40, WHITE).move_to(P(0, -0.35))
        self.play(*[Create(x[0]) for x in sauts], FadeIn(q1, shift=UP * 0.1), run_time=0.4)
        self.play(*[FadeIn(x[1], scale=1.5) for x in sauts], run_time=0.25)
        self.au_mot("Si oui")
        q2 = self.t("Si oui, quelle est sa raison ?", 40, RAISON).move_to(P(0, -1.1))
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.35)
        self.defi_pause(-2.35, x=-0.6)
        self._defi = (tt, lg, sauts, q1, q2)

    def ecran_correction(self):
        self.dire("09b-correction")
        tt, lg, sauts, q1, q2 = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 40, JUSTE).move_to(P(0, 2.45))
        self.play(FadeOut(q1), FadeOut(q2), ReplacementTransform(tt, cor), run_time=0.4)
        lignes = []
        for k, y in zip(range(3), (-0.25, -1.05, -1.85)):
            a, b = fr(DEFI[k + 1]), fr(DEFI[k])
            res = self.t("− 2,5", 34, RAISON).move_to(sauts[k][1])
            lignes.append(self.calcul([(a, WHITE, a), ("−", WHITE, None), (b, WHITE, b), ("=", WHITE, "2,5"),
                                       ("−2,5", RAISON, None)], y, x=-6.2, fs=38,
                                      avec=[ReplacementTransform(sauts[k][1], res)]))
            sauts[k] = VGroup(sauts[k][0], res)
        self.au_mot("toujours")
        self.play(*[Indicate(l[-1], color=RAISON, scale_factor=1.25) for l in lignes],
                  *[Indicate(x[1], color=RAISON, scale_factor=1.25) for x in sauts], run_time=0.6)
        self.au_mot("arithmétique")
        v1 = VGroup(self.coche(JUSTE, 0.22), self.t("arithmétique", 40, JUSTE)).arrange(RIGHT, buff=0.2)
        v1.move_to(P(2.6, -0.55))
        self.play(Create(v1[0]), FadeIn(v1[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("2,5", n=4)
        rr = VGroup(self.t("r =", 44, JUSTE), self.t("−2,5", 44, JUSTE)).arrange(RIGHT, buff=0.15)
        rr.move_to(P(2.6, -1.6))
        cad = self.encadre(rr, JUSTE, 0.18)
        self.play(FadeIn(rr, scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(rr, cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [VGroup(self.t("Suite arithmétique :", fs, JAUNE_TITRE), self.t("on ajoute toujours", fs)).arrange(
                  RIGHT, buff=0.2),
              self.t("le même nombre d'un terme au suivant.", fs)]
        p2 = [VGroup(self.t("Ce nombre, c'est la", fs), self.t("raison r.", fs, RAISON)).arrange(RIGHT, buff=0.2)]
        p3 = [self.t("Pour la trouver :", fs),
              VGroup(self.t("un terme − celui d'avant", fs, JUSTE), self.t("(r = uₙ₊₁ − uₙ)", 32, GREY_A)).arrange(
                  RIGHT, buff=0.35)]
        self.finale([(p1, ["arithmétique", "le même nombre"]), (p2, ["Ce nombre, c'est"]),
                     (p3, ["Pour la trouver", "un terme moins"])])

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_ecarts()
        self.ecran_definition()
        self.ecran_question1()
        self.ecran_negative()
        self.ecran_motif()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin()
