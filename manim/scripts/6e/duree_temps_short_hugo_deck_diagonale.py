# duree_temps_short_hugo_deck_diagonale.py
# EleveAI — Maths 6e — short « Hugo Deck gagne la Diagonale des Fous 2026 en
# 22 h 54 min 24 s : combien de secondes ? ». CEINTURE JAUNE (un calcul).
# Voix validée par Frédéric le 19/10/2026 (« go », chrono de sa capture
# L'Équipe : 22:54:24) : manim/voix/6e-duree-temps-short-hugo-deck-diagonale.json,
# Julie, débit −10.
#
# Pourquoi les SECONDES (et non les heures décimales ni la vitesse) : la vitesse
# a déjà son short (180 km ÷ 23,5 h, `YwddOhgj4as`) ; 22 h 54 min 24 s en
# heures donne 22,906… h, un nombre qu'on ne peut pas écrire juste. En secondes,
# tout tombe juste et chaque nombre dit s'écrit : 22 × 3600 + 54 × 60 + 24 = 82 464.
#
# Code couleur partagé : le chrono porte ses trois morceaux en couleur (22 h
# bleu, 54 min orange, 24 s violet), et chaque calcul garde la couleur de son
# morceau ; le total est vert.
# Question en commentaire : vainqueur 2025 (Baptiste Chassagne) en
# 23 h 31 min 54 s → 84 714 s ; écart 2250 s (37 min 30 s).
# Micro : 6e `duree_convertir` (le défi `duree_defi` porte déjà `ZvLpuAx-TBs`).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/duree_temps_short_hugo_deck_diagonale.py ShortHugoDeckDiagonale6e -o eleveai-maths-6e-duree-temps-short-hugo-deck-diagonale --media_dir manim/scripts/6e/media

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_diagonale import ShortDiagonale  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_H = BLEU_CALCUL
C_MIN = ORANGE_RETENUE
C_S = VIOLET_ACCENT
PEAU = "#C68B59"
MAILLOT = "#1E293B"
NUIT = "#0F172A"


def P(x, y):
    return np.array([x, y, 0.0])


def coureur():
    """Le vainqueur, bras levés : maillot sombre aux trois barres, dossard."""
    tete = Circle(radius=0.22, fill_color=PEAU, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete.move_to(P(0, 0.95))
    corps = Polygon(P(-0.3, 0.68), P(0.3, 0.68), P(0.24, -0.15), P(-0.24, -0.15),
                    fill_color=MAILLOT, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    barres = VGroup(*[Line(P(-0.2 + 0.11 * k, 0.6), P(-0.05 + 0.11 * k, 0.32)) for k in range(3)])
    barres.set_stroke(WHITE, 3)
    dossard = Rectangle(width=0.3, height=0.18, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    dossard.move_to(P(0, 0.08))
    bras = VGroup(Line(P(-0.28, 0.62), P(-0.62, 1.25)), Line(P(0.28, 0.62), P(0.62, 1.25)))
    bras.set_stroke(PEAU, 9)
    jambes = VGroup(Line(P(-0.14, -0.15), P(-0.26, -0.95)), Line(P(0.14, -0.15), P(0.3, -0.95)))
    jambes.set_stroke(PEAU, 10)
    short = Polygon(P(-0.25, -0.12), P(0.25, -0.12), P(0.28, -0.42), P(-0.28, -0.42),
                    fill_color=BLACK, fill_opacity=1, stroke_color=WHITE, stroke_width=1)
    return VGroup(jambes, short, bras, corps, barres, dossard, tete)


def arche():
    """L'arche d'arrivée : deux poteaux, la banderole, la ligne au sol."""
    pot = VGroup(*[Rectangle(width=0.16, height=2.6, fill_color=JAUNE_TITRE, fill_opacity=1,
                             stroke_width=0).move_to(P(x, -0.4)) for x in (-1.75, 1.75)])
    band = Rectangle(width=3.66, height=0.5, fill_color=ROUGE_ERREUR, fill_opacity=0.9,
                     stroke_color=WHITE, stroke_width=2).move_to(P(0, 1.05))
    txt = Text("ARRIVÉE", font_size=30, weight=BOLD, color=WHITE).move_to(band)
    sol = Line(P(-2.1, -1.7), P(2.1, -1.7), color=GREY_B, stroke_width=2)
    ligne = Rectangle(width=3.5, height=0.08, fill_color=WHITE, fill_opacity=1,
                      stroke_width=0).move_to(P(0, -1.7))
    return VGroup(sol, pot, ligne, band, txt)


class ShortHugoDeckDiagonale6e(ShortDiagonale):
    nom_voix = "6e-duree-temps-short-hugo-deck-diagonale"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.35, run_time=0.25):
        """⛔ Pour insister : agrandir puis rétrécir (pas de zoom de caméra)."""
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def vider(self, garder):
        self.play(*[FadeOut(m) for m in self.mobjects if m not in garder], run_time=0.35)

    def chrono(self, font_size=60):
        """« 22:54:24 » sur un panneau de chronomètre, chaque morceau en couleur."""
        parts = VGroup(self.t("22", font_size, C_H), self.t(":", font_size),
                       self.t("54", font_size, C_MIN), self.t(":", font_size),
                       self.t("24", font_size, C_S)).arrange(RIGHT, buff=0.06)
        panneau = RoundedRectangle(corner_radius=0.12, width=parts.width + 0.5, height=parts.height + 0.4,
                                   fill_color=NUIT, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        panneau.move_to(parts)
        return VGroup(panneau, parts)

    def morceaux(self, font_size=34):
        return VGroup(self.t("22 h", font_size, C_H), self.t("54 min", font_size, C_MIN),
                      self.t("24 s", font_size, C_S)).arrange(RIGHT, buff=0.3)

    def entete(self):
        titre = VGroup(self.t("Grand Raid", 40, JAUNE_TITRE),
                       self.t("Diagonale des Fous 2026", 28, JAUNE_TITRE)).arrange(DOWN, buff=0.08)
        titre.move_to(P(0, 3.35))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.35))
        return titre, badge

    def ecran_fin_site(self, voix):
        """⛔ La fin du 19/10 : « Entraîne-toi sur éleveai point f r. Et abonne-toi ! »,
        écrite comme elle est dite (REGLES.md)."""
        self.clear()
        self.margo_bas()
        self.dire(voix)
        entraine = self.grand("Entraîne-toi sur", font_size=42, color=JAUNE_TITRE).move_to(P(0, 2.4))
        self.play(FadeIn(entraine, shift=DOWN * 0.12))
        site = self.grand("eleveai.fr", font_size=56, color=BLEU_CALCUL).move_to(P(0, 1.3))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.24, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre))
        self.au_mot("abonne-toi")
        abonne = self.grand("Abonne-toi !", font_size=44, color=VERT_OK).move_to(P(0, -0.1))
        poignee = self.grand("@eleveai974", font_size=46, color=VERT_OK).move_to(P(0, -1.05))
        cadre2 = SurroundingRectangle(poignee, color=VERT_OK, buff=0.22, stroke_width=3)
        self.play(FadeIn(abonne, shift=UP * 0.12))
        self.play(GrowFromCenter(poignee), Create(cadre2))
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.margo_bas()
        self._margo = list(self.mobjects)
        titre, badge = self.entete()

        # ── 00 : l'arrivée ──
        self.dire("00-arrivee")
        self.play(FadeIn(titre, shift=DOWN * 0.2), FadeIn(badge), run_time=0.6)
        a = arche().shift(DOWN * 0.15)
        self.play(FadeIn(a), run_time=0.5)
        c = coureur().scale(0.8)
        c.move_to(P(-3.2, -1.85), aligned_edge=DOWN)
        self.add(c)
        self.au_mot("Hugo Deck passe")
        self.play(c.animate.move_to(P(0, -1.85), aligned_edge=DOWN), run_time=1.2, rate_func=rate_functions.ease_out_cubic)
        nom = self.t("HUGO DECK", 54, WHITE).move_to(P(0, -2.35))
        self.play(GrowFromCenter(nom), Flash(c, color=JAUNE_TITRE, flash_radius=1.0, line_length=0.3), run_time=0.5)
        self.au_mot("il gagne")
        vainq = self.t("vainqueur !", 34, VERT_OK).move_to(P(0, 1.75))
        self.play(FadeIn(vainq, scale=1.3), run_time=0.4)
        self.au_mot("toute première")
        prem = self.t("sa 1re Diagonale", 32, JAUNE_TITRE).move_to(P(0, 1.75))
        self.play(ReplacementTransform(vainq, prem), run_time=0.4)
        self.insister(prem)
        self.attendre_voix(marge=0.2)

        # ── 01 : le chrono ──
        self.vider(self._margo + [titre, badge])
        self.dire("01-chrono")
        ch = self.chrono().move_to(P(0, 1.1))
        self.play(FadeIn(ch, scale=0.8), run_time=0.5)
        mor = self.morceaux().move_to(P(0, -0.1))
        for i, ex in enumerate(["22 heures", "54 minutes", "24 secondes"]):
            self.au_mot(ex)
            self.play(Indicate(ch[1][2 * i], color=WHITE, scale_factor=1.4),
                      FadeIn(mor[i], shift=DOWN * 0.15), run_time=0.45)
        self.au_mot("Sans dormir")
        dodo = self.t("sans dormir !", 36, ORANGE_RETENUE).move_to(P(0, -1.2))
        self.play(GrowFromCenter(dodo), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.dire("02-question")
        q = self.t("= ? secondes", 44, WHITE).move_to(P(0, -1.2))
        self.play(ReplacementTransform(dodo, q), run_time=0.45)
        self.au_mot("Tu paries")
        pari = self.t("Tu paries ?", 40, ORANGE_RETENUE).move_to(P(0, -2.2))
        self.play(GrowFromCenter(pari), run_time=0.4)
        self.insister(pari)
        self.attendre_voix(marge=0.2)

        # ── 03 : une heure = 3600 secondes ──
        self.vider(self._margo + [titre, badge])
        self.dire("03-une-heure")
        centre = P(0, 0.85)
        cadran = Circle(radius=0.75, color=WHITE, stroke_width=3).move_to(centre)
        traits = VGroup(*[Line(centre + 0.75 * np.array([np.sin(a), np.cos(a), 0]) * 0.86,
                               centre + 0.75 * np.array([np.sin(a), np.cos(a), 0]))
                          for a in np.linspace(0, TAU, 12, endpoint=False)]).set_stroke(WHITE, 2)
        aiguille = Line(centre, centre + UP * 0.65, color=C_S, stroke_width=4)
        self.play(Create(cadran), Create(traits), Create(aiguille), run_time=0.5)
        self.au_mot("Une minute")
        l1 = self.t("1 min = 60 s", 38, C_S).move_to(P(0, -0.35))
        self.play(Rotate(aiguille, -TAU, about_point=centre), FadeIn(l1, shift=UP * 0.15),
                  run_time=1.3, rate_func=linear)
        self.au_mot("Une heure")
        l2 = self.t("1 h = 60 min", 38, C_MIN).move_to(P(0, -1.0))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("60 fois 60")
        l3 = self.t("60 × 60", 40, WHITE).move_to(P(0, -1.75))
        self.play(Write(l3), run_time=0.5)
        self.au_mot("3600 secondes")
        l3b = self.t("1 h = 3600 s", 46, C_H).move_to(P(0, -1.75))
        self.play(ReplacementTransform(l3, l3b), run_time=0.45)
        self.insister(l3b)
        self.attendre_voix(marge=0.2)

        # ── 04 : 22 heures ──
        self.vider(self._margo + [titre, badge])
        self.dire("04-heures")
        ch = self.chrono(44).move_to(P(0, 1.45))
        self.play(FadeIn(ch), run_time=0.35)
        lh = self.t("22 × 3600 = 79 200 s", 32, C_H).move_to(P(0, 0.45))
        self.au_mot("22 fois 3600")
        self.play(Indicate(ch[1][0], color=C_H, scale_factor=1.4), Write(lh[:7]), run_time=0.6)
        self.au_mot("79 200")
        self.play(FadeIn(lh[7:], shift=LEFT * 0.15), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 05 : 54 minutes ──
        self.dire("05-minutes")
        lm = self.t("54 × 60 = 3240 s", 32, C_MIN).move_to(P(0, -0.25))
        self.au_mot("54 fois 60")
        self.play(Indicate(ch[1][2], color=C_MIN, scale_factor=1.4), Write(lm[:5]), run_time=0.6)
        self.au_mot("3240")
        self.play(FadeIn(lm[5:], shift=LEFT * 0.15), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 06 : on additionne (en colonnes) ──
        self.dire("06-total")
        ls = self.t("24 s", 32, C_S).move_to(P(0, -0.95))
        self.play(Indicate(ch[1][4], color=C_S, scale_factor=1.4), FadeIn(ls, shift=UP * 0.12), run_time=0.5)
        self.au_mot("79 200")
        droite = 1.25
        n1 = self.t("79 200", 38, C_H)
        n2 = self.t("3240", 38, C_MIN)
        n3 = self.t("24", 38, C_S)
        for n, y in ((n1, 0.5), (n2, -0.1), (n3, -0.7)):
            n.move_to(P(0, y)).align_to(P(droite, 0), RIGHT)
        plus = VGroup(self.t("+", 38), self.t("+", 38)).arrange(DOWN, buff=0.35).move_to(P(-1.1, -0.4))
        self.play(FadeOut(lh), FadeOut(lm), FadeOut(ls), FadeIn(n1, shift=DOWN * 0.1), run_time=0.45)
        self.au_mot("plus 3240")
        self.play(FadeIn(plus[0]), FadeIn(n2, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("plus 24")
        self.play(FadeIn(plus[1]), FadeIn(n3, shift=DOWN * 0.1), run_time=0.4)
        trait = Line(P(-1.35, -1.05), P(droite + 0.1, -1.05), color=WHITE, stroke_width=3)
        self.play(Create(trait), run_time=0.3)
        self.au_mot("82 464")
        tot = self.t("82 464", 46, VERT_OK).move_to(P(0, -1.5)).align_to(P(droite, 0), RIGHT)
        unite = self.t("s", 40, VERT_OK).next_to(tot, RIGHT, buff=0.12, aligned_edge=DOWN)
        res = VGroup(tot, unite)
        self.play(GrowFromCenter(res), run_time=0.45)
        self.insister(res, k=1.45)
        self.play(Circumscribe(res, color=VERT_OK), run_time=0.7)
        self.attendre_voix(marge=0.4)

        # ── 07 : ce que tu as appris ──
        self.vider(self._margo)
        self.dire("07-appris")
        h = self.t("Ce que tu as appris", 40, JAUNE_TITRE).move_to(P(0, 2.6))
        self.play(FadeIn(h, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("une heure")
        r1 = self.t("1 h = 3600 s", 46, C_H).move_to(P(0, 1.4))
        self.play(GrowFromCenter(r1), run_time=0.4)
        self.insister(r1)
        self.au_mot("On convertit")
        r2 = VGroup(self.t("On convertit", 36), self.t("chaque morceau,", 36)).arrange(DOWN, buff=0.12)
        r2.move_to(P(0, 0.05))
        self.play(FadeIn(r2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("puis on additionne")
        r3 = self.t("puis on additionne.", 36, VERT_OK).move_to(P(0, -1.1))
        self.play(FadeIn(r3, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

        # ── 08 : la question en commentaire ──
        self.vider(self._margo)
        self.ecran_question("08-question", ["En 2025, le vainqueur :", "23 h 31 min 54 s.",
                                            "Combien de secondes", "plus vite va Hugo Deck ?"])

        # ── 09 : la fin ──
        self.ecran_fin_site("09-abonne")
