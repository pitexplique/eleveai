# affine_coeff_directeur.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 02 : le COEFFICIENT DIRECTEUR.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE.
# Métier : Inès, développeuse de jeux vidéo (le héros qui gagne 3 points d'énergie par seconde ;
# la batterie du téléphone qui perd 2 % par minute ; la jauge du jeu, lue en deux points).
# Écrans (clé de voix → écran) :
#   00-garde        page de garde, échelle des ceintures, la droite qui change de pente ;
#   01-developpeuse l'écran du jeu, la jauge d'énergie, f(x) = 3x + 10 et le tableau 13, 16, 19 ;
#   02-coefficient  la droite de f sur un repère à carreaux, les marches « +3 », a = 3, la droite plus raide ;
#   03-negatif      le téléphone qui chauffe, g(x) = −2x + 80 (droite orange), la loupe : 1 pas →, 2 ↓ ;
#   03q / 03r       QUESTION 1 : f(x) = −4x + 7, son coefficient directeur → réponse B (−4) ;
#   04-deux-points  deux points (2 ; 16) et (5 ; 25), les écarts +3 et +9, a = 9 ÷ 3 = 3, la règle ;
#   05q / 05r       QUESTION 2 : (1 ; 3) et (3 ; 11) → réponse C (4) ;
#   06-defi         À toi de jouer : f(x) = 5 − 3x ; (−1 ; 4) et (2 ; −5) ;
#   06b-correction  −3x + 5, a = −3 négatif, f décroissante ; −9 ÷ 3 = −3 sur le repère ;
#   07-finale       Ce que tu as appris (titre en haut et centré) ;
#   08-abonne       fin commune (manim/fin_commune.py).
# Questions : 03q → B, 05q → C (la lettre que dit la voix).
# Code couleur : x bleu ; a (« monte de… ») orange ; b violet ; juste vert ; piège rouge ;
# droite de f bleue, seconde droite (g) orange.
# Voix : manim/voix/3e-affine-coeff-directeur.json (validée) ; marques : affine_coeff_directeur_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_coeff_directeur.py AffineCoeffDirecteur3e --media_dir manim/scripts/3e/media-affine-02-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_coeff_directeur.py AffineCoeffDirecteur3e -o eleveai-maths-3e-affine-coeff-directeur --media_dir manim/scripts/3e/media-affine-02
# Sortie : manim/sorties/3e/maths/fonctions-affines/02-coeff-directeur/eleveai-maths-3e-affine-coeff-directeur.mp4

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, pastille  # noqa: E402
from ident_factoriser import IdentFactoriser3e  # noqa: E402

PAROLE["ax"] = "a x"            # « ax + b » se dit « a x plus b »
PAROLE["cm"] = "centimètres"
PAROLE["0"] = "0"                # relatif_commun lit « 0 » comme « zéro »

COEF = ORANGE_RETENUE           # a, le coefficient directeur
ORDO = "#a78bfa"                # b, l'ordonnée à l'origine
DROITE_F = "#3b82f6"            # la droite de f
DROITE_G = ORANGE_RETENUE       # la seconde droite (g)
GRIS = "#cbd5e1"
GRILLE = "#334155"


def teinter(e, couleurs):
    """Colore les atomes de e : {indice: couleur}."""
    for i, c in couleurs.items():
        e.atomes[i].set_color(c)
    return e


def num(v):
    s = f"{v:g}".replace("-", "−").replace(".", ",")
    return s


class Repere(VGroup):
    """Un repère dessiné : .p(x, y) le point à l'écran ; graduations à 28 pt (données de figure,
    sans audit) ; axes nommés ; grille optionnelle (pas sx, sy)."""

    def __init__(self, xr, yr, ux, uy, origine, gx=(), gy=(), nom_x="", nom_y="", grille=None, fs=32,
                 zero=True, nom_dessous=False, **kw):
        super().__init__(**kw)
        self.xr, self.yr, self.ux, self.uy = xr, yr, ux, uy
        self.o = np.array([origine[0], origine[1], 0.0])
        x0, x1 = xr
        y0, y1 = yr
        # les droites s'arrêtent à la dernière graduation (relecture -ql du 22/11)
        self.yhaut = max(gy) if gy else y1
        self.ybas = y0
        self.bx = 0 if x0 <= 0 <= x1 else x0  # l'axe vertical passe par x = bx
        self.by = 0 if y0 <= 0 <= y1 else y0  # l'axe horizontal passe par y = by
        self.grille = VGroup()
        if grille:
            sx, sy = grille
            v = math.ceil(x0 / sx) * sx
            while v <= x1 + 1e-9:
                self.grille.add(Line(self.p(v, y0), self.p(v, y1)))
                v += sx
            v = math.ceil(y0 / sy) * sy
            while v <= y1 + 1e-9:
                self.grille.add(Line(self.p(x0, v), self.p(x1, v)))
                v += sy
            self.grille.set_stroke(GRILLE, 1.5)
        self.ax = Arrow(self.p(x0, self.by), self.p(x1, self.by) + RIGHT * 0.35, buff=0, stroke_width=3,
                        tip_length=0.18, max_tip_length_to_length_ratio=0.2, color=GRIS)
        self.ay = Arrow(self.p(self.bx, y0), self.p(self.bx, y1) + UP * 0.35, buff=0, stroke_width=3,
                        tip_length=0.18, max_tip_length_to_length_ratio=0.2, color=GRIS)
        self.grads = VGroup()
        for v in gx:
            q = self.p(v, self.by)
            self.grads.add(Line(q + DOWN * 0.07, q + UP * 0.07, color=GRIS, stroke_width=3))
            self.grads.add(T(num(v), fs, GRIS, audit=False).next_to(q, DOWN, buff=0.14))
        for v in gy:
            q = self.p(self.bx, v)
            self.grads.add(Line(q + LEFT * 0.07, q + RIGHT * 0.07, color=GRIS, stroke_width=3))
            self.grads.add(T(num(v), fs, GRIS, audit=False).next_to(q, LEFT, buff=0.14))
        if zero and self.bx == 0 and self.by == 0 and x0 == 0 and y0 == 0:
            self.grads.add(T("0", fs, GRIS, audit=False).next_to(self.p(0, 0), DL, buff=0.08))
        self.noms = VGroup()
        if nom_x:
            # au-dessus de la flèche (dessous, il mordait sur les dernières graduations)
            n = T(nom_x, fs, CIEL, audit=False).next_to(self.ax.get_end(), DOWN if nom_dessous else UP, buff=0.14)
            n.align_to(self.ax.get_end(), RIGHT)
            self.noms.add(n)
        if nom_y:
            n = T(nom_y, fs, CIEL, audit=False).next_to(self.ay.get_end(), UP, buff=0.1)
            n.align_to(self.ay.get_end() + LEFT * 0.25, LEFT)
            self.noms.add(n)
        self.add(self.grille, self.ax, self.ay, self.grads, self.noms)

    def p(self, x, y):
        return self.o + np.array([x * self.ux, y * self.uy, 0.0])

    def droite(self, a, b, xa=None, xb=None, couleur=DROITE_F, sw=5):
        """La droite y = ax + b, coupée au cadre du repère (jamais au-dessus de la dernière graduation)."""
        x0, x1 = self.xr
        y0, y1 = self.ybas, self.yhaut
        xa = x0 if xa is None else xa
        xb = x1 if xb is None else xb
        if a != 0:
            lo, hi = sorted(((y0 - b) / a, (y1 - b) / a))
            xa, xb = max(xa, lo), min(xb, hi)
        return Line(self.p(xa, a * xa + b), self.p(xb, a * xb + b), color=couleur, stroke_width=sw)

    def point(self, x, y, couleur=WHITE, r=0.09):
        return Dot(self.p(x, y), radius=r, color=couleur)

    def lecture(self, x, y, couleur=GRIS):
        """Les pointillés de lecture : axe horizontal → point → axe vertical."""
        return VGroup(DashedLine(self.p(x, self.by), self.p(x, y), dash_length=0.1, color=couleur, stroke_width=3),
                      DashedLine(self.p(x, y), self.p(self.bx, y), dash_length=0.1, color=couleur, stroke_width=3))

    def marche(self, x, y, dx, dy, couleur=COEF, sw=5):
        """La marche : dx vers la droite, puis dy vers le haut (ou le bas)."""
        h = Arrow(self.p(x, y), self.p(x + dx, y), buff=0, stroke_width=sw, tip_length=0.16,
                  max_tip_length_to_length_ratio=0.35, color=couleur)
        v = Arrow(self.p(x + dx, y), self.p(x + dx, y + dy), buff=0, stroke_width=sw, tip_length=0.16,
                  max_tip_length_to_length_ratio=0.35, color=couleur)
        return h, v


class Loupe(VGroup):
    """Un zoom sur la droite : un panneau à carreaux (côté u), la droite de pente `pente` (en carreaux),
    la marche 1 carreau → puis `pente` carreaux. .cadre, .grille, .seg, .h, .v ; .viseur(m) : le petit
    cercle posé sur la droite du repère et les deux pointillés vers le panneau."""

    def __init__(self, centre, w, h, u, pente, couleur=DROITE_G, **kw):
        super().__init__(**kw)
        c = np.array(centre, dtype=float)
        self.cadre = RoundedRectangle(width=w, height=h, corner_radius=0.1, stroke_color=JAUNE_TITRE, stroke_width=3,
                                      fill_color="#0b1220", fill_opacity=1).move_to(c)
        self.grille = VGroup()
        k = 1
        while k * u < w / 2 - 0.05:
            for s in (-1, 1):
                self.grille.add(Line(c + P(s * k * u - u / 2 + u / 2, -h / 2 + 0.06), c + P(s * k * u, h / 2 - 0.06)))
            k += 1
        self.grille.add(Line(c + P(0, -h / 2 + 0.06), c + P(0, h / 2 - 0.06)))
        k = 1
        while k * u < h / 2 - 0.05:
            for s in (-1, 1):
                self.grille.add(Line(c + P(-w / 2 + 0.06, s * k * u), c + P(w / 2 - 0.06, s * k * u)))
            k += 1
        self.grille.add(Line(c + P(-w / 2 + 0.06, 0), c + P(w / 2 - 0.06, 0)))
        self.grille.set_stroke(GRILLE, 1.5)
        dy = pente * u
        a0 = c + P(-u / 2, -dy / 2)
        coin = c + P(u / 2, -dy / 2)
        a1 = c + P(u / 2, dy / 2)
        m = dy / u
        xs = []
        for x in np.linspace(-w / 2 + 0.12, w / 2 - 0.12, 200):
            y = -dy / 2 + m * (x + u / 2)
            if -h / 2 + 0.12 <= y <= h / 2 - 0.12:
                xs.append(x)
        xa, xb = min(xs), max(xs)
        self.seg = Line(c + P(xa, -dy / 2 + m * (xa + u / 2)), c + P(xb, -dy / 2 + m * (xb + u / 2)),
                        color=couleur, stroke_width=5)
        self.h = Arrow(a0, coin, buff=0, stroke_width=6, tip_length=0.15, max_tip_length_to_length_ratio=0.45,
                       color=COEF)
        self.v = Arrow(coin, a1, buff=0, stroke_width=6, tip_length=0.15, max_tip_length_to_length_ratio=0.3,
                       color=COEF)
        self.add(self.cadre, self.grille, self.seg)

    def viseur(self, m, r=0.17):
        rond = Circle(radius=r, color=JAUNE_TITRE, stroke_width=3).move_to(m)
        cible = self.cadre
        l1 = DashedLine(rond.get_top(), cible.get_corner(UL), dash_length=0.08, color=JAUNE_TITRE, stroke_width=2)
        l2 = DashedLine(rond.get_bottom(), cible.get_corner(DL), dash_length=0.08, color=JAUNE_TITRE, stroke_width=2)
        return VGroup(rond, l1, l2)


class _AuditPlace:
    """AUDIT=1 : avant chaque effacement, signale deux textes qui se chevauchent (CHEVAUCHE), un texte sur
    Ti-Margo (MARGO : son vrai cadre, sinon ZONE_MARGO = (gauche, droite, bas, haut)) et un texte dont la taille
    EFFECTIVE (font_size × échelle) est sous 32 pt (PETIT, relecture -ql du 22/11)."""

    ZONE_MARGO = (5.55, 6.8, -3.8, -2.2)

    def _zone_margo(self):
        for m in self.mobjects:
            if type(m).__name__.startswith("Mascotte"):
                return (m.get_left()[0], m.get_right()[0], m.get_bottom()[1], m.get_top()[1])
        return self.ZONE_MARGO

    def _audit_place(self):
        if os.environ.get("AUDIT") != "1":
            return
        parent, txts = {}, []
        for m in self.mobjects:
            if type(m).__name__.startswith("Mascotte"):
                continue
            for f in m.get_family():
                for c in f.submobjects:
                    parent.setdefault(id(c), id(f))
                if isinstance(f, Text) and getattr(f, "original_text", None) and f.get_fill_opacity() > 0.05:
                    txts.append(f)
        vus = getattr(self, "_places_vues", set())
        g, dr, b, h = self._zone_margo()
        for i, t in enumerate(txts):
            if t.get_right()[0] > g and t.get_left()[0] < dr and t.get_bottom()[1] < h and t.get_top()[1] > b:
                c = ("MARGO", self._cle_voix, t.original_text)
                if c not in vus:
                    vus.add(c)
                    print(f"MARGO {self._cle_voix} « {t.original_text} »", flush=True)
            fs = t.font_size
            if fs < 31.5 and t.original_text.strip() not in ".,;:!?'()":
                c = ("PETIT", self._cle_voix, t.original_text)
                if c not in vus:
                    vus.add(c)
                    print(f"PETIT {self._cle_voix} « {t.original_text} » {fs:.0f} pt", flush=True)
            for u in txts[i + 1:]:
                if parent.get(id(t)) == parent.get(id(u)) and len(t.original_text) + len(u.original_text) <= 3:
                    continue
                ox = min(t.get_right()[0], u.get_right()[0]) - max(t.get_left()[0], u.get_left()[0])
                oy = min(t.get_top()[1], u.get_top()[1]) - max(t.get_bottom()[1], u.get_bottom()[1])
                if ox > 0.05 and oy > 0.05:
                    c = ("CH", self._cle_voix, t.original_text, u.original_text)
                    if c not in vus:
                        vus.add(c)
                        print(f"CHEVAUCHE {self._cle_voix} « {t.original_text} » / « {u.original_text} »", flush=True)
        self._places_vues = vus

    def clear(self):
        if getattr(self, "_cle_voix", None):
            self._audit_place()
        return super().clear()

    def vider(self, garder):
        self._audit_place()
        return super().vider(garder)

    @staticmethod
    def _fs(m):
        """La taille effective du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """« Mets pause ! » à 40 pt (la phrase entière touchait Ti-Margo) ; « Question ! » gardé pour la réponse."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self._tete_q = tete
        # 22/11 : la version longue, sur deux lignes à 34 (comme toute la série), loin de Ti-Margo
        neuf = VGroup(T("Mets pause,", 34, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 34, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        for f in neuf.get_family():
            f.sans_synchro = True
        # 22/11 : sous les cartes, il descendait à −3,9 : cartes raccourcies (contenus courts), la phrase à leur droite
        larg = max(2.4, max(c[1].get_right()[0] for c in cartes) - cartes.get_left()[0] + 0.35)
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        neuf.next_to(cartes, RIGHT, buff=0.25).set_y(cartes.get_y())
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE {self._cle_voix} tete {tete.get_top()[1]:.2f}/{tete.get_bottom()[1]:.2f} "
                  f"q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} cartes {cartes.get_top()[1]:.2f}/"
                  f"{cartes.get_bottom()[1]:.2f} pause {neuf.get_bottom()[1]:.2f} droite {neuf.get_right()[0]:.2f} "
                  f"cartes {self._fs(cartes[0][1]):.0f} pt", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def monter_reponse(self, bonne):
        """Relecture -ql du 22/11 : la réponse sortait à ~15 pt. À la réponse, l'énoncé s'efface (sauf la ligne
        _garde_q["garder"], s'il y en a une), la bonne carte monte, et la réponse, en lignes courtes, est à 36 pt."""
        garde = getattr(self, "_garde_q", None)
        if garde is None:
            return super().monter_reponse(bonne)
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        gm = garde.get("garder")
        lignes = list(self.q_q) + list(getattr(self, "_poses_q", []))
        lignes += [m for m in self.mobjects if m not in lignes and isinstance(m, VGroup) and m is not gm
                   and getattr(m, "atomes", None) and m.get_left()[0] > self.XL - 0.1 and m.get_bottom()[1] > b.get_top()[1]]
        effacer = [m for m in lignes if m is not gm]
        anims = [FadeOut(cartes)] + [FadeOut(m) for m in effacer] + list(garde.get("avec", lambda: [])())
        if ok not in b.get_family():
            anims.append(FadeOut(ok))
        # joué AVEC la lettre de « Réponse B : » (ph_gestes, indice 1) : la voix dit la lettre tout de suite
        self._anims_rep = anims
        haut = (gm.get_bottom()[1] if gm is not None else self._tete_q.get_bottom()[1]) - 0.3
        ph.scale(36 / self._fs(ph[0]))
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        k = min(1.0, (6.25 - self.XL) / ph.width, (haut + 3.45) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        self._garde_q = None
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} {self._fs(ph[0]):.0f} pt, bas {ph.get_bottom()[1]:.2f}, "
                  f"droite {ph.get_right()[0]:.2f}", flush=True)


# ── les dessins ──────────────────────────────────────────────────────────────

class EcranJeu(VGroup):
    """L'écran du jeu d'Inès : le héros, l'éclair et la jauge d'énergie (0 → vmax)."""

    def __init__(self, w=4.0, h=2.5, vmax=25, **kw):
        super().__init__(**kw)
        self.vmax = vmax
        self.cadre = RoundedRectangle(width=w, height=h, corner_radius=0.16, stroke_color="#64748b", stroke_width=4,
                                      fill_color="#1e1b4b", fill_opacity=1)
        sol = Rectangle(width=w - 0.12, height=0.38, fill_color="#15803d", fill_opacity=1, stroke_width=0)
        sol.align_to(self.cadre, DOWN).shift(UP * 0.06)
        etoiles = VGroup(*[Dot(P(x, y), radius=0.03, color="#e0e7ff") for x, y in
                           ((-1.4, 0.2), (-0.6, 0.45), (0.5, 0.15), (1.3, 0.5), (0.95, -0.1))])
        corps = RoundedRectangle(width=0.55, height=0.62, corner_radius=0.12, fill_color="#22d3ee", fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=2)
        yeux = VGroup(*[Dot(P(dx, 0.1), radius=0.06, color="#0f172a") for dx in (-0.12, 0.12)])
        cape = Polygon(P(-0.28, 0.25), P(-0.6, -0.25), P(-0.28, -0.2), fill_color="#ef4444", fill_opacity=1,
                       stroke_width=0)
        self.heros = VGroup(cape, corps, yeux).next_to(sol, UP, buff=0).shift(LEFT * 0.9)
        self.eclair = Polygon(P(0.05, 0.2), P(-0.12, -0.02), P(0.0, -0.02), P(-0.06, -0.22), P(0.13, 0.04),
                              P(0.01, 0.04), fill_color="#facc15", fill_opacity=1, stroke_width=0).scale(1.3)
        self.eclair.move_to(self.cadre.get_corner(UL) + P(0.4, -0.38))
        self.lj = w - 1.2
        self.bord = Rectangle(width=self.lj, height=0.3, stroke_color=WHITE, stroke_width=3)
        self.bord.next_to(self.eclair, RIGHT, buff=0.18)
        self.plein = self.niveau(0)
        self.add(self.cadre, etoiles, sol, self.heros, self.eclair, self.plein, self.bord)

    def niveau(self, v):
        w = max(0.001, self.lj * v / self.vmax)
        r = Rectangle(width=w, height=0.26, fill_color="#facc15", fill_opacity=1 if v > 0 else 0, stroke_width=0)
        return r.move_to(self.bord.get_left() + RIGHT * (w / 2 + 0.02))

    def monter(self, v):
        neuf = self.niveau(v)
        return [Transform(self.plein, neuf),
                self.heros.animate(rate_func=there_and_back).shift(UP * 0.3)]


def manette(s=1.0):
    corps = RoundedRectangle(width=0.62 * s, height=0.32 * s, corner_radius=0.12 * s, fill_color="#334155",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    croix_ = VGroup(Rectangle(width=0.16 * s, height=0.05 * s), Rectangle(width=0.05 * s, height=0.16 * s))
    croix_.set_fill(WHITE, 1).set_stroke(width=0).move_to(corps.get_center() + LEFT * 0.16 * s)
    boutons = VGroup(Dot(radius=0.035 * s, color="#ef4444"), Dot(radius=0.035 * s, color="#22c55e")).arrange(
        RIGHT, buff=0.05 * s).move_to(corps.get_center() + RIGHT * 0.16 * s)
    return VGroup(corps, croix_, boutons)


def ines(s=0.7, fs=30, lignes=("Inès", "développeuse", "de jeux vidéo")):
    """Inès, développeuse de jeux vidéo : une manette dans les mains."""
    m = Metier(list(lignes), fs=fs, peau="#8d5524", tenue="#7c3aed", cheveux="#1f1308", longs=True, s=s)
    p = m.perso
    p.add(manette(s * 1.1).move_to(p.corps.get_center() + UP * 0.25 * s))
    return m


class Telephone(VGroup):
    """Le téléphone d'Inès, la pile dessinée ; .niveau(n) : le remplissage (0 → 1)."""

    def __init__(self, h=1.6, n=1.0, **kw):
        super().__init__(**kw)
        w = h * 0.56
        self.corps = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#111827", fill_opacity=1,
                                      stroke_color="#94a3b8", stroke_width=4)
        self.vitre = RoundedRectangle(width=w - 0.14, height=h - 0.32, corner_radius=0.06, fill_color="#1e293b",
                                      fill_opacity=1, stroke_width=0)
        self.pw, ph = w * 0.62, h * 0.2
        self.pile = Rectangle(width=self.pw, height=ph, stroke_color=WHITE, stroke_width=3)
        bout = Rectangle(width=0.06, height=ph * 0.45, fill_color=WHITE, fill_opacity=1, stroke_width=0)
        bout.next_to(self.pile, RIGHT, buff=0)
        self.ph = ph
        self.jus = self.niveau(n)
        self.add(self.corps, self.vitre, self.pile, bout, self.jus)

    def niveau(self, n):
        w = max(0.001, (self.pw - 0.08) * n)
        c = VERT_OK if n > 0.3 else PIEGE
        r = Rectangle(width=w, height=self.ph - 0.08, fill_color=c, fill_opacity=1, stroke_width=0)
        return r.move_to(self.pile.get_left() + RIGHT * (0.04 + w / 2))

    def vers(self, n):
        return Transform(self.jus, self.niveau(n))

    def chaleur(self):
        c = self.corps
        return VGroup(*[ArcBetweenPoints(c.get_corner(UR) + P(0.12 + 0.12 * k, -0.2 - 0.25 * k),
                                         c.get_corner(UR) + P(0.12 + 0.12 * k, 0.15 - 0.25 * k), angle=-PI / 2)
                        for k in range(3)]).set_stroke(PIEGE, 4)


class AffineCoeffDirecteur3e(_AuditPlace, IdentFactoriser3e):
    nom_voix = "3e-affine-coeff-directeur"
    fichier_marques = "affine_coeff_directeur_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"

    def fx(self, s, y, fs=52, x0=-1.6, a=(), b=(), c=WHITE, maxw=8.0):
        """Une expression de fonction : x bleu, les atomes a orange, b violet."""
        e = self.ld(s, y, fs, c, x0=x0, maxw=maxw)
        teinter(e, {**{i: COEF for i in a}, **{i: ORDO for i in b}})
        return e

    def lignes_q(self, specs):
        """Dans avant_q : TOUTES les lignes de la question, posées au mot (i, texte, phrase, gestes)."""
        refs = list(self.q_q)
        for r in refs:
            self.q_q.remove(r)
        poses = []
        for i, s, phrase, gestes in specs:
            ref = refs[i]
            e = X(s, 34)
            e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
            self.poser_gestes(e, phrase, gestes, echelle=1.15, rt=0.2)
            poses.append(e)
        self._poses_q = poses
        return poses

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le coefficient directeur", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Le coefficient", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        r = Repere((0, 4), (0, 4), 0.8, 0.75, (-5.9, -1.55), grille=(1, 1), zero=False)
        d1 = r.droite(0.5, 1)
        d2 = r.droite(1.5, 0.6)
        d3 = r.droite(-0.75, 3.6)
        h, v = r.marche(1, 1.5, 1, 0.5)
        l1 = self.ld("Que dit le nombre", 0.85, 46, x0=-1.2, maxw=7.7)
        self.poser_gestes(l1, "Que dit le nombre", {0: lambda: [FadeIn(r)], 3: lambda: [Create(d1)]})
        l2 = self.ld("devant x ?", 0.05, 54, JAUNE_TITRE, x0=-1.2, maxw=7.7)
        self.poser_gestes(l2, "devant x ?", {0: lambda: [GrowArrow(h)], 1: lambda: [GrowArrow(v)]})
        self.play(FadeOut(VGroup(h, v)), Transform(d1, d2), run_time=0.45)
        self.play(Transform(d1, d3.set_color(DROITE_G)), run_time=0.45)
        self.insister(l2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le jeu d'Inès ──────────────────────────────────────────────────
    def ecran_developpeuse(self):
        self.ecran("01-developpeuse")
        jeu = EcranJeu(4.0, 2.5).move_to(P(-4.3, 1.75))
        m = ines(1.0, 32, lignes=("Inès, développeuse", "de jeux vidéo"))
        m.perso.next_to(jeu, DOWN, buff=0.3).align_to(jeu, LEFT).shift(RIGHT * 0.25)
        m.nom.arrange(DOWN, buff=0.1, aligned_edge=LEFT).next_to(m.perso, DOWN, buff=0.18).align_to(jeu, LEFT)
        if m.nom.get_bottom()[1] < -3.55:
            dy = -3.55 - m.nom.get_bottom()[1]
            m.perso.shift(UP * dy)
            m.nom.shift(UP * dy)
        if os.environ.get("AUDIT") == "1":
            print(f"GEO 01 perso {m.perso.get_bottom()[1]:.2f}/{m.perso.get_top()[1]:.2f} h={m.perso.height:.2f} "
                  f"nom {m.nom.get_left()[0]:.2f}/{m.nom.get_right()[0]:.2f} bas {m.nom.get_bottom()[1]:.2f}", flush=True)
        self.au("Inès", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("développe", FadeIn(m.nom[1]), rt=0.3)
        self.au("jeu vidéo", FadeIn(jeu, scale=0.9), rt=0.4)
        x0 = -1.6
        l1 = self.ld("Son héros commence", 3.05, 40, x0=x0, maxw=8.0)
        self.poser_gestes(l1, "Son héros commence", {1: lambda: [Indicate(jeu.heros, color=JAUNE_TITRE)]})
        l2 = self.ld("avec 10 points d'énergie,", 2.4, 40, x0=x0, maxw=8.0)
        teinter(l2, {1: ORDO})
        self.poser_gestes(l2, "avec 10 points d'énergie,", {1: lambda: jeu.monter(10)})
        l3 = self.ld("et en gagne 3 par seconde.", 1.75, 40, x0=x0, maxw=8.0)
        teinter(l3, {3: COEF})
        self.poser_gestes(l3, "et en gagne 3 par seconde.", {3: lambda: [Indicate(jeu.eclair, color=COEF, scale_factor=1.4)]})
        l4 = self.ld("Après x secondes :", 1.0, 40, x0=x0, maxw=8.0)
        self.dit(l4, "Après x secondes :")
        f = self.fx("f(x) = 3x + 10", 0.25, 56, x0=x0 + 0.5, a=(5,), b=(8,))
        self.dire_eq(f, "f de x égale 3 x plus 10.", echelle=1.15)
        # le tableau : secondes / énergie
        xt, lt, lc, hh = x0, 2.35, 1.35, 0.85
        yt = -0.78
        cad = VGroup()
        for r in range(2):
            for k in range(4):
                w = lt if k == 0 else lc
                xg = xt + (0 if k == 0 else lt + lc * (k - 1))
                cad.add(Rectangle(width=w, height=hh, stroke_color="#64748b", stroke_width=3,
                                  fill_color="#1e293b" if k == 0 else "#0b1220", fill_opacity=1)
                        .move_to(P(xg + w / 2, yt - r * hh)))
        tetes = VGroup(T("secondes", 36, CIEL, audit=False).move_to(cad[0]),
                       T("énergie", 36, CIEL, audit=False).move_to(cad[4]))
        vals = [("1", "13"), ("2", "16"), ("3", "19")]
        hauts = [T(a, 46, INCONNUE).move_to(cad[1 + k]) for k, (a, _) in enumerate(vals)]
        bas = [T(b, 46).move_to(cad[5 + k]) for k, (_, b) in enumerate(vals)]
        sauts = []
        for k in range(2):  # les arcs SOUS le tableau, avec 0,14 de marge
            p1, p2 = cad[5 + k].get_bottom(), cad[6 + k].get_bottom()
            s = CurvedArrow(p1 + P(0.2, -0.14), p2 + P(-0.2, -0.14), angle=PI / 2.4, color=COEF, stroke_width=4,
                            tip_length=0.14)
            sauts.append(s)
        self.au("1 seconde", FadeIn(cad), FadeIn(tetes), FadeIn(hauts[0], scale=1.3), rt=0.3)
        self.au("13", FadeIn(bas[0], scale=1.3), *jeu.monter(13), rt=0.35)
        self.au("2 secondes", FadeIn(hauts[1], scale=1.3), rt=0.3)
        self.au("16", FadeIn(bas[1], scale=1.3), *jeu.monter(16), Create(sauts[0]), rt=0.35)
        self.au("3 secondes", FadeIn(hauts[2], scale=1.3), rt=0.3)
        self.au("19", FadeIn(bas[2], scale=1.3), *jeu.monter(19), Create(sauts[1]), rt=0.35)
        self.insister(VGroup(*sauts), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : a, le coefficient directeur ────────────────────────────────────
    def repere_energie(self):
        return Repere((0, 4), (0, 22), 0.95, 0.24, (-5.9, -3.0), gx=(1, 2, 3, 4), gy=(5, 10, 15, 20),
                      nom_x="secondes", nom_y="énergie", grille=(1, 1))

    def ecran_coefficient(self):
        self.ecran("02-coefficient")
        r = self.repere_energie()
        df = r.droite(3, 10, 0, 4)
        pts = VGroup(*[r.point(x, 3 * x + 10) for x in (1, 2, 3)])
        self.play(FadeIn(r), Create(df), FadeIn(pts), run_time=0.4)
        x0 = -1.5
        l1 = self.ld("À chaque seconde de plus,", 3.05, 40, x0=x0, maxw=7.9)
        self.dit(l1, "À chaque seconde de plus,")
        marches = [r.marche(x, 3 * x + 10, 1, 3) for x in (0, 1, 2)]
        labs = [T("+3", 32, COEF).next_to(v, RIGHT, buff=0.08) for _, v in marches]
        l2 = self.ld("l'énergie monte de 3.", 2.4, 40, x0=x0, maxw=7.9)
        teinter(l2, {5: COEF})
        self.poser_gestes(l2, "l'énergie monte de 3.",
                          {3: lambda: [GrowArrow(h) for h, _ in marches],
                           5: lambda: [*[GrowArrow(v) for _, v in marches], *[FadeIn(lb) for lb in labs]]})
        rap = self.fx("f(x) = 3x + 10", 1.6, 48, x0=x0 + 0.4, a=(5,), b=(8,))
        rap.sans_audit()
        VGroup(*rap.atomes[0:5]).shift(LEFT * 0.12)
        VGroup(*rap.atomes[6:]).shift(RIGHT * 0.12)
        trois = rap.atomes[5]
        cer = Circle(radius=max(trois.width, trois.height) / 2 + 0.08, color=COEF, stroke_width=4).move_to(trois)
        self.au("Ce 3", FadeIn(rap), rt=0.25)
        l3 = self.ld("Ce 3, c'est a :", 0.8, 46, x0=x0, maxw=7.9)
        teinter(l3, {1: COEF, 6: COEF})
        self.poser_gestes(l3, "Ce 3, c'est a,", {1: lambda: [Create(cer)]})
        l4 = self.ld("le coefficient directeur.", 0.12, 46, COEF, x0=x0, maxw=7.9)
        self.dit(l4, "le coefficient directeur.")
        h1, v1 = marches[1]
        l5 = self.ld("un carreau vers la droite,", -0.7, 40, x0=x0, maxw=7.9)
        self.poser_gestes(l5, "un carreau vers la droite,",
                          {1: lambda: [h1.animate.set_color(JAUNE_TITRE).set_stroke(width=9)]})
        l6 = self.ld("trois carreaux vers le haut.", -1.35, 40, x0=x0, maxw=7.9)
        self.poser_gestes(l6, "trois carreaux vers le haut.",
                          {1: lambda: [v1.animate.set_color(JAUNE_TITRE).set_stroke(width=9),
                                       Indicate(labs[1], color=JAUNE_TITRE, scale_factor=1.4)]})
        raide = r.droite(6, 10, 0, 4, couleur="#93c5fd", sw=5)
        l7 = self.ld("Plus a est grand,", -2.1, 40, x0=x0, maxw=6.85)
        teinter(l7, {1: COEF})
        self.poser_gestes(l7, "Plus a est grand,", {3: lambda: [Create(raide)]})
        l8 = self.ld("plus la droite est raide.", -2.75, 38, JAUNE_TITRE, x0=x0, maxw=6.85)
        self.poser_gestes(l8, "plus la droite est raide.", {4: lambda: [Indicate(raide, color=JAUNE_TITRE)]})
        self.attendre_voix(marge=0.8)

    # ── 03 : a négatif, la droite descend ───────────────────────────────────
    def ecran_negatif(self):
        self.ecran("03-negatif")
        tel = Telephone(1.55, 1.0).move_to(P(-3.3, 2.45))
        chaud = tel.chaleur()
        r = Repere((0, 30), (0, 80), 0.13, 0.05, (-5.9, -3.0), gx=(10, 20, 30), gy=(20, 40, 60, 80),
                   nom_x="minutes", nom_y="batterie", grille=(5, 10))
        dg = r.droite(-2, 80, 0, 30, couleur=DROITE_G)
        lp = Loupe(P(-3.15, 0.12), 1.7, 1.35, 0.32, -2)
        vis = lp.viseur(r.p(5, 70))
        lab2 = T("−2", 32, COEF).next_to(lp.v, RIGHT, buff=0.06)
        x0 = -1.35
        l1 = self.ld("Le téléphone chauffe.", 3.05, 40, x0=x0, maxw=7.9)
        self.poser_gestes(l1, "le téléphone d'Inès chauffe.",
                          {1: lambda: [FadeIn(tel, shift=UP * 0.2)], 2: lambda: [Create(chaud)]})
        l2 = self.ld("Sa batterie est à 80 %,", 2.4, 40, x0=x0, maxw=7.9)
        teinter(l2, {4: ORDO})
        self.poser_gestes(l2, "Sa batterie est à 80 %,", {1: lambda: [FadeIn(r)], 4: lambda: [tel.vers(0.8)]})
        l3 = self.ld("et perd 2 % par minute.", 1.75, 40, x0=x0, maxw=7.9)
        teinter(l3, {2: COEF})
        self.poser_gestes(l3, "et perd 2 % par minute de jeu.", {2: lambda: [tel.vers(0.6)]})
        g = self.fx("g(x) = −2x + 80", 0.95, 54, x0=x0 + 0.4, a=(5, 6), b=(9,))
        self.poser_gestes(g, "g de x égale moins 2 x plus 80.", {9: lambda: [Create(dg)]}, echelle=1.15)
        l4 = self.ld("Ici, a = −2 :", 0.15, 46, x0=x0, maxw=7.9)
        teinter(l4, {2: COEF, 4: COEF, 5: COEF})
        self.poser_gestes(l4, "Ici, a vaut moins 2 :", {2: lambda: [Create(vis), FadeIn(lp)], 5: lambda: [FadeIn(lab2)]})
        l5 = self.ld("un pas vers la droite,", -0.6, 40, x0=x0, maxw=7.9)
        self.poser_gestes(l5, "un pas vers la droite,", {1: lambda: [GrowArrow(lp.h)]})
        l6 = self.ld("deux vers le bas.", -1.25, 40, x0=x0, maxw=7.9)
        self.poser_gestes(l6, "deux vers le bas.", {0: lambda: [GrowArrow(lp.v), Indicate(lab2, color=JAUNE_TITRE, scale_factor=1.3)]})
        l7 = self.ld("La droite descend :", -2.0, 40, x0=x0, maxw=6.6)
        self.poser_gestes(l7, "La droite descend :", {2: lambda: [Indicate(dg, color=JAUNE_TITRE)]})
        l8 = self.ld("fonction décroissante.", -2.68, 40, JAUNE_TITRE, x0=x0, maxw=6.6)
        self.dit(l8, "la fonction est décroissante.")
        self.insister(l8, 1.05, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.5  # 3e relecture -ql : énoncé rétréci (~30 pt) dans une colonne trop étroite
        r = Repere((0, 2), (0, 8), 1.9, 0.58, (-5.6, -3.0), gx=(1, 2), gy=(2, 4, 6, 8), nom_x="x", nom_y="f(x)",
                   grille=(0.5, 1))
        df = r.droite(-4, 7, 0, 2)
        h, v = r.marche(0, 7, 1, -4)
        lab = T("−4", 34, COEF).next_to(v, RIGHT, buff=0.08)
        tenue = {}

        def avant(sc):
            e = sc.ligne_q("f(x) = −4x + 7.", "f de x égale moins 4 x plus 7.", {0: lambda: [FadeIn(r)]})
            tenue["e"] = e
            sc._garde_q = dict(garder=e)  # à la réponse : on garde la formule, les autres lignes s'effacent

        def apres(sc):
            sc.monter_reponse(1)
            e = tenue["e"]
            sc.ph_gestes(0, "Réponse B :", "Réponse B :", {1: lambda: sc._anims_rep}, premier=True)
            sc.ph_gestes(1, "a est le nombre devant x,", "a est le nombre devant x,",
                         {3: lambda: [Circumscribe(VGroup(*e.atomes[5:8]), color=COEF, buff=0.06),
                                      *[a.animate.set_color(COEF) for a in e.atomes[5:7]]]})
            sc.ph_gestes(2, "avec son signe.", "avec son signe.", {})
            sc.ph_gestes(3, "−4 : la droite descend.", "Moins 4 : la droite descend.",
                         {1: lambda: [GrowArrow(h), GrowArrow(v), FadeIn(lab)], 4: lambda: [Create(df)]})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["f(x) = −4x + 7.", "Quel est son", "coefficient directeur ?"],
                            [X("7", 34), X("−4", 34), X("4", 34)], 1,
                            ["Réponse B :", "a est le nombre devant x,", "avec son signe.", "−4 : la droite descend."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : avec deux points ───────────────────────────────────────────────
    def ecran_deux_points(self):
        self.ecran("04-deux-points")
        r = Repere((0, 6), (0, 30), 0.72, 0.15, (-6.0, -3.0), gx=(1, 2, 3, 4, 5, 6), gy=(5, 10, 15, 20, 25, 30),
                   nom_x="secondes", nom_y="jauge", grille=(1, 5))
        jeu = EcranJeu(2.6, 1.5, vmax=30).move_to(P(-3.15, 2.75))  # 22/11 : ne cache plus « jauge »
        A, B = r.point(2, 16), r.point(5, 25)
        la, lb = r.lecture(2, 16), r.lecture(5, 25)
        d = r.droite(3, 10, 0, 6)
        h, v = r.marche(2, 16, 3, 9)
        l3 = T("+3", 34, COEF).next_to(h, DOWN, buff=0.08)
        l9 = T("+9", 34, COEF).next_to(v, RIGHT, buff=0.08)
        x0 = -1.2
        l1 = self.ld("Sans l'expression,", 3.05, 40, x0=x0, maxw=7.6)
        self.poser_gestes(l1, "Sans l'expression,", {0: lambda: [FadeIn(r)]})
        l2 = self.ld("deux points suffisent.", 2.4, 40, x0=x0, maxw=7.6)
        self.dit(l2, "deux points suffisent.")
        self.au("Dans le jeu", FadeIn(jeu, scale=0.9), rt=0.3)
        l4 = self.ld("À 2 secondes : 16.", 1.6, 42, x0=x0, maxw=7.6)
        teinter(l4, {1: INCONNUE})
        self.poser_gestes(l4, "à 2 secondes, une jauge vaut 16.",
                          {4: lambda: [FadeIn(A, scale=1.5), Create(la),
                                       Transform(jeu.plein, jeu.niveau(16))]})
        l5 = self.ld("À 5 secondes : 25.", 0.95, 42, x0=x0, maxw=7.6)
        teinter(l5, {1: INCONNUE})
        self.poser_gestes(l5, "À 5 secondes, elle vaut 25.",
                          {4: lambda: [FadeIn(B, scale=1.5), Create(lb),
                                       Transform(jeu.plein, jeu.niveau(25))]})
        self.play(Create(d), run_time=0.35)
        l6 = self.ld("En 3 secondes : + 9 points.", 0.25, 38, x0=x0, maxw=7.6)
        teinter(l6, {1: COEF, 5: COEF})
        self.poser_gestes(l6, "En 3 secondes, elle a gagné 9 points.",
                          {1: lambda: [GrowArrow(h), FadeIn(l3)], 5: lambda: [GrowArrow(v), FadeIn(l9)]})
        l7 = self.ld("9 ÷ 3 : a = 3 par seconde.", -0.5, 40, x0=x0, maxw=7.6)
        teinter(l7, {4: COEF, 6: COEF})
        VGroup(*l7.atomes[0:4]).shift(LEFT * 0.14)  # le cadre de « a = 3 » ne touche ni « : » ni « par »
        VGroup(*l7.atomes[7:]).shift(RIGHT * 0.14)
        self.poser_gestes(l7, "9 divisé par 3 : a vaut 3 points par seconde.",
                          {6: lambda: [Indicate(VGroup(h, v), color=JAUNE_TITRE)]}, echelle=1.1)
        self.play(Create(self.cadre_ok(VGroup(*l7.atomes[4:7]), 0.1)), run_time=0.25)
        l8 = self.ld("La règle :", -1.3, 40, CIEL, x0=x0, maxw=7.6)
        self.dit(l8, "La règle :")
        r1 = self.ld("a = écart des images", -2.0, 40, x0=x0 + 0.4, maxw=6.4)
        teinter(r1, {0: COEF})
        self.play(FadeIn(r1.atomes[0]), FadeIn(r1.atomes[1]), run_time=0.15)
        self.poser_gestes(r1, "l'écart des images,", {2: lambda: [Indicate(VGroup(v, l9), color=JAUNE_TITRE)]},
                          sauf=r1.atomes[0:2])
        r2 = self.ld("÷ écart des x", -2.7, 40, x0=x0 + 0.95, maxw=5.5)
        self.poser_gestes(r2, "divisé par l'écart des x.", {3: lambda: [Indicate(VGroup(h, l3), color=JAUNE_TITRE)]})
        self.play(Create(SurroundingRectangle(VGroup(r1, r2), color=JAUNE_TITRE, buff=0.14, stroke_width=4,
                                              corner_radius=0.08)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        r = Repere((0, 4), (0, 12), 0.95, 0.37, (-5.6, -3.0), gx=(1, 2, 3, 4), gy=(2, 4, 6, 8, 10, 12),
                   nom_x="x", nom_y="f(x)", grille=(1, 1))
        P1, P2 = r.point(1, 3), r.point(3, 11)
        c1 = T("(1 ; 3)", 32, audit=False).next_to(P1, DR, buff=0.1)
        c2 = T("(3 ; 11)", 32, audit=False).next_to(P2, UL, buff=0.1)
        lec1, lec2 = r.lecture(1, 3), r.lecture(3, 11)
        d = r.droite(4, -1, 0, 4)
        h, v = r.marche(1, 3, 2, 8)
        l2 = T("+2", 34, COEF).next_to(h, UP, buff=0.08)  # 3e relecture -ql : dessous, il couvrait « (1 ; 3) »
        l8 = T("+8", 34, COEF).next_to(v, RIGHT, buff=0.08)

        def avant(sc):
            # à la réponse : l'énoncé s'efface, les coordonnées passent à côté des points
            sc._garde_q = dict(garder=None, avec=lambda: [FadeIn(c1), FadeIn(c2)])
            sc.lignes_q([(0, "Une droite passe par", "Une droite passe par", {0: lambda: [FadeIn(r)]}),
                         (1, "(1 ; 3) et (3 ; 11).",
                          "point de coordonnées 1 et 3, et par le point de coordonnées 3 et 11.",
                          {3: lambda: [FadeIn(P1, scale=1.5), Create(lec1)],
                           9: lambda: [FadeIn(P2, scale=1.5), Create(lec2)]}),
                         (2, "Combien vaut a ?", "Combien vaut a ?", {})])

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_gestes(0, "Réponse C :", "Réponse C :", {1: lambda: sc._anims_rep}, premier=True)
            sc.ph_gestes(1, "images : + 8,", "les images passent de 3 à 11, soit 8.",
                         {3: lambda: [GrowArrow(v), FadeIn(l8)]})
            sc.ph_gestes(2, "x : + 2.", "Les x passent de 1 à 3, soit 2.", {3: lambda: [GrowArrow(h), FadeIn(l2)]})
            sc.ph_gestes(3, "8 ÷ 2 = 4.", "8 divisé par 2 : 4.", {4: lambda: [Create(d)]})
            sc.ph_gestes(4, "Pas 8 : il faut", "Pas 8 : il faut", {})
            sc.ph_gestes(5, "diviser par", "diviser par", {})
            sc.ph_gestes(6, "l'écart des x.", "l'écart des x.", {4: lambda: [Indicate(VGroup(h, l2), color=JAUNE_TITRE)]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Une droite passe par", "(1 ; 3) et (3 ; 11).",
                                                            "Combien vaut a ?"],
                            [X("8", 34), X("0,25", 34), X("4", 34)], 2,
                            ["Réponse C :", "images : + 8,", "x : + 2.", "8 ÷ 2 = 4.",
                             "Pas 8 : il faut", "diviser par", "l'écart des x."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        r = Repere((-2, 3), (-6, 5), 0.7, 0.43, (-4.6, -0.7), gx=(-2, -1, 1, 2, 3), gy=(-6, -4, -2, 2, 4),
                   nom_x="x", nom_y="y", grille=(1, 1))
        m = ines(0.45, 32, lignes=("Inès",))
        m.perso.move_to(P(-6.0, 2.55))
        m.nom.next_to(m.perso, RIGHT, buff=0.15)
        q = T("?", 60, JAUNE_TITRE, audit=False).move_to(r.p(1.8, 3.5))
        self.play(FadeIn(m), FadeIn(r), run_time=0.3)
        x0 = -1.9
        xi = x0 + 0.85
        tit = T("À toi de jouer !", 54, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        p1 = pastille("1", CIEL, 0.3).scale(1.15).move_to(P(x0 + 0.3, 1.95))
        e1 = self.fx("f(x) = 5 − 3x", 1.95, 50, x0=xi)
        self.au("Un :", FadeIn(p1, scale=1.3), rt=0.25)
        self.dire_eq(e1, "f de x égale 5 moins 3 x.", echelle=1.15)
        l1 = self.ld("Croissante ou décroissante ?", 1.2, 38, JAUNE_TITRE, x0=xi, maxw=7.5)
        self.dit(l1, "Croissante ou décroissante ?")
        p2 = pastille("2", CIEL, 0.3).scale(1.15).move_to(P(x0 + 0.3, 0.3))
        l2 = self.ld("Une droite passe par", 0.3, 40, x0=xi, maxw=7.5)
        self.au("Deux :", FadeIn(p2, scale=1.3), rt=0.25)
        self.dit(l2, "une droite passe par")
        P1, P2 = r.point(-1, 4), r.point(2, -5)
        e2 = self.ld("(−1 ; 4) et (2 ; −5).", -0.42, 46, x0=xi, maxw=7.5)
        self.poser_gestes(e2, "le point de coordonnées moins 1 et 4, et par le point de coordonnées 2 et moins 5.",
                          {4: lambda: [FadeIn(P1, scale=1.5)], 11: lambda: [FadeIn(P2, scale=1.5), FadeIn(q, scale=1.4)]},
                          echelle=1.1)
        l3 = self.ld("Combien vaut a ?", -1.15, 42, x0=xi, maxw=7.5)
        teinter(l3, {2: COEF})
        self.dit(l3, "Combien vaut a ?")
        pz = T("Mets pause, et cherche !", 44, ORANGE_RETENUE).move_to(P(0, -2.0)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(r=r, P1=P1, P2=P2, tit=tit, autres=VGroup(m, q, p1, e1, l1, p2, l2, e2, l3, pz))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        r = d["r"]
        self.dire("06b-correction")
        x0 = -1.9
        xi = x0 + 0.85
        tit = T("Correction", 52, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["autres"]), rt=0.4)
        p1 = pastille("1", CIEL, 0.3).scale(1.15).move_to(P(x0 + 0.3, 2.1))
        e1 = self.fx("5 − 3x = −3x + 5", 2.1, 46, x0=xi, a=(5, 6))
        self.au("Un :", FadeIn(p1, scale=1.3), rt=0.2)
        self.poser_gestes(e1, "5 moins 3 x, c'est moins 3 x plus 5.", {}, echelle=1.1)
        l1 = self.ld("a = −3 : il est négatif,", 1.4, 42, x0=xi, maxw=7.5)
        teinter(l1, {0: COEF, 2: COEF, 3: COEF})
        self.dit(l1, "a vaut moins 3 : il est négatif,")
        l2 = self.ld("f est décroissante.", 0.75, 42, VERT_OK, x0=xi, maxw=7.5)
        self.dit(l2, "f est décroissante.")
        self.play(Create(self.cadre_ok(l2, 0.1)), run_time=0.25)
        h, v = r.marche(-1, 4, 3, -9)
        # 4e relecture -ql : « +3 » tombait sur la graduation « 4 » : centré au-dessus de la flèche, côté x > 0
        lh = T("+3", 34, COEF).next_to(h, UP, buff=0.06).set_x(r.p(1.1, 4)[0])
        lv = T("−9", 34, COEF).next_to(r.p(2, -3.2), RIGHT, buff=0.12)
        dr = r.droite(-3, 1)
        p2 = pastille("2", CIEL, 0.3).scale(1.15).move_to(P(x0 + 0.3, -0.05))
        l3 = self.ld("images : 4 à −5, soit −9.", -0.05, 42, x0=xi, maxw=7.5)
        self.au("Deux :", FadeIn(p2, scale=1.3), rt=0.2)
        self.poser_gestes(l3, "les images passent de 4 à moins 5, soit moins 9.",
                          {9: lambda: [GrowArrow(v), FadeIn(lv)]})
        l4 = self.ld("x : de −1 à 2, soit 3.", -0.75, 42, x0=xi, maxw=7.5)
        # 4e relecture -ql : la flèche « +3 » barrait le « 4 » de l'axe : il s'efface quand elle pousse
        g4 = [g for g in r.grads if isinstance(g, Text) and g.text == "4" and abs(g.get_y() - r.p(0, 4)[1]) < 0.06]
        self.poser_gestes(l4, "Les x passent de moins 1 à 2, soit 3.",
                          {9: lambda: [GrowArrow(h), FadeIn(lh)] + [FadeOut(g) for g in g4]})
        l5 = self.ld("−9 ÷ 3 : a = −3.", -1.55, 50, x0=xi, maxw=7.5)
        teinter(l5, {5: COEF, 7: COEF, 8: COEF})
        self.poser_gestes(l5, "Moins 9 divisé par 3 : a vaut moins 3.", {8: lambda: [Create(dr)]}, echelle=1.1)
        self.play(Create(self.cadre_ok(l5, 0.12)), run_time=0.25)
        self.insister(l5, 1.06, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.45)
        r = Repere((0, 4), (0, 4), 0.95, 1.0, (-6.5, -2.6), grille=(1, 1), zero=False)
        dm = r.droite(0.75, 0.6)
        dd = r.droite(-0.75, 3.6, couleur=DROITE_G)
        hm, vm = r.marche(1, 1.35, 1, 0.75)
        self.play(Write(tit), FadeIn(r), Create(dm), Create(dd), run_time=0.6)
        x0 = -1.65
        y = [2.35, 1.75, 1.0, 0.4, -0.35, -0.95, -1.7, -2.3, -2.9]

        def ok(e):
            k = self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y()))
            return [Create(k)]

        l0 = self.ld("Dans ax + b, a est", y[0], 40, x0=x0, maxw=8.2)
        teinter(l0, {1: COEF, 3: ORDO, 5: COEF})
        l0.atomes[1][1].set_color(INCONNUE)
        self.poser_gestes(l0, "Dans a x plus b, a est", {0: lambda: ok(l0)})
        l1 = self.ld("le coefficient directeur.", y[1], 40, COEF, x0=x0, maxw=8.2)
        self.dit(l1, "le coefficient directeur.")
        l2 = self.ld("Il dit de combien f augmente", y[2], 38, x0=x0, maxw=8.2)
        self.poser_gestes(l2, "Il dit de combien f augmente", {0: lambda: ok(l2)})
        l3 = self.ld("quand x augmente de 1.", y[3], 40, x0=x0, maxw=8.2)
        self.poser_gestes(l3, "quand x augmente de 1.", {4: lambda: [GrowArrow(hm), GrowArrow(vm)]})
        l4 = self.ld("a positif : la droite monte.", y[4], 40, x0=x0, maxw=8.2)
        teinter(l4, {0: COEF})
        self.poser_gestes(l4, "Si a est positif, la droite monte.",
                          {0: lambda: ok(l4), 5: lambda: [Indicate(dm, color=JAUNE_TITRE)]})
        l5 = self.ld("a négatif : elle descend.", y[5], 40, x0=x0, maxw=8.2)
        teinter(l5, {0: COEF})
        self.poser_gestes(l5, "S'il est négatif, elle descend.",
                          {0: lambda: ok(l5), 4: lambda: [Indicate(dd, color=JAUNE_TITRE)]})
        l6 = self.ld("Avec deux points :", y[6], 40, x0=x0, maxw=7.2)
        self.poser_gestes(l6, "Avec deux points :", {0: lambda: ok(l6)})
        l7 = self.ld("écart des images", y[7], 40, x0=x0 + 0.5, maxw=6.5)
        self.dit(l7, "l'écart des images,")
        l8 = self.ld("÷ écart des x.", y[8], 40, x0=x0 + 0.5, maxw=6.5)
        self.dit(l8, "divisé par l'écart des x.")
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_developpeuse()
        self.ecran_coefficient()
        self.ecran_negatif()
        self.ecran_question1()
        self.ecran_deux_points()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
