# denombrement_arrangement_combinaison_short.py
# EleveAI — Maths Tle spé — short « 52 cartes : un ordre unique » (9:16),
# ceinture BLANCHE. Paysage jumelle : denombrement_arrangement_combinaison.py.
#   · 00 : le jeu de 52 cartes qu'on mélange : cet ordre a-t-il déjà existé ?
#   · 01 : EN HAUT Hugo, magicien, et ses 3 cartes qui changent d'ordre ; EN BAS
#          l'arbre qui pousse (3, puis 2, puis 1) et ses 6 feuilles, EN MÊME
#          TEMPS : 3 × 2 × 1 = 6 = 3! ;
#   · 02 : question-pause « 4 cartes ? » (B : 24), compte à rebours de 3 s ;
#   · 03 : la surprise : 52! s'écrit chiffre après chiffre (68 chiffres),
#          ≈ 8 × 10⁶⁷ ; la Terre, l'horloge, le big bang : ton mélange est unique ;
#   · 04 : « 6 cartes, combien d'ordres ? » en commentaire ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# Code couleur de la paysage : bleu = l'ordre compte, vert = résultat juste.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-denombrement-arrangement-combinaison-short.json
# (débit −6), calée par denombrement_arrangement_combinaison_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/denombrement_arrangement_combinaison_short.py DenombrementArrangementCombinaisonShort -o eleveai-maths-terminale-denombrement-arrangement-combinaison-short --media_dir manim/scripts/terminale/media-denombrement-arrangement-combinaison-short
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-arrangement-combinaison/

import math
import os
import sys
from itertools import permutations
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from denombrement_arrangement_combinaison import ORDRE, personne, txt  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

F52 = str(math.factorial(52))
assert len(F52) == 68 and F52[0] == "8" and f"{math.factorial(52):.1e}" == "8.1e+67"
assert math.factorial(3) == 6 and math.factorial(4) == 24
assert 8e9 * 13.8e9 * 365.25 * 86400 < 1e-39 * math.factorial(52)  # « pas une infime partie »

LARGEUR_MAX = 3.8
FOND_CARTE = "#0b1220"
DOS = "#1D4ED8"


def carte(lettre, rouge=False, s=1.0):
    """Une carte à jouer : fond blanc, la lettre, une petite enseigne dessinée."""
    c = ROUGE_ERREUR if rouge else "#111827"
    fond = RoundedRectangle(width=0.62, height=0.88, corner_radius=0.07, fill_color=WHITE, fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2)
    l = txt(lettre, 30, c, audit=False, weight=BOLD).move_to(fond.get_center() + UP * 0.15)
    if rouge:
        ens = Square(0.16, fill_color=c, fill_opacity=1, stroke_width=0).rotate(PI / 4)
    else:
        ens = VGroup(*[Circle(radius=0.055, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(dx, dy))
                       for dx, dy in ((-0.06, 0), (0.06, 0), (0, 0.09))])
        ens.add(Triangle(fill_color=c, fill_opacity=1, stroke_width=0).scale(0.06).move_to(P(0, -0.08)))
    ens.move_to(fond.get_center() + DOWN * 0.22)
    return VGroup(fond, l, ens).scale(s)


def dos(s=1.0):
    fond = RoundedRectangle(width=0.62, height=0.88, corner_radius=0.07, fill_color=DOS, fill_opacity=1,
                            stroke_color=WHITE, stroke_width=2)
    motif = RoundedRectangle(width=0.44, height=0.7, corner_radius=0.05, stroke_color="#93C5FD", stroke_width=1.5)
    return VGroup(fond, motif).scale(s)


def chapeau(s=1.0):
    bord = Rectangle(width=0.9, height=0.08, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                     stroke_width=1)
    haut = Rectangle(width=0.55, height=0.5, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                     stroke_width=1).next_to(bord, UP, buff=0)
    ruban = Rectangle(width=0.55, height=0.08, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
    ruban.move_to(haut.get_bottom() + UP * 0.07)
    return VGroup(bord, haut, ruban).scale(s)


def terre(r=0.55):
    mer = Circle(radius=r, fill_color="#1D4ED8", fill_opacity=1, stroke_color="#93C5FD", stroke_width=2)
    cont = VGroup(Ellipse(width=r * 0.8, height=r * 0.55).move_to(P(-r * 0.3, r * 0.3)),
                  Ellipse(width=r * 0.5, height=r * 0.8).move_to(P(r * 0.35, -r * 0.2)),
                  Ellipse(width=r * 0.4, height=r * 0.3).move_to(P(-r * 0.35, -r * 0.45)))
    cont.set_fill("#16A34A", 1).set_stroke(width=0)
    return VGroup(mer, cont)


def horloge(r=0.4):
    c = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=3)
    tics = VGroup(*[Line(P(0, r * 0.8), P(0, r * 0.95), color=BLACK, stroke_width=2).rotate(k * TAU / 12,
                                                                                           about_point=ORIGIN)
                    for k in range(12)])
    h = Line(ORIGIN, P(0, r * 0.5), color=BLACK, stroke_width=4)
    m = Line(ORIGIN, P(r * 0.7, 0), color=ROUGE_ERREUR, stroke_width=3)
    return VGroup(c, tics, h, m)


class DenombrementArrangementCombinaisonShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "denombrement_arrangement_combinaison_short_marques.json"
    nom_voix = "terminale-denombrement-arrangement-combinaison-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX, audit=True):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        if not audit:
            t._pas_audit = True
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_nb(self, contexte, nb):
        i = self._texte_voix.find(contexte)
        assert i >= 0, contexte
        j = self._texte_voix.find(nb, i)
        assert j >= 0, (contexte, nb)
        self.au_pos(j)

    def au_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def carte_q(self, lettre, corps, largeur=3.4, fs=26):
        rond = Circle(radius=0.17, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.22)
        cadre = RoundedRectangle(width=largeur, height=0.46, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def fin_short(self, voix, a_effacer):
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = self.t("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.0))
        poignee = self.t("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -0.85))
        self.play(FadeOut(VGroup(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    # ── 00 : le jeu qu'on mélange ──────────────────────────────────────────

    def accroche(self):
        self.dire("00-accroche")
        paquet = VGroup(*[dos(0.9).move_to(P(0.02 * k, 1.5 + 0.02 * k)) for k in range(8)])
        self.au_mot("Mélange")
        self.play(FadeIn(paquet, shift=DOWN * 0.2), run_time=0.3)
        def battre():
            self.play(*[c.animate.shift(LEFT * 0.65 if k % 2 else RIGHT * 0.65) for k, c in enumerate(paquet)],
                      run_time=0.22)
            self.play(*[c.animate.shift(RIGHT * 0.65 if k % 2 else LEFT * 0.65) for k, c in enumerate(paquet)],
                      run_time=0.22)
        battre()
        self.au_mot("52 cartes")
        n52 = self.t("52 cartes", 44, BLEU_CALCUL).move_to(P(0, 0.05))
        self.play(FadeIn(n52, scale=1.3), run_time=0.35)
        battre()
        self.au_mot("ordre exact")
        faces = VGroup(*[carte(l, r, 0.72) for l, r in zip("7R2A9D4V", [1, 0, 1, 0, 0, 1, 0, 1])])
        faces.arrange(RIGHT, buff=0.04).move_to(P(0, 1.55))
        for k, f in enumerate(faces):
            f.rotate((3.5 - k) * 0.07).shift(DOWN * 0.012 * (k - 3.5) ** 2)
        self.play(*[ReplacementTransform(paquet[k], faces[k]) for k in range(8)], run_time=0.6)
        q = VGroup(self.t("Cet ordre exact", 32, ORANGE_RETENUE), self.t("a-t-il déjà existé,", 32, ORANGE_RETENUE),
                   self.t("une seule fois,", 32, ORANGE_RETENUE), self.t("dans toute l'histoire ?", 32, ORANGE_RETENUE))
        q.arrange(DOWN, buff=0.14).move_to(P(0, -1.35))
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("déjà")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("une seule")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans toute")
        self.play(FadeIn(q[3], shift=UP * 0.1), run_time=0.3)
        self.insister(q[3], 1.08)
        self.attendre_voix(marge=0.2)
        return VGroup(faces, n52, q)

    # ── 01 : Hugo, 3 cartes, l'arbre qui pousse ────────────────────────────

    def image(self):
        self.dire("01-image")
        hugo = personne("#7C3AED", s=0.55).move_to(P(-1.3, 1.55))
        ch = chapeau(0.5).next_to(hugo[1], UP, buff=-0.08)
        nom = self.t("Hugo", 28, BLEU_CALCUL).move_to(P(-1.3, 0.75))
        met = self.t("magicien", 22).move_to(P(-1.3, 0.45))
        self.au_mot("Hugo")
        self.play(FadeIn(hugo, shift=UP * 0.2), FadeIn(ch, shift=DOWN * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("magicien")
        self.play(FadeIn(met), Wiggle(ch), run_time=0.5)
        X = [0.05, 0.75, 1.45]
        dossiers = VGroup(*[dos(0.8).move_to(P(x, 1.55)) for x in X])
        faces = [carte("A", False, 0.8), carte("R", True, 0.8), carte("D", True, 0.8)]
        for f, x in zip(faces, X):
            f.move_to(P(x, 1.55))
        self.au_mot("3 cartes")
        self.play(LaggedStart(*[FadeIn(d, shift=LEFT * 0.4) for d in dossiers], lag_ratio=0.2), run_time=0.5)
        for k, mot in enumerate(("as", "roi", "dame")):
            self.au_mot(mot)
            self.play(ReplacementTransform(dossiers[k], faces[k]), run_time=0.3)
        # l'arbre, en bas
        perms = list(permutations(range(3)))
        y1 = {0: -0.4, 1: -1.25, 2: -2.1}
        xs = (-1.95, -1.2, -0.45, 0.3)
        racine = P(xs[0], -1.25)

        def yf(p):
            autres = [j for j in range(3) if j != p[0]]
            return y1[p[0]] + (0.22 if p[1] == autres[0] else -0.22)
        lv1 = VGroup(*[Line(racine, P(xs[1], y1[i]), color=BLEU_CALCUL, stroke_width=4) for i in range(3)])
        lv2 = VGroup(*[Line(P(xs[1], y1[p[0]]), P(xs[2], yf(p)), color=BLEU_CALCUL, stroke_width=3) for p in perms])
        lv3 = VGroup(*[Line(P(xs[2], yf(p)), P(xs[3], yf(p)), color=BLEU_CALCUL, stroke_width=3) for p in perms])
        noms = "ARD"
        feuilles = VGroup(*[self.t(" ".join(noms[i] for i in p), 22, audit=False).move_to(P(1.15, yf(p)))
                            for p in perms])
        cpt = [self.t("3", 34, BLEU_CALCUL), self.t("× 2", 34, BLEU_CALCUL), self.t("× 1", 34, BLEU_CALCUL),
               self.t("= 6", 34, VERT_OK), self.t("= 3!", 34, VERT_OK)]
        VGroup(*cpt).arrange(RIGHT, buff=0.13).scale_to_fit_width(3.4).move_to(P(0, -2.75))
        self.au_mot("3 choix")
        self.play(Create(lv1), FadeIn(cpt[0], scale=1.3), *[Indicate(f, color=JAUNE_TITRE) for f in faces],
                  run_time=0.5)
        self.au_mot("2 pour")
        self.play(Create(lv2), FadeIn(cpt[1], scale=1.3), run_time=0.5)
        self.au_mot("1 pour")
        self.play(Create(lv3), FadeIn(cpt[2], scale=1.3), run_time=0.5)
        self.au_mot("6 ordres")
        self.play(FadeIn(cpt[3], scale=1.3), run_time=0.25)
        for k, p in enumerate(perms):
            self.play(*[faces[c].animate.move_to(P(X[pos], 1.55)) for pos, c in enumerate(p)],
                      FadeIn(feuilles[k], scale=1.3), run_time=0.22)
        self.au_mot("3 factorielle")
        self.play(FadeIn(cpt[4], scale=1.4), feuilles.animate.set_color(VERT_OK), run_time=0.35)
        self.insister(VGroup(*cpt), 1.08)
        self.attendre_voix(marge=0.2)
        return VGroup(hugo, ch), VGroup(nom, met), faces, VGroup(lv1, lv2, lv3, feuilles, *cpt)

    # ── 02 : question-pause : 4 cartes ─────────────────────────────────────

    def question(self, hugo, legende, faces, arbre):
        self.dire("02-question")
        t0 = self.renderer.time
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 0.15))
        self.play(FadeOut(arbre), FadeOut(legende), FadeIn(tete, shift=DOWN * 0.15), run_time=0.4)
        X4 = [-0.25, 0.4, 1.05, 1.7]
        v = carte("V", False, 0.72).move_to(P(X4[3], 2.6))
        q1 = self.t("Et avec 4 cartes,", 28).move_to(P(0, -0.35))
        q2 = self.t("combien d'ordres ?", 28).move_to(P(0, -0.72))
        self.au_mot("4 cartes")
        self.play(*[f.animate.scale(0.9).move_to(P(X4[k], 1.55)) for k, f in enumerate(faces)], FadeIn(q1),
                  run_time=0.35)
        self.play(v.animate.move_to(P(X4[3], 1.55)), run_time=0.35)
        self.au_mot("combien")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        cartes = VGroup(*[self.carte_q(l, c) for l, c in zip("ABC", ["16", "24", "10"])])
        cartes.arrange(DOWN, buff=0.1).move_to(P(0, -1.78))
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, -2.8))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=1", flush=True)
        # la réponse
        self.dire("02b-reponse")
        b = cartes[1]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  cartes[0].animate.set_opacity(0.3), cartes[2].animate.set_opacity(0.3), FadeOut(pause),
                  FadeOut(rebours), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        f = [self.t(x, 34, BLEU_CALCUL) for x in ("4", "× 3", "× 2", "× 1")] + [self.t("= 24", 36, VERT_OK)]
        VGroup(*f).arrange(RIGHT, buff=0.12).move_to(P(0, -0.55))
        toutes = faces + [v]
        self.play(FadeOut(q1), FadeOut(q2), run_time=0.2)
        for k, (ctx, nb) in enumerate((("4 fois", "4"), ("3 fois", "3"), ("2 fois", "2"), ("fois 1", "1"))):
            self.au_nb(ctx, nb)
            self.play(FadeIn(f[k], shift=UP * 0.1), Indicate(toutes[k], color=JAUNE_TITRE, scale_factor=1.15),
                      run_time=0.25)
        self.au_mot("24")
        self.play(FadeIn(f[4], scale=1.4), run_time=0.3)
        self.au_mot("Chaque carte")
        ch = self.t("chaque carte ajoutée", 30, VERT_OK).move_to(P(0, -1.45))
        ch2 = self.t("multiplie tout !", 30, VERT_OK).move_to(P(0, -1.9))
        self.play(FadeOut(cartes), FadeOut(ok), FadeIn(ch, shift=UP * 0.1), run_time=0.3)
        self.au_mot("multiplie")
        self.play(FadeIn(ch2, scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.2)
        return VGroup(hugo, *toutes, tete, *f, ch, ch2)

    # ── 03 : la surprise : 52! chiffre après chiffre ───────────────────────

    def surprise(self, avant):
        self.dire("03-surprise")
        self.play(FadeOut(avant), run_time=0.3)
        self.au_mot("52 cartes")
        jeu = VGroup()
        for r in range(4):
            for c in range(13):
                fond = RoundedRectangle(width=0.25, height=0.35, corner_radius=0.03, fill_color=WHITE,
                                        fill_opacity=1, stroke_width=0)
                jeu.add(VGroup(fond, Dot(radius=0.045, color=ROUGE_ERREUR if r % 2 else BLACK).move_to(fond)))
        jeu.arrange_in_grid(rows=4, cols=13, buff=(0.04, 0.05)).move_to(P(0, 1.55))
        n52 = self.t("52 cartes", 30, BLEU_CALCUL).move_to(P(0, 0.5))
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in jeu], lag_ratio=0.01), FadeIn(n52), run_time=0.6)
        self.au_mot("52 factorielle")
        tete = self.t("52! =", 36, BLEU_CALCUL).move_to(P(-1.25, 0.05))
        lignes = VGroup(*[Text(F52[i:i + 17], font="Consolas", font_size=27, color=WHITE)
                          for i in range(0, 68, 17)]).arrange(DOWN, buff=0.12).move_to(P(0, -0.95))
        for l in lignes:
            l._pas_audit = True
        chiffres = [ch for l in lignes for ch in l]
        self.play(FadeIn(tete, scale=1.3), FadeOut(n52), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(ch, scale=1.6) for ch in chiffres], lag_ratio=0.25), run_time=1.5)
        self.au_mot("8 fois")
        ap = self.t("≈ 8 ×", 40, ORANGE_RETENUE)
        p = puissance("10", "67", 40, ORANGE_RETENUE)
        VGroup(ap, p).arrange(RIGHT, buff=0.15).move_to(P(0, -2.45))
        self.play(FadeIn(ap, shift=UP * 0.1), run_time=0.25)
        self.au_mot("10 puissance")
        self.play(FadeIn(p[0], shift=UP * 0.1), run_time=0.25)
        self.au_nb("puissance", "67")
        self.play(FadeIn(p[1], scale=1.6), run_time=0.3)
        self.au_mot("Un 8")
        huit = chiffres[0]
        self.play(huit.animate.set_color(JAUNE_TITRE).scale(1.8), run_time=0.3)
        self.play(huit.animate.scale(1 / 1.8), run_time=0.25)
        self.au_mot("67 chiffres")
        n67 = self.t("suivi de 67 chiffres", 26, ORANGE_RETENUE).move_to(P(0, -1.95))
        self.play(LaggedStart(*[Indicate(c, color=ORANGE_RETENUE, scale_factor=1.4) for c in chiffres[1:]],
                              lag_ratio=0.03), FadeIn(n67), run_time=1.0)
        # la Terre, l'horloge, le big bang
        self.au_mot("chaque humain")
        t = terre(0.42).move_to(P(-1.35, 1.65))
        gens = VGroup(*[personne(c, s=0.13).move_to(t.get_center() + 0.62 * P(math.cos(a), math.sin(a)))
                        for c, a in zip([BLEU_CALCUL, VERT_OK, "#F472B6", JAUNE_TITRE, VIOLET_ACCENT, ORANGE_RETENUE,
                                         BLEU_CALCUL, VERT_OK], np.linspace(0, TAU, 9)[:-1])])
        self.play(FadeOut(jeu), FadeIn(t, scale=0.5), LaggedStart(*[FadeIn(g, scale=0.3) for g in gens],
                                                                    lag_ratio=0.08), run_time=0.6)
        self.au_mot("par seconde")
        hor = horloge(0.38).move_to(P(0.15, 1.65))
        self.play(FadeIn(hor, scale=0.6), run_time=0.3)
        self.play(Rotate(hor[3], -TAU, about_point=hor[0].get_center()), run_time=0.6)
        self.au_mot("big bang")
        bang = Star(n=10, outer_radius=0.42, inner_radius=0.2, fill_color=JAUNE_TITRE, fill_opacity=1,
                    stroke_color=ORANGE_RETENUE, stroke_width=2).move_to(P(1.4, 1.75))
        lb = self.t("big bang", 20, JAUNE_TITRE).next_to(bang, DOWN, buff=0.08)
        self.play(GrowFromCenter(bang), FadeIn(lb), Flash(bang, color=JAUNE_TITRE, line_length=0.2), run_time=0.5)
        self.au_mot("infime")
        inf = self.t("pas même une infime partie", 24, ORANGE_RETENUE).move_to(P(0, 0.62))
        self.play(FadeIn(inf, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Ton mélange")
        haut = VGroup(t, gens, hor, bang, lb, inf)
        m1 = self.t("Ton mélange est", 32).move_to(P(0, 2.1))
        self.play(FadeOut(haut), FadeIn(m1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("presque")
        m2 = self.t("presque sûrement", 32).move_to(P(0, 1.55))
        self.play(FadeIn(m2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("unique")
        m3 = self.t("UNIQUE !", 52, VERT_OK).move_to(P(0, 0.85))
        self.play(GrowFromCenter(m3), Flash(m3, color=VERT_OK, line_length=0.3), run_time=0.45)
        self.attendre_voix(marge=0.3)
        return VGroup(m1, m2, m3, tete, n67, lignes, ap, p)

    # ── 04 : à toi : 6 cartes ──────────────────────────────────────────────

    def commentaire(self, avant):
        self.dire("04-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 2.15))
        self.play(FadeOut(avant), FadeIn(toi, scale=1.2), run_time=0.4)
        q1 = self.t("Combien d'ordres possibles", 30, ORANGE_RETENUE).move_to(P(0, -0.35))
        self.au_mot("combien")
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.35)
        six = VGroup(*[carte(l, r, 0.75) for l, r in zip(["A", "R", "D", "V", "9", "7"], [0, 1, 1, 0, 1, 0])])
        six.arrange(RIGHT, buff=0.06).move_to(P(0, 1.0))
        for k, c in enumerate(six):
            c.rotate((2.5 - k) * 0.08).shift(DOWN * 0.02 * (k - 2.5) ** 2)
        q2 = self.t("pour 6 cartes ?", 34, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.au_mot("6 cartes")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.3) for c in six], lag_ratio=0.1), FadeIn(q2, scale=1.2),
                  run_time=0.6)
        self.au_mot("Réponds")
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.7).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.5)
        return VGroup(toi, q1, six, q2, appel)

    def construct(self):
        self.margo_bas()
        titre = self.t("52 cartes, un ordre unique", 32, JAUNE_TITRE).move_to(P(0, 3.5))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(titre, badge)
        a = self.accroche()
        self.play(FadeOut(a), run_time=0.3)
        hugo, legende, faces, arbre = self.image()
        b = self.question(hugo, legende, faces, arbre)
        c = self.surprise(b)
        d = self.commentaire(c)
        self.fin_short("05-abonne", [titre, badge, d])
