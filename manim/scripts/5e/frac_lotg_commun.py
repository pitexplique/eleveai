# frac_lotg_commun.py
# EleveAI — série « Fractions », 5e, LOT G (25/10/2026 : notion fraction_nombre,
# 02-simplifier, 01-egale, 04-comparer, 03-rationnel, 05-oppose, paysage +
# short chacun) : les petits OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI 6e/frac_commun.py NI les
# scripts de 6e et de 4e : 4e/frac_lotd_commun.py est IMPORTÉ (PaysageLotD /
# ShortLotD : audit de synchro AUDIT=1, contrôle des bords BORDS=1, réponses
# posées ligne par ligne au mot — rep, q_tete, fin_rep, montrer2 —, choix des
# questions écrits au mot de LEUR nombre, « moins 4 » attendu au 4).
# Ajouté ici (signalé au rapport) :
#   · PaysageG / ShortG : en « Maths 5e » ;
#   · finale_colonne() du lot E de 4e (RECOPIÉE) : le titre « Ce que tu as
#     appris » à 0,5 du haut, centré ;
#   · titre() sans synchro (le titre paraît au mot choisi par le script) ;
#   · moins_frac() du lot F de 4e (RECOPIÉE) : « −3/5 », signe à la hauteur du trait.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Classe>
#   → 0 ligne AUDIT-AVANCE, 0 RETARD, 0 BORD.

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from frac_lotd_commun import *  # noqa: E402,F401,F403
from frac_lotd_commun import _txts  # noqa: E402,F401


def moins_frac(num, den, fs=64, couleur=WHITE, signe="−", **kw):
    """« −3/4 » : le signe devant la fraction, à la hauteur du trait.
    .signe .f (l'EcritureFraction : .num .trait .den). (Recopié du lot F.)"""
    f = EcritureFraction(num, den, fs=fs, couleur=couleur, **kw)
    s = Text(signe, font_size=fs, color=kw.get("num_c") or couleur)
    s.sans_synchro = True
    s._pas_audit = True
    g = VGroup(s, f).arrange(RIGHT, buff=fs / 500)
    s.set_y(f.trait.get_y())
    g.signe, g.f = s, f
    g.num, g.trait, g.den = f.num, f.trait, f.den
    return g


class _OutilsG:
    """Poser au mot, morceau par morceau (sans la synchro par jetons, qui
    attend parfois un petit mot redit plus loin : « séance », « et »…)."""

    def _attendre(self, mot, n=1):
        """au_nb si `mot` contient un chiffre (attend son DERNIER nombre), sinon au_mot."""
        if mot is None:
            return
        if isinstance(mot, tuple):
            mot, n = mot
        if re.search(r"\d", mot):
            self.au_nb(mot, n=n)
        else:
            self.au_mot(mot, n=n)

    def morceaux(self, specs, fs=40, buff=0.18):
        """specs = [(texte ou Mobject, couleur, mot), …] → une ligne ; chaque
        morceau garde son mot dans .mots. mot = None : avec le morceau d'avant."""
        ms = []
        for s, c, _ in specs:
            m = s if isinstance(s, Mobject) else self.t(s, fs, c)
            sans_synchro(m)
            ms.append(m)
        g = VGroup(*ms).arrange(RIGHT, buff=buff)
        for m in ms:
            if isinstance(m, EcritureFraction):
                y = next((x.get_y() for x in ms if not isinstance(x, (EcritureFraction, VGroup))), None)
                if y is not None:
                    m.shift(UP * (y - m.trait.get_y()))
        g.mots = [mot for _, _, mot in specs]
        return g

    def jouer(self, g, avec=(), run_time=0.35):
        """Montre la ligne g (de morceaux()) : chaque morceau à SON mot."""
        lots = []
        for m, mot in zip(g, g.mots):
            if mot is None and lots:
                lots[-1][1].append(m)
            else:
                lots.append((mot, [m]))
        par_lot = avec if isinstance(avec, dict) else {0: list(avec)}  # {n° du lot : animations jouées avec lui}
        for k, (mot, ms) in enumerate(lots):
            self._attendre(mot)
            self.play(*[FadeIn(m, shift=RIGHT * 0.15) for m in ms], *par_lot.get(k, []), run_time=run_time)
        return g

    def L(self, specs, y, fs=40, x=None, avec=(), buff=0.18, gauche=None):
        """Une ligne de morceaux dans la colonne (paysage) ou centrée (short), jouée
        au mot ; x : centrée en x ; gauche : calée à gauche en x = gauche."""
        g = self.morceaux(specs, fs=fs, buff=buff)
        if gauche is not None:
            g.move_to(P(0, y)).align_to(P(gauche, 0), LEFT)
        elif hasattr(self, "col") and x is None:
            self.col(g, y)
        else:
            if hasattr(self, "borne"):
                self.borne(g)
            g.move_to(P(0 if x is None else x, y))
        return self.jouer(g, avec=avec)

    def rep_mots(self, i, specs, avec=()):
        """Dans autres_r : la ligne i de la réponse remplacée par des morceaux,
        chacun posé à SON mot (rep_fin / fin_rep à la fin)."""
        ref = self.ph_q[i]
        fs = 26 if config.frame_width < 10 else 30
        g = self.morceaux([(s, VERT_OK if c is None else c, mot) for s, c, mot in specs], fs=fs, buff=0.14)
        if isinstance(ref, Text):  # la phrase a pu être réduite (_ranger_q) : même échelle
            g.scale(ref.height / Text(ref.original_text, font_size=fs).height)
        g.move_to(ref.get_center())
        if config.frame_width < 10:
            self.borne(g)
            g.set_x(0)
        else:
            g.align_to(ref, LEFT)
            droite = 5.15 if g.get_bottom()[1] < -1.8 else self.BORD_X - 0.05  # Ti-Margo, en bas à droite
            if g.get_right()[0] > droite:
                gauche = g.get_left()[0]
                g.scale_to_fit_width(droite - gauche).align_to(P(gauche, 0), LEFT)
        self.jouer(g, avec=avec, run_time=0.3)
        self._deja = getattr(self, "_deja", set()) | {i}
        return g

    def fin_rep(self):
        self.ph_q.submobjects = []
        self._deja = set()

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None, avant_q=None):
        """Celle du lot D ; avant la pause, tout ce qui est à l'écran est marqué
        « déjà audité » (la carte de la bonne réponse, agrandie, n'est pas
        un nombre nouveau)."""
        def aq(sc):
            for m in list(sc.mobjects) + [getattr(sc, "cartes_q", VGroup()), getattr(sc, "q_q", VGroup())]:
                for f in m.get_family():
                    f._pas_audit = True
            if autres_q:
                autres_q(sc)

        return super().question_pause(cle_q, cle_r, question, choix, bonne, phrase, mots_choix, aq, autres_r,
                                      mot_q, avant_q)


class PaysageG(_OutilsG, PaysageLotD):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0, centre=False):
        """Le titre paraît AU MOT choisi par le script (sans synchro par jetons)."""
        t = self.t(txt, fs, couleur)
        t.sans_synchro = True
        t.move_to(P(0, y)) if centre else self.col(t, y)
        self.play(Write(t), run_time=0.5)
        return t

    def finale_colonne(self, textes, fs=38, figure=None):
        """Celle du lot E de 4e : le titre « Ce que tu as appris » à 0,5 du
        haut, centré ; les lignes renvoyées pour être montrées au mot (montrer2)."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.5)
        if figure is not None:
            self.cadrer(figure, droite=self.XL - 0.3, haut=tit.get_bottom()[1] - 0.2)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in textes:
            bloc = VGroup(*[self.t(x, fs) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.42)
        xl = self.XL if figure is None else min(self.XL, figure.get_right()[0] + 0.45)
        largeur = self.BORD_X - 0.05 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        if lignes.height > 4.2:
            lignes.scale_to_fit_height(4.2)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, 2.45), UP)
        return lignes

    def personnage(self, pers, nom, metier, x=-5.0, y=-0.4, fs_nom=40, fs_met=28):
        """Le personnage-métier, son nom au-dessus, son métier dessous (au mot :
        le script appelle au_mot avant). Renvoie (pers, nom, metier)."""
        pers.move_to(P(x, y))
        n = self.t(nom, fs_nom, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        lignes = metier if isinstance(metier, (list, tuple)) else [metier]
        m = VGroup(*[self.t(s, fs_met, BLEU_CALCUL) for s in lignes]).arrange(DOWN, buff=0.06).next_to(pers, DOWN,
                                                                                                        buff=0.2)
        return pers, n, m


class ShortG(_OutilsG, ShortLotD):
    ceinture = "blanche"

    def encadrer(self, mob, couleur=VERT_OK, buff=0.2):
        return SurroundingRectangle(mob, color=couleur, buff=buff, corner_radius=0.12, stroke_width=5)

    def bas(self, mob, y=-1.3):
        """Un texte ou un calcul centré dans la bande du bas."""
        return self.borne(mob).move_to(P(0, y))
