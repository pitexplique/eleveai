# affine_tracer.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 07 : TRACER la droite d'une fonction affine.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE.
# Métier : Yanis, boulanger (son four : 30 degrés au départ, + 20 degrés par minute : f(x) = 20x + 30).
# Le geste : les points se placent UN À UN au moment où la voix les dit (avec leurs pointillés de lecture),
# puis la RÈGLE vient se poser sur les deux points, relie et prolonge.
# Écrans (clés de manim/voix/3e-affine-tracer.json) :
#   00-garde        page de garde, échelle des ceintures, « Combien de points faut-il pour tracer sa droite ? »
#   01-boulanger    Yanis, son four et le thermomètre ; f(x) = 20x + 30
#   02-points       le repère (minutes, degrés) ; f(0) = 30 → (0 ; 30) ; f(5) = 20 × 5 + 30 = 130 → (5 ; 130)
#   03-droite       la règle relie et prolonge ; f(10) = 230 → (10 ; 230) bien sur la droite
#   03q / 03r       QUESTION 1 : la droite de f(x) = 2x − 1 → C, (0 ; −1) et (1 ; 1)
#   04-descend      g(x) = −2x + 3 : (0 ; 3) et (2 ; −1), droite orange qui descend de 2 à chaque pas
#   05q / 05r       QUESTION 2 : le point qui n'est PAS sur la droite de f(x) = x + 2 → A, (3 ; 4)
#   06-defi         À toi : f(x) = −x + 4 et g(x) = 0,5x dans un même repère
#   06b-correction  (0 ; 4) et (4 ; 0) : f descend ; g linéaire, (0 ; 0) et (4 ; 2) : g monte doucement
#   07-finale       Ce que tu as appris (titre en haut et centré)
#   08-abonne       fin commune (manim/fin_commune.py)
# Lettres justes : 03q → C, 05q → A.
# Code couleur : x bleu ; a orange ; b violet ; juste vert ; piège rouge ; droite de f bleue, g orange.
# Voix : manim/voix/3e-affine-tracer.json (validée) ; marques : affine_tracer_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_tracer.py AffineTracer3e --media_dir manim/scripts/3e/media-affine-07-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_tracer.py AffineTracer3e -o eleveai-maths-3e-affine-tracer --media_dir manim/scripts/3e/media-affine-07
# Sortie : manim/sorties/3e/maths/fonctions-affines/07-tracer/eleveai-maths-3e-affine-tracer.mp4
# En plus des alertes communes, AUDIT=1 signale SUR-REPERE (un texte d'explication sur la zone d'un repère)
# et SUR-TRAIT (un texte, graduation ou étiquette, coupé par un axe, une droite ou un pointillé).

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, pastille  # noqa: E402
from affine_coeff_directeur import (AffineCoeffDirecteur3e, COEF, DROITE_F, DROITE_G, ORDO,  # noqa: E402
                                    Repere, teinter)

PAROLE["0"] = "0"  # relatif_commun lit « 0 » comme « zéro » : la voix écrit « 0 »

FOND = "#0b1220"
BRIQUE = "#9a3412"


# ── l'audit des repères ──────────────────────────────────────────────────────

def _coupe(p, q, g, d, b, h):
    """Le segment [p, q] coupe-t-il le rectangle [g, d] × [b, h] ? (Liang-Barsky)"""
    x0, y0, x1, y1 = p[0], p[1], q[0], q[1]
    dx, dy = x1 - x0, y1 - y0
    t0, t1 = 0.0, 1.0
    for pp, qq in ((-dx, x0 - g), (dx, d - x0), (-dy, y0 - b), (dy, h - y0)):
        if abs(pp) < 1e-12:
            if qq < 0:
                return False
        else:
            r = qq / pp
            if pp < 0:
                t0 = max(t0, r)
            else:
                t1 = min(t1, r)
            if t0 > t1:
                return False
    return True


class _AuditRepere:
    """AUDIT=1 : après chaque animation, SUR-REPERE (un texte d'explication posé sur la zone d'un repère)
    et SUR-TRAIT (un texte coupé par un trait enregistré : axes, droites, pointillés, marches)."""

    def _init_audit_rep(self):
        if not hasattr(self, "_reps"):
            self._reps, self._traits, self._vus_rep = [], [], set()

    def rep(self, *a, **k):
        self._init_audit_rep()
        r = Repere(*a, **k)
        self._reps.append(r)
        for f in r.get_family():
            f._grad = True
        self._traits += [r.ax, r.ay]
        return r

    def trait(self, *ts):
        self._init_audit_rep()
        for t in ts:
            for f in t.get_family():
                if isinstance(f, (Line, Arrow)) and not isinstance(f, DashedLine) or isinstance(f, DashedLine):
                    if f.has_points() or isinstance(f, DashedLine):
                        self._traits.append(f)
                        break
        return ts[0] if len(ts) == 1 else ts

    def play(self, *a, **k):
        super().play(*a, **k)
        if os.environ.get("AUDIT") == "1":
            self._audit_rep()

    def _audit_rep(self):
        self._init_audit_rep()
        fam = {}
        for m in self.mobjects:
            for f in m.get_family():
                fam[id(f)] = f
        reps = [r for r in self._reps if id(r) in fam]
        dans_rep = set()
        for r in reps:
            dans_rep |= {id(f) for f in r.get_family()}
        txts = [f for f in fam.values() if isinstance(f, Text) and getattr(f, "original_text", None)
                and f.get_fill_opacity() > 0.05]
        cle = getattr(self, "_cle_voix", "?")
        for t in txts:
            mini = 27.5 if getattr(t, "_grad", False) else 31.5
            if t.font_size < mini and not getattr(t, "_libre", False):
                c = ("PT", cle, t.original_text)
                if c not in self._vus_rep:
                    self._vus_rep.add(c)
                    print(f"PETIT {cle} « {t.original_text} » {t.font_size:.0f} pt", flush=True)
            g, d, b, h = t.get_left()[0] + 0.02, t.get_right()[0] - 0.02, t.get_bottom()[1] + 0.02, t.get_top()[1] - 0.02
            if id(t) not in dans_rep and not getattr(t, "_etiquette", False) and not getattr(t, "_libre", False):
                for r in reps:
                    z = VGroup(r.grille, r.ax, r.ay, r.grads, r.noms)
                    if d > z.get_left()[0] and g < z.get_right()[0] and h > z.get_bottom()[1] and b < z.get_top()[1]:
                        c = ("REP", cle, t.original_text)
                        if c not in self._vus_rep:
                            self._vus_rep.add(c)
                            print(f"SUR-REPERE {cle} « {t.original_text} »", flush=True)
            for s in self._traits:
                if id(s) not in fam or s.get_stroke_opacity() < 0.05:
                    continue
                if isinstance(s, DashedLine):
                    p, q = s.get_start(), s.get_end()
                else:
                    p, q = s.get_start(), s.get_end()
                if _coupe(p, q, g, d, b, h):
                    c = ("TR", cle, t.original_text, id(s))
                    if c not in self._vus_rep:
                        self._vus_rep.add(c)
                        print(f"SUR-TRAIT {cle} « {t.original_text} » / {type(s).__name__} texte x[{g:.2f},{d:.2f}] "
                              f"y[{b:.2f},{h:.2f}] trait {p[0]:.2f},{p[1]:.2f} → {q[0]:.2f},{q[1]:.2f}", flush=True)


# ── les dessins ──────────────────────────────────────────────────────────────

class Four(VGroup):
    """Le four du boulanger : briques, bouche, feu (.feu, éteint au départ), cheminée, thermomètre
    (.thermo) dont la colonne rouge monte : .niveau(k), k de 0 à 1."""

    def __init__(self, w=3.0, h=2.2, **kw):
        super().__init__(**kw)
        self.corps = RoundedRectangle(width=w, height=h, corner_radius=0.35, fill_color=BRIQUE, fill_opacity=1,
                                      stroke_color="#7c2d12", stroke_width=4)
        joints = VGroup()
        for k in range(1, 4):
            y = -h / 2 + k * h / 4
            joints.add(Line(P(-w / 2 + 0.12, y), P(w / 2 - 0.12, y)))
            for j in range(4):
                x = -w / 2 + (j + (0.5 if k % 2 else 0)) * w / 4 + 0.2
                if -w / 2 + 0.15 < x < w / 2 - 0.15:
                    joints.add(Line(P(x, y), P(x, y + h / 4)))
        joints.set_stroke("#c2410c", 2)
        self.bouche = RoundedRectangle(width=w * 0.55, height=h * 0.46, corner_radius=0.3, fill_color="#1c1917",
                                       fill_opacity=1, stroke_color="#57534e", stroke_width=4).move_to(P(0, -h * 0.18))
        self.feu = VGroup(*[Polygon(P(dx - 0.18 * s, 0), P(dx, 0.62 * s), P(dx + 0.18 * s, 0), fill_color=c,
                                    fill_opacity=1, stroke_width=0)
                            for dx, s, c in ((-0.3, 0.8, "#f97316"), (0.0, 1.0, "#facc15"), (0.3, 0.75, "#f97316"))])
        self.feu.move_to(self.bouche.get_bottom() + UP * 0.34)
        self.feu.set_opacity(0)
        chem = Rectangle(width=0.42, height=0.6, fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
        chem.next_to(self.corps, UP, buff=-0.08).shift(RIGHT * w * 0.25)
        # le thermomètre, à droite
        self.tube = RoundedRectangle(width=0.26, height=h * 0.95, corner_radius=0.13, fill_color=WHITE,
                                     fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
        self.tube.next_to(self.corps, RIGHT, buff=0.3).shift(UP * 0.15)
        self.bulbe = Circle(radius=0.22, fill_color=PIEGE, fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
        self.bulbe.move_to(self.tube.get_bottom())
        self.col = self.colonne(0.1)
        self.thermo = VGroup(self.tube, self.col, self.bulbe)
        self.add(chem, self.corps, joints, self.bouche, self.feu, self.thermo)

    def colonne(self, k):
        hmax = self.tube.height - 0.3
        hc = max(0.02, hmax * k)
        return Rectangle(width=0.12, height=hc, fill_color=PIEGE, fill_opacity=1, stroke_width=0) \
            .move_to(self.tube.get_bottom() + UP * (0.1 + hc / 2))

    def niveau(self, k):
        return Transform(self.col, self.colonne(k))

    def allumer(self):
        return [self.feu.animate.set_opacity(1), self.bouche.animate.set_fill("#431407")]


def yanis(s=0.72, fs=34):
    """Yanis, boulanger : tenue blanche, toque, une baguette sous le bras."""
    m = Metier(["Yanis", "boulanger"], fs=fs, peau="#c68642", tenue="#e5e7eb", cheveux="#1f1308", s=s)
    p = m.perso
    c, r = p.tete.get_center(), p.tete.width / 2
    bande = Rectangle(width=r * 1.9, height=r * 0.5, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bande.move_to(c + UP * r * 0.95)
    gonfle = VGroup(*[Circle(radius=r * 0.52, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(c + P(dx * r, r * 1.55)) for dx in (-0.55, 0, 0.55)])
    bag = RoundedRectangle(width=0.22 * s, height=1.4 * s, corner_radius=0.1 * s, fill_color="#d97706",
                           fill_opacity=1, stroke_color="#92400e", stroke_width=2).rotate(-0.5)
    bag.next_to(p.corps, RIGHT, buff=-0.2 * s).shift(UP * 0.1 * s)
    p.add(gonfle, bande, bag)
    return m


class Regle(VGroup):
    """La règle posée le long de [p, q] (dépassant de `ext`), graduée sur le bord qui touche la droite."""

    def __init__(self, p, q, ext=0.7, h=0.32, **kw):
        super().__init__(**kw)
        p, q = np.array(p), np.array(q)
        u = (q - p) / np.linalg.norm(q - p)
        L = np.linalg.norm(q - p) + 2 * ext
        corps = Rectangle(width=L, height=h, fill_color="#fde68a", fill_opacity=0.85, stroke_color="#b45309",
                          stroke_width=2)
        ticks = VGroup()
        n = int(L / 0.16)
        for k in range(1, n):
            x = -L / 2 + k * 0.16
            ticks.add(Line(P(x, -h / 2), P(x, -h / 2 + (0.14 if k % 5 == 0 else 0.07))))
        ticks.set_stroke("#92400e", 2)
        self.add(corps, ticks)
        ang = math.atan2(u[1], u[0])
        self.rotate(ang)
        nrm = np.array([-u[1], u[0], 0.0])
        self.move_to((p + q) / 2 + nrm * (h / 2 + 0.03))
        self.nrm = nrm


class AffineTracer3e(_AuditRepere, AffineCoeffDirecteur3e):
    nom_voix = "3e-affine-tracer"
    fichier_marques = "affine_tracer_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "orange"

    # ── outils ──────────────────────────────────────────────────────────────
    def _disposer_q(self, question, choix, phrase):
        """Relecture -ql du 22/11 (2e passe) : énoncé à 40 pt ; cartes à 40 pt, assez larges pour la coche (sinon
        la bonne carte rétrécit son contenu) ; « Mets pause, / et choisis ! » sur deux lignes à 36 pt, à droite
        des cartes s'il y a la place, sinon sous elles, à gauche : jamais sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(q.submobjects):
            q.scale(40 / self._fs(q[0]))
            if q.width > 6.4 - self.XL:
                q.scale_to_fit_width(6.4 - self.XL)
            q.next_to(tete, DOWN, buff=0.25).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(40 / self._fs(dedans[1]), about_point=dedans.get_left())
            cadre.stretch_to_fit_height(dedans.height + 0.26)
            dedans.set_y(cadre.get_y())
        larg = max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 1.1  # la coche : 0,95
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        cartes.arrange(DOWN, buff=0.14, aligned_edge=LEFT)
        cartes.next_to(q if len(q.submobjects) else tete, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        pause = VGroup(T("Mets pause,", 36, ORANGE_RETENUE, audit=False),
                       T("et choisis !", 36, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        for f in pause.get_family():
            f.sans_synchro = True
        pause.next_to(cartes, RIGHT, buff=0.3).set_y(cartes.get_y())
        if pause.get_right()[0] > 6.5:
            pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        if os.environ.get("AUDIT") == "1":
            g, d, b, h = self._zone_margo()
            print(f"MISE-EN-PAGE {self._cle_voix} q {self._fs(q[0]) if len(q.submobjects) else 0:.0f} pt, cartes "
                  f"{self._fs(cartes[0][1][1]):.0f} pt {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} "
                  f"droite {cartes.get_right()[0]:.2f} ; pause {self._fs(pause):.0f} pt x[{pause.get_left()[0]:.2f},"
                  f"{pause.get_right()[0]:.2f}] y[{pause.get_bottom()[1]:.2f},{pause.get_top()[1]:.2f}] "
                  f"(Ti-Margo x≥{g:.2f}, y≤{h:.2f})", flush=True)
        self._tete_q = tete
        return tete, q, cartes, pause, rebours, ph

    def lignes_q(self, specs):
        poses = super().lignes_q(specs)
        self._q_poses = poses
        return poses

    def monter_reponse(self, bonne):
        """Les mauvaises cartes ET les premières lignes de l'énoncé s'effacent ; la ligne de la fonction
        monte sous « Question ! », la bonne carte dessous : la réponse a la place d'être à 36 pt, à gauche
        de Ti-Margo."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]
        poses = getattr(self, "_q_poses", [])
        tete = self._tete_q
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        anims += [FadeOut(m) for m in poses[:-1]]
        y = tete.get_bottom()[1] - 0.25
        if poses:
            f = poses[-1]
            d = P(self.XL, y) - np.array([f.get_left()[0], f.get_top()[1], 0])
            anims.append(f.animate.shift(d))
            y -= f.height + 0.25
        d = np.array([0, y - b.get_top()[1], 0])
        anims.append(b.animate.shift(d))
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.3)
        haut = y - b.height - 0.3
        # 22/11 (2e passe) : chaque ligne est réécrite à 36 pt par ph_gestes ; ici, seulement les places
        ph.scale(T("Réponse A :", 36, audit=False).height / ph[0].height)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        ph.next_to(P(0, haut), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        self._rep36 = True
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} haut {haut:.2f}, bas {ph.get_bottom()[1]:.2f}, "
                  f"carte {self._fs(b[1][1]):.0f} pt", flush=True)

    def ph_gestes(self, i, s, phrase, gestes, premier=False):
        """La ligne i de la réponse, à 36 pt EFFECTIFS (mise à la largeur de sa place, elle sortait à ~28)."""
        if not getattr(self, "_rep36", False):
            return super().ph_gestes(i, s, phrase, gestes, premier)
        ref = self.ph_q[i]
        e = X(s, 36, VERT_OK)
        e.move_to(ref).align_to(ref, LEFT)
        if os.environ.get("AUDIT") == "1":
            print(f"REPONSE {self._cle_voix} « {s} » {self._fs(e):.0f} pt, droite {e.get_right()[0]:.2f}, "
                  f"bas {e.get_bottom()[1]:.2f}", flush=True)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes, rt=0.16, sauf=sauf)

    def etiq(self, s, point, dirn, fs=32, buff=0.12, couleur=WHITE):
        """L'étiquette « (5 ; 130) » d'un point, sur un petit fond OPAQUE (la grille ne la traverse pas).
        22/11 (2e passe) : le fond, posé après le texte, le voilait (gris foncé) : fond en z 1, texte en z 2."""
        e = E(s, fs, couleur, lettres="")
        e.next_to(point, dirn, buff=buff)
        for a in e.atomes:
            a._etiquette = True
        fond = RoundedRectangle(width=e.width + 0.16, height=e.height + 0.12, corner_radius=0.06, stroke_width=0,
                                fill_color=FOND, fill_opacity=1).move_to(e)
        fond.set_z_index(1)
        e.set_z_index(2)
        return e, fond

    def poser_point(self, r, x, y, s, dirn, phrase, couleur=WHITE, lecture=True, fs=32, buff=0.12, decal=ORIGIN):
        """Le point (x ; y) et son étiquette, posés AU MOT : le fond et les pointillés au 1er nombre,
        le point au 2e."""
        d = r.point(x, y, couleur, r=0.1)
        e, fond = self.etiq(s, d, dirn, fs, buff)
        e.shift(decal)
        fond.shift(decal)
        lec = r.lecture(x, y, JAUNE_TITRE) if lecture else None
        i1 = next(i for i, a in enumerate(e.atomes) if a.original_text[0].isdigit())
        i2 = next(i for i, a in enumerate(e.atomes) if i > i1 + 1 and a.original_text[0].isdigit())
        g1 = [FadeIn(fond)] + ([Create(lec[0])] if lec else [])
        g2 = [FadeIn(d, scale=2.0)] + ([Create(lec[1])] if lec else [])
        if lec:
            self.trait(lec[0], lec[1])
        self.poser_gestes(e, phrase, {i1: lambda: g1, i2: lambda: g2}, echelle=1.2)
        self.play(Flash(d, color=JAUNE_TITRE, line_length=0.18, flash_radius=0.22), run_time=0.3)
        return d, e, fond, lec

    def fonc(self, s, y, fs=52, x0=-1.6, maxw=8.0, c=WHITE):
        """f(x) = ax + b : a (et son signe) orange, b (et son signe) violet."""
        e = self.ld(s, y, fs, c, x0=x0, maxw=maxw)
        at = e.atomes
        i_eg = next(i for i, a in enumerate(at) if a.original_text == "=")
        for i in range(i_eg + 1, len(at)):
            t = at[i].original_text
            suivi_x = i + 1 < len(at) and at[i + 1].original_text == "x"
            if t[0].isdigit():
                at[i].set_color(COEF if suivi_x else ORDO)
                if at[i - 1].original_text in "−+" and i - 1 > i_eg:
                    if not suivi_x or at[i - 1].original_text == "−":
                        at[i - 1].set_color(COEF if suivi_x else ORDO)
            elif t == "−" and suivi_x:
                at[i].set_color(COEF)
        return e

    def repere_four(self):
        # 22/11 (2e passe) : « 1 2 3 … 10 » collés (le 10 touchait le 9) : seulement 0, 2, 4, 6, 8, 10
        r = self.rep((0, 10.5), (0, 260), 0.38, 0.02, (-5.7, -2.6), gx=(2, 4, 6, 8, 10), gy=(50, 100, 150, 200, 250),
                     nom_y="degrés", grille=(1, 25))
        nx = T("minutes", 32, CIEL, audit=False).next_to(r.grads, DOWN, buff=0.1)
        nx.align_to(r.ax.get_end(), RIGHT)
        r.noms.add(nx)
        for f in nx.get_family():
            f._grad = True
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Représenter une fonction affine", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Représenter", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        r = self.rep((0, 4), (0, 4), 0.8, 0.75, (-5.9, -1.55), grille=(1, 1), zero=False)
        A, B = r.point(1, 1.2, WHITE, r=0.1), r.point(3, 2.8, WHITE, r=0.1)
        d = self.trait(r.droite(0.8, 0.4))
        l1 = self.ld("Combien de points", 0.85, 46, x0=-1.2, maxw=7.7)
        self.poser_gestes(l1, "Combien de points", {0: lambda: [FadeIn(r)],
                                                     2: lambda: [FadeIn(A, scale=2), FadeIn(B, scale=2)]})
        l2 = self.ld("pour tracer sa droite ?", 0.05, 44, JAUNE_TITRE, x0=-1.2, maxw=7.7)
        self.poser_gestes(l2, "pour tracer sa droite ?", {1: lambda: [Create(d)]})
        self.insister(l2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Yanis et son four ──────────────────────────────────────────────
    def ecran_boulanger(self):
        self.ecran("01-boulanger")
        four = Four(2.8, 2.0).move_to(P(-4.75, 1.55))
        m = yanis(0.7, 32)
        m.perso.move_to(P(-5.7, -1.75))
        m.nom.arrange(DOWN, buff=0.08, aligned_edge=LEFT).next_to(m.perso, RIGHT, buff=0.3).align_to(m.perso, UP)
        x0, mw = -1.8, 7.0
        l1 = self.ld("Yanis est boulanger.", 3.1, 40, x0=x0, maxw=mw)
        self.poser_gestes(l1, "Yanis est boulanger.",
                          {0: lambda: [FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1)],
                           2: lambda: [FadeIn(m.nom[1], shift=UP * 0.1)]})
        l2 = self.ld("À 4 heures du matin,", 2.5, 40, x0=x0, maxw=mw)
        self.poser_gestes(l2, "À 4 heures du matin,", {0: lambda: [FadeIn(four, scale=0.9)]})
        l3 = self.ld("il allume son four.", 1.9, 40, x0=x0, maxw=mw)
        self.poser_gestes(l3, "il allume son four.", {1: lambda: four.allumer()})
        l4 = self.ld("Le four est à 30 degrés,", 1.25, 40, x0=x0, maxw=mw)
        teinter(l4, {4: ORDO})
        self.poser_gestes(l4, "Le four est à 30 degrés,", {4: lambda: [four.niveau(0.12)]})
        l5 = self.ld("il chauffe de 20 degrés", 0.65, 40, x0=x0, maxw=mw)
        teinter(l5, {3: COEF})
        self.poser_gestes(l5, "il chauffe de 20 degrés", {1: lambda: [four.niveau(0.45),
                                                                          Flash(four.feu, color=ORANGE_RETENUE)]})
        l6 = self.ld("par minute.", 0.05, 40, x0=x0, maxw=mw)
        self.poser_gestes(l6, "par minute.", {1: lambda: [four.niveau(0.6)]})
        l7 = self.ld("Sa température,", -0.6, 40, CIEL, x0=x0, maxw=mw)
        self.poser_gestes(l7, "Sa température,", {1: lambda: [Indicate(four.thermo, color=JAUNE_TITRE)]})
        f = self.fonc("f(x) = 20x + 30", -1.4, 54, x0=x0 + 0.5)
        self.dire_eq(f, "f de x égale 20 x plus 30.", echelle=1.15)
        self.play(Create(SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.14, stroke_width=4, corner_radius=0.08)),
                  run_time=0.3)
        l8 = self.ld("Yanis veut voir sa montée", -2.25, 38, x0=x0, maxw=mw)
        self.poser_gestes(l8, "Yanis veut voir sa montée", {4: lambda: [four.niveau(0.85)]})
        l9 = self.ld("sur un graphique.", -2.85, 38, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l9, "sur un graphique.")
        self.attendre_voix(marge=0.8)

    # ── 02 : deux points suffisent ──────────────────────────────────────────
    def ecran_points(self):
        self.ecran("02-points")
        r = self.repere_four()
        rap = self.fonc("f(x) = 20x + 30", 3.1, 40, x0=-0.7)
        for a in rap.atomes:
            a._pas_audit = True
        self.play(FadeIn(r), FadeIn(rap), run_time=0.4)
        x0, mw = -0.7, 6.1
        l1 = self.ld("Une fonction affine", 2.35, 40, x0=x0, maxw=mw)
        self.dit(l1, "Une fonction affine")
        l2 = self.ld("se représente", 1.8, 40, x0=x0, maxw=mw)
        self.dit(l2, "se représente")
        l3 = self.ld("par une droite.", 1.25, 40, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l3, "par une droite.")
        l4 = self.ld("Deux points suffisent.", 0.6, 38, VERT_OK, x0=x0, maxw=mw)
        self.dit(l4, "deux points suffisent.")
        g0 = [a for a in r.grads if isinstance(a, Text) and a.original_text == "0"]
        self.au("faciles", *[Indicate(g, color=JAUNE_TITRE, scale_factor=1.6) for g in g0],
                Flash(r.p(5, 0), color=JAUNE_TITRE, line_length=0.15, flash_radius=0.18), rt=0.45)
        e0 = X("f(0) = 30", 50).move_to(P(0, -0.25)).align_to(P(x0 + 0.3, 0), LEFT)
        teinter(e0, {2: INCONNUE, 5: ORDO})
        self.dire_eq(e0, "f de 0 égale 30", echelle=1.15)
        self.A = self.poser_point(r, 0, 30, "(0 ; 30)", DR, "le point 0 ; 30.", lecture=False, buff=0.04,
                                  fs=30, decal=UP * 0.12)  # sous la droite, au-dessus de l'axe, avant x = 5
        e5 = X("f(5) = 20 × 5 + 30", 44).move_to(P(0, -1.15)).align_to(P(x0 + 0.3, 0), LEFT)
        teinter(e5, {2: INCONNUE, 5: COEF, 7: INCONNUE, 9: ORDO})
        self.dire_eq(e5, "f de 5 égale 20 fois 5, plus 30 :", echelle=1.15)
        e6 = X("= 130", 50, VERT_OK)
        e6.shift(RIGHT * (e5.egal.get_x() - e6.egal.get_x())).set_y(-1.95)
        e6.egal.set_color(WHITE)
        self.dire_eq(e6, "plus 30 : 130.", echelle=1.2)
        self.B = self.poser_point(r, 5, 130, "(5 ; 130)", DR, "le point 5 ; 130.", buff=0.08,
                                fs=30)  # 3e relecture : en haut à gauche, il touchait « 150 » ; en bas à droite, sous la droite
        self.r = r
        self.attendre_voix(marge=0.8)

    # ── 03 : la règle relie et prolonge ─────────────────────────────────────
    def ecran_droite(self):
        r = self.r
        self.ecran("03-droite")
        self.add(r, *[m for m in self.A + self.B if m is not None])
        rap = self.fonc("f(x) = 20x + 30", 3.1, 40, x0=-0.7)
        for a in rap.atomes:
            a._pas_audit = True
        self.play(FadeIn(rap), run_time=0.15)
        pA, pB = r.p(0, 30), r.p(5, 130)
        regle = Regle(pA, pB, ext=0.9)
        seg = Line(pA, pB, color=DROITE_F, stroke_width=6)
        ext = Line(pB, r.p(10.5, 240), color=DROITE_F, stroke_width=6)
        self.trait(seg, ext)
        x0, mw = -0.7, 6.1
        l1 = self.ld("On relie à la règle,", 2.4, 40, x0=x0, maxw=mw)
        self.poser_gestes(l1, "On relie les deux points à la règle,",
                          {1: lambda: [FadeIn(regle, shift=regle.nrm * 0.5)], 4: lambda: [Create(seg)]}, rt=0.3)
        l2 = self.ld("et on prolonge.", 1.8, 40, x0=x0, maxw=mw)
        self.poser_gestes(l2, "et on prolonge.",
                          {2: lambda: [regle.animate.shift((r.p(10.5, 240) - pB) * 0.55)]}, rt=0.35)
        self.play(Create(ext), run_time=0.5)
        self.play(FadeOut(regle), run_time=0.25)
        nf = T("f", 40, DROITE_F, gras=True)
        nf.next_to(r.p(10.5, 240), RIGHT, buff=0.12)
        nf._etiquette = True
        l3 = self.ld("C'est la droite de f.", 1.15, 40, DROITE_F, x0=x0, maxw=mw)
        self.poser_gestes(l3, "C'est la droite de f.",
                          {4: lambda: [Indicate(VGroup(seg, ext), color=JAUNE_TITRE, scale_factor=1.02)],
                           5: lambda: [FadeIn(nf, scale=1.4)]})
        l4 = self.ld("Un troisième point", 0.45, 40, x0=x0, maxw=mw)
        self.dit(l4, "Un troisième point")
        l5 = self.ld("sert à vérifier :", -0.1, 40, x0=x0, maxw=mw)
        self.dit(l5, "sert à vérifier :")
        e = X("f(10) = 230", 50).move_to(P(0, -0.85)).align_to(P(x0 + 0.3, 0), LEFT)
        teinter(e, {2: INCONNUE, 5: VERT_OK})
        self.dire_eq(e, "f de 10 égale 230.", echelle=1.15)
        d, et, fond, lec = self.poser_point(r, 10, 230, "(10 ; 230)", UL, "Le point 10 ; 230", couleur=VERT_OK,
                                            buff=0.16)
        ok = self.coche(VERT_OK, 0.2).next_to(d, DR, buff=0.06)
        l6 = self.ld("Bien sur la droite.", -1.65, 40, VERT_OK, x0=x0, maxw=mw)
        self.poser_gestes(l6, "est bien sur la droite.", {0: lambda: [Create(ok)]})
        l7 = self.ld("230 degrés", -2.4, 42, x0=x0, maxw=mw)
        teinter(l7, {0: VERT_OK})
        self.poser_gestes(l7, "230 degrés en 10 minutes.", {0: lambda: [Indicate(et, color=JAUNE_TITRE)]})
        l8 = self.ld("en 10 minutes.", -3.0, 42, x0=x0, maxw=mw)
        teinter(l8, {1: INCONNUE})
        self.dit(l8, "en 10 minutes.")
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.8
        r = self.rep((-2, 3), (-3, 4), 0.8, 0.72, (-4.75, -0.9), gx=(-2, -1, 1, 2, 3), gy=(-1, 1, 2, 3, 4),
                     nom_x="x", nom_y="y", grille=(1, 1))
        d = self.trait(r.droite(2, -1))
        P0, P1 = r.point(0, -1, VERT_OK, r=0.1), r.point(1, 1, VERT_OK, r=0.1)

        def avant(sc):
            sc.lignes_q([(0, "Quelle droite représente", "Quelle droite représente", {0: lambda: [FadeIn(r)]}),
                         (1, "f(x) = 2x − 1 ?", "f de x égale 2 x moins 1 ?", {})])

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_gestes(0, "Réponse C :", "Réponse C :", {}, premier=True)
            sc.ph_gestes(1, "f(0) = −1.", "f de 0, c'est moins 1.", {6: lambda: [FadeIn(P0, scale=2)]})
            sc.ph_gestes(2, "f(1) = 2 − 1 = 1.", "Et f de 1, c'est 2 moins 1 : 1.",
                         {9: lambda: [FadeIn(P1, scale=2)]})
            sc.ph_gestes(3, "Par (0 ; −1) et (1 ; 1).", "par 0 ; moins 1 et 1 ; 1.", {11: lambda: [Create(d)]})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Quelle droite représente", "f(x) = 2x − 1 ?"],
                            [X("(0 ; 2) et (1 ; 1)", 34), X("(0 ; 1) et (1 ; 3)", 34), X("(0 ; −1) et (1 ; 1)", 34)],
                            2, ["Réponse C :", "f(0) = −1.", "f(1) = 2 − 1 = 1.", "Par (0 ; −1) et (1 ; 1)."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL
        self._rep36 = False

    # ── 04 : a négatif, la droite descend ───────────────────────────────────
    def ecran_descend(self):
        self.ecran("04-descend")
        r = self.rep((-1, 4), (-3, 5), 0.62, 0.6, (-4.9, -0.75), gx=(-1, 1), gy=(-2, 2, 4),
                     nom_x="x", nom_y="y", grille=(1, 1))
        dg = self.trait(r.droite(-2, 3, xa=-0.25, couleur=DROITE_G))  # dès x = −0,25 : ne coupe pas le « 4 »
        x0, mw = -1.5, 6.9
        l1 = self.ld("Si a est négatif,", 3.1, 40, x0=x0, maxw=mw)
        teinter(l1, {1: COEF})
        self.poser_gestes(l1, "Si a est négatif,", {0: lambda: [FadeIn(r)]})
        l2 = self.ld("la droite descend.", 2.5, 40, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l2, "la droite descend.")
        g = self.fonc("g(x) = −2x + 3", 1.7, 52, x0=x0 + 0.4)
        self.dire_eq(g, "g de x égale moins 2 x plus 3.", echelle=1.15)
        e0 = X("g(0) = 3", 46).move_to(P(0, 0.85)).align_to(P(x0 + 0.4, 0), LEFT)
        teinter(e0, {2: INCONNUE, 5: ORDO})
        self.dire_eq(e0, "g de 0 égale 3.", echelle=1.15)
        e2 = X("g(2) = −4 + 3 = −1", 46).move_to(P(0, 0.05)).align_to(P(x0 + 0.4, 0), LEFT)
        teinter(e2, {2: INCONNUE, 8: ORDO})
        self.dire_eq(e2, "g de 2 égale moins 4 plus 3 : moins 1.", echelle=1.15)
        # 22/11 (2e passe) : au-dessus à droite de (0 ; 3) (à gauche, il était sur l'axe et la grille),
        # à droite de (2 ; −1), au-dessus de la droite et loin de l'axe des x
        A = self.poser_point(r, 0, 3, "(0 ; 3)", UR, "On place 0 ; 3", lecture=False, buff=0.1, decal=UP * 0.05)
        B = self.poser_point(r, 2, -1, "(2 ; −1)", RIGHT, "et 2 ; moins 1.", lecture=False, buff=0.2,
                             decal=UP * 0.2)
        h1, v1 = r.marche(0, 3, 1, -2)
        h2, v2 = r.marche(1, 1, 1, -2)
        self.trait(h1, v1, h2, v2)
        lab1 = T("−2", 32, COEF).next_to(v1, RIGHT, buff=0.08)
        lab1._etiquette = True
        l3 = self.ld("La droite descend de 2", -0.8, 40, x0=x0, maxw=mw)
        teinter(l3, {4: COEF})
        self.poser_gestes(l3, "La droite descend de 2",
                          {1: lambda: [Create(dg)], 4: lambda: [GrowArrow(h1), GrowArrow(v1), FadeIn(lab1)]}, rt=0.3)
        l4 = self.ld("à chaque pas", -1.45, 40, x0=x0, maxw=mw)
        self.poser_gestes(l4, "à chaque pas", {2: lambda: [GrowArrow(h2), GrowArrow(v2)]})
        l5 = self.ld("vers la droite.", -2.05, 40, x0=x0, maxw=mw)
        self.poser_gestes(l5, "vers la droite.", {2: lambda: [Indicate(VGroup(h1, h2), color=JAUNE_TITRE)]})
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse A) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -0.8
        r = self.rep((-1, 4), (-1, 6), 0.88, 0.72, (-5.4, -2.45), gx=(1, 2, 3, 4), gy=(1, 2, 3, 4, 5, 6),
                     nom_x="x", nom_y="y", grille=(1, 1))
        df = self.trait(r.droite(1, 2, 0, 4))  # 3e relecture : depuis l'axe, le « 2 » manquait
        bon = r.point(3, 5, VERT_OK, r=0.1)
        faux = r.point(3, 4, PIEGE, r=0.11)
        fleche = self.trait(DashedLine(r.p(3, 4), r.p(3, 5), dash_length=0.08, color=PIEGE, stroke_width=3))

        def avant(sc):
            sc.lignes_q([(0, "Quel point n'est PAS sur", "Quel point n'est PAS sur", {0: lambda: [FadeIn(r)]}),
                         (1, "la droite de f(x) = x + 2 ?", "la droite de f de x égale x plus 2 ?",
                          {10: lambda: [Create(df)]})])

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_gestes(0, "Réponse A :", "Réponse A :", {}, premier=True)
            sc.ph_gestes(1, "f(3) = 3 + 2 = 5, pas 4.", "f de 3, c'est 3 plus 2 : 5, pas 4.",
                         {9: lambda: [FadeIn(bon, scale=2)], 12: lambda: [FadeIn(faux, scale=2), Create(fleche)]})
            sc.ph_gestes(2, "(3 ; 4) est en dessous", "point 3 ; 4 est en dessous",
                         {5: lambda: [Indicate(faux, color=PIEGE, scale_factor=1.8)]})
            sc.ph_gestes(3, "de la droite.", "de la droite.", {2: lambda: [Indicate(df, color=JAUNE_TITRE)]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Quel point n'est PAS sur",
                                                            "la droite de f(x) = x + 2 ?"],
                            [X("(3 ; 4)", 34), X("(0 ; 2)", 34), X("(2 ; 4)", 34)], 0,
                            ["Réponse A :", "f(3) = 3 + 2 = 5, pas 4.", "(3 ; 4) est en dessous", "de la droite."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL
        self._rep36 = False

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def repere_defi(self):
        # 3e relecture -ql : 0,6 → 0,74 (la moitié basse restait vide) ; Yanis passe sous le texte
        return self.rep((-1, 5), (-1, 5), 0.74, 0.74, (-5.75, -1.7), gx=(1, 2, 3, 4, 5), gy=(1, 2, 3, 4, 5),
                        nom_x="x", nom_y="y", grille=(1, 1))

    def ecran_defi(self):
        self.ecran("06-defi")
        r = self.repere_defi()
        m = yanis(0.42, 34)
        m.perso.move_to(P(-0.9, -2.75))
        m.nom[1].set_opacity(0)
        m.nom[0].next_to(m.perso, RIGHT, buff=0.2)
        q = T("?", 64, JAUNE_TITRE, audit=False, gras=True).next_to(m.nom[0], RIGHT, buff=0.3)
        x0 = -1.6
        xi = x0 + 0.85
        tit = T("À toi de jouer !", 54, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), FadeIn(m.perso), FadeIn(m.nom[0]), rt=0.5)
        l1 = self.ld("Dans un même repère,", 2.0, 40, x0=x0, maxw=7.0)
        self.poser_gestes(l1, "Dans un même repère,", {3: lambda: [FadeIn(r)]})
        l2 = self.ld("trace deux droites.", 1.4, 40, JAUNE_TITRE, x0=x0, maxw=7.0)
        self.poser_gestes(l2, "trace deux droites.", {0: lambda: [FadeIn(q, scale=1.4)]})
        p1 = pastille("1", CIEL, 0.3).scale(1.15).move_to(P(x0 + 0.3, 0.5))
        e1 = self.fonc("f(x) = −x + 4", 0.5, 50, x0=xi)
        self.au("Un :", FadeIn(p1, scale=1.3), rt=0.25)
        self.dire_eq(e1, "f de x égale moins x plus 4.", echelle=1.15)
        p2 = pastille("2", CIEL, 0.3).scale(1.15).move_to(P(x0 + 0.3, -0.45))
        e2 = self.fonc("g(x) = 0,5x", -0.45, 50, x0=xi)
        self.au("Deux :", FadeIn(p2, scale=1.3), rt=0.25)
        self.dire_eq(e2, "g de x égale 0,5 x.", echelle=1.15)
        pz = T("Mets pause, et trace !", 46, ORANGE_RETENUE).move_to(P(0, -1.5)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(r=r, tit=tit, autres=VGroup(m, q, l1, l2, p1, e1, p2, e2, pz))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        r = d["r"]
        self.dire("06b-correction")
        x0 = -1.6
        xi = x0 + 0.85
        tit = T("Correction", 52, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["autres"]), rt=0.4)
        df = self.trait(r.droite(-1, 4))
        dg = self.trait(r.droite(0.5, 0, couleur=DROITE_G))
        F0, F4 = r.point(0, 4, DROITE_F, r=0.1), r.point(4, 0, DROITE_F, r=0.1)
        O, G4 = r.point(0, 0, DROITE_G, r=0.1), r.point(4, 2, DROITE_G, r=0.1)
        nf = T("f", 38, DROITE_F, gras=True).next_to(r.p(1.3, 2.7), UR, buff=0.08)
        ng = T("g", 38, DROITE_G, gras=True).next_to(r.p(5, 2.5), UP, buff=0.12)
        for n in (nf, ng):
            n._etiquette = True
        p1 = pastille("1", CIEL, 0.28).scale(1.15).move_to(P(x0 + 0.3, 2.15))
        e1 = self.ld("f(0) = 4, et f(4) = 0.", 2.15, 38, x0=xi, maxw=6.15)
        teinter(e1, {2: INCONNUE, 10: INCONNUE})
        self.au("Un :", FadeIn(p1, scale=1.3), rt=0.2)
        self.dire_eq(e1, "f de 0 égale 4, et f de 4 égale 0.", echelle=1.1)
        e2 = self.ld("Par (0 ; 4) et (4 ; 0).", 1.5, 38, x0=xi, maxw=6.15)
        self.poser_gestes(e2, "par 0 ; 4 et 4 ; 0.", {4: lambda: [FadeIn(F0, scale=2)], 10: lambda: [FadeIn(F4, scale=2)]},
                          echelle=1.1)
        e3 = self.ld("Elle descend.", 0.9, 40, DROITE_F, x0=xi, maxw=6.15)
        self.poser_gestes(e3, "Elle descend.", {1: lambda: [Create(df), FadeIn(nf)]}, rt=0.35)
        p2 = pastille("2", CIEL, 0.28).scale(1.15).move_to(P(x0 + 0.3, 0.15))
        e4 = self.ld("g est linéaire,", 0.15, 40, x0=xi, maxw=6.15)
        self.au("Deux :", FadeIn(p2, scale=1.3), rt=0.2)
        self.dit(e4, "g est linéaire,")
        e5 = self.ld("passe par l'origine.", -0.45, 40, x0=xi, maxw=6.15)
        self.poser_gestes(e5, "sa droite passe par l'origine.", {4: lambda: [FadeIn(O, scale=2)]})
        e6 = self.ld("g(4) = 2 :", -1.15, 42, x0=xi, maxw=6.15)
        teinter(e6, {2: INCONNUE})
        self.dire_eq(e6, "g de 4 égale 2 :", echelle=1.1)
        e7 = self.ld("Par (0 ; 0) et (4 ; 2).", -1.8, 38, x0=xi, maxw=6.15)
        self.poser_gestes(e7, "par 0 ; 0 et 4 ; 2.", {4: lambda: [Flash(O, color=DROITE_G, line_length=0.15)],
                                                          10: lambda: [FadeIn(G4, scale=2)]}, echelle=1.1)
        e8 = self.ld("Elle monte doucement.", -2.45, 36, DROITE_G, x0=xi, maxw=6.15)
        self.poser_gestes(e8, "Elle monte doucement.", {1: lambda: [Create(dg), FadeIn(ng)]}, rt=0.35)
        self.insister(VGroup(e3, e8), 1.05, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.45)
        r = self.rep((0, 4), (0, 4), 0.8, 0.85, (-6.3, -2.2), grille=(1, 1), zero=False)
        dm = self.trait(r.droite(0.75, 0.6))
        dd = self.trait(r.droite(-0.75, 3.6, couleur=DROITE_G))
        A, B = r.point(1, 1.35, WHITE, r=0.1), r.point(3, 2.85, WHITE, r=0.1)
        C = r.point(2, 2.1, VERT_OK, r=0.1)
        self.play(Write(tit), FadeIn(r), run_time=0.6)
        x0, mw = -1.8, 7.2
        y = [2.45, 1.85, 1.2, 0.6, 0.0, -0.6, -1.25, -1.85, -2.5, -3.1]

        def ok(e):
            k = self.coche(VERT_OK, 0.22).move_to(P(x0 - 0.42, e.get_y()))
            return [Create(k)]

        l0 = self.ld("Une fonction affine", y[0], 40, x0=x0, maxw=mw)
        self.poser_gestes(l0, "Une fonction affine", {0: lambda: ok(l0)})
        l1 = self.ld("se représente par une droite.", y[1], 36, JAUNE_TITRE, x0=x0, maxw=7.3)
        self.dit(l1, "se représente par une droite.")
        l2 = self.ld("Pour la tracer,", y[2], 40, x0=x0, maxw=mw)
        self.poser_gestes(l2, "Pour la tracer,", {0: lambda: ok(l2)})
        l3 = self.ld("on calcule deux images,", y[3], 40, x0=x0, maxw=mw)
        self.dit(l3, "on calcule deux images,")
        l4 = self.ld("on place deux points,", y[4], 40, x0=x0, maxw=mw)
        self.poser_gestes(l4, "on place deux points,", {3: lambda: [FadeIn(A, scale=2), FadeIn(B, scale=2)]})
        l5 = self.ld("et on les relie.", y[5], 40, x0=x0, maxw=mw)
        self.poser_gestes(l5, "et on les relie.", {3: lambda: [Create(dm)]}, rt=0.3)
        l6 = self.ld("Un troisième point", y[6], 40, x0=x0, maxw=mw)
        self.poser_gestes(l6, "Un troisième point", {0: lambda: ok(l6), 2: lambda: [FadeIn(C, scale=2)]})
        l7 = self.ld("sert à vérifier.", y[7], 40, VERT_OK, x0=x0, maxw=mw)
        self.dit(l7, "sert à vérifier.")
        l8 = self.ld("a positif, la droite monte ;", y[8], 38, x0=x0, maxw=mw)
        teinter(l8, {0: COEF})
        self.poser_gestes(l8, "Si a est positif, la droite monte ;",
                          {0: lambda: ok(l8), 5: lambda: [Indicate(dm, color=JAUNE_TITRE)]})
        l9 = self.ld("a négatif, elle descend.", y[9], 38, x0=x0, maxw=mw)
        teinter(l9, {0: COEF})
        self.poser_gestes(l9, "si a est négatif, elle descend.",
                          {0: lambda: ok(l9), 4: lambda: [Create(dd)]}, rt=0.3)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_boulanger()
        self.ecran_points()
        self.ecran_droite()
        self.ecran_question1()
        self.ecran_descend()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
