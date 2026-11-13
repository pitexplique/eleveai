# suite_limite_spe.py
# EleveAI — Maths 1re spé (programme 2026) — paysage « Limite d'une suite »
# (notion intuitive), 16:9, ceinture VERTE. Série SUITES, épisode 26.
# Micro du coach : suite_limite (lib/tutor-v4/questionBank/premiere-spe/maths/
# suites.bank.ts + suites-renfort.ts : conjecturer une limite en regardant les
# termes pour n grand ; 1/n → 0 ; n², 2ⁿ → +∞ ; qⁿ → 0 si −1 < q < 1 ;
# « décroissante » ne veut pas dire « vers −∞ » ; uₙ₊₁ = a uₙ + b : L = aL + b).
#
# Ce que demande le coach → écran :
#   · conjecturer une limite à partir des termes (n très grand)       → 02, 03 ;
#   · la notation lim uₙ = ℓ quand n → +∞ (« semble tendre vers »)     → 03 ;
#   · uₙ₊₁ = a uₙ + b : la limite vérifie L = aL + b                   → 04, 05 ;
#   · limites de référence : 1/n, n², 2ⁿ, qⁿ (−1 < q < 1)              → 06, 08, défi ;
#   · le piège : raison 2 mais u₀ < 0 → −∞ (regarder le signe de u₀)   → 07.
# Clé de voix → écran :
#   00-garde (des points qui s'approchent d'une droite, un « ? ») · 01 Karim,
#   maître de port : 360 bateaux, la moitié partent, 100 arrivent · 02 les
#   termes 360, 280, 240, 220, 210, 205 · 03 le nuage s'approche de la droite
#   y = 200, lim uₙ = 200 · 04 L = 0,5L + 100 → L = 200 · 05/05b question
#   (C : 30) · 06 les limites de référence (trois cartes) · 07 le piège
#   (−3 × 2ⁿ → −∞) · 08/08b question (A : 5) · 09/09b défi (4 × 0,9ⁿ + 7 → 7 ;
#   2n² − 50 → +∞) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes, orange = la raison, le « × 0,5 »
# et les écarts, vert = juste (la droite limite), rouge = piège.
# Voix : manim/voix/premiere-spe-suite-limite.json (débit −6), calée mot à mot
# par suite_limite_spe_marques.json.
# Contrôle : AUDIT=1 BORDS=1 BORDS6=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_limite_spe.py SuiteLimite1reSpe -o eleveai-maths-premiere-spe-suite-limite --media_dir manim/scripts/premiere/media-suite-limite
# Sortie : manim/sorties/premiere-spe/maths/suites/26-limite/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07 : question_libre)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402  (ép. 16 : boutons_ligne)
from suite_variation_spe import Bords6 as Bords6Objets  # noqa: E402  (ép. 23 : 6 %, tout objet)
from suite_evolution import Bords6 as Bords6Textes  # noqa: E402  (ép. 22 : 6 %, textes, morceaux, cadres)
from suite_sommes import OutilsSommes, SuiteSommes1reSpe as _Sommes  # noqa: E402  (ép. 24 : indices, fractions, finale)

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
proche = lambda a, b, e=1e-9: abs(a - b) < e  # noqa: E731
PORT = [360.0]
for _ in range(9):
    PORT.append(0.5 * PORT[-1] + 100)
assert PORT[:6] == [360, 280, 240, 220, 210, 205] and abs(PORT[-1] - 200) < 1           # 02, 03
assert 360 // 20 == 18 and 180 // 20 == 9 and 100 // 20 == 5 and 18 - 9 + 5 == 280 // 20  # 01 : 1 bateau = 20
assert proche(0.5 * 200 + 100, 200) and proche(100 / 0.5, 200)                          # 04
assert proche(0.8 * 30 + 6, 30) and proche(6 / 0.2, 30)                                 # question 1 : C
assert [-3 * 2 ** n for n in range(3)] == [-3, -6, -12]                                 # 07
assert abs(5 + 3 / 10 ** 6 - 5) < 1e-5                                                  # question 2 : A
assert abs(4 * 0.9 ** 200 + 7 - 7) < 1e-8 and 2 * 100 ** 2 - 50 > 10 ** 4              # défi

PEAU, CHEVEUX = "#8d5524", "#1f1300"
EAU, BOIS = "#0E4D6E", "#A16207"


# ── les dessins de l'épisode ────────────────────────────────────────────────

def karim(s=1.0):
    """Karim, maître de port : casquette blanche à visière, veste bleu marine, jumelles."""
    corps = RoundedRectangle(width=1.0, height=1.2, corner_radius=0.25, fill_color="#1E3A8A", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.1))
    boutons = VGroup(*[Dot(P(0, y), radius=0.04, color=JAUNE_TITRE) for y in (0.35, 0.1, -0.15)])
    tete = Circle(radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 0.98))
    casq = Sector(radius=0.3, angle=PI, start_angle=0, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.17))
    visiere = RoundedRectangle(width=0.5, height=0.08, corner_radius=0.03, fill_color="#111827", fill_opacity=1,
                               stroke_width=0).move_to(P(0.12, 1.08))
    insigne = Dot(P(0, 1.22), radius=0.05, color=JAUNE_TITRE)
    jum = VGroup(*[Circle(radius=0.07, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
                   .move_to(P(dx, 0.5)) for dx in (0.26, 0.42)])
    return VGroup(corps, boutons, tete, casq, visiere, insigne, jum).scale(s)


def bateau(s=1.0, voile=WHITE, coque=TERME):
    """Un voilier vu de côté : la coque, le mât, la voile."""
    c = Polygon(P(-0.34, 0), P(0.34, 0), P(0.24, -0.16), P(-0.24, -0.16), fill_color=coque, fill_opacity=1,
                stroke_width=0)
    mat = Line(P(0, 0), P(0, 0.5), stroke_color=GREY_A, stroke_width=2)
    v = Polygon(P(0.03, 0.48), P(0.03, 0.05), P(0.3, 0.05), fill_color=voile, fill_opacity=1, stroke_width=0)
    return VGroup(c, mat, v).scale(s)


def port(centre, larg=7.0, haut=3.2):
    """Le bassin du port : l'eau, trois pontons ; renvoie (dessin, places des 18 bateaux)."""
    c = np.array(centre, dtype=float)
    eau = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=EAU, fill_opacity=1,
                           stroke_color="#38BDF8", stroke_width=2).move_to(c)
    xs = [c[0] - larg / 2 + 0.75 + k * (larg - 1.5) / 5 for k in range(6)]
    ys = [c[1] + haut / 2 - 0.85 - r * 0.95 for r in range(3)]
    pontons = VGroup(*[Line(P(xs[0] - 0.5, y - 0.22), P(xs[-1] + 0.5, y - 0.22), stroke_color=BOIS, stroke_width=6)
                       for y in ys])
    places = [P(x, y) for y in ys for x in xs]
    return VGroup(eau, pontons), places


class Repere(VGroup):
    """Un repère de lecture : axe des n (à u = 0, ou en bas), axe des uₙ à GAUCHE
    des points (0,4 d'écart : aucun point ne touche un axe), graduations hors du
    tracé. self.G(n, u) ; self.point(n, u) ; self.droite(L) (pointillés)."""

    def __init__(self, nr, ur, bg, hd, grad_u=(), grad_n=(), nom_u="uₙ", fs=28, **kw):
        super().__init__(**kw)
        (self.na, self.nb), (self.ua, self.ub) = nr, ur
        (self.X0, self.Y0), (self.X1, self.Y1) = np.array(bg)[:2], np.array(hd)[:2]
        y0 = self.G(self.na, min(max(0, self.ua), self.ub))[1]
        k = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.16, max_tip_length_to_length_ratio=0.1)
        self.ax_n = Arrow(P(self.X0, y0), P(self.X1 + 0.3, y0), **k)
        self.ax_u = Arrow(P(self.X0, self.Y0), P(self.X0, self.Y1 + 0.3), **k)
        self.lab_n = Text("n", font_size=fs, color=GREY_A).next_to(self.ax_n, RIGHT, buff=0.1)
        self.lab_u = Text(nom_u, font_size=fs, color=GREY_A).next_to(self.ax_u, UP, buff=0.08)
        self.add(self.ax_n, self.ax_u, self.lab_n, self.lab_u)
        for v in grad_u:
            y = self.G(self.na, v)[1]
            tr = Line(P(self.X0 - 0.07, y), P(self.X0 + 0.07, y), stroke_width=2, color=GREY_B)
            t = Text(fr(v), font_size=fs, color=GREY_A).next_to(tr, LEFT, buff=0.1)
            self.add(tr, t)
        for n in grad_n:
            x = self.G(n, 0)[0]
            tr = Line(P(x, y0 - 0.07), P(x, y0 + 0.07), stroke_width=2, color=GREY_B)
            t = Text(str(n), font_size=fs, color=GREY_A).next_to(tr, DOWN, buff=0.1)
            self.add(tr, t)
        for f in self.get_family():
            if isinstance(f, Text):
                f._pas_audit = True

    def G(self, n, u_):
        return P(self.X0 + 0.4 + (n - self.na) / (self.nb - self.na) * (self.X1 - self.X0 - 0.4),
                 self.Y0 + (u_ - self.ua) / (self.ub - self.ua) * (self.Y1 - self.Y0))

    def point(self, n, u_, couleur=TERME, r=0.09):
        return Dot(self.G(n, u_), radius=r, color=couleur)

    def droite(self, L, couleur=JUSTE, sw=4):
        return DashedLine(P(self.X0 + 0.12, self.G(0, L)[1]), P(self.X1 + 0.05, self.G(0, L)[1]), color=couleur,
                          stroke_width=sw, dash_length=0.14)


def mini_lim(vals, L, larg, haut, centre, ua=None, ub=None, couleur=TERME, r=0.075, fleche=None):
    """Un petit nuage SANS nombre : un coin d'axes, les points, la droite y = L en
    pointillés verts (None : pas de droite) ; fleche=UP/DOWN : la flèche de la fin."""
    c = np.array(centre, dtype=float)
    x0, y0 = c[0] - larg / 2, c[1] - haut / 2
    lo = min(vals + ([L] if L is not None else [])) if ua is None else ua
    hi = max(vals + ([L] if L is not None else [])) if ub is None else ub
    n = len(vals)
    G = lambda k, v: P(x0 + 0.35 + k * (larg - 0.65) / max(n - 1, 1),  # noqa: E731
                       y0 + 0.28 + (v - lo) / max(hi - lo, 1e-9) * (haut - 0.55))
    k = dict(buff=0, stroke_width=2.5, color=GREY_B, tip_length=0.13, max_tip_length_to_length_ratio=0.12)
    g = VGroup()
    g.axes = VGroup(Arrow(P(x0, y0), P(x0 + larg, y0), **k), Arrow(P(x0, y0), P(x0, y0 + haut), **k))
    g.pts = VGroup(*[Dot(G(i, v), radius=r, color=couleur) for i, v in enumerate(vals)])
    g.add(g.axes)
    g.ligne = None
    if L is not None:
        g.ligne = DashedLine(P(x0 + 0.12, G(0, L)[1]), P(x0 + larg - 0.1, G(0, L)[1]), color=JUSTE, stroke_width=3,
                             dash_length=0.1)
        g.add(g.ligne)
    g.add(g.pts)
    g.G = G
    return g


class SuiteLimite1reSpe(Bords6Textes, Bords6Objets, AuditMilliers, OutilsSommes, OutilsEp12, OutilsGraphique,
                        PaysageSuites):
    fichier_marques = "suite_limite_spe_marques.json"
    nom_voix = "premiere-spe-suite-limite"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.0          # 6 % de marge latérale (rien au-delà de x = ±6,25)
    k_allumer = 1.06
    place_coche = 0.7
    boutons_ligne = _E16.boutons_ligne
    finale = _Sommes.finale       # ép. 24 : la coche centrée sur la première ligne

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        """Des points qui s'approchent d'une droite en pointillés ; au bout, un « ? »."""
        vals = [3.0 + 2.2 * 0.6 ** k for k in range(9)]
        m = mini_lim(vals, 3.0, 4.6, 1.85, P(-0.9, -0.45))
        q = self.t("?", 60, RAISON, audit=False).next_to(m.ligne, RIGHT, buff=0.25)
        self.play(FadeIn(m.axes), run_time=0.3)
        self.play(LaggedStart(*[GrowFromCenter(p) for p in m.pts], lag_ratio=0.25), run_time=1.0)
        self.play(Create(m.ligne), FadeIn(q, scale=1.4), run_time=0.5)

    def ecran_garde(self):
        self.garde("Limite d'une suite",
                   [("Vers quoi vont les termes", "Vers quoi"),
                    ("quand n devient très grand ?", "quand n devient")],
                   dessin=self.dessin_garde, extrait_titre="Limite d'une suite")

    # ── 01 : Karim, maître de port : 360 bateaux ──────────────────────────

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        x = -4.75
        pers = karim(0.95).move_to(P(x, 2.05))
        nom = self.t("Karim", 44, JAUNE_TITRE).move_to(P(x, 0.55))
        met = VGroup(self.t("maître", 34, TERME), self.t("de port", 34, TERME)).arrange(DOWN, buff=0.1)
        met.move_to(P(x, -0.3))
        self.au_mot("Karim")
        self.play(FadeIn(pers, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("maître de port")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.3)
        xp = 1.15
        bassin, places = port(P(xp, -0.75), 6.9, 3.2)
        self.au_mot("port de plaisance")
        self.play(FadeIn(bassin), run_time=0.4)
        bts = [bateau(0.95).move_to(p + UP * 0.1) for p in places]
        self.ecrire([[("360 bateaux", TERME, "360")]], 3.0, centre=xp, fs=46,
                    avec=[LaggedStart(*[FadeIn(b, shift=UP * 0.1) for b in bts], lag_ratio=0.05)], run_time=0.7)
        self.ecrire([[("Chaque année :", WHITE, "Chaque année"), ("la moitié partent,", RAISON, "la moitié")]], 2.3,
                    centre=xp, fs=38, larg=7.0)
        partent = [bts[i] for i in range(18) if i % 6 >= 3]  # la moitié : 9 bateaux sur 18 (1 bateau = 20)
        self.au_mot("partent")
        self.play(*[b.animate.shift(RIGHT * 1.6).set_opacity(0) for b in partent], run_time=0.9)
        self.remove(*partent)
        self.ecrire([[("puis", WHITE, "puis"), ("100 nouveaux arrivent.", RAISON, "100 nouveaux")]], 1.65, centre=xp,
                    fs=38, larg=7.0)
        libres = [places[i] for i in range(18) if i % 6 >= 3][:5]  # 100 = 5 bateaux
        neufs = [bateau(0.95, voile=RAISON).move_to(p + UP * 0.1) for p in libres]
        for b in neufs:
            b.shift(RIGHT * 1.6).set_opacity(0)
        self.au_mot("arrivent")
        self.play(*[b.animate.shift(LEFT * 1.6).set_opacity(1) for b in neufs], run_time=0.8)
        q = self.paragraphe([("Faut-il", JAUNE_TITRE), ("agrandir", JAUNE_TITRE), ("le port ?", JAUNE_TITRE)], 40,
                            buff=0.14, y=-1.95)
        q.set_x(x)
        self.au_mot("Faut-il agrandir")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.play(Indicate(q, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.5)
        self.attendre_voix(marge=0.5)

    # ── 02 : les termes : 360, 280, 240, 220, 210, 205 ────────────────────

    def ecran_termes(self):
        self.nouvel_ecran("02-termes")
        self.ecrire([[("u_{n}", TERME, "u indice n"), ("= nombre de bateaux", WHITE, "le nombre de bateaux"),
                      ("après n années", WHITE, "après n années")]], 2.75, fs=48)
        self.ecrire([[("u_{0} =", TERME, "u indice 0"), ("360", WHITE, "360")]], 1.45, centre=-3.9, fs=54)
        self.ecrire([[("u_{n + 1} =", TERME, "u indice n plus 1"), ("0,5 ×", RAISON, "0,5 fois"),
                      ("u_{n}", TERME, None), ("+ 100", RAISON, "100")]], 1.45, centre=2.2, fs=54, larg=7.6)
        noms = ["u₀", "u₁", "u₂", "u₃", "u₄", "u₅"]
        lg = LigneTermes([fr(v) for v in PORT[:6]], centre=P(-0.25, -1.25), pas=2.0, largeur=1.6, hauteur=1.1,
                         fs=52, noms=noms, fs_noms=40)
        self.au_mot("Les termes")

        def apres(k):
            if k > 0:
                self.sauter(lg, k - 1, "× 0,5 + 100" if k == 1 else " ", cote=UP, fs=34, run_time=0.3)
        self.remplir_ligne(lg, apres=apres)
        self.play(Indicate(lg.cases[5], color=TERME, scale_factor=1.1), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 03 : la conjecture : le nuage s'approche de y = 200 ───────────────

    def ecran_conjecture(self):
        self.nouvel_ecran("03-conjecture")
        rp = Repere((0, 8), (0, 400), P(-5.3, -2.55), P(-1.05, 2.45), grad_u=(100, 200, 300, 400), grad_n=(2, 4, 6, 8))
        pts = [rp.point(n, v) for n, v in enumerate(PORT[:8])]
        xc, lc = 3.1, 5.4
        self.ecrire([[("Les termes se rapprochent", WHITE, "Les termes")]], 2.6, centre=xc, fs=36, larg=lc,
                    avec=[FadeIn(rp), LaggedStart(*[GrowFromCenter(p) for p in pts], lag_ratio=0.12)], run_time=1.0)
        dr = rp.droite(200)
        l200 = self.t("200", 32, JUSTE, audit=False).next_to(dr, RIGHT, buff=0.12)
        self.ecrire([[("de", WHITE, None), ("200,", JUSTE, "200"), ("de plus en plus près", WHITE, "de plus en plus")]],
                    2.05, centre=xc, fs=36, larg=lc, avec=[Create(dr), FadeIn(l200)])
        ecarts = VGroup(*[Line(p.get_center() + DOWN * 0.1, P(p.get_x(), dr.get_y()), stroke_color=RAISON, stroke_width=4)
                          for p in pts[:5]])
        self.play(LaggedStart(*[Create(e) for e in ecarts], lag_ratio=0.2), run_time=0.8)
        lim = self.t("lim", 54, WHITE, audit=False)
        sous = self.t("n → +∞", 30, WHITE, audit=False).next_to(lim, DOWN, buff=0.08)
        un, (pu,) = self.ligne([("u_{n}", TERME, None)], 54)
        un.next_to(lim, RIGHT, buff=0.22).align_to(lim, DOWN).shift(DOWN * 0.04)
        eg, peg = self.ligne([("=", WHITE, None), ("200", JUSTE, None)], 54)
        eg.next_to(un, RIGHT, buff=0.22).align_to(lim, DOWN)
        bloc = VGroup(lim, sous, un, eg).move_to(P(xc, 0.75))
        self.au_mot("la limite")
        self.play(FadeIn(lim, shift=UP * 0.1), FadeIn(un, shift=UP * 0.1), run_time=0.3)
        self.au_mot("quand n tend")
        self.play(FadeIn(sous, shift=UP * 0.1), run_time=0.3)
        self.au_mot("est 200")
        self.play(FadeIn(eg, shift=UP * 0.1), run_time=0.3)
        self.play(Create(self.encadre(bloc, JUSTE, 0.18)), Indicate(dr, color=JUSTE), run_time=0.4)
        self.ecrire([[("La suite semble", WHITE, "la suite semble")]], -0.6, centre=xc, fs=36, larg=lc)
        self.ecrire([[("tendre vers", WHITE, "tendre"), ("200.", JUSTE, "200")]], -1.12, centre=xc, fs=36, larg=lc)
        self.ecrire([[("Pas besoin d'agrandir :", JAUNE_TITRE, "Pas besoin")]], -1.75, centre=xc, fs=36, larg=lc)
        self.ecrire([[("autour de", WHITE, "autour"), ("200 bateaux", JUSTE, "200 bateaux")]], -2.27,
                    centre=xc - 0.3, fs=36, larg=lc - 0.4)
        self.attendre_voix(marge=0.5)

    # ── 04 : sans calculer les termes : L = 0,5L + 100 ────────────────────

    def ecran_point_fixe(self):
        self.nouvel_ecran("04-point-fixe")
        self.ecrire([[("Comment trouver", JAUNE_TITRE, "Comment trouver"), ("200", JAUNE_TITRE, "200")]], 3.2, fs=44)
        self.ecrire([[("sans calculer tous les termes ?", JAUNE_TITRE, "sans calculer")]], 2.55, fs=44)
        xg = -2.35
        lg = LigneTermes(["L", "L"], xs=(2.85, 5.05), centre=P(0, 0.3), largeur=1.2, hauteur=0.95, fs=50)
        noms = VGroup()
        for cs, nm in zip(lg.cases, ("u_{n}", "u_{n + 1}")):
            t, _ = self.ligne([(nm, TERME, None)], 40)
            noms.add(t.next_to(cs, DOWN, buff=0.16))
        arc = lg.saut(0, "× 0,5 + 100", cote=UP, fs=34)
        self.ecrire([[("Si la suite tend vers", WHITE, "Si la suite"), ("L,", TERME, "vers L")]], 1.4, centre=xg, fs=42,
                    larg=7.2, avec=[*[FadeIn(c, scale=0.8) for c in lg.cases], FadeIn(noms, shift=UP * 0.1)])
        self.ecrire([[("L =", TERME, "alors L"), ("0,5", RAISON, "0,5"), ("L", TERME, None), ("+ 100", WHITE, "100")]],
                    0.3, centre=xg, fs=60, larg=7.2, avec_part={1: [Create(arc[0])], 3: [FadeIn(arc[1], scale=1.3)]})
        self.ecrire([[("donc", WHITE, "Donc"), ("0,5", RAISON, "0,5 L"), ("L", TERME, None), ("= 100", WHITE, "100")]],
                    -0.9, centre=xg, fs=60, larg=7.2)
        r = self.ecrire([[("L =", TERME, "et L"), ("200", JUSTE, "200")]], -2.1, centre=xg, fs=64, larg=7.2)
        self.boite(r.parts[-1:])
        self.play(*self.allumer_cases(lg, [0, 1]), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 05 : question-pause n° 1 : uₙ₊₁ = 0,8uₙ + 6 → C (30) ─────────────

    def ecran_question1(self):
        cartes = self.boutons_ligne(["10", "6", "30"], largeur=3.6, fs=56, y=-0.35, pas=3.9)

        def e1():
            self.ecrire([[("u_{0} =", TERME, "u indice 0"), ("10", WHITE, "10"), ("et", WHITE, None),
                          ("u_{n + 1} =", TERME, "u indice n plus 1"), ("0,8", RAISON, "0,8"), ("u_{n}", TERME, None),
                          ("+ 6", WHITE, "6")]], 2.15, fs=52)
            self.ecrire([[("Vers quelle valeur la suite semble-t-elle tendre ?", WHITE, "Vers quelle valeur")]], 1.1,
                        fs=42)

        q = self.question_libre("05-question", [e1], cartes, P(0, -1.75))
        self.dire("05b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        self.ecrire([[("L =", TERME, "L égale"), ("0,8", RAISON, "0,8 L"), ("L", TERME, None), ("+ 6,", WHITE, "6"),
                      ("donc", WHITE, "donc"), ("0,2", RAISON, "0,2 L"), ("L", TERME, None), ("= 6", WHITE, "6")]],
                    -1.7, fs=48)
        r = self.ecrire([[("L =", TERME, "et L"), ("30", JUSTE, "30")]], -2.75, fs=54)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.6)

    # ── 06 : les limites de référence (trois cartes) ──────────────────────

    def ecran_references(self):
        self.nouvel_ecran("06-references")
        self.titre("Quelques limites à connaître", JAUNE_TITRE, 46, extrait="Quelques limites", y=3.2)
        xs, yc, w, h = (-4.05, 0.0, 4.05), 0.02, 3.8, 4.5
        cartes = [self.carte(w, h, P(x, yc)) for x in xs]
        self.play(*[FadeIn(c) for c in cartes], run_time=0.3)
        lc = w - 0.5
        # 1/n → 0
        m1 = mini_lim([1 / k for k in range(1, 9)], 0, 3.1, 1.7, P(xs[0], -1.25), ua=-0.15)
        self.play(FadeIn(m1.axes), run_time=0.2)
        self.ecrire([("frac", [("1", WHITE, "1 sur n")], [("n", TERME, None)]), [("→ 0", JUSTE, "s'approche de 0")]],
                    1.35, centre=xs[0], fs=54, larg=lc,
                    avec=[LaggedStart(*[GrowFromCenter(p) for p in m1.pts], lag_ratio=0.15), Create(m1.ligne)])
        # n² et 2ⁿ → +∞
        m2 = mini_lim([k ** 2 for k in range(7)], None, 3.1, 1.7, P(xs[1], -1.25))
        fl2 = Arrow(m2.pts[-1].get_center() + DOWN * 0.05, m2.pts[-1].get_center() + UP * 0.42 + RIGHT * 0.1,
                    buff=0.1, color=JUSTE, stroke_width=5, max_tip_length_to_length_ratio=0.35)
        self.ecrire([[("n²", TERME, "n au carré"), ("et", WHITE, None), ("2ⁿ", TERME, "2 puissance n")]], 1.75,
                    centre=xs[1], fs=50, larg=lc, avec=[FadeIn(m2.axes)])
        self.ecrire([[("dépassent", WHITE, "dépassent")]], 1.16, centre=xs[1], fs=34, larg=lc,
                    avec=[LaggedStart(*[GrowFromCenter(p) for p in m2.pts], lag_ratio=0.15)])
        self.ecrire([[("tout nombre :", WHITE, "tout nombre")]], 0.72, centre=xs[1], fs=34, larg=lc)
        self.ecrire([[("→ +∞", JUSTE, "plus l'infini")]], 0.1, centre=xs[1], fs=46, larg=lc, avec=[GrowArrow(fl2)])
        # −1 < q < 1 : qⁿ → 0 (0,5ⁿ)
        m3 = mini_lim([0.5 ** k for k in range(8)], 0, 3.1, 1.7, P(xs[2], -1.25), ua=-0.15)
        self.ecrire([[("Si", WHITE, "pour q"), ("−1 <", WHITE, "moins 1"), ("q", RAISON, None), ("< 1 :", WHITE, "et 1")]],
                    1.7, centre=xs[2], fs=46, larg=lc, avec=[FadeIn(m3.axes)])
        self.ecrire([[("qⁿ", RAISON, "q puissance n"), ("→ 0", JUSTE, "tend vers 0")]], 1.03, centre=xs[2], fs=48,
                    larg=lc)
        self.ecrire([[("par exemple :", GREY_A, "par exemple"), ("0,5ⁿ", RAISON, "0,5 puissance")]], 0.42, centre=xs[2],
                    fs=40, larg=lc, avec=[LaggedStart(*[GrowFromCenter(p) for p in m3.pts], lag_ratio=0.15),
                                          Create(m3.ligne)])
        self.attendre_voix(marge=0.5)

    # ── 07 : le piège : raison 2, mais u₀ = −3 → −∞ ──────────────────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège", y=3.2)
        self.ecrire([[("Raison 2 :", RAISON, "raison 2"), ("pas toujours", PIEGE, "pas toujours"),
                      ("+∞ !", PIEGE, "plus l'infini")]], 2.4, fs=46)
        self.ecrire([[("Si", WHITE, "Si u indice 0"), ("u_{0} = −3 :", TERME, "moins 3"),
                      ("u_{n} =", TERME, "alors u indice n"), ("−3 ×", WHITE, "moins 3 fois"), ("2ⁿ", RAISON, "2 puissance")]],
                    1.6, fs=46)
        rp = Repere((0, 3), (-26, 3), P(1.75, -1.95), P(5.3, 0.45), grad_u=(-10, -20))
        self.play(FadeIn(rp), run_time=0.3)
        lg = LigneTermes(["−3", "−6", "−12"], xs=(-5.2, -3.45, -1.7), centre=P(0, 0.35), largeur=1.5, hauteur=0.95,
                         fs=46, couleur=PIEGE)
        vals = [-3, -6, -12, -24]
        pts = []

        def apres(k):
            pts.append(rp.point(k, vals[k], PIEGE))
            self.play(GrowFromCenter(pts[-1]), run_time=0.2)
            if k < 2:
                pass
        self.remplir_ligne(lg, extraits=["3", "6", "12"], apres=apres)
        for i in range(2):
            self.sauter(lg, i, "× 2", cote=DOWN, fs=34, run_time=0.25)
        d4 = rp.point(3, vals[3], PIEGE)
        self.ecrire([[("Elle tend vers", PIEGE, "Elle tend"), ("−∞", PIEGE, "moins l'infini")]], -1.65, centre=-3.45,
                    fs=48, larg=5.4, avec=[GrowFromCenter(d4)])
        r = self.ecrire([[("Regarde aussi le signe du premier terme !", JAUNE_TITRE, "Regarde aussi")]], -2.75,
                        centre=-0.55, fs=42, larg=9.4)
        self.play(Create(self.encadre(r, JAUNE_TITRE, 0.16)), Indicate(lg.cases[0], color=PIEGE), run_time=0.45)
        self.attendre_voix(marge=0.5)

    # ── 08 : question-pause n° 2 : uₙ = 5 + 3/n → A (5) ───────────────────

    def ecran_question2(self):
        cartes = self.boutons_ligne(["5", "+∞", "8"], largeur=3.6, fs=56, y=-0.62, pas=3.9)

        def e1():
            self.ecrire([[("u_{n} =", TERME, "u indice n"), ("5 +", WHITE, "5 plus")],
                         ("frac", [("3", WHITE, "3 sur n")], [("n", TERME, None)]),
                         [("pour n ≥ 1", GREY_A, "à partir de 1")]], 1.9, fs=50)
            self.ecrire([[("Vers quoi semble tendre", WHITE, "Vers quoi"), ("u_{n} ?", TERME, None)]], 0.6, fs=42)

        q = self.question_libre("08-question", [e1], cartes, P(0, -1.95))
        self.dire("08b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        self.ecrire([("frac", [("3", WHITE, "3 sur n")], [("n", TERME, None)]),
                     [("→ 0", JUSTE, "s'approche de 0"), ("quand n devient très grand :", WHITE, "quand n")]], -1.9, fs=44)
        r = self.ecrire([[("il reste", WHITE, "il reste"), ("5", JUSTE, "5")]], -3.05, fs=50)
        self.boite(r.parts[-1:])
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : 4 × 0,9ⁿ + 7 et 2n² − 50 ───────────────────────────

    def carte_defi(self, centre):
        """La carte du défi : un coin d'axes, des points vers la droite, un « ? »."""
        c = self.carte(2.7, 2.9, centre, RAISON)
        m = mini_lim([2.0, 1.4, 1.75, 1.55, 1.62], None, 2.1, 1.5, c.get_center() + DOWN * 0.45, ua=0.5, ub=2.4)
        q = self.t("?", 72, RAISON, audit=False).move_to(c.get_center() + UP * 0.75 + RIGHT * 0.15)
        return VGroup(c, m, q)

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        tit = self.titre("À toi de jouer !", JAUNE_TITRE, 46, extrait="À toi", y=3.2)
        xg, lg = -1.5, 8.6
        cd = self.carte_defi(P(4.55, 0.55))
        p0 = self.ecrire([[("Pour tout entier naturel n :", WHITE, "Pour tout entier")]], 2.3, centre=xg, fs=40, larg=lg,
                         avec=[FadeIn(cd, shift=LEFT * 0.2)])
        u_ = self.ecrire([[("u_{n} =", TERME, "u indice n"), ("4 ×", WHITE, "4 fois"), ("0,9ⁿ", RAISON, "0,9 puissance"),
                           ("+ 7", WHITE, "7")]], 1.35, centre=xg, fs=56, larg=lg)
        vq = self.ecrire([[("Vers quoi semble tendre", WHITE, "Vers quoi"), ("u_{n} ?", TERME, None)]], 0.42, centre=xg,
                         fs=40, larg=lg)
        v_ = self.ecrire([[("Et", WHITE, "Et v"), ("v_{n} =", TERME, None), ("2n²", RAISON, "2 n au carré"),
                           ("− 50 ?", WHITE, "50")]], -0.6, centre=xg, fs=56, larg=lg)
        self.defi_pause(-1.9, x=-0.4)
        self._defi = (tit, p0, u_, vq, v_, cd)

    def ecran_correction(self):
        self.dire("09b-correction")
        tit, p0, u_, vq, v_, cd = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 46, JUSTE).move_to(tit)
        xg, lg = -1.65, 8.4
        self.play(ReplacementTransform(tit, cor), FadeOut(p0), FadeOut(vq), FadeOut(cd),
                  u_.animate.scale(0.82).move_to(P(xg, 2.3)), v_.animate.scale(0.82).move_to(P(xg, -0.45)), run_time=0.45)
        self.remove(p0, vq, cd)
        mu = mini_lim([4 * 0.9 ** k + 7 for k in range(0, 30, 3)], 7, 2.7, 1.95, P(4.5, 1.15), ua=6.2)
        mv = mini_lim([2 * k * k - 50 for k in range(8)], None, 2.7, 1.95, P(4.5, -1.35))
        flv = Arrow(mv.pts[-1].get_center() + DOWN * 0.05, mv.pts[-1].get_center() + UP * 0.5 + RIGHT * 0.1, buff=0.1,
                    color=JUSTE, stroke_width=5, max_tip_length_to_length_ratio=0.35)
        self.ecrire([[("−1 <", WHITE, "moins 1"), ("0,9", RAISON, None), ("< 1,", WHITE, "et 1"), ("donc", WHITE, "donc"),
                      ("0,9ⁿ", RAISON, "0,9 puissance"), ("→ 0", JUSTE, "tend vers 0")]], 1.45, centre=xg, fs=44, larg=lg,
                    avec_part={0: [FadeIn(mu.axes)]})
        r1 = self.ecrire([[("u_{n}", TERME, "u indice n semble"), ("semble tendre vers", WHITE, None),
                           ("7", JUSTE, "vers 7")]], 0.55, centre=xg, fs=46, larg=lg,
                         avec=[LaggedStart(*[GrowFromCenter(p) for p in mu.pts], lag_ratio=0.1), Create(mu.ligne)])
        self.boite(r1.parts[-1:])
        self.ecrire([[("2n²", RAISON, "Et 2 n au carré"), ("dépasse tout nombre :", WHITE, "dépasse")]], -1.3, centre=xg,
                    fs=44, larg=lg, avec=[FadeIn(mv.axes), LaggedStart(*[GrowFromCenter(p) for p in mv.pts],
                                                                         lag_ratio=0.12)])
        r2 = self.ecrire([[("v_{n}", TERME, "v indice n tend"), ("tend vers", WHITE, None), ("+∞", JUSTE, "plus l'infini")]],
                         -2.2, centre=xg, fs=46, larg=lg, avec=[GrowArrow(flv)])
        self.boite(r2.parts[-1:])
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        fs = 40

        def L(m):
            return self.construire([m], fs)
        p1 = [L([("Conjecturer une limite : regarder les termes", WHITE, None)]),
              L([("quand n devient très grand.", WHITE, None)])]
        p2 = [L([("Si", WHITE, None), ("u_{n + 1} =", TERME, None), ("a", RAISON, None), ("u_{n}", TERME, None),
                 ("+ b,", RAISON, None)]),
              L([("la limite L vérifie", WHITE, None), ("L =", TERME, None), ("a", RAISON, None), ("L", TERME, None),
                 ("+ b.", RAISON, None)])]
        p3 = [L([("Suite géométrique : la raison,", WHITE, None)]),
              L([("puis le signe du premier terme.", JAUNE_TITRE, None)])]
        self.finale([(p1, ["Pour conjecturer", "quand n devient"]), (p2, ["Pour u indice n plus 1", "la limite L"]),
                     (p3, ["Et pour une suite géométrique", "puis le signe"])], cle="10-finale")

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_termes()
        self.ecran_conjecture()
        self.ecran_point_fixe()
        self.ecran_question1()
        self.ecran_references()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin("11-abonne")
