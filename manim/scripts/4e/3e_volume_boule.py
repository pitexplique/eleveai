# 3e_volume_boule.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T1 : LE VOLUME D'UNE BOULE
# (micro 3e volume_boule, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Lina, KINÉSITHÉRAPEUTE — souffler tout l'air de ses poumons dans un ballon
# (centres corps-sante, sport ; tranche 12-14 vérifiée).
# Mapping micro → écrans : 02 (la formule 4 × π × r × r × r ÷ 3), 03 (l'exemple r = 10 → ≈ 4 189 cm³),
# 04 (l'ordre de grandeur : les poumons tiennent 3 à 4 litres), 06 (piège : le rayon est la moitié
# du diamètre, et une erreur de 2 devient une erreur de 8), questions 05 (C : 36π) et 07 (A : 36π),
# défi 08 (deux ballons, r = 10 et r = 12 → 4,2 L et 7,2 L, 3 litres d'écart).
# Voix : manim/voix/3e-volume-boule.json ; marques : 3e_volume_boule_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_volume_boule.py VolumeBoule3e
# Sortie : manim/sorties/3e/maths/volume/21-volume-boule/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import boule, lina, Paysage3e  # noqa: E402

BALLON_C, BALLON_B = "#f472b6", "#831843"
POUMON_C, POUMON_B = "#fb7185", "#881337"
AIR_C = "#7dd3fc"


def ballon(r, u, o=ORIGIN, sw=4):
    """Le ballon gonflé : une boule rose, plus l'embout qu'on tient à la bouche.
    Attributs : ceux de boule(), plus .embout"""
    b = boule(r, u, o, couleur=BALLON_C, bord=BALLON_B, sw=sw)
    col = Polygon(o + P(-0.1 * u, -r * u), o + P(0.1 * u, -r * u), o + P(0.16 * u, -(r + 0.42) * u),
                  o + P(-0.16 * u, -(r + 0.42) * u), fill_color=BALLON_B, fill_opacity=1, stroke_width=0)
    b.add(col)
    b.embout = col
    return b


def poumons(s=1.0, o=ORIGIN, sw=4):
    """Deux poumons schématiques et leur trachée. Attributs : .gauche .droit .trachee"""
    g = Ellipse(width=0.95 * s, height=1.5 * s, fill_color=POUMON_C, fill_opacity=0.85,
                stroke_color=POUMON_B, stroke_width=sw).move_to(o + P(-0.55 * s, 0))
    d = Ellipse(width=0.95 * s, height=1.5 * s, fill_color=POUMON_C, fill_opacity=0.85,
                stroke_color=POUMON_B, stroke_width=sw).move_to(o + P(0.55 * s, 0))
    tr = VGroup(Line(o + P(0, 1.05 * s), o + P(0, 0.45 * s)),
                Line(o + P(0, 0.45 * s), o + P(-0.45 * s, 0.2 * s)),
                Line(o + P(0, 0.45 * s), o + P(0.45 * s, 0.2 * s))).set_stroke(AIR_C, sw + 2)
    v = VGroup(g, d, tr)
    v.gauche, v.droit, v.trachee = g, d, tr
    return v


def barre(l, h, couleur, o=ORIGIN):
    return Rectangle(width=l, height=h, fill_color=couleur, fill_opacity=0.9, stroke_width=0).move_to(o)


class VolumeBoule3e(Paysage3e):
    nom_voix = "3e-volume-boule"
    fichier_marques = "3e_volume_boule_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume d'une boule", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume d'une boule")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien d'air tient", "dans un ballon ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        b = ballon(1.0, 0.95, P(3.5, 0.2))
        self.au_mot("Combien d'air tient")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, scale=0.85), run_time=0.5)
        self.au_mot("dans un ballon")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(b, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = lina(1.0).move_to(P(-5.3, 0.4))
        self.au_mot("Voici Lina")
        nom = self.t("Lina", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("kinésithérapeute")
        met = self.t("kinésithérapeute", 22, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -3.3
        l1 = self.t("Travailler la respiration", 32, WHITE)
        self.col(l1, 2.1, x)
        pou = poumons(1.0, P(-5.0, -2.2))
        self.au_mot("travailler")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pou, scale=0.85), run_time=0.6)
        l2 = self.t("de ses patients.", 30, WHITE)
        self.col(l2, 1.3, x)
        self.au_mot("patients")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        b = ballon(0.45, 1.0, P(3.9, 0.2))
        l3 = self.bloc(["Souffler tout l'air", "des poumons dans un ballon."], 30, AIR_C)
        self.col(l3, 0.2, x)
        self.au_mot("souffler")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(b, scale=0.8),
                  Indicate(pou.trachee, color=AIR_C, scale_factor=1.1), run_time=0.7)
        self.au_mot("poumons dans un ballon")
        self.play(FadeIn(l3[1], shift=UP * 0.1),
                  b.animate.scale(2.4, about_point=b.get_bottom()), run_time=0.9)
        l4 = self.t("La taille du ballon dit beaucoup.", 30, JAUNE_TITRE)
        self.col(l4, -1.1, x)
        self.au_mot("La taille")
        self.play(FadeIn(l4, scale=1.08), run_time=0.55)
        self.insister(l4, 1.05, 0.25)
        self.attendre_voix()

    # ── 02 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("02-formule")
        u = 0.95
        b = boule(1.3, u, P(-4.5, 0.3), couleur=BALLON_C, bord=BALLON_B)
        self.add(b)
        tit = self.t("La formule", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -1.4
        l1 = self.t("Il se calcule avec son rayon.", 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("calcule")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(b.rayon_trait), FadeIn(b.pt_centre), run_time=0.5)
        cadre = RoundedRectangle(width=8.0, height=1.5, corner_radius=0.2, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#4c0519", fill_opacity=0.6).move_to(P(1.3, 0.5))
        f = self.ligne([("4 × π", BASE_C), ("× rayon", BASE_C), ("× rayon", BASE_C),
                        ("× rayon", BASE_C), ("÷ 3", JAUNE_TITRE)], 32, buff=0.16)
        f.move_to(cadre.get_center())
        self.au_mot("4 fois pi")
        self.play(FadeIn(cadre), FadeIn(f[0], shift=UP * 0.1), run_time=0.45)
        for k in range(1, 4):
            self.au_mot("fois le rayon", k)
            self.play(FadeIn(f[k], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divisé par 3")
        self.play(FadeIn(f[4], scale=1.3), run_time=0.35)
        self.insister(f[4], 1.3, 0.25)
        l2 = self.ligne([("Trois fois le rayon :", VERT_OK), ("c'est un volume.", VERT_OK)], 32, buff=0.18)
        self.col(l2, -1.4, x)
        self.au_mot("trois fois")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 03 : l'exemple du ballon gonflé ─────────────────────────────────────
    def ecran_exemple(self):
        self.ecran("03-exemple")
        u = 0.9
        b = ballon(1.3, u, P(-4.7, 0.5))
        self.au_mot("Le ballon gonflé")
        tit = self.t("Le ballon gonflé", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(b, scale=0.85), run_time=0.6)
        self.au_mot("10 centimètres")
        e10 = hors_audit(sur_fond(self.t("10 cm", 26, BASE_C))).next_to(b.rayon_trait, UP, buff=0.1)
        self.play(FadeIn(b.rayon_trait), FadeIn(e10), run_time=0.4)
        x = -0.9
        l1 = self.ligne([("10 × 10 × 10", BLEU_D), ("= 1 000", VERT_OK)], 34, buff=0.2)
        hors_audit(l1[1])
        self.col(l1, 1.9, x)
        self.au_mot("10 fois 10")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("mille.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("4 × π", BLEU_D), ("× 1 000", BLEU_D), ("= 4 000π", VERT_OK)], 34, buff=0.2)
        hors_audit(l2[1])
        hors_audit(l2[2])
        self.col(l2, 1.0, x)
        self.au_mot("4 fois pi")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois mille")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 000")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("÷ 3", JAUNE_TITRE), ("≈ 4 189 cm³", VERT_OK)], 34, buff=0.2)
        hors_audit(l3[1])
        self.col(l3, 0.1, x)
        self.au_mot("Divisé par 3")
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.3)
        self.au_mot("4 189")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        res = self.gros("un peu plus de 4 litres", fs=34)
        self.col(res, -1.3, x)
        self.au_mot("un peu plus")
        self.play(FadeIn(res, scale=1.12), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : l'ordre de grandeur — les poumons ──────────────────────────────
    def ecran_poumons(self):
        self.ecran("04-les-poumons")
        tit = hors_audit(self.t("Et les poumons ?", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pou = poumons(1.5, P(-4.7, 0.4))
        x = -2.3
        l1 = self.t("exactement l'ordre de grandeur", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("exactement")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pou, scale=0.85), run_time=0.7)
        l2 = self.t("d'une grande inspiration.", 30, WHITE)
        self.col(l2, 1.2, x)
        self.au_mot("grande inspiration")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  Indicate(pou.trachee, color=AIR_C, scale_factor=1.12), run_time=0.6)
        l3 = self.t("Chez un adolescent :", 30, WHITE)
        self.col(l3, 0.3, x)
        self.au_mot("adolescent")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        l4 = self.ligne([("3 à 4", BASE_C), ("litres.", BASE_C)], 38, buff=0.2)
        self.col(l4, -0.6, x)
        self.au_mot("3 à 4")
        self.play(FadeIn(l4[0], scale=1.15), run_time=0.35)
        # ⭐ Les deux barres sont À L'ÉCHELLE (0,857 unité par litre : 3,5 L et 4,2 L) : si le
        #    ballon écrase les poumons, l'écran dit le contraire de la voix (« le MÊME ordre »).
        bars = VGroup(barre(3.0, 0.5, POUMON_C, P(-3.3, -2.2)), barre(3.6, 0.5, BALLON_C, P(-3.0, -2.9)))
        et = VGroup(hors_audit(self.t("poumons", 22, POUMON_B)), hors_audit(self.t("ballon", 22, BALLON_B)))
        et[0].next_to(bars[0], RIGHT, buff=0.15)
        et[1].next_to(bars[1], RIGHT, buff=0.15)
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(bars), FadeIn(et), run_time=0.5)
        l5 = self.t("Ce ballon, c'est une respiration.", 32, VERT_OK)
        self.col(l5, -1.5, x)
        self.au_mot("Ce ballon")
        self.play(FadeIn(l5, scale=1.1), run_time=0.55)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = boule(1.0, 0.8, P(-5.0, 0.7), couleur=BALLON_C, bord=BALLON_B)
        e3 = hors_audit(sur_fond(self.t("3 cm", 24, BASE_C))).next_to(b.rayon_trait, UP, buff=0.08)

        def avant_q(sc):
            sc.play(FadeIn(b), FadeIn(b.rayon_trait), FadeIn(e3), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une boule : 3 cm de rayon.", "Quel est son volume ?"],
                             [self.choix("12π cm³"), self.choix("27π cm³"), self.choix("36π cm³")], 2,
                             ["3 × 3 × 3 = 27.", "4 × π × 27 = 108π.", "÷ 3 = 36π cm³."],
                             -0.3,
                             couper={0: ("3 × 3 × 3", "= 27."), 1: ("4 × π", "× 27", "= 108π."),
                                     2: ("÷ 3", "= 36π cm³.")},
                             mot_q="Une boule a 3", avant_q=avant_q)

    # ── 06 : le piège du diamètre ───────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.9
        b = boule(1.4, u, P(-4.5, 0.1), couleur=BALLON_C, bord=BALLON_B)
        self.add(b)
        x = -1.9
        l0 = hors_audit(self.t("Le rayon :", 32, BASE_C))
        self.col(l0, 2.0, x)
        self.au_mot("Le rayon est")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b.rayon_trait), run_time=0.45)
        diam = Line(b.centre + P(-1.4 * u, 0), b.centre + P(1.4 * u, 0), color=ROUGE_ERREUR,
                    stroke_width=7)
        l1 = self.t("la moitié du diamètre.", 32, BASE_C)
        self.col(l1, 1.2, x)
        self.au_mot("moitié")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(diam), run_time=0.5)
        l2 = self.t("Multiplié trois fois :", 32, ROUGE_ERREUR)
        self.col(l2, 0.2, x)
        self.au_mot("multiplié trois fois")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        l3 = self.ligne([("une erreur de 2", ROUGE_ERREUR), ("devient une erreur de", ROUGE_ERREUR),
                         ("8.", ROUGE_ERREUR)], 32, buff=0.18)
        self.col(l3, -0.7, x)
        self.au_mot("une erreur de 2")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("devient")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("8 sur le volume")
        petits = VGroup(*[Square(0.42, fill_color=BALLON_C, fill_opacity=0.9, stroke_color=WHITE,
                                 stroke_width=2) for _ in range(8)])
        petits.arrange_in_grid(rows=2, buff=0.1).move_to(P(-4.3, -2.6))
        self.play(FadeIn(l3[2], scale=1.3),
                  LaggedStart(*[FadeIn(c, scale=0.7) for c in petits], lag_ratio=0.12), run_time=0.9)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = boule(1.1, 0.75, P(-5.0, 0.7), couleur=BALLON_C, bord=BALLON_B)
        diam = Line(b.centre + P(-1.1 * 0.75, 0), b.centre + P(1.1 * 0.75, 0), color=BASE_C,
                    stroke_width=7)
        e6 = hors_audit(sur_fond(self.t("6 cm", 24, BASE_C))).next_to(diam, UP, buff=0.08)

        def avant_q(sc):
            sc.play(FadeIn(b), Create(diam), FadeIn(e6), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une boule : 6 cm de diamètre.", "Quel est son volume ?"],
                             [self.choix("36π cm³"), self.choix("288π cm³"), self.choix("48π cm³")], 0,
                             ["Le rayon vaut 3.", "4 × π × 27 ÷ 3", "= 36π cm³."],
                             -0.3,
                             couper={0: ("Le rayon", "vaut 3."), 1: ("4 × π", "× 27", "÷ 3")},
                             mot_q="Une boule a 6", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        x = 0.4
        l0 = self.t("Lina compare deux patients.", 32, WHITE)
        self.col(l0, 1.9, x)
        self.au_mot("Lina compare")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        b1 = ballon(1.0, 0.8, P(-4.9, 0.6))
        b2 = ballon(1.2, 0.8, P(-1.8, 0.4))
        l1 = self.ligne([("Le premier :", WHITE), ("10 cm", BASE_C), ("de rayon.", WHITE)], 30, buff=0.18)
        self.col(l1, 1.0, x)
        self.au_mot("Le premier")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(b1, scale=0.85), run_time=0.6)
        self.au_mot("ballon de 10")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(b1.rayon_trait), run_time=0.35)
        self.au_mot("de rayon, le second")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Le second :", WHITE), ("12 cm", BASE_C), ("de rayon.", WHITE)], 30, buff=0.18)
        self.col(l2, 0.2, x)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(b2, scale=0.85), run_time=0.6)
        self.au_mot("ballon de 12")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(b2.rayon_trait), run_time=0.35)
        self.au_mot("de rayon. Combien")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.bloc(["Combien de litres chacun,", "et combien d'écart ?"], 34, JAUNE_TITRE)
        self.col(l3, -1.0, x)
        self.au_mot("Combien de litres chacun")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("combien de litres d'écart")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -2.6
        l1 = self.ligne([("Le premier :", WHITE), ("≈ 4 189 cm³,", VERT_OK), ("soit 4,2 L", VERT_OK)],
                        30, buff=0.18)
        hors_audit(l1[1])
        self.col(l1, 2.0, x)
        self.au_mot("Le premier")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("4 189")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("4,2 litres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Le second :", WHITE), ("12 × 12 × 12", BLEU_D), ("= 1 728", VERT_OK)],
                        30, buff=0.18)
        hors_audit(l2[2])
        self.col(l2, 1.1, x)
        self.au_mot("Le second")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("12 fois 12")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1 728.")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("≈ 7 238 cm³,", VERT_OK), ("soit 7,2 L", VERT_OK)], 30, buff=0.18)
        hors_audit(l3[0])
        self.col(l3, 0.2, x)
        self.au_mot("7 238")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("7,2 litres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        bars = VGroup(barre(2.1, 0.5, POUMON_C, P(-4.4, -1.1)), barre(3.6, 0.5, BALLON_C, P(-3.65, -1.9)))
        et = VGroup(hors_audit(self.t("4,2 L", 24, "#881337")), hors_audit(self.t("7,2 L", 24, "#831843")))
        et[0].next_to(bars[0], RIGHT, buff=0.15)
        et[1].next_to(bars[1], RIGHT, buff=0.15)
        self.play(FadeIn(bars), FadeIn(et), run_time=0.5)
        l4 = self.ligne([("L'écart :", JAUNE_TITRE), ("3 litres", VERT_OK)], 40, buff=0.2)
        self.col(l4, -2.8, x)
        self.au_mot("L'écart")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.4)
        self.insister(l4[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = boule(1.1, 0.9, ORIGIN, couleur=BALLON_C, bord=BALLON_B)
        fig = VGroup(b, b.rayon_trait)
        lignes = self.finale_gauche(fig, textes=[
            ("Le volume d'une boule :", "4 × π", "× rayon × rayon × rayon ÷ 3."),
            ("Le rayon est la moitié", "du diamètre."),
            ("Un ballon de 20 cm de diamètre :", "une respiration.")], fs=28)
        self.add(fig)
        self.au_mot("Le volume d'une boule")
        self.montrer_ligne(lignes[0], Indicate(b, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Le rayon est la moitié")
        self.montrer_ligne(lignes[1], Indicate(b.rayon_trait, color=BASE_C, scale_factor=1.08))
        self.au_mot("Un ballon de 20")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_exemple()
        self.ecran_poumons()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
