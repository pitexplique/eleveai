# solides_defi.py
# EleveAI — Maths CM2 — série « Solides », épisode 06 : DÉFI, LE JOINT DE L'AQUARIUM
# (micro solide_defi, notion solide), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Un cran au-dessus des défis CE2 (lampe en fil de fer) et CM1 (cubes cachés) : un défi à ÉTAPES qui
# mêle arêtes et mesures (4 longueurs, 4 largeurs, 4 hauteurs), faces (les vitres) et conversions.
# Short jumeau : film (le gâteau de 27 cubes, 8 coins : réponse B).
# Décor et métier : Ethan, FABRICANT D'AQUARIUMS (centres : nature-ecologie, metiers-artisanat).
# Mapping micro → écrans : 02 (12 arêtes = 4 longueurs + 4 largeurs + 4 hauteurs), 03 (4 × 60 + 4 × 30
# + 4 × 40 = 520 cm = 5,2 m, le joint dessiné bout à bout), 04 (les vitres : 6 − 1 = 5, à l'échelle),
# 06 (piège : 60 + 30 + 40 ne compte que 3 arêtes sur 12), questions 05 (cube de 25 cm : 12 × 25 =
# 300 cm = 3 m, rép. A) et 07 (400 ÷ 4 = 100 ; 100 − 50 − 30 = 20 cm, rép. C), défi 08 (10 m de
# joint, cubes de 40 cm : 4,8 m chacun, 2 aquariums, reste 40 cm).
# Voix : manim/voix/cm2-solides-defi.json (validée le 15/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/solides_defi.py SolidesDefiCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/solides_defi.py SolidesDefiCM2 -o eleveai-maths-cm2-solides-defi --media_dir manim/scripts/cm2/media-sol-06
# Sortie : manim/sorties/cm2/maths/solides/06-defi/eleveai-maths-cm2-solides-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm2_commun import *  # noqa: E402,F403

VERRE = "#7dd3fc"
VERRE_T = "#e0f2fe"
JOINT = ARETE_C
LONG_C, LARG_C, HAUT_C = "#facc15", "#f472b6", "#a78bfa"
LONG = [(0, 1), (3, 2), (4, 5), (7, 6)]
HAUT = [(0, 3), (1, 2), (5, 6), (4, 7)]
LARG = [(0, 4), (1, 5), (2, 6), (3, 7)]
TOUTES = LONG + LARG + HAUT


def aquarium(L=60, h=40, p=30, e=0.04, centre=ORIGIN):
    return pave(L * e, h * e, p * e, centre=centre, couleur=VERRE, opacite=0.35, couleur_trait=VERRE_T)


def poisson(s=1.0, couleur="#f97316"):
    return VGroup(Ellipse(width=0.5 * s, height=0.28 * s, fill_color=couleur, fill_opacity=1, stroke_width=0),
                  Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.13 * s).rotate(-PI / 2)
                  .shift(LEFT * 0.3 * s),
                  Dot(P(0.13 * s, 0.04 * s), radius=0.03 * s, color="#111827"))


def aretes(aq, groupe, couleur, sw=9):
    return VGroup(*[aq.arete_ab(a, b, couleur, sw) for a, b in groupe])


def rect_plat(w, h, s=0.012, couleur=VERRE):
    return Rectangle(width=w * s, height=h * s, fill_color=couleur, fill_opacity=0.55, stroke_color=VERRE_T,
                     stroke_width=3)


class SolidesDefiBase(PaysageSolidesCM2):
    nom_voix = "cm2-solides-defi"
    fichier_marques = "solides_defi_marques.json"
    _q_hmax = None

    def _disposer_q(self, question, choix, phrase):
        """Q1 (4 lignes courtes, mot pour mot la voix) : en 36, l'énoncé faisait 2,2 de haut et la
        carte C descendait sur Ti-Margo. Il est ramené à `_q_hmax` (la hauteur de l'énoncé de Q2),
        et les cartes, la pause et la phrase remontent d'autant."""
        r = super()._disposer_q(question, choix, phrase)
        tete, q, cartes, pause, rebours, ph = r
        if self._q_hmax and q.height > self._q_hmax:
            coin, bas0 = q.get_corner(UL), q.get_bottom()[1]
            q.scale(self._q_hmax / q.height, about_point=coin)
            d = q.get_bottom()[1] - bas0
            for m in (cartes, pause, ph):
                m.shift(UP * d)
        return r

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi : le joint de l'aquarium", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défi sur les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        aq = aquarium(e=0.042, centre=P(4.0, 0.6))
        q = self.bloc(["Combien de joint pour", "toutes les arêtes ?"], 40)
        gauche(q, -6.2, 0.6)
        self.au_mot("Combien de joint")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(aq, shift=UP * 0.3), run_time=0.5)
        self.au_mot("toutes les arêtes")
        self.play(FadeIn(q[1], shift=UP * 0.2), LaggedStart(*[Create(aq.arete_ab(a, b, JOINT, 8)) for a, b in TOUTES],
                                                            lag_ratio=0.08), run_time=0.9)
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        ep = ethan(1.0).move_to(P(-5.3, 0.2))
        self.au_mot("Voici Ethan")
        nom = self.t("Ethan", 42, BLEU_CALCUL).next_to(ep, UP, buff=0.2)
        self.play(FadeIn(ep, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("aquariums en verre")
        met = self.bloc(["fabricant", "d'aquariums"], 28, BLEU_CALCUL).next_to(ep, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        aq = aquarium(e=0.05, centre=P(0.2, 0.7))
        eau = aq.face(0, "#0ea5e9", 0.35)
        fs = VGroup(poisson(1.0).move_to(aq.centre_face(0) + P(-0.4, 0.15)),
                    poisson(0.8, "#facc15").move_to(aq.centre_face(0) + P(0.5, -0.35)))
        self.au_mot("en forme de pavé droit")
        self.play(FadeIn(aq, shift=UP * 0.2), FadeIn(eau), FadeIn(fs), run_time=0.5)
        self.au_mot("il colle un joint")
        self.play(LaggedStart(*[Create(aq.arete_ab(a, b, JOINT, 8)) for a, b in TOUTES], lag_ratio=0.06),
                  run_time=0.9)
        p = aq.p2
        cl = self.t("60 cm", 30, LONG_C).next_to(Line(p[0], p[1]), DOWN, buff=0.2)
        cp = self.t("30 cm", 30, LARG_C).move_to((p[1] + p[5]) / 2 + P(0.75, -0.15))
        ch = self.t("40 cm", 30, HAUT_C).next_to(Line(p[0], p[3]), LEFT, buff=0.2)
        self.aux_extraits([cl, cp, ch], ["60 centimètres de long", "30 de large", "40 de haut"])
        self.au_mot("Combien de joint lui faut-il")
        q = self.t("Combien de joint lui faut-il ?", 38, JAUNE_TITRE).move_to(P(0.6, -2.5))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : 12 arêtes = 4 + 4 + 4 ──────────────────────────────────────────
    def ecran_par_quatre(self):
        self.ecran("02-par-quatre")
        aq = aquarium(e=0.05, centre=P(-3.6, 0.5))
        self.add(aq)
        x = 0.4
        l0 = self.ligne([("Un pavé a", WHITE), ("12 arêtes :", JOINT)], 34, buff=0.2)
        gauche(l0, x, 2.5)
        self.au_mot("Un pavé a")
        self.play(FadeIn(l0[0]), run_time=0.25)
        self.aux_extraits([VGroup(l0[1], aretes(aq, TOUTES, JOINT, 6))], ["12 arêtes"])
        gr = [("4 longueurs,", LONG_C, LONG, "4 longueurs"), ("4 largeurs,", LARG_C, LARG, "4 largeurs"),
              ("et 4 hauteurs.", HAUT_C, HAUT, "4 hauteurs")]
        for k, (txt, col, g, ex) in enumerate(gr):
            lg = self.t(txt, 34, col)
            gauche(lg, x + 0.4, 1.6 - 0.75 * k)
            self.aux_extraits([VGroup(lg, aretes(aq, g, col))], [ex])
        g = self.bloc(["On calcule 4 fois", "chaque mesure."], 36, VERT_OK)
        gauche(g, x, -1.4)
        self.aux_extraits([g[0], g[1]], ["4 fois chaque", "chaque mesure"])
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    # ── 03 : le calcul, et le joint dessiné bout à bout ─────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        aq = aquarium(e=0.04, centre=P(-3.9, 1.3))
        self.add(aq)
        x = 0.4
        s = 0.01  # 1 cm de joint = 0,01 unité : 520 cm = 5,2
        x0 = -6.0
        y_bar = -2.3
        morceaux = []
        gr = [("4 × 60", "= 240", LONG_C, LONG, "4 fois 60", "240. 4", 240),
              ("4 × 30", "= 120", LARG_C, LARG, "4 fois 30", "120. 4", 120),
              ("4 × 40", "= 160", HAUT_C, HAUT, "4 fois 40", "160. 240", 160)]
        xb = x0
        for k, (a, b, col, g, ex1, ex2, v) in enumerate(gr):
            lg = self.ligne([(a, col), (b, col)], 36, buff=0.2)
            gauche(lg, x, 2.55 - 0.8 * k)
            seg = Rectangle(width=v * s, height=0.32, fill_color=col, fill_opacity=0.9, stroke_color=WHITE,
                            stroke_width=2)
            seg.move_to(P(xb + v * s / 2, y_bar))
            xb += v * s
            morceaux.append(seg)
            self.aux_extraits([VGroup(lg[0], aretes(aq, g, col))], [ex1])
            self.aux_extraits([VGroup(lg[1], seg)], [ex2])
        som = self.ligne([("240", LONG_C), ("+ 120", LARG_C), ("+ 160", HAUT_C), ("= 520 cm", WHITE)], 32, buff=0.18)
        gauche(som, 0.2, 0.0)
        self.aux_extraits(som, ["240 plus 120", "120 plus 160", "160 : 520", "520 centimètres"])
        acc = BraceBetweenPoints(P(x0, y_bar - 0.2), P(x0 + 520 * s, y_bar - 0.2), DOWN, color=WHITE)
        lab = self.t("520 cm", 28).next_to(acc, DOWN, buff=0.1)
        hors_audit(lab)
        self.play(FadeIn(acc), FadeIn(lab), run_time=0.3)
        g = self.gros("C'est 5,2 m de joint.", couleur=VERT_OK, fs=34)
        gauche(g, 0.2, -1.0)
        self.aux_extraits([g], ["5,2 mètres"])
        self.insister(g, 1.08, 0.25)
        self.attendre_voix()

    # ── 04 : les vitres ─────────────────────────────────────────────────────
    def ecran_vitres(self):
        self.ecran("04-vitres")
        aq = aquarium(e=0.05, centre=P(-3.8, 0.9))
        self.add(aq)
        x = 0.2
        self.au_mot("Et combien de vitres")
        l0 = self.t("Et combien de vitres ?", 36, JAUNE_TITRE)
        gauche(l0, x, 2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ouvert en haut")
        l1 = self.t("Ouvert en haut :", 32, ROUGE_ERREUR)
        gauche(l1, x, 1.85)
        haut = DashedVMobject(Polygon(*[aq.pt(i) for i in (3, 2, 6, 7)], stroke_color=ROUGE_ERREUR, stroke_width=7),
                              num_dashes=30)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(haut), run_time=0.4)
        l2 = self.ligne([("6 faces", WHITE), ("− 1", ROUGE_ERREUR), ("= 5 vitres.", VERT_OK)], 32, buff=0.2)
        gauche(l2, x + 0.4, 1.2)
        self.aux_extraits(l2, ["6 faces", "1, 5 vitres", "5 vitres."])
        rangs = [(("Le fond :", "60", "sur 30,"), [2], (60, 30), 1, ("Le fond", "60 sur 30", "30, deux")),
                 (("deux vitres de", "60", "sur 40,"), [0, 1], (60, 40), 2, ("deux vitres", "60 sur 40", "40, et")),
                 (("et deux de", "30", "sur 40."), [4, 5], (30, 40), 2, ("et deux", "30 sur 40", "40."))]
        prec = VGroup()
        xr = -5.9
        for k, (txt, fa, (w, h), n, ex) in enumerate(rangs):
            y = 0.35 - 0.8 * k
            t = self.ligne([(txt[0], WHITE), (txt[1], WHITE), (txt[2], WHITE)], 30, buff=0.16)
            gauche(t, x, y)
            rs = VGroup(*[rect_plat(w, h) for _ in range(n)]).arrange(RIGHT, buff=0.15)
            rs.move_to(P(0, -1.9)).align_to(P(xr, 0), LEFT)
            xr = rs.get_right()[0] + 0.3
            surl = VGroup(*[aq.face(f, "#0ea5e9", 0.6) for f in fa])
            self.aux_extraits([VGroup(t[0], surl), t[1], VGroup(t[2], rs)], list(ex))
            self.play(FadeOut(prec), run_time=0.15)
            prec = surl
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self._q_hmax = 1.75
        self.clear()
        self.add_mascotte()
        aq = aquarium(25, 25, 25, e=0.06, centre=P(-4.4, 1.3))
        ca = self.t("25 cm", 28, JAUNE_TITRE).next_to(Line(aq.pt(0), aq.pt(1)), DOWN, buff=0.12)
        hors_audit(ca)

        def autres_q(sc):
            sc.play(FadeIn(aq, shift=UP * 0.2), FadeIn(ca), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["Un cube a", "12 arêtes pareilles."], fs=32, buff=0.18, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg[0], VGroup(lg[1], aretes(aq, TOUTES, JOINT, 7))], ["Un cube a", "12 arêtes pareilles"])
            lg1 = sc.rep_bas(1, ["12 × 25", "= 300 cm,"], fs=32, buff=0.2, y0=-1.4, pas=0.6)
            sc.aux_extraits(lg1, ["12 fois 25", "300 centimètres"])
            lg2 = sc.rep_bas(2, ["c'est 3 mètres."], fs=32, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg2], ["3 mètres"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Un aquarium en cube", "a des arêtes de 25 cm.",
                             "Combien de joint", "pour toutes ses arêtes ?"],
                            [self.choix("3 mètres"), self.choix("1 mètre"), self.choix("1,5 mètre")], 0,
                            ["Un cube a 12 arêtes pareilles.", "12 × 25 = 300 cm,", "c'est 3 mètres."],
                            mot_q="Un aquarium en cube", autres_q=autres_q, autres_r=apres)
        self._q_hmax = None

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        aq = aquarium(e=0.05, centre=P(-3.8, 0.0))
        x = 0.2
        self.au_mot("on ne fait pas seulement")
        l0 = self.t("On ne fait pas seulement", 32)
        gauche(l0, x, 2.0)
        self.play(FadeIn(aq), FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("60", LONG_C), ("+ 30", LARG_C), ("+ 40 :", HAUT_C)], 36, buff=0.2)
        gauche(l1, x + 0.4, 1.25)
        trois = [aq.arete_ab(0, 1, LONG_C, 10), aq.arete_ab(1, 5, LARG_C, 10), aq.arete_ab(0, 3, HAUT_C, 10)]
        self.aux_extraits([VGroup(l1[0], trois[0]), VGroup(l1[1], trois[1]), VGroup(l1[2], trois[2])],
                          ["60 plus 30", "30 plus 40", "40 : ça"])
        barre = Line(l1.get_left() + LEFT * 0.1, l1.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=6)
        l2 = self.t("ça ne compte que", 32, ROUGE_ERREUR)
        gauche(l2, x, 0.3)
        self.au_mot("ça ne compte que")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(barre), run_time=0.3)
        l2b = self.ligne([("3 arêtes", ROUGE_ERREUR), ("sur 12.", ROUGE_ERREUR)], 32, buff=0.18)
        gauche(l2b, x, -0.35)
        self.aux_extraits(l2b, ["3 arêtes", "12. Chaque"])
        g = self.bloc(["Chaque mesure", "revient 4 fois."], 36, VERT_OK)
        gauche(g, x, -1.6)
        self.aux_extraits([g[0], VGroup(g[1], aretes(aq, LONG, LONG_C, 7), aretes(aq, LARG, LARG_C, 7),
                                        aretes(aq, HAUT, HAUT_C, 7))], ["Chaque mesure", "4 fois."])
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        aq = aquarium(50, 20, 30, e=0.042, centre=P(-4.1, 1.4))
        p = aq.p2
        cl = self.t("50 cm", 26, LONG_C).next_to(Line(p[0], p[1]), DOWN, buff=0.12)
        cp = self.t("30 cm", 26, LARG_C).move_to((p[1] + p[5]) / 2 + P(0.6, -0.12))
        ch = self.t("?", 34, HAUT_C).next_to(Line(p[0], p[3]), LEFT, buff=0.15)
        cot = VGroup(cl, cp, ch)
        for m in cot:
            hors_audit(m)
        h20 = self.t("20 cm", 26, HAUT_C).next_to(Line(p[0], p[3]), LEFT, buff=0.12)
        hors_audit(h20)

        def autres_q(sc):
            sc.play(FadeIn(aq, shift=UP * 0.2), FadeIn(cot), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, ["longueur", "+ largeur", "+ hauteur :"], fs=30, buff=0.18, y0=-1.4, pas=0.6)
            sc.aux_extraits(lg, ["Une longueur", "une largeur", "une hauteur"])
            lg1 = sc.rep_bas(1, ["400 ÷ 4", "= 100 cm."], fs=30, buff=0.2, y0=-1.4, pas=0.6)
            sc.aux_extraits(lg1, ["400 divisé par 4", "100 centimètres"])
            lg2 = sc.rep_bas(2, ["100 − 50", "− 30 :"], fs=30, buff=0.18, y0=-1.4, pas=0.6)
            sc.aux_extraits(lg2, ["100 moins 50", "30 : la"])
            lg3 = sc.rep_bas(3, ["la hauteur mesure", "20 cm."], fs=30, buff=0.18, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg3[0], VGroup(lg3[1], aretes(aq, HAUT, HAUT_C, 7))],
                            ["la hauteur mesure", "20 centimètres"])
            sc.play(FadeOut(ch), FadeIn(h20), run_time=0.25)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un pavé : 50 cm de long,", "largeur : 30 cm.",
                             "Pour toutes ses arêtes : 400 cm.", "Quelle est sa hauteur ?"],
                            [self.choix("100 cm"), self.choix("320 cm"), self.choix("20 cm")], 2,
                            ["longueur + largeur + hauteur :", "400 ÷ 4 = 100 cm.", "100 − 50 − 30 :",
                             "la hauteur mesure 20 cm."],
                            mot_q="Un aquarium en pavé", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def rouleau(self, centre):
        c = np.array(centre)
        return VGroup(Circle(radius=0.6, fill_color=JOINT, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
                      .move_to(c),
                      Circle(radius=0.25, fill_color="#0b1220", fill_opacity=1, stroke_width=0).move_to(c),
                      Rectangle(width=0.9, height=0.14, fill_color=JOINT, fill_opacity=1, stroke_width=0)
                      .move_to(c + P(0.7, -0.53)))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ro = self.rouleau(P(-4.8, 1.3))
        x = -2.4
        l0 = self.ligne([("Ethan a", WHITE), ("10 mètres de joint.", JOINT)], 32, buff=0.2)
        gauche(l0, x, 1.9)
        self.au_mot("Ethan a")
        self.play(FadeIn(l0[0]), FadeIn(ro, shift=UP * 0.2), run_time=0.3)
        self.aux_extraits([l0[1]], ["10 mètres de joint"])
        aq = aquarium(40, 40, 40, e=0.035, centre=P(-4.8, -0.9))
        ca = self.t("40 cm", 26, JAUNE_TITRE).next_to(Line(aq.pt(0), aq.pt(1)), DOWN, buff=0.12)
        hors_audit(ca)
        l1 = self.bloc(["Il fabrique des aquariums", "en cube de 40 cm d'arête."], 32)
        gauche(l1, x, 0.85)
        self.au_mot("Il fabrique des aquariums")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(aq, shift=UP * 0.2), run_time=0.35)
        self.aux_extraits([VGroup(l1[1], ca)], ["40 centimètres d'arête"])
        q = self.bloc(["Combien d'aquariums", "peut-il finir ?"], 36, JAUNE_TITRE)
        gauche(q, x, -0.45)
        self.au_mot("Combien d'aquariums")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("peut-il finir")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, x, -1.75)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        x = -6.2
        s = 0.5          # 1 m de joint = 0,5 unité
        x0, yb = -6.0, -2.45
        tout = Rectangle(width=10 * s, height=0.34, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                         stroke_width=3).move_to(P(x0 + 5 * s, yb))
        l10 = self.t("Ses 10 m de joint", 26, JOINT).next_to(tout, DOWN, buff=0.12)
        hors_audit(l10)
        self.play(FadeIn(tout), FadeIn(l10), run_time=0.3)
        cubes = [aquarium(40, 40, 40, e=0.022, centre=P(2.3 + 1.45 * k, 1.9)) for k in range(3)]

        def seg(a, b, col=JOINT, op=0.95):
            return Rectangle(width=(b - a) * s, height=0.34, fill_color=col, fill_opacity=op, stroke_color=WHITE,
                             stroke_width=2).move_to(P(x0 + (a + b) / 2 * s, yb))

        l1 = self.ligne([("Un aquarium :", WHITE), ("12 × 40", WHITE), ("= 480 cm,", WHITE)], 30, buff=0.2)
        gauche(l1, x, 2.25)
        self.au_mot("Un aquarium")
        self.play(FadeIn(l1[0]), FadeIn(cubes[0]), run_time=0.3)
        self.aux_extraits(l1[1:], ["12 fois 40", "480 centimètres"])
        l2 = self.t("soit 4,8 m.", 30, JOINT)
        gauche(l2, x + 0.4, 1.6)
        self.aux_extraits([VGroup(l2, seg(0, 4.8))], ["4,8 mètres"])
        l3 = self.ligne([("2 aquariums :", WHITE), ("9,6 m.", JOINT)], 30, buff=0.2)
        gauche(l3, x, 0.85)
        self.au_mot("2 aquariums")
        self.play(FadeIn(l3[0]), FadeIn(cubes[1]), run_time=0.3)
        self.aux_extraits([VGroup(l3[1], seg(4.8, 9.6))], ["9,6 mètres"])
        l4 = self.ligne([("3 aquariums :", WHITE), ("14,4 m,", ROUGE_ERREUR), ("c'est trop.", ROUGE_ERREUR)], 30,
                        buff=0.2)
        gauche(l4, x, 0.2)
        trop = VGroup(DashedVMobject(Rectangle(width=4.8 * s, height=0.34, stroke_color=ROUGE_ERREUR, stroke_width=4),
                                     num_dashes=24).move_to(P(x0 + 12 * s, yb)))
        croix = VGroup(Line(P(-0.3, -0.3), P(0.3, 0.3)), Line(P(-0.3, 0.3), P(0.3, -0.3))) \
            .set_stroke(ROUGE_ERREUR, 7).move_to(cubes[2])
        self.au_mot("3 aquariums")
        self.play(FadeIn(l4[0]), FadeIn(cubes[2]), run_time=0.3)
        self.aux_extraits([VGroup(l4[1], trop)], ["14,4 mètres"])
        self.aux_extraits([VGroup(l4[2], croix)], ["c'est trop"])
        g = self.gros("Ethan en finit 2,", couleur=VERT_OK, fs=36)
        gauche(g, x, -0.75)
        self.aux_extraits([g], ["2, et il"])
        l5 = self.ligne([("et il lui reste", VERT_OK), ("40 cm de joint.", VERT_OK)], 30, buff=0.18)
        gauche(l5, x, -1.6)
        reste = seg(9.6, 10, VERT_OK)
        self.aux_extraits([l5[0], VGroup(l5[1], reste)], ["il lui reste", "40 centimètres de joint"])
        self.play(Indicate(reste, color=VERT_OK, scale_factor=1.3), run_time=0.4)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        aq = aquarium(e=0.04)
        aq.add(aretes(aq, LONG, LONG_C, 7), aretes(aq, LARG, LARG_C, 7), aretes(aq, HAUT, HAUT_C, 7))
        lignes = self.finale_gauche(aq, textes=[
            ("Un pavé a 12 arêtes : 4 longueurs,", "4 largeurs, 4 hauteurs."),
            ("Dans un défi de solides, on compte", "les faces, les arêtes et les sommets,"),
            ("puis on calcule, étape par étape.",)], fs=30, x_fig=-4.9, xl=-2.4)
        self.add(aq)
        self.au_mot("Un pavé a 12 arêtes")
        self.montrer_ligne(lignes[0])
        self.au_mot("Dans un défi de solides")
        self.montrer_ligne(lignes[1])
        self.au_mot("puis on calcule")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_par_quatre()
        self.ecran_calcul()
        self.ecran_vitres()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class SolidesDefiCM2(SolidesDefiBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "bleue"
