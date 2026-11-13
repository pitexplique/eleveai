# suite_somme_geo.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Somme des termes d'une
# suite géométrique » (16:9), ceinture VERTE. Série SUITES, épisode 25.
# Micro du coach : suite_somme_geo (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : 1 + q + … + qⁿ pour q ≠ 1, le nombre de
# termes n + 1, u₀ + … + uₙ avec u₀ en facteur, doubler chaque jour, q = 1 interdit).
#
# Ce que demande le coach → écran :
#   · l'idée de la preuve : S, 2S, on retire S (tout s'annule)                → 02 ;
#   · la formule 1 + q + … + qⁿ = (qⁿ⁺¹ − 1)/(q − 1), q ≠ 1                   → 03, 09 ;
#   · le nombre de termes : n + 1, de q⁰ à qⁿ                                → 03, 04 ;
#   · une somme qui commence à u₀ ≠ 1 : u₀ en facteur                         → 05, défi ;
#   · le piège de l'exposant du haut (un de plus que le dernier)             → 06, 07 ;
#   · le défi : u₀ = 4, q = 3, u₀ + … + u₄ = 484 (et la vérification)        → 08, 08b.
# Clé de voix → écran :
#   00-garde (des nombres qui doublent, « + » entre eux, « = ? ») · 01 Yasmine,
#   épidémiologiste, la grippe : 50 cas, × 2 chaque semaine, 6 semaines ·
#   02 S = 1 + 2 + … + 2⁵, 2S, on retire S → S = 63 · 03 la formule, n + 1
#   termes · 04/04b question (A : 9 termes) · 05 50 en facteur → 3 150 cas ·
#   06 le piège : 2⁶, pas 2⁷ · 07/07b question (B : 1 023) · 08/08b défi
#   (484, vérifié terme à terme) · 09 « Ce que tu as appris » · 10 fin.
# Code couleur (module commun) : bleu = termes, orange = la raison q et les
# exposants, vert = juste, rouge = le piège.
# Voix : manim/voix/premiere-spe-suite-somme-geo.json (débit −6), calée mot à mot
# par suite_somme_geo_marques.json.
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run … (BORD6 : un
# texte, un morceau de calcul ou un cadre à moins de 6 % du bord gauche ou droit).
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_somme_geo.py SuiteSommeGeo1reSpe -o eleveai-maths-premiere-spe-suite-somme-geo --media_dir manim/scripts/premiere/media-suite-somme-geo
# Sortie : manim/sorties/premiere-spe/maths/suites/25-somme-geo/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12 : calcul, barre_lisible)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : calc, boutons_ligne)
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402  (ép. 21 : ligne sans ligature)
from suite_evolution import Bords6  # noqa: E402  (ép. 22 : 6 % de marge, morceaux et cadres compris)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
assert sum(2 ** k for k in range(6)) == 63 == 2 ** 6 - 1                        # 02
assert sum(3 ** k for k in range(9)) == (3 ** 9 - 1) // 2 and len(range(0, 9)) == 9  # question 1 : A (9 termes)
assert sum(50 * 2 ** k for k in range(6)) == 50 * 63 == 3150                    # 05
assert sum(2 ** k for k in range(10)) == 2 ** 10 - 1 == 1023                    # question 2 : B (1 023)
assert 2 ** 11 - 1 == 2047 and 2 ** 10 == 1024                                  # les leurres
assert [4 * 3 ** k for k in range(5)] == [4, 12, 36, 108, 324]                  # défi : la vérification
assert 3 ** 5 - 1 == 242 and 4 * 242 // 2 == 484 == 4 + 12 + 36 + 108 + 324      # défi : 484

PEAU, CHEVEUX, BLOUSE, VIRUS = "#8d5524", "#1f1300", "#E5E7EB", "#A855F7"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def yasmine(s=1.0):
    """Yasmine, épidémiologiste : chignon, blouse blanche, badge et carnet orange."""
    chignon = Circle(radius=0.17, fill_color=CHEVEUX, fill_opacity=1, stroke_width=0).move_to(P(0, 1.3))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=BLOUSE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.17, 0.55), P(0.17, 0.55), P(0, 0.2), fill_color=TERME, fill_opacity=1, stroke_width=0)
    carnet = RoundedRectangle(width=0.34, height=0.42, corner_radius=0.04, fill_color=RAISON, fill_opacity=1,
                              stroke_width=0).move_to(P(-0.2, -0.05))
    tete = Circle(radius=0.26, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    frange = Sector(radius=0.28, angle=PI, start_angle=0, fill_color=CHEVEUX, fill_opacity=1,
                    stroke_width=0).move_to(P(0, 1.14))
    return VGroup(chignon, corps, col, carnet, tete, frange).scale(s)


def virus(s=1.0, couleur=VIRUS):
    """Un virus schématique : une boule et ses picots."""
    pics = VGroup()
    for k in range(10):
        a = k * TAU / 10
        d = np.array([np.cos(a), np.sin(a), 0])
        pics.add(Line(0.3 * d, 0.46 * d, stroke_width=5, color=couleur), Dot(0.48 * d, radius=0.06, color=couleur))
    boule = Circle(radius=0.32, fill_color=couleur, fill_opacity=0.85, stroke_color=WHITE, stroke_width=2)
    return VGroup(pics, boule).scale(s)


def barres(hauteurs, larg=0.42, pas=0.62, couleur=TERME):
    """Des barres posées sur une même ligne (bas commun), de gauche à droite."""
    g = VGroup(*[Rectangle(width=larg, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0)
                 for h in hauteurs])
    for k, b in enumerate(g):
        b.move_to(P(k * pas, 0), aligned_edge=DOWN)
    return g


class Frac:
    """Une fraction dans une formule : num et den = [(texte, couleur, extrait), …] ;
    ex_barre : l'extrait qui fait apparaître la barre (« divisé »)."""

    def __init__(self, num, den, ex_barre=None):
        self.num, self.den, self.ex_barre = num, den, ex_barre


class Bords6Cases(Bords6):
    """Bords6 de l'ép. 22, plus les CADRES (cases, boutons, cartes : RoundedRectangle,
    contour compris) : à 6 % des bords gauche et droit (relecture du 13/11)."""

    def _bords(self):
        super()._bords()
        cle = getattr(self, "_cle_voix", "?") or "?"
        if "abonne" in cle:
            return
        lx = config.frame_width / 2 - config.frame_width * 0.06
        vus = getattr(self, "_bords6_vus", set())
        for mob in self.mobjects:
            for f in mob.get_family():
                if not isinstance(f, RoundedRectangle) or max(f.get_fill_opacity(), f.get_stroke_opacity()) < 0.05:
                    continue
                e = f.get_stroke_width() / 100 / 2      # la moitié du contour (en unités)
                g, d = f.get_left()[0] - e, f.get_right()[0] + e
                if g < -lx - 0.01 or d > lx + 0.01:
                    c = (cle, "case", round(g, 2), round(d, 2))
                    if c not in vus:
                        vus.add(c)
                        print(f"BORD6 {c[0]} « {c[1]} » x[{c[2]}, {c[3]}]", flush=True)
        self._bords6_vus = vus


class OutilsSommeGeo:
    """Les outils de l'épisode (paysage ET short) : la formule avec fraction."""

    def formule(self, items, y, centre=0.0, fs=50, larg=None, avec_morceau=None, avec=(), k_frac=0.9, jouer=True):
        """Une formule sur une ligne : items = morceaux (texte, couleur, extrait) et
        Frac(…). Chaque morceau quand la voix dit son extrait (None : avec le
        précédent). Les textes ont UNE ligne de base ; la barre de fraction est à la
        hauteur du « = ». Renvoie g (g.seq : les morceaux dans l'ordre, g.fracs)."""
        larg = larg or self.largeur_texte
        blocs, seq, fracs, run = VGroup(), [], [], []

        def vider():
            if run:
                tx, parts = self.ligne(list(run), fs)
                tx.ops = [p for p, m in zip(parts, run) if m[0].strip() in ("=", "+", "−", "×", "≈")]
                blocs.add(tx)
                seq.extend(zip(parts, [m[2] for m in run]))
                run.clear()

        for it in items:
            if isinstance(it, Frac):
                vider()
                n, npt = self.ligne(it.num, int(fs * k_frac))
                d, dpt = self.ligne(it.den, int(fs * k_frac))
                barre = Line(LEFT, RIGHT, stroke_width=4, color=WHITE).set_width(max(n.width, d.width) + 0.3)
                n.next_to(barre, UP, buff=0.16)
                d.next_to(barre, DOWN, buff=0.16)
                g = VGroup(n, barre, d)
                g.barre, g.n, g.d = barre, npt, dpt
                blocs.add(g)
                fracs.append(g)
                seq.extend(zip(npt, [m[2] for m in it.num]))
                seq.append((barre, it.ex_barre))
                seq.extend(zip(dpt, [m[2] for m in it.den]))
            else:
                run.append(it)
        vider()
        blocs.arrange(RIGHT, buff=0.24)
        yb = fracs[0].barre.get_center()[1] if fracs else None
        if yb is not None:  # chaque bout de texte : son « = » (ou « × ») à la hauteur de la barre
            for b in blocs:
                if b not in fracs and getattr(b, "ops", None):
                    b.shift(UP * (yb - b.ops[0].get_center()[1]))
                elif b not in fracs:
                    b.shift(UP * (yb - b.get_center()[1]))
        if blocs.width > larg:
            blocs.scale_to_fit_width(larg)
        blocs.move_to(P(centre, y))
        if fracs:
            blocs.shift(UP * (y - fracs[0].barre.get_center()[1]))
        blocs.seq = [m for m, _ in seq]
        blocs.extraits = [ex for _, ex in seq]
        blocs.fracs = fracs
        if not jouer:
            return blocs
        avec_morceau = avec_morceau or {}
        paquet, extra = [], []
        for i, (m, ex) in enumerate(seq):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) if not isinstance(p, Line) else Create(p) for p in paquet],
                          *extra, run_time=0.25)
                paquet, extra = [], []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
            extra += avec_morceau.get(i, [])
        self.play(*[FadeIn(p, shift=UP * 0.1) if not isinstance(p, Line) else Create(p) for p in paquet],
                  *extra, *avec, run_time=0.3)
        return blocs


class SuiteSommeGeo1reSpe(Bords6Cases, AuditMilliers, OutilsSommeGeo, OutilsEp12, OutilsGraphique, PaysageSuites):
    fichier_marques = "suite_somme_geo_marques.json"
    nom_voix = "premiere-spe-suite-somme-geo"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.0          # 6 % de marge à gauche et à droite pour les textes
    calc = _E16.calc
    fleche = _E16.fleche
    boutons_ligne = _E16.boutons_ligne
    ligne = _P21.ligne

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def ecran_garde(self):
        """La garde commune, la question en morceaux, et des nombres qui DOUBLENT
        (barres 1, 2, 4, 8, 16) reliés par des « + », puis « = ? »."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t("Somme des termes", 64, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au_mot("Somme des termes")
        self.play(Write(tit), run_time=0.7)
        sub = self.t("d'une suite géométrique", 42, TERME).move_to(P(0, tit.get_bottom()[1] - 0.48))
        self.au_mot("d'une suite")
        self.play(FadeIn(sub, shift=UP * 0.1), run_time=0.35)
        y1 = sub.get_bottom()[1] - 0.55
        self.calc([("Comment additionner", WHITE, "Comment additionner"), ("des nombres", WHITE, "des nombres")], y1,
                  centre=0, fs=40, larg=12)
        b = barres([0.11, 0.22, 0.44, 0.88, 1.76], larg=0.55, pas=1.3)
        b.move_to(P(-1.6, -1.86), aligned_edge=DOWN)
        plus = VGroup(*[Text("+", font_size=40, color=GREY_A).move_to(P((b[k].get_x() + b[k + 1].get_x()) / 2, -1.64))
                        for k in range(4)])
        egal = Text("= ?", font_size=48, color=RAISON).next_to(b, RIGHT, buff=0.45).set_y(-1.58)
        self.calc([("qui doublent,", RAISON, "qui doublent"), ("sans tout poser ?", WHITE, "sans tout")], y1 - 0.66,
                  centre=0, fs=40, larg=12,
                  avec_morceau={0: [LaggedStart(*[GrowFromEdge(x, DOWN) for x in b], lag_ratio=0.25)],
                                1: [LaggedStart(*[FadeIn(x, scale=1.4) for x in plus], lag_ratio=0.2),
                                    FadeIn(egal, scale=1.4)]})
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y1 - 1.35))
        self.play(FadeIn(ident), Indicate(egal, color=RAISON, scale_factor=1.3), run_time=0.4)
        self.attendre_voix(marge=0.9)

    # ── 01 : Yasmine, épidémiologiste ──────────────────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.25
        pers = yasmine(0.95).move_to(P(x, 2.35))
        nom = self.t("Yasmine", 44, JAUNE_TITRE).move_to(P(x, 1.08))
        met = self.t("épidémiologiste", 32, TERME).move_to(P(x, 0.5))
        self.au_mot("Yasmine")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("épidémiologiste")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        vi = virus(0.85).move_to(P(-1.75, 2.2))
        self.au_mot("virus")
        self.play(GrowFromCenter(vi), Rotate(vi, PI / 5), run_time=0.5)
        xs = [-4.625 + 1.85 * k for k in range(6)]
        lg = LigneTermes(["50"] + ["?"] * 5, xs=xs, centre=P(0, -1.3), largeur=1.3, hauteur=0.82, fs=40,
                         noms=[f"sem. {k}" for k in range(1, 7)], fs_noms=28)
        self.calc([("1re semaine :", WHITE, "La première"), ("50 nouveaux cas", TERME, "50")], 2.7, centre=2.45, fs=40,
                  larg=7.2, avec_morceau={1: [FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                                              FadeIn(lg.noms[0])]})
        self.calc([("Puis chaque semaine,", WHITE, "Puis chaque")], 1.98, centre=2.45, fs=40, larg=7.2)
        arcs = [lg.saut(k, "× 2", cote=UP, fs=32) for k in range(5)]
        self.calc([("2 fois plus de nouveaux cas", RAISON, "2 fois plus")], 1.3, centre=2.45, fs=40, larg=7.2)
        self.play(LaggedStart(*[AnimationGroup(Create(a[0]), FadeIn(a[1], scale=1.3), FadeIn(lg.cases[k + 1], scale=0.8),
                                               FadeIn(lg.noms[k + 1])) for k, a in enumerate(arcs)], lag_ratio=0.35),
                  run_time=1.4)
        self.calc([("Combien de malades", WHITE, "Combien de malades"), ("en tout,", JAUNE_TITRE, "en tout"),
                   ("sur 6 semaines ?", WHITE, "6 semaines")], -2.85, centre=-0.5, fs=42, larg=10.4,
                  avec_morceau={1: [LaggedStart(*[Indicate(c, color=JAUNE_TITRE, scale_factor=1.12) for c in lg.cases],
                                                lag_ratio=0.15)]})
        self.attendre_voix(marge=0.5)

    # ── 02 : l'astuce : S, puis 2S, on retire S ────────────────────────────

    def rangee_alignee(self, morceaux, colonnes, x_droite_nom, y, fs=56):
        """Une ligne de somme dont chaque terme est dans SA colonne (les termes
        égaux l'un sous l'autre), le nom (« S = ») calé à droite sur x_droite_nom.
        morceaux[0] = le nom ; puis terme, « + », terme… ; même ligne de base."""
        tx, parts = self.ligne([(m[0], m[1]) for m in morceaux], fs)
        tx.move_to(P(0, y))
        parts[0].shift(RIGHT * (x_droite_nom - parts[0].get_right()[0]))
        for k, c in enumerate(colonnes):
            parts[1 + 2 * k].set_x(c)
        for k in range(1, len(colonnes)):  # chaque « + » au milieu du VIDE entre ses deux termes
            parts[2 * k].set_x((parts[2 * k - 1].get_right()[0] + parts[2 * k + 1].get_left()[0]) / 2)
        return tx, parts

    def jouer_parts(self, parts, extraits, avec_morceau=None):
        avec_morceau = avec_morceau or {}
        paquet, extra = [], []
        for i, (m, ex) in enumerate(zip(parts, extraits)):
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, run_time=0.25)
                paquet, extra = [], []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
            extra += avec_morceau.get(i, [])
        self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *extra, run_time=0.3)

    def ecran_astuce(self):
        self.nouvel_ecran("02-astuce")
        cols = [-3.3 + 1.75 * k for k in range(6)]   # colonnes larges : les « + » respirent (relecture 13/11)
        xn, y1, y2 = -4.05, 2.95, 1.45
        m1 = [("S =", TERME, "S égale"), ("1", WHITE, "1 plus 2"), ("+", GREY_A, None), ("2", WHITE, None),
              ("+", GREY_A, None), ("2²", WHITE, "2 au carré"), ("+", GREY_A, "plus …"), ("…", WHITE, None),
              ("+", GREY_A, None), ("2⁵", WHITE, "2 puissance 5")]
        l1, p1 = self.rangee_alignee(m1, cols[:5], xn, y1)
        self.jouer_parts(p1, [m[2] for m in m1])
        m2 = [("2S =", RAISON, "2 S égale"), ("2", WHITE, "2 plus"), ("+", GREY_A, None), ("2²", WHITE, "2 au carré"),
              ("+", GREY_A, "plus …"), ("…", WHITE, None), ("+", GREY_A, None), ("2⁵", WHITE, None),
              ("+", GREY_A, None), ("2⁶", RAISON, "2 puissance 6")]
        l2, p2 = self.rangee_alignee(m2, cols[1:], xn, y2)
        # « ↓ × 2 » ENTRE les deux noms (S = / 2S =), loin du bout des lignes
        fl = Arrow(P(xn - 1.3, y1 - 0.36), P(xn - 1.3, y2 + 0.36), buff=0, color=RAISON, stroke_width=5,
                   max_tip_length_to_length_ratio=0.3)
        fois = self.t("× 2", 40, RAISON).next_to(fl, RIGHT, buff=0.14)
        self.suivre("multiplie par")
        self.suivre("2")
        self.play(GrowArrow(fl), FadeIn(fois, scale=1.3), run_time=0.4)
        self.jouer_parts(p2, [m[2] for m in m2])
        regle = Line(P(-5.8, 0.88), P(5.8, 0.88), stroke_width=3, color=GREY_B)
        self.calc([("On retire S :", RAISON, "On retire S"), ("presque tout s'annule", WHITE, "presque tout")], 0.25,
                  centre=0, fs=40, larg=12, avec_morceau={0: [Create(regle)]})
        communs = (p1[3], p1[5], p1[7], p1[9], p2[1], p2[3], p2[5], p2[7])
        barres_ = [p for p in communs if p not in (p1[7], p2[5])]   # « … » : pâli, pas barré
        self.play(*[Create(Line(p.get_left() + LEFT * 0.03, p.get_right() + RIGHT * 0.03, stroke_color=RAISON,
                                stroke_width=5).move_to(p.get_center())) for p in barres_],
                  *[p.animate.set_opacity(0.35) for p in communs], run_time=0.6)
        self.formule([("2S − S", RAISON, "2 S moins S"), ("=", WHITE, "égale"), ("2⁶", RAISON, "2 puissance 6"),
                      ("− 1", WHITE, "moins 1")], -0.85, centre=0, fs=54,
                     avec_morceau={2: [Indicate(p2[9], color=RAISON, scale_factor=1.3)],
                                   3: [Indicate(p1[1], color=WHITE, scale_factor=1.4)]})
        s = self.formule([("Donc", WHITE, "Donc"), ("S =", TERME, "S égale"), ("63", JUSTE, "63")], -2.15, centre=-0.4,
                         fs=60)
        self.play(s.seq[-1].animate.shift(RIGHT * 0.16), run_time=0.12)
        self.play(Create(self.encadre(s.seq[-1], JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.5)

    # ── 03 : la formule, et n + 1 termes ───────────────────────────────────

    def items_formule(self):
        """1 + q + q² + … + qⁿ = (qⁿ⁺¹ − 1)/(q − 1), chaque morceau à sa voix."""
        return [("1", WHITE, "1 plus q"), ("+", GREY_A, None), ("q", RAISON, None), ("+", GREY_A, None),
                ("q²", RAISON, "q au carré"), ("+", GREY_A, "plus …"), ("…", WHITE, None), ("+", GREY_A, None),
                ("qⁿ", RAISON, "q puissance n"), ("=", WHITE, "égale"),
                Frac([("qⁿ⁺¹", RAISON, "q puissance n plus 1"), ("− 1", WHITE, "moins 1")],
                     [("q − 1", WHITE, "q moins 1")], ex_barre="divisé")]

    def ecran_formule(self):
        self.nouvel_ecran("03-formule")
        self.calc([("En général,", WHITE, "En général"), ("pour", WHITE, "pour q"), ("q ≠ 1 :", RAISON, "différent")],
                  2.75, centre=0, fs=46, larg=12)
        f = self.formule(self.items_formule(), 1.0, centre=0, fs=60)
        cadre = self.encadre(f, JAUNE_TITRE, 0.25)
        self.play(Create(cadre), run_time=0.4)
        termes = [f.seq[k] for k in (0, 2, 4, 6, 8)]
        y_lab = cadre.get_bottom()[1] - 0.45
        q0 = self.t("q⁰", 44, RAISON).move_to(P(termes[0].get_x(), y_lab))
        qn = self.t("qⁿ", 44, RAISON).move_to(P(termes[-1].get_x(), y_lab))
        fl = Arrow(q0.get_right() + RIGHT * 0.1, qn.get_left() + LEFT * 0.1, buff=0, color=RAISON, stroke_width=5,
                   max_tip_length_to_length_ratio=0.06)
        self.calc([("Attention :", PIEGE, "Attention"), ("il y a", WHITE, "il y a"), ("n + 1 termes,", RAISON, "n plus 1")],
                  -1.45, centre=0, fs=46, larg=12,
                  avec_morceau={2: [LaggedStart(*[Indicate(t, color=RAISON, scale_factor=1.35) for t in termes],
                                                lag_ratio=0.3)]})
        self.calc([("de", WHITE, "de q puissance 0"), ("q⁰", RAISON, None), ("à", WHITE, "à q puissance n"),
                   ("qⁿ", RAISON, None)], -2.3, centre=-0.4, fs=46, larg=10,
                  avec_morceau={0: [FadeIn(q0, scale=1.3)], 2: [GrowArrow(fl), FadeIn(qn, scale=1.3)]})
        self.attendre_voix(marge=0.5)

    # ── 04 : question-pause n° 1 : 1 + 3 + … + 3⁸ → A (9 termes) ───────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["9", "3", "8"], largeur=3.3, fs=60, y=-0.3, pas=3.7)

        def e1():
            self.calc([("Combien de termes dans la somme", WHITE, "Combien de termes")], 2.35, centre=0, fs=44, larg=12)
            self.calc([("1 + 3", WHITE, "1 plus 3"), ("+ 3²", WHITE, "3 au carré"), ("+ … +", WHITE, "plus …"),
                       ("3⁸ ?", RAISON, "3 puissance 8")], 1.4, centre=0, fs=56, larg=12)

        q = self.question_libre("04-question", [e1], cartes, P(0, -1.6))
        self.dire("04b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.calc([("Les exposants vont de", WHITE, "Les exposants"), ("0", RAISON, "0"), ("à", WHITE, None),
                   ("8 :", RAISON, "8"), ("cela fait", WHITE, "cela fait"), ("9 termes.", JUSTE, "9 termes")],
                  -1.55, centre=-0.5, fs=42, larg=11)
        self.calc([("Le 1 du début, c'est", WHITE, "Le 1 du début"), ("3⁰.", RAISON, "3 puissance 0")], -2.4, centre=-0.5,
                  fs=42, larg=11)
        self.attendre_voix(marge=0.6)

    # ── 05 : pour Yasmine : 50 en facteur → 3 150 cas ──────────────────────

    def ecran_application(self):
        self.nouvel_ecran("05-application")
        pers = yasmine(0.8).move_to(P(-5.0, 2.25))
        nom = self.t("Yasmine", 36, JAUNE_TITRE).move_to(P(-5.0, 1.0))
        haut = [2.3 * 2 ** k / 32 for k in range(6)]
        b = VGroup(*[Rectangle(width=0.5, height=h, fill_color=TERME, fill_opacity=1, stroke_width=0)
                     .move_to(P(1.4 + 0.78 * k, 1.0), aligned_edge=DOWN) for k, h in enumerate(haut)])
        sol = Line(P(1.0, 1.0), P(5.6, 1.0), stroke_width=2, color=GREY_B)
        vi = virus(0.55).move_to(P(-2.6, 2.4))
        self.au_mot("Pour Yasmine")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom), FadeIn(vi, scale=0.8), Create(sol), run_time=0.4)
        self.calc([("50", TERME, "50 plus"), ("+ 50 × 2", TERME, "50 fois 2"), ("+ … +", WHITE, "plus …"),
                   ("50 × 2⁵", TERME, "50 fois 2 puissance 5")], 0.3, centre=0, fs=48, larg=12,
                  avec_morceau={0: [GrowFromEdge(b[0], DOWN)], 1: [GrowFromEdge(b[1], DOWN)],
                                2: [GrowFromEdge(x, DOWN) for x in b[2:5]], 3: [GrowFromEdge(b[5], DOWN)]})
        self.calc([("On met 50 en facteur :", RAISON, "On met 50")], -0.5, centre=0, fs=40, larg=12)
        self.formule([("= 50 ×", WHITE, "50 fois,"),
                      Frac([("2⁶", RAISON, "2 puissance 6"), ("− 1", WHITE, "moins 1")], [("2 − 1", WHITE, "2 moins 1")],
                           ex_barre="divisé"),
                      ("= 50 ×", WHITE, "égale 50"), ("63", WHITE, "63")], -1.6, centre=0, fs=50)
        c = self.formule([("=", WHITE, "égale 3 150"), ("3 150 cas", JUSTE, None), ("en 6 semaines", WHITE, "en 6 semaines")],
                         -2.85, centre=-0.4, fs=48)
        self.play(c.seq[0].animate.shift(LEFT * 0.14), c.seq[2].animate.shift(RIGHT * 0.14), run_time=0.12)
        self.play(Create(self.encadre(c.seq[1], JUSTE, 0.12)), *[x.animate.set_fill(JUSTE) for x in b], run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège : 2⁶, pas 2⁷ ─────────────────────────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("06-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.15)
        xs = [-4.375 + 1.75 * k for k in range(6)]
        lg = LigneTermes([f"2{e}" for e in "⁰¹²³⁴⁵"], xs=xs, centre=P(0, 2.0), largeur=1.3, hauteur=0.82, fs=44,
                         noms=[f"sem. {k}" for k in range(1, 7)], fs_noms=28)
        for c in lg.cases:   # les exposants des semaines : les données du dessin, qu'on LIT
            c[1].set_color(WHITE)
            c[1]._pas_audit = True
        self.calc([("Sur 6 semaines,", WHITE, "Sur 6 semaines"), ("le dernier exposant est", WHITE, "le dernier"),
                   ("5,", RAISON, "5"), ("pas 6.", PIEGE, "pas 6")], 0.6, centre=0, fs=42, larg=12,
                  avec_morceau={0: [LaggedStart(*[AnimationGroup(FadeIn(c, scale=0.8), FadeIn(n)) for c, n in
                                                  zip(lg.cases, lg.noms)], lag_ratio=0.15)],
                                2: self.allumer_cases(lg, [5], RAISON)})
        self.calc([("Dans la formule,", WHITE, "Dans la formule"), ("l'exposant du haut", RAISON, "l'exposant du haut")],
                  -0.2, centre=0, fs=40, larg=12)
        self.calc([("a un de plus que le dernier exposant :", WHITE, "a un de plus")], -0.85, centre=0, fs=40, larg=12)
        ok = self.formule([Frac([("2⁶", JUSTE, "2 puissance 6"), ("− 1", WHITE, None)], [("2 − 1", WHITE, None)])],
                          -2.15, centre=-3.0, fs=52)
        self.play(Create(self.encadre(ok, JUSTE, 0.18)), run_time=0.3)
        ko = self.formule([Frac([("2⁷", PIEGE, "2 puissance 7"), ("− 1", WHITE, None)], [("2 − 1", WHITE, None)])],
                          -2.0, centre=1.6, fs=52)
        croix = self.barrer(ko)
        self.calc([("une semaine de trop !", PIEGE, "une semaine de trop")], -3.3, centre=1.6, fs=38, larg=6,
                  avec=[Create(croix)])
        self.attendre_voix(marge=0.5)

    # ── 07 : question-pause n° 2 : 1 + 2 + … + 2⁹ → B (1 023) ──────────────

    def ecran_question2(self):
        cartes = self.boutons_ligne(["2 047", "1 023", "1 024"], largeur=3.8, fs=52, y=-0.3, pas=4.05)

        def e1():
            self.calc([("Combien vaut", WHITE, "Combien vaut")], 2.35, centre=0, fs=44, larg=12)
            self.calc([("1 + 2", WHITE, "1 plus 2"), ("+ 2²", WHITE, "2 au carré"), ("+ … +", WHITE, "plus …"),
                       ("2⁹ ?", RAISON, "2 puissance 9")], 1.4, centre=0, fs=56, larg=12)

        q = self.question_libre("07-question", [e1], cartes, P(0, -1.6))
        self.dire("07b-reponse")
        self.au_mot("Réponse B")
        self.q_reponse(q, 1)
        self.calc([("Le dernier exposant est", WHITE, "Le dernier"), ("9 :", RAISON, "9")], -1.55, centre=-0.5, fs=42,
                  larg=11)
        c = self.formule([Frac([("2¹⁰", RAISON, "2 puissance 10"), ("− 1", WHITE, "moins 1")],
                               [("2 − 1", WHITE, "2 moins 1")], ex_barre="divisé"),
                          ("=", WHITE, "égale"), ("1 023", JUSTE, "1 023")], -2.7, centre=-0.6, fs=48)
        self.play(c.seq[-1].animate.shift(RIGHT * 0.14), run_time=0.12)
        self.play(Create(self.encadre(c.seq[-1], JUSTE, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : le défi : u₀ = 4, q = 3, u₀ + … + u₄ ──────────────────────────

    def ecran_defi(self):
        self.nouvel_ecran("08-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.15)
        xs = [-4.0 + 2.0 * k for k in range(5)]
        lg = LigneTermes(["4"] + ["?"] * 4, xs=xs, centre=P(0, 0.55), largeur=1.5, hauteur=0.86, fs=42,
                         noms=[u(k) for k in range(5)], fs_noms=34)
        arcs = [lg.saut(k, "× 3", cote=UP, fs=34) for k in range(4)]
        l1 = self.calc([("Une suite géométrique :", WHITE, "Une suite"), ("u₀ = 4", TERME, "4"), ("et", WHITE, "et pour"),
                        ("q = 3", RAISON, "3")], 2.35, centre=0, fs=44, larg=12,
                       avec_morceau={1: [FadeIn(lg.cases[0], scale=0.8), FadeIn(lg.noms[0])],
                                     3: [LaggedStart(*[AnimationGroup(Create(a[0]), FadeIn(a[1], scale=1.3),
                                                                      FadeIn(lg.cases[k + 1], scale=0.8),
                                                                      FadeIn(lg.noms[k + 1]))
                                                       for k, a in enumerate(arcs)], lag_ratio=0.3)]})
        l2 = self.calc([("Calcule", WHITE, "Calcule"), ("u₀ + u₁ + … +", TERME, "u indice 0 plus"),
                        ("u₄", TERME, "u indice 4")], -1.0, centre=0, fs=50, larg=12,
                       avec=[Indicate(lg.cases, color=JAUNE_TITRE, scale_factor=1.06)])
        self.defi_pause(-2.25, x=-0.6)
        self._defi = (tit, [l1, l2], lg, arcs)

    def ecran_correction(self):
        self.dire("08b-correction")
        tit, efface, lg, arcs = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        rangee = VGroup(lg.cases, lg.noms, *arcs)
        self.play(ReplacementTransform(tit, cor), *[FadeOut(m) for m in efface], rangee.animate.shift(UP * 0.72),
                  run_time=0.5)
        self.remove(*efface)
        self.calc([("De u₀ à u₄ :", WHITE, "De u indice 0"), ("5 termes", RAISON, "5 termes")], -0.32, centre=0, fs=44,
                  larg=12)
        s = self.formule([("S =", TERME, "S égale"), ("4 ×", WHITE, "4 fois,"),
                          Frac([("3⁵", RAISON, "3 puissance 5"), ("− 1", WHITE, "moins 1")], [("3 − 1", WHITE, "3 moins 1")],
                               ex_barre="divisé"),
                          ("=", WHITE, "égale 4 fois"), Frac([("4 ×", WHITE, None), ("242", WHITE, "242")],
                                                            [("2", WHITE, "divisé par 2")]),
                          ("=", WHITE, "égale 484"), ("484", JUSTE, None)], -1.65, centre=-0.3, fs=50)
        self.play(s.seq[-1].animate.shift(RIGHT * 0.16), run_time=0.12)
        self.play(Create(self.encadre(s.seq[-1], JUSTE, 0.12)), run_time=0.3)
        vals = ["12", "36", "108", "324"]
        neufs = []
        for k, v in enumerate(vals):
            t = Text(v, font_size=42, color=WHITE).move_to(lg.cases[k + 1][0])
            neufs.append(t)
        am = {k + 2: [FadeOut(lg.cases[k + 1][1]), FadeIn(neufs[k], scale=1.4)] for k in range(4)}
        am[1] = [Indicate(lg.cases[0], color=TERME, scale_factor=1.1)]
        self.calc([("On vérifie :", WHITE, "On vérifie"), ("4", TERME, "4"), ("+ 12", TERME, "12"), ("+ 36", TERME, "36"),
                   ("+ 108", TERME, "108"), ("+ 324", TERME, "324"), ("= 484", JUSTE, "484")], -2.95, centre=-0.5, fs=44,
                  larg=11, avec_morceau=am)
        for k in range(4):
            lg.cases[k + 1].remove(lg.cases[k + 1][1])
            lg.cases[k + 1].add(neufs[k])
        self.play(*self.allumer_cases(lg, range(5)), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 09 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        """Comme la finale commune (titre en haut, centré ; une coche par point),
        mais la formule se montre MORCEAU PAR MORCEAU, à la voix."""
        self.nouvel_ecran("09-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs = 42
        tc = lambda s, d: Text(s, font_size=fs, color=WHITE, t2c=d, disable_ligatures=True)  # noqa: E731
        f = self.formule([("1", WHITE, "1 plus q"), ("+", GREY_A, None), ("q", RAISON, None), ("+", GREY_A, "plus …"),
                          ("…", WHITE, None), ("+", GREY_A, None), ("qⁿ", RAISON, "q puissance n"),
                          ("=", WHITE, "égale"),
                          Frac([("qⁿ⁺¹", RAISON, "q puissance n plus 1"), ("− 1", WHITE, "moins 1")],
                               [("q − 1", WHITE, "q moins 1")], ex_barre="divisé")], 0, fs=54, jouer=False)
        p1 = [tc("Pour q ≠ 1 :", {"q ≠ 1": RAISON}), f]
        p2 = [tc("Avec un premier terme u₀,", {"u₀": TERME}), tc("on le met en facteur.", {"en facteur": RAISON})]
        p3 = [tc("On compte bien les termes :", {}), tc("n + 1, en partant de l'exposant 0.", {"n + 1": RAISON})]
        for l in p1[:1] + p2 + p3:
            l._pas_audit = True
        points = [(p1, ["Pour q différent", None]), (p2, ["Avec un premier terme", "on le met en facteur"]),
                  (p3, ["Et on compte", "n plus 1, en partant"])]
        blocs = []
        for lignes, _ in points:
            b = VGroup(*lignes).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
            blocs.append(VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.4)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        if tout.height > 5.7:
            tout.scale_to_fit_height(5.7)
        tout.move_to(P(-0.4, -0.45))
        for bloc, (lignes, extraits) in zip(blocs, points):
            for k, (l, ex) in enumerate(zip(lignes, extraits)):
                anims = [Create(bloc[0])] if k == 0 else []
                if l is f:
                    self.jouer_parts(f.seq, f.extraits)
                    continue
                self.au_mot(ex)
                self.play(FadeIn(l, shift=RIGHT * 0.2), *anims, run_time=0.45)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_astuce()
        self.ecran_formule()
        self.ecran_question1()
        self.ecran_application()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("10-abonne")
