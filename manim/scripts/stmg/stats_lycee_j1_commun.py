# stats_lycee_j1_commun.py
# EleveAI — Maths STMG — série « Statistiques », LYCÉE, lot J1 (24/10/2026) :
# les OUTILS COMMUNS des épisodes 20 à 26 (ajustement affine, interpoler,
# extrapoler, limites). Pas de scène ici.
#
# ⭐ Repris SANS LES MODIFIER : stats_lycee_h2_commun.py (Nuage du coach,
#   question_pause, PaysageH2 / ShortH2, contrôle des bords BORDS=1 via
#   verifier-bords-video.py après rendu) et stats_lycee_h1_commun.py (caser()).
# ⭐ Ajouté ici, aux couleurs du coach (lib/canvas/FonctionGraphiqueCanvas.tsx) :
#   · la DROITE d'ajustement BLEUE (#2563eb, COULEUR_COURBE), coupée au bord
#     de la fenêtre, comme `courbes: [{ type: "affine", a, b }]` ;
#   · le point lu SUR la droite, la verticale ORANGE et l'horizontale VIOLETTE
#     qui partent de lui (misesEnEvidence du coach) ;
#   · les ÉCARTS entre deux relevés consécutifs (« +30 »), posés entre les points ;
#   · les écarts verticaux point → droite (pour « au jugé »).
# ⛔ Ne pas modifier manim/canvas_stats.py ni les modules H1/H2.

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_h2_commun import *  # noqa: E402,F401,F403
from stats_lycee_h1_commun import caser  # noqa: E402,F401

BLEU_D = "#2563eb"        # la droite du coach
BLEU_CLAIR = "#60a5fa"    # le bleu, lisible sur le fond noir
VERT_ECART = "#16a34a"


def droite(n, a, b, couleur=BLEU_D, sw=6, x0=None, x1=None):
    """La droite y = a x + b dans la fenêtre du nuage n (coupée aux bords)."""
    x0 = n.xmin if x0 is None else x0
    x1 = n.xmax if x1 is None else x1
    xs = [x0, x1]
    if abs(a) > 1e-12:  # on coupe là où la droite sort par le haut ou le bas
        for yb in (n.ymin, n.ymax):
            xb = (yb - b) / a
            if x0 < xb < x1:
                xs.append(xb)
    xs = sorted(xs)
    dedans = [x for x in xs if n.ymin - 1e-9 <= a * x + b <= n.ymax + 1e-9]
    g, d = min(dedans), max(dedans)
    return Line(n.p(g, a * g + b), n.p(d, a * d + b), color=couleur, stroke_width=sw)


def point_droite(n, a, b, x, couleur=BLEU_D, r=0.1):
    """Le point de la droite d'abscisse x (rond bleu cerclé de blanc)."""
    return Dot(n.p(x, a * x + b), radius=r * n._k(), fill_color=couleur, stroke_color=WHITE, stroke_width=2)


def lecture(n, a, b, x):
    """Du point (x ; ax+b) de la droite : la verticale ORANGE vers l'axe des x et
    l'horizontale VIOLETTE vers l'axe des y (le geste du coach)."""
    y = a * x + b
    return (DashedLine(n.p(x, n.ymin), n.p(x, y), color=ORANGE_V, stroke_width=5, dash_length=0.1),
            DashedLine(n.p(x, y), n.p(n.xmin, y), color=VIOLET_H, stroke_width=5, dash_length=0.1))


def ecart_txt(n, i, j, txt, couleur=VERT_ECART, fs=None, haut=True):
    """« +30 » entre les points i et j du nuage, au-dessus (ou au-dessous) du milieu."""
    a, b = n.ronds[i].get_center(), n.ronds[j].get_center()
    t = texte(txt, fs or n.fs - 4, couleur).set_stroke(WHITE, 5, background=True).scale(n._k())
    m = (a + b) / 2
    return t.move_to(m + (UP if haut else DOWN) * 0.32 * n._k() + LEFT * 0.12 * n._k())


def residus(n, a, b, couleur=AMBRE):
    """Les écarts VERTICAUX de chaque point à la droite (petits segments)."""
    return VGroup(*[Line(n.ronds[i].get_center(), n.p(x, a * x + b), color=couleur, stroke_width=4)
                    for i, x in enumerate(n.xs)])


def annees(n):
    """Les nombres de l'axe des x écrits comme des ANNÉES (« 2018 », pas
    « 2 018 » : fr() de canvas_stats met l'espace des milliers)."""
    for v, m in n.nx.items():
        neuf = texte(str(v), n.fs, ENCRE)
        m.become(neuf.scale_to_fit_height(m.height).move_to(m))
    return n


def lu_annee(n, v, couleur=ORANGE_V):
    """La pastille ORANGE sous l'axe des x, pour une ANNÉE (sans espace des milliers)."""
    g = n._pastille(str(v), couleur)
    q = n.p(v, n.ymin)
    return g.move_to(P(q[0], q[1] - 0.32 * n._k()))


def nombre(v, d=1):
    """Un nombre à la française : 27,6 ; 1 300 ; jamais 27.60000001."""
    v = round(v, d)
    if float(v).is_integer():
        s = f"{int(v):,}".replace(",", " ")
    else:
        s = f"{v:.{d}f}".rstrip("0").replace(".", ",")
    return s.replace("-", "−")


def fraction(num, den, fs=38, couleur=WHITE):
    """Une fraction écrite (barre horizontale), num et den : textes ou Mobjects."""
    n = num if isinstance(num, Mobject) else Text(num, font_size=fs, color=couleur)
    d = den if isinstance(den, Mobject) else Text(den, font_size=fs, color=couleur)
    w = max(n.width, d.width) + 0.2
    barre = Line(LEFT * w / 2, RIGHT * w / 2, color=couleur, stroke_width=3)
    n.next_to(barre, UP, buff=0.1)
    d.next_to(barre, DOWN, buff=0.1)
    return VGroup(n, barre, d)


class PaysageJ1(PaysageH2):  # _Audit ajouté en bas du fichier
    """La base d'une paysage du lot J1 : figure à gauche, colonne à droite."""

    identite = "Maths STMG — EleveAI"
    ceinture = "verte"

    def ecran(self, cle, scale=0.5):
        """Efface, remet Ti-Margo, lance la voix de l'écran."""
        self.clear()
        self.add_mascotte(scale=scale)
        self.dire(cle)

    def titre_col(self, txt, couleur=JAUNE_TITRE, y=2.95, fs=46):
        t = self.col(self.t(txt, fs, couleur), y)
        self.play(Write(t), run_time=0.5)
        return t

    def poser(self, mob, y, anim="fade", run_time=0.45):
        """Pose mob dans la colonne de droite à la hauteur y, et le montre."""
        self.col(mob, y)
        a = {"fade": FadeIn(mob, shift=RIGHT * 0.2), "pop": FadeIn(mob, scale=0.7),
             "up": FadeIn(mob, shift=UP * 0.2)}[anim]
        self.play(a, run_time=run_time)
        return mob

    def a_droite(self, ref, mob, buff=0.2):
        """mob à droite de ref, sur la même ligne. S'il déborderait (marge de 3 %),
        ref se resserre (animation courte) pour faire de la place : jamais de
        retour à la ligne qui chevaucherait la ligne suivante."""
        bord = self.BORD_X - 0.05
        larg = ref.width + buff + mob.width
        if ref.get_left()[0] + larg > bord:
            k = (bord - ref.get_left()[0]) / larg
            self.play(ref.animate.scale(k, about_edge=LEFT), run_time=0.25)
            mob.scale(k)
            buff *= k
        mob.next_to(ref, RIGHT, buff=buff)
        return mob

    def pause_defi(self, y=-2.05, marge=2.0):
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def apparaitre_points(self, n, idx=None, lag=0.15, run_time=1.0):
        idx = range(len(n.ronds)) if idx is None else idx
        self.play(LaggedStart(*[FadeIn(n.ronds[i], scale=3) for i in idx], lag_ratio=lag), run_time=run_time)


class ShortJ1(ShortH2):
    """La base d'un short du lot J1 (9:16, cadre 4,5 × 8) : la figure en bas
    (sous HAUT_CARTE), l'image et les textes dans la bande du haut."""

    HAUT_CARTE = 0.8
    BAS_CARTE = -2.6  # Ti-Margo est dessous : la carte ne descend jamais plus bas

    def caser_nuage(self, n):
        """Le nuage dans le bas du cadre, sans jamais toucher les bords (3 %)."""
        n.scale_to_fit_width(min(n.width, config.frame_width - 0.4))
        if n.height > self.HAUT_CARTE - self.BAS_CARTE:
            n.scale_to_fit_height(self.HAUT_CARTE - self.BAS_CARTE)
        return n.move_to(P(0, self.HAUT_CARTE - n.height / 2))

    def haut_txt(self, morceaux, fs=32, y=1.6):
        """Un texte centré dans la bande du haut."""
        t = self.ligne(morceaux, fs)
        return t.move_to(P(0, y))

    def vider(self, garder):
        """Efface tout sauf les objets gardés (titre, ceintures, Ti-Margo)."""
        self.play(FadeOut(Group(*[m for m in self.mobjects if m not in garder])), run_time=0.4)

    def appel_commentaire(self, y=0.95):
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 32, VERT_OK), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.08, 0.25)  # 3,55 × 1,08 < 3,9 : jamais au bord
        self.attendre_voix(marge=1.5)


# ── AUDIT de la synchro voix / écrit (règle du 24/10 : 0 s d'avance) ─────────
# AUDIT=1 python -m manim render --dry_run … : chaque nombre écrit à l'écran
# (hors nombres des axes du Nuage) est comparé à l'instant où la voix le dit.
import re as _re  # noqa: E402

_NB = _re.compile(r"\d+(?:[ ,]\d+)*")


def _textes(m):
    out = []
    if isinstance(m, CompteARebours):
        return out
    for f in m.get_family():
        if isinstance(f, Text) and getattr(f, "original_text", None):
            out.append(f)
    return out


def _marquer_axes(cls):
    """Les textes d'une figure qu'on LIT (axes du nuage, tableau) : exception de la règle."""
    init = cls.__init__

    def neuf(self, *a, **k):
        init(self, *a, **k)
        for f in self.get_family():
            if isinstance(f, Text):
                f._axe = True
    cls.__init__ = neuf


_marquer_axes(Nuage)
_marquer_axes(Tableau)


class _Audit:
    def play(self, *args, **kwargs):
        if os.environ.get("AUDIT") != "1":
            return super().play(*args, **kwargs)
        avant = {id(t) for m in self.mobjects for t in _textes(m)}
        t0 = self.renderer.time
        super().play(*args, **kwargs)
        cle = getattr(self, "_cle_voix", None) or getattr(self, "_cle_audit", None)
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            for t in _textes(m):
                if id(t) in avant or getattr(t, "_axe", False) or getattr(t, "_audite", False):
                    continue
                t._audite = True
                for nb in _NB.findall(t.original_text.replace("−", "")):
                    i = voix.find(nb)
                    if i < 0:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.text[:30]}) t={t0:.2f}", flush=True)
                        continue
                    dit = max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                    if t0 < dit - 0.02:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.text[:30]}) {dit - t0:.2f} s", flush=True)
                    elif t0 > dit + 0.4 + 1.5:
                        pass


PaysageJ1.__bases__ = (_Audit,) + PaysageJ1.__bases__
ShortJ1.__bases__ = (_Audit,) + ShortJ1.__bases__


# ── la QUESTION-PAUSE, calée MOT À MOT (règle du 24/10 : 0 s d'avance) ──────
# Même écran que question_pause() du lot H2, mais chaque ligne de la question,
# chaque choix et chaque ligne de l'explication apparaît au mot où la voix la dit :
#   mots_q : un extrait par ligne de la question (None = en même temps que la précédente) ;
#   mots_choix : l'extrait où commence le CONTENU de chaque choix (pas la lettre) ;
#   mots_ph : un extrait par ligne de l'explication.

def _question_j1(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                 autres_q=None, autres_r=None, mot_q=None, mots_q=None, mots_ph=None, gestes_q=None, gestes_choix=None):
    self.dire(cle_q)
    t0 = self.renderer.time
    tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
    self.au_mot("Question")
    self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
    mots_q = mots_q or [mot_q] + [None] * (len(q) - 1)
    for k, (ligne, mot) in enumerate(zip(q, mots_q)):
        for e, fn in (gestes_q or {}).get(k, []):  # un geste sur la figure, au mot, avant la ligne k
            self.au_mot(e)
            fn(self)
        if mot:
            self.au_mot(mot)
        self.play(FadeIn(ligne, shift=UP * 0.12), run_time=0.3)
    for k, (c, mot) in enumerate(zip(cartes, mots_choix)):
        self.au_mot(mot)
        self.play(FadeIn(c, shift=RIGHT * 0.25), run_time=0.25)
        if gestes_choix and gestes_choix[k]:  # le repère du choix sur la figure, au même mot
            gestes_choix[k](self)
    if autres_q:
        autres_q(self)
    self.au_mot("Mets pause")
    self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
    self.attendre_voix(marge=0.2)
    rebours.jouer(self)
    print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
    self.dire(cle_r)
    b = cartes[bonne]
    anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(VERT_OK)]
    anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
    self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.35)
    k = max(1.0, min(1.08, (config.frame_width * 0.94) / max(b.width, 1e-3)))  # jamais dans la marge de 3 %
    self.play(b.animate.scale(k), run_time=0.2)
    ok = self.coche(VERT_OK, 0.24).next_to(b, RIGHT, buff=0.15)
    bord = getattr(self, "BORD_X", config.frame_width / 2 - 0.15)
    if ok.get_right()[0] > bord:
        ok.move_to(b[0].get_right() + LEFT * 0.4)
    self.play(b.animate.scale(1 / k), Create(ok), run_time=0.25)
    mots_ph = mots_ph or [None] * len(ph)
    for k, (ligne, mot) in enumerate(zip(ph, mots_ph)):
        if mot:
            self.au_mot(mot)
        self.play(FadeIn(ligne, shift=UP * 0.12), run_time=0.3)
        if k == 0 and autres_r:  # le geste qui montre la réponse, avec la 1re ligne de l'explication
            autres_r(self)
    self.attendre_voix(marge=0.8)
    return t0


PaysageJ1.question_pause = _question_j1
ShortJ1.question_pause = _question_j1


def _reveler(self, morceaux, run_time=0.25):
    """Montre des morceaux d'une ligne déjà placée, chacun AU MOT où la voix le dit.
    morceaux : [(mobject, extrait | (extrait, n) | None)]."""
    for mob, e in morceaux:
        if e:
            if isinstance(e, tuple):
                self.au_mot(*e)
            else:
                self.au_mot(e)
        self.play(FadeIn(mob, shift=RIGHT * 0.12), run_time=run_time)


PaysageJ1.reveler = _reveler
ShortJ1.reveler = _reveler
