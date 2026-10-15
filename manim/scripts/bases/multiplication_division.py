# multiplication_division.py
# EleveAI — « Les bases » — Une multiplication, deux divisions.
#
# ⭐ 07/10/2026 — Frédéric : « pour la vidéo explique multiplication et division :
# 12 = 3 × 4 donc 12 : 4 = 3 et 12 : 3 = 4 ». Titre choisi par lui, paysage.
# Voix validée avec lui : manim/voix/bases-multiplication-division.json (−7).
# Il a gardé le piège du reste (13 : 4, annoncé sans explication) et voulu que
# « 4 divisé par 12 » soit DIT comme le piège, sans en donner le résultat.
# ⭐ LE FIL : 12 jetons en 3 rangées de 4. On ne bouge pas un jeton : les
# colonnes font 12 : 4 = 3, les rangées 12 : 3 = 4. Puis la division se LIT
# dans le grand tableau (la page /tables-de-multiplication imprime le même).
# ⛔ La division s'écrit « : », jamais avec une barre (Frédéric, 06/10).
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU (série « Les bases »).
#
# Voix :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/bases-multiplication-division.json -Debit -7
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/multiplication_division.py UneMultiplicationDeuxDivisions -o eleveai-maths-bases-multiplication-division --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "voir une multiplication avec des jetons",
    "en tirer deux divisions",
    "diviser en lisant la table",
]


class UneMultiplicationDeuxDivisions(Notion6e):

    identite = "Les bases · EleveAI"
    nom_voix = "bases-multiplication-division"

    # ── les briques ─────────────────────────────────────────────────────────

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def jetons(self, rangees, colonnes, pas=0.78, rayon=0.26, couleur=BLEU_CALCUL):
        """Les jetons, rangée par rangée : g[r][c]."""
        g = VGroup()
        for r in range(rangees):
            ligne = VGroup()
            for c in range(colonnes):
                j = Circle(radius=rayon, stroke_color=WHITE, stroke_width=2)
                j.set_fill(couleur, opacity=0.9)
                j.move_to([c * pas, -r * pas, 0])
                ligne.add(j)
            g.add(ligne)
        return g

    def colonnes(self, g):
        """Les mêmes jetons, regroupés par colonne."""
        return [VGroup(*[ligne[c] for ligne in g]) for c in range(len(g[0]))]

    def cadre(self, mob, couleur, buff=0.12):
        return SurroundingRectangle(mob, color=couleur, buff=buff,
                                    corner_radius=0.2, stroke_width=4)

    def tableau(self, cote=0.56, font_size=20):
        """Le grand tableau 10 × 10, avec sa ligne et sa colonne d'en-tête.

        Renvoie (groupe, cases) — cases[(a, b)], 0 pour les en-têtes.
        """
        cases = {}
        g = VGroup()
        for a in range(11):
            for b in range(11):
                carre = Square(side_length=cote, stroke_width=1.2, stroke_color=GREY_B)
                carre.move_to([b * cote, -a * cote, 0])
                if a == 0 and b == 0:
                    lbl = self.t("×", font_size, JAUNE_TITRE)
                elif a == 0 or b == 0:
                    lbl = self.t(str(a or b), font_size, JAUNE_TITRE)
                    carre.set_fill(GREY_E, opacity=1)
                else:
                    lbl = self.t(str(a * b), font_size - 2, WHITE)
                lbl.move_to(carre)
                case = VGroup(carre, lbl)
                cases[(a, b)] = case
                g.add(case)
        return g, cases

    # ── les écrans ──────────────────────────────────────────────────────────

    def ecran_jetons(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-jetons")
        self.titre_ecran("12 jetons")
        g = self.jetons(3, 4).move_to([-3.0, 0.2, 0])
        self.au_mot("Voici 12 jetons")
        self.play(LaggedStart(*[GrowFromCenter(j) for ligne in g for j in ligne], lag_ratio=0.08))
        self.au_mot("rangés en 3 rangées de 4")
        r3 = self.t("3 rangées", 28, ORANGE_RETENUE).next_to(g, LEFT, buff=0.45)
        r4 = self.t("4 par rangée", 28, VERT_OK).next_to(g, UP, buff=0.35)
        self.play(FadeIn(r3), FadeIn(r4))
        self.au_mot("3 fois 4 égale 12")
        f1 = self.t("3 × 4 = 12", 60).move_to([3.2, 1.0, 0])
        self.play(Write(f1))
        self.au_mot("Tournons le rectangle")
        self.play(FadeOut(r3), FadeOut(r4))
        self.play(Rotate(g, angle=-PI / 2), run_time=1.4)
        self.au_mot("4 rangées de 3")
        r4b = self.t("4 rangées", 28, ORANGE_RETENUE).next_to(g, LEFT, buff=0.45)
        r3b = self.t("3 par rangée", 28, VERT_OK).next_to(g, UP, buff=0.35)
        self.play(FadeIn(r4b), FadeIn(r3b))
        self.au_mot("4 fois 3 égale 12")
        f2 = self.t("4 × 3 = 12", 60).move_to([3.2, -0.6, 0])
        self.play(Write(f2))
        self.play(Write(self.chute("Toujours 12 jetons.", color=VERT_OK)))
        self.attendre_voix()

    def _partage(self, voix, par_colonnes, diviseur, quotient, couleur):
        self.clear()
        self.add_mascotte()
        self.dire(voix)
        g = self.jetons(3, 4).move_to([-2.8, 0.1, 0])
        self.add(g)
        self.titre_ecran(f"12 jetons en {diviseur} groupes")
        groupes = self.colonnes(g) if par_colonnes else list(g)
        self.au_mot(f"en {diviseur} groupes égaux")
        q = self.t(f"12 jetons, {diviseur} groupes égaux", 30, BLEU_CALCUL).move_to([2.9, 2.0, 0])
        self.play(FadeIn(q))
        self.au_mot("est un groupe")
        # On écarte les groupes : le partage se voit.
        decalages = [(i - (len(groupes) - 1) / 2) * 0.45 for i in range(len(groupes))]
        self.play(*[grp.animate.shift((RIGHT if par_colonnes else DOWN) * d)
                    for grp, d in zip(groupes, decalages)], run_time=1.0)
        cadres = VGroup(*[self.cadre(grp, couleur) for grp in groupes])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2))
        self.au_mot("Dans chaque groupe")
        nombres = VGroup(*[
            self.t(str(quotient), 32, couleur).next_to(c, DOWN if par_colonnes else RIGHT, buff=0.2)
            for c in cadres
        ])
        self.play(LaggedStart(*[FadeIn(n, scale=1.3) for n in nombres], lag_ratio=0.15))
        self.au_mot(f"12 divisé par {diviseur}")
        f = self.t(f"12 : {diviseur} = {quotient}", 72, couleur).move_to([3.0, 0.0, 0])
        self.play(Write(f))
        self.play(Circumscribe(f, color=couleur))
        self.attendre_voix()

    def ecran_famille(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-famille")
        self.titre_ecran("Une famille de trois nombres")
        haut = self.t("12", 64, JAUNE_TITRE).move_to([-3.6, 1.6, 0])
        gauche = self.t("3", 64, ORANGE_RETENUE).move_to([-5.2, -1.0, 0])
        droite = self.t("4", 64, VERT_OK).move_to([-2.0, -1.0, 0])
        triangle = Polygon([-3.6, 1.0, 0], [-4.8, -0.55, 0], [-2.4, -0.55, 0],
                           stroke_color=WHITE, stroke_width=3)
        self.au_mot("Les trois nombres 3, 4 et 12")
        self.play(FadeIn(gauche), FadeIn(droite), FadeIn(haut), Create(triangle))
        self.au_mot("Le plus grand, 12, en haut")
        self.play(Indicate(haut, color=JAUNE_TITRE, scale_factor=1.3))
        self.au_mot("deux multiplications")
        m = VGroup(self.t("3 × 4 = 12", 44), self.t("4 × 3 = 12", 44)).arrange(DOWN, buff=0.4)
        m.move_to([0.9, 0.6, 0])
        tm = self.t("2 multiplications", 26, BLEU_CALCUL).next_to(m, UP, buff=0.35)
        self.play(FadeIn(tm), Write(m[0]))
        self.au_mot("4 fois 3 égale 12")
        self.play(Write(m[1]))
        self.au_mot("Et deux divisions")
        d = VGroup(self.t("12 : 4 = 3", 44, VERT_OK), self.t("12 : 3 = 4", 44, ORANGE_RETENUE))
        d.arrange(DOWN, buff=0.4).move_to([4.6, 0.6, 0])
        td = self.t("2 divisions", 26, BLEU_CALCUL).next_to(d, UP, buff=0.35)
        self.play(FadeIn(td), Write(d[0]))
        self.au_mot("12 divisé par 3 égale 4")
        self.play(Write(d[1]))
        self.au_mot("Une multiplication, deux divisions")
        self.play(Write(self.chute("Une multiplication, deux divisions.", color=JAUNE_TITRE, font_size=36)))
        self.attendre_voix()

    def ecran_question(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-la-question")
        self.titre_ecran("Diviser, c'est quoi ?")
        self.au_mot("12 divisé par 4")
        q = self.t("12 : 4 = ?", 64).move_to([0, 1.6, 0])
        self.play(Write(q))
        self.au_mot("4 fois combien font 12")
        quatre = self.t("4 ×", 64)
        boite = Square(side_length=1.0, color=BLEU_CALCUL, stroke_width=4)
        reste = self.t("= 12", 64)
        ligne = VGroup(quatre, boite, reste).arrange(RIGHT, buff=0.3).move_to([0, -0.1, 0])
        self.play(FadeIn(ligne, shift=UP * 0.2))
        self.au_mot("le nombre qui manque")
        self.play(Indicate(boite, color=BLEU_CALCUL, scale_factor=1.25))
        self.au_mot("4 fois 3 égale 12")
        trois = self.t("3", 64, VERT_OK).move_to(boite)
        self.play(FadeIn(trois, scale=1.4))
        self.au_mot("la réponse est 3")
        rep = self.t("12 : 4 = 3", 64, VERT_OK).move_to(q)
        self.play(Transform(q, rep))
        self.play(Write(self.chute("Diviser, c'est chercher le nombre qui manque.", color=BLEU_CALCUL)))
        self.attendre_voix()

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-lire-la-table")
        g, cases = self.tableau()
        g.move_to([-3.1, -0.25, 0])
        self.au_mot("Avec le grand tableau")
        self.play(FadeIn(g))
        self.au_mot("42 divisé par 6")
        q = self.t("42 : 6 = ?", 56).move_to([3.4, 2.4, 0])
        self.play(Write(q))
        self.au_mot("la ligne de 6")
        ligne = SurroundingRectangle(VGroup(*[cases[(6, b)] for b in range(11)]),
                                     color=ORANGE_RETENUE, buff=0.02, stroke_width=4)
        self.play(Create(ligne), Indicate(cases[(6, 0)][1], color=ORANGE_RETENUE))
        e1 = self.t("1. la ligne de 6", 30, ORANGE_RETENUE).move_to([3.4, 1.1, 0])
        self.play(FadeIn(e1))
        self.au_mot("jusqu'à trouver 42")
        case42 = cases[(6, 7)]
        self.play(case42[0].animate.set_fill(ORANGE_RETENUE, opacity=0.8))
        e2 = self.t("2. on trouve 42", 30, ORANGE_RETENUE).move_to([3.4, 0.3, 0])
        self.play(FadeIn(e2))
        self.au_mot("en haut de la colonne")
        colonne = SurroundingRectangle(VGroup(*[cases[(a, 7)] for a in range(7)]),
                                       color=VERT_OK, buff=0.02, stroke_width=4)
        self.play(Create(colonne))
        self.play(cases[(0, 7)][0].animate.set_fill(VERT_OK, opacity=0.8))
        e3 = self.t("3. en haut, le 7", 30, VERT_OK).move_to([3.4, -0.5, 0])
        self.play(FadeIn(e3))
        self.au_mot("Donc 42 divisé par 6 égale 7")
        r1 = self.t("42 : 6 = 7", 56, VERT_OK).move_to(q)
        self.play(Transform(q, r1))
        self.au_mot("42 divisé par 7 égale 6")
        r2 = self.t("42 : 7 = 6", 48, BLEU_CALCUL).move_to([3.4, -1.6, 0])
        self.play(Write(r2))
        self.attendre_voix()

    def ecran_56(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-exemple-56")
        self.titre_ecran("Revenons au début")
        self.au_mot("56 divisé par 8")
        q = self.t("56 : 8 = ?", 60).move_to([2.6, 1.7, 0])
        self.play(Write(q))
        self.au_mot("8 fois combien font 56")
        question = self.t("8 × ? = 56", 44, BLEU_CALCUL).move_to([2.6, 0.6, 0])
        self.play(FadeIn(question))
        self.au_mot("Dans la table de 8")
        table = VGroup(*[self.t(f"8 × {k} = {8 * k}", 30) for k in range(1, 11)])
        table.arrange(DOWN, aligned_edge=LEFT, buff=0.2).move_to([-3.6, -0.35, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.15) for l in table], lag_ratio=0.08))
        self.au_mot("8 fois 7 égale 56")
        ligne7 = table[6]
        self.play(ligne7.animate.set_color(VERT_OK))
        self.play(Create(self.cadre(ligne7, VERT_OK)))
        self.au_mot("Donc 56 divisé par 8 égale 7")
        r1 = self.t("56 : 8 = 7", 60, VERT_OK).move_to(q)
        self.play(Transform(q, r1))
        self.au_mot("la deuxième division est offerte")
        offerte = self.t("offerte !", 30, JAUNE_TITRE).move_to([1.3, -0.8, 0])
        self.play(FadeIn(offerte))
        self.au_mot("56 divisé par 7 égale 8")
        r2 = self.t("56 : 7 = 8", 52, JAUNE_TITRE).next_to(offerte, RIGHT, buff=0.3)
        self.play(Write(r2))
        self.play(Circumscribe(r2, color=JAUNE_TITRE))
        self.attendre_voix()

    def ecran_pieges(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-pieges")
        self.titre_ecran("Deux pièges")
        sep = Line([0.2, 2.6, 0], [0.2, -2.9, 0], stroke_width=2, color=GREY_B)
        self.add(sep)
        # ── Piège 1 : la division ne se retourne pas
        self.au_mot("Premier piège")
        p1 = self.t("Piège 1", 30, ORANGE_RETENUE).move_to([-3.4, 2.3, 0])
        self.play(FadeIn(p1))
        self.au_mot("3 fois 4 égale 4 fois 3")
        a = self.t("3 × 4 = 4 × 3", 44).move_to([-3.6, 1.3, 0])
        self.play(Write(a))
        self.play(Create(self.coche().next_to(a, RIGHT, buff=0.3)))
        self.au_mot("12 divisé par 4 égale 3")
        b = self.t("12 : 4 = 3", 44, VERT_OK).move_to([-3.6, 0.2, 0])
        self.play(Write(b))
        self.play(Create(self.coche().next_to(b, RIGHT, buff=0.3)))
        self.au_mot("Mais 4 divisé par 12")
        c = self.t("4 : 12 = 3", 44, ROUGE_ERREUR).move_to([-3.6, -0.9, 0])
        self.play(Write(c))
        self.au_mot("c'est le piège")
        mot = self.t("PIÈGE", 34, ROUGE_ERREUR).next_to(c, DOWN, buff=0.3)
        self.play(Create(Cross(c, stroke_color=WHITE, stroke_width=4, scale_factor=0.85)), GrowFromCenter(mot))
        self.au_mot("Le grand nombre se partage")
        regle = self.t("Le grand nombre passe en premier.", 24, BLEU_CALCUL).move_to([-3.4, -2.5, 0])
        self.play(FadeIn(regle))
        # ── Piège 2 : la division qui ne tombe pas juste
        self.au_mot("Second piège")
        p2 = self.t("Piège 2", 30, ORANGE_RETENUE).move_to([3.3, 2.3, 0])
        self.play(FadeIn(p2))
        self.au_mot("13 divisé par 4")
        d = self.t("13 : 4 = ?", 44).move_to([3.3, 1.4, 0])
        self.play(Write(d))
        self.au_mot("4 fois 3 égale 12")
        l1 = self.t("4 × 3 = 12", 32).move_to([2.6, 0.65, 0])
        self.play(FadeIn(l1))
        self.au_mot("4 fois 4 égale 16")
        l2 = self.t("4 × 4 = 16", 32).move_to([2.6, -0.45, 0])
        self.play(FadeIn(l2))
        treize = self.t("13 ?", 30, ROUGE_ERREUR).move_to([2.6, 0.1, 0])
        self.play(FadeIn(treize))
        self.au_mot("il reste quelque chose")
        g = self.jetons(3, 4, pas=0.72, rayon=0.17).move_to([2.1, -1.85, 0])
        cadres = VGroup(*[self.cadre(col, VERT_OK, buff=0.08) for col in self.colonnes(g)])
        seul = Circle(radius=0.17, stroke_color=WHITE, stroke_width=2).set_fill(ROUGE_ERREUR, opacity=0.9)
        seul.next_to(g, RIGHT, buff=0.7)
        self.play(FadeIn(g), Create(cadres))
        self.play(GrowFromCenter(seul))
        self.play(Indicate(seul, color=ROUGE_ERREUR, scale_factor=1.6))
        lbl = self.t("il reste…", 24, ROUGE_ERREUR).next_to(seul, DOWN, buff=0.25)
        self.play(FadeIn(lbl))
        self.au_mot("Ce sera pour un autre épisode")
        self.play(FadeIn(self.t("Pour un autre épisode !", 22, BLEU_CALCUL).move_to([2.6, -3.0, 0])))
        self.attendre_voix()

    def ecran_recap(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-recap")
        self.titre_ecran("Le récapitulatif")
        self.au_mot("Une multiplication donne deux divisions")
        l1 = self.t("Une multiplication donne deux divisions", 30, JAUNE_TITRE).move_to([-0.6, 2.5, 0])
        self.play(FadeIn(l1))
        # ⭐ Les billes de la feuille à imprimer (Frédéric, 07/10 : « j'adore les
        # schémas avec les billes ») : le même rectangle, lu de trois façons.
        xs = [-4.0, -0.6, 2.8]
        f = VGroup(self.t("3 × 4 = 12", 36), self.t("12 : 4 = 3", 36, VERT_OK),
                   self.t("12 : 3 = 4", 36, ORANGE_RETENUE))
        billes = VGroup()
        for i, x in enumerate(xs):
            g = self.jetons(3, 4, pas=0.5, rayon=0.15).move_to([x, 1.35, 0])
            if i == 1:
                g.add(*[self.cadre(c, VERT_OK, buff=0.06).set_stroke(width=2.5) for c in self.colonnes(g)])
            if i == 2:
                g.add(*[self.cadre(r, ORANGE_RETENUE, buff=0.06).set_stroke(width=2.5) for r in list(g)])
            billes.add(g)
            f[i].move_to([x, 0.3, 0])
        self.au_mot("3 fois 4 égale 12")
        self.play(FadeIn(billes[0]), Write(f[0]))
        self.au_mot("donc 12 divisé par 4 égale 3")
        self.play(FadeIn(billes[1]), Write(f[1]))
        self.au_mot("et 12 divisé par 3 égale 4")
        self.play(FadeIn(billes[2]), Write(f[2]))
        self.au_mot("Diviser, c'est chercher")
        l2 = self.t("Diviser, c'est chercher le nombre qui manque", 30, JAUNE_TITRE).move_to([-0.6, -0.5, 0])
        boite = Square(side_length=0.62, color=BLEU_CALCUL, stroke_width=3)
        ex = VGroup(self.t("4 ×", 38), boite, self.t("= 12", 38)).arrange(RIGHT, buff=0.2)
        ex.move_to([-0.6, -1.2, 0])
        self.play(FadeIn(l2), FadeIn(ex))
        self.au_mot("Et dans le tableau")
        etapes = VGroup(
            self.t("la ligne", 32, ORANGE_RETENUE), self.t("→", 32),
            self.t("le résultat", 32, ORANGE_RETENUE), self.t("→", 32),
            self.t("le haut de la colonne", 32, VERT_OK),
        ).arrange(RIGHT, buff=0.3).move_to([-0.6, -2.65, 0])
        titre_t = self.t("Dans le tableau", 30, JAUNE_TITRE).next_to(etapes, UP, buff=0.3)
        self.play(FadeIn(titre_t))
        self.play(LaggedStart(*[FadeIn(e, shift=RIGHT * 0.15) for e in etapes], lag_ratio=0.35))
        self.attendre_voix()

    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-defi")
        self.titre_ecran("À toi !")
        lignes = [("63 divisé par 9", "63 : 9 = ?"), ("48 divisé par 6", "48 : 6 = ?"),
                  ("35 divisé par 5", "35 : 5 = ?")]
        for i, (extrait, texte) in enumerate(lignes):
            self.au_mot(extrait)
            self.play(Write(self.t(texte, 56).move_to([-0.6, 1.5 - i * 1.25, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=34)))
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("11-correction")
        self.titre_ecran("Correction")
        lignes = [
            ("9 fois 7 égale 63", "9 × 7 = 63", "63 divisé par 9", "63 : 9 = 7"),
            ("6 fois 8 égale 48", "6 × 8 = 48", "48 divisé par 6", "48 : 6 = 8"),
            ("5 fois 7 égale 35", "5 × 7 = 35", "35 divisé par 5", "35 : 5 = 7"),
        ]
        for i, (e1, m, e2, d) in enumerate(lignes):
            y = 1.5 - i * 1.3
            self.au_mot(e1)
            mm = self.t(m, 46).move_to([-3.6, y, 0])
            self.play(Write(mm))
            self.au_mot(e2)
            fl = self.t("donc", 30, BLEU_CALCUL).move_to([-0.9, y, 0])
            dd = self.t(d, 46, VERT_OK).move_to([1.9, y, 0])
            self.play(FadeIn(fl), Write(dd))
            self.play(Create(self.coche().next_to(dd, RIGHT, buff=0.3)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Une multiplication, deux divisions",
            accroche="56 : 8 = ?",
            promesse="Sans poser la division, avec la table de 8.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_jetons()
        self._partage("02-en-4-groupes", par_colonnes=True, diviseur=4, quotient=3, couleur=VERT_OK)
        self._partage("03-en-3-groupes", par_colonnes=False, diviseur=3, quotient=4, couleur=ORANGE_RETENUE)
        self.ecran_famille()
        self.ecran_question()
        self.ecran_tableau()
        self.ecran_56()
        self.ecran_pieges()
        self.ecran_recap()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=OBJECTIFS,
            rappel="Chaque table que tu apprends, tu l'apprends deux fois.",
            voix="12-finale",
        )
        self.page_abonnement(voix="13-abonne")
