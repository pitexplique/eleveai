# frac_decimal_v2.py
# EleveAI — Maths 6e — série « Fractions », épisode 04 v2 : RELIER FRACTION ET
# DÉCIMAL (micro du coach : fraction_decimal, refaite le 31/10/2026, commit
# 9e748448). Paysage 16:9, CEINTURE VERTE, AVEC VOIX (validée par Frédéric le
# 31/10 : manim/scripts/6e/voix-frac-decimal-v2.md).
# ⭐ Remplace frac_decimal.py (qui partait de 3/4 = 3 ÷ 4 = 0,75) : la micro
# passe maintenant par les FRACTIONS DÉCIMALES sur la DROITE GRADUÉE en
# dixièmes, la fraction AU-DESSUS du point, le décimal EN DESSOUS
# (7/10 = 0,7 ; 13/10 = 1,3), et le piège 7/100 = 0,07 (pas 0,7).
# Short jumeau : frac_decimal_v2_short.py (Rayan, menuisier, 13/10 = 1,3).
#
# Décor et métier : Maëlys, COUTURIÈRE (costume de théâtre) : son patron dit
# 7/10 de mètre, son mètre ruban n'affiche que des virgules. Centres : mode,
# théâtre / arts. Aucune donnée du monde réel citée.
# Vérifié (Python) : 7/10 = 0,7 ; 13/10 = 1,3 ; 4/10 = 0,4 ; 1/100 = 0,01 ;
# 25/100 = 0,25 ; 7/100 = 0,07 ; 0,37 = 37/100 ; 1,6 = 16/10 = 1 + 6/10.
#
# Micro → écrans : un dixième sur la droite (02), compter les dixièmes,
# 7/10 = 0,7 (03), QUESTION 1 4/10 = 0,4 (04 ; leurres 4,10 et 0,04), fraction
# plus grande que 1 (05, 06 : 13/10 = 1 + 3/10 = 1,3), la règle (07), les
# centièmes (08), le piège 7/100 = 0,07 (09), QUESTION 2 0,37 = 37/100 (10 ;
# leurres 3,7 et 370), défi 1,6 = 16/10 placé sur la droite (11).
# Écrans : 01 Maëlys (titre et ceinture) · 02 un dixième · 03 compter ·
# 04 QUESTION 1 · 05 plus que 1 · 06 13/10 · 07 la règle · 08 les centièmes ·
# 09 le piège · 10 QUESTION 2 · 11 défi · 11b correction · 12 ce que tu as
# appris · 13 fin.
# Voix : manim/voix/6e-frac-decimal-v2.json (débit −10), WAV dans
# public/sons/6e-frac-decimal-v2/ ; marques : frac_decimal_v2_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_decimal_v2.py FracDecimal6eV2 -o eleveai-maths-6e-frac-decimal-v2 --media_dir manim/scripts/6e/media-frac-decimal-v2
# Sortie : manim/sorties/6e/maths/fractions/04-decimal/eleveai-maths-6e-frac-decimal-v2.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403
from frac_lire_ecrire import FracLireEcrireBase  # noqa: E402  (rep, q_tete, montrer2)

TISSU = "#a855f7"
RUBAN = "#facc15"
VERT_CARTE = "#15803d"   # le décimal, sous la droite (lisible sur la carte claire)


def sans_synchro(m):
    for f in m.get_family():
        f.sans_synchro = True
    return m


def couturiere(s=1.0):
    """Maëlys, couturière : chignon, blouse, mètre ruban autour du cou, ciseaux."""
    tete = Circle(radius=0.4, fill_color="#8d5524", fill_opacity=1, stroke_width=0)
    chignon = VGroup(Sector(radius=0.43, angle=PI, start_angle=0, fill_color="#1f2937", fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.22)),
                     Circle(radius=0.2, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(P(0, 0.55)))
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color="#ec4899",
                    fill_opacity=1, stroke_width=0)
    ruban = VGroup(Line(P(-0.3, -0.45), P(-0.35, -1.5), color=RUBAN, stroke_width=9),
                   Line(P(0.3, -0.45), P(0.35, -1.5), color=RUBAN, stroke_width=9))
    lame = VGroup(Line(P(0.55, -1.05), P(1.05, -0.55), color="#e5e7eb", stroke_width=5),
                  Line(P(0.55, -0.55), P(1.05, -1.05), color="#e5e7eb", stroke_width=5),
                  Circle(radius=0.09, color="#e5e7eb", stroke_width=4).move_to(P(0.5, -1.1)),
                  Circle(radius=0.09, color="#e5e7eb", stroke_width=4).move_to(P(0.5, -0.5)))
    return VGroup(corps, ruban, lame, tete, chignon).scale(s)


def metre_ruban(largeur=5.4, hauteur=0.62, centre=ORIGIN):
    """Le mètre ruban jaune : 10 intervalles, des nombres À VIRGULE (0,1 … 0,9)."""
    bande = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.08, fill_color=RUBAN, fill_opacity=1,
                             stroke_color="#a16207", stroke_width=3)
    g = VGroup(bande)
    x0 = -largeur / 2 + 0.2
    pas = (largeur - 0.4) / 10
    for k in range(11):
        x = x0 + k * pas
        g.add(Line(P(x, hauteur / 2), P(x, hauteur / 2 - (0.26 if k in (0, 10) else 0.18)), color=NUIT,
                   stroke_width=3))
        e = Text("0" if k == 0 else "1" if k == 10 else f"0,{k}", font_size=18, color=NUIT)
        e.sans_synchro = True
        g.add(e.move_to(P(x, -hauteur / 2 + 0.17)))
    return g.move_to(centre)


def segment(dr, a, b, couleur=BLEU_PART, sw=12):
    """Un morceau de la droite qui s'allume, de a à b."""
    return Line(dr.p(a), dr.p(b), color=couleur, stroke_width=sw)


def decimal_sous(dr, v, s, fs=None, couleur=VERT_CARTE):
    """Le décimal EN DESSOUS du point (à la hauteur des étiquettes 0, 1, 2)."""
    t = texte(s, fs or dr.opts["fs"], color=couleur)
    t.sans_synchro = True
    return t.next_to(dr.p(v) + DOWN * 0.25, DOWN, buff=0.12)


def lien(dr, v, haut=0.45, bas=0.18, couleur=AMBRE):
    """Le pointillé qui relie la fraction (dessus) et le décimal (dessous) : même point."""
    x = dr.p(v)
    return DashedLine(x + UP * haut, x + DOWN * bas, color=couleur, stroke_width=4, dash_length=0.08)


class FracDecimalV2Base(FracLireEcrireBase):
    nom_voix = "6e-frac-decimal-v2"
    fichier_marques = "frac_decimal_v2_marques.json"

    def _attente(self, textes):
        # ⭐ une fraction écrite (13/10) ne guette pas le prochain « 10 » de la voix :
        # sans ce filtre, son dénominateur attendait « 10 dixièmes » et la fraction se coupait en deux
        return super()._attente([f for f in textes if not getattr(f, "sans_synchro", False)])

    def _disposer_q(self, question, choix, phrase):
        # l'explication est posée AU MOT par rep() : ses lignes ne cherchent pas leurs jetons
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        sans_synchro(ph)
        return tete, q, cartes, pause, rebours, ph

    def droite2(self, longueur=11.0, centre=P(-0.3, 0.2), fs=34):
        return Droite(0, 2, 20, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=longueur, centre=centre, fs=fs)

    # ── 01 : Maëlys, couturière (titre et ceinture) ─────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        titre, ident, ech = self.garde("Fraction et nombre décimal", self.identite, self.ceinture)
        pers = couturiere(1.1).move_to(P(-5.0, 0.3))  # « couturière » au-dessus de l'échelle des ceintures
        nom = self.t("Maëlys", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.au_mot("Maëlys")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(pers, shift=UP * 0.3),
                  FadeIn(nom), run_time=0.6)
        self.au_mot("couturière")
        metier = self.t("couturière", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        self.au_mot("du tissu")
        tissu = RoundedRectangle(width=1.5, height=1.9, corner_radius=0.1, fill_color=TISSU, fill_opacity=1,
                                 stroke_width=0).move_to(P(-2.7, -0.3))
        motif = VGroup(*[Dot(P(-3.15 + 0.45 * (i % 3), 0.35 - 0.45 * (i // 3)), radius=0.06, color="#f5d0fe")
                         for i in range(12)])
        self.play(FadeIn(tissu, shift=LEFT * 0.2), FadeIn(motif), run_time=0.5)
        self.au_mot("Sur son patron")
        lp = self.t("Patron :", 36, NUIT)
        f = EcritureFraction(7, 10, fs=46, couleur=NUIT)
        m = self.t("de mètre", 34, NUIT)
        m.sans_synchro = True
        corps = VGroup(lp, f, m).arrange(RIGHT, buff=0.25)
        papier = RoundedRectangle(width=corps.width + 0.6, height=1.25, corner_radius=0.12, fill_color="#fef3c7",
                                  fill_opacity=1, stroke_color="#a16207", stroke_width=3)
        corps.move_to(papier)
        self.col(VGroup(papier, corps), 1.2)
        self.play(FadeOut(ident), FadeOut(ech), FadeIn(papier), FadeIn(lp), run_time=0.5)
        self.au_mot("7 dixièmes")
        self.play(FadeIn(f, scale=1.3), FadeIn(m), run_time=0.45)
        self.insister(f, 1.3, 0.25)
        self.au_mot("son mètre ruban")
        rb = metre_ruban(largeur=5.5, centre=P(0, -0.45))
        self.col(rb, -0.45)
        self.play(FadeIn(rb, shift=UP * 0.2), run_time=0.6)
        self.au_mot("des virgules")
        self.play(LaggedStart(*[Indicate(e, color=AMBRE, scale_factor=1.4) for e in rb if isinstance(e, Text)][1:-1],
                              lag_ratio=0.1), run_time=1.0)
        self.au_mot("Où couper")
        q = self.col(self.t("Où couper ?", 44, ORANGE_RETENUE), -1.6)
        self.play(FadeIn(q, scale=0.8), run_time=0.4)
        self.attendre_voix()

    # ── 02 : un dixième ─────────────────────────────────────────────────────
    def droite1(self):
        return Droite(0, 1, 10, etiquettes={0: "0", 1: "1"}, longueur=10.5, centre=P(-0.4, 0.6), fs=36)

    def ecran_dixiemes(self):
        self.ecran("02-dixiemes")
        rb = metre_ruban(largeur=10.5, hauteur=0.8, centre=P(-0.4, 0.4))
        self.add(rb)
        dr = self.droite1()
        corps = VGroup(dr.carte, dr.axe, *dr.ticks.values())
        self.au_mot("Sur le ruban")
        tit = self.t("Sur le ruban", 46, JAUNE_TITRE).move_to(P(-0.4, 3.0))
        self.play(Write(tit), ReplacementTransform(rb, corps), run_time=0.9)  # les étiquettes 0 et 1 : au mot
        self.au_mot("0 et 1")
        self.play(FadeIn(dr.etiquettes[0], scale=1.3), FadeIn(dr.etiquettes[1], scale=1.3), run_time=0.4)
        self.au_mot("10 petits")
        l1 = self.t("10 intervalles égaux", 40).move_to(P(-0.4, -1.5))
        self.play(FadeIn(l1, shift=UP * 0.15),
                  LaggedStart(*[Indicate(dr.ticks[i], color=AMBRE, scale_factor=1.8) for i in range(11)],
                              lag_ratio=0.12), run_time=1.2)
        self.au_mot("Chacun")
        s1 = segment(dr, 0, 0.1, AMBRE)
        self.play(Create(s1), run_time=0.4)
        self.au_mot("1 sur 10")
        pt = dr.point(0.1, (1, 10), haut=0.45)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("0,1")
        d = decimal_sous(dr, 0.1, "0,1")
        l2 = VGroup(self.inline("1/10", 44), self.t("= 0,1", 44, VERT_OK)).arrange(RIGHT, buff=0.25)
        l2.move_to(P(-0.4, -2.45))
        self.play(FadeIn(d, scale=1.4), FadeIn(l2, shift=UP * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 03 : compter les dixièmes ───────────────────────────────────────────
    def ecran_compter(self):
        self.ecran("03-compter")
        dr = self.droite1()
        self.add(dr)
        for k, mot in enumerate(["Un dixième", "deux", "trois", "quatre", "cinq", "six", "sept"]):
            self.au_mot(mot)
            self.play(Create(segment(dr, k / 10, (k + 1) / 10)),
                      Indicate(dr.ticks[k + 1], color=AMBRE, scale_factor=1.8), run_time=0.3)
        self.au_mot("7 dixièmes")
        pt = dr.point(0.7, (7, 10), haut=0.45)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.insister(pt[2], 1.4, 0.25)
        self.au_mot("0,7")
        d = decimal_sous(dr, 0.7, "0,7")
        self.play(FadeIn(d, scale=1.4), run_time=0.4)
        self.au_mot("C'est le même point")
        self.play(Create(lien(dr, 0.7)), run_time=0.5)
        self.au_mot("le même nombre")
        l2 = VGroup(self.inline("7/10", 60), self.t("= 0,7", 60, VERT_OK)).arrange(RIGHT, buff=0.3)
        l2.move_to(P(-0.4, -1.9))
        self.play(FadeIn(l2, scale=1.2), run_time=0.45)
        self.play(Create(self.encadrer(l2)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (4/10 = ?) ──────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        dr = Droite(0, 1, 10, etiquettes={0: "0", 1: "1"}, longueur=5.0, centre=P(-3.2, 0.2), fs=30)
        self.add(dr)
        pt = dr.point(0.4, (4, 10), haut=0.4, fs=30)
        qm = Text("?", font_size=40, color=ORANGE_TROU).next_to(dr.p(0.4) + DOWN * 0.25, DOWN, buff=0.08)
        qm.sans_synchro = True
        d = decimal_sous(dr, 0.4, "0,4", fs=30)

        def avant(sc):
            sc.au_mot("4 dixièmes")
            sc.q_tete(FadeIn(pt, shift=DOWN * 0.2), FadeIn(qm, scale=1.3))

        def apres(sc):
            sc.rep(0, "0,4", FadeOut(qm), FadeIn(d, scale=1.4))
            sc.rep(1, "le 4", Indicate(d[-1], color=AMBRE, scale_factor=1.8))
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["Au-dessus, on lit 4/10.",
                                                           "Qu'écrit-on dessous ?"],
                            [self.inline("4,10"), self.inline("0,4"), self.inline("0,04")], 1,
                            ["4/10 = 0,4", "le 4 juste après la virgule"], mot_q="Au-dessus",
                            avant_q=avant, autres_r=apres)

    # ── 05 : plus que 1 ─────────────────────────────────────────────────────
    def ecran_plus_que_1(self):
        self.ecran("05-plus-que-1")
        dr = self.droite2()
        self.au_mot("Pour la manche")
        lm = self.t("La manche :", 44).move_to(P(-3.2, 2.85))
        self.play(FadeIn(dr), FadeIn(lm, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("13 dixièmes")
        f = EcritureFraction(13, 10, fs=60).next_to(lm, RIGHT, buff=0.3)
        m = self.t("de mètre", 40).next_to(f, RIGHT, buff=0.25)
        m.sans_synchro = True
        self.play(FadeIn(f, scale=1.3), FadeIn(m), run_time=0.45)
        self.au_mot("Plus grand que 1")
        q = self.t("Plus grand que 1 ?", 42, ORANGE_RETENUE).move_to(P(-2.2, -1.75))
        self.play(FadeIn(q, scale=0.8), Indicate(dr.etiquettes[1], color=AMBRE, scale_factor=1.6), run_time=0.5)
        self.au_mot("Oui")
        oui = self.t("Oui !", 42, VERT_OK).next_to(q, RIGHT, buff=0.4)
        self.play(FadeIn(oui, scale=1.3), run_time=0.3)
        l2 = VGroup(self.inline("10/10", 46), self.t("= 1 mètre", 46, VERT_OK)).arrange(RIGHT, buff=0.25)
        l2.move_to(P(-2.2, -2.7))
        self.au_mot("10 dixièmes")
        self.play(FadeIn(l2[0], shift=UP * 0.15),
                  LaggedStart(*[Create(segment(dr, k / 10, (k + 1) / 10)) for k in range(10)], lag_ratio=0.15),
                  run_time=1.0)
        self.au_mot("1 mètre")
        self.play(FadeIn(l2[1], shift=UP * 0.15), Indicate(dr.etiquettes[1], color=VERT_OK, scale_factor=1.6),
                  run_time=0.5)
        self.attendre_voix()

    # ── 06 : 13/10 = 1 + 3/10 = 1,3 (agrandir puis rétrécir 13/10) ──────────
    def ecran_treize(self):
        self.ecran("06-treize")
        dr = self.droite2()
        self.add(dr)
        f13 = EcritureFraction(13, 10, fs=64)
        eg1 = self.inline("=", 56)
        f10 = EcritureFraction(10, 10, fs=64)
        pl1 = self.inline("+", 56)
        f3 = EcritureFraction(3, 10, fs=64)
        eg2 = self.inline("=", 56)
        un = self.inline("1", 64)
        pl2 = self.inline("+", 56)
        f3b = EcritureFraction(3, 10, fs=64)
        rang = VGroup(f13, eg1, f10, pl1, f3, eg2, un, pl2, f3b).arrange(RIGHT, buff=0.3).move_to(P(-0.4, 2.65))
        for m in (eg1, pl1, eg2, un, pl2):
            m.set_y(f13.trait.get_y())
        self.au_mot("13 dixièmes")
        self.play(FadeIn(f13, scale=1.3), run_time=0.4)
        self.insister(f13, 1.5, 0.3)
        self.au_mot("10 dixièmes")
        self.play(FadeIn(eg1), FadeIn(f10, scale=1.2),
                  LaggedStart(*[Create(segment(dr, k / 10, (k + 1) / 10)) for k in range(10)], lag_ratio=0.1),
                  run_time=0.8)
        self.au_mot("plus 3")
        self.play(FadeIn(pl1), FadeIn(f3, scale=1.2),
                  LaggedStart(*[Create(segment(dr, 1 + k / 10, 1 + (k + 1) / 10, AMBRE)) for k in range(3)],
                              lag_ratio=0.3), run_time=0.7)
        self.au_mot("1 plus")
        self.play(FadeIn(eg2), FadeIn(un, scale=1.3), Indicate(dr.etiquettes[1], color=AMBRE, scale_factor=1.6),
                  run_time=0.4)
        self.play(FadeIn(pl2), FadeIn(f3b, scale=1.2), run_time=0.35)
        self.au_mot("13 dixièmes", n=2)
        pt = dr.point(1.3, (13, 10), haut=0.45)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.insister(pt[2], 1.4, 0.25)
        self.au_mot("1,3")
        d = decimal_sous(dr, 1.3, "1,3")
        self.play(FadeIn(d, scale=1.4), run_time=0.4)
        self.play(Create(lien(dr, 1.3)), run_time=0.5)
        self.attendre_voix()

    # ── 07 : la règle ───────────────────────────────────────────────────────
    def figure_complete(self, dr):
        """La droite de 0 à 2 : 7/10 et 13/10 dessus, 0,7 et 1,3 dessous."""
        return VGroup(dr.point(0.7, (7, 10), haut=0.45), dr.point(1.3, (13, 10), haut=0.45),
                      decimal_sous(dr, 0.7, "0,7"), decimal_sous(dr, 1.3, "1,3"))

    def ecran_regle(self):
        self.ecran("07-regle")
        dr = self.droite2()
        fig = self.figure_complete(dr)
        self.add(dr, fig)
        self.au_mot("la règle")
        tit = self.t("La règle", 46, JAUNE_TITRE).move_to(P(-0.4, 3.0))
        self.play(Write(tit), run_time=0.5)
        self.au_mot("le dénominateur 10")
        l1 = self.ligne([("dénominateur", WHITE), ("10", BLEU_CALCUL)], 42).move_to(P(-1.0, -1.75))
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(fig[0][2].den, color=AMBRE, scale_factor=1.6),
                  Indicate(fig[1][2].den, color=AMBRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("un chiffre")
        l2 = self.t("→ un chiffre après la virgule", 42, VERT_OK).move_to(P(-1.0, -2.6))
        self.play(FadeIn(l2, shift=UP * 0.15), Indicate(fig[2][-1], color=AMBRE, scale_factor=1.8),
                  Indicate(fig[3][-1], color=AMBRE, scale_factor=1.8), run_time=0.6)
        self.attendre_voix()

    # ── 08 : les centièmes ──────────────────────────────────────────────────
    def grille100(self, v=0, cote=0.46, centre=P(-3.6, -0.1)):
        return Pourcentage(v, mode="cases", cote=cote, etiquette=False, centre=centre).vide()

    def ecran_centiemes(self):
        self.ecran("08-centiemes")
        pc = self.grille100()
        self.au_mot("Et avec 100")
        tit = self.col(self.t("Et avec 100 ?", 46, JAUNE_TITRE), 3.0)
        self.play(Write(tit), FadeIn(pc), run_time=0.6)
        self.au_mot("Un centimètre")
        l1a = self.col(self.t("Un centimètre =", 40), 2.2)
        f1 = EcritureFraction(1, 100, fs=44)
        l1b = self.t("de mètre", 40)
        l1b.sans_synchro = True
        self.col(VGroup(f1, l1b).arrange(RIGHT, buff=0.2), 1.35, xl=self.XL + 0.5)
        self.play(FadeIn(l1a, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("un centième de")
        self.play(FadeIn(f1, scale=1.3), FadeIn(l1b), pc.grille.colorier([0], lag=0), run_time=0.45)
        self.au_mot("1 centième")
        f2 = EcritureFraction(1, 100, fs=44)
        e2 = self.t("= 0,01", 44, VERT_OK)
        l2 = self.col(VGroup(f2, e2).arrange(RIGHT, buff=0.25), 0.1)
        self.play(FadeIn(f2, scale=1.3), run_time=0.35)
        self.play(FadeIn(e2, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("25 centièmes")
        f3 = EcritureFraction(25, 100, fs=44)
        e3 = self.t("= 0,25", 44, VERT_OK)
        VGroup(f3, e3).arrange(RIGHT, buff=0.25)
        self.col(VGroup(f3, e3), -1.15)
        self.play(FadeIn(f3, scale=1.3), pc.grille.colorier(range(1, 25), lag=0.03, run_time=0.9), run_time=0.9)
        self.play(FadeIn(e3, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("deux chiffres")
        l4 = self.col(self.bloc(["→ deux chiffres", "après la virgule"], 38, AMBRE, buff=0.08), -2.5)
        self.play(FadeIn(l4, shift=UP * 0.15), Indicate(e2[-2:], color=AMBRE, scale_factor=1.6),
                  Indicate(e3[-2:], color=AMBRE, scale_factor=1.6), run_time=0.6)
        self.attendre_voix()

    # ── 09 : le piège 7/100 = 0,07 ──────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("09-piege")
        pc = self.grille100()
        self.add(pc)
        self.au_mot("Attention")
        tit = self.col(self.t("Attention au piège !", 46, ROUGE_ERREUR), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("7 centièmes")
        f = EcritureFraction(7, 100, fs=60)
        ne = self.inline("≠", 60, ROUGE_ERREUR)
        faux = self.t("0,7", 60, ROUGE_ERREUR)
        l1 = self.col(VGroup(f, ne, faux).arrange(RIGHT, buff=0.35), 1.75)
        ne.set_y(f.trait.get_y())
        faux.set_y(f.trait.get_y())
        self.play(FadeIn(f, scale=1.3), pc.grille.colorier(range(7), lag=0.05, run_time=0.6), run_time=0.6)
        self.au_mot("pas 0,7")
        self.play(FadeIn(ne, scale=1.4), FadeIn(faux, scale=1.3), run_time=0.4)
        self.play(Create(croix(faux, sw=7)), run_time=0.3)
        self.au_mot("C'est 0,07")
        f2 = EcritureFraction(7, 100, fs=60)
        bon = self.t("= 0,07", 60, VERT_OK)
        l2 = self.col(VGroup(f2, bon).arrange(RIGHT, buff=0.3), -0.05)
        bon.set_y(f2.trait.get_y())
        self.play(FadeIn(f2, scale=1.3), FadeIn(bon, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Create(self.encadrer(l2)), run_time=0.4)
        self.au_mot("Avec 100")
        l3 = self.col(self.bloc(["Avec 100 : deux chiffres", "après la virgule"], 36, buff=0.08), -1.35)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.4)
        self.au_mot("un zéro")
        l4 = self.col(self.t("on ajoute un zéro", 38, AMBRE), -2.55)
        self.play(FadeIn(l4, shift=UP * 0.15), Indicate(bon[3], color=AMBRE, scale_factor=2.0), run_time=0.6)
        self.attendre_voix()

    # ── 10 : QUESTION 2 (0,37 = …/100) ──────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pc = self.grille100(37, cote=0.34, centre=P(-3.6, 1.15))
        self.add(pc)
        a = self.t("0,37 =", 56)
        f = EcritureFraction("…", 100, fs=56)
        eq = VGroup(a, f).arrange(RIGHT, buff=0.3).move_to(P(-3.6, -2.15))
        a.set_y(f.trait.get_y())

        def avant(sc):
            sc.play(FadeIn(eq, scale=1.1), run_time=0.4)  # « 0,37 = …/100 » au « 0,37 »
            sc.q_tete()

        def apres(sc):
            sc.rep(0, "On enlève", FadeOut(f.num), FadeIn(f.chiffre(37)))
            sc.rep(1, "37 centièmes", pc.remplir(1.2), run_time=1.2)
            sc.fin_rep()

        self.question_pause("10-question", "10b-reponse", ["0,37, c'est combien", "de centièmes ?"],
                            [self.inline("37"), self.inline("3,7"), self.inline("370")], 0,
                            ["On enlève la virgule :", "0,37 = 37/100"], mot_q="0,37", avant_q=avant,
                            autres_r=apres)

    # ── 11 : défi (1,6 m de dentelle) ───────────────────────────────────────
    def droite_defi(self):
        return Droite(0, 2, 20, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=5.2, centre=P(-3.25, 0.4), fs=30)

    def ecran_defi(self):
        self.ecran("11-defi", 0.65)
        self.au_mot("Ton défi")
        tit = self.col(self.t("Ton défi !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("Maëlys coupe")
        l1 = self.col(self.t("Maëlys coupe 1,6 m de dentelle.", 36), 2.0)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Écris-le")
        l2 = self.col(self.t("1. Écris-le avec une fraction", 32, ORANGE_RETENUE), 1.2)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        l2b = self.col(self.t("de dénominateur 10.", 32, ORANGE_RETENUE), 0.7, xl=self.XL + 0.42)
        self.play(FadeIn(l2b, shift=RIGHT * 0.2), run_time=0.35)
        dr = self.droite_defi()
        self.au_mot("place-le")
        l3 = self.col(self.t("2. Place-le sur la droite.", 32, ORANGE_RETENUE), 0.05)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), FadeIn(dr), run_time=0.5)
        self.pause_defi(y=-0.9)

    def ecran_correction(self):
        self.ecran("11b-correction", 0.65)
        dr = self.droite_defi()
        self.add(dr)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("1,6")
        a = self.t("1,6 =", 52)
        f = EcritureFraction(16, 10, fs=56)
        l1 = self.col(VGroup(a, f).arrange(RIGHT, buff=0.3), 1.6)
        a.set_y(f.trait.get_y())
        self.play(FadeIn(a, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("16 dixièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("1 plus")
        b = self.inline("= 1 +", 52)
        f6 = EcritureFraction(6, 10, fs=56)
        l2 = self.col(VGroup(b, f6).arrange(RIGHT, buff=0.3), -0.05)
        b.set_y(f6.trait.get_y())
        self.play(FadeIn(b, shift=RIGHT * 0.2), FadeIn(f6, scale=1.3), run_time=0.45)
        self.au_mot("On passe 1")
        self.play(Create(segment(dr, 0, 1, sw=10)), Indicate(dr.etiquettes[1], color=AMBRE, scale_factor=1.6),
                  run_time=0.4)
        self.au_mot("on avance")
        self.play(LaggedStart(*[Create(segment(dr, 1 + k / 10, 1 + (k + 1) / 10, AMBRE, sw=10)) for k in range(6)],
                              lag_ratio=0.25), run_time=0.6)
        self.au_mot("de 6 dixièmes")
        pt = dr.point(1.6, (16, 10), haut=0.4, fs=30)
        d = decimal_sous(dr, 1.6, "1,6", fs=30)
        self.play(FadeIn(pt, shift=DOWN * 0.2), FadeIn(d, scale=1.4), run_time=0.45)
        self.insister(VGroup(pt, d), 1.2, 0.25)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        dr = Droite(0, 2, 20, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=5.4, fs=30)
        fig = VGroup(dr, VGroup(dr.point(0.7, (7, 10), haut=0.4, fs=30), dr.point(1.3, (13, 10), haut=0.4, fs=30),
                                decimal_sous(dr, 0.7, "0,7", fs=30), decimal_sous(dr, 1.3, "1,3", fs=30)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("7/10 = 0,7 :", "un chiffre après la virgule."),
                                                         ("13/10 = 1 + 3/10", "= 1,3"),
                                                         ("7/100 = 0,07,", "pas 0,7 !"),
                                                         ("Sur la droite, la fraction", "et le décimal : même point.")],
                                     fs=34)
        self.montrer2(lignes[0], "7 dixièmes", "un chiffre")
        self.montrer2(lignes[1], "13 dixièmes", "égale 1,3")
        self.montrer2(lignes[2], "7 centièmes", "pas 0,7")
        self.montrer2(lignes[3], "Sur la droite", "et le décimal")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.ecran_situation()
        self.ecran_dixiemes()
        self.ecran_compter()
        self.ecran_question1()
        self.ecran_plus_que_1()
        self.ecran_treize()
        self.ecran_regle()
        self.ecran_centiemes()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class FracDecimal6eV2(FracDecimalV2Base):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
