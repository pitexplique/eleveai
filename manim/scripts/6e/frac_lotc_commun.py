# frac_lotc_commun.py
# EleveAI — série « Fractions », 6e, LOT C (25/10/2026 : 08-quantite,
# 09-additionner, 10-multiplier-entier, 11-calcul-defi, 12-pourcentage-fraction,
# 13-pourcentage-decimal) : les petits OUTILS COMMUNS du lot. Pas de scène ici.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI frac_commun.py (pilote) : tout ce
# qui manquait est ICI (et signalé dans le rapport du lot) :
#   · personne() : un personnage-métier générique (tête, cheveux, tenue,
#     accessoire), au style de patissiere() du pilote ;
#   · casque_audio(), blouse(), lunettes() : accessoires ;
#   · grille100(k) : les 100 cases du coach (Pourcentage mode « cases »),
#     coloriées dans l'ordre de lecture ou selon une liste d'indices ;
#   · quadrant(i) : les 25 cases d'un quart de la grille 10 × 10 ;
#   · PaysageLotC : PaysageFrac + frac() (une EcritureFraction posée AU MOT)
#     et calc() (une ligne de calcul découpée nombre par nombre, au mot).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F401,F403

PEAUX = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a21"]


def personne(peau="#c68642", tenue="#6366f1", cheveux="#1f2937", longs=False, s=1.0):
    """Un personnage debout (même gabarit que la pâtissière du pilote) :
    .tete .cheveux .corps ; on lui ajoute un accessoire avec .add()."""
    tete = Circle(radius=0.42, fill_color=peau, fill_opacity=1, stroke_width=0)
    calotte = AnnularSector(inner_radius=0, outer_radius=0.46, angle=PI, start_angle=0, fill_color=cheveux,
                            fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    meches = VGroup()
    if longs:
        for x in (-0.4, 0.4):
            meches.add(RoundedRectangle(width=0.22, height=0.75, corner_radius=0.1, fill_color=cheveux,
                                        fill_opacity=1, stroke_width=0).move_to(P(x, -0.2)))
    ch = VGroup(calotte, meches)
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color=tenue,
                    fill_opacity=1, stroke_width=0)
    g = VGroup(corps, meches, tete, calotte)
    g.tete, g.cheveux, g.corps = tete, ch, corps
    return g.scale(s)


def casque_audio(p):
    """Un casque audio sur la tête du personnage p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    arceau = Arc(radius=r * 1.12, start_angle=0.1, angle=PI - 0.2, arc_center=c, stroke_color="#111827",
                 stroke_width=9)
    oreilles = VGroup(*[RoundedRectangle(width=r * 0.42, height=r * 0.75, corner_radius=r * 0.15,
                                         fill_color="#ef4444", fill_opacity=1, stroke_width=0)
                        .move_to(c + RIGHT * x * r * 1.05) for x in (-1, 1)])
    return VGroup(arceau, oreilles)


def blouse(p):
    """Une blouse blanche (labo, soin) sur le corps du personnage p."""
    b = p.corps.copy().set_fill(WHITE, 1).scale(0.98)
    col = Polygon(b.get_top() + LEFT * 0.28, b.get_top() + RIGHT * 0.28, b.get_top() + DOWN * 0.45,
                  fill_color=p.corps.get_fill_color(), fill_opacity=1, stroke_width=0)
    return VGroup(b, col)


def lunettes(p, couleur="#111827"):
    c = p.tete.get_center() + UP * 0.04
    r = p.tete.width / 2
    verres = VGroup(*[Circle(radius=r * 0.27, stroke_color=couleur, stroke_width=4).move_to(c + RIGHT * x * r * 0.4)
                      for x in (-1, 1)])
    return VGroup(verres, Line(verres[0].get_right(), verres[1].get_left(), color=couleur, stroke_width=4))


def grille100(k=0, cote=0.32, colories=None, couleur=None, centre=ORIGIN):
    """Les 100 cases du coach (carte blanche) ; k premières cases bleues."""
    return Grille(10, 10, k, cote=cote, colories=colories, couleur=couleur or BLEU_PART, sw=2, centre=centre)


def quadrant(i):
    """Les indices des 25 cases du quart i (0 haut-gauche, 1 haut-droit,
    2 bas-gauche, 3 bas-droit) d'une grille 10 × 10."""
    r0, c0 = (i // 2) * 5, (i % 2) * 5
    return [(r0 + r) * 10 + c0 + c for r in range(5) for c in range(5)]


def expression(*items, fs=60, couleur=WHITE, buff=0.28):
    """Une ligne de calcul avec fractions : items = (num, den) → EcritureFraction,
    ou "+", "=", "−", « 2 » → Text centré sur le trait. Tout est `sans_synchro` :
    le script pose chaque morceau AU MOT (expr[i])."""
    out = VGroup()
    for it in items:
        if isinstance(it, tuple):
            c = it[2] if len(it) > 2 else couleur
            m = EcritureFraction(it[0], it[1], fs=fs, couleur=c)
        else:
            m = Text(it, font_size=fs, color=couleur)
            m.sans_synchro = True
        out.add(m)
    out.arrange(RIGHT, buff=buff)
    y = next((m.trait.get_y() for m in out if isinstance(m, EcritureFraction)), out.get_y())
    for m in out:
        if isinstance(m, EcritureFraction):
            m.shift(UP * (y - m.trait.get_y()))
        else:
            m.set_y(y)
    return out


from stats_lycee_j2_commun import _MOT, _jetons  # noqa: E402


class _AttenteLotC:
    """La synchro par jetons du lot J2, resserrée pour le lot C (25/10) :
    · un objet `sans_synchro` (fractions écrites, choix en ligne) n'attend rien ;
    · un mot DÉJÀ dit il y a plus de 0,45 s, et qui revient dans les 4 s, fait
      attendre ce retour (le J2 ne regardait que 1,5 s : la ligne s'affichait
      alors AVANT d'être redite) ;
    · un mot dit à l'instant (≤ 0,45 s) n'attend rien."""

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
                if avant and ecoule - t_de(max(avant)) > 0.45:
                    print(f"TARD {self._cle_voix} « {j} » dans « {f.original_text} » : "
                          f"{ecoule - t_de(max(avant)):.2f} s", flush=True)
        return b

    def t_mot(self, extrait, n=1):
        """Dans combien de secondes la voix de l'écran dira `extrait` (≥ 0)."""
        i = -1
        for _ in range(n):
            i = self._texte_voix.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » absent de la voix")
        m = self._marques().get(self._cle_voix)
        t = max([x[1] for x in m if x[0] <= i] or [0.0])
        return max(0.0, self._debut_voix + t - self.renderer.time)

    def inline(self, s, fs=34, color=WHITE):
        t = Text(s, font_size=fs, color=color)
        t.sans_synchro = True
        t._bloc = True
        return t

    def montrer_ligne(self, lg, *autres):
        """« Ce que tu as appris » : la coche ET la ligne, au mot, d'un seul geste."""
        self._par_lots(list(lg[1].submobjects), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.35,
                       avec=[Create(lg[0]), *autres])


    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.cartes_q, self.ph_q = cartes, ph
        return tete, q, cartes, pause, rebours, ph

    def rep(self, *idx, avec=()):
        """Dans autres_r : pose les lignes idx de la phrase de réponse AU MOT
        (avec une animation de la figure) ; rep_fin() les retire de la phrase
        pour que question_pause ne les rejoue pas."""
        self._par_lots([self.ph_q[i] for i in idx], lambda m: FadeIn(m, shift=UP * 0.15), 0.3, avec=avec)
        self._deja = getattr(self, "_deja", set()) | set(idx)

    def rep_fin(self):
        """Les lignes déjà posées sortent de la phrase (elles restent à l'écran)."""
        reste = [m for i, m in enumerate(self.ph_q.submobjects) if i not in getattr(self, "_deja", set())]
        self.ph_q.submobjects = reste
        self._deja = set()


class PaysageLotC(_AttenteLotC, PaysageFrac):
    """PaysageFrac + deux outils de pose au mot."""

    def frac(self, f, mot, anim="pop", run_time=0.4):
        """Pose une EcritureFraction (sans synchro) AU MOT `mot`."""
        self.au_mot(mot)
        self.play(FadeIn(f, scale=1.3) if anim == "pop" else FadeIn(f, shift=RIGHT * 0.2), run_time=run_time)
        return f

    def calc(self, morceaux, y, fs=44, xl=None, avec=()):
        """Une ligne de calcul (« 4 × 25 = 100 ») posée dans la colonne et
        montrée morceau par morceau, chaque nombre à son mot ; `avec` : des
        animations jouées avec le PREMIER morceau (la flèche du geste)."""
        lg = self.ligne(morceaux, fs)
        self.col(lg, y, xl)
        self._par_lots(list(lg.submobjects), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.3, avec=avec)
        return lg


class ShortLotC(_AttenteLotC, ShortFrac):
    """ShortFrac + la synchro resserrée du lot C ; les cartes des choix SOUS la
    question (jamais par-dessus), comme le short du pilote."""

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph
