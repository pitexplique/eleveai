# vision_patron_pave.py
# EleveAI — Maths 6e — série « Volume et solides », épisode S3 : LE PATRON D'UN PAVÉ DROIT
# (micro patron_pave_dimensions), notion vision_espace.
# Paysage 16:9, CEINTURE VERTE, avec voix (manim/voix/6e-vision-patron-pave.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (couvercle d'une boîte 10 × 6 × 4 : 10 sur 6, réponse C).
# Métier : Jeanne, DESIGNER D'EMBALLAGES (boîte de céréales 20 × 8 × 30 ; boîte à chaussures 30 × 20 × 10) ;
# centres : art-design.
# Mapping micro → écrans : patron_pave_dimensions → 01 (la boîte se déplie à plat), 02 (6 rectangles,
# par paires, 3 sortes), 03 (chaque face prend deux des trois mesures : 20 sur 30, 8 sur 30, 20 sur 8),
# 04 (la bande devant, côté, derrière, côté + dessus et dessous ; bords de même longueur), 06 (piège :
# un bord trop court, la boîte ne se ferme pas ; on vérifie chaque pli) ; questions 05 (boîte 10 × 4 × 6,
# face du dessus : 10 sur 4, rép. B) et 07 (combien de faces de 8 sur 30 : 2, rép. A) ; défi 08 (boîte à
# chaussures 30 × 20 × 10 : 30 sur 20, 30 sur 10, 20 sur 10 ; 6 faces, 3 paires).
# Outil ici : PatronBoite (la boîte en bande, PatronLibre de solides_cm1_commun) qui se plie VERS
# L'ARRIÈRE, la face de devant restant face à nous : pliée, c'est la boîte en cavalière.
# Audit : bash <notes>/outils/dry.sh vision_patron_pave VisionPatronPave6e
# HD : bash <notes>/outils/hd.sh vision_patron_pave VisionPatronPave6e eleveai-maths-6e-vision-patron-pave manim/sorties/6e/maths/vision-espace/03-patron-pave
# Sortie : manim/sorties/6e/maths/vision-espace/03-patron-pave/eleveai-maths-6e-vision-patron-pave.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

DEV_C = "#f97316"    # devant et derrière (orange)
COTE_C = "#a78bfa"   # les deux côtés (violet)
DESS_C = "#22c55e"   # dessus et dessous (vert)
CEREALE = "#fbbf24"
CHAUSS = "#60a5fa"
PAIRES = {"dev": DEV_C, "der": DEV_C, "c1": COTE_C, "c2": COTE_C, "des": DESS_C, "sous": DESS_C}
NOMS = {"dev": "devant", "c1": "côté", "der": "derrière", "c2": "côté", "des": "dessus", "sous": "dessous"}


def patron_bande(L, l, h):
    """Le patron « en bande » : devant | côté | derrière | côté, le dessus en haut du devant,
    le dessous en bas. Coordonnées (x, z) du plan de la table, en cm."""
    pieces = {"dev": [(0, 0), (L, 0), (L, h), (0, h)],
              "c1": [(L, 0), (L + l, 0), (L + l, h), (L, h)],
              "der": [(L + l, 0), (2 * L + l, 0), (2 * L + l, h), (L + l, h)],
              "c2": [(2 * L + l, 0), (2 * L + 2 * l, 0), (2 * L + 2 * l, h), (2 * L + l, h)],
              "des": [(0, h), (L, h), (L, h + l), (0, h + l)],
              "sous": [(0, -l), (L, -l), (L, 0), (0, 0)]}
    par = {"dev": None, "c1": "dev", "der": "c1", "c2": "der", "des": "dev", "sous": "dev"}
    return pieces, par


PLI = {k: 90 for k in ("c1", "der", "c2", "des", "sous")}
A_PLAT = {k: 0 for k in PLI}


class PatronBoite(PatronLibre):
    """La boîte L × l × h en bande. Le DEVANT reste face à nous (tilt −90) ; les autres faces se
    plient vers l'arrière (sens −1). plie=True : déjà fermée (la boîte en cavalière)."""

    def __init__(self, L, l, h, e=0.1, centre=ORIGIN, couleur=CARTON, couleurs=None, op=0.95, plie=False,
                 pieces=None, parents=None):
        self.op = op
        pc, par = (pieces, parents) if pieces else patron_bande(L, l, h)
        super().__init__(pc, par, e=e, centre=centre, couleur=couleur, sens=-1, couleurs=couleurs)
        if plie:
            self.angles.update({k: 90 for k in self.angles if self.par[k] is not None})
            self.maj()

    def piece(self, nom, couleur=None, opacite=None):
        return super().piece(nom, couleur, self.op if opacite is None else opacite)

    def plat(self, nom, couleur=None, op=None):
        """Une copie de la pièce (pour la faire paraître seule)."""
        return self.piece(nom, couleur, op)

    def poser(self, centre):
        """La boîte (pliée ou non) centrée en `centre` ; la suite du pliage part de là."""
        self.move_to(centre)
        self.recaler()
        self.maj()
        return self

    def etiquette(self, nom, texte, fs=24, couleur="#1e293b", rot=False):
        t = Text(texte, font_size=fs, color=couleur, weight=BOLD)
        if rot:
            t.rotate(PI / 2)
        c = self.coins(nom)
        larg = max(p[0] for p in c) - min(p[0] for p in c)
        haut = max(p[1] for p in c) - min(p[1] for p in c)
        if t.width > 0.82 * larg:
            t.scale_to_fit_width(0.82 * larg)
        if t.height > 0.7 * haut:
            t.scale_to_fit_height(0.7 * haut)
        return t.move_to(self.centre_carre(nom))

    def bord(self, nom, i, j, couleur=JAUNE_TITRE, sw=10):
        c = self.coins(nom)
        return Line(c[i], c[j], color=couleur, stroke_width=sw)


def recolorer(pa, couleurs):
    pa.couleurs.update(couleurs)
    pa.maj()


class VisionPatronPaveBase(PaysageVolume6e):
    nom_voix = "6e-vision-patron-pave"
    fichier_marques = "vision_patron_pave_marques.json"

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le patron d'un pavé droit", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le patron d'un pavé droit")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Quelles mesures donner", "à chaque face, pour que", "la boîte se ferme ?"], 36, JAUNE_TITRE)
        gauche(q, -6.2, 0.6)
        pa = PatronBoite(20, 8, 30, e=0.055, centre=P(3.7, 0.55), couleurs=PAIRES)
        self.au_mot("Quelles mesures donner")
        self.play(FadeIn(q[0], shift=UP * 0.1), FadeIn(pa), run_time=0.5)
        self.au_mot("à chaque face")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la boîte se ferme")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.play(pa.plier(PLI, run_time=1.0))
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        jp = jeanne(1.0).move_to(P(-5.2, 0.5))
        self.au_mot("Voici Jeanne")
        nom = self.t("Jeanne", 40, BLEU_CALCUL).next_to(jp, UP, buff=0.2)
        self.play(FadeIn(jp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est designer d'emballages")
        met = self.bloc(["designer", "d'emballages"], 28, BLEU_CALCUL).next_to(jp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        pa = PatronBoite(20, 8, 30, e=0.1, centre=P(0.5, 0.3), couleur=CEREALE, plie=True)
        logo = VGroup(Text("Céréales", font_size=26, color="#7c2d12", weight=BOLD),
                      Circle(radius=0.32, fill_color="#f59e0b", fill_opacity=1, stroke_color="#7c2d12",
                             stroke_width=3)).arrange(DOWN, buff=0.2).move_to(pa.centre_carre("dev"))
        hors_audit(logo)  # « Céréales » est dit après l'apparition de la boîte : pas d'attente
        self.au_mot("Elle invente la boîte")
        self.play(FadeIn(pa, shift=UP * 0.2), FadeIn(logo), run_time=0.5)
        d = pa.coins("dev")
        c = pa.coins("c1")
        c_long = fleche_cote(d[0] + DOWN * 0.25, d[1] + DOWN * 0.25, "20 cm", 30, LONG_C, DOWN, 0.12)
        dv = (c[1] - c[0]) / np.linalg.norm(c[1] - c[0])
        nrm = np.array([dv[1], -dv[0], 0])
        c_larg = fleche_cote(c[0] + nrm * 0.25, c[1] + nrm * 0.25, "8 cm", 30, LONG_C, RIGHT, 0.12)
        c_larg[1].next_to(c_larg[0].get_center(), RIGHT, buff=0.25).shift(DOWN * 0.15)
        c_haut = fleche_cote(d[0] + LEFT * 0.25, d[3] + LEFT * 0.25, "30 cm", 30, LONG_C, LEFT, 0.12)
        self.au_mot("20 centimètres de long")
        self.play(GrowFromCenter(c_long), run_time=0.35)
        self.au_mot("8 de large")
        self.play(GrowFromCenter(c_larg), run_time=0.35)
        self.au_mot("30 de haut")
        self.play(GrowFromCenter(c_haut), run_time=0.35)
        self.au_mot("Avant de l'imprimer")
        self.play(FadeOut(VGroup(c_long, c_larg, c_haut, logo)), run_time=0.3)
        self.au_mot("son patron")
        ap = self.t("Son patron, à plat", 36, JAUNE_TITRE).move_to(P(1.6, 3.15))
        self.play(pa.plier(A_PLAT, run_time=1.0), FadeIn(ap, shift=DOWN * 0.1))
        self.attendre_voix()

    # ── 02 : 6 faces, par paires ────────────────────────────────────────────
    def ecran_six(self):
        self.ecran("02-six")
        pa = PatronBoite(20, 8, 30, e=0.085, centre=P(-3.4, -0.1), couleur=CEREALE)
        self.add(pa)
        x = 0.4
        l1 = self.ligne([("Un pavé droit a", WHITE), ("6 faces,", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l1, x, 2.7)
        nums = VGroup(*[hors_audit(Text(str(k + 1), font_size=34, color="#1e293b", weight=BOLD)
                                   .move_to(pa.centre_carre(n))) for k, n in enumerate(NOMS)])
        self.au_mot("Un pavé droit")
        self.play(FadeIn(l1[0]), run_time=0.3)
        self.au_mot("6 faces")
        self.play(FadeIn(l1[1]), LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.12), run_time=0.8)
        self.au_mot("toutes des rectangles")
        l2 = self.t("toutes des rectangles.", 34)
        gauche(l2, x, 2.05)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("par paires")
        l3 = self.t("Par paires :", 34, JAUNE_TITRE)
        gauche(l3, x, 1.2)
        recolorer(pa, {"dev": DEV_C, "der": DEV_C})
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(nums), Indicate(pa, color=DEV_C, scale_factor=1.02),
                  run_time=0.35)
        self.au_mot("deux faces pareilles")
        l4 = self.t("deux faces pareilles,", 32)
        gauche(l4, x, 0.55)
        recolorer(pa, {"c1": COTE_C, "c2": COTE_C, "des": DESS_C, "sous": DESS_C})
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(pa, color=WHITE, scale_factor=1.02), run_time=0.35)
        self.au_mot("l'une en face de l'autre")
        l5 = self.t("l'une en face de l'autre.", 32)
        gauche(l5, x, -0.05)
        pa.op = 0.6
        pa.maj()
        self.play(FadeIn(l5, shift=UP * 0.1), pa.plier(PLI, run_time=1.1))
        self.au_mot("Il y a donc 3 sortes")
        l6 = self.t("3 sortes de rectangles :", 34, JAUNE_TITRE)
        gauche(l6, x, -0.85)
        k = 0.05
        rects = VGroup()
        for (w, hh, col) in ((20, 30, DEV_C), (8, 30, COTE_C), (20, 8, DESS_C)):
            r = Rectangle(width=w * k, height=hh * k, fill_color=col, fill_opacity=0.9, stroke_color="#78350f",
                          stroke_width=3)
            r2 = r.copy().shift(P(0.12, 0.12)).set_fill(opacity=0.45)
            rects.add(VGroup(r2, r))
        rects.arrange(RIGHT, buff=0.45, aligned_edge=DOWN)
        rects.move_to(P(x + 1.9, -2.3)).align_to(P(x, 0), LEFT)
        self.play(FadeIn(l6, shift=UP * 0.1), LaggedStart(*[FadeIn(r, scale=0.7) for r in rects], lag_ratio=0.25),
                  run_time=0.8)
        self.attendre_voix()

    # ── 03 : les mesures de chaque face ─────────────────────────────────────
    def cotes_boite(self, pa, fs=28, couleur=LONG_C):
        d, c = pa.coins("dev"), pa.coins("c1")
        a = fleche_cote(d[0] + DOWN * 0.22, d[1] + DOWN * 0.22, "20", fs, couleur, DOWN, 0.1)
        dv = (c[1] - c[0]) / np.linalg.norm(c[1] - c[0])
        nrm = np.array([dv[1], -dv[0], 0])
        b = fleche_cote(c[0] + nrm * 0.22, c[1] + nrm * 0.22, "8", fs, couleur, RIGHT, 0.1)
        b[1].next_to(b[0].get_center(), RIGHT, buff=0.22).shift(DOWN * 0.12)
        h = fleche_cote(d[0] + LEFT * 0.22, d[3] + LEFT * 0.22, "30", fs, couleur, LEFT, 0.1)
        return VGroup(a, b, h)

    def ecran_mesures(self):
        self.ecran("03-mesures")
        pa = PatronBoite(20, 8, 30, e=0.09, couleur=CEREALE, plie=True).poser(P(-4.3, 0.3))
        cotes = hors_audit(self.cotes_boite(pa))
        self.add(pa, cotes)
        k = 0.05
        # « a sur » puis « b », chacun à SON extrait ; un nombre déjà dit dans la clé (2e « 30 »,
        # 2e « 20 », 2e « 8 ») est hors audit (l'audit compare au 1er).
        rangs = [("dev", "Devant et derrière :", ("20 sur", "30"), 20, 30, DEV_C, 2.15,
                  ["Le devant et le derrière", ("20 sur", 1), ("30.", 1)], ()),
                 ("c1", "Les deux côtés :", ("8 sur", "30"), 8, 30, COTE_C, 0.25,
                  ["Les deux côtés", ("8 sur", 1), ("30.", 2)], (1,)),
                 ("des", "Dessus et dessous :", ("20 sur", "8"), 20, 8, DESS_C, -1.3,
                  ["Le dessus et le dessous", ("20 sur", 2), ("8.", 1)], (0, 1))]
        xr, xt = -1.1, 0.3
        for nom, titre, mes, w, hh, col, y, (m0, m1, m2), deja in rangs:
            r = Rectangle(width=w * k, height=hh * k, fill_color=col, fill_opacity=0.9, stroke_color=WHITE,
                          stroke_width=3).move_to(P(xr, y))
            t0 = self.t(titre, 30, col)
            gauche(t0, xt, y + 0.3)
            t1 = self.ligne([(mes[0], WHITE), (mes[1], WHITE)], 38, buff=0.18)
            gauche(t1, xt, y - 0.3)
            for i in deja:
                hors_audit(t1[i])
            ct = pa.contour_carre(nom, col, 8)
            self.au_mot(m0)
            self.play(FadeIn(t0, shift=UP * 0.1), FadeIn(r, scale=0.7), Create(ct), run_time=0.4)
            self.aux_extraits(t1, [m1, m2])
        self.au_mot("Chaque face prend")
        g = self.gros("Chaque face prend deux des trois mesures.", couleur=JAUNE_TITRE, fs=30)
        g.move_to(P(-0.6, -2.75))
        self.play(FadeIn(g, scale=1.1), Indicate(cotes, color=WHITE), run_time=0.5)
        self.attendre_voix()

    # ── 04 : assembler le patron ────────────────────────────────────────────
    def ecran_assembler(self):
        self.ecran("04-assembler")
        self.au_mot("Sur le patron")
        tit = self.ligne([("Sur le patron :", JAUNE_TITRE), ("les 4 faces du tour en bande", WHITE)], 34, buff=0.2)
        gauche(tit, -6.2, 3.1)
        self.play(FadeIn(tit[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(tit[1], shift=UP * 0.1), run_time=0.3)
        pa = PatronBoite(20, 8, 30, e=0.095, centre=P(-2.6, -0.15), couleurs=PAIRES)
        copies = {}
        for n in NOMS:
            pc = pa.plat(n)
            et = pa.etiquette(n, NOMS[n], 24 if n in ("c1", "c2") else 28, rot=n in ("c1", "c2"))
            copies[n] = VGroup(pc, et)
        mots = [("dev", "devant", 1), ("c1", "côté", 1), ("der", "derrière", 1), ("c2", "côté", 2)]
        for n, m, occ in mots:
            self.au_mot(m, occ)
            self.play(FadeIn(copies[n], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Le dessus")
        self.play(FadeIn(copies["des"], shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("le dessous")
        self.play(FadeIn(copies["sous"], shift=UP * 0.2), run_time=0.35)
        self.au_mot("Deux faces qui se touchent")
        x = 3.0
        l1 = self.bloc(["Deux faces qui", "se touchent :"], 32)
        gauche(l1, x, 1.6)
        b1 = pa.bord("dev", 1, 2)
        b2 = pa.bord("dev", 2, 3)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(b1), Create(b2), run_time=0.4)
        self.au_mot("un bord de même longueur")
        l2 = self.bloc(["un bord de", "même longueur."], 32, JAUNE_TITRE)
        gauche(l2, x, 0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(VGroup(b1, b2), color=WHITE), run_time=0.45)
        self.remove(*copies.values())
        self.add(pa)
        self.bring_to_front(b1, b2)
        self.play(FadeOut(VGroup(b1, b2)), run_time=0.2)
        self.play(pa.plier(PLI, run_time=1.2))
        self.wait(0.8)  # la boîte refermée reste à l'écran
        self.attendre_voix(marge=0.4)

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pa = PatronBoite(10, 4, 6, e=0.24, couleur=CARTON, plie=True).poser(P(-3.8, 1.65))
        d, c = pa.coins("dev"), pa.coins("c1")
        dv = (c[1] - c[0]) / np.linalg.norm(c[1] - c[0])
        nrm = np.array([dv[1], -dv[0], 0])
        cotes = VGroup(fleche_cote(d[0] + DOWN * 0.22, d[1] + DOWN * 0.22, "10 cm", 26, LONG_C, DOWN, 0.1),
                       fleche_cote(c[0] + nrm * 0.22, c[1] + nrm * 0.22, "4 cm", 26, LONG_C, RIGHT, 0.1),
                       fleche_cote(d[0] + LEFT * 0.22, d[3] + LEFT * 0.22, "6 cm", 26, LONG_C, LEFT, 0.1))
        cotes[1][1].next_to(cotes[1][0].get_center(), RIGHT, buff=0.2).shift(DOWN * 0.1)
        hors_audit(cotes)
        qd = Text("?", font_size=30, color=DESS_C, weight=BOLD).move_to(pa.centre_carre("des"))
        hors_audit(qd)

        def autres_q(sc):
            sc.play(FadeIn(pa, shift=UP * 0.2), FadeIn(cotes), run_time=0.35)
            sc.play(Create(pa.contour_carre("des", DESS_C, 7)), FadeIn(qd), run_time=0.3)

        def apres(sc):
            dessus = Rectangle(width=10 * 0.16, height=4 * 0.16, fill_color=DESS_C, fill_opacity=0.9,
                               stroke_color=WHITE, stroke_width=3).move_to(P(-4.6, -0.4))
            et = hors_audit(VGroup(Text("10", font_size=24, color=WHITE).next_to(dessus, DOWN, buff=0.08),
                                   Text("4", font_size=24, color=WHITE).next_to(dessus, RIGHT, buff=0.1)))
            lg0 = sc.rep_bas(0, [("Le dessus : longueur et largeur,", VERT_OK)], fs=30, y0=-1.35, pas=0.6)
            sc.au_mot("Le dessus prend")
            sc.play(FadeIn(lg0), run_time=0.3)
            lg1 = sc.rep_bas(1, [("10 sur", VERT_OK), ("4.", VERT_OK)], fs=30, y0=-1.35, pas=0.6)
            lg1[1].shift(LEFT * 0.09)  # une seule espace entre « sur » et le nombre
            sc.aux_extraits([VGroup(lg1[0], dessus), VGroup(lg1[1], et)], [("10 sur", 1), "4. La"])
            lg2 = sc.rep_bas(2, [("La hauteur ne se voit pas d'en haut.", VERT_OK)], fs=30, y0=-1.35, pas=0.6)
            sc.au_mot("La hauteur ne se voit")
            sc.play(FadeIn(lg2), Indicate(cotes[2], color=WHITE), run_time=0.35)
            lg3 = sc.rep_bas(3, [("10 sur", ORANGE_RETENUE), ("6, c'est le devant.", ORANGE_RETENUE)], fs=30,
                             y0=-1.35, pas=0.6)
            lg3[1].shift(LEFT * 0.09)
            hors_audit(lg3[0])  # le 2e « 10 » de la clé
            sc.aux_extraits([lg3[0], VGroup(lg3[1], pa.contour_carre("dev", ORANGE_RETENUE, 7))],
                            [("10 sur", 2), "6, c'est"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Une boîte : 10 cm de long,", "4 cm de large, 6 cm de haut.",
                             "Quelles sont les mesures", "de sa face du dessus ?"],
                            [self.choix("10 sur 6"), self.choix("10 sur 4"), self.choix("4 sur 6")], 1,
                            ["Le dessus : longueur et largeur,", "10 sur 4.", "La hauteur ne se voit pas d'en haut.",
                             "10 sur 6, c'est le devant."],
                            mot_q="Une boîte mesure", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        # un patron raté : le côté ne fait que 22 de haut au lieu de 30
        pieces = {"dev": [(0, 0), (20, 0), (20, 22), (20, 30), (0, 30)],
                  "c1": [(20, 0), (28, 0), (28, 22), (20, 22)]}
        rate = PatronBoite(0, 0, 0, e=0.085, centre=P(-4.3, -0.2), couleurs=PAIRES, pieces=pieces,
                           parents={"dev": None, "c1": "dev"})
        x = -1.6
        self.au_mot("Deux faces qui se plient")
        l1 = self.bloc(["Deux faces qui se plient", "l'une contre l'autre :"], 32)
        gauche(l1, x, 2.05)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(rate), run_time=0.4)
        self.au_mot("doivent avoir un bord")
        l2 = self.t("un bord de même longueur.", 32, JAUNE_TITRE)
        gauche(l2, x, 1.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.bloc(["Les bords ne collent pas :", "la boîte ne se ferme pas !"], 30, ROUGE_ERREUR)
        gauche(l3, -6.3, -2.75)
        self.au_mot("Si les bords ne collent pas")
        self.play(rate.plier({"c1": 90}, run_time=0.9), FadeIn(l3[0], shift=UP * 0.1))
        d = rate.coins("dev")
        trou = Line(d[2], d[3], color=ROUGE_ERREUR, stroke_width=12)
        self.au_mot("la boîte ne se ferme pas")
        self.play(Create(trou), FadeIn(l3[1], shift=UP * 0.1), run_time=0.4)
        self.play(Indicate(trou, color=ROUGE_ERREUR, scale_factor=1.3), run_time=0.4)
        bon = PatronBoite(20, 8, 30, e=0.05, centre=P(2.7, -0.75), couleurs=PAIRES)
        ch = bon.charnieres(JAUNE_TITRE, 6)
        coches = VGroup(*[self.coche(VERT_OK, 0.2).move_to(seg.get_center()) for seg in ch])
        self.au_mot("On vérifie chaque pli")
        l4 = self.t("On vérifie chaque pli.", 30, VERT_OK).move_to(P(2.4, -2.75))
        self.play(FadeIn(bon), FadeIn(l4, shift=UP * 0.1), Create(ch), run_time=0.4)
        self.play(LaggedStart(*[Create(c) for c in coches], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pa = PatronBoite(20, 8, 30, e=0.08, couleur=CEREALE, op=0.75, plie=True).poser(P(-4.4, 1.05))
        cotes = hors_audit(self.cotes_boite(pa, fs=24))

        def autres_q(sc):
            sc.play(FadeIn(pa, shift=UP * 0.2), FadeIn(cotes), run_time=0.35)

        def apres(sc):
            lg0 = sc.rep_bas(0, [("Les faces vont par paires.", VERT_OK)], fs=30, y0=-1.5, pas=0.6)
            sc.au_mot("Les faces vont par paires")
            sc.play(FadeIn(lg0), run_time=0.3)
            lg1 = sc.rep_bas(1, [("Les deux côtés font", VERT_OK), ("8 sur", VERT_OK), ("30 :", VERT_OK)], fs=30,
                             y0=-1.5, pas=0.6)
            c1 = pa.contour_carre("c1", COTE_C, 8)
            c2 = DashedVMobject(pa.contour_carre("c2", COTE_C, 7), num_dashes=30)
            sc.au_mot("Les deux côtés")
            sc.play(FadeIn(lg1[0]), Create(c1), Create(c2), run_time=0.4)
            sc.aux_extraits(lg1[1:], ["8 sur", "30 :"])
            lg2 = sc.rep_bas(2, [("il y en a", VERT_OK), ("2.", VERT_OK)], fs=30, y0=-1.5, pas=0.6)
            sc.au_mot("il y en a")
            sc.play(FadeIn(lg2[0]), run_time=0.2)
            sc.aux_extraits([lg2[1]], ["2."])
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Combien de faces de", "8 sur 30 a la boîte", "de céréales de Jeanne ?"],
                            [self.choix("2 faces"), self.choix("4 faces"), self.choix("1 face")], 0,
                            ["Les faces vont par paires.", "Les deux côtés font 8 sur 30 :", "il y en a 2."],
                            mot_q="Combien de faces", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def boite_chaussures(self, centre, e=0.1, plie=True):
        return PatronBoite(30, 20, 10, e=e, centre=centre, couleur=CHAUSS, plie=plie)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pa = self.boite_chaussures(ORIGIN, e=0.1).poser(P(-3.2, 0.9))
        self.au_mot("Une boîte à chaussures")
        l0 = self.t("Une boîte à chaussures :", 32)
        gauche(l0, -6.2, 2.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pa, shift=UP * 0.2), run_time=0.4)
        d, c = pa.coins("dev"), pa.coins("c1")
        dv = (c[1] - c[0]) / np.linalg.norm(c[1] - c[0])
        nrm = np.array([dv[1], -dv[0], 0])
        c_long = fleche_cote(d[0] + DOWN * 0.22, d[1] + DOWN * 0.22, "30 cm", 28, LONG_C, DOWN, 0.1)
        c_larg = fleche_cote(c[0] + nrm * 0.22, c[1] + nrm * 0.22, "20 cm", 28, LONG_C, RIGHT, 0.1)
        c_larg[1].next_to(c_larg[0].get_center(), RIGHT, buff=0.3).shift(DOWN * 0.15)
        c_haut = fleche_cote(d[0] + LEFT * 0.22, d[3] + LEFT * 0.22, "10 cm", 28, LONG_C, LEFT, 0.1)
        self.au_mot("30 centimètres de long")
        self.play(GrowFromCenter(c_long), run_time=0.3)
        self.au_mot("20 de large")
        self.play(GrowFromCenter(c_larg), run_time=0.3)
        self.au_mot("10 de haut")
        self.play(GrowFromCenter(c_haut), run_time=0.3)
        self.au_mot("Donne les mesures")
        q = self.ligne([("Donne les mesures de ses", JAUNE_TITRE), ("6 faces.", JAUNE_TITRE)], 34, buff=0.2)
        gauche(q, -6.2, -1.25)
        cases = VGroup(*[VGroup(RoundedRectangle(width=1.7, height=0.62, corner_radius=0.1, stroke_color=JAUNE_TITRE,
                                                 stroke_width=3),
                                Text("? sur ?", font_size=24, color=JAUNE_TITRE)) for _ in range(6)])
        for cs in cases:
            cs[1].move_to(cs[0])
        cases.arrange_in_grid(3, 2, buff=(0.25, 0.2)).move_to(P(3.3, 1.0))
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 faces")
        self.play(FadeIn(q[1], shift=UP * 0.1), LaggedStart(*[FadeIn(cs, scale=0.8) for cs in cases], lag_ratio=0.1),
                  run_time=0.6)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(-1.6, -2.3))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.25))
        pa = PatronBoite(30, 20, 10, e=0.062, centre=P(-0.6, 0.75), couleur=CHAUSS)
        pa.angles.update(PLI)
        pa.maj()
        self.add(pa)
        self.play(Write(tit, run_time=0.35), pa.plier(A_PLAT, run_time=0.75))
        # « a sur » puis « b », chacun à SON extrait ; un nombre déjà dit dans la clé : hors audit.
        rangs = [(("des", "sous"), ("30 sur", "20"), DESS_C, "Dessus et dessous :", "Le dessus et le dessous",
                  [("30 sur", 1), ("20.", 1)], ()),
                 (("dev", "der"), ("30 sur", "10"), DEV_C, "Devant et derrière :", "Le devant et le derrière",
                  [("30 sur", 2), ("10.", 1)], (0,)),
                 (("c1", "c2"), ("20 sur", "10"), COTE_C, "Les deux côtés :", "Les deux côtés",
                  [("20 sur", 1), ("10.", 2)], (0, 1))]
        y = -1.45
        for (n1, n2), mes, col, titre, m0, mots, deja in rangs:
            t0 = self.t(titre, 30, col)
            gauche(t0, -6.2, y)
            t1 = self.ligne([(mes[0], WHITE), (mes[1], WHITE)], 32, buff=0.16)
            gauche(t1, -1.8, y)
            for i in deja:
                hors_audit(t1[i])
            et = hors_audit(VGroup(*[pa.etiquette(n, f"{mes[0]} {mes[1]}", 20) for n in (n1, n2)]))
            self.au_mot(m0)
            recolorer(pa, {n1: col, n2: col})
            for m in t0.get_family():  # posé au début de sa phrase : sinon il attend « derrière » et le nombre arrive tard
                m.sans_synchro = True
            self.play(FadeIn(t0, shift=UP * 0.1), Indicate(pa, color=col, scale_factor=1.01), run_time=0.25)
            g2 = VGroup(t1[1], et)
            g2._bloc = True  # sinon la synchro découpe les étiquettes « 30 sur 10 » en morceaux (« 30 sur ») : TARD
            self.aux_extraits([t1[0], g2], mots)
            y -= 0.62
        self.au_mot("6 faces")
        g = self.ligne([("6 faces,", VERT_OK), ("3 paires.", VERT_OK)], 38, buff=0.25)
        g.move_to(P(2.9, -1.8))  # entre les mesures (x < 0,4) et Ti Margo (x > 5,5)
        self.aux_extraits(g, ["6 faces", "3 paires"])
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pa = PatronBoite(20, 8, 30, e=0.06, couleurs=PAIRES)
        lignes = self.finale_gauche(pa, textes=[
            ("Le patron d'un pavé droit a", "6 rectangles, pareils deux par deux."),
            ("Chaque face prend deux", "des trois mesures."),
            ("Deux faces qui se plient ensemble", "ont un bord de même longueur.")], fs=30, x_fig=-4.6, xl=-2.6)
        pa.recaler()
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(pa)
        self.au_mot("Le patron d'un pavé droit")
        self.montrer_ligne(lignes[0])
        self.au_mot("Chaque face prend")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deux faces qui se plient")
        self.montrer_ligne(lignes[2])
        self.play(pa.plier(PLI, run_time=1.2))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_six()
        self.ecran_mesures()
        self.ecran_assembler()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class VisionPatronPave6e(VisionPatronPaveBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"

