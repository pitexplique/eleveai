# longueur_estimer.py
# EleveAI — Maths CM2 — série « Longueurs », épisode 03 : ESTIMER UNE LONGUEUR
# (micro longueur_estimer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : le lit de 2 m (réponse C).
# Décor et métier : Mia, PHOTOGRAPHE ANIMALIÈRE (centres : nature-ecologie, animaux, art).
# Mapping micro → écrans : 02 (les repères : 1 mm l'épaisseur d'un ongle, 1 cm la largeur d'un doigt,
# 1 m un grand pas, 1 km un quart d'heure de marche), 03 (la girafe à côté d'une porte de 2 m : environ 5 m ;
# 5 cm trop petit, 5 km impossible), 04 (estimer avec une virgule : enfant 1,4 m = 140 cm, colibri 8 cm),
# 06 (piège : l'unité avant le nombre, baleine bleue 30 m et pas 30 cm), questions 05 (papillon, C) et
# 07 (Piton des Neiges, B — la SEULE mention de La Réunion de la série), défi 08 (serpent de 3 pas et demi :
# environ 3,5 m).
# Voix : manim/voix/cm2-longueur-estimer.json (validée le 15/11, Julie, débit −6) ;
# marques : longueur_estimer_marques.json (python manim/scripts/cm2/aire_marques_cm2.py longueur:estimer).
# ⚠️ Les marques groupent parfois plusieurs mots (« 5 centimètres, 5 mètres » à 3,31 s) : les instants vrais,
# lus sur l'énergie du WAV, sont posés à la main (au_t, _forces).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/longueur_estimer.py LongueurEstimerCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/longueur_estimer.py LongueurEstimerCM2 -o eleveai-maths-cm2-longueur-estimer --media_dir manim/scripts/cm2/media-longueur-03
# Sortie : manim/sorties/cm2/maths/longueurs/03-estimer/eleveai-maths-cm2-longueur-estimer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm2_commun import *  # noqa: E402,F403

# ── Les milliers (« 12 500 ») : la voix les écrit avec une espace, l'audit et la synchro les lisent en un
# seul nombre (« 12500 »). Pour CE script seulement : la voix de la scène est réécrite « 12500 » (marques
# recalées), et les jetons d'un texte aussi. Les extraits d'au_mot s'écrivent donc « 12500 ».
import re  # noqa: E402

import stats_lycee_j2_commun as _j2  # noqa: E402

_MIL = re.compile(r"(?<=\d) (?=\d{3}(?!\d))")
_jetons_orig = getattr(_j2, "_jetons_orig", _j2._jetons)


def _jetons_mil(s):
    return _jetons_orig(_MIL.sub("", s))


_j2._jetons_orig = _jetons_orig
_j2._jetons = _jetons_mil
try:
    import frac_lotc_commun as _lc  # noqa: E402
    _lc._jetons = _jetons_mil
except ImportError:
    pass


def sans_milliers(s):
    """« 12 500 » → « 12500 ». Renvoie (texte, carte) : carte[i] = la place du caractère i dans le nouveau texte."""
    res, carte, pos = "", [], 0
    for m in _MIL.finditer(s):
        for k in range(pos, m.start()):
            carte.append(len(res) + k - pos)
        res += s[pos:m.start()]
        carte.append(len(res))
        pos = m.end()
    for k in range(pos, len(s) + 1):
        carte.append(len(res) + k - pos)
    res += s[pos:]
    return res, carte


class VoixMilliers:
    """À mettre EN PREMIER : la voix et les marques sans l'espace des milliers ; et des instants forcés
    (_forces) pour les morceaux de réponse que les marques placent mal (mots groupés, nombre redit)."""
    _forces = {}

    def _textes(self):
        if not hasattr(self, "_cache_textes_mil"):
            self._cache_textes_mil = {k: sans_milliers(v)[0] for k, v in super()._textes().items()}
        return self._cache_textes_mil

    def _marques(self):
        if not hasattr(self, "_cache_marques_mil"):
            bruts = super()._textes()
            res = {}
            for cle, L in super()._marques().items():
                carte = sans_milliers(bruts.get(cle, ""))[1]
                res[cle] = [[carte[min(p, len(carte) - 1)], t] for p, t in L]
            self._cache_marques_mil = res
        return self._cache_marques_mil

    def au_t(self, t):
        """Attend l'instant t (s) de la voix de l'écran (lu sur l'énergie du WAV, quand les marques groupent)."""
        d = self._debut_voix + t - self.renderer.time
        if d > 0.02:
            self.wait(d)

    def _force(self, f):
        cle = getattr(self, "_cle_voix", None)
        t = self._forces.get((cle, getattr(f, "original_text", None)))
        if t is None:
            for x in f.get_family():
                c = getattr(x, "_force_t", None)
                if c is not None and c[0] == cle:
                    return c[1]
        return t

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        for (cle, txt), t in self._forces.items():
            for f in r[5].get_family():
                if isinstance(f, Text) and f.original_text == txt:
                    for x in f.get_family():
                        x._force_t = (cle, t)
        return r

    def _attente(self, textes):
        for f in textes:
            t = self._force(f)
            if t is not None:
                return max(0.0, self._debut_voix + t - self.renderer.time)
        return super()._attente(textes)

PEAU = "#c68642"
ONGLE = "#fde2e4"
FEUILLAGE = "#16a34a"
FLECHE = ORANGE_RETENUE
GIR, GIR_B = "#fbbf24", "#92400e"


# ── Les dessins de l'épisode ────────────────────────────────────────────────

def girafe(h=3.0):
    """Une girafe de profil (tournée vers la droite), de hauteur totale h (des sabots aux cornes)."""
    s = 1.0
    pattes = VGroup(*[Rectangle(width=0.12, height=0.85, fill_color=GIR, fill_opacity=1, stroke_width=0)
                      .move_to(P(x, -0.62)) for x in (-0.5, -0.3, 0.3, 0.5)])
    sabots = VGroup(*[Rectangle(width=0.13, height=0.08, fill_color=GIR_B, fill_opacity=1, stroke_width=0)
                      .move_to(P(x, -1.04)) for x in (-0.5, -0.3, 0.3, 0.5)])
    corps = Ellipse(width=1.5, height=0.7, fill_color=GIR, fill_opacity=1, stroke_width=0)
    cou = Polygon(P(0.38, 0.1), P(0.68, 0.1), P(0.92, 1.55), P(0.72, 1.6), fill_color=GIR, fill_opacity=1,
                  stroke_width=0)
    tete = Ellipse(width=0.55, height=0.3, fill_color=GIR, fill_opacity=1, stroke_width=0).move_to(P(0.98, 1.68))
    oreille = Ellipse(width=0.18, height=0.08, fill_color=GIR, fill_opacity=1, stroke_width=0).rotate(0.5) \
        .move_to(P(0.74, 1.8))
    cornes = VGroup(*[VGroup(Line(P(x, 1.78), P(x, 2.0), color=GIR_B, stroke_width=4),
                             Dot(P(x, 2.0), radius=0.05, color=GIR_B)) for x in (0.84, 0.97)])
    taches = VGroup(*[Dot(P(x, y), radius=r, color=GIR_B) for x, y, r in
                      ((-0.4, 0.1, 0.09), (-0.05, -0.12, 0.09), (0.25, 0.15, 0.08), (-0.2, 0.2, 0.07),
                       (0.58, 0.55, 0.06), (0.7, 1.0, 0.06), (0.1, -0.05, 0.07), (0.64, 0.3, 0.05),
                       (0.8, 1.35, 0.05))])
    oeil = Dot(P(1.02, 1.72), radius=0.04, color="#0f172a")
    queue = Line(P(-0.72, 0.1), P(-0.92, -0.35), color=GIR_B, stroke_width=4)
    g = VGroup(queue, pattes, sabots, corps, cou, tete, oreille, cornes, taches, oeil).scale(s)
    return g.scale_to_fit_height(h)


def porte(h=2.0):
    """Une porte d'intérieur de hauteur h : le battant, deux panneaux, la poignée."""
    bat = Rectangle(width=0.95, height=2.0, fill_color="#b45309", fill_opacity=1, stroke_color="#78350f",
                    stroke_width=4)
    pans = VGroup(*[Rectangle(width=0.62, height=0.75, fill_opacity=0, stroke_color="#78350f", stroke_width=3)
                    .move_to(P(0, y)) for y in (0.48, -0.5)])
    poig = Dot(P(0.33, -0.02), radius=0.06, color="#facc15")
    return VGroup(bat, pans, poig).scale(h / 2.0)


def ongle(s=1.0):
    """1 mm : le bout d'un doigt vu de côté, l'épaisseur de l'ongle pincée entre deux flèches."""
    d = RoundedRectangle(width=1.7, height=0.62, corner_radius=0.3, fill_color=PEAU, fill_opacity=1,
                         stroke_width=0)
    o = RoundedRectangle(width=0.62, height=0.1, corner_radius=0.04, fill_color=ONGLE, fill_opacity=1,
                         stroke_color="#f9a8d4", stroke_width=1.5).move_to(P(0.45, 0.36))
    f1 = Arrow(P(0.45, 0.95), P(0.45, 0.43), buff=0, color=FLECHE, stroke_width=4, max_tip_length_to_length_ratio=0.35)
    f2 = Arrow(P(0.45, -0.25), P(0.45, 0.29), buff=0, color=FLECHE, stroke_width=4,
               max_tip_length_to_length_ratio=0.35)
    f2.set_opacity(0)  # (la flèche du bas traverserait le doigt : seule celle du haut pince l'ongle)
    loupe = Circle(radius=0.48, color=WHITE, stroke_width=3).move_to(P(0.45, 0.36))
    return VGroup(d, o, loupe, f1).scale(s)


def doigt(s=1.0):
    """1 cm : un doigt levé, sa largeur marquée par une double flèche."""
    d = RoundedRectangle(width=0.56, height=1.5, corner_radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0)
    o = RoundedRectangle(width=0.36, height=0.42, corner_radius=0.15, fill_color=ONGLE, fill_opacity=1,
                         stroke_width=0).move_to(P(0, 0.42))
    plis = VGroup(*[Arc(radius=0.16, start_angle=-PI * 0.8, angle=PI * 0.6, color="#8d5524", stroke_width=3)
                    .move_to(P(0, y)) for y in (-0.15, -0.35)])
    fl = DoubleArrow(P(-0.28, 0.02), P(0.28, 0.02), buff=0, color=FLECHE, stroke_width=4, tip_length=0.12)
    return VGroup(d, o, plis, fl).scale(s)


def doigts(n, s=0.5):
    """n doigts côte à côte (sans flèche) : « la largeur de 6 doigts »."""
    g = VGroup()
    for _ in range(n):
        d = RoundedRectangle(width=0.56, height=1.3, corner_radius=0.27, fill_color=PEAU, fill_opacity=1,
                             stroke_color="#8d5524", stroke_width=2)
        o = RoundedRectangle(width=0.36, height=0.4, corner_radius=0.15, fill_color=ONGLE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.35))
        g.add(VGroup(d, o))
    return g.arrange(RIGHT, buff=0).scale(s)


def grand_pas(s=1.0, tenue="#2563eb"):
    """1 m : deux jambes écartées d'un grand pas, la longueur au sol marquée."""
    buste = Polygon(P(-0.3, 0.7), P(0.3, 0.7), P(0.22, 1.25), P(-0.22, 1.25), fill_color="#65a30d", fill_opacity=1,
                    stroke_width=0)
    j1 = Line(P(-0.12, 0.72), P(-0.8, -0.5), color=tenue, stroke_width=16)
    j2 = Line(P(0.12, 0.72), P(0.8, -0.5), color=tenue, stroke_width=16)
    ch = VGroup(*[Ellipse(width=0.38, height=0.18, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                          stroke_width=1.5).move_to(P(x, -0.55)) for x in (-0.78, 0.86)])
    sol = Line(P(-1.15, -0.66), P(1.2, -0.66), color=GRAY_B, stroke_width=3)
    fl = DoubleArrow(P(-0.8, -0.88), P(0.8, -0.88), buff=0, color=FLECHE, stroke_width=4, tip_length=0.14)
    return VGroup(sol, j1, j2, buste, ch, fl).scale(s)


def horloge(quarts=1, r=0.65):
    """Un cadran ; g.parts = les quarts d'heure colorés."""
    cad = Circle(radius=r, fill_color="#f8fafc", fill_opacity=1, stroke_color="#334155", stroke_width=5)
    parts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=r * 0.9, angle=-PI / 2,
                                   start_angle=PI / 2 - k * PI / 2, fill_color=VERT_OK, fill_opacity=0.75,
                                   stroke_width=0) for k in range(quarts)])
    ticks = VGroup(*[Line(r * 0.78 * np.array([np.cos(a), np.sin(a), 0]), r * 0.95 * np.array([np.cos(a), np.sin(a), 0]),
                          color="#334155", stroke_width=4) for a in (0, PI / 2, PI, 3 * PI / 2)])
    a = PI / 2 - quarts * PI / 2
    aig = Line(ORIGIN, r * 0.72 * np.array([np.cos(a), np.sin(a), 0]), color="#0f172a", stroke_width=5)
    ctr = Dot(ORIGIN, radius=0.06, color="#0f172a")
    g = VGroup(cad, parts, ticks, aig, ctr)
    g.parts = parts
    return g


def croix(m, couleur=ROUGE_ERREUR, sw=8, k=0.5):
    c = VGroup(Line(UL, DR), Line(UR, DL)).set_color(couleur).set_stroke(width=sw).scale(k)
    return c.move_to(m)


def photo(s=1.0):
    """Une photo (tirage blanc) : la savane, le soleil, un oiseau sur une branche ; la bande de légende."""
    cadre = RoundedRectangle(width=2.2, height=2.5, corner_radius=0.06, fill_color="#f8fafc", fill_opacity=1,
                             stroke_color="#cbd5e1", stroke_width=2)
    img = Rectangle(width=1.95, height=1.7, fill_color="#7dd3fc", fill_opacity=1, stroke_width=0).move_to(P(0, 0.25))
    sol = Rectangle(width=1.95, height=0.5, fill_color="#84cc16", fill_opacity=1, stroke_width=0).move_to(P(0, -0.35))
    soleil = Circle(radius=0.2, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(0.6, 0.75))
    g = girafe(1.25).move_to(P(-0.35, 0.18))
    leg = VGroup(*[Line(P(-0.8, y), P(0.8, y), color="#94a3b8", stroke_width=3) for y in (-0.85, -1.05)])
    return VGroup(cadre, img, sol, soleil, g, leg).scale(s)


def appareil(s=1.0):
    """Un appareil photo : le boîtier, l'objectif, le flash."""
    b = RoundedRectangle(width=1.4, height=0.9, corner_radius=0.12, fill_color="#111827", fill_opacity=1,
                         stroke_color="#9ca3af", stroke_width=3)
    o = Circle(radius=0.3, fill_color="#374151", fill_opacity=1, stroke_color="#e5e7eb", stroke_width=3)
    o2 = Circle(radius=0.14, fill_color="#0ea5e9", fill_opacity=1, stroke_width=0)
    fl = Rectangle(width=0.32, height=0.14, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0).move_to(P(-0.4, 0.55))
    return VGroup(fl, b, o, o2).scale(s)


def ruban_metre(s=1.0):
    """Un mètre ruban enroulé (boîtier jaune) dont sort un bout gradué."""
    boite = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.18, fill_color="#facc15", fill_opacity=1,
                             stroke_color="#a16207", stroke_width=3)
    c = Circle(radius=0.16, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    bout = Rectangle(width=1.0, height=0.16, fill_color="#fef08a", fill_opacity=1, stroke_width=0)
    bout.next_to(boite, RIGHT, buff=0).align_to(boite, DOWN).shift(UP * 0.08)
    tr = VGroup(*[Line(P(0, 0), P(0, 0.08), color=TRAIT, stroke_width=2).move_to(bout.get_left() + RIGHT * (0.1 + 0.1 * k)
                                                                                  + UP * 0.03) for k in range(9)])
    return VGroup(boite, c, bout, tr).scale(s)


def papillon(L=2.0):
    """Un papillon vu de dessus, ailes ouvertes, d'envergure L."""
    ailes = VGroup()
    for sg in (1, -1):
        ailes.add(Ellipse(width=0.95, height=0.75, fill_color="#f97316", fill_opacity=1, stroke_color="#111827",
                          stroke_width=3).rotate(sg * 0.5).move_to(P(sg * 0.5, 0.25)))
        ailes.add(Ellipse(width=0.62, height=0.55, fill_color="#fb923c", fill_opacity=1, stroke_color="#111827",
                          stroke_width=3).rotate(-sg * 0.5).move_to(P(sg * 0.36, -0.3)))
        ailes.add(Dot(P(sg * 0.62, 0.36), radius=0.09, color=WHITE))
    corps = RoundedRectangle(width=0.14, height=0.95, corner_radius=0.07, fill_color="#111827", fill_opacity=1,
                             stroke_width=0)
    ant = VGroup(*[Line(P(0, 0.45), P(sg * 0.22, 0.85), color="#111827", stroke_width=3) for sg in (1, -1)])
    g = VGroup(ailes, corps, ant)
    return g.scale(L / g.width)


def petit_pois(r=0.06):
    return Circle(radius=r, fill_color="#4ade80", fill_opacity=1, stroke_color="#166534", stroke_width=1.5)


def baleine(w=3.0):
    """Une baleine bleue de profil (tournée vers la droite), longue de w."""
    bleu = "#3b82f6"
    corps = Ellipse(width=w, height=w * 0.26, fill_color=bleu, fill_opacity=1, stroke_width=0)
    ventre = Ellipse(width=w * 0.7, height=w * 0.09, fill_color="#93c5fd", fill_opacity=1,
                     stroke_width=0).move_to(corps.get_center() + P(w * 0.08, -w * 0.08))
    queue = Polygon(P(-w * 0.45, 0), P(-w * 0.62, w * 0.14), P(-w * 0.55, 0), P(-w * 0.62, -w * 0.14),
                    fill_color=bleu, fill_opacity=1, stroke_width=0)
    nag = Polygon(P(w * 0.05, -w * 0.09), P(-w * 0.1, -w * 0.21), P(-w * 0.03, -w * 0.07), fill_color="#1d4ed8",
                  fill_opacity=1, stroke_width=0)
    oeil = Dot(radius=w * 0.016, color=WHITE).move_to(P(w * 0.33, 0))
    g = VGroup(queue, corps, ventre, nag, oeil)
    return g.scale(w / g.width)


def piton(s=1.0):
    """Le Piton des Neiges (La Réunion) : la mer, les pentes vertes, les remparts brun-rouge,
    le sommet pelé, une mer de nuages accrochée aux flancs et des pailles-en-queue."""
    mer = Rectangle(width=6.2, height=0.45, fill_color="#0ea5e9", fill_opacity=1, stroke_width=0).move_to(P(0, -1.55))
    vagues = VGroup(*[Arc(radius=0.12, start_angle=0, angle=PI, color="#e0f2fe", stroke_width=2)
                      .move_to(P(x, -1.42)) for x in (-2.7, -2.0, 2.1, 2.8)])
    cote = Polygon(P(-3.0, -1.32), P(3.0, -1.32), P(2.2, -1.0), P(-2.3, -1.0), fill_color="#fde68a",
                   fill_opacity=1, stroke_width=0)
    pente = Polygon(P(-2.9, -1.05), P(2.9, -1.05), P(1.6, -0.2), P(0.65, 0.95), P(0.15, 1.45), P(-0.35, 1.2),
                    P(-1.2, 0.2), fill_color="#15803d", fill_opacity=1, stroke_width=0)
    clair = Polygon(P(-2.3, -1.05), P(-0.9, -1.05), P(-0.6, -0.3), P(-1.2, 0.2), fill_color="#22c55e",
                    fill_opacity=1, stroke_width=0)
    rempart = Polygon(P(-0.95, 0.35), P(1.05, 0.35), P(0.65, 0.95), P(0.15, 1.45), P(-0.35, 1.2),
                      fill_color="#9a3412", fill_opacity=1, stroke_width=0)
    sommet = Polygon(P(-0.28, 1.12), P(0.48, 1.12), P(0.15, 1.45), fill_color="#78716c", fill_opacity=1,
                     stroke_width=0)
    nuages = VGroup(*[Ellipse(width=w, height=0.34, fill_color=WHITE, fill_opacity=0.85, stroke_width=0)
                      .move_to(P(x, y)) for x, y, w in ((-1.75, -0.05, 1.3), (-1.0, 0.1, 0.9), (1.55, 0.0, 1.3),
                                                        (2.25, -0.12, 0.9))])
    oiseaux = VGroup(*[VGroup(Arc(radius=0.1, start_angle=PI * 0.15, angle=PI * 0.7, color=WHITE, stroke_width=3),
                              Arc(radius=0.1, start_angle=PI * 0.15, angle=PI * 0.7, color=WHITE, stroke_width=3)
                              .shift(RIGHT * 0.17)).move_to(P(x, y)) for x, y in ((-1.6, 1.25), (1.6, 1.45))])
    g = VGroup(mer, vagues, cote, pente, clair, rempart, sommet, nuages, oiseaux)
    g.mer, g.sommet = mer, sommet
    return g.scale(s)


def serpent(L=8.0, ep=0.24):
    """Un serpent (python) allongé et ondulant, de longueur L (de la queue au museau), tourné vers la droite."""
    pts = [P(-L / 2 + L * k / 24, 0.16 * np.sin(k * PI / 4)) for k in range(25)]
    corps = VMobject(stroke_color="#65a30d", stroke_width=ep * 90)
    corps.set_points_smoothly(pts)
    motif = VMobject(stroke_color="#a16207", stroke_width=ep * 30)
    motif.set_points_smoothly(pts[2:-1])
    motif = DashedVMobject(motif, num_dashes=22)
    tete = Ellipse(width=ep * 2.2, height=ep * 1.4, fill_color="#4d7c0f", fill_opacity=1, stroke_width=0)
    tete.move_to(pts[-1] + RIGHT * ep * 0.5)
    oeil = Dot(tete.get_center() + P(ep * 0.35, ep * 0.25), radius=ep * 0.14, color="#fde047")
    langue = VGroup(Line(tete.get_right(), tete.get_right() + P(ep * 0.6, 0), color=ROUGE_ERREUR, stroke_width=3),
                    Line(tete.get_right() + P(ep * 0.6, 0), tete.get_right() + P(ep * 0.85, ep * 0.18),
                         color=ROUGE_ERREUR, stroke_width=3),
                    Line(tete.get_right() + P(ep * 0.6, 0), tete.get_right() + P(ep * 0.85, -ep * 0.18),
                         color=ROUGE_ERREUR, stroke_width=3))
    g = VGroup(corps, motif, langue, tete, oeil)
    return g


def colibri(L=1.6):
    """Un colibri en vol (tourné vers la droite), long de L du bout de la queue au bout du bec."""
    corps = Ellipse(width=0.9, height=0.42, fill_color="#10b981", fill_opacity=1, stroke_width=0).rotate(0.25)
    tete = Circle(radius=0.2, fill_color="#059669", fill_opacity=1, stroke_width=0).move_to(P(0.45, 0.2))
    gorge = Circle(radius=0.11, fill_color="#e11d48", fill_opacity=1, stroke_width=0).move_to(P(0.43, 0.06))
    bec = Line(P(0.62, 0.22), P(1.2, 0.16), color="#1f2937", stroke_width=4)
    aile = Polygon(P(-0.05, 0.12), P(0.25, 0.15), P(-0.35, 0.85), fill_color="#6ee7b7", fill_opacity=1,
                   stroke_width=0)
    queue = Polygon(P(-0.38, -0.08), P(-0.85, -0.38), P(-0.8, -0.05), fill_color="#047857", fill_opacity=1,
                    stroke_width=0)
    oeil = Dot(P(0.5, 0.26), radius=0.035, color=WHITE)
    g = VGroup(queue, corps, aile, tete, gorge, bec, oeil)
    return g.scale(L / g.width)


class LongueurEstimerBase(VoixMilliers, PaysageLongueurCM2):
    nom_voix = "cm2-longueur-estimer"
    fichier_marques = "longueur_estimer_marques.json"
    ceinture = "jaune"

    # Phrases de réponse dont les marques sont trop tôt (mots groupés) : instant vrai lu sur le WAV.
    _forces = {("05b-reponse", "6 cm."): 5.25, ("05b-reponse", "6 mm :"): 7.15,
               ("07b-reponse", "3 070 m"): 5.22}

    def girafe_porte(self, u, sol, x_porte, x_gir):
        """La porte (2 m) et la girafe (5 m) côte à côte, à l'échelle (u unités Manim par mètre)."""
        pt = porte(2 * u).move_to(P(x_porte, 0)).align_to(P(0, sol), DOWN)
        gi = girafe(5 * u).move_to(P(x_gir, 0)).align_to(P(0, sol), DOWN)
        return pt, gi

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une longueur", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer une longueur")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Une girafe :", 38, WHITE)
        q1 = self.ligne([("5 cm,", JAUNE_TITRE), ("5 m", JAUNE_TITRE), ("ou 5 km ?", JAUNE_TITRE)], 38, buff=0.25)
        hors_audit(q1[1])
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        sol = -1.45
        pt, gi = self.girafe_porte(0.64, sol, 2.3, 3.9)
        ligne_sol = Line(P(1.4, sol), P(5.0, sol), color=GRAY_B, stroke_width=3)
        self.au_mot("Une girafe")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(gi, shift=UP * 0.3), FadeIn(ligne_sol), run_time=0.35)
        self.au_mot("girafe : 5")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_t(4.3)
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 5")
        self.play(FadeIn(q1[2], shift=UP * 0.2), FadeIn(pt, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mia, photographe animalière ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = mia(0.95).move_to(P(-5.3, 0.3))
        self.au_mot("Voici Mia")
        nom = self.t("Mia", 42, "#84cc16").next_to(pe, UP, buff=0.2)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("photographe animalière")
        met = self.bloc(["photographe", "animalière"], 26, "#84cc16").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 0.8
        l0 = self.bloc(["Elle photographie les animaux", "dans la nature."], 30)
        self.col(l0, 2.55, XP)
        ph = photo(0.95).move_to(P(-2.35, 0.75))
        self.au_mot("photographie les animaux")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans la nature")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(ph, shift=UP * 0.2), run_time=0.4)
        l1 = self.bloc(["Sous chaque photo, elle écrit", "la taille de l'animal."], 30)
        self.col(l1, 1.15, XP)
        leg = ph[-1]
        self.au_mot("Sous chaque photo")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(leg, color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("taille de l'animal")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = self.bloc(["Mais elle n'a pas toujours", "de mètre ruban !"], 30, ORANGE_RETENUE)
        self.col(l2, -0.3, XP)
        rm = ruban_metre(0.9).move_to(P(-2.35, -1.6))
        self.au_mot("Mais elle")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(rm, shift=UP * 0.2), run_time=0.3)
        self.au_mot("mètre ruban")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(croix(rm, k=0.55)), run_time=0.35)
        l3 = self.t("Alors elle estime.", 42, VERT_OK)
        self.col(l3, -1.5, XP)
        self.au_mot("Alors elle estime")
        self.play(FadeIn(l3, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les repères ────────────────────────────────────────────────────
    XR = (-5.0, -2.25, 0.5, 3.65)

    def ecran_reperes(self):
        self.ecran("02-reperes")
        self.au_mot("Pour estimer")
        tit = self.t("Pour estimer, on se sert de repères.", 36, JAUNE_TITRE).move_to(P(0, 2.85))
        self.play(Write(tit), run_time=0.5)
        dess = [ongle(1.05), doigt(1.0), grand_pas(0.95), horloge(1, 0.7)]
        unites = ["1 mm", "1 cm", "1 m", "1 km"]
        legendes = [["l'épaisseur", "d'un ongle"], ["la largeur", "d'un doigt"], ["un grand pas"],
                    ["un quart d'heure", "de marche"]]
        # dans l'ordre de la voix : (mot de la légende, mot de l'unité, l'unité d'abord ?)
        mots = [("épaisseur d'un ongle", "environ 1 millimètre", False), ("largeur d'un doigt", "1 centimètre", False),
                ("Un grand pas", "1 mètre", False), ("quart d'heure de marche", "Et 1 kilomètre", True)]
        for x, d, u, lg, (m_l, m_u, u_avant) in zip(self.XR, dess, unites, legendes, mots):
            d.move_to(P(x, 0.25))
            et = self.t(u, 44, BLEU_D).move_to(P(x, 1.8))
            le = self.bloc(lg, 26, GRAY_B)
            le.move_to(P(x, 0)).align_to(P(0, -1.05), UP)
            etapes = [(m_l, [FadeIn(d, shift=UP * 0.2), FadeIn(le, shift=UP * 0.1)]),
                      (m_u, [FadeIn(et, scale=1.3)])]
            if u_avant:
                etapes.reverse()
            for mot, anims in etapes:
                self.au_mot(mot)
                self.play(*anims, run_time=0.35)
        self.attendre_voix()

    # ── 03 : la girafe à côté d'une porte ───────────────────────────────────
    def ecran_girafe(self):
        self.ecran("03-girafe")
        u, sol = 0.95, -2.3
        pt, gi = self.girafe_porte(u, sol, -5.1, -2.65)
        ligne_sol = Line(P(-6.2, sol), P(-0.9, sol), color=GRAY_B, stroke_width=3)
        XP = 0.6
        r0 = self.ligne([("Une girafe :", WHITE), ("plus de 2 fois", WHITE)], 32, buff=0.2)
        r1 = self.t("plus haute qu'une porte.", 32)
        l0 = VGroup(r0, r1).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(l0, 2.65, XP)
        self.au_mot("Une girafe")
        self.play(FadeIn(r0[0], shift=UP * 0.1), FadeIn(gi, shift=UP * 0.3), FadeIn(ligne_sol), run_time=0.35)
        self.au_mot("plus de 2 fois")
        self.play(FadeIn(r0[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus haute")
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("qu'une porte")
        self.play(FadeIn(pt, shift=UP * 0.2), run_time=0.35)
        # la porte : 2 m (double flèche à côté)
        xa = pt.get_left()[0] - 0.22
        fa = DoubleArrow(P(xa, sol), P(xa, sol + 2 * u), buff=0, color=BLEU_D, stroke_width=4, tip_length=0.15)
        ea = hors_audit(Text("2 m", font_size=28, color=BLEU_D, weight=BOLD)).next_to(fa, LEFT, buff=0.08)
        ea.set_y(sol + u)
        l1 = self.ligne([("Une porte :", WHITE), ("2 m", BLEU_D)], 34, buff=0.2)
        self.col(l1, 1.75, XP)
        self.au_mot("Une porte fait")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fait 2")
        self.play(FadeIn(l1[1], shift=UP * 0.1), GrowFromCenter(fa), FadeIn(ea), run_time=0.3)
        # deux portes et demie l'une sur l'autre, en pointillés, à côté de la girafe
        xb = gi.get_right()[0] + 0.3
        etages = VGroup(*[DashedLine(P(xb - 0.12, sol + k * 2 * u), P(xb + 0.12, sol + k * 2 * u), color=BLEU_D,
                                     stroke_width=4) for k in (1, 2)])
        fb = DoubleArrow(P(xb, sol), P(xb, sol + 5 * u), buff=0, color=VERT_OK, stroke_width=4, tip_length=0.15)
        eb = hors_audit(Text("5 m", font_size=30, color=VERT_OK, weight=BOLD)).next_to(fb, RIGHT, buff=0.1)
        eb.set_y(sol + 3.2 * u)
        l2 = self.ligne([("La girafe :", WHITE), ("environ 5 m", VERT_OK)], 34, buff=0.2)
        self.col(l2, 1.1, XP)
        self.au_mot("la girafe mesure")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(etages), run_time=0.3)
        self.au_mot("environ 5")
        self.play(FadeIn(l2[1], shift=UP * 0.1), GrowFromCenter(fb), FadeIn(eb), run_time=0.35)
        self.insister(l2[1], 1.12, 0.2)
        # 5 cm : trop petit
        mn = doigts(5, 0.38)
        a1 = self.ligne([("5 cm", ROUGE_ERREUR), ("= 5 doigts :", WHITE)], 32, buff=0.2)
        b1 = self.t("trop petit.", 32, ROUGE_ERREUR)
        hors_audit(a1[0])
        g1 = VGroup(a1, b1).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(g1, 0.05, XP + 1.35)
        mn.move_to(P(XP + 0.6, g1.get_y()))
        self.au_t(8.9)
        self.play(FadeIn(a1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("de 5 doigts")
        self.play(FadeIn(a1[1], shift=UP * 0.1), FadeIn(mn, shift=UP * 0.1), run_time=0.3)
        self.au_mot("trop petit")
        self.play(FadeIn(b1, shift=UP * 0.1), run_time=0.25)
        # 5 km : impossible
        hl = horloge(4, 0.38)
        a2 = self.ligne([("5 km :", ROUGE_ERREUR), ("plus d'une heure", WHITE)], 32, buff=0.2)
        b2 = self.ligne([("de marche :", WHITE), ("impossible !", ROUGE_ERREUR)], 32, buff=0.2)
        g2 = VGroup(a2, b2).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(g2, -1.25, XP + 1.35)
        hl.move_to(P(XP + 0.6, g2.get_y()))
        self.au_mot("5 kilomètres")
        self.play(FadeIn(a2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("plus d'une heure")
        self.play(FadeIn(a2[1], shift=UP * 0.1), FadeIn(hl, shift=UP * 0.1), run_time=0.3)
        self.au_mot("de marche")
        self.play(FadeIn(b2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("impossible")
        self.play(FadeIn(b2[1], scale=1.15), run_time=0.3)
        self.attendre_voix()

    # ── 04 : estimer avec un nombre à virgule ───────────────────────────────
    def ecran_virgule(self):
        self.ecran("04-virgule")
        self.au_mot("estimer avec un nombre")
        tit = self.t("Estimer avec une virgule :", 40, JAUNE_TITRE).move_to(P(0, 2.95))
        self.play(Write(tit), run_time=0.45)
        sep = DashedLine(P(-0.35, 2.4), P(-0.35, -2.6), color=GRAY_D, stroke_width=3)
        # à gauche : l'enfant contre la toise (1 m = 1,55 unité)
        XG, u, sol = -3.4, 1.55, -0.95
        toise = Rectangle(width=0.35, height=1.6 * u, fill_color=BOIS, fill_opacity=1, stroke_color=BOIS_B,
                          stroke_width=3).move_to(P(XG - 1.1, sol + 0.8 * u))
        traits = VGroup(*[Line(P(toise.get_right()[0] - (0.2 if k % 5 == 0 else 0.1), sol + k * 0.1 * u),
                               P(toise.get_right()[0], sol + k * 0.1 * u), color=TRAIT,
                               stroke_width=3 if k % 5 == 0 else 1.5) for k in range(17)])
        nums = VGroup(*[hors_audit(Text(s, font_size=20, color=GRAY_B, weight=BOLD))
                        .next_to(np.array([toise.get_left()[0], sol + v * u, 0]), LEFT, buff=0.1)
                        for v, s in ((0, "0"), (0.5, "50 cm"), (1.0, "1 m"), (1.5, "1,5 m"))])
        sol_g = Line(P(XG - 1.9, sol), P(XG + 1.5, sol), color=GRAY_B, stroke_width=3)
        enf = personne(peau="#e0ac69", tenue="#f43f5e", cheveux="#1f2937", s=1.0)
        enf.scale_to_fit_height(1.4 * u).move_to(P(XG + 0.15, 0)).align_to(P(0, sol), DOWN)
        tete = DashedLine(P(toise.get_right()[0], sol + 1.4 * u), P(enf.get_right()[0] + 0.1, sol + 1.4 * u),
                          color=VERT_OK, stroke_width=4)
        l1 = self.t("Un enfant de ton âge :", 32).move_to(P(XG, -1.45))
        l2 = self.ligne([("environ 1,4 m", BLEU_D), ("= 140 cm", VERT_OK)], 34, buff=0.2).move_to(P(XG, -2.15))
        self.au_mot("Un enfant de ton âge")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(toise), FadeIn(traits), FadeIn(nums), FadeIn(sol_g),
                  FadeIn(enf, shift=UP * 0.2), Create(sep), run_time=0.45)
        self.au_mot("environ 1,4")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(tete), run_time=0.3)
        self.au_mot("140")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        # à droite : le colibri sur la règle (1 cm = 0,4 unité)
        XD = 2.65
        rg = regle(10, 0.4, mm=True, h=0.6, fs=18).move_to(P(XD, -0.15))
        co = colibri(8 * 0.4).move_to(P(0, 0.75))
        co.shift(RIGHT * (rg.x(0) - co.get_left()[0]))
        rep = VGroup(repere(rg, 0, h=0.9), repere(rg, 8, h=0.9))
        l3 = self.bloc(["Un colibri,", "le plus petit oiseau :"], 30).move_to(P(XD, -1.45))
        l4 = self.t("environ 8 cm", 34, VERT_OK).move_to(P(XD, -2.25))
        self.au_mot("Un colibri")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(co, shift=LEFT * 0.3), FadeIn(rg), run_time=0.35)
        self.au_mot("plus petit oiseau")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 8")
        self.play(FadeIn(l4, shift=UP * 0.1), Create(rep), run_time=0.3)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pa = papillon(2.3).move_to(P(-3.9, 2.25))
        dg = doigts(6, 2.3 / (6 * 0.56))
        dg.next_to(pa, DOWN, buff=0.15).set_x(pa.get_x())

        def autres_q(sc):
            sc.play(FadeIn(pa, scale=0.6), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(dg, shift=LEFT * 0.2), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Mia photographie un papillon,", "les ailes ouvertes.", "Combien mesure-t-il ?"],
                             [self.choix("6 mm"), self.choix("6 m"), self.choix("6 cm")], 2,
                             ["Ailes ouvertes : 6 doigts,", "6 cm.", "6 mm : moins qu'un petit pois ;",
                              "6 m : plus qu'une girafe !"],
                             -0.75, couper={2: ("6 mm :", "moins qu'un petit pois ;")}, sans_audit=(1, 2),
                             mot_q="Mia photographie", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (l'unité avant le nombre) ─────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = self.t("Choisis l'unité AVANT le nombre.", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.25)
        self.au_mot("Choisis l'unité avant le nombre")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        # la baleine bleue (30 m) au-dessus d'un bus de 10 m ? non : la mer et la baleine, à l'échelle d'une plongeuse
        mer = Rectangle(width=8.0, height=1.9, fill_color="#0c4a6e", fill_opacity=1, stroke_width=0)
        mer.move_to(P(-2.25, 0.55))
        ba = baleine(6.6).move_to(P(-2.4, 0.6))
        fl = DoubleArrow(P(ba.get_left()[0], -0.6), P(ba.get_right()[0], -0.6), buff=0, color=VERT_OK,
                         stroke_width=4, tip_length=0.15)
        e1 = self.ligne([("Une baleine bleue :", WHITE), ("environ 30 m", VERT_OK)], 32, buff=0.2)
        e1.move_to(P(-2.25, -1.05))
        self.au_mot("Une baleine bleue")
        self.play(FadeIn(mer), FadeIn(ba, shift=RIGHT * 0.4), FadeIn(e1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("environ 30")
        self.play(FadeIn(e1[1], shift=UP * 0.1), GrowFromCenter(fl), run_time=0.3)
        # pas 30 cm : une baleine jouet de 30 cm, dans la main
        XJ = 3.75
        jouet = baleine(1.35).move_to(P(XJ, 0.85))
        mn = doigts(4, 0.45).next_to(jouet, DOWN, buff=-0.05)
        e2 = self.ligne([("pas", WHITE), ("30 cm", ROUGE_ERREUR)], 32, buff=0.2).move_to(P(XJ, -0.25))
        self.au_mot("pas 30")
        self.play(FadeIn(jouet, scale=0.5), FadeIn(mn), FadeIn(e2, shift=UP * 0.1), run_time=0.35)
        self.play(Create(croix(VGroup(jouet, mn), k=0.6)), run_time=0.25)
        # demande-toi : trois questions, trois repères
        l1 = self.t("Demande-toi :", 34, JAUNE_TITRE)
        gauche(l1, -6.2, -1.75)
        self.au_mot("Demande-toi")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        y = -2.5
        q1 = VGroup(doigt(0.32), self.t("plus petit qu'un doigt ?", 26)).arrange(RIGHT, buff=0.15)
        q2 = VGroup(grand_pas(0.3), self.t("qu'un pas ?", 26)).arrange(RIGHT, buff=0.15)
        q3 = VGroup(self.t("ou plus grand ?", 26),)
        for q in (q1, q2, q3):
            q.set_y(y)
        q1.align_to(P(-6.1, 0), LEFT)
        q2.next_to(q1, RIGHT, buff=0.45)
        q3.next_to(q2, RIGHT, buff=0.45)
        q3.set_y(y)
        self.au_mot("plus petit qu'un doigt")
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus petit qu'un pas")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("plus grand")
        self.play(FadeIn(q3, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) — le Piton des Neiges ───────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pi = piton(0.87).move_to(P(-3.4, 1.55))
        xs = pi.mer.get_left()[0] + 0.25
        fl = DoubleArrow(P(xs, pi.mer.get_top()[1]), P(xs, pi.sommet.get_top()[1]), buff=0, color=JAUNE_TITRE,
                         stroke_width=4, tip_length=0.15)
        niv = DashedLine(P(xs, pi.sommet.get_top()[1]), pi.sommet.get_top(), color=JAUNE_TITRE, stroke_width=3)
        alt = hors_audit(Text("?", font_size=36, color=JAUNE_TITRE, weight=BOLD)).next_to(fl, RIGHT, buff=0.1)

        def autres_q(sc):
            sc.play(FadeIn(pi), GrowFromCenter(fl), Create(niv), FadeIn(alt), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(pi.sommet, color=VERT_OK, scale_factor=1.3), run_time=0.2)

        self.question_gauche("07-question", "07b-reponse",
                             ["Mia monte au Piton des Neiges", "(La Réunion). Quelle est", "l'altitude du sommet ?"],
                             [self.choix("environ 300 m"), self.choix("environ 3 000 m"),
                              self.choix("environ 30 km")], 1,
                             ["Environ 3 000 m = 3 km :", "3 070 m exactement.", "30 km : bien plus haut",
                              "que les avions !"],
                             -0.75, couper={0: ("Environ 3 000 m", "= 3 km :"), 1: ("3 070 m", "exactement.")},
                             sans_audit=(1,),
                             mot_q="Mia monte", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi (le serpent de 3 grands pas et demi) ───────────────────
    PAS = 2.5   # un grand pas (1 m) en unités Manim
    X0 = -5.6   # la queue du serpent
    YS = -0.55  # le sol

    def le_serpent(self):
        s = serpent(3.5 * self.PAS)
        s.shift(RIGHT * (self.X0 - s[0].get_left()[0]) + UP * (self.YS + 0.2 - s[0].get_y()))
        return s

    def les_pas(self):
        """Les arcs des 3 pas et demi au-dessus du serpent."""
        y = self.YS + 0.62
        arcs = VGroup()
        for k in range(4):
            a, b = self.X0 + k * self.PAS, self.X0 + min(k + 1, 3.5) * self.PAS
            arcs.add(ArcBetweenPoints(P(a, y), P(b, y), angle=-PI * 0.55, color=FLECHE, stroke_width=5))
        traces = VGroup(*[Ellipse(width=0.36, height=0.18, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                          .move_to(P(self.X0 + k * self.PAS, y - 0.08)) for k in range(4)])
        traces.add(Ellipse(width=0.36, height=0.18, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                   .move_to(P(self.X0 + 3.5 * self.PAS, y - 0.08)))
        return arcs, traces

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        l0 = self.t("Mia photographie un serpent.", 34)
        gauche(l0, -6.2, 2.35)
        sp = self.le_serpent()
        herbe = Line(P(-6.2, self.YS), P(4.6, self.YS), color="#65a30d", stroke_width=5)
        self.au_mot("Mia photographie un serpent")
        self.play(FadeIn(l0, shift=UP * 0.1), Create(sp[0]), FadeIn(sp[1:]), FadeIn(herbe), run_time=0.6)
        l1 = self.ligne([("Il est aussi long que", WHITE), ("3 grands pas et demi.", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l1, -6.2, 1.7)
        arcs, traces = self.les_pas()
        self.au_mot("aussi long que")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(traces[0]), run_time=0.3)
        self.au_mot("3 grands pas et demi")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        for k in range(4):
            self.play(Create(arcs[k]), FadeIn(traces[k + 1], scale=1.3), run_time=0.2)
        l2 = self.ligne([("Combien mesure-t-il environ,", WHITE), ("en mètres ?", VERT_OK)], 34, buff=0.2)
        gauche(l2, -6.2, -1.45)
        self.au_mot("Combien mesure-t-il")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en mètres")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Wiggle(sp), run_time=0.5)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        sp = self.le_serpent()
        herbe = Line(P(-6.2, self.YS), P(4.6, self.YS), color="#65a30d", stroke_width=5)
        arcs, traces = self.les_pas()
        self.add(herbe, sp, arcs, traces)
        etq = VGroup(*[hors_audit(Text("1 m", font_size=26, color=BLEU_D, weight=BOLD))
                       .move_to(arcs[k].get_top() + UP * 0.25) for k in range(3)])
        demi = hors_audit(Text("0,5", font_size=24, color=BLEU_D, weight=BOLD)).move_to(arcs[3].get_top() + UP * 0.25)
        l0 = self.ligne([("Un grand pas :", WHITE), ("environ 1 m.", BLEU_D)], 36, buff=0.2)
        gauche(l0, -6.2, 2.35)
        self.au_mot("Un grand pas")
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(arcs[0], color=BLEU_D), run_time=0.3)
        self.au_mot("environ 1")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(etq[0], scale=1.3), run_time=0.3)
        self.play(FadeIn(etq[1], scale=1.3), FadeIn(etq[2], scale=1.3), run_time=0.2)
        # la règle des mètres sous le serpent
        y = self.YS - 0.35
        axe = Line(P(self.X0, y), P(self.X0 + 3.6 * self.PAS, y), color=WHITE, stroke_width=3)
        tr = VGroup(*[Line(P(self.X0 + v * self.PAS, y - 0.12), P(self.X0 + v * self.PAS, y + 0.12), color=WHITE,
                           stroke_width=3 if v == int(v) else 2) for v in (0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5)])
        nb = VGroup(*[hors_audit(Text(s, font_size=24, color=GRAY_B, weight=BOLD)).move_to(P(self.X0 + v * self.PAS, y - 0.38))
                      for v, s in ((0, "0"), (1, "1 m"), (2, "2 m"), (3, "3 m"))])
        l1 = self.ligne([("3 pas et demi :", WHITE), ("environ 3,5 m", VERT_OK)], 40, buff=0.25)
        gauche(l1, -6.2, -1.8)
        self.au_mot("3 pas et demi")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(demi, scale=1.3), FadeIn(axe), FadeIn(tr), FadeIn(nb),
                  run_time=0.35)
        self.au_mot("environ 3,5")
        e35 = hors_audit(Text("3,5 m", font_size=26, color=VERT_OK, weight=BOLD)).move_to(P(self.X0 + 3.5 * self.PAS, y - 0.38))
        self.play(FadeIn(l1[1], scale=1.15), FadeIn(e35, scale=1.3), run_time=0.35)
        l2 = self.ligne([("C'est un très long serpent :", WHITE), ("un python !", JAUNE_TITRE)], 34, buff=0.2)
        gauche(l2, -6.2, -2.55)
        self.au_mot("très long serpent")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un python")
        self.play(FadeIn(l2[1], scale=1.15), Indicate(sp[3], color=JAUNE_TITRE, scale_factor=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(VGroup(ongle(0.95), doigt(0.95)).arrange(RIGHT, buff=0.5),
                     VGroup(grand_pas(0.85), horloge(1, 0.6)).arrange(RIGHT, buff=0.5)).arrange(DOWN, buff=0.6)
        fig.scale(min(4.2 / fig.height, 3.5 / fig.width))
        lignes = self.finale_gauche(fig, textes=[
            ("Pour estimer, choisis d'abord", "l'unité, puis compare avec un repère :"),
            ("1 mm : l'épaisseur d'un ongle ;", "1 cm : un doigt ;"),
            ("1 m : un grand pas ;", "1 km : un quart d'heure de marche.")], fs=32)
        self.add(fig)
        self.au_mot("Pour estimer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.04))
        # un rang par repère : l'unité à son « 1 … », le repère à son mot (le « 1 » revient quatre fois)
        rangs = [(lignes[1], 0, ("1 mm :", "l'épaisseur d'un ongle ;"), ("1 millimètre", "l'épaisseur"), fig[0][0]),
                 (lignes[1], 1, ("1 cm :", "un doigt ;"), ("1 centimètre", "un doigt"), fig[0][1]),
                 (lignes[2], 0, ("1 m :", "un grand pas ;"), ("1 mètre", "un grand pas"), fig[1][0]),
                 (lignes[2], 1, ("1 km :", "un quart d'heure de marche."), ("1 kilomètre", "un quart"), fig[1][1])]
        for lg, i, (u, r), (m_u, m_r), d in rangs:
            vieux = lg[1][i]
            neuf = self.ligne([(u, BLEU_D), (r, WHITE)], vieux.font_size, buff=0.15)
            neuf.move_to(vieux).align_to(vieux, LEFT)
            lg[1].submobjects[i] = neuf
            self.au_mot(m_u)
            anims = [FadeIn(neuf[0], shift=RIGHT * 0.2), Indicate(d, scale_factor=1.08)]
            if i == 0:
                anims.append(Create(lg[0]))
            self.play(*anims, run_time=0.3)
            self.au_mot(m_r)
            self.play(FadeIn(neuf[1], shift=RIGHT * 0.2), run_time=0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_girafe()
        self.ecran_virgule()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurEstimerCM2(LongueurEstimerBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
