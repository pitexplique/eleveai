# suite_geo_recurrence.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# la relation de récurrence » (16:9), ceinture VERTE. Série SUITES, épisode 10.
# Micro du coach : expo_suite_recurrence (notion expo_suite_geometrique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts
# + suites-geometriques-renfort.ts. Jumelle géométrique de l'épisode 02.
#
# Ce que demande le coach → écran :
#   · gRelationSituation (QCM : quelle relation traduit la situation ?) → 01, 02, 03 ;
#   · gSuivant (le terme suivant uₖ₊₁ = q × uₖ)                         → 02, 04 ;
#   · gDerouler / gRecContexte (dérouler pas à pas depuis u₀)           → 04, 08 défi ;
#   · gPrecedent (reculer d'un rang : on divise par q)                  → 05, 07 ;
#   · pièges « uₙ₊₁ = uₙ + t », « 0,02 × vₙ » (le taux seul)            → 03, 06.
# Clé de voix → écran :
#   00-garde (cases, flèches qui avancent puis une qui recule, échelle des ceintures)
#   · 01 Manon, apicultrice : la ruche, l'essaim (10 abeilles dessinées = 10 000),
#   2 abeilles orange de plus (+ 20 %), la hausse à ajouter · 02 uₙ, u₀ = 10 000,
#   + 20 % = × 1,2, les flèches « × 1,2 » qui sautent, uₙ₊₁ = 1,2 × uₙ (terme
#   suivant / la raison / terme actuel) · 03/03b question (A : vₙ₊₁ = 0,98 × vₙ ;
#   50 habitants, 1 s'en va) · 04 on déroule : 12 000, 14 400, 17 280, l'essaim
#   grandit · 05 remonter le temps : les flèches retour « ÷ 2 », 160 puis 80
#   · 06 le piège « + 20 » barré, 20 abeilles contre 20 % · 07/07b question
#   (C : 54) · 08/08b défi : la balle qui rebondit, h₃ = 67,5 cm · 09 « Ce que tu
#   as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = la raison, vert = juste,
# rouge = piège. ⛔ Pas de LaTeX : tout en Text.
# Voix : manim/voix/premiere-suite-geo-recurrence.json (débit −6),
# calée mot à mot par suite_geo_recurrence_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_recurrence.py SuiteGeoRecurrence1re -o eleveai-maths-premiere-suite-geo-recurrence --media_dir manim/scripts/premiere/media-suite-geo-recurrence
# Sortie : manim/sorties/premiere/maths/suites/10-geo-recurrence/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_recurrence import AuditMilliers, OutilsEp02, arc_fleche  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
U0, Q = 10000, 1.2
MANON = [10000, 12000, 14400, 17280]
assert all(abs(U0 * Q ** k - v) < 1e-6 for k, v in enumerate(MANON))
assert abs(1 - 0.02 - 0.98) < 1e-12                       # Q1 : perdre 2 % → × 0,98 (A)
assert 320 / 2 == 160 and 160 / 2 == 80                     # w₅, w₄
assert 162 / 3 == 54                                        # Q2 : t₃ → C
DEFI = [160, 120, 90, 67.5]
assert all(abs(160 * 0.75 ** k - v) < 1e-9 for k, v in enumerate(DEFI))

PEAU, COMBI, BOIS, BOIS_F, MIEL = "#c68642", "#F1F5F9", "#D97706", "#92400E", "#FACC15"


# ── les dessins : Manon, la ruche, les abeilles, la balle ──────────────────

def manon(s=1.0):
    """Manon, apicultrice : chapeau à voilette, combinaison blanche, gants,
    enfumoir qui fume."""
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=COMBI, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2).move_to(P(0, 0.12))
    zip_ = Line(P(0, 0.65), P(0, -0.4), stroke_color=GREY_B, stroke_width=2)
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    queue = Ellipse(width=0.16, height=0.34, fill_color="#3b2412", fill_opacity=1, stroke_width=0)
    queue.move_to(P(-0.33, 0.86)).rotate(0.3)
    voile = RoundedRectangle(width=0.72, height=0.62, corner_radius=0.12, fill_color="#0F172A", fill_opacity=0.35,
                             stroke_color=GREY_A, stroke_width=2).move_to(P(0, 0.95))
    maille = VGroup(*[Line(P(-0.32 + 0.16 * k, 0.68), P(-0.32 + 0.16 * k, 1.22), stroke_color=GREY_A,
                           stroke_width=1, stroke_opacity=0.6) for k in range(5)])
    bord = Ellipse(width=1.05, height=0.2, fill_color="#E5E7EB", fill_opacity=1, stroke_width=0).move_to(P(0, 1.27))
    calotte = RoundedRectangle(width=0.52, height=0.3, corner_radius=0.1, fill_color="#E5E7EB", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 1.42))
    gants = VGroup(*[Circle(radius=0.11, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(dx, -0.1))
                     for dx in (-0.55, 0.55)])
    pot = RoundedRectangle(width=0.26, height=0.42, corner_radius=0.05, fill_color=GREY_B, fill_opacity=1,
                           stroke_width=0).move_to(P(0.8, 0.0))
    bec = Polygon(P(0.7, 0.21), P(0.9, 0.21), P(0.84, 0.36), P(0.76, 0.36), fill_color=GREY_A, fill_opacity=1,
                  stroke_width=0)
    fumee = VGroup(*[Arc(radius=0.07, start_angle=-PI / 2, angle=PI, stroke_color=GREY_A, stroke_width=3)
                     .move_to(P(0.8 + 0.06 * (k % 2), 0.48 + 0.15 * k)) for k in range(3)])
    return VGroup(queue, corps, zip_, tete, voile, maille, bord, calotte, gants, pot, bec, fumee).scale(s)


def ruche(s=1.0, etages=2):
    """La ruche : pieds, corps en bois (étages), trou d'envol, toit."""
    g = VGroup()
    pieds = VGroup(*[Line(P(dx, -0.95), P(dx, -0.6), stroke_color=BOIS_F, stroke_width=6) for dx in (-0.6, 0.6)])
    planche = Rectangle(width=1.8, height=0.1, fill_color=BOIS_F, fill_opacity=1, stroke_width=0).move_to(P(0, -0.55))
    corps = VGroup(*[Rectangle(width=1.6, height=0.55, fill_color=BOIS, fill_opacity=1, stroke_color=BOIS_F,
                               stroke_width=3).move_to(P(0, -0.225 + 0.55 * k)) for k in range(etages)])
    trou = RoundedRectangle(width=0.5, height=0.09, corner_radius=0.04, fill_color="#1F1300", fill_opacity=1,
                            stroke_width=0).move_to(P(0, -0.42))
    haut = -0.5 + 0.55 * etages
    toit = Polygon(P(-0.95, haut), P(0.95, haut), P(0.8, haut + 0.25), P(-0.8, haut + 0.25), fill_color="#78350F",
                   fill_opacity=1, stroke_width=0)
    g.add(pieds, planche, corps, trou, toit)
    return g.scale(s)


def abeille(s=1.0, couleur=MIEL):
    """Une abeille : corps rayé, tête, deux ailes."""
    ailes = VGroup(*[Ellipse(width=0.13, height=0.17, fill_color=WHITE, fill_opacity=0.75, stroke_width=0)
                     .move_to(P(dx, 0.1)).rotate(0.4 * (1 if dx > 0 else -1)) for dx in (-0.04, 0.06)])
    corps = Ellipse(width=0.26, height=0.16, fill_color=couleur, fill_opacity=1, stroke_width=0)
    rayures = VGroup(*[Line(P(dx, -0.07), P(dx, 0.07), stroke_color="#1F1300", stroke_width=3) for dx in (-0.03, 0.04)])
    tete = Circle(radius=0.055, fill_color="#1F1300", fill_opacity=1, stroke_width=0).move_to(P(0.14, 0.01))
    return VGroup(ailes, corps, rayures, tete).scale(s)


def places_essaim(n, centre, r):
    """n places réparties dans un disque (spirale de tournesol), toujours les mêmes."""
    c = np.array(centre, dtype=float)
    if c.size == 2:
        c = P(c[0], c[1])
    out = []
    for k in range(n):
        rho = r * np.sqrt((k + 0.5) / n)
        a = k * 2.39996
        out.append(c + P(rho * np.cos(a), 0.8 * rho * np.sin(a)))
    return out


def essaim(n, centre, r, s=0.9, debut=0, couleur=MIEL, total=None):
    """Les abeilles debut … n − 1 d'un essaim de `total` places (n par défaut)."""
    pl = places_essaim(total or n, centre, r)
    return VGroup(*[abeille(s, couleur).move_to(pl[k]) for k in range(debut, n)])


def fleur(x, y, c="#F472B6"):
    tige = Line(P(x, y - 0.35), P(x, y), stroke_color="#4ADE80", stroke_width=3)
    petales = VGroup(*[Circle(radius=0.07, fill_color=c, fill_opacity=1, stroke_width=0)
                       .move_to(P(x + 0.09 * np.cos(a), y + 0.09 * np.sin(a))) for a in np.arange(0, TAU, TAU / 5)])
    coeur = Circle(radius=0.05, fill_color=MIEL, fill_opacity=1, stroke_width=0).move_to(P(x, y))
    return VGroup(tige, petales, coeur)


def personnes(n, x0, x1, y, r=0.085):
    """Une rangée de n habitants (un point = un habitant)."""
    pas = (x1 - x0) / (n - 1)
    return VGroup(*[Dot(P(x0 + k * pas, y), radius=r, color=TERME) for k in range(n)])


class SuiteGeoRecurrence1re(AuditMilliers, OutilsEp02, PaysageSuites):
    fichier_marques = "suite_geo_recurrence_marques.json"
    nom_voix = "premiere-suite-geo-recurrence"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Quatre cases de plus en plus grandes (on multiplie) ; les flèches
        avancent, puis une flèche revient en arrière (dessous)."""
        lg = LigneTermes(["", "", "", ""], centre=P(-0.6, -1.25), pas=1.6, largeur=1.05, hauteur=0.6, fs=30)
        for k, c in enumerate(lg.cases):
            c.scale(0.8 + 0.12 * k)
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in lg.cases], lag_ratio=0.15), run_time=0.5)
        for k in range(3):
            fl = arc_fleche(lg.cases[k][0].get_top() + UP * 0.08, lg.cases[k + 1][0].get_top() + UP * 0.08, UP,
                            creux=0.22)
            self.lancer(fl, run_time=0.3)
        fl = arc_fleche(lg.cases[3][0].get_bottom() + DOWN * 0.08, lg.cases[2][0].get_bottom() + DOWN * 0.08, DOWN,
                        creux=0.22)
        self.lancer(fl, run_time=0.45)

    def ecran_garde(self):
        self.garde("Suite géométrique",
                   [("la relation de récurrence", "la relation", TERME),
                    ("Comment écrire :", "Comment"),
                    ("« à chaque étape, on multiplie » ?", "à chaque étape")],
                   dessin=self.dessin_garde)

    # ── 01 : Manon et ses abeilles ─────────────────────────────────────────

    C_ESS, R_ESS = (3.9, 1.2), 0.95                    # l'essaim (au-dessus, à droite de la ruche)

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = manon(1.0).move_to(P(-4.85, 0.75))
        nom = self.t("Manon", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        metier = self.t("apicultrice", 32, TERME).next_to(nom, DOWN, buff=0.12)
        self.au_mot("Manon")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("apicultrice")
        self.play(FadeIn(metier, shift=UP * 0.1), run_time=0.35)
        self.play(perso[-1].animate.shift(UP * 0.1).set_opacity(0.5), run_time=0.4)
        self.au_mot("printemps")
        fleurs = VGroup(*[fleur(-3.1 + 0.42 * k, -0.95 + 0.12 * (k % 2), ("#F472B6", "#A78BFA", "#F9FAFB")[k % 3])
                          for k in range(5)])
        prin = self.t("au printemps", 30, "#4ADE80").move_to(P(-2.25, -1.75))
        self.play(LaggedStart(*[GrowFromEdge(f, DOWN) for f in fleurs], lag_ratio=0.15), FadeIn(prin), run_time=0.6)
        rch = ruche(1.0).move_to(P(0.15, 0.0))
        self.au_mot("colonies")
        self.play(FadeIn(rch, shift=UP * 0.15), run_time=0.45)
        self.au_mot("10 000")
        ab = essaim(10, self.C_ESS, self.R_ESS, total=12)
        nb = self.t("10 000 abeilles", 36, TERME).move_to(P(3.9, -0.35))
        self.play(LaggedStart(*[FadeIn(a, shift=(a.get_center() - P(1.0, -0.4)) * 0.3) for a in ab], lag_ratio=0.08),
                  FadeIn(nb, shift=UP * 0.1), run_time=0.8)
        self.au_mot("chaque mois")
        cm = self.t("chaque mois :", 36, RAISON)
        pc = self.t("+ 20 %", 36, RAISON)
        ligne = VGroup(cm, pc).arrange(RIGHT, buff=0.2).move_to(P(3.9, -1.05))
        self.play(FadeIn(cm, shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 %")
        neuves = essaim(12, self.C_ESS, self.R_ESS, debut=10, couleur=RAISON)
        self.play(FadeIn(pc, scale=1.3), *[FadeIn(a, scale=1.8) for a in neuves], run_time=0.45)
        self.play(*[Flash(a, color=RAISON, line_length=0.1, num_lines=8) for a in neuves], run_time=0.4)
        self.play(*[a[1].animate.set_fill(MIEL) for a in neuves], run_time=0.3)
        self.au_mot("agrandir")
        qp = self.t("Quand agrandir la ruche ?", 38).move_to(P(0, -2.55))
        self.play(FadeIn(qp, shift=UP * 0.1), run_time=0.35)
        hausse = DashedVMobject(Rectangle(width=1.6, height=0.55, stroke_color=RAISON, stroke_width=4),
                                num_dashes=30).move_to(P(0.15, rch[-1].get_top()[1] + 0.12))
        self.play(rch[-1].animate.shift(UP * 0.62), run_time=0.35)
        self.play(Create(hausse), run_time=0.45)
        self.play(Indicate(hausse, color=RAISON, scale_factor=1.06), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 02 : la notation et la relation ────────────────────────────────────

    XS = (-4.5, -1.5, 1.5, 4.5)

    def ecran_relation(self):
        self.nouvel_ecran("02-relation")
        ligne = self.phrase([("uₙ", "u indice n", TERME), ("= le nombre d'abeilles", "le nombre"),
                             ("n mois après le début", "mois")], 36)
        ligne.nombres[0].scale(1.25)
        ligne.arrange(RIGHT, buff=0.22).move_to(P(0, 3.2))
        self.montrer_liste(ligne)
        lg = LigneTermes([fr(v) for v in MANON], xs=self.XS, centre=P(0, 1.7), largeur=2.1, hauteur=0.85, fs=38,
                         noms=[u(k) for k in range(4)], fs_noms=32)
        for k in range(4):
            lg.noms[k].next_to(lg.cases[k][0], UP, buff=0.1)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.noms[k]))
                                for k in range(4)], lag_ratio=0.2), run_time=0.7)
        dep = self.phrase([("La suite commence à", "la suite commence"), ("u₀ =", "u indice 0", TERME),
                           ("10 000", "10 000")], 36, buff=0.2)
        dep.move_to(P(0, 0.15))
        self.montrer_liste(dep)
        self.play(FadeIn(lg.cases[0][1], scale=1.4), Indicate(lg.noms[0], color=TERME, scale_factor=1.4),
                  run_time=0.4)
        aug = self.phrase([("Augmenter de", "Augmenter", RAISON), ("20 %,", "20 %", RAISON), ("c'est multiplier par", "multiplier"),
                           ("1,2", "1,2", RAISON)], 36, buff=0.2)
        aug.move_to(P(0, -0.5))
        self.montrer_liste(aug)
        sauts = [lg.saut(k, "× 1,2", cote=DOWN, fs=30, creux=0.22) for k in range(3)]
        for k, s_ in enumerate(sauts):
            s_[1]._pas_audit = True                       # « 1,2 » vient d'être dit
            lg.sauts[k] = s_
        self.play(LaggedStart(*[AnimationGroup(Create(s_[0]), FadeIn(s_[1], scale=1.3)) for s_ in sauts],
                              lag_ratio=0.3), Indicate(aug[3], color=RAISON, scale_factor=1.3), run_time=0.7)
        f = self.calcul([("uₙ₊₁", TERME, "u indice n plus 1"), ("=", WHITE, "égale"), ("1,2", RAISON, "1,2"),
                         ("×", WHITE, "fois"), ("uₙ", TERME, "u indice n")], -1.55, fs=56, buff=0.6)
        cadre = self.encadre(f, JAUNE_TITRE, 0.2)
        self.play(Create(cadre), run_time=0.35)
        noms = [("terme suivant", WHITE, "Le terme suivant", f[0]), ("la raison", RAISON, "la raison", f[2]),
                ("terme actuel", WHITE, "terme actuel", f[4])]
        for texte, c, ex, cible in noms:
            self.au_mot(ex)
            e = self.t(texte, 28, c).move_to(P(cible.get_center()[0], cadre.get_bottom()[1] - 0.6))
            fl = Arrow(e.get_top(), P(cible.get_center()[0], cadre.get_bottom()[1]), buff=0.05, color=c,
                       stroke_width=3, tip_length=0.12, max_tip_length_to_length_ratio=0.5)
            anims = [FadeIn(e, shift=UP * 0.1), GrowArrow(fl)]
            if ex == "Le terme suivant":
                anims.append(Indicate(lg.cases[1][0], color=TERME, scale_factor=1.12))
            elif ex == "terme actuel":
                anims.append(Indicate(lg.cases[0][0], color=TERME, scale_factor=1.12))
            else:
                anims += [Indicate(s[1], color=RAISON, scale_factor=1.3) for s in lg.sauts.values()]
            self.play(*anims, run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 03 : question-pause n° 1 : la ville → A ────────────────────────────

    def ecran_question1(self):
        l1 = self.phrase([("Une ville perd", "Une ville"), ("2 % de ses habitants", "2 %", RAISON),
                          ("chaque année.", "chaque année")], 36)
        l2 = self.phrase([("vₙ :", "v indice n", TERME), ("sa population après n années.", "sa population")], 36)
        l3 = self.t("Quelle relation traduit cette situation ?", 36)
        choix = [Text(c, font_size=38) for c in ("vₙ₊₁ = 0,98 × vₙ", "vₙ₊₁ = vₙ − 2", "vₙ₊₁ = 0,02 × vₙ")]
        q = self.poser_question("03-question", [(l1, None), (l2, None), (l3, "Quelle relation")], choix, 0,
                                largeur=6.4, fs=38)
        self.dire("03b-reponse")
        self.q_reponse(q, 0)
        y = q.cartes[1].get_top()[1] - 0.25
        gens = VGroup(personnes(25, -4.9, 3.5, y), personnes(25, -4.9, 3.5, y - 0.32))
        self.au_mot("Perdre")
        self.play(FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), FadeIn(gens), run_time=0.3)
        parti = gens[1][-1]
        perdre = self.t("perdre 2 %", 32, PIEGE).move_to(P(5.0, y - 0.16))
        self.suivre("2 %")
        self.play(parti.animate.set_color(PIEGE).scale(1.3), FadeIn(perdre, shift=LEFT * 0.1), run_time=0.3)
        self.play(parti.animate.shift(DOWN * 0.6).set_opacity(0), run_time=0.5)
        self.au_mot("garder")
        garder = self.t("garder 98 %", 32, TERME).next_to(gens, DOWN, buff=0.3)
        self.suivre("98 %")
        self.play(FadeIn(garder, shift=UP * 0.1), Indicate(VGroup(gens[0], gens[1][:-1]), color=TERME,
                                                           scale_factor=1.03), run_time=0.45)
        self.au_mot("on multiplie")
        mult = self.t("on multiplie par", 36)
        coef = self.t("0,98", 40, JUSTE)
        VGroup(mult, coef).arrange(RIGHT, buff=0.32).next_to(garder, DOWN, buff=0.3)
        self.play(FadeIn(mult, shift=UP * 0.1), run_time=0.25)
        self.suivre("0,98")
        cad = self.encadre(coef, JUSTE, 0.1)
        self.play(FadeIn(coef, scale=1.3), Create(cad), run_time=0.3)
        self.insister(VGroup(coef, cad), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 04 : on déroule, pas à pas ─────────────────────────────────────────

    C_ESS4, R_ESS4 = (4.7, 1.55), 0.95

    def ecran_derouler(self):
        self.nouvel_ecran("04-derouler")
        self.titre("On déroule, pas à pas", JAUNE_TITRE, 44, extrait="Déroulons", y=3.2)
        rch = ruche(0.8).move_to(P(4.7, -0.35))
        ab = essaim(10, self.C_ESS4, self.R_ESS4, s=0.8, total=17)
        self.au_mot("Manon")
        self.play(FadeIn(rch), LaggedStart(*[FadeIn(a) for a in ab], lag_ratio=0.05), run_time=0.6)
        vals = [fr(v) for v in MANON]
        lg = LigneTermes(vals, xs=(-5.35, -3.15, -0.95, 1.25), centre=P(0, 1.75), largeur=1.95, hauteur=0.8,
                         fs=31, noms=[u(k) for k in range(4)], fs_noms=30)
        for k in range(4):
            lg.noms[k].next_to(lg.cases[k][0], UP, buff=0.12)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.noms[k]))
                                for k in range(4)], lag_ratio=0.2), run_time=0.6)
        bornes = [10, 12, 14, 17]                         # l'essaim dessiné grandit de 20 % (arrondi)
        orange = None
        ts = []
        for k in range(1, 4):
            y = 0.05 - 0.75 * (k - 1)
            ts = [self.t(f"{u(k)} =", 38, TERME), self.t("1,2", 38, RAISON), self.t("×", 38), self.t(vals[k - 1], 38),
                  self.t("=", 38), self.t(vals[k], 38, JUSTE)]
            VGroup(*ts).arrange(RIGHT, buff=0.3).move_to(P(0, y)).align_to(P(-6.3, 0), LEFT)
            self.suivre(f"u indice {k}")
            self.play(FadeIn(ts[0], shift=UP * 0.1), run_time=0.2)
            self.suivre("1,2")
            s_ = lg.saut(k - 1, "× 1,2", fs=28, creux=0.26)
            s_[1]._pas_audit = True
            lg.sauts[k - 1] = s_
            self.play(FadeIn(ts[1], shift=UP * 0.1), Create(s_[0]), FadeIn(s_[1], scale=1.3), run_time=0.3)
            self.suivre(vals[k - 1])
            anims = [FadeIn(ts[2]), FadeIn(ts[3], shift=UP * 0.1)]
            if k == 1:
                anims.append(FadeIn(lg.cases[0][1], scale=1.4))
            self.play(*anims, Indicate(lg.cases[k - 1][0], color=TERME, scale_factor=1.1), run_time=0.3)
            self.suivre(vals[k])
            neuves = essaim(bornes[k], self.C_ESS4, self.R_ESS4, s=0.8, debut=bornes[k - 1], couleur=RAISON,
                            total=17)
            anims = [FadeIn(ts[4]), FadeIn(ts[5], scale=1.3), FadeIn(lg.cases[k][1], scale=1.4),
                     LaggedStart(*[FadeIn(a, scale=1.8) for a in neuves], lag_ratio=0.1)]
            if orange is not None:
                anims += [a[1].animate.set_fill(MIEL) for a in orange]
            self.play(*anims, run_time=0.45)
            orange = neuves
        fin = self.t("abeilles", 38, JUSTE).next_to(ts[5], RIGHT, buff=0.2)
        self.au_mot("abeilles")
        cad = self.encadre(VGroup(ts[5], fin), JUSTE, 0.08)
        self.play(FadeIn(fin, shift=LEFT * 0.1), Create(cad), *self.allumer_cases(lg, (3,)), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 05 : remonter le temps : on divise par la raison ───────────────────

    XS5 = (-3.8, 0.0, 3.8)

    def ecran_precedent(self):
        self.nouvel_ecran("05-precedent")
        self.titre("Remonter le temps", JAUNE_TITRE, 46, extrait="remonter", y=3.2)
        inv = self.phrase([("On fait l'opération inverse :", "opération inverse"),
                           ("on divise par la raison.", "on divise", RAISON)], 36)
        inv.move_to(P(0, 2.45))
        self.montrer_liste(inv)
        don = self.phrase([("wₙ₊₁ = 2 × wₙ", "2 fois", TERME), ("et", "et w indice 6"), ("w₆ = 320", "320", TERME)],
                          38, buff=0.3)
        don.move_to(P(0, 1.65))
        lg = LigneTermes(["", "", "320"], xs=self.XS5, centre=P(0, 0.2), largeur=2.0, hauteur=0.85, fs=40,
                         noms=[u(k, "w") for k in (4, 5, 6)], fs_noms=32)
        for k in range(3):
            lg.noms[k].next_to(lg.cases[k][0], UP, buff=0.12)
        self.au_mot("Si une suite")
        self.play(*[FadeIn(lg.cases[k][0], scale=0.8) for k in range(3)], FadeIn(lg.noms), run_time=0.4)
        self.suivre("2 fois")
        self.play(FadeIn(don[0], shift=UP * 0.1), run_time=0.3)
        self.suivre("320")
        self.play(FadeIn(don[1]), FadeIn(don[2], shift=UP * 0.1), FadeIn(lg.cases[2][1], scale=1.4), run_time=0.35)
        retours = []
        for i in (2, 1):
            a = lg.cases[i][0].get_bottom() + DOWN * 0.1
            b = lg.cases[i - 1][0].get_bottom() + DOWN * 0.1
            retours.append(arc_fleche(a, b, DOWN, creux=0.4))
        lab1 = self.t("÷ 2", 34, RAISON).next_to(retours[0], DOWN, buff=0.06)
        lab2 = self.t("÷ 2", 34, RAISON, audit=False).next_to(retours[1], DOWN, buff=0.06)
        l1 = [self.t("w₅ =", 40, TERME), self.t("320", 40), self.t("÷ 2", 40, RAISON), self.t("=", 40),
              self.t("160", 40, JUSTE)]
        g1 = VGroup(*l1).arrange(RIGHT, buff=0.28).move_to(P(-1.5, -1.95))
        self.au_mot("alors")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("320", n=2)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("divisé par")
        self.suivre("2")
        self.lancer(retours[0], RAISON, 0.45, extra=[FadeIn(lab1, scale=1.3), FadeIn(l1[2], shift=UP * 0.1)])
        self.au_mot("160")
        v5 = self.t("160", 40).move_to(lg.cases[1][0])
        self.play(FadeIn(l1[3]), FadeIn(l1[4], scale=1.3), FadeIn(v5, scale=1.4), run_time=0.35)
        l2 = [self.t("w₄ =", 40, TERME), self.t("160", 40, audit=False), self.t("÷ 2", 40, RAISON, audit=False),
              self.t("=", 40),
              self.t("80", 40, JUSTE)]
        VGroup(*l2).arrange(RIGHT, buff=0.28).next_to(g1, DOWN, buff=0.3).align_to(g1, LEFT)
        self.au_mot("w indice 4")
        self.lancer(retours[1], RAISON, 0.45, extra=[FadeIn(lab2, scale=1.3), FadeIn(VGroup(*l2[:3]), shift=UP * 0.1)])
        self.au_mot("80")
        v4 = self.t("80", 40).move_to(lg.cases[0][0])
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.3), FadeIn(v4, scale=1.4), run_time=0.35)
        self.insister(l2[4], 1.25)
        self.attendre_voix(marge=0.6)

    # ── 06 : le piège : ajouter au lieu de multiplier ──────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 46, extrait="piège", y=3.2)
        f = VGroup(self.t("uₙ₊₁ =", 48, WHITE), self.t("uₙ", 48, WHITE), self.t("+ 20", 48, PIEGE))
        f.arrange(RIGHT, buff=0.22).move_to(P(-0.6, 2.25))
        for m, ex in zip(f, ("u indice n plus 1 égale", "u indice n plus", "20")):
            self.suivre(ex)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=0.25)
        # la formule : un seul trait (elle reste lisible) ; la croix À CÔTÉ, pas dessus
        trait = Line(f.get_left() + LEFT * 0.12, f.get_right() + RIGHT * 0.12, stroke_color=PIEGE, stroke_width=4)
        croix = self.barrer(Square(0.5).next_to(f, RIGHT, buff=0.6), buff=0)
        # deux cartes : 20 abeilles de plus / 20 % de plus
        cg, cd = self.carte(5.4, 2.6, P(-3.25, 0.25), PIEGE), self.carte(5.4, 2.6, P(3.25, 0.25), JUSTE)
        cen_g, cen_d = P(-3.25, 0.05), P(3.25, 0.05)
        eg = essaim(10, cen_g, 0.85, s=0.8, total=12)
        ed = essaim(10, cen_d, 0.85, s=0.8, total=12)
        tg = self.t("20 abeilles de plus", 32, PIEGE).move_to(P(-3.25, 1.05))
        td = self.t("20 % de plus", 32, JUSTE).move_to(P(3.25, 1.05))
        self.au_mot("voudrait dire")
        self.play(Create(trait), Create(croix), FadeIn(cg), FadeIn(eg), run_time=0.45)
        self.au_mot("20 abeilles")
        mini = abeille(0.5, RAISON).move_to(P(-1.75, -0.65))
        mini = VGroup(mini, Circle(radius=0.2, stroke_color=RAISON, stroke_width=3).move_to(mini))
        self.play(FadeIn(tg, shift=DOWN * 0.1), FadeIn(mini, scale=2), run_time=0.35)
        self.play(Indicate(mini, color=RAISON, scale_factor=1.8), run_time=0.5)
        self.au_mot("20 %")
        neuves = essaim(12, cen_d, 0.85, s=0.8, debut=10, couleur=RAISON)
        self.play(FadeIn(cd), FadeIn(ed), FadeIn(td, shift=DOWN * 0.1), run_time=0.35)
        self.play(*[FadeIn(a, scale=1.8) for a in neuves], run_time=0.35)
        self.play(*[Flash(a, color=RAISON, line_length=0.1, num_lines=8) for a in neuves], run_time=0.4)
        self.au_mot("Un pourcentage fixe")
        l1 = self.t("Un pourcentage fixe, on ne l'ajoute pas :", 34).move_to(P(-0.4, -1.65))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("MULTIPLIE")
        l2 = self.t("on MULTIPLIE par le coefficient.", 38, JUSTE).move_to(P(-0.4, -2.45))
        cad = self.encadre(l2, JUSTE, 0.14)
        self.play(FadeIn(l2, scale=1.15), Create(cad), run_time=0.4)
        self.insister(VGroup(l2, cad), 1.06)
        self.attendre_voix(marge=0.6)

    # ── 07 : question-pause n° 2 : reculer d'un rang → C ───────────────────

    def ecran_question2(self):
        l1 = self.phrase([("Une suite vérifie", "Une suite vérifie"), ("tₙ₊₁ = 3 × tₙ", "3 fois", TERME)], 38)
        l2 = self.phrase([("et", "et t"), ("t₄ = 162.", "162", TERME)], 38)
        l3 = self.t("Combien vaut t₃ ?", 38)
        q = self.poser_question("07-question", [(l1, None), (l2, None), (l3, "Combien")], ["486", "159", "54"], 2,
                                en_ligne=True, largeur=3.2, fs=38)
        self.dire("07b-reponse")
        self.q_reponse(q, 2)
        y = q.cartes.get_bottom()[1] - 0.8
        self.au_mot("reculer")
        lg = LigneTermes(["", ""], xs=(-3.6, -0.4), centre=P(0, y), largeur=1.5, hauteur=0.75, fs=36)
        for k, nom in enumerate(("t₃", "t₄")):
            lg.cases[k][1].become(self.t(nom, 36, TERME).move_to(lg.cases[k][0]))
        self.play(FadeIn(lg.cases[0]), FadeIn(lg.cases[1]), run_time=0.3)
        retour = arc_fleche(lg.cases[1][0].get_bottom() + DOWN * 0.08, lg.cases[0][0].get_bottom() + DOWN * 0.08,
                            DOWN, couleur=JUSTE, creux=0.3)
        self.au_mot("on divise par")
        self.suivre("3")
        lab = self.t("÷ 3", 36, JUSTE).next_to(retour, DOWN, buff=0.05)
        self.lancer(retour, JUSTE, 0.5, extra=[FadeIn(lab, scale=1.3)])
        calc = VGroup(self.t("t₃ =", 42, TERME), self.t("162", 42), self.t("÷ 3", 42, JUSTE), self.t("=", 42),
                      self.t("54", 42, JUSTE)).arrange(RIGHT, buff=0.32).move_to(P(-1.0, -3.0))
        self.au_mot("162 divisé")
        self.play(FadeIn(calc[:2], shift=UP * 0.1), run_time=0.25)
        self.suivre("3")
        self.play(FadeIn(calc[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("54")
        cad = self.encadre(calc[4], JUSTE, 0.1)
        self.play(FadeIn(calc[3:], scale=1.3), Create(cad), run_time=0.35)
        self.insister(VGroup(calc[4], cad), 1.2)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : la balle qui rebondit ───────────────────────────────

    SOL, HAUT, R_B = -1.55, 3.3, 0.16                  # le sol, 160 cm à l'écran, le rayon de la balle
    REBONDS = [(-5.0, -3.6), (-3.6, -2.4), (-2.4, -1.4)]
    XS8 = (0.75, 2.3, 3.85, 5.4)

    def sommet(self, k):
        """Le sommet du rebond k (1, 2, 3) : 75 % de la hauteur précédente."""
        a, b = self.REBONDS[k - 1]
        return P((a + b) / 2, self.SOL + self.HAUT * 0.75 ** k + self.R_B)

    def trajet(self, k):
        """Le chemin du centre de la balle : la chute (k = 0), puis le rebond k."""
        y0 = self.SOL + self.R_B
        if k == 0:
            return Line(P(-5.0, y0 + self.HAUT), P(-5.0, y0))
        a, b = self.REBONDS[k - 1]
        h = self.HAUT * 0.75 ** k
        return ParametricFunction(lambda s: P(a + (b - a) * s, y0 + 4 * h * s * (1 - s)), t_range=(0, 1))

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.15)
        sol = Line(P(-6.3, self.SOL), P(-0.9, self.SOL), stroke_color=GREY_B, stroke_width=4)
        balle = Circle(radius=self.R_B, fill_color=RAISON, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        balle.move_to(self.trajet(0).get_start())
        self.au_mot("balle")
        self.play(Create(sol), GrowFromCenter(balle), run_time=0.4)
        mes = DoubleArrow(P(-5.75, self.SOL), P(-5.75, self.SOL + self.HAUT), buff=0, color=GREY_A, stroke_width=3,
                          tip_length=0.14, max_tip_length_to_length_ratio=0.1)
        cm = self.t("160 cm", 32, WHITE).move_to(P(-5.45, self.SOL + self.HAUT + 0.38))
        self.au_mot("160")
        self.play(GrowFromCenter(mes), FadeIn(cm, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("rebond")
        traces = VGroup()
        for k in range(4):
            if k == 2:
                self.au_mot("75 %")
                pc = self.t("remonte à 75 %", 30, RAISON).move_to(P(-2.4, 2.15))
                self.play(FadeIn(pc, shift=DOWN * 0.1), Indicate(traces[1], color=RAISON, scale_factor=1.04),
                          run_time=0.4)
            tr = self.trajet(k)
            pointille = DashedVMobject(tr.copy().set_stroke(GREY_B, 2), num_dashes=8 if k == 0 else 14)
            self.play(MoveAlongPath(balle, tr), Create(pointille), run_time=0.4,
                      rate_func=rate_functions.ease_in_quad if k == 0 else linear)
            traces.add(pointille)
        self.au_mot("On note")
        hn = self.paragraphe([("hₙ : la hauteur", TERME), ("après n rebonds", TERME)], 32, buff=0.1, y=2.3)
        hn.move_to(P(3.1, 2.3))
        lg = LigneTermes(["160", "?", "?", "?"], xs=self.XS8, centre=P(0, 1.0), largeur=1.25, hauteur=0.75, fs=36,
                         noms=[u(k, "h") for k in range(4)], fs_noms=30)
        for k in range(4):
            lg.noms[k].next_to(lg.cases[k][0], UP, buff=0.1)
        self.play(FadeIn(hn, shift=DOWN * 0.1), *[FadeIn(lg.cases[k][0], scale=0.8) for k in range(4)],
                  FadeIn(lg.noms), run_time=0.45)
        self.au_mot("160", n=2)
        self.play(FadeIn(lg.cases[0][1], scale=1.4), Indicate(lg.noms[0], color=TERME, scale_factor=1.3),
                  run_time=0.4)
        self.au_mot("Écris")
        e1 = self.paragraphe(["Écris la relation", "de récurrence,"], 32, buff=0.1, y=-0.4).move_to(P(3.1, -0.4))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("calcule")
        e2 = self.t("puis calcule h₃.", 36, RAISON).move_to(P(3.1, -1.25))
        self.play(FadeIn(e2, shift=UP * 0.1), *[FadeIn(lg.cases[k][1], scale=1.3) for k in (1, 2, 3)],
                  run_time=0.35)
        self.defi_pause(-2.6, x=-0.6)
        self._defi = (tit, lg, VGroup(e1, e2), balle)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, lg, consignes, balle = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), FadeOut(consignes), run_time=0.4)
        self.au_mot("multiplier par")
        self.suivre("0,75")
        sauts = [lg.saut(k, "× 0,75", fs=26, creux=0.22) for k in range(3)]
        for k, s_ in enumerate(sauts):
            lg.sauts[k] = s_
        self.play(LaggedStart(*[AnimationGroup(Create(s_[0]), FadeIn(s_[1], scale=1.3)) for s_ in sauts],
                              lag_ratio=0.3), run_time=0.6)
        f = self.calcul([("hₙ₊₁", TERME, "h indice n plus 1"), ("=", WHITE, "égale"), ("0,75", RAISON, "0,75"),
                         ("×", WHITE, "fois"), ("hₙ", TERME, "h indice n")], -0.7, x=1.4, fs=44, buff=0.25)
        cad = self.encadre(f, JAUNE_TITRE, 0.16)
        self.play(Create(cad), run_time=0.3)
        for k, v in zip((1, 2, 3), DEFI[1:]):
            self.au_mot(f"h indice {k} égale")
            self.suivre(fr(v))
            neuf = self.t(fr(v), 36, WHITE).move_to(lg.cases[k][0])
            haut = self.t(fr(v), 28, JUSTE, audit=False).next_to(self.sommet(k), UP, buff=0.12)
            self.play(ReplacementTransform(lg.cases[k][1], neuf), FadeIn(haut, scale=1.3),
                      Flash(self.sommet(k), color=JUSTE, line_length=0.12, num_lines=8), run_time=0.4)
            lg.cases[k].submobjects[1] = neuf
        rr = VGroup(self.t("h₃ =", 44, JUSTE), self.t("67,5 cm", 44, JUSTE, audit=False)).arrange(RIGHT, buff=0.2)
        rr.move_to(P(3.1, -1.85))
        self.au_mot("centimètres")
        c2 = self.encadre(rr, JUSTE, 0.16)
        self.play(FadeIn(rr, scale=1.3), Create(c2), *self.allumer_cases(lg, (3,)), run_time=0.4)
        self.insister(VGroup(rr, c2), 1.12)
        self.attendre_voix(marge=0.6)
        del balle

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 38
        p1 = [self.t("La relation de récurrence", fs, JAUNE_TITRE),
              self.t("d'une suite géométrique :", fs, JAUNE_TITRE),
              VGroup(self.t("uₙ₊₁", fs + 4, TERME), self.t("=", fs + 4), self.t("q", fs + 4, RAISON),
                     self.t("×", fs + 4), self.t("uₙ", fs + 4, TERME)).arrange(RIGHT, buff=0.32)]
        p2 = [VGroup(self.t("Avancer d'un rang :", fs), self.t("on multiplie par la raison", fs, RAISON))
              .arrange(RIGHT, buff=0.2),
              VGroup(self.t("Reculer d'un rang :", fs), self.t("on divise par la raison", fs, RAISON))
              .arrange(RIGHT, buff=0.2)]
        p3 = [self.t("Un pourcentage se traduit", fs), self.t("par un coefficient multiplicateur.", fs)]
        self.finale([(p1, ["La relation", "géométrique", "u indice n plus 1"]), (p2, ["avancer", "reculer"]),
                     (p3, ["pourcentage", "coefficient"])], cle="09-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_relation()
        self.ecran_question1()
        self.ecran_derouler()
        self.ecran_precedent()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
