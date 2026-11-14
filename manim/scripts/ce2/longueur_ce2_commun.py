# longueur_ce2_commun.py
# EleveAI — Maths CE2 — série « Longueurs » (14/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux paysages longueur_unites, _relations, _mesurer, _comparer, _choisir_unite, _estimer,
# _probleme, _defi.
# Base : longueur_cm1_commun (règle graduée `regle`, `sur_regle`, `repere`, rubans, `barre`, `accolade`,
# PaysageLongueurCM1 = même style que les séries CM1 et contenance CE2), IMPORTÉE sans la modifier.
# Ici : les personnages-métiers du lot CE2 (Samuel, Nina, Clara, Lina, Karim, Élodie, Jules, Maya)
# et `aux_extraits` (comme contenance_ce2_commun).
# ⛔ Banque `ce2/maths/longueur.bank.ts` : km, m, dm, cm, mm ; PAS de tableau de conversion,
# PAS de virgule (« 2 m 50 cm »). Ne pas se servir de `tableau_conv` ici.
# Voix : manim/voix/ce2-longueur-<ep>.json (validées le 14/11, Julie, débit −6) ;
# marques : python manim/scripts/ce2/perimetre_marques.py longueur:<ep>

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "cm1"))

from longueur_cm1_commun import *  # noqa: E402,F401,F403

BOIS_CLAIR = "#d6a26b"
BOIS_FONCE = "#92400e"
MER = "#0ea5e9"


def _chapeau(p, couleur):
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color=couleur, fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.9, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    return VGroup(dome, bord)


def samuel(s=1.0):
    """Samuel, menuisier : tablier marron, crayon de menuisier à l'oreille."""
    p = visage(personne(peau="#c68642", tenue="#92400e", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(crayon(r * 1.6, r * 0.22, corps="#dc2626").rotate(0.5).move_to(c + P(r * 1.05, r * 0.15)))
    return p


def nina(s=1.0):
    """Nina, entraîneuse d'athlétisme : survêtement rouge, sifflet, casquette blanche."""
    p = visage(personne(peau="#8d5524", tenue="#dc2626", cheveux="#111827", longs=True, s=s))
    p.add(casquette(p, "#f8fafc"))
    return p


def clara(s=1.0):
    """Clara, astronome : pull bleu nuit, étoile jaune sur le pull."""
    p = visage(personne(peau="#f1c27d", tenue="#1e3a8a", cheveux="#b45309", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Star(5, outer_radius=r * 0.45, fill_color="#facc15", fill_opacity=1, stroke_width=0)
          .move_to(c + P(0, -r * 2.4)))
    return p


def lina(s=1.0):
    """Lina, biologiste marine : combinaison bleu turquoise, masque de plongée sur le front."""
    p = visage(personne(peau="#a16207", tenue="#0891b2", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(RoundedRectangle(width=r * 1.6, height=r * 0.5, corner_radius=r * 0.2, fill_color="#67e8f9",
                           fill_opacity=0.7, stroke_color="#0e7490", stroke_width=3).move_to(c + P(0, r * 0.75)))
    return p


def karim(s=1.0):
    """Karim, pilote d'avion : veste bleu marine, casquette de pilote."""
    p = visage(personne(peau="#e0ac69", tenue="#1e293b", cheveux="#111827", s=s))
    p.add(casquette(p, "#0f172a"))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Rectangle(width=r * 0.7, height=r * 0.18, fill_color="#facc15", fill_opacity=1, stroke_width=0)
          .move_to(c + P(0, r * 1.05)))
    return p


def elodie(s=1.0):
    """Élodie, paysagiste : salopette verte, chapeau de paille."""
    p = visage(personne(peau="#f1c27d", tenue="#15803d", cheveux="#78350f", longs=True, s=s))
    p.add(_chapeau(p, "#fcd34d"))
    return p


def jules(s=1.0):
    """Jules, technicien de concert : tee-shirt noir, casque audio autour du cou."""
    p = visage(personne(peau="#8d5524", tenue="#111827", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Arc(radius=r * 0.75, start_angle=PI * 1.1, angle=PI * 0.8, color="#f97316", stroke_width=8 * s)
          .move_to(c + P(0, -r * 1.25)))
    return p


def maya(s=1.0):
    """Maya, pâtissière : veste blanche, toque blanche, tablier rose."""
    p = visage(personne(peau="#c68642", tenue="#f8fafc", cheveux="#111827", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    p.add(Rectangle(width=r * 1.4, height=r * 0.25, fill_color="#ffffff", fill_opacity=1, stroke_width=0)
          .move_to(c + P(0, r * 1.05)),
          Circle(radius=r * 0.75, fill_color="#ffffff", fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 1.65)))
    return p


def planche(longueur=4.0, ep=0.35):
    """Une planche de bois (avec deux veines)."""
    b = Rectangle(width=longueur, height=ep, fill_color=BOIS_CLAIR, fill_opacity=1, stroke_color=BOIS_FONCE,
                  stroke_width=3)
    v = VGroup(*[Line(b.get_left() + RIGHT * longueur * a + UP * ep * (0.15 - 0.3 * (i % 2)),
                      b.get_left() + RIGHT * longueur * (a + 0.22) + UP * ep * (0.15 - 0.3 * (i % 2)),
                      color=BOIS_FONCE, stroke_width=1.5) for i, a in enumerate((0.1, 0.45, 0.7))])
    return VGroup(b, v)


def piece(r=0.35):
    """Une pièce de monnaie vue de face."""
    return VGroup(Circle(radius=r, fill_color="#fbbf24", fill_opacity=1, stroke_color="#b45309", stroke_width=3),
                  Circle(radius=r * 0.72, color="#b45309", stroke_width=2))


def porte(h=2.4, larg=1.1):
    """Une porte (cadre, poignée)."""
    return VGroup(Rectangle(width=larg, height=h, fill_color="#92400e", fill_opacity=1, stroke_color="#fde68a",
                            stroke_width=3),
                  Dot(radius=0.06, color="#fde68a").move_to(P(larg * 0.32, 0)))


def fleche_double(a, b, couleur=JAUNE_TITRE, sw=4):
    """Une flèche à deux pointes de a à b (une longueur)."""
    return DoubleArrow(a, b, buff=0, color=couleur, stroke_width=sw, tip_length=0.18,
                       max_tip_length_to_length_ratio=0.3)


class PaysageLongueurCE2(PaysageLongueurCM1):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"

    def aux_extraits(self, morceaux, extraits, run_time=0.18):
        """Chaque morceau à SON extrait de la voix : extraits (texte) ou (texte, n, délai).
        Les morceaux sortent de la synchro automatique (un nombre redit)."""
        for m, ex in zip(morceaux, extraits):
            for f in m.get_family():
                f.sans_synchro = True
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex]
            ex, n, delai = (ex + [1, 0.0][len(ex) - 1:])[:3]
            self.au_mot(ex, n)
            self.wait(0.07 + delai)
            self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)
