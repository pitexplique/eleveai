# volume_comparer.py
# EleveAI — Maths 6e — série « Volume et solides », épisode V3 : COMPARER DES VOLUMES
# (micro volume_comparer), notion volume_solide.
# Paysage 16:9, CEINTURE JAUNE, avec voix (manim/voix/6e-volume-comparer.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (tour de 10 contre bloc 3 × 2 × 2 : réponse B).
# Métier : Léna, INGÉNIEURE DE L'EAU (cuves d'eau de pluie, ⭐ la seule mention de La Réunion des 18 voix) ;
# centres : nature-ecologie, sciences.
# Mapping micro → écrans : volume_comparer → 02 (compter : 14 > 12), 03 (la plus haute n'est pas la plus grande :
# 20 contre 24), 04 (même volume, autre forme : 12 et 3 × 2 × 2), 06 (piège : ni à l'œil ni à la hauteur, cubes de
# même taille) ; questions 05 (E 2 × 6 et F 4 × 3 : même volume, rép. A) et 07 (carton 5 × 2 × 2 = 20, boîte
# 3 × 3 × 3 = 27, rép. C) ; défi 08 (cuves 24, 25, 20 : cuve 3, cuve 1, cuve 2).
# Audit : bash <notes>/outils/dry.sh volume_comparer VolumeComparer6e
# HD : bash <notes>/outils/hd.sh volume_comparer VolumeComparer6e eleveai-maths-6e-volume-comparer manim/sorties/6e/maths/volume/03-comparer
# Sortie : manim/sorties/6e/maths/volume/03-comparer/eleveai-maths-6e-volume-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

EAU = "#0ea5e9"
HAUT_C = "#facc15"      # une couche sur deux en jaune : on voit les couches
K_FUITE = 0.5 * np.cos(PI / 4)


def couche(emp, y):
    """Les cubes de l'étage y d'un Empilement (dans l'ordre de dessin)."""
    return VGroup(*[c for q, c in emp.cubes.items() if q[1] == y])


def sur_sol(L, H, Pr, e, x, sol, couleur=VOL_C, rayer=True):
    """Un pavé L × H × Pr de cubes, centré en x, posé sur la ligne y = sol (couches alternées si rayer)."""
    pos = pave_cubes(L, H, Pr)
    haut = (H + Pr * K_FUITE) * e
    coul = {q: HAUT_C for q in pos if q[1] % 2 == 1} if rayer else None
    return Empilement(pos, e=e, centre=P(x, sol + haut / 2), couleur=couleur, couleurs=coul)


def oeil(r=0.35):
    """Un œil (pour « à l'œil »)."""
    blanc = Ellipse(width=2.2 * r, height=1.2 * r, fill_color=WHITE, fill_opacity=1, stroke_color="#0f172a",
                    stroke_width=3)
    iris = Circle(radius=0.42 * r, fill_color="#0ea5e9", fill_opacity=1, stroke_width=0)
    pup = Circle(radius=0.2 * r, fill_color="#0f172a", fill_opacity=1, stroke_width=0)
    return VGroup(blanc, iris, pup)


def maison_cuve(centre=ORIGIN):
    """Une case créole avec sa gouttière et sa cuve d'eau de pluie."""
    murs = Rectangle(width=2.4, height=1.6, fill_color="#fde68a", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    toit = Polygon(P(-1.5, 0.8), P(1.5, 0.8), P(0, 1.85), fill_color="#b91c1c", fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2)
    porte = Rectangle(width=0.5, height=0.9, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P(-0.4, -0.35))
    fen = Square(side_length=0.5, fill_color="#bae6fd", fill_opacity=1, stroke_color=WHITE, stroke_width=2) \
        .move_to(P(0.55, 0.15))
    gout = VGroup(Line(P(1.5, 0.8), P(1.85, 0.8), color="#9ca3af", stroke_width=6),
                  Line(P(1.85, 0.8), P(1.85, -0.1), color="#9ca3af", stroke_width=6))
    cuve = RoundedRectangle(width=0.9, height=1.1, corner_radius=0.15, fill_color="#334155", fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2).move_to(P(2.1, -0.25))
    eau = Rectangle(width=0.8, height=0.05, fill_color=EAU, fill_opacity=1, stroke_width=0) \
        .move_to(cuve.get_bottom() + UP * 0.08)
    g = VGroup(murs, toit, porte, fen, gout, cuve, eau).move_to(centre)
    g.cuve, g.eau = cuve, eau
    return g


class VolumeComparerBase(PaysageVolume6e):
    nom_voix = "6e-volume-comparer"
    fichier_marques = "volume_comparer_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des volumes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des volumes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Le solide le plus haut")
        q = self.bloc(["Le solide le plus haut", "a-t-il toujours", "le plus grand volume ?"], 36, JAUNE_TITRE)
        gauche(q, -6.2, 0.6)
        tour = sur_sol(1, 4, 1, 0.45, 3.2, -0.4)
        bloc = sur_sol(3, 1, 2, 0.45, 5.0, -0.4)
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(tour, shift=UP * 0.2), FadeIn(bloc, shift=UP * 0.2),
                  run_time=0.7)
        self.play(Indicate(tour, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lp = lena(1.0).move_to(P(-5.2, 0.7))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 40, BLEU_CALCUL).next_to(lp, UP, buff=0.2)
        self.play(FadeIn(lp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est ingénieure de l'eau")
        met = self.bloc(["ingénieure", "de l'eau"], 26, BLEU_CALCUL).next_to(lp, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        mc = maison_cuve(P(0.9, 1.3))
        self.au_mot("À La Réunion")
        l1 = self.t("À La Réunion, l'eau de pluie va dans une cuve.", 30)
        gauche(l1, -3.6, -1.0)
        self.play(FadeIn(mc, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        pluie = VGroup(*[Line(P(x, 3.3), P(x - 0.12, 2.95), color="#7dd3fc", stroke_width=3)
                         for x in np.arange(-1.0, 3.6, 0.45)])
        self.au_mot("gardent l'eau de pluie")
        self.play(FadeIn(pluie), run_time=0.25)
        self.play(pluie.animate.shift(DOWN * 0.35), mc.eau.animate.stretch_to_fit_height(0.85)
                  .align_to(mc.cuve.get_bottom() + UP * 0.05, DOWN), run_time=0.9)
        self.au_mot("Léna doit choisir une cuve")
        l2 = self.t("Léna choisit une cuve pour une école.", 30)
        gauche(l2, -3.6, -1.75)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeOut(pluie), run_time=0.4)
        self.au_mot("Laquelle garde le plus d'eau")
        q = self.t("Laquelle garde le plus d'eau ?", 38, JAUNE_TITRE)
        gauche(q, -3.6, -2.6)
        self.play(FadeIn(q, shift=UP * 0.1), Indicate(mc.cuve, color=EAU), run_time=0.5)
        self.attendre_voix()

    # ── 02 : compter les cubes ──────────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        a = sur_sol(7, 2, 1, 0.6, -3.6, -1.0, rayer=False)
        b = sur_sol(3, 4, 1, 0.6, 2.0, -1.0, rayer=False, couleur="#4ade80")
        sol = Line(P(-6.2, -1.0), P(4.2, -1.0), color="#64748b", stroke_width=4)
        na = self.t("Cuve A", 32, BLEU_CALCUL).next_to(a, UP, buff=0.2)
        nb = self.t("Cuve B", 32, BLEU_CALCUL).next_to(b, UP, buff=0.2)
        self.au_mot("Léna fabrique la maquette")
        l0 = self.t("Une maquette de chaque cuve, en cubes.", 34, JAUNE_TITRE)
        gauche(l0, -6.2, 3.05)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(sol),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in [*a, *b]], lag_ratio=0.04),
                  FadeIn(na), FadeIn(nb), run_time=1.0)
        self.au_mot("Pour comparer deux volumes")
        l1 = self.t("Pour comparer : on compte les cubes.", 34, VERT_OK)
        gauche(l1, -6.2, 2.45)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        nums = VGroup()
        for emp in (a, b):
            for k, q in enumerate(sorted(emp.cubes, key=lambda q: (-q[1], q[0]))):
                n = Text(str(k + 1), font_size=22, color=BLACK, weight=BOLD).move_to(emp.centre_cube(q))
                nums.add(n)
        hors_audit(nums)
        for f in nums.get_family():
            f.sans_synchro = True
        self.au_mot("on compte les cubes")
        self.play(LaggedStart(*[FadeIn(n, scale=1.3) for n in nums], lag_ratio=0.06), run_time=1.1)
        ca = self.t("14 cubes", 34, BLEU_CALCUL).next_to(sol, DOWN, buff=0.25).set_x(a.get_x())
        cb = self.t("12 cubes", 34, BLEU_CALCUL).next_to(sol, DOWN, buff=0.25).set_x(b.get_x())
        self.aux_extraits([ca, cb], ["14 cubes", "12. 14"], run_time=0.3)
        lg = self.ligne([("14 > 12 :", VERT_OK), ("la cuve A a le plus grand volume.", VERT_OK)], 32, buff=0.2)
        gauche(lg, -6.2, -2.3)
        hors_audit(lg[0])
        self.aux_extraits(lg, ["14, c'est plus que", "la cuve A a le plus grand"], run_time=0.3)
        self.play(Indicate(a, color=VERT_OK, scale_factor=1.04), run_time=0.45)
        self.attendre_voix()

    # ── 03 : la plus haute n'est pas la plus grande ─────────────────────────
    def ecran_haut(self):
        self.ecran("03-haut")
        e = 0.45
        c = sur_sol(2, 5, 2, e, -5.1, -1.5)
        d = sur_sol(4, 2, 3, e, -1.95, -1.5)
        sol = Line(P(-6.3, -1.5), P(0.5, -1.5), color="#64748b", stroke_width=4)
        self.au_mot("Mais la cuve la plus haute")
        tit = self.t("La plus haute n'est pas forcément la plus grande.", 32, JAUNE_TITRE)
        gauche(tit, -6.2, 3.1)
        self.play(Write(tit), Create(sol), run_time=0.6)

        def cotes(emp, L, H, Pr, tl, tw, th):
            cl = fleche_cote(emp.pp((0, 0, 0)) + DOWN * 0.2, emp.pp((L, 0, 0)) + DOWN * 0.2, tl, 26, LONG_C, DOWN, 0.06)
            a_, b_ = emp.pp((L, 0, 0)), emp.pp((L, 0, Pr))
            cw = fleche_cote(a_ + P(0.2, -0.1), b_ + P(0.2, -0.1), tw, 26, LONG_C, RIGHT, 0.06)
            ch = fleche_cote(emp.pp((0, 0, 0)) + LEFT * 0.2, emp.pp((0, H, 0)) + LEFT * 0.2, th, 26, LONG_C, LEFT, 0.06)
            return cl, cw, ch

        # la cuve C : 2 × 2 × 5
        nc = self.t("Cuve C", 30, BLEU_CALCUL).next_to(c, UP, buff=0.15)
        self.au_mot("La cuve C")
        self.play(FadeIn(nc), FadeIn(couche(c, 0), shift=DOWN * 0.2), run_time=0.35)
        cl, cw, ch = cotes(c, 2, 5, 2, "2", "2", "5")
        hors_audit(cw)
        self.aux_extraits([cl, cw], ["2 cubes de long", "2 de large"], run_time=0.25)
        self.au_mot("5 de haut")
        self.wait(0.07)
        hauts = [couche(c, y) for y in range(1, 5)]
        self.play(FadeIn(ch), LaggedStart(*[FadeIn(h, shift=DOWN * 0.5) for h in hauts], lag_ratio=0.25),
                  run_time=0.7)
        lc1 = self.ligne([("C :", BLEU_CALCUL), ("2 × 2", WHITE), ("= 4 par couche", WHITE)], 32, buff=0.18)
        self.col(lc1, 2.2)
        hors_audit(lc1[1])
        self.add(lc1[0])
        self.aux_extraits(lc1[1:], ["2 fois 2", "4 par couche"])
        lc2 = self.ligne([("5 couches :", WHITE), ("20 cubes", BLEU_CALCUL)], 32, buff=0.18)
        self.col(lc2, 1.6)
        hors_audit(lc2[0])
        self.aux_extraits(lc2, ["5 couches", "20 cubes"])
        # la cuve D : 4 × 3 × 2
        nd = self.t("Cuve D", 30, BLEU_CALCUL).next_to(d, UP, buff=0.15)
        bl = self.t("basse et large", 26, "#cbd5e1").move_to(P(d.get_x(), -2.45))
        self.au_mot("La cuve D")
        self.play(FadeIn(nd), FadeIn(couche(d, 0), shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("basse et large")
        self.play(FadeIn(bl), run_time=0.25)
        dl, dw, dh = cotes(d, 4, 2, 3, "4", "3", "2")
        hors_audit(dl)
        hors_audit(dh)
        self.aux_extraits([dl, dw], ["4 de long", "3 de large"], run_time=0.25)
        self.au_mot("2 de haut")
        self.wait(0.07)
        self.play(FadeIn(dh), FadeIn(couche(d, 1), shift=DOWN * 0.5), run_time=0.4)
        ld1 = self.ligne([("D :", BLEU_CALCUL), ("4 × 3", WHITE), ("= 12 par couche", WHITE)], 32, buff=0.18)
        self.col(ld1, 0.65)
        hors_audit(ld1[1])
        self.add(ld1[0])
        self.aux_extraits(ld1[1:], ["4 fois 3", "12 par couche"])
        ld2 = self.ligne([("2 couches :", WHITE), ("24 cubes", BLEU_CALCUL)], 32, buff=0.18)
        self.col(ld2, 0.05)
        hors_audit(ld2[0])
        self.aux_extraits(ld2, ["2 couches", "24 cubes"])
        self.au_mot("La basse gagne")
        g = self.gros("La basse gagne !", couleur=VERT_OK, fs=38)
        self.col(g, -1.0)
        self.play(FadeIn(g, scale=1.2), Indicate(d, color=VERT_OK, scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 04 : même volume, autre forme ───────────────────────────────────────
    def ecran_meme(self):
        self.ecran("04-meme")
        self.au_mot("Et deux formes différentes")
        tit = self.t("Deux formes peuvent avoir le même volume.", 36, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.5)
        barre = Empilement(pave_cubes(12, 1, 1), e=0.45, centre=P(-1.6, 1.6))
        lb = self.ligne([("Une barre :", WHITE), ("12 cubes", BLEU_CALCUL)], 34, buff=0.2)
        lb.next_to(barre, RIGHT, buff=0.35)
        self.au_mot("Une barre de 12 cubes")
        self.play(LaggedStart(*[FadeIn(c, shift=RIGHT * 0.2) for c in barre], lag_ratio=0.06), FadeIn(lb[0]),
                  run_time=0.6)
        self.aux_extraits([lb[1]], ["12 cubes"])
        bloc = Empilement(pave_cubes(3, 2, 2), e=0.6, centre=P(-4.4, -0.55))
        lk = self.ligne([("Un bloc :", WHITE), ("3 × 2 × 2", WHITE), ("= 12 cubes aussi", BLEU_CALCUL)], 34, buff=0.2)
        gauche(lk, -2.8, -0.55)
        hors_audit(lk[2])
        copie = barre.copy()
        self.au_mot("et un bloc")
        self.play(FadeIn(lk[0], shift=UP * 0.08),
                  LaggedStart(*[Transform(copie[k], bloc[k]) for k in range(12)], lag_ratio=0.05), run_time=0.45)
        self.aux_extraits(lk[1:], ["3 sur 2 sur 2", "12 cubes aussi"])
        self.au_mot("Même volume")
        g = self.gros("Même volume, autre forme !", couleur=VERT_OK, fs=38)
        g.move_to(P(-1.0, -2.35))
        self.play(FadeIn(g, scale=1.2), Indicate(barre, color=VERT_OK, scale_factor=1.03),
                  Indicate(copie, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        e_, f_ = sur_sol(3, 2, 2, 0.5, -4.9, 0.25), sur_sol(3, 4, 1, 0.5, -2.2, 0.25)
        sol = Line(P(-6.2, 0.25), P(-0.9, 0.25), color="#64748b", stroke_width=4)
        ne = self.t("E", 34, BLEU_CALCUL).next_to(sol, DOWN, buff=0.15).set_x(e_.get_x())
        nf = self.t("F", 34, BLEU_CALCUL).next_to(sol, DOWN, buff=0.15).set_x(f_.get_x())

        def avant(sc):
            sc.play(Create(sol), FadeIn(e_, shift=UP * 0.2), FadeIn(ne), run_time=0.4)
            sc.play(FadeIn(f_, shift=UP * 0.2), FadeIn(nf), run_time=0.3)

        def apres(sc):
            kw = dict(fs=30, y0=-1.25, pas=0.55)
            l1 = sc.rep_bas(0, [("E :", VERT_OK), ("2 × 6", VERT_OK), ("= 12 cubes.", VERT_OK)], **kw)
            sc.au_mot("E :")
            sc.play(FadeIn(l1[0], shift=UP * 0.08), Indicate(e_, color=VERT_OK, scale_factor=1.05), run_time=0.3)
            sc.aux_extraits(l1[1:], ["2 fois 6", "12 cubes"])
            l2 = sc.rep_bas(1, [("F :", VERT_OK), ("4 × 3", VERT_OK), ("= 12 cubes.", VERT_OK)], **kw)
            hors_audit(l2[2])
            sc.au_mot("F :")
            sc.play(FadeIn(l2[0], shift=UP * 0.08), Indicate(f_, color=VERT_OK, scale_factor=1.05), run_time=0.3)
            sc.aux_extraits(l2[1:], ["4 fois 3", ("12 cubes", 2)])
            l3 = sc.rep_bas(2, [("Même volume !", VERT_OK)], **kw)
            sc.aux_extraits([l3], ["Même volume"])
            l4 = sc.rep_bas(3, [("F est plus haut, mais plus étroit.", ORANGE_RETENUE)], **kw)
            sc.aux_extraits([l4], ["F est plus haut"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["E : 2 couches de 6 cubes.", "F : 4 couches de 3 cubes.", "Lequel a le plus",
                             "grand volume ?"],
                            [self.choix("le même volume"), self.choix("le solide E"),
                             self.choix("le solide F (plus haut)")], 0,
                            ["E : 2 × 6 = 12 cubes.", "F : 4 × 3 = 12 cubes.", "Même volume !",
                             "F est plus haut, mais plus étroit."],
                            mot_q="Le solide E", avant_q=avant, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        oe = oeil(0.32).move_to(P(-5.6, 1.95))
        l1 = self.t("On ne juge pas un volume à l'œil,", 32)
        gauche(l1, -4.9, 1.95)
        self.au_mot("On ne juge pas un volume")
        self.play(FadeIn(oe), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("à l'œil")
        x1 = Cross(oe, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.8)
        self.play(Create(x1), run_time=0.3)
        tour = sur_sol(1, 4, 1, 0.38, 4.0, -0.2)
        fl = DoubleArrow(P(4.75, -0.2), P(4.75, -0.2 + tour.height * 0.92), buff=0, color=LONG_C, stroke_width=4,
                         tip_length=0.15)
        regle = VGroup(Rectangle(width=0.22, height=0.55, fill_color="#fbbf24", fill_opacity=1, stroke_width=0),
                       *[Line(P(-0.11, y), P(0.0, y), color="#0f172a", stroke_width=2)
                         for y in np.arange(-0.2, 0.25, 0.1)]).move_to(P(-5.6, 1.2))
        l2 = self.t("ni à la hauteur.", 32)
        gauche(l2, -4.9, 1.2)
        self.au_mot("ni à la hauteur")
        self.play(FadeIn(regle), FadeIn(l2, shift=UP * 0.1), FadeIn(tour, shift=UP * 0.2), GrowFromCenter(fl),
                  run_time=0.45)
        x2 = VGroup(Cross(regle, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=1.2),
                    Cross(fl, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=0.6))
        self.play(Create(x2), run_time=0.3)
        self.au_mot("On compte les cubes")
        l3 = self.bloc(["On compte les cubes,", "puis on compare les nombres."], 34, VERT_OK)
        gauche(l3, -6.2, 0.0)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("puis on compare")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        gros_c = Empilement(pave_cubes(2, 1, 1), e=0.72, centre=P(-5.2, -2.35))
        petits = Empilement(pave_cubes(2, 1, 1), e=0.34, centre=P(-3.0, -2.55))
        diff = self.t("≠", 56, ROUGE_ERREUR).move_to(P(-3.95, -2.45))
        l4 = self.t("Des cubes de la même taille !", 32, JAUNE_TITRE)
        gauche(l4, -2.2, -2.25)
        self.au_mot("Et on compare des cubes")
        self.play(FadeIn(gros_c), FadeIn(petits), run_time=0.4)
        self.au_mot("de la même taille")
        self.play(FadeIn(diff, scale=1.3), FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        e = 0.42
        carton = sur_sol(5, 2, 2, e, -4.85, 0.55, couleur=CARTON)
        boite = sur_sol(3, 3, 3, e, -1.9, 0.55)
        sol = Line(P(-6.2, 0.55), P(-0.8, 0.55), color="#64748b", stroke_width=4)
        nc = self.t("le carton", 30, BLEU_CALCUL).next_to(sol, DOWN, buff=0.12).set_x(carton.get_x())
        nb = self.t("la boîte", 30, BLEU_CALCUL).next_to(sol, DOWN, buff=0.12).set_x(boite.get_x())
        for f in [*nc.get_family(), *nb.get_family()]:
            f.sans_synchro = True  # « Un carton », « Une boîte » : les noms entrent avec leur dessin

        def avant(sc):
            sc.play(Create(sol), FadeIn(carton, shift=UP * 0.2), FadeIn(nc), FadeIn(boite, shift=UP * 0.2),
                    FadeIn(nb), run_time=0.25)

        def apres(sc):
            kw = dict(fs=30, y0=-0.95, pas=0.52)
            # « 5 fois 2, 10 ; fois 2, 20 » : le 10 de la 2e ligne paraît avec « = 10 », le « × 2 » à son mot
            l1 = sc.rep_bas(0, [("Carton :", VERT_OK), ("5 × 2", VERT_OK), ("= 10", VERT_OK)], **kw)
            l2 = sc.rep_bas(1, [("10", VERT_OK), ("× 2", VERT_OK), ("= 20 cubes.", VERT_OK)], **kw)
            sc.au_mot("Le carton")
            sc.play(FadeIn(l1[0], shift=UP * 0.08), Indicate(carton, color=VERT_OK, scale_factor=1.05), run_time=0.3)
            sc.aux_extraits([l1[1], VGroup(l1[2], l2[0]), l2[1], l2[2]],
                            ["5 fois 2", "10 ;", "2, 20", "20 cubes"])
            l3 = sc.rep_bas(2, [("Boîte :", VERT_OK), ("3 × 3", VERT_OK), ("= 9", VERT_OK)], **kw)
            l4 = sc.rep_bas(3, [("9", VERT_OK), ("× 3", VERT_OK), ("= 27 cubes.", VERT_OK)], **kw)
            sc.au_mot("La boîte")
            sc.play(FadeIn(l3[0], shift=UP * 0.08), Indicate(boite, color=VERT_OK, scale_factor=1.05), run_time=0.3)
            sc.aux_extraits([l3[1], VGroup(l3[2], l4[0]), l4[1], l4[2]],
                            ["3 fois 3", "9 ;", "3, 27", "27 cubes"])
            l5 = sc.rep_bas(4, [("27 > 20 !", JAUNE_TITRE)], **kw)
            hors_audit(l5)
            sc.aux_extraits([l5], ["27, c'est plus que"])
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Carton : 5 × 2 × 2", "Boîte : 3 × 3 × 3", "Lequel a le plus", "grand volume ?"],
                            [self.choix("le carton (plus long)"), self.choix("ils sont égaux"),
                             self.choix("la boîte")], 2,
                            ["Carton : 5 × 2 = 10 ; 10 × 2 = 20 cubes.", "Boîte : 3 × 3 = 9 ; 9 × 3 = 27 cubes.",
                             "27 > 20 !"],
                            mot_q="Un carton fait", avant_q=avant, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    XS_CUVES = (-4.6, -1.3, 2.0)

    def les_cuves(self, e, sol):
        """Les cuves 1 (3 × 2, 4 de haut), 2 (5 × 5, 1 de haut), 3 (2 × 2, 5 de haut)."""
        return [sur_sol(3, 4, 2, e, self.XS_CUVES[0], sol), sur_sol(5, 1, 5, e, self.XS_CUVES[1], sol),
                sur_sol(2, 5, 2, e, self.XS_CUVES[2], sol)]

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        lp = lena(0.75).move_to(P(4.9, 0.6))
        self.au_mot("Léna range trois cuves")
        l0 = self.t("Range les cuves de la plus petite à la plus grande.", 30)
        gauche(l0, -6.2, 2.35)
        self.play(FadeIn(lp, shift=LEFT * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        sol_y = -0.4
        cuves = self.les_cuves(0.38, sol_y)
        sol = Line(P(-6.2, sol_y), P(3.4, sol_y), color="#64748b", stroke_width=4)
        self.add(sol)
        dims = [("Cuve 1", "3 × 2 × 4", "Cuve 1", "3 sur 2 sur 4"), ("Cuve 2", "5 × 5 × 1", "Cuve 2", "5 sur 5 sur 1"),
                ("Cuve 3", "2 × 2 × 5", "Cuve 3", "2 sur 2 sur 5")]
        for k, (nom, dim, mot_n, mot_d) in enumerate(dims):
            n = self.t(nom, 30, BLEU_CALCUL).next_to(sol, DOWN, buff=0.15).set_x(self.XS_CUVES[k])
            d = self.t(dim, 30).next_to(n, DOWN, buff=0.12)
            if k:
                hors_audit(n)
            hors_audit(d)
            for f in [*n.get_family(), *d.get_family()]:
                f.sans_synchro = True
            self.au_mot(mot_n)
            self.wait(0.32)  # le numéro de la cuve, pas avant que la voix le dise
            self.play(FadeIn(n), FadeIn(cuves[k], shift=UP * 0.2), run_time=0.3)
            self.au_mot(mot_d)
            self.wait(0.07)
            self.play(FadeIn(d, shift=UP * 0.08), run_time=0.25)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(-1.2, -2.5))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        sol_y = 0.6
        cuves = self.les_cuves(0.34, sol_y)
        sol = Line(P(-6.2, sol_y), P(3.4, sol_y), color="#64748b", stroke_width=4)
        noms = [self.t(f"Cuve {k + 1}", 28, BLEU_CALCUL).next_to(sol, DOWN, buff=0.12).set_x(self.XS_CUVES[k])
                for k in range(3)]
        for n in noms:
            hors_audit(n)
        self.add(sol, *cuves, *noms)
        # « 3 fois 2, 6 ; fois 4, 24 » : le 6 de la 2e ligne paraît avec « = 6 », le « × 4 » à son mot
        calc = [
            ([("3 × 2", WHITE), ("= 6", WHITE)], [("6", WHITE), ("× 4", WHITE), ("= 24", VERT_OK)],
             ["3 fois 2", "6 ;", "4, 24", "24 cubes"]),
            ([("5 × 5", WHITE), ("= 25", WHITE)], [("25", WHITE), ("× 1", WHITE), ("= 25", VERT_OK)],
             ["5 fois 5", "25 ;", "1, 25", ("25 cubes", 1)]),
            ([("2 × 2", WHITE), ("= 4", WHITE)], [("4", WHITE), ("× 5", WHITE), ("= 20", VERT_OK)],
             ["2 fois 2", "4 ;", "5, 20", "20 cubes"]),
        ]
        groupes = []
        for k, (m1, m2, x) in enumerate(calc):
            a = self.ligne(m1, 30, buff=0.2)
            a.next_to(noms[k], DOWN, buff=0.2).set_x(self.XS_CUVES[k])
            b = self.ligne(m2, 30, buff=0.2)
            b.next_to(a, DOWN, buff=0.15).set_x(self.XS_CUVES[k])
            self.au_mot(f"Cuve {k + 1}")
            self.play(Indicate(cuves[k], color=JAUNE_TITRE, scale_factor=1.05), run_time=0.3)
            self.aux_extraits([a[0], VGroup(a[1], b[0]), b[1], b[2]], x)
            groupes.append(VGroup(cuves[k], noms[k], a, b))
        # le rangement : cuve 3, cuve 1, cuve 2 (les cuves changent de place)
        for g in groupes:
            hors_audit(g)  # déjà audités à leur entrée ; le rangement les déplace seulement
        self.au_mot("De la plus petite à la plus grande")
        ordre = (2, 0, 1)
        self.play(*[groupes[k].animate.set_x(self.XS_CUVES[i]) for i, k in enumerate(ordre)], run_time=0.8)
        rg = self.ligne([("cuve 3", WHITE), ("<", JAUNE_TITRE), ("cuve 1", WHITE), ("<", JAUNE_TITRE),
                         ("cuve 2", VERT_OK)], 34, buff=0.25)
        rg.move_to(P(-1.3, -1.55))
        hors_audit(rg)
        self.aux_extraits([VGroup(rg[0], rg[1]), VGroup(rg[2], rg[3]), rg[4]],
                          ["cuve 3, cuve 1", "cuve 1, cuve 2", "cuve 2. La plus"], run_time=0.25)
        self.au_mot("La plus plate")
        g = self.gros("La plus plate est la plus grande !", couleur=VERT_OK, fs=34)
        g.move_to(P(-1.2, -2.6))
        self.play(FadeIn(g, scale=1.2), Indicate(groupes[1][0], color=VERT_OK, scale_factor=1.06), run_time=0.5)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tour = Empilement(pave_cubes(2, 5, 2), e=0.3)
        bas = Empilement(pave_cubes(4, 2, 3), e=0.3)
        fig = VGroup(tour, bas).arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer des volumes,", "on compte les cubes de chacun."),
            ("Le plus haut n'a pas toujours", "le plus de cubes."),
            ("Deux formes différentes peuvent", "avoir le même volume.")], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(fig)
        self.au_mot("Pour comparer des volumes")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le plus haut")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deux formes différentes")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_haut()
        self.ecran_meme()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class VolumeComparer6e(VolumeComparerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "jaune"
