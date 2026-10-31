# pythagore_carre_racine.py
# EleveAI — Maths 4e — Pythagore, épisode 1 (ordre du coach, 13/10) : le carré et la
# racine carrée (notionId : pythagore_theoreme, micro : pythagore_carre_racine), AVEC VOIX.
#
# ⭐ 31/10/2026 : refonte « questions-pauses » (manim/questions-pythagore.md, Ép. 1) :
# Q1 après 03-piege (6²), Q2 après 05-aller-retour (√81), compte à rebours de 5 s ;
# finale vers l'épisode 2 ; fin du 19/10. Module commun : pythagore_pauses.py (pilote).
# Marques mot à mot : 4e-pythagore-carre-racine.marques.json (ici). Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/pythagore_carre_racine.py PythagoreCarreRacine4e
#
# ⭐ Série « une paysage par micro + son short jumeau » (Frédéric, 12/10/2026).
# Ceinture JAUNE. Mêmes nombres que la micro du coach : 5² = 25, √49 = 7,
# le piège 3² ≠ 6, 8² = 64, √36 = 6.
#
# ⭐ L'IMAGE COMMUNE AVEC LE SHORT : le CARRELAGE. Un carré, c'est un nombre de
# carreaux rangés en carré ; la racine, c'est le nombre de carreaux sur un côté.
# Carreaux en ORANGE, longueur du côté en BLEU, comme dans le short.
#
# Voix : manim/voix/4e-pythagore-carre-racine.json (Julie, débit −7), validée le 12/10 (« go ») ;
# clés 03q/03r/05q/05r, 08-finale et 09-abonne ajoutées ou changées le 31/10.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_carre_racine.py PythagoreCarreRacine4e -o eleveai-maths-4e-pythagore-carre-racine --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/02-carre-racine/.
# En ligne : https://youtu.be/FLaSgGr-lAA (sur sa micro dans le coach, sans QR).

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_reconnaitre import P, Notion4e, echelle_ceintures  # noqa: E402  (pose aussi les chemins)
from pythagore_pauses import PausesPaysage  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402

CARREAU = ORANGE_RETENUE  # les carreaux posés
COTE = BLEU_CALCUL        # la longueur d'un côté


class PythagoreCarreRacine4e(PausesPaysage, Notion4e):
    nom_voix = "4e-pythagore-carre-racine"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    # ── les dessins ─────────────────────────────────────────────────────────

    def grille(self, n, m=None, t=0.5, centre=(0, 0), color=CARREAU, opacite=0.75):
        """n carreaux par rangée, m rangées. `.rangees` : les rangées, de haut en bas."""
        m = m or n
        rangees = VGroup()
        for j in range(m):
            r = VGroup(*[Square(t * 0.92, stroke_color=WHITE, stroke_width=1.5,
                                fill_color=color, fill_opacity=opacite)
                         .move_to(P((i - (n - 1) / 2) * t, ((m - 1) / 2 - j) * t))
                         for i in range(n)])
            rangees.add(r)
        rangees.shift(P(*centre))
        g = VGroup(*[c for r in rangees for c in r])
        g.rangees = rangees
        return g

    def accolade(self, mob, direction, texte, color=COTE, font_size=34):
        b = Brace(mob, direction, color=color)
        return VGroup(b, self.t(texte, font_size, color).next_to(b, direction, buff=0.12))

    def carre_de(self, n, font_size=60, color=WHITE):
        """« n² » composé : la base et un petit 2 en haut (pas d'exposant Unicode)."""
        base = self.t(str(n), font_size, color)
        exp = self.t("2", int(font_size * 0.55), color).next_to(base, UR, buff=0.02).shift(DOWN * font_size / 220)
        exp._pas_audit = True  # « 5 au carré » : l'exposant ne se dit pas (audit de synchro)
        return VGroup(base, exp)

    def ecriture(self, *morceaux, buff=0.3):
        return VGroup(*morceaux).arrange(RIGHT, buff=buff)

    def carre_sur(self, P1, P2, n, tiers, color=CARREAU, opacite=0.6):
        """n × n carreaux construits sur le côté [P1 P2], du côté opposé au point `tiers`."""
        d = P2 - P1
        L = np.linalg.norm(d)
        nrm = np.array([-d[1], d[0], 0]) / L
        if np.dot(nrm, tiers - P1) > 0:
            nrm = -nrm
        g = VGroup()
        for i in range(n):
            for j in range(n):
                q = lambda a, b: P1 + d * a / n + nrm * L * b / n
                g.add(Polygon(q(i, j), q(i + 1, j), q(i + 1, j + 1), q(i, j + 1),
                              stroke_color=WHITE, stroke_width=1.2, fill_color=color, fill_opacity=opacite))
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le carré et la racine carrée", 58, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_nb("Avec 25")
        q1 = self.t("25 carreaux en carré :", 40, BLEU_CALCUL)
        q2 = self.t("combien sur un côté ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.au_mot("Combien de carreaux")
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : le carrelage ───────────────────────────────────────────────────
    # (31/10) chaque nombre À SON MOT (marques), animations resserrées : 0 RETARD.

    def ecran_carrelage(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-carrelage")
        g = self.grille(5, t=0.7, centre=(-3.4, -0.1))
        sol = SurroundingRectangle(g, color=GRAY_B, buff=0.12, stroke_width=3)
        self.play(Create(sol), run_time=0.8)
        self.au_nb("5 carreaux sur un côté")
        bas = self.accolade(g, UP, "5")
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in g.rangees[0]], lag_ratio=0.25),
                  FadeIn(bas), run_time=1.0)
        self.au_nb("et 5 rangées")
        gauche = self.accolade(g, LEFT, "5")
        self.play(FadeIn(g.rangees[1], shift=DOWN * 0.3), FadeIn(gauche), run_time=0.35)
        for r in g.rangees[2:]:
            self.play(FadeIn(r, shift=DOWN * 0.3), run_time=0.3)
        self.au_nb("5 fois 5")
        a, b = self.t("5 × 5", 52), self.t("= 25", 52)
        self.ecriture(a, b, buff=0.25).move_to(P(3.2, 1.2))
        self.play(Write(a), run_time=0.6)
        self.au_nb("5 : 25")
        self.play(Write(b), run_time=0.5)
        self.au_nb("On écrit : 5")
        c5, egal = self.carre_de(5, 72, VERT_OK), self.t("= 25", 72, VERT_OK)
        ecr = self.ecriture(c5, egal).move_to(P(3.2, -0.3))
        self.play(Write(c5), run_time=0.5)
        self.au_nb("égale 25")
        self.play(Write(egal), run_time=0.5)
        self.play(Circumscribe(ecr, color=VERT_OK))
        self.attendre_voix()

    # ── 02 : le carré ───────────────────────────────────────────────────────

    def ecran_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-carre")
        self.titre_ecran("Le carré d'un nombre")
        cinq = self.carre_de(5, 60)
        ligne = self.ecriture(cinq, self.t("= 5 × 5", 60)).move_to(P(2.6, 1.9))
        self.play(Write(ligne))
        self.au_mot("Le petit 2")
        self.play(cinq[1].animate.scale(2.2).set_color(JAUNE_TITRE), run_time=0.5)
        self.play(cinq[1].animate.scale(1 / 2.2), run_time=0.5)
        self.au_mot("le même nombre")
        self.play(FadeIn(self.t("le même nombre, multiplié par lui-même", 28, JAUNE_TITRE).move_to(P(2.6, 1.05))))
        for n, cx, cy, t, y, lag in ((3, -5.0, -0.6, 0.45, -0.1, 0.4), (8, -1.9, -0.9, 0.3, -1.1, 0.2)):
            self.au_nb(f"{n} au carré")
            g = self.grille(n, t=t, centre=(cx, cy))
            cn, fois, res = self.carre_de(n, 44), self.t(f"= {n} × {n}", 44), self.t(f"= {n * n}", 44)
            self.ecriture(cn, fois, res).move_to(P(2.6, y))
            self.play(LaggedStart(*[FadeIn(r) for r in g.rangees], lag_ratio=lag),
                      FadeIn(self.accolade(g, UP, str(n), font_size=28)), Write(cn), run_time=0.9)
            self.au_nb(f"égale {n} fois {n}")
            self.play(Write(fois), run_time=0.4)
            self.au_nb(f"fois {n} : {n * n}")
            self.play(Write(res), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-piege")
        self.titre_ecran("Le piège")
        c3, neq, f2 = self.carre_de(3, 64), self.t("≠ 3", 64, ROUGE_ERREUR), self.t("× 2", 64, ROUGE_ERREUR)
        self.ecriture(c3, neq, f2).move_to(P(0, 2.0))
        self.au_nb("Le piège : 3")
        self.play(Write(c3), run_time=0.5)
        self.au_nb("pas 3")
        self.play(Write(neq), run_time=0.4)
        self.au_nb("pas 3 fois 2")
        self.play(Write(f2), run_time=0.4)
        self.au_mot("3 fois 2, c'est")
        rect = self.grille(3, 2, t=0.7, centre=(-3.6, -0.2), color=ROUGE_ERREUR, opacite=0.55)
        e3, ex2, e6 = (self.t(x, 40, ROUGE_ERREUR) for x in ("3", "× 2", "= 6"))
        self.ecriture(e3, ex2, e6, buff=0.2).next_to(rect, DOWN, buff=0.4)
        self.play(LaggedStart(*[FadeIn(r) for r in rect.rangees], lag_ratio=0.4), FadeIn(e3), run_time=0.6)
        self.au_nb("3 fois 2, c'est")
        self.play(FadeIn(ex2), run_time=0.3)
        self.au_nb("c'est 6")
        self.play(FadeIn(e6), run_time=0.4)
        self.au_mot("rectangle")
        self.play(FadeIn(self.t("un rectangle", 30, ROUGE_ERREUR).next_to(rect, UP, buff=0.3)), run_time=0.5)
        self.au_mot("c'est un carré de 3 sur 3")
        car = self.grille(3, t=0.7, centre=(1.8, -0.2), color=VERT_OK, opacite=0.5)
        self.play(LaggedStart(*[FadeIn(r) for r in car.rangees], lag_ratio=0.4),
                  FadeIn(self.t("un carré", 30, VERT_OK).next_to(car, UP, buff=0.3)), run_time=0.8)
        c3b, f33, e9 = self.carre_de(3, 40, VERT_OK), self.t("= 3 × 3", 40, VERT_OK), self.t("= 9", 40, VERT_OK)
        self.ecriture(c3b, f33, e9).next_to(car, DOWN, buff=0.4)
        self.au_nb("de 3 sur 3")
        self.play(Write(VGroup(c3b, f33)), run_time=0.5)
        self.au_nb("9 carreaux")
        self.play(Write(e9), run_time=0.4)
        self.attendre_voix()

    # ── 03q : question-pause 1 (le piège du × 2) ────────────────────────────

    def question_carre(self):
        self.ecran_question("03q-question", "03r-reponse", ["Combien vaut 6² ?"], ["12", "36", "66"], 1,
                            ["6² = 6 × 6,", ["et pas 6", "× 2."]])

    # ── 04 : la racine carrée ───────────────────────────────────────────────

    def ecran_racine(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-racine")
        self.titre_ecran("Le chemin inverse : la racine carrée")
        g = self.grille(7, t=0.5, centre=(-3.4, -0.4))
        rng = np.random.default_rng(7)
        cibles = [c.get_center().copy() for c in g]
        for c in g:
            c.move_to(P(rng.uniform(-6.3, -0.6), rng.uniform(-2.9, 2.0)))
        self.au_nb("On a 49")
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in g], lag_ratio=0.02),
                  FadeIn(self.t("49 carreaux", 40, CARREAU).move_to(P(3.0, 1.6))), run_time=1.2)
        self.au_mot("rangés en carré")
        self.play(*[c.animate.move_to(p) for c, p in zip(g, cibles)], run_time=1.4)
        self.au_mot("Combien sur un côté")
        haut = Brace(g, UP, color=COTE)
        q = self.t("?", 40, COTE).next_to(haut, UP, buff=0.12)
        self.play(FadeIn(haut), Write(q), run_time=0.8)
        self.au_nb("donne 49")
        self.play(FadeIn(self.t("? × ? = 49", 44).move_to(P(3.0, 0.6))), run_time=0.5)
        self.au_nb("c'est 7")
        sept = self.t("7", 40, COTE).move_to(q)
        self.play(Transform(q, sept), FadeIn(self.t("7 × 7 = 49", 44, COTE).move_to(P(3.0, -0.3))), run_time=0.6)
        r49, e7 = self.radical(49, font_size=72, color=VERT_OK), self.t("= 7", 72, VERT_OK)
        rac = VGroup(r49, e7).arrange(RIGHT, buff=0.25).move_to(P(3.0, -1.6))
        self.au_nb("racine carrée de 49")
        self.play(Write(r49), run_time=0.6)
        self.au_nb("égale 7")
        self.play(Write(e7), run_time=0.4)
        self.play(Circumscribe(rac, color=VERT_OK))
        self.attendre_voix()

    # ── 05 : l'aller-retour ─────────────────────────────────────────────────

    def ecran_aller_retour(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-aller-retour")
        self.titre_ecran("Un aller-retour")
        six = self.t("6", 96, COTE).move_to(P(-3.2, 0))
        trente = self.t("36", 96, CARREAU).move_to(P(3.2, 0))
        self.au_nb("6 au carré")
        aller = CurvedArrow(P(-2.5, 0.6), P(2.4, 0.6), angle=-PI / 3, color=CARREAU, stroke_width=6)
        self.play(FadeIn(six), Create(aller), run_time=0.7)
        self.au_nb("au carré : 36")
        self.play(FadeIn(self.t("au carré : 6 × 6", 34, CARREAU).move_to(P(0, 2.3))), FadeIn(trente), run_time=0.6)
        self.au_mot("Racine carrée de 36")
        retour = CurvedArrow(P(2.4, -0.6), P(-2.5, -0.6), angle=-PI / 3, color=COTE, stroke_width=6)
        self.play(Create(retour), run_time=0.7)
        self.au_nb("Racine carrée de 36")
        lab = VGroup(self.t("racine carrée :", 34, COTE), self.radical(36, font_size=40, color=COTE)).arrange(RIGHT, buff=0.2)
        self.play(FadeIn(lab.move_to(P(0, -2.3))), run_time=0.5)
        self.au_mot("on revient à 6")
        self.play(Indicate(six, color=COTE, scale_factor=1.4))
        self.attendre_voix()

    # ── 05q : question-pause 2 (la racine ne divise pas par 2) ──────────────

    def question_racine(self):
        fs = self.FS_Q
        q = [["Combien vaut", self.radical(81, font_size=fs), "?"]]
        self.ecran_question("05q-question", "05r-reponse", q, ["9", "40,5", "18"], 0,
                            [["9 × 9", "= 81 :"], ["la racine ne divise pas", "par 2."]])

    # ── 06 : pourquoi maintenant ────────────────────────────────────────────

    def ecran_pourquoi(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-pourquoi")
        self.titre_ecran("Pourquoi maintenant ?")
        u = 0.42
        A = P(-3.6, -0.9)
        B, C = A + RIGHT * 4 * u, A + UP * 3 * u
        tri = Polygon(A, B, C, color=WHITE, stroke_width=5)
        self.play(Create(tri), run_time=0.8)
        self.au_mot("carrés construits sur les côtés")
        c3 = self.carre_sur(A, C, 3, B, color=BLEU_CALCUL)
        c4 = self.carre_sur(A, B, 4, C, color=BLEU_CALCUL)
        c5 = self.carre_sur(C, B, 5, A, color=CARREAU)
        for c in (c3, c4, c5):
            self.play(LaggedStart(*[FadeIn(k) for k in c], lag_ratio=0.03), run_time=0.6)
        self.add(tri)
        self.play(FadeIn(self.t("des carrés sur les côtés", 34).move_to(P(3.2, 1.4))), run_time=0.5)
        self.au_mot("pour retrouver une longueur")
        ligne = VGroup(self.t("côté =", 44, COTE), self.radical(25, font_size=44, color=COTE),
                       self.t("= 5", 44, COTE)).arrange(RIGHT, buff=0.2).move_to(P(3.2, 0.1))
        self.play(Write(ligne))
        self.play(Indicate(Line(C, B), color=COTE))
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_nb("Combien vaut 4")
        self.play(Write(self.ecriture(self.carre_de(4, 72), self.t("= ?", 72)).move_to(P(-0.5, 1.2))))
        self.au_nb("Et la racine carrée de 100")
        self.play(Write(VGroup(self.radical(100, font_size=72), self.t("= ?", 72)).arrange(RIGHT, buff=0.25)
                        .move_to(P(-0.5, -0.4))))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        g4 = self.grille(4, t=0.5, centre=(-4.6, -0.3))
        c4, f44, e16 = self.carre_de(4, 44, VERT_OK), self.t("= 4 × 4", 44, VERT_OK), self.t("= 16", 44, VERT_OK)
        self.ecriture(c4, f44, e16).move_to(P(2.7, 1.3))
        self.au_nb("Correction. 4")
        self.play(LaggedStart(*[FadeIn(r) for r in g4.rangees], lag_ratio=0.3), Write(c4), run_time=0.9)
        self.au_nb("c'est 4 fois 4")
        self.play(Write(f44), run_time=0.4)
        self.au_nb("4 : 16")
        self.play(Write(e16), run_time=0.4)
        self.au_nb("et pas 8")
        self.play(FadeIn(self.t("et pas 4 × 2 = 8", 32, ROUGE_ERREUR).move_to(P(2.7, 0.5))), run_time=0.5)
        self.au_mot("Racine carrée de 100")
        g10 = self.grille(10, t=0.23, centre=(-1.6, -0.6), color=COTE, opacite=0.6)
        r100, e10 = self.radical(100, font_size=44, color=VERT_OK), self.t("= 10", 44, VERT_OK)
        VGroup(r100, e10).arrange(RIGHT, buff=0.2).move_to(P(2.7, -0.6))
        c1010, e100 = self.t("car 10 × 10", 32), self.t("= 100", 32)
        self.ecriture(c1010, e100, buff=0.2).move_to(P(2.7, -1.4))
        self.play(LaggedStart(*[FadeIn(r) for r in g10.rangees], lag_ratio=0.15), run_time=0.9)
        self.au_nb("Racine carrée de 100")
        self.play(Write(r100), run_time=0.4)
        self.au_nb("100 : 10")
        self.play(Write(e10), run_time=0.4)
        self.au_nb("car 10 fois 10")
        self.play(FadeIn(c1010), run_time=0.4)
        self.au_nb("égale 100")
        self.play(FadeIn(e100), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu sais faire maintenant ────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 44, JAUNE_TITRE).to_edge(UP)))
        # (31/10) chaque morceau à SON mot : le « × 2 » quand la voix dit « fois 2 ».
        questions = [
            (("Calculer un carré", "Calculer un carré,"), ("fois 2", "sans le confondre avec × 2 ?")),
            (("Trouver une racine", "Trouver une racine carrée :"), ("en cherchant", "quel nombre × lui-même ?")),
        ]
        lignes = VGroup(*[VGroup(self.coche(), VGroup(self.t(a[1], 30), self.t(b[1], 30)).arrange(RIGHT, buff=0.18))
                          .arrange(RIGHT, buff=0.3) for a, b in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to(P(-0.3, 0.7))
        for (a, b), l in zip(questions, lignes):
            self.au_mot(a[0])
            self.play(FadeIn(l[1][0], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
            self.au_nb(b[0])
            self.play(FadeIn(l[1][1], shift=RIGHT * 0.2), run_time=0.5)
        self.au_nb("Alors l'épisode 2")
        self.play(Write(self.chute("Épisode 2 : reconnaître l'hypoténuse", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_carrelage()
        self.ecran_carre()
        self.ecran_piege()
        self.question_carre()
        self.ecran_racine()
        self.ecran_aller_retour()
        self.question_racine()
        self.ecran_pourquoi()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
