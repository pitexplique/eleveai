# frac_cmj_commun.py
# EleveAI — série « Fractions », CM1/CM2, LOT CM J (25/10/2026 : 05-equivalente,
# 06-decimale, 07-defi communs ; 08-unite, 09-superieure-1 CM1 seul) : les petits
# DÉCORS du lot (personnages-métiers, fleurs, pièces, escargots, cœurs). Pas de
# scène ici. ⛔ frac_cm_commun.py (lot CM I) est IMPORTÉ, jamais modifié.
# Tout est dessiné (aucune image), au style des personnages du lot C de 6e
# (personne() de 6e/frac_lotc_commun.py).

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F401,F403


def chapeau_paille(p, couleur="#eab308"):
    c = p.tete.get_center()
    r = p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.55, fill_color=couleur, fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    return VGroup(dome, bord)


def paysagiste(s=1.0):
    p = personne(peau="#8d5524", tenue="#15803d", cheveux="#111827", longs=True, s=s)
    p.add(chapeau_paille(p))
    return p


def apprenti(s=0.6):
    p = personne(peau="#f1c27d", tenue="#ea580c", cheveux="#78350f", s=s)
    p.add(chapeau_paille(p, "#ca8a04"))
    return p


def fleur(r=0.12, couleur="#f472b6"):
    petales = VGroup(*[Circle(radius=r * 0.55, fill_color=couleur, fill_opacity=1, stroke_width=0)
                       .move_to(r * 0.7 * np.array([np.cos(a), np.sin(a), 0]))
                       for a in np.linspace(0, TAU, 5, endpoint=False)])
    coeur = Circle(radius=r * 0.4, fill_color="#fde047", fill_opacity=1, stroke_width=0)
    return VGroup(petales, coeur)


def fleurs_sur(b, idx, r=0.12):
    """Une ou deux fleurs posées au centre de chaque part fleurie de la barre b."""
    g = VGroup()
    couleurs = ["#f472b6", "#f87171", "#c084fc", "#fde68a"]
    for i in idx:
        p = b.parts[i]
        if p.width > 0.9:
            for k, dx in enumerate((-0.22, 0.22)):
                g.add(fleur(r, couleurs[(i + k) % 4]).move_to(p.get_center() + RIGHT * dx * p.width))
        else:
            g.add(fleur(r, couleurs[i % 4]).move_to(p.get_center()))
    return g


def blouse_labo(s=1.0):
    p = personne(peau="#e0ac69", tenue="#0e7490", cheveux="#1f2937", longs=True, s=s)
    p.add(blouse(p), lunettes(p))
    return p


def piece(r=0.22, txt="1", couleur="#b45309"):
    c = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color="#fbbf24", stroke_width=3)
    t = Text(txt, font_size=int(r * 90), color="#fef3c7", weight=BOLD).move_to(c)
    return pas_audit(VGroup(c, t))


def escargot(couleur="#f59e0b", s=1.0):
    corps = RoundedRectangle(width=0.9, height=0.22, corner_radius=0.11, fill_color="#a3e635", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.11))
    coquille = VGroup(Circle(radius=0.3, fill_color=couleur, fill_opacity=1, stroke_color="#78350f", stroke_width=3),
                      Arc(radius=0.16, angle=1.6 * PI, stroke_color="#78350f", stroke_width=3)).move_to(P(-0.05, 0.2))
    tete = Circle(radius=0.12, fill_color="#a3e635", fill_opacity=1, stroke_width=0).move_to(P(0.45, -0.02))
    cornes = VGroup(*[Line(P(0.47, 0.06), P(0.47 + dx, 0.3), color="#65a30d", stroke_width=3) for dx in (0.0, 0.12)])
    return VGroup(corps, coquille, tete, cornes).scale(s)


def coeur(r=0.4, k=4, n_plein=0, couleur="#ef4444", vide="#475569"):
    """Un cœur de vie coupé en k quarts (secteurs autour du centre, un masque
    en forme de cœur n'existe pas sans LaTeX) : deux lobes + une pointe, 4 parts
    (haut-gauche, haut-droit, bas-droit, bas-gauche). .parts[i]."""
    pts = []
    for t in np.linspace(0, TAU, 120):
        x = 16 * np.sin(t) ** 3
        y = 13 * np.cos(t) - 5 * np.cos(2 * t) - 2 * np.cos(3 * t) - np.cos(4 * t)
        pts.append(P(x / 17 * r, y / 17 * r + 0.1 * r))
    forme = Polygon(*pts)
    centre = forme.get_center()
    parts = VGroup()
    for i in range(k):
        a0 = PI / 2 - i * TAU / k
        sec = AnnularSector(inner_radius=0, outer_radius=r * 2, angle=-TAU / k, start_angle=a0).move_arc_center_to(
            centre)
        inter = Intersection(forme, sec, fill_color=couleur if i < n_plein else vide, fill_opacity=1,
                             stroke_width=0)
        parts.add(inter)
    def bord(a):
        v = [np.array(q) - centre for q in pts]
        ang = [np.arctan2(w[1], w[0]) for w in v]
        j = min(range(len(v)), key=lambda m: abs(np.angle(np.exp(1j * (ang[m] - a)))))
        return np.array(pts[j])

    traits = VGroup(*[Line(centre, bord(PI / 2 - i * TAU / k), color="#0f172a", stroke_width=3) for i in range(k)])
    contour = forme.copy().set_fill(opacity=0).set_stroke("#0f172a", 4)
    g = VGroup(parts, traits, contour)
    g.parts, g.traits, g.contour, g.couleur = parts, traits, contour, couleur
    return g


# ── la pose AU MOT, morceau par morceau (le calcul « 3 × 2 = 6 ») ───────────

def ligne_calc(scene, morceaux, y=None, fs=46, xl=None, centre=None):
    """Une ligne de morceaux (texte, couleur) posée dans la colonne (ou à
    `centre`), PAS montrée ; chaque morceau est `sans_synchro` : c'est au_fil()
    qui les montre, chacun à SON mot (l'audit, lui, les contrôle)."""
    lg = VGroup(*[Text(m, font_size=fs, color=c) for m, c in morceaux]).arrange(RIGHT, buff=0.22)
    for m in lg:
        m.sans_synchro = True
    if centre is not None:
        lg.move_to(centre)
    else:
        scene.col(lg, y, xl)
    return lg


def au_fil(scene, etapes, run_time=0.3):
    """etapes = [(extrait, [objets à montrer], [autres animations]), …] :
    attend le DERNIER nombre de l'extrait (ou l'extrait s'il n'a pas de nombre),
    puis montre les objets (pop) avec les animations. extrait peut être un
    couple (extrait, n) pour viser la n-ième occurrence."""
    import re as _re
    for ex, objs, anims in etapes:
        n, cible = 1, None
        if isinstance(ex, tuple):
            ex, n, cible = (ex + (None,))[:3]
        if ex is not None:
            if _re.search(r"\d", ex):
                scene.au_nb(ex, n, cible)
            else:
                scene.au_mot(ex, n)
        if os.environ.get("DEBUG_FIL") == "1":
            print(f"FIL {getattr(scene, '_cle_voix', '?')} « {ex} » t={scene.renderer.time - scene._debut_voix:.2f}",
                  flush=True)
        for o in objs:  # le moment est choisi ici : la synchro par jetons n'attend plus rien
            sans_synchro(o)
        a = [FadeIn(o, scale=1.25) if o.width < 2.2 else FadeIn(o, shift=UP * 0.15) for o in objs] + list(anims)
        if a:
            scene.play(*a, run_time=run_time)


def sans_synchro(m):
    for f in m.get_family():
        f.sans_synchro = True
    return m


# ── le RÉCIPIENT gradué de la laborantine (06-decimale) ─────────────────────

EAU = "#38bdf8"


def recipient(n=10, h=3.6, w=1.4):
    """Un récipient de 1 L gradué en n parts égales (repris du verre doseur du
    pilote 6e) : .eau (hauteur ~0), .marques[i] (le trait de i/n, i = 1..n),
    .etiq (« 1 L » en haut, décor)."""
    paroi = VGroup(Line(P(-w / 2, h / 2), P(-w / 2, -h / 2)), Line(P(-w / 2, -h / 2), P(w / 2, -h / 2)),
                   Line(P(w / 2, -h / 2), P(w / 2, h / 2))).set_stroke("#cbd5e1", 6)
    eau = Rectangle(width=w - 0.1, height=0.001, fill_color=EAU, fill_opacity=0.9, stroke_width=0)
    eau.move_to(P(0, -h / 2 + 0.05), DOWN)
    marques = VGroup()
    for i in range(1, n + 1):
        y = -h / 2 + 0.05 + (h - 0.1) * i / n
        marques.add(Line(P(-w / 2, y), P(-w / 2 + (0.45 if i % 5 == 0 else 0.28), y), color=WHITE, stroke_width=4))
    etiq = pas_audit(Text("1 L", font_size=30, color=WHITE).next_to(marques[-1], LEFT, buff=0.25))
    g = VGroup(eau, paroi, marques, etiq)
    g.eau, g.marques, g.etiq, g.paroi = eau, marques, etiq, paroi
    return g


def remplir(v, i, run_time=1.2):
    """L'eau monte jusqu'au trait i (animation sur v.eau)."""
    bas = v.eau.get_bottom()
    cible = v.marques[i - 1].get_y() - bas[1]
    h0 = v.eau.height

    def maj(m, a):
        m.stretch_to_fit_height(max(0.001, h0 + (cible - h0) * a))
        m.move_to(bas, DOWN)

    return UpdateFromAlphaFunc(v.eau, maj, run_time=run_time, rate_func=smooth)


# ── le TRAM de Rayan (07-defi) ──────────────────────────────────────────────

def casquette(p, couleur="#1e3a8a"):
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color=couleur,
                            fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.62)
    visiere = RoundedRectangle(width=r * 1.3, height=r * 0.22, corner_radius=r * 0.1, fill_color=couleur,
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.35 + RIGHT * r * 0.7)
    return VGroup(calotte, visiere)


def conducteur(s=1.0):
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", s=s)
    p.add(casquette(p))
    return p


def collegue(s=1.0):
    p = personne(peau="#f1c27d", tenue="#1e3a8a", cheveux="#b45309", longs=True, s=s)
    p.add(casquette(p, "#1e40af"))
    return p


def tram(s=1.0, couleur="#0d9488"):
    corps = RoundedRectangle(width=1.5, height=0.62, corner_radius=0.16, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    fen = VGroup(*[RoundedRectangle(width=0.3, height=0.22, corner_radius=0.05, fill_color="#e0f2fe",
                                    fill_opacity=1, stroke_width=0).move_to(P(x, 0.08)) for x in (-0.45, 0, 0.45)])
    roues = VGroup(*[Circle(radius=0.09, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(x, -0.33))
                     for x in (-0.45, 0.45)])
    perche = VGroup(Line(P(0, 0.31), P(0.25, 0.6), color="#94a3b8", stroke_width=3),
                    Line(P(0.12, 0.6), P(0.38, 0.6), color="#94a3b8", stroke_width=3))
    return VGroup(perche, corps, fen, roues).scale(s)


# ── la CHORALE de Sofia (08-unite) ──────────────────────────────────────────

TEINTES = ["#ef4444", "#f59e0b", "#22c55e", "#38bdf8", "#a78bfa", "#ec4899"]


def enfant(couleur, s=1.0, peau="#c68642"):
    """Un enfant de la chorale (tête + corps), 0,5 de haut à s = 1."""
    corps = RoundedRectangle(width=0.34, height=0.26, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.12))
    tete = Circle(radius=0.11, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 0.13))
    return VGroup(corps, tete).scale(s)


def chorale(n, colonnes, s=1.0, buff=0.18, centre=ORIGIN):
    peaux = ["#8d5524", "#c68642", "#e0ac69", "#f1c27d", "#5c3a21"]
    g = VGroup(*[enfant(TEINTES[i % 6], s, peaux[(i * 7) % 5]) for i in range(n)])
    g.arrange_in_grid(cols=colonnes, buff=buff)
    return g.move_to(centre)


def cheffe(s=1.0):
    p = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#1f2937", longs=True, s=s)
    main = p.corps.get_right() + UP * 0.55 * s
    p.add(Line(main, main + UP * 0.45 * s + RIGHT * 0.35 * s, color=WHITE, stroke_width=4))
    return p


# ── la PISTE d'athlétisme d'Inès (09-superieure-1) ──────────────────────────

PISTE, PISTE_VIDE = "#f97316", "#334155"


def piste(k=0, r=0.95, centre=ORIGIN, couleur=PISTE):
    """1 tour de piste = un anneau en 4 quarts (le 1er en haut, sens des
    aiguilles d'une montre, comme le disque du coach). .parts[i] ; k quarts
    colorés."""
    parts = VGroup(*[AnnularSector(inner_radius=r * 0.62, outer_radius=r, angle=-PI / 2,
                                   start_angle=PI / 2 - i * PI / 2, fill_color=couleur if i < k else PISTE_VIDE,
                                   fill_opacity=1, stroke_color=WHITE, stroke_width=3) for i in range(4)])
    herbe = Circle(radius=r * 0.6, fill_color="#166534", fill_opacity=1, stroke_width=0)
    g = VGroup(herbe, parts).move_to(centre)
    g.parts, g.couleur = parts, couleur
    return g


def entraineuse(s=1.0):
    p = personne(peau="#8d5524", tenue="#dc2626", cheveux="#111827", longs=True, s=s)
    c = p.corps.get_top() + DOWN * 0.25 * s
    p.add(Line(c + LEFT * 0.2 * s, c + DOWN * 0.35 * s, color=WHITE, stroke_width=2),
          Circle(radius=0.06 * s, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0).move_to(c + DOWN * 0.4 * s))
    return p


def coureur(s=0.6):
    return personne(peau="#f1c27d", tenue="#2563eb", cheveux="#78350f", s=s)
