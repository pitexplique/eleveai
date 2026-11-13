# suite_variation_spe_short.py
# EleveAI — Maths 1re spé — short « Sens de variation : tu paries que tu le vois
# en un coup d'œil ? » (9:16), ceinture BLANCHE (échelle entière à 70 % sous le
# titre). Série SUITES, épisode 23. Micro : suite_variation (le signe de
# uₙ₊₁ − uₙ ; « varGraphe » du renfort : compare chaque terme au précédent).
#   · 00-garde      : le titre, l'échelle, le pari ; la montagne enneigée ;
#   · 01-situation  : Mathis, météorologue ; EN HAUT la montagne et sa neige,
#                     le soleil du redoux ; EN BAS uₙ = 60 − 4n ;
#   · 02-variation  : EN HAUT la neige qui baisse jour après jour ; EN BAS
#                     uₙ₊₁ − uₙ = −4, « − 4 cm par jour », décroissante ;
#   · 03/03b        : question-pause (B : ni croissante ni décroissante) : les
#                     thermomètres 5, 3, 4, 2, 6 ; puis les flèches qui descendent
#                     et remontent ;
#   · 04-commentaire: au bout de combien de jours la neige a-t-elle fondu ?
#                     (réponse 15 jours : 60 − 4n = 0, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les termes (la neige), orange = l'écart − 4 et ce qui
# descend, vert = ce qui monte et le juste, violet = le rang n (les jours).
# Voix : manim/voix/premiere-spe-suite-variation-short.json (débit −6), calée par
# suite_variation_spe_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_variation_spe_short.py SuiteVariationShort -o eleveai-maths-premiere-spe-suite-variation-short --media_dir manim/scripts/premiere/media-suite-variation-spe-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)
from suite_variation_spe import Bords6  # noqa: E402  (la paysage : contrôle des 6 %)

N = lambda n: 60 - 4 * n  # noqa: E731
assert all(N(n + 1) - N(n) == -4 for n in range(20))                       # décroissante
T = [5, 3, 4, 2, 6]
assert any(b < a for a, b in zip(T, T[1:])) and any(b > a for a, b in zip(T, T[1:]))   # question : B
assert [n for n in range(30) if N(n) == 0] == [15]                         # commentaire : 15 jours
RANG = "#A855F7"
ROCHE, ROCHE2, NEIGE = "#64748B", "#475569", "#F8FAFC"


def montagne(s=1.0):
    """Deux sommets ; la neige du grand se règle par neige(k) (k = 1 : pleine)."""
    fond = Polygon(P(-0.2, -0.8), P(1.5, -0.8), P(0.75, 0.35), fill_color=ROCHE2, fill_opacity=1, stroke_width=0)
    grand = Polygon(P(-1.5, -0.8), P(0.9, -0.8), P(-0.3, 0.9), fill_color=ROCHE, fill_opacity=1, stroke_width=0)
    g = VGroup(fond, grand).scale(s)
    g.s = s
    return g


def neige(m, k):
    """La calotte de neige du grand sommet de m, d'épaisseur relative k (0 à 1)."""
    s = m.s
    o = m[1].get_vertices()[2]               # le sommet
    h = 1.0 * k * s                          # hauteur de la calotte
    pente = 1.2 / 1.7                        # demi-largeur par unité de hauteur (côté gauche ≈ droit)
    y = o[1] - h
    w = h * pente
    pts = [o, o + P(w, -h)]
    for j in range(1, 5):                    # le bord bas, en dents
        x = w - j * 2 * w / 5
        pts.append(o + P(x, -h + (0.12 * s * k if j % 2 else 0)))
    pts.append(o + P(-w, -h))
    return Polygon(*pts, fill_color=NEIGE, fill_opacity=1, stroke_width=0) if k > 0.01 else VGroup()


def mathis(s=1.0):
    """Mathis, météorologue : bonnet, doudoune, une girouette à la main."""
    tete = Circle(radius=0.25, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    bonnet = Sector(radius=0.27, angle=PI, start_angle=0, fill_color=RAISON, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.12))
    pompon = Circle(radius=0.07, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.3))
    corps = RoundedRectangle(width=0.95, height=1.1, corner_radius=0.3, fill_color=TERME, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    zip_ = Line(P(0, 0.62), P(0, -0.38), stroke_color="#0c4a6e", stroke_width=3)
    mat = Line(P(0.6, -0.2), P(0.6, 0.9), stroke_color=GREY_A, stroke_width=4)
    fleche = VGroup(Line(P(0.35, 0.9), P(0.85, 0.9), stroke_color=GREY_A, stroke_width=4),
                    Triangle(fill_color=GREY_A, fill_opacity=1, stroke_width=0).scale(0.08).rotate(-PI / 2)
                    .move_to(P(0.88, 0.9)))
    return VGroup(mat, fleche, corps, zip_, tete, bonnet, pompon).scale(s)


def soleil(r=0.22):
    c = Circle(radius=r, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(np.cos(a) * r * 1.35, np.sin(a) * r * 1.35), P(np.cos(a) * r * 1.8, np.sin(a) * r * 1.8),
                           stroke_color=JAUNE_TITRE, stroke_width=3) for a in np.arange(0, TAU, TAU / 8)])
    return VGroup(rayons, c)


def thermometre(t, tmax=7, h=0.95):
    """Un thermomètre ; le liquide rouge monte à t (sur tmax)."""
    tube = RoundedRectangle(width=0.2, height=h, corner_radius=0.1, stroke_color=GREY_A, stroke_width=2.5,
                            fill_color=FOND_CARTE, fill_opacity=1)
    bulbe = Circle(radius=0.13, fill_color=PIEGE, fill_opacity=1, stroke_color=GREY_A, stroke_width=2.5)
    bulbe.move_to(tube.get_bottom())
    haut = (h - 0.2) * t / tmax
    liq = Rectangle(width=0.1, height=haut, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
    liq.move_to(tube.get_bottom() + UP * (0.05 + haut / 2))
    g = VGroup(tube, liq, bulbe)
    g.sommet = liq.get_top()
    return g


class SuiteVariationShort(Bords6, AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_variation_spe_short_marques.json"
    nom_voix = "premiere-spe-suite-variation-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.02
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    ligne = _P21.ligne

    def bouton_mots(self, lettre, lignes, fs, largeur=3.85, hauteur=0.9):
        """Un bouton en ligne : petit rond + lettre à gauche, les mots (1 ou 2
        lignes) centrés dans la place qui reste (même structure que le module commun)."""
        rond = Circle(radius=0.19, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=28, color=WHITE, weight=BOLD).move_to(rond)
        corps = VGroup(*[Text(l, font_size=fs, color=WHITE) for l in lignes]).arrange(DOWN, buff=0.08)
        cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.14, stroke_color=TERME,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        VGroup(rond, lt).move_to(cadre.get_left() + RIGHT * 0.32)
        x0 = cadre.get_left()[0] + 0.64
        corps.move_to(P((x0 + cadre.get_right()[0] - 0.12) / 2, cadre.get_y()))
        return VGroup(cadre, VGroup(VGroup(rond, lt), corps))

    def cap(self, m, k):
        return neige(m, k)

    def fondre(self, m, cap, ks, run_time=0.6):
        """La neige baisse par paliers (k successifs) ; renvoie la dernière calotte."""
        for k in ks:
            nv = neige(m, k)
            self.play(Transform(cap, nv), run_time=run_time / len(ks))
        return cap

    def construct(self):
        # ── 00 : la garde : titre, échelle (70 %), le pari ; la montagne enneigée ──
        self.dire("00-garde")
        self.entete("Sens de variation", extrait="Sens de variation", fs=40)
        pa = self.paragraphe(["Tu paries", "que tu le vois", "en un coup", ("d'œil ?", RAISON)], 40, buff=0.14,
                             y=1.3)
        mt = montagne(0.9).move_to(P(0, -1.4))
        cp = neige(mt, 1.0)
        for l, ex in zip(pa, ("Tu paries", "que tu le vois", "en un coup", "d'œil")):
            self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.25)
            if ex == "que tu le vois":
                self.play(FadeIn(mt, shift=UP * 0.2), FadeIn(cp), run_time=0.35)
        self.fondre(mt, cp, (0.75, 0.5, 0.3), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : Mathis, météorologue ; la montagne ; uₙ = 60 − 4n ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        pers = mathis(0.55).move_to(P(-1.45, 1.85))
        nom = self.t("Mathis", 40, JAUNE_TITRE).move_to(P(0.5, 2.15))
        met = self.t("météorologue", 30, TERME).move_to(P(0.5, 1.65))
        self.au_mot("Mathis")
        self.play(FadeIn(pers, shift=UP * 0.15), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("météorologue")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        carte = RoundedRectangle(width=3.85, height=2.0, corner_radius=0.16, fill_color="#0B1E3F", fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=2).move_to(P(0, 0.2))
        mt = montagne(0.9).move_to(P(-0.35, 0.1))
        cp = neige(mt, 1.0)
        sol = soleil(0.18).move_to(P(1.4, 0.72))
        self.au_mot("Au sommet")
        self.play(FadeIn(carte), FadeIn(mt, shift=UP * 0.15), FadeIn(cp), run_time=0.4)
        self.calcul([("uₙ : neige en cm", TERME, "la hauteur de neige")], -1.1, centre=0, fs=30)
        self.calcul([("n jours de redoux", RANG, "n jours")], -1.6, centre=0, fs=30)
        self.au_mot("redoux")
        self.play(FadeIn(sol, scale=0.5), Rotate(sol[0], PI / 4), run_time=0.45)
        old = self.largeur_texte
        self.largeur_texte = 3.4
        f = self.calcul([("uₙ =", TERME, "vaut u indice n"), ("60", WHITE, "60"), ("− 4n", RAISON, "4 n")], -2.35,
                        centre=0, fs=52)
        self.largeur_texte = old
        self.play(Create(self.encadre(f, TERME, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : la neige baisse ; uₙ₊₁ − uₙ = −4 ; décroissante ──
        self.nouvel_ecran("02-variation", garder=(self.badge, self.titre_s, carte, mt, cp, sol))
        self.calcul([("uₙ₊₁ − uₙ =", TERME, "u indice n plus 1"), ("−4", RAISON, "4")], -1.1, centre=0, fs=44)
        self.calcul([("− 4 cm par jour", RAISON, "chaque jour")], -1.75, centre=0, fs=38)
        self.fondre(mt, cp, (0.8, 0.6, 0.4), run_time=1.2)
        fd = Arrow(P(1.0, 0.95), P(1.0, 0.35), buff=0, stroke_width=6, color=RAISON, max_tip_length_to_length_ratio=0.35)
        self.largeur_texte = 3.5      # il grandit de 8 % (insister) : reste à 6 % du bord
        d = self.calcul([("décroissante", RAISON, "décroissante")], -2.5, centre=0, fs=44, avec=[GrowArrow(fd)])
        self.largeur_texte = 3.85
        self.insister(d, 1.08)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B (ni croissante ni décroissante) ; les thermomètres ──
        lignes = (["croissante"], ["ni croissante", "ni décroissante"], ["décroissante"])
        fs_b = 28
        cartes = VGroup(*[self.bouton_mots(Ln, l, fs_b) for Ln, l in zip("ABC", lignes)])
        for c, y in zip(cartes, (0.12, -0.9, -1.92)):
            c.move_to(P(0, y))
        xs = (-1.6, -0.8, 0.0, 0.8, 1.6)
        th = [thermometre(t).move_to(P(x, 1.38)) for t, x in zip(T, xs)]
        liste = liste_nombres([str(t) for t in T], fs=46)
        for k, (nb, x) in enumerate(zip(liste.nombres, xs)):  # chaque nombre au-dessus de SON thermomètre
            nb.move_to(P(x, 2.25))
            if k < 4:
                liste.seps[k].move_to(P(x + 0.4, 2.25 - 0.07))

        def e1():
            self.largeur_texte = 3.85     # la pause (déjà placée) est bornée à 3,4 : marge de 6 % avec le rebours
            self.calcul([("Températures :", WHITE, "températures")], 2.85, centre=0, fs=40)
            for k, (nb, t) in enumerate(zip(liste.nombres, th)):
                self.suivre(nb.original_text)
                anims = [FadeIn(nb, scale=1.3), FadeIn(t, shift=UP * 0.15)]
                if k > 0:
                    anims.append(FadeIn(liste.seps[k - 1]))
                self.play(*anims, run_time=0.2)

        self.largeur_texte = 3.4
        q = self.question_libre("03-question", [e1], cartes, P(0, -2.62))
        self.largeur_texte = 3.85
        self.dire("03b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        fls = []
        for k in range(4):
            a, b = th[k][1].get_top(), th[k + 1][1].get_top()
            coul = JUSTE if b[1] > a[1] else RAISON
            fls.append(Arrow(a + RIGHT * 0.14, b + LEFT * 0.14, buff=0, stroke_width=5, color=coul,
                             max_tip_length_to_length_ratio=0.3))
        for fl, (mot, n) in zip(fls, (("descend", 1), ("remonte", 1), ("redescend", 1), ("puis remonte", 1))):
            self.au_mot(mot, n)
            self.play(GrowArrow(fl), run_time=0.25)
        self.au_mot("ni croissante ni")
        self.play(Indicate(q.cartes[1], color=JUSTE, scale_factor=1.03), run_time=0.45)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : quand la neige a-t-elle fondu ? ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.largeur_texte = 3.4
        f = self.calcul([("uₙ =", TERME, "u indice n"), ("60", WHITE, "60"), ("− 4n", RAISON, "4 n")], 2.6, centre=0,
                        fs=50)
        self.largeur_texte = 3.85
        self.play(Create(self.encadre(f, TERME, 0.14)), run_time=0.3)
        pa = self.paragraphe(["Au bout de", "combien de jours", "la neige a-t-elle", ("fondu ?", RAISON)], 36,
                             buff=0.12, y=0.95)
        mt = montagne(0.6).move_to(P(0, -0.7))
        cp = neige(mt, 1.0)
        for l, ex in zip(pa, ("au bout de", "combien de jours", "la neige", "fondu")):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if ex == "la neige":
                anims += [FadeIn(mt, shift=UP * 0.1), FadeIn(cp)]
            self.play(*anims, run_time=0.25)
        self.fondre(mt, cp, (0.7, 0.4, 0.15), run_time=0.6)
        self.appel_commentaire(-2.2)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
