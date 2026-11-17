# 3e_volume_reduction_section.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T2 : LA RÉDUCTION PAR UNE
# SECTION (micro 3e volume_pyramide_cone_reduction, notion volume_solide), AVEC VOIX. 16:9, CEINTURE BLEUE.
# Décor et métier : Adam, RESPONSABLE DE SALLE DE CINÉMA — le gobelet conique rempli à mi-hauteur
# (centres cinema-series, argent-budget ; tranche 12-14). Esprit critique : « la moitié de la
# hauteur, ce n'est pas la moitié du soda ».
# ⚠️ Le gobelet conique a la POINTE EN BAS : le liquide forme un petit cône semblable, en bas.
# Mapping micro → écrans : 02 (la surface du liquide coupe le cône par un plan parallèle à la base :
# c'est une réduction), 03 (à mi-hauteur le rapport vaut 1/2), 04 (le volume est divisé par 2 × 2 × 2),
# 06 (piège : longueur × k, aire × k × k, volume × k × k × k), questions 05 (A : un huitième) et
# 07 (C : 27), défi 08 (48 cL remplis aux trois quarts de la hauteur → 20 cL, il manque 28).
# Voix : manim/voix/3e-volume-reduction-section.json ; marques : 3e_volume_reduction_section_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_volume_reduction_section.py VolumeReductionSection3e
# Sortie : manim/sorties/3e/maths/volume/32-volume-reduction-section/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import adam, Paysage3e  # noqa: E402

GOB_C, GOB_D, GOB_B = "#e2e8f0", "#f8fafc", "#64748b"
SODA_C, SODA_B = "#b45309", "#78350f"
PLAN_C = "#facc15"


def gobelet(r, h, u, o=ORIGIN, sw=4):
    """Un gobelet CONIQUE : la pointe en bas (o), l'ouverture en haut.
    Attributs : .pointe .centre_haut .ouverture .flancs .hh (la hauteur) .rayon_trait .r .h .u"""
    ch = o + UP * h * u
    w, e = 2 * r * u, 2 * r * u * 0.32
    flancs = Polygon(ch + P(-r * u, 0), ch + P(r * u, 0), o, fill_color=GOB_C, fill_opacity=0.35,
                     stroke_width=0)
    ouv = Ellipse(width=w, height=e, fill_color=GOB_D, fill_opacity=0.18, stroke_color=GOB_B,
                  stroke_width=sw).move_to(ch)
    gen = VGroup(Line(ch + P(-r * u, 0), o), Line(ch + P(r * u, 0), o)).set_stroke(GOB_B, sw)
    g = VGroup(flancs, ouv, gen)
    g.pointe, g.centre_haut, g.ouverture, g.flancs, g.gen = o, ch, ouv, flancs, gen
    g.hh = DashedLine(ch, o, color=HAUTEUR_C, stroke_width=6, dash_length=0.12)
    g.rayon_trait = Line(ch, ch + P(r * u, 0), color=BASE_C, stroke_width=8)
    g.r, g.h, g.u = r, h, u
    return g


def liquide(g, k, couleur=SODA_C, sw=4):
    """Le liquide dans le gobelet `g`, rempli jusqu'à la fraction `k` de la HAUTEUR : un petit
    cône de rapport k, de même pointe. Attributs : .surface .centre_haut .rayon_trait"""
    r, h, u, o = g.r, g.h, g.u, g.pointe
    ch = o + UP * k * h * u
    rk = k * r * u
    flancs = Polygon(ch + P(-rk, 0), ch + P(rk, 0), o, fill_color=couleur, fill_opacity=1, stroke_width=0)
    surf = Ellipse(width=2 * rk, height=2 * rk * 0.32, fill_color=couleur, fill_opacity=1,
                   stroke_color=SODA_B, stroke_width=sw).move_to(ch)
    v = VGroup(flancs, surf)
    v.surface, v.centre_haut, v.k = surf, ch, k
    v.rayon_trait = Line(ch, ch + P(rk, 0), color=BASE_C, stroke_width=7)
    return v


def plan_surface(l, u, o=ORIGIN, couleur=PLAN_C, op=0.3, sw=3):
    """Le plan de coupe horizontal (la surface du liquide), en cavalière."""
    q = lambda x, y: point3(o, u, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(l, 0), q(l, l * 0.8), q(0, l * 0.8), fill_color=couleur,
                   fill_opacity=op, stroke_color=couleur, stroke_width=sw)


class VolumeReductionSection3e(Paysage3e):
    nom_voix = "3e-volume-reduction-section"
    fichier_marques = "3e_volume_reduction_section_marques.json"
    ceinture = "bleue"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La réduction par une section", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("La réduction")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["À mi-hauteur,", "combien reste-t-il ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        g = gobelet(1.0, 2.4, 0.85, P(3.5, -1.7))
        li = liquide(g, 0.5)
        self.au_mot("À mi-hauteur")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(g, scale=0.85), run_time=0.5)
        self.au_mot("combien reste-t-il")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(li, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = adam(1.0).move_to(P(-5.0, 0.5))
        self.au_mot("Voici Adam")
        nom = self.t("Adam", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("dirige une salle")
        met = self.t("salle de cinéma", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -3.2
        l1 = self.t("Les boissons sont servies", 30, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("boissons")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        g = gobelet(0.9, 2.3, 0.85, P(3.8, -1.6))
        l2 = self.t("dans des gobelets coniques.", 30, WHITE)
        self.col(l2, 1.3, x)
        self.au_mot("dans des gobelets")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(g, scale=0.85), run_time=0.6)
        l3 = self.t("Un client se plaint :", 30, ORANGE_Q)
        self.col(l3, 0.3, x)
        self.au_mot("client")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        li = liquide(g, 0.5)
        l4 = self.bloc(["rempli jusqu'à la moitié", "de la hauteur,"], 30, SODA_C)
        self.col(l4, -0.6, x)
        self.au_mot("rempli jusqu'à la moitié")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(li, shift=UP * 0.2), run_time=0.7)
        self.au_mot("de la hauteur")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeIn(g.hh), run_time=0.45)
        l5 = self.t("Il a raison : les maths le disent.", 32, JAUNE_TITRE)
        self.col(l5, -1.8, x)
        self.au_mot("raison")
        self.play(FadeIn(l5, scale=1.08), run_time=0.55)
        self.insister(l5, 1.05, 0.25)
        self.attendre_voix()

    # ── 02 : la section donne une réduction ─────────────────────────────────
    def ecran_la_section(self):
        self.ecran("02-la-section")
        u = 0.95
        g = gobelet(1.1, 2.6, u, P(-4.6, -2.0))
        self.add(g)
        tit = self.t("Une réduction", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -1.8
        l1 = self.t("posé sur sa pointe.", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("posé sur sa pointe")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(Dot(g.pointe, radius=0.09, color=GOB_B),
                                                       color=JAUNE_TITRE), run_time=0.5)
        li = liquide(g, 0.55)
        l2 = self.t("La surface du liquide", 30, SODA_C)
        self.col(l2, 1.3, x)
        self.au_mot("la surface du liquide")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(li, shift=UP * 0.3), run_time=0.7)
        pl = plan_surface(1.9, u, li.centre_haut + P(-0.95 * u, 0))
        l3 = self.t("par un plan parallèle à la base.", 30, PLAN_C)
        self.col(l3, 0.5, x)
        self.au_mot("par un plan parallèle")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(pl, shift=DOWN * 0.25), run_time=0.7)
        l4 = self.t("forme un petit cône,", 30, VERT_OK)
        self.col(l4, -0.4, x)
        self.au_mot("forme un petit cône")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(li, color=VERT_OK, scale_factor=1.08),
                  run_time=0.6)
        l5 = self.t("de la même forme que le gobelet.", 30, VERT_OK)
        self.col(l5, -1.2, x)
        self.au_mot("même forme")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        l6 = self.t("C'est une réduction.", 36, JAUNE_TITRE)
        self.col(l6, -2.2, x)
        self.au_mot("réduction.")
        self.play(FadeIn(l6, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le rapport vaut un demi ────────────────────────────────────────
    def ecran_le_rapport(self):
        self.ecran("03-le-rapport")
        u = 1.0
        g = gobelet(1.1, 2.6, u, P(-4.3, -2.1))
        li = liquide(g, 0.5)
        self.add(g, li)
        tit = hors_audit(self.t("Le rapport", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -1.6
        l1 = self.t("À mi-hauteur :", 34, WHITE)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(g.hh), run_time=0.45)
        l2 = self.ligne([("le rapport vaut", BASE_C), ("un demi.", BASE_C)], 34, buff=0.18)
        self.col(l2, 1.1, x)
        self.au_mot("le rapport vaut")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("un demi")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.4)
        l3 = self.t("La hauteur est la moitié,", 32, HAUTEUR_C)
        self.col(l3, 0.0, x)
        self.au_mot("La hauteur du liquide")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  Indicate(li.surface, color=HAUTEUR_C, scale_factor=1.1), run_time=0.6)
        l4 = self.t("et son rayon aussi.", 32, BASE_C)
        self.col(l4, -0.9, x)
        self.au_mot("son rayon aussi")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(g.rayon_trait), FadeIn(li.rayon_trait),
                  run_time=0.6)
        self.attendre_voix()

    # ── 04 : le volume divisé par 8 ─────────────────────────────────────────
    def ecran_le_cube(self):
        self.ecran("04-le-cube")
        tit = hors_audit(self.t("Et le volume ?", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        x = -1.5
        l1 = self.t("Mais le volume,", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("Mais le volume")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("divisé par 2 × 2 × 2,", BLEU_D), ("c'est-à-dire par 8.", ROUGE_ERREUR)],
                        32, buff=0.2)
        self.col(l2, 1.2, x)
        self.au_mot("divisé par 2 fois 2")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("c'est-à-dire par 8")
        self.play(FadeIn(l2[1], scale=1.15), run_time=0.45)
        # ⭐ Huit gobelets remplis à mi-hauteur pour UN gobelet plein : une égalité de VOLUMES,
        #    dite comme telle (pas un découpage géométrique du cône, qui serait faux).
        u = 0.62
        plein = gobelet(1.1, 2.6, u, P(-5.6, -2.3))
        tout = liquide(plein, 1.0)
        petits = VGroup()
        for k in range(8):
            gp = gobelet(1.1, 2.6, u * 0.62, P(-3.1 + (k % 4) * 1.0, -0.9 - (k // 4) * 1.6))
            petits.add(VGroup(gp, liquide(gp, 0.5)))
        self.play(FadeIn(plein), FadeIn(tout), run_time=0.5)
        l3 = self.t("Rempli à mi-hauteur :", 32, SODA_C)
        self.col(l3, 0.3, x)
        self.au_mot("rempli à mi-hauteur")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, scale=0.8) for c in petits], lag_ratio=0.12), run_time=1.1)
        l4 = self.t("un huitième de la boisson.", 36, ROUGE_ERREUR)
        self.col(l4, -2.9, 0.4)
        self.au_mot("un huitième")
        self.play(FadeIn(l4, scale=1.12), run_time=0.5)
        self.insister(l4, 1.06, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = gobelet(0.9, 2.2, 0.7, P(-5.2, -0.3))
        li = liquide(g, 0.5)

        def avant_q(sc):
            sc.play(FadeIn(g), FadeIn(li), FadeIn(g.hh), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["Rempli à la moitié", "de sa hauteur :", "quelle part du total ?"],
                             [self.choix("un huitième"), self.choix("la moitié"),
                              self.choix("un quart")], 0,
                             ["Rapport un demi :", "÷ 2 × 2 × 2 = 8.", "Un huitième seulement."],
                             -0.3,
                             couper={1: ("÷ 2 × 2 × 2", "= 8.")},
                             mot_q="Un gobelet conique rempli", avant_q=avant_q)

    # ── 06 : le piège des trois règles ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -0.4
        seg = Line(P(-5.8, 1.6), P(-4.0, 1.6), color=BASE_C, stroke_width=9)
        l1 = self.ligne([("Une longueur :", WHITE), ("× le rapport.", BASE_C)], 32, buff=0.18)
        self.col(l1, 1.9, x)
        self.au_mot("Une longueur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(seg), run_time=0.5)
        self.au_mot("multiplie par le rapport.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        car = Square(1.5, fill_color="#a3e635", fill_opacity=0.5, stroke_color="#3f6212",
                     stroke_width=4).move_to(P(-4.9, 0.1))
        l2 = self.ligne([("Une aire :", WHITE), ("× le rapport deux fois.", "#a3e635")], 32, buff=0.18)
        self.col(l2, 0.6, x)
        self.au_mot("Une aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(car, scale=0.8), run_time=0.5)
        self.au_mot("par le rapport deux fois")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        cub = pave(1.3, 1.0, 1.3, 0.78, P(-5.5, -2.6))
        l3 = self.ligne([("Un volume :", WHITE), ("× le rapport trois fois.", ROUGE_ERREUR)],
                        32, buff=0.18)
        self.col(l3, -0.7, x)
        self.au_mot("Un volume")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(cub, scale=0.8), run_time=0.5)
        self.au_mot("par le rapport trois fois")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.45)
        l4 = self.t("règles différentes : à ne pas mélanger.", 30, JAUNE_TITRE)
        self.col(l4, -2.0, x)
        self.au_mot("règles différentes")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = gobelet(0.9, 2.2, 0.7, P(-5.2, -0.3))
        li = liquide(g, 1 / 3)

        def avant_q(sc):
            sc.play(FadeIn(g), FadeIn(li), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une réduction", "de rapport un tiers :", "le volume est divisé par…"],
                             [self.choix("÷ 3"), self.choix("÷ 9"), self.choix("÷ 27")], 2,
                             ["3 × 3 × 3 = 27.", "9 : ce serait pour une aire."],
                             -0.3,
                             couper={0: ("3 × 3 × 3", "= 27."), 1: ("9 :", "ce serait pour une aire.")},
                             mot_q="Dans une réduction", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        g = gobelet(1.1, 2.8, u, P(-4.6, -2.4))
        x = 0.3
        l0 = self.ligne([("Le gobelet d'Adam :", WHITE), ("48 cL", BASE_C)], 32, buff=0.18)
        self.col(l0, 2.0, x)
        self.au_mot("Le gobelet d'Adam")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(g, scale=0.85), run_time=0.6)
        self.au_mot("48 centilitres")
        self.play(FadeIn(l0[1], scale=1.15), run_time=0.4)
        l0b = self.t("une fois plein.", 30, WHITE)
        self.col(l0b, 1.2, x)
        self.au_mot("une fois plein")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.4)
        li = liquide(g, 0.75)
        l1 = self.ligne([("Le serveur remplit", WHITE), ("aux trois quarts", ORANGE_Q)], 30, buff=0.18)
        self.col(l1, 0.3, x)
        self.au_mot("Le serveur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(li, shift=UP * 0.3), run_time=0.7)
        self.au_mot("aux trois quarts")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(g.hh), run_time=0.45)
        l2 = self.t("Le verre a l'air presque plein.", 30, WHITE)
        self.col(l2, -0.5, x)
        self.au_mot("le verre")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        l3 = self.bloc(["Combien de centilitres vraiment,", "et combien lui manque-t-il ?"],
                       32, JAUNE_TITRE)
        self.col(l3, -1.6, x)
        self.au_mot("Combien de centilitres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("combien lui manque-t-il")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.8
        g = gobelet(1.1, 2.8, u, P(-5.3, -2.0))
        li = liquide(g, 0.75)
        self.add(g, li)
        x = -2.6
        l1 = self.ligne([("Rapport", WHITE), ("trois quarts", ORANGE_Q), ("= 0,75", BASE_C)],
                        32, buff=0.18)
        self.col(l1, 2.0, x)
        self.au_mot("rapport")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("trois quarts")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("0,75.")
        self.play(FadeIn(l1[2], scale=1.15), run_time=0.4)
        l2 = self.ligne([("0,75 × 0,75 × 0,75", BLEU_D), ("≈ 0,42", VERT_OK)], 32, buff=0.2)
        self.col(l2, 1.1, x)
        self.au_mot("0,75 fois 0,75")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,42.")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("48 × 0,42", BLEU_D), ("≈ 20 cL", VERT_OK)], 34, buff=0.2)
        self.col(l3, 0.2, x)
        self.au_mot("48 fois 0,42")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("20 centilitres")
        self.play(FadeIn(l3[1], scale=1.15), run_time=0.45)
        barres = VGroup(Rectangle(width=4.2, height=0.5, fill_color=GOB_C, fill_opacity=0.5,
                                  stroke_width=0),
                        Rectangle(width=1.75, height=0.5, fill_color=SODA_C, fill_opacity=0.95,
                                  stroke_width=0))
        barres[0].move_to(P(-2.6, -1.0))
        barres[1].align_to(barres[0], LEFT).set_y(-1.7)
        et = VGroup(hors_audit(self.t("48", 24, GOB_B)), hors_audit(self.t("20", 24, SODA_B)))
        et[0].next_to(barres[0], RIGHT, buff=0.15)
        et[1].next_to(barres[1], RIGHT, buff=0.15)
        self.play(FadeIn(barres), FadeIn(et), run_time=0.5)
        l4 = self.ligne([("Il manque", ORANGE_Q), ("28 cL :", ROUGE_ERREUR)], 36, buff=0.2)
        self.col(l4, -2.5, x)
        self.au_mot("Il en manque")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("28 :")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.45)
        l5 = self.t("plus de la moitié du gobelet !", 32, ROUGE_ERREUR)
        self.col(l5, -3.3, x)
        self.au_mot("plus de la moitié")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        g = gobelet(0.95, 2.3, 0.75, P(0, -1.0))
        fig = VGroup(g, liquide(g, 0.5))
        lignes = self.finale_gauche(fig, textes=[
            ("Une section parallèle à la base", "donne une réduction."),
            ("Les longueurs sont multipliées", "par le rapport."),
            ("Les aires par le rapport deux fois,", "les volumes trois fois.")], fs=28)
        self.add(fig)
        self.au_mot("Une section parallèle")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("Les longueurs")
        self.montrer_ligne(lignes[1])
        self.au_mot("les aires")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_la_section()
        self.ecran_le_rapport()
        self.ecran_le_cube()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
