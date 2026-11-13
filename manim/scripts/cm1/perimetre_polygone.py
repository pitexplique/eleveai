# perimetre_polygone.py
# EleveAI — Maths CM1 — série « Périmètre », épisode 03 : CALCULER LE PÉRIMÈTRE D'UN POLYGONE
# (micro perimetre_polygone, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (l'étoile de Noël à 10 côtés : 6 × 10 = 60 cm, A).
# Décor et métier : Emma, MENUISIÈRE (bande de bois autour d'un plateau à 8 côtés ; centres : bricolage).
# Mapping micro → écrans : 02 (compter les côtés avec une croix), 03 (côtés égaux : un côté × le nombre),
# 04 (côtés différents : on ajoute dans l'ordre du tour), 06 (piège : oublier ou compter deux fois),
# questions 05 (hexagone, C) et 07 (pentagone, B), défi 08 (le bac à sable).
# Voix : manim/voix/cm1-perimetre-polygone.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_polygone_marques.json (python manim/scripts/cm1/aire_marques.py perimetre:polygone).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/perimetre_polygone.py PerimetrePolygoneCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/perimetre_polygone.py PerimetrePolygoneCM1 -o eleveai-maths-cm1-perimetre-polygone --media_dir manim/scripts/cm1/media-perimetre-03
# Sortie : manim/sorties/cm1/maths/perimetre/03-polygone/eleveai-maths-cm1-perimetre-polygone.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm1_commun import *  # noqa: E402,F403

BOIS, BOIS_B = "#d4a373", "#7f5539"        # le plateau d'Emma (bois clair)
BOIS2, BOIS2_B = "#b08968", "#583101"      # l'autre plateau (bois foncé)
HEXA_C, HEXA_B = CARREAU, CARREAU_B        # l'hexagone de la question 1
PENTA_C, PENTA_B = "#a78bfa", "#4c1d95"    # le pentagone de la question 2
SABLE, SABLE_B = "#fde68a", "#a16207"      # le bac à sable du défi
CROIX = "#fef08a"


# ── outils de l'épisode (le commun appartient à la série : ne pas le modifier ici) ──
def pts_regulier(n, cote, u=0.1):
    """Les sommets d'un polygone régulier à n côtés de longueur `cote` (en cm, échelle u), un côté
    horizontal EN BAS, centré sur l'origine. Sommet 0 = en bas à gauche, puis dans le sens inverse
    des aiguilles d'une montre (côté 0 = le côté du bas)."""
    r = cote * u / (2 * np.sin(PI / n))
    a0 = -PI / 2 - PI / n
    return [P(r * np.cos(a0 + 2 * PI * k / n), r * np.sin(a0 + 2 * PI * k / n)) for k in range(n)]


def etiquettes(p, textes, fs=26, ecart=0.32):
    return VGroup(*[etiquette(p, i, s, fs, ecart=ecart) for i, s in enumerate(textes)])


def croix(p, i, couleur=CROIX, t=0.17, sw=6):
    """Une petite croix posée SUR le côté i du polygone p (au milieu)."""
    v = p.get_vertices()
    m = (v[i] + v[(i + 1) % len(v)]) / 2
    x = VGroup(Line(m + P(-t, -t), m + P(t, t), color=couleur, stroke_width=sw),
               Line(m + P(-t, t), m + P(t, -t), color=couleur, stroke_width=sw))
    return x


def numero(p, i, s, fs=26, couleur=WHITE, ecart=0.45):
    """Le numéro du côté i, posé DEDANS, près du milieu du côté."""
    v = p.get_vertices()
    c = sum(v) / len(v)
    m = (v[i] + v[(i + 1) % len(v)]) / 2
    n = c - m
    n = n / (np.linalg.norm(n) or 1)
    return Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(m + n * ecart)


def coin(p, i=0, couleur=VERT_OK, r=0.13):
    return Dot(p.get_vertices()[i], radius=r, color=couleur)


class PerimetrePolygoneBase(PaysagePerimetreCM1):
    nom_voix = "cm1-perimetre-polygone"
    fichier_marques = "perimetre_polygone_marques.json"
    ceinture = "verte"

    def octogone(self, u=0.034, pos=P(-3.6, 0.2), fond=BOIS, bord=BOIS_B):
        """Le plateau d'Emma : 8 côtés de 50 cm."""
        return poly(pts_regulier(8, 50, u), fond, bord).move_to(pos)

    def plateau5(self, u=0.06, pos=P(-3.6, 0.1)):
        """L'autre plateau, à 5 côtés différents (À L'ÉCHELLE), dans l'ordre du tour :
        40 (le toit à gauche), 30 (à gauche), 50 (en bas), 30 (à droite), 20 (le toit à droite)."""
        pts = [P(37, 45.2), P(0, 30), P(0, 0), P(50, 0), P(50, 30)]
        pts = [x * u for x in pts]
        return poly(pts, BOIS2, BOIS2_B).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer le périmètre d'un polygone", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Calculer le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Une figure à 5 ou 8 côtés :", "comment faire le tour ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        l = q.submobjects[0]  # coupée en deux morceaux : « 5 » ne doit pas attendre « côtés »
        g = VGroup(*[self.t(m, 36) for m in ("Une figure à 5", "ou 8 côtés :")]).arrange(RIGHT, buff=0.2)
        q.submobjects[0] = g.align_to(l, LEFT).set_y(l.get_y())
        f = self.octogone(0.024, P(4.0, 0.4))
        self.au_mot("Une figure à 5")
        self.play(FadeIn(q[0][0], shift=UP * 0.2), FadeIn(f, scale=1.3), run_time=0.3)
        self.play(FadeIn(q[0][1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("comment faire le tour")
        self.play(FadeIn(q[1], shift=UP * 0.2), Create(tour(f)), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Emma, menuisière ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        em = emma(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Emma")
        nom = self.t("Emma", 42, VERT_F).next_to(em, UP, buff=0.2)
        self.play(FadeIn(em, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("menuisière")
        met = self.t("menuisière", 28, VERT_F).next_to(em, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        f = self.octogone(0.03, P(-1.4, 0.55))
        self.au_mot("table à 8 côtés")
        l1 = self.t("Une table à 8 côtés :", 34).move_to(P(3.9, 1.0)).align_to(P(1.1, 0), LEFT)
        self.play(FadeIn(f, scale=1.2), FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("un octogone")
        l2 = self.t("un octogone.", 34, JAUNE_TITRE).next_to(l1, DOWN, buff=0.2).align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("une bande de bois")
        self.play(Create(tour(f, "#facc15", 10)), run_time=1.0)
        self.au_mot("Combien de centimètres")
        q = self.bloc(["Combien de centimètres", "de bande ?"], 36, JAUNE_TITRE)
        q.move_to(P(-0.2, -2.2))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : on compte les côtés, avec une croix ────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        f = self.octogone()
        self.add(f)
        self.au_mot("on compte les côtés")
        l0 = self.bloc(["D'abord, on compte", "les côtés."], 34, JAUNE_TITRE)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("croix sur chaque côté")
        l1 = self.bloc(["Une petite croix", "sur chaque côté compté :"], 34)
        self.col(l1, 1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        for k in range(8):
            self.au_mot("compté : 1" if k == 0 else str(k + 1))
            self.play(Create(croix(f, k)), FadeIn(numero(f, k, str(k + 1)), scale=1.4), run_time=0.22)
        self.au_mot("a 8 côtés")
        l2 = self.t("L'octogone a 8 côtés.", 34, VERT_OK)
        self.col(l2, 0.05)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(f, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.au_mot("mesure 50")
        l3 = self.ligne([("Chacun mesure", WHITE), ("50 cm.", JAUNE_TITRE)], 34, buff=0.2)
        self.col(l3, -0.85)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(etiquettes(f, ["50"] * 8, 24)), run_time=0.45)
        self.attendre_voix()

    # ── 03 : côtés égaux → × 8 ──────────────────────────────────────────────
    def ecran_multiplier(self):
        self.ecran("03-multiplier")
        f = self.octogone()
        self.add(f, etiquettes(f, ["50"] * 8, 24))
        self.au_mot("Les 8 côtés sont égaux")
        l0 = self.t("Les 8 côtés sont égaux.", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("huit fois")
        l1 = hors_audit(self.t("50 + 50 + 50 + … (8 fois)", 34, GRAY_B))
        self.col(l1, 1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("calcule 50 fois 8")
        l2 = self.ligne([("50 × 8", BLEU_D), ("= 400", VERT_OK)], 48, buff=0.3)
        self.col(l2, 0.2)
        barre = Line(l1.get_left(), l1.get_right(), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(barre), Create(tour(f)), run_time=0.6)
        self.au_mot("8 : 400")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("faut 400")
        res = self.gros("400 cm", fs=56)
        self.col(res, -1.1)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 04 : 5 côtés différents → on ajoute dans l'ordre du tour ────────────
    def ecran_differents(self):
        self.ecran("04-differents")
        f = self.plateau5()
        self.au_mot("Un autre plateau")
        l0 = self.bloc(["Un autre plateau :", "5 côtés différents."], 34, JAUNE_TITRE)
        self.col(l0, 2.65)
        self.play(FadeIn(f, scale=1.2), FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        for i, (mot, s) in enumerate([("différents : 40", "40 cm"), ("40, 30", "30 cm"), ("30, 50", "50 cm"),
                                      ("50, 30", "30 cm"), ("30 et 20", "20 cm")]):
            self.au_mot(mot)
            self.play(FadeIn(etiquette(f, i, s, 26, ecart=0.3), scale=1.3),
                      Indicate(cote_tour(f, i, JAUNE_TITRE, 9), color=JAUNE_TITRE), run_time=0.15)
        self.au_mot("l'ordre du tour")
        l1 = self.bloc(["On les ajoute", "dans l'ordre du tour :"], 34)
        self.col(l1, 1.3)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(coin(f, 0)), run_time=0.4)
        etapes = [("40 plus 30", "+", "40 + 30", (0, 1), "30, 70", "= 70"),
                  ("Plus 50", None, "+ 50", (2,), "50, 120", "= 120"),
                  ("Plus 30", None, "+ 30", (3,), "30, 150", "= 150"),
                  ("Plus 20", None, "+ 20", (4,), "20, 170", "= 170")]
        prec = None
        for k, (m1, _, s1, cotes, m2, s2) in enumerate(etapes):
            lg = self.ligne([(s1, BLEU_D), (s2, VERT_OK)], 38, buff=0.3)
            if prec is None:
                self.col(lg, 0.3)
            else:
                lg.next_to(prec, DOWN, buff=0.22)
                lg.shift(RIGHT * (prec[1].get_left()[0] - lg[1].get_left()[0]))
            self.au_mot(m1)
            self.play(FadeIn(lg[0], shift=UP * 0.1), *[Create(cote_tour(f, i)) for i in cotes], run_time=0.15)
            self.au_mot(m2)
            self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.2)
            prec = lg
        res = self.gros("170 cm", fs=52)
        self.col(res, -2.75)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_regulier(6, 9, 0.16), HEXA_C, HEXA_B).move_to(P(-3.8, 1.55))
        return VGroup(p, etiquettes(p, ["9 cm"] * 6, 24, ecart=0.28))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un hexagone a 6 côtés", "égaux de 9 cm.", "Quel est son périmètre ?"],
                             [self.choix("15 cm"), self.choix("45 cm"), self.choix("54 cm")], 2,
                             ["6 côtés de 9 cm :", "9 × 6 = 54.", "Le périmètre : 54 cm."],
                             -0.95, sans_audit=(2,), mot_q="Un hexagone", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (oublier un côté, en compter un deux fois) ────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        f = self.octogone(0.03, P(-3.6, -0.3))
        self.add(f)
        self.au_mot("beaucoup de côtés")
        l0 = self.t("Beaucoup de côtés :", 34)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("on en oublie un")
        l1 = self.t("on en oublie un,", 34, ROUGE_ERREUR)
        self.col(l1, 1.55)
        manque = DashedLine(f.get_vertices()[3], f.get_vertices()[4], color=ROUGE_ERREUR, stroke_width=9,
                            dash_length=0.15)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(manque), run_time=0.45)
        self.au_mot("deux fois")
        l2 = self.bloc(["ou on en compte", "un deux fois !"], 34, ROUGE_ERREUR)
        self.col(l2, 0.7)
        deux = VGroup(croix(f, 6, ROUGE_ERREUR).shift(LEFT * 0.17 + DOWN * 0.17),
                      croix(f, 6, ROUGE_ERREUR).shift(RIGHT * 0.17 + UP * 0.17))
        self.play(FadeIn(l2, shift=UP * 0.1), Create(deux), run_time=0.45)
        self.play(Indicate(deux, color=ROUGE_ERREUR, scale_factor=1.3), run_time=0.45)
        self.au_mot("d'un coin")
        l3 = self.t("On part d'un coin,", 34, VERT_OK)
        self.col(l3, -0.25)
        dep = coin(f, 0, r=0.16)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(manque), FadeOut(deux), FadeIn(dep, scale=1.6), run_time=0.45)
        self.au_mot("croix sur chaque côté")
        l4 = self.bloc(["une croix sur", "chaque côté,"], 34, VERT_OK)
        self.col(l4, -1.0)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.play(LaggedStart(*[AnimationGroup(Create(cote_tour(f, i)), Create(croix(f, i)))
                                for i in range(8)], lag_ratio=0.35), run_time=1.6)
        self.au_mot("revient au départ")
        l5 = self.gros("et on s'arrête\nau départ !", fs=34)
        self.col(l5, -2.5)
        self.play(FadeIn(l5, scale=1.1), Indicate(dep, color=VERT_OK, scale_factor=1.8), run_time=0.55)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def figure_q2(self):
        """Le pentagone 7, 4, 6, 4, 5 (à l'échelle), sommets dans l'ordre du tour."""
        pts = [P(4.66, 7.36), P(-1.34, 3.77), P(0, 0), P(6, 0), P(7.88, 3.53)]
        p = poly([x * 0.29 for x in pts], PENTA_C, PENTA_B).move_to(P(-3.8, 1.5))
        return VGroup(p, etiquettes(p, ["7 cm", "4 cm", "6 cm", "4 cm", "5 cm"], 24, ecart=0.28))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un pentagone : 7 cm, 4 cm,", "6 cm, 4 cm et 5 cm.", "Quel est son périmètre ?"],
                             [self.choix("22 cm"), self.choix("26 cm"), self.choix("20 cm")], 1,
                             ["7 + 4 = 11, + 6 = 17,", "+ 4 = 21, + 5 = 26.", "Le périmètre : 26 cm."],
                             -0.75, sans_audit=(2,),
                             couper={0: ("7 + 4 = 11,", "+ 6 = 17,"), 1: ("+ 4 = 21,", "+ 5 = 26.")},
                             mot_q="Un pentagone", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (le bac à sable) ───────────────────────────────────────
    def bac(self):
        return poly(pts_regulier(5, 150, 0.0145), SABLE, SABLE_B).move_to(P(-3.3, -0.3))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b = self.bac()
        self.au_mot("5 côtés égaux")
        l0 = self.bloc(["Une bordure autour d'un bac", "à sable à 5 côtés égaux."], 32)
        self.col(l0, 1.95, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, scale=1.2), run_time=0.5)
        self.au_mot("mesure 150")
        l1 = self.ligne([("Chaque côté :", WHITE), ("150 cm", JAUNE_TITRE)], 32, buff=0.2)
        self.col(l1, 0.85, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(etiquettes(b, ["150 cm"] * 5, 24)), run_time=0.45)
        self.au_mot("a 700")
        l2 = self.ligne([("Emma a", WHITE), ("700 cm", ORANGE_RETENUE), ("de bordure.", WHITE)], 32, buff=0.2)
        self.col(l2, 0.1, 0.35)
        self.play(FadeIn(l2[:2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("centimètres de bordure")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.15)
        self.au_mot("Est-ce assez")
        q = self.t("Est-ce assez ?", 40, JAUNE_TITRE)
        self.col(q, -0.8, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(b), run_time=0.5)
        self.pause_defi(y=-1.85)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = self.bac()
        self.add(b, etiquettes(b, ["150 cm"] * 5, 24))
        self.au_mot("côtés de 150")
        l0 = self.t("5 côtés de 150 cm :", 34, SABLE)
        self.col(l0, 2.3, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(tour(b)), run_time=0.5)
        l1 = self.ligne([("150 × 5", BLEU_D), ("= 750 cm", VERT_OK)], 40, buff=0.3)
        self.col(l1, 1.55, 0.35)
        self.au_mot("150 fois 5")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5, 750")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Emma a 700")
        l2 = self.t("Emma a 700 cm :", 34)
        self.col(l2, 0.65, 0.35)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("pas assez")
        l3 = self.t("ce n'est pas assez !", 38, ROUGE_ERREUR)
        self.col(l3, -0.05, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Il manque")
        l4 = self.ligne([("Il manque", WHITE), ("750 − 700", BLEU_D)], 36, buff=0.25)
        self.col(l4, -0.85, 0.35)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("moins 700")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("700, 50")
        res = self.gros("= 50 cm", fs=50)
        self.col(res, -1.8, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.45)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = self.octogone(0.026)
        fig = VGroup(f, tour(f), *[croix(f, i) for i in range(8)])
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre d'un polygone :", "la somme de tous ses côtés."),
            ("On compte les côtés", "avec une croix."),
            ("Tous les côtés égaux :", "un côté × le nombre de côtés.")], fs=32)
        self.add(fig)
        self.au_mot("Le périmètre d'un polygone")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("avec une croix")
        self.montrer_ligne(lignes[1])
        self.au_mot("nombre de côtés")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_compter()
        self.ecran_multiplier()
        self.ecran_differents()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetrePolygoneCM1(PerimetrePolygoneBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
