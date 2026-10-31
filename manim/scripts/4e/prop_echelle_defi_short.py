# prop_echelle_defi_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 10 « Défis sur les échelles »
# (micro echelle_defi, notion prop_echelle). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md). Il AMUSE : « Un marathon sur une carte de randonnée,
# ça mesure combien ? » → presque 1 m 70 de carte, la taille d'un adulte !
#   · EN HAUT, l'image : la carte et son parcours, la coureuse ; puis la
#     bande de carte (BLEU) dressée à côté d'un adulte ;
#   · EN BAS, au même instant : 1 km → 4 cm (au 1/25 000), 42 × 4 = 168 cm ;
#   · 1 question-pause (3 s) : le semi-marathon de 21 km ? (84 cm) ; leurres :
#     21 cm (oublier le × 4 : km et cm confondus), 5 cm (inverser : 21 ÷ 4) ;
#   · fin : une course de 10 km, combien de cm ? (40 cm) en commentaire.
# Centres d'intérêt : course-trail.
#
# ⭐ Chiffres du monde réel (WebSearch, 31/10/2026) : marathon = 42,195 km
# (distance officielle World Athletics, fixée en 1921 ; Wikipédia « Half
# marathon » : le semi = 21,0975 km, exactement la moitié). Au 1/25 000,
# 1 km = 100 000 cm ↔ 4 cm : 42,195 km ↔ 168,78 cm, « environ 42 km →
# 168 cm, presque 1 m 70 » est juste ; « la taille d'un adulte » = ordre de
# grandeur courant (pas de source vérifiée pour une moyenne chiffrée). Rien de
# faux dans la voix : aucune correction.
#
# Voix : manim/voix/4e-prop-echelle-defi-short.json (validée, débit −10) ;
# WAV : public/sons/4e-prop-echelle-defi-short/ ; marques :
# manim/scripts/4e/prop_echelle_defi_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_echelle_defi_short.py PropEchelleDefiShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_echelle_defi_short.py PropEchelleDefiShort4e -o eleveai-maths-4e-prop-echelle-defi-short --media_dir manim/media-prop-10-4e
# Sortie : manim/sorties/4e/maths/proportionnalite/10-echelle-defi/eleveai-maths-4e-prop-echelle-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

BLEU_P = "#2563eb"
BLEU_P2 = "#60a5fa"
VERT_R = "#16a34a"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def coureuse(s=1.0):
    """Une coureuse : maillot orange, dossard blanc, bandeau."""
    p = personne(peau="#e0ac69", tenue="#f97316", cheveux="#7c2d12", longs=True)
    dossard = Rectangle(width=0.5, height=0.36, fill_color=WHITE, fill_opacity=1, stroke_color=ENCRE_D,
                        stroke_width=2).move_to(P(0, -1.0))
    bandeau = Rectangle(width=0.86, height=0.12, fill_color="#22d3ee", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.22))
    p.add(dossard, bandeau)
    return p.scale(s)


ENCRE_D = "#0f172a"


def carte_parcours(l=3.9, h=2.3):
    """Une carte de randonnée : courbes de niveau, un lac, le parcours en
    pointillés (.parcours), départ et arrivée."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.18, fill_color="#ecfccb", fill_opacity=1,
                            stroke_color="#84cc16", stroke_width=4)
    c = P(l * 0.2, h * 0.1)
    courbes = VGroup(*[Ellipse(width=l * k, height=h * k * 0.8, color="#b45309", stroke_width=2,
                               stroke_opacity=0.6).move_to(c) for k in (0.2, 0.36, 0.52)])
    lac = Ellipse(width=l * 0.18, height=h * 0.16, fill_color="#38bdf8", fill_opacity=1, stroke_width=0).move_to(
        P(-l * 0.3, h * 0.25))
    pts = [P(-l * 0.42, -h * 0.35), P(-l * 0.2, -h * 0.1), P(-l * 0.32, h * 0.1), P(-l * 0.05, h * 0.32),
           P(l * 0.25, h * 0.3), P(l * 0.4, -h * 0.05), P(l * 0.15, -h * 0.32), P(l * 0.4, -h * 0.38)]
    trace = VMobject(stroke_color="#dc2626", stroke_width=5).set_points_smoothly(pts)
    parcours = DashedVMobject(trace, num_dashes=30)
    dep = Dot(pts[0], radius=0.08, color=ENCRE_D)
    arr = Dot(pts[-1], radius=0.08, color="#dc2626")
    g = VGroup(fond, courbes, lac, parcours, dep, arr)
    g.parcours, g.trace, g.dep = parcours, trace, dep
    return g


class PropEchelleDefiShort4e(ShortProp):
    nom_voix = "4e-prop-echelle-defi-short"
    fichier_marques = "prop_echelle_defi_short_marques.json"
    ceinture = "blanche"

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["21 ×", "4 =", "84 cm."])
        for m, mot in zip(lg, ["21 fois", "4, égale", "84 cm"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Un marathon sur la carte", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : un marathon sur une carte ? ──
        self.dire("00-accroche")
        ca = carte_parcours().move_to(P(0, 1.15))
        co = coureuse(0.3).move_to(ca.dep.get_center() + UP * 0.32)
        self.au_mot("Un marathon")
        self.play(Write(titre), FadeIn(co, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("une carte")
        self.play(FadeIn(ca, scale=0.9), co.animate.set_z_index(2), run_time=0.5)
        self.add(co)
        q = self.borne(self.t("Combien de cm ?", 40, AMBRE), 0.8).move_to(P(0, -0.9))
        q.sans_synchro = True
        self.au_mot("combien")
        self.play(FadeIn(q, scale=0.7), co.animate.move_to(ca[5].get_center() + UP * 0.32), run_time=1.2)
        self.insister(q, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 01 : 42 km et 195 m ──
        self.dire("01-marathon")
        l1 = self.ligne([("Marathon :", WHITE)], 34).move_to(P(0, -0.6))
        l2 = self.borne(self.ligne([("42 km", VERT_OK), ("195 m", VERT_OK)], 44), 0.9).move_to(P(0, -1.4))
        self.au_mot("Un marathon")
        self.play(FadeOut(q), FadeOut(co), FadeIn(l1, shift=UP * 0.15), ca.parcours.animate.set_color(VERT_R), run_time=0.45)
        self.au_mot("42 km")
        self.play(FadeIn(l2[0], scale=1.3), run_time=0.4)
        self.au_mot("195 m")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.4)
        self.insister(l2, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 02 : au 1/25 000, 1 km → 4 cm ──
        self.dire("02-echelle")
        e = self.ligne([("Au 1/25 000 :", WHITE)], 32).move_to(P(0, -1.45))
        a, f, b = gras("1 km", 34, VERT_OK), Text("→", font_size=34), gras("4 cm", 34, BLEU_CALCUL)
        car = VGroup(a, f, b).arrange(RIGHT, buff=0.2).move_to(P(0, -2.15))
        cadre = SurroundingRectangle(car, color=AMBRE, buff=0.16, corner_radius=0.12, stroke_width=4)
        self.au_mot("Sur une carte")
        self.play(FadeOut(l1), l2.animate.move_to(P(0, -0.6)), run_time=0.4)
        self.au_mot("25 000")
        self.play(FadeIn(e, shift=UP * 0.15), run_time=0.35)
        self.au_mot("1 km")
        self.play(Create(cadre), FadeIn(a, scale=1.3), run_time=0.4)
        self.au_mot("4 cm")
        self.play(FadeIn(f), FadeIn(b, scale=1.3), run_time=0.4)
        self.insister(VGroup(cadre, car), 1.06)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : 42 × 4 = 168 cm : presque 1 m 70, la taille d'un adulte ──
        self.dire("03-calcul")
        h = 2.6
        sol = -0.35
        adulte = personne(peau="#8d5524", tenue="#6366f1", cheveux="#1f2937")
        adulte.scale_to_fit_height(h * 0.98).move_to(P(-1.2, sol + h * 0.49))
        bande = Rectangle(width=0.42, height=h * 0.97, fill_color="#ecfccb", fill_opacity=1, stroke_color=BLEU_P,
                          stroke_width=6).move_to(P(0.05, sol + h * 0.485))
        trait = DashedLine(bande.get_bottom() + UP * 0.1, bande.get_top() + DOWN * 0.1, color="#dc2626",
                           stroke_width=4)
        l168 = gras("168 cm", 28, BLEU_P2).next_to(bande, RIGHT, buff=0.12)
        L1 = self.borne(self.ligne([("42 ×", WHITE), ("4 =", WHITE), ("168 cm", BLEU_CALCUL)], 40), 0.9).move_to(P(0, -1.2))
        env = self.t("Environ 42 km :", 30).move_to(P(0, -0.65))
        self.au_mot("Environ")
        self.play(FadeIn(env, shift=UP * 0.15), run_time=0.4)
        self.au_mot("42 fois")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("4, égale")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("168 cm")
        self.play(FadeIn(L1[2], scale=1.3), GrowFromEdge(VGroup(bande, trait), DOWN), FadeIn(l168, scale=1.3),
                  run_time=0.6)
        self.insister(L1[2], 1.1)
        L2 = self.ligne([("Presque", WHITE), ("1 m 70", VERT_OK)], 40).move_to(P(0, -2.0))
        self.au_mot("Presque")
        self.play(FadeIn(L2[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("1 mètre")
        self.play(FadeIn(L2[1], scale=1.3), run_time=0.4)
        L3 = self.borne(self.t("la taille d'un adulte !", 30, AMBRE), 0.9).move_to(P(0, -2.7))
        self.au_mot("la taille")
        self.play(FadeIn(adulte, shift=UP * 0.2), FadeIn(L3, scale=1.1), run_time=0.5)
        self.play(Wiggle(adulte), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) : le semi-marathon ──
        self.question_pause("04-question", "04b-reponse", ["Un semi-marathon :", "environ 21 km.", "Sur la carte ?"],
                            [self.t("84 cm", 30), self.t("21 cm", 30), self.t("5 cm", 30)], 0,
                            ["21 × 4 = 84 cm."], mot_q="Un semi", autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : la question en commentaire : une course de 10 km ──
        self.dire("05-commentaire")
        ca5 = carte_parcours(3.6, 2.0).move_to(P(0, 1.35))
        co5 = coureuse(0.4).move_to(ca5.dep.get_center() + UP * 0.42)
        self.au_mot("Et toi")
        self.play(FadeIn(ca5, scale=0.9), FadeIn(co5), run_time=0.45)
        qq = self.borne(self.ligne([("10 km", VERT_OK), ("→ ? cm", BLEU_CALCUL)], 42), 0.9).move_to(P(0, -0.35))
        qq[1].sans_synchro = True
        self.au_mot("Combien")
        self.play(FadeIn(qq[1], shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("10 km")
        self.play(FadeIn(qq[0], scale=1.3), run_time=0.4)
        self.insister(qq, 1.1)
        self.appel_commentaire(y=-1.45)
