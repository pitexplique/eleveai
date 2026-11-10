# suites_commun.py
# EleveAI — Maths lycée — LE MODULE COMMUN de la série SUITES (1re sans spé,
# 1re spé, Terminale) : une paysage + un short Manim par micro du coach.
# Créé avec le pilote (ép. 01, suite_arith_reconnaitre.py), le 10/11/2026.
# ⛔ Les épisodes l'IMPORTENT, jamais ne le recopient. Après le pilote, un
#   nouvel outil va dans le script de l'épisode, pas ici.
#
# ── Code couleur de la série (constant) ────────────────────────────────────
#   TERME  (bleu)   : les termes uₙ, les cases, les points du nuage ;
#   RAISON (orange) : la raison r ou q, les écarts, les flèches « + r », « × q » ;
#   JUSTE  (vert)   : résultat juste ;   PIEGE (rouge) : le piège.
#
# ── Mode d'emploi ───────────────────────────────────────────────────────────
#   from suites_commun import *     (dossier du script EN TÊTE de sys.path)
#
#   class MaSuite1re(PaysageSuites):            # 16:9, ceinture verte
#       fichier_marques = "suite_xxx_marques.json"  # à côté du script
#       nom_voix = "premiere-suite-xxx"             # manim/voix/<nom>.json
#
#   UN ÉCRAN : self.nouvel_ecran("02-ecarts") (efface, Ti-Margo, lance la voix),
#     puis des animations calées sur la voix :
#       self.au_mot("raison")      attend le mot (n=2 : 2e occurrence) ;
#       self.suivre("40")          attend la PROCHAINE occurrence après le
#                                  curseur (nombres : « 4 » ne prend pas « 40 ») ;
#       self.attendre_voix()       tient l'écran jusqu'à la fin de la phrase.
#     self.t(texte, fs, couleur) : un Text (largeur bornée par larg=) ;
#     self.insister(m) : agrandir puis rétrécir ; self.barrer(m) : croix rouge.
#
#   LA LIGNE DES TERMES : lg = LigneTermes(["40", "70", "100"], centre=P(0, 1))
#     (noms=["u₀", "u₁", "u₂"] pour les étiquettes, xs= pour placer les cases) ;
#       self.montrer_case(lg, i)          la case i (cadre puis nombre) ;
#       self.remplir_ligne(lg)            chaque case quand la voix dit son nombre ;
#       self.sauter(lg, i, "+ 30")        la flèche saute de la case i à i + 1
#                                         (cote=UP/DOWN, couleur=RAISON/PIEGE).
#   LE NUAGE DE POINTS : nu = NuageTermes((0, 4), (0, 140), P(-6, -2), P(-1, 2))
#       (axes n et uₙ) ; self.poser_point(nu, n, u) : le point apparaît.
#   LISTE EN TEXTE : liste_nombres(["3", "6", "12"]) → un nombre par Text
#     (séparés par « ; »), dévoilés un à un par self.montrer_liste(g).
#
#   LA GARDE : self.garde("Suite arithmétique", [("la reconnaître", "la reconnaître"),
#     …], dessin=fonction) : titre, lignes de la question, échelle des ceintures.
#   LA QUESTION-PAUSE : q = self.poser_question("04-question", lignes, choix,
#     bonne) → écran « Question ! », boutons A/B/C (chaque nombre à sa voix),
#     « Mets pause, et choisis ! », compte à rebours (5 s paysage, 3 s short) ;
#     puis self.dire("04b-reponse") et self.q_reponse(q, bonne) (la bonne
#     s'allume : agrandir puis rétrécir). La lettre juste = celle de la voix.
#   LE DÉFI : self.defi_pause(y) : « Mets pause, et cherche ! » + rebours 5 s.
#   LA FINALE : self.finale([([ligne1, ligne2], ["extrait1", "extrait2"]), …]) :
#     « Ce que tu as appris » en haut, centré, une coche par point.
#   LA FIN : self.fin() (paysage) / self.fin_short(cle, a_effacer) (short) :
#     « Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 » et les
#     gestes de la phrase de fin du 05/11, chacun écrit quand la voix le dit.
#
#   SHORT : class MonShort(ShortSuites) (9:16, ceinture blanche) ;
#     self.entete("Titre") : Ti-Margo en bas, titre, échelle des ceintures ;
#     en HAUT l'image qui bouge, en BAS les cases / le nuage, EN MÊME TEMPS ;
#     self.appel_commentaire(y) puis self.fin_short(cle, a_effacer).
#
# ⛔ Pas de LaTeX : tout en Text (u₀, uₙ₊₁, qⁿ, ≥, −∞) ; décimaux à la virgule.
# ⛔ Rien n'apparaît avant que la voix le dise. Contrôle avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run … → 0 AUDIT-AVANCE,
#   0 RETARD, 0 BORD (marge de 3 % sur les quatre côtés).

import inspect
import json
import os
import re
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
for _k, _d in enumerate((ICI, ICI.parent / "terminale", ICI.parent / "seconde", ICI.parent / "stmg", ICI.parents[1])):
    if str(_d) not in sys.path:
        sys.path.insert(_k, str(_d))

from proba_bin_defi import MotsCales, P, puissance  # noqa: E402,F401

from manim import *  # noqa: E402,F401

from canvas_proportion import AuditSynchro  # noqa: E402
from charte import *  # noqa: E402,F401
from gabarit_sixieme import Notion6e, Short6e  # noqa: E402
from mascotte import MascotteMargouillat  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from stats_lycee_h2_commun import CompteARebours, pastille_pause  # noqa: E402

TERME, RAISON, JUSTE, PIEGE = BLEU_CALCUL, ORANGE_RETENUE, VERT_OK, ROUGE_ERREUR
FOND_CARTE = "#0b1220"
_INDICES = str.maketrans("0123456789+-n", "₀₁₂₃₄₅₆₇₈₉₊₋ₙ")


def fr(x):
    """Un nombre à la française : 2,5 ; −60 ; 1 000 pour les grands entiers."""
    if isinstance(x, str):
        return x
    if abs(x - round(x)) < 1e-9:
        s = f"{abs(int(round(x))):,}".replace(",", " ")
    else:
        s = f"{abs(x):.10g}".replace(".", ",")
    return ("−" if x < 0 else "") + s


def u(indice, lettre="u"):
    """u(0) → « u₀ », u("n+1") → « uₙ₊₁ »."""
    return lettre + str(indice).translate(_INDICES)


def _motif_nombre(extrait):
    """« 4 » ne doit pas trouver « 40 », ni « 2 » le « 2 » de « 2,5 »."""
    if re.fullmatch(r"\d+(,\d+)?", extrait):
        return re.compile(r"(?<![\d,])" + re.escape(extrait) + r"(?![\d]|,\d)")
    return None


# ── les dessins de la série ────────────────────────────────────────────────

class LigneTermes(VGroup):
    """Les termes d'une suite, un par case (bleue), alignés de gauche à droite.
    valeurs : textes des cases ("" = case vide, "?" = case à trouver) ;
    noms : étiquettes sous les cases (u₀, u₁…) ou None ;
    xs : abscisses imposées des centres (sinon : pas régulier autour de centre).
    self.cases[i] = VGroup(cadre, texte) ; self.noms[i] ; self.sauts[i]."""

    def __init__(self, valeurs, centre=ORIGIN, pas=1.6, largeur=1.2, hauteur=0.8, fs=36, noms=None,
                 couleur=TERME, xs=None, fs_noms=None, **kw):
        super().__init__(**kw)
        n = len(valeurs)
        centre = np.array(centre, dtype=float)
        if xs is None:
            xs = [centre[0] + (k - (n - 1) / 2) * pas for k in range(n)]
        self.valeurs, self.fs, self.couleur = list(valeurs), fs, couleur
        self.cases, self.noms, self.sauts = VGroup(), VGroup(), {}
        for k, v in enumerate(valeurs):
            cadre = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.12, stroke_color=couleur,
                                     stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
            cadre.move_to(P(xs[k], centre[1]))
            coul = RAISON if v == "?" else WHITE
            tx = Text(v if v else " ", font_size=fs, color=coul)
            if tx.width > largeur - 0.16:
                tx.scale_to_fit_width(largeur - 0.16)
            tx.move_to(cadre)
            self.cases.add(VGroup(cadre, tx))
            if noms:
                nm = Text(noms[k], font_size=fs_noms or int(fs * 0.75), color=GREY_A)
                nm.next_to(cadre, DOWN, buff=0.12)
                nm._pas_audit = True
                self.noms.add(nm)
        self.add(self.cases, self.noms)

    def saut(self, i, texte, j=None, cote=DOWN, couleur=RAISON, fs=None, creux=0.33):
        """La flèche courbe de la case i à la case j (i + 1 par défaut), son texte ;
        creux : la profondeur de l'arc (la même, que les cases soient proches ou loin)."""
        j = i + 1 if j is None else j
        a, b = self.cases[i][0], self.cases[j][0]
        bord = (lambda m: m.get_bottom()) if np.allclose(cote, DOWN) else (lambda m: m.get_top())
        d, f = bord(a) + 0.1 * cote, bord(b) + 0.1 * cote
        angle = 4 * np.arctan(2 * creux / max(np.linalg.norm(f - d), 0.1)) * (1 if np.allclose(cote, DOWN) else -1)
        fl = CurvedArrow(d, f, angle=angle, color=couleur, stroke_width=4, tip_length=0.16)
        lab = Text(texte, font_size=fs or int(self.fs * 0.8), color=couleur)
        lab.next_to(fl, cote, buff=0.06)
        return VGroup(fl, lab)


class NuageTermes(VGroup):
    """Le nuage de points des termes : axes n (horizontal) et uₙ (vertical),
    posé dans le rectangle bg-hd ; nr = (n_min, n_max), ur = (u_min, u_max).
    self.G(n, u) : le point de l'écran ; self.point(n, u) : un Dot bleu."""

    def __init__(self, nr, ur, bg, hd, nom_u="uₙ", fs=26, couleur_axes=GREY_B, **kw):
        super().__init__(**kw)
        (self.na, self.nb), (self.ua, self.ub) = nr, ur
        (self.X0, self.Y0), (self.X1, self.Y1) = np.array(bg)[:2], np.array(hd)[:2]
        o = self.G(max(self.na, 0), max(self.ua, 0))
        k = dict(buff=0, stroke_width=2.5, color=couleur_axes, tip_length=0.16, max_tip_length_to_length_ratio=0.1)
        self.ax_n = Arrow(P(self.X0, o[1]), P(self.X1 + 0.25, o[1]), **k)
        self.ax_u = Arrow(P(o[0], self.Y0), P(o[0], self.Y1 + 0.25), **k)
        self.lab_n = Text("n", font_size=fs, color=GREY_A).next_to(self.ax_n, RIGHT, buff=0.08)
        self.lab_u = Text(nom_u, font_size=fs, color=GREY_A).next_to(self.ax_u, UP, buff=0.06)
        self.add(self.ax_n, self.ax_u, self.lab_n, self.lab_u)

    def G(self, n, u_):
        return P(self.X0 + (n - self.na) / (self.nb - self.na) * (self.X1 - self.X0),
                 self.Y0 + (u_ - self.ua) / (self.ub - self.ua) * (self.Y1 - self.Y0))

    def point(self, n, u_, couleur=TERME, r=0.09):
        return Dot(self.G(n, u_), radius=r, color=couleur)

    def graduation_n(self, n, texte=None, fs=22):
        """Un trait sur l'axe des n (et son nombre, NON audité : donnée du repère)."""
        y = self.ax_n.get_center()[1]
        tr = Line(P(self.G(n, 0)[0], y - 0.07), P(self.G(n, 0)[0], y + 0.07), stroke_width=2, color=GREY_B)
        if texte is None:
            return tr
        t = Text(texte, font_size=fs, color=GREY_A).next_to(tr, DOWN, buff=0.06)
        t._pas_audit = True
        return VGroup(tr, t)


def liste_nombres(valeurs, fs=32, color=WHITE, sep=" ;"):
    """« 3 ; 6 ; 12 ; 24 » : un Text par nombre (g.nombres), pour les dévoiler
    chacun quand la voix le dit (montrer_liste)."""
    g = VGroup()
    g.nombres, g.seps = [], []
    for k, v in enumerate(valeurs):
        n = Text(v, font_size=fs, color=color)
        g.add(n)
        g.nombres.append(n)
        if k < len(valeurs) - 1:
            s = Text(sep, font_size=fs, color=GREY_B)
            g.add(s)
            g.seps.append(s)
    g.arrange(RIGHT, buff=0.2)
    return g


# ── le commun des paysages et des shorts ───────────────────────────────────

class _OutilsSuites:
    """Voix calée mot à mot, curseur, textes, cases, flèches, nuage."""

    fichier_marques = None
    nom_voix = None

    def _marques(self):
        """Les marques mot à mot sont À CÔTÉ DU SCRIPT de l'épisode."""
        if not hasattr(self, "_cache_marques"):
            ch = Path(inspect.getfile(type(self))).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8")) if ch.exists() else {}
        return self._cache_marques

    def dire(self, nom, dossier=None):
        if os.environ.get("BORDS") or os.environ.get("AUDIT"):
            print(f"ECRAN {nom} t={self.renderer.time:.2f}", flush=True)
        self._curseur = 0
        return super().dire(nom, dossier)

    def au_pos(self, i):
        """Attend l'instant où la voix dit le mot à la position i (+ 1 image)."""
        m = self._marques().get(self._cle_voix) or []
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} pos {i} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(max(reste, 0) + 0.03)

    def _trouver(self, extrait, depuis=0):
        motif = _motif_nombre(extrait)
        if motif:
            m = motif.search(self._texte_voix, depuis)
            return (m.start(), m.end()) if m else (-1, -1)
        i = self._texte_voix.find(extrait, depuis)
        return (i, i + len(extrait)) if i >= 0 else (-1, -1)

    def au_mot(self, extrait, n=1):
        """Attend la n-ième occurrence de l'extrait ; le curseur passe après."""
        i, f = -1, -1
        for _ in range(n):
            i, f = self._trouver(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » (n = {n}) absent de la voix : {self._texte_voix[:50]}")
        self._curseur = f
        self.au_pos(i)

    def suivre(self, extrait):
        """Attend la PROCHAINE occurrence de l'extrait après le curseur."""
        i, f = self._trouver(extrait, getattr(self, "_curseur", 0))
        if i < 0:
            raise ValueError(f"« {extrait} » absent après le curseur : {self._texte_voix[:50]}")
        self._curseur = f
        self.au_pos(i)
        return i

    # ── textes et petits gestes ─────────────────────────────────────────────

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        t = Text(texte, font_size=fs, color=color)
        larg = larg or self.largeur_texte
        if t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def insister(self, mob, k=1.3, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, couleur=PIEGE, buff=0.08):
        """Une croix rouge d'un coin à l'autre de mob (on la crée avec Create)."""
        g, d = mob.get_corner(UL) + P(-buff, buff), mob.get_corner(DR) + P(buff, -buff)
        h, b = mob.get_corner(UR) + P(buff, buff), mob.get_corner(DL) + P(-buff, -buff)
        return VGroup(Line(g, d), Line(h, b)).set_stroke(couleur, 6)

    def carte(self, largeur, hauteur, centre, couleur=GREY_B):
        return RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.16, stroke_color=couleur,
                                stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(centre)

    def encadre(self, mob, couleur=JUSTE, buff=0.15):
        return SurroundingRectangle(mob, color=couleur, buff=buff, stroke_width=3, corner_radius=0.08)

    # ── la ligne des termes, le nuage, les listes ───────────────────────────

    def montrer_case(self, lg, i, run_time=0.3, nom=True):
        c = lg.cases[i]
        anims = [FadeIn(c[0], scale=0.8), FadeIn(c[1], scale=1.4)]
        if nom and len(lg.noms) > i:
            anims.append(FadeIn(lg.noms[i], shift=UP * 0.08))
        self.play(*anims, run_time=run_time)

    def remplir_ligne(self, lg, extraits=None, run_time=0.3, apres=None):
        """Chaque case quand la voix dit son nombre (extraits : ce que dit la voix,
        par défaut le texte de la case). apres(i) : appelée après chaque case."""
        for k, v in enumerate(lg.valeurs):
            ex = extraits[k] if extraits else v
            if ex:
                self.suivre(ex)
            self.montrer_case(lg, k, run_time)
            if apres:
                apres(k)

    def sauter(self, lg, i, texte, j=None, cote=DOWN, couleur=RAISON, fs=None, run_time=0.5):
        """La flèche « + r » saute de la case i à la case j : un point court le
        long de l'arc pendant qu'il se trace, puis le texte apparaît."""
        s = lg.saut(i, texte, j, cote, couleur, fs)
        bille = Dot(s[0].get_start(), radius=0.07, color=couleur)
        self.play(Create(s[0]), MoveAlongPath(bille, s[0].copy()), run_time=run_time)
        self.remove(bille)
        self.play(FadeIn(s[1], scale=1.4), run_time=0.2)
        lg.sauts[i] = s
        return s

    def poser_point(self, nu, n, u_, couleur=TERME, run_time=0.3):
        d = nu.point(n, u_, couleur)
        self.play(GrowFromCenter(d), Flash(d, color=couleur, line_length=0.12, num_lines=8), run_time=run_time)
        return d

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        """Chaque nombre d'une liste_nombres quand la voix le dit."""
        for k, n in enumerate(g.nombres):
            self.suivre(extraits[k] if extraits else n.original_text)
            anims = [FadeIn(n, scale=1.3)]
            if k > 0:
                anims.append(FadeIn(g.seps[k - 1]))
            self.play(*anims, run_time=run_time)

    # ── la question-pause ───────────────────────────────────────────────────

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton A / B / C : rond bleu + lettre, puis le corps (texte ou
        liste_nombres). Structure : VGroup(cadre, VGroup(VGroup(rond, lettre), corps))."""
        rond = Circle(radius=0.25 * fs / 32, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else Text(corps, font_size=fs, color=WHITE)
        place = largeur - 0.9 - rond.width - 0.25  # la place de la coche, à droite
        if c.width > place:  # seul le corps rétrécit : les ronds A, B, C restent égaux
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.25)
        cadre = RoundedRectangle(width=largeur, height=max(0.66, ligne.height + 0.26), corner_radius=0.14,
                                 stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def tete_question(self, y):
        """« ‖ Question ! » et le compte à rebours, centrés sur la ligne y."""
        k = self.k_question
        tete = VGroup(pastille_pause(0.38 * k), self.t("Question !", int(38 * k), RAISON)).arrange(RIGHT, buff=0.2)
        rebours = CompteARebours(self.duree_rebours, r=0.32 * k, fs=int(30 * k))
        VGroup(tete, rebours).arrange(RIGHT, buff=0.4).move_to(P(0, y))
        return tete, rebours

    def poser_question(self, cle, lignes, choix, bonne, y_tete=None, y_question=None, en_ligne=False,
                       largeur=None, fs=None, dessin=None, texte_pause="Mets pause, et choisis !"):
        """L'écran « Question ! » complet, jusqu'à la fin du compte à rebours.
        lignes : [(Text, liste_nombres ou LigneTermes, extrait ou None), …] (la
        question ; une liste ou une ligne : chaque nombre quand la voix le dit) ;
        choix : 3 corps de bouton (texte ou liste_nombres) ; bonne : 0, 1 ou 2 ;
        dessin() : appelé après la tête (un dessin propre à l'épisode).
        Renvoie un objet q (q.cartes, q.tete, q.question, q.pause, q.rebours)."""
        k = self.k_question
        y_tete = self.y_tete_question if y_tete is None else y_tete
        self.nouvel_ecran(cle)
        t0 = self.renderer.time
        tete, rebours = self.tete_question(y_tete)
        q = VGroup(*[m for m, _ in lignes]).arrange(DOWN, buff=0.16)
        if q.width > self.largeur_texte:
            q.scale_to_fit_width(self.largeur_texte)
        q.move_to(P(0, 0)).align_to(P(0, (tete.get_bottom()[1] - 0.3) if y_question is None else y_question), UP)
        larg = largeur or self.largeur_bouton
        fs_b = fs or int(32 * k)
        place = larg - 0.9 - 0.5 * fs_b / 32 - 0.25
        corps = [c for c in choix if isinstance(c, Mobject)]
        if corps and max(c.width for c in corps) > place:  # les trois corps à la MÊME échelle
            f = place / max(c.width for c in corps)
            for c in corps:
                c.scale(f)
        cartes = VGroup(*[self.bouton(L, c, larg, fs_b) for L, c in zip("ABC", choix)])
        cartes.arrange(RIGHT if en_ligne else DOWN, buff=0.3 if en_ligne else 0.16)
        if cartes.width > self.largeur_texte:
            cartes.scale_to_fit_width(self.largeur_texte)
        cartes.move_to(P(0, 0)).align_to(P(0, q.get_bottom()[1] - 0.35), UP)
        pause = self.t(texte_pause, int(32 * k), RAISON).next_to(cartes, DOWN, buff=0.3)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        if dessin:
            dessin()
        for m, ex in lignes:
            if isinstance(m, LigneTermes):
                if ex:
                    self.suivre(ex)
                self.remplir_ligne(m)
            elif hasattr(m, "nombres"):
                if ex:
                    self.suivre(ex)
                self.montrer_liste(m)
            else:
                if ex:
                    self.suivre(ex)
                self.play(FadeIn(m, shift=UP * 0.1), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.au_mot("Mets pause")
        self.play(FadeIn(pause, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        print(f"QUESTION {cle} t={int(t0 // 60):02d}:{int(t0 % 60):02d} ({t0:.2f}) reponse={bonne}", flush=True)
        q_obj = VGroup(tete, q, cartes, pause, rebours)
        q_obj.tete, q_obj.question, q_obj.cartes, q_obj.pause, q_obj.rebours = tete, q, cartes, pause, rebours
        return q_obj

    def q_montrer_choix(self, cartes):
        """Chaque bouton À SA LETTRE (« A : »), son contenu À SA VOIX (une liste :
        chaque nombre quand il est dit)."""
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            self.play(FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            corps = c[1][1]
            if hasattr(corps, "nombres"):
                self.montrer_liste(corps)
            else:
                nbs = re.findall(r"\d+(?:,\d+)?", getattr(corps, "original_text", "") or "")
                if nbs:
                    for nb in nbs:  # « B : moins 4 » : le bouton « −4 » au « 4 »
                        self.suivre(nb)
                else:
                    self.au_pos(self._curseur)
                self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.2)

    def q_reponse(self, q, bonne):
        """La bonne réponse s'allume en vert (agrandir puis rétrécir), les autres pâlissent."""
        cartes = q.cartes
        b = cartes[bonne]
        anims = [b[0].animate.set_stroke(JUSTE, width=7).set_fill("#052e16", 1), b[1][0][0].animate.set_fill(JUSTE)]
        anims += [cartes[j].animate.set_opacity(0.3) for j in range(len(cartes)) if j != bonne]
        self.play(*anims, FadeOut(q.rebours), FadeOut(q.pause), run_time=0.25)
        ok = self.coche(JUSTE, 0.2 * self.k_question).move_to(b[0].get_right() + LEFT * 0.3)
        self.play(b.animate.scale(1.12), Create(ok), run_time=0.25)
        self.play(b.animate.scale(1 / 1.12), ok.animate.scale(1 / 1.12, about_point=b.get_center()), run_time=0.25)
        return ok

    def defi_pause(self, y, x=0.0, texte="Mets pause, et cherche !"):
        """« ‖ Mets pause, et cherche ! » + compte à rebours de 5 s (paysage)."""
        k = self.k_question
        mp = VGroup(pastille_pause(0.36 * k), self.t(texte, int(34 * k), RAISON)).arrange(RIGHT, buff=0.2)
        rebours = CompteARebours(5, r=0.3 * k, fs=int(28 * k))
        g = VGroup(mp, rebours).arrange(RIGHT, buff=0.35).move_to(P(x, y))
        self.au_mot("Mets pause")
        self.play(FadeIn(mp, scale=0.8), FadeIn(rebours, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.2)
        rebours.jouer(self)
        self.play(FadeOut(g), run_time=0.3)


# ── la paysage (16:9), ceinture verte par défaut ───────────────────────────

class PaysageSuites(_OutilsSuites, AuditSynchro, MotsCales, Notion6e):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    largeur_texte = 12.6          # 3 % de marge : rien au-delà de x = ±6,68
    largeur_bouton = 7.2
    k_question = 1.0
    duree_rebours = 5
    y_tete_question = 3.1

    def add_mascotte(self, scale=0.5):
        """Ti-Margo dans le coin bas-droit, à 0,45 du bord (3 % de la largeur)."""
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.45)
        self.add(m)
        self._margo = m
        return m

    def nouvel_ecran(self, cle, margo=0.5):
        """Efface tout, remet Ti-Margo, lance la voix de l'écran."""
        self.clear()
        self.add_mascotte(margo)
        return self.dire(cle)

    def titre(self, texte, couleur=JAUNE_TITRE, fs=46, extrait=None, y=3.15):
        """Le titre de l'écran, en haut et centré, quand la voix dit l'extrait."""
        tit = self.t(texte, fs, couleur).move_to(P(0, y))
        if extrait:
            self.au_mot(extrait)
        self.play(FadeIn(tit, shift=DOWN * 0.1), run_time=0.4)
        return tit

    def garde(self, titre, lignes, dessin=None, cle="00-garde", extrait_titre=None):
        """La page de garde : le NOM de la notion, sa QUESTION (lignes =
        [(texte, extrait[, couleur]), …] ; une 1re ligne colorée = sous-titre),
        l'échelle ENTIÈRE des ceintures en bas, l'identité.
        dessin() : le petit dessin de l'épisode (joué après le titre)."""
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(cle)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, 0)).align_to(P(0, -3.45), DOWN)
        self.add(ech)
        tit = self.t(titre, 64, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot(extrait_titre or titre)
        self.play(Write(tit), run_time=0.7)
        y = tit.get_bottom()[1] - 0.5
        for k, ligne in enumerate(lignes):
            texte, ex = ligne[:2]
            couleur = ligne[2] if len(ligne) > 2 else WHITE
            l = self.t(texte, 40, couleur).move_to(P(0, y))
            y -= 0.85 if (k == 0 and len(ligne) > 2) else 0.66  # un sous-titre coloré : un blanc après
            if ex:
                self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.1), run_time=0.35)
        ident = self.t(self.identite, 26, GREY_A).move_to(P(0, y + 0.1))
        self.play(FadeIn(ident), run_time=0.3)
        self._y_garde = y - 0.3
        if dessin:
            dessin()
        self.attendre_voix(marge=0.9)
        return ech

    def finale(self, points, cle="10-finale", fs=38):
        """« Ce que tu as appris » : titre EN HAUT ET CENTRÉ, puis les points.
        points = [([Mobject, …], [extrait, …]), …] : une coche par point, chaque
        ligne du point quand la voix dit son extrait."""
        self.nouvel_ecran(cle, margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        blocs = []
        for lignes, _ in points:
            b = VGroup(*lignes).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            blocs.append(VGroup(self.coche(), b).arrange(RIGHT, buff=0.3, aligned_edge=UP))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.width > 11.4:
            tout.scale_to_fit_width(11.4)
        if tout.height > 5.6:
            tout.scale_to_fit_height(5.6)
        tout.move_to(P(-0.4, -0.35))
        for bloc, (lignes, extraits) in zip(blocs, points):
            for k, (l, ex) in enumerate(zip(lignes, extraits)):
                if ex:
                    self.au_mot(ex)
                anims = [FadeIn(l, shift=RIGHT * 0.2)]
                if k == 0:
                    anims.append(Create(bloc[0]))
                self.play(*anims, run_time=0.45)
        self.attendre_voix(marge=0.8)
        return tout

    def fin(self, cle="11-abonne"):
        """L'écran de fin (style « parfait » du 24/10) + les gestes du 05/11."""
        self.nouvel_ecran(cle, margo=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.45))
        site = self.t("eleveai.fr", 62, TERME).move_to(P(0, 1.4))
        cadre = SurroundingRectangle(site, color=TERME, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, JUSTE).move_to(P(0, -0.15))
        poignee = self.t("@eleveai974", 48, JUSTE, audit=False).move_to(P(0, -1.1))
        gestes = [self.t(g, 32) for g in ("Un pouce", "Un commentaire", "La cloche")]
        points = [self.t("·", 32, "#94a3b8") for _ in range(2)]
        ligne = VGroup(gestes[0], points[0], gestes[1], points[1], gestes[2]).arrange(RIGHT, buff=0.22)
        ligne.move_to(P(0, -2.35))
        for g in gestes[1:]:
            g.align_to(gestes[0], UP)
        self.au_mot("Entraîne-toi")
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("pouce")
        self.play(FadeIn(gestes[0], scale=1.3), run_time=0.25)
        self.au_mot("commentaire")
        self.play(FadeIn(points[0]), FadeIn(gestes[1], scale=1.3), run_time=0.25)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.4)
        self.au_mot("cloche")
        self.play(FadeIn(points[1]), FadeIn(gestes[2], scale=1.3), run_time=0.25)
        self.play(Flash(poignee, color=JUSTE, line_length=0.3), run_time=0.5)
        self.attendre_voix(marge=1.4)


# ── le short (9:16), ceinture blanche par défaut ───────────────────────────

class ShortSuites(_OutilsSuites, AuditSynchro, MotsCales, Short6e):
    """Cadre 4,5 × 8 ; marge de 3 % : rien au-delà de x = ±2,11, y = ±3,86.
    En HAUT l'image concrète qui bouge, en BAS les cases ou le nuage qui se
    remplissent EN MÊME TEMPS (l'œil descend tout droit)."""

    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"
    largeur_texte = 4.0
    largeur_bouton = 3.6          # × 1,12 quand la bonne s'allume : reste dans la marge
    k_question = 0.85
    duree_rebours = 3
    y_tete_question = 3.45

    def nouvel_ecran(self, cle, garder=()):
        """Efface tout sauf Ti-Margo (et `garder`), lance la voix."""
        for m in list(self.mobjects):
            if m is not getattr(self, "_margo", None) and m not in garder:
                self.remove(m)
        return self.dire(cle)

    def entete(self, titre, extrait=None, fs=36):
        """Ti-Margo en bas, le titre (y = 3,45) et l'échelle ENTIÈRE des ceintures
        dessous (y = 2,95). Le titre apparaît quand la voix le dit."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, 2.95))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, 3.45))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def appel_commentaire(self, y=-2.45):
        self.au_mot("Réponds en commentaire")
        appel = self.t("Réponds en commentaire !", 32, JUSTE, larg=3.9).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.08)
        return appel

    def fin_short(self, cle, a_effacer=None):
        """La fin du 05/11 : ce que dit la voix est écrit, « Un pouce · La cloche » en plus."""
        a_effacer = a_effacer if a_effacer is not None else [m for m in self.mobjects if m is not self._margo]
        for m in a_effacer:
            m.clear_updaters()
        self.dire(cle)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.5))
        site = self.t("eleveai.fr", 54, TERME).move_to(P(0, 1.55))
        cadre = SurroundingRectangle(site, color=TERME, buff=0.2, stroke_width=3)
        abonne = self.t("Abonne-toi !", 42, JUSTE).move_to(P(0, 0.1))
        poignee = self.t("@eleveai974", 44, JUSTE, audit=False).move_to(P(0, -0.72))
        g1, p, g2 = self.t("Un pouce", 26), self.t("·", 26, "#94a3b8"), self.t("La cloche", 26)
        VGroup(g1, p, g2).arrange(RIGHT, buff=0.16).move_to(P(0, -1.95))
        g2.align_to(g1, UP)
        self.play(FadeOut(Group(*a_effacer)), run_time=0.25)
        self.au_mot("Entraîne-toi")
        self.play(Write(entraine), run_time=0.35)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.4)
        self.au_mot("pouce")
        self.play(FadeIn(g1, scale=1.3), run_time=0.22)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.3)
        self.au_mot("cloche")
        self.play(FadeIn(p), FadeIn(g2, scale=1.3), run_time=0.22)
        self.play(Flash(poignee, color=JUSTE, line_length=0.25), run_time=0.45)
        self.attendre_voix(marge=1.0)
