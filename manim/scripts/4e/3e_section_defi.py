# 3e_section_defi.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T8 : DÉFIS SUR LES
# SECTIONS (micro 3e section_defi, notion sections_solides), AVEC VOIX. 16:9, CEINTURE MARRON.
# C'est le DERNIER défi de la série 3e : reconnaître un solide à la suite de ses sections.
# Décor et métier : Nathan, TECHNICIEN EN NUMÉRISATION 3D — scanner un objet pour l'imprimer
# (centres technologie-ia, jeux-video).
# Mapping micro → écrans : 02 (des disques égaux empilés : un cylindre), 03 (des disques qui
# rétrécissent vers un point : un cône ; des carrés : une pyramide), 04 (une boule : les disques
# grandissent puis rétrécissent), 06 (piège : une SEULE section ne suffit jamais),
# questions 05 (A : un cône) et 07 (C : grandissent puis rétrécissent),
# défi 08 (carrés 10 → 5 → point, hauteur 12 : une pyramide de 400 cm³).
# Voix : manim/voix/3e-section-defi.json ; marques : 3e_section_defi_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_section_defi.py SectionDefi3e
# Sortie : manim/sorties/3e/maths/sections/38-section-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import point3, nathan, Paysage3e  # noqa: E402

SECTION_C = "#22d3ee"
SCAN_C = "#a78bfa"
CYL_C = "#38bdf8"
CONE_C = "#fb923c"
BOULE_C = "#f472b6"
PYR_C = "#c084fc"


def pile_disques(rayons, u, o=ORIGIN, pas=0.3, couleur=SECTION_C, sw=3, op=0.35):
    """Des sections EMPILÉES, du bas vers le haut : des ellipses des rayons donnés.
    Un rayon nul devient un point. Attributs : .sections"""
    g = VGroup()
    for k, r in enumerate(rayons):
        c = o + UP * k * pas * u
        if r <= 0.03:
            g.add(Dot(c, radius=0.07, color=couleur))
        else:
            g.add(Ellipse(width=2 * r * u, height=2 * r * u * 0.32, fill_color=couleur,
                          fill_opacity=op, stroke_color=couleur, stroke_width=sw).move_to(c))
    g.sections = g.submobjects
    return g


def carre_cavaliere(c, u, o=ORIGIN, couleur=PYR_C, sw=3, op=0.35):
    """Un carré de côté c vu en cavalière, CENTRÉ sur o."""
    coin = o + P(-(c + c * 0.41) * u / 2, -(c * 0.29) * u / 2)
    q = lambda x, y: point3(coin, u, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(c, 0), q(c, c), q(0, c), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw)


def pile_carres(cotes, u, o=ORIGIN, pas=0.34, couleur=PYR_C, sw=3):
    """Des sections carrées empilées, du bas vers le haut."""
    g = VGroup()
    for k, c in enumerate(cotes):
        p_ = o + UP * k * pas * u
        if c <= 0.05:
            g.add(Dot(p_, radius=0.07, color=couleur))
        else:
            g.add(carre_cavaliere(c, u, p_, couleur, sw))
    g.sections = g.submobjects
    return g


def scanner(s=1.0, o=ORIGIN, sw=4):
    """Le scanner 3D : un boîtier, son anneau, et le faisceau."""
    boite = RoundedRectangle(width=2.2 * s, height=1.5 * s, corner_radius=0.12,
                             fill_color="#0f172a", fill_opacity=1, stroke_color="#475569",
                             stroke_width=sw).move_to(o)
    anneau = Ellipse(width=1.5 * s, height=0.5 * s, stroke_color=SCAN_C, stroke_width=sw + 2,
                     fill_opacity=0).move_to(o)
    g = VGroup(boite, anneau)
    g.boite, g.anneau = boite, anneau
    return g


class SectionDefi3e(Paysage3e):
    nom_voix = "3e-section-defi"
    fichier_marques = "3e_section_defi_marques.json"
    ceinture = "marron"

    def _carte_choix(self, lettre, txt, largeur, fs):
        """⛔ La carte d'un choix, avec la PLACE DE LA COCHE au bout. Le gabarit étire le
        contenu jusqu'à 0,4 du bord, or le ✓ de la bonne réponse se pose dans la carte, à
        0,4 du bord DROIT : sur un libellé long il touchait la dernière lettre (vu sur la
        planche ; BORDS=1 ne voit rien, rien ne sort du cadre). Même remède qu'en CM2
        (`cm2/aire_comprendre.py`). Les libellés courts, eux, ne bougent pas.
        ⚠️ En paysage la carte vient de `_carte_choix` (stmg), PAS de `_carte` : surcharger
        `_carte` ne fait rien du tout, et ça ne se voit qu'à l'image."""
        c = super()._carte_choix(lettre, txt, largeur, fs)
        cadre, ligne = c
        if ligne.width > largeur - 1.0:
            ligne.scale_to_fit_width(largeur - 1.0).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return c

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
        titre, ident, ech = self.garde("Défis sur les sections", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Défis sur les sections")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Peut-on reconnaître un solide", "à ses tranches ?"], 36)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pl = pile_disques([0.9, 0.78, 0.62, 0.42, 0.0], 1.0, P(3.9, -1.4), pas=0.45)
        self.au_mot("Peut-on reconnaître")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.5)
        self.au_mot("à ses tranches")
        self.play(FadeIn(q[1], shift=UP * 0.2),
                  LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pl], lag_ratio=0.15), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = nathan(1.0).move_to(P(-5.3, 0.5))
        self.au_mot("Voici Nathan")
        nom = self.t("Nathan", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("numérise des objets")
        # ⛔ « numérisation 3D » porte un 3 que la voix ne dit qu'à « en 3D », une seconde plus
        #    tard : sans hors_audit, toute la suite de l'écran partait 1,4 s en retard.
        met = hors_audit(self.t("numérisation 3D", 22, BLEU_CALCUL)).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -3.0
        sc = scanner(1.0, P(3.9, 2.3))
        l1 = self.t("pour les imprimer en 3D.", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("pour les imprimer")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(sc, scale=0.85), run_time=0.8)
        l2 = self.bloc(["Son scanner ne voit pas", "le solide entier :"], 30, ROUGE_ERREUR)
        self.col(l2, 1.1, x)
        self.au_mot("Son scanner ne voit pas")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.55)
        pl = pile_disques([0.75, 0.68, 0.58, 0.44, 0.26], 1.0, P(3.9, -2.3), pas=0.5,
                          couleur=SCAN_C)
        l3 = self.t("des centaines de sections", 32, SCAN_C)
        self.col(l3, 0.2, x)
        self.au_mot("des centaines de sections")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pl], lag_ratio=0.12), run_time=1.0)
        l4 = self.t("l'une au-dessus de l'autre.", 30, SCAN_C)
        self.col(l4, -0.6, x)
        self.au_mot("l'une au-dessus")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        l5 = self.bloc(["L'ordinateur reconstruit", "le solide."], 32, JAUNE_TITRE)
        self.col(l5, -1.8, x)
        self.au_mot("L'ordinateur reconstruit")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.55)
        self.attendre_voix()

    # ── 02 : des disques égaux → un cylindre ────────────────────────────────
    def ecran_le_cylindre(self):
        self.ecran("02-le-cylindre")
        tit = hors_audit(self.t("Des disques égaux", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        # ⛔ La colonne de texte et la figure de droite doivent s'écarter : à l'ancienne
        #    position, les lignes mordaient sur la figure (vu sur la planche ; BORDS=1
        #    ne voit pas un chevauchement, il ne sort pas du cadre).
        x = -2.6
        l1 = self.t("Si toutes les sections sont", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Si toutes les sections")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.8)
        pl = pile_disques([0.8] * 6, 1.0, P(-4.2, -1.9), pas=0.52, couleur=CYL_C)
        l2 = self.t("des disques de même rayon,", 30, CYL_C)
        self.col(l2, 1.1, x)
        self.au_mot("des disques de même rayon")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pl], lag_ratio=0.12), run_time=1.1)
        l3 = self.t("empilés,", 32, CYL_C)
        self.col(l3, 0.3, x)
        self.au_mot("empilés")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        cy = cylindre(0.8, 2.6, 1.0, P(4.6, -1.9), corps=CYL_C, dessus="#7dd3fc", bord="#0c4a6e")
        l4 = self.t("le solide est un cylindre.", 34, VERT_OK)
        self.col(l4, -0.6, x)
        self.au_mot("le solide est un cylindre")
        self.play(FadeIn(l4, scale=1.08), FadeIn(cy, scale=0.85), run_time=0.9)
        l5 = self.t("Rien d'autre ne donne ça.", 32, JAUNE_TITRE)
        self.col(l5, -1.7, x)
        self.au_mot("Rien d'autre")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix()

    # ── 03 : des disques qui rétrécissent → un cône ─────────────────────────
    def ecran_le_cone(self):
        self.ecran("03-le-cone")
        tit = hors_audit(self.t("Vers un point", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        x = -1.6
        pl = pile_disques([0.85, 0.68, 0.51, 0.34, 0.17, 0.0], 1.0, P(-5.2, -2.2), pas=0.5,
                          couleur=CONE_C)
        l1 = self.t("Si les disques rétrécissent", 30, CONE_C)
        self.col(l1, 2.0, x)
        self.au_mot("Si les disques rétrécissent")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pl], lag_ratio=0.12), run_time=1.2)
        l2 = self.t("du bas vers un point en haut,", 30, WHITE)
        self.col(l2, 1.1, x)
        self.au_mot("vers un point en haut")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        co = cone(0.85, 2.5, 1.0, P(-3.4, -2.2))
        l3 = self.t("c'est un cône.", 34, VERT_OK)
        self.col(l3, 0.2, x)
        self.au_mot("c'est un cône")
        self.play(FadeIn(l3, scale=1.08), FadeIn(co, scale=0.85), run_time=0.9)
        pc = pile_carres([0.9, 0.72, 0.54, 0.36, 0.0], 1.0, P(4.9, -2.0), pas=0.55)
        l4 = self.t("Et si c'est un carré,", 30, PYR_C)
        self.col(l4, -0.9, x)
        self.au_mot("un carré qui rétrécit")
        self.play(FadeIn(l4, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pc], lag_ratio=0.12), run_time=1.1)
        l5 = self.t("c'est une pyramide.", 34, VERT_OK)
        self.col(l5, -2.0, x)
        self.au_mot("c'est une pyramide")
        self.play(FadeIn(l5, scale=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 04 : la boule ───────────────────────────────────────────────────────
    def ecran_la_boule(self):
        self.ecran("04-la-boule")
        tit = hors_audit(self.t("Et la boule ?", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        x = -1.2
        l1 = self.t("Pour une boule,", 32, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Pour une boule")
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        rayons = [0.0, 0.42, 0.66, 0.8, 0.85, 0.8, 0.66, 0.42, 0.0]
        pl = pile_disques(rayons, 1.0, P(-4.3, -2.6), pas=0.44, couleur=BOULE_C)
        l2 = self.t("les disques grandissent,", 30, BOULE_C)
        self.col(l2, 1.1, x)
        self.au_mot("les disques grandissent")
        self.play(FadeIn(l2, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(pl[k], scale=0.8) for k in range(5)], lag_ratio=0.15),
                  run_time=1.0)
        l3 = self.t("puis rétrécissent :", 30, BOULE_C)
        self.col(l3, 0.3, x)
        self.au_mot("puis rétrécissent")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(pl[k], scale=0.8) for k in range(5, 9)], lag_ratio=0.15),
                  run_time=1.0)
        l4 = self.t("le plus grand est au milieu,", 30, VERT_OK)
        self.col(l4, -0.6, x)
        self.au_mot("le plus grand est au milieu")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(pl[4], color=VERT_OK, scale_factor=1.2),
                  run_time=0.8)
        l5 = self.t("à l'équateur.", 32, VERT_OK)
        self.col(l5, -1.4, x)
        self.au_mot("à l'équateur")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.4)
        l6 = self.t("La signature de la sphère.", 34, JAUNE_TITRE)
        self.col(l6, -2.4, x)
        self.au_mot("la signature")
        self.play(FadeIn(l6, scale=1.08), run_time=0.55)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        # ⛔ La phrase de réponse se pose en bas à gauche (y = −0,3) : à −0,9 la pile lui
        #    passait au travers (vu sur la planche). Elle monte au-dessus de la phrase.
        pl = pile_disques([0.8, 0.62, 0.44, 0.26, 0.0], 0.85, P(-5.0, 0.6), pas=0.52,
                          couleur=CONE_C)

        def avant_q(sc):
            sc.play(LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pl], lag_ratio=0.12),
                    run_time=0.9)

        self.question_gauche("05-question", "05b-reponse",
                             ["Des disques : le plus grand en bas,", "jusqu'à un point en haut.",
                              "Quel solide ?"],
                             [self.choix("un cône"), self.choix("une boule"),
                              self.choix("un cylindre")], 0,
                             ["Un cône.", "Pour une boule, le plus grand",
                              "serait au milieu, pas en bas."],
                             -0.3,
                             mot_q="Les sections horizontales", avant_q=avant_q)

    # ── 06 : le piège d'une seule section ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        x = -0.9
        l1 = self.bloc(["Une seule section", "ne suffit jamais."], 34, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Une seule section")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.6)
        d = Ellipse(width=1.7, height=0.55, fill_color=SECTION_C, fill_opacity=0.35,
                    stroke_color=SECTION_C, stroke_width=5).move_to(P(-4.3, 1.8))
        l2 = self.t("Un disque peut venir", 32, WHITE)
        self.col(l2, 0.9, x)
        self.au_mot("Un disque peut venir")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(d, scale=0.8), run_time=0.8)
        u = 0.75
        cy = cylindre(0.55, 1.5, u, P(-5.5, -2.6), corps=CYL_C, dessus="#7dd3fc", bord="#0c4a6e")
        co = cone(0.55, 1.5, u, P(-3.7, -2.6))
        bo = boule(0.55, u, P(-2.0, -2.2), couleur=BOULE_C, bord="#831843")
        l3 = self.t("d'un cylindre, d'un cône ou d'une boule.", 30, ROUGE_ERREUR)
        self.col(l3, 0.0, x)
        self.au_mot("d'un cylindre")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(cy, scale=0.8), FadeIn(co, scale=0.8),
                  FadeIn(bo, scale=0.8), run_time=1.0)
        l4 = self.t("C'est la suite des sections", 32, VERT_OK)
        self.col(l4, -1.1, x)
        self.au_mot("la suite des sections")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        l5 = self.t("qui identifie le solide.", 34, VERT_OK)
        self.col(l5, -2.0, x)
        self.au_mot("qui identifie")
        self.play(FadeIn(l5, scale=1.08), run_time=0.55)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bo = boule(1.0, 0.8, P(-5.2, 0.6), couleur=BOULE_C, bord="#831843")

        def avant_q(sc):
            sc.play(FadeIn(bo, scale=0.85), run_time=0.5)

        self.question_gauche("07-question", "07b-reponse",
                             ["Les sections d'une boule", "sont des disques qui…"],
                             [self.choix("grandissent vers le haut"), self.choix("restent égaux"),
                              self.choix("grandissent puis rétrécissent")], 2,
                             ["Le plus grand est au milieu.", "En haut et en bas,",
                              "ils se réduisent à un point."],
                             -0.3,
                             mot_q="Les sections horizontales", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        # ⛔ En x = 0,5 « Quel solide, et quel volume » (y = −2,3) touchait Ti-Margo, qui occupe
        #    x > 4,6 et y < −2,2. La colonne recule : la ligne finit avant 4,6.
        x = -1.0
        l0 = self.t("Le scanner de Nathan", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("Le scanner de Nathan")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        l0b = self.t("donne trois sections :", 32, SCAN_C)
        self.col(l0b, 1.2, x)
        self.au_mot("donne trois sections")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.45)
        c1 = carre_cavaliere(1.5, 1.0, P(-4.0, -2.4))
        c2 = carre_cavaliere(0.75, 1.0, P(-4.0, -0.9))
        pt = Dot(P(-4.0, 0.6), radius=0.09, color=PYR_C)
        l1 = self.ligne([("un carré de", WHITE), ("10 cm", BASE_C), ("en bas,", WHITE)],
                        30, buff=0.16)
        self.col(l1, 0.4, x)
        self.au_mot("un carré de")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(c1, scale=0.8), run_time=0.7)
        self.au_mot("10 centimètres")
        self.play(FadeIn(l1[1], scale=1.1), run_time=0.35)
        self.au_mot("en bas,")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("un carré de", WHITE), ("5 cm", ORANGE_Q), ("à mi-hauteur,", WHITE)],
                        30, buff=0.16)
        self.col(l2, -0.4, x)
        self.au_mot("un carré de", 2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(c2, scale=0.8), run_time=0.7)
        self.au_mot("5 centimètres")
        self.play(FadeIn(l2[1], scale=1.1), run_time=0.35)
        self.au_mot("à mi-hauteur")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        l3 = self.t("et un point au sommet.", 30, PYR_C)
        self.col(l3, -1.2, x)
        self.au_mot("et un point au sommet")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(pt, scale=0.5), run_time=0.7)
        l4 = self.bloc(["Quel solide, et quel volume", "si la hauteur est 12 cm ?"], 32,
                       JAUNE_TITRE)
        self.col(l4, -2.3, x)
        self.au_mot("Quel solide est-ce")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("si la hauteur est 12")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.5)
        self.pause_gauche(y=-3.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -1.3
        pc = pile_carres([1.4, 1.05, 0.7, 0.35, 0.0], 1.0, P(-4.6, -2.4), pas=0.62)
        l1 = self.t("Des carrés qui rétrécissent", 30, PYR_C)
        self.col(l1, 2.1, x)
        self.au_mot("Des carrés qui rétrécissent")
        self.play(FadeIn(l1, shift=UP * 0.1),
                  LaggedStart(*[FadeIn(s_, scale=0.8) for s_ in pc], lag_ratio=0.12), run_time=1.1)
        l2 = self.t("c'est une pyramide à base carrée.", 30, VERT_OK)
        self.col(l2, 1.3, x)
        self.au_mot("c'est une pyramide")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.ligne([("La base :", WHITE), ("10 × 10", BLEU_D), ("= 100 cm²", VERT_OK)],
                        30, buff=0.16)
        self.col(l3, 0.4, x)
        self.au_mot("la base, 10 fois 10")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(l3[1], shift=UP * 0.1), run_time=0.5)
        self.au_mot("100 centimètres carrés")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.35)
        l4 = self.ligne([("× 12", BLEU_D), ("= 1 200", VERT_OK)], 34, buff=0.2)
        hors_audit(l4[1])
        self.col(l4, -0.5, x)
        self.au_mot("100 fois 12")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("1 200")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        res = self.ligne([("÷ 3", JAUNE_TITRE), ("= 400 cm³", VERT_OK)], 42, buff=0.22)
        self.col(res, -1.6, x)
        self.au_mot("divisé par 3")
        self.play(FadeIn(res[0], scale=1.15), run_time=0.4)
        self.au_mot("400 centimètres cubes")
        self.play(FadeIn(res[1], scale=1.2), run_time=0.5)
        self.insister(res[1], 1.1, 0.25)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(pile_disques([0.5] * 3, 0.9, P(-1.3, -0.9), pas=0.5, couleur=CYL_C),
                     pile_disques([0.5, 0.33, 0.16, 0.0], 0.9, P(0.3, -0.9), pas=0.42,
                                  couleur=CONE_C),
                     pile_disques([0.2, 0.42, 0.5, 0.42, 0.2], 0.9, P(1.9, -0.9), pas=0.36,
                                  couleur=BOULE_C))
        lignes = self.finale_gauche(fig, textes=[
            ("Une suite de sections", "identifie un solide."),
            ("Des disques égaux : un cylindre.", "Qui rétrécissent : un cône."),
            ("Qui grandissent puis rétrécissent :", "une boule.")], fs=27)
        self.add(fig)
        self.au_mot("Une suite de sections")
        self.montrer_ligne(lignes[0])
        self.au_mot("Des disques égaux")
        self.montrer_ligne(lignes[1])
        self.au_mot("Des disques qui grandissent")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_le_cylindre()
        self.ecran_le_cone()
        self.ecran_la_boule()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
