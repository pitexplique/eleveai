# manim/poste2/espace_ecrans.py
# LE SOCLE D'ÉCRAN DES 12 ÉPISODES de la série « GÉOMÉTRIE DANS L'ESPACE », terminale spé.
#
# ⭐⭐ POURQUOI CE FICHIER EXISTE (22/11/2026)
# Les 12 épisodes partagent les mêmes outils d'écran : la colonne de droite, les cartes
# de choix, la question-pause, la page d'abonnement, le repère de l'espace à gauche.
# Les recopier douze fois, c'est refaire douze fois les neuf défauts corrigés sur
# l'épisode 1 — dont celui où « Mets pause, et choisis ! » restait affiché PAR-DESSUS
# toute l'explication, parce que `q_reponse` n'avait pas reçu les objets à effacer.
# ⛔ La convention terminale (« recopiés, rien importé ») vaut d'un CHAPITRE à l'autre.
# À l'intérieur d'UNE série de 12 épisodes jumeaux, elle multiplie les bugs par douze.
#
# Ce que le socle apporte, et que chaque épisode n'a plus à savoir :
#   · `col`, `ligne`, `lg`, `gauche` : les colonnes, avec leurs bords mesurés ;
#   · `trip` : un triplet de coordonnées dont les TROIS nombres sont adressables
#     (`g.nb[i]`) — un SurroundingRectangle sur `trip(...)[0]` encadrait un glyphe ;
#   · `repere` : le repère cavalière posé dans la colonne de gauche ;
#   · `q_tete` / `q_montrer_choix` / `q_pause` / `q_reponse` : la question-pause ;
#   · `choix2` : un choix sur deux lignes, parce qu'une phrase longue dans une carte de
#     4,1 de large tombe à ~10 px, illisible sur un téléphone ;
#   · `page_abonnement` : le dernier écran, identique partout.
#
# ⚠️ Chaque épisode garde ses 15 écrans à lui, et sa classe de Scene. Il hérite de
# `EcransEspace` et définit `fichier_marques`, `nom_voix`, `identite`, `ceinture`.
# ⛔ Les figures viennent de `espace3d.py`, pas d'ici : ce fichier ne dessine aucun objet
# de géométrie, il ne fait que placer du texte et des cartes.
#
# Les pièges de cette série sont dans `manim/REPRISE-espace-terminale.md`. Les lire
# AVANT d'écrire un épisode : ils ont tous coûté un rendu.

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "stmg"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1] / "scripts" / "seconde"))
sys.path.insert(3, str(Path(__file__).resolve().parent))

from proba_bin_defi import MotsCales, P  # noqa: E402

from manim import *  # noqa: E402,F401,F403

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402,F401,F403
from espace3d import Repere3D  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

import numpy as np  # noqa: E402

FOND_CARTE = "#0b1220"
XL, BORD_X = 2.2, 6.6          # la colonne de droite (marge de 3 % : 0,43 du bord)


class EcransEspace(AuditSynchro, MotsCales, Notion6e):
    """Les outils d'écran communs aux 12 épisodes. Un épisode en hérite et ajoute
    ses 15 écrans. ⛔ Une correction se fait ICI, pas dans un épisode."""

    identite = "Maths Tle — EleveAI"
    ceinture = "verte"

    # ── outils (repris de convexite_derivee_seconde.py) ─────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None):
        t = Text(texte, font_size=fs, color=color)
        if larg and t.width > larg:
            t.scale_to_fit_width(larg)
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

    def lg(self, *morceaux, y, x=-6.2, buff=0.15):
        return VGroup(*morceaux).arrange(RIGHT, buff=buff).move_to(P(0, y)).align_to(P(x, 0), LEFT)

    def gauche(self, mob, y, xmax, x0=-6.5):
        """Une colonne de calcul à gauche, bornée à droite par `xmax`.
        ⛔ VU AU GROS PLAN (apercu-instants) : en 04b et 07b, les lignes de calcul
        posées à x = −6,2 traversaient les axes du repère et le point A. La planche
        ne le montrait pas : elle prend la DERNIÈRE image, où d'autres objets
        recouvrent la collision. Ici on mesure le bord droit et on réduit."""
        mob.move_to(P(0, y)).align_to(P(x0, 0), LEFT)
        if mob.get_right()[0] > xmax:
            mob.scale_to_fit_width(xmax - x0).align_to(P(x0, 0), LEFT)
        return mob

    def nombre(self, v):
        """Un nombre écrit à la française. ⛔ MESURÉ (AUDIT-ABSENT sur l'épisode 2) :
        `str(0.5)` donne « 0.5 », avec un POINT. À l'écran d'un cours de maths
        français, c'est une faute — et la voix, elle, dit « zéro virgule cinq ».
        Le signe moins est le vrai − (U+2212), pas le trait d'union."""
        s = f"{v:g}" if isinstance(v, float) else str(v)
        return s.replace(".", ",").replace("-", "−")

    def trip(self, t3, fs=36, color=WHITE):
        """Un triplet de coordonnées. ⭐ Les trois nombres sont des objets SÉPARÉS
        (g.nb[0..2]) : vu à la planche, un SurroundingRectangle posé sur `trip(...)[0]`
        encadrait le premier GLYPHE — le signe moins — et pas la coordonnée."""
        nb = [self.t(self.nombre(v), fs, color) for v in t3]
        pieces = []
        for i, x in enumerate(nb):
            if i:
                pieces.append(self.t(";", fs, color))
            pieces.append(x)
        g = VGroup(*pieces).arrange(RIGHT, buff=0.18)   # 0,12 collait : « 1;2;3 » illisible
        g.nb = nb
        return g

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def sans_audit(self, mob):
        """Les nombres d'une figure qu'on LIT (noms de points, axes) : pas d'audit."""
        for f in mob.get_family():
            f._pas_audit = True
        return mob

    def echelle(self):
        """L'échelle des ceintures de la page de garde. ⚠️ Elle occupe y de −3,45 à
        −2,6 une fois alignée en bas : rien d'autre ne tient dans cette bande."""
        return echelle_ceintures(self.ceinture).move_to(P(-0.6, 0))

    def croix(self, color="#dc2626", r=0.16, sw=6):
        """La croix rouge, pendant de `coche()`."""
        return VGroup(Line(P(-r, -r), P(r, r)), Line(P(-r, r), P(r, -r))).set_stroke(color, sw)

    def rebours_sous(self, mob, n=5):
        """Le compte à rebours posé SOUS un texte et aligné à gauche sur lui."""
        c = CompteARebours(n, r=0.34, fs=32).next_to(mob, DOWN, buff=0.3)
        return c.align_to(mob, LEFT)

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def t_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        return self._debut_voix + max([x[1] for x in m if x[0] <= i] or [0.0])

    def t_mot(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        return self.t_pos(i)

    def jusqua(self, extrait, n=1, marge=0.1, mini=0.4):
        return max(mini, self.t_mot(extrait, n) - self.renderer.time - marge)

    def au_pos(self, i):
        reste = self.t_pos(i) - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def au_mot(self, extrait, n=1):
        if n == 1:
            return super().au_mot(extrait)
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix")
        self.au_pos(i)

    # ── le repère de l'espace, à gauche ─────────────────────────────────────

    def repere(self, o=(-4.35, -1.35), u=0.62, portee=4, noms=("x", "y", "z")):
        """⭐ UN repère par écran, posé dans la colonne de gauche. Mesuré : avec
        u = 0,62 et portée 4, le bout de x est à −1,82 et le bout de z monte à
        1,18 — tout reste dans la moitié gauche, loin de la colonne de droite."""
        r = Repere3D(o=np.array([o[0], o[1], 0.0]), u=u, portee=portee)
        ax = self.sans_audit(r.axes(noms=noms))
        return r, ax

    # ── la question-pause (modèle : loi_normale_escalier.py) ────────────────

    def carte_choix(self, lettre, corps, largeur=4.1, fs=32):
        rond = Circle(radius=0.25 * fs / 32, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), c).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 1.15:
            ligne.scale_to_fit_width(largeur - 1.15)
        cadre = RoundedRectangle(width=largeur, height=max(0.72, ligne.height + 0.28), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def q_tete(self, question, choix):
        tete = VGroup(pastille_pause(0.38), self.t("Question !", 38, ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        self.col(tete, 3.15)
        rebours = CompteARebours(5, r=0.34, fs=32).next_to(tete, RIGHT, buff=0.35)
        if rebours.get_right()[0] > BORD_X:
            rebours.shift(LEFT * (rebours.get_right()[0] - BORD_X))
        q = VGroup(*[x if isinstance(x, Mobject) else self.t(x, 32) for x in question])
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(q, 0)
        q.align_to(P(0, tete.get_bottom()[1] - 0.25), UP)
        cartes = VGroup(*[self.carte_choix(l, c) for l, c in zip("ABC", choix)]).arrange(DOWN, buff=0.16)
        self.col(cartes, 0)
        cartes.align_to(P(0, q.get_bottom()[1] - 0.3), UP)
        pause = self.col(self.t("Mets pause, et choisis !", 32, ORANGE_RETENUE), cartes.get_bottom()[1] - 0.45)
        if pause.width < 3.5:
            pause = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE), self.t("et choisis !", 32, ORANGE_RETENUE))
            pause.arrange(DOWN, aligned_edge=LEFT, buff=0.08)
            pause.move_to(P(0, cartes.get_bottom()[1] - 0.2), aligned_edge=UP).align_to(P(XL, 0), LEFT)
        return tete, q, cartes, pause, rebours

    def choix2(self, l1, l2, fs=28):
        """Un choix en DEUX lignes : vu à la planche, une phrase longue dans une carte
        de 4,1 de large tombait à ~10 px, illisible sur un téléphone."""
        g = VGroup(self.t(l1, fs), self.t(l2, fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        return g

    def q_montrer_choix(self, cartes):
        voix = self._texte_voix
        for c, L in zip(cartes, "ABC"):
            i = voix.find(f"{L} : ")
            self.au_pos(i)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            self.au_pos(i + 4)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)

    def q_pause(self, pause, rebours, cle_q, t0, bonne):
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}",
              flush=True)

    def q_reponse(self, cartes, bonne, pause, rebours):
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.2).move_to(b[0].get_right() + LEFT * 0.35)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()),
                  run_time=0.25)
        return ok

    def pastille(self, k, color=BLEU_CALCUL, r=0.24):
        n = Text(str(k), font_size=30, color=BLACK, weight=BOLD)
        n._pas_audit = True
        return VGroup(Circle(radius=r, fill_color=color, fill_opacity=1, stroke_width=0), n)

    def page_abonnement(self, voix="11-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)
