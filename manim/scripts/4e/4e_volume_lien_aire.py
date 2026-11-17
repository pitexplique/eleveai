# 4e_volume_lien_aire.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode V1 : AIRE DE BASE ET VOLUME
# (micro volume_lien_aire, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Léa, TECHNICIENNE EN TRAITEMENT DE L'EAU — la piscine (centres nature-ecologie,
# sciences ; tranche 12-14 vérifiée : node scripts/verifier-centres-age.mjs).
# Mapping micro → écrans : 02 (le fond du bassin, 8 × 4 = 32 m²), 03 (l'eau monte : 32 × 1,5 = 48 m³),
# 04 (la règle : volume = aire de la base × hauteur), 06 (piège : 1 m³ = 1 000 L),
# questions 05 (C : 20 × 1,5 = 30 m³) et 07 (B : 48 m³ = 48 000 L),
# défi 08 (10 × 5 = 50 m² ; × 1,4 = 70 m³ ; 70 ÷ 10 = 7 pastilles).
# Voix : manim/voix/4e-volume-lien-aire.json ; marques : 4e_volume_lien_aire_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_volume_lien_aire.py VolumeLienAire4e
# Sortie : manim/sorties/4e/maths/volume/11-volume-lien-aire/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import pave, lea, Paysage4e  # noqa: E402

EAU_C, EAU_D, EAU_COTE, EAU_B = "#38bdf8", "#7dd3fc", "#0284c7", "#0c4a6e"
FOND_C = "#0369a1"


def bassin(L, l, h, u, o=ORIGIN, sw=4, op=0.9):
    """Le bassin : un pavé aux couleurs de l'eau. Attributs : .fond (le rectangle du fond, mis en
    avant), plus ceux de pave() (.face .dessus .cote .pt)."""
    v = pave(L, l, h, u, o, face=EAU_C, dessus=EAU_D, cote=EAU_COTE, bord=EAU_B, sw=sw, op=op)
    q = v.pt
    v.fond = Polygon(q(0, 0, 0), q(L, 0, 0), q(L, l, 0), q(0, l, 0), fill_color=FOND_C, fill_opacity=0.95,
                     stroke_color=JAUNE_TITRE, stroke_width=5)
    return v


class VolumeLienAire4e(Paysage4e):
    nom_voix = "4e-volume-lien-aire"
    fichier_marques = "4e_volume_lien_aire_marques.json"
    ceinture = "verte"

    def etiquette(self, s, fs=28, couleur=WHITE):
        return sur_fond(m2(s, fs, couleur))

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Aire de base et volume", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Aire de base et volume")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment passer d'un fond plat", "à des litres d'eau ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        b = bassin(3, 2, 1.2, 0.72, P(1.7, -1.1))
        self.au_mot("Comment passer d'un fond plat")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, scale=0.85), run_time=0.5)
        self.au_mot("à des litres d'eau")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(b, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = lea(1.0).move_to(P(-5.15, 0.0))
        self.au_mot("Voici Léa")
        nom = self.t("Léa", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("l'eau des piscines")
        met = self.bloc(["technicienne", "de l'eau"], 26, BLEU_CALCUL).next_to(p, DOWN, buff=0.18)
        b = bassin(4, 2.4, 1.3, 0.62, P(-2.9, -1.6))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.5)
        x = 2.4
        l1 = self.bloc(["Avant de doser le produit,", "elle doit savoir"], 30, WHITE)
        self.col(l1, 1.75, x)
        self.au_mot("Avant de doser le produit")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.t("combien d'eau il y a.", 30, WHITE)
        self.col(l2, 0.85, x)
        self.au_mot("combien d'eau il y a")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.t("Le produit se dose", 32, JAUNE_TITRE)
        l4 = self.t("au mètre cube.", 32, JAUNE_TITRE)
        self.col(l3, 0.0, x)
        self.col(l4, -0.65, x)
        self.au_mot("Le produit se dose")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("au mètre cube")
        self.play(FadeIn(l4, scale=1.12), Indicate(b, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 02 : le fond, une aire ──────────────────────────────────────────────
    def ecran_le_fond(self):
        self.ecran("02-le-fond")
        # ⛔ La voix de cet écran COMMENCE par « Le bassin » : le titre ne peut pas passer avant,
        # sinon le premier texte arrive 4 s après son mot (TARD au dry run). Ligne d'abord, titre ensuite.
        u = 1.05
        b = bassin(4, 2.2, 1.4, u, P(-5.6, -1.9))
        self.add(b)
        c8 = cote(b.face, "8 m", DOWN, fs=28, couleur=BASE_C, audit=False, buff=0.14)
        x = 0.6
        l1 = self.ligne([("Le bassin :", WHITE), ("8 m sur 4.", BASE_C)], 34, buff=0.2)
        self.col(l1, 1.9, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 mètres sur 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c8), run_time=0.4)
        self.au_mot("Le fond")
        tit = self.t("Le fond, c'est une aire", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        l2 = self.t("Le fond, c'est une aire :", 34, WHITE)
        self.col(l2, 1.15, x)
        self.play(Write(tit), FadeIn(l2, shift=UP * 0.1), FadeIn(b.fond), run_time=0.5)
        self.play(Indicate(b.fond, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        l3 = self.ligne([("8 × 4", BLEU_D), ("= 32 m²", VERT_OK)], 38, buff=0.25)
        self.col(l3, 0.3, x)
        self.au_mot("8 fois 4")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("32 mètres carrés")
        e32 = self.etiquette("32 m²", 30).move_to(b.fond.get_center())
        self.play(FadeIn(l3[1], scale=1.15), FadeIn(e32, scale=1.2), run_time=0.45)
        self.insister(l3[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : l'eau monte ────────────────────────────────────────────────────
    def ecran_empiler(self):
        self.ecran("03-empiler")
        tit = self.t("L'eau monte", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 1.05
        b = bassin(4, 2.2, 1.5, u, P(-5.6, -2.0))
        self.add(b.cote, b.dessus)
        x = 0.6
        self.au_mot("Maintenant, l'eau monte")
        l1 = self.t("Chaque tranche d'eau", 32, WHITE)
        self.col(l1, 1.9, x)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("d'un mètre :", WHITE), ("32 m³.", VERT_OK)], 32, buff=0.2)
        self.col(l2, 1.25, x)
        self.au_mot("d'un mètre d'épaisseur")
        tr = Polygon(b.pt(0, 0, 0), b.pt(4, 0, 0), b.pt(4, 0, 1), b.pt(0, 0, 1),
                     fill_color=EAU_C, fill_opacity=0.95, stroke_color=JAUNE_TITRE, stroke_width=4)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(tr, shift=UP * 0.2), run_time=0.45)
        self.au_mot("32 mètres cubes")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.35)
        l3 = self.ligne([("Profondeur", WHITE), ("1,5 m :", HAUTEUR_C)], 32, buff=0.2)
        self.col(l3, 0.5, x)
        self.au_mot("1,5 mètre de profondeur")
        pleine = Polygon(b.pt(0, 0, 0), b.pt(4, 0, 0), b.pt(4, 0, 1.5), b.pt(0, 0, 1.5),
                         fill_color=EAU_C, fill_opacity=0.95, stroke_color=EAU_B, stroke_width=4)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(pleine), FadeOut(tr), run_time=0.5)
        l4 = self.ligne([("32 × 1,5", BLEU_D), ("= 48 m³", VERT_OK)], 38, buff=0.25)
        self.col(l4, -0.3, x)
        self.au_mot("32 fois 1,5")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("48 mètres cubes")
        e48 = self.etiquette("48 m³", 30).move_to(pleine.get_center())
        self.play(FadeIn(l4[1], scale=1.15), FadeIn(e48, scale=1.2), run_time=0.45)
        self.insister(l4[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 04 : la règle ───────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        tit = self.t("La règle", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = bassin(3.2, 2, 1.4, 0.85, P(-6.0, -1.6))
        self.add(b)
        x = -1.6
        l1 = self.t("La règle vaut pour tous ces solides :", 32, WHITE)
        self.col(l1, 1.6, x)
        self.au_mot("La règle vaut pour tous")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        cadre = RoundedRectangle(width=7.6, height=1.5, corner_radius=0.2, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#082f49", fill_opacity=0.7).move_to(P(1.3, 0.5))
        f = self.ligne([("volume", WHITE), ("= aire de la base", BASE_C), ("× hauteur", HAUTEUR_C)], 32, buff=0.2)
        f.move_to(cadre.get_center())
        self.play(FadeIn(cadre), run_time=0.3)
        self.au_mot("volume égale aire de la base")
        self.play(FadeIn(f[0], shift=UP * 0.1), FadeIn(f[1], shift=UP * 0.1), FadeIn(b.fond), run_time=0.45)
        self.au_mot("fois la hauteur")
        self.play(FadeIn(f[2], scale=1.2), run_time=0.35)
        l2 = self.ligne([("Le fond donne l'aire,", BASE_C), ("la profondeur donne la hauteur.", HAUTEUR_C)],
                        30, buff=0.2)
        self.col(l2, -1.1, x)
        self.au_mot("Le fond donne l'aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(b.fond, color=BASE_C, scale_factor=1.05), run_time=0.4)
        self.au_mot("la profondeur donne la hauteur")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = bassin(3, 2, 1.1, 0.62, P(-5.15, 0.55))
        e20 = hors_audit(m2("fond : 20 m²", 26, BASE_C)).next_to(b, DOWN, buff=0.2)
        e15 = hors_audit(self.t("1,5 m", 26, HAUTEUR_C)).next_to(b, LEFT, buff=0.14)

        def avant_q(sc):
            sc.play(FadeIn(b), FadeIn(b.fond), FadeIn(e20), FadeIn(e15), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un bassin : fond 20 m²,", "profondeur 1,5 m.", "Quel est son volume ?"],
                             [self.choix("21,5 m³"), self.choix("15 m³"), self.choix("30 m³")], 2,
                             ["20 × 1,5 = 30 m³.", "21,5 : une addition.", "On n'additionne pas",
                              "une aire et une longueur."],
                             -0.3,
                             couper={0: ("20 × 1,5", "= 30 m³."), 1: ("21,5 :", "une addition.")},
                             mot_q="Un bassin a un fond", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cube = pave(1, 1, 1, 1.5, P(-5.9, -1.3), face=EAU_C, dessus=EAU_D, cote=EAU_COTE, bord=EAU_B)
        self.add(cube)
        x = -1.9
        l1 = self.t("Un mètre cube, ce n'est pas un litre.", 32, ROUGE_ERREUR)
        self.col(l1, 1.6, x)
        self.au_mot("ce n'est pas un litre")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("Un mètre cube,", WHITE), ("c'est mille litres.", VERT_OK)], 34, buff=0.2)
        self.col(l2, 0.6, x)
        self.au_mot("Un mètre cube", 2)
        e = hors_audit(self.t("1 m³ = 1 000 L", 30, VERT_OK)).next_to(cube, DOWN, buff=0.25)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(e, scale=1.15), run_time=0.5)
        self.insister(e, 1.12, 0.25)
        l3 = self.bloc(["Un bassin de 48 mètres cubes,", "ce n'est pas 48 litres :", "c'est 48 000 litres."],
                       30, WHITE)
        self.col(l3, -1.3, x)
        self.au_mot("Un bassin de 48 mètres cubes")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = bassin(3.2, 2, 1.2, 0.6, P(-5.7, 0.5))
        e48 = hors_audit(m2("48 m³", 28, EAU_C)).next_to(b, DOWN, buff=0.2)
        q = hors_audit(self.t("? litres", 28, JAUNE_TITRE)).next_to(e48, DOWN, buff=0.14)

        def avant_q(sc):
            sc.play(FadeIn(b), FadeIn(e48), FadeIn(q), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Le bassin fait 48 m³.", "Combien de litres ?"],
                             [self.choix("4 800 L"), self.choix("48 000 L"), self.choix("480 L")], 1,
                             ["1 m³ = 1 000 L.", "48 × 1 000", "= 48 000 L."],
                             -0.3,
                             couper={1: ("48 × 1 000",), 2: ("= 48 000 L.",)},
                             mot_q="Le bassin fait", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def bassin_defi(self):
        return bassin(3.6, 2.2, 1.3, 0.78, P(-5.5, -2.0))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b = self.bassin_defi()
        x = -1.3
        l0 = self.t("Un autre bassin :", 32, WHITE)
        self.col(l0, 1.9, x)
        self.au_mot("Un autre bassin")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.45)
        l1 = self.ligne([("10 m sur 5,", BASE_C), ("profondeur", WHITE), ("1,4 m.", HAUTEUR_C)], 32, buff=0.18)
        self.col(l1, 1.2, x)
        self.au_mot("10 mètres sur 5")
        c10 = cote(b.face, "10 m", DOWN, fs=26, couleur=BASE_C, audit=False, buff=0.14)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(b.fond), FadeIn(c10), run_time=0.45)
        self.au_mot("profondeur 1,4 mètre")
        c14 = hors_audit(self.t("1,4 m", 26, HAUTEUR_C)).next_to(b.face, LEFT, buff=0.14)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(l1[2], shift=UP * 0.1), FadeIn(c14), run_time=0.45)
        l2 = self.bloc(["Le produit se dose", "à une pastille", "pour 10 mètres cubes."], 32, BLEU_D)
        self.col(l2, 0.0, x)
        self.au_mot("Le produit se dose")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.t("Combien de pastilles ?", 36, JAUNE_TITRE)
        self.col(l3, -1.3, x)
        self.au_mot("Combien de pastilles")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = self.bassin_defi()
        self.add(b, b.fond)
        x = -1.3
        l1 = self.ligne([("Le fond :", BASE_C), ("10 × 5", BLEU_D), ("= 50 m²", VERT_OK)], 34, buff=0.2)
        self.col(l1, 1.85, x)
        self.au_mot("Le fond")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(b.fond, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.35)
        self.au_mot("10 fois 5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("50 mètres carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Le volume :", WHITE), ("50 × 1,4", BLEU_D), ("= 70 m³", VERT_OK)], 34, buff=0.2)
        self.col(l2, 1.0, x)
        self.au_mot("Le volume")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("50 fois 1,4")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("70 mètres cubes")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Les pastilles :", BLEU_D), ("70 ÷ 10", BLEU_D)], 34, buff=0.2)
        self.col(l3, 0.15, x)
        self.au_mot("Les pastilles")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("70 divisé par 10")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("7 pastilles")
        res = self.gros("7 pastilles", fs=44)
        self.col(res, -0.9, x)
        pas = VGroup(*[Circle(radius=0.16, fill_color="#f8fafc", fill_opacity=1, stroke_color="#94a3b8",
                              stroke_width=3) for _ in range(7)]).arrange(RIGHT, buff=0.14)
        pas.move_to(P(-3.3, -2.9))
        self.play(FadeIn(res, scale=1.15),
                  LaggedStart(*[FadeIn(p, shift=DOWN * 0.12) for p in pas], lag_ratio=0.15), run_time=0.7)
        self.insister(res, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = bassin(3, 2, 1.3, 0.8, ORIGIN)
        fig = VGroup(b, b.fond)
        lignes = self.finale_gauche(fig, textes=[
            ("Volume égale aire de la base,", "fois la hauteur."),
            ("L'aire du fond", "se calcule d'abord."),
            ("Un mètre cube,", "c'est mille litres.")], fs=30)
        self.add(fig)
        self.au_mot("Volume égale aire")
        self.montrer_ligne(lignes[0], Indicate(b, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("L'aire du fond")
        self.montrer_ligne(lignes[1], Indicate(b.fond, color=BASE_C, scale_factor=1.05))
        self.au_mot("Un mètre cube")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_le_fond()
        self.ecran_empiler()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
