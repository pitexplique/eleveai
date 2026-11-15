# 5e_volume_pave.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode V3 : LE VOLUME DU PAVÉ DROIT
# (micro volume_pave, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-volume-pave-short (l'aquarium, 5 × 3 × 4 = 60 dm³ = 60 L).
# Décor et métier : Yuna, TECHNICIENNE EN CLIMATISATION (le volume d'air d'une pièce ; centres technologie-ia, sciences).
# Mapping micro → écrans : 02 (la pièce 6 × 4 × 3 ; au sol 6 × 4 = 24 cubes de 1 m³ = l'aire de la base, 24 m²),
# 03 (3 couches jusqu'au plafond : 24 × 3 = 72 m³), 04 (méthode : longueur × largeur × hauteur = aire de la base
# × hauteur), 06 (piège : on multiplie, on n'additionne pas ; unités cubes), questions 05 (B : 5 × 3 × 2 = 30 cm³)
# et 07 (A : 2 × 2 × 2 = 8 cm³), défi 08 (105 + 36 = 141 m³ ; un climatiseur pour 80 m³ : il en faut 2).
# Fiche : lib/fiches/maths-5e-volumes.tsx.
# Voix : manim/voix/5e-volume-pave.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_volume_pave_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py volume-pave).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_volume_pave.py VolumePave5e
# Sortie finale : manim/sorties/5e/maths/volume/03-volume-pave/eleveai-maths-5e-volume-pave.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

MUR_F, MUR_D, MUR_C, MUR_B = "#334155", "#475569", "#1e293b", "#94a3b8"   # la pièce (vide, transparente)
AIR_F, AIR_D, AIR_C = "#7dd3fc", "#bae6fd", "#38bdf8"                     # l'air de la pièce
S2_F, S2_D, S2_C, S2_B = "#4ade80", "#86efac", "#16a34a", "#14532d"       # la deuxième salle (verte)
S1_T, S2_T = "#7dd3fc", "#86efac"                                         # leurs textes


def climatiseur(w=1.5):
    """Un climatiseur mural : le boîtier blanc, ses lamelles, un voyant vert."""
    h = w * 0.3
    corps = RoundedRectangle(width=w, height=h, corner_radius=h * 0.25, fill_color="#f1f5f9", fill_opacity=1,
                             stroke_color="#64748b", stroke_width=3)
    lam = VGroup(*[Line(P(-w * 0.38, 0), P(w * 0.38, 0)).move_to(corps.get_bottom() + UP * h * (0.18 + 0.14 * k))
                   for k in range(3)]).set_stroke("#94a3b8", 2.5)
    led = Dot(radius=h * 0.07, color=VERT_OK).move_to(corps.get_corner(UR) + P(-w * 0.08, -h * 0.25))
    return VGroup(corps, lam, led)


def souffle(clim, n=3, long=0.55):
    """L'air froid qui sort du climatiseur : des flèches bleu clair vers le bas."""
    b = clim[0]
    return VGroup(*[Arrow(b.get_bottom() + P(dx, -0.05), b.get_bottom() + P(dx * 1.3, -0.05 - long), buff=0,
                          color=AIR_F, stroke_width=5, max_tip_length_to_length_ratio=0.3)
                    for dx in [(-0.32 + 0.32 * k) * b.width for k in range(n)]])


def piece(u, o, op=0.35):
    """La pièce de Yuna, 6 × 4 × 3 (mètres), vide : murs gris transparents."""
    return pave(6, 4, 3, u, o, face=MUR_F, dessus=MUR_D, cote=MUR_C, bord=MUR_B, sw=3, op=op)


def couche(k, u, o, grille=True):
    """La k-ième couche (k = 0 au sol) de 6 × 4 cubes de 1 m³."""
    return pave(6, 4, 1, u, o + UP * k * u, grille=grille)


def aretes(v, l, p, h, sw=9):
    """Les trois arêtes qui portent les dimensions d'un pavé : longueur (devant, en bas), largeur (à droite, en bas),
    hauteur (devant, à gauche)."""
    lo = Line(v.pt(0, 0, 0), v.pt(l, 0, 0), color=BASE_C, stroke_width=sw)
    la = Line(v.pt(l, 0, 0), v.pt(l, p, 0), color=BASE_C, stroke_width=sw)
    ha = Line(v.pt(0, 0, 0), v.pt(0, 0, h), color=HAUTEUR_C, stroke_width=sw)
    return lo, la, ha


def base_de(v, l, p, couleur=BASE_C, op=0.75):
    """La base (le sol) d'un pavé, en couleur."""
    return Polygon(v.pt(0, 0, 0), v.pt(l, 0, 0), v.pt(l, p, 0), v.pt(0, p, 0), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=4)


class VolumePave5e(Paysage5e):
    nom_voix = "5e-volume-pave"
    fichier_marques = "5e_volume_pave_marques.json"
    ceinture = "verte"

    U = 0.6
    O = P(-5.7, -1.85)   # le coin avant-bas-gauche de la pièce (écrans 02 → 04)

    def cotes_piece(self, v):
        """Les trois mesures de la pièce, contre la figure (hors audit : déjà dites)."""
        lo, la, ha = aretes(v, 6, 4, 3)
        c6 = cote(lo, "6 m", DOWN, fs=28, couleur=BASE_C, audit=False)
        c4 = cote(la, "4 m", RIGHT, fs=28, couleur=BASE_C, audit=False, buff=0.15)
        c3 = cote(ha, "3 m", LEFT, fs=28, couleur=HAUTEUR_C, audit=False)
        return lo, la, ha, c6, c4, c3

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume du pavé droit", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume du pavé droit")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment calculer", "la place dans une boîte ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        b = pave(3, 2, 2, 0.55, P(2.3, -0.3), grille=True)
        self.au_mot("Comment calculer")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, scale=0.8), run_time=0.5)
        self.au_mot("la place dans une boîte")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(b, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yuna, technicienne en climatisation ────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        yu = yuna(1.0).move_to(P(-4.95, 0.1))
        self.au_mot("Voici Yuna")
        nom = self.t("Yuna", 40, BLEU_CALCUL).next_to(yu, UP, buff=0.25)
        self.play(FadeIn(yu, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("technicienne en climatisation")
        met = self.bloc(["technicienne", "en climatisation"], 26, BLEU_CALCUL).next_to(yu, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        u, o = 0.4, P(-2.95, -1.9)
        v = piece(u, o, 0.5)
        clim = climatiseur(1.4).move_to(v.pt(3, 4, 3) + UP * 0.75)
        air = souffle(clim)
        l1 = self.bloc(["Choisir le bon", "climatiseur"], 36)
        self.col(l1, 1.9)
        self.au_mot("choisir le bon climatiseur")
        self.play(FadeIn(clim, shift=DOWN * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.play(LaggedStart(*[GrowArrow(a) for a in air], lag_ratio=0.2), run_time=0.5)
        self.au_mot("connaître le volume")
        l2 = self.bloc(["le volume d'air", "d'une pièce"], 40, JAUNE_TITRE)
        self.col(l2, 0.05)
        self.play(FadeIn(v, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.5)
        rem = pave(6, 4, 3, u, o, face=AIR_F, dessus=AIR_D, cote=AIR_C, bord=MUR_B, sw=3, op=0.55)
        self.au_mot("d'une pièce")
        self.play(FadeIn(rem), FadeIn(l2[1], shift=UP * 0.1), run_time=0.6)
        self.insister(l2, 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : une couche au sol (6 × 4 = 24 cubes) ───────────────────────────
    def ecran_couche(self):
        self.ecran("02-couche")
        u, o = self.U, self.O
        v = piece(u, o)
        self.add(v)
        lo, la, ha, c6, c4, c3 = self.cotes_piece(v)
        l1 = self.ligne([("6 m", BASE_C), ("de long,", WHITE), ("4 m", BASE_C), ("de large,", WHITE)], 34, buff=0.2)
        self.col(l1, 2.6)
        l2 = self.ligne([("et", WHITE), ("3 m", HAUTEUR_C), ("de haut.", WHITE)], 34, buff=0.2)
        self.col(l2, 1.95)
        self.au_mot("mesure 6")
        self.play(Create(lo), FadeIn(c6), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de long")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("long, 4")
        self.play(Create(la), FadeIn(c4), FadeIn(l1[2], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de large")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.25)
        self.au_mot("large et 3")
        self.play(Create(ha), FadeIn(c3), FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1),
                  run_time=0.35)
        self.au_mot("de haut")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.25)
        self.play(FadeOut(lo), FadeOut(la), FadeOut(ha), run_time=0.3)
        sol = couche(0, u, o)
        l3 = self.ligne([("Au sol :", JAUNE_TITRE), ("6 × 4", BLEU_D)], 36, buff=0.25)
        self.col(l3, 1.05)
        self.au_mot("Au sol")
        self.play(FadeIn(sol, shift=DOWN * 0.3), FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("6 fois 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("= 24 cubes", VERT_OK), ("de 1 m³.", VERT_OK)], 36, buff=0.2)
        self.col(l4, 0.3)
        self.au_mot("24 cubes")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(sol, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.45)
        self.au_mot("1 mètre cube")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("C'est l'aire de la base :", WHITE)], 34)
        self.col(l5, -0.6)
        dessus = VGroup(sol.dessus.copy().set_fill(JAUNE_TITRE, 0.7), sol.grille.copy())
        self.au_mot("l'aire de la base")
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(dessus), run_time=0.45)
        res = self.gros("24 m²", fs=42)
        self.col(res, -1.5)
        e24 = sur_fond(m2("24 m²", 28, WHITE)).move_to(dessus)
        self.au_mot("24 mètres carrés")
        self.play(FadeIn(res, scale=1.2), FadeIn(e24, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : 3 couches jusqu'au plafond (24 × 3 = 72) ───────────────────────
    def ecran_hauteur(self):
        self.ecran("03-hauteur")
        u, o = self.U, self.O
        v = piece(u, o)
        lo, la, ha, c6, c4, c3 = self.cotes_piece(v)
        c1 = couche(0, u, o)
        self.add(v, c1, c6, c4, c3)
        c2_, c3_ = couche(1, u, o), couche(2, u, o)
        l1 = self.t("3 couches", 40, JAUNE_TITRE)
        self.col(l1, 2.5)
        self.au_mot("3 couches")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(c2_, shift=DOWN * 0.5), run_time=0.5)
        l2 = self.t("jusqu'au plafond.", 36, WHITE)
        self.col(l2, 1.8)
        self.au_mot("jusqu'au plafond")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c3_, shift=DOWN * 0.5), run_time=0.5)
        l3 = self.ligne([("24 × 3", BLEU_D)], 44)
        self.col(l3, 0.75)
        e = VGroup(*[sur_fond(m2("24", 26, WHITE)).move_to(c.face) for c in (c1, c2_, c3_)])
        self.au_mot("24 fois 3")
        self.play(FadeIn(l3, shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.2) for x in e], lag_ratio=0.25),
                  run_time=0.5)
        res = self.gros("72 m³", fs=42)
        self.col(res, -0.4)
        self.au_mot("72 mètres cubes")
        self.play(FadeIn(res, scale=1.2), Indicate(VGroup(c1, c2_, c3_), color=JAUNE_TITRE, scale_factor=1.02),
                  run_time=0.5)
        self.add(e)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        u, o = self.U, self.O
        v = pave(6, 4, 3, u, o, op=0.45)
        lo, la, ha = aretes(v, 6, 4, 3)
        self.add(v)
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        self.col(l0, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Volume =", WHITE), ("longueur", BASE_C)], 38, buff=0.25)
        self.col(l1, 1.75)
        l2 = self.ligne([("× largeur", BASE_C), ("× hauteur", HAUTEUR_C)], 38, buff=0.25)
        self.col(l2, 1.1)
        clo = cote(lo, "longueur", DOWN, fs=28, couleur=BASE_C)
        cla = cote(la, "largeur", RIGHT, fs=28, couleur=BASE_C, buff=0.12)
        cha = Text("hauteur", font_size=28, color=HAUTEUR_C, weight=BOLD).rotate(PI / 2).next_to(ha, LEFT, buff=0.12)
        self.au_mot("volume égale")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("longueur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(lo), FadeIn(clo), run_time=0.35)
        self.au_mot("fois largeur")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(la), FadeIn(cla), run_time=0.35)
        self.au_mot("fois hauteur")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(ha), FadeIn(cha), run_time=0.35)
        l3 = self.ligne([("Aussi :", WHITE), ("l'aire de la base", BASE_C)], 36, buff=0.25)
        self.col(l3, 0.1)
        b = base_de(v, 6, 4)
        self.au_mot("l'aire de la base")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(b), run_time=0.45)
        l4 = self.ligne([("× la hauteur.", HAUTEUR_C)], 36)
        self.col(l4, -0.55)
        self.au_mot("fois la hauteur")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(ha, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.play(Indicate(b, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        v = pave(5, 3, 2, 0.5, P(-5.3, 0.6))
        lo, la, ha = aretes(v, 5, 3, 2, sw=0)
        c5 = cote(lo, "5 cm", DOWN, fs=26, couleur=BASE_C, audit=False)
        c3 = cote(la, "3 cm", RIGHT, fs=26, couleur=BASE_C, audit=False, buff=0.12)
        c2 = cote(ha, "2 cm", LEFT, fs=26, couleur=HAUTEUR_C, audit=False)

        def avant(sc):
            sc.play(FadeIn(v), FadeIn(c5), FadeIn(c3), FadeIn(c2), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un pavé mesure 5 cm, 3 cm", "et 2 cm.", "Quel est son volume ?"],
                             [self.choix("10 cm³"), self.choix("30 cm³"), self.choix("15 cm³")], 1,
                             ["5 × 3 = 15.", "× 2 = 30 cm³.", "10 : l'addition.", "15 : oublier la hauteur."],
                             -0.4, couper={0: ("5 × 3", "= 15."), 1: ("× 2", "= 30 cm³."), 2: ("10 :", "l'addition."),
                                           3: ("15 :", "oublier la hauteur.")},
                             mot_q="Un pavé", avant_q=avant)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        v = pave(4, 2, 2, 0.7, P(-5.9, -0.6))
        lo, la, ha = aretes(v, 4, 2, 2)
        self.add(v)
        x = -0.6
        fois = self.t("×", 64, VERT_OK)
        l1 = self.bloc(["On multiplie", "les trois dimensions,"], 36, VERT_OK)
        self.col(l1, 1.75, x + 0.8)
        fois.move_to(P(x - 0.2, l1.get_center()[1]))
        self.au_mot("On multiplie")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(fois, scale=1.3), run_time=0.35)
        self.au_mot("les trois dimensions")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(lo), Create(la), Create(ha), run_time=0.5)
        plus = self.t("+", 64, ROUGE_ERREUR)
        l2 = self.ligne([("on ne les additionne", ROUGE_ERREUR), ("pas.", ROUGE_ERREUR)], 34, buff=0.18)
        self.col(l2, 0.2, x + 0.8)
        plus.move_to(P(x - 0.2, l2.get_center()[1]))
        barre = Line(plus.get_corner(UL) + P(-0.08, 0.08), plus.get_corner(DR) + P(0.08, -0.08),
                     color=WHITE, stroke_width=8)
        self.au_mot("on ne les additionne")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(plus, scale=1.3), run_time=0.35)
        self.au_mot("pas")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(barre), run_time=0.35)
        cu = pave(1, 1, 1, 0.5, P(x - 0.45, -1.75))
        l3 = self.bloc(["Et la réponse est", "en unités cubes."], 36, JAUNE_TITRE)
        self.col(l3, -1.35, x + 0.8)
        self.au_mot("Et la réponse")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(cu, scale=0.8), run_time=0.35)
        self.au_mot("en unités cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(cu, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.45)
        self.insister(l3, 1.05, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        v = pave(2, 2, 2, 0.72, P(-4.9, 0.45), grille=True)
        lo, la, ha = aretes(v, 2, 2, 2, sw=0)
        c2 = cote(lo, "2 cm", DOWN, fs=26, couleur=BASE_C, audit=False)

        def avant(sc):
            sc.play(FadeIn(v), FadeIn(c2), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un cube a une arête de 2 cm.", "Quel est son volume ?"],
                             [self.choix("8 cm³"), self.choix("6 cm³"), self.choix("4 cm³")], 0,
                             ["2 × 2 × 2 = 8 cm³.", "6 : 2 + 2 + 2.", "4 : seulement une face."],
                             -0.4, couper={0: ("2 × 2 × 2", "= 8 cm³."), 1: ("6 :", "2 + 2 + 2."),
                                           2: ("4 :", "seulement une face.")},
                             mot_q="Un cube", avant_q=avant)

    # ── 08 : le défi (deux salles, des climatiseurs de 80 m³) ───────────────
    def salles(self):
        u = 0.32
        s1 = pave(7, 5, 3, u, P(-5.6, 0.6))
        s2 = pave(4, 3, 3, u, P(-5.6, -1.6), face=S2_F, dessus=S2_D, cote=S2_C, bord=S2_B)
        return s1, s2

    def cotes_salle(self, s, l, p, h, coul):
        lo, la, ha = aretes(s, l, p, h, sw=0)
        return (cote(lo, f"{l} m", DOWN, fs=24, couleur=coul, audit=False, buff=0.12),
                cote(la, f"{p} m", RIGHT, fs=24, couleur=coul, audit=False, buff=0.1),
                cote(ha, f"{h} m", LEFT, fs=24, couleur=coul, audit=False, buff=0.12))

    def pause_defi(self, y=-2.4, marge=2.0, x=-2.4):
        """« Mets pause, et cherche ! » sous les lignes du défi, à gauche (x = −1,2) : à XL, il touchait Ti Margo."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), x, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        s1, s2 = self.salles()
        k1, k2 = self.cotes_salle(s1, 7, 5, 3, S1_T), self.cotes_salle(s2, 4, 3, 3, S2_T)
        x = -0.6
        l0 = self.t("Yuna climatise deux salles.", 34, WHITE)
        self.col(l0, 2.2, x)
        self.au_mot("Yuna climatise deux salles")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("La première :", S1_T), ("7 m", S1_T), ("sur 5,", S1_T)], 34, buff=0.2)
        self.col(l1, 1.55, x)
        self.au_mot("La première")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(s1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("première : 7")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(k1[0]), run_time=0.3)
        self.au_mot("7 mètres sur 5")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(k1[1]), run_time=0.3)
        l2 = self.ligne([("et 3 m", S1_T), ("de haut.", S1_T)], 34, buff=0.2)
        self.col(l2, 1.0, x)
        self.au_mot("et 3")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(k1[2]), run_time=0.3)
        self.au_mot("de haut")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("La deuxième :", S2_T), ("4 m", S2_T), ("sur 3,", S2_T)], 34, buff=0.2)
        self.col(l3, 0.3, x)
        self.au_mot("La deuxième")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(s2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("deuxième : 4")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(k2[0]), run_time=0.3)
        self.au_mot("4 mètres sur 3")
        self.play(FadeIn(l3[2], shift=UP * 0.1), FadeIn(k2[1]), run_time=0.3)
        l4 = self.ligne([("et 3 m", S2_T), ("de haut.", S2_T)], 34, buff=0.2)
        self.col(l4, -0.25, x)
        self.au_mot("et 3", 2)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(k2[2]), run_time=0.3)
        self.au_mot("de haut", 2)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        l5 = self.ligne([("Un climatiseur :", WHITE), ("80 m³.", AIR_F)], 34, buff=0.25)
        self.col(l5, -0.95, x)
        self.au_mot("Un climatiseur refroidit")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("80 mètres cubes")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        l6 = self.t("Combien de climatiseurs ?", 36, JAUNE_TITRE)
        self.col(l6, -1.65, x)
        self.au_mot("Combien de climatiseurs")
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        s1, s2 = self.salles()
        self.add(s1, s2, *self.cotes_salle(s1, 7, 5, 3, S1_T), *self.cotes_salle(s2, 4, 3, 3, S2_T))
        x = -0.95
        l1 = self.ligne([("Première :", S1_T), ("7 × 5 × 3", BLEU_D), ("= 105 m³", VERT_OK)], 34, buff=0.2)
        self.col(l1, 2.2, x)
        self.au_mot("Première salle")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(s1, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.35)
        self.au_mot("7 fois 5 fois 3")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("105 mètres cubes")
        e1 = sur_fond(m2("105", 26, WHITE)).move_to(s1.face)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(e1, scale=1.2), run_time=0.3)
        l2 = self.ligne([("Deuxième :", S2_T), ("4 × 3 × 3", BLEU_D), ("= 36", VERT_OK)], 34, buff=0.2)
        self.col(l2, 1.45, x)
        self.au_mot("Deuxième")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(s2, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.35)
        self.au_mot("4 fois 3 fois 3")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3, 36")
        e2 = sur_fond(m2("36", 26, WHITE)).move_to(s2.face)
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(e2, scale=1.2), run_time=0.3)
        l3 = self.ligne([("En tout :", JAUNE_TITRE), ("141 m³", VERT_OK)], 36, buff=0.25)
        self.col(l3, 0.7, x)
        self.au_mot("En tout")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("141 mètres cubes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("Un climatiseur ne suffit pas.", 34, ROUGE_ERREUR)
        self.col(l4, -0.05, x)
        self.au_mot("Un climatiseur ne suffit pas")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        res = self.gros("Il en faut 2.", fs=46)
        self.col(res, -1.0, x)
        cl = VGroup(climatiseur(1.3), climatiseur(1.3)).arrange(RIGHT, buff=0.35).move_to(P(-4.3, -2.8))
        self.au_mot("Il en faut 2")
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in cl], lag_ratio=0.25),
                  run_time=0.6)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        u, o = 0.4, ORIGIN
        fig = VGroup(*[couche(k, u, o) for k in range(3)])
        lignes = self.finale_gauche(fig, textes=[
            ("Volume du pavé droit :", "longueur × largeur × hauteur."),
            ("C'est aussi l'aire de la base", "× la hauteur."),
            ("La réponse s'écrit", "en unités cubes.")], fs=30)
        self.add(fig)
        self.au_mot("Volume du pavé droit")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("C'est aussi")
        self.montrer_ligne(lignes[1])
        self.au_mot("La réponse s'écrit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_couche()
        self.ecran_hauteur()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
