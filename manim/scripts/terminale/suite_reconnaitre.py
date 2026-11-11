# suite_reconnaitre.py
# EleveAI — Maths Terminale (spé) — paysage « Suites : reconnaître leur nature »
# (16:9), ceinture VERTE. Série SUITES du lycée, épisode 28.
# Micro du coach : suite_reconnaitre (notion suite_numerique) :
# lib/tutor-v4/questionBank/terminale-spe/maths/suites.bank.ts + suites-renfort.ts.
#
# Ce que demande le coach → écran :
#   · uₙ₊₁ = uₙ + r → arithmétique (fixed_3, h1, natRec)      → 02-ajouter ;
#   · uₙ₊₁ = q uₙ → géométrique (fixed_4, h2, natRec)          → 03-multiplier ;
#   · raison d'une situation en % (raisonSit : 1 + t/100, piège
#     « raison = le taux »)                                     → 03, 04-question (C : 1,04) ;
#   · formule explicite : écart ou quotient (h3, h4, natExpl)   → 05-explicite ;
#   · piège uₙ₊₁ = uₙ + n (h5)                                  → 06-piege ;
#   · « ni l'une ni l'autre » (natRec, aff. a uₙ + b)          → 07-question (A) ;
#   · suite auxiliaire vₙ = uₙ − c (auxiliaire, ★4)             → 08-auxiliaire ;
#   · explicite arithmétique et géométrique (5 / 2ⁿ)            → 09 défi + correction.
# Clé de voix → écran :
#   00-garde (deux petits nuages : points alignés « + r », points qui
#   s'envolent « × q ») · 01 Yanis, community manager : le téléphone et ses
#   2 000 abonnés, les deux agences · 02 la première offre : cases u₀ → u₃,
#   « + 150 » qui saute, le nuage aux marches égales · 03 la seconde offre :
#   × 1,06, le nuage aux marches qui grandissent, pas 6, pas 0,06 · 04/04b
#   question (C) · 05 formule en n : écart 5 (nuage aligné), quotient 2 ·
#   06 le piège uₙ₊₁ = uₙ + n (+ 0, + 1, + 2 en rouge) · 07/07b question (A :
#   5, 3, 1,4) · 08 la suite auxiliaire vₙ = uₙ − 8 (l'écart à 8 qui se
#   divise par 2) · 09/09b défi 7 − 3n et 5 / 2ⁿ, puis les deux offres de
#   Yanis sur 14 mois · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = raison et écarts,
# vert = juste, rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/terminale-suite-reconnaitre.json (débit −6), calée mot à
# mot par suite_reconnaitre_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/terminale/suite_reconnaitre.py SuiteReconnaitreTle -o eleveai-maths-terminale-suite-reconnaitre --media_dir manim/scripts/terminale/media-suite-reconnaitre
# Sortie : manim/sorties/terminale/maths/suites/28-reconnaitre/

import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(_ICI))
sys.path.insert(1, str(_ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
OFFRE1 = [2000 + 150 * n for n in range(15)]
OFFRE2 = [2000 * 1.06 ** n for n in range(15)]
assert abs(OFFRE2[1] - OFFRE2[0] - 120) < 1e-9                      # « d'abord 120 abonnés »
assert OFFRE2[1] - OFFRE2[0] < 150 and OFFRE2[14] > OFFRE1[14]      # puis elle gagne
assert abs(1 + 4 / 100 - 1.04) < 1e-12                              # question 1 : C
EXPL_A = [5 * n - 1 for n in range(5)]
assert all(b - a == 5 for a, b in zip(EXPL_A, EXPL_A[1:]))
EXPL_G = [3 * 2 ** n for n in range(5)]
assert all(b / a == 2 for a, b in zip(EXPL_G, EXPL_G[1:]))
PIEGE_T = [1]
for n in range(3):
    PIEGE_T.append(PIEGE_T[-1] + n)                                  # + 0, + 1, + 2
Q2 = [5]
for _ in range(2):
    Q2.append(round(0.8 * Q2[-1] - 1, 10))
assert Q2 == [5, 3, 1.4]                                             # question 2 : A
AUX = [0.0]
for _ in range(4):
    AUX.append(0.5 * AUX[-1] + 4)
for un in AUX:
    assert abs((0.5 * un + 4 - 8) - 0.5 * (un - 8)) < 1e-12           # vₙ₊₁ = 0,5 vₙ
DEFI_U = [7 - 3 * n for n in range(4)]
DEFI_W = [5 / 2 ** n for n in range(4)]
assert all(b - a == -3 for a, b in zip(DEFI_U, DEFI_U[1:]))
assert all(abs(b / a - 0.5) < 1e-12 for a, b in zip(DEFI_W, DEFI_W[1:]))

PEAU, SWEAT = "#a0674b", "#7C3AED"


def yanis(s=1.0):
    """Yanis, community manager : sweat violet, un téléphone à la main."""
    tete = Circle(radius=0.3, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    cheveux = Arc(radius=0.31, start_angle=0.15, angle=PI - 0.3, stroke_color="#1f1300", stroke_width=10)
    cheveux.move_to(P(0, 1.25))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=SWEAT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    bras = Line(P(0.3, 0.35), P(0.62, 0.62), stroke_color=SWEAT, stroke_width=14)
    tel = RoundedRectangle(width=0.26, height=0.44, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                           stroke_color=GREY_B, stroke_width=2).move_to(P(0.68, 0.8))
    ecran = Rectangle(width=0.18, height=0.3, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(tel)
    return VGroup(corps, bras, tete, cheveux, tel, ecran).scale(s)


def atome(r=0.42, couleur=TERME):
    """Le logo de la chaîne de sciences : un noyau et trois orbites."""
    orb = VGroup(*[Ellipse(width=2 * r, height=0.7 * r, stroke_color=couleur, stroke_width=3).rotate(a)
                   for a in (0, PI / 3, 2 * PI / 3)])
    return VGroup(orb, Dot(radius=0.07, color=RAISON))


def telephone(l=2.3, h=3.7):
    corps = RoundedRectangle(width=l, height=h, corner_radius=0.28, fill_color="#0f172a", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=4)
    haut = RoundedRectangle(width=0.5, height=0.08, corner_radius=0.04, fill_color=GREY_B, fill_opacity=1,
                            stroke_width=0).move_to(corps.get_top() + DOWN * 0.18)
    return VGroup(corps, haut)


def nuage_mini(nr, ur, bg, hd, valeurs, couleur=TERME, r=0.08, nom_u="uₙ"):
    """Un petit nuage : axes et points (rendus à part, pour les poser un à un)."""
    nu = NuageTermes(nr, ur, bg, hd, nom_u=nom_u, fs=24)
    pts = [nu.point(k, v, couleur, r) for k, v in enumerate(valeurs)]
    return nu, pts


def marches(nu, valeurs, couleur=RAISON, debut=0, largeur=5):
    """Les écarts du nuage : un pointillé horizontal, puis la marche verticale."""
    g = VGroup()
    for k in range(len(valeurs) - 1):
        n = debut + k
        hor = DashedLine(nu.G(n, valeurs[k]), nu.G(n + 1, valeurs[k]), color=GREY_B, stroke_width=2,
                         dash_length=0.06)
        ver = Line(nu.G(n + 1, valeurs[k]), nu.G(n + 1, valeurs[k + 1]), color=couleur, stroke_width=largeur)
        g.add(VGroup(hor, ver))
    return g


class SuiteReconnaitreTle(PaysageSuites):
    fichier_marques = "suite_reconnaitre_marques.json"
    nom_voix = "terminale-suite-reconnaitre"
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    largeur_bouton = 9.6
    place_coche = 1.1

    # ── petits outils de l'épisode ─────────────────────────────────────────

    def morceaux(self, pieces, fs=34, larg=None):
        """Une ligne coupée en morceaux (chacun son Text, placé EXACTEMENT là où il
        serait dans la ligne entière) : pour montrer chaque morceau à sa voix.
        pieces : [(texte, couleur) ou texte, …] ; les espaces comptent."""
        pieces = [(p, WHITE) if isinstance(p, str) else p for p in pieces]
        entier = Text("".join(p for p, _ in pieces), font_size=fs)
        g, k = VGroup(), 0
        for p, c in pieces:
            if not p.strip():
                continue
            m = Text(p.strip(), font_size=fs, color=c)
            n = len(m)    # glyphes réels : une ligature (« ffi ») en compte un seul
            m.move_to(VGroup(*entier[k:k + n]))
            g.add(m)
            k += n
        larg = larg or self.largeur_texte
        if g.width > larg:
            g.scale_to_fit_width(larg)
        return g

    def rayer(self, mob, couleur=PIEGE):
        """Barré d'UN trait fin, à mi-hauteur : le mot reste lisible dessous."""
        y = mob.get_center()[1]
        return Line(P(mob.get_left()[0] - 0.08, y), P(mob.get_right()[0] + 0.08, y)).set_stroke(couleur, 3.5)

    def devoiler(self, g, extraits, rt=0.3, avec=()):
        """Chaque morceau quand la voix dit son extrait (None : avec le précédent)."""
        paquet = []
        for m, ex in zip(g, extraits):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], run_time=rt)
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
        self.play(*[FadeIn(p, shift=UP * 0.08) for p in paquet], *avec, run_time=rt)
        return g

    def gauche(self, m, y, x=-6.25):
        return m.move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def poser_nuage(self, nu, grads=(), fs=22, rt=0.4):
        for n in grads:
            nu.add(nu.graduation_n(n, str(n), fs))
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  *[FadeIn(g) for g in nu[4:]], run_time=rt)

    def poser_points(self, pts, mar=None, rt=0.22):
        """Les points un à un ; mar[k] (la marche avant le point k + 1) avec lui."""
        for k, d in enumerate(pts):
            anims = [GrowFromCenter(d)]
            if mar is not None and k > 0:
                anims += [Create(mar[k - 1][0]), Create(mar[k - 1][1])]
            self.play(*anims, run_time=rt)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def deux_nuages(self):
        """À gauche des points alignés (+ r), à droite des points qui s'envolent (× q)."""
        y0, y1 = -1.55, -0.5
        na, pa = nuage_mini((0, 4.4), (0, 5), P(-5.0, y0), P(-2.2, y1), [0.6 + 1.0 * k for k in range(5)])
        ng, pg = nuage_mini((0, 4.4), (0, 5), P(1.6, y0), P(4.4, y1), [0.3 * 1.75 ** k for k in range(5)],
                            couleur=TERME)
        la = self.t("+ r", 34, RAISON).next_to(na, LEFT, buff=0.3)
        lq = self.t("× q", 34, RAISON).next_to(ng, LEFT, buff=0.3)
        self.play(*[Create(m) for m in (na.ax_n, na.ax_u, ng.ax_n, ng.ax_u)], run_time=0.3)
        for k in range(5):
            self.play(GrowFromCenter(pa[k]), GrowFromCenter(pg[k]), run_time=0.14)
        self.play(FadeIn(la, scale=1.3), FadeIn(lq, scale=1.3), run_time=0.3)

    def ecran_garde(self):
        self.garde("Suites",
                   [("reconnaître leur nature", "reconnaître", TERME),
                    ("Arithmétique, géométrique, ou ni l'une ni l'autre :", "Arithmétique"),
                    ("comment le voir du premier coup d'œil ?", "comment")],
                   dessin=self.deux_nuages)

    # ── 01 : Yanis et les deux agences ─────────────────────────────────────

    def carte_agence(self, y, titre, extrait_titre, gain, extrait_gain):
        c = self.carte(4.6, 1.75, P(4.05, y))
        lt = self.t(titre, 30, GREY_A).move_to(P(4.05, y + 0.55))
        lg = self.t(gain, 36, RAISON).move_to(P(4.05, y - 0.02))
        lm = self.t("chaque mois", 30).move_to(P(4.05, y - 0.55))
        self.au_mot(extrait_titre)
        self.play(FadeIn(c, scale=0.9), FadeIn(lt), run_time=0.3)
        self.suivre(extrait_gain)
        self.play(FadeIn(lg, scale=1.3), run_time=0.3)
        self.suivre("chaque mois")
        self.play(FadeIn(lm, shift=UP * 0.08), run_time=0.25)
        return VGroup(c, lt, lg, lm)

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = yanis(1.15).move_to(P(-4.3, 0.6))
        nom = self.t("Yanis", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = self.t("community manager", 30, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Yanis")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.45)
        self.au_mot("community")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        tel = telephone().move_to(P(-0.4, 0.0))
        at = atome().move_to(tel.get_center() + UP * 1.05)
        sc = VGroup(self.t("vidéos de", 26, GREY_A), self.t("sciences", 26, GREY_A)).arrange(DOWN, buff=0.08)
        sc.move_to(tel.get_center() + UP * 0.2)
        self.au_mot("créatrice")
        self.play(FadeIn(tel, scale=0.9), run_time=0.35)
        self.au_mot("sciences")
        self.play(GrowFromCenter(at), FadeIn(sc), run_time=0.35)
        at.add_updater(lambda m, dt: m[0].rotate(dt * 0.9))
        cpt = self.t("2 000", 52, WHITE, audit=False).move_to(tel.get_center() + DOWN * 0.65)
        ab = self.t("abonnés", 28, GREY_A).next_to(cpt, DOWN, buff=0.12)
        self.au_mot("2 000")
        self.play(GrowFromCenter(cpt), FadeIn(ab), run_time=0.35)
        self.insister(cpt, 1.2)
        self.au_mot("Deux agences")
        c1 = self.carte_agence(0.95, "Première agence", "la première", "+ 150 abonnés", "150")
        c2 = self.carte_agence(-1.3, "Seconde agence", "la seconde", "+ 6 %", "6 %")
        self.au_mot("Avant de choisir")
        pq = self.t("?", 72, RAISON).move_to(P(-3.2, 1.85))
        self.play(FadeIn(pq, scale=1.5), run_time=0.3)
        self.au_mot("chaque offre")
        self.play(Indicate(c1, color=RAISON, scale_factor=1.05), Indicate(c2, color=RAISON, scale_factor=1.05),
                  run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : la première offre : on ajoute 150 ─────────────────────────────

    def ecran_ajouter(self):
        self.nouvel_ecran("02-ajouter")
        self.titre("Première offre", JAUNE_TITRE, 44, extrait="Première offre")
        lg = LigneTermes([u(k) for k in range(4)], xs=(-5.6, -4.1, -2.6, -1.1), centre=P(0, 2.2), largeur=1.05,
                         hauteur=0.66, fs=34)
        l1 = self.gauche(self.morceaux([("uₙ", TERME), (" : abonnés au bout de n mois", WHITE)], 32, 7.2), 0.5)
        l2 = self.gauche(self.morceaux(["à partir de ", "n = 0"], 32), -0.1)
        l3 = self.gauche(self.morceaux([("u₀", TERME), " = ", "2 000"], 38), -0.85)
        l4 = self.gauche(self.morceaux([("uₙ₊₁", TERME), " = ", ("uₙ", TERME), " ", ("+ 150", RAISON)], 38), -0.85,
                         x=-2.75)
        l3[2]._pas_audit = True                                   # « 2 000 » : dit, mais écrit en deux
        l5 = self.gauche(self.t("On ajoute toujours le même nombre :", 34), -1.65)
        l6 = self.gauche(self.morceaux([("suite arithmétique", JAUNE_TITRE), ", de raison  ", ("r = 150", RAISON)],
                                       38), -2.5)
        nu = NuageTermes((0, 4.4), (1800, 2750), P(1.6, -0.45), P(5.3, 2.3), fs=26)
        pts = [nu.point(k, v) for k, v in enumerate(OFFRE1[:5])]
        mar = marches(nu, OFFRE1[:5])
        self.au_mot("On note")
        self.play(*[FadeIn(c[0], scale=0.8) for c in lg.cases], *[FadeIn(c[1]) for c in lg.cases], run_time=0.4)
        self.devoiler(l1, ["u indice n", "abonnés"])
        self.devoiler(l2, ["à partir", "0"])
        self.devoiler(l3, ["u indice 0", None, "2 000"])
        self.poser_nuage(nu, (1, 2, 3, 4))
        self.play(GrowFromCenter(pts[0]), Indicate(lg.cases[0], color=TERME, scale_factor=1.15), run_time=0.35)
        self.devoiler(l4, ["u indice n plus 1", None, "égale u indice n", "150"])
        for k in range(3):
            lg.sauts[k] = lg.saut(k, "+ 150", fs=26)
        self.play(*[Create(s[0]) for s in lg.sauts.values()], *[FadeIn(s[1], scale=1.3) for s in lg.sauts.values()],
                  GrowFromCenter(pts[1]), Create(mar[0][0]), Create(mar[0][1]), run_time=0.35)
        for k in range(1, 4):
            self.play(GrowFromCenter(pts[k + 1]), Create(mar[k][0]), Create(mar[k][1]), run_time=0.25)
        self.au_mot("On ajoute")
        self.play(FadeIn(l5, shift=UP * 0.1), *[Indicate(m[1], color=RAISON, scale_factor=1.4) for m in mar],
                  run_time=0.6)
        self.au_mot("arithmétique")
        droite = DashedLine(nu.G(-0.2, 1970), nu.G(4.3, 2645), color=JAUNE_TITRE, stroke_width=2.5)
        self.play(FadeIn(l6[0], shift=UP * 0.08), Create(droite), run_time=0.45)
        self.au_mot("de raison")
        self.play(FadeIn(l6[1], shift=UP * 0.08), run_time=0.25)
        self.suivre("150")
        cad = self.encadre(l6[2], RAISON, 0.12)
        self.play(FadeIn(l6[2], scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(l6[2], cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 03 : la seconde offre : on multiplie par 1,06 ──────────────────────

    def ecran_multiplier(self):
        self.nouvel_ecran("03-multiplier")
        self.titre("Seconde offre", JAUNE_TITRE, 44, extrait="Seconde offre")
        l1 = self.gauche(self.morceaux(["Augmenter de ", ("6 %", RAISON)], 36), 2.25)
        l2 = self.gauche(self.morceaux(["c'est multiplier par ", "1 + ", "6", "/100"], 36, 7.0), 1.5)
        l3 = self.gauche(self.morceaux(["soit ", ("1,06", RAISON)], 40), 0.72)
        l4 = self.gauche(self.morceaux([("vₙ₊₁", TERME), " = ", ("1,06", RAISON), " × ", ("vₙ", TERME)], 40), -0.1)
        l5 = self.gauche(self.t("On multiplie toujours par le même nombre :", 34), -1.05)
        l6 = self.gauche(self.morceaux([("suite géométrique", JAUNE_TITRE), ", de raison  ", ("q = 1,06", RAISON)], 38),
                         -1.85)
        l7 = self.gauche(self.morceaux([("pas 6", PIEGE), "     ", ("pas 0,06", PIEGE), "     ", ("1,06", JUSTE)],
                                       38), -2.75)
        nu = NuageTermes((0, 10.6), (1800, 3700), P(1.4, -0.35), P(5.3, 2.35), nom_u="vₙ", fs=26)
        pts = [nu.point(k, v, r=0.075) for k, v in enumerate(OFFRE2[:11])]
        mar = marches(nu, OFFRE2[:11], largeur=4)
        self.devoiler(l1, ["Augmenter", "6 %"])
        self.devoiler(l2, ["multiplier", "1 plus", "6 sur", "100"])
        self.suivre("1,06")
        cad = self.encadre(l3[1], RAISON, 0.1)
        self.play(FadeIn(l3[0]), FadeIn(l3[1], scale=1.3), Create(cad), run_time=0.35)
        self.au_mot("On note")
        self.poser_nuage(nu, (2, 4, 6, 8, 10))
        self.play(GrowFromCenter(pts[0]), run_time=0.25)
        self.devoiler(l4, ["v indice n plus 1", None, "1,06", None, "v indice n"])
        self.poser_points(pts, mar, rt=0.12)
        self.au_mot("On multiplie")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.play(LaggedStart(*[Indicate(m[1], color=RAISON, scale_factor=1.5) for m in mar], lag_ratio=0.15),
                  run_time=1.0)
        self.au_mot("géométrique")
        courbe = VMobject(stroke_color=JAUNE_TITRE, stroke_width=2.5).set_points_smoothly(
            [nu.G(x, 2000 * 1.06 ** x) for x in np.linspace(0, 10.4, 30)])
        self.play(FadeIn(l6[0], shift=UP * 0.08), Create(courbe), run_time=0.5)
        self.au_mot("de raison")
        self.play(FadeIn(l6[1], shift=UP * 0.08), run_time=0.25)
        self.suivre("1,06")
        cad2 = self.encadre(l6[2], RAISON, 0.12)
        self.play(FadeIn(l6[2], scale=1.3), Create(cad2), run_time=0.35)
        self.au_mot("Pas")
        self.suivre("6")
        self.play(FadeIn(l7[0], shift=UP * 0.08), run_time=0.2)
        self.play(Create(self.rayer(l7[0])), run_time=0.25)
        self.suivre("0,06")
        self.play(FadeIn(l7[1], shift=UP * 0.08), run_time=0.2)
        self.play(Create(self.rayer(l7[1])), run_time=0.25)
        self.suivre("1,06")
        cad3 = self.encadre(l7[2], JUSTE, 0.1)
        self.play(FadeIn(l7[2], scale=1.3), Create(cad3), run_time=0.3)
        self.insister(VGroup(l7[2], cad3), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : + 4 % par an → C (raison 1,04) ──────────

    def question_morceaux(self, cle, lignes, choix, bonne, **kw):
        """poser_question, mais chaque ligne de la question est une ligne en
        morceaux (morceaux()), chaque morceau dévoilé à sa voix : lignes =
        [(groupe, [extraits]), …]. Les lignes sont placées par poser_question."""
        liste = [(g, None) for g, _ in lignes]

        def dessin():
            for g, ex in lignes:
                self.devoiler(g, ex)
            liste.clear()                     # poser_question ne les remontre pas
        return self.poser_question(cle, liste, choix, bonne, dessin=dessin, **kw)

    def ecran_question1(self):
        g1 = self.morceaux(["Un capital augmente de ", ("4 %", RAISON), " par an."], 38)
        g2 = self.morceaux(["La suite des capitaux est :"], 38)
        q = self.question_morceaux("04-question", [(g1, ["Un capital", "4 %", "par an"]), (g2, ["La suite"])],
                                   ["géométrique de raison 4", "arithmétique de raison 4",
                                    "géométrique de raison 1,04"], 2)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 2)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), run_time=0.25)   # partis AVANT de monter C
        self.play(VGroup(q.cartes[2], ok).animate.move_to(q.cartes[0]), run_time=0.35)
        y = q.cartes[2].get_bottom()[1] - 0.1
        e1 = self.morceaux([("+ 4 %", RAISON), "   c'est   ", ("× 1,04", JUSTE)], 50).move_to(P(-0.4, y - 0.75))
        self.devoiler(e1, ["4 %", None, "1,04"])
        e2 = self.morceaux(["la raison est le ", ("coefficient multiplicateur", JUSTE), ","], 36)
        e2.move_to(P(-0.6, y - 1.75))
        self.devoiler(e2, ["la raison", "coefficient", None])
        e3 = self.t("pas le taux", 40, PIEGE).move_to(P(-0.6, y - 2.55))
        self.au_mot("pas le taux")
        self.play(FadeIn(e3, shift=UP * 0.08), run_time=0.3)
        self.insister(e3, 1.15)
        self.attendre_voix(marge=0.6)

    # ── 05 : une formule en n : l'écart, le quotient ───────────────────────

    def ecran_explicite(self):
        self.nouvel_ecran("05-explicite")
        self.titre("Une formule en n", JAUNE_TITRE, 44, extrait="formule en n")
        l0 = self.morceaux(["On calcule  ", ("uₙ₊₁ − uₙ", RAISON)], 38).move_to(P(0, 2.35))
        fa = self.morceaux([("uₙ", TERME), " = 5n", " − 1"], 40).move_to(P(-3.4, 1.5))
        fg = self.morceaux([("uₙ", TERME), " = 3 ×", " 2ⁿ"], 40).move_to(P(2.6, 1.5))
        na, pa = nuage_mini((0, 4.4), (-2, 20), P(-5.9, -1.65), P(-1.6, 0.85), EXPL_A)
        ng, pg = nuage_mini((0, 4.4), (0, 50), P(0.7, -1.65), P(4.7, 0.85), EXPL_G)
        ma, mg = marches(na, EXPL_A), marches(ng, EXPL_G)
        self.devoiler(l0, ["On calcule", "u indice n plus 1 moins"],
                      avec=[Create(m) for m in (na.ax_n, na.ax_u, ng.ax_n, ng.ax_u)]
                      + [FadeIn(m) for m in (na.lab_n, na.lab_u, ng.lab_n, ng.lab_u)])
        self.devoiler(fa, ["u indice n égale", "5", "1"], rt=0.45,
                      avec=[LaggedStart(*[AnimationGroup(GrowFromCenter(d), *([Create(ma[k - 1])] if k else []))
                                          for k, d in enumerate(pa)], lag_ratio=0.5)])
        self.au_mot("cet écart")
        ea = self.morceaux([("uₙ₊₁ − uₙ", RAISON), " = ", ("5", RAISON)], 36).move_to(P(-3.6, -2.3))
        self.play(FadeIn(ea[0]), FadeIn(ea[1]), run_time=0.3)
        self.suivre("5")
        self.play(FadeIn(ea[2], scale=1.4), *[Indicate(m[1], color=RAISON, scale_factor=1.4) for m in ma],
                  run_time=0.5)
        self.au_mot("arithmétique")
        ra = VGroup(self.coche(JUSTE, 0.2), self.t("arithmétique", 38, JUSTE)).arrange(RIGHT, buff=0.2)
        ra.move_to(P(-3.6, -2.95))
        self.play(Create(ra[0]), FadeIn(ra[1], shift=UP * 0.08), run_time=0.35)
        self.devoiler(fg, ["u indice n égale", "3", "2"])
        self.play(LaggedStart(*[AnimationGroup(GrowFromCenter(d), *([Create(mg[k - 1])] if k else []))
                                for k, d in enumerate(pg)], lag_ratio=0.5), run_time=0.6)
        eg = self.morceaux([("uₙ₊₁ / uₙ", RAISON), " = ", ("2", RAISON)], 36).move_to(P(2.7, -2.3))
        self.au_mot("le quotient")
        self.play(FadeIn(eg[0]), FadeIn(eg[1]), run_time=0.3)
        self.au_mot("vaut", n=2)
        self.suivre("2")
        self.play(FadeIn(eg[2], scale=1.4), *[Indicate(m[1], color=RAISON, scale_factor=1.3) for m in mg],
                  run_time=0.5)
        self.au_mot("géométrique")
        rg = VGroup(self.coche(JUSTE, 0.2), self.t("géométrique", 38, JUSTE)).arrange(RIGHT, buff=0.2)
        rg.move_to(P(2.7, -2.95))
        self.play(Create(rg[0]), FadeIn(rg[1], shift=UP * 0.08), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : uₙ₊₁ = uₙ + n ──────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Le piège !", 46, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        f = self.morceaux([("uₙ₊₁", TERME), " = ", ("uₙ", TERME), " + ", ("n", PIEGE)], 48)
        self.gauche(f, 2.2)
        self.devoiler(f, ["u indice n plus 1", None, "égale u indice n", None, "plus n"])
        lg = LigneTermes([u(k) for k in range(4)], xs=(-5.6, -4.1, -2.6, -1.1), centre=P(0, 0.95), largeur=1.05,
                         hauteur=0.66, fs=34)
        nu = NuageTermes((0, 3.5), (0, 4.6), P(1.6, -0.25), P(5.2, 2.3), fs=26)
        pts = [nu.point(k, v) for k, v in enumerate(PIEGE_T)]
        mar = marches(nu, PIEGE_T, couleur=PIEGE)
        self.au_mot("On ajoute")
        self.play(*[FadeIn(c[0], scale=0.8) for c in lg.cases], *[FadeIn(c[1]) for c in lg.cases],
                  Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), GrowFromCenter(pts[0]),
                  run_time=0.45)
        l1 = self.gauche(self.t("On ajoute quelque chose à chaque fois,", 36), -0.85)
        self.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
        self.au_mot("mais pas")
        l2 = self.gauche(self.t("mais pas toujours le même nombre :", 36, PIEGE), -1.6)
        self.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
        self.au_mot("même nombre")
        for k in range(3):
            self.suivre(str(k))
            s = self.sauter(lg, k, f"+ {k}", couleur=PIEGE, fs=30, run_time=0.22)
            self.play(GrowFromCenter(pts[k + 1]), Create(mar[k][0]), Create(mar[k][1]), run_time=0.2)
        self.au_mot("pas arithmétique")
        cx = self.barrer(Square(0.4))
        l3 = VGroup(cx, self.t("pas arithmétique", 40, PIEGE)).arrange(RIGHT, buff=0.25)
        self.gauche(l3, -2.5)
        self.play(Create(cx), FadeIn(l3[1], shift=UP * 0.1), *[Indicate(m[1], color=PIEGE) for m in mar[1:]],
                  run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : 0,8 uₙ − 1 → A (ni l'une ni l'autre) ────

    def ecran_question2(self):
        g1 = self.morceaux(["La suite définie par"], 38)
        g2 = self.morceaux([("u₀", TERME), " = 5", "    et    ", ("uₙ₊₁", TERME), " = ", ("0,8", RAISON), " ",
                            ("uₙ", TERME), " − 1"], 40)
        q = self.question_morceaux("07-question",
                                   [(g1, ["La suite"]),
                                    (g2, ["u indice 0", "5", "et u", "plus 1", None, "0,8", None, "1"])],
                                   ["ni arithmétique ni géométrique", "géométrique de raison 0,8",
                                    "arithmétique de raison −1"], 0)
        self.dire("07b-reponse")
        self.q_reponse(q, 0)
        yb, yc = q.cartes[1].get_center()[1], q.cartes[2].get_center()[1]
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), run_time=0.25)
        e1 = self.morceaux([("× 0,8", RAISON), "  puis  ", ("− 1", RAISON), "  :  ni l'un ni l'autre seul"], 38)
        e1.move_to(P(-0.3, yb))
        self.devoiler(e1, ["0,8", None, "1", "ni l'un"])
        lg = LigneTermes(["5", "3", "1,4"], centre=P(-0.6, yc - 0.05), pas=2.6, largeur=1.25, hauteur=0.66,
                         fs=36, noms=None)
        self.au_mot("premiers termes")
        self.remplir_ligne(lg)
        sauts = [lg.saut(k, "× 0,8 − 1", fs=30, creux=0.2) for k in range(2)]
        for x in sauts:
            x[1]._pas_audit = True            # l'opération, déjà dite : on la redessine sur les flèches
        self.play(*[Create(s[0]) for s in sauts], *[FadeIn(s[1], scale=1.3) for s in sauts], run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 08 : la suite auxiliaire ───────────────────────────────────────────

    def ecran_auxiliaire(self):
        self.nouvel_ecran("08-auxiliaire")
        self.titre("La suite auxiliaire", JAUNE_TITRE, 44, extrait="suite auxiliaire")
        V = JAUNE_TITRE
        fs = 36
        l1 = self.gauche(self.morceaux([("uₙ₊₁", TERME), " = ", ("0,5", RAISON), " ", ("uₙ", TERME), " + 4"], fs), 2.25)
        l2 = self.gauche(self.morceaux(["On pose  ", ("vₙ", V), " = ", ("uₙ", TERME), " − 8"], fs), 1.45)
        l3 = self.gauche(self.morceaux([("vₙ₊₁", V), " = ", ("0,5", RAISON), " ", ("uₙ", TERME), " + 4", " − 8"], fs),
                         0.55)
        l4 = self.morceaux([" = ", ("0,5", RAISON), " ", ("uₙ", TERME), " − 4"], fs)
        l5 = self.morceaux([" = ", ("0,5", RAISON), " × ", ("(uₙ − 8)", V)], fs)
        for l, y in ((l4, -0.25), (l5, -1.05)):
            l.move_to(P(0, y)).align_to(l3[1], LEFT)
        l6 = self.gauche(self.morceaux([("vₙ₊₁", V), " = ", ("0,5", RAISON), " × ", ("vₙ", V)], 40), -1.95)
        l7 = self.gauche(self.morceaux([("la suite v est géométrique", JUSTE), ", de raison  ", ("q = 0,5", RAISON)], 34),
                         -2.85)
        nu = NuageTermes((0, 4.5), (0, 9.2), P(2.0, -1.35), P(5.4, 2.3), fs=26)
        pts = [nu.point(k, v) for k, v in enumerate(AUX)]
        huit = DashedLine(nu.G(0, 8), nu.G(4.5, 8), color=GREY_A, stroke_width=2.5, dash_length=0.1)
        l8 = self.t("8", 28, GREY_A).next_to(huit, LEFT, buff=0.12).shift(LEFT * 0.08)
        segs = VGroup(*[Line(nu.G(k, v), nu.G(k, 8), color=V, stroke_width=6) for k, v in enumerate(AUX)])
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                  LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.3), run_time=0.8)
        self.devoiler(l1, ["Avec u", None, "0,5", None, "4"])
        self.devoiler(l2, ["on pose", None, None, None, "8"])
        self.play(Create(huit), FadeIn(l8), run_time=0.35)
        self.play(LaggedStart(*[Create(s) for s in segs], lag_ratio=0.2), run_time=0.6)
        self.devoiler(l3, ["Alors", None, "0,5", None, "4", "8"])
        self.devoiler(l4, ["égale", "0,5", None, "4"])
        self.devoiler(l5, ["égale", "0,5", None, "8"])
        self.play(Indicate(l5[3], color=V, scale_factor=1.25), Indicate(l2[1:], color=V, scale_factor=1.15),
                  run_time=0.6)
        self.devoiler(l6, ["Donc", None, "0,5", None, None], avec=[Indicate(l5[3], color=V)])
        self.play(LaggedStart(*[Indicate(s, color=RAISON, scale_factor=1.3) for s in segs], lag_ratio=0.25),
                  run_time=1.0)
        self.devoiler(l7, ["la suite v", "de raison", "0,5"])
        cad = self.encadre(l7[2], RAISON, 0.1)
        self.play(Create(cad), run_time=0.25)
        self.insister(VGroup(l7[2], cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : 7 − 3n et 5 / 2ⁿ ────────────────────────────────────

    XU, XW, YC = -3.3, 2.55, 0.45

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        tt = self.t("Pour tout entier naturel n :", 34, GREY_A).move_to(P(0, 2.45))
        self.au_mot("Pour tout")
        self.play(FadeIn(tt, shift=DOWN * 0.08), run_time=0.3)
        cu, cw = self.carte(5.5, 3.1, P(self.XU, self.YC)), self.carte(5.5, 3.1, P(self.XW, self.YC))
        fu = self.morceaux([("uₙ", TERME), " = 7", " − 3n"], 42).move_to(P(self.XU + 0.3, 1.55))
        fw = self.morceaux([("wₙ", TERME), " = 5", " / 2ⁿ"], 42).move_to(P(self.XW + 0.3, 1.55))
        nu, pu = nuage_mini((0, 3.5), (-3, 8), P(self.XU - 2.1, -0.85), P(self.XU + 1.9, 0.75), DEFI_U)
        nw, pw = nuage_mini((0, 3.5), (0, 5.6), P(self.XW - 2.1, -0.85), P(self.XW + 1.9, 0.75), DEFI_W, nom_u="wₙ")
        self.play(FadeIn(cu, scale=0.95), FadeIn(cw, scale=0.95), run_time=0.3)
        self.devoiler(fu, ["u indice n", "7 moins", "3 n"])
        self.poser_nuage(nu, rt=0.25)
        self.poser_points(pu, rt=0.12)
        self.devoiler(fw, ["w indice n", "5 sur", "2 puissance"])
        self.poser_nuage(nw, rt=0.25)
        self.poser_points(pw, rt=0.12)
        self.au_mot("Quelle est")
        q1 = self.morceaux(["Quelle est la ", ("nature", RAISON), " de chaque suite, et sa ", ("raison", RAISON), " ?"],
                           36).move_to(P(-0.4, -1.75))
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.35)
        self.defi_pause(-2.65, x=-0.6)
        self._defi = (tit, tt, q1, cu, cw, fu, fw, nu, nw, pu, pw)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, tt, q1, cu, cw, fu, fw, nu, nw, pu, pw = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(FadeOut(q1), FadeOut(tt), ReplacementTransform(tit, cor), run_time=0.4)
        ca = self.morceaux([("uₙ₊₁ − uₙ", RAISON), " = ", ("−3", RAISON)], 36).move_to(P(self.XU, -1.6))
        ra = self.morceaux([("arithmétique", JUSTE), ",  ", ("r = −3", RAISON)], 36).move_to(P(self.XU, -2.4))
        cw_ = self.morceaux([("wₙ", TERME), " = 5 × ", ("(1/", RAISON), ("2)ⁿ", RAISON)], 36).move_to(P(self.XW, -1.6))
        rw = self.morceaux([("géométrique", JUSTE), ",  ", ("q = 0,5", RAISON)], 36).move_to(P(self.XW, -2.4))
        mu, mw = marches(nu, DEFI_U), marches(nw, DEFI_W)
        self.devoiler(ca, ["u indice n plus 1", None, "3"],
                      avec=[LaggedStart(*[Create(m) for m in mu], lag_ratio=0.3)])
        self.devoiler(ra, ["arithmétique", None, "3"])
        cad = self.encadre(ra[2], RAISON, 0.1)
        self.play(Create(cad), run_time=0.25)
        self.devoiler(cw_, ["w indice n", "5 fois", "1", "2"])
        self.devoiler(rw, ["géométrique", None, "0,5"], avec=[LaggedStart(*[Create(m) for m in mw], lag_ratio=0.3)])
        cad2 = self.encadre(rw[2], RAISON, 0.1)
        self.play(Create(cad2), run_time=0.25)
        # ── et pour Yanis : les deux offres sur 14 mois ──
        self.au_mot("Et pour Yanis")
        self._effacer_ancien(run_time=0.3)
        ty = self.t("Et pour Yanis ?", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        ny = NuageTermes((0, 14.6), (1900, 4750), P(-5.5, -2.45), P(4.9, 2.3), nom_u="abonnés", fs=26)
        p1 = [ny.point(k, v, TERME, 0.075) for k, v in enumerate(OFFRE1)]
        p2 = [ny.point(k, v, JUSTE, 0.075) for k, v in enumerate(OFFRE2)]
        leg = VGroup(VGroup(Dot(radius=0.09, color=TERME), self.t("première offre", 30, TERME)).arrange(RIGHT, buff=0.15),
                     VGroup(Dot(radius=0.09, color=JUSTE), self.t("seconde offre", 30, JUSTE)).arrange(RIGHT, buff=0.15))
        leg.arrange(DOWN, aligned_edge=LEFT, buff=0.15).move_to(P(2.6, -1.4))
        for n in range(2, 15, 2):
            ny.add(ny.graduation_n(n, str(n), 22))
        self.play(FadeIn(ty, shift=DOWN * 0.1), Create(ny.ax_n), Create(ny.ax_u), FadeIn(ny.lab_n), FadeIn(ny.lab_u),
                  *[FadeIn(g) for g in ny[4:]], FadeIn(leg), run_time=0.45)
        self.play(LaggedStart(*[GrowFromCenter(d) for d in p1], lag_ratio=0.1),
                  LaggedStart(*[GrowFromCenter(d) for d in p2], lag_ratio=0.1), run_time=1.0)
        m2 = marches(ny, OFFRE2, couleur=JUSTE, largeur=4)
        self.au_mot("120")
        # l'étiquette AU-DESSUS du nuage (loin des premiers points), la flèche s'arrête avant eux
        l120 = self.t("+ 120", 34, JUSTE).move_to(m2[0][1].get_top() + P(0.45, 1.55))   # loin de l'axe aussi
        fl120 = Arrow(P(m2[0][1].get_top()[0], l120.get_bottom()[1]), m2[0][1].get_top() + UP * 0.22, buff=0.08, color=JUSTE, stroke_width=3,
                      tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        self.play(Create(m2[0]), FadeIn(l120, scale=1.3), GrowArrow(fl120), run_time=0.35)
        self.au_mot("de plus en plus")
        self.play(LaggedStart(*[Create(m) for m in m2[1:]], lag_ratio=0.2), run_time=1.0)
        self.au_mot("elle gagne")
        gagne = self.t("sur le long terme, elle gagne !", 36, JUSTE).move_to(P(-1.6, 1.95))
        self.play(FadeIn(gagne, scale=1.2), *[Indicate(d, color=JUSTE, scale_factor=1.8) for d in p2[-4:]],
                  run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        """« Ce que tu as appris » (titre EN HAUT ET CENTRÉ, comme finale()), mais
        chaque ligne en morceaux : « 1 + t » puis « /100 », chacun à sa voix."""
        J = JAUNE_TITRE
        points = [[([("Arithmétique :", J), " on ajoute toujours"], ["Arithmétique", None]),
                   (["le même nombre."], [None])],
                  [([("Géométrique :", J), " on multiplie toujours"], ["Géométrique", None]),
                   (["par le même nombre ;"], [None]),
                   (["pour une hausse de t %, la raison est ", ("1 + t", RAISON), ("/100", RAISON)],
                    ["pour une hausse", "1 plus", "100"])],
                  [(["Multiplier puis ajouter : ni l'un ni l'autre,"], ["Si l'on multiplie"]),
                   (["on passe par une ", ("suite auxiliaire.", JUSTE)], ["on passe", None])]]
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, J).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for pt in points:
            lignes = VGroup(*[self.morceaux(pc, 38, 1e9) for pc, _ in pt]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            blocs.append(VGroup(self.coche(), lignes).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if tout.width > 11.6:
            tout.scale_to_fit_width(11.6)
        if tout.height > 5.7:
            tout.scale_to_fit_height(5.7)
        tout.move_to(P(-0.4, -0.4))
        for bloc, pt in zip(blocs, points):
            for k, (l, (_, ex)) in enumerate(zip(bloc[1], pt)):
                self.devoiler(l, ex, rt=0.4, avec=[Create(bloc[0])] if k == 0 else ())
        self.attendre_voix(marge=0.8)

    def fin(self, cle="11-abonne"):
        """La fin commune, mais l'étincelle finale jaillit À DROITE de « @eleveai974 »
        (au centre, elle se posait sur le « e » du nom)."""
        import suites_commun as sc
        flash = sc.Flash
        sc.Flash = lambda m, **kw: flash(m.get_right() + RIGHT * 0.75, **kw)
        try:
            super().fin(cle)
        finally:
            sc.Flash = flash

    def construct(self):
        ecrans = [self.ecran_garde, self.ecran_situation, self.ecran_ajouter, self.ecran_multiplier,
                  self.ecran_question1, self.ecran_explicite, self.ecran_piege, self.ecran_question2,
                  self.ecran_auxiliaire, self.ecran_defi, self.ecran_correction, self.ecran_appris, self.fin]
        choix = os.environ.get("ECRANS")          # contrôle rapide : ECRANS=5,6 (jamais au rendu final)
        for k, e in enumerate(ecrans):
            if not choix or str(k) in choix.split(",") or (e == self.ecran_correction and "9" in choix.split(",")):
                e()
