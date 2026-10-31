# prop_coefficient_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 03 « Le coefficient de
# proportionnalité » (micro prop_coeff). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT le coefficient, un seul calcul dit par la voix.
# Il AMUSE : « Combien de fois un colibri bat-il des ailes en 1 minute ? »
#   · EN HAUT, l'image qui bouge : le colibri bat des ailes (puis si vite
#     qu'elles deviennent floues) et vole au-dessus de SA colonne du tableau ;
#   · EN BAS, au même instant, le tableau secondes → battements se remplit
#     (1 → 50, 2 → 100, 10 → 500), flèche latérale « × 50 » (le coefficient) ;
#   · 1 question-pause (3 s) : en 4 secondes ? (54 = ajouter, 200, 450) ;
#   · 1 minute = 60 s → 3 000 battements ; fin : « et en 1 heure ? »
#     (60 × 3 000 = 180 000), réponse en commentaire.
# Centres d'intérêt : animaux.
# Donnée réelle (WebSearch, 31/10/2026) : « un colibri bat des ailes environ
# 50 fois par seconde » : 22 à près de 80 battements par seconde selon
# l'espèce (Larousse, encyclopédie « colibri ») ; « 40 à 50 fois par seconde »
# (Slate, 2023) ; jusqu'à 53 pour les colibris des Antilles (Air Caraïbes).
# Ordre de grandeur juste : voix gardée.
# Dessin : 60 images par seconde ne peuvent pas montrer 50 battements par
# seconde : les ailes battent lentement (lisible), puis deviennent un FLOU
# (ce que voit l'œil) au mot « Si vite ».
# Ajouté ICI (absent du module) : Colibri (dessin animé par updater),
# fleur(), et la flèche « × 50 » dont l'étiquette passe AU-DESSUS (le cadre
# de 4,5 de large n'a pas la place à droite).
#
# Voix : manim/voix/6e-prop-coefficient-short.json (validée, débit −10) ;
# WAV : public/sons/6e-prop-coefficient-short/ ; marques :
# manim/scripts/6e/prop_coefficient_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_coefficient_short.py PropCoefficientShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_coefficient_short.py PropCoefficientShort6e -o eleveai-maths-6e-prop-coefficient-short --media_dir manim/scripts/6e/media-prop-coefficient-short
# Sortie : manim/sorties/6e/maths/proportionnalite/03-coefficient/eleveai-maths-6e-prop-coefficient-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

VERT_C = "#10b981"
VERT_F = "#047857"
ROSE_G = "#e11d48"
AILE = "#a7f3d0"
Y_VOL = 1.0   # l'altitude du colibri, dans la bande du haut


def dessin_colibri(x, y, phase, flou, s=1.0):
    """Le colibri, bec vers la droite ; ailes à l'angle donné par phase."""
    c = P(x, y)
    corps = Ellipse(width=0.85 * s, height=0.36 * s, fill_color=VERT_C, fill_opacity=1, stroke_width=0)
    corps.rotate(0.3).move_to(c)
    ventre = Ellipse(width=0.5 * s, height=0.18 * s, fill_color="#d1fae5", fill_opacity=1, stroke_width=0)
    ventre.rotate(0.3).move_to(c + P(0.02, -0.08) * s)
    queue = Polygon(c + P(-0.3, -0.05) * s, c + P(-0.75, -0.3) * s, c + P(-0.62, -0.05) * s,
                    c + P(-0.72, 0.08) * s, fill_color=VERT_F, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.17 * s, fill_color=VERT_C, fill_opacity=1, stroke_width=0).move_to(c + P(0.38, 0.17) * s)
    gorge = Circle(radius=0.09 * s, fill_color=ROSE_G, fill_opacity=1, stroke_width=0).move_to(c + P(0.36, 0.04) * s)
    bec = Line(c + P(0.52, 0.17) * s, c + P(0.98, 0.1) * s, color="#1f2937", stroke_width=4 * s)
    oeil = Dot(c + P(0.43, 0.21) * s, radius=0.03 * s, color=BLACK)
    epaule = c + P(0.02, 0.1) * s

    def aile(ang, op=1.0):
        a = Ellipse(width=0.8 * s, height=0.24 * s, fill_color=AILE, fill_opacity=op, stroke_color=WHITE,
                    stroke_width=1.5 * s, stroke_opacity=op)
        a.move_to(epaule + P(-0.32, 0) * s)
        return a.rotate(ang, about_point=epaule)

    if flou:  # ce que voit l'œil : un éventail pâle qui frémit
        ailes = VGroup(*[aile(a + 0.05 * np.sin(phase * 3), 0.28) for a in (-1.9, -1.2, -0.5, 0.2)])
    else:
        ailes = VGroup(aile(-0.85 + 1.05 * np.sin(phase)))
    return VGroup(queue, corps, ventre, gorge, tete, bec, oeil, ailes)


class Colibri(VGroup):
    """Le colibri animé : il bat des ailes (updater) et vole là où vont ses
    trackers vx, vy (self.play(c.vx.animate.set_value(x)))."""

    def __init__(self, x=0.0, y=Y_VOL, s=1.0, freq=4.0, flou=False, **kw):
        super().__init__(**kw)
        self.vx, self.vy = ValueTracker(x), ValueTracker(y)
        self.s, self.freq, self.flou, self.t = s, freq, flou, 0.0
        self.add(dessin_colibri(x, y, 0.0, flou, s))
        self.add_updater(Colibri._maj)

    @staticmethod
    def _maj(m, dt):
        m.t += dt
        y = m.vy.get_value() + 0.05 * np.sin(TAU * 1.3 * m.t)
        neuf = dessin_colibri(m.vx.get_value(), y, TAU * m.freq * m.t, m.flou, m.s)
        m.remove(*m.submobjects)
        m.add(neuf)


def fleur(s=1.0):
    """Une fleur d'hibiscus rouge sur sa tige (le colibri y butine)."""
    tige = Line(P(0, -0.9), P(0, 0), color="#15803d", stroke_width=6)
    feuille = Ellipse(width=0.4, height=0.16, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    feuille.rotate(0.6).move_to(P(0.18, -0.55))
    petales = VGroup(*[Ellipse(width=0.36, height=0.2, fill_color="#ef4444", fill_opacity=1, stroke_color="#b91c1c",
                               stroke_width=1).move_to(P(0.17 * np.cos(a), 0.17 * np.sin(a))).rotate(a)
                       for a in np.linspace(0, TAU, 5, endpoint=False)])
    coeur = Dot(ORIGIN, radius=0.06, color="#fde047")
    return VGroup(tige, feuille, petales, coeur).scale(s)


class PropCoefficientShort6e(ShortProp):
    nom_voix = "6e-prop-coefficient-short"
    fichier_marques = "prop_coefficient_short_marques.json"
    ceinture = "blanche"

    def tableau(self, valeurs, largeur_case=0.7, centre=P(-0.25, -1.65)):
        return TableauProp(["Temps (s)", "Battements"], valeurs, montrer=False, largeur_case=largeur_case,
                           largeur_libelle=1.35, hauteur=0.66, fs=28, marge=0.14, centre=centre)

    def fleche_50(self, tb):
        """La flèche « × 50 » à droite, son étiquette AU-DESSUS (cadre étroit)."""
        fl = tb.fleche_lat("× 50", fs=30)
        e = fl.etiquette
        e.move_to(P(min(fl.fleche.get_center()[0], 2.0 - e.width / 2), tb.carte.get_top()[1] + 0.08 + e.height / 2))
        return fl

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["4 ×", "50 =", "200 battements."])
        for m, mot in zip(lg, ["4 fois", "50, égale", "200 battements"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Les ailes du colibri", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        tb = self.tableau([[1, 2, 10], [50, 100, 500]])
        xs = [tb.x(c) for c in range(3)]
        fl = fleur(0.9).move_to(P(1.75, 1.05))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Combien")
        self.play(Write(titre), run_time=0.6)
        col = Colibri(xs[0] - 0.15, Y_VOL)
        self.au_mot("colibri")
        self.play(FadeIn(col, shift=RIGHT * 0.5), FadeIn(fl), run_time=0.6)
        self.au_mot("1 minute")
        q = self.ligne([("en 1 minute", WHITE), ("→ ? battements", AMBRE)], 26).move_to(P(0, 0.12))
        self.play(FadeIn(q, shift=UP * 0.15), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : 50 fois par seconde ──
        self.dire("01-colibri")
        self.play(FadeOut(q), run_time=0.3)
        v1 = tb.valeur(0, 0)
        v1._pas_audit = True  # « par seconde » : 1 seconde
        self.au_mot("50 fois")
        lab = self.ligne([("50 fois", AMBRE), ("par seconde", WHITE)], 28).move_to(P(0, 0.12))
        self.play(FadeIn(v1, scale=1.4), tb.allumer(0, 0), run_time=0.3)
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), FadeIn(lab[0], scale=1.3), run_time=0.4)
        self.au_mot("par seconde")
        self.play(FadeIn(lab[1], shift=RIGHT * 0.15), tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.35)
        self.au_mot("Si vite")
        vite = self.ligne([("Si vite qu'on ne voit", WHITE), ("plus ses ailes !", WHITE)], 24)
        vite.arrange(DOWN, buff=0.06).move_to(P(0, 0.12))
        col.freq = 9.0
        self.play(FadeOut(lab), FadeIn(vite[0], shift=UP * 0.1), run_time=0.35)
        col.flou = True
        self.au_mot("plus ses ailes")
        self.play(FadeIn(vite[1], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 02 : le tableau se remplit, le colibri vole au-dessus ──
        self.dire("02-tableau")
        self.au_mot("2 secondes")
        self.play(FadeOut(vite), col.vx.animate.set_value(xs[1] - 0.15), FadeIn(tb.valeur(0, 1), scale=1.4),
                  tb.allumer(0, 1), run_time=0.5)
        lg = self.ligne([("2 ×", WHITE), ("50 =", AMBRE), ("100", VERT_OK)], 32).move_to(P(0, 0.12))
        self.poser_lignes(VGroup(*lg[:2]), "fade", 0.3)
        self.au_mot("100 battements")
        self.play(FadeIn(lg[2], scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.4), tb.eteindre(0, 1),
                  tb.allumer(1, 1), run_time=0.4)
        self.play(tb.eteindre(1, 1), run_time=0.2)
        self.au_mot("10 secondes")
        self.play(FadeOut(lg), col.vx.animate.set_value(xs[2] - 0.15), FadeIn(tb.valeur(0, 2), scale=1.4),
                  tb.allumer(0, 2), run_time=0.6)
        self.au_mot("500 battements")
        self.play(FadeIn(tb.valeur(1, 2), scale=1.4), tb.eteindre(0, 2), tb.allumer(1, 2), run_time=0.4)
        self.play(tb.eteindre(1, 2), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 03 : le coefficient : × 50 ──
        self.dire("03-coefficient")
        f50 = self.fleche_50(tb)
        k = self.ligne([("Coefficient :", WHITE), ("× 50", AMBRE)], 28).move_to(P(0, 0.12))
        self.au_mot("coefficient")
        self.play(Create(f50.fleche), col.vx.animate.set_value(xs[0] - 0.15), FadeIn(k[0], shift=UP * 0.1),
                  run_time=0.6)
        self.au_mot("50")
        self.play(FadeIn(f50.etiquette, scale=1.4), FadeIn(k[1], scale=1.2), run_time=0.4)
        self.au_mot("multiplie toujours")
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.1) for c in range(3)],
                              lag_ratio=0.3), run_time=1.0)
        self.insister(k[1], 1.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse", ["En 4 secondes,", "combien de battements ?"],
                            [self.t("54", 30), self.t("200", 30), self.t("450", 30)], 1,
                            ["4 × 50 = 200 battements."], mot_q="En 4 secondes", autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : en 1 minute ──
        self.dire("05-minute")
        t2 = self.tableau([[1, 60], [50, 3000]], largeur_case=1.0, centre=P(-0.3, -1.65))
        f2 = self.fleche_50(t2)
        col2 = Colibri(t2.x(0) - 0.15, Y_VOL, freq=9.0, flou=True)
        self.add(t2.fond, t2.valeur(0, 0), t2.valeur(1, 0), f2, col2, fl)
        self.au_mot("1 minute")
        m1 = self.ligne([("1 minute", WHITE), ("=", WHITE), ("60 secondes", AMBRE)], 28).move_to(P(0, 0.12))
        self.play(FadeIn(m1[0], shift=RIGHT * 0.15), FadeIn(m1[1]), run_time=0.3)
        self.au_mot("60 secondes")
        self.play(FadeIn(m1[2], scale=1.3), FadeIn(t2.valeur(0, 1), scale=1.4), t2.allumer(0, 1),
                  col2.vx.animate.set_value(t2.x(1) - 0.15), run_time=0.6)
        lg2 = self.ligne([("60 ×", WHITE), ("50 =", AMBRE), ("3 000", VERT_OK)], 32).move_to(P(0, 0.12))
        self.au_mot("60 fois")
        self.play(FadeOut(m1), run_time=0.2)
        self.poser_lignes(VGroup(*lg2[:2]), "fade", 0.3)
        self.au_mot("3 000")
        self.play(FadeIn(lg2[2], scale=1.3), FadeIn(t2.valeur(1, 1), scale=1.4), t2.eteindre(0, 1),
                  t2.allumer(1, 1), run_time=0.45)
        self.insister(lg2[2], 1.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 06 : la question en commentaire ──
        self.dire("06-commentaire")
        col3 = Colibri(-0.9, 1.1, freq=9.0, flou=True)
        self.au_mot("Et toi")
        self.play(FadeIn(col3), FadeIn(fl), run_time=0.4)
        self.au_mot("Combien")
        r = self.bloc(["Combien de battements"], 30).move_to(P(0, 0.05))
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.35)
        self.au_mot("1 heure")
        qh = self.ligne([("en 1 heure", BLEU_CALCUL), ("?", AMBRE)], 44).move_to(P(0, -0.75))
        self.play(FadeIn(qh, scale=1.3), run_time=0.4)
        self.insister(qh, 1.1)
        self.appel_commentaire(y=-1.75)
