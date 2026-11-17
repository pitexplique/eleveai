# 4e_aire_disque.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode A2 : L'AIRE D'UN DISQUE
# (nourrit la 4e `aire_figure` ; micro 3e `aire_disque`), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Vidéo COMMUNE avec la 3e : à brancher par `aussi`.
# Décor et métier : Nina, FABRICANTE DE TAMBOURS — la peau d'un tambour (centres musique, art-design).
# Mapping micro → écrans : 02 (le tour n'est pas la peau : une longueur contre une surface),
# 03 (la formule : π × rayon × rayon, le rayon y passe deux fois), 04 (le tambour de 20 cm :
# 400π ≈ 1 256 cm²), 06 (piège : avec le diamètre, diviser par 2 d'abord), questions 05 (A : 25π)
# et 07 (B : 400π), défi 08 (6 tambours, 6 carrés de peau de 50 × 50, et la chute).
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0).
# Voix : manim/voix/4e-aire-disque.json ; marques : 4e_aire_disque_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_aire_disque.py AireDisque4e
# Sortie : manim/sorties/4e/maths/aire/27-aire-disque/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cercle, nina, Paysage4e  # noqa: E402

PEAU_C, PEAU_B = "#fde68a", "#92400e"     # la peau du tambour (la surface)
TOUR_C = ORANGE_RETENUE                    # le tour, quand on l'oppose à l'aire
BOIS_C = "#7c2d12"


def tambour(r, u, o=ORIGIN, sw=5):
    """Un tambour vu de dessus : le fût en bois, et la peau tendue dessus.
    Attributs : .peau .fut .rayon_trait .diam_trait"""
    fut = Annulus(inner_radius=r * u, outer_radius=r * u * 1.16, fill_color=BOIS_C,
                  fill_opacity=1, stroke_width=0).move_to(o)
    peau = Circle(radius=r * u, fill_color=PEAU_C, fill_opacity=0.75, stroke_color=PEAU_B,
                  stroke_width=sw).move_to(o)
    g = VGroup(peau, fut)
    g.peau, g.fut, g.o, g.r, g.u = peau, fut, o, r, u
    g.rayon_trait = Line(o, o + P(r * u, 0), color=BASE_C, stroke_width=8)
    g.diam_trait = Line(o + P(-r * u, 0), o + P(r * u, 0), color=BASE_C, stroke_width=8)
    return g


class AireDisque4e(Paysage4e):
    nom_voix = "4e-aire-disque"
    fichier_marques = "4e_aire_disque_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire d'un disque", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire d'un disque")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de peau", "pour un tambour ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        ta = tambour(1.2, 1.0, P(3.9, -0.5))
        self.au_mot("Combien de peau")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(ta, scale=0.85), run_time=0.5)
        self.au_mot("pour un tambour")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(ta.peau, color=PEAU_C, scale_factor=1.06),
                  run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = nina(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Nina")
        nom = self.t("Nina", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle fabrique des tambours")
        met = self.t("tambours", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.8
        ta = tambour(1.2, 1.0, P(4.1, -1.2))
        l1 = self.bloc(["Sur chaque tambour,", "elle tend une peau ronde."], 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Sur chaque tambour")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(ta.fut), run_time=0.7)
        self.au_mot("elle tend une peau ronde")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(ta.peau, scale=0.8), run_time=0.8)
        l2 = self.t("La peau se vend au décimètre carré :", 28, PEAU_C)
        self.col(l2, 0.8, x)
        self.au_mot("La peau se vend au décimètre carré")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.6)
        l3 = self.bloc(["Nina doit calculer", "l'aire d'un disque."], 34, JAUNE_TITRE)
        self.col(l3, -0.5, x)
        self.au_mot("Nina doit calculer")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 02 : le tour n'est pas la peau ──────────────────────────────────────
    def ecran_pas_le_tour(self):
        self.ecran("02-pas-le-tour")
        u = 1.0
        ta = tambour(1.2, u, P(-4.0, -0.4))
        self.add(ta)
        self.au_mot("Attention")
        # ⛔ le titre redit « tour » et « peau », prononcés plus loin : hors_audit, sinon il
        #    attend ces mots-là et les lignes suivantes partent toutes en retard.
        tit = hors_audit(self.t("Le tour n'est pas la peau", 42, ORANGE_Q)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.55)
        x = -0.6
        l1 = self.bloc(["le tour du tambour et la peau,", "ce ne sont pas la même chose."], 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("le tour du tambour et la peau")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("ce ne sont pas la même chose")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.5)
        tour = Circle(radius=1.2 * u * 1.16, color=TOUR_C, stroke_width=10).move_to(ta.o)
        l2 = self.ligne([("Le tour est", WHITE), ("une longueur.", TOUR_C)], 34, buff=0.18)
        self.col(l2, 0.8, x)
        self.au_mot("Le tour est une longueur")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(tour), run_time=1.0)
        l3 = self.ligne([("La peau est", WHITE), ("une surface.", PEAU_C)], 34, buff=0.18)
        self.col(l3, -0.6, x)
        self.au_mot("La peau est une surface")
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(ta.peau, color=PEAU_C, scale_factor=1.1),
                  run_time=0.9)
        self.attendre_voix()

    # ── 03 : la formule ─────────────────────────────────────────────────────
    def ecran_formule(self):
        self.ecran("03-formule")
        u = 1.0
        ta = tambour(1.2, u, P(-4.2, 0.0))
        self.add(ta)
        self.au_mot("L'aire d'un disque")
        tit = self.t("La formule", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        cadre = RoundedRectangle(width=6.6, height=1.4, corner_radius=0.2, stroke_color=JAUNE_TITRE,
                                 stroke_width=5, fill_color="#422006", fill_opacity=0.6)
        cadre.move_to(P(2.3, 1.2))
        f = self.ligne([("π", JAUNE_TITRE), ("× rayon", BASE_C), ("× rayon", BASE_C)], 36, buff=0.2)
        f.move_to(cadre.get_center())
        self.au_mot("pi fois le rayon")
        self.play(FadeIn(cadre), Create(ta.rayon_trait), run_time=0.5)
        self.play(FadeIn(f[0], scale=1.1), FadeIn(f[1], scale=1.1), run_time=0.5)
        self.au_mot("fois le rayon", 2)   # ⛔ le 1er « fois le rayon » est déjà passé
        self.play(FadeIn(f[2], scale=1.1), run_time=0.45)
        x = 0.0
        l1 = self.bloc(["Le rayon y passe deux fois,", "et c'est ce qui change tout."], 32, VERT_OK)
        self.col(l1, -0.8, x)
        self.au_mot("Le rayon y passe deux fois")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(ta.rayon_trait, color=BASE_C,
                                                          scale_factor=1.1), run_time=0.8)
        self.au_mot("et c'est ce qui change tout")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 04 : le tambour de Nina ─────────────────────────────────────────────
    def ecran_exemple(self):
        self.ecran("04-exemple")
        u = 1.0
        ta = tambour(1.2, u, P(-4.4, 0.1))
        self.au_mot("Le tambour de Nina")
        tit = self.t("Le tambour de Nina", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(ta, scale=0.9), run_time=0.7)
        x = -0.6
        l1 = self.ligne([("a", WHITE), ("20 cm", BASE_C), ("de rayon.", BASE_C)], 32, buff=0.14)
        self.col(l1, 2.0, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(ta.rayon_trait), run_time=0.5)
        self.au_mot("de rayon")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Son aire :", WHITE), ("π × 20", BLEU_D), ("× 20", BLEU_D)], 32, buff=0.16)
        self.col(l2, 1.0, x)
        self.au_mot("Son aire")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pi fois 20")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("fois 20,")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("soit", WHITE), ("400π cm².", VERT_OK)], 36, buff=0.18)
        self.col(l3, 0.1, x)
        self.au_mot("soit 400 pi")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        l4 = self.ligne([("Environ", WHITE), ("1 256 cm².", VERT_OK)], 36, buff=0.18)
        self.col(l4, -1.0, x)
        self.au_mot("Environ")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 256 centimètres carrés")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.5)
        self.insister(l4[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.85
        ta = tambour(1.1, u, P(-4.5, 1.8))   # ⛔ la cote passait sous la phrase de réponse
        e = hors_audit(sur_fond(self.t("rayon 5 cm", 22, BASE_C))).next_to(ta, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(ta), Create(ta.rayon_trait), FadeIn(e), run_time=0.7)

        self.question_gauche("05-question", "05b-reponse",
                             ["L'aire du disque ?"],
                             [self.choix("25π cm²"), self.choix("10π cm²"), self.choix("5π cm²")], 0,
                             ["π × 5 × 5 = 25π cm².", "10π : la longueur du cercle,",
                              "pas son aire."],
                             -0.3,
                             couper={0: ("π × 5", "× 5", "= 25π cm²."),
                                     1: ("10π :", "la longueur du cercle,")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.85
        ta = tambour(1.3, u, P(-4.2, -0.2))
        self.add(ta)
        x = -0.8
        l1 = self.bloc(["Quand on donne le diamètre,", "il faut d'abord le diviser par 2."],
                       30, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Quand on donne le diamètre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(ta.diam_trait), run_time=0.7)
        self.au_mot("il faut d'abord le diviser par 2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.5)
        l2 = self.ligne([("Une peau de", WHITE), ("40 cm", BASE_C), ("de diamètre", BASE_C)],
                        30, buff=0.14)
        self.col(l2, 0.9, x)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("40 centimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de diamètre")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("a", WHITE), ("20 cm", VERT_OK), ("de rayon.", VERT_OK)], 32, buff=0.14)
        self.col(l3, 0.0, x)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 centimètres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(ta.rayon_trait), run_time=0.5)
        self.au_mot("de rayon")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        l4 = self.bloc(["Sinon, l'aire est multipliée", "par 4 sans raison."], 32, ROUGE_ERREUR)
        self.col(l4, -1.2, x)
        self.au_mot("sinon, l'aire est multipliée")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.7)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.8
        ta = tambour(1.3, u, P(-4.4, 1.9))   # ⛔ la cote passait sous la phrase de réponse
        e = hors_audit(sur_fond(self.t("diamètre 40 cm", 22, BASE_C))).next_to(ta, DOWN, buff=0.12)

        def avant_q(sc):
            sc.play(FadeIn(ta), Create(ta.diam_trait), FadeIn(e), run_time=0.7)

        self.question_gauche("07-question", "07b-reponse",
                             ["L'aire de la peau ?"],
                             [self.choix("1 600π cm²"), self.choix("400π cm²"),
                              self.choix("80π cm²")], 1,
                             ["Le rayon vaut 20.", "π × 20 × 20 = 400π cm².",
                              "1 600π : le diamètre pris pour le rayon."],
                             -0.3,
                             # ⛔ « 20. » seul est pris pour une numérotation (_ENUM) et sort de
                             # la synchro : le nombre reste collé à un mot.
                             couper={0: ("Le rayon", "vaut 20."),
                                     1: ("π × 20", "× 20", "= 400π cm²."),
                                     2: ("1 600π :", "le diamètre pris pour le rayon.")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 0.5
        six = VGroup(*[tambour(1.0, u, P(-5.3 + (k % 3) * 1.25, 0.9 - (k // 3) * 2.0), sw=3)
                       for k in range(6)])
        x = 0.9
        l0 = self.ligne([("Nina prépare", WHITE), ("6 tambours", PEAU_C)], 32, buff=0.16)
        self.col(l0, 2.0, x)
        self.au_mot("Nina prépare")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 tambours")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(six, scale=0.9), run_time=0.9)
        l1 = self.ligne([("de", WHITE), ("20 cm", BASE_C), ("de rayon.", BASE_C)], 32, buff=0.14)
        self.col(l1, 1.1, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("de rayon")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.bloc(["La peau se vend par carrés", "de 50 cm sur 50."], 30, PEAU_C)
        self.col(l2, 0.0, x)
        self.au_mot("La peau se vend par carrés")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("de 50 centimètres sur 50")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.5)
        l3 = self.bloc(["Combien de carrés de peau", "faut-il au minimum ?"], 32, JAUNE_TITRE)
        self.col(l3, -1.3, x)
        self.au_mot("Combien de carrés de peau")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.7)
        self.pause_defi(y=-2.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.045
        o = P(-4.4, 0.2)
        carre = Square(side_length=50 * u, fill_color="#1e293b", fill_opacity=0.8,
                       stroke_color=PEAU_B, stroke_width=4).move_to(o)
        ta = tambour(20, u, o, sw=4)
        self.add(carre, ta)
        x = -1.4
        l1 = self.ligne([("Un disque de", WHITE), ("20 cm", BASE_C), ("de rayon", BASE_C)],
                        28, buff=0.12)
        self.col(l1, 2.1, x)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("20 centimètres")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("de rayon")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("fait", WHITE), ("40 cm", BASE_C), ("de large :", BASE_C)], 28, buff=0.12)
        self.col(l2, 1.3, x)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("40 centimètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(ta.diam_trait), run_time=0.45)
        self.au_mot("de large")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("il entre tout juste dans", WHITE), ("un carré de 50.", VERT_OK)],
                        28, buff=0.14)
        self.col(l3, 0.5, x)
        self.au_mot("il entre tout juste")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("un carré de 50")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(carre, color=PEAU_B, scale_factor=1.06),
                  run_time=0.6)
        l4 = self.ligne([("Un carré par tambour :", WHITE), ("6 carrés.", VERT_OK)], 32, buff=0.16)
        self.col(l4, -0.5, x)
        self.au_mot("Un carré par tambour")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("6 carrés")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.5)
        self.insister(l4[1], 1.1, 0.25)
        l5 = self.ligne([("Et il reste de la chute :", WHITE), ("environ 1 244 cm²", ROUGE_ERREUR)],
                        26, buff=0.14)
        self.col(l5, -1.6, x)
        self.au_mot("Et il reste de la chute")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("environ 1 244 centimètres carrés")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = tambour(1.1, 0.85, ORIGIN)
        lignes = self.finale_gauche(fig, textes=[
            ("L'aire d'un disque vaut", "π fois le rayon, fois le rayon."),
            ("Le rayon est", "la moitié du diamètre."),
            ("Le tour, lui, vaut", "2 fois π fois le rayon.")], fs=28)
        self.add(fig)
        self.au_mot("L'aire d'un disque vaut")
        self.montrer_ligne(lignes[0], Indicate(fig.peau, color=PEAU_C, scale_factor=1.06))
        self.au_mot("Le rayon est la moitié")
        self.montrer_ligne(lignes[1])
        self.au_mot("Le tour, lui, vaut")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pas_le_tour()
        self.ecran_formule()
        self.ecran_exemple()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
