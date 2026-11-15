# 5e_conversion_coherence.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode C4 : CONTRÔLER UNE CONVERSION
# (micro conversion_coherence, notion grandeur_conversion), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : 5e-conversion-coherence-short (le jus dans un bouchon : 1,5 L = 150 cL).
# Décor et métier : Ana, CONTRÔLEUSE QUALITÉ dans une usine (centres technologie-ia, transports).
# Mapping micro → écrans : 01 (le paquet de riz : étiquette 2,4 kg, fiche 24 g), 02 (ordre de grandeur :
# 24 g = quelques morceaux de sucre ; 2,4 × 1 000 = 2 400 g), 03 (repères : 1 L une grande bouteille, 1 kg un
# paquet de farine, 1 km un quart d'heure de marche), 04 (méthode : le résultat est-il possible ? unité plus
# petite → nombre plus grand ; 10 ou 100 fois trop → on refait), 06 (piège : un résultat propre peut être faux ;
# on vérifie le sens), questions 05 (B : 12 t = 12 000 kg) et 07 (C : 1,5 km = 1 500 m), défi 08 (48 × 250 =
# 12 000 g = 12 kg ; l'étiquette annonce 120 kg : 10 fois trop).
# Fiche : lib/fiches/maths-5e-conversions.tsx.
# Voix : manim/voix/5e-conversion-coherence.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_conversion_coherence_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py conversion-coherence).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_conversion_coherence.py ConversionCoherence5e
# Sortie finale : manim/sorties/5e/maths/conversion/04-coherence/eleveai-maths-5e-conversion-coherence.mp4

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

# Une couleur par grandeur, la même sur tout l'épisode
MASSE_T = "#fcd34d"                      # t, kg, g
LONG_T = "#c4b5fd"                       # km, m
EAU_T = "#7dd3fc"                        # L
RIZ_C, RIZ_D, RIZ_B = "#fef3c7", "#fde68a", "#a16207"
BANDE_C = "#dc2626"
PAPIER_C, PAPIER_B = "#f8fafc", "#94a3b8"
ENCRE = "#1e3a8a"                        # l'écriture sur le papier
ENCRE_R = "#b91c1c"                      # une erreur écrite sur le papier
CARTON_C, CARTON_B = "#d6a76c", "#7c4a1e"
BOIS_C, BOIS_B = "#92400e", "#451a03"


# ── les dessins de l'épisode ─────────────────────────────────────────────────

def paquet_riz(s=1.0):
    """Le paquet de riz : un sac crème, le haut plié en zigzag, une bande rouge, une étiquette blanche (.etiq),
    des grains en bas. Environ 1,5 × 2,0 à s = 1."""
    corps = RoundedRectangle(width=1.5, height=1.75, corner_radius=0.14, fill_color=RIZ_C, fill_opacity=1,
                             stroke_color=RIZ_B, stroke_width=4).move_to(P(0, -0.1))
    pts = [P(-0.7, 0.74)]
    for k in range(9):
        pts.append(P(-0.7 + 1.4 * k / 8, 1.0 if k % 2 == 0 else 0.88))
    pts.append(P(0.7, 0.74))
    pli = Polygon(*pts, fill_color=RIZ_D, fill_opacity=1, stroke_color=RIZ_B, stroke_width=3)
    bande = Rectangle(width=1.5, height=0.2, fill_color=BANDE_C, fill_opacity=1, stroke_width=0).move_to(P(0, 0.55))
    etiq = RoundedRectangle(width=1.22, height=0.52, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                            stroke_color="#64748b", stroke_width=2).move_to(P(0, 0.08))
    grains = VGroup()
    for i, (x, y, a) in enumerate([(-0.45, -0.45, 0.3), (-0.15, -0.6, -0.5), (0.2, -0.42, 0.9), (0.45, -0.65, 0.1),
                                   (-0.35, -0.78, 1.2), (0.05, -0.82, 0.4), (0.32, -0.88, -0.8), (-0.55, -0.92, -0.2)]):
        grains.add(Ellipse(width=0.16, height=0.07, fill_color="#fffbeb", fill_opacity=1, stroke_color="#a8a29e",
                           stroke_width=1.5).rotate(a).move_to(P(x, y)))
    g = VGroup(corps, pli, bande, etiq, grains).scale(s)
    g.etiq = etiq
    return g


def fiche(w=1.6, h=1.9):
    """Une fiche de contrôle : une feuille blanche, deux lignes grises en bas ; .zone (haut) et .zone2 (milieu),
    où l'on écrit."""
    f = RoundedRectangle(width=w, height=h, corner_radius=0.1, fill_color=PAPIER_C, fill_opacity=1,
                         stroke_color=PAPIER_B, stroke_width=3)
    traits = VGroup(*[Line(P(-w * 0.34, 0), P(w * 0.34, 0), color="#cbd5e1", stroke_width=3)
                      .move_to(P(0, -h * 0.3 - 0.16 * k)) for k in range(2)])
    g = VGroup(f, traits)
    g.feuille = f
    g.zone = f.get_center() + UP * h * 0.24
    g.zone2 = f.get_center() + DOWN * h * 0.02
    return g


def sur_papier(fi, s, fs=36, couleur=ENCRE, ou="zone"):
    """Un texte écrit SUR la fiche (en haut ou au milieu), hors audit, jamais plus large que la feuille."""
    t = hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD))
    if t.width > fi.feuille.width * 0.84:
        t.scale_to_fit_width(fi.feuille.width * 0.84)
    t.move_to(fi.feuille.get_center() + UP * fi.feuille.height * (0.24 if ou == "zone" else -0.14))
    return t


def sur_etiquette(paquet, s, fs=30, couleur=ENCRE):
    t = hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD))
    if t.width > paquet.etiq.width * 0.86:
        t.scale_to_fit_width(paquet.etiq.width * 0.86)
    return t.move_to(paquet.etiq)


def barrer(m, couleur=ROUGE_ERREUR, sw=7):
    return Line(m.get_corner(DL) + P(-0.06, -0.04), m.get_corner(UR) + P(0.06, 0.04), color=couleur, stroke_width=sw)


def sucre(o, a=0.3):
    """Un morceau de sucre (un petit cube blanc en cavalière), o = son coin avant-bas-gauche."""
    return pave(1, 1, 1, a, o, face="#f8fafc", dessus="#ffffff", cote="#cbd5e1", bord="#64748b", sw=2.5)


def bouteille(h=1.4):
    """La grande bouteille d'eau (1 L) : corps, épaules, goulot, bouchon bleu, l'eau, une étiquette."""
    corps = RoundedRectangle(width=0.56, height=0.95, corner_radius=0.12, fill_color="#e0f2fe", fill_opacity=0.35,
                             stroke_color="#e0f2fe", stroke_width=3).move_to(P(0, -0.22))
    eau = RoundedRectangle(width=0.5, height=0.72, corner_radius=0.1, fill_color="#38bdf8", fill_opacity=0.9,
                           stroke_width=0).move_to(P(0, -0.32))
    etiq = Rectangle(width=0.56, height=0.2, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    epaule = Polygon(P(-0.28, 0.25), P(0.28, 0.25), P(0.1, 0.45), P(-0.1, 0.45), fill_color="#e0f2fe",
                     fill_opacity=0.35, stroke_color="#e0f2fe", stroke_width=3)
    goulot = Rectangle(width=0.2, height=0.14, fill_color="#e0f2fe", fill_opacity=0.35, stroke_color="#e0f2fe",
                       stroke_width=3).move_to(P(0, 0.52))
    bouchon = Rectangle(width=0.27, height=0.13, fill_color="#2563eb", fill_opacity=1, stroke_width=0).move_to(
        P(0, 0.65))
    return VGroup(corps, eau, etiq, epaule, goulot, bouchon).scale(h / 1.4)


def farine(h=1.3):
    """Le paquet de farine (1 kg) : un sac blanc au rabat replié, un épi doré."""
    corps = Rectangle(width=0.9, height=1.05, fill_color="#f5f5f4", fill_opacity=1, stroke_color="#a8a29e",
                      stroke_width=4).move_to(P(0, -0.12))
    rabat = Polygon(P(-0.45, 0.4), P(0.45, 0.4), P(0.36, 0.6), P(-0.36, 0.6), fill_color="#e7e5e4", fill_opacity=1,
                    stroke_color="#a8a29e", stroke_width=3)
    tige = Line(P(0, -0.5), P(0, 0.12), color="#ca8a04", stroke_width=4)
    epi = VGroup(*[Ellipse(width=0.1, height=0.2, fill_color="#eab308", fill_opacity=1, stroke_width=0)
                   .rotate(0.5 * sg).move_to(P(0.07 * sg, -0.2 + 0.13 * k)) for k in range(3) for sg in (-1, 1)])
    return VGroup(corps, rabat, tige, epi).scale(h / 1.3)


def marcheur(s=1.0):
    """Un marcheur (en blanc, en pleine foulée)."""
    c = "#f1f5f9"
    tete = Circle(radius=0.14, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.05, 0.55))
    corps = Line(P(0.02, 0.4), P(-0.04, -0.05), color=c, stroke_width=7)
    jambes = VGroup(Line(P(-0.04, -0.05), P(0.22, -0.55), color=c, stroke_width=7),
                    Line(P(-0.04, -0.05), P(-0.28, -0.55), color=c, stroke_width=7))
    bras = VGroup(Line(P(0.01, 0.3), P(0.24, 0.02), color=c, stroke_width=6),
                  Line(P(0.01, 0.3), P(-0.24, 0.06), color=c, stroke_width=6))
    sol = DashedLine(P(-0.5, -0.6), P(0.5, -0.6), color=GRAY_B, stroke_width=3, dash_length=0.08)
    return VGroup(sol, jambes, corps, bras, tete).scale(s)


def horloge(r=0.34):
    """Une horloge ; .quart = le quart d'heure (de midi à trois heures), à montrer à son mot."""
    cadran = Circle(radius=r, fill_color="#1e293b", fill_opacity=1, stroke_color="#f1f5f9", stroke_width=4)
    quart = AnnularSector(inner_radius=0, outer_radius=r * 0.9, start_angle=PI / 2, angle=-PI / 2,
                          fill_color=MASSE_T, fill_opacity=0.85, stroke_width=0)
    aig = VGroup(Line(ORIGIN, UP * r * 0.75, color="#f1f5f9", stroke_width=4),
                 Line(ORIGIN, RIGHT * r * 0.75, color="#f1f5f9", stroke_width=4))
    g = VGroup(cadran, quart, aig)
    g.quart, g.cadran, g.aig = quart, cadran, aig
    return g


def loupe(r=0.45):
    verre = Circle(radius=r, fill_color="#e0f2fe", fill_opacity=0.25, stroke_color="#e2e8f0", stroke_width=9)
    manche = Line(P(r * 0.72, -r * 0.72), P(r * 1.75, -r * 1.75), color="#92400e", stroke_width=16)
    return VGroup(manche, verre)


def camion(s=1.0):
    """Le camion de livraison vu de profil (la cabine à droite) ; .remorque."""
    remorque = Rectangle(width=2.6, height=1.1, fill_color="#e2e8f0", fill_opacity=1, stroke_color="#475569",
                         stroke_width=4).move_to(P(1.3, 0.92))
    cabine = RoundedRectangle(width=0.95, height=1.0, corner_radius=0.14, fill_color="#f97316", fill_opacity=1,
                              stroke_color="#7c2d12", stroke_width=4).move_to(P(3.15, 0.87))
    vitre = RoundedRectangle(width=0.45, height=0.38, corner_radius=0.06, fill_color="#bae6fd", fill_opacity=1,
                             stroke_color="#7c2d12", stroke_width=3).move_to(P(3.32, 1.08))
    chassis = Rectangle(width=3.62, height=0.14, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(
        P(1.81, 0.33))
    roues = VGroup()
    for x in (0.5, 1.15, 3.15):
        roues.add(Circle(radius=0.27, fill_color="#1f2937", fill_opacity=1, stroke_color="#0f172a",
                         stroke_width=3).move_to(P(x, 0.2)),
                  Circle(radius=0.1, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(P(x, 0.2)))
    g = VGroup(remorque, chassis, cabine, vitre, roues).scale(s, about_point=ORIGIN)
    g.remorque = remorque
    return g


def voiture(s=1.0):
    """Une petite voiture vue de profil."""
    caisse = RoundedRectangle(width=1.5, height=0.42, corner_radius=0.14, fill_color="#22c55e", fill_opacity=1,
                              stroke_color="#14532d", stroke_width=3).move_to(P(0, 0.3))
    toit = Polygon(P(-0.45, 0.5), P(0.35, 0.5), P(0.15, 0.82), P(-0.3, 0.82), fill_color="#22c55e", fill_opacity=1,
                   stroke_color="#14532d", stroke_width=3)
    roues = VGroup(*[Circle(radius=0.16, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(P(x, 0.1))
                     for x in (-0.45, 0.45)])
    return VGroup(caisse, toit, roues).scale(s)


def piste(w=3.6, h=1.7):
    """La piste d'athlétisme vue de dessus : un stade (anneau brique), la pelouse, une ligne de couloir."""
    ext = RoundedRectangle(width=w, height=h, corner_radius=h / 2, fill_color="#c2410c", fill_opacity=1,
                           stroke_color="#7c2d12", stroke_width=4)
    couloir = DashedVMobject(RoundedRectangle(width=w - 0.3, height=h - 0.3, corner_radius=(h - 0.3) / 2),
                             num_dashes=40).set_stroke(WHITE, 2.5)
    pelouse = RoundedRectangle(width=w - 0.62, height=h - 0.62, corner_radius=(h - 0.62) / 2, fill_color="#16a34a",
                               fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    g = VGroup(ext, couloir, pelouse)
    g.pelouse = pelouse
    return g


def boite(w=0.44, h=0.34):
    r = Rectangle(width=w, height=h, fill_color=CARTON_C, fill_opacity=1, stroke_color=CARTON_B, stroke_width=2.5)
    return VGroup(r, Line(r.get_left(), r.get_right(), color=CARTON_B, stroke_width=1.5))


def palette():
    """La palette : 8 × 6 = 48 boîtes posées sur des planches ; .boites .bois .tag (l'étiquette blanche)."""
    bx = VGroup(*[boite() for _ in range(48)]).arrange_in_grid(rows=6, cols=8, buff=0.03)
    planche = Rectangle(width=bx.width + 0.1, height=0.1, fill_color=BOIS_C, fill_opacity=1, stroke_color=BOIS_B,
                        stroke_width=2).next_to(bx, DOWN, buff=0)
    blocs = VGroup(*[Rectangle(width=0.32, height=0.16, fill_color=BOIS_C, fill_opacity=1, stroke_color=BOIS_B,
                               stroke_width=2) for _ in range(3)]).arrange(RIGHT, buff=(bx.width - 0.96) / 2)
    blocs.next_to(planche, DOWN, buff=0)
    bas = planche.copy().next_to(blocs, DOWN, buff=0)
    bois = VGroup(planche, blocs, bas)
    tag = RoundedRectangle(width=1.5, height=0.55, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                           stroke_color="#64748b", stroke_width=2).move_to(bx)
    g = VGroup(bx, bois, tag)
    g.boites, g.bois, g.tag = bx, bois, tag
    return g


def grande_boite():
    """Une boîte de la palette, en grand, pour y écrire « 250 g »."""
    r = Rectangle(width=1.25, height=0.8, fill_color=CARTON_C, fill_opacity=1, stroke_color=CARTON_B, stroke_width=4)
    return VGroup(r, Line(r.get_left() + UP * 0.25, r.get_right() + UP * 0.25, color=CARTON_B, stroke_width=3))


_SEP = re.compile(r"(?<=\d)[   ](\d{3})\b")


class ConversionCoherence5e(Paysage5e):
    nom_voix = "5e-conversion-coherence"
    fichier_marques = "5e_conversion_coherence_marques.json"
    ceinture = "bleue"

    # ── outils propres à l'épisode ──────────────────────────────────────────
    def col(self, mob, y, xl=None):
        """col() de la base, mais qui DIT quand elle rétrécit une ligne (elle le fait en silence)."""
        w = mob.width
        r = super().col(mob, y, xl)
        if os.environ.get("BORDS") == "1" and r.width < w - 0.01:
            tx = [f.original_text for f in r.get_family() if getattr(f, "original_text", None)]
            print(f"BORD SERRE {getattr(self, '_cle_voix', '?')} {w:.2f} → {r.width:.2f} ({' | '.join(tx)[:50]})",
                  flush=True)
        return r

    def _auditer(self, avant, t0):
        """L'audit de la base cherche « 1000 » dans une voix qui dit « 1 000 » : il relit ici la voix avec ses
        milliers collés (« 1 000 » → « 1000 » + une espace APRÈS : le texte garde sa longueur, donc ses marques)."""
        v = getattr(self, "_texte_voix", "") or ""
        self._texte_voix = _SEP.sub(lambda m: m.group(1) + " ", v)
        try:
            super()._auditer(avant, t0)
        finally:
            self._texte_voix = v

    def pause_defi(self, y=-1.2, marge=2.0):
        """« Mets pause, et cherche ! » sous l'énoncé, dans la colonne du défi (x = −0,6) : au-dessus de Ti Margo
        (plus grand sur 08), jamais à côté de lui ni rétréci."""
        self.au_mot("Mets pause")
        p = self.col(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE), y, -0.6)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def lab(self, s, fs=30, couleur=WHITE):
        """Une étiquette posée sur une figure (cartouche sombre), hors audit."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        return sur_fond(t)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Contrôler une conversion", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Contrôler une conversion")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment savoir si", "un résultat est possible ?"], 38)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        fi = fiche(1.5, 1.8).move_to(P(3.3, 0.45))
        qm = hors_audit(self.t("?", 64, JAUNE_TITRE)).move_to(fi.feuille.get_center() + UP * 0.15)
        lo = loupe(0.42).move_to(fi.feuille.get_corner(DR) + P(0.05, 0.05))
        self.au_mot("Comment savoir")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(fi, scale=0.8), run_time=0.5)
        self.au_mot("un résultat est possible")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(qm, scale=1.3), FadeIn(lo, shift=UP * 0.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Ana, contrôleuse qualité ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        an = ana(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Ana")
        nom = self.t("Ana", 40, BLEU_CALCUL).next_to(an, UP, buff=0.25)
        self.play(FadeIn(an, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("contrôleuse qualité")
        met = self.bloc(["contrôleuse", "qualité"], 28, BLEU_CALCUL).next_to(an, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("dans une usine")
        lu = self.t("dans une usine", 30, GRAY_B).move_to(P(-2.3, 2.85))
        self.play(FadeIn(lu, shift=DOWN * 0.1), run_time=0.4)
        x = 1.0
        l1 = self.t("Repérer les erreurs", 36, JAUNE_TITRE)
        self.col(l1, 2.0, x)
        self.au_mot("repérer les erreurs")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        riz = paquet_riz(1.3).move_to(P(-2.55, 0.0))
        self.au_mot("Sur ce paquet de riz")
        self.play(FadeIn(riz, shift=UP * 0.2), run_time=0.45)
        l2 = self.ligne([("L'étiquette :", WHITE), ("2,4 kg", VERT_OK)], 36, buff=0.25)
        self.col(l2, 1.0, x)
        self.au_mot("l'étiquette dit")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(riz.etiq, color=JAUNE_TITRE, scale_factor=1.1),
                  run_time=0.4)
        e24k = sur_etiquette(riz, "2,4 kg", 36)
        self.au_mot("2,4 kilos")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(e24k, scale=1.2), run_time=0.35)
        fi = fiche(1.45, 1.8).move_to(P(-0.4, -0.3))
        l3 = self.ligne([("La fiche :", WHITE), ("24 g", ROUGE_ERREUR)], 36, buff=0.25)
        self.col(l3, 0.1, x)
        self.au_mot("La fiche")
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(fi, shift=UP * 0.2), run_time=0.4)
        e24 = sur_papier(fi, "24 g", 40, ENCRE_R)
        self.au_mot("24 grammes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(e24, scale=1.2), run_time=0.35)
        l4 = self.t("Il y a un problème !", 36, JAUNE_TITRE)
        self.col(l4, -0.9, x)
        self.au_mot("un problème")
        self.play(FadeIn(l4, shift=UP * 0.1), Wiggle(e24, scale_value=1.25), run_time=0.6)
        self.attendre_voix()

    # ── 02 : l'ordre de grandeur (24 g = du sucre ; 2,4 × 1 000 = 2 400 g) ──
    def ecran_ordre(self):
        self.ecran("02-ordre")
        fi = fiche(1.9, 2.1).move_to(P(-5.0, 1.25))
        e24 = sur_papier(fi, "24 g", 40, ENCRE_R)
        riz = paquet_riz(1.05).move_to(P(-4.3, -1.75))
        e24k = sur_etiquette(riz, "2,4 kg", 30)
        self.add(fi, e24, riz, e24k)
        sucres = VGroup(*[sucre(P(-3.55 + 0.5 * k, 0.75 + (0.28 if k == 3 else 0)), 0.3) for k in range(3)])
        sucres.add(sucre(P(-3.3, 1.03), 0.3))
        x = -1.0
        l1 = self.ligne([("24 g", ROUGE_ERREUR), (": quelques morceaux", WHITE)], 36, buff=0.25)
        self.col(l1, 2.4, x)
        self.au_mot("24 grammes")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(e24, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.4)
        self.au_mot("quelques morceaux")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        l1b = self.t("de sucre.", 36, WHITE)
        self.col(l1b, 1.8, x)
        self.au_mot("de sucre")
        self.play(FadeIn(l1b, shift=UP * 0.1), LaggedStart(*[FadeIn(s, shift=DOWN * 0.15) for s in sucres],
                                                            lag_ratio=0.2), run_time=0.6)
        l2a = self.t("Un gros paquet de riz", 36, RIZ_D)
        self.col(l2a, 0.95, x)
        self.au_mot("Un gros paquet de riz")
        self.play(FadeIn(l2a, shift=UP * 0.1), Indicate(riz, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.45)
        l2b = self.t("ne peut pas peser ça.", 36, RIZ_D)
        self.col(l2b, 0.35, x)
        b = barrer(e24)
        self.au_mot("ne peut pas peser ça")
        self.play(FadeIn(l2b, shift=UP * 0.1), Create(b), run_time=0.45)
        l3 = self.t("Le bon résultat :", 36, JAUNE_TITRE)
        self.col(l3, -0.55, x)
        self.au_mot("Le bon résultat")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        l4 = self.ligne([("2,4", BLEU_D), ("× 1 000", BLEU_D), ("= 2 400 g", VERT_OK)], 42, buff=0.25)
        self.col(l4, -1.4, x)
        self.au_mot("2,4")
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(e24k, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.35)
        self.au_mot("fois 1 000")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        e2400 = sur_papier(fi, "2 400 g", 40, "#15803d", ou="zone2")
        self.au_mot("2 400 grammes")
        self.play(FadeIn(l4[2], shift=UP * 0.1), FadeIn(e2400, scale=1.2), run_time=0.4)
        self.insister(l4[2], 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : les repères (1 L, 1 kg, 1 km) ──────────────────────────────────
    def ecran_reperes(self):
        self.ecran("03-reperes")
        tit = self.t("Ana garde des repères en tête :", 38, JAUNE_TITRE)
        gauche(tit, -6.2, 3.0)
        self.au_mot("Ana garde des repères en tête")
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.4)
        xt = -3.75
        rangs = [
            (bouteille(1.35).move_to(P(-5.3, 1.75)), None, 1.75, "1 L", EAU_T, "1 litre",
             ": une grande bouteille d'eau", "une grande bouteille d'eau"),
            (farine(1.25).move_to(P(-5.3, 0.2)), None, 0.2, "1 kg", MASSE_T, "1 kilo :",
             ": un paquet de farine", "un paquet de farine"),
            (marcheur(1.0).move_to(P(-5.75, -1.35)), horloge(0.34).move_to(P(-4.65, -1.3)), -1.35, "1 km", LONG_T,
             "1 kilomètre", ": un quart d'heure de marche", "un quart d'heure de marche"),
        ]
        for fig, extra, y, u, cu, mot_u, reste, mot_r in rangs:
            l = self.ligne([(u, cu), (reste, WHITE)], 36, buff=0.2)
            gauche(l, xt, y)
            self.au_mot(mot_u)
            anims = [FadeIn(fig, scale=0.85), FadeIn(l[0], shift=UP * 0.1)]
            if extra is not None:
                anims.append(FadeIn(extra.cadran))
                anims.append(FadeIn(extra.aig))
            self.play(*anims, run_time=0.4)
            self.au_mot(mot_r)
            anims = [FadeIn(l[1], shift=UP * 0.1)]
            if extra is not None:
                anims.append(FadeIn(extra.quart, scale=0.6))
            self.play(*anims, run_time=0.4)
        fin = self.t("Elle compare chaque résultat à ses repères.", 34, VERT_OK)
        gauche(fin, -6.2, -2.75)
        self.au_mot("Elle compare chaque résultat")
        self.play(FadeIn(fin, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        xg = -6.0
        a1 = self.ligne([("Après une conversion,", WHITE), ("on se demande", WHITE)], 36, buff=0.2)
        gauche(a1, xg, 2.15)
        self.au_mot("après une conversion")
        self.play(FadeIn(a1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on se demande")
        self.play(FadeIn(a1[1], shift=UP * 0.1), run_time=0.3)
        a2 = self.t("si le résultat est possible.", 36, JAUNE_TITRE)
        gauche(a2, xg, 1.5)
        self.au_mot("si le résultat est possible")
        self.play(FadeIn(a2, shift=UP * 0.1), run_time=0.35)
        b1 = self.t("Vers une unité plus petite,", 36, BLEU_CALCUL)
        gauche(b1, xg, 0.5)
        f1 = Arrow(P(0, 0.3), P(0, -0.3), buff=0, color=BLEU_CALCUL, stroke_width=12, tip_length=0.26,
                   max_tip_length_to_length_ratio=0.5, max_stroke_width_to_length_ratio=20)
        f1.next_to(b1, RIGHT, buff=0.35)
        self.au_mot("Vers une unité plus petite")
        self.play(FadeIn(b1, shift=UP * 0.1), GrowArrow(f1), run_time=0.45)
        b2 = self.t("le nombre doit grandir.", 36, VERT_OK)
        gauche(b2, xg, -0.15)
        f2 = Arrow(P(0, -0.3), P(0, 0.3), buff=0, color=VERT_OK, stroke_width=12, tip_length=0.26,
                   max_tip_length_to_length_ratio=0.5, max_stroke_width_to_length_ratio=20)
        f2.next_to(b2, RIGHT, buff=0.35).set_x(f1.get_x())
        self.au_mot("le nombre doit grandir")
        self.play(FadeIn(b2, shift=UP * 0.1), GrowArrow(f2), run_time=0.45)
        c1 = self.ligne([("Si le résultat est", WHITE), ("10 fois", ORANGE_RETENUE), ("ou 100 fois", ORANGE_RETENUE)],
                        36, buff=0.2)
        gauche(c1, xg, -1.15)
        self.au_mot("Si le résultat est")
        self.play(FadeIn(c1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("10 fois")
        self.play(FadeIn(c1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ou 100 fois")
        self.play(FadeIn(c1[2], shift=UP * 0.1), run_time=0.3)
        c2 = self.t("trop petit ou trop grand,", 36, WHITE)
        gauche(c2, xg, -1.8)
        self.au_mot("trop petit ou trop grand")
        self.play(FadeIn(c2, shift=UP * 0.1), run_time=0.35)
        c3 = self.t("on refait le calcul.", 40, VERT_OK)
        gauche(c3, xg, -2.6)
        self.au_mot("on refait le calcul")
        self.play(FadeIn(c3, shift=UP * 0.1), run_time=0.35)
        self.insister(c3, 1.06, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cam = camion(0.95)
        cam.move_to(P(-3.75, 1.65))
        e12 = self.lab("12 t", 34, MASSE_T).move_to(cam.remorque)

        def avant_q(sc):
            sc.play(FadeIn(cam), FadeIn(e12), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un camion pèse 12 t.", "Un élève : 1 200 kg.", "Est-ce cohérent ?"],
                             [self.choix("oui, c'est juste"), self.choix("non, 12 000 kg"),
                              self.choix("non, 120 kg")], 1,
                             ["1 t = 1 000 kg.", "12 × 1 000 = 12 000.", "1 200 kg : le poids", "d'une petite voiture."],
                             -0.2, couper={0: ("1 t", "= 1 000 kg."), 1: ("12", "× 1 000", "= 12 000.")},
                             mot_q="Un camion", avant_q=avant_q)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        fi = fiche(1.7, 1.9).move_to(P(-5.0, 1.15))
        e = sur_papier(fi, "24 g", 44, ENCRE)
        cadre = SurroundingRectangle(e, color=ENCRE, buff=0.1, corner_radius=0.06, stroke_width=3)
        l1a = self.t("Un résultat qui a l'air propre", 36, WHITE)
        gauche(l1a, -3.6, 1.6)
        self.au_mot("Un résultat qui a l'air propre")
        self.play(FadeIn(fi, shift=UP * 0.2), FadeIn(e), Create(cadre), FadeIn(l1a, shift=UP * 0.1), run_time=0.5)
        l1b = self.t("peut être faux.", 36, ROUGE_ERREUR)
        gauche(l1b, -3.6, 0.95)
        tampon = VGroup(RoundedRectangle(width=1.35, height=0.5, corner_radius=0.06, stroke_color=ROUGE_ERREUR,
                                         stroke_width=5, fill_opacity=0),
                        Text("FAUX", font_size=30, color=ROUGE_ERREUR, weight=BOLD))
        hors_audit(tampon)
        tampon.rotate(0.25).move_to(fi.feuille.get_center() + DOWN * 0.45)
        self.au_mot("peut être faux")
        self.play(FadeIn(l1b, shift=UP * 0.1), FadeIn(tampon, scale=1.6), run_time=0.45)
        l2 = self.t("On vérifie toujours le sens :", 38, JAUNE_TITRE)
        gauche(l2, -6.0, -0.55)
        self.au_mot("On vérifie toujours le sens")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.ligne([("unité plus petite,", BLEU_CALCUL), ("nombre plus grand.", VERT_OK)], 42, buff=0.3)
        gauche(l3, -6.0, -1.65)
        self.au_mot("unité plus petite")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("nombre plus grand")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.insister(l3, 1.05, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pi = piste(3.6, 1.6).move_to(P(-3.75, 1.85))
        e15 = self.lab("1,5 km", 32, LONG_T).move_to(pi.pelouse)

        def avant_q(sc):
            sc.play(FadeIn(pi), FadeIn(e15), run_time=0.4)

        self.question_gauche("07-question", "07b-reponse",
                             ["Une piste mesure", "1,5 km.", "Lequel est cohérent ?"],
                             [self.choix("150 m"), self.choix("15 m"), self.choix("1 500 m")], 2,
                             ["1,5 × 1 000", "= 1 500 m.", "15 m : à peine", "une salle de classe :",
                              "beaucoup trop court."],
                             0.35, couper={0: ("1,5", "× 1 000"), 2: ("15 m :", "à peine")},
                             mot_q="Une piste", avant_q=avant_q)

    # ── 08 : le défi (la palette de boîtes) ─────────────────────────────────
    def decor_defi(self):
        pal = palette().move_to(P(-4.0, -0.75))
        gb = grande_boite().move_to(P(-4.0, 1.75))
        return pal, gb

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pal, gb = self.decor_defi()
        x = -0.6
        l0 = self.t("Ana contrôle une palette :", 34, WHITE)
        self.col(l0, 2.2, x)
        self.au_mot("Ana contrôle une palette")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pal.bois, shift=UP * 0.1), run_time=0.4)
        l1 = self.ligne([("48 boîtes", CARTON_C), ("de 250 g.", MASSE_T)], 36, buff=0.25)
        self.col(l1, 1.45, x)
        self.au_mot("48 boîtes")
        self.play(FadeIn(l1[0], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(b, shift=DOWN * 0.1) for b in pal.boites], lag_ratio=0.02), run_time=0.6)
        e250 = self.lab("250 g", 30, MASSE_T).move_to(gb[0].get_center() + DOWN * 0.1)
        self.au_mot("250 grammes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(gb, shift=DOWN * 0.15), FadeIn(e250), run_time=0.4)
        l2 = self.ligne([("L'étiquette annonce", WHITE), ("120 kg.", ROUGE_ERREUR)], 34, buff=0.25)
        self.col(l2, 0.7, x)
        self.au_mot("L'étiquette de la palette annonce")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(pal.tag, scale=1.2), run_time=0.4)
        e120 = hors_audit(Text("120 kg", font_size=30, color=ENCRE_R, weight=BOLD)).move_to(pal.tag)
        self.au_mot("120 kilos")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(e120, scale=1.2), run_time=0.35)
        l3 = self.t("Est-ce cohérent ?", 38, JAUNE_TITRE)
        self.col(l3, -0.15, x)
        self.au_mot("Est-ce cohérent")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-1.15)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pal, gb = self.decor_defi()
        e250 = self.lab("250 g", 30, MASSE_T).move_to(gb[0].get_center() + DOWN * 0.1)
        e120 = hors_audit(Text("120 kg", font_size=30, color=ENCRE_R, weight=BOLD)).move_to(pal.tag)
        self.add(pal, gb, e250, e120)
        x = -0.6
        l1 = self.ligne([("48", BLEU_D), ("× 250", BLEU_D), ("= 12 000 g", VERT_OK)], 38, buff=0.22)
        self.col(l1, 2.2, x)
        self.au_mot("48 fois")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(pal.boites, color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.35)
        self.au_mot("fois 250")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(gb, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.35)
        self.au_mot("12 000 grammes")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("÷ 1 000", BLEU_D), ("= 12 kg", VERT_OK)], 38, buff=0.22)
        self.col(l2, 1.4, x)
        self.au_mot("Divisé par 1 000")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 kilos")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("L'étiquette annonce", WHITE), ("120 kg :", ROUGE_ERREUR)], 34, buff=0.25)
        self.col(l3, 0.6, x)
        self.au_mot("L'étiquette annonce")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("120 kilos")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Indicate(e120, color=ROUGE_ERREUR, scale_factor=1.25), run_time=0.4)
        res = self.gros("10 fois trop !", couleur=ROUGE_ERREUR, fs=42)
        self.col(res, -0.4, x)
        self.au_mot("10 fois trop")
        self.play(FadeIn(res, scale=1.2), run_time=0.4)
        self.insister(res, 1.06, 0.25)
        l5 = self.t("Ana la fait corriger.", 36, VERT_OK)
        self.col(l5, -1.45, x)
        b = barrer(e120, ROUGE_ERREUR, 6)
        e12 = hors_audit(Text("12 kg", font_size=30, color="#15803d", weight=BOLD))
        tag2 = RoundedRectangle(width=1.5, height=0.55, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                                stroke_color=VERT_OK, stroke_width=4).next_to(pal.tag, DOWN, buff=0.12)
        e12.move_to(tag2)
        self.au_mot("Ana la fait corriger")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(b), FadeIn(tag2, scale=1.2), FadeIn(e12, scale=1.2),
                  run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        riz = paquet_riz(1.45)
        e = sur_etiquette(riz, "2,4 kg", 40)
        fig = VGroup(riz, e)
        lignes = self.finale_gauche(fig, textes=[
            ("Après une conversion, on vérifie", "que le résultat est possible."),
            ("On le compare", "à des repères connus."),
            ("Un résultat 10 fois trop grand", "ou trop petit cache", "une erreur de sens.")], fs=32)
        self.add(fig)
        self.au_mot("Après une conversion")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("On le compare")
        self.montrer_ligne(lignes[1])
        self.au_mot("Un résultat 10")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ordre()
        self.ecran_reperes()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
