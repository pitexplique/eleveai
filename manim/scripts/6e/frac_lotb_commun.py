# frac_lotb_commun.py
# EleveAI — série « Fractions », 6e, LOT B (05-comparer, 06-mixte, 07-defi),
# 25/10/2026 : les petits outils PROPRES À CE LOT. Pas de scène ici.
# ⛔ frac_commun.py et canvas_fractions.py ne sont PAS modifiés : on les importe
#    et on complète ici (règle de la consigne fractions).
# ⭐ Ajouté ici :
#   · ligne_mots() / jouer_mots() : une ligne écrite MORCEAU PAR MORCEAU, chaque
#     morceau AU MOT où la voix dit son nombre (amélioration demandée après le
#     pilote : une ligne de réponse n'arrive jamais plus de 0,4 s après son
#     premier nombre, et aucun nombre n'arrive avant d'être dit) ;
#   · question_pause() : la phrase de réponse n'est plus posée par jetons ; on
#     la donne en `reponse=[specs de ligne…]`, posée au mot sous les cartes ;
#   · personnage() : un petit personnage dessiné (métier : accessoire en plus) ;
#   · marqueur() : un rond + nom au-dessus d'une barre (un coureur, un son…).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F401,F403

PEAUX = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a1e"]


def personnage(peau="#c68642", haut="#2563eb", cheveux="#1f2937", s=1.0, longs=False):
    """Un personnage simple (tête, cheveux, buste). .tete .corps ; à compléter
    par un accessoire de métier dans le script de l'épisode."""
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color=haut,
                    fill_opacity=1, stroke_width=0)
    cou = Rectangle(width=0.22, height=0.2, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, -0.42))
    tete = Circle(radius=0.42, fill_color=peau, fill_opacity=1, stroke_width=0)
    ch = VGroup(Arc(radius=0.44, start_angle=0.15, angle=PI - 0.3, stroke_width=0, fill_color=cheveux,
                    fill_opacity=1).move_to(P(0, 0.22)))
    calotte = Ellipse(width=0.9, height=0.42, fill_color=cheveux, fill_opacity=1, stroke_width=0).move_to(P(0, 0.3))
    ch = VGroup(calotte)
    if longs:
        ch.add(*[RoundedRectangle(width=0.2, height=0.75, corner_radius=0.09, fill_color=cheveux, fill_opacity=1,
                                  stroke_width=0).move_to(P(x, -0.12)) for x in (-0.4, 0.4)])
    yeux = VGroup(*[Dot(P(x, 0.02), radius=0.045, color="#111827") for x in (-0.14, 0.14)])
    sourire = Arc(radius=0.13, start_angle=PI + 0.5, angle=PI - 1.0, color="#111827", stroke_width=3).move_to(P(0, -0.15))
    g = VGroup(corps, cou, *ch[1:], tete, ch[0], yeux, sourire).scale(s)
    g.tete, g.corps = tete, corps
    return g


def marqueur(nom, couleur, fs=26, r=0.13):
    """Un rond de couleur + un nom au-dessus (le coureur Hugo, le son d'Awa…)."""
    rond = Dot(radius=r, color=couleur)
    t = Text(nom, font_size=fs, color=couleur).next_to(rond, UP, buff=0.08)
    t.sans_synchro = True
    g = VGroup(rond, t)
    g.rond = rond
    return g


class OutilsLotB:
    """Mixin des scènes du lot B (paysage et short)."""

    def au_mot(self, extrait, n=1):
        """au_mot() du pilote, plus un correctif : WinRT livre parfois « Et 3 »
        en UNE marque posée sur « Et ». Un extrait qui commence par un nombre
        attend alors encore 0,35 s : le nombre n'apparaît jamais avant d'être dit."""
        super().au_mot(extrait, n)
        if not extrait[:1].isdigit():
            return
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
        marques = self._marques().get(getattr(self, "_cle_voix", None)) or []
        avant = [m for m in marques if m[0] <= i]
        if avant and max(m[0] for m in avant) < i:
            t = self._debut_voix + max(m[1] for m in avant) + 0.35 - self.renderer.time
            if t > 0.05:
                self.wait(t)

    def mor(self, s, fs=40, c=WHITE):
        t = Text(s, font_size=fs, color=c)
        t.sans_synchro = True
        return t

    def ligne_mots(self, specs, fs=40, buff=0.18):
        """specs = [(texte ou Mobject, couleur, mot)] ; mot = extrait de la voix
        (str ou (str, n) : n-ième occurrence) où le morceau apparaît, ou None :
        il suit le morceau d'avant. Le morceau peut être une EcritureFraction."""
        ms = []
        specs = [tuple(x) + (None,) * (4 - len(x)) for x in specs]
        for s, c, _, _ in specs:
            if isinstance(s, Mobject):
                m = s
            else:
                m = self.mor(s, fs, c)
            m._bloc = True  # posé tel quel, au mot : la synchro par jetons ne le redécoupe pas
            ms.append(m)
        g = VGroup(*ms).arrange(RIGHT, buff=buff)
        for m in ms:  # une fraction se pose sur la ligne par son trait
            if isinstance(m, EcritureFraction):
                m.shift(UP * (g.get_y() - m.trait.get_y()))
        g.mots = [m for _, _, m, _ in specs]
        g.extras = [e for _, _, _, e in specs]  # une fonction → animations jouées AVEC ce morceau
        return g

    def _au(self, mot):
        if mot is None:
            return
        if isinstance(mot, tuple):
            self.au_mot(*mot)
        else:
            self.au_mot(mot)

    def serie(self, *paires):
        """Des morceaux DÉJÀ PLACÉS (n'importe où) à jouer dans l'ordre de la voix :
        paires = (mobject, mot) ou (mobject, mot, extra). → à passer à jouer_mots."""
        g = VGroup(*[p[0] for p in paires])
        g.mots = [p[1] for p in paires]
        g.extras = [p[2] if len(p) > 2 else None for p in paires]
        return g

    def jouer_mots(self, g, rt=0.3, shift=RIGHT * 0.15, avec=()):
        """Joue la ligne de ligne_mots() : un lot par mot de la voix."""
        lots = []
        extras = getattr(g, "extras", [None] * len(g.submobjects))
        for m, mot, e in zip(g.submobjects, g.mots, extras):
            if mot is not None or not lots:
                lots.append((mot, [m], []))
            else:
                lots[-1][1].append(m)
            if e is not None:
                lots[-1][2].append(e)
        for k, (mot, ms, es) in enumerate(lots):
            self._au(mot)
            plus = [a for e in es for a in e()]
            self.play(*[FadeIn(m, shift=shift) for m in ms], *(avec if k == 0 else ()), *plus,
                      run_time=max([rt] + [getattr(a, "run_time", 0) for a in plus]))
        return g

    # ── questions : la réponse écrite AU MOT ──
    def question_b(self, cle_q, cle_r, question, choix, bonne, reponse, fs_rep=32, autres_r=None, apres_rep=None,
                   **kw):
        """question_pause() du pilote ; `reponse` = liste de lignes (specs de
        ligne_mots) posées sous les cartes, chaque morceau à son mot."""
        self._reponse_b = (reponse, fs_rep)
        geste = autres_r

        def apres(sc):
            if geste:
                geste(sc)
            sc._poser_reponse()
            if apres_rep:
                apres_rep(sc)

        return self.question_pause(cle_q, cle_r, question, choix, bonne, ["."], autres_r=apres, **kw)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.cartes_q = cartes
        return tete, q, cartes, pause, rebours, VGroup()

    def _poser_reponse(self):
        lignes, fs = self._reponse_b
        y = self.cartes_q.get_bottom()[1] - 0.2
        for specs in lignes:
            g = self.ligne_mots(specs, fs, buff=0.14)
            self._placer_rep(g, y)
            y = g.get_bottom()[1] - 0.12
            self.jouer_mots(g, rt=0.3, shift=UP * 0.12)


class PaysageB(OutilsLotB, PaysageFrac):
    def _placer_rep(self, g, y):
        g.move_to(P(0, y)).align_to(P(0, y), UP)
        self.col(g, g.get_y())
        g.align_to(P(0, y), UP)


class ShortB(OutilsLotB, ShortFrac):
    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def _placer_rep(self, g, y):
        self.borne(g, 0.5)
        g.move_to(P(0, y)).align_to(P(0, y), UP)
