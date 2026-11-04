# denombrement_reconnaitre.py
# EleveAI — Maths Tle spé — paysage « Dénombrer : reconnaître la situation »
# (16:9), ceinture VERTE. Micro du coach : denombrement_reconnaitre
# (lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts, notion
# denombrement_combinatoire). Short jumeau : denombrement_reconnaitre_short.py.
#
# Clé de voix → écran :
#   · 00-accroche  : la carte bancaire, le distributeur, 4 touches usées ;
#   · 01-titre     : page de garde, l'échelle ENTIÈRE (verte), les 2 questions ;
#   · 02-metier    : Inès, ingénieure en cybersécurité ; le pirate et le cadenas ;
#   · 03-k-uplets  : 4 cases, 10 choix chacune, 10⁴ = 10 000 ; nᵏ (bleu) ;
#   · 04/04b       : question-pause n° 1 (10⁶ = 1 000 000 → B) ;
#   · 05-distincts : 10 × 9 × 8 × 7 = 5 040 ; n! / (n − k)! ; 5 040 < 10 000 ;
#   · 06-parties   : les 4 touches usées = une partie (orange) ; 4! = 24 ;
#   · 07-piege     : l'arbre des deux questions (nᵏ, n!/(n − k)!, partie) ;
#   · 08/08b       : question-pause n° 2 (l'équipe = une partie → C) ;
#   · 09/09b       : question-pause n° 3 (le tiercé : 3-uplet distinct → B ;
#                    15 × 14 × 13 = 2 730, le podium qui se compose) ;
#   · 10-conseil   : code long, répétitions, touches propres : × 10 par chiffre ;
#   · 11-appris    : « Ce que tu as appris », titre en haut et centré ;
#   · 12-abonne    : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur (paysage ET short) : bleu = l'ordre compte / k-uplet, orange =
# sans ordre / partie / combinaison, violet = la répétition, vert = résultat
# juste, rouge = piège. Modèles : convexite_tangente.py, loi_normale_escalier.py
# (rien n'en est importé hors des modules communs).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
# ⛔ Rien n'apparaît avant que la voix le dise : au_mot / au_pos (marques mot à
#   mot : denombrement_reconnaitre_marques.json). Audit : AUDIT=1 BORDS=1 … --dry_run.
#
# Voix : manim/voix/terminale-denombrement-reconnaitre.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/denombrement_reconnaitre.py DenombrementReconnaitreTerminale -o eleveai-maths-terminale-denombrement-reconnaitre --media_dir manim/scripts/terminale/media-denombrement-reconnaitre
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-reconnaitre/

import math
import os
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "seconde"))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402

from manim import *  # noqa: E402

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

# ── les nombres dits par la voix, vérifiés ──────────────────────────────────
assert 10 ** 4 == 10000 and 10 ** 6 == 1000000
assert 10 * 9 * 8 * 7 == 5040 == math.perm(10, 4) == math.factorial(10) // math.factorial(6)
assert math.perm(10, 6) == 151200 and math.factorial(4) == 24
assert 15 * 14 * 13 == 2730 == math.perm(15, 3)

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6          # la colonne de droite (marge de 3 % : 0,43 du bord)
ORDRE, PARTIE, REPET = BLEU_CALCUL, ORANGE_RETENUE, VIOLET_ACCENT
USE = "#8B5A2B"                # la trace de doigt sur une touche usée
PEAUX = ["#8d5524", "#c68642", "#e0ac69", "#5c3a1e", "#f1c27d"]


# ── les dessins (pictogrammes simples) ──────────────────────────────────────

def personne(haut=BLEU_CALCUL, peau="#8d5524", cheveux="#1f1308", s=1.0, longs=False):
    """Un buste : tête, cheveux, épaules."""
    tete = Circle(radius=0.3, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    ch = VGroup(Arc(radius=0.32, start_angle=0.15, angle=PI - 0.3, stroke_color=cheveux, stroke_width=11)
                .move_to(tete.get_top() + DOWN * 0.08))
    if longs:
        ch.add(*[RoundedRectangle(width=0.13, height=0.55, corner_radius=0.06, fill_color=cheveux, fill_opacity=1,
                                  stroke_width=0).move_to(P(sx * 0.3, 0.85)) for sx in (-1, 1)])
    buste = RoundedRectangle(width=1.0, height=1.1, corner_radius=0.3, fill_color=haut, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    return VGroup(buste, ch, tete).scale(s)


def cadenas(s=1.0, couleur=GREY_B, ouvert=False):
    corps = RoundedRectangle(width=0.9, height=0.75, corner_radius=0.1, fill_color="#334155", fill_opacity=1,
                             stroke_color=couleur, stroke_width=4)
    anse = Arc(radius=0.3, start_angle=0, angle=PI, stroke_color=couleur, stroke_width=8)
    anse.move_to(corps.get_top() + UP * 0.15 + (UP * 0.18 if ouvert else ORIGIN))
    trou = VGroup(Circle(radius=0.08, fill_color=BLACK, fill_opacity=1, stroke_width=0),
                  Rectangle(width=0.06, height=0.18, fill_color=BLACK, fill_opacity=1, stroke_width=0)
                  .shift(DOWN * 0.1)).move_to(corps.get_center() + DOWN * 0.03)
    return VGroup(anse, corps, trou).scale(s)


def bouclier(s=1.0, couleur=VERT_OK):
    pts = [P(-0.6, 0.55), P(0.6, 0.55), P(0.6, 0.0), P(0, -0.75), P(-0.6, 0.0)]
    b = VMobject(stroke_color=couleur, stroke_width=6, fill_color=couleur, fill_opacity=0.12)
    b.set_points_smoothly(pts + [pts[0]])
    return b.scale(s)


def pirate(s=1.0):
    """Le pirate informatique : capuche sombre, visage dans l'ombre, un portable."""
    capuche = Circle(radius=0.42, fill_color="#1f2937", fill_opacity=1, stroke_color=GREY_D, stroke_width=2)
    capuche.move_to(P(0, 1.0))
    visage = Circle(radius=0.26, fill_color="#0b0f17", fill_opacity=1, stroke_width=0).move_to(P(0, 0.95))
    yeux = VGroup(*[Dot(P(x, 0.98), radius=0.035, color=ROUGE_ERREUR) for x in (-0.09, 0.09)])
    corps = RoundedRectangle(width=1.1, height=1.1, corner_radius=0.3, fill_color="#1f2937", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.05))
    pc = VGroup(Rectangle(width=0.8, height=0.45, fill_color="#334155", fill_opacity=1, stroke_color=GREY_B,
                          stroke_width=2).move_to(P(0, 0.05)),
                Rectangle(width=0.66, height=0.32, fill_color="#16a34a", fill_opacity=0.6, stroke_width=0)
                .move_to(P(0, 0.05)))
    return VGroup(corps, capuche, visage, yeux, pc).scale(s)


def carte_bancaire(s=1.0):
    c = RoundedRectangle(width=2.4, height=1.5, corner_radius=0.14, fill_color="#1e3a8a", fill_opacity=1,
                         stroke_color=BLEU_CALCUL, stroke_width=3)
    puce = RoundedRectangle(width=0.42, height=0.32, corner_radius=0.05, fill_color="#FCD34D", fill_opacity=1,
                            stroke_width=0).move_to(c.get_left() + RIGHT * 0.5 + UP * 0.15)
    bande = VGroup(*[RoundedRectangle(width=0.36, height=0.08, corner_radius=0.03, fill_color=GREY_B,
                                      fill_opacity=0.7, stroke_width=0) for _ in range(4)])
    bande.arrange(RIGHT, buff=0.1).move_to(c.get_center() + DOWN * 0.35)
    return VGroup(c, puce, bande).scale(s)


def clavier(s=1.0):
    """Le clavier du distributeur : 1 2 3 / 4 5 6 / 7 8 9 / 0. Les chiffres des
    touches sont des données de la figure (pas des nombres dits)."""
    touches = {}
    g = VGroup()
    for k, ch in enumerate("1234567890"):
        r, c = (k // 3, k % 3) if k < 9 else (3, 1)
        fond = RoundedRectangle(width=0.62, height=0.5, corner_radius=0.08, fill_color="#475569", fill_opacity=1,
                                stroke_color=GREY_B, stroke_width=2).move_to(P(c * 0.74, -r * 0.62))
        t = Text(ch, font_size=30, color=WHITE)
        t._pas_audit = True
        t.move_to(fond)
        touches[ch] = VGroup(fond, t)
        g.add(touches[ch])
    g.scale(s)
    g.touches = touches
    return g


def distributeur(s=1.0):
    """Le distributeur : la façade, l'écran, la fente, et le clavier."""
    face = RoundedRectangle(width=3.2, height=4.0, corner_radius=0.2, fill_color="#1f2937", fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=3)
    ecran = RoundedRectangle(width=2.4, height=1.0, corner_radius=0.08, fill_color="#0c4a6e", fill_opacity=1,
                             stroke_color=BLEU_CALCUL, stroke_width=2).move_to(face.get_top() + DOWN * 0.75)
    fente = RoundedRectangle(width=1.2, height=0.12, corner_radius=0.05, fill_color=BLACK, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=1.5).next_to(ecran, DOWN, buff=0.22)
    cl = clavier(0.82).next_to(fente, DOWN, buff=0.25)
    g = VGroup(face, ecran, fente, cl).scale(s)
    g.clavier = cl
    return g


def cases(n, larg=0.95, haut=1.0, buff=0.18, couleur=ORDRE):
    """Les n cases d'un code (ou d'un k-uplet), côte à côte."""
    return VGroup(*[RoundedRectangle(width=larg, height=haut, corner_radius=0.1, stroke_color=couleur,
                                     stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)
                    for _ in range(n)]).arrange(RIGHT, buff=buff)


def cheval(couleur="#8B5A2B", s=1.0, casaque=BLEU_CALCUL):
    """Un cheval de course de profil (vers la droite) et son jockey."""
    corps = Ellipse(width=0.9, height=0.38, fill_color=couleur, fill_opacity=1, stroke_width=0)
    cou = Polygon(P(0.28, 0.08), P(0.42, 0.42), P(0.55, 0.36), P(0.42, -0.02), fill_color=couleur,
                  fill_opacity=1, stroke_width=0)
    tete = Ellipse(width=0.32, height=0.16, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tete.rotate(-0.5).move_to(P(0.58, 0.36))
    jambes = VGroup(*[Line(P(x, -0.12), P(x + dx, -0.48), stroke_width=4, color=couleur)
                      for x, dx in ((-0.3, -0.06), (-0.18, 0.05), (0.2, -0.04), (0.3, 0.08))])
    queue = Line(P(-0.44, 0.06), P(-0.6, -0.2), stroke_width=4, color="#3b2412")
    jockey = VGroup(RoundedRectangle(width=0.2, height=0.22, corner_radius=0.06, fill_color=casaque,
                                     fill_opacity=1, stroke_width=0).move_to(P(0.02, 0.3)),
                    Circle(radius=0.07, fill_color=casaque, fill_opacity=1, stroke_width=0).move_to(P(0.06, 0.48)))
    return VGroup(queue, jambes, corps, cou, tete, jockey).scale(s)


def podium(s=1.0):
    """Le podium : 2e à gauche, 1er au centre, 3e à droite."""
    hs = {1: 1.0, 2: 0.7, 3: 0.45}
    xs = {1: 0.0, 2: -1.1, 3: 1.1}
    marches = {}
    for k in (1, 2, 3):
        r = Rectangle(width=1.05, height=hs[k], fill_color="#334155", fill_opacity=1, stroke_color=GREY_B,
                      stroke_width=2).move_to(P(xs[k], hs[k] / 2))
        n = Text(("1er", "2e", "3e")[k - 1], font_size=26, color=WHITE)
        n._pas_audit = True
        marches[k] = VGroup(r, n.move_to(r))
    g = VGroup(marches[2], marches[1], marches[3]).scale(s)
    g.marches = marches
    return g


class DenombBase(AuditSynchro, MotsCales, Notion6e):
    """Les outils communs aux paysages de MES deux micros (reconnaitre,
    produit-somme) : texte, colonne, synchro mot à mot, question-pause, fin."""
    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def col(self, mob, y, xl=XL):
        """La colonne de droite : alignée à gauche sur xl, jamais près du bord."""
        mob.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        if mob.get_right()[0] > BORD_X:
            mob.scale_to_fit_width(BORD_X - xl).align_to(P(xl, 0), LEFT)
        if mob.get_bottom()[1] < -1.95 and mob.get_right()[0] > 5.3:  # Ti-Margo
            mob.scale_to_fit_width(5.3 - xl).align_to(P(xl, 0), LEFT)
        return mob

    def ligne(self, *morceaux, y, xl=XL, buff=0.15):
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff)
        return self.col(g, y, xl)

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pastille_num(self, k, color=BLEU_CALCUL, r=0.24):
        """Le numéro d'une question (pas un nombre dit)."""
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def fois(self, *termes, fs=44, color=WHITE, signe="×"):
        """« 10 × 10 × 10 × 10 » : les termes et les signes, chacun un Text."""
        g = VGroup()
        for k, x in enumerate(termes):
            if k:
                g.add(self.t(signe, fs, color))
            g.add(x if isinstance(x, Mobject) else self.t(x, fs, color))
        return g.arrange(RIGHT, buff=0.18)

    def fraction(self, haut, bas, fs=40, color=WHITE):
        """n! sur (n − k)! : deux Text et une barre."""
        h, b = self.t(haut, fs, color), self.t(bas, fs, color)
        barre = Line(LEFT, RIGHT, color=color, stroke_width=3).set_width(max(h.width, b.width) + 0.2)
        return VGroup(h, barre, b).arrange(DOWN, buff=0.1)

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin bas-droit, à 0,45 du bord (3 % de la largeur)."""
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i."""
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.07)  # + 1 image : jamais une image d'avance

    def au_mot(self, extrait, n=1):
        """au_mot sur la n-ième occurrence de l'extrait."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    def au_nb(self, contexte, nb, n=1):
        """Attend le NOMBRE nb dit juste après la n-ième occurrence de contexte."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(contexte, i + 1)
            if i < 0:
                raise ValueError(f"« {contexte} » (n = {n}) absent de la voix")
        j = self._texte_voix.find(nb, i)
        assert j >= 0, (contexte, nb)
        self.au_pos(j)

    def _bords(self):
        super()._bords()
        margo = getattr(self, "_margo", None)
        if margo is None or margo not in self.mobjects:
            return
        for m in self.mobjects:
            if m is margo or m.width == 0 or m.width > 9:
                continue
            if m.get_right()[0] > margo.get_left()[0] - 0.05 and m.get_bottom()[1] < margo.get_top()[1] + 0.05:
                print(f"MARGO {getattr(self, '_cle_voix', '?')} t={self.renderer.time:.1f} {type(m).__name__} "
                      f"x[{m.get_left()[0]:.2f}, {m.get_right()[0]:.2f}] y[{m.get_bottom()[1]:.2f}, "
                      f"{m.get_top()[1]:.2f}]", flush=True)

    # ── la question-pause (modèle : convexite_tangente.py) ─────────────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix, xl=XL, largeur=4.1, fs_q=32, fs_c=32):
        """« Question ! » + compte à rebours, la question (lignes), les cartes,
        la consigne. Rien n'est joué ici."""
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15, xl)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, fs_q) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0, xl)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c, largeur, fs_c) for l, c in zip("ABC", choix)])
        cartes.arrange(DOWN, buff=0.16)
        self.col(cartes, 0, xl)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.t("Mets pause, et choisis !", 38, ORANGE_RETENUE).move_to(P(-3.4, -2.8))
        return tete, q, cartes, pause, rebours

    def q_montrer_choix(self, cartes):
        """Chaque carte À SA LETTRE, son contenu au PREMIER MOT de ce contenu."""
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            fin = min([x for x in (voix.find(". ", i), voix.find("Mets", i)) if x > 0] or [len(voix)])
            chiffre = next((j for j in range(i + 4, fin) if voix[j].isdigit()), None)
            self.au_pos(chiffre if chiffre is not None else i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)

    def un_par_un(self, chiffres, extrait):
        """« 1 4 7 9 » : chaque chiffre à SON mot."""
        i = self.ip(extrait)
        for k, c in enumerate(chiffres):
            self.au_pos(i + 2 * k)
            self.play(FadeIn(c, scale=1.4), run_time=0.1)

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

    # ── la page de garde, « Ce que tu as appris », la fin ─────────────────

    def garde(self, cle, titre, mot_titre, questions):
        """questions : [(mot de la voix, texte, couleur, numéro ou None)]."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(cle)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t(titre, 54, JAUNE_TITRE, larg=12.4).to_edge(UP, buff=0.5)
        self.au_mot(mot_titre)
        self.play(Write(tit), run_time=0.8)
        ident = self.t(self.identite, 26, GREY_A).next_to(tit, DOWN, buff=0.18)
        self.play(FadeIn(ident), run_time=0.3)
        lignes = VGroup()
        for mot, texte, color, num in questions:
            tx = self.t(texte, 46, color)
            lg = VGroup(self.pastille_num(num, color, 0.3), tx).arrange(RIGHT, buff=0.3) if num else VGroup(tx)
            lignes.add(lg)
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to(P(-0.6, 0.35))
        for (mot, *_), lg in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=RIGHT * 0.2), run_time=0.45)
            self.insister(lg, 1.08)
        self.attendre_voix(marge=0.9)

    def appris(self, cle, points, fs=36):
        """points : une ligne = [(mot de la voix, texte ou Mobject, couleur)] ;
        chaque morceau apparaît à SON mot (la coche avec le premier)."""
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire(cle)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in points:
            b = VGroup(*[tx if isinstance(tx, Mobject) else self.t(tx, fs, c) for _, tx, c in morceaux])
            b.arrange(RIGHT, buff=0.2)
            lignes.add(VGroup(self.coche(), b).arrange(RIGHT, buff=0.3))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.35, -0.15))
        if lignes.get_bottom()[1] < -3.2:
            lignes.shift(UP * (-3.2 - lignes.get_bottom()[1]))
        for morceaux, lg in zip(points, lignes):
            for k, (mot, _, _) in enumerate(morceaux):
                self.au_mot(mot)
                anims = [FadeIn(lg[1][k], shift=RIGHT * 0.2)]
                if k == 0:
                    anims.append(Create(lg[0]))
                self.play(*anims, run_time=0.4)
        self.attendre_voix(marge=0.8)

    def page_abonnement(self, voix="12-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK, audit=False).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def ip(self, extrait, n=1, depuis=0):
        """La position de la n-ième occurrence de l'extrait dans la voix."""
        i = depuis - 1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        return i


class DenombrementReconnaitreTerminale(DenombBase):
    fichier_marques = "denombrement_reconnaitre_marques.json"
    nom_voix = "terminale-denombrement-reconnaitre"

    def chiffres_dans(self, boites, chaine, fs=48, color=WHITE, audit=True):
        """Un chiffre par case (les espaces de la chaîne sont ignorés)."""
        g = VGroup()
        for b, ch in zip(boites, chaine.replace(" ", "")):
            g.add(self.t(ch, fs, color, audit=audit).move_to(b))
        return g

    # ── 00 : la carte, le distributeur, les 4 touches usées ────────────────

    def ecran_accroche(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("00-accroche")
        carte = carte_bancaire(1.1).move_to(P(-4.4, 1.9))
        self.au_mot("Le code")
        self.play(FadeIn(carte, shift=RIGHT * 0.3), run_time=0.5)
        bx = cases(4, 0.7, 0.8, 0.14).move_to(P(-4.4, 0.2))
        pts = VGroup(*[Dot(b.get_center(), radius=0.09, color=WHITE) for b in bx])
        l4 = self.t("4 chiffres", 34, ORDRE).next_to(bx, DOWN, buff=0.25)
        self.au_mot("4 chiffres")
        self.play(LaggedStart(*[FadeIn(b, scale=1.3) for b in bx], lag_ratio=0.12), FadeIn(pts),
                  FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        dab = distributeur(0.85).move_to(P(3.3, 0.55))
        self.au_mot("Sur le clavier")
        self.play(FadeIn(dab, shift=LEFT * 0.3), run_time=0.6)
        self.bring_to_front(margo)
        self.au_mot("4 touches")
        tch = dab.clavier.touches
        usees = VGroup(*[tch[c] for c in "1479"])
        traces = VGroup(*[Ellipse(width=0.36, height=0.24, fill_color=USE, fill_opacity=0.85, stroke_width=0)
                          .move_to(tch[c][0]).shift(P(0.05, -0.03)) for c in "1479"])
        lu = self.t("4 touches usées", 32, USE).set_color("#D2A06A").next_to(dab, LEFT, buff=0.35).shift(DOWN * 0.9)
        self.play(*[tch[c][0].animate.set_fill("#6B4F3A") for c in "1479"], FadeIn(traces),
                  FadeIn(lu, shift=RIGHT * 0.1), run_time=0.4)
        self.bring_to_front(*[tch[c][1] for c in "1479"])
        self.play(Indicate(usees, color="#D2A06A", scale_factor=1.15), run_time=0.6)
        self.au_mot("Pour un voleur")
        vol = pirate(0.9).move_to(P(-0.9, 1.6))
        self.play(FadeIn(vol, shift=UP * 0.2), run_time=0.45)
        self.au_mot("bonne nouvelle")
        q = self.t("Une bonne nouvelle pour lui ?", 42, ORANGE_RETENUE).move_to(P(-1.2, -2.55))
        self.play(FadeIn(q, scale=1.2), run_time=0.45)
        self.insister(q, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        self.garde("01-titre", "Dénombrer : reconnaître la situation", "Dénombrer",
                   [("L'ordre compte", "L'ordre compte-t-il ?", ORDRE, 1),
                    ("Peut-on répéter", "Peut-on répéter ?", REPET, 2)])

    # ── 02 : Inès, le pirate, le cadenas, les deux questions ───────────────

    def ecran_metier(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("02-metier")
        ines = personne(VERT_OK, PEAUX[1], "#2b1a0e", 0.85, longs=True).move_to(P(-5.55, 2.25))
        nom = self.t("Inès", 42, BLEU_CALCUL).move_to(P(0, 2.75)).align_to(P(-4.7, 0), LEFT)
        met = self.t("ingénieure en cybersécurité", 32).move_to(P(0, 2.1)).align_to(P(-4.7, 0), LEFT)
        self.au_mot("Inès")
        self.play(FadeIn(ines, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("ingénieure")
        self.play(FadeIn(met, shift=RIGHT * 0.15), run_time=0.45)
        cad = cadenas(1.2).move_to(P(2.6, 0.75))
        self.au_mot("compter combien de codes")
        self.play(FadeIn(cad, scale=1.3), run_time=0.45)
        vol = pirate(0.85).move_to(P(5.6, 0.85))
        self.au_mot("un pirate")
        self.play(FadeIn(vol, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("devrait essayer")
        for k in range(4):
            essai = VGroup(RoundedRectangle(width=0.8, height=0.32, corner_radius=0.06, fill_color=FOND_CARTE,
                                            fill_opacity=1, stroke_color=ROUGE_ERREUR, stroke_width=2),
                           *[Dot(radius=0.04, color=WHITE).shift(RIGHT * (j - 1.5) * 0.16) for j in range(4)])
            essai.move_to(vol.get_left() + P(-0.2, 0.25 - 0.15 * k))
            self.add(essai)
            self.play(essai.animate.move_to(cad.get_right() + P(0.45, 0.1)), run_time=0.3)
            x = Cross(essai, stroke_color=ROUGE_ERREUR, stroke_width=4)
            self.play(FadeIn(x), run_time=0.12)
            self.remove(essai, x)
        self.au_mot("Plus il y en a")
        bc = bouclier(1.75).move_to(cad.get_center() + DOWN * 0.05)
        lp = self.t("Plus de codes : plus protégé", 32, VERT_OK).move_to(P(3.3, -1.0))
        self.play(GrowFromCenter(bc), run_time=0.6)
        self.au_mot("plus tu es protégé")
        self.play(FadeIn(lp, shift=UP * 0.1), Indicate(bc, color=VERT_OK, scale_factor=1.08), run_time=0.6)
        self.au_mot("deux questions")
        dq = self.t("Avant de compter, deux questions :", 34, JAUNE_TITRE).move_to(P(0, -1.75))
        dq.align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(dq, shift=RIGHT * 0.15), run_time=0.4)
        for mot, texte, color, k, y in (("Un :", "L'ordre compte-t-il ?", ORDRE, 1, -2.45),
                                        ("Deux :", "Peut-on répéter un élément ?", REPET, 2, -3.1)):
            lg = VGroup(self.pastille_num(k, color), self.t(texte, 36, color)).arrange(RIGHT, buff=0.25)
            lg.move_to(P(0, y)).align_to(P(-5.8, 0), LEFT)
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=RIGHT * 0.2), run_time=0.4)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 03 : premier cas, l'ordre compte, on peut répéter : 10⁴ ────────────

    def ecran_k_uplets(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-k-uplets")
        tit = self.t("Premier cas", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Premier cas")
        self.play(Write(tit), run_time=0.5)
        y1 = 2.0
        rA = cases(4, 0.68, 0.72, 0.1).move_to(P(-4.35, y1))
        rB = cases(4, 0.68, 0.72, 0.1).move_to(P(0.15, y1))
        rC = cases(4, 0.68, 0.72, 0.1, REPET).move_to(P(4.6, y1))
        l4 = self.t("4 chiffres", 30, GREY_A).next_to(rA, UP, buff=0.15)
        self.au_mot("4 chiffres")
        self.play(LaggedStart(*[FadeIn(b, scale=1.3) for b in rA], lag_ratio=0.1), FadeIn(l4), run_time=0.45)
        self.au_mot("L'ordre compte")
        lo = self.t("l'ordre compte", 32, ORDRE).move_to(P(-2.1, y1 - 0.85))
        self.play(FadeIn(lo, shift=UP * 0.1), run_time=0.3)
        cA = self.chiffres_dans(rA, "1 4 7 9", 40, ORDRE)
        self.un_par_un(cA, "1 4 7 9")
        cB = self.chiffres_dans(rB, "9 7 4 1", 40, ORDRE)
        dif = self.t("≠", 56, ROUGE_ERREUR).move_to(P(-2.1, y1))
        self.au_mot("ce n'est pas")
        self.play(FadeIn(rB), FadeIn(dif, scale=1.5), run_time=0.3)
        self.un_par_un(cB, "9 7 4 1")
        self.au_mot("on peut répéter")
        lr = self.t("on peut répéter", 32, REPET).move_to(P(4.6, y1 - 0.85))
        self.play(FadeIn(rC), FadeIn(lr, shift=UP * 0.1), run_time=0.35)
        cC = self.chiffres_dans(rC, "7 7 7 7", 40, REPET)
        self.un_par_un(cC, "7 7 7 7")
        ok = self.coche(VERT_OK, 0.2).next_to(rC, UP, buff=0.15)
        self.au_mot("est permis")
        self.play(Create(ok), run_time=0.3)
        # les 10 choix par case, le produit dessous, aligné case par case
        v = self._texte_voix
        prod = self.fois("10", "10", "10", "10", fs=42).move_to(P(-3.2, -1.55))
        grosses = VGroup(*[RoundedRectangle(width=0.95, height=0.85, corner_radius=0.1, stroke_color=ORDRE,
                                            stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)
                           .move_to(P(prod[2 * k].get_center()[0], -0.3)) for k in range(4)])
        roues = VGroup(*[VGroup(*[Line(P(-0.25, 0), P(0.25, 0), stroke_width=2, color=GREY_B)
                                  .shift(UP * (j - 2) * 0.13) for j in range(5)]).move_to(b) for b in grosses])
        dix = self.t("10 choix par case", 30, ORDRE).next_to(grosses, UP, buff=0.18)
        self.au_mot("Chaque chiffre")
        self.play(LaggedStart(*[FadeIn(b, scale=1.2) for b in grosses], lag_ratio=0.1), FadeIn(roues), run_time=0.45)
        self.au_nb("Chaque chiffre a", "10")
        self.play(FadeIn(dix, shift=DOWN * 0.1), *[r.animate.shift(DOWN * 0.08) for r in roues], run_time=0.35)
        for k in range(3):  # les marques des deux derniers « 10 » sont confondues : un seul geste
            self.au_pos(self.ip("10", k + 2))
            ks = (k,) if k < 2 else (2, 3)
            anims = [FadeIn(prod[2 * j - 1]) for j in ks if j]
            anims += [a for j in ks for a in (FadeIn(prod[2 * j], shift=UP * 0.15),
                                              grosses[j].animate.set_fill(ORDRE, 0.35))]
            self.play(*anims, run_time=0.15)
        p4 = VGroup(self.t("=", 42), puissance("10", "4", 42, WHITE)).arrange(RIGHT, buff=0.18)
        p4.next_to(prod, RIGHT, buff=0.2)
        self.au_pos(self.ip("10", 6))
        self.play(FadeIn(p4[0]), FadeIn(p4[1][0], shift=LEFT * 0.1), run_time=0.3)
        self.au_pos(self.ip("4", 1, v.find("puissance")))
        self.play(FadeIn(p4[1][1], scale=1.4), run_time=0.25)
        res = VGroup(self.t("=", 46, VERT_OK), self.t("10 000 codes", 46, VERT_OK)).arrange(RIGHT, buff=0.2)
        res.next_to(prod, DOWN, buff=0.35).align_to(prod, LEFT)
        self.au_mot("10 000")
        cad = SurroundingRectangle(res, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(res, scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(res, cad), 1.1)
        # la définition, à droite
        d1 = self.col(VGroup(self.t("Un code =", 34), self.t("un 4-uplet de chiffres", 34, ORDRE))
                      .arrange(DOWN, aligned_edge=LEFT, buff=0.1), 0.05, 1.7)
        self.au_mot("4-uplet")
        self.play(FadeIn(d1, shift=RIGHT * 0.15), run_time=0.4)
        d2 = VGroup(self.t("Nombre de k-uplets", 32), self.t("d'un ensemble à n éléments :", 32))
        d2.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(d2, -1.2, 1.7)
        self.au_mot("Le nombre de k-uplets")
        self.play(FadeIn(d2, shift=RIGHT * 0.15), run_time=0.4)
        nk = puissance("n", "k", 64, VERT_OK).move_to(P(3.4, -2.55))
        self.au_mot("n puissance k")
        cnk = SurroundingRectangle(nk, color=VERT_OK, buff=0.2, stroke_width=3)
        self.play(FadeIn(nk, scale=1.4), Create(cnk), run_time=0.45)
        self.insister(VGroup(nk, cnk), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : un code de 6 chiffres ───────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Un code de 6 chiffres,", "répétitions permises.", "Combien de codes ?"],
            ["60", "1 000 000", "151 200"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        six = cases(6, 0.68, 0.8, 0.1).move_to(P(-3.55, 1.4))
        self.au_nb("Un code de", "6")
        self.play(FadeIn(q[0], shift=UP * 0.1), LaggedStart(*[FadeIn(b, scale=1.3) for b in six], lag_ratio=0.08),
                  run_time=0.5)
        rep = self.t("répétitions permises", 32, REPET).next_to(six, DOWN, buff=0.3)
        self.au_mot("répétitions permises")
        self.play(FadeIn(q[1], shift=UP * 0.1), FadeIn(rep, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de codes")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "04-question", t0, 1)
        self.dire("04b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        dix = VGroup(*[self.t("10", 28, ORDRE).next_to(b, UP, buff=0.12) for b in six])
        self.au_mot("10 choix")
        self.play(LaggedStart(*[FadeIn(d, shift=DOWN * 0.1) for d in dix], lag_ratio=0.08), run_time=0.5)
        p6 = VGroup(puissance("10", "6", 50, VERT_OK), self.t("=", 46, VERT_OK)).arrange(RIGHT, buff=0.2)
        p6.move_to(P(-3.55, -0.65))
        self.au_mot("10 puissance 6")
        self.play(FadeIn(p6[0][0], shift=UP * 0.1), run_time=0.3)
        self.au_nb("10 puissance", "6")
        self.play(FadeIn(p6[0][1], scale=1.4), FadeIn(p6[1]), run_time=0.3)
        val = self.t("1 000 000", 50, VERT_OK).next_to(p6, RIGHT, buff=0.2)
        VGroup(p6, val).move_to(P(-3.55, -0.65))
        self.au_mot("1 000 000")
        cad = SurroundingRectangle(VGroup(p6, val), color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(val, scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(p6, val, cad), 1.1)
        pg = VGroup(self.t("151 200 :", 30, ROUGE_ERREUR), self.t("c'est sans répétition", 30, ROUGE_ERREUR))
        pg.arrange(RIGHT, buff=0.15).move_to(P(-3.3, -1.9))
        self.au_mot("151 200")
        self.play(FadeIn(pg[0], shift=RIGHT * 0.1), Indicate(cartes[2], color=ROUGE_ERREUR, scale_factor=1.05),
                  run_time=0.5)
        self.au_mot("c'est sans répétition")
        self.play(FadeIn(pg[1], shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("ce n'était pas")
        hors = self.t("pas la question", 30, GREY_A).next_to(pg, DOWN, buff=0.2)
        self.play(FadeIn(hors, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 05 : deuxième cas : sans répétition : 10 × 9 × 8 × 7 ────────────────

    def ecran_distincts(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-distincts")
        tit = self.t("Deuxième cas", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Deuxième cas")
        self.play(Write(tit), run_time=0.5)
        l1 = self.t("répéter : interdit", 32, ROUGE_ERREUR).move_to(P(0, 2.45)).align_to(P(-6.1, 0), LEFT)
        self.au_mot("interdit de répéter")
        self.play(FadeIn(l1, shift=RIGHT * 0.1), run_time=0.35)
        l2 = self.t("l'ordre compte encore", 32, ORDRE).move_to(P(0, 2.45)).align_to(P(-1.6, 0), LEFT)
        self.au_mot("L'ordre compte encore")
        self.play(FadeIn(l2, shift=RIGHT * 0.1), run_time=0.35)
        bx = cases(4, 1.0, 0.9, 0.35).move_to(P(-3.4, 1.35))
        self.play(LaggedStart(*[FadeIn(b, scale=1.2) for b in bx], lag_ratio=0.1), run_time=0.4)
        # sous chaque case, les touches encore libres : 10, 9, 8, 7 ronds
        libres = []
        for k, b in enumerate(bx):
            g = VGroup(*[Dot(radius=0.07, color=ORDRE) for _ in range(10 - k)])
            g.arrange_in_grid(2, 5, buff=0.09).next_to(b, DOWN, buff=0.15).align_to(b, LEFT).shift(RIGHT * 0.08)
            libres.append(g)
        nb = [self.t(str(10 - k), 46, ORDRE).move_to(b) for k, b in enumerate(bx)]
        prod = self.fois("10", "9", "8", "7", fs=42).move_to(P(-3.9, -0.55))
        for k, (n, mot) in enumerate(zip(("10", "9", "8", "7"), ("10 choix", "9 pour", "8 pour", "7 pour"))):
            self.au_mot(mot)
            anims = [FadeIn(nb[k], scale=1.3), FadeIn(libres[k]), FadeIn(prod[2 * k], shift=UP * 0.1)]
            if k:
                anims += [FadeIn(prod[2 * k - 1])]
            self.play(*anims, run_time=0.3)
            if k < 3:
                perdu = libres[k][-1].copy().set_color(ROUGE_ERREUR)
                self.play(Flash(perdu, color=ROUGE_ERREUR, line_length=0.12), run_time=0.25)
        res = VGroup(self.t("=", 44, VERT_OK), self.t("5 040 codes", 44, VERT_OK)).arrange(RIGHT, buff=0.18)
        res.next_to(prod, RIGHT, buff=0.2)
        self.au_mot("5 040 codes")
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        self.insister(res, 1.12)
        d1 = VGroup(self.t("un 4-uplet", 34, ORDRE), self.t("d'éléments distincts", 34, ORDRE))
        d1.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        self.col(d1, 1.55, 2.4)
        self.au_mot("4-uplet")
        self.play(FadeIn(d1, shift=RIGHT * 0.15), run_time=0.4)
        fr = self.fraction("n!", "(n − k)!", 46, VERT_OK).move_to(P(4.2, -0.45))
        avec = self.col(self.t("Avec n éléments :", 32), 0.55, 2.4)
        self.au_mot("Avec n éléments")
        self.play(FadeIn(avec, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("n factorielle")
        self.play(FadeIn(fr[0], shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("sur n moins k")
        cfr = SurroundingRectangle(fr, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.1), Create(cfr), run_time=0.45)
        # la surprise : moins de codes
        sur = self.t("Surprise !", 40, ORANGE_RETENUE).move_to(P(-4.7, -1.65))
        self.au_mot("Surprise")
        self.play(FadeIn(sur, scale=1.3), run_time=0.35)
        ff = self.t("le code est plus faible", 32, ROUGE_ERREUR).next_to(sur, RIGHT, buff=0.4)
        self.au_mot("affaiblit")
        self.play(FadeIn(ff, shift=RIGHT * 0.1), run_time=0.35)
        x0, L = -5.9, 6.4
        b1 = Rectangle(width=L * 0.504, height=0.4, fill_color=ORDRE, fill_opacity=0.85, stroke_width=0)
        b1.move_to(P(x0 + L * 0.252, -2.4))
        b2 = Rectangle(width=L, height=0.4, fill_color=REPET, fill_opacity=0.85, stroke_width=0)
        b2.move_to(P(x0 + L / 2, -3.0))
        e1 = self.t("5 040", 30, ORDRE).next_to(b1, RIGHT, buff=0.15)
        e2 = self.t("10 000", 30, REPET).next_to(b2, RIGHT, buff=0.15)
        self.au_mot("5 040 au lieu")
        self.play(GrowFromEdge(b1, LEFT), FadeIn(e1), run_time=0.4)
        self.au_mot("10 000")
        self.play(GrowFromEdge(b2, LEFT), FadeIn(e2), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 06 : troisième cas : les 4 touches usées = une partie ; 4! = 24 ─────

    def ecran_parties(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-parties")
        tit = self.t("Troisième cas", 44, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("Troisième cas")
        self.play(Write(tit), run_time=0.5)
        cl = clavier(0.95).move_to(P(-5.0, 1.15))
        tch = cl.touches
        self.au_mot("les 4 touches")
        traces = VGroup(*[Ellipse(width=0.34, height=0.22, fill_color=USE, fill_opacity=0.85, stroke_width=0)
                          .move_to(tch[c][0]).shift(P(0.05, -0.03)) for c in "1479"])
        self.play(FadeIn(cl, shift=RIGHT * 0.2), run_time=0.4)
        self.play(*[tch[c][0].animate.set_fill("#6B4F3A") for c in "1479"], FadeIn(traces), run_time=0.35)
        self.bring_to_front(*[tch[c][1] for c in "1479"])
        sac = Ellipse(width=2.6, height=1.9, stroke_color=PARTIE, stroke_width=5, fill_color=PARTIE,
                      fill_opacity=0.08).move_to(P(-1.25, 1.35))
        pos = [P(-1.85, 1.75), P(-0.65, 1.8), P(-1.75, 0.9), P(-0.6, 0.95)]
        dans = [self.t(c, 44, PARTIE, audit=False).move_to(p) for c, p in zip("1479", pos)]  # calés à la main
        self.au_mot("Le pirate sait")
        self.play(Create(sac), run_time=0.4)
        v = self._texte_voix
        dep = v.find("le code :")
        for c, d in zip("1479", dans):
            self.au_pos(v.find(c, dep))
            src = tch[c][1].copy()
            self.play(Transform(src, d), Indicate(tch[c], color=PARTIE, scale_factor=1.15), run_time=0.3)
            self.remove(src)
            self.add(d)
        lp = self.t("une partie du clavier", 32, PARTIE).next_to(sac, DOWN, buff=0.2)
        self.au_mot("une partie du clavier")
        self.play(FadeIn(lp, shift=UP * 0.1), run_time=0.35)
        lo = self.t("ni ordre, ni répétition", 30, PARTIE).next_to(lp, DOWN, buff=0.15)
        self.au_mot("l'ordre ne compte pas")
        self.play(FadeIn(lo, shift=UP * 0.1), run_time=0.35)
        # ranger les 4 chiffres : 4 × 3 × 2 × 1
        bx = cases(4, 0.8, 0.8, 0.15).move_to(P(3.8, 2.05))
        lr = self.t("les ranger :", 32, ORDRE).next_to(bx, DOWN, buff=0.2)
        self.au_mot("les ranger")
        self.play(LaggedStart(*[FadeIn(b, scale=1.2) for b in bx], lag_ratio=0.1), FadeIn(lr), run_time=0.45)
        prod = self.fois("4", "3", "2", "1", fs=42).next_to(lr, DOWN, buff=0.25).align_to(bx, LEFT)
        dep = v.find("4 fois")
        for k, n in enumerate("4321"):
            self.au_pos(v.find(n, dep))
            dep = v.find(n, dep) + 1
            anims = [FadeIn(prod[2 * k], shift=UP * 0.1), Indicate(bx[k], color=ORDRE, scale_factor=1.12)]
            if k:
                anims.append(FadeIn(prod[2 * k - 1]))
            self.play(*anims, run_time=0.25)
        f4 = VGroup(self.t("=", 38), self.t("4!", 40, ORDRE)).arrange(RIGHT, buff=0.15)
        f4.next_to(prod, DOWN, buff=0.3).align_to(prod, LEFT)
        self.au_mot("4 factorielle")
        self.play(FadeIn(f4, shift=LEFT * 0.1), run_time=0.35)
        r24 = VGroup(self.t("=", 38, VERT_OK), self.t("24 codes", 38, VERT_OK)).arrange(RIGHT, buff=0.15)
        r24.next_to(f4, RIGHT, buff=0.2)
        # les 24 rangements des 4 chiffres, en grille (données déjà dites)
        from itertools import permutations
        minis = VGroup(*[self.t("".join(p), 28, GREY_A, audit=False) for p in permutations("1479")])
        minis.arrange_in_grid(3, 8, buff=(0.42, 0.22)).move_to(P(-0.7, -1.6))
        self.au_mot("24 codes")
        cad = SurroundingRectangle(r24, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(r24, scale=1.3), Create(cad),
                  LaggedStart(*[FadeIn(m, scale=1.4) for m in minis], lag_ratio=0.03), run_time=0.9)
        self.au_mot("On passe de")
        fin = VGroup(self.t("10 000", 44, REPET), Arrow(LEFT, RIGHT, color=WHITE, buff=0).scale(0.6),
                     self.t("24", 52, ROUGE_ERREUR)).arrange(RIGHT, buff=0.3).move_to(P(-0.9, -3.05))
        self.play(FadeIn(fin[0], shift=RIGHT * 0.1), run_time=0.3)
        self.au_nb("passe de", "24")
        self.play(GrowArrow(fin[1]), FadeIn(fin[2], scale=1.5), run_time=0.4)
        self.insister(fin[2], 1.4)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège, et l'arbre des deux questions ───────────────────────

    def boite(self, contenu, color, pad=0.22):
        c = contenu if isinstance(contenu, Mobject) else self.t(contenu, 30, color)
        r = SurroundingRectangle(c, color=color, buff=pad, corner_radius=0.12, stroke_width=4)
        r.set_fill(FOND_CARTE, 1)
        return VGroup(r, c)

    def fleche(self, a, b, mot, color=WHITE, cote=UP):
        f = Arrow(a, b, buff=0.05, color=color, stroke_width=4, max_tip_length_to_length_ratio=0.15)
        l = self.t(mot, 26, color, audit=False).next_to(f.get_center(), cote, buff=0.12)
        return f, l

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-piege")
        tit = self.t("Voilà le piège !", 46, ROUGE_ERREUR).to_edge(UP, buff=0.5)
        self.au_mot("Voilà le piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.45)
        lire = self.t("« 4 chiffres »", 34).move_to(P(-3.0, 2.35))
        self.au_nb("Lire", "4")
        self.play(FadeIn(lire, shift=RIGHT * 0.1), run_time=0.3)
        f0 = Arrow(lire.get_right(), lire.get_right() + RIGHT * 1.2, buff=0.15, color=ROUGE_ERREUR, stroke_width=4)
        form = self.t("une formule, vite !", 34, ROUGE_ERREUR).next_to(f0, RIGHT, buff=0.15)
        self.au_mot("foncer")
        self.play(GrowArrow(f0), FadeIn(form, shift=RIGHT * 0.1), run_time=0.4)
        x = Cross(VGroup(lire, f0, form), stroke_color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(x), run_time=0.35)
        racine = self.boite(self.t("L'ordre compte-t-il ?", 28, ORDRE), ORDRE).move_to(P(-4.25, -0.35))
        q2 = self.boite(self.t("Peut-on répéter ?", 28, REPET), REPET).move_to(P(0.45, 1.15))
        self.au_mot("Avant tout calcul")
        self.play(VGroup(lire, f0, form, x).animate.set_opacity(0.35), run_time=0.3)
        self.au_mot("les deux questions")
        self.play(FadeIn(racine, shift=RIGHT * 0.15), FadeIn(q2, shift=RIGHT * 0.15), run_time=0.45)
        nk = self.boite(puissance("n", "k", 56, ORDRE), ORDRE).move_to(P(4.3, 1.75))
        fr = self.fraction("n!", "(n − k)!", 34, ORDRE)
        fr2 = VGroup(fr, self.t("k-uplets distincts", 24, ORDRE)).arrange(DOWN, buff=0.12)
        dist = self.boite(fr2, ORDRE, 0.16).move_to(P(4.3, -0.1))
        part = self.boite(VGroup(self.t("une partie", 34, PARTIE), self.t("= une combinaison", 34, PARTIE))
                          .arrange(RIGHT, buff=0.2), PARTIE).move_to(P(0.7, -2.45))
        a1, o1 = self.fleche(racine[0].get_right(), q2[0].get_left(), "oui", ORDRE)
        a2, o2 = self.fleche(q2[0].get_right(), nk[0].get_left(), "oui", REPET)
        a3, o3 = self.fleche(q2[0].get_right(), dist[0].get_left(), "non", REPET, DL)
        coude = racine[0].get_bottom()
        a4 = VGroup(Line(coude, P(coude[0], part.get_center()[1]), color=PARTIE, stroke_width=4),
                    Arrow(P(coude[0], part.get_center()[1]), part[0].get_left(), buff=0.05, color=PARTIE,
                          stroke_width=4, max_tip_length_to_length_ratio=0.15))
        o4 = self.t("non", 26, PARTIE, audit=False).next_to(a4[0], LEFT, buff=0.12)
        self.au_mot("L'ordre compte, avec")
        self.play(GrowArrow(a1), FadeIn(o1), run_time=0.35)
        self.au_mot("avec répétitions")
        self.play(GrowArrow(a2), FadeIn(o2), run_time=0.35)
        self.au_mot("n puissance k")
        self.play(FadeIn(nk, scale=1.2), run_time=0.4)
        self.au_mot("L'ordre compte, sans")
        self.play(Indicate(a1, color=ORDRE), run_time=0.4)
        self.au_mot("sans répétition")
        self.play(GrowArrow(a3), FadeIn(o3), run_time=0.35)
        self.au_mot("des k-uplets")
        self.play(FadeIn(dist, scale=1.15), run_time=0.4)
        self.au_mot("Ni ordre")
        self.play(Create(a4[0]), FadeIn(o4), run_time=0.3)
        self.play(GrowArrow(a4[1]), run_time=0.25)
        self.au_mot("une partie")
        self.play(FadeIn(part[0]), FadeIn(part[1][0], scale=1.2), run_time=0.4)
        self.au_mot("une combinaison")
        self.play(FadeIn(part[1][1], shift=RIGHT * 0.1), run_time=0.35)
        self.insister(part, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : une équipe de 3 parmi 10 copains ────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-question")
        t0 = self.renderer.time
        choix = ["un 3-uplet avec répétitions", "un 3-uplet d'éléments distincts", "une partie à 3 éléments"]
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Une équipe de 3 joueurs", "parmi 10 copains. C'est :"], choix, xl=-0.1, largeur=6.3, fs_c=30)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        hauts = [BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT, "#F472B6"]
        copains = VGroup(*[personne(hauts[k % 5], PEAUX[(2 * k) % 5], s=0.42, longs=k % 2 == 0) for k in range(10)])
        copains.arrange_in_grid(2, 5, buff=(0.45, 0.35)).move_to(P(-3.6, 1.55))
        self.au_mot("Tu choisis")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.1) for c in copains], lag_ratio=0.06), run_time=0.6)
        equipe = [copains[k] for k in (1, 5, 8)]
        anneaux = VGroup(*[Circle(radius=0.36, stroke_color=WHITE, stroke_width=4).move_to(c) for c in equipe])
        self.au_mot("3 joueurs")
        self.play(FadeIn(q[0], shift=UP * 0.1), Create(anneaux), *[c.animate.scale(1.12) for c in equipe],
                  run_time=0.45)
        l10 = self.t("10 copains", 30, GREY_A).next_to(copains, UP, buff=0.2)
        self.au_mot("10 copains")
        self.play(FadeIn(q[1], shift=UP * 0.1), FadeIn(l10), run_time=0.4)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "08-question", t0, 2)
        self.dire("08b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        # l'équipe descend, et on la mélange : c'est la même
        places = [P(-4.9, -0.75), P(-3.7, -0.75), P(-2.5, -0.75)]
        self.au_mot("ne dépend pas de l'ordre")
        self.play(*[c.animate.move_to(p) for c, p in zip(equipe, places)], FadeOut(anneaux), run_time=0.5)
        lo = self.t("même équipe dans tout ordre", 28, PARTIE).move_to(P(-3.4, -1.65))
        self.play(equipe[0].animate.move_to(places[2]), equipe[2].animate.move_to(places[0]),
                  FadeIn(lo, shift=UP * 0.1), run_time=0.6, path_arc=PI / 2)
        self.au_mot("pas deux fois")
        lr = self.t("pas deux fois le même", 28, PARTIE).move_to(P(-3.4, -2.15))
        self.play(FadeIn(lr, shift=UP * 0.1), run_time=0.35)
        sac = Ellipse(width=4.0, height=1.35, stroke_color=PARTIE, stroke_width=5).move_to(P(-3.7, -0.75))
        self.au_mot("une partie à 3")
        self.play(Create(sac), run_time=0.45)
        comb = self.t("une partie : une combinaison", 30, VERT_OK).move_to(P(-3.2, -2.85))
        self.au_mot("une combinaison")
        self.play(FadeIn(comb, scale=1.2), run_time=0.4)
        self.insister(comb, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 09 : question-pause n° 3 : le tiercé ───────────────────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-question")
        t0 = self.renderer.time
        choix = ["une partie à 3 éléments", "un 3-uplet d'éléments distincts", "un 3-uplet avec répétitions"]
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Une course de 15 chevaux :", "les trois premiers, dans l'ordre.", "Ton pari est :"], choix, xl=-0.1,
            largeur=6.3, fs_c=30)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        robes = ["#8B5A2B", "#5c3a1e", "#A0522D", "#2b1a0e", "#C19A6B"]
        casaques = [BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT, "#F472B6", JAUNE_TITRE, "#22D3EE"]
        chevaux = VGroup(*[cheval(robes[k % 5], 0.62, casaques[k % 7]) for k in range(15)])
        chevaux.arrange_in_grid(3, 5, buff=(0.3, 0.12)).move_to(P(-3.65, 2.0))
        self.au_mot("15 chevaux")
        self.play(FadeIn(q[0], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, shift=RIGHT * 0.3) for c in chevaux], lag_ratio=0.04), run_time=0.7)
        pod = podium(1.0).move_to(P(-3.65, -1.25))
        m = pod.marches
        for mot, k in (("le premier", 1), ("le deuxième", 2), ("le troisième", 3)):
            self.au_mot(mot)
            self.play(GrowFromEdge(m[k], DOWN), run_time=0.3)
        self.au_mot("dans l'ordre")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Ton pari")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "09-question", t0, 1)
        self.dire("09b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        gagnants = [chevaux[k] for k in (7, 2, 11)]
        self.au_mot("L'ordre compte")
        self.play(*[c.animate.scale(1.15).next_to(m[k][0], UP, buff=0.05) for c, k in zip(gagnants, (1, 2, 3))],
                  run_time=0.7, path_arc=-PI / 3)
        self.au_mot("ne finit pas deux fois")
        ln = self.t("pas deux fois le même", 28, ORDRE).move_to(P(-3.65, -2.25))
        self.play(FadeIn(ln, shift=UP * 0.1), run_time=0.35)
        v = self._texte_voix
        prod = self.fois("15", "14", "13", fs=40).move_to(P(-4.6, -2.95))
        dep = v.find("15 fois")
        for k, n in enumerate(("15", "14", "13")):
            self.au_pos(v.find(n, dep))
            anims = [FadeIn(prod[2 * k], shift=UP * 0.1), Indicate(m[(1, 2, 3)[k]], color=ORDRE)]
            if k:
                anims.append(FadeIn(prod[2 * k - 1]))
            self.play(*anims, run_time=0.25)
        res = VGroup(self.t("=", 40, VERT_OK), self.t("2 730 paris", 40, VERT_OK)).arrange(RIGHT, buff=0.15)
        res.next_to(prod, RIGHT, buff=0.18)
        self.au_mot("2 730")
        cad = SurroundingRectangle(res, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(res, scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(res, cad), 1.1)
        self.attendre_voix(marge=0.6)

    # ── 10 : le conseil d'Inès ─────────────────────────────────────────────

    def ecran_conseil(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("10-conseil")
        ines = personne(VERT_OK, PEAUX[1], "#2b1a0e", 0.85, longs=True).move_to(P(-5.55, 2.3))
        tit = self.t("Le conseil d'Inès", 44, JAUNE_TITRE).move_to(P(0, 2.85)).align_to(P(-4.6, 0), LEFT)
        self.au_mot("Le conseil")
        self.play(FadeIn(ines, shift=UP * 0.2), Write(tit), run_time=0.6)
        long_ = cases(6, 0.32, 0.4, 0.06)
        rep = VGroup(Arc(radius=0.22, start_angle=0.3, angle=TAU * 0.8, stroke_color=REPET, stroke_width=5)
                     .add_tip(tip_length=0.14))
        touche = VGroup(RoundedRectangle(width=0.62, height=0.5, corner_radius=0.08, fill_color="#475569",
                                         fill_opacity=1, stroke_color=GREY_B, stroke_width=2),
                        Star(5, outer_radius=0.13, color=WHITE, fill_opacity=1).shift(P(0.32, 0.25)))
        items = [("un code long", "un code long", ORDRE, long_), ("les répétitions", "répétitions permises", REPET, rep),
                 ("des touches propres", "des touches propres", VERT_OK, touche)]
        for k, (mot, texte, color, icone) in enumerate(items):
            y = 1.05 - 0.9 * k
            icone.move_to(P(-3.75, y))
            tx = self.t(texte, 38, color).move_to(P(0, y)).align_to(P(-2.2, 0), LEFT)
            ok = self.coche(VERT_OK, 0.2).move_to(P(-5.6, y))
            self.au_mot(mot)
            self.play(FadeIn(icone, scale=1.3), FadeIn(tx, shift=RIGHT * 0.15), Create(ok), run_time=0.4)
        row = cases(4, 0.62, 0.62, 0.1).move_to(P(-4.2, -1.9))
        self.au_mot("Chaque chiffre de plus")
        self.play(LaggedStart(*[FadeIn(b) for b in row], lag_ratio=0.1), run_time=0.35)
        nouvelles = VGroup()
        for k in range(2):
            b = row[0].copy().set_stroke(ORANGE_RETENUE).next_to(row if k == 0 else nouvelles[-1], RIGHT, buff=0.35)
            nouvelles.add(b)
            self.play(GrowFromCenter(b), run_time=0.3)
        fx = VGroup(*[self.t("× 10", 28, ORANGE_RETENUE).next_to(b, UP, buff=0.15) for b in nouvelles])
        self.au_nb("multiplie par", "10")
        self.play(LaggedStart(*[FadeIn(f, scale=1.4) for f in fx], lag_ratio=0.3), run_time=0.5)
        vol = pirate(0.75).move_to(P(1.9, -2.2))
        lt = self.t("le travail du pirate", 32, ROUGE_ERREUR).next_to(vol, UP, buff=0.2)
        self.au_mot("le travail du pirate")
        self.play(FadeIn(vol, shift=LEFT * 0.2), FadeIn(lt, shift=LEFT * 0.1), run_time=0.45)
        self.play(Wiggle(vol), run_time=0.6)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.appris("11-appris", [
            [("deux questions", "Avant de compter :", WHITE), ("l'ordre compte-t-il", "l'ordre compte-t-il ?", ORDRE),
             ("Peut-on répéter", "peut-on répéter ?", REPET)],
            [("Ordre et répétitions", "Ordre et répétitions :", ORDRE),
             ("n puissance k", puissance("n", "k", 44, VERT_OK), VERT_OK)],
            [("Ordre sans répétition", "Ordre sans répétition :", ORDRE), ("n factorielle", "n!", VERT_OK),
             ("sur n moins k", "/ (n − k)!", VERT_OK)],
            [("Ni l'un ni l'autre", "Ni l'un ni l'autre :", PARTIE), ("une partie", "une partie.", VERT_OK)],
        ])

    def construct(self):
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_metier()
        self.ecran_k_uplets()
        self.ecran_question1()
        self.ecran_distincts()
        self.ecran_parties()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_question3()
        self.ecran_conseil()
        self.ecran_appris()
        self.page_abonnement()
