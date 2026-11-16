# 4e_solides_defi.py
# EleveAI — Maths 4e — série « Périmètre, aire, volume, solides », épisode S6 : DÉFIS SUR LES SOLIDES
# (micro vision_defi, notion vision_espace), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Vidéo COMMUNE avec la 3e (micro volume_geometrie_espace_defi) : à brancher par `aussi`.
# Décor et métier : Enzo, PILOTE DE DRONE — le relevé d'un bâtiment (centres technologie-ia, transports).
# Mapping micro → écrans : 02 (modéliser : un pavé et une pyramide à la place du bâtiment),
# 03 (les vues donnent les mesures : 20 × 10 de dessus, 6 + 3 de face), 04 (chaque solide à part,
# puis on additionne), 06 (piège : le toit est une pyramide, donc ÷ 3), questions 05 (B : 1 200 m³)
# et 07 (C : 200 m³), défi 08 (seul le corps est chauffé : 1 200 × 30 = 36 000 W, soit 36 kW).
# Voix : manim/voix/4e-solides-defi.json ; marques : 4e_solides_defi_marques.json.
# ⛔ Les milliers s'écrivent avec une ESPACE INSÉCABLE (U+00A0) : l'audit efface l'espace fine
#    (U+202F) et l'espace ordinaire, « 1 200 » devient « 1200 », introuvable dans la voix, et le
#    nombre sort du contrôle (AUDIT-ABSENT, comme dans V4). Avec U+00A0, il reste « 1 » + « 200 ».
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/4e_solides_defi.py SolidesDefi4e
# Sortie : manim/sorties/4e/maths/solides/20-solides-defi/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_commun import *  # noqa: E402,F403
from volume_4e_commun import pave, pyramide, enzo, Paysage4e  # noqa: E402

MUR_C, MUR_D, MUR_B = "#e2e8f0", "#cbd5e1", "#475569"
TOIT_C = "#c084fc"
VUE_C = "#f8fafc"
DRONE_C = "#22d3ee"


def batiment(L, p, h_mur, h_toit, u, o, sw=4, details=True):
    """Le bâtiment relevé par le drone : un pavé (le corps) coiffé d'une pyramide (le toit).
    `details` ajoute les fenêtres, la gouttière et la cheminée — ce que modéliser fait disparaître.
    Attributs : .corps .toit .details"""
    corps = pave(L, p, h_mur, u, o, face=MUR_C, dessus=MUR_D, cote="#94a3b8", bord=MUR_B, sw=sw)
    toit = pyramide(L, h_toit, u, corps.pt(0, 0, h_mur), prof=p, face=TOIT_C, cote_c="#7e22ce", sw=sw)
    det = VGroup()
    if details:
        for i in range(3):
            det.add(Rectangle(width=0.22 * u * L, height=0.3 * u * h_mur, fill_color="#1e293b",
                              fill_opacity=1, stroke_color=MUR_B, stroke_width=2)
                    .move_to(corps.pt(L * (0.2 + 0.3 * i), 0, h_mur * 0.55)))
        det.add(Line(corps.pt(0, 0, h_mur), corps.pt(L, 0, h_mur)).set_stroke("#0ea5e9", 5))
        chem = Rectangle(width=0.16 * u * L, height=0.5 * u * h_toit, fill_color="#7f1d1d",
                         fill_opacity=1, stroke_color="#450a0a", stroke_width=2)
        chem.move_to(toit.pt(L * 0.72, p * 0.3, h_toit * 0.25))
        det.add(chem)
    g = VGroup(corps, toit, det)
    g.corps, g.toit, g.details = corps, toit, det
    return g


def drone(s=1.0, couleur=DRONE_C):
    """Un drone vu de face : le corps, quatre bras, quatre hélices."""
    corps = RoundedRectangle(width=0.55 * s, height=0.22 * s, corner_radius=0.06 * s,
                             fill_color="#334155", fill_opacity=1, stroke_color=couleur, stroke_width=3)
    g = VGroup(corps)
    for sx in (-1, 1):
        for sy in (-1, 1):
            bout = P(sx * 0.45 * s, sy * 0.2 * s)
            g.add(Line(ORIGIN, bout).set_stroke("#64748b", 4))
            g.add(Ellipse(width=0.42 * s, height=0.08 * s, fill_color=couleur, fill_opacity=0.65,
                          stroke_width=0).move_to(bout + UP * 0.05 * s))
    g.add(corps)
    return g


def cadre_vue(contenu, titre, taille=1.9, fs=24):
    """Un cadre de « photo », avec son titre dessous."""
    c = Square(side_length=taille, stroke_color="#475569", stroke_width=3,
               fill_color="#0f172a", fill_opacity=0.9)
    contenu.move_to(c.get_center())
    t = hors_audit(Text(titre, font_size=fs, color=VUE_C, weight=BOLD)).next_to(c, DOWN, buff=0.12)
    g = VGroup(c, contenu, t)
    g.cadre, g.contenu = c, contenu
    return g


class SolidesDefi4e(Paysage4e):
    nom_voix = "4e-solides-defi"
    fichier_marques = "4e_solides_defi_marques.json"
    ceinture = "bleue"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les solides", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis sur les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment calculer le volume", "d'un bâtiment entier ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        b = batiment(1.8, 1.1, 0.9, 0.7, 0.72, P(2.4, -1.8))
        d = drone(1.1).move_to(P(4.6, 1.3))
        self.au_mot("Comment calculer le volume")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(b, scale=0.85), run_time=0.5)
        self.au_mot("d'un bâtiment entier")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(d, shift=DOWN * 0.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = enzo(1.0).move_to(P(-5.2, 0.3))
        self.au_mot("Voici Enzo")
        nom = self.t("Enzo", 40, BLEU_CALCUL).next_to(p, UP, buff=0.25)
        self.play(FadeIn(p, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il pilote un drone")
        met = self.t("pilote de drone", 22, BLEU_CALCUL).next_to(p, DOWN, buff=0.2)
        d = drone(1.2).move_to(P(5.3, 2.5))   # ⛔ à 2.0 il se posait sur la colonne de texte
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(d, shift=DOWN * 0.3), run_time=0.6)
        x = -2.6
        l1 = self.t("qui relève des bâtiments.", 32, WHITE)
        self.col(l1, 1.8, x)
        b = batiment(1.6, 1.0, 0.85, 0.65, 0.8, P(2.6, -2.2))
        self.au_mot("qui relève des bâtiments")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(b, scale=0.9), run_time=0.7)
        l2 = self.bloc(["Le drone prend des photos", "de dessus et de côté."], 30, WHITE)
        self.col(l2, 0.8, x)
        self.au_mot("Le drone prend des photos")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("de dessus et de côté")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.45)
        l3 = self.bloc(["Ensuite, Enzo remplace le bâtiment", "par des solides simples :"], 30, WHITE)
        self.col(l3, -0.4, x)
        self.au_mot("Ensuite, Enzo remplace le bâtiment")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("par des solides simples")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.45)
        l4 = self.t("c'est modéliser.", 36, JAUNE_TITRE)
        self.col(l4, -1.6, x)
        self.au_mot("c'est ce qu'on appelle modéliser")
        self.play(FadeIn(l4, scale=1.12), run_time=0.55)
        self.insister(l4, 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : modéliser ──────────────────────────────────────────────────────
    def ecran_modeliser(self):
        self.ecran("02-modeliser")
        u = 1.0
        b = batiment(1.7, 1.1, 1.0, 0.8, u, P(-5.8, -1.9))
        self.add(b)
        self.au_mot("Modéliser, c'est oublier les détails")
        tit = self.t("Modéliser", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        l1 = self.t("c'est oublier les détails.", 32, WHITE)
        x = -1.6
        self.col(l1, 2.0, x)
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), run_time=0.7)
        l2 = self.bloc(["Les fenêtres, la gouttière,", "la cheminée :", "on les enlève."], 30, ROUGE_ERREUR)
        self.col(l2, 1.0, x)
        self.au_mot("Les fenêtres, la gouttière")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(b.details, color=ROUGE_ERREUR,
                                                          scale_factor=1.1), run_time=0.6)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on les enlève")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeOut(b.details), run_time=0.6)
        l3 = self.ligne([("Il reste un pavé", MUR_C), ("pour le corps,", WHITE)], 30, buff=0.18)
        self.col(l3, -0.2, x)
        self.au_mot("Il reste un pavé")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(b.corps, color=MUR_C, scale_factor=1.05),
                  run_time=0.6)
        self.au_mot("pour le corps du bâtiment")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.4)
        l4 = self.t("et une pyramide pour le toit.", 32, TOIT_C)
        self.col(l4, -1.3, x)
        self.au_mot("et une pyramide pour le toit")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(b.toit, color=TOIT_C, scale_factor=1.06),
                  run_time=0.7)
        self.attendre_voix()

    # ── 03 : les vues donnent les mesures ───────────────────────────────────
    def ecran_les_vues(self):
        self.ecran("03-les-vues")
        self.au_mot("Les photos donnent les mesures")
        tit = self.t("Les photos donnent les mesures", 42, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.6)
        vd = cadre_vue(Rectangle(width=1.4, height=0.7, color=VUE_C, stroke_width=4), "de dessus")
        vd.move_to(P(-4.4, 0.9))
        x = -1.5
        l1 = self.ligne([("De dessus :", VUE_C), ("20 m", BASE_C), ("sur 10 m.", BASE_C)], 32, buff=0.16)
        self.col(l1, 2.0, x)
        self.au_mot("De dessus")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(vd, shift=UP * 0.2), run_time=0.6)
        self.au_mot("un rectangle de 20 mètres")
        c20 = hors_audit(sur_fond(self.t("20 m", 22, BASE_C))).next_to(vd.contenu, DOWN, buff=0.08)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c20), run_time=0.45)
        self.au_mot("sur 10")
        c10 = hors_audit(sur_fond(self.t("10 m", 22, BASE_C))).next_to(vd.contenu, LEFT, buff=0.08)
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(c10), run_time=0.45)

        def face_vue():
            r = Rectangle(width=1.3, height=0.75, color=VUE_C, stroke_width=4)
            t = Polygon(r.get_corner(UL), r.get_corner(UR), r.get_top() + UP * 0.45,
                        color=VUE_C, stroke_width=4)
            g = VGroup(r, t)
            g.mur, g.toit = r, t
            return g

        fv = face_vue()
        vf = cadre_vue(fv, "de face").move_to(P(-4.4, -2.0))
        l2 = self.ligne([("De face :", VUE_C), ("un mur de 6 m,", HAUTEUR_C)], 32, buff=0.16)
        self.col(l2, 0.9, x)
        self.au_mot("De face")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(vf, shift=UP * 0.2), run_time=0.6)
        self.au_mot("un mur de 6 mètres de haut")
        c6 = hors_audit(sur_fond(self.t("6 m", 22, HAUTEUR_C))).next_to(fv.mur, RIGHT, buff=0.08)
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(c6), run_time=0.5)
        l3 = self.t("surmonté d'un toit de 3 m.", 32, TOIT_C)
        self.col(l3, -0.1, x)
        self.au_mot("surmonté d'un toit de 3 mètres")
        c3 = hors_audit(sur_fond(self.t("3 m", 22, TOIT_C))).next_to(fv.toit, RIGHT, buff=0.08)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(c3), run_time=0.6)
        self.attendre_voix()

    # ── 04 : chaque solide à part ───────────────────────────────────────────
    def ecran_decouper(self):
        self.ecran("04-decouper")
        # ⭐ Le titre redit « solide », mot prononcé APRÈS « calcule » : hors_audit le sort de la
        #    synchro, sinon le gabarit attend « solide » et « calcule » est compté en TARD.
        self.au_mot("On calcule chaque solide séparément")
        tit = hors_audit(self.t("Un solide à la fois", 44, JAUNE_TITRE)).move_to(P(0, 3.15))
        u = 0.95
        corps = pave(1.8, 1.1, 1.0, u, P(-5.9, -2.3), face=MUR_C, dessus=MUR_D, cote="#94a3b8",
                     bord=MUR_B)
        toit = pyramide(1.8, 0.85, u, P(-5.9, 0.1), prof=1.1, face=TOIT_C, cote_c="#7e22ce")
        x = -1.2
        l1 = self.t("On calcule chaque solide séparément,", 30, WHITE)
        self.col(l1, 2.0, x)
        self.play(Write(tit), FadeIn(l1, shift=UP * 0.1), FadeIn(toit, shift=UP * 0.2), run_time=0.7)
        l2 = self.t("puis on additionne.", 34, VERT_OK)
        self.col(l2, 1.0, x)
        self.au_mot("puis on additionne")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(corps, shift=UP * 0.2), run_time=0.7)
        somme = self.ligne([("toit", TOIT_C), ("+", WHITE), ("corps", MUR_C)], 36, buff=0.22)
        self.col(somme, -0.2, x)
        self.play(FadeIn(somme, scale=1.1), run_time=0.5)
        l3 = self.t("Jamais tout d'un coup.", 34, ROUGE_ERREUR)
        self.col(l3, -1.4, x)
        self.au_mot("Jamais tout d'un coup")
        self.play(FadeIn(l3, scale=1.1), run_time=0.55)
        self.insister(l3, 1.06, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u = 0.75
        corps = pave(1.9, 1.2, 1.0, u, P(-5.2, 0.6), face=MUR_C, dessus=MUR_D, cote="#94a3b8",
                     bord=MUR_B)
        cotes = VGroup(
            hors_audit(sur_fond(self.t("20 m", 22, BASE_C))).next_to(corps.face, DOWN, buff=0.1),
            hors_audit(sur_fond(self.t("10 m", 22, BASE_C))).next_to(corps.cote, RIGHT, buff=0.08),
            hors_audit(sur_fond(self.t("6 m", 22, HAUTEUR_C))).next_to(corps.face, LEFT, buff=0.1))

        def avant_q(sc):
            sc.play(FadeIn(corps), FadeIn(cotes), run_time=0.5)

        self.question_gauche("05-question", "05b-reponse",
                             ["Le volume du corps ?"],
                             [self.choix("360 m³"), self.choix("1 200 m³"), self.choix("120 m³")], 1,
                             ["20 × 10 = 200 m²", "200 × 6 = 1 200 m³.",
                              "360 : une addition."],
                             -0.3,
                             couper={0: ("20", "× 10", "= 200 m²"),
                                     1: ("200", "× 6", "= 1 200 m³."),
                                     2: ("360 :", "une addition.")},
                             avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege", 0.65)
        tit = self.t("Attention au piège !", 48, ORANGE_Q).move_to(P(0, 3.15))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.4)
        u = 0.9
        toit = pyramide(1.8, 0.9, u, P(-5.9, -0.6), prof=1.1, face=TOIT_C, cote_c="#7e22ce")
        faux = pave(1.8, 1.1, 0.9, u, P(-5.9, -2.9), face="#7f1d1d", dessus="#991b1b",
                    cote="#450a0a", bord=ROUGE_ERREUR, op=0.6)
        x = -1.5
        l1 = self.t("Le toit n'est pas un pavé.", 32, ROUGE_ERREUR)
        self.col(l1, 2.0, x)
        self.au_mot("Le toit n'est pas un pavé")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(faux), run_time=0.6)
        croix = Cross(faux, stroke_color=ROUGE_ERREUR, stroke_width=8).scale(0.7)
        self.play(Create(croix), run_time=0.4)
        l2 = self.ligne([("C'est une pyramide :", TOIT_C), ("on n'oublie pas le", WHITE),
                         ("÷ 3.", JAUNE_TITRE)], 30, buff=0.16)
        self.col(l2, 0.9, x)
        self.au_mot("C'est une pyramide")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(toit), run_time=0.6)
        self.au_mot("on n'oublie pas le divisé par 3")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[2], scale=1.25), run_time=0.35)
        l3 = self.bloc(["Sinon le bâtiment devient", "bien plus gros qu'il n'est."], 32, ROUGE_ERREUR)
        self.col(l3, -0.5, x)
        self.au_mot("sinon le bâtiment devient")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        u = 0.75
        toit = pyramide(2.0, 1.1, u, P(-5.9, 0.6), prof=1.2, face=TOIT_C, cote_c="#7e22ce")
        cotes = VGroup(
            hors_audit(sur_fond(self.t("base 200 m²", 22, BASE_C))).next_to(toit.base, DOWN, buff=0.1),
            hors_audit(sur_fond(self.t("3 m", 22, HAUTEUR_C))).next_to(toit.hh, RIGHT, buff=0.08))

        def avant_q(sc):
            sc.play(FadeIn(toit), FadeIn(toit.hh), FadeIn(cotes), run_time=0.5)

        self.question_gauche("07-question", "07b-reponse",
                             ["Le volume du toit ?"],
                             [self.choix("600 m³"), self.choix("300 m³"), self.choix("200 m³")], 2,
                             ["200 × 3 = 600.", "÷ 3 = 200 m³.", "600 : l'oubli du ÷ 3."],
                             -0.3,
                             couper={0: ("200", "× 3", "= 600."),
                                     1: ("÷ 3", "= 200 m³."),
                                     2: ("600 :", "l'oubli du ÷ 3.")},
                             avant_q=avant_q)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b = batiment(1.8, 1.1, 1.0, 0.8, 0.85, P(-5.9, -2.3), details=False)
        x = 0.4
        l0 = self.t("Enzo chiffre le chauffage.", 30, WHITE)
        self.col(l0, 2.1, x)
        self.au_mot("Enzo doit chiffrer le chauffage")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.7)
        l1 = self.ligne([("Le corps :", MUR_C), ("1 200 m³.", BLEU_D)], 30, buff=0.16)
        self.col(l1, 1.2, x)
        self.au_mot("le corps, 1 200 mètres cubes")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("Le toit :", TOIT_C), ("200 m³.", BLEU_D)], 30, buff=0.16)
        self.col(l2, 0.4, x)
        self.au_mot("et le toit, 200 mètres cubes")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        l3 = self.t("30 watts par mètre cube,", 30, JAUNE_TITRE)
        self.col(l3, -0.4, x)
        self.au_mot("30 watts par mètre cube")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.45)
        l4 = self.t("mais le toit n'est pas chauffé.", 30, ROUGE_ERREUR)
        self.col(l4, -1.2, x)
        self.au_mot("mais le toit n'est pas chauffé")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(b.toit, color=ROUGE_ERREUR, scale_factor=1.06),
                  run_time=0.6)
        l5 = self.t("Quelle puissance faut-il ?", 32, JAUNE_TITRE)
        self.col(l5, -2.1, x)
        self.au_mot("Quelle puissance faut-il")
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.5)
        self.pause_defi(y=-3.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = batiment(1.6, 1.0, 0.9, 0.7, 0.8, P(-5.9, -1.7), details=False)
        self.add(b)
        x = -2.2
        l1 = self.ligne([("Seul le corps est chauffé :", MUR_C), ("1 200 m³.", VERT_OK)], 30, buff=0.16)
        self.col(l1, 2.1, x)
        self.au_mot("Seul le corps est chauffé")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(b.corps, color=MUR_C, scale_factor=1.05),
                  run_time=0.6)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l2 = self.ligne([("1 200", BLEU_D), ("× 30", BLEU_D), ("= 36 000 W", VERT_OK)], 32, buff=0.18)
        self.col(l2, 1.1, x)
        self.au_mot("1 200 fois 30")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("36 000 watts")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.4)
        l3 = self.t("soit 36 kW.", 36, VERT_OK)
        self.col(l3, 0.1, x)
        self.au_mot("soit 36 kilowatts")
        self.play(FadeIn(l3, scale=1.2), run_time=0.5)
        self.insister(l3, 1.1, 0.25)
        l4 = self.ligne([("Avec le toit :", ROUGE_ERREUR), ("6 000 W", ROUGE_ERREUR),
                         ("pour rien.", ROUGE_ERREUR)], 30, buff=0.16)
        self.col(l4, -1.1, x)
        self.au_mot("Si Enzo avait compté le toit")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        # ⛔ « 6 000 watts » est contenu dans « 36 000 watts » : find() trouvait le premier.
        self.au_mot("ajouté 6 000")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pour rien")
        self.play(FadeIn(l4[2], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = batiment(1.5, 0.9, 0.8, 0.65, 0.75, ORIGIN, details=False)
        lignes = self.finale_gauche(b, textes=[
            ("Modéliser, c'est remplacer un objet", "réel par des solides simples."),
            ("On calcule chaque solide,", "puis on additionne."),
            ("Et on lit les mesures", "sur les vues.")], fs=28)
        self.add(b)
        self.au_mot("Modéliser, c'est remplacer")
        self.montrer_ligne(lignes[0], Indicate(b, color=JAUNE_TITRE, scale_factor=1.05))
        self.au_mot("On calcule chaque solide")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et on lit les mesures")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_modeliser()
        self.ecran_les_vues()
        self.ecran_decouper()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
