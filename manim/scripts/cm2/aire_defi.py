# aire_defi.py
# EleveAI — Maths CM2 — série « Aire », épisode 07 : DÉFI D'AIRE (retrouver un côté, comparer des surfaces)
# (micro aire_defi, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : cm2-aire-defi-short (24 dalles sur 4 m : 6 m).
# Décor et métier : Romane, CONCEPTRICE DE SKATEPARKS (centres : sport, construction).
# Le CM2, un cran au-dessus du CM1 : on remonte de l'aire au côté (48 ÷ 6 = 8 ; carré de 25 m² → 5 m),
# et même aire ne veut pas dire même tour (9 × 4 et 6 × 6 : 36 m², tours 26 m et 24 m).
# Mapping micro → écrans : aire_defi = 02 (terrain 48 m², 6 m de large → 8 m de long, on vérifie 8 × 6),
# 03 (rampe carrée de 25 m² : 5 × 5 → côté 5 m), 04 (pistes 9 × 4 et 6 × 6 à la même échelle : même aire,
# tours 26 / 24), 06 (piège : on ne divise pas l'aire par 4), questions 05 (A : carré de 36 cm² → 6 cm)
# et 07 (B : 56 ÷ 7 = 8 m), défi 08 (48 m² moins l'arbre 2 × 2 = 44 m², pots de 10 m² : 5 pots).
# Voix : manim/voix/cm2-aire-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_defi_marques.json (python manim/scripts/cm2/aire_marques_cm2.py defi).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_defi.py AireDefiCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_defi.py AireDefiCM2 -o eleveai-maths-cm2-aire-defi --media_dir manim/scripts/cm2/media-aire-07
# Sortie : manim/sorties/cm2/maths/aire/07-defi/eleveai-maths-cm2-aire-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

SOL_C, SOL_B = "#cbd5e1", "#475569"      # le béton du skatepark
RAMPE_C, RAMPE_B = "#d6a35c", "#78350f"  # la rampe en bois
PEINT_C, PEINT_B = "#5eead4", "#0f766e"  # la peinture du sol (turquoise)
ARBRE_C, ARBRE_B = "#86efac", "#166534"  # le carré de l'arbre (gazon)
RECT_C, RECT_B = CARREAU, CARREAU_B      # la piste rectangulaire
CARRE_C, CARRE_B = ROSE_D, "#831843"     # la piste carrée


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE, buff=0.18):
    """La mesure d'un côté, posée contre la figure (hors audit : un nombre déjà dit ou redit)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff))


def dedans(mob, s, fs=30, couleur="#0f172a"):
    """L'aire écrite au milieu de la figure (hors audit)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(mob))


def plaque(n_col, n_rang, c, couleur, bord):
    """Une figure PLEINE (sans carreaux) de la taille de rect_cases(n_col, n_rang, c)."""
    return Rectangle(width=n_col * c, height=n_rang * c, fill_color=couleur, fill_opacity=1, stroke_color=bord,
                     stroke_width=3)


def skate(s=1.0):
    """Une planche de skate vue de côté : la planche relevée aux bouts, deux roues."""
    pl = RoundedRectangle(width=1.5 * s, height=0.16 * s, corner_radius=0.08 * s, fill_color="#7c3aed",
                          fill_opacity=1, stroke_color="#2e1065", stroke_width=2)
    r1 = Circle(0.11 * s, fill_color="#facc15", fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    r2 = r1.copy()
    r1.move_to(pl.get_center() + P(-0.45 * s, -0.17 * s))
    r2.move_to(pl.get_center() + P(0.45 * s, -0.17 * s))
    return VGroup(pl, r1, r2)


def arbre(c):
    """Un arbre vu du ciel, posé sur un carré de 2 × 2 carreaux : le feuillage rond, le tronc au milieu."""
    feuille = Circle(c * 0.85, fill_color="#16a34a", fill_opacity=1, stroke_color="#14532d", stroke_width=3)
    tronc = Circle(c * 0.2, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    return VGroup(feuille, tronc)


SUR_LIGNE = set("acemnorsuvwxzéèêàâîôûù0123456789ABCDEFGHIKLMNOPRSTUVWXYZ")


def ligne_de_base(t):
    """L'ordonnée de la ligne d'écriture d'un Text : le bas de sa première lettre sans jambage."""
    lettres = [c for c in t.text if not c.isspace()]
    if len(lettres) != len(t.submobjects):
        return None
    for c, g in zip(lettres, t.submobjects):
        if c in SUR_LIGNE:
            return g.get_bottom()[1]
    return None


def aligner_base(morceaux):
    """Pose les morceaux d'une ligne sur la MÊME ligne d'écriture (arrange les centre : « 4 pots » et
    « couvrent » ne tombaient pas à la même hauteur à cause du jambage du p)."""
    b0 = ligne_de_base(morceaux[0])
    for m in morceaux[1:]:
        b = ligne_de_base(m)
        if b0 is not None and b is not None:
            m.shift(UP * (b0 - b))
    return morceaux


def pot(s=1.0, couleur=PEINT_C):
    """Un pot de peinture : le seau, le couvercle, l'anse, l'étiquette."""
    seau = RoundedRectangle(width=0.8 * s, height=0.85 * s, corner_radius=0.08 * s, fill_color="#cbd5e1",
                            fill_opacity=1, stroke_color="#475569", stroke_width=3)
    couv = Ellipse(width=0.86 * s, height=0.22 * s, fill_color=couleur, fill_opacity=1, stroke_color="#475569",
                   stroke_width=3).move_to(seau.get_top())
    anse = Arc(radius=0.38 * s, start_angle=0.15, angle=PI - 0.3, color="#475569", stroke_width=4) \
        .move_to(seau.get_top() + UP * 0.2 * s)
    eti = RoundedRectangle(width=0.6 * s, height=0.3 * s, corner_radius=0.05 * s, fill_color=couleur, fill_opacity=1,
                           stroke_width=0).move_to(seau.get_center() + DOWN * 0.05 * s)
    return VGroup(anse, seau, eti, couv)


class AireDefiCM2(PaysageAireCM2G):
    nom_voix = "cm2-aire-defi"
    fichier_marques = "aire_defi_marques.json"
    ceinture = "bleue"

    def ligne(self, morceaux, fs=40, buff=0.2):
        return aligner_base(super().ligne(morceaux, fs, buff))

    def terrain(self, c=0.4, pos=P(-3.8, 0.4)):
        """Le sol du skatepark : 6 rangées de 8 carreaux de 1 m² ; .arbre = le carré de 2 × 2 (en haut à droite)."""
        g = rect_cases(8, 6, c, SOL_C, SOL_B).move_to(pos)
        g.arbre = VGroup(*[g[j * 8 + i] for j in (0, 1) for i in (6, 7)])
        g.reste = VGroup(*[q for q in g if q not in g.arbre])
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi d'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défi d'aire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Retrouver un côté", "à partir de l'aire,", "comparer des surfaces."], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        g = rect_cases(8, 6, 0.32, SOL_C, SOL_B).move_to(P(3.6, 0.45))
        rampe = rect_cases(3, 3, 0.32, RAMPE_C, RAMPE_B).align_to(g, DL)
        qm = hors_audit(Text("?", font_size=40, color=JAUNE_TITRE, weight=BOLD)).next_to(g, UP, buff=0.15)
        sk = skate(0.8).next_to(g, DOWN, buff=0.3)
        self.au_mot("Retrouver un côté")
        self.play(FadeIn(q[0], shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.5) for x in g], lag_ratio=0.01),
                  run_time=0.8)
        self.au_mot("à partir de l'aire")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(qm, scale=1.4), run_time=0.4)
        self.au_mot("comparer des surfaces")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(rampe, scale=0.8), FadeIn(sk, shift=RIGHT * 0.3),
                  run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Romane, conceptrice de skateparks ──────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ro = romane(1.0).move_to(P(-5.3, 0.25))
        self.au_mot("Voici Romane")
        nom = self.t("Romane", 40, BLEU_CALCUL).next_to(ro, UP, buff=0.2)
        self.play(FadeIn(ro, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("dessine des skateparks")
        met = self.bloc(["conceptrice de", "skateparks"], 26, BLEU_CALCUL).next_to(ro, DOWN, buff=0.18)
        for m in met:
            m.set_x(ro.get_x())
        sk = skate(0.75).next_to(met, DOWN, buff=0.3)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(sk, shift=RIGHT * 0.3), run_time=0.4)
        f = plaque(8, 6, 0.42, SOL_C, SOL_B).move_to(P(0.2, 0.55))
        self.au_mot("un terrain rectangulaire")
        self.play(FadeIn(f, scale=0.9), run_time=0.45)
        self.au_mot("rectangulaire de 48")
        a = Text("48 m²", font_size=40, color="#0f172a", weight=BOLD).move_to(f)
        self.play(FadeIn(a, scale=1.3), run_time=0.35)
        self.au_mot("et de 6")
        c6 = Text("6 m", font_size=32, color=ORANGE_RETENUE, weight=BOLD).next_to(f, LEFT, buff=0.18)
        self.play(FadeIn(c6, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("Combien mesure-t-il de long")
        lg = hors_audit(Text("? m", font_size=34, color=JAUNE_TITRE, weight=BOLD)).next_to(f, UP, buff=0.18)
        q = self.t("Combien mesure-t-il de long ?", 38, JAUNE_TITRE).move_to(P(0.2, -2.45))
        self.play(FadeIn(lg, scale=1.4), FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : l'aire et la largeur → la longueur (48 ÷ 6 = 8) ────────────────
    def ecran_cote(self):
        self.ecran("02-cote")
        c = 0.45
        f = plaque(8, 6, c, SOL_C, SOL_B).move_to(P(-3.6, 0.3))
        g = rect_cases(8, 6, c, SOL_C, SOL_B).move_to(f)
        a = dedans(f, "48 m²", 40)
        c6 = cote(f, "6 m", LEFT, couleur=ORANGE_RETENUE)
        lg = cote(f, "? m", UP)
        self.add(f, a, c6, lg)
        self.au_mot("L'aire, c'est")
        l1 = self.t("Aire = longueur × largeur", 34, JAUNE_TITRE)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("la longueur fois 6")
        l2 = self.ligne([("longueur × 6", BLEU_D), ("= 48", VERT_OK)], 38, buff=0.25)
        self.col(l2, 1.85)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(c6, scale_factor=1.4), run_time=0.25)
        self.au_mot("égale 48")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(a, scale_factor=1.2), run_time=0.35)
        self.au_mot("Quel nombre fois 6 donne 48")
        l3 = self.t("Quel nombre × 6 donne 48 ?", 32, GRAY_B)
        for x in l3.get_family():
            x._pas_audit = True  # 6 et 48 redits
        self.col(l3, 1.15)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("48 divisé par 6")
        l4 = self.ligne([("48 ÷ 6", BLEU_D), ("= 8", VERT_OK)], 48, buff=0.3)
        self.col(l4, 0.35)
        self.play(FadeIn(l4[0], scale=1.2), run_time=0.35)
        self.au_mot("par 6 : 8")
        c8 = cote(f, "8 m", UP, couleur=CARREAU)
        nums = numeros(VGroup(*g[:8]), 20, "#0f172a")
        self.play(FadeIn(l4[1], shift=UP * 0.1), FadeOut(a), FadeIn(g), FadeIn(nums), Transform(lg, c8),
                  run_time=0.3)
        self.au_mot("Le terrain mesure")
        mots = aligner_base(VGroup(*[Text(x, font_size=42, color=VERT_OK, weight=BOLD) for x in ("8 m", "de long")])
                            .arrange(RIGHT, buff=0.22))
        boite = SurroundingRectangle(mots, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        res = VGroup(boite, mots)
        self.col(res, -0.55)
        self.play(Create(boite), FadeIn(mots[0], scale=1.2), run_time=0.3)  # (le nombre à son mot, puis « de long »)
        self.play(FadeIn(mots[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("On vérifie")
        l5 = self.t("On vérifie :", 32, GRAY_B)
        self.col(l5, -1.4)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 fois 6, 48")
        l6 = self.t("8 × 6 = 48", 36, VERT_OK).next_to(l5, RIGHT, buff=0.25)
        self.play(FadeIn(l6, shift=UP * 0.1), Indicate(g, color=VERT_OK, scale_factor=1.03), run_time=0.45)
        self.attendre_voix()

    # ── 03 : la rampe carrée de 25 m² → côté 5 m ────────────────────────────
    def ecran_carre(self):
        self.ecran("03-carre")
        c = 0.5
        f = plaque(5, 5, c, RAMPE_C, RAMPE_B).move_to(P(-3.6, 0.3))
        g = rect_cases(5, 5, c, RAMPE_C, RAMPE_B).move_to(f)
        self.au_mot("rampe carrée de 25")
        l1 = self.ligne([("Rampe carrée :", RAMPE_C), ("25 m²", VERT_OK)], 36)
        self.col(l1, 2.5)
        a = dedans(f, "25 m²", 40)
        q1, q2 = cote(f, "?", UP, 36), cote(f, "?", LEFT, 36)
        self.play(FadeIn(f, scale=0.9), FadeIn(a), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.play(FadeIn(q1, scale=1.4), FadeIn(q2, scale=1.4), run_time=0.3)
        self.au_mot("quel nombre")
        l2 = self.t("Quel nombre, fois lui-même,", 34, GRAY_B)
        self.col(l2, 1.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("donne 25")
        l2b = self.t("donne 25 ?", 34, GRAY_B)
        for x in l2b.get_family():
            x._pas_audit = True  # 25 redit
        self.col(l2b, 1.05)
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 fois 5")
        l3 = self.ligne([("5 × 5", BLEU_D), ("= 25", VERT_OK)], 48, buff=0.3)
        self.col(l3, 0.15)
        self.play(FadeIn(l3[0], scale=1.2), run_time=0.2)
        self.au_mot("5 fois 5, 25")
        c5h, c5g = cote(f, "5 m", UP, couleur=CARREAU), cote(f, "5 m", LEFT, couleur=CARREAU)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeOut(a), FadeIn(g), Transform(q1, c5h), Transform(q2, c5g),
                  run_time=0.45)
        self.au_mot("mesure 5")
        res = self.gros("Côté : 5 m", fs=46)
        self.col(res, -0.85)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.04), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : même aire, pas le même tour (9 × 4 et 6 × 6) ───────────────────
    def pistes(self, c=0.33):
        r = rect_cases(9, 4, c, RECT_C, RECT_B).move_to(P(-4.0, 2.0))
        k = rect_cases(6, 6, c, CARRE_C, CARRE_B).move_to(P(-4.0, -0.45))
        return r, k

    def ecran_comparer(self):
        self.ecran("04-comparer")
        r, k = self.pistes()
        self.au_mot("deux pistes")
        l0 = self.t("Deux pistes :", 36, JAUNE_TITRE)
        self.col(l0, 2.6, 0.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un rectangle")
        l1 = self.ligne([("un rectangle", RECT_C), ("de 9 m sur 4 m", WHITE)], 32)
        self.col(l1, 2.0, 0.2)
        c9, c4 = cote(r, "9 m", UP, 28, RECT_C, 0.12), cote(r, "4 m", LEFT, 28, RECT_C)
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in r], lag_ratio=0.01),
                  run_time=0.4)
        self.au_mot("9 mètres sur 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c9), FadeIn(c4), run_time=0.25)
        self.au_mot("ou un carré")
        l2 = self.ligne([("un carré", CARRE_C), ("de 6 m", WHITE), ("de côté", WHITE)], 32)
        self.col(l2, 1.4, 0.2)
        c6 = cote(k, "6 m", LEFT, 28, CARRE_C)
        self.play(FadeIn(l2[0], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in k], lag_ratio=0.01),
                  run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c6), run_time=0.25)  # (la synchro attend 6)
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("9 fois 4")
        l3 = self.ligne([("9 × 4", BLEU_D), ("= 36", VERT_OK)], 40, buff=0.3)
        self.col(l3, 0.65, 0.2)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(r, color=RECT_C, scale_factor=1.03), run_time=0.2)
        self.au_mot("4, 36")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6 fois 6")
        l4 = self.ligne([("6 × 6", BLEU_D), ("= 36", VERT_OK)], 40, buff=0.3)
        self.col(l4, 0.0, 0.2)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(k, color=CARRE_C, scale_factor=1.03), run_time=0.2)
        self.au_mot("6, 36")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("La même aire")
        res = self.gros("La même aire !", fs=40)
        self.col(res, -0.75, 0.2)
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.au_mot("pas le même tour")
        l5 = self.t("Mais pas le même tour :", 32, PLINTHE)
        self.col(l5, -1.5, 0.2)
        t1, t2 = contour(r, PLINTHE, 8), contour(k, PLINTHE, 8)
        self.play(FadeIn(l5, shift=UP * 0.1), Create(t1), Create(t2), run_time=0.6)
        self.au_mot("26 mètres")
        e1 = self.t("26 m", 32, PLINTHE).next_to(r, DOWN, buff=0.14)
        self.play(FadeIn(e1, shift=UP * 0.1), Indicate(t1, color=PLINTHE, scale_factor=1.03), run_time=0.4)
        self.au_mot("24 pour le carré")
        e2 = self.t("24 m", 32, PLINTHE).next_to(k, DOWN, buff=0.14)
        self.play(FadeIn(e2, shift=UP * 0.1), Indicate(t2, color=PLINTHE, scale_factor=1.03), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = 0.3
        f = plaque(6, 6, c, CARRE_C, CARRE_B).move_to(P(-3.7, 1.25))
        g = rect_cases(6, 6, c, CARRE_C, CARRE_B).move_to(f)
        a = dedans(f, "36 cm²", 30)
        qm = cote(f, "?", UP, 34)

        def autres_q(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(a), FadeIn(qm), run_time=0.35)

        def apres(sc):
            c6 = cote(f, "6 cm", UP, 28, CARREAU)
            sc.play(FadeOut(a), FadeIn(g), Transform(qm, c6), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un carré a une aire", "de 36 cm².", "Combien mesure son côté ?"],
                             [self.choix("6 cm"), self.choix("9 cm"), self.choix("18 cm")], 0,
                             ["On cherche : ? × ? = 36", "6 × 6 = 36.", "Le côté mesure 6 cm."],
                             -0.05, sans_audit=(0, 2), couper={1: ("6 × 6", "= 36.")}, mot_q="Un carré",
                             autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (on ne divise pas l'aire par 4) ───────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        c = 0.22
        per = Square(9 * c, fill_opacity=0, stroke_color=PLINTHE, stroke_width=8).move_to(P(-4.7, 0.85))
        air = rect_cases(6, 6, c, CARRE_C, CARRE_B).move_to(P(-4.7, -1.7))
        xl = -0.4
        self.au_mot("trouver le côté")
        l1 = self.bloc(["Le côté d'un carré", "à partir de son aire :"], 32, JAUNE_TITRE)
        self.col(l1, 1.95, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("à partir de son aire")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on ne divise")
        l2 = self.ligne([("on ne divise pas", ROUGE_ERREUR), ("par 4 !", ROUGE_ERREUR)], 34, buff=0.18)
        self.col(l2, 1.1, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("divise pas par 4")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        l3 = self.ligne([("36 ÷ 4", BLEU_D), ("= 9 :", BLEU_D)], 36, buff=0.18)
        self.col(l3, 0.4, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)  # (la synchro attend 36 puis 4)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.2)   # (puis 9)
        l3b = self.t("c'est pour le périmètre.", 32, PLINTHE)
        self.col(l3b, -0.2, xl)
        e1 = hors_audit(self.t("tour : 36 cm", 26, PLINTHE)).next_to(per, RIGHT, buff=0.2)
        e9 = cote(per, "9 cm", UP, 26, PLINTHE, 0.12)
        self.au_mot("c'est quand")
        self.play(Create(per), FadeIn(e1), FadeIn(e9), run_time=0.4)
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.2)
        self.au_mot("Pour l'aire")
        r1 = self.t("Pour l'aire :", 34, VERT_OK)
        self.col(r1, -0.8, xl)
        e2 = hors_audit(self.t("aire : 36 cm²", 26, CARRE_C)).next_to(air, RIGHT, buff=0.2)
        self.play(FadeIn(r1, shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in air], lag_ratio=0.01),
                  FadeIn(e2), run_time=0.6)
        self.au_mot("le nombre qui")
        r2 = self.t("le nombre qui, fois lui-même,", 32, VERT_OK)
        self.col(r2, -1.35, xl)
        self.play(FadeIn(r2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("donne l'aire")
        r3 = self.t("donne l'aire.", 32, VERT_OK)
        self.col(r3, -1.9, xl)
        self.play(FadeIn(r3, shift=UP * 0.1), Indicate(air, color=VERT_OK, scale_factor=1.05), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = 0.27
        f = plaque(8, 7, c, RECT_C, RECT_B).move_to(P(-3.6, 1.3))
        g = rect_cases(8, 7, c, RECT_C, RECT_B).move_to(f)
        a = dedans(f, "56 m²", 32)
        c7 = cote(f, "7 m", LEFT, 28, ORANGE_RETENUE)
        qm = cote(f, "? m", UP, 30)

        def autres_q(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(a), FadeIn(c7), FadeIn(qm), run_time=0.35)

        def apres(sc):
            c8 = cote(f, "8 m", UP, 28, CARREAU)
            sc.rep(0, avec=[FadeOut(a), FadeIn(g), Transform(qm, c8)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Un rectangle : aire 56 m²,", "largeur 7 m.", "Quelle est sa longueur ?"],
                             [self.choix("49 m"), self.choix("8 m"), self.choix("63 m")], 1,
                             ["56 ÷ 7 = 8.", "On vérifie : 8 × 7 = 56.", "La longueur mesure 8 m."],
                             -0.05, sans_audit=(1,), hors=(2,), mot_q="Un rectangle", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (le sol moins l'arbre, combien de pots ?) ──────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.terrain()
        xl = 0.3
        self.au_mot("skatepark de 48")
        l0 = self.ligne([("Le sol du skatepark :", GRAY_B), ("48 m²", WHITE)], 32)
        self.col(l0, 2.3, xl)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in g], lag_ratio=0.01),
                  run_time=0.7)
        self.au_mot("sans peinture")
        l1 = self.ligne([("Sans peinture :", GRAY_B), ("un carré", ARBRE_C)], 32)
        self.col(l1, 1.65, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un carré")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        l1b = self.ligne([("de 2 m", ARBRE_C), ("de côté,", ARBRE_C)], 32, buff=0.16)
        self.col(l1b, 1.15, xl)
        l1c = self.t("pour un arbre.", 32, ARBRE_C)
        self.col(l1c, 0.65, xl)
        ab = arbre(g[0].width).move_to(g.arbre)
        self.play(FadeIn(l1b[0], shift=UP * 0.1), *[q.animate.set_fill(ARBRE_C).set_stroke(ARBRE_B) for q in g.arbre],
                  run_time=0.3)  # (la synchro attend 2)
        self.play(FadeIn(l1b[1], shift=UP * 0.1), run_time=0.25)
        self.play(FadeIn(l1c, shift=UP * 0.1), FadeIn(ab, scale=0.5), run_time=0.35)
        self.au_mot("couvre 10")
        l2 = self.t("Un pot couvre 10 m².", 32, PEINT_C)
        self.col(l2, 0.1, xl)
        pp = pot(0.9).next_to(g, DOWN, buff=0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pp, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de pots")
        q = self.bloc(["Combien de pots", "faut-il ?"], 38, JAUNE_TITRE)
        self.col(q, -0.75, xl)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(pp), run_time=0.5)
        self.pause_defi(y=-1.95)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.terrain()
        for q in g.arbre:
            q.set_fill(ARBRE_C).set_stroke(ARBRE_B)
        ab = arbre(g[0].width).move_to(g.arbre)
        self.add(g, ab)
        xl = 0.3
        self.au_mot("Le carré de l'arbre")
        l0 = self.t("Le carré de l'arbre :", 32, ARBRE_C)
        self.col(l0, 2.3, xl)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(VGroup(g.arbre, ab), color=ARBRE_C, scale_factor=1.1), run_time=0.4)
        self.au_mot("2 fois 2")
        l1 = self.ligne([("2 × 2", BLEU_D), ("= 4 m²", VERT_OK)], 38, buff=0.3)
        self.col(l1, 1.7, xl)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 fois 2, 4")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("À peindre")
        l2a = self.t("À peindre :", 32, PEINT_C)
        self.col(l2a, 1.05, xl)
        self.play(FadeIn(l2a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("48 moins 4")
        l2 = self.ligne([("48 − 4", BLEU_D), ("= 44 m²", VERT_OK)], 38, buff=0.3)
        self.col(l2, 0.5, xl)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4, 44")
        self.play(FadeIn(l2[1], shift=UP * 0.1),
                  LaggedStart(*[q.animate.set_fill(PEINT_C).set_stroke(PEINT_B) for q in g.reste], lag_ratio=0.01),
                  run_time=0.7)
        self.au_mot("4 pots")
        l3 = self.ligne([("4 pots", ROUGE_ERREUR), ("couvrent 40 m² :", ROUGE_ERREUR)], 32, buff=0.16)
        self.col(l3, -0.15, xl)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("couvrent 40")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas assez")
        l3b = self.t("pas assez !", 32, ROUGE_ERREUR)
        self.col(l3b, -0.7, xl)
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il faut 5")
        res = self.gros("Il faut 5 pots.", fs=42)
        self.col(res, -1.5, xl)
        pots = VGroup(*[pot(0.62) for _ in range(5)]).arrange(RIGHT, buff=0.14).next_to(g, DOWN, buff=0.35)
        self.play(FadeIn(res, scale=1.2), LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in pots], lag_ratio=0.15),
                  run_time=0.6)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        r, k = rect_cases(9, 4, 0.22, RECT_C, RECT_B), rect_cases(6, 6, 0.22, CARRE_C, CARRE_B)
        fig = VGroup(r, k).arrange(DOWN, buff=0.4)
        lignes = self.finale_gauche(fig, textes=[
            ("Aire et un côté d'un rectangle :", "on divise l'aire par ce côté."),
            ("Carré : le nombre qui,", "fois lui-même, donne l'aire."),
            ("Même aire ne veut pas dire", "même périmètre.")], fs=32)
        self.add(fig)
        self.au_mot("Si on connaît")
        self.montrer_ligne(lignes[0], Indicate(r, scale_factor=1.05))
        self.au_mot("Pour un carré")
        self.montrer_ligne(lignes[1], Indicate(k, scale_factor=1.05))
        self.au_mot("Même aire")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cote()
        self.ecran_carre()
        self.ecran_comparer()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
