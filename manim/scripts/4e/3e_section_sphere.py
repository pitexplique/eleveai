# 3e_section_sphere.py
# EleveAI — Maths 3e — série « Périmètre, aire, volume, solides », épisode T6 : LA SECTION D'UNE
# SPHÈRE (micro 3e section_sphere, notion sections_solides), AVEC VOIX. 16:9, CEINTURE BLEUE.
# ⚠️ section_sphere EST au programme français (les aires de solides de 3e, elles, sont masquées).
# Décor et métier : Rayan, GÉOGRAPHE — l'équateur et les parallèles d'un globe
# (centres histoire-geographie, espace).
# Mapping micro → écrans : 02 (un plan coupe une sphère : TOUJOURS un cercle), 03 (par le centre,
# c'est le grand cercle, de rayon celui de la sphère), 04 (le triangle rectangle caché : R
# hypoténuse, d et r les côtés), 06 (piège : trop loin du centre, le plan ne coupe plus),
# questions 05 (B : un cercle) et 07 (C : 8), défi 08 (Terre 6 370 km, plan à 3 185 km → ≈ 5 517 km).
# Voix : manim/voix/3e-section-sphere.json ; marques : 3e_section_sphere_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/3e_section_sphere.py SectionSphere3e
# Sortie : manim/sorties/3e/maths/sections/36-section-sphere/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import boule, rayan, Paysage3e  # noqa: E402

GLOBE_C, GLOBE_B = "#2563eb", "#0c4a6e"
TERRE_V = "#4d7c0f"
EQUA_C = "#facc15"
PARA_C = "#22d3ee"
DIST_C = "#f472b6"


def globe(r, u, o=ORIGIN, sw=4):
    """Un globe : la boule bleue, l'équateur (jaune) et deux parallèles (cyan).
    Attributs : .equateur_t .paralleles .centre .r .u"""
    b = boule(r, u, o, couleur=GLOBE_C, bord=GLOBE_B, sw=sw)
    eq = Ellipse(width=2 * r * u, height=2 * r * u * 0.3, stroke_color=EQUA_C, stroke_width=sw + 2,
                 fill_opacity=0).move_to(o)
    paras = VGroup()
    for k in (0.5, -0.5, 0.8, -0.8):
        rk = r * (1 - k * k) ** 0.5
        paras.add(Ellipse(width=2 * rk * u, height=2 * rk * u * 0.3, stroke_color=PARA_C,
                          stroke_width=sw * 0.7, fill_opacity=0).move_to(o + UP * k * r * u))
    g = VGroup(b, paras, eq)
    g.boule_, g.equateur_t, g.paralleles = b, eq, paras
    g.centre, g.r, g.u = o, r, u
    return g


def coupe_sphere(R, d, u, o=ORIGIN, sw=5, montrer_triangle=True):
    """La sphère VUE EN COUPE : le grand cercle, la corde du plan à la distance d du centre,
    et le triangle rectangle (centre, pied, bord). Attributs : .cercle .corde .R_trait .d_trait
    .r_trait .angle .H .M .rs (le rayon de la section, en unités de la figure)"""
    rs = (R * R - d * d) ** 0.5
    cer = Circle(radius=R * u, stroke_color=GLOBE_C, stroke_width=sw, fill_color=GLOBE_C,
                 fill_opacity=0.12).move_to(o)
    H = o + UP * d * u
    M = H + RIGHT * rs * u
    corde = Line(H + LEFT * rs * u, M, color=PARA_C, stroke_width=sw + 2)
    g = VGroup(cer, corde)
    g.cercle, g.corde = cer, corde
    g.R_trait = Line(o, M, color=GLOBE_B, stroke_width=sw + 1)
    g.d_trait = Line(o, H, color=DIST_C, stroke_width=sw + 1)
    g.r_trait = Line(H, M, color=PARA_C, stroke_width=sw + 2)
    g.angle = equerre(H, RIGHT, DOWN, 0.2, DIST_C)
    g.centre_pt = Dot(o, radius=0.07, color=WHITE)
    g.H, g.M, g.centre, g.rs, g.R, g.d, g.u = H, M, o, rs, R, d, u
    return g


class SectionSphere3e(Paysage3e):
    nom_voix = "3e-section-sphere"
    fichier_marques = "3e_section_sphere_marques.json"
    ceinture = "bleue"

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
        titre, ident, ech = self.garde("La section d'une sphère", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("La section d'une sphère")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Pourquoi est-ce", "toujours un cercle ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        gl = globe(1.2, 1.0, P(3.6, 0.1))
        self.au_mot("Pourquoi est-ce")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(gl, scale=0.85), run_time=0.5)
        self.au_mot("toujours un cercle")
        self.play(FadeIn(q[1], shift=UP * 0.2), Indicate(gl.equateur_t, color=EQUA_C,
                                                         scale_factor=1.08), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = rayan(1.0).move_to(P(-5.2, 0.4))
        self.au_mot("Voici Rayan")
        nom = self.t("Rayan", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("géographe")
        met = self.t("géographe", 26, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.9
        # ⛔ En x = 3,6 le globe mordait sur « Ce sont tous des cercles, » : il recule.
        gl = globe(1.5, 1.0, P(4.2, 0.0))
        l1 = self.t("Sur son globe,", 32, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("Sur son globe")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(gl.boule_, scale=0.85), run_time=0.8)
        l2 = self.t("il montre l'équateur", 32, EQUA_C)
        self.col(l2, 1.3, x)
        self.au_mot("il montre l'équateur")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(gl.equateur_t), run_time=0.8)
        l3 = self.t("et les parallèles.", 32, PARA_C)
        self.col(l3, 0.5, x)
        self.au_mot("et les parallèles")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[Create(e) for e in gl.paralleles], lag_ratio=0.2), run_time=1.0)
        l4 = self.bloc(["Ce sont tous des cercles,", "et ce n'est pas un hasard :"], 30, WHITE)
        self.col(l4, -0.7, x)
        self.au_mot("Ce sont tous des cercles")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("pas un hasard")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.45)
        l5 = self.t("des sections de la sphère.", 34, JAUNE_TITRE)
        self.col(l5, -1.9, x)
        self.au_mot("des sections de la sphère")
        self.play(FadeIn(l5, scale=1.1), run_time=0.55)
        self.attendre_voix()

    # ── 02 : toujours un cercle ─────────────────────────────────────────────
    def ecran_toujours_un_cercle(self):
        self.ecran("02-toujours-un-cercle")
        tit = hors_audit(self.t("Toujours un cercle", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        # ⛔ La colonne de texte et la figure de droite doivent s'écarter : à l'ancienne
        #    position, les lignes mordaient sur la figure (vu sur la planche ; BORDS=1
        #    ne voit pas un chevauchement, il ne sort pas du cadre).
        self.play(Write(tit), run_time=0.4)
        u = 1.3
        cs = coupe_sphere(1.4, 0.55, u, P(-4.3, 0.2))
        x = -2.3
        l1 = self.t("Un plan qui coupe une sphère", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Un plan qui coupe")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(cs.cercle, scale=0.85), run_time=0.8)
        l2 = self.t("donne toujours un cercle.", 32, PARA_C)
        self.col(l2, 1.1, x)
        self.au_mot("donne toujours un cercle")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cs.corde), run_time=0.8)
        croix = VGroup(Ellipse(width=1.7, height=0.9, stroke_color=ROUGE_ERREUR, stroke_width=5,
                               fill_opacity=0).move_to(P(5.1, 1.5)),
                       # ⛔ En y = −0,4 le carré barré recevait « Jamais un ovale, jamais
                       #    autre chose. » (y = 0,2) en plein milieu : il descend.
                       Square(1.2, stroke_color=ROUGE_ERREUR, stroke_width=5,
                              fill_opacity=0).move_to(P(5.1, -1.2)))
        barres = VGroup(*[Line(m.get_corner(DL), m.get_corner(UR), color=ROUGE_ERREUR,
                               stroke_width=6) for m in croix])
        l3 = self.ligne([("Jamais un ovale,", ROUGE_ERREUR), ("jamais autre chose.", ROUGE_ERREUR)],
                        30, buff=0.18)
        self.col(l3, 0.2, x)
        self.au_mot("Jamais un ovale")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(croix[0]), Create(barres[0]), run_time=0.8)
        self.au_mot("jamais autre chose")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(croix[1]), Create(barres[1]), run_time=0.8)
        obliques = VGroup(*[Line(cs.centre + P(-1.3 * u, (k - 0.1) * u),
                                 cs.centre + P(1.3 * u, (k + 0.45) * u),
                                 color=PARA_C, stroke_width=4) for k in (-0.75, 0.15)])
        l4 = self.bloc(["Quelle que soit", "l'inclinaison du plan."], 32, VERT_OK)
        self.col(l4, -1.3, x)
        self.au_mot("Quelle que soit")
        self.play(FadeIn(l4, shift=UP * 0.1),
                  LaggedStart(*[Create(o_) for o_ in obliques], lag_ratio=0.3), run_time=1.0)
        self.attendre_voix()

    # ── 03 : le grand cercle ────────────────────────────────────────────────
    def ecran_grand_cercle(self):
        self.ecran("03-le-grand-cercle")
        tit = hors_audit(self.t("Le grand cercle", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.35
        cs = coupe_sphere(1.4, 0.0, u, P(-4.0, 0.0))
        self.add(cs.cercle, cs.centre_pt)
        x = -1.2
        l1 = self.t("Si le plan passe par le centre,", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Si le plan passe")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cs.corde), run_time=0.8)
        l2 = self.bloc(["le cercle est le plus", "grand possible :"], 30, EQUA_C)
        self.col(l2, 1.0, x)
        self.au_mot("le cercle est le plus")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.55)
        l3 = self.t("son rayon est celui de la sphère.", 30, GLOBE_C)
        self.col(l3, 0.0, x)
        self.au_mot("son rayon est celui")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(cs.R_trait), run_time=0.8)
        gl = globe(0.9, 1.0, P(4.9, -1.7))
        l4 = self.t("C'est l'équateur.", 34, EQUA_C)
        self.col(l4, -1.0, x)
        self.au_mot("C'est l'équateur")
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(gl, scale=0.85), run_time=0.9)
        l5 = self.t("On l'appelle un grand cercle.", 34, VERT_OK)
        self.col(l5, -2.0, x)
        self.au_mot("un grand cercle")
        self.play(FadeIn(l5, scale=1.1), Indicate(gl.equateur_t, color=EQUA_C, scale_factor=1.1),
                  run_time=0.8)
        self.attendre_voix()

    # ── 04 : le triangle rectangle caché ────────────────────────────────────
    def ecran_le_triangle(self):
        self.ecran("04-le-triangle")
        tit = hors_audit(self.t("Un triangle caché", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.45
        cs = coupe_sphere(1.4, 0.72, u, P(-4.0, -0.2))
        self.add(cs.cercle, cs.centre_pt)
        x = -1.2
        l1 = self.t("Plus le plan s'éloigne du centre,", 30, WHITE)
        self.col(l1, 2.0, x)
        self.au_mot("Plus le plan s'éloigne")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cs.corde), run_time=0.8)
        l2 = self.t("plus le cercle rétrécit.", 30, PARA_C)
        self.col(l2, 1.2, x)
        self.au_mot("plus le cercle rétrécit")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.5)
        l3 = self.t("Un triangle rectangle caché :", 32, JAUNE_TITRE)
        self.col(l3, 0.3, x)
        self.au_mot("un triangle rectangle caché")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(cs.angle), run_time=0.7)
        l4 = self.ligne([("le rayon de la sphère", GLOBE_B), ("est l'hypoténuse,", GLOBE_B)],
                        28, buff=0.16)
        self.col(l4, -0.6, x)
        self.au_mot("le rayon de la sphère")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(cs.R_trait), run_time=0.8)
        self.au_mot("est l'hypoténuse")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.4)
        l5 = self.t("la distance au centre", 28, DIST_C)
        self.col(l5, -1.5, x)
        self.au_mot("la distance au centre")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(cs.d_trait), run_time=0.8)
        l6 = self.ligne([("et le rayon de la section", PARA_C), ("sont les deux côtés.", PARA_C)],
                        28, buff=0.16)
        self.col(l6, -2.4, x)
        self.au_mot("et le rayon de la section")
        self.play(FadeIn(l6[0], shift=UP * 0.1), Create(cs.r_trait), run_time=0.8)
        self.au_mot("sont les deux côtés")
        self.play(FadeIn(l6[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cs = coupe_sphere(1.2, 0.5, 1.0, P(-5.0, 0.7))

        def avant_q(sc):
            sc.play(FadeIn(cs.cercle), Create(cs.corde), run_time=0.5)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un plan coupe une sphère.", "La section est toujours…"],
                             [self.choix("un ovale"), self.choix("un cercle"),
                              self.choix("un carré")], 1,
                             ["Toujours un cercle,", "quelle que soit", "l'inclinaison du plan."],
                             -0.3,
                             mot_q="Un plan coupe une sphère", avant_q=avant_q)

    # ── 06 : le piège de la distance ────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 1.3
        cer = Circle(radius=1.3 * u, stroke_color=GLOBE_C, stroke_width=5, fill_color=GLOBE_C,
                     fill_opacity=0.12).move_to(P(-4.2, -0.3))
        self.add(cer, Dot(cer.get_center(), radius=0.07, color=WHITE))
        x = -1.2
        loin = Line(cer.get_center() + P(-1.6 * u, 1.55 * u), cer.get_center() + P(1.6 * u, 1.55 * u),
                    color=ROUGE_ERREUR, stroke_width=6)
        l1 = self.bloc(["Si le plan est trop loin", "du centre,"], 32, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Si le plan est trop loin")
        self.play(FadeIn(l1, shift=UP * 0.1), Create(loin), run_time=0.9)
        l2 = self.bloc(["il ne coupe plus", "la sphère du tout."], 32, ROUGE_ERREUR)
        self.col(l2, 0.8, x)
        self.au_mot("il ne coupe plus")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.55)
        dl = Line(cer.get_center(), cer.get_center() + UP * 1.55 * u, color=DIST_C, stroke_width=6)
        rl = Line(cer.get_center(), cer.get_center() + P(1.3 * u, 0), color=GLOBE_B, stroke_width=6)
        l3 = self.t("La distance au centre", 32, DIST_C)
        self.col(l3, -0.5, x)
        self.au_mot("La distance au centre")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(dl), run_time=0.8)
        l4 = self.t("doit rester inférieure au rayon.", 32, VERT_OK)
        self.col(l4, -1.5, x)
        self.au_mot("doit rester inférieure")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(rl), run_time=0.8)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cs = coupe_sphere(1.0, 0.6, 1.1, P(-5.0, 0.7))
        e10 = hors_audit(sur_fond(self.t("10", 24, GLOBE_B))).next_to(cs.R_trait, DOWN, buff=0.06)
        e6 = hors_audit(sur_fond(self.t("6", 24, DIST_C))).next_to(cs.d_trait, LEFT, buff=0.08)

        def avant_q(sc):
            sc.play(FadeIn(cs.cercle), Create(cs.corde), Create(cs.R_trait), Create(cs.d_trait),
                    FadeIn(e10), FadeIn(e6), FadeIn(cs.angle), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             # ⛔ Le premier mot long d'une ligne de question doit être dit JUSTE
                             #    avant son nombre : « Une sphère de rayon 10 » attendait « 10 »
                             #    et mettait « sphère » en TARD de 0,9 s.
                             ["Rayon de la sphère : 10.", "Un plan à 6 du centre.",
                              "Le rayon de la section ?"],
                             [self.choix("4"), self.choix("16"), self.choix("8")], 2,
                             ["10² − 6² = 100 − 36 = 64.", "La racine de 64, c'est 8.",
                              "4, c'est 10 − 6."],
                             -0.3,
                             couper={0: ("10² − 6²", "= 100 − 36", "= 64."),
                                     1: ("La racine de", "64,", "c'est 8."),
                                     2: ("4,", "c'est 10 − 6.")},
                             mot_q="Une sphère de rayon", avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        u = 1.5
        cs = coupe_sphere(1.3, 0.65, u, P(-3.9, -0.4))
        x = 0.8
        l0 = self.t("La Terre :", 32, WHITE)
        self.col(l0, 2.0, x)
        self.au_mot("La Terre")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(cs.cercle, scale=0.85),
                  FadeIn(cs.centre_pt), run_time=0.8)
        l1 = self.ligne([("6 370 km", GLOBE_B), ("de rayon.", WHITE)], 30, buff=0.16)
        hors_audit(l1[0])
        self.col(l1, 1.2, x)
        self.au_mot("6 370")
        self.play(FadeIn(l1[0], scale=1.1), Create(cs.R_trait), run_time=0.5)
        self.au_mot("de rayon.")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.t("Un parallèle passe à", 30, PARA_C)
        self.col(l2, 0.4, x)
        self.au_mot("Un parallèle passe")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cs.corde), run_time=0.8)
        l3 = self.ligne([("3 185 km", DIST_C), ("du centre,", WHITE)], 30, buff=0.16)
        hors_audit(l3[0])
        self.col(l3, -0.4, x)
        self.au_mot("3 185")
        self.play(FadeIn(l3[0], scale=1.1), Create(cs.d_trait), run_time=0.5)
        self.au_mot("du centre")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.t("soit la moitié du rayon.", 30, WHITE)
        self.col(l4, -1.2, x)
        self.au_mot("soit la moitié")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        l5 = self.bloc(["Son rayon,", "arrondi au kilomètre ?"], 34, JAUNE_TITRE)
        self.col(l5, -2.2, x)
        # ⛔ L'au_mot se pose sur « rayon », pas sur « arrondi » : sinon la première ligne
        #    s'affiche 0,6 s après son mot (TARD). Le gabarit sépare ensuite les deux lignes.
        self.au_mot("rayon, arrondi")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(cs.r_trait), run_time=0.9)
        self.pause_gauche()

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        u = 1.2
        cs = coupe_sphere(1.3, 0.65, u, P(-4.6, 0.3))
        self.add(cs.cercle, cs.corde, cs.R_trait, cs.d_trait, cs.r_trait, cs.angle, cs.centre_pt)
        x = -2.3
        l1 = self.t("Le triangle rectangle :", 30, WHITE)
        self.col(l1, 2.1, x)
        self.au_mot("Le triangle rectangle")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        # ⛔ Les nombres à 4 chiffres et plus sortent de l'audit : l'espace des milliers les rend
        #    introuvables dans la voix. Ils sont posés à la main, au mot.
        l2 = self.ligne([("6 370²", GLOBE_B), ("− 3 185²", DIST_C)], 34, buff=0.2)
        hors_audit(l2)
        self.col(l2, 1.2, x)
        self.au_mot("6 370 au carré")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("3 185 au carré")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("≈ 40 576 900", BLEU_D), ("− 10 144 225", BLEU_D)], 28, buff=0.2)
        hors_audit(l3)
        self.col(l3, 0.4, x)
        self.au_mot("40 576 900")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("10 144 225")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.4)
        l4 = self.t("≈ 30 432 675", 32, VERT_OK)
        hors_audit(l4)
        self.col(l4, -0.4, x)
        self.au_mot("30 432 675")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        res = self.gros("≈ 5 517 km", fs=44)
        hors_audit(res)
        self.col(res, -1.5, x)
        self.au_mot("5 517")
        self.play(FadeIn(res, scale=1.12), run_time=0.5)
        self.insister(res, 1.08, 0.25)
        l5 = self.bloc(["plus petit que l'équateur,", "mais pas de moitié."], 30, JAUNE_TITRE)
        self.col(l5, -2.8, x)
        self.au_mot("plus petit que l'équateur")
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("pas de moitié")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        cs = coupe_sphere(1.2, 0.6, 0.95, ORIGIN)
        fig = VGroup(cs.cercle, cs.corde, cs.R_trait, cs.d_trait, cs.r_trait, cs.angle,
                     cs.centre_pt)
        lignes = self.finale_gauche(fig, textes=[
            ("La section d'une sphère", "par un plan est toujours un cercle."),
            ("Par le centre,", "c'est un grand cercle."),
            ("Un triangle rectangle relie le rayon,", "la distance au centre",
             "et le rayon de la section.")], fs=26)
        self.add(fig)
        self.au_mot("La section d'une sphère")
        self.montrer_ligne(lignes[0])
        self.au_mot("Par le centre")
        self.montrer_ligne(lignes[1])
        self.au_mot("un triangle rectangle relie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_toujours_un_cercle()
        self.ecran_grand_cercle()
        self.ecran_le_triangle()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
