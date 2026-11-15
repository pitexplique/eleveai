# 5e_aire_parallelogramme.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode A3 : L'AIRE DU PARALLÉLOGRAMME
# (micro aire_parallelogramme, notion aire_surface), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-aire-parallelogramme-short (le coup de ciseaux, 5 × 2 = 10 cm²).
# Décor et métier : Soraya, GRAPHISTE (motifs pour tissus ; centres arts-creation, mode).
# Mapping micro → écrans : 02 (base 6 cm, hauteur 4 cm ; on coupe le triangle de gauche, on le glisse à droite :
# un rectangle), 03 (6 × 4 = 24 cm², rien n'est perdu), 04 (méthode : base × hauteur, PAS de ÷ 2),
# 06 (piège : pas le côté penché), questions 05 (C : 8 × 5 = 40 cm² ; 20 = ÷ 2 en trop)
# et 07 (B : 6 × 4 = 24 cm², le côté de 5 cm ne sert pas), défi 08 (tissu 60 × 40 = 2 400 cm² ; 2 400 ÷ 24 = 100).
# Fiche : lib/fiches/maths-5e-aires.tsx.
# Voix : manim/voix/5e-aire-parallelogramme.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_aire_parallelogramme_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py aire-parallelogramme).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_aire_parallelogramme.py AireParallelogramme5e
# Sortie finale : manim/sorties/5e/maths/aire/03-parallelogramme/eleveai-maths-5e-aire-parallelogramme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

PARA_C, PARA_B = "#e879f9", "#86198f"   # le motif de Soraya (magenta)
TISSU_C = "#fce7f3"


def para_pts(base, haut, dec, u, o=ORIGIN):
    """Le parallélogramme ABCD (AB = la base en bas, penché vers la droite de dec), centré en o.
    H = le pied de la hauteur issue de D. Renvoie (A, B, C, D, H)."""
    A = o + P(-(base + dec) * u / 2, -haut * u / 2)
    B = A + P(base * u, 0)
    C = B + P(dec * u, haut * u)
    D = A + P(dec * u, haut * u)
    H = A + P(dec * u, 0)
    return A, B, C, D, H


def poly(pts, couleur=PARA_C, bord=PARA_B, sw=5, op=1.0):
    return Polygon(*pts, fill_color=couleur, fill_opacity=op, stroke_color=bord, stroke_width=sw)


class AireParallelogramme5e(Paysage5e):
    nom_voix = "5e-aire-parallelogramme"
    fichier_marques = "5e_aire_parallelogramme_marques.json"
    ceinture = "verte"

    O = P(-3.4, 0.2)
    U = 0.6

    def figure(self, u=None, o=None, couleur=PARA_C, bord=PARA_B, base=6, haut=4, dec=2):
        u, o = u or self.U, (o if o is not None else self.O)
        A, B, C, D, H = para_pts(base, haut, dec, u, o)
        f = VGroup(poly([A, B, C, D], couleur, bord))
        f.A, f.B, f.C, f.D, f.H, f.u = A, B, C, D, H, u
        f.base = Line(A, B, color=BASE_C, stroke_width=9)
        f.haut = DashedLine(D, H, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
        f.eq = equerre(H, RIGHT, UP, 0.22, HAUTEUR_C)
        return f

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire du parallélogramme", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire du parallélogramme")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Une forme penchée,", "comment la mesurer ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = self.figure(0.42, P(3.3, 0.35))
        self.au_mot("Une forme penchée")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(f[0], scale=0.8), run_time=0.5)
        self.au_mot("comment la mesurer")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(f[0], color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Soraya, graphiste ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        so = soraya(1.0).move_to(P(-5.25, 0.1))
        self.au_mot("Voici Soraya")
        nom = self.t("Soraya", 40, BLEU_CALCUL).next_to(so, UP, buff=0.25)
        self.play(FadeIn(so, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("graphiste")
        met = self.t("graphiste", 30, BLEU_CALCUL).next_to(so, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        # le tissu, couvert de petits motifs
        tissu = Rectangle(width=4.2, height=2.9, fill_color=TISSU_C, fill_opacity=1, stroke_color="#be185d",
                          stroke_width=4).move_to(P(-0.6, 0.55))
        motifs = VGroup(*[poly(para_pts(6, 4, 2, 0.065, tissu.get_corner(UL) + P(0.42 + 0.66 * i, -0.36 - 0.55 * j)),
                               PARA_C, PARA_B, 2) for j in range(5) for i in range(6)])
        lt = self.t("des tissus", 28, "#f9a8d4").next_to(tissu, DOWN, buff=0.2).align_to(tissu, LEFT)
        self.au_mot("des motifs pour des tissus")
        self.play(FadeIn(tissu), LaggedStart(*[FadeIn(m, scale=0.5) for m in motifs], lag_ratio=0.02), FadeIn(lt),
                  run_time=0.9)
        f = self.figure(0.36, P(4.0, 0.6))
        self.au_mot("un parallélogramme")
        lf = self.t("un parallélogramme", 28, PARA_C).next_to(f, UP, buff=0.25)
        self.play(TransformFromCopy(motifs[14], f[0]), FadeIn(lf), run_time=0.8)
        self.au_mot("une forme penchée")
        pen = VGroup(Line(f.A, f.D), Line(f.B, f.C)).set_stroke(JAUNE_TITRE, 8)
        lp = self.t("une forme penchée", 28, JAUNE_TITRE).next_to(f, DOWN, buff=0.25)
        self.play(Create(pen), FadeIn(lp), run_time=0.5)
        self.play(FadeOut(pen), run_time=0.3)
        self.au_mot("Pour l'imprimer")
        q = self.t("Pour l'imprimer, elle doit connaître son aire.", 34, JAUNE_TITRE).move_to(P(0.2, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : couper le triangle, le glisser ─────────────────────────────────
    def ecran_decouper(self):
        self.ecran("02-decouper")
        f = self.figure()
        self.add(f[0])
        A, B, C, D, H, u = f.A, f.B, f.C, f.D, f.H, f.u
        l1 = self.ligne([("base :", BASE_C), ("6 cm", BASE_C)], 38)
        self.col(l1, 2.6)
        c6 = cote(f.base, "6 cm", DOWN, couleur=BASE_C)
        self.au_mot("une base de 6 centimètres")
        self.play(Create(f.base), FadeIn(l1), FadeIn(c6, shift=UP * 0.1), run_time=0.5)
        l2 = self.ligne([("hauteur :", HAUTEUR_C), ("4 cm", HAUTEUR_C)], 38)
        self.col(l2, 1.9)
        c4 = cote(f.haut, "4 cm", RIGHT, couleur=HAUTEUR_C, buff=0.12, fond=True)
        self.au_mot("une hauteur de 4 centimètres")
        self.play(Create(f.haut), Create(f.eq), FadeIn(l2), FadeIn(c4, shift=LEFT * 0.1), run_time=0.6)
        # la découpe : le trapèze reste, le triangle de gauche part
        reste = poly([H, B, C, D])
        morceau = poly([A, H, D], TRI_C, TRI_B)
        l3 = self.bloc(["Soraya coupe", "le petit triangle à gauche."], 34)
        self.col(l3, 0.9)
        self.au_mot("Soraya coupe")
        self.add(reste, morceau)
        self.remove(f[0])
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeOut(c4), FadeOut(f.eq), run_time=0.35)
        self.au_mot("le petit triangle à gauche")
        self.play(FadeIn(l3[1], shift=UP * 0.1), morceau.animate.shift(LEFT * 0.25 + UP * 0.12), run_time=0.5)
        self.play(Indicate(morceau, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.45)
        l4 = self.t("Elle le glisse à droite.", 34)
        self.col(l4, -0.1)
        self.au_mot("Elle le glisse à droite")
        self.play(FadeIn(l4, shift=UP * 0.1), morceau.animate.shift(RIGHT * (6 * u + 0.25) + DOWN * 0.12),
                  FadeOut(c6), f.base.animate.put_start_and_end_on(H, H + RIGHT * 6 * u), run_time=1.3)
        res = self.gros("Un rectangle !", fs=46)
        self.col(res, -1.1)
        cadre = Polygon(H, H + RIGHT * 6 * u, C, D, stroke_color=JAUNE_TITRE, stroke_width=8)
        self.au_mot("devient un rectangle")
        self.play(FadeIn(res, scale=1.2), Create(cadre), run_time=0.6)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le rectangle, 24 cm² ───────────────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("03-rectangle")
        f = self.figure()
        A, B, C, D, H, u = f.A, f.B, f.C, f.D, f.H, f.u
        fantome = DashedVMobject(Polygon(A, B, C, D, stroke_color=PARA_C, stroke_width=4), num_dashes=50)
        rect = VGroup(poly([H, B, C, D]), poly([B, B + RIGHT * 2 * u, C], TRI_C, TRI_B))
        self.add(fantome, rect)
        l1 = self.ligne([("6 cm", BLEU_D), ("sur 4 :", BLEU_D)], 38)
        self.col(l1, 2.6)
        c6 = cote(Line(H, H + RIGHT * 6 * u), "6 cm", DOWN, couleur=BASE_C)
        c4 = cote(Line(H + RIGHT * 6 * u, C), "4 cm", RIGHT, couleur=HAUTEUR_C)
        self.au_mot("Ce rectangle mesure 6 centimètres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c6), run_time=0.4)
        self.au_mot("sur 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c4), run_time=0.35)
        l2 = self.t("Son aire :", 34, JAUNE_TITRE)
        self.col(l2, 1.75)
        self.au_mot("Son aire")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("6 × 4", BLEU_D), ("= 24", VERT_OK)], 50, buff=0.3)
        self.col(l3, 0.95)
        self.au_mot("6 fois 4")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.35)
        self.au_mot("4, 24")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        res = self.gros("24 cm²", fs=46)
        self.col(res, 0.0)
        self.au_mot("24 centimètres carrés")
        self.play(FadeIn(res, scale=1.2), Indicate(rect, color=JAUNE_TITRE, scale_factor=1.02), run_time=0.5)
        l4 = self.t("Rien n'a été perdu :", 34, WHITE)
        self.col(l4, -0.95)
        self.au_mot("Rien n'a été perdu")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        # le triangle revient à sa place : le parallélogramme
        retour = rect[1].copy()
        self.au_mot("le parallélogramme")
        l5 = self.ligne([("même aire :", VERT_OK), ("24 cm²", VERT_OK)], 40)
        self.col(l5, -1.75)
        self.play(retour.animate.shift(LEFT * 6 * u).set_fill(PARA_C).set_stroke(PARA_B), FadeOut(rect[1]),
                  FadeOut(c4), c6.animate.shift(LEFT * 2 * u), run_time=0.8)
        self.au_mot("la même aire")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("aire, 24")
        self.play(FadeIn(l5[1], scale=1.2), run_time=0.35)
        self.insister(l5, 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        f = self.figure()
        self.add(f[0])
        self.au_mot("La méthode")
        l1 = self.t("La méthode :", 38, JAUNE_TITRE)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("base", BASE_C), ("×", WHITE), ("hauteur", HAUTEUR_C)], 46, buff=0.2)
        self.col(l2, 1.6)
        self.au_mot("base fois hauteur")
        self.play(FadeIn(l2), Create(f.base), Create(f.haut), Create(f.eq), run_time=0.6)
        self.insister(l2, 1.12, 0.25)
        l3 = self.t("Et c'est tout :", 36, WHITE)
        self.col(l3, 0.45)
        self.au_mot("Et c'est tout")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        l4 = self.bloc(["pour le parallélogramme,", "on ne divise pas par 2."], 36, ROUGE_ERREUR)
        self.col(l4, -0.6)
        self.au_mot("pour le parallélogramme")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on ne divise pas par 2")
        barre = Line(LEFT * 0.6, RIGHT * 0.6, color=ROUGE_ERREUR, stroke_width=8)
        d2 = self.t("÷ 2", 44, GRAY_B)
        hors_audit(d2)
        self.col(d2, -1.6)
        barre.move_to(d2)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(d2), run_time=0.35)
        self.play(Create(barre), run_time=0.35)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        A, B, C, D, H = para_pts(8, 5, 2.5, 0.3, P(-3.6, 1.55))
        t = poly([A, B, C, D], PARA_C, PARA_B, 4)
        hh = DashedLine(D, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        eq = equerre(H, RIGHT, UP, 0.2, HAUTEUR_C)
        c8 = cote(Line(A, B), "8 cm", DOWN, fs=28, couleur=BASE_C, audit=False)
        c5 = cote(hh, "5 cm", RIGHT, fs=28, couleur=HAUTEUR_C, audit=False, buff=0.12, fond=True)
        c5.align_to(hh, DOWN).shift(UP * 0.12)
        self.play(FadeIn(t), Create(hh), FadeIn(eq), FadeIn(c8), FadeIn(c5), run_time=0.4)

        def apres(sc):
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Un parallélogramme a une base", "de 8 cm et une hauteur de 5 cm.",
                              "Quelle est son aire ?"],
                             [self.choix("20 cm²"), self.choix("13 cm²"), self.choix("40 cm²")], 2,
                             ["8 × 5 = 40 cm².", "20 : diviser par 2 en trop,", "c'est pour le triangle."],
                             -0.15, couper={0: ("8 × 5", "= 40 cm².")}, mot_q="Un", autres_r=apres)

    # ── 06 : le piège (le côté penché) ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        f = self.figure(0.55, P(-3.4, 0.1), TRI_C, TRI_B)
        self.add(f[0])
        self.au_mot("La hauteur n'est pas le côté penché")
        l1 = self.bloc(["La hauteur n'est pas", "le côté penché !"], 36, PENCHE_C)
        self.col(l1, 1.9)
        pen = Line(f.B, f.C, color=PENCHE_C, stroke_width=10)
        croix = Cross(stroke_color=PENCHE_C, stroke_width=8).scale(0.25).move_to(pen.get_center() + P(0.4, 0))
        self.play(FadeIn(l1, shift=UP * 0.1), Create(pen), run_time=0.45)
        self.play(Create(croix), Wiggle(pen), run_time=0.5)
        l2 = self.bloc(["Elle tombe tout droit", "sur la base,"], 36, HAUTEUR_C)
        self.col(l2, 0.4)
        self.au_mot("Elle tombe tout droit")
        trait = Line(f.D, f.H, color=HAUTEUR_C, stroke_width=9)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeOut(croix), pen.animate.set_stroke(TRI_B, 5),
                  Create(trait), run_time=0.55)
        self.au_mot("sur la base")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(f.base), run_time=0.35)
        l3 = self.t("à angle droit.", 36, HAUTEUR_C)
        self.col(l3, -0.5)
        self.au_mot("à angle droit")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(f.eq), run_time=0.35)
        self.play(Indicate(f.eq, color=HAUTEUR_C, scale_factor=1.8), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        A, B, C, D, H = para_pts(6, 4, 3, 0.36, P(-3.6, 1.6))
        t = poly([A, B, C, D], PARA_C, PARA_B, 4)
        hh = DashedLine(D, H, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
        eq = equerre(H, RIGHT, UP, 0.2, HAUTEUR_C)
        c6 = cote(Line(A, B), "6 cm", DOWN, fs=28, couleur=BASE_C, audit=False)
        c5 = cote(Line(B, C), "5 cm", RIGHT, fs=28, couleur=PENCHE_C, audit=False, buff=0.08)
        c4 = cote(hh, "4 cm", LEFT, fs=26, couleur=HAUTEUR_C, audit=False, buff=0.1, fond=True)
        c4.align_to(hh, DOWN).shift(UP * 0.12)
        self.play(FadeIn(t), Create(hh), FadeIn(eq), FadeIn(c6), FadeIn(c5), FadeIn(c4), run_time=0.4)

        def apres(sc):
            sc.rep(0, avec=[Indicate(VGroup(c6, c4), color=VERT_OK, scale_factor=1.15)])
            sc.rep(1)
            sc.rep(2, avec=[c5.animate.set_opacity(0.45)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Un parallélogramme a une base de 6 cm,", "un côté penché de 5 cm",
                              "et une hauteur de 4 cm.", "Quelle est son aire ?"],
                             [self.choix("30 cm²"), self.choix("24 cm²"), self.choix("12 cm²")], 1,
                             ["Base × hauteur :", "6 × 4 = 24 cm².", "Le côté penché ne sert pas."],
                             -0.2, couper={1: ("6 × 4", "= 24 cm².")}, mot_q="Un", autres_r=apres)

    # ── 08 : le défi (combien de motifs dans le tissu ?) ────────────────────
    def tissu(self):
        t = Rectangle(width=3.6, height=2.4, fill_color=TISSU_C, fill_opacity=1, stroke_color="#be185d",
                      stroke_width=4).move_to(P(-3.4, 0.35))
        return t

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        t = self.tissu()
        x = -0.2
        l1 = self.t("Soraya imprime son motif", 34)
        self.col(l1, 2.2, x)
        self.au_mot("Soraya imprime son motif")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("sur un tissu de", WHITE), ("60 cm sur 40 cm.", BASE_C)], 34)
        self.col(l2, 1.5, x)
        self.au_mot("sur un tissu")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(t), run_time=0.4)
        self.au_mot("60 centimètres sur 40 centimètres")
        c60 = cote(Line(t.get_corner(UL), t.get_corner(UR)), "60 cm", UP, fs=26, couleur=BASE_C, audit=False,
                   buff=0.1)
        c40 = cote(Line(t.get_corner(DL), t.get_corner(UL)), "40 cm", LEFT, fs=26, couleur=BASE_C, audit=False,
                   buff=0.1)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c60), FadeIn(c40), run_time=0.35)
        l3 = self.ligne([("Chaque motif :", PARA_C), ("base 6 cm,", BASE_C)], 34)
        self.col(l3, 0.75, x)
        m = poly(para_pts(6, 4, 2, 0.06, t.get_corner(UL) + P(0.32, -0.2)), PARA_C, PARA_B, 2)
        self.au_mot("Chaque motif a une base de 6 centimètres")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(m, scale=2), run_time=0.4)
        l4 = self.t("hauteur 4 cm.", 34, HAUTEUR_C)
        self.col(l4, 0.1, x)
        self.au_mot("une hauteur de 4 centimètres")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(m, color=JAUNE_TITRE, scale_factor=1.6), run_time=0.45)
        l5 = self.bloc(["Combien de fois l'aire d'un motif", "tient-elle dans le tissu ?"], 34, JAUNE_TITRE)
        self.col(l5, -0.85, x)
        self.au_mot("Combien de fois")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("tient-elle")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        t = self.tissu()
        self.add(t)
        x = -0.2
        l1 = self.ligne([("Le tissu :", WHITE), ("60 × 40", BLEU_D), ("= 2 400 cm²", VERT_OK)], 36, buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("Le tissu")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(t, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.35)
        self.au_mot("60 fois 40")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 400 centimètres carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Un motif :", PARA_C), ("6 × 4", BLEU_D), ("= 24", VERT_OK)], 36, buff=0.2)
        self.col(l2, 1.35, x)
        self.au_mot("Un motif")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 fois 4")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 24")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("2 400 ÷ 24", BLEU_D), ("= 100", VERT_OK)], 44, buff=0.3)
        self.col(l3, 0.4, x)
        self.au_mot("2 400 divisé par 24")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("24 : 100")
        motifs = VGroup(*[poly(para_pts(6, 4, 2, 0.045, t.get_corner(UL) + P(0.19 + 0.36 * i, -0.12 - 0.24 * j)),
                               PARA_C, PARA_B, 1.5) for j in range(10) for i in range(10)])
        self.play(FadeIn(l3[1], shift=UP * 0.1), LaggedStart(*[FadeIn(m) for m in motifs], lag_ratio=0.008),
                  run_time=1.0)
        res = self.gros("100 motifs", fs=46)
        self.col(res, -0.65, x)
        self.au_mot("L'aire du tissu vaut 100 motifs")
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = self.figure(0.36, ORIGIN)
        fig = VGroup(f[0], f.haut, f.eq)
        lignes = self.finale_gauche(fig, textes=[
            ("Un parallélogramme se transforme", "en rectangle de même aire."),
            ("Son aire : base × hauteur,", "sans diviser par 2."),
            ("La hauteur tombe sur la base", "à angle droit.")], fs=32)
        self.add(fig)
        self.au_mot("Un parallélogramme se transforme")
        self.montrer_ligne(lignes[0], Indicate(f[0], color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Son aire")
        self.montrer_ligne(lignes[1])
        self.au_mot("La hauteur tombe")
        self.montrer_ligne(lignes[2], Indicate(f.eq, color=HAUTEUR_C, scale_factor=1.6))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_decouper()
        self.ecran_rectangle()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
