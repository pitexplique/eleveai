# longueur_unites.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 01 : LES UNITÉS m, dm, cm, mm, km
# (micro ce2_longueur_unites, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Short jumeau : film Ti Margo (« La queue de 10 kilomètres », réponse C).
# Décor et métier : Samuel, MENUISIER (centre : art-design).
# Mapping micro → écrans : 02 (le mètre, m), 03 (dm, cm, mm : main, doigt, pièce), 04 (km : kilo = mille),
# 06 (ranger mm < cm < dm < m < km), 07 (piège : m n'est pas mm),
# questions 05 (épaisseur d'une pièce, B) et 08 (30 mm sur la boîte de vis, A), défi 09 (table, trajet, clou).
# Voix : manim/voix/ce2-longueur-unites.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_unites_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:unites).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_unites.py LongueurUnitesCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_unites.py LongueurUnitesCE2 -o eleveai-maths-ce2-longueur-unites --media_dir manim/scripts/ce2/media-lg-01
# Sortie : manim/sorties/ce2/maths/longueur/01-unites/eleveai-maths-ce2-longueur-unites.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403


def main(s=1.0, couleur="#e0ac69"):
    """Une main ouverte (paume + 4 doigts + pouce)."""
    paume = RoundedRectangle(width=1.0 * s, height=0.9 * s, corner_radius=0.2 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    doigts = VGroup(*[RoundedRectangle(width=0.2 * s, height=(0.62 + 0.1 * (k in (1, 2))) * s,
                                       corner_radius=0.09 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                      for k in range(4)]).arrange(RIGHT, buff=0.04 * s, aligned_edge=DOWN)
    doigts.next_to(paume, UP, buff=-0.12 * s)
    pouce = RoundedRectangle(width=0.2 * s, height=0.55 * s, corner_radius=0.09 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).rotate(0.7).next_to(paume, LEFT, buff=-0.12 * s)
    pouce.shift(DOWN * 0.1 * s)
    return VGroup(paume, doigts, pouce)


def doigt(s=1.0, couleur="#e0ac69"):
    return RoundedRectangle(width=0.26 * s, height=0.9 * s, corner_radius=0.12 * s, fill_color=couleur,
                            fill_opacity=1, stroke_width=0)


def maison(s=1.0, mur="#fde68a", toit="#b91c1c"):
    m = Square(side_length=1.0 * s, fill_color=mur, fill_opacity=1, stroke_width=0)
    t = Polygon(P(-0.62 * s, 0), P(0.62 * s, 0), P(0, 0.5 * s), fill_color=toit, fill_opacity=1, stroke_width=0)
    t.next_to(m, UP, buff=0)
    pt = Rectangle(width=0.28 * s, height=0.45 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0)
    pt.align_to(m, DOWN)
    return VGroup(m, t, pt)


def table(s=1.0):
    plateau = Rectangle(width=2.2 * s, height=0.18 * s, fill_color=BOIS_CLAIR, fill_opacity=1,
                        stroke_color=BOIS_FONCE, stroke_width=2)
    pieds = VGroup(*[Rectangle(width=0.14 * s, height=0.8 * s, fill_color=BOIS_FONCE, fill_opacity=1, stroke_width=0)
                     .next_to(plateau, DOWN, buff=0).align_to(plateau, d) for d in (LEFT, RIGHT)])
    return VGroup(plateau, pieds)


def clou(s=1.0):
    tete = Rectangle(width=0.32 * s, height=0.08 * s, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
    tige = Polygon(P(-0.05 * s, 0), P(0.05 * s, 0), P(0, -0.7 * s), fill_color="#d1d5db", fill_opacity=1,
                   stroke_width=0)
    tige.next_to(tete, DOWN, buff=0)
    return VGroup(tete, tige)


def vis_(s=1.0):
    t = clou(s)
    filets = VGroup(*[Line(P(-0.06 * s, -0.12 * s - 0.1 * s * k), P(0.06 * s, -0.17 * s - 0.1 * s * k),
                           color="#4b5563", stroke_width=2) for k in range(5)])
    filets.move_to(t[1]).shift(UP * 0.05 * s)
    return VGroup(t, filets)


class LongueurUnitesBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-unites"
    fichier_marques = "longueur_unites_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les unités de longueur", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les unités de longueur")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Avec quoi mesure-t-on", "une planche,", "ou une route ?"], 38, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        pl = planche(3.0).move_to(P(3.4, 0.9))
        route = VGroup(Rectangle(width=3.4, height=0.5, fill_color="#374151", fill_opacity=1, stroke_width=0),
                       DashedLine(P(-1.6, 0), P(1.6, 0), color=WHITE, stroke_width=3)).move_to(P(3.4, -0.4))
        self.au_mot("Avec quoi mesure-t-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("une planche")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(pl, scale=1.1), run_time=0.35)
        self.au_mot("ou une route")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(route, shift=LEFT * 0.3), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Samuel, menuisier ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = samuel(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Samuel")
        nom = self.t("Samuel", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est menuisier")
        met = self.t("menuisier", 26, BOIS_CLAIR).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("il fabrique des tables")
        l0 = self.t("Il fabrique des tables et des étagères.", 32)
        self.col(l0, 2.3, -3.5)
        tb = table(0.9).move_to(P(-0.8, 0.9))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(tb, shift=UP * 0.2), run_time=0.4)
        pl = planche(4.2).move_to(P(1.2, -0.6))
        self.au_mot("Avant de couper une planche")
        l1 = self.t("Avant de couper une planche,", 32)
        self.col(l1, -1.4, -3.5)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pl, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("il la mesure")
        fl = fleche_double(pl.get_corner(UL) + UP * 0.25, pl.get_corner(UR) + UP * 0.25)
        l2 = self.t("il la mesure.", 32, JAUNE_TITRE).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), GrowFromCenter(fl), run_time=0.4)
        self.au_mot("quelle unité")
        q = self.t("Mais avec quelle unité ?", 40, JAUNE_TITRE)
        self.col(q, -2.5, -3.5)
        self.play(FadeIn(q, scale=1.1), Wiggle(pl), run_time=0.5)
        self.attendre_voix()

    # ── 02 : le mètre ───────────────────────────────────────────────────────
    def ecran_metre(self):
        self.ecran("02-metre")
        self.au_mot("L'unité de longueur")
        l0 = self.ligne([("L'unité de longueur :", WHITE), ("le mètre", JAUNE_TITRE)], 40, buff=0.25)
        gauche(l0, -6.2, 2.8)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("petit m")
        l1 = self.t("Il s'écrit avec un petit", 34)
        gauche(l1, -6.2, 1.7)
        m = self.t("m", 110, VERT_OK).next_to(l1, RIGHT, buff=0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), GrowFromCenter(m), run_time=0.5)
        pl = planche(5.0).move_to(P(-2.4, -0.4))
        self.au_mot("La planche de Samuel")
        self.play(FadeIn(pl, shift=LEFT * 0.3), run_time=0.35)
        self.au_mot("2 mètres")
        fl = fleche_double(pl.get_corner(DL) + DOWN * 0.3, pl.get_corner(DR) + DOWN * 0.3)
        e1 = self.t("2 m", 40, JAUNE_TITRE).next_to(fl, DOWN, buff=0.15)
        self.play(GrowFromCenter(fl), FadeIn(e1, scale=1.2), run_time=0.4)
        po = porte(2.5, 1.15).move_to(P(3.6, -0.6))
        self.au_mot("Une porte")
        self.play(FadeIn(po, shift=UP * 0.2), run_time=0.35)
        f2 = fleche_double(po.get_corner(UR) + RIGHT * 0.3, po.get_corner(DR) + RIGHT * 0.3)
        e2 = hors_audit(self.t("≈ 2 m", 36, JAUNE_TITRE)).next_to(f2, RIGHT, buff=0.15)
        self.au_mot("2 mètres", 2)  # le 2 redit : hors audit, posé à son extrait
        self.wait(0.07)
        self.play(GrowFromCenter(f2), FadeIn(e2, scale=1.2), run_time=0.4)
        self.insister(m, 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : décimètre, centimètre, millimètre ──────────────────────────────
    def ecran_petites(self):
        self.ecran("03-petites")
        self.au_mot("Pour les petites longueurs")
        l0 = self.t("Pour les petites longueurs, on partage le mètre.", 32, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        rangs = [("Le décimètre", "le décimètre", "dm", "la largeur d'une main", main(1.1)),
                 ("Le centimètre", "le centimètre", "cm", "la largeur d'un doigt", doigt(1.0)),
                 ("Le millimètre", "le millimètre", "mm", "l'épaisseur d'une pièce", piece(0.32))]
        for k, (ex, mot, u, ref, obj) in enumerate(rangs):
            y = 1.7 - 1.45 * k
            r0 = self.ligne([(mot, WHITE), ("→", GRAY_B), (u, VERT_OK)], 38, buff=0.25)
            gauche(r0, -6.0, y)
            self.au_mot(ex)
            self.play(FadeIn(r0, shift=UP * 0.1), run_time=0.3)
            r1 = self.t("≈ " + ref, 28, ORANGE_RETENUE)
            gauche(r1, -6.0 + 0.3, y - 0.6)
            obj.move_to(P(3.0, y - 0.25))
            self.au_mot(ref.replace("l'épaisseur d'une pièce", "l'épaisseur d'une pièce"))
            self.play(FadeIn(r1, shift=UP * 0.1), FadeIn(obj, scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 04 : le kilomètre ───────────────────────────────────────────────────
    def ecran_kilometre(self):
        self.ecran("04-kilometre")
        self.au_mot("Pour les grandes distances")
        l0 = self.t("Pour les grandes distances :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("le kilomètre")
        k0 = self.ligne([("le kilomètre", WHITE), ("→", GRAY_B), ("km", VERT_OK)], 40, buff=0.25)
        gauche(k0, -6.0, 2.0)
        self.play(FadeIn(k0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Kilo veut dire mille")
        k1 = self.t("« kilo » veut dire mille", 32, ORANGE_RETENUE)
        gauche(k1, -5.7, 1.3)
        self.play(FadeIn(k1, shift=UP * 0.1), run_time=0.35)
        at = maison(1.0).move_to(P(-4.4, -1.0))
        sc = maison(1.0, "#d6a26b", "#78350f").move_to(P(4.0, -1.0))
        route = Line(P(-3.7, -1.4), P(3.3, -1.4), color=GRAY_B, stroke_width=8)
        n_at = self.t("l'atelier", 26, GRAY_B).next_to(at, DOWN, buff=0.15)
        n_sc = self.t("la scierie", 26, GRAY_B).next_to(sc, DOWN, buff=0.15)
        self.au_mot("La scierie")
        self.play(FadeIn(sc, shift=DOWN * 0.2), FadeIn(n_sc), run_time=0.35)
        self.au_mot("15 kilomètres")
        fl = fleche_double(P(-3.6, -0.5), P(3.2, -0.5))
        e = self.t("15 km", 42, JAUNE_TITRE).next_to(fl, UP, buff=0.12)
        self.play(Create(route), GrowFromCenter(fl), FadeIn(e, scale=1.2), run_time=0.5)
        self.au_mot("de son atelier")
        self.play(FadeIn(at, shift=DOWN * 0.2), FadeIn(n_at), run_time=0.35)
        self.insister(k0[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = piece(0.55).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g, scale=1.1), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(g, color=VERT_OK, scale_factor=1.1), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Avec quelle unité", "mesure-t-on l'épaisseur", "d'une pièce de monnaie ?"],
                             [self.choix("le mètre"), self.choix("le millimètre"), self.choix("le kilomètre")], 1,
                             ["Une pièce est très fine :", "on la mesure", "en millimètres.",
                              "C'est la plus petite", "des cinq unités."],
                             -0.75, mot_q="Avec quelle unité", autres_q=autres_q, autres_r=apres)

    # ── 06 : ranger mm < cm < dm < m < km ───────────────────────────────────
    def ecran_ranger(self):
        self.ecran("06-ranger")
        self.au_mot("On range les cinq unités")
        l0 = self.t("On range les cinq unités :", 38, JAUNE_TITRE)
        gauche(l0, -6.2, 2.8)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("de la plus petite à la plus grande")
        l1 = self.t("de la plus petite à la plus grande", 32, GRAY_B)
        gauche(l1, -6.2, 2.1)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        noms = [("le millimètre", "mm"), ("le centimètre", "cm"), ("le décimètre", "dm"), ("le mètre", "m"),
                ("le kilomètre", "km")]
        xs = [-5.0, -2.7, -0.4, 1.9, 4.2]
        tailles = [34, 42, 50, 58, 66]
        for k, (mot, u) in enumerate(noms):
            u_t = self.t(u, tailles[k], VERT_OK).move_to(P(xs[k], 0.2))
            n_t = self.t(mot.replace("le ", ""), 22, GRAY_B).move_to(P(xs[k], -0.6))
            anims = [FadeIn(u_t, scale=1.2), FadeIn(n_t)]
            if k:
                anims.append(FadeIn(self.t("<", 54, ORANGE_RETENUE).move_to(P((xs[k] + xs[k - 1]) / 2, 0.2))))
            self.au_mot(mot)
            self.play(*anims, run_time=0.3)
        fl = Arrow(P(-5.4, -1.5), P(4.8, -1.5), buff=0, color=JAUNE_TITRE, stroke_width=6)
        txt = self.t("de plus en plus grand", 30, JAUNE_TITRE).next_to(fl, DOWN, buff=0.15)
        self.play(GrowArrow(fl), FadeIn(hors_audit(txt)), run_time=0.6)
        self.attendre_voix()

    # ── 07 : le piège : m n'est pas mm ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Le petit m tout seul")
        f0 = self.ligne([("m", VERT_OK), ("tout seul :", WHITE), ("le mètre", VERT_OK)], 44, buff=0.25)
        gauche(f0, -6.0, 1.6)
        pl = planche(3.6).move_to(P(3.2, 1.6))
        self.play(FadeIn(f0, shift=UP * 0.1), FadeIn(pl, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("c'est le millimètre")
        f1 = self.ligne([("mm", ORANGE_RETENUE), (":", WHITE), ("le millimètre", ORANGE_RETENUE)], 44, buff=0.25)
        gauche(f1, -6.0, 0.1)
        pc = piece(0.35).move_to(P(3.2, 0.1))
        self.play(FadeIn(f1, shift=UP * 0.1), FadeIn(pc, scale=1.2), run_time=0.4)
        self.au_mot("une toute petite longueur")
        f2 = self.t("une toute petite longueur", 30, GRAY_B)
        gauche(f2, -5.7, -0.65)
        self.play(FadeIn(f2, shift=UP * 0.1), Indicate(pc, scale_factor=1.3), run_time=0.4)
        self.au_mot("Lis bien toutes les lettres")
        res = self.t("Lis bien toutes les lettres !", 44, JAUNE_TITRE)
        gauche(res, -6.0, -2.0)
        self.play(FadeIn(res, scale=1.15), run_time=0.4)
        self.insister(f1[0], 1.3, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        boite = VGroup(RoundedRectangle(width=1.9, height=1.2, corner_radius=0.1, fill_color="#1d4ed8",
                                        fill_opacity=1, stroke_color=WHITE, stroke_width=2),
                       *[vis_(0.9).move_to(P(-0.55 + 0.37 * k, 0.05)) for k in range(4)]).move_to(P(-3.8, 1.55))
        et = hors_audit(self.t("30 mm", 30, JAUNE_TITRE)).next_to(boite, RIGHT, buff=0.2)

        def autres_q(sc):
            sc.play(FadeIn(boite), run_time=0.3)

        def apres(sc):
            sc.play(FadeIn(et, scale=1.2), run_time=0.2)

        self.question_gauche("08-question", "08b-reponse",
                             ["Sur une boîte de vis,", "Samuel lit 30,", "puis les lettres m m.",
                              "Que veulent-elles dire ?"],
                             [self.choix("millimètre"), self.choix("mètre"), self.choix("centimètre")], 0,
                             ["mm, c'est le millimètre.", "Les vis mesurent",
                              "30 millimètres.", "Une vis de 30 mètres :", "plus haut qu'une maison !"],
                             -0.75, sans_audit=(3,), mot_q="Sur une boîte de vis", autres_q=autres_q,
                             autres_r=apres)

    # ── 09 : le défi (table, trajet, clou) ──────────────────────────────────
    def trois(self):
        tb = table(0.9)
        tr = VGroup(maison(0.55), Line(P(0, 0), P(1.6, 0), color=GRAY_B, stroke_width=6),
                    maison(0.55, "#d6a26b", "#78350f")).arrange(RIGHT, buff=0.1, aligned_edge=DOWN)
        cl = clou(1.3)
        g = VGroup(tb, tr, cl).arrange(RIGHT, buff=1.3, aligned_edge=DOWN).scale(1.35).move_to(P(-0.8, 0.5))
        return g

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.trois()
        self.au_mot("Quelle unité pour chacun")
        l0 = self.t("Quelle unité pour chacun ?", 34)
        gauche(l0, -6.2, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        for k, mot in enumerate(["la longueur d'une table", "le trajet jusqu'à la scierie",
                                 "la longueur d'un clou"]):
            self.au_mot(mot)
            self.play(FadeIn(g[k], shift=UP * 0.2), run_time=0.3)
        u = self.ligne([("m", VERT_OK), ("km", VERT_OK), ("cm", VERT_OK)], 50, buff=0.9)
        u.next_to(l0, RIGHT, buff=0.6)
        for k, mot in enumerate(["Le mètre", "le kilomètre", "le centimètre"]):
            self.au_mot(mot)
            self.play(FadeIn(u[k], scale=1.2), run_time=0.25)
        self.play(Wiggle(g), run_time=0.5)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois().shift(UP * 0.7)
        self.add(g)
        rep = [("La table", "2 mètres", "≈ 2 m", 0), ("Le trajet", "15 kilomètres", "15 km", 1),
               ("Le clou", "5 centimètres", "≈ 5 cm", 2)]
        for m1, m2, u, i in rep:
            self.au_mot(m1)
            self.play(Indicate(g[i], scale_factor=1.06), run_time=0.3)
            self.au_mot(m2)
            e = self.t(u, 40, VERT_OK).next_to(g[i], DOWN, buff=0.3)
            self.play(FadeIn(e, scale=1.3), run_time=0.3)
        self.au_mot("Une grande longueur")
        l1 = self.t("Une grande longueur, une grande unité.", 34, JAUNE_TITRE)
        gauche(l1, -6.0, -1.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Une petite longueur")
        l2 = self.t("Une petite longueur, une petite unité.", 34, ORANGE_RETENUE)
        gauche(l2, -6.0, -2.7)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = VGroup(piece(0.25), doigt(0.7), main(0.8), planche(1.8, 0.25)) \
            .arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
        fig.scale_to_fit_width(3.2)
        lignes = self.finale_gauche(fig, textes=[
            ("Les longueurs se mesurent", "en km, m, dm, cm et mm."),
            ("Le kilomètre est le plus grand,", "le millimètre le plus petit."),
            ("Le m", "veut dire mètre.")], fs=32)
        self.add(fig)
        self.au_mot("Les longueurs se mesurent")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Le kilomètre est le plus grand")
        self.montrer_ligne(lignes[1])
        self.au_mot("Le m veut dire mètre")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_metre()
        self.ecran_petites()
        self.ecran_kilometre()
        self.ecran_question1()
        self.ecran_ranger()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class LongueurUnitesCE2(LongueurUnitesBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"
