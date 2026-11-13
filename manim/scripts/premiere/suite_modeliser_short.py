# suite_modeliser_short.py
# EleveAI — Maths 1re spé — short « Modéliser : tu paries que tu comptes les
# lignes aériennes sans les dessiner ? » (9:16), ceinture BLANCHE (échelle
# entière à 70 % sous le titre). Série SUITES, épisode 21. Micro : suite_modeliser
# (le dénombrement « denombre » du renfort : uₙ = n(n − 1) ÷ 2).
#   · 00-garde      : le titre, l'échelle, le pari ; 5 villes, les lignes qui
#                     se tracent, l'avion ;
#   · 01-situation  : EN HAUT la carte (3, puis 4, puis 5 villes, les lignes qui
#                     se tracent) ; EN BAS les cases 3, 6, 10, EN MÊME TEMPS ;
#   · 02-formule    : EN HAUT une ville et ses n − 1 lignes (orange), une ligne
#                     parcourue des deux bouts ; EN BAS uₙ = n × (n − 1) ÷ 2 ;
#   · 03/03b        : question-pause (C : 45), boutons côte à côte en grand, 3 s ;
#                     puis 10 × 9 = 90 et 90 ÷ 2 = 45, le 90 barré ;
#   · 04-commentaire: 20 villes ? (réponse 20 × 19 ÷ 2 = 190, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = les lignes (les termes), orange = n − 1 et le « deux
# fois », vert = juste, violet = le rang n (les villes).
# Voix : manim/voix/premiere-spe-suite-modeliser-short.json (débit −6), calée par
# suite_modeliser_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_modeliser_short.py SuiteModeliserShort -o eleveai-maths-premiere-spe-suite-modeliser-short --media_dir manim/scripts/premiere/media-suite-modeliser-short

import sys
from itertools import combinations
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18 : boutons en hauteur)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (la paysage : ligne sans ligature)

L = lambda n: n * (n - 1) // 2  # noqa: E731
assert [L(3), L(4), L(5)] == [3, 6, 10] and L(10) == 45 and 10 * 9 == 90 and 90 // 2 == 45   # question : C
assert L(20) == 190                                                                            # commentaire (190)
RANG = "#A855F7"
CARTE = "#0B1E3F"


def avion(s=1.0, couleur=WHITE):
    """Un petit avion vu de dessus, le nez vers la droite."""
    corps = RoundedRectangle(width=0.56, height=0.1, corner_radius=0.05, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    ailes = VGroup(*[Polygon(P(0.06, 0), P(-0.08, sy * 0.26), P(-0.15, sy * 0.26), P(-0.08, 0), fill_color=couleur,
                             fill_opacity=1, stroke_width=0) for sy in (1, -1)])
    queue = VGroup(*[Polygon(P(-0.2, 0), P(-0.27, sy * 0.11), P(-0.3, sy * 0.11), P(-0.27, 0), fill_color=couleur,
                             fill_opacity=1, stroke_width=0) for sy in (1, -1)])
    return VGroup(corps, ailes, queue).scale(s)


def villes(n, centre, r, rayon_point=0.09, depart=PI / 2):
    """n villes régulièrement placées sur un cercle (la première en haut)."""
    c = np.array(centre, dtype=float)
    pts = [c + r * np.array([np.cos(depart - k * TAU / n), np.sin(depart - k * TAU / n), 0]) for k in range(n)]
    return pts, VGroup(*[Dot(p, radius=rayon_point, color=WHITE) for p in pts])


class SuiteModeliserShort(AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_modeliser_short_marques.json"
    nom_voix = "premiere-spe-suite-modeliser-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    largeur_texte = 3.85          # une vraie marge latérale (≈ 6 %) pour les textes pleine largeur
    k_allumer = 1.03
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    bouton_haut = _S18.bouton_haut
    ligne = _P21.ligne

    def trait(self, a, b, couleur=TERME, sw=4):
        return Line(a, b, stroke_color=couleur, stroke_width=sw)

    def formule(self, fs=50, y=-2.0):
        """uₙ = n × (n − 1) sur 2 (une vraie barre de fraction) ; renvoie les morceaux."""
        gauche, pg = self.ligne([("uₙ", TERME, None, {"ₙ": RANG}), ("=", WHITE)], fs)
        num, pn = self.ligne([("n ×", WHITE, None, {"n": RANG}), ("(n − 1)", RAISON, None, {"n": RANG})], fs)
        den = Text("2", font_size=fs, color=WHITE)
        den._pas_audit = True
        barre = Line(LEFT, RIGHT, stroke_width=4, color=WHITE).set_width(num.width + 0.12)
        frac = VGroup(num, barre, den).arrange(DOWN, buff=0.1)
        g = VGroup(gauche, frac).arrange(RIGHT, buff=0.22)
        gauche.match_y(barre)
        if g.width > 3.75:
            g.scale_to_fit_width(3.75)
        g.move_to(P(0, y))
        g.gauche, g.n, g.n1, g.barre, g.den = gauche, pn[0], pn[1], barre, den
        return g

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; 5 villes reliées ──
        self.dire("00-garde")
        self.entete("Modéliser", extrait="Modéliser", fs=44)
        pa = self.paragraphe(["Tu paries que tu", "comptes les lignes", "aériennes", ("sans les dessiner ?", RAISON)],
                             46, buff=0.16, y=1.4)
        for l, ex in zip(pa, ("Tu paries", "comptes", "aériennes", "sans les dessiner")):
            self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.25)
            if ex == "comptes":
                pts, vs = villes(5, P(0, -1.35), 0.95, 0.1)
                self.play(LaggedStart(*[GrowFromCenter(v) for v in vs], lag_ratio=0.15), run_time=0.4)
            if ex == "aériennes":
                tr = VGroup(*[self.trait(pts[a], pts[b], sw=3) for a, b in combinations(range(5), 2)])
                av = avion(0.8).move_to(pts[0]).rotate(np.arctan2(*(pts[2] - pts[0])[[1, 0]]))
                self.add(av)
                self.play(LaggedStart(*[Create(t) for t in tr], lag_ratio=0.08), av.animate.move_to(pts[2]),
                          run_time=0.5)
                self.bring_to_front(vs, av)
        point_q = self.t("?", 90, RAISON).move_to(P(0, -1.35))
        self.play(tr.animate.set_opacity(0.25), FadeOut(av), FadeIn(point_q, scale=1.5), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT la carte (3, 4, 5 villes) ; EN BAS les cases 3, 6, 10 ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        carte = RoundedRectangle(width=3.9, height=2.05, corner_radius=0.16, fill_color=CARTE, fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=2).move_to(P(0, 1.22))
        pts, vs = villes(5, P(0, 1.18), 0.82, 0.1)
        self.au_mot("Une compagnie aérienne")
        av = avion(0.7).move_to(P(-1.4, 2.0))
        self.play(FadeIn(carte), FadeIn(av, shift=RIGHT * 0.3), run_time=0.35)
        self.play(av.animate.move_to(P(1.4, 2.0)), run_time=0.9, rate_func=linear)
        self.calcul([("n villes,", RANG, "n villes"), ("toutes reliées", WHITE, "toutes les autres")], -0.1, centre=0,
                    fs=40, avec=[FadeOut(av)])
        xs = (-1.25, 0.0, 1.25)
        lg = LigneTermes(["3", "6", "10"], xs=xs, centre=P(0, -1.68), largeur=1.05, hauteur=0.95, fs=50)
        h_v = VGroup(*[Arrow(P(x, -0.95), P(x, -1.18), buff=0, stroke_width=4, color=GREY_B, tip_length=0.12,
                             max_tip_length_to_length_ratio=0.5) for x in xs])
        h_l = self.t("lignes", 38, TERME).move_to(P(0, -2.5))
        traits = {}
        for k, n in enumerate((3, 4, 5)):
            lab = self.t(str(n), 46, RANG).move_to(P(xs[k], -0.66))
            self.suivre(f"{n} villes")
            nv = [vs[i] for i in range(n)] if n == 3 else [vs[n - 1]]
            self.play(*[GrowFromCenter(v) for v in nv], FadeIn(lab, scale=1.3), GrowArrow(h_v[k]),
                      run_time=0.3)
            self.suivre(f"{L(n)} lignes")
            neufs = [(a, b) for a, b in combinations(range(n), 2) if (a, b) not in traits]
            for a, b in neufs:
                traits[(a, b)] = self.trait(pts[a], pts[b])
            self.play(*[Create(traits[ab]) for ab in neufs], FadeIn(lg.cases[k][0], scale=0.8),
                      FadeIn(lg.cases[k][1], scale=1.4), *([FadeIn(h_l)] if k == 0 else []), run_time=0.4)
            self.bring_to_front(vs)
        self.attendre_voix(marge=0.3)

        # ── 02 : EN HAUT une ville et ses n − 1 lignes ; EN BAS uₙ = n × (n − 1) ÷ 2 ──
        tous = VGroup(*traits.values())
        self.nouvel_ecran("02-formule", garder=(self.badge, self.titre_s, carte, tous, vs))
        self.au_mot("Chaque ville")
        self.play(vs[0].animate.set_color(RAISON).scale(1.5), run_time=0.3)
        siens = [traits[(0, b)] for b in range(1, 5)]
        self.calcul([("n − 1", RAISON, "n moins 1", {"n": RANG}), ("autres", WHITE, "autres")], -0.3, centre=0, fs=36,
                    avec=[t.animate.set_stroke(RAISON, width=6) for t in siens])
        t12 = traits[(1, 2)]
        d1, d2 = Dot(t12.get_start(), radius=0.08, color=RAISON), Dot(t12.get_end(), radius=0.08, color=RAISON)
        self.calcul([("comptée", WHITE, "comptée"), ("deux fois", RAISON, "deux fois")], -0.95, centre=0, fs=36,
                    avec=[t12.animate.set_stroke(RAISON, width=6)])
        self.play(MoveAlongPath(d1, t12.copy()), MoveAlongPath(d2, t12.copy().reverse_points()), run_time=0.6)
        self.remove(d1, d2)
        f = self.formule(50, -2.12)
        self.au_mot("u indice n")
        self.play(FadeIn(f.gauche, shift=UP * 0.1), run_time=0.25)
        self.suivre("n fois")
        self.play(FadeIn(f.n, shift=UP * 0.1), run_time=0.2)
        self.suivre("n moins 1")
        self.play(FadeIn(f.n1, shift=UP * 0.1), run_time=0.25)
        self.suivre("divisé par")
        self.suivre("2")
        self.play(Create(f.barre), FadeIn(f.den, scale=1.3), run_time=0.3)
        self.play(Create(self.encadre(f, TERME, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C (45) ; puis 10 × 9 = 90 et 90 ÷ 2 = 45 ──
        cartes = VGroup(*[self.bouton_haut(Ln, nb, largeur=1.3, fs_nb=38) for Ln, nb in zip("ABC", ("90", "100", "45"))])
        for c, x in zip(cartes, (-1.4, 0, 1.4)):
            c.move_to(P(x, -0.6))

        def e1():
            self.largeur_texte = 3.85     # la pause (déjà placée) était bornée à 3,4 : marge de 6 % avec le rebours
            self.calcul([("Combien de lignes", WHITE, "Combien de lignes")], 2.6, centre=0, fs=46)
            self.calcul([("pour", WHITE, None), ("10 villes ?", RANG, "10")], 1.95, centre=0, fs=46)
            rap = self.formule(38, 0.95)
            self.play(FadeIn(rap, shift=UP * 0.1), run_time=0.25)

        self.largeur_texte = 3.4
        q = self.question_libre("03-question", [e1], cartes, P(0, -1.8))
        self.largeur_texte = 3.85
        self.dire("03b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        self.calcul([("10 ×", WHITE, "10 fois"), ("9", RAISON, "9"), ("=", WHITE, "égale"), ("90", WHITE, "90")], -1.85,
                    centre=0, fs=44)
        c = self.calcul([("90", WHITE, None), ("÷ 2", RAISON, "divisé par 2"), ("=", WHITE, None), ("45", JUSTE, "45")],
                        -2.55, centre=-0.12, fs=44)
        self.play(c[-1].animate.shift(RIGHT * 0.1), run_time=0.12)
        self.play(Create(self.encadre(c[-1], JUSTE, 0.1)), run_time=0.3)
        self.au_mot("Sans diviser")
        x90 = self.barrer(cartes[0][0], buff=-0.12)
        self.play(cartes[0].animate.set_opacity(1), run_time=0.2)
        self.play(Create(x90), run_time=0.3)
        self.au_mot("comptée deux fois")
        self.play(Indicate(cartes[0], color=PIEGE, scale_factor=1.05), run_time=0.45)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : 20 villes ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.calcul([("Combien de lignes", WHITE, "combien de lignes")], 2.55, centre=0, fs=46)
        pts, vs = villes(20, P(0, 0.15), 0.95, 0.055)
        tr = VGroup(*[self.trait(pts[a], pts[b], sw=1.2) for a, b in combinations(range(20), 2)])
        self.calcul([("pour", WHITE, None), ("20 villes ?", RANG, "20")], 1.9, centre=0, fs=46,
                    avec=[LaggedStart(*[GrowFromCenter(v) for v in vs], lag_ratio=0.03)])
        self.play(LaggedStart(*[Create(t) for t in tr], lag_ratio=0.004), run_time=0.8)
        self.bring_to_front(vs)
        self.appel_commentaire(-1.95)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
