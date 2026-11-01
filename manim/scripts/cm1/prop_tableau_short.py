# prop_tableau_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 04 « Compléter un
# tableau de proportionnalité » (micro prop_tableau), COMMUN : rendu une fois,
# copié sous les deux noms (il n'affiche aucune classe). CEINTURE BLANCHE
# (règle du short blanc, REGLES.md) : on VOIT le tableau se remplir.
# Il AMUSE : « Combien de pattes dans une file de 100 fourmis ? »
#   · EN HAUT, l'image qui bouge : les fourmis arrivent AU-DESSUS de LEUR
#     colonne (1, puis 2, puis 10, puis 100 petites fourmis) ;
#   · EN BAS, au même instant, le tableau se remplit (6, 12, 60, 600 pattes) ;
#     le code couleur est partagé : pattes des fourmis ORANGE = nombres de pattes ;
#   · 1 question-pause (3 s) : 5 araignées à 8 pattes → 40 (13 = ajouter,
#     85 = 8 et 5 collés) ;
#   · fin : 10 fourmis et 10 araignées, combien de pattes ? (140) en commentaire.
# Centres d'intérêt : animaux, sciences.
# Données réelles (WebSearch, 01/11/2026) : un insecte (la fourmi) a 6 pattes
# (3 paires, sur le thorax) ; une araignée, un arachnide, en a 8 : Muséum de
# Tours, « Dossier pédagogique Araignées » (museum.tours.fr) ; Vikidia,
# « Araignée ». Voix gardée.
# Ajouté ICI (absent du module) : fourmi(), mini_fourmi(), araignee().
#
# Voix : manim/voix/cm-prop-tableau-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm-prop-tableau-short/ ; marques :
# manim/scripts/cm1/prop_tableau_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_tableau_short.py PropTableauShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_tableau_short.py PropTableauShortCM -o eleveai-maths-cm1-prop-tableau-short --media_dir manim/scripts/cm1/media-prop-tableau-short
# Sorties (le même fichier, copié) :
#   manim/sorties/cm1/maths/proportionnalite/04-tableau/eleveai-maths-cm1-prop-tableau-short.mp4
#   manim/sorties/cm2/maths/proportionnalite/04-tableau/eleveai-maths-cm2-prop-tableau-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

CORPS_F = "#dc2626"     # la fourmi rouge
PATTE = "#fb923c"       # ses pattes (même orange que « pattes » dans le texte)
ARAIGNEE = "#a855f7"
Y_FILE = 0.55           # le sol des fourmis, au-dessus du tableau


def fourmi(s=1.0):
    """Une fourmi vue de profil : tête, thorax, abdomen, 6 pattes orange, 2 antennes.
    .pattes : les 6 pattes."""
    tete = Circle(radius=0.14, fill_color=CORPS_F, fill_opacity=1, stroke_width=0).move_to(P(0.42, 0.2))
    thorax = Ellipse(width=0.32, height=0.2, fill_color=CORPS_F, fill_opacity=1, stroke_width=0).move_to(P(0.13, 0.18))
    abdo = Ellipse(width=0.5, height=0.34, fill_color=CORPS_F, fill_opacity=1, stroke_width=0).move_to(P(-0.27, 0.22))
    pattes = VGroup()
    for x0, dx in ((0.04, -0.16), (0.13, 0.0), (0.22, 0.16)):
        for sgn in (-1, 1):
            a = P(x0, 0.16)
            b = P(x0 + dx + sgn * 0.08, 0.1)
            c = P(x0 + dx + sgn * 0.13, -0.05)
            pattes.add(VMobject(stroke_color=PATTE, stroke_width=4).set_points_as_corners([a, b, c]))
    ant = VGroup(*[Line(P(0.48, 0.3), P(0.48 + dx, 0.5), color=PATTE, stroke_width=3) for dx in (0.05, 0.16)])
    g = VGroup(pattes, abdo, thorax, tete, ant).scale(s)
    g.pattes = pattes
    return g


def mini_fourmi(r=0.022):
    """Une toute petite fourmi (trois points rouges) : pour la file de 100."""
    return VGroup(*[Dot(P(dx, 0), radius=r * k, color=CORPS_F) for dx, k in ((-r * 1.6, 1.2), (0, 0.9), (r * 1.4, 1.0))])


def araignee(s=1.0):
    """Une araignée violette : corps rond, 8 pattes (4 de chaque côté)."""
    corps = VGroup(Circle(radius=0.2, fill_color=ARAIGNEE, fill_opacity=1, stroke_width=0),
                   Circle(radius=0.12, fill_color=ARAIGNEE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.25)))
    pattes = VGroup()
    for k, ang in enumerate((0.55, 0.2, -0.15, -0.5)):
        for sgn in (-1, 1):
            a = P(sgn * 0.12, 0.05)
            b = P(sgn * 0.38, 0.05 + 0.32 * np.sin(ang) + 0.12)
            c = P(sgn * 0.52, 0.05 + 0.32 * np.sin(ang) - 0.12)
            pattes.add(VMobject(stroke_color=PATTE, stroke_width=4).set_points_as_corners([a, b, c]))
    yeux = VGroup(*[Dot(P(dx, 0.28), radius=0.03, color=WHITE) for dx in (-0.05, 0.05)])
    g = VGroup(pattes, corps, yeux).scale(s)
    g.pattes = pattes
    return g


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


class PropTableauShortCM(ShortProp):
    nom_voix = "cm-prop-tableau-short"
    fichier_marques = "prop_tableau_short_marques.json"
    ceinture = "blanche"

    def colonne_fourmis(self, c, n, s, par, dx, dy, y0=Y_FILE - 0.4):
        """n fourmis (taille s) en rangées de `par`, posées AU-DESSUS de la
        colonne c du tableau (la première rangée en bas)."""
        g = VGroup()
        for k in range(n):
            f = fourmi(s) if s else mini_fourmi()
            i, j = k % par, k // par
            f.move_to(P(self.tb.x(c) + (i - (par - 1) / 2) * dx, y0 + j * dy))
            g.add(f)
        return g

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["5 ×", "8 =", "40 pattes."])
        sc.au_mot("On multiplie")
        sc.play(Indicate(self.ar.pattes, color=PATTE, scale_factor=1.15), run_time=0.5)
        for m, mot in zip(lg, ["5 fois", "8, égale", "40 pattes"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        cinq = VGroup(*[araignee(0.3) for _ in range(5)]).arrange(RIGHT, buff=0.04)
        cinq.move_to(P(-1.25, -2.8))  # à gauche de Ti-Margo, sous la réponse
        sc.play(FadeOut(self.ar), LaggedStart(*[FadeIn(a, shift=DOWN * 0.15) for a in cinq], lag_ratio=0.12),
                run_time=0.6)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La file de fourmis", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [margo, titre, badge]
        self.tb = tb = TableauProp(["Fourmis", "Pattes"], [[1, 2, 10, 100], [6, 12, 60, 600]], montrer=False,
                                   largeur_case=0.7, largeur_libelle=1.05, hauteur=0.62, fs=28, marge=0.12,
                                   centre=P(0, -0.75))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        file_ = VGroup(*[fourmi(0.42) for _ in range(6)]).arrange(RIGHT, buff=0.12).move_to(P(0, 1.0))
        self.au_mot("Combien")
        self.play(Write(titre), LaggedStart(*[FadeIn(f, shift=RIGHT * 0.4) for f in file_], lag_ratio=0.15),
                  run_time=0.7)
        q = self.borne(self.ligne([("100 fourmis", WHITE), ("→ ? pattes", PATTE)], 34), 0.9).move_to(P(0, 1.85))
        q[1].sans_synchro = True  # « pattes » : la question de la ligne, dite juste avant
        self.au_mot("100 fourmis")
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.play(*[f.animate(rate_func=there_and_back).shift(UP * 0.12) for f in file_[::2]], run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : une fourmi, 6 pattes ──
        self.dire("01-une")
        grande = fourmi(1.7).move_to(P(0, 1.2))
        self.au_mot("Une fourmi")
        un = pas_audit(tb.valeur(0, 0))  # « Une fourmi » : dit en lettres
        self.play(FadeOut(q), FadeOut(file_), FadeIn(grande, scale=0.6), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.play(FadeIn(un, scale=1.4), tb.allumer(0, 0), run_time=0.3)
        self.au_mot("6 pattes")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), LaggedStart(*[Indicate(p, color=WHITE, scale_factor=1.3)
                                                                    for p in grande.pattes], lag_ratio=0.12),
                  run_time=0.9)
        self.play(tb.allumer(1, 0), run_time=0.25)
        une = self.colonne_fourmis(0, 1, 0.42, 1, 0, 0)
        self.play(Transform(grande, une[0]), tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 02 : 2, 10, 100 fourmis : le tableau se remplit ──
        self.dire("02-tableau")
        deux = self.colonne_fourmis(1, 2, 0.42, 1, 0, 0.4)
        self.au_mot("2 fourmis")
        self.play(LaggedStart(*[FadeIn(f, shift=DOWN * 0.4) for f in deux], lag_ratio=0.3),
                  FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), run_time=0.5)
        self.au_mot("12 pattes")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), Indicate(VGroup(*[f.pattes for f in deux]), color=WHITE),
                  tb.eteindre(0, 1), run_time=0.5)
        dix = self.colonne_fourmis(2, 10, 0.25, 2, 0.3, 0.24)
        self.au_mot("10 fourmis")
        self.play(LaggedStart(*[FadeIn(f, shift=DOWN * 0.3) for f in dix], lag_ratio=0.06),
                  FadeIn(tb.valeur(0, 2), scale=1.4), tb.allumer(0, 2), run_time=0.7)
        self.au_mot("60 pattes")
        self.play(FadeIn(tb.valeur(1, 2), scale=1.4), Indicate(VGroup(*[f.pattes for f in dix]), color=WHITE),
                  tb.eteindre(0, 2), run_time=0.5)
        cent = self.colonne_fourmis(3, 100, None, 10, 0.064, 0.13, y0=Y_FILE - 0.42)
        self.au_mot("Et 100")
        self.play(LaggedStart(*[FadeIn(f) for f in cent], lag_ratio=0.01), FadeIn(tb.valeur(0, 3), scale=1.4),
                  FadeIn(tb.trou(1, 3), scale=1.3), tb.allumer(0, 3), run_time=1.0)
        lg = self.ligne([("6 ×", WHITE), ("100 =", WHITE), ("600 pattes", PATTE)], 32).move_to(P(0, -2.05))
        self.borne(lg, 0.8)
        self.au_mot("6 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.12), Indicate(tb.textes[1][0], color=PATTE, scale_factor=1.4),
                  run_time=0.35)
        self.au_mot("100, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("600 pattes")
        self.play(FadeIn(lg[2], scale=1.3), tb.remplir(1, 3, 600), tb.eteindre(0, 3), run_time=0.45)
        self.play(tb.allumer(1, 3), run_time=0.25)
        self.insister(lg[2], 1.12)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question-pause (3 s) ──
        self.ar = araignee(0.62).move_to(P(-1.35, -2.8))  # à gauche de Ti-Margo, sous les choix
        self.play(FadeIn(self.ar, scale=0.6), run_time=0.3)
        self.question_pause("03-question", "03b-reponse", ["Une araignée a 8 pattes.", "5 araignées ont…"],
                            [self.t("13 pattes", 30), self.t("40 pattes", 30), self.t("85 pattes", 30)], 1,
                            ["5 × 8 = 40 pattes."], mot_q="Une araignée", autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, AMBRE).move_to(P(0, 1.85))
        self.play(FadeIn(et, scale=1.2), run_time=0.35)
        l1 = VGroup(fourmi(0.45), self.t("10 fourmis", 36)).arrange(RIGHT, buff=0.25).move_to(P(0, 1.0))
        l2 = VGroup(araignee(0.45), self.t("10 araignées", 36)).arrange(RIGHT, buff=0.25).move_to(P(0, 0.2))
        self.au_mot("10 fourmis")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("10 araignées")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("combien")
        r = self.borne(self.ligne([("?", AMBRE), ("pattes en tout", PATTE)], 38), 0.9).move_to(P(0, -0.65))
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        self.insister(r[0], 1.4)
        self.appel_commentaire(y=-1.5)
