# 5e_aire_composer.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode A4 : L'AIRE D'UNE FIGURE COMPOSÉE
# (micro aire_composer, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-aire-composer-short (la pancarte maison, 16 + 6 = 22 dm²).
# Décor et métier : Leïla, TECHNICIENNE EN ÉNERGIES RENOUVELABLES (panneaux solaires ; centres nature-ecologie, sciences).
# Mapping micro → écrans : 02 (le toit en L coupé en deux rectangles : 6 × 4 = 24, 3 × 2 = 6, 24 + 6 = 30 m²),
# 03 (on complète en 6 × 6 = 36, on enlève 3 × 2 = 6 : 36 − 6 = 30 m²), 04 (méthode : découper, calculer,
# additionner ou enlever), 06 (piège : chaque morceau une fois ; on enlève une aire, pas une longueur),
# questions 05 (A : 20 + 6 = 26 m²) et 07 (B : 100 − 16 = 84 m²), défi 08 (36 + 6 = 42 m² ; 42 ÷ 2 = 21 panneaux).
# Fiche : lib/fiches/maths-5e-aires.tsx.
# Voix : manim/voix/5e-aire-composer.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_aire_composer_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py aire-composer).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_aire_composer.py AireComposer5e
# Sortie finale : manim/sorties/5e/maths/aire/04-composer/eleveai-maths-5e-aire-composer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

TOIT_C, TOIT_B = "#94a3b8", "#334155"     # le toit (ardoise)
P1_C, P2_C = "#38bdf8", "#4ade80"          # les deux morceaux
TROP_C = "#fb923c"                         # le morceau en trop


def rect_m(x, y, w, h, u, o, couleur, bord=TOIT_B, sw=4, op=1.0):
    """Un rectangle de w × h mètres dont le coin bas-gauche est au point (x, y) mètres du repère (o, unité u)."""
    return Polygon(o + P(x * u, y * u), o + P((x + w) * u, y * u), o + P((x + w) * u, (y + h) * u),
                   o + P(x * u, (y + h) * u), fill_color=couleur, fill_opacity=op, stroke_color=bord,
                   stroke_width=sw)


def forme_L(u, o, couleur=TOIT_C, bord=TOIT_B, sw=5):
    """Le toit en L : 6 m de large, 6 m de haut ; en haut, seulement les 3 m de gauche (o = coin bas-gauche)."""
    pts = [(0, 0), (6, 0), (6, 4), (3, 4), (3, 6), (0, 6)]
    return Polygon(*[o + P(x * u, y * u) for x, y in pts], fill_color=couleur, fill_opacity=1, stroke_color=bord,
                   stroke_width=sw)


def panneau(w=0.5, h=0.32):
    p = Rectangle(width=w, height=h, fill_color="#1e3a8a", fill_opacity=1, stroke_color="#93c5fd", stroke_width=2)
    g = VGroup(p, Line(p.get_top(), p.get_bottom()), Line(p.get_left(), p.get_right()))
    g[1:].set_stroke("#93c5fd", 1.5)
    return g


class AireComposer5e(Paysage5e):
    nom_voix = "5e-aire-composer"
    fichier_marques = "5e_aire_composer_marques.json"
    ceinture = "verte"

    U = 0.55
    O = P(-5.2, -1.75)   # le coin bas-gauche du L (écrans 02 → 04)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire d'une figure composée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire d'une figure composée")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment mesurer", "une forme compliquée ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = forme_L(0.3, P(2.4, -0.55))
        self.au_mot("Comment mesurer")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(f, scale=0.8), run_time=0.5)
        self.au_mot("une forme compliquée")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(f, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Leïla, technicienne en énergies renouvelables ──────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        le = leila(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Leïla")
        nom = self.t("Leïla", 40, BLEU_CALCUL).next_to(le, UP, buff=0.25)
        self.play(FadeIn(le, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("technicienne en énergies renouvelables")
        met = self.bloc(["technicienne", "en énergies", "renouvelables"], 26, BLEU_CALCUL).next_to(le, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        pans = VGroup(*[panneau() for _ in range(3)]).arrange(RIGHT, buff=0.12).move_to(P(-1.6, 2.3))
        self.au_mot("panneaux solaires")
        lp = self.t("des panneaux solaires", 28, "#93c5fd").next_to(pans, RIGHT, buff=0.3)
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.2) for p in pans], lag_ratio=0.15), FadeIn(lp),
                  run_time=0.6)
        f = forme_L(0.42, P(-1.9, -1.4))
        self.au_mot("Ce toit a une drôle de forme")
        self.play(FadeIn(f, shift=UP * 0.2), run_time=0.5)
        self.au_mot("un L")
        ll = self.t("un L", 40, JAUNE_TITRE).next_to(f, RIGHT, buff=0.4)
        bord = f.copy().set_fill(opacity=0).set_stroke(JAUNE_TITRE, 8)
        self.play(FadeIn(ll, scale=1.2), Create(bord), run_time=0.6)
        self.play(FadeOut(bord), run_time=0.3)
        self.au_mot("Combien de mètres carrés")
        q = self.t("Combien de mètres carrés de toit ?", 34, JAUNE_TITRE).move_to(P(0.4, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : couper en deux rectangles (24 + 6 = 30) ────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        u, o = self.U, self.O
        f = forme_L(u, o)
        self.add(f)
        r1 = rect_m(0, 0, 6, 4, u, o, P1_C)
        r2 = rect_m(0, 4, 3, 2, u, o, P2_C)
        coupe = DashedLine(o + P(-0.2, 4 * u), o + P(3 * u + 0.2, 4 * u), color=WHITE, stroke_width=6,
                           dash_length=0.12)
        l0 = self.t("Deux rectangles :", 36, JAUNE_TITRE)
        self.col(l0, 2.6)
        self.au_mot("Leïla coupe le L en deux rectangles")
        self.play(Create(coupe), FadeIn(l0, shift=UP * 0.1), run_time=0.6)
        self.add(r1, r2)
        self.play(FadeOut(f), FadeOut(coupe), r2.animate.shift(UP * 0.25), run_time=0.45)
        l1 = self.ligne([("Le premier :", P1_C), ("6 × 4", BLEU_D), ("= 24", VERT_OK)], 36, buff=0.2)
        self.col(l1, 1.75)
        self.au_mot("Le premier")
        c6 = cote(Line(r1.get_corner(DL), r1.get_corner(DR)), "6 m", DOWN, fs=28, couleur=BASE_C, audit=False)
        c4 = cote(Line(r1.get_corner(DR), r1.get_corner(UR)), "4 m", RIGHT, fs=28, couleur=BASE_C, audit=False)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(r1, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.4)
        self.au_mot("6 mètres sur 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c6), FadeIn(c4), run_time=0.35)
        self.au_mot("4, 24")
        e24 = m2("24 m²", 30, "#0c4a6e").move_to(r1)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(e24, scale=1.2), run_time=0.35)
        l2 = self.ligne([("Le second :", P2_C), ("3 × 2", BLEU_D), ("= 6", VERT_OK)], 36, buff=0.2)
        self.col(l2, 0.95)
        self.au_mot("Le second")
        c3 = cote(Line(r2.get_corner(UL), r2.get_corner(UR)), "3 m", UP, fs=28, couleur=BASE_C, audit=False)
        c2 = cote(Line(r2.get_corner(UR), r2.get_corner(DR)), "2 m", RIGHT, fs=28, couleur=BASE_C, audit=False)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(r2, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.au_mot("3 mètres sur 2")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c3), FadeIn(c2), run_time=0.35)
        self.au_mot("2, 6")
        e6 = m2("6 m²", 28, "#14532d").move_to(r2)
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(e6, scale=1.2), run_time=0.35)
        l3 = self.ligne([("En tout :", JAUNE_TITRE), ("24 + 6", BLEU_D)], 38, buff=0.2)
        self.col(l3, 0.1)
        self.au_mot("En tout")
        self.play(FadeIn(l3[0], shift=UP * 0.1), r2.animate.shift(DOWN * 0.25), e6.animate.shift(DOWN * 0.25),
                  c3.animate.shift(DOWN * 0.25), c2.animate.shift(DOWN * 0.25), run_time=0.4)
        self.au_mot("24 plus 6")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("30 m²", fs=48)
        self.col(res, -0.85)
        self.au_mot("30 mètres carrés")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : compléter puis enlever (36 − 6 = 30) ───────────────────────────
    def ecran_enlever(self):
        self.ecran("03-enlever")
        u, o = self.U, self.O
        f = forme_L(u, o)
        self.add(f)
        trop = rect_m(3, 4, 3, 2, u, o, TROP_C, "#7c2d12", 4, 0.55)
        grand = rect_m(0, 0, 6, 6, u, o, None, JAUNE_TITRE, 7, 0)
        l0 = self.t("Autre méthode :", 36, JAUNE_TITRE)
        self.col(l0, 2.6)
        self.au_mot("Autre méthode")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Grand rectangle :", WHITE), ("6 × 6", BLEU_D)], 36, buff=0.2)
        self.col(l1, 1.8)
        self.au_mot("elle complète le L en un grand rectangle")
        self.play(FadeIn(trop), Create(grand), FadeIn(l1[0], shift=UP * 0.1), run_time=0.7)
        self.au_mot("de 6 mètres sur 6")
        c6 = cote(Line(o, o + P(6 * u, 0)), "6 m", DOWN, fs=28, couleur=BASE_C, audit=False)
        c6b = cote(Line(o + P(6 * u, 0), o + P(6 * u, 6 * u)), "6 m", RIGHT, fs=28, couleur=BASE_C, audit=False)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c6), FadeIn(c6b), run_time=0.35)
        l2 = self.ligne([("= 36 m²", VERT_OK)], 38)
        self.col(l2, 1.05)
        self.au_mot("36 mètres carrés")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("En trop :", TROP_C), ("3 × 2", BLEU_D), ("= 6", VERT_OK)], 36, buff=0.2)
        self.col(l3, 0.25)
        self.au_mot("Puis elle enlève le morceau en trop")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(trop, color=TROP_C, scale_factor=1.06), run_time=0.45)
        self.au_mot("3 mètres sur 2")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, 6")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("36 − 6", BLEU_D), ("= 30 m²", VERT_OK)], 46, buff=0.3)
        self.col(l4, -0.65)
        self.au_mot("36 moins 6")
        self.play(FadeIn(l4[0], shift=UP * 0.1), trop.animate.shift(RIGHT * 0.6 + UP * 0.6).set_opacity(0),
                  run_time=0.7)
        self.au_mot("6 : 30")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.35)
        res = self.gros("Le même résultat !", fs=44)
        self.col(res, -1.6)
        self.au_mot("Le même résultat")
        self.play(FadeIn(res, scale=1.15), run_time=0.45)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        u, o = self.U, self.O
        r1 = rect_m(0, 0, 6, 4, u, o, P1_C)
        r2 = rect_m(0, 4, 3, 2, u, o, P2_C)
        self.add(r1, r2)
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 38, JAUNE_TITRE)
        self.col(l0, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.bloc(["On découpe en rectangles", "et en triangles."], 36)
        self.col(l1, 1.55)
        self.au_mot("on découpe en rectangles")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(VGroup(r1, r2), color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.45)
        self.au_mot("et en triangles")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.t("On calcule chaque morceau.", 36, BLEU_D)
        self.col(l2, 0.4)
        self.au_mot("On calcule chaque morceau")
        e1 = m2("24", 34, "#0c4a6e").move_to(r1)
        e2 = m2("6", 34, "#14532d").move_to(r2)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(e1, scale=1.2), FadeIn(e2, scale=1.2), run_time=0.45)
        l3 = self.bloc(["Puis on additionne…", "ou on enlève."], 38, VERT_OK)
        self.col(l3, -0.8)
        self.au_mot("Puis on additionne")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("ou on enlève")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.insister(l3, 1.06, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, o = 0.36, P(-4.9, 0.55)
        r1 = rect_m(0, 0, 5, 4, u, o, P1_C)
        r2 = rect_m(0, 4, 2, 3, u, o, P2_C)
        c5 = cote(Line(r1.get_corner(DL), r1.get_corner(DR)), "5 m", DOWN, fs=26, couleur=BASE_C, audit=False)
        c4 = cote(Line(r1.get_corner(DR), r1.get_corner(UR)), "4 m", RIGHT, fs=26, couleur=BASE_C, audit=False)
        c2 = cote(Line(r2.get_corner(UL), r2.get_corner(UR)), "2 m", UP, fs=26, couleur=BASE_C, audit=False)
        c3 = cote(Line(r2.get_corner(UR), r2.get_corner(DR)), "3 m", RIGHT, fs=26, couleur=BASE_C, audit=False)
        self.play(FadeIn(r1), FadeIn(r2), FadeIn(c5), FadeIn(c4), FadeIn(c2), FadeIn(c3), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[Indicate(r1, color=JAUNE_TITRE, scale_factor=1.04)])
            sc.rep(1, avec=[Indicate(r2, color=JAUNE_TITRE, scale_factor=1.06)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Une figure en L : un rectangle", "de 5 m sur 4 et un rectangle", "de 2 m sur 3.",
                              "Quelle est son aire ?"],
                             [self.choix("26 m²"), self.choix("20 m²"), self.choix("14 m²")], 0,
                             ["5 × 4 = 20.", "2 × 3 = 6.", "20 + 6 = 26 m²."],
                             -0.2, couper={0: ("5 × 4", "= 20."), 1: ("2 × 3", "= 6."), 2: ("20 + 6", "= 26 m².")},
                             mot_q="Une", autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        u, o = 0.45, P(-5.6, -1.0)
        r1 = rect_m(0, 0, 6, 4, u, o, P1_C)
        r2 = rect_m(0, 4, 3, 2, u, o, P2_C)
        self.add(r1, r2)
        l1 = self.bloc(["Chaque morceau compte", "une seule fois."], 36, JAUNE_TITRE)
        self.col(l1, 1.9, -0.3)
        self.au_mot("chaque morceau compte")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("une seule fois")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(r1, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.45)
        self.play(Indicate(r2, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        trop = rect_m(3, 4, 3, 2, u, o, TROP_C, "#7c2d12", 4, 0.6)
        l2 = self.bloc(["On enlève son aire,", "pas sa longueur."], 36, TROP_C)
        self.col(l2, 0.3, -0.3)
        self.au_mot("on enlève son aire")
        e6 = m2("6 m²", 28, "#431407").move_to(trop)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(trop), FadeIn(e6), run_time=0.45)
        self.au_mot("pas sa longueur")
        c3 = self.t("3 m", 30, GRAY_B)
        hors_audit(c3)
        c3.next_to(trop, UP, buff=0.12)
        barre = Line(c3.get_corner(DL), c3.get_corner(UR), color=ROUGE_ERREUR, stroke_width=6)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c3), run_time=0.35)
        self.play(Create(barre), Indicate(e6, color=VERT_OK, scale_factor=1.3), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u, o = 0.24, P(-4.85, 0.5)
        grand = rect_m(0, 0, 10, 10, u, o, P1_C)
        petit = rect_m(6, 6, 4, 4, u, o, "#1e293b", WHITE, 3)
        c10 = cote(Line(grand.get_corner(DL), grand.get_corner(DR)), "10 m", DOWN, fs=26, couleur=BASE_C,
                   audit=False)
        c4 = cote(Line(petit.get_corner(UL), petit.get_corner(UR)), "4 m", UP, fs=26, couleur=TROP_C, audit=False)
        self.play(FadeIn(grand), FadeIn(petit), FadeIn(c10), FadeIn(c4), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[Indicate(grand, color=JAUNE_TITRE, scale_factor=1.02)])
            sc.rep(1, avec=[Indicate(petit, color=TROP_C, scale_factor=1.08)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Un carré de 10 m de côté.", "On enlève un carré de 4 m de côté.",
                              "Quelle aire reste-t-il ?"],
                             [self.choix("96 m²"), self.choix("84 m²"), self.choix("60 m²")], 1,
                             ["10 × 10 = 100.", "4 × 4 = 16.", "100 − 16 = 84 m²."],
                             -0.4, couper={0: ("10 × 10", "= 100."), 1: ("4 × 4", "= 16."),
                                           2: ("100 − 16", "= 84 m².")},
                             mot_q="Un", autres_r=apres)

    # ── 08 : le défi (le toit et ses panneaux) ──────────────────────────────
    def toit_defi(self):
        u, o = 0.36, P(-5.6, 0.0)
        r = rect_m(0, 0, 9, 4, u, o, TOIT_C)
        t = Polygon(o + P(9 * u, 0), o + P(12 * u, 2 * u), o + P(9 * u, 4 * u), fill_color=TRI_C, fill_opacity=1,
                    stroke_color=TRI_B, stroke_width=4)
        return r, t, u, o

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        r, t, u, o = self.toit_defi()
        x = -0.6
        l1 = self.ligne([("Un rectangle :", WHITE), ("9 m sur 4,", BASE_C)], 34)
        self.col(l1, 2.2, x)
        self.au_mot("un rectangle de 9 mètres sur 4")
        c9 = cote(Line(r.get_corner(DL), r.get_corner(DR)), "9 m", DOWN, fs=26, couleur=BASE_C, audit=False)
        c4 = cote(Line(r.get_corner(DL), r.get_corner(UL)), "4 m", LEFT, fs=26, couleur=BASE_C, audit=False)
        self.play(FadeIn(r), FadeIn(l1), FadeIn(c9), FadeIn(c4), run_time=0.45)
        l2 = self.t("avec un triangle au bout.", 34, TRI_C)
        self.col(l2, 1.5, x)
        self.au_mot("avec un triangle collé au bout")
        self.play(FadeIn(t, shift=LEFT * 0.2), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        l3 = self.ligne([("Base 4 m,", BASE_C), ("hauteur 3 m.", HAUTEUR_C)], 34)
        self.col(l3, 0.8, x)
        hh = DashedLine(o + P(9 * u, 2 * u), o + P(12 * u, 2 * u), color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        self.au_mot("une base de 4 mètres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("une hauteur de 3 mètres")
        c3 = cote(hh, "3 m", DOWN, fs=24, couleur=HAUTEUR_C, audit=False, buff=0.08, fond=True)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(hh), FadeIn(c3), run_time=0.4)
        l4 = self.ligne([("Un panneau :", "#93c5fd"), ("2 m².", "#93c5fd")], 34)
        self.col(l4, 0.1, x)
        pan = panneau(0.7, 0.45).move_to(P(-4.3, -1.75))
        self.au_mot("Un panneau solaire")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(pan, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("couvre 2 mètres carrés")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        l5 = self.t("Combien de panneaux ?", 36, JAUNE_TITRE)
        self.col(l5, -0.65, x)
        self.au_mot("Combien de panneaux")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        r, t, u, o = self.toit_defi()
        self.add(r, t)
        x = -0.6
        l1 = self.ligne([("Le rectangle :", WHITE), ("9 × 4", BLEU_D), ("= 36", VERT_OK)], 34, buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("Le rectangle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(r, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.35)
        self.au_mot("9 fois 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 36")
        e36 = m2("36", 32, "#1e293b").move_to(r)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(e36), run_time=0.3)
        l2 = self.ligne([("Le triangle :", TRI_C), ("4 × 3", BLEU_D), ("= 12,", VERT_OK)], 34, buff=0.2)
        self.col(l2, 1.5, x)
        self.au_mot("Le triangle")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(t, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.35)
        self.au_mot("4 fois 3")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3, 12")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.2)
        l3 = self.ligne([("÷ 2", BLEU_D), ("= 6", VERT_OK)], 34, buff=0.2)
        self.col(l3, 0.85, x)
        self.au_mot("par 2")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("2, 6")
        e6 = m2("6", 28, "#431407").move_to(centre_de(o + P(9 * u, 0), o + P(12 * u, 2 * u), o + P(9 * u, 4 * u)))
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(e6), run_time=0.25)
        l4 = self.ligne([("Le toit :", JAUNE_TITRE), ("36 + 6", BLEU_D), ("= 42 m²", VERT_OK)], 36, buff=0.2)
        self.col(l4, 0.15, x)
        self.au_mot("Le toit")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("36 plus 6")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("42 mètres carrés")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("42 ÷ 2", BLEU_D), ("= 21", VERT_OK)], 40, buff=0.25)
        self.col(l5, -0.6, x)
        self.au_mot("42 divisé par 2")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 : 21")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("21 panneaux", fs=46)
        self.col(res, -1.45, x)
        pans = VGroup(*[panneau(0.3, 0.2) for _ in range(21)]).arrange_in_grid(3, 7, buff=0.06).move_to(
            P(-4.3, -1.75))
        self.au_mot("21 panneaux")
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(p) for p in pans], lag_ratio=0.03), run_time=0.7)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        u, o = 0.3, ORIGIN
        r1 = rect_m(0, 0, 6, 4, u, o, P1_C)
        r2 = rect_m(0, 4, 3, 2, u, o, P2_C)
        fig = VGroup(r1, r2)
        lignes = self.finale_gauche(fig, textes=[
            ("Une figure compliquée se découpe", "en rectangles et en triangles."),
            ("On calcule", "chaque morceau."),
            ("Puis on additionne,", "ou on enlève ce qui manque.")], fs=32)
        self.add(fig)
        self.au_mot("Une figure compliquée")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("On calcule chaque morceau")
        self.montrer_ligne(lignes[1])
        self.au_mot("Puis on additionne")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_decouper()
        self.ecran_enlever()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
