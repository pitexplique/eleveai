# suite_geo_variation.py
# EleveAI — Maths 1re (sans spé, programme 2026 : termes positifs) — paysage
# « Suite géométrique : son sens de variation » (16:9), ceinture VERTE.
# Série SUITES, épisode 14. Jumelle géométrique de l'ép. 06 (suite_arith_variation.py).
# Micro du coach : expo_suite_variation (notion expo_suite_terme_general) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts (gVarQ, gVarExpl, gVarSituation, gVarPiege ;
# indice « Compare la raison à 1, pas à 0 » ; leurres : « croissante, car q > 0 »,
# « constante, car q est proche de 1 », « décroissante, car le taux est faible »,
# « négative à partir d'un certain rang »).
#
# Ce que demande le coach → écran :
#   · gVarQ (raison donnée)              → 03-regle, 04-question (q = 0,9) ;
#   · gVarSituation (évolution en %)      → 01 Sarah, 02 (+ 5 %), 05 (− 10 %), défi 1 ;
#   · gVarExpl (base de la puissance)     → 07-question (300 × 1,02ⁿ), défi 2 ;
#   · gVarPiege (q > 0 ne suffit pas ; proche de 1 ≠ égal à 1 ; jamais négative)
#                                         → 05-reste-positive, 06-piege, 04 et 07.
# Clé de voix → écran :
#   00-garde (barres qui grandissent, barres qui rapetissent ; la raison q, « ? »)
#   · 01 Sarah, game designer : l'écran du jeu, les barres d'XP des niveaux,
#   chacune 5 % plus longue ; le testeur « presque pareil » · 02 u₁ = 2 000,
#   q = 1,05 : cases 2 000 ; 2 100 ; 2 205, « 1,05 > 1 », le nuage qui monte
#   sans s'arrêter · 03 la règle en 3 cartes (q > 1, 0 < q < 1, q = 1) ·
#   04/04b question (A : décroissante, q = 0,9 ; la barre garde 90 %) ·
#   05 les ventes − 10 % : 50 000 ; 45 000 ; 40 500, le nuage qui descend vers 0
#   sans passer dessous · 06 le piège : comparer à 0 (barré), la droite 0 … 1,
#   arithmétique / géométrique · 07/07b question (C : vₙ = 300 × 1,02ⁿ) ·
#   08/08b défi en 3 cartes (la ville − 2 % ; wₙ = 40 × 1ⁿ ; tₙ₊₁ = 1,5 × tₙ) ·
#   09 « Ce que tu as appris » · 10 fin.
# Code couleur (série) : bleu = termes, orange = raison, vert = juste et
# « croissante », violet = « décroissante », gris = « constante », rouge = piège.
# ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/premiere-suite-geo-variation.json (débit −6),
# calée mot à mot par suite_geo_variation_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_variation.py SuiteGeoVariation1re -o eleveai-maths-premiere-suite-geo-variation --media_dir manim/scripts/premiere/media-suite-geo-variation
# Sortie : manim/sorties/premiere/maths/suites/14-geo-variation/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (« 2 000 » dans la voix)
from suite_arith_variation import MONTE, DESCEND, PLAT, fleche_sens  # noqa: E402  (l'outil de l'ép. 06)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ligne, calcul : de vraies espaces)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
XP = [round(2000 * 1.05 ** k, 6) for k in range(3)]
assert XP == [2000, 2100, 2205]                                        # 02 : 1,05 > 1 → croissante
VENTES = [round(50000 * 0.9 ** k, 6) for k in range(3)]
assert VENTES == [50000, 45000, 40500]                                 # 05 : − 10 % → × 0,9
assert 0 < 0.9 < 1                                                     # Q1 → A (décroissante)
assert 1.02 > 1                                                        # Q2 → C (croissante)
assert abs((1 - 0.02) - 0.98) < 1e-12 and 1 ** 7 == 1 and 1.5 > 1      # défi : déc., const., croiss.

PEAU, CHEVEUX, TSHIRT = "#a0673f", "#1c1917", "#0F766E"
ECRAN, BORD_ECRAN = "#0f172a", "#64748B"
TOIT, MUR = "#B45309", "#E2E8F0"


def barres(q, n=5, w=0.3, gap=0.12, h0=0.3, couleur=TERME):
    """Les termes en barres (bleues), chacune q fois la précédente, posées sur
    une même ligne de base ; centrées sur l'origine."""
    g = VGroup(*[Rectangle(width=w, height=h0 * q ** k, fill_color=couleur, fill_opacity=1, stroke_width=0)
                 for k in range(n)])
    g.arrange(RIGHT, buff=gap, aligned_edge=DOWN)
    return g.move_to(ORIGIN)


def manette(s=1.0):
    """Une manette de jeu : le corps, la croix, deux boutons."""
    corps = RoundedRectangle(width=1.0, height=0.5, corner_radius=0.22, fill_color="#334155", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    croix = VGroup(Rectangle(width=0.2, height=0.06), Rectangle(width=0.06, height=0.2)).set_fill(WHITE, 1)
    croix.set_stroke(width=0).move_to(P(-0.25, 0))
    b1 = Circle(radius=0.05, fill_color=JUSTE, fill_opacity=1, stroke_width=0).move_to(P(0.22, 0.06))
    b2 = Circle(radius=0.05, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(P(0.33, -0.05))
    return VGroup(corps, croix, b1, b2).scale(s)


def sarah(s=1.0):
    """Sarah, game designer : cheveux longs, t-shirt, une manette à la main."""
    dos = RoundedRectangle(width=0.74, height=0.9, corner_radius=0.3, fill_color=CHEVEUX, fill_opacity=1,
                           stroke_width=0).move_to(P(0, 0.85))
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.3, fill_color=TSHIRT, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    frange = Arc(radius=0.29, start_angle=0.1, angle=PI - 0.2, fill_color=CHEVEUX, fill_opacity=1,
                 stroke_width=0).move_to(P(0, 1.2))
    m = manette(0.62).move_to(P(0.05, 0.05))
    return VGroup(dos, corps, tete, frange, m).scale(s)


def ecran_jeu(l=5.0, h=3.3):
    """L'écran du jeu vidéo : le cadre, le pied."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.15, fill_color=ECRAN, fill_opacity=1,
                             stroke_color=BORD_ECRAN, stroke_width=4)
    pied = Polygon(P(-0.4, 0), P(0.4, 0), P(0.25, 0.3), P(-0.25, 0.3), fill_color=BORD_ECRAN, fill_opacity=1,
                   stroke_width=0)
    pied.next_to(cadre, DOWN, buff=0)
    return VGroup(cadre, pied)


def barre_xp(long, x0, y, h=0.3, couleur=TERME):
    """Une barre d'XP pleine de longueur long, qui commence en x0."""
    return Rectangle(width=long, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(
        P(x0 + long / 2, y))


def maison(s=1.0, mur=MUR):
    m = Square(0.5, fill_color=mur, fill_opacity=1, stroke_width=0)
    t = Polygon(P(-0.32, 0.25), P(0.32, 0.25), P(0, 0.52), fill_color=TOIT, fill_opacity=1, stroke_width=0)
    p = Rectangle(width=0.14, height=0.24, fill_color="#475569", fill_opacity=1, stroke_width=0).move_to(P(0, -0.13))
    return VGroup(m, t, p).scale(s)


class SuiteGeoVariation1re(AuditMilliers, OutilsEp12, PaysageSuites):
    fichier_marques = "suite_geo_variation_marques.json"
    nom_voix = "premiere-suite-geo-variation"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    def poser(self, mob, extrait=None, suivre=True, anim=None, run_time=0.35):
        """Un objet quand la voix dit l'extrait (suivre : prochaine occurrence)."""
        if extrait:
            (self.suivre if suivre else self.au_mot)(extrait)
        self.play(anim(mob) if anim else FadeIn(mob, shift=UP * 0.1), run_time=run_time)
        return mob

    def pousser(self, br, run_time=0.5):
        """Les barres poussent une à une depuis leur base."""
        self.play(LaggedStart(*[GrowFromEdge(b, DOWN) for b in br], lag_ratio=0.3), run_time=run_time)

    def croix_a_cote(self, mob, r=0.26):
        """Une grande croix rouge À GAUCHE d'une phrase fausse (qui reste lisible)."""
        c = mob.get_left() + LEFT * (r + 0.3)
        return VGroup(Line(c + P(-r, r), c + P(r, -r)), Line(c + P(-r, -r), c + P(r, r))).set_stroke(PIEGE, 8)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        """Le titre, la question ligne à ligne ; les barres qui grandissent à
        « Monte », celles qui rapetissent à « descend », la raison q à « raison »."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suite géométrique", 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Suite")
        self.play(Write(tit), run_time=0.7)
        sous = self.t("son sens de variation", 42, TERME).move_to(P(0, 2.2))
        self.poser(sous, "son sens", False)
        l2 = self.t("Monte-t-elle, ou descend-elle ?", 40).move_to(P(0, 1.38))
        monte = barres(1.35, 5, 0.3, 0.12, 0.28).move_to(P(-4.2, 0)).align_to(P(0, -1.5), DOWN)
        fm = fleche_sens(1, 0.9).next_to(monte, RIGHT, buff=0.25)
        descend = barres(0.7, 5, 0.3, 0.12, 0.95).move_to(P(1.6, 0)).align_to(P(0, -1.5), DOWN)
        fd = fleche_sens(-1, 0.9).next_to(descend, RIGHT, buff=0.25)
        self.au_mot("Monte")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.pousser(monte, 0.5)
        self.play(GrowArrow(fm), run_time=0.3)
        self.au_mot("descend")
        self.pousser(descend, 0.5)
        self.play(GrowArrow(fd), run_time=0.3)
        l3 = self.t("Il faut comparer la raison au bon nombre.", 40).move_to(P(0, 0.72))
        self.poser(l3, "Il faut", False)
        self.au_mot("raison")
        qq = self.t("q", 60, RAISON).move_to(P(-1.25, -0.95))
        cad = self.encadre(qq, RAISON, 0.2)
        self.play(FadeIn(qq, scale=1.5), Create(cad), run_time=0.4)
        self.au_mot("bon nombre")
        pt = self.t("?", 60, RAISON).next_to(cad, RIGHT, buff=0.3)
        self.play(FadeIn(pt, scale=1.5), Indicate(VGroup(qq, cad), color=RAISON), run_time=0.45)
        ident = self.t(self.identite, 26, GREY_A, audit=False).move_to(P(0, 0.15))
        self.play(FadeIn(ident), run_time=0.3)
        self.attendre_voix(marge=0.9)

    # ── 01 : Sarah, game designer, et les barres d'XP ──────────────────────

    X_XP, L_XP = -1.85, 3.1           # le début et la longueur de la 1re barre d'XP

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = sarah(1.0).move_to(P(-5.2, 1.1))
        nom = self.t("Sarah", 42, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = VGroup(self.t("game", 34, TERME), self.t("designer", 34, TERME)).arrange(DOWN, buff=0.1)
        metier.next_to(nom, DOWN, buff=0.14)
        self.au_mot("Sarah")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("game designer")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.4)
        ecr = ecran_jeu(5.6, 3.4).move_to(P(-0.25, 1.15)).align_to(P(0, 2.95), UP)
        self.au_mot("jeu vidéo")
        self.play(FadeIn(ecr, scale=0.95), run_time=0.45)
        ys = (2.25, 1.45, 0.65)
        noms = [self.t(f"Niv. {k + 1}", 28, GREY_A, audit=False).move_to(P(self.X_XP - 0.6, y))
                for k, y in enumerate(ys)]
        fonds = [Rectangle(width=self.L_XP * 1.12, height=0.3, stroke_color=GREY_B, stroke_width=2).move_to(
            P(self.X_XP + self.L_XP * 0.56, y)) for y in ys]
        xp = [barre_xp(self.L_XP * 1.05 ** k, self.X_XP, y) for k, y in enumerate(ys)]
        self.au_mot("chaque niveau")
        self.play(*[FadeIn(n) for n in noms], *[Create(f) for f in fonds], run_time=0.4)
        self.play(GrowFromEdge(xp[0], LEFT), run_time=0.45)
        plus = self.t("+ 5 %", 46, RAISON).move_to(P(4.6, 2.1))
        self.suivre("5")
        self.play(FadeIn(plus, scale=1.4), run_time=0.3)
        pts = VGroup(self.t("de points", 32), self.t("d'expérience", 32)).arrange(DOWN, buff=0.08)
        pts.next_to(plus, DOWN, buff=0.16)
        self.poser(pts, "points")
        bouts = []
        self.au_mot("niveau d'avant")
        for k in (1, 2):
            base = barre_xp(self.L_XP * 1.05 ** (k - 1), self.X_XP, ys[k])
            bout = barre_xp(self.L_XP * 1.05 ** k - base.width, self.X_XP + base.width, ys[k], couleur=RAISON)
            self.play(TransformFromCopy(xp[k - 1], base), run_time=0.35)
            self.play(GrowFromEdge(bout, LEFT), run_time=0.3)
            bouts.append(VGroup(base, bout))
        av = self.t("à chaque niveau", 32, GREY_A).next_to(pts, DOWN, buff=0.16)
        self.play(FadeIn(av, shift=UP * 0.1), *[Indicate(b[1], color=RAISON, scale_factor=1.4) for b in bouts],
                  run_time=0.5)
        carte = self.carte(8.4, 2.0, P(0.3, -2.0))
        tete = self.t("Un testeur affirme :", 30, GREY_A).move_to(P(0, -1.32)).align_to(
            carte.get_left() + RIGHT * 0.3, LEFT)
        self.au_mot("testeur")
        self.play(FadeIn(carte), FadeIn(tete), run_time=0.4)
        c1 = self.t("« 5 %, c'est si peu que ça", 36).move_to(P(0.3, -1.9))
        c2 = self.t("reste presque pareil »", 36).move_to(P(0.3, -2.5))
        self.poser(c1, "5")
        self.poser(c2, "reste presque", False)
        self.au_mot("Sarah doit")
        bulle = Circle(radius=0.36, stroke_color=RAISON, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)
        bulle.move_to(P(-4.35, 2.6))
        qm = self.t("?", 44, RAISON).move_to(bulle)
        self.play(GrowFromCenter(bulle), FadeIn(qm, scale=1.5), run_time=0.35)
        self.play(Indicate(VGroup(c1, c2), color=RAISON, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.5)

    # ── 02 : u₁ = 2 000, q = 1,05 ; 1,05 > 1 : croissante ────────────────

    XS_XP = (-5.2, -2.85, -0.5)

    def ecran_croissante(self):
        self.nouvel_ecran("02-croissante")
        note, (n1, n2) = self.ligne([("uₙ", TERME), ("= les points demandés pour le niveau n", WHITE)], 38)
        note.move_to(P(0, 3.15))
        self.au_mot("u indice n")
        self.play(FadeIn(n1, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("points")
        self.play(FadeIn(n2, shift=DOWN * 0.1), run_time=0.35)
        l1, (a1, b1) = self.ligne([("u₁ =", TERME), ("2 000", WHITE)], 46)
        l1.move_to(P(-3.9, 2.15))
        self.au_mot("indice 1")
        self.play(FadeIn(a1, shift=UP * 0.1), run_time=0.25)
        self.suivre("2 000")
        self.play(FadeIn(b1, scale=1.4), run_time=0.3)
        lq, (aq, bq) = self.ligne([("q =", RAISON), ("1,05", RAISON)], 46)
        lq.move_to(P(0.4, 2.15))
        self.au_mot("On multiplie")
        self.play(FadeIn(aq, shift=UP * 0.1), run_time=0.25)
        self.suivre("1,05")
        cad = self.encadre(lq, RAISON, 0.16)
        self.play(FadeIn(bq, scale=1.4), Create(cad), run_time=0.3)
        lg = LigneTermes([fr(v) for v in XP], xs=self.XS_XP, centre=P(0, 0.45), largeur=1.95, hauteur=0.85, fs=40,
                         noms=["u₁", "u₂", "u₃"], fs_noms=32)
        nu = NuageTermes((0, 25), (0, 7000), P(2.4, -1.15), P(5.75, 1.65))
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=0.4)
        pts = []
        for k, v in enumerate(XP):
            self.suivre(fr(v))
            d = nu.point(k + 1, v, r=0.075)
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), FadeIn(lg.noms[k]),
                     GrowFromCenter(d)]
            if k:
                s = lg.saut(k - 1, "× 1,05", cote=UP, fs=30, creux=0.25)
                s[1]._pas_audit = True                       # « × 1,05 » : déjà dit
                lg.sauts[k - 1] = s
                anims += [Create(s[0]), FadeIn(s[1], scale=1.3)]
            self.play(*anims, run_time=0.35)
            pts.append(d)
        cmp_, (c1, c2, c3) = self.ligne([("1,05", RAISON), (">", JUSTE), ("1", JUSTE)], 54)
        cmp_.move_to(P(-3.0, -1.0))
        self.suivre("1,05")
        self.play(FadeIn(c1, scale=1.3), run_time=0.25)
        self.au_mot("plus grand")
        self.play(FadeIn(c2, scale=1.3), run_time=0.2)
        self.suivre("1")
        self.play(FadeIn(c3, scale=1.4), Indicate(c2, color=JUSTE), run_time=0.25)
        ch = self.t("chaque terme est plus grand que le précédent", 34).move_to(P(-0.6, -1.8))
        self.poser(ch, "chaque terme", False)
        self.play(*self.allumer_cases(lg, [1, 2]), run_time=0.5)
        fm = fleche_sens(1, 0.8)
        cr = self.t("croissante,", 42, MONTE)
        le = self.t("lentement,", 36, GREY_A)
        ms = self.t("mais sans jamais s'arrêter", 36)
        rang = VGroup(fm, cr, le).arrange(RIGHT, buff=0.28).move_to(P(-2.8, -2.6))
        le.align_to(cr, DOWN)
        ms.move_to(P(-2.8, -3.3))
        self.au_mot("croissante")
        self.play(GrowArrow(fm), FadeIn(cr, scale=1.2), run_time=0.4)
        self.au_mot("lentement")
        self.play(FadeIn(le, shift=UP * 0.1), run_time=0.3)
        self.au_mot("mais sans")
        suite = [nu.point(n, 2000 * 1.05 ** n, r=0.075) for n in range(4, 26)]
        self.play(FadeIn(ms, shift=UP * 0.1), LaggedStart(*[GrowFromCenter(d) for d in suite], lag_ratio=0.25),
                  run_time=1.3)
        self.attendre_voix(marge=0.5)

    # ── 03 : la règle : on compare q à 1 ───────────────────────────────────

    def ecran_regle(self):
        self.nouvel_ecran("03-regle")
        self.titre("La règle", JAUNE_TITRE, 48, extrait="La règle")
        st = self.t("suite géométrique à termes positifs", 36, TERME).move_to(P(0, 2.45))
        self.poser(st, "géométrique", False)
        xs = (-4.25, 0.0, 4.25)
        cartes = [self.carte(3.9, 3.6, P(x, 0.15)) for x in xs]
        t2, (t2a, t2b) = self.ligne([("0 < q <", RAISON), ("1", RAISON)], 46)
        tetes = [self.t("q > 1", 46, RAISON), t2, self.t("q = 1", 46, RAISON)]
        mots = [self.t("croissante", 36, MONTE), self.t("décroissante", 36, DESCEND), self.t("constante", 36, PLAT)]
        dessins = []
        for k, (x, qq, h0) in enumerate(zip(xs, (1.3, 0.72, 1.0), (0.3, 1.0, 0.55))):
            tetes[k].move_to(P(x, 1.35))
            mots[k].move_to(P(x, -1.05))
            br = barres(qq, 5, 0.26, 0.1, h0).move_to(P(x - 0.45, 0)).align_to(P(0, -0.5), DOWN)
            s = 1 if qq > 1 else -1 if qq < 1 else 0
            fl = fleche_sens(s, 0.75).move_to(P(x + 1.2, 0.0 + 0.2 * s))
            dessins.append((br, fl))
        reperes = (("plus grand que", "1", "croissante"), ("entre", "0", "décroissante"),
                   ("q égale", "1", "constante"))
        for k, (a, nb, b) in enumerate(reperes):
            self.au_mot(a)
            self.suivre(nb)
            tete = t2a if k == 1 else tetes[k]
            self.play(FadeIn(cartes[k], scale=0.95), FadeIn(tete, shift=DOWN * 0.1), run_time=0.35)
            if k == 1:  # le « 1 » de « entre 0 et 1 » à sa voix
                self.suivre("1")
                self.play(FadeIn(t2b, shift=DOWN * 0.1), run_time=0.2)
            self.suivre(b)
            br, fl = dessins[k]
            self.pousser(br, 0.4)
            self.play(GrowArrow(fl), FadeIn(mots[k], scale=1.2), run_time=0.35)
        s1, s2 = self.t("On compare la raison à", 44), self.t("1", 64, RAISON)
        VGroup(s1, s2).arrange(RIGHT, buff=0.3).move_to(P(-0.4, -2.55))
        s2.align_to(s1, DOWN)
        self.au_mot("On compare")
        self.play(FadeIn(s1, shift=UP * 0.1), run_time=0.3)
        self.suivre("1")
        cad = self.encadre(s2, RAISON, 0.14)
        self.play(FadeIn(s2, scale=1.5), Create(cad), *[Indicate(t, color=RAISON, scale_factor=1.15) for t in tetes],
                  run_time=0.5)
        self.insister(VGroup(s2, cad), 1.25)
        self.attendre_voix(marge=0.5)

    # ── la correction d'une question-pause : la bonne monte, la place se libère ──

    def degager(self, q, bonne, ok, y, avec=()):
        autres = [q.cartes[j] for j in range(3) if j != bonne]
        bon = VGroup(q.cartes[bonne], ok)
        self.play(*[FadeOut(m) for m in autres], FadeOut(q.question), bon.animate.move_to(P(0, y)), *avec,
                  run_time=0.4)

    # ── 04 : question-pause n° 1 : q = 0,9 → A (décroissante) ──────────────

    def ecran_question1(self):
        l1 = self.t("Une suite géométrique à termes positifs", 38).move_to(P(0, 2.3))
        f, (fa, fb) = self.ligne([("a pour raison", WHITE), ("q = 0,9.", RAISON)], 44)
        f.move_to(P(0, 1.6))

        def enonce():
            self.poser(l1, "Une suite", False)
            self.au_mot("raison")
            self.play(FadeIn(fa, shift=UP * 0.1), run_time=0.25)
            self.suivre("0,9")
            self.play(FadeIn(fb, scale=1.3), run_time=0.3)

        choix = ["décroissante", "croissante, car 0,9 est positif", "constante, car 0,9 est proche de 1"]
        q = self.poser_question("04-question", [(self.t("Elle est :", 40), "Elle est")], choix, 0,
                                y_question=1.05, dessin=enonce, largeur=9.4, fs=36)
        self.dire("04b-reponse")
        ok = self.q_reponse(q, 0)
        cmp_, (c1, c2, c3) = self.ligne([("0,9", RAISON), ("<", DESCEND), ("1", DESCEND)], 56)
        cmp_.move_to(P(-4.4, -0.8))
        self.suivre("0,9")
        self.degager(q, 0, ok, 0.55, avec=[FadeIn(c1, scale=1.3)])
        self.au_mot("plus petit")
        self.play(FadeIn(c2, scale=1.3), run_time=0.2)
        self.suivre("1")
        self.play(FadeIn(c3, scale=1.4), run_time=0.25)
        x0, L = -2.0, 5.6
        fond = Rectangle(width=L, height=0.42, stroke_color=GREY_B, stroke_width=2).move_to(P(x0 + L / 2, -0.8))
        plein = barre_xp(L, x0, -0.8, 0.42)
        self.au_mot("à chaque")
        self.play(Create(fond), GrowFromEdge(plein, LEFT), run_time=0.4)
        for k in (1, 2):
            neuf = barre_xp(L * 0.9 ** k, x0, -0.8, 0.42)
            perte = barre_xp(L * 0.9 ** (k - 1) - neuf.width, x0 + neuf.width, -0.8, 0.42, couleur=RAISON)
            if k == 1:
                self.au_mot("étape")
            else:
                self.suivre("90")
                gd = self.t("on ne garde que 90 %", 38).move_to(P(x0 + L / 2, -1.55))
                self.play(FadeIn(gd, shift=UP * 0.1), run_time=0.25)
            self.play(FadeIn(perte), run_time=0.15)
            self.play(Transform(plein, neuf), FadeOut(perte, shift=DOWN * 0.2), run_time=0.4)
        fd = fleche_sens(-1, 0.85)
        cb = self.t("donc ça baisse", 42, DESCEND)
        VGroup(fd, cb).arrange(RIGHT, buff=0.3).move_to(P(-0.6, -2.5))
        self.au_mot("donc")
        self.play(GrowArrow(fd), FadeIn(cb, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 05 : les ventes baissent de 10 % : vers 0, jamais en dessous ───────

    XS_V = (-4.9, -2.35, 0.2)

    def ecran_positive(self):
        self.nouvel_ecran("05-reste-positive")
        self.titre("Les ventes du jeu", JAUNE_TITRE, 46, extrait="ventes")
        moins = self.t("− 10 % par mois", 40, RAISON).move_to(P(4.1, 1.4))
        self.poser(moins, "10", anim=lambda m: FadeIn(m, scale=1.3))
        lg = LigneTermes([fr(v) for v in VENTES], xs=self.XS_V, centre=P(0, 1.35), largeur=2.25, hauteur=0.85, fs=40)
        nu = NuageTermes((0, 12), (0, 55000), P(-5.9, -2.95), P(-0.4, 0.05))
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=0.4)
        for k, v in enumerate(VENTES):
            self.suivre(fr(v))
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4),
                     GrowFromCenter(nu.point(k, v, r=0.08))]
            if k:
                s = lg.saut(k - 1, "− 10 %", cote=UP, fs=30, creux=0.22)
                s[1]._pas_audit = True                       # « − 10 % » : déjà dit
                anims += [Create(s[0]), FadeIn(s[1], scale=1.3)]
            self.play(*anims, run_time=0.35)
        X = 3.3
        fd = fleche_sens(-1, 0.6, 7)
        dc = self.t("elle décroît", 38, DESCEND)
        VGroup(fd, dc).arrange(RIGHT, buff=0.25).move_to(P(X, 0.6))
        self.au_mot("décroît")
        reste = [nu.point(n, 50000 * 0.9 ** n, r=0.08) for n in range(3, 13)]
        self.play(GrowArrow(fd), FadeIn(dc, scale=1.2), LaggedStart(*[GrowFromCenter(d) for d in reste],
                                                                    lag_ratio=0.2), run_time=0.6)
        r1 = self.t("et se rapproche de 0,", 38).move_to(P(X, -0.15))
        zero = self.t("0", 30, JUSTE).next_to(nu.ax_n.get_start(), LEFT, buff=0.12)
        self.au_mot("se rapproche")
        self.suivre("0")
        self.play(FadeIn(r1, shift=UP * 0.1), FadeIn(zero, scale=1.4),
                  nu.ax_n.animate.set_color(JUSTE), run_time=0.35)
        r2a, r2b = self.t("mais elle ne devient", 38), self.t("jamais négative", 38, JUSTE)
        r2a.move_to(P(X, -0.9))
        r2b.move_to(P(X, -1.5))
        self.poser(r2a, "mais elle", False)
        self.poser(r2b, "jamais", False)
        self.insister(r2b, 1.12)
        r3 = self.t("on garde toujours 90 %", 32, GREY_A).move_to(P(X - 0.8, -2.3))
        self.poser(r3, "90")
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège : comparer q à 0 ─────────────────────────────────────

    def x_droite(self, v):
        return -5.0 + 5.2 * v

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        tit = self.t("Le piège !", 48, PIEGE).move_to(P(0, 3.15))
        self.au_mot("piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.35)
        r1, (ra, rb) = self.ligne([("Comparer q à", PIEGE), ("0", PIEGE)], 44)
        r1.move_to(P(-2.4, 2.3))
        y = 0.75
        droite = Arrow(P(-5.8, y), P(1.1, y), buff=0, color=GREY_B, stroke_width=3, tip_length=0.18)
        t0, t1 = [Line(P(self.x_droite(v), y - 0.12), P(self.x_droite(v), y + 0.12), color=GREY_B, stroke_width=3)
                  for v in (0, 1)]
        n0 = self.t("0", 36, GREY_A).next_to(t0, DOWN, buff=0.12)
        self.au_mot("Comparer")
        self.play(FadeIn(ra, shift=UP * 0.1), Create(droite), FadeIn(t0), FadeIn(t1), run_time=0.4)
        self.suivre("0")
        self.play(FadeIn(rb, scale=1.4), FadeIn(n0, scale=1.4), run_time=0.3)
        pt = Dot(P(self.x_droite(0.9), y), radius=0.12, color=RAISON)
        lq, (qa, qb) = self.ligne([("q =", RAISON), ("0,9", RAISON)], 40)
        lq.next_to(pt, UP, buff=0.22)
        self.au_mot("q égale")
        self.play(FadeIn(qa), run_time=0.2)
        self.suivre("0,9")
        self.play(GrowFromCenter(pt), FadeIn(qb, scale=1.3), run_time=0.3)
        seg = Line(P(self.x_droite(0), y), P(self.x_droite(0.9), y), color=JUSTE, stroke_width=9)
        pos = self.t("positif", 38, JUSTE).move_to(P(self.x_droite(0.42), y + 0.5))
        self.au_mot("positif")
        self.play(Create(seg), FadeIn(pos, shift=UP * 0.1), run_time=0.35)
        self.bring_to_front(pt)
        br = barres(0.9, 6, 0.3, 0.1, 1.15).move_to(P(3.0, 0)).align_to(P(0, 0.35), DOWN)
        fd = fleche_sens(-1, 0.75).next_to(br, RIGHT, buff=0.3).shift(UP * 0.25)
        desc = VGroup(self.t("et pourtant", 34, DESCEND), self.t("la suite descend", 34, DESCEND))
        desc.arrange(DOWN, buff=0.1).move_to(P(3.3, -0.25))
        self.au_mot("pourtant")
        cx = self.croix_a_cote(r1)
        self.play(Create(cx), r1.animate.set_opacity(0.55), run_time=0.35)
        self.pousser(br, 0.45)
        self.au_mot("descend")
        self.play(FadeIn(desc, shift=UP * 0.1), GrowArrow(fd), run_time=0.35)
        ca = self.carte(5.5, 2.0, P(-3.35, -1.85))
        cg = self.carte(5.5, 2.0, P(2.55, -1.85), couleur=JUSTE)
        ha = self.t("Suite arithmétique", 36, JAUNE_TITRE).move_to(P(-3.35, -1.3))
        hg = self.t("Suite géométrique", 36, JAUNE_TITRE).move_to(P(2.55, -1.3))
        sa = self.t("on regarde le signe de r", 32, larg=5.0).move_to(P(-3.35, -2.1))
        lg_, (ga, gb) = self.ligne([("on compare q à", JUSTE), ("1", JUSTE)], 38)
        lg_.move_to(P(2.55, -2.1))
        n1 = self.t("1", 36, JUSTE).next_to(t1, DOWN, buff=0.12)
        self.au_mot("arithmétique")
        self.play(FadeIn(ca, scale=0.95), FadeIn(ha), run_time=0.35)
        self.poser(sa, "signe", False)
        self.au_mot("géométrique")
        self.play(FadeIn(cg, scale=0.95), FadeIn(hg), run_time=0.35)
        self.au_mot("on compare")
        self.play(FadeIn(ga, shift=UP * 0.1), run_time=0.3)
        self.suivre("1")
        self.play(FadeIn(gb, scale=1.5), FadeIn(n1, scale=1.4), t1.animate.set_color(JUSTE).set_stroke(width=6),
                  run_time=0.35)
        self.insister(VGroup(gb, n1), 1.3)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : vₙ = 300 × 1,02ⁿ → C (croissante) ───────

    def ecran_question2(self):
        f, (f0, f1, f2, f3, f4, f5) = self.ligne([("La suite", WHITE), ("vₙ =", TERME), ("300", WHITE), ("×", WHITE),
                                                  ("1,02", WHITE), ("ⁿ", RAISON)], 54)
        f.move_to(P(0, 1.95))

        def enonce():
            self.au_mot("La suite")
            self.play(FadeIn(f0, shift=UP * 0.1), run_time=0.25)
            self.au_mot("v indice")
            self.play(FadeIn(f1, shift=UP * 0.1), run_time=0.25)
            self.suivre("300")
            self.play(FadeIn(f2, scale=1.3), FadeIn(f3), run_time=0.25)
            self.suivre("1,02")
            self.play(FadeIn(f4, scale=1.3), FadeIn(f5, scale=1.3), run_time=0.3)

        choix = ["décroissante, car le taux est faible", "constante", "croissante"]
        q = self.poser_question("07-question", [(self.t("Elle est :", 40), "est :")], choix, 2,
                                y_question=1.15, dessin=enonce, largeur=9.4, fs=36)
        self.dire("07b-reponse")
        ok = self.q_reponse(q, 2)
        self.degager(q, 2, ok, -0.45)
        cad = self.encadre(f4, RAISON, 0.1)
        l1, (la, lb) = self.ligne([("la raison", RAISON), ("= la base de la puissance", WHITE)], 38)
        l1.move_to(P(0, 0.75))
        self.au_mot("La raison")
        self.play(Create(cad), f4.animate.set_color(RAISON), FadeIn(la, shift=UP * 0.1), run_time=0.4)
        self.au_mot("base")
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.3)
        c, (c1, c2, c3) = self.ligne([("1,02", RAISON), (">", JUSTE), ("1", JUSTE)], 58)
        c.move_to(P(0, -1.75))
        self.suivre("1,02")
        self.play(FadeIn(c1, scale=1.3), run_time=0.25)
        self.au_mot("plus grande")
        self.play(FadeIn(c2, scale=1.3), run_time=0.2)
        self.suivre("1")
        self.play(FadeIn(c3, scale=1.4), run_time=0.25)
        self.insister(c, 1.15)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : trois suites ────────────────────────────────────────

    XS_DEFI = (-4.35, 0.0, 4.35)

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        m1, m2, m3 = self.t("Croissante,", 38, MONTE), self.t("décroissante", 38, DESCEND), self.t("ou constante ?", 38)
        VGroup(m1, m2, m3).arrange(RIGHT, buff=0.22).move_to(P(0, 2.4))
        self.poser(m1, "Croissante", False)
        self.poser(m2, "décroissante")
        self.poser(m3, "constante")
        x1, x2, x3 = self.XS_DEFI
        cartes = [self.carte(4.15, 3.9, P(x, -0.05)) for x in self.XS_DEFI]
        nums = [self.t(str(k + 1), 42, JAUNE_TITRE, audit=False).move_to(P(x - 1.6, 1.5))
                for k, x in enumerate(self.XS_DEFI)]
        # 1 : la ville de 5 000 habitants, − 2 % par an
        self.au_mot("Un :")
        self.play(FadeIn(cartes[0], scale=0.95), FadeIn(nums[0]), run_time=0.3)
        ville = VGroup(maison(0.8), maison(1.0, "#CBD5E1"), maison(0.8)).arrange(RIGHT, buff=0.15, aligned_edge=DOWN)
        ville.move_to(P(x1 + 0.3, 1.0))
        self.au_mot("ville")
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in ville], lag_ratio=0.3), run_time=0.45)
        h1 = self.t("5 000 habitants", 30).move_to(P(x1, 0.3))
        self.poser(h1, "5 000")
        h2 = self.t("− 2 % par an", 30, RAISON).move_to(P(x1, -0.25))
        self.poser(h2, "2")
        # 2 : wₙ = 40 × 1ⁿ
        self.au_mot("Deux")
        self.play(FadeIn(cartes[1], scale=0.95), FadeIn(nums[1]), run_time=0.3)
        self.calcul([("wₙ =", TERME, "w indice"), ("40", WHITE, "40"), ("×", WHITE, None), ("1", WHITE, "1"),
                     ("ⁿ", RAISON, None)], 0.5, centre=x2, fs=40)
        # 3 : t₀ = 8 et tₙ₊₁ = 1,5 × tₙ
        self.au_mot("Trois")
        self.play(FadeIn(cartes[2], scale=0.95), FadeIn(nums[2]), run_time=0.3)
        self.calcul([("t₀ =", TERME, "t indice 0"), ("8", WHITE, "8")], 0.85, centre=x3, fs=38)
        self.calcul([("tₙ₊₁ =", TERME, "plus 1"), ("1,5", WHITE, "1,5"), ("×", WHITE, None), ("tₙ", TERME, None)],
                    0.1, centre=x3, fs=34)
        self.defi_pause(-2.6, x=-0.6)
        self._defi = (tit, cartes, VGroup(m1, m2, m3))

    def verdict(self, x, sens, mot, y):
        fl = fleche_sens(sens, 0.45, 6)
        coul = MONTE if sens > 0 else DESCEND if sens < 0 else PLAT
        m = self.t(mot, 32, coul)
        return VGroup(fl, m).arrange(RIGHT, buff=0.3).move_to(P(x, y))

    def deux_lignes(self, a, b, x, y=-0.4, fs=30):
        """La raison d'une carte (orange), puis sa comparaison à 1, lisibles sous
        l'énoncé ; b : une ligne ou une liste de lignes (le tout en un groupe)."""
        bs = VGroup(*[self.t(l, fs, WHITE) for l in ([b] if isinstance(b, str) else b)]).arrange(DOWN, buff=0.12)
        g = VGroup(self.t(a, fs + 2, RAISON), bs).arrange(DOWN, buff=0.1)
        return g.move_to(P(x, y))

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, cartes, sous = self._defi
        x1, x2, x3 = self.XS_DEFI
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.au_mot("Correction")
        haut = 0.85  # la question s'efface : les cartes grandissent vers le haut
        contenu = [m for m in self.mobjects if m not in (self._margo, tit, sous, *cartes)]
        grandes = [self.carte(c.width, c.height + haut, c.get_center() + UP * haut / 2) for c in cartes]
        self.play(ReplacementTransform(tit, cor), FadeOut(sous), *[Transform(c, g) for c, g in zip(cartes, grandes)],
                  *[m.animate.shift(UP * haut) for m in contenu], run_time=0.5)
        reperes = ((x1, "Un :", "0,98", "q = 0,98", "plus petit que 1", -1, "décroissante"),
                   (x2, "Deux", "1", "q = 1", ["tous les termes", "valent 40"], 0, "constante"),
                   (x3, "Trois", "1,5", "q = 1,5", "plus grand que 1", 1, "croissante"))
        verdicts = []
        for x, num, qv, a, b, sens, mot in reperes:
            g = self.deux_lignes(a, b, x)
            self.au_mot(num)
            self.suivre(qv)
            self.play(FadeIn(g[0], scale=1.2), run_time=0.3)
            self.suivre("40" if sens == 0 else "1")
            self.play(FadeIn(g[1], shift=UP * 0.1), run_time=0.3)
            v = self.verdict(x, sens, mot, -1.55)
            self.suivre(mot)
            self.play(GrowArrow(v[0]), FadeIn(v[1], scale=1.2), run_time=0.35)
            verdicts.append(v)
        self.play(*[Indicate(v[1], scale_factor=1.15) for v in verdicts], run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38

        def L(*m):
            return self.ligne(list(m), fs)[0]

        p1 = [L(("Suite géométrique à termes positifs :", JAUNE_TITRE)),
              L(("on compare la raison q à", WHITE), ("1", RAISON))]
        p2 = [L(("q > 1 :", RAISON), ("croissante", MONTE)),
              L(("0 < q < 1 :", RAISON), ("décroissante vers 0,", DESCEND)),
              L(("sans devenir négative", WHITE)),
              L(("q = 1 :", RAISON), ("constante", PLAT))]
        p3 = [L(("Même une raison proche de 1", WHITE)), L(("fait bouger la suite.", JUSTE))]
        self.finale([(p1, ["Pour une suite", "à 1"]), (p2, ["plus grande", "et 1", "sans devenir", "égale à 1"]),
                     (p3, ["Même", "fait bouger"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_croissante()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_positive()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
