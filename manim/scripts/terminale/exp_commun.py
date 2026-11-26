# exp_commun.py
# EleveAI — Maths Tle spé — LE SOCLE de la série « FONCTION EXPONENTIELLE » (26/11/2026) :
# 6 paysages, un par micro de la notion `fonction_exponentielle`
# (lib/tutor-v4/knowledge/maths/terminale-spe/microSkills.ts).
# Voix : manim/SCRIPTS-tle-exponentielle.md (validées par Frédéric le 26/11), extraites par
# manim/poste2/voix-exp-depuis-md.py ; WAV + marques : manim/poste2/voix-exp-tous-les-wav.sh.
#
# Modèle recopié (rien importé de lui) : convexite_derivee_seconde.py — même gabarit à
# 15 clips, mêmes questions-pauses, même colonne de droite.
#
# ⛔ PAS DE « ^ » À L'ÉCRAN (Frédéric, 26/11). Les puissances de e sont de VRAIES
#   puissances : `formule("10t e^{−t}")` écrit le « e » et pose l'exposant en petit et en
#   hauteur. Le chapeau ne vit que dans le CODE, comme balise ; il n'est jamais affiché.
#   (Le poste n'a pas LaTeX : on n'utilise pas MathTex, on place les glyphes de Text.)
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos sur les marques mot à mot.
#   Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# ⛔ La fin est celle du 26/11 : « Entraîne-toi sur eleveai.fr ou sur YouTube @eleveai974 »
#   (fin_commune.py écrit encore l'ancienne : on la surcharge ici, `ecran_fin_2611`).

import os
import re
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6          # la colonne de droite (marge de 3 % : 0,51 du bord)
GAUCHE = -6.4                  # le bord gauche utile
EXP = BLEU_CALCUL              # la courbe de e puissance x
PEAUX = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a1e"]


# ── l'écriture des puissances (sans chapeau visible) ────────────────────────

def formule(src, fs=36, color=WHITE, c_exp=None):
    """Une ligne de maths : « F(t) = 60 + 100e^{−0,5t} » → le texte, et chaque
    exposant posé en petit, en haut à droite de son glyphe de base.

    On écrit la ligne SANS ses exposants en un seul Text (la ligne de base reste
    parfaite), puis on glisse les glyphes qui suivent pour faire la place de
    l'exposant. Renvoie VGroup(texte, exposants) ; `_base` garde le texte."""
    morceaux = re.split(r"\^\{([^}]*)\}", src)
    base = "".join(morceaux[0::2])
    t = Text(base, font_size=fs, color=color, disable_ligatures=True)
    exps = VGroup()
    n = 0
    for i, m in enumerate(morceaux):
        if i % 2 == 0:
            n += len(m)
            continue
        k = n - 1
        gl = t[k]
        e = Text(m, font_size=int(fs * 0.62), color=c_exp or color, disable_ligatures=True)
        e.next_to(gl, RIGHT, buff=0.03).align_to(gl, UP).shift(UP * 0.2 * fs / 48)
        if k + 1 < len(t):
            t[k + 1:].shift(RIGHT * (e.width + 0.06))
        exps.add(e)
    g = VGroup(t, exps)
    g._base = base   # ⚠️ Text garde un glyphe (vide) par espace : on compte TOUT
    assert len(t) == len(g._base), (src, len(t), len(g._base))
    return g


def colorer(f, motif, couleur, n=1):
    """Colore, dans une `formule`, les glyphes du n-ième `motif`."""
    m = motif
    i = -1
    for _ in range(n):
        i = f._base.find(m, i + 1)
    if i < 0:
        raise ValueError(f"« {motif} » absent de « {f._base} »")
    f[0][i:i + len(m)].set_color(couleur)
    return f


class Graphe:
    """Un repère : [xa ; xb] × [ya ; yb] posé dans le rectangle (X0, Y0)-(X1, Y1)."""

    def __init__(self, xr, yr, bg, hd):
        (self.xa, self.xb), (self.ya, self.yb) = xr, yr
        (self.X0, self.Y0), (self.X1, self.Y1) = bg, hd

    def G(self, x, y):
        return P(self.X0 + (x - self.xa) / (self.xb - self.xa) * (self.X1 - self.X0),
                 self.Y0 + (y - self.ya) / (self.yb - self.ya) * (self.Y1 - self.Y0))

    def axes(self, sw=2, color=GREY_B):
        y0 = min(max(0, self.ya), self.yb)
        x0 = min(max(0, self.xa), self.xb)
        kw = dict(buff=0, stroke_width=sw, color=color, tip_length=0.16, max_tip_length_to_length_ratio=0.08)
        return VGroup(Arrow(self.G(self.xa, y0), self.G(self.xb, y0), **kw),
                      Arrow(self.G(x0, self.ya), self.G(x0, self.yb), **kw))

    def courbe(self, f, a, b, color=WHITE, sw=5, n=160):
        pts = []
        for x in np.linspace(a, b, n):
            y = f(x)
            assert self.ya - 1e-9 <= y <= self.yb + 1e-9, (x, y)
            pts.append(self.G(x, y))
        m = VMobject(stroke_color=color, stroke_width=sw)
        m.set_points_smoothly(pts)
        return m

    def droite(self, m, x0, y0, a, b, color=WHITE, sw=4):
        return Line(self.G(a, y0 + m * (a - x0)), self.G(b, y0 + m * (b - x0)), color=color, stroke_width=sw)

    def graduation(self, x, texte, fs=24, color=GREY_A, bas=True):
        """Un trait sur l'axe des abscisses et son nombre (figure LUE : pas d'audit)."""
        y0 = min(max(0, self.ya), self.yb)
        tr = Line(self.G(x, y0) + UP * 0.08, self.G(x, y0) + DOWN * 0.08, stroke_width=2, color=color)
        lb = Text(texte, font_size=fs, color=color).next_to(tr, DOWN if bas else UP, buff=0.08)
        g = VGroup(tr, lb)
        for f in g.get_family():
            f._pas_audit = True
        return g


def personne(peau=PEAUX[0], cheveux="#1f1307", haut="#1e40af", longs=False, s=1.0):
    """Le pictogramme d'une personne : tête, cheveux (courts ou longs), buste."""
    tete = Circle(radius=0.32, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    elems = []
    if longs:
        nappe = RoundedRectangle(width=0.78, height=0.86, corner_radius=0.3, fill_color=cheveux, fill_opacity=1,
                                 stroke_width=0).move_to(P(0, 0.95))
        elems.append(nappe)
    corps = RoundedRectangle(width=1.05, height=1.25, corner_radius=0.3, fill_color=haut, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    frange = Arc(radius=0.33, start_angle=0.25, angle=PI - 0.5, stroke_color=cheveux, stroke_width=11)
    frange.move_to(tete.get_top() + DOWN * 0.07)
    return VGroup(*elems, corps, tete, frange).scale(s)


class ExpBase(AuditSynchro, MotsCales, Notion6e):
    fichier_marques = None
    nom_voix = None
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"
    titre = ""                 # la page de garde
    question_garde = []        # ses lignes de question

    # ── outils ──────────────────────────────────────────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        return t

    def F(self, src, fs=36, color=WHITE, c_exp=None):
        return formule(src, fs, color, c_exp)

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def lg(self, *morceaux, y, x=-6.2, buff=0.15, larg=None):
        """Une ligne à gauche, alignée sur x ; rétrécie si elle passe `larg`."""
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        if larg and g.width > larg:
            g.scale_to_fit_width(larg)
        g.move_to(P(0, y)).align_to(P(x, 0), LEFT)
        lim = 5.3 if g.get_bottom()[1] < -1.95 else BORD_X     # Ti-Margo
        if g.get_right()[0] > lim:
            g.scale_to_fit_width(lim - x).align_to(P(x, 0), LEFT)
        return g

    def insister(self, mob, k=1.2, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sans_audit(self, mob):
        """Les nombres d'une figure qu'on LIT (graduations, numéros) : pas d'audit."""
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    def pastille_num(self, k, color=BLEU_CALCUL, r=0.24):
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin bas-droit, à 0,45 du bord (3 % de la largeur)."""
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def nouvel_ecran(self, cle, margo=0.5):
        self.clear()
        self.add_mascotte(scale=margo)
        self.dire(cle)
        return self.renderer.time

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def _pos(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix {self._cle_voix}")
        return i

    def t_pos(self, i):
        """L'instant (absolu) où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        return self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0])

    def t_mot(self, extrait, n=1):
        return self.t_pos(self._pos(extrait, n))

    def jusqua(self, extrait, n=1, marge=0.1, mini=0.4):
        """La durée d'une animation qui doit finir juste avant `extrait`."""
        return max(mini, self.t_mot(extrait, n) - self.renderer.time - marge)

    def au_pos(self, i):
        reste = self.t_pos(i) - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:   # + 0,07 : une image de -ql, pour ne jamais devancer la voix
            self.wait(max(reste, 0) + 0.07)

    def au_mot(self, extrait, n=1):
        self.au_pos(self._pos(extrait, n))

    def montrer(self, *items):
        """Chaque item : (extrait, mobjet) ou (extrait, mobjet, mode) ; l'extrait peut
        être (texte, n). Attend le mot, puis fait apparaître le mobjet."""
        for it in items:
            ext, mob = it[0], it[1]
            mode = it[2] if len(it) > 2 else "glisse"
            if isinstance(ext, tuple):
                self.au_mot(*ext)
            elif ext:
                self.au_mot(ext)
            if mode == "ecrit":
                self.play(Write(mob), run_time=0.6)
            elif mode == "pop":
                self.play(FadeIn(mob, scale=1.3), run_time=0.35)
            elif mode == "trace":
                self.play(Create(mob), run_time=0.7)
            else:
                self.play(FadeIn(mob, shift=RIGHT * 0.15), run_time=0.35)

    def encadrer(self, mob, color=VERT_OK):
        cad = SurroundingRectangle(mob, color=color, buff=0.14, stroke_width=3)
        self.play(Create(cad), run_time=0.35)
        return cad

    # ── la question-pause (modèle : convexite_derivee_seconde.py) ──────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        etapes = None
        if isinstance(corps, (list, tuple)):   # [(extrait, texte ou mobjet), …] : révélés un par un
            etapes = [e for e, _ in corps]
            corps = VGroup(*[m if isinstance(m, Mobject) else Text(m, font_size=fs, color=WHITE)
                             for _, m in corps]).arrange(RIGHT, buff=0.14)
            corps._etapes = etapes
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        # ⛔ la coche se pose à 0,35 du bord droit : on lui réserve sa place (REGLES.md)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix):
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 32) for x in question])
        for x in q:   # chaque ligne à sa taille : une ligne longue ne rétrécit pas les autres
            if x.width > BORD_X - XL:
                x.scale_to_fit_width(BORD_X - XL)
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        if pause.width < 3.5:  # rétrécie à cause de Ti-Margo : deux lignes
            pause = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE), self.t("et choisis !", 32, ORANGE_RETENUE))
            pause.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            pause.move_to(P(0, cartes.get_bottom()[1] - 0.2), aligned_edge=UP).align_to(P(XL, 0), LEFT)
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            corps = c[1][1]
            etapes = getattr(corps, "_etapes", None)
            if not etapes:
                self.au_pos(i + 4)
                self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.2)
                continue
            j = i
            for ext, part in zip(etapes, corps):
                j = voix.find(ext, j)
                assert j >= 0, (L, ext)
                self.au_pos(j)
                self.play(FadeIn(part, shift=RIGHT * 0.15), run_time=0.2)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        return ok

    def ecran_question(self, cle, question, choix, bonne, extraits_q, lignes_reponse, figure=None,
                       croix=(), y_rep=None):
        """Une question-pause complète : `cle` (« 04 » ou « 07 ») → clips cle-question
        puis cleb-reponse.
        question       : les lignes (texte ou mobjet) de la colonne de droite ;
        extraits_q     : le mot de la voix qui fait apparaître chaque ligne ;
        choix, bonne   : les 3 contenus (texte ou mobjet), l'indice juste (0 = A) ;
        figure         : fonction (appelée après « Question ! ») qui pose un dessin à
                         gauche et renvoie le bas du dessin ;
        lignes_reponse : [(extrait, mobjet), …] posées à gauche, l'une sous l'autre ;
        croix          : [(extrait, indice de carte)] : une croix rouge sur un leurre."""
        t0 = self.nouvel_ecran(f"{cle}-question")
        tete, q, cartes, pause, rebours = self.q_tete(question, choix)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        bas = figure() if figure else 3.3
        for ligne, ext in zip(q, extraits_q):
            self.au_mot(ext)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, f"{cle}-question", t0, bonne)
        self.dire(f"{cle}b-reponse")
        self.q_reponse(cartes, bonne, pause, rebours)
        y = (bas - 0.45) if y_rep is None else y_rep
        h = 0.0
        mobs = []
        for ext, mob in lignes_reponse:
            if mob.width > XL - 0.3 - GAUCHE:
                mob.scale_to_fit_width(XL - 0.3 - GAUCHE)
            mob.move_to(P(0, y - mob.height / 2)).align_to(P(GAUCHE, 0), LEFT)
            y -= mob.height + 0.28
            mobs.append(mob)
        assert y > -3.75, f"{cle} : la réponse descend trop bas ({y:.2f})"
        rep = dict(zip([id(m) for m in mobs], mobs))
        for ext, mob in lignes_reponse:
            self.montrer((ext, mob))
            for ext_c, k in croix:
                if ext_c == ext:
                    cx = Cross(cartes[k], stroke_color=ROUGE_ERREUR, stroke_width=5).scale(0.55)
                    self.play(Create(cx), run_time=0.3)
        del rep, h
        self.attendre_voix(marge=0.8)

    # ── 09 : le défi (pause + compte à rebours) ────────────────────────────

    def ecran_defi(self, lignes, figure=None, x=-6.1, y0=2.2, fs=40):
        """lignes : [(extrait, texte ou mobjet)] posées l'une sous l'autre à gauche (ou à x) ;
        figure : fonction appelée après le titre (un dessin, sans nombre non dit)."""
        t0 = self.nouvel_ecran("09-defi")
        self.au_mot("À toi de jouer")
        tete = VGroup(pastille_pause(0.5), self.t("À toi de jouer !", 50, ORANGE_RETENUE)).arrange(RIGHT, buff=0.3)
        tete.to_edge(UP, buff=0.5)
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.45)
        if figure:
            figure()
        y = y0
        rangs = []
        for ext, m in lignes:
            if isinstance(m, list):   # une ligne en morceaux : [(extrait, mobjet), …]
                mob = VGroup(*[x for _, x in m]).arrange(RIGHT, buff=0.9, aligned_edge=DOWN)
                mob._etapes = [e for e, _ in m]
            else:
                mob = m if isinstance(m, Mobject) else self.t(m, fs)
            if getattr(mob, "_fixe", False):   # un dessin déjà placé : on ne le range pas
                rangs.append((ext, mob))
                continue
            if mob.width > BORD_X - x:
                mob.scale_to_fit_width(BORD_X - x)
            mob.move_to(P(0, y - mob.height / 2)).align_to(P(x, 0), LEFT)
            y -= mob.height + 0.3
            rangs.append((ext, mob))
        assert y > -1.9, f"09-defi : trop de lignes ({y:.2f})"
        for ext, mob in rangs:
            if getattr(mob, "_etapes", None):
                for e, part in zip(mob._etapes, mob):
                    self.montrer((e, part, "pop"))
            else:
                self.montrer((ext, mob))
        pause = VGroup(pastille_pause(0.42), self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE))
        pause.arrange(RIGHT, buff=0.25).move_to(P(-1.2, -2.6))
        rebours = CompteARebours(5, r=0.38, fs=34).next_to(pause, RIGHT, buff=0.45)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION 09-defi t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f})", flush=True)
        self.wait(0.4)

    def titre_ecran(self, texte, extrait, color=JAUNE_TITRE, fs=44):
        """Un titre en haut, centré, écrit quand la voix le dit."""
        tit = self.t(texte, fs, color, larg=12).to_edge(UP, buff=0.45)
        self.au_mot(extrait)
        self.play(Write(tit), run_time=0.6)
        return tit

    # ── 00 : la page de garde ──────────────────────────────────────────────

    def ecran_garde(self, extrait_titre, extraits_question):
        self.nouvel_ecran("00-garde", margo=0.8)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        titre = self.t(self.titre, 50, JAUNE_TITRE, larg=12.4).to_edge(UP, buff=0.5)
        self.au_mot(extrait_titre)
        self.play(Write(titre), run_time=0.9)
        ident = self.t(self.identite, 26, GREY_A).next_to(titre, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        g = Graphe((-2.2, 1.6), (0, 5.2), (-5.9, -1.75), (-2.1, 1.25))
        ax = self.sans_audit(g.axes())
        c = g.courbe(np.exp, -2.2, 1.6, EXP, 6)
        lq = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 38, WHITE) for x in self.question_garde])
        lq.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if lq.width > BORD_X + 1.2:
            lq.scale_to_fit_width(BORD_X + 1.2)
        lq.move_to(P(0, 0.0)).align_to(P(-1.2, 0), LEFT)
        self.play(Create(ax), Create(c), run_time=1.0)
        for ligne, ext in zip(lq, extraits_question):
            self.au_mot(ext)
            self.play(FadeIn(ligne, shift=UP * 0.1), run_time=0.45)
        self.play(Indicate(c, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.7)
        self.attendre_voix(marge=0.9)

    # ── 08 : la rédaction du bac, sur une copie ───────────────────────────

    def ecran_copie(self, cle, titre, extrait_titre, lignes, marge=0.7):
        """lignes : [(extrait, texte ou mobjet)] numérotées 1, 2, 3 sur une copie."""
        self.nouvel_ecran(cle)
        tit = self.t(titre, 44, JAUNE_TITRE, larg=12).to_edge(UP, buff=0.45)
        self.au_mot(extrait_titre)
        self.play(Write(tit), run_time=0.6)
        copie = RoundedRectangle(width=10.6, height=5.3, corner_radius=0.15, fill_color="#f8fafc",
                                 fill_opacity=1, stroke_width=0).move_to(P(-0.75, -0.55))
        marge_r = Line(copie.get_corner(UL) + RIGHT * 0.9, copie.get_corner(DL) + RIGHT * 0.9,
                       color="#fca5a5", stroke_width=2)
        self.play(FadeIn(copie), Create(marge_r), run_time=0.4)
        y = copie.get_top()[1] - 0.45
        rangs = []
        for k, (ext, contenu) in enumerate(lignes, 1):
            num = self.pastille_num(k, BLEU_CALCUL)
            corps = contenu if isinstance(contenu, Mobject) else VGroup(
                *[self.t(s, 30, "#0f172a") for s in contenu.split("\n")]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            if corps.width > 8.6:
                corps.scale_to_fit_width(8.6)
            corps.move_to(P(0, y - corps.height / 2)).align_to(copie.get_left() + RIGHT * 1.15, LEFT)
            num.move_to(P(copie.get_left()[0] + 0.5, corps.get_top()[1] - 0.2))
            y -= corps.height + 0.4
            rangs.append((ext, num, corps))
        assert y > copie.get_bottom()[1] - 0.1, f"{cle} : la copie déborde"
        for ext, num, corps in rangs:
            self.au_mot(ext) if isinstance(ext, str) else self.au_mot(*ext)
            self.play(FadeIn(num, scale=1.3), run_time=0.25)
            self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.4)
        self.attendre_voix(marge=marge)

    # ── 10 : ce que tu as appris (titre EN HAUT ET CENTRÉ, 24/10) ─────────

    def ecran_appris(self, points, fs=38):
        """points : [(extrait, texte ou mobjet)], une coche devant chacun."""
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        rangs = VGroup()
        for ext, contenu in points:
            corps = contenu if isinstance(contenu, Mobject) else VGroup(
                *[self.t(s, fs) for s in contenu.split("\n")]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            rangs.add(VGroup(self.coche(), corps).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        rangs.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if rangs.width > 11.0:
            rangs.scale_to_fit_width(11.0)
        if rangs.height > 5.6:
            rangs.scale_to_fit_height(5.6)
        rangs.move_to(P(-0.5, -0.35))
        for (ext, _), r in zip(points, rangs):
            self.au_mot(ext) if isinstance(ext, str) else self.au_mot(*ext)
            self.play(Create(r[0]), FadeIn(r[1], shift=RIGHT * 0.2), run_time=0.45)
        self.attendre_voix(marge=0.8)

    # ── 11 : la fin du 26/11 ───────────────────────────────────────────────

    def ecran_fin_2611(self, voix="11-abonne"):
        """« Entraîne-toi sur » / « eleveai.fr » encadré / « ou sur YouTube » / « @eleveai974 »,
        Ti-Margo en bas à droite. Tailles et places de fin_commune.py (style du 24/10)."""
        self.clear()
        self.dire(voix)
        self.add(MascotteMargouillat().scale(0.9).to_corner(DOWN + RIGHT, buff=0.35))
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.45))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.4))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        ytb = self.t("ou sur YouTube", 44, VERT_OK).move_to(P(0, -0.15))
        poignee = self.sans_audit(self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.1)))
        self.au_mot("Entraîne-toi")
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("ou sur YouTube")
        self.play(FadeIn(ytb, shift=UP * 0.15), run_time=0.4)
        self.au_mot("éleveai", n=2)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Indicate(poignee, color=VERT_OK, scale_factor=1.12), run_time=0.5)
        self.attendre_voix(marge=1.4)
