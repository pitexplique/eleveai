# suite_termes_short.py
# EleveAI — Maths 1re spé — short « Calculer un terme : tu paries que tu trouves
# u₃ de tête ? » (9:16), ceinture BLANCHE (échelle entière à 70 % sous le titre).
# Série SUITES, épisode 18. Micro : suite_termes (vidéo commune avec la Tle
# suite_calculer_termes).
#   · 00-garde      : le titre, l'échelle, le pari ; u₃ en grand, des étoiles ;
#   · 01-situation  : EN HAUT le ciel de Malik, astronome (le télescope, les
#                     étoiles) ; EN BAS « la nuit n » et uₙ = 3 × 2ⁿ ;
#   · 02-calcul     : u₂ : EN BAS 2² = 4 puis 3 × 4 = 12, EN HAUT un groupe de 4
#                     étoiles, puis 3 groupes : 12 étoiles, EN MÊME TEMPS ;
#   · 03/03b        : question-pause (A : 24), boutons côte à côte en grand, 3 s ;
#                     puis 2³ = 8 et 3 × 8 = 24 ;
#   · 04-commentaire: u₅ = ? (réponse 3 × 2⁵ = 96, NON affichée) ; « Réponds en
#                     commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = termes, orange = la puissance, vert = juste, violet = le rang.
# Voix : manim/voix/premiere-spe-suite-termes-short.json (débit −6), calée par
# suite_termes_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_termes_short.py SuiteTermesShort -o eleveai-maths-premiere-spe-suite-termes-short --media_dir manim/scripts/premiere/media-suite-termes-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)

assert 3 * 2 ** 2 == 12 and 3 * 2 ** 3 == 24 and 3 * 2 ** 5 == 96     # u₂, question A, commentaire (96)
assert (3 * 2) ** 3 == 216 and 3 * 6 == 18                             # les leurres : (3 × 2)³, 3 × 2 × 3
RANG = "#A855F7"
NUIT, JAUNE_ETOILE = "#0B1E3F", "#FDE047"


def etoile(r=0.11, couleur=JAUNE_ETOILE):
    return Star(5, outer_radius=r, inner_radius=r * 0.45, fill_color=couleur, fill_opacity=1, stroke_width=0)


def malik(s=1.0):
    """Malik, astronome : veste bleu nuit, bonnet orange."""
    tete = Circle(radius=0.27, fill_color="#5c3a21", fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    bonnet = Sector(radius=0.29, angle=PI, start_angle=0, fill_color=RAISON, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.17))
    pompon = Circle(radius=0.07, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(P(0, 1.36))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#1D4ED8", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    return VGroup(corps, tete, bonnet, pompon).scale(s)


def telescope(s=1.0):
    """Un télescope sur trépied, pointé vers le haut à droite."""
    tube = RoundedRectangle(width=1.1, height=0.26, corner_radius=0.06, fill_color="#E2E8F0", fill_opacity=1,
                            stroke_width=0)
    bague = Rectangle(width=0.12, height=0.32, fill_color=RAISON, fill_opacity=1, stroke_width=0).move_to(P(0.45, 0))
    g = VGroup(tube, bague).rotate(0.6).move_to(P(0, 0.35))
    pieds = VGroup(*[Line(P(0, 0.2), P(dx, -0.45), stroke_color=GREY_B, stroke_width=4) for dx in (-0.35, 0, 0.35)])
    return VGroup(pieds, g).scale(s)


def groupe(centre, pas=0.26, r=0.1):
    """Un groupe de 4 étoiles (2 × 2)."""
    c = np.array(centre)
    return VGroup(*[etoile(r).move_to(c + P(dx, dy)) for dx in (-pas / 2, pas / 2) for dy in (pas / 2, -pas / 2)])


class SuiteTermesShort(AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_termes_short_marques.json"
    nom_voix = "premiere-spe-suite-termes-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    entete = _S16.entete

    def q_reponse(self, q, bonne):
        """Comme l'ép. 16 (la coche remplace la lettre), un peu plus vif : la
        phrase d'explication suit tout de suite « Réponse A »."""
        cartes = q.cartes
        b = cartes[bonne]
        rond, lettre = b[1][0]
        anims = [b[0].animate.set_stroke(JUSTE, width=7).set_fill("#052e16", 1), rond.animate.set_fill(JUSTE)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(q.rebours), FadeOut(q.pause), run_time=0.2)
        ok = self.coche(WHITE, 0.17).set_stroke(width=7).move_to(rond)
        self.play(FadeOut(lettre), Create(ok), run_time=0.2)
        b[1][0].remove(lettre)
        b.add(ok)
        self.insister(b, self.k_allumer, run_time=0.18)
        return ok

    def bouton_haut(self, lettre, texte, largeur=1.2, hauteur=1.6, fs=40, fs_nb=56):
        """Un bouton en hauteur : la lettre en haut, le nombre en grand dessous
        (même structure que le module commun : VGroup(cadre, VGroup(rond+lettre, corps)))."""
        rond = Circle(radius=0.25 * fs / 32, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = Text(texte, font_size=fs_nb, color=WHITE)
        if c.width > largeur - 0.24:
            c.scale_to_fit_width(largeur - 0.24)
        ligne = VGroup(VGroup(rond, lt), c).arrange(DOWN, buff=0.18)
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.14, stroke_color=TERME,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre)
        return VGroup(cadre, ligne)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; u₃ en grand ──
        self.dire("00-garde")
        self.entete("Calculer un terme", extrait="Calculer un terme", fs=40)
        l1 = self.t("Tu paries que", 44).next_to(self.badge, DOWN, buff=0.45)
        l2 = self.t("tu trouves", 44).next_to(l1, DOWN, buff=0.18)
        self.au_mot("Tu paries")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("tu trouves")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        gu = Text("u₃", font_size=150, color=TERME).move_to(P(0, -0.2))
        gu[1].set_color(RANG)
        ets = VGroup(*[etoile(r).move_to(P(x, y)) for x, y, r in ((-1.55, 0.3, 0.16), (1.5, 0.5, 0.13),
                                                                    (1.35, -0.75, 0.1), (-1.3, -0.85, 0.12))])
        self.au_mot("u indice 3")
        self.play(FadeIn(gu, scale=1.3), LaggedStart(*[GrowFromCenter(e) for e in ets], lag_ratio=0.2), run_time=0.45)
        l3 = self.t("de tête ?", 52, RAISON).move_to(P(0, -1.95))
        self.au_mot("de tête")
        self.play(FadeIn(l3, shift=UP * 0.1), *[Indicate(e, color=WHITE, scale_factor=1.5) for e in ets], run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le ciel de Malik ; EN BAS « la nuit n » et uₙ = 3 × 2ⁿ ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        ciel = RoundedRectangle(width=4.0, height=2.05, corner_radius=0.16, fill_color=NUIT, fill_opacity=1,
                                stroke_color=GREY_B, stroke_width=2).move_to(P(0, 1.3))
        ma = malik(0.62).move_to(P(-1.45, 0.98))
        te = telescope(0.85).move_to(P(-0.55, 0.85))
        self.au_mot("Malik")
        self.play(FadeIn(ciel), FadeIn(ma, shift=UP * 0.15), run_time=0.35)
        cap = self.calcul([("Malik,", JAUNE_TITRE, None), ("astronome", TERME, "astronome")], -0.2, centre=0, fs=40)
        self.au_mot("Son télescope")
        self.play(FadeIn(te, shift=UP * 0.1), run_time=0.3)
        nouv = VGroup(*[etoile(0.11).move_to(P(x, y)) for x, y in ((0.4, 1.95), (1.0, 1.55), (1.6, 2.0), (1.3, 0.75))])
        self.au_mot("nouvelles étoiles")
        self.play(LaggedStart(*[GrowFromCenter(e) for e in nouv], lag_ratio=0.25), te[1].animate.rotate(0.12),
                  run_time=0.5)
        self.calcul([("La nuit", WHITE, "la nuit n"), ("n :", RANG, None)], -1.0, centre=0, fs=42)
        f = self.calcul([("uₙ =", TERME, "u indice n égale", {"ₙ": RANG}), ("3 ×", WHITE, "3 fois"),
                         ("2", RAISON, "2"), ("ⁿ", RANG, "puissance n")], -1.95, centre=0, fs=46)
        self.play(Create(self.encadre(f, TERME, 0.12)), *[Indicate(e, color=WHITE, scale_factor=1.4) for e in nouv],
                  run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : u₂ : EN BAS 2² = 4 puis 3 × 4 = 12 ; EN HAUT 4 étoiles, puis 3 groupes ──
        self.nouvel_ecran("02-calcul", garder=(self.badge, self.titre_s, ciel, ma, te))
        g1, g2, g3 = (groupe(P(x, 1.3), pas=0.24) for x in (0.4, 0.98, 1.56))
        nuit = self.t("nuit 2", 30, RANG).move_to(P(1.15, 2.0))
        self.calcul([("Pour", WHITE, "Pour"), ("u₂ :", TERME, "2 :", {"₂": RANG})], -0.12, centre=0, fs=44,
                    avec_morceau={1: [FadeIn(nuit, scale=1.2)]})
        self.calcul([("2² =", RAISON, "2 puissance 2", {"²": RANG}), ("4", RAISON, "4")], -0.77, centre=0, fs=44,
                    avec_morceau={1: [LaggedStart(*[GrowFromCenter(e) for e in g1], lag_ratio=0.15)]})
        n12 = self.t("12 étoiles", 28, JUSTE).move_to(P(0.98, 0.65))
        c = self.calcul([("3 ×", WHITE, "3 fois"), ("4", RAISON, "4"), ("=", WHITE, None), ("12", JUSTE, "12")], -1.42,
                        centre=0, fs=44, avec_morceau={1: [TransformFromCopy(g1, g2), TransformFromCopy(g1, g3)],
                                                       3: [FadeIn(n12, scale=1.2)]})
        self.play(c[-1].animate.shift(RIGHT * 0.1), run_time=0.12)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.1)), *[Indicate(g, color=JUSTE) for g in (g1, g2, g3)],
                  run_time=0.4)
        self.calcul([("La puissance", JAUNE_TITRE, "La puissance")], -2.2, centre=0, fs=34)
        self.calcul([("d'abord,", JAUNE_TITRE, None), ("× ensuite", JAUNE_TITRE, "la multiplication")], -2.66, centre=0,
                    fs=34)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → A (24) ; puis 2³ = 8 et 3 × 8 = 24 ──
        cartes = VGroup(*[self.bouton_haut(L, nb) for L, nb in zip("ABC", ("24", "216", "18"))])
        for c, x in zip(cartes, (-1.42, 0, 1.42)):
            c.move_to(P(x, -0.05))

        def e1():
            self.calcul([("Combien vaut", WHITE, "Combien vaut"), ("u₃ ?", TERME, "u indice 3", {"₃": RANG})], 2.55,
                        centre=0, fs=46)
            rap, _ = self.ligne([("uₙ =", TERME, None, {"ₙ": RANG}), ("3 ×", WHITE), ("2", RAISON), ("ⁿ", RANG)], 42)
            rap.move_to(P(0, 1.75))
            self.play(FadeIn(rap, shift=UP * 0.1), run_time=0.25)

        q = self.question_libre("03-question", [e1], cartes, P(0, -1.45))
        self.dire("03b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.calcul([("2³ =", RAISON, "2 puissance 3", {"³": RANG}), ("8", RAISON, "8")], -1.45, centre=0, fs=46)
        c = self.calcul([("3 ×", WHITE, "3 fois"), ("8", RAISON, "8"), ("=", WHITE, "égale"), ("24", JUSTE, "24")],
                        -2.35, centre=0, fs=46)
        self.play(c[-1].animate.shift(RIGHT * 0.1), run_time=0.12)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.1)), run_time=0.3)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("combien vaut")
        cv = self.t("Combien vaut", 44).move_to(P(0, 2.4))
        self.play(FadeIn(cv, shift=UP * 0.1), run_time=0.3)
        g5 = Text("u₅ ?", font_size=120, color=TERME).move_to(P(0, 1.05))
        g5[1].set_color(RANG)
        rap, _ = self.ligne([("uₙ =", TERME, None, {"ₙ": RANG}), ("3 ×", WHITE), ("2", RAISON), ("ⁿ", RANG)], 42)
        rap.move_to(P(0, -0.3))
        self.au_mot("u indice 5")
        self.play(FadeIn(g5, scale=1.3), FadeIn(rap, shift=UP * 0.1), run_time=0.35)
        self.appel_commentaire(-1.6)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
