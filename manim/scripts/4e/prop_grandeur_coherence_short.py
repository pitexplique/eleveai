# prop_grandeur_coherence_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 18 « Vérifier un résultat par
# son unité » (micro grandeur_coherence, notion grandeur_composee).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md). Il AMUSE : un jeu, trois
# résultats FAUX à démasquer sans calculer, rien qu'en lisant l'unité :
#   · EN HAUT, l'objet (une chambre, un scooter, une gourde) ; à côté, la
#     ligne fausse BARRÉE en rouge et l'unité juste écrite À CÔTÉ en vert
#     (le geste de la paysage : la fiche du chantier) ;
#   · 1 question-pause (3 s) : « la piscine contient 400 m² d'eau » → faux,
#     l'eau se mesure en m³ ; leurres : « c'est juste », « juste si on arrondit » ;
#   · fin : un terrain de handball 40 m sur 20 m, un élève écrit 800 m³ :
#     corrige-le (800 m²) en commentaire.
# Chiffres : terrain de handball 40 m × 20 m (règles de l'IHF, dimensions du
# terrain de jeu, relevé le 31/10/2026) ; les autres nombres sont inventés.
# Centres d'intérêt : jeux-defis.
#
# Voix : manim/voix/4e-prop-grandeur-coherence-short.json (validée, débit −10) ;
# WAV : public/sons/4e-prop-grandeur-coherence-short/ ; marques :
# manim/scripts/4e/prop_grandeur_coherence_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_grandeur_coherence_short.py PropGrandeurCoherenceShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_grandeur_coherence_short.py PropGrandeurCoherenceShort4e -o eleveai-maths-4e-prop-grandeur-coherence-short --media_dir manim/media-prop-4e-18
# Sortie : manim/sorties/4e/maths/proportionnalite/18-grandeur-coherence/eleveai-maths-4e-prop-grandeur-coherence-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import gras, sans  # noqa: E402
from prop_grandeur_produit_short import lit  # noqa: E402

ROUGE_S = "#ef4444"
VERT_S = "#4ade80"
ARDOISE_S = "#94a3b8"


def chambre(s=1.0):
    """Une chambre vue de haut : le sol (parquet) et le lit."""
    sol = Square(1.0, fill_color="#d6a76a", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    li = lit(0.75).move_to(P(-0.18, 0.05))
    return VGroup(sol, li).scale(s)


def scooter(s=1.0):
    """Un scooter de profil : deux roues, la caisse, la selle, le guidon."""
    roues = VGroup(*[Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x, -0.25)) for x in (-0.38, 0.4)])
    caisse = Polygon(P(-0.55, -0.15), P(0.1, -0.15), P(0.3, 0.05), P(0.3, -0.2), P(0.55, -0.2), P(0.35, 0.35),
                     P(0.22, 0.35), P(0.0, 0.05), P(-0.5, 0.05), fill_color="#16a34a", fill_opacity=1,
                     stroke_width=0)
    selle = RoundedRectangle(width=0.42, height=0.1, corner_radius=0.04, fill_color="#111827", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.25, 0.1))
    guidon = Line(P(0.28, 0.35), P(0.2, 0.55), color="#9ca3af", stroke_width=5)
    return VGroup(roues, caisse, selle, guidon).scale(s)


def gourde(s=1.0):
    """Une gourde : le corps bleu, le bouchon, le niveau de l'eau."""
    corps = RoundedRectangle(width=0.5, height=1.0, corner_radius=0.16, fill_color="#e0f2fe", fill_opacity=1,
                             stroke_color="#0284c7", stroke_width=4)
    eau = RoundedRectangle(width=0.42, height=0.62, corner_radius=0.12, fill_color="#38bdf8", fill_opacity=1,
                           stroke_width=0).move_to(P(0, -0.15))
    bouchon = RoundedRectangle(width=0.28, height=0.18, corner_radius=0.05, fill_color="#0f172a", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.58))
    return VGroup(corps, eau, bouchon).scale(s)


def handball(w=3.4, centre=ORIGIN):
    """Un terrain de handball vu de haut (40 m × 20 m) : sol bleu, lignes,
    zones de but (demi-cercles de 6 m) et buts."""
    h = w / 2
    k = w / 40
    fond = Rectangle(width=w, height=h, fill_color="#1d4ed8", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    milieu = Line(P(0, -h / 2), P(0, h / 2), color=WHITE, stroke_width=2)
    zones = VGroup(*[AnnularSector(inner_radius=0, outer_radius=6 * k, start_angle=-PI / 2 if s < 0 else PI / 2,
                                   angle=PI, fill_color="#f97316", fill_opacity=0.9, stroke_color=WHITE,
                                   stroke_width=2).move_arc_center_to(P(s * w / 2, 0))
                     for s in (-1, 1)])
    buts = VGroup(*[Rectangle(width=0.08, height=3 * k, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                    .move_to(P(s * (w / 2 + 0.04), 0)) for s in (-1, 1)])
    g = VGroup(fond, zones, milieu, buts).move_to(centre)
    g.bord = fond
    return g


class PropGrandeurCoherenceShort4e(ShortProp):
    nom_voix = "4e-prop-grandeur-coherence-short"
    fichier_marques = "prop_grandeur_coherence_short_marques.json"
    ceinture = "blanche"
    XI = -1.4            # la colonne des objets
    XT = -0.85           # le bord gauche des textes
    LARG = 2.85          # la largeur des textes (jusqu'à x = 2.0)

    def _disposer_q(self, question, choix, phrase):
        """Le texte de chaque choix s'arrête à 0,8 du bord droit de sa carte :
        la coche verte de la réponse ne le frôle jamais (leçon des 11, 14, 16)."""
        r = super()._disposer_q(question, choix, phrase)
        for c in r[2]:
            corps = c[1][1]
            lim = c[0].get_right()[0] - 0.8
            if corps.get_right()[0] > lim:
                g = corps.get_left()[0]
                corps.scale_to_fit_width(lim - g).align_to(P(g, 0), LEFT)
        return r

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

    def montre(self, mot, *anims, rt=0.4, n=1):
        if isinstance(mot, tuple):
            mot, n = mot
        self.au_mot(mot, n)
        self.play(*anims, run_time=rt)

    def mots(self, lg, mots, avec=None, rt=0.3):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=rt)

    def a_gauche(self, m, y):
        """Un texte de la rangée, à droite de l'objet, borné à LARG."""
        if m.width > self.LARG:
            m.scale_to_fit_width(self.LARG)
        return m.move_to(P(0, y)).align_to(P(self.XT, 0), LEFT)

    def rangee(self, cle, ic, y, legende, mots_leg, faux, mot_faux, juste, mots_juste):
        """Un résultat faux : l'objet, sa légende, la valeur fausse BARRÉE au
        mot « Faux », l'unité juste écrite À CÔTÉ, en vert, à son mot."""
        self.dire(cle)
        leg = self.a_gauche(self.ligne([(s, WHITE) for s in legende], 26, buff=0.12), y + 0.32)
        self.mots(leg, mots_leg, {0: [Indicate(ic, scale_factor=1.08, color=YELLOW)]})
        val = gras(faux, 34, WHITE)
        ok = VGroup(*[gras(s, 34, VERT_S) for s in juste]).arrange(RIGHT, buff=0.12)
        duo = VGroup(val, ok).arrange(RIGHT, buff=0.3)
        if duo.width > self.LARG - 0.25:
            duo.scale_to_fit_width(self.LARG - 0.25)
        duo.move_to(P(0, y - 0.3)).align_to(P(self.XT, 0), LEFT)
        self.montre(mot_faux, FadeIn(val, scale=1.3), rt=0.35)
        b = Line(val.get_left() + LEFT * 0.08, val.get_right() + RIGHT * 0.08, color=ROUGE_S, stroke_width=6)
        self.montre("Faux", Create(b), Indicate(val, color=ROUGE_S, scale_factor=1.1), rt=0.45)
        self.mots(ok, mots_juste, rt=0.35)
        self.insister(ok, 1.1)
        self.attendre_voix(marge=0.2)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Trois résultats faux", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]
        Y = (1.55, 0.0, -1.55)
        ics = [chambre(0.85), scooter(1.0), gourde(0.85)]
        for ic, y in zip(ics, Y):
            ic.move_to(P(self.XI, y))

        # ── 00 : l'accroche : trois résultats faux, sans calculer ──
        self.dire("00-accroche")
        self.montre("Ces trois", Write(titre), rt=0.5)
        self.montre("résultats", LaggedStart(*[FadeIn(ic, scale=0.6) for ic in ics], lag_ratio=0.3), rt=0.7)
        A = VGroup(gras("Trouve l'erreur", 30, AMBRE), gras("sans calculer !", 30, AMBRE)).arrange(RIGHT, buff=0.15)
        self.borne(A, 0.5).move_to(P(0, -2.4))
        self.montre("Trouve", FadeIn(A[0], shift=UP * 0.12), rt=0.35)
        self.montre("sans calculer", FadeIn(A[1], scale=1.15), rt=0.35)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(A), run_time=0.3)

        # ── 01 à 03 : les trois résultats, barrés, l'unité juste à côté ──
        self.rangee("01-chambre", ics[0], Y[0], ["La surface", "d'une chambre :"], ["La surface", "d'une chambre"],
                    "12 m³", "12", ["m²"], ["mètres carrés"])
        self.rangee("02-scooter", ics[1], Y[1], ["Un scooter", "roule à :"], ["Un scooter", "roule"],
                    "45 h/km", "45", ["km/h"], ["kilomètres par"])
        self.rangee("03-gourde", ics[2], Y[2], ["Une gourde", "contient :"], ["Une gourde", "contient"],
                    "75 cm", "75", ["L", "ou cL"], ["des litres", "centilitres"])
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        def rep(sc):
            sc.au_mot("L'eau remplit")
            sc.rep(0)
            sc.au_mot("des mètres cubes")
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse",
                            ["Un élève écrit : la piscine", "contient 400 m² d'eau."],
                            [self.t("c'est juste", 25), self.t("faux : des m³", 25),
                             self.t("juste si on arrondit", 25)], 1,
                            ["L'eau remplit un volume :", "des m³, ou des litres."], mot_q="Un élève",
                            autres_r=rep)
        self.vider(garder)

        # ── 05 : la question en commentaire : le terrain de handball ──
        self.dire("05-commentaire")
        T = handball(3.3, centre=P(0.15, 1.25))
        self.montre("terrain de handball", FadeIn(T, scale=0.85), rt=0.5)
        c40 = gras("40 m", 28, WHITE).next_to(T.bord, DOWN, buff=0.12)
        c20 = gras("20 m", 28, WHITE).rotate(PI / 2).next_to(T.bord, LEFT, buff=0.1)
        self.montre("40 m", FadeIn(c40, scale=1.3), rt=0.35)
        self.montre("20 m", FadeIn(c20, scale=1.3), rt=0.35)
        E = self.borne(self.ligne([("Un élève :", WHITE), ("800 m³ ?", ROUGE_S)], 34), 0.8).move_to(P(0, -0.35))
        self.mots(E, ["Un élève", "800"])
        C1 = self.borne(self.ligne([("Corrige-le :", WHITE), ("son aire ?", AMBRE)], 32), 0.8).move_to(P(0, -1.0))
        self.mots(C1, ["Corrige-le", "son aire"])
        C2 = self.borne(self.ligne([("avec la bonne unité !", AMBRE)], 30), 0.8).move_to(P(0, -1.6))
        self.mots(C2, ["avec la bonne"])
        self.insister(C1[1], 1.1)
        self.appel_commentaire(y=-2.3)
