# frac_rationnel.py
# EleveAI — Maths 5e — série « Fractions », épisode 03 : FRACTION ET QUOTIENT
# (micro du coach : fraction_rationnel), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau 5e (a ÷ b = a/b ; b × a/b = a ;
# écriture décimale par la division ; encadrer entre deux entiers ; décimal →
# fraction irréductible ; piège 7/4 ≠ 7,4 ; 0,35 = 35 % et non 0,35 % ; défi
# corrigé : 3/4 = 0,75 = 75 %, la chaîne fraction → décimal → pourcentage).
# Short jumeau : frac_rationnel_short.py (blanche, les crêpes de Malo).
#
# Décor et métier : un ATELIER DE COUTURE ; Sana, COUTURIÈRE : un ruban de 7 m
# en 4 morceaux égaux → 7/4 m = 1,75 m (entre 1 et 2) ; un galon de 0,35 m =
# 35/100 = 7/20. Défi : 3 m de dentelle pour 4 robes → 3/4 = 0,75 m = 75 % d'un mètre.
# Chiffres inventés (aucune donnée du monde réel citée). Centres : art-design.
# Vérifié (Python) : 7 ÷ 4 = 1,75 ; 4 × 7/4 = 28/4 = 7 ; 4/4 = 1 < 7/4 < 8/4 = 2 ;
# 9 ÷ 4 = 2,25 ; 0,35 = 35/100 = 7/20 ; 3 ÷ 4 = 0,75.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts) : genQuotient (02, 03 ;
# QUESTION 1), genEcritureDecimale (05 ; QUESTION 2), genEntreEntiers (06),
# genDecimalVersFraction (08), la chaîne vers le pourcentage (QUESTION 3, défi).
# Écrans : 00 garde · 01 Sana · 02 le quotient · 03 vérifier · 04 QUESTION 1 ·
# 05 avec une virgule · 06 encadrer · 07 QUESTION 2 · 08 dans l'autre sens ·
# 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# ⭐ Bases : 5e/frac_lotg_commun.py (PaysageG ← 4e/frac_lotd_commun.py) ;
# canvas_fractions.py (non modifié). Ajouté ici : couturiere(), ruban().
# Voix : manim/voix/5e-frac-rationnel.json (débit −10) ; marques : 5e/frac_rationnel_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_rationnel.py FracRationnel5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_rationnel.py FracRationnel5e -o eleveai-maths-5e-frac-rationnel --media_dir manim/scripts/5e/media-frac-rationnel
# Sortie : manim/sorties/5e/maths/fractions/03-rationnel/eleveai-maths-5e-frac-rationnel.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

ROSE = "#f472b6"
M = 0.75          # 1 mètre de ruban = 0,75 unité Manim


def couturiere(s=1.0):
    """Sana : tunique violette, mètre ruban jaune autour du cou, ciseaux."""
    p = personne(peau=PEAUX[1], tenue="#7c3aed", cheveux="#111827", longs=True)
    metre = VGroup(Line(P(-0.3, -0.45), P(-0.35, -1.3), color="#facc15", stroke_width=7),
                   Line(P(0.3, -0.45), P(0.35, -1.3), color="#facc15", stroke_width=7))
    ciseaux = VGroup(Circle(radius=0.08, stroke_color="#cbd5e1", stroke_width=4).move_to(P(0.75, -1.2)),
                     Circle(radius=0.08, stroke_color="#cbd5e1", stroke_width=4).move_to(P(0.92, -1.2)),
                     Line(P(0.8, -1.12), P(1.0, -0.8), color="#cbd5e1", stroke_width=4),
                     Line(P(0.88, -1.12), P(0.7, -0.8), color="#cbd5e1", stroke_width=4))
    p.add(metre, ciseaux)
    return p.scale(s)


def ruban(metres, x0, y, couleur=ROSE, h=0.4, graduer=True):
    """Un ruban de `metres` m (1 m = M unités), qui commence en x0 ; un petit
    trait à chaque mètre (sans nombre). .corps .ticks ; .x(m) : l'abscisse du point à m mètres."""
    corps = RoundedRectangle(width=metres * M, height=h, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2).move_to(P(x0 + metres * M / 2, y))
    ticks = VGroup(*[Line(P(x0 + k * M, y - h / 2), P(x0 + k * M, y - h / 2 + 0.12), color="#1f2937", stroke_width=3)
                     for k in range(1, metres)]) if graduer else VGroup()
    g = VGroup(corps, ticks)
    g.corps, g.ticks = corps, ticks
    g.x = lambda m: x0 + m * M
    return g


def coupes(r, metres, n, couleur=AMBRE):
    """Les n − 1 coupes (pointillés) qui partagent le ruban en n morceaux égaux."""
    y = r.corps.get_center()[1]
    return VGroup(*[DashedLine(P(r.x(metres * k / n), y + 0.4), P(r.x(metres * k / n), y - 0.4), color=couleur,
                               stroke_width=5, dash_length=0.08) for k in range(1, n)])


class FracRationnelBase(PaysageG):
    nom_voix = "5e-frac-rationnel"
    fichier_marques = "frac_rationnel_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fraction et quotient", self.identite, self.ceinture, y_ech=-2.7)
        r = ruban(7, -3.4, 0.4, graduer=False)
        cp = coupes(r, 7, 4)
        self.au_mot("Fraction et")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("une division")
        self.play(FadeIn(r, shift=RIGHT * 0.3), run_time=0.6)
        self.play(LaggedStart(*[Create(c) for c in cp], lag_ratio=0.3), run_time=0.8)
        self.au_mot("Comment")
        q = self.t("?", 90, AMBRE).next_to(r, RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Sana, couturière ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers, nom, met = self.personnage(couturiere(1.0), "Sana", "couturière", x=-5.3, y=-0.6)
        self.au_mot("Voici Sana")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("couturière")
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        r = ruban(7, -4.2, -2.6)
        self.L([("ruban :", WHITE, "un ruban"), ("7 m", ROSE, "de 7")], 2.4,
               avec={1: [FadeIn(r, shift=RIGHT * 0.3)]})
        cp = coupes(r, 7, 4)
        self.L([("en 4 morceaux égaux", AMBRE, "en 4")], 1.5, fs=38,
               avec=[LaggedStart(*[Create(c) for c in cp], lag_ratio=0.3)])
        self.au_mot("Combien mesure")
        q = self.col(self.bloc(["Combien mesure", "chaque morceau ?"], 38, ORANGE_RETENUE), 0.2)
        sans_synchro(q)
        self.play(FadeIn(q, scale=0.85), run_time=0.4)
        self.attendre_voix()
        self.r7 = (r, cp)

    # ── 02 : le quotient 7 ÷ 4 = 7/4 ────────────────────────────────────────
    def ecran_quotient(self):
        self.ecran("02-quotient")
        r = ruban(7, -6.0, 2.4)
        cp = coupes(r, 7, 4)
        self.add(r)
        acc = Brace(Line(P(r.x(0), 2.2), P(r.x(7 / 4), 2.2)), DOWN, color=AMBRE)
        self.L([("7 ÷", WHITE, "mesure 7"), ("4", WHITE, "divisé par 4")], 2.4, fs=48,
               avec={1: [LaggedStart(*[Create(c) for c in cp], lag_ratio=0.3)]})
        self.au_mot("Ce quotient")
        l2 = self.col(self.t("un quotient", 36, AMBRE), 1.55)
        l2.sans_synchro = True
        self.play(FadeIn(l2, shift=RIGHT * 0.2), GrowFromCenter(acc), run_time=0.5)
        f = EcritureFraction(7, 4, fs=90, couleur=ROSE).move_to(P(-3.6, 0.2))
        m = self.t("m", 50, ROSE).next_to(f, RIGHT, buff=0.2)
        m.sans_synchro = True
        self.au_nb("fraction : 7")
        self.play(FadeIn(f, scale=1.3), FadeIn(m), run_time=0.5)
        self.L([("7 ÷", WHITE, ("7 divisé", 2)), ("4 =", WHITE, ("divisé par 4", 2)), (EcritureFraction(7, 4, fs=56),
                                                                                  WHITE, "égale 7")], 0.4, fs=48)
        self.au_mot("le numérateur divisé")
        r2 = self.col(self.bloc(["le numérateur ÷", "le dénominateur"], 34, VERT_OK), -1.2)
        sans_synchro(r2)
        self.play(FadeIn(r2, shift=UP * 0.15), Indicate(f.num, color=VERT_OK), run_time=0.5)
        self.play(Indicate(f.den, color=VERT_OK), Create(self.encadrer(r2, buff=0.15)), run_time=0.5)
        self.attendre_voix()

    # ── 03 : vérifier : 4 × 7/4 = 7 ─────────────────────────────────────────
    def ecran_verif(self):
        self.ecran("03-verif")
        self.au_mot("Vérifions")
        self.titre("Vérifions", fs=44)
        r = ruban(7, -6.0, 1.6)
        cp = coupes(r, 7, 4)
        morceaux_ = VGroup(*[Rectangle(width=7 / 4 * M - 0.06, height=0.4, fill_color=ROSE, fill_opacity=1,
                                       stroke_color=WHITE, stroke_width=2) for _ in range(4)])
        morceaux_.arrange(RIGHT, buff=0.25).move_to(P(-3.3, 1.6))
        self.L([("4 ×", WHITE, "Vérifions. 4"), (EcritureFraction(7, 4, fs=56), WHITE, "de 7"), ("=", WHITE, None),
                (EcritureFraction(28, 4, fs=56), WHITE, "égale 28")], 1.9, fs=48,
               avec=[LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in morceaux_], lag_ratio=0.2)])
        self.L([("= 7 m", ROSE, "soit 7")], 0.85, fs=52, avec=[FadeIn(cp)] + [
            x.animate.shift(RIGHT * (r.x(7 / 4 * i) + 7 / 8 * M - x.get_x())) for i, x in enumerate(morceaux_)])
        self.au_nb("multiplié par 4")
        r2 = self.col(self.bloc(["7/4, multiplié par 4,", "redonne 7."], 36, VERT_OK), -0.6)
        sans_synchro(r2)
        self.play(FadeIn(r2[0], shift=UP * 0.15), run_time=0.35)
        self.au_nb("donne 7")
        self.play(FadeIn(r2[1], shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (3 ÷ 5) ─────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = self.morceaux([("3 ÷", WHITE, None), ("5", WHITE, None), ("= ?", AMBRE, None)], fs=96).move_to(P(-3.3, 0.3))
        f = EcritureFraction(3, 5, fs=96, couleur=VERT_OK).move_to(d[2][1]).shift(RIGHT * 0.2)

        def avant(sc):
            sc.au_nb("s'écrit 3")
            sc.play(FadeIn(d[0]), run_time=0.3)
            sc.au_nb("divisé par 5")
            sc.q_tete(FadeIn(d[1]), FadeIn(d[2]))

        def apres(sc):
            sc.rep_mots(0, [("3 ÷", None, "Réponse B. 3"), ("5 =", None, "divisé par 5"), ("3/5", None, "égale 3")],
                        avec={2: [FadeOut(d[2][1:]), FadeIn(f, scale=1.2)]})
            sc.rep_mots(1, [("5/3 : à l'envers.", None, "5 tiers")])
            sc.rep_mots(2, [("3,5 : on colle les nombres !", None, "et 3,5")])
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["Comment s'écrit 3 ÷ 5 ?"],
                            [self.inline("5/3"), self.inline("3/5"), self.inline("3,5")], 1,
                            ["3 ÷ 5 = 3/5", "5/3 : à l'envers.", "3,5 : on colle les nombres !"],
                            avant_q=avant, autres_r=apres)

    # ── 05 : avec une virgule : 7 ÷ 4 = 1,75 ────────────────────────────────
    def ecran_decimal(self):
        self.ecran("05-decimal")
        self.au_mot("avec une virgule")
        self.titre("Avec une virgule", fs=44)
        r = ruban(7, -6.0, 2.2)
        self.add(r, coupes(r, 7, 4))
        acc = Brace(Line(P(r.x(0), 2.0), P(r.x(7 / 4), 2.0)), DOWN, color=AMBRE)
        self.add(acc)
        self.L([("7 ÷", WHITE, "division : 7"), ("4 =", WHITE, "divisé par 4"), ("1,75", BLEU_CALCUL, "égale 1,75")],
               1.6, fs=56)
        self.L([(EcritureFraction(7, 4, fs=60, couleur=ROSE), WHITE, "Donc 7"), ("= 1,75 m", BLEU_CALCUL, ("égale 1,75", 2))],
               0.2, fs=52, avec={1: [Indicate(acc, color=BLEU_CALCUL)]})
        lab = self.t("1,75 m", 36, BLEU_CALCUL).next_to(acc, DOWN, buff=0.1)
        lab.sans_synchro = True
        lab._pas_audit = True
        self.play(FadeIn(lab, scale=1.2), run_time=0.35)
        f = EcritureFraction(7, 4, fs=64, couleur=WHITE)
        faux = self.t("7,4", 64, ROUGE_ERREUR)
        ne = self.t("≠", 64, ROUGE_ERREUR)
        for x in (faux, ne):
            x.sans_synchro = True
        piege = VGroup(f, ne, faux).arrange(RIGHT, buff=0.4).move_to(P(-3.0, -1.6))
        ne.set_y(f.trait.get_y())
        faux.set_y(f.trait.get_y())
        self.au_nb("Attention : 7")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        self.au_nb("pas 7,4")
        self.play(FadeIn(ne, scale=1.4), FadeIn(faux, scale=1.2), run_time=0.4)
        self.play(Create(croix(faux, sw=6)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : encadrer entre deux entiers ────────────────────────────────────
    def ecran_encadrer(self):
        self.ecran("06-encadrer")
        d = Droite(0, 2, 8, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=5.6, centre=P(-2.9, 1.2))
        self.add(d)
        p = d.point(7 / 4, "1,75", couleur=ROSE)
        self.au_nb("1,75")
        self.play(FadeIn(p, shift=DOWN * 0.2), run_time=0.4)
        self.L([("entre 1", WHITE, "entre 1"), ("et 2", WHITE, "et 2")], 2.65, fs=44)
        self.L([(EcritureFraction(4, 4, fs=44), WHITE, "fractions : 4"), ("= 1", WHITE, ("égale 1", 1))], 1.6,
               avec={1: [Indicate(d.ticks[4], color=AMBRE, scale_factor=1.6)]})
        self.L([(EcritureFraction(8, 4, fs=44), WHITE, "et 8"), ("= 2", WHITE, "égale 2")], 0.2,
               avec={1: [Indicate(d.ticks[8], color=AMBRE, scale_factor=1.6)]})
        self.L([("7", AMBRE, "2. 7"), ("est entre 4", AMBRE, "entre 4"), ("et 8", AMBRE, "et 8 :")], -1.15, fs=44)
        self.L([(EcritureFraction(7, 4, fs=52, couleur=VERT_OK), VERT_OK, "8 : 7"),
                ("est entre 1", VERT_OK, "quarts est entre 1"), ("et 2", VERT_OK, ("et 2", 2))], -2.5, fs=44)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (9/4 en décimal) ────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(9, 4, fs=100).move_to(P(-4.4, 0.5))
        g = self.morceaux([("= 2,25", VERT_OK, None)], fs=72).next_to(f, RIGHT, buff=0.3)
        g.set_y(f.trait.get_y())

        def avant(sc):
            sc.au_nb("décimale de 9")
            sc.q_tete(FadeIn(f, scale=1.2))

        def apres(sc):
            sc.rep_mots(0, [("9 ÷", None, "Réponse B. 9"), ("4 =", None, "divisé par 4"), ("2,25", None, "égale 2,25")],
                        avec={2: [FadeIn(g, scale=1.2)]})
            sc.rep_mots(1, [("9,4 colle les", None, "2,25. 9,4"), ("deux nombres :", None, "les deux")])
            sc.rep_mots(2, [("c'est le piège !", None, "le piège")])
            sc.fin_rep()

        self.question_pause("07-question", "07b-reponse", ["Écriture décimale de 9/4 ?"],
                            [self.inline("9,4"), self.inline("2,25"), self.inline("0,94")], 1,
                            ["9 ÷ 4 = 2,25", "9,4 colle les deux nombres :", "c'est le piège !"],
                            avant_q=avant, autres_r=apres)

    # ── 08 : dans l'autre sens : 0,35 = 7/20 ────────────────────────────────
    def ecran_retour(self):
        self.ecran("08-retour")
        self.au_mot("l'autre sens")
        self.titre("Dans l'autre sens", fs=44)
        gal = RoundedRectangle(width=0.35 * 8, height=0.35, corner_radius=0.06, fill_color="#facc15", fill_opacity=1,
                               stroke_color=WHITE, stroke_width=2).move_to(P(-3.6, 2.2))
        self.L([("galon :", WHITE, "un galon"), ("0,35 m", "#facc15", "de 0,35")], 2.2, fs=44,
               avec={1: [GrowFromEdge(gal, LEFT)]})
        g = Grille(10, 10, 0, cote=0.3, centre=P(-3.6, -0.75))
        self.add(g)
        f1 = EcritureFraction(35, 100, fs=60)
        self.L([("0,35 =", WHITE, "0,35, c'est"), (f1, WHITE, "c'est 35")], 1.1, fs=52,
               avec={1: [g.colorier(range(35), lag=0.01)]})
        self.L([("35", AMBRE, "centièmes. 35"), ("et 100 :", AMBRE, "et 100"), ("table de 5", AMBRE, "table de 5")], -0.1,
               fs=40)
        f2, f3 = EcritureFraction(35, 100, fs=54), EcritureFraction(7, 20, fs=54, couleur=VERT_OK)
        for t in f2.get_family():  # 35/100 déjà écrite plus haut : on la recopie
            t._pas_audit = True
        e = egalite(f2, f3, buff=0.9)
        self.col(e, -1.95)
        h, b = fleches(f2, f3, "÷ 5", fs=30, angle=TAU / 13)
        self.au_nb("divise par 5")
        self.play(FadeIn(f2), Create(h[0]), FadeIn(h[1]), Create(b[0]), FadeIn(b[1]), run_time=0.5)
        self.au_nb("égale 7")
        self.play(FadeIn(e[1]), FadeIn(f3, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(f3)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 3 (0,35 en pourcentage) ───────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        g = Grille(10, 10, 35, cote=0.32, centre=P(-3.4, 0.2))
        self.add(g)

        def avant(sc):
            sc.au_nb("Question ! 0,35")
            sans_synchro(sc.q_q[0])
            sc.q_tete()
            l1 = sc.q_q[0]
            sc.au_mot("de pour cent")
            sc.play(FadeIn(sans_synchro(l1), shift=UP * 0.15), run_time=0.35)
            sc.q_q.remove(l1)

        def apres(sc):
            sc.rep_mots(0, [("0,35 =", None, "C. 0,35"), ("35 centièmes", None, "c'est 35"), ("= 35 %", None, "donc 35")],
                        avec={1: [Indicate(g, color=VERT_OK, scale_factor=1.03)]})
            sc.rep_mots(1, [("0,35 %", None, "Et 0,35"), ("moins d'un centième !", None, "moins d'un centième")])
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["0,35, c'est combien", "de pour cent ?"],
                            [self.inline("0,35 %"), self.inline("3,5 %"), self.inline("35 %")], 2,
                            ["0,35 = 35 centièmes = 35 %", "0,35 % : moins d'un centième !"], avant_q=avant,
                            autres_r=apres)

    # ── 10 : défi (la dentelle) ─────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        r = ruban(3, -5.0, 0.8, couleur="#e2e8f0")
        r.scale(1.6, about_point=P(-5.0, 0.8))
        self.L([("dentelle :", WHITE, "partage 3"), ("3 m", BLEU_CALCUL, "partage 3")], 2.0,
               avec=[FadeIn(r, shift=RIGHT * 0.3)])
        self.L([("pour 4 robes", AMBRE, "entre 4")], 1.2)
        self.au_mot("avec une fraction")
        l3 = self.col(self.bloc(["Chaque morceau :", "en fraction ? avec une virgule ?"], 34, ORANGE_RETENUE), 0.1)
        sans_synchro(l3)
        self.play(FadeIn(l3, scale=0.9), run_time=0.4)
        self.pause_defi(y=-1.1)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre("Correction", fs=50)
        r = ruban(3, -5.0, 1.8, couleur="#e2e8f0")
        r.scale(1.6, about_point=P(-5.0, 1.8))
        self.add(r)
        cp = VGroup(*[DashedLine(P(-5.0 + 3 * M * 1.6 * k / 4, 2.25), P(-5.0 + 3 * M * 1.6 * k / 4, 1.35), color=AMBRE,
                                 stroke_width=5, dash_length=0.08) for k in range(1, 4)])
        self.L([("3 ÷", WHITE, "Correction. 3"), ("4 =", WHITE, ("divisé par 4", 1)),
                (EcritureFraction(3, 4, fs=60, couleur=VERT_OK), WHITE, "égale 3"), ("m", WHITE, None)], 2.0, fs=50,
               avec={1: [LaggedStart(*[Create(c) for c in cp], lag_ratio=0.3)]})
        self.L([("3 ÷", WHITE, "virgule : 3"), ("4 =", WHITE, ("divisé par 4", 2)), ("0,75", BLEU_CALCUL, "égale 0,75")],
               0.7, fs=50)
        g = Grille(10, 10, 0, cote=0.26, centre=P(-3.6, -1.4))
        self.L([("0,75 m", BLEU_CALCUL, ("mesure 0,75", 1)), ("= 75 %", VERT_OK, "soit 75"), ("d'un mètre", WHITE, None)],
               -0.6, fs=46, avec={0: [FadeIn(g)], 1: [g.colorier(range(75), lag=0.005)]})
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        r = ruban(7, -6.0, 0.6)
        fig = VGroup(r, coupes(r, 7, 4), EcritureFraction(7, 4, fs=48, couleur=ROSE).move_to(P(-3.4, -0.6)))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Une fraction est un quotient :", "7 ÷ 4 = 7/4."),
                                                         ("Multiplié par 4,", "il redonne 7."),
                                                         ("Virgule : on fait la division.",),
                                                         ("7/4 n'est jamais 7,4 !",)], fs=36)
        self.montrer2(lignes[0], "Une fraction", "égale 7")
        self.montrer2(lignes[1], "Multiplié par 4", "il redonne 7")
        self.montrer2(lignes[2], "Pour l'écrire")
        self.montrer2(lignes[3], "Et 7 quarts")
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_quotient()
        self.ecran_verif()
        self.ecran_question1()
        self.ecran_decimal()
        self.ecran_encadrer()
        self.ecran_question2()
        self.ecran_retour()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracRationnel5e(FracRationnelBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
