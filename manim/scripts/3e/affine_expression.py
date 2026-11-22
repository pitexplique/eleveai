# affine_expression.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 05 : TROUVER L'EXPRESSION d'une fonction affine.
# Paysage 16:9, AVEC VOIX, ceinture VERTE.
# Métier : Awa, technicienne en environnement (un jeune baobab : 70 cm à 2 ans, 160 cm à 5 ans → f(x) = 30x + 10 ;
# une citerne d'eau de pluie : 500 litres, − 20 litres par jour → f(x) = −20x + 500).
# Écrans (clés de manim/voix/3e-affine-expression.json) :
#   00-garde : page de garde, échelle des ceintures, deux points et une droite ;
#   01-technicienne : Awa et ses deux baobabs (2 ans : 70 cm ; 5 ans : 160 cm) ;
#   02-coefficient : le repère âge / hauteur, + 3 ans, + 90 cm, 90 ÷ 3 : a = 30 ;
#   03-ordonnee : 30 × 2 + b = 70, b = 10 (point violet sur l'axe vertical), f(x) = 30x + 10, vérification à 5 ans ;
#   03q / 03r : QUESTION 1, réponse A (2x − 3) ;
#   04-phrase : la citerne, a = −20, b = 500, f(x) = −20x + 500 ;
#   05q / 05r : QUESTION 2, réponse C (3x + 2) ;
#   06-defi / 06b-correction : f(−1) = 7 et f(2) = −2 → −3x + 4 ; f linéaire, f(4) = 10 → 2,5x ;
#   07-finale : « Ce que tu as appris » ; 08-abonne : fin commune (manim/fin_commune.py).
# Lettres des questions : A (03q), C (05q).
# Code couleur : x bleu ; a (coefficient directeur, « monte de… ») orange ; b (ordonnée à l'origine, point sur
# l'axe vertical) violet ; juste vert ; piège rouge ; droite de f bleue.
# Voix : manim/voix/3e-affine-expression.json (validée) ; marques : affine_expression_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_expression.py AffineExpression3e --media_dir manim/scripts/3e/media-affine-05-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_expression.py AffineExpression3e -o eleveai-maths-3e-affine-expression --media_dir manim/scripts/3e/media-affine-05
# Sortie : manim/sorties/3e/maths/fonctions-affines/05-expression/eleveai-maths-3e-affine-expression.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS et ses outils communs

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, pastille  # noqa: E402
from ident_factoriser import IdentFactoriser3e  # noqa: E402

PAROLE["0"] = "0"            # la voix écrit « f de 0 », « b vaut 0 » en chiffres
PAROLE["cm"] = "centimètres"
PAROLE["L"] = "litres"
PAROLE["ax"] = "a x"

COUL_A = OPERATION           # a : orange
COUL_B = "#a78bfa"           # b : violet
DROITE = BLEU_CALCUL         # la droite de f
GRILLE = "#334155"
TRONC = "#9a6b3f"
TRONC_BORD = "#6b4423"
FEUILLE = "#16a34a"
SOL = "#78350f"
EAU = "#38bdf8"


class Controle:
    """AUDIT=1 : après chaque animation, signale un texte trop petit (PETIT, taille effective < 32), deux textes
    qui se chevauchent (MORD), un cadre qui coupe un texte (MORD-CADRE), un texte ou un cadre sur Ti-Margo
    (MORD-MARGO). Les boîtes englobantes comptent les étiquettes d'axe."""

    def setup(self):
        super().setup()
        if os.environ.get("AUDIT") != "1":
            return
        orig = self.renderer.play

        def play(scene, *a, **k):
            orig(scene, *a, **k)
            self._controler()

        self.renderer.play = play

    @staticmethod
    def _boite(f):
        pts = f.get_all_points()
        if not len(pts):
            return None
        return pts[:, 0].min(), pts[:, 0].max(), pts[:, 1].min(), pts[:, 1].max()

    def _controler(self):
        vus = self.__dict__.setdefault("_ctl_vus", set())
        cle = str(getattr(self, "_cle_voix", "?"))
        if cle.endswith("abonne"):
            return
        txt, cad, margo = [], [], []
        for m in self.mobjects:
            if type(m).__name__.startswith("Mascotte"):
                b = self._boite(m)
                if b:
                    margo.append(b)
                continue
            if getattr(m, "_commun", False):  # en-tête, échelle des ceintures, compte à rebours : modules communs
                continue
            rebours = {id(g) for f in m.get_family() if type(f).__name__ == "CompteARebours" for g in f.get_family()}
            for f in m.get_family():
                if id(f) in rebours:
                    continue
                if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                    if f.get_fill_opacity() < 0.2:
                        continue
                    b = self._boite(f)
                    if b:
                        txt.append((f, b))
                elif isinstance(f, RoundedRectangle) and f.get_stroke_opacity() > 0.5 and f.get_fill_opacity() < 0.05:
                    b = self._boite(f)
                    if b:
                        cad.append(b)

        def dire(cle2, msg):
            if (cle, cle2) not in vus:
                vus.add((cle, cle2))
                print(msg, flush=True)

        def inter(a, b, m=0.03):
            return min(a[1], b[1]) - max(a[0], b[0]) > m and min(a[3], b[3]) - max(a[2], b[2]) > m

        for f, b in txt:
            if f.font_size < 31.5 and not getattr(f, "_graduation", False):
                dire(("p", f.original_text), f"PETIT {cle} « {f.original_text} » {f.font_size:.0f} pt")
            for g in margo:
                if inter(b, g, 0.0):
                    dire(("m", f.original_text), f"MORD-MARGO {cle} « {f.original_text} »")
        for i in range(len(txt)):
            for j in range(i + 1, len(txt)):
                if inter(txt[i][1], txt[j][1]):
                    a, b = txt[i][0].original_text, txt[j][0].original_text
                    dire(("t", a, b), f"MORD {cle} « {a} » / « {b} »")
        for c in cad:
            for g in margo:
                if inter(c, g, 0.0):
                    dire(("mc", round(c[0], 1)), f"MORD-MARGO {cle} cadre x[{c[0]:.1f}, {c[1]:.1f}]")
            for f, b in txt:
                dedans = b[0] >= c[0] - 0.01 and b[1] <= c[1] + 0.01 and b[2] >= c[2] - 0.01 and b[3] <= c[3] + 0.01
                if inter(b, c) and not dedans:
                    dire(("c", f.original_text, round(c[0], 1)), f"MORD-CADRE {cle} « {f.original_text} »")


def nb(v):
    s = f"{v:g}".replace(".", ",")
    return s.replace("-", "−")


def teinte(e, orange=(), violet=(), bleu=()):
    for i in orange:
        e.atomes[i].set_color(COUL_A)
    for i in violet:
        e.atomes[i].set_color(COUL_B)
    for i in bleu:
        e.atomes[i].set_color(INCONNUE)
    return e


class Repere(VGroup):
    """Un repère dessiné : .p(x, y) le point à l'écran ; graduations à 28 pt (données de figure, sans audit)."""

    def __init__(self, o, ux, uy, xr, yr, xlab=(), ylab=(), xticks=None, yticks=None, nom_x="x", nom_y="y",
                 fs=28, grille=True, zero=True, nom_x_pos="dessous", **kw):
        super().__init__(**kw)
        self.o, self.ux, self.uy = np.array(o, dtype=float), ux, uy
        (x0, x1), (y0, y1) = xr, yr
        self.xr, self.yr = xr, yr
        xticks = list(xlab) if xticks is None else list(xticks)
        yticks = list(ylab) if yticks is None else list(yticks)
        self.grille = VGroup()
        if grille:
            for v in xticks:
                if v != 0:
                    self.grille.add(Line(self.p(v, y0), self.p(v, y1)))
            for v in yticks:
                if v != 0:
                    self.grille.add(Line(self.p(x0, v), self.p(x1, v)))
            self.grille.set_stroke(GRILLE, 1.5)
        self.ax = Arrow(self.p(x0, 0) + LEFT * (0.15 if x0 < 0 else 0), self.p(x1, 0) + RIGHT * 0.4, buff=0,
                        stroke_width=3, tip_length=0.18, max_tip_length_to_length_ratio=0.08, color=WHITE)
        self.ay = Arrow(self.p(0, y0) + DOWN * (0.15 if y0 < 0 else 0), self.p(0, y1) + UP * 0.4, buff=0,
                        stroke_width=3, tip_length=0.18, max_tip_length_to_length_ratio=0.08, color=WHITE)
        self.traits = VGroup(*[Line(self.p(v, 0) + DOWN * 0.07, self.p(v, 0) + UP * 0.07) for v in xticks if v != 0],
                             *[Line(self.p(0, v) + LEFT * 0.07, self.p(0, v) + RIGHT * 0.07) for v in yticks if v != 0])
        self.traits.set_stroke(WHITE, 2.5)
        self.labs = VGroup()
        for v in xlab:
            if v != 0:
                self.labs.add(T(nb(v), fs, WHITE, audit=False).next_to(self.p(v, 0), DOWN, buff=0.1))
        for v in ylab:
            if v != 0:
                self.labs.add(T(nb(v), fs, WHITE, audit=False).next_to(self.p(0, v), LEFT, buff=0.12))
        if zero:
            self.labs.add(T("0", fs, WHITE, audit=False).next_to(self.p(0, 0), DL, buff=0.06))
        for l in self.labs:
            l._graduation = True
        self.noms = VGroup()
        if nom_x:
            self.nx = T(nom_x, 32, CIEL, audit=False)
            if nom_x_pos == "dessus" or y0 < 0:
                self.nx.next_to(self.ax.get_end(), UP, buff=0.12).align_to(self.ax.get_end(), RIGHT)
            elif nom_x_pos == "droite":
                self.nx.next_to(self.ax.get_end(), RIGHT, buff=0.12)
            else:  # sous les graduations, avec de l'air
                bas = min([l.get_bottom()[1] for l in self.labs] + [self.p(0, 0)[1] - 0.1])
                self.nx.move_to(P(0, bas - 0.15 - self.nx.height / 2)).align_to(self.ax.get_end(), RIGHT)
            self.noms.add(self.nx)
        if nom_y:
            self.ny = T(nom_y, 32, CIEL, audit=False).next_to(self.ay.get_end(), RIGHT, buff=0.15)
            self.noms.add(self.ny)
        self.add(self.grille, self.ax, self.ay, self.traits, self.labs, self.noms)

    def p(self, x, y):
        return self.o + np.array([x * self.ux, y * self.uy, 0.0])

    def point(self, x, y, couleur=WHITE, r=0.1):
        return Dot(self.p(x, y), radius=r, color=couleur).set_z_index(5)

    def droite(self, a, b, xa, xb, couleur=DROITE, sw=5):
        """La droite, tenue DANS la grille (jamais au-delà de la dernière graduation)."""
        (x0, x1), (y0, y1) = self.xr, self.yr
        xa, xb = max(xa, x0), min(xb, x1)
        if a:
            ya, yb = sorted(((y0 - b) / a, (y1 - b) / a))
            xa, xb = max(xa, ya), min(xb, yb)
        return Line(self.p(xa, a * xa + b), self.p(xb, a * xb + b), color=couleur, stroke_width=sw).set_z_index(3)

    def lecture(self, x, y, couleur="#e2e8f0"):
        """L'image se lit : axe horizontal → droite → axe vertical, en pointillés."""
        l1 = DashedLine(self.p(x, 0), self.p(x, y), dash_length=0.1, color=couleur, stroke_width=3)
        l2 = DashedLine(self.p(x, y), self.p(0, y), dash_length=0.1, color=couleur, stroke_width=3)
        return VGroup(l1, l2).set_z_index(2)

    def pas_h(self, x0, x1, y, s, couleur=INCONNUE, fs=32, cote=DOWN):
        fl = Arrow(self.p(x0, y), self.p(x1, y), buff=0, stroke_width=5, tip_length=0.16,
                   max_tip_length_to_length_ratio=0.3, color=couleur).set_z_index(4)
        lab = T(s, fs, couleur, audit=False).next_to(fl, cote, buff=0.1).set_z_index(4) if s else VGroup()
        return fl, lab

    def pas_v(self, x, y0, y1, s, couleur=COUL_A, fs=32, cote=RIGHT):
        fl = Arrow(self.p(x, y0), self.p(x, y1), buff=0, stroke_width=5, tip_length=0.16,
                   max_tip_length_to_length_ratio=0.3, color=couleur).set_z_index(4)
        lab = T(s, fs, couleur, audit=False).next_to(fl, cote, buff=0.1).set_z_index(4) if s else VGroup()
        return fl, lab


def baobab(h, sol=ORIGIN):
    """Un baobab dessiné, de hauteur h, posé sur le point sol : tronc en bouteille, branches courtes, touffes."""
    w = h * 0.36
    th = h * 0.68
    x0, y0 = sol[0], sol[1]
    tronc = Polygon(P(x0 - w / 2, y0), P(x0 + w / 2, y0), P(x0 + w * 0.42, y0 + th * 0.45),
                    P(x0 + w * 0.26, y0 + th), P(x0 - w * 0.26, y0 + th), P(x0 - w * 0.42, y0 + th * 0.45),
                    fill_color=TRONC, fill_opacity=1, stroke_color=TRONC_BORD, stroke_width=2)
    haut = P(x0, y0 + th)
    branches = VGroup()
    touffes = VGroup()
    for dx, dy in ((-0.42, 0.2), (-0.16, 0.3), (0.16, 0.3), (0.42, 0.2)):
        bout = haut + P(dx * h * 0.75, dy * h * 0.75)
        branches.add(Line(haut + P(dx * w * 0.5, 0), bout, color=TRONC, stroke_width=max(3, 7 * h / 3)))
        touffes.add(Ellipse(width=h * 0.26, height=h * 0.13, fill_color=FEUILLE, fill_opacity=1,
                            stroke_color="#14532d", stroke_width=2).move_to(bout + P(0, h * 0.02)))
    g = VGroup(branches, tronc, touffes)
    # la hauteur exacte : du sol au haut des touffes
    k = h / (g.get_top()[1] - y0)
    g.scale(k, about_point=P(x0, y0))
    return g


def awa(s=0.7, fs=32, lignes=("Awa", "technicienne en", "environnement")):
    """Awa, technicienne en environnement : gilet orange, un carnet de relevés."""
    m = Metier(list(lignes), fs=fs, peau="#5c3a21", tenue="#15803d", cheveux="#111827", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.08, aligned_edge=LEFT)
    p = m.perso
    gilet = Polygon(P(-0.5, -0.5), P(0.5, -0.5), P(0.62, -1.3), P(-0.62, -1.3), fill_color=ORANGE_RETENUE,
                    fill_opacity=0.9, stroke_width=0).scale(s).move_to(p.corps.get_center() + UP * 0.25 * s)
    carnet = RoundedRectangle(width=0.36 * s, height=0.46 * s, corner_radius=0.04, fill_color="#f8fafc",
                              fill_opacity=1, stroke_color="#64748b", stroke_width=2)
    carnet.next_to(p.corps, RIGHT, buff=0.02).shift(UP * 0.25 * s)
    p.add(gilet, carnet)
    return m


class Citerne(VGroup):
    """La citerne d'eau de pluie : .cuve, .eau, .robinet, .goutte, .pluie ; niveau entre 0 et 1."""

    def __init__(self, w=2.2, h=2.9, niveau=0.85, centre=ORIGIN, **kw):
        super().__init__(**kw)
        c = np.array(centre, dtype=float)
        self.cuve = RoundedRectangle(width=w, height=h, corner_radius=0.18, fill_color="#1e293b", fill_opacity=1,
                                     stroke_color="#94a3b8", stroke_width=4).move_to(c)
        he = (h - 0.12) * niveau
        self.eau = RoundedRectangle(width=w - 0.12, height=he, corner_radius=0.12, fill_color=EAU, fill_opacity=0.85,
                                    stroke_width=0)
        self.eau.move_to(c + DOWN * (h / 2 - 0.06 - he / 2))
        self.cercles = VGroup(*[Line(c + P(-w / 2, y), c + P(w / 2, y)) for y in (-h * 0.25, h * 0.25)])
        self.cercles.set_stroke("#94a3b8", 3)
        self.couvercle = RoundedRectangle(width=w * 0.5, height=0.2, corner_radius=0.06, fill_color="#64748b",
                                          fill_opacity=1, stroke_width=0).next_to(self.cuve, UP, buff=0)
        bas = c + P(w / 2, -h / 2 + 0.35)
        self.robinet = VGroup(Rectangle(width=0.32, height=0.14, fill_color="#cbd5e1", fill_opacity=1,
                                        stroke_width=0).move_to(bas + RIGHT * 0.16),
                              Rectangle(width=0.12, height=0.2, fill_color="#cbd5e1", fill_opacity=1,
                                        stroke_width=0).move_to(bas + P(0.28, -0.12)))
        self.depart_goutte = bas + P(0.28, -0.3)
        self.goutte = Dot(self.depart_goutte, radius=0.07, color=EAU)
        self.pluie = VGroup(*[Line(c + P(dx, h / 2 + 0.95 + dy), c + P(dx - 0.08, h / 2 + 0.7 + dy))
                              for dx, dy in ((-0.7, 0.1), (-0.25, -0.05), (0.2, 0.12), (0.65, -0.02))])
        self.pluie.set_stroke(EAU, 4)
        self.add(self.cuve, self.eau, self.cercles, self.couvercle, self.robinet, self.goutte)


class AffineExpression3e(Controle, IdentFactoriser3e):
    nom_voix = "3e-affine-expression"
    fichier_marques = "affine_expression_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    @staticmethod
    def _fs(m):
        """La taille effective (pt) du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql (22/11), modèle affine_coeff_directeur : énoncé à 40 pt, cartes à 40 pt raccourcies à
        leur contenu (la place de la coche gardée : le module ne rétrécit plus la bonne), « Mets pause, » /
        « et choisis ! » à 34 pt, ORANGE (l'ancienne couleur était celle d'un texte noir : la phrase était
        invisible), À DROITE des cartes, à mi-hauteur, loin de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self._phrases_q = list(phrase)
        if len(q.submobjects):
            q.scale(40 / self._fs(q))
            q.next_to(tete, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(40 / self._fs(dedans[1]), about_point=dedans.get_left())
            cadre.stretch_to_fit_height(dedans.height + 0.22)
            dedans.set_y(cadre.get_y())
        larg = max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 1.0
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        cartes.arrange(DOWN, buff=0.26, aligned_edge=LEFT)
        cartes.next_to(q if len(q.submobjects) else tete, DOWN, buff=0.35).align_to(P(self.XL, 0), LEFT)
        neuf = VGroup(T("Mets pause,", 34, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 34, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, RIGHT, buff=0.3).set_y(cartes.get_y())
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE {self._cle_voix} tete {tete.get_top()[1]:.2f}/{tete.get_bottom()[1]:.2f} "
                  f"q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} {self._fs(q):.0f} pt ; cartes "
                  f"{cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} x[{cartes.get_left()[0]:.2f}, "
                  f"{cartes.get_right()[0]:.2f}] {self._fs(cartes[0][1][1]):.0f} pt ; pause bas "
                  f"{neuf.get_bottom()[1]:.2f} x[{neuf.get_left()[0]:.2f}, {neuf.get_right()[0]:.2f}] "
                  f"{self._fs(neuf):.0f} pt ; rebours x[{rebours.get_left()[0]:.2f}, {rebours.get_right()[0]:.2f}]",
                  flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def ligne_q(self, s, phrase, gestes):
        """Comme le module, mais la ligne posée est gardée : elle s'efface quand la réponse monte."""
        ref = self.q_q[0]
        e = X(s, 40)
        e.move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self._lignes_q = [e]
        return self.poser_gestes(e, phrase, gestes, echelle=1.2, rt=0.2)

    def monter_reponse(self, bonne):
        """L'énoncé et les mauvaises cartes s'effacent, la bonne carte monte à la place de l'énoncé, et la
        réponse (lignes courtes) se pose dessous à 36 pt (des X neufs à 36, jamais ramenés à une largeur)."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        enonce = VGroup(*getattr(self, "_lignes_q", []))
        haut = enonce.get_top()[1] if len(enonce) else cartes[0].get_top()[1]
        d = UP * (haut - b.get_top()[1])
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        if len(enonce):
            anims.append(FadeOut(enonce))
        anims.append(b.animate.shift(d))
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.25)
        self._lignes_q = []
        rep = VGroup(*[X(s, 36, VERT_OK) for s in self._phrases_q])
        rep.arrange(DOWN, aligned_edge=LEFT, buff=0.24)
        rep.next_to(P(0, b.get_bottom()[1] - 0.3), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        self._rep_x = list(rep)
        for l, r in zip(ph, rep):
            l.move_to(r)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} {self._fs(rep):.0f} pt, bas {rep.get_bottom()[1]:.2f}, "
                  f"droite {rep.get_right()[0]:.2f}", flush=True)

    def ph_gestes(self, i, s, phrase, gestes, premier=False):
        """La ligne i de la réponse, à 36 pt, posée au mot, avec ses gestes sur la figure."""
        e = self._rep_x[i]
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes, rt=0.16, sauf=sauf)

    # ── le repère du baobab (écrans 02 et 03) ───────────────────────────────
    def repere_baobab(self):
        # plus étroit et plus à gauche : « + 90 cm » ne touche plus le calcul de droite
        return Repere(P(-5.75, -2.3), 0.55, 0.0245, (0, 6), (0, 200), xlab=range(1, 7), ylab=(40, 80, 120, 160, 200),
                      nom_x="âge (ans)", nom_y="hauteur (cm)")

    @staticmethod
    def fond(lab):
        """Une étiquette posée dans la grille : un fond noir opaque derrière, rien ne la traverse."""
        r = BackgroundRectangle(lab, color=BLACK, fill_opacity=1, buff=0.05).set_z_index(lab.z_index - 0.5)
        return VGroup(r, lab)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Trouver l'expression d'une fonction affine", self.identite, self.ceinture,
                                       y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        for m in (titre, ident, ech):
            m._commun = True
        self.au("Trouver", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        R = Repere(P(-5.7, -1.55), 0.55, 0.55, (0, 5), (0, 5.2), xticks=range(1, 6), yticks=range(1, 6),
                   nom_x=None, nom_y=None, zero=False)
        pa, pb = R.point(1, 2), R.point(4, 4)
        d = R.droite(2 / 3, 4 / 3, 0, 5)
        q = T("?", 64, JAUNE_TITRE, audit=False, gras=True).move_to(R.p(1.3, 4.3))
        self.play(FadeIn(R), run_time=0.3)
        l1 = self.ld("Deux mesures", 0.75, 52, x0=-1.0, maxw=7.4)
        self.poser_gestes(l1, "Deux mesures", {0: lambda: [FadeIn(pa, scale=2)], 1: lambda: [FadeIn(pb, scale=2)]})
        l2 = self.ld("suffisent-elles ?", -0.15, 52, JAUNE_TITRE, x0=-1.0, maxw=7.4)
        self.poser_gestes(l2, "suffisent-elles ?", {0: lambda: [Create(d)]})
        self.play(FadeIn(q, scale=0.5), run_time=0.25)
        self.insister(l2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Awa et le baobab ───────────────────────────────────────────────
    def ecran_technicienne(self):
        self.ecran("01-technicienne")
        sol_y = -0.75
        sol = Line(P(-6.55, sol_y), P(-0.9, sol_y), color=SOL, stroke_width=6)
        k = 0.024  # unités par centimètre
        b1 = baobab(70 * k, P(-5.15, sol_y))
        b2 = baobab(160 * k, P(-2.85, sol_y))
        # les cotes : à GAUCHE du petit, à DROITE du grand, l'étiquette au-dessus de la flèche (rien sur un tronc)
        f1 = DoubleArrow(P(-6.15, sol_y), P(-6.15, sol_y + 70 * k), buff=0, stroke_width=3, tip_length=0.13,
                         max_tip_length_to_length_ratio=0.15, color=WHITE)
        c1 = T("70 cm", 32, WHITE).next_to(f1, UP, buff=0.12).align_to(P(-6.55, 0), LEFT)
        f2 = DoubleArrow(P(-1.05, sol_y), P(-1.05, sol_y + 160 * k), buff=0, stroke_width=3, tip_length=0.13,
                         max_tip_length_to_length_ratio=0.1, color=WHITE)
        # « 160 cm » calé à DROITE sur sa flèche : il s'étend vers la gauche, au-dessus des touffes, loin du texte
        c2 = T("160 cm", 32, WHITE).next_to(f2, UP, buff=0.12).align_to(f2, RIGHT)
        a1 = T("2 ans", 38, CIEL).next_to(P(-5.15, sol_y), DOWN, buff=0.12)
        a2 = T("5 ans", 38, CIEL).next_to(P(-2.85, sol_y), DOWN, buff=0.12)
        m = awa(0.95, 32, ("Awa, technicienne", "en environnement"))
        m.perso.move_to(P(-5.75, -2.4))
        m.nom.next_to(m.perso, RIGHT, buff=0.15).align_to(m.perso, UP).shift(DOWN * 0.35)
        self.au("Awa", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("environnement", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        x0, mw = 0.0, 6.4
        l1 = self.ld("Un jeune baobab :", 3.05, 44, x0=x0, maxw=mw)
        self.poser_gestes(l1, "un jeune baobab.", {2: lambda: [Create(sol)]})
        l2 = self.ld("à 2 ans : 70 cm ;", 2.3, 44, x0=x0, maxw=mw)
        self.poser_gestes(l2, "À 2 ans, il mesure 70 centimètres.",
                          {1: lambda: [GrowFromEdge(b1, DOWN), FadeIn(a1)],
                           4: lambda: [GrowFromCenter(f1), FadeIn(c1)]})
        l3 = self.ld("à 5 ans : 160 cm.", 1.55, 44, x0=x0, maxw=mw)
        self.poser_gestes(l3, "À 5 ans, 160 centimètres.",
                          {1: lambda: [GrowFromEdge(b2, DOWN), FadeIn(a2)],
                           4: lambda: [GrowFromCenter(f2), FadeIn(c2)]})
        l4 = self.ld("Croissance régulière :", 0.7, 40, CIEL, x0=x0, maxw=mw)
        self.poser_gestes(l4, "Sa croissance est régulière :",
                          {0: lambda: [Indicate(VGroup(b1, b2), color=JAUNE_TITRE, scale_factor=1.04)]})
        l5 = self.ld("sa hauteur est", 0.0, 44, x0=x0, maxw=mw)
        self.dit(l5, "sa hauteur est")
        l5b = self.ld("une fonction affine", -0.7, 44, x0=x0, maxw=mw)
        self.dit(l5b, "une fonction affine")
        l6 = self.ld("de son âge.", -1.4, 44, x0=x0, maxw=mw)
        self.dit(l6, "de son âge.")
        l7 = self.ld("Mais laquelle ?", -2.2, 50, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l7, "Mais laquelle ?")
        self.insister(l7, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : d'abord a ──────────────────────────────────────────────────────
    def ecran_coefficient(self):
        self.ecran("02-coefficient")
        R = self.repere_baobab()
        pa, pb = R.point(2, 70), R.point(5, 160)
        d = R.droite(30, 10, 0, 6.3)
        self.play(FadeIn(R), FadeIn(pa), FadeIn(pb), FadeIn(d), run_time=0.1)
        fh, lh = R.pas_h(2, 5, 70, "+ 3 ans")
        fv, lv = R.pas_v(5, 70, 160, "+ 90 cm", cote=RIGHT)
        x0, mw = -0.2, 6.5
        l0 = self.ld("D'abord a.", 3.0, 52, x0=x0, maxw=mw)
        teinte(l0, orange=[3])
        self.dit(l0, "D'abord a.")
        l1 = self.ld("Entre 2 ans et 5 ans,", 2.2, 44, x0=x0, maxw=mw)
        self.poser_gestes(l1, "Entre 2 ans et 5 ans,", {1: lambda: [Indicate(pa, scale_factor=1.8)],
                                                          4: lambda: [Indicate(pb, scale_factor=1.8)]})
        l2 = self.ld("3 ans passent.", 1.45, 44, x0=x0, maxw=mw)
        teinte(l2, bleu=[0])
        self.poser_gestes(l2, "3 ans passent.", {0: lambda: [GrowArrow(fh), FadeIn(lh)]})
        l3 = self.ld("160 − 70 = 90 cm", 0.6, 48, x0=x0, maxw=mw)
        teinte(l3, orange=[4])
        self.poser_gestes(l3, "Le baobab gagne 160 moins 70 : 90 centimètres.",
                          {4: lambda: [GrowArrow(fv), FadeIn(lv)]}, echelle=1.15)
        l4 = self.ld("90 ÷ 3", -0.25, 52, x0=x0 + 0.4, maxw=mw)
        teinte(l4, orange=[0], bleu=[2])
        self.dire_eq(l4, "90 divisé par 3", echelle=1.15)
        l5 = self.ld("a = 30", -1.25, 58, COUL_A, x0=x0 + 0.6, maxw=mw)
        self.dire_eq(l5, "a vaut 30.", echelle=1.2)
        cad = self.cadre_ok(l5, 0.16)
        self.play(Create(cad), run_time=0.25)
        l6 = self.ld("+ 30 cm par an.", -2.35, 46, COUL_A, x0=x0, maxw=mw)
        # « 1 an » et « + 30 » dans la grille : sur un fond noir opaque (ils étaient sur les traits) ; « + 30 » à
        # DROITE de sa flèche (à gauche, il touchait la droite)
        un, trente = R.pas_h(2, 3, 70, "1 an", fs=32), R.pas_v(3, 70, 100, "+ 30", fs=32, cote=RIGHT)
        un_l, trente_l = self.fond(un[1]), self.fond(trente[1])
        self.poser_gestes(l6, "Il grandit de 30 centimètres par an.",
                          {1: lambda: [FadeOut(VGroup(fh, lh)), GrowArrow(un[0]), FadeIn(un_l),
                                       GrowArrow(trente[0]), FadeIn(trente_l)]})
        self.attendre_voix(marge=0.8)

    # ── 03 : puis b ─────────────────────────────────────────────────────────
    def ecran_ordonnee(self):
        self.ecran("03-ordonnee")
        R = self.repere_baobab()
        pa, pb = R.point(2, 70), R.point(5, 160)
        d = R.droite(30, 10, 0, 6.3)
        pb0 = R.point(0, 10, COUL_B, r=0.13)
        lb0 = T("10", 32, COUL_B).next_to(R.p(0, 10), LEFT, buff=0.15)  # à gauche de l'axe : jamais sur la droite
        self.play(FadeIn(R), FadeIn(pa), FadeIn(pb), FadeIn(d), run_time=0.1)
        x0, mw = -0.05, 6.25
        l0 = self.ld("Puis b.", 3.05, 52, x0=x0, maxw=mw)
        teinte(l0, violet=[1])
        self.dit(l0, "Puis b.")
        e1 = X("f(x) = 30x + b", 48).move_to(P(0, 2.3)).align_to(P(x0, 0), LEFT)
        teinte(e1, orange=[5], violet=[8])
        self.dire_eq(e1, "f de x égale 30 x plus b.", echelle=1.15)
        e2 = X("30 × 2 + b = 70", 46).move_to(P(0, 1.6)).align_to(P(x0 + 0.4, 0), LEFT)
        teinte(e2, orange=[0], violet=[4])
        lect = R.lecture(2, 70)
        self.au("À 2 ans,", Indicate(pa, scale_factor=1.8), rt=0.35)
        self.poser_gestes(e2, "30 fois 2, plus b, égale 70.", {6: lambda: [Create(lect)]}, echelle=1.15)
        e3 = X("60 + b = 70", 44).move_to(P(0, 0.85)).align_to(P(x0, 0), LEFT)
        teinte(e3, violet=[2])
        self.dire_eq(e3, "60 plus b égale 70 :", echelle=1.15)
        # 3e relecture -ql : « 60 + b = 70  b = 10 » se lisait mal : le « : » de la voix (posé hors synchro)
        dp = T(":", 44, audit=False).next_to(e3, RIGHT, buff=0.14)
        dp.sans_synchro = True
        dp.align_to(e3.atomes[0], DOWN)
        e4 = X("b = 10", 48, COUL_B).next_to(dp, RIGHT, buff=0.3)
        e4.shift(UP * (e3.atomes[0].get_bottom()[1] - e4.atomes[2].get_bottom()[1]))
        self.poser_gestes(e4, "b vaut 10.", {0: lambda: [FadeIn(dp)],
                                            2: lambda: [FadeIn(pb0, scale=2.5), FadeIn(lb0)]}, echelle=1.2)
        self.play(Flash(pb0, color=COUL_B, line_length=0.2), run_time=0.4)
        e5 = X("f(x) = 30x + 10", 56).move_to(P(0, 0.0)).align_to(P(x0, 0), LEFT)
        teinte(e5, orange=[5], violet=[8])
        self.dire_eq(e5, "Donc f de x égale 30 x plus 10.", echelle=1.15)
        self.play(Create(self.cadre_ok(e5, 0.14)), Indicate(d, color=JAUNE_TITRE), run_time=0.4)
        l6 = self.ld("On vérifie à 5 ans :", -0.95, 42, CIEL, x0=x0, maxw=mw)
        lect5 = R.lecture(5, 160)
        self.poser_gestes(l6, "On vérifie à 5 ans :", {3: lambda: [Create(lect5)]})
        e6 = X("150 + 10 = 160", 48).move_to(P(0, -1.7)).align_to(P(x0 + 0.4, 0), LEFT)
        self.poser_gestes(e6, "150 plus 10, 160.", {4: lambda: [Indicate(pb, scale_factor=1.8)]}, echelle=1.1)
        l7 = self.ld("C'est juste !", -2.5, 46, VERT_OK, x0=x0, maxw=mw)
        k = self.coche(VERT_OK, 0.24).next_to(l7, RIGHT, buff=0.3)
        self.dit(l7, "C'est juste !", avec=[Create(k)])
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        # 2e relecture : repère plus haut (toute la hauteur), plus à gauche ; cartes et réponse à partir de −1
        self.XL = -1.0
        R = Repere(P(-4.9, -0.3), 1.0, 0.72, (-1, 3), (-4, 4), xlab=(-1, 1, 2, 3), ylab=(-3, -2, -1, 1, 2, 3),
                   yticks=range(-4, 5), nom_x="x", nom_y="f(x)", zero=False)
        z0 = T("0", 28, WHITE, audit=False).next_to(R.p(0, 0), DL, buff=0.06)
        z0._graduation = True
        R.labs.add(z0)
        p0 = R.point(0, -3, COUL_B, r=0.13)
        d = R.droite(2, -3, -0.4, 3.3)
        fh, lh = R.pas_h(0, 1, -3, "1", fs=32)
        fv, lv = R.pas_v(1, -3, -1, "+ 2", fs=32)
        self.add(R)

        def avant(sc):
            # « a = » se pose sur « a pour » : sinon le « = » irait chercher le « égale » de f(0)
            ref = sc.q_q[0]
            e = X("a = 2 et f(0) = −3.", 40)
            e.move_to(ref).align_to(ref, LEFT)
            sc.q_q.remove(ref)
            sc._lignes_q = [e]
            sc.au("a pour coefficient", FadeIn(e.atomes[0], scale=1.2), FadeIn(e.atomes[1], scale=1.2), rt=0.2)
            sc.poser_gestes(e, "coefficient directeur 2, et f de 0 égale moins 3.",
                            {10: lambda: [FadeIn(p0, scale=2.5)]}, echelle=1.2, rt=0.2, sauf=e.atomes[:2])

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_gestes(0, "Réponse A : a = 2.", "Réponse A : a vaut 2.",
                         {5: lambda: [GrowArrow(fh), FadeIn(lh), GrowArrow(fv), FadeIn(lv)]}, premier=True)
            sc.ph_gestes(1, "f(0) = b = −3.", "Et f de 0, c'est b : moins 3.",
                         {8: lambda: [Flash(p0, color=COUL_B, line_length=0.2)]})
            sc.ph_gestes(2, "Donc 2x − 3.", "Donc 2 x moins 3.", {1: lambda: [Create(d)]})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["a = 2 et f(0) = −3."],
                            [X("2x − 3", 34), X("−3x + 2", 34), X("2x + 3", 34)], 0,
                            ["Réponse A : a = 2.", "f(0) = b = −3.", "Donc 2x − 3."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : la citerne d'Awa ───────────────────────────────────────────────
    def ecran_phrase(self):
        self.ecran("04-phrase")
        C = Citerne(2.3, 3.0, 0.85, P(-4.4, -0.55))
        l500 = T("500 L", 40, WHITE).move_to(C.eau).shift(UP * 0.3)
        l20 = T("− 20 L", 32, COUL_A).next_to(C.goutte, DOWN, buff=0.15).align_to(C.goutte, RIGHT)
        x0, mw = -2.25, 8.4
        l0 = self.ld("Parfois, une phrase suffit.", 3.05, 44, CIEL, x0=x0, maxw=mw)
        self.dit(l0, "Parfois, une phrase suffit.")
        l1 = self.ld("Une citerne d'eau de pluie :", 2.3, 42, x0=x0, maxw=mw)
        self.poser_gestes(l1, "une citerne d'eau de pluie.",
                          {1: lambda: [FadeIn(VGroup(C.cuve, C.cercles, C.couvercle, C.robinet), shift=UP * 0.2)],
                           6: lambda: [FadeIn(C.pluie, shift=DOWN * 0.3)]})
        l2 = self.ld("elle contient 500 litres,", 1.6, 42, x0=x0, maxw=mw)
        self.poser_gestes(l2, "Elle contient 500 litres,",
                          {2: lambda: [GrowFromEdge(C.eau, DOWN), FadeIn(l500), FadeOut(C.pluie)]})
        l3 = self.ld("et en perd 20 par jour.", 0.9, 42, x0=x0, maxw=mw)
        self.poser_gestes(l3, "et en perd 20 par jour.",
                          {3: lambda: [FadeIn(C.goutte, shift=DOWN * 0.35), FadeIn(l20)]})
        l4 = self.ld("a, chaque jour : −20", 0.05, 44, x0=x0, maxw=mw)
        teinte(l4, orange=[0, 5, 6])
        self.poser_gestes(l4, "a, c'est ce qui change chaque jour : moins 20.",
                          {6: lambda: [Indicate(l20, color=COUL_A, scale_factor=1.3)]})
        l5 = self.ld("b, le départ : 500", -0.75, 44, x0=x0, maxw=mw)
        teinte(l5, violet=[0, 5])
        self.poser_gestes(l5, "b, c'est le départ : 500.",
                          {5: lambda: [l500.animate.set_color(COUL_B), Indicate(C.eau, color=COUL_B, scale_factor=1.03)]})
        l6 = self.ld("Après x jours :", -1.6, 42, CIEL, x0=x0, maxw=mw)
        self.dit(l6, "Après x jours :")
        e7 = X("f(x) = −20x + 500", 56).move_to(P(0, -2.45)).align_to(P(x0 + 0.3, 0), LEFT)
        teinte(e7, orange=[5, 6], violet=[9])
        self.dire_eq(e7, "f de x égale moins 20 x plus 500.", echelle=1.15)
        self.play(Create(self.cadre_ok(e7, 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -1.0
        R = Repere(P(-5.9, -2.75), 1.0, 0.45, (0, 4), (0, 12.5), xlab=(1, 2, 3, 4), ylab=(2, 4, 6, 8, 10, 12),
                   nom_x="x", nom_y="f(x)")
        pa, pb = R.point(1, 5), R.point(3, 11)
        la, lb = R.lecture(1, 5), R.lecture(3, 11)
        fv, lv = R.pas_v(3, 5, 11, "+ 6", fs=32)
        fh, lh = R.pas_h(1, 3, 5, "+ 2", fs=32)
        d = R.droite(3, 2, 0, 3.4)
        p0 = R.point(0, 2, COUL_B, r=0.13)
        self.add(R)

        def avant(sc):
            sc.ligne_q("f(1) = 5 et f(3) = 11.", "f de 1 égale 5, et f de 3 égale 11.",
                       {5: lambda: [FadeIn(pa, scale=2), Create(la)], 12: lambda: [FadeIn(pb, scale=2), Create(lb)]})

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_gestes(0, "Réponse C :", "Réponse C :", {}, premier=True)
            sc.au("6, les x gagnent", GrowArrow(fv), FadeIn(lv), rt=0.3)
            sc.au("2. 6 divisé", GrowArrow(fh), FadeIn(lh), rt=0.3)
            sc.ph_gestes(1, "6 ÷ 2 : a = 3.", "6 divisé par 2 : a vaut 3.", {})
            sc.ph_gestes(2, "3 × 1 + b = 5 :", "Puis 3 fois 1, plus b, égale 5 :", {})
            sc.ph_gestes(3, "b = 2.", "b vaut 2.", {2: lambda: [FadeIn(p0, scale=2.5), Create(d)]})
            sc.ph_gestes(4, "On vérifie :", "On vérifie :", {})
            sc.ph_gestes(5, "3 × 3 + 2 = 11.", "3 fois 3, plus 2, 11.", {6: lambda: [Indicate(pb, scale_factor=1.8)]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["f(1) = 5 et f(3) = 11."],
                            [X("6x − 1", 34), X("3x + 5", 34), X("3x + 2", 34)], 2,
                            ["Réponse C :", "6 ÷ 2 : a = 3.", "3 × 1 + b = 5 :", "b = 2.", "On vérifie :",
                             "3 × 3 + 2 = 11."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        m = awa(0.7, 32, ("Awa",))
        m.perso.move_to(P(-5.6, -1.3))
        m.nom.next_to(m.perso, UP, buff=0.14)
        b = baobab(2.6, P(-3.6, -2.45))
        q = T("?", 64, JAUNE_TITRE, audit=False, gras=True).next_to(b, UP, buff=0.15)
        self.play(FadeIn(m), FadeIn(b), run_time=0.3)
        x0 = -2.0
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        l1 = self.ld("Trouve l'expression de f.", 2.0, 46, x0=x0, maxw=8.4)
        self.dit(l1, "Trouve l'expression de f.", avec=[FadeIn(q, scale=1.4)])
        p1 = pastille("1", CIEL, 0.34).move_to(P(x0 + 0.3, 1.0))
        p1[1].scale(36 / 30)
        e1 = X("f(−1) = 7 et f(2) = −2", 48).next_to(p1, RIGHT, buff=0.3)
        self.au("Un :", FadeIn(p1, scale=1.3), rt=0.25)
        self.dire_eq(e1, "f de moins 1 égale 7, et f de 2 égale moins 2.", echelle=1.15)
        p2 = pastille("2", CIEL, 0.34).move_to(P(x0 + 0.3, -0.35))
        p2[1].scale(36 / 30)
        e2 = X("f est linéaire, et f(4) = 10", 42).next_to(p2, RIGHT, buff=0.3)
        self.au("Deux :", FadeIn(p2, scale=1.3), rt=0.25)
        self.dire_eq(e2, "f est linéaire, et f de 4 égale 10.", echelle=1.15)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -1.75)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, e1=e1, e2=e2, p1=p1, p2=p2, pz=pz, autres=VGroup(m, b, q, l1))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        x0 = -6.3
        self.dire("06b-correction")
        # 2e relecture : lignes à 42 pt (elles paraissaient petites), toute la hauteur utilisée, une idée par ligne
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.3)).align_to(P(x0, 0), LEFT)  # 3e relecture : il touchait ①
        e1, e2, p1, p2 = d["e1"], d["e2"], d["p1"], d["p2"]
        g1, g2 = VGroup(p1, e1), VGroup(p2, e2)
        c1 = g1.copy().scale(0.95).align_to(P(x0, 0), LEFT).set_y(2.5)
        c2 = g2.copy().align_to(P(x0, 0), LEFT).set_y(-0.9)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["autres"]),
                g1.animate.scale(0.95).move_to(c1), g2.animate.move_to(c2), rt=0.45)
        self.au("Un :", Indicate(p1, color=JAUNE_TITRE, scale_factor=1.3), rt=0.3)
        xi = e1.get_left()[0]
        fs = 42
        r1 = X("Images : de 7 à −2, soit −9.", fs).move_to(P(0, 1.94)).align_to(P(xi, 0), LEFT)
        teinte(r1, orange=[9, 10])
        self.dire_eq(r1, "les images passent de 7 à moins 2, soit moins 9.", echelle=1.1)
        r2 = X("x : de −1 à 2, soit 3.", fs).move_to(P(0, 1.3)).align_to(P(xi, 0), LEFT)
        self.dire_eq(r2, "Les x passent de moins 1 à 2, soit 3.", echelle=1.1)
        r2b = self.a_cote(X("a = −3.", fs + 4, COUL_A), r2, buff=0.7, i_e=0, i_ref=0)
        self.dire_eq(r2b, "a vaut moins 3.", echelle=1.15)
        r3 = X("−3 × (−1) + b = 7", fs).move_to(P(0, 0.66)).align_to(P(xi, 0), LEFT)
        teinte(r3, orange=[0, 1], violet=[8])
        self.dire_eq(r3, "moins 3 fois moins 1, plus b, égale 7 :", echelle=1.1)
        r3b = self.a_cote(X("3 + b = 7, b = 4.", fs), r3, buff=0.6, i_e=0, i_ref=1)
        teinte(r3b, violet=[2, 6, 8])
        self.dire_eq(r3b, "3 plus b égale 7, b vaut 4.", echelle=1.1)
        r4 = X("f(x) = −3x + 4", 48, VERT_OK).move_to(P(0, -0.06)).align_to(P(xi + 0.4, 0), LEFT)
        teinte(r4, bleu=[2, 7])
        self.dire_eq(r4, "f de x égale moins 3 x plus 4.", echelle=1.15)
        self.play(Create(self.cadre_ok(r4, 0.1)), run_time=0.25)
        self.au("Deux :", Indicate(p2, color=JAUNE_TITRE, scale_factor=1.3), rt=0.3)
        xi2 = e2.get_left()[0]
        s1 = X("Linéaire, donc b = 0.", fs - 2).move_to(P(0, -1.6)).align_to(P(xi2, 0), LEFT)
        teinte(s1, violet=[3, 5])
        self.dire_eq(s1, "linéaire, donc b vaut 0.", echelle=1.1)
        s2 = self.a_cote(X("4a = 10 : a = 2,5.", fs - 2), s1, buff=0.5, i_e=0, i_ref=0)
        teinte(s2, orange=[1, 5, 7])
        self.dire_eq(s2, "4 a égale 10 : a vaut 2,5.", echelle=1.1)
        r5 = X("f(x) = 2,5x", 48, VERT_OK).move_to(P(0, -2.38)).align_to(P(xi2 + 0.4, 0), LEFT)
        teinte(r5, bleu=[2, 6])
        self.dire_eq(r5, "f de x égale 2,5 x.", echelle=1.15)
        self.play(Create(self.cadre_ok(r5, 0.1)), run_time=0.25)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 06b droite {max(m.get_right()[0] for m in (r1, r2b, r3b, s2)):.2f} bas "
                  f"{r5.get_bottom()[1]:.2f} lignes {self._fs(r1):.0f} pt", flush=True)
        self.insister(VGroup(r4, r5), 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        R = Repere(P(-6.3, -1.75), 0.6, 0.72, (0, 5), (0, 5), xticks=range(1, 6), yticks=range(1, 6),
                   nom_x="x", nom_y="y", zero=False)
        pa, pb = R.point(1, 2), R.point(4, 4)
        d = R.droite(2 / 3, 4 / 3, 0, 5)
        fh, _ = R.pas_h(1, 4, 2, None)
        fv, _ = R.pas_v(4, 2, 4, None)
        p0 = R.point(0, 4 / 3, COUL_B, r=0.12)
        self.play(Write(tit), FadeIn(R), FadeIn(pa), FadeIn(pb), Create(d), run_time=0.6)
        x0, mw = -1.85, 8.1
        y = [2.35, 1.72, 1.02, 0.4, -0.3, -0.9, -1.55]

        def ok(e):
            k = self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y()))
            return [Create(k)]

        l0 = self.ld("Pour trouver ax + b", y[0], 44, x0=x0, maxw=mw)
        l0.atomes[2][0].set_color(COUL_A)
        l0.atomes[2][1].set_color(INCONNUE)
        l0.atomes[4].set_color(COUL_B)
        self.poser_gestes(l0, "Pour trouver a x plus b", {0: lambda: ok(l0)})
        l0b = self.ld("avec deux images :", y[1], 44, x0=x0, maxw=mw)
        self.poser_gestes(l0b, "avec deux images :", {1: lambda: [Indicate(VGroup(pa, pb), scale_factor=1.6)]})
        l1 = self.ld("a = l'écart des images", y[2], 44, x0=x0 + 0.5, maxw=mw)
        teinte(l1, orange=[0])
        self.poser_gestes(l1, "a, c'est l'écart des images,", {4: lambda: [GrowArrow(fv)]})
        l2 = self.ld("÷ l'écart des x.", y[3], 44, x0=x0 + 1.0, maxw=mw)
        teinte(l2, bleu=[5])
        self.poser_gestes(l2, "divisé par l'écart des x.", {3: lambda: [GrowArrow(fh)]})
        l3 = self.ld("On remplace un point connu", y[4], 38, x0=x0, maxw=mw)
        self.poser_gestes(l3, "on remplace un point connu",
                          {0: lambda: ok(l3), 3: lambda: [Indicate(pa, scale_factor=1.8)]})
        l4 = self.ld("pour trouver b.", y[5], 38, x0=x0, maxw=mw)
        teinte(l4, violet=[2])
        self.poser_gestes(l4, "pour trouver b.", {2: lambda: [FadeIn(p0, scale=2.5)]})
        l5 = self.ld("On vérifie avec l'autre point.", y[6], 38, VERT_OK, x0=x0, maxw=mw)
        self.poser_gestes(l5, "on vérifie avec l'autre point.",
                          {0: lambda: ok(l5), 5: lambda: [Indicate(pb, scale_factor=1.8)]})
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_technicienne()
        self.ecran_coefficient()
        self.ecran_ordonnee()
        self.ecran_question1()
        self.ecran_phrase()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
