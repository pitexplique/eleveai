# proba_va_somme_short.py
# EleveAI — Maths Tle spé — short « Additionner des dés » (9:16), ceinture
# BLANCHE. Paysage jumelle : proba_va_somme.py (micro va_somme).
#   · 00 : 1 dé qui roule (tout peut arriver, de 1 à 6), puis 100 dés ;
#   · 01 : Chloé, créatrice de jeux de société ; l'espérance d'un dé : 3,5 ;
#   · 02 : question-pause « espérance de la somme de 2 dés ? » (B : 7),
#          compte à rebours de 3 s ; la somme 7 est la plus fréquente ;
#   · 03 : LA SURPRISE : 100 dés roulent EN HAUT, EN BAS chaque total tombe
#          sur un axe de 100 à 600 : ils s'entassent tout près de 350 ;
#          σ ≈ 1,71 pour un dé, pas 171 pour le total : × √100 = × 10 → 17,1 ;
#   · 04 : « 10 dés : quelle espérance ? » réponds en commentaire ;
#   · 05 : « Entraîne-toi sur eleveai.fr ».
# Code couleur de la paysage : bleu = un dé (X), jaune = l'espérance, vert =
# résultat juste, rouge = piège.
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-proba-va-somme-short.json (débit −6), calée par
# proba_va_somme_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_va_somme_short.py ProbaVaSommeShort -o eleveai-maths-terminale-proba-va-somme-short --media_dir manim/scripts/terminale/media-va_somme-s
# Sortie : manim/sorties/terminale/maths/probabilites/va-somme/

import math
import os
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

# ── les valeurs dites par la voix, vérifiées ────────────────────────────────
SIGMA_DE = math.sqrt(35 / 12)
assert sum(range(1, 7)) / 6 == 3.5 and 3.5 + 3.5 == 7 and 100 * 3.5 == 350
assert f"{SIGMA_DE:.2f}" == "1.71" and f"{SIGMA_DE * 10:.1f}" == "17.1"
# la somme de 2 dés : 7 est la plus fréquente (6 chances sur 36)
FREQ2 = {s: sum(1 for a in range(1, 7) for b in range(1, 7) if a + b == s) for s in range(2, 13)}
assert max(FREQ2, key=FREQ2.get) == 7

LARGEUR_MAX = 4.0
FOND_CARTE = "#0b1220"
ESP = JAUNE_TITRE
COUL_X = BLEU_CALCUL
PIPS = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
        4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
        6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}


def de(v, c=0.6, fond=WHITE, point="#111827"):
    """Un dé vu de face : la face v en points (jamais un chiffre)."""
    carre = RoundedRectangle(width=c, height=c, corner_radius=c * 0.18, fill_color=fond, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=max(1.0, 3 * c))
    pts = VGroup(*[Dot(P(i * c * 0.27, j * c * 0.27), radius=c * 0.085, color=point) for i, j in PIPS[v]])
    return VGroup(carre, pts)


def grille_des(rng, n=100, cols=10, c=0.27, pas=0.33, centre=(0, 1.55)):
    """n dés tirés au hasard, en grille ; renvoie (grille, total)."""
    faces = [rng.randint(1, 6) for _ in range(n)]
    lignes = math.ceil(n / cols)
    g = VGroup()
    for k, v in enumerate(faces):
        i, j = divmod(k, cols)
        g.add(de(v, c).move_to(P(centre[0] + (j - (cols - 1) / 2) * pas, centre[1] + ((lignes - 1) / 2 - i) * pas)))
    return g, sum(faces)


def chloe(s=1.0):
    """Chloé : la tête, les cheveux attachés, le pull, un dé dans la main."""
    chignon = Circle(radius=0.16, fill_color="#3b2412", fill_opacity=1, stroke_width=0).move_to(P(0, 1.38))
    cheveux = Ellipse(width=0.7, height=0.62, fill_color="#3b2412", fill_opacity=1, stroke_width=0)
    cheveux.move_to(P(0, 1.06))
    tete = Circle(radius=0.27, fill_color="#e0ac69", fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    buste = RoundedRectangle(width=1.0, height=1.05, corner_radius=0.3, fill_color=VERT_OK, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    d = de(5, 0.36).move_to(P(0.6, 0.0))
    return VGroup(chignon, cheveux, buste, tete, d).scale(s)


class ProbaVaSommeShort(AuditSynchro, MotsCales, Short6e):
    fichier_marques = "proba_va_somme_short_marques.json"
    nom_voix = "terminale-proba-va-somme-short"
    identite = "Maths Tle spé — EleveAI"
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

    def carte(self, lettre, corps, largeur=3.4, fs=26):
        rond = Circle(radius=0.17, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.22)
        cadre = RoundedRectangle(width=largeur, height=0.46, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def histo_un_de(self, y0=-1.55, h=0.85):
        """La loi d'un dé : six barres égales, les faces 1 à 6 sous l'axe."""
        xs = [(v - 3.5) * 0.56 for v in range(1, 7)]
        axe = Line(P(-1.85, y0), P(1.85, y0), stroke_width=3, color=GREY_B)
        barres = VGroup(*[Rectangle(width=0.4, height=h, fill_color=COUL_X, fill_opacity=0.85, stroke_width=0)
                          .move_to(P(x, y0 + h / 2)) for x in xs])
        labs = VGroup(*[self.t(str(v), 26, GREY_A, audit=v in (1, 6)).move_to(P(x, y0 - 0.22))
                        for v, x in zip(range(1, 7), xs)])
        return axe, barres, labs

    def construct(self):
        self.margo_bas()
        titre = self.t("Additionner des dés", 36, JAUNE_TITRE).move_to(P(0, 3.5))
        badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.95))
        self.add(titre, badge)
        rng = random.Random(4)

        # ── 00 : 1 dé, puis 100 dés ──
        self.dire("00-accroche")
        self.au_mot("1 dé")
        gros = de(3, 1.0).move_to(P(0, 1.55))
        un = self.t("1 dé", 32, COUL_X).move_to(P(1.35, 1.55))
        self.play(FadeIn(gros, scale=0.5), FadeIn(un), run_time=0.3)
        for v, a in ((6, 0.35), (1, -0.3)):
            self.play(Transform(gros, de(v, 1.0).move_to(gros).rotate(a)), run_time=0.1)
        self.play(Transform(gros, de(5, 1.0).move_to(P(0, 1.55))), run_time=0.1)
        axe, barres, labs = self.histo_un_de()
        self.au_mot("tout peut arriver")
        tout = self.t("tout peut arriver", 30, ORANGE_RETENUE).move_to(P(0, 0.25))
        self.play(Create(axe), LaggedStart(*[GrowFromEdge(b, DOWN) for b in barres], lag_ratio=0.1),
                  FadeIn(tout, shift=UP * 0.1), run_time=0.6)
        self.au_mot("1 à")
        self.play(FadeIn(labs[0], scale=1.4), FadeIn(labs[1:5]), run_time=0.25)
        self.au_nb("1 à", "6")
        self.play(FadeIn(labs[5], scale=1.4), run_time=0.25)
        self.au_mot("100 dés")
        grille, _ = grille_des(rng, 100, 20, 0.17, 0.2, (0, 1.55))
        cent = self.t("100 dés", 30, COUL_X).move_to(P(0, 0.75))
        self.play(FadeOut(gros), FadeOut(un), LaggedStart(*[FadeIn(d, scale=0.4) for d in grille], lag_ratio=0.004),
                  FadeIn(cent), run_time=0.7)
        self.au_mot("additionne")
        add = self.t("et additionne", 30).move_to(P(0, 0.25))
        self.play(FadeOut(tout), FadeIn(add, shift=UP * 0.1), run_time=0.3)
        self.au_mot("prédire le total")
        pt = self.t("tu peux prédire le total ?", 28, ESP).move_to(P(0, -2.25))
        self.play(FadeIn(pt, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Vraiment")
        vr = self.t("Vraiment ?", 40, ORANGE_RETENUE).move_to(P(0, -2.75))
        self.play(FadeIn(vr, scale=1.3), run_time=0.35)
        self.insister(vr, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 01 : Chloé ; l'espérance d'un dé : 3,5 ──
        self.dire("01-image")
        ch = chloe(0.85).move_to(P(-1.25, 1.55))
        nom = self.t("Chloé", 34, VERT_OK).move_to(P(0.75, 2.0))
        self.au_mot("Chloé")
        self.play(FadeOut(grille), FadeOut(cent), FadeOut(add), FadeOut(pt), FadeOut(vr), FadeIn(ch, shift=UP * 0.15),
                  FadeIn(nom, shift=LEFT * 0.1), run_time=0.45)
        self.au_mot("créatrice")
        m1 = self.t("créatrice de", 26).move_to(P(0.75, 1.45))
        m2 = self.t("jeux de société", 26).move_to(P(0.75, 1.1))
        self.play(FadeIn(m1, shift=UP * 0.1), FadeIn(m2, shift=UP * 0.1), Wiggle(ch[4]), run_time=0.6)
        self.au_mot("l'espérance")
        e1 = self.t("Un dé : E =", 32, ESP)
        e2 = self.t("3,5", 36, ESP)
        ee = VGroup(e1, e2).arrange(RIGHT, buff=0.15).move_to(P(0, 0.25))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("3,5")
        y0 = -1.55
        mil = DashedLine(P(0, y0), P(0, y0 + 1.15), color=ESP, stroke_width=4)
        m35 = self.t("3,5", 26, ESP).next_to(mil, UP, buff=0.05)
        self.play(FadeIn(e2, scale=1.4), Create(mil), FadeIn(m35), run_time=0.4)
        self.insister(e2, 1.3)
        self.au_mot("les espérances")
        s1 = self.t("Pour une somme de dés,", 26).move_to(P(0, -2.3))
        s2 = self.t("les espérances s'additionnent", 28, ESP).move_to(P(0, -2.7))
        self.play(FadeIn(s1, shift=UP * 0.1), FadeIn(s2, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : question-pause : la somme de 2 dés ──
        self.dire("02-question")
        t0 = self.renderer.time
        self.au_mot("Question")
        tete = VGroup(pastille_pause(0.3), self.t("Question !", 32, ORANGE_RETENUE)).arrange(RIGHT, buff=0.18)
        rebours = CompteARebours(3, r=0.24, fs=26)
        VGroup(tete, rebours).arrange(RIGHT, buff=0.35).move_to(P(0, 0.25))
        self.play(FadeOut(VGroup(ch, nom, m1, m2, ee, mil, m35, s1, s2, axe, barres, labs)),
                  FadeIn(tete, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("2 dés")
        d1 = de(4, 0.9).move_to(P(-0.75, 1.55)).rotate(0.2)
        d2 = de(2, 0.9).move_to(P(0.75, 1.55)).rotate(-0.15)
        q1 = self.t("L'espérance de la somme", 26).move_to(P(0, -0.16))
        q2 = self.t("de 2 dés ?", 26).move_to(P(0, -0.5))
        self.play(FadeIn(q1, shift=UP * 0.1), FadeIn(q2, shift=UP * 0.1), FadeIn(d1, shift=RIGHT * 0.5),
                  FadeIn(d2, shift=LEFT * 0.5), run_time=0.45)
        cartes = VGroup(*[self.carte(l, c) for l, c in zip("ABC", ["3,5", "7", "12"])])
        cartes.arrange(DOWN, buff=0.1).move_to(P(0, -1.52))
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.1), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.1), run_time=0.2)
        pause = self.t("Mets pause, et choisis !", 26, ORANGE_RETENUE).move_to(P(0, -2.6))
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.35)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        print(f"QUESTION 02-question t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse=1", flush=True)

        # ── 02b : la réponse : 7, la somme la plus fréquente ──
        self.dire("02b-reponse")
        b = cartes[1]
        self.play(b[0].animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK),
                  cartes[0].animate.set_opacity(0.3), cartes[2].animate.set_opacity(0.3), FadeOut(pause),
                  FadeOut(rebours), run_time=0.25)
        ok = self.coche(VERT_OK, 0.16).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        self.au_mot("3,5")
        r1 = self.t("3,5 +", 32, ESP)
        r1b = self.t("3,5", 32, ESP)
        r2 = self.t("= 7", 34, VERT_OK)
        rr = VGroup(r1, r1b, r2).arrange(RIGHT, buff=0.15).move_to(P(0, -0.33))
        self.play(FadeOut(q1), FadeOut(q2), FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_nb("plus", "3,5")
        self.play(FadeIn(r1b, shift=UP * 0.1), run_time=0.25)
        self.au_nb("plus 3,5", "7")
        self.play(FadeIn(r2, scale=1.4), run_time=0.3)
        self.au_mot("Et 7")
        yb, kh = 0.85, 0.2
        base2 = Line(P(-1.95, yb), P(1.95, yb), stroke_width=3, color=GREY_B)
        barres2 = VGroup(*[Rectangle(width=0.27, height=FREQ2[s] * kh, stroke_width=0,
                                     fill_color=VERT_OK if s == 7 else COUL_X, fill_opacity=0.9)
                           .move_to(P((s - 7) * 0.33, yb + FREQ2[s] * kh / 2)) for s in range(2, 13)])
        l7 = self.t("7", 28, VERT_OK).next_to(barres2[5], UP, buff=0.06)
        self.play(FadeOut(d1), FadeOut(d2), Create(base2), LaggedStart(*[GrowFromEdge(x, DOWN) for x in barres2],
                                                                      lag_ratio=0.06), FadeIn(l7), run_time=0.7)
        self.au_mot("la plus fréquente")
        fr = self.t("la somme la plus fréquente", 26, VERT_OK).move_to(P(0, 0.25))
        self.play(FadeOut(tete), FadeIn(fr, shift=UP * 0.1), Indicate(barres2[5], color=VERT_OK), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 03 : la surprise : 100 dés, le total tout près de 350 ──
        self.dire("03-surprise")
        self.au_mot("100 dés")
        grille, _ = grille_des(rng, 100, 20, 0.17, 0.2, (0, 1.55))
        self.play(FadeOut(VGroup(base2, barres2, l7, fr, rr, cartes, ok)),
                  LaggedStart(*[FadeIn(d, scale=0.4) for d in grille], lag_ratio=0.004), run_time=0.7)
        self.remove(*grille)
        self.add(grille)
        fs = 30
        self.au_nb("Espérance", "100")
        e1 = VGroup(self.t("E = 100 ×", fs, ESP), self.t("3,5", fs, ESP), self.t("= 350", fs + 4, VERT_OK))
        e1.arrange(RIGHT, buff=0.12).scale_to_fit_width(3.8).move_to(P(0, 0.3))
        self.play(FadeIn(e1[0], shift=UP * 0.1), run_time=0.25)
        self.au_nb("100 fois", "3,5")
        self.play(FadeIn(e1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("350")
        self.play(FadeIn(e1[2], scale=1.4), run_time=0.3)
        self.au_mot("L'écart-type")
        s1 = VGroup(self.t("un dé : σ ≈", fs, COUL_X), self.t("1,71", fs + 2, COUL_X)).arrange(RIGHT, buff=0.12)
        s1.scale_to_fit_width(min(s1.width, 3.8)).move_to(P(0, -0.3))
        self.play(FadeIn(s1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,71")
        self.play(FadeIn(s1[1], scale=1.3), run_time=0.3)
        self.au_mot("Celui du total")
        s2 = VGroup(self.t("total : σ =", fs), self.t("pas 171 !", fs + 2, ROUGE_ERREUR)).arrange(RIGHT, buff=0.12)
        s2.scale_to_fit_width(min(s2.width, 3.8)).move_to(P(0, -0.9))
        self.play(FadeIn(s2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("171")
        self.play(FadeIn(s2[1], scale=1.4), run_time=0.3)
        self.play(Wiggle(s2[1]), run_time=0.5)
        self.au_nb("racine de", "100")
        s3 = VGroup(self.t("× √100", fs, VERT_OK), self.t("= × 10", fs, VERT_OK)).arrange(RIGHT, buff=0.15)
        s3.move_to(P(0, -1.5))
        self.play(FadeIn(s3[0], shift=UP * 0.1), run_time=0.3)
        self.au_nb(", soit 10", "10")
        self.play(FadeIn(s3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("17,1")
        s4 = self.t("σ ≈ 17,1", fs + 10, VERT_OK).move_to(P(0, -2.2))
        self.play(FadeIn(s4, scale=1.5), run_time=0.35)
        self.insister(s4, 1.2)
        # l'axe des totals, de 100 à 600
        self.au_mot("Le total peut")
        ya = -1.75

        def X(v):
            return -1.95 + (v - 100) * 3.9 / 500
        axe2 = Line(P(X(100), ya), P(X(600), ya), stroke_width=3, color=GREY_B)
        rappel = self.t("σ ≈ 17,1", 28, VERT_OK, audit=False).move_to(P(0, -0.2))
        self.play(FadeOut(VGroup(s1, s2, s3)), ReplacementTransform(s4, rappel), Create(axe2), run_time=0.45)
        self.au_mot("100 à")
        g100 = self.t("100", 24, GREY_A).move_to(P(X(100) + 0.15, ya - 0.22))
        self.play(FadeIn(g100, scale=1.3), run_time=0.2)
        self.au_mot("600")
        g600 = self.t("600", 24, GREY_A).move_to(P(X(600) - 0.2, ya - 0.22))
        self.play(FadeIn(g600, scale=1.3), run_time=0.2)
        piles, points = {}, VGroup()

        def lancer(n, k=3):
            """n images : 100 dés roulent EN HAUT ; EN BAS, k totaux tombent sur l'axe."""
            nonlocal grille
            for _ in range(n):
                nv, tot = grille_des(rng, 100, 20, 0.17, 0.2, (0, 1.55))
                self.remove(grille)
                grille = nv
                self.add(grille)
                tots = [tot] + [sum(rng.randint(1, 6) for _ in range(100)) for _ in range(k - 1)]
                ds = VGroup()
                for tt in tots:
                    b = round(tt / 8) * 8
                    h = piles.get(b, 0)
                    piles[b] = h + 1
                    ds.add(Dot(P(X(b), ya + 0.05 + h * 0.06), radius=0.036, color=ESP))
                points.add(*ds)
                self.play(*[FadeIn(d, shift=DOWN * 0.5) for d in ds], run_time=0.2)
        lancer(11)
        self.au_mot("près de 350")
        self.au_nb("près de", "350")
        g350 = self.t("350", 26, ESP).move_to(P(X(350), ya - 0.22))
        pres = self.t("tout près de 350", 28, ESP).move_to(P(0, -2.65))
        self.play(FadeIn(g350, scale=1.4), FadeIn(pres, shift=UP * 0.1), run_time=0.3)
        self.insister(points, 1.15)
        lancer(5)
        self.au_mot("Chloé")
        jeux = self.t("Chloé s'en sert pour équilibrer ses jeux", 24, VERT_OK).move_to(P(0, 0.3))
        self.play(FadeOut(e1), FadeIn(jeux, shift=UP * 0.1), run_time=0.3)
        lancer(6)
        self.attendre_voix(marge=0.3)

        # ── 04 : à toi : 10 dés ──
        self.dire("04-commentaire")
        self.au_mot("À toi")
        toi = self.t("À toi !", 40, JAUNE_TITRE).move_to(P(0, 0.3))
        self.play(FadeOut(VGroup(grille, points, axe2, g100, g600, g350, pres, jeux, rappel)), FadeIn(toi, scale=1.2),
                  run_time=0.4)
        self.au_mot("10 dés")
        dix = VGroup(*[de(rng.randint(1, 6), 0.55) for _ in range(10)]).arrange_in_grid(2, 5, buff=0.18)
        dix.move_to(P(0, 1.55))
        l10 = self.t("Tu lances 10 dés.", 30).move_to(P(0, -0.45))
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.3) for d in dix], lag_ratio=0.06), FadeIn(l10), run_time=0.6)
        self.au_mot("l'espérance")
        q = VGroup(self.t("Quelle est l'espérance", 30, ORANGE_RETENUE), self.t("de leur somme ?", 30, ORANGE_RETENUE))
        q.arrange(DOWN, buff=0.1).move_to(P(0, -1.3))
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 30, VERT_OK, largeur=3.7).move_to(P(0, -2.4))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne", [titre, badge, toi, dix, l10, q, appel])

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
