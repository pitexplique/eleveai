# 4e_perimetre_probleme.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode P4 : UN PROBLÈME DE PÉRIMÈTRE
# (micro aire_perimetre_probleme, notion aire_perimetre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Sonia, ENTRAÎNEUSE D'ATHLÉTISME — pourquoi un tour de piste fait 400 m
# (centres sport, corps-sante).
# Mapping micro → écrans : 02 (la piste = deux droites de 85 m et deux virages de rayon 36 m),
# 03 (les deux demi-cercles font un cercle : 2 × π × 36 = 72π ≈ 226 m), 04 (170 + 226 ≈ 396,
# arrondi à 400), 06 (piège : on cherche une longueur, pas une surface), questions 05 (A : 72π m)
# et 07 (C : 226 m), défi 08 (le couloir extérieur : 2 × π × 3 ≈ 18,8 m par tour, × 12 ≈ 226 m).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0).
# Voix : manim/voix/4e-perimetre-probleme.json ; marques : 4e_perimetre_probleme_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_perimetre_probleme.py PerimetreProbleme4e
# Sortie : manim/sorties/4e/maths/perimetre/24-perimetre-probleme/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cercle, sonia, Paysage4e  # noqa: E402

TOUR_C = ORANGE_RETENUE
PISTE_C, PISTE_B = "#b91c1c", "#fca5a5"
PELOUSE = "#15803d"


def stade(droit, r, u, o=ORIGIN, couleur=PISTE_C, sw=7, op=0.5):
    """Une piste d'athlétisme vue de dessus : deux lignes droites et deux virages en demi-cercle.
    o = le centre. Attributs : .droites .virages .pelouse"""
    L, R = droit * u / 2, r * u
    pel = VGroup(Rectangle(width=2 * L, height=2 * R, fill_color=PELOUSE, fill_opacity=op,
                           stroke_width=0).move_to(o),
                 Circle(radius=R, fill_color=PELOUSE, fill_opacity=op,
                        stroke_width=0).move_to(o + P(-L, 0)),
                 Circle(radius=R, fill_color=PELOUSE, fill_opacity=op,
                        stroke_width=0).move_to(o + P(L, 0)))
    bas = Line(o + P(-L, -R), o + P(L, -R))
    haut = Line(o + P(-L, R), o + P(L, R))
    droites = VGroup(bas, haut).set_stroke(couleur, sw)
    g_arc = Arc(radius=R, start_angle=PI / 2, angle=PI).move_arc_center_to(o + P(-L, 0))
    d_arc = Arc(radius=R, start_angle=-PI / 2, angle=PI).move_arc_center_to(o + P(L, 0))
    virages = VGroup(g_arc, d_arc).set_stroke(couleur, sw)
    g = VGroup(pel, droites, virages)
    g.pelouse, g.droites, g.virages = pel, droites, virages
    g.L, g.R, g.o = L, R, o
    return g


class PerimetreProbleme4e(Paysage4e):
    nom_voix = "4e-perimetre-probleme"
    fichier_marques = "4e_perimetre_probleme_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un problème de périmètre", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Un problème de périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Pourquoi un tour de piste", "fait-il 400 mètres ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        st = stade(3.0, 1.0, 0.75, P(3.9, -0.6))
        self.au_mot("Pourquoi un tour de piste")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(st, scale=0.85), run_time=0.5)
        # ⛔ pas d'au_mot ici : le gabarit attend déjà « 400 » ; en attendant d'abord, « fait »
        #    (le premier mot long de la ligne) se retrouvait compté en TARD.
        self.play(FadeIn(q[1], shift=UP * 0.2),
                  Indicate(VGroup(st.droites, st.virages), color=TOUR_C, scale_factor=1.04),
                  run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = sonia(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Sonia")
        nom = self.t("Sonia", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle entraîne des coureurs")
        met = self.t("athlétisme", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        st = stade(2.8, 0.95, 0.8, P(4.0, -1.6))
        l1 = self.ligne([("Sur le stade, un tour de piste", WHITE), ("fait 400 m,", TOUR_C)],
                        28, buff=0.14)
        self.col(l1, 2.0, x)
        self.au_mot("Sur le stade")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(st, scale=0.9), run_time=0.8)
        self.au_mot("400 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        l2 = self.t("dans le couloir du bord intérieur.", 30, WHITE)
        self.col(l2, 1.0, x)
        self.au_mot("dans le couloir du bord intérieur")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  Create(VGroup(st.droites.copy(), st.virages.copy()).set_stroke(TOUR_C, 9)),
                  run_time=1.0)
        l3 = self.t("Mais d'où vient ce nombre ?", 36, JAUNE_TITRE)
        self.col(l3, -0.5, x)
        self.au_mot("Mais d'où vient ce nombre")
        self.play(FadeIn(l3, scale=1.1), run_time=0.6)
        self.insister(l3, 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : la piste ───────────────────────────────────────────────────────
    def ecran_la_piste(self):
        self.ecran("02-la-piste")
        u = 1.0
        st = stade(3.2, 1.1, u, P(-3.2, -0.3))
        self.add(st)
        self.au_mot("La piste est faite de deux lignes droites")
        tit = self.t("Deux droites, deux virages", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), Create(st.droites.copy().set_stroke(TOUR_C, 9)), run_time=1.0)
        self.au_mot("et de deux virages")
        self.play(Create(st.virages.copy().set_stroke(BASE_C, 9)), run_time=0.9)
        x = 1.2
        l1 = self.ligne([("Chaque droite :", TOUR_C), ("environ 85 m.", VERT_OK)], 30, buff=0.16)
        self.col(l1, 2.0, x)
        self.au_mot("Chaque ligne droite mesure")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("environ 85 mètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.45)
        l2 = self.ligne([("Chaque virage :", BASE_C), ("un demi-cercle", WHITE)], 30, buff=0.16)
        self.col(l2, -1.5, x)
        self.au_mot("Chaque virage est un demi-cercle")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.6)
        l3 = self.ligne([("de 36 m", VERT_OK), ("de rayon.", VERT_OK)], 32, buff=0.16)
        self.col(l3, -2.4, x)
        ray = Line(st.o + P(st.L, 0), st.o + P(st.L, st.R)).set_stroke(BASE_C, 7)
        self.au_mot("36 mètres")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(ray), run_time=0.5)
        self.au_mot("de rayon")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : les deux virages font un cercle ────────────────────────────────
    def ecran_les_virages(self):
        self.ecran("03-les-virages")
        u = 1.0
        self.au_mot("Les deux demi-cercles")
        tit = self.t("Les deux virages", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        c = cercle(1.2, u, P(-4.2, -0.3), couleur=BASE_C, sw=9)
        self.play(Write(tit), Create(c), run_time=0.9)
        x = -1.0
        l1 = self.t("mis bout à bout font un cercle entier.", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("mis bout à bout")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.55)
        l2 = self.ligne([("Sa longueur :", WHITE), ("2 × π", BLEU_D), ("× 36", BLEU_D),
                         ("= 72π m", VERT_OK)], 32, buff=0.16)
        self.col(l2, 0.9, x)
        self.au_mot("Sa longueur")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(c.rayon_trait), run_time=0.5)
        self.au_mot("2 fois pi")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 36")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("72 pi mètres")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("Environ", WHITE), ("226 m", VERT_OK)], 40, buff=0.18)
        self.col(l3, -0.6, x)
        self.au_mot("Environ")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("226 mètres")
        self.play(FadeIn(l3[1], scale=1.2), run_time=0.5)
        self.insister(l3[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : le total ───────────────────────────────────────────────────────
    def ecran_total(self):
        self.ecran("04-total")
        u = 0.85
        st = stade(3.2, 1.1, u, P(-3.6, 0.6))
        self.add(st)
        self.au_mot("Les droites")
        tit = self.t("Le tour complet", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = 0.6
        l1 = self.ligne([("Les droites :", TOUR_C), ("85", BLEU_D), ("× 2", BLEU_D),
                         ("= 170 m", VERT_OK)], 32, buff=0.16)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("170 mètres")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.4)
        l2 = self.ligne([("En tout :", WHITE), ("170", BLEU_D), ("+ 226", BLEU_D),
                         ("≈ 396 m", VERT_OK)], 32, buff=0.16)
        self.col(l2, 0.9, x)
        self.au_mot("En tout")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 396 mètres")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("On arrondit à", WHITE), ("400 :", JAUNE_TITRE)], 36, buff=0.18)
        self.col(l3, -0.5, x)
        self.au_mot("On arrondit")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("à 400")
        self.play(FadeIn(l3[1], scale=1.2), run_time=0.45)
        l4 = self.t("c'est le tour de piste.", 34, VERT_OK)
        self.col(l4, -1.6, x)
        self.au_mot("c'est le tour de piste")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        c = cercle(1.1, u, P(-4.6, 1.2), couleur=BASE_C, sw=8)
        e = hors_audit(sur_fond(self.t("rayon 36 m", 22, BASE_C))).next_to(c.rayon_trait, UP, buff=0.08)

        def avant_q(sc):
            sc.play(Create(c), Create(c.rayon_trait), FadeIn(e), run_time=0.7)

        self.question_gauche("05-question", "05b-reponse",
                             ["La longueur du cercle ?"],
                             [self.choix("72π m"), self.choix("36π m"), self.choix("1 296π m")], 0,
                             ["2 × π × 36 = 72π m.", "1 296π : une aire."],
                             -0.3,
                             couper={0: ("2", "× π", "× 36", "= 72π m."),
                                     1: ("1 296π :", "une aire.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.8
        st = stade(3.0, 1.0, u, P(-3.8, -1.6))
        self.add(st)
        x = -1.0
        l1 = self.bloc(["Dans un problème, on cherche", "d'abord ce qu'on demande."], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Dans un problème")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        l2 = self.bloc(["Ici, on demande une longueur,", "donc des mètres."], 32, VERT_OK)
        self.col(l2, 0.9, x)
        self.au_mot("Ici, on demande une longueur")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  Create(VGroup(st.droites.copy(), st.virages.copy()).set_stroke(TOUR_C, 9)),
                  run_time=1.0)
        l3 = self.bloc(["Une réponse en mètres carrés", "serait une surface :"], 30, ROUGE_ERREUR)
        self.col(l3, -0.3, x)
        self.au_mot("Une réponse en mètres carrés")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(st.pelouse, color=PELOUSE, scale_factor=1.05),
                  run_time=0.8)
        l4 = self.t("ce n'est pas la question.", 32, ROUGE_ERREUR)
        self.col(l4, -1.5, x)
        self.au_mot("ce n'est pas la question")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        c = cercle(1.1, u, P(-4.6, 1.2), couleur=BASE_C, sw=8)
        e = hors_audit(sur_fond(self.t("72π m", 24, VERT_OK))).next_to(c, DOWN, buff=0.1)

        def avant_q(sc):
            sc.play(Create(c), FadeIn(e), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             # ⛔ le « 72π » est DESSINÉ sous le cercle : dans la carte, il
                             # attendait « environ » et s'écrivait 2 s trop tard.
                             ["C'est environ…"],
                             [self.choix("113 m"), self.choix("452 m"), self.choix("226 m")], 2,
                             ["72 × 3,14 ≈ 226 m.", "113 : la moitié,", "un seul virage."],
                             -0.3,
                             couper={0: ("72", "× 3,14", "≈ 226 m."),
                                     1: ("113 :", "la moitié,")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.8
        st = stade(2.8, 1.0, u, P(-3.8, -0.6))
        ext = stade(2.8, 1.3, u, P(-3.8, -0.6), couleur="#f59e0b", sw=6, op=0.0)
        x = 1.0
        l0 = self.t("Sonia fait courir 12 tours.", 30, WHITE)
        self.col(l0, 2.1, x)
        self.au_mot("Sonia fait courir 12 tours")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(st, scale=0.9), run_time=0.8)
        l1 = self.bloc(["Un coureur du couloir extérieur", "tourne 3 m plus loin du centre :"], 28, "#f59e0b")
        self.col(l1, 1.2, x)
        self.au_mot("Un coureur du couloir extérieur")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(VGroup(ext.droites, ext.virages)), run_time=0.9)
        self.au_mot("tourne 3 mètres plus loin")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.5)
        l2 = self.t("son virage a 3 m de rayon en plus.", 28, "#f59e0b")
        self.col(l2, 0.1, x)
        self.au_mot("son virage a donc 3 mètres de rayon en plus")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.6)
        l3 = self.bloc(["Combien de mètres parcourt-il", "en plus sur les 12 tours ?"], 30, JAUNE_TITRE)
        self.col(l3, -1.1, x)
        self.au_mot("Combien de mètres parcourt-il")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.6
        st = stade(2.6, 1.0, u, P(-5.1, 1.1))
        ext = stade(2.6, 1.3, u, P(-5.1, 1.1), couleur="#f59e0b", sw=5, op=0.0)
        self.add(st, ext.droites, ext.virages)
        x = -2.8
        l1 = self.ligne([("Par tour :", WHITE), ("rayon 39", BLEU_D), ("au lieu de 36.", BLEU_D)],
                        28, buff=0.14)
        self.col(l1, 2.1, x)
        self.au_mot("Par tour")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("rayon 39")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("au lieu de 36")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Différence :", WHITE), ("2 × π", BLEU_D), ("× 39", BLEU_D),
                         ("− 2 × π", BLEU_D), ("× 36", BLEU_D)], 28, buff=0.12)
        self.col(l2, 1.2, x)
        self.au_mot("La différence")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 fois pi fois 39")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("moins 2 fois pi")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l2[4], shift=UP * 0.1), run_time=0.28)
        l3 = self.ligne([("soit", WHITE), ("2 × π", BLEU_D), ("× 3", BLEU_D),
                         ("≈ 18,8 m", VERT_OK), ("par tour.", WHITE)], 28, buff=0.12)
        self.col(l3, 0.3, x)
        self.au_mot("soit 2 fois pi")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("environ 18,8 mètres")
        self.play(FadeIn(l3[3], shift=UP * 0.1), run_time=0.35)
        self.au_mot("par tour")
        self.play(FadeIn(l3[4], shift=UP * 0.1), run_time=0.3)
        l4 = self.ligne([("Sur 12 tours :", WHITE), ("18,8", BLEU_D), ("× 12", BLEU_D),
                         ("≈ 226 m", VERT_OK), ("de plus.", VERT_OK)], 30, buff=0.12)
        self.col(l4, -0.8, x)
        self.au_mot("Sur 12 tours")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.28)
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("environ 226 mètres")
        self.play(FadeIn(l4[3], scale=1.15), run_time=0.4)
        self.au_mot("de plus")
        self.play(FadeIn(l4[4], shift=UP * 0.1), run_time=0.3)
        self.insister(l4[3], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = stade(2.4, 0.9, 0.7, ORIGIN)
        lignes = self.finale_gauche(fig, textes=[
            ("Un problème de périmètre se découpe :", "les parties droites, puis les rondes."),
            ("Deux demi-cercles", "font un cercle."),
            ("Et la réponse est", "toujours une longueur.")], fs=28)
        self.add(fig)
        self.au_mot("Un problème de périmètre se découpe")
        self.montrer_ligne(lignes[0], Indicate(fig.droites, color=TOUR_C, scale_factor=1.04))
        self.au_mot("Deux demi-cercles")
        self.montrer_ligne(lignes[1], Indicate(fig.virages, color=BASE_C, scale_factor=1.04))
        self.au_mot("Et la réponse est")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_la_piste()
        self.ecran_les_virages()
        self.ecran_total()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
