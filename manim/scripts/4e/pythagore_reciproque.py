# pythagore_reciproque.py
# EleveAI — Maths 4e — Pythagore, épisode 6 : utiliser la réciproque pour conclure
# (notionId : pythagore_theoreme, micro : pythagore_reciproque_conclure), AVEC VOIX.
#
# ⭐ Frédéric, 13/10/2026 : « utiliser la réciproque en faisant bien attention de
# bien rédiger ». La COPIE MODÈLE s'écrit ligne par ligne au rythme de la voix
# (« d'une part… d'autre part… donc… d'après la réciproque… »), et le petit carré
# n'apparaît qu'à la dernière ligne : on ne le dessine qu'une fois PROUVÉ.
# L'image commune avec le short : la DALLE DU MAÇON (60, 80, 100 cm ; puis 98 cm : non).
# Titre YouTube : « La réciproque de Pythagore (2/2) » (l'épisode 5 est le 1/2).
#
# Voix : manim/voix/4e-pythagore-reciproque.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_reciproque.py PythagoreReciproque4e -o eleveai-maths-4e-pythagore-reciproque --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/06-reciproque/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_verifier import COTE, COUL_HYP, P, PythagoreVerifier4e, echelle_ceintures, tri3  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

BETON = "#9CA3AF"


class PythagoreReciproque4e(PythagoreVerifier4e):
    nom_voix = "4e-pythagore-reciproque"

    # ── les dessins ─────────────────────────────────────────────────────────

    def dalle(self, l_diag=100, u=0.035, origine=P(-5.4, -2.5), lettres=True):
        """La dalle vue de dessus : coin A, bords AB = 60 (bas) et AC = 80 (gauche), diagonale BC."""
        A, B, C = tri3(60, 80, l_diag, u, origine)
        # Le quatrième coin, pour que la dalle ressemble à une dalle (parallélogramme).
        D = B + (C - A)
        fond = Polygon(A, B, D, C, stroke_width=0, fill_color=BETON, fill_opacity=0.25)
        tri = VGroup(Line(A, B), Line(A, C)).set_stroke(COTE, 6)
        diag = DashedLine(B, C, color=JAUNE_TITRE, stroke_width=6, dash_length=0.15)
        lab = VGroup(self.t("60 cm", 28, COTE).next_to(Line(A, B), DOWN, buff=0.12),
                     self.t("80 cm", 28, COTE).next_to(Line(A, C), LEFT, buff=0.12),
                     self.t(f"{l_diag} cm", 28, JAUNE_TITRE).move_to((B + C) / 2 + UR * 0.35))
        let = VGroup()
        if lettres:
            g = (A + B + C) / 3
            for nom, pt in zip("ABC", (A, B, C)):
                d = (pt - g) / np.linalg.norm(pt - g)
                let.add(self.t(nom, 30).move_to(pt + d * 0.35))
        return (A, B, C), fond, tri, diag, lab, let

    def copie(self, lignes, x=-1.1, y0=2.0, pas=0.62, font_size=28):
        """Les lignes de la copie modèle, alignées à gauche."""
        g = VGroup(*[self.t(l[0], font_size, l[1]) for l in lignes])
        for k, (l, spec) in enumerate(zip(g, lignes)):
            retrait = spec[2] if len(spec) > 2 else 0.0
            l.move_to(P(0, y0 - k * pas)).align_to(P(x + retrait, 0), LEFT)
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Utiliser la réciproque", 60, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("La dalle du maçon")
        q1 = self.t("La dalle du maçon :", 40, BLEU_CALCUL)
        q2 = self.t("son coin est-il vraiment droit ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : la dalle ───────────────────────────────────────────────────────

    def ecran_dalle(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-dalle")
        (A, B, C), fond, tri, diag, lab, _ = self.dalle()
        self.play(FadeIn(fond))
        self.au_mot("60 centimètres")
        self.play(Create(tri[0]), FadeIn(lab[0]))
        self.au_mot("80 centimètres")
        self.play(Create(tri[1]), FadeIn(lab[1]))
        self.au_mot("Puis la diagonale")
        self.play(Create(diag), FadeIn(lab[2]))
        self.au_mot("Sans équerre")
        coin = self.t("?", 60, BLEU_CALCUL).move_to(A + UR * 0.45)
        self.play(Write(coin))
        self.play(FadeIn(self.ligne("Le coin est-il droit ?", 0.6, 40, BLEU_CALCUL, x=2.6)),
                  FadeIn(self.ligne("sans équerre", -0.2, 30, GRAY_B, x=2.6)))
        self.attendre_voix()

    # ── 02 : la réciproque ──────────────────────────────────────────────────

    def ecran_reciproque(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-reciproque")
        self.titre_ecran("Le théorème et sa réciproque")
        g = self.t("triangle rectangle", 36, COUL_HYP)
        d = self.t("égalité de Pythagore", 36, COTE)
        cg = SurroundingRectangle(g, color=COUL_HYP, buff=0.25, corner_radius=0.12)
        cd = SurroundingRectangle(d, color=COTE, buff=0.25, corner_radius=0.12)
        VGroup(g, cg).move_to(P(-3.6, 0.4))
        VGroup(d, cd).move_to(P(3.2, 0.4))
        self.play(FadeIn(VGroup(g, cg)), FadeIn(VGroup(d, cd)))
        self.au_mot("part d'un triangle rectangle")
        aller = Arrow(cg.get_right() + UP * 0.25, cd.get_left() + UP * 0.25, color=WHITE, buff=0.1)
        self.play(GrowArrow(aller), FadeIn(self.t("le théorème", 30).next_to(aller, UP, buff=0.12)))
        self.au_mot("La réciproque fait le chemin inverse")
        retour = Arrow(cd.get_left() + DOWN * 0.25, cg.get_right() + DOWN * 0.25, color=VERT_OK, buff=0.1)
        self.play(GrowArrow(retour), FadeIn(self.t("la réciproque", 32, VERT_OK).next_to(retour, DOWN, buff=0.12)))
        self.au_mot("si l'égalité est vérifiée")
        self.play(FadeIn(self.ligne("si l'égalité est vérifiée, alors le triangle est rectangle", -1.4, 30, VERT_OK, x=0)))
        self.au_mot("l'angle droit est en face")
        self.play(Write(self.chute("L'angle droit est en face du plus grand côté.", color=JAUNE_TITRE, font_size=32)))
        self.attendre_voix()

    # ── 03 : la rédaction ───────────────────────────────────────────────────

    def ecran_redaction(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("03-redaction")
        self.titre_ecran("La rédaction, ligne par ligne")
        (A, B, C), fond, tri, diag, lab, let = self.dalle(u=0.026, origine=P(-5.6, -2.6))
        self.add(fond, tri, lab, let)
        diag_plein = Line(B, C, color=COUL_HYP, stroke_width=6)
        self.add(diag_plein)
        lignes = self.copie([
            ("Le plus grand côté est [BC].", WHITE),
            ("D'une part : BC² = 100² = 10 000.", COUL_HYP),
            ("D'autre part : AB² + AC² = 60² + 80²", COTE),
            ("= 3 600 + 6 400 = 10 000.", COTE, 2.05),
            ("Donc BC² = AB² + AC².", VERT_OK),
            ("D'après la réciproque du théorème de Pythagore,", JAUNE_TITRE),
            ("ABC est rectangle en A.", JAUNE_TITRE),
        ], x=-3.4, y0=2.0, pas=0.56, font_size=26)
        for idx, mot in [(0, "Un : le plus grand"), (1, "Deux : d'une part"), (2, "D'autre part"),
                         (3, "3600 plus 6400"), (4, "Trois : donc"), (5, "Quatre : d'après"), (6, "le triangle ABC est rectangle")]:
            self.au_mot(mot)
            self.play(FadeIn(lignes[idx], shift=RIGHT * 0.2), run_time=0.6)
        carre = self.carre_droit(A, B - A, C - A, s=0.32)
        self.play(GrowFromCenter(carre))
        self.play(Indicate(carre, scale_factor=1.6), Circumscribe(VGroup(lignes[5], lignes[6]), color=JAUNE_TITRE))
        self.au_mot("Le coin de la dalle est droit")
        self.play(FadeIn(self.t("coin droit !", 30, VERT_OK).next_to(VGroup(fond, lab), DOWN, buff=0.15)))
        self.attendre_voix()

    # ── 04 : le bon sommet ──────────────────────────────────────────────────

    def ecran_sommet(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-sommet")
        self.titre_ecran("Le bon sommet")
        (A, B, C), fond, tri, diag, lab, let = self.dalle()
        self.add(fond, tri, let)
        self.au_mot("en face du plus grand côté")
        self.play(Create(Line(B, C, color=COUL_HYP, stroke_width=10)))
        self.au_mot("BC est le plus grand")
        self.play(FadeIn(self.ligne("plus grand côté : [BC]", 1.2, 36, COUL_HYP, x=2.6)))
        self.au_mot("l'angle droit est en A")
        cercle = Circle(radius=0.35, color=BLEU_CALCUL, stroke_width=5).move_to(A)
        self.play(Create(cercle), FadeIn(self.ligne("l'angle droit est en A", 0.3, 36, BLEU_CALCUL, x=2.6)))
        self.au_mot("le seul sommet qui n'est pas sur BC")
        self.play(FadeIn(self.ligne("le sommet qui n'est pas sur [BC]", -0.5, 30, x=2.6)))
        self.play(Indicate(let[0], scale_factor=1.8, color=BLEU_CALCUL))
        self.attendre_voix()

    # ── 05 : quand la réponse est non ───────────────────────────────────────

    def ecran_non(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-non")
        self.titre_ecran("Quand la réponse est non")
        (A, B, C), fond, tri, diag, lab, let = self.dalle(l_diag=98, u=0.026, origine=P(-5.6, -2.6))
        self.add(fond, tri, lab, let, diag)
        lignes = self.copie([
            ("D'une part : BC² = 98² = 9 604.", COUL_HYP),
            ("D'autre part : AB² + AC² = 60² + 80² = 10 000.", COTE),
            ("9 604 ≠ 10 000 : l'égalité n'est pas vérifiée.", ROUGE_ERREUR),
            ("Donc ABC n'est pas rectangle.", ORANGE_RETENUE),
        ], x=-3.4, y0=1.6, pas=0.7, font_size=26)
        for idx, mot in [(0, "D'une part"), (1, "D'autre part"), (2, "9604 n'est pas égal"), (3, "le triangle n'est pas rectangle")]:
            self.au_mot(mot)
            self.play(FadeIn(lignes[idx], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("le maçon doit corriger")
        self.play(FadeIn(self.t("✗ coin pas droit", 30, ROUGE_ERREUR).next_to(VGroup(fond, lab), DOWN, buff=0.15)))
        self.attendre_voix()

    # ── 06 : les deux erreurs de rédaction ──────────────────────────────────

    def ecran_erreurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-erreurs")
        self.titre_ecran("Les deux erreurs de rédaction")
        self.au_mot("Écrire le signe égal")
        f1 = self.ligne("BC² = AB² + AC² = …  (écrit d'avance)", 1.6, 32, ROUGE_ERREUR, x=0)
        self.play(FadeIn(f1))
        self.play(Create(Line(f1.get_left(), f1.get_right(), color=ROUGE_ERREUR, stroke_width=5)))
        self.au_mot("on écrit d'une part")
        self.play(FadeIn(self.ligne("✓ « D'une part… D'autre part… », puis on compare", 0.9, 30, VERT_OK, x=0)))
        self.au_mot("citer le mauvais théorème")
        f2 = self.ligne("« D'après le théorème de Pythagore, ABC est rectangle »", -0.3, 30, ROUGE_ERREUR, x=0)
        self.play(FadeIn(f2))
        self.play(Create(Line(f2.get_left(), f2.get_right(), color=ROUGE_ERREUR, stroke_width=5)))
        self.au_mot("c'est la réciproque")
        self.play(FadeIn(self.ligne("✓ « D'après la RÉCIPROQUE du théorème de Pythagore… »", -1.0, 30, VERT_OK, x=0)))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def figure_klm(self):
        # L au coin : KL = 9 (vertical), LM = 12 (horizontal), KM = 15.
        u = 0.2
        L = P(-5.9, -1.9)
        M, K = L + RIGHT * 12 * u, L + UP * 9 * u
        cotes = VGroup(Line(L, M), Line(L, K), Line(K, M)).set_stroke(WHITE, 5)
        lab = VGroup(self.t("12 cm", 28).next_to(Line(L, M), DOWN, buff=0.12),
                     self.t("9 cm", 28).next_to(Line(L, K), LEFT, buff=0.12),
                     self.t("15 cm", 28).move_to((K + M) / 2 + UR * 0.35))
        let = VGroup(self.t("L", 30).move_to(L + DL * 0.3), self.t("M", 30).move_to(M + DR * 0.3),
                     self.t("K", 30).move_to(K + UL * 0.3))
        return (K, L, M), cotes, lab, let

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        (K, L, M), cotes, lab, let = self.figure_klm()
        self.au_mot("Le triangle KLM")
        self.play(Create(cotes), FadeIn(let))
        self.au_mot("KL égale 9")
        self.play(FadeIn(lab[1]))
        self.au_mot("LM égale 12")
        self.play(FadeIn(lab[0]))
        self.au_mot("KM égale 15")
        self.play(FadeIn(lab[2]))
        self.au_mot("Est-il rectangle")
        self.play(Write(self.ligne("Rectangle ? En quel sommet ?", 0.6, 38, BLEU_CALCUL, x=2.6)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        (K, L, M), cotes, lab, let = self.figure_klm()
        self.add(cotes, lab, let)
        lignes = self.copie([
            ("Le plus grand côté est [KM].", WHITE),
            ("D'une part : KM² = 15² = 225.", COUL_HYP),
            ("D'autre part : KL² + LM² = 81 + 144 = 225.", COTE),
            ("Donc KM² = KL² + LM².", VERT_OK),
            ("D'après la réciproque du théorème de Pythagore,", JAUNE_TITRE),
            ("KLM est rectangle en L.", JAUNE_TITRE),
        ], x=-3.0, y0=2.0, pas=0.6, font_size=26)
        for idx, mot in [(0, "Le plus grand côté"), (1, "D'une part"), (2, "D'autre part"), (3, "L'égalité est vérifiée"),
                         (4, "D'après la réciproque"), (5, "rectangle en L")]:
            self.au_mot(mot)
            self.play(FadeIn(lignes[idx], shift=RIGHT * 0.2), Create(Line(K, M, color=COUL_HYP, stroke_width=6)) if idx == 0 else Wait(0.01), run_time=0.6)
        carre = self.carre_droit(L, RIGHT, UP, s=0.3)
        self.play(GrowFromCenter(carre))
        self.play(Indicate(carre, scale_factor=1.6))
        self.attendre_voix()

    # ── 08 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Comparer d'une part", "Comparer « d'une part » et « d'autre part » ?"),
            ("Citer la réciproque", "Citer la réciproque pour conclure ?"),
            ("Trouver le sommet", "Trouver le sommet de l'angle droit, en face du plus grand côté ?"),
            ("Dire non", "Dire non quand l'égalité n'est pas vérifiée ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 27)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Alors l'épisode 7")
        self.play(Write(self.chute("Épisode 7 : rédiger avec Pythagore ou sa réciproque", color=VERT_OK, font_size=32)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_dalle()
        self.ecran_reciproque()
        self.ecran_redaction()
        self.ecran_sommet()
        self.ecran_non()
        self.ecran_erreurs()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
