# 3e_section_cone_pyramide.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T5 : LA SECTION D'UN CÔNE
# ET D'UNE PYRAMIDE (micro 3e section_cone_pyramide, notion sections_solides), AVEC VOIX.
# 16:9, CEINTURE VERTE.
# Décor et métier : Jade, VOLCANOLOGUE — le Piton de la Fournaise coupé en deux
# (centres nature-ecologie, sciences). ⚠️ C'est la SEULE vidéo de la série qui parle de La Réunion.
# Mapping micro → écrans : 02 (une coupe parallèle à la base donne un disque plus petit),
# 03 (ce disque est une réduction exacte : à mi-hauteur, le rayon est la moitié),
# 04 (pour une pyramide, la section a la forme de la base), 06 (piège : sans « parallèle », la
# section devient un ovale), questions 05 (A : un disque plus petit) et 07 (B : un carré plus petit),
# défi 08 (cône 1 000 m / 500 m : à 300 m d'altitude, rapport 0,4 → rayon 400 m).
# Voix : manim/voix/3e-section-cone-pyramide.json ; marques : 3e_section_cone_pyramide_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_section_cone_pyramide.py SectionConePyramide3e
# Sortie : manim/sorties/3e/maths/sections/35-section-cone-pyramide/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import cone, pyramide, jade, Paysage3e  # noqa: E402

ROCHE_C, ROCHE_D, ROCHE_B = "#7f1d1d", "#b91c1c", "#450a0a"
LAVE_C = "#f97316"
PLAN_C = "#facc15"
SECTION_C = "#22d3ee"


def volcan(r, haut, u, o=ORIGIN, sw=4):
    """Le Piton de la Fournaise : un cône de roche, son cratère et un filet de lave.
    Attributs : ceux de cone(), plus .cratere"""
    c = cone(r, haut, u, o, corps=ROCHE_C, disque=ROCHE_D, bord=ROCHE_B, sw=sw)
    cr = Ellipse(width=0.42 * r * u, height=0.42 * r * u * 0.32, fill_color="#1c1917",
                 fill_opacity=1, stroke_color=LAVE_C, stroke_width=sw).move_to(c.S)
    c.add(cr)
    c.cratere = cr
    return c


def section_cone(c, k, couleur=SECTION_C, op=0.5, sw=4):
    """La section d'un cône à la fraction k de sa HAUTEUR : une ellipse de rayon (1 − k) × r.
    Attributs : .rk (le rayon réel, en unités de la figure) .centre"""
    rk = (1 - k) * c.r * c.u
    centre = c.o + UP * k * c.haut * c.u
    e = Ellipse(width=2 * rk, height=2 * rk * 0.32, fill_color=couleur, fill_opacity=op,
                stroke_color=couleur, stroke_width=sw).move_to(centre)
    e.rk, e.centre_s = rk, centre
    return e


def plan_horizontal(l, u, o=ORIGIN, couleur=PLAN_C, op=0.28, sw=3):
    """Le plan de coupe horizontal, en cavalière, centré sur o."""
    q = lambda x, y: point3(o + P(-l * u / 2, 0), u, x, y, 0)  # noqa: E731
    return Polygon(q(0, -l * 0.35), q(l, -l * 0.35), q(l, l * 0.35), q(0, l * 0.35),
                   fill_color=couleur, fill_opacity=op, stroke_color=couleur, stroke_width=sw)


def disque_plat(r, o=ORIGIN, sw=5, couleur=SECTION_C):
    d = Circle(radius=r, fill_color=couleur, fill_opacity=0.35, stroke_color=couleur,
               stroke_width=sw).move_to(o)
    d.centre, d.r = o, r
    return d


class SectionConePyramide3e(Paysage3e):
    nom_voix = "3e-section-cone-pyramide"
    fichier_marques = "3e_section_cone_pyramide_marques.json"
    ceinture = "verte"

    def _carte(self, lettre, contenu, fs):
        """⛔ Le gabarit étire le contenu jusqu'à 0,8 du bord de la carte, or le ✓ de la bonne
        réponse se pose à 0,38 du bord DROIT : sur un libellé long, il TOUCHAIT la dernière
        lettre (vu sur la planche ; BORDS=1 ne voit rien, rien ne sort du cadre). On lui
        réserve sa place ici, sans toucher au gabarit partagé. Les libellés courts, eux, ne
        bougent pas : la condition ne les atteint jamais."""
        g = super()._carte(lettre, contenu, fs)
        cadre, ligne = g
        if ligne.width > self.LARG - 1.2:
            ligne.scale_to_fit_width(self.LARG - 1.2)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return g

    def pause_gauche(self, y=-3.2, x=-6.2, marge=2.0):
        """« Mets pause, et cherche ! » en bas À GAUCHE.
        ⛔ Dans la colonne de droite (pause_defi du commun), le « ! » touche Ti-Margo : constaté
        sur les planches de T1, T2, T3 et T4. La mascotte occupe x > 4,6 et y < −2,2."""
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        self.col(p, y, x)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La section d'un cône", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("La section d'un cône")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que voit-on", "dans la coupe ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        v = volcan(1.3, 1.9, 0.9, P(3.6, -1.6))
        self.au_mot("Que voit-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(v, scale=0.85), run_time=0.5)
        s = section_cone(v, 0.45)
        self.au_mot("dans la coupe")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(s, shift=DOWN * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = jade(1.0).move_to(P(-5.2, 0.5))
        self.au_mot("Voici Jade")
        nom = self.t("Jade", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("volcanologue")
        met = self.t("volcanologue", 24, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("La Réunion")
        lieu = self.t("à La Réunion", 24, VERT_OK).next_to(met, DOWN, buff=0.15)
        self.play(FadeIn(lieu, shift=DOWN * 0.1), run_time=0.4)
        x = -3.0
        v = volcan(1.5, 2.0, 0.95, P(3.3, -1.8))
        l1 = self.t("Le Piton de la Fournaise,", 32, ROCHE_D)
        self.col(l1, 2.1, x)
        self.au_mot("le Piton")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(v, scale=0.85), run_time=0.8)
        coupe = DashedLine(v.o + P(-1.5 * 0.95, 0), v.S, color=PLAN_C, stroke_width=5,
                           dash_length=0.12)
        l2 = self.t("coupé en deux.", 32, PLAN_C)
        self.col(l2, 1.2, x)
        self.au_mot("coupé en deux")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(coupe), run_time=0.8)
        l3 = self.t("Un volcan, c'est à peu près un cône.", 30, WHITE)
        self.col(l3, 0.2, x)
        self.au_mot("Un volcan")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.5)
        l4 = self.bloc(["ses sections racontent", "son histoire."], 32, JAUNE_TITRE)
        self.col(l4, -1.0, x)
        self.au_mot("ses sections racontent")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.play(FadeIn(l4[1], scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 02 : la coupe parallèle à la base ───────────────────────────────────
    def ecran_parallele(self):
        self.ecran("02-parallele")
        u = 1.0
        c = cone(1.5, 2.4, u, P(-4.3, -1.9))
        self.add(c)
        tit = hors_audit(self.t("Parallèlement à la base", 42, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        # ⛔ Colonne à −2,4 et figures à x = 4,9 : à −1,3 les lignes venaient mordre sur le
        #    disque de droite (vu sur la planche, BORDS=1 ne voit pas ça).
        x = -2.4
        pl = plan_horizontal(3.4, u, c.o + UP * 0.9 * u)
        l1 = self.t("Coupe un cône parallèlement", 30, PLAN_C)
        self.col(l1, 2.0, x)
        self.au_mot("coupe un cône parallèlement")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pl, shift=DOWN * 0.3), run_time=0.7)
        s = section_cone(c, 0.375)
        d = disque_plat(0.85, P(4.9, 1.6))
        l2 = self.t("la section est un disque,", 32, SECTION_C)
        self.col(l2, 1.1, x)
        self.au_mot("la section est un disque")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(s), FadeIn(d, scale=0.8), run_time=0.9)
        # ⛔ En y = −1,3 le grand disque descendait à −2,5 et RECOUVRAIT Ti-Margo
        #    (x > 4,6 et y < −2,2) : les deux disques remontent ensemble.
        gd = disque_plat(1.2, P(4.8, -0.85), couleur=BASE_C)
        l3 = self.t("plus petit que la base.", 30, WHITE)
        self.col(l3, 0.2, x)
        self.au_mot("plus petit que la base")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(gd, scale=0.8), run_time=0.8)
        hauts = VGroup(*[section_cone(c, k, op=0.35) for k in (0.55, 0.72, 0.86)])
        l4 = self.bloc(["Plus on monte,", "plus le disque rétrécit."], 32, VERT_OK)
        self.col(l4, -1.1, x)
        self.au_mot("Plus on monte")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("plus le disque rétrécit")
        self.play(FadeIn(l4[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(e, scale=0.8) for e in hauts], lag_ratio=0.25), run_time=1.0)
        self.attendre_voix()

    # ── 03 : la réduction exacte ────────────────────────────────────────────
    def ecran_la_reduction(self):
        self.ecran("03-la-reduction")
        u = 1.05
        c = cone(1.5, 2.4, u, P(-4.0, -2.0))
        self.add(c, c.rayon_trait)
        tit = hors_audit(self.t("Une réduction exacte", 42, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        x = -1.0
        l1 = self.t("une réduction exacte de la base.", 30, VERT_OK)
        self.col(l1, 2.0, x)
        self.au_mot("une réduction exacte")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        s1 = section_cone(c, 0.5)
        l2 = self.t("À mi-hauteur :", 32, PLAN_C)
        self.col(l2, 1.1, x)
        self.au_mot("À mi-hauteur")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(s1), FadeIn(c.hh), run_time=0.8)
        r1 = Line(s1.centre_s, s1.centre_s + P(s1.rk, 0)).set_stroke(SECTION_C, 7)
        l3 = self.t("son rayon est la moitié", 30, SECTION_C)
        self.col(l3, 0.2, x)
        self.au_mot("son rayon est la moitié")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(r1), run_time=0.7)
        l4 = self.t("du rayon de la base.", 30, BASE_C)
        self.col(l4, -0.6, x)
        self.au_mot("du rayon de la base")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(c.rayon_trait, color=BASE_C,
                                                       scale_factor=1.08), run_time=0.7)
        s2 = section_cone(c, 0.75, couleur=ORANGE_Q)
        l5 = self.t("Aux trois quarts de la hauteur,", 30, ORANGE_Q)
        self.col(l5, -1.5, x)
        self.au_mot("Aux trois quarts")
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(s2), run_time=0.8)
        l6 = self.t("il n'en reste qu'un quart.", 32, JAUNE_TITRE)
        self.col(l6, -2.4, x)
        self.au_mot("reste qu'un quart")
        self.play(FadeIn(l6, scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 04 : la pyramide ────────────────────────────────────────────────────
    def ecran_la_pyramide(self):
        self.ecran("04-la-pyramide")
        u = 1.0
        # ⛔ Le plan jaune de la pyramide avançait jusqu'à x = −2,1 et « en plus petit. »
        #    commence en −2,4 : la figure recule à gauche.
        py = pyramide(2.0, 2.3, u, P(-6.1, -1.9))
        tit = hors_audit(self.t("Et la pyramide ?", 42, JAUNE_TITRE)).move_to(P(0, 3.15))
        x = -2.4
        l1 = self.t("Pour une pyramide, c'est pareil :", 30, WHITE)
        self.col(l1, 2.0, x)
        # ⛔ « Pour » est le PREMIER mot de la voix : un Write de titre avant l'au_mot met déjà
        #    l'écran en RETARD. Le titre part dans le même play que la première ligne.
        self.au_mot("Pour une pyramide")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), FadeIn(py, scale=0.85), run_time=0.8)
        pl = plan_horizontal(3.0, u, py.H + UP * 1.0 * u)
        l2 = self.t("une coupe parallèle à la base", 30, PLAN_C)
        self.col(l2, 1.1, x)
        self.au_mot("une coupe parallèle")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pl, shift=DOWN * 0.3), run_time=0.8)
        car = Square(1.1, fill_color=SECTION_C, fill_opacity=0.35, stroke_color=SECTION_C,
                     stroke_width=5).move_to(P(4.9, 1.2))
        l3 = self.t("donne la même forme que la base,", 30, SECTION_C)
        self.col(l3, 0.2, x)
        self.au_mot("donne la même forme")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(car, scale=0.8), run_time=0.8)
        gcar = Square(1.6, fill_color=BASE_C, fill_opacity=0.3, stroke_color=BASE_C,
                      stroke_width=5).move_to(P(5.4, -1.0))  # ⛔ en (4,7 ; −1,4) il couvrait
        # Ti-Margo ET « Base carrée, section carrée. » (y = −1,8).
        l4 = self.t("en plus petit.", 32, WHITE)
        self.col(l4, -0.7, x)
        self.au_mot("en plus petit")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(gcar, scale=0.8), run_time=0.8)
        l5 = self.t("Base carrée, section carrée.", 34, VERT_OK)
        self.col(l5, -1.8, x)
        self.au_mot("Base carrée")
        self.play(FadeIn(l5, scale=1.1), run_time=0.5)
        self.insister(l5, 1.05, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = cone(1.1, 1.8, 0.8, P(-5.0, 0.1))
        pl = plan_horizontal(2.6, 0.8, c.o + UP * 0.7 * 0.8)
        s = section_cone(c, 0.39)

        def avant_q(sc):
            sc.play(FadeIn(c), FadeIn(pl), FadeIn(s), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["On coupe un cône", "parallèlement à sa base.", "La section est…"],
                             [self.choix("un disque plus petit"), self.choix("un rectangle"),
                              self.choix("un triangle")], 0,
                             ["Un disque plus petit,", "une réduction de la base.",
                              "Le triangle : une coupe verticale."],
                             -0.3,
                             mot_q="On coupe un cône", avant_q=avant_q)

    # ── 06 : le piège du mot « parallèle » ──────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.95
        c = cone(1.3, 2.1, u, P(-4.6, -1.9))
        self.add(c)
        x = -1.9
        oblique = Polygon(c.o + P(-1.5 * u, 0.55 * u), c.o + P(1.5 * u, 1.45 * u),
                          c.o + P(1.5 * u, 1.75 * u), c.o + P(-1.5 * u, 0.85 * u),
                          fill_color=PLAN_C, fill_opacity=0.3, stroke_color=PLAN_C, stroke_width=3)
        l1 = self.bloc(["Si la coupe n'est pas", "parallèle à la base,"], 32, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Si la coupe n'est pas")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(oblique, shift=DOWN * 0.2), run_time=0.8)
        self.au_mot("parallèle à la base")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.45)
        l2 = self.bloc(["la section n'est plus", "une réduction :"], 32, ROUGE_ERREUR)
        self.col(l2, 0.9, x)
        self.au_mot("la section n'est plus")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.55)
        ov = Ellipse(width=2.4, height=1.3, fill_color=ROUGE_ERREUR, fill_opacity=0.3,
                     stroke_color=ROUGE_ERREUR, stroke_width=5).rotate(0.25).move_to(P(-4.3, 1.9))
        l3 = self.t("elle devient un ovale.", 32, ROUGE_ERREUR)
        self.col(l3, -0.2, x)
        self.au_mot("un cône, elle devient")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ov, scale=0.8), run_time=0.8)
        l4 = self.ligne([("Le mot « parallèle »", JAUNE_TITRE), ("n'est pas décoratif.", JAUNE_TITRE)],
                        32, buff=0.18)
        self.col(l4, -1.4, x)
        self.au_mot("Le mot")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("décoratif")
        self.play(FadeIn(l4[1], scale=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        py = pyramide(1.6, 1.8, 0.8, P(-6.0, 0.1))
        pl = plan_horizontal(2.4, 0.8, py.H + UP * 0.8 * 0.8)

        def avant_q(sc):
            sc.play(FadeIn(py), FadeIn(pl), run_time=0.45)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une pyramide à base carrée,", "coupée parallèlement à sa base.",
                              "La section est…"],
                             [self.choix("un triangle"), self.choix("un carré plus petit"),
                              self.choix("un disque")], 1,
                             ["Un carré plus petit :", "la section a la forme", "de la base."],
                             -0.3,
                             mot_q="On coupe une pyramide", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.0
        v = volcan(1.6, 2.4, u, P(-4.0, -2.2))
        x = 0.7
        l0 = self.t("Jade modélise un cône :", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Jade modélise")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(v, scale=0.85), run_time=0.8)
        l1 = self.ligne([("1 000 m", BASE_C), ("de rayon à la base,", BASE_C)], 30, buff=0.16)
        hors_audit(l1[0])
        self.col(l1, 1.1, x)
        self.au_mot("1 000")
        self.play(FadeIn(l1[0], scale=1.1), FadeIn(v.rayon_trait), run_time=0.45)
        self.au_mot("de rayon à la base")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("500 m", HAUTEUR_C), ("de haut.", HAUTEUR_C)], 30, buff=0.16)
        self.col(l2, 0.3, x)
        self.au_mot("500 mètres")
        self.play(FadeIn(l2[0], scale=1.1), FadeIn(v.hh), run_time=0.45)
        self.au_mot("de haut")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        s = section_cone(v, 0.6, couleur=PLAN_C)
        l3 = self.t("Le rayon de la section", 32, JAUNE_TITRE)
        self.col(l3, -0.7, x)
        self.au_mot("Quel est le rayon")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(s), run_time=0.8)
        l4 = self.ligne([("à", JAUNE_TITRE), ("300 m", PLAN_C), ("d'altitude ?", JAUNE_TITRE)],
                        32, buff=0.16)
        self.col(l4, -1.6, x)
        self.au_mot("300 mètres")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(l4[1], scale=1.1), run_time=0.45)
        self.au_mot("d'altitude")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.35)
        self.pause_gauche()

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 0.95
        v = volcan(1.6, 2.4, u, P(-4.3, -2.2))
        s = section_cone(v, 0.6, couleur=PLAN_C)
        self.add(v, s)
        x = -1.7
        l1 = self.ligne([("À 300", BASE_C), ("sur 500 :", HAUTEUR_C)], 32, buff=0.18)
        self.col(l1, 2.0, x)
        self.au_mot("À 300")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("sur 500")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("il reste", WHITE), ("200 m", VERT_OK), ("jusqu'au sommet.", WHITE)],
                        30, buff=0.16)
        self.col(l2, 1.1, x)
        self.au_mot("il reste")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("200 mètres")
        self.play(FadeIn(l2[1], scale=1.1), run_time=0.35)
        self.au_mot("jusqu'au sommet")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("200 ÷ 500", BLEU_D), ("= 0,4", VERT_OK)], 36, buff=0.2)
        self.col(l3, 0.2, x)
        self.au_mot("200 divisé par 500")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,4 de la hauteur")
        self.play(FadeIn(l3[1], scale=1.15), run_time=0.4)
        l4 = self.ligne([("Le rapport :", WHITE), ("0,4", ORANGE_Q)], 32, buff=0.18)
        self.col(l4, -0.7, x)
        self.au_mot("Le rapport de réduction")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("est 0,4")
        self.play(FadeIn(l4[1], scale=1.15), run_time=0.35)
        l5 = self.ligne([("0,4 ×", BLEU_D), ("1 000", BLEU_D), ("= 400 m", VERT_OK)], 36, buff=0.18)
        hors_audit(l5[1])
        self.col(l5, -1.7, x)
        self.au_mot("0,4 fois")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1 000,")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("400 mètres")
        self.play(FadeIn(l5[2], scale=1.2), run_time=0.5)
        self.insister(l5[2], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = cone(1.0, 1.6, 0.85, P(-1.0, -1.0))
        fig = VGroup(c, section_cone(c, 0.5), pyramide(1.0, 1.2, 0.75, P(1.4, -1.0)))
        fig.scale(0.7)  # ⛔ finale_gauche centre la figure en x = −4,6 : au-delà de 3,8 de large, elle déborde
        lignes = self.finale_gauche(fig, textes=[
            ("Une section parallèle à la base", "d'un cône est un disque plus petit."),
            ("Pour une pyramide, c'est la forme", "de la base en plus petit."),
            ("Ce petit solide est", "une réduction du grand.")], fs=28)
        self.add(fig)
        self.au_mot("Une section parallèle")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour une pyramide")
        self.montrer_ligne(lignes[1])
        self.au_mot("ce petit solide")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_parallele()
        self.ecran_la_reduction()
        self.ecran_la_pyramide()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
