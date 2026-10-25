# frac_lote_commun.py
# EleveAI — série « Fractions », 4e, LOT E (25/10/2026 : notion fraction_calcul,
# 06-additionner, 07-multiplier, 08-inverse, 09-diviser, paysage + short
# chacun) : les petits OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI 6e/frac_commun.py NI les scripts
# de 6e (IMPORTÉS), NI les fichiers des lots D et F (des passages en sont
# RECOPIÉS ici, pas importés : ils changent en même temps). Ajouté ici :
#   · PaysageE / ShortE : PaysageLotC / ShortLotC du lot C de 6e (calc() au mot,
#     rep() / rep_fin() : la réponse posée au mot, expression(), personne())
#     en « Maths 4e » ;
#   · l'AUDIT de synchro et le contrôle des BORDS (REGLES.md, 25/10), RECOPIÉS
#     de 4e/frac_lotd_commun.py : AUDIT=1 BORDS=1 python -m manim render
#     --dry_run … → AUDIT-AVANCE doit être 0 (le dénominateur d'une fraction
#     écrite et les graduations ne sont pas audités : « 3 quarts » ne dit pas 4) ;
#   · au_nb() : attend le dernier nombre d'un extrait (« divisé par 2 » → le 2) ;
#   · question_pause() : chaque choix écrit au mot de SON contenu (recopié du lot D).

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from frac_lotc_commun import *  # noqa: E402,F401,F403
from stats_lycee_h2_commun import CompteARebours  # noqa: E402,F401

_NB = re.compile(r"\d+(?:,\d+)?")
MIEL = "#f59e0b"


def _txts(m):
    return [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)]


def _marquer(cls, quoi):
    """À la construction, marque les textes qu'on n'audite pas (sans toucher
    canvas_fractions.py) : le dénominateur d'une fraction écrite, les graduations."""
    init = cls.__init__

    def neuf(self, *a, **k):
        init(self, *a, **k)
        for g in quoi(self):
            for t in g.get_family():
                t._pas_audit = True

    cls.__init__ = neuf


_marquer(EcritureFraction, lambda f: [f.den])
_marquer(Droite, lambda d: list(d.etiquettes.values()))


def pas_audit(m):
    """Un décor qui porte des nombres non dits (graduations, étiquettes de figure)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


class _AuditBords:
    """AUDIT=1 (synchro) et BORDS=1 (marges), mesurés à chaque vraie animation."""

    def setup(self):
        super().setup()
        if os.environ.get("AUDIT") != "1" and os.environ.get("BORDS") != "1":
            return
        orig = self.renderer.play

        def play(scene, *a, **k):
            avant = {id(t) for m in scene.mobjects for t in _txts(m)}
            t0 = self.renderer.time
            orig(scene, *a, **k)
            if os.environ.get("AUDIT") == "1":
                self._auditer(avant, t0)
            if os.environ.get("BORDS") == "1":
                self._bords()

        self.renderer.play = play

    def _auditer(self, avant, t0):
        cle = getattr(self, "_cle_voix", None)
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(cle, []) if cle else []
        for m in self.mobjects:
            for f in m.get_family():
                if type(f).__name__ == "CompteARebours":
                    for g in f.get_family():
                        g._pas_audit = True
        for m in self.mobjects:
            for t in _txts(m):
                if id(t) in avant or getattr(t, "_pas_audit", False) or getattr(t, "_audite", False):
                    continue
                if t.get_fill_opacity() < 0.05:
                    continue
                t._audite = True
                s = re.sub(r"/\s*\d+", "", t.original_text.replace("−", "").replace(" ", " "))
                for nb in _NB.findall(s):
                    occ = [x.start() for x in re.finditer(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)", voix)]
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [max([mm[1] for mm in marques if mm[0] <= i] or [0.0]) + getattr(self, "_debut_voix", 0)
                           for i in occ]
                    if t0 < tps[0] - 0.06:
                        print(f"AUDIT-AVANCE {cle} « {nb} » ({t.original_text[:30]}) {tps[0] - t0:.2f} s", flush=True)
                    else:
                        dernier = max(x for x in tps if x <= t0 + 0.06)
                        if t0 - dernier > 0.4:
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s",
                                  flush=True)

    def _bords(self):
        mg = config.frame_width * 0.03
        lx, ly = config.frame_width / 2 - mg, config.frame_height / 2 - mg
        vus = getattr(self, "_bords_vus", set())
        for mob in self.mobjects:
            if type(mob).__name__.startswith("Mascotte"):
                continue
            for f in [mob] + list(mob.submobjects):
                if type(f).__name__.startswith("Mascotte") or (not f.has_points() and not f.submobjects):
                    continue
                if f.width < 1e-3 and f.height < 1e-3:
                    continue
                if isinstance(f, VMobject) and not f.submobjects and f.get_fill_opacity() < 0.05 \
                        and f.get_stroke_opacity() < 0.05:
                    continue
                g, d, b, h = f.get_left()[0], f.get_right()[0], f.get_bottom()[1], f.get_top()[1]
                if g < -lx or d > lx or b < -ly or h > ly:
                    c = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(g, 1), round(d, 1), round(b, 1),
                         round(h, 1))
                    if c not in vus:
                        vus.add(c)
                        print(f"BORD {c[0]} {c[1]} x[{c[2]}, {c[3]}] y[{c[4]}, {c[5]}]", flush=True)
        self._bords_vus = vus


class _OutilsE:
    """au_nb() et la question-pause dont chaque choix s'écrit au mot de SON
    contenu (recopiés de 4e/frac_lotd_commun.py)."""

    def _pos(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix : {self._texte_voix[:60]}…")
        return i

    def _attendre_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.4:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def au_nb(self, extrait, n=1, cible=None):
        """Attend le DERNIER nombre de `extrait` (ou le mot `cible` dedans)."""
        i = self._pos(extrait, n)
        if cible is not None:
            k = extrait.rfind(cible)
        else:
            nbs = list(re.finditer(r"\d+(?:,\d+)?", extrait))
            k = nbs[-1].start() if nbs else 0
        self._attendre_pos(i + k)

    def montre(self, mots, objets, anim="pop", run_time=0.35, avec=()):
        """Pose objets[i] au mot mots[i] (le DERNIER nombre de l'extrait s'il en a un).
        `avec` : jouées avec le premier."""
        for k, (mot, ob) in enumerate(zip(mots, objets)):
            self.au_nb(mot) if re.search(r"\d", mot) else self.au_mot(mot)
            a = FadeIn(ob, scale=1.3) if anim == "pop" else FadeIn(ob, shift=RIGHT * 0.2)
            self.play(a, *(list(avec) if k == 0 else []), run_time=run_time)

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None, avant_q=None):
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if mot_q:
            self.au_mot(mot_q)
        if avant_q:
            avant_q(self)
        self.poser_lignes(q, "up", 0.35)
        voix = self._texte_voix
        for c, mot in zip(cartes, mots_choix):
            self.au_mot(mot)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            j = voix.find(mot) + len(mot)
            while j < len(voix) and voix[j] == " ":
                j += 1
            if voix[j:].lower().startswith("moins "):  # « moins 1 sixième » : on attend le 1
                j += 6
            self._attendre_pos(j)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)
        if autres_q:
            autres_q(self)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        self.dire(cle_r)
        b = cartes[bonne]
        corps = b[1][1]
        place = b[0].get_right()[0] - 0.65 - corps.get_left()[0]
        if corps.get_right()[0] > b[0].get_right()[0] - 0.6:
            gauche = corps.get_left()[0]
            corps.scale_to_fit_width(max(0.4, place))
            corps.shift(RIGHT * (gauche - corps.get_left()[0]))
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.25)
        ok = self.coche(VERT_OK, 0.22).move_to(b[0].get_right() + LEFT * 0.33)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.15)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()), run_time=0.15)
        if autres_r:
            autres_r(self)
        self.poser_lignes(ph, "up", 0.35)
        self.attendre_voix(marge=0.8)
        return t0


class PaysageE(_AuditBords, _OutilsE, PaysageLotC):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    def finale_colonne(self, textes, fs=38, figure=None):
        """Celle du lot H2, mais le titre « Ce que tu as appris » à 0,5 du haut
        (to_edge(UP, 0.3) le collait à la marge des 3 %)."""
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

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0):
        t = self.col(self.t(txt, fs, couleur), y)
        self.play(Write(t), run_time=0.5)
        return t


class ShortE(_AuditBords, _OutilsE, ShortLotC):
    ceinture = "blanche"
