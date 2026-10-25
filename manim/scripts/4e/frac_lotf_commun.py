# frac_lotf_commun.py
# EleveAI — série « Fractions », 4e, LOT F (25/10/2026 : notion fraction_calcul,
# 10-quantite, 11-oppose, 12-defi, paysage + short chacun) : les petits OUTILS
# COMMUNS du lot. Pas de scène ici.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI 6e/frac_commun.py NI les scripts
# de 6e : ils sont IMPORTÉS. Ce qui manquait est ICI (signalé au rapport) :
#   · PaysageF / ShortF : PaysageB / ShortB du lot B de 6e (6e/frac_lotb_commun.py,
#     importé : lignes écrites MORCEAU PAR MORCEAU AU MOT, correctif « Et 3 »,
#     question_b() dont la réponse se pose au mot) en « Maths 4e » ;
#   · l'AUDIT de synchro et le contrôle des BORDS (REGLES.md, 25/10), RECOPIÉS
#     de 4e/frac_lotd_commun.py (l'autre lot de 4e, non importé : il change en
#     même temps) : AUDIT=1 BORDS=1 python -m manim render --dry_run … →
#     AUDIT-AVANCE doit être 0 ;
#   · question_pause() : chaque choix écrit au mot de SON contenu (RECOPIÉ du
#     lot D : le J2 l'écrivait 0,25 s après la lettre, parfois avant le nombre) ;
#   · moins_frac() : « −3/4 » (le signe « − » à la hauteur du trait).

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from frac_lotb_commun import *  # noqa: E402,F401,F403

_NB = re.compile(r"\d+(?:,\d+)?")


def _txts(m):
    return [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)]


def _marquer(cls, quoi):
    """Sans toucher canvas_fractions.py : à la construction, marque les textes
    qu'on n'audite pas (le dénominateur d'une fraction écrite, les graduations)."""
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
    """Un décor qui porte des nombres non dits (graduations, « 20 cm » d'un plan…)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def moins_frac(num, den, fs=64, couleur=WHITE, signe="−", **kw):
    """« −3/4 » : le signe devant la fraction, à la hauteur du trait.
    .signe .f (l'EcritureFraction : .num .trait .den)."""
    f = EcritureFraction(num, den, fs=fs, couleur=couleur, **kw)
    s = Text(signe, font_size=fs, color=kw.get("num_c") or couleur)
    s.sans_synchro = True
    g = VGroup(s, f).arrange(RIGHT, buff=fs / 500)
    s.set_y(f.trait.get_y())
    g.signe, g.f = s, f
    g.num, g.trait, g.den = f.num, f.trait, f.den
    return g


class _AuditBords:
    """AUDIT=1 (synchro) et BORDS=1 (marges), mesurés à chaque vraie animation
    (RECOPIÉ de 4e/frac_lotd_commun.py)."""

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
                            print(f"AUDIT-TARD {cle} « {nb} » ({t.original_text[:30]}) {t0 - dernier:.2f} s", flush=True)

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


class _ChoixAuMot:
    """question_pause() du lot J2 (stmg/stats_lycee_j2_commun.py), RECOPIÉE de
    4e/frac_lotd_commun.py : chaque CHOIX s'écrit au mot de SON contenu (« A : 7 » :
    la lettre au « A », le 7 au « 7 »), jamais avant."""

    def _attendre_pos(self, i):
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.4:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def q_au_mot(self, extrait):
        """Dans un avant_q : la question entière apparaît au mot `extrait` (le
        CHIFFRE d'un nombre négatif, jamais le « moins » qui le précède)."""
        self.au_mot(extrait)
        self.play(FadeIn(self.q_q, shift=UP * 0.15), run_time=0.35)
        self._q_pose = True

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None, avant_q=None):
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours, ph = self._disposer_q(question, choix, phrase)
        self.q_q, self._q_pose = q, False
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if mot_q:
            self.au_mot(mot_q)
        if avant_q:
            avant_q(self)
        if not self._q_pose:  # avant_q peut poser la question lui-même, au mot de son nombre (q_au_mot)
            self.poser_lignes(q, "up", 0.35)
        voix = self._texte_voix
        for c, mot in zip(cartes, mots_choix):
            self.au_mot(mot)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            j = voix.find(mot) + len(mot)
            while j < len(voix) and voix[j] == " ":
                j += 1
            if voix.startswith("moins ", j):  # « C : moins 5 neuvièmes » : on attend le 5
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


class PaysageF(_AuditBords, _ChoixAuMot, PaysageB):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0, centre=False):
        t = self.t(txt, fs, couleur)
        t.move_to(P(0, y)) if centre else self.col(t, y)
        self.play(Write(t), run_time=0.5)
        return t


class ShortF(_AuditBords, _ChoixAuMot, ShortB):
    ceinture = "blanche"

    def bas(self, mob, y=-1.3):
        """Un texte ou un calcul centré dans la bande du bas."""
        return self.borne(mob).move_to(P(0, y))
