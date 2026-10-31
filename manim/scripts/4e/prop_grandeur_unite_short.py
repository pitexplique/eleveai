# prop_grandeur_unite_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 16 « Lire une unité
# composée » (micro grandeur_unite_composee, notion grandeur_composee).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md). Il AMUSE : en 1 seconde,
# la lumière fait 7 tours et demi de la Terre !
#   · EN HAUT, l'image : la Terre, et la lumière (un point jaune) qui en fait
#     le tour ; en 1 s, 7 tours et demi (le point finit de l'AUTRE côté) ;
#   · EN BAS, au même instant : ≈ 300 000 km/s (la barre ambre se lit
#     « par » = « pour 1 ») ; 300 000 ÷ 40 000 = 7,5 ;
#   · 1 question-pause (3 s) : 300 000 km/s veut dire… A 300 000 km en 1 s ;
#     leurres : 300 000 s pour 1 km (unité inversée), 300 000 km en tout ;
#   · fin : la Lune est à environ 384 000 km : combien de secondes met sa
#     lumière ? (384 000 ÷ 300 000 = 1,28 ≈ 1,3 s) en commentaire.
# Chiffres réels : c = 299 792,458 km/s (BIPM, définition du mètre) ≈ 300 000
# km/s ; tour de la Terre ≈ 40 000 km (40 075 km à l'équateur) ; Terre-Lune
# 384 400 km en moyenne (NASA) ≈ 384 000 km (relevés le 31/10/2026).
# Centres d'intérêt : espace, sciences.
#
# Voix : manim/voix/4e-prop-grandeur-unite-short.json (validée, débit −10) ;
# WAV : public/sons/4e-prop-grandeur-unite-short/ ; marques :
# manim/scripts/4e/prop_grandeur_unite_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_grandeur_unite_short.py PropGrandeurUniteShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_grandeur_unite_short.py PropGrandeurUniteShort4e -o eleveai-maths-4e-prop-grandeur-unite-short --media_dir manim/media-prop-4e-16
# Sortie : manim/sorties/4e/maths/proportionnalite/16-grandeur-unite/eleveai-maths-4e-prop-grandeur-unite-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras  # noqa: E402
from prop_grandeur_unite import BARRE_C, UNITE_C, unite_barre  # noqa: E402

JAUNE_L = "#fde047"   # la lumière
ARDOISE_S = "#94a3b8"


def terre(r=0.8):
    """La Terre : océan bleu, continents verts, un nuage."""
    mer = Circle(radius=r, fill_color="#2563eb", fill_opacity=1, stroke_color="#93c5fd", stroke_width=3)
    terres = VGroup(
        Ellipse(width=0.55 * r, height=0.8 * r, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(
            P(-0.3 * r, 0.2 * r)).rotate(0.4),
        Ellipse(width=0.45 * r, height=0.35 * r, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(
            P(0.38 * r, -0.3 * r)),
        Ellipse(width=0.3 * r, height=0.5 * r, fill_color="#22c55e", fill_opacity=1, stroke_width=0).move_to(
            P(0.35 * r, 0.42 * r)))
    nuage = Ellipse(width=0.5 * r, height=0.16 * r, fill_color=WHITE, fill_opacity=0.85, stroke_width=0).move_to(
        P(-0.1 * r, -0.55 * r))
    return VGroup(mer, terres, nuage)


def lune(r=0.18):
    return VGroup(Circle(radius=r, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0),
                  Circle(radius=r * 0.25, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(
                      P(-r * 0.3, r * 0.25)),
                  Circle(radius=r * 0.18, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(
                      P(r * 0.35, -r * 0.3)))


def photon():
    """La lumière : un point jaune et son halo."""
    return VGroup(Dot(radius=0.2, color=JAUNE_L, fill_opacity=0.3), Dot(radius=0.09, color=JAUNE_L))


class PropGrandeurUniteShort4e(ShortProp):
    nom_voix = "4e-prop-grandeur-unite-short"
    fichier_marques = "prop_grandeur_unite_short_marques.json"
    ceinture = "blanche"
    C = P(0, 0.9)    # le centre de la Terre
    R = 0.75         # son rayon
    RO = 1.0         # le rayon du tour de la lumière

    def question_pause(self, *a, **k):
        """Les choix, audités quand ils entrent, ne le sont plus pendant la
        réponse (la carte juste s'agrandit)."""
        avant = k.pop("autres_q", None)

        def figer(sc):
            for c in sc.cartes_q:
                for f in c.get_family():
                    if isinstance(f, Text):
                        f._pas_audit = True
            if avant:
                avant(sc)
        return super().question_pause(*a, autres_q=figer, **k)

    def mots(self, lg, mots, avec=None):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=0.3)

    def tours(self, ph, n, run_time):
        """La lumière fait n tours de la Terre (sens trigonométrique)."""
        self.play(Rotate(ph, angle=n * TAU, about_point=self.C, rate_func=linear), run_time=run_time)

    def _rep_q(self, sc):
        sc.au_mot("Par")
        sc.rep(0)
        sc.au_mot("300 000 km")
        sc.rep(1, avec=[Indicate(sc.cartes_q[0], color=VERT_OK, scale_factor=1.04)])
        sc.rep_fin()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Vitesse de la lumière", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        T = terre(self.R).move_to(self.C)
        ph = photon().move_to(self.C + RIGHT * self.RO)
        garder = [margo, titre, badge, T]

        # ── 00 : l'accroche : le tour de la Terre en une seconde ? ──
        self.dire("00-accroche")
        q = VGroup(self.t("Le tour de la Terre", 34), self.t("en une seconde ?", 34, AMBRE)).arrange(DOWN, buff=0.12)
        self.borne(q, 0.8).move_to(P(0, -0.75))
        self.au_mot("Peux-tu")
        self.play(Write(titre), run_time=0.5)
        self.au_mot("tour de la Terre")
        self.play(GrowFromCenter(T), FadeIn(q[0], shift=UP * 0.12), run_time=0.5)
        self.au_mot("en une")
        self.play(FadeIn(q[1], scale=1.15), run_time=0.35)
        oui = self.borne(gras("La lumière : oui !", 38, JAUNE_L), 0.6).move_to(P(0, -1.75))
        self.au_mot("La lumière")
        self.play(FadeIn(ph, scale=2), FadeIn(oui, scale=1.2), run_time=0.4)
        self.tours(ph, 2, 0.9)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(q), FadeOut(oui), run_time=0.3)

        # ── 01 : environ 300 000 km/s ──
        self.dire("01-lumiere")
        v = VGroup(gras("≈ 300 000", 44, WHITE), unite_barre("km", "s", fs=44)).arrange(RIGHT, buff=0.2)
        self.borne(v, 0.8).move_to(P(0, -0.75))
        self.au_mot("La lumière")
        self.play(Flash(ph, color=JAUNE_L, line_length=0.2), run_time=0.5)
        self.au_mot("300 000")
        self.play(FadeIn(v[0], scale=1.2), FadeIn(v[1].avant, shift=UP * 0.1), run_time=0.4)
        self.au_mot("par seconde")
        self.play(FadeIn(v[1].barre, scale=1.4), run_time=0.3)
        self.au_mot("seconde")
        self.play(FadeIn(v[1].apres, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : kilomètres PAR seconde = 300 000 km POUR 1 seconde ──
        self.dire("02-lire")
        self.au_mot("Kilomètres")
        self.play(Indicate(v[1].avant, color=UNITE_C), run_time=0.5)
        L = self.ligne([("« / » = « par »", BARRE_C)], 32).move_to(P(0, -1.45))
        L[0].sans_synchro = True
        self.au_mot("par")
        self.play(Circumscribe(v[1].barre, color=BARRE_C, buff=0.06), FadeIn(L, shift=UP * 0.12), run_time=0.6)
        L2 = self.borne(self.ligne([("300 000 km", WHITE), ("pour 1 s", BARRE_C)], 34), 0.8).move_to(P(0, -2.05))
        self.mots(L2, ["300 000 km", "pour 1"])
        self.insister(L2[1], 1.2)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(v, L, L2)), run_time=0.3)

        # ── 03 : 300 000 ÷ 40 000 = 7,5 tours en 1 seconde ──
        self.dire("03-tours")
        eq = Circle(radius=self.RO, color=VERT_OK, stroke_width=5).move_to(self.C)
        L0 = self.ligne([("Tour de la Terre :", WHITE), ("40 000 km", VERT_OK)], 30).move_to(P(0, -0.5))
        self.au_mot("Le tour")
        self.play(FadeIn(L0[0], shift=UP * 0.12), run_time=0.3)
        self.au_mot("40 000")
        self.play(FadeIn(L0[1], scale=1.2), Create(eq), run_time=0.6)
        L1 = self.ligne([("300 000 ÷", WHITE), ("40 000", WHITE), ("=", WHITE), ("7,5", AMBRE)], 36)
        self.borne(L1, 0.8).move_to(P(0, -1.15))
        self.mots(L1, ["300 000", ("40 000", 2), "égale", "7,5"])
        self.insister(L1[3], 1.3)
        L3 = self.ligne([("En 1 s :", WHITE), ("7 tours et demi !", VERT_OK)], 32)
        self.borne(L3, 0.8).move_to(P(0, -1.85))
        self.au_mot("En 1 seconde")
        self.play(FadeIn(L3[0], shift=UP * 0.12), run_time=0.3)
        self.au_mot("la lumière fait")
        self.play(FadeOut(eq), run_time=0.1)
        trace = Circle(radius=self.RO, color=JAUNE_L, stroke_width=4).move_to(self.C)
        self.play(Rotate(ph, angle=7.5 * TAU, about_point=self.C, rate_func=linear), Create(trace, rate_func=linear),
                  run_time=1.0)
        self.au_mot("7 tours")
        self.play(FadeIn(L3[1], scale=1.2), Flash(ph, color=JAUNE_L, line_length=0.2), run_time=0.45)
        self.insister(L3[1], 1.1)
        self.attendre_voix(marge=0.2)
        self.vider(garder + [ph])
        self.play(FadeOut(T), FadeOut(ph), run_time=0.3)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse",
                            ["300 000 km/s,", "ça veut dire…"],
                            [self.t("300 000 km en 1 s", 25), self.t("300 000 s pour 1 km", 25),
                             self.t("300 000 km en tout", 25)], 0,
                            ["« Par » veut dire « pour 1 » :", "300 000 km en 1 s."], mot_q="300 000",
                            autres_r=self._rep_q)
        self.vider([margo, titre, badge])

        # ── 05 : la question en commentaire : la lumière de la Lune ──
        self.dire("05-commentaire")
        T2 = terre(0.45).move_to(P(-1.45, 1.0))
        Lu = lune(0.2).move_to(P(1.6, 1.0))
        self.au_mot("Et toi")
        self.play(FadeIn(T2, scale=0.7), run_time=0.4)
        trait = DashedLine(Lu.get_left() + LEFT * 0.08, T2.get_right() + RIGHT * 0.08, color=ARDOISE_S,
                           stroke_width=3)
        self.au_mot("La Lune")
        self.play(FadeIn(Lu, scale=0.7), Create(trait), run_time=0.5)
        d = gras("384 000 km", 30, WHITE).move_to(P(0.15, 0.2))  # sous le trait, à l'écart de la Terre
        self.au_mot("384 000")
        self.play(FadeIn(d, scale=1.2), run_time=0.4)
        Q1 = self.borne(self.ligne([("Combien de", WHITE), ("secondes ?", AMBRE)], 34), 0.8).move_to(P(0, -0.45))
        self.mots(Q1, ["Combien", "secondes"])
        rayon = photon().scale(0.7).move_to(Lu.get_left())
        Q2 = self.borne(self.ligne([("sa lumière", JAUNE_L), ("pour arriver ?", WHITE)], 32), 0.8).move_to(P(0, -1.05))
        self.au_mot("sa lumière")
        self.play(FadeIn(rayon, scale=2), FadeIn(Q2[0], shift=UP * 0.12), run_time=0.35)
        self.au_mot("arriver")
        self.play(rayon.animate.move_to(T2.get_right()), FadeIn(Q2[1], shift=UP * 0.12), rate_func=linear,
                  run_time=1.28)
        self.play(Flash(T2, color=JAUNE_L, line_length=0.2), FadeOut(rayon), run_time=0.4)
        self.insister(Q1[1], 1.2)
        self.appel_commentaire(y=-1.75)
