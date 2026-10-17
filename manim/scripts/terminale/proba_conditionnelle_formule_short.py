# proba_conditionnelle_formule_short.py
# EleveAI — Maths Tle spé — short jumeau de la série « Probabilités »,
# épisode 2 : la formule et l'inversion. CEINTURE ORANGE. Il AMUSE : « ton test
# de la dengue est positif ; tu es malade à 95 % ? »
#   · en HAUT : le test, puis 1 000 personnes (20 malades en rouge, 980 sains) ;
#     les positifs s'ENTOURENT : 19 vrais (jaune), environ 39 faux (orange) ;
#   · en BAS, EN MÊME TEMPS : le tableau à double entrée du coach (canvas
#     « probabilites », variante « tableau ») se remplit case par case ;
#   · fin : la moitié des gens malades, la question, « Réponds en commentaire ! ».
# Les nombres 20, 980, 19, 39 se DÉDUISENT des pourcentages dits (2 %, 95 %, 4 %).
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/terminale-proba-formule-short.json (débit −6).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/proba_conditionnelle_formule_short.py ShortProbaFormuleTerminale -o eleveai-maths-terminale-proba-formule-short --media_dir manim/scripts/terminale/media
# Puis copier le mp4 dans manim/sorties/terminale/maths/probabilites/02-formule-et-inversion/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_conditionnelle_formule import P, cassette, ROUGE_MALADE, GRIS_SAIN  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

COLS, RANGS, PAS = 50, 20, 0.082
CENTRE_GRILLE = P(0, 0.75)
JAUNE_VRAI = JAUNE_TITRE
ORANGE_FAUX = ORANGE_RETENUE


def place(k):
    """La k-ième personne de la grille (rangée par rangée, de haut en bas)."""
    r, c = divmod(k, COLS)
    return CENTRE_GRILLE + P((c - (COLS - 1) / 2) * PAS, ((RANGS - 1) / 2 - r) * PAS)


# Les 20 malades, ÉPARPILLÉS (en bloc, leurs anneaux se chevauchaient : vu au
# brouillon du 17/10). Tirage fixe, et jamais deux voisins.
def _tirer_malades():
    rng, pris = np.random.default_rng(2026), []
    while len(pris) < 20:
        k = int(rng.integers(0, COLS * RANGS))
        r, c = divmod(k, COLS)
        if all(abs(r - r2) > 1 or abs(c - c2) > 1 for r2, c2 in (divmod(q, COLS) for q in pris)):
            pris.append(k)
    return set(pris)


MALADES = _tirer_malades()


def malade_k(k):
    return k in MALADES


class ShortProbaFormuleTerminale(Short6e):
    nom_voix = "terminale-proba-formule-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def grille(self):
        return VGroup(*[Dot(place(k), radius=0.03, color=GRIS_SAIN) for k in range(COLS * RANGS)])

    def anneau(self, k, couleur):
        return Circle(radius=0.058, color=couleur, stroke_width=2.6).move_to(place(k))

    # ── le tableau à double entrée (comme le canvas du coach) ───────────────

    XS = [-1.15, 0.325, 1.475]
    LARG = [1.8, 1.15, 1.15]
    YS = [-1.02, -1.45, -1.88]
    H = 0.43

    def case(self, i, j, fond="#111827"):
        r = Rectangle(width=self.LARG[j], height=self.H, stroke_color=GREY_C, stroke_width=2,
                      fill_color=fond, fill_opacity=1)
        return r.move_to(P(self.XS[j], self.YS[i]))

    def ecrire(self, i, j, texte, couleur=WHITE, fs=26):
        return self.t(texte, fs, couleur).move_to(P(self.XS[j], self.YS[i]))

    def tableau(self):
        cases = VGroup(*[self.case(i, j, "#1E293B" if i == 0 or j == 0 else "#0B1220")
                         for i in range(3) for j in range(3)])
        entetes = VGroup(self.ecrire(0, 1, "positif", JAUNE_TITRE, 22), self.ecrire(0, 2, "négatif", WHITE, 22),
                         self.ecrire(1, 0, "malades", ROUGE_MALADE, 24), self.ecrire(2, 0, "sains", GREY_A, 24))
        return cases, entetes

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Test positif ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        boite, trait_t = cassette(False)
        boite.scale(1.35).move_to(P(0, 0.85))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(boite, shift=DOWN * 0.3), run_time=0.8)
        self.au_mot("est positif")
        self.play(trait_t.animate.set_opacity(1), run_time=0.35)
        pos = self.t("positif !", 34, ROUGE_MALADE).next_to(boite, DOWN, buff=0.2)
        self.play(FadeIn(pos, scale=0.6), Wiggle(boite), run_time=0.6)
        self.au_mot("fiable à 95 %")
        fiable = self.t("fiable à 95 %", 34, VERT_OK).move_to(P(0, -0.8))
        self.play(FadeIn(fiable, shift=UP * 0.15), run_time=0.35)
        self.au_mot("Tu es malade")
        q = self.grand("malade à 95 % ?", font_size=46, color=ORANGE_RETENUE).move_to(P(0, -1.6))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : 1 000 personnes ──
        self.dire("01-image")
        non = self.grand("Non : ≈ 33 % !", font_size=46, color=VERT_OK).move_to(P(0, -0.45))
        gens = self.grille()
        self.play(FadeOut(VGroup(fiable, q, pos)), FadeOut(boite, scale=0.6), FadeIn(non, scale=0.6), run_time=0.45)
        self.play(Wiggle(non), LaggedStart(*[FadeIn(g) for g in gens], lag_ratio=0.0015), run_time=0.9)

        cases, entetes = self.tableau()
        self.au_mot("2 % des gens")
        malades = [k for k in range(COLS * RANGS) if malade_k(k)]
        self.play(*[gens[k].animate.set_color(ROUGE_MALADE).scale(1.3) for k in malades],
                  FadeIn(cases), FadeIn(entetes), run_time=0.5)
        # ⛔ « pas d'écart » (Frédéric, 17/10) : aucun effectif à l'écran, seuls
        # les pourcentages que la voix dit (2 %, 98 %).
        m2 = self.t("malades 2 %", 23, ROUGE_MALADE, largeur=self.LARG[0] - 0.1).move_to(entetes[2])
        self.play(Transform(entetes[2], m2), run_time=0.35)
        self.insister(entetes[2], 1.15)

        self.au_mot("sont malades")
        vrais = VGroup(*[self.anneau(k, JAUNE_VRAI) for k in malades[:19]])
        self.play(LaggedStart(*[Create(a) for a in vrais], lag_ratio=0.05),
                  cases[4].animate.set_fill(JAUNE_VRAI, 0.75), run_time=0.7)

        self.au_mot("Les faux positifs")
        rng = np.random.default_rng(974)
        sains = [k for k in range(COLS * RANGS) if not malade_k(k)]
        choisis = sorted(rng.choice(sains, size=39, replace=False))
        faux = VGroup(*[self.anneau(int(k), ORANGE_FAUX) for k in choisis])
        self.play(LaggedStart(*[Create(a) for a in faux], lag_ratio=0.04),
                  cases[7].animate.set_fill(ORANGE_FAUX, 0.75), run_time=1.3)
        self.au_mot("98 %")
        s98 = self.t("sains 98 %", 23, GREY_A, largeur=self.LARG[0] - 0.1).move_to(entetes[3])
        self.play(Transform(entetes[3], s98), run_time=0.35)

        self.au_mot("plus nombreux")
        col = SurroundingRectangle(VGroup(cases[1], cases[7]), color=JAUNE_TITRE, buff=0.02, stroke_width=4)
        self.play(Create(col), Indicate(faux, color=ORANGE_FAUX, scale_factor=1.6), run_time=0.6)
        self.play(Indicate(cases[7], color=ORANGE_FAUX, scale_factor=1.08), run_time=0.5)
        self.au_mot("que les vrais")
        self.play(Indicate(vrais, color=JAUNE_VRAI, scale_factor=1.6), run_time=0.5)
        self.play(Indicate(cases[4], color=JAUNE_VRAI, scale_factor=1.08), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        gens = self.grille()
        self.play(Write(toi), FadeIn(gens), run_time=0.5)
        self.au_mot("50 %")
        moitie = [k for k in range(COLS * RANGS) if k % COLS < COLS // 2]
        self.play(*[gens[k].animate.set_color(ROUGE_MALADE) for k in moitie], run_time=0.6)
        m50 = self.t("50 % de malades", 32, ROUGE_MALADE).move_to(P(0, -0.3))
        self.play(FadeIn(m50, shift=UP * 0.15), run_time=0.3)
        self.au_mot("un test positif")
        q2 = self.t("positif → malade à ? %", 32, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.insister(q2, 1.15)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.65))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.5))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
