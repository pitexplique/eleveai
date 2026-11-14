# perimetre_defi.py
# EleveAI — Maths CE2 — série « Périmètre », épisode 05 : RÉSOUDRE UN DÉFI DE PÉRIMÈTRE
# (micro ce2_perimetre_defi, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Vidéo COMMUNE : sert aussi au CM1, au CM2… (`aussi`).
# Short jumeau : film Ti Margo (la scène de danse : deux tapis collés, le scotch du milieu ne sert à rien).
# Décor et métier : Zoé, SOIGNEUSE dans un refuge pour animaux (tortues, lapins ; centre : animaux).
# Exemples du coach (ce2/maths/perimetre.bank.ts, DEFI) : clôturer en laissant une ouverture (tour complet,
# puis on enlève la porte), carrés collés côte à côte (les côtés collés sont dedans).
# Mapping micro → écrans : 02-03 (tour complet, puis − la porte), 05 (cages collées : on suit le bord),
# 06 (piège : additionner les tours de chaque cage), questions 04 et 07, défi 08 (24 − 1 = 23).
# Voix : manim/voix/ce2-perimetre-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : perimetre_defi_marques.json (python manim/scripts/ce2/perimetre_marques.py defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/perimetre_defi.py PerimetreDefiCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/perimetre_defi.py PerimetreDefiCE2 -o eleveai-maths-ce2-perimetre-defi --media_dir manim/scripts/ce2/media-per-05
# Sortie : manim/sorties/ce2/maths/perimetre/05-defi/eleveai-maths-ce2-perimetre-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_ce2_commun import *  # noqa: E402,F403

PORTE = "#d97706"
COLLE = ROUGE_ERREUR


def zoe(s=1.0):
    """Zoé, soigneuse : tenue verte de refuge, casquette vert clair."""
    p = visage(personne(peau="#f1c27d", tenue="#0f766e", cheveux="#7c2d12", longs=True, s=s))
    p.add(casquette(p, "#65a30d"))
    return p


def tortue(s=1.0):
    pattes = VGroup(*[Ellipse(width=0.18 * s, height=0.12 * s, fill_color="#65a30d", fill_opacity=1, stroke_width=0)
                      .move_to(P(x * s, y * s)) for x, y in ((-0.25, -0.15), (0.25, -0.15), (-0.25, 0.15), (0.25, 0.15))])
    tete = Circle(radius=0.1 * s, fill_color="#65a30d", fill_opacity=1, stroke_width=0).move_to(P(0.42 * s, 0))
    car = Ellipse(width=0.7 * s, height=0.45 * s, fill_color="#854d0e", fill_opacity=1, stroke_color="#fde68a",
                  stroke_width=2)
    motif = VGroup(*[RegularPolygon(6, radius=0.08 * s, color="#fde68a", stroke_width=1.5).move_to(P(x * s, y * s))
                     for x, y in ((0, 0), (-0.17, 0.06), (0.17, 0.06), (-0.09, -0.11), (0.09, -0.11))])
    return VGroup(pattes, tete, car, motif)


def lapin(s=1.0):
    corps = Ellipse(width=0.55 * s, height=0.38 * s, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.15 * s, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0).move_to(P(0.3 * s, 0.17 * s))
    oreilles = VGroup(*[Ellipse(width=0.08 * s, height=0.3 * s, fill_color="#f9a8d4", fill_opacity=1,
                                stroke_color="#e5e7eb", stroke_width=3).move_to(P((0.26 + dx) * s, 0.42 * s))
                        for dx in (-0.04, 0.07)])
    oeil = Dot(P(0.35 * s, 0.2 * s), radius=0.025 * s, color="#111827")
    queue = Circle(radius=0.07 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(-0.28 * s, 0.03 * s))
    return VGroup(oreilles, corps, tete, oeil, queue)


def enclos(L, l, centre, e, textes=None, fs=30, remplir=HERBE_F):
    return FigureCotee(rect_pts(L, l), textes, e=e, centre=centre, fs=fs, remplir=remplir, sw=5)


def porte(fig, a, b, e):
    """La porte sur le côté du bas, de a à b mètres depuis le coin bas gauche : une barrière en bois
    (deux montants et une planche) qui recouvre le tour."""
    s = fig.sommets()
    pa = s[0] + RIGHT * a * e
    pb = s[0] + RIGHT * b * e
    planche = Line(pa, pb, color=PORTE, stroke_width=16)
    montants = VGroup(*[Rectangle(width=0.1, height=0.34, fill_color=BOIS, fill_opacity=1, stroke_width=0).move_to(p)
                        for p in (pa, pb)])
    return VGroup(planche, montants)


def carres_colles(n, c, centre, e, remplir=HERBE_F):
    """n carrés de côté c collés en ligne. Renvoie (les carrés, la grande figure, les côtés collés)."""
    w = n * c * e
    x0 = centre[0] - w / 2
    cs = VGroup(*[Square(side_length=c * e, stroke_color=WHITE, stroke_width=5, fill_color=remplir, fill_opacity=1)
                  .move_to(P(x0 + (k + 0.5) * c * e, centre[1])) for k in range(n)])
    grande = FigureCotee(rect_pts(n * c, c), None, e=e, centre=centre, sw=5, remplir=remplir)
    colles = VGroup(*[Line(P(x0 + k * c * e, centre[1] - c * e / 2), P(x0 + k * c * e, centre[1] + c * e / 2),
                           color=COLLE, stroke_width=9) for k in range(1, n)])
    return cs, grande, colles


def bord_morceaux(n, c, centre, e, couleur=TOUR, sw=11):
    """Le bord de n carrés collés, morceau de c par morceau de c, dans le sens du tour
    (bas de gauche à droite, droite, haut de droite à gauche, gauche)."""
    w, h = n * c * e, c * e
    x0, y0 = centre[0] - w / 2, centre[1] - h / 2
    pts = [P(x0 + k * c * e, y0) for k in range(n + 1)] + [P(x0 + w, y0 + h)] + \
          [P(x0 + (n - k) * c * e, y0 + h) for k in range(1, n + 1)] + [P(x0, y0)]
    return VGroup(*[Line(pts[i], pts[i + 1], color=couleur, stroke_width=sw) for i in range(len(pts) - 1)])


class PerimetreDefiBase(PaysagePerimetreCE2):
    nom_voix = "ce2-perimetre-defi"
    fichier_marques = "perimetre_defi_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi de périmètre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Une porte, des cages collées :", "que devient le tour ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        en = enclos(6, 3, P(2.9, 0.75), 0.42)
        po = porte(en, 2, 3.5, 0.42)
        cs, gr, cl = carres_colles(2, 2, P(5.0, -0.6), 0.42)
        self.au_mot("Une porte")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(en), FadeIn(po), FadeIn(cs), Create(cl), run_time=0.45)
        self.au_mot("que devient")
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(en.contour(sw=8)), Create(bord_morceaux(2, 2, P(5.0, -0.6), 0.42, sw=8)),
                  run_time=1.0)
        self.add(po)
        self.attendre_voix(marge=0.6)

    # ── 01 : Zoé, soigneuse ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        zp = zoe(1.0).move_to(P(-4.9, 0.2))
        self.au_mot("Voici Zoé")
        nom = self.t("Zoé", 42, BLEU_CALCUL).next_to(zp, UP, buff=0.2)
        self.play(FadeIn(zp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("soigneuse")
        met = self.bloc(["soigneuse dans", "un refuge"], 28, BLEU_CALCUL).next_to(zp, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        e = 0.42
        en = enclos(12, 5, P(0.9, 0.75), e, ["12 m", "5 m", None, None], fs=32)
        tos = VGroup(tortue(0.9).move_to(P(-0.4, 1.0)), tortue(0.8).move_to(P(2.6, 1.25)).rotate(PI * 0.9))
        self.au_mot("un enclos pour les tortues")
        self.play(FadeIn(en), FadeIn(tos, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("12 mètres")
        self.play(FadeIn(en.lab[0], scale=1.3), run_time=0.3)
        self.au_mot("5 mètres")
        self.play(FadeIn(en.lab[1], scale=1.3), run_time=0.3)
        po = porte(en, 7, 9, e)
        self.au_mot("une porte")
        tp = self.t("porte", 28, PORTE).next_to(po, UP, buff=0.15)
        self.play(FadeIn(po, scale=1.2), FadeIn(tp), run_time=0.35)
        self.au_mot("de 2 mètres")
        t2 = self.t("2 m", 30, PORTE, ).next_to(po, DOWN, buff=0.12)
        en.lab[0].shift(LEFT * 1.4)
        self.play(FadeIn(t2, scale=1.3), run_time=0.3)
        self.au_mot("Combien")
        q = self.t("Combien de mètres de grillage ?", 38, JAUNE_TITRE).move_to(P(0.3, -2.4))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    def enclos_tortues(self, centre=P(-3.0, 0.75), e=0.36):
        en = enclos(12, 5, centre, e, ["12 m", "5 m", "12 m", "5 m"], fs=30)
        en.lab[0].shift(LEFT * 1.1)
        po = porte(en, 7, 9, e)
        t2 = self.t("porte : 2 m", 26, PORTE).next_to(po, DOWN, buff=0.12).shift(RIGHT * 0.5)
        return en, po, t2

    # ── 02 : tout le tour ───────────────────────────────────────────────────
    def ecran_tour(self):
        self.ecran("02-tour")
        en, po, t2 = self.enclos_tortues()
        self.add(en, *en.lab, po)
        aig = depart(en.sommets()[0])
        self.au_mot("D'abord")
        l0 = self.t("D'abord, tout le tour.", 34)
        gauche(l0, 0.6, 2.7)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(aig, scale=1.4), run_time=0.35)
        lg = self.ligne([("12 + 5 = 17", BLEU_D)], 38)
        gauche(lg, 0.6, 1.8)
        self.au_mot("12 plus 5")
        self.tour_cote(en, 0, 0.4, aig)
        self.tour_cote(en, 1, 0.3, aig)
        self.au_fil(lg)
        for k, (a, b, c, i) in enumerate((("17", "12", "29", 2), ("29", "5", "34", 3))):
            l = self.ligne([(a, BLEU_D), ("+ " + b, BLEU_D), ("= " + c, BLEU_D)], 38, buff=0.26)
            hors_audit(l[0])
            gauche(l, 0.6, 1.05 - 0.75 * k)
            self.au_mot("Plus " + b)
            self.play(FadeIn(l[0:2], shift=UP * 0.08), run_time=0.22)
            self.tour_cote(en, i, 0.35, aig)
            self.au_fil(l, 2)
        self.add(po)
        self.au_mot("Le tour complet")
        g = self.gros("Tour complet : 34 m", couleur=TOUR, fs=36)
        hors_audit(g)  # 34 : déjà dit et écrit juste au-dessus
        gauche(g, 0.6, -0.9)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : on enlève la porte ─────────────────────────────────────────────
    def ecran_porte(self):
        self.ecran("03-porte")
        en, po, t2 = self.enclos_tortues()
        tour = en.contour(sw=11)
        self.add(en, *en.lab, tour, po)
        self.au_mot("Mais à la porte")
        l0 = self.bloc(["Mais à la porte,", "pas de grillage !"], 34, PORTE)
        l0.align_to(P(0.6, 0), LEFT).move_to(P(l0.get_center()[0], 2.55))
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(po, color=PORTE, scale_factor=1.3), run_time=0.4)
        self.aux_extraits([l0[1]], ["pas de grillage"])
        l1 = self.bloc(["On enlève les 2 m", "de la porte."], 32)
        l1.align_to(P(0.6, 0), LEFT).move_to(P(l1.get_center()[0], 1.15))
        self.aux_extraits([VGroup(l1[0], t2), l1[1]], ["2 mètres de la", "de la porte. 34"])
        lg = self.ligne([("34", BLEU_D), ("− 2", BLEU_D), ("= 32", BLEU_D)], 40, buff=0.26)
        gauche(lg, 0.6, 0.0)
        self.aux_extraits(lg, ["34 moins", "2, 32", "32. Zoé"])
        self.au_mot("32 mètres")
        g = self.gros("Grillage : 32 m", fs=38)
        hors_audit(g)  # 32 : redit à ce moment (« achète 32 mètres »), déjà écrit au-dessus
        gauche(g, 0.6, -1.1)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        e = 0.42
        car = enclos(5, 5, P(-4.6, 1.3), e, ["5 m", None, None, None], fs=26)
        car.lab[0].shift(LEFT * 0.5)
        po = porte(car, 3, 4, e)
        tp = self.t("1 m", 24, PORTE).next_to(po, DOWN, buff=0.1)

        def autres_q(sc):
            sc.play(FadeIn(car), FadeIn(po), run_time=0.35)
            sc.add(car.lab[0], tp)

        def apres(sc):
            lg = sc.rep_bas(0, ["Tout le tour :", "5 × 4", "= 20."], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.au_mot("Tout le tour")
            sc.play(FadeIn(lg[0], shift=UP * 0.08), Create(car.contour(sw=8)), run_time=0.35)
            sc.add(po)
            sc.aux_extraits(lg[1:], ["5 fois 4", "20. Moins"])
            lg2 = sc.rep_bas(1, ["Moins la porte :", "20", "− 1", "= 19 m."], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.au_mot("Moins la porte")
            sc.play(FadeIn(lg2[0], shift=UP * 0.08), Indicate(po, color=PORTE, scale_factor=1.3), run_time=0.35)
            sc.aux_extraits(lg2[1:], ["20 moins", "1, 19", "19 mètres"])
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Un enclos carré a des côtés de 5 m.", "On laisse une porte de 1 m.",
                             "Combien de mètres de grillage ?"],
                            [self.choix("20 mètres"), self.choix("21 mètres"), self.choix("19 mètres")], 2,
                            ["Tout le tour : 5 × 4 = 20.", "Moins la porte : 20 − 1 = 19 m."], mot_q="Un enclos",
                            autres_q=autres_q, autres_r=apres)

    # ── 05 : deux cages collées ─────────────────────────────────────────────
    def ecran_colles(self):
        self.ecran("05-colles")
        e = 0.62
        c0 = P(-3.2, 0.75)
        cs, gr, cl = carres_colles(2, 3, c0, e, remplir="#78350f")
        self.au_mot("Deuxième défi")
        tit = self.t("Deuxième défi", 44, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        cs[0].shift(LEFT * 0.5)
        cs[1].shift(RIGHT * 0.5)
        self.au_mot("deux cages carrées")
        self.play(FadeIn(cs[0], shift=RIGHT * 0.2), FadeIn(cs[1], shift=LEFT * 0.2), run_time=0.4)
        lab = VGroup(self.t("3 m", 28).next_to(cs[0], DOWN, buff=0.15), self.t("3 m", 28).next_to(cs[1], DOWN, buff=0.15))
        self.au_mot("3 mètres")
        self.play(FadeIn(lab, scale=1.3), run_time=0.3)
        self.au_mot("l'une contre l'autre")
        self.play(cs[0].animate.shift(RIGHT * 0.5), cs[1].animate.shift(LEFT * 0.5),
                  lab[0].animate.shift(RIGHT * 0.5), lab[1].animate.shift(LEFT * 0.5), run_time=0.6)
        self.au_mot("Quel est le tour")
        q = self.t("Quel est le tour de la grande cage ?", 32, JAUNE_TITRE)
        gauche(q, -6.2, -2.3)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Le côté collé")
        l1 = self.bloc(["Le côté collé est au milieu :", "il n'est plus sur le bord."], 28, COLLE)
        l1.align_to(P(0.4, 0), LEFT).move_to(P(l1.get_center()[0], 2.1))
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cl), run_time=0.4)
        self.au_mot("il n'est plus")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(cl, color=COLLE, scale_factor=1.2), run_time=0.35)
        self.au_mot("On suit le bord")
        l2 = self.t("On suit le bord :", 32, TOUR)
        gauche(l2, 0.4, 1.05)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        bm = bord_morceaux(2, 3, c0, e)
        nums = VGroup()
        for k, m in enumerate(bm):
            nrm = m.get_center() - np.array(c0)
            nrm = np.array([np.sign(round(nrm[0], 2)) if abs(nrm[1]) < 0.5 else 0,
                            np.sign(round(nrm[1], 2)) if abs(nrm[1]) >= 0.5 else 0, 0])
            nm = self.t(str(k + 1), 26, TOUR).move_to(m.get_center() + nrm * 0.55)
            if abs(nrm[1]) > 0 and nrm[1] < 0:
                nm.shift(DOWN * 0.6)  # sous les « 3 m », sans les toucher
            hors_audit(nm)  # on compte les morceaux : les numéros ne sont pas dits
            nums.add(nm)
        for m, nm in zip(bm, nums):
            self.play(Create(m), FadeIn(nm, scale=1.3), run_time=0.12)
        l3 = self.t("6 côtés de 3 m.", 32, TOUR)
        gauche(l3, 0.4, 0.3)
        self.aux_extraits([l3], ["6 côtés de 3"])
        lg = self.ligne([("3 × 6", VERT_OK), ("= 18", VERT_OK)], 38, buff=0.26)
        gauche(lg, 0.4, -0.45)
        self.aux_extraits(lg, ["3 fois 6", ("18. Le", 1, 0.0)])
        self.au_mot("18 mètres")
        g = self.gros("Tour : 18 m", couleur=TOUR, fs=36)
        hors_audit(g)  # 18 : redit à ce moment, déjà écrit au-dessus
        gauche(g, 0.4, -1.4)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        e = 0.55
        c0 = P(-3.4, 1.0)
        cs, gr, cl = carres_colles(2, 3, c0, e, remplir="#78350f")
        self.add(cs)
        self.au_mot("On ne fait pas")
        l0 = self.t("On ne fait pas le tour de chaque cage :", 32)
        gauche(l0, -6.2, -0.75)
        t1 = Square(side_length=3 * e, color=TOUR, stroke_width=9).move_to(cs[0])
        t2 = Square(side_length=3 * e, color="#facc15", stroke_width=6).move_to(cs[1])
        self.play(FadeIn(l0, shift=UP * 0.1), Create(t1), Create(t2), run_time=0.6)
        lg = self.ligne([("12 + 12 = 24,", ROUGE_ERREUR), ("c'est trop !", ROUGE_ERREUR)], 36, buff=0.2)
        gauche(lg, -6.2, -1.5)
        self.au_mot("12 plus 12")
        self.play(FadeIn(lg[0], shift=UP * 0.08), run_time=0.2)
        self.au_mot("c'est trop")
        self.play(FadeIn(lg[1], scale=1.2), run_time=0.3)
        self.au_mot("Les côtés collés")
        l2 = self.ligne([("Les côtés collés sont à l'intérieur :", COLLE)], 32)
        gauche(l2, -6.2, -2.3)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cl), run_time=0.4)
        self.au_mot("ils ne font pas")
        l3 = self.t("ils ne font pas partie du tour.", 32, COLLE)
        gauche(l3, -6.2, -2.95)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(t1), FadeOut(t2),
                  Create(bord_morceaux(2, 3, c0, e, sw=9)), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        e = 0.5
        c0 = P(-4.3, 1.4)
        cs, gr, cl = carres_colles(3, 2, c0, e, remplir="#78350f")
        la = self.t("2 m", 24).next_to(cs[0], DOWN, buff=0.12)

        def autres_q(sc):
            sc.play(FadeIn(cs), Create(cl), run_time=0.35)
            sc.add(la)

        def apres(sc):
            lg = sc.rep_bas(0, ["Un rectangle de", "6 m", "sur 2 m."], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.au_mot("un rectangle")
            sc.play(FadeIn(lg[0], shift=UP * 0.08), Create(bord_morceaux(3, 2, c0, e, sw=8)), run_time=0.35)
            sc.aux_extraits(lg[1:], ["6 mètres sur", "2 mètres. 6"])
            lg2 = sc.rep_bas(1, ["6 + 2 = 8,", "8", "+ 6", "= 14,", "14", "+ 2", "= 16."], fs=32, y0=-1.75,
                             pas=0.6, buff=0.25)
            hors_audit(lg2[1]), hors_audit(lg2[4])  # 8 et 14 : déjà dits, déjà écrits
            sc.au_mot("6 plus 2")
            sc.play(FadeIn(lg2[0], shift=UP * 0.08), run_time=0.22)
            sc.aux_extraits([VGroup(lg2[1], lg2[2]), lg2[3], VGroup(lg2[4], lg2[5]), lg2[6]],
                            ["6, 14", "14. Plus", "2, 16", "16. 24"])
            lg3 = sc.rep_bas(2, ["24,", "ce serait le tour", "des trois carrés séparés."], fs=32, y0=-1.75, pas=0.6, buff=0.26)
            sc.au_mot("24,")
            sc.play(FadeIn(lg3[0], shift=UP * 0.08), run_time=0.2)
            sc.au_mot("ce serait")
            sc.play(FadeIn(lg3[1], shift=UP * 0.08), run_time=0.25)
            sc.au_mot("des trois")
            sc.play(FadeIn(lg3[2], shift=UP * 0.08), run_time=0.25)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Trois carrés de 2 m de côté", "sont collés en ligne. Quel est", "le périmètre de la grande figure ?"],
                            [self.choix("16 mètres"), self.choix("24 mètres"), self.choix("12 mètres")], 0,
                            ["Un rectangle de 6 m sur 2 m.", "6 + 2 = 8, 8 + 6 = 14, 14 + 2 = 16.",
                             "24, ce serait le tour des trois carrés séparés."], mot_q="Trois carrés",
                            autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def enclos_lapins(self, c0, e):
        cs, gr, cl = carres_colles(2, 4, c0, e)
        cs.set_fill(HERBE_F, 1)
        x0 = c0[0] - 4 * e
        bas = c0[1] - 2 * e
        po = VGroup(Line(P(x0 + 5 * e, bas), P(x0 + 6 * e, bas), color=PORTE, stroke_width=16),
                    *[Rectangle(width=0.1, height=0.3, fill_color=BOIS, fill_opacity=1, stroke_width=0)
                      .move_to(P(x0 + k * e, bas)) for k in (5, 6)])
        lps = VGroup(lapin(0.9).move_to(cs[0].get_center()), lapin(0.8).move_to(cs[1].get_center()).flip(UP))
        return cs, cl, po, lps

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        e = 0.42
        c0 = P(3.3, 0.6)
        cs, cl, po, lps = self.enclos_lapins(c0, e)
        self.au_mot("Pour les lapins")
        l0 = self.t("Pour les lapins, Zoé colle", 34)
        gauche(l0, -6.2, 2.1)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(lps, scale=0.8), run_time=0.35)
        self.au_mot("deux enclos")
        l1 = self.t("deux enclos carrés", 34)
        gauche(l1, -6.2, 1.4)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(cs), Create(cl), run_time=0.4)
        self.add(lps)
        l2 = self.t("de 4 m de côté.", 34)
        gauche(l2, -6.2, 0.7)
        la = self.t("4 m", 28).next_to(cs[0], UP, buff=0.12)
        self.aux_extraits([VGroup(l2, la)], ["4 mètres"])
        self.au_mot("Elle laisse")
        l3 = self.t("Elle laisse une porte de 1 m.", 34, PORTE)
        gauche(l3, -6.2, -0.2)
        tp = self.t("1 m", 26, PORTE).next_to(po, DOWN, buff=0.1)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(po, scale=1.2), FadeIn(tp), run_time=0.4)
        self.au_mot("Combien")
        q = self.bloc(["Combien de mètres de", "grillage lui faut-il ?"], 36, JAUNE_TITRE)
        q.align_to(P(-6.2, 0), LEFT).move_to(P(q.get_center()[0], -1.25))
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        # « Mets pause » sous la question, à gauche : à droite (colonne XL), il collait Ti-Margo.
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -6.2, -2.55)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        e = 0.4
        c0 = P(-4.1, 1.15)
        cs, cl, po, lps = self.enclos_lapins(c0, e)
        self.add(cs, cl, lps, po)
        self.au_mot("La grande figure")
        l0 = self.ligne([("Un rectangle de", WHITE), ("8 m", WHITE), ("sur 4 m.", WHITE)], 34, buff=0.26)
        gauche(l0, -0.8, 2.2)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeOut(cl), run_time=0.3)
        la = self.t("8 m", 26).next_to(cs, DOWN, buff=0.4).shift(LEFT * 0.9)
        lb = self.t("4 m", 26).next_to(cs, RIGHT, buff=0.15)
        self.aux_extraits([VGroup(l0[1], la), VGroup(l0[2], lb)], ["8 mètres sur", "4 mètres. 8"])
        lg = self.ligne([("8 + 4 = 12", BLEU_D)], 36)
        gauche(lg, -0.8, 1.45)
        self.au_mot("8 plus 4")
        self.au_fil(lg)
        for k, (a, b, c) in enumerate((("12", "8", "20"), ("20", "4", "24"))):
            l = self.ligne([(a, BLEU_D), ("+ " + b, BLEU_D), ("= " + c, BLEU_D)], 36, buff=0.26)
            hors_audit(l[0])
            gauche(l, -0.8, 0.75 - 0.7 * k)
            self.au_mot("Plus " + b)
            self.play(FadeIn(l[0:2], shift=UP * 0.08), run_time=0.22)
            self.au_fil(l, 2)
        self.play(Create(bord_morceaux(2, 4, c0, e, sw=9)), run_time=0.5)
        self.add(po)
        self.au_mot("Moins la porte")
        lp = self.ligne([("Moins la porte :", PORTE), ("24", BLEU_D), ("− 1", BLEU_D), ("= 23.", BLEU_D)], 36,
                        buff=0.26)
        gauche(lp, -0.8, -0.75)
        self.play(FadeIn(lp[0], shift=UP * 0.08), Indicate(po, color=PORTE, scale_factor=1.3), run_time=0.3)
        self.aux_extraits(lp[1:], ["24 moins", "1, 23", "23. Il"])
        self.au_mot("Il faut")
        g = self.gros("Il faut 23 m de grillage.", fs=32)
        hors_audit(g)  # 23 : déjà dit et écrit juste au-dessus
        gauche(g, -0.8, -1.6)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        en = enclos(6, 3, P(-0.5, 0.8), 0.45)
        po = porte(en, 3.5, 5, 0.45)
        cs, gr, cl = carres_colles(2, 2, P(-0.5, -1.0), 0.45, remplir="#78350f")
        t1 = en.contour(sw=7)
        t2 = bord_morceaux(2, 2, P(-0.5, -1.0), 0.45, sw=7)
        fig = VGroup(en, cs, cl, t1, t2, po)
        lignes = self.finale_gauche(fig, textes=[
            ("Avec une porte : on calcule tout", "le tour, puis on enlève la porte."),
            ("Avec des figures collées : les côtés", "collés sont dedans, on ne les compte pas."),
            ("Un défi, c'est une étape", "après l'autre.")], fs=30, x_fig=-4.9, xl=-2.7)
        self.remove(t1, t2, cl)
        self.add(en, cs, po)
        self.au_mot("Avec une porte")
        self.montrer_ligne(lignes[0], Create(t1))
        self.add(po)
        self.au_mot("Avec des figures")
        self.montrer_ligne(lignes[1], Create(cl))
        self.au_mot("Un défi")
        self.montrer_ligne(lignes[2], Create(t2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tour()
        self.ecran_porte()
        self.ecran_question1()
        self.ecran_colles()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreDefiCE2(PerimetreDefiBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "bleue"
