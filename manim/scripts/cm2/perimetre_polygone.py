# perimetre_polygone.py
# EleveAI — Maths CM2 — série « Périmètre », épisode 04 : LE PÉRIMÈTRE D'UN POLYGONE
# (micro perimetre_polygone, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (train de 4 biscuits carrés : 100 cm, pas 160 → A).
# Décor et métier : Inaya, CRÉATRICE DE BIJOUX (fil d'argent autour d'un pendentif ; centres : art-design, mode).
# Mapping micro → écrans : 02 (hexagone régulier 1,2 × 6 = 7,2), 03 (5 côtés différents, cochés : 10),
# 04 (L sur quadrillage : 12), 06 (piège : les traits du milieu ne comptent pas), questions 05 et 07,
# défi 08 (bobine de 50 cm : 6 pendentifs).
# Voix : manim/voix/cm2-perimetre-polygone.json (validée le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/perimetre_marques.py polygone
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/perimetre_polygone.py PerimetrePolygoneCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/perimetre_polygone.py PerimetrePolygoneCM2 -o eleveai-maths-cm2-perimetre-polygone --media_dir manim/scripts/cm2/media-perimetre-04
# Sortie : manim/sorties/cm2/maths/perimetre/04-polygone/eleveai-maths-cm2-perimetre-polygone.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_cm2_commun import *  # noqa: E402,F403

ARGENT = "#e2e8f0"                       # le fil d'argent
PIERRE, PIERRE_B = "#8b5cf6", "#4c1d95"  # le pendentif (violet)
CORAIL, CORAIL_B = "#fb7185", "#9f1239"  # le 2e pendentif
BROCHE, BROCHE_B = "#38bdf8", "#0c4a6e"  # la broche en L
L_CASES = [(0, 0), (0, 1), (0, 2), (1, 2), (2, 2)]   # la broche : 5 carreaux, périmètre 12


def hexagone(cote=1.2, u=1.4, fond=PIERRE, bord=PIERRE_B):
    return poly(pts_regulier(6, cote, u), fond, bord)


def pentagone(cotes=(2, 1.5, 3, 2.5, 1), u=0.62, angles=(0, 105, 165), fond=CORAIL, bord=CORAIL_B):
    """Un pentagone aux côtés donnés (à l'échelle u) : 3 côtés posés par leurs angles (degrés),
    le 5e sommet trouvé à la bonne distance des deux bouts (intersection de deux cercles)."""
    pts = [np.array([0.0, 0.0, 0.0])]
    for c, a in zip(cotes[:3], angles):
        r = np.radians(a)
        pts.append(pts[-1] + c * u * np.array([np.cos(r), np.sin(r), 0]))
    D, A = pts[-1], pts[0]
    r1, r2 = cotes[3] * u, cotes[4] * u
    d = np.linalg.norm(D - A)
    a = (r1 * r1 - r2 * r2 + d * d) / (2 * d)
    h = np.sqrt(max(r1 * r1 - a * a, 0))
    m = D + a * (A - D) / d
    n = np.array([-(A - D)[1], (A - D)[0], 0]) / d
    E1, E2 = m + h * n, m - h * n
    E = E1 if E1[0] < E2[0] else E2   # le sommet du côté gauche (dehors)
    pts.append(E)
    p = poly(pts, fond, bord)
    return p.move_to(ORIGIN)


def broche(c=0.75):
    """La broche en L (carreaux bleus) et ses segments de bord / du milieu (dans l'ordre du tour)."""
    g = figure_cases(L_CASES, c, BROCHE, BROCHE_B)
    return g


class PerimetrePolygoneBase(PaysagePerimetreCM2):
    nom_voix = "cm2-perimetre-polygone"
    fichier_marques = "perimetre_polygone_marques.json"
    ceinture = "verte"

    def fil(self, p, sw=9):
        return tour(p, ARGENT, sw)

    def broche_sur_grille(self, c=0.75, pos=P(-3.6, 0.2)):
        """Le quadrillage 5 × 5, la broche posée dessus ; renvoie (grille, broche, bords, dedans)."""
        gr = quadrillage(5, 5, c)
        br = broche(c)
        # carreau (i, j) centré en (i c, −j c) ; la grille part du coin (−c/2, c/2) − 1 carreau
        br.shift(P(c / 2 + c, -c / 2 - c))
        tout = VGroup(gr, br).move_to(pos)
        o = br[0].get_center()    # le centre du carreau (0, 0)
        bords = VGroup(*[Line(a + o, b + o, color=TOUR, stroke_width=9) for a, b in bord_cases(L_CASES, c)])
        dedans = VGroup(*[Line(a + o, b + o, color=ROUGE_ERREUR, stroke_width=8) for a, b in traits_dedans(L_CASES, c)])
        return gr, br, bords, dedans

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre d'un polygone", self.identite, self.ceinture, y_ech=-2.45)
        h = hexagone(1.2, 1.1).move_to(P(3.8, 0.45))
        self.au_mot("Le périmètre d'un polygone")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(h, scale=1.2), run_time=0.7)
        q = self.bloc(["Combien de fil d'argent", "pour un bijou à 6 côtés ?"], 36)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Combien de fil d'argent")
        self.play(FadeIn(q, shift=UP * 0.2), Create(self.fil(h)), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inaya, créatrice de bijoux ─────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ina = inaya(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Inaya")
        nom = self.t("Inaya", 42, VIOLET_D).next_to(ina, UP, buff=0.2)
        self.play(FadeIn(ina, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("créatrice de bijoux")
        met = self.bloc(["créatrice", "de bijoux"], 28, VIOLET_D).next_to(ina, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        h = hexagone(1.2, 1.25).move_to(P(0.3, 0.9))
        chaine = VGroup(Line(h.get_top() + P(-0.7, 0.85), h.get_top(), color=ARGENT, stroke_width=3),
                        Line(h.get_top() + P(0.7, 0.85), h.get_top(), color=ARGENT, stroke_width=3))
        self.au_mot("en forme d'hexagone")
        self.play(FadeIn(h, scale=1.2), Create(chaine), run_time=0.5)
        self.au_mot("un polygone à 6 côtés")
        nums = VGroup(*[numero(h, i, str(i + 1), 26) for i in range(6)])
        e = self.t("hexagone : 6 côtés", 30, JAUNE_TITRE).next_to(h, RIGHT, buff=0.5)
        self.play(FadeIn(e), LaggedStart(*[FadeIn(x) for x in nums], lag_ratio=0.1), run_time=0.6)
        self.au_mot("d'un fil d'argent")
        self.play(FadeOut(nums), Create(self.fil(h)), run_time=0.9)
        self.au_mot("Combien de fil pour un pendentif")
        q = self.bloc(["Combien de fil", "pour un pendentif ?"], 36, JAUNE_TITRE)
        q.move_to(P(0.4, -1.85))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : 6 côtés égaux → × 6 ────────────────────────────────────────────
    def ecran_regulier(self):
        self.ecran("02-regulier")
        h = hexagone(1.2, 1.55).move_to(P(-3.6, 0.3))
        self.add(h)
        self.au_mot("Les 6 côtés sont égaux")
        l0 = self.t("6 côtés égaux :", 34)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,2 centimètre chacun")
        l0b = self.ligne([("1,2 cm", JAUNE_TITRE), ("chacun", WHITE)], 34, buff=0.2).next_to(l0, DOWN, buff=0.14)
        l0b.align_to(l0, LEFT)
        self.play(FadeIn(l0b, shift=UP * 0.1), FadeIn(etiquettes(h, ["1,2 cm"] * 6, fs=24, ecart=0.38)),
                  run_time=0.35)
        self.au_mot("Au lieu d'additionner 6 fois")
        l1 = hors_audit(self.t("1,2 + 1,2 + 1,2 + …", 36, GRAY_B))
        self.col(l1, 0.95)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("1,2 fois 6")
        l2 = self.t("1,2 × 6", 48, BLEU_D)
        self.col(l2, -0.1)
        barre = Line(l1.get_left(), l1.get_right(), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(barre), Create(self.fil(h)), run_time=0.5)
        self.au_mot("6, 7,2")
        l2b = self.t("= 7,2", 48, VERT_OK).next_to(l2, RIGHT, buff=0.3)
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il faut 7,2 centimètres")
        res = hors_audit(self.gros("7,2 cm de fil", fs=44))
        self.col(res, -1.2)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 03 : 5 côtés différents, on coche ───────────────────────────────────
    def ecran_quelconque(self):
        self.ecran("03-quelconque")
        p = pentagone(u=0.85).move_to(P(-3.6, 0.2))
        et = etiquettes(p, ["2", "1,5", "3", "2,5", "1"], fs=28, ecart=0.36)
        self.au_mot("5 côtés différents")
        l0 = self.t("5 côtés différents :", 34, JAUNE_TITRE)
        self.col(l0, 2.5)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(p, scale=1.1), run_time=0.4)
        self.au_mot("2 centimètres, 1,5")
        self.play(FadeIn(et[0], scale=1.3), FadeIn(et[1], scale=1.3), run_time=0.15)
        self.au_mot("3, 2,5")
        self.play(FadeIn(et[2], scale=1.3), FadeIn(et[3], scale=1.3), run_time=0.15)
        self.au_mot("et 1")
        self.play(FadeIn(et[4], scale=1.3), run_time=0.15)
        self.au_mot("on coche chaque côté")
        l1 = self.t("On fait le tour, on coche :", 34)
        self.col(l1, 1.75)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        etapes = [("2 plus 1,5", "2 + 1,5", "1,5, 3,5", "= 3,5", (0, 1)),
                  ("Plus 3", "+ 3", "3, 6,5", "= 6,5", (2,)),
                  ("Plus 2,5", "+ 2,5", "2,5, 9", "= 9", (3,)),
                  ("Plus 1", "+ 1", "1 : 10", "= 10 cm", (4,))]
        y = 0.95
        for k, (m1, s1, m2, s2, cotes) in enumerate(etapes):
            self.au_mot(m1)
            a = self.t(s1, 40, BLEU_D)
            self.col(a, y, 1.3)
            a.align_to(P(2.9, 0), RIGHT)
            self.play(FadeIn(a, shift=UP * 0.1), *[FadeIn(croix(p, i)) for i in cotes],
                      *[Create(cote_tour(p, i)) for i in cotes], run_time=0.25)
            self.au_mot(m2)
            b = self.t(s2, 40, VERT_OK if k == 3 else WHITE).next_to(a, RIGHT, buff=0.25)
            self.play(FadeIn(b, shift=UP * 0.1), run_time=0.2)
            y -= 0.72
        self.attendre_voix()

    # ── 04 : sur un quadrillage, on compte le bord ──────────────────────────
    def ecran_quadrillage(self):
        self.ecran("04-quadrillage")
        gr, br, bords, dedans = self.broche_sur_grille()
        self.au_mot("Sur un quadrillage")
        self.play(Create(gr), run_time=0.5)
        self.au_mot("une broche en forme de L")
        l0 = self.t("Une broche en forme de L", 34, JAUNE_TITRE)
        self.col(l0, 2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), LaggedStart(*[FadeIn(x) for x in br], lag_ratio=0.1), run_time=0.6)
        self.au_mot("Chaque carreau a 1")
        l1 = self.ligne([("1 carreau :", WHITE), ("1 cm", JAUNE_TITRE), ("de côté", JAUNE_TITRE)], 34, buff=0.2)
        hors_audit(l1[0])
        self.col(l1, 1.5)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(l1[1], shift=UP * 0.1), Indicate(br[0], color=JAUNE_TITRE),
                  run_time=0.4)
        self.au_mot("de côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("On compte les côtés")
        l2 = self.bloc(["On compte les côtés", "de carreaux du bord :"], 34)
        self.col(l2, 0.4)
        nums = VGroup()
        for k, s in enumerate(bords):
            v = s.get_end() - s.get_start()
            n = np.array([-v[1], v[0], 0]) / (np.linalg.norm(v) or 1)   # vers l'extérieur (tour horaire)
            nums.add(hors_audit(Text(str(k + 1), font_size=22, color=WHITE, weight=BOLD)
                                .move_to(s.get_center() + n * 0.28)))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.play(LaggedStart(*[AnimationGroup(Create(s), FadeIn(n)) for s, n in zip(bords, nums)],
                              lag_ratio=0.25), run_time=1.2)
        self.au_mot("tout autour : 12")
        l3 = self.t("12", 52, VERT_OK)
        self.col(l3, -0.6)
        self.play(FadeIn(l3, scale=1.3), run_time=0.3)
        self.au_mot("est de 12 centimètres")
        res = hors_audit(self.gros("Périmètre : 12 cm", fs=40))
        self.col(res, -1.6)
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def figure_q1(self):
        p = poly(pts_regulier(8, 2.5, 0.42), "#fbbf24", "#92400e").move_to(P(-3.7, 1.75))
        return VGroup(p, etiquettes(p, ["2,5 cm"], cotes=[0], fs=24))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q1()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un octogone : 8 côtés égaux", "à 2,5 cm.", "Quel est son périmètre ?"],
                             [self.choix("10,5 cm"), self.choix("20 cm"), self.choix("16,5 cm")], 1,
                             ["2,5 × 8 :", "2 × 8 = 16,", "5 dixièmes × 8 = 4,", "16 + 4 = 20 cm."],
                             -0.15, sans_audit=(3,), mot_q="Un octogone", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (les traits du milieu) ────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        gr, br, bords, dedans = self.broche_sur_grille(0.7, P(-3.6, -0.3))
        self.add(gr, br)
        self.au_mot("carreaux collés")
        l0 = self.bloc(["Une figure faite", "de carreaux collés :"], 34)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(br, scale_factor=1.04), run_time=0.45)
        self.au_mot("les traits à l'intérieur")
        l1 = self.bloc(["les traits à l'intérieur", "ne font pas partie du tour."], 32, ROUGE_ERREUR)
        self.col(l1, 1.0)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(dedans), run_time=0.45)
        self.au_mot("partie du tour")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(dedans, color=ROUGE_ERREUR), run_time=0.4)
        self.au_mot("seulement sur le bord")
        l2 = self.t("Le fil passe seulement sur le bord.", 32, TOUR)
        self.col(l2, -0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeOut(dedans), Create(bords), run_time=0.7)
        self.au_mot("on trouve trop")
        l3 = self.bloc(["Si on compte les traits du milieu,", "on trouve trop !"], 32, ROUGE_ERREUR)
        self.col(l3, -1.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def figure_q2(self):
        p = pentagone((4, 3.5, 2, 4, 1.5), 0.36, (0, 100, 170), "#4ade80", "#14532d").move_to(P(-3.7, 1.75))
        return VGroup(p, etiquettes(p, ["4", "3,5", "2", "4", "1,5"], fs=24, ecart=0.3))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = self.figure_q2()

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(Create(tour(g[0])), run_time=0.6)

        self.question_gauche("07-question", "07b-reponse",
                             ["Un pentagone : 4 cm, 3,5,", "2, 4 et 1,5.", "Quel est son périmètre ?"],
                             [self.choix("15 cm"), self.choix("13 cm"), self.choix("14,10 cm")], 0,
                             ["3,5 + 1,5 = 5,", "+ 4 + 2 + 4 = 15 cm.", "On n'oublie aucun", "des 5 côtés."],
                             -0.15, mot_q="Un pentagone", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (bobine de 50 cm) ──────────────────────────────────────
    def bobine(self, pos=P(-4.6, 0.1)):
        b = VGroup(Rectangle(width=1.0, height=1.3, fill_color=ARGENT, fill_opacity=1, stroke_color=GRAY_B,
                             stroke_width=3),
                   Rectangle(width=1.4, height=0.18, fill_color="#78350f", fill_opacity=1, stroke_width=0)
                   .shift(UP * 0.74),
                   Rectangle(width=1.4, height=0.18, fill_color="#78350f", fill_opacity=1, stroke_width=0)
                   .shift(DOWN * 0.74))
        e = hors_audit(self.t("50 cm", 30, ARGENT)).next_to(b, DOWN, buff=0.2)
        return VGroup(b, e).move_to(pos)

    def pendentifs(self, n=7, pos=P(-2.2, -2.0)):
        g = VGroup(*[hexagone(1.2, 0.28) for _ in range(n)]).arrange(RIGHT, buff=0.12).move_to(pos)
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bo = self.bobine()
        h = hexagone(1.2, 1.0).move_to(P(-2.3, 0.4))
        eh = etiquettes(h, ["1,2 cm"], cotes=[0], fs=24)
        self.au_mot("une bobine de 50 centimètres")
        l0 = self.ligne([("Une bobine de", WHITE), ("50 cm", ARGENT)], 34, buff=0.18)
        self.col(l0, 2.2, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(bo, scale=1.2), run_time=0.5)
        self.au_mot("à 6 côtés de 1,2 centimètre")
        l1 = self.bloc(["Des pendentifs à 6 côtés", "de 1,2 cm"], 34)
        self.col(l1, 1.15, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(h, scale=1.2), FadeIn(eh), run_time=0.5)
        self.au_mot("peut-elle entourer")
        q = self.bloc(["Combien peut-elle", "en entourer ?"], 38, JAUNE_TITRE)
        self.col(q, -0.1, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(h), run_time=0.5)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        bo = self.bobine(P(-4.6, 1.2))
        self.add(bo)
        pen = self.pendentifs(7, P(-3.5, -1.0))
        self.au_mot("Un pendentif : 7,2 centimètres")
        l0 = self.ligne([("Un pendentif :", ROSE_D), ("7,2 cm", VERT_OK)], 36, buff=0.2)
        self.col(l0, 2.3, 0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pen[0], scale=1.2), run_time=0.4)
        self.au_mot("6 pendentifs")
        l1 = self.t("6 pendentifs :", 34, ROSE_D)
        self.col(l1, 1.45, 0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.2) for x in pen[1:6]],
                                                          lag_ratio=0.1), run_time=0.5)
        self.au_mot("7,2 fois 6")
        a = self.t("7,2 × 6", 40, BLEU_D)
        self.col(a, 0.75, 0.35)
        self.play(FadeIn(a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("6, 43,2")
        a2 = self.t("= 43,2 cm", 40, VERT_OK).next_to(a, RIGHT, buff=0.25)
        self.play(FadeIn(a2, shift=UP * 0.1), *[Create(self.fil(x, 4)) for x in pen[:6]], run_time=0.4)
        self.au_mot("7 pendentifs : 50,4")
        b = self.ligne([("7 pendentifs :", ROSE_D), ("50,4 cm", ROUGE_ERREUR)], 34, buff=0.2)
        self.col(b, -0.15, 0.35)
        self.play(FadeIn(b, shift=UP * 0.1), FadeIn(pen[6], scale=1.2), run_time=0.4)
        self.au_mot("un peu trop")
        b2 = self.t("> 50 : un peu trop !", 34, ROUGE_ERREUR)
        hors_audit(b2)
        self.col(b2, -0.8, 0.35)
        croix7 = VGroup(Line(pen[6].get_corner(UL), pen[6].get_corner(DR), color=ROUGE_ERREUR, stroke_width=6),
                        Line(pen[6].get_corner(DL), pen[6].get_corner(UR), color=ROUGE_ERREUR, stroke_width=6))
        self.play(FadeIn(b2, shift=UP * 0.1), Create(croix7), run_time=0.4)
        self.au_mot("Inaya peut en faire 6")
        res = hors_audit(self.gros("Inaya en fait 6", fs=44))
        self.col(res, -1.75, 0.35)
        self.play(FadeIn(res, scale=1.2), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        h = hexagone(1.2, 1.0)
        fig = VGroup(h, self.fil(h))
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre d'un polygone :", "la somme de tous ses côtés."),
            ("Côtés égaux : un côté", "× le nombre de côtés."),
            ("Sur un quadrillage :", "on ne compte que le bord.")], fs=30)
        self.add(fig)
        self.au_mot("Le périmètre d'un polygone")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("le nombre de côtés")
        self.montrer_ligne(lignes[1])
        self.au_mot("on ne compte que le bord")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regulier()
        self.ecran_quelconque()
        self.ecran_quadrillage()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetrePolygoneCM2(PerimetrePolygoneBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
