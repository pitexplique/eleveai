# frac_loth_commun.py
# EleveAI — série « Fractions », 5e, LOT H (25/10/2026 : notion fraction_calcul,
# 07-additionner, 09-quantite, 08-multiplier, 10-calcul-defi, paysage + short
# chacun) : les petits OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI 6e/frac_commun.py NI les scripts
# de 4e : 4e/frac_lote_commun.py est IMPORTÉ (PaysageE / ShortE : audit de
# synchro AUDIT=1, contrôle des bords BORDS=1, au_nb(), montre(), choix des
# questions posés au mot de LEUR nombre, « Ce que tu as appris » à 0,5 du haut).
# Le lot G (5e 01-06, frac_lotg_commun.py) n'est PAS importé (il change en
# même temps).
# Ajouté ici :
#   · PaysageH / ShortH : en « Maths 5e » ;
#   · titre() sans synchro (le titre paraît au mot choisi par le script) ;
#   · personnage() : le personnage-métier, son nom dessus, son métier dessous ;
#   · Pave : le rectangle unité coupé en colonnes × rangées (aire = produit),
#     RECOPIÉ de 4e/frac_multiplier.py (non importé : c'est un épisode) ;
#   · barrer(), petit() : barrer un facteur et écrire au-dessus ce qui reste ;
#   · L(specs, y) : une ligne de morceaux, CHACUN posé à son mot (au_nb / au_mot).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Classe>
#   → 0 ligne AUDIT-AVANCE, 0 RETARD, 0 BORD.

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from frac_lote_commun import *  # noqa: E402,F401,F403


def sans_synchro(m):
    """Le script pose m AU MOT lui-même (au_nb / au_mot) : la synchro par jetons l'ignore."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


def barrer(m, couleur=ROUGE_ERREUR):
    return Line(m.get_corner(DL) + P(-0.05, -0.03), m.get_corner(UR) + P(0.05, 0.03), color=couleur, stroke_width=5)


def petit(v, m, haut=True, couleur=VERT_OK, fs=30):
    t = Text(str(v), font_size=fs, color=couleur)
    t.sans_synchro = True
    t._pas_audit = True
    return t.next_to(m, UP if haut else DOWN, buff=0.05).shift(RIGHT * 0.12)


class Pave(VGroup):
    """Le rectangle unité (carte du coach) coupé en `cols` colonnes et `rangs`
    rangées ; les cases des colonnes < a et des rangées < b (en partant du bas
    à gauche) sont prises. .fond .pris .vert .hori .cases[r][c] (r = 0 en bas)."""

    def __init__(self, cols, rangs, a, b, L=3.4, H=None, couleur=BLEU_PART, centre=ORIGIN, carte=True, **kw):
        super().__init__(**kw)
        H = L if H is None else H
        self.L, self.H, self.cols, self.rangs = L, H, cols, rangs
        self.fond = Rectangle(width=L, height=H, fill_color=VIDE, fill_opacity=1, stroke_color=BORD, stroke_width=4)
        g, bas = -L / 2, -H / 2
        self.pris = Rectangle(width=L * a / cols, height=H * b / rangs, fill_color=couleur, fill_opacity=1,
                              stroke_width=0).move_to(P(g + L * a / cols / 2, bas + H * b / rangs / 2))
        self.vert = VGroup(*[Line(P(g + L * j / cols, bas), P(g + L * j / cols, -bas), color=BORD, stroke_width=3)
                             for j in range(1, cols)])
        self.hori = VGroup(*[Line(P(g, bas + H * i / rangs), P(-g, bas + H * i / rangs), color=BORD, stroke_width=3)
                             for i in range(1, rangs)])
        self.cases = [[Rectangle(width=L / cols, height=H / rangs, stroke_width=0, fill_opacity=0)
                       .move_to(P(g + L * (c + 0.5) / cols, bas + H * (r + 0.5) / rangs)) for c in range(cols)]
                      for r in range(rangs)]
        self.carte = RoundedRectangle(width=L + 0.4, height=H + 0.4, corner_radius=0.2, fill_color=CARTE,
                                      fill_opacity=1, stroke_color=GRILLE, stroke_width=3) if carte else VMobject()
        self.contour = Rectangle(width=L, height=H, stroke_color=BORD, stroke_width=5, fill_opacity=0)
        self.add(self.carte, self.fond, self.pris, self.vert, self.hori, self.contour,
                 VGroup(*[c for r in self.cases for c in r]))
        self.move_to(centre)

    def bande(self, c0, c1, r0, r1, couleur, opacite=1.0):
        """Un rectangle qui couvre les colonnes [c0, c1[ et les rangées [r0, r1[."""
        L, H = self.L, self.H
        g, b = self.fond.get_left()[0], self.fond.get_bottom()[1]
        return Rectangle(width=L * (c1 - c0) / self.cols, height=H * (r1 - r0) / self.rangs, fill_color=couleur,
                         fill_opacity=opacite, stroke_width=0).move_to(
            P(g + L * (c0 + c1) / 2 / self.cols, b + H * (r0 + r1) / 2 / self.rangs))

    def numeros(self, cases, fs=30):
        out = VGroup()
        for k, (r, c) in enumerate(cases):
            t = Text(str(k + 1), font_size=fs, color=NUIT, weight=BOLD).move_to(self.cases[r][c])
            t.sans_synchro = True
            t._pas_audit = True
            out.add(t)
        return out


class _LigneAuMot:
    """L(specs, y) : une ligne de morceaux, chacun posé à SON mot.
    specs = [(texte ou Mobject, couleur, extrait), …] ; extrait = "…" ou ("…", n) :
    avec un chiffre on attend son DERNIER nombre (au_nb), sinon son début
    (au_mot) ; None : le morceau part avec celui d'avant."""

    def _att(self, ex):
        if ex is None:
            return
        n = 1
        if isinstance(ex, tuple):
            ex, n = ex
        if re.search(r"\d", ex):
            self.au_nb(ex, n=n)
        else:
            self.au_mot(ex, n=n)

    def L(self, specs, y, fs=40, xl=None, x=None, buff=0.2, run_time=0.3, avec=None):
        ms = [s if isinstance(s, Mobject) else self.t(s, fs, c) for s, c, _ in specs]
        g = VGroup(*ms).arrange(RIGHT, buff=buff)
        for m in ms:  # les fractions écrites : leur trait à la hauteur du texte
            if isinstance(m, EcritureFraction):
                autre = next((o for o in ms if isinstance(o, Text)), None)
                if autre is not None:
                    m.shift(UP * (autre.get_y() - m.trait.get_y()))
        sans_synchro(g)
        for m in ms:  # posé d'un bloc, à son mot : la synchro par jetons ne le découpe pas
            m._bloc = True
        if x is None and hasattr(self, "col"):
            self.col(g, y, xl)
        else:
            if g.width > config.frame_width - 0.6:
                g.scale_to_fit_width(config.frame_width - 0.6)
            g.move_to(P(0 if x is None else x, y))
        avec = avec or {}
        lots = []
        for m, (_, _, ex) in zip(ms, specs):
            if ex is None and lots:
                lots[-1][1].append(m)
            else:
                lots.append((ex, [m]))
        for k, (ex, lot) in enumerate(lots):
            self._att(ex)
            self.play(*[FadeIn(m, shift=RIGHT * 0.15) for m in lot], *avec.get(k, []), run_time=run_time)
        return g


class PaysageH(_LigneAuMot, PaysageE):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0, centre=False):
        """Le titre paraît AU MOT choisi par le script (sans synchro par jetons)."""
        t = self.t(txt, fs, couleur)
        t.sans_synchro = True
        t.move_to(P(0, y)) if centre else self.col(t, y)
        self.play(Write(t), run_time=0.5)
        return t

    def personnage(self, pers, nom, metier, x=-5.0, y=-0.4, fs_nom=40, fs_met=30):
        """Pose le personnage-métier : le nom au mot `nom`, le métier au mot
        du premier mot de `metier` (liste de lignes)."""
        pers.move_to(P(x, y))
        n = self.t(nom, fs_nom, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        lignes = metier if isinstance(metier, (list, tuple)) else [metier]
        m = VGroup(*[self.t(s, fs_met, BLEU_CALCUL) for s in lignes]).arrange(DOWN, buff=0.06)
        m.next_to(pers, DOWN, buff=0.2)
        bloc_fixe(m)
        self.au_mot(nom)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(n), run_time=0.5)
        self.au_mot(lignes[0].split()[0])
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        return pers, n, m


class ShortH(_LigneAuMot, ShortE):
    ceinture = "blanche"

    def encadrer(self, mob, couleur=VERT_OK, buff=0.2):
        return SurroundingRectangle(mob, color=couleur, buff=buff, corner_radius=0.12, stroke_width=5)

    def bas(self, mob, y=-1.3):
        """Un texte ou un calcul centré dans la bande du bas."""
        return self.borne(mob).move_to(P(0, y))
