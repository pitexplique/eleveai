# aire_probleme.py
# EleveAI — Maths 6e — série « Aire » (lot A1-A4), épisode 03 : PROBLÈMES D'AIRES
# (micro aire_probleme, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 6e-aire-probleme-short (mur de 12 m², pots de 5 m² : 3 pots).
# Décor et métier : Yanis, MAÇON (centres : construction, argent-budget).
# La 6e, un cran au-dessus du CM2 : un problème À ÉTAPES (l'aire, puis le nombre de pots en arrondissant
# AU-DESSUS, puis le prix), et la même unité partout (dalles de 50 cm : 4 par m²).
# Mapping micro → écrans : aire_probleme = 02 (mur 6 × 2,5 = 15 m²), 03 (pots de 4 m² : 15 ÷ 4 = 3,75 →
# 3 pots = 12 m², pas assez → 4 pots), 04 (4 × 12 = 48 € ; les trois étapes), 06 (piège : dalles de 50 cm,
# 4 par m², 15 × 4 = 60 dalles), questions 05 (B : sol 5 × 3, dalles de 1 m² → 15 dalles) et 07 (C : 50 m²,
# seaux de 20 m² → 3 seaux), défi 08 (deux murs 5 × 2,4 = 24 m², pots de 5 m² à 15 € → 5 pots, 75 €).
# Voix : manim/voix/6e-aire-probleme.json (validée par Frédéric le 15/11, Julie, débit −6) ;
# marques : aire_probleme_marques.json (python manim/scripts/6e/aire_surface_marques.py probleme).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/aire_probleme.py AireProbleme6e
# python -m manim render -qh --disable_caching manim/scripts/6e/aire_probleme.py AireProbleme6e -o eleveai-maths-6e-aire-probleme --media_dir manim/scripts/6e/media-aire6-03
# Sortie : manim/sorties/6e/maths/aire/03-probleme/eleveai-maths-6e-aire-probleme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_6e_commun import *  # noqa: E402,F403
from aire_6e_commun import aligner_base  # noqa: E402,F401

MUR_C, MUR_B = "#d6b48a", "#78350f"      # le mur brut (avant l'enduit)
SOL_C, SOL_B = "#cbd5e1", "#475569"      # le sol (question 1)
DALLE_C, DALLE_B = "#fca5a5", "#7f1d1d"  # les dalles de 50 cm (piège)
TERR_C, TERR_B = "#d6a35c", "#78350f"    # la terrasse en bois (question 2)
# les couleurs d'enduit, une par pot (le pot et la partie du mur qu'il couvre ont la même couleur)
ENDUITS = [("#fde68a", "#92400e"), ("#a7f3d0", "#065f46"), ("#c4b5fd", "#4c1d95"), ("#fdba74", "#7c2d12"),
           ("#f9a8d4", "#831843")]


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, buff=0.18):
    """La mesure d'un côté, posée contre la figure (hors audit : le nombre est sur la ligne de texte)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff))


def dedans(mob, s, fs=30, couleur="#0f172a"):
    """L'aire écrite au milieu de la figure (hors audit)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(mob))


def etiquette(mob, s, fs=28):
    """L'aire écrite sur une figure quadrillée, sur un fond clair (les traits ne la barrent plus) ; hors audit."""
    t = Text(s, font_size=fs, color="#0f172a", weight=BOLD)
    f = RoundedRectangle(width=t.width + 0.24, height=t.height + 0.18, corner_radius=0.08, fill_color="#f8fafc",
                         fill_opacity=0.92, stroke_width=0)
    return hors_audit(VGroup(f, t).move_to(mob))


def plaque(w, h, couleur=MUR_C, bord=MUR_B):
    return Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=3)


def mur(n_col, n_plein, reste, c, couleur=CARREAU, bord=CARREAU_B):
    """Un mur de n_col × (n_plein + reste) mètres en carreaux de 1 m² : n_plein rangées pleines, puis une
    rangée de bandes de hauteur reste (2,5 m = 2 rangées + une demi-rangée).
    .cases = les carreaux pleins (rangée par rangée), .bande = la dernière rangée (bandes),
    .fond = la plaque du mur entier (même taille)."""
    cases = rect_cases(n_col, n_plein, c, couleur, bord)
    y0 = -(n_plein - 1) * c - c / 2 - reste * c / 2
    bande = VGroup(*[Rectangle(width=c, height=reste * c, fill_color=couleur, fill_opacity=1, stroke_color=bord,
                               stroke_width=2.5).move_to(P(i * c, y0)) for i in range(n_col)])
    g = VGroup(cases, bande)
    g.cases, g.bande = cases, bande
    g.n_col = n_col
    return g


def fond_de(g, couleur=MUR_C, bord=MUR_B):
    return plaque(g.width, g.height, couleur, bord).move_to(g)


def zone(g, cols, rangs):
    """Les carreaux pleins de g aux colonnes cols et rangées rangs."""
    return VGroup(*[g.cases[j * g.n_col + i] for j in rangs for i in cols])


def peindre(cases, k):
    c, b = ENDUITS[k % len(ENDUITS)]
    return [q.animate.set_fill(c).set_stroke(b) for q in cases]


def pot(s=1.0, couleur=ENDUITS[0][0]):
    """Un pot d'enduit : le seau, le couvercle, l'anse, l'étiquette."""
    seau = RoundedRectangle(width=0.8 * s, height=0.85 * s, corner_radius=0.08 * s, fill_color="#e2e8f0",
                            fill_opacity=1, stroke_color="#475569", stroke_width=3)
    couv = Ellipse(width=0.86 * s, height=0.22 * s, fill_color=couleur, fill_opacity=1, stroke_color="#475569",
                   stroke_width=3).move_to(seau.get_top())
    anse = Arc(radius=0.38 * s, start_angle=0.15, angle=PI - 0.3, color="#475569", stroke_width=4) \
        .move_to(seau.get_top() + UP * 0.2 * s)
    eti = RoundedRectangle(width=0.6 * s, height=0.3 * s, corner_radius=0.05 * s, fill_color=couleur, fill_opacity=1,
                           stroke_width=0).move_to(seau.get_center() + DOWN * 0.05 * s)
    return VGroup(anse, seau, eti, couv)


def pots(n, s=0.7, buff=0.18):
    return VGroup(*[pot(s, ENDUITS[k % len(ENDUITS)][0]) for k in range(n)]).arrange(RIGHT, buff=buff)


def piece(s=1.0):
    """Une pièce d'un euro (dessin : le « € » n'est pas un nombre)."""
    r = Circle(0.4 * s, fill_color="#facc15", fill_opacity=1, stroke_color="#a16207", stroke_width=4)
    e = hors_audit(Text("€", font_size=int(36 * s), color="#713f12", weight=BOLD).move_to(r))
    return VGroup(r, e)


def truelle(s=1.0):
    """La truelle du maçon : la lame en losange, le manche."""
    lame = Polygon(P(0, 0), P(0.5 * s, 0.25 * s), P(1.0 * s, 0), P(0.5 * s, -0.25 * s), fill_color="#cbd5e1",
                   fill_opacity=1, stroke_color="#475569", stroke_width=3)
    tige = Line(P(0, 0), P(-0.25 * s, 0.2 * s), color="#475569", stroke_width=5)
    manche = RoundedRectangle(width=0.5 * s, height=0.16 * s, corner_radius=0.07 * s, fill_color="#92400e",
                              fill_opacity=1, stroke_width=0).rotate(-0.6).move_to(P(-0.42 * s, 0.33 * s))
    return VGroup(tige, manche, lame)


def badge(n, couleur=JAUNE_TITRE):
    r = Circle(0.24, fill_color=couleur, fill_opacity=1, stroke_width=0)
    t = hors_audit(Text(str(n), font_size=26, color="#0f172a", weight=BOLD).move_to(r))
    return VGroup(r, t)


class AireProbleme6e(PaysageAire6eG):
    nom_voix = "6e-aire-probleme"
    fichier_marques = "aire_probleme_marques.json"
    ceinture = "verte"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Problèmes d'aires", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Problèmes d'aires")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Calculer une surface,", "puis s'en servir", "pour décider."], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        m = mur(6, 2, 0.5, 0.42).move_to(P(3.0, 0.75))
        f = fond_de(m)
        pp = pot(0.8).next_to(f, RIGHT, buff=0.35).align_to(f, DOWN)
        eu = piece(0.8).next_to(f, DOWN, buff=0.3).shift(RIGHT * 0.4)
        tr = truelle(0.8).next_to(eu, LEFT, buff=0.5)
        self.au_mot("Calculer une surface")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(f, scale=0.9), run_time=0.5)
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in [*m.cases, *m.bande]], lag_ratio=0.03), run_time=0.6)
        self.au_mot("s'en servir")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(pp, shift=UP * 0.2), FadeIn(tr, shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("pour décider")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(eu, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yanis, maçon ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ya = yanis(1.0).move_to(P(-5.3, 0.25))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 40, BLEU_CALCUL).next_to(ya, UP, buff=0.2)
        self.play(FadeIn(ya, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est maçon")
        met = self.t("maçon", 30, BLEU_CALCUL).next_to(ya, DOWN, buff=0.18)
        tr = truelle(0.9).next_to(met, DOWN, buff=0.3)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(tr, shift=RIGHT * 0.3), run_time=0.4)
        m = mur(6, 2, 0.5, 0.5).move_to(P(-0.4, 1.0))
        f = fond_de(m)
        self.au_mot("il calcule les surfaces")
        self.play(FadeIn(f, scale=0.9), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in [*m.cases, *m.bande]], lag_ratio=0.03), run_time=0.5)
        pp = pot(1.0).next_to(f, RIGHT, buff=0.5).align_to(f, DOWN)
        q1 = self.t("Combien de pots ?", 38, JAUNE_TITRE).move_to(P(-0.2, -1.3))
        self.au_mot("combien de pots")
        self.play(FadeIn(pp, shift=UP * 0.2), FadeIn(q1, shift=UP * 0.15), run_time=0.45)
        eu = piece(1.0).next_to(pp, RIGHT, buff=0.4)
        q2 = self.t("Combien ça coûte ?", 38, JAUNE_TITRE).move_to(P(-0.2, -2.2))
        self.au_mot("combien ça va coûter")
        self.play(FadeIn(eu, scale=0.6), FadeIn(q2, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : l'aire du mur (6 × 2,5 = 15 m²) ────────────────────────────────
    def ecran_aire(self):
        self.ecran("02-aire")
        m = mur(6, 2, 0.5, 0.6).move_to(P(-3.4, 0.6))
        f = fond_de(m)
        self.au_mot("Un mur mesure 6")
        l1 = self.ligne([("Longueur :", GRAY_B), ("6 m", BLEU_D)], 36)
        self.col(l1, 2.6)
        c6 = cote(f, "6 m", UP, couleur=BLEU_D)
        self.play(FadeIn(f, scale=0.9), FadeIn(l1, shift=UP * 0.1), FadeIn(c6), run_time=0.4)
        self.au_mot("et 2,5")
        l2 = self.ligne([("Hauteur :", GRAY_B), ("2,5 m", BLEU_D)], 36)
        self.col(l2, 1.9)
        c25 = cote(f, "2,5 m", LEFT, couleur=BLEU_D)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c25), run_time=0.35)
        self.au_mot("Son aire")
        l3 = self.t("A = longueur × hauteur", 34, JAUNE_TITRE)
        self.col(l3, 1.1)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("6 fois 2,5")
        l4 = self.t("A = 6 × 2,5", 44, BLEU_D)
        self.col(l4, 0.25)
        self.play(FadeIn(l4, scale=1.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in [*m.cases, *m.bande]],
                                                     lag_ratio=0.03), run_time=0.5)
        self.au_mot("15 mètres carrés")
        res = self.gros("A = 15 m²", fs=50)
        self.col(res, -0.85)
        self.play(FadeIn(res, scale=1.2), Indicate(m, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le nombre de pots (15 ÷ 4 = 3,75 → 4 pots) ────────────────────
    def ecran_pots(self):
        self.ecran("03-pots")
        m = mur(6, 2, 0.5, 0.6).move_to(P(-3.6, 1.45))
        a = dedans(m, "15 m²", 40)
        self.add(m, a)
        pp = pots(4, 0.72, 0.3).move_to(P(-3.6, -1.15))
        xl = 0.3
        self.au_mot("couvre 4")
        l1 = self.t("Un pot couvre 4 m².", 34, ENDUITS[0][0])
        self.col(l1, 2.5, xl)
        e4 = cote(pp[0], "4 m²", DOWN, 26, ENDUITS[0][0], 0.15)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pp[0], shift=UP * 0.2), FadeIn(e4), run_time=0.4)
        self.au_mot("15 divisé par 4")
        l2 = self.ligne([("15 ÷ 4", BLEU_D), ("= 3,75", BLEU_D)], 40, buff=0.25)
        self.col(l2, 1.75, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("par 4, 3,75")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("acheter 3,75 pots")
        l3 = self.t("On n'achète pas 3,75 pots !", 30, GRAY_B)
        self.col(l3, 1.05, xl)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 pots")
        l4 = self.ligne([("3 pots", ROUGE_ERREUR), ("couvrent 12 m² :", ROUGE_ERREUR)], 34, buff=0.18)
        self.col(l4, 0.3, xl)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(pp[1], shift=UP * 0.2), FadeIn(pp[2], shift=UP * 0.2),
                  FadeOut(a), run_time=0.3)
        self.au_mot("couvrent 12")
        zones = [zone(m, (2 * k, 2 * k + 1), (0, 1)) for k in range(3)]
        self.play(FadeIn(l4[1], shift=UP * 0.1), *[x for k in range(3) for x in peindre(zones[k], k)], run_time=0.5)
        self.au_mot("pas assez")
        l5 = self.t("pas assez !", 34, ROUGE_ERREUR)
        self.col(l5, -0.3, xl)
        self.play(FadeIn(l5, shift=UP * 0.1),
                  Indicate(m.bande, color=ROUGE_ERREUR, scale_factor=1.05), run_time=0.45)
        self.au_mot("Il en faut 4")
        res = self.gros("Il faut 4 pots.", fs=44)
        self.col(res, -1.2, xl)
        self.play(FadeIn(res, scale=1.2), FadeIn(pp[3], shift=UP * 0.2), *peindre(m.bande, 3),
                  run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : le prix (4 × 12 = 48 €) et les trois étapes ───────────────────
    def ecran_prix(self):
        self.ecran("04-prix")
        pp = pots(4, 0.85, 0.35).move_to(P(-3.6, 1.7))
        self.add(pp)
        xl = 0.3
        self.au_mot("coûte 12")
        l1 = self.ligne([("Un pot :", GRAY_B), ("12 €", AMBRE_D)], 38)
        self.col(l1, 2.4, xl)
        prix = VGroup(*[cote(p, "12 €", DOWN, 26, AMBRE_D, 0.15) for p in pp])
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(x, shift=UP * 0.1) for x in prix], lag_ratio=0.1),
                  run_time=0.5)
        self.au_mot("4 fois 12")
        l2 = self.ligne([("4 × 12", BLEU_D), ("= 48 €", VERT_OK)], 46, buff=0.3)
        self.col(l2, 1.5, xl)
        self.play(FadeIn(l2[0], scale=1.1), run_time=0.25)
        self.au_mot("48 euros")
        bo = SurroundingRectangle(l2, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(bo), run_time=0.35)
        self.au_mot("Trois étapes")
        tit = self.t("Trois étapes :", 40, JAUNE_TITRE)
        gauche(tit, -6.2, -0.05)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        etapes = []
        for k, s in enumerate(["l'aire", "le nombre de pots", "le prix"]):
            etapes.append(VGroup(badge(k + 1), self.t(s, 34)).arrange(RIGHT, buff=0.18))
        fl = [hors_audit(self.t("→", 40, GRAY_B)) for _ in range(2)]
        rang = VGroup(etapes[0], fl[0], etapes[1], fl[1], etapes[2]).arrange(RIGHT, buff=0.3)
        gauche(rang, -6.2, -1.1)
        for e in etapes:
            e[1].align_to(etapes[0][1], DOWN)
        aligner_base([e[1] for e in etapes])
        self.au_mot("l'aire")
        self.play(FadeIn(etapes[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le nombre de pots")
        self.play(FadeIn(fl[0]), FadeIn(etapes[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le prix")
        self.play(FadeIn(fl[1]), FadeIn(etapes[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = 0.46
        f = plaque(5 * c, 3 * c, SOL_C, SOL_B).move_to(P(-3.7, 1.3))
        g = rect_cases(5, 3, c, SOL_C, SOL_B).move_to(f)
        c5 = cote(f, "5 m", UP, 28, BLEU_D)
        c3 = cote(f, "3 m", LEFT, 28, BLEU_D)

        def autres_q(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(c5), FadeIn(c3), run_time=0.35)

        def apres(sc):
            nums = numeros(g, 20, "#0f172a")
            sc.play(FadeIn(g), LaggedStart(*[FadeIn(x, scale=1.4) for x in nums], lag_ratio=0.04), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un sol de 5 m sur 3 m.", "Des dalles de 1 m².", "Combien de dalles ?"],
                             [self.choix("16 dalles"), self.choix("15 dalles"), self.choix("8 dalles")], 1,
                             ["L'aire : 5 × 3 = 15 m².", "Une dalle par m² :", "15 dalles."],
                             -0.05, sans_audit=(2,), mot_q="Un sol", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (dalles de 50 cm : 4 par m²) ──────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        s = 1.15
        grand = Square(2 * s, fill_opacity=0, stroke_color=CARREAU, stroke_width=6).move_to(P(-4.4, 1.0))
        d = [Square(s, fill_color=DALLE_C, fill_opacity=1, stroke_color=DALLE_B, stroke_width=3)
             .move_to(grand.get_corner(UL) + P(s / 2 + (k % 2) * s, -s / 2 - (k // 2) * s)) for k in range(4)]
        xl = -1.6
        self.au_mot("dalles mesurent 50")
        l1 = self.t("Des dalles de 50 cm de côté :", 32, JAUNE_TITRE)
        self.col(l1, 2.05, xl)
        e50 = cote(d[0], "50 cm", UP, 20, DALLE_C, 0.12)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(d[0], scale=0.6), FadeIn(e50), run_time=0.4)
        self.au_mot("ne fait pas 1 mètre carré")
        l2 = self.t("une dalle ne fait pas 1 m² !", 32, ROUGE_ERREUR)
        self.col(l2, 1.4, xl)
        e1 = cote(grand, "1 m", LEFT, 26, CARREAU, 0.15)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(grand), FadeIn(e1), run_time=0.45)
        self.au_mot("Dans 1 mètre")
        l3 = self.ligne([("Dans 1 m :", GRAY_B), ("2 × 50 cm", BLEU_D)], 34)
        self.col(l3, 0.7, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2 fois 50 centimètres")
        e50b = cote(d[1], "50 cm", UP, 20, DALLE_C, 0.12).align_to(e50, DOWN)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(d[1], scale=0.6), FadeIn(e50b), run_time=0.35)
        self.au_mot("2 fois 2")
        l4 = self.ligne([("1 m² :", GRAY_B), ("2 × 2", BLEU_D), ("= 4 dalles", VERT_OK)], 34)
        hors_audit(l4[0])
        self.col(l4, 0.0, xl)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, 4 dalles")
        nums = VGroup(*[hors_audit(Text(str(k + 1), font_size=30, color="#0f172a", weight=BOLD).move_to(d[k]))
                        for k in range(4)])
        self.play(FadeIn(l4[2], shift=UP * 0.1), FadeIn(d[2], scale=0.6), FadeIn(d[3], scale=0.6), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.15), run_time=0.4)
        self.au_mot("Pour 15 mètres carrés")
        l5 = self.t("Pour 15 m² :", 34, JAUNE_TITRE)
        self.col(l5, -0.8, xl)
        c = 0.18
        sol = VGroup(*[Square(c, fill_color=DALLE_C, fill_opacity=1, stroke_color=DALLE_B, stroke_width=1.5)
                       .move_to(P(i * c, -j * c)) for j in range(6) for i in range(10)]).move_to(P(-4.4, -1.6))
        traits = VGroup(*[Line(sol.get_corner(UL) + RIGHT * 2 * c * k, sol.get_corner(DL) + RIGHT * 2 * c * k,
                               color=CARREAU, stroke_width=3) for k in range(1, 5)],
                        *[Line(sol.get_corner(UL) + DOWN * 2 * c * k, sol.get_corner(UR) + DOWN * 2 * c * k,
                               color=CARREAU, stroke_width=3) for k in range(1, 3)],
                        Rectangle(width=sol.width, height=sol.height, stroke_color=CARREAU, stroke_width=4).move_to(sol))
        self.play(FadeIn(l5, shift=UP * 0.1), Create(traits), run_time=0.35)
        self.au_mot("15 fois 4")
        l6 = self.ligne([("15 × 4", BLEU_D), ("= 60 dalles", VERT_OK)], 40, buff=0.25)
        self.col(l6, -1.55, xl)
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("60 dalles")
        e60 = cote(sol, "60 dalles", DOWN, 24, DALLE_C, 0.15)
        self.play(FadeIn(l6[1], shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in sol], lag_ratio=0.01),
                  FadeIn(e60), run_time=0.6)
        self.add(traits)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = 0.25
        g = rect_cases(10, 5, c, TERR_C, TERR_B).move_to(P(-3.2, 1.3))
        f = plaque(g.width, g.height, TERR_C, TERR_B).move_to(g)
        a = dedans(f, "50 m²", 30)
        sz = pot(0.75).next_to(f, LEFT, buff=0.5).align_to(f, UP)
        e20 = cote(sz, "20 m²", DOWN, 24, ENDUITS[0][0], 0.15)

        def autres_q(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(a), FadeIn(sz, shift=UP * 0.2), FadeIn(e20), run_time=0.35)

        def zone_r(r0, r1):
            return VGroup(*[g[j * 10 + i] for j in range(r0, r1) for i in range(10)])

        def apres(sc):
            sc.rep(0)
            sc.play(FadeOut(a), FadeIn(g), run_time=0.2)
            sc.rep(1, avec=[*peindre(zone_r(0, 2), 0), *peindre(zone_r(2, 4), 1)])
            sc.rep(2, avec=peindre(zone_r(4, 5), 3))
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Une terrasse : 50 m².", "Un seau : 20 m².", "Combien de seaux ?"],
                             [self.choix("2 seaux"), self.choix("2,5 seaux"), self.choix("3 seaux")], 2,
                             ["50 ÷ 20 = 2,5.", "2 seaux couvrent 40 m² :", "pas assez. Il en faut 3."],
                             -0.05, mot_q="Une terrasse", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (deux murs, combien va-t-il payer ?) ───────────────────
    def murs_defi(self, c=0.52):
        m1 = mur(5, 2, 0.4, c).move_to(P(-3.9, 1.6))
        m2_ = mur(5, 2, 0.4, c).move_to(P(-3.9, -0.2))
        return m1, m2_

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        m1, m2_ = self.murs_defi()
        f1, f2 = fond_de(m1), fond_de(m2_)
        xl = 0.3
        self.au_mot("deux murs pareils")
        l0 = self.t("Deux murs pareils,", 34, GRAY_B)
        self.col(l0, 2.3, xl)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f1, scale=0.9), FadeIn(f2, scale=0.9), run_time=0.45)
        self.au_mot("de 5 mètres")
        l1 = self.ligne([("de 5 m", WHITE), ("sur 2,4 m.", WHITE)], 34)
        self.col(l1, 1.65, xl)
        c5 = VGroup(cote(f1, "5 m", UP, 26, BLEU_D, 0.12), cote(f2, "5 m", UP, 26, BLEU_D, 0.12))
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c5), run_time=0.3)
        self.au_mot("sur 2,4")
        c24 = VGroup(cote(f1, "2,4 m", LEFT, 26, BLEU_D), cote(f2, "2,4 m", LEFT, 26, BLEU_D))
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c24), run_time=0.3)
        self.au_mot("couvre 5")
        l2 = self.t("Un pot couvre 5 m²", 34, ENDUITS[0][0])
        self.col(l2, 0.9, xl)
        pp = pot(0.8).move_to(P(-4.0, -1.9))
        e5 = cote(pp, "5 m²", LEFT, 26, ENDUITS[0][0], 0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pp, shift=UP * 0.2), FadeIn(e5), run_time=0.4)
        self.au_mot("coûte 15")
        l3 = self.t("et coûte 15 €.", 34, AMBRE_D)
        self.col(l3, 0.3, xl)
        e15 = cote(pp, "15 €", RIGHT, 26, AMBRE_D, 0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(e15), run_time=0.35)
        self.au_mot("Combien va-t-il payer")
        q = self.bloc(["Combien va-t-il", "payer ?"], 38, JAUNE_TITRE)
        self.col(q, -0.65, xl)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(VGroup(pp, e15)), run_time=0.5)
        self.pause_defi(y=-1.85)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        m1, m2_ = self.murs_defi()
        f1, f2 = fond_de(m1), fond_de(m2_)
        c5 = VGroup(cote(f1, "5 m", UP, 26, BLEU_D, 0.12), cote(f2, "5 m", UP, 26, BLEU_D, 0.12))
        c24 = VGroup(cote(f1, "2,4 m", LEFT, 26, BLEU_D), cote(f2, "2,4 m", LEFT, 26, BLEU_D))
        self.add(f1, f2, c5, c24)
        xl = 0.3
        self.au_mot("Un mur")
        l1 = self.ligne([("Un mur :", GRAY_B), ("5 × 2,4", BLEU_D), ("= 12 m²", VERT_OK)], 36)
        self.col(l1, 2.3, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(f1, color=VERT_OK, scale_factor=1.04), run_time=0.3)
        self.au_mot("5 fois 2,4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 mètres carrés")
        a1 = etiquette(m1, "12 m²")
        self.play(FadeIn(l1[2], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in [*m1.cases, *m1.bande]],
                                                              lag_ratio=0.02), run_time=0.5)
        self.play(FadeIn(a1, scale=1.2), run_time=0.2)
        self.au_mot("Deux murs")
        l2 = self.ligne([("Deux murs :", GRAY_B), ("24 m²", VERT_OK)], 36)
        self.col(l2, 1.6, xl)
        a2 = etiquette(m2_, "12 m²")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(m2_), FadeIn(a2), run_time=0.35)
        self.au_mot("24 mètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(VGroup(m1, m2_, a1, a2), color=VERT_OK, scale_factor=1.03),
                  run_time=0.4)
        pp = pots(5, 0.62, 0.16).move_to(P(-4.0, -1.85))
        self.au_mot("4 pots")
        l3 = self.ligne([("4 pots", ROUGE_ERREUR), ("couvrent 20 m² :", ROUGE_ERREUR)], 34, buff=0.18)
        self.col(l3, 0.9, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in pp[:4]],
                                                              lag_ratio=0.12), run_time=0.4)
        self.au_mot("couvrent 20")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas assez")
        l3b = self.t("pas assez !", 34, ROUGE_ERREUR)
        self.col(l3b, 0.35, xl)
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 pots")
        l4 = self.ligne([("5 pots", VERT_OK), ("couvrent 25 m².", VERT_OK)], 34, buff=0.18)
        self.col(l4, -0.3, xl)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(pp[4], shift=UP * 0.2), run_time=0.3)
        self.au_mot("couvrent 25")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(pp, color=VERT_OK, scale_factor=1.08), run_time=0.4)
        # chaque signe est son propre Text : « × 15 » d'un seul Text collait le 15 au ×
        tk = aligner_base(VGroup(*[Text(x, font_size=44, color=c, weight=BOLD)
                                   for x, c in (("5", BLEU_D), ("×", BLEU_D), ("15", BLEU_D),
                                                ("=", VERT_OK), ("75 €", VERT_OK))])
                          .arrange(RIGHT, buff=0.24))
        mots = VGroup(tk[0], VGroup(tk[1], tk[2]), VGroup(tk[3], tk[4]))
        boite = SurroundingRectangle(mots, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.col(VGroup(boite, mots), -1.3, xl)
        # « 5 » et « × 15 » : deux Text (un Text coupé en morceaux n'entrait en scène qu'à insister())
        self.play(FadeIn(mots[0], scale=1.15), run_time=0.2)  # (la synchro attend le « 5 » de « 5 fois 15 »)
        self.au_mot("5 fois 15")
        self.play(FadeIn(mots[1], scale=1.15), run_time=0.2)
        self.au_mot("paie 75")
        self.play(FadeIn(mots[2], shift=UP * 0.1), Create(boite), run_time=0.35)
        self.insister(VGroup(boite, mots), 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        m = mur(6, 2, 0.5, 0.36)
        pp = pots(4, 0.5, 0.14)
        fig = VGroup(m, pp).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("Par étapes : d'abord la surface,", "puis ce qu'elle permet de calculer."),
            ("Acheter assez :", "on arrondit au-dessus."),
            ("La même unité partout.",)], fs=32)
        self.add(fig)
        self.au_mot("Un problème d'aire")
        self.montrer_ligne(lignes[0], Indicate(m, scale_factor=1.05))
        self.au_mot("acheter assez")
        self.montrer_ligne(lignes[1], Indicate(pp, scale_factor=1.08))
        self.au_mot("même unité")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_aire()
        self.ecran_pots()
        self.ecran_prix()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
