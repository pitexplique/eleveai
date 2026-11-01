# prop_probleme_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 07 « Résoudre un
# problème de proportionnalité » (micro prop_probleme), COMMUN : rendu une fois,
# copié sous les deux noms (il n'affiche aucune classe). CEINTURE BLANCHE
# (règle du short blanc, REGLES.md) : on VOIT la proportionnalité.
# Il AMUSE : « Dans l'espace, le Soleil se lève 16 fois par jour ! »
#   · EN HAUT, l'image qui bouge : la Station spatiale tourne autour de la
#     Terre ; chaque fois qu'elle sort de l'ombre, un lever de soleil s'allume
#     (code couleur partagé : le JAUNE du Soleil = les nombres de levers) ;
#   · EN BAS, le tableau jours → levers se remplit : 1 jour 16, 7 jours 112 ;
#   · 1 question-pause (3 s) : 3 jours → 48 (19 = ajouter, 316 = 3 et 16 collés) ;
#   · fin : une astronaute reste 10 jours (160) : réponse en commentaire.
# Centres d'intérêt : espace, sciences.
# Donnée réelle (WebSearch, 01/11/2026) : la Station spatiale internationale
# fait le tour de la Terre en environ 90 minutes (90 à 93 min selon l'altitude),
# soit environ 16 tours, donc environ 16 levers et 16 couchers de soleil par
# jour (15,5 à 15,9 en réalité : « environ 16 » est l'arrondi que donne la NASA).
# Sources : NASA Earth Observatory, « Sunrise to Sunset » (blog Earth Matters,
# 15/01/2016, earthobservatory.nasa.gov/blogs/earthmatters/2016/01/15/5771) ;
# NASA Science, science.nasa.gov/blogs/earth-matters/2016/01/15/sunrise-to-sunset ;
# ESA (période typique 92 min). Voix gardée (« environ 16 », « une heure et demie »).
# Ajouté ICI : terre(), station(), soleil(), astronaute().
#
# Voix : manim/voix/cm-prop-probleme-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm-prop-probleme-short/ ; marques :
# manim/scripts/cm1/prop_probleme_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_probleme_short.py PropProblemeShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_probleme_short.py PropProblemeShortCM -o eleveai-maths-cm1-prop-probleme-short --media_dir manim/scripts/cm1/media-prop-probleme-short
# Sorties (le même fichier, copié) :
#   manim/sorties/cm1/maths/proportionnalite/07-probleme/eleveai-maths-cm1-prop-probleme-short.mp4
#   manim/sorties/cm2/maths/proportionnalite/07-probleme/eleveai-maths-cm2-prop-probleme-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

SOLEIL = "#facc15"      # le Soleil = les nombres de levers
OCEAN = "#1d4ed8"
TERRES = "#16a34a"
NUIT_T = "#020617"
C_TERRE = P(0.35, 0.75)
R_TERRE, R_ORBITE = 0.78, 1.18


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def terre(c=C_TERRE, r=R_TERRE):
    """La Terre : océan, deux continents, la moitié droite dans la NUIT (le
    Soleil est à gauche)."""
    ocean = Circle(radius=r, fill_color=OCEAN, fill_opacity=1, stroke_width=0).move_to(c)
    t1 = Ellipse(width=r * 0.8, height=r * 0.55, fill_color=TERRES, fill_opacity=1, stroke_width=0)
    t1.move_to(c + P(-r * 0.3, r * 0.3)).rotate(0.4)
    t2 = Ellipse(width=r * 0.55, height=r * 0.85, fill_color=TERRES, fill_opacity=1, stroke_width=0)
    t2.move_to(c + P(r * 0.25, -r * 0.35)).rotate(-0.3)
    nuit = AnnularSector(inner_radius=0, outer_radius=r * 1.01, angle=PI, start_angle=-PI / 2, fill_color=NUIT_T,
                         fill_opacity=0.72, stroke_width=0).move_to(c, aligned_edge=LEFT)
    nuit.shift(RIGHT * (c[0] - nuit.get_left()[0]))
    return pas_audit(VGroup(ocean, t1, t2, nuit))


def station(s=1.0):
    """La Station spatiale : un module blanc et deux grands panneaux bleus."""
    module = Rectangle(width=0.16, height=0.1, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
    barre = Line(P(-0.24, 0), P(0.24, 0), color="#e2e8f0", stroke_width=3)
    panneaux = VGroup(*[Rectangle(width=0.14, height=0.26, fill_color="#38bdf8", fill_opacity=1,
                                  stroke_color=WHITE, stroke_width=1).move_to(P(x, 0)) for x in (-0.3, 0.3)])
    return pas_audit(VGroup(barre, panneaux, module).scale(s))


def soleil(r=0.32, c=ORIGIN):
    rond = Circle(radius=r, fill_color=SOLEIL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(np.cos(a) * r * 1.25, np.sin(a) * r * 1.25), P(np.cos(a) * r * 1.6, np.sin(a) * r * 1.6),
                           color=SOLEIL, stroke_width=4) for a in np.linspace(0, TAU, 9)[:-1]])
    return pas_audit(VGroup(rayons, rond).move_to(c))


def astronaute(s=1.0):
    """Une astronaute : casque blanc et visière dorée, combinaison blanche."""
    corps = RoundedRectangle(width=0.7, height=0.8, corner_radius=0.2, fill_color="#f1f5f9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.35))
    casque = Circle(radius=0.36, fill_color="#f1f5f9", fill_opacity=1, stroke_width=0).move_to(P(0, 0.35))
    visiere = Ellipse(width=0.5, height=0.32, fill_color="#f59e0b", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.35))
    sac = Rectangle(width=0.18, height=0.4, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.25))
    drapeau = Rectangle(width=0.14, height=0.1, fill_color="#2563eb", fill_opacity=1, stroke_width=0).move_to(
        P(-0.18, -0.15))
    return pas_audit(VGroup(corps, sac, casque, visiere, drapeau).scale(s))


class PropProblemeShortCM(ShortProp):
    nom_voix = "cm-prop-probleme-short"
    fichier_marques = "prop_probleme_short_marques.json"
    ceinture = "blanche"

    def tour(self, run_time=1.2):
        """La station fait UN tour (sens inverse des aiguilles d'une montre,
        départ en haut) ; en revenant en haut, elle sort de la nuit : un lever
        de soleil (éclair jaune)."""
        self.play(Rotate(self.st, angle=TAU, about_point=C_TERRE), rate_func=linear, run_time=run_time)
        self.play(Flash(self.st.get_center(), color=SOLEIL, line_length=0.22, flash_radius=0.3, num_lines=10),
                  run_time=0.35)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le Soleil de l'espace", self.ceinture)
        pas_audit(titre)
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        te = terre()
        orbite = DashedVMobject(Circle(radius=R_ORBITE, color=GREY_B, stroke_width=2).move_to(C_TERRE),
                                num_dashes=40)
        so = soleil(0.22, P(-1.65, 1.75))
        self.st = station(0.85).move_to(C_TERRE + UP * R_ORBITE)
        self.au_mot("Dans l'espace")
        self.play(Write(titre), FadeIn(te, scale=0.8), Create(orbite), FadeIn(so, scale=0.5), run_time=0.8)
        self.play(FadeIn(self.st, scale=0.5), run_time=0.3)
        self.tour(0.9)
        l0 = self.borne(self.ligne([("16 fois", SOLEIL), ("par jour !", WHITE)], 42), 1.0).move_to(P(0, -1.2))
        self.au_mot("16 fois")
        self.play(FadeIn(l0[0], scale=1.4), run_time=0.35)
        self.au_mot("par jour")
        self.play(FadeIn(l0[1], shift=RIGHT * 0.15), run_time=0.3)
        self.insister(l0[0], 1.15, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 01 : un tour en 1 h 30, 16 levers par jour ──
        self.dire("01-station")
        self.au_mot("La Station spatiale")
        nom = self.t("Station spatiale", 28, "#38bdf8").move_to(P(0, -0.72))
        self.play(FadeOut(l0), FadeIn(nom, shift=UP * 0.1), Indicate(self.st, color=WHITE, scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("fait le tour")
        self.tour(1.3)
        l1 = pas_audit(self.borne(self.t("1 tour = 1 h 30", 36), 0.5)).move_to(P(0, -1.3))
        self.au_mot("une heure et demie")
        self.play(FadeIn(l1, scale=1.2), run_time=0.4)
        self.au_mot("Ses astronautes")
        self.tour(1.0)
        l2 = self.borne(self.ligne([("Environ", WHITE), ("16 levers", SOLEIL)], 36), 1.0).move_to(P(0, -2.0))
        l3 = self.borne(self.t("de soleil par jour", 34), 0.9).move_to(P(0, -2.55))
        self.au_mot("environ")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("16 levers")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.35)
        self.au_mot("de soleil par")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.insister(l2[1], 1.1, 0.25)
        self.tour(1.0)
        self.attendre_voix(marge=0.2)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : une semaine : le tableau se remplit ──
        self.dire("02-semaine")
        self.tb = tb = TableauProp(["Jours", "Levers"], [[1, 7], [16, 112]], montrer=False, largeur_case=1.15,
                                   largeur_libelle=1.45, hauteur=0.72, fs=32, marge=0.12, centre=P(0, 0.0))
        q = self.borne(self.t("En une semaine ?", 36, AMBRE), 0.5).move_to(P(0, 1.95))
        self.au_mot("Combien")
        self.play(FadeIn(q, scale=1.15), run_time=0.4)
        self.au_mot("1 jour")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(pas_audit(tb.valeur(0, 0)), scale=1.4), run_time=0.45)
        un = soleil(0.16, P(tb.x(0), -1.0))
        self.au_mot("16 levers")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), FadeIn(un, scale=0.5), run_time=0.4)
        sept = VGroup(*[soleil(0.08) for _ in range(7)]).arrange_in_grid(2, 4, buff=0.05).move_to(P(tb.x(1), -1.0))
        h = tb.fleche_col(0, 1, "× 7", ligne=0, couleur=SOLEIL)
        self.au_mot("7 jours")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)), Create(h.fleche),
                  FadeIn(h.etiquette, scale=1.3), LaggedStart(*[FadeIn(s, scale=0.4) for s in sept], lag_ratio=0.08),
                  run_time=0.7)
        lg = self.borne(self.ligne([("16 ×", WHITE), ("7 =", WHITE), ("112", SOLEIL)], 40), 0.5).move_to(P(0, -1.9))
        self.au_mot("16 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.12), tb.allumer(1, 0), run_time=0.3)
        self.au_mot("7, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("112")
        self.play(FadeIn(lg[2], scale=1.3), tb.remplir(1, 1, 112), tb.eteindre(1, 0), run_time=0.45)
        self.play(tb.allumer(1, 1), run_time=0.25)
        self.insister(lg[2], 1.25)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question-pause (3 s) ──
        self.trois = VGroup(*[soleil(0.11) for _ in range(3)]).arrange(RIGHT, buff=0.15).move_to(P(-1.25, -2.75))
        self.play(FadeIn(self.trois, scale=0.6), run_time=0.3)
        self.question_pause("03-question", "03b-reponse", ["Et en 3 jours ?"],
                            [self.t("19 levers", 30), self.t("48 levers", 30), self.t("316 levers", 30)], 1,
                            ["16 × 3 = 48 levers."], mot_q="Et en 3", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, AMBRE).move_to(P(0, 1.95))
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        ast = astronaute(0.9).move_to(P(-1.15, 0.85))
        self.au_mot("Une astronaute")
        self.play(FadeIn(ast, shift=UP * 0.2), run_time=0.4)
        dix = self.t("10 jours", 42).move_to(P(0.75, 0.85))
        self.au_mot("10 jours")
        self.play(FadeIn(dix, scale=1.3), run_time=0.4)
        r = self.borne(self.ligne([("?", AMBRE), ("levers de soleil", SOLEIL)], 36), 0.5).move_to(P(0, -0.3))
        pas_audit(r[0])
        self.au_mot("Combien")
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.insister(r[0], 1.4)
        self.appel_commentaire(y=-1.2)

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["16 ×", "3 =", "48 levers."])
        sc.au_mot("3 fois plus")
        sc.play(LaggedStart(*[Indicate(s, color=WHITE, scale_factor=1.5) for s in self.trois], lag_ratio=0.2),
                run_time=0.6)
        for m, mot in zip(lg, ["16 fois", "3, égale", "48 levers"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()
