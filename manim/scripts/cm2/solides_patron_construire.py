# solides_patron_construire.py
# EleveAI — Maths CM2 — série « Solides », épisode 05 : CONSTRUIRE UN PATRON DE CUBE
# (micro solide_patron_construire, notion solide), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Un cran au-dessus du CM1 : on CONSTRUIT / COMPLÈTE un patron (où mettre la dernière face), on sait
# qu'il y en a 11, et on repère les faces opposées (dans une ligne de 3, le premier et le dernier).
# Décor et métier : Anna, CRÉATRICE DE LANTERNES en papier (en forme de cube, patron sur quadrillage).
# Mapping micro → écrans : 02 (les règles : 6 carrés pareils collés par leurs côtés, aucune face sur une
# autre ; la croix se plie), 03 (la croix : la ligne de 4 fait le tour, les 2 de côté ferment),
# 04 (les 11 patrons du cube `ONZE` ; l'astuce : ligne de 3 → faces opposées, qui se plient face à face),
# 06 (piège : 2 rangées de 3 ne se ferment pas, faces superposées et trou), questions 05 (ligne 1-2-3-4 :
# en face du 1, le 3, rép. B) et 07 (le 6e carré au bout d'un bras de la croix, rép. A),
# défi 08 (la lanterne-dé : ligne de 4, 1 et 2 écrits → 6 et 5).
# Voix : manim/voix/cm2-solides-patron-construire.json (validée le 15/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/solides_patron_construire.py SolidesPatronConstruireCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/solides_patron_construire.py SolidesPatronConstruireCM2 -o eleveai-maths-cm2-solides-patron-construire --media_dir manim/scripts/cm2/media-sol-05
# Sortie : manim/sorties/cm2/maths/solides/05-patron-construire/eleveai-maths-cm2-solides-patron-construire.mp4

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm2_commun import *  # noqa: E402,F403

PAPIER = "#fde68a"     # le papier des lanternes
LIGNE_C = "#38bdf8"    # la ligne de 4
COTE_C = "#a3e635"     # les carrés de côté
OPP1 = "#fb923c"       # 1re paire de faces opposées
OPP2 = "#a78bfa"       # 2e paire
NEUTRE = "#cbd5e1"
ENCRE = "#1e293b"

# les 11 patrons du cube (comme au CM1 : cellule (colonne, rangée), rangée 0 en bas)
ONZE = ([[(0, 1), (1, 1), (2, 1), (3, 1), (a, 2), (b, 0)] for a, b in ((0, 0), (0, 1), (0, 2), (0, 3), (1, 1), (1, 2))]
        + [[(0, 2), (1, 2), (1, 1), (2, 1), (3, 1), (c, 0)] for c in (1, 2, 3)]
        + [[(0, 0), (1, 0), (1, 1), (2, 1), (2, 2), (3, 2)], [(0, 1), (1, 1), (2, 1), (2, 0), (3, 0), (4, 0)]])

# la ligne de 4 du défi : a, fond, c, d ; un carré au-dessus du fond, un au-dessous de c
DEFI = ({"a": (0, 1), "fond": (1, 1), "c": (2, 1), "d": (3, 1), "h": (1, 2), "b": (2, 0)},
        {"fond": None, "a": "fond", "c": "fond", "d": "c", "h": "fond", "b": "c"})
TROIS = ({"a": (0, 0), "fond": (1, 0), "c": (2, 0)}, {"fond": None, "a": "fond", "c": "fond"})


def plat(cases, cote=0.3, centre=ORIGIN, couleur=PAPIER):
    return patron_plat({k: c for k, c in enumerate(cases)}, cote, centre, couleur)


def lanterne(e=1.0, centre=ORIGIN):
    """Une lanterne de papier en cube : le cube jaune, une anse, une lueur."""
    c = cube(e=e, centre=centre, couleur=PAPIER, couleur_trait="#b45309")
    haut = c.get_top()
    anse = Arc(radius=0.22 * e, start_angle=0, angle=PI, stroke_color="#b45309", stroke_width=4) \
        .move_to(haut + UP * 0.12 * e)
    lueur = Circle(radius=0.75 * e, fill_color="#fde047", fill_opacity=0.18, stroke_width=0).move_to(centre)
    return VGroup(lueur, c, anse)


class SolidesPatronConstruireCM2(PaysageSolidesCM2):
    nom_voix = "cm2-solides-patron-construire"
    fichier_marques = "solides_patron_construire_marques.json"
    ceinture = "verte"

    def _disposer_q(self, question, choix, phrase):
        """Comme au CM1 (14/11) : la colonne de la question part 0,4 plus à gauche et les cartes
        s'élargissent d'autant, la coche ne revient pas sur un choix long."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = 0.4
        for m in (tete, q, pause):
            m.shift(LEFT * d)
        for c in cartes:
            cadre, ligne = c[0], c[1]
            neuf = RoundedRectangle(width=cadre.width + d, height=cadre.height, corner_radius=0.14,
                                    stroke_color=cadre.get_stroke_color(), stroke_width=cadre.get_stroke_width(),
                                    fill_color=cadre.get_fill_color(), fill_opacity=cadre.get_fill_opacity())
            neuf.align_to(cadre, RIGHT).align_to(cadre, UP)
            cadre.become(neuf)
            ligne.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def choix2(self, lignes, fs=26):
        """Un choix long sur deux rangs, posé d'un bloc."""
        g = VGroup(*[Text(s, font_size=fs, color=WHITE) for s in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        g._bloc = True
        return hors_audit(g)

    def num(self, pa, nom, n, couleur=ENCRE, fs=40):
        return hors_audit(Text(str(n), font_size=fs, color=couleur, weight=BOLD).move_to(pa.centre_carre(nom)))

    def cube_croix(self, pa, rt=1.8, rt_tilt=0.6):
        """La croix se plie : le fond couché, les 4 côtés, puis le couvercle."""
        self.play(pa.plier(tilt=0, run_time=rt_tilt))
        self.play(pa.plier({k: 90 for k in ("g", "d", "av", "ar")}, run_time=rt * 0.6))
        self.play(pa.plier({"couv": 90}, run_time=rt * 0.4))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Construire un patron de cube", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Construire un patron de cube")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pa = Patron("croix", e=0.6, centre=P(3.9, 0.55), couleur=PAPIER, caches={"couv"})
        pl = pa.place((1, 3), "?", ORANGE_RETENUE, 30)
        q = self.bloc(["Où placer", "la dernière face ?"], 42)
        gauche(q, -6.2, 0.6)
        self.au_mot("Où placer la dernière face")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(pa), Create(pl), run_time=0.5)
        pa.caches.discard("couv")
        pa.couleurs["couv"] = ORANGE_RETENUE
        self.play(FadeOut(pl), pa.plier(run_time=0.3), run_time=0.3)
        self.cube_croix(pa, 1.4, 0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ap = anna(1.0).move_to(P(-5.0, 0.3))
        self.au_mot("Voici Anna")
        nom = self.t("Anna", 42, BLEU_CALCUL).next_to(ap, UP, buff=0.2)
        self.play(FadeIn(ap, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("des lanternes en papier")
        met = hors_audit(self.bloc(["créatrice", "de lanternes"], 28, BLEU_CALCUL).next_to(ap, DOWN, buff=0.2))
        lan = VGroup(lanterne(0.75, P(-2.4, 2.0)), lanterne(0.95, P(-0.9, 2.1)), lanterne(0.7, P(0.5, 1.95)))
        self.play(FadeIn(met, shift=DOWN * 0.1), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in lan],
                                                              lag_ratio=0.2), run_time=0.7)
        self.au_mot("en forme de cube")
        fc = self.t("en forme de cube", 28, PAPIER).next_to(lan, DOWN, buff=0.25)
        self.play(FadeIn(fc, shift=UP * 0.1), run_time=0.3)
        # la feuille quadrillée
        feuille = VGroup(Rectangle(width=4.2, height=3.2, fill_color="#f8fafc", fill_opacity=1, stroke_width=0),
                         *[Line(P(-2.1 + 0.4 * i, -1.6), P(-2.1 + 0.4 * i, 1.6), stroke_color="#93c5fd", stroke_width=1.5)
                           for i in range(1, 11)],
                         *[Line(P(-2.1, -1.6 + 0.4 * j), P(2.1, -1.6 + 0.4 * j), stroke_color="#93c5fd", stroke_width=1.5)
                           for j in range(1, 8)]).move_to(P(3.7, 1.45))
        self.au_mot("sur une feuille quadrillée")
        self.play(FadeIn(feuille, shift=LEFT * 0.2), run_time=0.4)
        cases = {"g": (0, 1), "fond": (1, 1), "d": (2, 1), "av": (1, 0), "ar": (1, 2)}
        o = feuille[0].get_corner(DL) + P(0.8, 0.4)
        pat = VGroup(*[Square(0.8, fill_color=PAPIER, fill_opacity=1, stroke_color="#b45309", stroke_width=3)
                       .move_to(o + P(0.8 * c + 0.4 + 0.4, 0.8 * r + 0.4 - 0.4)) for c, r in cases.values()])
        pat.move_to(feuille[0].get_center() + P(-0.4, -0.4))
        self.play(LaggedStart(*[FadeIn(s) for s in pat], lag_ratio=0.15), run_time=0.6)
        self.au_mot("il lui manque une face")
        trou = DashedVMobject(Square(0.8, stroke_color=ROUGE_ERREUR, stroke_width=5), num_dashes=16) \
            .next_to(pat[4], UP, buff=0)
        g = self.t("Il lui manque une face.", 32, ROUGE_ERREUR).move_to(P(1.0, -0.95))
        self.play(FadeIn(g, shift=UP * 0.1), Create(trou), run_time=0.4)
        self.au_mot("Où la mettre")
        q = self.gros("Où la mettre ?", couleur=JAUNE_TITRE, fs=36).move_to(P(1.0, -2.1))
        self.play(FadeIn(q, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les règles ─────────────────────────────────────────────────────
    def ecran_regles(self):
        self.ecran("02-regles")
        pa = Patron("croix", e=0.8, centre=P(-3.8, 0.3), couleur=PAPIER)
        self.add(pa)
        x = -0.3
        self.au_mot("Un patron de cube")
        tit = self.t("Un patron de cube :", 40, JAUNE_TITRE)
        gauche(tit, x, 2.75)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("6 carrés pareils")
        l1 = self.t("6 carrés pareils,", 32)
        gauche(l1, x, 1.9)
        ordre = ["couv", "ar", "g", "fond", "d", "av"]
        bords = VGroup(*[pa.contour_carre(k, JAUNE_TITRE, 7) for k in ordre])
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[Create(b) for b in bords], lag_ratio=0.12), run_time=0.7)
        self.au_mot("collés par leurs côtés")
        l2 = self.t("collés par leurs côtés.", 32)
        gauche(l2, x, 1.25)
        ch = pa.charnieres()
        self.play(FadeIn(l2, shift=UP * 0.1), FadeOut(bords), Create(ch), run_time=0.5)
        self.au_mot("Quand on plie")
        l3 = self.t("Quand on plie,", 32, VERT_OK)
        gauche(l3, x, 0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(ch), pa.plier(tilt=0, run_time=0.5), run_time=0.5)
        self.au_mot("chaque carré devient une face")
        l4 = self.t("chaque carré devient une face,", 28, VERT_OK)
        gauche(l4, x, -0.3)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.25)
        self.play(pa.plier({k: 90 for k in ("g", "d", "av", "ar")}, run_time=1.0))
        self.au_mot("et aucune ne doit")
        l5 = self.bloc(["et aucune ne doit se retrouver", "sur une autre."], 28, ORANGE_RETENUE)
        gauche(l5, x, -1.35)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.play(pa.plier({"couv": 90}, run_time=0.7))
        self.play(Indicate(pa, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 03 : la croix ───────────────────────────────────────────────────────
    def ecran_croix(self):
        self.ecran("03-croix")
        pa = Patron("croix", e=0.85, centre=P(-3.7, 0.15), couleur=PAPIER)
        self.add(pa)
        x = 0.0
        self.au_mot("Le plus connu")
        tit = self.t("Le plus connu : la croix.", 40, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), Indicate(pa, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.5)
        self.au_mot("4 carrés en ligne")
        l1 = self.t("4 carrés en ligne,", 30, LIGNE_C)
        gauche(l1, x, 1.95)
        pa.couleurs.update({k: LIGNE_C for k in ("av", "fond", "ar", "couv")})
        self.play(FadeIn(l1, shift=UP * 0.1), pa.plier(run_time=0.3), run_time=0.3)
        self.au_mot("et 1 carré de chaque")
        l2 = self.t("et 1 carré de chaque côté.", 30, COTE_C)
        gauche(l2, x, 1.35)
        pa.couleurs.update({"g": COTE_C, "d": COTE_C})
        self.play(FadeIn(l2, shift=UP * 0.1), pa.plier(run_time=0.3), run_time=0.3)
        self.au_mot("La ligne fait le tour")
        l3 = self.t("La ligne fait le tour :", 30, LIGNE_C)
        gauche(l3, x, 0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        mots = (("av", "devant"), ("couv", "dessus"), ("ar", "derrière"), ("fond", "dessous"))
        noms = VGroup()
        for k, m in mots:
            t = Text(m, font_size=22, color=ENCRE, weight=BOLD).move_to(pa.centre_carre(k))
            noms.add(t)
            self.au_mot(m)
            self.play(FadeIn(t, scale=1.2), run_time=0.2)
        self.play(FadeOut(noms), pa.plier(tilt=0, run_time=0.3), run_time=0.3)
        self.play(pa.plier({"av": 90, "ar": 90}, run_time=0.5))
        self.play(pa.plier({"couv": 90}, run_time=0.4))
        self.au_mot("Les 2 carrés de côté ferment")
        l4 = self.bloc(["Les 2 carrés de côté ferment", "à gauche et à droite."], 28, COTE_C)
        gauche(l4, x, -0.55)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("à gauche et à droite")
        self.play(FadeIn(l4[1], shift=UP * 0.1), pa.plier({"g": 90, "d": 90}, run_time=0.8), run_time=0.8)
        self.attendre_voix()

    # ── 04 : les 11 patrons, l'astuce de la ligne de 3 ──────────────────────
    def ecran_onze(self):
        self.ecran("04-onze")
        self.au_mot("Il existe 11 patrons différents du cube")
        tit = self.t("11 patrons différents du cube", 40, JAUNE_TITRE).move_to(P(0, 3.1))
        onze = VGroup(*[plat(c, 0.27) for c in ONZE]).arrange_in_grid(2, 6, buff=(0.5, 0.4)).move_to(P(-0.3, 1.0))
        self.play(Write(tit), LaggedStart(*[FadeIn(o, scale=0.6) for o in onze], lag_ratio=0.08), run_time=1.0)
        self.au_mot("Pas besoin de les apprendre")
        l1 = self.t("Pas besoin de les apprendre :", 32)
        gauche(l1, -5.6, -0.95)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("on vérifie en pliant dans sa tête")
        l2 = self.t("on vérifie en pliant dans sa tête.", 32, VERT_OK)
        gauche(l2, -5.6, -1.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        # l'astuce
        self.au_mot("Une astuce")
        self.play(*[FadeOut(m) for m in (tit, onze, l1, l2)], run_time=0.3)
        ast = self.t("Une astuce :", 44, JAUNE_TITRE)
        gauche(ast, -6.2, 3.0)
        self.play(Write(ast), run_time=0.35)
        pa = Patron(cellules=TROIS[0], parents=TROIS[1], e=0.95, centre=P(-3.7, 0.4), couleur=PAPIER)
        x = 0.0
        self.au_mot("dans une ligne de 3 carrés")
        l3 = self.t("dans une ligne de 3 carrés,", 28)
        gauche(l3, x, 1.9)
        self.play(FadeIn(pa), FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("le premier et le dernier")
        l4 = self.t("le premier et le dernier", 28, OPP1)
        gauche(l4, x, 1.25)
        pa.couleurs.update({"a": OPP1, "c": OPP1})
        self.play(FadeIn(l4, shift=UP * 0.1), pa.plier(run_time=0.3), run_time=0.3)
        self.au_mot("deviennent des faces opposées")
        l5 = self.t("deviennent des faces opposées,", 28, OPP1)
        gauche(l5, x, 0.6)
        self.play(FadeIn(l5, shift=UP * 0.1), pa.plier(tilt=0, run_time=0.5), run_time=0.5)
        self.play(pa.plier({"a": 90, "c": 90}, run_time=1.0))
        self.au_mot("face à face")
        g = self.gros("face à face.", couleur=OPP1, fs=36)
        gauche(g, x, -0.5)
        fl = VGroup(Arrow(pa.centre_carre("a"), pa.centre_carre("c"), buff=0.25, color=WHITE, stroke_width=5),
                    Arrow(pa.centre_carre("c"), pa.centre_carre("a"), buff=0.25, color=WHITE, stroke_width=5))
        self.play(FadeIn(g, scale=1.15), GrowFromCenter(fl), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pa = Patron("decale", e=0.62, centre=P(-4.25, 1.4), couleur=PAPIER)
        ligne = ("b0", "fond", "b2", "b3")
        nums = [self.num(pa, k, i + 1) for i, k in enumerate(ligne)]

        def avant_q(sc):
            sc.au_mot("une ligne de 4 carrés")
            sc.play(FadeIn(pa), run_time=0.3)
            sc.aux_extraits(nums, ["numérotés 1", "1, 2", "2, 3", "3, 4"], run_time=0.15)

        def apres(sc):
            kw = dict(fs=28, y0=-1.3, pas=0.58)
            lg = sc.rep_bas(0, [("Dans la ligne", VERT_OK), ("1,", VERT_OK), ("2,", VERT_OK), ("3,", VERT_OK)],
                            buff=0.14, **kw)
            sc.aux_extraits(lg, ["Dans la ligne", "1, 2", "2, 3", "3, le"])
            lg1 = sc.rep_bas(1, [("le premier et le dernier : face à face.", VERT_OK)], **kw)
            sc.aux_extraits([lg1[0]], ["le premier et"])
            pa.couleurs.update({"b0": OPP1, "b2": OPP1})
            lg2 = sc.rep_bas(2, [("le 1", OPP1), ("est en face du 3.", OPP1)], buff=0.14, **kw)
            sc.aux_extraits(lg2, ["1 est en", "3. Et"])
            sc.play(pa.plier(run_time=0.2), *[FadeOut(n) for n in nums], run_time=0.25)
            sc.play(pa.plier(tilt=0, run_time=0.35))
            sc.play(pa.plier({"b0": 90, "b2": 90}, run_time=0.6))
            pa.couleurs.update({"fond": OPP2, "b3": OPP2})
            lg3 = sc.rep_bas(3, [("Et le 2", OPP2), ("est en face du 4.", OPP2)], buff=0.14, **kw)
            sc.aux_extraits(lg3, ["2 est en", "4."])
            sc.play(pa.plier({"haut": 90, "bas": 90}, run_time=0.5))
            sc.play(pa.plier({"b3": 90}, run_time=0.5))
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Quelle face sera", "en face du 1 ?"],
                            [self.choix("le 2"), self.choix("le 3"), self.choix("le 4")], 1,
                            ["Dans la ligne 1, 2, 3,", "le premier et le dernier : face à face.",
                             "le 1 est en face du 3.", "Et le 2 est en face du 4."],
                            avant_q=avant_q, autres_r=apres)

    # ── 06 : le piège (2 rangées de 3) ──────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("6 carrés bien collés")
        l0 = self.bloc(["6 carrés bien collés,", "ce n'est pas toujours un patron."], 32)
        gauche(l0, -6.2, 1.95)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        pa = Patron("bloc", e=0.85, centre=P(-3.7, -0.75), couleur=PAPIER)
        x = 0.2
        l1 = self.ligne([("2 rangées de 3 carrés :", JAUNE_TITRE)], 30)
        gauche(l1, x, 0.75)
        self.au_mot("2 rangées")
        self.play(FadeIn(pa), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("quand on plie")
        self.play(pa.plier({"a": 90, "c": 90, "e": 90}, tilt=0, run_time=0.8))
        self.au_mot("deux faces se superposent")
        l2 = self.t("deux faces se superposent,", 30, ROUGE_ERREUR)
        gauche(l2, x, 0.05)
        self.play(FadeIn(l2, shift=UP * 0.1), pa.plier({"d": 90, "f": 90}, run_time=0.7), run_time=0.7)
        dbl = VGroup(pa.contour_carre("a", ROUGE_ERREUR, 9), pa.contour_carre("d", ROUGE_ERREUR, 9))
        self.play(Create(dbl), run_time=0.3)
        self.au_mot("et il reste")
        l3 = self.t("et il reste un trou.", 30, ROUGE_ERREUR)
        gauche(l3, x, -0.65)
        haut = [pa._proj(np.array(p, dtype=float)) for p in ((1, 1, 0), (2, 1, 0), (2, 1, 1), (1, 1, 1))]
        trou = VGroup(Polygon(*haut, fill_color=ROUGE_ERREUR, fill_opacity=0.3, stroke_width=0),
                      DashedVMobject(Polygon(*haut, stroke_color=ROUGE_ERREUR, stroke_width=7), num_dashes=20))
        self.play(FadeIn(l3, shift=UP * 0.1), Create(trou), run_time=0.45)
        self.au_mot("Ce n'est pas un patron de cube")
        g = self.gros("Ce n'est pas un patron de cube.", couleur=ROUGE_ERREUR, fs=30).move_to(P(-0.8, -2.5))
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pa = Patron("croix", e=0.58, centre=P(-4.3, 1.25), couleur=PAPIER, caches={"couv"})
        milieu = pa.contour_carre("fond", JAUNE_TITRE, 7)
        bras = VGroup(*[pa.contour_carre(k, COTE_C, 7) for k in ("g", "d", "av", "ar")])

        def avant_q(sc):
            sc.au_mot("5 carrés en croix")
            sc.play(FadeIn(pa), run_time=0.3)
            sc.au_mot("1 au milieu")
            sc.play(Create(milieu), run_time=0.25)
            sc.au_mot("1 sur chaque côté")
            sc.play(LaggedStart(*[Create(b) for b in bras], lag_ratio=0.15), run_time=0.4)

        def apres(sc):
            kw = dict(fs=26, y0=-1.3, pas=0.56)
            pl = pa.place((1, 3), None, VERT_OK)
            lg = sc.rep_bas(0, [("Au bout d'un bras : la croix,", VERT_OK)], **kw)
            sc.aux_extraits([lg[0]], ["Au bout d'un bras"])
            sc.play(Create(pl), FadeOut(milieu), FadeOut(bras), run_time=0.3)
            pa.caches.discard("couv")
            pa.couleurs["couv"] = VERT_OK
            sc.play(FadeOut(pl), pa.plier(run_time=0.2), run_time=0.2)
            lg1 = sc.rep_bas(1, [("4 carrés en ligne", VERT_OK)], **kw)
            sc.aux_extraits(lg1, ["4 carrés en"])
            lg1b = sc.rep_bas(2, [("et 1 de chaque côté.", VERT_OK)], **kw)
            sc.aux_extraits(lg1b, [("et 1 de", 1, 0.2)])
            lg2 = sc.rep_bas(3, [("Le 6e carré ferme le dessus.", VERT_OK)], **kw)
            sc.aux_extraits([lg2[0]], [("Le 6e carré", 1, 0.3)])
            sc.play(pa.plier(tilt=0, run_time=0.35))
            sc.play(pa.plier({k: 90 for k in ("g", "d", "av", "ar")}, run_time=0.6))
            sc.play(pa.plier({"couv": 90}, run_time=0.5))
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Où peut-elle coller", "le sixième carré ?"],
                            [self.choix2(["au bout d'un bras", "de la croix"]),
                             self.choix2(["dans un coin,", "à côté d'un bras"]),
                             self.choix2(["nulle part :", "5 carrés suffisent"])], 0,
                            ["Au bout d'un bras : la croix,", "4 carrés en ligne et 1 de chaque côté.",
                             "Le 6e carré ferme le dessus."],
                            avant_q=avant_q, autres_r=apres)

    # ── 08 : le défi (la lanterne-dé) ───────────────────────────────────────
    def de(self):
        return Patron(cellules=DEFI[0], parents=DEFI[1], e=0.78, centre=P(-3.7, 0.15), couleur=PAPIER)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pa = self.de()
        x = 0.0
        self.au_mot("une lanterne en forme de dé")
        l0 = self.t("Une lanterne en forme de dé.", 28)
        gauche(l0, x, 2.25)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pa), run_time=0.35)
        l1 = self.t("Sur un dé, deux faces opposées", 28, OPP1)
        gauche(l1, x, 1.55)
        self.au_mot("Sur un dé")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l1b = self.ligne([("font toujours", OPP1), ("7.", OPP1)], 28, buff=0.16)
        gauche(l1b, x, 1.0)
        self.aux_extraits(l1b, ["font toujours", "7. Sur"])
        self.au_mot("Sur sa ligne de 4 carrés")
        lig = VGroup(*[pa.contour_carre(k, LIGNE_C, 7) for k in ("a", "fond", "c", "d")])
        self.play(LaggedStart(*[Create(c) for c in lig], lag_ratio=0.15), run_time=0.45)
        l2 = self.ligne([("Elle écrit", WHITE), ("1", WHITE), ("puis", WHITE), ("2.", WHITE)], 28, buff=0.16)
        gauche(l2, x, 0.3)
        n1, n2 = self.num(pa, "a", 1), self.num(pa, "fond", 2)
        self.au_mot("elle écrit")
        self.play(FadeIn(l2[0]), run_time=0.2)
        self.aux_extraits([VGroup(l2[1], n1)], ["1 sur le premier"])
        self.play(FadeIn(l2[2]), run_time=0.15)
        self.aux_extraits([VGroup(l2[3], n2)], ["2 sur le"])
        self.au_mot("Quels nombres")
        q = self.bloc(["Quels nombres sur le troisième", "et le quatrième ?"], 28, JAUNE_TITRE)
        gauche(q, x, -0.75)
        qm = VGroup(*[Text("?", font_size=44, color=ORANGE_RETENUE, weight=BOLD).move_to(pa.centre_carre(k))
                      for k in ("c", "d")])
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(qm), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 28, ORANGE_RETENUE)
        gauche(pz, x, -2.0)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa = self.de()
        self.add(pa)
        n1, n2 = self.num(pa, "a", 1), self.num(pa, "fond", 2)
        self.add(n1, n2)
        x = 0.2
        # on plie dans sa tête : les deux paires en couleur
        pa.couleurs.update({"a": OPP1, "c": OPP1, "fond": OPP2, "d": OPP2})
        self.play(FadeOut(n1), FadeOut(n2), pa.plier(run_time=0.2), run_time=0.2)
        self.play(pa.plier(tilt=0, run_time=0.3))
        self.play(pa.plier({k: 90 for k in pa.angles if k != "fond"}, run_time=0.8))
        self.play(pa.plier({k: 0 for k in pa.angles}, tilt=-90, run_time=0.5))
        self.add(n1, n2)
        self.au_mot("le troisième")
        l0 = self.bloc(["Le troisième carré", "est en face du premier :"], 28, OPP1)
        gauche(l0, x, 2.1)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("7 −", OPP1), ("1", OPP1), ("= 6.", VERT_OK)], 34, buff=0.3)
        gauche(l1, x + 0.4, 1.3)
        n6 = Text("6", font_size=40, color=ENCRE, weight=BOLD).move_to(pa.centre_carre("c"))
        self.aux_extraits([l1[0], l1[1], VGroup(l1[2], n6)], ["7 moins", "1, 6", "6. Le"])
        self.au_mot("Le quatrième")
        l2 = self.bloc(["Le quatrième", "est en face du deuxième :"], 28, OPP2)
        gauche(l2, x, 0.45)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("7 −", OPP2), ("2", OPP2), ("= 5.", VERT_OK)], 34, buff=0.3)
        gauche(l3, x + 0.4, -0.35)
        n5 = Text("5", font_size=40, color=ENCRE, weight=BOLD).move_to(pa.centre_carre("d"))
        self.aux_extraits([l3[0], l3[1], VGroup(l3[2], n5)], [("7 moins", 2), "2, 5", "5. On"])
        g = self.ligne([("On écrit", VERT_OK), ("6,", VERT_OK), ("puis 5.", VERT_OK)], 36, buff=0.18)
        gauche(g, x, -1.45)
        self.aux_extraits(g, ["On écrit", "6, puis", ("5.", 2)])
        self.play(Create(SurroundingRectangle(g, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)),
                  run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pa = Patron("croix", e=0.55, couleur=PAPIER)
        lignes = self.finale_gauche(pa, textes=[
            ("Un patron de cube a 6 carrés,", "aucune face ne se superpose."),
            ("Il en existe 11.",),
            ("Dans une ligne de 3 carrés, le premier", "et le dernier sont face à face."),
            ("Pour vérifier, on plie dans sa tête.",)],
            fs=28, x_fig=-5.0, xl=-2.9)
        pa.recaler()
        self.add(pa)
        self.au_mot("Un patron de cube a 6 carrés")
        self.montrer_ligne(lignes[0])
        self.au_mot("Il en existe 11")
        self.montrer_ligne(lignes[1])
        self.au_mot("Dans une ligne de 3 carrés")
        self.montrer_ligne(lignes[2])
        self.au_mot("Pour vérifier")
        self.montrer_ligne(lignes[3])
        self.cube_croix(pa, 1.6, 0.5)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regles()
        self.ecran_croix()
        self.ecran_onze()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
