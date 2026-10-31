# prop_defi_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 06 « Défis de
# proportionnalité » (micro prop_defi). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT l'énigme, aucun calcul posé.
# Il AMUSE : l'énigme des 3 chats et des 3 souris (« elle piège même les
# adultes ») :
#   · EN HAUT, l'image qui bouge : les 3 chats bondissent, les souris
#     disparaissent une à une, le chronomètre tourne (3 min, puis 100 min) ;
#   · EN BAS, au même instant, le tableau se remplit : Minutes → Souris
#     (3 → 3, 1 → 1, 100 → 100) et la ligne Chats qui reste à 3 ;
#   · 1 question-pause (3 s) : A : 100 chats (croire tout proportionnel),
#     B : 3 chats (juste), C : 33 chats (100 ÷ 3, le coefficient mal pris) ;
#   · fin : « Combien de souris en 1 heure ? » (60) en commentaire.
# Centres d'intérêt : chiens-chats, jeux-defis. Énigme classique, aucun
# chiffre du monde réel : pas de source à citer.
# Ajouté ICI (absent du module) : chat(), souris(), chrono() ; tableau de
# TROIS lignes (Minutes, Souris, Chats) ; pendant la question le tableau
# monte en petit dans la bande du haut (cartes compactes, comme
# prop_tableau_short.py).
#
# Voix : manim/voix/6e-prop-defi-short.json (validée, débit −10) ;
# marques : manim/scripts/6e/prop_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_defi_short.py PropDefiShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_defi_short.py PropDefiShort6e -o eleveai-maths-6e-prop-defi-short --media_dir manim/scripts/6e/media-prop-defi-short
# Sortie : manim/sorties/6e/maths/proportionnalite/06-defi/eleveai-maths-6e-prop-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

Y_IMG = 1.45   # la ligne des chats et des souris, dans la bande du haut


def muet(t):
    for f in t.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return t


def chat(couleur="#fb923c", s=1.0):
    """Un chat assis de profil : corps, tête, oreilles, yeux, queue."""
    corps = Ellipse(width=0.5, height=0.42, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                    stroke_width=1.5).move_to(P(0, -0.05))
    tete = Circle(radius=0.17, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).move_to(
        P(0.2, 0.25))
    oreilles = VGroup(*[Triangle(fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
                        .scale(0.07).move_to(P(0.2 + dx, 0.42)) for dx in (-0.09, 0.09)])
    yeux = VGroup(*[Dot(P(0.2 + dx, 0.27), radius=0.025, color="#16a34a") for dx in (-0.06, 0.07)])
    queue = CubicBezier(P(-0.22, -0.15), P(-0.5, -0.1), P(-0.45, 0.25), P(-0.3, 0.3), stroke_color=couleur,
                        stroke_width=6)
    return VGroup(queue, corps, oreilles, tete, yeux).scale(s)


def souris(s=1.0):
    """Une souris grise de profil, tournée vers la gauche."""
    corps = Ellipse(width=0.26, height=0.14, fill_color="#9ca3af", fill_opacity=1, stroke_width=0)
    oreille = Circle(radius=0.045, fill_color="#f9a8d4", fill_opacity=1, stroke_width=0).move_to(P(-0.06, 0.07))
    oeil = Dot(P(-0.1, 0.02), radius=0.015, color="#111827")
    queue = CubicBezier(P(0.12, 0), P(0.22, 0.02), P(0.24, -0.08), P(0.3, -0.06), stroke_color="#f9a8d4",
                        stroke_width=2)
    return VGroup(queue, corps, oreille, oeil).scale(s)


def chrono(r=0.36):
    """Un chronomètre : cadran, bouton, aiguille rouge. .aig · .cadran."""
    cadran = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#475569", stroke_width=5)
    bouton = RoundedRectangle(width=0.16, height=0.1, corner_radius=0.03, fill_color="#475569", fill_opacity=1,
                              stroke_width=0).next_to(cadran, UP, buff=0)
    aig = Line(ORIGIN, UP * r * 0.78, color="#dc2626", stroke_width=4)
    g = VGroup(cadran, bouton, aig)
    g.aig, g.cadran = aig, cadran
    return g


def tic(ch, tours, run_time):
    return Rotate(ch.aig, -tours * TAU, about_point=ch.cadran.get_center(), run_time=run_time, rate_func=linear)


COULEURS_CHATS = ("#fb923c", "#9ca3af", "#fde68a")


class PropDefiShort6e(ShortProp):
    nom_voix = "6e-prop-defi-short"
    fichier_marques = "prop_defi_short_marques.json"
    ceinture = "blanche"
    Y_Q = 0.1  # la question sous le tableau remonté dans la bande du haut

    LIBS = ["Minutes", "Souris", "Chats"]
    VALS = [[1, 3, 100], [1, 3, 100], [3, 3, 3]]

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Celle de prop_tableau_short.py (cartes de 0,56 de haut)."""
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        corps = txt if isinstance(txt, Mobject) else Text(txt, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.56, ligne.height + 0.18), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        muet(q)  # « Combien de chats ? » : la question de l'écran d'avant, écrite d'entrée
        rebours.chiffre.sans_synchro = True  # le compte à rebours part de 3 : ce n'est pas le « 3 » de la voix
        return tete, q, cartes, pause, rebours, ph

    def tableau(self, cases, trous=()):
        """Le tableau minutes → souris (+ la ligne des chats), en bas ; les
        `cases` portent leur valeur (posées d'entrée, donc muettes)."""
        tb = TableauProp(self.LIBS, self.VALS, montrer=False, largeur_case=0.8, largeur_libelle=1.3,
                         hauteur=0.62, fs=30, marge=0.14)
        self.caser_bas(tb)
        deja = VGroup(tb.fond)
        for r, c in cases:
            deja.add(muet(tb.valeur(r, c)))
        for r, c in trous:
            deja.add(tb.trou(r, c))
        return tb, deja

    def chats_haut(self):
        g = VGroup(*[chat(c, 0.95) for c in COULEURS_CHATS]).arrange(RIGHT, buff=0.02)
        return g.move_to(P(-0.88, Y_IMG - 0.05))

    def chrono_haut(self):
        return chrono(0.3).move_to(P(1.3, 1.9))

    def bondir(self, chats, run_time=0.6):
        return chats.animate(rate_func=there_and_back, run_time=run_time).shift(RIGHT * 0.3 + UP * 0.15)

    def attraper(self, mice, chats, run_time=1.0):
        """Les souris filent vers les chats et disparaissent, une à une."""
        return LaggedStart(*[FadeOut(m, shift=LEFT * (m.get_x() - chats.get_right()[0] + 0.1), scale=0.5)
                             for m in mice], lag_ratio=0.3, run_time=run_time)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("L'énigme des chats", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        chats = self.chats_haut()
        self.au_mot("chats")
        self.play(Write(titre), LaggedStart(*[FadeIn(c, shift=UP * 0.2) for c in chats], lag_ratio=0.2),
                  run_time=0.7)
        q = Text("?", font_size=80, color=ORANGE_RETENUE, weight=BOLD).move_to(P(1.2, Y_IMG))
        self.au_mot("piège")
        self.play(FadeIn(q, scale=0.4), self.bondir(chats, 0.5), run_time=0.5)
        self.insister(q, 1.25, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 3 chats, 3 souris, 3 minutes ──
        self.dire("01-enonce")
        tb, deja = self.tableau([])
        self.tb = tb
        ch = self.chrono_haut()
        mice = VGroup(*[souris(1.0) for _ in range(3)]).arrange(RIGHT, buff=0.06).move_to(P(1.3, 1.15))
        self.au_mot("3 chats")
        self.play(FadeOut(q), FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.valeur(2, 1), scale=1.4),
                  tb.allumer(2, 1), Indicate(chats, color=AMBRE, scale_factor=1.04), run_time=0.45)
        self.au_mot("attrapent")
        self.play(FadeIn(mice, shift=LEFT * 0.3), FadeIn(ch, scale=0.6), tb.eteindre(2, 1), run_time=0.35)
        self.au_mot("3 souris")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1), self.bondir(chats, 0.6),
                  self.attraper(mice, chats, 0.6), tic(ch, 0.5, 0.6), run_time=0.6)
        lab = self.t("3 min", 26, AMBRE).next_to(ch, LEFT, buff=0.15)
        self.au_mot("3 minutes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), tb.eteindre(1, 1), FadeIn(lab, scale=1.3),
                  tic(ch, 0.5, 0.5), run_time=0.5)
        self.play(tb.eteindre(0, 1), Indicate(tb.colonne(1), color=AMBRE, scale_factor=1.06), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 02 : 100 souris en 100 minutes ? ──
        self.dire("02-question-enigme")
        foule = VGroup(*[souris(0.75) for _ in range(12)]).arrange_in_grid(3, 4, buff=(0.05, 0.08))
        foule.move_to(P(1.3, 1.0))
        q.scale(0.6).move_to(P(-1.05, 2.05))
        self.au_mot("Combien de chats")
        self.play(FadeIn(tb.trou(2, 2), scale=1.3), FadeIn(q, scale=0.5), run_time=0.4)
        self.au_mot("100 souris")
        self.play(FadeIn(tb.valeur(1, 2), scale=1.4), tb.allumer(1, 2),
                  LaggedStart(*[FadeIn(m, shift=LEFT * 0.2) for m in foule], lag_ratio=0.05), run_time=0.6)
        lab2 = self.t("100 min", 26, AMBRE).next_to(ch, LEFT, buff=0.15)
        self.au_mot("100 minutes")
        self.play(FadeIn(tb.valeur(0, 2), scale=1.4), tb.allumer(0, 2), tb.eteindre(1, 2),
                  FadeTransform(lab, lab2), tic(ch, 2, 0.8), run_time=0.8)
        self.play(tb.eteindre(0, 2), Indicate(tb.trou(2, 2), color=AMBRE, scale_factor=1.25), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 03-04 : la question-pause (3 s) : le tableau monte, les choix dessous ──
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        th = TableauProp(self.LIBS, self.VALS, montrer=False, largeur_case=0.8, largeur_libelle=1.3, hauteur=0.62,
                         fs=30, marge=0.14)
        haut = VGroup(th.fond, *[muet(th.valeur(r, c)) for r, c in ((0, 1), (1, 1), (2, 1), (0, 2), (1, 2))],
                      th.trou(2, 2))
        haut.scale(0.6).move_to(P(0, 1.6))
        self.play(FadeIn(haut, shift=UP * 0.2), run_time=0.4)

        def rep(sc):
            l0 = sc.ligne_rep(0, ["Ensemble,", "3 souris", "en 3 minutes."])
            l1 = sc.ligne_rep(1, ["Cela fait", "1 souris", "par minute."])
            un_m, un_s, trois = th.poser(0, 0, 1), th.poser(1, 0, 1), muet(th.poser(2, 0, 3))
            for t in (un_m, un_s, trois):
                t.scale(0.6)
            sc.au_mot("Ensemble")
            sc.play(FadeIn(l0[0], shift=UP * 0.12), Indicate(th.colonne(1), color=AMBRE, scale_factor=1.06),
                    run_time=0.4)
            sc.au_mot("3 souris")
            sc.play(FadeIn(l0[1], shift=UP * 0.12), th.allumer(1, 1), run_time=0.3)
            sc.au_mot("3 minutes")
            sc.play(FadeIn(l0[2], shift=UP * 0.12), th.allumer(0, 1), run_time=0.3)
            sc.au_mot("Cela fait")
            sc.play(FadeIn(l1[0], shift=UP * 0.12), th.eteindre(0, 1), th.eteindre(1, 1), run_time=0.3)
            sc.au_mot("1 souris")
            sc.play(FadeIn(l1[1], scale=1.3), FadeIn(un_s, scale=1.4), FadeIn(un_m, scale=1.4), FadeIn(trois),
                    th.allumer(0, 0), th.allumer(1, 0), run_time=0.4)
            sc.au_mot("par minute")
            sc.play(FadeIn(l1[2], shift=UP * 0.12), run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "04-reponse", ["Combien de chats ?"],
                            [self.t("100 chats", 30), self.t("3 chats", 30), self.t("33 chats", 30)], 1,
                            ["Ensemble, 3 souris en 3 minutes.", "Cela fait 1 souris par minute."],
                            autres_r=rep)

        # ── 05 : 100 minutes, 100 souris : les mêmes 3 chats ──
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        tb, deja = self.tableau([(r, c) for r in range(3) for c in (0, 1)] + [(0, 2), (1, 2)], trous=[(2, 2)])
        chats = self.chats_haut()
        ch = self.chrono_haut()
        lab = muet(self.t("100 min", 26, AMBRE)).next_to(ch, LEFT, buff=0.15)
        self.play(FadeIn(deja), FadeIn(chats), FadeIn(ch), run_time=0.4)
        self.dire("05-explication")
        file_ = VGroup(*[souris(0.7) for _ in range(4)]).arrange(RIGHT, buff=0.08)
        file_.next_to(chats, RIGHT, buff=0.25).set_y(1.0)
        self.au_mot("En 100")
        self.play(FadeIn(lab, scale=1.3), tic(ch, 3, 1.2), tb.allumer(0, 2),
                  Indicate(tb.textes[0][2], color=AMBRE, scale_factor=1.3), run_time=1.2)
        self.au_mot("attrapent")
        self.play(FadeIn(file_, shift=LEFT * 0.4), tb.eteindre(0, 2), run_time=0.3)
        self.au_mot("100 souris")
        self.play(self.attraper(file_, chats, 0.9), self.bondir(chats, 0.9), tb.allumer(1, 2),
                  Indicate(tb.textes[1][2], color=AMBRE, scale_factor=1.3), run_time=0.9)
        fin = self.borne(self.ligne([("Les mêmes", VERT_OK), ("3 chats", VERT_OK), ("suffisent !", VERT_OK)], 30),
                         0.9).move_to(P(0, -1.95))
        self.au_mot("Les mêmes")
        self.play(FadeIn(fin[0], shift=UP * 0.12), tb.eteindre(1, 2), run_time=0.3)
        self.au_mot("3 chats")
        self.play(FadeIn(fin[1], scale=1.3), tb.remplir(2, 2, 3), Indicate(chats, color=VERT_OK, scale_factor=1.04),
                  run_time=0.45)
        self.play(*[tb.allumer(2, c) for c in range(3)], FadeIn(fin[2], shift=UP * 0.12), run_time=0.35)
        self.insister(fin, 1.1)
        self.attendre_voix(marge=0.3)

        # ── 06 : la question en commentaire ──
        self.dire("06-commentaire")
        self.play(FadeOut(VGroup(fin, file_, lab, chats, ch)), *[tb.eteindre(2, c) for c in range(3)], run_time=0.3)
        l1 = self.borne(self.t("Combien de souris ?", 32, VERT_OK), 0.9).move_to(P(0, 1.85))
        l2 = self.borne(self.ligne([("3 chats", AMBRE), ("en 1 heure", AMBRE)], 34), 0.9).move_to(P(0, 1.2))
        self.au_mot("Combien")
        self.play(FadeIn(l1, shift=UP * 0.12), run_time=0.35)
        self.au_mot("3 chats")
        self.play(FadeIn(l2[0], scale=1.3), Indicate(tb.textes[2][1], color=AMBRE, scale_factor=1.3), run_time=0.35)
        self.au_mot("1 heure")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.35)
        self.insister(VGroup(l1, l2), 1.08)
        self.appel_commentaire(y=-1.95)
