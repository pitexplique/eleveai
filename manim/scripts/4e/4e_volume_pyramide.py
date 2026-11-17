# 4e_volume_pyramide.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides » (2e poste), épisode V2 : LE VOLUME
# D'UNE PYRAMIDE (micro volume_pyramide, notion volume_solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# ⭐ PILOTE de la série. Vidéo COMMUNE avec la 3e (même micro `volume_pyramide`) : à brancher par `aussi`.
# Short jumeau : 4e-volume-pyramide-short, en MANIM (REGLES.md du 09/11 : plus de dessin animé à partir
# de la 4e), avec son défi (Frédéric, 15/11).
# Décor et métier : Awen, MONTEUSE DE STANDS DE FESTIVAL (centres musique, sciences — tranche 12-14
# vérifiée : node scripts/verifier-centres-age.mjs).
# Mapping micro → écrans : 02 (la pyramide tient 3 fois dans le prisme de même base et même hauteur :
# on verse le sable), 03 (la formule : aire de la base × hauteur ÷ 3), 04 (l'exemple : base carrée 4 m,
# hauteur 3 m → 16 × 3 ÷ 3 = 16 m³), 06 (piège : l'arête n'est pas la hauteur), questions 05 (B :
# 15 × 4 ÷ 3 = 20 m³) et 07 (A : le tiers de 45 = 15 m³), défi 08 (pavé 3 × 3 × 2,4 = 21,6 m³ ; toit
# 9 × 1,8 ÷ 3 = 5,4 m³ ; total 27 m³ ; 27 × 40 = 1 080 W > 1 000 W).
# Banque : lib/tutor-v4/questionBank/4e/maths/volumes-pyramide-cone.bank.ts (la fiche maths-4e-volumes.tsx
# n'a pas encore la pyramide : la banque fait foi).
# Voix : manim/voix/4e-volume-pyramide.json ; marques : python manim/scripts/4e/volume_4e_marques.py 4e-volume-pyramide
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_volume_pyramide.py VolumePyramide4e
# Sortie finale : manim/sorties/4e/maths/volume/12-volume-pyramide/eleveai-maths-4e-volume-pyramide.mp4
# Couleurs : la base bleue, la hauteur verte (pointillée, toujours droite), l'arête rouge (le piège),
# la pyramide violette, le prisme de comparaison bleu, le sable jaune.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import pyramide, pave, sable, awen, Paysage4e, PYR_FACE, PRI_FACE, SABLE_C, TOILE_C, TOILE_B  # noqa: E402


def tonnelle(cote, mur, toit, u, o, sw=4):
    """La tonnelle du stand : un pavé (les parois) coiffé d'une pyramide de même base (le toit).
    o = le coin avant-bas-gauche. Attributs : .parois .toit .tout"""
    pa = pave(cote, cote, mur, u, o, face=TOILE_C, dessus="#e2e8f0", cote="#cbd5e1", bord=TOILE_B, sw=sw, op=0.95)
    haut_g = pa.pt(0, 0, mur)
    py = pyramide(cote, toit, u, haut_g, sw=sw)
    g = VGroup(pa, py)
    g.parois, g.toit, g.tout = pa, py, g
    return g


class VolumePyramide4e(Paysage4e):
    nom_voix = "4e-volume-pyramide"
    fichier_marques = "4e_volume_pyramide_marques.json"
    ceinture = "verte"

    def etiquette(self, s, fs=28, couleur=WHITE):
        """Une étiquette sur cartouche, posée sur une figure, hors audit (m³ : un exposant)."""
        return sur_fond(m2(s, fs, couleur))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le volume d'une pyramide", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le volume d'une pyramide")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de place", "sous un toit pointu ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        py = pyramide(2.6, 2.2, 0.78, P(1.9, -1.15))
        self.au_mot("Combien de place")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(py, scale=0.8), run_time=0.5)
        self.au_mot("sous un toit pointu")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(py, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awen, monteuse de stands ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        aw = awen(1.0).move_to(P(-5.05, 0.0))
        self.au_mot("Voici Awen")
        nom = self.t("Awen", 40, BLEU_CALCUL).next_to(aw, UP, buff=0.25)
        self.play(FadeIn(aw, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("les stands d'un festival")
        met = self.bloc(["monteuse", "de stands", "d'un festival"], 26, BLEU_CALCUL).next_to(aw, DOWN, buff=0.18)
        t = tonnelle(3, 2.4, 1.8, 0.62, P(-2.7, -2.0))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(t.parois, shift=UP * 0.2), run_time=0.5)
        self.au_mot("avec un toit pointu")
        c3 = cote(t.parois.face, "3 m", DOWN, fs=26, couleur=BASE_C, audit=False, buff=0.14)
        self.play(FadeIn(t.toit, shift=DOWN * 0.3), FadeIn(c3), run_time=0.5)
        x = 2.15
        l1 = self.t("Il fait chaud sous la toile :", 30, WHITE)
        self.col(l1, 1.75, x)
        self.au_mot("Il fait chaud sous la toile")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = self.t("il faut une climatisation.", 30, WHITE)
        self.col(l2, 1.1, x)
        self.au_mot("il faut un groupe de climatisation")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.bloc(["Combien de mètres cubes", "d'air là-dedans ?"], 32, JAUNE_TITRE)
        self.col(l3, 0.1, x)
        self.au_mot("combien de mètres cubes d'air")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(t.toit, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la pyramide tient trois fois dans le prisme ────────────────────
    def ecran_le_tiers(self):
        self.ecran("02-le-tiers")
        tit = self.t("Même base, même hauteur", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        py = pyramide(2.2, 2.0, u, P(-5.6, -1.9))
        pr = pave(2.2, 2.2, 2.0, u, P(0.6, -1.9), face=PRI_FACE, dessus="#7dd3fc", cote="#0284c7", bord="#0c4a6e",
                  op=0.92)
        et_py = hors_audit(self.t("la pyramide", 28, PYR_FACE)).next_to(py, DOWN, buff=0.3)
        et_pr = hors_audit(self.t("le prisme", 28, PRI_FACE)).next_to(pr, DOWN, buff=0.3)
        self.au_mot("une pyramide et un prisme")
        self.play(FadeIn(py, shift=UP * 0.2), FadeIn(et_py), run_time=0.45)
        self.play(FadeIn(pr, shift=UP * 0.2), FadeIn(et_pr), run_time=0.45)
        self.au_mot("Elle remplit la pyramide de sable")
        gr = sable(py.faces, n=16, bas=0.0, haut=0.55)
        self.play(FadeIn(gr, shift=DOWN * 0.2), run_time=0.5)
        # on verse trois fois : le prisme se remplit par tiers
        niveaux = []
        for k in range(3):
            mot = ["Une fois", "Deux fois", "Trois fois"][k]
            self.au_mot(mot)
            n = Polygon(pr.pt(0, 0, 0), pr.pt(2.2, 0, 0), pr.pt(2.2, 0, 2.0 * (k + 1) / 3),
                        pr.pt(0, 0, 2.0 * (k + 1) / 3), fill_color=SABLE_C, fill_opacity=0.9, stroke_width=0)
            dessus = Polygon(pr.pt(0, 0, 2.0 * (k + 1) / 3), pr.pt(2.2, 0, 2.0 * (k + 1) / 3),
                             pr.pt(2.2, 2.2, 2.0 * (k + 1) / 3), pr.pt(0, 2.2, 2.0 * (k + 1) / 3),
                             fill_color="#fde68a", fill_opacity=0.95, stroke_width=0)
            for v in niveaux:
                self.remove(v)
            niveaux = [n, dessus]
            compte = hors_audit(self.t(mot, 34, SABLE_C)).move_to(P(-1.35, 1.1 - k * 0.72))
            self.play(FadeIn(n), FadeIn(dessus), FadeIn(compte, shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("Le prisme est plein")
        plein = hors_audit(self.t("plein !", 34, VERT_OK)).move_to(P(-1.35, -1.15))
        self.play(FadeIn(plein, scale=1.3), run_time=0.35)
        self.au_mot("trois fois dans le prisme")
        res = hors_audit(self.gros("1 pyramide = 1 tiers du prisme", fs=40))
        res.move_to(P(0, -2.75))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("03-formule")
        tit = self.t("La formule", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        py = pyramide(2.0, 1.8, 0.9, P(-6.0, -1.5))
        self.add(py)
        x = -2.2
        l1 = self.ligne([("Le prisme :", PRI_FACE), ("aire de la base × hauteur.", WHITE)], 32, buff=0.22)
        self.col(l1, 1.75, x)
        self.au_mot("Le prisme")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("l'aire de la base fois la hauteur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("La pyramide :", PYR_FACE), ("trois fois moins.", JAUNE_TITRE)], 32, buff=0.22)
        self.col(l2, 1.0, x)
        self.au_mot("La pyramide")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(py.faces, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.35)
        self.au_mot("c'est trois fois moins")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.35)
        self.au_mot("Volume de la pyramide")
        cadre = RoundedRectangle(width=7.4, height=1.5, corner_radius=0.2, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#1e1b4b", fill_opacity=0.65).move_to(P(1.4, -0.75))
        f = self.ligne([("aire de la base", BASE_C), ("× hauteur", HAUTEUR_C), ("÷ 3", JAUNE_TITRE)], 34, buff=0.22)
        f.move_to(cadre.get_center())
        self.play(FadeIn(cadre), run_time=0.3)
        self.au_mot("aire de la base")
        self.play(FadeIn(f[0], shift=UP * 0.1), FadeIn(py.base_trait), run_time=0.35)
        self.au_mot("fois la hauteur")
        self.play(FadeIn(f[1], shift=UP * 0.1), Create(py.hh), FadeIn(py.eq), run_time=0.4)
        self.au_mot("divisé par 3")
        self.play(FadeIn(f[2], scale=1.3), run_time=0.35)
        self.insister(f[2], 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : l'exemple (base 4 m, hauteur 3 m → 16 m³) ──────────────────────
    def ecran_exemple(self):
        self.ecran("04-exemple")
        tit = self.t("Un grand toit du festival", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        py = pyramide(2.6, 2.2, 1.0, P(-6.1, -1.9))
        self.au_mot("Essayons sur un grand toit")
        self.play(FadeIn(py, shift=UP * 0.2), run_time=0.45)
        c4 = cote(py.base_trait, "4 m", DOWN, fs=28, couleur=BASE_C, audit=False, buff=0.14)
        self.au_mot("un carré de 4 mètres de côté")
        self.play(FadeIn(py.base_trait), FadeIn(c4), run_time=0.4)
        # ⛔ La cote de hauteur se pose SUR la face violette : sans cartouche sombre, elle est illisible.
        c3 = hors_audit(sur_fond(self.t("3 m", 28, HAUTEUR_C))).next_to(py.hh, RIGHT, buff=0.16)
        self.au_mot("sa hauteur est 3 mètres")
        self.play(Create(py.hh), FadeIn(py.eq), FadeIn(c3), run_time=0.4)
        x = -1.4
        l1 = self.ligne([("L'aire de la base :", BASE_C), ("4 × 4", BLEU_D), ("= 16 m²", VERT_OK)], 32, buff=0.2)
        self.col(l1, 1.75, x)
        self.au_mot("L'aire de la base")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(py.base, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.35)
        self.au_mot("4 fois 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("16 mètres carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("16 × 3", BLEU_D), ("= 48", VERT_OK)], 34, buff=0.22)
        self.col(l2, 0.9, x)
        self.au_mot("16 fois 3")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("48")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("48 ÷ 3", BLEU_D), ("= 16", VERT_OK)], 34, buff=0.22)
        self.col(l3, 0.1, x)
        self.au_mot("48 divisé par 3")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("16", 4)
        self.play(FadeIn(l3[1], scale=1.2), run_time=0.3)
        self.au_mot("16 mètres cubes d'air")
        res = self.gros("16 m³ d'air sous ce toit", fs=40)
        self.col(res, -0.95, x)
        et = self.etiquette("16 m³", 30).move_to(py.faces.get_center() + DOWN * 0.1)
        self.play(FadeIn(res, scale=1.15), FadeIn(et, scale=1.2), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        # ⛔ La figure MONTE : la phrase de réponse s'écrit à partir de y = −0,3 et la recouvrait.
        py = pyramide(2.0, 1.7, 0.82, P(-5.5, 0.55))
        c15 = hors_audit(m2("base : 15 m²", 26, BASE_C)).next_to(py, DOWN, buff=0.2)
        c4 = hors_audit(sur_fond(self.t("4 m", 26, HAUTEUR_C))).next_to(py.hh, RIGHT, buff=0.14)

        def avant_q(sc):
            sc.play(FadeIn(py), FadeIn(py.hh), FadeIn(py.eq), FadeIn(c15), FadeIn(c4), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une pyramide : base 15 m²,", "hauteur 4 m.", "Quel est son volume ?"],
                             [self.choix("60 m³"), self.choix("20 m³"), self.choix("30 m³")], 1,
                             ["15 × 4 = 60,", "÷ 3 = 20 m³.", "60 : c'est le prisme.", "30 : le ÷ 2."],
                             -0.3,
                             couper={0: ("15 × 4", "= 60,"), 1: ("÷ 3", "= 20 m³."), 2: ("60 :", "c'est le prisme."),
                                     3: ("30 :", "le ÷ 2.")},
                             mot_q="Une pyramide a une base", avant_q=avant_q)

    # ── 06 : le piège (l'arête n'est pas la hauteur) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        py = pyramide(2.4, 2.1, 1.05, P(-6.0, -1.9))
        self.add(py)
        x = -1.9
        l1a = self.t("La hauteur, ce n'est pas", 32, ROUGE_ERREUR)
        self.col(l1a, 1.7, x)
        self.au_mot("La hauteur d'une pyramide")
        self.play(FadeIn(l1a, shift=UP * 0.1), run_time=0.4)
        l1b = self.bloc(["l'arête qui descend", "vers un coin."], 32, ROUGE_ERREUR)
        self.col(l1b, 0.85, x)
        self.au_mot("ce n'est pas l'arête")
        self.play(FadeIn(l1b, shift=UP * 0.1), Create(py.arete), run_time=0.5)
        self.play(Indicate(py.arete, color=ROUGE_ERREUR, scale_factor=1.06), run_time=0.4)
        l2 = self.bloc(["C'est la distance du sommet", "à la base, bien droite."], 32, HAUTEUR_C)
        self.col(l2, -0.5, x)
        self.au_mot("C'est la distance")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(py.hh), FadeIn(py.eq), run_time=0.5)
        self.play(Indicate(py.hh, color=HAUTEUR_C, scale_factor=1.08), run_time=0.4)
        l3 = self.bloc(["L'arête est plus longue :", "le volume serait trop grand."], 32, WHITE)
        self.col(l3, -1.75, x)
        self.au_mot("L'arête est plus longue")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.62
        # ⛔ Les deux solides MONTENT : la phrase de réponse s'écrit à partir de y = −0,3.
        pr = pave(2.0, 2.0, 1.9, u, P(-5.9, 0.25), face=PRI_FACE, dessus="#7dd3fc", cote="#0284c7", bord="#0c4a6e",
                  op=0.92)
        py = pyramide(2.0, 1.9, u, P(-3.5, 0.25))
        e45 = hors_audit(m2("45 m³", 26, PRI_FACE)).next_to(pr, DOWN, buff=0.18)
        eq = hors_audit(self.t("?", 34, PYR_FACE)).next_to(py, DOWN, buff=0.2)

        def avant_q(sc):
            sc.play(FadeIn(pr), FadeIn(py), FadeIn(e45), FadeIn(eq), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Même base, même hauteur.", "Le prisme fait 45 m³.", "Et la pyramide ?"],
                             [self.choix("15 m³"), self.choix("135 m³"), self.choix("22,5 m³")], 0,
                             ["La pyramide = le tiers.", "45 ÷ 3 = 15 m³.", "135 : c'est × 3."],
                             -0.3,
                             couper={1: ("45 ÷ 3", "= 15 m³."), 2: ("135 :", "c'est × 3.")},
                             mot_q="Un prisme et une pyramide", avant_q=avant_q)

    # ── 08 : le défi (la tonnelle entière) ──────────────────────────────────
    def tonnelle_defi(self):
        return tonnelle(3, 2.4, 1.8, 0.72, P(-5.15, -2.3))

    def cotes_defi(self, t):
        """Les trois mesures. ⛔ Le « 2,4 m » des parois se pose À GAUCHE : avec la tonnelle plus à
        gauche, ses lettres touchaient le bord (BORD du dry run) — d'où o.x = −5,15."""
        return (cote(t.parois.face, "3 m", DOWN, fs=26, couleur=BASE_C, audit=False, buff=0.14),
                hors_audit(self.t("2,4 m", 26, TOILE_B)).next_to(t.parois.face, LEFT, buff=0.14),
                # ⛔ Au-DESSUS du toit : à droite, cette cote tombait sur la colonne de texte.
                hors_audit(self.t("1,8 m", 26, HAUTEUR_C)).next_to(t.toit, UP, buff=0.12))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        t = self.tonnelle_defi()
        c3, c24, c18 = self.cotes_defi(t)
        x = -1.5
        l0 = self.t("La tonnelle d'Awen :", 32, WHITE)
        self.col(l0, 1.95, x)
        self.au_mot("La tonnelle d'Awen")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(t.parois, shift=UP * 0.2), run_time=0.45)
        l1 = self.ligne([("un pavé de", TOILE_B), ("3 m × 3 m,", BASE_C)], 32, buff=0.2)
        self.col(l1, 1.25, x)
        self.au_mot("un pavé de 3 mètres sur 3")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(c3), run_time=0.4)
        l2 = self.ligne([("haut de", TOILE_B), ("2,4 m.", TOILE_B)], 32, buff=0.2)
        self.col(l2, 0.6, x)
        self.au_mot("haut de 2,4 mètres")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c24), run_time=0.4)
        l3 = self.bloc(["Le toit : une pyramide", "de même base,"], 32, PYR_FACE)
        self.col(l3, -0.3, x)
        self.au_mot("Le toit est une pyramide")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(t.toit, shift=DOWN * 0.3), run_time=0.5)
        l4 = self.ligne([("haute de", HAUTEUR_C), ("1,8 m.", HAUTEUR_C)], 32, buff=0.2)
        self.col(l4, -1.1, x)
        self.au_mot("haute de 1,8 mètre")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(c18), run_time=0.4)
        l5 = self.ligne([("La clim :", WHITE), ("40 W par m³.", BLEU_D)], 32, buff=0.2)
        self.col(l5, -1.75, x)
        self.au_mot("La climatisation demande 40 watts")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.4)
        l6 = self.t("Un groupe de 1 000 W suffit-il ?", 34, JAUNE_TITRE)
        self.col(l6, -2.4, x)
        self.au_mot("Le groupe de 1 000 watts du festival suffit-il")
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.4)
        self.pause_defi(y=-3.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        t = self.tonnelle_defi()
        c3, c24, c18 = self.cotes_defi(t)
        self.add(t, c3, c24, c18)
        x = -1.5
        l1 = self.ligne([("La base :", BASE_C), ("3 × 3 = 9 m²", VERT_OK)], 32, buff=0.2)
        self.col(l1, 2.0, x)
        self.au_mot("La base")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(t.parois.face, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.35)
        self.au_mot("3 fois 3, 9 mètres carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Les parois :", TOILE_B), ("9 × 2,4", BLEU_D), ("= 21,6 m³", VERT_OK)], 32, buff=0.2)
        self.col(l2, 1.3, x)
        self.au_mot("9 fois 2,4")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("21,6 mètres cubes")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("Le toit :", PYR_FACE), ("9 × 1,8 = 16,2", BLEU_D)], 32, buff=0.2)
        self.col(l3, 0.6, x)
        self.au_mot("Le toit ensuite")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(t.toit, color=JAUNE_TITRE, scale_factor=1.04),
                  run_time=0.35)
        self.au_mot("9 fois 1,8")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        l4 = self.ligne([("÷ 3", JAUNE_TITRE), ("= 5,4 m³", VERT_OK)], 32, buff=0.22)
        self.col(l4, -0.05, x)
        self.au_mot("divisé par 3")
        self.play(FadeIn(l4[0], scale=1.2), run_time=0.3)
        self.au_mot("5,4 mètres cubes")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        l5 = self.ligne([("En tout :", WHITE), ("21,6 + 5,4", BLEU_D), ("= 27 m³", VERT_OK)], 32, buff=0.2)
        self.col(l5, -0.7, x)
        self.au_mot("En tout")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("21,6 plus 5,4")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("27 mètres cubes")
        self.play(FadeIn(l5[2], scale=1.15), run_time=0.35)
        l6 = self.ligne([("27 × 40", BLEU_D), ("= 1 080 W", VERT_OK)], 32, buff=0.22)
        self.col(l6, -1.35, x)
        self.au_mot("27 fois 40")
        self.play(FadeIn(l6[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 080 watts")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le groupe de 1 000 watts")
        res = self.bloc(["1 000 W ne suffit pas.", "Il en faut un de 1 200."], 36, ORANGE_Q)
        self.col(res, -2.3, x)
        self.play(FadeIn(res[0], scale=1.12), run_time=0.4)
        self.au_mot("Il en faut")
        self.play(FadeIn(res[1], scale=1.12), run_time=0.4)
        self.insister(res, 1.05, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        py = pyramide(2.0, 1.8, 0.88, ORIGIN)
        fig = VGroup(py, py.hh, py.eq)
        # ⛔ Les textes n'écrivent que des mots DITS, à la lettre : « trois fois » et non « 3 fois »,
        # sinon montrer_ligne (qui cale chaque lot AU MOT) ne trouve pas « 3 » et tout glisse.
        lignes = self.finale_gauche(fig, textes=[
            ("Une pyramide tient trois fois", "dans le prisme de même base", "et de même hauteur."),
            ("Son volume : aire de la base", "× hauteur ÷ 3."),
            ("La hauteur part du sommet,", "bien droite jusqu'à la base.")], fs=30)
        self.add(fig)
        self.au_mot("Une pyramide tient")
        self.montrer_ligne(lignes[0], Indicate(py.faces, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Son volume")
        self.montrer_ligne(lignes[1], Indicate(py.base, color=BASE_C, scale_factor=1.05))
        self.au_mot("La hauteur part")
        self.montrer_ligne(lignes[2], Indicate(py.hh, color=HAUTEUR_C, scale_factor=1.08))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_le_tiers()
        self.ecran_formule()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
