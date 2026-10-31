# pythagore_pauses.py
# EleveAI — série PYTHAGORE 4e (+ 3e solide), refonte du 31/10/2026 : le module
# COMMUN des questions-pauses (REGLES.md, 23/10 et 24/10). Pas de scène ici.
# Modèles recopiés : question_pause / _disposer_q (4e/frac_lotd_commun.py), l'audit
# de synchro (stmg/stats_lycee_j1_commun.py), CompteARebours (stmg/stats_lycee_h2_commun.py).
#
# ── L'API (agents des autres épisodes : on l'UTILISE, on ne la modifie pas) ──────
#   from pythagore_pauses import PausesPaysage, PausesShort, sans_audit
#   class MaScene(PausesPaysage, Notion4e)   /   class MonShort(PausesShort, Short6e)
#   (le mixin EN PREMIER ; une scène qui hérite d'une scène Pythagore l'hérite aussi.)
#   · Marques mot à mot : <dossier du script>/<nom_voix>.marques.json (scripts/marques_dump.ps1
#     -Debit -7, puis scripts/cues2marques.py sur le .cues.tsv). au_mot() s'y cale ;
#     sans fichier : prorata des caractères (alerte SANS-MARQUES).
#   · au_mot(extrait, n=1) ; au_nb(extrait, n=1) attend le DERNIER nombre de l'extrait.
#   · ecran_question(cle_q, cle_r, question, choix, bonne, phrase, figure=None, x_col=None)
#     efface, pose Ti-Margo (+ la figure), puis question_pause() (même chose sans effacer).
#     question / phrase : listes de LIGNES ; une ligne = str, Mobject, ou liste de MORCEAUX
#     (posés côte à côte). Chaque morceau paraît quand la voix dit son 1er mot ET son dernier
#     nombre (« 6² » s'écrit composé tout seul ; « 40 virgule 5 » dit = « 40,5 » écrit).
#     choix : 3 str/Mobject (ou liste de str = un choix long sur plusieurs lignes) ; bonne : 0/1/2 ;
#     phrase=[] permis. Imprime « QUESTION <clé> t=MM:SS » (le t du JSON). Réglages (attributs de
#     classe, surchargeables dans la scène) : LARG (largeur des cartes), FS_Q, FS_C, FS_PH, Y_TETE.
#   · page_abonnement(voix="NN-abonne") : la fin du 19/10 (paysage ou short, au choix du mixin).
#   · AUDIT=1 BORDS=1 python -m manim render --dry_run … → AUDIT-AVANCE (doit être 0),
#     RETARD (doit être 0), AUDIT-TARD (> 0,4 s : à relire), AUDIT-ABSENT, BORD (< 3 %).
#   · sans_audit(m) : un texte qu'on LIT sans qu'il soit dit (poignée, identité, figure).

import inspect
import json
import os
import re
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # manim/

from manim import *  # noqa: E402,F401,F403

from charte import *  # noqa: E402,F401,F403

_NB = re.compile(r"\d+(?:,\d+)?")
_MOT = re.compile(r"[a-zàâäçéèêëîïôöùûüœ']{3,}")


def P(x, y):
    return np.array([x, y, 0.0])


def sans_audit(m):
    for f in m.get_family():
        f._pas_audit = True
    return m


def _txts(m):
    return [f for f in m.get_family() if isinstance(f, Text) and getattr(f, "original_text", None)
            and not getattr(f, "_pas_audit", False)]


def _ecrit(s):
    """Le texte écrit, pour y chercher les nombres : « 10 000 » → « 10000 »."""
    return re.sub(r"(?<=\d)[   ](?=\d{3}\b)", "", s.replace("−", ""))


def _voix_norm(v):
    """« 40 virgule 5 » → « 40,5 ». Renvoie (texte, idx) : idx[k] = position d'origine."""
    out, idx, i = [], [], 0
    for m in re.finditer(r"(?<=\d) virgule (?=\d)", v):
        out += list(v[i:m.start()]) + [","]
        idx += list(range(i, m.start())) + [m.start()]
        i = m.end()
    out += list(v[i:])
    idx += list(range(i, len(v)))
    return "".join(out), idx


def _occ(nb, voix):
    return [x.start() for x in re.finditer(r"(?<![\d,])" + re.escape(nb) + r"(?![\d]|,\d)", voix)]


def texte_maths(s, fs=36, color=WHITE):
    """Un Text ; « n² » y est COMPOSÉ (le 2 petit et levé, comme carre_de)."""
    if "²" not in s:
        return Text(s, font_size=fs, color=color)
    t = Text(s.replace("²", "2"), font_size=fs, color=color)
    glyphes = [c for c in s if not c.isspace()]
    for k, c in enumerate(glyphes):
        if c != "²":
            continue
        g, base = t[k], t[k - 1]
        avant = g.get_right()[0]
        g.scale(0.7).next_to(base, RIGHT, buff=0.03).align_to(base, UP).shift(UP * base.height * 0.2)
        for h in t[k + 1:]:  # l'espace qui suivait le 2 est gardé
            h.shift(RIGHT * (g.get_right()[0] - avant))
        g._pas_audit = True  # l'exposant ne se « dit » pas : « 6 au carré »
    t.original_text = s
    return t


def pastille_pause(h=0.5, couleur=ORANGE_RETENUE):
    """Le signe « pause » DESSINÉ (deux barres), jamais un emoji."""
    b = lambda: RoundedRectangle(width=h * 0.3, height=h, corner_radius=0.04, fill_color=couleur,  # noqa: E731
                                 fill_opacity=1, stroke_width=0)
    return VGroup(b(), b()).arrange(RIGHT, buff=h * 0.22)


class CompteARebours(VGroup):
    """Un anneau qui se vide et le chiffre au centre (5, 4, 3…), une seconde par chiffre."""

    def __init__(self, duree=5, r=0.45, couleur=ORANGE_RETENUE, fs=40, **kw):
        super().__init__(**kw)
        self.duree, self.r, self.couleur, self.fs = duree, r, couleur, fs
        self.fond = Circle(radius=r, stroke_color=GREY_D, stroke_width=8)
        self.anneau = Arc(radius=r, start_angle=PI / 2, angle=-TAU * 0.9999, stroke_color=couleur, stroke_width=8)
        self.chiffre = Text(str(duree), font_size=fs, color=WHITE)
        self.add(self.fond, self.anneau, self.chiffre)
        sans_audit(self)

    def jouer(self, scene):
        c = self.fond.get_center()
        r = self.fond.width / 2
        for k in range(self.duree, 0, -1):
            self.chiffre.become(Text(str(k), font_size=self.fs, color=WHITE).scale(r / self.r).move_to(c))
            debut = k / self.duree

            def maj(m, a, debut=debut):
                frac = max(1e-4, debut - a / self.duree)
                m.become(Arc(radius=r, start_angle=PI / 2, angle=-TAU * frac, arc_center=c,
                             stroke_color=self.couleur, stroke_width=8))

            scene.play(UpdateFromAlphaFunc(self.anneau, maj, rate_func=linear),
                       Indicate(self.chiffre, scale_factor=1.25, color=self.couleur), run_time=1.0)
        self.chiffre.become(Text("0", font_size=self.fs, color=WHITE).scale(r / self.r).move_to(c))


class _Pauses:
    """La voix calée sur les marques, l'audit, les bords et la question-pause."""

    duree_q = 5
    fichier_marques = None  # par défaut : f"{nom_voix}.marques.json", à côté du script de la scène

    # ── la voix, mot à mot ──────────────────────────────────────────────────

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            nom = self.fichier_marques or f"{self.nom_voix}.marques.json"
            ch = Path(inspect.getfile(type(self))).resolve().parent / nom
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8-sig")) if ch.exists() else {}
            if not self._cache_marques:
                print(f"SANS-MARQUES {ch.name} : au_mot au prorata des caractères", flush=True)
        return self._cache_marques

    def dire(self, nom, dossier=None):
        d = super().dire(nom, dossier)
        self._cle_voix = nom if dossier is None else None
        t = self.renderer.time
        print(f"ECRAN {nom} t={int(t // 60):02d}:{int(t % 60):02d} ({t:.2f})", flush=True)
        return d

    def _t_pos(self, i):
        """L'instant (absolu) où la voix en cours dit le mot qui contient la position i."""
        m = self._marques().get(getattr(self, "_cle_voix", None))
        if m:
            t = max([x[1] for x in m if x[0] <= i] or [0.0])
        else:
            t = (getattr(self, "_duree_voix", 0) or 0) * i / max(1, len(self._texte_voix))
        return getattr(self, "_debut_voix", 0.0) + t

    def _attendre_pos(self, i):
        if not getattr(self, "_duree_voix", 0):
            return
        reste = self._t_pos(i) - self.renderer.time
        if reste < -0.4:
            print(f"RETARD {self._cle_voix} « {self._texte_voix[i:i + 25]} » : {-reste:.2f} s", flush=True)
        if reste > 0.03:
            self.wait(reste)

    def _pos(self, extrait, n=1):
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix : {self._texte_voix[:60]}…")
        return i

    def au_mot(self, extrait, n=1):
        """Attend que la voix DISE `extrait` (son premier mot)."""
        self._attendre_pos(self._pos(extrait, n))

    def au_nb(self, extrait, n=1):
        """Attend le DERNIER nombre de `extrait` (« l'épisode 2 » → le « 2 »)."""
        i = self._pos(extrait, n)
        nbs = list(_NB.finditer(extrait))
        self._attendre_pos(i + (nbs[-1].start() if nbs else 0))

    def _cue(self, mob, depuis):
        """(position du morceau dans la voix, nouvelle position de départ) : son 1er mot
        et son DERNIER nombre, cherchés à partir de `depuis` ; None si rien n'est dit."""
        brut = self._texte_voix
        voix, idx = _voix_norm(brut)
        k0 = next((k for k, j in enumerate(idx) if j >= depuis), len(idx))
        bas = voix.lower()
        pos, cible = k0, None
        txt = " ".join(_ecrit(t.original_text) for t in _txts(mob))
        mots = _MOT.findall(txt.lower())
        if mots:
            j = bas.find(mots[0], k0)
            if j >= 0:
                cible = j
        for nb in _NB.findall(txt):
            o = [x for x in _occ(nb, voix) if x >= pos]
            if o:
                pos = o[0] + len(nb)
                cible = o[0] if cible is None else max(cible, o[0])
        if cible is None:
            return None, depuis
        return idx[cible], idx[max(pos, cible + 1) - 1] + 1

    # ── l'audit (AUDIT=1) et les bords (BORDS=1), à chaque vraie animation ────

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
        if not cle or not getattr(self, "_duree_voix", 0):
            return
        voix, idx = _voix_norm(self._texte_voix or "")
        for m in self.mobjects:
            for t in _txts(m):
                if id(t) in avant or getattr(t, "_audite", False) or t.get_fill_opacity() < 0.05:
                    continue
                if t.original_text.strip() == getattr(self, "identite", None):
                    continue
                t._audite = True
                for nb in _NB.findall(_ecrit(t.original_text)):
                    occ = _occ(nb, voix)
                    if not occ:
                        print(f"AUDIT-ABSENT {cle} « {nb} » ({t.original_text[:30]})", flush=True)
                        continue
                    tps = [self._t_pos(idx[i]) for i in occ]
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
                if (isinstance(f, VMobject) and not f.submobjects and f.get_fill_opacity() < 0.05
                        and f.get_stroke_opacity() < 0.05):
                    continue
                g, d, b, h = f.get_left()[0], f.get_right()[0], f.get_bottom()[1], f.get_top()[1]
                if g < -lx or d > lx or b < -ly or h > ly:
                    c = (getattr(self, "_cle_voix", "?"), type(f).__name__, round(g, 1), round(d, 1),
                         round(b, 1), round(h, 1))
                    if c not in vus:
                        vus.add(c)
                        print(f"BORD {c[0]} {c[1]} x[{c[2]}, {c[3]}] y[{c[4]}, {c[5]}]", flush=True)
        self._bords_vus = vus

    # ── la question-pause ───────────────────────────────────────────────────

    def _ligne(self, l, fs, color=WHITE):
        """Une ligne : str, Mobject ou liste de morceaux. Renvoie (ligne, morceaux)."""
        morceaux = l if isinstance(l, (list, tuple)) else [l]
        ms = [texte_maths(x, fs, color) if isinstance(x, str) else x for x in morceaux]
        return VGroup(*ms).arrange(RIGHT, buff=0.18), ms

    def _bloc(self, lignes, fs, color=WHITE):
        g, tous = VGroup(), []
        for l in lignes:
            ligne, ms = self._ligne(l, fs, color)
            g.add(ligne)
            tous += ms
        if not len(g):  # pas de phrase (« Réponse B : 48. » seul)
            g.morceaux = []
            return g
        g.arrange(DOWN, buff=0.14)
        if g.width > self.LARG:
            g.scale_to_fit_width(self.LARG)
        g.morceaux = tous
        return g

    def _carte(self, lettre, contenu, fs):
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        lt = sans_audit(Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond))
        if isinstance(contenu, (list, tuple)):  # un choix long : plusieurs lignes
            corps = VGroup(*[texte_maths(x, fs) for x in contenu]).arrange(DOWN, aligned_edge=LEFT, buff=0.08)
        else:
            corps = texte_maths(contenu, fs) if isinstance(contenu, str) else contenu
        ligne = VGroup(VGroup(rond, lt), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > self.LARG - 0.8:
            ligne.scale_to_fit_width(self.LARG - 0.8)
        cadre = RoundedRectangle(width=self.LARG, height=max(0.62 * fs / 34 + 0.16, ligne.height + 0.26),
                                 corner_radius=0.14, stroke_color=BLEU_CALCUL, stroke_width=3,
                                 fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def _disposer_q(self, question, choix, phrase, x_col):
        tete = VGroup(pastille_pause(self.FS_TETE / 100), Text("Question !", font_size=self.FS_TETE,
                                                               color=ORANGE_RETENUE)).arrange(RIGHT, buff=0.22)
        rebours = CompteARebours(self.duree_q, r=self.R_REB, fs=int(self.R_REB * 90))
        haut = VGroup(tete, rebours).arrange(RIGHT, buff=self.ECART * 1.5).move_to(P(x_col, self.Y_TETE))
        if haut.width > self.LARG:
            haut.scale_to_fit_width(self.LARG)
        q = self._bloc(question, self.FS_Q).next_to(haut, DOWN, buff=self.ECART).set_x(x_col)
        cartes = VGroup(*[self._carte(l, c, self.FS_C) for l, c in zip("ABC", choix)])
        cartes.arrange(DOWN, buff=self.ECART * 0.5).next_to(q, DOWN, buff=self.ECART).set_x(x_col)
        pause = Text("Mets pause, et choisis !", font_size=self.FS_PH, color=ORANGE_RETENUE)
        if pause.width > self.LARG * 0.92:
            pause.scale_to_fit_width(self.LARG * 0.92)
        pause.next_to(cartes, DOWN, buff=self.ECART).set_x(x_col)
        ph = self._bloc(phrase, self.FS_PH, VERT_OK)
        if len(ph):
            ph.next_to(cartes, DOWN, buff=self.ECART).set_x(x_col)
        if len(ph) and ph.get_bottom()[1] < self.Y_BAS:  # jamais sous la marge du bas
            ph.scale((ph.get_top()[1] - self.Y_BAS) / ph.height, about_edge=UP)
        return tete, rebours, q, cartes, pause, ph

    def _poser(self, bloc, depuis):
        """Chaque morceau À SON MOT (1er mot dit et dernier nombre dit)."""
        for m in bloc.morceaux:
            i, depuis = self._cue(m, depuis)
            if i is not None:
                self._attendre_pos(i)
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.3)
        return depuis

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, x_col=0.0):
        self.dire(cle_q)
        t0 = self.renderer.time
        tete, rebours, q, cartes, pause, ph = self._disposer_q(question, choix, phrase, x_col)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        self._poser(q, self._pos("Question") + 9)
        j = self._pos("Question")
        for c, lettre in zip(cartes, "ABC"):
            j = self._texte_voix.find(f"{lettre} :", j + 1)
            if j < 0:
                raise ValueError(f"« {lettre} : » absent de la voix : {self._texte_voix[:60]}…")
            self._attendre_pos(j)
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            i, _ = self._cue(c[1][1], j + 3)
            if i is not None:
                self._attendre_pos(i)
            self.play(FadeIn(c[1][1], shift=RIGHT * 0.15), run_time=0.2)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle_q} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        self.dire(cle_r)
        self._attendre_pos(self._pos("Réponse") + 8)  # la lettre dite : la carte s'allume
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(VERT_OK, width=7).set_fill("#052e16", 1),
                 b[1][0][0].animate.set_fill(VERT_OK)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(3) if j != bonne]
        self.play(*anims, FadeOut(rebours), FadeOut(pause), run_time=0.3)
        ok = self.coche(VERT_OK, 0.22).move_to(b[0].get_right() + LEFT * 0.38)
        self.play(b.animate.scale(1.08), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.08), ok.animate.scale(1 / 1.08, about_point=b.get_center()),
                  run_time=0.2)
        fin = self._texte_voix.find(".", self._pos("Réponse"))
        self._poser(ph, fin + 1 if fin >= 0 else 0)
        self.attendre_voix(marge=0.8)
        return t0

    def ecran_question(self, cle_q, cle_r, question, choix, bonne, phrase, figure=None, x_col=None):
        """Un écran de question complet : efface, Ti-Margo, la figure (déjà placée), la question."""
        self.clear()
        self._margo()
        if figure is not None:
            self.add(figure)
        if x_col is None:
            x_col = 0.0 if figure is None or config.frame_width < 8 else 3.0
        return self.question_pause(cle_q, cle_r, question, choix, bonne, phrase, x_col)


class PausesPaysage(_Pauses):
    """Le mixin des PAYSAGES : compte à rebours de 5 s, colonne centrée (x_col)."""

    duree_q = 5
    LARG, FS_TETE, FS_Q, FS_C, FS_PH = 6.4, 46, 38, 36, 32
    Y_TETE, R_REB, ECART, Y_BAS = 3.0, 0.42, 0.32, -3.45

    def _margo(self):
        return self.add_mascotte()

    def page_abonnement(self, voix="09-abonne"):
        """La fin du 19/10 : « Entraîne-toi sur éleveai point f r. Et abonne-toi ! »"""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = Text("Entraîne-toi sur", font_size=46, color=JAUNE_TITRE).move_to(P(0, 2.05))
        site = Text("eleveai.fr", font_size=62, color=BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = Text("Abonne-toi !", font_size=44, color=VERT_OK).move_to(P(0, -0.6))
        poignee = sans_audit(Text("@eleveai974", font_size=48, color=VERT_OK).move_to(P(0, -1.6)))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)


class PausesShort(_Pauses):
    """Le mixin des SHORTS (cadre 4,5 × 8) : compte à rebours de 3 s, tout au centre,
    entre y = 2,9 et y = −2,2 (la zone sûre de ShortSeconde)."""

    duree_q = 3
    LARG, FS_TETE, FS_Q, FS_C, FS_PH = 3.9, 32, 28, 28, 26
    Y_TETE, R_REB, ECART, Y_BAS = 2.55, 0.27, 0.2, -2.2

    def _margo(self):
        return self.margo_bas()

    def page_abonnement(self, voix="03-abonne"):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        entraine = Text("Entraîne-toi sur", font_size=40, color=JAUNE_TITRE).move_to(P(0, 2.4))
        site = Text("eleveai.fr", font_size=54, color=BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = Text("Abonne-toi !", font_size=42, color=VERT_OK).move_to(P(0, 0.0))
        poignee = sans_audit(Text("@eleveai974", font_size=44, color=VERT_OK).move_to(P(0, -0.85)))
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)
