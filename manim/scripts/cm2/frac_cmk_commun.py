# frac_cmk_commun.py
# EleveAI — série « Fractions », CM2 SEUL, LOT CM K (26/10/2026 : 10-mixte-ecrire,
# 11-mixte-regrouper, 12-encadrer, 13-additionner, 14-produit-entier,
# 15-quantite, paysage + short chacun) : les OUTILS COMMUNS du lot. Pas de scène.
#
# ⛔ manim/scripts/cm1/frac_cm_commun.py (lot CM I) est IMPORTÉ, jamais modifié ;
# frac_cmj_commun.py (lot CM J, en cours dans une autre session) n'est PAS
# importé : ligne_calc(), au_fil(), sans_synchro() y sont RECOPIÉS (identiques).
# Ajouté ici :
#   · PaysageCM2 / ShortCM2 : identité « Maths CM2 — EleveAI », paysage VERTE (la
#     notion de CM2, complète : méthode, piège, défi corrigé), short BLANC ;
#     marques lues À CÔTÉ du script (manim/scripts/cm2/) ;
#   · frac_ligne(...) : une ligne « 7/4 = 4/4 + 3/4 = 1 + 3/4 » (fractions
#     écrites + signes + nombres), chaque morceau posé AU MOT par au_fil() ;
#   · les personnages-métiers du lot (dessinés, au style de personne()).
# Audit de chaque épisode : AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Classe>
#   → 0 AUDIT-AVANCE, 0 RETARD, 0 BORD.

import os
import re as _re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from frac_cm_commun import *  # noqa: E402,F401,F403


class _MultiAudite:
    """Un texte à PLUSIEURS nombres est découpé par la synchro (chaque nombre à
    SON mot) ; ses morceaux échappent à l'audit, qui relisait ensuite le texte
    entier au dernier morceau et signalait à tort le premier nombre « en
    retard ». Il est marqué audité : c'est la synchro au mot qui le cale."""

    def t(self, s, fs=40, color=WHITE):
        m = super().t(s, fs, color)
        if len(_re.findall(r"\d+(?:,\d+)?", s)) >= 2:
            m._audite = True
        return m


class PaysageCM2(_MultiAudite, PaysageCM):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"


class ShortCM2(_MultiAudite, ShortCM):
    ceinture = "blanche"


# ── la pose AU MOT (recopié de cm1/frac_cmj_commun.py, lot CM J) ────────────

def sans_synchro(m):
    for f in m.get_family():
        f.sans_synchro = True
    return m


def ligne_calc(scene, morceaux, y=None, fs=46, xl=None, centre=None):
    """Une ligne de morceaux (texte, couleur) posée dans la colonne (ou à
    `centre`), PAS montrée ; chaque morceau est `sans_synchro` : au_fil() les
    montre, chacun à SON mot (l'audit, lui, les contrôle)."""
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
    attend le DERNIER nombre de l'extrait (ou l'extrait s'il n'a pas de
    nombre), puis montre les objets (pop) avec les animations. extrait peut
    être (extrait, n) ou (extrait, n, cible) ; None = tout de suite."""
    for ex, objs, anims in etapes:
        n, cible = 1, None
        if isinstance(ex, tuple):
            ex, n, cible = (ex + (None,))[:3]
        if ex is not None:
            if _re.search(r"\d", ex) and cible != "mot":
                scene.au_nb(ex, n, cible)
            else:
                scene.au_mot(ex, n)
        if os.environ.get("DEBUG_FIL") == "1":
            print(f"FIL {getattr(scene, '_cle_voix', '?')} « {ex} » t={scene.renderer.time - scene._debut_voix:.2f}",
                  flush=True)
        for o in objs:
            sans_synchro(o)
        a = [FadeIn(o, scale=1.25) if o.width < 2.2 else FadeIn(o, shift=UP * 0.15) for o in objs] + list(anims)
        if a:
            scene.play(*a, run_time=run_time)


def frac_ligne(items, fs=56, couleur=WHITE, buff=0.25):
    """Une ligne « 7/4 = 4/4 + 3/4 » : items = (num, den[, couleur]) → fraction
    écrite, ou une chaîne (« = », « + », « 1 ») → Text centré sur le trait.
    Rien n'est montré (au_fil le fait) ; ligne[i] = i-ème morceau."""
    out = VGroup()
    for it in items:
        if isinstance(it, tuple):
            m = EcritureFraction(it[0], it[1], fs=fs, couleur=it[2] if len(it) > 2 else couleur)
        else:
            c = couleur
            if isinstance(it, list):
                it, c = it
            m = Text(it, font_size=fs, color=c)
        out.add(m)
    out.arrange(RIGHT, buff=buff)
    y = next((m.trait.get_y() for m in out if isinstance(m, EcritureFraction)), out.get_y())
    for m in out:
        if isinstance(m, EcritureFraction):
            m.shift(UP * (y - m.trait.get_y()))
        else:
            m.set_y(y)
    return sans_synchro(out)


# ── les personnages-métiers du lot (dessinés) ───────────────────────────────

def chapeau(p, couleur="#92400e"):
    """Un chapeau à bord (archéologue, soigneuse)."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    bord = Ellipse(width=r * 2.9, height=r * 0.5, fill_color=couleur, fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.82, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.72)
    dome.move_to(c + UP * r * 1.08)
    return VGroup(dome, bord)


def casquette(p, couleur="#1e3a8a"):
    c = p.tete.get_center()
    r = p.tete.width / 2
    dome = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    visiere = RoundedRectangle(width=r * 1.2, height=r * 0.22, corner_radius=r * 0.1, fill_color=couleur,
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.18 + RIGHT * r * 0.75)
    return VGroup(dome, visiere)


def sifflet(p):
    c = p.corps.get_top() + DOWN * 0.25 * p.tete.width
    cordon = Line(c + LEFT * 0.18 * p.tete.width + UP * 0.2, c, color=WHITE, stroke_width=2)
    s = RoundedRectangle(width=0.22 * p.tete.width, height=0.12 * p.tete.width, corner_radius=0.03,
                         fill_color="#cbd5e1", fill_opacity=1, stroke_width=0).move_to(c)
    return VGroup(cordon, s)


def metier(peau, tenue, cheveux, longs=False, s=1.0, accessoires=()):
    """personne() + des accessoires : fonctions p → Mobject (blouse, lunettes…)."""
    p = personne(peau=peau, tenue=tenue, cheveux=cheveux, longs=longs, s=s)
    for a in accessoires:
        p.add(a(p))
    return p


def nom_metier(scene, pers, nom, metier_lignes, fs=28, cote=RIGHT):
    """Le prénom au-dessus du personnage, le métier à côté (renvoyés, non montrés)."""
    n = scene.t(nom, 36, BLEU_CALCUL).next_to(pers, UP, buff=0.22)
    m = scene.bloc(metier_lignes, fs, BLEU_CALCUL).next_to(pers, cote, buff=0.2).align_to(pers, DOWN)
    bloc_fixe(m)
    return n, m


def choix_multi(s, fs=34, couleur=WHITE):
    """Un choix de question à PLUSIEURS nombres (« 2 + 1/4 ») : un Text
    synchronisé (chaque nombre s'écrit à SON mot, découpé par la synchro), déjà
    marqué « audité » (ses morceaux ne sont pas vus par l'audit, et l'audit le
    relirait à tort quand la carte s'agrandit à la réponse)."""
    t = Text(s, font_size=fs, color=couleur)
    t._audite = True
    return t


def vu(*ms):
    """Après coup : ces textes déjà montrés (et contrôlés) ne sont plus audités
    (un Indicate ou un déplacement les ferait relire à tort)."""
    for m in ms:
        for f in m.get_family():
            f._pas_audit = True
    return ms[0] if len(ms) == 1 else ms
