# contenance_convertir.py
# EleveAI — Maths CM1 — série « Contenance », épisode 02 : CONVERTIR DES CONTENANCES
# (micro contenance_convertir, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (le sirop et la cuillère de 5 mL, réponse A).
# Décor et métier : Sofia, PÂTISSIÈRE (centres : cuisine, sciences).
# Mapping micro → écrans : 02 (les trois égalités : 1 L = 100 cL = 1000 mL, 1 cL = 10 mL),
# 03 (L → cL : × 100), 04 (cL → mL : × 10), 04b (vers le litre : on divise), 06 (piège : 3 L ≠ 300 mL),
# questions 05 (3 L en mL, B) et 07 (600 cL en L, C), défi 08 (1 L − 25 cL).
# Voix : manim/voix/cm1-contenance-convertir.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_convertir_marques.json (python manim/scripts/cm1/aire_marques.py contenance:convertir).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/contenance_convertir.py ContenanceConvertirCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/contenance_convertir.py ContenanceConvertirCM1 -o eleveai-maths-cm1-contenance-convertir --media_dir manim/scripts/cm1/media-contenance-02
# Sortie : manim/sorties/cm1/maths/contenance/02-convertir/eleveai-maths-cm1-contenance-convertir.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F403

VANILLE = "#fde68a"
CREME = "#fef3c7"


def bouteille(h=2.0, couleur=LAIT, larg=0.85, niveau=0.85):
    return recipient("bouteille", h, larg, niveau, couleur)


def doseur(h=2.2, larg=1.3, niveau=0.0, couleur=LAIT, n=10):
    """Le verre doseur de la pâtissière : un pichet gradué (n traits, sans nombres) et « cL » sur le côté."""
    r = recipient("pichet", h, larg, niveau, couleur)
    c = r.corps
    traits = VGroup()
    for k in range(1, n):
        y = c.get_bottom()[1] + c.height * k / n
        lg = 0.28 if k % 5 == 0 else 0.16
        traits.add(Line(P(c.get_left()[0] + 0.05, y), P(c.get_left()[0] + 0.05 + lg, y), color=GRAY_B,
                        stroke_width=3))
    u = hors_audit(Text("cL", font_size=24, color=GRAY_B, weight=BOLD)).next_to(c, DOWN, buff=0.12)
    r.add(traits, u)
    r.traits = traits
    return r


def bol(larg=1.4, couleur=CREME):
    """Un bol (vu de côté) avec un fond de crème."""
    coque = ArcBetweenPoints(P(-larg / 2, 0), P(larg / 2, 0), angle=PI, color=VERRE, stroke_width=4)
    fond = Polygon(P(-larg * 0.42, -0.12), P(larg * 0.42, -0.12), P(larg * 0.25, -larg * 0.38),
                   P(-larg * 0.25, -larg * 0.38), fill_color=couleur, fill_opacity=0.9, stroke_width=0)
    bord = Line(P(-larg / 2, 0), P(larg / 2, 0), color=VERRE, stroke_width=4)
    return VGroup(fond, coque, bord)


def resultat(morceaux, fs=58, couleur=VERT_OK):
    """Le résultat encadré (« 2 L = 200 cL »), en morceaux hors audit : ses nombres viennent d'être dits
    (un seul Text avec « = » serait découpé par la synchro et perdrait son drapeau)."""
    t = VGroup(*[hors_audit(Text(m, font_size=fs, color=couleur, weight=BOLD)) for m in morceaux])
    t.arrange(RIGHT, buff=0.25)
    return VGroup(SurroundingRectangle(t, color=couleur, buff=0.2, corner_radius=0.12, stroke_width=5), t)


class ContenanceConvertirBase(PaysageContenanceCM1):
    nom_voix = "cm1-contenance-convertir"
    fichier_marques = "contenance_convertir_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des contenances", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir des contenances")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("Combien de cL", WHITE), ("dans 2 L", JAUNE_TITRE)], 38, buff=0.2)
        q1 = self.t("de lait ?", 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        b = bouteille(2.4, LAIT, 1.0).move_to(P(3.0, 0.35))
        d = doseur(1.8, 1.1).next_to(b, RIGHT, buff=0.5).align_to(b, DOWN)
        self.au_mot("Combien de centilitres")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(b, scale=1.1), FadeIn(d, scale=1.1), run_time=0.3)
        self.au_mot("dans 2 litres")
        self.play(FadeIn(q0[1], shift=UP * 0.2), run_time=0.25)
        self.au_mot("de lait")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sofia, pâtissière ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = sofia(0.95).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Sofia")
        nom = self.t("Sofia", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("est pâtissière")
        met = self.t("pâtissière", 26, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        b = bouteille(2.4, LAIT, 1.0).move_to(P(-2.7, 0.2)).align_to(P(0, -1.1), DOWN)
        d = doseur(1.9, 1.15).move_to(P(-1.0, 0.0)).align_to(P(0, -1.1), DOWN)
        l1 = self.ligne([("Recette :", WHITE), ("2 L", JAUNE_TITRE), ("de lait.", JAUNE_TITRE)], 34, buff=0.2)
        l1.move_to(P(3.9, 1.7)).align_to(P(1.0, 0), LEFT)
        self.au_mot("Sa recette de crème")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("demande 2")
        eb = contenance(b, "2 L")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l1[1], shift=UP * 0.1), FadeIn(eb), run_time=0.3)
        self.au_mot("litres de lait")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        l2 = self.bloc(["Son verre doseur :", "en centilitres (cL)."], 32)
        l2.next_to(l1, DOWN, buff=0.4).align_to(l1, LEFT)
        self.au_mot("son verre doseur")
        self.play(FadeIn(d, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("gradué en centilitres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(d.traits, color=JAUNE_TITRE), run_time=0.5)
        self.au_mot("Combien de centilitres")
        q = self.t("Combien de cL verser ?", 38, JAUNE_TITRE).move_to(P(-0.2, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(b, d)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les trois égalités ─────────────────────────────────────────────
    def ecran_relations(self):
        self.ecran("02-relations")
        XP = 0.2
        b = bouteille(2.6, EAU, 1.1).move_to(P(-4.3, 0.1))
        self.add(b)
        self.au_mot("Retiens")
        l0 = self.t("Retiens trois égalités :", 36, JAUNE_TITRE)
        self.col(l0, 2.5, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 46, buff=0.3)
        self.col(l1, 1.45, XP)
        self.au_mot("Retiens trois égalités. 1 litre")
        eb = contenance(b, "1 L", 30)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(eb), run_time=0.3)
        self.au_mot("c'est 100")
        # 10 traits dans la bouteille : 10 parts de 10 cL
        c = b.corps
        tr = VGroup(*[Line(P(c.get_left()[0] + 0.08, c.get_bottom()[1] + c.height * k / 10),
                           P(c.get_left()[0] + 0.32, c.get_bottom()[1] + c.height * k / 10),
                           color=WHITE, stroke_width=3) for k in range(1, 10)])
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(tr), run_time=0.5)
        l2 = self.ligne([("1 L", BLEU_D), ("= 1000 mL", VERT_OK)], 46, buff=0.3)
        self.col(l2, 0.35, XP)
        self.au_mot("centilitres. 1 litre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 1000")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(b, color=VERT_OK, scale_factor=1.05), run_time=0.45)
        l3 = self.ligne([("1 cL", BLEU_D), ("= 10 mL", VERT_OK)], 46, buff=0.3)
        self.col(l3, -0.75, XP)
        self.au_mot("Et 1 centilitre")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 10 millilitres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        cadre = SurroundingRectangle(VGroup(l1, l2, l3), color=JAUNE_TITRE, buff=0.25, corner_radius=0.15)
        self.play(Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 03 : des litres vers les centilitres ────────────────────────────────
    def ecran_l_vers_cl(self):
        self.ecran("03-litres-vers-cl")
        XP = 0.4
        b1, b2 = bouteille(2.0, LAIT, 0.85), bouteille(2.0, LAIT, 0.85)
        g = rangee_recipients([b1, b2], 0.4).move_to(P(-4.6, 0.6))
        d = vider(doseur(3.0, 1.5, 0.85).move_to(P(-1.6, 0.25)))
        self.au_mot("vers les centilitres")
        l0 = self.ligne([("L → cL :", WHITE), ("× 100", ORANGE_RETENUE)], 44, buff=0.3)
        self.col(l0, 2.4, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("on multiplie par 100")
        self.play(FadeIn(l0[1], scale=1.3), run_time=0.2)
        l1 = self.ligne([("2 L :", BLEU_D), ("2 × 100", WHITE), ("= 200", VERT_OK)], 42, buff=0.25)
        self.col(l1, 1.2, XP)
        self.au_mot("2 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(g, shift=UP * 0.2), FadeIn(d), run_time=0.2)
        self.add(contenance(b1, "1 L", 24), contenance(b2, "1 L", 24))
        self.au_mot("2 fois 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("fois 100, 200")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.2)
        l2 = self.ligne([("Sofia verse", WHITE), ("200 cL", VERT_OK)], 40, buff=0.25)
        self.col(l2, -0.2, XP)
        self.au_mot("Sofia verse")
        self.play(FadeIn(l2[0], shift=UP * 0.1), b1.animate.set_opacity(0.35), b2.animate.set_opacity(0.35),
                  remplir(d, 0.4), run_time=0.4)
        self.au_mot("verse 200")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.25)
        res = resultat(["2 L", "=", "200 cL"])
        self.col(res, -1.4, XP)
        self.au_mot("centilitres de lait")
        self.play(FadeIn(res, scale=1.2), Indicate(d, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 04 : des centilitres vers les millilitres ───────────────────────────
    def ecran_cl_vers_ml(self):
        self.ecran("04-cl-vers-ml")
        XP = 0.4
        fl = recipient("bouteille", 1.3, 0.55, 0.8, VANILLE).move_to(P(-4.4, 0.4))
        cu = VGroup(*[Rectangle(width=0.3, height=0.42, fill_color=VANILLE, fill_opacity=0.9, stroke_color=VERRE,
                                stroke_width=2) for _ in range(5)]).arrange(RIGHT, buff=0.1).move_to(P(-2.2, -0.9))
        self.au_mot("vers les millilitres")
        l0 = self.ligne([("cL → mL :", WHITE), ("× 10", ORANGE_RETENUE)], 44, buff=0.3)
        self.col(l0, 2.4, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on multiplie par 10")
        self.play(FadeIn(l0[1], scale=1.3), run_time=0.35)
        l1 = self.bloc(["Sofia ajoute", "du sirop de vanille :"], 34)
        self.col(l1, 1.3, XP)
        self.au_mot("Sofia ajoute")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(fl, shift=UP * 0.2), run_time=0.35)
        self.au_mot("5 centilitres")
        ef = contenance(fl, "5 cL", 30, audit=True)
        self.play(FadeIn(ef), FadeIn(cu, lag_ratio=0.2), run_time=0.45)
        self.au_mot("sirop de vanille")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        l2 = self.ligne([("5 × 10", WHITE), ("= 50", VERT_OK)], 44, buff=0.25)
        self.col(l2, 0.0, XP)
        self.au_mot("5 fois 10")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("fois 10, 50")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.2)
        res = resultat(["5 cL", "=", "50 mL"])
        self.col(res, -1.2, XP)
        self.au_mot("50 millilitres")
        self.play(FadeIn(res, scale=1.2), Indicate(cu, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 04b : vers le litre, on divise ──────────────────────────────────────
    def ecran_vers_litres(self):
        self.ecran("04b-vers-litres")
        XP = -0.3
        l0 = self.ligne([("Vers le litre :", WHITE), ("on divise !", ORANGE_RETENUE)], 42, buff=0.25)
        self.col(l0, 2.5, XP)
        self.au_mot("revenir aux litres")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("on divise")
        self.play(FadeIn(l0[1], scale=1.2), run_time=0.2)
        trois = VGroup(*[bouteille(1.5, LAIT, 0.65) for _ in range(3)]).arrange(RIGHT, buff=0.25)
        trois.move_to(P(-4.4, 0.75))
        quatre = VGroup(*[bouteille(1.5, EAU, 0.6) for _ in range(4)]).arrange(RIGHT, buff=0.18)
        quatre.move_to(P(-4.4, -1.75))
        l1 = self.ligne([("300 cL", BLEU_D), ("÷ 100", ORANGE_RETENUE), ("= 3 L", VERT_OK)], 42, buff=0.25)
        self.col(l1, 1.2, XP)
        self.au_mot("on divise. 300")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("divisé par 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("par 100, 3")
        self.play(FadeIn(l1[2], scale=1.2), FadeIn(trois, lag_ratio=0.25), run_time=0.35)
        l2 = self.ligne([("4000 mL", BLEU_D), ("÷ 1000", ORANGE_RETENUE), ("= 4 L", VERT_OK)], 42, buff=0.25)
        self.col(l2, -1.3, XP)
        self.au_mot("litres. 4000")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("divisé par 1000")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.2)
        self.au_mot("par 1000, 4")
        self.play(FadeIn(l2[2], scale=1.2), FadeIn(quatre, lag_ratio=0.25), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = VGroup(*[bouteille(1.6, EAU, 0.7) for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Combien de millilitres", "dans 3 litres ?"],
                             [self.choix("300 mL"), self.choix("3000 mL"), self.choix("30 mL")], 1,
                             ["1 L = 1000 mL.", "3 × 1000 = 3000.", "3 L = 3000 mL."],
                             -0.75, mot_q="Combien de millilitres", autres_q=autres_q)

    # ── 06 : le piège (3 L n'est pas 300 mL) ────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        XP = 0.0
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        trois = VGroup(*[bouteille(1.5, EAU, 0.65) for _ in range(3)]).arrange(RIGHT, buff=0.25)
        trois.move_to(P(-4.4, 0.2))
        self.add(trois)
        l0 = self.ligne([("3 L", BLEU_D), ("≠ 300 mL", ROUGE_ERREUR)], 46, buff=0.3)
        self.col(l0, 2.0, XP)
        self.au_mot("piège ! 3 litres")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pas 300")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l0[1], 1.2, 0.2)
        l1 = self.ligne([("300,", JAUNE_TITRE), ("ce sont des cL.", WHITE)], 36, buff=0.2)
        self.col(l1, 1.1, XP)
        self.au_mot("millilitres. 300")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("ce sont des centilitres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("pour les cL :", WHITE), ("× 100", ORANGE_RETENUE)], 38, buff=0.25)
        self.col(l2, 0.1, XP)
        self.au_mot("Pour les centilitres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("on multiplie par 100")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("pour les mL :", WHITE), ("× 1000", ORANGE_RETENUE)], 38, buff=0.25)
        self.col(l3, -0.7, XP)
        self.au_mot("pour les millilitres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("par 1000")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        l4 = self.bloc(["Vérifie toujours", "vers quelle unité tu vas !"], 34, JAUNE_TITRE)
        self.col(l4, -1.95, XP)
        self.au_mot("Vérifie toujours")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.insister(l3[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = doseur(2.3, 1.3, 0.85, EAU).move_to(P(-3.8, 1.45))

        def autres_q(sc):
            sc.play(FadeIn(d), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Combien de litres", "font 600 centilitres ?"],
                             [self.choix("60 L"), self.choix("6000 L"), self.choix("6 L")], 2,
                             ["600 ÷ 100 = 6,", "car 6 × 100 = 600.", "600 cL = 6 L."],
                             -0.75, couper={0: ("600 ÷ 100", "= 6,"), 1: ("car 6 × 100", "= 600.")},
                             mot_q="Combien de litres", autres_q=autres_q)

    # ── 08 : le défi (1 L − 25 cL) ──────────────────────────────────────────
    def figure_defi(self):
        b = bouteille(2.6, CREME, 1.1, 0.88).move_to(P(-4.4, 0.4))
        bo = bol(1.6).move_to(P(-2.0, -0.9))
        return b, bo

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b, bo = self.figure_defi()
        XP = 0.3
        l0 = self.ligne([("Une bouteille de", WHITE), ("1 L", JAUNE_TITRE)], 36, buff=0.18)
        self.col(l0, 2.25, XP)
        l0b = self.t("de crème.", 36)
        self.col(l0b, 1.7, XP)
        self.au_mot("bouteille de 1 litre")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(l0), run_time=0.3)
        self.add(contenance(b, "1 L", 30))
        self.au_mot("litre de crème")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.2)
        l1 = self.ligne([("Elle en verse", WHITE), ("25 cL", JAUNE_TITRE)], 36, buff=0.18)
        self.col(l1, 1.0, XP)
        l1b = self.t("dans un bol.", 36)
        self.col(l1b, 0.45, XP)
        self.au_mot("Elle en verse 25")
        self.play(FadeIn(l1), FadeIn(bo, shift=UP * 0.2), run_time=0.3)
        self.au_mot("dans un bol")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.2)
        self.au_mot("Combien de centilitres")
        q = self.bloc(["Combien de cL reste-t-il", "dans la bouteille ?"], 38, JAUNE_TITRE)
        self.col(q, -0.6, XP)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(b), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, bo = self.figure_defi()
        eb = contenance(b, "1 L", 30)
        self.add(b, bo, eb)
        XP = 0.3
        self.au_mot("Correction. D'abord")
        l0 = self.t("D'abord, la même unité :", 34, ORANGE_RETENUE)
        self.col(l0, 2.2, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("1 L", BLEU_D), ("= 100 cL", VERT_OK)], 44, buff=0.3)
        self.col(l1, 1.3, XP)
        self.au_mot("unité : 1 litre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("litre, 100")
        e100 = hors_audit(Text("100 cL", font_size=30, color=VERT_OK, weight=BOLD).move_to(eb))
        self.play(FadeIn(l1[1], shift=UP * 0.1), Transform(eb, e100), run_time=0.4)
        l2 = self.ligne([("100 − 25", WHITE), ("= 75", VERT_OK)], 44, buff=0.3)
        self.col(l2, 0.3, XP)
        self.au_mot("Puis 100 moins 25")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("moins 25, 75")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  b.liquide.animate.stretch(0.75, 1, about_edge=DOWN), run_time=0.6)
        res = self.gros("Il reste 75 cL.", fs=52)
        self.col(res, -0.8, XP)
        self.au_mot("Il reste 75")
        self.play(FadeIn(res, scale=1.2), Indicate(b, color=VERT_OK, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(bouteille(2.2, EAU, 0.9), doseur(1.7, 1.0, 0.6, EAU)).arrange(RIGHT, buff=0.4,
                                                                                  aligned_edge=DOWN)
        lignes = self.finale_gauche(fig, textes=[
            ("1 L = 100 cL", "= 1000 mL."),
            ("1 cL = 10 mL.",),
            ("Vers une unité plus petite :", "on multiplie."),
            ("Vers le litre :", "on divise.")], fs=34)
        self.add(fig)
        self.au_mot("appris. 1 litre")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 centilitre")
        self.montrer_ligne(lignes[1])
        self.au_mot("Vers une unité")
        self.montrer_ligne(lignes[2])
        self.au_mot("vers le litre")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_relations()
        self.ecran_l_vers_cl()
        self.ecran_cl_vers_ml()
        self.ecran_vers_litres()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class ContenanceConvertirCM1(ContenanceConvertirBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
