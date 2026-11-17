# 4e_section_comprendre.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode S5 : LA SECTION PLANE
# (micro vision_section, notion vision_espace), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Vidéo COMMUNE avec la 3e (micros volume_section et section_reconnaitre) : à brancher par `aussi`.
# Décor et métier : Naïma, MANIPULATRICE EN RADIOLOGIE — la coupe d'un muscle au scanner
# (centres corps-sante, technologie-ia).
# Mapping micro → écrans : 02 (couper par un plan, la section est la surface plate vue à plat),
# 03 (le cylindre : en travers un disque, dans la longueur un rectangle), 04 (la force d'un muscle
# dépend de l'AIRE de sa section), 06 (piège : c'est l'orientation de la coupe qui décide),
# questions 05 (A : un disque) et 07 (B : un rectangle), défi 08 (16π → 36π, soit × 2,25).
# Voix : manim/voix/4e-section-comprendre.json ; marques : 4e_section_comprendre_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_section_comprendre.py SectionComprendre4e
# Sortie : manim/sorties/4e/maths/solides/19-section-comprendre/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import point3, cylindre, cercle, naima, Paysage4e  # noqa: E402

PLAN_C = "#facc15"        # le plan de coupe
SECTION_C = "#22d3ee"     # la section, la surface plate
PEAU_C, PEAU_D = "#e8b48c", "#f3d2bb"
MUSCLE_C, MUSCLE_B = "#e11d48", "#881337"


def plan_coupe(l, p, u, o=ORIGIN, couleur=PLAN_C, op=0.3, sw=3):
    """Le plan de coupe HORIZONTAL, en cavalière : un parallélogramme traversant le solide.
    o = son coin avant-gauche."""
    q = lambda x, y: point3(o, u, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(l, 0), q(l, p), q(0, p), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw)


def plan_vertical(l, h, u, o=ORIGIN, couleur=PLAN_C, op=0.3, sw=3):
    """Le plan de coupe DANS LA LONGUEUR : un rectangle vertical qui traverse le solide."""
    return Rectangle(width=l * u, height=h * u, fill_color=couleur, fill_opacity=op,
                     stroke_color=couleur, stroke_width=sw).move_to(o)


def bras(r, h, u, o=ORIGIN, sw=4):
    """Le bras scanné : un cylindre couleur peau. Attributs : ceux de cylindre()."""
    return cylindre(r, h, u, o, corps=PEAU_C, dessus=PEAU_D, bord="#7c2d12", sw=sw)


def tranche_disque(r, u, o=ORIGIN, muscle=0.55, sw=5):
    """La section VUE À PLAT, comme sur l'écran du scanner : le disque de la coupe, et
    dedans le disque du muscle. Attributs : .peau .muscle"""
    peau = Circle(radius=r * u, fill_color=SECTION_C, fill_opacity=0.35, stroke_color=SECTION_C,
                  stroke_width=sw).move_to(o)
    mus = Circle(radius=r * muscle * u, fill_color=MUSCLE_C, fill_opacity=0.8, stroke_color=MUSCLE_B,
                 stroke_width=sw * 0.6).move_to(o)
    g = VGroup(peau, mus)
    g.peau, g.muscle, g.r = peau, mus, r
    return g


class SectionComprendre4e(Paysage4e):
    nom_voix = "4e-section-comprendre"
    fichier_marques = "4e_section_comprendre_marques.json"
    ceinture = "verte"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La section plane", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La section plane")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Quelle forme apparaît", "quand on coupe un solide ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        cy = bras(0.65, 1.8, 0.85, P(3.4, -1.7))
        pl = plan_coupe(1.5, 1.3, 0.85, P(2.75, -0.85))
        self.au_mot("Quelle forme apparaît")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(cy, scale=0.85), run_time=0.5)
        self.au_mot("quand on coupe un solide")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(pl, shift=DOWN * 0.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = naima(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Naïma")
        nom = self.t("Naïma", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("manipulatrice en radiologie")
        met = self.t("radiologie", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -3.0
        l1 = self.t("elle règle le scanner.", 32, WHITE)
        self.col(l1, 2.0, x)
        scan = VGroup(
            Rectangle(width=2.3, height=1.7, fill_color="#0f172a", fill_opacity=1,
                      stroke_color="#475569", stroke_width=4),
            Circle(radius=0.5, stroke_color="#94a3b8", stroke_width=6, fill_opacity=0))
        scan.move_to(P(5.0, 2.3))
        self.au_mot("elle règle le scanner")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(scan, scale=0.9), run_time=0.6)
        l2 = self.bloc(["Le scanner ne coupe rien", "pour de vrai :"], 30, WHITE)
        self.col(l2, 1.0, x)
        self.au_mot("Le scanner ne coupe rien")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.t("il fabrique des images de tranches.", 30, SECTION_C)
        self.col(l3, 0.0, x)
        tr = VGroup(*[tranche_disque(0.45, 1.0, P(2.9 + k * 1.3, -2.6), sw=3) for k in range(3)])
        self.au_mot("il fabrique des images de tranches")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(t, scale=0.8) for t in tr], lag_ratio=0.2), run_time=0.9)
        l4 = self.t("Chaque tranche est une section.", 34, JAUNE_TITRE)
        self.col(l4, -1.1, x)
        self.au_mot("Chaque tranche est une section")
        self.play(FadeIn(l4, scale=1.1), run_time=0.55)
        self.insister(l4, 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : la définition ──────────────────────────────────────────────────
    def ecran_definition(self):
        self.ecran("02-definition")
        u = 1.0
        cy = bras(0.7, 2.0, u, P(-5.0, -1.9))
        self.add(cy)
        self.au_mot("Couper un solide par un plan")
        tit = self.t("Couper par un plan", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        pl = plan_coupe(1.7, 1.4, u, P(-5.85, -0.85))
        self.play(Write(tit), FadeIn(pl, shift=DOWN * 0.4), run_time=0.8)
        x = -1.7
        l1 = self.t("c'est le trancher.", 32, WHITE)
        self.col(l1, 1.9, x)
        self.au_mot("c'est le trancher")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.bloc(["La section, c'est la surface plate", "qu'on voit sur la tranche,"], 30, SECTION_C)
        self.col(l2, 0.8, x)
        self.au_mot("La section, c'est la surface plate")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("qu'on voit sur la tranche")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        td = tranche_disque(0.85, u, P(4.0, -1.0))
        l3 = self.t("vue à plat.", 36, VERT_OK)
        self.col(l3, -0.4, x)
        self.au_mot("vue à plat")
        self.play(FadeIn(l3, scale=1.12), FadeIn(td, scale=0.8), run_time=0.7)
        self.attendre_voix()

    # ── 03 : le cylindre, en travers et dans la longueur ────────────────────
    def ecran_cylindre(self):
        self.ecran("03-le-cylindre")
        u = 0.95
        cy = bras(0.7, 2.0, u, P(-5.7, -1.9))
        self.au_mot("Naïma scanne un bras")
        tit = self.t("Un bras, c'est un cylindre", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), FadeIn(cy, shift=UP * 0.2), run_time=0.8)
        x = -2.4
        pl = plan_coupe(1.7, 1.4, u, P(-6.35, -0.9))
        l1 = self.bloc(["Elle coupe en travers,", "parallèlement à la base :"], 30, PLAN_C)
        self.col(l1, 2.0, x)
        self.au_mot("Elle coupe en travers")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pl, shift=DOWN * 0.3), run_time=0.6)
        self.au_mot("parallèlement à la base")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(cy.bas, color=PLAN_C, scale_factor=1.05),
                  run_time=0.5)
        d = cercle(0.8, u, P(4.3, 1.8), plein=True)
        l2 = self.t("la section est un disque.", 32, SECTION_C)
        self.col(l2, 0.9, x)
        self.au_mot("la section est un disque")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(d, scale=0.8), run_time=0.7)
        pv = plan_vertical(0.35, 2.1, u, cy.o + UP * u, op=0.25)
        r = Rectangle(width=1.4 * u, height=2.0 * u, fill_color=SECTION_C, fill_opacity=0.35,
                      stroke_color=SECTION_C, stroke_width=5).move_to(P(5.3, -1.7))
        l3 = self.bloc(["Si elle coupait dans la longueur,", "elle verrait un rectangle."], 30, WHITE)
        self.col(l3, -1.3, x)
        self.au_mot("Si elle coupait dans la longueur")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(pv), run_time=0.6)
        self.au_mot("elle verrait un rectangle")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(r, scale=0.8), run_time=0.7)
        self.attendre_voix()

    # ── 04 : à quoi ça sert — la force d'un muscle ──────────────────────────
    def ecran_muscle(self):
        self.ecran("04-le-muscle")
        self.au_mot("Et cette section sert à quelque chose")
        tit = self.t("À quoi ça sert ?", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        x = -1.6
        t1 = tranche_disque(0.85, 1.0, P(-4.6, 0.6))
        l1 = self.bloc(["La force d'un muscle dépend", "de l'aire de sa section,"], 30, MUSCLE_C)
        self.col(l1, 2.0, x)
        self.au_mot("La force d'un muscle dépend")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(t1, scale=0.85), run_time=0.7)
        self.au_mot("de l'aire de sa section")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(t1.muscle, color=MUSCLE_C, scale_factor=1.12),
                  run_time=0.6)
        l2 = self.t("pas de sa longueur.", 32, WHITE)
        self.col(l2, 1.0, x)
        self.au_mot("pas de sa longueur")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        t2 = tranche_disque(1.4, 1.0, P(-4.3, -1.9))
        l3 = self.bloc(["Deux fois plus large,", "ce n'est pas deux fois plus fort."], 32, ORANGE_Q)
        self.col(l3, -0.5, x)
        self.au_mot("Deux fois plus large")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(t2, scale=0.85), run_time=0.7)
        self.au_mot("ce n'est pas deux fois plus fort")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.8
        cy = bras(0.65, 1.8, u, P(-5.6, 0.6))
        pl = plan_coupe(1.6, 1.3, u, P(-6.35, 1.45))

        def avant_q(sc):
            sc.play(FadeIn(cy), FadeIn(pl), run_time=0.5)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un cylindre coupé", "parallèlement à sa base :"],
                             [self.choix("un disque"), self.choix("un rectangle"),
                              self.choix("un triangle")], 0,
                             ["Un disque,", "de la même taille", "que la base."],
                             -0.3, avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -1.5
        l1 = self.bloc(["La forme de la section dépend", "de l'orientation de la coupe."], 30, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("La forme de la section dépend")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("de l'orientation de la coupe")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.45)
        u = 0.75
        cy1 = bras(0.6, 1.7, u, P(-6.0, -2.6))
        pl1 = plan_coupe(1.5, 1.2, u, P(-6.65, -1.9))
        d = cercle(0.6, u, P(-3.4, -1.5), plein=True)
        l2 = self.ligne([("Le même cylindre :", WHITE), ("un disque en travers,", SECTION_C)], 30, buff=0.18)
        self.col(l2, 0.9, x)
        self.au_mot("Le même cylindre")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(cy1), FadeIn(pl1), run_time=0.7)
        self.au_mot("un disque en travers")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(d, scale=0.8), run_time=0.6)
        r = Rectangle(width=0.9 * u, height=1.7 * u, fill_color=SECTION_C, fill_opacity=0.35,
                      stroke_color=SECTION_C, stroke_width=5).move_to(P(-1.9, -1.5))
        l3 = self.t("et un rectangle dans la longueur.", 30, SECTION_C)
        self.col(l3, 0.0, x)
        self.au_mot("et un rectangle dans la longueur")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(r, scale=0.8), run_time=0.7)
        l4 = self.bloc(["Ce n'est pas le solide", "qui décide tout seul."], 32, VERT_OK)
        self.col(l4, -1.2, x)
        self.au_mot("Ce n'est pas le solide")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.55)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.8
        pv = pave(1.6, 1.2, 1.3, u, P(-5.8, 0.5))
        pl = plan_coupe(1.7, 1.3, u, P(-6.0, 1.4), op=0.28)

        def avant_q(sc):
            sc.play(FadeIn(pv), FadeIn(pl), run_time=0.5)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un pavé droit coupé", "parallèlement à une face :"],
                             [self.choix("un triangle"), self.choix("un rectangle"),
                              self.choix("un disque")], 1,
                             ["Un rectangle,", "identique à la face", "à laquelle la coupe est parallèle."],
                             -0.3, avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        x = 0.6
        l0 = self.t("Naïma scanne une cuisse.", 32, WHITE)
        self.col(l0, 2.0, x)
        t1 = tranche_disque(0.8, 1.0, P(-4.3, 0.9))
        self.au_mot("Naïma scanne une cuisse")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(t1, scale=0.85), run_time=0.7)
        # ⛔ Un morceau = un mot long OU un nombre : « rayon 4 cm » attendait « rayon », dit 1,2 s
        #    après le 4, et le 4 s'écrivait en retard (même piège à l'envers sur « rayon 6 cm »).
        l1 = self.ligne([("Section du muscle :", MUSCLE_C)], 30)
        self.col(l1, 1.2, x)
        self.au_mot("La section du muscle est un disque")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        l1b = self.ligne([("4 cm", BASE_C), ("de rayon.", BASE_C)], 30, buff=0.16)
        self.col(l1b, 0.4, x)
        r1 = Line(t1.muscle.get_center(), t1.muscle.get_right(), color=BASE_C, stroke_width=6)
        self.au_mot("4 centimètres")
        self.play(FadeIn(l1b[0], shift=UP * 0.1), Create(r1), run_time=0.4)
        self.au_mot("de rayon")
        self.play(FadeIn(l1b[1], shift=UP * 0.1), run_time=0.3)
        t2 = tranche_disque(1.2, 1.0, P(-4.0, -1.9))
        l2 = self.ligne([("Chez un sportif :", WHITE)], 30)
        self.col(l2, -0.5, x)
        self.au_mot("Chez un sportif")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(t2, scale=0.85), run_time=0.7)
        l2b = self.ligne([("le rayon est", WHITE), ("6 cm.", BASE_C)], 30, buff=0.16)
        self.col(l2b, -1.3, x)
        r2 = Line(t2.muscle.get_center(), t2.muscle.get_right(), color=BASE_C, stroke_width=6)
        self.au_mot("le rayon est")
        self.play(FadeIn(l2b[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("6 centimètres")
        self.play(FadeIn(l2b[1], shift=UP * 0.1), Create(r2), run_time=0.4)
        l3 = self.bloc(["De combien l'aire de la section", "est-elle multipliée ?"], 32, JAUNE_TITRE)
        self.col(l3, -2.2, x)
        self.au_mot("De combien l'aire de la section")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.55)
        self.pause_defi(y=-3.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        t1 = tranche_disque(0.6, 1.0, P(-5.3, 1.3))
        t2 = tranche_disque(0.9, 1.0, P(-5.0, -1.3))
        self.add(t1, t2)
        x = -3.1
        l1 = self.ligne([("Première section :", SECTION_C), ("π × 4", BLEU_D), ("× 4", BLEU_D),
                         ("= 16π", VERT_OK)], 30, buff=0.16)
        self.col(l1, 2.1, x)
        self.au_mot("Première section")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("pi fois 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.28)
        self.au_mot("fois 4,")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("16 pi")
        self.play(FadeIn(l1[3], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Deuxième :", SECTION_C), ("π × 6", BLEU_D), ("× 6", BLEU_D),
                         ("= 36π", VERT_OK)], 30, buff=0.16)
        self.col(l2, 1.2, x)
        self.au_mot("Deuxième")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("pi fois 6")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.28)
        self.au_mot("fois 6,")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.28)
        self.au_mot("36 pi")
        self.play(FadeIn(l2[3], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("36", BLEU_D), ("÷ 16", BLEU_D), ("= 2,25", VERT_OK)], 34, buff=0.18)
        self.col(l3, 0.2, x)
        # (pas d'au_mot : le gabarit attend tout seul le SECOND « 36 », celui de « 36 divisé par 16 »)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("par 16")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 2,25")
        self.play(FadeIn(l3[2], scale=1.2), run_time=0.45)
        l4 = self.ligne([("L'aire est multipliée par", JAUNE_TITRE), ("2,25", VERT_OK)], 30, buff=0.16)
        self.col(l4, -0.9, x)
        self.au_mot("L'aire est multipliée")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(l4[1], scale=1.15), run_time=0.3)
        l5 = self.ligne([("alors que le rayon", WHITE), ("× 1,5", ORANGE_Q)], 30, buff=0.16)
        self.col(l5, -1.9, x)
        self.au_mot("alors que le rayon")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("par 1,5")
        self.play(FadeIn(l5[1], scale=1.15), run_time=0.35)
        self.insister(l5[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(bras(0.55, 1.5, 0.8, ORIGIN), tranche_disque(0.6, 0.8, P(1.6, 0.5)))
        lignes = self.finale_gauche(fig, textes=[
            ("La section est la surface plane", "obtenue en coupant un solide."),
            ("Sa forme dépend de", "l'orientation de la coupe."),
            ("Une coupe parallèle à la base", "garde la forme de la base.")], fs=28)
        self.add(fig)
        self.au_mot("La section est la surface plane")
        self.montrer_ligne(lignes[0], Indicate(fig, color=SECTION_C, scale_factor=1.05))
        self.au_mot("Sa forme dépend")
        self.montrer_ligne(lignes[1])
        self.au_mot("Une coupe parallèle à la base")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_definition()
        self.ecran_cylindre()
        self.ecran_muscle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
