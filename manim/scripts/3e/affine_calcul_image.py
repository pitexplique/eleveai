# affine_calcul_image.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 04 : CALCULER UNE IMAGE.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE.
# Métier : Samir, moniteur de plongée (la pression sous l'eau : p(x) = 0,1x + 1, en bars, x en mètres).
# Écrans (clés de manim/voix/3e-affine-calcul-image.json) :
#   00-garde : la machine f, « Que donne une fonction affine pour un nombre précis ? »
#   01-plongee : Samir, puis la mer graduée (x en m) et le plongeur à la surface : p(x) = 0,1x + 1, p(0) = 1
#   02-calcul : le plongeur descend à 20 m : 0,1 × 20 = 2, 2 + 1 = 3, p(20) = 3, 3 est l'image de 20
#   03-tableau : le tableau de Samir (0, 10, 20, 30, 35 m → 1, 2, 3, 4, 4,5 bars)
#   03q-question / 03r-reponse : QUESTION 1, f(x) = 4x − 7, f(5) ? → C (13) ; piège B (−8)
#   04-negatif : f(x) = −3x + 5, f(−2) = −3 × (−2) + 5 = 6 + 5 = 11 (la machine reçoit −2)
#   05q-question / 05r-reponse : QUESTION 2, f(x) = −2x + 3, f(−4) ? → B (11) ; piège A (−5)
#   06-defi / 06b-correction : f(x) = 3x − 4, f(−1) = −7 et f(0,5) = −2,5
#   07-finale : ce que tu as appris (titre en haut et centré)
#   08-abonne : la fin commune (manim/fin_commune.py)
# Lettres justes : 03q → C, 05q → B.
# Code couleur : x bleu (et le nombre qui le remplace) ; a orange ; b violet ; juste vert ; piège rouge.
# ⚠️ 06b-correction : la marque du SECOND « 1,5 » (« 1,5 moins 4 ») est fausse (13,48 s, doublon du
# premier) ; aucun autre mot unique ne tombe à cet instant. Le « 1,5 » recopié est calé sur l'instant
# MESURÉ dans le WAV (début du mot à 15,30 s, après le silence de 14,3 → 15,3 s), « − 4 = −2,5 » sur
# « moins 4 : moins 2,5 » (unique).
# Voix : manim/voix/3e-affine-calcul-image.json (validée) ; marques : affine_calcul_image_marques.json.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/3e/affine_calcul_image.py AffineCalculImage3e --media_dir manim/scripts/3e/media-affine-04-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/3e/affine_calcul_image.py AffineCalculImage3e -o eleveai-maths-3e-affine-calcul-image --media_dir manim/scripts/3e/media-affine-04
# Sortie : manim/sorties/3e/maths/fonctions-affines/04-calcul-image/eleveai-maths-3e-affine-calcul-image.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI.parent / "seconde"))

from relatif_commun import *  # noqa: E402,F403
from relatif_commun import signe  # noqa: E402
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402
from ident_developper import X, changer, pastille  # noqa: E402
from ident_factoriser import IdentFactoriser3e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402,F401

PAROLE["0"] = "0"  # la voix écrit « 0 », pas « zéro »

A_COUL = ORANGE_RETENUE   # a, le coefficient
B_COUL = "#a78bfa"        # b, l'ordonnée à l'origine
EAU_H = "#0ea5e9"
EAU_B = "#0c4a6e"
SABLE = "#d6b77a"
COMBI = "#111827"
BOUTEILLE = "#facc15"


def fonction(s, fs=52, audit=True):
    """« f(x) = −3x + 5 » : x bleu, a (et son signe) orange, b (et son signe) violet."""
    e = X(s, fs, audit=audit)
    at = e.atomes
    i_eg = next(i for i, a in enumerate(at) if a.original_text == "=")
    for i in range(i_eg + 1, len(at)):
        t = at[i].original_text
        if t[0].isdigit():
            suivi_x = i + 1 < len(at) and at[i + 1].original_text == "x"
            at[i].set_color(A_COUL if suivi_x else B_COUL)
            if at[i - 1].original_text == "−":
                at[i - 1].set_color(A_COUL if suivi_x else B_COUL)
    return e


def bleus(e, *idx):
    """Les nombres qui REMPLACENT x : en bleu."""
    for i in idx:
        e.atomes[i].set_color(INCONNUE)
    return e


class Plongeur(VGroup):
    """Un plongeur qui nage vers la droite : combinaison, bouteille jaune, masque, palmes, bulles."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        corps = RoundedRectangle(width=1.3, height=0.36, corner_radius=0.18, fill_color=COMBI, fill_opacity=1,
                                 stroke_color="#334155", stroke_width=2)
        bout = RoundedRectangle(width=0.8, height=0.2, corner_radius=0.1, fill_color=BOUTEILLE, fill_opacity=1,
                                stroke_width=0).move_to(P(-0.05, 0.25))
        tete = Circle(radius=0.2, fill_color="#c68642", fill_opacity=1, stroke_width=0).move_to(P(0.78, 0.08))
        masque = RoundedRectangle(width=0.2, height=0.17, corner_radius=0.05, fill_color="#7dd3fc", fill_opacity=1,
                                  stroke_color="#1e293b", stroke_width=2).move_to(P(0.9, 0.12))
        tuba = Line(P(0.7, 0.22), P(0.7, 0.5), color="#f97316", stroke_width=4)
        palmes = VGroup(*[Polygon(P(-0.62, dy), P(-1.05, dy + 0.18), P(-1.05, dy - 0.12), fill_color="#22d3ee",
                                  fill_opacity=1, stroke_width=0) for dy in (0.05, -0.12)])
        self.bulles = VGroup(*[Circle(radius=r, stroke_color=WHITE, stroke_width=2, fill_opacity=0).move_to(P(x, y))
                               for r, x, y in ((0.06, 0.82, 0.62), (0.08, 0.92, 0.85), (0.05, 0.84, 1.05))])
        self.add(palmes, bout, corps, tete, masque, tuba, self.bulles)
        self.scale(s)


class Mer(VGroup):
    """La mer graduée en mètres (la profondeur x) : .y(d) l'ordonnée à d mètres ; .regle (graduations)."""

    def __init__(self, x0=-5.3, x1=-2.5, y_surf=2.45, k=0.133, dmax=40, pas=10, fs=30, **kw):
        super().__init__(**kw)
        self.x0, self.x1, self.y_surf, self.k = x0, x1, y_surf, k
        bas = self.y(dmax) - 0.3
        n = 6
        h = (y_surf - bas) / n
        self.eau = VGroup(*[Rectangle(width=x1 - x0, height=h + 0.01, stroke_width=0,
                                      fill_color=interpolate_color(ManimColor(EAU_H), ManimColor(EAU_B), i / (n - 1)),
                                      fill_opacity=1).move_to(P((x0 + x1) / 2, y_surf - h * (i + 0.5)))
                            for i in range(n)])
        self.vague = FunctionGraph(lambda t: y_surf + 0.05 * np.sin(9 * t), x_range=[x0, x1], color="#e0f2fe",
                                   stroke_width=4)
        sable = Polygon(P(x0, bas), P(x1, bas), P(x1, bas + 0.14), P((x0 + x1) / 2, bas + 0.22), P(x0, bas + 0.1),
                        fill_color=SABLE, fill_opacity=1, stroke_width=0)
        self.regle = VGroup()
        for d in range(0, dmax + 1, pas):
            y = self.y(d)
            self.regle.add(Line(P(x0 - 0.12, y), P(x0, y), color=WHITE, stroke_width=3))
            self.regle.add(T(f"{d} m", fs, WHITE, audit=False).next_to(P(x0 - 0.12, y), LEFT, buff=0.08))
        self.nom = T("x", fs + 6, INCONNUE, audit=False).next_to(self.regle[1], UP, buff=0.3)
        self.add(self.eau, sable, self.vague, self.regle, self.nom)

    def y(self, d):
        return self.y_surf - d * self.k

    def place(self, d, dx=0.0):
        return P((self.x0 + self.x1) / 2 + dx, self.y(d))


class Machine(VGroup):
    """La machine f, verticale : le nombre entre en haut, l'image sort en bas.
    .entree / .sortie : les places des deux nombres ; .boite, .f."""

    def __init__(self, centre=ORIGIN, w=2.8, h=1.7, nom="f", fl=1.15, **kw):
        super().__init__(**kw)
        self.boite = RoundedRectangle(width=w, height=h, corner_radius=0.18, fill_color="#1e293b", fill_opacity=1,
                                      stroke_color=JAUNE_TITRE, stroke_width=5)
        self.f = T(nom, 80, JAUNE_TITRE, audit=False, gras=True).move_to(self.boite)
        roues = VGroup(*[Circle(radius=0.14, stroke_color="#94a3b8", stroke_width=3).move_to(P(dx, -h / 2 + 0.3))
                         for dx in (-w / 2 + 0.35, w / 2 - 0.35)])
        self.fl_in = Arrow(P(0, h / 2 + fl), P(0, h / 2 + 0.05), buff=0, color=WHITE, stroke_width=6,
                           max_tip_length_to_length_ratio=0.3)
        self.fl_out = Arrow(P(0, -h / 2 - 0.05), P(0, -h / 2 - fl), buff=0, color=WHITE, stroke_width=6,
                            max_tip_length_to_length_ratio=0.3)
        self.add(self.fl_in, self.boite, roues, self.f, self.fl_out)
        self.h = h
        self.move_to(centre)

    @property
    def entree(self):
        return self.fl_in.get_start() + UP * 0.42

    @property
    def sortie(self):
        return self.fl_out.get_end() + DOWN * 0.42


def samir(s=1.0, fs=32):
    """Samir, moniteur de plongée : combinaison sombre, masque relevé sur le front, bouteille jaune."""
    m = Metier(["Samir, moniteur", "de plongée"], fs=fs, peau="#8d5524", tenue=COMBI, cheveux="#1f1308", s=s)
    m.nom.arrange(DOWN, buff=0.1)
    p = m.perso
    c = p.tete.get_center()
    r = p.tete.width / 2
    sangle = Line(c + P(-r, r * 0.35), c + P(r, r * 0.35), color="#0f172a", stroke_width=6)
    masque = RoundedRectangle(width=r * 1.3, height=r * 0.55, corner_radius=r * 0.15, fill_color="#7dd3fc",
                              fill_opacity=1, stroke_color="#0f172a", stroke_width=3).move_to(c + UP * r * 0.4)
    bout = RoundedRectangle(width=0.3 * s, height=1.0 * s, corner_radius=0.12 * s, fill_color=BOUTEILLE,
                            fill_opacity=1, stroke_width=0).next_to(p.corps, LEFT, buff=-0.12 * s).shift(UP * 0.3 * s)
    palme = Polygon(P(0, 0), P(0.55, 0), P(0.45, 0.22), P(0.08, 0.22), fill_color="#22d3ee", fill_opacity=1,
                    stroke_width=0).scale(s).next_to(p.corps, RIGHT, buff=0.05).align_to(p.corps, DOWN)
    p.add_to_back(bout)
    p.add(sangle, masque, palme)
    return m


def nom_au_dessus(m, x=None, gauche=-6.45, droite=None):
    """L'étiquette au-dessus de Samir, jamais hors du cadre ni sur la colonne de droite."""
    m.nom.next_to(m.perso, UP, buff=0.18)
    if x is not None:
        m.nom.set_x(x)
    if m.nom.get_left()[0] < gauche:
        m.nom.shift(RIGHT * (gauche - m.nom.get_left()[0]))
    if droite is not None and m.nom.get_right()[0] > droite:
        m.nom.shift(LEFT * (m.nom.get_right()[0] - droite))
    return m


class AffineCalculImage3e(IdentFactoriser3e):
    nom_voix = "3e-affine-calcul-image"
    fichier_marques = "affine_calcul_image_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"

    # ── outils ──────────────────────────────────────────────────────────────
    def etapes(self, e, plan, rt=0.18, echelle=1.15):
        """Pose e par morceaux : plan = [(extrait, [indices d'atomes]), …] (extrait UNIQUE dans la voix)."""
        vus = set()
        for extrait, idx, *avec in plan:
            self.au_mot(extrait)
            self.play(*[FadeIn(e.atomes[i], scale=echelle) for i in idx], *(avec[0] if avec else []), run_time=rt)
            vus.update(idx)
        if os.environ.get("AUDIT") == "1":
            for i, a in enumerate(e.atomes):
                if i not in vus:
                    print(f"PERDU « {e.s} » : {a.original_text}", flush=True)
        return e

    def attendre_t(self, t):
        """Attend l'instant t (s) de la voix en cours : seulement quand la marque du mot est fausse."""
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} instant {t} : {-reste:.2f} s", flush=True)
        if reste > 0.02:
            self.wait(reste)

    def aligner_egal(self, e, ref):
        """Décale e pour que son = soit sous le = de ref."""
        return e.shift(RIGHT * (ref.egal.get_x() - e.egal.get_x()))

    def ligne_qi(self, i, s, phrase, gestes=None, fonc=False):
        """Dans avant_q : la ligne i de la question, posée au mot, avec ses gestes."""
        ref = self.q_q[0]  # les lignes se posent dans l'ordre : la i-ième est la première qui reste
        e = fonction(s, 34) if fonc else X(s, 34)
        e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        if i == 0:
            self._lignes_q = []
        self._lignes_q.append(e)
        return self.poser_gestes(e, phrase, gestes or {}, echelle=1.2, rt=0.2)

    @staticmethod
    def _fs(m):
        """La taille effective (font_size × échelle) du premier texte de m."""
        for f in m.get_family():
            if isinstance(f, Text) and getattr(f, "original_text", "").strip():
                return f.font_size
        return 36.0

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql (22/11) : énoncé à 39 pt, cartes à 42 pt raccourcies à leur contenu, « Mets pause, »
        / « et choisis ! » (35 pt, deux lignes) À DROITE des cartes, à mi-hauteur, loin de Ti-Margo
        (modèle : _disposer_q d'affine_coeff_directeur.py)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for ligne in q:
            ligne.scale(39 / self._fs(ligne))
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if q.width > 6.3 - self.XL:
            print(f"RETRECI énoncé × {(6.3 - self.XL) / q.width:.2f}", flush=True)
            q.scale_to_fit_width(6.3 - self.XL)
        q.next_to(tete, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        for c in cartes:
            cadre, dedans = c[0], c[1]
            dedans.scale(42 / self._fs(dedans[1]), about_point=dedans.get_left())
            cadre.stretch_to_fit_height(max(0.72, dedans.height + 0.24))
        # la coche se pose à 0,33 du bord droit : le nombre en reste à plus de 0,95 (sinon question_pause le rétrécit)
        larg = max(2.6, max(c[1].get_right()[0] - c[0].get_left()[0] for c in cartes) + 1.1)
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
            c[1].set_y(c[0].get_y())
        cartes.arrange(DOWN, buff=0.2, aligned_edge=LEFT)
        cartes.next_to(q, DOWN, buff=0.4).align_to(P(self.XL, 0), LEFT)
        neuf = VGroup(T("Mets pause,", 35, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 35, ORANGE_RETENUE, audit=False)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, RIGHT, buff=0.45).set_y(cartes.get_y())
        ph.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        if os.environ.get("AUDIT") == "1":
            m = self._margo_q
            print(f"MISE-EN-PAGE {self._cle_voix} q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} "
                  f"({self._fs(q[0]):.0f} pt) cartes {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} "
                  f"larg {larg:.2f} ({self._fs(cartes[0][1][1]):.0f} pt) pause {neuf.get_left()[0]:.2f}→"
                  f"{neuf.get_right()[0]:.2f}, bas {neuf.get_bottom()[1]:.2f} ({self._fs(neuf):.0f} pt) ; "
                  f"Ti-Margo gauche {m.get_left()[0]:.2f} haut {m.get_top()[1]:.2f}", flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def monter_reponse(self, bonne):
        """2e relecture -ql : l'énoncé et les mauvaises cartes s'effacent, la bonne carte monte à la place de
        l'énoncé, et la réponse (lignes courtes) se pose dessous à 36 pt EFFECTIFS. Les lignes repères sont
        refaites en X à 36 pt : ph() y cale ses X par la largeur (un Text, plus étroit, les rétrécissait)."""
        cartes, ph = self.cartes_q, self.ph_q
        b = cartes[bonne]
        ok = self.mobjects[-1]  # la coche, posée juste avant autres_r
        enonce = VGroup(*getattr(self, "_lignes_q", []))
        haut = enonce.get_top()[1] if len(enonce) else cartes[0].get_top()[1]
        d = UP * (haut - b.get_top()[1])
        anims = [FadeOut(cartes[j]) for j in range(3) if j != bonne] + [FadeOut(enonce)]
        anims.append(b.animate.shift(d))
        if ok is not b and ok not in b.get_family():
            anims.append(ok.animate.shift(d))
        self.play(*anims, run_time=0.25)
        ph.submobjects = [X(l.original_text, 36, audit=False) for l in ph.submobjects]
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        bas = b.get_bottom()[1] - 0.3  # b a déjà monté
        k = min(1.0, (6.2 - self.XL) / ph.width, (bas + 3.2) / ph.height)
        if k < 1.0:
            print(f"RETRECI réponse × {k:.2f}", flush=True)
        ph.scale(k).next_to(P(0, bas), DOWN, buff=0).align_to(P(self.XL, 0), LEFT)
        m = self._margo_q
        for ligne in ph:  # rien ne va sur Ti-Margo (coin bas droit)
            if ligne.get_bottom()[1] < m.get_top()[1] + 0.1 and ligne.get_right()[0] > m.get_left()[0] - 0.1:
                print(f"BORD MARGO réponse « {ligne.s} »", flush=True)
        if os.environ.get("AUDIT") == "1":
            print(f"TAILLE-REPONSE {self._cle_voix} {self._fs(ph[0]):.0f} pt, haut {ph.get_top()[1]:.2f}, "
                  f"bas {ph.get_bottom()[1]:.2f}, droite {ph.get_right()[0]:.2f}", flush=True)

    def ph(self, i, s, phrase, premier=False, couleur=None, bleu=()):
        """La ligne i de la réponse (verte), posée au mot."""
        ref = self.ph_q[i]
        e = X(s, 30, couleur or VERT_OK)
        bleus(e, *bleu)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, {}, rt=0.16, sauf=sauf)

    def nombre(self, s, pos, fs=46, couleur=WHITE, audit=True):
        """Un nombre (« −2 », « 13 ») posé à une place de la machine."""
        return X(s, fs, couleur, audit=audit).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une image", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Calculer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        mach = Machine(P(-4.75, 0.15)).scale(0.72)
        q_in = T("?", 56, INCONNUE, audit=False, gras=True).move_to(mach.entree)
        q_out = T("?", 56, VERT_OK, audit=False, gras=True).move_to(mach.sortie)
        l1 = self.ld("Que donne une fonction affine", 0.85, 40, x0=-2.7, maxw=9.2)
        self.poser_gestes(l1, "Que donne une fonction affine", {3: lambda: [FadeIn(mach, scale=0.85)]})
        l2 = self.ld("pour un nombre précis ?", 0.1, 44, JAUNE_TITRE, x0=-2.7, maxw=9.2)
        self.poser_gestes(l2, "pour un nombre précis ?", {2: lambda: [FadeIn(q_in, shift=DOWN * 0.3)],
                                                              3: lambda: [FadeIn(q_out, shift=DOWN * 0.3)]})
        self.play(Indicate(mach.boite, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        self.insister(l2, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Samir, la mer, p(x) = 0,1x + 1 ──────────────────────────────────
    def ecran_plongee(self):
        self.ecran("01-plongee")
        m = samir()
        m.perso.move_to(P(-4.4, -1.4))
        nom_au_dessus(m, -4.4, droite=-2.3)
        mer = Mer()
        pl = Plongeur(0.8).move_to(mer.place(0, 0.1)).shift(DOWN * 0.3)
        x0, mw = -2.0, 8.5
        l1 = self.ld("Samir est moniteur de plongée.", 2.95, 38, x0=x0, maxw=mw)
        self.poser_gestes(l1, "Samir est moniteur de plongée.",
                          {0: lambda: [FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1)],
                           4: lambda: [FadeIn(m.nom[1], shift=UP * 0.1)]})
        l2 = self.ld("Sous l'eau, la pression", 2.25, 40, x0=x0, maxw=mw)
        self.poser_gestes(l2, "Sous l'eau, la pression", {0: lambda: [FadeOut(m), FadeIn(mer)]})
        l3 = self.ld("augmente avec la profondeur.", 1.6, 40, x0=x0, maxw=mw)
        self.poser_gestes(l3, "augmente avec la profondeur.", {3: lambda: [Indicate(g, color=JAUNE_TITRE, scale_factor=1.15)
                                                                for g in mer.regle[1::2]]})
        e = fonction("p(x) = 0,1x + 1", 60).move_to(P(0, 0.55)).align_to(P(x0 + 0.4, 0), LEFT)
        self.poser_gestes(e, "À x mètres, elle vaut p de x égale 0,1 x plus 1,",
                          {0: lambda: [Indicate(mer.nom, color=JAUNE_TITRE, scale_factor=1.5)]}, echelle=1.15)
        cad = SurroundingRectangle(e, color=JAUNE_TITRE, buff=0.16, stroke_width=4, corner_radius=0.08)
        unites = self.ld("x en mètres, p en bars.", -0.4, 38, CIEL, x0=x0 + 0.4, maxw=mw)
        for a in unites.atomes:
            a._pas_audit = True
        self.au("en bars", Create(cad), FadeIn(unites, shift=UP * 0.1), rt=0.35)
        l4 = self.ld("À la surface, p(0) = 1 bar.", -1.45, 42, x0=x0, maxw=mw)
        bleus(l4, 6)
        b1 = T("1 bar", 36, VERT_OK).next_to(pl, DOWN, buff=0.12)
        # « p( » n'est pas dit : il part avec le 0 (deux atomes muets de suite se perdraient)
        self.poser_gestes(l4, "À la surface, x vaut 0 : la pression vaut 1 bar.",
                          {2: lambda: [FadeIn(pl, shift=DOWN * 0.2)],
                           6: lambda: [FadeIn(l4.atomes[4]), FadeIn(l4.atomes[5])],
                           9: lambda: [FadeIn(b1, scale=1.2)]}, sauf=[l4.atomes[4], l4.atomes[5]])
        self.play(Create(self.cadre_ok(VGroup(*l4.atomes[4:]), 0.1)), run_time=0.3)
        self.mer, self.pl, self.b1 = mer, pl, b1
        self.attendre_voix(marge=0.8)

    # ── 02 : à 20 mètres ─────────────────────────────────────────────────────
    def ecran_calcul(self):
        mer, pl, b1 = self.mer, self.pl, self.b1
        self.ecran("02-calcul")
        self.add(mer, pl, b1)
        rap = fonction("p(x) = 0,1x + 1", 40, audit=False).move_to(P(0, 2.95)).align_to(P(-1.9, 0), LEFT)
        self.play(FadeIn(rap), run_time=0.08)
        x0, mw = -1.9, 8.3
        l1 = self.ld("Et à 20 mètres ?", 2.25, 44, JAUNE_TITRE, x0=x0, maxw=mw)
        y20 = mer.place(20, 0.1) + DOWN * 0.3
        self.poser_gestes(l1, "Et à 20 mètres ?",
                          {2: lambda: [pl.animate.move_to(y20), FadeOut(b1)]}, rt=0.35)
        l2 = self.ld("On remplace x par 20.", 1.55, 42, x0=x0, maxw=mw)
        bleus(l2, 4)
        self.poser_gestes(l2, "On remplace x par 20.",
                          {2: lambda: [Indicate(rap.atomes[2], color=JAUNE_TITRE, scale_factor=1.6)]})
        c1 = X("0,1 × 20 = 2", 56).move_to(P(0, 0.75)).align_to(P(x0 + 0.5, 0), LEFT)
        c1.atomes[0].set_color(A_COUL)
        bleus(c1, 2)
        self.dire_eq(c1, "0,1 fois 20, c'est 2.", echelle=1.15)
        c2 = X("2 + 1 = 3", 56)
        self.aligner_egal(c2, c1).set_y(-0.05)
        c2.atomes[2].set_color(B_COUL)
        c2.atomes[0]._pas_audit = True  # le 2 de la ligne du dessus, qui descend
        self.poser_gestes(c2, "Plus 1 : 3 bars.", {1: lambda: [TransformFromCopy(c1.atomes[-1], c2.atomes[0])]},
                          sauf=[c2.atomes[0]], echelle=1.15)
        b3 = T("3 bars", 36, VERT_OK).next_to(pl, DOWN, buff=0.12)
        self.au("bars.", FadeIn(b3, scale=1.2), rt=0.25)
        e = X("p(20) = 3", 60, VERT_OK).move_to(P(0, -0.9)).align_to(P(x0 + 0.5, 0), LEFT)
        e.atomes[0].set_color(WHITE)
        bleus(e, 2)
        self.dire_eq(e, "p de 20 égale 3.", echelle=1.15)
        self.play(Create(self.cadre_ok(e, 0.14)), run_time=0.3)
        l3 = self.ld("3 est l'image de 20.", -1.8, 42, x0=x0, maxw=mw)
        for i in (2, 3, 4):
            l3.atomes[i].set_color(JAUNE_TITRE)
        bleus(l3, 6)
        self.dit(l3, "3 est l'image de 20.")
        l4 = self.ld("D'abord ×, ensuite +.", -2.6, 42, CIEL, x0=x0, maxw=6.6)
        for a in l4.atomes:
            a._pas_audit = True  # aucun nombre ; « × » et « + » se disent « multiplication », « addition »
        self.etapes(l4, [("D'abord", [0, 1, 2]),
                         ("multiplication", [3, 4], [Indicate(c1.atomes[1], color=JAUNE_TITRE, scale_factor=1.8)]),
                         ("ensuite", [5]),
                         ("l'addition", [6, 7], [Indicate(c2.atomes[1], color=JAUNE_TITRE, scale_factor=1.8)])],
                    echelle=1.0)
        self.attendre_voix(marge=0.8)

    # ── 03 : le tableau de Samir ────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("03-tableau")
        m = samir().perso  # déjà présenté : sans son étiquette
        m.move_to(P(-5.45, -2.1))
        larg = [3.1] + [1.86] * 5
        h, y_haut, xg = 1.0, 3.0, -6.25
        W, H = sum(larg), 3 * h
        cadre = RoundedRectangle(width=W, height=H, corner_radius=0.1, stroke_color="#64748b", stroke_width=3,
                                 fill_color="#0b1220", fill_opacity=1).move_to(P(xg + W / 2, y_haut - H / 2))
        tete = Rectangle(width=larg[0] - 0.04, height=H - 0.04, stroke_width=0, fill_color="#1e293b",
                         fill_opacity=1).move_to(P(xg + larg[0] / 2, y_haut - H / 2))
        traits = VGroup()
        x = xg
        for lg in larg[:-1]:
            x += lg
            traits.add(Line(P(x, y_haut), P(x, y_haut - H), color="#475569", stroke_width=2))
        for r in (1, 2):
            traits.add(Line(P(xg, y_haut - r * h), P(xg + W, y_haut - r * h), color="#475569", stroke_width=2))

        def case(r, c):
            return P(xg + sum(larg[:c]) + larg[c] / 2, y_haut - h * (r + 0.5))

        tetes = VGroup(X("x (m)", 40, CIEL, audit=False), X("0,1x + 1", 40, audit=False),
                       X("p(x) (bars)", 38, CIEL, audit=False))
        tetes[1].atomes[0].set_color(A_COUL)
        tetes[1].atomes[3].set_color(B_COUL)
        for r, t in enumerate(tetes):
            t.move_to(case(r, 0))
        # les deux colonnes déjà vues (0 m et 20 m) : des rappels
        rappels = VGroup()
        for c, (xv, calc, pv) in ((1, ("0", "0 + 1", "1")), (3, ("20", "2 + 1", "3"))):
            rappels.add(X(xv, 46, INCONNUE, audit=False).move_to(case(0, c)),
                        X(calc, 38, "#cbd5e1", audit=False).move_to(case(1, c)),
                        X(pv, 46, VERT_OK, audit=False).move_to(case(2, c)))
        x0 = -4.2
        l0 = self.ld("Samir prépare un tableau", -0.95, 44, x0=x0, maxw=9.0)
        self.poser_gestes(l0, "Samir prépare un tableau",
                          {0: lambda: [FadeIn(m)],
                           3: lambda: [FadeIn(cadre), FadeIn(tete), FadeIn(traits), FadeIn(tetes), FadeIn(rappels)]})
        l0b = self.ld("pour ses élèves.", -1.75, 44, x0=x0, maxw=9.0)
        self.dit(l0b, "pour ses élèves.")
        for c, xv, calc, ph_calc, pv in ((2, "10", "1 + 1", "1, plus 1, 2 bars.", "2"),
                                         (4, "30", "3 + 1", "3, plus 1, 4 bars.", "4"),
                                         (5, "35", "3,5 + 1", "3,5, plus 1, 4,5 bars.", "4,5")):
            ex = X(xv, 46, INCONNUE).move_to(case(0, c))
            self.dire_eq(ex, f"À {xv} mètres", echelle=1.25)
            ec = X(calc, 38).move_to(case(1, c))
            ec.atomes[-1].set_color(B_COUL)
            self.dire_eq(ec, ph_calc, echelle=1.2)
            ep = X(pv, 46, VERT_OK).move_to(case(2, c))
            self.dire_eq(ep, f"{pv} bars.", echelle=1.3)
        cad = SurroundingRectangle(cadre, color=VERT_OK, buff=0.06, stroke_width=4, corner_radius=0.1)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self._margo_q = self.add_mascotte()
        self.XL = -2.55  # 2e relecture : la colonne plus à gauche, « Mets pause » tient à droite des cartes
        mach = Machine(P(-4.75, -0.2))
        n_in = self.nombre("5", mach.entree, 60, INCONNUE)
        q_out = T("?", 60, JAUNE_TITRE, audit=False, gras=True).move_to(mach.sortie)
        n_out = self.nombre("13", mach.sortie, 60, VERT_OK)
        n_out.atomes[0]._pas_audit = True  # posé juste après « 13 » de la réponse

        def avant(sc):
            sc.ligne_qi(0, "f(x) = 4x − 7.", "f de x égale 4 x moins 7.", {0: lambda: [FadeIn(mach, scale=0.9)]},
                        fonc=True)
            sc.ligne_qi(1, "Combien vaut f(5) ?", "Combien vaut f de 5 ?",
                        {4: lambda: [FadeIn(n_in, shift=DOWN * 0.3)], 6: lambda: [FadeIn(q_out)]})

        def apres(sc):
            sc.monter_reponse(2)
            sc.ph(0, "Réponse C :", "Réponse C :", premier=True)
            sc.ph(1, "4 × 5 = 20.", "4 fois 5, c'est 20.", bleu=(2,))
            sc.ph(2, "20 − 7 = 13.", "20 moins 7 : 13.")
            sc.play(*changer(q_out, n_out), Indicate(mach.boite, color=VERT_OK, scale_factor=1.05), run_time=0.3)
            sc.ph(3, "Pas −8 :", "Pas moins 8 :", couleur=PIEGE)
            sc.ph(4, "on multiplie d'abord,", "on multiplie d'abord,", couleur=PIEGE)
            sc.ph(5, "pas 5 − 7.", "pas 5 moins 7.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["f(x) = 4x − 7.", "Combien vaut f(5) ?"],
                            [X("27", 34), X("−8", 34), X("13", 34)], 2,
                            ["Réponse C :", "4 × 5 = 20.", "20 − 7 = 13.", "Pas −8 :", "on multiplie d'abord,",
                             "pas 5 − 7."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : avec un nombre négatif ─────────────────────────────────────────
    def ecran_negatif(self):
        self.ecran("04-negatif")
        mach = Machine(P(-4.95, -0.25))
        x0, mw = -2.2, 8.6
        l0 = self.ld("Avec un nombre négatif,", 2.95, 44, x0=x0, maxw=mw)
        self.poser_gestes(l0, "Avec un nombre négatif,", {0: lambda: [FadeIn(mach, scale=0.9)]})
        l1 = self.ld("on met des parenthèses.", 2.3, 44, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l1, "on met des parenthèses.")
        e1 = fonction("f(x) = −3x + 5", 54).move_to(P(0, 1.45)).align_to(P(x0 + 0.3, 0), LEFT)
        self.dire_eq(e1, "f de x égale moins 3 x plus 5.", echelle=1.15)
        n_in = self.nombre("−2", mach.entree, 60, INCONNUE)
        n_in.atomes[0]._pas_audit = True  # le signe seul
        e2 = X("f(−2) = −3 × (−2) + 5", 54)
        self.aligner_egal(e2, e1).set_y(0.55)
        bleus(e2, 2, 3, 10, 11)
        for i in (6, 7):
            e2.atomes[i].set_color(A_COUL)
        for i in (13, 14):
            e2.atomes[i].set_color(B_COUL)
        for i in (9, 12):
            e2.atomes[i].set_color(JAUNE_TITRE)
        self.etapes(e2, [("f de moins 2", [0, 1]), ("moins 2 :", [2]),
                         ("2 : moins", [3, 4], [FadeIn(n_in, shift=DOWN * 0.3)]), ("moins 3 fois", [5, 6]), ("3 fois", [7]),
                         ("fois, parenthèse", [8]), ("parenthèse,", [9, 12]), ("moins 2, plus", [10]),
                         ("2, plus", [11]), ("plus 5. Moins", [13]), ("5. Moins", [14])])
        par = VGroup(e2.atomes[9], e2.atomes[12])
        self.play(Indicate(par, color=JAUNE_TITRE, scale_factor=1.3), run_time=0.4)
        # moins par moins donne plus
        jm1, jm2, jp = signe("−", 0.3, 42), signe("−", 0.3, 42), signe("+", 0.3, 42)
        fois = T("×", 44, WHITE, audit=False)
        eg = T("=", 44, WHITE, audit=False)
        regle = VGroup(jm1, fois, jm2, eg, jp).arrange(RIGHT, buff=0.22)
        regle.move_to(P(0, -0.35)).align_to(P(e2.atomes[6].get_left()[0], 0), LEFT)
        self.au("Moins par", FadeIn(jm1, scale=1.3), Indicate(e2.atomes[6], color=JAUNE_TITRE, scale_factor=1.5), rt=0.3)
        self.au("par moins", FadeIn(fois), FadeIn(jm2, scale=1.3),
                Indicate(e2.atomes[10], color=JAUNE_TITRE, scale_factor=1.5), rt=0.3)
        self.au("donne plus", FadeIn(eg), FadeIn(jp, scale=1.3), rt=0.3)
        e3 = X("= 6 + 5", 54)
        self.aligner_egal(e3, e2).set_y(-1.25)
        e3.atomes[1].set_color(VERT_OK)
        e3.atomes[3].set_color(B_COUL)
        self.dire_eq(e3, "6. Et 6 plus 5 :", echelle=1.15)
        e4 = X("= 11", 60, VERT_OK)
        self.aligner_egal(e4, e2).set_y(-2.1)
        e4.egal.set_color(WHITE)
        n_out = self.nombre("11", mach.sortie, 60, VERT_OK)
        n_out.atomes[0]._pas_audit = True  # posé avec le 11 de la ligne
        self.dire_eq(e4, "11.", avec=[FadeIn(n_out, shift=DOWN * 0.3)], echelle=1.15)
        rap = X("f(−2)", 54, audit=False)
        rap.next_to(e4.egal, LEFT, buff=0.25)
        self.play(FadeIn(rap), Create(self.cadre_ok(VGroup(rap, e4), 0.12)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self._margo_q = self.add_mascotte()
        self.XL = -2.55  # 2e relecture : la colonne plus à gauche, « Mets pause » tient à droite des cartes
        mach = Machine(P(-4.75, -0.2))
        n_in = self.nombre("−4", mach.entree, 60, INCONNUE)
        q_out = T("?", 60, JAUNE_TITRE, audit=False, gras=True).move_to(mach.sortie)
        n_out = self.nombre("11", mach.sortie, 60, VERT_OK)
        n_out.atomes[0]._pas_audit = True  # posé juste après « 11 » de la réponse

        def avant(sc):
            sc.ligne_qi(0, "f(x) = −2x + 3.", "f de x égale moins 2 x plus 3.",
                        {0: lambda: [FadeIn(mach, scale=0.9)]}, fonc=True)
            sc.ligne_qi(1, "Combien vaut f(−4) ?", "Combien vaut f de moins 4 ?",
                        {5: lambda: [FadeIn(n_in, shift=DOWN * 0.3)], 7: lambda: [FadeIn(q_out)]})

        def apres(sc):
            sc.monter_reponse(1)
            sc.ph(0, "Réponse B :", "Réponse B :", premier=True)
            sc.ph(1, "−2 × (−4) = +8.", "moins 2 fois moins 4, c'est plus 8.", bleu=(4, 5))
            sc.ph(2, "8 + 3 = 11.", "8 plus 3 : 11.")
            sc.play(*changer(q_out, n_out), Indicate(mach.boite, color=VERT_OK, scale_factor=1.05), run_time=0.3)
            sc.ph(3, "−5 :", "Moins 5,", couleur=PIEGE)
            sc.ph(4, "l'erreur de signe.", "l'erreur de signe.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["f(x) = −2x + 3.", "Combien vaut f(−4) ?"],
                            [X("−5", 34), X("11", 34), X("−11", 34)], 1,
                            ["Réponse B :", "−2 × (−4) = +8.", "8 + 3 = 11.", "−5 :", "l'erreur de signe."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        m = samir()
        m.perso.move_to(P(-5.2, -1.7))
        nom_au_dessus(m, -4.6, droite=-2.6)
        q = T("?", 80, JAUNE_TITRE, audit=False, gras=True).next_to(m.perso, RIGHT, buff=0.3).shift(UP * 0.6)
        self.play(FadeIn(m), run_time=0.3)
        x0 = -2.4
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        e = fonction("f(x) = 3x − 4", 56).move_to(P(0, 1.95)).align_to(P(x0, 0), LEFT)
        self.dire_eq(e, "f de x égale 3 x moins 4.", avec=[FadeIn(q, scale=1.4)], echelle=1.15)
        l1 = self.ld("Calcule :", 1.0, 46, x0=x0, maxw=8.0)
        self.dit(l1, "Calcule")
        p1 = pastille("1", CIEL, 0.3).move_to(P(x0 + 0.3, 0.1))
        e1 = X("f(−1)", 54).next_to(p1, RIGHT, buff=0.3)
        bleus(e1, 2, 3)
        self.dire_eq(e1, "f de moins 1,", avec=[FadeIn(p1, scale=1.3)], echelle=1.15)
        p2 = pastille("2", CIEL, 0.3).move_to(P(x0 + 3.6, 0.1))
        e2 = X("f(0,5)", 54).next_to(p2, RIGHT, buff=0.3)
        bleus(e2, 2)
        self.dire_eq(e2, "f de 0,5.", avec=[FadeIn(p2, scale=1.3)], echelle=1.15)
        pz = T("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(0, -1.2)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, e=e, e1=e1, e2=e2, p1=p1, p2=p2, autres=VGroup(m, q, l1, pz))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        x0 = -6.2
        self.dire("06b-correction")
        tit = T("Correction", 52, JAUNE_TITRE).move_to(P(0, 3.0)).align_to(P(x0, 0), LEFT)
        e, e1, e2, p1, p2 = d["e"], d["e1"], d["e2"], d["p1"], d["p2"]
        e_c = e.copy().scale(0.8).next_to(tit, RIGHT, buff=0.8)
        e_c.shift(UP * (tit.get_bottom()[1] - e_c.get_bottom()[1]))
        g1, g2 = VGroup(p1, e1), VGroup(p2, e2)
        c1 = g1.copy().align_to(P(x0, 0), LEFT).set_y(1.75)
        c2 = g2.copy().align_to(P(x0, 0), LEFT).set_y(-0.55)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["autres"]),
                e.animate.scale(0.8).move_to(e_c), g1.animate.move_to(c1), g2.animate.move_to(c2), rt=0.45)
        deux = T(":", 54, WHITE, audit=False)
        deux1 = deux.copy().next_to(c1, RIGHT, buff=0.12).align_to(e1, DOWN)
        deux2 = deux.copy().next_to(c2, RIGHT, buff=0.12).align_to(e2, DOWN)
        self.play(FadeIn(deux1), FadeIn(deux2), run_time=0.15)
        xs = max(deux1.get_right()[0], deux2.get_right()[0]) + 0.45
        # ① f(−1)
        r1a = X("3 × (−1) = −3", 52).move_to(P(0, 1.75))
        r1a.shift(RIGHT * (xs - r1a.get_left()[0]))
        r1a.shift(UP * (e1.atomes[0].get_bottom()[1] - r1a.atomes[0].get_bottom()[1]))
        r1a.atomes[0].set_color(A_COUL)
        bleus(r1a, 3, 4)
        self.dire_eq(r1a, "3 fois moins 1, c'est moins 3.", echelle=1.15)
        r1b = X("−3 − 4 = −7", 52)
        self.aligner_egal(r1b, r1a).set_y(0.95)
        r1b.atomes[2].set_color(B_COUL)
        r1b.atomes[3].set_color(B_COUL)
        for a in r1b.atomes[-2:]:
            a.set_color(VERT_OK)
        self.dire_eq(r1b, "Moins 3 moins 4 : moins 7.", echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(*r1b.atomes[-2:]), 0.1)), run_time=0.25)
        # ② f(0,5)
        r2a = X("3 × 0,5 = 1,5", 52).move_to(P(0, -0.55))
        self.aligner_egal(r2a, r1a)
        r2a.shift(UP * (e2.atomes[0].get_bottom()[1] - r2a.atomes[0].get_bottom()[1]))
        r2a.atomes[0].set_color(A_COUL)
        bleus(r2a, 2)
        self.dire_eq(r2a, "3 fois 0,5, c'est 1,5.", echelle=1.15)
        r2b = X("1,5 − 4 = −2,5", 52)
        self.aligner_egal(r2b, r1a).set_y(-1.35)
        r2b.atomes[1].set_color(B_COUL)
        r2b.atomes[2].set_color(B_COUL)
        for a in r2b.atomes[-2:]:
            a.set_color(VERT_OK)
        # le second « 1,5 » : sa marque est fausse (voir l'en-tête) ; l'instant mesuré dans le WAV
        r2b.atomes[0]._pas_audit = True
        self.attendre_t(15.30)
        self.play(TransformFromCopy(r2a.atomes[-1], r2b.atomes[0]), run_time=0.3)
        self.dire_eq(r2b, "moins 4 : moins 2,5.", sauf=[r2b.atomes[0]], echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(*r2b.atomes[-2:]), 0.1)), run_time=0.25)
        self.insister(VGroup(*r1b.atomes[-2:], *r2b.atomes[-2:]), 1.08, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP, buff=0.55)
        mer = Mer(x0=-5.3, x1=-2.95, y_surf=2.25, k=0.128, dmax=40)
        pl = Plongeur(0.68).move_to(mer.place(20, 0.05)).shift(DOWN * 0.25)
        b3 = T("3 bars", 34, VERT_OK, audit=False).next_to(pl, DOWN, buff=0.12)
        self.play(Write(tit), FadeIn(mer), FadeIn(pl), FadeIn(b3), run_time=0.6)
        x0, mw = -2.3, 8.4
        y = [2.3, 1.65, 0.85, 0.2, -0.6, -1.25, -2.05, -2.7]

        def ok(e):
            k = self.coche(VERT_OK, 0.24).move_to(P(x0 - 0.45, e.get_y()))
            return [Create(k)]

        l0 = self.ld("Image d'un nombre :", y[0], 42, x0=x0, maxw=mw)
        for i in (0,):
            l0.atomes[i].set_color(JAUNE_TITRE)
        self.poser_gestes(l0, "l'image d'un nombre,", {0: lambda: ok(l0)})
        l1 = self.ld("on remplace x par ce nombre.", y[1], 40, x0=x0, maxw=8.8)
        self.dit(l1, "on remplace x par ce nombre.")
        l2 = self.ld("On multiplie d'abord,", y[2], 42, x0=x0, maxw=mw)
        self.poser_gestes(l2, "On multiplie d'abord,", {0: lambda: ok(l2)})
        l3 = self.ld("puis on ajoute b.", y[3], 42, x0=x0, maxw=mw, lettres="")
        l3.atomes[3].set_color(B_COUL)
        self.dit(l3, "puis on ajoute b.")
        l4 = self.ld("Un nombre négatif se met", y[4], 42, x0=x0, maxw=mw)
        self.poser_gestes(l4, "Un nombre négatif se met", {0: lambda: ok(l4)})
        l5 = self.ld("entre parenthèses.", y[5], 42, JAUNE_TITRE, x0=x0, maxw=mw)
        self.dit(l5, "entre parenthèses.")
        l6 = X("p(20) = 3", 50, VERT_OK).move_to(P(0, y[6])).align_to(P(x0, 0), LEFT)
        l6.atomes[0].set_color(WHITE)
        bleus(l6, 2)
        self.poser_gestes(l6, "p de 20 égale 3.", {0: lambda: ok(l6)}, echelle=1.1)
        l7 = self.ld("L'image de 20 est 3.", y[7], 42, x0=x0, maxw=6.8)
        for i in (2,):
            l7.atomes[i].set_color(JAUNE_TITRE)
        bleus(l7, 4)
        self.dit(l7, "L'image de 20 est 3.")
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_plongee()
        self.ecran_calcul()
        self.ecran_tableau()
        self.ecran_question1()
        self.ecran_negatif()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
