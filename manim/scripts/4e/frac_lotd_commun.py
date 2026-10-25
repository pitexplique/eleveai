# frac_lotd_commun.py
# EleveAI — série « Fractions », 4e, LOT D (25/10/2026 : notion fraction_nombre,
# 01-egale, 02-simplifier, 03-decimal, 04-rationnel, 05-comparer) : les petits
# OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI 6e/frac_commun.py NI les scripts
# de 6e : ils sont IMPORTÉS ; ce qui manquait est ICI (signalé au rapport) :
#   · PaysageLotD / ShortLotD : PaysageFrac / ShortFrac en « Maths 4e », avec
#     les outils du lot A de 6e RECOPIÉS (rep, q_tete, fin_rep, montrer2 : la
#     réponse d'une question-pause ligne par ligne, chacune À SON MOT) ;
#   · l'AUDIT de synchro (REGLES.md, 25/10) : AUDIT=1 … --dry_run → une ligne
#     AUDIT-AVANCE par nombre écrit AVANT d'être dit (doit être 0), AUDIT-TARD
#     quand il arrive plus de 0,4 s après (à relire) ; mesuré à CHAQUE vraie
#     animation (renderer.play), donc après les attentes de la synchro ;
#     les dénominateurs (« 3 quarts » ne dit pas « 4 ») et les graduations de
#     la Droite ne sont pas audités ;
#   · BORDS=1 : signale tout objet à moins de 3 % du bord (modèle : stmg/h1) ;
#   · personne() : un personnage-métier générique (recopié de 6e/frac_lotc_commun.py).

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from frac_commun import *  # noqa: E402,F401,F403

PEAUX = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a21"]
_NB = re.compile(r"\d+(?:,\d+)?")


def personne(peau="#c68642", tenue="#6366f1", cheveux="#1f2937", longs=False, s=1.0):
    """Un personnage debout : .tete .cheveux .corps ; accessoire avec .add()."""
    tete = Circle(radius=0.42, fill_color=peau, fill_opacity=1, stroke_width=0)
    calotte = AnnularSector(inner_radius=0, outer_radius=0.46, angle=PI, start_angle=0, fill_color=cheveux,
                            fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    meches = VGroup()
    if longs:
        for x in (-0.4, 0.4):
            meches.add(RoundedRectangle(width=0.22, height=0.75, corner_radius=0.1, fill_color=cheveux,
                                        fill_opacity=1, stroke_width=0).move_to(P(x, -0.2)))
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color=tenue,
                    fill_opacity=1, stroke_width=0)
    g = VGroup(corps, meches, tete, calotte)
    g.tete, g.cheveux, g.corps = tete, VGroup(calotte, meches), corps
    return g.scale(s)


def sans_synchro(m):
    for f in m.get_family():
        f.sans_synchro = True
    return m


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
                s = re.sub(r"/\s*\d+", "", t.original_text.replace("−", "").replace(" ", " "))
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
                if isinstance(f, VMobject) and not f.submobjects and f.get_fill_opacity() < 0.05                         and f.get_stroke_opacity() < 0.05:
                    continue
                g, d, b, h = f.get_left()[0], f.get_right()[0], f.get_bottom()[1], f.get_top()[1]
                if g < -lx or d > lx or b < -ly or h > ly:
                    c = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(g, 1), round(d, 1), round(b, 1),
                         round(h, 1))
                    if c not in vus:
                        vus.add(c)
                        print(f"BORD {c[0]} {c[1]} x[{c[2]}, {c[3]}] y[{c[4]}, {c[5]}]", flush=True)
        self._bords_vus = vus


from stats_lycee_j2_commun import _MOT, _jetons  # noqa: E402
from stats_lycee_h2_commun import CompteARebours  # noqa: E402,F401


class _AttenteLotD:
    """La synchro par jetons du lot J2, resserrée comme le lot C de 6e
    (RECOPIÉ de 6e/frac_lotc_commun.py) : un mot déjà dit il y a plus de
    0,45 s et qui revient dans les 6 s fait attendre ce retour ; un objet
    `sans_synchro` n'attend rien (on le pose AU MOT, voir au_nb)."""

    def _attente(self, textes):
        voix = getattr(self, "_texte_voix", "") or ""
        marques = self._marques().get(getattr(self, "_cle_voix", None)) or []
        textes = [f for f in textes if not getattr(f, "sans_synchro", False)]
        if not marques or not textes:
            return 0.0
        ecoule = self.renderer.time - self._debut_voix
        dit = max([m[0] for m in marques if m[1] <= ecoule + 0.05] or [0])
        fin = dit
        while fin < len(voix) and (voix[fin].isalnum() or voix[fin] in ",'"):
            fin += 1
        bas = voix.lower()
        dits = [(m.group(0), m.start()) for m in _MOT.finditer(bas[:fin])]
        futur = [(m.group(0), m.start()) for m in _MOT.finditer(bas) if m.start() >= fin]
        t_de = lambda pos: max([t for p, t in marques if p <= pos] or [0])  # noqa: E731
        b = 0.0
        for f in textes:
            for j in _jetons(f.original_text):
                avant = [p for w, p in dits if w == j]
                apres = next((p for w, p in futur if w == j), None)
                if avant and ecoule - t_de(max(avant)) <= 0.45:
                    continue
                if apres is not None:
                    tm = t_de(apres) - ecoule
                    if tm <= (6.0 if avant else 10.0):
                        b = max(b, tm)
                        continue
        return b

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
        """Attend le DERNIER nombre de `extrait` (ou le mot `cible` dedans) :
        « divisé par 2 » → l'instant où la voix dit « 2 » (une étiquette « ÷ 2 »
        n'apparaît jamais avant son nombre)."""
        i = self._pos(extrait, n)
        if cible is not None:
            k = extrait.rfind(cible)
        else:
            nbs = list(re.finditer(r"\d+(?:,\d+)?", extrait))
            k = nbs[-1].start() if nbs else 0
        self._attendre_pos(i + k)


class _Reponses:
    """Les outils du lot A de 6e (frac_lire_ecrire.py), RECOPIÉS : la réponse
    d'une question-pause s'écrit LIGNE PAR LIGNE, chacune à SON mot, avec le
    geste de la figure (jamais une ligne qui attend la fin du geste)."""

    def _ranger_q(self, tete, q, cartes, pause, rebours, ph):
        bas = -config.frame_height / 2 + 0.45
        if len(ph) and ph.get_bottom()[1] < bas:  # jamais sous la marge du bas
            haut = ph.get_top()
            ph.scale((haut[1] - bas) / ph.height, about_point=haut)
        self.cartes_q, self.ph_q, self.q_q = cartes, ph, q
        return tete, q, cartes, pause, rebours, ph

    def q_tete(self, *anims):
        """Dans un avant_q : la 1re ligne de la question À SON MOT, avec la figure."""
        l0 = self.q_q[0]
        self.play(FadeIn(l0, shift=UP * 0.15), *anims, run_time=0.5)
        self.q_q.remove(l0)

    def rep(self, i, mot, *anims, run_time=0.5, n=1):
        """La ligne i de l'explication, AU MOT, avec le geste de la figure."""
        self.au_mot(mot, n=n)
        k = re.search(r"\d", mot)
        if k:  # le premier NOMBRE de l'extrait, pas le mot qui le précède
            self._attendre_pos(self._pos(mot, n) + k.start())
        sans_synchro(self.ph_q[i])  # elle paraît À CE MOT (le 1er nombre de la ligne), pas plus tard
        self.play(FadeIn(self.ph_q[i], shift=UP * 0.15), *anims, run_time=run_time)

    def fin_rep(self):
        """Les lignes sont posées : question_pause n'a plus rien à poser."""
        self.ph_q.submobjects = []

    def montrer2(self, lg, *mots, autres=()):
        """« Ce que tu as appris » : la coche et la 1re ligne au 1er mot, chaque
        ligne suivante à SON mot."""
        sans_synchro(lg)
        self._au_mot_nb(mots[0])
        self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), *autres, run_time=0.5)
        for m, l in zip(mots[1:], lg[1][1:]):
            self._au_mot_nb(m)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.35)

    def _au_mot_nb(self, mot, n=1):
        """au_mot, puis, si l'extrait contient un nombre, attend CE nombre."""
        self.au_mot(mot, n=n)
        k = re.search(r"\d", mot)
        if k:
            self._attendre_pos(self._pos(mot, n) + k.start())

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None, avant_q=None):
        """La question-pause du lot J2 (RECOPIÉE de stmg/stats_lycee_j2_commun.py
        avec le crochet avant_q de 6e/frac_commun.py), mais chaque CHOIX
        s'écrit au mot de SON contenu (« A : 12 » : la lettre au « A », le 12
        au « 12 ») — le J2 l'écrivait 0,25 s après la lettre, parfois avant."""
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
            fin = voix.find(".", j + 1)  # le choix dit va jusqu'au point (« 0,25. » : la virgule n'arrête pas)
            while 0 <= fin < len(voix) - 1 and voix[fin + 1].isdigit():
                fin = voix.find(".", fin + 1)
            k = re.search(r"\d", voix[j:fin if fin > 0 else len(voix)])
            self._attendre_pos(j + k.start() if k else j)  # le choix paraît à SON NOMBRE
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

    def frac(self, num, den, fs=80, **kw):
        return EcritureFraction(num, den, fs=fs, **kw)


class PaysageLotD(_AuditBords, _AttenteLotD, _Reponses, PaysageFrac):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    def _disposer_q(self, question, choix, phrase):
        return self._ranger_q(*super()._disposer_q(question, choix, phrase))

    def titre(self, txt, couleur=JAUNE_TITRE, fs=46, y=3.0, centre=False):
        t = self.t(txt, fs, couleur)
        t.move_to(P(0, y)) if centre else self.col(t, y)
        self.play(Write(t), run_time=0.5)
        return t


class ShortLotD(_AuditBords, _AttenteLotD, _Reponses, ShortFrac):
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """Les cartes SOUS la question (jamais par-dessus), la consigne dessous."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return self._ranger_q(tete, q, cartes, pause, rebours, ph)
