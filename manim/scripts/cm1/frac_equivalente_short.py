# frac_equivalente_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 05 « Fractions égales »
# (micro fraction_equivalente). CEINTURE BLANCHE (règle du short blanc) : on
# VOIT que 1/2, 2/4 et 4/8 couvrent la même pizza, aucun calcul posé.
# Il AMUSE : « 3 assiettes : laquelle a le plus de pizza ? ». Marco, PIZZAÏOLO :
#   · EN HAUT : Marco, puis les 3 assiettes (1 demi, 2 quarts, 4 huitièmes) ;
#   · EN BAS, au même instant : la fraction de chaque assiette ; puis la
#     SURPRISE : les 3 pizzas posées l'une sur l'autre se recouvrent exactement,
#     et « 1/2 = 2/4 = 4/8 » s'écrit ;
#   · 1 question-pause (3 s) : 3 quarts = … huitièmes (6 ; leurres 3 : le
#     numérateur gardé, 7 : 3 + 4, ajouter au lieu de multiplier) ;
#   · commentaire : « une pizza en 12 parts : combien pour la moitié ? » (6).
# Vérifié (Python) : 1/2 = 2/4 = 4/8 ; 3/4 = 6/8 ; 12 ÷ 2 = 6.
# Aucune donnée réelle citée. Centres : cuisine, jeux-defis.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-equivalente-short.json (débit −10) ; marques :
# manim/scripts/cm1/frac_equivalente_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_equivalente_short.py FracEquivalenteShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_equivalente_short.py FracEquivalenteShortCM -o eleveai-maths-cm1-frac-equivalente-short --media_dir manim/scripts/cm1/media-frac-equivalente-short
# Sorties : manim/sorties/cm1/maths/fractions/05-equivalente/eleveai-maths-cm1-frac-equivalente-short.mp4
#           manim/sorties/cm2/maths/fractions/05-equivalente/eleveai-maths-cm2-frac-equivalente-short.mp4 (copie)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

PATE, SAUCE = "#fbbf24", "#dc2626"
XS = [-1.42, 0.0, 1.42]
YP = 0.95         # les assiettes
YF = -0.55        # leurs fractions


def pizzaiolo(s=0.42):
    p = personne(peau="#c68642", tenue="#f8fafc", cheveux="#111827", s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(VGroup(*[Circle(radius=r * 0.5, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(c + UP * r * 1.5 + RIGHT * x * r) for x in (-0.5, 0, 0.5)]),
          RoundedRectangle(width=r * 1.9, height=r * 0.45, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                           stroke_width=0).move_to(c + UP * r * 0.95))
    return p


def pizza(n, k, r=0.6, centre=ORIGIN, rondelles=True):
    """Une pizza (le disque du coach, parts prises couleur pâte) + des rondelles
    de chorizo sur les parts prises."""
    d = Disque(n, k, rayon=r, couleur=PATE, vide="#f1f5f9", carte=False, centre=centre)
    rond = VGroup()
    for i in range(k if rondelles else 0):
        a = PI / 2 - (i + 0.5) * TAU / n
        for t in ((0.55, 0.0),) if n > 4 else ((0.62, -0.18), (0.42, 0.22)):
            aa = a + t[1] * TAU / n
            rond.add(Circle(radius=r * (0.1 if n > 4 else 0.12), fill_color=SAUCE, fill_opacity=1, stroke_width=0)
                     .move_to(d.centre_disque() + t[0] * r * np.array([np.cos(aa), np.sin(aa), 0])))
    d.add(rond)
    d.rond = rond
    return d


def assiette(r=0.68, centre=ORIGIN):
    return VGroup(Circle(radius=r, fill_color="#e2e8f0", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3),
                  Circle(radius=r * 0.88, stroke_color="#cbd5e1", stroke_width=2)).move_to(centre)


class FracEquivalenteShortCM(ShortCM):
    nom_voix = "cm-frac-equivalente-short"
    fichier_marques = "frac_equivalente_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Quelle assiette ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Marco et ses 3 assiettes ──
        self.dire("00-accroche")
        marco = pizzaiolo(0.42).move_to(P(-1.3, 1.55))
        nm = self.bloc(["Marco,", "pizzaïolo"], 26, BLEU_CALCUL).next_to(marco, RIGHT, buff=0.25)
        self.au_mot("Marco")
        self.play(Write(titre), FadeIn(marco, shift=UP * 0.2), FadeIn(nm), run_time=0.6)
        ass = VGroup(*[assiette(centre=P(x, YP - 1.6)) for x in XS])
        self.au_nb("propose 3")
        self.play(LaggedStart(*[FadeIn(a, shift=UP * 0.2) for a in ass], lag_ratio=0.2), run_time=0.6)
        q = self.borne(self.t("Laquelle a le plus de pizza ?", 28, ORANGE_RETENUE)).move_to(P(0, -2.55))
        self.au_mot("Laquelle")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1 demi, 2 quarts, 4 huitièmes ──
        self.dire("01-trois")
        self.play(FadeOut(marco), FadeOut(nm), FadeOut(q), ass.animate.move_to(P(0, YP)), run_time=0.35)
        pz = [pizza(n, k, centre=P(x, YP)) for (n, k), x in zip([(2, 1), (4, 2), (8, 4)], XS)]
        frs = [EcritureFraction(k, n, fs=54).move_to(P(x, YF)) for (n, k), x in zip([(2, 1), (4, 2), (8, 4)], XS)]
        for p_, f_, mot in zip(pz, frs, ["1 demi", "2 quarts", "4 huitièmes"]):
            self.au_nb(mot)
            self.play(FadeIn(p_, scale=0.7), FadeIn(f_, scale=1.3), run_time=0.45)
        self.attendre_voix(marge=0.1)

        # ── 02 : la surprise : elles se recouvrent ──
        self.dire("02-surprise")
        self.au_mot("Surprise")
        sp = self.borne(self.t("Surprise !", 40, JAUNE_TITRE)).move_to(P(0, 1.95))
        self.play(FadeIn(sp, scale=1.4), run_time=0.35)
        self.au_mot("l'une sur l'autre")
        cible = P(0, -1.55)
        self.play(*[p_.animate.scale(1.6).move_to(cible) for p_ in pz], FadeOut(ass), run_time=1.2)
        ok = self.borne(self.t("c'est pareil !", 34, VERT_OK)).move_to(P(0, 1.4))
        self.au_mot("c'est pareil")
        self.play(FadeIn(ok, scale=1.3), Indicate(pz[2], color=VERT_OK, scale_factor=1.06), run_time=0.5)
        f1, f2, f3 = (EcritureFraction(k, n, fs=48) for n, k in [(2, 1), (4, 2), (8, 4)])
        ligne = VGroup(f1, self.inline("=", 44), f2, self.inline("=", 44), f3).arrange(RIGHT, buff=0.25)
        for m in (ligne[1], ligne[3]):
            m.set_y(f1.trait.get_y())
        ligne.move_to(P(0, 0.35))
        self.play(*[FadeOut(f_) for f_ in frs], run_time=0.25)
        au_fil(self, [(("1 demi", 1), [f1], []), (("2 quarts", 1), [ligne[1], f2], []),
                      (("4 huitièmes", 1), [ligne[3], f3], [])])
        self.insister(ligne, 1.12)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["3 quarts de pizza :", "combien de huitièmes ?"],
                            [self.inline("3", 30), self.inline("6", 30), self.inline("7", 30)], 1,
                            ["3 quarts = 6 huitièmes"])
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        d12 = pizza(12, 0, r=1.0, centre=P(0, -1.45))
        e = self.borne(self.bloc(["Pizza en 12 parts :", "combien pour la moitié ?"], 30), 0.5).move_to(P(0, 1.55))
        au_fil(self, [("en 12", [d12, e[0]], []), ("Combien de parts", [e[1]], [])])
        self.appel_commentaire(y=0.45)
