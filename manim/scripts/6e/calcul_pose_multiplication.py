# calcul_pose_multiplication.py
# EleveAI — Maths 6e — série « Calcul posé », épisode 03 : LA MULTIPLICATION POSÉE
# (micro entier_multiplication_posee, notion entier_calcul_pose), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/calcul-pose-multiplication.js).
# Décor et métier : Théo, AGRICULTEUR (matrice métiers ; centres : nature-ecologie, cuisine).
# Méthode : chiffre par chiffre depuis les unités, la retenue ajoutée APRÈS le produit ; par un nombre
# à deux chiffres, deux lignes, la seconde commence par un 0 (on multiplie par des dizaines).
# Écrans : garde (00), situation (01), pose 267 × 4 (02), QUESTION 1 (03, réponse A), champ 36 × 24 (04),
# les deux lignes (05), total (06), piège du zéro oublié (07), QUESTION 2 (08, réponse C), défi (09)
# et correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-calcul-pose-multiplication.json ; marques : calcul_pose_multiplication_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/calcul_pose_multiplication.py CalculPoseMultiplication6e
# python -m manim render -qh --disable_caching manim/scripts/6e/calcul_pose_multiplication.py CalculPoseMultiplication6e -o eleveai-maths-6e-calcul-pose-multiplication --media_dir manim/scripts/6e/media-cp-03
# Sortie : manim/sorties/6e/maths/calcul-pose/03-multiplication/eleveai-maths-6e-calcul-pose-multiplication.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from calcul_pose_commun import *  # noqa: E402,F403

FOIS = "×"


class PoseX(Pose):
    """La multiplication posée : les deux lignes de produits (rangées 2 et 3), le second trait
    avec son « + », le total (rangée 4). rt : le rang le plus à gauche des produits."""

    def __init__(self, lignes, rt=None, **k):
        super().__init__(lignes, signe=FOIS, **k)
        self.rt = self.rmax + 1 if rt is None else rt
        self.remove(self.barre)
        self.barre = self._trait(1, max(self.rt, self.rmax + 1))
        self.add(self.barre)

    def _trait(self, i, rg):
        yb = self.pt(0, i)[1] - self.hl * 0.55
        xg, xd = self.pt(rg, 0)[0] - self.pas * 0.5, self.pt(0, 0)[0] + self.pas * 0.6
        return Line(P(xg, yb), P(xd, yb), color=WHITE, stroke_width=5)

    def prod(self, k, r, v, couleur=WHITE):
        """Le chiffre v au rang r de la ligne de produit k (0 : première, 1 : deuxième)."""
        return self._t(v, r, 2 + k, couleur)

    def barre2(self):
        return self._trait(3, self.rt + 1)

    def plus2(self):
        return hors_audit(Text("+", font_size=self.fs, color=WHITE, weight=BOLD).move_to(self.pt(self.rt + 1, 3)))

    def total(self, r, v, couleur=VERT_OK):
        return self._t(v, r, 4, couleur).shift(DOWN * 0.2)


def theo(s=1.0):
    """Théo, agriculteur : salopette verte, chapeau de paille."""
    p = visage(personne(peau="#8d5524", tenue="#15803d", cheveux="#1f2937", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color="#eab308", fill_opacity=1, stroke_width=0) \
        .move_to(c + P(0, r * 0.55))
    haut = RoundedRectangle(width=r * 1.45, height=r * 0.7, corner_radius=r * 0.2, fill_color="#facc15",
                            fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.95))
    ruban = Rectangle(width=r * 1.45, height=r * 0.16, fill_color="#b45309", fill_opacity=1, stroke_width=0) \
        .move_to(c + P(0, r * 0.72))
    p.add(bord, haut, ruban)
    return p


def salade(x, y, s=1.0):
    return VGroup(Circle(radius=0.17 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0),
                  Circle(radius=0.09 * s, fill_color="#86efac", fill_opacity=1, stroke_width=0)).move_to(P(x, y))


def tomate(x, y):
    return VGroup(Circle(radius=0.1, fill_color="#ef4444", fill_opacity=1, stroke_width=0),
                  Dot(P(0, 0.09), radius=0.04, color="#16a34a")).move_to(P(x, y))


def pot(x, y, fleur="#f472b6"):
    """Un pot de fleurs : pot en terre, tige, fleur."""
    p = Polygon(P(-0.13, 0.1), P(0.13, 0.1), P(0.09, -0.12), P(-0.09, -0.12), fill_color="#c2410c", fill_opacity=1,
                stroke_width=0)
    t = Line(P(0, 0.1), P(0, 0.28), color="#16a34a", stroke_width=3)
    f = Dot(P(0, 0.31), radius=0.08, color=fleur)
    return VGroup(p, t, f).move_to(P(x, y))


class CalculPoseMultiplicationBase(PaysageCalculPose):
    nom_voix = "6e-calcul-pose-multiplication"
    fichier_marques = "calcul_pose_multiplication_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    def ecrire(self, morceaux, mot, x0, y, fs=32, autres=(), buff=0.18, n=1):
        """Une ligne d'explication, bord gauche en x0, posée au mot (avec d'autres animations au
        premier morceau). UN play par morceau : chaque morceau attend SON mot (dans un seul play,
        un morceau fait d'un nombre seul suivait le morceau d'avant : AUDIT-AVANCE)."""
        mots = [m[2] if len(m) > 2 else None for m in morceaux]  # (texte, couleur, mot) : posé à SON mot
        lg = self.ligne([m[:2] for m in morceaux], fs, buff=buff)
        gauche(lg, x0, y)
        self.au_mot(mot, n)
        for k, m in enumerate(lg):
            if mots[k]:
                self.au_mot(mots[k])
            self.play(FadeIn(m, shift=UP * 0.1), *(autres if k == 0 else []), run_time=0.25)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La multiplication posée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La multiplication")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Pourquoi écrit-on un zéro", "sur la deuxième ligne ?"], 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        po = PoseX(["36", "24"], origine=P(3.3, 1.45), pas=0.5, fs=40, hl=0.56)
        l1 = VGroup(*[po.prod(0, r, v) for r, v in ((2, 1), (1, 4), (0, 4))])
        l2 = VGroup(po.prod(1, 2, 7), po.prod(1, 1, 2))
        case = DashedVMobject(Square(0.44, stroke_color=ORANGE_RETENUE, stroke_width=3), num_dashes=14) \
            .move_to(po.pt(0, 3))
        zero = po.prod(1, 0, 0, ORANGE_RETENUE)
        self.play(FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), FadeIn(l1),
                  FadeIn(l2), Create(case), run_time=0.35)
        self.au_mot("Pourquoi")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(zero, scale=2), FadeOut(case), run_time=0.35)  # le 0 avec « un zéro »
        self.play(Indicate(zero, color=ORANGE_RETENUE, scale_factor=1.8), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Théo, agriculteur ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        th = theo(1.05).move_to(P(-5.3, -0.2))
        self.au_mot("Voici Théo")
        nom = self.t("Théo", 42, BLEU_CALCUL).next_to(th, UP, buff=0.25)
        self.play(FadeIn(th, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("agriculteur")
        met = self.t("agriculteur", 30, BLEU_CALCUL).next_to(th, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ys = (1.2, 0.4, -0.4, -1.2)
        terre = VGroup(*[RoundedRectangle(width=6.3, height=0.5, corner_radius=0.12, fill_color="#78350f",
                                          fill_opacity=0.85, stroke_width=0).move_to(P(0.15, y)) for y in ys])
        rangs = [VGroup(*[salade(-2.75 + 0.48 * k, y) for k in range(13)]) for y in ys]
        self.au_mot("Il plante")
        self.play(FadeIn(terre[0]), LaggedStart(*[FadeIn(s, scale=0.3) for s in rangs[0]], lag_ratio=0.06),
                  run_time=0.8)
        acc = Brace(rangs[0], UP, buff=0.12, color=VERT_OK)
        l1 = self.ligne([("267 salades", VERT_OK), ("par rangée,", WHITE)], 34, buff=0.18).next_to(acc, UP, buff=0.12)
        self.au_mot("267 salades")
        self.play(GrowFromCenter(acc), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("par rangée")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 rangées")
        acd = Brace(VGroup(*terre), RIGHT, buff=0.15, color=AMBRE_D)
        l2 = self.bloc(["et", "4 rangées."], 32).set_color(AMBRE_D).next_to(acd, RIGHT, buff=0.15)
        self.play(LaggedStart(*[FadeIn(VGroup(terre[i], rangs[i]), shift=DOWN * 0.15) for i in (1, 2, 3)],
                              lag_ratio=0.3), GrowFromCenter(acd), FadeIn(l2, shift=LEFT * 0.1), run_time=0.7)
        self.au_mot("Combien")
        q = self.t("Combien de salades ?", 44, JAUNE_TITRE).move_to(P(0.2, -2.6))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Wiggle(q), run_time=0.6)
        self.attendre_voix()

    # ── 02 : poser 267 × 4 ──────────────────────────────────────────────────
    def ecran_pose(self):
        self.ecran("02-pose")
        po = PoseX(["267", "4"], origine=P(-3.2, 1.3), pas=0.95, hl=1.15, fs=72)
        hauts = {r: po.chiffre(0, r) for r in (0, 1, 2)}
        quatre = po.chiffre(1, 0)
        x0 = -1.8
        self.au_mot("On pose")
        t0 = self.t("On pose", 38)
        gauche(t0, x0, 3.0)
        self.play(FadeIn(t0, shift=UP * 0.1), run_time=0.25)
        t1 = self.t("267", 38, BLEU_CALCUL).next_to(t0, RIGHT, buff=0.2)
        self.au_mot("267 fois")
        self.play(FadeIn(t1, scale=1.2), FadeIn(VGroup(*hauts.values()), shift=DOWN * 0.2), run_time=0.3)
        t2 = self.t(FOIS + " 4.", 38, AMBRE_D).next_to(t1, RIGHT, buff=0.2)
        self.au_mot("4. Le")
        self.play(FadeIn(t2, scale=1.2), FadeIn(quatre, shift=DOWN * 0.2), FadeIn(po.signe), Create(po.barre),
                  run_time=0.3)
        a1 = self.ecrire([("Le 4 multiplie chaque chiffre,", AMBRE_D)], "Le 4 multiplie", x0, 2.2,
                         autres=[Indicate(quatre, color=AMBRE_D, scale_factor=1.4)])
        # le 4 « touche » chaque chiffre du haut, l'un après l'autre (des flèches croisaient les chiffres)
        self.play(LaggedStart(*[Indicate(hauts[r], color=AMBRE_D, scale_factor=1.35) for r in (0, 1, 2)],
                              lag_ratio=0.35), run_time=0.9)
        cad = po.colonne(0, 0, 2)
        a2 = self.ecrire([("en commençant par les unités.", BLEU_D)], "en commençant", x0, 1.6,
                         autres=[Create(cad)])
        # unités
        self.ecrire([("4 " + FOIS + " 7 = 28 :", WHITE)], "4 fois 7", x0, 0.75)
        l1b = self.t("j'écris 8,", 32, VERT_OK)
        gauche(l1b, 1.25, 0.75)
        self.au_mot("j'écris 8")
        self.play(FadeIn(l1b, shift=UP * 0.1), FadeIn(po.res(0, 8), scale=1.6), run_time=0.3)
        l1c = self.t("je retiens 2.", 32, ORANGE_RETENUE).next_to(l1b, RIGHT, buff=0.18)
        self.au_mot("je retiens 2. 4 fois 6")
        self.play(FadeIn(l1c, shift=UP * 0.1), FadeIn(po.ret(1, 2), scale=1.8), run_time=0.3)
        # dizaines
        cad, c0 = po.colonne(1, 0, 2), cad
        l2 = self.ecrire([("4 " + FOIS + " 6 = 24,", WHITE)], "4 fois 6", x0, 0.05,
                         autres=[FadeOut(c0), Create(cad)])
        l2b = self.t("+ 2 = 26 :", 32, ORANGE_RETENUE).next_to(l2, RIGHT, buff=0.18)
        self.au_mot("plus 2, 26")
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.25)
        l3 = self.ecrire([("j'écris 6,", VERT_OK)], "j'écris 6", x0, -0.65, autres=[FadeIn(po.res(1, 6), scale=1.6)])
        l3b = self.t("je retiens 2.", 32, ORANGE_RETENUE).next_to(l3, RIGHT, buff=0.18)
        self.au_mot("je retiens 2. 4 fois 2")
        self.play(FadeIn(l3b, shift=UP * 0.1), FadeIn(po.ret(2, 2), scale=1.8), run_time=0.3)
        # centaines
        cad, c0 = po.colonne(2, 0, 2), cad
        l4 = self.ecrire([("4 " + FOIS + " 2 = 8,", WHITE)], "4 fois 2", x0, -1.35, autres=[FadeOut(c0), Create(cad)])
        l4b = self.t("+ 2", 32, ORANGE_RETENUE).next_to(l4, RIGHT, buff=0.18)
        self.au_mot("plus 2, 10")
        self.play(FadeIn(l4b, shift=UP * 0.1), run_time=0.25)
        l4c = self.t("= 10.", 32, ORANGE_RETENUE).next_to(l4b, RIGHT, buff=0.18)
        self.play(FadeIn(l4c, shift=UP * 0.1), FadeIn(po.res(2, 0), scale=1.6), FadeIn(po.res(3, 1), scale=1.6),
                  FadeOut(cad), run_time=0.3)
        self.au_mot("Théo plante")
        l5 = self.t("Théo plante", 36)
        gauche(l5, -6.2, -2.55)  # sous la pose : à droite, « salades. » touchait Ti-Margo
        g = hors_audit(self.gros("1 068", fs=46)).next_to(l5, RIGHT, buff=0.3)
        l6 = self.t("salades.", 36).next_to(g, RIGHT, buff=0.3)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("salades.")
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.3)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = PoseX(["135", "3"], origine=P(-3.4, 1.6), pas=0.85, fs=60, hl=0.95)

        def autres_q(sc):
            sc.play(FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.35)

        def apres(sc):
            def bas(i, morceaux, **k):
                return sc.rep_bas(i, morceaux, pas=0.54, buff=0.22, **k)

            lg = bas(0, ["3 " + FOIS + " 5 = 15 :", "j'écris 5,", ("je retiens 1.", ORANGE_RETENUE)])
            sc.au_mot("3 fois 5")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("j'écris 5")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), FadeIn(po.res(0, 5), scale=1.6), run_time=0.25)
            sc.au_mot("je retiens 1. 3 fois 3")
            sc.play(FadeIn(lg[2], shift=UP * 0.1), FadeIn(po.ret(1, 1), scale=1.8), run_time=0.25)
            lg2 = bas(1, ["3 " + FOIS + " 3 = 9,", ("+ 1 = 10 :", ORANGE_RETENUE), "j'écris 0,",
                          ("je retiens 1.", ORANGE_RETENUE)])
            sc.au_mot("3 fois 3")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("plus 1, 10")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("j'écris 0")
            sc.play(FadeIn(lg2[2], shift=UP * 0.1), FadeIn(po.res(1, 0), scale=1.6), run_time=0.25)
            sc.au_mot("je retiens 1. 3 fois 1")
            sc.play(FadeIn(lg2[3], shift=UP * 0.1), FadeIn(po.ret(2, 1), scale=1.8), run_time=0.25)
            lg3 = bas(2, ["3 " + FOIS + " 1 = 3,", ("+ 1 = 4.", ORANGE_RETENUE)])
            sc.au_mot("3 fois 1")
            sc.play(FadeIn(lg3[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("plus 1, 4")
            sc.play(FadeIn(lg3[1], shift=UP * 0.1), FadeIn(po.res(2, 4), scale=1.6), run_time=0.25)
            lg4 = bas(3, ["Ça fait 405."])
            sc.au_mot("Ça fait 405")
            sc.play(FadeIn(lg4[0], scale=1.2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Combien font 135 " + FOIS + " 3 ?"],
                            [self.t("405", 36), self.t("395", 36), self.t("305", 36)], 0,
                            ["3 × 5 = 15 : j'écris 5, je retiens 1.", "3 × 3 = 9, + 1 = 10 : j'écris 0, je retiens 1.",
                             "3 × 1 = 3, + 1 = 4.", "Ça fait 405."],
                            mot_q="Combien", autres_q=autres_q, autres_r=apres)

    # ── 04 : le champ de tomates, 36 × 24 ───────────────────────────────────
    def ecran_champ(self):
        self.ecran("04-champ")
        rangs = VGroup(*[VGroup(*[tomate(-5.95 + 0.32 * k, 1.5 - 0.32 * j) for k in range(13)]) for j in range(8)])
        self.au_mot("Dans un autre champ")
        self.play(LaggedStart(*[FadeIn(rg, shift=RIGHT * 0.2) for rg in rangs], lag_ratio=0.12), run_time=0.9)
        acd = Brace(rangs, RIGHT, buff=0.15, color=AMBRE_D)
        l1 = self.bloc(["24", "rangées"], 32).set_color(AMBRE_D).next_to(acd, RIGHT, buff=0.15)
        self.au_mot("24 rangées")
        self.play(GrowFromCenter(acd), FadeIn(l1, shift=LEFT * 0.1), run_time=0.35)
        acc = Brace(rangs, UP, buff=0.12, color=ROSE_D)
        l2 = self.t("36 plants de tomates", 32, ROSE_D).next_to(acc, UP, buff=0.12)
        self.au_mot("36 plants")
        self.play(GrowFromCenter(acc), FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        po = PoseX(["36", "24"], origine=P(3.6, 1.5), pas=0.9, fs=68, hl=1.05)
        self.au_mot("On pose")
        t0 = self.t("On pose", 36)
        gauche(t0, 1.0, 3.05)
        self.play(FadeIn(t0, shift=UP * 0.1), run_time=0.25)
        t1 = self.t("36 " + FOIS, 36, BLEU_CALCUL).next_to(t0, RIGHT, buff=0.2)
        self.au_mot("36 fois 24")
        self.play(FadeIn(t1, scale=1.2), FadeIn(po.ligne(0), shift=DOWN * 0.2), run_time=0.3)
        t2 = self.t("24.", 36, BLEU_CALCUL).next_to(t1, RIGHT, buff=0.2)
        self.au_mot("24. Et")
        self.play(FadeIn(t2, scale=1.2), FadeIn(po.ligne(1), shift=DOWN * 0.2), FadeIn(po.signe), Create(po.barre),
                  run_time=0.3)
        d4, d2 = po.chiffre(1, 0, BLEU_D), po.chiffre(1, 1, AMBRE_D)
        lg = self.ligne([("24", WHITE), (", c'est", WHITE), ("4", BLEU_D), ("+", WHITE), ("20.", AMBRE_D)], 44, buff=0.2)
        lg.move_to(P(3.0, -1.6))
        self.au_mot("Et 24")
        self.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 plus")
        self.play(FadeIn(lg[2], scale=1.3), FadeIn(d4, scale=1.4), run_time=0.3)
        self.au_mot("20.")
        self.play(FadeIn(lg[3]), FadeIn(lg[4], scale=1.3), FadeIn(d2, scale=1.4), run_time=0.3)
        self.play(Indicate(VGroup(d4, lg[2]), color=BLEU_D, scale_factor=1.3),
                  Indicate(VGroup(d2, lg[4]), color=AMBRE_D, scale_factor=1.3), run_time=0.7)
        self.attendre_voix()

    # ── 05 : les deux lignes, puis 06 : le total ────────────────────────────
    def ecran_lignes(self):
        self.ecran("05-lignes")
        po = PoseX(["36", "24"], origine=P(-3.0, 1.95), pas=0.9, fs=68, hl=1.05)
        d4, d2 = po.chiffre(1, 0, BLEU_D), po.chiffre(1, 1, AMBRE_D)
        self.add(po.ligne(0), d4, d2, po.signe, po.barre)
        x0 = -1.2
        col = VGroup()
        col.add(self.ecrire([("Première ligne :", BLEU_D), ("36 " + FOIS + " 4 =", WHITE)], "Première", x0, 2.75,
                            autres=[Indicate(d4, color=BLEU_D, scale_factor=1.5)]))
        c = self.t("144.", 32, BLEU_D).next_to(col[-1], RIGHT, buff=0.2)
        p1 = VGroup(*[po.prod(0, r, v, BLEU_D) for r, v in ((2, 1), (1, 4), (0, 4))])
        self.au_mot("144")
        self.play(FadeIn(c, scale=1.2), LaggedStart(*[FadeIn(m, scale=1.5) for m in p1], lag_ratio=0.2), run_time=0.4)
        col.add(c)
        col.add(self.ecrire([("Deuxième ligne :", AMBRE_D), ("36 " + FOIS, WHITE), ("20.", AMBRE_D, "20. On")], "Deuxième", x0,
                            2.0, autres=[Indicate(d2, color=AMBRE_D, scale_factor=1.5)]))
        zero = po.prod(1, 0, 0, ORANGE_RETENUE)
        col.add(self.ecrire([("On écrit d'abord", WHITE)], "On écrit", x0, 1.15))
        u0 = self.t("un 0", 32, ORANGE_RETENUE).next_to(col[-1], RIGHT, buff=0.18)
        self.au_mot("un 0 aux")
        self.play(FadeIn(u0, scale=1.2), FadeIn(zero, scale=2.2), run_time=0.3)
        u1 = self.t("aux unités,", 32, ORANGE_RETENUE).next_to(u0, RIGHT, buff=0.18)
        self.play(FadeIn(u1, shift=UP * 0.1), run_time=0.25)
        col.add(u0, u1)
        col.add(self.ecrire([("parce qu'on multiplie", AMBRE_D)], "parce qu'on", x0, 0.5,
                            autres=[Indicate(zero, color=ORANGE_RETENUE, scale_factor=1.6)]))
        col.add(self.ecrire([("par des dizaines.", AMBRE_D)], "par des dizaines", x0, -0.1))
        col.add(self.ecrire([("Puis", WHITE), ("36 " + FOIS + " 2 =", WHITE)], "Puis 36", x0, -0.85))
        self.au_mot("72. La")
        p2 = VGroup(po.prod(1, 2, 7, AMBRE_D), po.prod(1, 1, 2, AMBRE_D))
        r72 = self.t("72.", 32, AMBRE_D).next_to(col[-1], RIGHT, buff=0.2)
        self.play(FadeIn(r72, scale=1.2), LaggedStart(*[FadeIn(m, scale=1.5) for m in p2], lag_ratio=0.2),
                  run_time=0.35)
        col.add(r72)
        col.add(self.ecrire([("La ligne vaut", WHITE), ("720.", AMBRE_D, "720.")], "La ligne vaut", x0, -1.6))
        self.play(Circumscribe(VGroup(p2, zero), color=AMBRE_D, buff=0.12), run_time=0.7)
        self.attendre_voix()
        # 06 : on additionne les deux lignes (même pose)
        self.play(FadeOut(col), run_time=0.3)
        self.dire("06-total")
        self.ecrire([("On additionne les deux lignes :", JAUNE_TITRE)], "On additionne", x0, 2.75)
        self.au_mot("144 plus")
        a = self.t("144 +", 40, BLEU_D)
        gauche(a, x0, 1.8)
        self.play(FadeIn(a, shift=UP * 0.1), FadeIn(po.plus2()), Create(po.barre2()), run_time=0.3)
        b = self.t("720", 40, AMBRE_D).next_to(a, RIGHT, buff=0.22)
        self.play(FadeIn(b, shift=UP * 0.1), run_time=0.25)
        c = self.t("= 864.", 40, VERT_OK).next_to(b, RIGHT, buff=0.22)
        tot = VGroup(*[po.total(r, v) for r, v in ((2, 8), (1, 6), (0, 4))])
        self.play(FadeIn(c, scale=1.2), LaggedStart(*[FadeIn(m, scale=1.5) for m in tot], lag_ratio=0.2), run_time=0.4)
        self.au_mot("Théo a")
        l2 = self.t("Théo a", 38)
        gauche(l2, x0, 0.6)
        g = self.gros("864 plants", fs=46).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(g, scale=1.3), run_time=0.35)
        self.au_mot("de tomates")
        l3 = self.t("de tomates.", 38)
        gauche(l3, x0, -0.45)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : le piège du zéro oublié ────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.15)
        self.play(Write(tit), run_time=0.35)
        po = PoseX(["36", "24"], origine=P(-3.85, 1.75), pas=0.75, fs=56, hl=0.86)
        p1 = VGroup(*[po.prod(0, r, v) for r, v in ((2, 1), (1, 4), (0, 4))])
        self.add(po.ligne(0), po.ligne(1), po.signe, po.barre, p1)
        x0 = -2.4
        self.ecrire([("Sans le zéro :", ROUGE_ERREUR)], "Sans le zéro", x0, 2.25)
        faux = VGroup(po.prod(1, 1, 7, ROUGE_ERREUR), po.prod(1, 0, 2, ROUGE_ERREUR))
        ld = self.ecrire([("la deuxième ligne vaudrait", WHITE)], "la deuxième ligne", x0, 1.65)
        lg = self.t("72,", 32, ROUGE_ERREUR).next_to(ld, RIGHT, buff=0.2)
        self.au_mot("72, et")
        self.play(FadeIn(lg, scale=1.2), FadeIn(faux, scale=1.5), run_time=0.3)
        tf = VGroup(*[po.total(r, v, ROUGE_ERREUR) for r, v in ((2, 2), (1, 1), (0, 6))])
        lt = self.ecrire([("et le total", WHITE)], "et le total", x0, 1.05,
                         autres=[FadeIn(po.plus2()), Create(po.barre2())])
        l216 = self.t("216.", 32, ROUGE_ERREUR).next_to(lt, RIGHT, buff=0.2)
        self.au_mot("216. On")
        self.play(FadeIn(l216, scale=1.2), FadeIn(tf, scale=1.5), run_time=0.3)
        self.ecrire([("On vérifie l'ordre de grandeur :", JAUNE_TITRE)], "On vérifie", x0, 0.2)
        self.ecrire([("36,", BLEU_D), ("c'est presque", WHITE), ("40.", BLEU_D, "40. 24")], "36, c'est", x0, -0.4)
        self.ecrire([("24,", AMBRE_D), ("c'est presque", WHITE), ("20.", AMBRE_D, "20. 40")], "24, c'est", x0, -1.0)
        self.ecrire([("40 " + FOIS + " 20 =", WHITE), ("800.", ORANGE_RETENUE, "800. 864")], "40 fois 20", x0, -1.6)
        # la droite de 0 à 1 000
        x = lambda v: -2.0 + 6.0 * v / 1000  # noqa: E731  (6,6 : « proche » touchait Ti-Margo)
        axe = Line(P(x(0), -2.95), P(x(1000), -2.95), color=WHITE, stroke_width=4)
        bouts = VGroup(*[Line(P(x(v), -3.07), P(x(v), -2.83), color=WHITE, stroke_width=4) for v in (0, 1000)])
        m800 = VGroup(Line(P(x(800), -3.1), P(x(800), -2.8), color=ORANGE_RETENUE, stroke_width=6),
                      hors_audit(self.t("800", 24, ORANGE_RETENUE)).move_to(P(x(800), -3.32)))
        self.play(Create(axe), FadeIn(bouts), FadeIn(m800), run_time=0.4)
        self.au_mot("864 est proche")
        d864 = Dot(P(x(864), -2.95), radius=0.12, color=VERT_OK)
        e864 = self.t("864", 28, VERT_OK).move_to(P(x(864) - 0.35, -2.5))
        self.play(FadeIn(d864, scale=2), FadeIn(e864, shift=UP * 0.1), run_time=0.3)
        f864 = self.t(": proche", 28, VERT_OK).next_to(e864, RIGHT, buff=0.12)
        self.play(FadeIn(f864, shift=UP * 0.1), run_time=0.25)
        self.au_mot("216 est bien")
        d216 = Dot(P(x(216), -2.95), radius=0.12, color=ROUGE_ERREUR)
        e216 = self.t("216", 28, ROUGE_ERREUR).move_to(P(x(216) - 0.4, -2.5))
        croix = VGroup(Line(tf.get_corner(UL) + P(-0.15, 0.1), tf.get_corner(DR) + P(0.15, -0.1)),
                       Line(tf.get_corner(DL) + P(-0.15, -0.1), tf.get_corner(UR) + P(0.15, 0.1))) \
            .set_stroke(ROUGE_ERREUR, 6)
        self.play(FadeIn(d216, scale=2), FadeIn(e216, shift=UP * 0.1), run_time=0.3)
        f216 = self.t(": bien trop petit !", 28, ROUGE_ERREUR).next_to(e216, RIGHT, buff=0.12)
        self.play(FadeIn(f216, shift=UP * 0.1), Create(croix), run_time=0.35)
        self.play(Wiggle(f216), run_time=0.6)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        po = PoseX(["52", "13"], origine=P(-3.7, 2.35), pas=0.72, fs=52, hl=0.8)
        p1 = VGroup(*[po.prod(0, r, v) for r, v in ((2, 1), (1, 5), (0, 6))])
        cases = VGroup(*[DashedVMobject(Square(0.5, stroke_color=AMBRE_D, stroke_width=3), num_dashes=14)
                         .move_to(po.pt(r, 3)) for r in (2, 1, 0)])

        def autres_q(sc):
            sc.play(FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), FadeIn(p1),
                    Create(cases), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["13, c'est", ("3", BLEU_D), "+", ("10.", AMBRE_D)])
            sc.au_mot("13, c'est")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("3 plus")
            sc.play(FadeIn(lg[1], scale=1.3), Indicate(po.chiffre(1, 0), color=BLEU_D), run_time=0.25)
            sc.au_mot("10. La")
            sc.play(FadeIn(lg[2]), FadeIn(lg[3], scale=1.3), Indicate(po.chiffre(1, 1), color=AMBRE_D), run_time=0.3)
            lg2 = sc.rep_bas(1, ["La deuxième ligne :", "52 " + FOIS + " 10 =", ("520.", AMBRE_D)])
            sc.au_mot("La deuxième")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("52 fois 10")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            p2 = VGroup(po.prod(1, 2, 5, AMBRE_D), po.prod(1, 1, 2, AMBRE_D), po.prod(1, 0, 0, ORANGE_RETENUE))
            sc.au_mot("520. On")
            sc.play(FadeIn(lg2[2], scale=1.2), FadeOut(cases), LaggedStart(*[FadeIn(m, scale=1.5) for m in p2],
                                                                           lag_ratio=0.2), run_time=0.4)
            lg3 = sc.rep_bas(2, [("On n'oublie pas le zéro !", ORANGE_RETENUE)])
            sc.au_mot("On n'oublie")
            sc.play(FadeIn(lg3[0], shift=UP * 0.1), Indicate(p2[2], color=ORANGE_RETENUE, scale_factor=1.8),
                    run_time=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Dans 52 " + FOIS + " 13, que vaut", "la deuxième ligne ?"],
                            [self.t("52", 36), self.t("156", 36), self.t("520", 36)], 2,
                            ["13, c'est 3 + 10.", "La deuxième ligne : 52 × 10 = 520.", "On n'oublie pas le zéro !"],
                            mot_q="Dans 52", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        th = theo(0.8).move_to(P(-5.4, 0.4))
        fleurs = ("#f472b6", "#facc15", "#a78bfa", "#60a5fa")
        pots = VGroup(*[VGroup(*[pot(-3.85 + 0.42 * k, 1.75 - 0.62 * j, fleurs[(j + k) % 4]) for k in range(10)])
                        for j in range(5)])
        self.au_mot("Théo range")
        self.play(FadeIn(th, shift=UP * 0.2), LaggedStart(*[FadeIn(rg, shift=DOWN * 0.15) for rg in pots],
                                                          lag_ratio=0.15), run_time=0.8)
        x0 = 1.3
        self.ecrire([("45 rangées", AMBRE_D)], "45 rangées", x0, 1.6, fs=40)
        self.ecrire([("de 28 pots.", ROSE_D)], "28 pots", x0, 0.85, fs=40)
        self.au_mot("Combien")
        q = self.t("Combien de pots ?", 44, JAUNE_TITRE).move_to(P(-0.6, -1.3))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(pots[2]), run_time=0.5)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        po = PoseX(["28", "45"], rt=3, origine=P(-3.1, 2.15), pas=0.7, fs=54, hl=0.84)
        x0 = -1.6
        a = self.ecrire([("On pose", WHITE)], "On pose", x0, 2.2, fs=34)
        b = self.t("28 " + FOIS, 34, BLEU_CALCUL).next_to(a, RIGHT, buff=0.2)
        self.au_mot("28 fois 45")
        self.play(FadeIn(b, scale=1.2), FadeIn(po.ligne(0)), run_time=0.3)
        b_ = self.t("45.", 34, BLEU_CALCUL).next_to(b, RIGHT, buff=0.2)
        self.au_mot("45. Première")
        self.play(FadeIn(b_, scale=1.2), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre), run_time=0.3)
        a1 = self.ecrire([("Première ligne :", BLEU_D)], "Première", x0, 1.35, fs=34)
        b1 = self.t("28 " + FOIS + " 5 =", 34).next_to(a1, RIGHT, buff=0.2)
        self.au_mot("28 fois 5")
        self.play(FadeIn(b1, shift=UP * 0.1), run_time=0.25)
        c1 = self.t("140.", 34, BLEU_D).next_to(b1, RIGHT, buff=0.2)
        p1 = VGroup(*[po.prod(0, r, v, BLEU_D) for r, v in ((2, 1), (1, 4), (0, 0))])
        self.au_mot("140. Deuxième")
        self.play(FadeIn(c1, scale=1.2), FadeIn(p1, scale=1.4), run_time=0.3)
        a2 = self.ecrire([("Deuxième ligne :", AMBRE_D)], "Deuxième", x0, 0.55, fs=34)
        b2 = self.t("28 " + FOIS + " 40 =", 34).next_to(a2, RIGHT, buff=0.2)
        self.au_mot("28 fois 40")
        self.play(FadeIn(b2, shift=UP * 0.1), run_time=0.25)
        c2 = hors_audit(self.t("1 120.", 34, AMBRE_D)).next_to(b2, RIGHT, buff=0.2)
        p2 = VGroup(po.prod(1, 3, 1, AMBRE_D), po.prod(1, 2, 1, AMBRE_D), po.prod(1, 1, 2, AMBRE_D),
                    po.prod(1, 0, 0, ORANGE_RETENUE))
        self.au_mot("1 120. Total")
        self.play(FadeIn(c2, scale=1.2), FadeIn(p2, scale=1.4), run_time=0.3)
        a3 = self.ecrire([("Total :", WHITE)], "Total", x0, -0.25, fs=34)
        b3 = self.t("140 +", 34, BLEU_D).next_to(a3, RIGHT, buff=0.2)
        self.au_mot("140 plus")
        self.play(FadeIn(b3, shift=UP * 0.1), FadeIn(po.plus2()), Create(po.barre2()), run_time=0.3)
        c3 = hors_audit(self.t("1 120 =", 34, AMBRE_D)).next_to(b3, RIGHT, buff=0.2)
        self.play(FadeIn(c3, shift=UP * 0.1), run_time=0.25)
        tot = VGroup(*[po.total(r, v) for r, v in ((3, 1), (2, 2), (1, 6), (0, 0))])
        g = hors_audit(self.gros("1 260 pots", fs=50))
        gauche(g, x0, -1.45)
        self.au_mot("1 260 pots")
        self.play(FadeIn(g, scale=1.3), LaggedStart(*[FadeIn(m, scale=1.5) for m in tot], lag_ratio=0.2), run_time=0.45)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        po = PoseX(["36", "24"], origine=P(-3.6, 1.6), pas=0.6, fs=46, hl=0.7)
        p1 = VGroup(*[po.prod(0, r, v, BLEU_D) for r, v in ((2, 1), (1, 4), (0, 4))])
        p2 = VGroup(po.prod(1, 2, 7, AMBRE_D), po.prod(1, 1, 2, AMBRE_D))
        zero = po.prod(1, 0, 0, ORANGE_RETENUE)
        ret = po.ret(1, 2)
        tot = VGroup(*[po.total(r, v) for r, v in ((2, 8), (1, 6), (0, 4))])
        fig = VGroup(po, po.ligne(0), po.ligne(1), p1, p2, zero, ret, po.plus2(), po.barre2(), tot)
        lignes = self.finale_gauche(fig, textes=[
            ("On multiplie chiffre par chiffre,", "en commençant par les unités."),
            ("On ajoute la retenue", "après le produit."),
            ("Pour les dizaines,", "on écrit d'abord un zéro.")], fs=36)
        self.add(fig)
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[0], Indicate(p1, color=BLEU_D, scale_factor=1.25))
        self.au_mot("On ajoute")
        self.montrer_ligne(lignes[1], Indicate(ret, color=ORANGE_RETENUE, scale_factor=1.8))
        self.au_mot("Pour les dizaines")
        self.montrer_ligne(lignes[2], Indicate(zero, color=ORANGE_RETENUE, scale_factor=1.8))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pose()
        self.ecran_question1()
        self.ecran_champ()
        self.ecran_lignes()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class CalculPoseMultiplication6e(CalculPoseMultiplicationBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
