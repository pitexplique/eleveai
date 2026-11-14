# longueur_relations.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 02 : LES RELATIONS ENTRE LES UNITÉS
# (micro ce2_longueur_relations, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (la ficelle du cerf-volant, réponse A).
# Décor et métier : Nina, ENTRAÎNEUSE D'ATHLÉTISME (centre : sport).
# Mapping micro → écrans : 02 (1 m = 100 cm, le mètre ruban), 03 (1 m = 10 dm, 1 dm = 10 cm),
# 04 (1 cm = 10 mm, la loupe), 06 (1 km = 1000 m, la piste), 07 (piège : 1 m n'est pas 10 cm),
# questions 05 (cm dans 1 m, C) et 08 (2 m en cm, B), défi 09 (1 m 30 cm = 130 cm).
# ⛔ Pas de tableau de conversion, pas de virgule (banque CE2).
# Voix : manim/voix/ce2-longueur-relations.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_relations_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:relations).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_relations.py LongueurRelationsCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_relations.py LongueurRelationsCE2 -o eleveai-maths-ce2-longueur-relations --media_dir manim/scripts/ce2/media-lg-02
# Sortie : manim/sorties/ce2/maths/longueur/02-relations/eleveai-maths-ce2-longueur-relations.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

SABLE = "#fcd34d"
PISTE = "#c2410c"
RUBAN_M = "#fde047"   # le mètre ruban jaune de Nina
DM_A, DM_B = "#38bdf8", "#0ea5e9"


def metre_ruban(W=11.0, h=0.55, nums=True, fs=16):
    """Le mètre ruban : une bande jaune de W unités = 100 cm, 100 graduations,
    un grand trait tous les 10 cm (numéroté 10, 20, … 90, hors audit), un trait moyen tous les 5."""
    b = Rectangle(width=W, height=h, fill_color=RUBAN_M, fill_opacity=1, stroke_color="#a16207", stroke_width=3)
    tr, nb = VGroup(), VGroup()
    x0, haut = -W / 2, h / 2
    for k in range(101):
        x = x0 + k * W / 100
        lg, sw = (h * 0.5, 2.5) if k % 10 == 0 else ((h * 0.33, 1.6) if k % 5 == 0 else (h * 0.2, 1.0))
        tr.add(Line(P(x, haut), P(x, haut - lg), color=TRAIT, stroke_width=sw))
        if nums and k % 10 == 0 and 0 < k < 100:
            nb.add(hors_audit(Text(str(k), font_size=fs, color=TRAIT, weight=BOLD).move_to(P(x, -h * 0.22))))
    g = VGroup(b, tr, nb)
    g.bande, g.traits, g.nums = b, tr, nb
    return g


def piste(W=8.0, h=0.9):
    """Une piste d'athlétisme vue de côté : bande brique, deux couloirs blancs."""
    p = Rectangle(width=W, height=h, fill_color=PISTE, fill_opacity=1, stroke_width=0)
    lignes = VGroup(*[Line(p.get_left() + UP * y, p.get_right() + UP * y, color=WHITE, stroke_width=2)
                      for y in (-h * 0.18, h * 0.18)])
    return VGroup(p, lignes)


def coureur(s=1.0, couleur="#f8fafc"):
    """Un petit coureur en bâtons, en pleine foulée."""
    tete = Circle(radius=0.13 * s, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0.05 * s, 0.55 * s))
    corps = Line(P(0, 0.42 * s), P(-0.05 * s, 0.05 * s), color=couleur, stroke_width=6 * s)
    jambes = VGroup(Line(P(-0.05 * s, 0.05 * s), P(0.2 * s, -0.35 * s), color=couleur, stroke_width=5 * s),
                    Line(P(-0.05 * s, 0.05 * s), P(-0.3 * s, -0.3 * s), color=couleur, stroke_width=5 * s))
    bras = VGroup(Line(P(0, 0.33 * s), P(0.25 * s, 0.15 * s), color=couleur, stroke_width=4 * s),
                  Line(P(0, 0.33 * s), P(-0.22 * s, 0.2 * s), color=couleur, stroke_width=4 * s))
    return VGroup(corps, jambes, bras, tete)


def bac_sable(W=3.0, h=0.45):
    return RoundedRectangle(width=W, height=h, corner_radius=0.1, fill_color=SABLE, fill_opacity=1,
                            stroke_color="#b45309", stroke_width=3)


def main_ouverte(s=1.0, couleur="#e0ac69"):
    paume = RoundedRectangle(width=1.0 * s, height=0.9 * s, corner_radius=0.2 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    doigts = VGroup(*[RoundedRectangle(width=0.2 * s, height=(0.62 + 0.1 * (k in (1, 2))) * s,
                                       corner_radius=0.09 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
                      for k in range(4)]).arrange(RIGHT, buff=0.04 * s, aligned_edge=DOWN)
    doigts.next_to(paume, UP, buff=-0.12 * s)
    pouce = RoundedRectangle(width=0.2 * s, height=0.55 * s, corner_radius=0.09 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).rotate(0.7).next_to(paume, LEFT, buff=-0.12 * s)
    return VGroup(paume, doigts, pouce)


class LongueurRelationsBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-relations"
    fichier_marques = "longueur_relations_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les relations entre les unités", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les relations entre les unités")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de centimètres", "dans un mètre ?"], 38, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        mr = metre_ruban(4.6, 0.4, nums=False).move_to(P(3.3, 0.4))
        self.au_mot("Combien de centimètres")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(mr, shift=LEFT * 0.3), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nina, entraîneuse d'athlétisme ─────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = nina(0.95).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Nina")
        nom = self.t("Nina", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("entraîneuse d'athlétisme")
        met = self.bloc(["entraîneuse", "d'athlétisme"], 24, "#fca5a5", buff=0.06).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        bs = bac_sable(3.0).move_to(P(-0.4, 1.0))
        sau = coureur(0.9).next_to(bs, UP, buff=0.05).shift(LEFT * 0.6)
        pi = piste(5.0, 0.8).move_to(P(1.8, -0.8))
        cou = VGroup(coureur(0.8), coureur(0.8, "#93c5fd")).arrange(RIGHT, buff=0.7).next_to(pi, UP, buff=0.0)
        self.au_mot("sautent dans le sable")
        self.play(FadeIn(bs, shift=UP * 0.2), FadeIn(sau, shift=RIGHT * 0.4), run_time=0.4)
        self.play(sau.animate.shift(RIGHT * 1.2 + UP * 0.0), run_time=0.4)
        self.au_mot("courent sur la piste")
        self.play(FadeIn(pi, shift=LEFT * 0.3), FadeIn(cou, shift=RIGHT * 0.5), run_time=0.45)
        self.au_mot("Nina mesure tout")
        l0 = self.t("Nina mesure tout :", 36, JAUNE_TITRE)
        gauche(l0, -3.0, -2.15)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        us = self.ligne([("en m,", VERT_OK), ("en cm,", VERT_OK), ("et même en km !", VERT_OK)], 36, buff=0.3)
        us.next_to(l0, DOWN, buff=0.3).align_to(l0, LEFT)
        for k, mot in enumerate(["en mètres", "en centimètres", "même en kilomètres"]):
            self.au_mot(mot)
            self.play(FadeIn(us[k], scale=1.15), run_time=0.3)
        self.attendre_voix()

    # ── 02 : 1 m = 100 cm ───────────────────────────────────────────────────
    def ecran_metre_cm(self):
        self.ecran("02-metre-cm")
        mr = metre_ruban(11.0).move_to(P(-0.4, 1.2))
        self.au_mot("Sur le mètre ruban de Nina")
        l0 = self.t("Le mètre ruban de Nina :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(mr.bande, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("100 graduations")
        self.play(LaggedStart(*[Create(t) for t in mr.traits], lag_ratio=0.01), FadeIn(mr.nums), run_time=1.0)
        acc = Brace(mr, DOWN, color=JAUNE_TITRE)
        e = hors_audit(self.t("100 cm", 40, JAUNE_TITRE)).next_to(acc, DOWN, buff=0.1)
        self.au_mot("100 centimètres")
        self.wait(0.07)
        self.play(GrowFromCenter(acc), FadeIn(e, scale=1.2), run_time=0.35)
        res = self.ligne([("1 m", BLEU_D), ("= 100 cm", VERT_OK)], 60, buff=0.35)
        gauche(res, -6.0, -1.6)
        hors_audit(res[1])  # « 100 » déjà dit (« 100 graduations ») : posé à son extrait
        self.aux_extraits([res[0], res[1]], ["1 mètre égale", ("100 centimètres", 2)])
        self.au_mot("Centi veut dire cent")
        l1 = self.t("« centi » veut dire cent", 34, ORANGE_RETENUE)
        gauche(l1, -6.0, -2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : 1 m = 10 dm ; 1 dm = 10 cm ─────────────────────────────────────
    def ecran_metre_dm(self):
        self.ecran("03-metre-dm")
        W = 11.0
        dms = VGroup(*[Rectangle(width=W / 10, height=0.55, fill_color=(DM_A, DM_B)[k % 2], fill_opacity=0.9,
                                 stroke_color=WHITE, stroke_width=2) for k in range(10)]).arrange(RIGHT, buff=0)
        dms.move_to(P(-0.4, 2.0))
        self.au_mot("couper le mètre en 10")
        l0 = self.t("On coupe le mètre en 10 grands morceaux.", 32, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(d, shift=DOWN * 0.15) for d in dms],
                                                         lag_ratio=0.08), run_time=0.8)
        nums = VGroup(*[hors_audit(self.t(str(k + 1), 22, WHITE)).move_to(d) for k, d in enumerate(dms)])
        self.au_mot("10 décimètres")
        self.play(LaggedStart(*[FadeIn(n, scale=1.3) for n in nums], lag_ratio=0.06), run_time=0.6)
        r1 = self.ligne([("1 m", BLEU_D), ("= 10 dm", VERT_OK)], 50, buff=0.3)
        gauche(r1, 0.8, 0.9)
        hors_audit(r1[1])  # « 10 » déjà dit (« en 10 grands morceaux ») : posé à son extrait
        self.aux_extraits([r1[0], r1[1]], ["1 mètre égale", ("10 décimètres", 2)])
        un = dms[0]
        zoom = metre_ruban(5.5, 0.5, nums=False)
        # le zoom ne garde que les 10 premiers centimètres : on dessine 10 cm sur 5,5 unités
        z = VGroup(Rectangle(width=5.5, height=0.55, fill_color=DM_A, fill_opacity=0.9, stroke_color=WHITE,
                             stroke_width=2),
                   *[Line(P(-2.75 + k * 0.55, 0.275), P(-2.75 + k * 0.55, 0.0), color=WHITE, stroke_width=3)
                     for k in range(11)])
        z.move_to(P(-3.2, -0.5))
        del zoom
        traits = VGroup(DashedLine(un.get_corner(DL), z.get_corner(UL), color=GRAY_B),
                        DashedLine(un.get_corner(DR), z.get_corner(UR), color=GRAY_B))
        r2 = self.ligne([("1 dm", BLEU_D), ("= 10 cm", VERT_OK)], 50, buff=0.3)
        gauche(r2, 0.8, -0.6)
        hors_audit(r2[0])  # « 1 » déjà dit (« 1 mètre égale ») : posé à « 1 décimètre »
        hors_audit(r2[1])
        self.au_mot("1 décimètre")
        self.play(Indicate(un, color=ORANGE_RETENUE), Create(traits), FadeIn(z[0]), FadeIn(r2[0], shift=UP * 0.08),
                  run_time=0.4)
        self.au_mot("10 centimètres")
        self.wait(0.07)
        self.play(LaggedStart(*[Create(l) for l in z[1:]], lag_ratio=0.05), FadeIn(r2[1], shift=UP * 0.08),
                  run_time=0.5)
        mo = main_ouverte(0.8).next_to(z, DOWN, buff=0.25)
        self.play(FadeIn(mo, scale=1.1), run_time=0.3)
        self.insister(VGroup(r1, r2), 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : 1 cm = 10 mm ───────────────────────────────────────────────────
    def ecran_cm_mm(self):
        self.ecran("04-cm-mm")
        r = regle(6, 1.0, mm=True).move_to(P(-2.8, 1.6))
        self.add(r)
        self.au_mot("Regarde un centimètre de plus près")
        l0 = self.t("Un centimètre, de plus près :", 34, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        cadre = Rectangle(width=r.x(3) - r.x(2), height=0.8, color=ORANGE_RETENUE, stroke_width=4)
        cadre.move_to(P((r.x(2) + r.x(3)) / 2, r.haut() - 0.25))
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cadre), run_time=0.4)
        Z = 7.0
        gros = VGroup(Rectangle(width=Z, height=1.0, fill_color=BOIS, fill_opacity=1, stroke_color=BOIS_B,
                                stroke_width=3))
        for k in range(11):
            lg = 0.55 if k in (0, 10) else (0.38 if k == 5 else 0.25)
            gros.add(Line(P(-Z / 2 + k * Z / 10, 0.5), P(-Z / 2 + k * Z / 10, 0.5 - lg), color=TRAIT,
                          stroke_width=3 if k in (0, 10) else 2))
        gros.move_to(P(0.2, -0.75))
        traits = VGroup(DashedLine(cadre.get_corner(DL), gros.get_corner(UL), color=GRAY_B),
                        DashedLine(cadre.get_corner(DR), gros.get_corner(UR), color=GRAY_B))
        self.play(Create(traits), FadeIn(gros[0], scale=0.6), run_time=0.45)
        self.au_mot("10 tout petits traits")
        self.play(LaggedStart(*[Create(l) for l in gros[1:]], lag_ratio=0.08), run_time=0.7)
        res = self.ligne([("1 cm", BLEU_D), ("= 10 mm", VERT_OK)], 60, buff=0.35)
        gauche(res, -5.0, -2.5)
        hors_audit(res[1])  # « 10 » déjà dit (« 10 tout petits traits ») : posé à son extrait
        self.aux_extraits([res[0], res[1]], ["1 centimètre égale", ("10 millimètres", 1)])
        self.insister(res, 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        mr = metre_ruban(4.4, 0.45, nums=False).move_to(P(-3.6, 1.6))

        def autres_q(sc):
            sc.play(FadeIn(mr, shift=LEFT * 0.2), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(mr, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Combien de centimètres", "dans 1 mètre ?"],
                             [self.choix("10"), self.choix("1000"), self.choix("100")], 2,
                             ["1 m = 100 cm.", "10, c'est le nombre", "de dm dans 1 m."],
                             -0.75, sans_audit=(1,), mot_q="Combien de centimètres", autres_q=autres_q, autres_r=apres)

    # ── 06 : 1 km = 1000 m ──────────────────────────────────────────────────
    def ecran_km(self):
        self.ecran("06-km")
        self.au_mot("Pour les grandes distances")
        l0 = self.t("Pour les grandes distances :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("kilo veut dire mille")
        l1 = self.t("« kilo » veut dire mille", 32, ORANGE_RETENUE)
        gauche(l1, -6.0, 2.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        res = self.ligne([("1 km", BLEU_D), ("= 1000 m", VERT_OK)], 60, buff=0.35)
        gauche(res, -6.0, 1.1)
        hors_audit(res[1])  # « 1000 » : « mille » dit avant ; posé à son extrait
        self.aux_extraits([res[0], res[1]], ["1 kilomètre égale", ("1000 mètres", 1)])
        pi = piste(10.5, 0.8).move_to(P(-0.5, -1.2))
        dep = Line(pi.get_corner(UL) + DOWN * 0.0, pi.get_corner(DL), color=WHITE, stroke_width=6)
        arr = Line(pi.get_corner(UR), pi.get_corner(DR), color=WHITE, stroke_width=6)
        cou = coureur(0.9).next_to(pi, UP, buff=0.0).align_to(pi, LEFT).shift(RIGHT * 0.1)
        self.au_mot("Quand les élèves de Nina courent")
        self.play(FadeIn(pi, shift=UP * 0.2), Create(dep), Create(arr), FadeIn(cou), run_time=0.45)
        self.au_mot("1 kilomètre", 2)
        fl = fleche_double(pi.get_corner(DL) + DOWN * 0.3, pi.get_corner(DR) + DOWN * 0.3)
        ek = hors_audit(self.t("1 km", 34, JAUNE_TITRE)).next_to(fl, DOWN, buff=0.1)
        self.play(cou.animate.align_to(pi, RIGHT).shift(LEFT * 0.1), GrowFromCenter(fl), FadeIn(ek), run_time=1.0)
        self.au_mot("ils courent 1000 mètres")
        em = hors_audit(self.t("= 1000 m", 34, VERT_OK)).next_to(ek, RIGHT, buff=0.2)
        self.play(FadeIn(em, scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 07 : le piège : 1 m n'est pas 10 cm ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        fx = self.ligne([("1 m", WHITE), ("= 10 cm", ROUGE_ERREUR)], 54, buff=0.3)
        gauche(fx, -6.0, 1.9)
        self.au_mot("1 mètre")
        self.play(FadeIn(fx[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("10 centimètres")
        croix = Cross(fx, stroke_color=ROUGE_ERREUR, stroke_width=6, scale_factor=1.1)
        self.play(FadeIn(fx[1], shift=UP * 0.1), run_time=0.25)
        self.play(Create(croix), run_time=0.3)
        U = 0.09  # 1 cm = 0,09 unité : 100 cm = 9 unités
        r10 = ruban(10 * U, RUBAN, 0.4).move_to(P(-5.5, 0.4)).align_to(P(-5.9, 0), LEFT)
        mo = main_ouverte(0.75).next_to(r10, RIGHT, buff=0.35)
        e10 = hors_audit(self.t("10 cm : la largeur d'une main", 30, RUBAN))
        e10.next_to(mo, RIGHT, buff=0.35)
        self.au_mot("10 centimètres", 2)
        self.wait(0.07)
        self.play(FadeIn(r10, shift=RIGHT * 0.2), FadeIn(mo, scale=1.1), FadeIn(e10), run_time=0.4)
        r100 = ruban(100 * U, VERT_OK, 0.4).move_to(P(0, -1.2)).align_to(P(-5.9, 0), LEFT)
        e100 = self.ligne([("1 m", VERT_OK), ("= 100 cm", VERT_OK)], 40, buff=0.25)
        e100.next_to(r100, DOWN, buff=0.25).align_to(r100, LEFT)
        hors_audit(e100[1])  # « 100 » : déjà dit à l'écran 02 ; posé à son extrait
        self.au_mot("1 mètre, c'est bien plus")
        self.play(GrowFromEdge(r100, LEFT), FadeIn(e100[0]), run_time=0.8)
        self.aux_extraits([e100[1]], ["100 centimètres"])
        self.insister(e100, 1.15, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bs = bac_sable(3.0, 0.4).move_to(P(-3.8, 1.2))
        lou = coureur(0.9).next_to(bs, UP, buff=0.0).align_to(bs, LEFT).shift(RIGHT * 0.2)

        def autres_q(sc):
            sc.play(FadeIn(bs), FadeIn(lou), run_time=0.35)
            sc.play(lou.animate.align_to(bs, RIGHT).shift(LEFT * 0.2), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(bs, color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("08-question", "08b-reponse",
                             ["Lou saute 2 mètres.", "Combien de centimètres ?"],
                             [self.choix("20 cm"), self.choix("200 cm"), self.choix("2000 cm")], 1,
                             ["1 m = 100 cm.", "2 m : 2 × 100", "= 200 cm."],
                             -0.75, couper={1: ("2 m :", "2 × 100")}, mot_q="Lou saute",
                             autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi (1 m 30 cm) ────────────────────────────────────────────
    def saut(self):
        bs = bac_sable(9.0, 0.45).move_to(P(-0.6, -0.3))
        U = 9.0 / 150  # 150 cm de sable
        x0 = bs.get_left()[0]
        a = ruban(100 * U, VERT_OK, 0.3).move_to(P(x0 + 50 * U, 0.35))
        b = ruban(30 * U, RUBAN, 0.3).move_to(P(x0 + 115 * U, 0.35))
        tr = Line(P(x0 + 130 * U, -0.6), P(x0 + 130 * U, 0.0), color=WHITE, stroke_width=5)
        return VGroup(bs, a, b, tr), U, x0

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        (bs, a, b, tr), U, x0 = self.saut()
        sami = coureur(1.0).next_to(bs, UP, buff=0.0).align_to(bs, LEFT)
        self.au_mot("Sami saute")
        l0 = self.ligne([("Sami saute", WHITE), ("1 m", VERT_OK), ("et", WHITE), ("30 cm.", RUBAN)], 40, buff=0.22)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(bs), FadeIn(sami), run_time=0.35)
        self.play(sami.animate.move_to(P(x0 + 130 * 9.0 / 150, sami.get_y())), run_time=0.5)
        self.au_mot("1 mètre")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(a), Create(tr), run_time=0.3)
        self.au_mot("30 centimètres")
        self.play(FadeIn(l0[2:], shift=UP * 0.1), FadeIn(b), run_time=0.3)
        self.au_mot("Combien de centimètres en tout")
        q = self.t("Combien de centimètres en tout ?", 38, JAUNE_TITRE)
        gauche(q, -6.2, -1.3)
        self.play(FadeIn(q, scale=1.1), run_time=0.4)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        (bs, a, b, tr), U, x0 = self.saut()
        g = VGroup(bs, a, b, tr).shift(UP * 1.4)
        self.add(g)
        r1 = self.ligne([("1 m", VERT_OK), ("= 100 cm", VERT_OK)], 44, buff=0.3)
        gauche(r1, -6.0, -0.5)
        hors_audit(r1[0])
        self.au_mot("1 mètre, c'est 100 centimètres")
        self.play(FadeIn(r1[0], shift=UP * 0.1), Indicate(a, scale_factor=1.05), run_time=0.3)
        self.au_mot("100 centimètres")
        ea = hors_audit(self.t("100 cm", 30, VERT_OK)).next_to(a, UP, buff=0.12)
        self.play(FadeIn(r1[1], shift=UP * 0.1), FadeIn(ea), run_time=0.3)
        eb = hors_audit(self.t("30 cm", 30, RUBAN)).next_to(b, UP, buff=0.12)
        c = self.ligne([("100 + 30", BLEU_D), ("= 130", VERT_OK)], 50, buff=0.3)
        gauche(c, -6.0, -1.5)
        self.aux_extraits([VGroup(c[0], eb), c[1]], [("100 plus 30", 1, 0.3), "130"])
        self.au_mot("Sami a sauté")
        res = self.ligne([("Sami a sauté", WHITE), ("130 cm", VERT_OK)], 46, buff=0.25)
        gauche(res, -6.0, -2.6)
        hors_audit(res[1])
        self.play(FadeIn(res, scale=1.1), run_time=0.4)
        acc = accolade(VGroup(a, b), "130 cm", 32, VERT_OK, dessus=False)
        acc.shift(DOWN * (a.get_bottom()[1] - bs.get_bottom()[1] + 0.05))  # sous le bac à sable
        self.play(FadeIn(acc), run_time=0.3)
        self.insister(res[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = metre_ruban(3.4, 0.4, nums=False)
        lignes = self.finale_gauche(fig, textes=[
            ("1 m = 10 dm", "1 m = 100 cm"),
            ("1 cm = 10 mm",),
            ("1 km = 1000 m",)], fs=34)
        self.add(fig)
        self.au_mot("1 mètre égale 10 décimètres")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 centimètre égale")
        self.montrer_ligne(lignes[1])
        self.au_mot("1 kilomètre égale")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_metre_cm()
        self.ecran_metre_dm()
        self.ecran_cm_mm()
        self.ecran_question1()
        self.ecran_km()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class LongueurRelationsCE2(LongueurRelationsBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
