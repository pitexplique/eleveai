# suite_auxiliaire.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Suite auxiliaire : la
# méthode du bac » (16:9), ceinture BLEUE. Série SUITES, épisode 27 (le dernier
# de 1re). Micro du coach : suite_auxiliaire (lib/tutor-v4/questionBank/
# premiere-spe/maths/suites.bank.ts + suites-renfort.ts : la valeur d'équilibre L
# telle que L = aL + b, vₙ = uₙ − L géométrique de raison a, v₀ = u₀ − L,
# vₙ = v₀ × aⁿ puis uₙ = vₙ + L, la limite par aⁿ).
#
# Ce que demande le coach → écran :
#   · L = aL + b (auxL)                                        → 03, 04 ;
#   · vₙ₊₁ = a vₙ : la raison de v est a (auxRaison, auxEtape)  → 05, 08 ;
#   · v₀ = u₀ − L (auxV0)                                       → 06, 07 ;
#   · vₙ = v₀ × aⁿ, puis uₙ = vₙ + L (auxExpr, terme)           → 06, 08, défi ;
#   · la limite : aⁿ → 0 si 0 < a < 1 (limite)                  → 09, défi.
# Clé de voix → écran :
#   00-garde (uₙ → × a → + b → uₙ₊₁ ?) · 01 Manon, technicienne forestière :
#   5 000 arbres, on coupe 10 %, on plante 300 · 02 uₙ₊₁ = 0,9 × uₙ + 300, ni
#   arithmétique ni géométrique · 03 étape 1 : L = 0,9L + 300 → L = 3 000 (la
#   balance s'équilibre) · 04/04b question (B : 16) · 05 étape 2 : vₙ = uₙ − 3 000,
#   le calcul aligné → vₙ₊₁ = 0,9 vₙ · 06 étape 3 : v₀ = 2 000, vₙ, uₙ (le nuage
#   des v, relevé de 3 000) · 07/07b question (C : −6) · 08 le piège (0,9, pas
#   300 ; + 3 000 à la fin) · 09 étape 4 : la limite 3 000, u₁₀ ≈ 3 697 ·
#   10/10b défi (uₙ₊₁ = 3uₙ − 4 → uₙ = 3 × 3ⁿ + 2 → +∞) · 11 « Ce que tu as
#   appris » · 12 fin.
# Code couleur (module commun) : bleu = les termes uₙ, orange = a, b, la raison
# et les écarts vₙ, vert = juste (l'équilibre), rouge = le piège.
# Voix : manim/voix/premiere-spe-suite-auxiliaire.json (débit −6), calée mot à mot
# par suite_auxiliaire_marques.json.
# Contrôle : AUDIT=1 BORDS=1 BORDS6=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_auxiliaire.py SuiteAuxiliaire1reSpe -o eleveai-maths-premiere-spe-suite-auxiliaire --media_dir manim/scripts/premiere/media-suite-auxiliaire
# Sortie : manim/sorties/premiere-spe/maths/suites/27-auxiliaire/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : boutons_ligne)
from suite_variation_spe import Bords6 as Bords6Objets  # noqa: E402  (ép. 23 : 6 %, tout objet)
from suite_somme_geo import Bords6Cases  # noqa: E402  (ép. 25 : 6 %, textes, morceaux, cadres, cases)
from suite_sommes import OutilsSommes, SuiteSommes1reSpe as _Sommes  # noqa: E402  (ép. 24 : indices, finale)
from suite_limite_spe import Repere  # noqa: E402  (ép. 26 : le repère, rien ne touche un axe)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
proche = lambda a, b, e=1e-6: abs(a - b) < e  # noqa: E731
FORET = [5000.0]
for _ in range(14):
    FORET.append(0.9 * FORET[-1] + 300)
assert proche(0.9 * 3000 + 300, 3000) and proche(300 / 0.1, 3000)                       # 03
assert proche(0.5 * 16 + 8, 16) and proche(8 / 0.5, 16)                                  # question 1 : B
assert proche(0.9 * 3000, 2700) and proche(300 - 3000, -2700)                            # 05
assert all(proche(FORET[n], 2000 * 0.9 ** n + 3000) for n in range(15))                  # 06
assert 10 - 16 == -6                                                                     # question 2 : C
assert round(2000 * 0.9 ** 10 + 3000) == 3697                                            # 09
assert 2 == 3 * 2 - 4 and 5 - 2 == 3 and 3 * 5 - 4 == 11 == 3 * 3 + 2                     # défi
assert all(3 * 3 ** n + 2 == (lambda k: [5, 11, 29, 83, 245][k])(n) for n in range(5))   # défi : uₙ = 3 × 3ⁿ + 2

PEAU, CHEVEUX = "#c68642", "#1f1300"
VERT_ARBRE, VERT_JEUNE, TRONC = "#15803D", "#4ADE80", "#92400E"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def manon(s=1.0):
    """Manon, technicienne forestière : casque orange, veste verte, gilet à bandes."""
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.25, fill_color="#166534", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    bandes = VGroup(*[Rectangle(width=0.9, height=0.07, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
                      .move_to(P(0, y)) for y in (0.05, -0.2)])
    tresse = RoundedRectangle(width=0.16, height=0.5, corner_radius=0.07, fill_color=CHEVEUX, fill_opacity=1,
                              stroke_width=0).move_to(P(0.27, 0.78))
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    casque = Sector(radius=0.31, angle=PI, start_angle=0, fill_color=RAISON, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.18))
    bord = RoundedRectangle(width=0.72, height=0.07, corner_radius=0.03, fill_color=RAISON, fill_opacity=1,
                            stroke_width=0).move_to(P(0, 1.08))
    return VGroup(tresse, corps, bandes, tete, casque, bord).scale(s)


def arbre(s=1.0, couleur=VERT_ARBRE):
    """Un sapin : le tronc, deux étages de feuillage."""
    tronc = Rectangle(width=0.09, height=0.14, fill_color=TRONC, fill_opacity=1, stroke_width=0).move_to(P(0, -0.2))
    bas = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale_to_fit_width(0.4).move_to(P(0, -0.04))
    haut = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale_to_fit_width(0.3).move_to(P(0, 0.12))
    return VGroup(tronc, bas, haut).scale(s)


def foret(centre, cols=10, rangs=5, pas_x=0.62, pas_y=0.56, s=1.0):
    """50 sapins en rangs (1 sapin dessiné = 100 arbres) ; renvoie (VGroup, places)."""
    c = np.array(centre, dtype=float)
    places = [P(c[0] + (k - (cols - 1) / 2) * pas_x, c[1] + ((rangs - 1) / 2 - r) * pas_y)
              for r in range(rangs) for k in range(cols)]
    return VGroup(*[arbre(s).move_to(p) for p in places]), places


def balance(centre, larg=3.0, angle=0.0, haut=1.5, coul=GREY_A):
    """Une balance : socle, pied, fléau incliné de `angle`, deux plateaux qui
    pendent. Renvoie le dessin ; g.plateaux = les centres des deux plateaux."""
    c = np.array(centre, dtype=float)
    pivot = c + UP * haut
    socle = Polygon(c + LEFT * 0.45, c + RIGHT * 0.45, c + UP * 0.25, fill_color=coul, fill_opacity=1, stroke_width=0)
    pied = Line(c, pivot, stroke_color=coul, stroke_width=6)
    d = np.array([np.cos(angle), np.sin(angle), 0]) * larg / 2
    g_, d_ = pivot - d, pivot + d
    fleau = Line(g_, d_, stroke_color=coul, stroke_width=7)
    axe = Dot(pivot, radius=0.09, color=coul)
    g = VGroup(socle, pied, fleau, axe)
    g.plateaux = []
    for e in (g_, d_):
        p = e + DOWN * 0.75
        g.add(Line(e, p + LEFT * 0.42, stroke_color=coul, stroke_width=2.5),
              Line(e, p + RIGHT * 0.42, stroke_color=coul, stroke_width=2.5),
              Line(p + LEFT * 0.55, p + RIGHT * 0.55, stroke_color=coul, stroke_width=7))
        g.plateaux.append(p)
    return g


def machine(centre, a_txt, b_txt, ligne, fs=40, ecart=2.6, vertical=False):
    """uₙ → × a → + b → uₙ₊₁ : deux cases (des lignes à vrais indices), deux
    flèches et leurs étiquettes orange. ligne = self.ligne. Renvoie g (g.c1,
    g.f1, g.e1, g.noeud, g.f2, g.e2, g.c2)."""
    c = np.array(centre, dtype=float)
    dirn = DOWN if vertical else RIGHT
    g = VGroup()
    cases = []
    for k, nom in enumerate(("u_{n}", "u_{n + 1}")):
        t, _ = ligne([(nom, TERME, None)], fs)
        cadre = RoundedRectangle(width=t.width + 0.5, height=t.height + 0.4, corner_radius=0.12, stroke_color=TERME,
                                 stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        cases.append(VGroup(cadre, t.move_to(cadre)))
    cases[0].move_to(c - dirn * ecart)
    cases[1].move_to(c + dirn * ecart)
    noeud = Dot(c, radius=0.08, color=RAISON)
    f1 = Arrow(cases[0].get_critical_point(dirn), c - dirn * 0.12, buff=0.12, color=RAISON, stroke_width=5,
               max_tip_length_to_length_ratio=0.2)
    f2 = Arrow(c + dirn * 0.12, cases[1].get_critical_point(-dirn), buff=0.12, color=RAISON, stroke_width=5,
               max_tip_length_to_length_ratio=0.2)
    cote = RIGHT if vertical else UP
    e1 = Text(a_txt, font_size=fs, color=RAISON).next_to(f1, cote, buff=0.14)
    e2 = Text(b_txt, font_size=fs, color=RAISON).next_to(f2, cote, buff=0.14)
    g.add(cases[0], f1, e1, noeud, f2, e2, cases[1])
    g.c1, g.f1, g.e1, g.noeud, g.f2, g.e2, g.c2 = cases[0], f1, e1, noeud, f2, e2, cases[1]
    return g


class OutilsAuxiliaire:
    """Les outils de l'épisode (paysage ET short)."""

    def ecrire_eq(self, morceaux, y, x_eq, fs=56, avec=(), avec_part=None, run_time=0.3):
        """Une ligne de calcul dont le « = » (le premier morceau qui commence par
        « = ») est en x = x_eq : les étapes d'un calcul s'alignent sur leur « = »."""
        g = self.construire([morceaux], fs)
        i = next(k for k, m in enumerate(morceaux) if m[0].strip().startswith("="))
        g.move_to(P(0, y))
        eg = g.seq[i][0]
        g.shift(RIGHT * (x_eq - (eg[0].get_center()[0] if len(eg) else eg.get_center()[0])))
        for k, an in (avec_part or {}).items():
            p, ex, a0 = g.seq[k]
            g.seq[k] = (p, ex, a0 + list(an))
        self.jouer_seq(g.seq, avec, run_time)
        g.parts = [s[0] for s in g.seq]
        return g


class SuiteAuxiliaire1reSpe(Bords6Cases, Bords6Objets, OutilsAuxiliaire, AuditMilliers, OutilsSommes, OutilsEp12,
                            OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_auxiliaire_marques.json"
    nom_voix = "premiere-spe-suite-auxiliaire"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "bleue"
    largeur_texte = 12.0          # 6 % de marge latérale (rien au-delà de x = ±6,25)
    k_allumer = 1.06
    place_coche = 0.7
    boutons_ligne = _E16.boutons_ligne
    finale = _Sommes.finale       # ép. 24 : la coche centrée sur la première ligne

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Suite auxiliaire", 64, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au_mot("Suite auxiliaire")
        self.play(Write(tit), run_time=0.7)
        sub = self.t("la méthode du bac", 42, TERME).move_to(P(0, tit.get_bottom()[1] - 0.48))
        self.au_mot("la méthode du bac")
        self.play(FadeIn(sub, shift=UP * 0.1), run_time=0.35)
        y1 = sub.get_bottom()[1] - 0.6
        m = machine(P(-0.6, -1.05), "× a", "+ b", self.ligne, fs=40, ecart=2.3)
        q = self.t("= ?", 48, RAISON, audit=False).next_to(m.c2, RIGHT, buff=0.25)
        self.ecrire([[("Comment trouver la formule de", WHITE, "Comment trouver"), ("u_{n}", TERME, "u indice n")]], y1,
                    fs=42, avec=[FadeIn(m.c1, scale=0.8)])
        self.ecrire([[("quand on", WHITE, "quand on"), ("multiplie", RAISON, "multiplie"), ("ET", WHITE, "ET"),
                      ("on ajoute ?", RAISON, "on ajoute")]], y1 - 0.68, fs=42,
                    avec_part={1: [GrowArrow(m.f1), FadeIn(m.e1, scale=1.3), FadeIn(m.noeud)],
                               3: [GrowArrow(m.f2), FadeIn(m.e2, scale=1.3), FadeIn(m.c2, scale=0.8)]})
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y1 - 1.42))
        self.play(FadeIn(ident), FadeIn(q, scale=1.4), run_time=0.4)
        self.play(Indicate(q, color=RAISON, scale_factor=1.3), run_time=0.5)
        self.attendre_voix(marge=0.9)

    # ── 01 : Manon, technicienne forestière : 5 000 arbres ────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.55
        pers = manon(0.95).move_to(P(x, 2.1))
        nom = self.t("Manon", 44, JAUNE_TITRE).move_to(P(x, 0.68))
        met = VGroup(self.t("technicienne", 32, TERME), self.t("forestière", 32, TERME)).arrange(DOWN, buff=0.1)
        met.move_to(P(x, -0.2))
        self.au_mot("Manon")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("technicienne forestière")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        xp = 1.35
        arbres, places = foret(P(xp, -0.85))
        self.ecrire([[("Une forêt :", WHITE, "Une forêt"), ("5 000 arbres", TERME, "5 000")]], 2.95, centre=xp, fs=46,
                    larg=7.6, avec_part={0: [LaggedStart(*[FadeIn(a, scale=0.6) for a in arbres], lag_ratio=0.02)]})
        coupes = [3, 16, 22, 37, 48]
        self.ecrire([[("Chaque année,", WHITE, "Chaque année"), ("on coupe 10 %,", RAISON, "10")]], 2.2, centre=xp,
                    fs=42, larg=7.6, avec_part={1: [arbres[i].animate.set_color(RAISON) for i in coupes]})
        self.play(*[Rotate(arbres[i], -PI / 2, about_point=arbres[i].get_bottom()) for i in coupes], run_time=0.5)
        self.play(*[FadeOut(arbres[i]) for i in coupes], run_time=0.3)
        jeunes = [arbre(0.8, VERT_JEUNE).move_to(places[i]) for i in (3, 22, 37)]
        self.ecrire([[("puis Manon en plante", WHITE, "puis Manon"), ("300.", JUSTE, "300")]], 1.5, centre=xp, fs=42,
                    larg=7.6, avec=[LaggedStart(*[GrowFromEdge(j, DOWN) for j in jeunes], lag_ratio=0.25)])
        q = self.paragraphe([("La forêt", JAUNE_TITRE), ("va-t-elle", JAUNE_TITRE), ("disparaître ?", JAUNE_TITRE)], 36,
                            buff=0.14, y=-1.95)
        q.set_x(x)
        self.au_mot("La forêt va-t-elle")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.play(Indicate(q, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 02 : le modèle : uₙ₊₁ = 0,9 × uₙ + 300 ──────────────────────────────

    def ecran_modele(self):
        self.nouvel_ecran("02-modele")
        self.ecrire([[("u_{n}", TERME, "u indice n"), ("= le nombre d'arbres après n années", WHITE, "le nombre")]],
                    2.95, fs=44)
        self.ecrire([[("u_{0} =", TERME, "u indice 0"), ("5 000", WHITE, "5 000")]], 2.05, fs=52)
        m = machine(P(0, 0.75), "× 0,9", "+ 300", self.ligne, fs=46, ecart=4.1)
        s1 = self.t("couper 10 %", 32, GREY_A).next_to(m.f1, DOWN, buff=0.22)
        s2 = self.t("on ajoute", 32, GREY_A).next_to(m.f2, DOWN, buff=0.22)
        self.au_mot("Couper")
        self.play(FadeIn(m.c1, scale=0.8), run_time=0.3)
        self.suivre("10")
        self.play(FadeIn(s1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("multiplier par")
        self.play(GrowArrow(m.f1), run_time=0.3)
        self.suivre("0,9")
        self.play(FadeIn(m.e1, scale=1.3), FadeIn(m.noeud), run_time=0.25)
        self.au_mot("puis on ajoute")
        self.play(GrowArrow(m.f2), FadeIn(s2, shift=UP * 0.1), run_time=0.3)
        self.suivre("300")
        self.play(FadeIn(m.e2, scale=1.3), FadeIn(m.c2, scale=0.8), run_time=0.3)
        f = self.ecrire([[("u_{n + 1} =", TERME, "u indice n plus 1"), ("0,9", RAISON, "0,9 fois"), ("×", WHITE, None),
                          ("u_{n}", TERME, None), ("+ 300", RAISON, "plus 300")]], -1.05, fs=62)
        self.play(Create(self.encadre(f, JAUNE_TITRE, 0.2)), Indicate(m.c2, color=TERME, scale_factor=1.1), run_time=0.4)
        self.ecrire([[("Cette suite n'est", WHITE, "Cette suite"), ("ni arithmétique,", RAISON, "ni arithmétique"),
                      ("ni géométrique.", RAISON, "ni géométrique")]], -2.35, centre=-0.5, fs=46, larg=10.8)
        self.attendre_voix(marge=0.5)

    # ── 03 : étape 1 : la valeur d'équilibre L = 3 000 ───────────────────

    def ecran_point_fixe(self):
        self.nouvel_ecran("03-point-fixe")
        self.titre("Étape 1 : la valeur d'équilibre", JAUNE_TITRE, 46, extrait="1 : la valeur", y=3.2)
        ang = 0.2
        bal = balance(P(3.85, -2.35), larg=3.0, angle=ang, haut=2.4)
        lab = [self.t("× 0,9", 40, RAISON), self.t("+ 300", 40, RAISON)]
        for l_, p in zip(lab, bal.plateaux):
            l_.move_to(p + DOWN * 0.42)
        xe = -3.0
        self.ecrire([[("On cherche L tel que :", WHITE, "On cherche")]], 2.2, centre=-2.4, fs=42, larg=6.8,
                    avec=[FadeIn(bal)])
        self.ecrire_eq([("L", TERME, "L égale"), ("=", WHITE, None), ("0,9", RAISON, "0,9"), ("L", TERME, None),
                        ("+ 300", RAISON, "300")], 1.1, xe, fs=62,
                       avec_part={2: [FadeIn(lab[0], scale=1.3)], 4: [FadeIn(lab[1], scale=1.3)]})
        self.ecrire_eq([("0,1", RAISON, "0,1"), ("L", TERME, None), ("=", WHITE, None), ("300", RAISON, "300")], -0.2,
                       xe, fs=62)
        r = self.ecrire_eq([("L", TERME, "et L"), ("=", WHITE, None), ("3 000", JUSTE, "3 000")], -1.55, xe, fs=68)
        bal2 = balance(P(3.85, -2.35), larg=3.0, angle=0.0, haut=2.4)
        self.boite(r.parts[-1:])
        self.play(Transform(bal, bal2), *[l_.animate.move_to(p + DOWN * 0.42) for l_, p in zip(lab, bal2.plateaux)],
                  run_time=0.6)
        self.play(*[l_.animate.set_color(JUSTE) for l_ in lab], Indicate(bal, color=JUSTE, scale_factor=1.04),
                  run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : uₙ₊₁ = 0,5 × uₙ + 8 → B (16) ─────────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["8", "16", "4"], largeur=3.6, fs=56, y=-0.35, pas=3.9)

        def e1():
            self.ecrire([[("Avec", WHITE, "Avec"), ("u_{n + 1} =", TERME, "u indice n plus 1"), ("0,5", RAISON, "0,5 fois"),
                          ("×", WHITE, None), ("u_{n}", TERME, None), ("+ 8,", RAISON, "8")]], 2.15, fs=56)
            self.ecrire([[("la valeur d'équilibre", WHITE, "la valeur"), ("L", TERME, None), ("vaut :", WHITE, "vaut")]],
                        1.1, fs=46)

        q = self.question_libre("04-question", [e1], cartes, P(0, -1.75))
        self.dire("04b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        self.ecrire([[("L =", TERME, "L égale"), ("0,5", RAISON, "0,5 L"), ("L", TERME, None), ("+ 8,", WHITE, "8"),
                      ("donc", WHITE, "donc"), ("0,5", RAISON, "0,5 L"), ("L", TERME, None), ("= 8", WHITE, "8")]],
                    -1.7, fs=50)
        r = self.ecrire([[("L =", TERME, "et L"), ("16", JUSTE, "16")]], -2.8, fs=56)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.6)

    # ── 05 : étape 2 : vₙ = uₙ − 3 000 est géométrique ─────────────────────

    def ecran_auxiliaire(self):
        self.nouvel_ecran("05-auxiliaire")
        self.titre("Étape 2", JAUNE_TITRE, 46, extrait="2 :", y=3.2)
        pose = self.ecrire([[("On pose", WHITE, "on pose"), ("v_{n}", RAISON, "v indice n"), ("=", WHITE, None),
                             ("u_{n}", TERME, "u indice n"), ("− 3 000 :", WHITE, "3 000"),
                             ("l'écart à l'équilibre", RAISON, "l'écart")]], 2.3, fs=50)
        xe, fs = -3.0, 48
        self.ecrire_eq([("v_{n + 1}", RAISON, "Alors v"), ("=", WHITE, None), ("u_{n + 1}", TERME, "u indice n plus 1"),
                        ("− 3 000", WHITE, "3 000")], 1.25, xe, fs=fs)
        self.ecrire_eq([("=", WHITE, "égale 0,9"), ("0,9", RAISON, None), ("u_{n}", TERME, None),
                        ("+ 300", WHITE, "plus 300"), ("− 3 000", WHITE, "3 000")], 0.38, xe, fs=fs)
        self.ecrire_eq([("=", WHITE, "égale 0,9 u indice n moins"), ("0,9", RAISON, None), ("u_{n}", TERME, None),
                        ("− 2 700", WHITE, "2 700")], -0.49, xe, fs=fs)
        r4 = self.ecrire_eq([("=", WHITE, "égale 0,9 fois"), ("0,9 ×", RAISON, None),
                             ("(u_{n} − 3 000)", WHITE, "u indice n moins 3 000")], -1.36, xe, fs=fs)
        par = r4.parts[-1]
        r5 = self.ecrire([[("Donc", WHITE, "Donc"), ("v_{n + 1} =", RAISON, "v indice n plus 1"), ("0,9", RAISON, "0,9 v"),
                           ("v_{n}", RAISON, None), (":", WHITE, None)]], -2.3, centre=-0.6, fs=52, larg=10.6,
                         avec_part={0: [par.animate.set_color(RAISON), Indicate(pose, color=RAISON, scale_factor=1.06)]})
        r6 = self.ecrire([[("la suite v est géométrique,", JUSTE, "géométrique"), ("de raison 0,9", JUSTE, "de raison")]],
                         -3.0, centre=-0.6, fs=46, larg=10.6)
        self.play(Create(self.encadre(VGroup(r5, r6), JUSTE, 0.14)), run_time=0.35)
        self.attendre_voix(marge=0.5)

    # ── 06 : étape 3 : v₀, vₙ, puis uₙ = vₙ + 3 000 ─────────────────────────

    def ecran_formule(self):
        self.nouvel_ecran("06-formule")
        self.titre("Étape 3", JAUNE_TITRE, 46, extrait="3 :", y=3.2)
        rp = Repere((0, 10), (0, 5000), P(2.95, -0.75), P(5.6, 2.35), grad_u=(1000, 3000, 5000), grad_n=(5, 10), fs=26)
        xe, fs = -4.6, 46
        self.ecrire_eq([("v_{0}", RAISON, "v indice 0"), ("=", WHITE, None), ("5 000", WHITE, "5 000"),
                        ("− 3 000", WHITE, "3 000")], 2.35, xe, fs=fs, avec=[FadeIn(rp)])
        self.ecrire_eq([("=", WHITE, None), ("2 000", RAISON, "2 000")], 1.6, xe, fs=fs)
        vs = [rp.point(n, 2000 * 0.9 ** n, RAISON) for n in range(11)]
        self.ecrire_eq([("v_{n}", RAISON, "Donc v indice n"), ("=", WHITE, None), ("2 000", RAISON, "2 000"),
                        ("×", WHITE, None), ("0,9ⁿ", RAISON, "0,9 puissance n")], 0.8, xe, fs=fs,
                       avec=[LaggedStart(*[GrowFromCenter(p) for p in vs], lag_ratio=0.12)])
        us = [rp.point(n, 2000 * 0.9 ** n + 3000, TERME) for n in range(11)]
        fl = Arrow(vs[3].get_center(), us[3].get_center(), buff=0.12, color=TERME, stroke_width=4,
                   max_tip_length_to_length_ratio=0.15)
        plus = self.t("+ 3 000", 30, TERME).next_to(fl, RIGHT, buff=0.14)
        cops = [v.copy() for v in vs]
        self.add(*cops)
        self.ecrire_eq([("u_{n}", TERME, "comme u indice n"), ("=", WHITE, None), ("v_{n}", RAISON, None),
                        ("+ 3 000", TERME, "3 000")], 0.0, xe, fs=fs,
                       avec=[GrowArrow(fl), FadeIn(plus, scale=1.2),
                             *[c.animate.move_to(w.get_center()).set_color(TERME) for c, w in zip(cops, us)]], run_time=0.6)
        r = self.ecrire([[("u_{n}", TERME, "u indice n égale 2 000"), ("=", WHITE, None), ("2 000", RAISON, None),
                          ("× 0,9ⁿ", RAISON, "0,9 puissance n"), ("+ 3 000", TERME, "plus 3 000")]], -1.95, centre=-0.6,
                        fs=58, larg=10.6)
        self.play(Create(self.encadre(r, JAUNE_TITRE, 0.2)), *[Indicate(p, color=TERME) for p in cops[:3]], run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : v₀ = u₀ − L = 10 − 16 → C (−6) ───────────

    def ecran_question2(self):
        cartes = self.boutons_ligne(["−16", "26", "−6"], largeur=3.6, fs=56, y=-0.6, pas=3.9)

        def e1():
            self.ecrire([[("u_{0} =", TERME, "u indice 0"), ("10,", WHITE, "10"), ("u_{n + 1} =", TERME, "u indice n plus 1"),
                          ("0,5", RAISON, "0,5"), ("u_{n}", TERME, None), ("+ 8", RAISON, "8")]], 2.2, fs=52)
            self.ecrire([[("et", WHITE, "et v"), ("v_{n} =", RAISON, None), ("u_{n}", TERME, None),
                          ("− 16.", WHITE, "16")]], 1.38, fs=52)
            self.ecrire([[("Combien vaut", WHITE, "Combien vaut"), ("v_{0} ?", RAISON, None)]], 0.55, fs=46)

        q = self.question_libre("07-question", [e1], cartes, P(0, -1.9))
        self.dire("07b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        xe = -1.3
        self.ecrire_eq([("v_{0}", RAISON, "v indice 0 égale"), ("=", WHITE, None), ("u_{0}", TERME, "u indice 0 moins"),
                        ("− L", TERME, None)], -1.95, xe, fs=52)
        r = self.ecrire_eq([("=", WHITE, "10 moins"), ("10", WHITE, None), ("− 16", WHITE, "16"),
                            ("=", WHITE, "égale moins 6"), ("−6", JUSTE, None)], -2.9, xe, fs=52)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : la raison, c'est 0,9 ; et on rajoute L à la fin ───

    def ecran_piege(self):
        self.nouvel_ecran("08-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        fo = self.construire([[("u_{n + 1} =", TERME, None), ("0,9", RAISON, None), ("×", WHITE, None),
                               ("u_{n}", TERME, None), ("+ 300", WHITE, None)]], 60)
        fo.move_to(P(0, 2.15))
        fp = [s[0] for s in fo.seq]
        bon = self.encadre(fp[1], JUSTE, 0.12)
        croix = self.barrer(fp[4])
        self.ecrire([[("La raison de v est", WHITE, "La raison"), ("0,9 :", JUSTE, "0,9")]], 1.15, fs=46,
                    avec_part={0: [FadeIn(fp[0], shift=UP * 0.1)], 1: [FadeIn(fp[1], shift=UP * 0.1)]})
        self.ecrire([[("le coefficient devant", WHITE, "le coefficient"), ("u_{n},", TERME, None),
                      ("pas 300 !", PIEGE, "pas 300")]], 0.52, fs=46,
                    avec_part={0: [FadeIn(fp[2]), FadeIn(fp[3]), Create(bon)],
                               2: [FadeIn(fp[4], shift=UP * 0.1), Create(croix)]})
        self.play(Create(Line(P(-5.6, -0.02), P(5.6, -0.02), stroke_width=3, color=GREY_B)), run_time=0.3)
        self.ecrire([[("Et on n'oublie pas de rajouter", JAUNE_TITRE, "Et on n'oublie"), ("L", TERME, "rajouter L"),
                      ("à la fin :", JAUNE_TITRE, "à la fin")]], -0.62, fs=46)
        ok = self.ecrire([[("u_{n} =", TERME, "u indice n égale"), ("v_{n}", RAISON, None), ("+ 3 000", TERME, "3 000")]],
                         -1.7, centre=-3.0, fs=58, larg=5.6)
        self.play(Create(self.encadre(ok, JUSTE, 0.18)), run_time=0.3)
        ko = self.ecrire([[("u_{n} =", TERME, "pas v"), ("v_{n}", RAISON, None)]], -1.7, centre=2.4, fs=58, larg=4.0)
        self.ecrire([[("pas", PIEGE, None), ("v_{n}", RAISON, None), ("tout seul !", PIEGE, "tout seul")]], -2.72,
                    centre=2.4, fs=42, larg=4.6, avec=[Create(self.barrer(ko))])
        self.attendre_voix(marge=0.5)

    # ── 09 : étape 4 : la limite : 3 000 arbres ────────────────────────────

    def ecran_limite(self):
        self.nouvel_ecran("09-limite")
        self.titre("Étape 4 : la limite", JAUNE_TITRE, 46, extrait="4 : la limite", y=3.2)
        rp = Repere((0, 12), (0, 5000), P(1.85, -1.25), P(5.45, 1.95), grad_u=(1000, 3000, 5000), grad_n=(5, 10), fs=26)
        pts = [rp.point(n, FORET[n]) for n in range(13)]
        self.play(FadeIn(rp), LaggedStart(*[GrowFromCenter(p) for p in pts], lag_ratio=0.08), run_time=0.9)
        xc, lc = -3.15, 5.9
        self.ecrire([[("0,9", RAISON, "0,9 est"), ("est entre", WHITE, None), ("0", WHITE, "entre 0"),
                      ("et 1 :", WHITE, "et 1")]], 2.3, centre=xc, fs=44, larg=lc)
        self.ecrire([[("0,9ⁿ", RAISON, "0,9 puissance n"), ("→ 0", JUSTE, "tend vers 0")]], 1.5, centre=xc, fs=60,
                    larg=lc)
        dr = rp.droite(3000)
        r = self.ecrire([[("donc", WHITE, "Donc u"), ("u_{n}", TERME, None), ("→ 3 000", JUSTE, "3 000")]], 0.5,
                        centre=xc, fs=52, larg=lc, avec=[Create(dr)])
        self.play(Create(self.encadre(r, JUSTE, 0.16)), Indicate(dr, color=JUSTE), run_time=0.4)
        self.ecrire([[("La forêt ne disparaît pas :", JAUNE_TITRE, "La forêt ne")]], -0.5, centre=xc, fs=38, larg=lc)
        self.ecrire([[("elle se stabilise", WHITE, "elle se stabilise")]], -1.05, centre=xc, fs=38, larg=lc)
        self.ecrire([[("autour de", WHITE, "autour"), ("3 000 arbres.", JUSTE, "3 000 arbres")]], -1.6, centre=xc, fs=38,
                    larg=lc)
        self.ecrire([[("Après 10 ans :", WHITE, "Après 10 ans"), ("u_{10} =", TERME, None), ("2 000 × 0,9¹⁰", RAISON, "2 000 fois"),
                      ("+ 3 000", TERME, "plus 3 000"), ("≈ 3 697", JUSTE, "3 697")]], -2.6, centre=-0.45, fs=46,
                    larg=11.4, avec_part={0: [Indicate(pts[10], color=JAUNE_TITRE, scale_factor=2.2)]})
        self.play(Indicate(pts[10], color=JUSTE, scale_factor=2.0), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 10 : le défi : u₀ = 5, uₙ₊₁ = 3uₙ − 4 ──────────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("10-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        xg, lg = -1.45, 8.7
        carte = self.carte(2.4, 4.3, P(4.75, 0.55), RAISON)
        m = machine(P(4.45, 0.55), "× 3", "− 4", self.ligne, fs=40, ecart=1.45, vertical=True)
        l1 = self.ecrire([[("u_{0} =", TERME, "u indice 0"), ("5", WHITE, "5"),
                           ("et, pour tout entier naturel n :", WHITE, "pour tout")]], 2.3, centre=xg, fs=42, larg=lg,
                         avec=[FadeIn(carte), FadeIn(m.c1, scale=0.8)])
        l2 = self.ecrire([[("u_{n + 1} =", TERME, "u indice n plus 1"), ("3", RAISON, "3"), ("u_{n}", TERME, None),
                           ("− 4", RAISON, "4")]], 1.35, centre=xg, fs=62, larg=lg,
                         avec_part={1: [GrowArrow(m.f1), FadeIn(m.e1, scale=1.3), FadeIn(m.noeud)],
                                    3: [GrowArrow(m.f2), FadeIn(m.e2, scale=1.3), FadeIn(m.c2, scale=0.8)]})
        xb = -5.55
        b1 = self.ecrire([[("•", RAISON, "Trouve"), ("Trouve", WHITE, None), ("L ;", TERME, None)]], 0.3, fs=44,
                         larg=lg, gauche=xb)
        b2 = self.ecrire([[("•", RAISON, "montre que"), ("montre que", WHITE, None), ("v_{n} = u_{n} − L", RAISON, "v indice n")]],
                         -0.38, fs=44, larg=lg, gauche=xb)
        b2b = self.ecrire([[("est géométrique ;", WHITE, "est géométrique")]], -0.98, fs=44, larg=lg, gauche=xb + 0.42)
        b3 = self.ecrire([[("•", RAISON, "puis donne"), ("donne", WHITE, None), ("u_{n}", TERME, None),
                           ("et sa limite.", WHITE, "et sa limite")]], -1.66, fs=44, larg=lg, gauche=xb)
        self.defi_pause(-2.6, x=-0.6)
        self._defi = (tit, [l1, l2, b1, b2, b2b, b3, carte, m])

    def ecran_correction(self):
        self.dire("10b-correction")
        tit, efface = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(x) for x in efface], run_time=0.45)
        self.remove(*efface)
        xg, lg = -3.45, 5.6
        r0 = self.ecrire([[("L =", TERME, "L égale"), ("3", RAISON, "3 L"), ("L", TERME, None), ("− 4", WHITE, "4"),
                           ("donne", WHITE, "donne"), ("L = 2", JUSTE, "L égale 2")]], 2.3, centre=xg, fs=46, larg=lg)
        self.boite(r0.parts[-1:])
        xe, fs = -4.15, 44
        self.ecrire_eq([("v_{n + 1}", RAISON, "v indice n plus 1"), ("=", WHITE, None), ("3", RAISON, "3 u"),
                        ("u_{n}", TERME, None), ("− 4 − 2", WHITE, "moins 4 moins 2")], 1.42, xe, fs=fs)
        self.ecrire_eq([("=", WHITE, "égale 3 u"), ("3", RAISON, None), ("u_{n}", TERME, None), ("− 6", WHITE, "6")], 0.62,
                       xe, fs=fs)
        r3 = self.ecrire_eq([("=", WHITE, "égale 3 fois"), ("3 ×", RAISON, None), ("(u_{n} − 2)", WHITE, "u indice n moins 2")],
                            -0.18, xe, fs=fs)
        self.ecrire_eq([("=", WHITE, "égale 3 v"), ("3", RAISON, None), ("v_{n}", RAISON, None)], -0.98, xe, fs=fs,
                       avec=[r3.parts[-1].animate.set_color(RAISON)])
        self.ecrire([[("géométrique de raison 3", JUSTE, "géométrique")]], -1.75, centre=xg, fs=42, larg=lg)
        xd, ld = 3.45, 4.9
        self.ecrire([[("v_{0} =", RAISON, "v indice 0"), ("5", WHITE, "5"), ("− 2", WHITE, "2"), ("= 3", RAISON, "égale 3")]],
                    1.42, centre=xd, fs=48, larg=ld)
        f = self.ecrire([[("u_{n} =", TERME, "Donc u indice n"), ("3 × 3ⁿ", RAISON, "3 fois 3 puissance"),
                          ("+ 2", TERME, "plus 2")]], 0.5, centre=xd, fs=56, larg=ld)
        self.play(Create(self.encadre(f, JAUNE_TITRE, 0.18)), run_time=0.3)
        self.ecrire([[("3", RAISON, "3 est"), ("> 1", WHITE, "que 1"), ("et", WHITE, None),
                      ("v_{0} > 0 :", RAISON, "v indice 0 est positif")]], -0.45, centre=xd, fs=46, larg=ld)
        lim = self.ecrire([[("u_{n}", TERME, "u indice n tend"), ("→ +∞", JUSTE, "plus l'infini")]], -1.3, centre=xd,
                          fs=56, larg=ld)
        self.play(Create(self.encadre(lim, JUSTE, 0.16)), run_time=0.3)
        v = self.ecrire([[("On vérifie :", WHITE, "On vérifie"), ("u_{1} = 11,", TERME, "11"), ("et", WHITE, "et 3"),
                          ("3 × 3", WHITE, None), ("+ 2", WHITE, "plus 2"), ("= 11", JUSTE, "égale 11")]], -2.6,
                        centre=-1.0, fs=44, larg=9.6)
        ok = self.coche(JUSTE, 0.22).next_to(v, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 44

        def L(m):
            return self.construire([m], fs)
        p1 = [L([("Pour", WHITE, None), ("u_{n + 1} =", TERME, None), ("a", RAISON, None), ("u_{n}", TERME, None),
                 ("+ b,", RAISON, None)]),
              L([("on cherche l'équilibre L tel que", WHITE, None), ("L =", TERME, None), ("a", RAISON, None),
                 ("L", TERME, None), ("+ b.", RAISON, None)])]
        p2 = [L([("On pose", WHITE, None), ("v_{n} =", RAISON, None), ("u_{n}", TERME, None), ("− L :", WHITE, None)]),
              L([("elle est géométrique de raison", WHITE, None), ("a.", RAISON, None)])]
        p3 = [L([("Puis", WHITE, None), ("u_{n} =", TERME, None), ("v_{0}", RAISON, None), ("×", WHITE, None),
                 ("aⁿ", RAISON, None), ("+ L,", TERME, None)]),
              L([("et", WHITE, None), ("aⁿ", RAISON, None), ("donne la limite.", JUSTE, None)])]
        self.finale([(p1, ["Pour u indice n plus 1", "on cherche"]), (p2, ["On pose", "elle est géométrique"]),
                     (p3, ["Puis u indice n", "et a puissance n"])], cle="11-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_modele()
        self.ecran_point_fixe()
        self.ecran_question1()
        self.ecran_auxiliaire()
        self.ecran_formule()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_limite()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("12-abonne")
