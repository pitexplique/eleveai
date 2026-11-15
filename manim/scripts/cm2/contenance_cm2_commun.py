# contenance_cm2_commun.py
# EleveAI — Maths CM2 — série « Contenance » (15/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux 4 paysages contenance_comparer, contenance_convertir, contenance_estimer, contenance_defi.
# Base : le commun contenance du CM1 (manim/scripts/cm1/contenance_cm1_commun.py : recipient, vider, remplir,
# contenance, rangee_recipients, couleurs JUS / EAU / LAIT / MIEL, base PaysageContenanceCM1 = PhraseAGauche
# + PaysageAireCM1), IMPORTÉ sans le modifier, et LigneAlignee du commun aire CM2.
# Ici : l'identité CM2, les personnages-métiers du lot (Paul, Lucie, Ibrahim, Manon), le tableau des unités.
# CM2 = un cran au-dessus du CM1 : décimaux (2,5 L = 250 cL), dL, tableau L | dL | cL | mL, étapes.
# Voix : manim/voix/cm2-contenance-<ep>.json (validées le 15/11, Julie, débit −6) ;
# marques : python manim/scripts/cm2/aire_marques_cm2.py contenance:<ep> (⛔ jamais sans argument).
# Les outils propres à un épisode restent dans son script (4 scripts écrits en parallèle).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F401,F403
from contenance_cm1_commun import PaysageContenanceCM1  # noqa: E402,F401
from aire_cm2_commun import LigneAlignee, aligner_base, coiffe, ligne_de_base  # noqa: E402,F401

MANGUE = "#fbbf24"     # sorbet mangue
SIROP = "#e11d48"      # sirop de grenadine
ANANAS = "#fde047"     # jus d'ananas


def _glyphes(t):
    """Les lettres d'un Text (sans les espaces) et leurs glyphes, ou None si le compte diffère."""
    lettres = [c for c in getattr(t, "text", "") if not c.isspace()]
    return (lettres, list(t.submobjects)) if lettres and len(lettres) == len(t.submobjects) else None


def recaler_morceaux(g):
    """Une ligne coupée en morceaux (VGroup de Text) : chaque lettre reprend la place qu'elle aurait
    dans la ligne écrite d'un seul bloc (même ligne d'écriture, même espacement des lettres)."""
    ms = [m for m in g.submobjects if isinstance(m, Text)]
    gl = [_glyphes(m) for m in ms]
    if len(ms) != len(g.submobjects) or any(x is None for x in gl):
        return aligner_base(g)
    t = Text(" ".join(getattr(m, "original_text", m.text) for m in ms), font_size=ms[0].font_size, font=ms[0].font)
    tg = _glyphes(t)
    if tg is None or len(tg[1]) != sum(len(x[1]) for x in gl):
        return aligner_base(g)
    t.scale(sum(x.width for x in ms[0].submobjects) / sum(x.width for x in tg[1][:len(gl[0][1])]))
    t.shift(ms[0].submobjects[0].get_center() - tg[1][0].get_center())
    k = 0
    for lettres, glyphes in gl:
        for x in glyphes:
            x.move_to(tg[1][k].get_center())
            k += 1
    return g


def _base(l):
    for m in ([l] if isinstance(l, Text) else l.submobjects):
        b = ligne_de_base(m)
        if b is not None:
            return b
    return l.get_bottom()[1]


def _hauteur_x(ph):
    hs = []
    for l in ph.submobjects:
        for m in ([l] if isinstance(l, Text) else l.submobjects):
            g = _glyphes(m)
            if g:
                hs += [x.height for c, x in zip(*g) if c in "acemnorsuvwxz"]
    hs.sort()
    return hs[len(hs) // 2] if hs else None


def phrase_reguliere(ph, coupees, pas=2.15):
    """Phrase de réponse : lignes coupées recalées, puis lignes posées à pas régulier sur leur ligne
    d'écriture (arrange les posait par leurs boîtes : interlignes inégaux selon les jambages)."""
    for i in coupees:
        recaler_morceaux(ph.submobjects[i])
    hx = _hauteur_x(ph)
    if hx is None:
        return ph
    x0, b0 = ph.get_left()[0], _base(ph.submobjects[0])
    for i, l in enumerate(ph.submobjects):
        l.shift(UP * (b0 - pas * hx * i - _base(l)))
        l.shift(RIGHT * (x0 - l.get_left()[0]))
    return ph


def paul(s=1.0):
    """Paul, glacier : veste blanche, calot rose pâle (glace à la fraise)."""
    p = personne(peau="#f1c27d", tenue="#f8fafc", cheveux="#78350f", s=s)
    p.add(coiffe(p, "#f9a8d4", haut=0.6, large=2.0, hauteur=0.7))
    return p


def lucie(s=1.0):
    """Lucie, pharmacienne : blouse blanche, croix verte sur la poitrine."""
    p = personne(peau="#e0ac69", tenue="#f8fafc", cheveux="#1f2937", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    k = r * 0.32
    croix = VGroup(Rectangle(width=k * 3, height=k, fill_color="#16a34a", fill_opacity=1, stroke_width=0),
                   Rectangle(width=k, height=k * 3, fill_color="#16a34a", fill_opacity=1, stroke_width=0))
    croix.move_to(c + P(r * 0.55, -r * 2.2))
    p.add(croix)
    return p


def ibrahim(s=1.0):
    """Ibrahim, plombier : salopette bleue, casquette rouge."""
    p = personne(peau="#8d5524", tenue="#1d4ed8", cheveux="#111827", s=s)
    p.add(casquette(p, "#dc2626"))
    return p


def manon(s=1.0):
    """Manon, organisatrice de marathon : t-shirt vert fluo, casquette orange."""
    p = personne(peau="#f1c27d", tenue="#84cc16", cheveux="#b45309", longs=True, s=s)
    p.add(casquette(p, "#f97316"))
    return p


def tableau_unites(unites=("L", "dL", "cL", "mL"), larg=1.1, haut=0.7, fs=30, couleur=WHITE,
                   bord=GREY_B):
    """Le tableau des unités de contenance : une ligne d'en-têtes (L | dL | cL | mL) et une ligne de cases vides.
    Renvoie un VGroup ; t.tetes = les en-têtes (Text), t.cases = les cases (Rectangle) où poser les chiffres
    (chiffre(t, i, "5") les centre dans la case i). Les en-têtes ne sont pas audités (unités)."""
    tetes, cases = VGroup(), VGroup()
    for i, u in enumerate(unites):
        h = Rectangle(width=larg, height=haut, stroke_color=bord, stroke_width=3, fill_color="#1e293b",
                      fill_opacity=0.9).move_to(P(i * larg, 0))
        tx = hors_audit(Text(u, font_size=fs, color=JAUNE_TITRE, weight=BOLD)).move_to(h)
        c = Rectangle(width=larg, height=haut * 1.1, stroke_color=bord, stroke_width=3,
                      fill_opacity=0).next_to(h, DOWN, buff=0)
        tetes.add(VGroup(h, tx))
        cases.add(c)
    t = VGroup(tetes, cases)
    t.tetes, t.cases = tetes, cases
    return t


def chiffre(t, i, s, fs=34, couleur=WHITE, audit=False):
    """Un chiffre posé au centre de la case i du tableau des unités (hors audit par défaut)."""
    c = Text(s, font_size=fs, color=couleur, weight=BOLD).move_to(t.cases[i])
    return c if audit else hors_audit(c)


class PaysageContenanceCM2(LigneAlignee, PaysageContenanceCM1):
    """La base des 4 épisodes : phrase de réponse à gauche (PhraseAGauche, héritée du CM1),
    morceaux d'une ligne sur la même ligne d'écriture (LigneAlignee), identité CM2."""
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
