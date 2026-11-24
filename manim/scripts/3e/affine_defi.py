# affine_defi.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 09 : DÉFIS (niveau brevet).
# Paysage 16:9, AVEC VOIX, ceinture BLEUE.
# Métier : Jade, cheffe de chantier. Deux cuves : A contient 1 200 L et se vide de 40 L par minute
# (f(x) = −40x + 1 200) ; B est vide et se remplit de 20 L par minute (g(x) = 20x) ; même volume à 20 min (400 L).
# Écrans (clés de manim/voix/3e-affine-defi.json) :
#   00-garde : page de garde, échelle des ceintures, deux droites qui se croisent ;
#   01-chantier : Jade et ses deux cuves dessinées (A se vide, B se remplit) ;
#   02-fonctions : le repère minutes / litres, f et g, f(x) = g(x), x = 20, croisement en (20 ; 400) ;
#   03q / 03r : QUESTION 1, réponse B (30 minutes : la cuve A est vide) ;
#   04-programme : le programme de calcul en étapes (× 3, + 6, − le double) → 3x + 6 − 2x = x + 6 ;
#   05q / 05r : QUESTION 2, réponse C (5x : une fonction linéaire) ;
#   06-defi / 06b-correction : f(x) = 2x + 1, g(x) = −x + 7 → x = 2, croisement en (2 ; 5) ;
#   07-finale : « Ce que tu as appris » ; 08-abonne : fin commune (manim/fin_commune.py).
# Lettres des questions : B (03q), C (05q).
# Code couleur : x bleu ; a (coefficient directeur) orange ; b (ordonnée à l'origine) violet ; juste vert ;
# piège rouge ; droite de f bleue, droite de g orange.
# Voix : manim/voix/3e-affine-defi.json (validée) ; marques : affine_defi_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_defi.py AffineDefi3e --media_dir manim/scripts/3e/media-affine-09-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_defi.py AffineDefi3e -o eleveai-maths-3e-affine-defi --media_dir manim/scripts/3e/media-affine-09
# Sortie : manim/sorties/3e/maths/fonctions-affines/09-defi/eleveai-maths-3e-affine-defi.mp4

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
from affine_expression import COUL_A, COUL_B, Repere, teinte  # noqa: E402

PAROLE["0"] = "0"            # la voix écrit « égale 0 » en chiffres
PAROLE["L"] = "litres"
PAROLE["ax"] = "a x"

DROITE_F = BLEU_CALCUL
DROITE_G = COUL_A
EAU = "#38bdf8"
CUVE_FOND = "#1e293b"
CUVE_BORD = "#94a3b8"
CASQUE = "#facc15"
BOITE = "#0b1220"
EAU_TEXTE = "#0b1220"  # texte posé SUR l'eau bleu clair : foncé (le blanc ne se lisait pas)


# ── le contrôle des chevauchements, des tailles et de Ti-Margo (AUDIT=1) ─────
def _feuilles(m):
    """Les morceaux dessinés d'une figure (sans la grille d'un repère, ni les textes)."""
    grilles = set()
    for f in m.get_family():
        if hasattr(f, "grille") and isinstance(getattr(f, "grille"), VMobject):
            grilles |= {id(x) for x in f.grille.get_family()}
    return [f for f in m.get_family() if len(f.points) and id(f) not in grilles and not isinstance(f, Text)
            and not any(isinstance(x, Text) for x in [f])]


def _boite(m, marge=0.0):
    return (m.get_left()[0] - marge, m.get_bottom()[1] - marge, m.get_right()[0] + marge, m.get_top()[1] + marge)


def _touche(t, f, marge=0.03):
    x0, y0, x1, y1 = _boite(t, marge)
    if isinstance(f, Line):
        a, b = f.get_start(), f.get_end()
        for k in np.linspace(0, 1, 80):
            p = a + (b - a) * k
            if x0 <= p[0] <= x1 and y0 <= p[1] <= y1:
                return True
        return False
    fx0, fy0, fx1, fy1 = _boite(f)
    return not (fx1 < x0 or fx0 > x1 or fy1 < y0 or fy0 > y1)


def verifier(scene, figs, tag, exclure=()):
    """Aucun texte ne mord sur une figure de `figs` ; aucun texte sous 32 pt ; rien sur Ti-Margo."""
    if os.environ.get("AUDIT") != "1":
        return
    ex = set()
    for m in exclure:
        ex |= {id(f) for f in m.get_family()}
    fig_ids = set()
    for g in figs:
        fig_ids |= {id(f) for f in g.get_family()}
    textes = []
    for m in scene.mobjects:
        for f in m.get_family():
            if isinstance(f, Text) and id(f) not in ex and f.get_fill_opacity() > 0.05:
                textes.append(f)
    vus = set()
    for t in textes:
        if id(t) in vus:
            continue
        vus.add(id(t))
        if t.font_size < 31.5:
            print(f"PETIT {tag} « {t.original_text} » {t.font_size:.0f} pt", flush=True)
        if id(t) in fig_ids:
            continue
        texte_ids = {id(x) for x in t.get_family()}
        for g in figs:
            for f in _feuilles(g):
                if id(f) in texte_ids:
                    continue
                if _touche(t, f):
                    print(f"CHEVAUCHE {tag} « {t.original_text} » / {type(f).__name__} "
                          f"x[{f.get_left()[0]:.2f}, {f.get_right()[0]:.2f}] y[{f.get_bottom()[1]:.2f}, "
                          f"{f.get_top()[1]:.2f}]", flush=True)
                    break
    margo = [m for m in scene.mobjects if type(m).__name__ == "MascotteMargouillat"]
    for mg in margo:
        mx0, my0, mx1, my1 = _boite(mg)
        for m in scene.mobjects:
            if m is mg:
                continue
            for f in m.get_family():
                if f.submobjects or not len(f.points) or f.get_fill_opacity() < 0.05 and f.get_stroke_opacity() < 0.05:
                    continue
                x0, y0, x1, y1 = _boite(f)
                if not (x1 < mx0 or x0 > mx1 or y1 < my0 or y0 > my1):
                    nom = getattr(m, "original_text", None) or getattr(m, "s", None) or type(m).__name__
                    print(f"MARGO {tag} « {nom} » x[{x0:.2f}, {x1:.2f}] y[{y0:.2f}, {y1:.2f}]", flush=True)
                    break


# ── les dessins ─────────────────────────────────────────────────────────────
class Cuve(VGroup):
    """Une cuve de chantier : .cuve, .eau, .cercles ; .eau_a(niveau) donne l'eau à un autre niveau."""

    def __init__(self, w=1.7, h=2.3, niveau=1.0, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.c, self.w, self.h = np.array(centre, dtype=float), w, h
        self.cuve = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color=CUVE_FOND, fill_opacity=1,
                                     stroke_color=CUVE_BORD, stroke_width=4).move_to(self.c)
        self.cercles = VGroup(*[Line(self.c + P(-w / 2, y), self.c + P(w / 2, y)) for y in (-h * 0.25, h * 0.25)])
        self.cercles.set_stroke(CUVE_BORD, 2.5)
        self.eau = self.eau_a(niveau)
        self.add(self.cuve, self.eau, self.cercles)

    def eau_a(self, niveau):
        he = max(0.001, (self.h - 0.12) * niveau)
        r = Rectangle(width=self.w - 0.12, height=he, fill_color=EAU, fill_opacity=0.85 if niveau > 0 else 0,
                      stroke_width=0)
        return r.move_to(self.c + DOWN * (self.h / 2 - 0.06 - he / 2)).set_z_index(1)

    def niveau_y(self, niveau):
        return self.c[1] - self.h / 2 + 0.06 + (self.h - 0.12) * niveau


def robinet_bas(cuve, cote=RIGHT):
    """Un robinet en bas de la cuve (côté `cote`) et sa goutte."""
    s = 1 if cote[0] > 0 else -1
    bas = cuve.c + P(s * cuve.w / 2, -cuve.h / 2 + 0.3)
    tuyau = Rectangle(width=0.3, height=0.13, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(
        bas + RIGHT * s * 0.15)
    bec = Rectangle(width=0.12, height=0.2, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(
        bas + P(s * 0.25, -0.12))
    goutte = Dot(bas + P(s * 0.25, -0.33), radius=0.07, color=EAU)
    return VGroup(tuyau, bec), goutte


def robinet_haut(cuve):
    """Un tuyau qui arrive par le haut de la cuve, et sa goutte qui tombe dedans."""
    x = cuve.c[0] + cuve.w * 0.18
    haut = cuve.c[1] + cuve.h / 2
    v = Rectangle(width=0.13, height=0.42, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(
        P(x, haut + 0.36))
    hz = Rectangle(width=0.9, height=0.13, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(
        P(x + 0.39, haut + 0.51))
    goutte = Dot(P(x, haut - 0.05), radius=0.07, color=EAU).set_z_index(2)
    return VGroup(v, hz), goutte


def jade(s=0.62, fs=32, lignes=("Jade", "cheffe de chantier")):
    """Jade, cheffe de chantier : casque jaune, gilet orange."""
    m = Metier(list(lignes), fs=fs, peau="#8d5524", tenue="#1d4ed8", cheveux="#111827", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.08, aligned_edge=LEFT)
    p = m.perso
    gilet = Polygon(P(-0.5, -0.5), P(0.5, -0.5), P(0.62, -1.3), P(-0.62, -1.3), fill_color=ORANGE_RETENUE,
                    fill_opacity=0.95, stroke_width=0).scale(s).move_to(p.corps.get_center() + UP * 0.25 * s)
    bande = Rectangle(width=1.0 * s, height=0.09 * s, fill_color="#e5e7eb", fill_opacity=1,
                      stroke_width=0).move_to(gilet.get_center())
    c = p.tete.get_center()
    r = p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, fill_color=CASQUE,
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62)
    bord = RoundedRectangle(width=r * 2.7, height=r * 0.22, corner_radius=r * 0.08, fill_color=CASQUE,
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.15)
    p.add(gilet, bande, casque, bord)
    return m


def etape(s, w=3.9, h=0.72, fs=36, couleur=CIEL):
    """Une étape du programme de calcul : la boîte et son texte (posé au mot)."""
    t = X(s, fs)
    b = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color=BOITE, fill_opacity=1,
                         stroke_color=couleur, stroke_width=3)
    t.move_to(b)
    return b, t


def fleche_bas(b1, b2, couleur=CIEL):
    return Arrow(b1.get_bottom(), b2.get_top(), buff=0.05, stroke_width=4, tip_length=0.14,
                 max_tip_length_to_length_ratio=0.5, color=couleur)


def rond(signe, couleur=CIEL, r=0.3):
    """La pastille « 1 » / « 2 » du défi, chiffre à 36 pt."""
    c = Circle(radius=r, fill_color="#0b1220", fill_opacity=1, stroke_color=couleur, stroke_width=4)
    return VGroup(c, T(signe, 36, couleur, audit=False, gras=True).move_to(c))


def lecture(R, x, y, couleur="#e2e8f0"):
    lv = DashedLine(R.p(x, 0), R.p(x, y), dash_length=0.1, color=couleur, stroke_width=3).set_z_index(2)
    lh = DashedLine(R.p(x, y), R.p(0, y), dash_length=0.1, color=couleur, stroke_width=3).set_z_index(2)
    return lv, lh


class AffineDefi3e(IdentFactoriser3e):
    nom_voix = "3e-affine-defi"
    fichier_marques = "affine_defi_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "bleue"

    @staticmethod
    def _fs(m):
        """La taille effective (font_size × échelle) du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql (22/11) : énoncé à 40 pt en lignes courtes, cartes à 42 pt raccourcies à leur
        contenu, « Mets pause, » / « et choisis ! » (35 pt, deux lignes) À DROITE des cartes, à mi-hauteur,
        loin de Ti-Margo (modèle : _disposer_q d'affine_coeff_directeur.py / affine_calcul_image.py)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for ligne in q:
            ligne.scale(40 / self._fs(ligne))
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if q.width > 6.3 - self.XL:
            print(f"RETRECI énoncé × {(6.3 - self.XL) / q.width:.2f}", flush=True)
            q.scale_to_fit_width(6.3 - self.XL)
        q.next_to(tete, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(42 / self._fs(dedans[1]), about_point=dedans.get_left())
            cadre.stretch_to_fit_height(max(0.72, dedans.height + 0.24))
        # la coche se pose à 0,33 du bord droit : le nombre en reste à plus de 0,95 (sinon question_pause le rétrécit)
        larg = max(2.6, max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 1.1)
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
            c[1].set_y(c[0].get_y())
        cartes.arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        cartes.next_to(q, DOWN, buff=0.4).align_to(P(self.XL, 0), LEFT)
        neuf = VGroup(T("Mets pause,", 35, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 35, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, RIGHT, buff=0.35).set_y(cartes.get_y())
        ph.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        if os.environ.get("AUDIT") == "1":
            m = self._margo_q
            print(f"MISE-EN-PAGE {self._cle_voix} q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} "
                  f"({self._fs(q[0]):.0f} pt, droite {q.get_right()[0]:.2f}) cartes {cartes.get_top()[1]:.2f}/"
                  f"{cartes.get_bottom()[1]:.2f} larg {larg:.2f} ({self._fs(cartes[0][1][1]):.0f} pt) pause "
                  f"{neuf.get_left()[0]:.2f}→{neuf.get_right()[0]:.2f}, bas {neuf.get_bottom()[1]:.2f} "
                  f"({self._fs(neuf):.0f} pt) ; Ti-Margo gauche {m.get_left()[0]:.2f} haut {m.get_top()[1]:.2f}",
                  flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def monter_reponse(self, bonne):
        """La question et les mauvaises cartes s'effacent, la bonne carte monte à la place de l'énoncé, et la
        réponse (lignes courtes) se pose dessous à 36 pt EFFECTIFS : les lignes repères sont refaites en X à 36 pt
        (ph_gestes y cale ses X par la largeur)."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]
        q = self.q_q
        haut_cible = q.get_top()[1] if len(q.submobjects) else cartes[0].get_top()[1]
        d = UP * (haut_cible - b.get_top()[1])
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne]
        if len(q.submobjects):
            anims.append(FadeOut(q))
        anims.append(b.animate.shift(d))
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.25)
        ph.submobjects = [X(l.original_text, 36, audit=False) for l in ph.submobjects]
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        bas = b.get_bottom()[1] - 0.3
        k = min(1.0, (6.2 - self.XL) / ph.width, (bas + 3.3) / ph.height)
        if k < 1.0:
            print(f"RETRECI réponse × {k:.2f}", flush=True)
        ph.scale(k).next_to(P(0, bas), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        m = self._margo_q
        for ligne in ph:  # rien ne va sur Ti-Margo (coin bas droit)
            if ligne.get_bottom()[1] < m.get_top()[1] + 0.1 and ligne.get_right()[0] > m.get_left()[0] - 0.1:
                print(f"BORD MARGO réponse « {ligne.s} »", flush=True)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} {self._fs(ph[0]):.0f} pt, haut {ph.get_top()[1]:.2f}, "
                  f"bas {ph.get_bottom()[1]:.2f}, droite {ph.get_right()[0]:.2f}", flush=True)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les fonctions affines", self.identite, self.ceinture, y_ech=-2.65)
        ident.scale(32 / 28)
        ech[1].scale(32 / 24)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Défis", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        R = Repere(P(-5.7, -1.55), 0.55, 0.55, (0, 5), (0, 5), xticks=range(1, 6), yticks=range(1, 6),
                   nom_x=None, nom_y=None, zero=False)
        f = R.droite(0.8, 0.6, 0, 5, DROITE_F)
        g = R.droite(-0.7, 4.6, 0, 5, DROITE_G)
        xc = 4.0 / 1.5
        pc = R.point(xc, 0.8 * xc + 0.6, JAUNE_TITRE, r=0.12)
        self.play(FadeIn(R), run_time=0.3)
        l1 = self.ld("Prêt pour le niveau", 0.75, 52, x0=-1.0, maxw=7.4)
        self.poser_gestes(l1, "Prêt pour le niveau", {0: lambda: [Create(f)], 3: lambda: [Create(g)]})
        l2 = self.ld("du brevet ?", -0.15, 56, JAUNE_TITRE, x0=-1.0, maxw=7.4)
        self.poser_gestes(l2, "du brevet ?", {1: lambda: [FadeIn(pc, scale=2.5)]})
        self.play(Flash(pc, color=JAUNE_TITRE, line_length=0.2), run_time=0.4)
        self.insister(l2, 1.06, 0.2)
        verifier(self, [R, f, g, pc, ech], "00-garde")
        self.attendre_voix(marge=0.8)

    # ── 01 : Jade et les deux cuves ─────────────────────────────────────────
    def ecran_chantier(self):
        self.ecran("01-chantier")
        A = Cuve(1.8, 2.4, 1.0, P(-5.3, 1.2))
        B = Cuve(1.8, 2.4, 0.0, P(-2.6, 1.2))
        robA, gA = robinet_bas(A, RIGHT)
        robB, gB = robinet_haut(B)
        nA = T("Cuve A", 34, WHITE).next_to(A.cuve, DOWN, buff=0.15)
        nB = T("Cuve B", 34, WHITE).next_to(B.cuve, DOWN, buff=0.15)
        # 22/11 : blanc sur l'eau bleu clair, illisible : chiffres foncés, en gras
        # en atomes (« 1 », « 200 », « L ») : un seul Text « 1 200 » était lu « 1200 », absent de la voix
        l1200 = X("1 200 L", 38, EAU_TEXTE).move_to(A.eau).set_z_index(3)  # 3e relecture : sous l'eau (z 1), il ne se voyait pas
        if l1200.width > A.eau.width - 0.16:  # 4e relecture -ql : plus large que la cuve, le « 1 » et le « L » sortaient
            l1200.scale_to_fit_width(A.eau.width - 0.16).move_to(A.eau)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 1 200 L (01) largeur {l1200.width:.2f} / eau {A.eau.width:.2f}", flush=True)
        tA = T("− 40 L/min", 32, DROITE_G).next_to(nA, DOWN, buff=0.12)
        tB = T("+ 20 L/min", 32, VERT_OK).next_to(nB, DOWN, buff=0.12)
        # 22/11 : Jade et son nom, trop petits : agrandis (perso × 1,6, nom à 36 pt)
        m = jade(0.88, 36)
        m.perso.move_to(P(-5.95, -2.4))
        m.nom.next_to(m.perso, RIGHT, buff=0.2).align_to(m.perso, DOWN)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 01-chantier Jade {m.perso.get_top()[1]:.2f}/{m.perso.get_bottom()[1]:.2f} "
                  f"nom droite {m.nom.get_right()[0]:.2f} ; étiquettes bas {tA.get_bottom()[1]:.2f}", flush=True)
        self.au("Jade", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("cheffe", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        x0, mw = -0.25, 6.6
        l1 = self.ld("Sur son chantier,", 3.05, 44, x0=x0, maxw=mw)
        self.dit(l1, "Sur son chantier,")
        l2 = self.ld("deux cuves.", 2.35, 44, x0=x0, maxw=mw)
        self.poser_gestes(l2, "deux cuves.", {1: lambda: [FadeIn(VGroup(A.cuve, A.cercles), shift=UP * 0.2),
                                                          FadeIn(VGroup(B.cuve, B.cercles), shift=UP * 0.2)]})
        l3 = self.ld("A : 1 200 litres,", 1.6, 42, x0=x0, maxw=mw)
        self.poser_gestes(l3, "La cuve A contient 1 200 litres,",
                          {0: lambda: [FadeIn(nA)], 3: lambda: [GrowFromEdge(A.eau, DOWN), FadeIn(l1200)]})  # au mot « 200 »
        l4 = self.ld("− 40 litres par minute ;", 0.9, 40, x0=x0, maxw=6.8)
        teinte(l4, orange=[0, 1])
        self.poser_gestes(l4, "se vide de 40 litres par minute.",
                          {1: lambda: [FadeIn(robA), FadeIn(gA, shift=DOWN * 0.3), FadeIn(tA)]})
        l5 = self.ld("B : vide,", 0.05, 42, x0=x0, maxw=mw)
        self.poser_gestes(l5, "La cuve B est vide,", {0: lambda: [FadeIn(nB)],
                                                       2: lambda: [Indicate(B.cuve, color=JAUNE_TITRE,
                                                                            scale_factor=1.04)]})
        self.add(B.eau)
        l6 = self.ld("+ 20 litres par minute.", -0.65, 40, x0=x0, maxw=6.8)
        l6.atomes[0].set_color(VERT_OK)
        l6.atomes[1].set_color(VERT_OK)
        self.poser_gestes(l6, "se remplit de 20 litres par minute.",
                          {1: lambda: [FadeIn(robB), FadeIn(gB, shift=DOWN * 0.3), FadeIn(tB)]})
        l7 = self.ld("Quand auront-elles", -1.5, 44, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l7, "quand les deux cuves auront-elles")
        l8 = self.ld("le même volume ?", -2.2, 44, JAUNE_TITRE, x0=x0, maxw=mw)
        niv = 1 / 3
        ya = A.niveau_y(niv)
        trait = DashedLine(P(A.cuve.get_left()[0] - 0.1, ya), P(B.cuve.get_right()[0] + 0.1, ya), dash_length=0.12,
                           color=JAUNE_TITRE, stroke_width=3).set_z_index(3)
        q = T("?", 56, JAUNE_TITRE, audit=False, gras=True).move_to(P(-3.95, ya + 0.75))
        self.poser_gestes(l8, "le même volume ?",
                          {1: lambda: [FadeOut(l1200), Transform(A.eau, A.eau_a(niv)), Transform(B.eau, B.eau_a(niv))]},
                          rt=0.18)
        self.play(Create(trait), FadeIn(q, scale=1.5), run_time=0.4)
        self.insister(VGroup(l7, l8), 1.05, 0.2)
        verifier(self, [A, B, robA, robB, gA, gB, m.perso, trait], "01-chantier", exclure=[l1200])
        self.attendre_voix(marge=0.8)

    # ── 02 : f et g, puis l'équation ────────────────────────────────────────
    def ecran_fonctions(self):
        self.ecran("02-fonctions")
        R = Repere(P(-5.25, -2.4), 0.135, 0.004, (0, 32), (0, 1200), xlab=(10, 20, 30), ylab=(),
                   xticks=(5, 10, 15, 20, 25, 30), yticks=(200, 400, 600, 800, 1000, 1200),
                   nom_x="minutes", nom_y="litres", fs=32)
        for v, s in ((400, "400"), (800, "800"), (1200, "1 200")):
            R.labs.add(T(s, 32, WHITE, audit=False).next_to(R.p(0, v), LEFT, buff=0.12))
        R.nx.next_to(R.ax.get_end(), RIGHT, buff=0.12)
        f = R.droite(-40, 1200, 0, 30, DROITE_F)
        g = R.droite(20, 0, 0, 30, DROITE_G)
        nf = T("f", 40, DROITE_F, audit=False).move_to(R.p(6.5, 1150))
        ng = T("g", 40, DROITE_G, audit=False).move_to(R.p(28, 450))
        pc = R.point(20, 400, JAUNE_TITRE, r=0.12)
        qc = T("?", 48, JAUNE_TITRE, audit=False, gras=True).move_to(R.p(20, 400) + P(0.3, 0.75))
        lv, lh = lecture(R, 20, 400)
        lab = T("(20 ; 400)", 32, JAUNE_TITRE, audit=False)
        lab.move_to(R.p(20, 400) + P(0.46, 1.32))
        lab._bloc = True  # un seul bloc : sinon « (20 ; » et « 400) » attendraient chacun leur mot
        self.add(R)
        x0, mw = 0.35, 6.2
        l0 = self.ld("Après x minutes :", 3.1, 40, CIEL, x0=x0, maxw=mw)
        self.dit(l0, "Après x minutes,")
        e1 = X("f(x) = −40x + 1 200", 42).move_to(P(0, 2.4)).align_to(P(x0, 0), LEFT)
        teinte(e1, orange=[5, 6], violet=[9, 10])
        self.poser_gestes(e1, "f de x égale moins 40 x plus 1 200.", {10: lambda: [Create(f), FadeIn(nf)]},
                          echelle=1.15)
        e2 = X("g(x) = 20x", 42).move_to(P(0, 1.7)).align_to(P(x0, 0), LEFT)
        teinte(e2, orange=[5])
        self.poser_gestes(e2, "g de x égale 20 x.", {5: lambda: [Create(g), FadeIn(ng)]}, echelle=1.15)
        e3 = X("On cherche f(x) = g(x)", 40).move_to(P(0, 1.0)).align_to(P(x0, 0), LEFT)
        self.poser_gestes(e3, "On cherche x tel que f de x égale g de x.",
                          {10: lambda: [FadeIn(pc, scale=2.5), FadeIn(qc)]}, echelle=1.1)
        e4 = X("−40x + 1 200 = 20x", 42).move_to(P(0, 0.3)).align_to(P(x0, 0), LEFT)
        self.dire_eq(e4, "Moins 40 x plus 1 200 égale 20 x.", echelle=1.15)
        e5 = X("+ 40x : 1 200 = 60x", 42).move_to(P(0, -0.4)).align_to(P(x0, 0), LEFT)
        e5.atomes[0].set_color(COUL_A)
        e5.atomes[1].set_color(COUL_A)
        self.dire_eq(e5, "On ajoute 40 x : 1 200 égale 60 x.", echelle=1.15)
        e6 = X("1 200 ÷ 60 : x = 20", 42).move_to(P(0, -1.1)).align_to(P(x0, 0), LEFT)
        self.poser_gestes(e6, "1 200 divisé par 60 : x vaut 20.", {7: lambda: [FadeOut(qc), Create(lv)]},
                          echelle=1.15)
        cad = self.cadre_ok(VGroup(*e6.atomes[5:8]), 0.1)
        self.play(Create(cad), run_time=0.25)
        e7 = X("20 minutes : 400 L", 42, VERT_OK).move_to(P(0, -1.85)).align_to(P(x0, 0), LEFT)
        self.poser_gestes(e7, "20 minutes, chaque cuve contient 400 litres.",
                          {3: lambda: [Create(lh), FadeIn(lab)]}, echelle=1.1)
        self.play(Flash(pc, color=JAUNE_TITRE, line_length=0.2), run_time=0.4)
        verifier(self, [R, f, g, pc, lv, lh], "02-fonctions")
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse B) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self._margo_q = self.add_mascotte()
        # 22/11 : la cuve à gauche, la question (lignes courtes, 40 pt) et les cartes (42 pt) à sa droite
        self.XL = -3.3
        A = Cuve(2.0, 3.0, 1.0, P(-5.25, 0.35))
        rob, gt = robinet_bas(A, RIGHT)
        l1200 = T("1 200 L", 40, EAU_TEXTE, audit=False, gras=True).move_to(A.eau).set_z_index(3)
        if l1200.width > A.eau.width - 0.16:  # 4e relecture -ql : il débordait de la cuve
            l1200.scale_to_fit_width(A.eau.width - 0.16).move_to(A.eau)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 1 200 L (03q) largeur {l1200.width:.2f} / eau {A.eau.width:.2f}", flush=True)
        nA = T("Cuve A", 36, WHITE, audit=False).next_to(A.cuve, DOWN, buff=0.2)
        t40 = T("− 40 L/min", 34, DROITE_G, audit=False).next_to(nA, DOWN, buff=0.15)
        self.add(A, rob, gt, l1200, nA, t40)
        # au milieu de la cuve vide (fond sombre), entre ses deux cerclages
        vide = T("vide !", 44, VERT_OK, audit=False, gras=True).move_to(A.cuve)

        def apres(sc):
            sc.monter_reponse(1)
            sc.ph_gestes(0, "Réponse B : f(x) = 0.", "Réponse B : la cuve est vide quand f de x égale 0.",
                         {}, premier=True)
            sc.ph_gestes(1, "−40x + 1 200 = 0", "Moins 40 x plus 1 200 égale 0 :", {})
            sc.ph_gestes(2, "40x = 1 200", "40 x égale 1 200.", {})
            sc.ph_gestes(3, "1 200 ÷ 40 = 30", "1 200 divisé par 40 : 30",
                         {5: lambda: [FadeOut(l1200), Transform(A.eau, A.eau_a(0)), FadeIn(vide)]})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse",
                            ["Au bout de combien", "de minutes la cuve A", "sera-t-elle vide ?"],
                            [X("40 minutes", 42), X("30 minutes", 42), X("1 200 minutes", 42)], 1,
                            ["Réponse B : f(x) = 0.", "−40x + 1 200 = 0", "40x = 1 200", "1 200 ÷ 40 = 30"],
                            autres_r=apres)
        verifier(self, [A, rob, gt], "03r-reponse", exclure=[l1200, vide])
        self.XL = type(self).XL

    # ── 04 : le programme de calcul ─────────────────────────────────────────
    def ecran_programme(self):
        self.ecran("04-programme")
        l0 = self.ld("Défi suivant : un programme de calcul.", 3.15, 40, JAUNE_TITRE, x0=-6.4, maxw=12.0)
        self.dit(l0, "Défi suivant : un programme de calcul.")
        ys = (1.95, 0.6, -0.75, -2.1)
        textes = ("Choisis un nombre x", "Multiplie par 3", "Ajoute 6", "Enlève le double")
        phrases = ("Choisis un nombre x.", "Multiplie par 3.", "Ajoute 6.", "enlève le double")
        boites = []
        # 22/11 : textes des cases à 38 pt (ils sortaient à ~26), cases plus larges : le « x » reste dedans
        for k, (s, ph, y) in enumerate(zip(textes, phrases, ys)):
            b, t = etape(s, 5.75, 0.86, 38)
            b.move_to(P(-3.75, y))
            t.move_to(b)
            boites.append((b, t))
            anims = [FadeIn(b)]
            if k:
                anims.append(GrowArrow(fleche_bas(boites[k - 1][0], b)))
            self.dit(t, ph, avec=anims)
        if os.environ.get("AUDIT") == "1":
            for b, t in boites:
                if t.get_left()[0] < b.get_left()[0] + 0.15 or t.get_right()[0] > b.get_right()[0] - 0.15:
                    print(f"DEBORDE 04-programme « {t.s} »", flush=True)
            print(f"MISE-EN-PAGE 04-programme cases {self._fs(boites[0][1]):.0f} pt, "
                  f"droite {boites[0][0].get_right()[0]:.2f}", flush=True)
        x0, mw = -0.45, 6.7
        l1 = self.ld("On obtient :", 1.95, 40, CIEL, x0=x0, maxw=mw)
        self.dit(l1, "On obtient")
        e1 = X("3x + 6 − 2x", 54).move_to(P(0, 1.15)).align_to(P(x0 + 0.3, 0), LEFT)
        ind = lambda k: [Indicate(boites[k][0], color=JAUNE_TITRE, scale_factor=1.04)]  # noqa: E731
        self.poser_gestes(e1, "3 x plus 6, moins 2 x.", {0: lambda: ind(1), 3: lambda: ind(2), 5: lambda: ind(3)},
                          echelle=1.15)
        e2 = X("On réduit : x + 6", 50).move_to(P(0, 0.05)).align_to(P(x0, 0), LEFT)
        teinte(e2, violet=[5])
        # 3e relecture -ql : le cadre touchait le « : » → « x + 6 » s'écarte, le cadre est plus serré
        VGroup(*e2.atomes[3:6]).shift(RIGHT * 0.15)
        self.dire_eq(e2, "On réduit : x plus 6.", echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(*e2.atomes[3:6]), 0.08)), run_time=0.3)
        l3 = self.ld("Fonction affine :", -1.0, 44, CIEL, x0=x0, maxw=mw)
        self.dit(l3, "C'est une fonction affine :")
        e3 = X("a = 1, b = 6", 54).move_to(P(0, -1.85)).align_to(P(x0 + 0.3, 0), LEFT)
        teinte(e3, orange=[0, 2], violet=[4, 6])
        self.dire_eq(e3, "a vaut 1, b vaut 6.", echelle=1.15)
        self.insister(e3, 1.06, 0.2)
        verifier(self, [VGroup(*[b for b, _ in boites])], "04-programme", exclure=[t for _, t in boites])
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse C) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self._margo_q = self.add_mascotte()
        self.XL = -1.05
        ys = (1.95, 0.7, -0.55, -1.8)
        textes = ("Choisis un nombre", "Ajoute 2", "Multiplie par 5", "Enlève 10")
        phrases = ("choisis un nombre,", "ajoute 2,", "multiplie par 5,", "enlève 10.")
        boites = []
        for s, y in zip(textes, ys):  # 22/11 : cases à 38 pt, plus larges
            b, t = etape(s, 5.3, 0.86, 38)
            b.move_to(P(-4.0, y))
            t.move_to(b)
            boites.append((b, t))

        def avant(sc):
            for k, ((b, t), ph) in enumerate(zip(boites, phrases)):
                anims = [FadeIn(b)]
                if k:
                    anims.append(GrowArrow(fleche_bas(boites[k - 1][0], b)))
                sc.dit(t, ph, avec=anims)

        ind = lambda k: [Indicate(boites[k][0], color=JAUNE_TITRE, scale_factor=1.04)]  # noqa: E731

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph_gestes(0, "Réponse C : 5(x + 2)", "Réponse C : 5 fois, parenthèse, x plus 2,",
                         {3: lambda: ind(2), 7: lambda: ind(1)}, premier=True)
            sc.ph_gestes(1, "= 5x + 10", "c'est 5 x plus 10.", {})
            sc.ph_gestes(2, "− 10 : il reste 5x.", "Moins 10 : il reste 5 x.", {1: lambda: ind(3)})
            sc.ph_gestes(3, "Fonction linéaire !", "Une fonction linéaire !", {})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Quelle fonction", "obtient-on ?"],
                            [X("5x + 2", 42), X("5x − 10", 42), X("5x", 42)], 2,
                            ["Réponse C : 5(x + 2)", "= 5x + 10", "− 10 : il reste 5x.", "Fonction linéaire !"],
                            avant_q=avant, autres_r=apres)
        verifier(self, [VGroup(*[b for b, _ in boites])], "05r-reponse", exclure=[t for _, t in boites])
        self.XL = type(self).XL

    # ── 06 : le défi final ──────────────────────────────────────────────────
    def repere_defi(self, labels=False):
        R = Repere(P(-6.2, -2.1), 0.6, 0.45, (0, 6), (0, 8), xlab=range(1, 7) if labels else (),
                   ylab=(2, 4, 6, 8) if labels else (), xticks=range(1, 7), yticks=range(1, 9),
                   nom_x="x", nom_y="y", zero=labels, fs=32)
        return R

    def ecran_defi(self):
        self.ecran("06-defi")
        R = self.repere_defi()
        f = R.droite(2, 1, 0, 3.5, DROITE_F)
        g = R.droite(-1, 7, 0, 6, DROITE_G)
        nf = T("f", 40, DROITE_F, audit=False).move_to(R.p(3.5, 8) + P(0.35, -0.1))
        ng = T("g", 40, DROITE_G, audit=False).move_to(R.p(5.6, 1.4) + P(0, 0.45))
        q = T("?", 52, JAUNE_TITRE, audit=False, gras=True).move_to(R.p(2, 5) + P(-0.25, 0.8))
        self.play(FadeIn(R), run_time=0.3)
        x0 = -1.75
        tit = T("Défi final !", 56, JAUNE_TITRE).move_to(P(0, 3.05)).align_to(P(x0, 0), LEFT)
        self.au("Défi final", Write(tit), rt=0.5)
        e1 = X("f(x) = 2x + 1", 42).move_to(P(0, 2.05)).align_to(P(x0 - 0.25, 0), LEFT)
        teinte(e1, orange=[5], violet=[8])
        self.poser_gestes(e1, "f de x égale 2 x plus 1,", {8: lambda: [Create(f), FadeIn(nf)]}, echelle=1.15)
        e2 = self.a_cote(X("g(x) = −x + 7", 42), e1, buff=0.45, i_e=0, i_ref=0)
        teinte(e2, orange=[5], violet=[8])
        self.poser_gestes(e2, "g de x égale moins x plus 7.", {8: lambda: [Create(g), FadeIn(ng)]}, echelle=1.15)
        xi = x0 + 0.85
        p1 = rond("1").move_to(P(x0 + 0.3, 1.1))
        self.au("Un :", FadeIn(p1, scale=1.3), rt=0.25)
        q1 = self.ld("Pour quelle valeur de x", 1.1, 40, x0=xi, maxw=7.4)
        self.dit(q1, "pour quelle valeur de x")
        q1b = X("a-t-on f(x) = g(x) ?", 40).move_to(P(0, 0.4)).align_to(P(xi, 0), LEFT)
        self.dire_eq(q1b, "a-t-on f de x égale g de x ?", echelle=1.1)
        p2 = rond("2").move_to(P(x0 + 0.3, -0.6))
        self.au("Deux :", FadeIn(p2, scale=1.3), rt=0.25)
        q2 = self.ld("Les coordonnées du point", -0.6, 38, x0=xi, maxw=7.4)
        self.dit(q2, "les coordonnées du point")
        q2b = self.ld("où les droites se croisent ?", -1.3, 36, x0=xi, maxw=7.4)
        self.poser_gestes(q2b, "où les deux droites se croisent ?", {4: lambda: [FadeIn(q, scale=1.4)]})
        # 22/11 : deux lignes à 36 pt (sur une ligne, elle filait jusqu'à Ti-Margo)
        pz = VGroup(T("Mets pause,", 36, ORANGE_RETENUE), T("et cherche !", 36, ORANGE_RETENUE))
        pz.arrange(DOWN, aligned_edge=LEFT, buff=0.1).move_to(P(0, -2.25)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE 06-defi pause bas {pz.get_bottom()[1]:.2f} droite {pz.get_right()[0]:.2f}", flush=True)
        verifier(self, [R, f, g], "06-defi")
        self.defi = dict(R=R, f=f, g=g, nf=nf, ng=ng, q=q, tit=tit, e1=e1, e2=e2, p1=p1, p2=p2,
                         autres=VGroup(q1, q1b, q2, q2b, pz))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        x0 = -2.0
        R2 = self.repere_defi(labels=True)
        tit = T("Correction", 54, JAUNE_TITRE).move_to(P(0, 3.05)).align_to(P(x0 + 0.25, 0), LEFT)
        p1, p2 = d["p1"], d["p2"]
        ys = (1.45, 0.8, 0.15, -0.6, -1.25, -1.85)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["autres"]), FadeOut(d["q"]),
                FadeIn(R2.labs), p1.animate.move_to(P(x0 + 0.3, ys[0])), p2.animate.move_to(P(x0 + 0.3, ys[3])),
                rt=0.45)
        R = d["R"]
        xi = x0 + 0.85
        self.au("Un :", Indicate(p1, color=JAUNE_TITRE, scale_factor=1.3), rt=0.3)
        r1 = X("2x + 1 = −x + 7", 42).move_to(P(0, ys[0])).align_to(P(xi, 0), LEFT)
        self.dire_eq(r1, "2 x plus 1 égale moins x plus 7.", echelle=1.1)
        r2 = X("+ x : 3x + 1 = 7", 40).move_to(P(0, ys[1])).align_to(P(xi, 0), LEFT)
        r2.atomes[0].set_color(COUL_A)
        r2.atomes[1].set_color(COUL_A)
        self.au("On ajoute", FadeIn(r2.atomes[0], scale=1.1), rt=0.15)
        self.dire_eq(r2, "On ajoute x : 3 x plus 1 égale 7.", echelle=1.1, sauf=[r2.atomes[0]])
        r3 = X("− 1 : 3x = 6, x = 2", 40).move_to(P(0, ys[2])).align_to(P(xi, 0), LEFT)
        r3.atomes[0].set_color(COUL_A)
        r3.atomes[1].set_color(COUL_A)
        lv, lh = lecture(R, 2, 5)
        self.poser_gestes(r3, "On enlève 1 : 3 x égale 6, donc x vaut 2.", {10: lambda: [Create(lv)]}, echelle=1.1)
        self.play(Create(self.cadre_ok(VGroup(*r3.atomes[8:11]), 0.08)), run_time=0.25)
        self.au("Deux :", Indicate(p2, color=JAUNE_TITRE, scale_factor=1.3), rt=0.3)
        s1 = X("f(2) = 4 + 1 = 5", 42).move_to(P(0, ys[3])).align_to(P(xi, 0), LEFT)
        pc = R.point(2, 5, JAUNE_TITRE, r=0.12)
        self.poser_gestes(s1, "f de 2 égale 4 plus 1 : 5.", {9: lambda: [FadeIn(pc, scale=2.5)]}, echelle=1.1)
        s2 = X("g(2) = −2 + 7 = 5", 40).move_to(P(0, ys[4])).align_to(P(xi, 0), LEFT)
        k = self.coche(VERT_OK, 0.24).next_to(s2, RIGHT, buff=0.3)
        self.poser_gestes(s2, "g de 2 égale moins 2 plus 7 : 5.", {10: lambda: [Create(k)]}, echelle=1.1)
        s3 = self.ld("Les droites se croisent :", ys[5], 38, x0=x0, maxw=6.4)
        self.dit(s3, "Les droites se croisent")
        s4 = X("(2 ; 5)", 38, VERT_OK).move_to(R.p(2, 5) + P(-0.3, 1.15))
        self.poser_gestes(s4, "au point 2 ; 5.", {1: lambda: [Create(lh)]}, echelle=1.15)
        self.play(Flash(pc, color=VERT_OK, line_length=0.2), Indicate(s4, color=VERT_OK, scale_factor=1.15),
                  run_time=0.5)
        verifier(self, [R, d["f"], d["g"], lv, lh, pc], "06b-correction")
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.5)
        R = Repere(P(-6.4, -1.7), 0.55, 0.55, (0, 5), (0, 5), xticks=range(1, 6), yticks=range(1, 6),
                   nom_x="x", nom_y="y", zero=False, fs=32)
        f = R.droite(0.8, 0.6, 0, 5, DROITE_F)
        g = R.droite(-0.7, 4.6, 0, 5, DROITE_G)
        xc = 4.0 / 1.5
        pc = R.point(xc, 0.8 * xc + 0.6, JAUNE_TITRE, r=0.12)
        self.play(Write(tit), FadeIn(R), run_time=0.6)
        x0, mw = -2.5, 9.1
        y = [2.35, 1.7, 0.85, 0.2, -0.45, -1.3, -1.95, -2.6]

        def ok(e):
            k = self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y()))
            return [Create(k)]

        fs = 38
        l0 = self.ld("Une quantité qui change", y[0], fs, x0=x0, maxw=mw)
        self.poser_gestes(l0, "Une quantité qui change", {0: lambda: ok(l0), 3: lambda: [Create(f)]})
        l1 = self.ld("régulièrement s'écrit ax + b.", y[1], fs, x0=x0, maxw=mw)
        a_x = l1.atomes[4]
        a_x[0].set_color(COUL_A)
        a_x[1].set_color(INCONNUE)
        l1.atomes[6].set_color(COUL_B)
        self.dit(l1, "régulièrement s'écrit a x plus b.")
        l2 = self.ld("Deux fonctions sont égales", y[2], fs, x0=x0, maxw=mw)
        self.poser_gestes(l2, "Deux fonctions sont égales", {0: lambda: ok(l2) + [Create(g)]})
        l3 = self.ld("là où leurs droites se croisent :", y[3], fs, x0=x0, maxw=mw)
        self.poser_gestes(l3, "là où leurs droites se croisent :", {5: lambda: [FadeIn(pc, scale=2.5)]})
        l4 = self.ld("on le trouve avec une équation.", y[4], fs, x0=x0, maxw=mw)
        self.dit(l4, "on le trouve avec une équation.")
        l5 = self.ld("Un programme de calcul", y[5], fs, x0=x0, maxw=mw)
        self.poser_gestes(l5, "un programme de calcul", {0: lambda: ok(l5)})
        l6 = self.ld("peut cacher une fonction affine :", y[6], fs, x0=x0, maxw=mw)
        self.dit(l6, "peut cacher une fonction affine :")
        l7 = self.ld("on réduit l'expression.", y[7], 40, VERT_OK, x0=x0, maxw=mw)
        self.dit(l7, "on réduit l'expression.")
        verifier(self, [R, f, g, pc], "07-finale")
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_chantier()
        self.ecran_fonctions()
        self.ecran_question1()
        self.ecran_programme()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
