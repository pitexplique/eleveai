# 5e_aire_defi.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode A5 : DÉFIS SUR LES AIRES
# (micro aire_defi, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : 5e-aire-defi-short (le tapis trop large, 12 ÷ 4 = 3 m).
# Décor et métier : Mehdi, MENUISIER AGENCEUR (meubles sur mesure ; centres argent-budget, sciences).
# Mapping micro → écrans : 02 (remonter la formule du triangle : 24 × 2 = 48, 48 ÷ 8 = 6 dm), 03 (vérifier :
# 8 × 6 = 48, ÷ 2 = 24), 04 (méthode : formule, remplacer, remonter ; h = A × 2 ÷ b ; b = A ÷ h),
# 06 (piège : × 2 pour le triangle seulement ; on vérifie), questions 05 (B : 40 ÷ 8 = 5 cm) et
# 07 (C : 36 ÷ 4 = 9 cm), défi 08 (0,72 + 0,48 = 1,20 m² ; 3 plaques de 0,50 m²).
# Fiche : lib/fiches/maths-5e-aires.tsx.
# Voix : manim/voix/5e-aire-defi.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_aire_defi_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py aire-defi).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_aire_defi.py AireDefi5e
# Sortie finale : manim/sorties/5e/maths/aire/05-defi/eleveai-maths-5e-aire-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

BOIS_C, BOIS_B = "#d6a76c", "#7c4a1e"     # la tablette (bois clair)
PARA_C, PARA_B = "#a78bfa", "#4c1d95"     # le parallélogramme (violet)
PLAN_C, PLAN_B = "#94a3b8", "#334155"     # le plan de travail
P1_C, P2_C = "#38bdf8", "#4ade80"         # ses deux morceaux
PLAQUE_C = "#fbbf24"                      # les plaques de revêtement


def para_pts(base, haut, dec, u, o=ORIGIN):
    """Le parallélogramme ABCD (AB = la base en bas, penché vers la droite de dec), centré en o ; H = pied de la
    hauteur issue de D."""
    A = o + P(-(base + dec) * u / 2, -haut * u / 2)
    B = A + P(base * u, 0)
    C = B + P(dec * u, haut * u)
    D = A + P(dec * u, haut * u)
    H = A + P(dec * u, 0)
    return A, B, C, D, H


def rect_m(x, y, w, h, u, o, couleur, bord=PLAN_B, sw=4, op=1.0):
    """Un rectangle de w × h (unités du dessin) dont le coin bas-gauche est au point (x, y) du repère (o, u)."""
    return Polygon(o + P(x * u, y * u), o + P((x + w) * u, y * u), o + P((x + w) * u, (y + h) * u),
                   o + P(x * u, (y + h) * u), fill_color=couleur, fill_opacity=op, stroke_color=bord,
                   stroke_width=sw)


class AireDefi5e(Paysage5e):
    nom_voix = "5e-aire-defi"
    fichier_marques = "5e_aire_defi_marques.json"
    ceinture = "bleue"

    def tablette(self, u=0.42, o=P(-3.7, 0.0)):
        """La tablette de Mehdi : un triangle de base 8 dm, de hauteur 6 dm (le sommet au-dessus du point 3)."""
        A, B, C, H = triangle_hb(8, 6, 3, u, o)
        t = tri(A, B, C, BOIS_C, BOIS_B, 5)
        f = VGroup(t)
        f.tri, f.A, f.B, f.C, f.H = t, A, B, C, H
        f.base = Line(A, B, color=BASE_C, stroke_width=9)
        f.hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
        f.eq = equerre(H, RIGHT, UP, 0.24, HAUTEUR_C)
        f.u = u
        return f

    def sur_tablette(self, f, s, x, y, fs=30, couleur=WHITE):
        """Une étiquette sur cartouche posée au point (x, y) dm de la tablette (A = (0, 0)), hors audit."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        return sur_fond(t).move_to(f.A + P(x * f.u, y * f.u))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les aires", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis sur les aires")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Et si on connaît l'aire,", "mais pas la longueur ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        A, B, C, H = triangle_hb(8, 6, 3, 0.26, P(3.6, 0.3))
        t = tri(A, B, C, BOIS_C, BOIS_B, 4)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        qm = self.t("?", 44, JAUNE_TITRE)
        hors_audit(qm)
        qm.next_to(hh, RIGHT, buff=0.12)
        self.au_mot("Et si on connaît l'aire")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(t, scale=0.8), run_time=0.5)
        self.au_mot("mais pas la longueur")
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(hh), FadeIn(qm, scale=1.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mehdi, menuisier agenceur ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        me = mehdi(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Mehdi")
        nom = self.t("Mehdi", 40, BLEU_CALCUL).next_to(me, UP, buff=0.25)
        self.play(FadeIn(me, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("menuisier agenceur")
        met = self.bloc(["menuisier", "agenceur"], 28, BLEU_CALCUL).next_to(me, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("meubles sur mesure")
        lm = self.t("des meubles sur mesure", 30, BOIS_C).move_to(P(1.2, 2.9))
        self.play(FadeIn(lm, shift=DOWN * 0.1), run_time=0.4)
        f = self.tablette(0.36, P(-0.9, 0.35))
        self.au_mot("une tablette en triangle")
        self.play(FadeIn(f.tri, shift=UP * 0.2), run_time=0.5)
        self.au_mot("24 décimètres carrés")
        e24 = sur_fond(m2("24 dm²", 26, WHITE)).move_to(f.A + P(5.3 * f.u, 1.1 * f.u))
        l1 = self.ligne([("Aire :", WHITE), ("24 dm²", VERT_OK)], 34)
        self.col(l1, 1.3, 2.3)
        self.play(FadeIn(e24, scale=1.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("une base de 8 décimètres")
        c8 = cote(f.base, "8 dm", DOWN, fs=28, couleur=BASE_C, audit=False)
        l2 = self.ligne([("Base :", WHITE), ("8 dm", BASE_C)], 34)
        self.col(l2, 0.5, 2.3)
        self.play(Create(f.base), FadeIn(c8), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Quelle hauteur")
        qm = self.sur_tablette(f, "?", 4.0, 3.0, 36, JAUNE_TITRE)
        l3 = self.bloc(["Quelle hauteur", "découper ?"], 36, JAUNE_TITRE)
        self.col(l3, -0.55, 2.3)
        self.play(Create(f.hh), FadeIn(f.eq), FadeIn(qm, scale=1.3), FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 02 : remonter la formule (24 × 2 = 48 ; 48 ÷ 8 = 6) ─────────────────
    def ecran_remonter(self):
        self.ecran("02-remonter")
        f = self.tablette()
        c8 = cote(f.base, "8 dm", DOWN, fs=28, couleur=BASE_C, audit=False)
        qm = self.sur_tablette(f, "?", 4.0, 3.0, 36, JAUNE_TITRE)
        self.add(f.tri, f.base, f.hh, f.eq, c8, qm)
        l1 = self.ligne([("Base × hauteur ÷ 2", BLEU_D), ("= 24", VERT_OK)], 36, buff=0.2)
        self.col(l1, 2.5)
        self.au_mot("Base fois hauteur")
        self.play(FadeIn(l1[0][:13], shift=UP * 0.1), run_time=0.4)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l1[0][13:], shift=UP * 0.1), run_time=0.3)
        self.au_mot("égale 24")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Donc base × hauteur", BLEU_D)], 36)
        self.col(l2, 1.6)
        self.au_mot("Donc base fois hauteur")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("= 24 × 2", BLEU_D), ("= 48", VERT_OK)], 40, buff=0.25)
        self.col(l3, 0.85)
        self.au_mot("égale 24 fois 2")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2, 48")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("La base fait 8 :", BASE_C), ("48 ÷ 8", BLEU_D)], 36, buff=0.25)
        self.col(l4, -0.05)
        self.au_mot("La base fait 8")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(f.base, color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.4)
        self.au_mot("48 divisé par 8")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        res = self.gros("hauteur : 6 dm", fs=40)
        self.col(res, -1.05)
        c6 = self.sur_tablette(f, "6 dm", 4.7, 2.7, 28, HAUTEUR_C)
        self.au_mot("la hauteur fait 6 décimètres")
        self.play(FadeIn(res, scale=1.2), ReplacementTransform(qm, c6), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : vérifier (8 × 6 = 48, ÷ 2 = 24) ────────────────────────────────
    def ecran_verifier(self):
        self.ecran("03-verifier")
        f = self.tablette()
        c8 = cote(f.base, "8 dm", DOWN, fs=28, couleur=BASE_C, audit=False)
        c6 = self.sur_tablette(f, "6 dm", 4.7, 2.7, 28, HAUTEUR_C)
        self.add(f.tri, f.base, f.hh, f.eq, c8, c6)
        l0 = self.t("Mehdi vérifie :", 38, JAUNE_TITRE)
        self.col(l0, 2.3)
        self.au_mot("Mehdi vérifie")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("8 × 6", BLEU_D), ("= 48,", VERT_OK)], 42, buff=0.25)
        self.col(l1, 1.3)
        self.au_mot("8 fois 6")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("6, 48")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("÷ 2", BLEU_D), ("= 24", VERT_OK)], 42, buff=0.25)
        self.col(l2, 0.35)
        self.au_mot("divisé par 2")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, 24")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("C'est bien 24 dm² !", fs=38)
        self.col(res, -0.8, 0.2)
        e24 = sur_fond(m2("24 dm²", 28, WHITE)).move_to(f.A + P(5.3 * f.u, 1.1 * f.u))
        self.au_mot("C'est bien 24 décimètres carrés")
        self.play(FadeIn(res, scale=1.15), FadeIn(e24, scale=1.2), run_time=0.45)
        self.insister(res, 1.05, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        etapes = [("On écrit la formule,", "on écrit la formule"),
                  ("on remplace ce qu'on connaît,", "on remplace ce qu'on connaît"),
                  ("puis on remonte le calcul.", "puis on remonte le calcul")]
        ys = [2.1, 1.35, 0.6]
        for (s, m), y in zip(etapes, ys):
            l = self.t(s, 36, WHITE)
            gauche(l, -6.0, y)
            self.au_mot(m)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.35)
        A, B, C, H = triangle_hb(4, 3, 1.2, 0.36, P(-5.0, -1.15))
        t = tri(A, B, C, BOIS_C, BOIS_B, 4)
        lt = self.ligne([("Triangle :", BOIS_C), ("hauteur = aire × 2 ÷ base", BLEU_D)], 34, buff=0.25)
        gauche(lt, -3.9, -0.6)
        self.au_mot("Triangle")
        self.play(FadeIn(t, scale=0.9), FadeIn(lt[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("hauteur égale aire fois 2")
        self.play(FadeIn(lt[1][:15], shift=UP * 0.1), run_time=0.35)
        self.au_mot("divisé par la base")
        self.play(FadeIn(lt[1][15:], shift=UP * 0.1), run_time=0.3)
        A, B, C, D, H = para_pts(3.2, 2.6, 1.2, 0.36, P(-5.0, -2.45))
        p = Polygon(A, B, C, D, fill_color=PARA_C, fill_opacity=1, stroke_color=PARA_B, stroke_width=4)
        lp = self.ligne([("Parallélogramme :", PARA_C), ("base = aire ÷ hauteur", BLEU_D)], 34, buff=0.25)
        gauche(lp, -3.9, -2.0)
        self.au_mot("Parallélogramme")
        self.play(FadeIn(p, scale=0.9), FadeIn(lp[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("base égale aire divisée par la hauteur")
        self.play(FadeIn(lp[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.42
        A, B, C, H = triangle_hb(8, 5, 2, u, P(-3.6, 1.45))
        t = tri(A, B, C, TRI_C, TRI_B, 4)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        eq = equerre(H, RIGHT, UP, 0.2, HAUTEUR_C)
        c8 = cote(Line(A, B), "8 cm", DOWN, fs=28, couleur=BASE_C, audit=False)
        e20 = sur_fond(m2("20 cm²", 26, WHITE)).move_to(A + P(4.7 * u, 1.2 * u))
        qm = self.t("?", 34, JAUNE_TITRE)
        hors_audit(qm)
        sur_fond(qm).move_to(A + P(2 * u, 3.0 * u))

        def autres_q(sc):
            sc.play(FadeIn(t), Create(hh), FadeIn(eq), FadeIn(c8), FadeIn(e20), FadeIn(qm), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un triangle a une aire de 20 cm²", "et une base de 8 cm.",
                              "Quelle est sa hauteur ?"],
                             [self.choix("10 cm"), self.choix("5 cm"), self.choix("2,5 cm")], 1,
                             ["20 × 2 = 40.", "40 ÷ 8 = 5 cm.", "2,5 : l'oubli du × 2."],
                             -0.4, couper={0: ("20 × 2", "= 40."), 1: ("40 ÷ 8", "= 5 cm.")},
                             mot_q="Un triangle", avant_q=autres_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        A, B, C, H = triangle_hb(4, 3, 1.2, 0.42, P(-4.7, 1.25))
        t = tri(A, B, C, BOIS_C, BOIS_B, 4)
        l1 = self.bloc(["Triangle : on multiplie l'aire", "par 2 avant de diviser."], 34, BOIS_C)
        gauche(l1, -3.4, 1.45)
        self.au_mot("Pour un triangle")
        self.play(FadeIn(t, scale=0.9), FadeIn(l1[0][:9], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on multiplie l'aire par 2")
        self.play(FadeIn(l1[0][9:], shift=UP * 0.1), FadeIn(l1[1][:4], shift=UP * 0.1), run_time=0.35)
        self.au_mot("avant de diviser")
        self.play(FadeIn(l1[1][4:], shift=UP * 0.1), run_time=0.3)
        A, B, C, D, H = para_pts(3.2, 2.6, 1.2, 0.42, P(-4.7, -0.75))
        p = Polygon(A, B, C, D, fill_color=PARA_C, fill_opacity=1, stroke_color=PARA_B, stroke_width=4)
        l2 = self.ligne([("Parallélogramme :", PARA_C), ("non.", ROUGE_ERREUR)], 36, buff=0.25)
        gauche(l2, -3.4, -0.7)
        self.au_mot("Pour un parallélogramme")
        self.play(FadeIn(p, scale=0.9), FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("non")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.3)
        l3 = self.bloc(["Toujours : on vérifie", "en refaisant le calcul."], 38, VERT_OK)
        gauche(l3, -3.4, -2.2)
        self.au_mot("Et toujours")
        self.play(FadeIn(l3[0][:9], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on vérifie")
        self.play(FadeIn(l3[0][9:], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en refaisant le calcul")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.insister(l3, 1.05, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.38
        A, B, C, D, H = para_pts(6, 4, 2, u, P(-3.6, 1.5))
        p = Polygon(A, B, C, D, fill_color=PARA_C, fill_opacity=1, stroke_color=PARA_B, stroke_width=4)
        hh = DashedLine(D, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        eq = equerre(H, RIGHT, UP, 0.2, HAUTEUR_C)
        c4 = self.t("4 cm", 26, HAUTEUR_C)
        hors_audit(c4)
        sur_fond(c4).move_to(A + P(3.4 * u, 3.1 * u))
        e36 = sur_fond(m2("36 cm²", 26, WHITE)).move_to(A + P(4.4 * u, 1.2 * u))
        qm = self.t("?", 38, JAUNE_TITRE)
        hors_audit(qm)
        qm.next_to(Line(A, B), DOWN, buff=0.1)

        def autres_q(sc):
            sc.play(FadeIn(p), Create(hh), FadeIn(eq), FadeIn(c4), FadeIn(e36), FadeIn(qm), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un parallélogramme a une aire", "de 36 cm² et une hauteur de 4 cm.",
                              "Quelle est sa base ?"],
                             [self.choix("32 cm"), self.choix("18 cm"), self.choix("9 cm")], 2,
                             ["36 ÷ 4 = 9 cm.", "On vérifie : 9 × 4 = 36.", "18 : la base d'un triangle",
                              "de même aire."],
                             -0.3, couper={0: ("36 ÷ 4", "= 9 cm."), 1: ("On vérifie :", "9 × 4", "= 36."),
                                           2: ("18 :", "la base d'un triangle")},
                             mot_q="Un parallélogramme", avant_q=autres_q)

    # ── 08 : le défi (le plan de travail en L) ──────────────────────────────
    def plan(self):
        """Le plan de travail en L, vu de dessus (1 unité = 0,1 m) : 12 × 6 en bas, 6 × 8 qui monte à droite."""
        u, o = 0.28, P(-5.0, -1.95)
        m1 = rect_m(0, 0, 12, 6, u, o, P1_C)
        m2_ = rect_m(6, 6, 6, 8, u, o, P2_C)
        return m1, m2_, u, o

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        m1, m2_, u, o = self.plan()
        x = -0.6
        l0 = self.t("Un plan de travail en L :", 34, WHITE)
        self.col(l0, 2.2, x)
        self.au_mot("un plan de travail en L")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("1,20 m sur 0,60 m,", P1_C)], 34)
        self.col(l1, 1.5, x)
        c120 = cote(Line(m1.get_corner(DL), m1.get_corner(DR)), "1,20 m", DOWN, fs=26, couleur=P1_C, audit=False)
        c60 = cote(Line(m1.get_corner(DL), m1.get_corner(UL)), "0,60 m", LEFT, fs=26, couleur=P1_C, audit=False)
        self.au_mot("Un morceau mesure 1,20 mètre sur 0,60 mètre")
        self.play(FadeIn(m1), FadeIn(c120), FadeIn(c60), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("0,80 m sur 0,60 m.", P2_C)], 34)
        self.col(l2, 0.8, x)
        c80 = cote(Line(m2_.get_corner(UL), m2_.get_corner(DL)), "0,80 m", LEFT, fs=26, couleur=P2_C,
                   audit=False)
        c60b = cote(Line(m2_.get_corner(UL), m2_.get_corner(UR)), "0,60 m", UP, fs=26, couleur=P2_C, audit=False)
        self.au_mot("L'autre mesure 0,80 mètre sur 0,60 mètre")
        self.play(FadeIn(m2_), FadeIn(c80), FadeIn(c60b), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        l3 = self.ligne([("Plaques de", PLAQUE_C), ("0,50 m².", PLAQUE_C)], 34)
        self.col(l3, 0.1, x)
        self.au_mot("Le revêtement se vend en plaques")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de 0,50 mètre carré")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("Combien de plaques ?", 36, JAUNE_TITRE)
        self.col(l4, -0.65, x)
        self.au_mot("Combien de plaques")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        m1, m2_, u, o = self.plan()
        self.add(m1, m2_)
        x = -0.6
        l1 = self.ligne([("1,20 × 0,60", BLEU_D), ("= 0,72 m²", VERT_OK)], 34, buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("1,20 fois 0,60")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(m1, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.35)
        self.au_mot("0,72 mètre carré")
        e72 = sur_fond(m2("0,72", 28, WHITE)).move_to(m1)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e72), run_time=0.3)
        l2 = self.ligne([("0,80 × 0,60", BLEU_D), ("= 0,48", VERT_OK)], 34, buff=0.2)
        self.col(l2, 1.5, x)
        self.au_mot("0,80 fois 0,60")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(m2_, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.35)
        self.au_mot("0,48")
        e48 = sur_fond(m2("0,48", 28, WHITE)).move_to(m2_)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(e48), run_time=0.3)
        l3 = self.ligne([("En tout :", JAUNE_TITRE), ("1,20 m²", VERT_OK)], 36, buff=0.2)
        self.col(l3, 0.8, x)
        self.au_mot("En tout")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,20 mètre carré")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("2 plaques couvrent 1 m² :", PLAQUE_C)], 34)
        self.col(l4, 0.1, x)
        self.au_mot("2 plaques couvrent 1 mètre carré")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        l5 = self.t("pas assez.", 34, ROUGE_ERREUR)
        self.col(l5, -0.55, x)
        self.au_mot("pas assez")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        res = self.gros("Il faut 3 plaques.", fs=46)
        self.col(res, -1.45, x)
        pl = VGroup(*[Rectangle(width=0.62, height=0.42, fill_color=PLAQUE_C, fill_opacity=1, stroke_color="#92400e",
                                stroke_width=3) for _ in range(3)]).arrange(RIGHT, buff=0.12)
        pl.move_to(P(-3.3, -3.05))
        self.au_mot("Il faut 3 plaques")
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(q, shift=DOWN * 0.15) for q in pl], lag_ratio=0.2),
                  run_time=0.6)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        A, B, C, H = triangle_hb(8, 6, 3, 0.3, ORIGIN)
        t = tri(A, B, C, BOIS_C, BOIS_B, 4)
        hh = DashedLine(C, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        fig = VGroup(t, hh)
        lignes = self.finale_gauche(fig, textes=[
            ("Si on connaît l'aire,", "on remonte la formule."),
            ("Triangle : hauteur", "= aire × 2 ÷ base."),
            ("Parallélogramme :", "base = aire ÷ hauteur."),
            ("Et on vérifie", "toujours.")], fs=30)
        self.add(fig)
        self.au_mot("Si on connaît l'aire")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("Triangle")
        self.montrer_ligne(lignes[1])
        self.au_mot("Parallélogramme")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et on vérifie toujours")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_remonter()
        self.ecran_verifier()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
