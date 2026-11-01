# pythagore_hypotenuse.py
# EleveAI — Maths 4e — Pythagore, épisode 3 : calculer l'hypoténuse
# (notionId : pythagore_theoreme, micro : pythagore_calculer_hypotenuse), AVEC VOIX.
#
# ⭐ Série « une paysage par micro + son short jumeau » (Frédéric, 12/10/2026).
# Ceinture JAUNE. L'image commune avec le short : le CHAMP DE CANNES de 30 m sur
# 40 m, traversé en diagonale (50 m au lieu de 70). Nombres de la micro du coach :
# 3-4-5, 6-8-10 ; l'arrondi (5 et 7 → √74 ≈ 8,6) vient de la feuille d'exercices.
# ⭐ L'écran 03 reprend le CARRELAGE de l'épisode 2 : les 9 + 16 carreaux des
# petits carrés vont remplir les 25 cases du carré de l'hypoténuse.
#
# Voix : manim/voix/4e-pythagore-hypotenuse.json (Julie, débit −7), validée le 12/10 (« go ») ;
# clés 04q/04r/07q/07r ajoutées, 09-finale (« Ce que tu as appris ») et 10-abonne changées le 31/10.
#
# ⭐ 31/10/2026 : refonte « questions-pauses » (manim/questions-pythagore.md, Ép. 3) :
# Q1 après 04-methode (écran 80 × 60), Q2 après 07-arrondi (3 et 6 → √45 ≈ 6,7), 5 s ;
# fin du 19/10 ; tous les écrans recalés mot à mot (4e-pythagore-hypotenuse.marques.json).
# ⚠️ L'épisode 4 (pythagore_cote.py) HÉRITE de cette scène : les questions de l'ép. 3
# vivent dans question_ecran_tv() / question_arrondi(), appelées par CE construct() seul.
# Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/pythagore_hypotenuse.py PythagoreHypotenuse4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_hypotenuse.py PythagoreHypotenuse4e -o eleveai-maths-4e-pythagore-hypotenuse --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/03-hypotenuse-calcul/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_carre_racine import COTE, CARREAU, PythagoreCarreRacine4e  # noqa: E402  (pose les chemins)
from pythagore_reconnaitre import P, Notion4e, PythagoreReconnaitre4e, echelle_ceintures  # noqa: E402
from pythagore_pauses import PausesPaysage, sans_audit  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_trigo import COUL_HYP  # noqa: E402

CANNE = "#3F7D20"
COUL_DROIT = BLEU_CALCUL

# Le champ, vu du ciel : 40 m sur 30 m, à 0,15 unité par mètre.
SO, SE, NE, NO = P(-5.6, -2.55), P(0.4, -2.55), P(0.4, 1.95), P(-5.6, 1.95)


class PythagoreHypotenuse4e(PausesPaysage, Notion4e):
    nom_voix = "4e-pythagore-hypotenuse"

    # Les dessins des épisodes 1 et 2, repris tels quels.
    t = PythagoreCarreRacine4e.t
    carre_de = PythagoreCarreRacine4e.carre_de
    carre_sur = PythagoreCarreRacine4e.carre_sur
    carre_droit = PythagoreReconnaitre4e.carre_droit
    tri_rect = PythagoreReconnaitre4e.tri_rect

    def ligne(self, texte, y, font_size=36, color=WHITE, x=3.4):
        return self.t(texte, font_size, color).move_to(P(x, y))

    def morceaux(self, pieces, y, font_size=36, color=WHITE, x=3.4, buff=0.18):
        """Une ligne en MORCEAUX (str ou Mobject), centrée en (x, y) : chacun paraît à son mot."""
        g = VGroup(*[self.t(p, font_size, color) if isinstance(p, str) else p for p in pieces])
        return g.arrange(RIGHT, buff=buff).move_to(P(x, y))

    def poser(self, ligne, reperes, anim=FadeIn, run_time=0.4):
        """Pose ligne[k] quand la voix dit reperes[k] (au_nb : son dernier nombre ; au_mot sinon)."""
        for m, r in zip(ligne, reperes):
            if r is not None:
                (self.au_nb if any(ch.isdigit() for ch in r) else self.au_mot)(r)
            self.play(anim(m), run_time=run_time)

    # ── le champ ────────────────────────────────────────────────────────────

    def champ(self, echelle=1.0, centre=None, lu=False):
        """Le champ de cannes vu du ciel : un rectangle vert rayé de rangs de cannes."""
        fond = Polygon(SO, SE, NE, NO, stroke_color=WHITE, stroke_width=3,
                       fill_color=CANNE, fill_opacity=0.55)
        rangs = VGroup(*[Line(P(SO[0] + 0.15, y), P(SE[0] - 0.15, y), color="#A3D977",
                              stroke_width=1.5, stroke_opacity=0.6)
                         for y in np.arange(SO[1] + 0.3, NO[1] - 0.1, 0.3)])
        bas = self.t("40 m", 30, COTE).next_to(Line(SO, SE), DOWN, buff=0.15)
        droite = self.t("30 m", 30, COTE).next_to(Line(SE, NE), RIGHT, buff=0.15)
        g = VGroup(fond, rangs, bas, droite)
        if lu:  # la figure qu'on LIT (rappel d'un écran précédent) : pas dans l'audit
            sans_audit(bas), sans_audit(droite)
        if centre is not None:
            g.scale(echelle).move_to(P(*centre))
        g.coins = [fond.get_vertices()[k] for k in range(4)]  # SO, SE, NE, NO après mise à l'échelle
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer l'hypoténuse", 60, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        q1 = self.t("Un champ de cannes en diagonale :", 40, BLEU_CALCUL)
        q2 = self.t("combien de mètres ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.au_mot("un champ de cannes")
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.au_mot("combien de mètres")
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : le champ ───────────────────────────────────────────────────────

    def ecran_champ(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-champ")
        c = self.champ()
        self.play(FadeIn(c[0]), Create(c[1]), run_time=1.2)
        self.au_nb("40 mètres de long")
        self.play(FadeIn(c[2]), run_time=0.5)
        self.au_nb("30 mètres de large")
        self.play(FadeIn(c[3]), run_time=0.5)
        self.au_mot("Pour aller d'un coin")
        marcheur = Dot(SO, radius=0.13, color=JAUNE_TITRE)
        chemin = VGroup(Line(SO, SE), Line(SE, NE)).set_stroke(COTE, 8)
        self.add(marcheur)
        self.play(Create(chemin[0]), marcheur.animate.move_to(SE), run_time=1.0, rate_func=linear)
        self.play(Create(chemin[1]), marcheur.animate.move_to(NE), run_time=0.8, rate_func=linear)
        self.au_nb("bords : 70")
        self.play(FadeIn(self.ligne("par les bords : 70 m", 1.3, 34, COTE, x=4.0)), run_time=0.5)
        self.au_mot("Ou couper en diagonale")
        diag = DashedLine(SO, NE, color=COUL_HYP, stroke_width=8, dash_length=0.2)
        self.play(marcheur.animate.move_to(SO), run_time=0.4)
        self.play(Create(diag), marcheur.animate.move_to(NE), run_time=1.6, rate_func=linear)
        self.au_mot("Combien mesure la diagonale")
        q = self.t("?", 60, COUL_HYP).move_to((SO + NE) / 2 + UL * 0.45)
        self.play(Write(q), FadeIn(self.ligne("en diagonale : ?", 0.3, 34, COUL_HYP, x=4.0)))
        self.attendre_voix()

    # ── 02 : le triangle ────────────────────────────────────────────────────

    def ecran_triangle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-triangle")
        c = self.champ()
        self.add(c)
        self.au_mot("coupe le champ en deux")
        haut = Polygon(SO, NE, NO, stroke_width=0, fill_color=BLACK, fill_opacity=0.55)
        tri = Polygon(SO, SE, NE, color=WHITE, stroke_width=6)
        self.play(FadeIn(haut), Create(tri))
        self.au_mot("L'angle droit est au coin")
        carre = self.carre_droit(SE, LEFT, UP, s=0.4)
        self.play(GrowFromCenter(carre))
        self.play(Indicate(carre, color=COUL_DROIT, scale_factor=1.6))
        self.play(FadeIn(self.ligne("angle droit au coin", 1.4, 32, COUL_DROIT, x=4.0)))
        self.au_mot("La diagonale est en face")
        self.play(Create(Line(SO, NE, color=COUL_HYP, stroke_width=10)))
        nom = self.ligne("l'hypoténuse", 0.3, 50, COUL_HYP, x=4.0)
        self.play(Write(nom))
        self.play(Circumscribe(nom, color=COUL_HYP))
        self.attendre_voix()

    # ── 03 : le théorème, en carreaux ───────────────────────────────────────

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-theoreme")
        self.titre_ecran("Le théorème de Pythagore")
        u = 0.4
        A = P(-4.0, -1.6)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        tri = Polygon(A, B, C, color=WHITE, stroke_width=5)
        c3 = self.carre_sur(A, C, 3, B, color=BLEU_CALCUL)
        c4 = self.carre_sur(A, B, 4, C, color=BLEU_CALCUL)
        c5 = self.carre_sur(C, B, 5, A, color=CARREAU, opacite=0.0)  # les cases vides, à remplir
        self.play(Create(tri), GrowFromCenter(self.carre_droit(A, RIGHT, UP, s=0.22)))
        self.au_mot("le carré de l'hypoténuse est égal")
        enonce = VGroup(self.t("hypoténuse²", 36, COUL_HYP), self.t("=", 36),
                        self.t("côté² + côté²", 36, BLEU_CALCUL)).arrange(RIGHT, buff=0.2).move_to(P(2.9, 2.0))
        self.play(Write(enonce))
        # (31/10) chaque nombre À SON MOT : « 3 × 3 » sur « 3 sur 3 », « = 9 » sur « c'est 9 »…
        l9 = self.morceaux(["3 × 3", "= 9"], 0.9, 38, BLEU_CALCUL, x=2.9)
        l16 = self.morceaux(["4 × 4", "= 16"], 0.1, 38, BLEU_CALCUL, x=2.9)
        l25 = self.morceaux(["9", "+ 16", "= 25"], -0.7, 42, CARREAU, x=2.9)
        self.au_nb("3 sur 3")
        self.play(LaggedStart(*[FadeIn(k) for k in c3], lag_ratio=0.05), FadeIn(l9[0]), run_time=0.8)
        self.au_nb("c'est 9")
        self.play(FadeIn(l9[1]), run_time=0.4)
        self.au_nb("4 sur 4")
        self.play(LaggedStart(*[FadeIn(k) for k in c4], lag_ratio=0.04), FadeIn(l16[0]), run_time=0.8)
        self.au_nb("c'est 16")
        self.play(FadeIn(l16[1]), run_time=0.4)
        self.au_nb("9 plus")
        self.play(Create(c5), FadeIn(l25[0]), run_time=0.4)
        self.au_nb("plus 16")
        self.play(FadeIn(l25[1]), run_time=0.3)
        # Les 9 + 16 carreaux vont remplir les 25 cases du grand carré.
        self.au_nb("16 : 25")
        sources = [k.copy() for k in list(c3) + list(c4)]
        self.add(*sources)
        cibles = [k.copy().set_fill(CARREAU, 0.7) for k in c5]
        self.play(*[Transform(s, cbl) for s, cbl in zip(sources, cibles)], FadeIn(l25[2]), run_time=1.4)
        self.au_nb("5 sur 5")
        res = self.ligne("= 5 × 5 : l'hypoténuse mesure 5", -1.5, 30, VERT_OK, x=2.7)
        self.play(Write(res), run_time=0.8)
        self.play(Circumscribe(enonce, color=JAUNE_TITRE))
        self.attendre_voix()

    # ── 04 : la méthode, sur le champ ───────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("La méthode en trois lignes")
        c = self.champ(echelle=0.55, centre=(-4.4, 0.4), lu=True)
        so, se, ne = c.coins[0], c.coins[1], c.coins[2]
        x0 = 2.2
        e1 = self.t("1. J'écris l'égalité.", 30, GRAY_B).move_to(P(x0, 2.0))
        e2 = self.t("2. Je calcule et j'additionne les carrés.", 30, GRAY_B).move_to(P(x0, 1.5))
        e3 = self.t("3. Je prends la racine carrée.", 30, GRAY_B).move_to(P(x0, 1.0))
        for e in (e1, e2, e3):  # « 1. », « 2. », « 3. » : la voix dit « Un », « Deux », « Trois »
            sans_audit(e)
        for e, mot in [(e1, "Un : j'écris"), (e2, "Deux : je calcule"), (e3, "Trois : je prends")]:
            self.au_mot(mot)
            self.play(FadeIn(e, shift=RIGHT * 0.2), run_time=0.5)
            if e is e1:  # le champ (rappel) entre « Un » et « Deux »
                self.play(FadeIn(c), Create(Line(so, ne, color=COUL_HYP, stroke_width=7)), run_time=0.6)
        # (31/10) chaque nombre À SON MOT : 30², 900, 40², 1 600, 2 500, √2 500, 50.
        l1 = self.morceaux(["diagonale² =", "30²", "+ 40²"], 0.1, 38, x=x0)
        l2 = self.morceaux(["= 900", "+ 1 600"], -0.65, 38, x=x0 + 0.4)
        l3 = self.t("= 2 500", 38).move_to(P(x0 - 0.4, -1.35))
        l4 = self.morceaux(["diagonale =", self.radical("2 500", font_size=40, color=VERT_OK), "= 50 m"],
                           -2.1, 40, VERT_OK, x=x0, buff=0.2)
        self.au_mot("Pour le champ")
        self.play(Write(l1[0]), run_time=0.5)
        self.au_nb("30 au carré")
        self.play(FadeIn(l1[1]), run_time=0.3)
        self.au_nb("carré, 900")
        self.play(FadeIn(l2[0]), run_time=0.3)
        self.au_nb("40 au carré")
        self.play(FadeIn(l1[2]), run_time=0.3)
        self.au_nb("carré, 1600")
        self.play(FadeIn(l2[1]), run_time=0.3)
        self.au_nb("1600 : 2500")
        self.play(FadeIn(l3), run_time=0.3)
        self.au_mot("Racine carrée de 2500")
        self.play(Write(l4[0]), run_time=0.4)
        self.au_nb("Racine carrée de 2500")
        self.play(Write(l4[1]), run_time=0.4)
        self.au_nb("2500 : 50")
        self.play(Write(l4[2]), run_time=0.4)
        self.au_nb("20 mètres de moins")
        moins = VGroup(self.t("20 m de moins", 26, VERT_OK), self.t("que par les bords", 26, VERT_OK))
        self.play(FadeIn(moins.arrange(DOWN, buff=0.1).move_to(P(-4.4, -1.75))), run_time=0.5)
        self.attendre_voix()

    # ── 04q : question-pause 1 (avant les pièges : + des longueurs, oubli de √) ─

    def tele(self):
        """L'écran de télévision (80 × 60, à l'échelle), sa diagonale et un « ? »."""
        e = RoundedRectangle(width=4.0, height=3.0, corner_radius=0.08, stroke_color=GRAY_B, stroke_width=6,
                             fill_color="#10233f", fill_opacity=1).move_to(P(-3.6, 0.5))
        pied = VGroup(Line(e.get_bottom(), e.get_bottom() + DOWN * 0.45, color=GRAY_B, stroke_width=8),
                      Line(e.get_bottom() + DOWN * 0.45 + LEFT * 0.7, e.get_bottom() + DOWN * 0.45 + RIGHT * 0.7,
                           color=GRAY_B, stroke_width=8))
        diag = DashedLine(e.get_corner(DL), e.get_corner(UR), color=COUL_HYP, stroke_width=6, dash_length=0.18)
        q = Text("?", font_size=56, color=COUL_HYP).move_to(e.get_center() + UL * 0.4)
        return VGroup(e, pied, diag, q)

    def question_ecran_tv(self):
        self.ecran_question(
            "04q-question", "04r-reponse",
            ["Un écran de télévision mesure", ["80 cm", "de large", "et 60 cm", "de haut."], "Combien mesure sa diagonale ?"],
            ["140 cm", "100 cm", "10 000 cm"], 1,
            [["3 600", "+ 6 400", "= 10 000 ;"], [self.radical("10 000", font_size=self.FS_PH, color=VERT_OK), "= 100"]],
            figure=self.tele(), x_col=2.6)

    # ── 05 : piège 1, additionner les longueurs ─────────────────────────────

    def ecran_piege_longueurs(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege-longueurs")
        # (31/10) titre = ce que dit la voix (« Premier piège », plus « Piège 1 »).
        self.titre_ecran("Premier piège : additionner les longueurs")
        c = self.champ(echelle=0.7, centre=(-3.6, -0.3))
        so, se, ne = c.coins[0], c.coins[1], c.coins[2]
        self.add(c)
        faux = self.morceaux(["30", "+ 40", "= 70"], 1.2, 46, ROUGE_ERREUR, x=3.3, buff=0.25)
        self.au_nb("longueurs. 30")
        self.play(Create(Line(so, se).set_stroke(COTE, 8)), Write(faux[0]), run_time=0.4)
        self.au_nb("plus 40")
        self.play(Create(Line(se, ne).set_stroke(COTE, 8)), Write(faux[1]), run_time=0.4)
        self.au_nb("fait 70")
        self.play(Write(faux[2]), run_time=0.4)
        self.au_mot("c'est le chemin par les bords")
        self.play(FadeIn(self.ligne("= le chemin par les bords", 0.4, 30, COTE, x=3.3)), run_time=0.6)
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)), run_time=0.5)
        self.au_mot("On additionne les carrés")
        regle = VGroup(self.t("On additionne les CARRÉS,", 34, VERT_OK),
                       self.t("pas les longueurs.", 34, VERT_OK)).arrange(DOWN, buff=0.15).move_to(P(3.3, -0.9))
        self.play(Write(regle))
        self.attendre_voix()

    # ── 06 : piège 2, oublier la racine ─────────────────────────────────────

    def ecran_piege_racine(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege-racine")
        # (31/10) titre = ce que dit la voix ; les nombres de l'axe À LEUR MOT (« 50 est entre 40 et 70 »).
        self.titre_ecran("Deuxième piège : oublier la racine")
        # (01/11) la voix dit l'erreur écrite (« Diagonale égale 2500 mètres ? Non ! »), puis
        # « 2 500, » paraît sur le 2e « 2500 » et « c'est diagonale² » sur « c'est le carré ».
        faux = self.ligne("diagonale = 2 500 m", 1.8, 46, ROUGE_ERREUR, x=-0.5)
        self.au_nb("égale 2500")
        self.play(Write(faux), run_time=0.6)
        self.au_mot("Non !")
        self.play(Create(Line(faux.get_left(), faux.get_right(), color=ROUGE_ERREUR, stroke_width=6)), run_time=0.4)
        vrai = self.morceaux(["2 500,", "c'est diagonale²"], 1.0, 34, ORANGE_RETENUE, x=-0.5)
        self.poser(vrai, ["Non ! 2500", "c'est le carré de la diagonale"], run_time=0.4)
        self.au_mot("Pour contrôler")
        axe = NumberLine(x_range=[0, 80, 10], length=10, include_numbers=False, color=WHITE).move_to(P(-0.5, -0.6))
        self.play(Create(axe), run_time=0.8)
        pts, nbs = {}, {}
        for v, coul in [(40, COTE), (70, COTE), (50, VERT_OK)]:
            pts[v] = Dot(axe.n2p(v), radius=0.12, color=coul)
            nbs[v] = self.t(str(v), 32, coul).next_to(pts[v], UP, buff=0.2)
        self.au_mot("le plus long côté")
        self.play(FadeIn(pts[40]), FadeIn(self.t("plus long côté", 22, COTE).next_to(axe.n2p(40), DOWN, buff=0.3)),
                  run_time=0.5)
        self.au_mot("bout à bout")
        self.play(FadeIn(pts[70]), FadeIn(self.t("bout à bout", 22, COTE).next_to(axe.n2p(70), DOWN, buff=0.3)),
                  run_time=0.5)
        ch = self.morceaux(["50 est", "entre 40", "et 70", ": c'est cohérent."], 0, 34, VERT_OK, buff=0.16)
        ch.move_to(self.chute("50 est entre 40 et 70 : c'est cohérent.", font_size=34))
        self.au_nb("bout. 50")
        self.play(FadeIn(pts[50]), FadeIn(nbs[50]), FadeIn(ch[0]), run_time=0.3)
        self.au_nb("entre 40")
        self.play(FadeIn(nbs[40]), FadeIn(ch[1]), run_time=0.3)
        self.au_nb("et 70")
        self.play(FadeIn(nbs[70]), FadeIn(ch[2]),
                  Create(Line(axe.n2p(40), axe.n2p(70), color=VERT_OK, stroke_width=10)), run_time=0.4)
        self.add(pts[50])
        self.au_mot("c'est cohérent")
        self.play(FadeIn(ch[3]), run_time=0.5)
        self.attendre_voix()

    # ── 07 : quand la racine ne tombe pas juste ─────────────────────────────

    def ecran_arrondi(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-arrondi")
        self.titre_ecran("Quand la racine ne tombe pas juste")
        u = 0.42
        A = P(-5.4, -1.8)
        B, C = A + RIGHT * 7 * u, A + UP * 5 * u
        contour, carre, hyp, _ = self.tri_rect(A, B, C)
        self.play(Create(contour), GrowFromCenter(carre))
        self.au_nb("mesurent 5")
        self.play(FadeIn(self.t("5 cm", 30, COTE).next_to(Line(A, C), LEFT, buff=0.15)), run_time=0.4)
        self.au_nb("centimètres et 7")
        self.play(FadeIn(self.t("7 cm", 30, COTE).next_to(Line(A, B), DOWN, buff=0.15)), run_time=0.4)
        self.wait(0.3)
        # (31/10) chaque nombre À SON MOT ; « 8,602… » sur « 6 0 2 » (la voix l'épelle).
        # (01/11) la voix dit « 5 au carré plus 7 au carré » : chaque morceau à son mot.
        cal = self.morceaux(["5²", "+ 7² =", "25", "+ 49", "= 74"], 1.6, 38, x=2.7)
        self.poser(cal, ["centimètres. 5", "plus 7", "carré : 25", "plus 49", "soit 74"], run_time=0.35)
        r74 = self.radical(74, font_size=40)
        val = sans_audit(self.t("= 8,602…", 40, BLEU_CALCUL))
        rac = VGroup(r74, val).arrange(RIGHT, buff=0.2)
        ecran = SurroundingRectangle(rac, color=GRAY_B, buff=0.25, corner_radius=0.1)
        VGroup(rac, ecran).move_to(P(2.7, 0.4))
        self.au_nb("Racine carrée de 74")
        self.play(Create(hyp), FadeIn(r74), Create(ecran), run_time=0.5)
        self.au_mot("2. On arrondit")
        self.play(FadeIn(val), run_time=0.3)
        res = self.morceaux(["hypoténuse", "≈ 8,6 cm"], -0.9, 44, VERT_OK, x=2.7)
        self.au_mot("On arrondit au dixième")
        self.play(Write(res[0]), run_time=0.5)
        self.au_mot("8 virgule 6 centimètres")
        self.play(Write(res[1]), FadeIn(self.t("≈ 8,6 cm", 28, COUL_HYP).move_to((B + C) / 2 + UR * 0.4)),
                  run_time=0.5)
        self.attendre_voix()

    # ── 07q : question-pause 2 (la racine qui ne tombe pas juste) ───────────

    def triangle_3_6(self):
        """Le triangle rectangle 3 × 6 (à l'échelle), son hypoténuse orange et un « ? »."""
        u = 0.68
        A = P(-5.8, -0.9)
        B, C = A + RIGHT * 6 * u, A + UP * 3 * u
        contour, carre, hyp, _ = self.tri_rect(A, B, C)
        q = Text("?", font_size=48, color=COUL_HYP).move_to((B + C) / 2 + UR * 0.4)
        return VGroup(contour, carre, hyp, q)

    def question_arrondi(self):
        self.ecran_question(
            "07q-question", "07r-reponse",
            ["Les côtés de l'angle droit", ["mesurent 3 cm", "et 6 cm."], "L'hypoténuse mesure environ :"],
            ["9 cm", "45 cm", "6,7 cm"], 2,
            [["9", "+ 36", "= 45 ;"], [self.radical(45, font_size=self.FS_PH, color=VERT_OK), "≈ 6,7"]],
            figure=self.triangle_3_6(), x_col=2.6)

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def triangle_defi(self):
        u = 0.36
        E = P(-5.0, -1.6)
        F, D = E + RIGHT * 8 * u, E + UP * 6 * u
        return E, F, D, self.tri_rect(E, F, D, lettres="EFD")

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        E, F, D, (contour, carre, hyp, lab) = self.triangle_defi()
        self.au_mot("Le triangle DEF")
        self.play(Create(contour), FadeIn(lab), GrowFromCenter(carre))
        self.au_nb("DE égale 6")
        self.play(FadeIn(self.t("6 cm", 30, COTE).next_to(Line(E, D), LEFT, buff=0.15)), run_time=0.4)
        self.au_nb("EF égale 8")
        self.play(FadeIn(self.t("8 cm", 30, COTE).next_to(Line(E, F), DOWN, buff=0.15)), run_time=0.4)
        self.au_mot("Combien mesure DF")
        self.play(Write(self.ligne("DF = ?", 0.6, 56, COUL_HYP, x=2.8)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08b-correction")
        self.titre_ecran("Correction")
        E, F, D, (contour, carre, hyp, lab) = self.triangle_defi()
        self.add(contour, lab, carre,
                 self.t("6 cm", 30, COTE).next_to(Line(E, D), LEFT, buff=0.15),
                 self.t("8 cm", 30, COTE).next_to(Line(E, F), DOWN, buff=0.15))
        for m in self.mobjects:  # la figure du défi, qu'on relit
            sans_audit(m)
        self.au_mot("Rectangle en E")
        self.play(Create(hyp), FadeIn(self.ligne("rectangle en E : hypoténuse DF", 2.0, 30, COUL_HYP, x=2.6)),
                  run_time=0.7)
        # (31/10) chaque nombre À SON MOT.
        l1 = self.morceaux(["DF² =", "6²", "+ 8²"], 1.1, 40, x=2.6)
        self.poser(l1, ["DF au carré", "égale 6", "plus 8"], run_time=0.35)
        l2 = self.morceaux(["= 36", "+ 64", "= 100"], 0.3, 40, x=2.9)
        self.poser(l2, ["carré : 36", "plus 64", "64, 100"], run_time=0.35)
        res = self.morceaux(["DF =", self.radical(100, font_size=44, color=VERT_OK), "= 10 cm"], -0.6, 44, VERT_OK,
                            x=2.6, buff=0.2)
        self.poser(res, ["DF égale racine", "racine carrée de 100", "100 : 10"], anim=Write, run_time=0.4)
        ctrl = VGroup(self.coche(), self.t("8 <", 34, VERT_OK), self.t("10", 34, VERT_OK), self.t("< 14", 34, VERT_OK))
        ctrl.arrange(RIGHT, buff=0.2).move_to(P(2.6, -1.5))
        self.au_nb("Contrôle : 10")
        self.play(FadeIn(ctrl[2]), run_time=0.3)
        self.au_nb("plus grand que 8")
        self.play(Create(ctrl[0]), FadeIn(ctrl[1]), run_time=0.4)
        self.au_nb("petit que 14")
        self.play(FadeIn(ctrl[3]), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris (31/10 : le titre de la règle, en haut et centré) ─

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Écrire l'égalité", "Écrire l'égalité de Pythagore ?"),
            ("Additionner les carrés", "Additionner les carrés, puis prendre la racine ?"),
            ("Arrondir", "Arrondir quand la racine ne tombe pas juste ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 30)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.5))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_nb("Alors l'épisode 4")
        self.play(Write(self.chute("Épisode 4 : calculer un côté de l'angle droit", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────
    # ⚠️ L'épisode 4 a SON construct() : les deux questions ci-dessous n'y passent pas.

    def construct(self):
        self.page_de_garde()
        self.ecran_champ()
        self.ecran_triangle()
        self.ecran_theoreme()
        self.ecran_methode()
        self.question_ecran_tv()
        self.ecran_piege_longueurs()
        self.ecran_piege_racine()
        self.ecran_arrondi()
        self.question_arrondi()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="10-abonne")
