# 4e_aire_defi.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode A5 : DÉFIS SUR LES AIRES
# (micro aire_defi, 4e ET 3e), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Vidéo COMMUNE avec la 3e : à brancher par `aussi`.
# Décor et métier : Ryan, IMPRIMEUR GRAND FORMAT — le flocage des maillots
# (centres sport, argent-budget).
# Mapping micro → écrans : 02 (le numéro : 25 × 18 = 450 cm²), 03 (le logo : π × 6 × 6 = 36π ≈ 113),
# 04 (un maillot = 450 + 113 ≈ 563 cm²), 06 (piège : 1 m² = 10 000 cm², pas 100),
# questions 05 (A : 450 cm²) et 07 (C : environ 113 cm²), défi 08 (563 × 18 = 10 134 cm²,
# soit un peu plus d'un mètre carré : 2 m² achetés, 60 €).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0).
# Voix : manim/voix/4e-aire-defi.json ; marques : 4e_aire_defi_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_aire_defi.py AireDefi4e
# Sortie : manim/sorties/4e/maths/aire/30-aire-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import ryan, Paysage4e  # noqa: E402

TISSU_C, TISSU_B = "#1d4ed8", "#1e3a8a"
FILM_C = "#fbbf24"
LOGO_C = "#f472b6"


def maillot(u, o=ORIGIN, sw=4, numero=True, logo=True):
    """Un maillot vu de dos : le corps, les deux manches, le numéro (rectangle de film) et
    le logo rond sur la manche. o = le centre du corps.
    Attributs : .corps .numero .logo"""
    corps = RoundedRectangle(width=2.2 * u, height=2.8 * u, corner_radius=0.12 * u,
                             fill_color=TISSU_C, fill_opacity=0.9, stroke_color=TISSU_B,
                             stroke_width=sw).move_to(o)
    manches = VGroup(*[RoundedRectangle(width=0.8 * u, height=0.9 * u, corner_radius=0.1 * u,
                                        fill_color=TISSU_C, fill_opacity=0.9, stroke_color=TISSU_B,
                                        stroke_width=sw).move_to(o + P(sx * 1.45 * u, 0.9 * u))
                       for sx in (-1, 1)])
    col = Ellipse(width=0.8 * u, height=0.28 * u, fill_color="#0b1220", fill_opacity=1,
                  stroke_color=TISSU_B, stroke_width=sw * 0.7).move_to(o + P(0, 1.3 * u))
    g = VGroup(manches, corps, col)
    g.corps, g.manches = corps, manches
    g.numero = Rectangle(width=1.25 * u, height=0.9 * u, fill_color=FILM_C, fill_opacity=0.85,
                         stroke_color="#78350f", stroke_width=sw * 0.7).move_to(o + P(0, 0.1 * u))
    g.logo = Circle(radius=0.3 * u, fill_color=LOGO_C, fill_opacity=0.9, stroke_color="#831843",
                    stroke_width=sw * 0.7).move_to(o + P(1.45 * u, 0.9 * u))
    if numero:
        g.add(g.numero)
    if logo:
        g.add(g.logo)
    g.o, g.u = o, u
    return g


def metre_carre(u, o=ORIGIN, sw=5):
    """Un carré d'un mètre de côté, quadrillé en décimètres : 100 carreaux. o = le centre."""
    c = Square(side_length=u, fill_color="#334155", fill_opacity=0.35, stroke_color=WHITE,
               stroke_width=sw).move_to(o)
    grille = VGroup()
    for k in range(1, 10):
        grille.add(Line(o + P(-u / 2 + k * u / 10, -u / 2), o + P(-u / 2 + k * u / 10, u / 2)))
        grille.add(Line(o + P(-u / 2, -u / 2 + k * u / 10), o + P(u / 2, -u / 2 + k * u / 10)))
    grille.set_stroke("#94a3b8", 1.5)
    g = VGroup(c, grille)
    g.carre, g.grille = c, grille
    return g


class AireDefi4e(Paysage4e):
    nom_voix = "4e-aire-defi"
    fichier_marques = "4e_aire_defi_marques.json"
    ceinture = "bleue"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les aires", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Défis sur les aires")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de film pour", "floquer une équipe ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        m = maillot(0.85, P(4.0, -0.5))
        self.au_mot("Combien de film")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(m, scale=0.85), run_time=0.5)
        self.au_mot("floquer une équipe")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(m.numero, color=FILM_C, scale_factor=1.12),
                  run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = ryan(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Ryan")
        nom = self.t("Ryan", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il imprime les flocages")
        met = self.t("imprimeur", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        m = maillot(0.9, P(4.2, -0.3), numero=False, logo=False)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(m, scale=0.9), run_time=0.7)
        x = -2.8
        l1 = self.t("le numéro dans le dos,", 32, FILM_C)
        self.col(l1, 2.0, x)
        self.au_mot("le numéro dans le dos")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(m.numero, scale=0.8), run_time=0.7)
        l2 = self.t("et le logo rond sur la manche.", 32, LOGO_C)
        self.col(l2, 1.0, x)
        self.au_mot("et le logo rond sur la manche")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(m.logo, scale=0.6), run_time=0.7)
        l3 = self.t("Le film se vend au mètre carré,", 30, WHITE)
        self.col(l3, 0.0, x)
        self.au_mot("Le film se vend au mètre carré")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        l4 = self.t("et il n'aime pas en jeter.", 32, JAUNE_TITRE)
        self.col(l4, -1.0, x)
        self.au_mot("et il n'aime pas en jeter")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.55)
        self.attendre_voix()

    # ── 02 : le numéro ──────────────────────────────────────────────────────
    def ecran_le_numero(self):
        self.ecran("02-le-numero")
        u = 1.0
        m = maillot(u, P(-4.4, 0.2), logo=False)
        self.add(m)
        self.au_mot("Le numéro tient dans un rectangle")
        tit = self.t("Le numéro", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Indicate(m.numero, color=FILM_C, scale_factor=1.12), run_time=0.9)
        c25 = hors_audit(sur_fond(self.t("25 cm", 22, BASE_C))).next_to(m.numero, DOWN, buff=0.1)
        c18 = hors_audit(sur_fond(self.t("18 cm", 22, BASE_C))).next_to(m.numero, RIGHT, buff=0.1)
        x = -0.2
        l1 = self.ligne([("de", WHITE), ("25 cm", BASE_C), ("sur 18.", BASE_C)], 32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("25 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c25), run_time=0.45)
        self.au_mot("sur 18.")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c18), run_time=0.4)
        l2 = self.ligne([("Son aire :", WHITE), ("25", BLEU_D), ("× 18", BLEU_D),
                         ("= 450 cm²", VERT_OK)], 34, buff=0.16)
        self.col(l2, 0.8, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("450 centimètres carrés")
        self.play(FadeIn(l2[3], scale=1.2), run_time=0.5)
        self.insister(l2[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le logo ────────────────────────────────────────────────────────
    def ecran_le_logo(self):
        self.ecran("03-le-logo")
        u = 1.0
        m = maillot(u, P(-4.4, 0.2), numero=False)
        self.add(m)
        self.au_mot("Le logo est un disque")
        tit = self.t("Le logo", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Indicate(m.logo, color=LOGO_C, scale_factor=1.25), run_time=0.9)
        ray = Line(m.logo.get_center(), m.logo.get_center() + RIGHT * 0.3 * u).set_stroke(BASE_C, 6)
        c6 = hors_audit(sur_fond(self.t("rayon 6 cm", 22, BASE_C))).next_to(m.logo, UP, buff=0.12)
        x = -0.4
        l1 = self.ligne([("de", WHITE), ("6 cm", BASE_C), ("de rayon.", BASE_C)], 32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("6 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ray), FadeIn(c6), run_time=0.5)
        self.au_mot("de rayon")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Son aire :", WHITE), ("π × 6", BLEU_D), ("× 6", BLEU_D),
                         ("= 36π", VERT_OK)], 32, buff=0.14)
        self.col(l2, 0.9, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pi fois 6")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 6,")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("36 pi")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("environ", WHITE), ("113 cm².", VERT_OK)], 36, buff=0.18)
        self.col(l3, -0.2, x)
        self.au_mot("environ 113")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        self.insister(l3[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : par maillot ────────────────────────────────────────────────────
    def ecran_par_maillot(self):
        self.ecran("04-par-maillot")
        u = 1.0
        m = maillot(u, P(-4.4, 0.0))
        self.add(m)
        self.au_mot("Un maillot, c'est donc")
        tit = self.t("Un maillot", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = 0.2
        l1 = self.ligne([("450", BLEU_D), ("+ 113", BLEU_D)], 40, buff=0.2)
        self.col(l1, 1.3, x)
        self.au_mot("450 plus")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(m.numero, color=FILM_C, scale_factor=1.1),
                  run_time=0.5)
        self.au_mot("113,")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(m.logo, color=LOGO_C, scale_factor=1.25),
                  run_time=0.5)
        l2 = self.ligne([("environ", WHITE), ("563 cm²", VERT_OK), ("de film.", FILM_C)],
                        36, buff=0.18)
        self.col(l2, -0.2, x)
        self.au_mot("environ 563")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.5)
        self.au_mot("de film")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l2[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.14
        r = Rectangle(width=25 * u, height=18 * u, fill_color=FILM_C, fill_opacity=0.7,
                      stroke_color="#78350f", stroke_width=5).move_to(P(-4.6, 1.4))
        # ⛔ les deux cotes SOUS la figure : « 18 cm » à gauche sortait du cadre.
        e = hors_audit(sur_fond(self.t("25 cm × 18 cm", 22, BASE_C))).next_to(r, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(r), FadeIn(e), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["L'aire du rectangle ?"],
                             [self.choix("450 cm²"), self.choix("86 cm²"), self.choix("43 cm²")], 0,
                             ["25 × 18 = 450 cm².", "86 : le périmètre."],
                             -0.3,
                             couper={0: ("25", "× 18", "= 450 cm²."),
                                     1: ("86 :", "le périmètre.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -0.2
        mc = metre_carre(3.4, P(-3.6, -0.5))
        l1 = self.bloc(["Un mètre carré, ce n'est pas", "100 centimètres carrés,"], 30, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Un mètre carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(mc.carre), run_time=0.8)
        self.au_mot("100 centimètres carrés")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.5)
        l2 = self.t("c'est 10 000.", 42, VERT_OK)
        self.col(l2, 0.8, x)
        self.au_mot("c'est 10 000")
        self.play(FadeIn(l2, scale=1.2), FadeIn(mc.grille), run_time=0.8)
        self.insister(l2, 1.1, 0.25)
        l3 = self.bloc(["Un carré d'un mètre de côté,", "c'est 100 centimètres sur 100."], 30, WHITE)
        self.col(l3, -0.6, x)
        self.au_mot("Un carré d'un mètre de côté")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("c'est 100 centimètres sur 100")
        c100 = hors_audit(sur_fond(self.t("100 cm", 22, BASE_C))).next_to(mc.carre, DOWN, buff=0.1)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(c100), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = Circle(radius=1.0, fill_color=LOGO_C, fill_opacity=0.85, stroke_color="#831843",
                   stroke_width=5).move_to(P(-4.6, 1.4))
        ray = Line(d.get_center(), d.get_center() + RIGHT).set_stroke(BASE_C, 7)
        e = hors_audit(sur_fond(self.t("rayon 6 cm", 22, BASE_C))).next_to(d, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(d), Create(ray), FadeIn(e), run_time=0.7)

        self.question_gauche("07-question", "07b-reponse",
                             ["L'aire du disque ?"],
                             [self.choix("environ 38 cm²"), self.choix("environ 226 cm²"),
                              self.choix("environ 113 cm²")], 2,
                             ["π × 6 × 6 = 36π ≈ 113 cm².", "38 : la longueur du cercle."],
                             -0.3,
                             couper={0: ("π × 6", "× 6", "= 36π", "≈ 113 cm²."),
                                     1: ("38 :", "la longueur du cercle.")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        # ⛔ 18 maillots tiennent en 6 × 3 à u = 0,22 : à 0,42 la 3e rangée sortait du cadre.
        u = 0.22
        equipe = VGroup(*[maillot(u, P(-6.0 + (k % 6) * 0.9, 1.0 - (k // 6) * 1.0), sw=2)
                          for k in range(18)])
        x = 0.9
        l0 = self.ligne([("Ryan floque", WHITE), ("18 maillots,", TISSU_C)], 32, buff=0.16)
        self.col(l0, 2.1, x)
        self.au_mot("Ryan floque")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("18 maillots")
        self.play(FadeIn(l0[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(m, scale=0.8) for m in equipe], lag_ratio=0.04), run_time=1.3)
        l1 = self.ligne([("563 cm²", FILM_C), ("chacun.", WHITE)], 32, buff=0.16)
        self.col(l1, 1.1, x)
        self.au_mot("563 centimètres carrés")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("chacun")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Le film :", WHITE), ("30 €", JAUNE_TITRE), ("le m².", JAUNE_TITRE)],
                        30, buff=0.14)
        self.col(l2, 0.2, x)
        self.au_mot("Le film se vend au mètre carré")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("30 euros")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("et on ne vend que des mètres entiers.", 28, ROUGE_ERREUR)
        self.col(l3, -0.7, x)
        self.au_mot("et on ne vend que des mètres entiers")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.6)
        l4 = self.t("Combien va-t-il payer ?", 34, JAUNE_TITRE)
        self.col(l4, -1.7, x)
        self.au_mot("Combien va-t-il payer")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        mc = metre_carre(2.6, P(-4.6, -0.3))
        self.add(mc)
        x = -1.9
        l1 = self.ligne([("563", BLEU_D), ("× 18", BLEU_D), ("= 10 134 cm²", VERT_OK)],
                        32, buff=0.16)
        self.col(l1, 2.1, x)
        self.au_mot("563 fois")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 134 centimètres carrés")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("Un mètre carré fait", WHITE), ("10 000 cm² :", BASE_C)], 30, buff=0.16)
        self.col(l2, 1.1, x)
        self.au_mot("Un mètre carré fait")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(mc.carre, color=WHITE, scale_factor=1.05),
                  run_time=0.6)
        self.au_mot("10 000 centimètres carrés")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        l3 = self.bloc(["ça fait un peu plus", "d'un mètre carré."], 32, VERT_OK)
        self.col(l3, 0.0, x)
        self.au_mot("ça fait un peu plus")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.6)
        # ⛔ « mètres » est dit 1 s avant le « 2 » : une ligne par mot-clé.
        l4 = self.bloc(["Comme on ne vend que des", "mètres entiers,", "Ryan en achète 2,"], 28, WHITE)
        self.col(l4, -1.1, x)
        self.au_mot("Comme on ne vend que des")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.45)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Ryan en achète 2")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.45)
        l5 = self.t("soit 60 euros.", 38, VERT_OK)
        self.col(l5, -2.0, x)
        self.au_mot("soit 60 euros")
        self.play(FadeIn(l5, scale=1.2), run_time=0.5)
        self.insister(l5, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = maillot(0.75, ORIGIN)
        lignes = self.finale_gauche(fig, textes=[
            ("On additionne les aires des morceaux,", "même de formes différentes."),
            ("Un mètre carré vaut", "10 000 centimètres carrés."),
            ("Et on arrondit au-dessus", "quand on achète.")], fs=28)
        self.add(fig)
        self.au_mot("On additionne les aires")
        self.montrer_ligne(lignes[0], Indicate(fig.numero, color=FILM_C, scale_factor=1.1))
        self.au_mot("Un mètre carré vaut")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on arrondit au-dessus")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_le_numero()
        self.ecran_le_logo()
        self.ecran_par_maillot()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
