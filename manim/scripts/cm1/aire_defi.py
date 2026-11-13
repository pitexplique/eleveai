# aire_defi.py
# EleveAI — Maths CM1 — série « Aire », épisode 05 : DÉFI D'AIRE (découper, enlever, comparer)
# (micro aire_defi, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (Noé et sa clôture plus longue : 25 contre 24 carreaux).
# Décor et métier : Chloé, PEINTRE EN BÂTIMENT (un mur moins sa fenêtre, des pots de peinture ;
# centres : construction, art-design).
# Mapping micro → écrans : 02 (tout le mur), 03 (on enlève la fenêtre), 04 (les pots : une réponse qui a du sens),
# 06 (piège : même tour, pas la même aire), questions 05 (le mur moins la porte) et 07 (comparer), défi 08 (L + pots).
# Voix : manim/voix/cm1-aire-defi.json (validée le 13/11, Julie, débit −6) ;
# marques : aire_defi_marques.json (python manim/scripts/cm1/aire_marques.py defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/aire_defi.py AireDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/aire_defi.py AireDefiCM1 -o eleveai-maths-cm1-aire-defi --media_dir manim/scripts/cm1/media-aire-05
# Sortie : manim/sorties/cm1/maths/aire/05-defi/eleveai-maths-cm1-aire-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm1_commun import *  # noqa: E402,F403

MUR_C, MUR_B = "#e2e8f0", "#475569"      # le mur pas encore peint
PEINT_C, PEINT_B = "#fdba74", "#9a3412"  # la peinture (orange clair)
FEN_C, FEN_B = "#7dd3fc", "#0369a1"      # la fenêtre (vitre)
PORTE_C, PORTE_B = "#92400e", "#451a03"  # la porte
HAUT_C, HAUT_B = CARREAU, CARREAU_B
BAS_C, BAS_B = "#fbbf24", "#78350f"

FENETRE = [(3, 0), (4, 0), (3, 1), (4, 1)]  # dans le mur de 8 × 3


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE):
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18))


def pot(s=1.0, couleur=PEINT_C):
    """Un pot de peinture : le seau, le couvercle, l'anse, une coulure."""
    seau = RoundedRectangle(width=0.8 * s, height=0.85 * s, corner_radius=0.08 * s, fill_color="#cbd5e1",
                            fill_opacity=1, stroke_color="#475569", stroke_width=3)
    couv = Ellipse(width=0.86 * s, height=0.22 * s, fill_color=couleur, fill_opacity=1, stroke_color="#475569",
                   stroke_width=3).move_to(seau.get_top())
    anse = Arc(radius=0.38 * s, start_angle=0.15, angle=PI - 0.3, color="#475569", stroke_width=4) \
        .move_to(seau.get_top() + UP * 0.2 * s)
    eti = RoundedRectangle(width=0.6 * s, height=0.3 * s, corner_radius=0.05 * s, fill_color=couleur, fill_opacity=1,
                           stroke_width=0).move_to(seau.get_center() + DOWN * 0.05 * s)
    return VGroup(anse, seau, eti, couv)


class AireDefiBase(PhraseAGauche, PaysageAireCM1):
    nom_voix = "cm1-aire-defi"
    fichier_marques = "aire_defi_marques.json"
    ceinture = "bleue"

    def mur(self, c=0.5, pos=P(-3.5, 0.6), fenetre=True, peint=False):
        """Le mur de 3 rangées de 8 carreaux ; .fen = les 4 carreaux de la fenêtre."""
        g = rect_cases(8, 3, c, PEINT_C if peint else MUR_C, PEINT_B if peint else MUR_B).move_to(pos)
        g.fen = VGroup(*[g[j * 8 + i] for i, j in FENETRE])
        g.reste = VGroup(*[q for q in g if q not in g.fen])
        if fenetre:
            g.fen.set_fill(FEN_C).set_stroke(FEN_B)
        return g

    def croisillon(self, g):
        f = g.fen
        return VGroup(Line(f.get_top(), f.get_bottom(), color=WHITE, stroke_width=5),
                      Line(f.get_left(), f.get_right(), color=WHITE, stroke_width=5),
                      Rectangle(width=f.width, height=f.height, stroke_color=WHITE, stroke_width=6).move_to(f))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi d'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Découper, enlever,", "comparer :", "tu es prêt ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = self.mur(0.4, P(3.4, 0.4))
        cr = self.croisillon(g)
        self.au_mot("Découper")
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.6) for x in g], lag_ratio=0.03),
                  FadeIn(cr), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, peintre en bâtiment ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ch = chloe(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Chloé")
        nom = self.t("Chloé", 42, BLEU_CALCUL).next_to(ch, UP, buff=0.2)
        self.play(FadeIn(ch, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("peintre")
        met = self.bloc(["peintre en", "bâtiment"], 28, BLEU_CALCUL).next_to(ch, DOWN, buff=0.18)
        for m in met:
            m.set_x(ch.get_x())
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        g = self.mur(0.48, P(-0.9, 0.7), fenetre=False)
        self.au_mot("un mur rectangulaire")
        self.play(LaggedStart(*[FadeIn(x, scale=1.3) for x in g], lag_ratio=0.02), run_time=0.6)
        gc = carreau(1.2, MUR_C, MUR_B, 4).move_to(P(3.6, 0.9))
        lien = DashedLine(g[7].get_right(), gc.get_left(), color=GRAY_B, stroke_width=3)
        self.au_mot("Chaque carreau")
        self.play(Indicate(g[7], color=JAUNE_TITRE, scale_factor=1.3), Create(lien), FadeIn(gc, scale=0.6),
                  run_time=0.5)
        self.au_mot("1 mètre carré")
        m2 = Text("1 m²", font_size=32, color="#0f172a", weight=BOLD).move_to(gc)
        self.play(FadeIn(m2, scale=1.3), run_time=0.4)
        self.au_mot("une fenêtre")
        cr = self.croisillon(g)
        tf = self.t("on ne la peint pas !", 28, FEN_C).next_to(g, DOWN, buff=0.2)
        self.play(g.fen.animate.set_fill(FEN_C).set_stroke(FEN_B), Create(cr), run_time=0.5)
        self.au_mot("on ne la peint pas")
        self.play(FadeIn(tf, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Quelle surface")
        q = self.t("Quelle surface faut-il peindre ?", 38, JAUNE_TITRE).move_to(P(-0.6, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : d'abord, tout le mur ───────────────────────────────────────────
    def ecran_mur(self):
        self.ecran("02-mur")
        g = self.mur()
        cr = self.croisillon(g)
        self.add(g, cr)
        self.au_mot("D'abord")
        l1 = self.t("D'abord, tout le mur :", 36, JAUNE_TITRE)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("comme s'il n'y avait")
        l2 = self.bloc(["comme s'il n'y avait", "pas de fenêtre."], 32, GRAY_B)
        self.col(l2, 1.75)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeOut(cr), g.fen.animate.set_fill(MUR_C).set_stroke(MUR_B),
                  run_time=0.5)
        self.au_mot("Le mur a")
        l3 = self.ligne([("3 rangées", ORANGE_RETENUE), ("de 8 carreaux", CARREAU)], 36)
        self.col(l3, 0.8)
        r3, c8 = cote(g, "3", LEFT, couleur=ORANGE_RETENUE), cote(g, "8", UP, couleur=CARREAU)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(r3), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c8), run_time=0.35)
        l4 = self.ligne([("3 × 8", BLEU_D), ("= 24 m²", VERT_OK)], 48, buff=0.3)
        self.col(l4, -0.15)
        self.play(FadeIn(l4[0], scale=1.2), run_time=0.4)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.attendre_voix()

    # ── 03 : ensuite, on enlève la fenêtre ──────────────────────────────────
    def ecran_enlever(self):
        self.ecran("03-enlever")
        g = self.mur()
        cr = self.croisillon(g)
        self.add(g, cr)
        self.au_mot("Ensuite")
        l1 = self.t("Ensuite, la fenêtre :", 36, FEN_C)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(g.fen, color=FEN_C, scale_factor=1.1), run_time=0.45)
        l2 = self.t("2 rangées de 2 carreaux", 32)
        self.col(l2, 1.95)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("2 × 2", BLEU_D), ("= 4 m²", VERT_OK)], 40, buff=0.3)
        self.col(l3, 1.3)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("On l'enlève")
        l4 = self.ligne([("On l'enlève :", ROUGE_ERREUR), ("24 − 4", BLEU_D), ("= 20", VERT_OK)], 38, buff=0.25)
        self.col(l4, 0.4)
        self.play(FadeIn(l4[0], shift=UP * 0.1), g.fen.animate.set_fill(opacity=0.12), FadeOut(cr), run_time=0.45)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chloé doit peindre")
        res = self.gros("À peindre : 20 m²", fs=42)
        self.col(res, -0.75)
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[q.animate.set_fill(PEINT_C).set_stroke(PEINT_B)
                                                         for q in g.reste], lag_ratio=0.02), run_time=0.8)
        self.attendre_voix()

    # ── 04 : les pots (une réponse qui a du sens) ───────────────────────────
    def ecran_pots(self):
        self.ecran("04-pots")
        g = self.mur(0.42, P(-3.6, 1.5))
        g.fen.set_fill(opacity=0.12)
        for q in g.reste:
            q.set_fill(PEINT_C).set_stroke(PEINT_B)
        self.add(g)
        p1, p2 = pot(1.1).move_to(P(-4.7, -1.0)), pot(1.1).move_to(P(-3.2, -1.0))
        self.au_mot("Un pot de peinture")
        l1 = self.t("Un pot couvre 10 m².", 36)
        self.col(l1, 2.4)
        self.play(FadeIn(p1, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("10 + 10", BLEU_D), ("= 20", VERT_OK)], 44, buff=0.3)
        self.col(l2, 1.5)
        for f in l2[0].get_family():
            f._pas_audit = True  # le premier 10 est celui de « couvre 10 » : l'audit le compare à lui
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(p2, shift=UP * 0.2), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il faut 2 pots")
        res = self.gros("Il faut 2 pots.", fs=42)
        self.col(res, 0.5)
        self.play(FadeIn(res, scale=1.2), Indicate(VGroup(p1, p2), color=VERT_OK, scale_factor=1.1), run_time=0.5)
        self.au_mot("Si Chloé avait oublié")
        l3 = self.bloc(["Fenêtre oubliée :", "un pot de trop !"], 34, ROUGE_ERREUR)
        self.col(l3, -0.75)
        p3 = pot(1.1).move_to(P(-1.7, -1.0))
        x = VGroup(Line(p3.get_corner(UL), p3.get_corner(DR), color=ROUGE_ERREUR, stroke_width=8),
                   Line(p3.get_corner(UR), p3.get_corner(DL), color=ROUGE_ERREUR, stroke_width=8))
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(p3, shift=UP * 0.2), run_time=0.45)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(x), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(5, 4, 0.5, MUR_C, MUR_B).move_to(P(-3.7, 1.15))
        porte = VGroup(g[12], g[17])  # 2 carreaux l'un sur l'autre, en bas au milieu
        porte.set_fill(PORTE_C).set_stroke(PORTE_B)

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(*[q.animate.set_fill(PEINT_C).set_stroke(PEINT_B) for q in g if q not in porte], run_time=0.5)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un mur de 4 rangées de 5", "carreaux a une porte", "de 2 carreaux.",
                              "Quelle surface faut-il peindre ?"],
                             [self.choix("18 m²"), self.choix("22 m²"), self.choix("20 m²")], 0,
                             ["Le mur : 4 × 5 = 20.", "On enlève la porte :", "20 − 2 = 18 m²."],
                             -0.05, mot_q="Un mur", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (même tour, pas la même aire) ─────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Deux figures")
        l0 = self.bloc(["Même tour,", "mais pas la même aire !"], 34, JAUNE_TITRE)
        self.col(l0, 2.25)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        bande = rect_cases(5, 1, 0.55, CARREAU, CARREAU_B).move_to(P(-3.9, 1.55))
        carre = rect_cases(3, 3, 0.55, ROSE_D, "#831843").move_to(P(-3.9, -0.6))
        self.au_mot("Une bande")
        l1 = self.t("Une bande de 1 rangée de 5 :", 30, CARREAU)
        self.col(l1, 1.15)
        self.play(FadeIn(bande, scale=0.9), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("son tour mesure")
        t1 = contour(bande, PLINTHE, 8)
        l2 = self.ligne([("tour : 12", PLINTHE), ("aire : 5", VERT_OK)], 34, buff=0.5)
        self.col(l2, 0.55)
        self.play(Create(t1), FadeIn(l2[0], shift=UP * 0.1), run_time=0.7)
        self.au_mot("son aire")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(bande, color=VERT_OK, scale_factor=1.06), run_time=0.4)
        self.au_mot("Un carré de 3")
        l3 = self.t("Un carré de 3 sur 3 :", 30, ROSE_D)
        self.col(l3, -0.25)
        self.play(FadeIn(carre, scale=0.9), FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        self.au_mot("a le même tour")
        t2 = contour(carre, PLINTHE, 8)
        l4 = self.ligne([("tour : 12", PLINTHE), ("aire : 9", VERT_OK)], 34, buff=0.5)
        self.col(l4, -0.85)
        self.play(Create(t2), FadeIn(l4[0], shift=UP * 0.1), run_time=0.7)
        self.au_mot("mais son aire")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(carre, color=VERT_OK, scale_factor=1.06), run_time=0.4)
        self.au_mot("Pour l'aire")
        res = self.gros("Pour l'aire, on compte\nce qui est dedans.", fs=32)
        gauche(res, -6.1, -2.55)
        self.play(FadeIn(res, scale=1.1), FadeOut(t1), FadeOut(t2), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        a = rect_cases(4, 4, 0.42, VERT_F, "#14532d").move_to(P(-5.2, 1.6))
        b = rect_cases(7, 2, 0.42, BAS_C, BAS_B).move_to(P(-2.35, 1.6)).align_to(a, DOWN)
        na = hors_audit(self.t("Chloé", 26, VERT_F).next_to(a, UP, buff=0.12))
        nb = hors_audit(self.t("le voisin", 26, BAS_C).next_to(b, UP, buff=0.12))

        def autres_q(sc):
            sc.play(FadeIn(a), FadeIn(b), FadeIn(na), FadeIn(nb), run_time=0.4)

        def apres(sc):
            sc.play(FadeIn(numeros(a, 18, "#0f172a")), FadeIn(numeros(b, 18, "#0f172a")), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Chloé : un carré de 4 de côté.", "Le voisin : 2 rangées de 7.",
                              "Qui a la plus grande aire ?"],
                             [self.choix("le voisin"), self.choix("Chloé"), self.choix("la même aire")], 1,
                             ["Chloé : 4 × 4 = 16.", "Le voisin : 2 × 7 = 14.", "16, c'est plus que 14.",
                              "Chloé a la plus grande aire."],
                             0.5, sans_audit=(2,), hors=(3,), couper={0: ("Chloé : 4 × 4", "= 16.")}, mot_q="Le jardin", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (la salle en L, combien de pots ?) ─────────────────────
    def salle(self, couleurs=False):
        cases = [(i, j) for j in (0, 1, 2) for i in range(6)] + [(i, j) for j in (3, 4) for i in (0, 1, 2)]
        g = figure_cases(cases, 0.45, MUR_C, MUR_B).move_to(P(-3.8, 0.3))
        if couleurs:
            for q in g[:18]:
                q.set_fill(HAUT_C).set_stroke(HAUT_B)
            for q in g[18:]:
                q.set_fill(BAS_C).set_stroke(BAS_B)
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.salle()
        self.au_mot("le sol")
        l0 = self.t("Le sol d'une salle en L", 30, GRAY_B)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in g], lag_ratio=0.02),
                  run_time=0.7)
        self.au_mot("une partie")
        l1 = self.ligne([("Une partie :", HAUT_C), ("3 rangées de 6", WHITE)], 32)
        self.col(l1, 1.75, 0.35)
        self.play(FadeIn(l1[0], shift=UP * 0.1), *[q.animate.set_fill(HAUT_C).set_stroke(HAUT_B) for q in g[:18]],
                  run_time=0.4)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("une autre")
        l2 = self.ligne([("Une autre :", BAS_C), ("2 rangées de 3", WHITE)], 32)
        self.col(l2, 1.15, 0.35)
        self.play(FadeIn(l2[0], shift=UP * 0.1), *[q.animate.set_fill(BAS_C).set_stroke(BAS_B) for q in g[18:]],
                  run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Chaque carreau")
        l3 = self.t("Chaque carreau : 1 m²", 30, GRAY_B)
        self.col(l3, 0.55, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Un pot couvre")
        l4 = self.t("Un pot couvre 10 m².", 32, PEINT_C)
        self.col(l4, -0.05, 0.35)
        pp = pot(0.9).next_to(l4, RIGHT, buff=0.3)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(pp, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de pots")
        q = self.bloc(["Combien de pots", "faut-il acheter ?"], 36, JAUNE_TITRE)
        self.col(q, -0.85, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(pp), run_time=0.5)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.salle(couleurs=True)
        self.add(g)
        self.au_mot("D'abord")
        l0 = self.t("D'abord, l'aire :", 32)
        self.col(l0, 2.35, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("3 × 6", BLEU_D), ("= 18", HAUT_C)], 38, buff=0.3)
        self.col(l1, 1.75, 0.35)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(VGroup(*g[:18]), color=HAUT_C, scale_factor=1.03),
                  run_time=0.4)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("2 × 3", BLEU_D), ("= 6", BAS_C)], 38, buff=0.3)
        self.col(l2, 1.15, 0.35)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(VGroup(*g[18:]), color=BAS_C, scale_factor=1.05),
                  run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("18 + 6", BLEU_D), ("= 24 m²", VERT_OK)], 40, buff=0.3)
        self.col(l3, 0.5, 0.35)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Avec 2 pots")
        l4 = self.bloc(["2 pots : 20 m²,", "pas assez !"], 32, ROUGE_ERREUR)
        self.col(l4, -0.3, 0.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Il faut 3 pots")
        res = self.gros("Il faut 3 pots.", fs=40)
        self.col(res, -1.3, 0.35)
        pots = VGroup(*[pot(0.75) for _ in range(3)]).arrange(RIGHT, buff=0.2).next_to(g, DOWN, buff=0.35)
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in pots], lag_ratio=0.2),
                  run_time=0.6)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = self.mur(0.36)
        fig.fen.set_fill(opacity=0.12)
        for q in fig.reste:
            q.set_fill(PEINT_C).set_stroke(PEINT_B)
        lignes = self.finale_gauche(fig, textes=[
            ("On découpe la figure, ou on calcule", "le grand rectangle et on enlève le trou."),
            ("Le tour et l'aire,", "ce n'est pas pareil."),
            ("On vérifie que la réponse", "a du sens.")], fs=32)
        self.add(fig)
        self.au_mot("Pour trouver")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Le tour et l'aire")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_mur()
        self.ecran_enlever()
        self.ecran_pots()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireDefiCM1(AireDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "bleue"
